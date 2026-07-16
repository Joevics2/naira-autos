import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Ruler, Wrench, RotateCw } from 'lucide-react';
import WiperBladeClient from './client';

export const metadata: Metadata = {
  title: 'Wiper Blade Size Finder — Find Your Car\'s Wiper Sizes by Make, Model & Year',
  description: 'Find the exact windshield wiper blade sizes for your car in seconds. Driver, passenger, and rear sizes for 100+ models, plus the connector type you need.',
  alternates: { canonical: 'https://www.naira.autos/tools/wiper-blade-size-finder' },
  openGraph: {
    title: 'Wiper Blade Size Finder | Naira Autos',
    description: 'Free wiper blade size lookup for 100+ car models worldwide. Driver, passenger, rear sizes and connector type — instantly.',
    url: 'https://www.naira.autos/tools/wiper-blade-size-finder',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/wiper-blade-size-finder',
      name: 'Wiper Blade Size Finder — Find Your Car\'s Wiper Sizes by Make, Model & Year',
      description: 'Find the exact windshield wiper blade sizes for your car in seconds. Driver, passenger, and rear sizes for 100+ models, plus the connector type you need.',
      url: 'https://www.naira.autos/tools/wiper-blade-size-finder',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Wiper Blade Size Finder', item: 'https://www.naira.autos/tools/wiper-blade-size-finder' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I know what size wiper blades I need?', acceptedAnswer: { '@type': 'Answer', text: 'The easiest way is to measure your existing blades end-to-end in inches, or check your owner\'s manual. You can also look up your exact make, model, and year using a wiper size finder tool — driver and passenger sides are usually different lengths.' } },
        { '@type': 'Question', name: 'Are driver and passenger side wiper blades the same size?', acceptedAnswer: { '@type': 'Answer', text: 'No, on most cars the driver-side blade is longer than the passenger-side blade. A common Toyota Camry setup, for example, uses a 26-inch driver blade and a 20-inch passenger blade. Some German cars like Mercedes-Benz use matching lengths on both sides.' } },
        { '@type': 'Question', name: 'What is a wiper connector or fitting type?', acceptedAnswer: { '@type': 'Answer', text: 'The connector is how the blade attaches to the wiper arm. Common types are Hook (U-Slot), Pinch Tab, Side Pin, and Bayonet. Buying the wrong connector type means the blade won\'t clip onto your arm even if the length is correct.' } },
        { '@type': 'Question', name: 'Does my car have a rear wiper blade?', acceptedAnswer: { '@type': 'Answer', text: 'Most hatchbacks, SUVs, and station wagons have a smaller rear wiper blade, typically 12–16 inches. Sedans and pickup trucks usually do not have one.' } },
        { '@type': 'Question', name: 'How often should I replace wiper blades?', acceptedAnswer: { '@type': 'Answer', text: 'Most manufacturers recommend replacing wiper blades every 6–12 months, or sooner if you notice streaking, skipping, squeaking, or visible cracking in the rubber edge.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Wiper Blade Size Finder', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function WiperBladeSizeFinderPage() {
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
              <span className="text-white/50">Wiper Blade Size Finder</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">100+ car models</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Wiper Blade<br /><span className="text-emerald-400">Size Finder</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Stop guessing at the auto parts counter.</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your car&apos;s make, model, and year to get the exact driver, passenger, and rear wiper blade sizes — plus the connector type your arm needs.</p>
          </div>
        </div>
      </div>

      <WiperBladeClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* How to find your size */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              3 Ways to Find Your Wiper Blade Size
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Ruler, title: 'Measure your old blade', text: 'Lay the wiper flat and measure end to end in inches. This is the most reliable method since trims can vary within a model.' },
                { icon: Wrench, title: 'Check the owner\'s manual', text: 'Most manuals list the exact factory blade sizes in the maintenance or specifications section.' },
                { icon: RotateCw, title: 'Look it up by model', text: 'Use the tool above — select your make, model, and year for driver, passenger, and rear sizes instantly.' },
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

          {/* Connector types */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Common Wiper Connector Types
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Connector</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Common on</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Hook (U-Slot)', 'Toyota, Nissan, Hyundai, Kia, most SUVs & trucks', 'The most universal fitting — a J-shaped arm hook slots into a U-shaped channel.'],
                    ['Pinch Tab', 'Ford, GM, Mercedes-Benz, Lexus', 'A push-button release tab holds the blade to a flat hook arm.'],
                    ['Side Pin', 'Honda, Subaru', 'A small pin passes through a side hole — needs a matching or adapter-fitted blade.'],
                    ['Bayonet', 'Volkswagen, Audi', 'A wide, flat arm with a locking clip — standard across most European models.'],
                  ].map(([type, common, notes]) => (
                    <tr key={type} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-foreground text-sm whitespace-nowrap">{type}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{common}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">{notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Wiper Blade FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How do I know what size wiper blades I need?', a: 'Measure your existing blades end-to-end in inches, check your owner\'s manual, or look up your exact make, model, and year using the tool above.' },
                { q: 'Are driver and passenger side wiper blades the same size?', a: 'Usually not — the driver-side blade is typically longer. A Toyota Camry, for example, commonly uses a 26-inch driver blade and a 20-inch passenger blade. Some Mercedes-Benz models use matching sizes on both sides.' },
                { q: 'What is a wiper connector or fitting type?', a: 'It\'s how the blade clips onto your wiper arm. Buying the correct length but wrong connector type means the blade won\'t attach — always check both.' },
                { q: 'How often should I replace wiper blades?', a: 'Every 6–12 months, or sooner if you notice streaking, skipping, squeaking, or cracked rubber.' },
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
                { href: '/tools/obd-codes', label: 'OBD-II Code Lookup', color: 'emerald' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'blue' },
                { href: '/tools/fuel-cost-calculator', label: 'Fuel Cost Calculator', color: 'amber' },
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
