// Motor de calculo puro para a calculadora de importacao de carros para o Brasil (apenas carros novos).
// II sobre o valor aduaneiro (CIF); IPI sobre CIF + II; PIS e COFINS-Importacao sobre o CIF;
// ICMS-Importacao "por dentro": base = (CIF + II + IPI + PIS + COFINS + AFRMM) / (1 - aliquota ICMS).
// AFRMM: 25 % do frete maritimo internacional (Lei 10.893/2004).

export const II_PCT = 35;
export const PIS_PCT = 2.1;
export const COFINS_PCT = 9.65;
export const AFRMM_PCT = 25;
export const ICMS_PCT = 18;

export interface BrInput {
  fobUSD: number;
  freteUSD: number;       // frete + seguro internacionais
  usdToBrl: number;
  iiPct: number;
  ipiPct: number;
  pisPct: number;
  cofinsPct: number;
  icmsPct: number;
  afrmmAtivo: boolean;    // frete maritimo
  outrasDespesasBRL: number;
}

export interface BrLine { key: string; label: string; pct?: number; amount: number }
export interface BrResult {
  cif: number; ii: number; ipi: number; pis: number; cofins: number; afrmm: number; icmsBase: number; icms: number; icmsEfetivoPct: number;
  tributos: number; tributosPct: number; total: number; totalUSD: number; lines: BrLine[];
}

export function calcBr(i: BrInput): BrResult {
  const fob = Math.max(0, i.fobUSD) * i.usdToBrl;
  const frete = Math.max(0, i.freteUSD) * i.usdToBrl;
  const cif = fob + frete;
  const ii = (cif * i.iiPct) / 100;
  const ipi = ((cif + ii) * i.ipiPct) / 100;
  const pis = (cif * i.pisPct) / 100;
  const cofins = (cif * i.cofinsPct) / 100;
  const afrmm = i.afrmmAtivo ? (frete * AFRMM_PCT) / 100 : 0;
  const rate = Math.min(0.99, Math.max(0, i.icmsPct / 100));
  const icmsBase = (cif + ii + ipi + pis + cofins + afrmm) / (1 - rate);
  const icms = icmsBase * rate;
  const tributos = ii + ipi + pis + cofins + afrmm + icms;
  const total = cif + tributos + Math.max(0, i.outrasDespesasBRL);
  const lines: BrLine[] = [
    { key: 'ii', label: 'Imposto de Importação (II)', pct: i.iiPct, amount: ii },
    { key: 'ipi', label: 'IPI sobre CIF + II', pct: i.ipiPct, amount: ipi },
    { key: 'pis', label: 'PIS-Importação', pct: i.pisPct, amount: pis },
    { key: 'cofins', label: 'COFINS-Importação', pct: i.cofinsPct, amount: cofins },
    { key: 'afrmm', label: 'AFRMM (25 % do frete marítimo)', amount: afrmm },
    { key: 'icms', label: 'ICMS-Importação (por dentro)', pct: i.icmsPct, amount: icms },
  ];
  return { cif, ii, ipi, pis, cofins, afrmm, icmsBase, icms, icmsEfetivoPct: rate < 1 ? (rate / (1 - rate)) * 100 : 0, tributos, tributosPct: cif > 0 ? (tributos / cif) * 100 : 0, total, totalUSD: i.usdToBrl > 0 ? total / i.usdToBrl : 0, lines };
}
