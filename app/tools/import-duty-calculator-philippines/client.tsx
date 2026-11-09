'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcPh, type PhCondition, type PhOrigin, type PhPowertrain, type PhSeats } from '@/lib/ph-import-duty';

type Cur = 'USD' | 'JPY' | 'KRW' | 'CNY' | 'EUR' | 'GBP' | 'THB' | 'SGD' | 'AUD' | 'AED' | 'PHP';
const CURRENCIES: Cur[] = ['USD', 'JPY', 'KRW', 'CNY', 'EUR', 'GBP', 'THB', 'SGD', 'AUD', 'AED', 'PHP'];
// Approximate units per 1 USD, used only if the live rate cannot be loaded.
const FALLBACK: Record<Cur, number> = { USD: 1, JPY: 150, KRW: 1405, CNY: 7.15, EUR: 0.86, GBP: 0.75, THB: 33, SGD: 1.29, AUD: 1.53, AED: 3.6725, PHP: 58 };

const php = (n: number) => '₱' + n.toLocaleString('en-PH', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
const usd = (n: number) => 'US$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
const toNum = (v: string) => { const n = parseFloat(v.replace(/,/g, '')); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyPhilippinesClient() {
  const [condition, setCondition] = useState<PhCondition>('new');
  const [seats, setSeats] = useState<PhSeats>('upto9');
  const [origin, setOrigin] = useState<PhOrigin>('mfn');
  const [powertrain, setPowertrain] = useState<PhPowertrain>('ice');
  const [pickup, setPickup] = useState(false);
  const [override, setOverride] = useState('');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('15000');
  const [freight, setFreight] = useState('1000');
  const [age, setAge] = useState('3');
  const [other, setOther] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.PHP) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-PH'));
      }
    } catch { /* keep the fallback rates */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const perUsd = rates[cur];
  const priceUSD = toNum(price) / perUsd;
  const freightUSD = toNum(freight) / perUsd;
  const usdToPhp = rates.PHP;

  const res = useMemo(() => {
    if (priceUSD <= 0) return null;
    return calcPh({
      condition, seats, origin, powertrain, isPickup: pickup, dutyOverridePct: override.trim() === '' ? null : toNum(override),
      priceUSD, freightUSD, usdToPhp, modelAge: toNum(age), otherChargesPHP: toNum(other),
    });
  }, [condition, seats, origin, powertrain, pickup, override, priceUSD, freightUSD, usdToPhp, age, other]);

  const reset = () => {
    setCondition('new'); setSeats('upto9'); setOrigin('mfn'); setPowertrain('ice'); setPickup(false); setOverride('');
    setCur('USD'); setPrice('15000'); setFreight('1000'); setAge('3'); setOther('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Condition</label>
            <select className={field} value={condition} onChange={(e) => setCondition(e.target.value as PhCondition)}>
              <option value="new">Brand new car</option>
              <option value="used-ndi">Used car under the No-Dollar Importation programme</option>
            </select>
            {condition === 'used-ndi' && <p className="text-[11px] text-muted-foreground mt-1.5">Only returning Filipinos and a few other qualified individuals can import one used left-hand-drive car, with a DTI import authority.</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Seating capacity</label>
              <select className={field} value={seats} onChange={(e) => setSeats(e.target.value as PhSeats)}>
                <option value="upto9">9 seats or fewer (30% duty)</option>
                <option value="10plus">10 seats or more (20% duty)</option>
              </select>
            </div>
            <div>
              <label className={label}>Powertrain</label>
              <select className={field} value={powertrain} onChange={(e) => setPowertrain(e.target.value as PhPowertrain)}>
                <option value="ice">Petrol or diesel</option>
                <option value="hev">Hybrid (HEV)</option>
                <option value="phev">Plug-in hybrid (PHEV)</option>
                <option value="bev">Battery electric</option>
              </select>
            </div>
          </div>
          <div>
            <label className={label}>Origin of the car</label>
            <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as PhOrigin)}>
              <option value="mfn">Japan, Korea, China, Europe, USA or other (standard MFN rate)</option>
              <option value="asean">ASEAN-made with Form D (Thailand, Indonesia…)</option>
            </select>
          </div>
          <label className={check}>
            <input type="checkbox" checked={pickup} onChange={(e) => setPickup(e.target.checked)} className="mt-0.5" />
            <span>Pickup truck (exempt from the automobile excise tax)</span>
          </label>
          <div>
            <label className={label}>Preferential duty rate (%), optional</label>
            <input className={field} inputMode="decimal" placeholder="e.g. 5 — overrides the rate above" value={override} onChange={(e) => setOverride(e.target.value)} />
            <p className="text-[11px] text-muted-foreground mt-1">For RCEP, JPEPA, AKFTA or ACFTA claims, enter the rate for your tariff line from the BOC or Tariff Commission schedule.</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Car price</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Freight + insurance ({cur})</label>
              <input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} />
            </div>
            {condition === 'used-ndi' ? (
              <div>
                <label className={label}>Model age (years)</label>
                <input className={field} inputMode="decimal" value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
            ) : (
              <div>
                <label className={label}>Other charges (₱)</label>
                <input className={field} inputMode="decimal" placeholder="arrastre, brokerage, LTO" value={other} onChange={(e) => setOther(e.target.value)} />
              </div>
            )}
          </div>
          {condition === 'used-ndi' && (
            <div>
              <label className={label}>Other charges (₱): arrastre, wharfage, brokerage, LTO</label>
              <input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} />
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>US$1 = ₱{usdToPhp.toLocaleString('en-PH', { maximumFractionDigits: 2 })}{live ? ` · live rate ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">The Bureau of Customs applies its own published exchange rate, which can differ slightly from the market rate.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="CIF value (price + freight + insurance)" v={php(res.cifPHP)} />
                {res.depreciationPct > 0 && <Row k={`Dutiable value after ${res.depreciationPct}% depreciation`} v={php(res.dutiableValue)} />}
                {res.lines.map((l) => <Row key={l.key} k={l.pct != null ? `${l.label} — ${l.pct}%` : l.label} v={php(l.amount)} />)}
                <Row k={`Total taxes and fees (${res.taxesPctOfCif.toFixed(1)}% of CIF)`} v={php(res.taxesTotal)} bold hi />
                <Row k="Total landed cost" v={`${php(res.totalPHP)} (${usd(res.totalUSD)})`} bold />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>Excise tax is charged on landed cost (dutiable value + duty + customs charges), and VAT on landed cost + excise.</li>
                <li>Not included: LTO registration, emission and roadworthiness tests, insurance, and any Subic or Clark freeport rules.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. The Bureau of Customs and the BIR set the final assessment.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a car price to see the calculation.</div>
          )}
          <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 flex-shrink-0" />
            Imported cars must be left-hand drive, new or used. A used car not covered by a Certificate of Authority to Import can be seized and released only after heavy penalties.
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
