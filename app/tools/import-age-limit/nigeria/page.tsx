import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ImportAgeLimitNigeriaClient from './client';

export const metadata: Metadata = {
  title: 'Nigeria Car Import Age Limit 2026 — 12-Year Rule Checker',
  description: 'What is the car import age limit in Nigeria in 2026? Check if your car qualifies, how Customs calculates vehicle age, why older cars are still on Nigerian roads, and what happens if a car is too old.',
  keywords: [
    'nigeria car import age limit',
    'nigeria car import age limit 2026',
    'how old can a car be to import into nigeria',
    'nigeria customs 12 year rule',
    'can i import a 2010 car to nigeria',
    'can i import a 2012 model to nigeria',
    'nigeria customs vehicle age limit',
    'vin valuation policy nigeria',
    'nigeria customs vin plate age',
    'why are old cars still in nigeria',
    'oldest car i can import to nigeria',
    'tokunbo age limit nigeria',
    'nigeria customs seized vehicle age',
    'car import age limit checker nigeria',
  ].join(', '),
  alternates: { canonical: 'https://www.naira.autos/tools/import-age-limit/nigeria' },
  openGraph: {
    title: 'Nigeria Car Import Age Limit 2026 — 12-Year Rule Checker | Naira Autos',
    description: 'What is the car import age limit in Nigeria in 2026? Check if your car qualifies and why older cars are still on Nigerian roads.',
    url: 'https://www.naira.autos/tools/import-age-limit/nigeria',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'Nigeria Car Import Age Limit 2026 — 12-Year Rule Checker',
      description: 'What is the car import age limit in Nigeria — the 12-year rule, how vehicle age is calculated, and what happens if a car is too old to import.',
      url: 'https://www.naira.autos/tools/import-age-limit/nigeria',
      dateModified: '2026-07-25',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Age Limit', item: 'https://www.naira.autos/tools/import-age-limit' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/import-age-limit/nigeria' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is the car import age limit in Nigeria in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'Nigeria Customs allows import of used passenger vehicles up to 12 years old from the manufacture date. In 2026, that means a vehicle must be a 2014 model or newer to clear an official seaport.' } },
        { '@type': 'Question', name: 'How is the age of an imported car calculated in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Nigeria Customs uses the manufacture date stamped on the VIN plate, not the "model year" a dealer advertises. A car can be sold as a later model year while its VIN plate shows an earlier manufacture date, which is the figure Customs actually checks.' } },
        { '@type': 'Question', name: 'Why do I still see 2004 Toyota Camry or 2008 Honda Accord cars in Nigeria if the limit is 12 years?', acceptedAnswer: { '@type': 'Answer', text: 'The 12-year rule only blocks new imports at the port going forward — it does not retroactively ban cars already registered in the country. Many older cars on Nigerian roads were legally imported years ago under looser rules (the limit was 15 years before May 2022) and have simply stayed in circulation through resale. Some older vehicles also enter informally through land borders like Seme and Cotonou, bypassing the seaport check.' } },
        { '@type': 'Question', name: 'What happens if I import a car older than 12 years into Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Nigeria Customs classifies it as a prohibited import. The vehicle is seized at the port and is not released, even if the owner offers to pay duty.' } },
        { '@type': 'Question', name: 'Has Nigeria\'s car import age limit always been 12 years?', acceptedAnswer: { '@type': 'Answer', text: 'No. The limit was 15 years for a long stretch before the Nigeria Customs Service reduced it to 12 years in May 2022 as part of its VIN Valuation Policy.' } },
        { '@type': 'Question', name: 'Does the 12-year rule apply to a car I already own in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'No. The rule applies only to new imports at the point of entry. A car already registered in Nigeria can continue to be owned, driven, and resold regardless of its age.' } },
        { '@type': 'Question', name: 'Is it safe to bring in an older car through Cotonou or Seme instead of a seaport?', acceptedAnswer: { '@type': 'Answer', text: 'It carries real risk. Vehicles routed through land borders bypass the VIN Valuation System check at seaports, but they still cannot be legally registered in Nigeria and lack proper customs duty documents. Enforcement crackdowns since 2025 have made this a high-risk route rather than a reliable shortcut, and undocumented vehicles run into problems at resale or renewal.' } },
      ],
    },
  ],
};

export default function ImportAgeLimitNigeriaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/import-age-limit" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/import-age-limit" className="hover:text-white/60 transition-colors">Import Age Limit</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇬 Nigeria</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">Free Checker</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">12-Year Rule</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Car Import<br /><span className="text-emerald-400">Age Limit Checker</span>
            </h1>
            <p className="text-white/75 text-sm leading-relaxed">Is your car too old to import into Nigeria? Enter the manufacture year for an instant answer — and find out why older cars are still on Nigerian roads either way.</p>
          </div>
        </div>
      </div>

      <ImportAgeLimitNigeriaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Editorial content */}
          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What Is Nigeria&apos;s Car Import Age Limit Right Now?
              </h2>
              <p className="mb-3">Nigeria Customs Service (NCS) allows the import of used passenger vehicles that are <strong className="text-foreground">no more than 12 years old from their manufacture date</strong>. In 2026, that means only vehicles manufactured in 2014 or later can clear an official seaport — anything older is classified as a prohibited import.</p>
              <p>This limit applies across the standard used-vehicle HS codes covering passenger cars, SUVs, and small commercial vehicles. It&apos;s a national rule enforced at the point of entry, not something that varies by state the way vehicle license fees do.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How the Age Is Calculated — And Why It&apos;s Not the &quot;Model Year&quot;
              </h2>
              <p className="mb-3">Customs goes by the manufacture date stamped on the vehicle&apos;s VIN plate — not the model year a dealer or auction listing advertises. It&apos;s common for a car to be marketed as a later model year while its VIN plate shows an earlier build date, so the two numbers can genuinely differ. Before buying anything close to the cutoff, check the physical VIN plate date rather than relying on the listing.</p>
              <p>The Nigeria Customs Service checks this through its Vehicle Identification Number (VIN) Valuation System, which also assigns the vehicle&apos;s fixed dutiable value independently of your purchase invoice.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Why Do I Still See 2004 Camrys and 2008 Accords on Nigerian Roads?
              </h2>
              <p className="mb-3">This is the question that trips up almost everyone checking the rule for the first time — and it has a straightforward answer. <strong className="text-foreground">The 12-year limit only blocks new imports going forward; it doesn&apos;t reach back and un-register a car that&apos;s already in the country.</strong> A 2004 Camry or 2008 Accord on the road today was very likely imported legally years ago — before May 2022, the limit was 15 years, and enforcement before that was looser still. That car has simply stayed in circulation, changing hands in the domestic resale market ever since. Nothing about the current rule forces it off the road or blocks its resale.</p>
              <p>Separately, some older vehicles do enter more recently through informal routes — land borders like Seme, or via Cotonou in neighbouring Benin, which has no age limit of its own and is a common transshipment point. Those vehicles bypass the VIN Valuation System check that only runs at official seaports, so a handful of genuinely recent arrivals can still be older than 12 years. See the land-border section below for why that route carries real risk rather than being a shortcut.</p>
              <p>In short: &quot;12 years&quot; is the rule for clearing a fresh import through Apapa or Tin Can today. It says nothing about what&apos;s already on the road.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How Nigeria Customs Enforces the Rule
              </h2>
              <p className="mb-3">Enforcement runs through the VIN Valuation System at the major seaports — Apapa and Tin Can in Lagos are the primary entry points for used vehicles. Every VIN is checked against the manufacture-date cutoff before a vehicle can be cleared. A vehicle that fails the check is classified as a prohibited import: it is seized and is not returned to the importer, even if duty is offered.</p>
              <p>Some sources report a pre-shipment certification step introduced in early 2026 aimed at verifying a vehicle&apos;s age and condition before it even leaves the export country — if you&apos;re shipping soon, confirm the current pre-shipment requirements with your clearing agent, since this is one of the faster-moving parts of the policy.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                The Land Border Risk: Cotonou and Seme
              </h2>
              <p className="mb-3">Because Benin has no used-vehicle age limit of its own, Cotonou has long been used as a transshipment point for vehicles ultimately headed for Nigeria via the Seme border. The appeal is obvious — it looks like a way around the 12-year rule. In practice, it carries real risk: a vehicle brought in this way cannot be legally registered in Nigeria and won&apos;t have proper customs duty payment documents, which causes problems the moment you try to resell it, insure it properly, or renew its particulars. Enforcement crackdowns since 2025 have also made land-border smuggling routes a much higher-risk gamble than the &quot;cheap shortcut&quot; reputation suggests.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                A Brief History of the Age Limit
              </h2>
              <p>The age limit has tightened in stages rather than appearing overnight. For a long stretch, the rule allowed vehicles up to 15 years old. In May 2022, the Nigeria Customs Service reduced this to 12 years as part of its VIN Valuation Policy, aimed at standardizing import duties and curbing undervaluation. That 12-year threshold is what remains in force today.</p>
            </div>

          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Import Age Limit FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What is the car import age limit in Nigeria in 2026?', a: 'Vehicles must be no more than 12 years old from their manufacture date — a 2014 model or newer in 2026 — to clear an official seaport.' },
                { q: 'How is the age of an imported car calculated?', a: 'From the manufacture date on the VIN plate, not the model year on the listing. Always check the physical VIN plate before buying near the cutoff.' },
                { q: 'Why do I still see 2004 Camrys and 2008 Accords in Nigeria?', a: 'They were imported legally years ago under looser rules (15 years before May 2022) and have stayed in the domestic resale market since. The rule only blocks new imports, not continued ownership.' },
                { q: 'What happens if I import a car older than 12 years?', a: 'It\'s classified as a prohibited import and seized at the port — not released even if you offer to pay duty.' },
                { q: 'Has the limit always been 12 years?', a: 'No — it was 15 years until the Nigeria Customs Service reduced it in May 2022 under the VIN Valuation Policy.' },
                { q: 'Does the rule apply to a car I already own in Nigeria?', a: 'No. It only applies to new imports at the point of entry — you can keep, drive, and resell an older car you already own.' },
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

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/70 border-t border-border pt-6">
            This guide is informational only and not affiliated with the Nigeria Customs Service or any government agency. Rules, enforcement practices, and pre-shipment requirements change periodically — always confirm current requirements with a licensed clearing agent or the NCS before purchasing or shipping a vehicle.
          </p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'blue' },
                { href: '/tools/vin-checker',             label: 'VIN Checker',            color: 'violet' },
                { href: '/tools/document-generator',      label: 'Document Generator',     color: 'rose' },
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
