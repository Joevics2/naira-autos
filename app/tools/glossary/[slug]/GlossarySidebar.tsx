'use client';

import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

interface RelatedTerm {
  slug: string;
  term: string;
  short_definition: string;
}

interface Props {
  related: RelatedTerm[];
}

export function GlossarySidebar({ related }: Props) {
  const links = [
    { label: 'AI Mechanic',         sub: 'Diagnose your car for free',   href: '/tools/ai-mechanic' },
    { label: 'Sell For Me',         sub: 'We handle everything for you', href: '/sell-for-me' },
    { label: 'Vehicle Information', sub: 'Prices, parts & model guides', href: '/vehicles' },
    { label: 'Read Blog Posts',     sub: 'Tips, guides & buying advice', href: '/blog' },
  ];

  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">

      {/* Related terms */}
      {related.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wide">
            Related Terms
          </h3>
          <div className="space-y-2">
            {related.map(r => (
              <Link
                key={r.slug}
                href={`/tools/glossary/${r.slug}`}
                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/20 transition-all"
              >
                <div className="w-5 h-5 rounded-md bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <BookOpen className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                    {r.term}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                    {r.short_definition}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA block */}
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4">
          More from Naira Autos
        </p>
        <div className="flex flex-col gap-2">
          {links.map(({ label, sub, href }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/40 transition-all group"
            >
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 leading-none">{label}</p>
                <p className="text-xs text-emerald-700/50 dark:text-emerald-400/50 mt-0.5">{sub}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-emerald-500/50 flex-shrink-0 group-hover:translate-x-0.5 group-hover:text-emerald-500 transition-all" />
            </Link>
          ))}
        </div>
      </div>

      {/* Glossary nav hint */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="text-sm font-bold text-foreground mb-3">Explore the Glossary</h3>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">
          Browse all terms alphabetically or search by topic across the full Nigerian car market glossary.
        </p>
        <Link
          href="/tools/glossary"
          className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
        >
          View all glossary terms
          <ChevronRight className="h-3.5 w-3.5" />
        </Link>
      </div>

    </aside>
  );
}
