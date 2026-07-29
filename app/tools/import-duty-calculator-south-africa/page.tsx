import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react';
import ImportDutySouthAfricaClient from './client';

export const metadata: Metadata = {
  title: 'South Africa Car Import Duty Calculator 2026 — SARS & ITAC Estimator',
  description: 'Calculate car import duty and check ITAC used-vehicle import eligibility for South Africa. Full breakdown of import duty, ad valorem excise, VAT, and NRCS fees. Updated 2026.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-duty-calculator-south-africa' },
  openGraph: {
    title: 'South Africa Car Import Duty Calculator | Naira Autos',
    description: 'Free car import duty calculator and ITAC eligibility checker for South Africa — SARS import duty, ad valorem excise, VAT, and NRCS fees.',
    url: 'https://www.naira.autos/tools/import-duty-calculator-south-africa',
  },
  keywords: [
    'can i import a used car to south africa 2026',
    'south africa car import duty calculator',
    'itac permit for importing vehicle south africa',
    'nrcs loa cost and process for car import',
    'total tax on imported car south africa vat duty',
    'left hand drive car import rules south africa',
    'returning resident import car duties sars',
    'ad valorem excise on luxury cars south africa',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-duty-calculator-south-africa',
      name: 'South Africa Car Import Duty Calculator — SARS & ITAC Estimator',
      description: 'Calculate car import duty and check ITAC used-vehicle import eligibility for South Africa. Full breakdown of import duty, ad valorem excise, VAT, and NRCS fees.',
      url: 'https://www.naira.autos/tools/import-duty-calculator-south-africa',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'South Africa', item: 'https://www.naira.autos/tools/import-duty-calculator-south-africa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I import a used car into South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Generally no, unless you fall into a narrow exempt category — returning resident (lived abroad 6+ months and owned the vehicle), immigrant with permanent residence, inheritance, vintage/collector vehicle (usually 40+ years old), track-only racing car, or disability-adapted vehicle. An ITAC import permit is required, and most applications outside these categories are refused.' } },
        { '@type': 'Question', name: 'How much is car import duty in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Standard import duty is 25% of customs value for most passenger vehicles, though it can be lower under trade agreements — around 18% under the EU agreement, or 0% for qualifying SADC-origin vehicles. Ad valorem excise (up to 30%, on a sliding scale) and 15% VAT also apply, plus an NRCS compliance fee.' } },
        { '@type': 'Question', name: 'What is an ITAC permit and how do I get one for a vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'ITAC (International Trade Administration Commission) issues import permits for used vehicles under the International Trade Administration Act. You must prove you qualify under one of the exempt categories, and most permits come with a condition against reselling the vehicle for around 2 years.' } },
        { '@type': 'Question', name: 'What is the NRCS Letter of Authority and how much does it cost?', acceptedAnswer: { '@type': 'Answer', text: 'The National Regulator for Compulsory Specifications (NRCS) issues a Letter of Authority confirming a vehicle meets South African safety and emissions standards. It costs roughly R1,800 per vehicle and is required before a vehicle can be registered, whether new or used.' } },
        { '@type': 'Question', name: 'What is ad valorem excise duty on cars in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'Ad valorem excise is a luxury-style tax on vehicles that rises with value on a sliding scale, capped at 30%. It applies on top of standard import duty and compounds into the VAT calculation, which is why total tax on higher-value imported vehicles can exceed 65% of value.' } },
        { '@type': 'Question', name: 'Is left-hand drive allowed in South Africa?', acceptedAnswer: { '@type': 'Answer', text: 'No — South Africa is a right-hand drive market and LHD vehicles are largely prohibited for road use, with a narrow exception for vehicles already registered in the country before around 2000.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'South Africa Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'ZAR' },
    },
  ],
};

export default function ImportDutyCalculatorSouthAfricaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/import-duty-calculator-countries" className="hover:text-white/60 transition-colors">Import Duty Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇿🇦 South Africa</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rates: 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              South Africa Car<br /><span className="text-emerald-400">Import Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Check ITAC eligibility, then calculate the full landed cost.</p>
            <p className="text-white/75 text-sm leading-relaxed">
              South Africa restricts most used vehicle imports to protect local manufacturing. This tool checks whether you likely qualify for an ITAC permit, then breaks down import duty, ad valorem excise, VAT, and NRCS compliance fees.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Ad valorem excise uses a reconstructed standard formula — confirm the exact figure with SARS. Used vehicle imports require an ITAC permit; approval outside the listed exemptions is very unlikely regardless of what this calculator shows.
          </p>
        </div>
      </div>

      {/* ── Interactive calculator (client) ── */}
      <ImportDutySouthAfricaClient />

      {/* ── SEO content (server-rendered, Google sees this) ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Current South Africa Car Import Rules (2026)
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              South Africa protects its local automotive manufacturing industry (APDP Phase II) by restricting used-vehicle imports almost entirely. New vehicles face standard duties without the permit requirement.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Import Duty', rate: '0–25%', base: 'of CIF, by origin', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Ad Valorem Excise', rate: '0–30%', base: 'sliding scale, verify formula', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT', rate: '15%', base: 'of Added Tax Value', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Used Import Permit', rate: 'ITAC', base: 'required, rarely granted', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/5', border: 'border-red-200 dark:border-red-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Also required for every vehicle: an NRCS Letter of Authority (~R1,800) confirming safety and emissions compliance. A carbon emissions levy may also apply based on CO2 g/km, not included in this calculator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Who Can Actually Import a Used Car?
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Unlike most African countries, South Africa has <strong className="text-foreground">no age ban</strong> on used imports — but it does effectively ban most used imports outright to protect local manufacturers (Toyota, VW, and others assembling locally under APDP Phase II).</p>
                  <p>An ITAC permit is only realistically available to: returning residents (lived abroad 6+ months, owned the vehicle), immigrants with permanent residence, inheritance cases, vintage/collector vehicles (typically 40+ years old), track-only racing cars, and disability-adapted vehicles — usually with a 2-year no-resale condition attached.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Right-Hand Drive Requirement
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Vehicles must be right-hand drive and hold an NRCS Letter of Authority proving compliance with SANS/ECE safety standards. Left-hand drive vehicles are largely prohibited for road use, with a narrow exception for vehicles already registered in South Africa before roughly 2000. From 1 June 2026, Temporary Import Permits (TIPs) became mandatory for all foreign-registered vehicles entering the country, including from other SACU states.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Step-by-Step: Importing a Car to South Africa
                </h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>If used, confirm ITAC eligibility and apply for a permit before shipping.</li>
                  <li>Obtain an NRCS Letter of Authority proving compliance (safety/emissions standards, RHD).</li>
                  <li>Ship the vehicle — used vehicles need the ITAC permit secured beforehand.</li>
                  <li>Register as an importer with SARS if required; lodge a SAD500 declaration at the port.</li>
                  <li>Pay duties, ad valorem excise and VAT via a licensed clearing agent.</li>
                  <li>Clear SARS and SAPS inspection, complete a roadworthy test.</li>
                  <li>Register the vehicle on eNaTIS/Natis.</li>
                </ol>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Reality Check
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Enforcement is strict — ITAC and SARS validation systems catch most non-compliant attempts, and permits outside the recognized categories are rarely granted. Grey-market imports do circulate, but they&apos;re illegal for road use and registration, and carry real risk of seizure and voided insurance.</p>
                  <p>Even where imports are technically permitted, total tax often makes them uncompetitive against buying locally — South Africa&apos;s duty structure is deliberately built to favor its domestic auto industry, so the math on a "bargain" import from abroad frequently doesn&apos;t work out once duty, ad valorem excise, and VAT stack together.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              South Africa Car Import — FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Can I import a used car into South Africa?', a: 'Generally no, unless you qualify under a narrow ITAC exemption — returning resident, immigrant with permanent residence, inheritance, vintage/collector (40+ years), racing car, or disability-adapted vehicle.' },
                { q: 'How much is import duty?', a: 'Standard duty is 25% of customs value, lower under trade agreements (~18% EU, 0% qualifying SADC origin). Ad valorem excise (up to 30%) and 15% VAT apply on top, plus a ~R1,800 NRCS fee.' },
                { q: 'What is an ITAC permit?', a: 'A required import permit for used vehicles under the International Trade Administration Act, granted only under specific exempt categories, usually with a 2-year no-resale condition.' },
                { q: 'What is the NRCS Letter of Authority?', a: 'Proof a vehicle meets South African safety/emissions standards, costing roughly R1,800 — required for registration whether the vehicle is new or used.' },
                { q: 'What is ad valorem excise duty?', a: 'A sliding-scale luxury tax on vehicles, capped at 30%, that compounds into the VAT calculation — a major reason total tax on higher-value imports can exceed 65%.' },
                { q: 'Is left-hand drive allowed?', a: 'No, with a narrow exception for vehicles already registered in South Africa before around 2000. RHD is required for standard import and registration.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Import Duty Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <Link href="/tools/import-duty-calculator" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">🇳🇬 Nigeria</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/import-duty-calculator-ghana" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">🇬🇭 Ghana</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/tools/import-duty-calculator-kenya" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-500/10 border border-orange-200 dark:border-orange-500/20 hover:bg-orange-100 dark:hover:bg-orange-500/20 transition-all">
                <p className="text-sm font-bold text-orange-700 dark:text-orange-400">🇰🇪 Kenya</p>
                <ChevronRight className="h-4 w-4 text-orange-500" />
              </Link>
              <Link href="/tools/import-duty-calculator-countries" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">See All Countries</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
