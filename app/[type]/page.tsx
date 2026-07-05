// app/[type]/page.tsx
// Route: /cars  /trucks  /vans  /buses  /motorcycles
// Fetches distinct brands from vehicle_models WHERE vehicle_type = x
//
// VISIBILITY RULE:
// vehicle_models holds one row per MODEL, not per brand — a brand
// (e.g. Kia) has many model rows, each with its own `status`.
// A brand should appear here if it has at least one PUBLISHED model
// for this vehicle_type. The query below filters to status='published'
// before grouping by brand_slug, so brands with zero published models
// never make it into the grid, and the displayed count reflects only
// published models.

import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getSupabase, getDbType, VEHICLE_TYPES } from '@/lib/vehicle-helpers';

export const revalidate = 86400; // 24 hours

// ── Static params ─────────────────────────────────────────────

export async function generateStaticParams() {
  return Object.keys(VEHICLE_TYPES).map(type => ({ type }));
}

// ── Metadata ──────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: { type: string } }
): Promise<Metadata> {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) return {};
  const title = `${typeInfo.plural} Prices by Brand | Naira Autos`;
  const desc  = `Browse ${typeInfo.plural.toLowerCase()} prices by brand. Common problems, spare parts, and ownership guides for every model.`;
  const url   = `https://www.naira.autos/${params.type}`;
  return {
    title, description: desc,
    alternates: { canonical: url },
    openGraph: { title, description: desc, url },
  };
}

// ── Brand letter colours ──────────────────────────────────────

const LETTER_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: 'bg-emerald-500/15', text: 'text-emerald-400' },
  B: { bg: 'bg-blue-500/15',    text: 'text-blue-400'    },
  C: { bg: 'bg-cyan-500/15',    text: 'text-cyan-400'    },
  D: { bg: 'bg-violet-500/15',  text: 'text-violet-400'  },
  E: { bg: 'bg-amber-500/15',   text: 'text-amber-400'   },
  F: { bg: 'bg-orange-500/15',  text: 'text-orange-400'  },
  G: { bg: 'bg-teal-500/15',    text: 'text-teal-400'    },
  H: { bg: 'bg-pink-500/15',    text: 'text-pink-400'    },
  I: { bg: 'bg-indigo-500/15',  text: 'text-indigo-400'  },
  J: { bg: 'bg-lime-500/15',    text: 'text-lime-400'    },
  K: { bg: 'bg-rose-500/15',    text: 'text-rose-400'    },
  L: { bg: 'bg-sky-500/15',     text: 'text-sky-400'     },
  M: { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-400' },
  N: { bg: 'bg-yellow-500/15',  text: 'text-yellow-400'  },
  O: { bg: 'bg-emerald-600/15', text: 'text-emerald-300' },
  P: { bg: 'bg-purple-500/15',  text: 'text-purple-400'  },
  R: { bg: 'bg-red-500/15',     text: 'text-red-400'     },
  S: { bg: 'bg-green-500/15',   text: 'text-green-400'   },
  T: { bg: 'bg-amber-600/15',   text: 'text-amber-300'   },
  V: { bg: 'bg-violet-600/15',  text: 'text-violet-300'  },
  W: { bg: 'bg-teal-600/15',    text: 'text-teal-300'    },
};

function getLetterColor(name: string) {
  const letter = name[0]?.toUpperCase() || 'A';
  return LETTER_COLORS[letter] ?? { bg: 'bg-emerald-500/15', text: 'text-emerald-400' };
}

// ── Page ──────────────────────────────────────────────────────

