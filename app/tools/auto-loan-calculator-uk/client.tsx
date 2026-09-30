'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// Illustrative representative-APR bands for 2025-26 (there's no single
// published national rate table for UK motor finance the way SBI or Experian
// publish one — every lender sets its own representative APR).
const TIERS = [
  { key: 'excellent', label: 'Excellent credit', rate: 7.5 },
  { key: 'good',       label: 'Good credit',      rate: 10.5 },
  { key: 'fair',       label: 'Average / weaker credit', rate: 15.0 },
] as const;

const LENDERS = [
  { name: 'Black Horse (Lloyds Banking Group)', note: 'One of the largest UK motor finance providers, arranged mainly through dealers.', url: 'https://www.blackhorse.co.uk/' },
  { name: 'MotoNovo Finance (FirstRand)', note: 'Major dealer-finance provider; online eligibility checker available.', url: 'https://www.motonovofinance.com/' },
  { name: 'Santander Consumer Finance UK', note: 'Bank-backed, both dealer and direct-to-consumer routes.', url: 'https://www.santanderconsumer.co.uk/' },
  { name: 'Close Brothers Motor Finance', note: 'Independent finance house, strong presence with used-car dealers.', url: 'https://www.closemotorfinance.co.uk/' },
  { name: 'Volkswagen Financial Services', note: 'Manufacturer-tied finance, sometimes subsidised on new models.', url: 'https://www.vwfs.co.uk/' },
];

function fmtGBP(n: number) { return '\u00A3' + Math.round(n).toLocaleString('en-GB'); }

