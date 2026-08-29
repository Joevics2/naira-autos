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
  | 'MXN' | 'ARS' | 'COP' | 'CLP'
  | 'CNY' | 'IDR' | 'PKR' | 'BRL' | 'BDT' | 'RUB' | 'JPY' | 'ETB' | 'EGP' | 'PHP' | 'VND' | 'IRR' | 'TRY' | 'THB' | 'TZS' | 'KES' | 'KRW' | 'DZD' | 'PLN' | 'SAR' | 'MYR' | 'SEK' | 'CHF' | 'SGD' | 'NOK' | 'NZD' | 'DKK' | 'ILS' | 'TWD' | 'HKD' | 'CZK';

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
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan', labelEs: 'Yuan chino' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah', labelEs: 'Rupia indonesia' },
  { code: 'PKR', symbol: '₨', label: 'Pakistani Rupee', labelEs: 'Rupia pakistaní' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real', labelEs: 'Real brasileño' },
  { code: 'BDT', symbol: '৳', label: 'Bangladeshi Taka', labelEs: 'Taka bangladesí' },
  { code: 'RUB', symbol: '₽', label: 'Russian Ruble', labelEs: 'Rublo ruso' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen', labelEs: 'Yen japonés' },
  { code: 'ETB', symbol: 'Br', label: 'Ethiopian Birr', labelEs: 'Birr etíope' },
  { code: 'EGP', symbol: '£E', label: 'Egyptian Pound', labelEs: 'Libra egipcia' },
  { code: 'PHP', symbol: '₱', label: 'Philippine Peso', labelEs: 'Peso filipino' },
  { code: 'VND', symbol: '₫', label: 'Vietnamese Dong', labelEs: 'Dong vietnamita' },
  { code: 'IRR', symbol: '﷼', label: 'Iranian Rial', labelEs: 'Rial iraní' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira', labelEs: 'Lira turca' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht', labelEs: 'Baht tailandés' },
  { code: 'TZS', symbol: 'TSh', label: 'Tanzanian Shilling', labelEs: 'Chelín tanzano' },
  { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling', labelEs: 'Chelín keniano' },
  { code: 'KRW', symbol: '₩', label: 'South Korean Won', labelEs: 'Won surcoreano' },
  { code: 'DZD', symbol: 'DA', label: 'Algerian Dinar', labelEs: 'Dinar argelino' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Złoty', labelEs: 'Złoty polaco' },
  { code: 'SAR', symbol: '﷼', label: 'Saudi Riyal', labelEs: 'Riyal saudí' },
  { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit', labelEs: 'Ringgit malasio' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona', labelEs: 'Corona sueca' },
  { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc', labelEs: 'Franco suizo' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar', labelEs: 'Dólar de Singapur' },
  { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone', labelEs: 'Corona noruega' },
  { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar', labelEs: 'Dólar neozelandés' },
  { code: 'DKK', symbol: 'kr', label: 'Danish Krone', labelEs: 'Corona danesa' },
  { code: 'ILS', symbol: '₪', label: 'Israeli New Shekel', labelEs: 'Nuevo shekel israelí' },
  { code: 'TWD', symbol: 'NT$', label: 'New Taiwan Dollar', labelEs: 'Nuevo dólar taiwanés' },
  { code: 'HKD', symbol: 'HK$', label: 'Hong Kong Dollar', labelEs: 'Dólar de Hong Kong' },
  { code: 'CZK', symbol: 'Kč', label: 'Czech Koruna', labelEs: 'Corona checa' },
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
  // Eurozone spans ~€1.73/L (Spain) to ~€2.35/L (Netherlands) as of mid-2026
  // across the 10 Eurozone countries this tool now covers.
  EUR: { min: 1.3,  max: 2.6,  step: 0.05, presets: [1.75, 1.9, 2.0, 2.15, 2.3], default: 1.95 },
  // Canada — national average climbed to ~C$2.02/L by mid-2026 amid the
  // broader global supply shock; range kept wide either side of that.
  CAD: { min: 1,    max: 2.6,  step: 0.05, presets: [1.5, 1.7, 1.9, 2.0, 2.2],   default: 1.9 },
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
  // China — national average ~8.36 CNY/L for 92# gasoline, late Aug 2026.
  CNY: { min: 5, max: 12, step: 0.1, presets: [7.5, 8.0, 8.36, 9.0, 9.5], default: 8.36 },
  // Indonesia — subsidized Pertalite lower, unsubsidized Pertamax ~16,000-16,600 Rp/L.
  IDR: { min: 8000, max: 22000, step: 200, presets: [10000, 13000, 16000, 16600, 18000], default: 16000 },
  // Pakistan — OGRA-set price ~343 PKR/L, adjusted fortnightly.
  PKR: { min: 200, max: 500, step: 5, presets: [280, 320, 343, 370, 400], default: 343 },
  // Brazil — national average ~R$6.50/L gasoline (ANP), varies by state ICMS tax.
  BRL: { min: 4, max: 9, step: 0.1, presets: [5.8, 6.2, 6.5, 6.8, 7.2], default: 6.5 },
  // Bangladesh — government-set octane price ~৳145/L.
  BDT: { min: 100, max: 200, step: 2, presets: [130, 140, 145, 150, 160], default: 145 },
  // Russia — AI-95 averaged ~70-80 RUB/L in 2026; ruble/USD volatility makes this an approximation.
  RUB: { min: 50, max: 130, step: 1, presets: [65, 72, 78, 85, 95], default: 78 },
  // Japan — regular gasoline national average ~¥170/L.
  JPY: { min: 130, max: 220, step: 1, presets: [160, 168, 170, 178, 190], default: 170 },
  // Ethiopia — Ministry of Trade regulated price, verified 167.5 ETB/L as of June/July 2026; rising fast as subsidies phase out (was ~100 ETB/L in 2024).
  ETB: { min: 100, max: 260, step: 2, presets: [130, 150, 167, 185, 210], default: 167 },
  // Egypt — 95-octane government-set price, verified EGP 24.00/L as of Aug 2026 (92-octane ~22.25, 80-octane ~20.75).
  EGP: { min: 15, max: 45, step: 0.5, presets: [20, 22, 24, 27, 30], default: 24 },
  // Philippines — DOE-monitored pump price average ~₱76-77/L unleaded.
  PHP: { min: 50, max: 110, step: 1, presets: [65, 70, 76, 82, 90], default: 76 },
  // Vietnam — E10 RON95 average ~22,600 VND/L, state-managed price fund.
  VND: { min: 15000, max: 32000, step: 200, presets: [20000, 21500, 22600, 24000, 26000], default: 22600 },
  // Iran — heavily tiered subsidy: ~15,000 IRR/L for the first ~60L/month, then 30,000-50,000+ IRR/L above quota. Verified via GlobalPetrolPrices/Al Jazeera, Aug 2026. Extremely volatile amid 2026 sanctions/war context — treat as illustrative only.
  IRR: { min: 10000, max: 70000, step: 1000, presets: [15000, 20000, 30000, 40000, 50000], default: 15000 },
  // Turkey — verified TRY 71.44/L (≈$1.49) as of 17-Aug-2026 (GlobalPetrolPrices); risen sharply through 2026 with lira depreciation.
  TRY: { min: 40, max: 120, step: 1, presets: [55, 63, 71, 80, 90], default: 71 },
  // Thailand — Oil Fund-managed retail price, gasoline ~฿47/L, diesel capped lower ~฿38/L.
  THB: { min: 25, max: 55, step: 0.5, presets: [38, 42, 47, 50, 52], default: 47 },
  // Tanzania — EWURA monthly cap price, Dar es Salaam verified TZS 3,898/L as of 5-Aug-2026 cap notice; risen fast in 2026 (was ~2,800 in Jan).
  TZS: { min: 2500, max: 5500, step: 50, presets: [3200, 3600, 3900, 4200, 4500], default: 3900 },
  // Kenya — EPRA monthly review, Nairobi super petrol verified KES 214.25/L for the 15-May-2026 cycle; up sharply from ~178 in early 2026 amid a global supply shock.
  KES: { min: 150, max: 280, step: 5, presets: [180, 200, 214, 230, 250], default: 214 },
  // South Korea — Opinet national average ~₩1,867/L gasoline.
  KRW: { min: 1200, max: 2600, step: 20, presets: [1700, 1800, 1867, 1950, 2050], default: 1867 },
  // Algeria — ARH fixed regulated price, verified DZD 47.00/L since 1-Jan-2026 (diesel 31.00/L).
  DZD: { min: 30, max: 70, step: 1, presets: [40, 44, 47, 50, 55], default: 47 },
  // Poland — government max-price mechanism ("Ceny Paliw Niżej"), Pb95 verified 6.21-6.57 zł/L through 2026, climbing amid the 2026 global oil-supply shock.
  PLN: { min: 4, max: 9, step: 0.05, presets: [5.6, 6.0, 6.5, 7.0, 7.5], default: 6.5 },
  // Saudi Arabia — government-set price, verified SAR 2.33/L.
  SAR: { min: 1.5, max: 4, step: 0.02, presets: [2.0, 2.2, 2.33, 2.5, 2.7], default: 2.33 },
  // Malaysia — RON95 floated for higher-income users under 2024-2025 targeted-subsidy reform; RM3.82/L reflects the unsubsidized/market tier.
  MYR: { min: 2, max: 6, step: 0.05, presets: [2.8, 3.3, 3.82, 4.2, 4.6], default: 3.82 },
  // Sweden — national average ~17 SEK/L.
  SEK: { min: 12, max: 22, step: 0.1, presets: [15, 16, 17, 18, 19], default: 17 },
  // Switzerland — national average ~CHF 2.04/L.
  CHF: { min: 1.5, max: 2.6, step: 0.02, presets: [1.9, 2.0, 2.04, 2.15, 2.3], default: 2.04 },
  // Singapore — among the world’s highest, ~S$3.01/L.
  SGD: { min: 2, max: 4, step: 0.02, presets: [2.7, 2.9, 3.01, 3.2, 3.4], default: 3.01 },
  // Norway — national average ~20 NOK/L.
  NOK: { min: 15, max: 26, step: 0.1, presets: [18, 19, 20.1, 21, 22], default: 20.1 },
  // New Zealand — national average ~NZ$2.90-3.00/L.
  NZD: { min: 2, max: 4, step: 0.02, presets: [2.6, 2.8, 2.95, 3.1, 3.3], default: 2.95 },
  // Denmark — national average ~17.8 DKK/L incl. VAT.
  DKK: { min: 13, max: 22, step: 0.1, presets: [16, 17, 17.8, 18.6, 19.5], default: 17.8 },
  // Israel — regulated maximum price, updated monthly, ~₪7.5-8.3/L depending on service type.
  ILS: { min: 5, max: 9.5, step: 0.05, presets: [7.0, 7.6, 8.0, 8.3, 8.8], default: 8.0 },
  // Taiwan — CPC/Formosa price-stabilization mechanism keeps it relatively steady, ~NT$32/L.
  TWD: { min: 20, max: 45, step: 0.5, presets: [28, 30, 32, 34, 36], default: 32 },
  // Hong Kong — among the world’s most expensive at ~HK$32-33/L.
  HKD: { min: 20, max: 45, step: 0.5, presets: [29, 31, 32.5, 34, 36], default: 32.5 },
  // Czechia — national average ~42 CZK/L.
  CZK: { min: 30, max: 55, step: 0.25, presets: [38, 40, 42, 44, 47], default: 42 },
};
