import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Globe2 } from 'lucide-react';
import MileageExplainerClient from '@/components/MileageExplainerClient';
import { CountryScrollStrip } from '@/components/CountryScrollStrip';
import { CITIES } from '@/lib/mileage-cities';

export const metadata: Metadata = {
  title: 'Mileage Explainer — What Does Your Odometer Reading Actually Mean?',
  description: 'Free mileage calculator that puts any odometer reading in real-world context — distance between cities, laps around the Earth, trips to the Moon. See if a car\'s mileage looks normal for its age.',
  alternates: { canonical: 'https://www.naira.autos/tools/mileage-explainer' },
  openGraph: {
    title: 'Mileage Explainer | Naira Autos',
    description: 'What does 100,000 miles actually look like? A free tool that turns any odometer reading into real-world distance comparisons.',
    url: 'https://www.naira.autos/tools/mileage-explainer',
  },
  keywords: [
    'is 100000 miles a lot for a car',
    'average mileage per year',
    'how many miles is too many for a used car',
    'mileage calculator',
    'what does high mileage mean',
    'car mileage comparison tool',
    'odometer reading explained',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/mileage-explainer',
      name: 'Mileage Explainer — What Does Your Odometer Reading Actually Mean?',
      description: 'Free mileage calculator that puts any odometer reading in real-world context — distance between cities, laps around the Earth, trips to the Moon.',
      url: 'https://www.naira.autos/tools/mileage-explainer',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is 100,000 miles a lot for a car?', acceptedAnswer: { '@type': 'Answer', text: 'Not necessarily. Most drivers cover roughly 10,000–15,000 miles (16,000–24,000 km) a year, so 100,000 miles is typical for a car around 7–10 years old. What matters more than the raw number is whether the mileage matches the car\'s age and maintenance history.' } },
        { '@type': 'Question', name: 'What counts as high mileage on a used car?', acceptedAnswer: { '@type': 'Answer', text: 'There\'s no fixed cutoff — a well-maintained car with 150,000 miles can outlast a neglected one with 60,000. As a rough guide, mileage well above the national average for the car\'s age is worth extra inspection, not automatic rejection.' } },
        { '@type': 'Question', name: 'How do I know if a car\'s mileage is genuine?', acceptedAnswer: { '@type': 'Answer', text: 'Compare the odometer reading against the car\'s service history, MOT/inspection records, and a VIN or chassis number check, which often logs recorded mileage at past inspections. A reading that\'s implausibly low for the car\'s age is a common sign of odometer rollback.' } },
      ],
    },
  ],
};

// Global mode: full city list (Nigeria + international landmarks), no single national benchmark
const GLOBAL_CITIES = CITIES;

const COUNTRY_LINKS = [
  { code: 'ng', flag: '🇳🇬', name: 'Nigeria', href: '/tools/mileage-explainer-nigeria' },
];

