// lib/best-car/registry.ts — every language of the tool, in one place.
import type { BestCarStrings, CarText } from '@/lib/best-car/types';
import { en } from '@/lib/best-car/en';
import { es } from '@/lib/best-car/es';
import { carTextEs } from '@/lib/best-car/cars-es';
import { fr } from '@/lib/best-car/fr';
import { carTextFr } from '@/lib/best-car/cars-fr';
import { ar } from '@/lib/best-car/ar';
import { carTextAr } from '@/lib/best-car/cars-ar';
import { pt } from '@/lib/best-car/pt';
import { carTextPt } from '@/lib/best-car/cars-pt';
import { de } from '@/lib/best-car/de';
import { carTextDe } from '@/lib/best-car/cars-de';
import { it } from '@/lib/best-car/it';
import { carTextIt } from '@/lib/best-car/cars-it';
import { nl } from '@/lib/best-car/nl';
import { carTextNl } from '@/lib/best-car/cars-nl';
import { hi } from '@/lib/best-car/hi';
import { carTextHi } from '@/lib/best-car/cars-hi';
import { id } from '@/lib/best-car/id';
import { carTextId } from '@/lib/best-car/cars-id';
import { tr } from '@/lib/best-car/tr';
import { carTextTr } from '@/lib/best-car/cars-tr';

export interface BestCarLang {
  c: BestCarStrings;
  /** Per-car prose for this language. Omit for English (source of truth in cars-data.ts). */
  carText?: Record<string, CarText>;
}

export const ALL: BestCarLang[] = [
  { c: en },
  { c: es, carText: carTextEs },
  { c: fr, carText: carTextFr },
  { c: ar, carText: carTextAr },
  { c: pt, carText: carTextPt },
  { c: de, carText: carTextDe },
  { c: it, carText: carTextIt },
  { c: nl, carText: carTextNl },
  { c: hi, carText: carTextHi },
  { c: id, carText: carTextId },
  { c: tr, carText: carTextTr },
];
