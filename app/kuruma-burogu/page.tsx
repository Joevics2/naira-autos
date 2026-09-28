import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientJa from '@/components/blog/BlogIndexClientJa';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: '車のブログ — 購入ガイド、整備、アドバイス | Naira Autos',
  description: '車の購入ガイド、整備のヒント、車の所有に関するすべて。自信を持って車を購入・整備・売却するための実用的な記事。',
  alternates: alternatesFor('/kuruma-burogu'),
  openGraph: {
    title: '車のブログ — 購入ガイド、整備、アドバイス | Naira Autos',
    description: '自信を持って車を購入・整備・売却するための実用的な記事。',
    url: 'https://www.naira.autos/kuruma-burogu',
    siteName: 'Naira Autos',
    locale: 'ja',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'ja')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogJapanesePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="ja" hub="blog" />
          <LanguagePills path="/kuruma-burogu" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos ブログ（日本語版）</h1>
          <p className="text-white/80 max-w-2xl">
            車の購入・売却に役立つヒントとガイド
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            車用語集を見る
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientJa posts={posts} />
      </div>
    </div>
  );
}
