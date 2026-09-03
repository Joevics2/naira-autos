import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight, Wrench, ArrowLeft, AlertTriangle,
  ListChecks, HelpCircle, Gauge, Activity
} from 'lucide-react';
import {
  getObdCode, getRelatedObdCodes, getAllObdCodeSlugs,
  SEVERITY_STYLES, SYSTEM_LABELS, type ObdCodeFull,
} from '@/lib/obd-codes';

// ── Static params (ISR) ───────────────────────────────────────────

export async function generateStaticParams() {
  const slugs = await getAllObdCodeSlugs();
  return slugs.map(slug => ({ slug }));
}

export const revalidate = 86400; // ISR: revalidate once every 24h so newly-published content shows up within a day, instead of hitting Supabase on every single request

// ── Metadata ──────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const item = await getObdCode(params.slug);
  if (!item) return { title: 'Code Not Found | Naira Autos' };

  const title = item.meta_title ?? `${item.code} Code: ${item.title} | Naira Autos`;
  const description =
    item.meta_description ??
    `What does ${item.code} mean? ${item.description} Causes, symptoms, and diagnostic steps.`;

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.naira.autos/tools/obd-codes/${item.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.naira.autos/tools/obd-codes/${item.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

// ── JSON-LD schemas ───────────────────────────────────────────────

function CodeSchema({ item }: { item: ObdCodeFull }) {
  const url = `https://www.naira.autos/tools/obd-codes/${item.slug}`;

  const faqItems = (item.faqs ?? []).map(f => ({ question: f.question, answer: f.answer }));

  const schemas: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTerm',
      '@id': url,
      name: item.code,
      description: item.title,
      url,
      inDefinedTermSet: {
        '@type': 'DefinedTermSet',
        name: 'OBD-II Diagnostic Trouble Codes',
        url: 'https://www.naira.autos/tools/obd-codes',
      },
      dateModified: item.updated_at,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'OBD-II Code Lookup', item: 'https://www.naira.autos/tools/obd-codes' },
        { '@type': 'ListItem', position: 4, name: item.code, item: url },
      ],
    },
  ];

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

  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: item.meta_title ?? `${item.code}: ${item.title}`,
    description: item.description,
    url,
    dateModified: item.updated_at,
    author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
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

export default async function ObdCodePage({
  params,
}: {
  params: { slug: string };
}) {
  const item = await getObdCode(params.slug);
  if (!item) notFound();

  const related = await getRelatedObdCodes(item.related_codes ?? []);
  const sev = SEVERITY_STYLES[item.severity] ?? SEVERITY_STYLES.Medium;

  return (
    <>
      <CodeSchema item={item} />

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
            <Link href="/tools/obd-codes" className="hover:text-white/60 transition-colors">OBD-II Codes</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50">{item.code}</span>
          </nav>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Wrench className="h-3 w-3" />
              {SYSTEM_LABELS[item.system] ?? item.system}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/60 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {item.category}
            </span>
            {!item.is_generic && (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                Manufacturer-specific
              </span>
            )}
          </div>

          {/* Code heading */}
          <h1
            className="font-black uppercase text-white leading-none tracking-tight mb-3"
            style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(38px, 7vw, 80px)' }}
          >
            {item.code}
          </h1>
          <p className="text-white/90 text-lg sm:text-xl font-semibold leading-snug mb-5 max-w-2xl">
            {item.title}
          </p>

          {/* Severity + DIY difficulty row */}
          <div className="flex flex-wrap items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-semibold ${sev.bg} ${sev.color} ${sev.border}`}>
              <AlertTriangle className="h-3.5 w-3.5" /> {item.severity} severity
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/70 font-semibold">
              <Gauge className="h-3.5 w-3.5" /> {item.diy_difficulty} to diagnose
            </span>
            {item.updated_at && (
              <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/50 font-semibold">
                Last verified: {new Date(item.updated_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="bg-background border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-3xl mx-auto">

            {/* ── Article ── */}
            <article className="space-y-10">

              {/* What it means */}
              <section>
                <h2 className="text-xl font-black uppercase text-foreground mb-4"
                  style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  What {item.code} Means
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </section>

              {/* Common causes */}
              {item.common_causes?.length > 0 && (
                <section>
                  <div className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-orange-500/15 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-foreground">
                        Common Causes
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {item.common_causes.map((c, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Symptoms */}
              {item.symptoms?.length > 0 && (
                <section>
                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                        <Activity className="h-3.5 w-3.5 text-amber-500" />
                      </div>
                      <h2 className="text-sm font-black uppercase tracking-wide text-amber-700 dark:text-amber-400">
                        Symptoms You Might Notice
                      </h2>
                    </div>
                    <ul className="space-y-2">
                      {item.symptoms.map((s, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* Diagnostic steps */}
              {item.diagnostic_steps?.length > 0 && (
                <section>
                  <h2 className="text-xl font-black uppercase text-foreground mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    <ListChecks className="h-5 w-5 text-emerald-500" />
                    What to Check First
                  </h2>
                  <ol className="space-y-3">
                    {item.diagnostic_steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                        <span className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {i + 1}
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* FAQs */}
              {item.faqs?.length > 0 && (
                <section>
                  <h2 className="text-xl font-black uppercase text-foreground mb-4 flex items-center gap-2"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    <HelpCircle className="h-5 w-5 text-emerald-500" />
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {item.faqs.map((f, i) => (
                      <div key={i} className="rounded-xl border border-border bg-card p-5">
                        <p className="text-sm font-bold text-foreground mb-2">{f.question}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Reviewer credit */}
              <p className="text-xs text-muted-foreground border-t border-border pt-4">
                Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Auto Mechanic. Causes and diagnostic steps checked for workshop accuracy.
              </p>

              {/* Back link */}
              <div className="pt-4">
                <Link
                  href="/tools/obd-codes"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to all OBD-II codes
                </Link>
              </div>
            </article>

            {/* ── Related codes ── */}
            {related.length > 0 && (
              <div className="mt-12 bg-card border border-border rounded-2xl p-5">
                <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
                  Related Codes
                </h3>
                <div className="space-y-2">
                  {related.map(r => {
                    const rSev = SEVERITY_STYLES[r.severity] ?? SEVERITY_STYLES.Medium;
                    return (
                      <Link
                        key={r.slug}
                        href={`/tools/obd-codes/${r.slug}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20 transition-colors"
                      >
                        <div className="w-5 h-5 rounded-md bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Wrench className="h-3 w-3 text-emerald-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-snug">{r.code}</p>
                          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">{r.title}</p>
                        </div>
                        <span className={`ml-auto text-xs px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${rSev.bg} ${rSev.color} ${rSev.border}`}>
                          {r.severity}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ── Related tools (same design as /tools/vin-checker) ── */}
            <section className="mt-6">
              <h3 className="text-sm font-bold text-foreground mb-3 uppercase tracking-wide">
                More Free Tools
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'emerald' },
                  { href: '/tools/vin-checker', label: 'VIN Checker', color: 'blue' },
                  { href: '/vehicles', label: 'Vehicle Information', color: 'violet' },
                ].map(({ href, label, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                  >
                    <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                    <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                  </Link>
                ))}
              </div>
            </section>

            {/* ── Explore all codes ── */}
            <div className="mt-6 bg-card border border-border rounded-2xl p-5">
              <h3 className="text-sm font-bold text-foreground mb-3">Explore All Codes</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Browse every common OBD-II diagnostic trouble code, grouped by system.
              </p>
              <Link
                href="/tools/obd-codes"
                className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                View all OBD-II codes
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
