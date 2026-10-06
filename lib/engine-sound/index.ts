import type { Lang } from '@/lib/hreflang';
import type { EngineSoundCopy, SubKey } from './types';
import { es } from './es';
import { id } from './id';
import { th } from './th';
import { tr } from './tr';
import { it } from './it';
import { ja } from './ja';
import { de } from './de';
import { pt } from './pt';
import { fr } from './fr';
import { ar } from './ar';

// Registry of localized engine-sound-analyzer content. Add a language by
// creating lib/engine-sound/<lang>.ts and registering it here.
export const ENGINE_SOUND_COPY: Partial<Record<Lang, EngineSoundCopy>> = {
  es,
  ar,
};

export const SUB_KEYS: SubKey[] = ['ticking', 'knocking', 'rattling'];

export const mainPath = (c: EngineSoundCopy) => `${c.hubHref}/${c.slug}`;
export const subPath = (c: EngineSoundCopy, key: SubKey) =>
  `${mainPath(c)}/${c.subs.find((s) => s.key === key)!.slug}`;

export const EN_MAIN = '/tools/engine-sound-analyzer';
export const EN_SUB: Record<SubKey, string> = {
  ticking: '/tools/engine-sound-analyzer/ticking-noise',
  knocking: '/tools/engine-sound-analyzer/knocking-noise',
  rattling: '/tools/engine-sound-analyzer/rattling-noise',
};
