import type { Metadata } from 'next';
import { GlossarySidebar } from './GlossarySidebar';
import { AutoLinkedProse, Prose } from './GlossaryProse';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ChevronRight, BookOpen, ArrowLeft,
  Lightbulb, ShoppingCart, Tag, Wrench,
  AlertTriangle, TrendingDown, ExternalLink
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────

interface GlossaryTermFull {
  id: string;
  slug: string;
  term: string;
  letter: string;
  category: string;
  short_definition: string;
  full_definition: string;
  nigerian_context: string | null;
  example_usage: string | null;
  buyer_tip: string | null;
  seller_tip: string | null;
  common_misconceptions: string | null;
  price_impact: string | null;
  related_terms: string[];
  tags: string[];
  meta_title: string | null;
  meta_description: string | null;
  og_image_alt: string | null;
  schema_type: string;
  updated_at: string;
}

interface RelatedTerm {
  slug: string;
  term: string;
  short_definition: string;
}

// ── Helpers ───────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<string, string> = {
  condition: 'Condition & Grading',
  documentation: 'Documentation',
  pricing: 'Pricing & Market',
  mechanical: 'Mechanical',
  buying: 'Buying Process',
  selling: 'Selling Process',
  import: 'Import & Customs',
};

// ── Supabase helpers ──────────────────────────────────────────────

interface TermLink {
  term: string;
  slug: string;
}

async function getTerm(slug: string): Promise<GlossaryTermFull | null> {
  const { data, error } = await supabase
    .from('car_glossary')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return null;
  return data as GlossaryTermFull;
}

async function getRelatedTerms(slugs: string[]): Promise<RelatedTerm[]> {
  if (!slugs || slugs.length === 0) return [];
  const { data } = await supabase
    .from('car_glossary')
    .select('slug, term, short_definition')
    .in('slug', slugs)
    .eq('is_published', true);
  return (data ?? []) as RelatedTerm[];
}

async function getAllSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from('car_glossary')
    .select('slug')
    .eq('is_published', true);
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

async function getAllTermLinks(): Promise<TermLink[]> {
  const { data } = await supabase
    .from('car_glossary')
    .select('slug, term')
    .eq('is_published', true);
  return (data ?? []) as TermLink[];
}

// ── Static params (ISR) ───────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export const revalidate = 60;

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const term = await getTerm(params.slug);
  if (!term) return { title: 'Term Not Found | Naira Autos' };

  const title = term.meta_title ?? `${term.term} — Nigerian Car Market Glossary | Naira Autos`;

  // FIX: More informative meta description fallback — leads with the value question
  const description =
    term.meta_description ??
    `What does ${term.term} mean in Nigeria's car market? ${term.short_definition} Learn more in the Naira Autos glossary.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.naira.autos/tools/glossary/${term.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.naira.autos/tools/glossary/${term.slug}`,
      type: 'article',
      ...(term.og_image_alt ? { images: [{ url: '', alt: term.og_image_alt }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ── JSON-LD schemas ───────────────────────────────────────────────

function TermSchema({ term }: { term: GlossaryTermFull }) {
  const url = `https://www.naira.autos/tools/glossary/${term.slug}`;

  // Build FAQ items from available sections
  const faqItems: { question: string; answer: string }[] = [];
  if (term.common_misconceptions) {
    faqItems.push({
      question: `What are common misconceptions about ${term.term}?`,
      answer: term.common_misconceptions.replace(/\n/g, ' ').slice(0, 500),
    });
  }
  if (term.buyer_tip) {
    faqItems.push({
      question: `What should a buyer know about ${term.term}?`,
      answer: term.buyer_tip.replace(/\n/g, ' ').slice(0, 500),
    });
  }
  if (term.price_impact) {
    faqItems.push({
      question: `How does ${term.term} affect car price in Nigeria?`,
      answer: term.price_impact.replace(/\n/g, ' ').slice(0, 500),
    });
  }

  const schemas: object[] = [
    // DefinedTerm
    {
      '@context': 'https://schema.org',
      '@type': term.schema_type ?? 'DefinedTerm',
      '@id': url,
      name: term.term,
      description: term.short_definition,
      url,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'Nigerian Car Market Glossary',
        url: 'https://www.naira.autos/tools/glossary',
      },
      dateModified: term.updated_at,
    },
    // BreadcrumbList
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Glossary', item: 'https://www.naira.autos/tools/glossary' },
        { '@type': 'ListItem', position: 4, name: term.term, item: url },
      ],
    },
  ];

  // FAQPage — only if we have items
  if (faqItems.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    });
  }

  // Article schema for freshness signals
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: term.meta_title ?? `${term.term} — Nigerian Car Market Glossary`,
    description: term.short_definition,
    url,
    dateModified: term.updated_at,
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      url: 'https://www.naira.autos',
    },
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────

