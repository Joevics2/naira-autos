// Motor de cálculo puro para la calculadora de importación de coches a España (Península y Baleares).
// Fuera de la UE: valor en aduana (precio + flete + seguro hasta la frontera UE) x arancel 10 %,
// IVA 21 % sobre valor en aduana + arancel (+ gastos hasta el primer destino).
// UE: sin arancel; IVA español 21 % solo si el vehículo es nuevo (menos de 6 meses O menos de 6.000 km).
// Siempre: IEDMT (impuesto de matriculación) según CO2 oficial (Ley 38/1992, art. 70), base imponible
// según art. 69 y Orden anual de precios medios (depreciación del anexo IV), más tasa DGT.

export type EsRoute = 'fuera-ue' | 'ue';
export type EsOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';
export type EsCondition = 'nuevo' | 'usado';

export const ARANCEL_PCT = 10;
export const IVA_PCT = 21;
export const TASA_DGT = 99.77;

export function iedmtRate(co2: number, sinCo2: boolean): number {
  if (sinCo2) return 14.75;
  if (co2 <= 120) return 0;
  if (co2 < 160) return 4.75;
  if (co2 < 200) return 9.75;
  return 14.75;
}

export function epigrafe(co2: number, sinCo2: boolean): number {
  if (sinCo2) return 4;
  if (co2 <= 120) return 1;
  if (co2 < 160) return 2;
  if (co2 < 200) return 3;
  return 4;
}

/** Anexo IV de la Orden de precios medios: % por años de utilización (turismos y todoterrenos). */
export function depreciacionPct(years: number): number {
  const t: [number, number][] = [[1, 100], [2, 84], [3, 67], [4, 56], [5, 47], [6, 39], [7, 34], [8, 28], [9, 24], [10, 19], [11, 17], [12, 13]];
  for (const [max, pct] of t) if (years <= max) return pct;
  return 10;
}

export interface EsInput {
  route: EsRoute;
  origin: EsOrigin;
  hasOriginProof: boolean;
  cvdPct: number;
  precioEUR: number;        // precio de compra sin IVA
  fleteEUR: number;         // flete + seguro hasta la frontera UE (fuera UE) o transporte (UE)
  gastosDestinoEUR: number; // transporte hasta el primer lugar de destino en la UE (fuera UE)
  nuevoUE: boolean;         // compra UE: menos de 6 meses O menos de 6.000 km
  condicion: EsCondition;
  aniosUso: number;
  valorHaciendaEUR: number; // precio medio de Hacienda del modelo (primer año), 0 = no informado
  co2: number;
  sinCo2: boolean;
  tipoPropioPct: number;    // tipo autonómico del IEDMT para tu epígrafe, 0 = usar el estatal
  otrosGastosEUR: number;
}

export interface EsLine { key: string; label: string; pct?: number; amount: number }
export interface EsResult {
  valorAduana: number; aranceles: number; arancelPct: number; cvd: number; ivaBase: number; ivaPct: number; iva: number;
  epigrafe: number; iedmtPct: number; depreciacion: number; valorMercado: number; baseIedmt: number; iedmt: number;
  tasaDgt: number; impuestosTotal: number; total: number; lines: EsLine[]; notas: string[];
}

export function arancelRate(i: Pick<EsInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'fuera-ue') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return ARANCEL_PCT;
}

