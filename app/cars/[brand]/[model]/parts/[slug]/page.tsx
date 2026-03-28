// app/cars/[brand]/[model]/parts/[slug]/page.tsx
//
// Route: /cars/toyota/camry/parts/camry-2012-2017
//        /cars/toyota/camry/parts/camry-2015        (single year is also valid)
//
// The slug matches car_year_groups.slug — which can be a range or single year.
// This route is INDEPENDENT of the price page route /cars/[brand]/[model]/[slug].
// A single parts page can cover multiple price page years (same generation, shared parts).

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ChevronRight, Wrench, ArrowLeft, CheckCircle2, MapPin, ShoppingBag } from 'lucide-react';
import CarQAClient from '@/components/car-qa/qa-client';
import {
  formatPriceRange,
  PARTS_SCORE_CONFIG, MAINTENANCE_SCORE_CONFIG,
} from '@/types/cars';
import type { SparePart, SparePartsContent, CarQuestion } from '@/types/cars';

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Static params ─────────────────────────────────────────────────
// Only generate paths for year groups that have spare parts data

export async function generateStaticParams() {
  const supabase = getSupabase();

  // Only build pages for year groups that have at least one spare part
  const { data: partsGroups } = await supabase
    .from('spare_parts')
    .select('year_group_id')
    .limit(1000);

  if (!partsGroups?.length) return [];

  const uniqueIds = Array.from(new Set(partsGroups.map((p: any) => p.year_group_id)));

  const { data } = await supabase
    .from('car_year_groups')
    .select('slug, car_models ( slug, car_brands ( slug ) )')
    .in('id', uniqueIds);

  return (data || []).map((yg: any) => ({
    brand: yg.car_models.car_brands.slug,
    model: yg.car_models.slug,
    slug:  yg.slug,
  }));
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { brand: string; model: string; slug: string } }
): Promise<Metadata> {
  const data = await fetchPageData(params);
  if (!data) return {};

  const { brand, model, yg, content } = data;
  const yearLabel = formatYearLabel(yg.year_start, yg.year_end);
  const carLabel  = `${brand.name} ${model.name} ${yearLabel}`;
  const url       = `https://www.naira.autos/cars/${brand.slug}/${model.slug}/parts/${yg.slug}`;

  const title = content?.meta_title       || `${carLabel} Spare Parts Prices in Nigeria | Naira Autos`;
  const desc  = content?.meta_description || `${carLabel} spare parts prices in Nigeria. Brake pads, filters, suspension and more — with Nigerian market prices and where to buy.`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

// ── Helpers ───────────────────────────────────────────────────────

function formatYearLabel(start: number, end: number): string {
  return start === end ? `${start}` : `${start}–${end}`;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-black uppercase text-foreground mb-5"
      style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
      {children}
    </h2>
  );
}

// ── Data fetching ─────────────────────────────────────────────────

