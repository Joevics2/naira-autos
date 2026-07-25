// Shared Nigerian state-level vehicle fee data — used by both the
// Registration Fee Calculator (/tools/registration-fee-calculator) and the
// Vehicle License tool (/tools/vehicle-license/nigeria) so the two never
// show conflicting numbers for the same state.
//
// Ranges are approximate and vary by engine capacity, vehicle type, and
// periodic Joint Tax Board (JTB) adjustments. "confidence: high" states have
// a published official fee schedule; "medium"/"low" states are estimated
// from user reports and regional patterns — always verify with the state's
// official portal before paying.

export interface StateData {
  zone: string;
  portal?: string;
  newRegAddon: [number, number];
  licenceRenewal: [number, number];
  roadworthiness: [number, number];
  changeOwnershipAddon: [number, number];
  confidence: 'high' | 'medium' | 'low';
  note?: string;
  onlineRenewal?: boolean; // has a working self-service online renewal portal
}

export const NIGERIA_STATES: Record<string, StateData> = {
  'Lagos':       { zone:'Southwest',    portal:'lagosmvnla.ng',                   newRegAddon:[5000,15000],  licenceRenewal:[4000,6000],   roadworthiness:[4000,8000],  changeOwnershipAddon:[5625,8625],   confidence:'high',   onlineRenewal:true,  note:'Lagos MVAA portal (lagosmvnla.ng) — the only official channel for online vehicle licence renewal in Lagos State.' },
  'FCT (Abuja)': { zone:'North Central',portal:'selfservice.fctevreg.com',        newRegAddon:[1500,4000],   licenceRenewal:[5000,12000],  roadworthiness:[5000,10000], changeOwnershipAddon:[3000,8000],   confidence:'medium', onlineRenewal:true,  note:'FCT DRTS EVREG self-service portal — enter your plate number, verify details, pay online, then collect at a DRTS station.' },
  'Ogun':        { zone:'Southwest',    portal:'portal.ogetax.ogunstate.gov.ng',  newRegAddon:[8000,20000],  licenceRenewal:[1250,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[4000,8000],   confidence:'medium', note:'Ogun OGIRS portal lists detailed add-on fees by engine capacity.' },
  'Oyo':         { zone:'Southwest',    newRegAddon:[20000,50000], licenceRenewal:[2300,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'medium' },
  'Osun':        { zone:'Southwest',    newRegAddon:[20000,50000], licenceRenewal:[2000,8000],   roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'medium' },
  'Ondo':        { zone:'Southwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,12000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Ekiti':       { zone:'Southwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Rivers':      { zone:'South South',  portal:'rivtamis.riversbirs.gov.ng',      newRegAddon:[45000,70000], licenceRenewal:[2300,10000],  roadworthiness:[7500,10000], changeOwnershipAddon:[20000,30000], confidence:'medium', note:'Rivers State is among the most expensive for renewals — Port Harcourt users report ₦20,000–₦40,000 for full papers via agents.' },
  'Delta':       { zone:'South South',  newRegAddon:[20000,50000], licenceRenewal:[3000,12000],  roadworthiness:[5000,12000], changeOwnershipAddon:[10000,20000], confidence:'low' },
  'Edo':         { zone:'South South',  portal:'eirs.gov.ng',                     newRegAddon:[20000,50000], licenceRenewal:[3000,12000],  roadworthiness:[5000,12000], changeOwnershipAddon:[10000,20000], confidence:'low' },
  'Bayelsa':     { zone:'South South',  portal:'bir.by.gov.ng',                   newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[10000,20000], confidence:'low' },
  'Akwa Ibom':   { zone:'South South',  newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[10000,20000], confidence:'low' },
  'Cross River': { zone:'South South',  newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[10000,20000], confidence:'low' },
  'Enugu':       { zone:'Southeast',    newRegAddon:[20000,50000], licenceRenewal:[3400,10000],  roadworthiness:[8000,12000], changeOwnershipAddon:[8000,15000],  confidence:'medium', note:'Enugu: vehicle licence ≈ ₦3,400–₦4,200, roadworthiness ₦8,000–₦9,100 per user reports.' },
  'Anambra':     { zone:'Southeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,12000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Imo':         { zone:'Southeast',    portal:'imovreg.iirs.im.gov.ng',          newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Abia':        { zone:'Southeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Ebonyi':      { zone:'Southeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Kano':        { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Kaduna':      { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,12000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Katsina':     { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Sokoto':      { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Zamfara':     { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Kebbi':       { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Jigawa':      { zone:'Northwest',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Niger':       { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[750,10000],  changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Kwara':       { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Kogi':        { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Benue':       { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Nassarawa':   { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Plateau':     { zone:'North Central',newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Taraba':      { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Adamawa':     { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Gombe':       { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Bauchi':      { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Yobe':        { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
  'Borno':       { zone:'Northeast',    newRegAddon:[20000,50000], licenceRenewal:[3000,10000],  roadworthiness:[5000,10000], changeOwnershipAddon:[8000,15000],  confidence:'low' },
};

export const ALL_NIGERIA_STATES = Object.keys(NIGERIA_STATES).sort();

export function fmtNaira(n: number): string {
  return '₦' + Math.round(n).toLocaleString('en-NG');
}
export function fmtNairaRange([lo, hi]: [number, number]): string {
  return lo === hi ? fmtNaira(lo) : `${fmtNaira(lo)} – ${fmtNaira(hi)}`;
}
