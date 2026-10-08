import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanUSAClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator (USA) — Monthly Payment, Sales Tax & Trade-In',
  description: 'Free US car loan calculator with 2026 Experian credit-tier rates, sales tax, and trade-in equity. See your monthly payment and check it against the 20/4/10 affordability rule.',
  alternates: alternatesFor('/tools/auto-loan-calculator-usa'),
  openGraph: {
    title: 'Auto Loan Calculator (USA) | Naira Autos',
    description: 'Free US car loan calculator — monthly payment, sales tax, trade-in equity, and a 20/4/10 affordability check, with 2026 credit-tier rates.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-usa',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'auto loan calculator', 'car loan calculator usa', 'car payment calculator with tax and trade in',
    'average auto loan interest rate 2026', '20/4/10 rule car', 'car affordability calculator',
    'auto loan calculator with sales tax', 'car loan calculator by credit score',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-usa',
      name: 'Auto Loan Calculator (USA) — Monthly Payment, Sales Tax & Trade-In',
      description: 'Free US car loan calculator with 2026 Experian credit-tier rates, sales tax, and trade-in equity.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-usa',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '🇺🇸 United States', item: 'https://www.naira.autos/tools/auto-loan-calculator-usa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "What's a good auto loan interest rate in the US in 2026?", acceptedAnswer: { '@type': 'Answer', text: "It depends heavily on credit tier. Experian's Q2 2026 data shows average new-car APRs from 4.41% for super-prime (781+) buyers up to 16.11% for deep-subprime (300–500) buyers. The overall average is 6.35% for new cars and 11.19% for used cars — but your own rate depends on your score, the lender, and whether the car is new or used." } },
        { '@type': 'Question', name: 'How much down payment do I need for a car loan?', acceptedAnswer: { '@type': 'Answer', text: "The 20/4/10 rule recommends 20% down. Some prime and super-prime borrowers can qualify for 0-down promotions from manufacturer finance arms, but a smaller down payment means a larger loan, more interest, and a higher risk of owing more than the car is worth (being underwater) in the first year or two." } },
        { '@type': 'Question', name: 'What credit score do I need for the best car loan rate?', acceptedAnswer: { '@type': 'Answer', text: 'A VantageScore of 781 or higher puts you in the "super prime" tier, averaging 4.41% APR on a new car as of Q2 2026. Scores from 661–780 (prime) still get solid rates, averaging 6.15%. Below 600, rates rise sharply into the 13–22% range.' } },
        { '@type': 'Question', name: 'Should I finance my sales tax into the car loan?', acceptedAnswer: { '@type': 'Answer', text: "Most US buyers do, since it avoids a large cash outlay at signing. The tradeoff is paying interest on the tax amount for the life of the loan. If you have the cash available, paying sales tax upfront and financing only the vehicle price reduces total interest paid." } },
        { '@type': 'Question', name: 'Is dealer financing or a bank/credit union better?', acceptedAnswer: { '@type': 'Answer', text: "Neither is automatically better. Manufacturer captive finance arms (Ford Credit, Toyota Financial, GM Financial, etc.) sometimes offer promotional 0-2.9% APR on select new models that beats any bank rate, but only for well-qualified buyers on specific vehicles. Getting a pre-approval from a bank or credit union first gives you a rate to compare the dealer's offer against." } },
        { '@type': 'Question', name: "How does a trade-in reduce my sales tax?", acceptedAnswer: { '@type': 'Answer', text: 'In most states, sales tax is charged only on the difference between the new car\'s price and your trade-in\'s value, not the full price — so a $30,000 car with a $10,000 trade-in is typically taxed on $20,000. A few states cap or exclude this credit, so check your own state DMV rules.' } },
        { '@type': 'Question', name: 'Can I get a car loan with bad credit in the US?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Subprime (501-600) and deep-subprime (300-500) tiers exist specifically for this, though average APRs run 13.5% to over 16% for new cars, and higher for used. Credit unions, buy-here-pay-here dealers, and lenders like Consumers Credit Union specialize in bad-credit approvals, typically at a higher rate and shorter term than prime borrowers get.' } },
        { '@type': 'Question', name: 'Can a new immigrant get a car loan in the US without a credit history?', acceptedAnswer: { '@type': 'Answer', text: "It's harder, since a foreign credit history generally doesn't transfer to US lenders and you effectively start as a no-file applicant. Building a few months of US bank and pay history first, applying with a co-signer who has an established American credit file, or making a larger down payment to offset the lack of credit history are the common workarounds." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Auto Loan Calculator (USA)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorUSAPage() {
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
              <span className="text-white/50">🇺🇸 United States</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">2026 Experian rates</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Auto Loan<br /><span className="text-emerald-400">Calculator — USA</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Monthly payment, sales tax, and the 20/4/10 check.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the vehicle price, your trade-in, and your credit tier. This calculator adds sales tax and trade-in equity the way US lenders actually structure a loan, then checks the payment against the 20/4/10 affordability rule.</p>
          </div>
        </div>
      </div>

      <AutoLoanUSAClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans in the US — What the Numbers Actually Look Like in 2026</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Whether you call it an auto loan, car loan, or vehicle financing, the American market prices almost entirely by credit tier rather than a single flat national rate. According to <a href="https://www.experian.com/blogs/ask-experian/average-car-loan-interest-rates-by-credit-score/" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">Experian&apos;s &ldquo;State of the Automotive Finance Market&rdquo;</a> report for the second quarter of 2026, the average new-car loan carried an APR of <strong className="text-foreground">6.35%</strong>, while the average used-car loan came in at <strong className="text-foreground">11.19%</strong> — but those averages hide an enormous spread. A super-prime borrower (VantageScore 781 or higher) paid an average of just 4.41% on a new car, while a deep-subprime borrower (300–500) averaged 16.11% on the same purchase. That single factor moves your monthly payment more than almost anything else, including the price of the car itself.</p>
                <p>Loan terms have also stretched further than in most other markets. Experian puts the average new-vehicle term at <strong className="text-foreground">69.5 months</strong> and used at 67.7 months, with more than a third of new loans now running longer than six years, and over 3% running past 85 months. A longer term lowers the monthly payment, but it means paying more total interest and staying &ldquo;underwater&rdquo; — owing more than the car is worth — for longer.</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>The average new-car loan amount reached $43,925 in early 2026, financing a $770 average monthly payment; used-car loans averaged $27,070 financed at $531 a month. Stretching the same loan from 60 to 84 months typically adds well over a thousand dollars in total interest, even though the monthly bill looks smaller.</p>
                <p>Nigerian and UK lenders lean on a debt-to-income cap; American financial advisors use a different shorthand instead — the <strong className="text-foreground">20/4/10 rule</strong>. Put down at least 20%, finance for no more than 4 years, and keep all car-related costs — loan payment, insurance, gas, and maintenance combined — at or under 10% of your gross monthly income. It isn&apos;t a bank underwriting rule, just a widely recommended guardrail, and with the average new vehicle now transacting above $49,000 (Cox Automotive / Kelley Blue Book data), plenty of buyers stretch well past it.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Sales Tax and Trade-In Equity Change the Math</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Two things make US auto financing genuinely different from a flat-rate calculation: sales tax and trade-in credit. State sales tax on a vehicle purchase ranges from <strong className="text-foreground">0%</strong> in a handful of states (Oregon, Montana, New Hampshire, Delaware) to over 9% in parts of others, and most buyers finance it into the loan rather than pay it upfront in cash — which is why it&apos;s a separate field above instead of being folded silently into the price.</p>
              <p>Trading in your current car reduces the loan you need in two ways at once: it lowers the amount financed directly, and in most states you only pay sales tax on the difference between the new car&apos;s price and your trade-in&apos;s value, not the full sticker price. A $30,000 car with a $10,000 trade-in is typically taxed on $20,000, not $30,000 — though a few states cap or exclude this credit, so it&apos;s worth checking your own state&apos;s DMV rules before you assume the saving applies.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where Americans Actually Get Car Loans</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Roughly 83% of new cars and 38% of used cars sold in the US are financed rather than bought outright, per Experian. Credit unions like PenFed and Navy Federal consistently post some of the lowest advertised rates — PenFed&apos;s car-buying service starts around 3.39% for well-qualified new-car buyers, though membership is required (it&apos;s free and open to anyone to join). Traditional banks like Bank of America price competitively, especially for existing customers. Capital One&apos;s Auto Navigator lets you check your real rate with a soft credit pull that doesn&apos;t affect your score before you shop, and accepts scores as low as roughly 500. Dealer financing, arranged on the spot through a manufacturer&apos;s captive finance arm — Ford Credit, Toyota Financial, GM Financial, and similar — is convenient and sometimes subsidized with promotional 0–2.9% APR offers on new models, but it&apos;s still worth comparing against a pre-approval from your own bank or credit union before you sign.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '10%', desc: '20/4/10 rule: total car-cost ceiling (% of gross income)', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '20%', desc: 'Recommended minimum down payment', color: 'text-blue-600 dark:text-blue-400' },
              { label: '4.4–16.1%', desc: '2026 new-car APR range, super-prime to deep-subprime', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Checking a Loan Against the 20/4/10 Rule</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Maria earns $6,200 a month gross and wants a $32,000 new SUV. With a 690 credit score, she&apos;s in the prime tier and qualifies for roughly 6.15% APR. Putting $6,400 down (20%) and financing the rest over 60 months at her state&apos;s 6% sales tax, her amount financed comes out to about $27,500, with a monthly payment near $535 — about 8.6% of her gross income, comfortably under the 10% guideline before she&apos;s even added insurance. Had she stretched to an 84-month term to chase a lower payment instead, she&apos;d have paid well over a thousand dollars more in total interest for a saving of roughly $90 a month, and would still owe more than the car was worth for the first two years of the loan — exactly the &ldquo;underwater&rdquo; risk both lenders and advisors warn about.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans for New Immigrants and Newcomers</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">New arrivals to the US face a specific obstacle: most mainstream lenders price almost entirely off a Social Security number and a domestic credit history, so a strong credit record from another country generally doesn&apos;t transfer over, no matter how long it is. A newcomer typically starts as an effective &ldquo;no-file&rdquo; applicant, which some lenders treat similarly to a thin or subprime file even with a good income. The usual workarounds are building a few months of US bank and pay history first, applying with a co-signer who already has an established American credit file, or using a larger down payment to offset the lack of credit history — a bigger down payment reduces the lender&apos;s risk regardless of your score, which is often enough to get approved at a workable rate rather than being declined outright.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Auto Loan FAQ — United States</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: "What's a good auto loan interest rate in the US in 2026?", a: "It depends heavily on credit tier. Experian's Q2 2026 data shows average new-car APRs from 4.41% for super-prime (781+) buyers up to 16.11% for deep-subprime (300–500) buyers. The overall average is 6.35% for new cars and 11.19% for used cars." },
                { q: 'How much down payment do I need for a car loan?', a: 'The 20/4/10 rule recommends 20% down. Some prime and super-prime borrowers can qualify for 0-down promotions from manufacturer finance arms, but a smaller down payment means more interest and a higher risk of owing more than the car is worth in the first year or two.' },
                { q: 'What credit score do I need for the best car loan rate?', a: 'A VantageScore of 781+ puts you in the "super prime" tier, averaging 4.41% APR on a new car as of Q2 2026. Scores from 661–780 (prime) still get solid rates, averaging 6.15%. Below 600, rates rise sharply into the 13–22% range.' },
                { q: 'Should I finance my sales tax into the car loan?', a: 'Most US buyers do, since it avoids a large cash outlay at signing. The tradeoff is paying interest on the tax amount for the life of the loan — paying it upfront in cash instead reduces total interest paid.' },
                { q: 'Is dealer financing or a bank/credit union better?', a: "Neither is automatically better. Manufacturer captive finance arms sometimes offer promotional 0-2.9% APR on select new models that beats any bank rate, but only for well-qualified buyers. Get a pre-approval from a bank or credit union first to have a rate to compare against." },
                { q: 'How does a trade-in reduce my sales tax?', a: 'In most states, sales tax is charged only on the difference between the new car\'s price and your trade-in\'s value — so a $30,000 car with a $10,000 trade-in is typically taxed on $20,000. A few states cap or exclude this credit, so check your own state DMV rules.' },
                { q: 'Can I get a car loan with bad credit in the US?', a: 'Yes. Subprime (501-600) and deep-subprime (300-500) tiers exist for this, though average APRs run 13.5% to over 16% for new cars, and higher for used. Credit unions and lenders like Consumers Credit Union specialize in bad-credit approvals, at a higher rate than prime borrowers get.' },
                { q: 'Can a new immigrant get a car loan without a US credit history?', a: "It's harder, since a foreign credit history generally doesn't transfer and you effectively start as a no-file applicant. Building a few months of US bank and pay history, applying with a co-signer who has an established American credit file, or making a larger down payment are the common workarounds." },
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and terms checked against Experian&apos;s Q2 2026 State of the Automotive Finance Market report and current published lender rate sheets.
          </p>

          <RelatedTools tool="auto-loan-calculator-usa" />

        </div>
      </div>
    </>
  );
}
