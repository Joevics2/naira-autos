import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Globe2 } from 'lucide-react';
import { TOOLS_KO, CATEGORIES_KO } from '@/lib/tools-list-ko';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: '무료 자동차 도구 | Naira Autos',
  description: '한국어로 제공되는 무료 자동차 도구 — 곧 AI 정비사 등 더 많은 도구가 추가됩니다. 모두 무료이며 가입이 필요 없습니다.',
  alternates: alternatesFor('/dogu'),
  keywords: ['무료 자동차 도구', 'AI 정비사 무료', '자동차 도구 한국어'],
};

export default function ToolsKoreanPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <PageNav lang="ko" hub="tools" />
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              무료 도구
            </span>
          </div>
          <LanguagePills path="/dogu" className="mb-6" />
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            모든<br />
            <span className="text-emerald-400">도구</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            자동차 구매, 판매, 관리에 필요한 모든 것 — 무료, 가입 불필요.
          </p>
          <p className="text-white/30 text-xs mt-3 flex items-center gap-1.5">
            <Globe2 className="h-3 w-3" />
            매주 더 많은 한국어 도구를 추가하고 있습니다.
          </p>
        </div>
      </div>

      {/* ── Tools by category ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        {CATEGORIES_KO.map((category) => {
          const toolsInCategory = TOOLS_KO.filter((t) => t.category === category);
          if (toolsInCategory.length === 0) return null;

          return (
            <div key={category} className="mb-10">
              <h2 className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-4">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {toolsInCategory.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link prefetch={false}
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
            한국어로 된 더 많은 도구가 곧 제공됩니다 — AI 정비사를 포함해서요. 나중에 다시 확인해 주세요, 그동안{' '}
            <Link prefetch={false} href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">영어 도구</Link>를 사용해 보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
