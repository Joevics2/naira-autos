import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import FuelEconomyClient from './client';

export const metadata: Metadata = {
  title: 'Fuel Economy Unit Converter — MPG to L/100km to km/L',
  description: 'Convert fuel economy instantly between MPG (US), MPG (UK/Imperial), L/100km, and km/L. Free, accurate, and works for any car, anywhere in the world.',
  alternates: { canonical: 'https://www.naira.autos/tools/fuel-economy-converter' },
  openGraph: {
    title: 'Fuel Economy Unit Converter | Naira Autos',
    description: 'Convert MPG, L/100km, and km/L instantly. Free fuel economy converter that works for any car in any country.',
    url: 'https://www.naira.autos/tools/fuel-economy-converter',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/fuel-economy-converter',
      name: 'Fuel Economy Unit Converter — MPG to L/100km to km/L',
      description: 'Convert fuel economy instantly between MPG (US), MPG (UK/Imperial), L/100km, and km/L. Free, accurate, and works for any car, anywhere in the world.',
      url: 'https://www.naira.autos/tools/fuel-economy-converter',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Fuel Economy Unit Converter', item: 'https://www.naira.autos/tools/fuel-economy-converter' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I convert MPG to L/100km?', acceptedAnswer: { '@type': 'Answer', text: 'Divide 235.21 by the MPG (US) figure to get L/100km. For example, 30 MPG (US) works out to roughly 7.84 L/100km. For UK/Imperial MPG, divide 282.48 by the MPG figure instead, since the imperial gallon is a different size.' } },
        { '@type': 'Question', name: 'Is UK MPG the same as US MPG?', acceptedAnswer: { '@type': 'Answer', text: 'No. A UK (imperial) gallon is about 20% larger than a US gallon, so the same car will show a higher MPG figure when measured in UK MPG than in US MPG, even though fuel consumption hasn\'t changed. Always check which gallon a figure is using before comparing.' } },
        { '@type': 'Question', name: 'What is a good L/100km figure?', acceptedAnswer: { '@type': 'Answer', text: 'Roughly speaking, under 6 L/100km is very efficient (small cars, hybrids), 6-9 L/100km is typical for mid-size sedans and crossovers, and above 10 L/100km is common for larger SUVs, trucks, and performance cars. Lower numbers mean better fuel economy in this unit.' } },
        { '@type': 'Question', name: 'Why do some countries use MPG and others use L/100km?', acceptedAnswer: { '@type': 'Answer', text: 'It comes down to which measurement system a country adopted historically. The US and UK use miles and gallons, so fuel economy is expressed as miles per gallon. Most of the rest of the world uses the metric system, so fuel economy is expressed as liters consumed per 100 kilometers traveled, or km per liter.' } },
        { '@type': 'Question', name: 'What is km/L and how is it different from L/100km?', acceptedAnswer: { '@type': 'Answer', text: 'Both are metric fuel economy units, but they measure in opposite directions. Km/L tells you how many kilometers you travel per liter of fuel (higher is better), while L/100km tells you how many liters you burn over a fixed 100km distance (lower is better). Km/L is common in Japan and parts of Asia, while L/100km is the standard in Europe, Australia, and most of the rest of the world.' } },
        { '@type': 'Question', name: 'How do I turn a fuel economy figure into a monthly budget?', acceptedAnswer: { '@type': 'Answer', text: 'Multiply your expected monthly distance in kilometers by the L/100km figure, divide by 100, then multiply by your local fuel price per liter to get an estimated monthly fuel cost.' } },
        { '@type': 'Question', name: 'Why do two similar MPG figures give different real-world costs?', acceptedAnswer: { '@type': 'Answer', text: 'MPG and km/L are not linear against L/100km. The same MPG gap matters far more at the low end (for example 15 vs 20 MPG) than at the high end (55 vs 60 MPG), because the relationship between the units is inverse rather than a straight line.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Fuel Economy Unit Converter', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function FuelEconomyConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-orange-500/20 border border-white/15 hover:border-orange-500/40 text-white/60 hover:text-orange-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Fuel Economy Unit Converter</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-orange-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Works worldwide</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Fuel Economy<br /><span className="text-orange-400">Unit Converter</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">MPG, L/100km, and km/L — instantly.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter any fuel economy figure and convert it between US MPG, UK/Imperial MPG, L/100km, and km/L in real time. No region-specific data needed — just accurate math.</p>
          </div>
        </div>
      </div>

      <FuelEconomyClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* Why units differ */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Why Every Country Measures Fuel Economy Differently
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                If you&apos;ve ever tried to compare a car&apos;s fuel economy figure from a US review site against a spec sheet from a European or Japanese manufacturer, you&apos;ve probably run into a wall of confusing, seemingly incompatible numbers. That&apos;s because there is no single global standard for expressing how efficiently a car burns fuel — instead, each region built its own convention around the measurement system it already uses for distance and volume.
              </p>
              <p>
                The United States uses <strong className="text-foreground">miles per gallon (MPG)</strong>, based on the US gallon (3.785 liters), where a bigger number always means better efficiency. The United Kingdom historically used the same style of measurement but with the imperial gallon (4.546 liters), which is roughly 20% larger than the US gallon — so a UK MPG figure and a US MPG figure for the exact same car will never match, even though nothing about the car&apos;s actual fuel consumption has changed. This trips up a lot of people importing cars or comparing spec sheets between US and UK sources.
              </p>
              <p>
                Most of the rest of the world — continental Europe, Australia, South Africa, and much of Africa and Latin America — uses the metric system and expresses fuel economy as <strong className="text-foreground">liters consumed per 100 kilometers (L/100km)</strong>. This flips the logic: instead of measuring how far you get per unit of fuel, it measures how much fuel you burn over a fixed distance, which means a <em>lower</em> number is better. Meanwhile, <strong className="text-foreground">kilometers per liter (km/L)</strong> is common in Japan, parts of Southeast Asia, and increasingly in Nigeria and other African markets, and it works the same direction as MPG — bigger is better — just using metric units instead of miles and gallons.
              </p>
              <p>
                This is exactly the kind of problem a converter solves cleanly without needing any make, model, or country-specific data — it&apos;s pure unit math, the same everywhere in the world, which is why the tool above works identically whether you&apos;re comparing a Lagos-market Toyota to a US EPA rating or a UK dealer listing to a Japanese import spec sheet.
              </p>
            </div>
          </div>

          {/* Formulas */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              The Conversion Formulas, If You Want to Do the Math Yourself
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <p>These are the exact formulas the calculator above uses, derived from the fact that 1 US gallon = 3.785411784 liters, 1 UK gallon = 4.54609 liters, and 1 mile = 1.609344 kilometers:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {[
                  ['MPG (US) → L/100km', 'L/100km = 235.21 ÷ MPG(US)'],
                  ['MPG (UK) → L/100km', 'L/100km = 282.48 ÷ MPG(UK)'],
                  ['L/100km → km/L', 'km/L = 100 ÷ L/100km'],
                  ['km/L → L/100km', 'L/100km = 100 ÷ km/L'],
                ].map(([label, formula]) => (
                  <div key={label} className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs font-bold text-foreground mb-1">{label}</p>
                    <p className="text-xs font-mono text-muted-foreground">{formula}</p>
                  </div>
                ))}
              </div>
              <p className="pt-2">
                The 235.21 and 282.48 constants come from converting gallons and miles into liters and kilometers, then normalizing to a 100km base distance. You don&apos;t need to memorize any of this — the tool above does it live as you type — but it&apos;s useful to understand why the numbers move the way they do, and why doubling your MPG doesn&apos;t simply halve your L/100km in a way that&apos;s intuitive at a glance (it does, in fact, work out that way, but the relationship is inverse rather than linear, which is why a small MPG change at the high end matters less than the same change at the low end).
              </p>
            </div>
          </div>

          {/* Reference table */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Quick Reference: Common Fuel Economy Figures
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">MPG (US)</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">MPG (UK)</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">L/100km</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">km/L</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Typical vehicle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['20', '24', '11.8', '8.5', 'Large SUV / pickup truck'],
                    ['25', '30', '9.4', '10.6', 'Mid-size SUV / crossover'],
                    ['30', '36', '7.8', '12.8', 'Mid-size sedan'],
                    ['35', '42', '6.7', '14.9', 'Compact car'],
                    ['45', '54', '5.2', '19.1', 'Hybrid sedan'],
                    ['55', '66', '4.3', '23.4', 'Plug-in hybrid (electric-assisted)'],
                  ].map(row => (
                    <tr key={row[0]} className="hover:bg-muted/20 transition-colors">
                      {row.map((cell, i) => <td key={i} className={`px-4 py-2.5 ${i === 4 ? 'text-muted-foreground text-xs' : 'font-bold text-foreground text-sm whitespace-nowrap'}`}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why it matters for buyers */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Why This Matters When Buying or Importing a Car
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                If you&apos;re comparing a used import listing that quotes UK MPG against a Japanese auction sheet quoting km/L, or you&apos;re trying to work out what a US EPA sticker actually means for your monthly fuel budget in a country that fuels in liters, getting the conversion right isn&apos;t just academic — it directly affects how much you&apos;ll actually spend at the pump. A car advertised at &quot;40 MPG&quot; sounds efficient until you realize the listing is quoting UK MPG rather than US MPG, which converts to a noticeably different real-world liters-per-100km figure.
              </p>
              <p>
                It also matters when you&apos;re cross-shopping between markets — comparing a Nigerian-market Toyota Corolla spec sheet (often in km/L) against a European brochure (in L/100km) against an American review (in MPG) requires converting all three into the same unit before the comparison means anything. Running the numbers through a converter first means you&apos;re comparing like with like, rather than assuming a bigger number is automatically better without checking which direction that particular unit runs.
              </p>
            </div>
          </div>

          {/* Turning a figure into an actual budget */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Turning a Converted Figure Into a Real Fuel Budget
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                A converted number on its own is only half the picture — the real value comes from turning it into money. Once you know a car&apos;s consumption in L/100km, the arithmetic for a monthly fuel budget is simple: multiply your expected monthly distance in kilometers by the L/100km figure, divide by 100, and multiply by the local fuel price per liter. A car doing 8 L/100km driven 1,200km a month at a fuel price of ₦1,200/liter, for example, burns roughly 96 liters and costs about ₦115,200 for that month, before accounting for traffic, air conditioning use, or a heavy right foot, all of which push real-world consumption above the manufacturer&apos;s tested figure.
              </p>
              <p>
                This is also where unit confusion gets expensive in practice, not just on paper. Someone comparing a &quot;35 MPG&quot; American listing against a &quot;15 km/L&quot; Japanese-market alternative has no intuitive way to tell which is actually cheaper to run without converting both into the same unit first — and the difference between US and UK MPG alone is large enough to change which car looks like the better deal. If you&apos;re budgeting for a car purchase, especially an import, it&apos;s worth running every spec sheet you&apos;re comparing through a converter like the one above before you commit, rather than trusting whichever number looks the biggest.
              </p>
              <p>
                For a fuller cost picture that includes actual local fuel prices rather than just the physics of conversion, pair this tool with our <Link href="/tools/fuel-cost-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">Fuel Cost Calculator</Link>, which takes a consumption figure and turns it into a real naira-and-kobo running cost based on distance and current pump prices.
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fuel Economy Conversion FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How do I convert MPG to L/100km?', a: 'Divide 235.21 by the MPG (US) figure. For example, 30 MPG (US) works out to about 7.84 L/100km. For UK/Imperial MPG, divide 282.48 by the MPG figure instead.' },
                { q: 'Is UK MPG the same as US MPG?', a: 'No — the UK (imperial) gallon is about 20% larger than the US gallon, so the same car shows a higher MPG figure in UK MPG than in US MPG. Always check which gallon a figure is based on.' },
                { q: 'What is a good L/100km figure?', a: 'Under 6 L/100km is very efficient, 6–9 L/100km is typical for mid-size cars and crossovers, and above 10 L/100km is common for larger SUVs and trucks. Lower is better in this unit.' },
                { q: 'What is km/L and how is it different from L/100km?', a: 'Km/L tells you distance traveled per liter (higher is better), while L/100km tells you liters burned over a fixed 100km (lower is better) — they measure the same thing in opposite directions.' },
                { q: 'How do I turn a fuel economy figure into a monthly budget?', a: 'Multiply your expected monthly distance in km by the L/100km figure, divide by 100, then multiply by your local fuel price per liter. That gives an estimated monthly fuel cost — pair it with our Fuel Cost Calculator for the full picture.' },
                { q: 'Why do two "similar" MPG figures give different real-world costs?', a: 'Because MPG and km/L aren\'t linear against L/100km — the same MPG gap matters far more at the low end (say 15 vs 20 MPG) than at the high end (55 vs 60 MPG), since the relationship is inverse, not straight-line.' },
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
                { href: '/tools/road-trip-calculator', label: 'Road Trip Calculator', color: 'sky' },
                { href: '/tools/wiper-blade-size-finder', label: 'Wiper Blade Size Finder', color: 'emerald' },
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
