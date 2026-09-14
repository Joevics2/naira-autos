import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientId from '@/components/blog/BlogIndexClientId';

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
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/kuruma-burogu" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              日本語
            </Link>
          </div>
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
