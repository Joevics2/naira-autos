'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  RefreshCw, Info, ChevronDown, ChevronUp, RotateCcw, ExternalLink, Printer,
  ShieldAlert, TrendingDown, Flag, XOctagon,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, Legend } from 'recharts';

type Fuel = 'petrol' | 'diesel' | 'hybrid' | 'ev';
type DutyBand = 25 | 35;
type Exemption = 'none' | 'returning_resident' | 'pwd' | 'diplomat';

const FALLBACK_RATE = 129.5; // KES per USD, July 2026
const CURRENT_YEAR = new Date().getFullYear();
const MAX_IMPORT_AGE = 8;

function fmtKES(n: number) { return 'KSh ' + Math.round(n).toLocaleString('en-KE'); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString('en-US'); }
function pct(r: number) { return (r * 100).toFixed(1) + '%'; }

function getExciseRate(fuel: Fuel, cc: number): number {
  if (fuel === 'ev') return 0.10;
  if (fuel === 'hybrid') return 0.15; // between EV and ICE — treated as a reduced band, verify with KRA
  if (cc <= 1500) return 0.20;
  if (cc <= 3000) return 0.25;
  return 0.30; // large-engine band — not explicit in source, marked verify in copy
}

interface BreakdownLine {
  label: string;
  formula: string;
  amount: number;
  highlight?: boolean;
  warn?: boolean;
}

const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#0ea5e9', '#94a3b8'];

