// app/[type]/[brand]/page.tsx
// Route: /cars/honda  /trucks/toyota  etc.
//
// Fetches all models WHERE brand_slug = x AND vehicle_type = type
// No car_brands table — brand info comes from vehicle_models columns
//
// VISIBILITY RULE:
// A brand only renders (and is only pre-built) if it has at least one
// published row in vehicle_prices OR vehicle_parts for this
// brand_slug + vehicle_type combination. Brands that only exist in
// vehicle_models (no price/parts content yet) return 404.
//
// Revalidates every 24 hours so newly added brands/prices/parts
// appear without a full redeploy.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Wrench, DollarSign } from 'lucide-react';
import {
  getSupabase, getDbType, VEHICLE_TYPES,
  MAINTENANCE_CONFIG, PARTS_CONFIG, formatPriceRange,
  type VehicleModel,
} from '@/lib/vehicle-helpers';

export const revalidate = 86400; // 24 hours

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = getSupabase();

  // Universe of brand/type combos comes from vehicle_models
  const { data: modelRows } = await supabase
    .from('vehicle_models')
    .select('brand_slug, vehicle_type');

  // Brands that actually have content
  const { data: pricedRows } = await supabase
    .from('vehicle_prices')
    .select('brand_slug, vehicle_type')
    .eq('status', 'published');

  const { data: partsRows } = await supabase
    .from('vehicle_parts')
    .select('brand_slug, vehicle_type')
    .eq('status', 'published');

  const validKeys = new Set<string>();
  for (const r of (pricedRows || [])) validKeys.add(`${r.vehicle_type}::${r.brand_slug}`);
  for (const r of (partsRows || [])) validKeys.add(`${r.vehicle_type}::${r.brand_slug}`);

  const seen = new Set<string>();
  const results: { type: string; brand: string }[] = [];

  for (const row of (modelRows || [])) {
    if (!validKeys.has(`${row.vehicle_type}::${row.brand_slug}`)) continue;

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

  // ── Visibility gate ──────────────────────────────────────────
  // Only show this brand if it has at least one published row in
  // vehicle_prices or vehicle_parts for this vehicle type.
  const [{ count: priceCount }, { count: partsCount }] = await Promise.all([
    supabase
      .from('vehicle_prices')
      .select('id', { count: 'exact', head: true })
      .eq('brand_slug', params.brand)
      .eq('vehicle_type', dbType)
      .eq('status', 'published'),
    supabase
      .from('vehicle_parts')
      .select('id', { count: 'exact', head: true })
      .eq('brand_slug', params.brand)
      .eq('vehicle_type', dbType)
      .eq('status', 'published'),
  ]);

  if (!priceCount && !partsCount) notFound();

  // ── Models for this brand ────────────────────────────────────
  const { data: models } = await supabase
    .from('vehicle_models')
    .select('*')
    .eq('brand_slug', params.brand)
    .eq('vehicle_type', dbType)
    .order('popular', { ascending: false })
    .order('sort_order');

  if (!models?.length) notFound();

  // Brand info from first model row
  const brandName        = models[0].brand_name;
  const brandLogo        = models[0].brand_logo_url;
  const brandCountry     = models[0].brand_country;
  const brandDescription = models[0].brand_description;

  // Fetch price summaries for all models
  const modelIds = models.map(m => m.id);
  const { data: prices } = await supabase
    .from('vehicle_prices')
    .select('model_id, tokunbo_price_min, tokunbo_price_max, year_start, year_end, slug')
    .in('model_id', modelIds)
    .order('year_start', { ascending: false });

  // Map lowest price per model
  const priceMap = new Map<number, { min: number | null; max: number | null; slug: string }>();
  for (const p of (prices || [])) {
    if (!priceMap.has(p.model_id)) {
      priceMap.set(p.model_id, { min: p.tokunbo_price_min, max: p.tokunbo_price_max, slug: p.slug });
    }
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
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href={`/${params.type}`} className="hover:text-foreground transition-colors capitalize">{typeInfo.plural}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{brandName}</span>
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
                  const price = priceMap.get(model.id);
                  const mc    = model.maintenance_score ? MAINTENANCE_CONFIG[model.maintenance_score] : null;
                  const pc    = model.parts_availability ? PARTS_CONFIG[model.parts_availability] : null;

                  return (
                    <div
                      key={model.slug}
                      className="group bg-card border border-border hover:border-emerald-500/40 rounded-2xl overflow-hidden transition-all duration-200"
                    >
                      {/* Model image or placeholder */}
                      <div className="h-36 bg-muted/30 flex items-center justify-center border-b border-border">
                        {model.og_image_url ? (
                          <img
                            src={model.og_image_url}
                            alt={`${brandName} ${model.name}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span
                            className="text-4xl font-black text-muted-foreground/20 uppercase"
                            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                          >
                            {model.name}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        {/* Name + price */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <div>
                            <h3
                              className="text-lg font-black uppercase text-foreground leading-none group-hover:text-emerald-400 transition-colors"
                              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                            >
                              {brandName} {model.name}
                            </h3>
                            {model.body_type && (
                              <span className="text-xs text-muted-foreground">{model.body_type}</span>
                            )}
                          </div>
                          {price?.min && (
                            <span className="text-sm font-bold text-emerald-400 whitespace-nowrap">
                              From {formatPriceRange(price.min, null)}
                            </span>
                          )}
                        </div>

                        {/* Scores */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {mc && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${mc.color} ${mc.bg} ${mc.border}`}>
                              {model.maintenance_score} Maintenance
                            </span>
                          )}
                          {pc && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${pc.color} ${pc.bg} ${pc.border}`}>
                              {pc.icon} Parts
                            </span>
                          )}
                          {model.reliability_rating && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              ★ {model.reliability_rating}
                            </span>
                          )}
                        </div>

                        {/* Two CTAs */}
                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href={`/${params.type}/${params.brand}/${model.slug}`}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-colors"
                          >
                            <DollarSign className="h-3 w-3" />
                            Prices
                          </Link>
                          <Link
                            href={`/${params.type}/${params.brand}/${model.slug}#parts`}
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-border hover:border-emerald-500/50 text-foreground hover:text-emerald-400 text-xs font-bold transition-all"
                          >
                            <Wrench className="h-3 w-3" />
                            Parts
                          </Link>
                        </div>
                      </div>
                    </div>
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
