// app/tools/distance-calculator-philippines/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorPhilippinesClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { PH_TOWNS, findTown } from '@/lib/distance-towns-ph';
import { PH_CAPITAL_DISTANCE_KM } from '@/lib/ph-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Philippines 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 30 Philippine cities — Manila, Cebu, Davao and more. Verified Luzon expressway distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-philippines' },
  openGraph: {
    title: 'Distance Calculator Philippines 2026 | Naira Autos',
    description: 'Road distance and drive time between 30 Philippine cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-philippines',
  },
  keywords: [
    'distance calculator philippines', 'manila to baguio distance', 'manila to legazpi distance',
    'philippines road distance calculator', 'fuel cost manila to baguio', 'manila to batangas distance',
  ],
};

const manila = findTown('Manila')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-philippines',
      name: 'Distance Calculator Philippines 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 30 Philippine cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-philippines',
      dateModified: '2026-09-14',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Philippines', item: 'https://www.naira.autos/tools/distance-calculator-philippines' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Manila from Baguio?', acceptedAnswer: { '@type': 'Answer', text: 'About 246km from Metro Manila (Balintawak) to Baguio City proper via NLEX-SCTEX-TPLEX, a 2026 TRB-verified expressway figure - typically 4.5-6 hours depending on traffic and mountain-road conditions for the final stretch.' } },
        { '@type': 'Question', name: 'Can I get a road distance from Manila to Cebu or Davao?', acceptedAnswer: { '@type': 'Answer', text: 'Not a meaningful one - the Philippines is an archipelago, and there is no continuous road between Luzon and the Visayas or Mindanao. Any real trip requires a ferry (RORO) crossing or a flight. This tool shows a GPS-based straight-line estimate for these pairs, clearly marked, but it does not represent an actual drivable route.' } },
        { '@type': 'Question', name: 'Is there an official Philippine government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'The DPWH documents official lengths for individual highways and expressways, but doesn\'t publish a full city-to-city matrix. This tool uses a 2026 TRB-verified expressway-toll guide for Manila-Baguio and a cross-checked figure for Manila-Legazpi.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (₱/litre) in the calculator above. Philippine fuel prices have been especially volatile in 2026, so check the current week\'s DOE price bulletin before budgeting a long trip.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator Philippines',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorPhilippinesPage() {
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
              <span className="text-white/60">🇵🇭 Philippines</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 30 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 30 Philippine cities — Manila, Cebu, Davao, and major regional centres across Luzon, Visayas, and Mindanao.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorPhilippinesClient />
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              A Note on Island Geography, Read This First
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>The Philippines is an archipelago of over 7,000 islands, and that changes what &ldquo;road distance&rdquo; can honestly mean here. Within Luzon — where Manila, Baguio, Legazpi, and most of this tool&rsquo;s northern and central cities sit — road distance works exactly like it does everywhere else in this tool. But between islands, say Manila to Cebu or Manila to Davao, there is no continuous road at all. Real trips between them go by RORO (roll-on/roll-off) ferry, by inter-island shipping, or by air. The Department of Public Works and Highways&rsquo; own Pan-Philippine Highway — the country&rsquo;s official north-south backbone — explicitly excludes sea routes from its published length for exactly this reason.</p>
              <p>So this tool is upfront about the limitation rather than quietly papering over it: for any pair of cities on different islands, the number you&rsquo;ll see is a straight-line GPS estimate with the same road-correction factor used everywhere else in this tool, but it does not correspond to an actual drivable route, and no correction factor can make it one. Use it as a rough sense of geographic distance only, and look up ferry schedules or flights for the real trip.</p>
              <p>Within Luzon, this tool has 2 verified routes: Manila to Baguio (246km, from a 2026 toll-regulator-verified expressway guide measuring Metro Manila&rsquo;s Balintawak interchange to Baguio City proper via NLEX, SCTEX, and TPLEX) and Manila to Legazpi (460km, cross-checked driving-distance figure). The DPWH doesn&rsquo;t publish a full city-to-city matrix, so every other same-island route falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix — the same honest labelling this tool applies everywhere.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Philippine Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Metro Manila traffic is famously heavy at almost any hour, and getting out of the city onto NLEX or SLEX can itself take longer than the open highway that follows. Provincial roads outside the expressway network are often narrower and shared with jeepneys, tricycles, and pedestrians, which slows average speed well below what a highway-only calculation suggests. Typhoon season (roughly June to November) regularly floods or closes sections of road with little warning, particularly in low-lying provincial areas. Fuel prices have also been unusually volatile through 2026 due to Middle East supply disruptions, with weekly swings of several pesos per litre — worth checking the current DOE price bulletin before budgeting a long trip rather than relying on a single cached figure. As with any calculator, treat the figures here as a planning baseline and check current road, weather, and fuel conditions before travelling.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from a 2026 TRB-verified expressway-toll guide and cross-checked driving-distance figures. Inter-island pairs and all other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Manila to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 29 other cities in this tool, closest to farthest from Manila. Inter-island entries are GPS estimates only — see the note above.</p>
            <DistanceTable hub={manila} towns={PH_TOWNS} verifiedMatrix={PH_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Philippines
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Manila from Baguio?', a: 'About 246km via NLEX-SCTEX-TPLEX, a 2026 TRB-verified expressway figure - typically 4.5-6 hours.' },
                { q: 'Can I get a road distance to Cebu or Davao?', a: 'Not a meaningful one - there\'s no road connecting the islands. This tool shows a GPS-based straight-line estimate, clearly marked, but a real trip needs a ferry or flight.' },
                { q: 'Is there an official Philippine distance chart?', a: 'The DPWH documents official expressway and highway lengths but not a full city-to-city matrix. This tool uses a verified expressway guide for Manila-Baguio.' },
                { q: 'How far is Manila from Legazpi?', a: 'About 460km, a cross-checked driving-distance figure - typically 7+ hours by car.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (₱/litre) above. Prices have been volatile in 2026, so check the current DOE bulletin before budgeting.' },
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
