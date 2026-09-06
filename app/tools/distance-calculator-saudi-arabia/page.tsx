// app/tools/distance-calculator-saudi-arabia/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSaudiArabiaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { SA_TOWNS, findTown } from '@/lib/distance-towns-sa';
import { SA_CAPITAL_DISTANCE_KM } from '@/lib/sa-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Saudi Arabia 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 35 Saudi cities — Riyadh, Jeddah, Makkah, Madinah, Dammam and more. Official highway lengths, drive time, and fuel cost.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia',
    languages: { ar: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia-arabic' },
  },
  openGraph: {
    title: 'Distance Calculator Saudi Arabia 2026 | Naira Autos',
    description: 'Road distance and drive time between 35 Saudi cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia',
  },
  keywords: [
    'distance calculator saudi arabia', 'riyadh to jeddah distance', 'makkah to madinah distance',
    'riyadh to dammam distance', 'saudi arabia road distance calculator', 'jeddah to madinah distance',
    'fuel cost riyadh to jeddah', 'saudi highway distance chart', 'makkah to jeddah distance',
  ],
};

const riyadh = findTown('Riyadh')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-saudi-arabia',
      name: 'Distance Calculator Saudi Arabia 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 35 Saudi cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia',
      dateModified: '2026-09-06',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Saudi Arabia', item: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Riyadh from Jeddah?', acceptedAnswer: { '@type': 'Answer', text: 'This route is currently an estimated GPS-based figure rather than a single official highway length, since it runs via multiple connecting roads. Riyadh to Makkah alone (via Ta\'if) is an official, verified 820km.' } },
        { '@type': 'Question', name: 'How far is Makkah from Madinah?', acceptedAnswer: { '@type': 'Answer', text: 'About 421km, an official highway length from Saudi Arabia\'s Ministry of Transport and Logistic Services — one of the Kingdom\'s 8 named major highways.' } },
        { '@type': 'Question', name: 'How far is Riyadh from Dammam?', acceptedAnswer: { '@type': 'Answer', text: 'About 383km, an official highway length, typically a 4-5 hour drive on a well-maintained multi-lane highway.' } },
        { '@type': 'Question', name: 'Is there an official Saudi government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'The Ministry of Transport and Logistic Services doesn\'t publish a full town-to-town matrix, but it does document the official length of the Kingdom\'s 8 major named highways, which this tool uses directly for 8 verified routes.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (SAR/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorSaudiArabiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Back to Distance Calculator"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/distance-calculator-countries" className="hover:text-white/60 transition-colors">Distance Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇸🇦 Saudi Arabia</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 35 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 35 Saudi cities — Riyadh, Jeddah, Makkah, Madinah, Dammam, and major provincial centres.
            </p>
            <Link href="/tools/distance-calculator-saudi-arabia-arabic" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              العربية (Arabic version) →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSaudiArabiaClient />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Where These Numbers Come From
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Saudi Arabia&rsquo;s Ministry of Transport and Logistic Services doesn&rsquo;t publish a public town-to-town distance matrix, but it does maintain and document the official lengths of the Kingdom&rsquo;s 8 major named controlled-access highways — a fact documented by Saudipedia, an encyclopedic reference citing the Ministry directly. This tool uses those 8 official lengths as its verified core: the Riyadh–Taif–Makkah Highway (820km), the Qassim–Madinah Highway (448km, connecting Buraydah), the Makkah–Madinah Highway (421km), the Jeddah–Madinah Highway (410km), the Riyadh–Dammam Highway (383km), the Riyadh–Qassim Highway (317km), and the short Makkah–Jeddah and Makkah–Taif highways (70km each).</p>
              <p>Together these cover the Kingdom&rsquo;s two most important corridors: the Hejaz cluster around Makkah, Madinah, Jeddah, and Taif — which carries enormous Hajj and Umrah pilgrimage traffic every year — and the central-to-eastern corridor linking Riyadh to Qassim and on to Dammam on the Gulf coast. Every route between two of these 9 hub cities that runs along one of the 8 named highways is marked <span className="font-semibold text-emerald-700">&ldquo;Verified route&rdquo;</span>, both in the calculator above and the table below.</p>
              <p>Routes that don&rsquo;t run along a single named highway end to end — including Riyadh to Jeddah itself, since no single official highway spans that exact pair directly — fall back to this tool&rsquo;s GPS-based estimate, using the same Haversine correction factor calibrated against Nigeria&rsquo;s full verified road matrix. The remaining 26 towns in this tool&rsquo;s 35-city list — provincial centres like Abha, Tabuk, Ha&rsquo;il, Najran, and Al-Ahsa (Al Hufuf), plus Eastern Province towns like Khobar, Dhahran, and Al Jubayl — are estimated the same way for any route touching them.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Saudi Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Saudi Arabia&rsquo;s major highways are generally wide, well-maintained, multi-lane roads, but a few things routinely add hours beyond the raw distance. During Hajj and Umrah season, roads around Makkah and Madinah — especially the Makkah–Jeddah and Makkah–Madinah highways — see extremely heavy traffic and can take several times longer than usual. Long desert stretches on routes like Riyadh–Dammam and Riyadh–Buraydah carry a real risk of sandstorms reducing visibility, plus occasional camel crossings at night. Rest stops and fuel stations are generally frequent along the named highways, but less so on secondary roads to smaller provincial towns. As with any calculator, treat the figures here as a planning baseline and check current road and weather conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from Saudi Arabia&rsquo;s Ministry of Transport and Logistic Services, via Saudipedia. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Riyadh to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 34 other cities in this tool, closest to farthest from Riyadh.</p>
            <DistanceTable hub={riyadh} towns={SA_TOWNS} verifiedMatrix={SA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Saudi Arabia
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Riyadh from Jeddah?', a: 'This route is an estimated GPS-based figure rather than a single official highway length. Riyadh to Makkah alone (via Ta\'if) is a verified, official 820km.' },
                { q: 'How far is Makkah from Madinah?', a: 'About 421km, an official Ministry of Transport highway length.' },
                { q: 'How far is Riyadh from Dammam?', a: 'About 383km, an official highway length, typically a 4-5 hour drive.' },
                { q: 'Is there an official Saudi distance chart?', a: 'No full town-to-town matrix, but the Ministry documents the length of the Kingdom\'s 8 major named highways, used here directly.' },
                { q: 'How far is Makkah from Jeddah?', a: 'About 70km, one of the shortest and most heavily-travelled official highways in the country, especially during Hajj and Umrah.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (SAR/litre) above; it converts road distance directly into estimated litres and cost.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          <RelatedTools tool="distance-calculator" />

        </div>
      </div>
    </>
  );
}
