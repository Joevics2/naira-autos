import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Wrench, ArrowLeft, AlertTriangle } from 'lucide-react';
import { getAllObdCodes, SEVERITY_STYLES, SYSTEM_LABELS, type ObdCodeSummary } from '@/lib/obd-codes';

// ── SEO ───────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'OBD-II Code Lookup — Free Engine Diagnostic Trouble Code Checker',
  description:
    'Free OBD-II / check engine light code lookup. What does P0420, P0300, P0171 mean? Get causes, symptoms, and diagnostic steps for common diagnostic trouble codes.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/obd-codes',
  },
  openGraph: {
    title: 'OBD-II Code Lookup — Free Diagnostic Trouble Code Checker',
    description:
      'What does your check engine light code mean? Free lookup for P0300, P0420, P0171, and every common OBD-II trouble code.',
    url: 'https://www.naira.autos/tools/obd-codes',
    type: 'website',
  },
};

// ── Schema ────────────────────────────────────────────────────────

function ObdCodesSchema({ codes }: { codes: ObdCodeSummary[] }) {
  const now = new Date().toISOString();
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.naira.autos/tools/obd-codes',
        name: 'OBD-II Code Lookup',
        description: `Free lookup for ${codes.length} common OBD-II diagnostic trouble codes.`,
        url: 'https://www.naira.autos/tools/obd-codes',
        dateModified: now,
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
            { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
            { '@type': 'ListItem', position: 3, name: 'OBD-II Code Lookup', item: 'https://www.naira.autos/tools/obd-codes' },
          ],
        },
      },
      {
        '@type': 'DefinedTermSet',
        '@id': 'https://www.naira.autos/tools/obd-codes#termset',
        name: 'OBD-II Diagnostic Trouble Codes',
        description: `${codes.length} OBD-II diagnostic trouble codes explained.`,
        url: 'https://www.naira.autos/tools/obd-codes',
        dateModified: now,
        hasDefinedTerm: codes.map(c => ({
          '@type': 'DefinedTerm',
          name: c.code,
          description: c.title,
          url: `https://www.naira.autos/tools/obd-codes/${c.slug}`,
          inDefinedTermSet: 'https://www.naira.autos/tools/obd-codes#termset',
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

export const revalidate = 0; // fetch fresh every request while content is actively changing

export default async function ObdCodesPage() {
  const codes = await getAllObdCodes();

  // Group by system (Powertrain, Body, Chassis, Network)
  const bySystem = codes.reduce<Record<string, ObdCodeSummary[]>>((acc, c) => {
    if (!acc[c.system]) acc[c.system] = [];
    acc[c.system].push(c);
    return acc;
  }, {});

  const systemOrder = ['Powertrain', 'Body', 'Chassis', 'Network'];
  const systems = systemOrder.filter(s => bySystem[s]?.length);

  return (
    <>
      <ObdCodesSchema codes={codes} />

      {/* ── Hero ── */}
      <div className="bg-[#080C10] border-b border-white/10">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">

          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Tools
          </Link>

          <nav className="flex items-center gap-1.5 text-xs text-white/30 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white/50">OBD-II Code Lookup</span>
          </nav>

          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
              <Wrench className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1
                className="font-black uppercase text-white leading-none tracking-tight mb-2"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}
              >
                OBD-II Code Lookup
              </h1>
              <p className="text-white/80 text-sm leading-relaxed max-w-2xl">
                What does your check engine light code actually mean? Look up{' '}
                <Link href="/tools/obd-codes/p0420" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-500/40 transition-colors">
                  P0420
                </Link>
                ,{' '}
                <Link href="/tools/obd-codes/p0300" className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 decoration-emerald-500/40 transition-colors">
                  P0300
                </Link>
                , and every common diagnostic trouble code — causes, symptoms, and what to check first. Works with any car, anywhere. {codes.length} codes and growing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Code list ── */}
      <div className="bg-background">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">

          {codes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">No codes published yet.</p>
            </div>
          ) : (
            <div className="space-y-14">
              {systems.map(system => (
                <section key={system}>
                  <div className="flex items-center gap-4 mb-6">
                    <h2
                      className="text-3xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                      style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
                    >
                      {SYSTEM_LABELS[system] ?? system}
                    </h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground font-medium">
                      {bySystem[system].length} {bySystem[system].length === 1 ? 'code' : 'codes'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {bySystem[system].map(c => {
                      const sev = SEVERITY_STYLES[c.severity] ?? SEVERITY_STYLES.Medium;
                      return (
                        <Link
                          key={c.slug}
                          href={`/tools/obd-codes/${c.slug}`}
                          className="group bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <p className="font-bold text-foreground text-base leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                              {c.code}
                            </p>
                            <ChevronRight className="h-4 w-4 text-muted-foreground/40 flex-shrink-0 mt-0.5 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all" />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                            {c.title}
                          </p>
                          <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${sev.bg} ${sev.color} ${sev.border}`}>
                            <AlertTriangle className="h-3 w-3" /> {c.severity} severity
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* Quick links */}
          <div className="mt-16 flex flex-col gap-2">
            {[
              { label: 'AI Mechanic',        sub: 'Describe the symptom and get a free diagnosis', href: '/tools/ai-mechanic' },
              { label: 'VIN Checker',        sub: 'Decode any VIN — make, model, year, engine',    href: '/tools/vin-checker' },
              { label: 'Vehicle Information', sub: 'Common problems & parts by model',              href: '/vehicles' },
              { label: 'Read Blog Posts',    sub: 'Tips, guides & buying advice',                   href: '/blog' },
            ].map(({ label, sub, href }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{label}</p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-0.5">{sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-emerald-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
