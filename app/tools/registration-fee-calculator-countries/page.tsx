import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vehicle Registration Fee Calculator — Choose Your Country | Naira Autos',
  description: 'Free vehicle registration fee calculator by country — number plate, driver\'s licence, change of ownership, and roadworthiness costs. Start with Nigeria; more countries added regularly.',
  alternates: { canonical: 'https://www.naira.autos/tools/registration-fee-calculator-countries' },
  openGraph: {
    title: 'Vehicle Registration Fee Calculator — Choose Your Country | Naira Autos',
    description: 'Free vehicle registration fee calculator by country — number plate, driver\'s licence, change of ownership, and roadworthiness costs.',
    url: 'https://www.naira.autos/tools/registration-fee-calculator-countries',
  },
};

/**
 * Roadmap of countries for this tool. Only entries with `live: true` are
 * rendered — everything else stays out of the page entirely (no "Soon"
 * placeholders) until the page for that country actually exists.
 * To ship a new country: build its page, then flip `live: true` and add `href`.
 */
const COUNTRIES: { code: string; name: string; flag: string; href?: string; live: boolean }[] = [
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', href: '/tools/registration-fee-calculator', live: true },
  { code: 'gh', name: 'Ghana',          flag: '🇬🇭', live: false },
  { code: 'ke', name: 'Kenya',          flag: '🇰🇪', live: false },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', live: false },
  { code: 'us', name: 'United States',  flag: '🇺🇸', live: false },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', live: false },
  { code: 'in', name: 'India',          flag: '🇮🇳', live: false },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', live: false },
];

const LIVE_COUNTRIES = COUNTRIES.filter((c) => c.live);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/registration-fee-calculator-countries',
      name: 'Vehicle Registration Fee Calculator — Choose Your Country',
      description: 'Free vehicle registration fee calculator by country — number plate, driver\u2019s licence, change of ownership, and roadworthiness costs.',
      url: 'https://www.naira.autos/tools/registration-fee-calculator-countries',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What does vehicle registration usually include?', acceptedAnswer: { '@type': 'Answer', text: 'Most countries split it into a national or federal fee (a plate and/or licence issued by a central road authority) plus regional or local add-ons (roadworthiness inspection, ownership transfer processing, local taxes). Which layer costs more, and how the two combine, varies significantly by country.' } },
        { '@type': 'Question', name: 'Why is my country not available yet?', acceptedAnswer: { '@type': 'Answer', text: 'Each country page is built with the actual current fee schedule researched directly from the relevant road authority, rather than a generic estimate — that takes time to verify properly. More countries are added as that research is completed.' } },
      ],
    },
  ],
};

export default function RegistrationFeeCalculatorCountryPickerPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <div className="bg-[#080C10] pt-10 pb-12 px-4">
        <div className="max-w-screen-lg mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tools" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Back">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Registration Fee Calculator</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 text-blue-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <FileText className="h-3 w-3" />
              Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Vehicle Registration<br /><span className="text-blue-400">Fee Calculator</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Know exactly what you&apos;ll pay for number plates, driver&apos;s licences, change of ownership, and roadworthiness — pick your country to get started.
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
              className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card hover:border-blue-500/40 hover:shadow-lg transition-all"
            >
              <span className="text-3xl">{c.flag}</span>
              <span className="text-sm font-bold text-foreground">{c.name}</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">Open Calculator →</span>
            </Link>
          ))}
        </div>

        <div className="mt-14 space-y-10">
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What Vehicle Registration Usually Includes</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Most countries split vehicle registration costs into a national or federal fee — a plate and/or licence issued by a central road authority — plus regional or local add-ons like roadworthiness inspection, ownership transfer processing, and local taxes. Which layer costs more, and how the two combine, varies significantly by country, which is why each page here is built with the actual current fee schedule researched directly from the relevant road authority rather than a generic estimate.</p>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>FAQ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { q: 'What does vehicle registration usually include?', a: 'Most countries split it into a national fee (plate and/or licence) plus regional add-ons (inspection, ownership transfer, local taxes). Which layer costs more, and how they combine, varies significantly by country.' },
                { q: 'Why is my country not available yet?', a: 'Each country page is built with the actual current fee schedule researched directly from the relevant road authority, rather than a generic estimate — that takes time to verify properly. More countries are added as that research is completed.' },
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
