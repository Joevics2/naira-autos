'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshCw, AlertTriangle, RotateCcw, Printer } from 'lucide-react';
import { calcDuty, isHighBand, type Condition, type Fuel } from '@/lib/india-import-duty';

type Lang = 'en' | 'hi';
type Cur = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'AED' | 'INR';

const CURRENCIES: Cur[] = ['USD', 'EUR', 'GBP', 'JPY', 'AED', 'INR'];
// Approximate fallback (units per 1 USD) used only if the live fetch fails.
const FALLBACK: Record<Cur, number> = { USD: 1, EUR: 0.86, GBP: 0.75, JPY: 150, AED: 3.6725, INR: 88 };

const S = {
  en: {
    condition: 'Car condition', cNew: 'New (CBU)', cUsed: 'Used / Transfer of Residence',
    fuel: 'Fuel / powertrain', petrol: 'Petrol', diesel: 'Diesel', hybrid: 'Hybrid (petrol)', ev: 'Electric',
    cc: 'Engine capacity (cc)', under4m: 'Length under 4 metres',
    currency: 'Currency', fob: 'Car price (FOB)', freight: 'Freight', insurance: 'Insurance',
    insNote: 'Insurance defaults to 1.125% of FOB if left blank', frtNote: 'Freight defaults to 20% of FOB if left blank',
    landing: 'Add 1% landing charge to CIF', landingNote: 'Some assessments still add 1% — turn off if your broker confirms it does not apply',
    uk: 'UK-made car, inside the CETA quota', ukNote: 'Only modelled for engines over 3,000 cc petrol / 2,500 cc diesel (30% duty in year 1)',
    mfgYear: 'Manufacture year', rhd: 'Right-hand drive', rate: 'Exchange rate',
    live: 'Live rate', refresh: 'Refresh', rateNote: 'Customs uses the CBIC-notified rate, which differs slightly from this market rate',
    other: 'Port, CHA & misc. costs (₹, optional)', road: 'Road tax & registration (₹, optional)',
    results: 'Estimated landed cost', av: 'Assessable value', duty: 'Total customs duty & IGST', landed: 'Duty-paid landed cost',
    eff: 'Effective duty on assessable value', cif: 'CIF', total: 'Total including your extras',
    sws: 'SWS is nil for cars under heading 8703 (exempted from 2 Feb 2025). No GST compensation cess since 22 Sep 2025.',
    slabSmall: 'Small-car IGST slab (18%)', slabLarge: 'Large car / SUV IGST slab (40%)', slabEv: 'EV IGST slab (5%)',
    bandHigh: 'Above $40,000 or large engine: BCD 70% + AIDC 40%', bandLow: 'Up to $40,000: BCD 60% (verify with customs)',
    usedBand: 'Second-hand: BCD 70% + AIDC 67.5%', ceta: 'UK CETA quota: concessional 30% duty applied (assumption: replaces BCD + AIDC)',
    warnLhd: 'Left-hand-drive cars generally cannot be imported for normal use in India.',
    warnAge: 'Used cars must generally be no more than 3 years from manufacture. Transfer-of-Residence importers have partial relief — verify with customs.',
    warnSmall: 'IGST slab depends on length and engine: petrol/hybrid up to 1,200 cc or diesel up to 1,500 cc and under 4 m get 18%; everything else 40%.',
    reset: 'Reset', print: 'Print', disclaimer: 'Estimate only. Final assessment is made by Indian Customs on the Bill of Entry.',
  },
  hi: {
    condition: 'कार की स्थिति', cNew: 'नई (CBU)', cUsed: 'पुरानी / ट्रांसफर ऑफ रेजिडेंस',
    fuel: 'ईंधन / पावरट्रेन', petrol: 'पेट्रोल', diesel: 'डीज़ल', hybrid: 'हाइब्रिड (पेट्रोल)', ev: 'इलेक्ट्रिक',
    cc: 'इंजन क्षमता (cc)', under4m: 'लंबाई 4 मीटर से कम',
    currency: 'मुद्रा', fob: 'कार की कीमत (FOB)', freight: 'माल भाड़ा', insurance: 'बीमा',
    insNote: 'खाली छोड़ने पर बीमा FOB का 1.125% माना जाता है', frtNote: 'खाली छोड़ने पर भाड़ा FOB का 20% माना जाता है',
    landing: 'CIF में 1% लैंडिंग चार्ज जोड़ें', landingNote: 'कुछ आकलनों में 1% अब भी जुड़ता है — ब्रोकर के मना करने पर बंद करें',
    uk: 'ब्रिटेन में बनी कार, CETA कोटा के भीतर', ukNote: 'केवल 3,000 cc पेट्रोल / 2,500 cc डीज़ल से बड़े इंजन के लिए मॉडल किया गया (पहले साल 30% शुल्क)',
    mfgYear: 'निर्माण वर्ष', rhd: 'राइट-हैंड ड्राइव', rate: 'विनिमय दर',
    live: 'लाइव दर', refresh: 'रीफ्रेश', rateNote: 'सीमा शुल्क में CBIC की अधिसूचित दर लगती है, जो इस बाज़ार दर से थोड़ी अलग होती है',
    other: 'बंदरगाह, CHA व अन्य खर्च (₹, वैकल्पिक)', road: 'रोड टैक्स व पंजीकरण (₹, वैकल्पिक)',
    results: 'अनुमानित कुल लागत', av: 'निर्धारणीय मूल्य', duty: 'कुल सीमा शुल्क व IGST', landed: 'शुल्क सहित लैंडेड लागत',
    eff: 'निर्धारणीय मूल्य पर प्रभावी शुल्क', cif: 'CIF', total: 'आपके अतिरिक्त खर्चों सहित कुल',
    sws: 'हेडिंग 8703 की कारों पर SWS शून्य है (2 फरवरी 2025 से छूट)। 22 सितंबर 2025 से GST मुआवज़ा उपकर नहीं लगता।',
    slabSmall: 'छोटी कार IGST स्लैब (18%)', slabLarge: 'बड़ी कार / SUV IGST स्लैब (40%)', slabEv: 'EV IGST स्लैब (5%)',
    bandHigh: '$40,000 से ऊपर या बड़ा इंजन: BCD 70% + AIDC 40%', bandLow: '$40,000 तक: BCD 60% (सीमा शुल्क से पुष्टि करें)',
    usedBand: 'सेकंड-हैंड: BCD 70% + AIDC 67.5%', ceta: 'UK CETA कोटा: रियायती 30% शुल्क लागू (मान्यता: BCD + AIDC की जगह)',
    warnLhd: 'लेफ्ट-हैंड-ड्राइव कारें सामान्य उपयोग के लिए भारत में आमतौर पर आयात नहीं हो सकतीं।',
    warnAge: 'पुरानी कार निर्माण से आमतौर पर 3 साल से अधिक की नहीं होनी चाहिए। ट्रांसफर ऑफ रेजिडेंस वालों को आंशिक राहत है — सीमा शुल्क से पुष्टि करें।',
    warnSmall: 'IGST स्लैब लंबाई और इंजन पर निर्भर है: पेट्रोल/हाइब्रिड 1,200 cc या डीज़ल 1,500 cc तक और 4 मीटर से कम पर 18%; बाकी पर 40%।',
    reset: 'रीसेट', print: 'प्रिंट', disclaimer: 'केवल अनुमान। अंतिम आकलन भारतीय सीमा शुल्क बिल ऑफ एंट्री पर करता है।',
  },
} as const;

