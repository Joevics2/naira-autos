// app/tools/distance-calculator-ghana/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorGhanaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { GH_TOWNS, findTown } from '@/lib/distance-towns-gh';
import { GH_CAPITAL_DISTANCE_KM } from '@/lib/gh-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Ghana 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 53 Ghanaian towns — Accra, Kumasi, Tamale, Sekondi-Takoradi and more. Sourced verified routes, estimated drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-ghana' },
  openGraph: {
    title: 'Distance Calculator Ghana 2026 | Naira Autos',
    description: 'Road distance and drive time between 53 Ghanaian towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-ghana',
  },
  keywords: [
    'distance calculator ghana', 'ghana distance between cities', 'how far is accra from kumasi by road',
    'distance between accra and tamale', 'driving time accra to takoradi', 'road distance accra to cape coast',
    'ghana road distance calculator', 'fuel cost accra to kumasi', 'ghana regional capitals distance',
    'kilometres between ghana cities', 'accra to wa distance', 'accra to bolgatanga distance',
  ],
};

const accra = findTown('Accra')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-ghana',
      name: 'Distance Calculator Ghana 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 53 Ghanaian towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-ghana',
      dateModified: '2026-09-05',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Ghana', item: 'https://www.naira.autos/tools/distance-calculator-ghana' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Accra from Kumasi by road?', acceptedAnswer: { '@type': 'Answer', text: 'About 248km by road, roughly 3.5-4 hours in normal traffic. This is a real driving-route distance, not a straight-line estimate.' } },
        { '@type': 'Question', name: 'Is there an official Ghanaian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single agency publishes a full matrix between all 16 regional capitals, unlike Nigeria\'s UNDP-sourced 37-capital chart. This tool instead sources each major route individually from real road-routing data, plus one official figure: the Ghana Highway Authority\'s Accra-Takoradi road dualisation project, documented at 185km.' } },
        { '@type': 'Question', name: 'Why do some Ghana routes say "estimated"?', acceptedAnswer: { '@type': 'Answer', text: 'Only 15 major routes between regional capitals currently have an individually sourced, verified road distance. Every other pair — including any route touching a smaller town — is estimated from GPS coordinates using a road-distance correction factor.' } },
        { '@type': 'Question', name: 'How far is Accra from Tamale?', acceptedAnswer: { '@type': 'Answer', text: 'About 566km by road, commonly a 7-9 hour drive depending on the state of the roads north of Kintampo and traffic through Kumasi or Techiman.' } },
        { '@type': 'Question', name: 'How far is Accra from Takoradi?', acceptedAnswer: { '@type': 'Answer', text: 'About 185km, based on the Ghana Highway Authority\'s Accra-Takoradi Road Dualisation Project documentation — a real, official road length rather than a routing estimate.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorGhanaPage() {
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
              <span className="text-white/60">🇬🇭 Ghana</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 53 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 53 Ghanaian towns — all 16 regional capitals plus major commercial centres like Obuase, Tarkwa, and Hohoe.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorGhanaClient />
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
              <p>Ghana has no single government agency that publishes an official road-distance chart between the country&rsquo;s 16 regional capitals. That puts it in a different position from Nigeria, where a UNDP-sourced travel-allowance matrix covers all 37 state capitals in one dataset. In Ghana, the Ghana Highways Authority (GHA) maintains and publishes the lengths of individual numbered highways &mdash; the N1 through N20 national routes and dozens of regional (R-prefixed) roads &mdash; but no single office stitches those segments into a ready-made town-to-town matrix the way Nigeria&rsquo;s civil service travel-allowance guidance does.</p>
              <p>So this tool takes a different, more piecemeal approach for Ghana. Fifteen major routes between regional capitals are individually sourced and cross-checked: most from real road-routing data (not straight-line GPS distance), and one &mdash; Accra to Sekondi-Takoradi &mdash; from the GHA&rsquo;s own Accra-Takoradi Road Dualisation Project documentation, which states the highway&rsquo;s length as 185km. Those 15 routes, marked <span className="font-semibold text-emerald-700">&ldquo;Verified route&rdquo;</span> in the calculator above and in the table below, cover the busiest corridors: Accra to Kumasi, Kumasi to Tamale, Kumasi to Bolgatanga via the N10, and similar backbone routes that most searches for Ghanaian inter-city distance actually want.</p>
              <p>Every other pairing &mdash; any route touching one of the 37 smaller commercial towns in this tool, or any of the regional-capital pairs we haven&rsquo;t individually sourced yet, such as Wa to Ho or Nalerigu to Cape Coast &mdash; is estimated instead. The estimate starts from the straight-line (GPS) distance between the two towns&rsquo; coordinates, then applies a road-distance correction factor. That factor isn&rsquo;t arbitrary: it was calibrated against Nigeria&rsquo;s full verified 37-capital matrix, where real road distance runs 25&ndash;45% longer than straight-line distance depending on the route&rsquo;s length and terrain. Applying the same physics-based correction to Ghana&rsquo;s coordinates gives a reasonable planning figure, though it will never be as reliable as an actual measured route. These pairs are marked <span className="font-semibold text-amber-700">&ldquo;Estimated&rdquo;</span>, both in the calculator and in the ranked table below, so the distinction is never hidden.</p>
              <p>As more of Ghana&rsquo;s individual highway segments get cross-referenced against real routing data, more pairs will move from &ldquo;estimated&rdquo; to &ldquo;verified.&rdquo; That&rsquo;s a deliberate design choice: rather than presenting a single number with false confidence for all 53×52 possible town pairs, this tool is honest that only a subset currently rests on sourced data, and treats the rest as a useful but clearly-labelled approximation.</p>
              <p>The town list itself follows the same logic as this tool&rsquo;s Nigeria edition: start with every regional capital, then add the commercial and historic towns a general audience actually searches for. Ghana&rsquo;s 16 regions &mdash; created gradually as the old Brong-Ahafo, Northern, and Western regions were each split in two around 2018-2019 &mdash; are Greater Accra (Accra), Ashanti (Kumasi), Western (Sekondi-Takoradi), Western North (Sefwi Wiawso), Central (Cape Coast), Eastern (Koforidua), Volta (Ho), Oti (Dambai), Bono (Sunyani), Bono East (Techiman), Ahafo (Goaso), Northern (Tamale), Savannah (Damongo), North East (Nalerigu), Upper East (Bolgatanga), and Upper West (Wa). Around those 16 capitals, this tool adds 37 further towns &mdash; mining and cocoa centres like Obuase, Tarkwa, and Bibiani; coastal towns like Elmina, Winneba, and Keta; and northern market towns like Yendi, Salaga, and Bawku &mdash; because those are the routes people actually plan trips around, not just the administrative capitals.</p>
              <p>In practice, this kind of figure gets used for more than curiosity. Trotro fare boards often peg fares to a rough per-kilometre rate, so a route&rsquo;s road distance helps sanity-check a quoted fare. Haulage firms moving cocoa or timber between Kumasi, Takoradi, and Accra&rsquo;s ports use similar figures for fuel budgets. And for a weekend trip to Mole National Park near Damongo, or along the Cape Coast-Elmina-Takoradi coast, a realistic road-distance-plus-drive-time figure beats the shorter, misleading straight-line number a basic map search often returns first.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Ghanaian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Ghana&rsquo;s road network is generally considered one of the better-maintained in West Africa, and most of the routes in this tool run on paved national highways. That said, published distances still describe the road, not the trip. Traffic converging on Kumasi &mdash; the country&rsquo;s central hub, where routes to the north, west, and Volta region all pass through &mdash; routinely adds hours to journeys that look short on paper. The stretch north of Kintampo toward Tamale and Bolgatanga narrows in places and shares the road with heavy haulage trucks running the corridor to Burkina Faso and beyond. Coastal routes near Cape Coast and Takoradi can back up badly around market days. As with any calculator, treat the figures here as a planning baseline and check a live navigation app for current conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from real road-routing data and the Ghana Highways Authority&rsquo;s published Accra-Takoradi road length. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          {/* Full ranked distance table from Accra */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Accra to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 52 other towns in this tool, closest to farthest from Accra.</p>
            <DistanceTable hub={accra} towns={GH_TOWNS} verifiedMatrix={GH_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Ghana
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Accra from Kumasi by road?', a: 'About 248km by road, roughly 3.5-4 hours in normal traffic — a real driving-route distance, not a straight-line estimate.' },
                { q: 'Is there an official Ghanaian distance chart?', a: 'No single agency publishes a full matrix between all 16 regional capitals. This tool sources major routes individually from real routing data, plus the GHA\'s official Accra-Takoradi road length (185km).' },
                { q: 'Why do some routes say "estimated"?', a: 'Only 15 major regional-capital routes are individually verified so far. Every other pair is estimated from GPS coordinates with a correction factor calibrated against Nigeria\'s full verified matrix.' },
                { q: 'How far is Accra from Tamale?', a: 'About 566km by road — commonly a 7-9 hour drive depending on traffic through Kumasi/Techiman and conditions north of Kintampo.' },
                { q: 'How far is Accra from Takoradi?', a: 'About 185km, from the Ghana Highways Authority\'s Accra-Takoradi Road Dualisation Project documentation — an official road length.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (GH₵) in the calculator above; it converts road distance directly into estimated litres and cost.' },
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
