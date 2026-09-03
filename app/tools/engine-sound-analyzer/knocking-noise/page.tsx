import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Mic } from 'lucide-react';
import EngineSoundAnalyzerClient from '../client';

export const metadata: Metadata = {
  title: 'Engine Knocking Noise Analyzer — Free AI Diagnosis | Naira Autos',
  description: 'Engine knocking? Record the sound and get an instant AI diagnosis — rod knock, detonation, injector knock, and more. Free, no login required.',
  alternates: { canonical: 'https://www.naira.autos/tools/engine-sound-analyzer/knocking-noise' },
  keywords: ['engine knocking noise', 'engine knocking sound', 'rod knock', 'knocking noise when accelerating', 'engine knock diagnosis', 'diesel engine knocking', 'car engine knocking'],
  openGraph: {
    title: 'Engine Knocking Noise Analyzer — Free AI Diagnosis | Naira Autos',
    description: 'Engine knocking? Record the sound and get an instant AI diagnosis of the likely cause.',
    url: 'https://www.naira.autos/tools/engine-sound-analyzer/knocking-noise',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Engine Knocking Noise Analyzer — Free AI Diagnosis',
      description: 'Free AI tool that diagnoses engine knocking noise from an audio recording.',
      url: 'https://www.naira.autos/tools/engine-sound-analyzer/knocking-noise',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Engine Sound Analyzer', item: 'https://www.naira.autos/tools/engine-sound-analyzer' },
          { '@type': 'ListItem', position: 4, name: 'Knocking Noise', item: 'https://www.naira.autos/tools/engine-sound-analyzer/knocking-noise' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What causes an engine knocking noise?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes include engine knock/detonation (fuel igniting unevenly, often from low octane fuel or carbon buildup), worn rod or main bearings (a deeper, heavier knock that gets worse with RPM), a failing fuel injector on diesel engines, or a loose accessory like an alternator pulley. The likely cause differs sharply by whether it happens under load, at idle, or right after refuelling.' } },
        { '@type': 'Question', name: 'Is engine knocking always serious?', acceptedAnswer: { '@type': 'Answer', text: 'Not always, but it deserves more caution than a light tick. Detonation knock from fuel quality is often manageable short-term, but a rod knock (worn bearing) is a genuine mechanical problem that gets worse and more expensive the longer it runs. If you\'re unsure which one you\'re hearing, treat it as the more serious possibility until you can confirm otherwise.' } },
        { '@type': 'Question', name: 'What is rod knock and how do I know if that\'s what I have?', acceptedAnswer: { '@type': 'Answer', text: 'Rod knock is a deep, rhythmic knocking sound caused by excess clearance in a worn connecting rod bearing — it typically gets louder as RPM increases and can sometimes be heard more clearly when the engine is under load. It\'s one of the more serious engine sounds since it signals internal bearing wear, and continuing to drive on it risks more extensive engine damage.' } },
        { '@type': 'Question', name: 'Why is my diesel engine knocking (Cummins, Powerstroke, HDI)?', acceptedAnswer: { '@type': 'Answer', text: 'Diesel engines are naturally louder and more knock-prone than petrol engines by design, but a new or worsening knock on diesels like the Cummins 5.9/6.7, Ford Powerstroke, or PSA HDI engines is often injector-related — a failing injector (sometimes called an injector knock or CP3 knock) has a distinct rattly-knock character. Fuel system issues are a common cause on these platforms specifically.' } },
        { '@type': 'Question', name: 'Can bad fuel cause engine knocking?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — using fuel with a lower octane rating than your engine requires can cause detonation knock (sometimes called pinging), where fuel ignites unevenly in the cylinder. This is usually a lighter, more metallic pinging sound under acceleration or load rather than a deep, constant knock, and it often improves with a higher-octane fuel or a fuel system cleaning.' } },
      ],
    },
  ],
};

