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
  // Static last-content-audit date, not a live timestamp — new Date() here
  // would silently claim the page was "modified" on every single page load.
  const lastAudited = '2026-08-01';
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.naira.autos/tools/obd-codes',
        name: 'OBD-II Code Lookup',
        description: `Free lookup for ${codes.length} common OBD-II diagnostic trouble codes.`,
        url: 'https://www.naira.autos/tools/obd-codes',
        dateModified: lastAudited,
        author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
        reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
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
        dateModified: lastAudited,
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

export const revalidate = 86400; // ISR: revalidate once every 24h so newly-published content shows up within a day, instead of hitting Supabase on every single request

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
              <p className="text-white/40 text-xs mt-3">Last verified: August 2026 · Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-white/70">Emmanuel Erere</Link>, Auto Mechanic</p>
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

          {/* ── SEO content ── */}
          <section className="mt-16 max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Understanding OBD-II Diagnostic Trouble Codes
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                OBD-II (On-Board Diagnostics, second generation) is the standardized system every car and light truck sold since 1996 uses to monitor engine, transmission, and emissions performance. When something falls outside its normal operating range — a sensor reading, a fuel mixture, a misfire — the vehicle's computer stores a diagnostic trouble code and turns on the check engine light. That code is what a free OBD2 scanner or code reader retrieves, and it's the starting point for figuring out what's actually wrong.
              </p>
              <p>
                Every OBD-II code follows the same format: a letter, followed by four numbers. The letter tells you which system is affected — <strong className="text-foreground">P</strong> for Powertrain (engine and transmission, by far the most common), <strong className="text-foreground">B</strong> for Body (airbags, power windows, climate control), <strong className="text-foreground">C</strong> for Chassis (brakes, steering, suspension), and <strong className="text-foreground">U</strong> for Network (communication between the car's different control modules). The first digit after the letter tells you whether it's a generic code defined by the SAE standard and shared across every manufacturer (0) or a manufacturer-specific code unique to that brand (1). The remaining three digits identify the specific fault — for example, P0300 means a random or multiple cylinder misfire, while P0420 means the catalytic converter isn't cleaning exhaust gases efficiently enough.
              </p>
              <p>
                A steady check engine light usually means the issue can wait a few days without causing further damage, though it's still worth looking up the code and getting it checked soon. A <strong className="text-foreground">flashing</strong> check engine light is more urgent — it typically indicates an active misfire that's dumping unburned fuel into the exhaust system, which can damage the catalytic converter if you keep driving on it. When in doubt, reduce your speed, avoid heavy acceleration, and get the car looked at as soon as you reasonably can.
              </p>
              <p>
                You don't need an expensive diagnostic tool to read your own codes. Basic OBD2 scanners and Bluetooth adapters that pair with a free smartphone app are inexpensive and plug into the OBD-II port, almost always located under the dashboard on the driver's side, usually within reach without tools. Once you have the code, look it up here to understand what it means, what commonly causes it, what symptoms to expect, and what to check first before paying for a diagnosis — many of the most common codes (like a loose fuel cap triggering an EVAP leak code, or a dirty mass airflow sensor triggering a lean-condition code) have simple, low-cost fixes you can rule out yourself.
              </p>
              <p>
                This lookup covers the most commonly searched, well-documented generic codes — misfires, catalyst efficiency, fuel trim (lean/rich conditions), sensor faults, transmission codes, and network communication errors — with plain-language explanations of causes, symptoms, and diagnostic steps for each one. New codes are added regularly. If a code you're looking for isn't listed yet, our <Link href="/tools/ai-mechanic" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">AI Mechanic</Link> can help you diagnose the underlying symptom directly.
              </p>
              <p>
                One thing worth knowing before you spend money on repairs: a diagnostic trouble code tells you <em>what</em> the car's computer detected, not automatically <em>why</em>. The same code can have several different root causes — a lean-condition code, for example, could come from a vacuum leak, a dirty airflow sensor, a weak fuel pump, or a bad oxygen sensor. That's why each code page here lists the common causes in rough order of likelihood, alongside the symptoms you'd typically notice and the checks worth doing yourself before paying a mechanic to diagnose it from scratch. It won't replace a proper diagnosis for anything mechanical or safety-related, but it will tell you enough to ask the right questions and avoid being sold a repair you don't need.
              </p>
            </div>
          </section>

          {/* Related tools */}
          <section className="mt-10">
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
        </div>
      </div>
    </>
  );
}
