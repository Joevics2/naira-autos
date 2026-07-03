// app/[type]/[brand]/[model]/page.tsx
// Route: /cars/toyota/camry
// Shows model overview + year cards linking to /[year] pages

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronRight, Wrench, Fuel, Settings, Users, Star, Calendar,
} from 'lucide-react';
import {
  getSupabase, getDbType, VEHICLE_TYPES,
  MAINTENANCE_CONFIG, PARTS_CONFIG,
  type VehicleModel, type FAQ,
} from '@/lib/vehicle-helpers';

type Params = { type: string; brand: string; model: string };

export async function generateStaticParams() {
  const supabase = getSupabase();

  // Only pre-render models that actually have parts or problems content —
  // same active-content rule as the type and brand pages, so legacy
  // vehicle_models rows with no migrated data don't get static pages.
  const [{ data: parts }, { data: problems }] = await Promise.all([
    supabase.from('vehicle_parts').select('brand_slug, model_name, vehicle_type'),
    supabase.from('vehicle_problems').select('brand_slug, model_name, vehicle_type'),
  ]);

  const seen = new Set<string>();
  const results: { type: string; brand: string; model: string }[] = [];

  for (const row of [...(parts || []), ...(problems || [])]) {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === row.vehicle_type
    )?.[0] ?? row.vehicle_type + 's';
    const key = `${typeSlug}/${row.brand_slug}/${row.model_name}`;
    if (!seen.has(key)) {
      seen.add(key);
      results.push({ type: typeSlug, brand: row.brand_slug, model: row.model_name });
    }
  }
  return results;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const supabase = getSupabase();
  const { data: m } = await supabase
    .from('vehicle_models')
    .select('brand_name, name, meta_title, meta_description, og_image_url')
    .eq('slug', params.model).eq('brand_slug', params.brand).single();
  if (!m) return {};
  const label = `${m.brand_name} ${m.name}`;
  const title = m.meta_title ?? `${label} — Spare Parts & Common Problems in Nigeria | Naira Autos`;
  const desc  = m.meta_description ?? `${label} spare parts prices and common problems in Nigeria. Select a year for detailed information.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;
  return {
    title, description: desc, alternates: { canonical: url },
    openGraph: { title, description: desc, url, images: m.og_image_url ? [{ url: m.og_image_url }] : [] },
  };
}

export default async function ModelPage({ params }: { params: Params }) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();
  const dbType   = getDbType(params.type);

  const [
    { data: modelRow },
    { data: relatedModelsRaw },
    { data: relatedPartModels },
    { data: relatedProblemModels },
    { data: partYears },
    { data: problemYears },
  ] = await Promise.all([
    // Enrichment only — no vehicle_type requirement, so a mismatch there
    // never hides an otherwise-active model.
    supabase.from('vehicle_models').select('*')
      .eq('slug', params.model).eq('brand_slug', params.brand).maybeSingle(),
    supabase.from('vehicle_models').select('slug, name, body_type')
      .eq('brand_slug', params.brand).eq('vehicle_type', dbType)
      .neq('slug', params.model).eq('popular', true).limit(12),
    supabase.from('vehicle_parts').select('model_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType),
    supabase.from('vehicle_problems').select('model_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType),
    // Source of truth for this model's content — keyed on brand_slug/model_name,
    // not model_id, so a broken/missing model_id link doesn't hide content.
    supabase.from('vehicle_parts').select('year, image_url, brand_name, model_name')
      .eq('brand_slug', params.brand).eq('vehicle_type', dbType).eq('model_name', params.model)
      .order('year', { ascending: false }),
    supabase.from('vehicle_problems').select('year, brand_name, model_name')
      .eq('brand_slug', params.brand).eq('vehicle_type', dbType).eq('model_name', params.model)
      .order('year', { ascending: false }),
  ]);

  // Model exists in vehicle_models but has no migrated parts/problems content —
  // this is exactly the old-format case that should no longer be reachable.
  if (!partYears?.length && !problemYears?.length) notFound();

  // Only cross-link to sibling models that have migrated parts/problems content
  const activeSiblingModels = new Set([
    ...(relatedPartModels || []).map((r: any) => r.model_name),
    ...(relatedProblemModels || []).map((r: any) => r.model_name),
  ]);
  const relatedModels = (relatedModelsRaw || [])
    .filter((m: any) => activeSiblingModels.has(m.slug))
    .slice(0, 6);

  // Merge into unique sorted year list
  const allYearNums = Array.from(new Set([
    ...(partYears || []).map((r: any) => r.year),
    ...(problemYears || []).map((r: any) => r.year),
  ])).sort((a, b) => b - a);

  // Build a map: year → { hasParts, hasProblems, imageUrl }
  const yearMap: Record<number, { hasParts: boolean; hasProblems: boolean; imageUrl: string | null }> = {};
  for (const y of allYearNums) {
    yearMap[y] = { hasParts: false, hasProblems: false, imageUrl: null };
  }
  for (const r of partYears || []) {
    if (yearMap[r.year]) { yearMap[r.year].hasParts = true; yearMap[r.year].imageUrl = r.image_url; }
  }
  for (const r of problemYears || []) {
    if (yearMap[r.year]) yearMap[r.year].hasProblems = true;
  }

  const fallbackBrandName = partYears?.[0]?.brand_name ?? problemYears?.[0]?.brand_name ?? params.brand;
  const model = modelRow ?? {
    slug: params.model,
    name: params.model,
    brand_slug: params.brand,
    brand_name: fallbackBrandName,
    vehicle_type: dbType,
    body_type: null,
  };

  const vm       = model as VehicleModel;
  const carLabel = `${vm.brand_name} ${vm.name}`;
  const canonical = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}`;
  const faqs      = (vm.faqs || []) as FAQ[];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage', '@id': canonical,
            name: carLabel, url: canonical,
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
          ...(faqs.length ? [{
            '@type': 'FAQPage',
            mainEntity: faqs.map(f => ({
              '@type': 'Question', name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          }] : []),
        ],
      })}} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
          {[
            { label: 'Home',          href: '/' },
            { label: typeInfo.plural, href: '/vehicles' },
            { label: vm.brand_name,   href: `/${params.type}/${params.brand}` },
          ].map(({ label, href }) => (
            <span key={href} className="flex items-center gap-1">
              <Link href={href} className="hover:text-foreground transition-colors">{label}</Link>
              <ChevronRight className="h-3 w-3" />
            </span>
          ))}
          <span className="text-foreground font-medium">{vm.name}</span>
        </nav>

        {/* Hero */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">
            {vm.brand_name} · {vm.body_type ?? typeInfo.singular}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">{carLabel}</h1>
          {vm.overview && (
            <p className="text-muted-foreground leading-relaxed text-sm">{vm.overview}</p>
          )}
        </div>

        {/* Quick specs */}
        {(vm.fuel_type || vm.seating || vm.maintenance_score || vm.parts_availability || vm.reliability_rating) && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {vm.fuel_type && (
              <div className="border border-border rounded-xl p-3 text-center">
                <Fuel className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Fuel</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{vm.fuel_type}</p>
              </div>
            )}
            {vm.seating && (
              <div className="border border-border rounded-xl p-3 text-center">
                <Users className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Seats</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{vm.seating}</p>
              </div>
            )}
            {vm.maintenance_score && (
              <div className="border border-border rounded-xl p-3 text-center">
                <Wrench className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Maintenance</p>
                <p className={`text-sm font-semibold mt-0.5 ${MAINTENANCE_CONFIG[vm.maintenance_score]?.color ?? 'text-foreground'}`}>
                  {vm.maintenance_score}
                </p>
              </div>
            )}
            {vm.reliability_rating && (
              <div className="border border-border rounded-xl p-3 text-center">
                <Star className="h-4 w-4 text-amber-400 mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">Reliability</p>
                <p className="text-sm font-semibold text-foreground mt-0.5">{vm.reliability_rating}/5</p>
              </div>
            )}
          </div>
        )}

        {/* Year cards */}
        {allYearNums.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Select a Year
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allYearNums.map(year => {
                const info = yearMap[year];
                return (
                  <Link
                    key={year}
                    href={`/${params.type}/${params.brand}/${params.model}/${year}`}
                    className="group flex flex-col border border-border rounded-xl overflow-hidden hover:border-foreground/30 transition-colors bg-card"
                  >
                    {info.imageUrl ? (
                      <div className="aspect-video bg-muted overflow-hidden">
                        <img
                          src={info.imageUrl}
                          alt={`${carLabel} ${year}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <span className="text-3xl font-black text-muted-foreground/30">{year}</span>
                      </div>
                    )}
                    <div className="p-3">
                      <p className="font-bold text-foreground text-lg">{year}</p>
                      <div className="flex gap-2 mt-1">
                        {info.hasParts && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Parts</span>
                        )}
                        {info.hasProblems && (
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-medium">Problems</span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Pros & cons */}
        {((vm.pros?.length ?? 0) > 0 || (vm.cons?.length ?? 0) > 0) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(vm.pros?.length ?? 0) > 0 && (
              <div className="border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-3">What owners like</h3>
                <ul className="space-y-2">
                  {vm.pros!.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {(vm.cons?.length ?? 0) > 0 && (
              <div className="border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground mb-3">Common complaints</h3>
                <ul className="space-y-2">
                  {vm.cons!.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-red-400 flex-shrink-0 mt-0.5">✕</span>{c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Buying tips */}
        {(vm.buying_tips?.length ?? 0) > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">Buying Tips</h2>
            <ul className="space-y-2">
              {vm.buying_tips!.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground p-3 border border-border rounded-lg">
                  <span className="font-bold text-foreground flex-shrink-0">{i + 1}.</span>{tip}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related tools */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { href: '/tools/vin-checker',              label: 'VIN Checker',            sub: 'Verify vehicle history' },
              { href: '/tools/import-duty-calculator',   label: 'Import Duty Calculator', sub: 'Estimate import costs' },
              { href: '/tools/vehicle-papers-checklist', label: 'Papers Checklist',       sub: 'What to verify before buying' },
            ].map(({ href, label, sub }) => (
              <Link key={href} href={href} className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors">
                <div>
                  <p className="text-sm font-semibold text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground">{sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Related models */}
        {(relatedModels?.length ?? 0) > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">Other {vm.brand_name} Models</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {relatedModels!.map((m: any) => (
                <Link
                  key={m.slug}
                  href={`/${params.type}/${params.brand}/${m.slug}`}
                  className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{m.name}</p>
                    {m.body_type && <p className="text-xs text-muted-foreground">{m.body_type}</p>}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-foreground text-sm select-none list-none hover:bg-muted/40 transition-colors">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
