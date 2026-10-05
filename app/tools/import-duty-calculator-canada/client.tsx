'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calcCanada, type CaOrigin } from '@/lib/canada-import-duty';

type Cur = 'USD' | 'CAD' | 'EUR' | 'GBP' | 'JPY' | 'KRW' | 'AUD' | 'AED';
const CURRENCIES: Cur[] = ['USD', 'CAD', 'EUR', 'GBP', 'JPY', 'KRW', 'AUD', 'AED'];
// Approximate fallback (units per 1 USD), used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { USD: 1, CAD: 1.38, EUR: 0.86, GBP: 0.75, JPY: 150, KRW: 1400, AUD: 1.52, AED: 3.6725 };

const ORIGINS: { value: CaOrigin; label: string }[] = [
  { value: 'us', label: 'United States (built in the US)' },
  { value: 'mx', label: 'Mexico' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'eu', label: 'European Union (e.g. Germany, Italy)' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'cn', label: 'China' },
  { value: 'other', label: 'Any other country' },
];

// Typical provincial tax on a vehicle (provincial sales tax, or the provincial part of HST). Rates change; edit if yours differs.
const PROVINCES: { code: string; name: string; pct: number }[] = [
  { code: 'AB', name: 'Alberta', pct: 0 },
  { code: 'BC', name: 'British Columbia (graduated up to 20% on luxury)', pct: 7 },
  { code: 'SK', name: 'Saskatchewan', pct: 6 },
  { code: 'MB', name: 'Manitoba', pct: 7 },
  { code: 'ON', name: 'Ontario', pct: 8 },
  { code: 'QC', name: 'Quebec', pct: 9.975 },
  { code: 'NB', name: 'New Brunswick', pct: 10 },
  { code: 'NS', name: 'Nova Scotia', pct: 10 },
  { code: 'PE', name: 'Prince Edward Island', pct: 10 },
  { code: 'NL', name: 'Newfoundland and Labrador', pct: 10 },
  { code: 'YT', name: 'Yukon / NWT / Nunavut', pct: 0 },
];

