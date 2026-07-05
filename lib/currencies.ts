// Shared currency list for calculators where the user enters their own
// numbers (loan amount, fuel price, etc.) — we're not converting a stored
// value, just relabeling the symbol/code they want to see and type in.
export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'ZAR' | 'INR' | 'AED';

export const CURRENCIES: { code: CurrencyCode; symbol: string; label: string }[] = [
  { code: 'NGN', symbol: '₦', label: 'Nigerian Naira' },
  { code: 'USD', symbol: '$', label: 'US Dollar' },
  { code: 'GBP', symbol: '£', label: 'British Pound' },
  { code: 'EUR', symbol: '€', label: 'Euro' },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar' },
  { code: 'ZAR', symbol: 'R', label: 'South African Rand' },
  { code: 'INR', symbol: '₹', label: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
];

export function symbolFor(code: CurrencyCode): string {
  return CURRENCIES.find(c => c.code === code)?.symbol ?? '₦';
}

// ─── Valuation tool: country → currency + search bias + price-range scaling ──
// Used by the Car Valuation ("evaluator") tool, which needs more than a
// display symbol — it needs to bias the reverse-image search and prompt
// the AI toward the right market, and scale its confidence-range rounding
// to that currency's typical magnitude (₦2,000,000 vs $2,000 are very
// different scales for the same relative price point).
export interface ValuationCountry {
  code: string;          // ISO 3166-1 alpha-2, also used as SerpAPI `gl`
  name: string;
  flag: string;
  currency: CurrencyCode;
  // Rounding + spread-widening tuned to this currency's typical scale
  roundTo: number;
  lowThreshold: number;
  midThreshold: number;
  minSpreadLow: number;
  minSpreadMid: number;
  minSpreadHigh: number;
}

export const VALUATION_COUNTRIES: ValuationCountry[] = [
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', currency: 'NGN', roundTo: 50_000, lowThreshold: 2_000_000, midThreshold: 5_000_000, minSpreadLow: 500_000, minSpreadMid: 1_000_000, minSpreadHigh: 1_500_000 },
  { code: 'us', name: 'United States',  flag: '🇺🇸', currency: 'USD', roundTo: 100,    lowThreshold: 3_000,     midThreshold: 10_000,    minSpreadLow: 600,     minSpreadMid: 1_200,     minSpreadHigh: 2_000 },
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', roundTo: 100,    lowThreshold: 2_500,     midThreshold: 8_000,     minSpreadLow: 500,     minSpreadMid: 1_000,     minSpreadHigh: 1_600 },
  { code: 'ca', name: 'Canada',         flag: '🇨🇦', currency: 'CAD', roundTo: 100,    lowThreshold: 3_500,     midThreshold: 12_000,    minSpreadLow: 700,     minSpreadMid: 1_400,     minSpreadHigh: 2_200 },
  { code: 'de', name: 'Germany',        flag: '🇩🇪', currency: 'EUR', roundTo: 100,    lowThreshold: 2_500,     midThreshold: 8_000,     minSpreadLow: 500,     minSpreadMid: 1_000,     minSpreadHigh: 1_600 },
  { code: 'fr', name: 'France',         flag: '🇫🇷', currency: 'EUR', roundTo: 100,    lowThreshold: 2_500,     midThreshold: 8_000,     minSpreadLow: 500,     minSpreadMid: 1_000,     minSpreadHigh: 1_600 },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', currency: 'ZAR', roundTo: 5_000,  lowThreshold: 40_000,    midThreshold: 120_000,   minSpreadLow: 8_000,   minSpreadMid: 18_000,    minSpreadHigh: 28_000 },
  { code: 'in', name: 'India',          flag: '🇮🇳', currency: 'INR', roundTo: 10_000, lowThreshold: 300_000,   midThreshold: 800_000,   minSpreadLow: 60_000,  minSpreadMid: 130_000,   minSpreadHigh: 200_000 },
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', currency: 'AED', roundTo: 500,    lowThreshold: 12_000,    midThreshold: 35_000,    minSpreadLow: 2_000,   minSpreadMid: 4_500,     minSpreadHigh: 7_000 },
  { code: 'au', name: 'Australia',      flag: '🇦🇺', currency: 'AUD', roundTo: 100,    lowThreshold: 4_000,     midThreshold: 13_000,    minSpreadLow: 800,     minSpreadMid: 1_600,     minSpreadHigh: 2_500 },
];

export function getValuationCountry(code: string | undefined): ValuationCountry {
  return VALUATION_COUNTRIES.find(c => c.code === code) ?? VALUATION_COUNTRIES[0];
}
