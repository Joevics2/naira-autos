import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientNl from '@/components/blog/BlogIndexClientNl';

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'nl')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogDutchPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              English
            </Link>
            <Link href="/autoblog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Deutsch
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Blog Nederlands</h1>
          <p className="text-white/80 max-w-2xl">
            Handige tips en gidsen voor het kopen en verkopen van auto's
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientNl posts={posts} />
      </div>
    </div>
  );
}
