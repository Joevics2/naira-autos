// app/[type]/[brand]/[model]/page.tsx
// Route: /cars/honda/accord
// Layout: hero -> spare parts years (top) -> price years -> overview ->
//         pros/cons -> buying tips -> FAQ -> listings -> related

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, ArrowRight, Wrench, TrendingUp, TrendingDown, Minus,
  CheckCircle2, XCircle, Fuel, Settings, Users, Star,
} from 'lucide-react';
import { ListingCard } from '@/components/listings/ListingCard';
import {
  getSupabase, getDbType, VEHICLE_TYPES, formatPriceRange, formatYearLabel,
  MAINTENANCE_CONFIG, PARTS_CONFIG, TREND_CONFIG, getModelListings,
  type VehicleModel, type VehiclePrice, type VehicleParts,
} from '@/lib/vehicle-helpers';

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase.from('vehicle_models').select('slug, brand_slug, vehicle_type');
  return (data || []).map((m: any) => {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === m.vehicle_type
    )?.[0] ?? m.vehicle_type + 's';
    return { type: typeSlug, brand: m.brand_slug, model: m.slug };
  });
}

export async function generateMetadata(
  { params }: { params: { type: string; brand: string; model: string } }
): Promise<Metadata> {
  const supabase = getSupabase();
  const { data: m } = await supabase
    .from('vehicle_models')
    .select('brand_name, name, meta_title, meta_description, og_image_url')
    .eq('slug', params.model).eq('brand_slug', params.brand).single();
  if (!m) return {};
  const label = `${m.brand_name} ${m.name}`;
  const title = m.meta_title ?? `${label} Price in Nigeria — All Years | Naira Autos`;
  const desc  = m.meta_description ?? `${label} prices in Nigeria. Tokunbo and used prices, common problems, spare parts and buying guide.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;
  return {
    title, description: desc, alternates: { canonical: url },
    openGraph: { title, description: desc, url, images: m.og_image_url ? [{ url: m.og_image_url }] : [] },
  };
}

export default async function ModelPage(
  { params }: { params: { type: string; brand: string; model: string } }
) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();
  const dbType   = getDbType(params.type);

  const [{ data: model }, { data: relatedModels }] = await Promise.all([
    supabase.from('vehicle_models').select('*')
      .eq('slug', params.model).eq('brand_slug', params.brand).eq('vehicle_type', dbType).single(),
    supabase.from('vehicle_models').select('slug, name, body_type')
      .eq('brand_slug', params.brand).eq('vehicle_type', dbType)
      .neq('slug', params.model).eq('popular', true).limit(6),
  ]);

  if (!model) notFound();

  const [{ data: modelPrices }, { data: modelParts }] = await Promise.all([
    supabase.from('vehicle_prices')
      .select('id, slug, year_start, year_end, generation, tokunbo_price_min, tokunbo_price_max, price_trend, maintenance_score')
      .eq('model_id', model.id).order('year_start', { ascending: false }),
    supabase.from('vehicle_parts')
      .select('id, slug, year_start, year_end, generation, availability_overview')
      .eq('model_id', model.id).order('year_start', { ascending: false }),
  ]);

  const listings  = await getModelListings(model.brand_name, model.name, dbType, 6);
  const vm        = model as VehicleModel;
  const allPrices = (modelPrices || []) as Partial<VehiclePrice>[];
  const allParts  = (modelParts  || []) as Partial<VehicleParts>[];
  const carLabel  = `${vm.brand_name} ${vm.name}`;
  const canonical = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': canonical,
        name: `${carLabel} Price in Nigeria`, url: canonical,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: typeInfo.plural, item: `https://www.naira.autos/${params.type}` },
            { '@type': 'ListItem', position: 3, name: vm.brand_name,   item: `https://www.naira.autos/${params.type}/${params.brand}` },
            { '@type': 'ListItem', position: 4, name: vm.name,         item: canonical },
          ],
        },
      },
      ...(vm.faqs?.length ? [{
        '@type': 'FAQPage',
        mainEntity: vm.faqs.map(f => ({
          '@type': 'Question', name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      }] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-14">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            {[
              { label: 'Home',          href: '/' },
              { label: typeInfo.plural, href: `/${params.type}` },
              { label: vm.brand_name,   href: `/${params.type}/${params.brand}` },
            ].map(({ label, href }) => (
              <span key={href} className="flex items-center gap-1.5">
                <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
                <ChevronRight className="h-3 w-3" />
              </span>
            ))}
            <span className="text-foreground font-medium">{vm.name}</span>
          </nav>

          {/* Hero */}
          <section>
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
              {vm.brand_name} · {vm.body_type ?? typeInfo.singular}
            </p>
            <h1
              className="text-5xl sm:text-6xl font-black uppercase text-foreground mb-5 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              {carLabel}<br /><span className="text-emerald-500">Price in Nigeria</span>
            </h1>

            {/* Inline stats strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-5 text-sm text-muted-foreground">
              {vm.fuel_type && <span className="flex items-center gap-1.5"><Fuel className="h-4 w-4 text-emerald-500" />{vm.fuel_type}</span>}
              {vm.engine_summary && <span className="flex items-center gap-1.5"><Settings className="h-4 w-4 text-emerald-500" />{vm.engine_summary}</span>}
              {vm.seating && <span className="flex items-center gap-1.5"><Users className="h-4 w-4 text-emerald-500" />{vm.seating} seats</span>}
              {vm.maintenance_score && (
                <span className="flex items-center gap-1.5">
                  <Wrench className="h-4 w-4 text-emerald-500" />
                  Maintenance: <span className={`font-semibold ml-1 ${MAINTENANCE_CONFIG[vm.maintenance_score]?.color}`}>{vm.maintenance_score}</span>
                </span>
              )}
              {vm.parts_availability && (
                <span className="flex items-center gap-1.5">
                  Parts: <span className={`font-semibold ml-1 ${PARTS_CONFIG[vm.parts_availability]?.color}`}>{vm.parts_availability}</span>
                </span>
              )}
              {vm.reliability_rating && (
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />{vm.reliability_rating}/5
                </span>
              )}
            </div>

            {vm.overview && <p className="text-muted-foreground text-base leading-relaxed max-w-3xl">{vm.overview}</p>}
          </section>

          {/* ── SPARE PARTS — prominent at top ── */}
          {allParts.length > 0 && (
            <section id="parts">
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2">Spare Parts</p>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase text-foreground mb-2 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {carLabel} Spare Parts in Nigeria
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Select a generation to see Nigerian market prices for all common parts, service intervals and where to buy.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {allParts.map(p => {
                  const yl = formatYearLabel(p.year_start!, p.year_end!);
                  return (
                    <Link
                      key={p.slug}
                      href={`/${params.type}/${params.brand}/${params.model}/parts/${p.slug}`}
                      className="group flex items-center justify-between border border-border hover:border-emerald-500/60 rounded-xl px-5 py-4 transition-all hover:bg-muted/20"
                    >
                      <div className="flex items-center gap-3">
                        <Wrench className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                        <div>
                          <p
                            className="font-black text-foreground group-hover:text-emerald-400 transition-colors text-xl leading-none"
                            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                          >
                            {yl}
                          </p>
                          {p.generation && <p className="text-xs text-muted-foreground mt-0.5">{p.generation}</p>}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* ── PRICES BY YEAR ── */}
          {allPrices.length > 0 && (
            <section id="prices">
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2">Nigerian Market Prices</p>
              <h2
                className="text-3xl sm:text-4xl font-black uppercase text-foreground mb-2 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {carLabel} — Price by Year
              </h2>
              <p className="text-sm text-muted-foreground mb-5">
                Select a year group for a full price breakdown, specs, common problems and ownership costs.
              </p>
              <div className="space-y-2">
                {allPrices.map(p => {
                  const yl    = formatYearLabel(p.year_start!, p.year_end!);
                  const trend = p.price_trend ? TREND_CONFIG[p.price_trend] : null;
                  return (
                    <Link
                      key={p.slug}
                      href={`/${params.type}/${params.brand}/${params.model}/${p.slug}`}
                      className="group flex items-center justify-between border border-border hover:border-emerald-500/60 rounded-xl px-5 py-4 transition-all hover:bg-muted/20"
                    >
                      <div className="flex items-center gap-5 flex-1 min-w-0 flex-wrap">
                        <span
                          className="text-2xl font-black text-foreground flex-shrink-0 w-24"
                          style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                        >
                          {yl}
                        </span>
                        {p.generation && <span className="text-xs text-muted-foreground hidden sm:block">{p.generation}</span>}
                        {(p.tokunbo_price_min || p.tokunbo_price_max) && (
                          <span className="text-sm font-bold text-emerald-400">
                            {formatPriceRange(p.tokunbo_price_min, p.tokunbo_price_max)}
                          </span>
                        )}
                        {trend && (
                          <span className={`flex items-center gap-1 text-xs font-semibold hidden md:flex ${trend.color}`}>
                            {p.price_trend === 'rising'  && <TrendingUp  className="h-3 w-3" />}
                            {p.price_trend === 'falling' && <TrendingDown className="h-3 w-3" />}
                            {p.price_trend === 'stable'  && <Minus        className="h-3 w-3" />}
                            {trend.label}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Nigeria context — plain text */}
          {(vm.nigeria_popularity || vm.history) && (
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">In Nigeria</p>
              <h2
                className="text-3xl font-black uppercase text-foreground mb-4 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {carLabel} in the Nigerian Market
              </h2>
              {vm.nigeria_popularity && <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-3xl">{vm.nigeria_popularity}</p>}
              {vm.history && <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">{vm.history}</p>}
            </section>
          )}

          {/* Who should buy */}
          {vm.who_should_buy && (
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">Buyer Profile</p>
              <h2
                className="text-3xl font-black uppercase text-foreground mb-4 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                Is the {carLabel} Right for You?
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">{vm.who_should_buy}</p>
            </section>
          )}

          {/* Pros & Cons */}
          {(vm.pros?.length || vm.cons?.length) && (
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">Verdict</p>
              <h2
                className="text-3xl font-black uppercase text-foreground mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {carLabel} Pros & Cons
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {vm.pros?.length && (
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                      <CheckCircle2 className="h-4 w-4" /> Pros
                    </p>
                    <ul className="space-y-2.5">
                      {vm.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-emerald-500 flex-shrink-0 text-base leading-none mt-0.5">·</span>{pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {vm.cons?.length && (
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-red-500 dark:text-red-400 mb-3">
                      <XCircle className="h-4 w-4" /> Cons
                    </p>
                    <ul className="space-y-2.5">
                      {vm.cons.map((con, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className="text-red-500 flex-shrink-0 text-base leading-none mt-0.5">·</span>{con}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Buying Tips */}
          {vm.buying_tips?.length && (
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">Before You Buy</p>
              <h2
                className="text-3xl font-black uppercase text-foreground mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                What to Check When Buying a {carLabel}
              </h2>
              <ol className="space-y-3">
                {vm.buying_tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-muted-foreground">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-black flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed pt-0.5">{tip}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* FAQ */}
          {vm.faqs?.length > 0 && (
            <section>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
                Frequently Asked Questions
              </p>
              <h2
                className="text-3xl font-black uppercase text-foreground mb-6 leading-tight"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
              >
                {carLabel} — Common Questions
              </h2>
              <div className="divide-y divide-border">
                {vm.faqs.map((faq, i) => (
                  <details key={i} className="group">
                    <summary className="flex items-center justify-between gap-4 py-4 cursor-pointer list-none font-semibold text-foreground text-sm hover:text-emerald-400 transition-colors">
                      {faq.question}
                      <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="text-sm text-muted-foreground leading-relaxed pb-4 max-w-3xl">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Listings */}
          <section>
            <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">Buy Now</p>
            <h2
              className="text-3xl font-black uppercase text-foreground mb-2 leading-tight"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              {listings.length > 0 ? `${carLabel} for Sale` : `${vm.brand_name} ${typeInfo.plural} for Sale`}
            </h2>
            {listings.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-6">Live listings from verified sellers across Nigeria.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                  {listings.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} variant="grid" />
                  ))}
                </div>
                <Link
                  href={`/search?brand=${encodeURIComponent(vm.brand_name)}&q=${encodeURIComponent(vm.name)}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  View all {vm.brand_name} {vm.name} listings <ArrowRight className="h-4 w-4" />
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">
                No listings right now.{' '}
                <Link href={`/search?brand=${encodeURIComponent(vm.brand_name)}`} className="text-emerald-500 hover:underline">
                  Browse all {vm.brand_name} listings →
                </Link>
              </p>
            )}
          </section>

          {/* Related models */}
          {(relatedModels || []).length > 0 && (
            <section className="border-t border-border pt-8">
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-widest">More from {vm.brand_name}</p>
              <div className="flex flex-wrap gap-2">
                {(relatedModels || []).map((m: any) => (
                  <Link
                    key={m.slug}
                    href={`/${params.type}/${params.brand}/${m.slug}`}
                    className="px-4 py-2 rounded-xl border border-border hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                  >
                    {vm.brand_name} {m.name}
                  </Link>
                ))}
                <Link
                  href={`/${params.type}/${params.brand}`}
                  className="px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium transition-all"
                >
                  All {vm.brand_name} →
                </Link>
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}