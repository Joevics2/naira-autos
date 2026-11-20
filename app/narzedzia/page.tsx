import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Globe2 } from 'lucide-react';
import { TOOLS_PL, CATEGORIES_PL } from '@/lib/tools-list-pl';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Darmowe Narzędzia Samochodowe | Naira Autos',
  description: 'Darmowe narzędzia samochodowe po polsku — kalkulator importu samochodu z akcyzą, VAT i PCC oraz kolejne narzędzia wkrótce. Wszystko za darmo i bez rejestracji.',
  alternates: alternatesFor('/narzedzia'),
  keywords: ['darmowe narzędzia samochodowe', 'kalkulator akcyzy samochód', 'import samochodu do Polski', 'narzędzia dla kierowców'],
};

export default function NarzedziaPage() {
  return (
    <div className="min-h-screen bg-background" lang="pl">
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Darmowe narzędzia
            </span>
          </div>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Centrum<br />
            <span className="text-emerald-400">Narzędzi</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Wszystko, czego potrzebujesz, by kupić, sprowadzić i utrzymać samochód — za darmo i bez rejestracji.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            Co tydzień tłumaczymy kolejne narzędzia.
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {CATEGORIES_PL.filter((c) => TOOLS_PL.some((t) => t.category === c)).map((category) => (
          <div key={category}>
            <div className="flex items-center gap-3 mb-6">
              <h2
                className="font-black uppercase leading-none text-sky-600 dark:text-sky-400"
                style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
              >
                {category}
              </h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {TOOLS_PL.filter((t) => t.category === category).map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    prefetch={false}
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-200 hover:border-sky-500/40 hover:shadow-sky-500/5"
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-bold text-sm text-foreground leading-tight">{tool.label}</p>
                        {tool.badge && (
                          <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider ${tool.badgeColor}`}>
                            {tool.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                    </div>
                    <ArrowRight className="flex-shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all mt-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
