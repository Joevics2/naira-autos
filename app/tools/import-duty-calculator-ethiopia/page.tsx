import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyEthiopiaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-ethiopia';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Ethiopia Car Import Duty Calculator 2026 — EV Duty, Withholding & Landed Cost',
  description: 'Free Ethiopia car import calculator for 2026. Only battery-electric vehicles can be imported: 20% customs duty, 3% withholding tax, VAT, excise and surtax waived, RFID plate fee and landed cost in USD and birr.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Ethiopia Car Import Duty Calculator | Naira Autos',
    description: 'Estimate duty, withholding tax and the total landed cost of importing an electric car into Ethiopia.',
    url: URL, siteName: 'Naira Autos', locale: 'en_ET', type: 'website',
  },
  keywords: [
    'ethiopia car import duty calculator', 'ethiopia electric car import tax 2026', 'ethiopia ban on petrol cars import',
    'import car to ethiopia from djibouti', 'ethiopia ev customs duty 20%', 'erca vehicle import tax', 'ethiopia rfid plates cost',
    'ethiopia car import hybrid banned', 'how much tax import byd tesla ethiopia',
  ].join(', '),
};

const FAQ = [
  { q: 'Can I import a petrol, diesel or hybrid car into Ethiopia?', a: 'No. Since January 2024 Ethiopia has banned imports of internal-combustion vehicles, and current guidance applies the ban to hybrids, plug-in hybrids and fuel-powered assembly kits as well. Only pure battery-electric vehicles can be imported, and they must be left-hand drive.' },
  { q: 'How much import duty do electric cars pay in Ethiopia?', a: 'A fully built electric car pays 20% customs duty on its CIF value, plus 3% withholding tax. Value-added tax, excise tax and the 10% surtax are waived for battery-electric vehicles. A car with a CIF value of US$25,000 therefore pays US$5,000 in duty and US$750 in withholding tax.' },
  { q: 'Was the EV duty 15% or 20%?', a: 'Older sources, including a US government market report, give 15%. Ethiopia raised the rate on fully built electric vehicles to 20%, and the most recent import guides use 20%. This calculator uses 20% and you should confirm the current rate with a clearing agent.' },
  { q: 'What are the rates for semi- and completely-knocked-down kits?', a: 'Semi-knocked-down electric vehicles pay 5% customs duty and completely knocked-down kits pay 0%, to encourage local assembly. VAT, excise tax and surtax remain waived. Kits for petrol or diesel vehicles are banned.' },
  { q: 'What did combustion cars used to pay?', a: 'Before the ban, importers paid customs duty plus excise tax of up to 100% depending on engine size, 15% VAT, a 10% surtax and 3% withholding tax, which together could exceed several times the car’s import price. That is why electric cars became far cheaper than combustion cars.' },
  { q: 'How is the tax base calculated?', a: 'Duty and withholding tax are charged on the CIF value, meaning the price of the car plus freight and insurance to the port of entry. Use the exchange rate on the customs clearance date, because the birr floats and the rate can move between purchase and arrival.' },
  { q: 'How do I ship a car to Ethiopia?', a: 'Ethiopia is landlocked, so cars normally ship to the Port of Djibouti and are moved by truck or rail to a dry port such as Mojo. Sea freight commonly takes 20 to 35 days and is quoted at roughly US$1,000 to US$2,500, and customs clearance can add one to two weeks if the paperwork is correct.' },
  { q: 'What documents does customs ask for?', a: 'You need an importer ID and Tax Identification Number, the commercial invoice, the bill of lading, insurance records and electric-vehicle technical documents. The VIN must match across every document, and for a used EV a battery-health report is strongly advised. Customs may also check the Certificate of Conformity.' },
  { q: 'How much does registration cost?', a: 'The RFID “ETH” number plates are quoted at about ETB 44,500. The car must also pass a safety and battery inspection before plates are issued. Add the cost of home charging equipment, since public charging remains limited.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Ethiopia Car Import Duty Calculator — EV Duty, Withholding & Landed Cost',
      description: 'Free calculator for Ethiopian electric-car import duty, withholding tax and landed cost.',
      url: URL, inLanguage: 'en-ET', dateModified: '2026-10-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Ethiopia', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Ethiopia Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorEthiopiaPage() {
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
              <span className="text-white/50">🇪🇹 Ethiopia</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Electric vehicles only</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Ethiopia Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to bring an electric car into Ethiopia?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Ethiopia only allows battery-electric cars. Enter the price and freight to see duty, withholding tax, plate fees and the landed cost in dollars and birr.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Ethiopia changes vehicle rules by directive, and published guides disagree on the electric-car duty rate. Confirm the current 20% rate and your documents with a licensed clearing agent before you buy.
          </p>
        </div>
      </div>

      <ImportDutyEthiopiaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Much Is Import Duty on a Car in Ethiopia?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importing a car into Ethiopia in 2026 is only possible for battery-electric vehicles, and the tax bill is a fraction of what it used to be. In January 2024 the government banned imports of combustion-engine vehicles, and current guidance extends the ban to hybrids, plug-in hybrids and fuel-powered assembly kits. A fully built electric car pays 20% customs duty and 3% withholding tax on its CIF value. Value-added tax, excise tax and the 10% surtax that made petrol cars so expensive are waived for electric vehicles.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Customs duty (CBU EV)', rate: '20%', base: 'of CIF value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Withholding tax', rate: '3%', base: 'of CIF value', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT, excise, surtax', rate: '0%', base: 'waived for BEVs', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Petrol and hybrid', rate: 'Banned', base: 'since January 2024', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/5', border: 'border-red-200 dark:border-red-500/20' },
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
                <h2 className={h2} style={heading}>Why Only Electric Cars Can Be Imported</h2>
                <div className="space-y-3">
                  <p className={p}>Ethiopia imports all of its fuel and wanted to cut the foreign currency it spends on petroleum. In January 2024 it became the first country to ban imports of internal-combustion vehicles, and it paired the ban with generous tax incentives for electric cars supported by cheap hydropower from the Grand Ethiopian Renaissance Dam. Customs now rejects hybrids and plug-in hybrids, and the rule covers kits for petrol or diesel vehicles, so importing parts for later assembly does not get around it.</p>
                  <p className={p}>The car must also be left-hand drive, with a VIN that matches the invoice, bill of lading and title. For a used electric car, a certified battery-health report is strongly recommended because replacement batteries can be expensive and hard to source locally.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>The Tax Stack for Electric Vehicles</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Customs duty:</strong> 20% of CIF for fully built cars. Semi-knocked-down vehicles pay 5% and completely knocked-down kits pay 0%, which is meant to support the nine or so local assemblers.</p>
                  <p className={p}><strong className="text-foreground">Withholding tax:</strong> 3% of CIF, collected at the border. Registered businesses can credit it against income tax, but private buyers cannot.</p>
                  <p className={p}><strong className="text-foreground">Waived taxes:</strong> VAT of 15%, the excise tax that ran from 5% to 100% for combustion cars, and the 10% surtax are all zero for battery-electric vehicles.</p>
                  <p className={p}><strong className="text-foreground">Duty rate history:</strong> electric-car duty was 15% for a time. Capital Market Ethiopia reported the increase to 20%, and the latest 2026 import guides use 20%. Some websites still show 15%, so treat older figures with caution.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>What Combustion Cars Used to Pay</h2>
                <p className={p}>Before the ban, an importer paid customs duty plus excise tax of up to 100% by engine size, 15% VAT, a 10% surtax and 3% withholding tax, along with an age-based penalty because cars over eight years old were heavily restricted. Observers estimated that the combined burden could be several times the car’s import price, which fuelled smuggling. For electric cars the same stack shrinks to duty and withholding tax alone.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Worked Example 1: A US$25,000 Electric SUV</h2>
                <div className="space-y-2">
                  <p className={p}>A fully built electric SUV has a CIF value of US$25,000. Customs duty at 20% is US$5,000 and withholding tax at 3% is US$750, so taxes total US$5,750, or 23% of the CIF value.</p>
                  <p className={p}>If clearance, port, inland transport and broker fees come to about US$3,500, the landed cost is roughly US$34,250 before registration.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example 2: A US$35,000 Sedan and a Kit</h2>
                <div className="space-y-2">
                  <p className={p}>A US$35,000 sedan pays US$7,000 in duty and US$1,050 in withholding tax, a total of US$8,050. With the same US$3,500 of local costs the landed cost is about US$46,550.</p>
                  <p className={p}>A semi-knocked-down kit with a CIF value of US$20,000 would pay only 5% duty, US$1,000, plus US$600 of withholding tax. That gap between 20% and 5% is why assembly kits are so attractive to local firms.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Shipping and Clearance</h2>
                <div className="space-y-3">
                  <p className={p}>Because Ethiopia is landlocked, cars normally enter through the Port of Djibouti and travel inland by truck or rail to a dry port, most commonly Mojo. Sea freight takes about 20 to 35 days and is quoted at roughly US$1,000 to US$2,500 depending on the origin and on whether you use roll-on roll-off or a container.</p>
                  <p className={p}>A clearing agent files the declaration with the Ethiopian Revenue and Customs Authority, which values the car on a CIF basis. Once you pay, you receive a customs clearance certificate that you need for registration.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Step-by-Step: Importing an Electric Car to Ethiopia</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm the car is a pure battery-electric, left-hand-drive vehicle.</li>
                  <li>Collect the importer ID, tax identification number, invoice, technical documents and battery report.</li>
                  <li>Ship to Djibouti and arrange inland delivery to a dry port.</li>
                  <li>Have a clearing agent file with customs and pay duty and withholding tax.</li>
                  <li>Pass the safety and battery inspection, register the vehicle and collect the RFID plates.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Common Mistakes to Avoid</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Buying a hybrid or plug-in hybrid on the assumption it counts as electric. It is banned.</li>
                  <li>Buying a right-hand-drive car, which cannot be registered.</li>
                  <li>Quoting the old 15% duty or the pre-ban tax stack.</li>
                  <li>Undervaluing the invoice, which risks penalties and audits.</li>
                  <li>Forgetting that the birr floats and the cost in local currency can change before clearance.</li>
                  <li>Leaving out inland transport, broker fees and the plate fee.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the Calculator Does Not Cover</h2>
                <p className={p}>The calculator does not model exemptions for diplomats, returning residents or special projects, or any sector-specific concessions, which are decided case by case. Insurance, charging equipment and the inspection fee are also outside the total.</p>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: Ethiopian Revenue and Customs Authority guidance, the US Commercial Service market intelligence on Ethiopia’s automotive and EV market, Capital Market Ethiopia reporting on the EV duty change and 2026 electric-vehicle import guides. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
