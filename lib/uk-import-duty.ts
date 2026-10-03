// Pure calculation engine for the UK car import duty calculator.
// Customs value = vehicle price + shipping + insurance to the UK border.
// Duty = customs value x rate. Import VAT = (customs value + duty + other UK-bound charges) x VAT rate.

export type UkRoute = 'standard' | 'origin_zero' | 'custom' | 'classic' | 'tor';

export const STANDARD_DUTY_PCT = 10;
export const STANDARD_VAT_PCT = 20;
export const CLASSIC_VAT_PCT = 5;
export const DVLA_FIRST_REG_FEE_GBP = 55;

export interface UkInput {
  route: UkRoute;
  customRatePct: number;      // only used when route === 'custom'
  priceGBP: number;
  shippingGBP: number;
  insuranceGBP: number;
  otherVatableGBP: number;    // delivery/accessories/extra charges that form part of the VAT base
  agentFeesGBP: number;       // not in VAT base here (shown as an extra cost)
  approvalFeesGBP: number;    // IVA / MOT / compliance, extra cost
  includeDvlaFee: boolean;
}

export interface UkResult {
  customsValue: number;
  dutyPct: number;
  vatPct: number;
  duty: number;
  vatBase: number;
  vat: number;
  taxTotal: number;
  extras: number;
  totalLanded: number;
  effectivePct: number;
}

export function calcUk(i: UkInput): UkResult {
  const customsValue = i.priceGBP + i.shippingGBP + i.insuranceGBP;
  let dutyPct = STANDARD_DUTY_PCT;
  let vatPct = STANDARD_VAT_PCT;
  if (i.route === 'origin_zero') dutyPct = 0;
  if (i.route === 'custom') dutyPct = Math.max(0, i.customRatePct);
  if (i.route === 'classic') { dutyPct = 0; vatPct = CLASSIC_VAT_PCT; }
  if (i.route === 'tor') { dutyPct = 0; vatPct = 0; }

  const duty = (customsValue * dutyPct) / 100;
  const vatBase = customsValue + duty + i.otherVatableGBP;
  const vat = (vatBase * vatPct) / 100;
  const taxTotal = duty + vat;
  const extras = i.agentFeesGBP + i.approvalFeesGBP + (i.includeDvlaFee ? DVLA_FIRST_REG_FEE_GBP : 0);
  const totalLanded = customsValue + i.otherVatableGBP + taxTotal + extras;
  return {
    customsValue, dutyPct, vatPct, duty, vatBase, vat, taxTotal, extras, totalLanded,
    effectivePct: customsValue > 0 ? (taxTotal / customsValue) * 100 : 0,
  };
}
