// app/tools/distance-calculator-india/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorIndiaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { IN_TOWNS, findTown } from '@/lib/distance-towns-in';
import { IN_CAPITAL_DISTANCE_KM } from '@/lib/in-distance-matrix';

export const metadata: Metadata = {
  title: 'Distance Calculator India 2026 — Road Distance Between Any Two Cities',
  description: 'Calculate road distance and drive time between 44 Indian cities — Delhi, Mumbai, Bengaluru, Chennai, Kolkata and more. Official NHAI highway lengths, drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator-india' },
  openGraph: {
    title: 'Distance Calculator India 2026 | Naira Autos',
    description: 'Road distance and drive time between 44 Indian cities, with a fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator-india',
  },
  keywords: [
    'distance calculator india', 'delhi to mumbai distance', 'mumbai to chennai distance',
    'india road distance calculator', 'fuel cost delhi to mumbai', 'bengaluru to chennai distance',
    'chennai to kolkata distance', 'golden quadrilateral distance',
  ],
};

const delhi = findTown('Delhi')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-india',
      name: 'Distance Calculator India 2026 — Road Distance Between Any Two Cities',
      description: 'Calculate road distance and drive time between 44 Indian cities, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator-india',
      dateModified: '2026-09-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'India', item: 'https://www.naira.autos/tools/distance-calculator-india' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How far is Delhi from Mumbai?', acceptedAnswer: { '@type': 'Answer', text: 'About 1,419km via NH-48, part of the Golden Quadrilateral - an official NHAI highway length. The under-construction Delhi-Mumbai Expressway will eventually cut this to around 1,350km with a much faster travel time.' } },
        { '@type': 'Question', name: 'Is there an official Indian government distance chart?', acceptedAnswer: { '@type': 'Answer', text: 'The NHAI doesn\'t publish a full city-to-city matrix, but it does document the official length of the Golden Quadrilateral\'s four segments connecting Delhi, Mumbai, Chennai, and Kolkata, used here directly.' } },
        { '@type': 'Question', name: 'How far is Chennai from Kolkata?', acceptedAnswer: { '@type': 'Answer', text: 'About 1,684km via NH-16, the longest single segment of the Golden Quadrilateral.' } },
        { '@type': 'Question', name: 'How far is Bengaluru from Chennai?', acceptedAnswer: { '@type': 'Answer', text: 'About 258km via the Bengaluru-Chennai Expressway, a newer official NHAI route.' } },
        { '@type': 'Question', name: 'Can I calculate fuel cost for my trip?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — pick a vehicle type and current pump price (₹/litre) in the calculator above. Petrol prices vary significantly by state in India due to differing VAT rates, so adjust the price to your actual route.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Distance Calculator India',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorIndiaPage() {
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
              <span className="text-white/60">🇮🇳 India</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 44 Cities</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 44 Indian cities — Delhi, Mumbai, Bengaluru, Chennai, Kolkata, and major state hubs.
            </p>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorIndiaClient />
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
              <p>India&rsquo;s National Highways Authority of India (NHAI) doesn&rsquo;t publish a full city-to-city distance matrix, but it built and maintains something arguably more useful for this tool: the Golden Quadrilateral, a network of national highways completed in 2001 that connects the country&rsquo;s four largest metros — Delhi, Mumbai, Chennai, and Kolkata — with an officially documented length for each segment. This tool uses all four directly: Chennai to Kolkata via NH-16 (1,684km, the longest single segment), Kolkata to Delhi via NH-19 and NH-44 (1,453km), Delhi to Mumbai via NH-48 (1,419km), and Mumbai to Chennai via NH-48 (1,290km).</p>
              <p>A fifth verified route, Bengaluru to Chennai (258km), comes from the newer Bengaluru-Chennai Expressway, another NHAI-documented project still being completed in phases through 2027. Every other route among this tool&rsquo;s 44 cities falls back to the Haversine-based GPS estimate, calibrated against Nigeria&rsquo;s full verified road matrix. The town list itself covers 12 major state-capital hubs plus 30 further major cities by population — Mumbai and Delhi&rsquo;s own metro-area satellite towns (Navi Mumbai, Thane, Ghaziabad, Faridabad, and similar) are deliberately excluded as redundant with their parent city.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Slows You Down on Indian Roads
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Even on the Golden Quadrilateral, much of the network runs through towns and cities rather than as a fully access-controlled expressway, meaning intersections, local traffic, and slower-moving vehicles routinely stretch travel time well beyond what the distance alone suggests — the classic Delhi-Mumbai route via old NH-48 can take 24-28 hours despite being &ldquo;only&rdquo; 1,419km. The new Delhi-Mumbai Expressway, once fully complete, is designed to cut that closer to 13 hours. Monsoon season (roughly June to September) can flood sections of highway across much of the country and add serious delays. Toll plazas are frequent on national highways, and keeping a FASTag topped up avoids long queues at each one. As with any calculator, treat the figures here as a planning baseline and check current road and weather conditions before a long trip.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Verified routes sourced from NHAI&rsquo;s official Golden Quadrilateral segment lengths and the Bengaluru-Chennai Expressway. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Delhi to Every City, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 43 other cities in this tool, closest to farthest from Delhi.</p>
            <DistanceTable hub={delhi} towns={IN_TOWNS} verifiedMatrix={IN_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — India
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Delhi from Mumbai?', a: 'About 1,419km via NH-48, part of the Golden Quadrilateral - an official NHAI highway length.' },
                { q: 'Is there an official Indian distance chart?', a: 'No full matrix, but NHAI documents the four official Golden Quadrilateral segments (Delhi-Mumbai-Chennai-Kolkata), used here directly.' },
                { q: 'How far is Chennai from Kolkata?', a: 'About 1,684km via NH-16, the longest single Golden Quadrilateral segment.' },
                { q: 'How far is Bengaluru from Chennai?', a: 'About 258km via the newer Bengaluru-Chennai Expressway, an official NHAI route.' },
                { q: 'Why does the Delhi-Mumbai drive take so long?', a: 'Much of NH-48 runs through towns rather than as a fully access-controlled expressway, so a 1,419km route can take 24-28 hours. The new Delhi-Mumbai Expressway aims to cut that to around 13 hours once complete.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick a vehicle type and current pump price (₹/litre) above. Prices vary significantly by state, so adjust to your actual route.' },
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
