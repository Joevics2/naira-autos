// app/cars/[brand]/page.tsx
// Route: /cars/toyota
// Simple models list. Data from Redis only.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { getAllBrands, getBrandModels } from '@/lib/car-cache';
import type { CachedModel } from '@/lib/car-cache';
import { MAINTENANCE_SCORE_CONFIG, PARTS_SCORE_CONFIG } from '@/types/cars';

// ── Static params — from Redis ────────────────────────────────────

export async function generateStaticParams() {
  const brands = await getAllBrands();
  return brands.map(b => ({ brand: b.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { brand: string } }
): Promise<Metadata> {
  const { brand } = await getBrandModels(params.brand);
  if (!brand) return {};
  const title = `${brand.name} Car Prices in Nigeria — All Models | Naira Autos`;
  const desc  = `${brand.name} car prices in Nigeria. Tokunbo and used prices, common problems, spare parts, and ownership costs for all ${brand.name} models.`;
  const url   = `https://www.naira.autos/cars/${brand.slug}`;
  return { title, description: desc, alternates: { canonical: url }, openGraph: { title, description: desc, url } };
}

// ── Helpers ───────────────────────────────────────────────────────

function formatNaira(n: number) {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `₦${(n / 1_000).toFixed(0)}k`;
  return `₦${n.toLocaleString()}`;
}

function formatYearLabel(start: number | null, end: number | null) {
  if (!start) return '—';
  return start === end ? `${start}` : `${start}–${end}`;
}

const BODY_TYPE_ORDER = ['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Minivan', 'Coupe', 'Commercial', 'Other'];

function groupByBodyType(models: CachedModel[]) {
  const groups: Record<string, CachedModel[]> = {};
  models.forEach(m => {
    const key = m.body_type || 'Other';
    if (!groups[key]) groups[key] = [];
    groups[key].push(m);
  });
  return groups;
}

// ── Page ──────────────────────────────────────────────────────────

export default async function BrandPage(
  { params }: { params: { brand: string } }
) {
  const { brand, models } = await getBrandModels(params.brand);
  if (!brand) notFound();

  const grouped     = groupByBodyType(models);
  const sortedTypes = Object.keys(grouped).sort(
    (a, b) => BODY_TYPE_ORDER.indexOf(a) - BODY_TYPE_ORDER.indexOf(b)
  );

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${brand.name} Car Prices in Nigeria`,
    url: `https://www.naira.autos/cars/${brand.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',      item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Cars',      item: 'https://www.naira.autos/cars' },
        { '@type': 'ListItem', position: 3, name: brand.name,  item: `https://www.naira.autos/cars/${brand.slug}` },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/cars" className="hover:text-foreground transition-colors">Cars</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{brand.name}</span>
          </nav>

          {/* Header */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">
              {brand.country || 'Car Brand'} · {models.length} model{models.length !== 1 ? 's' : ''}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-foreground mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {brand.name}<br />
              <span className="text-emerald-500">Prices in Nigeria</span>
            </h1>
            {brand.description && (
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{brand.description}</p>
            )}
          </section>

          {/* Models grouped by body type */}
          {sortedTypes.map(bodyType => {
            const typeModels = grouped[bodyType];
            return (
              <section key={bodyType}>
                <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
                  {bodyType}
                </h2>
                <div className="overflow-x-auto rounded-2xl border border-border">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="text-left px-5 py-3 font-semibold text-foreground">Model</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden sm:table-cell">Year</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground">Tokunbo Price</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden md:table-cell">Maintenance</th>
                        <th className="text-left px-4 py-3 font-semibold text-foreground hidden lg:table-cell">Parts</th>
                        <th className="px-4 py-3 w-10" />
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {typeModels.map(model => {
                        const mc = model.maintenance_score
                          ? MAINTENANCE_SCORE_CONFIG[model.maintenance_score as keyof typeof MAINTENANCE_SCORE_CONFIG]
                          : null;
                        const pc = model.parts_availability_score
                          ? PARTS_SCORE_CONFIG[model.parts_availability_score as keyof typeof PARTS_SCORE_CONFIG]
                          : null;

                        return (
                          <tr key={model.slug} className="hover:bg-muted/20 transition-colors group">
                            <td className="px-5 py-3.5">
                              <Link
                                href={`/cars/${brand.slug}/${model.slug}`}
                                className="font-semibold text-foreground group-hover:text-emerald-400 transition-colors"
                              >
                                {brand.name} {model.name}
                              </Link>
                            </td>
                            <td className="px-4 py-3.5 text-muted-foreground hidden sm:table-cell text-xs">
                              {formatYearLabel(model.latest_year_start, model.latest_year_end)}
                            </td>
                            <td className="px-4 py-3.5 font-semibold text-emerald-400 text-sm">
                              {model.tokunbo_price_min
                                ? `From ${formatNaira(model.tokunbo_price_min)}`
                                : '—'}
                            </td>
                            <td className="px-4 py-3.5 hidden md:table-cell">
                              {mc && (
                                <span className={`text-xs font-bold ${mc.color}`}>
                                  {model.maintenance_score}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 hidden lg:table-cell">
                              {pc && (
                                <span className={`text-xs font-bold ${pc.color}`}>
                                  {pc.icon} {model.parts_availability_score}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <Link
                                href={`/cars/${brand.slug}/${model.slug}`}
                                className="text-muted-foreground group-hover:text-emerald-500 transition-colors"
                              >
                                <ArrowRight className="h-4 w-4" />
                              </Link>
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

        </div>
      </div>
    </>
  );
}