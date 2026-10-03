import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyUsaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-usa';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'USA Car Import Duty Calculator 2026 — Tariffs, Section 232 & Fees',
  description: 'Free US car import duty calculator for 2026. Work out the 2.5% base duty, Section 232 auto tariffs by country (EU, Japan, Korea, UK, Canada, Mexico), Section 301 duties, MPF and HMF, plus the 25-year DOT and 21-year EPA rules.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'USA Car Import Duty Calculator | Naira Autos',
    description: 'Estimate US tariffs, customs fees and the total cost of importing a car into the United States, new or used.',
    url: URL, siteName: 'Naira Autos', locale: 'en_US', type: 'website',
  },
  keywords: [
    'usa car import duty calculator', 'import duty on cars usa 2026', 'section 232 car tariff calculator',
    'how much tax to import a car to the us', 'import car from japan to usa cost', '25 year rule import calculator',
    'jdm import duty 2026', 'car tariff by country', 'mpf hmf car import', 'chicken tax pickup truck 25%',
  ].join(', '),
};

const FAQ = [
  { q: 'How much is the import duty on a car in the USA in 2026?', a: 'The base duty is 2.5% for cars, SUVs and minivans and 25% for pickups and light trucks. Most newer vehicles also pay a 25% Section 232 automobile tariff, so the typical total is 27.5% on a car and 50% on a light truck, reduced by trade deals to 15% for cars from the EU, Japan and South Korea and to 10% for UK cars inside a yearly quota.' },
  { q: 'Do used cars pay the Section 232 tariff?', a: 'Yes. Customs treats used passenger vehicles and trucks the same as new ones. The one age exception counts calendar years: a vehicle made at least 25 years before the year of entry pays no Section 232 duty. For an entry in 2026 that means a 2001 model or older, which is different from the DOT rule that counts from the month of manufacture.' },
  { q: 'What is the 25-year rule for importing cars into the US?', a: 'A vehicle that is at least 25 years old, measured from its month and year of manufacture, can be imported without meeting US Federal Motor Vehicle Safety Standards. You declare it on DOT form HS-7. The rule waives the safety requirement, not the tax: the car still pays customs duty and fees.' },
  { q: 'What is the EPA 21-year rule?', a: 'Emissions are regulated by a separate agency with a separate clock. A vehicle at least 21 years old and in its original configuration is exempt from EPA requirements, declared with code E on EPA form 3520-1. An engine swap from a different donor can void the exemption.' },
  { q: 'Which country pays the lowest tariff on cars?', a: 'South Korea, Japan and the EU pay 15% in total on cars, and UK cars pay 10% inside a quota of 100,000 vehicles a year. Qualifying Canadian and Mexican vehicles under USMCA are free of base duty, and the 25% tariff can apply only to non-US content with Commerce Department approval. Everyone else pays 27.5% on a car.' },
  { q: 'Are Chinese cars tariffed differently?', a: 'Yes. Cars of Chinese origin pay the base duty, the 25% Section 232 tariff and an extra 25% Section 301 duty, which is 52.5% in total. Plug-in hybrids and electric cars of Chinese origin face a 100% Section 301 duty instead, for roughly 127.5% in total.' },
  { q: 'What happened to the IEEPA tariffs?', a: 'The Supreme Court held on 20 February 2026 that the International Emergency Economic Powers Act does not authorize tariffs, and those duties ended. A temporary 10% global surcharge followed and expired on 24 July 2026, when new Section 301 forced-labor duties of 10% or 12.5% began for 60 economies. Section 232 auto tariffs were never part of the IEEPA ruling.' },
  { q: 'Is a SUV taxed as a car or a truck?', a: 'Classification follows how the vehicle is designed. Vehicles built mainly to carry people, including most SUVs and minivans, fall under heading 8703 at 2.5%. Vehicles designed to carry goods, such as pickups and some cargo vans, fall under heading 8704 at 25%, the so-called chicken tax.' },
  { q: 'What fees apply on top of duty?', a: 'Customs charges a merchandise processing fee of 0.3464% of value, with a minimum of $34.58 and a maximum of $670.86 from 1 October 2026, and a 0.125% harbor maintenance fee on ocean shipments. A gas guzzler tax from the IRS can apply to cars rated below 22.5 mpg. State sales tax, title and registration are separate.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'USA Car Import Duty Calculator — Tariffs, Section 232 & Fees',
      description: 'Free calculator for US car import duty, Section 232 tariffs by country, Section 301 duties and CBP fees.',
      url: URL, inLanguage: 'en-US', dateModified: '2026-10-03',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'United States', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'USA Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorUsaPage() {
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
              <span className="text-white/50">🇺🇸 United States</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Section 232 + Section 301 rates</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              USA Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to bring that car into the United States?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Pick the vehicle and country of manufacture to see base duty, Section 232 and Section 301 tariffs, customs fees and whether the car is legal to import at all.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> US tariff policy has changed repeatedly since 2025 and can change again without notice. Confirm classification, origin and the current rate with a licensed customs broker before you ship.
          </p>
        </div>
      </div>

      <ImportDutyUsaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Much Is Import Duty on a Car in the USA?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importing a car into the United States in 2026 means paying up to three layers of duty plus two small customs fees. The base duty comes from the Harmonized Tariff Schedule and is 2.5% for cars, SUVs and minivans but 25% for pickups and light trucks. On top of that, most vehicles pay the Section 232 automobile tariff, a 25% national-security duty introduced in April 2025. Some countries also pay a Section 301 duty, and every ocean shipment pays a harbor maintenance fee. This calculator stacks those layers for you, using the country where the car was built, its age and its type.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Base duty (car)', rate: '2.5%', base: 'HTSUS heading 8703', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Light trucks', rate: '25%', base: 'the “chicken tax”', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Section 232', rate: '25%', base: 'most countries', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'EU / Japan / Korea', rate: '15%', base: 'total on cars', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className={h2} style={heading}>Section 232 Tariffs by Country</h2>
                <div className="space-y-3">
                  <p className={p}>The country of origin is where the vehicle was manufactured, not where you bought it. A Toyota built in Japan and bought in Australia is still Japanese for tariff purposes, and a BMW built in South Carolina is American even if it sits in a German showroom.</p>
                  <p className={p}><strong className="text-foreground">European Union, Japan and South Korea:</strong> 15% in total on cars. For EU and Japanese cars that figure already includes the 2.5% base duty. Korean cars enter free of base duty under KORUS, so the full 15% is the Section 232 line. Light trucks from all three stay at 25%.</p>
                  <p className={p}><strong className="text-foreground">United Kingdom:</strong> 10% in total on cars inside a quota of 100,000 vehicles a year, released at 25,000 per quarter. After the quota fills, the full 27.5% applies. UK light trucks pay 50%.</p>
                  <p className={p}><strong className="text-foreground">Canada and Mexico:</strong> vehicles that qualify under USMCA are free of base duty, and with Commerce Department approval the 25% applies only to the non-US content. Non-qualifying vehicles pay 27.5%.</p>
                  <p className={p}><strong className="text-foreground">China:</strong> 2.5% base, 25% Section 232 and an extra 25% Section 301, or 100% Section 301 for plug-in hybrids and electric cars.</p>
                  <p className={p}><strong className="text-foreground">Everyone else:</strong> 27.5% on cars and 50% on light trucks.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example 1: 2021 Porsche 911 From Germany</h2>
                <div className="space-y-2">
                  <p className={p}>A US-specification 2021 Porsche 911 priced at $90,000 arrives by sea. Because Germany is in the EU, the total tariff is 15%: $2,250 of base duty plus $11,250 of Section 232, or $13,500.</p>
                  <p className={p}>The merchandise processing fee is 0.3464% of value, $311.76, and the harbor maintenance fee is 0.125%, $112.50. The total paid to customs is $13,924.26, about 15.5% of the car’s price.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example 2: A 2000 JDM Import From Japan</h2>
                <div className="space-y-2">
                  <p className={p}>A $30,000 car built in 2000 is more than 25 calendar years old in 2026, so it pays no Section 232 duty. Instead the Section 301 forced-labor duty applies, and for Japan the combined duty is capped at 12.5%, which is $3,750.</p>
                  <p className={p}>Add a $103.92 merchandise processing fee and a $37.50 harbor maintenance fee, and the total paid to customs is $3,891.42. That is roughly 13% of the price, only slightly below the 15% ($4,500) that a newer Japanese-built car would pay, because Japan’s trade deal and the forced-labor cap sit close together. For most other countries the age exception is worth far more.</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>The 25-Year Rule, the 21-Year Rule and Why Age Matters Twice</h2>
                <div className="space-y-3">
                  <p className={p}>Two different age tests apply, and mixing them up is the most common and costly mistake importers make. The first test is about safety. A vehicle that is at least 25 years old, counted from its month and year of manufacture, is exempt from US Federal Motor Vehicle Safety Standards, which you declare on DOT form HS-7. A car built in October 2001 therefore becomes importable in October 2026, not in January.</p>
                  <p className={p}>The second test is about emissions. The EPA exempts a vehicle that is at least 21 years old and still in its original configuration, declared with code E on EPA form 3520-1. An engine swap can void it.</p>
                  <p className={p}>The third age test is about money. The Section 232 exception counts calendar years, not months: it applies to a vehicle made at least 25 years before the year of entry. For an entry in 2026, a 2001 model qualifies for the tariff exception even though it may not reach the 25-year safety mark until later in the year.</p>
                  <p className={p}>Cars younger than 25 years that were not built to US standards normally need a DOT Registered Importer to bring them into conformity, which importers commonly cite at $10,000 to $30,000 plus a bond of 150% of the vehicle’s value. A narrow Show or Display program exists for historically significant vehicles, but approval is slow and selective.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Step-by-Step: Importing a Car to the United States</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm the car is admissible: US-specification labels, the 25-year safety rule, the 21-year emissions rule, or a Registered Importer plan.</li>
                  <li>Establish the country of manufacture and classify the vehicle as a car (8703) or a truck (8704).</li>
                  <li>Arrange a licensed customs broker and a customs bond, then file the entry with forms HS-7 and 3520-1.</li>
                  <li>Pay duty, the merchandise processing fee and, for ocean freight, the harbor maintenance fee.</li>
                  <li>Collect the released vehicle, then title and register it in your state and pay state taxes.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>What Changed in 2025 and 2026</h2>
                <div className="space-y-3">
                  <p className={p}>US auto tariffs have been rewritten several times. The 25% Section 232 duty on vehicles took effect on 3 April 2025. Country deals followed for Japan, the EU, South Korea and the UK. The Supreme Court then ruled on 20 February 2026 that emergency powers cannot be used to impose tariffs, ending the IEEPA duties. A temporary global surcharge followed and expired on 24 July 2026, replaced by the Section 301 forced-labor duties of 10% or 12.5% on 60 economies.</p>
                  <p className={p}>Vehicles that pay Section 232 are exempt from the forced-labor duty, but older cars that qualify for the age exception are not. That is why the calculator shows a Section 301 line for classic imports.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the Calculator Does Not Cover</h2>
                <p className={p}>State sales tax, title and registration fees, the IRS gas guzzler tax, broker fees and bond costs are outside the customs total unless you enter them. Motorcycles, trailers and heavy trucks follow different rules and are not modelled. Anti-dumping duties, antiquities-style collectors’ classifications and unusual origin cases need a broker’s review.</p>
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: the Harmonized Tariff Schedule, Customs and Border Protection Section 232 guidance, USTR’s Section 301 forced-labor action, the Congressional Research Service and NHTSA and EPA import rules. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
