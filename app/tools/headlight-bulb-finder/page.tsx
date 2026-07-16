import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Search, BookOpen, Lightbulb as LightbulbIcon } from 'lucide-react';
import HeadlightBulbClient from './client';

export const metadata: Metadata = {
  title: 'Headlight Bulb Type Finder — Find Your Car\'s Bulb Type by Make, Model & Year',
  description: 'Find the exact headlight and fog light bulb type for your car in seconds. Low beam, high beam, and fog light codes for 100+ models, worldwide.',
  alternates: { canonical: 'https://www.naira.autos/tools/headlight-bulb-finder' },
  openGraph: {
    title: 'Headlight Bulb Type Finder | Naira Autos',
    description: 'Free headlight and fog light bulb type lookup for 100+ car models worldwide. Low beam, high beam, and fog codes — instantly.',
    url: 'https://www.naira.autos/tools/headlight-bulb-finder',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/headlight-bulb-finder',
      name: 'Headlight Bulb Type Finder — Find Your Car\'s Bulb Type by Make, Model & Year',
      description: 'Find the exact headlight and fog light bulb type for your car in seconds. Low beam, high beam, and fog light codes for 100+ models, worldwide.',
      url: 'https://www.naira.autos/tools/headlight-bulb-finder',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Headlight Bulb Type Finder', item: 'https://www.naira.autos/tools/headlight-bulb-finder' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How do I know what headlight bulb my car uses?', acceptedAnswer: { '@type': 'Answer', text: 'Check the code printed on the base of your existing bulb (like H11 or 9005), look in your owner\'s manual, or search your exact make, model, and year using a bulb type finder tool.' } },
        { '@type': 'Question', name: 'Are low beam and high beam bulbs the same?', acceptedAnswer: { '@type': 'Answer', text: 'Not usually. Most cars use separate bulbs for low and high beam, such as H11 for low beam and 9005 for high beam. Some vehicles use a single dual-filament bulb like H4 or H13 for both.' } },
        { '@type': 'Question', name: 'Can I replace a Xenon or LED headlight with a halogen bulb?', acceptedAnswer: { '@type': 'Answer', text: 'No. Factory Xenon (HID) headlights need an HID-rated bulb and a working ballast, and many factory LED headlights are sealed, non-serviceable units that require replacing the entire assembly. Fitting the wrong type will not work and can damage the wiring.' } },
        { '@type': 'Question', name: 'Why does my headlight bulb keep burning out?', acceptedAnswer: { '@type': 'Answer', text: 'Common causes include touching the glass with bare fingers (oil residue causes hot spots), a failing alternator sending voltage spikes, a loose connector causing arcing, or using a bulb with a wattage higher than the housing is rated for.' } },
        { '@type': 'Question', name: 'What is the difference between H7 and H11 bulbs?', acceptedAnswer: { '@type': 'Answer', text: 'Both are single-filament halogen bulbs but use different base shapes and pin configurations, so they are not interchangeable. H7 is common on many European cars, while H11 is common on Japanese, Korean, and American models.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Headlight Bulb Type Finder', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function HeadlightBulbFinderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
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
              <span className="text-white/50">Headlight Bulb Type Finder</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-amber-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">100+ car models</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Headlight Bulb<br /><span className="text-amber-400">Type Finder</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Stop buying the wrong bulb code.</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your car&apos;s make, model, and year to get the exact low beam, high beam, and fog light bulb codes — plus a heads-up if your trim uses factory Xenon or LED.</p>
          </div>
        </div>
      </div>

      <HeadlightBulbClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          {/* How to find your bulb type */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              3 Ways to Find Your Bulb Type
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {[
                { icon: Search, title: 'Read the old bulb', text: 'The bulb code — like H11 or 9005 — is printed directly on the glass or metal base of your existing bulb.' },
                { icon: BookOpen, title: 'Check the owner\'s manual', text: 'Most manuals list exact bulb codes for low beam, high beam, and fog lights in the maintenance section.' },
                { icon: LightbulbIcon, title: 'Look it up by model', text: 'Use the tool above — select your make, model, and year for low beam, high beam, and fog light codes instantly.' },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="p-4 rounded-2xl bg-card border border-border">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                    <Icon className="h-4.5 w-4.5 text-amber-500" />
                  </div>
                  <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bulb type guide */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Common Bulb Types Explained
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Code</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Type</th>
                    <th className="text-left px-4 py-3 font-bold text-foreground">Common on</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['H7 / H11 / H1', 'Halogen, single filament', 'Most low or high beam circuits worldwide'],
                    ['9005 (HB3) / 9006 (HB4)', 'Halogen, single filament', 'American, Japanese, and Korean models — high or low beam'],
                    ['H4 / H13', 'Halogen, dual filament', 'One bulb covers both low and high beam'],
                    ['D1S / D2S / D3S / D4S', 'Xenon (HID), needs a ballast', 'Factory HID headlights on premium trims'],
                    ['LED module', 'Sealed LED unit', 'Newer factory LED headlights — usually not user-replaceable'],
                  ].map(([code, type, common]) => (
                    <tr key={code} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 font-bold text-foreground text-sm whitespace-nowrap">{code}</td>
                      <td className="px-4 py-2.5 text-muted-foreground">{type}</td>
                      <td className="px-4 py-2.5 text-muted-foreground text-xs">{common}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Headlight Bulb FAQ</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How do I know what headlight bulb my car uses?', a: 'Check the code printed on the base of your existing bulb, check your owner\'s manual, or look up your exact make, model, and year using the tool above.' },
                { q: 'Are low beam and high beam bulbs the same?', a: 'Not usually — most cars use separate bulbs for each, though some use a single dual-filament bulb (H4 or H13) for both.' },
                { q: 'Can I replace a Xenon or LED headlight with a halogen bulb?', a: 'No. Factory Xenon needs an HID-rated bulb and ballast, and many factory LED headlights are sealed units that require replacing the whole assembly.' },
                { q: 'Why does my headlight bulb keep burning out?', a: 'Common causes: touching the glass with bare fingers, a failing alternator causing voltage spikes, a loose connector, or a bulb with too high a wattage for the housing.' },
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
                { href: '/tools/wiper-blade-size-finder', label: 'Wiper Blade Size Finder', color: 'emerald' },
                { href: '/tools/obd-codes', label: 'OBD-II Code Lookup', color: 'sky' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'blue' },
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
