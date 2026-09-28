import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientHi from '@/components/blog/BlogIndexClientHi';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'कार ब्लॉग — खरीदारी गाइड, रखरखाव टिप्स और स्वामित्व सलाह | Naira Autos',
  description: 'कार खरीदने की गाइड, रखरखाव के टिप्स और कार मालिकों के लिए सलाह। कार को आत्मविश्वास के साथ खरीदने, संभालने और बेचने में मदद करने वाले व्यावहारिक लेख।',
  alternates: alternatesFor('/blog-hindi'),
  openGraph: {
    title: 'कार ब्लॉग — खरीदारी गाइड, रखरखाव टिप्स और स्वामित्व सलाह',
    description: 'कार खरीदने की गाइड, रखरखाव के टिप्स और कार मालिकों के लिए सलाह। कार को आत्मविश्वास के साथ खरीदने, संभालने और बेचने में मदद करने वाले व्यावहारिक लेख।',
    url: 'https://www.naira.autos/blog-hindi',
    siteName: 'Naira Autos',
    locale: 'hi',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'hi')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogHindiPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="hi" hub="blog" />
          <LanguagePills path="/blog-hindi" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos हिन्दी ब्लॉग</h1>
          <p className="text-white/80 max-w-2xl">
            कार खरीदने और बेचने के लिए उपयोगी टिप्स और गाइड
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientHi posts={posts} />
      </div>
    </div>
  );
}
