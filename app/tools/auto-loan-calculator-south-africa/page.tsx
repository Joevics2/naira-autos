import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanZAClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Vehicle Finance Calculator (South Africa) — Prime Rate, Balloon & NCA Fees',
  description: 'Free South Africa car finance calculator with the 2026 prime lending rate, balloon/residual payments, NCA-capped fees, and the 20-25% affordability guideline.',
  alternates: alternatesFor('/tools/auto-loan-calculator-south-africa'),
  openGraph: {
    title: 'Vehicle Finance Calculator (South Africa) | Naira Autos',
    description: 'Free South Africa vehicle finance calculator \u2014 monthly instalment, balloon payment, NCA-capped fees, and an affordability check against WesBank\u2019s 20-25% guideline.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-south-africa',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'vehicle finance calculator south africa', 'car finance calculator south africa', 'balloon payment calculator',
    'prime lending rate car finance', 'nca initiation fee car loan', 'car affordability calculator south africa',
    'residual value car finance', 'wesbank car finance calculator',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-south-africa',
      name: 'Vehicle Finance Calculator (South Africa) — Prime Rate, Balloon & NCA Fees',
      description: 'Free South Africa car finance calculator with the 2026 prime lending rate, balloon/residual payments, NCA-capped fees, and the 20-25% affordability guideline.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-south-africa',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDFF\uD83C\uDDE6 South Africa', item: 'https://www.naira.autos/tools/auto-loan-calculator-south-africa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a good vehicle finance interest rate in South Africa in 2026?', acceptedAnswer: { '@type': 'Answer', text: "It's priced as the prime lending rate (10.50% as of July 2026) plus a risk margin, typically 1 to 7 percentage points depending on your credit profile — giving rates roughly 11.5% to 17.5% per year. Unlike fixed-rate systems elsewhere, this rate is variable and moves whenever the SARB changes the repo rate." } },
        { '@type': 'Question', name: 'What is a balloon payment on a car in South Africa?', acceptedAnswer: { '@type': 'Answer', text: "A balloon (or residual/guaranteed future value) defers a percentage of the vehicle's price to the end of the finance agreement as a lump sum, lowering the monthly instalment during the term. WesBank data shows around a third of its new-car deals include one, averaging about 37% of the price. It isn't a discount — you must save toward it, refinance it, or trade the car in to cover it." } },
        { '@type': 'Question', name: 'What fees does the National Credit Act allow on a car loan?', acceptedAnswer: { '@type': 'Answer', text: 'An initiation fee capped at R165 plus 10% of the amount financed above R1,000, up to a maximum of R1,207.50, and a monthly service fee capped at R69. Most lenders charge close to these ceilings. A 2025 Supreme Court of Appeal ruling also confirmed on-the-road (OTR) fees like registration and roadworthy certificates can be financed into the loan if disclosed transparently.' } },
        { '@type': 'Question', name: 'How much should I spend on a car relative to my salary in South Africa?', acceptedAnswer: { '@type': 'Answer', text: "WesBank and most South African financial advisors recommend keeping total vehicle costs — instalment, insurance, and fuel combined — under 20-25% of gross monthly income. That's wider than international rules of thumb like the US 20/4/10 rule, but it bundles in running costs rather than just the loan payment." } },
        { '@type': 'Question', name: 'Does a bigger deposit or a balloon payment lower my monthly payment more?', acceptedAnswer: { '@type': 'Answer', text: "Both lower the amount you finance monthly, but differently: a deposit is money you no longer owe, while a balloon just delays part of the debt to the end of the term. A deposit brings your breakeven point forward; a balloon typically pushes it back by 12-18 months." } },
        { '@type': 'Question', name: 'Is it cheaper to buy a used car privately or from a dealer in South Africa?', acceptedAnswer: { '@type': 'Answer', text: "A private sale has no VAT on the transaction, which can make the sticker price lower, but private sellers can't offer in-house finance, warranties, or the same legal protections a registered dealer must provide. Older cars also typically qualify for shorter finance terms, since most lenders cap the combined age of the car plus the loan term at around 10-12 years." } },
        { '@type': 'Question', name: 'What is reckless lending under South Africa\u2019s National Credit Act?', acceptedAnswer: { '@type': 'Answer', text: "Lenders are legally required to run an affordability assessment before approving finance, checking your income, expenses, and existing debt against regulated minimum living-expense norms. If a bank approves finance you clearly can't afford based on your documented finances, you may have grounds to have the agreement declared reckless credit, which can lead to the debt being restructured or suspended." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Vehicle Finance Calculator (South Africa)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorSouthAfricaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/tools/auto-loan-calculator-countries" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/tools/auto-loan-calculator-countries" className="hover:text-white/60 transition-colors">Auto Loan Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇿🇦 South Africa</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Prime: 10.50% (Jul 2026)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Vehicle Finance<br /><span className="text-emerald-400">Calculator — South Africa</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Prime-linked rate, balloon payment, and NCA fees.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the vehicle price, your deposit, and a balloon/residual percentage if you want one. This calculator prices off the SARB prime rate and the NCA&apos;s capped fees, the way South African vehicle finance actually works.</p>
          </div>
        </div>
      </div>

      <AutoLoanZAClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Finance in South Africa — What the Numbers Actually Look Like in 2026</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Car finance in South Africa is priced almost entirely off the <a href="https://dailyinvestor.com/finance/144965/good-news-for-south-africans-who-want-to-buy-a-car/" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">prime lending rate</a>, currently <strong className="text-foreground">10.50%</strong> after the South African Reserve Bank&apos;s Monetary Policy Committee held it steady in July 2026 following a hike to that level in May. Unlike the fixed, credit-tier-based systems used in the US or India, South African vehicle finance is nearly always variable: your bank quotes a margin over prime — commonly 1 to 7 percentage points depending on your credit profile and the lender&apos;s risk appetite — giving typical vehicle finance rates of roughly 11.5% to 17.5% per year. That also means a rate agreed today moves whenever the SARB changes the repo rate, up or down, for the full 6-to-7-year term many buyers choose.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Balloon Payments — South Africa&apos;s Own Way to Lower the Monthly Bill</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Balloon payments (also called a residual or guaranteed future value) are the other big lever South Africans use to make a car fit their monthly budget, and they work differently from a deposit. Instead of paying money upfront to lower what you finance, a balloon defers a percentage of the price to the very end of the agreement as a single lump sum you must pay, refinance, or trade the car in to cover. <a href="https://newsletter.en.creamermedia.com/article/balloon-payments-rising-as-consumers-face-affordability-challenges-wesbank-2025-09-25" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">WesBank data from late 2025</a> shows roughly a third of its new finance deals include a balloon, averaging around 37% of the vehicle&apos;s price — and some financiers will structure deals up to 50% for lower-risk buyers. WesBank&apos;s own Motor Division has cautioned that a balloon isn&apos;t free money: it pushes back your &ldquo;breakeven point&rdquo; — the point where the car&apos;s trade-in value catches up to what you still owe — from around 36 months to as late as 48-54 months, which matters a great deal if you like to upgrade often.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The NCA-Regulated Fees Every Agreement Carries</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Every agreement also carries fees the National Credit Act caps by formula rather than leaving to the lender. The initiation fee is capped at R165 plus 10% of the amount financed above R1,000, up to a maximum of <strong className="text-foreground">R1,207.50</strong> — most lenders charge close to that ceiling. A monthly service fee, capped at <strong className="text-foreground">R69</strong>, is added on top of your instalment for the life of the loan. A September 2025 Supreme Court of Appeal ruling also settled a long legal fight over &ldquo;on-the-road&rdquo; (OTR) fees — licensing, registration, a roadworthy certificate, pre-delivery inspection, and the first tank of fuel — confirming lenders can finance these into your loan, provided they disclose them transparently rather than burying them in the price.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '10.50%', desc: 'SARB prime lending rate, July 2026', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '20–25%', desc: 'WesBank guideline: total vehicle costs vs. gross income', color: 'text-blue-600 dark:text-blue-400' },
              { label: '~37%', desc: 'Average balloon payment size (WesBank, 2025)', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Much Car Can You Actually Afford</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">WesBank and most South African financial advisors recommend keeping total vehicle costs — instalment, insurance, and fuel combined — under 20-25% of your gross monthly income. That&apos;s a wider ceiling than the US 20/4/10 rule&apos;s 10%, but it also bundles in running costs rather than just the loan payment, and South African fuel and insurance costs eat a larger share of that budget than in many other markets. The calculator above checks your instalment alone against this band; leave headroom underneath it for insurance and petrol, both of which have climbed sharply in recent years.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where South Africans Actually Finance a Car</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Vehicle finance in South Africa runs through a smaller set of channels than most markets: WesBank (part of FirstRand, and the market leader by volume), Absa Vehicle and Asset Finance, Standard Bank, Nedbank&apos;s MFC division, and FNB all compete directly, alongside manufacturer captive finance arms like Toyota Financial Services and Volkswagen Financial Services that sometimes undercut the banks on promotional deals. Nearly all of these are arranged through the dealership at the point of sale rather than pre-approved independently beforehand, though every major bank also offers an online pre-qualification tool that&apos;s worth checking before you negotiate.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Deposit vs. Balloon Payment</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Thandi earns R32,000 a month gross and wants a R320,000 new hatchback. At a risk margin of prime + 3% (13.5%), with a 10% deposit (R32,000) and no balloon, financing the rest over 60 months gives an instalment of roughly R6,655 — around R6,725 including the R69 monthly service fee — about 21% of her gross income, right at the edge of the 20-25% guideline before insurance and fuel are added. Adding a 30% balloon (R96,000, due as a lump sum at month 60) instead cuts her monthly instalment to around R5,526 — about R5,595 with the service fee, roughly 17.5% of her income — comfortably inside the guideline month to month, but she&apos;ll need to have saved or refinanced that R96,000 by the time the term ends.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Used Cars Follow a Different Set of Rules</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Buying used changes a few things beyond the price tag. Older vehicles typically only qualify for shorter finance terms — many lenders cap the combined age of the car plus the loan term at around 10-12 years, so a 7-year-old car might only get a 4-5 year agreement rather than the 6-7 years available on a new one. Buying privately rather than from a dealer also removes VAT from the transaction, which can make the sticker price lower, but private sellers can&apos;t offer in-house finance, warranties, or the same legal protections a registered dealer must provide, so it&apos;s worth weighing the saving against what you&apos;re giving up.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Reckless Lending Protections Under the NCA</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">South Africa&apos;s National Credit Act also builds in a consumer protection most buyers never think about until they need it: lenders are legally required to run an affordability assessment before approving any credit agreement, checking your income, expenses, and existing debt against regulated minimum living-expense norms rather than just your credit score. This is meant to prevent reckless lending — if a bank approves you for finance you clearly can&apos;t afford based on your documented income and expenses, you may have grounds to have the agreement declared reckless credit under the Act, which can result in the debt being restructured or suspended. It&apos;s a real legal backstop, but it only works if the income and expenses you declare on the application are accurate, so it isn&apos;t a substitute for running your own numbers first.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vehicle Finance FAQ — South Africa</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is a good vehicle finance interest rate in South Africa in 2026?', a: "It's priced as prime (10.50% as of July 2026) plus a risk margin, typically 1-7 percentage points depending on credit profile — giving rates roughly 11.5% to 17.5%. This rate is variable and moves whenever the SARB changes the repo rate." },
                { q: 'What is a balloon payment on a car in South Africa?', a: "It defers a percentage of the price to the end of the agreement as a lump sum, lowering the monthly instalment. WesBank data shows around a third of new-car deals include one, averaging about 37% of the price. It isn't a discount \u2014 you must save toward it, refinance it, or trade in the car to cover it." },
                { q: 'What fees does the National Credit Act allow on a car loan?', a: 'An initiation fee capped at R165 plus 10% of the amount above R1,000 (max R1,207.50), and a monthly service fee capped at R69. A 2025 SCA ruling also confirmed on-the-road fees can be financed into the loan if disclosed transparently.' },
                { q: 'How much should I spend on a car relative to my salary?', a: 'WesBank and most SA financial advisors recommend keeping total vehicle costs \u2014 instalment, insurance, and fuel combined \u2014 under 20-25% of gross monthly income.' },
                { q: 'Does a deposit or a balloon payment lower my payment more?', a: 'Both lower the monthly amount, but a deposit is money you no longer owe, while a balloon delays part of the debt. A deposit brings your breakeven point forward; a balloon typically pushes it back 12-18 months.' },
                { q: 'Is it cheaper to buy used privately or from a dealer?', a: "A private sale has no VAT, which can lower the price, but private sellers can't offer in-house finance, warranties, or the same legal protections a dealer must provide. Older cars also typically get shorter finance terms." },
                { q: 'What is reckless lending under the National Credit Act?', a: "Lenders must run an affordability assessment before approving finance, checking income, expenses, and existing debt. If a bank approves finance you clearly can't afford, you may have grounds to have the agreement declared reckless credit, which can lead to the debt being restructured or suspended." },
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and terms checked against SARB&apos;s July 2026 prime rate announcement, Nedbank&apos;s 2026 Vehicle &amp; Asset Finance pricing guide, and WesBank&apos;s published 2025 balloon-payment data.
          </p>

          <RelatedTools tool="auto-loan-calculator-south-africa" />

        </div>
      </div>
    </>
  );
}
