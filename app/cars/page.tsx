// app/cars/page.tsx
// Route: /cars — all brands, flat list, no split
// Data comes from Redis cache only. Zero direct Supabase calls.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { getAllBrands } from '@/lib/car-cache';
import type { CachedBrand } from '@/lib/car-cache';

export const metadata: Metadata = {
  title: 'Car Prices in Nigeria by Brand — Tokunbo & Used | Naira Autos',
  description: 'Browse Nigerian car prices by brand. Tokunbo and used car prices, common problems, spare parts costs, and ownership guides for every major brand on Nigerian roads.',
  alternates: { canonical: 'https://www.naira.autos/cars' },
  openGraph: {
    title: 'Car Prices in Nigeria by Brand | Naira Autos',
    description: 'Browse Nigerian car prices by brand. Tokunbo and used car prices, common problems, spare parts, and ownership costs for every major brand on Nigerian roads.',
    url: 'https://www.naira.autos/cars',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Car Prices in Nigeria by Brand',
  url: 'https://www.naira.autos/cars',
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
      { '@type': 'ListItem', position: 2, name: 'Cars', item: 'https://www.naira.autos/cars' },
    ],
  },
};

// ── Initial colour palette — one per letter ───────────────────────
// Colours are purely visual, assigned by first letter of brand name.
// Using emerald-family + warm accents to stay on-brand.

const LETTER_COLORS: Record<string, { bg: string; text: string }> = {
  A: { bg: 'bg-emerald-500/20',  text: 'text-emerald-400'  },
  B: { bg: 'bg-blue-500/20',     text: 'text-blue-400'     },
  C: { bg: 'bg-cyan-500/20',     text: 'text-cyan-400'     },
  D: { bg: 'bg-violet-500/20',   text: 'text-violet-400'   },
  E: { bg: 'bg-amber-500/20',    text: 'text-amber-400'    },
  F: { bg: 'bg-orange-500/20',   text: 'text-orange-400'   },
  G: { bg: 'bg-teal-500/20',     text: 'text-teal-400'     },
  H: { bg: 'bg-pink-500/20',     text: 'text-pink-400'     },
  I: { bg: 'bg-indigo-500/20',   text: 'text-indigo-400'   },
  J: { bg: 'bg-lime-500/20',     text: 'text-lime-400'     },
  K: { bg: 'bg-rose-500/20',     text: 'text-rose-400'     },
  L: { bg: 'bg-sky-500/20',      text: 'text-sky-400'      },
  M: { bg: 'bg-fuchsia-500/20',  text: 'text-fuchsia-400'  },
  N: { bg: 'bg-yellow-500/20',   text: 'text-yellow-400'   },
  O: { bg: 'bg-emerald-600/20',  text: 'text-emerald-300'  },
  P: { bg: 'bg-purple-500/20',   text: 'text-purple-400'   },
  Q: { bg: 'bg-red-500/20',      text: 'text-red-400'      },
  R: { bg: 'bg-blue-600/20',     text: 'text-blue-300'     },
  S: { bg: 'bg-green-500/20',    text: 'text-green-400'    },
  T: { bg: 'bg-amber-600/20',    text: 'text-amber-300'    },
  U: { bg: 'bg-cyan-600/20',     text: 'text-cyan-300'     },
  V: { bg: 'bg-violet-600/20',   text: 'text-violet-300'   },
  W: { bg: 'bg-teal-600/20',     text: 'text-teal-300'     },
  X: { bg: 'bg-orange-600/20',   text: 'text-orange-300'   },
  Y: { bg: 'bg-pink-600/20',     text: 'text-pink-300'     },
  Z: { bg: 'bg-indigo-600/20',   text: 'text-indigo-300'   },
};

function getLetterColor(name: string) {
  const letter = name[0]?.toUpperCase() || 'A';
  return LETTER_COLORS[letter] || LETTER_COLORS['A'];
}

// ── Brand avatar ──────────────────────────────────────────────────

function BrandAvatar({ brand }: { brand: CachedBrand }) {
  if (brand.logo_url) {
    return (
      <img
        src={brand.logo_url}
        alt={brand.name}
        className="w-10 h-10 object-contain flex-shrink-0"
      />
    );
  }
  const { bg, text } = getLetterColor(brand.name);
  return (
    <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
      <span className={`text-base font-black ${text}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
        {brand.name[0]?.toUpperCase()}
      </span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default async function CarsPage() {
  const brands = await getAllBrands();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-background min-h-screen">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium">Cars</span>
          </nav>

          {/* Header */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">
              Knowledge Base
            </span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-foreground mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Car Prices in Nigeria<br />
              <span className="text-emerald-500">By Brand</span>
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
              Tokunbo and Nigerian used prices, common problems, spare parts costs, and ownership guides
              for every major brand on Nigerian roads.
            </p>
          </section>

          {/* All brands — flat grid */}
          <section>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {brands.map(brand => (
                <Link
                  key={brand.slug}
                  href={`/cars/${brand.slug}`}
                  className="group flex items-center gap-3 bg-card border border-border hover:border-emerald-500/50 rounded-xl p-3 transition-all"
                >
                  <BrandAvatar brand={brand} />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate group-hover:text-emerald-400 transition-colors">
                      {brand.name}
                    </p>
                    {brand.model_count > 0 && (
                      <p className="text-xs text-muted-foreground">
                        {brand.model_count} model{brand.model_count !== 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}