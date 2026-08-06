'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import BlogMarkdownRenderer from '@/components/BlogMarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { getBlogFallbackImage } from '@/lib/blogImages';
import {
  ChevronLeft,
  Calendar,
  Share2,
  Tag,
  Clock,
  User,
  Check,
  Link2,
  BookOpen,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────
type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  category: string | null;
  tags: string[] | null;
  read_time: number | null;
  author_name: string | null;
  created_at: string;
  updated_at: string;
};

type Props = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  lang?: 'en' | 'es';
  basePath?: string; // '/blog' or '/blog-de-autos'
};

// ── UI chrome strings (not content) per language ───────────────────
const STRINGS = {
  en: {
    home: 'Home', blog: 'Blog', back: 'Back', minRead: 'min read',
    tags: 'Tags:', filedUnder: 'Filed under:', foundHelpful: 'Found this helpful? Share it.',
    moreIn: (cat: string) => `More in ${cat}`, relatedArticles: 'Related Articles', seeAll: 'See all →',
    browseCategories: 'Browse Categories', glossary: 'Car Glossary', glossaryDesc: '300+ car terms explained',
    locale: 'en-NG',
  },
  es: {
    home: 'Inicio', blog: 'Blog', back: 'Atrás', minRead: 'min de lectura',
    tags: 'Etiquetas:', filedUnder: 'Categoría:', foundHelpful: '¿Te fue útil? Compártelo.',
    moreIn: (cat: string) => `Más en ${cat}`, relatedArticles: 'Artículos Relacionados', seeAll: 'Ver todo →',
    browseCategories: 'Explorar Categorías', glossary: 'Glosario de Autos', glossaryDesc: '300+ términos explicados',
    locale: 'es-MX',
  },
};

// ── Category helpers ─────────────────────────────────────────────────
const categorySlug = (cat: string) => cat.toLowerCase().replace(/\s+/g, '-');

// ── Share Button ─────────────────────────────────────────────────────
function ShareButton({ title, excerpt }: { title: string; excerpt: string | null }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text: excerpt || '', url: window.location.href });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" /> Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" /> Share
        </>
      )}
    </button>
  );
}

// ── Main component ───────────────────────────────────────────────────
export default function BlogDetailClient({ post, relatedPosts, lang = 'en', basePath = '/blog' }: Props) {
  const router = useRouter();
  const t = STRINGS[lang];

  const catSlug = post.category ? categorySlug(post.category) : null;

  const breadcrumbItems = [
    { label: t.home, href: '/' },
    { label: t.blog, href: basePath },
    ...(post.category && catSlug
      ? [
          { label: post.category, href: `${basePath}?category=${catSlug}` },
          { label: post.title },
        ]
      : [{ label: post.title }]),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top bar with breadcrumb ── */}
      <div className="bg-primary py-4 border-b">
  <div className="max-w-screen-xl mx-auto px-4 [&_nav]:text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/70">
    <Breadcrumbs items={breadcrumbItems} />
  </div>
</div>
      
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Back link */}
        <Link
  href={basePath}
  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
>
  <ChevronLeft className="h-4 w-4" /> {t.back}
</Link>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ══════════════════════════════════════════════════════
              MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
          <article className="lg:col-span-2 min-w-0">

            {/* Category badge */}
            {post.category && catSlug && (
              <Link
                href={`${basePath}?category=${catSlug}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors mb-4"
              >
                <Tag className="h-3 w-3" />
                {post.category}
              </Link>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-lg text-muted-foreground mt-4 leading-relaxed border-l-4 border-primary/30 pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 text-sm text-muted-foreground">
              {post.author_name && (
                <span className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  {post.author_name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(post.created_at).toLocaleDateString(t.locale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.read_time} {t.minRead}
                </span>
              )}
              <ShareButton title={post.title} excerpt={post.excerpt} />
            </div>

            {/* Divider */}
            <hr className="my-8 border-border" />

            {/* Featured image — always shown since page.tsx resolves the fallback */}
            {post.featured_image && (
              <figure className="mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full aspect-video object-cover rounded-xl shadow-md"
                />
              </figure>
            )}

            {/* ── ARTICLE BODY ── */}
            {post.content && (
              <BlogMarkdownRenderer content={post.content} />
            )}

            {/* ── Tags ── */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-1 self-center">{t.tags}</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`${basePath}?tag=${encodeURIComponent(tag)}`}
                    className="text-xs px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* ── Category footer ── */}
            {post.category && catSlug && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{t.filedUnder}</span>
                <Link
                  href={`${basePath}?category=${catSlug}`}
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Tag className="h-3 w-3" />
                  {post.category}
                </Link>
              </div>
            )}

            {/* ── Share footer ── */}
            <div className="mt-8 p-4 bg-muted/30 rounded-xl flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">{t.foundHelpful}</p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://naira.autos${basePath}/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-black text-white hover:bg-black/80 transition-colors"
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://naira.autos/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
                >
                  WhatsApp
                </a>
                <ShareButton title={post.title} excerpt={post.excerpt} />
              </div>
            </div>
          </article>

          {/* ══════════════════════════════════════════════════════
              SIDEBAR
          ══════════════════════════════════════════════════════ */}
          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="rounded-xl border bg-card p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
                      {post.category ? t.moreIn(post.category) : t.relatedArticles}
                    </h3>
                    {post.category && catSlug && (
                      <Link
                        href={`${basePath}?category=${catSlug}`}
                        className="text-xs text-primary hover:underline"
                      >
                        {t.seeAll}
                      </Link>
                    )}
                  </div>

                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`${basePath}/${related.slug}`}
                        className="flex gap-3 group"
                      >
                        <img
                          src={related.featured_image || getBlogFallbackImage(related.slug)}
                          alt={related.title}
                          className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>
                              {new Date(related.created_at).toLocaleDateString(t.locale, {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                            {related.read_time && (
                              <>
                                <span>·</span>
                                <span>{related.read_time} {t.minRead}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Browse by category */}
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  {t.browseCategories}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Reviews', 'Comparisons', 'Buying Guide', 'Maintenance', 'News', 'Tips'].map(
                    (cat) => (
                      <Link
                        key={cat}
                        href={`${basePath}?category=${categorySlug(cat)}`}
                        className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                          post.category === cat
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-border hover:border-primary hover:text-primary'
                        }`}
                      >
                        {cat}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Glossary */}
              <Link
                href="/tools/glossary"
                className="flex items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{t.glossary}</p>
                  <p className="text-xs text-muted-foreground">{t.glossaryDesc}</p>
                </div>
              </Link>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
  }
  
