// lib/car-cache.ts
// Single source of truth for all car listing data.
// Pattern: Redis first → miss/stale → Supabase → write Redis (72hr TTL) → return.
// All three pages (/cars, /cars/[brand], /cars/[brand]/[model]) call this file.
// Zero direct Supabase calls from page components.

import { Redis } from '@upstash/redis';
import { createClient } from '@supabase/supabase-js';

const redis = Redis.fromEnv(); // UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

const TTL = 60 * 60 * 72; // 72 hours in seconds

// ── Supabase (only used on cache miss) ───────────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Types ─────────────────────────────────────────────────────────

export interface CachedBrand {
  id: number;
  slug: string;
  name: string;
  logo_url: string | null;
  country: string | null;
  description: string | null;
  model_count: number;
}

export interface CachedModel {
  id: number;
  slug: string;
  name: string;
  body_type: string | null;
  segment: string | null;
  image_url: string | null;
  popular: boolean;
  latest_year_start: number | null;
  latest_year_end: number | null;
  latest_year_slug: string | null;
  tokunbo_price_min: number | null;
  tokunbo_price_max: number | null;
  nigerian_used_price_min: number | null;
  nigerian_used_price_max: number | null;
  maintenance_score: string | null;
  parts_availability_score: string | null;
  fuel_consumption_combined: number | null;
}

export interface CachedYearGroup {
  id: number;
  slug: string;
  year_start: number;
  year_end: number;
  generation: string | null;
  tokunbo_price_min: number | null;
  tokunbo_price_max: number | null;
  nigerian_used_price_min: number | null;
  nigerian_used_price_max: number | null;
  maintenance_score: string | null;
  parts_availability_score: string | null;
  fuel_consumption_combined: number | null;
  has_parts: boolean;
}

// ── Keys ──────────────────────────────────────────────────────────

const KEYS = {
  allBrands:       'cars:brands:all',
  brandModels:     (brandSlug: string) => `cars:models:${brandSlug}`,
  modelYearGroups: (brandSlug: string, modelSlug: string) => `cars:years:${brandSlug}:${modelSlug}`,
};

// ── Cache helpers ─────────────────────────────────────────────────

async function getOrSet<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  try {
    const cached = await redis.get<T>(key);
    if (cached !== null) return cached;
  } catch {
    // Redis down — fall through to Supabase
  }

  const fresh = await fetcher();

  try {
    await redis.set(key, fresh, { ex: TTL });
  } catch {
    // Redis write failed — still return fresh data
  }

  return fresh;
}

// ── Public API ────────────────────────────────────────────────────

// /cars — all brands with model count
export async function getAllBrands(): Promise<CachedBrand[]> {
  return getOrSet(KEYS.allBrands, async () => {
    const supabase = getSupabase();

    const { data: brands } = await supabase
      .from('car_brands')
      .select('id, slug, name, logo_url, country, description')
      .order('name');

    if (!brands?.length) return [];

    // Count models per brand in one query
    const { data: modelCounts } = await supabase
      .from('car_models')
      .select('brand_id')
      .in('brand_id', brands.map((b: any) => b.id));

    const countMap: Record<number, number> = {};
    (modelCounts || []).forEach((m: any) => {
      countMap[m.brand_id] = (countMap[m.brand_id] || 0) + 1;
    });

    return brands.map((b: any): CachedBrand => ({
      id:          b.id,
      slug:        b.slug,
      name:        b.name,
      logo_url:    b.logo_url,
      country:     b.country,
      description: b.description,
      model_count: countMap[b.id] || 0,
    }));
  });
}

