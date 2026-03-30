// app/[type]/[brand]/[model]/parts/[parts-slug]/page.tsx
// Route: /cars/honda/accord/parts/honda-accord-parts-2013-2022
// Full spare parts page — parts tables, OEM guide, where to buy, FAQ, listings

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Wrench, CheckCircle2, MapPin, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import {
  getSupabase, getDbType, VEHICLE_TYPES,
  formatPriceRange, formatYearLabel,
  PARTS_CONFIG, getModelListings, WHERE_TO_BUY_MARKETS,
  type VehicleParts, type SparePart,
} from '@/lib/vehicle-helpers';

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('vehicle_parts')
    .select('slug, brand_slug, model_name, vehicle_type')
    .limit(2000);

  return (data || []).map((p: any) => {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === p.vehicle_type
    )?.[0] ?? p.vehicle_type + 's';
    const modelSlug = p.slug
      .replace('-parts-' + p.slug.split('-parts-')[1], '')
      .replace(p.brand_slug + '-', '');
    return { type: typeSlug, brand: p.brand_slug, model: modelSlug, 'parts-slug': p.slug };
  });
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { type: string; brand: string; model: string; 'parts-slug': string } }
): Promise<Metadata> {
  const supabase = getSupabase();
  const { data: p } = await supabase
    .from('vehicle_parts')
    .select('brand_name, model_name, year_start, year_end, meta_title, meta_description')
    .eq('slug', params['parts-slug'])
    .single();

  if (!p) return {};
  const yearLabel = formatYearLabel(p.year_start, p.year_end);
  const carLabel  = `${p.brand_name} ${p.model_name} ${yearLabel}`;
  const title = p.meta_title ?? `${carLabel} Spare Parts Prices in Nigeria | Naira Autos`;
  const desc  = p.meta_description ?? `${carLabel} spare parts prices in Nigeria. Brake pads, filters, suspension, and more — with Nigerian market prices and where to buy.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/parts/${params['parts-slug']}`;
  return { title, description: desc, alternates: { canonical: url }, openGraph: { title, description: desc, url } };
}

// ── Sub-components ────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">{children}</span>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-black uppercase text-foreground mb-5 leading-tight"
      style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
      {children}
    </h2>
  );
}

const CATEGORY_ORDER = [
  'Common Service Parts',
  'Wear & Tear Parts',
  'Model-Specific Parts',
  'Other',
];

// ── Page ──────────────────────────────────────────────────────