const cad = (n: number) => 'C$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const toNum = (v: string) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ImportDutyCanadaClient() {
  const now = new Date();
  const [origin, setOrigin] = useState<CaOrigin>('us');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('30000');
  const [mfgYear, setMfgYear] = useState(String(now.getFullYear() - 2));
  const [mfgMonth, setMfgMonth] = useState(5);
  const [prov, setProv] = useState('ON');
  const [provPct, setProvPct] = useState('8');
  const [hasAC, setHasAC] = useState(true);
  const [fuel, setFuel] = useState('');
  const [proof, setProof] = useState(true);
  const [cnElec, setCnElec] = useState(true);
  const [cnQuota, setCnQuota] = useState(false);
  const [admissible, setAdmissible] = useState(true);
  const [extras, setExtras] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.CAD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-CA'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const yr = Math.round(toNum(mfgYear));
  const monthsOld = yr > 0 ? (now.getFullYear() - yr) * 12 + (now.getMonth() - mfgMonth) : 0;
  const fifteenOk = yr > 0 && monthsOld >= 180;
  const monthsTo15 = 180 - monthsOld;
  const cadPer = rates.CAD / rates[cur];
  const vfd = toNum(price) * cadPer;

  const res = useMemo(() => {
    if (vfd <= 0 || yr < 1900) return null;
    return calcCanada({
      origin, vfdCAD: vfd, monthsSinceManufacture: monthsOld, hasAC, fuelL100: toNum(fuel),
      provincialPct: toNum(provPct), hasProofOfOrigin: proof, chinaElectrified: cnElec, chinaInQuota: cnQuota,
      extrasCAD: toNum(extras),
    });
  }, [origin, vfd, yr, monthsOld, hasAC, fuel, provPct, proof, cnElec, cnQuota, extras]);

  const reset = () => {
    setOrigin('us'); setCur('USD'); setPrice('30000'); setMfgYear(String(now.getFullYear() - 2)); setMfgMonth(5);
    setProv('ON'); setProvPct('8'); setHasAC(true); setFuel(''); setProof(true); setCnElec(true); setCnQuota(false);
    setAdmissible(true); setExtras('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Country where the car was built</label>
            <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as CaOrigin)}>
              {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <p className="text-[11px] text-muted-foreground mt-1.5">Origin is where the car was manufactured, not where you bought it. Canada reads it from the VIN.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Price paid (before freight)</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Year of manufacture</label><input className={field} inputMode="numeric" value={mfgYear} onChange={(e) => setMfgYear(e.target.value)} /></div>
            <div>
              <label className={label}>Month of manufacture</label>
              <select className={field} value={mfgMonth} onChange={(e) => setMfgMonth(parseInt(e.target.value, 10))}>
                {MONTHS.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Province where you will register</label>
              <select className={field} value={prov} onChange={(e) => { setProv(e.target.value); const p = PROVINCES.find((x) => x.code === e.target.value); if (p) setProvPct(String(p.pct)); }}>
                {PROVINCES.map((p) => <option key={p.code} value={p.code}>{p.name}</option>)}
              </select>
            </div>
            <div><label className={label}>Provincial tax rate (%)</label><input className={field} inputMode="decimal" value={provPct} onChange={(e) => setProvPct(e.target.value)} /></div>
          </div>

          <div className="space-y-2">
            {['jp', 'kr', 'eu', 'uk'].includes(origin) && (
              <label className={check}><input type="checkbox" checked={proof} onChange={(e) => setProof(e.target.checked)} className="mt-0.5" />I have a valid proof of origin for the trade agreement (0% instead of 6.1%)</label>
            )}
            {origin === 'cn' && (
              <>
                <label className={check}><input type="checkbox" checked={cnElec} onChange={(e) => setCnElec(e.target.checked)} className="mt-0.5" />Electric or plug-in hybrid</label>
                {cnElec && <label className={check}><input type="checkbox" checked={cnQuota} onChange={(e) => setCnQuota(e.target.checked)} className="mt-0.5" />Inside the 49,000-vehicle quota (import permit held)</label>}
              </>
            )}
            <label className={check}><input type="checkbox" checked={hasAC} onChange={(e) => setHasAC(e.target.checked)} className="mt-0.5" />Vehicle has air conditioning ($100 federal excise tax)</label>
            {!fifteenOk && (
              <label className={check}><input type="checkbox" checked={admissible} onChange={(e) => setAdmissible(e.target.checked)} className="mt-0.5" />Listed as admissible on the Registrar of Imported Vehicles (RIV) list</label>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Fuel use, L/100 km (optional)</label>
              <input className={field} inputMode="decimal" placeholder="e.g. 13.5" value={fuel} onChange={(e) => setFuel(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">13+ triggers the Green Levy ($1,000–$4,000)</p>
            </div>
            <div><label className={label}>Freight, inspection &amp; extras (C$, optional)</label><input className={field} inputMode="decimal" value={extras} onChange={(e) => setExtras(e.target.value)} /></div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 {cur} = C${cadPer.toFixed(4)}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">CBSA converts at the Bank of Canada rate on the day of importation, so your actual bill may differ slightly.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated Canadian import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="Value for duty" v={cad(vfd)} />
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${l.pct}%` : l.label} v={cad(l.amount)} />)}
                <Row k="Paid to CBSA at the border" v={cad(res.federalAtBorder)} bold />
                {res.riv > 0 && <Row k="RIV fee + GST" v={cad(res.riv + res.rivGst)} />}
                {res.provincial > 0 && <Row k={`Provincial tax at registration — ${toNum(provPct)}%`} v={cad(res.provincial)} />}
                <Row k="Total taxes, duties and fees" v={cad(res.totalTaxesAndFees)} bold hi />
                <Row k="Total landed cost" v={cad(res.totalLanded)} bold />
                <Row k="Taxes and fees as % of value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>GST is charged on value plus duty, surtax and excise taxes, so tariffs are taxed again.</li>
                <li>Luxury tax applies once the taxable amount passes C$100,000. Whether the surtax counts toward that amount should be confirmed with a broker.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. CBSA makes the final assessment, and the provincial rate varies by registry.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a price and manufacture year to see the breakdown.</div>
          )}

          {yr >= 1900 && (
            <div className={`rounded-xl border p-3 text-xs flex gap-2 ${fifteenOk || admissible ? 'border-emerald-300/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' : 'border-red-300/50 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200'}`}>
              {fifteenOk || admissible ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertTriangle className="h-4 w-4 flex-shrink-0" />}
              <p>
                {fifteenOk
                  ? '15-year rule: 15 or more years old, so exempt from the RIV program and Transport Canada safety standards. No RIV fee.'
                  : admissible
                    ? `Under 15 years old: it must go through the RIV program (inspection, possible modifications and a recall clearance letter). It reaches 15 years in ${monthsTo15 > 0 ? `about ${monthsTo15} month${monthsTo15 === 1 ? '' : 's'}` : 'the past'}.`
                    : 'Not admissible: a vehicle under 15 years old that is not on the RIV list generally cannot be imported. Many non-North-American-market models fall here.'}
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
