import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle, ChevronDown } from 'lucide-react';
import ChinaCarImportCalculatorClient from './client';
import { RelatedTools } from '@/components/RelatedTools';

export const metadata: Metadata = {
  title: 'China Car Import Calculator — Cost of Importing a Chinese Car to Nigeria',
  description: 'Free calculator for importing a car from China to Nigeria. Popular Chery, Geely, GAC, Jetour, and BYD models, full customs breakdown, and EV exemption. Updated July 2026.',
  alternates: { canonical: 'https://www.naira.autos/tools/china-car-import-calculator' },
  openGraph: {
    title: 'China Car Import Calculator | Naira Autos',
    description: 'Free calculator for importing a car from China to Nigeria — customs duty, NAC levy, Green Tax, VAT, and total landed cost, with popular Chinese model presets.',
    url: 'https://www.naira.autos/tools/china-car-import-calculator',
  },
  keywords: ['china car import calculator', 'import car from china to nigeria', 'chinese car import duty nigeria', 'chery import nigeria', 'geely import nigeria', 'byd import nigeria', 'gac import nigeria', 'china to nigeria car shipping cost', 'chinese car import cost calculator'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/china-car-import-calculator',
      name: 'China Car Import Calculator — Cost of Importing a Chinese Car to Nigeria',
      description: 'Free calculator for importing a car from China to Nigeria — full customs breakdown and popular Chinese model presets.',
      url: 'https://www.naira.autos/tools/china-car-import-calculator',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'China Car Import Calculator', item: 'https://www.naira.autos/tools/china-car-import-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does it cost to import a car from China to Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Total landed cost combines the FOB price, freight, insurance, and Nigeria\u2019s statutory charges — roughly 35–45% of CIF value in duties and taxes for most Chinese crossovers, on top of a purchase price that is typically 30–50% below equivalent Nigerian dealer prices.' } },
        { '@type': 'Question', name: 'Are Chinese cars cheaper to import than buying from a Nigerian dealer?', acceptedAnswer: { '@type': 'Answer', text: 'Often yes, even after freight and customs charges, because Nigerian dealer prices include their own import costs plus a retail markup. The actual savings depend on the specific model, current exchange rate, and shipping method — always compare against real local listings before deciding.' } },
        { '@type': 'Question', name: 'Do electric vehicles get a tax break when imported to Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Under Nigeria\u2019s 2026 Fiscal Policy Measures effective 1 July 2026, electric vehicles and mass transit buses are fully exempt from import duty, NAC levy, and the Green Tax Surcharge.' } },
        { '@type': 'Question', name: 'Does Nigeria accept right-hand drive Chinese cars?', acceptedAnswer: { '@type': 'Answer', text: 'No. Nigeria only permits left-hand drive (LHD) vehicles. Confirm the steering configuration with your exporter before paying any deposit — some Chinese domestic-market models are right-hand drive for other export markets.' } },
        { '@type': 'Question', name: 'What documents do I need to import a car from China to Nigeria?', acceptedAnswer: { '@type': 'Answer', text: 'You\u2019ll need a commercial invoice, packing list, Bill of Lading, Form M (CBN forex approval), and a Single Goods Declaration (SGD) at the Nigerian port, in addition to compliance documents like SONCAP. A licensed clearing agent typically handles the port-side process.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'China Car Import Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function ChinaCarImportCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── Dark hero ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">China Car Import Calculator</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% Free</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">🇳🇬 Nigeria Live · More Countries Coming</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 52px)' }}>
              China Car Import<br /><span className="text-emerald-400">Calculator</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-xl">
              Full landed cost for importing a car from China — Chery, Geely, GAC, Jetour, BYD, and more. Pick a model, enter your quote, and get every customs charge broken down.
            </p>
          </div>
        </div>
      </div>

      <ChinaCarImportCalculatorClient />

      {/* ── SEO content (server-rendered, Google sees this) ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Importing a Car From China to Nigeria
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              Chinese brands like Chery, Geely, GAC, Jetour, and BYD have become popular imports into Nigeria and across Africa — often priced well below equivalent Nigerian dealer listings even after shipping and customs. This calculator applies Nigeria's current statutory vehicle import charges to your specific FOB quote.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: 'Import Duty', rate: '20%', base: 'of CIF Value', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'NAC Levy', rate: '5–10%', base: 'of CIF — used/new', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'Green Tax', rate: '0–4%', base: 'of CIF — by engine cc', color: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-500/5', border: 'border-lime-200 dark:border-lime-500/20' },
                { label: 'FOB Levy', rate: '4%', base: 'of FOB Value', color: 'text-yellow-600 dark:text-yellow-500', bg: 'bg-yellow-50 dark:bg-yellow-500/5', border: 'border-yellow-200 dark:border-yellow-500/20' },
                { label: 'VAT', rate: '7.5%', base: 'of CIF + Duty + NAC + Green Tax', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-4xl font-black ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Why Chinese Cars Are a Growing Import Category
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Brands like Chery, Geely, GAC, Jetour, and BYD have expanded aggressively into African markets, and their FOB prices are often substantially below comparable Japanese, Korean, or European models. Combined with Nigeria's typically lower duty burden on smaller-engine vehicles — most Chinese crossovers run turbocharged engines under 2,000cc — the Green Tax Surcharge introduced in July 2026 usually doesn't apply.</p>
                  <p>Electric models like the BYD Atto 3 or Song Plus go a step further: Nigeria's 2026 Fiscal Policy Measures fully exempt EVs from import duty, NAC levy, and the Green Tax entirely, which can meaningfully change the total landed cost math.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Before You Pay a Deposit
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Confirm left-hand drive.</strong> Nigeria only permits LHD vehicles — some Chinese export configurations are RHD for other markets like the UK, Hong Kong, or Southern Africa.</p>
                  <p><strong className="text-foreground">Request a live video inspection</strong> of the actual vehicle, not stock photos, before it ships. Reputable exporters do this as standard practice.</p>
                  <p><strong className="text-foreground">Get an independent shipping quote.</strong> RoRo (Roll-on/Roll-off) is typically cheaper than container shipping but offers less protection — factor this into your freight estimate above.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  How This Calculator Works
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Enter your FOB (exporter's quoted price), estimated freight, and insurance to get CIF value. Nigeria then applies import duty, NAC levy, the Green Tax Surcharge (based on engine size), an FOB levy, and VAT — each shown as a separate line so you can see exactly where the money goes.</p>
                  <p>These are the same statutory rates used in our general <Link href="/tools/import-duty-calculator" className="text-emerald-600 dark:text-emerald-400 hover:underline">Import Duty Calculator</Link>, with Chinese-model presets and the EV exemption layered on top for this specific use case.</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  China Car Import — FAQ
                </h2>
                <div className="space-y-2">
                  {[
                    { q: 'How much does it cost to import a car from China to Nigeria?', a: 'Total landed cost combines FOB price, freight, insurance, and Nigeria\u2019s statutory charges — roughly 35–45% of CIF value in duties and taxes for most Chinese crossovers.' },
                    { q: 'Are Chinese cars cheaper than buying from a Nigerian dealer?', a: 'Often yes, even after freight and customs, since dealer prices already include import costs plus a retail markup. Always compare against real local listings for your specific model before deciding.' },
                    { q: 'Do EVs get a tax break?', a: 'Yes — electric vehicles and mass transit buses are fully exempt from import duty, NAC levy, and the Green Tax Surcharge under the 2026 Fiscal Policy Measures.' },
                    { q: 'Can I import a right-hand drive Chinese car?', a: 'No. Nigeria only permits left-hand drive vehicles. Confirm this with your exporter before paying a deposit.' },
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
          </div>

          <div className="flex items-start gap-2 p-4 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 max-w-3xl">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300/80">
              We haven't independently vetted specific Chinese export platforms or agents. Verify any exporter's track record, use secure payment methods (avoid full upfront wire transfers where possible), and budget extra for clearing/agent fees before committing to a purchase.
            </p>
          </div>

          {/* Related tools */}
          <RelatedTools tool="china-car-import-calculator" />

        </div>
      </div>
    </>
  );
}
