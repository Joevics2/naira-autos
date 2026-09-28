import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientVi from '@/components/blog/BlogIndexClientVi';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Blog Ô Tô — Hướng Dẫn Mua Xe, Bảo Dưỡng & Mẹo Sử Dụng | Naira Autos',
  description: 'Hướng dẫn mua xe, mẹo bảo dưỡng và lời khuyên khi sở hữu ô tô. Các bài viết thực tế giúp bạn tự tin mua, bảo dưỡng và bán xe.',
  alternates: alternatesFor('/blog-o-to'),
  openGraph: {
    title: 'Blog Ô Tô — Hướng Dẫn Mua Xe, Bảo Dưỡng & Mẹo Sử Dụng',
    description: 'Hướng dẫn mua xe, mẹo bảo dưỡng và lời khuyên khi sở hữu ô tô. Các bài viết thực tế giúp bạn tự tin mua, bảo dưỡng và bán xe.',
    url: 'https://www.naira.autos/blog-o-to',
    siteName: 'Naira Autos',
    locale: 'vi',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'vi')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogVietnamesePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="vi" hub="blog" />
          <LanguagePills path="/blog-o-to" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog Naira Autos Tiếng Việt</h1>
          <p className="text-white/80 max-w-2xl">
            Mẹo và hướng dẫn hữu ích để mua và bán ô tô
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientVi posts={posts} />
      </div>
    </div>
  );
}
