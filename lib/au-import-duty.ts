// Pure calculation engine for the Australia car import calculator.
// Customs duty = FOB customs value x rate (5% general; 0% under an FTA with proof of origin; 0% for vehicles 30+ years old).
// VoTI (value of taxable importation) = FOB + duty + international freight + insurance. GST = 10% of VoTI.
// Luxury Car Tax (ATO, imports): (LCT value - threshold) x 10/11 x 33%, where LCT value = VoTI + GST.
// 2026-27 thresholds: A$80,809 standard, A$91,661 fuel-efficient (3.5 L/100 km or less).

export type AuOrigin = 'jp' | 'kr' | 'th' | 'us' | 'uk' | 'cn' | 'cptpp' | 'eu' | 'other';

export const GENERAL_DUTY_PCT = 5;
export const GST_PCT = 10;
export const LCT_RATE = 0.33;
export const LCT_THRESHOLD = 80809;
export const LCT_THRESHOLD_EFFICIENT = 91661;
export const DUTY_FREE_AGE = 30;
export const RULE_25_AGE = 25;

export interface AuInput {
  origin: AuOrigin;
  hasProof: boolean;          // valid proof of origin for the FTA
  mfgYear: number;
  importYear: number;
  fobAUD: number;
  freightAUD: number;
  insuranceAUD: number;
  fuelEfficient: boolean;     // 3.5 L/100 km or less
  otherCostsAUD: number;      // compliance, VIA, broker, registration (not taxed here)
}

export interface AuLine { key: string; label: string; pct?: number; amount: number }
export interface AuResult {
  dutyPct: number; duty: number; voti: number; gst: number; lctValue: number; lctThreshold: number; lct: number;
  taxes: number; landed: number; effectivePct: number; age: number; dutyFreeAge: boolean; rule25: boolean;
  lines: AuLine[]; notes: string[];
}

export const FTA_ORIGINS: AuOrigin[] = ['jp', 'kr', 'th', 'us', 'uk', 'cn', 'cptpp'];

export function calcAu(i: AuInput): AuResult {
  const notes: string[] = [];
  const age = i.importYear - i.mfgYear;
  const dutyFreeAge = age >= DUTY_FREE_AGE;
  const rule25 = age >= RULE_25_AGE;
  const fob = Math.max(0, i.fobAUD);
  const freight = Math.max(0, i.freightAUD);
  const ins = Math.max(0, i.insuranceAUD);

  let dutyPct = GENERAL_DUTY_PCT;
  if (dutyFreeAge) { dutyPct = 0; notes.push('Vehicles 30 or more years old are exempt from customs duty (GST still applies).'); }
  else if (FTA_ORIGINS.includes(i.origin) && i.hasProof) { dutyPct = 0; notes.push('Free trade agreement: 0% duty with a valid proof of origin.'); }
  else if (FTA_ORIGINS.includes(i.origin) && !i.hasProof) notes.push('Without a valid proof of origin the general 5% duty applies.');
  if (i.origin === 'eu' && !dutyFreeAge) notes.push('The Australia–EU agreement (concluded March 2026) is not yet in force, so the 5% duty still applies.');

  const duty = (fob * dutyPct) / 100;
  const voti = fob + duty + freight + ins;
  const gst = (voti * GST_PCT) / 100;
  const lctValue = voti + gst;
  const lctThreshold = i.fuelEfficient ? LCT_THRESHOLD_EFFICIENT : LCT_THRESHOLD;
  const lct = lctValue > lctThreshold ? ((lctValue - lctThreshold) * 10 / 11) * LCT_RATE : 0;
  const taxes = duty + gst + lct;
  const landed = fob + freight + ins + taxes + Math.max(0, i.otherCostsAUD);

  const lines: AuLine[] = [
    { key: 'duty', label: 'Customs duty', pct: dutyPct, amount: duty },
    { key: 'gst', label: 'GST', pct: GST_PCT, amount: gst },
  ];
  if (lct > 0) lines.push({ key: 'lct', label: 'Luxury Car Tax', pct: 33, amount: lct });

  return { dutyPct, duty, voti, gst, lctValue, lctThreshold, lct, taxes, landed, effectivePct: fob > 0 ? (taxes / fob) * 100 : 0, age, dutyFreeAge, rule25, lines, notes };
}
