'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle
} from 'lucide-react';

// Experian "State of the Automotive Finance Market," Q2 2026 (VantageScore 4.0 tiers).
const TIERS = [
  { key: 'super', label: 'Super Prime', score: '781+',    newRate: 4.41, usedRate: 6.29 },
  { key: 'prime', label: 'Prime',       score: '661–780', newRate: 6.15, usedRate: 8.81 },
  { key: 'near',  label: 'Near Prime',  score: '601–660', newRate: 9.71, usedRate: 13.93 },
  { key: 'sub',   label: 'Subprime',    score: '501–600', newRate: 13.52, usedRate: 19.10 },
  { key: 'deep',  label: 'Deep Subprime', score: '300–500', newRate: 16.11, usedRate: 21.62 },
] as const;

const LENDERS = [
  { name: 'PenFed Credit Union', rate: 'from 3.39%*', note: '*With PenFed\u2019s car-buying service; 4.19%+ without. Open to all, small membership deposit.', url: 'https://www.penfed.org/auto-loans' },
  { name: 'Bank of America', rate: 'from 5.44%', note: 'Existing customers get a rate discount; no minimum credit score published.', url: 'https://www.bankofamerica.com/auto-loans/' },
  { name: 'Capital One Auto Navigator', rate: 'from 4.91%', note: 'Soft-pull prequalification; min. score around 500; purchase only through partner dealers.', url: 'https://www.capitalone.com/cars/' },
  { name: 'LightStream (Truist)', rate: 'from 6.49%*', note: '*With autopay. Good/excellent credit only; no vehicle age or mileage limit.', url: 'https://www.lightstream.com/auto-loans' },
  { name: 'Navy Federal Credit Union', rate: 'from 4.79%', note: 'Military, veterans, and family only.', url: 'https://www.navyfederal.org/loans-cards/auto-loans.html' },
  { name: 'Consumers Credit Union', rate: 'varies', note: 'Bad-credit friendly, terms up to 96 months. Membership required.', url: 'https://www.myconsumers.org/loans/auto-loans' },
];

function fmt(n: number) { return '$' + Math.round(n).toLocaleString('en-US'); }

