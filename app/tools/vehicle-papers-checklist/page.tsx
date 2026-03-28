import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VehiclePapersClient from './client';

export const metadata: Metadata = {
  title: 'Nigeria Vehicle Papers Checklist 2025 — Documents to Buy, Sell or Import a Car',
  description: 'Complete checklist of car documents required to buy, sell, or import a vehicle in Nigeria. FRSC and NCS requirements. Bill of sale template, proof of ownership, registration — all explained.',
  alternates: { canonical: 'https://www.naira.autos/tools/vehicle-papers-checklist' },
  openGraph: {
    title: 'Nigeria Vehicle Papers Checklist 2025 | Naira Autos',
    description: 'Documents needed to buy, sell, or import a car in Nigeria. FRSC + NCS requirements, bill of sale template, change of ownership guide. Free interactive checklist.',
    url: 'https://www.naira.autos/tools/vehicle-papers-checklist',
  },
  keywords: ['car papers nigeria','car documents nigeria','car registration nigeria','vehicle papers checklist','bill of sale for car nigeria','vehicle bill of sale','car bill of sale','change of ownership nigeria','proof of ownership car nigeria','vehicle registration certificate','car documents needed','tokunbo car papers','import car nigeria documents','frsc documents','customs paper car nigeria','car sale contract template nigeria','private car sale contract','vehicle inspection form'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/vehicle-papers-checklist',
      name: 'Nigeria Vehicle Papers Checklist — Documents to Buy, Sell or Import a Car 2025',
      description: 'Complete checklist of documents required to buy, sell, or import a car in Nigeria. FRSC and NCS requirements.',
      url: 'https://www.naira.autos/tools/vehicle-papers-checklist',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Vehicle Papers Checklist', item: 'https://www.naira.autos/tools/vehicle-papers-checklist' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What documents do I need to buy a car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'To buy a car in Nigeria you need: the seller\'s vehicle registration certificate, proof of ownership (Customs paper for Tokunbo cars), valid number plates, roadworthiness certificate, insurance certificate, the seller\'s valid government ID, and a signed purchase agreement or bill of sale. For used cars also request a CMR (Central Motor Registry) clearance.' } },
        { '@type': 'Question', name: 'What is a car bill of sale in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A car bill of sale (purchase agreement) in Nigeria is a signed document recording the agreed sale price, vehicle details (make, model, year, engine number, chassis number, plate number), the full names and ID details of both buyer and seller, and the date of transaction. It serves as legal proof of the sale and protects both parties. Some state MVAA offices require it to be notarised for change of ownership processing.' } },
        { '@type': 'Question', name: 'What is proof of ownership for a car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Proof of ownership (also called a Customs paper or vehicle clearance certificate) is issued by Nigeria Customs Service after a Tokunbo car is legally cleared at port. For locally assembled vehicles it comes from the manufacturer. This document confirms the car was imported legally with all duties paid. Without it, change of ownership cannot be processed at the state MVAA.' } },
        { '@type': 'Question', name: 'What documents are needed to import a Tokunbo car to Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'To import a Tokunbo car to Nigeria you need: Form M (CBN pre-import approval, obtained before shipment), original Bill of Lading, CCVO (Combined Certificate of Value and Origin), Packing List, Nigerian marine/cargo insurance certificate, Combined Exit Document (CED), Nigeria Customs SAD form (via licensed agent), and duty assessment/payment receipt. The final clearance certificate becomes your proof of ownership.' } },
        { '@type': 'Question', name: 'What is Form M for car importation in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Form M is a pre-import approval document from the Central Bank of Nigeria (CBN), obtained through a commercial bank before the car is shipped. It authorises the foreign exchange for the purchase. Without Form M, Nigeria Customs will not release the imported vehicle regardless of other documents presented.' } },
        { '@type': 'Question', name: 'How do I write a car sale contract in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'A private car sale contract in Nigeria should include: full names and addresses of both buyer and seller with ID numbers, complete vehicle description (make, model, year, colour, engine number, chassis number, plate number), agreed sale price in naira, payment method, date of sale, a statement that the vehicle is sold free of encumbrances, and signatures of both parties with a witness. The seller should keep a signed copy.' } },
      ],
    },
  ],
};

