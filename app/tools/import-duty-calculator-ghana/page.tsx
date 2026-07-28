import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react';
import ImportDutyGhanaClient from './client';

export const metadata: Metadata = {
  title: 'Ghana Car Import Duty Calculator 2026 — Free GRA Customs Estimator',
  description: 'Calculate car import duty in Ghana free. Full breakdown of import duty, NHIL, GETFund, VAT, and overage penalty for any used or new vehicle. Updated for 2026 VAT reforms.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-duty-calculator-ghana' },
  openGraph: {
    title: 'Ghana Car Import Duty Calculator | Naira Autos',
    description: 'Free car import duty calculator for Ghana — GRA import duty, NHIL, GETFund levy, VAT, overage penalty, and total landed cost.',
    url: 'https://www.naira.autos/tools/import-duty-calculator-ghana',
  },
  keywords: [
    'ghana car import duty calculator 2026',
    'gra icums vehicle duty check',
    'overage penalty ghana vehicle how much',
    'can i import 15 year old car to ghana',
    'right hand drive car import ghana rules',
    'total cost importing used car tema port',
    'ghana import duty petrol vs diesel engine',
    'verify if car duties paid ghana buyer',
    'ghana customs duty on cars',
    'tema port clearing cost car',
  ].join(', '),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-duty-calculator-ghana',
      name: 'Ghana Car Import Duty Calculator — Free GRA Customs Estimator',
      description: 'Calculate car import duty in Ghana free. Get a full breakdown of import duty, NHIL, GETFund, VAT, and overage penalty for any used or new car.',
      url: 'https://www.naira.autos/tools/import-duty-calculator-ghana',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Ghana', item: 'https://www.naira.autos/tools/import-duty-calculator-ghana' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much is car import duty in Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Import duty on cars in Ghana ranges 5–20% of CIF value depending on engine size and fuel type. Added to this are NHIL and GETFund (2.5% each), VAT (15%), AU/ECOWAS/EXIM levies, and a Special Import Levy — plus an overage penalty of 5–50% of CIF for vehicles over 10 years old. Total effective cost is often 30–50%+ of CIF.' } },
        { '@type': 'Question', name: 'What is the overage penalty in Ghana and how much is it?', acceptedAnswer: { '@type': 'Answer', text: 'Vehicles more than 10 years old (by manufacture date, not registration) attract an overage penalty on top of standard duty. For cars, SUVs and motorcycles: 5% of CIF for 10–12 years, 20% for 12–15 years, and 50% for over 15 years. Trucks and commercial vehicles have separate, generally lower bands.' } },
        { '@type': 'Question', name: 'Can I import a 15 year old car into Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — Ghana has no hard age ban on most vehicle categories, but a car manufactured more than 15 years ago attracts the maximum overage penalty of 50% of CIF value on top of standard duty, which usually makes it the most expensive band to clear.' } },
        { '@type': 'Question', name: 'Can I import a right-hand drive car into Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Right-hand drive vehicles are generally prohibited in Ghana. Left-hand drive is required for standard import, though limited ministerial dispensation exists in some cases, often requiring conversion to left-hand drive before the vehicle can be registered.' } },
        { '@type': 'Question', name: 'How do I verify GRA ICUMS vehicle duty for a car by VIN?', acceptedAnswer: { '@type': 'Answer', text: 'The Ghana Revenue Authority runs duty checks through the ICUMS/UNIPASS platform, where VIN, make, model, and year are used to classify and value a vehicle. Buyers of already-imported used cars should verify duty was paid through ICUMS and physically check the chassis number against the paperwork.' } },
        { '@type': 'Question', name: 'What is the total cost of clearing a car at Tema port?', acceptedAnswer: { '@type': 'Answer', text: 'Total clearing cost combines GRA duties and levies (roughly 30–50%+ of CIF depending on age and engine size) with port handling and licensed clearing agent fees on top. Using a licensed agent is recommended for accuracy and to avoid delays.' } },
        { '@type': 'Question', name: 'Does engine size affect import duty in Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. For petrol cars, duty is 5% up to 1000cc, 10% from 1001–3000cc, and 20% above 3000cc. For diesel cars, the bands are 5% up to 1500cc, 10% from 1501–2500cc, and 20% above 2500cc.' } },
        { '@type': 'Question', name: 'Are any vehicles exempt from the overage penalty in Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Ambulances and agricultural tractors are generally exempt from the overage penalty. Salvaged, flooded, or accident-damaged vehicles are prohibited from import regardless of age or exemption status.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Ghana Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GHS' },
    },
  ],
};

