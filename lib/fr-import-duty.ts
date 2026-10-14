// Moteur de calcul pur pour le calculateur d'importation de voiture en France.
// Hors UE : valeur en douane (prix + fret + assurance jusqu'a la frontiere UE) x droit de douane (10 %),
// TVA 20 % sur valeur en douane + droit (+ frais jusqu'au premier lieu de destination).
// UE : aucun droit ; TVA francaise 20 % seulement si vehicule neuf (moins de 6 mois OU moins de 6 000 km).
// Dans tous les cas : malus CO2 + malus masse a la premiere immatriculation en France (bareme de l'annee de
// premiere immatriculation, decote d'anciennete pour les occasions importees), puis carte grise.
// Sources : service-public.gouv.fr fiches F35947 et F35950, CIBS art. L421-58 et suivants.

export type FrRoute = 'hors-ue' | 'ue' | 'collection' | 'demenagement';
export type FrOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';
export type FrApproval = 'wltp' | 'nedc' | 'none';
export type FrEnergy = 'thermique' | 'hev' | 'micro' | 'phev' | 'bev';
export type FrScaleKey = '2026' | '2025b' | '2024' | '2023' | '2022' | '2021';

export const DUTY_PCT = 10;
export const TVA_PCT = 20;
export const TVA_COLLECTION_PCT = 5.5;
export const FIXED_FEES = 11 + 2.76; // taxe de gestion + redevance d'acheminement

// Sequence du bareme CO2 depuis le seuil : 2024 a 2026 (identique jusqu'au plafond)
const SEQ_A = [50, 75, 100, 125, 150, 170, 190, 210, 230, 240, 260, 280, 310, 330, 360, 400, 450, 540, 650, 740, 818, 898, 983, 1074, 1172, 1276, 1386, 1504, 1629, 1761, 1901, 2049, 2205, 2370, 2544, 2726, 2918, 3119, 3331, 3552, 3784, 4026, 4279, 4543, 4818, 5105, 5404, 5715, 6126, 6537, 7248, 7959, 8770, 9681, 10692, 11803, 13014, 14325, 15736, 17247, 18858, 20569, 22380, 24291, 26302, 28413, 30624, 32935, 35346, 37857, 40468, 43179, 45990, 48901, 51912, 55023, 58134, 61245, 64356, 67467, 70578, 73689, 76800, 79911];
// Sequence 2021 a 2023 (et NEDC)
const SEQ_B = [50, 75, 100, 125, 150, 170, 190, 210, 230, 240, 260, 280, 310, 330, 360, 400, 450, 540, 650, 740, 818, 898, 983, 1074, 1172, 1276, 1386, 1504, 1629, 1761, 1901, 2049, 2205, 2370, 2544, 2726, 2918, 3119, 3331, 3552, 3784, 4026, 4279, 4543, 4818, 5105, 5404, 5715, 6039, 6375, 6724, 7086, 7462, 7851, 8254, 8671, 9103, 9550, 10011, 10488, 10980, 11488, 12012, 12552, 13109, 13682, 14273, 14881, 15506, 16149, 16810, 17490, 18188, 18905, 19641, 20396, 21171, 21966, 22781, 23616, 24472, 25349, 26247, 27166, 28107, 29070, 30056, 31063, 32094, 33147, 34224, 35324, 36447, 37595, 38767, 39964, 41185, 42431, 43703, 45000, 46323, 47672, 49047];

interface Co2Scale { threshold: number; seq: number[]; cap: number }
const CO2_WLTP: Record<FrScaleKey, Co2Scale> = {
  '2026': { threshold: 108, seq: SEQ_A.slice(0, 84), cap: 80000 },
  '2025b': { threshold: 113, seq: SEQ_A.slice(0, 80), cap: 70000 },
  '2024': { threshold: 118, seq: SEQ_A.slice(0, 76), cap: 60000 },
  '2023': { threshold: 123, seq: SEQ_B.slice(0, 103), cap: 50000 },
  '2022': { threshold: 128, seq: SEQ_B.slice(0, 96), cap: 40000 },
  '2021': { threshold: 133, seq: SEQ_B.slice(0, 86), cap: 30000 },
};
const CO2_NEDC: Co2Scale = { threshold: 110, seq: SEQ_B.slice(0, 75), cap: 20000 };