export default async function PartsPage(
  { params }: { params: { type: string; brand: string; model: string; 'parts-slug': string } }
) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();

  const { data: p } = await supabase
    .from('vehicle_parts')
    .select('*')
    .eq('slug', params['parts-slug'])
    .single();

  if (!p) notFound();

  const parts = p as VehicleParts;

  // Related price pages and other parts generations
  const [{ data: relatedPrices }, { data: otherParts }] = await Promise.all([
    supabase
      .from('vehicle_prices')
      .select('slug, year_start, year_end, generation, tokunbo_price_min')
      .eq('model_id', parts.model_id)
      .order('year_start', { ascending: false })
      .limit(6),

    supabase
      .from('vehicle_parts')
      .select('slug, year_start, year_end, generation')
      .eq('model_id', parts.model_id)
      .neq('slug', params['parts-slug'])
      .order('year_start', { ascending: false })
      .limit(4),
  ]);

  // Listings
  const listings = await getModelListings(parts.brand_name, parts.model_name, parts.vehicle_type, 6);

  // Group parts by category
  const allParts  = (parts.parts ?? []) as SparePart[];
  const byCategory: Record<string, SparePart[]> = {};
  for (const part of allParts) {
    const cat = part.category ?? 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(part);
  }
  const sortedCategories = Object.keys(byCategory).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  const yearLabel    = formatYearLabel(parts.year_start, parts.year_end);
  const carLabel     = `${parts.brand_name} ${parts.model_name} ${yearLabel}`;
  const modelUrl     = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;
  const canonicalUrl = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/parts/${params['parts-slug']}`;
  const isRange      = parts.year_start !== parts.year_end;

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        name: `${carLabel} Spare Parts Prices in Nigeria`,
        url: canonicalUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',             item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: typeInfo.plural,    item: `https://www.naira.autos/${params.type}` },
            { '@type': 'ListItem', position: 3, name: parts.brand_name,   item: `https://www.naira.autos/${params.type}/${params.brand}` },
            { '@type': 'ListItem', position: 4, name: parts.model_name,   item: modelUrl },
            { '@type': 'ListItem', position: 5, name: `${yearLabel} Parts`, item: canonicalUrl },
          ],
        },
      },
      ...(parts.faqs?.length ? [{
        '@type': 'FAQPage',
        mainEntity: parts.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-16">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            {[
              { label: 'Home',            href: '/' },
              { label: typeInfo.plural,   href: `/${params.type}` },
              { label: parts.brand_name,  href: `/${params.type}/${params.brand}` },
              { label: parts.model_name,  href: modelUrl },
            ].map(({ label, href }) => (
              <span key={href} className="flex items-center gap-1.5">
                <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
                <ChevronRight className="h-3 w-3" />
              </span>
            ))}
            <span className="text-foreground font-medium">{yearLabel} Parts</span>
          </nav>

          {/* ── Header ── */}
          <section>
            <SectionLabel>{parts.brand_name} · Spare Parts · {yearLabel}</SectionLabel>
            <h1
              className="text-5xl sm:text-6xl font-black uppercase text-foreground mb-4 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              {carLabel}<br />
              <span className="text-emerald-500">Spare Parts in Nigeria</span>
            </h1>

            {/* Generation note */}
            {isRange && (
              <div className="flex items-start gap-2.5 bg-card border border-border rounded-xl p-4 max-w-2xl mb-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This page covers parts for the <strong className="text-foreground">{carLabel}</strong> generation.
                  Parts listed are compatible across all years in this range unless stated otherwise.
                </p>
              </div>
            )}

            {/* Parts availability score */}
            {/* (pulled from vehicle_models, shown if available) */}

            {parts.availability_overview && (
              <p className="text-muted-foreground text-base leading-relaxed max-w-3xl mb-4">
                {parts.availability_overview}
              </p>
            )}

            {parts.compatibility_note && (
              <div className="flex items-start gap-2.5 bg-card border border-border rounded-xl p-4 max-w-2xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{parts.compatibility_note}</p>
              </div>
            )}
          </section>

          {/* ── Parts Tables ── */}
          {sortedCategories.map(category => {
            const categoryParts = byCategory[category];
            if (!categoryParts?.length) return null;
            return (
              <section key={category}>
                <SectionLabel>Parts</SectionLabel>
                <SectionHeading>{category}</SectionHeading>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-5 py-3.5 font-semibold text-foreground">Part</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-foreground">Nigerian Price</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-foreground hidden sm:table-cell">Interval</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-foreground hidden md:table-cell">Availability</th>
                        <th className="text-left px-4 py-3.5 font-semibold text-foreground hidden lg:table-cell">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {categoryParts.map((part, i) => {
                        const avail = part.availability ? PARTS_CONFIG[part.availability] : null;
                        return (
                          <tr key={i} className="hover:bg-muted/20 transition-colors">
                            <td className="px-5 py-3.5">
                              <span className="font-medium text-foreground">{part.part_name}</span>
                              {part.oem_recommended && (
                                <span className="ml-2 text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded-full">
                                  OEM
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-emerald-400">
                              {formatPriceRange(part.price_min, part.price_max)}
                            </td>
                            <td className="px-4 py-3.5 text-muted-foreground hidden sm:table-cell text-xs">
                              {part.replacement_interval ?? '—'}
                            </td>
                            <td className="px-4 py-3.5 hidden md:table-cell">
                              {avail && (
                                <span className={`text-xs font-bold ${avail.color}`}>
                                  {avail.icon} {part.availability}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">
                              {part.notes ?? '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </section>
            );
          })}

          {/* ── OEM vs Aftermarket ── */}
          {parts.oem_vs_aftermarket && (
            <section>
              <SectionLabel>Buying Guide</SectionLabel>
              <SectionHeading>OEM vs Aftermarket — {parts.brand_name} {parts.model_name}</SectionHeading>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{parts.oem_vs_aftermarket}</p>
              </div>
            </section>
          )}

          {/* ── Where to Buy ── */}
          <section>
            <SectionLabel>Where to Buy</SectionLabel>
            <SectionHeading>Where to Buy {parts.brand_name} {parts.model_name} Parts in Nigeria</SectionHeading>
            {parts.where_to_buy && (
              <div className="bg-card border border-border rounded-2xl p-5 mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{parts.where_to_buy}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WHERE_TO_BUY_MARKETS.map(place => (
                <div key={place.name} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {place.type === 'online'
                        ? <ShoppingBag className="h-4 w-4 text-emerald-400" />
                        : <MapPin      className="h-4 w-4 text-emerald-400" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{place.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{place.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── DIY vs Workshop ── */}
          {parts.diy_vs_workshop && (
            <section>
              <SectionLabel>Repair Guide</SectionLabel>
              <SectionHeading>DIY vs Workshop — What to Fix Yourself</SectionHeading>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{parts.diy_vs_workshop}</p>
              </div>
            </section>
          )}

          {/* ── FAQ ── */}
          {parts.faqs?.length > 0 && (
            <section>
              <SectionLabel>Frequently Asked Questions</SectionLabel>
              <SectionHeading>Parts Questions — {parts.brand_name} {parts.model_name}</SectionHeading>
              <div className="space-y-3">
                {parts.faqs.map((faq, i) => (
                  <details key={i} className="group bg-card border border-border rounded-2xl overflow-hidden">
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none font-semibold text-foreground text-sm hover:text-emerald-400 transition-colors">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* ── Live Listings ── */}
          {listings.length > 0 && (
            <section>
              <SectionLabel>Buy or Sell</SectionLabel>
              <SectionHeading>{parts.brand_name} {parts.model_name} for Sale in Nigeria</SectionHeading>
              <p className="text-sm text-muted-foreground mb-5 -mt-3">
                Browse live listings for the {parts.brand_name} {parts.model_name} on Naira Autos.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
                {listings.map((listing: any) => (
                  <ListingCard key={listing.id} listing={listing} variant="grid" />
                ))}
              </div>
              <Link
                href={`/search?brand=${encodeURIComponent(parts.brand_name)}&q=${encodeURIComponent(parts.model_name)}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold transition-colors"
              >
                View All {parts.brand_name} {parts.model_name} Listings
                <ArrowRight className="h-4 w-4" />
              </Link>
            </section>
          )}

          {/* ── Footer nav ── */}
          <section className="border-t border-border pt-8 space-y-5">

            {/* Price pages for this model */}
            {(relatedPrices || []).length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                  {parts.model_name} Price Pages
                </p>
                <div className="flex flex-wrap gap-2">
                  {(relatedPrices || []).map((rp: any) => (
                    <Link
                      key={rp.slug}
                      href={`/${params.type}/${params.brand}/${params.model}/${rp.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium transition-all"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      {formatYearLabel(rp.year_start, rp.year_end)}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Other parts generations */}
            {(otherParts || []).length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">
                  Other {parts.model_name} Parts Generations
                </p>
                <div className="flex flex-wrap gap-2">
                  {(otherParts || []).map((op: any) => (
                    <Link
                      key={op.slug}
                      href={`/${params.type}/${params.brand}/${params.model}/parts/${op.slug}`}
                      className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 text-sm font-medium text-foreground hover:text-emerald-400 transition-all"
                    >
                      {formatYearLabel(op.year_start, op.year_end)}{op.generation ? ` · ${op.generation}` : ''} Parts
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link
              href={modelUrl}
              className="inline-flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {parts.brand_name} {parts.model_name} overview
            </Link>
          </section>

        </div>
      </div>
    </>
  );
}