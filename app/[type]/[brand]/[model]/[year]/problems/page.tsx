// app/[type]/[brand]/[model]/[year]/problems/page.tsx
// Route: /cars/toyota/camry/2018/problems

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, AlertTriangle } from 'lucide-react';
import { getSupabase, getDbType, VEHICLE_TYPES, formatPriceRange, SEVERITY_CONFIG, FREQUENCY_CONFIG, type Problem, type FAQ } from '@/lib/vehicle-helpers';

type Params = { type: string; brand: string; model: string; year: string };

interface VehicleProblem {
  id: string;
  brand_name: string;
  model_name: string;
  vehicle_type: string;
  year: number;
  image_url: string | null;
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
  const { data } = await supabase.from('vehicle_problems').select('brand_slug, model_name, vehicle_type, year');
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
    .eq('year', parseInt(params.year))
    .maybeSingle();

  if (!data) return {};
  const label = `${data.brand_name} ${data.model_name} ${data.year}`;
  const title = data.meta_title ?? `${label} Common Problems & Issues in Nigeria | Naira Autos`;
  const desc  = data.meta_description ?? `Known problems, common issues and owners advice for the ${label} in Nigeria. What to check before buying.`;
  const url   = `https://naira.autos/${params.type}/${params.brand}/${params.model}/${params.year}/problems`;
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
  const yearNum  = parseInt(params.year);
  if (isNaN(yearNum)) notFound();

  const { data: record } = await supabase
    .from('vehicle_problems')
    .select('*')
    .eq('brand_slug', params.brand)
    .eq('model_name', params.model)
    .eq('year', yearNum)
    .maybeSingle() as { data: VehicleProblem | null };

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
          headline: `${carLabel} Common Problems in Nigeria`,
          description: `Known problems and issues for the ${carLabel}.`,
          publisher: { '@type': 'Organization', name: 'Naira Autos', url: 'https://naira.autos' },
        })}}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-10">

        {/* Back */}
        <Link href={yearBase} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to {carLabel}
        </Link>

        {/* Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground -mt-6">
          {[
            { label: 'Home', href: '/' },
            { label: typeInfo.plural, href: '/vehicles' },
            { label: record.brand_name, href: `/${params.type}/${params.brand}` },
            { label: record.model_name, href: `/${params.type}/${params.brand}/${params.model}` },
            { label: String(yearNum), href: yearBase },
            { label: 'Problems', href: `${yearBase}/problems` },
          ].map((b, i) => (
            <span key={b.href} className="flex items-center gap-1">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i < 5
                ? <Link href={b.href} className="hover:text-foreground transition-colors">{b.label}</Link>
                : <span className="text-foreground font-medium">{b.label}</span>
              }
            </span>
          ))}
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
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Common Problems</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            {carLabel} Common Problems & Issues
          </h1>
          {record.intro && (
            <p className="text-muted-foreground leading-relaxed">{record.intro}</p>
          )}
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

        {/* Also check parts */}
        <div className="border border-border rounded-xl p-5 bg-card">
          <p className="text-sm font-semibold text-foreground mb-2">Also worth reading</p>
          <Link
            href={`${yearBase}/parts`}
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">{carLabel} Spare Parts Prices</p>
            <ChevronRight className="h-4 w-4 text-blue-500 flex-shrink-0" />
          </Link>
        </div>

        {/* Related tools */}
        <div>
          <h2 className="text-lg font-bold text-foreground mb-3">Free Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {[
              { href: '/tools/vin-checker',              label: 'VIN Checker',            sub: 'Check vehicle history' },
              { href: '/tools/vehicle-papers-checklist', label: 'Papers Checklist',       sub: 'What to verify before buying' },
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
