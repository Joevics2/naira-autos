// app/tools/distance-calculator-germany/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorGermanyClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { DE_TOWNS, findTown } from '@/lib/distance-towns-de';
import { DE_CAPITAL_DISTANCE_KM } from '@/lib/de-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Germany 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 40 German cities — Berlin, Munich, Hamburg, Frankfurt, Cologne and more. Cross-checked Autobahn distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-germany' },
  openGraph: {
    title: 'Distance Calculator Germany 2026 | Naira Autos',
    description: 'Road distance and drive time between 40 German cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-germany',
  },
  keywords: [
    'distance calculator germany', 'berlin to munich distance', 'hamburg to frankfurt distance',
    'germany road distance calculator', 'fuel cost berlin to munich', 'berlin to cologne distance',
    'autobahn distance calculator', 'munich to hamburg distance',
  ],
};

const berlin = findTown('Berlin')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-germany',
      name: 'Distance Calculator Germany 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 40 German cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-germany',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Germany', item: 'https://www.naira.autos/tools/distance-calculator-germany' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Berlin from Munich?', acceptedAnswer: { '@type': 'Answer', text: 'About 585km via the A9, cross-checked against a detailed driving guide — typically a 5.5-6.5 hour drive.' } },
        { '@type': 'Question', name: 'Is there an official German government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single Bundesministerium body publishes a public town-to-town matrix. This tool\'s verified routes are cross-checked driving-guide figures for named Autobahn routes instead.' } },
        { '@type': 'Question', name: 'How far is Hamburg from Frankfurt?', acceptedAnswer: { '@type': 'Answer', text: 'About 490km via the A7/A5, typically a 4.5-5.5 hour drive.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (€/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorGermanyPage() {
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
              <span className="text-white/60">🇩🇪 Germany</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 40 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 40 German cities — Berlin, Munich, Hamburg, Frankfurt, Cologne, and major regional centres.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorGermanyClient />
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
              <p>No single German federal body publishes a public town-to-town road distance chart. The Autobahn network itself is meticulously documented — Wikipedia catalogues the exact official length of every numbered Bundesautobahn — but those lengths describe entire highways end to end, not necessarily the specific city-pair distance a driver would look up (Germany&rsquo;s longest Autobahns often run between minor towns at each end, not major cities).</p>
              <p>So this tool&rsquo;s 6 verified routes come from a detailed 2026 driving guide that quotes named-route distances directly: Berlin to Munich (585km via the A9), Hamburg to Frankfurt (490km via the A7/A5), Berlin to Cologne (570km via the A2), Munich to Hamburg (780km via the A7 or A9/A1), and Frankfurt to Dresden (430km via the A4) — plus Munich to Cologne (455km via the A9/A3) from an independent car-rental source. Every other route among this tool&rsquo;s 40 cities falls back to the Haversine-based GPS estimate, using the same correction factor calibrated against Nigeria&rsquo;s full verified road matrix.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on German Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The Autobahn&rsquo;s famous high-speed sections are frequently offset by equally famous traffic jams (Staus) — Germany records tens of thousands of kilometres of daily congestion, with hotspots including the A3 between Frankfurt and Cologne, the A1 near Hamburg, the A8 near Munich, and the A9 approaching Berlin. Roadworks (Baustellen) are a constant feature of long-distance driving, with mandatory 80km/h zones enforced by speed cameras regardless of the normal limit. Public holidays, summer weekends, and the weeks around school breaks are particularly prone to severe delays — the ADAC Staumelder and real-time navigation apps provide live updates. As with any calculator, treat the figures here as a planning baseline and check current conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes cross-checked across independent driving-guide sources. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Berlin to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 39 other cities in this tool, closest to farthest from Berlin.</p>
            <DistanceTable hub={berlin} towns={DE_TOWNS} verifiedMatrix={DE_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Germany
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Berlin from Munich?', a: 'About 585km via the A9, cross-checked against a detailed driving guide — typically a 5.5-6.5 hour drive.' },
                { q: 'Is there an official German distance chart?', a: 'No single federal body publishes one. This tool\'s verified routes are cross-checked driving-guide figures for named Autobahn routes.' },
                { q: 'How far is Hamburg from Frankfurt?', a: 'About 490km via the A7/A5, typically a 4.5-5.5 hour drive.' },
                { q: 'How far is Munich from Cologne?', a: 'About 455km via the A9/A3, typically under 6 hours.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (€/litre) above; it converts road distance directly into estimated litres and cost.' },
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
