import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import FuelCostClient from './client';

export const metadata: Metadata = {
  title: 'Free Fuel Cost Calculator — Car Fuel Consumption Estimator',
  description: 'Calculate fuel cost for any car in your own currency. Select your model, pick a route or enter a custom distance, and drag the pump price slider.',
  alternates: { canonical: 'https://www.naira.autos/tools/fuel-cost-calculator' },
  openGraph: {
    title: 'Fuel Cost Calculator | Naira Autos',
    description: 'Free fuel cost calculator for 100+ car models. City vs highway modes, any currency, live pump price slider.',
    url: 'https://www.naira.autos/tools/fuel-cost-calculator',
  },
  keywords: ['fuel cost calculator','fuel cost calculator by car','road trip cost calculator','road trip calculator gas and tolls','how much gas is 2 hours of driving','how much gas money should i give for 2 hour drive calculator','how much gas is 4 hours of driving','how much gas money for 1 hour drive','how many liters of diesel per km','how many litres of petrol per km','how much is 30 litres of petrol','50 litres of fuel cost','how much is gas money','how much gas is 5 hours of driving','how much gas money for 2 hour drive','how much is 6 litres of petrol','how much is 60 liters of petrol','how much gas money for a 30 minute drive','how much gas for 2 hours drive','how much gas for 1 hour drive','how much gas to drive 3 hours','how much gas will i use for a 2 hour drive','how much gas to drive for 2 hours','how much gas for 3 hours drive','how much gas is a 2 hour drive','how much petrol','1 litre petrol how many km in car diesel','how many kilometers per litre of diesel','fuel efficient cars in nigeria','most fuel efficient cars in nigeria','how much is 50 liters of fuel in nigeria','trip fuel cost calculator','gas money calculator for drive','journey fuel cost calculator','cars with low fuel consumption in nigeria','how much petrol per litre'],
};

