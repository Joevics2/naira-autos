import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanPakistanClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Financing Calculator (Pakistan) — KIBOR Rates, SBP Caps & DBR',
  description: 'Free Pakistan car financing calculator with 2026 KIBOR rates, the SBP\u2019s engine-size-based down payment and tenure rules, the Rs 3 million aggregate cap, and the 40% debt burden ratio limit.',
  alternates: alternatesFor('/tools/auto-loan-calculator-pakistan'),
  openGraph: {
    title: 'Car Financing Calculator (Pakistan) | Naira Autos',
    description: 'Free Pakistan car financing calculator \u2014 monthly instalment by engine size, KIBOR + spread, and the SBP\u2019s 40% debt burden ratio cap.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-pakistan',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car financing calculator pakistan', 'car loan calculator pakistan', 'kibor car loan rate 2026',
    'sbp car financing regulations', 'meezan car ijarah calculator', 'car loan down payment pakistan',
    'debt burden ratio car loan pakistan', 'roshan apni car',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-pakistan',
      name: 'Car Financing Calculator (Pakistan) — KIBOR Rates, SBP Caps & DBR',
      description: "Free Pakistan car financing calculator with 2026 KIBOR rates, the SBP's engine-size-based down payment and tenure rules, the Rs 3 million aggregate cap, and the 40% debt burden ratio limit.",
      url: 'https://www.naira.autos/tools/auto-loan-calculator-pakistan',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDF5\uD83C\uDDF0 Pakistan', item: 'https://www.naira.autos/tools/auto-loan-calculator-pakistan' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a good car financing rate in Pakistan in 2026?', acceptedAnswer: { '@type': 'Answer', text: "Rates are quoted as KIBOR plus a bank spread. With 1-year KIBOR around 10.89% (March 2026), total rates across the eight major banks run roughly 13.4% (Bank AL Habib, the cheapest) to 19% (JS Bank, among the pricier). Islamic products like Meezan Car Ijarah run a comparable 14-17%." } },
        { '@type': 'Question', name: 'How much down payment do I need for car financing in Pakistan?', acceptedAnswer: { '@type': 'Answer', text: "It depends on engine size. For vehicles above 1,000cc, the State Bank of Pakistan requires a minimum 30% down payment. Locally manufactured or assembled vehicles up to 1,000cc are exempted from this tightening and can qualify with as little as 15% down at some banks." } },
        { '@type': 'Question', name: 'How long can a car loan tenure be in Pakistan?', acceptedAnswer: { '@type': 'Answer', text: 'Up to 5 years for vehicles above 1,000cc under the SBP\u2019s tightened 2026 rules (reduced from 7 years). Locally made vehicles up to 1,000cc, and the Roshan Apni Car product for overseas Pakistanis, can still reach up to 7 years at some banks.' } },
        { '@type': 'Question', name: 'What is the debt burden ratio (DBR) cap for car financing?', acceptedAnswer: { '@type': 'Answer', text: "The SBP requires banks to keep a borrower's total debt repayments, across all loans combined, at or under 40% of income. This is a hard regulatory requirement, not a soft guideline \u2014 banks are required to decline financing that would push a borrower above it." } },
        { '@type': 'Question', name: "What's the difference between Meezan Car Ijarah and conventional car financing?", acceptedAnswer: { '@type': 'Answer', text: 'Conventional bank financing (HBL, UBL, MCB, and others) is interest-based, priced as KIBOR plus a spread. Meezan Car Ijarah is a lease: the bank buys and owns the car throughout the term and rents it to you, with ownership transferring at the end. BankIslami\u2019s Auto Musharaka uses a third structure, Diminishing Musharakah, where you and the bank co-own the car from day one.' } },
        { '@type': 'Question', name: 'What is the aggregate car financing cap in Pakistan?', acceptedAnswer: { '@type': 'Answer', text: 'The SBP caps the total auto financing any one person can hold across every bank and DFI combined at Rs 3,000,000 at any point in time, regardless of how many separate loans or lenders are involved.' } },
        { '@type': 'Question', name: 'Can overseas Pakistanis get car financing with longer terms?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, through the Roshan Apni Car product, available to non-resident Pakistanis with a Roshan Digital Account. The SBP exempted it from the 2026 tightening, so it can still reach tenures up to 7 years regardless of the car\u2019s engine size.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Financing Calculator (Pakistan)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorPakistanPage() {
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
              <span className="text-white/50">🇵🇰 Pakistan</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">1yr KIBOR: 10.89%</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Financing<br /><span className="text-emerald-400">Calculator — Pakistan</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Engine size changes everything under SBP rules.</p>
            <p className="text-white/75 text-sm leading-relaxed">Pick your engine capacity and this calculator applies the right State Bank of Pakistan down payment and tenure limits automatically, then checks your instalment against the SBP&apos;s 40% debt burden ratio cap.</p>
          </div>
        </div>
      </div>

      <AutoLoanPakistanClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Financing in Pakistan — KIBOR, SBP Caps, and Why Engine Size Changes Everything</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Car financing in Pakistan is priced off KIBOR, the Karachi Inter-Bank Offered Rate, which stood at roughly <strong className="text-foreground">10.89%</strong> for the 1-year tenor as of March 2026. Banks add their own spread on top — anywhere from 2.5 percentage points at Bank AL Habib, the cheapest major lender, to 4.5-6 points at pricier banks — giving total markup rates across the eight major banks running roughly 13.4% to 19% as of mid-2026.</p>
              <p>But the rate is only half the picture, because engine size changes which regulatory regime you fall under entirely. The State Bank of Pakistan&apos;s Prudential Regulations split financing into two different sets of rules depending on engine capacity: for vehicles above 1,000cc — the large majority of sedans and SUVs — the maximum tenure is capped at 5 years and the minimum down payment is 30%, tightened specifically in a 2026 move to slow import-linked demand. Locally manufactured or assembled vehicles up to 1,000cc — Pakistan&apos;s economy-car segment, including the Suzuki Alto and Cultus — were explicitly exempted to protect lower and middle-income buyers, and still follow the older, looser rules: down payments as low as 15% and tenures up to 7 years at some banks. That single distinction changes the real affordability math more than almost anything else a buyer controls.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The Rs 3 Million Ceiling and the 40% Debt Burden Ratio — Hard Limits, Not Guidelines</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Unlike the softer &ldquo;rule of thumb&rdquo; guidelines used in some other markets, Pakistan&apos;s affordability check is a hard regulatory requirement rather than a suggestion. The SBP caps the total auto financing any one person can hold across every bank and DFI combined at Rs 3,000,000 at any point in time, and requires lenders to keep a borrower&apos;s total debt burden ratio — all loan repayments combined, measured against income — at or under 40%. Industry voices have been blunt about the practical effect of this: Ahmed Shamim of Dubai Islamic Bank Pakistan&apos;s consumer auto finance desk has publicly said the 40% DBR cap combined with the 30% down payment requirement makes it effectively impossible for someone earning Rs 100,000 a month to qualify for financing on anything beyond the smallest car. This calculator&apos;s income check uses the same 40% ceiling banks are legally required to apply, not a softer suggestion you&apos;re free to ignore.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '10.89%', desc: '1-year KIBOR, March 2026 (SBP-verified)', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '40%', desc: 'Maximum debt burden ratio (SBP-mandated, not a guideline)', color: 'text-blue-600 dark:text-blue-400' },
              { label: 'Rs 3M', desc: 'Aggregate auto financing cap, per person, all banks combined', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Islamic vs Conventional — Three Structures, Three Names</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Three genuinely different financing structures compete for the same customer, not just different rates on the same product. Conventional banks — HBL, UBL, MCB, Bank Alfalah, Bank AL Habib, JS Bank, and Allied Bank — lend on a straightforward interest basis, KIBOR plus their own spread. Meezan Bank&apos;s Car Ijarah, Pakistan&apos;s largest Islamic car financing product, works as a lease: the bank buys the car and owns it throughout the term, renting it to you, with ownership transferring at the end against your initial security deposit. BankIslami&apos;s Auto Musharaka takes a third approach, Diminishing Musharakah: you and the bank co-own the car from day one, and each monthly payment buys out a growing share of the bank&apos;s stake until the car is fully yours. Despite the real structural and Shariah-compliance differences between these three, the monthly cost works out to broadly comparable instalment math for comparison purposes, which is why this calculator — like most Pakistani comparison tools — uses one unified calculation across all three rather than three incompatible formulas.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Roshan Apni Car — Financing for Overseas Pakistanis</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Overseas Pakistanis get a specific carve-out most residents don&apos;t. The SBP exempted the &ldquo;Roshan Apni Car&rdquo; product from the 2026 tightening entirely: available to non-resident Pakistanis who hold a Roshan Digital Account, it keeps access to tenures up to 7 years regardless of the car&apos;s engine size, a deliberate policy choice to keep remittance-funded car purchases flowing even while resident financing tightened. It&apos;s offered by most major banks, including Allied Bank and Bank Alfalah, under this exact product name — worth asking for specifically if you qualify, since it isn&apos;t subject to the same cc-based restrictions covered above.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: A 1,600cc Sedan Against the DBR Cap</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Ahmed earns Rs 150,000 a month and wants a Toyota Corolla priced at Rs 6,000,000, which at 1,600cc falls under the standard, tightened regime. With a 30% down payment (Rs 1,800,000) and a bank quote of KIBOR (10.89%) plus a 4% spread — 14.89% total — financing Rs 4,200,000 over the maximum allowed 5 years gives a monthly instalment of roughly Rs 99,700, about 66% of his income — well above the SBP&apos;s 40% debt burden ratio ceiling, meaning he wouldn&apos;t actually qualify for this financing as structured. Raising his down payment to 45% or choosing a cheaper car are the two realistic paths to bringing the ratio under the cap a bank is legally required to enforce.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Used Cars Add a Second Layer of Restriction</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Used cars add a second layer of restriction on top of the engine-size rules. Most banks only finance used vehicles up to a certain age at the time of application — commonly around 5 years old — and several, including Meezan Bank, apply a higher minimum down payment on used cars than new ones, since a used vehicle&apos;s resale value is harder to predict than a new one straight from the showroom. The aggregate Rs 3,000,000 financing cap and the 40% debt burden ratio apply identically whether the car is new or used, so a cheaper used car mainly helps by keeping the amount financed, and therefore the instalment, further under that ceiling.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where to Actually Compare Rates</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">With eight major banks and three distinct financing structures competing for the same buyer, the spread between the cheapest and most expensive options is wide enough to be worth real shopping around. Bank AL Habib&apos;s Apni Car has the cheapest published spread at KIBOR plus 2.5 points; HBL offers a 50% processing fee discount specifically for female applicants; UBL Drive carries the highest minimum down payment in the market at 30% with a fixed-rate option available; and MCB Car4U sets the strictest minimum salary threshold among the major lenders. None of these differences show up in the headline markup rate alone, which is exactly why comparing more than one bank&apos;s full terms — not just the advertised rate — matters more in Pakistan&apos;s car financing market than in most others.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Financing FAQ — Pakistan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is a good car financing rate in Pakistan in 2026?', a: 'Rates are KIBOR plus a bank spread. With 1-year KIBOR around 10.89%, total rates run roughly 13.4% (Bank AL Habib) to 19% (JS Bank). Islamic products like Meezan Car Ijarah run a comparable 14-17%.' },
                { q: 'How much down payment do I need?', a: 'For vehicles above 1,000cc, the SBP requires a minimum 30% down payment. Locally made vehicles up to 1,000cc are exempted and can qualify with as little as 15% down at some banks.' },
                { q: 'How long can a car loan tenure be in Pakistan?', a: 'Up to 5 years for vehicles above 1,000cc under the 2026 tightened rules (down from 7). Local vehicles up to 1,000cc, and Roshan Apni Car for overseas Pakistanis, can still reach 7 years at some banks.' },
                { q: 'What is the debt burden ratio (DBR) cap?', a: "The SBP requires banks to keep total debt repayments, across all loans combined, at or under 40% of income \u2014 a hard regulatory requirement, not a soft guideline." },
                { q: "What's the difference between Car Ijarah and conventional financing?", a: 'Conventional financing is interest-based (KIBOR + spread). Meezan Car Ijarah is a lease where the bank owns the car and rents it to you. BankIslami\u2019s Auto Musharaka is Diminishing Musharakah \u2014 you and the bank co-own the car from day one.' },
                { q: 'What is the aggregate car financing cap?', a: 'The SBP caps total auto financing per person at Rs 3,000,000 across every bank and DFI combined, at any point in time.' },
                { q: 'Can overseas Pakistanis get longer financing terms?', a: 'Yes, through Roshan Apni Car, available to non-resident Pakistanis with a Roshan Digital Account. It was exempted from the 2026 tightening and can reach 7-year terms regardless of engine size.' },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and regulations checked against the State Bank of Pakistan&apos;s Prudential Regulations for Consumer Financing, published 2026 bank rate comparisons, and SBP-verified KIBOR data.
          </p>

          <RelatedTools tool="auto-loan-calculator-pakistan" />

        </div>
      </div>
    </>
  );
}
