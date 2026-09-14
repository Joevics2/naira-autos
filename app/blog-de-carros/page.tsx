import type { Metadata } from 'next';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { BookText } from 'lucide-react';
import BlogIndexClientPt from '@/components/blog/BlogIndexClientPt';

export const metadata: Metadata = {
  title: 'Blog de Carros — Guias de Compra, Manutenção e Dicas | Naira Autos',
  description: 'Guias especializados para comprar carros, dicas de manutenção e tudo sobre ser dono de um veículo. Artigos práticos para comprar, manter e vender seu carro com confiança.',
  alternates: {
    canonical: 'https://www.naira.autos/blog-de-carros',
    languages: {
      en: 'https://www.naira.autos/blog',
      es: 'https://www.naira.autos/blog-de-autos',
      ar: 'https://www.naira.autos/blog-arabic',
      fr: 'https://www.naira.autos/blog-auto',
      pt: 'https://www.naira.autos/blog-de-carros',
      de: 'https://www.naira.autos/autoblog',
      ja: 'https://www.naira.autos/kuruma-burogu',
      it: 'https://www.naira.autos/blog-motori',
      tr: 'https://www.naira.autos/oto-blog',
      'x-default': 'https://www.naira.autos/blog',
    },
  },
  openGraph: {
    title: 'Blog de Carros — Guias de Compra, Manutenção e Dicas | Naira Autos',
    description: 'Artigos práticos para comprar, manter e vender seu carro com confiança.',
    url: 'https://www.naira.autos/blog-de-carros',
    siteName: 'Naira Autos',
    locale: 'pt',
    type: 'website',
  },
};

export const revalidate = 86400;

async function getPosts() {
  const { data } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, featured_image, created_at')
    .eq('published', true)
    .eq('language', 'pt')
    .order('created_at', { ascending: false });
  return data ?? [];
}

export default async function BlogPortuguesePage() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Link href="/blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Read in English →
            </Link>
            <Link href="/blog-de-autos" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Leer en Español →
            </Link>
            <Link href="/blog-arabic" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              → بالعربية
            </Link>
            <Link href="/blog-auto" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Lire en Français →
            </Link>
            <Link href="/autoblog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Auf Deutsch lesen →
            </Link>
            <Link href="/kuruma-burogu" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              日本語で読む →
            </Link>
            <Link href="/blog-motori" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Leggi in Italiano →
            </Link>
            <Link href="/oto-blog" className="text-[11px] text-white/60 hover:text-white/90 underline underline-offset-2 transition-colors">
              Türkçe oku →
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Blog da Naira Autos em Português</h1>
          <p className="text-white/80 max-w-2xl">
            Dicas e guias úteis para comprar e vender carros
          </p>
          <Link
            href="/tools/glossary"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm font-semibold rounded-lg px-4 py-2 mt-4 transition-colors"
          >
            <BookText className="h-4 w-4" />
            Ver glossário automotivo
          </Link>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <BlogIndexClientPt posts={posts} />
      </div>
    </div>
  );
}