export default function EngineKnockingNoisePage() {
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
              <span className="text-white/50">Knocking Noise</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Mic className="h-3 w-3" /> Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Engine Knocking<br /><span className="text-amber-400">Noise Analyzer</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              A deep, heavy knock is worth taking seriously — record it and find out whether it&apos;s fuel-related or something more mechanical.
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
                What Causes an Engine Knocking Noise?
              </h2>
              <p className="mb-3">A knock sits a step up in seriousness from a <Link href="/tools/engine-sound-analyzer/ticking-noise" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">tick</Link> — it&apos;s deeper, heavier, and usually gets louder under load or with RPM. The main causes are: <strong className="text-foreground">detonation/pinging</strong> from fuel igniting unevenly (often low octane fuel or carbon buildup), <strong className="text-foreground">rod or main bearing wear</strong> (a genuine mechanical fault that worsens over time), a <strong className="text-foreground">failing fuel injector</strong> on diesel engines specifically, or a <strong className="text-foreground">loose accessory</strong> like an alternator pulley that just sounds more serious than it is.</p>
              <p>Timing matters a lot here: a knock that appears right after refuelling points at fuel quality; one that&apos;s been growing steadily over weeks regardless of fuel points more toward bearing wear.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Rod Knock: The One to Take Seriously
              </h2>
              <p className="mb-3">Rod knock is a deep, rhythmic knocking sound caused by excess clearance in a worn connecting rod bearing. It typically gets louder as RPM increases and is sometimes more noticeable under load than at idle. Unlike a fuel-related knock, it doesn&apos;t improve with a fuel change — and continuing to drive on a genuine rod knock risks turning a bearing replacement into a full engine rebuild. If a knock is getting progressively worse over days or weeks rather than staying constant, treat that as the more serious possibility until you can rule it out.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Can Bad Fuel Cause Engine Knocking?
              </h2>
              <p className="mb-3">Yes — using fuel with a lower octane rating than your engine needs can cause detonation, sometimes described as pinging or knocking under acceleration. It's usually a lighter, more metallic sound than a mechanical knock, and it often clears up with a higher-octane fill-up or a fuel system clean. This is a more common cause than people expect, especially right after using a different fuel station or a lower grade than usual.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Diesel Engine Knocking (Cummins, Powerstroke, HDI, and Similar)
              </h2>
              <p className="mb-3">Diesel engines are inherently louder and knockier by design than petrol engines, which makes a genuine new knock harder to notice at first — but also means it&apos;s worth paying attention once you do. On common diesel platforms like the Cummins 5.9 and 6.7, Ford Powerstroke 6.7/7.3, and PSA/Peugeot-Citroën HDI engines, a new or worsening knock is frequently injector-related — sometimes called an injector knock or CP3 knock — with a distinct rattly, uneven character compared to the engine's normal running noise. Fuel system issues show up disproportionately often on these platforms specifically, which is useful context if you're trying to narrow down the cause on a diesel truck or van.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Common Knocking Complaints, By Vehicle
              </h2>
              <p className="mb-3">This is one of the most-searched engine complaints across a wide range of vehicles — Hyundai Sonata and Elantra owners, Kia Optima and Soul owners, Chevy Equinox owners, and F-150 owners all report it commonly enough that it shows up repeatedly in owner communities, alongside diesel-specific complaints on Cummins-powered trucks. The exact likely cause shifts depending on the platform (fuel-system issues are disproportionately common on diesels, bearing wear is more of a mileage-and-maintenance-history question on petrol engines), so adding your vehicle&apos;s brand, model, and year above helps the AI weight the possibilities correctly for your specific engine.</p>
            </div>
          </div>

          <div className="max-w-screen-lg">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Fuel Quality, Not the Bottom End</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Wale's Kia Optima started knocking under acceleration right after he filled up at a station he'd never used before. Worried about rod knock given the car's mileage, he recorded the sound before deciding whether to book an expensive diagnostic. The pattern matched detonation/pinging far more closely than a rod-bearing signature — lighter and more metallic, not the deep rhythmic knock rod wear typically produces. He ran a tank of higher-octane fuel through it and the knock cleared within a day, saving him from an unnecessary bearing inspection.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Auto Mechanic. Knock categories and causes checked for workshop accuracy.
          </p>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Engine Knocking Noise FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What causes an engine knocking noise?', a: 'Detonation from fuel quality, worn rod or main bearings, a failing diesel injector, or a loose accessory like an alternator pulley. Timing (right after refuelling vs. gradually worsening) is a strong clue.' },
                { q: 'Is engine knocking always serious?', a: 'Not always, but treat it with more caution than a tick. Fuel-related knock is often manageable; rod knock is a genuine mechanical problem that worsens over time.' },
                { q: 'What is rod knock?', a: 'A deep, rhythmic knock from excess clearance in a worn connecting rod bearing. Gets louder with RPM, doesn\'t improve with a fuel change, and risks more engine damage the longer it runs.' },
                { q: 'Why is my diesel engine knocking?', a: 'Diesels are naturally louder by design, but on Cummins, Powerstroke, and HDI engines specifically, a new or worsening knock is often injector-related.' },
                { q: 'Can bad fuel cause engine knocking?', a: 'Yes — low-octane fuel can cause detonation/pinging under acceleration. Usually lighter and more metallic than a mechanical knock, and often clears with better fuel.' },
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
                { href: '/tools/engine-sound-analyzer/ticking-noise', label: 'Ticking Noise Analyzer', color: 'emerald' },
                { href: '/tools/engine-sound-analyzer/rattling-noise', label: 'Rattling Noise Analyzer', color: 'violet' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic (any symptom)', color: 'blue' },
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
