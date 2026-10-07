'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { getBlogFallbackImage } from '@/lib/blogImages';
import { Search } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  created_at: string;
};

export default function BlogIndexClientKo({ posts }: { posts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = posts.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* 검색 */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="게시물 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchTerm ? '결과를 찾을 수 없습니다' : '아직 한국어 게시물이 없습니다 — 나중에 다시 확인해 주세요.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Link prefetch={false} key={blog.id} href={`/cha-beullogeu/${blog.slug}`}>
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
                    {new Date(blog.created_at).toLocaleDateString('ko-KR', {
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
  );
}
