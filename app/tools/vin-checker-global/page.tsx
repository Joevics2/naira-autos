import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClient from './client';

export const metadata: Metadata = {
  title: 'Free VIN Decoder & VIN Checker — Vehicle Identification Number Lookup',
  description: 'Free VIN decoder and VIN checker for any car, anywhere in the world. Decode any vehicle VIN or chassis number — make, model, year, engine specs, assembly origin. Essential free VIN check for used car buyers in the US, UK, UAE, and beyond.',
  keywords: ['vin number lookup free','vin check','vin checker','vin check free','vin decoder check','is vin same as chassis number','free vin decoder','north american vin decoder','ford vin decoder saudi','chevrolet vin decoder saudi','jeep vin decoder saudi','ford vin decoder dubai','ford vin decoder abu dhabi','free vin check online','vin verification'],
  alternates: {
    canonical: 'https://www.naira.autos/tools/vin-checker-global',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/tools/decodificador-de-vin',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Free VIN Decoder & Chassis Number Checker | Naira Autos',
    description: 'Free VIN check for any used car, anywhere. Get make, model, year, engine and origin instantly.',
    url: 'https://www.naira.autos/tools/vin-checker-global',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/vin-checker-global',
      name: 'Free VIN Decoder & VIN Checker — Vehicle Identification Number Lookup',
      description: 'Free VIN decoder and VIN checker for any car. Decode any VIN or chassis number — make, model, year, engine specs, and assembly origin.',
      url: 'https://www.naira.autos/tools/vin-checker-global',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'VIN Checker', item: 'https://www.naira.autos/tools/vin-checker-global' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a VIN number on a car?', acceptedAnswer: { '@type': 'Answer', text: 'A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle at manufacture. It encodes country of origin, manufacturer, vehicle type, engine, model year, assembly plant, and a unique serial. In the UAE and most Commonwealth markets it is commonly called the chassis number.' } },
        { '@type': 'Question', name: 'How do I do a free VIN check online?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the 17-character VIN above and click Decode VIN. Our free VIN check uses the NHTSA database to return make, model, year, engine specs, drive type, and assembly origin — completely free, no login required, from anywhere in the world.' } },
        { '@type': 'Question', name: 'Where is the VIN number on a car?', acceptedAnswer: { '@type': 'Answer', text: 'The VIN appears in three locations: dashboard plate visible through windshield, driver\'s door jamb sticker, and chassis rail stamp under the bonnet. All three must match.' } },
        { '@type': 'Question', name: 'Is this VIN decoder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. 100% free. We use the publicly accessible NHTSA API. No account, login, or payment required. Works for US, Canadian, and Mexican vehicles — the majority of used vehicles re-exported to the UAE, Gulf, and Africa.' } },
        { '@type': 'Question', name: 'What is the difference between a VIN and a chassis number?', acceptedAnswer: { '@type': 'Answer', text: 'They are the same 17-character identifier. Internationally it is called VIN. In the UAE, Saudi Arabia, and other Commonwealth or Gulf markets the same code is often called the chassis number.' } },
        { '@type': 'Question', name: 'Can I do a chassis number check for a car in the UAE or Dubai?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if the vehicle was originally sold in North America, since the 17-digit chassis number stamped on Gulf-spec and US-spec re-exported cars follows the same VIN standard. Many used cars sold in Dubai, Abu Dhabi, and across the UAE started life as American imports, so this free chassis number check works for a large share of the used car market there.' } },
        { '@type': 'Question', name: 'Does the VIN checker work for cars in Saudi Arabia and Qatar?', acceptedAnswer: { '@type': 'Answer', text: 'It works for any vehicle manufactured for the US, Canadian, or Mexican market, which includes many of the American-brand SUVs and pickups commonly sold and re-exported across Saudi Arabia, Qatar, and the wider Gulf region. GCC-spec vehicles built exclusively for the Middle East may not appear in the NHTSA database.' } },
        { '@type': 'Question', name: 'What does the VIN tell you about a car?', acceptedAnswer: { '@type': 'Answer', text: 'Make, model, trim, year, engine type, displacement, horsepower, body style, drive type, transmission, country and city of assembly, and safety features. It does not reveal ownership history — that requires a paid Carfax or AutoCheck report.' } },
        { '@type': 'Question', name: 'Can I get a free car history report from this VIN checker?', acceptedAnswer: { '@type': 'Answer', text: 'This tool provides free spec data from NHTSA. Full vehicle history — accidents, title status, ownership — requires a paid Carfax or AutoCheck report using the same VIN, available to buyers in the US, Canada, and increasingly for export vehicles bound for Africa and the Middle East.' } },
        { '@type': 'Question', name: 'Is a VIN check available in the UK?', acceptedAnswer: { '@type': 'Answer', text: 'For a UK-registered vehicle, an HPI check or a DVLA vehicle enquiry is the standard route, since UK cars are recorded under a different national system. Our free VIN decoder is most useful in the UK for imported or grey-market vehicles that originated in North America.' } },
        { '@type': 'Question', name: 'What if the VIN decoder shows no results?', acceptedAnswer: { '@type': 'Answer', text: 'Usually means a European, UK, GCC-spec, or Asian-market vehicle — outside the NHTSA database. We decode the model year from VIN position 10 regardless. For those vehicles, contact the manufacturer\'s official VIN service or a local chassis-number lookup in your country.' } },
        { '@type': 'Question', name: 'Does this VIN decoder work for Ford, Toyota, Honda, Chevy, and GMC?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. It draws from the shared NHTSA manufacturer database, so a Ford VIN lookup, Toyota VIN decoder check, Honda VIN lookup, GMC VIN lookup, and Chevy VIN number lookup all work the same way, worldwide, for any US-market brand.' } },
        { '@type': 'Question', name: 'Can I get a window sticker or recall information from a VIN?', acceptedAnswer: { '@type': 'Answer', text: 'The decoder can reconstruct most original window sticker details — trim, options, drivetrain — for many US-market vehicles. Open recall checks run through a separate NHTSA recall lookup tied to the same VIN.' } },
        { '@type': 'Question', name: 'Can I check if a VIN is stolen or find a towed vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'Not with this decoder. A stolen vehicle search is a law-enforcement and insurance-industry lookup — the National Insurance Crime Bureau\'s free VINCheck tool is the correct resource for that, separate from a specification decoder.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Free VIN Decoder & VIN Checker', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VINCheckerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
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
              <span className="text-white/50">VIN Checker</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Powered by NHTSA</span>
              <Link href="/tools/decodificador-de-vin" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Leer en Español →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Free VIN Decoder<br /><span className="text-blue-400">&amp; Chassis Number Checker</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Free VIN check for any used car, anywhere in the world.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the 17-character VIN (chassis number) from the dashboard, door jamb, or engine bay. Get a free VIN number lookup — make, model, year, engine specs, and assembly origin. No login required, whether you're buying in Dubai, Riyadh, London, or Los Angeles.</p>
          </div>
        </div>
      </div>

      <VINCheckerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Free VIN Check for Any Used Car, Anywhere</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Our <strong className="text-foreground">free VIN decoder</strong> uses the NHTSA public database. A <strong className="text-foreground">free VIN number lookup</strong> returns make, model, year, engine specs, drive type, body class, and assembly plant — everything you need to verify what a used car actually is before buying, wherever in the world you happen to be shopping.</p>
                  <p>The used car market has gone global. American and Canadian-market vehicles get exported and re-registered on every continent — as grey-market SUVs in the UAE and Saudi Arabia, and re-badged trade-ins across Europe, Africa, and beyond. Because the VIN is stamped at the factory and never changes, a single free VIN check works the same way no matter which country the car ends up in, as long as it was originally built for the North American market.</p>
                  <p>That last point matters more than most buyers realize. A VIN isn't a registration number issued by your local transport authority — it's a manufacturing fingerprint applied on the assembly line, long before the car ever left the factory gate. It doesn't change when the vehicle is exported, re-registered, given new number plates, or resold three times over. That's exactly why a single free VIN check can follow a car across borders in a way that a national plate number never could. A Ford F-150 built in Dearborn, Michigan carries the same identity whether it's sold new in Ohio, re-exported from a US auction through a Sharjah trading yard to a buyer in Riyadh, or shipped to a private buyer in Auckland.</p>
                  <p>Most people run a VIN check the moment they've already agreed a price — but the smarter move is to run it before you travel to view the car, before you wire a deposit, and again after the sale to double-check nothing was swapped at handover. It costs nothing and takes under a minute, whether you're comparing a Gulf-spec Land Cruiser in Dubai or a private-sale pickup truck in Texas.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Checks Around the World</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">United States, Canada &amp; Mexico</strong> — this is home turf for the NHTSA database, so a US, Canadian, or Mexican-market VIN decodes with full accuracy: trim level, engine, drivetrain, even factory options in most cases. This also makes it the fastest way to run a <strong className="text-foreground">free VIN check before buying from a dealer auction or a private seller</strong>. It's especially useful before bidding at a salvage or copart-style online auction, where the listing photos rarely tell the whole story and the VIN is often the only verifiable fact you have.</p>
                  <p><strong className="text-foreground">UAE, Saudi Arabia, Qatar &amp; the Gulf</strong> — a large share of the used cars sold in Dubai, Abu Dhabi, Riyadh, Doha, and across the Gulf started life as American-spec vehicles before being re-exported through free-trade auction hubs. Search terms like "<strong className="text-foreground">chassis number check UAE</strong>" and "<strong className="text-foreground">vin check UAE</strong>" are among the most common car-buying searches in the region, and this free chassis number check answers them directly — decode the VIN before you hand over a deposit at a Sharjah auction or a Dubai used-car lot. GCC-spec vehicles built exclusively for the Gulf market, however, sit outside the NHTSA dataset and won't return full results; for those, a dealer-level inspection and the local traffic authority's registration record remain your best source of truth.</p>
                  <p><strong className="text-foreground">United Kingdom &amp; Europe</strong> — UK and EU-registered cars run on a different national numbering system, so a full history normally means an HPI check or a DVLA enquiry in Britain, or the national registry in your EU country. Where this tool still earns its keep in Europe is on imported or grey-market vehicles originally built for North America — a surprisingly common find at European used-car auctions and among classic American pickups and muscle cars imported for enthusiasts.</p>
                  <p><strong className="text-foreground">Ireland, New Zealand, South Africa &amp; beyond</strong> — wherever US or Canadian-market vehicles get shipped and re-registered, the same 17-digit VIN still decodes. If you're buying privately in Dublin, Auckland, Johannesburg, Manila, Karachi, or anywhere else that imports North American-spec cars, run the VIN before you view the vehicle in person. It's a genuinely global habit worth building, not a US-only trick — the moment a used car crosses a border, the seller's description becomes harder to verify by eye, and the VIN becomes the one detail that travelled with the car unchanged.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Buying a Used Car Abroad? Do This First</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Cross-border used car buying carries an extra layer of risk that a purely domestic purchase doesn't: the paperwork, the seller, and the vehicle's true condition may all have originated in a country you've never visited. A free VIN or chassis number check won't replace an inspection, but it's the cheapest first filter you have, and it costs nothing to run before you go any further.</p>
                  <p>Start by decoding the VIN and comparing the result — year, model, engine size, trim — against exactly what the seller advertised. A mismatch here, even a small one like the wrong engine displacement, is often the first sign that the listing photos and the actual paperwork don't belong to the same car. Next, physically check that the VIN on the dashboard plate matches the one stamped on the chassis rail and the one printed on the door jamb sticker; a mismatch between these three locations is one of the clearest signs of a swapped plate. Finally, if the purchase price justifies it, pair this free spec check with a paid Carfax or AutoCheck history report, since that's the only way to see accident and title history rather than factory specification.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Lookup vs Vehicle History Report</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>A <strong className="text-foreground">free VIN lookup</strong> returns what the car was when it left the factory. For what has happened since — accidents, odometer rollback, title status (salvage, flood, rebuilt) — you need a paid <strong className="text-foreground">vehicle history report</strong> from Carfax or AutoCheck. For any high-value used car purchase, whether it's a re-exported Tahoe in Dubai or a private import elsewhere, a paid history report is strongly recommended alongside this free spec check.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Fraud in Import-Heavy Used Car Markets</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { title: 'VIN Plate Swapping', desc: 'A dashboard plate from a clean-title car is installed in a salvage or flood-damaged chassis. The plate decodes correctly; the car is structurally compromised. This is common wherever import volumes are high, including major import ports and Gulf re-export yards.' },
                    { title: 'Title Washing', desc: 'A salvage title is re-registered in a less strict US state, then exported to the UAE or elsewhere appearing as clean-title. A Carfax reveals the original history before the vehicle crossed a border.' },
                    { title: 'How to Protect Yourself', desc: 'Match the VIN or chassis number in all three physical locations. Run a Carfax (roughly $40–50 USD). Commission a pre-purchase inspection from an independent mechanic before paying, regardless of which country you\'re buying in.' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="p-3.5 rounded-xl bg-card border border-border">
                      <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Reading a VIN: What Each Section Means</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>The 17 characters aren't random. Positions 1–3 identify the manufacturer and country of assembly — this is how the decoder knows whether a car was built in the US, Canada, Mexico, or elsewhere. Positions 4–8 describe the vehicle itself: body style, engine, and series. Position 9 is a mathematical check digit used to catch a mistyped or tampered VIN. Position 10 encodes the model year, and positions 12–17 are the vehicle's unique production sequence number — no two cars built for the same market ever share it. Whether you call it a VIN, a chassis number, or a chassis no (as it's often written across UAE and South Asian classifieds), the underlying structure is identical worldwide.</p>
                  <p>Knowing how to read these sections yourself is useful even with a decoder in front of you, because it lets you sanity-check the results in seconds. If position 10 says the car is a 2015 model but the seller listed it as a 2018, or if the country-of-origin prefix doesn't match a "brand new US import" claim, that's worth a direct question before you go any further — not an accusation, just due diligence that costs nothing and takes thirty seconds.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Works for Any Make — Ford, Toyota, Honda, Chevy, GMC &amp; More</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>This isn't a single-brand tool. Because it reads directly from the NHTSA manufacturer database, the same decoder handles a <strong className="text-foreground">Ford VIN lookup</strong>, a <strong className="text-foreground">Toyota VIN decoder</strong> check, a <strong className="text-foreground">Honda VIN lookup</strong>, a <strong className="text-foreground">GMC VIN lookup</strong> or <strong className="text-foreground">Chevy VIN number lookup</strong>, and every other US-market brand from Nissan to Jeep to Hyundai. Paste in the 17-character code and the decoder pulls the correct manufacturer schema automatically — there's no need to tell it which brand you're checking.</p>
                  <p>It isn't limited to passenger cars either. The same <strong className="text-foreground">VIN code</strong> structure applies to a <strong className="text-foreground">motorcycle VIN number</strong> and to a <strong className="text-foreground">trailer VIN</strong>, so this doubles as a free bike or trailer check. The one exception is boats: a boat's hull identification number (<strong className="text-foreground">HIN</strong>) follows a related but separate 12-character standard, so a <strong className="text-foreground">HIN lookup</strong> needs a marine-specific decoder rather than this one.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Window Stickers, Recalls &amp; Stolen Vehicle Checks</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>A few closely related searches are worth clearing up. A "<strong className="text-foreground">window sticker by VIN</strong>" is the original factory Monroney label listing trim, options, and the original MSRP — some VIN decoders (including this one, depending on the model year) can reconstruct most of that from the same NHTSA data, though very old or heavily optioned vehicles may only return the base specification. A "<strong className="text-foreground">recall check</strong>" is different again: for open safety recalls tied to a specific VIN, NHTSA runs a dedicated recall lookup separate from this decoder, and it's worth running both before you buy.</p>
                  <p>If what you actually need is a <strong className="text-foreground">stolen vehicle search</strong>, a way to <strong className="text-foreground">find a towed vehicle by VIN</strong>, or a free <strong className="text-foreground">NICB VINCheck</strong>, those are law-enforcement and insurance-industry lookups rather than a specification decoder — the National Insurance Crime Bureau's free VINCheck tool and your local municipal towed-vehicle lookup are the correct places for those, and we'd rather point you there directly than pretend this tool covers something it doesn't. What this decoder is built for is confirming what a car is, not tracking where it currently sits.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Get the VIN Right Before You Calculate Import Duty</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>In countries where import duty on used vehicles runs into the thousands of dollars — much of Africa, Latin America, and the Gulf included — getting the specification wrong is expensive twice over. First you overpay for a car that isn't what it was advertised as, then you may find your customs valuation and duty calculation were based on the wrong engine size or trim level entirely, since duty schedules in many countries are tied directly to engine displacement and vehicle age. Decoding the VIN before you buy, or before you clear a vehicle through port, gives you the accurate year and engine size to plug into an <Link href="/tools/import-duty-calculator" className="text-foreground underline underline-offset-2">import duty calculator</Link> or a <Link href="/tools/registration-fee-calculator" className="text-foreground underline underline-offset-2">registration fee calculator</Link>, rather than trusting a number a seller wrote on a listing.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Checker — FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'Is this VIN decoder completely free?', a: 'Yes. 100% free using the NHTSA public API. No account or login required. Run as many free VIN checks as you need, from any country.' },
                  { q: 'What is a car VIN number used for?', a: 'The VIN identifies a specific vehicle for spec verification, history checks, registration, insurance, and recall notices. In the UAE and most Commonwealth markets, the VIN (chassis number) is required for registration and ownership transfer.' },
                  { q: 'Can I find vehicle specs by VIN for free?', a: 'Yes. Our free VIN decoder returns make, model, year, engine, body type, drive type, and origin from the NHTSA manufacturer database at no cost, for US, Canadian, and Mexican-spec vehicles.' },
                  { q: 'Does a chassis number check work for cars in the UAE?', a: 'Yes, for any vehicle originally built for the North American market — a large share of the used cars re-exported through Dubai and Sharjah. GCC-only spec vehicles won\'t return NHTSA results.' },
                  { q: 'What about vehicle checks in Saudi Arabia and Qatar?', a: 'American-spec vehicles re-exported through the Gulf decode normally. Vehicles built exclusively for GCC specification sit outside the NHTSA database and may return limited or no data.' },
                  { q: 'How do I check if a VIN is valid?', a: 'A valid VIN is exactly 17 characters — letters (A–Z, no I, O, Q) and numbers. Position 9 is a mathematical check digit. If incorrect, the VIN has been tampered with. Our tool validates this automatically.' },
                  { q: 'What if the VIN decoder shows no results?', a: 'Usually means a European, UK, GCC-spec, or Asian-market vehicle — outside the NHTSA database. We decode the model year from VIN position 10 regardless. For those vehicles, contact the manufacturer\'s official VIN service.' },
                  { q: 'Is there a UK equivalent of this VIN check?', a: 'UK-registered cars run through the DVLA and HPI systems rather than NHTSA. This tool is most useful in the UK for vehicles imported from North America.' },
                  { q: 'Can I use a VIN check for a car in Ireland, South Africa, or New Zealand?', a: 'Yes, provided the vehicle was originally built for the US, Canadian, or Mexican market before being shipped and re-registered locally. This is common with pickups, SUVs, and muscle cars imported by enthusiasts and dealers in all three countries.' },
                  { q: 'Is the engine number the same as the VIN or chassis number?', a: 'No. The engine number is stamped on the engine block itself and identifies that specific engine, while the VIN/chassis number identifies the whole vehicle. This tool decodes the VIN/chassis number — not the separate engine stamp.' },
                  { q: 'Does the VIN affect how much import duty I pay?', a: 'Indirectly, yes. Many countries calculate import duty using the vehicle\'s age and engine size, both of which the VIN confirms. Decoding it accurately before you calculate duty helps you avoid budgeting around the wrong figures.' },
                  { q: 'Can a VIN check tell me if a car was in an accident?', a: 'No. The free VIN decoder only returns factory specification — make, model, year, engine, and origin. Accident history, odometer readings, and title status require a paid vehicle history report such as Carfax or AutoCheck.' },
                  { q: 'Does this work for Ford, Toyota, Honda, Chevy, and GMC vehicles?', a: 'Yes. It reads directly from the shared NHTSA manufacturer database, so a Ford VIN lookup, Toyota VIN decoder check, Honda VIN lookup, GMC VIN lookup, or Chevy VIN number lookup all work the same way — just paste in the VIN.' },
                  { q: 'Can I get a window sticker by VIN?', a: 'For many US-market vehicles, yes — the decoder can reconstruct most of the original factory window sticker details (trim, options, drivetrain) from the same data NHTSA holds. Very old vehicles or unusual factory builds may only return the base specification.' },
                  { q: 'Does this tool check for open recalls?', a: 'Not directly. Recall checks run through a separate NHTSA recall lookup tied to the VIN. We\'d recommend running both a spec decode here and a dedicated recall check before buying.' },
                  { q: 'Can I check if a VIN is reported stolen?', a: 'Not with this tool. A stolen vehicle search or NICB VINCheck is a law-enforcement and insurance-industry lookup, separate from a specification decoder. The National Insurance Crime Bureau offers a free VINCheck for that purpose.' },
                  { q: 'Does this decode motorcycle or trailer VINs?', a: 'Yes, motorcycles and trailers use the same 17-character VIN structure as cars and trucks. Boats are the exception — a hull identification number (HIN) needs a marine-specific decoder.' },
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

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/chassis-number-check', label: 'Chassis Number Check', color: 'sky' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/vin-checker', label: 'VIN Checker (Nigeria)', color: 'emerald' },
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