export default function VehiclePapersChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-violet-500/20 border border-white/15 hover:border-violet-500/40 text-white/60 hover:text-violet-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Vehicle Papers Checklist</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-violet-500 px-3 py-1 rounded-full">FRSC + NCS</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Updated 2025</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Vehicle Papers<br /><span className="text-violet-400">Checklist</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Don't get caught without the right documents.</p>
            <p className="text-white/75 text-sm leading-relaxed">Select your transaction — buying, selling, or importing — and get the exact list of car documents required by FRSC and Nigeria Customs Service. Tick them off as you go, then print or save as PDF.</p>
          </div>
        </div>
      </div>

      <VehiclePapersClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* Key documents explained */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Key Car Documents in Nigeria — Explained
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <p className="font-bold text-foreground mb-1">Proof of Ownership (Customs Paper)</p>
                  <p>The most critical document for Tokunbo cars. Issued by Nigeria Customs Service after the vehicle is successfully cleared at Apapa or Tin Can Island port. Without it, the car cannot be legally transferred to a new owner at the state MVAA. The Customs paper confirms the vehicle was imported with all duties paid — its absence often signals an illegally cleared or stolen car. Always request the original, not a photocopy.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Vehicle Registration Certificate</p>
                  <p>Issued by FRSC or the state MVAA after a vehicle is officially registered. Shows the plate number, registered owner name, engine number, chassis number (VIN), and vehicle colour. The registration certificate and physical number plates are what give you the legal right to drive the vehicle on Nigerian roads. This document changes hands during change of ownership.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Roadworthiness Certificate (Vehicle Licence)</p>
                  <p>The roadworthiness certificate is issued annually by the state VIO (Vehicle Inspection Office) or MVAA after a physical inspection of the vehicle's condition. It is a legal requirement and driving without it is a FRSC-enforceable offence. Inspectors check brakes, lights, tyres, wipers, and emission standards. The cost varies by state — see our <Link href="/tools/registration-fee-calculator" className="text-violet-500 hover:underline">Registration Fee Calculator</Link>.</p>
                </div>
              </div>
              <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
                <div>
                  <p className="font-bold text-foreground mb-1">Car Bill of Sale / Purchase Agreement</p>
                  <p>A bill of sale for a car (also called a purchase agreement or vehicle sales contract) is a written record of the sale transaction. It should include the full names, addresses, and ID numbers of both buyer and seller; a complete vehicle description (make, model, year, engine number, chassis number, plate number); the agreed sale price in naira; payment terms; the date; and signatures of both parties ideally with a witness. Some Nigerian states require the purchase agreement to be notarised for change of ownership processing. Keep a signed copy even after the sale — it proves you no longer own the vehicle if any subsequent incident occurs.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">CMR (Central Motor Registry)</p>
                  <p>The CMR is a federal database maintained by FRSC that records vehicle ownership and flags stolen or encumbered vehicles. A CMR check is increasingly required at MVAA offices for change of ownership and new registration. It can be requested at any FRSC service centre or verified via the FRSC portal. For buyers, it is one of the most important pre-purchase verifications — it confirms the seller actually has legal title to the vehicle.</p>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Form M (Import Pre-Approval)</p>
                  <p>Form M is a CBN document obtained through a licensed commercial bank before any goods — including vehicles — are imported into Nigeria. It pre-authorises the foreign exchange transaction and must be in place before the car is shipped. A car arriving at Nigerian ports without a valid Form M will be detained by Customs regardless of what other documents exist.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buying guide */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Car Documents Guide — Buying a Used Car in Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>Whether you're buying a Tokunbo or a locally used car in Nigeria, the document verification process is the same in principle — but the stakes are different. For a Tokunbo, the Customs paper (proof of ownership) is the primary chain of legal title. For a locally-used car that has changed hands multiple times, the full paper chain becomes important: the original Customs paper from first importation, plus all subsequent purchase agreements showing the ownership chain.</p>
                <p>A common scam in the Nigerian used car market involves "clean papers, bad car" — vehicles with seemingly legitimate documentation but tampered engine or chassis numbers. Always physically compare the engine number and chassis number on the registration certificate against the numbers stamped on the actual engine block and chassis. On most cars, the chassis VIN is visible through the windscreen on the dashboard, and the engine number is stamped on the engine block. Discrepancy between documents and physical markings is a serious red flag.</p>
                <p>Another common issue is <strong className="text-foreground">incomplete paper chains</strong> — a car that has been sold three times with each seller keeping the original documents and only providing the buyer with photocopies. Photocopies have no legal validity for change of ownership. The buyer must receive original documents.</p>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>For Tokunbo buyers specifically, an additional layer of verification is the <strong className="text-foreground">NHTSA VIN check</strong> (free, at vpic.nhtsa.dot.gov). This tells you the vehicle's original manufacture specifications — make, model, year, trim, country of assembly — and can reveal if the car has been significantly modified from its original configuration or if the VIN has been cloned from a different vehicle. Our free <Link href="/tools/vin-decoder" className="text-violet-500 hover:underline">VIN Decoder</Link> runs this check instantly.</p>
                <p>The <strong className="text-foreground">pre-purchase mechanic inspection</strong> is the most consistently skipped step in Nigerian car buying, and the most consistently regretted. An independent inspection (not from the seller's recommended mechanic) at a reputable workshop costs ₦5,000–₦20,000 and can identify engine faults, flood damage, accident repair, suspension issues, and brake wear that would cost hundreds of thousands to repair. For any car over ₦3 million, this is non-negotiable.</p>
                <p>After purchase, change of ownership must be processed at the state MVAA to register the car in the buyer's name. Without this, the vehicle legally remains in the seller's name — meaning the seller is still liable for any traffic offences the car incurs and can theoretically dispute ownership. Change of ownership should be done within 30 days of purchase.</p>
              </div>
            </div>
          </div>

          {/* Import guide */}
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Importing a Tokunbo Car — Document Sequence and Common Mistakes
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed max-w-3xl">
              <p>The most critical mistake Nigerian car importers make is getting the document sequence wrong. Form M must be obtained <strong className="text-foreground">before the car is shipped</strong> — not after. This is not a procedural formality. Without Form M, Nigeria Customs will seize the vehicle at the port and the importer will face complex legal proceedings to retrieve it. The bank that issues Form M will require proof of the purchase transaction (invoice, proforma) and may require collateral depending on the transaction value.</p>
              <p>Once the car arrives at Apapa or Tin Can Island, the clearing process involves submitting the Nigeria Customs SAD (Single Administration Document) via the NICIS II electronic system, physical inspection of the vehicle by Customs officers, payment of the assessed import duty (35% of CIF value plus ECOWAS levy and other charges), and final issuance of a Customs clearance certificate. This clearance certificate is your <strong className="text-foreground">proof of ownership</strong> — the most important document you will receive.</p>
              <p>Engaging a licensed Customs clearing agent is strongly recommended. The clearing process involves multiple agencies, portals, and physical offices. Licensed agents typically charge ₦50,000–₦150,000 for the full clearing process, which is small relative to the duty payments and the cost of errors. Verify that your agent is licensed by Nigeria Customs before engaging them — unlicensed agents have no protection or accountability if issues arise.</p>
              <p>Use our <Link href="/tools/import-duty-calculator" className="text-violet-500 hover:underline">Import Duty Calculator</Link> to estimate the total duty and levies payable before you commit to a purchase price overseas.</p>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Vehicle Papers FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'What documents do I need to buy a car in Nigeria?', a: "You need: the seller's vehicle registration certificate, proof of ownership (Customs paper for Tokunbo), valid number plates, roadworthiness certificate, insurance certificate, the seller's valid government ID, and a signed purchase agreement. Also request a CMR check to confirm the car isn't stolen." },
                { q: 'What is a car bill of sale in Nigeria?', a: 'A car bill of sale is a signed document recording the agreed price, full vehicle details (engine number, chassis number, plate number), both parties\' names and IDs, and the date. Keep a copy as proof the car was legally transferred. Some MVAA offices require it notarised for change of ownership.' },
                { q: 'What is proof of ownership for a car in Nigeria?', a: 'Proof of ownership (Customs paper) is issued by Nigeria Customs Service after a Tokunbo car is legally cleared. For locally-assembled cars it comes from the manufacturer. Without it, change of ownership cannot be processed at the state MVAA.' },
                { q: 'What documents are needed to import a Tokunbo car?', a: 'You need: Form M (CBN pre-import approval, before shipment), original Bill of Lading, CCVO, Packing List, Nigerian cargo insurance, CED, Customs SAD form (via licensed agent), duty payment receipt. The clearance certificate issued after becomes your proof of ownership.' },
                { q: 'How do I write a private car sale contract in Nigeria?', a: 'Include: full names and ID numbers of buyer and seller, complete vehicle description (make, model, year, plate, engine number, chassis number), agreed price, payment method, date, and both signatures with a witness. The seller should keep a signed copy.' },
                { q: 'Can I drive a car in Nigeria without a roadworthiness certificate?', a: 'No. Driving without a valid roadworthiness certificate is a FRSC-enforceable offence. The vehicle can be impounded and the driver fined. The certificate must be renewed annually at your state VIO or MVAA.' },
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
        </div>
      </div>
    </>
  );
}