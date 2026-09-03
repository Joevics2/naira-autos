import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Mic } from 'lucide-react';
import EngineSoundAnalyzerClient from '../client';

export const metadata: Metadata = {
  title: 'Engine Rattling Noise Analyzer — Free AI Diagnosis | Naira Autos',
  description: 'Engine rattling? Record the sound and get an instant AI diagnosis — timing chain, heat shield, cam phaser, engine mount, and more. Free, no login.',
  alternates: { canonical: 'https://www.naira.autos/tools/engine-sound-analyzer/rattling-noise' },
  keywords: ['engine rattle', 'engine rattling noise', 'rattle when accelerating', 'timing chain rattle', 'cam phaser rattle', 'engine mount rattle', 'car engine rattle'],
  openGraph: {
    title: 'Engine Rattling Noise Analyzer — Free AI Diagnosis | Naira Autos',
    description: 'Engine rattling? Record the sound and get an instant AI diagnosis of the likely cause.',
    url: 'https://www.naira.autos/tools/engine-sound-analyzer/rattling-noise',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Engine Rattling Noise Analyzer — Free AI Diagnosis',
      description: 'Free AI tool that diagnoses engine rattling noise from an audio recording.',
      url: 'https://www.naira.autos/tools/engine-sound-analyzer/rattling-noise',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Engine Sound Analyzer', item: 'https://www.naira.autos/tools/engine-sound-analyzer' },
          { '@type': 'ListItem', position: 4, name: 'Rattling Noise', item: 'https://www.naira.autos/tools/engine-sound-analyzer/rattling-noise' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What causes an engine rattling noise?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes are a loose heat shield vibrating against the exhaust, a worn timing chain or chain tensioner, a failing cam phaser (common on some Ford and GM engines), a worn or broken engine mount letting the engine shift and hit something, or a loose accessory like an alternator pulley or fuel injector rattle on diesels. A loose heat shield is by far the most common and cheapest to fix.' } },
        { '@type': 'Question', name: 'Why does my engine rattle only when accelerating?', acceptedAnswer: { '@type': 'Answer', text: 'A rattle that only appears under acceleration or load, and goes away at idle, often points to a heat shield vibrating at a specific engine speed, or a cam phaser/timing component under load. A rattle present at idle too is more likely a loose mount or a chain/tensioner issue that isn\'t load-dependent.' } },
        { '@type': 'Question', name: 'Is a timing chain rattle serious?', acceptedAnswer: { '@type': 'Answer', text: 'It can be. A worn timing chain or a failing tensioner usually rattles most noticeably on cold start and can worsen over time; if the chain skips it can cause serious engine damage. It\'s one of the rattle causes worth having checked sooner rather than later, unlike a loose heat shield which is more of a nuisance than a risk.' } },
        { '@type': 'Question', name: 'What is a cam phaser rattle?', acceptedAnswer: { '@type': 'Answer', text: 'Cam phasers adjust valve timing on the fly, and a worn phaser or its oil control solenoid can cause a distinct rattle, particularly on cold start or at idle. This is a well-known issue on certain Ford (including the F-150 with the 5.4/3.5 EcoBoost family) and GM engines specifically, and tends to get worse gradually rather than appearing suddenly.' } },
        { '@type': 'Question', name: 'Could the rattle just be a loose heat shield?', acceptedAnswer: { '@type': 'Answer', text: 'It\'s worth checking first, since it\'s the cheapest and most common cause of an engine-area rattle. Heat shields protect the exhaust and nearby components from engine heat, and they\'re held on with clips or small bolts that corrode and loosen over time, especially on older vehicles. A rattle that changes pitch or seems to move around under the car when you rev the engine in park is a strong hint it\'s a heat shield rather than something internal.' } },
      ],
    },
  ],
};