async function fetchPageData({
  brand: brandSlug,
  model: modelSlug,
  slug:  yearSlug,
}: Record<string, string>) {
  const supabase = getSupabase();

  const { data: brand } = await supabase
    .from('car_brands').select('id,slug,name').eq('slug', brandSlug).single();
  if (!brand) return null;

  const { data: model } = await supabase
    .from('car_models').select('id,slug,name')
    .eq('brand_id', brand.id).eq('slug', modelSlug).single();
  if (!model) return null;

  const { data: yg } = await supabase
    .from('car_year_groups')
    .select('id,slug,year_start,year_end,parts_availability_score,maintenance_score')
    .eq('model_id', model.id).eq('slug', yearSlug).single();
  if (!yg) return null;

  const [
    { data: parts },
    { data: content },
    { data: questions },
    // Price pages that fall within this parts generation range
    { data: coveredPricePages },
    // Other parts generations for this model (for footer navigation)
    { data: otherPartsGroups },
  ] = await Promise.all([
    supabase
      .from('spare_parts')
      .select('*, spare_parts_categories(name,slug)')
      .eq('year_group_id', yg.id)
      .order('sort_order'),

    supabase
      .from('spare_parts_page_content')
      .select('*')
      .eq('year_group_id', yg.id)
      .single(),

    supabase
      .from('car_questions')
      .select('*, car_answers(*)')
      .eq('year_group_id', yg.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(15),

    // Individual price pages whose years fall within this parts group's range
    supabase
      .from('car_year_groups')
      .select('slug,year_start,year_end')
      .eq('model_id', model.id)
      .gte('year_start', yg.year_start)
      .lte('year_end', yg.year_end)
      .neq('slug', yg.slug)          // exclude self (the parts page slug)
      .order('year_start', { ascending: false }),

    // Other parts generations for navigation
    supabase
      .from('car_year_groups')
      .select('slug,year_start,year_end')
      .eq('model_id', model.id)
      .neq('slug', yearSlug)
      // Only include groups that actually have spare parts
      .not('id', 'in', `(select year_group_id from spare_parts group by year_group_id having count(*) = 0)`)
      .order('year_start', { ascending: false })
      .limit(6),
  ]);

  // Group parts by category
  const partsByCategory: Record<string, SparePart[]> = {};
  (parts || []).forEach((p: any) => {
    const cat = p.spare_parts_categories?.name || 'Other';
    if (!partsByCategory[cat]) partsByCategory[cat] = [];
    partsByCategory[cat].push({ ...p, category: p.spare_parts_categories });
  });

  return {
    brand,
    model,
    yg,
    partsByCategory,
    content: (content || null) as SparePartsContent | null,
    questions: (questions || []).map((q: any) => ({
      ...q, answers: q.car_answers || [],
    })) as CarQuestion[],
    coveredPricePages: coveredPricePages || [],   // price pages in this generation
    otherPartsGroups: otherPartsGroups || [],     // other parts generations
  };
}

// ── Constants ─────────────────────────────────────────────────────

const WHERE_TO_BUY = [
  { name: 'Ladipo Market, Lagos',    desc: 'Widest range. Negotiate prices.',                     type: 'market' },
  { name: 'Nnewi, Anambra',          desc: 'Best for wholesale and rare parts.',                  type: 'market' },
  { name: 'Sabon Gari Market, Kano', desc: 'Good coverage for Northern Nigeria.',                 type: 'market' },
  { name: 'Jiji.ng',                 desc: 'Search by car model and year.',                       type: 'online' },
  { name: 'Jumia',                   desc: 'Good for filters, brake pads, fast delivery.',        type: 'online' },
  { name: 'CarParts.ng',             desc: 'Specialist online store for Nigerian market parts.',  type: 'online' },
];

const CATEGORY_ORDER = ['Common Service Parts', 'Wear & Tear Parts', 'Model-Specific Issues', 'Other'];

// ── Page ──────────────────────────────────────────────────────────

export default async function SparePartsPage(
  { params }: { params: { brand: string; model: string; slug: string } }
) {
  const data = await fetchPageData(params);
  if (!data) notFound();

  const { brand, model, yg, partsByCategory, content, questions, coveredPricePages, otherPartsGroups } = data;

  const yearLabel = formatYearLabel(yg.year_start, yg.year_end);
  const carLabel  = `${brand.name} ${model.name} ${yearLabel}`;
  const pageUrl   = `https://www.naira.autos/cars/${brand.slug}/${model.slug}/parts/${yg.slug}`;
  const isRange   = yg.year_start !== yg.year_end;

  const sortedCategories = Object.keys(partsByCategory).sort(
    (a, b) => CATEGORY_ORDER.indexOf(a) - CATEGORY_ORDER.indexOf(b)
  );

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${carLabel} Spare Parts Prices in Nigeria`,
    url: pageUrl,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Cars',        item: 'https://www.naira.autos/cars' },
        { '@type': 'ListItem', position: 3, name: brand.name,    item: `https://www.naira.autos/cars/${brand.slug}` },
        { '@type': 'ListItem', position: 4, name: model.name,    item: `https://www.naira.autos/cars/${brand.slug}/${model.slug}` },
        { '@type': 'ListItem', position: 5, name: 'Parts',       item: `https://www.naira.autos/cars/${brand.slug}/${model.slug}/parts` },
        { '@type': 'ListItem', position: 6, name: yearLabel,     item: pageUrl },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-16">

          {/* ── Breadcrumb ── */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            {[
              { label: 'Home',     href: '/' },
              { label: 'Cars',     href: '/cars' },
              { label: brand.name, href: `/cars/${brand.slug}` },
              { label: model.name, href: `/cars/${brand.slug}/${model.slug}` },
              { label: 'Parts',    href: `/cars/${brand.slug}/${model.slug}/parts` },
            ].map(({ label, href }) => (
              <span key={href} className="flex items-center gap-1.5">
                <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
                <ChevronRight className="h-3 w-3" />
              </span>
            ))}
            <span className="text-foreground font-medium">{yearLabel}</span>
          </nav>

          {/* ── Header ── */}
          <section>
            <SectionLabel>{brand.name} · Spare Parts</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-foreground mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {carLabel}<br />
              <span className="text-emerald-500">Spare Parts in Nigeria</span>
            </h1>

            {/* Multi-year coverage note */}
            {isRange && (
              <div className="flex items-start gap-2.5 bg-card border border-border rounded-xl p-4 max-w-2xl mt-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  This page covers parts for the <strong className="text-foreground">{brand.name} {model.name} {yearLabel}</strong> generation.
                  Parts listed here are compatible across all years in this range unless stated otherwise.
                </p>
              </div>
            )}

            {/* Scores */}
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {yg.parts_availability_score && (() => {
                const c = PARTS_SCORE_CONFIG[yg.parts_availability_score as keyof typeof PARTS_SCORE_CONFIG];
                return c ? (
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${c.color} ${c.bg}`}>
                    {c.icon} {yg.parts_availability_score} to Find
                  </span>
                ) : null;
              })()}
              {yg.maintenance_score && (() => {
                const c = MAINTENANCE_SCORE_CONFIG[yg.maintenance_score as keyof typeof MAINTENANCE_SCORE_CONFIG];
                return c ? (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${c.color} ${c.bg}`}>
                    Maintenance: {yg.maintenance_score}
                  </span>
                ) : null;
              })()}
            </div>

            {content?.availability_overview && (
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mt-4">
                {content.availability_overview}
              </p>
            )}

            {content?.compatibility_note && (
              <div className="mt-3 flex items-start gap-2.5 bg-card border border-border rounded-xl p-4 max-w-2xl">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">{content.compatibility_note}</p>
              </div>
            )}

            {/* Links to individual price pages covered by this parts generation */}
            {coveredPricePages.length > 0 && (
              <div className="mt-5">
                <p className="text-xs text-muted-foreground mb-2">
                  View price pages for individual years in this generation:
                </p>
                <div className="flex flex-wrap gap-2">
                  {coveredPricePages.map((pp: any) => {
                    const yl = formatYearLabel(pp.year_start, pp.year_end);
                    return (
                      <Link
                        key={pp.slug}
                        href={`/cars/${brand.slug}/${model.slug}/${pp.slug}`}
                        className="px-3 py-1.5 rounded-lg border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-xs font-medium text-foreground transition-all"
                      >
                        {brand.name} {model.name} {yl} →
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* ── Parts tables ── */}
          {sortedCategories.map(category => {
            const parts = partsByCategory[category];
            if (!parts?.length) return null;
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
                      {parts.map(part => {
                        const avail = PARTS_SCORE_CONFIG[part.availability as keyof typeof PARTS_SCORE_CONFIG];
                        return (
                          <tr key={part.id} className="hover:bg-muted/20 transition-colors">
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
                              {part.replacement_interval || '—'}
                            </td>
                            <td className="px-4 py-3.5 hidden md:table-cell">
                              {avail && <span className={`text-xs font-bold ${avail.color}`}>{part.availability}</span>}
                            </td>
                            <td className="px-4 py-3.5 text-muted-foreground text-xs hidden lg:table-cell">
                              {part.notes || '—'}
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
          {content?.oem_vs_aftermarket && (
            <section>
              <SectionLabel>Buying Guide</SectionLabel>
              <SectionHeading>OEM vs Aftermarket — {brand.name} {model.name}</SectionHeading>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{content.oem_vs_aftermarket}</p>
              </div>
            </section>
          )}

          {/* ── Where to Buy ── */}
          <section>
            <SectionLabel>Where to Buy</SectionLabel>
            <SectionHeading>Where to Buy {brand.name} {model.name} Parts in Nigeria</SectionHeading>
            {content?.where_to_buy && (
              <div className="bg-card border border-border rounded-2xl p-5 mb-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{content.where_to_buy}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {WHERE_TO_BUY.map(place => (
                <div key={place.name} className="bg-card border border-border rounded-xl p-4">
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      {place.type === 'online'
                        ? <ShoppingBag className="h-3.5 w-3.5 text-emerald-400" />
                        : <MapPin      className="h-3.5 w-3.5 text-emerald-400" />
                      }
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
          {content?.diy_vs_workshop && (
            <section>
              <SectionLabel>Repairs</SectionLabel>
              <SectionHeading>DIY vs Workshop — What to Repair Yourself</SectionHeading>
              <div className="bg-card border border-border rounded-2xl p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">{content.diy_vs_workshop}</p>
              </div>
            </section>
          )}

          {/* ── Ask a Question ── */}
          <section>
            <SectionLabel>Community</SectionLabel>
            <SectionHeading>Ask About {carLabel} Spare Parts</SectionHeading>
            <CarQAClient
              yearGroupId={yg.id}
              initialQuestions={questions}
              carLabel={`${carLabel} spare parts`}
            />
          </section>

          {/* ── Footer nav ── */}
          <section className="border-t border-border pt-8 space-y-4">

            {/* Back to price pages in this generation */}
            {coveredPricePages.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Price pages in this generation:</p>
                <div className="flex flex-wrap gap-2">
                  {coveredPricePages.map((pp: any) => {
                    const yl = formatYearLabel(pp.year_start, pp.year_end);
                    return (
                      <Link
                        key={pp.slug}
                        href={`/cars/${brand.slug}/${model.slug}/${pp.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium transition-all"
                      >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        {brand.name} {model.name} {yl}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Other parts generations */}
            {otherPartsGroups.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Other {brand.name} {model.name} parts generations:</p>
                <div className="flex flex-wrap gap-2">
                  {otherPartsGroups.map((og: any) => {
                    const yl = formatYearLabel(og.year_start, og.year_end);
                    return (
                      <Link
                        key={og.slug}
                        href={`/cars/${brand.slug}/${model.slug}/parts/${og.slug}`}
                        className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 text-sm font-medium text-foreground hover:text-emerald-400 transition-all"
                      >
                        {yl} Parts
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

          </section>

        </div>
      </div>
    </>
  );
}