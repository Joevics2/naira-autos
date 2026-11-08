'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcEs, depreciacionPct, type EsCondition, type EsOrigin, type EsRoute } from '@/lib/es-import-duty';

type Cur = 'EUR' | 'USD' | 'JPY' | 'GBP' | 'CHF' | 'KRW' | 'AED' | 'CAD' | 'AUD' | 'CNY';
const CURRENCIES: Cur[] = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'KRW', 'AED', 'CAD', 'AUD', 'CNY'];
// Valores aproximados (unidades por 1 EUR), solo como reserva si no se puede cargar el tipo en vivo.
const FALLBACK: Record<Cur, number> = { EUR: 1, USD: 1.16, JPY: 174, GBP: 0.87, CHF: 0.93, KRW: 1630, AED: 4.26, CAD: 1.6, AUD: 1.77, CNY: 8.3 };

const ORIGINS: { value: EsOrigin; label: string }[] = [
  { value: 'us', label: 'Estados Unidos (vehículo fabricado en EE. UU.)' },
  { value: 'jp', label: 'Japón' },
  { value: 'kr', label: 'Corea del Sur' },
  { value: 'uk', label: 'Reino Unido' },
  { value: 'cn_ice', label: 'China (gasolina, diésel o híbrido)' },
  { value: 'cn_bev', label: 'China (100 % eléctrico)' },
  { value: 'other', label: 'Otro país (Emiratos, Australia, Canadá…)' },
];
const CVD: { pct: number; label: string }[] = [
  { pct: 17, label: 'BYD – 17 %' },
  { pct: 18.8, label: 'Geely / Zeekr – 18,8 %' },
  { pct: 7.8, label: 'Tesla Shanghái – 7,8 %' },
  { pct: 20.7, label: 'Otros fabricantes cooperantes – 20,7 %' },
  { pct: 35.3, label: 'SAIC / MG y no cooperantes – 35,3 %' },
  { pct: 0, label: 'Compromiso de precios aceptado – 0 %' },
];

