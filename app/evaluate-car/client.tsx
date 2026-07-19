'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RotateCcw, Info, Camera, ChevronRight } from 'lucide-react';
import { CURRENCIES, symbolFor, type CurrencyCode } from '@/lib/currencies';

type Condition = 'excellent' | 'good' | 'fair' | 'poor';
type DistanceUnit = 'km' | 'mi';

const CONDITIONS: { id: Condition; label: string; multiplier: number; note: string }[] = [
  { id: 'excellent', label: 'Excellent', multiplier: 1.08, note: 'Like-new, no mechanical issues, minimal wear' },
  { id: 'good', label: 'Good', multiplier: 1.0, note: 'Normal wear for its age, well maintained' },
  { id: 'fair', label: 'Fair', multiplier: 0.88, note: 'Visible wear, some deferred maintenance' },
  { id: 'poor', label: 'Poor', multiplier: 0.70, note: 'Mechanical issues, body damage, or heavy wear' },
];

function ageRetention(age: number): number {
  if (age <= 0) return 1;
  let value = 1;
  for (let y = 1; y <= age; y++) {
    if (y === 1) value *= 0.80;
    else if (y <= 5) value *= 0.85;
    else value *= 0.90;
  }
  return value;
}

function fmt(n: number, symbol: string) {
  return symbol + Math.round(n).toLocaleString('en-US');
}

export default function CarValueEstimatorClient() {
  const currentYear = new Date().getFullYear();

  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const symbol = symbolFor(currency);

  const [purchasePrice, setPurchasePrice] = useState('15000000');
  const [year, setYear] = useState(String(currentYear - 5));
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [mileage, setMileage] = useState('90000');
  const [condition, setCondition] = useState<Condition>('good');
  const [hadAccident, setHadAccident] = useState(false);

  const calc = useMemo(() => {
    const price = parseFloat(purchasePrice) || 0;
    const carYear = parseInt(year) || currentYear;
    const age = Math.max(0, currentYear - carYear);
    const miles = parseFloat(mileage) || 0;

    const expectedAnnual = distanceUnit === 'km' ? 15000 : 12000;
    const expectedMileage = Math.max(expectedAnnual, age * expectedAnnual);
    const diffRatio = expectedMileage > 0 ? (miles - expectedMileage) / expectedMileage : 0;
    let mileageMultiplier = age > 0 ? 1 - diffRatio * 0.15 : 1;
    mileageMultiplier = Math.min(1.15, Math.max(0.7, mileageMultiplier));

    const condData = CONDITIONS.find(c => c.id === condition)!;
    const accidentMultiplier = hadAccident ? 0.88 : 1;
    const retention = ageRetention(age);

    const estimate = price * retention * mileageMultiplier * condData.multiplier * accidentMultiplier;
    const low = estimate * 0.9;
    const high = estimate * 1.1;
    const totalDepreciationPct = price > 0 ? (1 - estimate / price) * 100 : 0;

    return { age, estimate, low, high, retention, mileageMultiplier, condData, accidentMultiplier, totalDepreciationPct, price };
  }, [purchasePrice, year, mileage, condition, hadAccident, distanceUnit, currentYear]);

  const reset = () => {
    setCurrency('NGN'); setPurchasePrice('15000000'); setYear(String(currentYear - 5));
    setDistanceUnit('km'); setMileage('90000'); setCondition('good'); setHadAccident(false);
  };

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value as CurrencyCode)} className="w-full h-10 text-sm border border-border rounded-xl bg-background text-foreground px-3 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20">
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Original / New Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">{symbol}</span>
                <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(e.target.value)} className={`${iCls} pl-7 pr-3`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">What this model cost brand new — not what you paid used.</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Year</label>
                <input type="number" value={year} onChange={e => setYear(e.target.value)} min="1980" max={currentYear} className={iCls} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Mileage</label>
                  <div className="flex gap-1 rounded-lg border border-border p-0.5">
                    {(['km', 'mi'] as DistanceUnit[]).map(u => (
                      <button key={u} onClick={() => setDistanceUnit(u)}
                        className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${distanceUnit === u ? 'bg-sky-500 text-white' : 'text-muted-foreground'}`}>
                        {u}
                      </button>
                    ))}
                  </div>
                </div>
                <input type="number" value={mileage} onChange={e => setMileage(e.target.value)} className={iCls} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Condition</label>
              <div className="grid grid-cols-2 gap-1.5">
                {CONDITIONS.map(c => (
                  <button key={c.id} onClick={() => setCondition(c.id)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${condition === c.id ? 'bg-sky-500 border-sky-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-sky-500/50'}`}>
                    {c.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1.5">{CONDITIONS.find(c => c.id === condition)?.note}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Accident History</label>
              <div className="grid grid-cols-2 gap-1.5">
                <button onClick={() => setHadAccident(false)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${!hadAccident ? 'bg-sky-500 border-sky-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-sky-500/50'}`}>
                  No accidents
                </button>
                <button onClick={() => setHadAccident(true)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${hadAccident ? 'bg-sky-500 border-sky-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-sky-500/50'}`}>
                  Prior accident
                </button>
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">

            <div className="p-5 rounded-2xl bg-sky-500/10 border border-sky-500/25">
              <p className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-wide mb-1">
                Estimated Value Today ({calc.age === 0 ? 'brand new' : `${calc.age} year${calc.age === 1 ? '' : 's'} old`})
              </p>
              <p className="text-4xl font-black leading-none text-sky-600 dark:text-sky-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {fmt(calc.estimate, symbol)}
              </p>
              <p className="text-xs mt-1 text-sky-700/70 dark:text-sky-400/60">
                Likely range: {fmt(calc.low, symbol)} – {fmt(calc.high, symbol)}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-sky-500/15">
                <div>
                  <p className="text-xs text-sky-700/70 dark:text-sky-400/60">Total depreciation</p>
                  <p className="text-lg font-black text-sky-600 dark:text-sky-400">{calc.totalDepreciationPct.toFixed(0)}%</p>
                </div>
                <div>
                  <p className="text-xs text-sky-700/70 dark:text-sky-400/60">Retained value</p>
                  <p className="text-lg font-black text-sky-600 dark:text-sky-400">{(100 - calc.totalDepreciationPct).toFixed(0)}%</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">How We Got There</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Original price</span>
                <span className="font-bold text-foreground">{fmt(calc.price, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Age depreciation ({calc.age} yr)</span>
                <span className="font-bold text-foreground">×{calc.retention.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Mileage adjustment</span>
                <span className="font-bold text-foreground">×{calc.mileageMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Condition ({calc.condData.label})</span>
                <span className="font-bold text-foreground">×{calc.condData.multiplier.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm pb-2 border-b border-border">
                <span className="text-muted-foreground">Accident history</span>
                <span className="font-bold text-foreground">×{calc.accidentMultiplier.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-foreground font-bold">Estimated value</span>
                <span className="font-black text-sky-600 dark:text-sky-400">{fmt(calc.estimate, symbol)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                This is a rule-of-thumb estimate based on typical depreciation curves, not a live market lookup. For a market-calibrated estimate from an actual photo of your car, try the AI valuation tool below.
              </p>
            </div>

            <Link href="/evaluate-used-car" className="flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all group">
              <div className="flex items-center gap-2.5">
                <Camera className="h-4 w-4 text-orange-500" />
                <p className="text-sm font-bold text-orange-700 dark:text-orange-400">Have a photo? Get an AI-powered market valuation instead</p>
              </div>
              <ChevronRight className="h-4 w-4 text-orange-500 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
