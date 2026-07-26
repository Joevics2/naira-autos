import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import PlateNumberCheckerClient from './client';
import { COVERED_STATES } from '@/lib/nigeria-plate-codes';

export const metadata: Metadata = {
  title: 'Free Nigeria Plate Number Checker — Decode LGA, Year & Format',
  description: 'Free Nigeria plate number checker. Decode any plate to find its Local Government Area of registration and registration year, and understand what each part of the plate means. No login required.',
  keywords: ['plate number checker nigeria','check plate number lga nigeria','what state is this plate number from','nigeria number plate format explained','vehicle plate number lookup nigeria','verify plate number nigeria free','plate number code checker','decode nigeria plate number','plate number lga lookup','number plate meaning nigeria','frsc plate number verification','check car plate number nigeria','plate number verification nigeria','nigeria vehicle plate decoder'],
  alternates: { canonical: 'https://www.naira.autos/tools/plate-number-checker' },
  openGraph: {
    title: 'Free Nigeria Plate Number Checker | Naira Autos',
    description: 'Decode any Nigerian plate number — LGA of registration, registration year, and what each character means.',
    url: 'https://www.naira.autos/tools/plate-number-checker',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/plate-number-checker',
      name: 'Free Nigeria Plate Number Checker — Decode LGA, Year & Format',
      url: 'https://www.naira.autos/tools/plate-number-checker',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'Plate Number Checker', item: 'https://www.naira.autos/tools/plate-number-checker' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What does a Nigerian plate number mean?', acceptedAnswer: { '@type': 'Answer', text: 'A Nigerian plate number follows the format ABC-123-XY. The first 3 letters identify the Local Government Area (LGA) where the vehicle was registered. The 3 middle digits are a unique serial number within that LGA, running from 001 to 999 before resetting. The last 2 letters are a batch code — the first of the two also encodes the registration year (A=2011, B=2012, and so on sequentially).' } },
        { '@type': 'Question', name: 'How do I check what LGA a Nigerian plate number is from?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the full plate number above. This tool reads the first 3 letters and matches them against a verified LGA database covering Lagos, FCT (Abuja), Kano, Ogun, Anambra, Akwa Ibom, and Enugu, with more states being added. For plates outside this list, verify directly with FRSC.' } },
        { '@type': 'Question', name: 'How do I check the registration year from a plate number?', acceptedAnswer: { '@type': 'Answer', text: 'The first letter of the last two-letter pair encodes the year: A=2011, B=2012, C=2013, and so on sequentially. This checker decodes it automatically. Plates issued before the 2011 format revision (the older XY-123-ABC style) do not follow this scheme.' } },
        { '@type': 'Question', name: 'Why does the FRSC plate verification website show "invalid" for a real plate?', acceptedAnswer: { '@type': 'Answer', text: 'The official FRSC portal (nvis.frsc.gov.ng) intermittently returns errors or "invalid" results for genuine, correctly-registered plates — this is a known reliability issue with the government system itself, not necessarily a sign the plate is fake. If it happens, try again later, use the SMS verification method (text the plate number to 33324), or check directly at a Vehicle Inspection Office.' } },
        { '@type': 'Question', name: 'Does this tool show who owns a vehicle?', acceptedAnswer: { '@type': 'Answer', text: 'No — and it never will. This tool only decodes publicly-known plate format information: the Local Government Area code and the registration year. It does not access, store, or display any vehicle owner\'s name, address, or contact details. For registration status, use the official FRSC portal.' } },
        { '@type': 'Question', name: 'Is this the same as a VIN or chassis number check?', acceptedAnswer: { '@type': 'Answer', text: 'No. A plate number is issued by the state/FRSC and can change if a vehicle is re-registered. A VIN or chassis number is stamped by the manufacturer and never changes. For vehicle specification — make, model, year, engine — use our VIN Checker or Chassis Number Check instead.' } },
        { '@type': 'Question', name: 'Which Nigerian states does this checker currently cover?', acceptedAnswer: { '@type': 'Answer', text: 'Lagos, FCT (Abuja), Kano, Ogun, Anambra, Akwa Ibom, and Enugu, with full LGA-level coverage cross-checked against official LGA counts for each. More states are being added over time. For any state not yet covered, the tool will say so and point you to FRSC\'s official verification instead of guessing.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Free Nigeria Plate Number Checker', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function PlateNumberCheckerPage() {
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
              <span className="text-white/50">Plate Number Checker</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">No Owner Data — Ever</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Free Nigeria Plate<br /><span className="text-blue-400">Number Checker</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Decode any Nigerian plate — LGA, registration year, and format.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter a plate number to see its Local Government Area of registration, decoded registration year, and what each character means. No login, no owner data — ever.</p>
          </div>
        </div>
      </div>

      <PlateNumberCheckerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Nigerian Plate Numbers Work</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Since the 2011 revision, Nigerian plates follow the format <strong className="text-foreground">ABC-123-XY</strong>. The first 3 letters identify the Local Government Area (LGA) where the vehicle was registered — each of Nigeria's roughly 774 LGAs has its own unique 3-letter code. The 3 middle digits are a serial number specific to that LGA, running 001 to 999 before resetting. The final 2 letters are a batch code, and the first of those two letters also encodes the year of registration: A = 2011, B = 2012, and so on sequentially.</p>
                  <p>Plates issued before 2011 followed a different layout — 2 letters, 3 digits, then 3 letters (e.g. XY-123-ABC). Both formats encode the same LGA information; only the ordering and the year-decoding differ.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What This Tool Does — and Doesn't — Show</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>This checker decodes <strong className="text-foreground">public plate-format information only</strong>: the LGA of registration and the registration year. That's it. It does not show, store, or have access to any vehicle owner's name, address, phone number, or other personal details — and it never will, regardless of what other services online may claim to offer.</p>
                  <p>If you need to verify a plate's live registration status — whether it's currently valid, expired, or reported — that requires the official <a href="https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo" target="_blank" rel="noopener noreferrer nofollow" className="text-foreground underline underline-offset-2">FRSC verification portal</a>, which this tool links to directly.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>If FRSC's Own Portal Says "Invalid"</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>This is a known, common issue — the FRSC's live verification system intermittently returns errors or an "invalid" result even for real, correctly-registered plates. It's a reliability problem with the government system itself, not necessarily proof the plate is fake. If this happens, try again after some time, use the SMS method (text the plate number to <strong className="text-foreground">33324</strong>), or ask at a Vehicle Inspection Office directly.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Coverage — Which States Are Included</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>LGA-level lookup currently covers <strong className="text-foreground">{COVERED_STATES.map((s) => s.state).join(', ')}</strong> — each cross-checked so the number of LGA codes in our database matches that state's official LGA count exactly. We're deliberately not guessing codes for states we haven't verified; if your plate's prefix isn't recognised, the tool tells you plainly rather than showing a made-up result, and points you to FRSC instead. More states are being added over time.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Plate Number vs VIN vs Chassis Number</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>These are three different things. A <strong className="text-foreground">plate number</strong> is issued by the state/FRSC and can change if a vehicle is re-registered or moved between states. A <strong className="text-foreground">VIN</strong> or <strong className="text-foreground">chassis number</strong> is stamped by the manufacturer at the factory and never changes, regardless of how many times the vehicle is resold or re-plated. If you're trying to verify a vehicle's actual make, model, year, and engine specification before buying, use our <Link href="/tools/vin-checker" className="text-foreground underline underline-offset-2">VIN Checker</Link> or <Link href="/tools/chassis-number-check" className="text-foreground underline underline-offset-2">Chassis Number Check</Link> instead — this plate checker is specifically for decoding the plate format itself.</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Plate Number Checker — FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'What does a Nigerian plate number mean?', a: 'Format: ABC-123-XY. First 3 letters = LGA of registration. Middle 3 digits = serial number within that LGA (001–999). Last 2 letters = batch code, where the first letter also encodes the registration year (A=2011, sequential).' },
                  { q: 'How do I check what LGA a plate number is from?', a: 'Enter the full plate above. This tool matches the first 3 letters against a verified database covering Lagos, FCT, Kano, Ogun, Anambra, Akwa Ibom, and Enugu so far, with more states being added.' },
                  { q: 'How do I check the registration year from a plate number?', a: 'The first letter of the final two-letter pair encodes it: A=2011, B=2012, and so on sequentially. This tool decodes it automatically. Pre-2011 plates use a different format and aren\u2019t covered by this scheme.' },
                  { q: 'Why does FRSC\u2019s own site show "invalid" for a real plate?', a: 'This is a known reliability issue with the government portal itself — it intermittently errors even on genuine plates. Try again later, use SMS verification (text the plate to 33324), or check at a Vehicle Inspection Office.' },
                  { q: 'Does this tool show who owns a vehicle?', a: 'No, and it never will. It only decodes public plate-format information — LGA code and registration year — never an owner\'s name, address, or contact details.' },
                  { q: 'Is this the same as a VIN or chassis number check?', a: 'No. A plate is state-issued and can change on re-registration. A VIN/chassis number is factory-stamped and permanent. For vehicle spec verification, use our VIN Checker or Chassis Number Check instead.' },
                  { q: 'Which states does this checker cover right now?', a: 'Lagos, FCT (Abuja), Kano, Ogun, Anambra, Akwa Ibom, and Enugu — each verified to match that state\'s official LGA count exactly. Other states will say so plainly rather than guess, with a link to FRSC\'s official portal.' },
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

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker', label: 'VIN Checker (Nigeria)', color: 'emerald' },
                { href: '/tools/chassis-number-check', label: 'Chassis Number Check', color: 'sky' },
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
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
