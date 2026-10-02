import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanGhanaClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Loan Calculator (Ghana) — GHS/USD Rates, Deposit & Import Duty',
  description: 'Free Ghana car loan calculator with realistic 2026 bank rate bands, GHS vs USD financing, and Ghana import duty stacked into the loan amount for imported vehicles.',
  alternates: alternatesFor('/tools/auto-loan-calculator-ghana'),
  openGraph: {
    title: 'Car Loan Calculator (Ghana) | Naira Autos',
    description: 'Free Ghana car loan calculator \u2014 monthly instalment, GHS vs USD financing, and import duty stacked into the loan for imported vehicles.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-ghana',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car loan calculator ghana', 'vehicle loan interest rate ghana', 'car finance ghana banks',
    'ghana import duty car loan', 'stanbic bank ghana vehicle loan', 'car loan ghana cedis or dollars',
    'ghana car loan down payment',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-ghana',
      name: 'Car Loan Calculator (Ghana) — GHS/USD Rates, Deposit & Import Duty',
      description: 'Free Ghana car loan calculator with realistic 2026 bank rate bands, GHS vs USD financing, and Ghana import duty stacked into the loan amount for imported vehicles.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-ghana',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDEC\uD83C\uDDED Ghana', item: 'https://www.naira.autos/tools/auto-loan-calculator-ghana' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a typical car loan interest rate in Ghana in 2026?', acceptedAnswer: { '@type': 'Answer', text: "There's no single national rate \u2014 the Bank of Ghana's own reports have long shown vehicle loan rates spread from below 20% to above 40% across banks. With the BoG policy rate cut to 14% by September 2026, real quotes typically run from the mid-20s to high-30s percent, and vary significantly by bank." } },
        { '@type': 'Question', name: 'Should I take a car loan in Ghana cedis or US dollars?', acceptedAnswer: { '@type': 'Answer', text: "Several banks, including Stanbic Bank Ghana, offer both. USD loans usually carry a much lower nominal rate, but you carry the cedi exchange-rate risk yourself \u2014 if the cedi weakens during your term, repayments get costlier in cedi terms. The cedi actually strengthened over 21% in 2025, showing this can go either way rather than being a one-sided risk." } },
        { '@type': 'Question', name: 'How much deposit do I need for a car loan in Ghana?', acceptedAnswer: { '@type': 'Answer', text: 'Most banks finance up to 90% of a new car\u2019s price and 70% of a used car\u2019s price, meaning a minimum deposit of roughly 10% for new and 30% for used vehicles.' } },
        { '@type': 'Question', name: 'Does financing include Ghana import duty on an imported car?', acceptedAnswer: { '@type': 'Answer', text: 'Not automatically \u2014 you need to add it yourself. A typical imported vehicle under 3.0 litres faces roughly 45% in combined duty, VAT, NHIL, GETFund, ECOWAS, and EXIM levies on top of the CIF price, so the amount you finance is usually well above the price you saw advertised abroad. Use the Ghana Import Duty Calculator for exact figures.' } },
        { '@type': 'Question', name: "What's Ghana's 10-year vehicle import age limit?", acceptedAnswer: { '@type': 'Answer', text: 'Ghana generally limits used vehicle imports to 10 years old from the manufacture date for standard duty treatment. Older vehicles face steep, discretionary age penalties, which matters for financing since it affects both landed cost and resale value within your loan term.' } },
        { '@type': 'Question', name: 'How much of my income can go toward a car loan in Ghana?', acceptedAnswer: { '@type': 'Answer', text: "There's no single official rule, but banks across the region, including in Ghana, commonly apply a debt-service ceiling of around one-third of net monthly income across all loan repayments combined." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Loan Calculator (Ghana)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorGhanaPage() {
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
              <span className="text-white/50">🇬🇭 Ghana</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">BoG rate: 14% (Sep 2026)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan<br /><span className="text-emerald-400">Calculator — Ghana</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Cedis or dollars, plus import duty for imported cars.</p>
            <p className="text-white/75 text-sm leading-relaxed">Choose GHS or USD financing, add Ghana&apos;s import duty if you&apos;re financing an imported vehicle, and see your monthly instalment against a realistic Ghanaian bank rate range.</p>
          </div>
        </div>
      </div>

      <AutoLoanGhanaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Finance in Ghana — A Thin Market With Wide Bank-to-Bank Swings</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Car finance in Ghana is a genuinely thin market, and it prices very differently from country to country as a result. The Bank of Ghana&apos;s own Annual Percentage Rate reports have long shown vehicle loan rates spread from below 20% to above 40% across the roughly twenty banks that offer them at all — several major banks don&apos;t offer car loans as a product — a far wider spread than a typical tiered credit-score system produces elsewhere.</p>
              <p>The BoG has also just cut its benchmark policy rate sharply, from 21.5% in September 2025 to <strong className="text-foreground">14%</strong> at its September 2026 meeting, its lowest level in years. That easing takes time to filter through to actual vehicle-loan pricing, and it does so unevenly bank to bank, so no single number describes &ldquo;the&rdquo; Ghanaian car loan rate the way a national tiered table might in the US or India. In practice, expect real quotes anywhere from the mid-20s to high-30s percent, and treat comparing several banks as essential rather than optional here specifically. Because credit remains genuinely expensive relative to income, most car purchases in Ghana are still made in cash rather than financed through a bank — the opposite of markets like the US or UK, where financing is the default.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>GHS or USD? The Currency Decision Only Ghana&apos;s Market Forces You to Make</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">One decision Ghana&apos;s market forces that most others don&apos;t: several banks, including Stanbic Bank Ghana, let you take vehicle finance in either Ghana cedis or US dollars. A USD-denominated loan usually carries a much lower nominal interest rate, but you take on the cedi&apos;s exchange-rate movement yourself — if the cedi weakens against the dollar during your term, every repayment gets more expensive in cedi terms even though the dollar rate never changed. The cedi actually strengthened by more than 21% against the dollar over 2025, which would have made a USD loan taken that year cheaper in cedi terms rather than more expensive — the opposite of the usual warning. That&apos;s exactly why this is a genuine judgment call rather than an easy answer either way, and worth discussing with your bank rather than defaulting to whichever currency is quoted first.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Financing Often Means Financing the Import Duty Too</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Financing a car in Ghana often means financing the import duty on top of the purchase price, not just the price itself. A typical imported vehicle under 3.0 litres carries 20% import duty, then 15% VAT and 2.5% each for the NHIL and GETFund levies calculated on the duty-inclusive value, plus smaller ECOWAS and EXIM levies — stacking up to roughly 45% on top of the CIF price for a compliant, in-age vehicle. Ghana also caps standard-duty imports at 10 years old from the manufacture date; anything older faces steep, discretionary age penalties on top of the standard duty, which can turn an apparently cheap older import into an expensive one once landed costs are added. If you&apos;re financing an import rather than a car already cleared and sitting on a dealer&apos;s lot in Ghana, run the numbers through our <Link href="/tools/import-duty-calculator-ghana" className="underline underline-offset-2 hover:text-foreground">dedicated import duty calculator</Link> first, since the amount you actually need financed is usually well above the price you saw advertised abroad.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '14%', desc: 'BoG policy rate, September 2026', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '10% / 30%', desc: 'Typical minimum deposit: new / used', color: 'text-blue-600 dark:text-blue-400' },
              { label: '~45%', desc: 'Estimated combined import duty & taxes on a compliant import', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Ghanaian Banks Actually Structure a Car Loan</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Stanbic Bank Ghana&apos;s published vehicle finance terms are a reasonable proxy for how most Ghanaian banks structure this product: loan terms from 12 to 60 months (72 for selected assets), financing of up to 90% of the price for new cars and 70% for used ones — meaning a minimum down payment of roughly 10% new and 30% used — repaid through payroll deduction or a salary account with the bank. Most lenders also require at least 12 months in continuous, confirmed employment, a favourable credit bureau report, and an age bracket roughly between 21 and 70 at the loan&apos;s maturity. Self-employed applicants can usually qualify too, but with heavier documentation of business income in place of a payslip.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Much of Your Income Should Go Toward It</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">There&apos;s no single official Ghanaian affordability rule publicly branded the way the US has 20/4/10, but banks across the region — including several operating in both Ghana and Nigeria — commonly apply a debt-service ceiling of around one-third of net monthly income across all loan repayments combined, this one included. That&apos;s a useful rule of thumb to check yourself against before you apply, since it protects the bank&apos;s risk as much as your own budget.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Choosing Cedis and Checking Affordability</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Kwame earns GH₵9,000 a month net and wants a GH₵180,000 new car, which he&apos;s decided to finance in cedis rather than dollars to avoid exchange-rate risk. At a mid-range GHS rate of 30% and a 15% deposit (GH₵27,000), financing GH₵153,000 over 48 months gives a monthly instalment of roughly GH₵5,509 — about 61% of his net income, well above the one-third guideline most banks apply. Stretching to 60 months brings the payment down to around GH₵4,950 (still about 55%), and only a considerably larger deposit or a cheaper car brings the ratio into a range a Ghanaian bank would typically approve.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Used Cars Follow a Different Path</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Used cars follow a different path than new ones in practice, not just a lower financing ceiling. Ghana&apos;s car market is dominated by &ldquo;home-used&rdquo; imports — vehicles bought secondhand abroad and shipped in — rather than locally new sales, and banks reflect that risk by capping used-car financing at 70% of value against 90% for new, and often shortening the maximum term as well. A vehicle&apos;s remaining time under the 10-year import-age rule also matters to a lender: financing a car that&apos;s already eight years old over a long term risks the loan outlasting the point where the vehicle can be resold or re-exported without hitting age penalties, which is one reason many banks price used-car risk more conservatively than the down-payment gap alone suggests.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — Ghana</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is a typical car loan interest rate in Ghana in 2026?', a: "There's no single national rate \u2014 BoG's own reports have long shown vehicle loan rates spread from below 20% to above 40% across banks. With the policy rate cut to 14% by September 2026, real quotes typically run mid-20s to high-30s percent." },
                { q: 'Should I take a car loan in cedis or US dollars?', a: 'Several banks offer both. USD loans carry a much lower nominal rate but you take on the cedi exchange-rate risk. The cedi strengthened over 21% in 2025, showing this can go either way.' },
                { q: 'How much deposit do I need for a car loan in Ghana?', a: "Most banks finance up to 90% of a new car's price and 70% of a used car's, meaning a minimum deposit of roughly 10% new and 30% used." },
                { q: 'Does financing include Ghana import duty on an imported car?', a: 'Not automatically. A compliant vehicle under 3.0 litres faces roughly 45% in combined duty, VAT, NHIL, GETFund, ECOWAS, and EXIM levies on top of the CIF price \u2014 use the Import Duty Calculator for exact figures.' },
                { q: "What's Ghana's 10-year vehicle import age limit?", a: 'Standard duty applies to vehicles up to 10 years old from manufacture. Older vehicles face steep, discretionary age penalties, affecting both landed cost and resale value within your loan term.' },
                { q: 'How much of my income can go toward a car loan?', a: "No single official rule, but banks across the region, including Ghana, commonly apply a debt-service ceiling of around one-third of net monthly income across all loan repayments combined." },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates checked against Bank of Ghana APR reporting history, the September 2026 MPC decision, Stanbic Bank Ghana&apos;s published vehicle finance terms, and current Ghana import duty rules.
          </p>

          <RelatedTools tool="auto-loan-calculator-ghana" />

        </div>
      </div>
    </>
  );
}
