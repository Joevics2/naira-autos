import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Mic } from 'lucide-react';
import EngineSoundAnalyzerClient from '../client';

export const metadata: Metadata = {
  title: 'Engine Ticking Noise Analyzer — Free AI Diagnosis | Naira Autos',
  description: 'Engine making a ticking noise? Record it and get an instant AI diagnosis — lifter tick, injector tick, valvetrain wear, and more. Free, no login.',
  alternates: { canonical: 'https://www.naira.autos/tools/engine-sound-analyzer/ticking-noise' },
  keywords: ['engine ticking noise', 'engine ticking sound', 'lifter tick', 'ticking noise when accelerating', 'ticking noise engine', 'car making ticking noise', 'engine tick diagnosis'],
  openGraph: {
    title: 'Engine Ticking Noise Analyzer — Free AI Diagnosis | Naira Autos',
    description: 'Engine making a ticking noise? Record it and get an instant AI diagnosis of the likely cause.',
    url: 'https://www.naira.autos/tools/engine-sound-analyzer/ticking-noise',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Engine Ticking Noise Analyzer — Free AI Diagnosis',
      description: 'Free AI tool that diagnoses engine ticking noise from an audio recording.',
      url: 'https://www.naira.autos/tools/engine-sound-analyzer/ticking-noise',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Engine Sound Analyzer', item: 'https://www.naira.autos/tools/engine-sound-analyzer' },
          { '@type': 'ListItem', position: 4, name: 'Ticking Noise', item: 'https://www.naira.autos/tools/engine-sound-analyzer/ticking-noise' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What causes an engine ticking noise?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes are worn or noisy hydraulic lifters, low oil level or pressure, a failing fuel injector (a sharper, more electronic-sounding tick), exhaust manifold leaks, or normal valvetrain clatter on cold start that quiets as oil pressure builds. The exact cause depends heavily on when the tick happens — record it and describe the pattern for a more precise answer.' } },
        { '@type': 'Question', name: 'Why does my engine tick on cold start but stop after a few minutes?', acceptedAnswer: { '@type': 'Answer', text: 'This is classic hydraulic lifter behaviour — oil takes a moment to fully fill the lifters after the engine has sat overnight, so they tick until oil pressure builds and the valvetrain quiets down. It\'s common and often harmless if it clears within a minute or two, but a lifter tick that lingers longer or gets louder over weeks is worth having checked.' } },
        { '@type': 'Question', name: 'Does an engine ticking noise mean I need a new engine?', acceptedAnswer: { '@type': 'Answer', text: 'Almost never on its own. A tick is usually a valvetrain or lifter issue, or a minor exhaust leak — not a sign of major internal damage. A deeper, heavier knock (rather than a light tick) is the sound more associated with serious bearing wear. If you\'re unsure which one you\'re hearing, use the analyzer above.' } },
        { '@type': 'Question', name: 'Do lifter tick additives like Seafoam or Rislone actually work?', acceptedAnswer: { '@type': 'Answer', text: 'They can help in some cases — these oil treatments are designed to clean varnish and debris out of hydraulic lifters, which sometimes quiets a tick caused by a stuck or gummed-up lifter. They won\'t fix a tick caused by mechanical wear, a bad injector, or an exhaust leak, so they\'re worth trying only after you have some idea of the actual cause.' } },
        { '@type': 'Question', name: 'Is a ticking noise when accelerating more serious than at idle?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily more serious, but it points to a different likely cause — a tick that gets faster or louder with RPM often tracks engine speed (valvetrain, injector, or a rod-related issue), while a tick that stays constant regardless of RPM is more likely an exhaust leak or an accessory like a heat shield. Recording it during acceleration specifically helps narrow this down.' } },
      ],
    },
  ],
};

