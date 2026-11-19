'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcBr, AFRMM_PCT, COFINS_PCT, ICMS_PCT, II_PCT, PIS_PCT } from '@/lib/br-import-duty';

type Cur = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY' | 'KRW' | 'CAD' | 'MXN' | 'AUD' | 'BRL';
const CURRENCIES: Cur[] = ['USD', 'EUR', 'JPY', 'GBP', 'CNY', 'KRW', 'CAD', 'MXN', 'AUD', 'BRL'];
// Valores aproximados (unidades por 1 USD), usados apenas se a cotação ao vivo não carregar.
const FALLBACK: Record<Cur, number> = { USD: 1, EUR: 0.86, JPY: 150, GBP: 0.75, CNY: 7.15, KRW: 1405, CAD: 1.38, MXN: 18.5, AUD: 1.53, BRL: 5.5 };

const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const usd = (n: number) => 'US$ ' + n.toLocaleString('pt-BR', { maximumFractionDigits: 0 });
const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n >= 0 ? n : 0;
};
const pctPt = (n: number) => n.toLocaleString('pt-BR', { maximumFractionDigits: 2 });

export default function CalculadoraImportacaoBrasilClient() {
  const [cur, setCur] = useState<Cur>('USD');
  const [fob, setFob] = useState('12000');
  const [freight, setFreight] = useState('1200');
  const [ii, setIi] = useState(String(II_PCT));
  const [ipi, setIpi] = useState('13');
  const [pis, setPis] = useState(String(PIS_PCT).replace('.', ','));
  const [cofins, setCofins] = useState(String(COFINS_PCT).replace('.', ','));
  const [icms, setIcms] = useState(String(ICMS_PCT));
  const [afrmm, setAfrmm] = useState(true);
  const [other, setOther] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.BRL) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('pt-BR'));
      }
    } catch { /* mantém a cotação de reserva */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const perUsd = rates[cur];
  const fobUSD = toNum(fob) / perUsd;
  const freteUSD = toNum(freight) / perUsd;
  const usdToBrl = rates.BRL;

  const res = useMemo(() => {
    if (fobUSD <= 0) return null;
    return calcBr({ fobUSD, freteUSD, usdToBrl, iiPct: toNum(ii), ipiPct: toNum(ipi), pisPct: toNum(pis), cofinsPct: toNum(cofins), icmsPct: toNum(icms), afrmmAtivo: afrmm, outrasDespesasBRL: toNum(other) });
  }, [fobUSD, freteUSD, usdToBrl, ii, ipi, pis, cofins, icms, afrmm, other]);

  const reset = () => { setCur('USD'); setFob('12000'); setFreight('1200'); setIi(String(II_PCT)); setIpi('13'); setPis('2,1'); setCofins('9,65'); setIcms(String(ICMS_PCT)); setAfrmm(true); setOther(''); };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const chip = 'text-[11px] border border-border rounded-full px-2.5 py-1 hover:bg-muted text-muted-foreground';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculadora" lang="pt-BR">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Moeda</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Preço do carro (FOB)</label>
              <input className={field} inputMode="decimal" value={fob} onChange={(e) => setFob(e.target.value)} />
            </div>
          </div>
          <div>
            <label className={label}>Frete + seguro internacionais ({cur})</label>
            <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
          </div>
          <label className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={afrmm} onChange={(e) => setAfrmm(e.target.checked)} className="mt-0.5" />
            <span>Frete marítimo: incluir o AFRMM de {AFRMM_PCT} % sobre o frete</span>
          </label>

          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">Alíquotas (você pode ajustar)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Imposto de Importação (%)</label>
                <input className={field} inputMode="decimal" value={ii} onChange={(e) => setIi(e.target.value)} />
                <p className="text-[11px] text-muted-foreground mt-1">35 % para carros de passeio, incluindo elétricos e híbridos desde 1º de julho de 2026.</p>
              </div>
              <div>
                <label className={label}>IPI (%)</label>
                <input className={field} inputMode="decimal" value={ipi} onChange={(e) => setIpi(e.target.value)} />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  <button type="button" className={chip} onClick={() => setIpi('7')}>até 1.0: 7</button>
                  <button type="button" className={chip} onClick={() => setIpi('13')}>1.0 a 2.0: 13</button>
                  <button type="button" className={chip} onClick={() => setIpi('25')}>gasolina &gt; 2.0: 25</button>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">O IPI depende do NCM, da cilindrada e do combustível na TIPI. Só 7 % e 25 % foram confirmados em duas fontes; confirme a alíquota do seu modelo.</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={label}>PIS (%)</label>
                <input className={field} inputMode="decimal" value={pis} onChange={(e) => setPis(e.target.value)} />
              </div>
              <div>
                <label className={label}>COFINS (%)</label>
                <input className={field} inputMode="decimal" value={cofins} onChange={(e) => setCofins(e.target.value)} />
              </div>
              <div>
                <label className={label}>ICMS do estado (%)</label>
                <input className={field} inputMode="decimal" value={icms} onChange={(e) => setIcms(e.target.value)} />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">PIS e COFINS usam as alíquotas gerais de 2,1 % e 9,65 %. A Lei 10.865 trata veículos da posição 87.03 em um parágrafo próprio, então confirme. O ICMS varia por estado, em geral entre 17 % e 20 %.</p>
          </div>

          <div>
            <label className={label}>Outras despesas (R$): taxa Siscomex, despachante, homologação, emplacamento</label>
            <input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>US$ 1 = R$ {usdToBrl.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}{live ? ` · cotação ao vivo ${live}` : ' · cotação de reserva'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Atualizar</button>
          </div>
          <p className="text-[11px] text-muted-foreground">A Receita Federal usa a taxa de câmbio do dia do registro da declaração, que pode diferir da cotação de mercado.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Custo estimado da importação</h2>
              <div className="space-y-2 text-sm">
                <Row k="Valor aduaneiro CIF (FOB + frete + seguro)" v={brl(res.cif)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctPt(l.pct)} %` : l.label} v={brl(l.amount)} />)}
                <Row k={`Tributos totais (${pctPt(res.tributosPct)} % do CIF)`} v={brl(res.tributos)} bold hi />
                <Row k="Custo total, tudo incluído" v={`${brl(res.total)} (${usd(res.totalUSD)})`} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                <li>O IPI incide sobre CIF + II. PIS e COFINS incidem só sobre o CIF.</li>
                <li>O ICMS é calculado “por dentro”: sobre {brl(res.icmsBase)}, que já inclui o próprio ICMS. Com {pctPt(toNum(icms))} % de alíquota, o peso real é de {pctPt(res.icmsEfetivoPct)} % sobre o valor sem ICMS.</li>
                <li>Não inclui: IPVA, licenciamento, seguro, frete interno nem a taxa de uso do Siscomex, que você pode somar em outras despesas.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Redefinir</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Imprimir</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Apenas uma estimativa. O valor definitivo é apurado pela Receita Federal e pela Secretaria da Fazenda do estado.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Informe o preço FOB para ver o cálculo.</div>
          )}
          <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            A importação de carros usados é proibida, salvo exceções como veículos de coleção com mais de 30 anos. Esta calculadora cobre carros novos. Todo carro importado precisa de homologação (CONTRAN, INMETRO e IBAMA).
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, bold, hi }: { k: string; v: string; bold?: boolean; hi?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${hi ? 'rounded-lg bg-emerald-500/10 px-3 py-2' : ''}`}>
      <span className={bold ? 'font-semibold text-foreground' : 'text-muted-foreground'}>{k}</span>
      <span className={`tabular-nums text-right ${bold ? 'font-bold text-foreground' : 'text-foreground'}`}>{v}</span>
    </div>
  );
}
