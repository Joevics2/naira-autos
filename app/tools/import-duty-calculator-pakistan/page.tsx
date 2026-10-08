import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyPakistanClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-pakistan';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Pakistan Car Import Duty Calculator 2026-27 — CD, RD, FED & Sales Tax',
  description: 'Free Pakistan car import duty calculator for FY2026-27. Finance Act 2026 customs duty slabs by engine size, regulatory and additional duty, FED, special excise duty above 2,000cc, 18% sales tax and advance income tax.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Pakistan Car Import Duty Calculator | Naira Autos',
    description: 'Estimate customs duty, FED, sales tax and the total landed cost of importing a car into Pakistan.',
    url: URL, siteName: 'Naira Autos', locale: 'en_PK', type: 'website',
  },
  keywords: [
    'pakistan car import duty calculator 2026', 'car import duty pakistan finance act 2026', 'customs duty on imported cars pakistan',
    'import japanese car to pakistan cost', 'special excise duty 2000cc cars pakistan', 'used car import pakistan 2026',
    'regulatory duty used cars pakistan', 'jdm import pakistan duty', 'ev import duty pakistan',
  ].join(', '),
};

const FAQ = [
  { q: 'How much is the import duty on a car in Pakistan in 2026-27?', a: 'It depends on engine size. Under the Finance Act 2026 customs duty runs from 30% for cars up to 800 cc to 50% above 1,800 cc, with regulatory duty of 10% to 20% and additional customs duty of 4% on cars above 1,300 cc, plus federal excise duty of 2.5% to 30%. Sales tax of 18% and advance income tax come on top.' },
  { q: 'What changed on 1 July 2026?', a: 'The Finance Act 2026 cut customs duty on imported cars by 20 to 50 percentage points depending on the engine category, lowered additional customs duty from 6% to 4%, and added a Special Excise Duty of 86% on imported petrol cars and SUVs from 2,000 to 3,000 cc and 92% above 3,000 cc. Luxury electric vehicles also lost their exemption from federal excise duty.' },
  { q: 'Why is a 2,500 cc car so expensive to import?', a: 'The 2001 to 3000 cc category combines 50% customs duty, 20% regulatory duty, 4% additional customs duty, 30% federal excise duty and an 86% special excise duty. Sales tax is then charged on all of those, so the total tax can exceed three times the car’s assessable value.' },
  { q: 'Can I import a used car into Pakistan?', a: 'Yes, but the route matters. Overseas Pakistanis can use the Gift, Baggage or Transfer of Residence schemes for cars up to three years old, which use fixed-amount duties with a depreciation allowance of 1% per month. Commercial used imports were opened to vehicles up to five years old from September 2025, and reports say the age cap ended in July 2026. Check the current Import Policy Order before shipping.' },
  { q: 'What is the extra duty on commercial used cars?', a: 'Commercial imports of used cars carry an extra regulatory duty of 30% for 2026-27, down from 40% the year before. It is scheduled to fall by 10 percentage points each year until it ends around 2029 and is added on top of the normal slab rates.' },
  { q: 'How are electric vehicles taxed?', a: 'Imported electric vehicles valued up to US$75,000 pay 25% customs duty with no federal excise duty. Under the Finance Act 2026 vehicles between US$75,000 and US$110,000 pay 30% FED, and those above US$110,000 pay 40%. Sales tax and advance income tax still apply.' },
  { q: 'Do filers and non-filers pay different import taxes?', a: 'Yes. Advance income tax collected at import under section 148 is lower for importers on the Active Taxpayers List, and non-filers pay roughly double. Typical commercial rates range from about 1% to 6% for filers depending on the goods, and the calculator lets you edit the rate.' },
  { q: 'Is the 1% landing charge added?', a: 'Pakistan Customs normally adds 1% landing charges to the CIF value when determining the assessable value, which then flows into every duty and tax. The calculator includes it by default with a toggle.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Pakistan Car Import Duty Calculator — CD, RD, FED & Sales Tax',
      description: 'Free calculator for Pakistan car import duty, excise and sales tax under the Finance Act 2026.',
      url: URL, inLanguage: 'en-PK', dateModified: '2026-10-05',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Pakistan', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Pakistan Car Import Duty Calculator', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'PKR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function ImportDutyCalculatorPakistanPage() {
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
              <span className="text-white/50">🇵🇰 Pakistan</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Finance Act 2026 (FY2026-27)</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Pakistan Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to land that car in Pakistan?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the price, engine size and fuel type to see customs duty, regulatory duty, excise, sales tax and advance income tax under the new FY2026-27 slabs.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> Pakistan changes car duties through the budget and SROs, and published tables differ between sources. Confirm the rate, valuation and your importer category with a clearing agent before you commit.
          </p>
        </div>
      </div>

      <ImportDutyPakistanClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>How Much Is Import Duty on a Car in Pakistan?</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Pakistan taxes imported cars in several layers, and the engine size decides almost all of them. Customs duty, regulatory duty and additional customs duty are charged on the assessable value. Federal excise duty, and for large petrol engines a special excise duty, is then charged on value plus those duties. Sales tax at 18% follows, and advance income tax is collected on the grand total. The Finance Act 2026, in force since 1 July 2026, cut the first group sharply while adding a heavy new excise duty on cars above 2,000 cc.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Customs duty', rate: '30–50%', base: 'by engine size', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'FED', rate: '2.5–30%', base: 'on value + duties', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Sales tax', rate: '18%', base: 'on value + duties + FED', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'SED above 2,000cc', rate: '86–92%', base: 'petrol cars and SUVs', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className={h2} style={heading}>Finance Act 2026 Duty Slabs by Engine Size</h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/60 text-muted-foreground">
                      <tr><th className="text-left p-2">Engine</th><th className="p-2">CD</th><th className="p-2">RD</th><th className="p-2">ACD</th><th className="p-2">FED / SED</th></tr>
                    </thead>
                    <tbody className="text-foreground">
                      {[
                        ['Up to 800 cc', '30%', '0%', '0%', '2.5%'],
                        ['801–1,000 cc', '35%', '0%', '0%', '2.5%'],
                        ['1,001–1,300 cc', '40%', '0%', '0%', '5%'],
                        ['1,301–1,500 cc', '40%', '10%', '4%', '10%'],
                        ['1,501–1,800 cc', '45%', '10%', '4%', '10%'],
                        ['1,801–2,000 cc', '50%', '20%', '4%', '30%'],
                        ['2,001–3,000 cc', '50%', '20%', '4%', '116%'],
                      ].map((r) => (
                        <tr key={r[0]} className="border-t border-border">{r.map((c, idx) => <td key={idx} className={`p-2 ${idx === 0 ? 'font-semibold' : 'text-center'}`}>{c}</td>)}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={`${p} mt-3`}>For 2,001–3,000 cc the 116% combines 30% federal excise duty with the 86% Special Excise Duty on petrol cars and SUVs, and the same logic gives 122% above 3,000 cc. Diesel and hybrid treatment of the special duty should be confirmed with your agent.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Worked Example: A 1,500 cc Petrol Car</h2>
                <div className="space-y-2">
                  <p className={p}>Take a car with a CIF value of US$13,200 at about Rs 281 to the dollar, plus the 1% landing charge. Assessable value comes to roughly Rs 3.75 million. In the 1,301–1,500 cc slab customs duty is 40%, regulatory duty 10% and additional customs duty 4%, together 54%.</p>
                  <p className={p}>Federal excise duty at 10% applies to value plus those duties, and 18% sales tax applies to the total. After a 3% value-addition tax and 3.5% advance income tax for an active filer, total taxes are close to 112% of assessable value, so a car worth Rs 3.75 million costs about Rs 8 million before registration.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>New, Used and Personal Imports</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">New cars:</strong> anyone can import a new car by paying duties and taxes under the general procedure, and the engine slabs above apply.</p>
                  <p className={p}><strong className="text-foreground">Used commercial imports:</strong> the same slabs apply plus an extra 30% regulatory duty for 2026-27, which falls by 10 points a year until it ends. Reports say the five-year age cap for these imports was lifted in July 2026, but policy orders change often, so verify before buying.</p>
                  <p className={p}><strong className="text-foreground">Personal schemes:</strong> overseas Pakistanis can bring a car through the Gift, Baggage or Transfer of Residence schemes. Cars may be up to three years old, duties are fixed amounts by engine size rather than a percentage of price, and the FBR allows depreciation of 1% a month. Those schemes are not modelled here.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Electric Vehicles</h2>
                <p className={p}>Imported electric vehicles valued up to US$75,000 pay 25% customs duty with no federal excise duty. The Finance Act 2026 adds 30% FED for vehicles between US$75,000 and US$110,000 and 40% above US$110,000, which makes premium EVs far more expensive than before. Sales tax and advance income tax still apply to all of them.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Step-by-Step: Importing a Car to Pakistan</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Choose the route: a new car, a commercial used import, or a personal scheme if you qualify.</li>
                  <li>Check age limits and, for used cars, pre-shipment inspection requirements.</li>
                  <li>Appoint a clearing agent and confirm your filer status, because it changes the advance tax.</li>
                  <li>Ship the car and file the goods declaration; Customs assesses value, duties and taxes before release.</li>
                  <li>Register the car with your provincial excise department and pay token tax and registration fees.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>What the Calculator Does Not Cover</h2>
                <p className={p}>Fixed-amount duties under the personal schemes, provincial registration and token tax, dealer margins, and any SRO concession for special categories are outside the total. Customs may also assess value on its own valuation ruling rather than your invoice, which would change every percentage.</p>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: the Finance Act 2026 as reported on 30 June 2026, FBR vehicle import guidance, Pakistan Customs Tariff FY2026-27 references and Section 148 withholding guidance. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
