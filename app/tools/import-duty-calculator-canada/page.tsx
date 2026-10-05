import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyCanadaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-canada';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Canada Car Import Duty Calculator 2026 — Duty, Surtax, GST & RIV',
  description: 'Free Canada car import calculator for 2026. Work out 6.1% duty, the 25% US-vehicle surtax, GST, provincial tax, the C$325 RIV fee, luxury tax and Green Levy, plus the 15-year rule. Updated after the September 2026 surtax order.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Canada Car Import Duty Calculator | Naira Autos',
    description: 'Estimate duty, the US counter-tariff surtax, GST, provincial tax and RIV fees for importing a car into Canada.',
    url: URL, siteName: 'Naira Autos', locale: 'en_CA', type: 'website',
  },
  keywords: [
    'canada car import duty calculator', 'import car from us to canada cost 2026', 'canada us vehicle surtax 25%',
    'riv fee canada', '15 year rule canada import car', 'import car from japan to canada cpptp',
    'gst on imported car canada', 'canada chinese ev quota 6.1%', 'canada luxury tax vehicles 100000',
  ].join(', '),
};

const FAQ = [
  { q: 'How much does it cost to import a car into Canada in 2026?', a: 'Costs are layered. Duty is 6.1% unless a trade agreement applies, 25% surtax on 85% of value for US-built vehicles, 5% GST on the total, provincial tax at registration, a C$325 plus GST RIV fee for cars under 15 years old, and a C$100 air-conditioning tax. A US-built vehicle valued at C$50,000 typically adds about C$18,000 in Ontario.' },
  { q: 'Does the 25% US counter-tariff apply to personal imports?', a: 'Yes. The Canada Border Services Agency applies the surtax to US-origin vehicles imported by individuals. For personal imports the 25% is charged on 85% of the value for duty, which assumes 15% Canadian or Mexican content. On a C$50,000 vehicle that is C$10,625. Cars built outside the US, such as a German-built BMW bought in America, are not hit by it.' },
  { q: 'What changed on 8 September 2026?', a: 'Canada replaced its earlier surtax orders with the United States Surtax Order (2026), a response to US Section 338 tariffs on Canadian goods. It sets surtax rates of 15%, 25% or 50% depending on the product schedule. The CBSA’s own guidance for personal vehicle imports still shows 25% on 85% of the vehicle’s value, but rates can change again with little notice.' },
  { q: 'What is the 15-year rule?', a: 'A vehicle at least 15 years old, counted from its month and year of manufacture, is exempt from the Registrar of Imported Vehicles program and from Transport Canada’s safety standards. There is no RIV fee or inspection for these vehicles, which is why 15-year-old Japanese and American cars are popular imports. Duty, surtax if US-built, and GST still apply.' },
  { q: 'Can I import any used car from the US?', a: 'No. A vehicle under 15 years old must be on the RIV list of admissible vehicles, which is mostly US-market models that Transport Canada has cleared. A car originally built for the European or Asian market and later shipped to the US is generally not admissible until it reaches 15 years. Open safety recalls must be cleared and documented before you cross.' },
  { q: 'Are Japanese, Korean and European cars duty-free?', a: 'Often, with proof of origin. Japanese-built cars enter free under the CPTPP, South Korean cars have been duty-free since the Canada–Korea agreement phased out the tariff, and EU and UK-built cars qualify under CETA and the UK trade continuity agreement. Without valid proof of origin the standard 6.1% applies. GST and provincial tax are still charged.' },
  { q: 'What about Chinese electric vehicles?', a: 'Since 1 March 2026 Canada allows up to 49,000 Chinese-built EVs a year at the 6.1% MFN rate instead of the 100% surtax introduced in 2024, but only with an import permit under the quota. Vehicles outside the quota still face the 100% surtax, so the practical cost differs by an enormous margin.' },
  { q: 'Is there a luxury tax on imported cars?', a: 'Yes. Vehicles with a taxable amount above C$100,000 pay the lesser of 10% of the taxable amount or 20% of the amount over C$100,000. Canada repealed the luxury tax on aircraft and boats in November 2025, but kept it on cars. GST is then charged on the luxury tax as well.' },
  { q: 'Who collects the provincial sales tax?', a: 'The CBSA collects the 5% GST at the border. Provincial sales tax, or the provincial part of HST, is generally paid when you register the vehicle at the provincial registry. Alberta charges none, Ontario charges the 8% provincial HST portion and Quebec charges 9.975% QST, while British Columbia’s PST rises with the price of the vehicle.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Canada Car Import Duty Calculator — Duty, Surtax, GST & RIV',
      description: 'Free calculator for Canadian car import duty, the US vehicle surtax, GST, provincial tax and RIV fees.',
      url: URL, inLanguage: 'en-CA', dateModified: '2026-10-03',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Canada', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Canada Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorCanadaPage() {
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
              <span className="text-white/50">🇨🇦 Canada</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Includes 8 Sep 2026 surtax order</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Canada Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to bring that car into Canada?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Pick where the car was built and how old it is to see duty, the US surtax, GST, provincial tax, the RIV fee and whether it can be imported at all.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Canada’s counter-tariffs have been revised repeatedly since April 2025 and a formal review of the trade agreement with the US began on 1 July 2026. Confirm the current surtax with CBSA or a customs broker before you buy.
          </p>
        </div>
      </div>

      <ImportDutyCanadaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Much Is Import Duty on a Car in Canada?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Bringing a car into Canada means paying several separate charges, and which ones apply depends mostly on where the vehicle was built. The base customs duty on passenger vehicles is 6.1%, but most imports avoid it through a trade agreement. The big variable in 2026 is a surtax on US-built vehicles that Canada introduced in response to American tariffs. After that come 5% GST, provincial tax, small federal excise taxes, and a Registrar of Imported Vehicles fee for newer cars. This calculator adds them in the order the Canada Border Services Agency does.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Standard duty', rate: '6.1%', base: 'MFN rate on cars', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'US-built surtax', rate: '25%', base: 'of 85% of value', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'GST', rate: '5%', base: 'on value + duty + surtax', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'RIV fee', rate: 'C$325', base: 'plus GST, under 15 years', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className={h2} style={heading}>Duty by Country of Origin</h2>
                <div className="space-y-3">
                  <p className={p}>Canada looks at where the vehicle was manufactured, which it reads from the VIN, not at where you bought it or where it was last registered.</p>
                  <p className={p}><strong className="text-foreground">United States and Mexico:</strong> vehicles built in either country are duty-free under the Canada–United States–Mexico Agreement. For US-built vehicles the surtax described below then applies.</p>
                  <p className={p}><strong className="text-foreground">Japan:</strong> Japanese-built cars can enter free under the CPTPP when you file a certificate of origin. Some importers report that mini trucks are reduced only partially, so check the tariff line for the exact model.</p>
                  <p className={p}><strong className="text-foreground">South Korea:</strong> the 6.1% duty on Korean-built cars was phased out in three annual steps after the Canada–Korea agreement took effect in January 2015, so they are free today.</p>
                  <p className={p}><strong className="text-foreground">European Union and United Kingdom:</strong> cars qualify for duty-free entry under CETA and the Canada–UK trade continuity agreement when they meet the origin rules. A German-built car sold in the US is still German for tariff purposes.</p>
                  <p className={p}><strong className="text-foreground">China:</strong> Chinese-built electric vehicles pay 6.1% inside a quota of 49,000 vehicles a year that began on 1 March 2026 and requires an import permit. Outside the quota the 100% surtax from 2024 remains.</p>
                  <p className={p}><strong className="text-foreground">Everywhere else:</strong> 6.1% of the value for duty.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>The US Counter-Tariff Surtax Explained</h2>
                <div className="space-y-3">
                  <p className={p}>In April 2025 Canada imposed a 25% surtax on vehicles originating in the United States, a retaliation for American tariffs on Canadian-built cars. On 8 September 2026 it issued a new United States Surtax Order that sets rates of 15%, 25% or 50% by product schedule, in response to US Section 338 tariffs. For vehicles, the CBSA’s published guidance for individuals is unchanged: the surtax is 25% of 85% of the value for duty.</p>
                  <p className={p}>The 85% reflects an assumption that 15% of the average US-built vehicle consists of Canadian or Mexican content. It applies whether or not the car qualifies for CUSMA duty-free treatment. Cars built elsewhere and bought in the US, such as a German or Japanese model, are not subject to it as long as you can prove where they were made.</p>
                  <p className={p}>The surtax is itself taxed. GST is charged on the value plus duty plus surtax, so a C$50,000 US-built vehicle carries C$10,625 of surtax and about C$531 of GST on that surtax alone.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Worked Example 1: US-Built SUV in Ontario</h2>
                <div className="space-y-2">
                  <p className={p}>A two-year-old SUV built in the US has a value for duty of C$50,000. Duty is nil under CUSMA. The surtax is 25% of 85% of C$50,000, or C$10,625. Add the C$100 air-conditioning tax.</p>
                  <p className={p}>GST at 5% applies to C$60,725, giving C$3,036.25. The RIV fee is C$325 plus C$16.25 of GST. Ontario’s 8% provincial portion of HST on C$50,000 is C$4,000. Total taxes and fees come to C$18,102.50, or 36% of the vehicle’s value.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example 2: A 2008 Japanese-Built Car in British Columbia</h2>
                <div className="space-y-2">
                  <p className={p}>A Japanese-built car valued at C$12,000 is well over 15 years old, so it skips the RIV program and its fee. With a certificate of origin duty is nil, and there is no surtax because it is not US-built.</p>
                  <p className={p}>GST at 5% on C$12,100, including the C$100 air-conditioning tax, is C$605. BC’s 7% provincial tax on C$12,000 adds C$840. The total is C$1,545, about 13% of the car’s value.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>The 15-Year Rule, the RIV Program and Admissibility</h2>
                <div className="space-y-3">
                  <p className={p}>Vehicles under 15 years old must be admissible under Transport Canada’s rules, which in practice means they appear on the RIV list of vehicles that can be modified to meet Canadian standards. Most are US-market models. Once the vehicle arrives you pay the C$325 RIV fee, usually within 45 days, have it inspected, and fix anything required, such as daytime running lights. Any open safety recalls must be cleared, and you need the paperwork before you cross.</p>
                  <p className={p}>A vehicle that is at least 15 years old, counted from its month and year of manufacture, is exempt from that process entirely. That is the reason older Japanese and European cars can be imported easily while a four-year-old European model usually cannot. The calculator checks the rule from the month you enter.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Excise Taxes, the Green Levy and the Luxury Tax</h2>
                <div className="space-y-3">
                  <p className={p}>A federal excise tax of C$100 applies to vehicles with air conditioning. The Green Levy on fuel-inefficient vehicles ranges from C$1,000 to C$4,000 once fuel use reaches 13 litres per 100 kilometres, rising a step at each additional litre up to 16. Because it is a levy on specific vehicles, it matters mainly for large trucks and performance cars.</p>
                  <p className={p}>The federal luxury tax applies to vehicles whose taxable amount exceeds C$100,000. It is the lesser of 10% of the taxable amount or 20% of the amount above C$100,000. On a C$150,000 European sedan with air conditioning, the second test is lower, so the tax is about C$10,020 and GST is charged on top of it. Canada ended the luxury tax on aircraft and boats in November 2025 but kept it on vehicles.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className={h2} style={heading}>Step-by-Step: Importing a Car to Canada</h2>
            <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside max-w-3xl">
              <li>Check admissibility on the RIV list before you buy, or confirm the car will be 15 years old on arrival.</li>
              <li>Confirm the country of manufacture from the VIN and collect any proof of origin you need for a trade agreement.</li>
              <li>Clear open recalls and get the manufacturer’s letter. For US exports, file the vehicle details with US Customs before leaving.</li>
              <li>Declare the vehicle to CBSA, pay duty, any surtax, excise taxes and GST, and keep the Form 1 that proves you paid.</li>
              <li>Pay the RIV fee online, have the vehicle inspected, and complete the required modifications.</li>
              <li>Register with your province, pay provincial tax and fees, and receive plates.</li>
            </ol>
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
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: CBSA Customs Notice 26-23 and its guidance for travellers, the Customs Tariff (Chapter 87), CBSA Memorandum D18-4-1, Canada Revenue Agency luxury tax guidance and Global Affairs Canada notices on Chinese EV imports. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
