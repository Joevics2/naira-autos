import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, History, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Import Age Limit Checker — Choose Your Country | Naira Autos',
  description: 'Free car import age limit checker by country — the current rule, how customs calculates vehicle age, and what happens if your car is too old. Start with Nigeria; more countries coming soon.',
  alternates: { canonical: 'https://www.naira.autos/tools/import-age-limit' },
};

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

export default function ImportAgeLimitCountryPickerPage() {
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
              <span className="text-white/50">Import Age Limit</span>
            </nav>
          </div>
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <History className="h-3 w-3" />
              Free Tool
            </span>
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
          {COUNTRIES.map((c) =>
            c.live ? (
              <Link
                key={c.code}
                href={c.href!}
                className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{c.flag}</span>
                <span className="text-sm font-bold text-foreground">{c.name}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400">Open Guide →</span>
              </Link>
            ) : (
              <div
                key={c.code}
                className="flex flex-col items-center gap-2 p-5 rounded-2xl border border-dashed border-border bg-muted/20 opacity-60 cursor-not-allowed"
                title="Coming soon"
              >
                <span className="text-3xl grayscale">{c.flag}</span>
                <span className="text-sm font-bold text-muted-foreground">{c.name}</span>
                <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
                  <Lock className="h-2.5 w-2.5" /> Soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
