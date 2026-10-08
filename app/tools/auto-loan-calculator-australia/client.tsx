'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calculator, ChevronDown, RotateCcw, ChevronRight, ExternalLink, AlertTriangle, Info
} from 'lucide-react';

type FinanceType = 'loan' | 'novated';

// RBA prime-borrower average was 7.48% p.a. in July 2026 — illustrative bands
// below it, not a published national tiered table.
const LOAN_TIERS = [
  { key: 'excellent', label: 'Excellent credit', rate: 5.5 },
  { key: 'good',       label: 'Prime / average', rate: 7.48 },
  { key: 'fair',       label: 'Weaker credit',    rate: 10.5 },
] as const;
const NOVATED_RATE = 9.5; // typical effective rate, 2026

// ATO luxury car tax, FY2026-27.
const LCT_THRESHOLD = { fuelEfficient: 91661, other: 80809 };
const LCT_RATE = 0.33;
function lctOwed(price: number, fuelEfficient: boolean) {
  const threshold = fuelEfficient ? LCT_THRESHOLD.fuelEfficient : LCT_THRESHOLD.other;
  if (price <= threshold) return 0;
  return (price - threshold) * (10 / 11) * LCT_RATE;
}

const LENDERS = [
  { name: 'Commonwealth Bank / Westpac / NAB / ANZ', note: 'The big four — compare their secured car loan rates directly.', url: 'https://www.commbank.com.au/' },
  { name: 'Macquarie', note: 'Competitive secured car loan rates, online application.', url: 'https://www.macquarie.com.au/' },
  { name: 'Harmoney', note: 'Secured car loan, new and used, min. loan amount applies.', url: 'https://www.harmoney.com.au/' },
  { name: 'Money3', note: 'Specialist car finance, including for less-than-perfect credit.', url: 'https://www.money3.com.au/' },
  { name: 'Toyota Finance / manufacturer captive finance', note: 'Sometimes subsidised rates on specific new models.', url: 'https://www.toyota.com.au/finance' },
];

function fmtAUD(n: number) { return n.toLocaleString('en-AU', { style: 'currency', currency: 'AUD', maximumFractionDigits: 0 }); }

