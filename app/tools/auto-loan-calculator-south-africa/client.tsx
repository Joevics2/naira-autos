'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle
} from 'lucide-react';

// SARB prime lending rate, held at 10.50% after the July 2026 MPC meeting.
const PRIME = 10.50;

// Illustrative risk margins over prime — South African vehicle finance doesn't
// publish a single national rate card the way SBI or Experian do, so these
// are typical bank risk-margin bands rather than one lender's exact table.
const TIERS = [
  { key: 'excellent', label: 'Excellent credit', margin: 1 },
  { key: 'good',       label: 'Good credit',      margin: 3 },
  { key: 'fair',       label: 'Fair credit',       margin: 5 },
  { key: 'higher',     label: 'Higher risk',       margin: 7 },
] as const;

const LENDERS = [
  { name: 'WesBank', rate: 'Prime + margin', note: 'Market leader by volume, part of FirstRand. Arranged mostly through dealers.', url: 'https://www.wesbank.co.za/' },
  { name: 'Absa Vehicle & Asset Finance', rate: 'Prime + margin', note: 'Online pre-qualification available before you visit a dealer.', url: 'https://www.absa.co.za/personal/vehicle-finance/' },
  { name: 'Standard Bank', rate: 'Prime + margin', note: 'AutoBank vehicle finance, pre-approval tool available online.', url: 'https://www.standardbank.co.za/southafrica/personal/products-and-services/borrow-for-your-needs/vehicle-and-asset-finance' },
  { name: 'Nedbank (MFC)', rate: 'Prime + margin', note: "Nedbank's dedicated vehicle finance division.", url: 'https://www.mfc.co.za/' },
  { name: 'FNB', rate: 'Prime + margin', note: 'Online application with instant pre-qualification.', url: 'https://www.fnb.co.za/loans/vehicle-finance.html' },
  { name: 'Toyota Financial Services / VWFS', rate: 'Promotional rates vary', note: 'Manufacturer captive finance — sometimes undercuts banks on new-model promotions.', url: 'https://www.toyotafinance.co.za/' },
];

function fmtZAR(n: number) { return 'R' + Math.round(n).toLocaleString('en-ZA'); }

// NCA-capped initiation fee: R165 + 10% of the amount financed above R1,000,
// capped at R1,207.50 (Nedbank Vehicle & Asset Finance pricing guide, 2026).
function initiationFee(principal: number) {
  if (principal <= 0) return 0;
  const fee = 165 + Math.max(principal - 1000, 0) * 0.10;
  return Math.min(fee, 1207.50);
}
const MONTHLY_SERVICE_FEE = 69; // NCA-capped, 2026

