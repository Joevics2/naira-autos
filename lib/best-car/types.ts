// lib/best-car/types.ts
//
// One typed shape for every language of the "Best Car For…" tool. Each
// language is a plain-data file (lib/best-car/{lang}.ts) implementing
// BestCarStrings, rendered by the SAME client + page components, so adding a
// language never means copying scoring logic or page markup again.
//
// Rules:
//  - Data only (no functions) — the object is passed from a server component
//    to a client component, so it must be serialisable.
//  - Numbers, prices, scoring and car specs are NOT translated; they come from
//    app/tools/cars-data.ts. Only prose and closed-set labels live here.
//  - Per-car prose (segment / commonIssues / watchOut) lives in
//    lib/best-car/cars-{lang}.ts as Record<carId, CarText>.

import type { Lang } from '@/lib/hreflang';
import type { UseCaseTag } from '@/app/tools/cars-data';

export interface CarText {
  segment: string;
  commonIssues: string;
  watchOut: string;
}

export interface UseCaseText {
  label: string;
  icon: string;
  description: string;
  priorities: string;
  /** Heading for the static "best cars by use case" card, e.g. "Best Family Car". */
  pickTitle: string;
}

export interface FaqItem {
  q: string;
  /** May contain {picks:family|commercial|highway|budget|offroad|executive|firstcar|fuelefficient}
   *  placeholders, replaced with the tool's real top-3 for that use case. */
  a: string;
}

export interface SeoSection {
  h2: string;
  /** Plain text with optional **bold** and [label](/internal-path) links. */
  paragraphs: string[];
}

export interface BestCarStrings {
  lang: Lang;
  /** BCP-47 tag used for Intl number formatting, list formatting, country names. */
  locale: string;
  /** Optional per-country locale override (e.g. Mexico → es-MX decimal style). */
  localeByCountry?: Record<string, string>;
  dir: 'ltr' | 'rtl';
  /** false for scripts where the site's Latin display font makes no sense. */
  latin: boolean;
  /** Place the currency symbol after the number (fr, de, pl…). */
  symbolAfter?: boolean;

  path: string; // this page's canonical path
  homePath: string;
  hubPath: string; // this language's own /tools index (e.g. /herramientas, /adawat)
  aboutPath: string;
  comparePath: string; // localized car-comparison page (or English fallback)
  fuelPath: string; // localized fuel-cost calculator (or English fallback)
  valuationPath: string; // localized valuation page

  defaultCountry: string;
  /** Markets shown first in the selector. Also the only regions auto-detected from the browser. */
  priorityCountries: string[];
  /** Country whose ranking feeds the static lists / FAQ answers (no used-import cars if non-African). */
  picksCountry: string;

  nav: { home: string; tools: string; current: string; back: string; breadcrumb: string };

  meta: {
    title: string;
    description: string;
    keywords: string[];
    ogTitle: string;
    ogDescription: string;
    ogLocale: string; // e.g. es_ES
  };

  hero: { badge: string; verified: string; h1: string; intro: string };

  ui: {
    countryLabel: string;
    popularCountries: string;
    otherCountries: string;
    africaNote: string;
    prompt: string;
    rankedBy: string;
    topRecs: string; // {n} {country}
    emptyState: string;
    match: string;
    electric: string;
    electricMotor: string;
    seatsFmt: string; // {n}
    bootFmt: string; // {n}
    consumptionUnit: string; // L/100km
    showDetails: string;
    hideDetails: string;
    commonIssues: string;
    estIn: string; // {country}
    copyLink: string;
    linkCopied: string;
  };

  enums: {
    maintenance: Record<'Low' | 'Medium' | 'High' | 'Very High', string>;
    spareParts: Record<'Easy' | 'Moderate' | 'Hard', string>;
    bodyType: Record<string, string>;
    fuelType: Record<string, string>;
    transmission: Record<string, string>;
  };

  useCases: Record<UseCaseTag, UseCaseText>;

  seo: {
    reviewedByLabel: string;
    reviewer: string;
    updatedLabel: string;
    sections: SeoSection[];
    exampleTitle: string;
    exampleBody: string;
    picksHeading: string;
    picksNote: string;
    faqHeading: string;
    moreToolsHeading: string;
    disclaimer: string;
  };

  related: { compare: string; fuel: string; valuation: string };

  faqs: FaqItem[];

  schema: { appName: string; appDescription: string; publisher: string; author: string };
}
