import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { TOOLS } from '@/lib/tools-list';

export const metadata: Metadata = {
  title: 'Free Calculators & Diagnostic Resources | Naira Autos',
  description: 'A handful of free calculators and diagnostic resources for car owners — import duty, AI mechanic, auto loan, VIN check, fuel cost, and more.',
  alternates: {
    canonical: 'https://www.naira.autos/tools',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
};


const CATEGORIES = ['AI & Smart', 'Finance', 'Running Costs', 'Due Diligence', 'Resources'];

const CATEGORY_COLORS: Record<string, string> = {
  'AI & Smart': 'text-emerald-600 dark:text-emerald-400',
  'Finance': 'text-sky-600 dark:text-sky-400',
  'Running Costs': 'text-yellow-600 dark:text-yellow-400',
  'Due Diligence': 'text-rose-600 dark:text-rose-400',
  'Resources': 'text-violet-600 dark:text-violet-400',
};

const CATEGORY_BORDER: Record<string, string> = {
  'AI & Smart': 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
  'Finance': 'hover:border-sky-500/40 hover:shadow-sky-500/5',
  'Running Costs': 'hover:border-yellow-500/40 hover:shadow-yellow-500/5',
  'Due Diligence': 'hover:border-rose-500/40 hover:shadow-rose-500/5',
  'Resources': 'hover:border-violet-500/40 hover:shadow-violet-500/5',
};

const ICON_BG: Record<string, string> = {
  'AI & Smart': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Finance': 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  'Running Costs': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  'Due Diligence': 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'Resources': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            <Sparkles className="h-3 w-3" />
            Free Tools
          </span>
          <Link href="/herramientas" className="ml-2 text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors mb-5 inline-block">
            Leer en Español →
          </Link>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            AUTOMOTIVE<br />
            <span className="text-emerald-400">TOOLS HUB</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Every tool you need to buy, sell, and own a car — all free, all in one place.
          </p>
        </div>
      </div>

      {/* ── Tool categories ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {CATEGORIES.map((category) => {
          const categoryTools = TOOLS.filter(t => t.category === category);
          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className={`font-black uppercase leading-none ${CATEGORY_COLORS[category]}`}
                  style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Tool cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-200 ${CATEGORY_BORDER[tool.category]}`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${ICON_BG[tool.category]}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Text */}
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

                      {/* Arrow */}
                      <ArrowRight className="flex-shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all mt-0.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