// Puissance administrative (vehicules sans reception UE) : [CV minimum, montant], plafond au dernier palier
const CV_SCALE: Record<FrScaleKey, { min: number; rows: [number, number][] }> = {
  '2026': { min: 3, rows: [[3, 500], [4, 2000], [5, 4750], [6, 7500], [7, 10250], [8, 15250], [9, 21250], [10, 29000], [11, 36000], [12, 44000], [13, 52750], [14, 62500], [15, 80000]] },
  '2025b': { min: 3, rows: [[3, 250], [4, 1500], [5, 4000], [6, 6250], [7, 8500], [8, 13000], [9, 18500], [10, 25750], [11, 32250], [12, 39750], [13, 48000], [14, 57250], [15, 70000]] },
  '2024': { min: 4, rows: [[4, 1000], [5, 3250], [6, 5000], [7, 6750], [8, 10750], [9, 15750], [10, 22500], [11, 28500], [12, 35500], [13, 43250], [14, 52000], [15, 60000]] },
  '2023': { min: 4, rows: [[4, 500], [5, 2250], [6, 3500], [7, 4750], [8, 6500], [9, 8000], [10, 9500], [11, 11500], [12, 12750], [13, 14500], [14, 16000], [15, 18750], [16, 20500], [17, 23000], [18, 25500], [19, 28000], [20, 30500], [21, 33000], [22, 35500], [23, 38000], [24, 40000], [25, 42500], [26, 45000], [27, 47500], [28, 50000]] },
  '2022': { min: 5, rows: [[5, 1000], [6, 3000], [7, 4000], [8, 6000], [9, 7000], [10, 9250], [11, 10500], [12, 12500], [13, 13500], [14, 15625], [15, 16500], [16, 19250], [17, 21000], [18, 23500], [19, 26000], [20, 28500], [21, 31000], [22, 33500], [23, 36000], [24, 38500], [25, 40000]] },
  '2021': { min: 5, rows: [[5, 250], [6, 2825], [7, 3425], [8, 5950], [9, 6550], [10, 9075], [11, 9675], [12, 12200], [13, 12800], [14, 15325], [15, 15925], [16, 18450], [17, 19150], [18, 22500], [19, 25000], [20, 27500], [21, 30000]] },
};

// Decote d'anciennete (art. L421-7-2 CIBS) : [mois maximum de la tranche, %]
const DECOTE: [number, number][] = [[3, 3], [6, 6], [9, 9], [12, 12], [18, 16], [24, 20], [36, 28], [48, 33], [60, 38], [72, 43], [84, 48], [96, 53], [108, 58], [120, 64], [132, 70], [144, 76], [156, 82], [168, 88], [180, 94]];

export function decotePct(ageMonths: number): number {
  if (ageMonths <= 0) return 0;
  for (const [max, pct] of DECOTE) if (ageMonths <= max) return pct;
  return 100;
}

export function ageInMonths(firstYear: number, firstMonth: number, regYear: number, regMonth: number): number {
  return Math.max(0, (regYear - firstYear) * 12 + (regMonth - firstMonth));
}

/** Bareme applicable selon la date de premiere immatriculation ; null = avant 2015 (malus nul) ou 2015-2020 (saisie manuelle). */
export function scaleFor(year: number, month: number): FrScaleKey | 'pre2015' | 'manual' {
  if (year < 2015) return 'pre2015';
  if (year < 2021) return 'manual';
  if (year >= 2026) return '2026';
  if (year === 2025) return month >= 3 ? '2025b' : '2024';
  if (year === 2024) return '2024';
  return String(year) as FrScaleKey;
}

export function co2Malus(scale: FrScaleKey, approval: FrApproval, co2: number, cv: number): number {
  if (approval === 'none') {
    const t = CV_SCALE[scale];
    if (cv < t.min) return 0;
    let amount = 0;
    for (const [m, a] of t.rows) if (cv >= m) amount = a;
    return amount;
  }
  const s = approval === 'nedc' ? CO2_NEDC : CO2_WLTP[scale];
  const g = Math.floor(co2);
  if (g < s.threshold) return 0;
  const idx = g - s.threshold;
  return idx >= s.seq.length ? s.cap : s.seq[idx];
}

