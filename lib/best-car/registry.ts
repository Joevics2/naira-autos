// lib/best-car/registry.ts — every language of the tool, in one place.
import type { BestCarStrings, CarText } from '@/lib/best-car/types';
import { en } from '@/lib/best-car/en';
import { es } from '@/lib/best-car/es';
import { carTextEs } from '@/lib/best-car/cars-es';

export interface BestCarLang {
  c: BestCarStrings;
  /** Per-car prose for this language. Omit for English (source of truth in cars-data.ts). */
  carText?: Record<string, CarText>;
}

export const ALL: BestCarLang[] = [
  { c: en },
  { c: es, carText: carTextEs },
];
