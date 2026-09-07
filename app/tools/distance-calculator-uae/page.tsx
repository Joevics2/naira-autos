// app/tools/distance-calculator-uae/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorUaeClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { AE_TOWNS, findTown } from '@/lib/distance-towns-ae';
import { AE_CAPITAL_DISTANCE_KM } from '@/lib/ae-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator UAE 2026 — Road Distance Between Any Two Emirates',
  description: 'Calculate road distance and drive time between 14 UAE towns — Dubai, Abu Dhabi, Sharjah, Al Ain and more. Verified routes, drive time, and fuel cost.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-uae',
    languages: { ar: 'https://www.naira.autos/tools/distance-calculator-uae-arabic' },
  },
  openGraph: {
    title: 'Distance Calculator UAE 2026 | Naira Autos',
    description: 'Road distance and drive time between 14 UAE towns, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-uae',
  },
  keywords: [
    'distance calculator uae', 'abu dhabi to dubai distance', 'dubai to sharjah distance',
    'dubai to al ain distance', 'uae road distance calculator', 'fuel cost dubai to abu dhabi',
    'dubai to fujairah distance', 'dubai to ras al khaimah distance',
  ],
};

const abuDhabi = findTown('Abu Dhabi')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-uae',
      name: 'Distance Calculator UAE 2026 — Road Distance Between Any Two Emirates',
      description: 'Calculate road distance and drive time between 14 UAE towns, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-uae',
      dateModified: '2026-09-06',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'UAE', item: 'https://www.naira.autos/tools/distance-calculator-uae' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Abu Dhabi from Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'About 139km via Sheikh Zayed Road (E11), typically a 1.5 hour drive.' } },
        { '@type': 'Question', name: 'How far is Dubai from Sharjah?', acceptedAnswer: { '@type': 'Answer', text: 'About 28km, one of the shortest and busiest inter-emirate commutes in the UAE.' } },
        { '@type': 'Question', name: 'How far is Dubai from Al Ain?', acceptedAnswer: { '@type': 'Answer', text: 'About 146km via the E66 (Dubai-Al Ain Road), typically 1.5-2 hours.' } },
        { '@type': 'Question', name: 'Is there an official UAE government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'The official UAE government portal (u.ae) names the country\'s major highways but doesn\'t publish a town-to-town distance chart. This tool\'s verified routes are cross-checked across independent car-rental and relocation-guide sources instead.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (AED/litre) in the calculator above; it converts road distance directly into estimated litres and cost.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorUaePage() {
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
              <span className="text-white/60">🇦🇪 UAE</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 14 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 14 UAE towns — all 7 emirate capitals plus Al Ain, Khor Fakkan, and other major towns.
            </p>
            <Link href="/tools/distance-calculator-uae-arabic" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              العربية (Arabic version) →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorUaeClient />
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
              <p>The UAE&rsquo;s official government portal, u.ae, names and describes the country&rsquo;s major highways — Sheikh Zayed Road (E11), Sheikh Mohammed Bin Zayed Road (E311), Emirates Road (E611), the Dubai-Al Ain Road (E66), and others — but doesn&rsquo;t publish a town-to-town distance chart the way a UNDP-style civil service mileage guide would. So this tool&rsquo;s three verified routes are cross-checked across independent sources instead: car-rental and relocation-guide content from companies like Hertz and Property Finder that regularly quote these figures for practical trip-planning purposes, rather than a single government matrix.</p>
              <p>Abu Dhabi to Dubai (139km) and Dubai to Al Ain (146km) both come from at least two independently-published sources that converge on the same figure. Dubai to Al Ain is worth a specific note: Wikipedia&rsquo;s article on the E66 highway itself states a shorter 127.7km road length, but that almost certainly measures the highway&rsquo;s own start and end interchanges rather than the full city-centre-to-city-centre driving distance travel guides quote — a common pattern when a named highway doesn&rsquo;t start and end exactly at each city&rsquo;s downtown. This tool uses the city-to-city figure since it&rsquo;s what a road trip planner actually needs. Dubai to Sharjah (28km) is one of the most well-known short hops in the country and needed little cross-checking.</p>
              <p>Every other route in this tool&rsquo;s 14-town list — covering all 7 emirate capitals (Abu Dhabi, Dubai, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain) plus Al Ain, Khor Fakkan, Kalba, Dibba Al-Fujairah, Ar Ruways, Adh Dhayd, and Hatta — falls back to this tool&rsquo;s GPS-based estimate, using the Haversine correction factor calibrated against Nigeria&rsquo;s full verified road matrix.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on UAE Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              The UAE&rsquo;s highway network is generally excellent — wide, well-signed, and well-maintained. The main friction points are urban congestion rather than road quality: Sheikh Zayed Road through central Dubai and the approaches to Abu Dhabi during morning and evening rush hour can add significant time to what&rsquo;s otherwise a fast highway drive. Fuel prices in the UAE are reviewed and adjusted monthly by the Fuel Price Committee based on global oil markets, so the pump price used in the calculator above is worth double-checking against the current month&rsquo;s announced rate before budgeting a long trip. Mountain routes toward Fujairah and Khor Fakkan via Hatta and the Hajar Mountains are scenic but slower than their distance alone suggests, with winding sections through the mountain passes. As with any calculator, treat the figures here as a planning baseline and check current traffic conditions before travelling.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes cross-checked across independent car-rental and relocation-guide sources. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Abu Dhabi to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 13 other towns in this tool, closest to farthest from Abu Dhabi.</p>
            <DistanceTable hub={abuDhabi} towns={AE_TOWNS} verifiedMatrix={AE_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — UAE
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Abu Dhabi from Dubai?', a: 'About 139km via Sheikh Zayed Road (E11), typically a 1.5 hour drive.' },
                { q: 'How far is Dubai from Sharjah?', a: 'About 28km, one of the shortest and busiest inter-emirate commutes in the UAE.' },
                { q: 'How far is Dubai from Al Ain?', a: 'About 146km via the E66, typically 1.5-2 hours. The highway\'s own official length is a shorter 127.7km, likely measuring only its interchange-to-interchange span.' },
                { q: 'Is there an official UAE distance chart?', a: 'No. u.ae names the major highways but doesn\'t publish a distance chart; this tool\'s verified routes are cross-checked across independent sources instead.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (AED/litre) above; it converts road distance directly into estimated litres and cost.' },
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
