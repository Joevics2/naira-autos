'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// SBP Prudential Regulations for Consumer Financing (auto finance), as
// tightened in 2026: vehicles above 1,000cc get the stricter regime; locally
// manufactured/assembled vehicles up to 1,000cc are explicitly exempted to
// protect lower/middle-income buyers and keep the older, looser terms.
const REGIME = {
  standard: { minDownPct: 30, maxTermMonths: 60, label: 'Above 1,000cc' },
  exempt:   { minDownPct: 15, maxTermMonths: 84, label: 'Up to 1,000cc (local)' },
} as const;

const KIBOR = 10.89; // 1-year KIBOR, March 2026 (SBP-verified)
const SPREADS = [
  { key: 'cheapest', label: 'Cheapest (e.g. Bank AL Habib)', spread: 2.5 },
  { key: 'typical',  label: 'Typical bank spread',           spread: 4.0 },
  { key: 'higher',   label: 'Higher-spread bank',            spread: 6.0 },
] as const;

const LENDERS = [
  { name: 'Bank AL Habib \u2014 Apni Car', note: 'Cheapest published spread (KIBOR + 2.5%), 20\u201325% down.', url: 'https://www.bankalhabib.com/' },
  { name: 'Meezan Bank \u2014 Car Ijarah', note: 'Pakistan\u2019s largest Islamic car financing (lease structure), 15\u201320% down.', url: 'https://www.meezanbank.com/car-ijarah/' },
  { name: 'Bank Alfalah \u2014 Auto Loan', note: 'KIBOR + 3.5\u20134.5%, Roshan Apni Car available for overseas Pakistanis.', url: 'https://www.bankalfalah.com/auto-finance/' },
  { name: 'HBL \u2014 Car Loan', note: '50% processing fee discount for female applicants.', url: 'https://www.hbl.com/personal/loans/car-loan' },
  { name: 'BankIslami \u2014 Auto Musharaka', note: 'Diminishing Musharakah (co-ownership) structure, Islamic alternative to Ijarah.', url: 'https://www.bankislami.com.pk/' },
  { name: 'UBL Drive', note: 'Highest minimum down payment (30%) in the market; fixed-rate option available.', url: 'https://www.ubldrive.com/' },
];

function fmtPKR(n: number) { return 'Rs ' + Math.round(n).toLocaleString('en-PK'); }

