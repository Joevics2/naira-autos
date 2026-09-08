// app/tools/distance-calculator-france/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorFranceClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { FR_TOWNS, findTown } from '@/lib/distance-towns-fr';
import { FR_CAPITAL_DISTANCE_KM } from '@/lib/fr-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator France 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 34 French cities — Paris, Lyon, Marseille, Toulouse, Bordeaux and more. Cross-checked autoroute distances, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-france' },
  openGraph: {
    title: 'Distance Calculator France 2026 | Naira Autos',
    description: 'Road distance and drive time between 34 French cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-france',
  },
  keywords: [
    'distance calculator france', 'paris to lyon distance', 'paris to marseille distance',
    'france road distance calculator', 'fuel cost paris to lyon', 'bordeaux to toulouse distance',
    'autoroute distance calculator', 'paris to strasbourg distance',
  ],
};

const paris = findTown('Paris')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-france',
      name: 'Distance Calculator France 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 34 French cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-france',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'France', item: 'https://www.naira.autos/tools/distance-calculator-france' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Paris from Lyon?', acceptedAnswer: { '@type': 'Answer', text: 'About 460km via the A6, cross-checked across independent driving-distance sources — typically a 4.5 hour drive.' } },
        { '@type': 'Question', name: 'How far is Lyon from Marseille?', acceptedAnswer: { '@type': 'Answer', text: 'About 306km via the A7 (Autoroute du Soleil), the official Wikipedia-documented highway length.' } },
        { '@type': 'Question', name: 'Is there an official French government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single body publishes a public town-to-town matrix, but France\'s autoroutes are individually documented on Wikipedia with official lengths, used here directly where one connects two major cities end to end.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (€/litre) in the calculator above; it converts road distance directly into estimated litres and cost, including France\'s autoroute tolls are separate and not included.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorFrancePage() {
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
              <span className="text-white/60">🇫🇷 France</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 34 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 34 French cities — Paris, Lyon, Marseille, Toulouse, Bordeaux, and major regional centres.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorFranceClient />
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
              <p>France has no single government-published matrix of road distances between its major cities, but its autoroute network is unusually well documented on Wikipedia, with the official length of nearly every numbered autoroute recorded individually. Two of this tool&rsquo;s verified routes come directly from those official lengths: Lyon to Marseille runs the entire A7 (the &ldquo;Autoroute du Soleil&rdquo;), officially 306km, and Bordeaux to Toulouse runs the entire A62, officially 231km.</p>
              <p>Paris to Lyon and Paris to Strasbourg don&rsquo;t run along a single named autoroute quite as cleanly, so those two are cross-checked across independent driving-distance sources instead — converging on roughly 460km (A6) and 487km (A4) respectively. Every other route among this tool&rsquo;s 34 cities falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on French Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Most French autoroutes are toll roads, and tolls add real cost even when they don&rsquo;t add time — a full Calais-to-Marseille run can cost over €90 in tolls alone. The Périphérique ring road around Paris is famously congested at almost any hour, and France&rsquo;s Bison Futé traffic forecasting system exists specifically because holiday weekends (especially the Saturday before and after 15 August) see severe nationwide jams as the whole country seems to travel south at once. Nearly every major French city, including Paris, Lyon, Marseille, and Bordeaux, now operates a low-emission zone (Zone à Faibles Émissions) requiring a Crit&rsquo;Air windscreen sticker, which must be ordered online in advance rather than bought roadside. As with any calculator, treat the figures here as a planning baseline and check current toll and traffic conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from official Wikipedia autoroute lengths and cross-checked driving-distance guides. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Paris to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 33 other cities in this tool, closest to farthest from Paris.</p>
            <DistanceTable hub={paris} towns={FR_TOWNS} verifiedMatrix={FR_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — France
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Paris from Lyon?', a: 'About 460km via the A6, cross-checked across independent sources — typically a 4.5 hour drive.' },
                { q: 'How far is Lyon from Marseille?', a: 'About 306km via the A7 (Autoroute du Soleil), an official Wikipedia-documented highway length.' },
                { q: 'Is there an official French distance chart?', a: 'No single government matrix, but France\'s autoroutes are individually documented with official lengths, used here directly for major routes.' },
                { q: 'How far is Bordeaux from Toulouse?', a: 'About 231km via the A62, an official highway length.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (€/litre) above; it converts road distance directly into estimated litres and cost (tolls are separate and not included).' },
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