const LINE_LABEL = {
  en: { bcd: 'Basic Customs Duty (BCD)', aidc: 'Agriculture Infrastructure & Development Cess (AIDC)', igst: 'IGST' },
  hi: { bcd: 'मूल सीमा शुल्क (BCD)', aidc: 'कृषि अवसंरचना एवं विकास उपकर (AIDC)', igst: 'IGST' },
} as const;

const inr = (n: number) => '₹ ' + Math.round(n).toLocaleString('en-IN');
const toNum = (v: string) => { const n = parseFloat(v); return Number.isFinite(n) && n > 0 ? n : 0; };

export default function ImportDutyIndiaWidget({ lang }: { lang: Lang }) {
  const t = S[lang];
  const thisYear = new Date().getFullYear();

  const [condition, setCondition] = useState<Condition>('new');
  const [fuel, setFuel] = useState<Fuel>('petrol');
  const [cc, setCc] = useState('2000');
  const [under4m, setUnder4m] = useState(false);
  const [cur, setCur] = useState<Cur>('USD');
  const [fob, setFob] = useState('35000');
  const [freight, setFreight] = useState('');
  const [insurance, setInsurance] = useState('');
  const [landing, setLanding] = useState(true);
  const [uk, setUk] = useState(false);
  const [mfgYear, setMfgYear] = useState(String(thisYear - 1));
  const [rhd, setRhd] = useState(true);
  const [rates, setRates] = useState<Record<Cur, number>>(FALLBACK);
  const [loading, setLoading] = useState(false);
  const [live, setLive] = useState<string | null>(null);
  const [other, setOther] = useState('');
  const [road, setRoad] = useState('');

  const fetchRates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.INR) {
        const next = { ...FALLBACK };
        CURRENCIES.forEach((c) => { if (data.rates[c]) next[c] = data.rates[c]; });
        setRates(next);
        setLive(new Date().toLocaleTimeString());
      }
    } catch { /* keep fallback */ } finally { setLoading(false); }
  }, []);
  useEffect(() => { fetchRates(); }, [fetchRates]);

  const fobN = toNum(fob);
  const ccN = toNum(cc);
  const calc = useMemo(() => {
    if (fobN <= 0) return null;
    const frt = freight.trim() === '' ? fobN * 0.2 : toNum(freight);
    const ins = insurance.trim() === '' ? fobN * 0.01125 : toNum(insurance);
    const cifCur = fobN + frt + ins;
    const cifUSD = cifCur / rates[cur];
    const inrPerCur = rates.INR / rates[cur];
    const r = calcDuty({
      condition, fuel, cc: ccN, under4m, cifUSD, avBaseINR: cifCur * inrPerCur,
      applyLandingCharge: landing, ukCetaInQuota: uk,
    });
    return { r, cifCur, cifUSD, cifINR: cifCur * inrPerCur, inrPerCur };
  }, [fobN, freight, insurance, rates, cur, condition, fuel, ccN, under4m, landing, uk]);

  const high = calc ? isHighBand({ fuel, cc: ccN, cifUSD: calc.cifUSD }) : false;
  const ageWarn = condition === 'used' && thisYear - toNum(mfgYear) > 3;
  const extras = toNum(other) + toNum(road);
  const evNoCc = fuel === 'ev';

  const reset = () => {
    setCondition('new'); setFuel('petrol'); setCc('2000'); setUnder4m(false); setCur('USD'); setFob('35000');
    setFreight(''); setInsurance(''); setLanding(true); setUk(false); setMfgYear(String(thisYear - 1));
    setRhd(true); setOther(''); setRoad('');
  };

  const field = 'w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/40';
  const label = 'block text-xs font-semibold text-muted-foreground mb-1.5';
  const check = 'flex items-start gap-2 text-sm text-foreground cursor-pointer';

  const slab = calc
    ? calc.r.igstPct === 5 ? t.slabEv : calc.r.smallCarSlab ? t.slabSmall : t.slabLarge
    : '';
  const bandNote = condition === 'used' ? t.usedBand : calc?.r.usedCeta ? t.ceta : high ? t.bandHigh : t.bandLow;

  return (
    <section className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10" aria-label="Calculator">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{t.condition}</label>
              <select className={field} value={condition} onChange={(e) => { setCondition(e.target.value as Condition); if (e.target.value === 'used') setUk(false); }}>
                <option value="new">{t.cNew}</option><option value="used">{t.cUsed}</option>
              </select>
            </div>
            <div>
              <label className={label}>{t.fuel}</label>
              <select className={field} value={fuel} onChange={(e) => setFuel(e.target.value as Fuel)}>
                <option value="petrol">{t.petrol}</option><option value="diesel">{t.diesel}</option>
                <option value="hybrid">{t.hybrid}</option><option value="ev">{t.ev}</option>
              </select>
            </div>
          </div>

          {!evNoCc && (
            <div className="grid grid-cols-2 gap-3 items-end">
              <div>
                <label className={label}>{t.cc}</label>
                <input className={field} inputMode="numeric" value={cc} onChange={(e) => setCc(e.target.value)} />
              </div>
              <label className={check}><input type="checkbox" checked={under4m} onChange={(e) => setUnder4m(e.target.checked)} className="mt-0.5" />{t.under4m}</label>
            </div>
          )}
          {evNoCc && <p className="text-xs text-muted-foreground">{t.slabEv}</p>}

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className={label}>{t.currency}</label>
              <select className={field} value={cur} onChange={(e) => setCur(e.target.value as Cur)}>
                {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={label}>{t.fob}</label>
              <input className={field} inputMode="decimal" value={fob} onChange={(e) => setFob(e.target.value)} />
            </div>
            <div className="col-span-3 sm:col-span-1" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>{t.freight}</label>
              <input className={field} inputMode="decimal" placeholder="20%" value={freight} onChange={(e) => setFreight(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">{t.frtNote}</p>
            </div>
            <div>
              <label className={label}>{t.insurance}</label>
              <input className={field} inputMode="decimal" placeholder="1.125%" value={insurance} onChange={(e) => setInsurance(e.target.value)} />
              <p className="text-[11px] text-muted-foreground mt-1">{t.insNote}</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className={check}><input type="checkbox" checked={landing} onChange={(e) => setLanding(e.target.checked)} className="mt-0.5" /><span>{t.landing}<span className="block text-[11px] text-muted-foreground">{t.landingNote}</span></span></label>
            {condition === 'new' && fuel !== 'ev' && (
              <label className={check}><input type="checkbox" checked={uk} onChange={(e) => setUk(e.target.checked)} className="mt-0.5" /><span>{t.uk}<span className="block text-[11px] text-muted-foreground">{t.ukNote}</span></span></label>
            )}
            <label className={check}><input type="checkbox" checked={rhd} onChange={(e) => setRhd(e.target.checked)} className="mt-0.5" />{t.rhd}</label>
          </div>

          {condition === 'used' && (
            <div className="w-1/2">
              <label className={label}>{t.mfgYear}</label>
              <input className={field} inputMode="numeric" value={mfgYear} onChange={(e) => setMfgYear(e.target.value)} />
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div><label className={label}>{t.other}</label><input className={field} inputMode="decimal" value={other} onChange={(e) => setOther(e.target.value)} /></div>
            <div><label className={label}>{t.road}</label><input className={field} inputMode="decimal" value={road} onChange={(e) => setRoad(e.target.value)} /></div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <span>{t.rate}: 1 {cur} = ₹{calc ? calc.inrPerCur.toFixed(2) : (rates.INR / rates[cur]).toFixed(2)}{live ? ` · ${t.live} ${live}` : ''}</span>
            <button type="button" onClick={fetchRates} className="inline-flex items-center gap-1 hover:text-foreground"><RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />{t.refresh}</button>
          </div>
          <p className="text-[11px] text-muted-foreground">{t.rateNote}</p>
        </div>

        <div className="space-y-4">
          {!rhd && <div className="flex gap-2 rounded-xl border border-red-300/50 bg-red-50 dark:bg-red-500/10 p-3 text-xs text-red-800 dark:text-red-200"><AlertTriangle className="h-4 w-4 flex-shrink-0" />{t.warnLhd}</div>}
          {ageWarn && <div className="flex gap-2 rounded-xl border border-amber-300/50 bg-amber-50 dark:bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-200"><AlertTriangle className="h-4 w-4 flex-shrink-0" />{t.warnAge}</div>}

          {calc ? (
            <div className="rounded-2xl border border-border bg-card p-5">
              <h2 className="text-lg font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{t.results}</h2>
              <div className="space-y-2 text-sm">
                <Row k={`${t.cif} (${cur} ${Math.round(calc.cifCur).toLocaleString('en-IN')})`} v={inr(calc.cifINR)} />
                {calc.r.landingCharge > 0 && <Row k="+ 1% landing charge" v={inr(calc.r.landingCharge)} />}
                <Row k={t.av} v={inr(calc.r.assessableValue)} bold />
                {calc.r.lines.map((l) => <Row key={l.key} k={`${LINE_LABEL[lang][l.key as 'bcd']} — ${l.pct}%`} v={inr(l.amount)} />)}
                <Row k={t.duty} v={inr(calc.r.totalDuty)} bold />
                <Row k={t.landed} v={inr(calc.r.landed)} bold hi />
                {extras > 0 && <Row k={t.total} v={inr(calc.r.landed + extras)} bold />}
                <Row k={t.eff} v={calc.r.effectivePct.toFixed(1) + '%'} />
              </div>
              <div className="mt-4 h-3 w-full rounded-full overflow-hidden flex bg-muted">
                <div className="bg-slate-400" style={{ width: `${(calc.r.assessableValue / calc.r.landed) * 100}%` }} />
                <div className="bg-orange-500" style={{ width: `${(calc.r.bcd / calc.r.landed) * 100}%` }} />
                <div className="bg-amber-400" style={{ width: `${(calc.r.aidc / calc.r.landed) * 100}%` }} />
                <div className="bg-emerald-500" style={{ width: `${(calc.r.igst / calc.r.landed) * 100}%` }} />
              </div>
              <ul className="mt-4 space-y-1 text-[11px] text-muted-foreground list-disc list-inside">
                <li>{bandNote}</li><li>{slab}</li><li>{t.sws}</li>
              </ul>
              <p className="text-[11px] text-muted-foreground mt-3">{t.warnSmall}</p>
              <div className="flex gap-2 mt-4">
                <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><RotateCcw className="h-3 w-3" />{t.reset}</button>
                <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-1.5 text-xs border border-border rounded-lg px-3 py-1.5 hover:bg-muted"><Printer className="h-3 w-3" />{t.print}</button>
              </div>
              <p className="text-[11px] text-muted-foreground mt-3">{t.disclaimer}</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-8 text-sm text-muted-foreground text-center">{t.fob}</div>
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
