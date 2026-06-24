import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClient from './client';

export const metadata: Metadata = {
  title: 'Free VIN Decoder & VIN Checker Nigeria — Vehicle Identification Number Lookup',
  description: 'Free VIN decoder and VIN checker for Nigeria. Decode any vehicle VIN or chassis number — make, model, year, engine specs, assembly origin. Essential free VIN check for Tokunbo buyers.',
  alternates: { canonical: 'https://www.naira.autos/tools/vin-checker' },
  openGraph: {
    title: 'Free VIN Decoder & Chassis Number Checker | Naira Autos',
    description: 'Free VIN check for any Tokunbo car in Nigeria. Get make, model, year, engine and origin instantly.',
    url: 'https://www.naira.autos/tools/vin-checker',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/vin-checker',
      name: 'Free VIN Decoder & VIN Checker Nigeria — Vehicle Identification Number Lookup',
      description: 'Free VIN decoder and VIN checker for Nigeria. Decode any VIN or chassis number — make, model, year, engine specs, and assembly origin.',
      url: 'https://www.naira.autos/tools/vin-checker',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
        { '@type': 'ListItem', position: 3, name: 'VIN Checker', item: 'https://www.naira.autos/tools/vin-checker' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What is a VIN number on a car?', acceptedAnswer: { '@type': 'Answer', text: 'A VIN (Vehicle Identification Number) is a unique 17-character code assigned to every vehicle at manufacture. It encodes country of origin, manufacturer, vehicle type, engine, model year, assembly plant, and a unique serial. In Nigeria it is commonly called the chassis number.' } },
        { '@type': 'Question', name: 'How do I do a free VIN check online?', acceptedAnswer: { '@type': 'Answer', text: 'Enter the 17-character VIN above and click Decode VIN. Our free VIN check uses the NHTSA database to return make, model, year, engine specs, drive type, and assembly origin — completely free, no login required.' } },
        { '@type': 'Question', name: 'Where is the VIN number on a car in Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'The VIN appears in three locations: dashboard plate visible through windshield, driver\'s door jamb sticker, and chassis rail stamp under the bonnet. All three must match.' } },
        { '@type': 'Question', name: 'Is this VIN decoder free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. 100% free. We use the publicly accessible NHTSA API. No account, login, or payment required. Works for US, Canadian, and Mexican vehicles — the majority of Tokunbo cars imported to Nigeria.' } },
        { '@type': 'Question', name: 'What is the difference between a VIN and a chassis number?', acceptedAnswer: { '@type': 'Answer', text: 'They are the same 17-character identifier. Internationally it is called VIN. In Nigeria and Commonwealth markets the same code is called the chassis number.' } },
        { '@type': 'Question', name: 'Does VIN decode work for Tokunbo cars imported to Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most Tokunbo cars in Nigeria originate from the US, Canada, or Mexico — all in the NHTSA database. European or UK origin vehicles may return limited data.' } },
        { '@type': 'Question', name: 'What does the VIN tell you about a car?', acceptedAnswer: { '@type': 'Answer', text: 'Make, model, trim, year, engine type, displacement, horsepower, body style, drive type, transmission, country and city of assembly, and safety features. It does not reveal ownership history — that requires a paid Carfax report.' } },
        { '@type': 'Question', name: 'Can I get a free car history report from this VIN checker?', acceptedAnswer: { '@type': 'Answer', text: 'This tool provides free spec data from NHTSA. Full vehicle history — accidents, title status, ownership — requires a paid Carfax or AutoCheck report using the same VIN.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Free VIN Decoder & VIN Checker', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' } },
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
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Free VIN Decoder<br /><span className="text-blue-400">&amp; Chassis Number Checker</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Free VIN check for any Tokunbo car in Nigeria.</p>
            <p className="text-white/75 text-sm leading-relaxed">Enter the 17-character VIN (chassis number) from the dashboard, door jamb, or engine bay. Get a free VIN number lookup — make, model, year, engine specs, and assembly origin. No login required.</p>
          </div>
        </div>
      </div>

      <VINCheckerClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Free VIN Check for Tokunbo Cars in Nigeria</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Our <strong className="text-foreground">free VIN decoder</strong> uses the NHTSA public database. A <strong className="text-foreground">free VIN number lookup</strong> returns make, model, year, engine specs, drive type, body class, and assembly plant — everything you need to verify what a Tokunbo car actually is before buying.</p>
                  <p>Most Tokunbo cars in Nigeria come from the US, Canada, or Mexico — all within the NHTSA database. The <strong className="text-foreground">chassis number checker</strong> confirms whether the seller's description matches the vehicle's manufacturer-recorded specifications.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Lookup vs Vehicle History Report</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>A <strong className="text-foreground">free VIN lookup</strong> returns what the car was when it left the factory. For what has happened since — accidents, odometer rollback, title status (salvage, flood, rebuilt) — you need a paid <strong className="text-foreground">vehicle history report</strong> from Carfax or AutoCheck. For any Tokunbo purchase above ₦5 million, a paid history report is strongly recommended.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Fraud in the Nigerian Tokunbo Market</h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { title: 'VIN Plate Swapping', desc: 'A dashboard plate from a clean-title car is installed in a salvage or flood-damaged chassis. The plate decodes correctly; the car is structurally compromised.' },
                    { title: 'Title Washing', desc: 'A salvage title is re-registered in a less strict US state, then exported to Nigeria appearing as clean-title. A Carfax reveals the original history.' },
                    { title: 'How to Protect Yourself', desc: 'Match VIN in all three physical locations. Run a Carfax (~$40–50 USD). Commission a pre-purchase inspection from an independent mechanic before paying.' },
                  ].map(({ title, desc }) => (
                    <div key={title} className="p-3.5 rounded-xl bg-card border border-border">
                      <p className="text-sm font-bold text-foreground mb-1">{title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN Checker — FAQ</h2>
              <div className="space-y-2">
                {[
                  { q: 'Is this VIN decoder completely free?', a: 'Yes. 100% free using the NHTSA public API. No account or login required. Run as many free VIN checks as you need.' },
                  { q: 'What is a car VIN number used for?', a: 'The VIN identifies a specific vehicle for spec verification, history checks, registration, insurance, and recall notices. In Nigeria the VIN (chassis number) is required for registration and ownership transfer.' },
                  { q: 'Can I find vehicle specs by VIN for free?', a: 'Yes. Our free VIN decoder returns make, model, year, engine, body type, drive type, and origin from the NHTSA manufacturer database at no cost.' },
                  { q: 'How do I check if a VIN is valid?', a: 'A valid VIN is exactly 17 characters — letters (A–Z, no I, O, Q) and numbers. Position 9 is a mathematical check digit. If incorrect, the VIN has been tampered with. Our tool validates this automatically.' },
                  { q: 'What if the VIN decoder shows no results?', a: 'Usually means a European or UK vehicle — outside the NHTSA database. We decode the model year from VIN position 10. For European vehicles, contact the manufacturer\'s official VIN service.' },
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
                { href: '/tools/vehicle-papers-checklist', label: 'Vehicle Papers Checklist', color: 'violet' },
                { href: '/tools/registration-fee-calculator', label: 'Registration Fee Calculator', color: 'blue' },
                { href: '/tools/ai-mechanic', label: 'AI Mechanic', color: 'emerald' },
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