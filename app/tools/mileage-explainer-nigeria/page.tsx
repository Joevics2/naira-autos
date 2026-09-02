import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import MileageExplainerClient from '@/components/MileageExplainerClient';
import { CountryScrollStrip } from '@/components/CountryScrollStrip';
import { citiesForCountry } from '@/lib/mileage-cities';
import { MILEAGE_BENCHMARKS } from '@/lib/mileage-benchmarks';

export const metadata: Metadata = {
  title: 'Nigeria Car Mileage Explainer — Is That Km Reading Normal? | Naira Autos',
  description: 'Free mileage calculator for Nigerian car buyers. See any odometer (km) reading as real distance between Nigerian cities, and check it against typical Tokunbo and Nigerian-used mileage patterns.',
  alternates: { canonical: 'https://www.naira.autos/tools/mileage-explainer-nigeria' },
  openGraph: {
    title: 'Nigeria Car Mileage Explainer | Naira Autos',
    description: 'What does that odometer reading actually mean for a car in Nigeria? Free tool comparing mileage to real Nigerian city-to-city distances.',
    url: 'https://www.naira.autos/tools/mileage-explainer-nigeria',
  },
  keywords: [
    'average mileage per year nigeria',
    'is high mileage bad tokunbo car',
    'how many km is high mileage nigeria',
    'tokunbo car mileage explained',
    'nigerian used car average km',
    'is 150000 km a lot nigeria',
    'car mileage calculator nigeria',
    'odometer rollback nigeria how to check',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/mileage-explainer-nigeria',
      name: 'Nigeria Car Mileage Explainer',
      description: 'Free mileage calculator for Nigerian car buyers — see any odometer reading as real distance between Nigerian cities, checked against typical local usage.',
      url: 'https://www.naira.autos/tools/mileage-explainer-nigeria',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Mileage Explainer', item: 'https://www.naira.autos/tools/mileage-explainer' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/mileage-explainer-nigeria' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the average mileage per year for a car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Industry estimates from Nigerian car-tracking and marketplace data put typical annual mileage around 15,000–20,000 km a year, somewhat higher than the global average — largely driven by Lagos traffic patterns and the amount of stop-start city driving. A 5-year-old car showing 75,000–100,000 km is broadly in line with this.' } },
        { '@type': 'Question', name: 'Is 150,000 km a lot for a used car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'On its own, not necessarily — for a car around 8–10 years old, 150,000 km is close to the typical range. It becomes more of a concern if the car is much younger than that, or if the mileage doesn\'t match visible wear on the seats, pedals, and steering wheel.' } },
        { '@type': 'Question', name: 'Is Tokunbo car mileage more reliable than Nigerian-used mileage?', acceptedAnswer: { '@type': 'Answer', text: 'Tokunbo (foreign-used, imported) cars were often driven mostly on smoother roads abroad, so a given mileage figure may represent less mechanical wear than the same reading on a Nigerian-used car driven on rougher local roads. Neither is automatically more accurate — both should be checked against service history.' } },
        { '@type': 'Question', name: 'How do I check for odometer rollback on a used car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Compare the current reading against any available service stickers, past inspection records, or VIN history. A mileage reading that looks unusually low for the car\'s age and condition — especially alongside worn pedals, seats, or steering wheel — is a common rollback sign.' } },
      ],
    },
  ],
};

const NIGERIA_CITIES = citiesForCountry('ng');

const COUNTRY_LINKS = [
  { code: 'ng', flag: '🇳🇬', name: 'Nigeria', href: '/tools/mileage-explainer-nigeria' },
];

const AVG_ANNUAL_MILEAGE_KM = MILEAGE_BENCHMARKS.ng.avgAnnualMileageKm;
const AVG_NOTE = MILEAGE_BENCHMARKS.ng.note;

