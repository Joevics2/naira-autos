// app/tools/distance-calculator-south-africa/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSouthAfricaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { ZA_TOWNS, findTown } from '@/lib/distance-towns-za';
import { ZA_CAPITAL_DISTANCE_KM } from '@/lib/za-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator South Africa 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 46 South African towns — Johannesburg, Cape Town, Durban, Pretoria and more. Sourced verified routes, estimated drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-south-africa' },
  openGraph: {
    title: 'Distance Calculator South Africa 2026 | Naira Autos',
    description: 'Road distance and drive time between 46 South African towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-south-africa',
  },
  keywords: [
    'distance calculator south africa', 'south africa distance between cities', 'how far is johannesburg from durban',
    'distance between cape town and johannesburg', 'driving time johannesburg to pretoria',
    'road distance bloemfontein to port elizabeth', 'south africa road distance calculator',
    'fuel cost johannesburg to durban', 'south africa provincial capitals distance',
    'kilometres between south african cities', 'durban to cape town distance', 'johannesburg to cape town distance',
  ],
};

const johannesburg = findTown('Johannesburg')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-south-africa',
      name: 'Distance Calculator South Africa 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 46 South African towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-south-africa',
      dateModified: '2026-09-05',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'South Africa', item: 'https://www.naira.autos/tools/distance-calculator-south-africa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Johannesburg from Durban by road?', acceptedAnswer: { '@type': 'Answer', text: 'About 578km, taken from the official length of the N3 national highway that directly connects the two cities — a SANRAL-maintained, verified figure rather than an estimate.' } },
        { '@type': 'Question', name: 'Is there an official South African government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single agency publishes a full matrix between all provincial capitals, unlike Nigeria\'s UNDP-sourced chart. SANRAL publishes official lengths for individual numbered highways (like the N3), which this tool uses directly where a highway connects two towns end to end. Other major routes are sourced individually from real road-routing data.' } },
        { '@type': 'Question', name: 'Why do different sites give different distances for Durban to Cape Town?', acceptedAnswer: { '@type': 'Answer', text: 'Because there are genuinely two very different routes: the inland N1/N9 corridor and the longer N2 coastal route through the Garden Route, and sites disagree on which one — or which combination — they\'re quoting. Rather than pick one and present it as definitive, this tool estimates that route from GPS coordinates and clearly marks it "estimated."' } },
        { '@type': 'Question', name: 'How far is Johannesburg from Cape Town?', acceptedAnswer: { '@type': 'Answer', text: 'About 1,405km by road via the N1, commonly a 14-16 hour drive, usually split over two days with an overnight stop around Bloemfontein or Colesberg.' } },
        { '@type': 'Question', name: 'How far is Johannesburg from Pretoria?', acceptedAnswer: { '@type': 'Answer', text: 'About 58km — the two cities are part of the same greater Gauteng conurbation, and the drive is typically 45 minutes to just over an hour depending on traffic.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorSouthAfricaPage() {
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
              <span className="text-white/60">🇿🇦 South Africa</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 46 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 46 South African towns — all 9 provincial capitals plus Pretoria, and major cities like Durban, Rustenburg, and George.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSouthAfricaClient />
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
              <p>South Africa has no single government-published matrix of road distances between its nine provincial capitals, unlike Nigeria&rsquo;s UNDP-sourced 37-capital chart. What South Africa does have is SANRAL (the South African National Roads Agency), which maintains and publishes the official length of every numbered national highway — the N1 through N18. Where one of those highways runs directly between two towns in this tool, that published length is used as a verified figure: Johannesburg to Durban, for instance, runs the full length of the N3, officially documented at 578km.</p>
              <p>Beyond those highway-length figures, this tool cross-checked a handful of further major routes against real road-routing data rather than straight-line GPS distance — Johannesburg to Pretoria, Johannesburg to Cape Town, Mahikeng to Bloemfontein, and Bloemfontein&rsquo;s connections to Gqeberha, Polokwane, and Mbombela. That gives seven verified routes in total, each individually sourced rather than assumed.</p>
              <p>Researching this tool also surfaced something worth flagging directly: several long South African routes have genuinely conflicting distances published across different travel sites. Durban to Cape Town is the clearest example — depending on the source, quoted road distances range from roughly 1,250km to 1,800km. That&rsquo;s not a rounding error; it reflects two real, very different routes between the same two cities. The inland N1/N9 corridor via Bloemfontein and Colesberg is shorter but less scenic. The N2 coastal route through the Garden Route, Knysna, and East London is longer but far more common for travellers, not commuters. Rather than pick one of these and present it with false confidence, this tool leaves routes like Durban–Cape Town as an <span className="font-semibold text-amber-700">≈ Estimated</span> GPS-based figure, and says so plainly, instead of quietly inheriting whichever number a random source happened to publish.</p>
              <p>The 46-town list mirrors the same logic used for Nigeria and Ghana: start with the administrative capitals — all nine provincial capitals plus Pretoria, the national executive capital that sits in Gauteng alongside Johannesburg but is very much its own city — then add the major metros and regional centres people actually search for: Durban and Gqeberha (the two other big coastal metros), mining and industrial towns like Rustenburg, Welkom, and Klerksdorp, and Garden Route and Winelands towns like George, Knysna, Stellenbosch, and Paarl that dominate South African road-trip searches. Deliberately excluded are the dozens of Greater Johannesburg, Tshwane, and Ekurhuleni suburbs (Soweto, Benoni, Boksburg, Centurion, and similar) that sit within a few kilometres of Johannesburg or Pretoria&rsquo;s own coordinates — including them as separate entries would just clutter the list with near-duplicate distances.</p>
              <p>This kind of figure earns its keep beyond road-trip planning. Logistics operators moving freight from the Durban and Gqeberha ports up to Gauteng&rsquo;s distribution hubs budget fuel and driver hours off exactly the N3 and N1 lengths cited here. Long-distance bus operators like Intercape and Greyhound publish schedules built around the same corridors, and their quoted travel times are a useful cross-check against this tool&rsquo;s realistic drive-time estimate. And with South Africa&rsquo;s big domestic road-trip season running over the December holidays — Gauteng to the KwaZulu-Natal coast, or Johannesburg down to Cape Town for New Year&rsquo;s — knowing the real road distance rather than a shorter straight-line figure matters for budgeting fuel, toll costs, and overnight stops well before departure.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on South African Roads
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>South Africa&rsquo;s national highway network is generally well-built by regional standards, but a published distance still isn&rsquo;t the same as the trip. The N3 between Johannesburg and Durban is a toll route with several plazas, and heavy freight traffic between Gauteng and the Durban port can slow the Van Reenen&rsquo;s Pass and Tugela sections significantly, especially around month-end. Load shedding — rolling power cuts — periodically knocks out traffic lights at major intersections in Johannesburg, Pretoria, and Cape Town, turning short urban legs of a longer trip into unpredictable delays even when the open-road portion runs to schedule. Long rural stretches, particularly on the N1 through the Karoo and on routes into Limpopo and the North West, also carry a real risk of livestock or wildlife on the road after dark. As with any calculator, treat the figures here as a planning baseline and check current conditions — including load shedding schedules and any SANRAL incident alerts — before a long trip.</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from SANRAL&rsquo;s published national highway lengths and cross-checked road-routing data. All other routes, including Durban–Cape Town, are Haversine-based estimates — see FAQ below.
          </p>

          {/* Full ranked distance table from Johannesburg */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Johannesburg to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 45 other towns in this tool, closest to farthest from Johannesburg.</p>
            <DistanceTable hub={johannesburg} towns={ZA_TOWNS} verifiedMatrix={ZA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — South Africa
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Johannesburg from Durban by road?', a: 'About 578km — the official length of the N3 national highway connecting the two cities, a SANRAL-verified figure.' },
                { q: 'Is there an official South African distance chart?', a: 'No single agency publishes one for all provincial capitals. SANRAL publishes official highway lengths (used here for N3 Johannesburg-Durban); other major routes are sourced individually from real road-routing data.' },
                { q: 'Why do sites disagree on Durban to Cape Town?', a: 'Because there are two genuinely different routes — inland via the N1/N9, or coastal via the N2 Garden Route — and sources quote different ones. This tool estimates it from GPS coordinates and marks it clearly as an estimate rather than picking a side.' },
                { q: 'How far is Johannesburg from Cape Town?', a: 'About 1,405km by road via the N1 — commonly a 14-16 hour drive, often split over two days with a stop near Bloemfontein or Colesberg.' },
                { q: 'How far is Johannesburg from Pretoria?', a: 'About 58km. The two cities share the greater Gauteng conurbation, and the drive is typically 45 minutes to just over an hour depending on traffic.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (R/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' },
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
