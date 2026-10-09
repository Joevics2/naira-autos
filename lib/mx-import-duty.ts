// Lógica pura del calculador de importación de autos a México.
// Valor en aduana = valor de transacción + incrementables (flete y seguro hasta la frontera).
// IGI (arancel) y DTA sobre el valor en aduana; IVA 16 % sobre valor en aduana + IGI + DTA.
// Usados (Decreto vigente hasta el 30-nov-2026, renovado el 5-nov-2025, SHCP 5-ene-2026):
//   resto del país: 10 % para año-modelo con 8 o más años de antigüedad;
//   franja/región fronteriza: 1 % de 5 a 9 años, 10 % con 10 años o más.
//   El NIV debe ser de fabricación en México, EE. UU. o Canadá; no se exige certificado de origen.
// Nuevos: T-MEC con certificado 0 %; sin certificado 20 %; países sin TLC (China, India, Corea del Sur...) hasta 50 % desde 2026.

export type MxCondition = 'usado' | 'nuevo';
export type MxZone = 'interior' | 'frontera';
export type MxNewOrigin = 'tmec' | 'sin_tlc' | 'otro';

export const IVA_PCT = 16;
export const DTA_PCT = 0.8; // 8 al millar

export interface MxInput {
  condition: MxCondition;
  zone: MxZone;
  modelYear: number;
  importYear: number;
  vinNorthAmerica: boolean;     // usados: NIV de México/EE. UU./Canadá
  hasTmecCert: boolean;         // certificado de origen T-MEC válido
  newOrigin: MxNewOrigin;
  customRatePct: number;        // nuevos, 'otro' origen
  cifMXN: number;               // valor en aduana (CIF) en pesos
  dtaPct: number;
  otrosMXN: number;
}

export interface MxLine { key: string; label: string; pct?: number; amount: number }
export interface MxResult {
  eligible: boolean; reason: string | null; antiguedad: number; igiPct: number;
  igi: number; dta: number; ivaBase: number; iva: number; impuestos: number; total: number;
  efectivoPct: number; lines: MxLine[]; notas: string[];
}

export function antiguedad(modelYear: number, importYear: number): number { return importYear - modelYear; }

export function usedRate(age: number, zone: MxZone): { pct: number; eligible: boolean } {
  if (zone === 'frontera') {
    if (age >= 10) return { pct: 10, eligible: true };
    if (age >= 5) return { pct: 1, eligible: true };
    return { pct: 0, eligible: false };
  }
  if (age >= 8) return { pct: 10, eligible: true };
  return { pct: 0, eligible: false };
}

export function calcMx(i: MxInput): MxResult {
  const notas: string[] = [];
  const age = antiguedad(i.modelYear, i.importYear);
  const va = Math.max(0, i.cifMXN);
  let igiPct = 0;
  let eligible = true;
  let reason: string | null = null;

  if (i.condition === 'usado') {
    if (i.hasTmecCert) {
      igiPct = 0; notas.push('Con certificado de origen T-MEC válido el arancel puede ser 0 %.');
    } else {
      const r = usedRate(age, i.zone);
      igiPct = r.pct; eligible = r.eligible;
      if (!r.eligible) reason = i.zone === 'frontera'
        ? 'Menos de 5 años de antigüedad: no es importable bajo el decreto de usados en la franja fronteriza.'
        : 'Menos de 8 años de antigüedad: no es importable bajo el decreto de usados en el resto del país.';
      if (!i.vinNorthAmerica) { eligible = false; reason = 'El NIV debe corresponder a fabricación en México, Estados Unidos o Canadá.'; }
      if (r.eligible) notas.push(i.zone === 'frontera' ? 'Región fronteriza: 1 % de 5 a 9 años, 10 % con 10 años o más.' : 'Resto del país: 10 % con 8 o más años de antigüedad.');
    }
  } else {
    if (i.newOrigin === 'tmec') igiPct = i.hasTmecCert ? 0 : 20;
    else if (i.newOrigin === 'sin_tlc') igiPct = 50;
    else igiPct = Math.max(0, i.customRatePct);
    if (i.newOrigin === 'tmec' && !i.hasTmecCert) notas.push('Sin certificado de origen T-MEC aplica el arancel general de 20 %.');
    if (i.newOrigin === 'sin_tlc') notas.push('Países sin tratado (China, India, Corea del Sur, Tailandia y otros): hasta 50 % desde el 1 de enero de 2026.');
  }

  const igi = (va * igiPct) / 100;
  const dta = (va * Math.max(0, i.dtaPct)) / 100;
  const ivaBase = va + igi + dta;
  const iva = (ivaBase * IVA_PCT) / 100;
  const impuestos = igi + dta + iva;
  const total = va + impuestos + Math.max(0, i.otrosMXN);

  const lines: MxLine[] = [
    { key: 'igi', label: 'Arancel (IGI)', pct: igiPct, amount: igi },
    { key: 'dta', label: 'Derecho de trámite aduanero (DTA)', pct: i.dtaPct, amount: dta },
    { key: 'iva', label: 'IVA', pct: IVA_PCT, amount: iva },
  ];
  return { eligible, reason, antiguedad: age, igiPct, igi, dta, ivaBase, iva, impuestos, total, efectivoPct: va > 0 ? (impuestos / va) * 100 : 0, lines, notas };
}
