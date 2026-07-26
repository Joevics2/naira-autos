import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import RegistrationFeeClient from './client';

export const metadata: Metadata = {
  title: 'Nigeria Vehicle Registration Fee Calculator 2025 — FRSC & State MVAA Fees',
  description: 'Calculate Nigerian car registration fees instantly. FRSC number plate cost ₦30,000, driver\'s licence ₦15,000–₦21,000, change of ownership, roadworthiness — all 36 states. Updated June 2025.',
  alternates: { canonical: 'https://www.naira.autos/tools/registration-fee-calculator' },
  openGraph: {
    title: 'Nigeria Vehicle Registration Fee Calculator 2025 | Naira Autos',
    description: 'Free Nigerian car registration cost calculator. FRSC 2025 rates + state MVAA fees for all 36 states and FCT.',
    url: 'https://www.naira.autos/tools/registration-fee-calculator',
  },
  keywords: ['car registration cost nigeria','car registration fee','vehicle registration fee','registration fee calculator','frsc plate fee','driver licence fee nigeria','change of ownership nigeria','roadworthiness certificate cost','car number plate price nigeria','vehicle registration cost','mvaa fees','car licence renewal cost','car registration nigeria 2025','how much is plate number registration in nigeria','plate number price in nigeria 2026','how much is lagos plate number','how much is abuja plate number','cost of plate number in nigeria','how much is number plate in nigeria','vehicle particulars renewal','road worthiness renewal price','frsc vehicle license renewal','how much to register a car in nigeria','motorcycle plate number price'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/registration-fee-calculator',
      name: 'Nigeria Vehicle Registration Fee Calculator — FRSC & State MVAA Fees 2025',
      description: 'Calculate Nigerian vehicle registration fees. FRSC 2025 rates + state MVAA add-ons for all 36 states.',
      url: 'https://www.naira.autos/tools/registration-fee-calculator',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Registration Fee Calculator', item: 'https://www.naira.autos/tools/registration-fee-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does a vehicle number plate cost in Nigeria 2025?', acceptedAnswer: { '@type': 'Answer', text: 'A standard private or commercial vehicle number plate costs ₦30,000 nationwide as the FRSC fee effective June 2025. Fancy plates cost ₦400,000. Articulated vehicles pay ₦90,000. These rates apply uniformly across all 36 states and the FCT with no FRSC surcharges.' } },
        { '@type': 'Question', name: 'How much is driver\'s licence in Nigeria 2025?', acceptedAnswer: { '@type': 'Answer', text: 'A motor vehicle driver\'s licence costs ₦15,000 for 3-year validity or ₦21,000 for 5-year validity under the FRSC/JTB rates effective June 2025. Tricycle and motorcycle licences cost ₦7,000 (3 years) or ₦11,000 (5 years). Payment is via nigeriadriverslicence.frsc.gov.ng.' } },
        { '@type': 'Question', name: 'How much is change of ownership in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Change of vehicle ownership costs between ₦38,000 and ₦130,000 depending on state. In Lagos, the official MVAA subtotal is approximately ₦38,675 including a new plate at ₦30,000 plus state change fees, CGT, and admin. Other states range from ₦50,000 to ₦130,000.' } },
        { '@type': 'Question', name: 'Do vehicle registration fees differ by state in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'FRSC core fees for number plates and driver\'s licences are identical in all 36 states and FCT — no state-specific FRSC surcharges exist. However, state MVAA or BIR add-ons including vehicle licence renewal, roadworthiness certificates, change of ownership processing, stamp duty, and admin fees vary significantly by state.' } },
        { '@type': 'Question', name: 'How much is a car licence renewal in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Vehicle licence (road licence) renewal is a state fee varying by engine capacity. Typical costs range from ₦2,000–₦15,000 for the licence itself depending on the state, plus a separate roadworthiness certificate of ₦5,000–₦12,000. Total annual renewal with insurance is typically ₦30,000–₦70,000.' } },
        { '@type': 'Question', name: 'How much is full vehicle registration in Lagos 2025?', acceptedAnswer: { '@type': 'Answer', text: 'Full new vehicle registration in Lagos includes the FRSC standard plate at ₦30,000, Lagos MVAA state add-ons of ₦5,000–₦15,000, roadworthiness ₦5,000–₦12,000, initial vehicle licence, CMR clearance, and optional insurance. The total typically ranges from ₦75,000 to ₦140,000 for a standard saloon.' } },
        { '@type': 'Question', name: 'What is the car registration cost calculator in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'The Naira Autos vehicle registration fee calculator covers all 36 Nigerian states and FCT. Select your transaction (new registration, change of ownership, licence renewal, roadworthiness, or driver\'s licence), your state, and vehicle type to get an itemised cost breakdown based on official FRSC rates and state MVAA data.' } },
        { '@type': 'Question', name: 'How much is a number plate in Lagos or Abuja?', acceptedAnswer: { '@type': 'Answer', text: 'The FRSC number plate fee is a flat ₦30,000 nationwide, so Lagos and Abuja pay the same national rate — there is no separate Lagos-only or Abuja-only plate price. What differs between states is the MVAA processing add-on, which tends to run higher in Lagos and Abuja than in less urbanised states.' } },
        { '@type': 'Question', name: 'How much is a motorcycle plate number in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A standard motorcycle number plate costs ₦12,000 under the FRSC 2025 rate, nationwide. This is separate from the tricycle or motorcycle rider licence, which costs ₦7,000 for 3-year validity or ₦11,000 for 5-year validity.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Nigeria Vehicle Registration Fee Calculator',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function RegistrationFeeCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Registration Fee Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">Updated June 2025</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">All 36 States + FCT</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Vehicle Registration<br /><span className="text-blue-400">Fee Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Know exactly what you'll pay before you step into the office.</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your state, vehicle type, and transaction — get an itemised cost breakdown of FRSC national fees plus state MVAA add-ons. Based on official JTB/FRSC rates effective June 2025.</p>
          </div>
        </div>
      </div>

      <RegistrationFeeClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* FRSC Plate Fees Table */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              FRSC Number Plate Fees — June 2025
            </h2>
            <p className="text-sm text-muted-foreground mb-4">These fees apply identically in every state and the FCT. Payment via <strong className="text-foreground">nvis.frsc.gov.ng</strong>. No FRSC surcharges exist at state level — any extras are state MVAA or BIR charges.</p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Plate Type</th>
                    <th className="text-right px-4 py-3 font-bold text-blue-600 dark:text-blue-400">FRSC Fee (Nationwide)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Standard (Private or Commercial)', '₦30,000'],
                    ['Motorcycle (Standard)', '₦12,000'],
                    ['Articulated Vehicles', '₦90,000'],
                    ['Government Standard Vehicle', '₦80,000'],
                    ['Government Fancy Vehicle', '₦120,000'],
                    ['Dealer Plates', '₦100,000'],
                    ['Out-of-Series / Out-of-Season', '₦150,000'],
                    ['Fancy (Private Vehicle)', '₦400,000'],
                  ].map(([type, fee]) => (
                    <tr key={type} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 text-foreground">{type}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-blue-600 dark:text-blue-400">{fee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Driver Licence Table */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-2" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              FRSC Driver's Licence Fees — June 2025
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Driver's licence fees are fixed nationwide by the Joint Tax Board. Payment via <strong className="text-foreground">nigeriadriverslicence.frsc.gov.ng</strong>. Minor bank charges of ₦350–₦550 may apply.</p>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="text-left px-4 py-3 font-bold text-foreground">Licence Type</th>
                    <th className="text-right px-4 py-3 font-bold text-blue-600 dark:text-blue-400">3-Year</th>
                    <th className="text-right px-4 py-3 font-bold text-emerald-600 dark:text-emerald-400">5-Year</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Motor Vehicle (Car, SUV, Bus)', '₦15,000', '₦21,000'],
                    ['Tricycle / Motorcycle', '₦7,000', '₦11,000'],
                  ].map(([type, y3, y5]) => (
                    <tr key={type} className="hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-2.5 text-foreground">{type}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-blue-600 dark:text-blue-400">{y3}</td>
                      <td className="px-4 py-2.5 text-right font-bold text-emerald-600 dark:text-emerald-400">{y5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Full SEO editorial */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                How Nigerian Car Registration Fees Work in 2025
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Vehicle registration fees in Nigeria are split across two layers of government. The <strong className="text-foreground">Federal Road Safety Corps (FRSC)</strong>, working with the Joint Tax Board (JTB), sets uniform national fees for number plates and driver's licences. These rates took effect on 8 June 2025 and apply without variation in all 36 states and the FCT. A standard vehicle number plate costs <strong className="text-foreground">₦30,000</strong> whether you register in Lagos Island or Maiduguri.</p>
                  <p>The second layer is <strong className="text-foreground">state-level fees</strong> administered by each state's Motor Vehicle Administration Agency (MVAA) or Board of Internal Revenue (BIR). These cover vehicle licence renewal, roadworthiness certificates, change of ownership processing, stamp duty, capital gains tax, and miscellaneous admin. These fees are not nationally standardised and vary significantly — Lagos MVAA publishes the most detailed schedule, while most other states calculate fees at the counter based on engine capacity and vehicle category.</p>
                  <p>The practical implication: when someone says "car registration cost Nigeria," they're usually asking about the total bill — FRSC plate plus all state add-ons. That total typically ranges from <strong className="text-foreground">₦35,000 to ₦140,000+</strong> for a standard saloon, depending on the state and transaction type.</p>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Payment channels matter.</strong> FRSC plate fees are paid via the NVIS portal (nvis.frsc.gov.ng) or at designated bank branches. Driver's licence payments go through nigeriadriverslicence.frsc.gov.ng. State fees are paid through each state's MVAA office, BIR portal, or the national autoreg.ng renewal platform which works in most states. Processing through agents is common but adds ₦10,000–₦30,000 in unofficial fees.</p>
                  <p><strong className="text-foreground">Vehicle licence renewal</strong> is an annual obligation in Nigeria and is engine-capacity-based. A small saloon (under 1.4L) pays less than a large SUV or commercial vehicle. The vehicle licence (often called "road licence") must be accompanied by a valid roadworthiness certificate, which requires a physical inspection at a Vehicle Inspection Office (VIO). Driving without either is a FRSC-enforceable offence with penalties up to ₦10,000 and vehicle impoundment.</p>
                  <p>The June 2025 FRSC fee revision was the most significant increase in years — standard plates rose from earlier figures, and the public disposal price (what you pay at the MVAA) is higher than the internal production cost charged to FRSC. No further nationwide hikes have been announced as of early 2026.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Change of Ownership — What You Actually Pay
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>Change of vehicle ownership (COO) is the process of transferring a car from the seller's name to the buyer's name at the state MVAA. It is required after every private car sale and is one of the most confusing and fee-variable transactions in Nigerian vehicle administration.</p>
                  <p>The FRSC component is a new standard number plate at <strong className="text-foreground">₦30,000</strong>. On top of this, the state MVAA charges a change of ownership processing fee, capital gains tax (CGT) of typically ₦625–₦2,000, an ownership certificate processing fee, and stamp duty. In Lagos, the full state add-on subtotal is approximately <strong className="text-foreground">₦8,675</strong> on top of the ₦30,000 plate fee, giving a MVAA total of roughly ₦38,675. A roadworthiness certificate is usually also required (₦5,000–₦12,000). Third-party insurance and an agent fee can push the total to ₦60,000–₦80,000+ in Lagos.</p>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>In states outside Lagos, COO costs are estimated at <strong className="text-foreground">₦50,000–₦130,000</strong> depending on whether a new plate is required, local MVAA processing rates, and whether the buyer uses an agent. Rivers State is consistently reported as among the most expensive, with full re-registration costs sometimes exceeding ₦100,000.</p>
                  <p>Both the buyer and seller typically need to be present (or provide notarised documents) at the MVAA. Required documents include the original registration certificate, proof of ownership/customs paper, CMR clearance, both parties' valid IDs, and a signed sales agreement. Some MVAA offices require the sales agreement to be notarised. See our <Link href="/tools/vehicle-papers-checklist" className="text-blue-500 hover:underline">Vehicle Papers Checklist</Link> for the full document list.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Car Registration Fees by State — What's Known
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                <p>No comprehensive national database of state-specific vehicle registration fees exists in Nigeria. FRSC sets uniform plate and licence fees, but each state's MVAA or BIR determines its own add-ons. The only state with a fully published, current fee schedule is <strong className="text-foreground">Lagos</strong> (via lagosmepb.org, June 2025 PDF). FCT has a portal (selfservice.fctevreg.com) and Ogun has OGIRS (portal.ogetax.ogunstate.gov.ng). All other states calculate fees at the counter or via state portals without publishing detailed schedules publicly.</p>
                <p>Based on research across official state portals, Nairaland threads, and user reports through 2025–2026, the typical structure nationwide is: <strong className="text-foreground">FRSC plate ₦30,000 + state MVAA add-ons ₦20,000–₦70,000 + roadworthiness ₦5,000–₦12,000 + CMR ₦5,000–₦12,000 + optional insurance ₦15,000+</strong>. Full new registration therefore typically totals ₦115,000–₦140,000 for a standard saloon using an agent, or ₦75,000–₦100,000 doing it directly.</p>
                <p>Vehicle licence renewal (annual "renewal of papers") is lower — typically ₦30,000–₦70,000 total including vehicle licence, roadworthiness, and insurance. States like Rivers are at the higher end; states like Ogun and Osun tend to be cheaper for standard saloons.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Car Registration Cost Calculator — How to Use This Tool
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>This calculator covers five transaction types: <strong className="text-foreground">New Registration</strong> (first-time plate), <strong className="text-foreground">Change of Ownership</strong> (buying/selling a used car), <strong className="text-foreground">Licence Renewal</strong> (annual papers renewal), <strong className="text-foreground">Roadworthiness</strong> (certificate only), and <strong className="text-foreground">Driver's Licence</strong> (FRSC national fee).</p>
                  <p>For each state, we show whether the data is based on an official fee schedule (Lagos, Ogun), portal data and user reports (FCT, Rivers, Enugu, Oyo), or national average estimates (most other states). The confidence indicator is displayed below the state selector.</p>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>The FRSC fees (number plates and driver's licences) in this calculator are marked as OFFICIAL — they are confirmed from the JTB/FRSC June 2025 announcement. State add-on figures are midpoint estimates from their published ranges, marked EST. — they are guides, not guarantees. Always verify at your state MVAA office or official portal before attending.</p>
                  <p>Use the optional insurance and agent fee toggles if you want a realistic total-cost estimate rather than just the government fee. Agent fees are unofficial but common — typically ₦10,000–₦30,000 — and can save significant time navigating the queue at MVAA or VIO offices.</p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ accordion */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Registration Fee FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How much does a vehicle number plate cost in Nigeria 2025?', a: 'A standard private or commercial vehicle number plate costs ₦30,000 nationwide as the FRSC fee, effective June 2025. Fancy plates cost ₦400,000. Articulated vehicles pay ₦90,000. Motorcycle plates are ₦12,000. These rates are uniform across all 36 states — no state-specific FRSC surcharges exist.' },
                { q: "How much is driver's licence in Nigeria 2025?", a: "A motor vehicle driver's licence costs ₦15,000 for 3-year validity or ₦21,000 for 5-year validity under FRSC/JTB rates effective June 2025. Motorcycle and tricycle licences cost ₦7,000 (3 years) or ₦11,000 (5 years). Pay via nigeriadriverslicence.frsc.gov.ng." },
                { q: 'How much does car registration cost in Lagos 2025?', a: 'Full new registration in Lagos typically costs ₦75,000–₦140,000 for a standard saloon. This includes the ₦30,000 FRSC plate, Lagos MVAA state add-ons, roadworthiness certificate, initial vehicle licence, CMR, and optionally insurance and agent fees. Lagos is the only state with a fully published MVAA price list.' },
                { q: 'Do car registration fees differ by state in Nigeria?', a: "FRSC core fees (plates and driver's licences) are identical in all 36 states. State MVAA/BIR add-ons — vehicle licence renewal, roadworthiness, change of ownership processing, stamp duty, admin — vary by state and are not published in a single national list. Use this calculator for per-state estimates." },
                { q: 'How much is a car licence renewal in Nigeria?', a: 'Vehicle licence renewal (road licence) is a state fee based on engine capacity — typically ₦2,000–₦15,000 for the licence plus ₦5,000–₦12,000 roadworthiness. Total annual renewal with insurance ranges from ₦30,000 to ₦70,000 depending on state and vehicle type.' },
                { q: 'How much is change of ownership in Nigeria?', a: 'Change of ownership typically costs ₦38,000–₦130,000 depending on state. Lagos MVAA official subtotal is approximately ₦38,675 (₦30,000 plate + state add-ons). Other states estimate ₦50,000–₦130,000. Rivers State tends to be among the most expensive.' },
                { q: 'How much is a number plate in Lagos or Abuja?', a: 'The FRSC plate fee is a flat ₦30,000 nationwide — Lagos and Abuja pay the same national rate as every other state. The part that varies by state is the MVAA processing add-on, which runs higher in Lagos and Abuja than in less urbanised states.' },
                { q: 'How much is a motorcycle plate number?', a: 'A standard motorcycle plate is ₦12,000 under the FRSC 2025 rate, nationwide. That is separate from the rider\u2019s licence, which is ₦7,000 for 3 years or ₦11,000 for 5 years.' },
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

          <p className="text-xs text-muted-foreground">
            FRSC fees source: Joint Tax Board (JTB) + Federal Road Safety Corps announcement, effective 8 June 2025. State add-on estimates are based on Lagos MVAA official schedule (lagosmepb.org) and user-reported figures from other states. Verify exact totals at <strong className="text-foreground">nvis.frsc.gov.ng</strong>, <strong className="text-foreground">nigeriadriverslicence.frsc.gov.ng</strong>, or your state MVAA/BIR office before attending. Fees may change with state budgets.
          </p>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/plate-number-checker', label: 'Plate Number Checker', color: 'sky' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'emerald' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
                { href: '/tools/insurance-calculator', label: 'Insurance Calculator', color: 'blue' },
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