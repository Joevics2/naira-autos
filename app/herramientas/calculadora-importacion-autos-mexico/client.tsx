'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calcMx, type MxCondition, type MxNewOrigin, type MxZone } from '@/lib/mx-import-duty';

type Cur = 'USD' | 'MXN' | 'CAD' | 'EUR' | 'JPY' | 'KRW' | 'CNY';
const CURRENCIES: Cur[] = ['USD', 'MXN', 'CAD', 'EUR', 'JPY', 'KRW', 'CNY'];
// Valores aproximados (unidades por 1 USD), solo como respaldo si falla el tipo de cambio en vivo.
const FALLBACK: Record<Cur, number> = { USD: 1, MXN: 18.3, CAD: 1.38, EUR: 0.86, JPY: 150, KRW: 1400, CNY: 7.2 };

const mxn = (n: number) => n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
const toNum = (v: string) => { const n = parseFloat(v.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportacionAutosMexicoClient() {
  const thisYear = new Date().getFullYear();
  const [condition, setCondition] = useState<MxCondition>('usado');
  const [zone, setZone] = useState<MxZone>('interior');
  const [year, setYear] = useState(String(thisYear - 10));
  const [vin, setVin] = useState(true);
  const [tmec, setTmec] = useState(false);
  const [newOrigin, setNewOrigin] = useState<MxNewOrigin>('tmec');
  const [custom, setCustom] = useState('');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('8000');
  const [freight, setFreight] = useState('600');
  const [dta, setDta] = useState('0.8');
  const [otros, setOtros] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.MXN) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('es-MX'));
      }
    } catch { /* se mantiene el respaldo */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const mxnPer = rates.MXN / rates[cur];
  const cifMXN = (toNum(price) + toNum(freight)) * mxnPer;
  const my = Math.round(toNum(year));

  const res = useMemo(() => {
    if (cifMXN <= 0 || my < 1950) return null;
    return calcMx({
      condition, zone, modelYear: my, importYear: thisYear, vinNorthAmerica: vin, hasTmecCert: tmec,
      newOrigin, customRatePct: toNum(custom), cifMXN, dtaPct: toNum(dta), otrosMXN: toNum(otros),
    });
  }, [condition, zone, my, thisYear, vin, tmec, newOrigin, custom, cifMXN, dta, otros]);

  const reset = () => {
    setCondition('usado'); setZone('interior'); setYear(String(thisYear - 10)); setVin(true); setTmec(false);
    setNewOrigin('tmec'); setCustom(''); setCur('USD'); setPrice('8000'); setFreight('600'); setDta('0.8'); setOtros('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculadora" lang="es">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Tipo de vehículo</label>
              <select className={field} value={condition} onChange={(e) => setCondition(e.target.value as MxCondition)}>
                <option value="usado">Usado (decreto de importación)</option>
                <option value="nuevo">Nuevo</option>
              </select>
            </div>
            <div>
              <label className={label}>Año-modelo</label>
              <input className={field} inputMode="numeric" value={year} onChange={(e) => setYear(e.target.value)} />
            </div>
          </div>

          {condition === 'usado' ? (
            <div className="space-y-2">
              <div>
                <label className={label}>¿Dónde circulará el vehículo?</label>
                <select className={field} value={zone} onChange={(e) => setZone(e.target.value as MxZone)}>
                  <option value="interior">Resto del país</option>
                  <option value="frontera">Franja o región fronteriza</option>
                </select>
              </div>
              <label className={check}><input type="checkbox" checked={vin} onChange={(e) => setVin(e.target.checked)} className="mt-0.5" />El NIV (VIN) indica fabricación en México, Estados Unidos o Canadá</label>
            </div>
          ) : (
            <div className="space-y-2">
              <div>
                <label className={label}>País de fabricación</label>
                <select className={field} value={newOrigin} onChange={(e) => setNewOrigin(e.target.value as MxNewOrigin)}>
                  <option value="tmec">Estados Unidos, Canadá o México (T-MEC)</option>
                  <option value="sin_tlc">País sin tratado (China, India, Corea del Sur, Tailandia…)</option>
                  <option value="otro">Otro país con tratado (ingresar arancel)</option>
                </select>
              </div>
              {newOrigin === 'otro' && (
                <div className="w-1/2"><label className={label}>Arancel (%)</label><input className={field} inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} /></div>
              )}
            </div>
          )}
          {(condition === 'nuevo' && newOrigin === 'tmec') || condition === 'usado' ? (
            <label className={check}><input type="checkbox" checked={tmec} onChange={(e) => setTmec(e.target.checked)} className="mt-0.5" />Tengo certificado de origen T-MEC válido (arancel 0 %)</label>
          ) : null}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Moneda</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={label}>Precio del auto</label><input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div><label className={label}>Flete y seguro</label><input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} /></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>DTA (% del valor en aduana)</label>
              <input className={field} inputMode="decimal" value={dta} onChange={(e) => setDta(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">8 al millar = 0.8 %</p>
            </div>
            <div>
              <label className={label}>Agente aduanal, prevalidación y otros (MXN)</label>
              <input className={field} inputMode="decimal" value={otros} onChange={(e) => setOtros(e.target.value)} />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 {cur} = {mxnPer.toFixed(2)} MXN{live ? ` · en vivo ${live}` : ' · tipo de cambio de respaldo'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Actualizar</button>
          </div>
          <p className="text-[11px] text-muted-foreground">La aduana usa el tipo de cambio que publica el Banco de México en el Diario Oficial, que puede diferir ligeramente del de mercado.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <>
              {!res.eligible && (
                <div className="flex gap-2 rounded-xl border border-red-300/50 bg-red-50 dark:bg-red-500/10 p-3 text-xs text-red-800 dark:text-red-200">
                  <AlertTriangle className="h-4 w-4 flex-shrink-0" />{res.reason}
                </div>
              )}
              <div className="rounded-2xl border border-border bg-card p-5">
                <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Costo estimado de importación</h2>
                <div className="space-y-2 text-sm">
                  <Row k={`Valor en aduana (${cur} ${Math.round(toNum(price) + toNum(freight)).toLocaleString('es-MX')})`} v={mxn(cifMXN)} />
                  {res.lines.map((l) => <Row key={l.key} k={`${l.label} — ${l.pct}%`} v={mxn(l.amount)} />)}
                  <Row k="Total de impuestos y derechos" v={mxn(res.impuestos)} bold hi />
                  <Row k="Costo total con trámites" v={mxn(res.total)} bold />
                  <Row k="Impuestos como % del valor" v={res.efectivoPct.toFixed(1) + ' %'} />
                </div>
                <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                  {res.notas.map((n) => <li key={n}>{n}</li>)}
                  <li>El IVA se calcula sobre valor en aduana + arancel + DTA, es decir, también sobre el arancel.</li>
                  <li>No incluye ISAN (que puede aplicar a modelos recientes), placas, tenencia, verificación ni seguro.</li>
                </ul>
                <div className="flex gap-2 mt-4">
                  <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reiniciar</button>
                  <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Imprimir</button>
                </div>
                <p className="text-[11px] text-muted-foreground mt-3">Solo una estimación. La liquidación final la determina la aduana en el pedimento.</p>
              </div>
              {res.eligible && condition === 'usado' && (
                <div className="flex gap-2 rounded-xl border border-emerald-300/50 bg-emerald-50 dark:bg-emerald-500/10 p-3 text-xs text-emerald-800 dark:text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 flex-shrink-0" />Antigüedad: {res.antiguedad} años. El auto cumple el rango de antigüedad del decreto vigente hasta el 30 de noviembre de 2026.
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Ingresa el precio y el año-modelo para ver el desglose.</div>
          )}
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