export function calcEs(i: EsInput): EsResult {
  const notas: string[] = [];
  const precio = Math.max(0, i.precioEUR);
  const flete = Math.max(0, i.fleteEUR);
  const destino = Math.max(0, i.gastosDestinoEUR);
  const fuera = i.route === 'fuera-ue';
  const valorAduana = fuera ? precio + flete : precio;

  const arancelPct = arancelRate(i);
  const cvdPct = fuera && i.origin === 'cn_bev' ? Math.max(0, i.cvdPct) : 0;
  const aranceles = (valorAduana * arancelPct) / 100;
  const cvd = (valorAduana * cvdPct) / 100;
  if (fuera) {
    if (i.origin === 'cn_bev') notas.push('Eléctricos chinos: 10 % de arancel más derecho compensatorio según el fabricante.');
    if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && !i.hasOriginProof) notas.push('Sin prueba de origen válida se aplica el arancel normal del 10 %.');
    if (i.origin === 'us' && i.hasOriginProof) notas.push('EE. UU.: 0 % desde el 1 de julio de 2026 (Reglamento (UE) 2026/1455), solo para vehículos de origen estadounidense con transporte directo acreditado.');
    if (i.origin === 'jp' && i.hasOriginProof) notas.push('Japón: 0 % desde el 1 de febrero de 2026 (acuerdo UE-Japón), con prueba de origen.');
  }

  const ivaPct = IVA_PCT;
  const ivaAplica = fuera || i.nuevoUE;
  const ivaBase = fuera ? valorAduana + aranceles + cvd + destino : precio + flete;
  const iva = ivaAplica ? (ivaBase * ivaPct) / 100 : 0;
  if (!fuera) notas.push(i.nuevoUE
    ? 'Vehículo nuevo a efectos de IVA (menos de 6 meses o menos de 6.000 km): IVA español del 21 %, incluso entre particulares.'
    : 'Usado de la UE (más de 6 meses y más de 6.000 km): sin IVA español si el impuesto ya se pagó en el país de compra.');

  const ep = epigrafe(i.co2, i.sinCo2);
  let iedmtPct = iedmtRate(i.co2, i.sinCo2);
  if (i.tipoPropioPct > 0 && iedmtPct > 0) { iedmtPct = i.tipoPropioPct; notas.push('Se aplica el tipo autonómico que has indicado.'); }
  if (i.sinCo2) notas.push('Sin emisiones de CO2 acreditadas, Hacienda aplica el tipo más alto (14,75 %).');
  if (!i.sinCo2 && i.co2 <= 0) notas.push('Emisiones de 0 g/km (eléctrico): exento del impuesto de matriculación.');

  let depreciacion = 100;
  let valorMercado = 0;
  let baseIedmt = 0;
  if (i.condicion === 'nuevo') {
    baseIedmt = fuera ? valorAduana + aranceles + cvd : precio;
    valorMercado = baseIedmt;
  } else {
    depreciacion = i.valorHaciendaEUR > 0 ? depreciacionPct(i.aniosUso) : 100;
    valorMercado = (i.valorHaciendaEUR > 0 ? i.valorHaciendaEUR : precio) * (depreciacion / 100);
    baseIedmt = valorMercado / (1 + IVA_PCT / 100 + iedmtPct / 100);
    if (i.valorHaciendaEUR <= 0) notas.push('Sin el precio medio de Hacienda, la base se estima con tu precio de compra: Hacienda puede comprobarla con sus tablas.');
  }
  const iedmt = (baseIedmt * iedmtPct) / 100;

  const impuestosTotal = aranceles + cvd + iva + iedmt;
  const total = precio + flete + (fuera ? destino : 0) + impuestosTotal + TASA_DGT + Math.max(0, i.otrosGastosEUR);

  const lines: EsLine[] = [];
  if (fuera) lines.push({ key: 'arancel', label: 'Arancel de aduanas', pct: arancelPct, amount: aranceles });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Derecho compensatorio (China, VE)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'iva', label: fuera ? 'IVA a la importación' : 'IVA español', pct: ivaAplica ? ivaPct : 0, amount: iva });
  lines.push({ key: 'iedmt', label: 'Impuesto de matriculación (IEDMT)', pct: iedmtPct, amount: iedmt });
  lines.push({ key: 'dgt', label: 'Tasa DGT de matriculación', amount: TASA_DGT });

  return { valorAduana, aranceles, arancelPct, cvd, ivaBase, ivaPct, iva, epigrafe: ep, iedmtPct, depreciacion, valorMercado, baseIedmt, iedmt, tasaDgt: TASA_DGT, impuestosTotal, total, lines, notas };
}
