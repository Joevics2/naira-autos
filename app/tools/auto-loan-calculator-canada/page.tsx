import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import AutoLoanCanadaClient from './client';
import { alternatesFor } from '@/lib/hreflang';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'Car Loan Calculator (Canada) — Provincial Tax, Trade-In & 20/4/10',
  description: 'Free Canada car loan calculator with all 10 provincial sales tax rates, trade-in credit rules (including Quebec\u2019s accommodation-sale exception), and a 20/4/10 affordability check.',
  alternates: alternatesFor('/tools/auto-loan-calculator-canada'),
  openGraph: {
    title: 'Car Loan Calculator (Canada) | Naira Autos',
    description: 'Free Canada car loan calculator \u2014 monthly payment by province, trade-in tax credit rules, and a 20/4/10 affordability check with 2026 Bank of Canada data.',
    url: 'https://www.naira.autos/tools/auto-loan-calculator-canada',
    locale: 'en',
    type: 'website',
  },
  keywords: [
    'car loan calculator canada', 'auto loan calculator canada', 'car loan interest rate canada 2026',
    'provincial sales tax car ontario quebec alberta', 'car loan negative equity canada',
    '20/4/10 rule canada', 'car loan calculator with trade in canada',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/auto-loan-calculator-canada',
      name: 'Car Loan Calculator (Canada) — Provincial Tax, Trade-In & 20/4/10',
      description: "Free Canada car loan calculator with all 10 provincial sales tax rates, trade-in credit rules, and a 20/4/10 affordability check.",
      url: 'https://www.naira.autos/tools/auto-loan-calculator-canada',
      dateModified: '2026-09-29',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Auto Loan Calculator', item: 'https://www.naira.autos/tools/auto-loan-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: '\uD83C\uDDE8\uD83C\uDDE6 Canada', item: 'https://www.naira.autos/tools/auto-loan-calculator-canada' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the average car loan interest rate in Canada in 2026?', acceptedAnswer: { '@type': 'Answer', text: "The Bank of Canada tracked an average of 6.57% as of April 2026. A commonly cited 'good' rate is around 7-8%, since the average leans toward well-qualified borrowers \u2014 there's no single published tiered rate table, so your own quote depends on credit, lender, and term." } },
        { '@type': 'Question', name: 'How much sales tax will I pay on a car in Canada?', acceptedAnswer: { '@type': 'Answer', text: 'It depends entirely on your province. Alberta charges only the 5% federal GST with no provincial tax. Ontario and the Atlantic provinces charge 13% and 15% HST. British Columbia, Saskatchewan, and Manitoba run 11-12%. Quebec combines GST and QST for 14.975%, the highest in the country.' } },
        { '@type': 'Question', name: 'Does trading in my car reduce the sales tax I pay?', acceptedAnswer: { '@type': 'Answer', text: 'In every province except Quebec, trading in your vehicle at the same dealer automatically reduces the taxable price to the difference between the new car\u2019s price and the trade-in value. In Quebec, this reduction only applies if the dealer structures the deal as a formal "accommodation sale" \u2014 ask for it by name.' } },
        { '@type': 'Question', name: 'Is an 84 or 96-month car loan a bad idea in Canada?', acceptedAnswer: { '@type': 'Answer', text: "It roughly doubles your total interest compared to a 36-month loan on the same amount and rate, per the FCAC's own example ($1,974 vs $4,681 interest on a $25,000 loan at 5%). Historically close to a third of Canadians trading in a vehicle have owed more than it was worth \u2014 a risk regulators call negative equity, and one long terms make worse." } },
        { '@type': 'Question', name: 'Can I cancel a car loan after signing in Canada?', acceptedAnswer: { '@type': 'Answer', text: "Generally no. Unlike some other purchases, there's no cooling-off period on a signed car loan contract in most Canadian provinces, according to the Financial Consumer Agency of Canada \u2014 review the terms carefully before you sign, since reversing it afterward usually isn't an option." } },
        { '@type': 'Question', name: 'Is the 20/4/10 rule still realistic for car buying in Canada?', acceptedAnswer: { '@type': 'Answer', text: "It's the most widely cited guideline \u2014 20% down, a 4-year term, total vehicle costs under 10% of gross income \u2014 but current financial planners have questioned whether it fits today's prices. A commonly suggested update: keep the purchase price under about 25% of gross annual income, and all-in monthly costs around 10% of gross monthly income." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Loan Calculator (Canada)', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function AutoLoanCalculatorCanadaPage() {
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
              <span className="text-white/50">🇨🇦 Canada</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">BoC avg: 6.57% (Apr 2026)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: September 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Loan<br /><span className="text-emerald-400">Calculator — Canada</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Every province&apos;s sales tax, built in.</p>
            <p className="text-white/75 text-sm leading-relaxed">Pick your province and this calculator applies the right sales tax and trade-in rules automatically — including Quebec&apos;s different treatment — then checks your payment against the 20/4/10 rule.</p>
          </div>
        </div>
      </div>

      <AutoLoanCanadaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loans in Canada — Rates, and the Provincial Tax Nobody Warns You About</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The <a href="https://www.bankofcanada.ca" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2 hover:text-foreground">Bank of Canada</a> tracks the average interest rate Canadians actually pay on auto loans from chartered banks, and it stood at <strong className="text-foreground">6.57%</strong> as of April 2026. A commonly cited &ldquo;good&rdquo; rate sits a bit higher, around 7-8%, since the tracked average leans toward well-qualified borrowers; your own quote depends on credit history, lender, and loan term the way it does everywhere, but Canada has no single published tiered rate table the way some markets do. One thing that catches newcomers off guard: unlike the UK, where the advertised price already includes VAT, Canadian car prices are shown before sales tax, and that tax still has to be added to whatever you finance, on top of the vehicle price.</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Every Province Taxes a Car Differently — and Not All Credit Your Trade-In the Same Way</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">That tax varies more than almost anywhere else, because Canada&apos;s provinces each set their own rate on top of the federal 5% GST. Alberta charges only the 5% GST and nothing more — it&apos;s the only province with no provincial sales tax on vehicles at all, and even private used-car sales there are tax-free. At the other end, Quebec combines the GST with a 9.975% Quebec Sales Tax for a total of 14.975%, while Ontario&apos;s 13% HST and the Atlantic provinces&apos; 15% HST sit in between; British Columbia, Saskatchewan, and Manitoba land around 11-12%. In most of the country, trading in your old car at the same dealer automatically reduces the amount you pay sales tax on — a $40,000 car with a $10,000 trade-in is taxed on $30,000. Quebec is the exception: that same reduction only applies if your dealer structures the deal as a formal &ldquo;accommodation sale,&rdquo; so it&apos;s worth asking for by name rather than assuming it happens automatically.</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {[
              { label: '5% – 14.975%', desc: 'Provincial sales tax range: Alberta to Quebec', color: 'text-emerald-600 dark:text-emerald-400' },
              { label: '6.57%', desc: 'Bank of Canada tracked average auto loan rate, April 2026', color: 'text-blue-600 dark:text-blue-400' },
              { label: '~1/3', desc: 'Share of Canadian trade-ins historically in negative equity', color: 'text-amber-600 dark:text-amber-400' },
            ].map(({ label, desc, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>84 and 96-Month Loans Are Now Normal — and That&apos;s Exactly the Problem</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Long loan terms have become the industry&apos;s default answer to rising prices, and regulators are increasingly uneasy about it. The Financial Consumer Agency of Canada&apos;s own example makes the tradeoff plain: a $25,000 loan at 5% costs $1,974 in interest over 36 months, but $4,681 over 84 months — more than double, for the same car and rate. Stretching a term to 84 or 96 months lowers the monthly payment, but it also means more of the loan sits unpaid for longer relative to a depreciating asset; historically, close to a third of Canadians trading in a vehicle have owed more than it was worth, a position regulators call negative equity and warn can trap buyers in what the FCAC calls an &ldquo;auto-debt treadmill&rdquo; of rolling old debt into each new purchase. One protection many assume exists but doesn&apos;t: in most provinces there&apos;s no cooling-off period on a signed car loan, so once the contract is signed you generally can&apos;t reverse it the way you might expect with some other purchases. On the demand side, Equifax Canada&apos;s Q1 2026 report found new bank and manufacturer-financed auto loans had actually fallen almost 5% year over year to a three-year low, which the agency linked to rising insurance, maintenance, and fuel costs making buyers hesitate even before the loan payment itself.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Is the 20/4/10 Rule Still Realistic in 2026?</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Canadian financial guidance has long pointed to the same 20/4/10 rule used elsewhere: 20% down, a loan term of 4 years or less, and total vehicle costs — payment, insurance, fuel, and maintenance combined — under 10% of gross monthly income. But by 2026, practising financial planners were publicly questioning whether it still holds up. Writing for CTV News in August 2026, certified financial planner Christopher Liew offered a more workable modern version instead: keep the purchase price under roughly 25% of your gross annual income, and keep all-in monthly costs — payment, insurance, and maintenance together — around 10% of gross monthly income. Both versions agree on the same underlying point: judge a car by its total, all-in cost against your income, not by whether the monthly payment alone feels manageable once a dealer has stretched the term to make it fit.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Ontario, With a Trade-In</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Sarah lives in Ontario and earns $95,000 a year gross ($7,917 a month) and wants a $42,000 new SUV with a $6,000 trade-in. Ontario&apos;s 13% HST applies to the $36,000 net price after her trade-in, adding $4,680 in tax, for a total of $40,680 to finance after a 15% down payment of $6,300. At a representative 7% rate over 60 months, her payment comes out to roughly $681 a month, or about 8.6% of her gross income — inside the 10% ceiling in the classic 20/4/10 rule, though that figure alone doesn&apos;t yet include insurance and fuel, which the rule expects to be counted too.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Leasing Is a Bigger Part of the Market Here Than in Many Countries</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Leasing occupies a bigger share of the Canadian market than in many countries, and it&apos;s worth deciding between the two before you even start comparing loan rates. A lease is structured closer to a long-term rental: lower monthly payments than a loan on the same car, sales tax charged only on the monthly payment rather than the full price upfront, but no ownership at the end unless you exercise a separate purchase option, and mileage limits that can carry real penalty costs if you exceed them. As stretched loan terms have made financing look more lease-like in monthly cost, more buyers are weighing the two directly rather than treating leasing as the default &ldquo;can&apos;t afford to buy&rdquo; option it used to be seen as.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where Canadians Actually Finance a Car</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">The market runs through Canada&apos;s major banks — RBC, TD, Scotiabank, BMO, and CIBC all offer auto loans directly — alongside Desjardins, the dominant credit union network in Quebec, and manufacturer captive-finance arms like Toyota Financial Services Canada, Honda Financial Services Canada, and Ford Credit Canada, which sometimes run promotional rates well below bank averages on specific new models. Getting a pre-approval from your own bank before visiting a dealership gives you a number to compare any dealer-arranged financing against, the same principle that applies almost everywhere car finance is sold through the showroom.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Loan FAQ — Canada</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is the average car loan interest rate in Canada in 2026?', a: "The Bank of Canada tracked 6.57% as of April 2026. A commonly cited 'good' rate is 7-8%; there's no single tiered rate table, so your quote depends on credit, lender, and term." },
                { q: 'How much sales tax will I pay on a car?', a: 'It depends on your province: Alberta 5% (GST only), Ontario 13% HST, Atlantic provinces 15% HST, BC/SK/MB 11-12%, Quebec 14.975% (highest in the country).' },
                { q: 'Does trading in my car reduce the sales tax I pay?', a: "In every province except Quebec, yes \u2014 tax applies only to the price minus the trade-in value. Quebec needs a formal \"accommodation sale\" for the same credit to apply." },
                { q: 'Is an 84 or 96-month car loan a bad idea?', a: "It roughly doubles total interest vs. a 36-month loan (FCAC example: $1,974 vs $4,681 on a $25,000/5% loan). Historically about a third of Canadian trade-ins have been in negative equity." },
                { q: 'Can I cancel a car loan after signing?', a: "Generally no \u2014 there's no cooling-off period on a signed car loan contract in most provinces, per the FCAC. Review terms carefully before signing." },
                { q: 'Is the 20/4/10 rule still realistic in 2026?', a: "It's the most cited guideline, but planners increasingly question it given today's prices. A common update: purchase price under ~25% of gross annual income, all-in costs around 10% of gross monthly income." },
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>, Auto Sales Expert. Rates and figures checked against Bank of Canada data, the Financial Consumer Agency of Canada, Equifax Canada&apos;s Q1 2026 report, and current provincial sales tax rules.
          </p>

          <RelatedTools tool="auto-loan-calculator-canada" />

        </div>
      </div>
    </>
  );
}
