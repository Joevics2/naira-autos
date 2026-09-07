// app/tools/distance-calculator-uk/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorUkClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { GB_TOWNS, findTown } from '@/lib/distance-towns-gb';
import { GB_CAPITAL_DISTANCE_KM } from '@/lib/gb-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator UK 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 61 UK towns and cities — London, Manchester, Edinburgh, Cardiff, Belfast and more. Cross-checked road distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-uk' },
  openGraph: {
    title: 'Distance Calculator UK 2026 | Naira Autos',
    description: 'Road distance and drive time between 61 UK towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-uk',
  },
  keywords: [
    'distance calculator uk', 'london to manchester distance', 'london to edinburgh distance',
    'uk road distance calculator', 'fuel cost london to manchester', 'edinburgh to glasgow distance',
    'london to birmingham distance', 'london to cardiff distance', 'distance between uk cities',
  ],
};

const london = findTown('London')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-uk',
      name: 'Distance Calculator UK 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 61 UK towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-uk',
      dateModified: '2026-09-07',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'United Kingdom', item: 'https://www.naira.autos/tools/distance-calculator-uk' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is London from Manchester?', acceptedAnswer: { '@type': 'Answer', text: 'About 322km (200 miles) via the M6/M40, a figure cross-checked across multiple independent sources — typically a 3.5-4 hour drive.' } },
        { '@type': 'Question', name: 'How far is London from Edinburgh?', acceptedAnswer: { '@type': 'Answer', text: 'About 644km (400 miles), cross-checked across two independent sources — typically a 7 hour drive, often split with an overnight stop.' } },
        { '@type': 'Question', name: 'Is there an official UK government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No. National Highways, Transport Scotland, and the DfT don\'t publish a public town-to-town road distance matrix. This tool\'s verified routes are cross-checked across at least two independent sources instead, and any route with meaningfully conflicting figures across sources is left as an estimate rather than guessing which source is right.' } },
        { '@type': 'Question', name: 'How far is Edinburgh from Glasgow?', acceptedAnswer: { '@type': 'Answer', text: 'About 80km (50 miles) via the M8, one of the UK\'s busiest and best-documented inter-city routes — typically about an hour.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (£/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorUkPage() {
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
              <span className="text-white/60">🇬🇧 United Kingdom</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 61 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 61 UK towns — London, Edinburgh, Cardiff, Belfast, and major cities across England, Scotland, Wales, and Northern Ireland.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorUkClient />
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
              <p>No UK government body publishes a public town-to-town road distance matrix. National Highways manages England&rsquo;s motorways and major A-roads, Transport Scotland handles Scotland&rsquo;s trunk roads, and the devolved administrations in Wales and Northern Ireland manage their own — but none of them, nor the Department for Transport centrally, maintain a published mileage chart the way Nigeria&rsquo;s civil service travel-allowance guidance does. The closest UK equivalents are the AA and RAC route planners, both of which compute distances live per request rather than publishing a static reference table.</p>
              <p>So this tool&rsquo;s verified routes are built differently: cross-checking multiple independent road-trip and travel-guide sources for the same named-motorway route, and only treating a figure as verified when at least two sources converge on the same number. That gave 6 solid pairs: London to Manchester (322km via the M6/M40, 200 miles), London to Edinburgh (644km, 400 miles), London to Bristol (193km, 120 miles), London to Glasgow (668km, 415 miles), Edinburgh to Glasgow (80km via the M8, 50 miles), and Edinburgh to Bristol (502km via the M6, from a detailed car-rental guide).</p>
              <p>Worth being upfront about what didn&rsquo;t make the cut: London to Birmingham is a case where one otherwise-reputable car-rental site&rsquo;s quoted &ldquo;road distance via the M40&rdquo; undershoots every other source for that same route by roughly 20% — likely an error conflating road distance with the shorter straight-line figure. Rather than guess which source is right, that route (and several others with similarly thin or conflicting sourcing) is left to this tool&rsquo;s GPS-based estimate instead, using the Haversine correction factor calibrated against Nigeria&rsquo;s full verified road matrix. The 61-town list covers all 4 national capitals (London, Edinburgh, Cardiff, Belfast) plus major cities and regional centres across England, Scotland, Wales, and Northern Ireland — London&rsquo;s own boroughs (Islington, Croydon, Harrow, and similar) are deliberately excluded as redundant with London itself, the same call made for Lagos, Cairo, and other major metros elsewhere in this tool.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on UK Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The UK&rsquo;s motorway network is generally fast, but a few well-known bottlenecks routinely add time beyond the raw distance. The M25 around London and the M6 through Birmingham see heavy, unpredictable congestion, especially during rush hour and on bank holiday weekends heading toward Cornwall, Devon, or the Lake District. Crossing the Pennines between Manchester and Leeds means climbing the M62 to England&rsquo;s highest motorway point, which is regularly closed by snow and high winds in winter. The A303 bottleneck around Stonehenge can add an hour or more to journeys toward the South West that should otherwise take three hours. In the Scottish Highlands, distances that look modest on a map often involve single-track roads where average speeds drop to 25-30mph. As with any calculator, treat the figures here as a planning baseline and check live traffic conditions before a long trip, particularly around bank holidays.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes cross-checked across independent road-trip and travel-guide sources. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From London to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 60 other towns in this tool, closest to farthest from London.</p>
            <DistanceTable hub={london} towns={GB_TOWNS} verifiedMatrix={GB_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — United Kingdom
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is London from Manchester?', a: 'About 322km (200 miles) via the M6/M40, cross-checked across multiple sources — typically a 3.5-4 hour drive.' },
                { q: 'How far is London from Edinburgh?', a: 'About 644km (400 miles), cross-checked across two sources — typically 7 hours, often with an overnight stop.' },
                { q: 'Is there an official UK distance chart?', a: 'No. This tool cross-checks at least two independent sources per route instead, and leaves conflicting routes as estimates rather than guessing.' },
                { q: 'How far is Edinburgh from Glasgow?', a: 'About 80km (50 miles) via the M8, one of the busiest and best-documented UK inter-city routes — about an hour.' },
                { q: 'Why isn\'t London to Birmingham "verified"?', a: 'One otherwise-reputable source undershoots every other citation for this route by about 20%, likely conflating road and straight-line distance. Rather than guess, it\'s left as an estimate.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (£/litre) above; it converts road distance directly into estimated litres and cost.' },
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
