// Pure calculation engine for the Pakistan car import duty calculator (value-based imports).
// Rates: Finance Act 2026 (effective 1 Jul 2026) engine-capacity slabs for imported cars (CBU).
// Stack (FBR practice): assessable value = CIF (+1% landing charge) -> CD, RD, ACD on AV ->
// FED (+SED) on AV + duties -> sales tax 18% on AV + duties + FED -> value-addition tax on AV + duties + FED ->
// section 148 advance income tax on AV + duties + FED + sales tax + VAT.
// Personal Gift / Baggage / Transfer-of-Residence imports use FBR fixed-amount tables and are NOT modelled.

export type PkFuel = 'petrol' | 'diesel' | 'hybrid' | 'ev';
export type PkMode = 'new' | 'used';

export const SALES_TAX_PCT = 18;
export const LANDING_PCT = 1;
export const USED_COMMERCIAL_RD_PCT = 30; // FY2026-27, falls 10 points a year

export interface Slab { max: number; cd: number; rd: number; acd: number; fed: number }
export const SLABS: Slab[] = [
  { max: 800, cd: 30, rd: 0, acd: 0, fed: 2.5 },
  { max: 1000, cd: 35, rd: 0, acd: 0, fed: 2.5 },
  { max: 1300, cd: 40, rd: 0, acd: 0, fed: 5 },
  { max: 1500, cd: 40, rd: 10, acd: 4, fed: 10 },
  { max: 1600, cd: 45, rd: 10, acd: 4, fed: 10 },
  { max: 1800, cd: 45, rd: 10, acd: 4, fed: 10 },
  { max: 2000, cd: 50, rd: 20, acd: 4, fed: 30 },
  { max: 3000, cd: 50, rd: 20, acd: 4, fed: 30 },
  { max: Infinity, cd: 50, rd: 20, acd: 4, fed: 30 },
];
export const SED_2000_3000 = 86;
export const SED_ABOVE_3000 = 92;

export interface PkInput {
  mode: PkMode;
  fuel: PkFuel;
  cc: number;
  cifUSD: number;
  avBasePKR: number;          // CIF in PKR
  applyLanding: boolean;
  applyVat: boolean;          // value-addition tax (commercial importers)
  vatPct: number;
  s148Pct: number;
}

export interface PkLine { key: string; label: string; pct: number; amount: number }
export interface PkResult {
  av: number; cdPct: number; rdPct: number; acdPct: number; fedPct: number; sedPct: number;
  cd: number; rd: number; acd: number; fed: number; sed: number; st: number; vat: number; s148: number;
  totalTax: number; landed: number; effectivePct: number; lines: PkLine[]; notes: string[];
}

export function slabFor(cc: number): Slab { return SLABS.find((s) => cc <= s.max) ?? SLABS[SLABS.length - 1]; }

export function calcPk(i: PkInput): PkResult {
  const notes: string[] = [];
  const av = i.avBasePKR * (1 + (i.applyLanding ? LANDING_PCT : 0) / 100);
  let cdPct: number, rdPct: number, acdPct: number, fedPct: number, sedPct = 0;

  if (i.fuel === 'ev') {
    cdPct = 25; rdPct = 0; acdPct = 0;
    fedPct = i.cifUSD > 110000 ? 40 : i.cifUSD > 75000 ? 30 : 0;
    notes.push('EVs up to US$75,000: 25% customs duty and no FED; 30% FED to US$110,000, 40% above.');
  } else {
    const s = slabFor(i.cc);
    cdPct = s.cd; rdPct = s.rd; acdPct = s.acd; fedPct = s.fed;
    if (i.fuel === 'petrol' && i.cc > 2000) {
      sedPct = i.cc > 3000 ? SED_ABOVE_3000 : SED_2000_3000;
      notes.push('Special Excise Duty applies to imported petrol cars and SUVs above 2,000 cc.');
    }
  }
  if (i.mode === 'used') {
    rdPct += USED_COMMERCIAL_RD_PCT;
    notes.push('Used commercial import: extra 30% regulatory duty for FY2026-27 (falls 10 points a year).');
  }

  const cd = (av * cdPct) / 100, rd = (av * rdPct) / 100, acd = (av * acdPct) / 100;
  const duties = cd + rd + acd;
  const fedBase = av + duties;
  const fed = (fedBase * fedPct) / 100;
  const sed = (fedBase * sedPct) / 100;
  const excise = fed + sed;
  const st = ((av + duties + excise) * SALES_TAX_PCT) / 100;
  const vat = i.applyVat ? ((av + duties + excise) * Math.max(0, i.vatPct)) / 100 : 0;
  const s148 = ((av + duties + excise + st + vat) * Math.max(0, i.s148Pct)) / 100;
  const totalTax = duties + excise + st + vat + s148;

  const lines: PkLine[] = [{ key: 'cd', label: 'Customs duty', pct: cdPct, amount: cd }];
  if (rdPct > 0) lines.push({ key: 'rd', label: 'Regulatory duty', pct: rdPct, amount: rd });
  if (acdPct > 0) lines.push({ key: 'acd', label: 'Additional customs duty', pct: acdPct, amount: acd });
  if (fedPct > 0) lines.push({ key: 'fed', label: 'Federal excise duty', pct: fedPct, amount: fed });
  if (sedPct > 0) lines.push({ key: 'sed', label: 'Special excise duty', pct: sedPct, amount: sed });
  lines.push({ key: 'st', label: 'Sales tax', pct: SALES_TAX_PCT, amount: st });
  if (vat > 0) lines.push({ key: 'vat', label: 'Value-addition tax', pct: i.vatPct, amount: vat });
  lines.push({ key: 's148', label: 'Advance income tax (s.148)', pct: i.s148Pct, amount: s148 });

  return {
    av, cdPct, rdPct, acdPct, fedPct, sedPct, cd, rd, acd, fed, sed, st, vat, s148, totalTax,
    landed: av + totalTax, effectivePct: av > 0 ? (totalTax / av) * 100 : 0, lines, notes,
  };
}
