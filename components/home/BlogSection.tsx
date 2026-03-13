'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { ArrowRight } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string;
};

export function BlogSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadBlogs(); }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts').select('*')
        .eq('published', true)
        .order('created_at', { ascending: false })
        .limit(4);
      if (data && data.length > 0) setBlogs(data as BlogPost[]);
    } catch { console.log('No blogs found'); }
    finally { setLoading(false); }
  };

  if (loading || blogs.length === 0) return null;

  return (
    <section className="py-10 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">Resources</p>
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              Blog & Tips
            </h2>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold tracking-wide uppercase transition-colors">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 sm:-mx-6 sm:px-6 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {blogs.map(blog => (
            <Link key={blog.id} href={`/blog/${blog.slug}`} className="flex-shrink-0 w-[280px] group">
              <div className="rounded-2xl overflow-hidden border border-border bg-card hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={blog.featured_image || 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-card-foreground text-sm leading-snug line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {blog.title}
                  </h3>
                  {blog.excerpt && (
                    <p className="text-muted-foreground text-xs mt-2 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}