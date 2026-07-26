import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanClient from './client';

export const metadata: Metadata = {
  title: 'Free Auto Loan & Car Loan Affordability Calculator',
  description: 'Free car loan calculator. Calculate monthly repayments, total interest, and whether you can afford a car loan — in your own currency.',
  alternates: { canonical: 'https://www.naira.autos/tools/auto-loan-calculator' },
  openGraph: {
    title: 'Auto Loan Calculator | Naira Autos',
    description: 'Free car loan affordability calculator — monthly repayments, total interest, and income ratio check.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator',
  },
  keywords: ['car loan calculator','auto loan calculator','car loan repayment calculator','vehicle loan calculator','used car loan in nigeria without collateral','car loan without collateral','monthly car loan payments','car financing calculator','how much interest on car loan'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator',
      name: 'Free Auto Loan & Car Loan Affordability Calculator',
      description: 'Free car loan calculator. Calculate monthly repayments and affordability in your own currency.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the interest rate for car loans in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Nigerian commercial bank car loans typically carry interest rates between 22% and 35% per annum. Fintech lenders like Carbon and Autochek Finance may offer rates from 18%. The CBN monetary policy rate directly influences commercial lending rates.' } },
        { '@type': 'Question', name: 'How much down payment do I need for a car loan in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Most Nigerian banks require a minimum down payment of 20–30% of the vehicle price. Some lenders require up to 40% for used vehicles. A higher down payment reduces your monthly repayment and total interest paid.' } },
        { '@type': 'Question', name: 'What percentage of my income should go to car loan repayment?', acceptedAnswer: { '@type': 'Answer', text: 'Financial advisors recommend keeping car loan repayments below 15% of monthly take-home income. Nigerian lenders typically cap approvals at 33% of net income. Above 20% is considered high risk.' } },
        { '@type': 'Question', name: 'Can I get a car loan in Nigeria without collateral?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most Nigerian auto loans are secured against the vehicle itself (chattel mortgage). You do not need separate collateral. Lenders require proof of income, valid ID, BVN, and often a guarantor.' } },
        { '@type': 'Question', name: 'How much car loan can I get in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'It depends mainly on your net monthly income and down payment, not the car price. Banks typically cap approvals at 33% of net income — for example, ₦500,000/month income supports roughly ₦3.5M-₦4M in loan principal at a 30% rate over 36 months, before down payment. Use the calculator above with your own numbers for an exact figure.' } },
        { '@type': 'Question', name: 'Can new immigrants or returning residents get a car loan in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'It is harder without a local income and banking history, since Nigerian lenders generally cannot use foreign income or credit records directly. Building a few months of local bank statements, applying with a guarantor who has an established Nigerian income, or approaching a fintech lender with more flexible documentation requirements are common workarounds.' } },
        { '@type': 'Question', name: 'What is the difference between car financing and a car loan?', acceptedAnswer: { '@type': 'Answer', text: 'In Nigeria the terms are used interchangeably. Car financing (or car finance) is the general term for any arrangement that lets you pay for a vehicle over time rather than upfront; a car loan is the most common form of it, structured as a chattel mortgage secured against the vehicle.' } },
        { '@type': 'Question', name: 'What documents do I need for a car loan in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Typically: valid ID, BVN, last 6 months\' bank statements, 3 months\' payslips or business income proof, utility bill (proof of address), and passport photographs. Some lenders require a guarantor.' } },
        { '@type': 'Question', name: 'Can I get a car loan for a Tokunbo vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most Nigerian banks and fintech lenders finance Tokunbo vehicles. Some lenders cap the vehicle age at 5–7 years and require comprehensive insurance on the vehicle.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Auto Loan Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

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
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Auto Loan Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Works in any currency</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan<br /><span className="text-emerald-400">Affordability Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Can you actually afford that car loan?</p>
            <p className="text-white/75 text-sm leading-relaxed">Free car loan calculator. Enter the car price, your down payment, and loan term in your own currency. See your monthly repayment instantly — with an affordability check against your income.</p>
          </div>
        </div>
      </div>

      <AutoLoanClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans in Nigeria — What You Need to Know</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">Whether you call it a car loan, auto loan, vehicle loan, or automobile loan, Nigerian lenders finance vehicles the same way — car financing (or car finance) is structured as a loan secured against the vehicle itself, repaid in fixed monthly instalments.</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Nigerian commercial banks offer car loans at annual interest rates typically ranging from <strong className="text-foreground">22% to 35%</strong>. Fintech lenders like Autochek Finance and Carbon have entered the market with more competitive rates from 18%, but often with stricter income verification. Loan terms are typically capped at 48 months.</p>
                <p>The <strong className="text-foreground">down payment (equity contribution)</strong> is the most powerful lever for a Nigerian car buyer. Increasing from 20% to 35% on an ₦8 million car can reduce your monthly car repayment by over ₦80,000 and cut total interest by nearly ₦600,000 over 36 months.</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>The <strong className="text-foreground">repayment-to-income ratio</strong> is what lenders use to assess affordability. Nigerian banks typically cap approvals at 33% of net monthly income. Financial advisors recommend keeping repayments at or below 15% of income to maintain healthy headroom for other expenses.</p>
                <p>Total cost of car ownership in Nigeria goes beyond the loan repayment. Budget an additional 10–15% of the car's annual value for <strong className="text-foreground">insurance, maintenance, fuel, and registration</strong> — a car affordable on paper can become a financial burden when running costs are included.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Use This as an Auto Loan Approval Calculator</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>Nigerian banks don&apos;t just quote a rate — they run the same repayment-to-income check this calculator does before approving you. If your monthly payments on a car push past 33% of your net income, most bank underwriters will decline or ask for a larger down payment, regardless of your credit history. Running your numbers here first tells you roughly where a real application would land, before you spend time on paperwork.</p>
              <p>Fintech lenders sometimes approve higher ratios than commercial banks in exchange for a higher rate, so a &quot;no&quot; from your bank isn&apos;t always a &quot;no&quot; everywhere. Use the affordability check above as a starting point, then compare at least two lenders — a bank and a fintech option like Autochek Finance or Carbon — before committing to one car note.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Much Car Loan Can You Get in Nigeria?</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <p>How much car loan you can get in Nigeria comes down mostly to your net monthly income and your down payment, not the price of the car you want. As a rough guide: if a bank caps repayments at 33% of net income, someone earning ₦500,000/month can typically support a monthly repayment of up to ₦165,000 — which at a 30% interest rate over 36 months translates to a loan principal in the ₦3.5M–₦4M range, before down payment. Enter your own income and target repayment into the calculator above for an exact figure rather than this general estimate.</p>
              <p><strong className="text-foreground">New immigrants and returning residents</strong> face an extra hurdle: Nigerian banks lend against a verifiable local income and banking history, so a foreign income history or foreign credit record usually isn&apos;t something a Nigerian lender can use directly. Practical workarounds include building a few months of local bank statements first, applying with a guarantor who has an established Nigerian income, or starting with a fintech lender that has more flexible documentation requirements than a traditional commercial bank.</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '≤ 15%', desc: 'Ideal repayment-to-income ratio', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '20–30%', desc: 'Typical minimum down payment', color: 'text-blue-600 dark:text-blue-400' },
              { label: '22–35%', desc: 'Nigerian bank interest rate range', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — Nigeria</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What documents do I need for a car loan in Nigeria?', a: 'Valid ID (NIN, passport, or driver\'s licence), BVN, last 6 months\' bank statements, 3 months\' payslips or business income proof, utility bill (proof of address), and passport photographs. Some lenders require a guarantor.' },
                { q: 'Can I get a car loan for a Tokunbo vehicle?', a: 'Yes. Most Nigerian banks and fintech lenders finance Tokunbo vehicles. Some lenders cap vehicle age at 5–7 years and require comprehensive insurance.' },
                { q: 'Is it better to buy outright or take a loan?', a: 'Outright purchase is always cheaper — no interest. However, if a loan lets you preserve working capital or buy a better-condition vehicle that reduces maintenance costs, the tradeoff can make sense. Calculate the total interest cost above and weigh it against the benefit.' },
                { q: 'What happens if I miss a car loan repayment in Nigeria?', a: 'Missed payments attract penalty interest and negatively affect your credit bureau record (CRC or FirstCentral). Persistent defaults can result in vehicle repossession under the chattel mortgage. Always contact your lender proactively if you anticipate difficulty.' },
                { q: 'Can I get a car loan in Nigeria without collateral?', a: 'Some fintech lenders and cooperative schemes offer used-car loans without additional collateral beyond the vehicle itself (which serves as the chattel mortgage), but these typically require a steady verifiable income, a guarantor, and carry higher interest rates than bank loans that ask for extra security.' },
                { q: 'How much car loan can I get in Nigeria?', a: 'Mainly a function of your net income and down payment, not the car price. Banks typically cap approvals at 33% of net income — roughly ₦3.5M-₦4M in loan principal for a ₦500,000/month income at 30% over 36 months, before down payment. Use the calculator above for your exact figure.' },
                { q: 'Can new immigrants or returning residents get a car loan in Nigeria?', a: 'It\'s harder without a local income and banking history — foreign income or credit records usually can\'t be used directly. Building local bank statements, using a guarantor with a Nigerian income, or trying a fintech lender with lighter documentation requirements are the usual workarounds.' },
                { q: 'What\'s the difference between car financing and a car loan?', a: 'In Nigeria they\'re used interchangeably. Car financing is the general term for paying over time rather than upfront; a car loan is the common form it takes, secured against the vehicle as a chattel mortgage.' },
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

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/insurance-calculator', label: 'Insurance Calculator', color: 'blue' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
                { href: '/tools/best-car-for', label: 'Best Car For Me', color: 'amber' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}