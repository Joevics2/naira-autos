// Pure calculation engine for the Tanzania (Mainland) car import calculator.
// Import duty 25% of CIF (EAC CET, HS 8703); excise on CIF + duty: engine component (5% up to 2,000cc, 10% above)
// plus an age component for used cars over 8 years from the year of manufacture (18%, 35%, 40%, Finance Act 2026);
// VAT 18% on CIF + duty + excise; Railway Development Levy on CIF; customs processing fee on FOB.

export const DUTY_PCT = 25;
export const VAT_PCT = 18;
export const RDL_DEFAULT_PCT = 2;
export const CPF_DEFAULT_PCT = 1;

export function engineExcisePct(cc: number): number {
  return cc > 2000 ? 10 : 5;
}

/** Age excise by vehicle age = arrival year minus year of manufacture (Finance Act 2026, s.126(9)). */
export function ageExcisePct(age: number): number {
  if (age <= 8) return 0;
  if (age <= 10) return 18;
  if (age <= 20) return 35;
  return 40;
}

export interface TzInput {
  fobUSD: number;
  freightUSD: number;
  usdToTzs: number;
  cc: number;
  manufactureYear: number;
  arrivalYear: number;
  dutyPct: number;       // default 25, editable (e.g. EAC or exemption)
  rdlPct: number;        // default 2, editable
  cpfPct: number;        // customs processing fee on FOB, default 1, editable
  otherCostsTZS: number; // registration, clearing agent, inspection
}

export interface TzLine { key: string; label: string; pct?: number; amount: number }
export interface TzResult {
  cifTZS: number; fobTZS: number; duty: number; engineExcisePct: number; engineExcise: number; age: number; ageExcisePct: number; ageExcise: number;
  excise: number; vatBase: number; vat: number; rdl: number; cpf: number; taxesTotal: number; taxesPctOfCif: number; totalTZS: number; totalUSD: number;
  lines: TzLine[]; notes: string[];
}

export function calcTz(i: TzInput): TzResult {
  const notes: string[] = [];
  const fobTZS = Math.max(0, i.fobUSD) * i.usdToTzs;
  const cifTZS = (Math.max(0, i.fobUSD) + Math.max(0, i.freightUSD)) * i.usdToTzs;
  const duty = (cifTZS * i.dutyPct) / 100;
  const base = cifTZS + duty;
  const ePct = engineExcisePct(i.cc);
  const engineExcise = (base * ePct) / 100;
  const age = Math.max(0, i.arrivalYear - i.manufactureYear);
  const aPct = ageExcisePct(age);
  const ageExcise = (base * aPct) / 100;
  const excise = engineExcise + ageExcise;
  const vatBase = cifTZS + duty + excise;
  const vat = (vatBase * VAT_PCT) / 100;
  const rdl = (cifTZS * i.rdlPct) / 100;
  const cpf = (fobTZS * i.cpfPct) / 100;
  const taxesTotal = duty + excise + vat + rdl + cpf;
  const totalTZS = cifTZS + taxesTotal + Math.max(0, i.otherCostsTZS);
  if (aPct > 0) notes.push(`A ${age}-year-old car (counted from the year of manufacture) pays an extra ${aPct}% age excise.`);
  else notes.push('Cars up to 8 years old from the year of manufacture pay no age excise.');
  if (i.cc <= 1000) notes.push('Cars up to 1,000cc moved from 0% to 5% engine excise on 1 July 2026.');
  const lines: TzLine[] = [
    { key: 'duty', label: 'Import duty', pct: i.dutyPct, amount: duty },
    { key: 'ee', label: 'Excise by engine size', pct: ePct, amount: engineExcise },
    { key: 'ae', label: 'Excise by vehicle age', pct: aPct, amount: ageExcise },
    { key: 'vat', label: 'VAT on CIF + duty + excise', pct: VAT_PCT, amount: vat },
    { key: 'rdl', label: 'Railway Development Levy (on CIF)', pct: i.rdlPct, amount: rdl },
    { key: 'cpf', label: 'Customs processing fee (on FOB)', pct: i.cpfPct, amount: cpf },
  ];
  return { cifTZS, fobTZS, duty, engineExcisePct: ePct, engineExcise, age, ageExcisePct: aPct, ageExcise, excise, vatBase, vat, rdl, cpf, taxesTotal, taxesPctOfCif: cifTZS > 0 ? (taxesTotal / cifTZS) * 100 : 0, totalTZS, totalUSD: i.usdToTzs > 0 ? totalTZS / i.usdToTzs : 0, lines, notes };
}
