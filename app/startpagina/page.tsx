import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_NL } from '@/lib/tools-list-nl';
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
  title: 'Naira Autos in het Nederlands — Gratis Tools voor Uw Auto',
  description: 'Gratis tools voor uw auto in het Nederlands — we zijn net begonnen met de Nederlandse markt en voegen binnenkort meer tools toe. Geen registratie, geen kosten.',
  keywords: 'gratis auto tools, Naira Autos Nederlands, AI monteur, afstandscalculator Nederland',
  openGraph: {
    title: 'Naira Autos in het Nederlands',
    description: 'Gratis tools om een auto te kopen, verkopen of te onderhouden — in het Nederlands, zonder registratie.',
    url: 'https://www.naira.autos/startpagina',
    siteName: 'Naira Autos',
    locale: 'nl_NL',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/startpagina',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      fr: 'https://www.naira.autos/accueil',
      pt: 'https://www.naira.autos/pagina-inicial',
      de: 'https://www.naira.autos/startseite',
      ja: 'https://www.naira.autos/homu',
      it: 'https://www.naira.autos/inizio',
      nl: 'https://www.naira.autos/startpagina',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos in het Nederlands',
  description: 'Gratis tools voor uw auto in het Nederlands.',
  url: 'https://www.naira.autos/startpagina',
  inLanguage: 'nl',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeDutchPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'nl')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos in het Nederlands — Gratis Tools voor Uw Auto</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Nederlands
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/startseite" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              Deutsch
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Gereedschappen<br /><span className="text-emerald-400">voor uw auto</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos biedt gratis tools voor iedereen die een auto koopt, verkoopt of onderhoudt — een AI-monteur, rekentools en tools om voertuiggegevens te controleren, zonder registratie en volledig gratis.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            We zijn begonnen in Nigeria en brengen dezelfde tools nu naar meer landen en talen — waaronder Nederland. Dit Nederlandse gedeelte is net van start gegaan, en we blijven doorlopend meer tools en artikelen toevoegen.
          </p>
        </div>
      </div>

      {/* ── Available tools ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Beschikbare Tools
          </h2>
          <Link href="/gereedschappen" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Bekijk Alles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {TOOLS_NL.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
            <p className="text-sm text-muted-foreground">
              We voegen binnenkort meer Nederlandstalige tools toe. Kom snel terug — of probeer intussen{' '}
              <Link href="/tools" className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2">onze Engelstalige tools</Link>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOOLS_NL.map((tool) => {
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

      {/* ── Latest posts (only if Dutch content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Nieuwste Artikelen
            </h2>
            <Link href="/auto-blog" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Bekijk Alles <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/auto-blog/${post.slug}`}
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
              Wat is Naira Autos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos is een platform met gratis tools om echte problemen op te lossen bij het kopen, verkopen of onderhouden van een auto — zonder een account aan te maken of ergens voor te betalen.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dit Nederlandse gedeelte is net van start gegaan. We beginnen met een afstandscalculator voor Nederland en breiden dit gestaag uit met meer tools, zoals een AI-monteur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
