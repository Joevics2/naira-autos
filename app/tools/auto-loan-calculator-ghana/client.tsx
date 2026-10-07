'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// Illustrative bands only \u2014 Ghana has no single published tiered rate table
// the way SBI or Experian do. GHS bands reflect the wide spread (roughly
// 20\u201340%+) the Bank of Ghana's own APR reports have long shown across banks;
// the USD band is a rough, hedged estimate since public USD-specific vehicle
// loan rates in Ghana are not commonly published.
const GHS_TIERS = [
  { key: 'strong', label: 'Strong bank relationship', rate: 24 },
  { key: 'typical', label: 'Typical quote', rate: 30 },
  { key: 'higher',  label: 'Higher-risk profile', rate: 38 },
] as const;
const USD_RATE = 10; // illustrative only \u2014 see content for the caveat

// Combined Ghana import landed-cost calculation for a compliant (\u226410yr),
// under-3.0L vehicle: 20% duty, then 15% VAT + 2.5% NHIL + 2.5% GETFund on the
// duty-inclusive value, plus 0.5% ECOWAS + 0.75% EXIM on CIF (\u224845% on top).
function landedCost(cif: number) {
  const duty = cif * 0.20;
  const dutyInclusive = cif + duty;
  const vat = dutyInclusive * 0.15;
  const nhil = dutyInclusive * 0.025;
  const getfund = dutyInclusive * 0.025;
  const ecowas = cif * 0.005;
  const exim = cif * 0.0075;
  return cif + duty + vat + nhil + getfund + ecowas + exim;
}

const LENDERS = [
  { name: 'Stanbic Bank Ghana', note: 'Up to 90% financing (new) / 70% (used), 12\u201372mo, GHS or USD, salary-linked.', url: 'https://www.stanbicbank.com.gh/ghana/personal/borrow-for-your-needs/vehicle-loan' },
  { name: 'GCB Bank', note: "Ghana's largest indigenous bank, vehicle and asset finance for salaried and business customers.", url: 'https://www.gcbbank.com.gh/' },
  { name: 'Ecobank Ghana', note: 'Vehicle loans with insurance and registration assistance bundled in.', url: 'https://www.ecobank.com/gh/personal-banking/borrow/vehicle-finance' },
  { name: 'Absa Bank Ghana', note: 'Vehicle and asset finance for salaried employees and SMEs.', url: 'https://www.absa.com.gh/' },
  { name: 'CalBank', note: 'Historically among the higher-priced vehicle-loan providers \u2014 compare before committing.', url: 'https://calbank.net/' },
  { name: 'Republic Bank Ghana', note: 'Has posted some of the more competitive personal-loan rates in recent Bank of Ghana reports.', url: 'https://www.republicghana.com/' },
];

function fmtGHS(n: number) { return 'GH\u20B5' + Math.round(n).toLocaleString('en-GH'); }

