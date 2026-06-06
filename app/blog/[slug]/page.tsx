import { supabase } from '@/lib/supabase';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogDetailClient from './BlogDetailClient';
import { getBlogFallbackImage } from '@/lib/blogImages';

type Props = {
  params: Promise<{ slug: string }>;
};

type FAQ = { question: string; answer: string };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, featured_image, created_at, updated_at, category, tags, author_name')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (!post) {
    return { title: 'Article Not Found | Naira Autos' };
  }

  const imageUrl = post.featured_image || getBlogFallbackImage(slug);
  const description = post.excerpt || `Read about ${post.title} on the Naira Autos blog`;

  return {
    title: `${post.title} | Naira Autos Blog`,
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
      canonical: `https://naira.autos/blog/${slug}`,
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (!post) notFound();

  // ── Related posts: same category first, fill with latest ────────
  let relatedPosts: typeof post[] = [];

  if (post.category) {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, featured_image, created_at, category, read_time')
      .eq('published', true)
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
      .not('id', 'in', `(${excludeIds.join(',')})`)
      .order('created_at', { ascending: false })
      .limit(3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...(data ?? [])];
  }

  // ── Resolve image (featured or deterministic fallback) ───────────
  const siteUrl = 'https://naira.autos';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
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
    inLanguage: 'en-NG',
  };

  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
    ...(post.category && categorySlug
      ? [
          {
            '@type': 'ListItem',
            position: 3,
            name: post.category,
            item: `${siteUrl}/blog?category=${categorySlug}`,
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

  const faqs: FAQ[] = Array.isArray(post.faqs) ? (post.faqs as FAQ[]) : [];

  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

  const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <BlogDetailClient post={post} relatedPosts={relatedPosts} faqs={faqs} imageUrl={imageUrl} />
    </>
  );
  }
    
