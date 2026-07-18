'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RotateCcw, ChevronRight, Info, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react';
import { CURRENCIES, symbolFor, type CurrencyCode } from '@/lib/currencies';

type Platform = 'uber' | 'bolt' | 'lyft' | 'other';
type Period = 'daily' | 'weekly' | 'monthly';
type DistanceUnit = 'km' | 'mi';

const PLATFORMS: { id: Platform; label: string; defaultCommission: number }[] = [
  { id: 'uber', label: 'Uber', defaultCommission: 25 },
  { id: 'bolt', label: 'Bolt', defaultCommission: 20 },
  { id: 'lyft', label: 'Lyft', defaultCommission: 25 },
  { id: 'other', label: 'Other', defaultCommission: 20 },
];

const PERIODS: { id: Period; label: string }[] = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
];

function fmt(n: number, symbol: string) {
  return symbol + Math.round(n).toLocaleString('en-US');
}

function marginAssessment(marginPct: number) {
  if (marginPct < 0) return { label: 'Losing money', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/25', icon: TrendingDown };
  if (marginPct < 15) return { label: 'Thin margin — watch your expenses', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/25', icon: AlertTriangle };
  if (marginPct < 35) return { label: 'Healthy margin', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/25', icon: TrendingUp };
  return { label: 'Strong margin', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: TrendingUp };
}

export default function RideShareClient() {
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const symbol = symbolFor(currency);

  const [platform, setPlatform] = useState<Platform>('uber');
  const [period, setPeriod] = useState<Period>('weekly');
  const [grossFares, setGrossFares] = useState('150000');
  const [commission, setCommission] = useState('25');

  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>('km');
  const [distance, setDistance] = useState('600');
  const [fuelEconomy, setFuelEconomy] = useState('8'); // L/100km or MPG
  const [fuelPrice, setFuelPrice] = useState('1200'); // per liter or per gallon

  const [maintenance, setMaintenance] = useState('8000');
  const [insurance, setInsurance] = useState('0');
  const [otherExpenses, setOtherExpenses] = useState('5000');
  const [hoursWorked, setHoursWorked] = useState('40');

  const selectPlatform = (p: Platform) => {
    setPlatform(p);
    setCommission(String(PLATFORMS.find(x => x.id === p)?.defaultCommission ?? 20));
  };

  const calc = useMemo(() => {
    const gross = parseFloat(grossFares) || 0;
    const commPct = parseFloat(commission) || 0;
    const dist = parseFloat(distance) || 0;
    const econ = parseFloat(fuelEconomy) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const maint = parseFloat(maintenance) || 0;
    const ins = parseFloat(insurance) || 0;
    const other = parseFloat(otherExpenses) || 0;
    const hours = parseFloat(hoursWorked) || 0;

    const commissionAmount = gross * (commPct / 100);
    const netFare = gross - commissionAmount;

    let fuelCost = 0;
    if (distanceUnit === 'km') {
      // econ = L/100km
      const liters = dist * (econ / 100);
      fuelCost = liters * price;
    } else {
      // econ = MPG
      const gallons = econ > 0 ? dist / econ : 0;
      fuelCost = gallons * price;
    }

    const totalExpenses = fuelCost + maint + ins + other;
    const netProfit = netFare - totalExpenses;
    const marginPct = gross > 0 ? (netProfit / gross) * 100 : 0;
    const perHour = hours > 0 ? netProfit / hours : 0;
    const perDistance = dist > 0 ? netProfit / dist : 0;

    return { gross, commissionAmount, netFare, fuelCost, maint, ins, other, totalExpenses, netProfit, marginPct, perHour, perDistance, dist, hours };
  }, [grossFares, commission, distance, fuelEconomy, fuelPrice, maintenance, insurance, otherExpenses, hoursWorked, distanceUnit]);

  const reset = () => {
    setPlatform('uber'); setPeriod('weekly'); setGrossFares('150000'); setCommission('25');
    setDistanceUnit('km'); setDistance('600'); setFuelEconomy('8'); setFuelPrice('1200');
    setMaintenance('8000'); setInsurance('0'); setOtherExpenses('5000'); setHoursWorked('40');
  };

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';
  const assessment = marginAssessment(calc.marginPct);
  const AssessIcon = assessment.icon;

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Currency */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value as CurrencyCode)} className="w-full h-10 text-sm border border-border rounded-xl bg-background text-foreground px-3 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20">
                {CURRENCIES.map(c => <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.label}</option>)}
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Platform</label>
              <div className="grid grid-cols-4 gap-1.5">
                {PLATFORMS.map(p => (
                  <button key={p.id} onClick={() => selectPlatform(p.id)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${platform === p.id ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Period */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Period You&apos;re Entering</label>
              <div className="grid grid-cols-3 gap-1.5">
                {PERIODS.map(p => (
                  <button key={p.id} onClick={() => setPeriod(p.id)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${period === p.id ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gross fares + commission */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Gross Fares ({period})</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">{symbol}</span>
                  <input type="number" value={grossFares} onChange={e => setGrossFares(e.target.value)} className={`${iCls} pl-7 pr-3`} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Platform Commission</label>
                <div className="relative">
                  <input type="number" value={commission} onChange={e => setCommission(e.target.value)} step="0.5" min="0" max="50" className={`${iCls} pl-4 pr-8`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                </div>
              </div>
            </div>

            {/* Distance + unit toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Distance Driven ({period})</label>
                <div className="flex gap-1 rounded-lg border border-border p-0.5">
                  {(['km', 'mi'] as DistanceUnit[]).map(u => (
                    <button key={u} onClick={() => setDistanceUnit(u)}
                      className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${distanceUnit === u ? 'bg-emerald-500 text-white' : 'text-muted-foreground'}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
              <input type="number" value={distance} onChange={e => setDistance(e.target.value)} className={iCls} />
            </div>

            {/* Fuel economy + price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">
                  {distanceUnit === 'km' ? 'Fuel Economy (L/100km)' : 'Fuel Economy (MPG)'}
                </label>
                <input type="number" value={fuelEconomy} onChange={e => setFuelEconomy(e.target.value)} className={iCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">
                  Fuel Price / {distanceUnit === 'km' ? 'Liter' : 'Gallon'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">{symbol}</span>
                  <input type="number" value={fuelPrice} onChange={e => setFuelPrice(e.target.value)} className={`${iCls} pl-7 pr-3`} />
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">
              Not sure of your car&apos;s fuel economy? Use the <Link href="/tools/fuel-economy-converter" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">unit converter</Link> to switch between MPG, L/100km, and km/L.
            </p>

            {/* Maintenance, insurance, other */}
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Maintenance</label>
                <input type="number" value={maintenance} onChange={e => setMaintenance(e.target.value)} className={iCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Insurance</label>
                <input type="number" value={insurance} onChange={e => setInsurance(e.target.value)} className={iCls} />
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Other</label>
                <input type="number" value={otherExpenses} onChange={e => setOtherExpenses(e.target.value)} className={iCls} />
              </div>
            </div>
            <p className="text-xs text-muted-foreground -mt-2">Maintenance/insurance/other are all for the same {period.replace('ly', '')} period. &quot;Other&quot; covers data, car wash, tolls, and parking.</p>

            {/* Hours worked */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Hours Worked ({period})</label>
              <input type="number" value={hoursWorked} onChange={e => setHoursWorked(e.target.value)} className={iCls} />
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">

            {/* Net profit hero */}
            <div className={`p-5 rounded-2xl ${assessment.bg} border ${assessment.border}`}>
              <div className="flex items-center justify-between mb-1">
                <p className={`text-xs font-bold uppercase tracking-wide ${assessment.color}`}>Net Profit ({period})</p>
                <div className={`flex items-center gap-1 text-xs font-bold ${assessment.color}`}>
                  <AssessIcon className="h-3.5 w-3.5" /> {assessment.label}
                </div>
              </div>
              <p className={`text-4xl font-black leading-none ${assessment.color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {fmt(calc.netProfit, symbol)}
              </p>
              <p className={`text-xs mt-1 ${assessment.color} opacity-80`}>{calc.marginPct.toFixed(1)}% margin on gross fares</p>

              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-current/10">
                <div>
                  <p className={`text-xs opacity-70 ${assessment.color}`}>Per hour</p>
                  <p className={`text-lg font-black ${assessment.color}`}>{fmt(calc.perHour, symbol)}</p>
                </div>
                <div>
                  <p className={`text-xs opacity-70 ${assessment.color}`}>Per {distanceUnit}</p>
                  <p className={`text-lg font-black ${assessment.color}`}>{symbol}{calc.perDistance.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Breakdown */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Breakdown</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Gross fares</span>
                <span className="font-bold text-foreground">{fmt(calc.gross, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Platform commission ({commission}%)</span>
                <span className="font-bold text-red-500">−{fmt(calc.commissionAmount, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm pb-2 border-b border-border">
                <span className="text-foreground font-semibold">Net fare</span>
                <span className="font-bold text-foreground">{fmt(calc.netFare, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Fuel</span>
                <span className="font-bold text-red-500">−{fmt(calc.fuelCost, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Maintenance</span>
                <span className="font-bold text-red-500">−{fmt(calc.maint, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Insurance</span>
                <span className="font-bold text-red-500">−{fmt(calc.ins, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm pb-2 border-b border-border">
                <span className="text-muted-foreground">Other</span>
                <span className="font-bold text-red-500">−{fmt(calc.other, symbol)}</span>
              </div>
              <div className="flex items-center justify-between text-sm pt-1">
                <span className="text-foreground font-bold">Net profit</span>
                <span className={`font-black ${calc.netProfit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{fmt(calc.netProfit, symbol)}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Info className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
                This doesn&apos;t include vehicle depreciation, loan/lease payments on the car itself, or income tax — factor those in separately for a true bottom line.
              </p>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2">
              <Link href="/tools/fuel-cost-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Fuel cost calculator</p>
                <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
              </Link>
              <Link href="/tools/insurance-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Insurance calculator</p>
                <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
