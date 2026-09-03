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
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
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
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: August 2026</span>
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

          {/* Why size matters */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Why Getting Your Wiper Blade Size Right Actually Matters
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Windshield wipers seem like the simplest part on a car — a strip of rubber on an arm — but the size and fit of that strip is more precise than most drivers realize. Every wiper blade is engineered by the automaker to sweep a specific arc on a specific windshield curvature. Fit a blade that is even an inch too long or too short and you lose clear visibility exactly where you need it most: the outer edges of your field of vision during rain, snow, or highway spray. A blade that&apos;s too long can also strike the A-pillar or side mirror housing, chipping the rubber edge or bending the wiper arm over time. One that&apos;s too short leaves a visible unwiped strip along the edge of the glass, which is where oncoming headlight glare tends to scatter at night.
              </p>
              <p>
                It isn&apos;t just about length either. Automakers pair a driver-side blade with a longer sweep and a shorter passenger-side blade because the driver&apos;s field of view needs the wider arc, while the passenger side only needs to clear enough glass for basic visibility and to keep the wiper motor linkage balanced. Get the pairing backwards — for example, fitting two identical-length blades on a car designed for asymmetric sizes — and you can end up with the blades colliding at the base of the windshield or leaving oddly-shaped smear patterns that never fully clear.
              </p>
              <p>
                The connector type matters just as much as the length. Auto parts stores stock &quot;universal&quot; wiper blades with multi-adapter kits precisely because there is no single global standard — a hook-style blade physically will not click onto a bayonet arm, and a side-pin blade will wobble or detach on an arm it wasn&apos;t designed for, even if you force the length to match. Buying blindly by brand reputation instead of your actual arm type is one of the most common reasons people end up returning wiper blades or driving around with a loose, rattling blade that skips across the glass instead of gliding.
              </p>
              <p>
                This is exactly why we built this tool the way we did: rather than making you guess or dig through a paper catalog at the counter, you select your make, model, and year and get the driver, passenger, and rear sizes together with the connector type your car actually uses — in one lookup, worldwide, for free.
              </p>
            </div>
          </div>

          {/* Signs it's time to replace */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Signs Your Wiper Blades Need Replacing
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground leading-relaxed">
              <p><strong className="text-foreground">Streaking.</strong> A thin film of water or a hazy smear left behind after a pass usually means the rubber edge has hardened or developed a micro-tear that no longer holds a clean bead of water.</p>
              <p><strong className="text-foreground">Skipping or chattering.</strong> If the blade jumps or juddders across the glass instead of gliding smoothly, the rubber has likely lost its flexibility, or the metal frame underneath has bent slightly out of shape.</p>
              <p><strong className="text-foreground">Squeaking.</strong> A high-pitched squeal on each pass is often the first audible sign that the rubber has glazed over and stopped conforming to the curve of your windshield.</p>
              <p><strong className="text-foreground">Visible cracking or splitting.</strong> UV exposure and heat dry out wiper rubber over time — once you can see cracks along the wiping edge, the blade is on borrowed time and will only get worse.</p>
              <p><strong className="text-foreground">Reduced coverage.</strong> If a patch of windshield stays wet or streaked no matter how many passes the wiper makes, the blade may have separated from the frame at one point along its length.</p>
              <p><strong className="text-foreground">It&apos;s simply been a while.</strong> Even blades that look fine benefit from replacement every 6–12 months — rubber degrades from sun and heat even in a garage-kept car, well before it looks visibly damaged.</p>
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

          {/* Blade styles */}
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Conventional, Beam, and Hybrid Blades — What&apos;s the Difference?
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                Once you know your size, you&apos;ll still need to pick a style, and this is a separate decision from length or connector type. <strong className="text-foreground">Conventional (frame-style)</strong> blades use a jointed metal skeleton with several pressure points along the rubber — they&apos;re inexpensive and widely available, but the exposed frame can collect ice and snow in cold climates, which stops it from flexing evenly against the glass.
              </p>
              <p>
                <strong className="text-foreground">Beam blades</strong> replace that metal skeleton with a single curved strip, usually with a rubber or silicone spine, that distributes pressure evenly across the entire length. They tend to hug curved windshields more precisely, run quieter, and resist ice buildup better, which is why most new cars have shipped with beam blades as standard equipment for the past decade or so.
              </p>
              <p>
                <strong className="text-foreground">Hybrid blades</strong> combine a beam-style rubber element with a partial frame for extra rigidity at highway speeds, aiming for a middle ground between the two. For most drivers, matching whatever style came on the car from the factory is the safest choice — but if your original blades were a basic conventional frame and you drive somewhere with real winters, upgrading to a beam blade in the same size is a common and worthwhile improvement.
              </p>
              <p>
                One more buying tip: silicone wiper blades cost more upfront than standard rubber but last considerably longer and resist UV cracking better, since silicone doesn&apos;t oxidize and harden the way natural or synthetic rubber does. If you keep a car for the long haul rather than replacing it every few years, the extra cost of silicone blades typically pays for itself in fewer replacement cycles.
              </p>
            </div>
          </div>


          {/* Worked example */}
          <div className="max-w-3xl">
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Right Length, Wrong Connector</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">Priya bought a pair of 26-inch and 20-inch blades for her Honda Civic based on a general size chart she found online — the lengths matched her car's spec exactly. They still wouldn't clip onto her wiper arms. Her Civic uses a Side Pin connector, common on Honda and Subaru, but the blades she'd bought were a universal Hook-style fitting sold with the correct length as the only listed spec. Looking up the connector type specifically, not just the length, would have caught the mismatch before she made the trip to return them.</p>
          </div>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Auto Mechanic. Sizes and connector types checked for workshop accuracy.
          </p>

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