export default function ImportDutyKenyaClient() {
  const [fuel, setFuel] = useState<Fuel>('petrol');
  const [cc, setCc] = useState(1800);
  const [manufactureYear, setManufactureYear] = useState(CURRENT_YEAR - 6);
  const [dutyBand, setDutyBand] = useState<DutyBand>(25);
  const [exemption, setExemption] = useState<Exemption>('none');
  const [useDirectCustomsValue, setUseDirectCustomsValue] = useState(false);
  const [customsValueUSD, setCustomsValueUSD] = useState('9500');
  const [fobUSD, setFobUSD] = useState('7500');
  const [freightUSD, setFreightUSD] = useState('900');
  const [insurancePct, setInsurancePct] = useState('1');
  const [idfPct, setIdfPct] = useState('2.5');
  const [exchangeRate, setExchangeRate] = useState(String(FALLBACK_RATE));
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLastFetched, setRateLastFetched] = useState<string | null>(null);
  const [portAgentFees, setPortAgentFees] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchLiveRate = useCallback(async () => {
    setRateLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.KES) {
        setExchangeRate(data.rates.KES.toFixed(2));
        setRateLastFetched(new Date().toLocaleTimeString());
      }
    } catch { /* silent — keep fallback */ } finally { setRateLoading(false); }
  }, []);

  const age = CURRENT_YEAR - manufactureYear;
  const ineligible = age > MAX_IMPORT_AGE && exemption === 'none';

  const result = useMemo(() => {
    const er = parseFloat(exchangeRate) || FALLBACK_RATE;
    const fob = parseFloat(fobUSD) || 0;
    const freight = parseFloat(freightUSD) || 0;
    const insRate = (parseFloat(insurancePct) || 1) / 100;
    const computedCifUSD = fob + freight + (fob + freight) * insRate;
    const customsValue = (useDirectCustomsValue ? parseFloat(customsValueUSD) || 0 : computedCifUSD) * er;

    if (customsValue <= 0) return null;

    const exempt = exemption !== 'none';
    const dutyRate = exempt ? 0 : dutyBand / 100;
    const duty = dutyRate * customsValue;
    const dutyInclusive = customsValue + duty;

    const exciseRate = exempt ? 0 : getExciseRate(fuel, cc);
    const excise = exciseRate * dutyInclusive;
    const exciseInclusive = dutyInclusive + excise;

    const vatRate = exempt ? 0 : 0.16;
    const vat = vatRate * exciseInclusive;

    const idfRate = exempt ? 0 : (parseFloat(idfPct) || 2.5) / 100;
    const idf = idfRate * customsValue;

    const rdl = 0.02 * customsValue; // RDL applies even for most exemptions per research

    const extraFees = parseFloat(portAgentFees) || 0;

    const totalTaxes = duty + excise + vat + idf + rdl;
    const grandTotal = customsValue + totalTaxes + extraFees;
    const effectivePct = (totalTaxes / customsValue) * 100;

    const lines: BreakdownLine[] = [
      { label: 'Customs Value (CRSP-based estimate)', formula: `${useDirectCustomsValue ? 'Declared customs value' : 'FOB + Freight + Insurance'} × KSh${er.toFixed(2)}/USD`, amount: customsValue },
    ];
    if (exempt) {
      lines.push({ label: 'Import Duty, Excise, VAT, IDF — exempt', formula: `Exemption category: ${exemption.replace('_', ' ')}`, amount: 0 });
    } else {
      lines.push({ label: `Import Duty — ${pct(dutyRate)} of customs value`, formula: `${pct(dutyRate)} × ${fmtKES(customsValue)}`, amount: duty });
      lines.push({ label: `Excise Duty — ${pct(exciseRate)} of (value + duty)`, formula: `${pct(exciseRate)} × ${fmtKES(dutyInclusive)}`, amount: excise });
      lines.push({ label: 'VAT — 16% of (value + duty + excise)', formula: `16% × ${fmtKES(exciseInclusive)}`, amount: vat });
      lines.push({ label: `IDF — ${pct(idfRate)} of customs value`, formula: `${pct(idfRate)} × ${fmtKES(customsValue)}`, amount: idf });
    }
    lines.push({ label: 'RDL — 2% of customs value', formula: `2% × ${fmtKES(customsValue)}`, amount: rdl });
    lines.push({ label: 'Total Statutory Duties & Taxes', formula: 'Sum of all levies', amount: totalTaxes, highlight: true });
    if (extraFees > 0) lines.push({ label: 'Port / Agent / Misc (your estimate)', formula: 'User entered', amount: extraFees });
    lines.push({ label: 'Estimated Total Landed Cost', formula: 'Customs value + Duties + Fees', amount: grandTotal, highlight: true });

    const pieData = exempt
      ? [{ name: 'Customs Value', value: customsValue }, { name: 'RDL', value: rdl }]
      : [
          { name: 'Customs Value', value: customsValue },
          { name: 'Import Duty', value: duty },
          { name: 'Excise Duty', value: excise },
          { name: 'VAT', value: vat },
          { name: 'IDF + RDL', value: idf + rdl },
        ];

    // What-if: same spec, EV instead of ICE (shows the EV excise discount)
    const evExciseRate = 0.10;
    const evExcise = exempt ? 0 : evExciseRate * dutyInclusive;
    const evExciseInclusive = dutyInclusive + evExcise;
    const evVat = exempt ? 0 : 0.16 * evExciseInclusive;
    const evTotalTaxes = duty + evExcise + evVat + idf + rdl;
    const evSavings = totalTaxes - evTotalTaxes;

    return { customsValue, duty, excise, vat, idf, rdl, totalTaxes, grandTotal, effectivePct, lines, pieData, evSavings, exempt };
  }, [fuel, cc, dutyBand, exemption, useDirectCustomsValue, customsValueUSD, fobUSD, freightUSD, insurancePct, idfPct, exchangeRate, portAgentFees]);

  const reset = () => {
    setFuel('petrol'); setCc(1800); setManufactureYear(CURRENT_YEAR - 6);
    setDutyBand(25); setExemption('none');
    setUseDirectCustomsValue(false); setCustomsValueUSD('9500'); setFobUSD('7500'); setFreightUSD('900');
    setInsurancePct('1'); setIdfPct('2.5'); setExchangeRate(String(FALLBACK_RATE)); setPortAgentFees('');
  };

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background print:bg-white" id="kenya-duty-calculator">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* News banner */}
        <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-300 rounded-xl px-4 py-2.5 mb-6 print:hidden">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span><strong>Verify before you rely on this:</strong> official KRA sources disagree on the import duty band — some list 25%, others cite a 35% hike. Use the toggle below to compare both. Duty is calculated on KRA&apos;s CRSP-based customs value, not your invoice price — this tool estimates from CIF as a starting point.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4 print:hidden">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Fuel Type</label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['petrol', 'diesel', 'hybrid', 'ev'] as Fuel[]).map((f) => (
                  <button key={f} onClick={() => setFuel(f)}
                    className={`py-2 rounded-lg text-[11px] font-bold border uppercase transition-all ${
                      fuel === f ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                    }`}>
                    {f === 'ev' ? 'EV' : f}
                  </button>
                ))}
              </div>
            </div>

            {(fuel === 'petrol' || fuel === 'diesel') && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">Engine Size: {cc.toLocaleString()}cc</label>
                </div>
                <input type="range" min={600} max={4500} step={100} value={cc}
                  onChange={(e) => setCc(parseInt(e.target.value))}
                  className="w-full accent-emerald-500" />
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Manufacture Year: {manufactureYear} <span className={age > MAX_IMPORT_AGE ? 'text-red-500' : 'text-emerald-500'}>({age} yrs old)</span>
                </label>
              </div>
              <input type="range" min={CURRENT_YEAR - 20} max={CURRENT_YEAR} step={1} value={manufactureYear}
                onChange={(e) => setManufactureYear(parseInt(e.target.value))}
                className={`w-full ${age > MAX_IMPORT_AGE ? 'accent-red-500' : 'accent-emerald-500'}`} />
              {ineligible && (
                <p className="text-[11px] text-red-500 font-semibold mt-1 flex items-center gap-1">
                  <XOctagon className="h-3 w-3" /> Over 8 years — not eligible for import under the standard rule
                </p>
              )}
              {age > MAX_IMPORT_AGE && exemption !== 'none' && (
                <p className="text-[11px] text-amber-500 font-semibold mt-1 flex items-center gap-1">
                  <Flag className="h-3 w-3" /> Age rule still applies even under exemption categories — verify eligibility with KRA
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Import Duty Rate — sources disagree</label>
              <div className="grid grid-cols-2 gap-1.5">
                {([25, 35] as DutyBand[]).map((d) => (
                  <button key={d} onClick={() => setDutyBand(d)}
                    className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                      dutyBand === d ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                    }`}>
                    {d}% {d === 25 ? '(most KRA pages)' : '(recent hike, verify)'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Exemption Category</label>
              <select value={exemption} onChange={(e) => setExemption(e.target.value as Exemption)} className={iCls}>
                <option value="none">None — standard import</option>
                <option value="returning_resident">Returning resident (≥12 months abroad)</option>
                <option value="pwd">Person with disability (PWD)</option>
                <option value="diplomat">Diplomat / first arrival</option>
              </select>
              {exemption !== 'none' && (
                <p className="text-[11px] text-muted-foreground mt-1">Duty, excise, VAT and IDF waived if fully qualifying — RDL still applies. Pre-approval from KRA required; strict one-vehicle, personal-use, non-resale conditions apply.</p>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button onClick={() => setUseDirectCustomsValue(false)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${!useDirectCustomsValue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                Estimate from CIF
              </button>
              <button onClick={() => setUseDirectCustomsValue(true)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${useDirectCustomsValue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                I have my KRA CRSP value
              </button>
            </div>

            {useDirectCustomsValue ? (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Customs Value (USD)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input type="number" value={customsValueUSD} onChange={(e) => setCustomsValueUSD(e.target.value)} className={`${iCls} pl-7`} />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">FOB Value (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                    <input type="number" value={fobUSD} onChange={(e) => setFobUSD(e.target.value)} className={`${iCls} pl-7`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Freight (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                    <input type="number" value={freightUSD} onChange={(e) => setFreightUSD(e.target.value)} className={`${iCls} pl-7`} />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Exchange Rate (KES per USD)</label>
              <div className="flex gap-2">
                <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} className={iCls} />
                <button onClick={fetchLiveRate} disabled={rateLoading}
                  className="h-11 px-3 rounded-xl border border-border bg-card hover:border-emerald-500/50 flex items-center gap-1.5 text-xs font-bold text-muted-foreground flex-shrink-0">
                  <RefreshCw className={`h-3.5 w-3.5 ${rateLoading ? 'animate-spin' : ''}`} />
                  Live
                </button>
              </div>
              {rateLastFetched && <p className="text-[11px] text-muted-foreground mt-1">Fetched {rateLastFetched}</p>}
            </div>

            <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              {showAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              Advanced: IDF rate &amp; agent fees
            </button>
            {showAdvanced && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">IDF Rate (%, 2.5–3.5 reported)</label>
                  <input type="number" step="0.1" value={idfPct} onChange={(e) => setIdfPct(e.target.value)} className={iCls} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Port / Clearing Agent Fees (KES)</label>
                  <input type="number" value={portAgentFees} onChange={(e) => setPortAgentFees(e.target.value)} placeholder="e.g. 45000" className={iCls} />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <button onClick={reset} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border">
                <RotateCcw className="h-3.5 w-3.5" /> Reset
              </button>
              <a href="https://www.kra.go.ke/individual/importing/learn-about-importation/procedures-for-motor-vehicle" target="_blank" rel="noopener noreferrer nofollow"
                className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-500/20 ml-auto">
                <ExternalLink className="h-3.5 w-3.5" /> Verify on KRA
              </a>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-4">
            {ineligible ? (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 flex items-start gap-3">
                <XOctagon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-base font-black text-red-700 dark:text-red-300 mb-1">Not eligible for standard import</p>
                  <p className="text-sm text-red-700/80 dark:text-red-300/80 leading-relaxed">
                    Kenya restricts used passenger vehicle imports to those under {MAX_IMPORT_AGE} years old, measured from year of manufacture. This vehicle is {age} years old. Some over-age vehicles still circulate in practice via irregular registration — see the reality note below — but this is not a compliant import path and carries seizure risk.
                  </p>
                </div>
              </div>
            ) : result ? (
              <>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated Total Landed Cost</p>
                      <p className="text-3xl font-black text-foreground transition-all" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                        {fmtKES(result.grandTotal)}
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtUSD(result.grandTotal / (parseFloat(exchangeRate) || FALLBACK_RATE))} equivalent</p>
                    </div>
                    <button onClick={() => window.print()} className="print:hidden flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border flex-shrink-0">
                      <Printer className="h-3.5 w-3.5" /> Save / Print
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Total Duties &amp; Taxes</p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{fmtKES(result.totalTaxes)}</p>
                    </div>
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Effective Rate</p>
                      <p className="text-lg font-black text-orange-600 dark:text-orange-400">{result.effectivePct.toFixed(1)}%</p>
                    </div>
                  </div>

                  {!result.exempt && fuel !== 'ev' && result.evSavings > 1000 && (
                    <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3 mb-4">
                      <TrendingDown className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        <strong>What-if — EV:</strong> the same spec as a fully electric vehicle would use a 10% excise band instead of {pct(getExciseRate(fuel, cc))}, saving roughly {fmtKES(result.evSavings)} in tax.
                      </p>
                    </div>
                  )}

                  <div className="h-56 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={result.pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                          {result.pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <RTooltip formatter={(v: number) => fmtKES(v)} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5">
                    {result.lines.map((line, i) => (
                      <div key={i}
                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs ${
                          line.highlight ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 font-bold'
                          : line.warn ? 'bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20'
                          : 'bg-muted/30'
                        }`}>
                        <div>
                          <p className={`font-semibold ${line.warn ? 'text-red-700 dark:text-red-300' : 'text-foreground'}`}>{line.label}</p>
                          <p className="text-muted-foreground text-[10px]">{line.formula}</p>
                        </div>
                        <p className={`font-bold flex-shrink-0 ${line.warn ? 'text-red-600 dark:text-red-400' : 'text-foreground'}`}>{fmtKES(line.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-xl p-3">
                  <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <p>Estimate only. KRA values used vehicles against its Current Retail Selling Price (CRSP) schedule for the equivalent new vehicle, not your invoice — the assessed customs value is often higher than CIF. Import duty band (25% vs 35%) is disputed across official sources; confirm your vehicle&apos;s exact HS code and rate with KRA before relying on this figure. Vehicle must be right-hand drive and pass KEBS pre-shipment inspection (KS 1515:2000).</p>
                </div>
              </>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
                Enter a FOB value (or customs value) to see your estimated duty breakdown.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