// Bareme de masse : tarif marginal par kilogramme, bornes incluses (voir exemple officiel : 1 900 a 1 950 kg = 51 kg).
const MASS_SCALES: Record<string, [number, number, number][]> = {
  s2026: [[1500, 1699, 10], [1700, 1799, 15], [1800, 1899, 20], [1900, 1999, 25], [2000, Infinity, 30]],
  s2425: [[1600, 1799, 10], [1800, 1899, 15], [1900, 1999, 20], [2000, 2099, 25], [2100, Infinity, 30]],
  s2223: [[1800, Infinity, 10]],
};
export function massMalus(scale: FrScaleKey, massKg: number): number {
  const rows = scale === '2026' ? MASS_SCALES.s2026 : scale === '2025b' || scale === '2024' ? MASS_SCALES.s2425 : scale === '2023' || scale === '2022' ? MASS_SCALES.s2223 : [];
  let total = 0;
  for (const [lo, hi, rate] of rows) {
    if (massKg >= lo) total += (Math.min(massKg, hi) - lo + 1) * rate;
  }
  return total;
}

/** Abattement de masse 2026 par motorisation (kg) : HEV 100, micro-hybride 100, PHEV 200 dans la limite de 15 % de la masse. */
export function defaultMassReduction(energy: FrEnergy, massKg: number): number {
  if (energy === 'hev' || energy === 'micro') return 100;
  if (energy === 'phev') return Math.min(200, 0.15 * massKg);
  return 0;
}

export interface FrInput {
  route: FrRoute;
  origin: FrOrigin;
  hasOriginProof: boolean;
  cvdPct: number;
  prixEUR: number;          // prix d'achat HT
  fretEUR: number;          // fret + assurance jusqu'a la frontiere UE (hors UE) ou transport (UE)
  fraisDestEUR: number;     // transport jusqu'au premier lieu de destination dans l'UE (hors UE)
  neufUE: boolean;          // achat UE : moins de 6 mois OU moins de 6 000 km
  firstYear: number;
  firstMonth: number;
  regYear: number;
  regMonth: number;
  approval: FrApproval;
  co2: number;
  cv: number;               // puissance administrative (P.6)
  massKg: number;           // masse en ordre de marche (case G)
  energy: FrEnergy;
  massReductionKg: number;
  manualMalusEUR: number;   // malus theorique saisi pour 2015-2020
  tarifCV: number;          // tarif regional du cheval fiscal (EUR)
  autresFraisEUR: number;
}

export interface FrLine { key: string; label: string; pct?: number; amount: number }
export interface FrResult {
  valeurDouane: number; dutyPct: number; duty: number; cvd: number; tvaBase: number; tvaPct: number; tva: number;
  scale: string; ageMonths: number; decote: number; malusCo2Brut: number; malusMasseBrut: number;
  malusCo2: number; malusMasse: number; malusTotal: number; carteGrise: number; taxeRegionale: number;
  taxesEtMalus: number; total: number; lines: FrLine[]; notes: string[];
}

export function dutyRate(i: Pick<FrInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'hors-ue') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return DUTY_PCT;
}

