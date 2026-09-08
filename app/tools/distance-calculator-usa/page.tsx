// app/tools/distance-calculator-usa/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorUsaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { US_TOWNS, findTown } from '@/lib/distance-towns-us';
import { US_CAPITAL_DISTANCE_KM } from '@/lib/us-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator USA 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 62 major US cities — New York, Los Angeles, Chicago, Houston and more. Cross-checked road distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-usa' },
  openGraph: {
    title: 'Distance Calculator USA 2026 | Naira Autos',
    description: 'Road distance and drive time between 62 US cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-usa',
  },
  keywords: [
    'distance calculator usa', 'new york to los angeles distance', 'chicago to houston distance',
    'us road distance calculator', 'fuel cost new york to los angeles', 'dallas to houston distance',
    'los angeles to san francisco distance', 'distance between us cities',
  ],
};

const nyc = findTown('New York City')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-usa',
      name: 'Distance Calculator USA 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 62 US cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-usa',
      dateModified: '2026-09-07',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'USA', item: 'https://www.naira.autos/tools/distance-calculator-usa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is New York to Los Angeles by road?', acceptedAnswer: { '@type': 'Answer', text: 'About 4,491km (2,790 miles) via I-80/I-70, the most common cross-country route — the longest regularly-driven city-to-city trip in the continental US, typically 40+ hours of driving.' } },
        { '@type': 'Question', name: 'Is there an official US government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single federal agency publishes one. FHWA data covers road mileage within urbanized areas, not intercity trip distances. This tool\'s verified routes are widely-repeated figures independently quoted by multiple road-trip and logistics sources instead.' } },
        { '@type': 'Question', name: 'How far is Chicago from Houston?', acceptedAnswer: { '@type': 'Answer', text: 'About 1,754km (1,090 miles) via I-55 South and I-69, typically around 15 hours of driving.' } },
        { '@type': 'Question', name: 'How far is Los Angeles from San Francisco?', acceptedAnswer: { '@type': 'Answer', text: 'About 612km (380 miles), one of the most commonly driven long routes in California.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price in the calculator above; it converts road distance directly into estimated fuel needed and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorUsaPage() {
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
              <span className="text-white/60">🇺🇸 USA</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 62 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 62 major US cities — New York, Los Angeles, Chicago, Houston, and cities across every region of the country.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorUsaClient />
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
              <p>No single US federal agency publishes a public town-to-town road distance chart. The Federal Highway Administration collects detailed road-mileage data, but it&rsquo;s organised around infrastructure statistics within urbanized areas — daily vehicle-miles travelled on specific road classes — not point-to-point intercity trip distances a driver could look up directly. The closest historical equivalent is the Rand McNally Motor Carriers&rsquo; Road Atlas mileage chart, an industry-standard reference the trucking industry has relied on for decades, but its exact figures aren&rsquo;t freely published online in a form this tool could cite directly.</p>
              <p>So this tool&rsquo;s 7 verified routes are widely-repeated driving distances independently quoted across multiple road-trip and logistics sources, for the most commonly driven interstate corridors: New York City to Los Angeles (2,790 miles via I-80/I-70 — the longest regularly-driven city-to-city trip in the continental US), Chicago to Houston (1,090 miles via I-55/I-69), Chicago to Miami (1,380 miles), Dallas to Houston (240 miles), Los Angeles to San Francisco (380 miles), Seattle to Portland (175 miles via I-5), and New York City to Philadelphia (95 miles via I-95).</p>
              <p>Every other route among this tool&rsquo;s 62 major US cities falls back to the Haversine-based GPS estimate, using the same correction factor calibrated against Nigeria&rsquo;s full verified road matrix. The city list itself is simply the top cities by population, with New York City&rsquo;s own boroughs (Brooklyn, Queens, Manhattan, the Bronx, Staten Island) excluded as redundant with the city itself — the same call made for every other major metro area in this tool.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on US Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The US Interstate Highway System is generally excellent for long-distance driving, but a few things routinely add hours beyond the raw distance. Major metro areas — Los Angeles, Chicago, the New York/New Jersey corridor, and Atlanta especially — see heavy, unpredictable congestion that can turn a fast highway approach into a slow crawl during rush hour. Winter weather closes mountain passes on routes through the Rockies (I-70/I-80) and the Sierra Nevada (I-80 near Donner Pass) with little warning. Toll roads, particularly the Pennsylvania Turnpike and stretches of I-95 in the Northeast, can add meaningful cost even if they don&rsquo;t add time — worth weighing against a longer, toll-free alternate route. Fuel prices vary dramatically by state, from some of the lowest in the country along the Gulf Coast to among the highest in California, so the pump price used in the calculator above is worth adjusting to your actual route&rsquo;s states. As with any calculator, treat the figures here as a planning baseline and check live traffic and weather conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes are widely-repeated distances independently quoted across multiple road-trip and logistics sources. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From New York City to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 61 other cities in this tool, closest to farthest from New York City.</p>
            <DistanceTable hub={nyc} towns={US_TOWNS} verifiedMatrix={US_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — USA
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is New York to Los Angeles?', a: 'About 4,491km (2,790 miles) via I-80/I-70 — the longest regularly-driven city-to-city trip in the continental US, typically 40+ hours of driving.' },
                { q: 'Is there an official US distance chart?', a: 'No. FHWA data covers urbanized-area road mileage, not intercity distances. This tool\'s verified routes are widely-repeated figures from multiple independent sources instead.' },
                { q: 'How far is Chicago from Houston?', a: 'About 1,754km (1,090 miles) via I-55 South and I-69, typically around 15 hours of driving.' },
                { q: 'How far is Los Angeles from San Francisco?', a: 'About 612km (380 miles), one of California\'s most commonly driven long routes.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price above; it converts road distance directly into estimated fuel needed and cost.' },
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
