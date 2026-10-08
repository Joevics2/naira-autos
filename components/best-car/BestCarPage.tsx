// Shared server-rendered page for "Best Car For…" — used by EVERY language.
// Provides: hero with back button + breadcrumb + language pills, the
// interactive client, ≥800 words of localised SEO copy, computed
// "best by use case" lists, FAQ, and complete JSON-LD (WebPage +
// WebApplication + BreadcrumbList + FAQPage) — all driven by BestCarStrings.

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import BestCarClient from '@/components/best-car/BestCarClient';
import LanguagePills from '@/components/ui/LanguagePills';
import { USE_CASE_META, type UseCaseTag } from '@/app/tools/cars-data';
import { abs, alternatesFor, SITE } from '@/lib/hreflang';
import { rankCars } from '@/lib/best-car/scoring';
import { CONTENT_MODIFIED_ISO, carName, fill, fillPicks, templateVars, verifiedLabel } from '@/lib/best-car/helpers';
import type { BestCarStrings, CarText } from '@/lib/best-car/types';

const HEADING_FONT = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const USE_CASE_TAGS = Object.keys(USE_CASE_META) as UseCaseTag[];

/** Full class strings (Tailwind can't see dynamically built names like `bg-${color}-50`). */
const RELATED_STYLES = {
  blue: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400',
  amber: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 text-amber-700 dark:text-amber-400',
  violet: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-violet-700 dark:text-violet-400',
} as const;

