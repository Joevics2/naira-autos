import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, IdCard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vehicle License Renewal Guide — Choose Your Country | Naira Autos',
  description: 'Free vehicle license renewal guides by country — requirements, step-by-step process, official portals, and costs. Start with Nigeria; more countries added regularly.',
  alternates: { canonical: 'https://www.naira.autos/tools/vehicle-license' },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/vehicle-license',
      name: 'Vehicle License Renewal Guide — Choose Your Country',
      description: 'Free vehicle license renewal guides by country — requirements, step-by-step process, official portals, and costs.',
      url: 'https://www.naira.autos/tools/vehicle-license',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What do I usually need to renew a vehicle license?', acceptedAnswer: { '@type': 'Answer', text: 'Most countries require proof of a current roadworthiness or safety inspection, valid insurance, the previous license or registration document, and payment of the renewal fee. Some also require an emissions test or updated ownership documents. Exact requirements and where to renew — online portal versus in-person office — vary by country.' } },
        { '@type': 'Question', name: 'Why is my country not available yet?', acceptedAnswer: { '@type': 'Answer', text: 'Each country page is built by researching that country\u2019s actual renewal process and official portal directly, rather than assuming a generic process — that takes time to verify properly. More countries are added as that research is completed.' } },
      ],
    },
  ],
};

/**
 * Roadmap of countries for this tool. Only entries with `live: true` are
 * rendered — everything else stays out of the page entirely (no "Soon"
 * placeholders) until the page for that country actually exists.
 * To ship a new country: build its page, then flip `live: true` and add `href`.
 */
const COUNTRIES: { code: string; name: string; flag: string; href?: string; live: boolean }[] = [
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', href: '/tools/vehicle-license/nigeria', live: true },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', live: false },
  { code: 'us', name: 'United States',  flag: '🇺🇸', live: false },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', live: false },
  { code: 'ke', name: 'Kenya',          flag: '🇰🇪', live: false },
  { code: 'gh', name: 'Ghana',          flag: '🇬🇭', live: false },
  { code: 'in', name: 'India',          flag: '🇮🇳', live: false },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', live: false },
];

const LIVE_COUNTRIES = COUNTRIES.filter((c) => c.live);

export default function VehicleLicenseCountryPickerPage() {
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
              <span className="text-white/50">Vehicle License</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <IdCard className="h-3 w-3" />
              Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Vehicle License<br /><span className="text-emerald-400">Renewal Guide</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Requirements, step-by-step process, official portals, and typical costs — pick your country to get started.
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
              <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Open Guide →</span>
            </Link>
          ))}
        </div>

        <div className="mt-14 space-y-10">
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>What Vehicle License Renewal Usually Requires</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Most countries require proof of a current roadworthiness or safety inspection, valid insurance, the previous license or registration document, and payment of the renewal fee — some also require an emissions test or updated ownership documents. Exact requirements, and whether renewal happens through an online portal or an in-person office, vary by country, which is why each page here is built by researching that country's actual process directly.</p>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>FAQ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { q: 'What do I usually need to renew a vehicle license?', a: 'Most countries require a current roadworthiness/safety inspection, valid insurance, your previous license document, and the renewal fee. Some also require an emissions test. Exact requirements and where to renew vary by country.' },
                { q: 'Why is my country not available yet?', a: 'Each country page is built by researching that country\u2019s actual renewal process and official portal directly, rather than assuming a generic process — that takes time to verify properly. More countries are added as that research is completed.' },
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

