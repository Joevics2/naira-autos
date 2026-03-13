'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { ChevronLeft, Calendar, Share2 } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  created_at: string;
  updated_at: string;
};

export default function BlogDetailClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadPost();
  }, [slug]);

  const loadPost = async () => {
    try {
      const { data: postData } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (postData) {
        setPost(postData as BlogPost);
        
        const { data: related } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .neq('id', postData.id)
          .limit(3);
        
        if (related) {
          setRelatedPosts(related as BlogPost[]);
        }
      }
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title || '',
          text: post?.excerpt || '',
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const generateSchema = () => {
    if (!post) return null;

    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.excerpt || '',
      image: post.featured_image || '',
      datePublished: post.created_at,
      dateModified: post.updated_at || post.created_at,
      author: {
        '@type': 'Organization',
        name: 'Naira Autos',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Naira Autos',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nairaautos.com/logo.png',
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://nairaautos.com/blog/${post.slug}`,
      },
    };

    return JSON.stringify(schema);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="bg-primary/10 py-8">
          <div className="max-w-screen-xl mx-auto px-4">
            <Skeleton className="h-4 w-32 mb-4" />
            <Skeleton className="h-10 w-3/4 mb-4" />
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <Skeleton className="aspect-video rounded-lg" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-4">The article you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/blog')}>Back to Blog</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: generateSchema() || '' }} />

      <div className="bg-primary py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Article' },
            ]}
          />
        </div>
      </div>

      <article className="max-w-screen-xl mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold">{post.title}</h1>
              {post.excerpt && (
                <p className="text-lg text-muted-foreground mt-4">{post.excerpt}</p>
              )}
              <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> {new Date(post.created_at).toLocaleDateString()}
                </span>
                <button onClick={handleShare} className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            {post.featured_image && (
              <img
                src={post.featured_image}
                alt={post.title}
                className="w-full aspect-video object-cover rounded-lg"
              />
            )}

            {post.content && (
              <div 
                className="prose prose-lg max-w-none mt-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              {relatedPosts.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link key={related.id} href={`/blog/${related.slug}`} className="block group">
                        <div className="flex gap-3">
                          {related.featured_image && (
                            <img
                              src={related.featured_image}
                              alt={related.title}
                              className="w-16 h-12 object-cover rounded"
                            />
                          )}
                          <div>
                            <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors">
                              {related.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(related.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 bg-primary/10 rounded-lg p-6 text-center">
                <h3 className="font-semibold mb-2">Want to sell your car?</h3>
                <p className="text-sm text-muted-foreground mb-4">List your car on Naira Autos and reach thousands of buyers</p>
                <Button asChild className="w-full">
                  <Link href="/add-listing">Post a Listing</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
