import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientTh from '@/components/blog/BlogIndexClientTh';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'บล็อกรถยนต์ — คู่มือซื้อรถ การบำรุงรักษา และเคล็ดลับ | Naira Autos',
  description: 'คู่มือซื้อรถ เคล็ดลับการบำรุงรักษา และคำแนะนำสำหรับเจ้าของรถ บทความที่ใช้ได้จริงเพื่อช่วยให้คุณซื้อ ดูแล และขายรถได้อย่างมั่นใจ',
  alternates: alternatesFor('/blog-rot-yon'),
  openGraph: {
    title: 'บล็อกรถยนต์ — คู่มือซื้อรถ การบำรุงรักษา และเคล็ดลับ',
    description: 'คู่มือซื้อรถ เคล็ดลับการบำรุงรักษา และคำแนะนำสำหรับเจ้าของรถ บทความที่ใช้ได้จริงเพื่อช่วยให้คุณซื้อ ดูแล และขายรถได้อย่างมั่นใจ',
    url: 'https://www.naira.autos/blog-rot-yon',
    siteName: 'Naira Autos',
    locale: 'th',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'th')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogThaiPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="th" hub="blog" />
          <LanguagePills path="/blog-rot-yon" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">บล็อก Naira Autos ภาษาไทย</h1>
          <p className="text-white/80 max-w-2xl">
            เคล็ดลับและคำแนะนำที่เป็นประโยชน์ในการซื้อและขายรถยนต์
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientTh posts={posts} />
      </div>
    </div>
  );
}
