// app/[type]/[brand]/[model]/[price-slug]/page.tsx
// Route: /cars/honda/accord/honda-accord-2018-2022
// Full price page — specs, problems, ownership costs, FAQ, listings

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, TrendingUp, TrendingDown, Minus, Fuel, Settings,
  Users, Wrench, ArrowRight, CheckCircle2, MapPin, ShoppingBag,
} from 'lucide-react';
import {
  getSupabase, getDbType, VEHICLE_TYPES,
  formatNaira, formatPriceRange, formatYearLabel,
  MAINTENANCE_CONFIG, PARTS_CONFIG, SEVERITY_CONFIG, FREQUENCY_CONFIG, TREND_CONFIG,
  type VehiclePrice, type Problem,
} from '@/lib/vehicle-helpers';

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('vehicle_prices')
    .select('slug, brand_slug, model_name, vehicle_type')
    .limit(2000);

  return (data || []).map((p: any) => {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === p.vehicle_type
    )?.[0] ?? p.vehicle_type + 's';
    const modelSlug = p.slug.replace(`-${p.slug.split('-').slice(-2).join('-')}`, '').replace(p.brand_slug + '-', '');
    return { type: typeSlug, brand: p.brand_slug, model: modelSlug, 'price-slug': p.slug };
  });
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { type: string; brand: string; model: string; 'price-slug': string } }
): Promise<Metadata> {
  const supabase = getSupabase();
  const { data: p } = await supabase
    .from('vehicle_prices')
    .select('brand_name, model_name, year_start, year_end, tokunbo_price_min, tokunbo_price_max, meta_title, meta_description')
    .eq('slug', params['price-slug'])
    .single();

  if (!p) return {};
  const yearLabel = formatYearLabel(p.year_start, p.year_end);
  const carLabel  = `${p.brand_name} ${p.model_name} ${yearLabel}`;
  const title = p.meta_title ?? `${carLabel} Price in Nigeria — Tokunbo & Used | Naira Autos`;
  const desc  = p.meta_description ?? `${carLabel} price in Nigeria. Tokunbo ${formatPriceRange(p.tokunbo_price_min, p.tokunbo_price_max)}. Common problems, specs, ownership costs and buying guide.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/${params['price-slug']}`;
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

function PriceCard({ label, min, max, highlight = false }: {
  label: string; min?: number | null; max?: number | null; highlight?: boolean;
}) {
  if (!min && !max) return null;
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-border bg-card'}`}>
      <p className="text-xs text-muted-foreground mb-1.5">{label}</p>
      <p
        className={`text-2xl font-black leading-none ${highlight ? 'text-emerald-400' : 'text-foreground'}`}
        style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
      >
        {formatPriceRange(min, max)}
      </p>
    </div>
  );
}

const PRICE_FACTORS = [
  'Mileage — lower km commands a higher price',
  'Auction grade (Grade 4+ is clean, Grade 3 is used but decent)',
  'Trim level — higher trims cost significantly more',
  'Accident or flood history reduces value substantially',
  'Dollar/Yen exchange rate — Tokunbo prices fluctuate with the naira',
  'Service history and available documentation',
];

// ── Page ──────────────────────────────────────────────────────

