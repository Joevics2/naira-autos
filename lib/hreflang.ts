// Single source of truth for cross-language page relationships.
//
// Every page that has a translation lists its whole "translation group" here
// (one path per language). Both the visible language pills and the
// `alternates.languages` hreflang metadata are generated from these groups, so
// they can never drift apart, and every member of a group automatically
// links to every other member (hreflang must be reciprocal or Google ignores
// it).
//
// To add a language variant of an existing page: add one entry to its group.
// To add a new translated page: add a new group. Nothing else to keep in sync.
import type { Metadata } from 'next';

export const SITE = 'https://www.naira.autos';

// Display order for pills. Also the order hreflang entries are emitted in.
export const LANGS = [
  'en', 'es', 'ar', 'fr', 'pt', 'de', 'ja', 'it',
  'tr', 'th', 'id', 'vi', 'nl', 'hi', 'ko', 'ru',
] as const;

export type Lang = (typeof LANGS)[number];
export type LangPaths = Partial<Record<Lang, string>>;

// Native names are used for the pill's title / aria-label (the pill itself
// shows only the abbreviation).
export const LANG_NAMES: Record<Lang, string> = {
  en: 'English', es: 'Español', ar: 'العربية', fr: 'Français',
  pt: 'Português', de: 'Deutsch', ja: '日本語', it: 'Italiano',
  tr: 'Türkçe', th: 'ไทย', id: 'Bahasa Indonesia', vi: 'Tiếng Việt',
  nl: 'Nederlands', hi: 'हिन्दी', ko: '한국어', ru: 'Русский',
};

// ── Hub pages: home, tools index, blog index ─────────────────────────
const HUB_GROUPS: LangPaths[] = [
  { en: '/', es: '/inicio', ar: '/home-arabic', fr: '/accueil', pt: '/pagina-inicial', de: '/startseite', ja: '/homu', it: '/inizio', tr: '/ana-sayfa', th: '/na-lak', id: '/beranda', vi: '/trang-chu', nl: '/startpagina', hi: '/mukhya-prishtha', ko: '/hom', ru: '/glavnaya' },
  { en: '/tools', es: '/herramientas', ar: '/adawat', fr: '/outils', pt: '/ferramentas', de: '/werkzeuge', ja: '/tsuru', it: '/strumenti', tr: '/araclar', th: '/khrueang-mue', id: '/alat', vi: '/cong-cu', nl: '/gereedschappen', hi: '/upkaran', ko: '/dogu', ru: '/instrumenty' },
  { en: '/blog', es: '/blog-de-autos', ar: '/blog-arabic', fr: '/blog-auto', pt: '/blog-de-carros', de: '/autoblog', ja: '/kuruma-burogu', it: '/blog-motori', tr: '/oto-blog', th: '/blog-rot-yon', id: '/blog-mobil', vi: '/blog-o-to', nl: '/auto-blog', hi: '/blog-hindi', ko: '/cha-beullogeu', ru: '/avto-blog' },
];

