// app/tools/distance-calculator-australia/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorAustraliaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { AU_TOWNS, findTown } from '@/lib/distance-towns-au';
import { AU_CAPITAL_DISTANCE_KM } from '@/lib/au-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Australia 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 27 Australian cities — Sydney, Melbourne, Brisbane, Perth and more. Cross-checked road distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-australia' },
  openGraph: {
    title: 'Distance Calculator Australia 2026 | Naira Autos',
    description: 'Road distance and drive time between 27 Australian cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-australia',
  },
  keywords: [
    'distance calculator australia', 'sydney to melbourne distance', 'sydney to brisbane distance',
    'australia road distance calculator', 'fuel cost sydney to melbourne', 'melbourne to perth distance',
    'sydney to perth distance', 'brisbane to cairns distance',
  ],
};

const sydney = findTown('Sydney')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-australia',
      name: 'Distance Calculator Australia 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 27 Australian cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-australia',
      dateModified: '2026-09-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Australia', item: 'https://www.naira.autos/tools/distance-calculator-australia' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Sydney from Melbourne?', acceptedAnswer: { '@type': 'Answer', text: 'About 1,045km via the Hume Highway, typically 12.5 hours of driving, usually done over 2 days or with an early start.' } },
        { '@type': 'Question', name: 'How far is Sydney from Brisbane?', acceptedAnswer: { '@type': 'Answer', text: 'About 918km via the Pacific Highway (A1/M1), averaged from two closely-agreeing sources, typically 10-11 hours of driving.' } },
        { '@type': 'Question', name: 'Is there an official Australian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single body publishes one, since highways are state jurisdiction. This tool\'s verified routes are cross-checked across independent, detailed travel-planning sources measured from each city\'s CBD.' } },
        { '@type': 'Question', name: 'How far is Sydney from Perth?', acceptedAnswer: { '@type': 'Answer', text: 'About 3,934km, one of the longest drives in the world, crossing the Nullarbor Plain and typically taking 40+ hours of driving over several days.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (A$/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator Australia',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorAustraliaPage() {
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
              <span className="text-white/60">🇦🇺 Australia</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 27 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 27 Australian cities — all 8 state and territory capitals plus major regional centres.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorAustraliaClient />
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
              <p>No single Australian government body publishes a public town-to-town road distance chart, since highways are state and territory jurisdiction rather than federal. This tool&rsquo;s 5 verified routes instead come from cross-checking independent, detailed travel-planning sources that measure distance from each city&rsquo;s central business district and quote drive time alongside it: Melbourne to Sydney (1,045km via the Hume Highway), Sydney to Brisbane (roughly 918km via the Pacific Highway, averaged from two sources within 1% of each other), Brisbane to Cairns (1,705km), Melbourne to Perth (3,306km, corroborated twice on the same detailed source), and Sydney to Perth (roughly 3,934km, averaged from two sources agreeing within 2km of each other).</p>
              <p>Every other route among this tool&rsquo;s 27 cities falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix. The city list covers all 8 state and territory capitals — including Canberra, the federal capital, distinct from any state — plus major regional cities people actually drive between: the Gold Coast and Sunshine Coast in Queensland, Newcastle and Wollongong in New South Wales, and regional centres like Toowoomba, Ballarat, and Bendigo. Melbourne, Sydney, and Brisbane&rsquo;s own metro suburbs are deliberately excluded as redundant with their parent city.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Australian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Australia&rsquo;s coastal highways connecting the major capitals are generally well-maintained multi-lane roads, but the sheer scale of the country changes the calculus on longer routes: driving from Perth to anywhere on the east coast means crossing the Nullarbor Plain, a genuinely remote stretch where fuel stops can be 200km or more apart and running low on petrol is a real risk rather than an inconvenience. Coastal routes like the Pacific Highway and Hume Highway see heavy holiday traffic around Christmas, Easter, and long weekends, and can add hours through towns like Coffs Harbour and Albury. Outback and rural routes carry a genuine risk of wildlife (kangaroos especially) on the road at dawn and dusk. As with any calculator, treat the figures here as a planning baseline and check current road and fuel-stop conditions before a long trip, particularly across remote stretches.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes cross-checked across independent, detailed travel-planning sources measured from each city&rsquo;s CBD. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Sydney to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 26 other cities in this tool, closest to farthest from Sydney.</p>
            <DistanceTable hub={sydney} towns={AU_TOWNS} verifiedMatrix={AU_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Australia
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Sydney from Melbourne?', a: 'About 1,045km via the Hume Highway, typically 12.5 hours of driving.' },
                { q: 'How far is Sydney from Brisbane?', a: 'About 918km via the Pacific Highway, averaged from two close sources — typically 10-11 hours.' },
                { q: 'Is there an official Australian distance chart?', a: 'No single body publishes one, since highways are state jurisdiction. This tool cross-checks independent, detailed travel sources instead.' },
                { q: 'How far is Sydney from Perth?', a: 'About 3,934km, one of the longest drives in the world across the Nullarbor Plain, typically 40+ hours over several days.' },
                { q: 'How far is Brisbane from Cairns?', a: 'About 1,705km, typically a multi-day drive along the Queensland coast.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (A$/litre) above; it converts road distance directly into estimated litres and cost.' },
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
