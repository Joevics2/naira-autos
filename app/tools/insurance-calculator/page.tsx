// app/tools/insurance-calculator/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import InsuranceQuoteClient from './client';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Insurance Calculator Nigeria 2026 — Third Party & Comprehensive Rates',
  description: 'Calculate estimated car insurance premiums in Nigeria. See NAICOM-regulated third party rates (₦15,000/year) and comprehensive coverage estimates (5–7% of car value). Compare Leadway, AIICO, AXA Mansard, Custodian and more.',
  alternates: { canonical: 'https://www.naira.autos/tools/insurance-calculator' },
  openGraph: {
    title: 'Car Insurance Calculator Nigeria 2026 | Naira Autos',
    description: 'Estimate your car insurance premium in Nigeria. Third party starts at ₦15,000/year. Comprehensive is 5–7% of car value. See rates, what is covered, and links to get quotes from top Nigerian insurers.',
    url: 'https://www.naira.autos/tools/insurance-calculator',
  },
  keywords: [
    'car insurance nigeria 2025','car insurance calculator nigeria','how much is car insurance nigeria',
    'third party insurance nigeria price','comprehensive car insurance nigeria cost',
    'NAICOM car insurance rates','leadway car insurance','aiico car insurance',
    'axa mansard car insurance nigeria','best car insurance nigeria',
    'third party insurance price nigeria','car insurance premium nigeria',
    'how much is third party insurance nigeria','comprehensive vs third party nigeria',
    'car insurance quote nigeria','cheapest car insurance nigeria',
    'motor insurance nigeria rates','vehicle insurance cost nigeria 2025',
    'cheap car insurance quotes nigeria','compare car insurance nigeria',
    'insurance premium estimate nigeria','naicom comprehensive motor insurance premium percentage',
    'negotiate best insurance rate nigeria','get insurance quote nigeria',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/insurance-calculator',
      name: 'Car Insurance Calculator Nigeria 2026 — Third Party & Comprehensive Rates',
      description: 'Estimate car insurance premiums in Nigeria based on NAICOM-regulated rates. Third party at ₦15,000/year, comprehensive at 5–7% of vehicle value.',
      url: 'https://www.naira.autos/tools/insurance-calculator',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Insurance Calculator', item: 'https://www.naira.autos/tools/insurance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/insurance-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much is third party car insurance in Nigeria 2025?',
          acceptedAnswer: { '@type': 'Answer', text: 'As of 2025, the NAICOM-regulated minimum third party motor insurance premium for private vehicles in Nigeria is ₦15,000 per year. This rate was set effective January 1, 2023 and covers third-party property damage up to ₦3 million. The rate is fixed across all NAICOM-licensed insurers — no insurer is permitted to charge less than ₦15,000 for a private car. Commercial vehicles, staff buses, and special-type vehicles have different rate schedules.' }
        },
        {
          '@type': 'Question',
          name: 'How much is comprehensive car insurance in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Comprehensive car insurance in Nigeria is calculated as a percentage of the vehicle\'s insured value. The NAICOM minimum rate is 5% of the sum insured per year. Most insurers charge between 5% and 7% depending on the car\'s age, usage, and location. For a car valued at ₦5 million, this means an annual premium of ₦250,000–₦350,000. For a ₦10 million vehicle, expect ₦500,000–₦700,000 per year. Newer cars and cars in high-theft areas attract higher rates.' }
        },
        {
          '@type': 'Question',
          name: 'What is the difference between third party and comprehensive car insurance in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Third party insurance covers damage or injury you cause to other people and their property — it does not cover your own vehicle. It is the legal minimum required to drive in Nigeria and costs ₦15,000/year for private cars. Comprehensive insurance covers everything in third party plus damage to your own vehicle from accidents, theft, fire, flood, and vandalism. It is significantly more expensive (5–7% of vehicle value per year) but provides full financial protection. For vehicles worth ₦3 million or more, comprehensive cover is generally the better financial decision.' }
        },
        {
          '@type': 'Question',
          name: 'Which car insurance company is best in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'The top-rated car insurance companies in Nigeria are Leadway Assurance, AIICO Insurance, AXA Mansard, Custodian Investment, and Coronation Insurance. Leadway is widely regarded as the market leader with the strongest digital presence and claims settlement record. AIICO and Custodian are strong alternatives, particularly for commercial vehicles. All insurers must be licensed by NAICOM — verify any insurer at naicom.gov.ng before purchasing a policy.' }
        },
        {
          '@type': 'Question',
          name: 'Is third party insurance enough for my car in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Third party insurance at ₦15,000/year meets the legal requirement but provides no protection for your own vehicle. For cars worth less than ₦2 million, third party may be sufficient — the cost of comprehensive cover might approach 10–15% of the car\'s value annually, which is difficult to justify. For cars worth ₦3 million or more, comprehensive insurance is strongly recommended — a single theft or major accident would result in a loss far exceeding the annual comprehensive premium. If your car is financed through a bank or auto loan, comprehensive cover is almost certainly required by the lender.' }
        },
        {
          '@type': 'Question',
          name: 'How do I verify my car insurance policy in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Always verify car insurance in Nigeria through the Nigerian Insurance Industry Database (NIID) at www.askniid.org or by dialling *565*11# on your mobile phone. Enter your vehicle registration number to confirm your policy is active and genuine. Fake insurance certificates are common in Nigeria — roadside vendors often sell fraudulent documents. Only purchase insurance from NAICOM-licensed companies and verify the policy immediately after purchase.' }
        },
        {
          '@type': 'Question',
          name: 'How do I compare cheap car insurance quotes in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Start with this calculator to get an estimated premium range based on NAICOM rates, then request quotes from 2–3 licensed insurers such as Leadway, AIICO, AXA Mansard, or Custodian using that range as a benchmark. Any quote below the NAICOM minimum — ₦15,000 third party or 5% of sum insured for comprehensive — should be treated as a red flag rather than a genuine bargain.' }
        },
      ],
    },
  ],
};

