import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_VI } from '@/lib/tools-list-vi';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
};

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Naira Autos Tiếng Việt — Công Cụ Miễn Phí Cho Ô Tô Của Bạn',
  description: 'Công cụ miễn phí cho ô tô của bạn bằng tiếng Việt — chúng tôi vừa mới bắt đầu tại thị trường Việt Nam và sẽ sớm bổ sung thêm công cụ. Không cần đăng ký, hoàn toàn miễn phí.',
  keywords: 'công cụ ô tô miễn phí, Naira Autos tiếng Việt, thợ máy AI',
  openGraph: {
    title: 'Naira Autos Tiếng Việt',
    description: 'Công cụ miễn phí để mua, bán và bảo dưỡng ô tô — bằng tiếng Việt, không cần đăng ký.',
    url: 'https://www.naira.autos/trang-chu',
    siteName: 'Naira Autos',
    locale: 'vi_VN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/trang-chu',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      fr: 'https://www.naira.autos/accueil',
      pt: 'https://www.naira.autos/pagina-inicial',
      de: 'https://www.naira.autos/startseite',
      ja: 'https://www.naira.autos/homu',
      it: 'https://www.naira.autos/inizio',
      vi: 'https://www.naira.autos/trang-chu',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos Tiếng Việt',
  description: 'Công cụ miễn phí cho ô tô của bạn bằng tiếng Việt — sẽ sớm có thêm nhiều công cụ.',
  url: 'https://www.naira.autos/trang-chu',
  inLanguage: 'vi',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeVietnamesePage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'vi')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos Tiếng Việt — Công Cụ Miễn Phí Cho Ô Tô Của Bạn</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Tiếng Việt
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/homu" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              日本語
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Công Cụ<br /><span className="text-emerald-400">Cho Ô Tô Của Bạn</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos cung cấp các công cụ miễn phí cho bất kỳ ai đang mua, bán hoặc bảo dưỡng ô tô — thợ máy ảo AI, máy tính và công cụ kiểm tra dữ liệu xe, không cần đăng ký và hoàn toàn miễn phí.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Chúng tôi khởi đầu tại thị trường Nigeria, và giờ đây đang mang cùng những công cụ đó đến nhiều quốc gia và ngôn ngữ hơn — bao gồm cả Việt Nam. Phiên bản tiếng Việt này vừa mới ra mắt, và chúng tôi sẽ tiếp tục bổ sung thêm công cụ và bài viết theo thời gian.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Vietnamese tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Công Cụ Sắp Ra Mắt
          </h2>
          <Link href="/cong-cu" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Xem Tất Cả <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_VI.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Chúng tôi đang chuyển ngữ công cụ đầu tiên sang tiếng Việt. Hãy quay lại sau — hoặc thử{' '}
              <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">các công cụ tiếng Anh</Link>{' '}trong lúc chờ đợi.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_VI.map((tool) => {
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
        )}
      </div>

      {/* ── Latest posts (only if Vietnamese content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Bài Viết Mới Nhất
            </h2>
            <Link href="/blog-o-to" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Xem Tất Cả <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog-o-to/${post.slug}`}
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
              Naira Autos Là Gì?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos là nền tảng cung cấp các công cụ miễn phí để giải quyết những vấn đề thực tế khi mua, bán hoặc bảo dưỡng ô tô — không cần tạo tài khoản hay trả bất kỳ khoản phí nào.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Phiên bản tiếng Việt này vừa mới ra mắt. Hiện tại chưa có công cụ riêng bằng tiếng Việt, nhưng chúng tôi đang chuyển ngữ thợ máy ảo AI và các công cụ khác sang tiếng Việt trong thời gian sớm nhất.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
