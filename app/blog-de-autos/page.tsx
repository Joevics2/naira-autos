import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientEs from '@/components/blog/BlogIndexClientEs';

// ISR: fetch once, cache for 24h, instead of the previous 'use client' +
// useEffect version which re-fetched from Supabase in the browser on every
// single page load with zero caching possible.
export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'es')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogDeAutosPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Read in English →
            </Link>
            <Link href="/blog-arabic" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              → بالعربية
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog de Autos de Naira Autos</h1>
          <p className="text-white/80 max-w-2xl">
            Consejos, guías, y información útil para comprar y vender autos
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Ver Glosario de Autos
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientEs posts={posts} />
      </div>
    </div>
  );
}
