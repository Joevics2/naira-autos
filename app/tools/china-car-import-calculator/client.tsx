'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Calculator, AlertTriangle, RefreshCw, Info, RotateCcw, ChevronRight, Ship, Video, Globe2,
} from 'lucide-react';
import {
  NG_RATES, GREEN_TAX_BRACKETS, getGreenTaxRate, FALLBACK_USD_NGN_RATE, GreenTaxBracketId,
} from '@/lib/nigeria-vehicle-import-rates';

interface BreakdownLine {
  label: string;
  formula: string;
  amount: number;
  highlight?: boolean;
}

interface ModelPreset {
  label: string;
  fobUSD: number;
  freightUSD: number;
  engineBracket: GreenTaxBracketId;
  isEV?: boolean;
}

const MODEL_PRESETS: ModelPreset[] = [
  { label: 'Chery Tiggo 7 Pro', fobUSD: 16000, freightUSD: 1500, engineBracket: 'under-2000' },
  { label: 'Geely Coolray', fobUSD: 15000, freightUSD: 1500, engineBracket: 'under-2000' },
  { label: 'GAC GS3', fobUSD: 13500, freightUSD: 1500, engineBracket: 'under-2000' },
  { label: 'Jetour Dashing', fobUSD: 14500, freightUSD: 1500, engineBracket: 'under-2000' },
  { label: 'BYD Atto 3 (EV)', fobUSD: 19000, freightUSD: 1700, engineBracket: 'under-2000', isEV: true },
];

// Roadmap of countries for this tool. Only entries with `live: true` are
// rendered as selectable buttons — no "Coming soon" placeholders shown.
const COUNTRIES: { code: string; name: string; flag: string; live: boolean }[] = [
  { code: 'ng', name: 'Nigeria', flag: '🇳🇬', live: true },
  { code: 'gh', name: 'Ghana', flag: '🇬🇭', live: false },
  { code: 'ke', name: 'Kenya', flag: '🇰🇪', live: false },
  { code: 'za', name: 'South Africa', flag: '🇿🇦', live: false },
];
const LIVE_COUNTRIES = COUNTRIES.filter((c) => c.live);

function fmt(n: number) { return '₦' + Math.round(n).toLocaleString('en-NG'); }
function pct(r: number) { return (r * 100).toFixed(1) + '%'; }

