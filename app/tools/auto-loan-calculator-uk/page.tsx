import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanUKClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Finance Calculator (UK) — PCP vs HP, GMFV & Voluntary Termination',
  description: 'Free UK car finance calculator for PCP and HP: monthly payment, GMFV, and your Section 99 voluntary termination point. Covers 2026 representative APRs and the motor finance redress scheme.',
  alternates: alternatesFor('/tools/auto-loan-calculator-uk'),
  openGraph: {
    title: 'Car Finance Calculator (UK) | Naira Autos',
    description: 'Free UK PCP and HP car finance calculator \u2014 monthly payment, GMFV, and the exact point you can voluntarily terminate under Section 99 of the Consumer Credit Act 1974.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-uk',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car finance calculator uk', 'pcp calculator', 'hp car finance calculator', 'gmfv calculator',
    'voluntary termination car finance', 'representative apr car finance', 'motor finance redress scheme',
    'car finance affordability calculator uk',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-uk',
      name: 'Car Finance Calculator (UK) — PCP vs HP, GMFV & Voluntary Termination',
      description: 'Free UK car finance calculator for PCP and HP: monthly payment, GMFV, and your Section 99 voluntary termination point.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-uk',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDEC\uD83C\uDDE7 United Kingdom', item: 'https://www.naira.autos/tools/auto-loan-calculator-uk' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "What's the difference between PCP and HP car finance?", acceptedAnswer: { '@type': 'Answer', text: "PCP finances the car's expected depreciation with an optional final payment (GMFV) to own it, giving payments typically 30-40% lower than HP. HP finances the full price with no balloon, so you own the car outright once the last payment clears, with no mileage limits along the way." } },
        { '@type': 'Question', name: 'What is a good APR for car finance in the UK in 2026?', acceptedAnswer: { '@type': 'Answer', text: "Typical rates run roughly 6-9% for strong credit profiles and can reach the mid-to-high teens for weaker ones. Lenders must advertise a representative APR — the rate at least 51% of accepted customers actually receive — but your own personal rate can differ." } },
        { '@type': 'Question', name: 'What is voluntary termination and when can I use it?', acceptedAnswer: { '@type': 'Answer', text: "A right under Section 99 of the Consumer Credit Act 1974 letting you hand back a car on a regulated PCP or HP agreement once you've paid 50% of the total amount payable (deposit, interest, fees, and for PCP the GMFV), owing nothing further beyond damage or excess mileage charges. Because the GMFV counts toward that total on PCP, the threshold takes proportionally longer to reach than on HP." } },
        { '@type': 'Question', name: 'Am I owed compensation for mis-sold car finance?', acceptedAnswer: { '@type': 'Answer', text: "Possibly, if you financed a car between 2007 and 2021 under a discretionary commission arrangement. The FCA published redress scheme rules in March 2026 with an average payout estimated around £700-830, but by May 2026 the scheme faced four legal challenges that could delay or unwind it, with more clarity expected around November 2026. Check the FCA's own motor finance pages for the current status." } },
        { '@type': 'Question', name: 'How much of my salary should I spend on car finance?', acceptedAnswer: { '@type': 'Answer', text: "A common guideline is to keep the finance payment alone under about 10% of your net take-home pay, and total vehicle costs — finance, insurance, fuel, MOT, and servicing combined — under 15-20% of it. There's no single official UK rule the way the US has 20/4/10, but lenders also run their own affordability check before approving any agreement." } },
        { '@type': 'Question', name: 'Does the advertised car price include VAT and tax?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. UK car prices already include VAT, unlike US-style sales tax which is often added separately at the point of purchase, so what you see advertised is what gets financed.' } },
        { '@type': 'Question', name: 'Can I get PCP on a used car?', acceptedAnswer: { '@type': 'Answer', text: "It's possible but far less common than on new cars, since the GMFV calculation depends on a depreciation curve that's harder to predict on an older vehicle. HP or a personal loan is the more usual route for used-car finance." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Finance Calculator (UK)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorUKPage() {
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
              <span className="text-white/50">🇬🇧 United Kingdom</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">PCP &amp; HP</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Finance<br /><span className="text-emerald-400">Calculator — UK</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">PCP or HP, GMFV, and your voluntary termination point.</p>
            <p className="text-white/75 text-sm leading-relaxed">Choose PCP or HP, enter the price and deposit, and this calculator shows your monthly payment plus the exact point — in pounds and months — where you could legally hand the car back under Section 99 of the Consumer Credit Act.</p>
          </div>
        </div>
      </div>

      <AutoLoanUKClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Finance in the UK — PCP vs HP, and What the APR Actually Means</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Around nine in ten new cars in the UK are bought on finance, and the large majority of those are Personal Contract Purchase (PCP) rather than Hire Purchase (HP) — the two work quite differently. PCP finances the car&apos;s expected depreciation rather than its full price: you pay a deposit and monthly instalments, then choose at the end to pay an optional final payment (the Guaranteed Minimum Future Value, or GMFV) to own the car, hand it back, or trade it in. HP finances the full price in fixed instalments with no balloon, so you own the car outright once the last payment clears. PCP payments are typically 30-40% lower than HP for the same car and term, which is exactly why it dominates the market — but interest still applies to the full amount financed, including the deferred GMFV.</p>
              <p>Whatever product you choose, lenders must advertise a &ldquo;representative APR&rdquo; — the rate that at least 51% of accepted customers actually receive, by law. Your own rate depends on credit profile and the finance company&apos;s own criteria. Typical 2025-26 rates run roughly 6-9% for strong credit and can reach the mid-to-high teens for weaker profiles. One advantage over some markets: the advertised price already includes VAT, so unlike a US-style sales tax, there&apos;s no separate tax line to add on top of what you finance.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>If You Financed a Car Before 2021, You May Be Owed Compensation</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">If you financed a car before 2021, you may be owed money — though the picture is genuinely unsettled as this is written. Between 2007 and 2021, many dealers could adjust your interest rate under discretionary commission arrangements (DCAs), earning more commission the higher they set your rate, often without disclosing this clearly. Following a Supreme Court ruling, the <a href="https://www.autocar.co.uk/car-news/consumer/car-finance-scandal-payments-face-big-delay-due-legal-challenges" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">FCA published final redress scheme rules</a> on 30 March 2026, with an average payout estimated around £700-830 across roughly 14 million agreements. However, by May 2026 the FCA confirmed the scheme faces four separate legal challenges from finance companies and a consumer group, admitting there&apos;s a real scenario where the scheme is struck down entirely and complaints instead have to be raised individually. The regulator said clearer information wouldn&apos;t arrive until around November 2026. If you financed a car in this window, check the FCA&apos;s own motor finance pages directly for the current status rather than relying on any older summary, including this one.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Voluntary Termination — Your Legal Right to Hand the Car Back at 50%</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The UK&apos;s other consumer protection is one very few buyers know they have until they need it: voluntary termination, a right written into Section 99 of the Consumer Credit Act 1974. Once you&apos;ve paid at least 50% of the total amount payable under a regulated PCP or HP agreement — not 50% of the car&apos;s price, but 50% of everything you&apos;d pay across the full term including interest, fees, and (for PCP) the GMFV — you can hand the car back and walk away, owing nothing further beyond charges for damage or excess mileage. Because the GMFV counts toward that 50% total on a PCP, the threshold is proportionally higher and takes longer to reach than on an equivalent HP agreement for the same car. It&apos;s a genuine legal right, not a loophole, though most dealers won&apos;t volunteer it.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '51%', desc: 'Share of accepted customers who must get the advertised representative APR', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '50%', desc: 'Of total amount payable \u2014 your voluntary termination point (s.99 CCA 1974)', color: 'text-blue-600 dark:text-blue-400' },
              { label: '~£700–830', desc: 'Estimated average motor finance redress payout, if the scheme survives legal challenge', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Much Car Can You Actually Afford</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">There&apos;s no single named affordability rule in the UK the way the US has 20/4/10, but the guidance most UK money sites converge on is similar in spirit: keep the finance payment alone under about 10% of your net (take-home) monthly pay, and total vehicle costs — finance, insurance, fuel, MOT, and servicing combined — under 15-20% of it. On a net income of £2,000 a month, that puts the finance payment ceiling around £200 and total car costs around £300-400. Lenders run their own, more detailed affordability check under FCA rules before approving any agreement, weighing your income against your actual outgoings rather than a fixed percentage — but that check protects the lender&apos;s risk as much as your budget, so it&apos;s worth running your own numbers regardless of what you&apos;re approved for.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: PCP vs HP on the Same Car</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">James takes home £2,400 a month net and wants a £24,000 car on a 4-year PCP. With good credit at 9% APR, a £2,400 deposit (10%), and a 40% GMFV (£9,600), his monthly payment comes out around £371 — about 15.4% of his net income, above the 10% finance-only guideline but the kind of gap that&apos;s common with PCP&apos;s lower headline payments. Choosing HP instead on the same car and rate, with no balloon, would push the payment to roughly £538 a month (22.4% of income), since the full price is financed rather than just the depreciation.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Used Cars Usually Mean HP, Not PCP</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Used cars work a little differently: PCP is available but far less common on older vehicles, since the GMFV calculation depends on a depreciation curve that gets harder to predict as a car ages, so HP or a straightforward personal loan is the more usual route for used purchases. HP also carries no mileage limits or end-of-term condition inspection, which matters if you plan to keep a used car well past typical PCP terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where Britons Actually Finance a Car</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The market runs through a handful of large finance houses rather than mainstream banks directly: Black Horse (part of Lloyds Banking Group) and MotoNovo Finance (FirstRand) are among the largest by volume, alongside Santander Consumer Finance, Close Brothers Motor Finance, and manufacturer-tied arms like Volkswagen Financial Services. Nearly all are arranged through the dealership rather than pre-approved independently, though several also offer standalone online applications worth comparing against whatever the dealer quotes.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Finance FAQ — UK</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: "What's the difference between PCP and HP car finance?", a: 'PCP finances expected depreciation with an optional GMFV to own the car, giving payments typically 30-40% lower than HP. HP finances the full price with no balloon, so you own it outright at the end with no mileage limits.' },
                { q: 'What is a good APR for car finance in the UK in 2026?', a: 'Typical rates run roughly 6-9% for strong credit and can reach the mid-to-high teens for weaker profiles. Lenders must advertise a representative APR that at least 51% of accepted customers actually receive.' },
                { q: 'What is voluntary termination and when can I use it?', a: "A right under Section 99 of the Consumer Credit Act 1974 letting you hand back a PCP or HP car once you've paid 50% of the total amount payable, including the GMFV on PCP. You owe nothing further beyond damage or excess mileage charges." },
                { q: 'Am I owed compensation for mis-sold car finance?', a: 'Possibly, if you financed between 2007 and 2021 under a discretionary commission arrangement. The FCA published redress rules in March 2026 (avg. payout ~£700-830), but the scheme faces legal challenges as of mid-2026 \u2014 check the FCA\u2019s own pages for the latest status.' },
                { q: 'How much of my salary should I spend on car finance?', a: "A common guideline: keep the finance payment under 10% of net take-home pay, and total vehicle costs (finance, insurance, fuel, MOT, servicing) under 15-20%. There's no single official rule, but lenders run their own affordability check too." },
                { q: 'Does the advertised car price include VAT?', a: "Yes \u2014 UK car prices already include VAT, unlike US-style sales tax which is often added separately, so what's advertised is what gets financed." },
                { q: 'Can I get PCP on a used car?', a: "It's possible but far less common, since the GMFV depends on a depreciation curve that's harder to predict on an older vehicle. HP or a personal loan is the more usual route for used cars." },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates, GMFV conventions, and the motor finance redress scheme status checked against FCA statements and industry reporting current to September 2026 — this is a fast-moving legal situation, so confirm the latest position directly with the FCA before relying on it.
          </p>

          <RelatedTools tool="auto-loan-calculator-uk" />

        </div>
      </div>
    </>
  );
}