function incomeRatioLabel(ratio: number) {
  if (ratio <= 0.20) return { label: 'Comfortable', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.33) return { label: 'Within the ~1/3-of-income guideline', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.45) return { label: 'Above what most banks will approve', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', bar: 'bg-amber-500' };
  return { label: 'Very high \u2014 unlikely to be approved as-is', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanGhanaClient() {
  const [vehiclePrice, setVehiclePrice] = useState('180000');
  const [isImport, setIsImport] = useState(false);
  const [vehicleType, setVehicleType] = useState<'new' | 'used'>('new');
  const [deposit, setDeposit] = useState('27000');
  const [loanCurrency, setLoanCurrency] = useState<'ghs' | 'usd'>('ghs');
  const [tier, setTier] = useState<typeof GHS_TIERS[number]['key'] | null>('typical');
  const [interestRate, setInterestRate] = useState('30');
  const [loanTermMonths, setLoanTermMonths] = useState('48');
  const [netIncome, setNetIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const pickTier = (key: typeof GHS_TIERS[number]['key']) => {
    setTier(key);
    setInterestRate(String(GHS_TIERS.find(t => t.key === key)!.rate));
  };
  const pickCurrency = (c: 'ghs' | 'usd') => {
    setLoanCurrency(c);
    if (c === 'usd') { setInterestRate(String(USD_RATE)); setTier(null); }
    else { setInterestRate('30'); setTier('typical'); }
  };

  const calc = useMemo(() => {
    const rawPrice = parseFloat(vehiclePrice) || 0;
    const price = isImport ? landedCost(rawPrice) : rawPrice;
    const dep = parseFloat(deposit) || 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const income = parseFloat(netIncome) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;

    const principal = Math.max(price - dep, 0);
    const mr = annual / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    const totalRepaid = monthly * months + dep;
    const totalInterest = monthly * months - principal;

    return {
      monthly, totalRepaid, totalInterest, principal, price,
      downPct: price > 0 ? (dep / price) * 100 : 0,
      incomeRatio: income > 0 ? monthly / income : 0,
      income,
    };
  }, [vehiclePrice, isImport, deposit, interestRate, loanTermMonths, netIncome]);

  const minDepositPct = vehicleType === 'new' ? 10 : 30;
  const reset = () => {
    setVehiclePrice('180000'); setIsImport(false); setVehicleType('new'); setDeposit('27000');
    setLoanCurrency('ghs'); setTier('typical'); setInterestRate('30'); setLoanTermMonths('48'); setNetIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'used'] as const).map(v => (
                  <button key={v} onClick={() => setVehicleType(v)}
                    className={`h-10 rounded-lg text-sm font-bold border transition-all capitalize ${vehicleType === v ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">{isImport ? 'CIF / Purchase Price (GH\u20B5)' : 'Vehicle Price (GH\u20B5)'} <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">GH\u20B5</span>
                <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="180000" className={`${iCls} pl-11 pr-3`} />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={isImport} onChange={e => setIsImport(e.target.checked)} className="accent-emerald-500" />
                <span className="text-xs text-muted-foreground">This is an import \u2014 add ~45% estimated duty &amp; taxes</span>
              </label>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Deposit</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.downPct.toFixed(0)}%</span>}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">GH\u20B5</span>
                <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="27000" className={`${iCls} pl-11 pr-3`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Typical minimum: {minDepositPct}% ({vehicleType})</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Loan Currency</label>
              <div className="grid grid-cols-2 gap-2">
                {([{ k: 'ghs' as const, l: 'Cedis (GHS)' }, { k: 'usd' as const, l: 'US Dollars' }]).map(({ k, l }) => (
                  <button key={k} onClick={() => pickCurrency(k)}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all ${loanCurrency === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">USD: lower rate, but you carry the cedi exchange-rate risk</p>
            </div>

            {loanCurrency === 'ghs' ? (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Rate Band</label>
                  <span className="text-xs text-muted-foreground">Illustrative</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {GHS_TIERS.map(t => (
                    <button key={t.key} onClick={() => pickTier(t.key)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      <span className="font-bold">{t.label}</span>
                      <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>{t.rate}%</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            <div className="relative">
              <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.1" min="0" max="50" className={`${iCls} pl-4 pr-14`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% p.a.</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Term</label>
                <div className="grid grid-cols-3 gap-1">
                  {[12, 24, 36, 48, 60, 72].map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Net Monthly Income <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">GH\u20B5</span>
                  <input type="number" value={netIncome} onChange={e => setNetIncome(e.target.value)} placeholder="9000" className={`${iCls} pl-11 pr-3`} />
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
                    {fmtGHS(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{loanTermMonths} months \u00b7 {interestRate}% p.a. \u00b7 {loanCurrency.toUpperCase()}-denominated</p>
                </div>

                {isImport && (
                  <p className="text-xs text-muted-foreground px-1">Landed price after estimated duty &amp; taxes: <strong className="text-foreground">{fmtGHS(calc.price)}</strong>. For exact figures, use the <Link prefetch={false} href="/tools/import-duty-calculator-ghana" className="underline underline-offset-2 hover:text-foreground">Ghana Import Duty Calculator</Link>.</p>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGHS(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGHS(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtGHS(calc.totalRepaid)}</p>
                  </div>
                </div>

                {calc.downPct < minDepositPct && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Deposit is <strong>{calc.downPct.toFixed(0)}%</strong> \u2014 most banks finance up to {vehicleType === 'new' ? '90%' : '70%'} of a {vehicleType} car, meaning at least {minDepositPct}% down.</p>
                  </div>
                )}

                {loanCurrency === 'usd' && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                    <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 dark:text-blue-200/80">This rate is an illustrative estimate \u2014 USD vehicle-loan rates aren&apos;t widely published in Ghana. Confirm the exact figure with your bank, and remember your repayments in cedi terms will move with the exchange rate.</p>
                  </div>
                )}

                {calc.income > 0 && (
                  <div className={`p-4 rounded-2xl border ${incomeRatioLabel(calc.incomeRatio).border} ${incomeRatioLabel(calc.incomeRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">Instalment / Net Income</p>
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
                        style={{ width: `${Math.min(calc.incomeRatio * 200, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={incomeRatioLabel(calc.incomeRatio).color}>~33% (common bank ceiling)</span>
                      <span>50%</span>
                    </div>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Ghanaian car loan lenders</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Loan Lenders \u2014 Ghana</p>
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
                  <Link prefetch={false} href="/tools/import-duty-calculator-ghana" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Import Duty Calc</p>
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
