import type { Lang } from '@/lib/hreflang';

/** Strings used by the interactive analyzer + diagnosis card. `{cap}`, `{duration}`
 *  and `{amount}` are placeholders filled in by the client. */
export interface EngineSoundUi {
  record: string;
  upload: string;
  stop: string;
  descPlaceholder: string;
  brand: string;
  model: string;
  year: string;
  analyse: string;
  analysing: string;
  listening: string;
  another: string;
  noticeTrimmed: string; // {duration} {cap}
  noticeLong: string; // {duration} {cap}
  noticeCapped: string; // {cap}
  footnote: string; // {cap}
  disclaimer: string; // {cap}
  urgency: Record<'safe' | 'monitor' | 'urgent' | 'stop_driving', string>;
  prob: Record<'high' | 'medium' | 'low', string>;
  priority: Record<'immediate' | 'soon' | 'when_convenient', string>;
  diy: string;
  possibleCauses: string;
  mostLikelyCause: string;
  whatToDo: string;
  betterDiagnosis: string;
  partsToInspect: string;
  costEstimate: string;
  confidence: string;
  costFrom: string; // {amount}
  costUpTo: string; // {amount}
  errors: {
    generic: string;
    maxFile: string;
    mic: string;
    no_audio: string;
    too_large: string;
    unavailable: string;
    parse: string;
    server: string;
  };
}

export interface EngineSoundSection {
  h2: string;
  paras: string[];
}

export interface EngineSoundFaq {
  q: string;
  a: string;
}

export type SubKey = 'ticking' | 'knocking' | 'rattling';

export interface EngineSoundSubCopy {
  key: SubKey;
  slug: string; // last path segment
  navLabel: string; // breadcrumb + picker card title
  cardDesc: string; // picker card description on the main page
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1a: string;
  h1b: string;
  intro: string;
  schemaDescription: string;
  sections: EngineSoundSection[];
  exampleTitle: string;
  exampleText: string;
  reviewedAfter: string;
  faqTitle: string;
  faqs: EngineSoundFaq[];
}

export interface EngineSoundCopy {
  lang: Lang;
  locale: string; // og:locale, e.g. es_ES
  numLocale?: string; // BCP47 tag for number formatting (defaults to locale with '-')
  dir: 'ltr' | 'rtl';
  homeHref: string;
  homeLabel: string;
  hubHref: string;
  hubLabel: string;
  backLabel: string;
  slug: string; // segment under hubHref
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  ogDescription: string;
  toolName: string; // breadcrumb + schema name
  schemaDescription: string;
  badge: string;
  verified: string;
  h1a: string;
  h1b: string;
  intro: string;
  pickerEyebrow: string;
  pickerTitle: string;
  pickerCta: string;
  pickerNote: string;
  sections: EngineSoundSection[];
  tipsTitle: string;
  tips: string[];
  exampleTitle: string;
  exampleText: string;
  reviewedBefore: string;
  reviewedAfter: string;
  faqTitle: string;
  faqs: EngineSoundFaq[];
  relatedTitle: string;
  relatedLabels: { mechanic: string; value: string; vin: string };
  subs: [EngineSoundSubCopy, EngineSoundSubCopy, EngineSoundSubCopy];
  ui: EngineSoundUi;
}
