import Link from 'next/link';
import { FileCheck2, History, Sparkles } from 'lucide-react';
import { getAllPublishedTemplates } from '@/lib/document-templates-data';
import { getDocumentCountry, getDocumentType } from '@/lib/document-types';
import { abs } from '@/lib/hreflang';
import { getDocs, type DocsLang } from '@/lib/documents-i18n';
import { LANG_REGIONS, classifySlug } from '@/lib/documents-i18n/shared';
import { ARTICLES } from '@/lib/documents-i18n/articles';
import DocsIndexLocalized, { type HubTemplate } from '@/components/documents/DocsIndexLocalized';
import DocsHeader from '@/components/documents/DocsHeader';
import LanguagePills from '@/components/ui/LanguagePills';

function regionName(code: string, locale: string, fallback: string) {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' }).of(code.toUpperCase()) ?? fallback;
  } catch {
    return fallback;
  }
}

/** One language's document-templates hub. Server component: list HTML, copy, FAQ and schema all render on the server. */
export default async function DocsHubPage({ lang }: { lang: DocsLang }) {
  const s = getDocs(lang);
  const article = ARTICLES[lang];
  const rows = await getAllPublishedTemplates();

  const countries: Record<string, { name: string; flag: string }> = {};
  const templates: HubTemplate[] = rows.map(r => {
    if (!countries[r.country]) {
      const c = getDocumentCountry(r.country);
      countries[r.country] = { name: regionName(r.country, s.locale, c?.name ?? r.country.toUpperCase()), flag: c?.flag ?? '\u{1F30D}' };
    }
    return {
      id: r.id,
      type: r.document_type,
      country: r.country,
      title: (lang === 'en' ? getDocumentType(r.document_type)?.label : undefined) || r.title,
      updated: r.updated_at,
      updatedLabel: new Date(r.updated_at).toLocaleDateString(s.locale, { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }),
      cat: classifySlug(r.document_type),
    };
  });

  const url = abs(s.path);
  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    url,
    name: s.h1,
    description: s.description,
    inLanguage: s.locale,
    isPartOf: { '@type': 'WebSite', name: 'Naira Autos', url: abs('/') },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: templates.length,
      itemListElement: templates.slice(0, 50).map((t, i) => ({
        '@type': 'ListItem', position: i + 1, url: abs(`${s.templateBase}/${t.type}/${t.country}`), name: t.title,
      })),
    },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: s.locale,
    mainEntity: s.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <div className="min-h-screen bg-background" dir={s.dir} lang={s.locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-6 space-y-8">
        <DocsHeader lang={lang} crumbs={[{ label: s.docsLabel, path: s.path }]} />

        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="h-4 w-4 text-sky-500" />
              <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{s.kicker}</span>
            </div>
            <LanguagePills path={s.path} tone="auto" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{s.h1}</h1>
          <p className="text-muted-foreground leading-relaxed">{s.intro}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Link prefetch={false}
              href={s.minePath}
              className="inline-flex items-center gap-2 bg-card border border-border hover:border-sky-500/40 hover:text-sky-500 text-sm font-semibold text-foreground rounded-lg px-4 py-2 transition-colors"
            >
              <History className="h-4 w-4" />
              {s.mineLabel}
            </Link>
            {s.axiosHref && s.axiosCta && (
              <p className="text-sm text-muted-foreground">
                {s.axiosLead}{' '}
                <Link prefetch={false} href={s.axiosHref} className="text-sky-500 hover:underline inline-flex items-center gap-1">
                  <Sparkles className="h-3.5 w-3.5" />{s.axiosCta}
                </Link>
              </p>
            )}
          </div>
        </header>

        <DocsIndexLocalized
          templates={templates}
          templateBase={s.templateBase}
          countries={countries}
          regionCodes={LANG_REGIONS[lang] ?? []}
          categories={s.categories}
          ui={s.ui}
          locale={s.locale}
        />

        <section aria-labelledby="guide-h" className="space-y-4">
          <h2 id="guide-h" className="text-xl font-bold text-foreground">{s.guideHeading}</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {s.guide.map(g => (
              <div key={g.term} className="bg-card border border-border rounded-xl p-4">
                <dt className="font-semibold text-foreground text-sm">{g.term}</dt>
                <dd className="text-sm text-muted-foreground mt-1 leading-relaxed">{g.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="steps-h" className="space-y-3">
          <h2 id="steps-h" className="text-xl font-bold text-foreground">{s.stepsHeading}</h2>
          <ol className="list-decimal ps-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed marker:text-sky-500 marker:font-semibold">
            {s.steps.map(x => <li key={x}>{x}</li>)}
          </ol>
        </section>

        <section aria-labelledby="tips-h" className="space-y-3">
          <h2 id="tips-h" className="text-xl font-bold text-foreground">{s.tipsHeading}</h2>
          <ul className="list-disc ps-5 space-y-1.5 text-sm text-muted-foreground leading-relaxed marker:text-sky-500">
            {s.tips.map(x => <li key={x}>{x}</li>)}
          </ul>
        </section>

        <article aria-labelledby="article-h" className="space-y-6">
          <h2 id="article-h" className="text-xl font-bold text-foreground">{article.heading}</h2>
          {article.sections.map(sec => (
            <div key={sec.h} className="space-y-2.5">
              <h3 className="text-base font-semibold text-foreground">{sec.h}</h3>
              {sec.p.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">{para}</p>
              ))}
            </div>
          ))}
        </article>

        <section aria-labelledby="faq-h" className="space-y-3">
          <h2 id="faq-h" className="text-xl font-bold text-foreground">{s.faqHeading}</h2>
          <div className="space-y-3">
            {s.faq.map(f => (
              <div key={f.q} className="bg-card border border-border rounded-xl p-4">
                <h3 className="font-semibold text-foreground text-sm">{f.q}</h3>
                <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-t border-border pt-5 space-y-1.5 text-xs text-muted-foreground leading-relaxed">
          <p>{s.disclaimer}</p>
          <p>{s.privacyNote}</p>
        </footer>
      </div>
    </div>
  );
}