// /cars/[brand] — all models for a brand
export async function getBrandModels(brandSlug: string): Promise<{
  brand: CachedBrand | null;
  models: CachedModel[];
}> {
  return getOrSet(KEYS.brandModels(brandSlug), async () => {
    const supabase = getSupabase();

    const { data: brand } = await supabase
      .from('car_brands')
      .select('id, slug, name, logo_url, country, description')
      .eq('slug', brandSlug)
      .single();

    if (!brand) return { brand: null, models: [] };

    const { data: models } = await supabase
      .from('car_models')
      .select(`
        id, slug, name, body_type, segment, image_url, popular,
        car_year_groups (
          slug, year_start, year_end,
          tokunbo_price_min, tokunbo_price_max,
          nigerian_used_price_min, nigerian_used_price_max,
          maintenance_score, parts_availability_score,
          fuel_consumption_combined
        )
      `)
      .eq('brand_id', brand.id)
      .order('popular', { ascending: false })
      .order('name');

    // Count total models for brand object
    const modelCount = (models || []).length;

    const cachedModels: CachedModel[] = (models || []).map((m: any) => {
      // Get latest year group
      const sorted = [...(m.car_year_groups || [])].sort(
        (a: any, b: any) => b.year_end - a.year_end
      );
      const latest = sorted[0] || null;

      return {
        id:                       m.id,
        slug:                     m.slug,
        name:                     m.name,
        body_type:                m.body_type,
        segment:                  m.segment,
        image_url:                m.image_url,
        popular:                  m.popular,
        latest_year_start:        latest?.year_start ?? null,
        latest_year_end:          latest?.year_end ?? null,
        latest_year_slug:         latest?.slug ?? null,
        tokunbo_price_min:        latest?.tokunbo_price_min ?? null,
        tokunbo_price_max:        latest?.tokunbo_price_max ?? null,
        nigerian_used_price_min:  latest?.nigerian_used_price_min ?? null,
        nigerian_used_price_max:  latest?.nigerian_used_price_max ?? null,
        maintenance_score:        latest?.maintenance_score ?? null,
        parts_availability_score: latest?.parts_availability_score ?? null,
        fuel_consumption_combined: latest?.fuel_consumption_combined ?? null,
      };
    });

    const cachedBrand: CachedBrand = {
      id:          brand.id,
      slug:        brand.slug,
      name:        brand.name,
      logo_url:    brand.logo_url,
      country:     brand.country,
      description: brand.description,
      model_count: modelCount,
    };

    return { brand: cachedBrand, models: cachedModels };
  });
}

// /cars/[brand]/[model] — all year groups for a model
export async function getModelYearGroups(brandSlug: string, modelSlug: string): Promise<{
  brand: CachedBrand | null;
  model: { id: number; slug: string; name: string; body_type: string | null; image_url: string | null; description: string | null } | null;
  yearGroups: CachedYearGroup[];
  siblingModels: Array<{ slug: string; name: string }>;
}> {
  return getOrSet(KEYS.modelYearGroups(brandSlug, modelSlug), async () => {
    const supabase = getSupabase();

    const { data: brand } = await supabase
      .from('car_brands')
      .select('id, slug, name, logo_url, country, description')
      .eq('slug', brandSlug)
      .single();

    if (!brand) return { brand: null, model: null, yearGroups: [], siblingModels: [] };

    const { data: model } = await supabase
      .from('car_models')
      .select('id, slug, name, body_type, image_url, description')
      .eq('brand_id', brand.id)
      .eq('slug', modelSlug)
      .single();

    if (!model) return { brand: null, model: null, yearGroups: [], siblingModels: [] };

    const [
      { data: yearGroups },
      { data: partsCheck },
      { data: siblings },
    ] = await Promise.all([
      supabase
        .from('car_year_groups')
        .select(`
          id, slug, year_start, year_end, generation,
          tokunbo_price_min, tokunbo_price_max,
          nigerian_used_price_min, nigerian_used_price_max,
          maintenance_score, parts_availability_score,
          fuel_consumption_combined
        `)
        .eq('model_id', model.id)
        .order('year_start', { ascending: false }),

      // Which year groups have spare parts
      supabase
        .from('spare_parts')
        .select('year_group_id'),

      supabase
        .from('car_models')
        .select('slug, name')
        .eq('brand_id', brand.id)
        .neq('slug', modelSlug)
        .eq('popular', true)
        .limit(6),
    ]);

    const partsIds = new Set((partsCheck || []).map((p: any) => p.year_group_id));

    const cachedYearGroups: CachedYearGroup[] = (yearGroups || []).map((yg: any) => ({
      id:                       yg.id,
      slug:                     yg.slug,
      year_start:               yg.year_start,
      year_end:                 yg.year_end,
      generation:               yg.generation,
      tokunbo_price_min:        yg.tokunbo_price_min,
      tokunbo_price_max:        yg.tokunbo_price_max,
      nigerian_used_price_min:  yg.nigerian_used_price_min,
      nigerian_used_price_max:  yg.nigerian_used_price_max,
      maintenance_score:        yg.maintenance_score,
      parts_availability_score: yg.parts_availability_score,
      fuel_consumption_combined: yg.fuel_consumption_combined,
      has_parts:                partsIds.has(yg.id),
    }));

    const cachedBrand: CachedBrand = {
      id:          brand.id,
      slug:        brand.slug,
      name:        brand.name,
      logo_url:    brand.logo_url,
      country:     brand.country,
      description: brand.description,
      model_count: 0,
    };

    return {
      brand:        cachedBrand,
      model:        { id: model.id, slug: model.slug, name: model.name, body_type: model.body_type, image_url: model.image_url, description: model.description },
      yearGroups:   cachedYearGroups,
      siblingModels: (siblings || []).map((s: any) => ({ slug: s.slug, name: s.name })),
    };
  });
}