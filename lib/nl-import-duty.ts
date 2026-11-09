// Zuivere rekenmodule voor de calculator voor het importeren van een auto naar Nederland.
// Buiten de EU: invoerrecht 10 % over de douanewaarde (prijs + vracht + verzekering), btw 21 % over douanewaarde + recht.
// EU: geen invoerrecht; Nederlandse btw 21 % alleen voor een "nieuw" voertuig (hooguit 6 maanden of 6.000 km).
// Altijd: BPM bij inschrijving in het kentekenregister (tarieven 2026), voor gebruikte auto's verminderd met de
// forfaitaire afschrijvingstabel (Uitvoeringsregeling BPM 1992, art. 8, sinds 1 juli 2023).

export type NlRoute = 'buiten-eu' | 'eu';
export type NlOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';
export type NlFuel = 'benzine' | 'diesel' | 'elektrisch';

export const INVOERRECHT_PCT = 10;
export const BTW_PCT = 21;
export const BPM_START = 687;
export const DIESEL_TOESLAG = 114.83;
export const DIESEL_GRENS = 69;

export function brutoBpm(co2: number, fuel: NlFuel): number {
  const g = fuel === 'elektrisch' ? 0 : Math.max(0, co2);
  let bpm: number;
  if (g <= 77) bpm = 687 + 2 * g;
  else if (g <= 100) bpm = 841 + 82 * (g - 77);
  else if (g <= 139) bpm = 2727 + 181 * (g - 100);
  else if (g <= 155) bpm = 9786 + 297 * (g - 139);
  else bpm = 14538 + 594 * (g - 155);
  if (fuel === 'diesel' && g > DIESEL_GRENS) bpm += (g - DIESEL_GRENS) * DIESEL_TOESLAG;
  return Math.round(bpm * 100) / 100;
}

/** Vaste CO2-waarden van de Belastingdienst als de uitstoot onbekend is (datum eerste toelating vanaf 1 juli 2020). */
export function onbekendeCo2(fuel: NlFuel): number {
  return fuel === 'diesel' ? 395 : 550;
}

// Forfaitaire tabel: [drempel in maanden, basispercentage, opslag per maand die (deels) voorbij is]
const FORFAIT: [number, number, number][] = [
  [0, 0, 12], [1, 12, 4], [3, 20, 3.5], [5, 27, 1.5], [9, 33, 1], [18, 42, 0.75], [30, 51, 0.5],
  [42, 57, 0.42], [54, 62, 0.42], [66, 67, 0.42], [78, 72, 0.25], [90, 75, 0.25], [102, 78, 0.25], [114, 81, 0.19],
];

export interface DateParts { y: number; m: number; d: number }
const toDate = (p: DateParts) => new Date(Date.UTC(p.y, p.m - 1, p.d));
function addMonths(p: DateParts, n: number): Date {
  const total = p.m - 1 + n;
  const y = p.y + Math.floor(total / 12);
  const m = ((total % 12) + 12) % 12;
  const last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
  return new Date(Date.UTC(y, m, Math.min(p.d, last)));
}

export function forfaitKorting(start: DateParts, end: DateParts): { pct: number; maanden: number } {
  const e = toDate(end).getTime();
  let idx = 0;
  for (let i = 0; i < FORFAIT.length; i++) if (addMonths(start, FORFAIT[i][0]).getTime() <= e) idx = i;
  const [thr, base, per] = FORFAIT[idx];
  const from = addMonths(start, thr);
  let k = 0;
  while (addMonths({ y: from.getUTCFullYear(), m: from.getUTCMonth() + 1, d: from.getUTCDate() }, k).getTime() < e && k < 400) k++;
  const pct = Math.min(100, Math.round((base + per * k) * 100) / 100);
  return { pct, maanden: k };
}

export interface NlInput {
  route: NlRoute;
  origin: NlOrigin;
  hasOriginProof: boolean;
  cvdPct: number;
  prijsEUR: number;
  vrachtEUR: number;
  kostenBestemmingEUR: number;
  nieuwEU: boolean;
  gebruikt: boolean;           // gebruikte auto: BPM-vermindering van toepassing
  toelating: DateParts;        // datum eerste toelating
  keuring: DateParts;          // datum RDW-goedkeuring (peildatum)
  fuel: NlFuel;
  co2: number;
  co2Onbekend: boolean;
  brutoBpmHandmatig: number;   // 0 = niet ingevuld
  overigeKostenEUR: number;
}

export interface NlLine { key: string; label: string; pct?: number; amount: number }
export interface NlResult {
  douanewaarde: number; recht: number; rechtPct: number; cvd: number; btwBase: number; btwPct: number; btw: number;
  brutoBpm: number; korting: number; kortingBedrag: number; nettoBpm: number; bpmWltp: boolean;
  belastingTotaal: number; totaal: number; lines: NlLine[]; notities: string[];
}

export function rechtPct(i: Pick<NlInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'buiten-eu') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return INVOERRECHT_PCT;
}

