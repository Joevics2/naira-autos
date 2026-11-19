'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcTz, CPF_DEFAULT_PCT, DUTY_PCT, RDL_DEFAULT_PCT } from '@/lib/tz-import-duty';

type Cur = 'USD' | 'JPY' | 'EUR' | 'GBP' | 'AED' | 'THB' | 'CNY' | 'KRW' | 'ZAR' | 'TZS';
const CURRENCIES: Cur[] = ['USD', 'JPY', 'EUR', 'GBP', 'AED', 'THB', 'CNY', 'KRW', 'ZAR', 'TZS'];
// Approximate units per 1 USD, used only if the live rate cannot be loaded.
const FALLBACK: Record<Cur, number> = { USD: 1, JPY: 150, EUR: 0.86, GBP: 0.75, AED: 3.6725, THB: 33, CNY: 7.15, KRW: 1405, ZAR: 17.5, TZS: 2600 };

const tzs = (n: number) => 'TSh ' + Math.round(n).toLocaleString('en-TZ');
const usd = (n: number) => 'US$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
const toNum = (v: string) => { const n = parseFloat(v.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyTanzaniaClient() {
  const [cur, setCur] = useState<Cur>('USD');
  const [fob, setFob] = useState('6000');
  const [freight, setFreight] = useState('1000');
  const [cc, setCc] = useState('1500');
  const [year, setYear] = useState(2020);
  const [duty, setDuty] = useState(String(DUTY_PCT));
  const [rdl, setRdl] = useState(String(RDL_DEFAULT_PCT));
  const [cpf, setCpf] = useState(String(CPF_DEFAULT_PCT));
  const [other, setOther] = useState('');
  const [now, setNow] = useState(2026);
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { setNow(new Date().getFullYear()); }, []);
  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.TZS) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-GB'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const perUsd = rates[cur];
  const fobUSD = toNum(fob) / perUsd;
  const freightUSD = toNum(freight) / perUsd;
  const usdToTzs = rates.TZS;
  const years = useMemo(() => Array.from({ length: 31 }, (_, k) => now - k), [now]);

  const res = useMemo(() => {
    if (fobUSD <= 0) return null;
    return calcTz({
      fobUSD, freightUSD, usdToTzs, cc: toNum(cc), manufactureYear: year, arrivalYear: now,
      dutyPct: duty.trim() === '' ? DUTY_PCT : toNum(duty), rdlPct: rdl.trim() === '' ? RDL_DEFAULT_PCT : toNum(rdl), cpfPct: cpf.trim() === '' ? CPF_DEFAULT_PCT : toNum(cpf), otherCostsTZS: toNum(other),
    });
  }, [fobUSD, freightUSD, usdToTzs, cc, year, now, duty, rdl, cpf, other]);

  const reset = () => { setCur('USD'); setFob('6000'); setFreight('1000'); setCc('1500'); setYear(now - 6); setDuty(String(DUTY_PCT)); setRdl(String(RDL_DEFAULT_PCT)); setCpf(String(CPF_DEFAULT_PCT)); setOther(''); };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Car price (FOB)</label>
              <input className={field} inputMode="decimal" value={fob} onChange={(e) => setFob(e.target.value)} />
            </div>
          </div>
          <div>
            <label className={label}>Freight + insurance ({cur})</label>
            <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Engine size (cc)</label>
              <input className={field} inputMode="decimal" value={cc} onChange={(e) => setCc(e.target.value)} />
            </div>
            <div>
              <label className={label}>Year of manufacture</label>
              <select className={field} value={year} onChange={(e) => setYear(Number(e.target.value))}>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">Age is counted from the year of manufacture, not first registration. This calculator covers Mainland Tanzania only; Zanzibar has its own VAT and rules.</p>

          <div className="border-t border-border pt-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-foreground">Rates you can adjust</p>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className={label}>Import duty %</label>
                <input className={field} inputMode="decimal" value={duty} onChange={(e) => setDuty(e.target.value)} />
              </div>
              <div>
                <label className={label}>RDL %</label>
                <input className={field} inputMode="decimal" value={rdl} onChange={(e) => setRdl(e.target.value)} />
              </div>
              <div>
                <label className={label}>Processing fee %</label>
                <input className={field} inputMode="decimal" value={cpf} onChange={(e) => setCpf(e.target.value)} />
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground">Sources disagree on the RDL (1.5% in older guides and the Railways Act text, 2% in newer ones) and the customs processing fee (0.6% before July 2026, 1% after). Check your TRA assessment.</p>
          </div>

          <div>
            <label className={label}>Other costs (TSh): registration, clearing agent, inspection</label>
            <input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>US$1 = TSh {usdToTzs.toLocaleString('en-US', { maximumFractionDigits: 0 })}{live ? ` · live rate ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">TRA values the car in shillings at its own exchange rate, which can differ from the market rate.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="CIF value (price + freight + insurance)" v={tzs(res.cifTZS)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${l.pct}%` : l.label} v={tzs(l.amount)} />)}
                <Row k={`Total taxes and levies (${res.taxesPctOfCif.toFixed(1)}% of CIF)`} v={tzs(res.taxesTotal)} bold hi />
                <Row k="Total landed cost" v={`${tzs(res.totalTZS)} (${usd(res.totalUSD)})`} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>Both excise components are charged on CIF + import duty, and VAT on CIF + duty + excise.</li>
                <li>Not included: first registration fees, TBS inspection, port charges, clearing agent fees and insurance.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. TRA sets the final assessment on TANCIS.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a car price to see the calculation.</div>
          )}
          <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Tanzania drives on the left, so right-hand-drive cars are the norm. Many Japanese exporters refuse cars older than 8 years, and a pre-shipment inspection certificate is required.
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
