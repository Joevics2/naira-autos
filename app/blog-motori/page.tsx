import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientIt from '@/components/blog/BlogIndexClientIt';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Blog Auto — Guide all\u2019Acquisto, Manutenzione e Consigli | Naira Autos',
  description: 'Guide esperte per comprare auto, consigli di manutenzione e tutto sul possesso di un veicolo. Articoli pratici per comprare, mantenere e vendere la tua auto con fiducia.',
  alternates: alternatesFor('/blog-motori'),
  openGraph: {
    title: 'Blog Auto — Guide all\u2019Acquisto, Manutenzione e Consigli | Naira Autos',
    description: 'Articoli pratici per comprare, mantenere e vendere la tua auto con fiducia.',
    url: 'https://www.naira.autos/blog-motori',
    siteName: 'Naira Autos',
    locale: 'it',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'it')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogItalianPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="it" hub="blog" />
          <LanguagePills path="/blog-motori" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog Naira Autos in Italiano</h1>
          <p className="text-white/80 max-w-2xl">
            Consigli e guide utili per comprare e vendere auto
          </p>
          <Link prefetch={false}
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Vedi il glossario automobilistico
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientIt posts={posts} />
      </div>
    </div>
  );
}