const LAST_UPDATED = '2026-08-28';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/fuel-cost-calculator',
      name: 'Free Fuel Cost Calculator — Car Fuel Consumption Estimator',
      description: 'Calculate fuel cost for any car in your own currency. 100+ models, custom routes, city and highway modes.',
      url: 'https://www.naira.autos/tools/fuel-cost-calculator',
      datePublished: '2025-01-15',
      dateModified: LAST_UPDATED,
      author: { '@type': 'Organization', name: 'Naira Autos Editorial Team', url: 'https://www.naira.autos/about' },
      publisher: { '@type': 'Organization', name: 'Naira Autos', logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' } },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Fuel Cost Calculator', item: 'https://www.naira.autos/tools/fuel-cost-calculator' },
      ]},
    },
    {
      '@type': 'HowTo',
      name: 'How to estimate fuel cost for a road trip',
      description: 'A simple three-step method to work out how much gas money a trip will cost, in any currency.',
      totalTime: 'PT2M',
      step: [
        { '@type': 'HowToStep', name: 'Get the distance', text: 'Find the distance of your route in kilometres — pick a preset route or enter a custom distance.' },
        { '@type': 'HowToStep', name: 'Find your car\u2019s consumption rate', text: 'Look up your car\u2019s fuel consumption in litres per 100km (city, highway, or mixed) from the model list.' },
        { '@type': 'HowToStep', name: 'Multiply by the pump price', text: 'Litres needed = (rate \u00f7 100) \u00d7 distance. Fuel cost = litres \u00d7 current price per litre in your currency.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I estimate fuel cost for a road trip?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply your route distance (km) by your car\u2019s consumption rate (L/100km), divide by 100 to get litres needed, then multiply by the current pump price per litre. This calculator does that math instantly for 100+ car models in any currency — just pick your car, route, and price.' } },
        { '@type': 'Question', name: 'Does driving style change fuel cost estimates significantly?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — significantly. Stop-start city traffic, hard acceleration, heavy braking, and running the AC constantly can push real-world consumption 25–40% above the highway figure for the same car. Highway cruising at a steady speed is always the most fuel-efficient mode, which is why this calculator lets you switch between City, Mixed, and Highway rates.' } },
        { '@type': 'Question', name: 'How much gas is a 2-hour drive?', acceptedAnswer: { '@type': 'Answer', text: 'At a typical 80km/h average speed, a 2-hour drive covers roughly 160km. For a mid-size car averaging 8L/100km, that\u2019s about 12.8 litres — roughly ₦12,800 at ₦1,000/litre. Use the calculator above with your exact car and current price for a precise figure.' } },
        { '@type': 'Question', name: 'How much gas money for a 1-hour drive?', acceptedAnswer: { '@type': 'Answer', text: 'A 1-hour drive at an 80km/h average speed covers about 80km. At a typical 8L/100km consumption rate, that\u2019s roughly 6.4 litres of fuel — about ₦6,400 at ₦1,000/litre.' } },
        { '@type': 'Question', name: 'How much gas is a 3-hour drive?', acceptedAnswer: { '@type': 'Answer', text: 'A 3-hour drive covers roughly 240km at an 80km/h average speed. A typical car at 8L/100km would use about 19.2 litres, roughly ₦19,200 at ₦1,000/litre.' } },
        { '@type': 'Question', name: 'How much gas is 4 hours of driving?', acceptedAnswer: { '@type': 'Answer', text: 'Four hours of driving covers approximately 320km at a typical 80km/h average speed, using about 25.6 litres for a car averaging 8L/100km — roughly ₦25,600 at ₦1,000/litre.' } },
        { '@type': 'Question', name: 'How much gas is 5 hours of driving?', acceptedAnswer: { '@type': 'Answer', text: 'Five hours of driving covers roughly 400km at an 80km/h average speed. A typical car at 8L/100km uses about 32 litres — around ₦32,000 at ₦1,000/litre, plus a likely fuel stop for smaller tanks.' } },
        { '@type': 'Question', name: 'How much gas money should I budget for a 30-minute drive?', acceptedAnswer: { '@type': 'Answer', text: 'A 30-minute drive covers around 40km at a typical average speed. For a car at 8L/100km, that\u2019s about 3.2 litres — roughly ₦3,200 at ₦1,000/litre. Short, mostly-stop-start drives can use noticeably more.' } },
        { '@type': 'Question', name: 'How much is 30 litres of petrol?', acceptedAnswer: { '@type': 'Answer', text: '30 litres of petrol costs litres \u00d7 price per litre. At ₦1,000/litre that\u2019s ₦30,000; at $1.30/litre that\u2019s $39. Use the currency selector above to see it in your own currency at today\u2019s price.' } },
        { '@type': 'Question', name: 'How much is 50 litres of fuel?', acceptedAnswer: { '@type': 'Answer', text: '50 litres of fuel costs litres \u00d7 price per litre — ₦50,000 at ₦1,000/litre, or about $65 at $1.30/litre. Most sedans have a 55–70 litre tank, so 50 litres is close to a full fill-up for many cars.' } },
        { '@type': 'Question', name: 'How much is 6 litres of petrol?', acceptedAnswer: { '@type': 'Answer', text: '6 litres of petrol costs ₦6,000 at ₦1,000/litre, or roughly $7.80 at $1.30/litre. That\u2019s enough fuel for about 60–75km in an average car.' } },
        { '@type': 'Question', name: 'How much is 60 litres of petrol?', acceptedAnswer: { '@type': 'Answer', text: '60 litres of petrol costs ₦60,000 at ₦1,000/litre, or about $78 at $1.30/litre — a full tank for most mid-size SUVs and larger sedans.' } },
        { '@type': 'Question', name: 'How many litres of petrol per km does a car use?', acceptedAnswer: { '@type': 'Answer', text: 'Most petrol cars use between 0.06 and 0.12 litres per km (6–12L/100km), depending on engine size, driving conditions, and whether it\u2019s city or highway driving. Divide a car\u2019s L/100km figure by 100 to get litres per km.' } },
        { '@type': 'Question', name: 'How many litres of diesel per km does a car use?', acceptedAnswer: { '@type': 'Answer', text: 'Diesel engines are typically 15–25% more efficient than petrol equivalents, using roughly 0.05 to 0.09 litres per km (5–9L/100km) depending on the vehicle and driving conditions.' } },
        { '@type': 'Question', name: 'How many kilometers per litre of diesel does a car get?', acceptedAnswer: { '@type': 'Answer', text: 'A typical diesel car returns 11–20km per litre, calculated as 100 \u00f7 (litres per 100km). A diesel SUV at 7L/100km, for example, gets about 14.3km per litre.' } },
        { '@type': 'Question', name: 'How much fuel does a Toyota Camry use per litre in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A Toyota Camry 2.5 (2012–2017) uses approximately 10.5L/100km in city driving and 7.2L/100km on the highway. In Lagos traffic, real-world consumption is typically 11–13L/100km.' } },
        { '@type': 'Question', name: 'What is the fuel consumption of a Honda CR-V in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A Honda CR-V 2.4 uses approximately 10.5–11.0L/100km in city and 7.8–8.2L/100km on the highway. The 1.5T version (2017+) is more efficient at around 9.8L/100km city.' } },
        { '@type': 'Question', name: 'How much does a Lagos to Abuja trip cost in fuel?', acceptedAnswer: { '@type': 'Answer', text: 'The Lagos–Abuja distance is approximately 791km. A Toyota Camry 2.5 at highway consumption (7.2L/100km) needs about 57 litres. At ₦1,000/litre, that is approximately ₦57,000 in fuel.' } },
        { '@type': 'Question', name: 'What is the current petrol price in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'As of early 2026, Nigerian pump prices range from approximately ₦950 to ₦1,100 per litre at most filling stations. Prices are deregulated and subject to change — adjust the slider above to match today\u2019s price at your usual station.' } },
        { '@type': 'Question', name: 'Why does fuel consumption in Nigeria differ from manufacturer figures?', acceptedAnswer: { '@type': 'Answer', text: 'Real-world fuel consumption in Nigeria — especially in Lagos — is 25–40% higher than manufacturer highway figures due to stop-start traffic, idling in go-slow conditions, and aggressive driving patterns.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Fuel Cost Calculator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function FuelCostCalculatorPage() {
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
              <span className="text-white/50">Fuel Cost Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">100+ car models</span>
              <Link href="/tools/fuel-cost-calculator-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Outside Nigeria? Use the global calculator →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Fuel<br /><span className="text-emerald-400">Cost Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will that trip cost in fuel?</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your car, pick a route or enter a custom distance, and drag the pump price slider in your own currency. See your fuel cost instantly — with city and highway modes.</p>
          </div>
        </div>
      </div>

      <FuelCostClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* EEAT: authorship, methodology, freshness */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p><strong className="text-foreground">Reviewed by:</strong> Naira Autos Editorial Team — automotive data &amp; research</p>
            <p><strong className="text-foreground">Last updated:</strong> August 28, 2026</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              How to Estimate Fuel Cost for a Road Trip
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>This <strong className="text-foreground">fuel cost calculator by car</strong> follows the same three-step method any road trip cost calculator uses under the hood — you can do it by hand in under a minute, or let the tool above do it instantly for your exact car and currency:</p>
                <ol className="list-decimal list-inside space-y-1.5">
                  <li><strong className="text-foreground">Get the distance.</strong> Pick a preset route or enter a custom distance in kilometres.</li>
                  <li><strong className="text-foreground">Find your car's consumption rate.</strong> Look up its city, highway, or mixed L/100km figure from the model list.</li>
                  <li><strong className="text-foreground">Multiply by the pump price.</strong> Litres needed = (rate ÷ 100) × distance. Fuel cost = litres × current price per litre.</li>
                </ol>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Fuel is usually the biggest single line item on a trip, but a full <strong className="text-foreground">road trip calculator with gas and tolls</strong> should also account for toll plazas, meals, and a small contingency. This tool gives you the fuel number precisely; for a complete Nigerian-route breakdown including tolls, use the <Link href="/tools/road-trip-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">Road Trip Calculator</Link> alongside it.</p>
                <p>Because pump prices move often and vary by country and even by station, we don't hardcode a single "current price" — the slider lets you match whatever you're actually paying today, anywhere in the world.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Fuel Consumption in Nigeria — City vs Highway
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Real-world fuel consumption in Nigeria — particularly in Lagos — is consistently <strong className="text-foreground">25–40% higher than manufacturer highway figures</strong>. Lagos traffic, frequent stops, aggressive acceleration, and idling in go-slow conditions all increase fuel burn significantly above spec sheet numbers.</p>
                <p>A Toyota Camry rated at 7.2L/100km on the highway typically consumes 10.5–13L/100km in Lekki–VI–Surulere traffic. Use the City mode for Lagos or Abuja inner-city trip planning.</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Fuel prices in Nigeria are <strong className="text-foreground">deregulated and volatile</strong>. The pump price slider covers ₦500–₦2,000 per litre to account for the current price band and future increases. Petrol subsidies were removed in 2023 and prices now track exchange rate movements.</p>
                <p>For long-distance trips, highway figures are more accurate. The Lagos–Abuja route (791km) is predominantly highway outside city exits. A Lexus RX 350 needs approximately 75 litres — a full tank won't cover it without a refill at Ore or Lokoja.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Fuel Consumption Guide — Popular Nigerian Cars
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Model</th>
                    <th className="text-center px-4 py-3 font-bold text-amber-600 dark:text-amber-400">City L/100km</th>
                    <th className="text-center px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Hwy L/100km</th>
                    <th className="text-center px-4 py-3 font-bold text-foreground">Tank (L)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Toyota Camry 2.5 (2012–2017)', '10.5', '7.2', '70'],
                    ['Honda Accord 2.4 (2013–2017)', '10.0', '7.0', '65'],
                    ['Toyota Highlander 3.5 (2014–2019)', '13.5', '9.8', '72'],
                    ['Lexus RX 350 (2016–2022)', '12.5', '9.0', '72'],
                    ['Toyota Land Cruiser 4.6 V8', '18.5', '13.5', '93'],
                    ['Honda CR-V 2.4', '10.5', '7.8', '58'],
                    ['Toyota Corolla 1.8 (2014–2019)', '9.2', '6.5', '50'],
                    ['Mercedes-Benz C 300 (W205)', '11.8', '8.2', '66'],
                    ['BMW X5 xDrive35i', '14.5', '10.5', '85'],
                    ['Jeep Grand Cherokee 3.6', '14.5', '10.8', '83'],
                  ].map(([model, city, hwy, tank]) => (
                    <tr key={model} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground text-sm">{model}</td>
                      <td className="px-4 py-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{city}</td>
                      <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400 font-bold">{hwy}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground">{tank}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Gas Money by Drive Time — 30 Minutes to 5 Hours
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              A common question is simply <strong className="text-foreground">"how much is gas money"</strong> for a drive of a given length — how much gas for 1 hour drive, how much gas for a 2 hour drive, how much gas to drive 3 hours, and so on. There's no single universal answer because it depends on your car and your speed, but here's a realistic baseline: a typical mid-size car averaging <strong className="text-foreground">8L/100km</strong> at a steady <strong className="text-foreground">80km/h</strong> average speed (a mix of highway and slower stretches). Use it as a starting point, then plug your actual car and route into the calculator above for an exact figure.
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Drive time</th>
                    <th className="text-center px-4 py-3 font-bold text-foreground">Approx. distance</th>
                    <th className="text-center px-4 py-3 font-bold text-amber-600 dark:text-amber-400">Fuel needed</th>
                    <th className="text-center px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Cost @ ₦1,000/L</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['30 minutes', '40km', '3.2L', '₦3,200'],
                    ['1 hour', '80km', '6.4L', '₦6,400'],
                    ['2 hours', '160km', '12.8L', '₦12,800'],
                    ['3 hours', '240km', '19.2L', '₦19,200'],
                    ['4 hours', '320km', '25.6L', '₦25,600'],
                    ['5 hours', '400km', '32.0L', '₦32,000'],
                  ].map(([time, dist, litres, cost]) => (
                    <tr key={time} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground text-sm">{time} drive</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground">{dist}</td>
                      <td className="px-4 py-2.5 text-center text-amber-600 dark:text-amber-400 font-bold">{litres}</td>
                      <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400 font-bold">{cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Assumes 8L/100km and 80km/h average speed — a fairly typical mid-size sedan. Heavier vehicles, stop-start traffic, or a different currency and price? Use the calculator above for your specific car.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Cost of Common Fuel Volumes
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              Questions like <strong className="text-foreground">"how much is 30 litres of petrol"</strong> or <strong className="text-foreground">"50 litres of fuel cost"</strong> come up constantly when budgeting for a fill-up. The math is simple — litres × price per litre — but here's a quick reference at a ₦1,000/litre pump price:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Volume</th>
                    <th className="text-center px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Cost @ ₦1,000/L</th>
                    <th className="text-center px-4 py-3 font-bold text-muted-foreground">Typical use</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['6 litres', '₦6,000', 'Short local errands (~60–75km)'],
                    ['30 litres', '₦30,000', 'Half tank for most sedans'],
                    ['50 litres', '₦50,000', 'Near-full tank for most sedans'],
                    ['60 litres', '₦60,000', 'Full tank for larger SUVs and sedans'],
                  ].map(([vol, cost, use]) => (
                    <tr key={vol} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground text-sm">{vol}</td>
                      <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400 font-bold">{cost}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground text-xs">{use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">In your own currency: at $1.30/litre, 30L ≈ $39, 50L ≈ $65, 60L ≈ $78. Switch the currency selector in the calculator above to see any volume priced in your own money at today's rate.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Litres per KM vs KM per Litre — Petrol and Diesel Explained
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div className="space-y-3">
                <p>Manufacturers usually quote fuel economy as <strong className="text-foreground">litres per 100km (L/100km)</strong> — a lower number means better economy. To get <strong className="text-foreground">litres per km</strong>, just divide by 100: a car rated at 8L/100km uses 0.08 litres per km. Most petrol cars fall in the <strong className="text-foreground">6–12L/100km</strong> range (0.06–0.12 L/km) depending on engine size and driving conditions.</p>
                <p>To flip that into <strong className="text-foreground">km per litre</strong> — the more intuitive "how far will 1 litre of petrol take me" question — divide 100 by the L/100km figure. A car at 8L/100km gets 100 ÷ 8 = <strong className="text-foreground">12.5km per litre</strong>.</p>
              </div>
              <div className="space-y-3">
                <p>Diesel engines are typically <strong className="text-foreground">15–25% more fuel-efficient</strong> than a comparable petrol engine, thanks to higher thermal efficiency. A diesel car commonly uses <strong className="text-foreground">5–9L/100km</strong> (0.05–0.09 litres per km), which works out to roughly <strong className="text-foreground">11–20 kilometers per litre of diesel</strong> — noticeably further than an equivalent petrol car on the same tank size.</p>
                <p>So for "1 litre petrol how many km in car diesel" — you're really comparing two different fuels and engines. A petrol car might get 12.5km/L while the diesel equivalent of the same model gets 15–17km/L, which is why diesel is often preferred for high-mileage and long-haul driving despite diesel sometimes costing more per litre.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Budgeting a Weekend Trip</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Tobi was planning a weekend trip from Lagos to Ibadan and back — about 260km round trip — in his Toyota Corolla 1.8. Using the highway rate of 6.5L/100km from the table above: 260 × (6.5 ÷ 100) ≈ 16.9 litres. At ₦1,000/litre, that's roughly ₦16,900 in fuel for the round trip — enough to set aside cash for tolls and food without guessing. Knowing the number before leaving also told him one 50-litre fill-up would comfortably cover the whole weekend with fuel to spare.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fuel Cost FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How do I estimate fuel cost for a road trip?', a: 'Multiply your route distance (km) by your car\u2019s consumption rate (L/100km), divide by 100 to get litres needed, then multiply by the current pump price per litre. This calculator does that math instantly for 100+ car models in any currency.' },
                { q: 'Does driving style change fuel cost estimates significantly?', a: 'Yes — significantly. Stop-start city traffic, hard acceleration, heavy braking, and constant AC use can push real-world consumption 25–40% above the highway figure. Switch between City, Mixed, and Highway modes above to see the difference for your car.' },
                { q: 'How much gas is a 2-hour drive?', a: 'At an 80km/h average speed, a 2-hour drive covers roughly 160km. For a car at 8L/100km, that\u2019s about 12.8 litres — around ₦12,800 at ₦1,000/litre. Enter your own car and distance above for an exact figure.' },
                { q: 'How much gas money for a 1-hour drive?', a: 'A 1-hour drive at 80km/h covers about 80km. At 8L/100km, that\u2019s roughly 6.4 litres — about ₦6,400 at ₦1,000/litre.' },
                { q: 'How much gas is a 3-hour drive?', a: 'A 3-hour drive covers roughly 240km at 80km/h. A car at 8L/100km would use about 19.2 litres — roughly ₦19,200 at ₦1,000/litre.' },
                { q: 'How much gas is 4 hours of driving?', a: 'Four hours covers approximately 320km at an 80km/h average speed, using about 25.6 litres for a car at 8L/100km — roughly ₦25,600 at ₦1,000/litre.' },
                { q: 'How much gas is 5 hours of driving?', a: 'Five hours covers roughly 400km at 80km/h. A car at 8L/100km uses about 32 litres — around ₦32,000 at ₦1,000/litre, likely needing a fuel stop for smaller tanks.' },
                { q: 'How much gas money for a 30-minute drive?', a: 'A 30-minute drive covers around 40km at a typical average speed. For a car at 8L/100km, that\u2019s about 3.2 litres — roughly ₦3,200 at ₦1,000/litre.' },
                { q: 'How much is 30 litres of petrol?', a: '30 litres costs litres × price per litre — ₦30,000 at ₦1,000/litre, or about $39 at $1.30/litre. Switch currency above to see it in your own money.' },
                { q: 'How much is 50 litres of fuel?', a: '50 litres costs ₦50,000 at ₦1,000/litre, or roughly $65 at $1.30/litre — close to a full tank for many sedans.' },
                { q: 'How much is 6 litres of petrol?', a: '6 litres costs ₦6,000 at ₦1,000/litre, or about $7.80 at $1.30/litre — enough for roughly 60–75km in an average car.' },
                { q: 'How much is 60 litres of petrol?', a: '60 litres costs ₦60,000 at ₦1,000/litre, or about $78 at $1.30/litre — a full tank for most mid-size SUVs.' },
                { q: 'How many litres of petrol per km does a car use?', a: 'Most petrol cars use 0.06–0.12 litres per km (6–12L/100km) depending on engine size and driving conditions. Divide a car\u2019s L/100km figure by 100 to get litres per km.' },
                { q: 'How many litres of diesel per km does a car use?', a: 'Diesel engines are typically 15–25% more efficient than petrol equivalents, using roughly 0.05–0.09 litres per km (5–9L/100km).' },
                { q: 'How many kilometers per litre of diesel does a car get?', a: 'A typical diesel car returns 11–20km per litre (100 ÷ L/100km). A diesel SUV at 7L/100km, for example, gets about 14.3km per litre.' },
                { q: 'How much fuel does a Toyota Camry use per litre in Nigeria?', a: 'A Toyota Camry 2.5 (2012–2017) uses approximately 10.5L/100km in city driving and 7.2L/100km on the highway. In Lagos traffic, real-world consumption is typically 11–13L/100km.' },
                { q: 'How much does a Lagos to Abuja trip cost in fuel?', a: 'The Lagos–Abuja distance is approximately 791km. A Toyota Camry 2.5 at highway consumption (7.2L/100km) needs about 57 litres. At ₦1,000/litre, that is approximately ₦57,000 in fuel.' },
                { q: 'What is the fuel consumption of a Lexus RX 350?', a: 'A Lexus RX 350 (2016–2022) uses approximately 12.5L/100km in city driving and 9.0L/100km on the highway, with a 72-litre tank. A Lagos–Abuja trip on highway would require approximately 71 litres — needing a refuel en route.' },
                { q: 'Why does my car use more fuel than the manufacturer says?', a: 'Manufacturer fuel consumption figures are measured under controlled conditions. Real-world conditions — traffic, frequent hard braking, hot weather, air conditioning use, and road quality — typically increase real-world consumption 25–40% above official figures.' },
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
                { href: '/tools/road-trip-calculator', label: 'Road Trip Calculator', color: 'amber' },
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
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