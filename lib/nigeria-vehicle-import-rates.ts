// lib/nigeria-vehicle-import-rates.ts
//
// Single source of truth for Nigeria's statutory vehicle import charges.
// Used by both /tools/import-duty-calculator and /tools/china-car-import-calculator
// so the two tools never silently drift apart.
//
// Last verified: July 2026, against Nigeria's 2026 Fiscal Policy Measures
// (effective 1 July 2026) — NAC levy halved, Green Tax Surcharge introduced.
// Sources cross-checked: Nigeria Customs Service announcement (via BusinessDay,
// Channels TV, Daily Post, Legit.ng), and ClearCargoNigeria's Green Tax explainer.
// NCS assessment at the port can still differ from these statutory rates —
// always treat this as an estimate, not an official figure.

export const NG_RATES = {
  importDuty: 0.20,        // Customs import duty on CIF — unchanged by the July 2026 measures
  nacLevyNew: 0.10,         // National Automotive Council levy, new vehicles — halved from 20% on 1 Jul 2026
  nacLevyUsed: 0.05,        // National Automotive Council levy, used/Tokunbo — halved from 15% on 1 Jul 2026
  fobLevy: 0.04,            // Levy on FOB value
  surcharge: 0.07,          // Surcharge — 7% of Import Duty (not CIF)
  etls: 0.005,              // ECOWAS Trade Liberalisation Scheme levy — only applies to goods sourced within West Africa
  vat: 0.075,               // VAT on CIF + Import Duty + NAC Levy + Green Tax
  version: 'July 2026 (post Green Tax)',
};

/**
 * Green Tax Surcharge — introduced 1 July 2026 under the 2026 Fiscal Policy
 * Measures. Based on engine capacity; EVs and mass transit buses are exempt.
 */
export const GREEN_TAX_BRACKETS = [
  { id: 'under-2000', label: 'Under 2,000cc', maxCC: 1999, rate: 0 },
  { id: '2000-3999', label: '2,000cc – 3,999cc', maxCC: 3999, rate: 0.02 },
  { id: '4000-plus', label: '4,000cc and above', maxCC: Infinity, rate: 0.04 },
] as const;

export type GreenTaxBracketId = typeof GREEN_TAX_BRACKETS[number]['id'];

export function getGreenTaxRate(bracketId: GreenTaxBracketId): number {
  return GREEN_TAX_BRACKETS.find(b => b.id === bracketId)?.rate ?? 0;
}

export const FALLBACK_USD_NGN_RATE = 1580;
