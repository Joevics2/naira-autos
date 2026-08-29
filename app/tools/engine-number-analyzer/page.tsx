import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import EngineNumberAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Engine Number Analyzer — Free Engine Code Checker & Decoder | Naira Autos',
  description: 'Free engine number analyzer, worldwide. Enter any engine number or engine code and get the family, brand, displacement, and common applications instantly — no login, no payment. Works for Toyota, Honda, BMW, Nissan and more.',
  keywords: ['engine number checker', 'engine number analyzer', 'engine code lookup', 'what does my engine number mean', 'engine number decoder', 'vehicle engine number check', 'engine number verification', 'vehicle engine number check online', 'engine number check free', 'check engine number online', 'how to check engine number online', 'engine code meaning', 'what does engine number tell you', 'engine number lookup', 'decode engine number', 'engine family code', '2JZ engine number', 'K20A engine code', 'B58 engine number', 'engine number vs chassis number', 'can engine number and chassis number be different'],
  alternates: {
    canonical: 'https://www.naira.autos/tools/engine-number-analyzer',
    languages: {
      en: 'https://www.naira.autos/tools/engine-number-analyzer',
      es: 'https://www.naira.autos/tools/verificar-numero-de-motor',
      'x-default': 'https://www.naira.autos/tools/engine-number-analyzer',
    },
  },
  openGraph: {
    title: 'Free Engine Number Analyzer | Naira Autos',
    description: 'Enter any engine number or engine code and get the family, brand, displacement, and common applications — free, instant, worldwide.',
    url: 'https://www.naira.autos/tools/engine-number-analyzer',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/engine-number-analyzer',
      name: 'Engine Number Analyzer — Free Engine Code Checker & Decoder',
      description: 'Free engine number analyzer, worldwide. Enter any engine number or engine code and get the family, brand, displacement, and common applications instantly.',
      url: 'https://www.naira.autos/tools/engine-number-analyzer',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Engine Number Analyzer', item: 'https://www.naira.autos/tools/engine-number-analyzer' },
      ] },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is an engine number used for?', acceptedAnswer: { '@type': 'Answer', text: 'An engine number identifies the specific engine fitted to a vehicle — its family/design (via the stamped code) and, in the unique serial that follows, that individual unit. It is used to confirm an engine matches a vehicle\'s papers, to order the correct parts, and to check that an engine has not been swapped without being recorded.' } },
        { '@type': 'Question', name: 'Can engine number and chassis number be different?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, legitimately. The chassis number (VIN) identifies the whole vehicle as built at the factory, while the engine number identifies just the engine block. A genuine engine swap or replacement — common after major mechanical failure — will leave a vehicle with an engine number that does not match what its original registration paperwork recorded, even though everything is legal.' } },
        { '@type': 'Question', name: 'How do I check my engine number online for free?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the engine number or engine code stamped on your engine block into the box above. This tool matches it against a database of known engine family codes and shows the brand, displacement, configuration, and common vehicles that use that engine — free, with no account needed.' } },
        { '@type': 'Question', name: 'What does an engine number tell you?', acceptedAnswer: { '@type': 'Answer', text: 'The family code portion tells you the engine\'s manufacturer, design family, displacement, and configuration (e.g. inline-4 turbo, V6 naturally aspirated). It does not reveal mileage, service history, theft status, or whether the specific unit is genuine — that requires checking with the manufacturer or an official inspection.' } },
        { '@type': 'Question', name: 'Is this engine number checker an official verification service?', acceptedAnswer: { '@type': 'Answer', text: 'No. This is an educational, informational tool only. It matches the family-code portion of an engine number against a public reference database and does not confirm originality, theft status, or registration validity. For an official check, contact the manufacturer or the relevant vehicle registration authority.' } },
        { '@type': 'Question', name: 'Where is the engine number located on a car?', acceptedAnswer: { '@type': 'Answer', text: 'The engine number is stamped directly onto the engine block itself — usually near the front of the block, close to where it meets the transmission, or on a raised pad on the block\'s side. Exact location varies by manufacturer; a workshop manual or dealer for your specific make is the most reliable source if you can\'t find it.' } },
        { '@type': 'Question', name: 'Can this tool decode the full engine serial number?', acceptedAnswer: { '@type': 'Answer', text: 'No. Only the family code portion (e.g. 2JZ-GTE, K20A, B58) is publicly documented and matchable. The unique serial number that follows the family code identifies one specific physical engine and is not published anywhere — it can only be verified by the manufacturer directly.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Free Engine Number Analyzer', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function EngineNumberAnalyzerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/15 hover:border-sky-500/40 text-white/60 hover:text-sky-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Engine Number Analyzer</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-sky-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Family-Code Match</span>
              <Link href="/tools/verificar-numero-de-motor" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Leer en español →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Engine Number<br /><span className="text-sky-400">Analyzer</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What does my engine number mean?</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the engine number or engine code stamped on your engine block. Get the brand, engine family, displacement, configuration, and common vehicle applications instantly. No login, no payment, whether you&apos;re in Lagos, Nairobi, Accra, or Dubai.</p>
          </div>
        </div>
      </div>

      <EngineNumberAnalyzerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What Is an Engine Number Used For?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>An <strong className="text-foreground">engine number</strong> is stamped directly onto the engine block at the factory, and it does two jobs at once. The first part — the <strong className="text-foreground">family code</strong>, something like <span className="font-mono">2JZ-GTE</span>, <span className="font-mono">K20A</span>, or <span className="font-mono">B58</span> — identifies the engine&apos;s design, displacement, and configuration. The digits that follow are a unique serial specific to that one physical unit, similar in spirit to a chassis number but for the engine alone.</p>
                  <p>People run a <strong className="text-foreground">vehicle engine number check</strong> for a few practical reasons: confirming an engine matches what&apos;s written on a car&apos;s registration papers, ordering the correct replacement parts, and understanding what they&apos;re actually looking at when buying a used engine, an import, or a rebuild project. That&apos;s exactly what this <strong className="text-foreground">engine number checker</strong> is built for — a fast, free way to run an <strong className="text-foreground">engine number verification</strong> against a known reference database before you hand over any money.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How to Check Engine Number Online for Free</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Checking your engine number online used to mean digging through forum threads or paying for a report you probably didn&apos;t need. This tool works as a straightforward <strong className="text-foreground">engine number decoder</strong> for the family-code layer: type in what&apos;s stamped on the block, and you get an instant read on the brand, family, displacement, and configuration — no account, no card details, no waiting around.</p>
                  <p>If you&apos;ve been searching for <strong className="text-foreground">how to check engine number online</strong>, or looking for a way to <strong className="text-foreground">check engine number online</strong> without downloading an app, the process here is the same three steps every time: find the stamp, type it in, read the result. It works as an <strong className="text-foreground">engine number check free</strong> of charge, for any brand in the database, whether you&apos;re verifying a car you&apos;re about to buy in Lagos, an import clearing customs in Mombasa, or a rebuild project sitting in your own garage. A <strong className="text-foreground">vehicle engine number check online</strong> like this one is meant to be the first thing you do, not the last — a quick sanity check before you commit to a purchase, not a substitute for a proper pre-purchase inspection.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Engine Number vs Chassis Number — Can They Be Different?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Yes, and this trips people up constantly. The <strong className="text-foreground">chassis number (VIN)</strong> identifies the whole vehicle as it left the factory. The <strong className="text-foreground">engine number</strong> identifies only the engine block, stamped separately. A car that has had a genuine engine replacement — after a major failure, for example — can legitimately show an engine number that no longer matches what the original paperwork recorded, even though nothing improper happened.</p>
                  <p>That said, an engine number that looks tampered with, ground down, or re-stamped is a real red flag worth walking away from, especially on a used import. If an <strong className="text-foreground">engine number lookup</strong> comes back not matching the number on the title at all, that mismatch is exactly what a genuine, documented engine swap looks like — it isn&apos;t automatically fraud, but it&apos;s always worth asking for paperwork.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where to Find Your Engine Number</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>The engine number is stamped directly onto the engine block itself — commonly near where the block meets the transmission bell housing, or on a machined, raised pad on the side of the block. Exact location varies significantly by manufacturer and even by model generation, so a workshop manual, a dealer, or a quick <strong className="text-foreground">engine code lookup</strong> for your specific make and model is the most reliable way to find it if it isn&apos;t obvious at first glance.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What Does an Engine Number Tell You? Engine Code Meaning Explained</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>So <strong className="text-foreground">what does engine number tell you</strong>, exactly? The family-code portion is a direct read on <strong className="text-foreground">engine code meaning</strong>: brand, generation, displacement, and configuration, all packed into a handful of characters. A Nissan code like <span className="font-mono">RB26DETT</span> tells you 2.6 litres, inline-six, twin-turbo, in about three seconds — no manual required. A Toyota code like <span className="font-mono">2JZ-GTE</span> tells a similar story: 3.0 litres, inline-six, twin-turbo, and a reputation that precedes it.</p>
                  <p>What it can&apos;t tell you is anything about the individual unit — no odometer reading, no service history, no confirmation that the block hasn&apos;t been swapped, and nothing that counts as legal <strong className="text-foreground">engine number verification</strong> for insurance or customs purposes. Think of this analyzer as an <strong className="text-foreground">engine number decoder</strong> for the family-code layer only. Trying to <strong className="text-foreground">decode engine number</strong> data all the way down to the individual serial isn&apos;t something any public database — this one included — can do, because that information was never published anywhere outside the manufacturer&apos;s own records.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Popular Engine Codes People Search</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Three codes account for a disproportionate share of the searches this tool sees. A <strong className="text-foreground">2JZ engine number</strong> almost always means someone is checking a Toyota Supra, an Aristo, or a Lexus fitted with the legendary 3.0-litre twin-turbo six. A <strong className="text-foreground">K20A engine code</strong> points to Honda&apos;s high-revving i-VTEC four, found in the Integra Type R, the Civic Type R (EP3), and the Accord Euro R. And a <strong className="text-foreground">B58 engine number</strong> identifies BMW&apos;s modern modular turbo six, used across the 340i, 440i, 540i, and X3/X4/X5 M40i — and, notably, the current Toyota Supra (A90), where Toyota borrowed BMW&apos;s engine rather than reviving the 2JZ. Type any of the three into the box above and you&apos;ll get the full breakdown instantly.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How This Analyzer Works</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Type in the engine number or code you have — the full stamp or just the <strong className="text-foreground">engine family code</strong> portion both work. This <strong className="text-foreground">engine number analyzer</strong> checks it against a reference database of known engine family codes and returns the closest matches with a confidence level, along with brand, displacement, configuration, and the vehicles that commonly use that engine — a proper <strong className="text-foreground">engine code lookup</strong> without the wait.</p>
                  <p><strong className="text-foreground">Important:</strong> this is a family-code match only. The unique serial number after the family code is specific to one physical engine and is never published anywhere — no public tool, this one included, can decode it, confirm an engine&apos;s originality, check its theft status, or validate registration. Always verify those details with the manufacturer or your vehicle&apos;s official documents.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Engine Number Analyzer — FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'What is an engine number used for?', a: 'It identifies the engine fitted to a vehicle — its family and design via the stamped code, and the specific individual unit via the unique serial that follows. Used to confirm papers match, order the right parts, and spot undisclosed engine swaps.' },
                  { q: 'Can engine number and chassis number be different?', a: 'Yes, legitimately. The chassis number (VIN) identifies the whole vehicle; the engine number identifies only the engine block. A genuine engine replacement after a failure can leave the two not matching, without anything improper having happened.' },
                  { q: 'How do I check my engine number online for free?', a: 'Enter the number or code stamped on your engine block above. This tool matches it against known engine family codes and shows brand, displacement, configuration, and common applications — free, no account needed.' },
                  { q: 'What does an engine number tell you?', a: 'The family-code portion tells you the manufacturer, engine family, displacement, and configuration. It does not reveal mileage, service history, theft status, or registration validity.' },
                  { q: 'Is this an official verification service?', a: 'No — it\'s an educational, informational tool that matches the family-code portion against a public reference database. It doesn\'t confirm originality, theft status, or registration validity. For an official check, contact the manufacturer or your local vehicle registration authority.' },
                  { q: 'Where is the engine number located on a car?', a: 'Stamped directly onto the engine block — usually near the transmission bell housing or on a raised, machined pad on the block\'s side. Exact spot varies by manufacturer; check a workshop manual for your specific model if it isn\'t obvious.' },
                  { q: 'Can this tool decode the full engine serial number?', a: 'No. Only the family-code portion (e.g. 2JZ-GTE, K20A, B58) is publicly documented. The unique serial that follows identifies one specific engine and is never published — only the manufacturer can verify it.' },
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
          </div>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/chassis-number-check', label: 'Chassis Number Check', color: 'blue' },
                { href: '/tools/vin-checker-global', label: 'VIN Checker (Global)', color: 'emerald' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
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
