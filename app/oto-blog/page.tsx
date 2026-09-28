import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientTr from '@/components/blog/BlogIndexClientTr';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Oto Blog — Satın Alma Rehberleri, Bakım ve İpuçları | Naira Autos',
  description: 'Araba satın alma rehberleri, bakım ipuçları ve araç sahipliğiyle ilgili her şey. Arabanızı güvenle almak, bakımını yapmak ve satmak için pratik yazılar.',
  alternates: alternatesFor('/oto-blog'),
  openGraph: {
    title: 'Oto Blog — Satın Alma Rehberleri, Bakım ve İpuçları | Naira Autos',
    description: 'Arabanızı güvenle almak, bakımını yapmak ve satmak için pratik yazılar.',
    url: 'https://www.naira.autos/oto-blog',
    siteName: 'Naira Autos',
    locale: 'tr',
    type: 'website',
  },
};

// ISR: fetch once, cache for 24h — same pattern as blog-de-autos/page.tsx
export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'tr')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function OtoBlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="tr" hub="blog" />
          <LanguagePills path="/oto-blog" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Oto Blog</h1>
          <p className="text-white/80 max-w-2xl">
            Araba alıp satmak için ipuçları, rehberler ve bilgiler
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Araba sözlüğüne göz atın
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientTr posts={posts} />
      </div>
    </div>
  );
}
