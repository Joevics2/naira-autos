'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Calculator, AlertTriangle, RefreshCw, Info,
  ChevronDown, ChevronUp, RotateCcw, ChevronRight
} from 'lucide-react';
import { NG_RATES, GREEN_TAX_BRACKETS, getGreenTaxRate, FALLBACK_USD_NGN_RATE, GreenTaxBracketId } from '@/lib/nigeria-vehicle-import-rates';

interface BreakdownLine {
  label: string;
  formula: string;
  amount: number;
  highlight?: boolean;
}

const RATES = NG_RATES;
const FALLBACK_RATE = FALLBACK_USD_NGN_RATE;

function fmt(n: number) { return '₦' + Math.round(n).toLocaleString('en-NG'); }
function pct(r: number) { return (r * 100).toFixed(1) + '%'; }

export default function ImportDutyClient() {
  const [vehicleType, setVehicleType] = useState<'used' | 'new'>('used');
  const [engineBracket, setEngineBracket] = useState<GreenTaxBracketId>('under-2000');
  const [fobUSD, setFobUSD] = useState('');
  const [freightUSD, setFreightUSD] = useState('');
  const [insurancePct, setInsurancePct] = useState('0.75');
  const [exchangeRate, setExchangeRate] = useState(String(FALLBACK_RATE));
  const [ncsOverride, setNcsOverride] = useState('');
  const [agentFees, setAgentFees] = useState('');
  const [terminalFees, setTerminalFees] = useState('');
  const [shippingExtra, setShippingExtra] = useState('');
  const [includePortSurcharge, setIncludePortSurcharge] = useState(false);
  const [includeETLS, setIncludeETLS] = useState(false);
  const [sensitivityPct, setSensitivityPct] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSensitivity, setShowSensitivity] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLastFetched, setRateLastFetched] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cifNGN: number; fobNGN: number; importDuty: number; nacLevy: number;
    fobLevyAmt: number; portSurcharge: number; etls: number; greenTax: number;
    vatBase: number; vatAmt: number; totalDuties: number;
    extraFees: number; grandTotal: number; effectivePct: number;
    lines: BreakdownLine[];
  } | null>(null);

  const fetchLiveRate = useCallback(async () => {
    setRateLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.NGN) {
        setExchangeRate(Math.round(data.rates.NGN).toString());
        setRateLastFetched(new Date().toLocaleTimeString());
      }
    } catch { /* silent */ } finally { setRateLoading(false); }
  }, []);

  const calculate = useCallback(() => {
    const fob = parseFloat(fobUSD) || 0;
    if (fob <= 0) return;
    const freight = parseFloat(freightUSD) || 0;
    const insRate = (parseFloat(insurancePct) || 0.75) / 100;
    const er = parseFloat(exchangeRate) || FALLBACK_RATE;
    const nacRate = vehicleType === 'new' ? RATES.nacLevyNew : RATES.nacLevyUsed;
    const cifUSD = fob + freight + (fob + freight) * insRate;
    const baseCIF_USD = ncsOverride ? parseFloat(ncsOverride) || cifUSD : cifUSD * (1 + sensitivityPct / 100);
    const cifNGN = baseCIF_USD * er;
    const fobNGN = fob * er;
    const importDuty = RATES.importDuty * cifNGN;
    const nacLevy = nacRate * cifNGN;
    const greenTaxRate = getGreenTaxRate(engineBracket);
    const greenTax = greenTaxRate * cifNGN;
    const fobLevyAmt = RATES.fobLevy * fobNGN;
    const portSurcharge = includePortSurcharge ? RATES.surcharge * importDuty : 0;
    const etls = includeETLS ? RATES.etls * cifNGN : 0;
    const vatBase = cifNGN + importDuty + nacLevy + greenTax;
    const vatAmt = RATES.vat * vatBase;
    const totalDuties = importDuty + nacLevy + greenTax + fobLevyAmt + portSurcharge + etls + vatAmt;
    const extra = (parseFloat(agentFees) || 0) + (parseFloat(terminalFees) || 0) + (parseFloat(shippingExtra) || 0);
    const grandTotal = cifNGN + totalDuties + extra;
    const effectivePct = cifNGN > 0 ? (totalDuties / cifNGN) * 100 : 0;
    const lines: BreakdownLine[] = [
      { label: 'CIF Value (NGN)', formula: `$${fob.toLocaleString()} + freight + ins × ₦${er.toLocaleString()}/USD`, amount: cifNGN },
      { label: `Import Duty — ${pct(RATES.importDuty)} of CIF`, formula: `${pct(RATES.importDuty)} × ${fmt(cifNGN)}`, amount: importDuty },
      { label: `NAC Levy — ${pct(nacRate)} of CIF`, formula: `${pct(nacRate)} × ${fmt(cifNGN)}`, amount: nacLevy },
      { label: `FOB Levy — ${pct(RATES.fobLevy)} of FOB`, formula: `${pct(RATES.fobLevy)} × ${fmt(fobNGN)}`, amount: fobLevyAmt },
    ];
    if (greenTaxRate > 0) lines.push({ label: `Green Tax Surcharge — ${pct(greenTaxRate)} of CIF`, formula: `${pct(greenTaxRate)} × ${fmt(cifNGN)}`, amount: greenTax });
    if (includePortSurcharge) lines.push({ label: `Surcharge — ${pct(RATES.surcharge)} of Import Duty`, formula: `${pct(RATES.surcharge)} × ${fmt(importDuty)}`, amount: portSurcharge });
    if (includeETLS) lines.push({ label: `ETLS — ${pct(RATES.etls)} of CIF`, formula: `${pct(RATES.etls)} × ${fmt(cifNGN)}`, amount: etls });
    lines.push({ label: `VAT — ${pct(RATES.vat)} of (CIF + Duty + NAC + Green Tax)`, formula: `${pct(RATES.vat)} × ${fmt(vatBase)}`, amount: vatAmt });
    lines.push({ label: 'Total Statutory Duties & Taxes', formula: 'Sum of all levies', amount: totalDuties, highlight: true });
    if (extra > 0) lines.push({ label: 'Agent / Terminal / Misc', formula: 'User estimates', amount: extra });
    lines.push({ label: 'Estimated Total Landed Cost', formula: 'CIF + Duties + Fees', amount: grandTotal, highlight: true });
    setResult({ cifNGN, fobNGN, importDuty, nacLevy, fobLevyAmt, portSurcharge, etls, greenTax, vatBase, vatAmt, totalDuties, extraFees: extra, grandTotal, effectivePct, lines });
  }, [fobUSD, freightUSD, insurancePct, exchangeRate, ncsOverride, vehicleType, engineBracket, includePortSurcharge, includeETLS, agentFees, terminalFees, shippingExtra, sensitivityPct]);

  const reset = () => {
    setFobUSD(''); setFreightUSD(''); setInsurancePct('0.75');
    setExchangeRate(String(FALLBACK_RATE)); setNcsOverride('');
    setAgentFees(''); setTerminalFees(''); setShippingExtra('');
    setIncludePortSurcharge(false); setIncludeETLS(false);
    setEngineBracket('under-2000');
    setSensitivityPct(0); setResult(null);
  };

  const canCalculate = parseFloat(fobUSD) > 0 && parseFloat(exchangeRate) > 0;
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Vehicle type + FOB side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Type</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {(['used', 'new'] as const).map(t => (
                    <button key={t} onClick={() => setVehicleType(t)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        vehicleType === t ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                      }`}>
                      {t === 'used' ? 'Tokunbo / Used' : 'Brand New'}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">FOB Value (USD) <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={fobUSD} onChange={e => setFobUSD(e.target.value)} placeholder="e.g. 8500" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Purchase price excl. freight</p>
              </div>
            </div>

            {/* Freight + Insurance side by side */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Freight (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={freightUSD} onChange={e => setFreightUSD(e.target.value)} placeholder="e.g. 1200" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">$800–$2,500 typical</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Insurance (%)</label>
                <div className="relative">
                  <input type="number" value={insurancePct} onChange={e => setInsurancePct(e.target.value)} step="0.25" className={`${iCls} pl-3 pr-7`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Default 0.75%</p>
              </div>
            </div>

            {/* Engine size — determines Green Tax Surcharge */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Engine Size (Green Tax)</label>
              <div className="grid grid-cols-3 gap-1.5">
                {GREEN_TAX_BRACKETS.map(b => (
                  <button key={b.id} onClick={() => setEngineBracket(b.id)}
                    className={`py-2 px-1 rounded-lg text-[11px] font-bold border transition-all ${
                      engineBracket === b.id ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                    }`}>
                    {b.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Green Tax Surcharge — effective 1 Jul 2026, 0%–4% of CIF by engine cc</p>
            </div>

            {/* Exchange rate */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Exchange Rate (₦/$) <span className="text-red-500">*</span></label>
                <button onClick={fetchLiveRate} disabled={rateLoading}
                  className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors disabled:opacity-50">
                  <RefreshCw className={`h-3 w-3 ${rateLoading ? 'animate-spin' : ''}`} />
                  {rateLoading ? 'Fetching...' : 'Live rate'}
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">₦</span>
                <input type="number" value={exchangeRate} onChange={e => setExchangeRate(e.target.value)} placeholder="e.g. 1580" className={`${iCls} pl-7 pr-3`} />
              </div>
              {rateLastFetched && <p className="text-xs text-emerald-600 dark:text-emerald-400/70 mt-1">Fetched at {rateLastFetched}</p>}
            </div>

            {/* Advanced + Sensitivity toggles */}
            <div className="space-y-2">
              <button onClick={() => setShowAdvanced(v => !v)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-card hover:border-emerald-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                <span>Advanced options</span>
                {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showAdvanced && (
                <div className="space-y-3 p-3 rounded-xl border border-border bg-muted/20">
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1">NCS Assessed CIF Override (USD)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                      <input type="number" value={ncsOverride} onChange={e => setNcsOverride(e.target.value)}
                        placeholder="Leave blank to use calculated CIF"
                        className="w-full h-10 pl-7 pr-3 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-amber-500 transition-all" />
                    </div>
                    <p className="text-xs text-amber-600 dark:text-amber-400/80 mt-1">NCS often values 20–50% above invoice</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">Optional Levies</p>
                    {[
                      { id: 'port', label: 'Port Surcharge (7% of Duty)', state: includePortSurcharge, setState: setIncludePortSurcharge },
                      { id: 'etls', label: 'ETLS (0.5% of CIF)', state: includeETLS, setState: setIncludeETLS },
                    ].map(({ id, label, state, setState }) => (
                      <label key={id} className="flex items-center gap-2 cursor-pointer group">
                        <div onClick={() => setState((v: boolean) => !v)}
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${state ? 'bg-emerald-500 border-emerald-500' : 'border-border group-hover:border-emerald-500/50'}`}>
                          {state && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        </div>
                        <span className="text-xs text-muted-foreground">{label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Agent Fee', value: agentFees, setter: setAgentFees, placeholder: '150000' },
                      { label: 'Terminal', value: terminalFees, setter: setTerminalFees, placeholder: '80000' },
                      { label: 'Other', value: shippingExtra, setter: setShippingExtra, placeholder: '50000' },
                    ].map(({ label, value, setter, placeholder }) => (
                      <div key={label}>
                        <label className="block text-xs text-muted-foreground mb-1">{label} (₦)</label>
                        <input type="number" value={value} onChange={e => setter(e.target.value)} placeholder={placeholder}
                          className="w-full h-9 px-2 text-xs border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => setShowSensitivity(v => !v)}
                className="w-full flex items-center justify-between py-2 px-3 rounded-lg border border-border bg-card hover:border-amber-500/30 text-xs font-medium text-muted-foreground hover:text-foreground transition-all">
                <span>NCS valuation sensitivity</span>
                {showSensitivity ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>

              {showSensitivity && (
                <div className="p-3 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 space-y-2">
                  <p className="text-xs text-amber-800 dark:text-amber-300/80">NCS often values cars 20–50% above invoice.</p>
                  <div className="flex items-center gap-3">
                    <input type="range" min={0} max={60} step={5} value={sensitivityPct}
                      onChange={e => setSensitivityPct(Number(e.target.value))} className="flex-1 accent-amber-500" />
                    <span className="text-sm font-bold text-amber-600 dark:text-amber-400 w-10 text-right">+{sensitivityPct}%</span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button onClick={calculate} disabled={!canCalculate}
                className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl text-sm font-bold transition-all ${
                  canCalculate ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20' : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}>
                <Calculator className="h-4 w-4" />
                Calculate
              </button>
              <button onClick={reset}
                className="flex items-center justify-center gap-1.5 h-11 px-4 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3">
            {!result ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                  <Calculator className="h-6 w-6 text-emerald-500/50" />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Enter values to calculate</p>
                <p className="text-xs text-muted-foreground max-w-xs mb-6">FOB value and exchange rate required.</p>
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs text-left">
                  {[
                    { label: 'Import Duty', value: '20% of CIF', color: 'text-orange-600 dark:text-orange-400' },
                    { label: 'NAC Levy', value: '5–10% of CIF', color: 'text-amber-600 dark:text-amber-400' },
                    { label: 'Green Tax', value: '0–4% of CIF', color: 'text-lime-600 dark:text-lime-400' },
                    { label: 'VAT', value: '7.5% of base', color: 'text-emerald-600 dark:text-emerald-400' },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="p-3 rounded-xl bg-card border border-border">
                      <p className={`text-sm font-black ${color}`}>{label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">Estimated Total Landed Cost</p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(result.grandTotal)}</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400/60 mt-1">CIF + all duties + fees</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">Total Duties</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(result.totalDuties)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border">
                    <p className="text-xs text-muted-foreground mb-1">CIF (₦)</p>
                    <p className="text-base font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{fmt(result.cifNGN)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                    <p className="text-xs text-amber-700 dark:text-amber-400/80 mb-1">Effective Rate</p>
                    <p className="text-base font-black text-amber-700 dark:text-amber-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{result.effectivePct.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-border overflow-hidden">
                  <div className="px-4 py-2.5 bg-muted/50 border-b border-border">
                    <p className="text-xs font-bold text-foreground uppercase tracking-wide">Full Breakdown</p>
                  </div>
                  <div className="divide-y divide-border">
                    {result.lines.map((line, i) => (
                      <div key={i} className={`px-4 py-2.5 flex items-start justify-between gap-3 ${line.highlight ? 'bg-emerald-500/5' : 'bg-card'}`}>
                        <div className="min-w-0">
                          <p className={`text-xs ${line.highlight ? 'font-bold text-emerald-700 dark:text-emerald-400' : 'font-medium text-foreground'}`}>{line.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{line.formula}</p>
                        </div>
                        <p className={`text-xs font-bold flex-shrink-0 ${line.highlight ? 'text-emerald-700 dark:text-emerald-400' : 'text-foreground'}`}>{fmt(line.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border">
                  <Info className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Rates: {RATES.version} · ₦{Number(exchangeRate).toLocaleString()}/$1 {sensitivityPct > 0 && `· NCS +${sensitivityPct}%`}</p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-300/80">Not an official NCS calculation. NCS assessed value often exceeds invoice by 20–50%. Verify at <a href="https://customs.gov.ng" target="_blank" rel="noopener noreferrer" className="underline">customs.gov.ng</a>.</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/registration-fee-calculator"
                    className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Registration Fee Calculator</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/tools/vin-checker"
                    className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Free VIN Checker</p>
                    <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}