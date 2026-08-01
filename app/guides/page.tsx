'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getBlogFallbackImage } from '@/lib/blogImages';
import { BookOpen, Loader2, ChevronRight } from 'lucide-react';

// Guide categories — blog posts tagged with these categories appear here
const GUIDE_CATEGORIES = [
  'Buying Guide',
  'Comparisons',
  'How To',
  'Ownership',
  'Car Ownership',
  'Maintenance',
  'Tips',
  'Reviews',
];

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string | null;
  created_at: string;
};

export default function GuidesPage() {
  const [guides, setGuides]   = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image, category, created_at')
          .eq('published', true)
          .in('category', GUIDE_CATEGORIES)
          .order('created_at', { ascending: false });
        setGuides((data as BlogPost[]) || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Naira Autos</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Car Buying Guides</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Practical car buying advice — comparisons, how-to guides, ownership tips and more.
        </p>
      </div>

      {/* Glossary CTA */}
      <Link
        href="/tools/glossary"
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Car Glossary</p>
            <p className="text-xs text-muted-foreground">Tokunbo, Grade A, Duty Paid and more</p>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
      </Link>

      {/* Guide posts */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : guides.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-sm mb-4">Guides coming soon.</p>
          <Link href="/blog" className="text-sm font-medium text-foreground underline underline-offset-2">
            Browse all blog posts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {guides.map(post => {
            const image = post.featured_image || getBlogFallbackImage(post.slug);
            const date  = new Date(post.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="flex gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
              >
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <img src={image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  {post.category && (
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{post.category}</span>
                  )}
                  <h2 className="text-sm font-semibold text-foreground leading-snug mt-0.5 line-clamp-2">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1.5">{date}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 self-center" />
              </Link>
            );
          })}
        </div>
      )}

      {/* View all blog posts */}
      <div className="mt-8 pt-6 border-t border-border text-center">
        <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all blog posts →
        </Link>
      </div>

    </div>
  );
}
