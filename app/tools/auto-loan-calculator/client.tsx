'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle
} from 'lucide-react';

const LENDERS = [
  { name: 'Autochek Finance', rate: '18–24%', note: 'Pan-African auto finance, online application', url: 'https://autochek.africa/ng/financing' },
  { name: 'First Bank AutoLoan', rate: '22–28%', note: 'Up to 48 months, salary earners', url: 'https://www.firstbanknigeria.com' },
  { name: 'GTBank Auto Loan', rate: '22–30%', note: 'Existing GTB customers preferred', url: 'https://www.gtbank.com' },
  { name: 'UBA Auto Loan', rate: '24–30%', note: 'New and used vehicles, up to 36 months', url: 'https://www.ubagroup.com' },
  { name: 'Carbon (Carfully)', rate: '18–26%', note: 'Digital-first, fast approval', url: 'https://carbon.ng' },
  { name: 'Stanbic IBTC Auto', rate: '22–28%', note: 'Salary and self-employed options', url: 'https://www.stanbicibtcbank.com' },
];

function fmt(n: number) { return '₦' + Math.round(n).toLocaleString('en-NG'); }

function affordabilityLabel(ratio: number) {
  if (ratio <= 0.15) return { label: 'Comfortably affordable', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.20) return { label: 'Manageable', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.33) return { label: 'Stretching your budget', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/25', bar: 'bg-amber-500' };
  return { label: 'High risk — exceeds recommended limit', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanClient() {
  const [carPrice, setCarPrice] = useState('8000000');
  const [downPayment, setDownPayment] = useState('2000000');
  const [interestRate, setInterestRate] = useState('28');
  const [loanTermMonths, setLoanTermMonths] = useState('36');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const calc = useMemo(() => {
    const price = parseFloat(carPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    if (price <= 0 || months <= 0 || annual <= 0) return null;
    const principal = Math.max(price - down, 0);
    if (principal <= 0) return { monthly: 0, totalRepaid: price, totalInterest: 0, principal: 0, downPct: 100, incomeRatio: 0, income, down };
    const mr = annual / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    return { monthly, totalRepaid: monthly * months + down, totalInterest: monthly * months - principal, principal, downPct: (down / price) * 100, incomeRatio: income > 0 ? monthly / income : 0, income, down };
  }, [carPrice, downPayment, interestRate, loanTermMonths, monthlyIncome]);

  const reset = () => { setCarPrice('8000000'); setDownPayment('2000000'); setInterestRate('28'); setLoanTermMonths('36'); setMonthlyIncome(''); };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Car price + Down payment */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Car Price (₦) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₦</span>
                  <input type="number" value={carPrice} onChange={e => setCarPrice(e.target.value)} placeholder="8000000" className={`${iCls} pl-7 pr-3`} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment</label>
                  {carPrice && downPayment && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{((parseFloat(downPayment) / parseFloat(carPrice)) * 100).toFixed(0)}%</span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₦</span>
                  <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="2000000" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Min 20–30%</p>
              </div>
            </div>

            {/* Interest rate */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Annual Interest Rate</label>
                <span className="text-xs text-muted-foreground">Typical: 22–35%</span>
              </div>
              <div className="relative mb-2">
                <input type="number" value={interestRate} onChange={e => setInterestRate(e.target.value)} step="0.5" min="5" max="50" className={`${iCls} pl-4 pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {[18, 22, 25, 28, 32, 35].map(r => (
                  <button key={r} onClick={() => setInterestRate(String(r))}
                    className={`text-xs px-2 py-1 rounded-lg border transition-all font-medium ${interestRate === String(r) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {r}%
                  </button>
                ))}
              </div>
            </div>

            {/* Loan term + Monthly income side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Loan Term</label>
                <div className="grid grid-cols-3 gap-1">
                  {[12, 24, 36, 48, 60].map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Monthly Income <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₦</span>
                  <input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(e.target.value)} placeholder="500000" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">For affordability check</p>
              </div>
            </div>

            {/* Reset */}
            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset to defaults
            </button>
          </div>

          {/* ── Results (live) ── */}
          <div className="lg:col-span-3 space-y-3">
            {!calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Calculator className="h-5 w-5 text-emerald-500/50" />
                </div>
                <p className="text-sm text-muted-foreground">Fill in the fields — results update live.</p>
              </div>
            ) : (
              <>
                {/* Monthly payment hero */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Repayment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmt(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">per month · {loanTermMonths} months · {interestRate}% p.a.</p>
                </div>

                {/* Summary trio */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(calc.totalRepaid)}</p>
                  </div>
                </div>

                {/* Amortisation bar */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">Loan Breakdown</p>
                  <div className="flex h-3 rounded-full overflow-hidden gap-px">
                    <div className="bg-emerald-500" style={{ width: `${(calc.down / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(calc.principal / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-red-400 rounded-r-full" style={{ width: `${(calc.totalInterest / calc.totalRepaid) * 100}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      { color: 'bg-emerald-500', label: 'Down', value: fmt(calc.down) },
                      { color: 'bg-blue-500', label: 'Principal', value: fmt(calc.principal) },
                      { color: 'bg-red-400', label: 'Interest', value: fmt(calc.totalInterest) },
                    ].map(({ color, label, value }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-sm flex-shrink-0 ${color}`} />
                        <span className="text-xs text-muted-foreground">{label}: <strong className="text-foreground">{value}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Down payment warning */}
                {calc.downPct < 20 && calc.principal > 0 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Down payment is <strong>{calc.downPct.toFixed(0)}%</strong> — most Nigerian banks require 20–30% minimum.</p>
                  </div>
                )}

                {/* Affordability check */}
                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${affordabilityLabel(calc.incomeRatio).border} ${affordabilityLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Affordability</p>
                        <p className={`text-base font-black ${affordabilityLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {affordabilityLabel(calc.incomeRatio).label}
                        </p>
                      </div>
                      <p className={`text-3xl font-black ${affordabilityLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.incomeRatio * 100).toFixed(0)}%
                      </p>
                    </div>
                    <div className="h-2 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${affordabilityLabel(calc.incomeRatio).bar}`}
                        style={{ width: `${Math.min(calc.incomeRatio * 200, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={affordabilityLabel(calc.incomeRatio).color}>15% ideal</span>
                      <span>33% max</span>
                      <span>50%</span>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed opacity-80 ${affordabilityLabel(calc.incomeRatio).color}`}>
                      {calc.incomeRatio <= 0.15 ? 'Healthy headroom — you can comfortably manage this loan.' : calc.incomeRatio <= 0.20 ? 'Manageable, but budget for insurance, fuel, and maintenance on top.' : calc.incomeRatio <= 0.33 ? 'This will stretch your budget. Total car costs will be significantly higher than the loan repayment alone.' : 'Exceeds the 33% income limit most lenders apply. Consider a lower price, higher down payment, or longer term.'}
                    </p>
                  </div>
                )}

                {/* Loan providers */}
                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Nigerian car loan providers</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Loan Providers — Nigeria</p>
                    </div>
                    <div className="divide-y divide-border">
                      {LENDERS.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3 flex-shrink-0">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full">{l.rate}</span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground/40" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/listings" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Browse cars</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/tools/import-duty-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Import duty</p>
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