/** Render **bold** and [label](/path) inside a paragraph. */
function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={i++} className="text-foreground">{m[1]}</strong>);
    else out.push(<Link prefetch={false} key={i++} href={m[3]} className="text-emerald-600 dark:text-emerald-400 underline-offset-2 hover:underline">{m[2]}</Link>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Plain-text version (for JSON-LD). */
const plain = (t: string) => t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

export function buildMetadata(c: BestCarStrings): Metadata {
  const v = templateVars();
  return {
    title: fill(c.meta.title, v),
    description: fill(c.meta.description, v),
    keywords: c.meta.keywords,
    alternates: alternatesFor(c.path),
    openGraph: {
      title: fill(c.meta.ogTitle, v),
      description: fill(c.meta.ogDescription, v),
      url: abs(c.path),
      siteName: 'Naira Autos',
      locale: c.meta.ogLocale,
      type: 'website',
    },
  };
}

export default function BestCarPage({ c, carText }: { c: BestCarStrings; carText?: Record<string, CarText> }) {
  const v = templateVars();
  const rtl = c.dir === 'rtl';
  const Back = rtl ? ArrowRight : ArrowLeft;
  const Sep = rtl ? ChevronLeft : ChevronRight;
  const heading = c.latin ? HEADING_FONT : undefined;
  const pageUrl = abs(c.path);
  const homeUrl = c.homePath === '/' ? SITE : abs(c.homePath);
  const faqs = c.faqs.map((f) => ({ q: f.q, a: fill(fillPicks(f.a, c), v) }));

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: fill(c.meta.title, v),
        description: fill(c.meta.description, v),
        inLanguage: c.lang,
        dateModified: CONTENT_MODIFIED_ISO,
        author: { '@type': 'Organization', name: c.schema.author, url: `${SITE}${c.aboutPath}` },
        publisher: { '@type': 'Organization', name: c.schema.publisher, logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` } },
        mainEntity: { '@id': `${pageUrl}#app` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'WebApplication',
        '@id': `${pageUrl}#app`,
        name: c.schema.appName,
        description: fill(c.schema.appDescription, v),
        url: pageUrl,
        inLanguage: c.lang,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        browserRequirements: 'Requires JavaScript',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        publisher: { '@type': 'Organization', name: c.schema.publisher, url: SITE },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: c.nav.home, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: c.nav.tools, item: abs(c.hubPath) },
          { '@type': 'ListItem', position: 3, name: c.nav.current, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        inLanguage: c.lang,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  const related = [
    { href: c.comparePath, label: c.related.compare, color: 'blue' as const },
    { href: c.fuelPath, label: c.related.fuel, color: 'amber' as const },
    { href: c.valuationPath, label: c.related.valuation, color: 'violet' as const },
  ];

  return (
    <div lang={c.lang} dir={c.dir}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── Hero: back button + breadcrumb + language pills ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 start-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 end-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <Link prefetch={false}
              href={c.hubPath}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all"
              aria-label={c.nav.back}
            >
              <Back className="h-4 w-4" />
            </Link>
            <nav aria-label={c.nav.breadcrumb} className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href={c.homePath} className="hover:text-white/60 transition-colors">{c.nav.home}</Link>
              <Sep className="h-3 w-3" />
              <Link prefetch={false} href={c.hubPath} className="hover:text-white/60 transition-colors">{c.nav.tools}</Link>
              <Sep className="h-3 w-3" />
              <span className="text-white/60" aria-current="page">{c.nav.current}</span>
            </nav>
            <LanguagePills path={c.path} className="ms-auto" />
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">{c.hero.badge}</span>
              </span>
              <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {c.hero.verified}: {verifiedLabel(c.locale)}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-tight" style={heading}>{c.hero.h1}</h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">{fill(c.hero.intro, v)}</p>
          </div>
        </div>
      </div>

      <BestCarClient c={c} carText={carText} />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">
          {/* Long-form SEO guide */}
          <article className="max-w-3xl space-y-10">
            {c.seo.sections.map((s) => (
              <section key={s.h2}>
                <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>{fill(s.h2, v)}</h2>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}><Inline text={fill(p, v)} /></p>
                  ))}
                </div>
              </section>
            ))}
            <section className="bg-card border border-border rounded-xl p-5">
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>{c.seo.exampleTitle}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed"><Inline text={fill(c.seo.exampleBody, v)} /></p>
            </section>
          </article>

          {/* Best by use case — computed from the same scoring the tool uses */}
          <section>
            <h2 className="text-2xl font-black uppercase text-foreground mb-5" style={heading}>{c.seo.picksHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {USE_CASE_TAGS.map((tag) => {
                const m = c.useCases[tag];
                const picks = rankCars(tag, c.picksCountry, 4);
                return (
                  <div key={tag} className="bg-card border border-border rounded-xl p-4">
                    <p className="text-lg mb-1">{m.icon}</p>
                    <h3 className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2">{m.pickTitle}</h3>
                    <ol className="space-y-1">
                      {picks.map(({ car }, i) => (
                        <li key={car.id} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="text-muted-foreground/50 font-bold w-3">{i + 1}.</span>
                          <span dir="ltr">{carName(car)}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground mt-3">{fill(c.seo.picksNote, v)}</p>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={heading}>{c.seo.faqHeading}</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-muted/40 transition-colors">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p>
              <strong className="text-foreground">{c.seo.reviewedByLabel}</strong>{' '}
              <Link prefetch={false} href={c.aboutPath} className="underline underline-offset-2 hover:text-foreground">{c.seo.reviewer}</Link>
            </p>
            <p>
              <strong className="text-foreground">{c.seo.updatedLabel}</strong>{' '}
              <time dateTime={CONTENT_MODIFIED_ISO}>
                {new Intl.DateTimeFormat(c.locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(CONTENT_MODIFIED_ISO))}
              </time>
            </p>
          </div>
          <p className="text-xs text-muted-foreground -mt-8 max-w-3xl">{fill(c.seo.disclaimer, v)}</p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={heading}>{c.seo.moreToolsHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {related.map(({ href, label, color }) => (
                <Link prefetch={false} key={href} href={href} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl border transition-all ${RELATED_STYLES[color]}`}>
                  <p className="text-sm font-bold">{label}</p>
                  <Sep className="h-4 w-4 opacity-70" />
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
