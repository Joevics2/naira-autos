'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcEt, type EtAssembly, type EtPowertrain } from '@/lib/et-import-duty';

type Cur = 'USD' | 'EUR' | 'GBP' | 'CNY' | 'JPY' | 'AED' | 'ETB';
const CURRENCIES: Cur[] = ['USD', 'EUR', 'GBP', 'CNY', 'JPY', 'AED', 'ETB'];
// Approximate fallback (units per 1 USD), used only if the live fetch fails. The birr floats.
const FALLBACK: Record<Cur, number> = { USD: 1, EUR: 0.86, GBP: 0.75, CNY: 7.2, JPY: 150, AED: 3.6725, ETB: 150 };

const usd = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const etb = (n: number) => 'ETB ' + Math.round(n).toLocaleString('en-US');
const toNum = (v: string) => { const n = parseFloat(v.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyEthiopiaClient() {
  const [powertrain, setPowertrain] = useState<EtPowertrain>('bev');
  const [assembly, setAssembly] = useState<EtAssembly>('cbu');
  const [lhd, setLhd] = useState(true);
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('25000');
  const [freight, setFreight] = useState('2000');
  const [insurance, setInsurance] = useState('');
  const [local, setLocal] = useState('3500');
  const [plates, setPlates] = useState(true);
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.ETB) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-US'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const toUSD = (v: string) => toNum(v) / rates[cur];
  const priceUSD = toUSD(price);

  const res = useMemo(() => {
    if (priceUSD <= 0) return null;
    return calcEt({
      powertrain, assembly, leftHandDrive: lhd, priceUSD, freightUSD: toNum(freight) / rates[cur],
      insuranceUSD: toNum(insurance) / rates[cur], localFeesUSD: toNum(local), includePlates: plates, etbPerUSD: rates.ETB,
    });
  }, [powertrain, assembly, lhd, priceUSD, freight, insurance, local, plates, rates, cur]);

  const reset = () => {
    setPowertrain('bev'); setAssembly('cbu'); setLhd(true); setCur('USD'); setPrice('25000'); setFreight('2000');
    setInsurance(''); setLocal('3500'); setPlates(true);
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
              <label className={label}>Powertrain</label>
              <select className={field} value={powertrain} onChange={(e) => setPowertrain(e.target.value as EtPowertrain)}>
                <option value="bev">Pure battery electric (BEV)</option>
                <option value="other">Petrol, diesel, hybrid or plug-in hybrid</option>
              </select>
            </div>
            <div>
              <label className={label}>Assembly state</label>
              <select className={field} value={assembly} onChange={(e) => setAssembly(e.target.value as EtAssembly)}>
                <option value="cbu">Fully built (CBU) — 20% duty</option>
                <option value="skd">Semi-knocked-down (SKD) — 5% duty</option>
                <option value="ckd">Completely knocked-down (CKD) — 0% duty</option>
              </select>
            </div>
          </div>
          <label className={check}><input type="checkbox" checked={lhd} onChange={(e) => setLhd(e.target.checked)} className="mt-0.5" />Left-hand drive (right-hand drive is not allowed)</label>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2"><label className={label}>Car price</label><input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Freight to Djibouti ({cur})</label><input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} /></div>
            <div><label className={label}>Insurance ({cur}, optional)</label><input className={field} inputMode="decimal" value={insurance} onChange={(e) => setInsurance(e.target.value)} /></div>
          </div>
          <div>
            <label className={label}>Clearance, port, inland transport &amp; broker fees (US$)</label>
            <input className={field} inputMode="decimal" value={local} onChange={(e) => setLocal(e.target.value)} />
            <p className="text-[11px] text-muted-foreground mt-1">Importers often budget around US$3,500; yours depends on route and broker.</p>
          </div>
          <label className={check}><input type="checkbox" checked={plates} onChange={(e) => setPlates(e.target.checked)} className="mt-0.5" />Include the ETB 44,500 RFID “ETH” plate fee</label>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 USD = ETB {rates.ETB.toFixed(2)}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">The birr floats, so the ETB amount can change between purchase and customs clearance. ERCA uses the exchange rate on the clearance date.</p>
        </div>

        <div className="space-y-4">
          {res && !res.allowed && (
            <div className="flex gap-2 rounded-xl border border-red-300/50 bg-red-50 dark:bg-red-500/10 p-4 text-sm text-red-800 dark:text-red-200">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />{res.reason}
            </div>
          )}
          {res && res.allowed ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated Ethiopian import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="CIF value (price + freight + insurance)" v={usd(res.cifUSD)} />
                {res.lines.map((l) => <Row key={l.key} k={`${l.label} — ${l.pct}%`} v={usd(l.usd)} />)}
                <Row k="VAT, excise tax and surtax" v="Exempt for BEVs" />
                <Row k="Total taxes" v={`${usd(res.taxesUSD)}  (${etb(res.taxesUSD * rates.ETB)})`} bold hi />
                {res.platesUSD > 0 && <Row k="RFID plates (ETB 44,500)" v={usd(res.platesUSD)} />}
                <Row k="Estimated total landed cost" v={`${usd(res.landedUSD)}  (${etb(res.landedUSD * rates.ETB)})`} bold />
                <Row k="Taxes as % of CIF value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                <li>Duty and withholding tax are both charged on the CIF value, not on each other.</li>
                <li>Ethiopia’s ERCA sets the final value. Use the exchange rate on the clearance date.</li>
                <li>Not included: charging equipment, insurance in Ethiopia or the pre-registration inspection fee.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. The Ethiopian Revenue and Customs Authority makes the final assessment.</p>
            </div>
          ) : null}
          {!res && <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a car price to see the breakdown.</div>}
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
