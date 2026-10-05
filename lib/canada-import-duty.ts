// Pure calculation engine for the Canada car import duty calculator (personal / casual imports).
//
// Sources (verified Oct 2026): CBSA "Canadian tariffs on US steel, aluminum and auto imports" page and
// Customs Notice 26-23 (US Surtax Order 2026, effective 8 Sep 2026): 25% surtax on 85% of value for duty for
// US-origin vehicles imported by individuals; GST (5%) is charged on value + duty + surtax + excise.
// Customs Tariff, Chapter 87: MFN 6.1% on passenger vehicles; free for US/Mexico (CUSMA), and for
// Japan (CPTPP), South Korea (CKFTA), EU (CETA) and UK origin with proof of origin.
// Chinese EVs: 6.1% inside the 49,000-vehicle quota (permit required), 100% surtax outside it.
// Luxury tax (Select Luxury Items Tax Act): lesser of 10% of taxable amount or 20% of the amount over $100,000.
// Green Levy ($1,000-$4,000 at 13 L/100 km and above) and A/C excise ($100) per CBSA Memorandum D18-4-1.
// RIV fee C$325 + GST for vehicles under 15 years old; 15-year rule counts from month of manufacture.

export type CaOrigin = 'us' | 'mx' | 'jp' | 'kr' | 'eu' | 'uk' | 'cn' | 'other';

export const MFN_DUTY_PCT = 6.1;
export const US_SURTAX_PCT = 25;
export const US_SURTAX_BASE_PCT = 85;     // CBSA: 15% deemed Canadian/Mexican content for personal imports
export const GST_PCT = 5;
export const RIV_FEE = 325;
export const AC_EXCISE = 100;
export const LUXURY_THRESHOLD = 100000;
export const FIFTEEN_YEAR_MONTHS = 180;
export const CHINA_EV_SURTAX_PCT = 100;

export interface CaInput {
  origin: CaOrigin;
  vfdCAD: number;               // value for duty in CAD (price paid; freight after the place of direct shipment excluded)
  monthsSinceManufacture: number;
  hasAC: boolean;
  fuelL100: number;             // combined fuel consumption L/100 km, 0 = not applicable
  provincialPct: number;        // provincial sales tax / provincial part of HST, % (paid at registration)
  hasProofOfOrigin: boolean;    // JP/KR/EU/UK only
  chinaElectrified: boolean;    // CN only: EV or plug-in hybrid
  chinaInQuota: boolean;        // CN only
  extrasCAD: number;            // inspection, modifications, broker, etc. (optional)
}

export interface CaLine { key: string; label: string; pct?: number; amount: number }

export interface CaResult {
  dutyPct: number;
  duty: number;
  surtax: number;
  surtaxBase: number;
  ac: number;
  greenLevy: number;
  luxury: number;
  luxuryTaxable: number;
  gstBase: number;
  gst: number;
  rivRequired: boolean;
  riv: number;
  rivGst: number;
  provincial: number;
  federalAtBorder: number;
  totalTaxesAndFees: number;
  totalLanded: number;
  effectivePct: number;
  lines: CaLine[];
  notes: string[];
}

export function greenLevyFor(l100: number): number {
  if (l100 >= 16) return 4000;
  if (l100 >= 15) return 3000;
  if (l100 >= 14) return 2000;
  if (l100 >= 13) return 1000;
  return 0;
}

export function calcCanada(i: CaInput): CaResult {
  const v = Math.max(0, i.vfdCAD);
  const notes: string[] = [];

  let dutyPct = MFN_DUTY_PCT;
  let extraSurtaxPct = 0;
  switch (i.origin) {
    case 'us': case 'mx': dutyPct = 0; notes.push('US- and Mexico-built vehicles are duty-free under CUSMA; origin is read from the VIN.'); break;
    case 'jp': case 'kr': case 'eu': case 'uk':
      dutyPct = i.hasProofOfOrigin ? 0 : MFN_DUTY_PCT;
      if (!i.hasProofOfOrigin) notes.push('Without a valid proof of origin the 6.1% MFN rate applies.');
      break;
    case 'cn':
      if (i.chinaElectrified) {
        if (i.chinaInQuota) notes.push('Inside the Chinese EV quota: 6.1% MFN duty (import permit required).');
        else { extraSurtaxPct = CHINA_EV_SURTAX_PCT; notes.push('Outside the quota the 100% surtax on Chinese EVs applies.'); }
      }
      break;
    default: break;
  }

  const duty = (v * dutyPct) / 100;
  const surtaxBase = i.origin === 'us' ? (v * US_SURTAX_BASE_PCT) / 100 : 0;
  const usSurtax = (surtaxBase * US_SURTAX_PCT) / 100;
  const cnSurtax = (v * extraSurtaxPct) / 100;
  const surtax = usSurtax + cnSurtax;
  if (i.origin === 'us') notes.push('US-built: 25% surtax on 85% of value for duty (CBSA, personal imports).');

  const ac = i.hasAC ? AC_EXCISE : 0;
  const greenLevy = greenLevyFor(i.fuelL100);

  const luxuryTaxable = v + duty + surtax + ac + greenLevy;
  const luxury = luxuryTaxable > LUXURY_THRESHOLD
    ? Math.min(luxuryTaxable * 0.1, (luxuryTaxable - LUXURY_THRESHOLD) * 0.2)
    : 0;

  const gstBase = v + duty + surtax + ac + greenLevy + luxury;
  const gst = (gstBase * GST_PCT) / 100;

  const rivRequired = i.monthsSinceManufacture < FIFTEEN_YEAR_MONTHS;
  const riv = rivRequired ? RIV_FEE : 0;
  const rivGst = (riv * GST_PCT) / 100;
  const provincial = (v * Math.max(0, i.provincialPct)) / 100;

  const federalAtBorder = duty + surtax + ac + greenLevy + luxury + gst;
  const totalTaxesAndFees = federalAtBorder + riv + rivGst + provincial;
  const totalLanded = v + totalTaxesAndFees + Math.max(0, i.extrasCAD);

  const lines: CaLine[] = [];
  lines.push({ key: 'duty', label: 'Customs duty', pct: dutyPct, amount: duty });
  if (surtax > 0) lines.push({ key: 'surtax', label: i.origin === 'us' ? 'US counter-tariff surtax (25% on 85%)' : 'Chinese EV surtax', amount: surtax });
  if (ac > 0) lines.push({ key: 'ac', label: 'Air conditioning excise tax', amount: ac });
  if (greenLevy > 0) lines.push({ key: 'green', label: 'Green Levy (fuel-inefficient)', amount: greenLevy });
  if (luxury > 0) lines.push({ key: 'lux', label: 'Federal luxury tax', amount: luxury });
  lines.push({ key: 'gst', label: 'GST', pct: GST_PCT, amount: gst });

  return {
    dutyPct, duty, surtax, surtaxBase, ac, greenLevy, luxury, luxuryTaxable, gstBase, gst, rivRequired, riv, rivGst,
    provincial, federalAtBorder, totalTaxesAndFees, totalLanded,
    effectivePct: v > 0 ? (totalTaxesAndFees / v) * 100 : 0, lines, notes,
  };
}
