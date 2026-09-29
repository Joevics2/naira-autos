import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanIndiaClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Loan EMI Calculator (India) — On-Road Price, CIBIL Score & Tenure',
  description: 'Free India car loan EMI calculator with 2026 bank interest rates by CIBIL score, on-road price, and the 20-10-4 affordability rule. PSU banks, private banks, and NBFCs compared.',
  alternates: alternatesFor('/tools/auto-loan-calculator-india'),
  openGraph: {
    title: 'Car Loan EMI Calculator (India) | Naira Autos',
    description: 'Free India car loan EMI calculator \u2014 monthly EMI, on-road price, CIBIL-tier interest rates, and a 20-10-4 affordability check.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-india',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car loan emi calculator india', 'car loan interest rate 2026 india', 'on road price vs ex showroom price',
    'cibil score car loan', '20-10-4 rule car loan', 'car loan calculator india',
    'car loan for nri india', 'car loan foir', 'reducing balance vs flat rate car loan',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-india',
      name: 'Car Loan EMI Calculator (India) — On-Road Price, CIBIL Score & Tenure',
      description: 'Free India car loan EMI calculator with 2026 bank interest rates by CIBIL score, on-road price, and the 20-10-4 affordability rule.',
      url: 'https://www.naira.autos/tools/auto-loan-calculator-india',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDEE\uD83C\uDDF3 India', item: 'https://www.naira.autos/tools/auto-loan-calculator-india' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a good car loan interest rate in India in 2026?', acceptedAnswer: { '@type': 'Answer', text: "It depends on your CIBIL score. SBI's published 2026 table shows 8.70% for a score of 750 and above, rising to 8.90% for 721-756, and 9.65-9.85% for 650-720. PSU banks like Canara Bank and Union Bank of India advertise starting rates as low as 7.40-7.45% for their best-qualified borrowers." } },
        { '@type': 'Question', name: 'What is the difference between on-road price and ex-showroom price?', acceptedAnswer: { '@type': 'Answer', text: 'Ex-showroom price is the base manufacturing and dealer cost including GST, but excludes registration, road tax, and insurance. On-road price adds all of these mandatory costs and is what you actually pay and finance. Road tax varies by state, so on-road price for the same car differs across India.' } },
        { '@type': 'Question', name: 'What is the 20-10-4 rule for car loans in India?', acceptedAnswer: { '@type': 'Answer', text: "A personal-finance guideline: pay 20% of the on-road price as down payment, keep the EMI at or under 10% of your net take-home monthly salary, and limit the loan tenure to 4 years. It's stricter than what banks will actually approve — lenders commonly allow EMI obligations up to 50-75% of income (FOIR) depending on income band." } },
        { '@type': 'Question', name: 'Should I choose a flat interest rate or reducing balance rate?', acceptedAnswer: { '@type': 'Answer', text: 'Always confirm your car loan is quoted on a reducing-balance basis, the same method banks use. A "flat rate" of 8%, sometimes still pitched by used-car dealers, works out to roughly 14-15% once converted to reducing balance — nearly double what it sounds like.' } },
        { '@type': 'Question', name: 'How much down payment do I need for a car loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'Most banks require 10-20% of the on-road price for new cars, and some offer 100% on-road financing to salaried applicants with strong CIBIL scores. Used cars typically need a higher down payment of 15-30%, since lenders finance a smaller share of an older vehicle\u2019s value.' } },
        { '@type': 'Question', name: 'Can NRIs get a car loan in India?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Most major banks, including SBI, offer a dedicated NRI Car Loan scheme, but the NRI is typically the guarantor while a close resident-Indian relative acts as co-applicant and vehicle owner. EMIs are repaid from the NRI's NRE, NRO, or FCNR account, and interest rates are generally the same as for resident Indians at the same bank." } },
        { '@type': 'Question', name: 'How long can a car loan tenure be in India?', acceptedAnswer: { '@type': 'Answer', text: 'Up to 7 years (84 months) at most banks for new cars, though 3-5 years is the commonly recommended range since cars depreciate quickly and a longer loan risks owing more than the car is worth partway through. Used-car tenures are usually shorter, often capped so the loan ends before the vehicle reaches 8-10 years of total age.' } },
        { '@type': 'Question', name: 'Are there processing fees or prepayment charges on car loans in India?', acceptedAnswer: { '@type': 'Answer', text: "Yes. Processing fees typically run 0.25-2% of the loan amount depending on the lender. Many PSU banks waive prepayment or foreclosure charges after a lock-in period, while some private banks and NBFCs charge them for the full tenure \u2014 worth confirming before you sign." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Loan EMI Calculator (India)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorIndiaPage() {
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
              <span className="text-white/50">🇮🇳 India</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">2026 bank rates</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan EMI<br /><span className="text-emerald-400">Calculator — India</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">On-road price, CIBIL score, and the 20-10-4 check.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the on-road price (not the ex-showroom figure), your CIBIL score band, and tenure. This calculator uses the reducing-balance EMI method banks actually use, then checks it against India&apos;s own 20-10-4 affordability rule.</p>
          </div>
        </div>
      </div>

      <AutoLoanIndiaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans in India — What the Numbers Actually Look Like in 2026</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Car loan pricing in India runs on two parallel tracks: public-sector and private banks compete hard for prime borrowers, while NBFCs (non-banking finance companies) pick up everyone else at a real premium. As of 2026, PSU banks like Union Bank of India (7.40%), Canara Bank (7.45%), and Punjab National Bank (7.55%) advertise the lowest starting rates, with private banks HDFC Bank (from 8.15%) and ICICI Bank (from 8.40%) close behind. NBFCs such as Bajaj Finance price new-car loans from 10-14% plus a 2% processing fee, but approve applicants that banks turn down.</p>
                <p>Your CIBIL score decides which of these you actually qualify for: <a href="https://www.bankbazaar.com/sbi-car-loan-interest-rates.html" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">SBI&apos;s published tiers</a> show <strong className="text-foreground">8.70%</strong> for a score of 750 and above, rising to 8.90% for 721-756, and 9.65-9.85% for 650-720 — a difference of over a full percentage point between a good score and a merely fair one.</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Loan tenure in India can run up to 7 years, but most advisors recommend capping it at 3-5 years: cars depreciate fast, and a 7-year loan risks leaving you owing more than the car is worth well into the loan&apos;s life.</p>
                <p>A separate trap to watch for, especially with used-car dealers: some still quote a <strong className="text-foreground">&ldquo;flat rate&rdquo;</strong> (for example, &ldquo;8% flat&rdquo;), which sounds lower than a bank&apos;s rate but works out to nearly double that — roughly 14-15% — once converted to the reducing-balance method banks actually use. Always confirm any quoted rate is reducing-balance, and if it isn&apos;t, convert it before comparing.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>The 20-10-4 Rule — India&apos;s Own Affordability Check</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">India has its own version of the affordability thumb rule international readers may know as 20/4/10 — here it&apos;s usually called the <strong className="text-foreground">20-10-4 rule</strong>, and the order of the numbers matters: put down 20% of the on-road price, keep your EMI at or under 10% of your net (take-home) monthly salary, and cap the loan tenure at 4 years. It&apos;s stricter than what banks themselves will actually approve — lenders commonly allow total loan obligations (EMI plus any existing debt) up to 50-75% of income depending on income band, under a metric called <strong className="text-foreground">FOIR</strong> (Fixed Obligation to Income Ratio). That gap matters: a bank approving you for a much higher EMI than the 20-10-4 guideline suggests doesn&apos;t mean it&apos;s a comfortable monthly commitment, only that it clears the bank&apos;s own risk threshold.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>On-Road Price, Not Ex-Showroom, Is What You Actually Finance</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">One number trips up more Indian car buyers than any interest rate: the difference between the ex-showroom price advertised everywhere and the on-road price you actually finance. Ex-showroom price is the manufacturing and dealer cost including GST, but excludes registration, road tax, and insurance — all mandatory to legally drive the car, and all added on top. Road tax and registration charges vary by state, so the same car&apos;s on-road price can differ by tens of thousands of rupees depending on where you register it. Most banks calculate your loan-to-value against the on-road price (SBI, for instance, finances up to 90% of it), which is why this calculator asks for on-road price directly rather than the ex-showroom figure from the brochure.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where Indians Actually Get Car Loans</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Around four in five new-car buyers in India finance rather than pay cash, split fairly evenly between PSU banks, private banks, and NBFCs. Manufacturer-tied finance desks at Maruti Suzuki, Hyundai, and Tata showrooms sometimes offer subsidized rates as low as 7.99% for well-qualified buyers — worth checking before you approach your own bank. Whichever lender you choose, ask about the processing fee (often 0.25-2% of the loan amount) and prepayment or foreclosure charges upfront; many PSU banks waive these after a lock-in period, while some NBFCs charge them for the full tenure.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '10%', desc: '20-10-4 rule: EMI ceiling (% of net salary)', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '10–20%', desc: 'Typical minimum down payment (new car)', color: 'text-blue-600 dark:text-blue-400' },
              { label: '7.4–9.85%', desc: '2026 PSU/private bank new-car rate range', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-3xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Checking an EMI Against the 20-10-4 Rule</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Priya earns a net take-home salary of ₹85,000 a month and wants a car with an on-road price of ₹9 lakh. With a CIBIL score of 760, she qualifies for roughly 8.70% at a PSU bank. Putting down ₹1.8 lakh (20%) and financing ₹7.2 lakh over 5 years, her EMI comes to around ₹14,800 — about 17.4% of her net salary, above the 20-10-4 guideline&apos;s 10% ceiling even though her bank would likely still approve it under its own FOIR rules. Shortening the tenure to 4 years raises her EMI further; stretching it to 7 years brings the EMI down to roughly ₹11,600, but adds well over ₹1 lakh in extra interest over the life of the loan compared with the 5-year term.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Used Cars Follow Different Rules</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Used cars follow a noticeably different set of rules than new ones. Down payments run higher — typically 15-30% versus 10-20% for new cars — and interest rates jump too: SBI&apos;s Certified Pre-Owned scheme runs 10.45-15.60% against 8.70-9.85% for new cars, and most lenders will not finance a used car past a certain total age (commonly 8-10 years including the loan tenure). A 5-year-old car, for example, might only qualify for a 3-4 year loan rather than the 7 years available on a new one, since the lender wants the loan to finish well before the car becomes hard to resell. Getting the vehicle professionally valued before applying — rather than relying on the seller&apos;s asking price — also affects how much a bank is willing to lend against it.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans for NRIs and Returning Residents</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Non-Resident Indians face a different structure rather than a locked door. Most major banks, including SBI, offer a dedicated NRI Car Loan scheme, but the NRI applicant is typically treated as guarantor rather than owner: a close resident-Indian relative (parent, spouse, sibling, or child) must act as co-applicant, and the vehicle is registered in that relative&apos;s name. EMIs are repaid from the NRI&apos;s NRE, NRO, or FCNR account, or by remittance from abroad, and SBI&apos;s version caps the EMI at 50-65% of net monthly income depending on the loan size. Rates for NRI applicants are generally identical to resident rates at the same bank — the extra requirement is the co-applicant relationship and a steady, documented overseas income of at least USD 1,000/month.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — India</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is a good car loan interest rate in India in 2026?', a: "It depends on your CIBIL score. SBI's published 2026 table shows 8.70% for a score of 750+, rising to 8.90% for 721-756, and 9.65-9.85% for 650-720. PSU banks like Canara Bank and Union Bank of India advertise starting rates as low as 7.40-7.45% for their best-qualified borrowers." },
                { q: 'What is the difference between on-road price and ex-showroom price?', a: 'Ex-showroom price is the base cost including GST but excludes registration, road tax, and insurance. On-road price adds all mandatory costs and is what you actually pay and finance — it varies by state since road tax does.' },
                { q: 'What is the 20-10-4 rule for car loans in India?', a: "Pay 20% of the on-road price as down payment, keep the EMI at or under 10% of your net take-home salary, and limit the tenure to 4 years. It's stricter than what banks will actually approve under their own FOIR rules (up to 50-75% of income)." },
                { q: 'Should I choose a flat interest rate or reducing balance rate?', a: 'Always confirm reducing-balance. A "flat rate" of 8%, still sometimes pitched by used-car dealers, works out to roughly 14-15% once converted to reducing balance — nearly double what it sounds like.' },
                { q: 'How much down payment do I need for a car loan in India?', a: 'Most banks require 10-20% of the on-road price for new cars; some offer 100% financing to salaried applicants with strong CIBIL scores. Used cars typically need 15-30% down.' },
                { q: 'Can NRIs get a car loan in India?', a: "Yes. Most major banks, including SBI, offer a dedicated NRI Car Loan scheme, but the NRI is typically the guarantor while a resident-Indian relative is the co-applicant and vehicle owner. EMIs are repaid from the NRI's NRE, NRO, or FCNR account." },
                { q: 'How long can a car loan tenure be in India?', a: 'Up to 7 years at most banks for new cars, though 3-5 years is commonly recommended since cars depreciate quickly. Used-car tenures are usually shorter, often capped so the loan ends before the vehicle reaches 8-10 years of total age.' },
                { q: 'Are there processing fees or prepayment charges on car loans in India?', a: 'Yes. Processing fees typically run 0.25-2% of the loan amount. Many PSU banks waive prepayment charges after a lock-in period, while some private banks and NBFCs charge them for the full tenure — worth confirming before you sign.' },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and terms checked against SBI&apos;s published 2026 rate table and current published PSU/private bank and NBFC rate sheets.
          </p>

          <RelatedTools tool="auto-loan-calculator-india" />

        </div>
      </div>
    </>
  );
}
