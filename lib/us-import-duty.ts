// Pure calculation engine for the USA car import duty calculator.
//
// Structure (rates verified against USTR/CBP-derived sources, October 2026):
//   base duty (HTSUS col. 1: 2.5% cars 8703, 25% light trucks 8704)
// + Section 232 automobile duty (25% generally; country deals cap the total) unless the
//   vehicle was made >= 25 calendar years before the year of entry (heading 9903.94.04)
// + Section 301 duty (China; and the "forced labor" duties in force since 24 Jul 2026,
//   which apply to vehicles that do NOT pay Section 232)
// + MPF (0.3464%, FY2027 min $34.58 / max $670.86) and HMF (0.125%, ocean only).
// IEEPA tariffs ended after the Supreme Court ruling of 20 Feb 2026 and are not modelled.

export type Category = 'car' | 'small_car' | 'truck';
export type Origin = 'eu' | 'jp' | 'kr' | 'uk' | 'ca_mx' | 'cn' | 'au' | 'other';

export const MPF_RATE = 0.3464;
export const MPF_MIN = 34.58;
export const MPF_MAX = 670.86;
export const HMF_RATE = 0.125;
export const AGE_EXEMPT_YEARS = 25;

export interface UsInput {
  category: Category;
  origin: Origin;
  valueUSD: number;          // price paid or payable (dutiable value)
  mfgYear: number;
  entryYear: number;
  ukInQuota: boolean;        // UK cars only
  usmcaQualifying: boolean;  // Canada / Mexico only
  usContentPct: number;      // USMCA: share of US content the 25% does not apply to (needs Commerce approval)
  chinaPluginOrEv: boolean;  // China only: plug-in hybrid / EV (Section 301 = 100%)
  otherForcedLaborPct: number; // 'other' origin, age-exempt vehicles: 0, 10 or 12.5
  ocean: boolean;
}

export interface UsLine { key: string; label: string; pct: number; amount: number }

export interface UsResult {
  ageExempt232: boolean;
  basePct: number;
  s232Pct: number;
  s301Pct: number;
  totalDutyPct: number;
  duty: number;
  mpf: number;
  hmf: number;
  totalToCbp: number;
  effectivePct: number;
  lines: UsLine[];
  notes: string[];
}

export function isAgeExempt232(category: Category, mfgYear: number, entryYear: number): boolean {
  if (category === 'small_car') return false; // steel-derivative duty has no age exception
  return entryYear - mfgYear >= AGE_EXEMPT_YEARS;
}

export function ratesFor(i: UsInput): { base: number; s232: number; s301: number; exempt: boolean; notes: string[] } {
  const notes: string[] = [];
  const exempt = isAgeExempt232(i.category, i.mfgYear, i.entryYear);
  const truck = i.category === 'truck';
  let base = truck ? 25 : 2.5;
  let s232 = 0;
  let s301 = 0;

  if (i.category === 'small_car') {
    // 8703.21 (<= 1,000 cc): 15% in total under the steel-derivative duty (9903.82.10)
    return { base: 2.5, s232: 12.5, s301: 0, exempt: false, notes: ['Cars of 1,000 cc or less pay 15% in total under the steel-derivative duty, with no age exception.'] };
  }

  if (!exempt) {
    switch (i.origin) {
      case 'eu': case 'jp':
        s232 = truck ? 0 : 12.5; if (!truck) notes.push('EU/Japan deal: 15% total on cars.'); break;
      case 'kr':
        base = truck ? 25 : 0; s232 = truck ? 0 : 15; break;
      case 'uk':
        s232 = truck ? 25 : i.ukInQuota ? 7.5 : 25;
        if (!truck) notes.push(i.ukInQuota ? 'UK quota: 10% total (100,000 cars a year).' : 'Outside the UK quota the full 25% applies.');
        break;
      case 'ca_mx': {
        if (i.usmcaQualifying) {
          base = 0;
          s232 = 25 * (1 - Math.min(Math.max(i.usContentPct, 0), 100) / 100);
          notes.push('USMCA: base duty free; 25% applies to non-US content only with Commerce approval.');
        } else s232 = 25;
        break;
      }
      case 'cn':
        s232 = 25; s301 = i.chinaPluginOrEv ? 100 : 25; break;
      default: s232 = 25;
    }
  } else {
    notes.push('Made at least 25 calendar years before the year of entry: no Section 232 duty, but the forced-labor Section 301 duty can apply instead.');
    switch (i.origin) {
      case 'eu': s301 = Math.max(0, 10 - base); break;           // capped at 10% combined
      case 'jp': s301 = Math.max(0, 12.5 - base); break;         // capped at 12.5% combined
      case 'kr': base = truck ? 25 : 0; s301 = Math.max(0, 12.5 - base); break;
      case 'uk': s301 = 10; break;
      case 'ca_mx': if (i.usmcaQualifying) { base = 0; s301 = 0; } else s301 = 10; break;
      case 'au': s301 = 12.5; break;
      case 'cn': s301 = (i.chinaPluginOrEv ? 100 : 25) + 12.5; break;
      default: s301 = Math.max(0, i.otherForcedLaborPct);
    }
  }
  return { base, s232, s301, exempt, notes };
}

export function calcUs(i: UsInput): UsResult {
  const r = ratesFor(i);
  const v = Math.max(0, i.valueUSD);
  const baseAmt = (v * r.base) / 100;
  const s232Amt = (v * r.s232) / 100;
  const s301Amt = (v * r.s301) / 100;
  const duty = baseAmt + s232Amt + s301Amt;
  const mpf = v > 0 ? Math.min(Math.max((v * MPF_RATE) / 100, MPF_MIN), MPF_MAX) : 0;
  const hmf = i.ocean ? (v * HMF_RATE) / 100 : 0;
  const totalToCbp = duty + mpf + hmf;
  const lines: UsLine[] = [{ key: 'base', label: 'Base duty (HTSUS)', pct: r.base, amount: baseAmt }];
  if (r.s232 > 0) lines.push({ key: 's232', label: 'Section 232 automobiles', pct: r.s232, amount: s232Amt });
  if (r.s301 > 0) lines.push({ key: 's301', label: 'Section 301', pct: r.s301, amount: s301Amt });
  return {
    ageExempt232: r.exempt, basePct: r.base, s232Pct: r.s232, s301Pct: r.s301,
    totalDutyPct: r.base + r.s232 + r.s301, duty, mpf, hmf, totalToCbp,
    effectivePct: v > 0 ? (totalToCbp / v) * 100 : 0, lines, notes: r.notes,
  };
}