function incomeRatioLabel(ratio: number) {
  if (ratio <= 0.15) return { label: 'Comfortable \u2014 room left for insurance & fuel', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.20) return { label: 'At the edge of WesBank\u2019s 20\u201325% guideline', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.25) return { label: 'At the guideline\u2019s outer limit', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', bar: 'bg-amber-500' };
  return { label: 'Exceeds the usual guideline', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanZAClient() {
  const [vehiclePrice, setVehiclePrice] = useState('320000');
  const [deposit, setDeposit] = useState('32000');
  const [balloonPct, setBalloonPct] = useState('0');
  const [tier, setTier] = useState<typeof TIERS[number]['key'] | null>('good');
  const [interestRate, setInterestRate] = useState(String(PRIME + 3));
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [grossIncome, setGrossIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const pickTier = (key: typeof TIERS[number]['key']) => {
    const t = TIERS.find(t => t.key === key)!;
    setTier(key);
    setInterestRate(String(PRIME + t.margin));
  };

  const calc = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const balloon = Math.min(Math.max(parseFloat(balloonPct) || 0, 0), 100);
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(grossIncome) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;

    const principalBeforeFee = Math.max(price - dep, 0);
    const fee = initiationFee(principalBeforeFee);
    const principal = principalBeforeFee + fee; // most lenders capitalise the initiation fee into the loan
    const balloonAmount = (price * balloon) / 100;
    const mr = annual / 100 / 12;

    let installment: number;
    if (principal <= 0) {
      installment = 0;
    } else if (mr === 0) {
      installment = Math.max(principal - balloonAmount, 0) / months;
    } else {
      // Annuity-with-balloon (future value) formula: standard for SA
      // instalment-sale agreements with a residual/guaranteed future value.
      const pow = Math.pow(1 + mr, months);
      installment = (principal * mr * pow - balloonAmount * mr) / (pow - 1);
    }
    const totalInstallments = installment * months;
    const totalPaid = totalInstallments + balloonAmount + dep;
    const totalInterest = totalInstallments + balloonAmount - principal;
    const monthlyTotal = installment + MONTHLY_SERVICE_FEE;

    return {
      installment, monthlyTotal, totalPaid, totalInterest, principal, fee, balloonAmount,
      downPct: price > 0 ? (dep / price) * 100 : 0,
      incomeRatio: income > 0 ? monthlyTotal / income : 0,
      income, dep,
    };
  }, [vehiclePrice, deposit, balloonPct, interestRate, loanTermMonths, grossIncome]);

  const reset = () => {
    setVehiclePrice('320000'); setDeposit('32000'); setBalloonPct('0');
    setTier('good'); setInterestRate(String(PRIME + 3)); setLoanTermMonths('60'); setGrossIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price (R) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">R</span>
                <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="320000" className={`${iCls} pl-6 pr-3`} />
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
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">R</span>
                <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="32000" className={`${iCls} pl-6 pr-3`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Balloon / Residual Payment</label>
              <div className="grid grid-cols-5 gap-1">
                {[0, 10, 20, 30, 37].map(b => (
                  <button key={b} onClick={() => setBalloonPct(String(b))}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${balloonPct === String(b) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {b}%
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">WesBank average is ~37% \u2014 owed as a lump sum at the end, not a discount</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Credit Profile</label>
                <span className="text-xs text-muted-foreground">Prime: {PRIME}%</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {TIERS.map(t => (
                  <button key={t.key} onClick={() => pickTier(t.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{t.label}</span>
                    <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>Prime + {t.margin}% = {(PRIME + t.margin).toFixed(2)}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.01" min="0" max="35" className={`${iCls} pl-4 pr-14`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% p.a.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Term</label>
                <div className="grid grid-cols-3 gap-1">
                  {[36, 48, 60, 72, 84, 96].map(t => (
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">R</span>
                  <input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} placeholder="32000" className={`${iCls} pl-6 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">For the 20\u201325% check</p>
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
                    {fmtZAR(calc.monthlyTotal)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{fmtZAR(calc.installment)} + R69 NCA service fee \u00b7 {loanTermMonths} months \u00b7 {interestRate}% p.a.</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtZAR(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtZAR(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtZAR(calc.totalPaid)}</p>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground px-1">Includes a {fmtZAR(calc.fee)} NCA-capped initiation fee, capitalised into the loan.
                  {calc.balloonAmount > 0 && <> A <strong className="text-foreground">{fmtZAR(calc.balloonAmount)}</strong> balloon payment is due as a lump sum at the end of the {loanTermMonths}-month term \u2014 not included in the monthly instalment above.</>}
                </p>

                {calc.downPct < 10 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Deposit is <strong>{calc.downPct.toFixed(0)}%</strong> \u2014 a healthy deposit lowers your instalment and brings your breakeven point forward.</p>
                  </div>
                )}

                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${incomeRatioLabel(calc.incomeRatio).border} ${incomeRatioLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Instalment / Gross Income</p>
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
                        style={{ width: `${Math.min(calc.incomeRatio * 300, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span>15%</span>
                      <span className={incomeRatioLabel(calc.incomeRatio).color}>20\u201325% (WesBank guideline)</span>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed opacity-80 ${incomeRatioLabel(calc.incomeRatio).color}`}>
                      {calc.incomeRatio <= 0.15 ? 'Comfortable headroom for insurance and fuel within the 20\u201325% total vehicle-cost guideline.' : calc.incomeRatio <= 0.25 ? 'Within WesBank\u2019s recommended range for total vehicle costs \u2014 but that 20\u201325% is meant to cover insurance and fuel too, not just this instalment.' : 'Above the usual 20\u201325% guideline for total vehicle costs. Consider a bigger deposit, a balloon payment, or a lower price.'}
                    </p>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>South African vehicle finance providers</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Vehicle Finance \u2014 South Africa</p>
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
