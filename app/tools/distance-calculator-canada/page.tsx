// app/tools/distance-calculator-canada/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorCanadaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { CA_TOWNS, findTown } from '@/lib/distance-towns-ca';
import { CA_CAPITAL_DISTANCE_KM } from '@/lib/ca-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Canada 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 36 Canadian cities — Toronto, Montreal, Vancouver, Calgary and more. Official highway lengths, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-canada' },
  openGraph: {
    title: 'Distance Calculator Canada 2026 | Naira Autos',
    description: 'Road distance and drive time between 36 Canadian cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-canada',
  },
  keywords: [
    'distance calculator canada', 'toronto to montreal distance', 'toronto to vancouver distance',
    'canada road distance calculator', 'fuel cost toronto to montreal', 'calgary to edmonton distance',
    'toronto to windsor distance', 'distance between canadian cities',
  ],
};

const toronto = findTown('Toronto')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-canada',
      name: 'Distance Calculator Canada 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 36 Canadian cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-canada',
      dateModified: '2026-09-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Canada', item: 'https://www.naira.autos/tools/distance-calculator-canada' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Toronto from Montreal?', acceptedAnswer: { '@type': 'Answer', text: 'About 550km via Highway 401 and Autoroute 20, typically a 5.5-6 hour drive.' } },
        { '@type': 'Question', name: 'How far is Toronto from Windsor?', acceptedAnswer: { '@type': 'Answer', text: 'About 818km, the full official length of Highway 401 - Canada\'s busiest highway, connecting the two cities end to end.' } },
        { '@type': 'Question', name: 'Is there an official Canadian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single federal body publishes one, since highways are largely provincial jurisdiction. This tool uses official highway lengths where one connects two cities directly (Highway 401, Highway 2, Highway 20), and detailed cross-country travel sources for the rest.' } },
        { '@type': 'Question', name: 'How far is Toronto from Vancouver?', acceptedAnswer: { '@type': 'Answer', text: 'About 4,439km, one of the longest regularly-driven routes in the country, typically 40+ hours of driving across the Trans-Canada Highway.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (C$/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator Canada',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorCanadaPage() {
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
              <span className="text-white/60">🇨🇦 Canada</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 36 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 36 Canadian cities — all 13 provincial/territorial capitals plus Toronto, Montreal, Vancouver, and other major cities.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorCanadaClient />
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
              <p>No single Canadian federal body publishes a public town-to-town road distance chart, since highway ownership and maintenance is mostly a provincial responsibility rather than a federal one. What Canada does have is a small number of individually well-documented highways: Ontario&rsquo;s Highway 401 — the busiest highway in North America — runs the full distance from Toronto to Windsor at an official length of 818km. Alberta&rsquo;s Highway 2 connects Calgary to Edmonton directly at 254km, and Quebec&rsquo;s Autoroute 20 connects Quebec City to Montreal at 252km. This tool uses all three of those official lengths directly.</p>
              <p>For the country&rsquo;s major cross-country routes — Toronto to Montreal (550km), Toronto to Vancouver (4,439km), and Montreal to Calgary (3,739km) — this tool draws on a detailed Trans-Canada Highway travel-planning resource that quotes both distance and expected drive time for these exact routes. Every other route among this tool&rsquo;s 36 cities falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix.</p>
              <p>The 36-city list covers all 13 provincial and territorial capitals — including Ottawa, the federal capital, and the more remote territorial capitals of Whitehorse, Yellowknife, and Iqaluit — plus Toronto, Montreal, Vancouver, Calgary, and other major cities people actually drive between. Satellite and commuter towns around Toronto, Montreal, and Vancouver (Mississauga, Laval, Surrey, and similar) are deliberately excluded as redundant with their parent city, the same call made for every other major metro in this tool.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Canadian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Canada&rsquo;s sheer size means winter weather is the single biggest factor on any long-distance trip — mountain passes through British Columbia and the Rockies, and prairie stretches through Saskatchewan and Manitoba, can close with little warning between October and April, and Environment Canada highway advisories are worth checking before any winter drive. Highway 401 through the Greater Toronto Area carries some of the heaviest traffic volumes in North America and regularly backs up well beyond what the distance alone suggests. Long stretches of northern Ontario and the Prairies have limited fuel stops and cell coverage, so trips through those regions need more deliberate planning than the raw distance implies. As with any calculator, treat the figures here as a planning baseline and check current road and weather conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from official provincial highway lengths (Highway 401, Highway 2, Autoroute 20) and a detailed Trans-Canada Highway travel resource for cross-country routes. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Toronto to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 35 other cities in this tool, closest to farthest from Toronto.</p>
            <DistanceTable hub={toronto} towns={CA_TOWNS} verifiedMatrix={CA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Canada
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Toronto from Montreal?', a: 'About 550km via Highway 401 and Autoroute 20, typically a 5.5-6 hour drive.' },
                { q: 'How far is Toronto from Windsor?', a: 'About 818km, the full official length of Highway 401 - Canada\'s busiest highway.' },
                { q: 'Is there an official Canadian distance chart?', a: 'No single federal matrix, since highways are mostly provincial jurisdiction. This tool uses official lengths (Highway 401, 2, and Autoroute 20) plus cross-checked cross-country figures.' },
                { q: 'How far is Toronto from Vancouver?', a: 'About 4,439km, one of the longest regularly-driven routes in Canada - typically 40+ hours across the Trans-Canada Highway.' },
                { q: 'How far is Calgary from Edmonton?', a: 'About 254km via Highway 2, a well-known and heavily-travelled route.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (C$/litre) above; it converts road distance directly into estimated litres and cost.' },
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
