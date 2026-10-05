'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcPk, type PkFuel, type PkMode } from '@/lib/pk-import-duty';

type Cur = 'USD' | 'JPY' | 'GBP' | 'AED' | 'EUR' | 'CAD' | 'AUD' | 'PKR';
const CURRENCIES: Cur[] = ['USD', 'JPY', 'GBP', 'AED', 'EUR', 'CAD', 'AUD', 'PKR'];
// Approximate fallback (units per 1 USD), used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { USD: 1, JPY: 150, GBP: 0.75, AED: 3.6725, EUR: 0.86, CAD: 1.38, AUD: 1.52, PKR: 281 };

const pkr = (n: number) => 'Rs ' + Math.round(n).toLocaleString('en-PK');
const toNum = (v: string) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyPakistanClient() {
  const [mode, setMode] = useState<PkMode>('new');
  const [fuel, setFuel] = useState<PkFuel>('petrol');
  const [cc, setCc] = useState('1500');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('12000');
  const [freight, setFreight] = useState('1200');
  const [landing, setLanding] = useState(true);
  const [vatOn, setVatOn] = useState(true);
  const [vatPct, setVatPct] = useState('3');
  const [filer, setFiler] = useState(true);
  const [s148, setS148] = useState('3.5');
  const [extras, setExtras] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.PKR) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-PK'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const cifCur = toNum(price) + toNum(freight);
  const cifUSD = cifCur / rates[cur];
  const pkrPer = rates.PKR / rates[cur];

  const res = useMemo(() => {
    if (cifCur <= 0) return null;
    return calcPk({
      mode, fuel, cc: toNum(cc), cifUSD, avBasePKR: cifCur * pkrPer, applyLanding: landing,
      applyVat: vatOn, vatPct: toNum(vatPct), s148Pct: toNum(s148),
    });
  }, [mode, fuel, cc, cifUSD, cifCur, pkrPer, landing, vatOn, vatPct, s148]);

  const reset = () => {
    setMode('new'); setFuel('petrol'); setCc('1500'); setCur('USD'); setPrice('12000'); setFreight('1200');
    setLanding(true); setVatOn(true); setVatPct('3'); setFiler(true); setS148('3.5'); setExtras('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Import type</label>
              <select className={field} value={mode} onChange={(e) => setMode(e.target.value as PkMode)}>
                <option value="new">New car (CBU)</option>
                <option value="used">Used car, commercial import</option>
              </select>
            </div>
            <div>
              <label className={label}>Fuel / powertrain</label>
              <select className={field} value={fuel} onChange={(e) => setFuel(e.target.value as PkFuel)}>
                <option value="petrol">Petrol</option><option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option><option value="ev">Electric</option>
              </select>
            </div>
          </div>
          {fuel !== 'ev' && (
            <div className="w-1/2">
              <label className={label}>Engine capacity (cc)</label>
              <input className={field} inputMode="numeric" value={cc} onChange={(e) => setCc(e.target.value)} />
            </div>
          )}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div><label className={label}>Car price (FOB)</label><input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
            <div><label className={label}>Freight + insurance</label><input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} /></div>
          </div>

          <div className="space-y-2">
            <label className={check}><input type="checkbox" checked={landing} onChange={(e) => setLanding(e.target.checked)} className="mt-0.5" />Add 1% landing charge to CIF</label>
            <label className={check}><input type="checkbox" checked={vatOn} onChange={(e) => setVatOn(e.target.checked)} className="mt-0.5" />Commercial importer: value-addition tax</label>
            <label className={check}>
              <input type="checkbox" checked={filer} onChange={(e) => { setFiler(e.target.checked); setS148(e.target.checked ? '3.5' : '7'); }} className="mt-0.5" />
              Importer is on the Active Taxpayers List (filer)
            </label>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div><label className={label}>Value-addition tax (%)</label><input className={field} inputMode="decimal" value={vatPct} onChange={(e) => setVatPct(e.target.value)} /></div>
            <div><label className={label}>Advance tax s.148 (%)</label><input className={field} inputMode="decimal" value={s148} onChange={(e) => setS148(e.target.value)} /></div>
            <div><label className={label}>Port &amp; clearing (Rs)</label><input className={field} inputMode="decimal" value={extras} onChange={(e) => setExtras(e.target.value)} /></div>
          </div>
          <p className="text-[11px] text-muted-foreground">Advance-tax and value-addition rates vary by importer category and are editable. Defaults assume a commercial filer at 3.5% and 3%; non-filers pay about double.</p>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 {cur} = Rs {pkrPer.toFixed(2)}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Pakistan Customs uses its own notified exchange rate, which can differ from the market rate.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated Pakistan import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k={`CIF (${cur} ${Math.round(cifCur).toLocaleString('en-US')})`} v={pkr(cifCur * pkrPer)} />
                <Row k="Assessable value" v={pkr(res.av)} bold />
                {res.lines.map((l) => <Row key={l.key} k={`${l.label} — ${l.pct}%`} v={pkr(l.amount)} />)}
                <Row k="Total duties and taxes" v={pkr(res.totalTax)} bold hi />
                <Row k="Landed cost" v={pkr(res.landed + toNum(extras))} bold />
                <Row k="Duties and taxes as % of value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>Order of calculation: duties on value, excise on value plus duties, sales tax on all of that, then advance income tax on the total.</li>
                <li>Not included: provincial registration, token tax, number plates, insurance or dealer margin.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. Pakistan Customs makes the final assessment.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a car price to see the breakdown.</div>
          )}
          {mode === 'used' && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />
              Age rules for used imports have changed repeatedly. Reports say the five-year cap on commercial used imports ended in July 2026, while personal Gift, Baggage and Transfer-of-Residence imports keep a three-year limit and separate fixed-amount duties that this calculator does not cover.
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
