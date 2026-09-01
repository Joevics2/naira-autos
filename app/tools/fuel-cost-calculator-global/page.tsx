import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Globe2 } from 'lucide-react';
import GlobalFuelCostClient from './client';
import { FUEL_CURRENCIES } from '@/lib/fuel-currencies';

export const metadata: Metadata = {
  title: 'Global Gas / Fuel Cost Calculator — Any Car, Any Currency, Any Country',
  description: 'Free fuel cost calculator covering 44 currencies and real road-distance routes across 53 countries and 200+ cities worldwide.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/fuel-cost-calculator-global',
    languages: {
      en: 'https://www.naira.autos/tools/fuel-cost-calculator-global',
      es: 'https://www.naira.autos/tools/calculadora-de-costo-de-combustible-global',
      'x-default': 'https://www.naira.autos/tools/fuel-cost-calculator-global',
    },
  },
  openGraph: {
    title: 'Global Gas / Fuel Cost Calculator | Naira Autos',
    description: 'Calculate fuel cost for any car in 44 currencies, with real routes across 53 countries.',
    url: 'https://www.naira.autos/tools/fuel-cost-calculator-global',
  },
  keywords: ['global fuel cost calculator','international fuel cost calculator','gas cost calculator by country','fuel cost calculator usd','fuel cost calculator eur','trip cost calculator international','how much does gas cost in different countries','road trip fuel calculator international','petrol price by country calculator'],
};

