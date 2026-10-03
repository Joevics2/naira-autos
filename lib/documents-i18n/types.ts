import type { Lang } from '@/lib/hreflang';

export type CatKey = 'sale' | 'lease' | 'finance' | 'ownership' | 'service' | 'dispute' | 'compliance' | 'other';

export interface DocsMineStrings {
  title: string;            // <title> and h1
  description: string;      // meta description
  intro: string;
  empty: string;
  browse: string;           // "Browse templates" link text
  searchPlaceholder: string;
  clearSearch: string;
  sortLatest: string;
  sortOldest: string;
  sortCountry: string;
  sortType: string;
  filterAll: string;
  filterTemplates: string;
  noMatch: string;          // contains {q}
  sourceTemplate: string;
  deleteOne: string;
  clearAll: string;
  localNote: string;
  back: string;             // "Back to My Documents"
  editor: { pdf: string; word: string; hint: string; risk: string; wordError: string };
}

/** Everything one language of the document-templates hub needs. */
export interface DocsStrings {
  lang: Lang;
  /** BCP-47 tag used for Intl (country names, dates) and og:locale. */
  locale: string;
  ogLocale: string;
  dir: 'ltr' | 'rtl';
  /** Hub path and My Documents path — must match lib/hreflang.ts. */
  path: string;
  minePath: string;
  /** Where individual template pages live for this language. */
  templateBase: string;

  // ── SEO ──
  title: string;            // no brand suffix — the root layout appends " | Naira Autos"
  description: string;
  keywords: string[];

  // ── Visible copy ──
  docsLabel: string;        // breadcrumb + nav label
  kicker: string;
  h1: string;
  intro: string;
  mineLabel: string;
  axiosHref?: string;
  axiosLead?: string;       // e.g. "Need a document that is not listed?"
  axiosCta?: string;        // link text pointing at the AI drafter, if one exists in this language

  ui: {
    searchPlaceholder: string;
    clearSearch: string;
    sortLabel: string;
    sortCategory: string;
    sortCountry: string;
    sortLatest: string;
    categoryLabel: string;
    allCategories: string;
    countryLabel: string;
    allCountries: string;
    noMatch: string;        // contains {q}
    updated: string;        // "Updated"
    regionHeading: string;  // "Documents for your region"
    count: string;          // contains {n}
    emptyList: string;
  };

  categories: Record<CatKey, string>;

  guideHeading: string;
  guide: { term: string; text: string }[];
  stepsHeading: string;
  steps: string[];
  tipsHeading: string;
  tips: string[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  disclaimer: string;
  privacyNote: string;

  mine: DocsMineStrings;
}