export function calcFr(i: FrInput): FrResult {
  const notes: string[] = [];
  const prix = Math.max(0, i.prixEUR);
  const fret = Math.max(0, i.fretEUR);
  const dest = Math.max(0, i.fraisDestEUR);
  const nonUE = i.route === 'hors-ue' || i.route === 'collection' || i.route === 'demenagement';
  const valeurDouane = nonUE ? prix + fret : prix;

  let dutyPct = dutyRate(i);
  let cvdPct = 0;
  let tvaPct = TVA_PCT;
  if (i.route === 'collection') { dutyPct = 0; tvaPct = TVA_COLLECTION_PCT; notes.push('Véhicule de collection (plus de 30 ans, état d’origine) : 0 % de droit et TVA réduite de 5,5 % à l’importation, sous réserve de reconnaissance par la douane.'); }
  else if (i.route === 'demenagement') { dutyPct = 0; tvaPct = 0; notes.push('Transfert de résidence : franchise de droits et de TVA sous conditions (résidence hors UE depuis au moins 12 mois, véhicule détenu et utilisé depuis au moins 6 mois). Le malus reste dû.'); }
  else if (i.route === 'hors-ue') {
    if (i.origin === 'cn_bev') { cvdPct = Math.max(0, i.cvdPct); notes.push('Voitures électriques chinoises : 10 % de droit plus droit compensateur selon le constructeur.'); }
    if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && !i.hasOriginProof) notes.push('Sans preuve d’origine valable, le droit normal de 10 % s’applique.');
    if (i.origin === 'us' && i.hasOriginProof) notes.push('États-Unis : 0 % depuis le 1er juillet 2026 (règlement (UE) 2026/1455), pour les véhicules d’origine américaine avec transport direct prouvé.');
    if (i.origin === 'jp' && i.hasOriginProof) notes.push('Japon : 0 % depuis le 1er février 2026 (accord de partenariat UE-Japon), avec preuve d’origine.');
  } else {
    tvaPct = i.neufUE ? TVA_PCT : 0;
    notes.push(i.neufUE ? 'Véhicule neuf au sens de la TVA (moins de 6 mois ou moins de 6 000 km) : TVA française de 20 %, même entre particuliers.' : 'Occasion UE (plus de 6 mois et plus de 6 000 km) : pas de TVA française si la taxe a déjà été payée dans le pays d’achat.');
  }

  const duty = (valeurDouane * dutyPct) / 100;
  const cvd = (valeurDouane * cvdPct) / 100;
  const tvaBase = nonUE ? valeurDouane + duty + cvd + dest : prix + fret;
  const tva = (tvaBase * tvaPct) / 100;

  // Malus
  const sc = scaleFor(i.firstYear, i.firstMonth);
  const ageMonths = ageInMonths(i.firstYear, i.firstMonth, i.regYear, i.regMonth);
  let malusCo2Brut = 0;
  let malusMasseBrut = 0;
  let cap = Infinity;
  const exempt = i.energy === 'bev';
  if (sc === 'pre2015') notes.push('Première immatriculation avant le 1er janvier 2015 : ni malus CO2 ni malus masse.');
  else if (exempt) notes.push('Véhicule 100 % électrique : exonéré de malus CO2 et de malus masse.');
  else if (sc === 'manual') {
    malusCo2Brut = Math.max(0, i.manualMalusEUR);
    notes.push('Première immatriculation entre 2015 et 2020 : saisissez le malus théorique de l’année d’origine (barème non intégré).');
  } else {
    malusCo2Brut = co2Malus(sc, i.approval, i.co2, i.cv);
    const m = Math.max(0, i.massKg - Math.max(0, i.massReductionKg));
    malusMasseBrut = massMalus(sc, m);
    cap = i.approval === 'nedc' ? CO2_NEDC.cap : i.approval === 'none' ? CV_SCALE[sc].rows[CV_SCALE[sc].rows.length - 1][1] : CO2_WLTP[sc].cap;
    if (sc === '2021') malusMasseBrut = 0;
  }
  const decote = sc === 'pre2015' ? 100 : decotePct(ageMonths);
  const co2Net = malusCo2Brut * (1 - decote / 100);
  const masseNet = malusMasseBrut * (1 - decote / 100);
  // plafond applique avant decote sur le cumul
  const brutCumule = Math.min(malusCo2Brut + malusMasseBrut, cap);
  const malusTotal = Math.round(brutCumule * (1 - decote / 100) * 100) / 100;
  const malusCo2 = Math.min(co2Net, malusTotal);
  const malusMasse = Math.round((malusTotal - malusCo2) * 100) / 100;
  void masseNet;

  // Carte grise
  const demi = ageMonths > 120;
  const taxeRegionale = Math.max(0, i.cv) * Math.max(0, i.tarifCV) * (demi ? 0.5 : 1);
  const carteGrise = taxeRegionale + FIXED_FEES;
  if (demi) notes.push('Véhicule de plus de 10 ans : taxe régionale réduite de moitié.');

  const taxesEtMalus = duty + cvd + tva + malusTotal + carteGrise;
  const total = prix + fret + (nonUE ? dest : 0) + taxesEtMalus + Math.max(0, i.autresFraisEUR);

  const lines: FrLine[] = [];
  if (nonUE) lines.push({ key: 'duty', label: 'Droit de douane', pct: dutyPct, amount: duty });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Droit compensateur (Chine, VE)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'tva', label: nonUE ? 'TVA à l’importation' : 'TVA française', pct: tvaPct, amount: tva });
  lines.push({ key: 'malusCo2', label: 'Malus CO2', amount: malusCo2 });
  lines.push({ key: 'malusMasse', label: 'Malus masse', amount: malusMasse });
  lines.push({ key: 'carteGrise', label: 'Carte grise (taxe régionale + frais fixes)', amount: carteGrise });

  return { valeurDouane, dutyPct, duty, cvd, tvaBase, tvaPct, tva, scale: String(sc), ageMonths, decote, malusCo2Brut, malusMasseBrut, malusCo2, malusMasse, malusTotal, carteGrise, taxeRegionale, taxesEtMalus, total, lines, notes };
}
