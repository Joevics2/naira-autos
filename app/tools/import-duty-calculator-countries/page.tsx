import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Calculator } from 'lucide-react';

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
  { code: 'za', name: 'South Africa',          flag: '🇿🇦', live: false },
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

export default function ImportDutyCountryPickerPage() {
  return (
    <div className="min-h-screen bg-background">
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
      </div>
    </div>
  );
}
