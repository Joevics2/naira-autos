// app/tools/distance-calculator-egypt/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorEgyptClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { EG_TOWNS, findTown } from '@/lib/distance-towns-eg';
import { EG_CAPITAL_DISTANCE_KM } from '@/lib/eg-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Egypt 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 41 Egyptian towns — Cairo, Alexandria, Luxor, Aswan and more. Verified UN logistics distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-egypt' },
  openGraph: {
    title: 'Distance Calculator Egypt 2026 | Naira Autos',
    description: 'Road distance and drive time between 41 Egyptian towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-egypt',
  },
  keywords: [
    'distance calculator egypt', 'egypt distance between cities', 'how far is cairo from alexandria',
    'distance between cairo and luxor', 'driving time cairo to hurghada', 'road distance cairo to aswan',
    'egypt road distance calculator', 'fuel cost cairo to sharm el sheikh', 'egypt governorate capitals distance',
    'kilometres between egyptian cities', 'luxor to aswan distance', 'cairo to sharm el sheikh distance',
  ],
};

const cairo = findTown('Cairo')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-egypt',
      name: 'Distance Calculator Egypt 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 41 Egyptian towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-egypt',
      dateModified: '2026-09-05',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Egypt', item: 'https://www.naira.autos/tools/distance-calculator-egypt' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Cairo from Alexandria by road?', acceptedAnswer: { '@type': 'Answer', text: 'About 216km via the desert road, a verified figure from the UN World Food Programme Logistics Cluster\'s Egypt distance matrix — typically a 2.5-3 hour drive.' } },
        { '@type': 'Question', name: 'Is there an official Egyptian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'Egypt\'s Ministry of Transport doesn\'t publish a public town-to-town matrix, but the UN Logistics Cluster does, as part of its humanitarian logistics country profile for Egypt. This tool uses that matrix directly for 13 major hub towns, covering 78 verified pairs.' } },
        { '@type': 'Question', name: 'How far is Cairo from Luxor?', acceptedAnswer: { '@type': 'Answer', text: 'About 708km by road, a verified figure from the same UN logistics matrix. Most travellers fly or take an overnight train instead, since the drive runs 9+ hours.' } },
        { '@type': 'Question', name: 'How far is Luxor from Aswan?', acceptedAnswer: { '@type': 'Answer', text: 'About 229km, verified - roughly a 3 hour drive, and the most common road-trip segment in Upper Egypt, often extended to include Edfu and Kom Ombo along the way.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (E£/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorEgyptPage() {
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
              <span className="text-white/60">🇪🇬 Egypt</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 41 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 41 Egyptian towns — Cairo, Alexandria, Luxor, Aswan, the Red Sea and Sinai resort towns, and major governorate capitals.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorEgyptClient />
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
              <p>Egypt turned out to have the strongest verified data source of any country built into this tool so far. The United Nations World Food Programme&rsquo;s Logistics Cluster — the UN body that coordinates humanitarian supply chains during crises — publishes a full distance-and-travel-time matrix for Egypt as part of its country logistics profile, used by aid agencies planning deliveries across the country. That matrix directly covers 13 major hub towns: Cairo, Alexandria, Aswan, Faiyum, Minya, Edfu, Ismailia, Luxor, Port Said, Sharm El Sheikh, Hurghada, Nuweiba, and Rafah, giving 78 verified point-to-point road distances — a far richer starting set than this tool could piece together from scattered highway-length citations alone.</p>
              <p>Those 78 pairs cover the routes people actually search for: Cairo to Alexandria along the desert road (216km), Cairo down to Luxor and Aswan through Upper Egypt (708km and 926km), and Cairo out to the Sinai and Red Sea resort towns of Sharm El Sheikh and Hurghada (503km and 548km). Every one of these is marked <span className="font-semibold text-emerald-700">&ldquo;Verified route&rdquo;</span> in the calculator and the table below.</p>
              <p>The remaining 28 towns in this tool&rsquo;s 41-town list — Nile Delta and Upper Egypt governorate capitals like Mansoura, Tanta, Asyut, and Sohag, plus a handful of further Sinai and Red Sea towns like Dahab, Marsa Alam, and El Tor that the Logistics Cluster matrix doesn&rsquo;t cover — fall back to this tool&rsquo;s GPS-based estimate, using the same Haversine correction factor built for Nigeria and calibrated against that country&rsquo;s full verified road matrix. Those routes are marked <span className="font-semibold text-amber-700">&ldquo;Estimated&rdquo;</span>, both because a different country&rsquo;s calibration won&rsquo;t transfer perfectly to Egypt&rsquo;s road network, and because it&rsquo;s the same honest labelling standard applied everywhere else in this tool.</p>
              <p>The town list itself follows the pattern used across every country in this tool: start with the matrix&rsquo;s verified hub towns, then add the governorate capitals and regional centres a general audience actually searches for — the Nile Delta&rsquo;s industrial towns (Mansoura, Tanta, Zagazig, Mahalla el-Kubra), Upper Egypt&rsquo;s river towns (Asyut, Sohag, Qena, Beni Suef), and the wider set of Sinai and Red Sea coastal towns beyond the ones already in the verified matrix. Cairo&rsquo;s own sprawling metro area — Giza, New Cairo, 6th of October City, Helwan, and similar districts that sit within a few kilometres of central Cairo&rsquo;s coordinates — is deliberately excluded as a set of separate entries, the same call made for Lagos, Nairobi, and Johannesburg&rsquo;s equivalents elsewhere in this tool.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Egyptian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Egypt&rsquo;s desert highways connecting Cairo to Alexandria, the Red Sea, and the Sinai are generally well-paved and fast by regional standards, but a few things routinely add hours beyond the raw distance. Long desert stretches — particularly toward Luxor, Aswan, and the Red Sea coast — have limited service stations and mobile signal in places, so fuel and water stops need planning rather than assumption. Police checkpoints are common on inter-city roads, especially approaching Cairo, the Suez Canal cities, and tourist areas in Upper Egypt and Sinai, and can add meaningful time during busy periods. Many long-distance travellers between Cairo and Luxor or Aswan skip the 9+ hour drive entirely in favour of an overnight sleeper train or a short domestic flight — worth factoring in even though this tool only calculates the road option. As with any calculator, treat the figures here as a planning baseline and check current road and security conditions before a long trip, particularly in North Sinai.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from the UN World Food Programme Logistics Cluster&rsquo;s Egypt distance matrix. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          {/* Full ranked distance table from Cairo */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Cairo to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 40 other towns in this tool, closest to farthest from Cairo.</p>
            <DistanceTable hub={cairo} towns={EG_TOWNS} verifiedMatrix={EG_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Egypt
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Cairo from Alexandria by road?', a: 'About 216km via the desert road, a verified UN Logistics Cluster figure — typically a 2.5-3 hour drive.' },
                { q: 'Is there an official Egyptian distance chart?', a: 'No public Ministry of Transport matrix, but the UN World Food Programme Logistics Cluster publishes one for humanitarian planning, which this tool uses directly for 13 major hub towns (78 verified pairs).' },
                { q: 'How far is Cairo from Luxor?', a: 'About 708km, verified. Most travellers fly or take an overnight train instead, since the drive runs 9+ hours.' },
                { q: 'How far is Luxor from Aswan?', a: 'About 229km, verified — roughly 3 hours, and the most common Upper Egypt road-trip segment, often extended via Edfu and Kom Ombo.' },
                { q: 'Why do some routes say "estimated"?', a: 'Only the 13 hub towns in the UN Logistics Cluster matrix have verified pairs. Routes touching any of the other 28 towns are estimated from GPS coordinates instead.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (E£/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' },
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
