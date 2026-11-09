import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyPhilippinesClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-philippines';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Philippines Car Import Duty Calculator 2026 — Customs Duty, Excise Tax & VAT',
  description: 'Free Philippines car import calculator for 2026: 30% customs duty, TRAIN excise tax brackets, 12% VAT, 0% duty for ASEAN and electric cars, hybrids at half excise, and the No-Dollar Importation rules for used cars. Totals in pesos and dollars.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Philippines Car Import Duty Calculator | Naira Autos',
    description: 'Estimate customs duty, excise tax, VAT and the total landed cost of importing a car into the Philippines.',
    url: URL, siteName: 'Naira Autos', locale: 'en_PH', type: 'website',
  },
  keywords: [
    'philippines car import duty calculator', 'import car to philippines cost 2026', 'philippines automobile excise tax brackets',
    'no dollar importation car philippines', 'balikbayan car import tax', 'philippines ev import duty 0 2028',
    'bureau of customs car duty 30%', 'import car from japan to philippines tax', 'atiga form d car philippines',
  ].join(', '),
};

const FAQ = [
  { q: 'What taxes do you pay when importing a car into the Philippines?', a: 'Three layers stack. Customs duty is 30% of the dutiable value for cars with nine seats or fewer and 20% for ten or more. The automobile excise tax is then charged on the landed cost at 4%, 10%, 20% or 50% depending on its size. Finally, 12% VAT applies to the landed cost plus the excise tax. Small Bureau of Customs processing and stamp fees are added, and arrastre, wharfage and brokerage are paid separately.' },
  { q: 'Can I import a used car into the Philippines?', a: 'Only in narrow cases. Executive Order 156, as amended by EO 877-A, bans used motor vehicles except under programmes such as No-Dollar Importation for returning Filipinos and other qualified individuals, diplomats, and certain trucks, buses and special-purpose vehicles. You need a Certificate of Authority to Import from the DTI before shipping. A used car without one can be seized.' },
  { q: 'Who qualifies for the No-Dollar Importation programme?', a: 'A Filipino citizen who has lived abroad for at least one year within the three years before applying, and holders of certain immigrant or retirement visas such as 13A, 13G, SRR and the Balik-Scientist visa. The car must be left-hand drive, weigh no more than 3,000 kg, be registered in your name for at least six months, and cannot be resold for three years. It is a one-time privilege.' },
  { q: 'Is there an age limit of 10 years for used cars?', a: 'Several import guides say so, but the DTI and Bureau of Customs requirements I found do not list an age limit. They set weight, drive side, ownership and registration conditions instead. Treat the 10-year claim as unconfirmed and ask the DTI Fair Trade Enforcement Bureau before you ship.' },
  { q: 'How is the excise tax calculated?', a: 'Under the TRAIN law the rate is a flat percentage set by price bracket: 4% up to ₱600,000, 10% up to ₱1 million, 20% up to ₱4 million and 50% above that. For an imported car that is not for sale, the base is the total landed value, including the transaction value, the customs duty and other charges. Older guides still show the pre-2018 brackets of 2% to 60%, which no longer apply.' },
  { q: 'Are electric cars and hybrids cheaper to import?', a: 'Yes. Battery-electric cars are exempt from the excise tax, and executive orders 12 and 62 cut their duty to 0% until 31 January 2028. Hybrid cars pay half the applicable excise rate, and the same orders extend zero duty to hybrid and plug-in hybrid cars, although one source lists selected plug-in hybrids at 5%. Pickups are also exempt from the excise tax.' },
  { q: 'Do ASEAN cars really pay no duty?', a: 'Cars that qualify as ASEAN-origin under ATIGA enter at 0% duty when you present a Form D, which generally needs at least 40% regional value content. You still pay excise tax and VAT. For RCEP, JPEPA, Korea or China agreements, the car tariff lines have their own rates, so this calculator lets you enter the preferential rate yourself.' },
  { q: 'Is the freight part of the taxable value?', a: 'Yes. The dutiable value is the CIF value: the price of the car plus freight and insurance to the Philippine port. Duty, excise and VAT all build on that figure, so shipping costs are taxed three times over.' },
  { q: 'Which customs fees are added?', a: 'The Import Processing Charge for dutiable values above ₱750,000 is ₱2,000 under the 2025 Customs Administrative Order, plus ₱100 customs documentary stamp and ₱30 BIR stamp. Older Bureau of Customs web pages still show ₱250 to ₱1,000, but the newer schedule is what the calculator uses.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Philippines Car Import Duty Calculator — Duty, Excise Tax, VAT and Landed Cost',
      description: 'Free calculator for Philippine customs duty, TRAIN excise tax, VAT and the landed cost of an imported car.',
      url: URL, inLanguage: 'en-PH', dateModified: '2026-10-16',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Philippines', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Philippines Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorPhilippinesPage() {
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
              <span className="text-white/50">🇵🇭 Philippines</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">TRAIN excise brackets</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Philippines Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much do duty, excise tax and VAT add to an imported car?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the price and freight to see customs duty, excise tax, VAT and the landed cost in pesos and dollars, for new cars and for used cars under the No-Dollar Importation programme.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Preferential duty for Japan, Korea and China depends on the tariff line, so enter the rate yourself. Confirm the assessment with a licensed customs broker or the Bureau of Customs before you buy.
          </p>
        </div>
      </div>

      <ImportDutyPhilippinesClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How the Philippines taxes an imported car</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importing a car into the Philippines stacks three taxes, and each is calculated on top of the last. Customs duty is charged on the CIF value, which is the price plus freight and insurance. The automobile excise tax, which the Bureau of Customs calls the ad valorem tax, is charged on the landed cost, meaning the dutiable value plus duty and customs charges. Value-added tax of 12% then applies to the landed cost plus the excise tax. Because of this compounding, an ordinary petrol car from Japan can end up costing nearly twice its CIF price.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Customs duty (≤ 9 seats)', rate: '30%', base: 'of CIF value; 20% for 10+ seats', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Excise tax', rate: '4–50%', base: 'by landed-cost bracket', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT', rate: '12%', base: 'landed cost + excise', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'EVs and ASEAN cars', rate: '0%', base: 'duty, with Form D or until 2028', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className={h2} style={heading}>What changed in 2025 and 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Zero duty for EVs until January 2028:</strong> Executive Orders 12 and 62 hold the duty on battery-electric cars at 0% through 31 January 2028 and extend zero duty to hybrid and plug-in hybrid cars. Industry groups have asked for an extension beyond 2028, and the DTI says it will review it, so nothing is confirmed.</p>
                  <p className={p}><strong className="text-foreground">Customs fees:</strong> the Bureau of Customs replaced its old fee schedule in 2025. The import processing charge now climbs to ₱2,000 for high-value entries, which includes every car above ₱750,000.</p>
                  <p className={p}><strong className="text-foreground">RCEP:</strong> the agreement keeps zero or existing preferential rates for most goods, but the Philippines phases some lines, for example 10% falling to 5% on 1 April 2026 for certain electronics. Check the tariff line of your car before claiming a rate.</p>
                  <p className={p}><strong className="text-foreground">Excise tax:</strong> the TRAIN brackets have not changed since 2018. Many websites still quote the old 2% to 60% schedule or invented engine-displacement tiers.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 1: a new petrol sedan from Japan</h2>
                <p className={p}>A car costs US$15,000 with US$1,000 of freight and insurance. At ₱56.25 to the dollar the CIF value is ₱900,000. Duty at 30% is ₱270,000. Adding ₱2,130 of fees gives a landed cost of ₱1,172,130, which falls in the 20% excise bracket and pays ₱234,426. VAT at 12% of ₱1,406,556 is ₱168,786.72. Taxes and fees total ₱675,342.72, which is 75% of the CIF value, so the car lands at ₱1,575,342.72.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 2: the same car built in Thailand</h2>
                <p className={p}>With a Form D, duty drops to zero and the landed cost is ₱902,130. That sits in the 10% bracket, so excise is ₱90,213, and VAT on ₱992,343 is ₱119,081.16. Taxes and fees come to ₱211,424.16, or 23.5% of CIF, for a total of ₱1,111,424.16. The origin certificate saves about ₱464,000 on this car.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 3: battery-electric versus hybrid</h2>
                <p className={p}>Take a ₱1,500,000 CIF car. As a battery-electric model it pays no duty and no excise, so only VAT applies: 12% of ₱1,502,130 is ₱180,255.60, and taxes plus fees are ₱182,385.60. As a hybrid it also pays no duty, but half the 20% excise rate applies, which is 10% or ₱150,213, and VAT rises to ₱198,281.16. Its taxes and fees are ₱350,624.16, nearly double the EV’s.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 4: a three-year-old car via No-Dollar Importation</h2>
                <p className={p}>A returning resident ships a three-year-old car worth ₱800,000 CIF. The Bureau of Customs table cuts 30% off, leaving a dutiable value of ₱560,000. Duty at 30% is ₱168,000 and fees are ₱1,630, so the landed cost is ₱729,630. Excise at 10% is ₱72,963 and VAT is ₱96,311.16. The total of taxes and fees is ₱338,904.16, or 42.4% of CIF.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Step-by-step: importing a car into the Philippines</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm the car is left-hand drive. For a used car, check that you qualify for the No-Dollar Importation programme.</li>
                  <li>For a used car, apply to the DTI Fair Trade Enforcement Bureau for a Certificate of Authority to Import before you ship.</li>
                  <li>Ship to a Philippine port and appoint a licensed customs broker to file the goods declaration.</li>
                  <li>Claim a preferential rate, if any, with the correct certificate of origin, such as Form D for ASEAN, filed at the time of entry.</li>
                  <li>Pay duty, excise tax, VAT and fees, then settle arrastre, wharfage and brokerage separately.</li>
                  <li>Register the car with the LTO after the Bureau of Customs releases it.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Common mistakes</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Shipping a used car without a Certificate of Authority to Import, which leads to seizure.</li>
                  <li>Using the old 2018 and earlier excise schedule or engine-size tiers.</li>
                  <li>Forgetting that VAT is charged on the excise tax as well.</li>
                  <li>Claiming ASEAN or RCEP rates without the right certificate of origin at entry.</li>
                  <li>Assuming a hybrid is duty-free and tax-free like an EV. Hybrids still pay half the excise.</li>
                  <li>Ignoring the end date of the EV duty exemption, 31 January 2028.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the calculator doesn’t cover</h2>
                <p className={p}>It does not cover Subic and Clark freeport imports, diplomatic vehicles, trucks, buses and special-purpose vehicles, motorcycles, or cars imported for resale by dealers, whose excise base is the net manufacturer’s selling price rather than landed cost. It also omits LTO registration, emission tests, insurance, arrastre, wharfage and brokerage unless you add them under other charges, and it cannot check your car’s exact tariff line.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Frequently asked questions</h2>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: Bureau of Customs motor vehicle FAQ and customs fee schedules, DTI Fair Trade Enforcement Bureau import authority requirements, Executive Orders 156, 877-A, 12 and 62, Customs Modernization and Tariff Act, RA 10963 (TRAIN) and Revenue Regulations 5-2018, the BOC depreciation schedule under CAO 07-2014, and ATIGA origin rules. Last verified: October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
