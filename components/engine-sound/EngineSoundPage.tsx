import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronRight, ChevronLeft, ChevronDown, Mic, Ear } from 'lucide-react';
import EngineSoundClient from './EngineSoundClient';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor, abs, localizedPath, type Lang } from '@/lib/hreflang';
import type { EngineSoundCopy, EngineSoundSubCopy, SubKey } from '@/lib/engine-sound/types';
import { mainPath, subPath } from '@/lib/engine-sound';

const NON_LATIN: Lang[] = ['ar', 'ja', 'ko', 'th', 'hi', 'ru'];
const DATE_MODIFIED = '2026-09-29';

function heading(lang: Lang) {
  const latin = !NON_LATIN.includes(lang);
  return {
    style: latin ? { fontFamily: "'Barlow Condensed', Impact, sans-serif" } : undefined,
    upper: latin ? 'uppercase' : '',
    lead: latin ? 'leading-[0.95] tracking-tight' : 'leading-tight',
  };
}

// ── Metadata ─────────────────────────────────────────────────────────

export function mainMetadata(c: EngineSoundCopy): Metadata {
  const path = mainPath(c);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: c.keywords,
    alternates: alternatesFor(path),
    openGraph: { title: c.metaTitle, description: c.ogDescription, url: abs(path), siteName: 'Naira Autos', locale: c.locale, type: 'website' },
  };
}

export function subMetadata(c: EngineSoundCopy, key: SubKey): Metadata {
  const s = c.subs.find((x) => x.key === key)!;
  const path = subPath(c, key);
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: alternatesFor(path),
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: abs(path), siteName: 'Naira Autos', locale: c.locale, type: 'website' },
  };
}

// ── Shared bits ──────────────────────────────────────────────────────

function Crumbs({ c, trail, backHref }: { c: EngineSoundCopy; trail: { label: string; href?: string }[]; backHref: string }) {
  const rtl = c.dir === 'rtl';
  const Back = rtl ? ArrowRight : ArrowLeft;
  const Sep = rtl ? ChevronLeft : ChevronRight;
  return (
    <div className={`flex items-center gap-3 mb-4 ${rtl ? 'text-right' : 'text-left'}`}>
      <Link href={backHref} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all flex-shrink-0" aria-label={c.backLabel}>
        <Back className="h-4 w-4" />
      </Link>
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/30">
        {trail.map((t, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && <Sep className="h-3 w-3" />}
            {t.href ? <Link href={t.href} className="hover:text-white/60 transition-colors">{t.label}</Link> : <span className="text-white/50">{t.label}</span>}
          </span>
        ))}
      </nav>
    </div>
  );
}