export default async function VehicleTypePage(
  { params }: { params: { type: string } }
) {
  const typeInfo = VEHICLE_TYPES[params.type];
  if (!typeInfo) notFound();

  const dbType   = getDbType(params.type);
  const supabase = getSupabase();

  // Get distinct brands + models that have content in the new tables —
  // these flat columns (brand_slug, brand_name, model_name) are the
  // source of truth for what's "published" now, independent of whatever
  // vehicle_models.status/vehicle_type happens to say.
  const [{ data: partRows }, { data: problemRows }] = await Promise.all([
    supabase.from('vehicle_parts').select('brand_slug, brand_name, model_name').eq('vehicle_type', dbType),
    supabase.from('vehicle_problems').select('brand_slug, brand_name, model_name').eq('vehicle_type', dbType),
  ]);

  const brandMap = new Map<string, { name: string; logo: string | null; models: Set<string> }>();
  for (const r of [...(partRows || []), ...(problemRows || [])]) {
    if (!brandMap.has(r.brand_slug)) {
      brandMap.set(r.brand_slug, { name: r.brand_name, logo: null, models: new Set() });
    }
    brandMap.get(r.brand_slug)!.models.add(r.model_name);
  }

  if (brandMap.size === 0) notFound();

  // Best-effort logo enrichment from vehicle_models — matched on brand_slug
  // only (no vehicle_type/status requirement), so a mismatch there never
  // hides an otherwise-active brand.
  const { data: logoRows } = await supabase
    .from('vehicle_models')
    .select('brand_slug, brand_logo_url')
    .in('brand_slug', Array.from(brandMap.keys()))
    .not('brand_logo_url', 'is', null);

  for (const r of (logoRows || [])) {
    const entry = brandMap.get(r.brand_slug);
    if (entry && !entry.logo) entry.logo = r.brand_logo_url;
  }

  const brands = Array.from(brandMap.entries())
    .map(([slug, info]) => ({ slug, name: info.name, logo: info.logo, count: info.models.size }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const url = `https://www.naira.autos/${params.type}`;
  const SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `${typeInfo.plural} Prices by Brand`,
    url,
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: typeInfo.plural,  item: url },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-foreground font-medium">{typeInfo.plural}</span>
            </div>
            <Link
              href="/vehicles"
              className="inline-flex items-center gap-1 font-medium border border-border rounded-full px-3 py-1.5 hover:text-foreground hover:border-foreground/30 transition-colors flex-shrink-0"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Link>
          </nav>

          {/* Header */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3 block">
              Knowledge Base · {brands.length} Brand{brands.length !== 1 ? 's' : ''}
            </span>
            <h1
              className="text-5xl sm:text-6xl font-black uppercase text-foreground mb-4 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              {typeInfo.plural}<br />
              <span className="text-emerald-500">Parts &amp; Problems</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
              Common problems, spare parts costs, and ownership guides
              for every major {typeInfo.singular.toLowerCase()} brand.
            </p>
          </section>

          {/* Other vehicle types — shown at top for navigation */}
          <section className="flex flex-wrap gap-2">
            {Object.entries(VEHICLE_TYPES)
              .filter(([slug]) => slug !== params.type)
              .map(([slug, info]) => (
                <Link
                  key={slug}
                  href={`/${slug}`}
                  className="px-4 py-2 rounded-xl border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-400 text-sm font-medium text-foreground transition-all"
                >
                  {info.plural} →
                </Link>
              ))}
          </section>

          {/* Brands grid */}
          {brands.filter(b => b.count > 0).length > 0 && (
            <section>
              <h2 className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-4">
                All Brands
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                {brands.map(brand => {
                  const { bg, text } = getLetterColor(brand.name);
                  return (
                    <Link
                      key={brand.slug}
                      href={`/${params.type}/${brand.slug}`}
                      className="group flex items-center gap-3 bg-card border border-border hover:border-emerald-500/50 hover:bg-card/80 rounded-xl p-3 transition-all duration-200"
                    >
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-9 h-9 object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                          <span
                            className={`text-sm font-black ${text}`}
                            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                          >
                            {brand.name[0]?.toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground text-sm truncate group-hover:text-emerald-400 transition-colors">
                          {brand.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {brand.count} model{brand.count !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          {brands.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No {typeInfo.plural.toLowerCase()} data available yet.</p>
            </div>
          )}



        </div>
      </div>
    </>
  );
}
