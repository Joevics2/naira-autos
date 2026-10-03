'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, RotateCcw, Printer, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { calcUs, type Category, type Origin } from '@/lib/us-import-duty';

type Cur = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'AED' | 'KRW';
const CURRENCIES: Cur[] = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'AED', 'KRW'];
// Approximate fallback (units per 1 USD), used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { USD: 1, EUR: 0.86, GBP: 0.75, JPY: 150, CAD: 1.38, AUD: 1.52, AED: 3.6725, KRW: 1400 };

const ORIGINS: { value: Origin; label: string }[] = [
  { value: 'eu', label: 'European Union (e.g. Germany, Italy, France)' },
  { value: 'jp', label: 'Japan' },
  { value: 'kr', label: 'South Korea' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca_mx', label: 'Canada or Mexico' },
  { value: 'cn', label: 'China' },
  { value: 'au', label: 'Australia' },
  { value: 'other', label: 'Any other country' },
];

const usd = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const toNum = (v: string) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ImportDutyUsaClient() {
  const now = new Date();
  const entryYear = now.getFullYear();
  const [category, setCategory] = useState<Category>('car');
  const [origin, setOrigin] = useState<Origin>('jp');
  const [cur, setCur] = useState<Cur>('USD');
  const [price, setPrice] = useState('25000');
  const [mfgYear, setMfgYear] = useState('2000');
  const [mfgMonth, setMfgMonth] = useState(5);
  const [ukQuota, setUkQuota] = useState(true);
  const [usmca, setUsmca] = useState(false);
  const [usContent, setUsContent] = useState('');
  const [cnEv, setCnEv] = useState(false);
  const [otherFl, setOtherFl] = useState('12.5');
  const [ocean, setOcean] = useState(true);
  const [freight, setFreight] = useState('');
  const [usSpec, setUsSpec] = useState(false);
  const [extras, setExtras] = useState('');
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [live, setLive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.EUR) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString('en-US'));
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const yr = Math.round(toNum(mfgYear));
  const valueUSD = toNum(price) / rates[cur];
  const freightUSD = toNum(freight) / rates[cur];

  const res = useMemo(() => {
    if (valueUSD <= 0 || yr < 1900) return null;
    return calcUs({
      category, origin, valueUSD, mfgYear: yr, entryYear, ukInQuota: ukQuota, usmcaQualifying: usmca,
      usContentPct: toNum(usContent), chinaPluginOrEv: cnEv, otherForcedLaborPct: toNum(otherFl), ocean,
    });
  }, [category, origin, valueUSD, yr, entryYear, ukQuota, usmca, usContent, cnEv, otherFl, ocean]);

  // Compliance (not duty): DOT counts from the month of manufacture, EPA counts years.
  const monthsOld = (entryYear - yr) * 12 + (now.getMonth() - mfgMonth);
  const dotExempt = yr > 0 && monthsOld >= 300;
  const epaExempt = yr > 0 && entryYear - yr >= 21;
  const monthsToDot = 300 - monthsOld;

  const reset = () => {
    setCategory('car'); setOrigin('jp'); setCur('USD'); setPrice('25000'); setMfgYear('2000'); setMfgMonth(5);
    setUkQuota(true); setUsmca(false); setUsContent(''); setCnEv(false); setOtherFl('12.5'); setOcean(true);
    setFreight(''); setUsSpec(false); setExtras('');
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
              <label className={label}>Vehicle type</label>
              <select className={field} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                <option value="car">Car, SUV or minivan (over 1,000 cc)</option>
                <option value="small_car">Small car (1,000 cc or less)</option>
                <option value="truck">Pickup / light truck</option>
              </select>
            </div>
            <div>
              <label className={label}>Country of manufacture</label>
              <select className={field} value={origin} onChange={(e) => setOrigin(e.target.value as Origin)}>
                {ORIGINS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground -mt-2">Origin is where the car was built, not where you bought it.</p>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>Currency</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>Price paid for the vehicle</label>
              <input className={field} inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Year of manufacture</label>
              <input className={field} inputMode="numeric" value={mfgYear} onChange={(e) => setMfgYear(e.target.value)} />
            </div>
            <div>
              <label className={label}>Month of manufacture</label>
              <select className={field} value={mfgMonth} onChange={(e) => setMfgMonth(parseInt(e.target.value, 10))}>
                {MONTHS.map((m, idx) => <option key={m} value={idx}>{m}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {origin === 'uk' && category === 'car' && (
              <label className={check}><input type="checkbox" checked={ukQuota} onChange={(e) => setUkQuota(e.target.checked)} className="mt-0.5" />Within the UK quota (100,000 cars a year, 25,000 a quarter)</label>
            )}
            {origin === 'ca_mx' && (
              <>
                <label className={check}><input type="checkbox" checked={usmca} onChange={(e) => setUsmca(e.target.checked)} className="mt-0.5" />Vehicle qualifies under USMCA</label>
                {usmca && (
                  <div className="w-1/2">
                    <label className={label}>US content (%, needs Commerce approval)</label>
                    <input className={field} inputMode="decimal" value={usContent} onChange={(e) => setUsContent(e.target.value)} />
                  </div>
                )}
              </>
            )}
            {origin === 'cn' && (
              <label className={check}><input type="checkbox" checked={cnEv} onChange={(e) => setCnEv(e.target.checked)} className="mt-0.5" />Plug-in hybrid or electric (100% Section 301)</label>
            )}
            {origin === 'other' && (
              <div className="w-1/2">
                <label className={label}>Forced-labor duty for older cars</label>
                <select className={field} value={otherFl} onChange={(e) => setOtherFl(e.target.value)}>
                  <option value="12.5">12.5% (most of the 60 economies)</option>
                  <option value="10">10% (17 economies, e.g. India)</option>
                  <option value="0">0% (not among the 60)</option>
                </select>
              </div>
            )}
            <label className={check}><input type="checkbox" checked={ocean} onChange={(e) => setOcean(e.target.checked)} className="mt-0.5" />Arriving by ocean (adds the 0.125% harbor maintenance fee)</label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>Freight &amp; insurance ({cur}, not dutiable)</label><input className={field} inputMode="decimal" value={freight} onChange={(e) => setFreight(e.target.value)} /></div>
            <div><label className={label}>Broker, bond &amp; compliance ($, optional)</label><input className={field} inputMode="decimal" value={extras} onChange={(e) => setExtras(e.target.value)} /></div>
          </div>
          <label className={check}><input type="checkbox" checked={usSpec} onChange={(e) => setUsSpec(e.target.checked)} className="mt-0.5" />Car carries the US FMVSS and EPA certification labels (US-specification)</label>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>1 USD = {rates[cur].toFixed(cur === 'JPY' || cur === 'KRW' ? 1 : 3)} {cur}{live ? ` · live ${live}` : ' · fallback rate'}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          </div>
        </div>

        <div className="space-y-4">
          {res ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Estimated US import cost</h2>
              <div className="space-y-2 text-sm">
                <Row k="Dutiable value (price paid)" v={usd(valueUSD)} />
                {res.lines.map((l) => <Row key={l.key} k={`${l.label} — ${l.pct}%`} v={usd(l.amount)} />)}
                <Row k={`Total duty — ${res.totalDutyPct}%`} v={usd(res.duty)} bold />
                <Row k="Merchandise processing fee (0.3464%)" v={usd(res.mpf)} />
                {ocean && <Row k="Harbor maintenance fee (0.125%)" v={usd(res.hmf)} />}
                <Row k="Total paid to CBP" v={usd(res.totalToCbp)} bold hi />
                <Row k="Total cost incl. freight and extras" v={usd(valueUSD + freightUSD + res.totalToCbp + toNum(extras))} bold />
                <Row k="CBP charges as % of vehicle value" v={res.effectivePct.toFixed(1) + '%'} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                {res.notes.map((n) => <li key={n}>{n}</li>)}
                <li>Duty is charged on the price paid; separately shown freight and insurance are not dutiable.</li>
                <li>Not included: state sales tax, title and registration, any gas guzzler tax, or customs bond costs unless you enter them.</li>
              </ul>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />Reset</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />Print</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">Estimate only. US Customs and Border Protection makes the final classification and assessment on your entry.</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">Enter a price and manufacture year to see the breakdown.</div>
          )}

          {yr >= 1900 && (
            <div className={`rounded-xl border p-3 text-xs flex gap-2 ${dotExempt ? 'border-emerald-300/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' : usSpec ? 'border-emerald-300/50 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-800 dark:text-emerald-200' : 'border-red-300/50 bg-red-50 dark:bg-red-500/10 text-red-800 dark:text-red-200'}`}>
              {dotExempt || usSpec ? <CheckCircle2 className="h-4 w-4 flex-shrink-0" /> : <AlertTriangle className="h-4 w-4 flex-shrink-0" />}
              <div className="space-y-1">
                <p>{dotExempt ? 'DOT: 25 years old, so exempt from US safety standards (HS-7 Box 1).' : usSpec ? 'DOT: US-specification car with FMVSS label can enter normally.' : `DOT: not yet admissible. A non-US-spec car under 25 years old needs a DOT Registered Importer, often $10,000–$30,000 of work plus a bond of 150% of its value. It turns 25 in ${monthsToDot > 0 ? `about ${monthsToDot} month${monthsToDot === 1 ? '' : 's'}` : 'the past'}.`}</p>
                <p>{epaExempt ? 'EPA: 21+ years old and unmodified, so exempt (form 3520-1, code E).' : usSpec ? 'EPA: US-specification emissions label (form 3520-1, code B).' : 'EPA: under 21 years old, so it needs an EPA-certified configuration; an engine swap also voids the 21-year exemption on older cars.'}</p>
              </div>
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