export default function AutoLoanAustraliaClient() {
  const [financeType, setFinanceType] = useState<FinanceType>('loan');
  const [vehiclePrice, setVehiclePrice] = useState('45000');
  const [deposit, setDeposit] = useState('9000');
  const [balloonPct, setBalloonPct] = useState('0');
  const [tier, setTier] = useState<typeof LOAN_TIERS[number]['key'] | null>('good');
  const [rate, setRate] = useState('7.48');
  const [termMonths, setTermMonths] = useState('60');
  const [income, setIncome] = useState('');
  const [fuelEfficient, setFuelEfficient] = useState(false);
  const [showLenders, setShowLenders] = useState(false);

  const pickTier = (key: typeof LOAN_TIERS[number]['key']) => {
    setTier(key);
    setRate(String(LOAN_TIERS.find(t => t.key === key)!.rate));
  };

  const calc = useMemo(() => {
    const price = parseFloat(vehiclePrice) || 0;
    const dep = parseFloat(deposit) || 0;
    const annual = financeType === 'novated' ? NOVATED_RATE : (parseFloat(rate) || 0);
    const months = parseInt(termMonths) || 0;
    const inc = parseFloat(income) || 0;
    if (price <= 0 || months <= 0) return null;

    const basePrice = financeType === 'novated' ? price / 1.1 : price; // GST-exclusive for novated leases
    const principal = Math.max(basePrice - dep, 0);
    const balloon = financeType === 'loan' ? (basePrice * (parseFloat(balloonPct) || 0)) / 100 : 0;
    const mr = annual / 100 / 12;
    const pow = Math.pow(1 + mr, months);
    const monthly = mr === 0 ? Math.max(principal - balloon, 0) / months : (principal * mr * pow - balloon * mr) / (pow - 1);
    const totalPaid = monthly * months + balloon + dep;
    const totalInterest = monthly * months + balloon - principal;
    const lct = lctOwed(price, fuelEfficient);

    return {
      monthly, totalPaid, totalInterest, principal, balloon, lct,
      depositPct: price > 0 ? (dep / price) * 100 : 0,
      incomeRatio: inc > 0 ? (monthly * 12) / inc : 0,
      inc,
    };
  }, [vehiclePrice, deposit, balloonPct, financeType, rate, termMonths, income, fuelEfficient]);

  const reset = () => {
    setFinanceType('loan'); setVehiclePrice('45000'); setDeposit('9000'); setBalloonPct('0');
    setTier('good'); setRate('7.48'); setTermMonths('60'); setIncome(''); setFuelEfficient(false);
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
                {([{ k: 'loan' as const, l: 'Car Loan' }, { k: 'novated' as const, l: 'Novated Lease' }]).map(({ k, l }) => (
                  <button key={k} onClick={() => setFinanceType(k)}
                    className={`h-10 rounded-lg text-xs font-bold border transition-all ${financeType === k ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{financeType === 'novated' ? 'Paid from pre-tax salary; interest on GST-exclusive price' : 'Standard secured car loan'}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Price (incl. GST) <span className="text-red-500">*</span></label>
              <input type="number" value={vehiclePrice} onChange={e => setVehiclePrice(e.target.value)} placeholder="45000" className={iCls} />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={fuelEfficient} onChange={e => setFuelEfficient(e.target.checked)} className="accent-emerald-500" />
                <span className="text-xs text-muted-foreground">Fuel-efficient vehicle (higher LCT threshold)</span>
              </label>
            </div>

            {financeType === 'loan' && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">Deposit</label>
                    {calc && <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{calc.depositPct.toFixed(0)}%</span>}
                  </div>
                  <input type="number" value={deposit} onChange={e => setDeposit(e.target.value)} placeholder="9000" className={iCls} />
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Balloon Payment</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 20, 30, 40].map(b => (
                      <button key={b} onClick={() => setBalloonPct(String(b))}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all ${balloonPct === String(b) ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                        {b}%
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Lowers the repayment, but you still owe it at the end</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">Comparison Rate</label>
                    <span className="text-xs text-muted-foreground">RBA avg: 7.48%</span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {LOAN_TIERS.map(t => (
                      <button key={t.key} onClick={() => pickTier(t.key)}
                        className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-xs border transition-all ${tier === t.key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                        <span className="font-bold">{t.label}</span>
                        <span className={tier === t.key ? 'text-white/80' : 'text-muted-foreground/70'}>{t.rate}%</span>
                      </button>
                    ))}
                  </div>
                  <div className="relative mt-2">
                    <input type="number" value={rate} onChange={e => { setRate(e.target.value); setTier(null); }} step="0.01" min="0" max="25" className={`${iCls} pl-4 pr-10`} />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                  </div>
                </div>
              </>
            )}

            {financeType === 'novated' && (
              <div className="p-3 rounded-xl bg-card border border-border">
                <p className="text-xs text-muted-foreground">Illustrative effective rate: <strong className="text-foreground">{NOVATED_RATE}% p.a.</strong> (typical 2026 range: 8–12%). The after-tax cost is usually lower than this headline rate once salary packaging is applied — see the guide below.</p>
              </div>
            )}

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
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Gross Annual Income <span className="text-muted-foreground font-normal">(optional)</span></label>
                <input type="number" value={income} onChange={e => setIncome(e.target.value)} placeholder="95000" className={iCls} />
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
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Monthly Repayment</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmtAUD(calc.monthly)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">{termMonths} months \u00b7 {financeType === 'novated' ? NOVATED_RATE : rate}% {financeType === 'novated' ? '(before tax savings)' : 'comparison rate'}</p>
                </div>

                {calc.lct > 0 && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-200/80">Luxury Car Tax applies: <strong>{fmtAUD(calc.lct)}</strong> (33% of the amount over the {fuelEfficient ? fmtAUD(LCT_THRESHOLD.fuelEfficient) : fmtAUD(LCT_THRESHOLD.other)} threshold, FY2026-27).</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Amount Financed</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAUD(calc.principal)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Interest</p>
                    <p className="text-sm font-black text-red-600 dark:text-red-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAUD(calc.totalInterest)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Paid</p>
                    <p className="text-sm font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmtAUD(calc.totalPaid)}</p>
                  </div>
                </div>

                {calc.balloon > 0 && (
                  <p className="text-xs text-muted-foreground px-1">Includes a <strong className="text-foreground">{fmtAUD(calc.balloon)}</strong> balloon due at the end of the term \u2014 you still owe this, it&apos;s just not in the monthly repayment above.</p>
                )}

                <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25">
                  <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 dark:text-blue-200/80">Always compare the <strong>comparison rate</strong>, not just the advertised rate \u2014 it includes most fees and is the true cost, required by law.</p>
                </div>

                {calc.inc > 0 && (
                  <div className="p-4 rounded-2xl border border-border bg-card">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">Annual Repayments / Gross Income</p>
                      <p className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {(calc.incomeRatio * 100).toFixed(1)}%
                      </p>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500 transition-all duration-500" style={{ width: `${Math.min(calc.incomeRatio * 400, 100)}%` }} />
                    </div>
                  </div>
                )}

                <button onClick={() => setShowLenders(v => !v)}
                  className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                  <span>Australian car finance lenders</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${showLenders ? 'rotate-180' : ''}`} />
                </button>
                {showLenders && (
                  <div className="rounded-xl border border-border overflow-hidden">
                    <div className="px-3 py-2 bg-muted/50 border-b border-border">
                      <p className="text-xs font-bold text-foreground uppercase tracking-wide">Car Finance \u2014 Australia</p>
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
