import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_ID } from '@/lib/tools-list-id';
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
  title: 'Naira Autos Bahasa Indonesia — Alat Gratis untuk Mobil Anda',
  description: 'Alat gratis untuk mobil Anda dalam Bahasa Indonesia — kami baru memulai di pasar Indonesia, dan akan segera menambahkan alat lainnya. Tanpa pendaftaran, tanpa biaya.',
  keywords: 'alat mobil gratis, Naira Autos Indonesia, mekanik AI',
  openGraph: {
    title: 'Naira Autos Bahasa Indonesia',
    description: 'Alat gratis untuk membeli, menjual, dan merawat mobil — dalam Bahasa Indonesia, tanpa pendaftaran.',
    url: 'https://www.naira.autos/beranda',
    siteName: 'Naira Autos',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/beranda',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      fr: 'https://www.naira.autos/accueil',
      pt: 'https://www.naira.autos/pagina-inicial',
      de: 'https://www.naira.autos/startseite',
      ja: 'https://www.naira.autos/homu',
      it: 'https://www.naira.autos/inizio',
      id: 'https://www.naira.autos/beranda',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos Bahasa Indonesia',
  description: 'Alat gratis untuk mobil Anda dalam Bahasa Indonesia — akan segera hadir lebih banyak.',
  url: 'https://www.naira.autos/beranda',
  inLanguage: 'id',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeIndonesianPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'id')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos Bahasa Indonesia — Alat Gratis untuk Mobil Anda</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Bahasa Indonesia
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
            Alat<br /><span className="text-emerald-400">untuk Mobil Anda</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos menyediakan alat gratis bagi siapa saja yang membeli, menjual, atau merawat mobil — mekanik virtual AI, kalkulator, dan alat pemeriksaan data kendaraan, tanpa perlu mendaftar dan tanpa biaya.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Kami memulai dari pasar Nigeria, dan sekarang membawa alat yang sama ke lebih banyak negara dan bahasa — termasuk Indonesia. Bagian Bahasa Indonesia ini baru saja dimulai, dan kami akan terus menambahkan alat serta artikel baru seiring waktu.
          </p>
        </div>
      </div>

      {/* ── Coming soon (no Indonesian tools live yet) ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Alat yang Akan Datang
          </h2>
          <Link href="/alat" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_ID.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              Kami sedang menerjemahkan alat pertama ke Bahasa Indonesia. Kunjungi lagi segera — atau coba{' '}
              <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">alat berbahasa Inggris kami</Link>{' '}sementara menunggu.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_ID.map((tool) => {
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

      {/* ── Latest posts (only if Indonesian content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Artikel Terbaru
            </h2>
            <Link href="/blog-mobil" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Lihat Semua <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog-mobil/${post.slug}`}
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
              Apa itu Naira Autos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos adalah platform berisi alat gratis untuk menyelesaikan masalah nyata seputar membeli, menjual, atau merawat mobil — tanpa perlu membuat akun atau membayar apa pun.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Bagian Bahasa Indonesia ini baru saja dimulai. Saat ini belum ada alat khusus Bahasa Indonesia, tetapi kami sedang menerjemahkan mekanik virtual AI dan alat lainnya ke Bahasa Indonesia secepatnya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
