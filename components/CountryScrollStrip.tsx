'use client';

import Link from 'next/link';

export interface CountryLinkItem {
  code: string;
  flag: string;
  name: string;
  href: string;
}

/**
 * Horizontal-scroll strip of country links. Used to connect a tool's
 * global/master page to its country-specific pages (and vice versa)
 * without a full page reload — same idea as the country picker grid,
 * just as a compact scrollable row for embedding mid-page.
 */
export function CountryScrollStrip({ items, activeCode }: { items: CountryLinkItem[]; activeCode?: string }) {
  if (items.length === 0) return null;
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin">
      {items.map((c) => (
        <Link
          key={c.code}
          href={c.href}
          className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-bold whitespace-nowrap transition-all ${
            c.code === activeCode
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'bg-card border-border text-foreground hover:border-emerald-500/50'
          }`}
        >
          <span className="text-base">{c.flag}</span>
          {c.name}
        </Link>
      ))}
    </div>
  );
}
