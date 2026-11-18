// Motore di calcolo puro per il calcolatore di importazione auto in Italia.
// Extra UE: valore in dogana (prezzo + nolo + assicurazione fino al confine UE) x dazio 10 %,
// IVA 22 % su valore in dogana + dazio (+ spese fino al primo luogo di destinazione).
// UE: nessun dazio; IVA italiana 22 % solo se il veicolo e' "nuovo" (meno di 6 mesi OPPURE meno di 6.000 km).
// Sempre: IPT (imposta provinciale di trascrizione, D.M. 435/1998) con maggiorazione provinciale fino al 30 %,
// piu' le spese fisse di immatricolazione.

export type ItRoute = 'extra-ue' | 'ue';
export type ItOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';

export const DAZIO_PCT = 10;
export const IVA_PCT = 22;
export const IPT_BASE = 150.81;
export const IPT_PER_KW = 3.5119;
// 27 emolumenti ACI + 10,20 diritti Motorizzazione + 32 bollo istanza unificata + 16 bollo documento unico
export const SPESE_FISSE = 27 + 10.2 + 32 + 16;

/** IPT base: fino a 53 kW importo fisso; oltre 53 kW 3,5119 euro per OGNI kW di potenza (tabella ACI). */
export function iptBase(kw: number): number {
  if (kw <= 0) return 0;
  if (kw <= 53) return IPT_BASE;
  return Math.round(IPT_PER_KW * kw * 100) / 100;
}

export interface ItInput {
  route: ItRoute;
  origin: ItOrigin;
  hasOriginProof: boolean;
  cvdPct: number;
  prezzoEUR: number;
  noloEUR: number;
  speseDestinazioneEUR: number;
  nuovoUE: boolean;
  kw: number;
  maggiorazioneProvPct: number; // 0-30
  altreSpeseEUR: number;
}

export interface ItLine { key: string; label: string; pct?: number; amount: number }
export interface ItResult {
  valoreDogana: number; dazio: number; dazioPct: number; cvd: number; ivaBase: number; iva: number; ivaPct: number;
  iptBase: number; ipt: number; speseFisse: number; tasseTotale: number; totale: number; lines: ItLine[]; note: string[];
}

export function dazioRate(i: Pick<ItInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'extra-ue') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return DAZIO_PCT;
}

export function calcIt(i: ItInput): ItResult {
  const note: string[] = [];
  const prezzo = Math.max(0, i.prezzoEUR);
  const nolo = Math.max(0, i.noloEUR);
  const dest = Math.max(0, i.speseDestinazioneEUR);
  const extra = i.route === 'extra-ue';
  const valoreDogana = extra ? prezzo + nolo : prezzo;

  const dazioPct = dazioRate(i);
  const cvdPct = extra && i.origin === 'cn_bev' ? Math.max(0, i.cvdPct) : 0;
  const dazio = (valoreDogana * dazioPct) / 100;
  const cvd = (valoreDogana * cvdPct) / 100;
  if (extra) {
    if (i.origin === 'cn_bev') note.push('Auto elettriche cinesi: dazio del 10 % più dazio compensativo in base al costruttore.');
    if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && !i.hasOriginProof) note.push('Senza una prova di origine valida si applica il dazio normale del 10 %.');
    if (i.origin === 'us' && i.hasOriginProof) note.push('Stati Uniti: 0 % dal 1° luglio 2026 (Regolamento (UE) 2026/1455), solo per auto di origine statunitense con trasporto diretto provato.');
    if (i.origin === 'jp' && i.hasOriginProof) note.push('Giappone: 0 % dal 1° febbraio 2026 (accordo di partenariato UE-Giappone), con prova di origine.');
  }

  const ivaApplica = extra || i.nuovoUE;
  const ivaBase = extra ? valoreDogana + dazio + cvd + dest : prezzo + nolo;
  const iva = ivaApplica ? (ivaBase * IVA_PCT) / 100 : 0;
  if (!extra) note.push(i.nuovoUE
    ? 'Veicolo nuovo ai fini IVA (meno di 6 mesi o meno di 6.000 km): IVA italiana del 22 %, anche se acquistato da un privato.'
    : 'Usata UE (oltre 6 mesi e oltre 6.000 km): nessuna IVA italiana se l’imposta è già stata assolta nel Paese di acquisto.');

  const base = iptBase(i.kw);
  const magg = Math.min(30, Math.max(0, i.maggiorazioneProvPct));
  const ipt = Math.round(base * (1 + magg / 100) * 100) / 100;
  const tasseTotale = dazio + cvd + iva + ipt + SPESE_FISSE;
  const totale = prezzo + nolo + (extra ? dest : 0) + tasseTotale + Math.max(0, i.altreSpeseEUR);

  const lines: ItLine[] = [];
  if (extra) lines.push({ key: 'dazio', label: 'Dazio doganale', pct: dazioPct, amount: dazio });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Dazio compensativo (Cina, EV)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'iva', label: extra ? 'IVA all’importazione' : 'IVA italiana', pct: ivaApplica ? IVA_PCT : 0, amount: iva });
  lines.push({ key: 'ipt', label: `IPT (maggiorazione provinciale ${magg} %)`, amount: ipt });
  lines.push({ key: 'fisse', label: 'Spese fisse di immatricolazione (ACI, Motorizzazione, bolli)', amount: SPESE_FISSE });

  return { valoreDogana, dazio, dazioPct, cvd, ivaBase, iva, ivaPct: IVA_PCT, iptBase: base, ipt, speseFisse: SPESE_FISSE, tasseTotale, totale, lines, note };
}