export default function MileageExplainerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Mileage Explainer</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Globe2 className="h-3 w-3" />
              Free Tool · Global
            </span>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              What Does That<br /><span className="text-emerald-400">Mileage Actually Mean?</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">100,000 miles doesn&apos;t mean much as a number. As a distance, it does.</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter any odometer reading and see it turned into something you can actually picture — trips between real cities, laps around the Earth, even flights to the Moon.
            </p>
          </div>
        </div>
      </div>

      {/* Country scroll strip */}
      <div className="border-b border-border bg-muted/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2.5">Want it tailored to your country?</p>
          <CountryScrollStrip items={COUNTRY_LINKS} />
        </div>
      </div>

      {/* ── Interactive calculator (client) ── */}
      <MileageExplainerClient
        defaultUnit="km"
        cities={GLOBAL_CITIES}
        defaultFromName="New York"
        defaultToName="Los Angeles"
      />

      {/* ── SEO content ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Why Mileage Numbers Are Hard to Judge
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                A car listing says "100,000 miles" or "160,000 km" and most buyers have the same reaction: a vague sense that it&apos;s either fine or a problem, without much to actually anchor that feeling to. The number alone doesn&apos;t tell you much — a car driven 100,000 miles over 15 years of gentle weekend use has lived a very different life than one that hit the same number in 4 years of daily highway commuting.
              </p>
              <p>
                What actually matters is <strong className="text-foreground">mileage relative to age</strong>. Most drivers worldwide cover somewhere between 10,000 and 20,000 km (roughly 6,000–12,500 miles) a year, though this varies a lot by country — commute culture, public transport availability, road quality, and fuel prices all push that number up or down. A car with mileage well below what&apos;s typical for its age isn&apos;t automatically great news either — it can mean genuinely light use, but it&apos;s also one of the classic signs of odometer rollback, where a seller winds back the reading to make a high-mileage car look better than it is.
              </p>
              <p>
                This tool doesn&apos;t replace that judgment — it gives you a reference point. Enter the odometer reading, optionally the car&apos;s age, and see both a real-world distance comparison and, on the country-specific versions of this tool, a check against local typical-use averages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What "High Mileage" Actually Means
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>There&apos;s no universal cutoff where a car crosses from "fine" to "high mileage" — it depends on the vehicle, how it was driven, and how well it was maintained. A diesel engine built for long highway runs can comfortably exceed 300,000 km with regular servicing, while a car driven mostly in short stop-start city trips can show wear well before six figures.</p>
                <p>As a rough starting point, most buyers treat mileage as a flag worth a closer look — not a dealbreaker — once it&apos;s meaningfully above the typical annual average multiplied by the car&apos;s age. A full service history that lines up with the mileage is a far stronger signal than the number by itself.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Checking If a Mileage Reading Is Genuine
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Odometer fraud — winding back a car&apos;s mileage before sale — remains common enough worldwide that it&apos;s worth actively checking for, not just trusting the dashboard number. A few practical checks: compare the current reading against any recorded mileage from past service stamps, inspection certificates, or VIN/chassis history reports; look at wear on the steering wheel, pedals, and driver&apos;s seat, which should roughly match the claimed distance; and be extra cautious of a mileage reading that seems implausibly low for the car&apos;s age with no clear explanation.</p>
                <p>If something doesn&apos;t line up, a <Link href="/tools/vin-checker-global" className="text-foreground underline underline-offset-2">VIN check</Link> is usually the fastest way to see whether the current reading matches what was recorded previously.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              How Average Annual Mileage Varies by Country
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                "Normal" mileage isn&apos;t the same everywhere. Drivers in large, spread-out countries with long commutes and limited public transport — much of the United States, for example — tend to rack up more distance per year than drivers in dense cities with shorter trips and heavier traffic. Road quality matters too: the same number of kilometers can represent very different amounts of mechanical wear depending on whether it was mostly smooth highway driving or constant stop-start traffic over rough roads.
              </p>
              <p>
                This is exactly why a single global "high mileage" threshold doesn&apos;t really work, and why the country-specific versions of this tool anchor to local typical-use figures instead of one worldwide number. If your country isn&apos;t listed yet in the strip above, the global calculator here still works fine for the distance comparisons — you&apos;ll just want to research your own market&apos;s typical annual mileage separately when judging whether a number looks high or low.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mileage Explainer — FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Is 100,000 miles a lot for a car?', a: 'Not necessarily. Most drivers cover roughly 10,000–15,000 miles (16,000–24,000 km) a year, so 100,000 miles is typical for a car around 7–10 years old. What matters more is whether the mileage matches the car\'s age and service history.' },
                { q: 'What counts as high mileage?', a: 'There\'s no fixed cutoff — a well-maintained car with 150,000 miles can outlast a neglected one with 60,000. Mileage well above the typical average for the car\'s age is worth a closer look, not an automatic rejection.' },
                { q: 'How do I check if mileage is genuine?', a: 'Compare the odometer against service records, inspection history, and a VIN or chassis number check. A reading that looks implausibly low for the car\'s age is a common rollback pattern.' },
                { q: 'Why is the distance in this tool different from Google Maps?', a: 'This tool uses straight-line ("as the crow flies") distance for simplicity and speed. Real driving-route distance is typically 10–25% longer than the straight-line figure.' },
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

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Due Diligence Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">VIN Checker (Global)</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/vehicle-papers-checklist" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Vehicle Papers Checklist</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/tools/mileage-explainer-nigeria" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">🇳🇬 Nigeria Mileage Explainer</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
