// app/tools/distance-calculator-kenya/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorKenyaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { KE_TOWNS, findTown } from '@/lib/distance-towns-ke';
import { KE_CAPITAL_DISTANCE_KM } from '@/lib/ke-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Kenya 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 43 Kenyan towns — Nairobi, Mombasa, Kisumu, Nakuru and more. Sourced verified routes, estimated drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-kenya' },
  openGraph: {
    title: 'Distance Calculator Kenya 2026 | Naira Autos',
    description: 'Road distance and drive time between 43 Kenyan towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-kenya',
  },
  keywords: [
    'distance calculator kenya', 'kenya distance between towns', 'how far is nairobi from mombasa',
    'distance between nairobi and kisumu', 'driving time nairobi to nakuru', 'road distance nairobi to eldoret',
    'kenya road distance calculator', 'fuel cost nairobi to mombasa', 'kenya major towns distance',
    'kilometres between kenyan towns', 'nairobi to garissa distance', 'mombasa to malindi distance',
  ],
};

const nairobi = findTown('Nairobi')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-kenya',
      name: 'Distance Calculator Kenya 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 43 Kenyan towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-kenya',
      dateModified: '2026-09-05',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Kenya', item: 'https://www.naira.autos/tools/distance-calculator-kenya' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Nairobi from Mombasa by road?', acceptedAnswer: { '@type': 'Answer', text: 'About 482km via the A109 highway, the official KeNHA-maintained road length, independently corroborated across multiple sources. The drive typically takes 6-8 hours, longer with heavy truck traffic near the port.' } },
        { '@type': 'Question', name: 'Is there an official Kenyan government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single published matrix covers all major Kenyan towns. KeNHA (Kenya National Highways Authority) publishes official lengths for its numbered A-class trunk roads, which this tool uses directly for routes that run end-to-end along one documented highway: Nairobi-Mombasa, Mombasa-Garissa, and Nairobi-Malaba.' } },
        { '@type': 'Question', name: 'Why are so few Kenya routes "verified"?', acceptedAnswer: { '@type': 'Answer', text: 'Researching this tool found that many widely-repeated distance figures for routes like Nairobi-Nyeri or Nairobi-Eldoret trace back to low-quality, auto-generated web content with inconsistent numbers rather than an official source. Rather than adopt a figure that can\'t be verified, this tool estimates those routes from GPS coordinates instead and marks them clearly.' } },
        { '@type': 'Question', name: 'How far is Nairobi from Kisumu?', acceptedAnswer: { '@type': 'Answer', text: 'This route currently uses this tool\'s GPS-based estimate rather than a verified highway figure, since no single officially-documented road runs the full distance end to end. Treat it as a planning approximation and cross-check with a live navigation app.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current EPRA-regulated pump price (KSh/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorKenyaPage() {
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
              <span className="text-white/60">🇰🇪 Kenya</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 43 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 43 Kenyan towns — Nairobi, Mombasa, and the seven historic provincial hub towns, plus major regional centres.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorKenyaClient />
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
              <p>Kenya has no single published government matrix of road distances between its major towns, unlike Nigeria&rsquo;s UNDP-sourced 37-capital chart. What Kenya does have is KeNHA — the Kenya National Highways Authority — which classifies and maintains official lengths for the country&rsquo;s numbered A-class trunk roads, the routes that carry most of its long-distance and cross-border traffic.</p>
              <p>This tool uses those official lengths directly wherever a documented highway runs end to end between two towns in the list: Nairobi to Mombasa along the A109 (482km, independently corroborated by Wikipedia and the AARoads highway wiki), Mombasa to Garissa along the B8 (463km), and Nairobi to the Uganda border town of Malaba along the A104 (447km, passing through Naivasha, Nakuru, Eldoret, and Bungoma). That gives just three verified routes — a smaller set than Nigeria&rsquo;s or even Ghana&rsquo;s — because researching this tool surfaced a real problem worth naming plainly: a large share of the &ldquo;Nairobi to X&rdquo; distance figures circulating online, including several that rank well in search results, trace back to auto-generated content farms rather than any real source. Multiple pages quoting figures for routes like Nairobi to Nyeri or Nairobi to Eldoret used oddly garbled, thesaurus-swapped language and gave inconsistent numbers from one page to the next — a sign the content was spun rather than researched.</p>
              <p>Rather than adopt one of those unverifiable figures just to fill in more &ldquo;verified&rdquo; badges, this tool estimates every route outside the three sourced above from GPS coordinates, using the same Haversine-based correction factor built for Nigeria and calibrated against real road data. Those estimates are honest approximations, not exact figures, and are labelled as such throughout the calculator and the table below.</p>
              <p>The 43-town list starts from Nairobi and the seven former provincial headquarters — Mombasa, Kisumu, Nakuru, Nyeri, Garissa, Kakamega, and Embu — a structure Kenya replaced administratively with 47 counties in 2010, but one that still maps closely to the major hub towns people actually search for and drive between. Around those, the list adds major regional and border towns: Eldoret and Kitale in the Rift Valley&rsquo;s grain belt, coastal towns like Malindi, Kilifi, and Lamu, and northern and border towns like Wajir, Mandera, Lodwar, and Malaba, since the latter is also how this tool can use a genuinely verified highway figure rather than an estimate for that corner of the map.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Kenyan Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The A109 between Nairobi and Mombasa carries more than half of all goods traded within the East African Community, and heavy-duty truck traffic — plus the port queues at the Mombasa end — routinely stretches the drive well beyond what the distance alone suggests; 6-7 hours in good conditions is common, but 8-10 is not unusual. The ongoing Nairobi-Mombasa Expressway project is intended to cut that closer to four hours once complete, but is not yet finished as of September 2026. Closer to Nairobi, the A104&rsquo;s Nairobi-Nakuru section has seen years of disruptive dualling and expansion works that have, at times, turned routine legs of a longer journey into multi-hour delays. On northern and northeastern routes toward Garissa, Wajir, and Mandera, road quality drops off significantly and security advisories periodically apply — always worth checking before travelling that corridor. As with any calculator, treat the figures here as a planning baseline and check current conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from KeNHA-maintained official highway lengths, cross-checked against independent references. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          {/* Full ranked distance table from Nairobi */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Nairobi to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 42 other towns in this tool, closest to farthest from Nairobi.</p>
            <DistanceTable hub={nairobi} towns={KE_TOWNS} verifiedMatrix={KE_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Kenya
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Nairobi from Mombasa by road?', a: 'About 482km via the A109 — an official, independently corroborated highway length. The drive typically takes 6-8 hours, longer with heavy truck traffic near the port.' },
                { q: 'Is there an official Kenyan distance chart?', a: 'No single matrix covers all towns. KeNHA publishes official lengths for its numbered trunk roads, used here directly for Nairobi-Mombasa, Mombasa-Garissa, and Nairobi-Malaba.' },
                { q: 'Why are so few routes "verified"?', a: 'Many widely-repeated Kenya distance figures online trace back to low-quality, auto-generated content with inconsistent numbers rather than an official source. This tool estimates those routes from GPS coordinates instead of adopting an unverifiable figure.' },
                { q: 'How far is Nairobi from Kisumu?', a: 'This route uses a GPS-based estimate rather than a verified highway figure, since no single documented road runs the full distance end to end. Cross-check with a live navigation app before a long trip.' },
                { q: 'What slows down the Nairobi-Mombasa drive?', a: 'Heavy freight traffic (the A109 carries over half of EAC trade goods), port queues at Mombasa, and ongoing expressway construction. 6-7 hours is typical; 8-10 is common.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current EPRA pump price (KSh/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' },
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