export default function MileageExplainerNigeriaPage() {
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
              <Link href="/tools/mileage-explainer" className="hover:text-white/60 transition-colors">Mileage Explainer</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇬 Nigeria</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: August 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Nigeria Car<br /><span className="text-emerald-400">Mileage Explainer</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Is that km reading normal — or a red flag?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the odometer reading and see it as real distance between Nigerian cities, then check it against typical Tokunbo and Nigerian-used mileage patterns.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-border bg-muted/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2.5">More countries</p>
          <CountryScrollStrip items={COUNTRY_LINKS} activeCode="ng" />
        </div>
      </div>

      <MileageExplainerClient
        countryName="Nigeria"
        defaultUnit="km"
        cities={NIGERIA_CITIES}
        defaultFromName="Lagos"
        defaultToName="Abuja"
        avgAnnualMileageKm={AVG_ANNUAL_MILEAGE_KM}
        avgAnnualMileageNote={AVG_NOTE}
        vehicleCheckHref="/tools/vin-checker"
        enableCountrySelect
        benchmarks={MILEAGE_BENCHMARKS}
        lockedCountryCode="ng"
      />

      {/* ── SEO content ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Counts as High Mileage in Nigeria?
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Nigerian car buyers see mileage figures constantly in listings — &ldquo;Tokunbo, 85,000 km&rdquo; or &ldquo;Nigerian-used, 210,000 km&rdquo; — but the number rarely comes with useful context. Industry estimates from car-tracking and marketplace data put typical usage in Nigeria at around <strong className="text-foreground">15,000–20,000 km a year</strong>, somewhat above the global average, driven largely by Lagos&apos;s heavy stop-start traffic and long commute distances. On that basis, a 5-year-old car showing 75,000–100,000 km is broadly typical, and a 10-year-old car around 150,000–200,000 km isn&apos;t unusual either.
              </p>
              <p>
                What matters more than the raw figure is <strong className="text-foreground">whether the mileage fits the car&apos;s age and where it was driven</strong>. A Tokunbo (foreign-used) vehicle imported with 120,000 km may have spent most of that distance on smoother roads abroad, while a Nigerian-used car showing the same figure has likely absorbed far more wear from local road conditions, overloading, and stop-start Lagos or Port Harcourt traffic. Neither number is automatically &ldquo;better&rdquo; — both deserve a look at service history rather than a snap judgment based on the odometer alone.
              </p>
              <p>
                This tool takes the km reading you enter and puts it in two kinds of context: a real distance comparison between Nigerian cities (so &ldquo;180,000 km&rdquo; stops being an abstract number and becomes &ldquo;Lagos to Kano and back over 100 times&rdquo;), and a check against the typical 15,000–20,000 km/year range for the vehicle&apos;s stated age, flagging readings that look unusually low or unusually high for that age.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Tokunbo vs Nigerian-Used Mileage
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Tokunbo (imported foreign-used) vehicles typically arrive in Nigeria having covered most of their mileage abroad, often on better-maintained roads and with more consistent servicing records. A Nigerian-used car with an identical odometer reading has usually experienced harsher conditions — potholes, overloading, and fuel that varies more in quality — which can mean more wear per kilometer.</p>
                <p>Because of this, many buyers weigh Tokunbo mileage a little more favorably than the same figure on a Nigerian-used car. Still, service history and a physical inspection matter more than the country of origin alone — a poorly maintained Tokunbo can be in worse shape than a well cared-for Nigerian-used vehicle with higher mileage.</p>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Spotting Odometer Rollback
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Odometer fraud — winding a car&apos;s mileage back before resale — does happen in the Nigerian used car market, and a reading that&apos;s implausibly low for the car&apos;s visible age and condition is the most common warning sign. Worn pedal rubber, a shiny or sagging driver&apos;s seat, and steering wheel wear that doesn&apos;t match a &ldquo;low&rdquo; mileage claim are all worth checking in person.</p>
                <p>Where possible, cross-check the current reading against any available service stickers or past inspection records, and run a <Link href="/tools/vin-checker" className="text-foreground underline underline-offset-2">VIN check</Link> to see if a prior recorded mileage is on file. A gap between what the odometer shows now and what was recorded earlier is a clear red flag.</p>
              </div>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mileage and Resale Value in Nigeria
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                Mileage is one of the biggest factors buyers use to negotiate price in the Nigerian used car market, alongside year, trim, and condition — often more heavily than in markets where full digital service history is standard. Because paperwork trails can be inconsistent, a car with clearly documented, believable mileage tends to command a premium over one with an unverifiable or suspicious reading, even if the actual mechanical condition is similar.
              </p>
              <p>
                Sellers in cities like Lagos, Abuja, and Port Harcourt often list mileage prominently precisely because buyers have learned to scrutinize it — so a reading that&apos;s clearly explainable (consistent with the car&apos;s age, supported by service records, matching the visible wear) is a genuine selling point, not just a number to gloss over. If you&apos;re selling, being upfront about how the mileage was accumulated — for instance, mostly highway trips between Lagos and Ibadan versus daily inner-city traffic — can meaningfully speed up a sale.
              </p>
            </div>
          </div>

          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Example: Reading a Listing's Mileage in Context
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Uche was looking at a 7-year-old Nigerian-used Toyota Camry listed with 168,000 km. Run through this tool, that came out to roughly Lagos to Abuja and back over 100 times — a lot in the abstract, but 168,000 ÷ 7 ≈ 24,000 km a year, only somewhat above the 15,000–20,000 km/year typical range. Combined with visible pedal and seat wear that matched the reading, the mileage told him the car had simply been driven hard and consistently — not that anything was suspicious. He used that context to negotiate on condition rather than walking away over the number alone.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Mileage benchmarks checked against real Nigerian used-car market patterns.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Nigeria Mileage — FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'What is the average mileage per year for a car in Nigeria?', a: 'Industry estimates put it around 15,000–20,000 km/year, somewhat above the global average due to heavy city traffic and long commutes, especially in Lagos.' },
                { q: 'Is 150,000 km a lot for a used car in Nigeria?', a: 'Not on its own — for a car around 8–10 years old, that\'s close to typical. It\'s more of a concern if the car is much younger, or if wear doesn\'t match the stated mileage.' },
                { q: 'Is Tokunbo mileage more reliable than Nigerian-used?', a: 'Tokunbo cars often covered more of their mileage on smoother roads abroad, so the same reading may mean less wear — but service history and inspection matter more than origin alone.' },
                { q: 'How do I check for odometer rollback?', a: 'Compare the reading against service stickers, inspection records, or a VIN history check, and look for wear on pedals, seats, and the steering wheel that doesn\'t match a "low" mileage claim.' },
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
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tools/vin-checker" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">VIN Checker</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/vehicle-papers-checklist" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Vehicle Papers Checklist</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/tools/mileage-explainer" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Global Mileage Explainer</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
