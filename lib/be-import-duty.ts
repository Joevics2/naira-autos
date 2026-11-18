// Gedeelde rekenmodule (NL/FR) voor het importeren van een auto naar België.
// Buiten de EU: invoerrecht 10 % over de douanewaarde, btw 21 % over douanewaarde + recht (+ kosten tot bestemming).
// EU: geen invoerrecht; Belgische btw 21 % alleen voor een nieuw voertuig (hooguit 6 maanden OF 6.000 km).
// Altijd: BIV / TMC (regionale belasting op inverkeerstelling) volgens Vlaanderen, Wallonië of Brussel (tarieven
// geldig van 01/07/2026 tot 30/06/2027).

export type BeRoute = 'buiten-eu' | 'eu';
export type BeOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';
export type BeRegion = 'vl' | 'wa' | 'bxl';
export type BeFuel = 'benzine' | 'diesel' | 'hybride' | 'elektrisch';

export const RECHT_PCT = 10;
export const BTW_PCT = 21;

// Vlaanderen
export const VL_Q = 1.245;
export const VL_C_BENZINE = 28.54;   // Euro 6 benzine / hybride (luchtcomponent)
export const VL_C_DIESEL = 628.89;   // Euro 6 diesel: afgeleid uit voorbeeldbedragen, bewerkbaar in de tool
export const VL_MIN = 58.16;
export const VL_MAX = 14539.31;
export const VL_EV_FORFAIT = 61.5;

// Brussel (nieuw voertuig) en Wallonië (basisbedrag), per vermogenstrap
export const BXL_TABEL = [78.88, 157.76, 634.89, 1112.01, 1589.14, 3178.28, 6357.85];
export const WA_BB = [64.01, 128.02, 515.2, 902.37, 1289.55, 2579.1, 5159.25];
// Verschuldigd deel per leeftijdsjaar (0 tot en met 14 jaar); vanaf 15 jaar het minimum
export const LEEFTIJD_BXL_WA = [100, 90, 80, 70, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10];

export function trapKw(kw: number): number {
  if (kw <= 70) return 0; if (kw <= 85) return 1; if (kw <= 100) return 2; if (kw <= 110) return 3; if (kw <= 120) return 4; if (kw <= 155) return 5; return 6;
}
export function trapPk(pk: number): number {
  if (pk <= 8) return 0; if (pk <= 10) return 1; if (pk <= 11) return 2; if (pk <= 14) return 3; if (pk <= 15) return 4; if (pk <= 17) return 5; return 6;
}
export function trap(kw: number, pk: number): number { return Math.max(trapKw(kw), trapPk(pk)); }

export interface DateParts { y: number; m: number; d: number }
/** Volle maanden tussen eerste inschrijving en inschrijving in België. */
export function volleMaanden(a: DateParts, b: DateParts): number {
  let m = (b.y - a.y) * 12 + (b.m - a.m);
  if (b.d < a.d) m -= 1;
  return Math.max(0, m);
}

export function leeftijdVl(maanden: number): number {
  return Math.max(10, 100 - 10 * Math.floor(maanden / 12));
}
export function leeftijdBxlWa(maanden: number): number | null {
  const jaar = Math.floor(maanden / 12);
  return jaar >= LEEFTIJD_BXL_WA.length ? null : LEEFTIJD_BXL_WA[jaar];
}

export interface BivInput {
  region: BeRegion; fuel: BeFuel; co2: number; kw: number; pk: number; mtmKg: number; nedc: boolean;
  maanden: number; luchtComponent: number; inschrijving2026: boolean;
}

export function biv(i: BivInput): number {
  const r = (n: number) => Math.round(n * 100) / 100;
  if (i.region === 'vl') {
    if (i.fuel === 'elektrisch') return i.inschrijving2026 ? VL_EV_FORFAIT : 0;
    const kern = Math.pow((i.co2 * VL_Q) / 246, 6) * 4500 + i.luchtComponent;
    const bedrag = kern * (leeftijdVl(i.maanden) / 100);
    return r(Math.min(VL_MAX, Math.max(VL_MIN, bedrag)));
  }
  const t = trap(i.kw, i.pk);
  if (i.region === 'bxl') {
    if (i.fuel === 'elektrisch') return BXL_TABEL[0];
    const deel = leeftijdBxlWa(i.maanden);
    return r(deel == null ? BXL_TABEL[0] : Math.max(BXL_TABEL[0], (BXL_TABEL[t] * deel) / 100));
  }
  // Wallonië
  if (i.fuel === 'elektrisch') return 50;
  const deel = leeftijdBxlWa(i.maanden);
  const bb = deel == null ? WA_BB[0] : (WA_BB[t] * deel) / 100;
  const x = i.nedc ? 115 : 136;
  const c = i.fuel === 'hybride' ? 0.8 : 1;
  const bedrag = Math.max(bb, 61.5) * (i.co2 / x) * (i.mtmKg / 1838) * c;
  return r(Math.min(9000, Math.max(50, bedrag)));
}

export interface BeInput extends BivInput {
  route: BeRoute; origin: BeOrigin; hasOriginProof: boolean; cvdPct: number; prijsEUR: number; vrachtEUR: number;
  kostenBestemmingEUR: number; nieuwEU: boolean; overigeKostenEUR: number;
}
export interface BeLine { key: string; amount: number; pct?: number }
export interface BeResult {
  douanewaarde: number; recht: number; rechtPct: number; cvd: number; cvdPct: number; btwBase: number; btw: number; btwPct: number;
  biv: number; belastingTotaal: number; totaal: number; notes: string[];
}

export function rechtPct(i: Pick<BeInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'buiten-eu') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return RECHT_PCT;
}

export function calcBe(i: BeInput): BeResult {
  const notes: string[] = [];
  const prijs = Math.max(0, i.prijsEUR), vracht = Math.max(0, i.vrachtEUR), dest = Math.max(0, i.kostenBestemmingEUR);
  const buiten = i.route === 'buiten-eu';
  const douanewaarde = buiten ? prijs + vracht : prijs;
  const pct = rechtPct(i);
  const cvdPct = buiten && i.origin === 'cn_bev' ? Math.max(0, i.cvdPct) : 0;
  const recht = (douanewaarde * pct) / 100;
  const cvd = (douanewaarde * cvdPct) / 100;
  const btwAanvraag = buiten || i.nieuwEU;
  const btwBase = buiten ? douanewaarde + recht + cvd + dest : prijs + vracht;
  const btw = btwAanvraag ? (btwBase * BTW_PCT) / 100 : 0;
  const b = biv(i);
  const belastingTotaal = recht + cvd + btw + b;
  const totaal = prijs + vracht + (buiten ? dest : 0) + belastingTotaal + Math.max(0, i.overigeKostenEUR);
  return { douanewaarde, recht, rechtPct: pct, cvd, cvdPct, btwBase, btw, btwPct: btwAanvraag ? BTW_PCT : 0, biv: b, belastingTotaal, totaal, notes };
}
