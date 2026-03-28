'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import {
  ChevronLeft,
  Calendar,
  Share2,
  Tag,
  Clock,
  User,
  ChevronDown,
  Check,
  Link2,
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

type FAQ = { question: string; answer: string };

type Props = {
  post: BlogPost;
  relatedPosts: BlogPost[];
  faqs: FAQ[];
};

// ── Category helpers ─────────────────────────────────────────────────
const categorySlug = (cat: string) => cat.toLowerCase().replace(/\s+/g, '-');

// ── FAQ Accordion ────────────────────────────────────────────────────
function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mt-12" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-bold mb-6">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-border rounded-xl border overflow-hidden">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="font-medium pr-4">{faq.question}</span>
              <ChevronDown
                className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                  open === i ? 'rotate-180' : ''
                }`}
              />
            </button>
            {open === i && (
              <div className="px-6 pb-5 text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

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
export default function BlogDetailClient({ post, relatedPosts, faqs }: Props) {
  const router = useRouter();

  const catSlug = post.category ? categorySlug(post.category) : null;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    ...(post.category && catSlug
      ? [
          { label: post.category, href: `/blog?category=${catSlug}` },
          { label: post.title },
        ]
      : [{ label: post.title }]),
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top bar with breadcrumb ── */}
      <div className="bg-primary py-4 border-b">
        <div className="max-w-screen-xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Back link */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4" /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ══════════════════════════════════════════════════════
              MAIN CONTENT
          ══════════════════════════════════════════════════════ */}
          <article className="lg:col-span-2 min-w-0">

            {/* Category badge */}
            {post.category && catSlug && (
              <Link
                href={`/blog?category=${catSlug}`}
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
                {new Date(post.created_at).toLocaleDateString('en-NG', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  {post.read_time} min read
                </span>
              )}
              <ShareButton title={post.title} excerpt={post.excerpt} />
            </div>

            {/* Divider */}
            <hr className="my-8 border-border" />

            {/* Featured image */}
            {post.featured_image && (
              <figure className="mb-8">
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full aspect-video object-cover rounded-xl shadow-md"
                />
              </figure>
            )}

            {/* ── ARTICLE BODY ──
                Tailwind Typography (prose) renders the HTML tags
                coming from your Supabase content field.
                Install: npm install @tailwindcss/typography
                Then add `require('@tailwindcss/typography')` to
                your tailwind.config plugins array.
            */}
            {post.content && (
              <div
                className={[
                  'prose prose-base lg:prose-lg max-w-none',
                  // Headings
                  'prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground',
                  'prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:pb-2',
                  'prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3',
                  // Body text
                  'prose-p:leading-8 prose-p:text-foreground/90',
                  // Links
                  'prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline',
                  // Lists
                  'prose-ul:my-4 prose-li:my-1',
                  'prose-ol:my-4',
                  // Blockquote
                  'prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:rounded-r-md',
                  // Code
                  'prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-foreground prose-code:before:content-none prose-code:after:content-none',
                  // Images inside content
                  'prose-img:rounded-lg prose-img:shadow-sm',
                  // Strong
                  'prose-strong:text-foreground',
                  // HR
                  'prose-hr:border-border',
                ].join(' ')}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            )}

            {/* ── FAQ section ── */}
            {faqs.length > 0 && <FAQAccordion faqs={faqs} />}

            {/* ── Tags ── */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground mr-1 self-center">Tags:</span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
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
                <span>Filed under:</span>
                <Link
                  href={`/blog?category=${catSlug}`}
                  className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
                >
                  <Tag className="h-3 w-3" />
                  {post.category}
                </Link>
              </div>
            )}

            {/* ── Share footer ── */}
            <div className="mt-8 p-4 bg-muted/30 rounded-xl flex items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">Found this helpful? Share it.</p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://nairaautos.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium px-3 py-1.5 rounded-md bg-black text-white hover:bg-black/80 transition-colors"
                >
                  𝕏 Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(`${post.title} - https://nairaautos.com/blog/${post.slug}`)}`}
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
                      {post.category ? `More in ${post.category}` : 'Related Articles'}
                    </h3>
                    {post.category && catSlug && (
                      <Link
                        href={`/blog?category=${catSlug}`}
                        className="text-xs text-primary hover:underline"
                      >
                        See all →
                      </Link>
                    )}
                  </div>

                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.slug}`}
                        className="flex gap-3 group"
                      >
                        {related.featured_image ? (
                          <img
                            src={related.featured_image}
                            alt={related.title}
                            className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-12 rounded-md bg-muted flex-shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h4 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>
                              {new Date(related.created_at).toLocaleDateString('en-NG', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                            {related.read_time && (
                              <>
                                <span>·</span>
                                <span>{related.read_time} min</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA card */}
              <div className="rounded-xl bg-primary/10 border border-primary/20 p-5 text-center">
                <div className="text-2xl mb-2">🚗</div>
                <h3 className="font-bold mb-1">Sell your car faster</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  List on Naira Autos and reach thousands of serious buyers across Nigeria.
                </p>
                <Button asChild className="w-full">
                  <Link href="/add-listing">Post a Free Listing</Link>
                </Button>
              </div>

              {/* Browse by category */}
              <div className="rounded-xl border bg-card p-5">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
                  Browse Categories
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Reviews', 'Comparisons', 'Buying Guide', 'Maintenance', 'News', 'Tips'].map(
                    (cat) => (
                      <Link
                        key={cat}
                        href={`/blog?category=${categorySlug(cat)}`}
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

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}