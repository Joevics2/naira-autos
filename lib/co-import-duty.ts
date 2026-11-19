// Motor de calculo puro para la calculadora de importacion de carros a Colombia (solo vehiculos nuevos).
// Arancel sobre el valor CIF; IVA 19 % sobre CIF + arancel; impuesto nacional al consumo (INC) 8 % si el valor FOB
// es menor a US$30.000 y 16 % desde US$30.000, sobre CIF + arancel. Electricos: arancel 0 %, IVA 5 %, sin INC.
// Decreto 1432 del 24 de diciembre de 2025: arancel de 40 % para carros de gasolina y diesel (partida 8703).

export type CoPowertrain = 'ice' | 'hev' | 'bev';
export type CoOrigin = 'mfn' | 'us' | 'tlc';

export const ARANCEL_ICE_PCT = 40;
export const ARANCEL_HEV_PCT = 35;
export const IVA_PCT = 19;
export const IVA_ELECTRIFICADO_PCT = 5;
export const INC_BAJO_PCT = 8;
export const INC_ALTO_PCT = 16;
export const INC_UMBRAL_USD = 30000;

export interface CoInput {
  powertrain: CoPowertrain;
  origin: CoOrigin;
  arancelTlcPct: number | null;   // arancel preferente ingresado por el usuario (origen "otro TLC")
  arancelOverridePct: number | null; // reemplaza el arancel (p. ej. cupo de hibridos al 5 %)
  ivaOverridePct: number | null;
  fobUSD: number;                 // precio FOB del vehiculo
  fleteUSD: number;               // flete + seguro
  usdToCop: number;
  otrosGastosCOP: number;
}

export interface CoLine { key: string; label: string; pct?: number; amount: number }
export interface CoResult {
  cifUSD: number; cifCOP: number; arancelPct: number; arancel: number; baseCOP: number; ivaPct: number; iva: number;
  incPct: number; inc: number; tributosCOP: number; tributosPct: number; totalCOP: number; totalUSD: number; lines: CoLine[]; notas: string[];
}

export function arancelPct(i: Pick<CoInput, 'powertrain' | 'origin' | 'arancelTlcPct' | 'arancelOverridePct'>): number {
  if (i.arancelOverridePct != null && i.arancelOverridePct >= 0) return i.arancelOverridePct;
  if (i.powertrain === 'bev') return 0;
  if (i.origin === 'us') return 0;
  if (i.origin === 'tlc' && i.arancelTlcPct != null && i.arancelTlcPct >= 0) return i.arancelTlcPct;
  return i.powertrain === 'hev' ? ARANCEL_HEV_PCT : ARANCEL_ICE_PCT;
}

export function incPct(fobUSD: number, powertrain: CoPowertrain): number {
  if (powertrain === 'bev') return 0;
  return fobUSD < INC_UMBRAL_USD ? INC_BAJO_PCT : INC_ALTO_PCT;
}

export function calcCo(i: CoInput): CoResult {
  const notas: string[] = [];
  const fob = Math.max(0, i.fobUSD);
  const cifUSD = fob + Math.max(0, i.fleteUSD);
  const cifCOP = cifUSD * i.usdToCop;
  const pct = arancelPct(i);
  const arancel = (cifCOP * pct) / 100;
  const baseCOP = cifCOP + arancel;
  const ivaPct = i.ivaOverridePct != null && i.ivaOverridePct >= 0 ? i.ivaOverridePct : i.powertrain === 'ice' ? IVA_PCT : IVA_ELECTRIFICADO_PCT;
  const iva = (baseCOP * ivaPct) / 100;
  const inc_ = incPct(fob, i.powertrain);
  const inc = (baseCOP * inc_) / 100;

  if (i.arancelOverridePct != null && i.arancelOverridePct >= 0) notas.push('Arancel ingresado por ti. Confirma la subpartida y el cupo o el certificado de origen.');
  else if (i.powertrain === 'bev') notas.push('Eléctricos de batería: arancel 0 % sin límite (Decreto 2051 de 2019), IVA reducido y exentos del impuesto al consumo.');
  else if (i.origin === 'us') notas.push('Estados Unidos: arancel 0 % solo para vehículos ensamblados en EE. UU. con certificado de origen (TLC).');
  else if (i.powertrain === 'ice') notas.push('Gasolina o diésel de un país sin TLC: arancel de 40 % desde enero de 2026 (Decreto 1432 de 2025), antes 35 %.');
  else notas.push('Híbridos: arancel general de 35 %. El Decreto 0595 de 2026 abre un cupo de 5 % para híbridos; si lo obtienes, ingresa 5 % como arancel.');
  if (i.powertrain === 'hev') notas.push('El IVA del 5 % para híbridos proviene de una sola fuente; si tu partida lleva 19 %, corrígelo en el campo de IVA.');
  if (i.powertrain !== 'bev') notas.push(inc_ === INC_BAJO_PCT ? 'FOB menor a US$30.000: impuesto al consumo de 8 %.' : 'FOB de US$30.000 o más: impuesto al consumo de 16 %.');

  const tributosCOP = arancel + iva + inc;
  const totalCOP = cifCOP + tributosCOP + Math.max(0, i.otrosGastosCOP);
  const lines: CoLine[] = [
    { key: 'arancel', label: 'Arancel', pct, amount: arancel },
    { key: 'iva', label: 'IVA sobre CIF + arancel', pct: ivaPct, amount: iva },
    { key: 'inc', label: 'Impuesto nacional al consumo', pct: inc_, amount: inc },
  ];
  return { cifUSD, cifCOP, arancelPct: pct, arancel, baseCOP, ivaPct, iva, incPct: inc_, inc, tributosCOP, tributosPct: cifCOP > 0 ? (tributosCOP / cifCOP) * 100 : 0, totalCOP, totalUSD: i.usdToCop > 0 ? totalCOP / i.usdToCop : 0, lines, notas };
}
