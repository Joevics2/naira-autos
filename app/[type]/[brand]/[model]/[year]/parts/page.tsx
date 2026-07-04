// app/[type]/[brand]/[model]/[year]/parts/page.tsx
// Route: /cars/toyota/camry/2018/parts

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, Wrench } from 'lucide-react';
import { getSupabase, getDbType, VEHICLE_TYPES, formatPriceRange, type SparePart, type FAQ } from '@/lib/vehicle-helpers';
import { WhereToBuySection } from '@/components/WhereToBuySection';
import { WhereToBuyJumpLink } from '@/components/WhereToBuyJumpLink';

type Params = { type: string; brand: string; model: string; year: string };

interface VehiclePart {
  id: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year: string;   // e.g. "2015" or "2004-2010"
  image_url: string | null;
  intro: string | null;
  parts: SparePart[];
  buying_guide: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  faqs: FAQ[];
}

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase.from('vehicle_parts').select('brand_slug, model_name, vehicle_type, year');
  return (data || []).map((r: any) => {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(([, info]) => info.singular.toLowerCase() === r.vehicle_type)?.[0] ?? r.vehicle_type + 's';
    return { type: typeSlug, brand: r.brand_slug, model: r.model_name, year: String(r.year) };
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('vehicle_parts')
    .select('brand_name, model_name, year, meta_title, meta_description, image_url')
    .eq('brand_slug', params.brand)
    .eq('model_name', params.model)
    .eq('year', params.year)
    .maybeSingle();

  if (!data) return {};
  const label = `${data.brand_name} ${data.model_name} ${data.year}`;
  const title = data.meta_title ?? `${label} Spare Parts Prices in Nigeria | Naira Autos`;
  const desc  = data.meta_description ?? `Common spare parts prices and availability for the ${label} in Nigeria. Engine, brakes, suspension, filters and more.`;
  const url   = `https://naira.autos/${params.type}/${params.brand}/${params.model}/${params.year}/parts`;
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, ...(data.image_url ? { images: [{ url: data.image_url }] } : {}) },
  };
}

export default async function PartsPage({ params }: { params: Params }) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();

  const { data: record } = await supabase
    .from('vehicle_parts')
    .select('*')
    .eq('brand_slug', params.brand)
    .eq('model_name', params.model)
    .eq('year', params.year)
    .maybeSingle() as { data: VehiclePart | null };

  if (!record) notFound();

  const carLabel = `${record.brand_name} ${record.model_name} ${record.year}`;
  const parts    = (record.parts ?? []) as SparePart[];
  const faqs     = (record.faqs  ?? []) as FAQ[];
  const yearBase = `/${params.type}/${params.brand}/${params.model}/${params.year}`;

  // Group parts by category
  const byCategory: Record<string, SparePart[]> = {};
  for (const part of parts) {
    const cat = part.category ?? 'Other';
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push(part);
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${carLabel} Spare Parts Prices in Nigeria`,
          description: `Spare parts prices and availability for the ${carLabel}.`,
          publisher: { '@type': 'Organization', name: 'Naira Autos', url: 'https://naira.autos' },
        })}}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Breadcrumbs + Back */}
        <nav className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1">
            {[
              { label: 'Home', href: '/' },
              { label: typeInfo.plural, href: '/vehicles' },
              { label: record.brand_name, href: `/${params.type}/${params.brand}` },
              { label: record.model_name, href: `/${params.type}/${params.brand}/${params.model}` },
              { label: params.year, href: null },
              { label: 'Parts', href: null },
            ].map((b, i) => (
              <span key={b.label + i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-3 w-3" />}
                {b.href
                  ? <Link href={b.href} className="hover:text-foreground transition-colors">{b.label}</Link>
                  : <span className="text-foreground font-medium">{b.label}</span>
                }
              </span>
            ))}
          </div>
          <Link
            href={`/${params.type}/${params.brand}/${params.model}`}
            className="inline-flex items-center gap-1 font-medium border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </Link>
        </nav>

        {/* Vehicle image */}
        {record.image_url && (
          <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted">
            <img src={record.image_url} alt={carLabel} className="w-full h-full object-cover" loading="eager" />
          </div>
        )}

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Spare Parts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {carLabel} Spare Parts Prices in Nigeria
          </h1>
          {record.intro && (
            <p className="text-muted-foreground leading-relaxed">{record.intro}</p>
          )}
          <div className="mt-3">
            <WhereToBuyJumpLink />
          </div>
        </div>

        {/* Parts by category */}
        {Object.keys(byCategory).length > 0 && (
          <div className="space-y-8">
            {Object.entries(byCategory).map(([category, catParts]) => (
              <div key={category}>
                <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">{category}</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b border-border">
                        <th className="pb-2 pr-4 font-medium">Part</th>
                        <th className="pb-2 pr-4 font-medium">Price Range</th>
                        <th className="pb-2 pr-4 font-medium">Availability</th>
                        <th className="pb-2 font-medium">Interval</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {catParts.map((part, i) => (
                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                          <td className="py-3 pr-4">
                            <span className="font-medium text-foreground">{part.part_name}</span>
                            {part.notes && <p className="text-xs text-muted-foreground mt-0.5">{part.notes}</p>}
                          </td>
                          <td className="py-3 pr-4 text-foreground font-medium">
                            {formatPriceRange(part.price_min, part.price_max)}
                          </td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              part.availability === 'Excellent' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              part.availability === 'Good'      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              part.availability === 'Fair'      ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                              {part.availability ?? '—'}
                            </span>
                          </td>
                          <td className="py-3 text-muted-foreground text-xs">{part.replacement_interval ?? '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <WhereToBuyJumpLink />
        </div>

        {/* Buying guide */}
        {record.buying_guide && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">Buying Guide</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
              {record.buying_guide.split('\n\n').map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Where to buy */}
        <WhereToBuySection />

        {/* FAQs */}
        {faqs.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="divide-y divide-border rounded-xl border border-border overflow-hidden">
              {faqs.map((faq, i) => (
                <details key={i} className="group">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-medium text-foreground text-sm select-none list-none hover:bg-muted/40 transition-colors">
                    {faq.question}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Also check problems */}
        <div className="border border-border rounded-xl p-5 bg-card">
          <p className="text-sm font-semibold text-foreground mb-1">Also worth reading</p>
          <Link
            href={`${yearBase}/problems`}
            className="flex items-center justify-between gap-2 mt-2 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
          >
            <p className="text-sm font-semibold text-amber-700 dark:text-amber-400">{carLabel} Common Issues</p>
            <ChevronRight className="h-4 w-4 text-amber-500 flex-shrink-0" />
          </Link>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { href: '/tools/vin-checker',   label: 'VIN Checker',    sub: 'Verify vehicle history' },
              { href: '/tools/ai-mechanic',   label: 'AI Mechanic',    sub: 'Diagnose a car problem' },
              { href: '/tools/best-car-for',  label: 'Best Car For Me', sub: 'Find the right car for you' },
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

      </div>
    </>
  );
}
