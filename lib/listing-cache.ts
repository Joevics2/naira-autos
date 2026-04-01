// lib/listing-cache.ts
// Redis-first cache for listing collection pages.
// Pattern: Redis → miss → Supabase (service role) → write Redis → return.
// TTL: 3 hours (listings change frequently unlike brand/model data).
// Zero direct Supabase calls from page components.

import { Redis } from '@upstash/redis';
import { createClient } from '@supabase/supabase-js';
import type { Listing } from '@/lib/supabase';

const redis = Redis.fromEnv();
const TTL = 60 * 60 * 3; // 3 hours
const PAGE_SIZE = 24;

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

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

const LISTING_SELECT = `
  id, user_id, title, brand, model, year, price, negotiable,
  vehicle_type, fuel_type, transmission, color, mileage,
  description, location_state, location_lga, city_area,
  ownership_type, seller_type, trim, condition, body_type,
  accident_history, urgent_sale, reason_for_selling, features,
  verification_level, video_url, video_urls, video_storage_url,
  images, status, is_featured, is_our_store, is_deal,
  views_count, saves_count, contact_clicks,
  created_at, updated_at, approved_at
`.trim();

// ── Cheap Cars (under ₦5M) ────────────────────────────────────────

export async function getCheapCars(): Promise<{ listings: Listing[]; total: number }> {
  return getOrSet('listings:cheap_cars', async () => {
    const supabase = getSupabase();
    const { data, count } = await supabase
      .from('listings')
      .select(LISTING_SELECT, { count: 'exact' })
      .eq('status', 'approved')
      .lte('price', 5000000)
      .order('is_deal', { ascending: false })
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    return { listings: (data || []) as unknown as Listing[], total: count ?? 0 };
  });
}

// ── Distress / Urgent Sales ───────────────────────────────────────

export async function getDistressSales(): Promise<{ listings: Listing[]; total: number }> {
  return getOrSet('listings:distress_sales', async () => {
    const supabase = getSupabase();
    const { data, count } = await supabase
      .from('listings')
      .select(LISTING_SELECT, { count: 'exact' })
      .eq('status', 'approved')
      .eq('urgent_sale', true)
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    return { listings: (data || []) as unknown as Listing[], total: count ?? 0 };
  });
}

// ── Nigerian Used Cars ────────────────────────────────────────────

export async function getNigerianUsedCars(): Promise<{ listings: Listing[]; total: number }> {
  return getOrSet('listings:nigerian_used', async () => {
    const supabase = getSupabase();
    const { data, count } = await supabase
      .from('listings')
      .select(LISTING_SELECT, { count: 'exact' })
      .eq('status', 'approved')
      .eq('condition', 'nigerian_used')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    return { listings: (data || []) as unknown as Listing[], total: count ?? 0 };
  });
}

// ── Tokunbo / Foreign Used Cars ───────────────────────────────────

export async function getTokunboCars(): Promise<{ listings: Listing[]; total: number }> {
  return getOrSet('listings:tokunbo', async () => {
    const supabase = getSupabase();
    const { data, count } = await supabase
      .from('listings')
      .select(LISTING_SELECT, { count: 'exact' })
      .eq('status', 'approved')
      .eq('condition', 'foreign_used')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    return { listings: (data || []) as unknown as Listing[], total: count ?? 0 };
  });
}

// ── Video Verified Cars ───────────────────────────────────────────

export async function getVideoVerifiedCars(): Promise<{ listings: Listing[]; total: number }> {
  return getOrSet('listings:video_verified', async () => {
    const supabase = getSupabase();
    const { data, count } = await supabase
      .from('listings')
      .select(LISTING_SELECT, { count: 'exact' })
      .eq('status', 'approved')
      .eq('verification_level', 'video_verified')
      .order('created_at', { ascending: false })
      .limit(PAGE_SIZE);

    return { listings: (data || []) as unknown as Listing[], total: count ?? 0 };
  });
}