function Faq({ faqs, title, lang }: { faqs: { q: string; a: string }[]; title: string; lang: Lang }) {
  const h = heading(lang);
  return (
    <div>
      <h2 className={`text-xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{title}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {faqs.map(({ q, a }) => (
          <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
              <span className="text-sm font-semibold text-foreground">{q}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
          </details>
        ))}
      </div>
    </div>
  );
}

function Reviewed({ c, after }: { c: EngineSoundCopy; after: string }) {
  return (
    <p className="text-xs text-muted-foreground border-t border-border pt-4">
      {c.reviewedBefore} <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>{after}
    </p>
  );
}

function Related({ c }: { c: EngineSoundCopy }) {
  const h = heading(c.lang);
  const links = [
    { href: localizedPath('/tools/ai-mechanic', c.lang), label: c.relatedLabels.mechanic, color: 'blue' },
    { href: localizedPath('/tools/vin-checker-global', c.lang), label: c.relatedLabels.vin, color: 'violet' },
    { href: localizedPath('/evaluate-used-car', c.lang), label: c.relatedLabels.value, color: 'emerald' },
  ].filter((l): l is { href: string; label: string; color: string } => !!l.href);
  const cls: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 text-blue-700 dark:text-blue-400',
    violet: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-violet-700 dark:text-violet-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400',
  };
  const Chev = c.dir === 'rtl' ? ChevronLeft : ChevronRight;
  return (
    <section>
      <h2 className={`text-xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{c.relatedTitle}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {links.map(({ href, label, color }) => (
          <Link key={href} href={href} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl border transition-colors ${cls[color]}`}>
            <p className="text-sm font-bold">{label}</p>
            <Chev className="h-4 w-4" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function Hero({ c, accent, children }: { c: EngineSoundCopy; accent: string; children: React.ReactNode }) {
  return <div className="bg-[#080C10] pt-10 pb-10 px-4"><div className="max-w-screen-md mx-auto">{children}</div></div>;
}

function Sections({ sections, lang }: { sections: { h2: string; paras: string[] }[]; lang: Lang }) {
  const h = heading(lang);
  return (
    <>
      {sections.map((s) => (
        <div key={s.h2}>
          <h2 className={`text-2xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{s.h2}</h2>
          {s.paras.map((p, i) => <p key={i} className={i < s.paras.length - 1 ? 'mb-3' : ''}>{p}</p>)}
        </div>
      ))}
    </>
  );
}

// ── Main page ────────────────────────────────────────────────────────

export function EngineSoundMainPage({ c }: { c: EngineSoundCopy }) {
  const path = mainPath(c);
  const h = heading(c.lang);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: c.metaTitle.split(' | ')[0],
        description: c.schemaDescription,
        url: abs(path),
        inLanguage: c.lang,
        dateModified: DATE_MODIFIED,
        author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
        reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: c.homeLabel, item: abs(c.homeHref) },
            { '@type': 'ListItem', position: 2, name: c.hubLabel, item: abs(c.hubHref) },
            { '@type': 'ListItem', position: 3, name: c.toolName, item: abs(path) },
          ],
        },
      },
      {
        '@type': 'SoftwareApplication',
        name: c.toolName,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        inLanguage: c.lang,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: abs(path),
      },
      {
        '@type': 'FAQPage',
        mainEntity: c.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background" dir={c.dir} lang={c.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero c={c} accent="emerald">
        <Crumbs c={c} backHref={c.hubHref} trail={[{ label: c.homeLabel, href: c.homeHref }, { label: c.hubLabel, href: c.hubHref }, { label: c.toolName }]} />
        <LanguagePills path={path} className="mb-6" />
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            <Mic className="h-3 w-3" /> {c.badge}
          </span>
          <span className="inline-block ms-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">{c.verified}</span>
          <h1 className={`font-black ${h.upper} text-white ${h.lead} mb-4`} style={{ ...h.style, fontSize: 'clamp(32px, 5vw, 56px)' }}>
            {c.h1a}<br /><span className="text-emerald-400">{c.h1b}</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">{c.intro}</p>
        </div>
      </Hero>

      <EngineSoundClient ui={c.ui} lang={c.lang} locale={c.numLocale ?? c.locale.replace('_', '-')} />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">{c.pickerEyebrow}</span>
            <h2 className={`text-3xl font-black ${h.upper} text-foreground mb-6`} style={h.style}>{c.pickerTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {c.subs.map((s) => (
                <Link key={s.key} href={subPath(c, s.key)} className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all">
                  <p className="font-bold text-foreground">{s.navLabel}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.cardDesc}</p>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mt-1">{c.pickerCta}</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">{c.pickerNote}</p>
          </section>

          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">
            <Sections sections={c.sections} lang={c.lang} />
            <div>
              <h2 className={`text-2xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{c.tipsTitle}</h2>
              <ul className="space-y-2 list-none">
                {c.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2"><Ear className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className={`text-2xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{c.exampleTitle}</h2>
              <p>{c.exampleText}</p>
            </div>
          </div>

          <Reviewed c={c} after={c.reviewedAfter} />
          <Faq faqs={c.faqs} title={c.faqTitle} lang={c.lang} />
          <Related c={c} />
        </div>
      </div>
    </div>
  );
}

// ── Sub page (ticking / knocking / rattling) ─────────────────────────

export function EngineSoundSubPage({ c, subKey }: { c: EngineSoundCopy; subKey: SubKey }) {
  const s: EngineSoundSubCopy = c.subs.find((x) => x.key === subKey)!;
  const path = subPath(c, subKey);
  const parent = mainPath(c);
  const h = heading(c.lang);
  const siblings = c.subs.filter((x) => x.key !== subKey);
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: s.metaTitle.split(' | ')[0],
        description: s.schemaDescription,
        url: abs(path),
        inLanguage: c.lang,
        dateModified: DATE_MODIFIED,
        author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
        reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: c.homeLabel, item: abs(c.homeHref) },
            { '@type': 'ListItem', position: 2, name: c.toolName, item: abs(parent) },
            { '@type': 'ListItem', position: 3, name: s.navLabel, item: abs(path) },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background" dir={c.dir} lang={c.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Hero c={c} accent="amber">
        <Crumbs c={c} backHref={parent} trail={[{ label: c.homeLabel, href: c.homeHref }, { label: c.toolName, href: parent }, { label: s.navLabel }]} />
        <LanguagePills path={path} className="mb-6" />
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            <Mic className="h-3 w-3" /> {c.badge}
          </span>
          <span className="inline-flex ms-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">{c.verified}</span>
          <h1 className={`font-black ${h.upper} text-white ${h.lead} mb-4`} style={{ ...h.style, fontSize: 'clamp(32px, 5vw, 56px)' }}>
            {s.h1a}<br /><span className="text-amber-400">{s.h1b}</span>
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed">{s.intro}</p>
        </div>
      </Hero>

      <EngineSoundClient ui={c.ui} lang={c.lang} locale={c.numLocale ?? c.locale.replace('_', '-')} />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">
          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">
            <Sections sections={s.sections} lang={c.lang} />
          </div>
          <div className="max-w-screen-lg">
            <h2 className={`text-xl font-black ${h.upper} text-foreground mb-3`} style={h.style}>{s.exampleTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.exampleText}</p>
          </div>
          <Reviewed c={c} after={s.reviewedAfter} />
          <Faq faqs={s.faqs} title={s.faqTitle} lang={c.lang} />
          <section>
            <h2 className={`text-xl font-black ${h.upper} text-foreground mb-4`} style={h.style}>{c.pickerTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[{ label: c.toolName, href: parent, desc: '' }, ...siblings.map((x) => ({ label: x.navLabel, href: subPath(c, x.key), desc: '' }))].map(({ label, href }) => (
                <Link key={href} href={href} className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{label}</p>
                  {c.dir === 'rtl' ? <ChevronLeft className="h-4 w-4 text-emerald-500" /> : <ChevronRight className="h-4 w-4 text-emerald-500" />}
                </Link>
              ))}
            </div>
          </section>
          <Related c={c} />
        </div>
      </div>
    </div>
  );
}
