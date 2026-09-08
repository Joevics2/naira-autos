// app/tools/distance-calculator-netherlands/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorNetherlandsClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { NL_TOWNS, findTown } from '@/lib/distance-towns-nl';
import { NL_CAPITAL_DISTANCE_KM } from '@/lib/nl-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Netherlands 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 32 Dutch cities — Amsterdam, Rotterdam, The Hague, Utrecht and more. Cross-checked motorway distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-netherlands' },
  openGraph: {
    title: 'Distance Calculator Netherlands 2026 | Naira Autos',
    description: 'Road distance and drive time between 32 Dutch cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-netherlands',
  },
  keywords: [
    'distance calculator netherlands', 'amsterdam to rotterdam distance', 'amsterdam to utrecht distance',
    'netherlands road distance calculator', 'fuel cost amsterdam to rotterdam', 'amsterdam to eindhoven distance',
    'utrecht to groningen distance',
  ],
};

const amsterdam = findTown('Amsterdam')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-netherlands',
      name: 'Distance Calculator Netherlands 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 32 Dutch cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-netherlands',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Netherlands', item: 'https://www.naira.autos/tools/distance-calculator-netherlands' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Amsterdam from Rotterdam?', acceptedAnswer: { '@type': 'Answer', text: 'About 77km, averaged from two independently-published driving-distance figures — typically under an hour via the A4.' } },
        { '@type': 'Question', name: 'How far is Utrecht from Groningen?', acceptedAnswer: { '@type': 'Answer', text: 'About 187km via the A28, the official Rijkswaterstaat motorway length.' } },
        { '@type': 'Question', name: 'Is there an official Dutch government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No public town-to-town matrix, but Rijkswaterstaat documents official motorway lengths, used here directly for Utrecht-Groningen. Most other Dutch routes are short enough that independent driving-distance sources converge closely.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (€/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorNetherlandsPage() {
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
              <span className="text-white/60">🇳🇱 Netherlands</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 32 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 32 Dutch cities — Amsterdam, Rotterdam, The Hague, Utrecht, and major regional centres.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorNetherlandsClient />
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
              <p>The Netherlands doesn&rsquo;t publish a public town-to-town road distance matrix. Rijkswaterstaat, the national roads agency, documents the official length of every numbered motorway (A1 through A99), but — much like Germany&rsquo;s Autobahns — those lengths describe entire routes with dozens of interchanges, not necessarily the specific city-to-city distance a driver needs. The one clean exception here is Utrecht to Groningen, which runs the entire A28 motorway at an official Rijkswaterstaat length of 187km.</p>
              <p>Amsterdam&rsquo;s connections to Rotterdam, Eindhoven, and Utrecht are each averaged from two independently-published driving-distance figures, since the Netherlands&rsquo; short distances mean small measurement differences (which exact address within each city, for instance) can shift a figure by 10-15% without either source being wrong. Given the country&rsquo;s compact size — under 300km end to end — the Haversine-based GPS estimate this tool falls back on for every other route tends to track real driving distance closely anyway.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Dutch Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The Netherlands has one of Europe&rsquo;s densest and most heavily-used motorway networks, and several sections — the A2 near Utrecht, the A4 and A13 around The Hague and Rotterdam, and the A10 ring around Amsterdam — are among the most congested roads in Europe during rush hour, despite the country&rsquo;s small size. The Rijkswaterstaat traffic information service and apps like ANWB Onderweg provide live congestion data worth checking before any trip through the Randstad conurbation (Amsterdam-Rotterdam-The Hague-Utrecht). As with any calculator, treat the figures here as a planning baseline and check current traffic conditions before travelling, especially during weekday rush hours.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from Rijkswaterstaat&rsquo;s official A28 motorway length and cross-checked driving-distance guides. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Amsterdam to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 31 other cities in this tool, closest to farthest from Amsterdam.</p>
            <DistanceTable hub={amsterdam} towns={NL_TOWNS} verifiedMatrix={NL_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Netherlands
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Amsterdam from Rotterdam?', a: 'About 77km, averaged from two independent sources — typically under an hour via the A4.' },
                { q: 'How far is Utrecht from Groningen?', a: 'About 187km via the A28, the official Rijkswaterstaat motorway length.' },
                { q: 'Is there an official Dutch distance chart?', a: 'No public matrix, but Rijkswaterstaat documents official motorway lengths, used here for Utrecht-Groningen. The country\'s small size means other estimates track reality closely.' },
                { q: 'How far is Amsterdam from Eindhoven?', a: 'About 123km, averaged from two independent driving-distance sources.' },
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
