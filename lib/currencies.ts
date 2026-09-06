// Shared currency list for calculators where the user enters their own
// numbers (loan amount, fuel price, etc.) — we're not converting a stored
// value, just relabeling the symbol/code they want to see and type in.
export type CurrencyCode =
  | 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD' | 'ZAR' | 'INR' | 'AED'
  | 'CHF' | 'SEK' | 'NOK' | 'DKK' | 'PLN' | 'KES' | 'GHS' | 'EGP' | 'MAD'
  | 'UGX' | 'TZS' | 'PKR' | 'BDT' | 'SAR' | 'QAR' | 'KWD' | 'ILS' | 'TRY'
  | 'NZD' | 'JPY' | 'KRW' | 'CNY' | 'SGD' | 'MYR' | 'IDR' | 'PHP' | 'VND'
  | 'THB' | 'BRL' | 'MXN' | 'ARS' | 'COP' | 'CLP'
  // Arabic-speaking (Arab League) countries not already covered above
  | 'DZD' | 'BHD' | 'KMF' | 'DJF' | 'IQD' | 'JOD' | 'LBP' | 'LYD'
  | 'MRU' | 'OMR' | 'SOS' | 'SDG' | 'SYP' | 'TND' | 'YER';

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
  { code: 'CHF', symbol: 'CHF', label: 'Swiss Franc' },
  { code: 'SEK', symbol: 'kr', label: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', label: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', label: 'Danish Krone' },
  { code: 'PLN', symbol: 'zł', label: 'Polish Złoty' },
  { code: 'KES', symbol: 'KSh', label: 'Kenyan Shilling' },
  { code: 'GHS', symbol: 'GH₵', label: 'Ghanaian Cedi' },
  { code: 'EGP', symbol: 'E£', label: 'Egyptian Pound' },
  { code: 'MAD', symbol: 'DH', label: 'Moroccan Dirham' },
  { code: 'UGX', symbol: 'USh', label: 'Ugandan Shilling' },
  { code: 'TZS', symbol: 'TSh', label: 'Tanzanian Shilling' },
  { code: 'PKR', symbol: 'Rs', label: 'Pakistani Rupee' },
  { code: 'BDT', symbol: '৳', label: 'Bangladeshi Taka' },
  { code: 'SAR', symbol: 'SR', label: 'Saudi Riyal' },
  { code: 'QAR', symbol: 'QR', label: 'Qatari Riyal' },
  { code: 'KWD', symbol: 'KD', label: 'Kuwaiti Dinar' },
  { code: 'ILS', symbol: '₪', label: 'Israeli Shekel' },
  { code: 'TRY', symbol: '₺', label: 'Turkish Lira' },
  { code: 'NZD', symbol: 'NZ$', label: 'New Zealand Dollar' },
  { code: 'JPY', symbol: '¥', label: 'Japanese Yen' },
  { code: 'KRW', symbol: '₩', label: 'South Korean Won' },
  { code: 'CNY', symbol: '¥', label: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar' },
  { code: 'MYR', symbol: 'RM', label: 'Malaysian Ringgit' },
  { code: 'IDR', symbol: 'Rp', label: 'Indonesian Rupiah' },
  { code: 'PHP', symbol: '₱', label: 'Philippine Peso' },
  { code: 'VND', symbol: '₫', label: 'Vietnamese Dong' },
  { code: 'THB', symbol: '฿', label: 'Thai Baht' },
  { code: 'BRL', symbol: 'R$', label: 'Brazilian Real' },
  { code: 'MXN', symbol: 'MX$', label: 'Mexican Peso' },
  { code: 'ARS', symbol: 'AR$', label: 'Argentine Peso' },
  { code: 'COP', symbol: 'COL$', label: 'Colombian Peso' },
  { code: 'CLP', symbol: 'CH$', label: 'Chilean Peso' },
  { code: 'DZD', symbol: 'DA', label: 'Algerian Dinar' },
  { code: 'BHD', symbol: 'BD', label: 'Bahraini Dinar' },
  { code: 'KMF', symbol: 'CF', label: 'Comorian Franc' },
  { code: 'DJF', symbol: 'Fdj', label: 'Djiboutian Franc' },
  { code: 'IQD', symbol: 'ID', label: 'Iraqi Dinar' },
  { code: 'JOD', symbol: 'JD', label: 'Jordanian Dinar' },
  { code: 'LBP', symbol: 'LL', label: 'Lebanese Pound' },
  { code: 'LYD', symbol: 'LD', label: 'Libyan Dinar' },
  { code: 'MRU', symbol: 'UM', label: 'Mauritanian Ouguiya' },
  { code: 'OMR', symbol: 'OMR', label: 'Omani Rial' },
  { code: 'SOS', symbol: 'Sh', label: 'Somali Shilling' },
  { code: 'SDG', symbol: 'SDG', label: 'Sudanese Pound' },
  { code: 'SYP', symbol: 'SP', label: 'Syrian Pound' },
  { code: 'TND', symbol: 'DT', label: 'Tunisian Dinar' },
  { code: 'YER', symbol: 'YR', label: 'Yemeni Rial' },
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
//
// roundTo/threshold/spread values are display-rounding heuristics scaled to
// each currency's rough order of magnitude for a used-car price — the AI
// determines the actual estimate; these just keep the rounding sane.
export interface ValuationCountry {
  code: string;          // ISO 3166-1 alpha-2, also used as SerpAPI `gl`
  name: string;
  flag: string;
  currency: CurrencyCode;
  roundTo: number;
  lowThreshold: number;
  midThreshold: number;
  minSpreadLow: number;
  minSpreadMid: number;
  minSpreadHigh: number;
}

export const VALUATION_COUNTRIES: ValuationCountry[] = [
  // ── Africa ──
  { code: 'ng', name: 'Nigeria',        flag: '🇳🇬', currency: 'NGN', roundTo: 50_000,    lowThreshold: 2_000_000,   midThreshold: 5_000_000,    minSpreadLow: 500_000,    minSpreadMid: 1_000_000,  minSpreadHigh: 1_500_000 },
  { code: 'za', name: 'South Africa',   flag: '🇿🇦', currency: 'ZAR', roundTo: 5_000,     lowThreshold: 40_000,      midThreshold: 120_000,      minSpreadLow: 8_000,      minSpreadMid: 18_000,     minSpreadHigh: 28_000 },
  { code: 'ke', name: 'Kenya',          flag: '🇰🇪', currency: 'KES', roundTo: 10_000,    lowThreshold: 450_000,     midThreshold: 1_500_000,    minSpreadLow: 90_000,     minSpreadMid: 180_000,    minSpreadHigh: 300_000 },
  { code: 'gh', name: 'Ghana',          flag: '🇬🇭', currency: 'GHS', roundTo: 1_000,     lowThreshold: 45_000,      midThreshold: 150_000,      minSpreadLow: 9_000,      minSpreadMid: 18_000,     minSpreadHigh: 30_000 },
  { code: 'eg', name: 'Egypt',          flag: '🇪🇬', currency: 'EGP', roundTo: 2_000,     lowThreshold: 150_000,     midThreshold: 500_000,      minSpreadLow: 30_000,     minSpreadMid: 60_000,     minSpreadHigh: 100_000 },
  { code: 'ma', name: 'Morocco',        flag: '🇲🇦', currency: 'MAD', roundTo: 500,       lowThreshold: 30_000,      midThreshold: 100_000,      minSpreadLow: 6_000,      minSpreadMid: 12_000,     minSpreadHigh: 20_000 },
  { code: 'ug', name: 'Uganda',         flag: '🇺🇬', currency: 'UGX', roundTo: 500_000,   lowThreshold: 11_000_000,  midThreshold: 37_000_000,   minSpreadLow: 2_000_000,  minSpreadMid: 4_500_000,  minSpreadHigh: 7_500_000 },
  { code: 'tz', name: 'Tanzania',       flag: '🇹🇿', currency: 'TZS', roundTo: 300_000,   lowThreshold: 7_500_000,   midThreshold: 25_000_000,   minSpreadLow: 1_500_000,  minSpreadMid: 3_000_000,  minSpreadHigh: 5_000_000 },
  // ── Arabic-speaking (Arab League) — Africa ──
  { code: 'dz', name: 'Algeria',        flag: '🇩🇿', currency: 'DZD', roundTo: 10_000,    lowThreshold: 400_000,     midThreshold: 1_350_000,    minSpreadLow: 80_000,     minSpreadMid: 160_000,    minSpreadHigh: 270_000 },
  { code: 'tn', name: 'Tunisia',        flag: '🇹🇳', currency: 'TND', roundTo: 200,       lowThreshold: 9_300,       midThreshold: 31_000,       minSpreadLow: 1_850,      minSpreadMid: 3_700,      minSpreadHigh: 6_200 },
  { code: 'ly', name: 'Libya',          flag: '🇱🇾', currency: 'LYD', roundTo: 250,       lowThreshold: 14_500,      midThreshold: 48_500,       minSpreadLow: 2_900,      minSpreadMid: 5_800,      minSpreadHigh: 9_700 },
  { code: 'sd', name: 'Sudan',          flag: '🇸🇩', currency: 'SDG', roundTo: 50_000,    lowThreshold: 1_800_000,   midThreshold: 6_000_000,    minSpreadLow: 360_000,    minSpreadMid: 720_000,    minSpreadHigh: 1_200_000 },
  { code: 'so', name: 'Somalia',        flag: '🇸🇴', currency: 'SOS', roundTo: 50_000,    lowThreshold: 1_710_000,   midThreshold: 5_700_000,    minSpreadLow: 340_000,    minSpreadMid: 680_000,    minSpreadHigh: 1_140_000 },
  { code: 'dj', name: 'Djibouti',       flag: '🇩🇯', currency: 'DJF', roundTo: 10_000,    lowThreshold: 530_000,     midThreshold: 1_780_000,    minSpreadLow: 105_000,    minSpreadMid: 210_000,    minSpreadHigh: 355_000 },
  { code: 'km', name: 'Comoros',        flag: '🇰🇲', currency: 'KMF', roundTo: 50_000,    lowThreshold: 1_350_000,   midThreshold: 4_500_000,    minSpreadLow: 270_000,    minSpreadMid: 540_000,    minSpreadHigh: 900_000 },
  { code: 'mr', name: 'Mauritania',     flag: '🇲🇷', currency: 'MRU', roundTo: 2_000,     lowThreshold: 120_000,     midThreshold: 400_000,      minSpreadLow: 24_000,     minSpreadMid: 48_000,     minSpreadHigh: 80_000 },
  // ── North America ──
  { code: 'us', name: 'United States',  flag: '🇺🇸', currency: 'USD', roundTo: 100,       lowThreshold: 3_000,       midThreshold: 10_000,       minSpreadLow: 600,        minSpreadMid: 1_200,      minSpreadHigh: 2_000 },
  { code: 'ca', name: 'Canada',         flag: '🇨🇦', currency: 'CAD', roundTo: 100,       lowThreshold: 3_500,       midThreshold: 12_000,       minSpreadLow: 700,        minSpreadMid: 1_400,      minSpreadHigh: 2_200 },
  { code: 'mx', name: 'Mexico',         flag: '🇲🇽', currency: 'MXN', roundTo: 1_000,     lowThreshold: 54_000,      midThreshold: 180_000,      minSpreadLow: 11_000,     minSpreadMid: 22_000,     minSpreadHigh: 36_000 },
  // ── Europe ──
  { code: 'gb', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'de', name: 'Germany',        flag: '🇩🇪', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'fr', name: 'France',         flag: '🇫🇷', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'it', name: 'Italy',          flag: '🇮🇹', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'es', name: 'Spain',          flag: '🇪🇸', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'nl', name: 'Netherlands',    flag: '🇳🇱', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'be', name: 'Belgium',        flag: '🇧🇪', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'ie', name: 'Ireland',        flag: '🇮🇪', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'pt', name: 'Portugal',       flag: '🇵🇹', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'at', name: 'Austria',        flag: '🇦🇹', currency: 'EUR', roundTo: 100,       lowThreshold: 2_500,       midThreshold: 8_000,        minSpreadLow: 500,        minSpreadMid: 1_000,      minSpreadHigh: 1_600 },
  { code: 'ch', name: 'Switzerland',    flag: '🇨🇭', currency: 'CHF', roundTo: 100,       lowThreshold: 3_000,       midThreshold: 10_000,       minSpreadLow: 600,        minSpreadMid: 1_200,      minSpreadHigh: 2_000 },
  { code: 'se', name: 'Sweden',         flag: '🇸🇪', currency: 'SEK', roundTo: 1_000,     lowThreshold: 30_000,      midThreshold: 100_000,      minSpreadLow: 6_000,      minSpreadMid: 12_000,     minSpreadHigh: 20_000 },
  { code: 'no', name: 'Norway',         flag: '🇳🇴', currency: 'NOK', roundTo: 1_000,     lowThreshold: 30_000,      midThreshold: 100_000,      minSpreadLow: 6_000,      minSpreadMid: 12_000,     minSpreadHigh: 20_000 },
  { code: 'dk', name: 'Denmark',        flag: '🇩🇰', currency: 'DKK', roundTo: 500,       lowThreshold: 20_000,      midThreshold: 70_000,       minSpreadLow: 4_000,      minSpreadMid: 8_000,      minSpreadHigh: 14_000 },
  { code: 'pl', name: 'Poland',         flag: '🇵🇱', currency: 'PLN', roundTo: 500,       lowThreshold: 12_000,      midThreshold: 40_000,       minSpreadLow: 2_500,      minSpreadMid: 5_000,      minSpreadHigh: 8_000 },
  // ── Middle East ──
  { code: 'ae', name: 'UAE',            flag: '🇦🇪', currency: 'AED', roundTo: 500,       lowThreshold: 12_000,      midThreshold: 35_000,       minSpreadLow: 2_000,      minSpreadMid: 4_500,      minSpreadHigh: 7_000 },
  { code: 'sa', name: 'Saudi Arabia',   flag: '🇸🇦', currency: 'SAR', roundTo: 500,       lowThreshold: 11_000,      midThreshold: 37_000,       minSpreadLow: 2_200,      minSpreadMid: 4_500,      minSpreadHigh: 7_500 },
  { code: 'qa', name: 'Qatar',          flag: '🇶🇦', currency: 'QAR', roundTo: 500,       lowThreshold: 11_000,      midThreshold: 36_000,       minSpreadLow: 2_200,      minSpreadMid: 4_400,      minSpreadHigh: 7_300 },
  { code: 'kw', name: 'Kuwait',         flag: '🇰🇼', currency: 'KWD', roundTo: 50,        lowThreshold: 900,         midThreshold: 3_000,        minSpreadLow: 180,        minSpreadMid: 360,        minSpreadHigh: 600 },
  { code: 'il', name: 'Israel',         flag: '🇮🇱', currency: 'ILS', roundTo: 100,       lowThreshold: 11_000,      midThreshold: 37_000,       minSpreadLow: 2_200,      minSpreadMid: 4_400,      minSpreadHigh: 7_300 },
  { code: 'tr', name: 'Turkey',         flag: '🇹🇷', currency: 'TRY', roundTo: 5_000,     lowThreshold: 100_000,     midThreshold: 350_000,      minSpreadLow: 20_000,     minSpreadMid: 40_000,     minSpreadHigh: 70_000 },
  // ── Arabic-speaking (Arab League) — Middle East ──
  { code: 'iq', name: 'Iraq',           flag: '🇮🇶', currency: 'IQD', roundTo: 100_000,   lowThreshold: 3_900_000,   midThreshold: 13_100_000,   minSpreadLow: 780_000,    minSpreadMid: 1_550_000,  minSpreadHigh: 2_600_000 },
  { code: 'jo', name: 'Jordan',         flag: '🇯🇴', currency: 'JOD', roundTo: 50,        lowThreshold: 2_100,       midThreshold: 7_000,        minSpreadLow: 420,        minSpreadMid: 850,        minSpreadHigh: 1_400 },
  { code: 'lb', name: 'Lebanon',        flag: '🇱🇧', currency: 'LBP', roundTo: 1_000_000, lowThreshold: 267_000_000, midThreshold: 890_000_000,  minSpreadLow: 53_000_000, minSpreadMid: 106_000_000, minSpreadHigh: 178_000_000 },
  { code: 'sy', name: 'Syria',          flag: '🇸🇾', currency: 'SYP', roundTo: 1_000_000, lowThreshold: 39_000_000,  midThreshold: 130_000_000,  minSpreadLow: 7_800_000,  minSpreadMid: 15_600_000, minSpreadHigh: 26_000_000 },
  { code: 'ye', name: 'Yemen',          flag: '🇾🇪', currency: 'YER', roundTo: 100_000,   lowThreshold: 5_100_000,   midThreshold: 17_000_000,   minSpreadLow: 1_000_000,  minSpreadMid: 2_000_000,  minSpreadHigh: 3_400_000 },
  { code: 'om', name: 'Oman',           flag: '🇴🇲', currency: 'OMR', roundTo: 50,        lowThreshold: 1_150,       midThreshold: 3_850,        minSpreadLow: 230,        minSpreadMid: 460,        minSpreadHigh: 770 },
  { code: 'bh', name: 'Bahrain',        flag: '🇧🇭', currency: 'BHD', roundTo: 50,        lowThreshold: 1_100,       midThreshold: 3_800,        minSpreadLow: 220,        minSpreadMid: 450,        minSpreadHigh: 750 },
  { code: 'ps', name: 'Palestine',      flag: '🇵🇸', currency: 'ILS', roundTo: 100,       lowThreshold: 11_000,      midThreshold: 37_000,       minSpreadLow: 2_200,      minSpreadMid: 4_400,      minSpreadHigh: 7_300 },
  // ── Asia-Pacific ──
  { code: 'in', name: 'India',          flag: '🇮🇳', currency: 'INR', roundTo: 10_000,    lowThreshold: 300_000,     midThreshold: 800_000,      minSpreadLow: 60_000,     minSpreadMid: 130_000,    minSpreadHigh: 200_000 },
  { code: 'pk', name: 'Pakistan',       flag: '🇵🇰', currency: 'PKR', roundTo: 20_000,    lowThreshold: 840_000,     midThreshold: 2_800_000,    minSpreadLow: 170_000,    minSpreadMid: 340_000,    minSpreadHigh: 560_000 },
  { code: 'bd', name: 'Bangladesh',     flag: '🇧🇩', currency: 'BDT', roundTo: 10_000,    lowThreshold: 360_000,     midThreshold: 1_200_000,    minSpreadLow: 72_000,     minSpreadMid: 144_000,    minSpreadHigh: 240_000 },
  { code: 'jp', name: 'Japan',          flag: '🇯🇵', currency: 'JPY', roundTo: 10_000,    lowThreshold: 450_000,     midThreshold: 1_500_000,    minSpreadLow: 90_000,     minSpreadMid: 180_000,    minSpreadHigh: 300_000 },
  { code: 'kr', name: 'South Korea',    flag: '🇰🇷', currency: 'KRW', roundTo: 100_000,   lowThreshold: 4_000_000,   midThreshold: 14_000_000,   minSpreadLow: 800_000,    minSpreadMid: 1_600_000,  minSpreadHigh: 2_600_000 },
  { code: 'cn', name: 'China',          flag: '🇨🇳', currency: 'CNY', roundTo: 1_000,     lowThreshold: 22_000,      midThreshold: 70_000,       minSpreadLow: 4_500,      minSpreadMid: 9_000,      minSpreadHigh: 15_000 },
  { code: 'sg', name: 'Singapore',      flag: '🇸🇬', currency: 'SGD', roundTo: 100,       lowThreshold: 4_000,       midThreshold: 13_000,       minSpreadLow: 800,        minSpreadMid: 1_600,      minSpreadHigh: 2_600 },
  { code: 'my', name: 'Malaysia',       flag: '🇲🇾', currency: 'MYR', roundTo: 500,       lowThreshold: 14_000,      midThreshold: 47_000,       minSpreadLow: 2_800,      minSpreadMid: 5_600,      minSpreadHigh: 9_400 },
  { code: 'id', name: 'Indonesia',      flag: '🇮🇩', currency: 'IDR', roundTo: 1_000_000, lowThreshold: 47_000_000,  midThreshold: 158_000_000,  minSpreadLow: 9_000_000,  minSpreadMid: 19_000_000, minSpreadHigh: 32_000_000 },
  { code: 'ph', name: 'Philippines',    flag: '🇵🇭', currency: 'PHP', roundTo: 2_000,     lowThreshold: 170_000,     midThreshold: 560_000,      minSpreadLow: 34_000,     minSpreadMid: 67_000,     minSpreadHigh: 112_000 },
  { code: 'vn', name: 'Vietnam',        flag: '🇻🇳', currency: 'VND', roundTo: 1_000_000, lowThreshold: 75_000_000,  midThreshold: 250_000_000,  minSpreadLow: 15_000_000, minSpreadMid: 30_000_000, minSpreadHigh: 50_000_000 },
  { code: 'th', name: 'Thailand',       flag: '🇹🇭', currency: 'THB', roundTo: 1_000,     lowThreshold: 105_000,     midThreshold: 350_000,      minSpreadLow: 21_000,     minSpreadMid: 42_000,     minSpreadHigh: 70_000 },
  { code: 'au', name: 'Australia',      flag: '🇦🇺', currency: 'AUD', roundTo: 100,       lowThreshold: 4_000,       midThreshold: 13_000,       minSpreadLow: 800,        minSpreadMid: 1_600,      minSpreadHigh: 2_500 },
  { code: 'nz', name: 'New Zealand',    flag: '🇳🇿', currency: 'NZD', roundTo: 100,       lowThreshold: 5_000,       midThreshold: 16_000,       minSpreadLow: 1_000,      minSpreadMid: 2_000,      minSpreadHigh: 3_200 },
  // ── Latin America ──
  { code: 'br', name: 'Brazil',         flag: '🇧🇷', currency: 'BRL', roundTo: 500,       lowThreshold: 16_500,      midThreshold: 55_000,       minSpreadLow: 3_300,      minSpreadMid: 6_600,      minSpreadHigh: 11_000 },
  { code: 'ar', name: 'Argentina',      flag: '🇦🇷', currency: 'ARS', roundTo: 50_000,    lowThreshold: 3_000_000,   midThreshold: 10_000_000,   minSpreadLow: 600_000,    minSpreadMid: 1_200_000,  minSpreadHigh: 2_000_000 },
  { code: 'co', name: 'Colombia',       flag: '🇨🇴', currency: 'COP', roundTo: 200_000,   lowThreshold: 12_000_000,  midThreshold: 40_000_000,   minSpreadLow: 2_400_000,  minSpreadMid: 4_800_000,  minSpreadHigh: 8_000_000 },
  { code: 'cl', name: 'Chile',          flag: '🇨🇱', currency: 'CLP', roundTo: 50_000,    lowThreshold: 2_850_000,   midThreshold: 9_500_000,    minSpreadLow: 570_000,    minSpreadMid: 1_140_000,  minSpreadHigh: 1_900_000 },
];

export function getValuationCountry(code: string | undefined): ValuationCountry {
  return VALUATION_COUNTRIES.find(c => c.code === code) ?? VALUATION_COUNTRIES[0];
}