// ── Individual tool pages that exist in more than one language ───────
// Tools with no translation don't appear here and get canonical only.
const TOOL_GROUPS: LangPaths[] = [
  { en: '/evaluate-used-car', es: '/cuanto-vale-mi-auto', ar: '/kam-qeemat-sayarati', fr: '/outils/combien-vaut-ma-voiture', pt: '/ferramentas/quanto-vale-meu-carro', de: '/werkzeuge/was-ist-mein-auto-wert', ja: '/tsuru/kuruma-satei', it: '/strumenti/quanto-vale-la-mia-auto', tr: '/araclar/arabam-ne-kadar-eder', th: '/khrueang-mue/rot-khong-chan-rakha-thaorai', id: '/alat/berapa-harga-mobil-saya', vi: '/cong-cu/xe-cua-toi-dang-gia-bao-nhieu', nl: '/gereedschappen/wat-is-mijn-auto-waard' },
  { en: '/tools/ai-mechanic', es: '/herramientas/mecanico-virtual', ar: '/adawat/mikaniki-iftiradi', fr: '/outils/mecanicien-virtuel', pt: '/ferramentas/meu-mecanico-virtual', de: '/werkzeuge/virtueller-mechaniker', ja: '/tsuru/ai-shindan', it: '/strumenti/meccanico-virtuale', tr: '/araclar/sanal-usta', th: '/khrueang-mue/mo-rot-ai', id: '/alat/montir-virtual', vi: '/cong-cu/tho-may-ao', nl: '/gereedschappen/virtuele-monteur', hi: '/upkaran/aabhasi-mekanik', ko: '/dogu/gasang-jeongbisa', ru: '/instrumenty/virtualnyy-mekhanik' },
  { en: '/tools/best-car-for', es: '/herramientas/mejor-auto-para-ti', ar: '/adawat/afdal-sayara-lak', fr: '/outils/meilleure-voiture-pour-vous', pt: '/ferramentas/melhor-carro-para-voce', de: '/werkzeuge/bestes-auto-fuer-sie' },
  { en: '/tools/car-comparison', es: '/herramientas/comparador-de-autos' },
  { en: '/tools/chassis-number-check', es: '/herramientas/verificar-numero-de-chasis' },
  { en: '/tools/distance-calculator-egypt', ar: '/adawat/hasbat-al-masafa-masr' },
  { en: '/tools/distance-calculator-france', fr: '/outils/calculateur-de-distance-france' },
  { en: '/tools/distance-calculator-germany', de: '/werkzeuge/entfernungsrechner-deutschland' },
  { en: '/tools/distance-calculator-italy', it: '/calcolatore-di-distanza-italia' },
  { en: '/tools/distance-calculator-netherlands', nl: '/gereedschappen/afstandscalculator-nederland' },
  { en: '/tools/distance-calculator-qatar', ar: '/adawat/hasbat-al-masafa-qatar' },
  { en: '/tools/distance-calculator-saudi-arabia', ar: '/adawat/hasbat-al-masafa-alsaudiya' },
  { en: '/tools/distance-calculator-spain', es: '/herramientas/calculadora-de-distancia-espana' },
  { en: '/tools/distance-calculator-uae', ar: '/adawat/hasbat-al-masafa-alemarat' },
  { en: '/tools/document-generator', es: '/herramientas/generador-de-documentos-ia' },
  { en: '/tools/engine-sound-analyzer', es: '/herramientas/analizador-de-ruidos-del-motor', ar: '/adawat/mohallil-sawt-almuharrik', fr: '/outils/analyseur-de-bruit-moteur', pt: '/ferramentas/analisador-de-barulho-do-motor' },
  { en: '/tools/engine-sound-analyzer/ticking-noise', es: '/herramientas/analizador-de-ruidos-del-motor/ruido-tic-tic-del-motor', ar: '/adawat/mohallil-sawt-almuharrik/soat-taqtaqa-almuharrik', fr: '/outils/analyseur-de-bruit-moteur/cliquetis-moteur', pt: '/ferramentas/analisador-de-barulho-do-motor/barulho-de-tucho-batendo' },
  { en: '/tools/engine-sound-analyzer/knocking-noise', es: '/herramientas/analizador-de-ruidos-del-motor/golpeteo-del-motor', ar: '/adawat/mohallil-sawt-almuharrik/soat-tark-almuharrik', fr: '/outils/analyseur-de-bruit-moteur/cognement-moteur', pt: '/ferramentas/analisador-de-barulho-do-motor/motor-batendo' },
  { en: '/tools/engine-sound-analyzer/rattling-noise', es: '/herramientas/analizador-de-ruidos-del-motor/traqueteo-del-motor', ar: '/adawat/mohallil-sawt-almuharrik/soat-khashkhasha-almuharrik', fr: '/outils/analyseur-de-bruit-moteur/bruit-de-ferraille-moteur', pt: '/ferramentas/analisador-de-barulho-do-motor/barulho-de-chocalho-no-motor' },
  { en: '/tools/engine-number-analyzer', es: '/herramientas/verificar-numero-de-motor' },
  { en: '/tools/fuel-cost-calculator-global', es: '/herramientas/calculadora-de-costo-de-combustible-global' },
  { en: '/tools/mileage-explainer', es: '/herramientas/calculadora-de-kilometraje' },
  { en: '/tools/vin-checker-global', es: '/herramientas/decodificador-de-vin', ar: '/adawat/fahs-raqm-alhaykal', fr: '/outils/decodeur-vin', pt: '/ferramentas/decodificador-de-chassi', de: '/werkzeuge/fahrgestellnummer-pruefen', ja: '/tsuru/vin-code-shirabe', it: '/strumenti/verifica-numero-di-telaio', tr: '/araclar/sasi-numarasi-sorgulama' },
];

const GROUPS: LangPaths[] = [...HUB_GROUPS, ...TOOL_GROUPS];

const norm = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);

// path -> { lang, group }
const INDEX = new Map<string, { lang: Lang; group: LangPaths }>();
for (const group of GROUPS) {
  for (const lang of LANGS) {
    const p = group[lang];
    if (!p) continue;
    const key = norm(p);
    if (INDEX.has(key)) {
      throw new Error(`hreflang: path ${key} appears in more than one group`);
    }
    INDEX.set(key, { lang, group });
  }
}

/** The translation group a page belongs to, or null if it has no translations. */
export function getGroup(path: string): { lang: Lang; group: LangPaths } | null {
  return INDEX.get(norm(path)) ?? null;
}

/** The path of `enPath`'s translation in `lang`, or null if none exists. */
export function localizedPath(enPath: string, lang: Lang): string | null {
  const hit = INDEX.get(norm(enPath));
  return hit?.group[lang] ?? null;
}

/** Absolute URL for a site path. */
export const abs = (path: string) => (path === '/' ? `${SITE}/` : `${SITE}${path}`);

/**
 * Next.js `metadata.alternates` for a page. Canonical is always the page's
 * own URL. If the page has translations, emits reciprocal hreflang for every
 * language in the group — including a self-reference, as Google requires —
 * plus x-default (English when it exists, otherwise the first language).
 */
export function alternatesFor(path: string): NonNullable<Metadata['alternates']> {
  const hit = getGroup(path);
  const canonical = abs(norm(path));
  if (!hit) return { canonical };
  const languages: Record<string, string> = {};
  for (const lang of LANGS) {
    const p = hit.group[lang];
    if (p) languages[lang] = abs(p);
  }
  const fallback = hit.group.en ?? LANGS.map((l) => hit.group[l]).find(Boolean)!;
  languages['x-default'] = abs(fallback);
  return { canonical, languages };
}

/** Language-switcher data for a page (empty array = no translations). */
export function languageLinks(path: string): { lang: Lang; href: string; current: boolean }[] {
  const hit = getGroup(path);
  if (!hit) return [];
  return LANGS.filter((l) => hit.group[l]).map((lang) => ({
    lang,
    href: hit.group[lang]!,
    current: lang === hit.lang,
  }));
}
