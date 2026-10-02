// Pure calculation engine for the India car import duty calculators (EN + HI).
//
// Rates reflect Union Budget 2025 customs notification changes (w.e.f. 2 Feb 2025,
// Notification 50/2017-Customs as amended; AIDC under Notification 11/2021) and
// GST 2.0 (22 Sep 2025: compensation cess on cars abolished; 18% / 40% / 5% slabs).
// Items still marked "verify" in the UI could not be confirmed against primary
// CBIC notification text and must not be presented as certain.

export type Condition = 'new' | 'used';
export type Fuel = 'petrol' | 'diesel' | 'hybrid' | 'ev';

export const USD_THRESHOLD = 40000;
export const LANDING_CHARGE_PCT = 1;
export const UK_CETA_YEAR1_HIGH_BAND_DUTY_PCT = 30;

export interface DutyInput {
  condition: Condition;
  fuel: Fuel;
  cc: number;            // engine capacity (ignored for EV)
  under4m: boolean;      // length under 4 metres (for the 18% IGST slab)
  cifUSD: number;        // CIF expressed in USD (for the $40,000 band test)
  avBaseINR: number;     // CIF in INR
  applyLandingCharge: boolean;
  ukCetaInQuota: boolean;
}

export interface DutyLine { key: string; label: string; pct: number; amount: number }

export interface DutyResult {
  assessableValue: number;
  landingCharge: number;
  bcdPct: number;
  aidcPct: number;
  igstPct: number;
  highBand: boolean;
  smallCarSlab: boolean;
  bcd: number;
  aidc: number;
  igst: number;
  totalDuty: number;
  landed: number;
  effectivePct: number;
  usedCeta: boolean;
  lines: DutyLine[];
}

export function isHighBand(i: Pick<DutyInput, 'fuel' | 'cc' | 'cifUSD'>): boolean {
  if (i.cifUSD > USD_THRESHOLD) return true;
  if (i.fuel === 'ev') return false;
  if (i.fuel === 'diesel') return i.cc > 2500;
  return i.cc > 3000; // petrol and petrol-hybrid
}

export function igstRate(i: Pick<DutyInput, 'fuel' | 'cc' | 'under4m'>): { pct: number; small: boolean } {
  if (i.fuel === 'ev') return { pct: 5, small: false };
  const small = i.under4m && (i.fuel === 'diesel' ? i.cc <= 1500 : i.cc <= 1200);
  return { pct: small ? 18 : 40, small };
}

export function calcDuty(i: DutyInput): DutyResult {
  const landingCharge = i.applyLandingCharge ? (i.avBaseINR * LANDING_CHARGE_PCT) / 100 : 0;
  const av = i.avBaseINR + landingCharge;
  const high = isHighBand(i);

  let bcdPct: number;
  let aidcPct: number;
  let usedCeta = false;

  if (i.condition === 'used') {
    bcdPct = 70; aidcPct = 67.5; // second-hand: 70% BCD + 67.5% AIDC (= old 125% + 12.5% SWS)
  } else if (i.fuel === 'ev') {
    bcdPct = 70; aidcPct = high ? 40 : 0;
  } else {
    bcdPct = high ? 70 : 60; aidcPct = high ? 40 : 0;
  }

  if (i.condition === 'new' && i.ukCetaInQuota && high && i.fuel !== 'ev') {
    bcdPct = UK_CETA_YEAR1_HIGH_BAND_DUTY_PCT; aidcPct = 0; usedCeta = true;
  }

  const bcd = (av * bcdPct) / 100;
  const aidc = (av * aidcPct) / 100;
  const { pct: igstPct, small } = igstRate(i);
  const igst = ((av + bcd + aidc) * igstPct) / 100; // SWS is exempt for HS 8703 CBU/used; no compensation cess since 22 Sep 2025
  const totalDuty = bcd + aidc + igst;
  const landed = av + totalDuty;

  const lines: DutyLine[] = [
    { key: 'bcd', label: 'BCD', pct: bcdPct, amount: bcd },
    ...(aidcPct > 0 ? [{ key: 'aidc', label: 'AIDC', pct: aidcPct, amount: aidc }] : []),
    { key: 'igst', label: 'IGST', pct: igstPct, amount: igst },
  ];

  return {
    assessableValue: av, landingCharge, bcdPct, aidcPct, igstPct,
    highBand: high, smallCarSlab: small, bcd, aidc, igst, totalDuty, landed,
    effectivePct: av > 0 ? (totalDuty / av) * 100 : 0, usedCeta, lines,
  };
}
