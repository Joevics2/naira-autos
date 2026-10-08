import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanEthiopiaClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Loan Calculator (Ethiopia) — Bank Rates, Microfinance & EV Import Shift',
  description: 'Free Ethiopia car loan calculator covering bank and microfinance financing, the 2026 petrol-vehicle import ban, EV tax exemptions, and birr depreciation context.',
  alternates: alternatesFor('/tools/auto-loan-calculator-ethiopia'),
  openGraph: {
    title: 'Car Loan Calculator (Ethiopia) | Naira Autos',
    description: 'Free Ethiopia car loan calculator \u2014 bank loans, microfinance, and the 2026 EV import shift that now matters more than any interest rate.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-ethiopia',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car loan calculator ethiopia', 'ethiopia car finance', 'awash bank car loan', 'ethiopia vehicle import tax 2026',
    'ethiopia electric vehicle import ban', 'birr exchange rate car loan', 'ethiopia microfinance car loan',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-ethiopia',
      name: 'Car Loan Calculator (Ethiopia) — Bank Rates, Microfinance & EV Import Shift',
      description: 'Free Ethiopia car loan calculator covering bank and microfinance financing, the 2026 petrol-vehicle import ban, EV tax exemptions, and birr depreciation context.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-ethiopia',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDEA\uD83C\uDDF9 Ethiopia', item: 'https://www.naira.autos/tools/auto-loan-calculator-ethiopia' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Can I still import a petrol car into Ethiopia in 2026?', acceptedAnswer: { '@type': 'Answer', text: "The government imposed a near-total ban on importing new petroleum-powered vehicles in January 2026, part of a deliberate push toward electric vehicles. EVs are exempt from excise tax and surtax entirely, with reduced customs duties, while older/higher-emission vehicles can face excise rates reportedly as high as 500%." } },
        { '@type': 'Question', name: 'What interest rate do Ethiopian car loans charge?', acceptedAnswer: { '@type': 'Answer', text: 'Awash Bank, one of the largest private banks, has offered car loans around 14.5% for birr-denominated loans, repayable over up to 7 years. Loans with both the equity contribution and repayments in foreign currency typically get a meaningfully lower rate, since it removes the bank\u2019s exchange-rate exposure.' } },
        { '@type': 'Question', name: 'How does microfinance car lending work in Ethiopia?', acceptedAnswer: { '@type': 'Answer', text: "Institutions like Nisir Microfinance lend up to 50% of a car's value, capped at 750,000 birr, holding the vehicle as moving collateral. No prior savings relationship with the institution is required, but borrowers must have already saved 5% of the loan amount before applying." } },
        { '@type': 'Question', name: 'Why does it take 6 months to get a private-use car loan in Ethiopia?', acceptedAnswer: { '@type': 'Answer', text: "Banks like Awash use that period to assess the applicant's payment pattern before releasing the vehicle. Commercial (taxi) applicants typically wait only about 2 months instead, in exchange for carrying the bank's advertising on the vehicle." } },
        { '@type': 'Question', name: 'How has the birr\u2019s depreciation affected car financing?', acceptedAnswer: { '@type': 'Answer', text: "Since the National Bank of Ethiopia floated the currency in mid-2024, the dollar has bought roughly 153\u2013157 birr through early 2026, down about 20% over 12 months. This makes foreign-currency-denominated loans and repayments meaningfully cheaper than birr-denominated ones for anyone with access to foreign currency." } },
        { '@type': 'Question', name: 'Is there a new vehicle ownership tax coming in Ethiopia?', acceptedAnswer: { '@type': 'Answer', text: "As of mid-2026, the federal government was reported to be preparing a new vehicle ownership tax described as a revenue-sharing system, but its structure hadn't been finalized or enacted at the time of writing. Check for updates before assuming any specific figure." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Loan Calculator (Ethiopia)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorEthiopiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/auto-loan-calculator-countries" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/auto-loan-calculator-countries" className="hover:text-white/60 transition-colors">Auto Loan Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇪🇹 Ethiopia</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NBE rate: 15% (Mar 2026)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan<br /><span className="text-emerald-400">Calculator — Ethiopia</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Bank loan or microfinance — and the EV shift that changes everything.</p>
            <p className="text-white/75 text-sm leading-relaxed">Compare a bank loan against microfinance, in birr or foreign currency, and see your monthly instalment — alongside the 2026 import and tax rules that now matter more than any interest rate.</p>
          </div>
        </div>
      </div>

      <AutoLoanEthiopiaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>A Market Reshaped Twice in Two Years</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Financing a car in Ethiopia means navigating a market reshaped twice in the past two years, and both changes matter more than the interest rate itself. In January 2026, the government imposed a near-total ban on importing new petroleum-powered vehicles, part of a deliberate push toward electric vehicles that also carries real tax incentives: EVs are exempt from excise tax and surtax entirely, with reduced customs duties on top, while a parallel excise tax overhaul pushed rates on older, higher-emission vehicles as high as 500% by some accounts. One Addis Ababa mechanic and dealer described the predictable result: a popular model like the Toyota Vitz rose by 80,000 birr in just two months once imports slowed, and in his words, a policy meant to make new cars affordable and discourage old ones &ldquo;has made both unaffordable.&rdquo; The practical upshot for anyone financing a car today is that the vehicle category itself — electric versus petrol, new versus old — now changes your total cost by a far larger margin than any loan&apos;s interest rate ever could.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The Birr, and Why Currency Choice Changes Your Rate</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The second disruption is the birr itself. Since the National Bank of Ethiopia floated the currency in mid-2024, the exchange rate has kept sliding — the dollar bought roughly 153–157 birr through early 2026, down about 20% over the preceding 12 months alone — and the NBE&apos;s benchmark interest rate sat at 15% as of March 2026, with inflation easing to a still-high 9.7–9.8%. For anyone importing a vehicle or repaying a foreign-currency-linked loan, that ongoing depreciation is a bigger line item than almost anything else in the transaction, which is why banks consistently price loans cheaper when both the equity contribution and the repayments are made in foreign currency rather than birr.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '15%', desc: 'NBE benchmark interest rate, March 2026', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '1 per 100', desc: 'Vehicle ownership rate \u2014 among the lowest globally', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Br 750,000', desc: 'Microfinance car loan ceiling (Nisir Microfinance)', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Bank Loans Are Real, But Most Buyers Still Pay Cash</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Car ownership in Ethiopia remains genuinely rare — about one vehicle per 100 people, among the lowest rates globally — and bank car loans reflect that: they&apos;re a real product, not a marketing afterthought, but most purchases are still made in cash. Awash Bank, one of the country&apos;s largest private banks, has offered car loans at around 14.5% interest repayable over as long as seven years, though new private-use applicants typically wait about six months while the bank assesses their repayment pattern before releasing the car; commercial applicants financing a taxi get it in roughly two months instead, in exchange for carrying the bank&apos;s advertising on the vehicle — a genuinely unusual condition that doubles as marketing for the lender.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Microfinance Fills a Gap Banks Don&apos;t</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Microfinance institutions fill a gap conventional banks often don&apos;t: Nisir Microfinance, for example, lends up to 50% of a car&apos;s value, holding the vehicle itself as moving collateral, with a loan ceiling of 750,000 birr and a requirement that the borrower has already saved 5% of the loan amount before applying. Unlike a bank, no prior savings relationship with the institution is required to qualify — a meaningfully lower bar of entry for buyers without an established banking history, even though the loan ceiling limits it to more modest vehicles.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Financing for Ethiopians Abroad</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Ethiopians abroad get a dedicated financing route most residents don&apos;t. Diaspora consumer loans — Awash Bank&apos;s version is one of several — cover new and used car purchases under both conventional interest-based and interest-free (Islamic) banking schemes, and like other credit products here, the rate depends heavily on currency: contributing equity and making repayments in foreign currency earns a meaningfully lower rate than doing the same in birr, since it removes the bank&apos;s exchange-rate exposure on the loan.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>A New Vehicle Ownership Tax Is Being Prepared</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">A new vehicle ownership tax was reported to be in preparation by the federal government as of mid-2026, described as a revenue-sharing system, though its structure hadn&apos;t been finalized or formally enacted at the time of writing — worth checking for updates before assuming any specific figure, since reported policy intentions in this market have moved from proposal to enactment unusually quickly in recent years.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Bank Loan vs. Microfinance</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Solomon earns 35,000 birr a month and wants a 1,500,000 birr vehicle. Going the bank route with a 20% down payment (300,000 birr) at 14.5% over a 60-month term, his loan of 1,200,000 birr carries a monthly instalment of roughly 28,200 birr — well above his entire monthly income, illustrating just how far local-currency vehicle prices have run ahead of local-currency salaries since the 2024 float. Going the microfinance route instead, capped at 750,000 birr and 50% of the car&apos;s value, he&apos;d need a 750,000 birr down payment of his own just to reach the ceiling — underscoring why, in practice, a large cash contribution remains unavoidable for most buyers here regardless of which channel they choose.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Lending Is Already Following the EV Shift</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The EV shift also changes which lenders are active in vehicle finance at all. Korenti Auto Trading, an EV importer, signed a 2026 partnership with Agelegel Microfinance specifically to offer loan packages built around electric vehicles, a sign that financing products are being built around the new policy direction rather than retrofitted later. For a buyer deciding between a heavily taxed petrol import and an exempt EV, the tax treatment alone can outweigh any difference in financing terms between lenders, which is the opposite of most markets covered here, where the loan itself is usually the biggest lever a buyer controls.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — Ethiopia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Can I still import a petrol car into Ethiopia in 2026?', a: "The government imposed a near-total ban on importing new petroleum-powered vehicles in January 2026, pushing toward EVs. EVs are exempt from excise tax and surtax, while older/higher-emission vehicles can face excise rates reportedly as high as 500%." },
                { q: 'What interest rate do Ethiopian car loans charge?', a: 'Awash Bank has offered car loans around 14.5% for birr-denominated loans, up to 7 years. Foreign-currency-denominated loans (equity + repayments) typically get a meaningfully lower rate.' },
                { q: 'How does microfinance car lending work?', a: "Institutions like Nisir Microfinance lend up to 50% of a car's value, capped at 750,000 birr. No prior savings relationship is required, but 5% of the loan must be saved before applying." },
                { q: 'Why does it take 6 months for a private-use car loan?', a: "Banks like Awash use that period to assess the applicant's payment pattern. Commercial (taxi) applicants wait only ~2 months, in exchange for carrying the bank's advertising." },
                { q: "How has the birr's depreciation affected financing?", a: 'Since the 2024 float, the dollar bought roughly 153\u2013157 birr through early 2026, down ~20% over 12 months \u2014 making FX-denominated loans meaningfully cheaper for those with FX access.' },
                { q: 'Is there a new vehicle ownership tax coming?', a: "As of mid-2026, a new tax was reported in preparation, described as a revenue-sharing system, but not yet finalized or enacted. Check for updates." },
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

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Figures checked against National Bank of Ethiopia data, Awash Bank and Nisir Microfinance published terms, and 2026 reporting from The Reporter Ethiopia and Addis Fortune. Policy details in this market move quickly — confirm current rules before relying on this page.
          </p>

          <RelatedTools tool="auto-loan-calculator-ethiopia" />

        </div>
      </div>
    </>
  );
}