export default function EngineRattlingNoisePage() {
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
              <span className="text-white/50">Rattling Noise</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Mic className="h-3 w-3" /> Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Engine Rattling<br /><span className="text-emerald-400">Noise Analyzer</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              A loose, metallic rattle — often cheap to fix, sometimes not. Record it and find out which one you&apos;re dealing with.
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
                What Causes an Engine Rattling Noise?
              </h2>
              <p className="mb-3">A rattle covers a wide range of causes, from the trivial to the genuinely important. The most common: a <strong className="text-foreground">loose heat shield</strong> vibrating against the exhaust (by far the most frequent and cheapest to fix), a <strong className="text-foreground">worn timing chain or tensioner</strong>, a failing <strong className="text-foreground">cam phaser</strong> on certain Ford and GM engines, a <strong className="text-foreground">worn or broken engine mount</strong> letting the engine shift and contact something it shouldn&apos;t, or a loose accessory like an alternator pulley or, on diesels, a fuel injector rattle.</p>
              <p>Whether it happens at idle, only under acceleration, or only over bumps is one of the strongest clues to which of these it actually is.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Could It Just Be a Loose Heat Shield?
              </h2>
              <p className="mb-3">It's worth ruling this out first, since it's the cheapest and most common cause of an engine-area rattle. Heat shields protect the exhaust and nearby components from engine heat, and the clips or small bolts holding them on corrode and loosen over time, especially on older vehicles. A rattle that changes pitch or seems to move around under the car when you rev the engine in park (with the handbrake on, safely) is a strong hint it's a heat shield rather than something internal — and it's usually a low-cost fix once confirmed.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Timing Chain and Cam Phaser Rattles — Worth Taking Seriously
              </h2>
              <p className="mb-3">A worn timing chain or failing tensioner typically rattles most noticeably on cold start, and can worsen over time; if the chain were to skip, it risks serious engine damage, which makes this a cause worth checking sooner rather than monitoring indefinitely. Cam phaser rattles are a related but distinct issue — cam phasers adjust valve timing on the fly, and a worn phaser or its oil control solenoid produces a distinct rattle, particularly on cold start or at idle. This is a well-documented issue on certain Ford engines (including F-150 V8 and EcoBoost variants) and GM engines specifically, and tends to worsen gradually rather than appear suddenly.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Engine Mounts and Diesel Injector Rattles
              </h2>
              <p className="mb-3">A worn or broken engine mount lets the engine shift slightly under acceleration or braking, sometimes far enough to knock against the frame or another component — this often shows up as a rattle or clunk specifically when accelerating, braking, or shifting gear, rather than at a steady idle. On diesel engines, particularly Cummins-powered trucks, a fuel injector rattle is also common and has a distinct character compared to a heat shield or mount issue — worth mentioning in the description field above if you're on a diesel platform, since it changes which cause the AI weighs as most likely.</p>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Serpentine Belt and Pulley Rattles
              </h2>
              <p className="mb-3">A worn or loose serpentine belt tensioner, idler pulley, or the alternator pulley itself can produce a rattle that&apos;s often mistaken for something coming from deeper inside the engine, since belt-driven components sit right at the front of the engine bay where sound carries easily. This type of rattle is usually most noticeable at idle and can change or clear briefly when you rev the engine, which is a useful distinguishing clue — it&apos;s generally a lower-cost fix than a timing or cam phaser issue, but worth confirming rather than assuming.</p>
            </div>
          </div>

          <div className="max-w-screen-lg">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Not the Timing Chain After All</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Derek's F-150 developed a rattle on cold start and he assumed the worst — a timing chain going bad, given the truck had 130,000 miles on it. He recorded 12 seconds of the cold-start rattle and ran it through this tool. The pattern matched a cam phaser/solenoid rattle far more closely than a timing chain signature — a known issue on his specific engine family, and a considerably cheaper fix than a chain replacement. He booked a diagnostic specifically asking the shop to check the phasers first rather than paying for a broader (and pricier) timing investigation.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Auto Mechanic. Rattle categories and causes checked for workshop accuracy.
          </p>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Engine Rattling Noise FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What causes an engine rattling noise?', a: 'Most often a loose heat shield, a worn timing chain or tensioner, a failing cam phaser, a worn engine mount, or a loose accessory like a pulley or (on diesels) a fuel injector.' },
                { q: 'Why does my engine only rattle when accelerating?', a: 'Often a heat shield vibrating at a specific speed, or a cam phaser/timing component under load. A rattle present at idle too is more likely a loose mount or a chain issue.' },
                { q: 'Is a timing chain rattle serious?', a: 'It can be — a worn chain or tensioner rattles most on cold start and can worsen; a skipped chain risks serious engine damage. Worth checking sooner rather than later.' },
                { q: 'What is a cam phaser rattle?', a: 'A rattle from a worn cam phaser or its solenoid, most noticeable on cold start or idle — a known issue on certain Ford and GM engines that tends to worsen gradually.' },
                { q: 'Could it just be a loose heat shield?', a: 'Worth checking first — it\'s the cheapest, most common cause. A rattle that changes pitch or seems to move around under the car when revved in park is a strong hint.' },
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
                { href: '/tools/engine-sound-analyzer/knocking-noise', label: 'Knocking Noise Analyzer', color: 'amber' },
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
