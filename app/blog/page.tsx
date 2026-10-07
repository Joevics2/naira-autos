import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClient from '@/components/blog/BlogIndexClient';
import { alternatesFor } from '@/lib/hreflang';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Car Blog — Buying Guides, Maintenance Tips & Ownership Advice | Naira Autos',
  description: 'Expert car buying guides, maintenance tips, and ownership advice. Practical, no-nonsense articles to help you buy, maintain, and sell cars with confidence.',
  alternates: alternatesFor('/blog'),
  openGraph: {
    title: 'Car Blog — Buying Guides, Maintenance Tips & Ownership Advice | Naira Autos',
    description: 'Expert car buying guides, maintenance tips, and ownership advice for buying, maintaining, and selling cars with confidence.',
    url: 'https://www.naira.autos/blog',
    siteName: 'Naira Autos',
    locale: 'en',
    type: 'website',
  },
};

// ISR: fetch once, cache for 24h, instead of the previous 'use client' +
// useEffect version which re-fetched from Supabase in the browser on every
// single page load with zero caching possible.
export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'en')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="en" hub="blog" />
          <LanguagePills path="/blog" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Blog</h1>
          <p className="text-white/80 max-w-2xl">
            Expert tips, guides, and insights for buying and selling cars
          </p>
          <Link prefetch={false}
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Browse Car Glossary
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClient posts={posts} />
      </div>
    </div>
  );
}
