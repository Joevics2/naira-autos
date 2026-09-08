import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_DE } from '@/lib/tools-list-de';
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
  title: 'Naira Autos auf Deutsch — Kostenlose Werkzeuge für Ihr Auto',
  description: 'Kostenlose Werkzeuge für Ihr Auto auf Deutsch — virtueller KI-Mechaniker, und weitere Werkzeuge folgen bald. Ohne Registrierung, ohne Kosten.',
  keywords: 'kostenlose Auto-Werkzeuge, virtueller Mechaniker, KI-Mechaniker, Naira Autos auf Deutsch',
  openGraph: {
    title: 'Naira Autos auf Deutsch',
    description: 'Kostenlose Werkzeuge zum Kaufen, Verkaufen und Pflegen Ihres Autos — auf Deutsch, ohne Registrierung.',
    url: 'https://www.naira.autos/startseite',
    siteName: 'Naira Autos',
    locale: 'de_DE',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/startseite',
    languages: {
      en: 'https://www.naira.autos/',
      es: 'https://www.naira.autos/inicio',
      ar: 'https://www.naira.autos/home-arabic',
      fr: 'https://www.naira.autos/accueil',
      pt: 'https://www.naira.autos/pagina-inicial',
      de: 'https://www.naira.autos/startseite',
      'x-default': 'https://www.naira.autos/',
    },
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Naira Autos auf Deutsch',
  description: 'Kostenlose Werkzeuge für Ihr Auto auf Deutsch — virtueller KI-Mechaniker, und weitere Werkzeuge folgen bald.',
  url: 'https://www.naira.autos/startseite',
  inLanguage: 'de',
  publisher: {
    '@type': 'Organization',
    name: 'Naira Autos',
    logo: { '@type': 'ImageObject', url: 'https://www.naira.autos/logo.png' },
  },
};

export default async function HomeGermanPage() {
  const { data: latestPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image')
    .eq('published', true)
    .eq('language', 'de')
    .order('created_at', { ascending: false })
    .limit(3);

  const posts = (latestPosts ?? []) as LatestPost[];

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />
      <h1 className="sr-only">Naira Autos auf Deutsch — Kostenlose Werkzeuge für Ihr Auto</h1>

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
              <Sparkles className="h-3 w-3" />
              Deutsche Seite
            </span>
            <Link href="/" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
              English
            </Link>
          </div>
          <p
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 68px)' }}
          >
            Werkzeuge<br /><span className="text-emerald-400">für Ihr Auto</span>
          </p>
          <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed mb-3">
            Naira Autos bietet kostenlose Werkzeuge für alle, die ein Auto kaufen, verkaufen oder pflegen — ein virtueller KI-Mechaniker, Rechner und Prüfwerkzeuge für Fahrzeugdaten, ohne Registrierung und ohne Kosten.
          </p>
          <p className="text-white/50 text-sm max-w-2xl leading-relaxed">
            Wir haben mit dem nigerianischen Markt begonnen, und bringen jetzt dieselben Werkzeuge in weitere Länder und Sprachen — darunter Deutschland. Dieser deutsche Bereich steht noch am Anfang, und wir werden mit der Zeit weitere Werkzeuge und Artikel hinzufügen.
          </p>
        </div>
      </div>

      {/* ── Featured German tools ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
          >
            Verfügbare Werkzeuge
          </h2>
          <Link href="/werkzeuge" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
            Alle ansehen <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOLS_DE.map((tool) => {
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

      {/* ── Latest posts (only if German content exists) ── */}
      {posts.length > 0 && (
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 pb-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
            >
              Neueste Artikel
            </h2>
            <Link href="/autoblog" className="flex items-center gap-1.5 text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Alle ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/autoblog/${post.slug}`}
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
              Was ist Naira Autos?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              Naira Autos ist eine Plattform mit kostenlosen Werkzeugen, um echte Probleme beim Kauf, Verkauf oder der Pflege eines Autos zu lösen — ohne ein Konto erstellen oder etwas bezahlen zu müssen.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Dieser deutsche Bereich steht noch am Anfang. Aktuell umfasst er {TOOLS_DE.length} kostenloses Werkzeug — einen virtuellen KI-Mechaniker, geschrieben in echtem Deutsch — und wir werden mit der Zeit weitere Werkzeuge und Artikel hinzufügen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
