import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanAustraliaClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Loan Calculator (Australia) — Comparison Rate, Novated Lease & LCT',
  description: 'Free Australia car loan calculator with 2026 comparison rates, a novated lease mode, balloon payments, and the ATO Luxury Car Tax calculated automatically.',
  alternates: alternatesFor('/tools/auto-loan-calculator-australia'),
  openGraph: {
    title: 'Car Loan Calculator (Australia) | Naira Autos',
    description: 'Free Australia car loan calculator \u2014 monthly repayment, novated lease comparison, balloon payments, and automatic Luxury Car Tax.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-australia',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car loan calculator australia', 'novated lease calculator', 'comparison rate car loan',
    'luxury car tax calculator 2026', 'car loan interest rate australia 2026', 'balloon payment car loan australia',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-australia',
      name: 'Car Loan Calculator (Australia) — Comparison Rate, Novated Lease & LCT',
      description: 'Free Australia car loan calculator with 2026 comparison rates, a novated lease mode, balloon payments, and automatic Luxury Car Tax.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-australia',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDE6\uD83C\uDDFA Australia', item: 'https://www.naira.autos/tools/auto-loan-calculator-australia' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a good car loan interest rate in Australia in 2026?', acceptedAnswer: { '@type': 'Answer', text: "The RBA's own data puts the average secured car loan rate for prime borrowers at 7.48% p.a. as of July 2026. The broader market runs from around 5.5% for the strongest credit down to the mid-teens for weaker profiles. Always compare the comparison rate, not just the advertised rate." } },
        { '@type': 'Question', name: 'What is a novated lease and is it cheaper than a car loan?', acceptedAnswer: { '@type': 'Answer', text: "A novated lease is a three-way agreement between you, your employer, and a finance company where payments (and often running costs) come from your pre-tax salary. The effective rate is typically higher than a car loan (8\u201312% in 2026), but the after-tax cost can work out lower once salary packaging is accounted for \u2014 for someone in the 37% tax bracket, a 9.5% effective rate can feel closer to 5% in real terms." } },
        { '@type': 'Question', name: "What is the Luxury Car Tax and when does it apply?", acceptedAnswer: { '@type': 'Answer', text: "A federal 33% tax on the portion of a new car's GST-inclusive price above a threshold \u2014 $80,809 for most vehicles and $91,661 for fuel-efficient ones in FY2026-27 (ATO). It applies to new cars and demonstrators up to two years old, including fitted accessories, but not stamp duty or registration." } },
        { '@type': 'Question', name: 'Do electric vehicles get a novated lease tax exemption?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Under the Treasury Laws Amendment (Electric Car Discount) Act 2022, a battery electric vehicle priced below the luxury car tax threshold can get a full Fringe Benefits Tax exemption on a novated lease. Plug-in hybrids don\u2019t qualify and are taxed under standard FBT rules.' } },
        { '@type': 'Question', name: 'How much does stamp duty cost on a car in Australia?', acceptedAnswer: { '@type': 'Answer', text: 'It varies by state \u2014 there\u2019s no single national rate. Western Australia, for example, uses a tiered scale from 2.75% on cars under $25,000 up to 6.5% on higher-value vehicles; other states and territories use their own value- or weight-based formulas, often with EV discounts.' } },
        { '@type': 'Question', name: 'What is a balloon payment on a car loan?', acceptedAnswer: { '@type': 'Answer', text: "A portion of the loan deferred to a lump sum at the end of the term, lowering the monthly repayment. It doesn't reduce what you owe overall \u2014 you still have to pay, refinance, or trade in against that balloon amount when the term ends." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Loan Calculator (Australia)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorAustraliaPage() {
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
              <span className="text-white/50">🇦🇺 Australia</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">RBA avg: 7.48% (Jul 2026)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan<br /><span className="text-emerald-400">Calculator — Australia</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Car loan or novated lease — and the Luxury Car Tax, automatically.</p>
            <p className="text-white/75 text-sm leading-relaxed">Switch between a standard car loan and a novated lease, add a balloon payment if you want one, and see the Luxury Car Tax calculated automatically against the ATO&apos;s current thresholds.</p>
          </div>
        </div>
      </div>

      <AutoLoanAustraliaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans in Australia — Rates, and the Comparison Rate That Actually Matters</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Most car loans in Australia come with a fixed rate — around 69% of them, per Mozo&apos;s 2026 market data — which meant most existing borrowers were insulated when the RBA lifted the cash rate three times in 2026, taking it to 4.35% by May. For anyone taking out a new loan today, the <a href="https://www.rba.gov.au/statistics/interest-rates.html" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">Reserve Bank&apos;s own lenders&apos; statistics</a> put the average secured car loan rate for prime borrowers at <strong className="text-foreground">7.48%</strong> p.a. as of July 2026, with the broader market running anywhere from about 5.5% for the strongest credit profiles up to the mid-teens for weaker ones.</p>
              <p>Whatever rate a lender advertises, Australian consumer credit law requires a second number alongside it: the comparison rate, which folds in most fees to show the loan&apos;s true annual cost. Two loans with identical headline rates can have meaningfully different comparison rates, and that second number — not the advertised one — is what actually determines which is cheaper.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The Novated Lease — Financing Most Other Countries Don&apos;t Offer</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Australia has a financing option most other markets simply don&apos;t offer: the novated lease. It&apos;s a three-way agreement between you, your employer, and a finance company, where your car&apos;s lease payments — and often its running costs, like fuel, insurance, and servicing — come out of your pre-tax salary through salary packaging, directly reducing your taxable income. You do still pay interest, typically a bit higher than a standard car loan at around 8–12% p.a. in 2026, and it&apos;s calculated on the GST-exclusive purchase price rather than the full sticker price. The real saving isn&apos;t in the headline rate; it&apos;s in the tax treatment. For someone in the 37% tax bracket, an effective 9.5% novated lease rate can work out closer to a 5% real cost once the pre-tax structure is accounted for — which is why it can beat a lower-advertised-rate car loan on total after-tax cost, even though it looks more expensive on paper.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Electric Vehicles Get a Specific Novated Lease Exemption</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Electric vehicles get a specific, generous novated lease benefit: under the Treasury Laws Amendment (Electric Car Discount) Act 2022, a battery electric vehicle priced below the luxury car tax threshold — $91,661 for the 2026–27 financial year — can qualify for a full Fringe Benefits Tax exemption on a novated lease, meaning the employer-provided benefit isn&apos;t taxed at all. Plug-in hybrids don&apos;t get this exemption and are taxed under standard FBT rules instead, a distinction worth knowing before assuming a PHEV qualifies the same way a full EV does.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '7.48%', desc: 'RBA average secured car loan rate, prime borrowers (Jul 2026)', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '33%', desc: 'Luxury Car Tax rate on the amount over the ATO threshold', color: 'text-blue-600 dark:text-blue-400' },
              { label: '$80,809', desc: 'LCT threshold, non-fuel-efficient vehicles, FY2026-27', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The Luxury Car Tax Catches More Buyers Than Its Name Suggests</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The Luxury Car Tax itself catches more buyers than its name suggests. It&apos;s a federal tax of 33%, charged only on the portion of a car&apos;s GST-inclusive price above a set threshold — $80,809 for most vehicles and $91,661 for fuel-efficient ones in 2026–27, under the ATO&apos;s official rates. The formula works out to (price − threshold) × 10⁄11 × 33%: a $100,000 non-fuel-efficient car, for instance, attracts LCT of roughly $19,191 × 10/11 × 33% ≈ $5,758. It applies to new cars and demonstrators up to two years old, including the cost of any accessories or customisation fitted before delivery, but excludes separate government charges like stamp duty and registration. The threshold sits low enough that plenty of well-specified mainstream SUVs and utes cross it once options are added, not just exotic imports.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Stamp Duty Varies More Than Buyers Expect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Stamp duty is the other cost that varies more than buyers expect, since every state and territory sets its own structure rather than following one national rate. Western Australia, for example, uses a tiered scale running from 2.75% on cars under $25,000 up to 6.5% on higher-value vehicles, while other states apply their own value- or weight-based formulas — most electric and lower-emission vehicles attract a discounted rate or a concession in several jurisdictions. Because this varies so much by state, and by vehicle emissions category within each state, it&apos;s worth checking your own state transport authority&apos;s current rate directly rather than assuming a single national figure applies.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ASIC&apos;s 2026 Review of Car Finance</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">ASIC&apos;s own 2026 review of more than 350,000 car finance loans (Report 26-132MR) found issues with how some lenders handled loan establishment, reinforcing why comparing the comparison rate — not the advertised one — and reading the full cost breakdown matters in this market specifically, not just as general advice.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: A Balloon Payment&apos;s Real Effect</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Amelia earns $95,000 a year and wants a $45,000 new SUV. With a 7.48% comparison rate, a $9,000 deposit (20%), and no balloon, financing $36,000 over 60 months gives a monthly repayment of roughly $721. If she adds a 30% balloon payment ($13,500) instead, she&apos;s still financing the same $36,000, but $13,500 of it is deferred to a lump sum at the end rather than paid off monthly, cutting the repayment to around $535 a month — she&apos;ll still owe that $13,500 at the end, as a payment, a trade-in, or a refinance, so the balloon lowers the monthly cost without lowering the debt.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where Australians Actually Finance a Car</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The lending market splits between the big banks — Commonwealth Bank, Westpac, NAB, and ANZ — digital and non-bank lenders like Macquarie, Harmoney, and Money3, and manufacturer captive finance such as Toyota Finance, alongside dealer-arranged financing at the point of sale. Comparison sites and brokers can check multiple lenders&apos; rates without affecting your credit score, which is generally worth doing before accepting whatever a dealer quotes on the day.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — Australia</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is a good car loan interest rate in Australia in 2026?', a: "The RBA's own data puts the average secured car loan rate for prime borrowers at 7.48% p.a. as of July 2026. The broader market runs 5.5% to mid-teens. Always compare the comparison rate, not just the advertised rate." },
                { q: 'What is a novated lease and is it cheaper than a car loan?', a: "A three-way agreement between you, your employer, and a finance company, paid from pre-tax salary. The effective rate is typically higher (8\u201312%), but the after-tax cost can work out lower once salary packaging is accounted for." },
                { q: 'What is the Luxury Car Tax and when does it apply?', a: 'A federal 33% tax on the portion of a new car\u2019s GST-inclusive price above $80,809 (most vehicles) or $91,661 (fuel-efficient), FY2026-27. Applies to new cars and demonstrators up to two years old.' },
                { q: 'Do electric vehicles get a novated lease tax exemption?', a: 'Yes \u2014 a BEV priced below the luxury car tax threshold can get a full FBT exemption on a novated lease. Plug-in hybrids don\u2019t qualify.' },
                { q: 'How much does stamp duty cost on a car?', a: 'It varies by state. WA, for example, runs 2.75% to 6.5% on a tiered scale; other states use their own formulas, often with EV discounts.' },
                { q: 'What is a balloon payment on a car loan?', a: "A portion of the loan deferred to a lump sum at the end, lowering the monthly repayment without reducing what you owe overall \u2014 you still have to pay, refinance, or trade in against it." },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and figures checked against RBA lenders&apos; interest rate statistics, ATO Luxury Car Tax rates and thresholds, and ASIC Report 26-132MR.
          </p>

          <RelatedTools tool="auto-loan-calculator-australia" />

        </div>
      </div>
    </>
  );
}