function incomeRatioLabel(ratio: number) {
  if (ratio <= 0.10) return { label: 'Within the 10% (finance-only) guideline', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.15) return { label: 'Above 10%, but common with PCP\u2019s lower headline payments', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.20) return { label: 'At the edge of the 15\u201320% total-cost guideline', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', bar: 'bg-amber-500' };
  return { label: 'Above the usual guideline for total vehicle costs', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanUKClient() {
  const [financeType, setFinanceType] = useState<'pcp' | 'hp'>('pcp');
  const [vehiclePrice, setVehiclePrice] = useState('24000');
  const [deposit, setDeposit] = useState('2400');
  const [gmfvPct, setGmfvPct] = useState('40');
  const [tier, setTier] = useState<typeof TIERS[number]['key'] | null>('good');
  const [interestRate, setInterestRate] = useState('10.5');
  const [loanTermMonths, setLoanTermMonths] = useState('48');
  const [netIncome, setNetIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const pickTier = (key: typeof TIERS[number]['key']) => {
    setTier(key);
    setInterestRate(String(TIERS.find(t => t.key === key)!.rate));
  };

  const calc = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const gmfv = financeType === 'pcp' ? Math.min(Math.max(parseFloat(gmfvPct) || 0, 0), 90) : 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(netIncome) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;

    const principal = Math.max(price - dep, 0);
    const balloonAmount = (price * gmfv) / 100;
    const mr = annual / 100 / 12;
    let monthly: number;
    if (mr === 0) {
      monthly = Math.max(principal - balloonAmount, 0) / months;
    } else {
      const pow = Math.pow(1 + mr, months);
      monthly = (principal * mr * pow - balloonAmount * mr) / (pow - 1);
    }
    const totalInstallments = monthly * months;
    const totalAmountPayable = dep + totalInstallments + balloonAmount; // incl. deposit, per CCA 1974 definition
    const totalInterest = totalInstallments + balloonAmount - principal;

    // Voluntary termination (Consumer Credit Act 1974, s.99): once the
    // consumer has PAID 50% of the total amount payable (deposit + all
    // instalments + GMFV for PCP), they can hand the car back.
    const vtThreshold = totalAmountPayable * 0.5;
    let vtMonth: number | null = null;
    for (let m = 1; m <= months; m++) {
      if (dep + monthly * m >= vtThreshold) { vtMonth = m; break; }
    }

    return {
      monthly, totalAmountPayable, totalInterest, principal, balloonAmount,
      downPct: price > 0 ? (dep / price) * 100 : 0,
      incomeRatio: income > 0 ? monthly / income : 0,
      vtThreshold, vtMonth, income, dep,
    };
  }, [vehiclePrice, deposit, gmfvPct, financeType, interestRate, loanTermMonths, netIncome]);

  const reset = () => {
    setFinanceType('pcp'); setVehiclePrice('24000'); setDeposit('2400'); setGmfvPct('40');
    setTier('good'); setInterestRate('10.5'); setLoanTermMonths('48'); setNetIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Finance Type</label>
              <div className="grid grid-cols-2 gap-2">
                {([{ k: 'pcp' as const, l: 'PCP' }, { k: 'hp' as const, l: 'HP' }]).map(({ k, l }) => (
                  <button key={k} onClick={() => setFinanceType(k)}
                    className={`h-10 rounded-lg text-sm font-bold border transition-all ${financeType === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{financeType === 'pcp' ? 'Lower monthly payment, optional final payment to own' : 'Higher monthly payment, you own it outright at the end'}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price (\u00A3, incl. VAT) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u00A3</span>
                <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="24000" className={`${iCls} pl-6 pr-3`} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Deposit</label>
                {vehiclePrice && deposit && parseFloat(vehiclePrice) > 0 && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{((parseFloat(deposit) / parseFloat(vehiclePrice)) * 100).toFixed(0)}%</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u00A3</span>
                <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="2400" className={`${iCls} pl-6 pr-3`} />
              </div>
            </div>

            {financeType === 'pcp' && (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">GMFV (Optional Final Payment)</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[35, 40, 45, 50].map(g => (
                    <button key={g} onClick={() => setGmfvPct(String(g))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${gmfvPct === String(g) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {g}%
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Guaranteed Minimum Future Value \u2014 a lump sum owed only if you choose to keep the car</p>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Credit Profile</label>
                <span className="text-xs text-muted-foreground">Representative APR</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {TIERS.map(t => (
                  <button key={t.key} onClick={() => pickTier(t.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{t.label}</span>
                    <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>{t.rate}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.1" min="0" max="35" className={`${iCls} pl-4 pr-16`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% APR</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Term</label>
                <div className="grid grid-cols-2 gap-1">
                  {[24, 36, 48, 60].map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Net Monthly Pay <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u00A3</span>
                  <input type="number" value={netIncome} onChange={e => setNetIncome(e.target.value)} placeholder="2400" className={`${iCls} pl-6 pr-3`} />
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
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Payment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtGBP(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{financeType.toUpperCase()} \u00b7 {loanTermMonths} months \u00b7 {interestRate}% representative APR</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGBP(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGBP(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Amount Payable</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGBP(calc.totalAmountPayable)}</p>
                  </div>
                </div>

                {calc.balloonAmount > 0 && (
                  <p className="text-xs text-muted-foreground px-1">A <strong className="text-foreground">{fmtGBP(calc.balloonAmount)}</strong> GMFV is due only if you choose to keep the car at the end of the term \u2014 it&apos;s not part of the monthly payment above.</p>
                )}

                <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400 mb-1">Voluntary Termination (Section 99, CCA 1974)</p>
                      <p className="text-sm text-blue-800 dark:text-blue-200/90 leading-relaxed">
                        You can hand the car back once you&apos;ve paid <strong>{fmtGBP(calc.vtThreshold)}</strong> (50% of the total amount payable){calc.vtMonth ? <> \u2014 around <strong>month {calc.vtMonth}</strong> of {loanTermMonths} on this plan.</> : <>, which this term doesn&apos;t reach \u2014 try a longer term or check your actual agreement.</>}
                      </p>
                    </div>
                  </div>
                </div>

                {calc.downPct < 10 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Deposit is <strong>{calc.downPct.toFixed(0)}%</strong> \u2014 most PCP/HP deals ask for at least 10%.</p>
                  </div>
                )}

                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${incomeRatioLabel(calc.incomeRatio).border} ${incomeRatioLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Payment / Net Income</p>
                        <p className={`text-base font-black ${incomeRatioLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {incomeRatioLabel(calc.incomeRatio).label}
                        </p>
                      </div>
                      <p className={`text-3xl font-black ${incomeRatioLabel(calc.incomeRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.incomeRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${incomeRatioLabel(calc.incomeRatio).bar}`}
                        style={{ width: `${Math.min(calc.incomeRatio * 400, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={incomeRatioLabel(calc.incomeRatio).color}>10% (finance)</span>
                      <span>15\u201320% (total)</span>
                    </div>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>UK motor finance providers</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Motor Finance Providers \u2014 UK</p>
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
                  <Link href="/vehicles" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Browse cars</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
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
