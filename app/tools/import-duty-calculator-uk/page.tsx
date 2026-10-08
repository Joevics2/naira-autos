import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import ImportDutyUkClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/tools/import-duty-calculator-uk';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'UK Car Import Duty Calculator 2026 — Duty, VAT & Landed Cost',
  description: 'Free UK car import duty and VAT calculator. Work out 10% customs duty, 20% VAT, classic car 5% VAT, Transfer of Residence relief and Japan/EU 0% duty routes, plus the £55 DVLA fee. Updated October 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'UK Car Import Duty Calculator | Naira Autos',
    description: 'Estimate customs duty, import VAT and the total landed cost of bringing a car into the UK.',
    url: URL, siteName: 'Naira Autos', locale: 'en_GB', type: 'website',
  },
  keywords: [
    'uk car import duty calculator', 'import duty on cars uk 2026', 'how much tax to import a car to the uk',
    'import car from usa to uk cost', 'import car from japan to uk duty', 'import car from eu to uk vat',
    'classic car import vat 5%', 'transfer of residence car uk', 'nova hmrc 14 days',
  ].join(', '),
};

const FAQ = [
  { q: 'How much import duty and VAT do I pay on a car imported to the UK?', a: 'Most cars pay 10% customs duty on the customs value (price plus shipping and insurance to the UK border), then 20% VAT on the customs value plus the duty. A £20,000 car with £1,500 shipping therefore pays £2,150 duty and £4,730 VAT, a total of £6,880.' },
  { q: 'Do EU-built cars pay import duty after Brexit?', a: 'Not if they qualify under the UK–EU Trade and Cooperation Agreement. A car genuinely built in the EU or UK can enter at 0% duty when the exporter provides a valid origin declaration; HMRC does not accept proof from the manufacturer. Import VAT of 20% still applies, and EU-market cars built elsewhere pay the standard 10%.' },
  { q: 'Is there zero duty on Japanese cars in 2026?', a: 'Under the UK–Japan CEPA, tariffs on Japanese-built passenger cars fall to zero in 2026, which is why many guides now quote 0% duty for 2026 imports. You must prove the car was manufactured in Japan; European or American models sold in Japan do not qualify and still pay 10%. VAT at 20% applies either way.' },
  { q: 'What is the tax on a classic car over 30 years old?', a: 'Qualifying historic vehicles pay 0% duty and a reduced 5% import VAT. The car must generally be at least 30 years old, in original condition without major engine or chassis changes, and no longer in production. Collectors’ items can also qualify without meeting the 30-year test.' },
  { q: 'How does Transfer of Residence relief work?', a: 'If you are moving your normal home to the UK, you can import a personal vehicle free of duty and VAT. Commonly cited conditions are living outside the UK for at least 12 months, owning and using the car for at least 6 months before the move, importing within 12 months of arrival, and not selling or lending it for 12 months. Apply to HMRC before shipping.' },
  { q: 'What is NOVA and when must I submit it?', a: 'NOVA, the Notification of Vehicle Arrivals, tells HMRC a vehicle has arrived in the UK. It must be done within 14 days of arrival, even if you are claiming a relief. DVLA will not register the vehicle until HMRC has processed it, and late notification can be fined.' },
  { q: 'What does it cost to register an imported car?', a: 'The DVLA first registration fee is £55. You also pay first-year Vehicle Excise Duty based on the car’s emissions, and many non-UK cars need Individual Vehicle Approval, with fees for a basic test quoted around £450. Cars more than ten years old may only need a normal MOT instead. These are not part of customs duty and VAT, so use the optional cost fields.' },
  { q: 'Do electric cars get a duty exemption?', a: 'There is no general UK duty exemption for imported electric cars. The duty depends on the country of origin and any trade agreement, and 20% VAT normally applies. Rules of origin for EV batteries under the UK–EU deal are a specialist area, so check with your customs agent.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'UK Car Import Duty Calculator — Duty, VAT & Landed Cost',
      description: 'Free calculator for UK car import duty and VAT, with classic car, Transfer of Residence and preferential-origin routes.',
      url: URL, inLanguage: 'en-GB', dateModified: '2026-10-03',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Import Duty Calculator', item: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'United Kingdom', item: URL },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'SoftwareApplication', name: 'UK Car Import Duty Calculator',
      applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;

export default function ImportDutyCalculatorUkPage() {
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
              <span className="text-white/50">🇬🇧 United Kingdom</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">HMRC rules for 2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Last verified: October 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              UK Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">What will it really cost to land that car in the UK?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Enter the price and shipping to see customs duty, import VAT and the total landed cost, with routes for EU and Japan-built cars, classics and Transfer of Residence.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Estimate only.</strong> HMRC assesses duty on the declared customs value using its own exchange rate. Check the commodity code, origin and any relief with a customs agent before shipping.
          </p>
        </div>
      </div>

      <ImportDutyUkClient />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>UK Car Import Duty &amp; VAT Rates (2026)</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              Duty is charged on the customs value; VAT is then charged on that value plus the duty and any delivery or extra charges.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Standard duty', rate: '10%', base: 'of customs value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Import VAT', rate: '20%', base: 'on value + duty', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Classic 30+ yrs', rate: '0% + 5%', base: 'duty + VAT', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Transfer of Residence', rate: '0% + 0%', base: 'duty + VAT', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
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
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Worked Example: £20,000 Car From the USA</h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>Customs value is £20,000 plus £1,500 shipping, £21,500. Duty at 10% is £2,150. VAT at 20% applies to £23,650, which is £4,730.</p>
                  <p>Total duty and VAT is £6,880, about 32% of the customs value. With the £55 DVLA fee the cash needed at the border and registration is £6,935, on top of the £21,500 already spent.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Which Route Applies to You?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Standard:</strong> buying a modern car from the US, UAE, Australia or anywhere without a qualifying trade deal.</p>
                  <p><strong className="text-foreground">Proven origin:</strong> EU- or UK-built, or Japan-built from 2026, with a valid exporter origin declaration.</p>
                  <p><strong className="text-foreground">Relief:</strong> a historic car, or your own car when you are moving your home to the UK.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Step-by-Step: Importing a Car to the UK</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirm the car can be made roadworthy and approved for UK use (IVA, MOT or a type-approval exemption).</li>
                  <li>Decide your duty route and collect origin proof or apply for relief from HMRC.</li>
                  <li>Ship the car and make a customs declaration, paying duty and VAT before release.</li>
                  <li>Submit NOVA to HMRC within 14 days of arrival.</li>
                  <li>Register with DVLA, pay the £55 fee and first-year Vehicle Excise Duty, then fit UK plates.</li>
                </ol>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>What the Calculator Does Not Cover</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">Vehicle Excise Duty, insurance, number plates and any modifications are excluded. The expensive-car supplement and other special charges are not modelled. Anti-dumping or other duties on specific commodity codes would need to be entered as a custom rate.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>How UK Import Duty and VAT Are Calculated</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>HMRC builds the bill in a fixed order. First it works out the customs value, which is what you paid for the car plus the cost of getting it to the UK border: shipping, insurance and any other charges that form part of the price. Customs duty is then charged as a percentage of that customs value. For passenger cars under tariff heading 8703 the standard rate in the UK Global Tariff is 10%.</p>
                  <p>Import VAT comes last and is calculated on a larger base. Under the rules summarised on GOV.UK, VAT is charged on the car, accessories, delivery and any extra charges, plus the customs duty itself. In other words you pay VAT on the duty. That stacking effect is why the combined burden on a standard import is about 32% of the customs value rather than 30%.</p>
                  <p>HMRC converts foreign currency using its own published customs exchange rate rather than the rate your bank gives you, so a small difference from this calculator is normal. Some importers report that the invoice must be recent, and that HMRC can substitute its own valuation if the price looks too low, so keep the bill of sale and proof of payment.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Importing From the USA, Japan, the EU or the UAE</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">USA:</strong> there is no trade deal that removes duty on American cars, so the standard 10% duty and 20% VAT apply. Shipping from the US east coast is often quoted between about £900 and £1,600 for roll-on roll-off, with west coast ports costing more.</p>
                  <p><strong className="text-foreground">Japan:</strong> under the UK–Japan Comprehensive Economic Partnership Agreement, tariffs on Japanese-built passenger cars are eliminated in 2026. The car must genuinely be manufactured in Japan, and you need a valid proof of origin. A European model that was sold in Japan does not qualify and still pays 10%.</p>
                  <p><strong className="text-foreground">European Union:</strong> since Brexit, a car bought in the EU is an import from a third country. Cars genuinely built in the EU or UK can enter at 0% duty under the Trade and Cooperation Agreement if the exporter supplies a valid origin declaration, but 20% VAT is still due even if VAT was already paid in the country of purchase.</p>
                  <p><strong className="text-foreground">UAE and other countries:</strong> without a qualifying trade agreement the standard 10% duty and 20% VAT apply. If you believe another UK trade deal covers your car, use the custom-rate option and confirm the rate with your agent first.</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Registering an Imported Car: NOVA, Approval and DVLA</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Paying tax is only half the job. You must tell HMRC about the vehicle through the Notification of Vehicle Arrivals service within 14 days of it reaching the UK, even if you are claiming a relief. DVLA will not register the car until HMRC has processed that notification, and late notification can lead to a fine.</p>
                  <p>Next the car must be approved for road use. Many vehicles built outside the EU and UK need Individual Vehicle Approval, and fees for a basic test are commonly quoted at about £450. Vehicles more than ten years old are usually exempt from that approval and need only a standard MOT if they are over three years old, though you should confirm this for your car before buying.</p>
                  <p>Finally you apply to DVLA using the V55/5 form for used imports or V55/4 for new ones, pay the £55 first registration fee, and pay first-year Vehicle Excise Duty, which depends on the car’s CO2 emissions. Number plates, insurance and any repairs are extra.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={heading}>Common Mistakes That Cost Importers Money</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Assuming an EU-bought car is duty-free. It is only duty-free if it was built in the EU or UK and carries a valid origin declaration from the exporter, not from the manufacturer.</li>
                  <li>Forgetting that VAT is charged on the duty as well as the car. Budget for the stacked figure, not 10% plus 20% of the price.</li>
                  <li>Missing the 14-day notification deadline, which blocks registration and can attract a penalty.</li>
                  <li>Leaving out shipping and insurance when estimating. They form part of the customs value and increase both duty and VAT.</li>
                  <li>Claiming classic status for a car that has been heavily modified. Historic vehicle treatment needs the car to be in original condition and no longer in production.</li>
                  <li>Not applying for Transfer of Residence relief before the car ships, when the rules require approval first.</li>
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
            Reviewed by <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder. Sources: HMRC and GOV.UK guidance on importing vehicles, the UK Global Tariff, the UK–EU Trade and Cooperation Agreement and the UK–Japan CEPA. Last verified October 2026.
          </p>
        </div>
      </div>
    </>
  );
}
