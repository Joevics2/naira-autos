// Pure calculation engine for the Ethiopia car import calculator.
// Since January 2024 Ethiopia bans imports of internal-combustion, hybrid and plug-in hybrid vehicles
// (including fuel-powered SKD/CKD kits). Only pure battery-electric vehicles (BEV), left-hand drive, can be imported.
// BEV tax stack (CIF basis): customs duty 20% (CBU), 5% (SKD), 0% (CKD); 3% withholding tax;
// VAT 15%, excise (5-100%) and 10% surtax are waived for BEVs.

export type EtPowertrain = 'bev' | 'other';
export type EtAssembly = 'cbu' | 'skd' | 'ckd';

export const DUTY_PCT: Record<EtAssembly, number> = { cbu: 20, skd: 5, ckd: 0 };
export const WITHHOLDING_PCT = 3;
export const PLATE_FEE_ETB = 44500;

export interface EtInput {
  powertrain: EtPowertrain;
  assembly: EtAssembly;
  leftHandDrive: boolean;
  priceUSD: number;
  freightUSD: number;
  insuranceUSD: number;
  localFeesUSD: number;     // clearance, port, inland transport, broker
  includePlates: boolean;
  etbPerUSD: number;
}

export interface EtLine { key: string; label: string; pct?: number; usd: number }
export interface EtResult {
  allowed: boolean; reason: string | null; cifUSD: number; dutyPct: number; duty: number; withholding: number;
  taxesUSD: number; platesUSD: number; landedUSD: number; effectivePct: number; lines: EtLine[];
}

export function calcEt(i: EtInput): EtResult {
  const cif = Math.max(0, i.priceUSD) + Math.max(0, i.freightUSD) + Math.max(0, i.insuranceUSD);
  let allowed = true;
  let reason: string | null = null;
  if (i.powertrain !== 'bev') {
    allowed = false;
    reason = 'Petrol, diesel, hybrid and plug-in hybrid vehicles, including fuel-powered kits, cannot be imported into Ethiopia. Only pure battery-electric vehicles are allowed.';
  } else if (!i.leftHandDrive) {
    allowed = false;
    reason = 'Right-hand-drive vehicles are not allowed. The car must be left-hand drive.';
  }
  const dutyPct = DUTY_PCT[i.assembly];
  const duty = allowed ? (cif * dutyPct) / 100 : 0;
  const withholding = allowed ? (cif * WITHHOLDING_PCT) / 100 : 0;
  const taxesUSD = duty + withholding;
  const platesUSD = i.includePlates && i.etbPerUSD > 0 ? PLATE_FEE_ETB / i.etbPerUSD : 0;
  const landedUSD = allowed ? cif + taxesUSD + Math.max(0, i.localFeesUSD) + platesUSD : 0;
  const lines: EtLine[] = [
    { key: 'duty', label: 'Customs duty', pct: dutyPct, usd: duty },
    { key: 'wht', label: 'Withholding tax', pct: WITHHOLDING_PCT, usd: withholding },
  ];
  return { allowed, reason, cifUSD: cif, dutyPct, duty, withholding, taxesUSD, platesUSD, landedUSD, effectivePct: cif > 0 ? (taxesUSD / cif) * 100 : 0, lines };
}