const eur = (n: number) => n.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' });
const toNum = (v: string) => { const n = parseFloat(v.replace(/\s/g, '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 0; };
const pctEs = (n: number) => n.toLocaleString('es-ES', { maximumFractionDigits: 2 });

export default function CalculadoraImportacionEspanaClient() {
  const [route, setRoute] = useState<EsRoute>('fuera-ue');
  const [origin, setOrigin] = useState<EsOrigin>('us');
  const [proof, setProof] = useState(true);
  const [cvd, setCvd] = useState('17');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [freight, setFreight] = useState('1500');
  const [dest, setDest] = useState('');
  const [nuevoUE, setNuevoUE] = useState(false);
  const [cond, setCond] = useState<EsCondition>('usado');
  const [years, setYears] = useState('3');
  const [hacienda, setHacienda] = useState('');
  const [co2, setCo2] = useState('140');
  const [sinCo2, setSinCo2] = useState(false);
  const [tipoPropio, setTipoPropio] = useState('');
  const [otros, setOtros] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/EUR');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('es-ES'));
      }
    } catch { /* se mantiene el tipo de reserva */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const rate = rates[cur];
  const precioEUR = toNum(price) / rate;
  const fleteEUR = toNum(freight) / rate;
  const fuera = route === 'fuera-ue';
  const usado = cond === 'usado';

  const res = useMemo(() => {
    if (precioEUR <= 0) return null;
    return calcEs({
      route, origin, hasOriginProof: proof, cvdPct: toNum(cvd), precioEUR, fleteEUR, gastosDestinoEUR: toNum(dest), nuevoUE,
      condicion: cond, aniosUso: toNum(years), valorHaciendaEUR: toNum(hacienda), co2: toNum(co2), sinCo2,
      tipoPropioPct: toNum(tipoPropio), otrosGastosEUR: toNum(otros),
    });
  }, [route, origin, proof, cvd, precioEUR, fleteEUR, dest, nuevoUE, cond, years, hacienda, co2, sinCo2, tipoPropio, otros]);

  const reset = () => {
    setRoute('fuera-ue'); setOrigin('us'); setProof(true); setCvd('17'); setCur('USD'); setPrice('20000'); setFreight('1500'); setDest('');
    setNuevoUE(false); setCond('usado'); setYears('3'); setHacienda(''); setCo2('140'); setSinCo2(false); setTipoPropio(''); setOtros('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const proofRelevant = fuera && ['us', 'jp', 'kr', 'uk'].includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculadora" lang="es">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Tipo de importación</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as EsRoute)}>
              <option value="fuera-ue">Compra fuera de la Unión Europea (arancel + IVA)</option>
              <option value="ue">Compra en la Unión Europea</option>
            </select>
          </div>

          {fuera && (
            <div>
              <label className={label}>País de fabricación del vehículo</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as EsOrigin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <p className="text-[11px] text-muted-foreground mt-1.5">Cuenta el país de fabricación, no el de compra.</p>
            </div>
          )}
          {proofRelevant && (
            <label className={check}>
              <input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />
              <span>Prueba de origen válida (0 % en lugar de 10 % de arancel)
                <span className="block text-[11px] text-muted-foreground">Para EE. UU. hay que acreditar también el transporte directo.</span></span>
            </label>
          )}
          {fuera && origin === 'cn_bev' && (
            <div>
              <label className={label}>Derecho compensatorio del fabricante</label>
              <select className={field} value={cvd} onChange={(e) => setCvd(e.target.value)}>
                {CVD.map((c) => <option key={c.label} value={c.pct}>{c.label}</option>)}
              </select>
            </div>
          )}
          {!fuera && (
            <label className={check}>
              <input type="checkbox" checked={nuevoUE} onChange={(e) => setNuevoUE(e.target.checked)} className="mt-0.5" />
              <span>Vehículo nuevo a efectos de IVA (menos de 6 meses O menos de 6.000 km)</span>
            </label>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Moneda</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Precio de compra (sin IVA)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{fuera ? `Flete + seguro hasta la frontera UE (${cur})` : `Transporte (${cur})`}</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {fuera && (
              <div>
                <label className={label}>Transporte hasta el destino en la UE (€)</label>
                <input className={field} inputMode="decimal" value={dest} onChange={(e) => setDest(e.target.value)} />
              </div>
            )}
          </div>

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">El vehículo (ficha técnica o certificado de conformidad)</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Estado</label>
                <select className={field} value={cond} onChange={(e) => setCond(e.target.value as EsCondition)}>
                  <option value="usado">Usado (ya matriculado en el extranjero)</option>
                  <option value="nuevo">Nuevo (sin matricular)</option>
                </select>
              </div>
              {usado && (
                <div>
                  <label className={label}>Años de uso</label>
                  <input className={field} inputMode="decimal" value={years} onChange={(e) => setYears(e.target.value)} />
                </div>
              )}
            </div>
            {usado && (
              <div>
                <label className={label}>Precio medio de Hacienda del modelo, primer año (€) — opcional</label>
                <input className={field} inputMode="decimal" value={hacienda} onChange={(e) => setHacienda(e.target.value)} />
                <p className="text-[11px] text-muted-foreground mt-1">Se encuentra en el anexo I de la Orden anual de precios medios. Si lo dejas vacío, se usa tu precio de compra como estimación.</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>Emisiones oficiales de CO2 (g/km)</label>
                <input className={field} inputMode="decimal" value={co2} onChange={(e) => setCo2(e.target.value)} disabled={sinCo2} />
              </div>
              <div>
                <label className={label}>Tipo autonómico del IEDMT (%) — opcional</label>
                <input className={field} inputMode="decimal" value={tipoPropio} onChange={(e) => setTipoPropio(e.target.value)} />
              </div>
            </div>
            <label className={check}>
              <input type="checkbox" checked={sinCo2} onChange={(e) => setSinCo2(e.target.checked)} className="mt-0.5" />
              <span>No puedo acreditar las emisiones de CO2 (coche sin homologación europea)</span>
            </label>
          </div>

          <div>
            <label className={label}>Otros gastos (€): homologación e ITV, gestoría, transitario</label>
            <input className={field} inputMode="decimal" value={otros} onChange={(e) => setOtros(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 EUR = {rate.toLocaleString('es-ES', { maximumFractionDigits: 3 })} {cur}{live ? ` · tipo en vivo ${live}` : ' · tipo de reserva'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Actualizar</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Aduanas usa el tipo de cambio oficial del mes, que puede diferir ligeramente del de mercado.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Coste estimado de la importación</h2>
              <div className="space-y-2 text-sm">
                <Row k={fuera ? 'Valor en aduana (precio + flete + seguro)' : 'Precio de compra (sin IVA)'} v={eur(res.valorAduana)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${pctEs(l.pct)} %` : l.label} v={eur(l.amount)} />)}
                <Row k="Impuestos y tasas" v={eur(res.impuestosTotal + res.tasaDgt)} bold hi />
                <Row k="Coste total todo incluido" v={eur(res.total)} bold />
                {usado && res.iedmtPct > 0 && <Row k={`Base del IEDMT (valor ${pctEs(res.depreciacion)} % ajustado)`} v={eur(res.baseIedmt)} />}
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notas.map((n) => <li key={n}>{n}</li>)}
                {fuera && <li>El IVA se calcula sobre el valor en aduana, el arancel y los gastos hasta el primer lugar de destino.</li>}
                {usado && <li>Depreciación aplicada: {depreciacionPct(toNum(years))} % según los años de uso (anexo IV de la Orden de precios medios).</li>}
                <li>No incluye: seguro, matrículas, impuesto de circulación municipal (IVTM) ni Canarias, Ceuta y Melilla, que tienen régimen distinto.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Restablecer</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Imprimir</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Solo una estimación. La liquidación definitiva la fijan la Agencia Tributaria y la DGT.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Introduce un precio de compra para ver el cálculo.</div>
          )}
          {fuera && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Un vehículo sin homologación europea necesita una homologación individual y una ITV específica, y a veces modificaciones (luces, cuentakilómetros en km/h). Añade esos costes en «Otros gastos».
            </div>
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
