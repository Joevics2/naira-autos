// app/tools/distance-calculator-qatar/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorQatarClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { QA_TOWNS, findTown } from '@/lib/distance-towns-qa';
import { QA_CAPITAL_DISTANCE_KM } from '@/lib/qa-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Qatar 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 10 Qatari towns — Doha, Al Khor, Al Wakrah, Al Ruwais and more. Verified road lengths, drive time, and fuel cost.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-qatar',
    languages: { ar: 'https://www.naira.autos/tools/distance-calculator-qatar-arabic' },
  },
  openGraph: {
    title: 'Distance Calculator Qatar 2026 | Naira Autos',
    description: 'Road distance and drive time between 10 Qatari towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-qatar',
  },
  keywords: [
    'distance calculator qatar', 'doha to al khor distance', 'doha to al wakrah distance',
    'qatar road distance calculator', 'fuel cost doha', 'doha to ruwais distance',
  ],
};

const doha = findTown('Doha')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-qatar',
      name: 'Distance Calculator Qatar 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 10 Qatari towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-qatar',
      dateModified: '2026-09-06',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Qatar', item: 'https://www.naira.autos/tools/distance-calculator-qatar' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Doha from Al Khor?', acceptedAnswer: { '@type': 'Answer', text: 'About 33km via the Al Khor Coastal Road, an official Ashghal (Qatar Public Works Authority) road project — around 20 minutes\' drive.' } },
        { '@type': 'Question', name: 'Is there an official Qatari government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No public town-to-town matrix, but Ashghal documents the length of major road projects like the Al Khor Coastal Road, used here directly.' } },
        { '@type': 'Question', name: 'Why does Qatar have so few towns in this tool?', acceptedAnswer: { '@type': 'Answer', text: 'Qatar is small — under 200km end to end — so a short list of 10 towns already covers essentially everywhere people drive between.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (QAR/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorQatarPage() {
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
              <span className="text-white/60">🇶🇦 Qatar</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 10 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 10 Qatari towns — Doha, Al Khor, Al Wakrah, Al Ruwais, and more.
            </p>
            <Link href="/tools/distance-calculator-qatar-arabic" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              العربية (Arabic version) →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorQatarClient />
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
              <p>Qatar doesn&rsquo;t publish a public town-to-town distance chart, but Ashghal — the Public Works Authority responsible for the country&rsquo;s roads — documents the length of its major road projects as it announces them. The clearest example: when Ashghal opened the Al Khor Coastal Road&rsquo;s main carriageway in 2019, a year ahead of schedule, it documented the road at 33km end to end, connecting Doha to Al Khor in around 20 minutes. This tool uses that figure directly as its first verified route. A second verified figure, Doha to Al Ruwais at roughly 127km, comes from a Wikipedia-sourced description of Ar-Ruwais&rsquo;s location relative to the capital.</p>
              <p>That gives just 2 verified pairs — the thinnest verified set of any country in this tool so far — but Qatar&rsquo;s small size makes that far less of a problem than it would be in a larger country. The entire country stretches under 200km end to end, and its road network is compact and mostly free-flowing multi-lane highways (Al Majd Road, the G-Ring Road, Salwa Road, and similar Ashghal-built expressways). At that scale, the Haversine-based GPS estimate this tool falls back on for every other route tends to sit fairly close to the real driving distance, since there&rsquo;s little room for a road to wind dramatically off the direct line between two points.</p>
              <p>The 10-town list itself covers Doha and the towns people actually drive to from it: Al Rayyan and Lusail in the immediate metro area, Al Wakrah and Mesaieed to the south (both major industrial and port towns), Al Khor and Al Ruwais to the north, and Dukhan and Al Shahaniya out toward the west coast&rsquo;s oil and gas facilities. Given Qatar&rsquo;s compact geography, this short list already covers essentially every meaningful inter-town drive in the country.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Qatari Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Qatar&rsquo;s road network is modern and generally free-flowing, built out heavily ahead of the 2022 FIFA World Cup. The main friction points are urban rather than rural: Doha&rsquo;s own traffic, particularly around the F-Ring and E-Ring roads and the Corniche during rush hour, can add real time to a trip whose open-road portion is short. Ongoing construction on newer expressway sections occasionally imposes temporary speed limits and lane closures. Outside Doha, the roads to Al Khor, Al Wakrah, and the western industrial towns are generally fast and well-maintained. As with any calculator, treat the figures here as a planning baseline and check current traffic conditions before travelling.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from Ashghal&rsquo;s official Al Khor Coastal Road documentation and a Wikipedia-sourced figure for Al Ruwais. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Doha to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 9 other towns in this tool, closest to farthest from Doha.</p>
            <DistanceTable hub={doha} towns={QA_TOWNS} verifiedMatrix={QA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Qatar
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Doha from Al Khor?', a: 'About 33km via the Al Khor Coastal Road, an official Ashghal road project — around 20 minutes\' drive.' },
                { q: 'Is there an official Qatari distance chart?', a: 'No public matrix, but Ashghal documents road-project lengths as it builds them, used here directly for Doha-Al Khor.' },
                { q: 'Why does Qatar have so few towns listed?', a: 'Qatar is under 200km end to end, so 10 towns already covers essentially every meaningful inter-town drive.' },
                { q: 'How accurate are the "estimated" routes here?', a: 'Reasonably close — Qatar\'s small size and mostly direct road network mean GPS-based estimates track real driving distance more closely than in a larger country.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (QAR/litre) above; it converts road distance directly into estimated litres and cost.' },
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
