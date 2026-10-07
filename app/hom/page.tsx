import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_KO } from '@/lib/tools-list-ko';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
};

export const revalidate = 604800;

export const metadata: Metadata = {
  title: 'Naira Autos 한국어 — 무료 자동차 도구',
  description: '한국어로 제공되는 무료 자동차 도구 — 한국 시장에 막 진출했으며 곧 더 많은 도구를 추가할 예정입니다. 가입 없이 완전 무료입니다.',
  keywords: '무료 자동차 도구, Naira Autos 한국어, AI 정비사',
  openGraph: {
    title: 'Naira Autos 한국어',
    description: '자동차 구매, 판매, 관리를 위한 무료 도구 — 한국어로, 가입 없이 이용 가능합니다.',
    url: 'https://www.naira.autos/hom',
    siteName: 'Naira Autos',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: alternatesFor('/hom'),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos 한국어',
  description: '한국어로 제공되는 무료 자동차 도구 — 곧 더 많은 도구가 추가됩니다.',
  url: 'https://www.naira.autos/hom',
  inLanguage: 'ko',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeKoreanPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'ko')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos 한국어 — 무료 자동차 도구</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              한국어
            </span>
          </div>
          <LanguagePills path="/hom" className="mb-5" />
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            당신의 차를 위한<br /><span className="text-emerald-400">무료 도구</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos는 자동차를 구매, 판매 또는 관리하는 모든 사람을 위한 무료 도구를 제공합니다 — AI 가상 정비사, 계산기, 차량 데이터 조회 도구까지, 가입도 비용도 필요 없습니다.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            저희는 나이지리아 시장에서 시작했으며, 이제 더 많은 국가와 언어로 동일한 도구를 제공하고 있습니다 — 한국도 포함됩니다. 이 한국어 버전은 방금 출시되었으며, 시간이 지나면서 더 많은 도구와 글을 추가할 예정입니다.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Korean tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            곧 출시될 도구
          </h2>
          <Link prefetch={false} href="/dogu" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            모두 보기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_KO.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              한국어로 된 첫 번째 도구를 준비 중입니다. 나중에 다시 확인해 주세요 — 그동안{' '}
              <Link prefetch={false} href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">영어 도구</Link>를 사용해 보실 수 있습니다.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_KO.map((tool) => {
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
        )}
      </div>

      {/* ── Latest posts (only if Korean content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              최신 글
            </h2>
            <Link prefetch={false} href="/cha-beullogeu" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              모두 보기 <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link prefetch={false}
                key={post.id}
                href={`/cha-beullogeu/${post.slug}`}
                className="group rounded-2xl border border-border bg-card overflow-hidden hover:border-emerald-500/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featured_image || getBlogFallbackImage(post.slug)}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="font-bold text-sm text-foreground leading-tight line-clamp-2 mb-1">{post.title}</p>
                  {post.excerpt && <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* ── About Naira Autos ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl">
            <h2
              className="font-black uppercase text-foreground leading-none mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Naira Autos란?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos는 자동차를 구매, 판매 또는 관리할 때 발생하는 실질적인 문제를 해결하기 위한 무료 도구를 제공하는 플랫폼입니다 — 계정을 만들거나 비용을 지불할 필요가 없습니다.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              이 한국어 버전은 방금 출시되었습니다. 현재 한국어 전용 도구는 아직 없지만, 저희는 AI 가상 정비사를 비롯한 다른 도구들을 최대한 빨리 한국어로 번역하고 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
