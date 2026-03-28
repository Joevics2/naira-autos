// app/cars/[brand]/[model]/[slug]/page.tsx
// App Router — fully server-rendered for SEO

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  ChevronRight, TrendingUp, TrendingDown, Minus,
  Fuel, Settings, Users, Wrench, ArrowRight,
  CheckCircle2, Star,
} from 'lucide-react';
import CarQAClient from '@/components/car-qa/qa-client';
import {
  formatNaira, formatPriceRange,
  SEVERITY_CONFIG, FREQUENCY_CONFIG,
  MAINTENANCE_SCORE_CONFIG, PARTS_SCORE_CONFIG, TREND_CONFIG,
} from '@/types/cars';
import type {
  CarYearGroup, CarProblem, OwnershipCost, CarQuestion, OwnerStory,
} from '@/types/cars';

// ── Supabase ──────────────────────────────────────────────────────

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// ── Static params ─────────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('car_year_groups')
    .select('slug, car_models ( slug, car_brands ( slug ) )')
    .limit(500);

  return (data || []).map((yg: any) => ({
    brand: yg.car_models.car_brands.slug,
    model: yg.car_models.slug,
    year:  yg.slug,
  }));
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { brand: string; model: string; slug: string } }
): Promise<Metadata> {
  const supabase = getSupabase();
  const data = await fetchPageData(params);
  if (!data) return {};

  const { brand, model, yg } = data;
  const yearLabel = yg.year_start === yg.year_end ? `${yg.year_start}` : `${yg.year_start}–${yg.year_end}`;
  const carLabel  = `${brand.name} ${model.name} ${yearLabel}`;

  const title = yg.meta_title    || `${carLabel} Price in Nigeria — Tokunbo & Used | Naira Autos`;
  const desc  = yg.meta_description || `${carLabel} price in Nigeria. Tokunbo ${formatPriceRange(yg.tokunbo_price_min, yg.tokunbo_price_max)}, Nigerian used ${formatPriceRange(yg.nigerian_used_price_min, yg.nigerian_used_price_max)}. Common problems, specs, what to check before buying.`;
  const url   = `https://www.naira.autos/cars/${brand.slug}/${model.slug}/${yg.slug}`;

  return {
    title,
    description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

// ── Data fetching ─────────────────────────────────────────────────

async function fetchPageData({ brand: brandSlug, model: modelSlug, slug: yearSlug }: Record<string, string>) {
  const supabase = getSupabase();

  const { data: brand } = await supabase.from('car_brands').select('id,slug,name').eq('slug', brandSlug).single();
  if (!brand) return null;

  const { data: model } = await supabase.from('car_models').select('id,slug,name,body_type').eq('brand_id', brand.id).eq('slug', modelSlug).single();
  if (!model) return null;

  const { data: yg } = await supabase.from('car_year_groups').select('*').eq('model_id', model.id).eq('slug', yearSlug).single();
  if (!yg) return null;

  const [
    { data: problems },
    { data: ownershipCost },
    { data: questions },
    { data: stories },
    { data: relatedYearGroups },
    { data: relatedModels },
  ] = await Promise.all([
    supabase.from('car_problems').select('*').eq('year_group_id', yg.id).order('sort_order'),
    supabase.from('ownership_costs').select('*').eq('year_group_id', yg.id).single(),
    supabase.from('car_questions').select('*, car_answers(*)').eq('year_group_id', yg.id).eq('status', 'active').order('created_at', { ascending: false }).limit(20),
    supabase.from('owner_stories').select('*').eq('year_group_id', yg.id).eq('status', 'active').order('created_at', { ascending: false }).limit(10),
    supabase.from('car_year_groups').select('slug,year_start,year_end').eq('model_id', model.id).neq('slug', yearSlug).order('year_start', { ascending: false }).limit(6),
    supabase.from('car_models').select('slug,name').eq('brand_id', brand.id).neq('slug', modelSlug).eq('popular', true).limit(5),
  ]);

  return {
    brand,
    model,
    yg: yg as CarYearGroup,
    problems: (problems || []) as CarProblem[],
    ownershipCost: (ownershipCost || null) as OwnershipCost | null,
    questions: ((questions || []).map((q: any) => ({ ...q, answers: q.car_answers || [] }))) as CarQuestion[],
    stories: (stories || []) as OwnerStory[],
    relatedYearGroups: relatedYearGroups || [],
    relatedModels: (relatedModels || []).map((m: any) => ({ ...m, brandSlug })),
  };
}

// ── Sub-components (server) ───────────────────────────────────────

function ScoreBadge({ score, config }: { score: string; config: Record<string, { color: string; bg: string }> }) {
  const c = config[score];
  if (!c) return null;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${c.color} ${c.bg}`}>
      {score}
    </span>
  );
}

function PriceCard({ label, min, max, highlight = false }: { label: string; min?: number; max?: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-border bg-card'}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className={`text-lg font-black leading-tight ${highlight ? 'text-emerald-400' : 'text-foreground'}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
        {formatPriceRange(min, max)}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">{children}</span>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-black uppercase text-foreground mb-5" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
      {children}
    </h2>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default async function CarPricePage(
  { params }: { params: { brand: string; model: string; slug: string } }
) {
  const data = await fetchPageData(params);
  if (!data) notFound();

  const { brand, model, yg, problems, ownershipCost, questions, stories, relatedYearGroups, relatedModels } = data;

  const yearLabel = yg.year_start === yg.year_end ? `${yg.year_start}` : `${yg.year_start}–${yg.year_end}`;
  const carLabel  = `${brand.name} ${model.name} ${yearLabel}`;
  const canonicalUrl = `https://www.naira.autos/cars/${brand.slug}/${model.slug}/${yg.slug}`;

  // JSON-LD
  const SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        name: `${carLabel} Price in Nigeria`,
        url: canonicalUrl,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',      item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: 'Cars',      item: 'https://www.naira.autos/cars' },
            { '@type': 'ListItem', position: 3, name: brand.name,  item: `https://www.naira.autos/cars/${brand.slug}` },
            { '@type': 'ListItem', position: 4, name: model.name,  item: `https://www.naira.autos/cars/${brand.slug}/${model.slug}` },
            { '@type': 'ListItem', position: 5, name: yearLabel,   item: canonicalUrl },
          ],
        },
      },
      ...(problems.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: problems.slice(0, 4).map(p => ({
          '@type': 'Question',
          name: `What are common problems with the ${carLabel}?`,
          acceptedAnswer: { '@type': 'Answer', text: p.description || p.title },
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
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            {[
              { label: 'Home',      href: '/' },
              { label: 'Cars',      href: '/cars' },
              { label: brand.name,  href: `/cars/${brand.slug}` },
              { label: model.name,  href: `/cars/${brand.slug}/${model.slug}` },
            ].map(({ label, href }) => (
              <span key={href} className="flex items-center gap-1.5">
                <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
                <ChevronRight className="h-3 w-3" />
              </span>
            ))}
            <span className="text-foreground font-medium">{yearLabel}</span>
          </nav>

          {/* ── Hero ── */}
          <section>
            <SectionLabel>{brand.name} · {model.body_type || 'Car'}</SectionLabel>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-foreground mb-4 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {carLabel}<br />
              <span className="text-emerald-500">Price in Nigeria</span>
            </h1>
            {yg.overview && (
              <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-5">{yg.overview}</p>
            )}
            <div className="flex flex-wrap items-center gap-4">
              {yg.fuel_consumption_combined && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Fuel className="h-4 w-4 text-emerald-500" />{yg.fuel_consumption_combined}L/100km
                </span>
              )}
              {yg.engine_options?.[0] && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Settings className="h-4 w-4 text-emerald-500" />{yg.engine_options[0]}
                </span>
              )}
              {yg.seating && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-emerald-500" />{yg.seating} seats
                </span>
              )}
              {yg.maintenance_score && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Wrench className="h-4 w-4 text-emerald-500" />Maintenance:&nbsp;
                  <ScoreBadge score={yg.maintenance_score} config={MAINTENANCE_SCORE_CONFIG} />
                </span>
              )}
              {yg.parts_availability_score && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  Parts:&nbsp;<ScoreBadge score={yg.parts_availability_score} config={PARTS_SCORE_CONFIG} />
                </span>
              )}
            </div>
          </section>

          {/* ── Prices ── */}
          <section>
            <SectionLabel>Nigerian Market</SectionLabel>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <SectionHeading>{carLabel} Price in Nigeria</SectionHeading>
              {yg.price_trend && (
                <span className={`flex items-center gap-1 text-sm font-semibold ${TREND_CONFIG[yg.price_trend as keyof typeof TREND_CONFIG]?.color}`}>
                  {yg.price_trend === 'rising'  && <TrendingUp className="h-4 w-4" />}
                  {yg.price_trend === 'falling' && <TrendingDown className="h-4 w-4" />}
                  {yg.price_trend === 'stable'  && <Minus className="h-4 w-4" />}
                  {TREND_CONFIG[yg.price_trend as keyof typeof TREND_CONFIG]?.label}
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <PriceCard label="Tokunbo (Foreign Used)" min={yg.tokunbo_price_min} max={yg.tokunbo_price_max} highlight />
              <PriceCard label="Nigerian Used" min={yg.nigerian_used_price_min} max={yg.nigerian_used_price_max} />
              <PriceCard label="Brand New" min={yg.brand_new_price_min} max={yg.brand_new_price_max} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-sm mb-3">What Affects the Price</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'Mileage — lower km commands higher price',
                    'Auction grade (Grade 4+ is clean, Grade 3 is used but decent)',
                    'Trim level — higher trims cost more',
                    'Accident or flood history reduces value significantly',
                    'Dollar exchange rate — Tokunbo prices fluctuate with the naira',
                  ].map(t => (
                    <li key={t} className="flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">·</span>{t}
                    </li>
                  ))}
                </ul>
              </div>
              {yg.tokunbo_vs_used_analysis && (
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-bold text-foreground text-sm mb-3">Tokunbo vs Nigerian Used</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{yg.tokunbo_vs_used_analysis}</p>
                </div>
              )}
            </div>
            {yg.price_updated_at && (
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Prices last updated {new Date(yg.price_updated_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </section>

          {/* ── Specs ── */}
          {(yg.engine_options?.length || yg.fuel_type) && (
            <section>
              <SectionLabel>Specifications</SectionLabel>
              <SectionHeading>{carLabel} Specs & Variants</SectionHeading>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {[
                      { label: 'Engine',                value: yg.engine_options?.join(', ') },
                      { label: 'Transmission',          value: yg.transmission?.join(', ') },
                      { label: 'Fuel Type',             value: yg.fuel_type },
                      { label: 'Drive Type',            value: yg.drive_type },
                      { label: 'Seating',               value: yg.seating ? `${yg.seating} seats` : undefined },
                      { label: 'Fuel Economy (City)',   value: yg.fuel_consumption_city     ? `${yg.fuel_consumption_city}L/100km`     : undefined },
                      { label: 'Fuel Economy (Hwy)',    value: yg.fuel_consumption_highway  ? `${yg.fuel_consumption_highway}L/100km`  : undefined },
                      { label: 'Fuel Economy (Comb.)', value: yg.fuel_consumption_combined ? `${yg.fuel_consumption_combined}L/100km` : undefined },
                      { label: 'Tank Size',             value: yg.tank_size_litres ? `${yg.tank_size_litres}L` : undefined },
                      { label: 'Trim Levels',           value: yg.trim_levels?.join(', ') },
                    ].filter(r => r.value).map(row => (
                      <tr key={row.label} className="hover:bg-muted/20 transition-colors">
                        <td className="px-5 py-3 font-medium text-foreground w-1/3">{row.label}</td>
                        <td className="px-5 py-3 text-muted-foreground">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Buyer's Guide ── */}
          {yg.what_to_look_out_for?.length && (
            <section>
              <SectionLabel>Buyer's Guide</SectionLabel>
              <SectionHeading>What to Check Before Buying the {carLabel}</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {yg.what_to_look_out_for.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center mt-0.5">{i + 1}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              {yg.buying_tips && (
                <div className="mt-4 bg-card border border-border rounded-2xl p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{yg.buying_tips}</p>
                </div>
              )}
            </section>
          )}

          {/* ── Common Problems ── */}
          {problems.length > 0 && (
            <section>
              <SectionLabel>Known Issues</SectionLabel>
              <SectionHeading>Common Problems — {carLabel}</SectionHeading>
              <div className="space-y-3">
                {problems.map(p => {
                  const sev  = SEVERITY_CONFIG[p.severity]  || SEVERITY_CONFIG.minor;
                  const freq = FREQUENCY_CONFIG[p.frequency] || FREQUENCY_CONFIG.rare;
                  return (
                    <div key={p.id} className={`rounded-2xl border p-5 ${sev.bg}`}>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-bold text-foreground text-sm">{p.title}</h3>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-bold ${freq.color}`}>{freq.label}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.color}`}>{sev.label}</span>
                        </div>
                      </div>
                      {p.description && <p className="text-sm text-muted-foreground leading-relaxed mb-3">{p.description}</p>}
                      {(p.repair_cost_min || p.repair_cost_max) && (
                        <p className="text-xs font-semibold text-foreground">
                          Repair cost: <span className="text-emerald-400">{formatPriceRange(p.repair_cost_min, p.repair_cost_max)}</span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Ownership Costs ── */}
          {ownershipCost && (
            <section>
              <SectionLabel>Running Costs</SectionLabel>
              <SectionHeading>Cost of Owning the {carLabel} in Nigeria</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">Annual Fuel Cost</p>
                  <p className="text-lg font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {formatPriceRange(ownershipCost.annual_fuel_cost_min, ownershipCost.annual_fuel_cost_max)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Lagos daily commute estimate</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">Annual Maintenance</p>
                  <p className="text-lg font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {formatPriceRange(ownershipCost.annual_maintenance_cost_min, ownershipCost.annual_maintenance_cost_max)}
                  </p>
                  {yg.maintenance_score && <div className="mt-1"><ScoreBadge score={yg.maintenance_score} config={MAINTENANCE_SCORE_CONFIG} /></div>}
                </div>
                <div className="bg-card border border-border rounded-2xl p-4">
                  <p className="text-xs text-muted-foreground mb-1">Insurance Estimate</p>
                  <p className="text-lg font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {formatPriceRange(ownershipCost.insurance_estimate_min, ownershipCost.insurance_estimate_max)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Per year, third-party minimum</p>
                </div>
              </div>
              {ownershipCost.notes && <p className="text-sm text-muted-foreground leading-relaxed">{ownershipCost.notes}</p>}
            </section>
          )}

          {/* ── Spare Parts Link ── */}
          <Link
            href={`/cars/${brand.slug}/${model.slug}/${yg.slug}/spare-parts`}
            className="flex items-center justify-between bg-card border border-border hover:border-emerald-500/50 rounded-2xl p-5 group transition-all"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Wrench className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Spare Parts</span>
              </div>
              <h3 className="font-bold text-foreground">{carLabel} Spare Parts Prices in Nigeria</h3>
              <p className="text-sm text-muted-foreground mt-1">Brake pads, filters, suspension and more — with Nigerian market prices and where to buy.</p>
              {yg.parts_availability_score && <div className="mt-2"><ScoreBadge score={yg.parts_availability_score} config={PARTS_SCORE_CONFIG} /></div>}
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
          </Link>

          {/* ── Owner Stories ── */}
          {stories.length > 0 && (
            <section>
              <SectionLabel>Owner Reviews</SectionLabel>
              <SectionHeading>What {carLabel} Owners Are Saying</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {stories.map(s => (
                  <div key={s.id} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{s.author_name}</p>
                        {s.ownership_years && <p className="text-xs text-muted-foreground">{s.ownership_years} yr{s.ownership_years !== 1 ? 's' : ''} owner</p>}
                      </div>
                      {s.rating && (
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} className={`h-3.5 w-3.5 ${i <= s.rating! ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.story}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Ask a Question — CLIENT COMPONENT ── */}
          <section>
            <SectionLabel>Community</SectionLabel>
            <SectionHeading>Ask a Question About the {carLabel}</SectionHeading>
            <CarQAClient
              yearGroupId={yg.id}
              initialQuestions={questions}
              carLabel={carLabel}
            />
          </section>

          {/* ── Other year groups ── */}
          {relatedYearGroups.length > 0 && (
            <section>
              <SectionLabel>Other Years</SectionLabel>
              <SectionHeading>Other {brand.name} {model.name} Year Groups</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {relatedYearGroups.map((ryg: any) => (
                  <Link
                    key={ryg.slug}
                    href={`/cars/${brand.slug}/${model.slug}/${ryg.slug}`}
                    className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                  >
                    {ryg.year_start === ryg.year_end ? ryg.year_start : `${ryg.year_start}–${ryg.year_end}`}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Related models ── */}
          {relatedModels.length > 0 && (
            <section>
              <SectionLabel>Similar Cars</SectionLabel>
              <SectionHeading>Other {brand.name} Models</SectionHeading>
              <div className="flex flex-wrap gap-2">
                {relatedModels.map((m: any) => (
                  <Link
                    key={m.slug}
                    href={`/cars/${brand.slug}/${m.slug}`}
                    className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                  >
                    {brand.name} {m.name}
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}