export default function EngineTickingNoisePage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-[#080C10] pt-10 pb-10 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/engine-sound-analyzer" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/engine-sound-analyzer" className="hover:text-white/60 transition-colors">Engine Sound Analyzer</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Ticking Noise</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Mic className="h-3 w-3" /> Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Engine Ticking<br /><span className="text-emerald-400">Noise Analyzer</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              A light, rapid tap-tap-tap from the engine bay — record it and find out if it&apos;s a harmless cold-start tick or something worth checking sooner.
            </p>
          </div>
        </div>
      </div>

      <EngineSoundAnalyzerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What Causes an Engine Ticking Noise?
              </h2>
              <p className="mb-3">A ticking noise is one of the most common engine sounds drivers search for, and one of the least consistent in what it actually means. The most frequent causes are: <strong className="text-foreground">worn or noisy hydraulic lifters</strong> (a light, steady tick that often quiets as the engine warms), <strong className="text-foreground">low oil level or oil pressure</strong> starving the valvetrain, a <strong className="text-foreground">failing fuel injector</strong> (a sharper, more electronic-sounding tick, often per-cylinder), an <strong className="text-foreground">exhaust manifold leak</strong> (a tick that sounds more metallic and is present even at idle), or simply normal valvetrain clatter on cold start that isn&apos;t a fault at all.</p>
              <p>The pattern matters more than the sound alone — when it happens, how it changes with engine speed, and whether it fades as the engine warms are the details that actually separate a harmless tick from one worth acting on.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cold Start Ticking vs. a Tick That Won&apos;t Go Away
              </h2>
              <p className="mb-3">If your engine ticks for the first 30–60 seconds after a cold start and then quiets down, that&apos;s classic hydraulic lifter behaviour — oil takes a moment to fully fill the lifters after sitting overnight, and the tick clears once oil pressure builds. It&apos;s common across almost every make and model and usually nothing to worry about on its own.</p>
              <p>A tick that persists after warm-up, gets louder over days or weeks, or shows up newly under acceleration is a different situation — that pattern is more consistent with a lifter that&apos;s actually failing (not just cold), low oil, or an injector issue, and is worth having looked at rather than monitored indefinitely.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Does a Ticking Noise Mean I Need a New Engine?
              </h2>
              <p className="mb-3">Almost never on its own. A tick is generally a valvetrain, lifter, injector, or exhaust-leak issue — none of which typically require an engine replacement, and most of which are moderate-cost repairs rather than catastrophic ones. The sound more associated with serious internal damage (a spun bearing, for instance) is a deeper, heavier <Link href="/tools/engine-sound-analyzer/knocking-noise" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">knock</Link>, not a light tick. If you&apos;re not sure which one you&apos;re hearing, that distinction alone is worth getting right before you worry too much.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Do Lifter Tick Additives (Seafoam, Rislone, Lucas Oil) Actually Work?
              </h2>
              <p className="mb-3">Sometimes, yes — these are oil treatments designed to clean varnish and debris out of hydraulic lifters, and if your tick is caused by a stuck or gummed-up lifter (common on engines with infrequent oil changes), they can genuinely quiet things down. They won&apos;t fix a tick caused by mechanical wear, a failing injector, or an exhaust leak, since those aren&apos;t cleanliness problems. They&apos;re worth trying as a first, low-cost step once you have a reasonable idea the cause is lifter-related rather than something else — which is exactly what recording the sound above can help confirm before you spend on a product that may not address your specific cause.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Common Ticking Noise Complaints, By Vehicle
              </h2>
              <p className="mb-3">This is one of the most searched engine complaints across almost every brand — Jeep Grand Cherokee and Wrangler owners report it on 3.6L V6 engines, Hyundai Elantra and Kia Forte/Soul owners report it commonly enough that it&apos;s a known talking point in owner forums, and V8 trucks like the Chevy Silverado 4.3 and various Chrysler/Dodge minivans (Town &amp; Country, Grand Caravan) show up just as often. The underlying causes are the same regardless of badge — lifters, injectors, oil condition, or exhaust leaks — but a description of your specific make, model, and year (in the optional fields above) helps the AI weigh which cause is statistically more likely for your engine.</p>
            </div>
          </div>

          <div className="max-w-screen-lg">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: A Tick That Didn't Clear</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Maria's Jeep Grand Cherokee had always ticked briefly on cold mornings — normal, and it cleared within a minute like usual. A few weeks later she noticed it was taking longer to quiet down, sometimes lasting through her whole commute. She recorded it both at cold start and after 10 minutes of driving and ran both through this tool. The persistent version matched a worsening lifter pattern rather than the harmless cold-start signature, which was the detail that told her it had moved from "keep an eye on it" to "book it in this week" rather than waiting for it to fully resolve on its own.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Auto Mechanic. Tick categories and causes checked for workshop accuracy.
          </p>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Engine Ticking Noise FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What causes an engine ticking noise?', a: 'Most often: worn hydraulic lifters, low oil pressure, a failing fuel injector, an exhaust manifold leak, or normal cold-start valvetrain clatter that clears as the engine warms.' },
                { q: 'Why does my engine tick on cold start but stop after a few minutes?', a: 'Classic hydraulic lifter behaviour — oil takes a moment to fill the lifters after sitting overnight. Common and usually harmless if it clears within a minute or two.' },
                { q: 'Does a ticking noise mean I need a new engine?', a: 'Almost never on its own. It\'s usually a valvetrain, lifter, or exhaust-leak issue, not major internal damage. A heavier knock is more associated with serious bearing wear.' },
                { q: 'Do lifter tick additives like Seafoam or Rislone work?', a: 'Sometimes — they clean gummed-up lifters, which can quiet a cleanliness-related tick. They won\'t fix mechanical wear, a bad injector, or an exhaust leak.' },
                { q: 'Is a ticking noise when accelerating more serious?', a: 'Not necessarily more serious, but it points to a different cause. A tick that speeds up with RPM often tracks valvetrain or injector activity; one that stays constant is more likely an exhaust leak.' },
              ].map(({ q, a }) => (
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

          {/* Related */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Hearing a Different Sound?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/engine-sound-analyzer/knocking-noise', label: 'Knocking Noise Analyzer', color: 'blue' },
                { href: '/tools/engine-sound-analyzer/rattling-noise', label: 'Rattling Noise Analyzer', color: 'violet' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic (any symptom)', color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link key={href} href={href} className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}>
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
