import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientKo from '@/components/blog/BlogIndexClientKo';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: '자동차 블로그 — 구매 가이드, 정비 팁 & 차량 관리 조언 | Naira Autos',
  description: '자동차 구매 가이드, 정비 팁, 차량 관리 조언. 자신 있게 차를 사고, 관리하고, 팔 수 있도록 돕는 실용적인 글을 만나보세요.',
  alternates: alternatesFor('/cha-beullogeu'),
  openGraph: {
    title: '자동차 블로그 — 구매 가이드, 정비 팁 & 차량 관리 조언',
    description: '자동차 구매 가이드, 정비 팁, 차량 관리 조언. 자신 있게 차를 사고, 관리하고, 팔 수 있도록 돕는 실용적인 글을 만나보세요.',
    url: 'https://www.naira.autos/cha-beullogeu',
    siteName: 'Naira Autos',
    locale: 'ko',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'ko')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogKoreanPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="ko" hub="blog" />
          <LanguagePills path="/cha-beullogeu" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos 한국어 블로그</h1>
          <p className="text-white/80 max-w-2xl">
            자동차 구매와 판매를 위한 유용한 팁과 가이드
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientKo posts={posts} />
      </div>
    </div>
  );
}
