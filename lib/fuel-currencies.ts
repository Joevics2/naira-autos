// Shared currency + pump-price config for the Global Fuel Cost Calculator
// family (English + Spanish). Deliberately a curated subset of the full
// 50+ country CurrencyCode union in lib/currencies.ts — a pump-price
// slider needs real min/max/preset/default values researched per
// currency, not just a currency symbol, so it grows one verified market
// at a time rather than blindly covering every currency.
//
// Sources for the 2026 defaults below: national fuel-price trackers and
// regulator data as of late August 2026 (Pemex/CRE for MXN, YPF pricing
// coverage for ARS, CREG for COP, ENAP/MEPCO for CLP). Argentina and
// Nigeria move often enough that the slider range is intentionally wide
// — treat `default` as a starting point, not today's exact price.

export type FuelCurrencyCode =
  | 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'ZAR' | 'INR' | 'AED'
  | 'MXN' | 'ARS' | 'COP' | 'CLP';

export interface FuelCurrencyMeta { code: FuelCurrencyCode; symbol: string; label: string; labelEs: string; }

export const FUEL_CURRENCIES: FuelCurrencyMeta[] = [
  { code: 'NGN', symbol: '₦',   label: 'Nigerian Naira',    labelEs: 'Naira nigeriano' },
  { code: 'USD', symbol: '$',   label: 'US Dollar',         labelEs: 'Dólar estadounidense' },
  { code: 'GBP', symbol: '£',   label: 'British Pound',     labelEs: 'Libra esterlina' },
  { code: 'EUR', symbol: '€',   label: 'Euro',              labelEs: 'Euro' },
  { code: 'CAD', symbol: 'C$',  label: 'Canadian Dollar',   labelEs: 'Dólar canadiense' },
  { code: 'AUD', symbol: 'A$',  label: 'Australian Dollar', labelEs: 'Dólar australiano' },
  { code: 'ZAR', symbol: 'R',   label: 'South African Rand',labelEs: 'Rand sudafricano' },
  { code: 'INR', symbol: '₹',   label: 'Indian Rupee',      labelEs: 'Rupia india' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham',        labelEs: 'Dírham de EAU' },
  { code: 'MXN', symbol: '$',   label: 'Mexican Peso',      labelEs: 'Peso mexicano' },
  { code: 'ARS', symbol: '$',   label: 'Argentine Peso',    labelEs: 'Peso argentino' },
  { code: 'COP', symbol: '$',   label: 'Colombian Peso',    labelEs: 'Peso colombiano' },
  { code: 'CLP', symbol: '$',   label: 'Chilean Peso',      labelEs: 'Peso chileno' },
];

/** Currencies shown by default on the Spanish-language tool — the major
 *  Spanish-speaking markets, plus USD for dollarized economies (Ecuador,
 *  Panama, El Salvador). The full FUEL_CURRENCIES list is still reachable,
 *  this just controls default ordering/prominence. */
export const FUEL_CURRENCIES_ES_PRIORITY: FuelCurrencyCode[] = ['EUR', 'MXN', 'ARS', 'COP', 'CLP', 'USD'];

export const PUMP_PRICE_CONFIG: Record<FuelCurrencyCode, { min: number; max: number; step: number; presets: number[]; default: number }> = {
  NGN: { min: 500,  max: 2000, step: 50,  presets: [800, 950, 1000, 1100, 1500],  default: 1000 },
  USD: { min: 0.5,  max: 3,    step: 0.05, presets: [0.9, 1.1, 1.3, 1.5, 2.0],    default: 1.3 },
  GBP: { min: 1,    max: 2.5,  step: 0.05, presets: [1.3, 1.4, 1.5, 1.6, 1.8],    default: 1.5 },
  EUR: { min: 1,    max: 2.5,  step: 0.05, presets: [1.4, 1.5, 1.6, 1.7, 1.9],    default: 1.6 },
  CAD: { min: 1,    max: 2.5,  step: 0.05, presets: [1.3, 1.4, 1.5, 1.6, 1.8],    default: 1.5 },
  AUD: { min: 1,    max: 3,    step: 0.05, presets: [1.6, 1.8, 1.9, 2.0, 2.2],    default: 1.9 },
  ZAR: { min: 10,   max: 35,   step: 0.5,  presets: [20, 22, 23, 24, 26],         default: 23 },
  INR: { min: 60,   max: 150,  step: 1,    presets: [90, 95, 100, 105, 110],      default: 100 },
  AED: { min: 1.5,  max: 4,    step: 0.05, presets: [2.4, 2.6, 2.8, 3.0, 3.2],    default: 2.8 },
  // Mexico — Pemex/CRE regular ("Magna") averaged ~23–24 MXN/L nationally
  // in late Aug 2026; premium runs ~28–29.
  MXN: { min: 15,   max: 35,   step: 0.5,  presets: [20, 22, 24, 26, 28],         default: 24 },
  // Argentina — highly volatile (frequent monthly adjustments). YPF Nafta
  // Súper in Buenos Aires/Córdoba was ~2,000–2,250 ARS/L in Aug 2026.
  ARS: { min: 800,  max: 4000, step: 25,   presets: [1500, 1800, 2050, 2300, 2800], default: 2050 },
  // Colombia — CREG-regulated gasolina corriente averaged ~4,200 COP/L
  // (≈15,900–16,000 COP/gallon) as of mid-2026.
  COP: { min: 2500, max: 7000, step: 100,  presets: [3500, 3900, 4200, 4600, 5000], default: 4200 },
  // Chile — MEPCO-regulated bencina 93 octanos averaged ~1,450–1,500
  // CLP/L nationally as of late Aug 2026.
  CLP: { min: 800,  max: 2200, step: 25,   presets: [1200, 1350, 1480, 1600, 1800], default: 1480 },
};
