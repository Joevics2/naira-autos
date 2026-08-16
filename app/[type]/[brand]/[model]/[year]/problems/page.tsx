// app/[type]/[brand]/[model]/[year]/problems/page.tsx
// Route: /cars/toyota/camry/2018/problems

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { getSupabase, getDbType, VEHICLE_TYPES, formatPriceRange, SEVERITY_CONFIG, FREQUENCY_CONFIG, type Problem, type FAQ } from '@/lib/vehicle-helpers';
import { WhereToBuySection } from '@/components/WhereToBuySection';
import { WhereToBuyJumpLink } from '@/components/WhereToBuyJumpLink';

type Params = { type: string; brand: string; model: string; year: string };

export const revalidate = 86400; // ISR: revalidate once every 24h so newly-published content shows up within a day, instead of hitting Supabase on every single request

interface VehicleProblem {
  id: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year: string;   // e.g. "2015" or "2004-2010"
  image_url: string | null;
  image_reference: string | null;
  intro: string | null;
  problems: Problem[];
  owners_advice: string | null;
  slug: string;
  meta_title: string | null;
  meta_description: string | null;
  faqs: FAQ[];
}

export async function generateStaticParams() {
  const supabase = getSupabase();
  const { data } = await supabase.from('vehicle_problems').select('brand_slug, model_name, vehicle_type, year').eq('is_published', true);
  return (data || []).map((r: any) => {
    const typeSlug = Object.entries(VEHICLE_TYPES).find(([, info]) => info.singular.toLowerCase() === r.vehicle_type)?.[0] ?? r.vehicle_type + 's';
    return { type: typeSlug, brand: r.brand_slug, model: r.model_name, year: String(r.year) };
  });
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const supabase = getSupabase();
  const { data } = await supabase
    .from('vehicle_problems')
    .select('brand_name, model_name, year, meta_title, meta_description, image_url')
    .eq('brand_slug', params.brand)
    .eq('model_name', params.model)
    .eq('year', params.year)
    .maybeSingle();

  if (!data) return {};
  const label = `${data.brand_name} ${data.model_name} ${data.year}`;
  const title = data.meta_title ?? `${label} Common Problems & Issues | Naira Autos`;
  const desc  = data.meta_description ?? `Known problems, common issues and owner's advice for the ${label}. What to check before buying.`;
  const url   = `https://www.naira.autos/${params.type}/${params.brand}/${params.model}/${params.year}/problems`;
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url, ...(data.image_url ? { images: [{ url: data.image_url }] } : {}) },
  };
}

