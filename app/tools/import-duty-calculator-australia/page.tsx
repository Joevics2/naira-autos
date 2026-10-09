import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyAustraliaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-australia';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Australia Car Import Duty Calculator 2026 — Duty, GST & Luxury Car Tax',
  description: 'Free Australia car import calculator for 2026-27. Work out 5% customs duty, 0% under FTAs and for cars 30+ years old, 10% GST on freight-inclusive value, luxury car tax thresholds and the 25-year, SEVS and Personal Import pathways.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Australia Car Import Duty Calculator | Naira Autos',
    description: 'Estimate customs duty, GST and luxury car tax for importing a car into Australia.',
    url: URL, siteName: 'Naira Autos', locale: 'en_AU', type: 'website',
  },
  keywords: [
    'australia car import duty calculator', 'how much to import a car from japan to australia 2026', 'luxury car tax calculator imported car',
    'sevs import cost', '25 year rule australia import', 'personal import scheme australia', 'gst on imported car australia',
    'import duty 30 year old car australia', 'australia eu free trade agreement car tariff',
  ].join(', '),
};

const FAQ = [
  { q: 'How much does it cost to import a car into Australia in 2026?', a: 'The general customs duty is 5% of the free-on-board value, and 10% GST is charged on the duty-paid value plus international freight and insurance. Many cars from Japan, Korea, Thailand, the United States, the United Kingdom and China enter at 0% duty with proof of origin, so GST is often the main tax. Luxury car tax applies above A$80,809, or A$91,661 for fuel-efficient cars, in 2026-27.' },
  { q: 'How is GST calculated on an imported car?', a: 'GST is 10% of the value of the taxable importation, which is the customs value plus customs duty plus international freight and insurance. A car with an A$20,000 FOB value, A$2,500 freight and A$300 insurance has a taxable value of A$22,800 at 0% duty, so GST is A$2,280.' },
  { q: 'What is the luxury car tax threshold for 2026-27?', a: 'It is A$80,809 for most cars and A$91,661 for fuel-efficient cars. Since 1 July 2025 a car only counts as fuel-efficient if its combined fuel consumption is 3.5 litres per 100 kilometres or less, which excludes many hybrids that qualified before. The tax is 33% of the amount above the threshold after removing the GST component.' },
  { q: 'How is luxury car tax worked out on an import?', a: 'The Tax Office formula is the LCT value minus the threshold, multiplied by 10 over 11, multiplied by 33%. For imports the LCT value includes the customs value, international transport and insurance, customs duty and the GST payable on importation. A car with an LCT value of A$101,500 owes A$6,207.30 against the 2026-27 standard threshold.' },
  { q: 'Which countries get 0% duty on cars?', a: 'Cars built in Japan, South Korea, Thailand, the United States and China qualify for 0% duty under Australia’s free trade agreements with proof of origin, and vehicles made in other CPTPP members such as Canada, Mexico and Vietnam may also qualify. The United Kingdom agreement also removes the car tariff, although a few guides still list 5%, so confirm with your broker.' },
  { q: 'Are European cars still charged the 5% tariff?', a: 'Yes, for now. Australia and the European Union concluded a free trade agreement in March 2026 that will scrap the 5% tariff on European-made passenger cars and lift the luxury car tax threshold for zero-emission models to A$120,000, but it must be ratified before it takes effect. Until then the 5% duty applies.' },
  { q: 'Do 30-year-old cars pay import duty?', a: 'No. Passenger vehicles that are 30 years old or older are duty-free under the Customs Tariff schedule, so for a 2026 import that means a car built in 1996 or earlier. GST still applies, and the vehicle must not be so heavily modified that it counts as newly manufactured.' },
  { q: 'What is the 25-year rule?', a: 'Under the Road Vehicle Standards Act, a car that is at least 25 years old can enter on a simpler pathway than SEVS, so for 2026 a car built in 2001 or earlier. You still need a Vehicle Import Approval through the ROVER system before it ships, and the car must pass state inspection to be registered.' },
  { q: 'Can I import a newer used car?', a: 'Only through limited pathways. The Specialist and Enthusiast Vehicle Scheme allows models that appear on the SEVS register, with compliance work by a registered workshop. The Personal Import Scheme allows a vehicle you have owned and used overseas for at least 12 months, if you are moving to Australia. You need approval before shipping, and non-compliant cars can be re-exported or destroyed at your expense.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Australia Car Import Duty Calculator — Duty, GST & Luxury Car Tax',
      description: 'Free calculator for Australian car import duty, GST and luxury car tax for 2026-27.',
      url: URL, inLanguage: 'en-AU', dateModified: '2026-10-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Australia', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Australia Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'AUD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorAustraliaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/tools/import-duty-calculator-countries" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/tools/import-duty-calculator-countries" className="hover:text-white/60 transition-colors">Import Duty Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇦🇺 Australia</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">LCT thresholds for 2026-27</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Australia Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to land that car in Australia?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the price, freight and where the car was built to see customs duty, GST, luxury car tax and whether the car can be imported at all.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Trade agreements and approval rules change, and several online guides disagree. Confirm origin, the import pathway and every figure with a licensed customs broker before you ship.
          </p>
        </div>
      </div>

      <ImportDutyAustraliaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Much Is Import Duty and Tax on a Car in Australia?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Australia charges three taxes on imported cars, and one approval step matters more than any of them. Customs duty is 5% of the free-on-board value for most cars, but it falls to zero for vehicles built in a free trade partner such as Japan, Korea, Thailand, the United States or China, and for any car that is at least 30 years old. GST of 10% is charged on the duty-paid value plus international freight and insurance. Luxury car tax of 33% applies only to the part of the value above a threshold. None of this matters, however, unless the car has an import approval first.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'General duty', rate: '5%', base: 'of FOB customs value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'FTA / 30+ years', rate: '0%', base: 'with proof or age', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'GST', rate: '10%', base: 'on duty-paid value + freight', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Luxury car tax', rate: '33%', base: 'above A$80,809', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
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
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Duty: Where 0% Applies</h2>
                <div className="space-y-3">
                  <p className={p}>Customs duty is worked out on the customs value, which for Australia is the free-on-board price, not the price including freight. The general rate on passenger vehicles is 5%.</p>
                  <p className={p}><strong className="text-foreground">Free trade partners:</strong> cars built in Japan (JAEPA), South Korea (KAFTA), Thailand (TAFTA), the United States (AUSFTA) and China (ChAFTA) can enter at 0% when you hold a valid proof of origin. Vehicles made in other CPTPP members, including Canada, Mexico and Vietnam, may also qualify. The United Kingdom agreement likewise removes the car tariff, although a minority of guides still show 5%.</p>
                  <p className={p}><strong className="text-foreground">European cars:</strong> Australia and the EU concluded a free trade agreement in March 2026 that will remove the 5% tariff on European-made passenger cars. It has not yet been ratified, so the 5% duty still applies today.</p>
                  <p className={p}><strong className="text-foreground">Classic cars:</strong> a passenger vehicle that is 30 years or older is duty-free. For a 2026 import that means a car built in 1996 or earlier. GST is still payable.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>GST on Imported Cars</h2>
                <div className="space-y-3">
                  <p className={p}>GST is 10% of the value of the taxable importation. That is the customs value plus the duty, plus international freight and insurance. Because freight and insurance are included, shipping costs raise your GST even though duty is charged on the free-on-board price alone.</p>
                  <p className={p}>GST is payable at the time of customs clearance, and GST-registered businesses can usually claim it back, which individuals cannot.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Luxury Car Tax in 2026-27</h2>
                <div className="space-y-3">
                  <p className={p}>The threshold for 2026-27 is A$80,809 for most cars and A$91,661 for fuel-efficient cars. Since 1 July 2025 a car is fuel-efficient only if its combined fuel consumption does not exceed 3.5 litres per 100 kilometres. That change removed many popular hybrids from the higher threshold.</p>
                  <p className={p}>The Tax Office formula for imports is the LCT value minus the threshold, multiplied by 10 over 11, multiplied by 33%. The LCT value includes the customs value, freight, insurance, duty and the GST on the import. The 10 over 11 step removes GST from the excess.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Worked Example 1: A 2015 Toyota Alphard From Japan</h2>
                <div className="space-y-2">
                  <p className={p}>The car costs A$20,000 FOB, with A$2,500 freight and A$300 insurance. With proof of origin under JAEPA the duty is nil. The taxable value is A$22,800 and GST is A$2,280, about 11.4% of the car’s price.</p>
                  <p className={p}>Without the proof of origin, duty at 5% adds A$1,000, taxable value rises to A$23,800 and GST becomes A$2,380. Total tax is A$3,380.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example 2: A New European Luxury Car</h2>
                <div className="space-y-2">
                  <p className={p}>A German-built car costs A$95,000 FOB with A$3,000 of freight and insurance. Duty at 5% is A$4,750, so the taxable value is A$102,750 and GST is A$10,275.</p>
                  <p className={p}>The LCT value is A$113,025. Against the A$80,809 threshold the luxury car tax is A$9,664.80. Total tax is A$24,689.80, around 26% of the FOB price.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Import Pathways and Approvals</h2>
                <div className="space-y-3">
                  <p className={p}>Every road vehicle needs a Vehicle Import Approval before it ships, applied for through the Government’s ROVER system under the Road Vehicle Standards Act. The application fee is commonly quoted at A$50 to A$100, and approval is typically valid for 12 months.</p>
                  <p className={p}><strong className="text-foreground">25-year rule:</strong> a car at least 25 years old, built in 2001 or earlier for a 2026 import, can use a simpler pathway.</p>
                  <p className={p}><strong className="text-foreground">SEVS:</strong> newer cars must be on the Specialist and Enthusiast Vehicle Scheme register and are modified by a registered workshop, which commonly costs thousands of dollars.</p>
                  <p className={p}><strong className="text-foreground">Personal Import Scheme:</strong> if you have owned and used the car overseas for at least 12 months and are moving to Australia, you can bring it in without a SEVS listing. The vehicle cannot be sold for 12 months.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Step-by-Step: Importing a Car to Australia</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm the car is eligible: 25-year rule, SEVS register or Personal Import Scheme.</li>
                  <li>Apply for the Vehicle Import Approval before you pay for shipping.</li>
                  <li>Obtain proof of origin if you want a free trade agreement rate.</li>
                  <li>Ship the car, clear customs through a broker and pay duty, GST and any luxury car tax.</li>
                  <li>Complete biosecurity inspection and any compliance work, then register the car with your state authority.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Common Mistakes to Avoid</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Shipping a car before the import approval is granted, which can lead to storage costs or forced re-export.</li>
                  <li>Assuming every free trade partner’s car is duty-free without proof of origin.</li>
                  <li>Forgetting that freight and insurance are part of the GST base.</li>
                  <li>Using the old 7 litre fuel-efficiency test for luxury car tax instead of 3.5 litres.</li>
                  <li>Expecting the Australia–EU agreement to apply before it has been ratified.</li>
                  <li>Leaving out compliance, broker, quarantine and stamp duty costs.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the Calculator Does Not Cover</h2>
                <p className={p}>State stamp duty and registration, compliance workshop costs and quarantine fees vary widely, so they are optional inputs. Anti-dumping duties, vehicles of unusual classification and concessions that depend on your personal circumstances need a broker’s review.</p>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: Australian Border Force and Australian Taxation Office guidance on importing goods and luxury car tax, the Customs Tariff Act 1995, the Road Vehicle Standards Act 2018 and the Australia–EU free trade agreement announcement. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
