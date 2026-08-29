/**
 * Shared country display metadata for the Mileage Explainer tool family —
 * used by the city dataset (to list which countries have cities available)
 * and by the share card (for flag emoji). Single source of truth so a new
 * country only needs adding here once.
 */

export const COUNTRY_NAMES: Record<string, string> = {
  ng: 'Nigeria', gh: 'Ghana', ke: 'Kenya', za: 'South Africa', ug: 'Uganda',
  tz: 'Tanzania', zm: 'Zambia', et: 'Ethiopia', ae: 'UAE', sa: 'Saudi Arabia',
  in: 'India', pk: 'Pakistan', bd: 'Bangladesh', lk: 'Sri Lanka', ph: 'Philippines',
  id: 'Indonesia', my: 'Malaysia', vn: 'Vietnam', us: 'United States', gb: 'United Kingdom',
  ca: 'Canada', au: 'Australia', nz: 'New Zealand', ie: 'Ireland', de: 'Germany',
  fr: 'France', br: 'Brazil', mx: 'Mexico', eg: 'Egypt', jm: 'Jamaica', cn: 'China',
  es: 'Spain', ar: 'Argentina', co: 'Colombia', cl: 'Chile',
};

/** Spanish display names, keyed identically to COUNTRY_NAMES. Used by the
 *  Spanish tool pages/components so the in-page country picker doesn't
 *  mix English country names into otherwise-Spanish UI. Extend this same
 *  pattern (COUNTRY_NAMES_FR, etc.) for future languages. */
export const COUNTRY_NAMES_ES: Record<string, string> = {
  ng: 'Nigeria', gh: 'Ghana', ke: 'Kenia', za: 'Sudáfrica', ug: 'Uganda',
  tz: 'Tanzania', zm: 'Zambia', et: 'Etiopía', ae: 'EAU', sa: 'Arabia Saudita',
  in: 'India', pk: 'Pakistán', bd: 'Bangladés', lk: 'Sri Lanka', ph: 'Filipinas',
  id: 'Indonesia', my: 'Malasia', vn: 'Vietnam', us: 'Estados Unidos', gb: 'Reino Unido',
  ca: 'Canadá', au: 'Australia', nz: 'Nueva Zelanda', ie: 'Irlanda', de: 'Alemania',
  fr: 'Francia', br: 'Brasil', mx: 'México', eg: 'Egipto', jm: 'Jamaica', cn: 'China',
  es: 'España', ar: 'Argentina', co: 'Colombia', cl: 'Chile',
};

/** City display-name overrides for languages with well-established
 *  exonyms (e.g. Spanish "Nueva York" for New York). Cities not listed
 *  here keep their base name — most city names don't change in Spanish. */
export const CITY_NAME_OVERRIDES_ES: Record<string, string> = {
  'New York': 'Nueva York',
  'Los Angeles': 'Los Ángeles',
  London: 'Londres',
  Cairo: 'El Cairo',
  Munich: 'Múnich',
  'Mexico City': 'Ciudad de México',
};

/** ISO 3166-1 alpha-2 → flag emoji, via Unicode regional indicator symbols. */
export function flagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '';
  return countryCode
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export function countryName(code: string): string {
  return COUNTRY_NAMES[code] ?? code.toUpperCase();
}
