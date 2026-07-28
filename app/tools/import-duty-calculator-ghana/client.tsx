'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, AlertTriangle, RefreshCw, Info, ChevronDown, ChevronUp,
  RotateCcw, ExternalLink, Printer, ShieldAlert, TrendingDown, Flag,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, Legend } from 'recharts';

type Category = 'car_suv' | 'pickup_van_bus' | 'truck_lorry' | 'motorcycle';
type Fuel = 'petrol' | 'diesel';
type Condition = 'used' | 'new';

const FALLBACK_RATE = 11.6; // GHS per USD, July 2026
const CURRENT_YEAR = new Date().getFullYear();

const CATEGORY_LABEL: Record<Category, string> = {
  car_suv: 'Car / SUV',
  pickup_van_bus: 'Pick-up / Van / Bus',
  truck_lorry: 'Truck / Lorry',
  motorcycle: 'Motorcycle',
};

function fmtGHS(n: number) { return '₵' + Math.round(n).toLocaleString('en-GH'); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString('en-US'); }
function pct(r: number) { return (r * 100).toFixed(1) + '%'; }

function getDutyRate(category: Category, fuel: Fuel, cc: number): number {
  if (category === 'car_suv') {
    if (fuel === 'petrol') {
      if (cc <= 1000) return 0.05;
      if (cc <= 3000) return 0.10;
      return 0.20;
    }
    if (cc <= 1500) return 0.05;
    if (cc <= 2500) return 0.10;
    return 0.20;
  }
  if (category === 'motorcycle') return 0.05;
  return 0.10; // pickup/van/bus and truck/lorry — standard band
}

function getOverageRate(category: Category, age: number): number {
  if (category === 'truck_lorry') {
    if (age <= 10) return 0;
    if (age <= 12) return 0.05;
    if (age <= 22) return 0.10;
    return 0.30;
  }
  if (category === 'pickup_van_bus') {
    if (age <= 10) return 0;
    if (age <= 12) return 0.025;
    if (age <= 15) return 0.20;
    return 0.50;
  }
  // car_suv, motorcycle
  if (age <= 10) return 0;
  if (age <= 12) return 0.05;
  if (age <= 15) return 0.20;
  return 0.50;
}

interface BreakdownLine {
  label: string;
  formula: string;
  amount: number;
  highlight?: boolean;
  warn?: boolean;
}

const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#0ea5e9', '#94a3b8'];

