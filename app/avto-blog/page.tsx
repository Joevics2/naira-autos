import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientRu from '@/components/blog/BlogIndexClientRu';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Автоблог — Руководства по покупке, обслуживание и советы владельцам | Naira Autos',
  description: 'Руководства по покупке автомобиля, советы по обслуживанию и рекомендации владельцам. Практические статьи, которые помогут уверенно покупать, обслуживать и продавать авто.',
  alternates: alternatesFor('/avto-blog'),
  openGraph: {
    title: 'Автоблог — Руководства по покупке, обслуживание и советы владельцам',
    description: 'Руководства по покупке автомобиля, советы по обслуживанию и рекомендации владельцам. Практические статьи, которые помогут уверенно покупать, обслуживать и продавать авто.',
    url: 'https://www.naira.autos/avto-blog',
    siteName: 'Naira Autos',
    locale: 'ru',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'ru')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogRussianPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="ru" hub="blog" />
          <LanguagePills path="/avto-blog" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Блог Naira Autos на русском</h1>
          <p className="text-white/80 max-w-2xl">
            Полезные советы и руководства по покупке и продаже автомобилей
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientRu posts={posts} />
      </div>
    </div>
  );
}
