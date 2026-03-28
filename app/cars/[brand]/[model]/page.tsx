// app/cars/[brand]/[model]/page.tsx
// Route: /cars/toyota/camry
// Lists all year groups + parts generations. Simple. Data from Redis only.

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Wrench } from 'lucide-react';
import { getAllBrands, getBrandModels, getModelYearGroups } from '@/lib/car-cache';
import { MAINTENANCE_SCORE_CONFIG, PARTS_SCORE_CONFIG, formatPriceRange } from '@/types/cars';

// ── Static params — from Redis ────────────────────────────────────

export async function generateStaticParams() {
  const brands = await getAllBrands();
  const results: { brand: string; model: string }[] = [];
  await Promise.all(
    brands.map(async b => {
      const { models } = await getBrandModels(b.slug);
      models.forEach(m => results.push({ brand: b.slug, model: m.slug }));
    })
  );
  return results;
}

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { brand: string; model: string } }
): Promise<Metadata> {
  const { brand, model } = await getModelYearGroups(params.brand, params.model);
  if (!brand || !model) return {};
  const title = `${brand.name} ${model.name} Price in Nigeria — All Years | Naira Autos`;
  const desc  = `${brand.name} ${model.name} prices in Nigeria for all years. Tokunbo and used prices, common problems, spare parts, and buying guides.`;
  const url   = `https://www.naira.autos/cars/${brand.slug}/${model.slug}`;
  return { title, description: desc, alternates: { canonical: url }, openGraph: { title, description: desc, url } };
}

// ── Helpers ───────────────────────────────────────────────────────

function formatYearLabel(start: number, end: number) {
  return start === end ? `${start}` : `${start}–${end}`;
}

// ── Page ──────────────────────────────────────────────────────────

export default async function ModelPage(
  { params }: { params: { brand: string; model: string } }
) {
  const { brand, model, yearGroups, siblingModels } = await getModelYearGroups(params.brand, params.model);
  if (!brand || !model) notFound();

  const partsGenerations = yearGroups.filter(yg => yg.has_parts);

  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${brand.name} ${model.name} Price in Nigeria — All Years`,
    url: `https://www.naira.autos/cars/${brand.slug}/${model.slug}`,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',      item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Cars',      item: 'https://www.naira.autos/cars' },
        { '@type': 'ListItem', position: 3, name: brand.name,  item: `https://www.naira.autos/cars/${brand.slug}` },
        { '@type': 'ListItem', position: 4, name: model.name,  item: `https://www.naira.autos/cars/${brand.slug}/${model.slug}` },
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
            <Link href={`/cars/${brand.slug}`} className="hover:text-foreground transition-colors">{brand.name}</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">{model.name}</span>
          </nav>

          {/* Header */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">
              {brand.name} · {model.body_type || 'Car'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-foreground mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {brand.name} {model.name}<br />
              <span className="text-emerald-500">Price in Nigeria</span>
            </h1>
            {model.description && (
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{model.description}</p>
            )}
          </section>

          {/* Year groups — price pages */}
          {yearGroups.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
                Price by Year
              </h2>
              <div className="space-y-2">
                {yearGroups.map(yg => {
                  const yearLabel = formatYearLabel(yg.year_start, yg.year_end);
                  const mc = yg.maintenance_score
                    ? MAINTENANCE_SCORE_CONFIG[yg.maintenance_score as keyof typeof MAINTENANCE_SCORE_CONFIG]
                    : null;
                  const pc = yg.parts_availability_score
                    ? PARTS_SCORE_CONFIG[yg.parts_availability_score as keyof typeof PARTS_SCORE_CONFIG]
                    : null;

                  return (
                    <Link
                      key={yg.slug}
                      href={`/cars/${brand.slug}/${model.slug}/${yg.slug}`}
                      className="group flex items-center justify-between bg-card border border-border hover:border-emerald-500/50 rounded-xl px-5 py-4 transition-all"
                    >
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        {/* Year */}
                        <span className="text-xl font-black text-foreground flex-shrink-0 w-20"
                          style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {yearLabel}
                        </span>

                        {/* Price */}
                        <div className="flex items-center gap-4 flex-wrap">
                          {(yg.tokunbo_price_min || yg.tokunbo_price_max) && (
                            <span className="text-sm font-bold text-emerald-400">
                              {formatPriceRange(yg.tokunbo_price_min ?? undefined, yg.tokunbo_price_max ?? undefined)}
                            </span>
                          )}
                          {mc && (
                            <span className={`text-xs font-bold hidden sm:inline ${mc.color}`}>
                              {yg.maintenance_score} Maint.
                            </span>
                          )}
                          {pc && (
                            <span className={`text-xs font-bold hidden md:inline ${pc.color}`}>
                              {pc.icon} Parts
                            </span>
                          )}
                        </div>
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Spare parts generations */}
          {partsGenerations.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
                Spare Parts
              </h2>
              <div className="flex flex-wrap gap-2">
                {partsGenerations.map(yg => {
                  const yearLabel = formatYearLabel(yg.year_start, yg.year_end);
                  return (
                    <Link
                      key={yg.slug}
                      href={`/cars/${brand.slug}/${model.slug}/parts/${yg.slug}`}
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:border-emerald-500/50 transition-all"
                    >
                      <Wrench className="h-3.5 w-3.5 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground group-hover:text-emerald-400 transition-colors">
                        {yearLabel} Parts
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {/* Other models */}
          {siblingModels.length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3">
                Other {brand.name} Models
              </h2>
              <div className="flex flex-wrap gap-2">
                {siblingModels.map(m => (
                  <Link
                    key={m.slug}
                    href={`/cars/${brand.slug}/${m.slug}`}
                    className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                  >
                    {brand.name} {m.name}
                  </Link>
                ))}
                <Link
                  href={`/cars/${brand.slug}`}
                  className="px-4 py-2 rounded-xl border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 text-sm font-medium transition-all"
                >
                  All {brand.name} →
                </Link>
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}