'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle } from 'lucide-react';
import { calcUk, type UkRoute } from '@/lib/uk-import-duty';

type Cur = 'GBP' | 'USD' | 'EUR' | 'JPY' | 'AED' | 'AUD' | 'CAD';
const CURRENCIES: Cur[] = ['GBP', 'USD', 'EUR', 'JPY', 'AED', 'AUD', 'CAD'];
// Approximate fallback (units per 1 GBP), used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { GBP: 1, USD: 1.33, EUR: 1.16, JPY: 200, AED: 4.88, AUD: 2.0, CAD: 1.85 };

const gbp = (n: number) => '£' + n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const toNum = (v: string) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };

const ROUTES: { value: UkRoute; label: string; note: string }[] = [
  { value: 'standard', label: 'Standard — 10% duty + 20% VAT', note: 'Most cars from outside the UK, including EU-built cars without valid proof of origin.' },
  { value: 'origin_zero', label: 'Proven preferential origin — 0% duty + 20% VAT', note: 'EU/UK-built (UK–EU TCA) or Japan-built (UK–Japan CEPA, 0% from 2026) with an exporter origin declaration.' },
  { value: 'custom', label: 'Other trade deal — enter duty rate', note: 'If another UK trade agreement applies to your car, enter the duty rate you have confirmed.' },
  { value: 'classic', label: 'Classic over 30 years — 0% duty + 5% VAT', note: 'Original condition, no longer in production, 30+ years old.' },
  { value: 'tor', label: 'Transfer of Residence relief — 0% duty + 0% VAT', note: 'Lived abroad 12+ months, owned the car 6+ months, import within 12 months of moving. Apply to HMRC first.' },
];

export default function ImportDutyUkClient() {
  const [route, setRoute] = useState<UkRoute>('standard');
  const [custom, setCustom] = useState('');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('20000');
  const [ship, setShip] = useState('1500');
  const [ins, setIns] = useState('');
  const [vatOther, setVatOther] = useState('');
  const [agent, setAgent] = useState('');
  const [approval, setApproval] = useState('');
  const [dvla, setDvla] = useState(true);
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/GBP');
      const data = await res.json();
      if (data?.rates?.USD) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-GB'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const res = useMemo(() => {
    const p = toNum(price);
    if (p <= 0) return null;
    const g = (v: string) => toNum(v) / rates[cur];       // vehicle-side amounts in selected currency
    const gb = (v: string) => toNum(v);                    // UK-side amounts typed in £
    return calcUk({
      route, customRatePct: toNum(custom), priceGBP: p / rates[cur], shippingGBP: g(ship), insuranceGBP: g(ins),
      otherVatableGBP: gb(vatOther), agentFeesGBP: gb(agent), approvalFeesGBP: gb(approval), includeDvlaFee: dvla,
    });
  }, [route, custom, price, ship, ins, vatOther, agent, approval, dvla, rates, cur]);

  const reset = () => {
    setRoute('standard'); setCustom(''); setCur('USD'); setPrice('20000'); setShip('1500'); setIns('');
    setVatOther(''); setAgent(''); setApproval(''); setDvla(true);
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const active = ROUTES.find((r) => r.value === route)!;

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div>
            <label className={label}>Duty and VAT route</label>
            <select className={field} value={route} onChange={(e) => setRoute(e.target.value as UkRoute)}>
              {ROUTES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
            <p className="text-[11px] text-muted-foreground mt-1.5">{active.note}</p>
          </div>
          {route === 'custom' && (
            <div className="w-1/2">
              <label className={label}>Duty rate (%)</label>
              <input className={field} inputMode="decimal" value={custom} onChange={(e) => setCustom(e.target.value)} />
            </div>
          )}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Vehicle price</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Shipping to the UK ({cur})</label><input className={field} inputMode="decimal" value={ship} onChange={(e) => setShip(e.target.value)} /></div>
            <div><label className={label}>Insurance ({cur}, optional)</label><input className={field} inputMode="decimal" value={ins} onChange={(e) => setIns(e.target.value)} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>UK delivery &amp; extras in VAT base (£)</label>
              <input className={field} inputMode="decimal" value={vatOther} onChange={(e) => setVatOther(e.target.value)} />
            </div>
            <div>
              <label className={label}>Customs agent fees (£)</label>
              <input className={field} inputMode="decimal" value={agent} onChange={(e) => setAgent(e.target.value)} />
            </div>
          </div>
          <div>
            <label className={label}>IVA / MOT / compliance costs (£, optional)</label>
            <input className={field} inputMode="decimal" value={approval} onChange={(e) => setApproval(e.target.value)} />
          </div>
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
            <input type="checkbox" checked={dvla} onChange={(e) => setDvla(e.target.checked)} />Include £55 DVLA first registration fee
          </label>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 GBP = {rates[cur].toFixed(cur === 'JPY' ? 1 : 3)} {cur}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
          <p className="text-[11px] text-muted-foreground">HMRC applies its own monthly customs exchange rate, which can differ slightly from the market rate shown here.</p>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated UK landed cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="Customs value (price + shipping + insurance)" v={gbp(res.customsValue)} />
                <Row k={`Import duty — ${res.dutyPct}%`} v={gbp(res.duty)} />
                <Row k={`Import VAT — ${res.vatPct}% on ${gbp(res.vatBase)}`} v={gbp(res.vat)} />
                <Row k="Total duty and VAT" v={gbp(res.taxTotal)} bold />
                {res.extras > 0 && <Row k="Fees (agent, compliance, DVLA)" v={gbp(res.extras)} />}
                <Row k="Total landed cost" v={gbp(res.totalLanded)} bold hi />
                <Row k="Duty + VAT as % of customs value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                <li>VAT is charged on the car, delivery and extras, plus the duty itself.</li>
                <li>Tell HMRC through NOVA within 14 days of arrival; DVLA will not register the car without it.</li>
                <li>Not included: first-year Vehicle Excise Duty, insurance, number plates, or repairs needed to pass approval.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. HMRC makes the final assessment on your customs declaration.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a vehicle price to see the breakdown.</div>
          )}
          {route === 'origin_zero' && (
            <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4 flex-shrink-0" />HMRC does not accept an origin statement from the manufacturer. The exporter must provide a valid origin declaration, and the car must genuinely be built in the EU, UK or Japan.
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
