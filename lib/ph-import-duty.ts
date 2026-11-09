// Pure calculation engine for the Philippines car import calculator.
// Customs duty (CMTA, BOC rates) on dutiable value; automobile excise tax (NIRC s.149 as amended by TRAIN,
// RR 5-2018) on landed cost = dutiable value + duty + customs charges; VAT 12% on landed cost + excise.
// Used cars are banned except under the No-Dollar Importation programme (EO 156 / EO 877-A), where the BOC
// depreciation table (CAO 07-2014) lowers the dutiable value.

export type PhCondition = 'new' | 'used-ndi';
export type PhSeats = 'upto9' | '10plus';
export type PhOrigin = 'mfn' | 'asean';
export type PhPowertrain = 'ice' | 'hev' | 'phev' | 'bev';

export const DUTY_9_PCT = 30;
export const DUTY_10_PCT = 20;
export const VAT_PCT = 12;
export const CDS_PHP = 100;
export const DST_PHP = 30;

/** Import Processing Charge by dutiable value in PHP (CAO 02-2025 schedule). */
export function importProcessingCharge(dv: number): number {
  if (dv <= 25000) return 250;
  if (dv <= 50000) return 500;
  if (dv <= 250000) return 750;
  if (dv <= 500000) return 1000;
  if (dv <= 750000) return 1500;
  return 2000;
}

/** TRAIN excise schedule: flat rate by bracket of net price / landed cost. */
export function exciseRatePct(base: number): number {
  if (base <= 600000) return 4;
  if (base <= 1000000) return 10;
  if (base <= 4000000) return 20;
  return 50;
}

/** BOC depreciation table for used cars under the No-Dollar Importation programme (CAO 07-2014). */
export function ndiDepreciationPct(modelAge: number): number {
  const age = Math.max(0, Math.floor(modelAge));
  return Math.min(50, age * 10);
}

export interface PhInput {
  condition: PhCondition;
  seats: PhSeats;
  origin: PhOrigin;
  powertrain: PhPowertrain;
  isPickup: boolean;
  dutyOverridePct: number | null; // user-entered preferential rate (other FTAs), null = none
  priceUSD: number;               // purchase price in USD
  freightUSD: number;             // freight + insurance in USD
  usdToPhp: number;
  modelAge: number;               // years, used only for NDI
  otherChargesPHP: number;        // arrastre, wharfage, brokerage, LTO etc. (not taxed here)
}

export interface PhLine { key: string; label: string; pct?: number; amount: number }
export interface PhResult {
  cifPHP: number; depreciationPct: number; dutiableValue: number; dutyPct: number; duty: number; fees: number;
  landedCost: number; excisePct: number; excise: number; vatBase: number; vat: number; taxesTotal: number;
  totalPHP: number; totalUSD: number; taxesPctOfCif: number; lines: PhLine[]; notes: string[];
}

export function dutyRatePct(i: Pick<PhInput, 'seats' | 'origin' | 'powertrain' | 'dutyOverridePct'>): number {
  if (i.dutyOverridePct != null && i.dutyOverridePct >= 0) return i.dutyOverridePct;
  if (i.origin === 'asean') return 0;
  if (i.powertrain !== 'ice') return 0;
  return i.seats === 'upto9' ? DUTY_9_PCT : DUTY_10_PCT;
}

export function calcPh(i: PhInput): PhResult {
  const notes: string[] = [];
  const cifPHP = Math.max(0, i.priceUSD + i.freightUSD) * i.usdToPhp;
  const depreciationPct = i.condition === 'used-ndi' ? ndiDepreciationPct(i.modelAge) : 0;
  const dutiableValue = cifPHP * (1 - depreciationPct / 100);
  if (i.condition === 'used-ndi') notes.push('Used cars can only enter under the No-Dollar Importation programme, with a DTI Certificate of Authority to Import. The BOC depreciation table lowers the dutiable value by 10% per model year, up to 50%.');

  const dutyPct = dutyRatePct(i);
  const duty = (dutiableValue * dutyPct) / 100;
  if (i.dutyOverridePct != null && i.dutyOverridePct >= 0) notes.push('Duty uses the preferential rate you entered. Confirm it for your tariff line and certificate of origin.');
  else if (i.origin === 'asean') notes.push('ASEAN-origin cars with a Form D (at least 40% regional value content) enter at 0% duty under ATIGA.');
  else if (i.powertrain === 'bev') notes.push('Battery-electric cars pay 0% duty until 31 January 2028 under EO 12 and EO 62; the rate snaps back afterwards unless extended.');
  else if (i.powertrain !== 'ice') notes.push('Hybrid and plug-in hybrid cars are covered by the 0% duty extension of EO 12 as expanded in 2024. One source lists selected plug-in hybrids at 5%, so confirm the tariff line or override the rate.');

  const fees = importProcessingCharge(dutiableValue) + CDS_PHP + DST_PHP;
  const landedCost = dutiableValue + duty + fees;

  let excisePct = exciseRatePct(landedCost);
  let exemptReason = '';
  if (i.powertrain === 'bev') { excisePct = 0; exemptReason = 'Battery-electric cars are exempt from the automobile excise tax.'; }
  else if (i.isPickup) { excisePct = 0; exemptReason = 'Pickup trucks are exempt from the automobile excise tax.'; }
  else if (i.powertrain === 'hev' || i.powertrain === 'phev') { excisePct = excisePct / 2; exemptReason = 'Hybrid cars pay 50% of the applicable excise rate, subject to the BIR conditions.'; }
  if (exemptReason) notes.push(exemptReason);
  const excise = (landedCost * excisePct) / 100;

  const vatBase = landedCost + excise;
  const vat = (vatBase * VAT_PCT) / 100;
  const taxesTotal = duty + fees + excise + vat;
  const totalPHP = cifPHP + duty + fees + excise + vat + Math.max(0, i.otherChargesPHP);
  const totalUSD = i.usdToPhp > 0 ? totalPHP / i.usdToPhp : 0;
  const taxesPctOfCif = cifPHP > 0 ? (taxesTotal / cifPHP) * 100 : 0;

  const lines: PhLine[] = [
    { key: 'duty', label: 'Customs duty', pct: dutyPct, amount: duty },
    { key: 'fees', label: 'BOC processing and stamp fees', amount: fees },
    { key: 'excise', label: 'Automobile excise tax', pct: excisePct, amount: excise },
    { key: 'vat', label: 'VAT on landed cost + excise', pct: VAT_PCT, amount: vat },
  ];
  return { cifPHP, depreciationPct, dutiableValue, dutyPct, duty, fees, landedCost, excisePct, excise, vatBase, vat, taxesTotal, totalPHP, totalUSD, taxesPctOfCif, lines, notes };
}
