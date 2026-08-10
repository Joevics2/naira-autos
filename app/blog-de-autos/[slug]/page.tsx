import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from '../../blog/[slug]/BlogDetailClient';
import { getBlogFallbackImage } from '@/lib/blogImages';

type Props = {
  params: Promise<{ slug: string }>;
};

// ISR: statically generate this page and revalidate once every 24h, so a
// newly published/edited post shows up within a day without every single
// request hitting Supabase directly. (Previously force-dynamic + revalidate
// 0, which disabled caching entirely — force-dynamic overrides revalidate,
// so setting a revalidate window alone wouldn't have done anything.)
export const revalidate = 86400;

const BASE_PATH_BY_LANG: Record<string, string> = { en: '/blog', es: '/blog-de-autos' };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, featured_image, created_at, updated_at, category, tags, author_name, translation_group_id')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (!post) {
    return { title: 'Artículo No Encontrado | Naira Autos' };
  }

  const imageUrl = post.featured_image || getBlogFallbackImage(slug);
  const description = post.excerpt || `Lee sobre ${post.title} en el blog de Naira Autos`;

  // ── hreflang: find every published language sibling of this post ──
  let languages: Record<string, string> | undefined;
  if (post.translation_group_id) {
    const { data: siblings } = await supabase
      .from('blog_posts')
      .select('slug, language')
      .eq('translation_group_id', post.translation_group_id)
      .eq('published', true);
    if (siblings && siblings.length > 1) {
      languages = {};
      for (const s of siblings) {
        const base = BASE_PATH_BY_LANG[s.language] || '/blog';
        languages[s.language] = `https://naira.autos${base}/${s.slug}`;
      }
      languages['x-default'] = languages['en'] || `https://naira.autos/blog-de-autos/${slug}`;
    }
  }

  return {
    title: `${post.title} | Blog de Naira Autos`,
    description,
    keywords: post.tags ?? [],
    authors: post.author_name ? [{ name: post.author_name }] : [{ name: 'Naira Autos' }],
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      publishedTime: post.created_at,
      modifiedTime: post.updated_at,
      authors: post.author_name ? [post.author_name] : ['Naira Autos'],
      section: post.category ?? undefined,
      tags: post.tags ?? undefined,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `https://naira.autos/blog-de-autos/${slug}`,
      ...(languages ? { languages } : {}),
    },
  };
}

export default async function BlogDeAutosDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .eq('language', 'es')
    .maybeSingle();

  if (!post) notFound();

  // ── Related posts: same category first, fill with latest — Spanish only ──
  let relatedPosts: typeof post[] = [];

  if (post.category) {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, created_at, category, read_time')
      .eq('published', true)
      .eq('language', 'es')
      .eq('category', post.category)
      .neq('id', post.id)
      .limit(3);
    relatedPosts = data ?? [];
  }

  if (relatedPosts.length < 3) {
    const excludeIds = [post.id, ...relatedPosts.map((p: any) => p.id)];
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, created_at, category, read_time')
      .eq('published', true)
      .eq('language', 'es')
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .order('created_at', { ascending: false })
      .limit(3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...(data ?? [])];
  }

  // ── Resolve image (featured or deterministic fallback) ───────────
  const siteUrl = 'https://naira.autos';
  const postUrl = `${siteUrl}/blog-de-autos/${post.slug}`;
  const imageUrl = post.featured_image || getBlogFallbackImage(slug);

  const categorySlug = post.category
    ? post.category.toLowerCase().replace(/\s+/g, '-')
    : null;

  // ── JSON-LD schemas ──────────────────────────────────────────────
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': postUrl,
    headline: post.title,
    description: post.excerpt || '',
    image: { '@type': 'ImageObject', url: imageUrl, width: 1200, height: 630 },
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    author: {
      '@type': 'Person',
      name: post.author_name || 'Naira Autos Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Naira Autos',
      url: siteUrl,
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
    keywords: post.tags ? (post.tags as string[]).join(', ') : '',
    articleSection: post.category || '',
    ...(post.read_time ? { timeRequired: `PT${post.read_time}M` } : {}),
    inLanguage: 'es',
  };

  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog-de-autos` },
    ...(post.category && categorySlug
      ? [
          {
            '@type': 'ListItem',
            position: 3,
            name: post.category,
            item: `${siteUrl}/blog-de-autos?category=${categorySlug}`,
          },
          { '@type': 'ListItem', position: 4, name: post.title, item: postUrl },
        ]
      : [{ '@type': 'ListItem', position: 3, name: post.title, item: postUrl }]),
  ];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  const schemas = [articleSchema, breadcrumbSchema];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogDetailClient
        post={{ ...post, featured_image: imageUrl }}
        relatedPosts={relatedPosts}
        lang="es"
        basePath="/blog-de-autos"
      />
    </>
  );
}
