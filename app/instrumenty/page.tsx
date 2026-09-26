import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Globe2 } from 'lucide-react';
import { TOOLS_RU, CATEGORIES_RU } from '@/lib/tools-list-ru';

export const metadata: Metadata = {
  title: 'Бесплатные автомобильные инструменты | Naira Autos',
  description: 'Бесплатные инструменты для вашего автомобиля на русском языке — скоро появится ИИ-механик и другие инструменты. Всё бесплатно, регистрация не нужна.',
  alternates: {
    canonical: 'https://www.naira.autos/instrumenty',
    languages: {
      en: 'https://www.naira.autos/tools',
      es: 'https://www.naira.autos/herramientas',
      ar: 'https://www.naira.autos/adawat',
      fr: 'https://www.naira.autos/outils',
      pt: 'https://www.naira.autos/ferramentas',
      de: 'https://www.naira.autos/werkzeuge',
      ja: 'https://www.naira.autos/tsuru',
      it: 'https://www.naira.autos/strumenti',
      tr: 'https://www.naira.autos/araclar',
      vi: 'https://www.naira.autos/cong-cu',
      th: 'https://www.naira.autos/khrueang-mue',
      id: 'https://www.naira.autos/alat',
      nl: 'https://www.naira.autos/gereedschappen',
      hi: 'https://www.naira.autos/upkaran',
      ko: 'https://www.naira.autos/dogu',
      ru: 'https://www.naira.autos/instrumenty',
      'x-default': 'https://www.naira.autos/tools',
    },
  },
  keywords: ['бесплатные автомобильные инструменты', 'ИИ механик бесплатно', 'автомобильные инструменты на русском'],
};

export default function ToolsRussianPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Бесплатные инструменты
            </span>
            <Link href="/glavnaya" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Главная
            </Link>
            <Link href="/tools" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/tsuru" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              日本語
            </Link>
          </div>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            Все<br />
            <span className="text-emerald-400">инструменты</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Всё необходимое для покупки, продажи и обслуживания автомобиля — бесплатно, без регистрации.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            Мы добавляем новые русскоязычные инструменты каждую неделю.
          </p>
        </div>
      </div>

      {/* ── Tools by category ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        {CATEGORIES_RU.map((category) => {
          const toolsInCategory = TOOLS_RU.filter((t) => t.category === category);
          if (toolsInCategory.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolsInCategory.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
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
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
          <p className="text-sm text-muted-foreground">
            Больше инструментов на русском скоро появятся — включая ИИ-механика. Загляните позже, а пока попробуйте{' '}
            <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">наши инструменты на английском</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
