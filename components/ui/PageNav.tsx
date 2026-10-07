import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { abs, getGroup, type Lang } from '@/lib/hreflang';
import { NAV_LABELS } from '@/lib/nav-labels';

export interface Crumb {
  label: string;
  /** Site path. The last crumb is the current page (rendered as text). */
  path: string;
}

interface PageNavProps {
  lang: Lang;
  /** Shorthand for a hub page: Home → Tools / Blog (in this language). */
  hub?: 'tools' | 'blog';
  /** Crumbs after Home, ending with the current page. Ignored when `hub` is set. */
  crumbs?: Crumb[];
  /** Defaults to the previous crumb (or Home). */
  backHref?: string;
  backLabel?: string;
}

/**
 * Circular back button + visible breadcrumb trail for dark hero sections
 * (pattern from CLAUDE.md), plus the matching BreadcrumbList JSON-LD. Both are
 * generated from the same `crumbs`, so visible content and structured data
 * cannot disagree.
 */
export default function PageNav({ lang, hub, crumbs: crumbsProp, backHref, backLabel }: PageNavProps) {
  const rtl = lang === 'ar';
  const t = NAV_LABELS[lang];
  const homePath = getGroup('/')?.group[lang] ?? '/';
  const crumbs: Crumb[] = hub
    ? [{ label: t[hub], path: getGroup(hub === 'tools' ? '/tools' : '/blog')?.group[lang] ?? '/' }]
    : crumbsProp ?? [];
  const all: Crumb[] = [{ label: t.home, path: homePath }, ...crumbs];
  const parent = all[all.length - 2];
  const back = backHref ?? parent.path;
  const Back = rtl ? ArrowRight : ArrowLeft;
  const Sep = rtl ? ChevronLeft : ChevronRight;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: abs(c.path),
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div dir={rtl ? 'rtl' : undefined} className={`flex items-center gap-3 mb-6 ${rtl ? 'text-right' : 'text-left'}`}>
        <Link prefetch={false}
          href={back}
          aria-label={backLabel ?? t.back}
          className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0"
        >
          <Back className="h-3.5 w-3.5" />
        </Link>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-white/40">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <span key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span className="text-white/60" aria-current="page">{c.label}</span>
                ) : (
                  <Link prefetch={false} href={c.path} className="hover:text-white/70 transition-colors">{c.label}</Link>
                )}
                {!last && <Sep className="h-3 w-3" />}
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
}
