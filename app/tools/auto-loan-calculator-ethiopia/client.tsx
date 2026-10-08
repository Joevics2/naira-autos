'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

// Microfinance (e.g. Nisir): up to 50% LTV, capped at 750,000 birr, and no
// prior savings relationship required — a materially different product from
// a bank loan, not just a smaller version of one.
const MICROFINANCE_CAP = 750000;
const MICROFINANCE_MAX_LTV = 50;

const RATE_BANDS = [
  { key: 'birr', label: 'Birr-denominated', rate: 14.5 },
  { key: 'fx',   label: 'Foreign-currency-denominated', rate: 10.0 },
] as const;

const LENDERS = [
  { name: 'Awash Bank', note: 'Car loans from ~14.5%, up to 7 years. Private-use applicants: ~6-month assessment wait; commercial (taxi): ~2 months, with bank advertising on the vehicle.', url: 'https://awashbank.com/' },
  { name: 'Commercial Bank of Ethiopia (CBE)', note: "Ethiopia's largest bank by deposits.", url: 'https://combanketh.et/' },
  { name: 'Dashen Bank', note: 'Major private bank, vehicle and consumer finance.', url: 'https://dashenbanksc.com/' },
  { name: 'Bank of Abyssinia', note: 'Consumer and vehicle finance products.', url: 'https://www.bankofabyssinia.com/' },
  { name: 'Nisir Microfinance', note: 'Up to 50% of vehicle value, capped at 750,000 birr. No prior savings history required, but 5% of the loan must be saved first.', url: 'https://nisirmfi.com/' },
];

function fmtETB(n: number) { return 'Br ' + Math.round(n).toLocaleString('en-US'); }

export default function AutoLoanEthiopiaClient() {
  const [channel, setChannel] = useState<'bank' | 'micro'>('bank');
  const [price, setPrice] = useState('1500000');
  const [downPayment, setDownPayment] = useState('300000');
  const [rateBand, setRateBand] = useState<typeof RATE_BANDS[number]['key'] | null>('birr');
  const [rate, setRate] = useState('14.5');
  const [termMonths, setTermMonths] = useState('60');
  const [income, setIncome] = useState('');
  const [showLenders, setShowLenders] = useState(false);

  const pickRate = (key: typeof RATE_BANDS[number]['key']) => {
    setRateBand(key);
    setRate(String(RATE_BANDS.find(r => r.key === key)!.rate));
  };

  const microLoanCap = useMemo(() => {
    const p = parseFloat(price) || 0;
    return Math.min(p * (MICROFINANCE_MAX_LTV / 100), MICROFINANCE_CAP);
  }, [price]);

  useEffect(() => {
    if (channel === 'micro') {
      const p = parseFloat(price) || 0;
      const maxLoan = microLoanCap;
      const minDown = Math.max(p - maxLoan, 0);
      if ((parseFloat(downPayment) || 0) < minDown) setDownPayment(String(Math.round(minDown)));
    }
  }, [channel, microLoanCap, price, downPayment]);

  const calc = useMemo(() => {
    const p = parseFloat(price) || 0;
    const dep = parseFloat(downPayment) || 0;
    const r = parseFloat(rate) || 0;
    const months = parseInt(termMonths) || 0;
    const inc = parseFloat(income) || 0;
    if (p <= 0 || months <= 0 || r < 0) return null;
    let principal = Math.max(p - dep, 0);
    if (channel === 'micro') principal = Math.min(principal, microLoanCap);
    const mr = r / 100 / 12;
    const monthly = mr === 0 ? principal / months : (principal * mr * Math.pow(1 + mr, months)) / (Math.pow(1 + mr, months) - 1);
    const totalPaid = monthly * months + dep;
    const totalInterest = monthly * months - principal;
    return {
      monthly, totalPaid, totalInterest, principal,
      depositPct: p > 0 ? (dep / p) * 100 : 0,
      incomeRatio: inc > 0 ? monthly / inc : 0,
      inc,
    };
  }, [price, downPayment, rate, termMonths, income, channel, microLoanCap]);

  const reset = () => {
    setChannel('bank'); setPrice('1500000'); setDownPayment('300000');
    setRateBand('birr'); setRate('14.5'); setTermMonths('60'); setIncome('');
  };
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Financing Channel</label>
              <div className="grid grid-cols-2 gap-2">
                {([{ k: 'bank' as const, l: 'Bank Loan' }, { k: 'micro' as const, l: 'Microfinance' }]).map(({ k, l }) => (
                  <button key={k} onClick={() => setChannel(k)}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all ${channel === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {l}
                  </button>
                ))}
              </div>
              {channel === 'micro' && (
                <p className="text-xs text-muted-foreground mt-1">Max loan: 50% of value, capped at {fmtETB(MICROFINANCE_CAP)}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price (Birr) <span className="text-red-500">*</span></label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="1500000" className={iCls} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Down Payment / Equity</label>
                {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.depositPct.toFixed(0)}%</span>}
              </div>
              <input type="number" value={downPayment} onChange={e => setDownPayment(e.target.value)} placeholder="300000" className={iCls} />
            </div>

            {channel === 'bank' && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Loan Currency</label>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  {RATE_BANDS.map(b => (
                    <button key={b.key} onClick={() => pickRate(b.key)}
                      className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${rateBand === b.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      <span className="font-bold">{b.label}</span>
                      <span className={rateBand === b.key ? 'text-white/80' : 'text-muted-foreground/70'}>{b.rate}%</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-1">FX-denominated needs equity and repayments in foreign currency</p>
              </div>
            )}

            <div className="relative">
              <input type="number" value={rate} onChange={e => { setRate(e.target.value); setRateBand(null); }} step="0.1" min="0" max="30" className={`${iCls} pl-4 pr-14`} />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">% p.a.</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Term</label>
                <div className="grid grid-cols-3 gap-1">
                  {[12, 24, 36, 48, 60, 84].map(t => (
                    <button key={t} onClick={() => setTermMonths(String(t))}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${termMonths === String(t) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                      {t}mo
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Monthly Income <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="35000" className={iCls} />
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
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Instalment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtETB(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{termMonths} months \u00b7 {rate}% p.a.</p>
                </div>

                {channel === 'micro' && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                    <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-800 dark:text-blue-200/80">Microfinance loan capped at {fmtETB(microLoanCap)} (50% of value or {fmtETB(MICROFINANCE_CAP)}, whichever is lower). You&apos;ll also need to have saved 5% of the loan amount beforehand.</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtETB(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtETB(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtETB(calc.totalPaid)}</p>
                  </div>
                </div>

                {calc.incomeRatio > 0.5 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">This instalment is <strong>{(calc.incomeRatio * 100).toFixed(0)}%</strong> of the monthly income entered \u2014 far above what most lenders would consider serviceable.</p>
                  </div>
                )}

                {calc.inc > 0 && (
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Instalment / Income</p>
                      <p className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.incomeRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${calc.incomeRatio <= 0.3 ? 'bg-emerald-500' : calc.incomeRatio <= 0.5 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${Math.min(calc.incomeRatio * 150, 100)}%` }} />
                    </div>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Lenders in Ethiopia</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Finance \u2014 Ethiopia</p>
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