export default async function PricePage(
  { params }: { params: { type: string; brand: string; model: string; 'price-slug': string } }
) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();

  const { data: p } = await supabase
    .from('vehicle_prices')
    .select('*')
    .eq('slug', params['price-slug'])
    .single();

  if (!p) notFound();

  const price = p as VehiclePrice;

  // Related year groups for same model
  const { data: relatedPrices } = await supabase
    .from('vehicle_prices')
    .select('slug, year_start, year_end, generation, tokunbo_price_min')
    .eq('model_id', price.model_id)
    .neq('slug', params['price-slug'])
    .order('year_start', { ascending: false })
    .limit(6);

  // Parts for this model
  const { data: partsLinks } = await supabase
    .from('vehicle_parts')
    .select('slug, year_start, year_end, generation')
    .eq('model_id', price.model_id)
    .order('year_start', { ascending: false })
    .limit(3);



  const yearLabel    = formatYearLabel(price.year_start, price.year_end);
  const carLabel     = `${price.brand_name} ${price.model_name} ${yearLabel}`;
  const canonicalUrl = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/${params['price-slug']}`;
  const modelUrl     = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;

  const problems = (price.problems ?? []) as Problem[];
  const oc       = price.ownership_cost as any;

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
            { '@type': 'ListItem', position: 1, name: 'Home',               item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: typeInfo.plural,      item: `https://www.naira.autos/${params.type}` },
            { '@type': 'ListItem', position: 3, name: price.brand_name,     item: `https://www.naira.autos/${params.type}/${params.brand}` },
            { '@type': 'ListItem', position: 4, name: price.model_name,     item: modelUrl },
            { '@type': 'ListItem', position: 5, name: yearLabel,            item: canonicalUrl },
          ],
        },
      },
      ...(problems.length > 0 ? [{
        '@type': 'FAQPage',
        mainEntity: problems.map(prob => ({
          '@type': 'Question',
          name: `What is the "${prob.title}" problem on the ${carLabel}?`,
          acceptedAnswer: { '@type': 'Answer', text: prob.description },
        })),
      }] : []),
      ...(price.faqs?.length ? [{
        '@type': 'FAQPage',
        mainEntity: price.faqs.map(f => ({
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
              { label: 'Home',              href: '/' },
              { label: typeInfo.plural,     href: `/${params.type}` },
              { label: price.brand_name,    href: `/${params.type}/${params.brand}` },
              { label: price.model_name,    href: modelUrl },
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
            <SectionLabel>
              {price.brand_name} · {price.generation ?? yearLabel}
            </SectionLabel>
            <h1
              className="text-5xl sm:text-6xl font-black uppercase text-foreground mb-4 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              {carLabel}<br />
              <span className="text-emerald-500">Price in Nigeria</span>
            </h1>

            <div className="flex flex-wrap items-center gap-4 mb-5">
              {price.fuel_type && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Fuel className="h-4 w-4 text-emerald-500" />{price.fuel_type}
                </span>
              )}
              {price.engine_options?.[0] && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Settings className="h-4 w-4 text-emerald-500" />{price.engine_options[0]}
                </span>
              )}
              {price.seating && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Users className="h-4 w-4 text-emerald-500" />{price.seating} seats
                </span>
              )}
              {price.maintenance_score && (
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Wrench className="h-4 w-4 text-emerald-500" />
                  Maint.:
                  <span className={`text-xs font-bold ml-1 ${MAINTENANCE_CONFIG[price.maintenance_score]?.color}`}>
                    {price.maintenance_score}
                  </span>
                </span>
              )}
            </div>

            {price.overview && (
              <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">{price.overview}</p>
            )}
          </section>

          {/* ── Prices ── */}
          <section>
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
              <div>
                <SectionLabel>Nigerian Market</SectionLabel>
                <SectionHeading>{carLabel} Price in Nigeria</SectionHeading>
              </div>
              {price.price_trend && (() => {
                const trend = TREND_CONFIG[price.price_trend];
                return trend ? (
                  <span className={`flex items-center gap-1.5 text-sm font-semibold ${trend.color}`}>
                    {price.price_trend === 'rising'  && <TrendingUp  className="h-4 w-4" />}
                    {price.price_trend === 'falling' && <TrendingDown className="h-4 w-4" />}
                    {price.price_trend === 'stable'  && <Minus        className="h-4 w-4" />}
                    {trend.label}
                  </span>
                ) : null;
              })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <PriceCard label="Tokunbo (Foreign Used)"   min={price.tokunbo_price_min}      max={price.tokunbo_price_max}      highlight />
              <PriceCard label="Nigerian Used"            min={price.nigerian_used_price_min} max={price.nigerian_used_price_max} />
              <PriceCard label="Brand New (Authorised)"   min={price.brand_new_price_min}     max={price.brand_new_price_max}     />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-2xl p-5">
                <h3 className="font-bold text-foreground text-sm mb-3">What Affects the Price</h3>
                <ul className="space-y-2">
                  {PRICE_FACTORS.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-emerald-500 mt-0.5 flex-shrink-0">·</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
              {price.tokunbo_vs_used_analysis && (
                <div className="bg-card border border-border rounded-2xl p-5">
                  <h3 className="font-bold text-foreground text-sm mb-3">Tokunbo vs Nigerian Used</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{price.tokunbo_vs_used_analysis}</p>
                </div>
              )}
            </div>

            {price.price_updated_at && (
              <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                Prices last updated {new Date(price.price_updated_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            )}
          </section>

          {/* ── Specs ── */}
          {(price.engine_options?.length || price.fuel_type || price.transmission?.length) && (
            <section>
              <SectionLabel>Specifications</SectionLabel>
              <SectionHeading>{carLabel} Specs & Variants</SectionHeading>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-border">
                    {[
                      { label: 'Engine',                  value: price.engine_options?.join(', ')    },
                      { label: 'Transmission',            value: price.transmission?.join(', ')      },
                      { label: 'Fuel Type',               value: price.fuel_type                     },
                      { label: 'Drive Type',              value: price.drive_type                    },
                      { label: 'Seating',                 value: price.seating ? `${price.seating} seats` : undefined },
                      { label: 'Fuel Economy (City)',     value: price.fuel_consumption_city     ? `${price.fuel_consumption_city}L/100km`     : undefined },
                      { label: 'Fuel Economy (Hwy)',      value: price.fuel_consumption_highway  ? `${price.fuel_consumption_highway}L/100km`  : undefined },
                      { label: 'Fuel Economy (Combined)', value: price.fuel_consumption_combined ? `${price.fuel_consumption_combined}L/100km` : undefined },
                      { label: 'Tank Size',               value: price.tank_size_litres ? `${price.tank_size_litres}L` : undefined },
                      { label: 'Trim Levels',             value: price.trim_levels?.join(', ')       },
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
          {price.what_to_look_out_for?.length && (
            <section>
              <SectionLabel>Buyer's Guide</SectionLabel>
              <SectionHeading>What to Check Before Buying the {carLabel}</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {price.what_to_look_out_for.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              {price.buying_tips && (
                <div className="mt-4 bg-card border border-border rounded-2xl p-5">
                  <p className="text-sm text-muted-foreground leading-relaxed">{price.buying_tips}</p>
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
                {problems.map((prob, i) => {
                  const sev  = SEVERITY_CONFIG[prob.severity]  ?? SEVERITY_CONFIG.minor;
                  const freq = FREQUENCY_CONFIG[prob.frequency] ?? FREQUENCY_CONFIG.rare;
                  return (
                    <div key={i} className={`rounded-2xl border p-5 ${sev.bg}`}>
                      <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
                        <h3 className="font-bold text-foreground text-sm">{prob.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-bold ${freq.color}`}>{freq.label}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${sev.bg} ${sev.color}`}>
                            {sev.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{prob.description}</p>
                      {(prob.repair_cost_min || prob.repair_cost_max) && (
                        <p className="text-xs font-semibold text-foreground">
                          Repair cost: <span className="text-emerald-400">
                            {formatPriceRange(prob.repair_cost_min, prob.repair_cost_max)}
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── Ownership Costs ── */}
          {oc && Object.keys(oc).length > 0 && (
            <section>
              <SectionLabel>Running Costs</SectionLabel>
              <SectionHeading>Cost of Owning the {carLabel} in Nigeria</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {(oc.annual_fuel_cost_min || oc.annual_fuel_cost_max) && (
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <p className="text-xs text-muted-foreground mb-1.5">Annual Fuel Cost</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {formatPriceRange(oc.annual_fuel_cost_min, oc.annual_fuel_cost_max)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Lagos daily commute estimate</p>
                  </div>
                )}
                {(oc.annual_maintenance_cost_min || oc.annual_maintenance_cost_max) && (
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <p className="text-xs text-muted-foreground mb-1.5">Annual Maintenance</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {formatPriceRange(oc.annual_maintenance_cost_min, oc.annual_maintenance_cost_max)}
                    </p>
                  </div>
                )}
                {(oc.insurance_estimate_min || oc.insurance_estimate_max) && (
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <p className="text-xs text-muted-foreground mb-1.5">Insurance (Annual)</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {formatPriceRange(oc.insurance_estimate_min, oc.insurance_estimate_max)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Third-party minimum</p>
                  </div>
                )}
              </div>
              {oc.notes && <p className="text-sm text-muted-foreground leading-relaxed">{oc.notes}</p>}
            </section>
          )}

          {/* ── Spare Parts Link ── */}
          {(partsLinks || []).length > 0 && (
            <section>
              <SectionLabel>Spare Parts</SectionLabel>
              <SectionHeading>{carLabel} Spare Parts Prices</SectionHeading>
              <div className="space-y-2">
                {(partsLinks || []).map((pl: any) => (
                  <Link
                    key={pl.slug}
                    href={`/${params.type}/${params.brand}/${params.model}/parts/${pl.slug}`}
                    className="flex items-center justify-between bg-card border border-border hover:border-emerald-500/50 rounded-2xl p-5 group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground group-hover:text-emerald-400 transition-colors">
                          {formatYearLabel(pl.year_start, pl.year_end)} Parts{pl.generation ? ` · ${pl.generation}` : ''}
                        </p>
                        <p className="text-xs text-muted-foreground">Brake pads, filters, suspension and more with Nigerian prices</p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── FAQ ── */}
          {price.faqs?.length > 0 && (
            <section>
              <SectionLabel>Frequently Asked Questions</SectionLabel>
              <SectionHeading>{carLabel} — Common Questions</SectionHeading>
              <div className="space-y-3">
                {price.faqs.map((faq, i) => (
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

          {/* ── Other year groups ── */}
          {(relatedPrices || []).length > 0 && (
            <section className="border-t border-border pt-8">
              <SectionLabel>Other Years</SectionLabel>
              <div className="flex flex-wrap gap-2">
                {(relatedPrices || []).map((rp: any) => (
                  <Link
                    key={rp.slug}
                    href={`/${params.type}/${params.brand}/${params.model}/${rp.slug}`}
                    className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                  >
                    {formatYearLabel(rp.year_start, rp.year_end)}
                    {rp.tokunbo_price_min && (
                      <span className="ml-2 text-xs text-emerald-400">From {formatNaira(rp.tokunbo_price_min)}</span>
                    )}
                  </Link>
                ))}
                <Link
                  href={modelUrl}
                  className="px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium transition-all"
                >
                  All {price.model_name} Years →
                </Link>
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}