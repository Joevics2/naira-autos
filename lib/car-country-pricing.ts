// lib/car-country-pricing.ts
//
// Shared 50-country dataset for the Car Comparison and Best-Car-For tools.
// Powers the country selector: converts each car's base USD price range into
// a country-adjusted local-currency estimate.
//
// HOW THE ESTIMATE WORKS
// display price = basePriceUSD × marketMultiplier × fxRate
//
// - basePriceUSD comes from the car's own entry in cars-data.ts (approximate
//   2025/2026 US-market or global-equivalent starting price).
// - marketMultiplier reflects that country's typical total cost-of-ownership
//   uplift versus the US baseline — import duty, excise/registration tax,
//   VAT, and general market markup. It is a directional estimate, not a
//   quoted duty rate: real cost depends on engine size, age, trim, and
//   whether a model is even sold new in that market.
// - fxRate is USD → local currency, captured from a live FX snapshot on the
//   date below. Exchange rates move daily (especially NGN, ARS, EGP, TRY,
//   ETB) — treat the local-currency figure as a reference point, not a
//   live quote.
//
// Nigeria's multiplier (1.80) is grounded in actual listings research
// (Corolla/Camry/Model 3 asking prices vs. US baseline, factoring ~20%
// import duty + 5% NAC levy + 7.5% VAT + green tax + clearing/shipping).
// Other countries use the same duty/tax logic applied at a category level
// (high-tariff markets like Singapore's COE or Denmark's registration tax
// score much higher; low-duty Gulf markets score below 1.0).

export const FX_SNAPSHOT_DATE = '2026-08-28';

export type CarCurrencyCode =
  | 'NGN' | 'USD' | 'CAD' | 'MXN' | 'BRL' | 'ARS' | 'CLP' | 'COP' | 'PEN'
  | 'EUR' | 'GBP' | 'SEK' | 'NOK' | 'CHF' | 'PLN' | 'CZK' | 'RON' | 'HUF'
  | 'DKK' | 'CNY' | 'INR' | 'JPY' | 'KRW' | 'IDR' | 'THB' | 'MYR' | 'VND'
  | 'PHP' | 'PKR' | 'SGD' | 'TRY' | 'SAR' | 'AED' | 'ILS' | 'QAR' | 'ZAR'
  | 'EGP' | 'MAD' | 'KES' | 'GHS' | 'DZD' | 'ETB';

export interface CarCountry {
  code: string;           // ISO 3166-1 alpha-2
  name: string;
  flag: string;
  currency: CarCurrencyCode;
  symbol: string;
  fxRate: number;         // units of local currency per 1 USD
  multiplier: number;     // total cost-of-ownership uplift vs. US baseline
  region: 'Africa' | 'Americas' | 'Europe' | 'Middle East' | 'Asia-Pacific';
}

