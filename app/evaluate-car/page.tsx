import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Camera, TrendingDown, Gauge, Wrench } from 'lucide-react';
import CarValueEstimatorClient from './client';

export const metadata: Metadata = {
  title: 'Car Value Estimator — What\'s My Car Worth? (No Photo Needed)',
  description: 'Estimate your car\'s current value from its original price, age, mileage, and condition — free, instant, works in any currency, no photo required.',
  alternates: { canonical: 'https://www.naira.autos/evaluate-car' },
  openGraph: {
    title: 'Car Value Estimator | Naira Autos',
    description: 'Estimate your car\'s current market value from price, age, mileage, and condition — free and instant, any currency.',
    url: 'https://www.naira.autos/evaluate-car',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/evaluate-car',
      name: 'Car Value Estimator — What\'s My Car Worth? (No Photo Needed)',
      description: 'Estimate your car\'s current value from its original price, age, mileage, and condition — free, instant, works in any currency, no photo required.',
      url: 'https://www.naira.autos/evaluate-car',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Car Value Estimator', item: 'https://www.naira.autos/evaluate-car' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does a car depreciate each year?', acceptedAnswer: { '@type': 'Answer', text: 'A typical new car loses around 20% of its value in the first year, then roughly 10–15% a year for the next several years, before depreciation slows down after around year 5 or 6. Luxury and quickly-changing models tend to depreciate faster than economy models known for reliability.' } },
        { '@type': 'Question', name: 'Does high mileage always lower a car\'s value?', acceptedAnswer: { '@type': 'Answer', text: 'Generally yes, but it matters relative to the car\'s age. A 5-year-old car with 40,000km is considered low mileage and can be worth more than average, while the same car with 150,000km is considered high mileage and worth less than average.' } },
        { '@type': 'Question', name: 'How much does an accident history lower resale value?', acceptedAnswer: { '@type': 'Answer', text: 'A documented prior accident, even after a proper repair, commonly reduces a car\'s resale value by around 10–15% compared to an equivalent accident-free example, because buyers price in the uncertainty around hidden damage.' } },
        { '@type': 'Question', name: 'What\'s the difference between this tool and the AI photo valuation?', acceptedAnswer: { '@type': 'Answer', text: 'This estimator uses general depreciation rules of thumb applied to numbers you enter — original price, age, mileage, and condition — with no photo required. The AI valuation tool instead analyzes an actual photo of your car and cross-references real listing data to identify the exact model and produce a market-calibrated estimate.' } },
        { '@type': 'Question', name: 'Is this a guaranteed sale price?', acceptedAnswer: { '@type': 'Answer', text: 'No. It\'s a rule-of-thumb estimate meant to give you a reasonable starting point, not a guaranteed price. Actual resale value depends on local demand, specific trim, service history, and negotiation.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Car Value Estimator', applicationCategory: 'AutomotiveApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function CarValueEstimatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-sky-500/20 border border-white/15 hover:border-sky-500/40 text-white/60 hover:text-sky-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Car Value Estimator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-sky-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">No photo needed</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Value<br /><span className="text-sky-400">Estimator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Just the numbers — price, age, mileage, condition.</p>
            <p className="text-white/75 text-sm leading-relaxed">Get a rule-of-thumb estimate of your car&apos;s current value in seconds, in any currency. No photo, no signup — have a photo instead? Try our AI valuation tool.</p>
          </div>
        </div>
      </div>

      <CarValueEstimatorClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* How the estimate works */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              How This Estimate Is Calculated
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Every car loses value the moment it&apos;s driven off the lot, and it keeps losing value on a fairly predictable curve from there — steepest in the first year, then gradually leveling off. This estimator applies that curve directly to the original price you enter: roughly 20% in year one, then about 15% a year through year five, and closer to 10% a year after that, compounding each year rather than simply subtracting a flat percentage. A car that&apos;s five years old, in other words, isn&apos;t worth &quot;75% off&quot; a flat rate — it&apos;s worth whatever&apos;s left after each of those years takes its own bite out of what remained.
              </p>
              <p>
                On top of the age curve, the estimate adjusts for three more things you actually control or can observe: mileage relative to what&apos;s typical for the car&apos;s age (higher than average pulls the estimate down, lower than average pushes it up), condition (excellent, good, fair, or poor, each with its own multiplier), and whether the car has a documented accident in its history, which knocks off roughly 10–15% even after a proper repair, since buyers price in the uncertainty. None of these adjustments require knowing your specific make and model — they&apos;re general rules that hold reasonably well across most ordinary cars, which is exactly what makes this useful as a fast, no-photo starting point rather than a precise appraisal.
              </p>
            </div>
          </div>

          {/* Worked example */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              A Worked Example
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Take a car that cost 15,000,000 brand new and is now 5 years old, with 90,000km on it and no accident history, in generally good condition. The age curve alone brings it down to roughly 41.8% of its original price — about 6,264,000 — after five successive years of depreciation compounding on top of each other rather than five flat 15% chunks subtracted at once. From there, the mileage adjustment comes into play: at 90,000km against an expected 75,000km for a car this age, that&apos;s about 20% more distance than typical, which trims the estimate by roughly 3%. Good condition with no accident history doesn&apos;t move the number further in either direction, since those are treated as the neutral baseline.
              </p>
              <p>
                Put together, the estimate lands around 6,076,000 — a likely range of roughly 5,469,000 to 6,684,000 once you account for the fact that this is a rule-of-thumb figure, not an appraisal. That&apos;s about 60% total depreciation over five years, which lines up with the general expectation that a car in its fifth year has typically lost more than half its original value, with the steepest single-year drop already behind it from year one. Changing any one input — a cleaner condition rating, lower mileage, or a documented accident — shifts that number meaningfully, which is the point of entering your own numbers rather than reading a single industry average.
              </p>
            </div>
          </div>

          {/* What moves the number */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Moves Your Estimate the Most
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: TrendingDown, title: 'Age, especially year one', text: 'The first year alone typically accounts for around 20% of total depreciation — buying a car even a year old instead of brand new is one of the biggest value moves you can make.' },
                { icon: Gauge, title: 'Mileage vs. expectations', text: 'A car with meaningfully more or less mileage than typical for its age moves the estimate in either direction — low mileage is a genuine selling point, not just a number.' },
                { icon: Wrench, title: 'Condition and accident history', text: 'Deferred maintenance, visible wear, and a documented accident are the factors most within a seller\'s control to manage before valuing or listing a car.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-4 rounded-2xl bg-card border border-border">
                  <div className="w-9 h-9 rounded-lg bg-sky-500/10 flex items-center justify-center mb-3">
                    <Icon className="h-4.5 w-4.5 text-sky-500" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Which tool to use */}
          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              This Tool vs. Our AI Photo Valuation
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>
                We offer two different ways to estimate a car&apos;s worth because they solve different problems. This estimator works from numbers alone — original price, age, mileage, and condition — using general depreciation rules that apply reasonably well to any car, in any market, without needing to identify the exact model. It&apos;s the faster option when you just want a ballpark figure or don&apos;t have a photo handy.
              </p>
              <p>
                Our <Link href="/evaluate-used-car" className="text-sky-600 dark:text-sky-400 font-semibold hover:underline">AI car valuation tool</Link> takes a different approach: upload a photo, and it identifies your exact make, model, and trim, then cross-references real listing data to produce a market-calibrated estimate for your selected country. It&apos;s more precise when you have a photo on hand and want an estimate grounded in what similar cars are actually listed for, rather than a general rule of thumb.
              </p>
              <p>
                A reasonable way to think about it: use this estimator when you&apos;re still deciding whether it&apos;s worth pursuing a sale or trade-in at all — it takes seconds and needs nothing but numbers you already know. Switch to the AI photo tool once you&apos;re ready to list the car and want a figure that reflects the specific market you&apos;re selling into, since it accounts for things this calculator deliberately doesn&apos;t attempt, like regional demand, current listing supply, and trim-specific pricing. Neither number is a substitute for a buyer&apos;s actual offer, but starting with the quick estimate and confirming with the photo-based one before you set an asking price is a sensible way to use both.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Car Value Estimator FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How much does a car depreciate each year?', a: 'Typically around 20% in the first year, then roughly 10–15% a year for the next several years, slowing down after about year five or six. Luxury and fast-changing models tend to depreciate faster than reliable economy models.' },
                { q: 'Does high mileage always lower a car\'s value?', a: 'Generally yes, but it\'s relative to age — a 5-year-old car with 40,000km reads as low mileage and holds value better, while the same car with 150,000km reads as high mileage and is worth less than average.' },
                { q: 'How much does accident history lower resale value?', a: 'A documented prior accident commonly reduces resale value by around 10–15% versus an equivalent accident-free car, even after a proper repair, because buyers price in the uncertainty around hidden damage.' },
                { q: 'What\'s the difference between this and the AI photo valuation?', a: 'This tool uses general depreciation rules applied to numbers you enter, no photo needed. The AI tool analyzes an actual photo to identify your exact car and cross-references real listing data for a market-calibrated estimate.' },
                { q: 'Is this a guaranteed sale price?', a: 'No — it\'s a rule-of-thumb estimate to give you a reasonable starting point, not a guarantee. Actual value depends on local demand, trim, service history, and negotiation.' },
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
                { href: '/evaluate-used-car', label: 'AI Photo Valuation', color: 'orange' },
                { href: '/tools/auto-loan-calculator', label: 'Auto Loan Calculator', color: 'emerald' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'blue' },
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
