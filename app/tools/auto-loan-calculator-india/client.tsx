'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle
} from 'lucide-react';

// New-car rates from SBI's published CIBIL-tier table (2026); used-car rates
// from SBI's Certified Pre-Owned Used Car Loan Scheme (10.45–15.60%), spread
// across the same four bands.
const TIERS = [
  { key: 'excellent', label: '750+',       desc: 'Excellent', newRate: 8.70,  usedRate: 10.45 },
  { key: 'good',       label: '700–749',    desc: 'Good',      newRate: 8.90,  usedRate: 11.50 },
  { key: 'fair',       label: '650–699',    desc: 'Fair',      newRate: 9.75,  usedRate: 13.00 },
  { key: 'poor',       label: 'Below 650 / no history', desc: 'NBFC territory', newRate: 13.00, usedRate: 15.60 },
] as const;

const LENDERS = [
  { name: 'State Bank of India', rate: '8.70–9.85%', note: 'PSU bank. LTV up to 90% of on-road price, tenure up to 7 years.', url: 'https://sbi.co.in/web/personal-banking/loans/auto-loan' },
  { name: 'HDFC Bank', rate: 'from 8.15%', note: 'Private bank, fast digital approval for existing customers.', url: 'https://www.hdfcbank.com/personal/borrow/popular-loans/new-car-loan' },
  { name: 'ICICI Bank', rate: 'from 8.40%', note: 'Private bank, up to 7-year tenure on new cars.', url: 'https://www.icicibank.com/personal-banking/loans/car-loan' },
  { name: 'Canara Bank', rate: 'from 7.45%', note: 'PSU bank, among the lowest advertised starting rates.', url: 'https://canarabank.com/car-loan' },
  { name: 'Kotak Mahindra Bank', rate: '8.75–14%', note: 'New and used cars; used-car rates run higher (11–14%).', url: 'https://www.kotak.com/en/personal-banking/loans/car-loan.html' },
  { name: 'Bajaj Finance (NBFC)', rate: '10–14%', note: 'NBFC — approves lower CIBIL scores banks decline; 2% + GST processing fee.', url: 'https://www.bajajfinserv.in/car-loan' },
];

function fmtINR(n: number) { return '\u20B9' + Math.round(n).toLocaleString('en-IN'); }

