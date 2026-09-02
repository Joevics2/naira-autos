import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Import Duty Calculator — Choose Your Country | Naira Autos',
  description: 'Free car import duty calculator by country — customs duty, levies, and total landed cost for any imported vehicle. Start with Nigeria; more countries added regularly.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-duty-calculator-countries' },
  openGraph: {
    title: 'Car Import Duty Calculator — Choose Your Country | Naira Autos',
    description: 'Free car import duty calculator by country — customs duty, levies, and total landed cost for any imported vehicle.',
    url: 'https://www.naira.autos/tools/import-duty-calculator-countries',
  },
};

/**
 * Roadmap of countries for this tool. Only entries with `live: true` are
 * rendered — everything else stays out of the page entirely (no "Soon"
 * placeholders) until the page for that country actually exists.
 * To ship a new country: build its page, then flip `live: true` and add `href`.
 */
const COUNTRIES: { code: string; name: string; flag: string; href?: string; live: boolean }[] = [
  { code: 'ng', name: 'Nigeria',              flag: '🇳🇬', href: '/tools/import-duty-calculator', live: true },
  { code: 'gh', name: 'Ghana',                flag: '🇬🇭', href: '/tools/import-duty-calculator-ghana', live: true },
  { code: 'ke', name: 'Kenya',                flag: '🇰🇪', href: '/tools/import-duty-calculator-kenya', live: true },
  { code: 'ug', name: 'Uganda',                flag: '🇺🇬', live: false },
  { code: 'tz', name: 'Tanzania',              flag: '🇹🇿', live: false },
  { code: 'zm', name: 'Zambia',                flag: '🇿🇲', live: false },
  { code: 'rw', name: 'Rwanda',                flag: '🇷🇼', live: false },
  { code: 'za', name: 'South Africa',          flag: '🇿🇦', href: '/tools/import-duty-calculator-south-africa', live: true },
  { code: 'ae', name: 'UAE',                   flag: '🇦🇪', live: false },
  { code: 'sa', name: 'Saudi Arabia',          flag: '🇸🇦', live: false },
  { code: 'pk', name: 'Pakistan',              flag: '🇵🇰', live: false },
  { code: 'in', name: 'India',                 flag: '🇮🇳', live: false },
  { code: 'lk', name: 'Sri Lanka',             flag: '🇱🇰', live: false },
  { code: 'bd', name: 'Bangladesh',            flag: '🇧🇩', live: false },
  { code: 'jm', name: 'Jamaica',               flag: '🇯🇲', live: false },
  { code: 'tt', name: 'Trinidad & Tobago',     flag: '🇹🇹', live: false },
  { code: 'zw', name: 'Zimbabwe',              flag: '🇿🇼', live: false },
  { code: 'bw', name: 'Botswana',              flag: '🇧🇼', live: false },
  { code: 'na', name: 'Namibia',               flag: '🇳🇦', live: false },
  { code: 'ph', name: 'Philippines',           flag: '🇵🇭', live: false },
];

const LIVE_COUNTRIES = COUNTRIES.filter((c) => c.live);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-duty-calculator-countries',
      name: 'Car Import Duty Calculator — Choose Your Country',
      description: 'Free car import duty calculator by country — customs duty, levies, and total landed cost for any imported vehicle.',
      url: 'https://www.naira.autos/tools/import-duty-calculator-countries',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How is car import duty usually calculated?', acceptedAnswer: { '@type': 'Answer', text: 'Most countries base import duty on CIF value — Cost, Insurance, and Freight — rather than just the purchase price. A percentage duty rate applies to that CIF value, often with additional levies (environmental, industry development, or value-added tax) stacked on top. The exact rates, levies, and how they compound differ significantly by country.' } },
        { '@type': 'Question', name: 'Why do rates vary so much between countries?', acceptedAnswer: { '@type': 'Answer', text: 'Each country sets its own tariff schedule, automotive industry protection levies, and environmental surcharges independently, based on its own trade policy and local auto industry goals. A vehicle that costs 40% of its price in duty in one country might cost 15% or 70% in another.' } },
        { '@type': 'Question', name: 'Why is my country not available yet?', acceptedAnswer: { '@type': 'Answer', text: 'Each country page is built with the actual current customs tariff schedule researched directly, rather than a generic estimate — that takes time to verify properly. More countries are added as that research is completed.' } },
      ],
    },
  ],
};

export default function ImportDutyCountryPickerPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="bg-[#080C10] pt-10 pb-12 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Import Duty Calculator</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Calculator className="h-3 w-3" />
              Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Car Import<br /><span className="text-emerald-400">Duty Calculator</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Calculate customs duty, clearing fees, and total landed cost for an imported vehicle — pick your country to get started.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {LIVE_COUNTRIES.map((c) => (
            <Link
              key={c.code}
              href={c.href!}
              className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">{c.flag}</span>
              <span className="text-sm font-bold text-foreground">{c.name}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Open Calculator →</span>
            </Link>
          ))}
        </div>

        <div className="mt-14 max-w-screen-lg space-y-10">
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Import Duty Generally Works</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Most countries base car import duty on CIF value — Cost, Insurance, and Freight — rather than the sticker price alone, with a percentage tariff plus additional levies (environmental, industry development, or VAT) often stacked on top and compounding on each other. The rate, the levies, and how they compound differ significantly by country, which is why each page here is built with the actual current tariff schedule researched directly rather than a generic estimate applied everywhere.</p>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>FAQ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { q: 'How is car import duty usually calculated?', a: 'Most countries base it on CIF value — Cost, Insurance, and Freight. A percentage duty rate applies, often with extra levies stacked on top. Exact rates and how they compound differ significantly by country.' },
                { q: 'Why do rates vary so much between countries?', a: 'Each country sets its own tariff schedule and automotive-industry protection levies based on its own trade policy. A car that costs 40% of its price in duty in one country might cost 15% or 70% in another.' },
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
          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Founder.
          </p>
        </div>
      </div>
    </div>
  );
}
