import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react';
import ImportDutyClient from './client';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Nigeria Car Import Duty Calculator — Free Vehicle Import Tax Estimator',
  description: 'Calculate car import duty in Nigeria free. Full breakdown of customs duty, NAC levy, Green Tax, FOB levy, and VAT for any Tokunbo or new car. Updated July 2026.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-duty-calculator' },
  openGraph: {
    title: 'Nigeria Car Import Duty Calculator | Naira Autos',
    description: 'Free car import duty calculator for Nigeria — customs duty, NAC levy, Green Tax, FOB levy, VAT, and total landed cost.',
    url: 'https://www.naira.autos/tools/import-duty-calculator',
  },
  keywords: ['import duty on cars in nigeria','custom duty on cars in nigeria','car import duty in nigeria','how much is custom duty for cars in nigeria','custom duty on used cars in nigeria','current import duty on cars in nigeria','nigeria vehicle import duty reduction','car duty price in nigeria','nigeria car custom duty calculator','nigeria customs duty rates on imported cars','cost of clearing cars in nigeria 2026','car import duty calculator','nac levy nigeria','green tax nigeria vehicle import'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-duty-calculator',
      name: 'Nigeria Car Import Duty Calculator — Free Vehicle Import Tax Estimator',
      description: 'Calculate car import duty in Nigeria free. Get a full breakdown of customs duty, NAC levy, FOB levy, and VAT for any Tokunbo or new car.',
      url: 'https://www.naira.autos/tools/import-duty-calculator',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/import-duty-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much is car import duty in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Car import duty in Nigeria for used passenger vehicles (Tokunbo) is 20% of CIF value. Added to this are a 5% NAC levy (halved from 15% effective 1 July 2026), a 4% FOB levy, a 0–4% Green Tax Surcharge based on engine size, and 7.5% VAT — an effective total of roughly 35–45% of CIF value before port and agent fees.' } },
        { '@type': 'Question', name: 'What is the cost of importing a car to Nigeria in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'For a $10,000 FOB car with $1,500 freight, total customs duty and taxes at July 2026 rates comes to approximately ₦4–5 million at current exchange rates, before agent and terminal fees — less than under the pre-July-2026 rates due to the halved NAC levy.' } },
        { '@type': 'Question', name: 'What is CIF value for car import duty in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'CIF stands for Cost, Insurance, and Freight. Nigeria Customs calculates import duty on CIF value — your purchase price (FOB) plus shipping cost plus marine insurance. NCS may use a higher internal valuation.' } },
        { '@type': 'Question', name: 'What is the NAC levy on car imports in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'The National Automotive Council (NAC) levy is 5% of CIF for used (Tokunbo) vehicles and 10% for brand new cars, effective 1 July 2026 (halved from 15%/20%). It is charged in addition to the 20% import duty.' } },
        { '@type': 'Question', name: 'What is the Green Tax Surcharge on car imports in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'The Green Tax Surcharge, effective 1 July 2026 under the 2026 Fiscal Policy Measures, is an environmental levy based on engine size: 0% below 2,000cc, 2% for 2,000–3,999cc, and 4% for 4,000cc and above, calculated on CIF value. Electric vehicles and mass transit buses are exempt.' } },
        { '@type': 'Question', name: 'How does VAT apply to imported cars in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'VAT on imported cars is 7.5% of the combined base of CIF value + import duty + NAC levy + Green Tax Surcharge — not on CIF alone. This compounding effect means VAT adds more than a simple 7.5% of the car price.' } },
        { '@type': 'Question', name: 'Can NCS charge more than my invoice price?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. NCS maintains an internal vehicle valuation database and routinely overrides the declared CIF with a higher assessed value — sometimes 20–50% above your invoice. The sensitivity slider in the calculator lets you model this.' } },
        { '@type': 'Question', name: 'What documents do I need to clear a car at the Nigerian port?', acceptedAnswer: { '@type': 'Answer', text: 'Core documents: Form M (CBN forex approval), Bill of Lading, commercial invoice, packing list, Single Goods Declaration (SGD), and proof of payment. A licensed clearing agent handles this process.' } },
        { '@type': 'Question', name: 'How much does it cost to clear a car at Lagos port?', acceptedAnswer: { '@type': 'Answer', text: 'Total clearing cost combines customs duty and taxes (roughly 42–49% of CIF value) with terminal handling, shipping line release, and clearing agent charges, which typically add ₦300,000–₦800,000 on top of the customs bill depending on vehicle size and port congestion.' } },
        { '@type': 'Question', name: 'Has Nigeria reduced car import duty recently?', acceptedAnswer: { '@type': 'Answer', text: 'Nigeria periodically reviews vehicle import duty rates as part of the National Automotive Industry Development Plan. Always confirm the current rate with Nigeria Customs Service before relying on older figures, since this calculator is updated when official rate changes are confirmed.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Nigeria Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function ImportDutyCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/import-duty-calculator-countries" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/import-duty-calculator-countries" className="hover:text-white/60 transition-colors">Import Duty Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇬 Nigeria</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rates: July 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Nigeria Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will it cost to import that car into Nigeria?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Free car import duty calculator for Nigeria. Enter your FOB value, freight, and exchange rate to get a full itemised breakdown — customs duty, NAC levy, FOB levy, VAT, and total cost of importing a car to Nigeria.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Final duty is determined by NCS assessed value and the exchange rate on your Form M date. NCS often values cars 20–50% above invoice. Always verify with a licensed clearing agent.
          </p>
        </div>
      </div>

      {/* ── Interactive calculator (client) ── */}
      <ImportDutyClient />

      {/* ── SEO content (server-rendered, Google sees this) ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Current Nigeria Car Import Duty Rates (2026)
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              Nigeria customs duty on vehicles is charged under HS Code 8703. As of the 2026 Fiscal Policy Measures (effective 1 July 2026), the National Automotive Council levy was halved and a new Green Tax Surcharge was introduced for higher-engine vehicles.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: 'Import Duty', rate: '20%', base: 'of CIF Value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'NAC Levy', rate: '5–10%', base: 'of CIF — used/new', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Green Tax', rate: '0–4%', base: 'of CIF — by engine cc', color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-500/5', border: 'border-lime-200 dark:border-lime-500/20' },
                { label: 'FOB Levy', rate: '4%', base: 'of FOB Value', color: 'text-yellow-600 dark:text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/5', border: 'border-yellow-200 dark:border-yellow-500/20' },
                { label: 'VAT', rate: '7.5%', base: 'of CIF + Duty + NAC + Green Tax', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-4xl font-black ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  How to Calculate Car Import Duty in Nigeria
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Nigeria's car import duty calculator follows a formula based on CIF (Cost, Insurance, Freight) value. The <a href="https://customs.gov.ng" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">Nigeria Customs Service (NCS)</a> charges a <strong className="text-foreground">20% import duty</strong> on the CIF value, plus a <strong className="text-foreground">National Automotive Council (NAC) levy</strong> of 5% for used Tokunbo vehicles or 10% for new (halved from 15%/20% under the 2026 Fiscal Policy Measures effective 1 July 2026), a <strong className="text-foreground">4% FOB levy</strong>, a new <strong className="text-foreground">Green Tax Surcharge</strong> of 0–4% based on engine size, and <strong className="text-foreground">7.5% VAT</strong> on the combined base — an effective customs charge of roughly 35–45% of CIF value for most vehicles, higher for large-engine cars subject to the top Green Tax bracket.</p>
                  <p>Electric vehicles and mass transit buses are fully exempt from both the Green Tax and standard import duties under the same policy — a meaningful consideration if you're importing an EV.</p>
                  <p>For popular Tokunbo models like Toyota Camry, Honda CR-V, or Lexus RX350, total import charges including clearing typically add 45–60% to the vehicle's overseas purchase price by the time it is on Nigerian soil.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Why Import Duty on Cars in Nigeria Is Unpredictable
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Three variables make car import tax in Nigeria difficult to predict. First, the <strong className="text-foreground">exchange rate</strong> — NCS uses the rate on the Form M date, not when you bought the car. In 2024, naira depreciation doubled the duty cost overnight for many importers.</p>
                  <p>Second, <strong className="text-foreground">NCS assessed value</strong> — Customs routinely overrides your declared CIF with a higher internal valuation, sometimes 20–50% above your invoice. Third, <strong className="text-foreground">policy changes</strong> — the NAC levy was halved and a new Green Tax Surcharge introduced effective 1 July 2026, and rates have shifted before and can shift again.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Car Import Tax vs Customs Duty — What's the Difference?
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>In Nigerian usage, "car import tax," "customs duty on vehicles," and "car import charges" are often used interchangeably. Technically, <strong className="text-foreground">import duty</strong> is the specific 20% tariff on CIF under HS 8703. <strong className="text-foreground">Customs duty on vehicles</strong> covers all NCS-levied charges — import duty, NAC levy, Green Tax, FOB levy, and VAT. The <strong className="text-foreground">VAT on imported cars</strong> compounds on CIF + duty + NAC + Green Tax, not on CIF alone.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Nigeria Car Import Duty — FAQ
                </h2>
                <div className="space-y-2">
                  {[
                    { q: 'What is the duty on used cars in Nigeria?', a: 'Used passenger vehicles (Tokunbo) attract 20% import duty + 5% NAC levy + 4% FOB levy + 7.5% VAT — an effective total of roughly 35–40% of CIF value, plus 2–4% more if the Green Tax Surcharge applies (engines 2,000cc and above).' },
                    { q: 'What is the Green Tax Surcharge?', a: 'A new environmental levy effective 1 July 2026 under the 2026 Fiscal Policy Measures. Vehicles under 2,000cc are exempt; 2,000–3,999cc pay 2% of CIF; 4,000cc and above pay 4% of CIF. Electric vehicles and mass transit buses are fully exempt.' },
                    { q: 'What is the dutiable value of a car?', a: 'The dutiable value is the CIF (Cost + Insurance + Freight) as assessed by NCS — which may exceed your invoice if NCS uses their internal database valuation.' },
                    { q: 'Can I import a car older than 12 years into Nigeria?', a: 'The general NCS policy restricts importation of vehicles older than 12 years. Vehicles exceeding this age may face seizure or require special permits.' },
                    { q: 'How much does it cost to clear a car at Lagos port?', a: 'Clearing cost = customs duty/taxes (roughly 35–45% of CIF, more for large-engine vehicles) plus terminal handling, shipping line release, and agent fees, which usually add ₦300,000–₦800,000 depending on vehicle size and how long it sits at the port.' },
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
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: A Toyota Camry Landed Cost</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Adaeze got a $9,500 FOB quote on a 2018 Toyota Camry, with freight and insurance adding about $1,200 — a CIF of roughly $10,700. At July 2026 rates: 20% import duty (~$2,140), 5% NAC levy (~$535), the Camry's 2.5L engine falls in the 2,000–3,999cc bracket so 2% Green Tax applies (~$214), a 4% FOB levy on the FOB value (~$380), then 7.5% VAT on CIF + duty + NAC + Green Tax (~$1,019). Total statutory charges came to roughly $4,288 — about 40% of CIF — before clearing agent and terminal fees. Having that full breakdown, rather than a rough "40% of the car price" estimate, let her budget accurately before committing to the purchase.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Duty rates and clearing process checked against real vehicle sourcing and clearing experience.
          </p>

          {/* Related tools */}
          <RelatedTools tool="import-duty-calculator" />

        </div>
      </div>
    </>
  );
}