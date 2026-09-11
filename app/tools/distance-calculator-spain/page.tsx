// app/tools/distance-calculator-spain/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSpainClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { ES_TOWNS, findTown } from '@/lib/distance-towns-es';
import { ES_CAPITAL_DISTANCE_KM } from '@/lib/es-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Spain 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 40 Spanish cities — Madrid, Barcelona, Valencia, Seville and more. Official autovía distances, drive time, and fuel cost.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-spain',
    languages: { es: 'https://www.naira.autos/herramientas/calculadora-de-distancia-espana' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-spain' },
  },
  openGraph: {
    title: 'Distance Calculator Spain 2026 | Naira Autos',
    description: 'Road distance and drive time between 40 Spanish cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-spain',
  },
  keywords: [
    'distance calculator spain', 'madrid to barcelona distance', 'madrid to valencia distance',
    'spain road distance calculator', 'fuel cost madrid to barcelona', 'valencia to seville distance',
    'autovia distance calculator', 'madrid to seville distance',
  ],
};

const madrid = findTown('Madrid')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-spain',
      name: 'Distance Calculator Spain 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 40 Spanish cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-spain',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Spain', item: 'https://www.naira.autos/tools/distance-calculator-spain' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Madrid from Barcelona?', acceptedAnswer: { '@type': 'Answer', text: 'About 504km via the A-2/AP-2, the official Spanish autovía length, which also exactly matches an independent car-rental guide figure — typically a 6+ hour drive across the Sistema Ibérico.' } },
        { '@type': 'Question', name: 'Is there an official Spanish government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No public town-to-town matrix, but Spain\'s Ministry of Public Works and Transport maintains official lengths for the six radial autovías from Madrid, used here directly.' } },
        { '@type': 'Question', name: 'How far is Madrid from Valencia?', acceptedAnswer: { '@type': 'Answer', text: 'About 355km via the A-3, an official autovía length — the shortest of Madrid\'s six radial highways.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (€/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator Spain',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorSpainPage() {
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
              <span className="text-white/60">🇪🇸 Spain</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 40 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 40 Spanish cities — Madrid, Barcelona, Valencia, Seville, and major regional centres.
            </p>
            <Link href="/herramientas/calculadora-de-distancia-espana" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              Español (Spanish version) →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSpainClient />
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
              <p>Spain doesn&rsquo;t publish a public town-to-town road distance matrix, but its motorway network has an unusually clean structure that makes sourcing easier than in most countries: six radial autovías (A-1 through A-6) fan out from Madrid to the rest of the country, each with an official length documented by Spain&rsquo;s Ministry of Public Works and Transport. This tool uses three of them directly: Madrid to Valencia via the A-3 (355km, the shortest of the six), Madrid to Barcelona via the A-2 (504km, which also exactly matches an independent car-rental guide&rsquo;s figure for the same route), and Madrid to A Coruña via the A-6 (590km).</p>
              <p>Valencia to Seville (541km) doesn&rsquo;t run along a single radial autovía, so it&rsquo;s sourced from a single detailed driving-distance guide instead. Every other route among this tool&rsquo;s 40 cities falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Spanish Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Spain&rsquo;s autovía network is generally excellent and, unlike many EU countries, largely toll-free — the older AP-prefixed autopistas that do charge tolls run parallel to free autovía alternates in most cases. Summer (July-August) sees heavy holiday traffic on routes toward the Mediterranean coast and the south, with the Dirección General de Tráfico (DGT) publishing an &ldquo;operación salida&rdquo; traffic forecast calendar for the worst travel days. Mountain passes crossing the Sistema Ibérico (between Madrid and the east coast) and the Sierra Morena (between the centre and Andalusia) can add time in poor weather. As with any calculator, treat the figures here as a planning baseline and check current DGT traffic conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from official Spanish autovía lengths (Ministry of Public Works and Transport, via Wikipedia). All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Madrid to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 39 other cities in this tool, closest to farthest from Madrid.</p>
            <DistanceTable hub={madrid} towns={ES_TOWNS} verifiedMatrix={ES_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Spain
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Madrid from Barcelona?', a: 'About 504km via the A-2/AP-2, an official autovía length that also exactly matches an independent source — typically 6+ hours.' },
                { q: 'How far is Madrid from Valencia?', a: 'About 355km via the A-3, the shortest of Madrid\'s six radial autovías.' },
                { q: 'Is there an official Spanish distance chart?', a: 'No public matrix, but Spain\'s Ministry of Public Works documents official lengths for the six radial autovías from Madrid, used here directly.' },
                { q: 'How far is Madrid from Seville?', a: 'This route currently uses this tool\'s GPS-based estimate rather than a verified figure - cross-check with a live navigation app.' },
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
