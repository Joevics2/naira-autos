import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_RU } from '@/lib/tools-list-ru';
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
  title: 'Naira Autos на русском — бесплатные инструменты для вашего автомобиля',
  description: 'Бесплатные инструменты для вашего автомобиля на русском языке — мы только что вышли на российский рынок и скоро добавим больше инструментов. Регистрация не требуется, полностью бесплатно.',
  keywords: 'бесплатные автомобильные инструменты, Naira Autos на русском, ИИ механик',
  openGraph: {
    title: 'Naira Autos на русском',
    description: 'Бесплатные инструменты для покупки, продажи и обслуживания автомобиля — на русском языке, без регистрации.',
    url: 'https://www.naira.autos/glavnaya',
    siteName: 'Naira Autos',
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: alternatesFor('/glavnaya'),
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos на русском',
  description: 'Бесплатные инструменты для вашего автомобиля на русском языке — скоро появится больше инструментов.',
  url: 'https://www.naira.autos/glavnaya',
  inLanguage: 'ru',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeRussianPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'ru')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos на русском — бесплатные инструменты для вашего автомобиля</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Русский
            </span>
          </div>
          <LanguagePills path="/glavnaya" className="mb-5" />
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Инструменты<br /><span className="text-emerald-400">для вашего авто</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos предоставляет бесплатные инструменты для всех, кто покупает, продаёт или обслуживает автомобиль — виртуальный ИИ-механик, калькуляторы и инструменты проверки данных автомобиля, без регистрации и полностью бесплатно.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Мы начали с нигерийского рынка, а теперь предлагаем те же инструменты в большем числе стран и на большем числе языков — включая Россию. Эта русская версия только что запущена, и мы продолжим добавлять инструменты и статьи со временем.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Russian tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Скоро появятся инструменты
          </h2>
          <Link prefetch={false} href="/instrumenty" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Смотреть все <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_RU.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Мы готовим наш первый инструмент на русском языке. Загляните позже — а пока попробуйте{' '}
              <Link prefetch={false} href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">наши инструменты на английском</Link>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_RU.map((tool) => {
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

      {/* ── Latest posts (only if Russian content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Последние статьи
            </h2>
            <Link prefetch={false} href="/avto-blog" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Смотреть все <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link prefetch={false}
                key={post.id}
                href={`/avto-blog/${post.slug}`}
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
              Что такое Naira Autos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos — это платформа, предоставляющая бесплатные инструменты для решения реальных проблем при покупке, продаже или обслуживании автомобиля — без создания аккаунта и без какой-либо платы.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Эта русская версия только что запущена. Пока отдельных инструментов на русском языке нет, но мы как можно скорее переводим виртуального ИИ-механика и другие инструменты на русский.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
