import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import RoadTripClient from './client';

export const metadata: Metadata = {
  title: 'Nigeria Road Trip Calculator — Distance, Travel Time & Fuel Cost by Route',
  description: 'How far and how many hours from Lagos to Abuja, Port Harcourt, Ibadan, and 35+ more Nigerian routes? Get distance, drive time, and exact petrol cost for your car — instant naira estimate.',
  alternates: { canonical: 'https://www.naira.autos/tools/road-trip-calculator' },
  openGraph: {
    title: 'Nigeria Road Trip Calculator — Distance, Hours & Fuel Cost | Naira Autos',
    description: 'Free distance, drive-time, and fuel cost calculator for 35+ Nigerian routes. Lagos to Abuja, Lagos to Port Harcourt, and more — instant results.',
    url: 'https://www.naira.autos/tools/road-trip-calculator',
  },
  keywords: ['lagos to abuja distance','how many hours from lagos to abuja by road','lagos to abuja by road','distance from lagos to abuja','lagos to abuja km','road trip cost calculator','fuel cost calculator','calculate gas for trip','trip cost calculator','fuel trip calculator','road trip fuel calculator','petrol cost calculator','journey fuel cost calculator','travel cost calculator','lagos to abuja fuel cost','lagos abuja distance','road trip cost nigeria','fuel cost nigeria','trip expense calculator','how many kilometers from lagos to abuja','lagos to ibadan distance','how many km is lagos to ibadan','lagos to port harcourt by road'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/road-trip-calculator',
      name: 'Nigeria Road Trip Calculator — Distance, Travel Time & Fuel Cost',
      description: 'Get the distance, drive time, and fuel cost for any Nigerian road trip. 35+ routes, 100+ car models.',
      url: 'https://www.naira.autos/tools/road-trip-calculator',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Road Trip Calculator', item: 'https://www.naira.autos/tools/road-trip-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How many hours from Lagos to Abuja by road?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos to Abuja by road is approximately 791km and typically takes 10–13 hours depending on traffic, checkpoints, and road conditions on the Ore–Okene–Lokoja route. Leaving before 5am usually cuts 1–2 hours off the journey by avoiding Lagos exit traffic.' } },
        { '@type': 'Question', name: 'What is the distance from Lagos to Abuja?', acceptedAnswer: { '@type': 'Answer', text: 'The distance from Lagos to Abuja by road is approximately 791km via the Ore–Okene–Lokoja route, the standard route for interstate travel and freight between the two cities.' } },
        { '@type': 'Question', name: 'How many kilometers is Lagos to Ibadan?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos to Ibadan is approximately 128km via the Lagos–Ibadan Expressway (Sagamu Interchange), typically a 1.5–2 hour drive depending on traffic.' } },
        { '@type': 'Question', name: 'How much does Lagos to Abuja cost in fuel?', acceptedAnswer: { '@type': 'Answer', text: 'The Lagos–Abuja distance is approximately 791km via Ore–Okene. A Toyota Camry 2.5 on mixed driving uses about 71 litres. At ₦1,000/litre that is roughly ₦71,000. A Lexus RX 350 (12.5L/100km city) would cost approximately ₦95,000 on the same route.' } },
        { '@type': 'Question', name: 'How do I calculate fuel cost for a road trip in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Use the Naira Autos road trip calculator: select your origin and destination cities, choose your car brand and model, set the driving mode (city/mixed/highway), and drag the pump price slider to your current station price. The calculator multiplies the fuel consumption rate by the distance and your pump price to give an instant naira result, alongside the estimated drive time.' } },
        { '@type': 'Question', name: 'What is the distance from Lagos to Port Harcourt by road?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos to Port Harcourt is approximately 669km by road via the East–West Road, passing through Ore, Benin City, and Warri. The journey typically takes 9–12 hours depending on traffic and road conditions.' } },
        { '@type': 'Question', name: 'How much fuel does a Toyota Highlander use Lagos to Abuja?', acceptedAnswer: { '@type': 'Answer', text: 'A Toyota Highlander 3.5 (2014–2019) uses approximately 9.8L/100km on the highway. Lagos to Abuja (791km) requires about 77 litres. At ₦1,000/litre, expect to spend roughly ₦77,000 in fuel. Its 72-litre tank means one refill en route (Ore or Lokoja) is needed.' } },
        { '@type': 'Question', name: 'How many litres of fuel does Lagos to Ibadan require?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos to Ibadan via Sagamu is approximately 128km. A Toyota Camry 2.5 at mixed driving (9L/100km) uses about 11.5 litres. At ₦1,000/litre, the fuel cost is approximately ₦11,500 one way.' } },
        { '@type': 'Question', name: 'What is the current petrol price in Nigeria 2026?', acceptedAnswer: { '@type': 'Answer', text: 'As of August 2026, Nigerian pump prices range from approximately ₦850 to ₦1,150 per litre at most filling stations, with NNPC stations typically at the lower end. Prices are deregulated and track the exchange rate. Use the pump price slider in this calculator to set your exact current station price.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Nigeria Road Trip Fuel Cost Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

const POPULAR_ROUTES = [
  { from:'Lagos',         to:'Abuja',         km:791,  via:'Ore–Okene–Lokoja',     hours:'10–13 hrs',  camryEst:71320 },
  { from:'Lagos',         to:'Port Harcourt', km:669,  via:'Benin City–Warri',     hours:'9–12 hrs',   camryEst:60210 },
  { from:'Lagos',         to:'Ibadan',        km:128,  via:'Sagamu Interchange',   hours:'1.5–2 hrs',  camryEst:11520 },
  { from:'Lagos',         to:'Benin City',    km:320,  via:'Ore–Sagamu',           hours:'4–5.5 hrs',  camryEst:28800 },
  { from:'Abuja',         to:'Kano',          km:370,  via:'Kaduna',               hours:'5–6.5 hrs',  camryEst:33300 },
  { from:'Port Harcourt', to:'Calabar',       km:212,  via:'Aba',                  hours:'3–3.5 hrs',  camryEst:19080 },
  { from:'Abuja',         to:'Enugu',         km:370,  via:'Makurdi',              hours:'5–6.5 hrs',  camryEst:33300 },
  { from:'Lagos',         to:'Enugu',         km:518,  via:'Benin–Asaba–Onitsha',  hours:'7–9 hrs',    camryEst:46620 },
];

export default function RoadTripCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Road Trip Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-amber-500 px-3 py-1 rounded-full">Free Tool</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">35+ Nigerian routes</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: August 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Road Trip<br /><span className="text-amber-400">Distance, Time &amp; Fuel Cost</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How far, how long, and how much in petrol?</p>
            <p className="text-white/75 text-sm leading-relaxed">Pick your origin and destination for instant distance and drive time — add your car model and pump price for an exact naira fuel estimate. Covers 35+ Nigerian routes.</p>
          </div>
        </div>
      </div>

      <RoadTripClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Popular Routes Table */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance, Drive Time &amp; Fuel Cost — Popular Nigerian Routes
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Drive time assumes typical interstate conditions with normal traffic and stops. Fuel cost shown for a Toyota Camry 2.5 at mixed driving (~9L/100km) and ₦1,000/litre pump price — actual cost depends on your car and driving style.</p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Route</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground hidden sm:table-cell">Via</th>
                    <th className="text-center px-4 py-3 font-bold text-amber-600 dark:text-amber-400">Distance</th>
                    <th className="text-center px-4 py-3 font-bold text-blue-600 dark:text-blue-400">Drive Time</th>
                    <th className="text-right px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Camry Est.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {POPULAR_ROUTES.map(({ from, to, km, via, hours, camryEst }) => (
                    <tr key={`${from}-${to}`} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground">{from} → {to}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs hidden sm:table-cell">{via}</td>
                      <td className="px-4 py-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{km}km</td>
                      <td className="px-4 py-2.5 text-center text-blue-600 dark:text-blue-400 font-bold">{hours}</td>
                      <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">₦{camryEst.toLocaleString('en-NG')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Full editorial SEO */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How to Calculate Fuel Cost for a Nigerian Road Trip
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Calculating the petrol cost of a Nigerian road trip involves three numbers: the <strong className="text-foreground">distance in kilometres</strong>, your car's <strong className="text-foreground">fuel consumption in litres per 100km</strong>, and the <strong className="text-foreground">current pump price per litre</strong>. The formula is simple: (distance ÷ 100) × fuel consumption × pump price = naira cost. A Toyota Camry 2.5 consuming 9L/100km over the 791km Lagos–Abuja route uses 71.2 litres. At ₦1,000/litre, that's ₦71,200.</p>
                  <p>Where it gets complicated is Nigerian pump prices are <strong className="text-foreground">volatile and deregulated</strong>. Since the subsidy removal in 2023, pump prices track the naira/dollar exchange rate and have fluctuated significantly. This calculator's slider covers ₦500–₦2,000/litre so you can set the exact price at your filling station before you travel — not a six-month-old figure from a press release.</p>
                  <p>The <strong className="text-foreground">driving mode</strong> also dramatically affects cost. Lagos–Abuja is not a purely highway drive — the first 30km out of Lagos and last 20km into Abuja are city-speed, and stop-and-go conditions on the Sagamu–Ore stretch can increase fuel consumption 20–30% above highway figures. The Mixed mode in this calculator is the most accurate default for most long Nigerian routes.</p>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Fuel stops are a critical part of Nigerian road trip planning. On the Lagos–Abuja route, the key refuelling points are <strong className="text-foreground">Ore</strong> (288km from Lagos), <strong className="text-foreground">Okene</strong> (~530km), and <strong className="text-foreground">Lokoja</strong> (~560km). A Toyota Land Cruiser with its 93-litre tank uses approximately 107 litres on this route — it cannot complete the journey on one tank from Lagos regardless of driving mode.</p>
                  <p>On the Lagos–Port Harcourt route (669km), fuel stops at <strong className="text-foreground">Benin City</strong> (320km) and <strong className="text-foreground">Warri</strong> (352km) are standard. NNPC Mega Stations are generally more reliable for fuel availability on interstate routes than independent marketers.</p>
                  <p>Night driving reduces fuel consumption 10–15% due to cooler ambient temperatures and less traffic — but increases risk on the Lagos–Ibadan expressway and Abuja–Kaduna road, which have known security concerns after dark. For daytime travel, budget for the Mixed consumption rate plus 10–15% contingency for unexpected traffic and AC usage.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Lagos to Abuja Fuel Cost — Full Breakdown by Car
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border mb-6">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border">
                      <th className="text-left px-4 py-3 font-bold text-foreground">Car Model</th>
                      <th className="text-center px-4 py-3 font-bold text-amber-600 dark:text-amber-400">Mixed L/100km</th>
                      <th className="text-center px-4 py-3 font-bold text-foreground">Litres (791km)</th>
                      <th className="text-right px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Cost @₦1,000/L</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      ['Toyota Corolla 1.8 (2014–2019)',       7.85,  62.1,  62100],
                      ['Toyota Camry 2.5 (2012–2017)',         8.85,  70.0,  70000],
                      ['Honda Accord 2.4 (2013–2017)',         8.5,   67.2,  67200],
                      ['Toyota Highlander 3.5 (2014–2019)',    11.65, 92.1,  92100],
                      ['Lexus RX 350 (2016–2022)',             10.75, 85.0,  85000],
                      ['Mercedes-Benz GLE 350',                12.65, 100.1, 100100],
                      ['Toyota Land Cruiser 4.6 V8',           16.0,  126.6, 126600],
                    ].map(([model, rate, litres, cost]) => (
                      <tr key={String(model)} className="hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-2.5 font-medium text-foreground">{model}</td>
                        <td className="px-4 py-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{Number(rate).toFixed(1)}</td>
                        <td className="px-4 py-2.5 text-center text-foreground">{Number(litres).toFixed(1)}L</td>
                        <td className="px-4 py-2.5 text-right text-emerald-600 dark:text-emerald-400 font-bold">₦{Number(cost).toLocaleString('en-NG')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">Mixed rate = average of city and highway figures. Actual consumption varies by traffic conditions, AC usage, tyre pressure, and vehicle condition.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Trip Cost Planning — Beyond Just Fuel
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Fuel is usually the largest single cost of a Nigerian road trip, but it's not the only one. A realistic <strong className="text-foreground">trip expense calculator</strong> for Nigerian roads should also factor in: tolls on the Lagos–Ibadan expressway and some northern routes (₦200–₦400 per plaza), meals and rest stops (₦3,000–₦8,000 per person for a long trip), and potential vehicle issues on poorly maintained routes.</p>
                  <p>Tyre wear is accelerated on Nigerian roads compared to manufacturer projections. The Ore–Benin and Abuja–Lokoja stretches have significant pothole exposure, particularly during and after rainy season. For SUVs and saloons over five years old, a pre-trip check of tyre pressure, brake pads, and engine oil is strongly advisable before any trip over 400km.</p>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>For accurate <strong className="text-foreground">travel cost estimation</strong>, this calculator gives you the fuel component — the single largest variable cost. Multiply by 1.15–1.25 to get a realistic total trip budget including tolls, food, and a small contingency for unplanned stops.</p>
                  <p>If you're calculating whether to drive versus fly, Lagos–Abuja flights currently range from ₦50,000–₦200,000 per person. A solo driver in a Toyota Camry spends approximately ₦71,000 in fuel one-way — making the drive economically competitive for one person, but less so once time cost and fatigue are factored in. See our <Link href="/tools/auto-loan-calculator" className="text-amber-500 hover:underline">Auto Loan Calculator</Link> if you're evaluating vehicle costs more broadly.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Deciding Whether to Drive or Fly</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Chinedu was weighing a solo trip from Lagos to Abuja — fly for convenience, or drive to save money? A Lagos–Abuja flight was quoting around ₦85,000 one-way. Running his Toyota Camry through this calculator for the 791km route at mixed driving: about 71 litres, roughly ₦71,000 in fuel at ₦1,000/litre. On paper, driving looked ₦14,000 cheaper — but factoring in the 10-13 hour drive time against a 1-hour flight, plus a full day effectively lost to travel, he flew instead and used the saved time to close a deal that was worth far more than the fare difference.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Route distances and fuel figures checked against real driving experience.
          </p>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Road Trip FAQ: Distance, Time &amp; Fuel Cost
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How many hours from Lagos to Abuja by road?', a: 'Approximately 10–13 hours via the Ore–Okene–Lokoja route, depending on traffic, checkpoints, and road conditions. Leaving before 5am typically saves 1–2 hours by avoiding Lagos exit traffic.' },
                { q: 'What is the distance from Lagos to Abuja?', a: 'About 791km by road via Ore, Okene, and Lokoja — the standard interstate route. Select the route above for the exact distance and an estimated drive time.' },
                { q: 'How much does Lagos to Abuja cost in fuel?', a: 'Lagos to Abuja (791km) costs approximately ₦71,000 for a Toyota Camry 2.5 at mixed driving and ₦1,000/litre. A Highlander 3.5 costs approximately ₦92,000 and a Land Cruiser approximately ₦127,000. Use the calculator above to set your exact car and pump price.' },
                { q: 'How do I calculate fuel cost for a trip in Nigeria?', a: 'Multiply the distance (km) by your car\'s fuel consumption rate (L/100km) divided by 100, then multiply by the pump price per litre. Example: 791km × 9L/100km ÷ 100 × ₦1,000 = ₦71,190. This calculator does it automatically for 100+ Nigerian car models.' },
                { q: 'What is the cheapest car to drive Lagos to Abuja?', a: 'The most fuel-efficient cars on Nigerian roads include the Honda Civic 1.5T (6–8.5L/100km), Toyota Corolla 2.0 (6.2–8.8L/100km), and Hyundai Elantra (6.2–9.0L/100km). At ₦1,000/litre over 791km, a Civic 1.5T costs approximately ₦57,000 versus ₦127,000 for a Land Cruiser.' },
                { q: 'Should I use city or highway figures for a Nigerian road trip?', a: 'For interstate routes, use Mixed mode — which averages city and highway figures. Lagos exits and Abuja approaches involve heavy traffic (city conditions), while the main highway stretch is more open. Mixed is the most realistic for most Nigerian long-distance trips. Highway-only is suitable if you leave Lagos before 5am.' },
                { q: 'How many kilometers is Lagos to Ibadan?', a: 'Lagos to Ibadan is approximately 128km via the Lagos–Ibadan Expressway, typically taking 1.5–2 hours depending on traffic at the Lagos toll gates and expressway construction sections. Select the route above for an exact fuel cost for your car.' },
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
                { href: '/tools/fuel-cost-calculator', label: 'Fuel Cost Calculator', color: 'amber' },
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'emerald' },
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