export default function ImportDutyGhanaClient() {
  const [category, setCategory] = useState<Category>('car_suv');
  const [fuel, setFuel] = useState<Fuel>('petrol');
  const [condition, setCondition] = useState<Condition>('used');
  const [cc, setCc] = useState(1800);
  const [manufactureYear, setManufactureYear] = useState(CURRENT_YEAR - 8);
  const [useDirectCIF, setUseDirectCIF] = useState(false);
  const [cifUSD, setCifUSD] = useState('9000');
  const [fobUSD, setFobUSD] = useState('7500');
  const [freightUSD, setFreightUSD] = useState('900');
  const [insurancePct, setInsurancePct] = useState('1');
  const [exchangeRate, setExchangeRate] = useState(String(FALLBACK_RATE));
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLastFetched, setRateLastFetched] = useState<string | null>(null);
  const [portAgentFees, setPortAgentFees] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchLiveRate = useCallback(async () => {
    setRateLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.GHS) {
        setExchangeRate(data.rates.GHS.toFixed(2));
        setRateLastFetched(new Date().toLocaleTimeString());
      }
    } catch { /* silent — keep fallback */ } finally { setRateLoading(false); }
  }, []);

  const age = CURRENT_YEAR - manufactureYear;
  const isOverage = age > 10;

  const result = useMemo(() => {
    const er = parseFloat(exchangeRate) || FALLBACK_RATE;
    const fob = parseFloat(fobUSD) || 0;
    const freight = parseFloat(freightUSD) || 0;
    const insRate = (parseFloat(insurancePct) || 1) / 100;
    const computedCifUSD = fob + freight + (fob + freight) * insRate;
    const cif = (useDirectCIF ? parseFloat(cifUSD) || 0 : computedCifUSD) * er;

    if (cif <= 0) return null;

    const dutyRate = getDutyRate(category, fuel, cc);
    const duty = dutyRate * cif;
    const dutyInclusive = cif + duty;

    const nhil = 0.025 * dutyInclusive;
    const getfund = 0.025 * dutyInclusive;
    const vatBase = dutyInclusive + nhil + getfund;
    const vat = 0.15 * vatBase;

    const auLevy = 0.002 * cif;
    const ecowasLevy = 0.005 * cif;
    const eximLevy = 0.0075 * cif;
    const specialImportLevy = 0.02 * cif;
    const examFee = condition === 'used' ? 0.01 * cif : 0;

    const overageRate = condition === 'used' ? getOverageRate(category, age) : 0;
    const overagePenalty = overageRate * cif;

    const extraFees = parseFloat(portAgentFees) || 0;

    const totalTaxes = duty + nhil + getfund + vat + auLevy + ecowasLevy + eximLevy + specialImportLevy + examFee + overagePenalty;
    const grandTotal = cif + totalTaxes + extraFees;
    const effectivePct = (totalTaxes / cif) * 100;

    // What-if: same car, but ≤10 years old (no overage penalty)
    const whatIfOverageRate = 0;
    const whatIfOveragePenalty = whatIfOverageRate * cif;
    const whatIfTotalTaxes = totalTaxes - overagePenalty + whatIfOveragePenalty;
    const savingsIfNewer = overagePenalty;

    const lines: BreakdownLine[] = [
      { label: 'CIF Value', formula: `${useDirectCIF ? 'Declared CIF' : 'FOB + Freight + Insurance'} × ₵${er.toFixed(2)}/USD`, amount: cif },
      { label: `Import Duty — ${pct(dutyRate)} of CIF`, formula: `${pct(dutyRate)} × ${fmtGHS(cif)}`, amount: duty },
      { label: 'NHIL — 2.5% of CIF+Duty', formula: `2.5% × ${fmtGHS(dutyInclusive)}`, amount: nhil },
      { label: 'GETFund Levy — 2.5% of CIF+Duty', formula: `2.5% × ${fmtGHS(dutyInclusive)}`, amount: getfund },
      { label: 'AU Levy — 0.2% of CIF', formula: `0.2% × ${fmtGHS(cif)}`, amount: auLevy },
      { label: 'ECOWAS Levy — 0.5% of CIF', formula: `0.5% × ${fmtGHS(cif)}`, amount: ecowasLevy },
      { label: 'EXIM Levy — 0.75% of CIF', formula: `0.75% × ${fmtGHS(cif)}`, amount: eximLevy },
      { label: 'Special Import Levy — 2% of CIF', formula: `2% × ${fmtGHS(cif)}`, amount: specialImportLevy },
    ];
    if (examFee > 0) lines.push({ label: 'Examination Fee — 1% of CIF (used)', formula: `1% × ${fmtGHS(cif)}`, amount: examFee });
    lines.push({ label: `VAT — 15% of (CIF+Duty+NHIL+GETFund)`, formula: `15% × ${fmtGHS(vatBase)}`, amount: vat });
    if (overagePenalty > 0) {
      lines.push({
        label: `Overage Penalty — ${pct(overageRate)} of CIF (vehicle is ${age} yrs old)`,
        formula: `${pct(overageRate)} × ${fmtGHS(cif)}`,
        amount: overagePenalty,
        warn: true,
      });
    }
    lines.push({ label: 'Total Statutory Duties & Taxes', formula: 'Sum of all levies', amount: totalTaxes, highlight: true });
    if (extraFees > 0) lines.push({ label: 'Port / Agent / Misc (your estimate)', formula: 'User entered', amount: extraFees });
    lines.push({ label: 'Estimated Total Landed Cost', formula: 'CIF + Duties + Fees', amount: grandTotal, highlight: true });

    const pieData = [
      { name: 'CIF Value', value: cif },
      { name: 'Import Duty', value: duty },
      { name: 'VAT', value: vat },
      { name: 'NHIL + GETFund', value: nhil + getfund },
      { name: 'Other Levies', value: auLevy + ecowasLevy + eximLevy + specialImportLevy + examFee },
      ...(overagePenalty > 0 ? [{ name: 'Overage Penalty', value: overagePenalty }] : []),
    ];

    return { cif, dutyRate, duty, totalTaxes, grandTotal, effectivePct, overagePenalty, overageRate, savingsIfNewer, whatIfTotalTaxes, lines, pieData };
  }, [category, fuel, condition, cc, manufactureYear, age, useDirectCIF, cifUSD, fobUSD, freightUSD, insurancePct, exchangeRate, portAgentFees]);

  const reset = () => {
    setCategory('car_suv'); setFuel('petrol'); setCondition('used');
    setCc(1800); setManufactureYear(CURRENT_YEAR - 8);
    setUseDirectCIF(false); setCifUSD('9000'); setFobUSD('7500'); setFreightUSD('900');
    setInsurancePct('1'); setExchangeRate(String(FALLBACK_RATE)); setPortAgentFees('');
  };

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background print:bg-white" id="ghana-duty-calculator">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* News banner */}
        <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-300 rounded-xl px-4 py-2.5 mb-6 print:hidden">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span><strong>2026 update:</strong> VAT reform effective Jan 1, 2026 — standard rate 15%, the 1% COVID levy has been removed. Overage penalty enforcement continues post-amnesty (after Jul 31, 2026).</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4 print:hidden">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Category</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(Object.keys(CATEGORY_LABEL) as Category[]).map((c) => (
                  <button key={c} onClick={() => setCategory(c)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold border transition-all ${
                      category === c ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                    }`}>
                    {CATEGORY_LABEL[c]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {category === 'car_suv' && (
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Fuel Type</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['petrol', 'diesel'] as Fuel[]).map((f) => (
                      <button key={f} onClick={() => setFuel(f)}
                        className={`py-2 rounded-lg text-xs font-bold border capitalize transition-all ${
                          fuel === f ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                        }`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className={category === 'car_suv' ? '' : 'col-span-2'}>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Condition</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(['used', 'new'] as Condition[]).map((c) => (
                    <button key={c} onClick={() => setCondition(c)}
                      className={`py-2 rounded-lg text-xs font-bold border capitalize transition-all ${
                        condition === c ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                      }`}>
                      {c === 'used' ? 'Used' : 'Brand New'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Engine Size: {cc.toLocaleString()}cc</label>
              </div>
              <input type="range" min={600} max={5000} step={100} value={cc}
                onChange={(e) => setCc(parseInt(e.target.value))}
                className="w-full accent-emerald-500" />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Manufacture Year: {manufactureYear} {condition === 'used' && (
                    <span className={isOverage ? 'text-red-500' : 'text-emerald-500'}>({age} yrs old)</span>
                  )}
                </label>
              </div>
              <input type="range" min={CURRENT_YEAR - 25} max={CURRENT_YEAR} step={1} value={manufactureYear}
                onChange={(e) => setManufactureYear(parseInt(e.target.value))}
                className={`w-full ${isOverage && condition === 'used' ? 'accent-red-500' : 'accent-emerald-500'}`} />
              {isOverage && condition === 'used' && (
                <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                  <Flag className="h-3 w-3" /> Over 10 years — overage penalty applies
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button onClick={() => setUseDirectCIF(false)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${!useDirectCIF ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                Calculate CIF from FOB
              </button>
              <button onClick={() => setUseDirectCIF(true)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${useDirectCIF ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                I know my CIF
              </button>
            </div>

            {useDirectCIF ? (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">CIF Value (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={cifUSD} onChange={(e) => setCifUSD(e.target.value)} className={`${iCls} pl-7`} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">FOB Value (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                    <input type="number" value={fobUSD} onChange={(e) => setFobUSD(e.target.value)} className={`${iCls} pl-7`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Freight (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                    <input type="number" value={freightUSD} onChange={(e) => setFreightUSD(e.target.value)} className={`${iCls} pl-7`} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Exchange Rate (GHS per USD)</label>
              <div className="flex gap-2">
                <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} className={iCls} />
                <button onClick={fetchLiveRate} disabled={rateLoading}
                  className="h-11 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/50 flex items-center gap-1.5 text-xs font-bold text-muted-foreground flex-shrink-0">
                  <RefreshCw className={`h-3.5 w-3.5 ${rateLoading ? 'animate-spin' : ''}`} />
                  Live
                </button>
              </div>
              {rateLastFetched && <p className="text-[11px] text-muted-foreground mt-1">Fetched {rateLastFetched}</p>}
            </div>

            <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              Advanced: Port &amp; Agent Fees
            </button>
            {showAdvanced && (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Port / Clearing Agent Fees (GHS)</label>
                <input type="number" value={portAgentFees} onChange={(e) => setPortAgentFees(e.target.value)} placeholder="e.g. 3500" className={iCls} />
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={reset} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <a href="https://gra.gov.gh/customs/vehicle-importation/" target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-500/20 ml-auto">
                <ExternalLink className="h-3.5 w-3.5" /> Verify on GRA ICUMS
              </a>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-4">
            {result ? (
              <>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated Total Landed Cost</p>
                      <p className="text-3xl font-black text-foreground transition-all" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fmtGHS(result.grandTotal)}
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtUSD(result.grandTotal / (parseFloat(exchangeRate) || FALLBACK_RATE))} equivalent</p>
                    </div>
                    <button onClick={() => window.print()} className="print:hidden flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border flex-shrink-0">
                      <Printer className="h-3.5 w-3.5" /> Save / Print
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Total Duties &amp; Taxes</p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{fmtGHS(result.totalTaxes)}</p>
                    </div>
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Effective Rate</p>
                      <p className="text-lg font-black text-orange-600 dark:text-orange-400">{result.effectivePct.toFixed(1)}%</p>
                    </div>
                  </div>

                  {result.overagePenalty > 0 && (
                    <div className="flex items-start gap-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl p-3 mb-4">
                      <TrendingDown className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-red-700 dark:text-red-300">
                        <strong>What-if:</strong> This vehicle is {age} years old, adding {fmtGHS(result.overagePenalty)} in overage penalty.
                        A vehicle 10 years old or newer would owe {fmtGHS(result.savingsIfNewer)} less in penalty alone.
                      </p>
                    </div>
                  )}

                  <div className="h-56 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={result.pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                          {result.pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <RTooltip formatter={(v: number) => fmtGHS(v)} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5">
                    {result.lines.map((line, i) => (
                      <div key={i}
                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs ${
                          line.highlight ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 font-bold'
                          : line.warn ? 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20'
                          : 'bg-muted/30'
                        }`}>
                        <div>
                          <p className={`font-semibold ${line.warn ? 'text-red-700 dark:text-red-300' : 'text-foreground'}`}>{line.label}</p>
                          <p className="text-muted-foreground text-[10px]">{line.formula}</p>
                        </div>
                        <p className={`font-bold flex-shrink-0 ${line.warn ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>{fmtGHS(line.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-xl p-3">
                  <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <p>Estimate only, based on published GRA rates and ECOWAS CET bands. Final assessment happens on GRA&apos;s ICUMS/UNIPASS system and may differ based on valuation, HS code classification, and vehicle condition at physical examination. Right-hand drive vehicles generally require ministerial dispensation; salvaged/flood-damaged vehicles are prohibited.</p>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
                Enter a FOB value (or CIF) to see your estimated duty breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
