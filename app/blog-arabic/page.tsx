import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientAr from '@/components/blog/BlogIndexClientAr';

export const metadata: Metadata = {
  title: 'مدونة السيارات — أدلة الشراء والصيانة ونصائح الملكية | Naira Autos',
  description: 'أدلة خبيرة لشراء السيارات، نصائح الصيانة، وكل ما يخص ملكية السيارة. مقالات عملية لشراء سيارتك والحفاظ عليها وبيعها بثقة.',
  alternates: {
    canonical: 'https://www.naira.autos/blog-arabic',
    languages: {
      en: 'https://www.naira.autos/blog',
      es: 'https://www.naira.autos/blog-de-autos',
      ar: 'https://www.naira.autos/blog-arabic',
      fr: 'https://www.naira.autos/blog-auto',
      'x-default': 'https://www.naira.autos/blog',
    },
  },
  openGraph: {
    title: 'مدونة السيارات — أدلة الشراء والصيانة ونصائح الملكية',
    description: 'أدلة عملية لشراء السيارات وصيانتها وبيعها بثقة.',
    url: 'https://www.naira.autos/blog-arabic',
    siteName: 'Naira Autos',
    locale: 'ar',
    type: 'website',
  },
};

// ISR: fetch once, cache for 24h — same pattern as blog/page.tsx and
// blog-de-autos/page.tsx.
export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'ar')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogArabicPage() {
  const posts = await getPosts();

  return (
    <div dir="rtl" lang="ar" className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              اقرأ بالإنجليزية ←
            </Link>
            <Link href="/blog-auto" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Français
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">مدونة Naira Autos بالعربية</h1>
          <p className="text-white/80 max-w-2xl">
            نصائح وأدلة ومعلومات مفيدة لشراء وبيع السيارات
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            عرض قاموس مصطلحات السيارات
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientAr posts={posts} />
      </div>
    </div>
  );
}
