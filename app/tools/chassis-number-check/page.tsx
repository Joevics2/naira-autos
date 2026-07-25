import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import ChassisNumberCheckerClient from './client';

export const metadata: Metadata = {
  title: 'Free Chassis Number Check Online — Chassis Number Checker & Verification',
  description: 'Free chassis number check online, worldwide. Verify any chassis number and get make, model, year, engine specs, and assembly origin instantly — no login, no payment. Works for Toyota, Ford, Honda and every major brand.',
  keywords: ['chassis number check online free','chassis number verification','toyota chassis number check online free','chassis number check','chassis checker','chassis number check online','chassis number','chassis check','car chassis number check','vehicle chassis number check','chassis number checker','how to verify chassis number online','chassis number to vehicle number','search chassis number','free chassis number check online','chassis number meaning','chassis number search','check chassis number','verify chassis number','is vin same as chassis number','how to check chassis number online','check car with chassis number','chassis number check year of manufacture'],
  alternates: { canonical: 'https://www.naira.autos/tools/chassis-number-check' },
  openGraph: {
    title: 'Free Chassis Number Check Online | Naira Autos',
    description: 'Free chassis number check, anywhere in the world. Get make, model, year, engine and origin instantly.',
    url: 'https://www.naira.autos/tools/chassis-number-check',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/chassis-number-check',
      name: 'Free Chassis Number Check Online — Chassis Number Checker & Verification',
      description: 'Free chassis number check online, worldwide. Verify any chassis number and get make, model, year, engine specs, and assembly origin instantly.',
      url: 'https://www.naira.autos/tools/chassis-number-check',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Chassis Number Check', item: 'https://www.naira.autos/tools/chassis-number-check' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a chassis number?', acceptedAnswer: { '@type': 'Answer', text: 'A chassis number is the unique 17-character code stamped into a vehicle\'s frame at the factory. It identifies the exact make, model, year, engine, and assembly plant of that specific vehicle — no two vehicles from the same market ever share one. It is a permanent manufacturing identifier, not a number issued by a local licensing authority.' } },
        { '@type': 'Question', name: 'Is the chassis number the same as the VIN?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — for any vehicle built to the modern 17-character standard, the chassis number and the VIN (Vehicle Identification Number) are the exact same code. "VIN" is the term used in North America; "chassis number" (or "chassis no") is the more common term across Africa, South Asia, and much of the Commonwealth world. They are not two different numbers on the same car.' } },
        { '@type': 'Question', name: 'How do I check a chassis number online for free?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the 17-character chassis number above and click Decode. This free chassis number checker looks it up against the public NHTSA manufacturer database and returns make, model, year, engine specification, and assembly origin — completely free, with no account or payment required.' } },
        { '@type': 'Question', name: 'Where is the chassis number located on a car?', acceptedAnswer: { '@type': 'Answer', text: 'The chassis number appears in three places on most vehicles: stamped on the chassis rail under the bonnet, on a plate visible through the base of the windshield on the dashboard, and on a sticker inside the driver\'s door jamb. All three should show the exact same number — if they don\'t match, that is a serious red flag.' } },
        { '@type': 'Question', name: 'Can I check a Toyota chassis number online for free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This checker works for Toyota the same way it works for every other major brand — it reads directly from the shared NHTSA manufacturer database, so a Toyota chassis number decodes with full make, model, year, and engine detail alongside Ford, Honda, Nissan, Chevrolet, and other North American-market vehicles.' } },
        { '@type': 'Question', name: 'What can a chassis number tell you about a vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'Make, model, trim, year of manufacture, engine size and cylinder count, fuel type, body class, drive type, transmission, and the country and plant where the vehicle was assembled. It does not reveal accident history, ownership records, or title status — that requires a separate paid vehicle history report.' } },
        { '@type': 'Question', name: 'How do I find the year of manufacture from a chassis number?', acceptedAnswer: { '@type': 'Answer', text: 'The 10th character of the 17-digit chassis number encodes the model year using a standardised letter/number code shared across the industry. This checker decodes that position automatically and displays the model year alongside the rest of the vehicle\'s specification.' } },
        { '@type': 'Question', name: 'Is a chassis number check different from a VIN check?', acceptedAnswer: { '@type': 'Answer', text: 'No — a chassis number check and a VIN check query the exact same 17-character identifier and return the exact same data. The two terms describe the same lookup; which one you search for is usually just a matter of local terminology rather than a different type of check.' } },
        { '@type': 'Question', name: 'Does a chassis number check work for cars in Africa and Asia?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, provided the vehicle was originally built for the US, Canadian, or Mexican market — which describes a large share of the used vehicles imported into Nigeria, Ghana, Kenya, Tanzania, South Africa, India, and Bangladesh. Vehicles built exclusively for other regional markets may return limited or no data from this database.' } },
        { '@type': 'Question', name: 'What if the chassis number checker shows no results?', acceptedAnswer: { '@type': 'Answer', text: 'A blank or limited result usually means the vehicle was built for the European, UK, or a region-exclusive market outside the NHTSA database. The tool still decodes the model year directly from the chassis number\'s structure. For full specification on those vehicles, the manufacturer\'s own regional lookup is the better source.' } },
        { '@type': 'Question', name: 'Is the engine number the same as the chassis number?', acceptedAnswer: { '@type': 'Answer', text: 'No. The engine number is stamped separately on the engine block and identifies that specific engine unit, while the chassis number identifies the whole vehicle. A genuine engine swap can leave a car with a chassis number and engine number that no longer match — worth checking both against the vehicle\'s papers before buying.' } },
        { '@type': 'Question', name: 'How do I verify a chassis number is genuine and not tampered with?', acceptedAnswer: { '@type': 'Answer', text: 'Check that the chassis number stamped under the bonnet, the plate on the dashboard, and the sticker in the door jamb all read identically. Position 9 of the chassis number is a mathematical check digit that a tampered or mistyped number will usually fail — this tool validates that automatically before returning a result.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Free Chassis Number Check', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function ChassisNumberCheckPage() {
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
              <span className="text-white/50">Chassis Number Check</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Powered by NHTSA</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Free Chassis Number<br /><span className="text-blue-400">Check Online</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Verify any chassis number, anywhere in the world, in seconds.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the 17-character chassis number stamped under the bonnet, on the dashboard plate, or on the door jamb sticker. Get an instant chassis number check — make, model, year, engine specs, and assembly origin. No login, no payment, whether you're buying in Lagos, Nairobi, Accra, or Mumbai.</p>
          </div>
        </div>
      </div>

      <ChassisNumberCheckerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What Is a Chassis Number?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>A <strong className="text-foreground">chassis number</strong> is the 17-character identifier stamped into every vehicle's frame at the point of manufacture. It's sometimes written as "chassis no" in classifieds and import paperwork across Africa and South Asia. It encodes the manufacturer, country of assembly, vehicle type, engine, model year, and a unique serial number — a permanent manufacturing fingerprint that never changes, no matter how many times the vehicle is resold, re-registered, or re-plated.</p>
                  <p>This is the detail that trips up a lot of buyers: a chassis number is <strong className="text-foreground">not</strong> the same thing as a number plate or a registration number. A number plate is issued locally and can change every time a vehicle is re-registered in a new state or country. The chassis number is stamped at the factory, on the assembly line, and stays with that specific vehicle for life.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassis Number vs VIN — Are They the Same Thing?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Yes. For any modern vehicle built to the 17-character standard adopted industry-wide since the early 1980s, the <strong className="text-foreground">chassis number and the VIN are identical</strong> — the same code, read the same way, encoding the same information. There is no second, separate number hiding somewhere on the car.</p>
                  <p>The difference is purely regional terminology. "VIN" (Vehicle Identification Number) is the term used in North America and in most official documentation worldwide. "Chassis number" or "chassis no" is the everyday term used across Nigeria, Ghana, Kenya, India, Bangladesh, and much of the Commonwealth world for the exact same code. If a mechanic in Lagos asks for your chassis number and a US import broker asks for your VIN, they're both asking to see the same 17 characters on the same plate.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Where to Find and How to Verify Your Chassis Number</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Look in three places: stamped directly onto the chassis rail under the bonnet, printed on a small plate visible through the base of the windshield on the dashboard, and on a sticker inside the driver's door frame. A genuine, untampered vehicle will show the exact same 17 characters in all three spots.</p>
                  <p>If you're buying a used import — a common situation across Nigerian, Ghanaian, and Kenyan used-car markets — checking all three locations before you pay is one of the simplest ways to catch a swapped chassis plate. A mismatch between the dashboard plate and the actual stamped chassis rail is one of the clearest warning signs that a vehicle's true identity has been altered, often to hide accident or flood damage.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassis Number Checks Across Africa and South Asia</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Nigeria, Ghana, Kenya, Tanzania &amp; South Africa</strong> — a large share of the Tokunbo, "belgium," and Foreign Used vehicles sold across West and East African used-car markets began life as US, Canadian, or Mexican-market vehicles before being re-exported through auction houses. That means this checker returns full specification for a large slice of the vehicles actually being bought and sold locally. Vehicles built exclusively for European or Japanese domestic markets sit outside this specific database.</p>
                  <p><strong className="text-foreground">India, Bangladesh &amp; South Asia</strong> — imported and re-exported North American-spec vehicles, along with grey-market pickups and SUVs, decode the same way here. Locally-built vehicles registered under regional systems (RTO records in India, for instance) are better verified through the relevant national registry alongside this free spec check.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Works for Toyota, Ford, Honda &amp; Every Major Brand</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>This isn't a single-brand lookup. A <strong className="text-foreground">Toyota chassis number check</strong> works exactly the same way as a Ford, Honda, Nissan, Chevrolet, or Jeep chassis number check — the tool reads directly from the shared NHTSA manufacturer database and pulls the correct schema automatically based on the code itself. Toyota is the single most commonly searched brand for this kind of check, reflecting how dominant Toyota and Lexus models are in the used-import markets this tool serves.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassis Number vs Engine Number — Don't Confuse the Two</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>These are two different numbers stamped in two different places. The <strong className="text-foreground">chassis number</strong> identifies the whole vehicle and is what this tool decodes. The <strong className="text-foreground">engine number</strong> is stamped separately on the engine block itself and identifies only that specific engine unit — it isn't decoded by this tool, and it isn't interchangeable with the chassis number. A car that's had an engine swap can legitimately show a chassis number and engine number that don't match each other; always cross-check both against the vehicle's registration papers, not just one or the other.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Before You Calculate Import Duty, Get the Chassis Details Right</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Customs duty on used vehicles is typically calculated using the vehicle's age and engine size — both of which the chassis number confirms independently of whatever the seller or shipping paperwork claims. Decoding the chassis number before you buy, or before you clear a vehicle through port, gives you the real figures to plug into an <Link href="/tools/import-duty-calculator" className="text-foreground underline underline-offset-2">import duty calculator</Link> or a <Link href="/tools/registration-fee-calculator" className="text-foreground underline underline-offset-2">registration fee calculator</Link>, instead of budgeting around a number that turns out to be wrong at the port.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassis Number Check — FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'What is a chassis number?', a: 'A 17-character code stamped into a vehicle\'s frame at the factory, identifying its exact make, model, year, engine, and assembly plant. It\'s a permanent manufacturing identifier, not a locally-issued registration number.' },
                  { q: 'Is the chassis number the same as the VIN?', a: 'Yes — same code, same 17 characters, same data. "VIN" is the North American term; "chassis number" is the more common term across Africa, South Asia, and much of the Commonwealth for the identical identifier.' },
                  { q: 'How do I check a chassis number online for free?', a: 'Enter the 17-character chassis number above and click Decode. This tool queries the public NHTSA database and returns make, model, year, engine, and origin — free, no login required.' },
                  { q: 'Where is the chassis number on a car?', a: 'Three places: stamped on the chassis rail under the bonnet, on the dashboard plate visible through the windshield, and on a sticker in the driver\'s door jamb. All three must match.' },
                  { q: 'Can I check a Toyota chassis number online for free?', a: 'Yes — Toyota decodes the same way as every other major brand through the shared NHTSA database, along with Ford, Honda, Nissan, Chevrolet, and more.' },
                  { q: 'What does a chassis number check tell you?', a: 'Make, model, trim, year, engine size, cylinder count, fuel type, body class, drive type, and assembly plant. It does not show accident history or ownership — that needs a separate paid history report.' },
                  { q: 'How do I find the year of manufacture from a chassis number?', a: 'The 10th character of the 17-digit chassis number is a standardised code for the model year. This tool decodes it automatically and shows the year alongside the rest of the specification.' },
                  { q: 'Is a chassis number check different from a VIN check?', a: 'No — they query the identical 17-character code and return identical data. The difference is only in which term you happen to search.' },
                  { q: 'Does a chassis number check work for cars in Nigeria, Ghana, or Kenya?', a: 'Yes, for vehicles originally built for the US, Canadian, or Mexican market — which describes a large share of the Tokunbo and Foreign Used vehicles sold across West and East Africa.' },
                  { q: 'What if the chassis number checker shows no results?', a: 'Usually means the vehicle was built for a market outside the NHTSA database (European, UK, or region-exclusive). The model year still decodes from the chassis number\'s structure regardless.' },
                  { q: 'Is the engine number the same as the chassis number?', a: 'No. The engine number is stamped separately on the engine block and identifies only that engine. The chassis number identifies the whole vehicle. They can legitimately differ after an engine swap.' },
                  { q: 'How do I verify a chassis number is genuine, not tampered with?', a: 'Check that the number on the chassis rail, dashboard plate, and door jamb sticker all match exactly. Position 9 is a mathematical check digit — a tampered or mistyped number usually fails this check, which this tool validates automatically.' },
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
                { href: '/tools/vin-checker-global', label: 'VIN Checker (Global)', color: 'blue' },
                { href: '/tools/vin-checker', label: 'VIN Checker (Nigeria)', color: 'emerald' },
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
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
