import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown, History } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Import Age Limit Checker — Choose Your Country | Naira Autos',
  description: 'Free car import age limit checker by country — the current rule, how customs calculates vehicle age, and what happens if your car is too old. Start with Nigeria; more countries added regularly.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-age-limit' },
};

/**
 * Roadmap of countries for this tool. Only entries with `live: true` are
 * rendered — everything else stays out of the page entirely (no "Soon"
 * placeholders) until the page for that country actually exists.
 * To ship a new country: build its page, then flip `live: true` and add `href`.
 */
const COUNTRIES: { code: string; name: string; flag: string; href?: string; live: boolean }[] = [
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', href: '/tools/import-age-limit/nigeria', live: true },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', live: false },
  { code: 'us', name: 'United States',  flag: '🇺🇸', live: false },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', live: false },
  { code: 'ke', name: 'Kenya',          flag: '🇰🇪', live: false },
  { code: 'gh', name: 'Ghana',          flag: '🇬🇭', live: false },
  { code: 'in', name: 'India',          flag: '🇮🇳', live: false },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', live: false },
];

const LIVE_COUNTRIES = COUNTRIES.filter((c) => c.live);

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/import-age-limit',
      name: 'Car Import Age Limit Checker — Choose Your Country',
      description: 'Free car import age limit checker by country — the current rule, how customs calculates vehicle age, and what happens if your car is too old.',
      url: 'https://www.naira.autos/tools/import-age-limit',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How is a vehicle\u2019s age calculated for import purposes?', acceptedAnswer: { '@type': 'Answer', text: 'Most countries calculate it from the manufacture year printed on the vehicle\u2019s compliance plate or registration document, not the model year used in marketing — the two can differ by a year. Some countries count from the first registration date instead. Check your specific country\u2019s method, since this detail alone can determine whether a borderline car qualifies.' } },
        { '@type': 'Question', name: 'What happens if my car is too old to import?', acceptedAnswer: { '@type': 'Answer', text: 'Typically one of a few outcomes: the shipment is refused entry and must be re-exported at the importer\u2019s cost, it\u2019s seized and subject to forfeiture, or a steep additional penalty duty applies on top of normal import charges. The exact consequence depends on the destination country\u2019s customs law.' } },
        { '@type': 'Question', name: 'Why is my country not available yet?', acceptedAnswer: { '@type': 'Answer', text: 'Each country page is built with the actual current statute or customs regulation researched directly, rather than a generic assumption — that takes time to verify properly. More countries are added as that research is completed.' } },
      ],
    },
  ],
};

export default function ImportAgeLimitCountryPickerPage() {
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
              <span className="text-white/50">Import Age Limit</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <History className="h-3 w-3" />
              Free Tool
            </span>
            <span className="inline-flex ml-2 text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-5">Last verified: August 2026</span>
            <h1 className="font-black uppercase text-white leading-[0.95] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)' }}>
              Car Import<br /><span className="text-emerald-400">Age Limit Checker</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base leading-relaxed">
              Is your car too old to import? Check the current rule, how the age is calculated, and what happens if it doesn&apos;t qualify — pick your country to get started.
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

        <div className="mt-14 max-w-screen-lg space-y-10">
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>How Import Age Limits Generally Work</h2>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">Most countries that restrict used-vehicle imports set a maximum age — commonly somewhere between 3 and 15 years old — measured from the manufacture date on the vehicle's compliance plate, not the marketing model year. The rule, the exact cutoff, and the consequence for a car that doesn't qualify vary significantly by country, which is why each country page here is built with the actual current statute researched directly rather than a general assumption applied everywhere.</p>
          </div>
          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>FAQ</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { q: 'How is a vehicle\u2019s age calculated for import purposes?', a: 'Most countries calculate it from the manufacture year on the vehicle\u2019s compliance plate, not the model year used in marketing — the two can differ by a year. Some countries count from first registration instead. This detail alone can determine whether a borderline car qualifies.' },
                { q: 'What happens if my car is too old to import?', a: 'Typically one of a few outcomes: refused entry and re-exported at the importer\u2019s cost, seized and forfeited, or hit with a steep penalty duty on top of normal charges. The exact consequence depends on the destination country\u2019s law.' },
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

