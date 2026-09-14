import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_TR } from '@/lib/tools-list-tr';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';

type LatestPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
};

// ISR: revalidate once every 24h — same pattern as inicio/page.tsx,
// accueil/page.tsx, homu/page.tsx, etc.
export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Naira Autos Türkçe — Arabanız İçin Ücretsiz Araçlar',
  description: 'Türkçe kullanılabilen ücretsiz araba araçları — yapay zeka ile değerleme, kilometre hesaplayıcı ve daha fazlası. Kayıt gerektirmez, tamamen ücretsiz.',
  keywords: 'araba ücretsiz araçlar, yapay zeka araba değerleme, ikinci el araba değerleme, naira autos türkçe',
  openGraph: {
    title: 'Naira Autos Türkçe',
    description: 'Araba alıp satmak, bakımını yapmak için ücretsiz araçlar — Türkçe, kayıt gerektirmeden.',
    url: 'https://www.naira.autos/ana-sayfa',
    siteName: 'Naira Autos',
    locale: 'tr',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/ana-sayfa',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      fr: 'https://www.naira.autos/accueil',
      pt: 'https://www.naira.autos/pagina-inicial',
      de: 'https://www.naira.autos/startseite',
      ja: 'https://www.naira.autos/homu',
      it: 'https://www.naira.autos/inizio',
      tr: 'https://www.naira.autos/ana-sayfa',
      th: 'https://www.naira.autos/na-lak',
      id: 'https://www.naira.autos/beranda',
      vi: 'https://www.naira.autos/trang-chu',
      nl: 'https://www.naira.autos/startpagina',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos Türkçe',
  description: 'Türkçe kullanılabilen ücretsiz araba araçları — yapay zeka ile değerleme ve daha fazlası.',
  url: 'https://www.naira.autos/ana-sayfa',
  inLanguage: 'tr',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function AnaSayfaPage() {
  // Latest Turkish blog posts — hidden entirely when none exist yet,
  // same "never show it half-empty" rule as everything else on the site.
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'tr')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos Türkçe — Arabanız İçin Ücretsiz Araçlar</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Türkçe Site
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Read in English →
            </Link>
            <Link href="/inicio" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Leer en Español →
            </Link>
            <Link href="/home-arabic" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              → بالعربية
            </Link>
            <Link href="/accueil" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Lire en Français →
            </Link>
            <Link href="/pagina-inicial" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Ler em Português →
            </Link>
            <Link href="/startseite" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Auf Deutsch lesen →
            </Link>
            <Link href="/homu" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              日本語で読む →
            </Link>
            <Link href="/inizio" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Leggi in Italiano →
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Arabanız İçin<br /><span className="text-emerald-400">Ücretsiz Araçlar</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos, araba alıp satan ve arabasının bakımını yapan herkes için ücretsiz araçlar sunar — yapay zeka destekli değerleme aracı, hesaplayıcılar ve araç veri kontrol araçları, kayıt gerektirmeden ve tamamen ücretsiz.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Başlangıçta Nijerya piyasası için kurulmuş olsa da, artık aynı araçları daha fazla ülke ve dile sunuyoruz. Bu Türkçe bölüm henüz gelişme aşamasındadır — zamanla daha fazla araç, rehber ve makale ekleyeceğiz.
          </p>
        </div>
      </div>

      {/* ── Mevcut Araçlar ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Mevcut Araçlar
          </h2>
          <Link href="/araclar" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Tümünü gör <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_TR.map((tool) => {
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

      {/* ── Son Yazılar (yalnızca yayınlanmışsa gösterilir) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Son Yazılar
            </h2>
            <Link href="/oto-blog" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Tümünü gör <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/oto-blog/${post.slug}`}
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

      {/* ── Naira Autos Nedir? ── */}
      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-14">
          <div className="max-w-2xl">
            <h2
              className="font-black uppercase text-foreground leading-none mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Naira Autos Nedir?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos, araba alım satımı ve bakımıyla ilgili gerçek sorunları çözmek için oluşturulmuş ücretsiz bir otomotiv araçları platformudur — hesap oluşturmaya veya herhangi bir ücrete gerek yoktur.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bu Türkçe sürüm henüz başlangıç aşamasındadır. Şu anda {TOOLS_TR.length} ücretsiz araç sunuyoruz — fotoğrafla yapay zeka araba değerleme gibi — ve zamanla daha fazla araç, makale ve içerik eklemeye devam edeceğiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