// Major Nigerian insurers with direct quote links — moved inside as const (no export)
const INSURERS = [
  {
    name: 'Leadway Assurance',
    logo: '🛡️',
    tagline: 'Market leader, strongest digital presence',
    thirdParty: true,
    comprehensive: true,
    rating: '5% of vehicle value (min)',
    strength: 'Best claims settlement record, flood cover included',
    quoteUrl: 'https://www.leadway.com/motor-insurance',
    color: 'blue',
  },
  {
    name: 'AIICO Insurance',
    logo: '🛡️',
    tagline: 'Competitive rates, fast digital quotes',
    thirdParty: true,
    comprehensive: true,
    rating: '5–6% of vehicle value',
    strength: 'Good for both private and commercial vehicles',
    quoteUrl: 'https://www.aiicoplc.com/motor-insurance',
    color: 'emerald',
  },
  {
    name: 'AXA Mansard',
    logo: '🛡️',
    tagline: 'International backing, strong service',
    thirdParty: true,
    comprehensive: true,
    rating: '5–7% of vehicle value',
    strength: 'Strong roadside assistance, international parent',
    quoteUrl: 'https://www.axamansard.com/personal/motor',
    color: 'red',
  },
  {
    name: 'Custodian Insurance',
    logo: '🛡️',
    tagline: 'Higher third-party limits, good for commercial',
    thirdParty: true,
    comprehensive: true,
    rating: '5–6% of vehicle value',
    strength: 'Higher TPPD limits — good for commercial/fleet use',
    quoteUrl: 'https://www.custodianplc.com.ng/motor-insurance',
    color: 'amber',
  },
  {
    name: 'Coronation Insurance',
    logo: '🛡️',
    tagline: 'Premium cover with useful add-ons',
    thirdParty: true,
    comprehensive: true,
    rating: '5–7% of vehicle value',
    strength: 'Premium Moov Prestige plan with extra riders',
    quoteUrl: 'https://coronationinsurance.com.ng/motor',
    color: 'violet',
  },
  {
    name: 'NEM Insurance',
    logo: '🛡️',
    tagline: 'Established insurer, competitive pricing',
    thirdParty: true,
    comprehensive: true,
    rating: '5% of vehicle value (min)',
    strength: 'Competitive rates, strong national presence',
    quoteUrl: 'https://www.neminsurance.net',
    color: 'slate',
  },
];

