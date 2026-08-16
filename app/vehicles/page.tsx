// app/vehicles/page.tsx
// Route: /vehicles
//
// TEMPORARY consolidated hub: while the per-type/brand/model pages are
// deprioritized for SEO (see is_published rollout), this single page is
// the one surface that lists every published vehicle — car, van, truck,
// bus, motorcycle — in one searchable/filterable grid. Each card links
// straight to whichever of Parts / Problems / Maintenance actually has
// published content for that model, at its most recent published year.
//
// Source of truth is still vehicle_parts / vehicle_problems /
// vehicle_maintenance with is_published = true, same as every other
// vehicle route — vehicle_models is enrichment only (name, image, scores).

import type { Metadata } from 'next';
import { getSupabase, VEHICLE_TYPES, TYPE_SLUG_TO_DB } from '@/lib/vehicle-helpers';
import VehiclesIndexClient, { type VehicleCardData } from '@/components/vehicles/VehiclesIndexClient';

export const revalidate = 3600; // refresh hourly — cheap enough given the small row count, fresh enough for publish/unpublish changes to show up quickly

export const metadata: Metadata = {
  title: 'All Vehicles — Parts, Problems & Maintenance | Naira Autos',
  description: 'Search every car, van, truck, bus, and motorcycle we cover. Spare parts prices, common problems, and maintenance schedules in one place.',
  alternates: { canonical: 'https://www.naira.autos/vehicles' },
};

const DB_TO_TYPE_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TYPE_SLUG_TO_DB).map(([slug, db]) => [db, slug])
);

const leadingYear = (y: string) => parseInt(y.slice(0, 4), 10) || 0;

