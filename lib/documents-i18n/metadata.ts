import type { Metadata } from 'next';
import { abs, alternatesFor } from '@/lib/hreflang';
import { getDocs, type DocsLang } from './index';

/** Metadata for a language's document-templates hub. The root layout appends " | Naira Autos". */
export function docsMetadata(lang: DocsLang): Metadata {
  const s = getDocs(lang);
  const url = abs(s.path);
  return {
    title: s.title,
    description: s.description,
    keywords: s.keywords,
    alternates: alternatesFor(s.path),
    openGraph: {
      type: 'website', url, siteName: 'Naira Autos', locale: s.ogLocale,
      title: s.title, description: s.description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: s.h1 }],
    },
    twitter: { card: 'summary_large_image', title: s.title, description: s.description, images: ['/og-image.png'] },
  };
}

/** My Documents is personal, browser-local data: keep it out of search, canonical only (no hreflang to a noindex page). */
export function docsMineMetadata(lang: DocsLang): Metadata {
  const s = getDocs(lang);
  return {
    title: s.mine.title,
    description: s.mine.description,
    alternates: { canonical: abs(s.minePath) },
    robots: { index: false, follow: true },
  };
}
