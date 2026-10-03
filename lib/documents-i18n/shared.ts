import type { Lang } from '@/lib/hreflang';
import type { CatKey } from './types';

/** Display order of category groups on every hub. */
export const CAT_ORDER: CatKey[] = ['sale', 'finance', 'lease', 'ownership', 'service', 'dispute', 'compliance', 'other'];

/**
 * Most published template slugs aren't in lib/document-types.ts, so the old
 * hub dumped ~90% of them under "Other". This classifies by slug keywords
 * instead — the same result in every language. Order matters: the more
 * specific buckets are checked first.
 */
export function classifySlug(slug: string): CatKey {
  const s = slug.toLowerCase();
  if (/release|settlement|indemnity|waiver|dispute|arbitration/.test(s)) return 'dispute';
  if (/scrap|disposal|import|customs|inspection|disclosure|roadworth|salvage|odometer|registration/.test(s)) return 'compliance';
  if (/power-of-attorney|gift|donation|co-ownership|change-of-ownership|inherit|consent|affidavit/.test(s)) return 'ownership';
  if (/hire-purchase|installment|instalment|loan|guarantee|lien|security|finance/.test(s)) return 'finance';
  if (/lease|rental|\brent|keke|tricycle/.test(s)) return 'lease';
  if (/sale|sales|purchase|bill-of-sale|dealer|trade|consign|swap|contract/.test(s)) return 'sale';
  if (/repair|maintenance|service|fleet|management|warranty/.test(s)) return 'service';
  return 'other';
}

/** Countries whose templates are written in (or for readers of) each language. */
export const LANG_REGIONS: Partial<Record<Lang, string[]>> = {
  es: ['es', 'mx', 'ar', 'co', 'cl', 'pe', 've', 'ec', 'bo', 'uy', 'py', 'cr', 'pa', 'do', 'gt', 'hn', 'sv', 'ni'],
  fr: ['fr', 'be', 'ch', 'ca', 'sn', 'ci', 'cm', 'ma', 'dz', 'tn', 'cd', 'ml', 'bf', 'ne', 'tg', 'bj', 'gn', 'ga', 'mg'],
  pt: ['pt', 'br', 'ao', 'mz', 'cv', 'gw', 'st'],
  ar: ['sa', 'ae', 'qa', 'kw', 'eg', 'bh', 'om', 'jo', 'lb', 'iq', 'ye', 'sy', 'ly', 'tn', 'dz', 'ma', 'sd', 'ps'],
  de: ['de', 'at', 'ch'],
  it: ['it'],
  nl: ['nl', 'be', 'sr'],
  hi: ['in'],
  id: ['id'],
  tr: ['tr'],
  ja: ['jp'],
  ko: ['kr'],
  vi: ['vn'],
  th: ['th'],
};
