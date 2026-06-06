import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, BookOpen } from 'lucide-react';
import { getAllGlossaryTerms, type GlossaryTermSummary } from '@/lib/glossary';

// Local alias so the rest of the file keeps working unchanged
type GlossaryTerm = GlossaryTermSummary;

// ── SEO ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Nigerian Car Market Glossary — Tokunbo, Duty Paid, Grade A & More',
  description:
    'Understand Tokunbo, duty paid, Grade A, VIN, clearing cost, Ladipo pricing, and 100+ Nigerian car market terms. The essential buyer and seller glossary from Naira Autos.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/glossary',
  },
  openGraph: {
    title: 'Nigerian Car Market Glossary',
    description:
      'Understand every term used when buying or selling cars in Nigeria. Tokunbo, Nigerian Used, Grade A, duty paid, VIN, Ladipo, and hundreds more.',
    url: 'https://www.naira.autos/tools/glossary',
    type: 'website',
    images: [
      {
        url: 'https://www.naira.autos/og/glossary.png',
        width: 1200,
        height: 630,
        alt: 'Nigerian Car Market Glossary — Naira Autos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nigerian Car Market Glossary',
    description:
      'Understand every term used when buying or selling cars in Nigeria. Tokunbo, Nigerian Used, Grade A, duty paid, VIN, Ladipo, and hundreds more.',
    images: ['https://www.naira.autos/og/glossary.png'],
  },
};

// ── Schema ────────────────────────────────────────────────────────

function GlossarySchema({ terms }: { terms: GlossaryTerm[] }) {
  // FIX 2: Add dateModified for freshness signal
  const now = new Date().toISOString();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.naira.autos/tools/glossary',
        name: 'Nigerian Car Market Glossary',
        description:
          `Comprehensive glossary of ${terms.length} terms used in the Nigerian new and used car market.`,
        url: 'https://www.naira.autos/tools/glossary',
        // FIX 2: dateModified for freshness signals
        dateModified: now,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
            { '@type': 'ListItem', position: 3, name: 'Glossary', item: 'https://www.naira.autos/tools/glossary' },
          ],
        },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://www.naira.autos/tools/glossary#termset',
        name: 'Nigerian Car Market Glossary',
        description: `${terms.length} terms used in the Nigerian new and used car market.`,
        url: 'https://www.naira.autos/tools/glossary',
        dateModified: now,
        hasDefinedTerm: terms.map(t => ({
          '@type': 'DefinedTerm',
          name: t.term,
          description: t.short_definition,
          url: `https://www.naira.autos/tools/glossary/${t.slug}`,
          inDefinedTermSet: 'https://www.naira.autos/tools/glossary#termset',
        })),
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Page ──────────────────────────────────────────────────────────

export const revalidate = 604800; // 1 week

export default async function GlossaryPage() {
  const terms = await getAllGlossaryTerms();

  // Group by letter
  const byLetter = terms.reduce<Record<string, GlossaryTerm[]>>((acc, term) => {
    const l = term.letter.toUpperCase();
    if (!acc[l]) acc[l] = [];
    acc[l].push(term);
    return acc;
  }, {});

  const letters = Object.keys(byLetter).sort();
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <>
      <GlossarySchema terms={terms} />

      {/* ── Hero ── */}
      <div className="bg-[#080C10] border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50">Glossary</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              {/* FIX 3: h1 is the page heading — no change needed here */}
              <h1
                className="font-black uppercase text-white leading-none tracking-tight mb-2"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}
              >
                Nigerian Car Market Glossary
              </h1>
              {/* FIX 4: Added contextual internal links in hero copy */}
              <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                Every term you need to buy or sell a car in Nigeria — from{' '}
                <Link href="/tools/glossary/tokunbo" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-500/40 transition-colors">
                  Tokunbo
                </Link>{' '}
                and{' '}
                <Link href="/tools/glossary/duty-paid" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-500/40 transition-colors">
                  duty paid
                </Link>{' '}
                to chassis numbers,{' '}
                <Link href="/tools/glossary/ladipo" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-500/40 transition-colors">
                  Ladipo pricing
                </Link>
                , and pre-purchase inspections. {terms.length} terms and growing.
              </p>
            </div>
          </div>

          {/* A–Z jump nav */}
          <div className="flex flex-wrap gap-1.5 mt-6">
            {allLetters.map(l => {
              const active = !!byLetter[l];
              return active ? (
                <a
                  key={l}
                  href={`#letter-${l}`}
                  className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center hover:bg-emerald-500/30 transition-all"
                >
                  {l}
                </a>
              ) : (
                <span
                  key={l}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-white/20 text-xs font-bold flex items-center justify-center cursor-default"
                >
                  {l}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Term list ── */}
      <div className="bg-background">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">

          {terms.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No glossary terms published yet.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {letters.map(letter => (
                <section key={letter} id={`letter-${letter}`} className="scroll-mt-6">
                  {/* FIX 5: Letter heading promoted from <span> to <h2> for proper heading hierarchy */}
                  <div className="flex items-center gap-4 mb-6">
                    <h2
                      className="text-5xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                      style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                    >
                      {letter}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {byLetter[letter].length} {byLetter[letter].length === 1 ? 'term' : 'terms'}
                    </span>
                  </div>

                  {/* Term cards */}
                  {/* FIX 6: Term name demoted from <h2> to <p> since letter sections are now the h2 headings.
                      This prevents hundreds of h2 tags at the same level with no hierarchy. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {byLetter[letter].map(term => (
                      <Link
                        key={term.slug}
                        href={`/tools/glossary/${term.slug}`}
                        className="group bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="font-bold text-foreground text-base leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {term.term}
                          </p>
                          <ChevronRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {term.short_definition}
                        </p>
                        {/* FIX 7: Render tags as visible page content — keyword signals for crawlers */}
                        {term.tags && term.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {term.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* CTA strip */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: 'Sell for me',
                sub: 'We handle everything for you',
                href: 'https://www.naira.autos/sell-for-me',
                external: true,
              },
              {
                label: 'AI Mechanic',
                sub: 'Diagnose your car for free',
                href: '/tools/ai-mechanic',
                external: false,
              },
              {
                label: 'Blog',
                sub: 'Find interesting Articles',
                href: 'https://www.naira.autos/blog',
                external: true,
              },
            ].map(({ label, sub, href, external }) => {
              const cls =
                'flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group';
              const inner = (
                <>
                  <div>
                    <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{label}</p>
                    <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-0.5">{sub}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-emerald-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                </>
              );
              return external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                </a>
              ) : (
                <Link key={href} href={href} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