export default async function GlossaryTermPage({
  params,
}: {
  params: { slug: string };
}) {
  const term = await getTerm(params.slug);
  if (!term) notFound();

  const [related, termLinks] = await Promise.all([
    getRelatedTerms(term.related_terms ?? []),
    getAllTermLinks(),
  ]);

  return (
    <>
      <TermSchema term={term} />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#080C10] to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-14">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools/glossary" className="hover:text-white/60 transition-colors">Glossary</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50 truncate max-w-[160px]">{term.term}</span>
          </nav>

          {/* Category badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <BookOpen className="h-3 w-3" />
              {CATEGORY_LABELS[term.category] ?? term.category}
            </span>
          </div>

          {/* Term heading */}
          <h1
            className="font-black uppercase text-white leading-none tracking-tight mb-5"
            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(38px, 6vw, 72px)' }}
          >
            {term.term}
          </h1>

          {/* Short definition — hero callout */}
          <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl">
            {term.short_definition}
          </p>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-3xl mx-auto">

            {/* ── Article ── */}
            <article className="space-y-10">

              {/* Full definition */}
              <section>
                <h2 className="text-xl font-black uppercase text-foreground mb-4"
                  style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  What It Means
                </h2>
                <AutoLinkedProse text={term.full_definition} termLinks={termLinks} currentSlug={term.slug} />
              </section>

              {/* Nigerian context */}
              {term.nigerian_context && (
                <section>
                  <h2 className="text-xl font-black uppercase text-foreground mb-4"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    In the Nigerian Market
                  </h2>
                  <AutoLinkedProse text={term.nigerian_context} termLinks={termLinks} currentSlug={term.slug} />
                </section>
              )}

              {/* Example usage */}
              {term.example_usage && (
                <section>
                  <h2 className="text-xl font-black uppercase text-foreground mb-4"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    How It's Used
                  </h2>
                  <blockquote className="border-l-4 border-emerald-500 pl-5 py-1">
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                      {term.example_usage}
                    </p>
                  </blockquote>
                </section>
              )}

              {/* Buyer tip */}
              {term.buyer_tip && (
                <section>
                  <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <ShoppingCart className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                        Buyer's Tip
                      </h2>
                    </div>
                    <Prose text={term.buyer_tip} />
                  </div>
                </section>
              )}

              {/* Seller tip */}
              {term.seller_tip && (
                <section>
                  <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <Tag className="h-3.5 w-3.5 text-blue-400" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-blue-600 dark:text-blue-400">
                        Seller's Tip
                      </h2>
                    </div>
                    <Prose text={term.seller_tip} />
                  </div>
                </section>
              )}

              {/* Common misconceptions */}
              {term.common_misconceptions && (
                <section>
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-amber-600 dark:text-amber-400">
                        Common Misconceptions
                      </h2>
                    </div>
                    <Prose text={term.common_misconceptions} />
                  </div>
                </section>
              )}

              {/* Price impact */}
              {term.price_impact && (
                <section>
                  <h2 className="text-xl font-black uppercase text-foreground mb-4"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    Effect on Price
                  </h2>
                  <div className="flex items-start gap-3 p-5 rounded-2xl border border-border bg-card">
                    <TrendingDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <AutoLinkedProse text={term.price_impact} termLinks={termLinks} currentSlug={term.slug} />
                  </div>
                </section>
              )}

              {/* Tags — rendered as visible page content for keyword signals */}
              {term.tags && term.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {term.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Back link */}
              <div className="pt-4">
                <Link
                  href="/tools/glossary"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to full glossary
                </Link>
              </div>
            </article>

            {/* ── Related terms ── */}
            {related.length > 0 && (
              <div className="mt-12 bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                  Related Terms
                </h3>
                <div className="space-y-2">
                  {related.map(r => (
                    <Link
                      key={r.slug}
                      href={`/tools/glossary/${r.slug}`}
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <BookOpen className="h-3 w-3 text-emerald-500" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground leading-snug">{r.term}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{r.short_definition}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ── More from Naira Autos ── TEMPORARILY COMMENTED OUT FOR DEBUGGING
            <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">
                More from Naira Autos
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: 'AI Mechanic',         sub: 'Diagnose your car for free',   href: '/tools/ai-mechanic' },
                  { label: 'Sell For Me',         sub: 'We handle everything for you', href: '/sell-for-me' },
                  { label: 'Vehicle Information', sub: 'Prices, parts & model guides', href: '/vehicles' },
                  { label: 'Read Blog Posts',     sub: 'Tips, guides & buying advice', href: '/blog' },
                ].map(({ label, sub, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 leading-none">{label}</p>
                      <p className="text-xs text-emerald-700/50 dark:text-emerald-400/50 mt-0.5">{sub}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-emerald-500/50 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
            ── END COMMENT */}

            {/* ── Explore glossary ── */}
            <div className="mt-6 bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Explore the Glossary</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Browse all terms alphabetically or search by topic across the full Nigerian car market glossary.
              </p>
              <Link
                href="/tools/glossary"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all glossary terms
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}