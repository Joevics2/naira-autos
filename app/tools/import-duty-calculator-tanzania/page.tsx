import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyTanzaniaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-tanzania';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Tanzania Car Import Duty Calculator 2026 — TRA Duty, Excise, Age Excise & VAT',
  description: 'Free Tanzania car import calculator for 2026: 25% import duty, engine excise, the new 18%, 35% and 40% age excise from the Finance Act 2026, 18% VAT, railway levy and processing fee. Totals in shillings and dollars.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Tanzania Car Import Duty Calculator | Naira Autos',
    description: 'Estimate TRA duty, excise, VAT and the landed cost of importing a car into Tanzania.',
    url: URL, siteName: 'Naira Autos', locale: 'en_TZ', type: 'website',
  },
  keywords: [
    'tanzania car import duty calculator', 'TRA vehicle import tax 2026', 'tanzania age excise duty 18% 35% 40%',
    'import used car tanzania from japan cost', 'finance act 2026 tanzania used vehicles', 'tanzania 8 year old car import',
    'tanzania excise duty engine size 2000cc', 'railway development levy tanzania car', 'dar es salaam car clearing cost',
  ].join(', '),
};

const FAQ = [
  { q: 'How much is import duty on a car in Tanzania?', a: 'Import duty on passenger cars is 25% of the CIF value under the EAC Common External Tariff. On top of that you pay excise duty by engine size, an extra age excise on cars over eight years old, 18% VAT, the Railway Development Levy and a customs processing fee. For a typical eight-year-old or younger car these stack to roughly 55% to 60% of CIF.' },
  { q: 'What is the age excise duty on used cars in 2026?', a: 'The Finance Act 2026 charges an extra 18% for cars over 8 and up to 10 years old, 35% for over 10 and up to 20 years, and 40% beyond 20 years. Parliament cut the 8-to-10-year band to 18% from the 20% in the Finance Bill, and the previous rates were 15% and 30%. Age is counted from the year of manufacture, so for 2026 a car built in 2018 is still free of age excise, while a 2017 car is not.' },
  { q: 'Is there a maximum age for importing a car into Tanzania?', a: 'Several guides say Tanzania caps used cars at 8 years, others at 10, and one claims a strict 8-year ban. The TRA schedules I found do not ban older cars outright. They charge age excise, which makes older cars much more expensive. Many Japanese exporters apply their own 8-year limit, so check your seller. Treat any hard cap as unconfirmed until TRA or TBS confirms it for your vehicle.' },
  { q: 'How does engine size affect excise?', a: 'From 1 July 2026 the engine excise is 5% for cars up to 2,000cc, including cars up to 1,000cc that were previously exempt, and 10% above 2,000cc. Older guides show tiers of 0%, 10% and 15% or 25%, which do not match the current schedule. The excise is charged on CIF plus import duty.' },
  { q: 'How is VAT calculated on imported cars?', a: 'VAT is 18% on Mainland Tanzania and is charged on the CIF value plus import duty plus both excise amounts. The VAT Act adds every tax and levy except VAT to the customs value, so excise itself attracts VAT. In Zanzibar the rate is 15% and the rules differ, which this calculator does not cover.' },
  { q: 'What are the Railway Development Levy and the processing fee?', a: 'The Railway Development Levy is charged on the CIF value. The Railways Act text and many guides give 1.5%, while newer sources including a TRA booklet summary give 2%, so this calculator defaults to 2% and lets you change it. The customs processing fee was 0.6% of FOB value and the 2026/27 budget raised it to 1%. Both rates are editable here because sources disagree.' },
  { q: 'What is the difference between FOB and CIF?', a: 'FOB is the price of the car loaded at the exporting port. CIF adds the ocean freight and insurance to Dar es Salaam. TRA values the car on a CIF basis, using its own exchange rate and sometimes a reference price, so the invoice price you pay a Japanese exporter may not be the value TRA taxes.' },
  { q: 'Which costs does the calculator leave out?', a: 'It leaves out first registration fees, which sources put anywhere between TSh 50,000 and TSh 250,000, TBS inspection, port and clearing charges, insurance and any inland transport. Add them under other costs. It also covers Mainland Tanzania only.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Tanzania Car Import Duty Calculator — TRA Duty, Excise, Age Excise and VAT',
      description: 'Free calculator for Tanzanian import duty, excise, age excise, VAT and the landed cost of an imported car.',
      url: URL, inLanguage: 'en-TZ', dateModified: '2026-11-19',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Tanzania', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Tanzania Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorTanzaniaPage() {
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
              <span className="text-white/50">🇹🇿 Tanzania</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Finance Act 2026 age excise</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: November 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Tanzania Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">How much will TRA charge on the car you want to import?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the price, engine size and year of manufacture to see import duty, engine and age excise, VAT, the railway levy and the landed cost in shillings and dollars.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Tanzanian vehicle taxes changed on 1 July 2026 and many guides still show the 2025 rates. The railway levy and processing fee are editable because sources disagree. Confirm the assessment with a licensed clearing agent or TRA.
          </p>
        </div>
      </div>

      <ImportDutyTanzaniaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Tanzania taxes an imported car</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Tanzania builds the tax on an imported car in layers. Import duty of 25% is charged on the CIF value. Excise duty is then charged on CIF plus duty, and it has two parts that add together: one set by engine size and, for used cars over eight years old, a second set by age. Value-added tax of 18% is charged on the CIF value plus duty plus both excise amounts, so each layer is taxed again by the next. A railway levy on CIF and a customs processing fee on FOB complete the bill. Because the age excise can add 18%, 35% or 40% on top of everything, the year of manufacture often matters more than the engine.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Import duty', rate: '25%', base: 'of CIF value (EAC CET)', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Engine excise', rate: '5–10%', base: 'of CIF + duty, by cc', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Age excise', rate: '18–40%', base: 'cars over 8 years old', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/5', border: 'border-red-200 dark:border-red-500/20' },
                { label: 'VAT', rate: '18%', base: 'CIF + duty + excise', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
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
                <h2 className={h2} style={heading}>What changed on 1 July 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Age excise raised:</strong> the Finance Act 2026 lifts the age excise on used cars to 18% for over 8 and up to 10 years, 35% for over 10 and up to 20 years, and adds a 40% band above 20 years. The 8-to-10-year rate had been 15%, and the Finance Bill proposed 20% before Parliament settled on 18%.</p>
                  <p className={p}><strong className="text-foreground">Small engines:</strong> cars up to 1,000cc, previously exempt from excise, now pay 5%, the same as cars up to 2,000cc.</p>
                  <p className={p}><strong className="text-foreground">Processing fee:</strong> the 2026/27 budget raises the customs processing fee from 0.6% to 1%. Older guides still show 0.6%.</p>
                  <p className={p}><strong className="text-foreground">Age rule:</strong> age is measured from the year of manufacture. For an import landing in 2026, a car built in 2018 or later pays no age excise, while one built in 2017 or earlier does.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 1: a 2020 car with a 1,500cc engine</h2>
                <p className={p}>A car costs US$6,000 FOB with US$1,000 of freight and insurance. At TSh 2,600 to the dollar the CIF value is TSh 18,200,000. Import duty at 25% is TSh 4,550,000, and engine excise at 5% of TSh 22,750,000 is TSh 1,137,500. VAT at 18% of TSh 23,887,500 is TSh 4,299,750. With the 2% railway levy of TSh 364,000 and the 1% processing fee of TSh 156,000, taxes total TSh 10,507,250, or 57.7% of CIF. The landed cost is TSh 28,707,250.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 2: the same car built in 2016</h2>
                <p className={p}>A ten-year-old car with a 1,800cc engine and the same CIF pays the same duty and engine excise, plus 18% age excise on TSh 22,750,000, which is TSh 4,095,000. VAT rises to TSh 5,036,850, and total taxes reach TSh 15,339,350, or 84.3% of CIF. Moving from a 2018 to a 2017 car alone adds TSh 4,832,100.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 3: a 2013 car with a 2,500cc engine</h2>
                <p className={p}>A thirteen-year-old car with an engine above 2,000cc pays 10% engine excise of TSh 2,275,000 and 35% age excise of TSh 7,962,500. VAT is TSh 5,937,750, and total taxes come to TSh 21,245,250, which is 116.7% of CIF. The taxes exceed the car’s CIF value.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Example 4: how a Finance Bill rumour would have changed the bill</h2>
                <p className={p}>Using the 20% rate proposed in the Finance Bill for a ten-year-old car instead of the enacted 18% would add TSh 455,000 of excise on the same CIF, plus VAT on it, about TSh 536,900 in total. Always use the rate in the enacted Finance Act, which this calculator does.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Step-by-step: importing a car into Tanzania</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Choose the car and check its year of manufacture on the export certificate. The age excise depends on it.</li>
                  <li>Ask your exporter whether they will sell a car over eight years old, and get the pre-shipment conformity inspection done.</li>
                  <li>Ship to Dar es Salaam and appoint a licensed clearing agent to file the entry on TANCIS.</li>
                  <li>Pay duty, excise, VAT, the railway levy and the processing fee, and settle port charges separately.</li>
                  <li>Register the car with TRA and pay the first registration fee.</li>
                  <li>Insure the car before it goes on the road.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Common mistakes</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Counting age from first registration instead of the year of manufacture.</li>
                  <li>Using the 2025 age excise of 15% and 30%, which no longer apply.</li>
                  <li>Forgetting that VAT is charged on the excise as well.</li>
                  <li>Using the old engine tiers of 0%, 10% and 15%, or assuming small cars are excise-free.</li>
                  <li>Budgeting from the invoice price instead of TRA’s CIF assessment.</li>
                  <li>Leaving out the railway levy, the processing fee, registration and clearing costs.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the calculator doesn’t cover</h2>
                <p className={p}>It does not cover Zanzibar, new cars with special exemptions, electric or hybrid incentives, commercial vehicles, buses of ten or more passengers, motorcycles, diplomatic imports or returning-resident concessions. It also leaves out first registration fees, TBS inspection, port charges and insurance, which you can add under other costs. The railway levy and the processing fee are editable because published sources disagree on their current rates.</p>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: Tanzania Finance Act 2026 and the Excise (Management and Tariff) Act, TRA Taxes and Duties at a Glance 2025/26 as summarised by secondary sites, the EAC Common External Tariff, the VAT Act 2014, the Railways Act section 20A, and KPMG and PwC summaries of the 2026/27 budget. Last verified: November 2026.
          </p>
        </div>
      </div>
    </>
  );
}
