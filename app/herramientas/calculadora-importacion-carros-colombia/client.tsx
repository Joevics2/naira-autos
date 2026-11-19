'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcCo, type CoOrigin, type CoPowertrain } from '@/lib/co-import-duty';

type Cur = 'USD' | 'EUR' | 'JPY' | 'KRW' | 'CNY' | 'GBP' | 'MXN' | 'CAD' | 'AUD' | 'COP';
const CURRENCIES: Cur[] = ['USD', 'EUR', 'JPY', 'KRW', 'CNY', 'GBP', 'MXN', 'CAD', 'AUD', 'COP'];
// Valores aproximados (unidades por 1 USD), usados solo si no se puede cargar el tipo de cambio en vivo.
const FALLBACK: Record<Cur, number> = { USD: 1, EUR: 0.86, JPY: 150, KRW: 1405, CNY: 7.15, GBP: 0.75, MXN: 18.5, CAD: 1.38, AUD: 1.53, COP: 4000 };

const cop = (n: number) => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
const usd = (n: number) => 'US$' + n.toLocaleString('es-CO', { maximumFractionDigits: 0 });
const toNum = (v: string) => {
  const t = v.trim().replace(/\s/g, '');
  const normalized = t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : /^\d{1,3}(\.\d{3})+$/.test(t) ? t.replace(/\./g, '') : t;
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
const pctEs = (n: number) => n.toLocaleString('es-CO', { maximumFractionDigits: 1 });

export default function CalculadoraImportacionColombiaClient() {
  const [powertrain, setPowertrain] = useState<CoPowertrain>('ice');
  const [origin, setOrigin] = useState<CoOrigin>('mfn');
  const [tlc, setTlc] = useState('');
  const [arancelOv, setArancelOv] = useState('');
  const [ivaOv, setIvaOv] = useState('');
  const [cur, setCur] = useState<Cur>('USD');
  const [fob, setFob] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [otros, setOtros] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.COP) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('es-CO'));
      }
    } catch { /* se mantiene el tipo de reserva */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const perUsd = rates[cur];
  const fobUSD = toNum(fob) / perUsd;
  const fleteUSD = toNum(freight) / perUsd;
  const usdToCop = rates.COP;

  const res = useMemo(() => {
    if (fobUSD <= 0) return null;
    return calcCo({
      powertrain, origin, arancelTlcPct: tlc.trim() === '' ? null : toNum(tlc), arancelOverridePct: arancelOv.trim() === '' ? null : toNum(arancelOv),
      ivaOverridePct: ivaOv.trim() === '' ? null : toNum(ivaOv), fobUSD, fleteUSD, usdToCop, otrosGastosCOP: toNum(otros),
    });
  }, [powertrain, origin, tlc, arancelOv, ivaOv, fobUSD, fleteUSD, usdToCop, otros]);

  const reset = () => { setPowertrain('ice'); setOrigin('mfn'); setTlc(''); setArancelOv(''); setIvaOv(''); setCur('USD'); setFob('20000'); setFreight('1500'); setOtros(''); };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculadora" lang="es">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Motorización</label>
              <select className={field} value={powertrain} onChange={(e) => setPowertrain(e.target.value as CoPowertrain)}>
                <option value="ice">Gasolina o diésel</option>
                <option value="hev">Híbrido (HEV o PHEV)</option>
                <option value="bev">Eléctrico de batería</option>
              </select>
            </div>
            <div>
              <label className={label}>Origen del vehículo</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as CoOrigin)}>
                <option value="mfn">País sin TLC (China, Japón, India, Tailandia…)</option>
                <option value="us">Ensamblado en EE. UU. con certificado de origen</option>
                <option value="tlc">Otro país con TLC (ingresa el arancel)</option>
              </select>
            </div>
          </div>
          {origin === 'tlc' && (
            <div>
              <label className={label}>Arancel preferente del TLC (%)</label>
              <input className={field} inputMode="decimal" value={tlc} onChange={(e) => setTlc(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">Consulta la subpartida y el cronograma de desgravación de tu acuerdo en la DIAN o en MinComercio.</p>
            </div>
          )}
          <p className="text-[11px] text-muted-foreground">Cuenta el país donde se ensambló el carro, no el país donde lo compras. Solo se pueden importar vehículos nuevos del año modelo en curso o del siguiente.</p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Moneda</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Precio FOB del vehículo</label>
              <input className={field} inputMode="decimal" value={fob} onChange={(e) => setFob(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Flete + seguro ({cur})</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            <div>
              <label className={label}>Otros gastos (COP)</label>
              <input className={field} inputMode="decimal" placeholder="agencia, RUNT, homologación" value={otros} onChange={(e) => setOtros(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
            <div>
              <label className={label}>Arancel propio (%) — opcional</label>
              <input className={field} inputMode="decimal" placeholder="p. ej. 5 con cupo híbrido" value={arancelOv} onChange={(e) => setArancelOv(e.target.value)} />
            </div>
            <div>
              <label className={label}>IVA propio (%) — opcional</label>
              <input className={field} inputMode="decimal" placeholder="19 o 5" value={ivaOv} onChange={(e) => setIvaOv(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>US$1 = ${usdToCop.toLocaleString('es-CO', { maximumFractionDigits: 0 })} COP{live ? ` · tasa en vivo ${live}` : ' · tasa de reserva'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Actualizar</button>
          </div>
          <p className="text-[11px] text-muted-foreground">La DIAN usa la tasa representativa del mercado vigente en la semana de la declaración, que puede diferir de la tasa de mercado.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Costo estimado de la importación</h2>
              <div className="space-y-2 text-sm">
                <Row k="Valor CIF (FOB + flete + seguro)" v={`${cop(res.cifCOP)} (${usd(res.cifUSD)})`} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctEs(l.pct)} %` : l.label} v={cop(l.amount)} />)}
                <Row k={`Tributos totales (${pctEs(res.tributosPct)} % del CIF)`} v={cop(res.tributosCOP)} bold hi />
                <Row k="Costo total puesto en Colombia" v={`${cop(res.totalCOP)} (${usd(res.totalUSD)})`} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notas.map((n) => <li key={n}>{n}</li>)}
                <li>El IVA y el impuesto al consumo se calculan sobre el valor CIF más el arancel.</li>
                <li>No incluye: matrícula en el RUNT, SOAT, impuesto vehicular anual, honorarios de la agencia de aduanas ni el visto bueno ambiental de la ANLA.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Restablecer</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Imprimir</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Solo una estimación. La liquidación definitiva la hace la DIAN en la declaración de importación.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Ingresa el precio FOB para ver el cálculo.</div>
          )}
          <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Colombia prohíbe, por regla general, importar carros usados. Solo entran los nuevos, los clásicos de 35 años o más y algunos casos especiales como el de personas con discapacidad o el diplomático.
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
