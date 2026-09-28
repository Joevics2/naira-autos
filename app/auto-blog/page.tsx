import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import BlogIndexClientNl from '@/components/blog/BlogIndexClientNl';
import PageNav from '@/components/ui/PageNav';
import LanguagePills from '@/components/ui/LanguagePills';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Autoblog — Koopgidsen, Onderhoudstips & Advies voor Autobezitters | Naira Autos',
  description: "Koopgidsen voor auto's, onderhoudstips en advies voor autobezitters. Praktische artikelen om met vertrouwen een auto te kopen, te onderhouden en te verkopen.",
  alternates: alternatesFor('/auto-blog'),
  openGraph: {
    title: 'Autoblog — Koopgidsen, Onderhoudstips & Advies voor Autobezitters',
    description: "Koopgidsen voor auto's, onderhoudstips en advies voor autobezitters. Praktische artikelen om met vertrouwen een auto te kopen, te onderhouden en te verkopen.",
    url: 'https://www.naira.autos/auto-blog',
    siteName: 'Naira Autos',
    locale: 'nl',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'nl')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogDutchPage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <PageNav lang="nl" hub="blog" />
          <LanguagePills path="/auto-blog" className="mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Naira Autos Blog Nederlands</h1>
          <p className="text-white/80 max-w-2xl">
            Handige tips en gidsen voor het kopen en verkopen van auto's
          </p>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientNl posts={posts} />
      </div>
    </div>
  );
}
