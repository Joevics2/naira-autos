import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import FuelCostClient from './client';

export const metadata: Metadata = {
  title: 'Nigeria Fuel Cost Calculator — Free Car Fuel Consumption Estimator',
  description: 'Calculate fuel cost for any car in Nigeria. Select your model, pick a route, drag the pump price slider. Free fuel consumption calculator for 100+ Nigerian car models.',
  alternates: { canonical: 'https://www.naira.autos/tools/fuel-cost-calculator' },
  openGraph: {
    title: 'Nigeria Fuel Cost Calculator | Naira Autos',
    description: 'Free Nigerian fuel cost calculator for 100+ car models. City vs highway modes, Nigerian routes, live pump price slider.',
    url: 'https://www.naira.autos/tools/fuel-cost-calculator',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/fuel-cost-calculator',
      name: 'Nigeria Fuel Cost Calculator — Free Car Fuel Consumption Estimator',
      description: 'Calculate fuel cost for any car in Nigeria. 100+ models, Nigerian routes, city and highway modes.',
      url: 'https://www.naira.autos/tools/fuel-cost-calculator',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Fuel Cost Calculator', item: 'https://www.naira.autos/tools/fuel-cost-calculator' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much fuel does a Toyota Camry use per litre in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A Toyota Camry 2.5 (2012–2017) uses approximately 10.5L/100km in city driving and 7.2L/100km on the highway. In Lagos traffic, real-world consumption is typically 11–13L/100km.' } },
        { '@type': 'Question', name: 'What is the fuel consumption of a Honda CR-V in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A Honda CR-V 2.4 uses approximately 10.5–11.0L/100km in city and 7.8–8.2L/100km on the highway. The 1.5T version (2017+) is more efficient at around 9.8L/100km city.' } },
        { '@type': 'Question', name: 'How much does a Lagos to Abuja trip cost in fuel?', acceptedAnswer: { '@type': 'Answer', text: 'The Lagos–Abuja distance is approximately 791km. A Toyota Camry 2.5 at highway consumption (7.2L/100km) needs about 57 litres. At ₦1,000/litre, that is approximately ₦57,000 in fuel.' } },
        { '@type': 'Question', name: 'What is the current petrol price in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'As of early 2026, Nigerian pump prices range from approximately ₦950 to ₦1,100 per litre at most filling stations. Prices are deregulated and subject to change.' } },
        { '@type': 'Question', name: 'Why does fuel consumption in Nigeria differ from manufacturer figures?', acceptedAnswer: { '@type': 'Answer', text: 'Real-world fuel consumption in Nigeria — especially in Lagos — is 25–40% higher than manufacturer highway figures due to stop-start traffic, idling in go-slow conditions, and aggressive driving patterns.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Nigeria Fuel Cost Calculator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' } },
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
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">100+ Nigerian models</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Nigeria Fuel<br /><span className="text-emerald-400">Cost Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will that trip cost in fuel?</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your car, pick a Nigerian route, and drag the pump price slider. See your fuel cost instantly — with city and highway modes for Nigerian road conditions.</p>
          </div>
        </div>
      </div>

      <FuelCostClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
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
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fuel Cost FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How much fuel does a Toyota Camry use per litre in Nigeria?', a: 'A Toyota Camry 2.5 (2012–2017) uses approximately 10.5L/100km in city driving and 7.2L/100km on the highway. In Lagos traffic, real-world consumption is typically 11–13L/100km.' },
                { q: 'How much does a Lagos to Abuja trip cost in fuel?', a: 'The Lagos–Abuja distance is approximately 791km. A Toyota Camry 2.5 at highway consumption (7.2L/100km) needs about 57 litres. At ₦1,000/litre, that is approximately ₦57,000 in fuel.' },
                { q: 'What is the fuel consumption of a Lexus RX 350?', a: 'A Lexus RX 350 (2016–2022) uses approximately 12.5L/100km in city driving and 9.0L/100km on the highway, with a 72-litre tank. A Lagos–Abuja trip on highway would require approximately 71 litres — needing a refuel en route.' },
                { q: 'Why does my car use more fuel than the manufacturer says?', a: 'Manufacturer fuel consumption figures are measured under controlled conditions. Nigerian conditions — Lagos traffic, frequent hard braking, hot weather, air conditioning use, and road quality — typically increase real-world consumption 25–40% above official figures.' },
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