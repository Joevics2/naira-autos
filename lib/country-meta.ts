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
