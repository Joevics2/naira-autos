// app/[type]/[brand]/page.tsx
// Route: /cars/honda  /trucks/toyota  etc.
// Fetches all models WHERE brand_slug = x AND vehicle_type = type
// No car_brands table — brand info comes from vehicle_models columns

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, ArrowLeft, Wrench } from 'lucide-react';
import {
  getSupabase, getDbType, VEHICLE_TYPES,
  MAINTENANCE_CONFIG, PARTS_CONFIG,
  type VehicleModel,
} from '@/lib/vehicle-helpers';

export const revalidate = 86400; // 24 hours

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = getSupabase();
  const [{ data: parts }, { data: problems }] = await Promise.all([
    supabase.from('vehicle_parts').select('brand_slug, vehicle_type'),
    supabase.from('vehicle_problems').select('brand_slug, vehicle_type'),
  ]);

  const seen = new Set<string>();
  const results: { type: string; brand: string }[] = [];

  for (const row of [...(parts || []), ...(problems || [])]) {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === row.vehicle_type
    )?.[0] ?? row.vehicle_type + 's';
    const key = `${typeSlug}/${row.brand_slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ type: typeSlug, brand: row.brand_slug });
    }
  }
  return results;
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { type: string; brand: string } }
): Promise<Metadata> {
  const supabase  = getSupabase();
  const dbType    = getDbType(params.type);
  const typeInfo  = VEHICLE_TYPES[params.type];
  if (!typeInfo) return {};

  const { data: sample } = await supabase
    .from('vehicle_models')
    .select('brand_name, brand_description')
    .eq('brand_slug', params.brand)
    .eq('vehicle_type', dbType)
    .limit(1)
    .single();

  if (!sample) return {};

  const brandName = sample.brand_name;
  const title = `${brandName} ${typeInfo.plural} Prices in Nigeria | Naira Autos`;
  const desc  = `${brandName} ${typeInfo.plural.toLowerCase()} prices in Nigeria. Tokunbo and used prices, common problems, spare parts, and ownership costs for all ${brandName} models.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}`;
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

// ── Page ──────────────────────────────────────────────────────

export default async function BrandPage(
  { params }: { params: { type: string; brand: string } }
) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();
  const dbType   = getDbType(params.type);

  // Get model_names (+ brand_name as a fallback) that have content in the
  // new tables for this brand — this is the source of truth for what's
  // active, independent of vehicle_models.status/vehicle_type agreement.
  const [{ data: partModels }, { data: problemModels }] = await Promise.all([
    supabase.from('vehicle_parts').select('model_name, brand_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType),
    supabase.from('vehicle_problems').select('model_name, brand_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType),
  ]);

  const activeRows = [...(partModels || []), ...(problemModels || [])];
  const activeModelNames = new Set(activeRows.map((r: any) => r.model_name));

  if (activeModelNames.size === 0) notFound();

  // Enrichment from vehicle_models — matched on brand_slug + slug only,
  // no vehicle_type/status requirement, so a mismatched field there never
  // hides an otherwise-active model. Falls back gracefully if no match.
  const { data: modelRows } = await supabase
    .from('vehicle_models')
    .select('*')
    .eq('brand_slug', params.brand)
    .in('slug', Array.from(activeModelNames))
    .order('popular', { ascending: false })
    .order('sort_order');

  const enrichmentBySlug = new Map<string, any>();
  for (const m of (modelRows || [])) enrichmentBySlug.set(m.slug, m);

  // Brand-level info: prefer any vehicle_models row for this brand (regardless
  // of vehicle_type/status) for logo/country/description; fall back to the
  // flat brand_name already on the parts/problems rows.
  const anyBrandModel = (modelRows || [])[0] ?? null;
  const brandName        = anyBrandModel?.brand_name ?? activeRows[0]?.brand_name ?? params.brand;
  const brandLogo        = anyBrandModel?.brand_logo_url ?? null;
  const brandCountry     = anyBrandModel?.brand_country ?? null;
  const brandDescription = anyBrandModel?.brand_description ?? null;

  // Build the display model list from the active model names, enriched
  // where possible — this guarantees every model with real content shows,
  // even if vehicle_models has no matching row at all.
  const models: VehicleModel[] = Array.from(activeModelNames).map((slug) => {
    const enrich = enrichmentBySlug.get(slug);
    if (enrich) return enrich as VehicleModel;
    return {
      slug,
      name: slug,
      brand_slug: params.brand,
      brand_name: brandName,
      vehicle_type: dbType,
      body_type: null,
    } as VehicleModel;
  });

  // Get available years per model from new tables
  const modelSlugs = models.map((m: any) => m.slug);
  const [{ data: partYears }, { data: problemYears }] = await Promise.all([
    supabase.from('vehicle_parts').select('model_name, year').eq('brand_slug', params.brand).in('model_name', modelSlugs),
    supabase.from('vehicle_problems').select('model_name, year').eq('brand_slug', params.brand).in('model_name', modelSlugs),
  ]);

  // Map model slug → sorted years available
  const yearMap = new Map<string, number[]>();
  for (const r of [...(partYears || []), ...(problemYears || [])]) {
    if (!yearMap.has(r.model_name)) yearMap.set(r.model_name, []);
    const existing = yearMap.get(r.model_name)!;
    if (!existing.includes(r.year)) existing.push(r.year);
  }
  for (const key of Array.from(yearMap.keys())) {
    yearMap.set(key, yearMap.get(key)!.sort((a, b) => b - a));
  }

  // Group models by body type
  const grouped: Record<string, VehicleModel[]> = {};
  for (const m of models as VehicleModel[]) {
    const key = m.body_type ?? 'Other';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  }
  const bodyTypes = Object.keys(grouped).sort();

  const url = `https://www.naira.autos/${params.type}/${params.brand}`;
  const SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: `${brandName} ${typeInfo.plural} Prices in Nigeria`,
        url,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',             item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: typeInfo.plural,    item: `https://www.naira.autos/${params.type}` },
            { '@type': 'ListItem', position: 3, name: brandName,          item: url },
          ],
        },
      },
      {
        '@type': 'Brand',
        name: brandName,
        description: brandDescription,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-12">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href={`/${params.type}`} className="hover:text-foreground transition-colors capitalize">{typeInfo.plural}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{brandName}</span>
            </div>
            <Link
              href={`/${params.type}`}
              className="inline-flex items-center gap-1 font-medium border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
          </nav>

          {/* Brand header */}
          <section className="flex flex-col sm:flex-row items-start gap-6">
            {brandLogo && (
              <div className="w-20 h-20 rounded-2xl border border-border bg-card flex items-center justify-center flex-shrink-0 p-3">
                <img src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
              </div>
            )}
            <div className="flex-1">
              <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">
                {brandCountry ?? typeInfo.singular} · {models.length} model{models.length !== 1 ? 's' : ''}
              </span>
              <h1
                className="text-5xl sm:text-6xl font-black uppercase text-foreground mb-3 leading-none"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {brandName}<br />
                <span className="text-emerald-500">in Nigeria</span>
              </h1>
              {brandDescription && (
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">{brandDescription}</p>
              )}
            </div>
          </section>

          {/* Models by body type */}
          {bodyTypes.map(bodyType => (
            <section key={bodyType}>
              <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                {bodyType}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {grouped[bodyType].map(model => {
                  const years = yearMap.get(model.slug) || [];
                  const mc    = model.maintenance_score ? MAINTENANCE_CONFIG[model.maintenance_score] : null;
                  const pc    = model.parts_availability ? PARTS_CONFIG[model.parts_availability] : null;
                  const latestYear = years[0] ?? null;

                  return (
                    <Link
                      key={model.slug}
                      href={`/${params.type}/${params.brand}/${model.slug}`}
                      className="group bg-card border border-border hover:border-foreground/30 rounded-xl overflow-hidden transition-colors"
                    >
                      {/* Model image or placeholder */}
                      <div className="h-36 bg-muted flex items-center justify-center border-b border-border overflow-hidden">
                        {model.og_image_url ? (
                          <img
                            src={model.og_image_url}
                            alt={`${brandName} ${model.name}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-4xl font-black text-muted-foreground/20 uppercase">
                            {model.name}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-foreground group-hover:text-foreground/80 transition-colors">
                              {brandName} {model.name}
                            </h3>
                            {model.body_type && (
                              <span className="text-xs text-muted-foreground">{model.body_type}</span>
                            )}
                          </div>
                          {years.length > 0 && (
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {years.length === 1 ? years[0] : `${years[years.length - 1]}–${years[0]}`}
                            </span>
                          )}
                        </div>

                        {/* Scores */}
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {mc && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${mc.color} ${mc.bg} ${mc.border}`}>
                              {model.maintenance_score} Maint.
                            </span>
                          )}
                          {pc && (
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${pc.color} ${pc.bg} ${pc.border}`}>
                              {pc.icon} Parts
                            </span>
                          )}
                          {model.reliability_rating && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400">
                              ★ {model.reliability_rating}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Wrench className="h-3 w-3" />
                          <span>Parts &amp; Issues</span>
                          <ChevronRight className="h-3 w-3 ml-auto" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}

          {/* Other brands in this type */}
          <section className="border-t border-border pt-8">
            <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
              Other {typeInfo.singular} Brands
            </p>
            <Link
              href={`/${params.type}`}
              className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              All {typeInfo.plural} brands
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}