function ptiLabel(ratio: number) {
  if (ratio <= 0.08) return { label: 'Comfortably inside the 20/4/10 rule', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.10) return { label: 'At the 20/4/10 guideline (10%)', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.15) return { label: 'Manageable, but tight with insurance and gas added', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/25', bar: 'bg-amber-500' };
  return { label: 'High risk \u2014 exceeds the usual guideline', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanUSAClient() {
  const [carPrice, setCarPrice] = useState('35000');
  const [tradeIn, setTradeIn] = useState('0');
  const [downPayment, setDownPayment] = useState('5000');
  const [salesTax, setSalesTax] = useState('7');
  const [vehicleType, setVehicleType] = useState<'new' | 'used'>('new');
  const [tier, setTier] = useState<typeof TIERS[number]['key'] | null>('prime');
  const [interestRate, setInterestRate] = useState('6.15');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const pickTier = (key: typeof TIERS[number]['key']) => {
    const t = TIERS.find(t => t.key === key)!;
    setTier(key);
    setInterestRate(String(vehicleType === 'new' ? t.newRate : t.usedRate));
  };
  const pickVehicleType = (v: 'new' | 'used') => {
    setVehicleType(v);
    if (tier) {
      const t = TIERS.find(t => t.key === tier)!;
      setInterestRate(String(v === 'new' ? t.newRate : t.usedRate));
    }
  };

  const calc = useMemo(() => {
    const price = parseFloat(carPrice) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const down = parseFloat(downPayment) || 0;
    const taxPct = parseFloat(salesTax) || 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(monthlyIncome) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;

    const taxableAmount = Math.max(price - trade, 0); // most states tax only the trade-in difference
    const taxOwed = taxableAmount * (taxPct / 100);
    const principal = Math.max(price - trade - down, 0) + taxOwed;
    if (principal <= 0) {
      return { monthly: 0, totalRepaid: down + trade, totalInterest: 0, principal: 0, taxOwed, downPct: 100, incomeRatio: 0, income, down, trade };
    }
    const mr = annual / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    return {
      monthly,
      totalRepaid: monthly * months + down + trade,
      totalInterest: monthly * months - principal,
      principal,
      taxOwed,
      downPct: price > 0 ? (down / price) * 100 : 0,
      incomeRatio: income > 0 ? monthly / income : 0,
      income,
      down,
      trade,
    };
  }, [carPrice, tradeIn, downPayment, salesTax, interestRate, loanTermMonths, monthlyIncome]);

  const reset = () => {
    setCarPrice('35000'); setTradeIn('0'); setDownPayment('5000'); setSalesTax('7');
    setVehicleType('new'); setTier('prime'); setInterestRate('6.15'); setLoanTermMonths('60'); setMonthlyIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* New vs used */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'used'] as const).map(v => (
                  <button key={v} onClick={() => pickVehicleType(v)}
                    className={`h-10 rounded-lg text-sm font-bold border transition-all capitalize ${vehicleType === v ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Car price + trade-in */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={carPrice} onChange={e => setCarPrice(e.target.value)} placeholder="35000" className={`${iCls} pl-6 pr-3`} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Trade-In Value <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={tradeIn} onChange={e => setTradeIn(e.target.value)} placeholder="0" className={`${iCls} pl-6 pr-3`} />
                </div>
              </div>
            </div>

            {/* Down payment + sales tax */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment</label>
                  {carPrice && downPayment && parseFloat(carPrice) > 0 && (
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{((parseFloat(downPayment) / parseFloat(carPrice)) * 100).toFixed(0)}%</span>
                  )}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="5000" className={`${iCls} pl-6 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">20/4/10 rule: ~20%</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Sales Tax</label>
                <div className="relative">
                  <input type="number" value={salesTax} onChange={e => setSalesTax(e.target.value)} step="0.1" min="0" max="12" className={`${iCls} pl-4 pr-8`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">0% (OR, MT) to ~9%+</p>
              </div>
            </div>

            {/* Credit tier */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Credit Tier (VantageScore)</label>
                <span className="text-xs text-muted-foreground">Experian, Q2 2026</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {TIERS.map(t => (
                  <button key={t.key} onClick={() => pickTier(t.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{t.label}</span>
                    <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>{t.score} · {vehicleType === 'new' ? t.newRate : t.usedRate}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.01" min="0" max="30" className={`${iCls} pl-4 pr-8`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% APR</span>
              </div>
            </div>

            {/* Loan term + income */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Loan Term</label>
                <div className="grid grid-cols-3 gap-1">
                  {[36, 48, 60, 72, 84].map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Gross Monthly Income <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={monthlyIncome} onChange={e => setMonthlyIncome(e.target.value)} placeholder="6000" className={`${iCls} pl-6 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">For the 20/4/10 check</p>
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
                <p className="text-sm text-muted-foreground">Fill in the fields — results update live.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Payment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmt(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">per month · {loanTermMonths} months · {interestRate}% APR</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
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

                {calc.taxOwed > 0 && (
                  <p className="text-xs text-muted-foreground px-1">Includes <strong className="text-foreground">{fmt(calc.taxOwed)}</strong> in sales tax rolled into the loan (most buyers finance it rather than pay it upfront).</p>
                )}

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">Loan Breakdown</p>
                  <div className="flex h-3 rounded-full overflow-hidden gap-px">
                    <div className="bg-emerald-500" style={{ width: `${((calc.down + calc.trade) / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(calc.principal / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-red-400 rounded-r-full" style={{ width: `${(calc.totalInterest / calc.totalRepaid) * 100}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      { color: 'bg-emerald-500', label: 'Down + Trade-In', value: fmt(calc.down + calc.trade) },
                      { color: 'bg-blue-500', label: 'Amount Financed', value: fmt(calc.principal) },
                      { color: 'bg-red-400', label: 'Interest', value: fmt(calc.totalInterest) },
                    ].map(({ color, label, value }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-sm flex-shrink-0 ${color}`} />
                        <span className="text-xs text-muted-foreground">{label}: <strong className="text-foreground">{value}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>

                {calc.downPct < 10 && calc.principal > 0 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Down payment is <strong>{calc.downPct.toFixed(0)}%</strong> — the 20/4/10 rule suggests 20% to avoid starting the loan underwater.</p>
                  </div>
                )}

                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${ptiLabel(calc.incomeRatio).border} ${ptiLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Payment-to-Income</p>
                        <p className={`text-base font-black ${ptiLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {ptiLabel(calc.incomeRatio).label}
                        </p>
                      </div>
                      <p className={`text-3xl font-black ${ptiLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.incomeRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${ptiLabel(calc.incomeRatio).bar}`}
                        style={{ width: `${Math.min(calc.incomeRatio * 500, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={ptiLabel(calc.incomeRatio).color}>10% (20/4/10)</span>
                      <span>15%</span>
                      <span>20%</span>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed opacity-80 ${ptiLabel(calc.incomeRatio).color}`}>
                      {calc.incomeRatio <= 0.08 ? 'Healthy headroom for insurance, gas, and maintenance on top of this payment.' : calc.incomeRatio <= 0.10 ? 'Right at the 20/4/10 guideline — remember this rule covers the loan payment plus insurance, gas, and upkeep combined, so budget those separately too.' : calc.incomeRatio <= 0.15 ? 'This will make the 20/4/10 guideline hard to hit once insurance, gas, and maintenance are added.' : 'Well above the usual payment-to-income guideline. Consider a lower price, bigger down payment, or shorter term.'}
                    </p>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>US car loan lenders (2026 rates)</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Loan Lenders — United States</p>
                    </div>
                    <div className="divide-y divide-border">
                      {LENDERS.map(l => (
                        <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/30 transition-colors group gap-3">
                          <div>
                            <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{l.name}</p>
                            <p className="text-xs text-muted-foreground">{l.note}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2 py-0.5 rounded-full whitespace-nowrap">{l.rate}</span>
                            <ExternalLink className="h-3 w-3 text-muted-foreground/40" />
                          </div>
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
