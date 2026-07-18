import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Percent, Fuel, Wrench as WrenchIcon } from 'lucide-react';
import RideShareClient from './client';

export const metadata: Metadata = {
  title: 'Ride-Share Earnings Calculator — Real Uber, Bolt & Lyft Net Profit',
  description: 'Find out what you actually take home driving Uber, Bolt, or Lyft after platform commission, fuel, and maintenance. Free calculator, works with any currency.',
  alternates: { canonical: 'https://www.naira.autos/tools/rideshare-earnings-calculator' },
  openGraph: {
    title: 'Ride-Share Earnings Calculator | Naira Autos',
    description: 'Free calculator for real Uber, Bolt, and Lyft net profit after commission, fuel, and maintenance — any currency, anywhere.',
    url: 'https://www.naira.autos/tools/rideshare-earnings-calculator',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/rideshare-earnings-calculator',
      name: 'Ride-Share Earnings Calculator — Real Uber, Bolt & Lyft Net Profit',
      description: 'Find out what you actually take home driving Uber, Bolt, or Lyft after platform commission, fuel, and maintenance. Free calculator, works with any currency.',
      url: 'https://www.naira.autos/tools/rideshare-earnings-calculator',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Ride-Share Earnings Calculator', item: 'https://www.naira.autos/tools/rideshare-earnings-calculator' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much commission do Uber, Bolt, and Lyft take?', acceptedAnswer: { '@type': 'Answer', text: 'It varies by city and over time, but Uber commonly takes around 25% of the fare, Bolt is often closer to 15–20%, and Lyft is typically around 20–25%. Always check your own weekly statement, since actual rates differ by market and can change without much notice.' } },
        { '@type': 'Question', name: 'What expenses should I subtract to find my real ride-share profit?', acceptedAnswer: { '@type': 'Answer', text: 'At minimum: platform commission, fuel, and routine maintenance like oil changes, tires, and brakes. A fuller picture also includes insurance, vehicle depreciation, loan or lease payments on the car, phone data, car washes, and income tax.' } },
        { '@type': 'Question', name: 'Is ride-share driving actually profitable after expenses?', acceptedAnswer: { '@type': 'Answer', text: 'It depends heavily on your city\'s fare rates, how much time you spend driving without a passenger, your car\'s fuel economy, and how well you control maintenance costs. Many drivers who track expenses closely find their real hourly profit is meaningfully lower than the gross fare total the app shows them.' } },
        { '@type': 'Question', name: 'How do I lower my fuel costs as a ride-share driver?', acceptedAnswer: { '@type': 'Answer', text: 'Driving a more fuel-efficient vehicle has the single biggest impact, followed by reducing idle time, keeping tires properly inflated, and avoiding unnecessary long deadhead trips (driving without a passenger) between fares.' } },
        { '@type': 'Question', name: 'Should I count vehicle depreciation as an expense?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, for a true picture of profitability. High-mileage ride-share driving wears out a car faster than typical personal use, which lowers its resale value over time — that cost is real even though it doesn\'t show up as a weekly cash expense.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Ride-Share Earnings Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function RideShareEarningsCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
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
              <span className="text-white/50">Ride-Share Earnings Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Uber · Bolt · Lyft</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Ride-Share Earnings<br /><span className="text-emerald-400">Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What you actually take home — not what the app shows you.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter your fares, platform commission, fuel, and running costs to see your real net profit — per period, per hour, and per kilometer or mile. Works in any currency.</p>
          </div>
        </div>
      </div>

      <RideShareClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* Why gross ≠ profit */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Why Your App Balance Isn&apos;t Your Real Profit
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                The earnings screen in the Uber, Bolt, or Lyft driver app shows your gross fares — the total riders paid before the platform takes its cut. That number feels good to look at, but it isn&apos;t what actually lands in your pocket, and it definitely isn&apos;t what&apos;s left after your car has done its share of the work. Between platform commission, fuel, tires, oil changes, insurance, and the general wear of driving far more miles than the average commuter, a driver who&apos;s only tracking the gross number can be working for a real hourly rate that&apos;s significantly lower than it looks — sometimes low enough that a slower, less busy shift with less traffic and idling actually nets more per hour than a frantic high-fare one.
              </p>
              <p>
                This calculator exists to close that gap. Instead of estimating your take-home pay from memory, it walks through the same math a driver doing their own spreadsheet would: subtract the platform&apos;s commission from your gross fares to get your net fare, subtract your actual running costs — fuel calculated from your distance and your car&apos;s real fuel economy, plus maintenance, insurance, and other expenses — and what&apos;s left is your net profit for the period. From there it breaks the number down per hour and per kilometer or mile driven, which are usually more useful for decision-making than a single weekly total, since they let you compare one shift, one city, or one car against another on equal footing.
              </p>
            </div>
          </div>

          {/* How to raise your margin */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Three Levers That Move Your Margin the Most
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Percent, title: 'Minimize deadhead time', text: 'Time spent driving to a pickup or cruising for the next fare burns fuel and adds mileage without earning anything. Staying in high-demand zones during peak hours cuts this down.' },
                { icon: Fuel, title: 'Drive a fuel-efficient car', text: 'Fuel is usually the single biggest variable cost after commission. A car doing 6 L/100km instead of 10 L/100km can be the difference between a thin margin and a comfortable one.' },
                { icon: WrenchIcon, title: 'Stay ahead of maintenance', text: 'Small, regular maintenance — oil changes, tire rotation, brake checks — is cheaper than the breakdown or accelerated wear that comes from skipping it, especially at ride-share mileage.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-4 rounded-2xl bg-card border border-border">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
                    <Icon className="h-4.5 w-4.5 text-emerald-500" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Worked example */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              A Worked Example
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Say a driver earns 150,000 in gross fares over a week, working 40 hours. The platform takes 25% commission, leaving a net fare of 112,500. Over that week they drove 600km in a car that averages 8 liters per 100km, at a fuel price of 1,200 per liter — that&apos;s 48 liters, or 57,600 in fuel. Add 8,000 in routine maintenance and 5,000 in other costs like data and car washes, and total expenses come to 70,600. Net profit works out to 41,900 for the week — a margin of roughly 28% on the original gross figure, or about 1,048 per hour and 70 per kilometer driven.
              </p>
              <p>
                Notice how different that 41,900 looks next to the 150,000 the app displayed at the top of the earnings screen — less than a third of the headline number, once commission and real running costs are subtracted. That gap is exactly why gross fares alone are a poor way to judge whether a shift, a city, or a particular car is actually working out financially. Two drivers can post the same weekly gross and end up with meaningfully different take-home pay purely because one is driving a thirstier car, spending more time deadheading between fares, or letting maintenance slide until it becomes an expensive repair instead of a cheap one.
              </p>
            </div>
          </div>

          {/* What counts as an expense */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              What Actually Counts as a Ride-Share Expense
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Fuel and platform commission are the two expenses every driver already feels, since they come straight out of each fare or each fill-up. Maintenance is the one that&apos;s easy to underestimate — a car doing 30,000–50,000km a year of ride-share driving needs oil changes, tires, and brake pads far more often than a car doing typical personal mileage, and those costs arrive in occasional larger bills rather than a steady weekly drip, which makes them easy to forget about until the bill lands.
              </p>
              <p>
                Beyond the expenses in the calculator above, a fully accurate picture also includes insurance (commercial or ride-share-specific cover, where required, often costs more than a standard personal policy), any loan or lease payment on the vehicle itself, and vehicle depreciation — the gradual loss in resale value that high-mileage commercial use accelerates. None of those show up as a cash expense in a given week, but they&apos;re real costs of doing the work, and a driver who ignores them can end up with a car that&apos;s worth far less than expected by the time it&apos;s paid off or ready to sell. Income tax on your net earnings is worth factoring in too, since ride-share income is typically self-employment income rather than a payroll wage with tax withheld automatically.
              </p>
            </div>
          </div>

          {/* Platform commission table */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Typical Platform Commission Ranges
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Platform</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Typical commission</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Uber', '~25%', 'Can include additional booking fees on top of the base commission, depending on market.'],
                    ['Bolt', '~15–20%', 'Often runs lower than Uber in many markets, but varies by city and promotion.'],
                    ['Lyft', '~20–25%', 'Rate structures vary by region and driver tier.'],
                  ].map(([p, c, n]) => (
                    <tr key={p} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-foreground text-sm whitespace-nowrap">{p}</td>
                      <td className="px-4 py-2.5 text-muted-foreground font-semibold">{c}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">{n}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              These are general reference ranges, not a guarantee — commission structures change by city, by driver loyalty tier, and over time. Your own in-app weekly statement is always the most accurate source for your actual rate; use it as the commission figure in the calculator above.
            </p>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Ride-Share Earnings FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How much commission do Uber, Bolt, and Lyft take?', a: 'It varies by city and over time — Uber is commonly around 25%, Bolt often 15–20%, and Lyft typically 20–25%. Check your own weekly statement for your actual rate.' },
                { q: 'What expenses should I subtract to find my real profit?', a: 'At minimum: platform commission, fuel, and routine maintenance. A fuller picture adds insurance, depreciation, loan/lease payments, data, car washes, and tax.' },
                { q: 'Is ride-share driving actually profitable after expenses?', a: 'It depends on local fare rates, deadhead time, your car\'s fuel economy, and how tightly you manage maintenance — many drivers find their real hourly profit is lower than the gross number suggests.' },
                { q: 'How do I lower my fuel costs as a driver?', a: 'A more fuel-efficient car has the biggest impact, followed by reducing idle time, keeping tires inflated, and cutting unnecessary deadhead trips between fares.' },
                { q: 'Should I count vehicle depreciation as an expense?', a: 'Yes — high-mileage ride-share driving wears a car down faster than typical use, which lowers resale value even though it doesn\'t show up as a weekly cash cost.' },
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
                { href: '/tools/fuel-cost-calculator', label: 'Fuel Cost Calculator', color: 'emerald' },
                { href: '/tools/fuel-economy-converter', label: 'Fuel Economy Converter', color: 'amber' },
                { href: '/tools/insurance-calculator', label: 'Insurance Calculator', color: 'blue' },
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
