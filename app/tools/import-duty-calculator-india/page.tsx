import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyIndiaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-india';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'India Car Import Duty Calculator 2026 — BCD, AIDC & IGST Estimator',
  description: 'Free car import duty calculator for India. Full breakdown of Basic Customs Duty, AIDC and IGST for new and used cars after Budget 2025 and GST 2.0, with UK CETA quota and the 3-year used-car rule. Updated October 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'India Car Import Duty Calculator | Naira Autos',
    description: 'Estimate BCD, AIDC, IGST and the total landed cost of importing a car into India — new CBU or used.',
    url: URL, siteName: 'Naira Autos', locale: 'en_IN', type: 'website',
  },
  keywords: [
    'india car import duty calculator 2026', 'import duty on cars in india', 'customs duty on imported car india',
    'bcd aidc igst car calculator', 'how much tax to import car to india', 'used car import duty india',
    'transfer of residence car import india', 'uk car import quota india ceta', 'landed cost imported car india',
  ].join(', '),
};

const FAQ = [
  { q: 'How much is the import duty on a car in India in 2026?', a: 'For a new fully built car priced above US$40,000 CIF, or with an engine above 3,000 cc petrol or 2,500 cc diesel, customs duty is 70% BCD plus 40% AIDC, about 110% of assessable value, before IGST. IGST (40% for large cars) is charged on value plus those duties. The total typically lands near 190% of the assessable value for a large SUV.' },
  { q: 'What changed for imported cars in Budget 2025?', a: 'From 2 February 2025, BCD on the top band was cut from 125% (or 100%) to 70%, the 10% Social Welfare Surcharge was exempted, and a 40% Agriculture Infrastructure and Development Cess was added. For new luxury cars the headline BCD fell but the effective customs duty stayed about 110%. Second-hand cars moved to 70% BCD plus 67.5% AIDC, about 137.5%.' },
  { q: 'What GST applies to an imported car after GST 2.0?', a: 'Since 22 September 2025 there is no compensation cess on cars. IGST is 18% for petrol or petrol-hybrid cars up to 1,200 cc and diesel up to 1,500 cc that are under 4 metres long, 40% for larger cars and SUVs, and 5% for electric vehicles. IGST is charged on assessable value plus BCD and AIDC. Many older blog posts still show 28% plus cess, which is outdated.' },
  { q: 'Can I import a used car into India?', a: 'Used cars are tightly restricted. They must generally be no more than three years from the date of manufacture, right-hand drive with a speedometer in kilometres, and meet Indian motor-vehicle rules. Individuals returning to settle (Transfer of Residence) can bring one car under special conditions, including a two-year no-sale period, but still pay full customs duty. Check the current DGFT policy before shipping.' },
  { q: 'Do UK-made cars get a lower duty?', a: 'The India–UK CETA came into force on 15 July 2026. UK-origin cars get a concessional duty only inside a yearly tariff-rate quota that must be applied for through DGFT. In year one, petrol cars over 3,000 cc and diesel over 2,500 cc fall from about 110% to 30% duty within the quota, with rates falling toward 10% over time. Imports above the quota pay the normal rate. The first allocation in September 2026 covered just 642 cars.' },
  { q: 'What about the India–EU trade deal?', a: 'A deal announced in January 2026 would lower duty on EU-made cars above roughly €15,000 to about 40% initially, falling toward 10% under an annual quota. This calculator does not model it because it is not confirmed to be in force.' },
  { q: 'Is the 1% landing charge still added?', a: 'Many customs assessments still add a 1% landing charge to CIF, but sources disagree on whether it still applies to all imports. The calculator includes a toggle so you can switch it off if your customs broker confirms it does not apply.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'India Car Import Duty Calculator — BCD, AIDC & IGST Estimator',
      description: 'Free calculator for car import duty in India covering BCD, AIDC and IGST for new and used cars.',
      url: URL, inLanguage: 'en-IN', dateModified: '2026-10-03',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'India', item: URL },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'SoftwareApplication', name: 'India Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;

export default function ImportDutyCalculatorIndiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools/import-duty-calculator-countries" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/import-duty-calculator-countries" className="hover:text-white/60 transition-colors">Import Duty Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇮🇳 India</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Rates: Budget 2025 + GST 2.0</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              India Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to land that car in India?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the car price, engine and size to get BCD, AIDC, IGST and the duty-paid landed cost, for new or used cars, with UK CETA quota pricing.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Indian Customs assesses on the Bill of Entry using the CBIC exchange rate, and some rates here (the 60% band at or below US$40,000, EV bands and the 1% landing charge) should be confirmed with a customs broker before you commit.
          </p>
        </div>
      </div>

      <ImportDutyIndiaClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>India Car Import Duty Rates (2026)</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              Duties stack in a fixed order: Basic Customs Duty (BCD) and AIDC apply to assessable value, then IGST applies to value plus those duties. The Social Welfare Surcharge no longer applies to passenger cars of heading 8703.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'BCD', rate: '60–70%', base: 'of assessable value, by band', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'AIDC', rate: '40–67.5%', base: 'top-band new and used cars', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'IGST', rate: '5 / 18 / 40%', base: 'of value + BCD + AIDC', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Cess', rate: 'Nil', base: 'compensation cess ended 22 Sep 2025', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Worked Example: Large Petrol SUV</h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Take a new 2.0-litre petrol SUV, over US$40,000, with an assessable value of ₹50,00,000 (landing charge switched off for simplicity).</p>
                  <p>BCD at 70% is ₹35,00,000 and AIDC at 40% is ₹20,00,000. IGST at 40% applies to ₹1,05,00,000 (value + BCD + AIDC), which is ₹42,00,000. Total duty and tax is ₹97,00,000, so the duty-paid landed cost is ₹1,47,00,000, an effective rate of 194% on the assessable value.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>New vs Used Cars</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">New:</strong> must be built outside India, unregistered and imported from the country of manufacture. Top band is 70% BCD plus 40% AIDC; cars at or below US$40,000 with smaller engines are in the lower band.</p>
                  <p><strong className="text-foreground">Used:</strong> 70% BCD plus 67.5% AIDC (about 137.5%), no more than three years old, right-hand drive. Transfer of Residence importers need two years abroad, import within six months of arrival and cannot sell for two years.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Step-by-Step: Importing a Car to India</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Check eligibility: right-hand drive, age rule for used cars, and homologation under Indian motor-vehicle rules.</li>
                  <li>Obtain an Import-Export Code and, for UK-origin cars under CETA, a DGFT quota allocation.</li>
                  <li>Ship to an authorised port and file the Bill of Entry through a customs broker.</li>
                  <li>Customs assesses value (CIF), applies BCD, AIDC and IGST, and you pay before release.</li>
                  <li>Register the car with the local RTO and pay state road tax.</li>
                </ol>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>What the Calculator Does Not Cover</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">State road tax varies widely, so it is an optional manual input. Anti-dumping or other special duties, the India–EU deal and quota rates beyond UK year one are not modelled. Valuation disputes can raise the assessed value above the invoice.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>How Indian Customs Calculates Duty on a Car</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Customs starts with the assessable value, which is the CIF value: the price of the car plus freight and insurance to the Indian port. If you only know the free-on-board price, customs adds freight and insurance, and where actual figures are missing it applies notional charges. Many assessments also add a 1% landing charge, although sources disagree on whether that is applied in every case, so the calculator lets you switch it off.</p>
                  <p>Basic Customs Duty is calculated on the assessable value. The Agriculture Infrastructure and Development Cess, introduced in the 2025 Budget for top-band cars, is charged on the same base. Only then is IGST calculated, on assessable value plus BCD plus AIDC. Because tax is charged on tax, a large SUV can end up paying roughly twice its assessable value in duties.</p>
                  <p>The Social Welfare Surcharge used to add 10% of the duty, but it has been exempted for passenger cars of heading 8703, and the GST compensation cess ended on 22 September 2025. That is why the stack in this calculator has only three lines: BCD, AIDC and IGST.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>GST 2.0: Which IGST Slab Does Your Car Fall In?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>From 22 September 2025 India replaced the old 28% rate plus cess with simpler slabs. Petrol and petrol-hybrid cars up to 1,200 cc and diesel cars up to 1,500 cc that are under four metres long are charged 18%. Larger cars and SUVs are charged 40%. Electric vehicles are charged 5%.</p>
                  <p>Length and engine size must both be met for the 18% slab, so a 1,000 cc car longer than four metres still pays 40%. Be wary of older articles that quote 28% plus up to 22% cess; they describe the system before the reform.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Importing a Car From the UK or the EU</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>The India–UK Comprehensive Economic and Trade Agreement came into force on 15 July 2026. For UK-origin cars it creates a tariff-rate quota: within the quota, a large petrol car over 3,000 cc or diesel car over 2,500 cc pays about 30% customs duty in the first year instead of roughly 110%, falling toward 10% over time. Imports above the quota pay the normal rate, and the quota must be applied for through DGFT.</p>
                  <p>The first allocation, announced in September 2026, approved only a small number of cars, so treat the concessional rate as scarce. A deal with the European Union announced in January 2026 points to a similar quota structure, but it is not modelled here because it has not been confirmed as in force.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Common Mistakes to Avoid</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Using a blog that still shows 28% GST plus cess. The reform changed the headline numbers for every car.</li>
                  <li>Ignoring the US$40,000 line. Crossing it moves a new car to the 70% BCD plus 40% AIDC band.</li>
                  <li>Assuming any used car can be imported. Used cars face strict conditions, including age and right-hand drive.</li>
                  <li>Forgetting that IGST is charged on duty, not just on the car’s price.</li>
                  <li>Leaving out port charges, clearing agent fees, homologation and state road tax from the budget.</li>
                  <li>Expecting a quota rate without a DGFT allocation.</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: Union Budget 2025 customs notifications, CBIC GST 2.0 notifications, DGFT India–UK CETA notices. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
