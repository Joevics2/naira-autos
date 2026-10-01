'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle
} from 'lucide-react';

const PROVINCES = [
  { code: 'ab', label: 'Alberta',           rate: 5.0,    quebec: false },
  { code: 'bc', label: 'British Columbia',  rate: 12.0,   quebec: false },
  { code: 'sk', label: 'Saskatchewan',      rate: 11.0,   quebec: false },
  { code: 'mb', label: 'Manitoba',          rate: 12.0,   quebec: false },
  { code: 'on', label: 'Ontario',           rate: 13.0,   quebec: false },
  { code: 'qc', label: 'Quebec',            rate: 14.975, quebec: true },
  { code: 'atl', label: 'Atlantic (NB/NS/PE/NL)', rate: 15.0, quebec: false },
  { code: 'terr', label: 'Territories (YT/NT/NU)', rate: 5.0, quebec: false },
] as const;

// Illustrative bands \u2014 there's no single published national tiered rate
// table the way SBI or Experian publish one; BoC tracks a national average
// (6.57% as of April 2026) but individual quotes vary by lender and credit.
const TIERS = [
  { key: 'excellent', label: 'Excellent credit', rate: 5.5 },
  { key: 'good',       label: 'Good credit',      rate: 7.0 },
  { key: 'fair',       label: 'Fair / weaker credit', rate: 11.0 },
] as const;

const LENDERS = [
  { name: 'RBC Royal Bank', note: 'Auto loan pre-approval available online before you visit a dealer.', url: 'https://www.rbcroyalbank.com/auto/loans.html' },
  { name: 'TD Canada Trust', note: 'Car loan and auto finance through TD Auto Finance.', url: 'https://www.td.com/ca/en/personal-banking/products/loans/auto-loans' },
  { name: 'Scotiabank', note: 'Auto loan with rate discounts for existing customers.', url: 'https://www.scotiabank.com/ca/en/personal/loans/auto-financing.html' },
  { name: 'BMO', note: 'Vehicle loan with flexible term options up to 96 months.', url: 'https://www.bmo.com/main/personal/loans/vehicle-financing/' },
  { name: 'CIBC', note: 'Personal auto loan with online application.', url: 'https://www.cibc.com/en/personal-banking/loans-lines-credit/personal-loans/auto-financing.html' },
  { name: 'Desjardins', note: "Quebec's dominant credit union network \u2014 often competitive for Quebec residents.", url: 'https://www.desjardins.com/ca/personal/loans-financing/auto-financing/index.jsp' },
];

function fmtCAD(n: number) { return '$' + Math.round(n).toLocaleString('en-CA'); }

function incomeRatioLabel(ratio: number) {
  if (ratio <= 0.08) return { label: 'Comfortable', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.10) return { label: 'At the 20/4/10 guideline (10%, all-in)', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.15) return { label: 'Above 20/4/10, within looser modern guidance', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', bar: 'bg-amber-500' };
  return { label: 'High relative to income', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanCanadaClient() {
  const [vehiclePrice, setVehiclePrice] = useState('42000');
  const [tradeIn, setTradeIn] = useState('6000');
  const [deposit, setDeposit] = useState('6300');
  const [province, setProvince] = useState<typeof PROVINCES[number]['code']>('on');
  const [tier, setTier] = useState<typeof TIERS[number]['key'] | null>('good');
  const [interestRate, setInterestRate] = useState('7.0');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [grossIncome, setGrossIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const prov = PROVINCES.find(p => p.code === province)!;
  const pickTier = (key: typeof TIERS[number]['key']) => {
    setTier(key);
    setInterestRate(String(TIERS.find(t => t.key === key)!.rate));
  };

  const calc = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const trade = parseFloat(tradeIn) || 0;
    const down = parseFloat(deposit) || 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(grossIncome) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;

    const taxable = Math.max(price - trade, 0); // trade-in credit (QC needs an "accommodation sale")
    const tax = taxable * (prov.rate / 100);
    const principal = Math.max(price - trade - down, 0) + tax;
    const mr = annual / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    const totalRepaid = monthly * months + down + trade;
    const totalInterest = monthly * months - principal;

    return {
      monthly, totalRepaid, totalInterest, principal, tax,
      downPct: price > 0 ? (down / price) * 100 : 0,
      incomeRatio: income > 0 ? monthly / income : 0,
      income, down, trade,
    };
  }, [vehiclePrice, tradeIn, deposit, interestRate, loanTermMonths, grossIncome, prov.rate]);

  const reset = () => {
    setVehiclePrice('42000'); setTradeIn('6000'); setDeposit('6300'); setProvince('on');
    setTier('good'); setInterestRate('7.0'); setLoanTermMonths('60'); setGrossIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';
  const longTerm = parseInt(loanTermMonths) >= 84;

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="42000" className={`${iCls} pl-6 pr-3`} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Trade-In <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={tradeIn} onChange={e => setTradeIn(e.target.value)} placeholder="6000" className={`${iCls} pl-6 pr-3`} />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Province</label>
              <div className="grid grid-cols-2 gap-1.5">
                {PROVINCES.map(p => (
                  <button key={p.code} onClick={() => setProvince(p.code)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-bold border transition-all text-left ${province === p.code ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {p.label} <span className="opacity-70">({p.rate}%)</span>
                  </button>
                ))}
              </div>
              {prov.quebec && (
                <p className="text-xs text-muted-foreground mt-1.5">Quebec only credits your trade-in if the dealer structures it as an &ldquo;accommodation sale&rdquo; &mdash; ask for this by name.</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.downPct.toFixed(0)}%</span>}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="6300" className={`${iCls} pl-6 pr-3`} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Credit Profile</label>
                <span className="text-xs text-muted-foreground">BoC avg: 6.57%</span>
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
                <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.1" min="0" max="30" className={`${iCls} pl-4 pr-14`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% APR</span>
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
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={grossIncome} onChange={e => setGrossIncome(e.target.value)} placeholder="7917" className={`${iCls} pl-6 pr-3`} />
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
                    {fmtCAD(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{loanTermMonths} months \u00b7 {interestRate}% \u00b7 {prov.label} ({prov.rate}% tax)</p>
                </div>

                <p className="text-xs text-muted-foreground px-1">Includes <strong className="text-foreground">{fmtCAD(calc.tax)}</strong> in sales tax, calculated on the price after your trade-in and financed into the loan.</p>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtCAD(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtCAD(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtCAD(calc.totalRepaid)}</p>
                  </div>
                </div>

                {longTerm && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">The FCAC has flagged {loanTermMonths}-month loans as a negative-equity risk \u2014 you may owe more than the car is worth for much of the term.</p>
                  </div>
                )}

                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${incomeRatioLabel(calc.incomeRatio).border} ${incomeRatioLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Payment / Gross Income</p>
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
                      <span className={incomeRatioLabel(calc.incomeRatio).color}>10% (20/4/10)</span>
                      <span>15%</span>
                    </div>
                    <p className="text-xs mt-2 text-muted-foreground">This is the payment alone \u2014 the 20/4/10 rule\u2019s 10% is meant to cover insurance and fuel too.</p>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Canadian auto lenders</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Auto Lenders \u2014 Canada</p>
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
