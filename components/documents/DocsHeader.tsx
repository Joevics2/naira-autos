import Link from 'next/link';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { abs, getGroup, type Lang } from '@/lib/hreflang';
import { NAV_LABELS } from '@/lib/nav-labels';

export interface DocsCrumb { label: string; path: string }

/**
 * Back button + visible breadcrumb for the documents pages. When `schema` is
 * true it also emits BreadcrumbList JSON-LD built from the very same crumbs,
 * so visible and structured data can't disagree.
 */
export default function DocsHeader({ lang, crumbs, schema = true }: { lang: Lang; crumbs: DocsCrumb[]; schema?: boolean }) {
  const rtl = lang === 'ar';
  const t = NAV_LABELS[lang];
  const homePath = getGroup('/')?.group[lang] ?? '/';
  const all: DocsCrumb[] = [{ label: t.home, path: homePath }, ...crumbs];
  const parent = all[all.length - 2];
  const Back = rtl ? ArrowRight : ArrowLeft;
  const Sep = rtl ? ChevronLeft : ChevronRight;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: abs(c.path) })),
  };

  return (
    <>
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
      <div className="flex items-center gap-3">
        <Link
          href={parent.path}
          aria-label={t.back}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-sky-500/10 border border-border hover:border-sky-500/40 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-all flex-shrink-0"
        >
          <Back className="h-4 w-4" />
        </Link>
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <span key={c.path} className="flex items-center gap-1.5">
                {last ? (
                  <span className="text-foreground font-medium" aria-current="page">{c.label}</span>
                ) : (
                  <Link href={c.path} className="hover:text-foreground flex items-center gap-1">
                    {i === 0 && <Home className="h-3.5 w-3.5" />}{c.label}
                  </Link>
                )}
                {!last && <Sep className="h-3.5 w-3.5" />}
              </span>
            );
          })}
        </nav>
      </div>
    </>
  );
}