export default async function ProblemsPage({ params }: { params: Params }) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const supabase = getSupabase();
  const [{ data: record }, { data: partsCheck }, { data: maintenanceCheck }] = await Promise.all([
    supabase.from('vehicle_problems').select('*')
      .eq('brand_slug', params.brand).eq('model_name', params.model).eq('year', params.year).eq('is_published', true)
      .maybeSingle() as unknown as Promise<{ data: VehicleProblem | null }>,
    supabase.from('vehicle_parts').select('slug')
      .eq('brand_slug', params.brand).eq('model_name', params.model).eq('year', params.year).eq('is_published', true)
      .maybeSingle(),
    supabase.from('vehicle_maintenance').select('slug')
      .eq('brand_slug', params.brand).eq('model_name', params.model).eq('year', params.year).eq('is_published', true)
      .maybeSingle(),
  ]);

  if (!record) notFound();

  const carLabel = `${record.brand_name} ${record.model_name} ${record.year}`;
  const problems = (record.problems ?? []) as Problem[];
  const faqs     = (record.faqs    ?? []) as FAQ[];
  const yearBase = `/${params.type}/${params.brand}/${params.model}/${params.year}`;

  const criticalCount   = problems.filter(p => p.severity === 'critical').length;
  const moderateCount   = problems.filter(p => p.severity === 'moderate').length;
  const minorCount      = problems.filter(p => p.severity === 'minor').length;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: `${carLabel} Common Problems & Issues`,
          description: `Known problems and issues for the ${carLabel}.`,
          publisher: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
        })}}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Breadcrumbs + Back */}
        <nav className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1">
            {[
              { label: 'Home', href: '/' },
              { label: typeInfo.plural, href: '/vehicles' },
              { label: record.brand_name, href: null },
              { label: record.model_name, href: `/${params.type}/${params.brand}/${params.model}` },
              { label: params.year, href: null },
              { label: 'Issues', href: null },
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
          <div>
            <div className="w-full aspect-video rounded-xl overflow-hidden bg-muted">
              <img src={record.image_url} alt={carLabel} className="w-full h-full object-cover" loading="eager" />
            </div>
            {record.image_reference && (
              <a
                href={record.image_reference}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2 mt-1.5 inline-block"
              >
                Image credit
              </a>
            )}
          </div>
        )}

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Common Issues</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 capitalize">
            {carLabel} Common Problems & Issues
          </h1>
          {record.intro && (
            <p className="text-muted-foreground leading-relaxed">{record.intro}</p>
          )}
          <div className="mt-3">
            <WhereToBuyJumpLink />
          </div>
        </div>

        {/* Problem summary */}
        {problems.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{criticalCount}</p>
              <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-0.5">Critical</p>
            </div>
            <div className="border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{moderateCount}</p>
              <p className="text-xs text-amber-600/70 dark:text-amber-400/70 mt-0.5">Moderate</p>
            </div>
            <div className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{minorCount}</p>
              <p className="text-xs text-blue-600/70 dark:text-blue-400/70 mt-0.5">Minor</p>
            </div>
          </div>
        )}

        {/* Problems list */}
        {problems.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Known Issues</h2>
            {problems.map((problem, i) => {
              const sev  = SEVERITY_CONFIG[problem.severity]  ?? SEVERITY_CONFIG.minor;
              const freq = FREQUENCY_CONFIG[problem.frequency] ?? FREQUENCY_CONFIG.rare;
              return (
                <div key={i} className="border border-border rounded-xl p-5 bg-card">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-semibold text-foreground">{problem.title}</h3>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium border flex-shrink-0 ${sev.bg} ${sev.color}`}>
                      {sev.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{problem.description}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className={`font-medium ${freq.color}`}>{freq.label}</span>
                    {(problem.repair_cost_min || problem.repair_cost_max) && (
                      <span className="text-muted-foreground">
                        Repair: {formatPriceRange(problem.repair_cost_min, problem.repair_cost_max)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center">
          <WhereToBuyJumpLink />
        </div>

        {/* Owner's advice */}
        {record.owners_advice && (
          <div>
            <h2 className="text-xl font-bold text-foreground mb-3">What to Check Before Buying</h2>
            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5">
              {record.owners_advice.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">{p}</p>
              ))}
            </div>
          </div>
        )}

        {/* Where to buy — repair parts related to these issues */}
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

        {/* Also worth reading — only link to sibling pages that actually exist */}
        {(partsCheck || maintenanceCheck) && (
          <div className="border border-border rounded-xl p-5 bg-card space-y-2">
            <p className="text-sm font-semibold text-foreground mb-1">Also worth reading</p>
            {partsCheck && (
              <Link
                href={`${yearBase}/parts`}
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{carLabel} Spare Parts &amp; Pricing</p>
                <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0" />
              </Link>
            )}
            {maintenanceCheck && (
              <Link
                href={`${yearBase}/maintenance`}
                className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
              >
                <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">{carLabel} Maintenance Schedule</p>
                <ChevronRight className="h-4 w-4 text-teal-500 flex-shrink-0" />
              </Link>
            )}
          </div>
        )}

        {/* Related tools */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { href: '/tools/vin-checker',   label: 'VIN Checker',    sub: 'Check vehicle history' },
              { href: '/tools/ai-mechanic',   label: 'AI Mechanic',    sub: 'Diagnose a car problem' },
              { href: '/tools/best-car-for',  label: 'Best Car For Me', sub: 'Find the right car for you' },
              { href: '/tools/ai-mechanic',              label: 'AI Mechanic',            sub: 'Diagnose car problems free' },
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
