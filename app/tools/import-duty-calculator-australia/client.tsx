'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calcAu, FTA_ORIGINS, type AuOrigin } from '@/lib/au-import-duty';

type Cur = 'AUD' | 'USD' | 'JPY' | 'GBP' | 'EUR' | 'KRW' | 'THB' | 'CNY';
const CURRENCIES: Cur[] = ['AUD', 'USD', 'JPY', 'GBP', 'EUR', 'KRW', 'THB', 'CNY'];
// Approximate fallback (units per 1 AUD), used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { AUD: 1, USD: 0.66, JPY: 99, GBP: 0.49, EUR: 0.57, KRW: 920, THB: 22, CNY: 4.75 };

const ORIGINS: { value: AuOrigin; label: string }[] = [
  { value: 'jp', label: 'Japan (JAEPA)' },
  { value: 'kr', label: 'South Korea (KAFTA)' },
  { value: 'th', label: 'Thailand (TAFTA)' },
  { value: 'us', label: 'United States (AUSFTA)' },
  { value: 'uk', label: 'United Kingdom (AUKFTA)' },
  { value: 'cn', label: 'China (ChAFTA)' },
  { value: 'cptpp', label: 'Canada, Mexico, Vietnam or other CPTPP member' },
  { value: 'eu', label: 'European Union (agreement not yet in force)' },
  { value: 'other', label: 'Any other country' },
];

const aud = (n: number) => n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 2 });
const toNum = (v: string) => { const n = parseFloat(v.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyAustraliaClient() {
  const year = new Date().getFullYear();
  const [origin, setOrigin] = useState<AuOrigin>('jp');
  const [proof, setProof] = useState(true);
  const [mfg, setMfg] = useState(String(year - 10));
  const [cur, setCur] = useState<Cur>('JPY');
  const [price, setPrice] = useState('2000000');
  const [freight, setFreight] = useState('');
  const [insurance, setInsurance] = useState('');
  const [efficient, setEfficient] = useState(false);
  const [other, setOther] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/AUD');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-AU'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const fobAUD = toNum(price) / rates[cur];
  const mfgY = Math.round(toNum(mfg));

  const res = useMemo(() => {
    if (fobAUD <= 0 || mfgY < 1900) return null;
    return calcAu({
      origin, hasProof: proof, mfgYear: mfgY, importYear: year, fobAUD,
      freightAUD: toNum(freight) / rates[cur], insuranceAUD: toNum(insurance) / rates[cur],
      fuelEfficient: efficient, otherCostsAUD: toNum(other),
    });
  }, [origin, proof, mfgY, year, fobAUD, freight, insurance, rates, cur, efficient, other]);

  const reset = () => {
    setOrigin('jp'); setProof(true); setMfg(String(year - 10)); setCur('JPY'); setPrice('2000000');
    setFreight(''); setInsurance(''); setEfficient(false); setOther('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';
  const fta = FTA_ORIGINS.includes(origin);

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Country where the car was built</label>
            <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as AuOrigin)}>
              {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <p className="text-[11px] text-muted-foreground mt-1.5">Origin is where the car was manufactured, not where you buy or ship it from.</p>
          </div>
          {fta && (
            <label className={check}><input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />I hold a valid proof of origin (0% instead of 5% duty)</label>
          )}
          <div className="w-1/2">
            <label className={label}>Year of manufacture</label>
            <input className={field} inputMode="numeric" value={mfg} onChange={(e) => setMfg(e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Car price (FOB)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>International freight ({cur})</label><input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} /></div>
            <div><label className={label}>Marine insurance ({cur})</label><input className={field} inputMode="decimal" value={insurance} onChange={(e) => setInsurance(e.target.value)} /></div>
          </div>
          <label className={check}><input type="checkbox" checked={efficient} onChange={(e) => setEfficient(e.target.checked)} className="mt-0.5" />Fuel-efficient: combined fuel use of 3.5 L/100 km or less (higher luxury tax threshold)</label>
          <div>
            <label className={label}>Compliance, VIA, broker, port and registration costs (A$, optional)</label>
            <input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 AUD = {rates[cur].toLocaleString('en-AU', { maximumFractionDigits: 3 })} {cur}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Border Force converts at the weekly rate it publishes, which can differ slightly from the market rate.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated Australian import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="FOB value" v={aud(fobAUD)} />
                <Row k="Value of taxable importation (FOB + duty + freight + insurance)" v={aud(res.voti)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${l.pct}%` : l.label} v={aud(l.amount)} />)}
                <Row k="Total duty and taxes" v={aud(res.taxes)} bold hi />
                <Row k="Total landed cost" v={aud(res.landed)} bold />
                <Row k="Duty and taxes as % of FOB value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>GST is charged on the duty-paid value plus international freight and insurance.</li>
                <li>Luxury Car Tax threshold used: {aud(res.lctThreshold)} (2026-27). Some guides say LCT does not apply to older used cars; confirm with Border Force or a broker.</li>
                <li>Not included: state stamp duty and registration, unless you enter them above.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. Australian Border Force makes the final assessment.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a price and manufacture year to see the breakdown.</div>
          )}

          {res && (
            <div className={`flex gap-2 rounded-xl border p-3 text-xs ${res.rule25 ? 'border-emerald-300/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' : 'border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 text-amber-800 dark:text-amber-200'}`}>
              {res.rule25 ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertTriangle className="h-4 w-4 flex-shrink-0" />}
              <p>
                {res.rule25
                  ? `Age ${res.age} years: eligible under the 25-year rule (built in ${year - 25} or earlier), subject to a Vehicle Import Approval (VIA) before shipping.`
                  : `Age ${res.age} years: under 25, so you need a SEVS-registered model, or the Personal Import Scheme if you owned and used the car overseas for 12+ months. A Vehicle Import Approval is required before shipping either way.`}
              </p>
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
