import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientId from '@/components/blog/BlogIndexClientId';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Blog Mobil — Panduan Membeli, Perawatan & Tips Kepemilikan | Naira Autos',
  description: 'Panduan membeli mobil, tips perawatan, dan saran kepemilikan kendaraan. Artikel praktis untuk membantu Anda membeli, merawat, dan menjual mobil dengan percaya diri.',
  alternates: alternatesFor('/blog-mobil'),
  openGraph: {
    title: 'Blog Mobil — Panduan Membeli, Perawatan & Tips Kepemilikan',
    description: 'Panduan membeli mobil, tips perawatan, dan saran kepemilikan kendaraan. Artikel praktis untuk membantu Anda membeli, merawat, dan menjual mobil dengan percaya diri.',
    url: 'https://www.naira.autos/blog-mobil',
    siteName: 'Naira Autos',
    locale: 'id',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'id')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogIndonesianPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="id" hub="blog" />
          <LanguagePills path="/blog-mobil" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog Naira Autos Bahasa Indonesia</h1>
          <p className="text-white/80 max-w-2xl">
            Tips dan panduan bermanfaat untuk membeli dan menjual mobil
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientId posts={posts} />
      </div>
    </div>
  );
}
