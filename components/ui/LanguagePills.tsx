import Link from 'next/link';
import { LANG_NAMES, languageLinks } from '@/lib/hreflang';

interface LanguagePillsProps {
  /** The current page's path (must match its entry in lib/hreflang.ts). */
  path: string;
  /** 'dark' for dark hero backgrounds, 'auto' follows the site theme. */
  tone?: 'dark' | 'auto';
  className?: string;
}

const BASE =
  'inline-flex items-center justify-center min-w-[2rem] h-6 px-2 rounded-full border text-[10px] font-semibold tracking-wider uppercase transition-colors';

const TONES = {
  dark: {
    idle: 'border-white/15 bg-white/5 text-white/50 hover:text-white hover:border-white/40 hover:bg-white/10',
    current: 'border-emerald-400/60 bg-emerald-400/15 text-emerald-300',
  },
  auto: {
    idle: 'border-border bg-muted/40 text-muted-foreground hover:text-foreground hover:border-foreground/40',
    current: 'border-emerald-500/60 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
} as const;

/**
 * Language switcher shown as abbreviation pills (EN, ES, FR…). Only languages
 * that actually have a version of this page are shown; if the page has no
 * translations the component renders nothing.
 *
 * Always dir="ltr": the abbreviations are Latin and keep a stable order even
 * on RTL (Arabic) pages.
 */
export default function LanguagePills({ path, tone = 'dark', className = '' }: LanguagePillsProps) {
  const links = languageLinks(path);
  if (links.length < 2) return null;
  const t = TONES[tone];

  return (
    <nav aria-label="Language" dir="ltr" className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      {links.map(({ lang, href, current }) =>
        current ? (
          <span key={lang} aria-current="true" title={LANG_NAMES[lang]} className={`${BASE} ${t.current}`}>
            {lang}
          </span>
        ) : (
          <Link prefetch={false}
            key={lang}
            href={href}
            hrefLang={lang}
            lang={lang}
            title={LANG_NAMES[lang]}
            aria-label={LANG_NAMES[lang]}
            className={`${BASE} ${t.idle}`}
          >
            {lang}
          </Link>
        ),
      )}
    </nav>
  );
}
