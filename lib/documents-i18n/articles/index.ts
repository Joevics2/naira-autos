import type { DocsLang } from '../index';
import type { Article } from './types';
import { en } from './en'; import { es } from './es'; import { fr } from './fr'; import { pt } from './pt';
import { de } from './de'; import { it } from './it'; import { nl } from './nl'; import { tr } from './tr';
import { ar } from './ar'; import { hi } from './hi'; import { id } from './id'; import { ja } from './ja';
import { ko } from './ko'; import { vi } from './vi'; import { th } from './th';

export const ARTICLES: Record<DocsLang, Article> = { en, es, fr, pt, de, it, nl, tr, ar, hi, id, ja, ko, vi, th };