export default function ImportDutyCalculatorGhanaPage() {
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
              <span className="text-white/50">🇬🇭 Ghana</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rates: 2026 (post-VAT reform)</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Ghana Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will it cost to clear that car at Tema or Takoradi port?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Free car import duty calculator for Ghana. Enter your FOB value, freight, engine size, and manufacture year to get a full breakdown — import duty, NHIL, GETFund, VAT, overage penalty, and total landed cost.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Final duty is assessed by GRA on the ICUMS/UNIPASS platform and can differ based on valuation and vehicle condition at physical examination. Always verify with a licensed clearing agent.
          </p>
        </div>
      </div>

      {/* ── Interactive calculator (client) ── */}
      <ImportDutyGhanaClient />

      {/* ── SEO content (server-rendered, Google sees this) ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Current Ghana Car Import Duty Rates (2026)
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              Ghana Revenue Authority (GRA) charges import duty under the ECOWAS Common External Tariff, plus several flat-rate levies on every vehicle cleared through Tema or Takoradi port.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Import Duty', rate: '5–20%', base: 'of CIF, by cc & fuel', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'NHIL + GETFund', rate: '5%', base: 'of CIF + Duty', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT', rate: '15%', base: 'of CIF + Duty + NHIL + GETFund', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Overage Penalty', rate: '0–50%', base: 'of CIF, by age & type', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/5', border: 'border-red-200 dark:border-red-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Also applied on CIF: AU Levy (0.2%), ECOWAS Levy (0.5%), EXIM Levy (0.75%), Special Import Levy (~2%), and a 1% Examination Fee on used vehicles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Overage Penalty Bands by Vehicle Type
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3 font-bold">Vehicle Age</th>
                        <th className="py-2 pr-3 font-bold">Cars / SUVs / Motorcycles</th>
                        <th className="py-2 pr-3 font-bold">Pick-ups / Vans / Buses</th>
                        <th className="py-2 font-bold">Trucks / Lorries</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr className="border-b border-border/50"><td className="py-2 pr-3">≤10 years</td><td className="py-2 pr-3">0%</td><td className="py-2 pr-3">0%</td><td className="py-2">0%</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2 pr-3">10–12 years</td><td className="py-2 pr-3">5%</td><td className="py-2 pr-3">2.5%</td><td className="py-2">5%</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2 pr-3">12–15 years</td><td className="py-2 pr-3">20%</td><td className="py-2 pr-3">20%</td><td className="py-2">10% (to 22y)</td></tr>
                      <tr><td className="py-2 pr-3">Over 15 / 22 years</td><td className="py-2 pr-3">50%</td><td className="py-2 pr-3">50%</td><td className="py-2">30%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">Ambulances and agricultural tractors are exempt from the overage penalty. Age is measured from manufacture date, not registration date.</p>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Right-Hand Drive &amp; Prohibited Imports
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Ghana generally <strong className="text-foreground">prohibits right-hand drive (RHD)</strong> vehicles for import — left-hand drive is required, with limited ministerial dispensation available in some cases, often requiring conversion before registration.</p>
                  <p><strong className="text-foreground">Salvaged, flooded, or accident-damaged vehicles</strong> are prohibited outright, regardless of age or CIF value. Vehicle condition is checked against Ghana Standards Authority (GSA) DGS 4510:2022 at physical examination.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Step-by-Step: Clearing a Car in Ghana
                </h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Purchase the vehicle and obtain title, invoice, and full specs (make, model, manufacture year).</li>
                  <li>Ship the vehicle and secure the Bill of Lading, plus pre-shipment inspection where required.</li>
                  <li>Run a pre-check on ICUMS/UNIPASS using VIN, make, model, and year to estimate duty.</li>
                  <li>On arrival, submit documents to GRA Customs at the port (IDF, invoice, Bill of Lading).</li>
                  <li>GRA classifies and values the vehicle — engine size, HS code, and age all affect the assessment.</li>
                  <li>Pay duties and levies, then clear the physical examination at Tema or Takoradi.</li>
                  <li>Register the vehicle with the DVLA to get plates and complete ownership transfer.</li>
                </ol>
                <p className="text-xs text-muted-foreground mt-3">Using a licensed clearing agent is strongly recommended — most importers do not clear vehicles themselves.</p>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Ghana vs Nigeria — Quick Comparison
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="text-left text-muted-foreground border-b border-border">
                        <th className="py-2 pr-3 font-bold"></th>
                        <th className="py-2 pr-3 font-bold">🇬🇭 Ghana</th>
                        <th className="py-2 font-bold">🇳🇬 Nigeria</th>
                      </tr>
                    </thead>
                    <tbody className="text-foreground">
                      <tr className="border-b border-border/50"><td className="py-2 pr-3 text-muted-foreground">Base import duty</td><td className="py-2 pr-3">5–20% (by cc/fuel)</td><td className="py-2">20% flat</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2 pr-3 text-muted-foreground">Age restriction</td><td className="py-2 pr-3">No hard ban; penalty &gt;10y</td><td className="py-2">12-year hard limit</td></tr>
                      <tr className="border-b border-border/50"><td className="py-2 pr-3 text-muted-foreground">RHD allowed</td><td className="py-2 pr-3">Generally no</td><td className="py-2">Yes (Nigeria drives right)</td></tr>
                      <tr><td className="py-2 pr-3 text-muted-foreground">Effective total</td><td className="py-2 pr-3">~30–50%+ of CIF</td><td className="py-2">~42–49% of CIF</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Importing to Nigeria instead? Use the <Link href="/tools/import-duty-calculator" className="text-foreground underline underline-offset-2">Nigeria Import Duty Calculator</Link>.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Ghana Car Import Duty — FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'How much is car import duty in Ghana?', a: 'Import duty is 5–20% of CIF depending on engine size and fuel type, plus NHIL and GETFund (2.5% each), 15% VAT, several small flat levies, and an overage penalty of 5–50% for vehicles over 10 years old. Total effective cost is often 30–50%+ of CIF.' },
                { q: 'What is the overage penalty and how much is it?', a: 'A penalty on top of standard duty for vehicles over 10 years old (by manufacture date). For cars, SUVs and motorcycles: 5% (10–12y), 20% (12–15y), 50% (over 15y) of CIF.' },
                { q: 'Can I import a 15-year-old car into Ghana?', a: 'Yes, there\'s no hard age ban for most categories, but a vehicle over 15 years old attracts the maximum 50% overage penalty on CIF value — often the most expensive band to clear.' },
                { q: 'Is right-hand drive allowed in Ghana?', a: 'Generally no. Left-hand drive is required for standard import; RHD needs rare ministerial dispensation, often with a conversion requirement.' },
                { q: 'How do I check duty paid on ICUMS by VIN?', a: 'GRA\'s ICUMS/UNIPASS platform lets you check classification and duty status using the vehicle\'s VIN, make, model, and year. Buyers of used imports should verify this plus a physical chassis check before paying.' },
                { q: 'What\'s the total cost to clear a car at Tema port?', a: 'GRA duties and levies (roughly 30–50%+ of CIF) plus port handling and clearing agent fees on top. A licensed agent is recommended for accuracy.' },
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

          {/* Related content: other countries + Nigeria (no Nigeria-specific tool cross-links here) */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Import Duty Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/import-duty-calculator" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">🇳🇬 Nigeria Import Duty Calculator</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
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