export default function ChinaCarImportCalculatorClient() {
  const [vehicleType, setVehicleType] = useState<'used' | 'new'>('used');
  const [isEV, setIsEV] = useState(false);
  const [engineBracket, setEngineBracket] = useState<GreenTaxBracketId>('under-2000');
  const [fobUSD, setFobUSD] = useState('');
  const [freightUSD, setFreightUSD] = useState('');
  const [insurancePct, setInsurancePct] = useState('1');
  const [exchangeRate, setExchangeRate] = useState(String(FALLBACK_USD_NGN_RATE));
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLastFetched, setRateLastFetched] = useState<string | null>(null);
  const [result, setResult] = useState<{
    cifNGN: number; fobNGN: number; importDuty: number; nacLevy: number;
    greenTax: number; fobLevyAmt: number; vatAmt: number; totalDuties: number;
    grandTotal: number; effectivePct: number; lines: BreakdownLine[];
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

  const applyPreset = (preset: ModelPreset) => {
    setFobUSD(String(preset.fobUSD));
    setFreightUSD(String(preset.freightUSD));
    setEngineBracket(preset.engineBracket);
    setIsEV(!!preset.isEV);
  };

  const calculate = useCallback(() => {
    const fob = parseFloat(fobUSD) || 0;
    if (fob <= 0) return;
    const freight = parseFloat(freightUSD) || 0;
    const insRate = (parseFloat(insurancePct) || 1) / 100;
    const er = parseFloat(exchangeRate) || FALLBACK_USD_NGN_RATE;
    const nacRate = vehicleType === 'new' ? NG_RATES.nacLevyNew : NG_RATES.nacLevyUsed;
    const greenTaxRate = getGreenTaxRate(engineBracket);
    const cifUSD = fob + freight + (fob + freight) * insRate;
    const cifNGN = cifUSD * er;
    const fobNGN = fob * er;

    // EVs and mass transit buses are fully exempt from import duty, NAC levy,
    // and the Green Tax under Nigeria's 2026 Fiscal Policy Measures.
    const importDuty = isEV ? 0 : NG_RATES.importDuty * cifNGN;
    const nacLevy = isEV ? 0 : nacRate * cifNGN;
    const greenTax = isEV ? 0 : greenTaxRate * cifNGN;
    const fobLevyAmt = NG_RATES.fobLevy * fobNGN;
    const vatBase = cifNGN + importDuty + nacLevy + greenTax;
    const vatAmt = NG_RATES.vat * vatBase;
    const totalDuties = importDuty + nacLevy + greenTax + fobLevyAmt + vatAmt;
    const grandTotal = cifNGN + totalDuties;
    const effectivePct = cifNGN > 0 ? (totalDuties / cifNGN) * 100 : 0;

    const lines: BreakdownLine[] = [
      { label: 'CIF Value (NGN)', formula: `$${fob.toLocaleString()} + freight + ins × ₦${er.toLocaleString()}/USD`, amount: cifNGN },
    ];
    if (isEV) {
      lines.push({ label: 'Import Duty — EV exempt', formula: '0% (EV exemption)', amount: 0 });
      lines.push({ label: 'NAC Levy — EV exempt', formula: '0% (EV exemption)', amount: 0 });
      lines.push({ label: 'Green Tax — EV exempt', formula: '0% (EV exemption)', amount: 0 });
    } else {
      lines.push({ label: `Import Duty — ${pct(NG_RATES.importDuty)} of CIF`, formula: `${pct(NG_RATES.importDuty)} × ${fmt(cifNGN)}`, amount: importDuty });
      lines.push({ label: `NAC Levy — ${pct(nacRate)} of CIF`, formula: `${pct(nacRate)} × ${fmt(cifNGN)}`, amount: nacLevy });
      if (greenTaxRate > 0) lines.push({ label: `Green Tax Surcharge — ${pct(greenTaxRate)} of CIF`, formula: `${pct(greenTaxRate)} × ${fmt(cifNGN)}`, amount: greenTax });
    }
    lines.push({ label: `FOB Levy — ${pct(NG_RATES.fobLevy)} of FOB`, formula: `${pct(NG_RATES.fobLevy)} × ${fmt(fobNGN)}`, amount: fobLevyAmt });
    lines.push({ label: `VAT — ${pct(NG_RATES.vat)} of (CIF + Duty + NAC + Green Tax)`, formula: `${pct(NG_RATES.vat)} × ${fmt(vatBase)}`, amount: vatAmt });
    lines.push({ label: 'Total Statutory Duties & Taxes', formula: 'Sum of all levies', amount: totalDuties, highlight: true });
    lines.push({ label: 'Estimated Total Landed Cost', formula: 'CIF + Duties + Fees', amount: grandTotal, highlight: true });

    setResult({ cifNGN, fobNGN, importDuty, nacLevy, greenTax, fobLevyAmt, vatAmt, totalDuties, grandTotal, effectivePct, lines });
  }, [fobUSD, freightUSD, insurancePct, exchangeRate, vehicleType, engineBracket, isEV]);

  const reset = () => {
    setFobUSD(''); setFreightUSD(''); setInsurancePct('1');
    setExchangeRate(String(FALLBACK_USD_NGN_RATE)); setIsEV(false);
    setEngineBracket('under-2000'); setResult(null);
  };

  const canCalculate = parseFloat(fobUSD) > 0 && parseFloat(exchangeRate) > 0;
  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Destination country — a static label while only Nigeria has a
            live ruleset; becomes a real selector once more countries ship. */}
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-2">
            <Globe2 className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
            Destination Country
          </label>
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold border border-emerald-500 bg-emerald-500 text-white w-fit">
            <span>{LIVE_COUNTRIES[0].flag}</span> {LIVE_COUNTRIES[0].name}
          </div>
        </div>

        {/* Model presets */}
        <div>
          <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-2">Popular Chinese Models — Quick Fill</label>
          <div className="flex flex-wrap gap-2">
            {MODEL_PRESETS.map(p => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className="px-3 py-2 rounded-lg text-xs font-semibold border border-border bg-card hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Example FOB prices — adjust to your actual quote below.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

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
                  <input type="number" value={fobUSD} onChange={e => setFobUSD(e.target.value)} placeholder="e.g. 15000" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Exporter's quoted price</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Freight (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={freightUSD} onChange={e => setFreightUSD(e.target.value)} placeholder="e.g. 1500" className={`${iCls} pl-7 pr-3`} />
                </div>
                <p className="text-xs text-muted-foreground mt-1">$1,200–$2,500 typical, RoRo cheaper</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Insurance (%)</label>
                <div className="relative">
                  <input type="number" value={insurancePct} onChange={e => setInsurancePct(e.target.value)} step="0.25" className={`${iCls} pl-3 pr-7`} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Default 1% of FOB+freight</p>
              </div>
            </div>

            {/* EV toggle */}
            <label className="flex items-center gap-2.5 p-3 rounded-xl border border-border bg-card cursor-pointer group">
              <div onClick={(e) => { e.preventDefault(); setIsEV(v => !v); }}
                className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${isEV ? 'bg-emerald-500 border-emerald-500' : 'border-border group-hover:border-emerald-500/50'}`}>
                {isEV && <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span className="text-xs text-foreground"><strong>Electric vehicle</strong> — fully exempt from Import Duty, NAC Levy & Green Tax (July 2026 policy)</span>
            </label>

            {/* Engine size — hidden/irrelevant for EVs */}
            {!isEV && (
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
                <p className="text-xs text-muted-foreground mt-1">Most Chinese crossovers (Tiggo, Coolray, GS3) run 1.5T engines — under 2,000cc</p>
              </div>
            )}

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
                <p className="text-xs text-muted-foreground max-w-xs mb-6">Pick a model preset or enter your own FOB quote.</p>
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
                  <p className="text-xs text-emerald-700 dark:text-emerald-400/60 mt-1">CIF + all duties + fees{isEV && ' — EV exemption applied'}</p>
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

                {/* Sourcing tips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
                    <Ship className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 dark:text-blue-300/80">Nigeria requires left-hand drive (LHD) vehicles only — confirm this before you pay a deposit.</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20">
                    <Video className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 dark:text-blue-300/80">Ask for a live video inspection before shipping — don't rely on photos alone.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-xl bg-muted/40 border border-border">
                  <Info className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">Rates: {NG_RATES.version} · ₦{Number(exchangeRate).toLocaleString()}/$1</p>
                </div>
                <div className="flex items-start gap-2 p-3 rounded-xl border border-red-200 dark:border-red-500/20 bg-red-50 dark:bg-red-500/5">
                  <AlertTriangle className="h-3.5 w-3.5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700 dark:text-red-300/80">Not an official NCS calculation. NCS assessed value often exceeds invoice by 20–50%, and freight/insurance costs vary by shipping method and route. Verify at <a href="https://customs.gov.ng" target="_blank" rel="noopener noreferrer" className="underline">customs.gov.ng</a> and get an independent quote before paying a deposit to any exporter.</p>
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
