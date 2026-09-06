import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { TOOLS_AR } from '@/lib/tools-list-ar';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
};

// ISR: same reasoning as app/inicio/page.tsx — revalidate once every 24h
// so newly-published Arabic posts show up within a day, instead of
// hitting Supabase on every request.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'نيرا أوتوس بالعربية — أدوات سيارات مجانية',
  description: 'أدوات سيارات مجانية باللغة العربية — ميكانيكي افتراضي بالذكاء الاصطناعي، وأدوات أخرى قادمة قريبًا. بدون تسجيل، بدون أي تكلفة.',
  keywords: 'أدوات سيارات مجانية, ميكانيكي افتراضي, ميكانيكي بالذكاء الاصطناعي, نيرا أوتوس بالعربية',
  openGraph: {
    title: 'نيرا أوتوس بالعربية',
    description: 'أدوات مجانية لشراء وبيع وصيانة سيارتك — باللغة العربية، بدون تسجيل.',
    url: 'https://www.naira.autos/home-arabic',
    siteName: 'Naira Autos',
    locale: 'ar',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/home-arabic',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'نيرا أوتوس بالعربية',
  description: 'أدوات سيارات مجانية باللغة العربية — ميكانيكي افتراضي بالذكاء الاصطناعي، وأدوات أخرى قادمة قريبًا.',
  url: 'https://www.naira.autos/home-arabic',
  inLanguage: 'ar',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeArabicPage() {
  // Latest Arabic blog posts — hidden entirely when none exist yet, same
  // "never show it half-empty" rule as the Spanish homepage. Appears
  // automatically the moment the first Arabic post is published.
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'ar')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">نيرا أوتوس بالعربية — أدوات سيارات مجانية</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              موقع بالعربية
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              اقرأ بالإنجليزية ←
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            أدوات<br /><span className="text-emerald-400">لسيارتك</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            يقدّم Naira Autos أدوات مجانية لمن يشتري أو يبيع أو يصيّن سيارته — ميكانيكي افتراضي بالذكاء الاصطناعي، وحاسبات ومدققات لبيانات المركبة، بدون تسجيل وبدون أي تكلفة.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            بدأنا بخدمة السوق النيجيري، والآن ننقل الأدوات نفسها إلى المزيد من الدول واللغات — بما في ذلك مصر والسعودية والإمارات وقطر. هذا القسم بالعربية في بداياته، وسنواصل إضافة أدوات ومقالات مع الوقت.
          </p>
        </div>
      </div>

      {/* ── Featured Arabic tools ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            الأدوات المتاحة
          </h2>
          <Link href="/adawat" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            <ArrowLeft className="h-4 w-4" /> عرض الكل
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_AR.map((tool) => {
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

      {/* ── Latest posts (only if Arabic content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              أحدث المقالات
            </h2>
            <Link href="/blog-arabic" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              <ArrowLeft className="h-4 w-4" /> عرض الكل
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog-arabic/${post.slug}`}
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
              ما هو Naira Autos؟
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos منصة أدوات مجانية لحل مشاكل حقيقية عند شراء أو بيع أو صيانة سيارة — بدون الحاجة لإنشاء حساب أو دفع أي مبلغ.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              هذا القسم بالعربية في مراحله الأولى. حاليًا يضم {TOOLS_AR.length} أداة مجانية — ميكانيكي افتراضي بالذكاء الاصطناعي، مصمم أيضًا ليأخذ في الاعتبار ظروف القيادة في مصر والسعودية والإمارات وقطر — وسنضيف المزيد من الأدوات والمقالات مع الوقت.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