function dbrLabel(ratio: number) {
  if (ratio <= 0.25) return { label: 'Comfortably within the 40% DBR cap', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.40) return { label: 'Within the SBP\u2019s 40% DBR cap', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  return { label: 'Above 40% \u2014 banks are required to decline this', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanPakistanClient() {
  const [vehiclePrice, setVehiclePrice] = useState('6000000');
  const [engineClass, setEngineClass] = useState<keyof typeof REGIME>('standard');
  const [deposit, setDeposit] = useState('1800000');
  const [spreadKey, setSpreadKey] = useState<typeof SPREADS[number]['key'] | null>('typical');
  const [spread, setSpread] = useState('4.0');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [monthlySalary, setMonthlySalary] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const regime = REGIME[engineClass];
  const pickSpread = (key: typeof SPREADS[number]['key']) => {
    setSpreadKey(key);
    setSpread(String(SPREADS.find(s => s.key === key)!.spread));
  };

  // Keep the term within the regime's cap when switching engine class.
  useEffect(() => {
    if (parseInt(loanTermMonths) > regime.maxTermMonths) setLoanTermMonths(String(regime.maxTermMonths));
  }, [engineClass, regime.maxTermMonths, loanTermMonths]);

  const totalRate = (parseFloat(spread) || 0) + KIBOR;

  const calc = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const down = parseFloat(deposit) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const salary = parseFloat(monthlySalary) || 0;
    if (price <= 0 || months <= 0) return null;
    const principal = Math.max(price - down, 0);
    const mr = totalRate / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    const totalRepaid = monthly * months + down;
    const totalMarkup = monthly * months - principal;
    return {
      monthly, totalRepaid, totalMarkup, principal,
      downPct: price > 0 ? (down / price) * 100 : 0,
      dbr: salary > 0 ? monthly / salary : 0,
      salary,
    };
  }, [vehiclePrice, deposit, loanTermMonths, monthlySalary, totalRate]);

  const reset = () => {
    setVehiclePrice('6000000'); setEngineClass('standard'); setDeposit('1800000');
    setSpreadKey('typical'); setSpread('4.0'); setLoanTermMonths('60'); setMonthlySalary('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';
  const termOptions = engineClass === 'standard' ? [12, 24, 36, 48, 60] : [12, 24, 36, 48, 60, 72, 84];

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Engine Capacity</label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(REGIME) as (keyof typeof REGIME)[]).map(k => (
                  <button key={k} onClick={() => setEngineClass(k)}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all ${engineClass === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {REGIME[k].label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Sets the SBP minimum down payment ({regime.minDownPct}%) and max tenure ({regime.maxTermMonths / 12}yr)</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price (Rs) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Rs</span>
                <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="6000000" className={`${iCls} pl-9 pr-3`} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.downPct.toFixed(0)}%</span>}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Rs</span>
                <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="1800000" className={`${iCls} pl-9 pr-3`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">SBP minimum: {regime.minDownPct}% for this engine class</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Bank Spread (over KIBOR)</label>
                <span className="text-xs text-muted-foreground">1yr KIBOR: {KIBOR}%</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {SPREADS.map(s => (
                  <button key={s.key} onClick={() => pickSpread(s.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${spreadKey === s.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{s.label}</span>
                    <span className={spreadKey === s.key ? 'text-white/80' : 'text-muted-foreground/70'}>+{s.spread}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={spread} onChange={e => { setSpread(e.target.value); setSpreadKey(null); }} step="0.1" min="0" max="15" className={`${iCls} pl-4 pr-28`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Total: {totalRate.toFixed(2)}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Tenure</label>
                <div className="grid grid-cols-3 gap-1">
                  {termOptions.map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Monthly Salary <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">Rs</span>
                  <input type="number" value={monthlySalary} onChange={e => setMonthlySalary(e.target.value)} placeholder="150000" className={`${iCls} pl-9 pr-3`} />
                </div>
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-emerald-500/50" />
                </div>
                <p className="text-sm text-muted-foreground">Fill in the fields \u2014 results update live.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Instalment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtPKR(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{loanTermMonths} months \u00b7 KIBOR {KIBOR}% + {spread}% spread = {totalRate.toFixed(2)}%</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtPKR(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Markup</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtPKR(calc.totalMarkup)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtPKR(calc.totalRepaid)}</p>
                  </div>
                </div>

                {calc.downPct < regime.minDownPct && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Down payment is <strong>{calc.downPct.toFixed(0)}%</strong> \u2014 the SBP requires at least {regime.minDownPct}% for {regime.label.toLowerCase()} vehicles.</p>
                  </div>
                )}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">The SBP caps total auto financing per person at <strong>Rs 3,000,000</strong> across all banks combined, at any point in time.</p>
                </div>

                {calc.salary > 0 && (
                  <div className={`p-4 rounded-2xl border ${dbrLabel(calc.dbr).border} ${dbrLabel(calc.dbr).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Debt Burden Ratio (DBR)</p>
                        <p className={`text-base font-black ${dbrLabel(calc.dbr).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {dbrLabel(calc.dbr).label}
                        </p>
                      </div>
                      <p className={`text-3xl font-black ${dbrLabel(calc.dbr).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.dbr * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${dbrLabel(calc.dbr).bar}`}
                        style={{ width: `${Math.min(calc.dbr * 100, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={dbrLabel(calc.dbr).color}>40% (SBP cap)</span>
                      <span>100%</span>
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">This includes only this car instalment \u2014 the SBP\u2019s 40% cap covers ALL your loan repayments combined.</p>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Pakistani car financing banks</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Financing \u2014 Pakistan</p>
                    </div>
                    <div className="divide-y divide-border">
                      {LENDERS.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group gap-3">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <ExternalLink className="h-3 w-3 text-muted-foreground/40 flex-shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <Link prefetch={false} href="/vehicles" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Browse cars</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link prefetch={false} href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Check a VIN</p>
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