export function calcNl(i: NlInput): NlResult {
  const notities: string[] = [];
  const prijs = Math.max(0, i.prijsEUR);
  const vracht = Math.max(0, i.vrachtEUR);
  const dest = Math.max(0, i.kostenBestemmingEUR);
  const buiten = i.route === 'buiten-eu';
  const douanewaarde = buiten ? prijs + vracht : prijs;

  const pct = rechtPct(i);
  const cvdPct = buiten && i.origin === 'cn_bev' ? Math.max(0, i.cvdPct) : 0;
  const recht = (douanewaarde * pct) / 100;
  const cvd = (douanewaarde * cvdPct) / 100;
  if (buiten) {
    if (i.origin === 'cn_bev') notities.push('Chinese elektrische auto’s: 10 % invoerrecht plus een compenserend recht per fabrikant.');
    if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && !i.hasOriginProof) notities.push('Zonder geldig oorsprongsbewijs geldt het gewone invoerrecht van 10 %.');
    if (i.origin === 'us' && i.hasOriginProof) notities.push('Verenigde Staten: 0 % sinds 1 juli 2026 (Verordening (EU) 2026/1455), alleen voor in de VS vervaardigde auto’s met bewezen rechtstreeks vervoer.');
    if (i.origin === 'jp' && i.hasOriginProof) notities.push('Japan: 0 % sinds 1 februari 2026 (EU-Japan-partnerschapsakkoord), met oorsprongsverklaring.');
  }

  const btwAanvraag = buiten || i.nieuwEU;
  const btwBase = buiten ? douanewaarde + recht + cvd + dest : prijs + vracht;
  const btw = btwAanvraag ? (btwBase * BTW_PCT) / 100 : 0;
  if (!buiten) notities.push(i.nieuwEU
    ? 'Nieuw voertuig voor de btw (hooguit 6 maanden oud of hooguit 6.000 km): 21 % Nederlandse btw, ook als particulier.'
    : 'Gebruikte auto uit de EU (meer dan 6 maanden én meer dan 6.000 km): geen Nederlandse btw als in het aankoopland al btw is betaald.');

  // BPM
  const wltp = toDate(i.toelating).getTime() >= Date.UTC(2020, 6, 1);
  let bruto = 0;
  if (i.brutoBpmHandmatig > 0) { bruto = i.brutoBpmHandmatig; notities.push('Je hebt zelf een bruto BPM ingevuld; dat bedrag is gebruikt.'); }
  else if (!wltp) { notities.push('Datum eerste toelating vóór 1 juli 2020: dan gelden de oudere NEDC-tarieven, die hier niet zijn ingebouwd. Vul het bruto BPM-bedrag zelf in.'); }
  else {
    const co2 = i.co2Onbekend ? onbekendeCo2(i.fuel) : i.co2;
    if (i.co2Onbekend) notities.push(`CO2 onbekend: de Belastingdienst rekent dan met ${onbekendeCo2(i.fuel)} g/km.`);
    bruto = brutoBpm(co2, i.fuel);
    if (i.fuel === 'elektrisch') notities.push('Elektrische auto: sinds 1 januari 2025 betaal je het minimumtarief (starttarief) in plaats van niets.');
  }

  let korting = 0;
  let maanden = 0;
  const ouderDan25 = addMonths(i.toelating, 300).getTime() <= toDate(i.keuring).getTime();
  if (ouderDan25) { korting = 100; notities.push('Auto van 25 jaar of ouder: geen BPM, maar je moet wel aangifte doen.'); }
  else if (i.gebruikt) {
    const f = forfaitKorting(i.toelating, i.keuring);
    korting = f.pct; maanden = f.maanden;
    notities.push('Afschrijving volgens de forfaitaire tabel. Een koerslijst of taxatierapport kan voordeliger uitpakken.');
  }
  const kortingBedrag = Math.round(bruto * korting) / 100;
  const nettoBpm = Math.round((bruto - kortingBedrag) * 100) / 100;
  void maanden;

  const belastingTotaal = recht + cvd + btw + nettoBpm;
  const totaal = prijs + vracht + (buiten ? dest : 0) + belastingTotaal + Math.max(0, i.overigeKostenEUR);

  const lines: NlLine[] = [];
  if (buiten) lines.push({ key: 'recht', label: 'Invoerrecht', pct, amount: recht });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Compenserend recht (China, EV)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'btw', label: buiten ? 'Btw bij invoer' : 'Nederlandse btw', pct: btwAanvraag ? BTW_PCT : 0, amount: btw });
  lines.push({ key: 'bpm', label: 'BPM (na afschrijving)', amount: nettoBpm });

  return { douanewaarde, recht, rechtPct: pct, cvd, btwBase, btwPct: BTW_PCT, btw, brutoBpm: bruto, korting, kortingBedrag, nettoBpm, bpmWltp: wltp, belastingTotaal, totaal, lines, notities };
}