function emiRatioLabel(ratio: number) {
  if (ratio <= 0.10) return { label: 'Within the 20-10-4 guideline', color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/25', bar: 'bg-emerald-500' };
  if (ratio <= 0.15) return { label: 'Slightly above 20-10-4, likely fine under bank FOIR', color: 'text-blue-700 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/25', bar: 'bg-blue-500' };
  if (ratio <= 0.25) return { label: 'Stretching your budget', color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/25', bar: 'bg-amber-500' };
  return { label: 'High EMI burden \u2014 reconsider price or tenure', color: 'text-red-700 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', border: 'border-red-200 dark:border-red-500/25', bar: 'bg-red-500' };
}

export default function AutoLoanIndiaClient() {
  const [onRoadPrice, setOnRoadPrice] = useState('900000');
  const [downPayment, setDownPayment] = useState('180000');
  const [vehicleType, setVehicleType] = useState<'new' | 'used'>('new');
  const [tier, setTier] = useState<typeof TIERS[number]['key'] | null>('excellent');
  const [interestRate, setInterestRate] = useState('8.70');
  const [loanTermMonths, setLoanTermMonths] = useState('60');
  const [netSalary, setNetSalary] = useState('');
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
    const price = parseFloat(onRoadPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const annual = parseFloat(interestRate) || 0;
    const months = parseInt(loanTermMonths) || 0;
    const salary = parseFloat(netSalary) || 0;
    if (price <= 0 || months <= 0 || annual < 0) return null;
    const principal = Math.max(price - down, 0);
    if (principal <= 0) return { emi: 0, totalRepaid: down, totalInterest: 0, principal: 0, downPct: 100, emiRatio: 0, salary, down };
    const mr = annual / 100 / 12;
    const emi = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    return {
      emi,
      totalRepaid: emi * months + down,
      totalInterest: emi * months - principal,
      principal,
      downPct: price > 0 ? (down / price) * 100 : 0,
      emiRatio: salary > 0 ? emi / salary : 0,
      salary,
      down,
    };
  }, [onRoadPrice, downPayment, interestRate, loanTermMonths, netSalary]);

  const reset = () => {
    setOnRoadPrice('900000'); setDownPayment('180000'); setVehicleType('new');
    setTier('excellent'); setInterestRate('8.70'); setLoanTermMonths('60'); setNetSalary('');
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
                  <button key={v} onClick={() => pickVehicleType(v)}
                    className={`h-10 rounded-lg text-sm font-bold border transition-all capitalize ${vehicleType === v ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">On-Road Price (\u20B9) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u20B9</span>
                <input type="number" value={onRoadPrice} onChange={e => setOnRoadPrice(e.target.value)} placeholder="900000" className={`${iCls} pl-6 pr-3`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ex-showroom + insurance + road tax + registration \u2014 not the brochure price</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment</label>
                {onRoadPrice && downPayment && parseFloat(onRoadPrice) > 0 && (
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{((parseFloat(downPayment) / parseFloat(onRoadPrice)) * 100).toFixed(0)}%</span>
                )}
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u20B9</span>
                <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="180000" className={`${iCls} pl-6 pr-3`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{vehicleType === 'new' ? 'Typical: 10–20% of on-road price' : 'Typical: 15–30% for used cars'}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">CIBIL Score</label>
                <span className="text-xs text-muted-foreground">SBI 2026 rate table</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {TIERS.map(t => (
                  <button key={t.key} onClick={() => pickTier(t.key)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <span className="font-bold">{t.label} <span className="font-normal opacity-80">({t.desc})</span></span>
                    <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>{vehicleType === 'new' ? t.newRate : t.usedRate}%</span>
                  </button>
                ))}
              </div>
              <div className="relative mt-2">
                <input type="number" value={interestRate} onChange={e => { setInterestRate(e.target.value); setTier(null); }} step="0.01" min="0" max="30" className={`${iCls} pl-4 pr-14`} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% p.a.</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Tenure</label>
                <div className="grid grid-cols-3 gap-1">
                  {[24, 36, 48, 60, 72, 84].map(t => (
                    <button key={t} onClick={() => setLoanTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${loanTermMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">36–60mo recommended</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Net Monthly Salary <span className="text-muted-foreground font-normal">(optional)</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">\u20B9</span>
                  <input type="number" value={netSalary} onChange={e => setNetSalary(e.target.value)} placeholder="85000" className={`${iCls} pl-6 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">For the 20-10-4 check</p>
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
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly EMI</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtINR(calc.emi)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">per month \u00b7 {loanTermMonths} months \u00b7 {interestRate}% p.a. (reducing balance)</p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Loan Amount</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtINR(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-base font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtINR(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtINR(calc.totalRepaid)}</p>
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">Loan Breakdown</p>
                  <div className="flex h-3 rounded-full overflow-hidden gap-px">
                    <div className="bg-emerald-500" style={{ width: `${(calc.down / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-blue-500" style={{ width: `${(calc.principal / calc.totalRepaid) * 100}%` }} />
                    <div className="bg-red-400 rounded-r-full" style={{ width: `${(calc.totalInterest / calc.totalRepaid) * 100}%` }} />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {[
                      { color: 'bg-emerald-500', label: 'Down', value: fmtINR(calc.down) },
                      { color: 'bg-blue-500', label: 'Principal', value: fmtINR(calc.principal) },
                      { color: 'bg-red-400', label: 'Interest', value: fmtINR(calc.totalInterest) },
                    ].map(({ color, label, value }) => (
                      <div key={label} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-sm flex-shrink-0 ${color}`} />
                        <span className="text-xs text-muted-foreground">{label}: <strong className="text-foreground">{value}</strong></span>
                      </div>
                    ))}
                  </div>
                </div>

                {calc.downPct < (vehicleType === 'new' ? 10 : 15) && calc.principal > 0 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Down payment is <strong>{calc.downPct.toFixed(0)}%</strong> \u2014 most lenders require at least {vehicleType === 'new' ? '10\u201320%' : '15\u201330%'} of the on-road price.</p>
                  </div>
                )}

                {calc.salary > 0 && (
                  <div className={`p-4 rounded-2xl border ${emiRatioLabel(calc.emiRatio).border} ${emiRatioLabel(calc.emiRatio).bg}`}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-0.5">EMI / Net Salary</p>
                        <p className={`text-base font-black ${emiRatioLabel(calc.emiRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {emiRatioLabel(calc.emiRatio).label}
                        </p>
                      </div>
                      <p className={`text-3xl font-black ${emiRatioLabel(calc.emiRatio).color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.emiRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-white/20 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                      <div className={`h-full rounded-full transition-all duration-500 ${emiRatioLabel(calc.emiRatio).bar}`}
                        style={{ width: `${Math.min(calc.emiRatio * 300, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0%</span>
                      <span className={emiRatioLabel(calc.emiRatio).color}>10% (20-10-4)</span>
                      <span>25%</span>
                      <span>33%</span>
                    </div>
                    <p className={`text-xs mt-2 leading-relaxed opacity-80 ${emiRatioLabel(calc.emiRatio).color}`}>
                      {calc.emiRatio <= 0.10 ? 'Within the personal-finance guideline \u2014 comfortable headroom for fuel, insurance, and maintenance.' : calc.emiRatio <= 0.15 ? 'A little above the strict 20-10-4 guideline, but still well inside what banks themselves allow (up to 50\u201375% FOIR).' : calc.emiRatio <= 0.25 ? 'Stretching your monthly budget \u2014 banks may still approve this, but it leaves little room for other EMIs or expenses.' : 'A high EMI burden relative to income. Consider a bigger down payment, a shorter tenure, or a lower on-road price.'}
                    </p>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Indian car loan lenders (2026 rates)</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Loan Lenders \u2014 India</p>
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
