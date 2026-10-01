// lib/best-car/helpers.ts — pure helpers shared by the server page and client.

import { CARS, type CarData } from '@/app/tools/cars-data';
import { CAR_COUNTRIES, type CarCountry } from '@/lib/car-country-pricing';
import { rankCars } from '@/lib/best-car/scoring';
import type { BestCarStrings } from '@/lib/best-car/types';

/** Numbers that appear in copy — computed, so text never says "50 countries" when there are 55. */
export function templateVars(): Record<string, string> {
  return {
    countries: String(CAR_COUNTRIES.length),
    globalCars: String(CARS.filter((c) => !c.availableCountries).length),
    usedCars: String(CARS.filter((c) => c.availableCountries).length),
    totalCars: String(CARS.length),
  };
}

/** Replace {name} placeholders. Unknown placeholders are left untouched. */
export function fill(text: string, vars: Record<string, string>): string {
  return text.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
}

export const carName = (car: CarData) => `${car.brand} ${car.model}`;

/** Localised "A, B and C". */
export function listNames(names: string[], locale: string): string {
  try {
    return new Intl.ListFormat(locale, { style: 'long', type: 'conjunction' }).format(names);
  } catch {
    return names.join(', ');
  }
}

/** Replace {picks:<useCase>} with the tool's real top-3 for c.picksCountry. */
export function fillPicks(text: string, c: BestCarStrings): string {
  return text.replace(/\{picks:(\w+)\}/g, (m, tag) => {
    const top = rankCars(tag as never, c.picksCountry, 3).map((r) => carName(r.car));
    return top.length ? listNames(top, c.locale) : m;
  });
}

/** Translate a closed-set value, splitting "A / B" compounds; unknown parts stay English. */
export function translateEnum(value: string, dict: Record<string, string>): string {
  if (dict[value]) return dict[value];
  return value
    .split(' / ')
    .map((part) => dict[part.trim()] ?? part.trim())
    .join(' / ');
}

/** Localised country name from the platform's CLDR data, falling back to the English name. */
export function countryName(country: CarCountry, locale: string): string {
  try {
    const n = new Intl.DisplayNames([locale], { type: 'region' }).of(country.code.toUpperCase());
    return n && n !== country.code.toUpperCase() ? n : country.name;
  } catch {
    return country.name;
  }
}

/** Compact, locale-aware price: symbol + "24k" / "24 mil" / "1,2 Mio." etc. */
export function formatPrice(amount: number, country: CarCountry, c: BestCarStrings): string {
  const locale = c.localeByCountry?.[country.code] ?? c.locale;
  let num: string;
  try {
    num = new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      // Scales that start below 1M (lakh in hi, 万 in ja/ko) need a decimal or 1.25 lakh rounds to 1 lakh.
      maximumFractionDigits: amount >= 1_000_000 || (['hi', 'ja', 'ko'].includes(c.lang) && amount >= 10_000) ? 1 : 0,
    }).format(amount);
  } catch {
    num = Math.round(amount).toLocaleString();
  }
  return c.symbolAfter ? `${num}\u00A0${country.symbol}` : `${country.symbol}${num}`;
}

/** ISO date the price/FX data was last refreshed (matches FX_SNAPSHOT_DATE in car-country-pricing). */
export const DATA_VERIFIED_ISO = '2026-08-28';
/** ISO date these pages' content was last edited. */
export const CONTENT_MODIFIED_ISO = '2026-09-29';

/** "August 2026" in the page language. */
export function verifiedLabel(locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(DATA_VERIFIED_ISO));
  } catch {
    return DATA_VERIFIED_ISO.slice(0, 7);
  }
}

/** Word count of everything a crawler reads as body copy (sections + example; FAQ counted separately). */
export function seoWordCount(c: BestCarStrings): number {
  const text = [
    ...c.seo.sections.flatMap((s) => [s.h2, ...s.paragraphs]),
    c.seo.exampleTitle,
    c.seo.exampleBody,
  ].join(' ');
  return countWords(text, c.lang);
}

export function countWords(text: string, lang: string): number {
  const clean = text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // CJK / Thai have no spaces — count characters as a rough proxy (≈ 2 chars per word).
  if (['ja', 'ko', 'th'].includes(lang)) return Math.round(clean.replace(/\s/g, '').length / 2);
  return clean.split(/\s+/).filter(Boolean).length;
}
