import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, FileText, Lock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vehicle Registration Fee Calculator — Choose Your Country | Naira Autos',
  description: 'Free vehicle registration fee calculator by country — number plate, driver\'s licence, change of ownership, and roadworthiness costs. Start with Nigeria; more countries coming soon.',
  alternates: { canonical: 'https://www.naira.autos/tools/registration-fee-calculator-countries' },
  openGraph: {
    title: 'Vehicle Registration Fee Calculator — Choose Your Country | Naira Autos',
    description: 'Free vehicle registration fee calculator by country — number plate, driver\'s licence, change of ownership, and roadworthiness costs.',
    url: 'https://www.naira.autos/tools/registration-fee-calculator-countries',
  },
};

/**
 * Roadmap of countries for this tool. Only entries with `live: true` link
 * out to a working calculator — everything else renders as a disabled
 * "Soon" tile so the roadmap is visible without being clickable.
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

export default function RegistrationFeeCalculatorCountryPickerPage() {
  return (
    <div className="min-h-screen bg-background">
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
          {COUNTRIES.map((c) =>
            c.live ? (
              <Link
                key={c.code}
                href={c.href!}
                className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-border bg-card hover:border-blue-500/40 hover:shadow-lg transition-all"
              >
                <span className="text-3xl">{c.flag}</span>
                <span className="text-sm font-bold text-foreground">{c.name}</span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 dark:text-blue-400">Open Calculator →</span>
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
