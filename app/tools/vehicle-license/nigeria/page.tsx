import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VehicleLicenseNigeriaClient from './client';

export const metadata: Metadata = {
  title: 'FRSC Vehicle License Renewal Nigeria 2026 — Cost, Road Worthiness & Car Documents',
  description: 'How much is vehicle license renewal in Lagos, Abuja, and across Nigeria? Full cost breakdown, road worthiness renewal price, vehicle documents checklist, and how to renew online — updated 2026.',
  keywords: [
    'frsc vehicle license renewal',
    'how much is vehicle license renewal in lagos',
    'how much is vehicle license renewal in abuja',
    'how much is vehicle license renewal in nigeria',
    'road worthiness renewal',
    'how much is road worthiness renewal in lagos',
    'how much is road worthiness in lagos',
    'how much does it cost to register a car in nigeria',
    'how much to register a car in nigeria',
    'cost of renewing vehicle particulars in nigeria',
    'list of car documents in nigeria',
    'vehicle documents checklist',
    'vehicle particulars',
    'road worthiness renewal online',
    'how to renew vehicle license online in lagos',
    'nvis frsc gov ng vehicle registration',
    'proof of ownership renewal online',
    'car renewal registration fee',
    'cost of vehicle registration in nigeria',
  ].join(', '),
  alternates: { canonical: 'https://www.naira.autos/tools/vehicle-license/nigeria' },
  openGraph: {
    title: 'FRSC Vehicle License Renewal Nigeria 2026 — Cost & Road Worthiness | Naira Autos',
    description: 'How much is vehicle license renewal in Lagos, Abuja, and across Nigeria? Full cost breakdown, road worthiness price, and documents checklist.',
    url: 'https://www.naira.autos/tools/vehicle-license/nigeria',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      name: 'FRSC Vehicle License Renewal Nigeria — Cost, Road Worthiness & Car Documents',
      description: 'How much is vehicle license renewal in Lagos, Abuja, and across Nigeria — cost breakdown, road worthiness renewal price, and documents checklist.',
      url: 'https://www.naira.autos/tools/vehicle-license/nigeria',
      dateModified: '2026-07-25',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Vehicle License', item: 'https://www.naira.autos/tools/vehicle-license' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/vehicle-license/nigeria' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much is vehicle license renewal in Lagos?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos vehicle license renewal typically costs ₦4,000–₦6,000 for a saloon car, ₦5,000–₦7,000 for an SUV, and ₦8,000+ for commercial vehicles. Add roadworthiness (₦4,000–₦8,000) and insurance (₦5,000–₦15,000) for the full package — usually ₦15,000–₦30,000 total.' } },
        { '@type': 'Question', name: 'How much is vehicle license renewal in Abuja?', acceptedAnswer: { '@type': 'Answer', text: 'FCT vehicle license renewal via the DRTS portal typically runs ₦5,000–₦12,000 for the license alone, similar to Lagos rates. Full packages including roadworthiness and insurance usually total ₦20,000–₦30,000.' } },
        { '@type': 'Question', name: 'How much is road worthiness renewal in Lagos?', acceptedAnswer: { '@type': 'Answer', text: 'Roadworthiness certificate renewal in Lagos typically costs ₦4,000–₦8,000, done at a VIO/VIS inspection center and usually renewed alongside your vehicle license.' } },
        { '@type': 'Question', name: 'How much does it cost to register a car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'New vehicle registration (distinct from annual renewal) includes an FRSC number plate (₦30,000 standard), state registration add-ons (₦1,500–₦50,000 depending on state), roadworthiness, and initial license fees — commonly ₦40,000–₦90,000+ total depending on state and vehicle type. Use the Registration Fee Calculator for an exact breakdown by state.' } },
        { '@type': 'Question', name: 'What is the list of car documents required in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'The core vehicle documents (often called "vehicle particulars") are: the vehicle license, roadworthiness certificate, proof of ownership/registration certificate, valid insurance certificate, and for imported cars, customs duty payment documents. Commercial vehicles also need a hackney permit.' } },
        { '@type': 'Question', name: 'Can I renew my vehicle license online in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Yes in Lagos (lagosmvnla.ng) and FCT (selfservice.fctevreg.com) — enter your plate number, verify details, pay online, then visit a station for the physical sticker or inspection. Most other states still require an in-person office visit.' } },
      ],
    },
  ],
};

export default function VehicleLicenseNigeriaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/vehicle-license" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/vehicle-license" className="hover:text-white/60 transition-colors">Vehicle License</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇳🇬 Nigeria</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">Free Calculator</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">36 States + FCT</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Vehicle License &amp;<br /><span className="text-emerald-400">Road Worthiness Renewal</span>
            </h1>
            <p className="text-white/75 text-sm leading-relaxed">How much is vehicle license renewal in your state, right now? Pick your state, expiry date, and vehicle type for a live cost estimate.</p>
          </div>
        </div>
      </div>

      <VehicleLicenseNigeriaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Editorial content — 1000+ words */}
          <div className="max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                What Are &quot;Vehicle Particulars&quot; in Nigeria?
              </h2>
              <p className="mb-3">&quot;Vehicle particulars&quot; is the umbrella term Nigerians use for the full set of documents a car needs to be legally on the road — it isn&apos;t one paper, it&apos;s a bundle that typically expires together. The core set is: the <strong className="text-foreground">vehicle license</strong> (the annual sticker proving your car is registered with your state), the <strong className="text-foreground">roadworthiness certificate</strong> (proof your car passed a safety inspection), your <strong className="text-foreground">proof of ownership</strong> (registration certificate, issued once and updated only on sale), and a valid <strong className="text-foreground">insurance certificate</strong> (mandatory third-party minimum). Commercial vehicles also need a hackney permit, and imported (&quot;tokunbo&quot;) vehicles need customs duty payment documents on top of the standard set.</p>
              <p>Of these, the vehicle license, roadworthiness certificate, and insurance are annual — they expire every year and need renewing together. Proof of ownership is different: it&apos;s issued once at registration and only needs updating if the car changes hands. This distinction matters because a lot of the confusion around &quot;how much does renewal cost&quot; comes from people budgeting for the full particulars bundle when they only actually need to renew the annual pieces.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                FRSC Vehicle License Renewal: How the Process Works
              </h2>
              <p className="mb-3">Vehicle license renewal in Nigeria is handled at the state level — Lagos through the Motor Vehicle Administration Agency (MVAA), FCT through the Directorate of Road Traffic Services (DRTS) — while the Federal Road Safety Corps (FRSC) maintains the National Vehicle Identification Scheme (NVIS) as the national oversight database. You can check your plate number and current document status for free on the NVIS portal at nvis.frsc.gov.ng before starting any renewal.</p>
              <p className="mb-3">There&apos;s no single national online system — each state runs its own portal and pricing, which is why renewal cost and process vary so much depending on where your car is registered. Lagos and FCT are the furthest along on digitization; most other states still require an in-person visit to the state MVAA, VIO, or Board of Internal Revenue office.</p>
              <p>The typical sequence is: confirm your plate details on NVIS, make sure your insurance is current (buy it first if not), clear any outstanding fines, complete a roadworthiness inspection at a VIO/VIS center, then submit documents and pay — online where available, or in person otherwise. Processing runs from same-day in fast states to about a week elsewhere.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How Much Is Vehicle License Renewal in Lagos and Abuja?
              </h2>
              <p className="mb-3">Lagos is the most consistently priced state because MVAA publishes an official fee schedule. A private saloon car (1.6–2.0L) typically pays ₦4,000–₦6,000 for the vehicle license itself, with an SUV or jeep slightly higher at ₦5,000–₦7,000, and commercial buses from ₦8,000. Add the roadworthiness certificate (₦4,000–₦8,000) and insurance (₦5,000–₦15,000, more for comprehensive) and a full Lagos renewal package usually lands between ₦15,000 and ₦30,000 for a private car.</p>
              <p className="mb-3">Abuja (FCT) rates via the DRTS portal are broadly similar — the vehicle license alone runs ₦5,000–₦12,000, with full packages including roadworthiness typically totaling ₦20,000–₦30,000. Both cities support paying online, which is worth doing since it avoids the queues that offline processing involves.</p>
              <p>Outside Lagos and FCT, published fee schedules are rarer, so figures come from user reports rather than official documents in many states — Rivers State (Port Harcourt) tends to run higher, commonly ₦20,000–₦40,000 for a full renewal via agents, while states like Ogun tend to run cheaper. Use the state picker above for the range specific to your state.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Road Worthiness Renewal: Cost and How It Works
              </h2>
              <p className="mb-3">The roadworthiness certificate is a separate document from your vehicle license, though the two are usually renewed at the same visit. It&apos;s issued after a physical inspection at a Vehicle Inspection Office (VIO) or Vehicle Inspection Service (VIS) center, where an inspector checks brakes, lights, tyres, and emissions. If your car fails, you&apos;ll need to fix the issue and return — brake work is the most common failure point, typically averaging around ₦20,000 to put right.</p>
              <p>In Lagos, roadworthiness renewal typically costs ₦4,000–₦8,000. Some states bundle this cost into a combined &quot;vehicle particulars&quot; fee rather than pricing it separately, which is part of why online searches for &quot;road worthiness renewal online&quot; often lead to state MVAA or VIO portals rather than a standalone roadworthiness-specific site — the roadworthiness step is folded into the same renewal flow as your vehicle license.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                New Registration vs. Renewal: Know Which One You Need
              </h2>
              <p className="mb-3">&quot;How much does it cost to register a car in Nigeria&quot; and &quot;how much is vehicle license renewal&quot; are two different questions with very different answers, and it&apos;s easy to conflate them. New registration is what happens once, when a car is first put on the road (or re-registered after import) — it includes the FRSC number plate (₦30,000 for a standard plate nationally), state registration add-ons, roadworthiness, and the first vehicle license. Depending on your state, total new registration commonly runs ₦40,000–₦90,000 or more.</p>
              <p>Renewal, by contrast, is the annual repeat cost once the car is already registered and plated — no new plate fee, just the vehicle license and roadworthiness (and insurance) renewing again. That&apos;s the far smaller number (₦15,000–₦30,000 range for most states) that this page and the calculator above are built around. If you&apos;re not sure which situation you&apos;re in, the simplest check is: do you already have a plate number on the car? If yes, you need renewal, not new registration.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Proof of Ownership and Change of Registration
              </h2>
              <p>Proof of ownership (your vehicle registration certificate) is not an annual renewal — it stays valid as long as you own the car and only needs updating when ownership changes (a sale, gift, or inheritance). &quot;Change of vehicle registration&quot; or change-of-ownership processing is a separate transaction from license renewal, usually costing ₦8,000–₦30,000 depending on state, on top of a fresh FRSC plate fee if the plate number itself is also changing. A growing number of states now offer this online, though most still require submitting the original documents in person to confirm the transfer is legitimate. If you&apos;ve just bought a used car, this is the step to do first — driving on the previous owner&apos;s particulars, even if technically still valid, causes problems if you&apos;re ever stopped or need to renew.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Penalties for Expired Vehicle Documents
              </h2>
              <p>FRSC enforcement has tightened considerably — expired documents now carry a real risk of fines and impoundment rather than just a warning. Typical fines run ₦5,000–₦15,000 per expired document (license, roadworthiness, or insurance counted separately), and impoundment adds a retrieval cost on top, commonly ₦20,000 or more. There&apos;s no uniform national grace period, so the safest approach is renewing at least 30 days before your documents expire rather than waiting — the calculator above will flag how many days you have left once you enter your expiry date.</p>
            </div>

          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Vehicle License Renewal FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How much is vehicle license renewal in Lagos?', a: 'Typically ₦4,000–₦6,000 for a saloon car, ₦5,000–₦7,000 for an SUV. Add roadworthiness (₦4,000–₦8,000) and insurance for a full package of ₦15,000–₦30,000.' },
                { q: 'How much is vehicle license renewal in Abuja?', a: 'FCT license renewal via the DRTS portal runs ₦5,000–₦12,000 for the license alone; full packages with roadworthiness typically total ₦20,000–₦30,000.' },
                { q: 'How much is road worthiness renewal in Lagos?', a: 'Roadworthiness certificate renewal in Lagos typically costs ₦4,000–₦8,000, done at a VIO/VIS inspection center alongside your license renewal.' },
                { q: 'How much does it cost to register a car in Nigeria?', a: 'New registration (not renewal) includes an FRSC plate (₦30,000), state add-ons, roadworthiness, and initial license — commonly ₦40,000–₦90,000+ total. Use the Registration Fee Calculator for your state\'s exact breakdown.' },
                { q: 'What is the list of car documents required in Nigeria?', a: 'Vehicle license, roadworthiness certificate, proof of ownership/registration certificate, valid insurance, and (for imports) customs duty documents. Commercial vehicles also need a hackney permit.' },
                { q: 'Can I renew my vehicle license online?', a: 'Yes in Lagos (lagosmvnla.ng) and FCT (selfservice.fctevreg.com). Most other states still require an in-person MVAA/VIO office visit.' },
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
            This guide is informational only and not affiliated with the FRSC or any state government agency. Fees and processes change periodically — always confirm current figures on your state&apos;s official portal before paying, and avoid unofficial agents or unverified payment links.
          </p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/vehicle-papers-checklist',    label: 'Vehicle Papers Checklist',     color: 'rose' },
                { href: '/tools/vin-checker',                 label: 'VIN Checker',                  color: 'violet' },
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
