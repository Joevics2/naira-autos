// app/[type]/[brand]/[model]/[year]/page.tsx
// Route: /cars/toyota/camry/2018
// Shows vehicle image (if available), Parts + Problems CTAs, related tools

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Wrench, AlertTriangle, ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getSupabase, getDbType, VEHICLE_TYPES, type VehicleModel } from '@/lib/vehicle-helpers';

type Params = { type: string; brand: string; model: string; year: string };

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data: parts }    = await supabase.from('vehicle_parts').select('brand_slug, model_name, vehicle_type, year');
  const { data: problems } = await supabase.from('vehicle_problems').select('brand_slug, model_name, vehicle_type, year');

  const seen = new Set<string>();
  const params: Params[] = [];

  for (const row of [...(parts || []), ...(problems || [])]) {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(
      ([, info]) => info.singular.toLowerCase() === row.vehicle_type
    )?.[0] ?? row.vehicle_type + 's';
    const key = `${typeSlug}/${row.brand_slug}/${row.model_name}/${row.year}`;
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ type: typeSlug, brand: row.brand_slug, model: row.model_name, year: String(row.year) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const supabase = getSupabase();
  const dbType = getDbType(params.type);

  const { data: m } = await supabase
    .from('vehicle_models')
    .select('brand_name, name')
    .eq('slug', params.model)
    .eq('brand_slug', params.brand)
    .maybeSingle();

  let brandName = m?.brand_name;
  let modelName = m?.name;

  if (!brandName || !modelName) {
    const { data: p } = await supabase
      .from('vehicle_parts')
      .select('brand_name, model_name')
      .eq('brand_slug', params.brand).eq('vehicle_type', dbType).eq('model_name', params.model)
      .limit(1).maybeSingle();
    brandName = brandName ?? p?.brand_name ?? params.brand;
    modelName = modelName ?? p?.model_name ?? params.model;
  }

  const label = `${brandName} ${modelName} ${params.year}`;
  const title = `${label} — Parts & Common Problems in Nigeria | Naira Autos`;
  const desc  = `Spare parts prices, common problems and owners advice for the ${label} in Nigeria.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/${params.year}`;
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

export default async function YearPage({ params }: { params: Params }) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase  = getSupabase();
  const dbType    = getDbType(params.type);
  const yearNum   = parseInt(params.year);
  if (isNaN(yearNum)) notFound();

  // Fetch model info (enrichment only — no vehicle_type requirement) and
  // this year's content in parallel. Content existence, not the
  // vehicle_models match, is what decides whether this page exists.
  const [{ data: modelRow }, { data: partsRow }, { data: problemsRow }] = await Promise.all([
    supabase
      .from('vehicle_models')
      .select('id, brand_name, name, brand_slug, vehicle_type, brand_logo_url, overview, reliability_rating, maintenance_score, parts_availability, nigeria_popularity, fuel_type, seating')
      .eq('slug', params.model)
      .eq('brand_slug', params.brand)
      .maybeSingle() as unknown as { data: VehicleModel | null },
    supabase.from('vehicle_parts').select('slug, image_url, intro, brand_name, model_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType).eq('model_name', params.model).eq('year', yearNum).maybeSingle(),
    supabase.from('vehicle_problems').select('slug, image_url, intro, brand_name, model_name').eq('brand_slug', params.brand).eq('vehicle_type', dbType).eq('model_name', params.model).eq('year', yearNum).maybeSingle(),
  ]);

  if (!partsRow && !problemsRow) notFound();

  const model: VehicleModel = modelRow ?? ({
    brand_name: partsRow?.brand_name ?? problemsRow?.brand_name ?? params.brand,
    name: params.model,
    slug: params.model,
    brand_slug: params.brand,
    vehicle_type: dbType,
  } as VehicleModel);

  const imageUrl  = partsRow?.image_url || problemsRow?.image_url || null;
  const carLabel  = `${model.brand_name} ${model.name} ${yearNum}`;
  const baseUrl   = `/${params.type}/${params.brand}/${params.model}/${params.year}`;

  const breadcrumbs = [
    { label: 'Home',             href: '/' },
    { label: typeInfo.plural,    href: '/vehicles' },
    { label: model.brand_name,   href: `/${params.type}/${params.brand}` },
    { label: model.name,         href: `/${params.type}/${params.brand}/${params.model}` },
    { label: String(yearNum),    href: baseUrl },
  ];

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: carLabel,
          description: `Spare parts prices and common problems for the ${carLabel} in Nigeria.`,
          publisher: { '@type': 'Organization', name: 'Naira Autos', url: 'https://naira.autos' },
        })}}
      />

      {/* Hero */}
      <div className="bg-background border-b border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-6">

          {/* Back */}
          <Link
            href={`/${params.type}/${params.brand}/${params.model}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" /> {model.name} all years
          </Link>

          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground mb-6">
            {breadcrumbs.map((b, i) => (
              <span key={b.href} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {i < breadcrumbs.length - 1
                  ? <Link href={b.href} className="hover:text-foreground transition-colors">{b.label}</Link>
                  : <span className="text-foreground font-medium">{b.label}</span>
                }
              </span>
            ))}
          </nav>

          {/* Vehicle image */}
          {imageUrl && (
            <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 bg-muted">
              <img
                src={imageUrl}
                alt={carLabel}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Title */}
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              <Calendar className="h-3 w-3" />{yearNum}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground border border-border rounded-full px-2.5 py-0.5">
              <Tag className="h-3 w-3" />{typeInfo.singular}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {carLabel}
          </h1>
          {model.overview && (
            <p className="text-muted-foreground leading-relaxed text-sm">{model.overview}</p>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* Quick specs */}
          {(model.fuel_type || model.seating || model.maintenance_score || model.parts_availability) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {model.fuel_type && (
                <div className="border border-border rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Fuel</p>
                  <p className="text-sm font-semibold text-foreground">{model.fuel_type}</p>
                </div>
              )}
              {model.seating && (
                <div className="border border-border rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Seats</p>
                  <p className="text-sm font-semibold text-foreground">{model.seating}</p>
                </div>
              )}
              {model.maintenance_score && (
                <div className="border border-border rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Maintenance</p>
                  <p className="text-sm font-semibold text-foreground">{model.maintenance_score}</p>
                </div>
              )}
              {model.parts_availability && (
                <div className="border border-border rounded-xl p-3 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Parts</p>
                  <p className="text-sm font-semibold text-foreground">{model.parts_availability}</p>
                </div>
              )}
            </div>
          )}

          {/* Parts + Problems CTAs */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">What do you want to know?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {partsRow && (
                <Link
                  href={`${baseUrl}/parts`}
                  className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Wrench className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Spare Parts & Prices</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {partsRow.intro ? partsRow.intro.slice(0, 80) + '…' : `Parts prices and availability for the ${carLabel} in Nigeria.`}
                    </p>
                  </div>
                </Link>
              )}
              {problemsRow && (
                <Link
                  href={`${baseUrl}/problems`}
                  className="flex items-start gap-4 p-5 rounded-xl border border-border bg-card hover:border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">Common Problems</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {problemsRow.intro ? problemsRow.intro.slice(0, 80) + '…' : `Known issues and what to watch for in the ${carLabel}.`}
                    </p>
                  </div>
                </Link>
              )}
            </div>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">Free Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { href: '/tools/vin-checker',              label: 'VIN Checker',              sub: 'Verify this car\'s history' },
                { href: '/tools/import-duty-calculator',   label: 'Import Duty Calculator',   sub: 'Estimate import costs' },
                { href: '/tools/vehicle-papers-checklist', label: 'Papers Checklist',         sub: 'Check before you buy' },
              ].map(({ href, label, sub }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Other years */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3">Other {model.name} Years</h2>
            <Link
              href={`/${params.type}/${params.brand}/${params.model}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg px-4 py-2.5 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" /> View all {model.name} years
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
