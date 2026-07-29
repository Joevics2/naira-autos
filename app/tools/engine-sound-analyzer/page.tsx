import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Mic, Ear } from 'lucide-react';
import EngineSoundAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Engine Sound Analyzer — Free AI Diagnosis from Audio | Naira Autos',
  description: 'Record or upload your engine sound and get an instant AI diagnosis of the likely cause — ticking, knocking, rattling, and more. Free, no login required.',
  alternates: { canonical: 'https://www.naira.autos/tools/engine-sound-analyzer' },
  keywords: ['engine noise', 'car engine sound', 'engine sounds', 'engine noise diagnosis', 'what is that noise my car is making', 'car making weird noise', 'engine sound analyzer', 'ai engine diagnosis'],
  openGraph: {
    title: 'Engine Sound Analyzer — Free AI Diagnosis from Audio | Naira Autos',
    description: 'Record or upload your engine sound and get an instant AI diagnosis of the likely cause.',
    url: 'https://www.naira.autos/tools/engine-sound-analyzer',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Engine Sound Analyzer — Free AI Diagnosis from Audio',
      description: 'Free AI tool that diagnoses car problems from an engine sound recording.',
      url: 'https://www.naira.autos/tools/engine-sound-analyzer',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Engine Sound Analyzer', item: 'https://www.naira.autos/tools/engine-sound-analyzer' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is an engine sound analyzer?', acceptedAnswer: { '@type': 'Answer', text: 'It\'s a tool that listens to a recording of your engine noise and identifies the likely cause using AI, the same way an experienced mechanic diagnoses a fault by ear before opening the bonnet. Record or upload a clip and get a diagnosis with likely causes, urgency level, and next steps.' } },
        { '@type': 'Question', name: 'What kind of car engine sound can this diagnose?', acceptedAnswer: { '@type': 'Answer', text: 'Ticking, knocking, rattling, squealing, grinding, whining, and most other unusual engine sounds. If your car is making a noise you can\'t place, record it and let the AI narrow down the likely source — engine, belt, suspension, or exhaust.' } },
        { '@type': 'Question', name: 'How long does the audio recording need to be?', acceptedAnswer: { '@type': 'Answer', text: 'The free tier analyses the first 30 seconds of any clip, which is normally enough for a clear diagnosis. Try to capture the sound clearly, without music or conversation over it, ideally with the sound at its most noticeable (e.g. on cold start, or during acceleration).' } },
        { '@type': 'Question', name: 'Is the diagnosis always accurate?', acceptedAnswer: { '@type': 'Answer', text: 'No — it\'s not always 100% accurate. It\'s a strong starting point based on the audio (and any description or vehicle details you add), but it can miss things a hands-on inspection would catch. Treat it as a first opinion, not a final answer, and stop driving immediately for anything involving brakes, steering, or fuel.' } },
        { '@type': 'Question', name: 'Is this free to use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — free, no login required. Longer recordings beyond the first 30 seconds are planned as a future paid option, but the core analysis is free.' } },
      ],
    },
  ],
};

export default function EngineSoundAnalyzerPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="bg-[#080C10] pt-10 pb-10 px-4">
        <div className="max-w-screen-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Engine Sound Analyzer</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Mic className="h-3 w-3" /> Free Tool
            </span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Engine Sound<br /><span className="text-emerald-400">Analyzer</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Record or upload the sound your car is making and get an instant AI diagnosis — likely causes, how urgent it is, and what it might cost to fix.
            </p>
          </div>
        </div>
      </div>

      <EngineSoundAnalyzerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Symptom picker */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Which Sound Are You Hearing?</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Pick the Closest Match
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { href: '/tools/engine-sound-analyzer/ticking-noise', title: 'Ticking Noise', desc: 'A light, rapid tap-tap-tap — often from lifters, injectors, or valvetrain.' },
                { href: '/tools/engine-sound-analyzer/knocking-noise', title: 'Knocking Noise', desc: 'A deeper, heavier knock — can be fuel-related or a more serious bearing issue.' },
                { href: '/tools/engine-sound-analyzer/rattling-noise', title: 'Rattling Noise', desc: 'A loose, metallic rattle — often a mount, heat shield, or timing component.' },
              ].map(({ href, title, desc }) => (
                <Link key={href} href={href} className="group flex flex-col gap-2 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all">
                  <p className="font-bold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mt-1">Diagnose this →</span>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4">Not sure which one matches? The recorder above handles any engine sound — you don&apos;t have to pick a category first.</p>
          </section>

          {/* Editorial content */}
          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What Is an Engine Sound Analyzer?
              </h2>
              <p className="mb-3">An experienced mechanic can often tell what&apos;s wrong with a car before they even open the bonnet, just from the engine sound. This tool does the same thing with AI: record or upload a clip of the noise your car is making, and it analyses the acoustic pattern against thousands of known fault signatures to tell you the likely cause.</p>
              <p>It works for any unusual <strong className="text-foreground">car engine sound</strong> — not just the three symptoms above. Whining, squealing, grinding, humming, clicking — if you can record it, the AI can attempt a diagnosis. Add a short text description and your vehicle&apos;s brand, model, and year for a more precise result.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Why Engine Noise Is Worth Taking Seriously
              </h2>
              <p className="mb-3">Engine noise rarely appears out of nowhere. A new tick, knock, or rattle is almost always a sign that something has changed — a component wearing down, a fluid running low, or a part working loose. Some engine sounds are harmless and just need monitoring; others mean you should stop driving immediately. The tricky part is telling the difference without specialist knowledge, which is exactly the gap this tool is built to close.</p>
              <p>Recording the sound and getting an early read on it costs you nothing and takes under a minute — often far cheaper than waiting until a minor issue becomes an expensive one.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Tips for Recording a Diagnosable Clip
              </h2>
              <ul className="space-y-2 list-none">
                {[
                  'Get as close to the noise source as safely possible — near the engine bay for engine sounds, near a wheel for suspension or brake sounds.',
                  'Cut the radio and close the windows so the sound isn\'t masked by wind or road noise.',
                  'Capture the sound at its clearest point — cold start for lifter/valvetrain ticks, acceleration for knocks, or over a bump for rattles.',
                  'Note when it happens (cold start only, only when turning, only under load) — the optional description field helps the AI narrow things down further.',
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2"><Ear className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" />{tip}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How This Differs From Guessing Based on a Forum Post
              </h2>
              <p className="mb-3">Searching a symptom online usually turns up a long, generic list of everything that could theoretically cause a noise — useful for background reading, not so useful for figuring out what&apos;s actually happening with your specific car. This tool takes the opposite approach: it listens to the actual sound your engine is making, plus any details you add about your vehicle, and narrows that long list down to a ranked, specific answer rather than leaving you to guess which of ten possible causes applies to you.</p>
              <p>That said, it&apos;s not a replacement for a hands-on inspection — think of it as the fast, free first step that tells you how urgent the issue is and what to check or ask about next, before you spend time or money acting on a guess.</p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Engine Sound Analyzer FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is an engine sound analyzer?', a: 'A tool that listens to a recording of your engine noise and identifies the likely cause using AI — the same way a mechanic diagnoses by ear before opening the bonnet.' },
                { q: 'What kind of car engine sound can this diagnose?', a: 'Ticking, knocking, rattling, squealing, grinding, whining, and most other unusual sounds. If you can record it, the AI can attempt a diagnosis.' },
                { q: 'How long does the recording need to be?', a: 'The free tier analyses the first 30 seconds of any clip — normally enough for a clear diagnosis.' },
                { q: 'Is the diagnosis always accurate?', a: 'No — it\'s a strong starting point, not a final answer. It can miss things a hands-on inspection would catch. Stop driving immediately for brake, steering, or fuel issues regardless of what it says.' },
                { q: 'Is this free to use?', a: 'Yes, free with no login. Longer recordings beyond 30 seconds are planned as a future paid option.' },
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

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'blue' },
                { href: '/tools/vin-checker', label: 'VIN Checker', color: 'violet' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
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