export const CAR_COUNTRIES: CarCountry[] = [
  // ── Africa ──
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', currency: 'NGN', symbol: '₦',    fxRate: 1339.958526, multiplier: 1.80, region: 'Africa' },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', currency: 'ZAR', symbol: 'R',    fxRate: 15.988946,   multiplier: 1.35, region: 'Africa' },
  { code: 'eg', name: 'Egypt',          flag: '🇪🇬', currency: 'EGP', symbol: 'E£',   fxRate: 50.247305,   multiplier: 1.60, region: 'Africa' },
  { code: 'ma', name: 'Morocco',        flag: '🇲🇦', currency: 'MAD', symbol: 'DH',   fxRate: 9.248333,    multiplier: 1.20, region: 'Africa' },
  { code: 'ke', name: 'Kenya',          flag: '🇰🇪', currency: 'KES', symbol: 'KSh',  fxRate: 129.441983,  multiplier: 1.55, region: 'Africa' },
  { code: 'gh', name: 'Ghana',          flag: '🇬🇭', currency: 'GHS', symbol: 'GH₵',  fxRate: 11.232512,   multiplier: 1.50, region: 'Africa' },
  { code: 'dz', name: 'Algeria',        flag: '🇩🇿', currency: 'DZD', symbol: 'DA',   fxRate: 133.080525,  multiplier: 1.70, region: 'Africa' },
  { code: 'et', name: 'Ethiopia',       flag: '🇪🇹', currency: 'ETB', symbol: 'Br',   fxRate: 161.18769,   multiplier: 2.20, region: 'Africa' },
  // ── Americas ──
  { code: 'us', name: 'United States',  flag: '🇺🇸', currency: 'USD', symbol: '$',    fxRate: 1,           multiplier: 1.00, region: 'Americas' },
  { code: 'ca', name: 'Canada',         flag: '🇨🇦', currency: 'CAD', symbol: 'C$',   fxRate: 1.385755,    multiplier: 1.05, region: 'Americas' },
  { code: 'mx', name: 'Mexico',         flag: '🇲🇽', currency: 'MXN', symbol: 'MX$',  fxRate: 16.966732,   multiplier: 1.10, region: 'Americas' },
  { code: 'br', name: 'Brazil',         flag: '🇧🇷', currency: 'BRL', symbol: 'R$',   fxRate: 5.152001,    multiplier: 1.90, region: 'Americas' },
  { code: 'ar', name: 'Argentina',      flag: '🇦🇷', currency: 'ARS', symbol: 'AR$',  fxRate: 1512.7498,   multiplier: 1.70, region: 'Americas' },
  { code: 'cl', name: 'Chile',          flag: '🇨🇱', currency: 'CLP', symbol: 'CH$',  fxRate: 920.112211,  multiplier: 1.15, region: 'Americas' },
  { code: 'co', name: 'Colombia',       flag: '🇨🇴', currency: 'COP', symbol: 'COL$', fxRate: 3114.717048, multiplier: 1.35, region: 'Americas' },
  { code: 'pe', name: 'Peru',           flag: '🇵🇪', currency: 'PEN', symbol: 'S/',   fxRate: 3.351563,    multiplier: 1.15, region: 'Americas' },
  // ── Europe ──
  { code: 'de', name: 'Germany',        flag: '🇩🇪', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.10, region: 'Europe' },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', symbol: '£',    fxRate: 0.735818,    multiplier: 1.12, region: 'Europe' },
  { code: 'fr', name: 'France',         flag: '🇫🇷', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.12, region: 'Europe' },
  { code: 'it', name: 'Italy',          flag: '🇮🇹', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.12, region: 'Europe' },
  { code: 'es', name: 'Spain',          flag: '🇪🇸', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.10, region: 'Europe' },
  { code: 'nl', name: 'Netherlands',    flag: '🇳🇱', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.20, region: 'Europe' },
  { code: 'be', name: 'Belgium',        flag: '🇧🇪', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.15, region: 'Europe' },
  { code: 'se', name: 'Sweden',         flag: '🇸🇪', currency: 'SEK', symbol: 'kr',   fxRate: 9.516809,    multiplier: 1.15, region: 'Europe' },
  { code: 'no', name: 'Norway',         flag: '🇳🇴', currency: 'NOK', symbol: 'kr',   fxRate: 9.326462,    multiplier: 1.35, region: 'Europe' },
  { code: 'ch', name: 'Switzerland',    flag: '🇨🇭', currency: 'CHF', symbol: 'CHF',  fxRate: 0.804244,    multiplier: 1.05, region: 'Europe' },
  { code: 'pl', name: 'Poland',         flag: '🇵🇱', currency: 'PLN', symbol: 'zł',   fxRate: 3.717556,    multiplier: 1.05, region: 'Europe' },
  { code: 'at', name: 'Austria',        flag: '🇦🇹', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.12, region: 'Europe' },
  { code: 'pt', name: 'Portugal',       flag: '🇵🇹', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.30, region: 'Europe' },
  { code: 'cz', name: 'Czechia',        flag: '🇨🇿', currency: 'CZK', symbol: 'Kč',   fxRate: 20.716721,   multiplier: 1.05, region: 'Europe' },
  { code: 'ro', name: 'Romania',        flag: '🇷🇴', currency: 'RON', symbol: 'lei',  fxRate: 4.514989,    multiplier: 1.05, region: 'Europe' },
  { code: 'hu', name: 'Hungary',        flag: '🇭🇺', currency: 'HUF', symbol: 'Ft',   fxRate: 312.797541,  multiplier: 1.08, region: 'Europe' },
  { code: 'gr', name: 'Greece',         flag: '🇬🇷', currency: 'EUR', symbol: '€',    fxRate: 0.858266,    multiplier: 1.30, region: 'Europe' },
  { code: 'dk', name: 'Denmark',        flag: '🇩🇰', currency: 'DKK', symbol: 'kr',   fxRate: 6.418152,    multiplier: 1.55, region: 'Europe' },
  // ── Middle East ──
  { code: 'sa', name: 'Saudi Arabia',   flag: '🇸🇦', currency: 'SAR', symbol: 'SR',   fxRate: 3.75,        multiplier: 0.95, region: 'Middle East' },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', currency: 'AED', symbol: 'د.إ',  fxRate: 3.6725,      multiplier: 0.90, region: 'Middle East' },
  { code: 'il', name: 'Israel',         flag: '🇮🇱', currency: 'ILS', symbol: '₪',    fxRate: 2.968974,    multiplier: 1.55, region: 'Middle East' },
  { code: 'qa', name: 'Qatar',          flag: '🇶🇦', currency: 'QAR', symbol: 'QR',   fxRate: 3.64,        multiplier: 0.90, region: 'Middle East' },
  // ── Asia-Pacific ──
  { code: 'cn', name: 'China',          flag: '🇨🇳', currency: 'CNY', symbol: '¥',    fxRate: 6.737174,    multiplier: 1.25, region: 'Asia-Pacific' },
  { code: 'in', name: 'India',          flag: '🇮🇳', currency: 'INR', symbol: '₹',    fxRate: 95.592676,   multiplier: 1.60, region: 'Asia-Pacific' },
  { code: 'jp', name: 'Japan',          flag: '🇯🇵', currency: 'JPY', symbol: '¥',    fxRate: 159.327232,  multiplier: 0.95, region: 'Asia-Pacific' },
  { code: 'kr', name: 'South Korea',    flag: '🇰🇷', currency: 'KRW', symbol: '₩',    fxRate: 1381.567326, multiplier: 1.05, region: 'Asia-Pacific' },
  { code: 'id', name: 'Indonesia',      flag: '🇮🇩', currency: 'IDR', symbol: 'Rp',   fxRate: 17744.923171,multiplier: 1.30, region: 'Asia-Pacific' },
  { code: 'th', name: 'Thailand',       flag: '🇹🇭', currency: 'THB', symbol: '฿',    fxRate: 32.868128,   multiplier: 1.35, region: 'Asia-Pacific' },
  { code: 'my', name: 'Malaysia',       flag: '🇲🇾', currency: 'MYR', symbol: 'RM',   fxRate: 4.031117,    multiplier: 1.45, region: 'Asia-Pacific' },
  { code: 'vn', name: 'Vietnam',        flag: '🇻🇳', currency: 'VND', symbol: '₫',    fxRate: 26044.824847,multiplier: 1.60, region: 'Asia-Pacific' },
  { code: 'ph', name: 'Philippines',    flag: '🇵🇭', currency: 'PHP', symbol: '₱',    fxRate: 61.94351,    multiplier: 1.30, region: 'Asia-Pacific' },
  { code: 'pk', name: 'Pakistan',       flag: '🇵🇰', currency: 'PKR', symbol: 'Rs',   fxRate: 277.768204,  multiplier: 1.55, region: 'Asia-Pacific' },
  { code: 'sg', name: 'Singapore',      flag: '🇸🇬', currency: 'SGD', symbol: 'S$',   fxRate: 1.271049,    multiplier: 2.20, region: 'Asia-Pacific' },
  { code: 'tr', name: 'Turkey',         flag: '🇹🇷', currency: 'TRY', symbol: '₺',    fxRate: 48.162464,   multiplier: 1.90, region: 'Asia-Pacific' },
];

export function getCarCountry(code: string | undefined): CarCountry {
  return CAR_COUNTRIES.find((c) => c.code === code) ?? CAR_COUNTRIES[0];
}

/** Convert a base USD price range into a country-adjusted local-currency range. */
export function localPriceRange(
  basePriceUSD: { min: number; max: number },
  country: CarCountry
): { min: number; max: number } {
  const factor = country.multiplier * country.fxRate;
  return {
    min: Math.round(basePriceUSD.min * factor),
    max: Math.round(basePriceUSD.max * factor),
  };
}

/** Format an amount in a given country's currency with compact notation for large numbers. */
export function formatCarPrice(amount: number, country: CarCountry): string {
  const { symbol } = country;
  if (amount >= 1_000_000_000) return `${symbol}${(amount / 1_000_000_000).toFixed(2)}B`;
  if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toFixed(amount >= 10_000_000 ? 1 : 2)}M`;
  if (amount >= 1_000) return `${symbol}${(amount / 1_000).toFixed(0)}k`;
  return `${symbol}${Math.round(amount).toLocaleString()}`;
}
