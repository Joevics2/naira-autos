import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, ArrowRight, Globe2 } from 'lucide-react';
import { TOOLS_IT, CATEGORIES_IT } from '@/lib/tools-list-it';

export const metadata: Metadata = {
  title: 'Strumenti Auto Gratuiti | Naira Autos',
  description: 'Strumenti gratuiti per la tua auto in italiano — meccanico virtuale con IA, e altri strumenti in arrivo. Tutto gratuito e senza registrazione.',
  alternates: {
    canonical: 'https://www.naira.autos/strumenti',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      ar: 'https://www.naira.autos/adawat',
      fr: 'https://www.naira.autos/outils',
      pt: 'https://www.naira.autos/ferramentas',
      de: 'https://www.naira.autos/werkzeuge',
      ja: 'https://www.naira.autos/tsuru',
      it: 'https://www.naira.autos/strumenti',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
  keywords: ['strumenti auto gratuiti', 'meccanico virtuale gratis', 'strumenti veicolo in italiano', 'meccanico IA'],
};

const CATEGORY_COLORS: Record<string, string> = {
  'IA e Strumenti Intelligenti': 'text-emerald-600 dark:text-emerald-400',
  'Finanza': 'text-sky-600 dark:text-sky-400',
  'Costi e Manutenzione': 'text-yellow-600 dark:text-yellow-400',
  'Verifica': 'text-rose-600 dark:text-rose-400',
  'Risorse': 'text-violet-600 dark:text-violet-400',
};

const CATEGORY_BORDER: Record<string, string> = {
  'IA e Strumenti Intelligenti': 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
  'Finanza': 'hover:border-sky-500/40 hover:shadow-sky-500/5',
  'Costi e Manutenzione': 'hover:border-yellow-500/40 hover:shadow-yellow-500/5',
  'Verifica': 'hover:border-rose-500/40 hover:shadow-rose-500/5',
  'Risorse': 'hover:border-violet-500/40 hover:shadow-violet-500/5',
};

const ICON_BG: Record<string, string> = {
  'IA e Strumenti Intelligenti': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Finanza': 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  'Costi e Manutenzione': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  'Verifica': 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'Risorse': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export default function ToolsItalianPage() {
  const liveCategories = CATEGORIES_IT.filter((c) => TOOLS_IT.some((t) => t.category === c));

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Strumenti gratuiti
            </span>
            <Link href="/inizio" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Home
            </Link>
            <Link href="/tools" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
          </div>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Centro<br />
            <span className="text-emerald-400">Strumenti</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Tutto ciò che ti serve per comprare, vendere e curare la tua auto — gratis, senza registrazione.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            Traduciamo altri strumenti ogni settimana.
          </p>
        </div>
      </div>

      {/* ── Tool categories ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {liveCategories.map((category) => {
          const categoryTools = TOOLS_IT.filter(t => t.category === category);
          return (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className={`font-black uppercase leading-none ${CATEGORY_COLORS[category]}`}
                  style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-200 ${CATEGORY_BORDER[tool.category]}`}
                    >
                      <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${ICON_BG[tool.category]}`}>
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
          );
        })}
      </div>
    </div>
  );
}