export default async function VehiclesPage() {
  const supabase = getSupabase();

  const [{ data: parts }, { data: problems }, { data: maintenance }] = await Promise.all([
    supabase.from('vehicle_parts')
      .select('brand_slug, brand_name, model_name, vehicle_type, year, image_url, image_reference')
      .eq('is_published', true),
    supabase.from('vehicle_problems')
      .select('brand_slug, brand_name, model_name, vehicle_type, year')
      .eq('is_published', true),
    supabase.from('vehicle_maintenance')
      .select('brand_slug, brand_name, model_name, vehicle_type, year, image_url, image_reference')
      .eq('is_published', true),
  ]);

  type Agg = {
    typeSlug: string;
    brandSlug: string;
    brandName: string;
    modelSlug: string;
    partYears: string[];
    problemYears: string[];
    maintenanceYears: string[];
    image: string | null;
    imageReference: string | null;
  };
  const byKey = new Map<string, Agg>();

  const keyFor = (typeSlug: string, brandSlug: string, modelSlug: string) => `${typeSlug}/${brandSlug}/${modelSlug}`;

  for (const r of (parts || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[r.vehicle_type] ?? r.vehicle_type;
    const key = keyFor(typeSlug, r.brand_slug, r.model_name);
    if (!byKey.has(key)) {
      byKey.set(key, { typeSlug, brandSlug: r.brand_slug, brandName: r.brand_name, modelSlug: r.model_name, partYears: [], problemYears: [], maintenanceYears: [], image: null, imageReference: null });
    }
    const agg = byKey.get(key)!;
    agg.partYears.push(r.year);
    if (!agg.image && r.image_url) { agg.image = r.image_url; agg.imageReference = r.image_reference ?? null; }
  }
  for (const r of (problems || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[r.vehicle_type] ?? r.vehicle_type;
    const key = keyFor(typeSlug, r.brand_slug, r.model_name);
    if (!byKey.has(key)) {
      byKey.set(key, { typeSlug, brandSlug: r.brand_slug, brandName: r.brand_name, modelSlug: r.model_name, partYears: [], problemYears: [], maintenanceYears: [], image: null, imageReference: null });
    }
    byKey.get(key)!.problemYears.push(r.year);
  }
  for (const r of (maintenance || [])) {
    const typeSlug = DB_TO_TYPE_SLUG[r.vehicle_type] ?? r.vehicle_type;
    const key = keyFor(typeSlug, r.brand_slug, r.model_name);
    if (!byKey.has(key)) {
      byKey.set(key, { typeSlug, brandSlug: r.brand_slug, brandName: r.brand_name, modelSlug: r.model_name, partYears: [], problemYears: [], maintenanceYears: [], image: null, imageReference: null });
    }
    const agg = byKey.get(key)!;
    agg.maintenanceYears.push(r.year);
    if (!agg.image && r.image_url) { agg.image = r.image_url; agg.imageReference = r.image_reference ?? null; }
  }

  // Enrichment from vehicle_models — matched on brand_slug + slug, best-effort.
  const brandSlugs = Array.from(new Set(Array.from(byKey.values()).map(a => a.brandSlug)));
  const { data: modelRows } = brandSlugs.length
    ? await supabase
        .from('vehicle_models')
        .select('slug, name, brand_slug, body_type, maintenance_score, parts_availability, reliability_rating, og_image_url')
        .in('brand_slug', brandSlugs)
    : { data: [] as any[] };

  const enrichBySlug = new Map<string, any>();
  for (const m of (modelRows || [])) enrichBySlug.set(`${m.brand_slug}/${m.slug}`, m);

  const cards: VehicleCardData[] = Array.from(byKey.values()).map(agg => {
    const enrich = enrichBySlug.get(`${agg.brandSlug}/${agg.modelSlug}`);
    const typeInfo = VEHICLE_TYPES[agg.typeSlug];
    const modelName: string = enrich?.name ?? agg.modelSlug;

    const sortDesc = (years: string[]) => Array.from(new Set(years)).sort((a, b) => leadingYear(b) - leadingYear(a));
    const partYears = sortDesc(agg.partYears);
    const problemYears = sortDesc(agg.problemYears);
    const maintenanceYears = sortDesc(agg.maintenanceYears);
    const allYears = sortDesc([...agg.partYears, ...agg.problemYears, ...agg.maintenanceYears]);

    const base = `/${agg.typeSlug}/${agg.brandSlug}/${agg.modelSlug}`;

    return {
      key: keyFor(agg.typeSlug, agg.brandSlug, agg.modelSlug),
      typeSlug: agg.typeSlug,
      typeLabel: typeInfo?.singular ?? agg.typeSlug,
      brandSlug: agg.brandSlug,
      brandName: enrich?.brand_name ?? agg.brandName,
      modelSlug: agg.modelSlug,
      modelName,
      bodyType: enrich?.body_type ?? null,
      image: enrich?.og_image_url ?? agg.image,
      imageReference: enrich?.og_image_url ? null : agg.imageReference,
      maintenanceScore: enrich?.maintenance_score ?? null,
      partsAvailability: enrich?.parts_availability ?? null,
      reliabilityRating: enrich?.reliability_rating ?? null,
      yearRangeLabel: allYears.length === 0 ? null : allYears.length === 1 ? allYears[0] : `${allYears[allYears.length - 1]}–${allYears[0]}`,
      partsHref: partYears.length ? `${base}/${partYears[0]}/parts` : null,
      problemsHref: problemYears.length ? `${base}/${problemYears[0]}/problems` : null,
      maintenanceHref: maintenanceYears.length ? `${base}/${maintenanceYears[0]}/maintenance` : null,
      modelHref: base,
    };
  }).sort((a, b) => `${a.brandName} ${a.modelName}`.localeCompare(`${b.brandName} ${b.modelName}`));

  const typeCounts: Record<string, number> = {};
  for (const c of cards) typeCounts[c.typeSlug] = (typeCounts[c.typeSlug] ?? 0) + 1;

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Vehicles — Parts, Problems & Maintenance',
    url: 'https://www.naira.autos/vehicles',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Vehicles', item: 'https://www.naira.autos/vehicles' },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <VehiclesIndexClient cards={cards} typeCounts={typeCounts} />
    </>
  );
}
