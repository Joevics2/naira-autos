'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// Niveles ilustrativos de enganche → tasa preferencial, siguiendo el patrón
// real de promociones BBVA (enganche 50% = tasa más baja, 30-40% = tasa
// intermedia, 20% = tasa estándar), dentro de su rango publicado
// (12.99%-18.99%). No son las cifras exactas de ningún banco en particular.
const NIVELES = [
  { key: 'alto',  label: 'Enganche 50%+', minEnganche: 50, tasa: 13.0 },
  { key: 'medio', label: 'Enganche 30-40%', minEnganche: 30, tasa: 15.5 },
  { key: 'bajo',  label: 'Enganche 20%', minEnganche: 20, tasa: 18.0 },
] as const;

const BANCOS = [
  { name: 'Afirme', note: 'La tasa más baja del mercado bancario: desde 11.90% (CAT desde 17.5%).', url: 'https://www.afirme.com/' },
  { name: 'BBVA — Crédito de Auto', note: 'Desde 12.99% para híbridos/eléctricos; tasa preferencial según tu enganche.', url: 'https://www.bbva.mx/personas/productos/creditos/credito-auto.html' },
  { name: 'Banorte — AutoEstrene', note: 'Desde 13.49% con nómina domiciliada en Banorte.', url: 'https://www.banorte.com/' },
  { name: 'Santander México', note: 'Crédito automotriz con simulador en línea.', url: 'https://www.santander.com.mx/' },
  { name: 'HSBC México', note: 'Financiamiento automotriz, tasa fija durante todo el crédito.', url: 'https://www.hsbc.com.mx/' },
  { name: 'CONDUSEF — Simulador oficial', note: 'Compara el CAT real de distintas opciones antes de decidir.', url: 'https://www.condusef.gob.mx/' },
];

function fmtMXN(n: number) { return n.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }); }

export default function CreditoAutomotrizMexicoClient() {
  const [precio, setPrecio] = useState('350000');
  const [enganche, setEnganche] = useState('105000');
  const [nivel, setNivel] = useState<typeof NIVELES[number]['key'] | null>('medio');
  const [tasa, setTasa] = useState('15.5');
  const [plazoMeses, setPlazoMeses] = useState('48');
  const [ingresoNeto, setIngresoNeto] = useState('');
  const [mostrarBancos, setMostrarBancos] = useState(false);

  const pickNivel = (key: typeof NIVELES[number]['key']) => {
    setNivel(key);
    setTasa(String(NIVELES.find(n => n.key === key)!.tasa));
  };

  const calc = useMemo(() => {
    const p = parseFloat(precio) || 0;
    const e = parseFloat(enganche) || 0;
    const t = parseFloat(tasa) || 0;
    const m = parseInt(plazoMeses) || 0;
    const ingreso = parseFloat(ingresoNeto) || 0;
    if (p <= 0 || m <= 0 || t < 0) return null;
    const monto = Math.max(p - e, 0);
    const mr = t / 100 / 12;
    const mensualidad = mr === 0 ? monto / m : (monto * mr * Math.pow(1 + mr, m)) / (Math.pow(1 + mr, m) - 1);
    const totalPagado = mensualidad * m + e;
    const interesTotal = mensualidad * m - monto;
    return {
      mensualidad, totalPagado, interesTotal, monto,
      enganchePct: p > 0 ? (e / p) * 100 : 0,
      proporcionIngreso: ingreso > 0 ? mensualidad / ingreso : 0,
      ingreso, e,
    };
  }, [precio, enganche, tasa, plazoMeses, ingresoNeto]);

  const reset = () => {
    setPrecio('350000'); setEnganche('105000'); setNivel('medio'); setTasa('15.5');
    setPlazoMeses('48'); setIngresoNeto('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Entradas ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Precio del Vehículo (MXN, incl. IVA) <span className="text-red-500">*</span></label>
              <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="350000" className={iCls} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Enganche</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.enganchePct.toFixed(0)}%</span>}
              </div>
              <input type="number" value={enganche} onChange={e => setEnganche(e.target.value)} placeholder="105000" className={iCls} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Tasa según tu Enganche</label>
                <span className="text-xs text-muted-foreground">Patrón BBVA</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {NIVELES.map(n => (
                  <button key={n.key} onClick={() => pickNivel(n.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${nivel === n.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{n.label}</span>
                    <span className={nivel === n.key ? 'text-white/80' : 'text-muted-foreground/70'}>{n.tasa}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={tasa} onChange={e => { setTasa(e.target.value); setNivel(null); }} step="0.01" min="0" max="30" className={`${iCls} pl-4 pr-14`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% anual</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Plazo</label>
                <div className="grid grid-cols-3 gap-1">
                  {[12, 24, 36, 48, 60, 72].map(t => (
                    <button key={t} onClick={() => setPlazoMeses(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${plazoMeses === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}m
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Ingreso Neto Mensual <span className="text-muted-foreground font-normal">(opcional)</span></label>
                <input type="number" value={ingresoNeto} onChange={e => setIngresoNeto(e.target.value)} placeholder="28000" className={iCls} />
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Restablecer
            </button>
          </div>

          {/* ── Resultado ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-emerald-500/50" />
                </div>
                <p className="text-sm text-muted-foreground">Completa los campos — el resultado se actualiza al instante.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Mensualidad</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtMXN(calc.mensualidad)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{plazoMeses} meses \u00b7 {tasa}% anual</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Monto Financiado</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtMXN(calc.monto)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Interés Total</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtMXN(calc.interesTotal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Pagado</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtMXN(calc.totalPagado)}</p>
                  </div>
                </div>

                {plazoMeses === '72' && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Varias guías financieras recomiendan evitar los 72 meses y preferir 36-48 \u2014 el costo total en intereses sube de forma importante.</p>
                  </div>
                )}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">Compara siempre el CAT (Costo Anual Total), no solo esta tasa nominal \u2014 usa el simulador oficial de CONDUSEF.</p>
                </div>

                {calc.ingreso > 0 && (
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Mensualidad / Ingreso Neto</p>
                      <p className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.proporcionIngreso * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(calc.proporcionIngreso * 300, 100)}%` }} />
                    </div>
                  </div>
                )}

                <button onClick={() => setMostrarBancos(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Bancos y financieras en México</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${mostrarBancos ? 'rotate-180' : ''}`} />
                </button>
                {mostrarBancos && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Crédito Automotriz \u2014 México</p>
                    </div>
                    <div className="divide-y divide-border">
                      {BANCOS.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group gap-3">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link prefetch={false} href="/vehicles" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Ver vehículos</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link prefetch={false} href="/herramientas/decodificador-de-vin" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Verificar VIN</p>
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
