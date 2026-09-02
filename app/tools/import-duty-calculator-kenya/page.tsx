import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react';
import ImportDutyKenyaClient from './client';

export const metadata: Metadata = {
  title: 'Kenya Car Import Duty Calculator 2026 — Free KRA CRSP Estimator',
  description: 'Calculate car import duty in Kenya free. Full breakdown of import duty, excise, VAT, IDF, and RDL for any used or new vehicle. Includes the 8-year import age rule. Updated 2026.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-duty-calculator-kenya' },
  openGraph: {
    title: 'Kenya Car Import Duty Calculator | Naira Autos',
    description: 'Free car import duty calculator for Kenya — KRA import duty, excise duty, VAT, IDF, RDL, and total landed cost.',
    url: 'https://www.naira.autos/tools/import-duty-calculator-kenya',
  },
  keywords: [
    'kenya car import duty calculator 2026',
    '8 year rule kenya vehicle import',
    'kra crsp toyota duty',
    'how much tax to import car from japan to kenya',
    'returning resident car import exemption kenya',
    'kenya import duty petrol vs electric car',
    'kebs inspection requirements used cars kenya',
    'total cost import car kenya',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-duty-calculator-kenya',
      name: 'Kenya Car Import Duty Calculator — Free KRA CRSP Estimator',
      description: 'Calculate car import duty in Kenya free. Get a full breakdown of import duty, excise, VAT, IDF, and RDL for any used or new car, plus the 8-year import age rule.',
      url: 'https://www.naira.autos/tools/import-duty-calculator-kenya',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Kenya', item: 'https://www.naira.autos/tools/import-duty-calculator-kenya' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much is car import duty in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Import duty is 25% of customs value on most official KRA pages, though some recent sources cite a 35% band — confirm with KRA for your HS code. On top of duty: excise (20–30% depending on engine size and fuel, on value+duty), 16% VAT, IDF (2.5–3.5%), and a 2% RDL. Total effective tax is often 60–90%+ of customs value.' } },
        { '@type': 'Question', name: 'What is the 8 year rule for importing cars into Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Kenya restricts used passenger vehicle imports to those less than 8 years old, counted from year of manufacture — in 2026, generally 2019 or newer. Vehicles must also be right-hand drive and pass KEBS pre-shipment inspection under KS 1515:2000.' } },
        { '@type': 'Question', name: 'What is KRA CRSP and how does it affect my import duty?', acceptedAnswer: { '@type': 'Answer', text: 'CRSP (Current Retail Selling Price) is KRA\'s schedule of new-vehicle prices by make and model, used with an age-based depreciation formula to set the taxable customs value — regardless of your actual invoice price. This often results in a higher assessed value than what you paid.' } },
        { '@type': 'Question', name: 'Are returning residents exempt from car import duty in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Returning residents can get one vehicle exempted from duty, excise, VAT and IDF if it was personally owned and used abroad for at least 12 months, shipped within about 90 days of return, and no similar exemption was used in the prior ~4 years. The RDL levy typically still applies.' } },
        { '@type': 'Question', name: 'Is import duty lower for electric cars in Kenya?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Electric vehicles get a preferential excise duty band of around 10%, compared to 20–30% for petrol and diesel vehicles of comparable size — a meaningful saving on top of the standard import duty, VAT, IDF and RDL that still apply.' } },
        { '@type': 'Question', name: 'How much does it cost to clear a car at Mombasa port?', acceptedAnswer: { '@type': 'Answer', text: 'KRA duties and taxes (roughly 60–90%+ of CRSP-based customs value) plus port handling, storage, and licensed clearing agent fees on top. Nearly all importers use a clearing agent given the complexity of CRSP valuation.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Kenya Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KES' },
    },
  ],
};

