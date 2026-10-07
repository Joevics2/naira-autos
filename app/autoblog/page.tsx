import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientDe from '@/components/blog/BlogIndexClientDe';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Auto-Blog — Kaufratgeber, Wartung und Tipps | Naira Autos',
  description: 'Fachkundige Ratgeber zum Autokauf, Wartungstipps und alles rund um den Autobesitz. Praktische Artikel, um Ihr Auto mit Vertrauen zu kaufen, zu warten und zu verkaufen.',
  alternates: alternatesFor('/autoblog'),
  openGraph: {
    title: 'Auto-Blog — Kaufratgeber, Wartung und Tipps | Naira Autos',
    description: 'Praktische Artikel, um Ihr Auto mit Vertrauen zu kaufen, zu warten und zu verkaufen.',
    url: 'https://www.naira.autos/autoblog',
    siteName: 'Naira Autos',
    locale: 'de',
    type: 'website',
  },
};

export const revalidate = 604800;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'de')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogGermanPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="de" hub="blog" />
          <LanguagePills path="/autoblog" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Blog auf Deutsch</h1>
          <p className="text-white/80 max-w-2xl">
            Nützliche Tipps und Ratgeber zum Kaufen und Verkaufen von Autos
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Auto-Glossar ansehen
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientDe posts={posts} />
      </div>
    </div>
  );
}
