// Reine Rechenlogik für den Kfz-Einfuhr-Rechner Deutschland.
// Drittland: Zollwert = Kaufpreis + Fracht + Versicherung bis zur EU-Grenze; Zoll auf den Zollwert;
// Einfuhrumsatzsteuer (EUSt) 19 % auf Zollwert + Zoll (+ Nebenkosten bis zum ersten Bestimmungsort).
// EU-Kauf: kein Zoll; Erwerbsteuer 19 % nur bei "neuen" Fahrzeugen (unter 6 Monate ODER unter 6.000 km).
// Oldtimer (KN 9705, 30+ Jahre, sammlungswürdig): 0 % Zoll, 7 % EUSt. Übersiedlungsgut: 0 % / 0 %.

export type DeRoute = 'drittland' | 'eu' | 'oldtimer' | 'umzug';
export type DeOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';

export const MFN_ZOLL_PCT = 10;
export const EUST_PCT = 19;
export const EUST_OLDTIMER_PCT = 7;

export interface DeInput {
  route: DeRoute;
  origin: DeOrigin;
  hasOriginProof: boolean;     // JP / KR / UK: Ursprungsnachweis liegt vor
  cvdPct: number;              // nur cn_bev: Ausgleichszoll in %
  kaufpreisEUR: number;        // netto
  frachtEUR: number;           // Fracht + Versicherung bis EU-Grenze
  nebenkostenEUR: number;      // Transport bis Bestimmungsort (erhöht nur die EUSt-Basis)
  euNeufahrzeug: boolean;      // EU-Kauf: unter 6 Monate ODER unter 6.000 km
  weitereKostenEUR: number;    // Einzelabnahme, Umrüstung, Zulassung usw.
}

export interface DeLine { key: string; label: string; pct?: number; amount: number }
export interface DeResult {
  zollwert: number; zollPct: number; zoll: number; cvdPct: number; cvd: number;
  eustBasis: number; eustPct: number; eust: number; abgaben: number; gesamt: number;
  effektivPct: number; lines: DeLine[]; hinweise: string[];
}

export function zollsatz(i: Pick<DeInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'drittland') return 0;
  if ((i.origin === 'us' || i.origin === 'jp' || i.origin === 'kr' || i.origin === 'uk') && i.hasOriginProof) return 0;
  return MFN_ZOLL_PCT;
}

export function calcDe(i: DeInput): DeResult {
  const hinweise: string[] = [];
  const kauf = Math.max(0, i.kaufpreisEUR);
  const fracht = Math.max(0, i.frachtEUR);
  const neben = Math.max(0, i.nebenkostenEUR);
  const zollwert = kauf + (i.route === 'eu' ? 0 : fracht);

  let zollPct = zollsatz(i);
  let eustPct = EUST_PCT;
  let cvdPct = 0;
  let eustBasis = 0;

  if (i.route === 'drittland') {
    if (i.origin === 'cn_bev') { cvdPct = Math.max(0, i.cvdPct); hinweise.push('Chinesische Elektroautos: 10 % Zoll plus Ausgleichszoll je nach Hersteller.'); }
    if ((i.origin === 'us' || i.origin === 'jp' || i.origin === 'kr' || i.origin === 'uk') && !i.hasOriginProof) hinweise.push('Ohne gültigen Ursprungsnachweis gilt der Normalzollsatz von 10 %.');
    if (i.origin === 'us' && i.hasOriginProof) hinweise.push('USA: 0 % Zoll seit 1. Juli 2026 (Verordnung (EU) 2026/1455), nur für Fahrzeuge mit US-Ursprung und nachgewiesenem Direkttransport.');
    if (i.origin === 'jp' && i.hasOriginProof) hinweise.push('Japan: 0 % Zoll seit 1. Februar 2026 (EU-Japan-Abkommen), nur mit Ursprungsnachweis.');
  } else if (i.route === 'oldtimer') {
    zollPct = 0; eustPct = EUST_OLDTIMER_PCT; hinweise.push('Oldtimer: 0 % Zoll und ermäßigte EUSt von 7 %, nur wenn das Fahrzeug als Sammlungsstück anerkannt wird.');
  } else if (i.route === 'umzug') {
    zollPct = 0; eustPct = 0; hinweise.push('Übersiedlungsgut: abgabenfrei bei Wohnsitzverlegung, wenn Sie das Fahrzeug vorher mindestens 6 Monate besaßen und nutzten.');
  } else {
    zollPct = 0; eustPct = i.euNeufahrzeug ? EUST_PCT : 0;
    hinweise.push(i.euNeufahrzeug
      ? 'Neufahrzeug im EU-Sinn (unter 6 Monate oder unter 6.000 km): 19 % deutsche Erwerbsteuer, auch bei Privatkauf.'
      : 'Gebrauchtwagen aus der EU (über 6 Monate und über 6.000 km): keine deutsche Umsatzsteuer, wenn die Steuer im Kaufland schon enthalten ist.');
  }

  const zoll = (zollwert * zollPct) / 100;
  const cvd = (zollwert * cvdPct) / 100;
  if (i.route === 'eu') eustBasis = kauf + neben;
  else eustBasis = zollwert + zoll + cvd + neben;
  const eust = (eustBasis * eustPct) / 100;

  const abgaben = zoll + cvd + eust;
  const gesamt = zollwert + neben + abgaben + Math.max(0, i.weitereKostenEUR) + (i.route === 'eu' ? fracht : 0);

  const lines: DeLine[] = [];
  if (i.route === 'drittland' || i.route === 'oldtimer' || i.route === 'umzug') lines.push({ key: 'zoll', label: 'Zoll', pct: zollPct, amount: zoll });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Ausgleichszoll (China-BEV)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'eust', label: i.route === 'eu' ? 'Erwerbsteuer (Umsatzsteuer)' : 'Einfuhrumsatzsteuer', pct: eustPct, amount: eust });

  return {
    zollwert, zollPct, zoll, cvdPct, cvd, eustBasis, eustPct, eust, abgaben, gesamt,
    effektivPct: zollwert > 0 ? (abgaben / zollwert) * 100 : 0, lines, hinweise,
  };
}