export default function ImportDutyCalculatorKenyaPage() {
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
              <span className="text-white/50">🇰🇪 Kenya</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rates: 2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: August 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Kenya Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will it cost to clear that car at Mombasa port?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Free car import duty calculator for Kenya. Enter your FOB value, engine size, fuel type, and manufacture year to get a full breakdown — import duty, excise duty, VAT, IDF, RDL, and total landed cost.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> KRA assesses duty on CRSP-based customs value, not invoice price, and official sources disagree on the exact duty band. Always verify with KRA or a licensed clearing agent before relying on this figure.
          </p>
        </div>
      </div>

      {/* ── Interactive calculator (client) ── */}
      <ImportDutyKenyaClient />

      {/* ── SEO content (server-rendered, Google sees this) ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Current Kenya Car Import Duty Rates (2026)
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              Kenya Revenue Authority (<a href="https://kra.go.ke" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">KRA</a>) taxes are layered — each one compounds on the running total, not on the base value alone. This is why total tax burden often reaches 60–90%+ of customs value.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Import Duty', rate: '25–35%', base: 'of customs value — verify', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Excise Duty', rate: '20–30%', base: 'of value + duty, by cc/fuel', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT', rate: '16%', base: 'of value + duty + excise', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'IDF + RDL', rate: '4.5–5.5%', base: 'of customs value, combined', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              <strong className="text-foreground">Verify:</strong> official KRA pages disagree on whether import duty is 25% or 35% — this may reflect an EAC-approved 2023 hike not yet reflected everywhere. Confirm your vehicle&apos;s HS code and rate directly with KRA.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  The 8-Year Import Age Rule
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Used passenger vehicles may only be imported if <strong className="text-foreground">less than 8 years old</strong>, counted from year of manufacture (or first registration) — in 2026, that means generally 2019 or newer. Vehicles must be <strong className="text-foreground">right-hand drive</strong>, with narrow exceptions (e.g. ambulances, fire tenders on government projects).</p>
                  <p>All used imports also require a <strong className="text-foreground">pre-shipment roadworthiness inspection</strong> under KEBS standard KS 1515:2000, arranged before the vehicle leaves the country of origin.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Who Is Exempt?
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Returning residents:</strong> one vehicle, personally owned and used abroad ≥12 months, shipped within roughly 90 days, no similar exemption in the prior ~4 years.</p>
                  <p><strong className="text-foreground">Persons with disabilities:</strong> one duty-free vehicle for personal use, with medical documentation and NCPWD registration.</p>
                  <p><strong className="text-foreground">Diplomats / first arrivals:</strong> broad exemptions for eligible personnel via protocol channels.</p>
                  <p className="text-xs">All exempted vehicles must still meet the age, RHD, and KEBS inspection rules — RDL typically still applies even when duty, excise, VAT and IDF are waived.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Step-by-Step: Importing a Car to Kenya
                </h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm eligibility — under 8 years old, right-hand drive, KEBS pre-shipment inspection booked.</li>
                  <li>Purchase and ship to Mombasa, Kenya&apos;s main vehicle-import port.</li>
                  <li>Engage a licensed clearing agent; lodge entry via KRA&apos;s iCMS with invoice, Bill of Lading, logbook, inspection certificate, and PIN.</li>
                  <li>KRA assesses the customs value against the CRSP schedule and calculates duty, excise, VAT, IDF and RDL.</li>
                  <li>Pay duties and taxes, then clear customs inspection and release.</li>
                  <li>Register with NTSA for plates and roadworthiness certification.</li>
                </ol>
                <p className="text-xs text-muted-foreground mt-3">For exemptions, pre-apply to KRA with supporting documents before shipping — approval is not automatic at the port.</p>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Reality Check
                </h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Enforcement of the 8-year rule and RHD requirement is generally strict at the port — non-compliant vehicles are typically rejected or seized. That said, some over-age or irregular vehicles do circulate domestically, often through fraudulent registration rather than legitimate import, which periodically triggers KRA crackdowns and public verification notices.</p>
                  <p>CRSP-based valuation frequently exceeds the actual invoice price, so budget for a higher-than-expected bill and possible valuation disputes. Because of this complexity, clearing through a licensed agent is close to universal rather than optional in practice.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Why the Rate Uncertainty Matters</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Amina was importing a 2,000cc petrol car with a KRA CRSP-based customs value of around $12,000. At the 25% duty band, layering excise, VAT, and IDF+RDL on top brought her total tax bill to roughly $10,350 — about 86% of customs value. At the 35% band, the same car came out closer to $12,090 — nearly 101%, effectively doubling the car's assessed value in tax alone. That's an almost $1,750 swing from one disputed rate figure. She confirmed her vehicle's exact HS code and rate directly with KRA before shipping rather than budgeting off either number blind.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Duty structure and clearing steps checked against real vehicle sourcing and clearing experience.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Kenya Car Import Duty — FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'How much is car import duty in Kenya?', a: 'Import duty is 25% of customs value per most KRA pages, though some sources cite 35%. Excise (20–30%), 16% VAT, IDF (2.5–3.5%), and 2% RDL apply on top — total effective tax often 60–90%+ of customs value.' },
                { q: 'What is the 8 year rule?', a: 'Used passenger vehicles must be less than 8 years old from year of manufacture — in 2026, generally 2019 or newer — plus right-hand drive and KEBS pre-shipment inspection.' },
                { q: 'What is KRA CRSP?', a: 'Current Retail Selling Price — KRA\'s schedule of new-vehicle prices by make/model, used with age-based depreciation to set your taxable customs value, regardless of your actual invoice.' },
                { q: 'Am I exempt as a returning resident?', a: 'One vehicle can be exempted from duty, excise, VAT and IDF if personally owned and used abroad ≥12 months, shipped within ~90 days, with no similar exemption in the prior ~4 years. RDL typically still applies.' },
                { q: 'Is duty lower for electric cars?', a: 'Yes — EVs get a preferential ~10% excise band versus 20–30% for petrol/diesel of similar size, on top of standard duty, VAT, IDF and RDL.' },
                { q: 'How much to clear a car at Mombasa port?', a: 'KRA duties and taxes (60–90%+ of CRSP-based customs value) plus port handling, storage and clearing agent fees. Nearly all importers use a licensed agent.' },
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

          {/* Related content: other countries + Nigeria */}
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
              <Link href="/tools/import-duty-calculator-south-africa" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">🇿🇦 South Africa</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
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
