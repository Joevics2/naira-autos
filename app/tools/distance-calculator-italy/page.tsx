// app/tools/distance-calculator-italy/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorItalyClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { IT_TOWNS, findTown } from '@/lib/distance-towns-it';
import { IT_CAPITAL_DISTANCE_KM } from '@/lib/it-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator Italy 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 40 Italian cities — Rome, Milan, Naples, Turin, Florence and more. Cross-checked autostrada distances, drive time, and fuel cost.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-italy',
    languages: { it: 'https://www.naira.autos/calcolatore-di-distanza-italia' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-italy' },
  },
  openGraph: {
    title: 'Distance Calculator Italy 2026 | Naira Autos',
    description: 'Road distance and drive time between 40 Italian cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-italy',
  },
  keywords: [
    'distance calculator italy', 'milan to naples distance', 'milan to rome distance',
    'italy road distance calculator', 'fuel cost milan to naples', 'milan to turin distance',
    'autostrada distance calculator', 'milan to genoa distance',
  ],
};

const milan = findTown('Milan')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-italy',
      name: 'Distance Calculator Italy 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 40 Italian cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-italy',
      dateModified: '2026-09-08',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Italy', item: 'https://www.naira.autos/tools/distance-calculator-italy' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Milan from Naples?', acceptedAnswer: { '@type': 'Answer', text: 'About 757km via the A1 (Autostrada del Sole), averaged from two independent sources both citing the official highway length — typically a 7-8 hour drive.' } },
        { '@type': 'Question', name: 'How far is Rome from Milan?', acceptedAnswer: { '@type': 'Answer', text: 'This route is deliberately left as an estimate here: the same travel source quotes two contradictory figures for it (476km on one page, 571km on another), so rather than guess which is right, this tool uses its GPS-based estimate instead.' } },
        { '@type': 'Question', name: 'Is there an official Italian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'No single body publishes one. ANAS maintains official lengths for individual autostrade, used here for Milan-Naples via the A1; other routes are cross-checked against independent driving-distance sources.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (€/litre) in the calculator above; it converts road distance directly into estimated litres and cost (autostrada tolls are separate).' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator Italy',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorItalyPage() {
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
              <span className="text-white/60">🇮🇹 Italy</span>
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
              Road distance and drive time between any two of 40 Italian cities — Rome, Milan, Naples, Turin, Florence, and major regional centres.
            </p>
            <Link href="/calcolatore-di-distanza-italia" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              Italiano (Italian version) →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorItalyClient />
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
              <p>Italy has no single government-published matrix of road distances between its major cities. ANAS, the state road agency, maintains official lengths for individual autostrade — the A1 &ldquo;Autostrada del Sole,&rdquo; Italy&rsquo;s longest and most important motorway, connects Milan to Naples via Bologna, Florence, and Rome at an official length of roughly 760km, corroborated independently by a separate 2026 travel-guide figure of 754km. Averaging those two gives this tool&rsquo;s Milan-Naples verified figure of 757km. Milan&rsquo;s connections to Turin, Bologna, and Genoa are each sourced from a single detailed driving-distance guide.</p>
              <p>Worth flagging directly: Rome to Milan is deliberately left unverified after research turned up a genuine internal contradiction — the same source (a car-rental company&rsquo;s Italy driving guide) quotes 476km for this route on one page and 571km on another, a 20% discrepancy for what should be the identical pair. Rather than pick one figure and present it with false confidence, this route falls back to the GPS-based Haversine estimate instead, the same standard applied to any route this tool can&rsquo;t verify cleanly.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Italian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The A1 carries over 120,000 vehicles a day on its Milan-Bologna stretch alone, and Ferragosto (15 August) weekend traffic is a genuine national phenomenon — the Saturday before is consistently the single heaviest travel day of the year, with other red days including Easter Saturday and the first/last Saturdays of school holidays. Autostrade per l&rsquo;Italia and Viabilità Italia (the Ministry of Transport) both publish traffic forecast calendars worth checking before a long trip. Most autostrade are toll roads with per-kilometre pricing, adding real cost beyond fuel. As with any calculator, treat the figures here as a planning baseline and check current traffic forecasts before travelling, especially around August.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from ANAS official autostrada lengths and cross-checked driving-distance guides. All other routes, including Rome-Milan, are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Milan to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 39 other cities in this tool, closest to farthest from Milan.</p>
            <DistanceTable hub={milan} towns={IT_TOWNS} verifiedMatrix={IT_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Italy
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Milan from Naples?', a: 'About 757km via the A1, averaged from two independent sources citing the official highway length — typically 7-8 hours.' },
                { q: 'How far is Rome from Milan?', a: 'Left as an estimate here — one otherwise-reputable source gives two contradictory figures (476km and 571km) for this route. Rather than guess, this tool uses its GPS-based estimate instead.' },
                { q: 'Is there an official Italian distance chart?', a: 'No single government matrix, but ANAS documents official autostrada lengths, used here directly for Milan-Naples via the A1.' },
                { q: 'How far is Milan from Turin?', a: 'About 141km, a well-known short hop.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (€/litre) above; it converts road distance directly into estimated litres and cost (autostrada tolls are separate).' },
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