const LAST_UPDATED = '2026-08-28';

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/fuel-cost-calculator-global',
      name: 'Global Fuel Cost Calculator — Any Car, Any Currency, Any Country',
      description: 'Free fuel cost calculator covering 44 currencies and real routes across 53 countries.',
      url: 'https://www.naira.autos/tools/fuel-cost-calculator-global',
      datePublished: '2026-08-28',
      dateModified: LAST_UPDATED,
      inLanguage: 'en',
      author: { '@type': 'Organization', name: 'Naira Autos Editorial Team', url: 'https://www.naira.autos/about' },
      publisher: { '@type': 'Organization', name: 'Naira Autos', logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' } },
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Global Fuel Cost Calculator', item: 'https://www.naira.autos/tools/fuel-cost-calculator-global' },
      ]},
    },
    {
      '@type': 'HowTo',
      name: 'How to estimate the fuel cost of a trip',
      description: 'A simple three-step method to calculate how much gas or diesel a trip will cost, in any currency.',
      totalTime: 'PT2M',
      step: [
        { '@type': 'HowToStep', name: 'Get the distance', text: 'Pick a preset route or enter a custom distance in kilometres.' },
        { '@type': 'HowToStep', name: 'Find your car\'s fuel economy', text: 'Look up your car\'s city, highway, or combined consumption in litres per 100km from the model list.' },
        { '@type': 'HowToStep', name: 'Multiply by the price per litre', text: 'Litres needed = (consumption ÷ 100) × distance. Fuel cost = litres × current price per litre in your currency.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I estimate the fuel cost of a trip?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply your route\u2019s distance (km) by your car\u2019s fuel consumption (L/100km), divide by 100 to get litres needed, then multiply by the current price per litre. This calculator does that instantly for 100+ models, in your own currency.' } },
        { '@type': 'Question', name: 'Which currencies does the global fuel cost calculator support?', acceptedAnswer: { '@type': 'Answer', text: 'Currently 13: Nigerian Naira, US Dollar, British Pound, Euro, Canadian Dollar, Australian Dollar, South African Rand, Indian Rupee, UAE Dirham, Mexican Peso, Argentine Peso, Colombian Peso, and Chilean Peso. More currencies and countries are being added over time.' } },
        { '@type': 'Question', name: 'Are the pump prices in this calculator always up to date?', acceptedAnswer: { '@type': 'Answer', text: 'The default price shown for each currency is a recent reference point, but fuel prices — especially in Argentina and Nigeria, and globally amid the 2026 supply disruption — change often. Use the slider to enter today\u2019s actual price at your pump for an accurate result.' } },
        { '@type': 'Question', name: 'How accurate are the route distances?', acceptedAnswer: { '@type': 'Answer', text: 'Preset routes use real road-distance figures (typical highway route), not straight-line distance. For any route not listed, use the Custom Distance option and enter your own trip\u2019s kilometres.' } },
        { '@type': 'Question', name: 'Does driving style change fuel cost much?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, significantly. Stop-start city traffic, hard acceleration and braking, and constant air-conditioning use can push real-world consumption 25\u201340% above the highway figure. That\u2019s why this calculator lets you toggle between City, Mixed, and Highway modes.' } },
        { '@type': 'Question', name: 'How many litres per 100km does a typical car use?', acceptedAnswer: { '@type': 'Answer', text: 'Most petrol cars use between 6 and 12 litres per 100km, depending on engine size and driving conditions. Divide that figure by 100 to get litres per km, or divide 100 by it to get km per litre.' } },
        { '@type': 'Question', name: 'How much more efficient is diesel than petrol?', acceptedAnswer: { '@type': 'Answer', text: 'Diesel engines are typically 15\u201325% more fuel-efficient than a comparable petrol engine. A diesel car commonly uses 5\u20139L/100km, equivalent to roughly 11\u201320km per litre.' } },
        { '@type': 'Question', name: 'Can I use this for a car not in the list?', acceptedAnswer: { '@type': 'Answer', text: 'Pick the closest comparable model and body size — consumption rates are fairly similar within a vehicle class. We\u2019re expanding the model list regularly.' } },
        { '@type': 'Question', name: 'How much fuel does a trip from London to Manchester cost?', acceptedAnswer: { '@type': 'Answer', text: 'The road distance is roughly 320km. A car with mixed consumption of 7L/100km would need about 22 litres — around £33 at £1.50/litre.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Global Fuel Cost Calculator', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function GlobalFuelCostCalculatorPage() {
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
              <span className="text-white/50">Global Fuel Cost Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                <Globe2 className="h-3 w-3" /> {FUEL_CURRENCIES.length} currencies
              </span>
              <Link href="/tools/calculadora-de-costo-de-combustible-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Leer en Español →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Global Gas / Fuel<br /><span className="text-emerald-400">Cost Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">One calculator, any currency, any country.</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your car, pick a real city-to-city route or enter a custom distance, and drag the pump price slider in your own currency — from Naira to Pesos to Rupees. See your fuel cost instantly.</p>
          </div>
        </div>
      </div>

      <GlobalFuelCostClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* EEAT: authorship, methodology, freshness */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-muted-foreground border border-border rounded-xl bg-card px-4 py-3">
            <p><strong className="text-foreground">Reviewed by:</strong> Naira Autos Editorial Team — automotive data &amp; research</p>
            <p><strong className="text-foreground">Last updated:</strong> August 28, 2026</p>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              How to Estimate Fuel Cost for a Trip
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>The method is simple — do it by hand in under a minute, or let the calculator above do it instantly for your exact car and currency:</p>
                <ol className="list-decimal list-inside space-y-1.5">
                  <li><strong className="text-foreground">Get the distance.</strong> Pick a preset route or enter a custom distance in kilometres.</li>
                  <li><strong className="text-foreground">Find your car's fuel economy.</strong> Look up its city, highway, or combined L/100km figure from the model list.</li>
                  <li><strong className="text-foreground">Multiply by the price per litre.</strong> Litres needed = (consumption ÷ 100) × distance. Cost = litres × current price per litre.</li>
                </ol>
              </div>
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>Our original fuel cost calculator was built for Nigerian drivers — Naira pricing, Lagos–Abuja style routes, local pump-price ranges. As traffic started coming in from outside Nigeria, we built this global version alongside it rather than diluting the Nigeria-specific one.</p>
                <p>This tool now covers <strong className="text-foreground">44 currencies</strong> and real road-distance routes across <strong className="text-foreground">53 countries</strong> and <strong className="text-foreground">200+ cities</strong> — from Lagos to Tokyo, Cairo to Buenos Aires, Warsaw to Wellington. Pricing is refreshed market by market as we verify official or regulator-published data rather than estimating, so a handful of currencies (e.g. Iran, Argentina, Nigeria) carry wider slider ranges because their pump prices move fast.</p>
                <p>Prefer a Nigeria-only experience with deeper local content? Use the <Link href="/tools/fuel-cost-calculator" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">original Fuel Cost Calculator</Link> instead — same underlying math, Naira-first.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Reference Pump Prices by Region
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-3xl">
              Every pump-price default in this tool is sourced from national fuel-price trackers or regulator data (Pemex/CRE, YPF pricing coverage, CREG, ENAP/MEPCO, and others) — not a guess. Fuel prices vary enormously between countries — not just because of currency, but taxes, subsidies, and local regulation. 2026 has been an especially volatile year for pump prices worldwide following a global supply disruption, so treat these as a starting reference, not today's exact price:
            </p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Market</th>
                    <th className="text-center px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">Reference Price</th>
                    <th className="text-center px-4 py-3 font-bold text-muted-foreground">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['United States', '≈ $1.30 / litre', 'National average, regular unleaded'],
                    ['United Kingdom', '≈ £1.50 / litre', 'Unleaded 95, includes fuel duty and VAT'],
                    ['Nigeria', '≈ ₦1,000 / litre', 'PMS — moves often, wide slider range'],
                    ['India', '≈ ₹100 / litre', 'Varies significantly by state taxes'],
                    ['UAE', '≈ AED 2.80 / litre', 'Government-set, adjusted monthly'],
                    ['Canada', '≈ C$1.90 / litre', 'National average, climbed amid 2026 supply shock'],
                    ['Australia', '≈ A$1.90 / litre', 'National average unleaded 91'],
                    ['South Africa', '≈ R23 / litre', 'Regulated price, adjusted monthly'],
                  ].map(([market, price, note]) => (
                    <tr key={market} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-foreground text-sm">{market}</td>
                      <td className="px-4 py-2.5 text-center text-emerald-600 dark:text-emerald-400 font-bold">{price}</td>
                      <td className="px-4 py-2.5 text-center text-muted-foreground text-xs">{note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Reference prices only — they change frequently. Use the slider in the calculator above to enter the exact price you're paying today. Full data for all 44 currencies is available inside the tool.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              L/100km vs km/L vs MPG
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
              <div className="space-y-3">
                <p>Manufacturers usually quote fuel economy as <strong className="text-foreground">litres per 100km (L/100km)</strong> — a lower number means better economy. To get <strong className="text-foreground">litres per km</strong>, divide by 100: an 8L/100km car uses 0.08 litres per km. Most petrol cars fall in the <strong className="text-foreground">6–12L/100km</strong> range.</p>
                <p>To find <strong className="text-foreground">km per litre</strong> — often the more intuitive number — divide 100 by the L/100km figure. An 8L/100km car does 100 ÷ 8 = <strong className="text-foreground">12.5km per litre</strong>.</p>
              </div>
              <div className="space-y-3">
                <p>If you're used to thinking in <strong className="text-foreground">miles per gallon (MPG)</strong> — common in the US and UK — the conversion is roughly: MPG (US) ≈ 235 ÷ L/100km, and MPG (UK/imperial) ≈ 282 ÷ L/100km, since the US and imperial gallon are different sizes. An 8L/100km car is about 29 US MPG or 35 UK MPG.</p>
                <p>Diesel engines are typically <strong className="text-foreground">15–25% more efficient</strong> than a comparable petrol engine — commonly 5–9L/100km, or roughly 11–20km per litre.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Example: London to Manchester
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Sam was quoting a client for a one-way delivery run and wanted a quick sanity check before committing to a price. The road distance from London to Manchester is roughly 320km. Their van does about 9L/100km on the motorway — that's 320 × (9 ÷ 100) ≈ 29 litres. At £1.50/litre, that's about £43 in fuel alone, before tolls or return leg. Knowing that number before quoting kept the job profitable.</p>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Global Fuel Cost FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'How do I estimate the fuel cost of a trip?', a: 'Multiply your route\u2019s distance (km) by your car\u2019s consumption (L/100km), divide by 100 to get litres needed, then multiply by the price per litre. This calculator does it instantly for 100+ models, in your own currency.' },
                { q: 'Which currencies does this calculator support?', a: 'Currently 13: NGN, USD, GBP, EUR, CAD, AUD, ZAR, INR, AED, MXN, ARS, COP, and CLP. More are being added as we verify real pump-price data for each new market.' },
                { q: 'Are the pump prices always current?', a: 'The default shown is a recent reference point, but prices — especially in Argentina and Nigeria, and globally amid the 2026 supply disruption — change often. Use the slider to match today\u2019s actual price at your pump.' },
                { q: 'How accurate are the preset route distances?', a: 'Preset routes use real road-distance figures, not straight-line distance — tested against known driving distances rather than a flat geometric estimate. For any other route, use Custom Distance.' },
                { q: 'Does driving style change fuel cost much?', a: 'Yes, significantly. Stop-start traffic, hard braking, and constant air-conditioning can push real-world consumption 25–40% above the highway figure. Toggle between City, Mixed, and Highway mode to see the difference.' },
                { q: 'How many litres per 100km does a typical car use?', a: 'Between 6 and 12L/100km, depending on engine size and driving conditions. Divide by 100 for litres per km, or divide 100 by it for km per litre.' },
                { q: 'How much more efficient is diesel than petrol?', a: 'Typically 15–25% more efficient. A diesel car commonly uses 5–9L/100km — roughly 11–20km per litre, noticeably better than a comparable petrol engine.' },
                { q: 'Can I use this for a car not in the list?', a: 'Pick the closest comparable model and body size — consumption rates are fairly similar within a vehicle class. We\u2019re expanding the model list regularly.' },
                { q: 'How do I convert L/100km to MPG?', a: 'MPG (US) ≈ 235 ÷ L/100km, and MPG (UK/imperial) ≈ 282 ÷ L/100km — the US and imperial gallon are different sizes, so the two MPG figures aren\u2019t the same for an identical car.' },
                { q: 'How much fuel does a London to Manchester trip cost?', a: 'The road distance is about 320km. A car with mixed consumption of 7L/100km would need roughly 22 litres — around £33 at £1.50/litre.' },
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

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/tools/fuel-cost-calculator" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Nigeria Fuel Cost Calculator</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tools/road-trip-calculator" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Road Trip Calculator</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
