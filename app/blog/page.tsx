'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getBlogFallbackImage } from '@/lib/blogImages';
import { Search, Loader2 } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string;
};

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data) setBlogs(data as BlogPost[]);
    } catch (error) {
      console.error('Error loading blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Blog</h1>
          <p className="text-white/80 max-w-2xl">
            Expert tips, guides, and insights for buying and selling cars
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">Loading articles...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all overflow-hidden">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={blog.featured_image || getBlogFallbackImage(blog.slug)}
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h2 className="font-bold text-lg line-clamp-2 hover:text-primary transition-colors">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="mt-4 text-xs text-muted-foreground">
                      {new Date(blog.created_at).toLocaleDateString('en-NG', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
        