export default function InsuranceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── DARK HERO ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          {/* Breadcrumb + back */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools/insurance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-violet-500/20 border border-white/15 hover:border-violet-500/40 text-white/60 hover:text-violet-400 transition-all"
              aria-label="Back to Insurance Calculator"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/insurance-calculator-countries" className="hover:text-white/60 transition-colors">Insurance Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇳🇬 Nigeria</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-violet-400 uppercase tracking-widest">Free Estimate</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: August 2026</span>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Car Insurance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Estimate your annual car insurance premium in Nigeria based on NAICOM-regulated rates. Third party starts at ₦15,000/year. Comprehensive is 5–7% of your car's value.
            </p>
          </div>

          {/* Interactive tool */}
          <InsuranceQuoteClient />
        </div>
      </div>

      {/* ── WHITE CONTENT ── */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Insurer directory */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Top Car Insurers in Nigeria — Get a Quote
            </h2>
            <p className="text-sm text-gray-500 mb-6">All insurers below are NAICOM-licensed. Click "Get Quote" to go directly to their quote page.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {INSURERS.map((ins) => (
                <div key={ins.name} className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                  <div>
                    <p className="text-base font-black text-gray-900">{ins.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{ins.tagline}</p>
                  </div>
                  <div className="space-y-1 text-xs text-gray-600">
                    <p><span className="font-semibold text-gray-700">Comprehensive:</span> {ins.rating}</p>
                    <p><span className="font-semibold text-gray-700">Third Party:</span> ₦15,000/year (NAICOM fixed)</p>
                    <p><span className="font-semibold text-gray-700">Strength:</span> {ins.strength}</p>
                  </div>
                  <a
                    href={ins.quoteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg bg-gray-900 hover:bg-gray-700 transition-colors text-white text-xs font-bold"
                  >
                    <span>Get Quote from {ins.name.split(' ')[0]}</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Always verify your policy at{' '}
              <a href="https://www.askniid.org" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">askniid.org</a>
              {' '}or dial *565*11# after purchase. Do not buy insurance from roadside vendors.
            </p>
          </div>

          {/* Guide — Third party vs comprehensive */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Third Party vs Comprehensive — Which Should You Buy?
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Third party insurance</strong> is the legal minimum required to drive in Nigeria. It costs a NAICOM-fixed ₦15,000 per year for private cars and covers up to ₦3 million in damage or injury you cause to a third party. What it does not cover is any damage to your own vehicle — if your car is stolen, written off in an accident, or destroyed by fire, third party insurance pays out nothing for your loss.
                </p>
                <p>
                  The decision between third party and comprehensive is primarily a function of your car's value. For cars worth under ₦2 million, comprehensive premiums can approach 10–15% of the vehicle's market value per year — this is difficult to justify for an older car approaching end-of-useful-life. For these vehicles, third party is typically the rational choice, and any savings should be put toward a vehicle replacement fund.
                </p>
                <p>
                  For cars worth ₦3 million or more, the calculation changes significantly. A comprehensive premium of 5% on a ₦5 million car is ₦250,000 per year. A single theft — and vehicle theft rates are significant in Lagos and Abuja — would result in a ₦5 million loss. The annual premium pays for itself in less than two months of risk coverage. For cars financed through an auto loan, the lending bank will almost certainly require comprehensive cover as a condition of the loan.
                </p>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Third party, fire and theft</strong> is a middle-ground option offered by most Nigerian insurers. It adds fire damage and vehicle theft coverage on top of the basic third party, at a lower cost than full comprehensive. It does not cover accidental collision damage to your own car. This is a reasonable choice for cars in the ₦2M–₦4M range where full comprehensive premiums feel high but the theft risk is real.
                </p>
                <p>
                  When buying comprehensive insurance, look carefully at what additional riders are included. Flood cover is particularly important for Lagos and other flood-prone Nigerian cities — not all comprehensive policies include it automatically. Roadside assistance and towing cover (typically up to ₦50,000–₦100,000) is included by most major insurers. Personal accident benefit for the driver is another common inclusion.
                </p>
                <p>
                  Use our{' '}
                  <Link href="/tools/car-comparison" className="text-violet-600 hover:underline">Car Comparison Tool</Link>
                  {' '}to look up the value range of your specific car model, then use the calculator above to estimate your annual premium. Factor insurance into your total annual ownership cost alongside fuel, maintenance, and registration fees.
                </p>
              </div>
            </div>
          </div>

          {/* Rate table */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              NAICOM Motor Insurance Rate Schedule 2025
            </h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-bold text-gray-700">Vehicle Category</th>
                    <th className="text-right px-4 py-3 font-bold text-gray-700">Annual Premium</th>
                    <th className="text-right px-4 py-3 font-bold text-gray-700">TPPD Cover Limit</th>
                    <th className="text-left px-4 py-3 font-bold text-gray-700">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { cat: 'Private Car', premium: '₦15,000/yr', cover: '₦3,000,000', note: 'NAICOM fixed minimum — all insurers' },
                    { cat: 'Private Car (own goods)', premium: '₦20,000/yr', cover: '₦3,000,000', note: 'For cars used to transport personal goods' },
                    { cat: 'Staff Bus', premium: '₦20,000/yr', cover: '₦3,000,000', note: 'Company-operated staff transport' },
                    { cat: 'Commercial Truck / Cartage', premium: '₦100,000/yr', cover: '₦5,000,000', note: 'Logistics, haulage, general cartage' },
                    { cat: 'Special Type Vehicle', premium: '₦20,000/yr', cover: '₦3,000,000', note: 'Ambulances, fire trucks, etc.' },
                    { cat: 'Tricycle (Keke Napep)', premium: '₦5,000/yr', cover: '₦2,000,000', note: '' },
                    { cat: 'Motorcycle (Okada)', premium: '₦3,000/yr', cover: '₦1,000,000', note: '' },
                    { cat: 'Comprehensive — Any Vehicle', premium: 'Min 5% of sum insured', cover: 'Full vehicle value + TPPD', note: 'After all rebates and discounts per NAICOM' },
                  ].map((r, i) => (
                    <tr key={r.cat} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <td className="px-4 py-3 font-medium text-gray-900">{r.cat}</td>
                      <td className="px-4 py-3 text-right font-semibold text-violet-700">{r.premium}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{r.cover}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Source: <a href="https://naicom.gov.ng" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">NAICOM</a> circular on New Motor Insurance Premium Rates, effective January 1, 2023.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: When Comprehensive Pays for Itself</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">Ngozi was deciding between third party and comprehensive on her ₦4.5 million Toyota Camry. Third party cost ₦15,000/year but covered nothing if the car itself was damaged. Comprehensive at 6% came to ₦270,000/year — eighteen times more. Six months in, someone reversed into her car in a parking lot and drove off; the repair estimate came to ₦620,000. Her comprehensive policy covered it in full, minus a small excess. The ₦270,000 premium had already paid for itself more than twice over from a single incident that had nothing to do with her own driving.</p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. Rate figures checked against current NAICOM-published minimums.
          </p>

          {/* FAQ */}
          <div>
            <h2
              className="text-xl font-black uppercase text-gray-900 mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Car Insurance FAQ — Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                {
                  q: 'How much is third party car insurance in Nigeria 2025?',
                  a: '₦15,000 per year for private cars. This is the NAICOM-regulated minimum effective January 2023 and covers third-party property damage up to ₦3 million. The rate is the same across all licensed insurers.',
                },
                {
                  q: 'How much is comprehensive car insurance in Nigeria?',
                  a: 'Minimum 5% of the vehicle\'s insured value per year, per NAICOM regulations. Most insurers charge 5–7%. On a ₦5 million car that is ₦250,000–₦350,000/year. On a ₦10 million car, ₦500,000–₦700,000/year.',
                },
                {
                  q: 'What is the difference between third party and comprehensive insurance?',
                  a: 'Third party covers damage you cause to others — not your own vehicle. Comprehensive covers your vehicle too (theft, accident, fire, flood, vandalism). For cars worth ₦3M+, comprehensive is the better financial choice.',
                },
                {
                  q: 'Which car insurance company is best in Nigeria?',
                  a: 'Top-rated: Leadway Assurance (market leader, best digital tools), AIICO Insurance, AXA Mansard, Custodian Investment, and Coronation Insurance. All must be NAICOM-licensed — verify at naicom.gov.ng.',
                },
                {
                  q: 'Is third party insurance enough for my car?',
                  a: 'For cars under ₦2M, third party is often sufficient — comprehensive premiums can be 10–15% of value annually. For cars ₦3M+, comprehensive is strongly recommended. Bank-financed cars almost always require comprehensive.',
                },
                {
                  q: 'How do I verify my car insurance policy in Nigeria?',
                  a: 'Visit askniid.org or dial *565*11# and enter your vehicle registration number. Always verify after purchase — fake insurance certificates are common. Only buy from NAICOM-licensed insurers.',
                },
                {
                  q: 'How do I compare cheap car insurance quotes in Nigeria?',
                  a: 'Use this calculator to get an estimated premium range first, then request quotes from 2–3 NAICOM-licensed insurers (e.g. Leadway, AIICO, AXA Mansard, Custodian) using that range as a benchmark — quotes below the NAICOM minimum (₦15,000 third party, 5% comprehensive) should be treated as a red flag, not a bargain.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <RelatedTools tool="insurance-calculator" />

        </div>
      </div>
    </>
  );
}