'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  RefreshCw, Info, ChevronDown, ChevronUp, RotateCcw, ExternalLink, Printer,
  ShieldAlert, TrendingDown, XOctagon,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RTooltip, Legend } from 'recharts';

type VehicleType = 'passenger' | 'commercial' | 'motorcycle';
type Origin = 'general' | 'eu' | 'sadc';
type Status = 'new' | 'used';
type UsedCategory = 'none' | 'returning_resident' | 'immigrant' | 'inheritance' | 'vintage' | 'racing' | 'disability';

const FALLBACK_RATE = 16.7; // ZAR per USD, July 2026
const NRCS_LOA_FEE = 1800; // flat, ZAR

const ORIGIN_LABEL: Record<Origin, string> = { general: 'General / MFN', eu: 'EU Agreement', sadc: 'SADC' };
const ORIGIN_DUTY: Record<Origin, number> = { general: 0.25, eu: 0.18, sadc: 0 };

const USED_CATEGORY_LABEL: Record<UsedCategory, string> = {
  none: 'None — no ITAC exemption',
  returning_resident: 'Returning SA resident (≥6mo abroad, owned vehicle)',
  immigrant: 'Immigrant (permanent residence)',
  inheritance: 'Inheritance',
  vintage: 'Vintage / collector (≥40 years)',
  racing: 'Racing car (track use only)',
  disability: 'Disability-adapted vehicle',
};

function fmtZAR(n: number) { return 'R' + Math.round(n).toLocaleString('en-ZA'); }
function fmtUSD(n: number) { return '$' + Math.round(n).toLocaleString('en-US'); }
function pct(r: number) { return (r * 100).toFixed(1) + '%'; }

/** SARS ad valorem excise formula for vehicles: A = 0.00003 × B − 0.75, clamped 0–30%.
 *  Not stated verbatim in source research — reconstructed from the standard SARS
 *  Schedule 1 Part 2B formula. Flagged as "verify" in the UI. */
function getAdValoremRate(valueZAR: number, type: VehicleType): number {
  const raw = 0.00003 * valueZAR - 0.75;
  const clamped = Math.max(0, Math.min(30, raw));
  const rate = clamped / 100;
  return type === 'motorcycle' ? rate / 2 : rate; // motorcycles: flat lower rate per research, approximated
}

interface BreakdownLine {
  label: string;
  formula: string;
  amount: number;
  highlight?: boolean;
  warn?: boolean;
}

const PIE_COLORS = ['#10b981', '#f59e0b', '#ef4444', '#6366f1', '#94a3b8'];

export default function ImportDutySouthAfricaClient() {
  const [status, setStatus] = useState<Status>('new');
  const [usedCategory, setUsedCategory] = useState<UsedCategory>('none');
  const [vehicleType, setVehicleType] = useState<VehicleType>('passenger');
  const [origin, setOrigin] = useState<Origin>('general');
  const [useDirectCustomsValue, setUseDirectCustomsValue] = useState(false);
  const [customsValueUSD, setCustomsValueUSD] = useState('25000');
  const [fobUSD, setFobUSD] = useState('21000');
  const [freightUSD, setFreightUSD] = useState('2200');
  const [insurancePct, setInsurancePct] = useState('1');
  const [exchangeRate, setExchangeRate] = useState(String(FALLBACK_RATE));
  const [rateLoading, setRateLoading] = useState(false);
  const [rateLastFetched, setRateLastFetched] = useState<string | null>(null);
  const [agentFees, setAgentFees] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fetchLiveRate = useCallback(async () => {
    setRateLoading(true);
    try {
      const res = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await res.json();
      if (data?.rates?.ZAR) {
        setExchangeRate(data.rates.ZAR.toFixed(2));
        setRateLastFetched(new Date().toLocaleTimeString());
      }
    } catch { /* silent — keep fallback */ } finally { setRateLoading(false); }
  }, []);

  const permitBlocked = status === 'used' && usedCategory === 'none';

  const result = useMemo(() => {
    const er = parseFloat(exchangeRate) || FALLBACK_RATE;
    const fob = parseFloat(fobUSD) || 0;
    const freight = parseFloat(freightUSD) || 0;
    const insRate = (parseFloat(insurancePct) || 1) / 100;
    const computedCifUSD = fob + freight + (fob + freight) * insRate;
    const customsValue = (useDirectCustomsValue ? parseFloat(customsValueUSD) || 0 : computedCifUSD) * er;

    if (customsValue <= 0) return null;

    const dutyRate = vehicleType === 'commercial' ? Math.min(0.20, ORIGIN_DUTY[origin]) : ORIGIN_DUTY[origin];
    const duty = dutyRate * customsValue;

    const adValoremRate = getAdValoremRate(customsValue, vehicleType);
    const adValorem = adValoremRate * customsValue;

    const atv = customsValue * 1.10 + duty + adValorem;
    const vat = 0.15 * atv;

    const nrcsFee = NRCS_LOA_FEE;
    const extraFees = parseFloat(agentFees) || 0;

    const totalTaxes = duty + adValorem + vat + nrcsFee;
    const grandTotal = customsValue + totalTaxes + extraFees;
    const effectivePct = (totalTaxes / customsValue) * 100;

    // What-if: SADC origin (0% duty) vs current selection
    const sadcDuty = 0;
    const sadcTotalTaxes = sadcDuty + adValorem + (0.15 * (customsValue * 1.10 + sadcDuty + adValorem)) + nrcsFee;
    const savingsIfSADC = origin === 'sadc' ? 0 : totalTaxes - sadcTotalTaxes;

    const lines: BreakdownLine[] = [
      { label: 'Customs Value (CIF)', formula: `${useDirectCustomsValue ? 'Declared customs value' : 'FOB + Freight + Insurance'} × R${er.toFixed(2)}/USD`, amount: customsValue },
      { label: `Import Duty — ${pct(dutyRate)} (${ORIGIN_LABEL[origin]})`, formula: `${pct(dutyRate)} × ${fmtZAR(customsValue)}`, amount: duty },
      { label: `Ad Valorem Excise — ${pct(adValoremRate)} (verify formula)`, formula: `SARS sliding-scale formula × ${fmtZAR(customsValue)}`, amount: adValorem },
      { label: 'VAT — 15% of Added Tax Value', formula: `15% × (${fmtZAR(customsValue)}×1.10 + Duty + Ad Valorem)`, amount: vat },
      { label: 'NRCS Letter of Authority Fee', formula: 'Flat compliance fee', amount: nrcsFee },
      { label: 'Total Statutory Duties, Taxes & Fees', formula: 'Sum of all above', amount: totalTaxes, highlight: true },
    ];
    if (extraFees > 0) lines.push({ label: 'Clearing Agent / Port Fees (your estimate)', formula: 'User entered', amount: extraFees });
    lines.push({ label: 'Estimated Total Landed Cost', formula: 'Customs value + Duties + Fees', amount: grandTotal, highlight: true });

    const pieData = [
      { name: 'Customs Value', value: customsValue },
      { name: 'Import Duty', value: duty },
      { name: 'Ad Valorem Excise', value: adValorem },
      { name: 'VAT', value: vat },
      { name: 'NRCS Fee', value: nrcsFee },
    ];

    return { customsValue, duty, adValorem, vat, totalTaxes, grandTotal, effectivePct, savingsIfSADC, lines, pieData };
  }, [status, usedCategory, vehicleType, origin, useDirectCustomsValue, customsValueUSD, fobUSD, freightUSD, insurancePct, exchangeRate, agentFees]);

  const reset = () => {
    setStatus('new'); setUsedCategory('none'); setVehicleType('passenger'); setOrigin('general');
    setUseDirectCustomsValue(false); setCustomsValueUSD('25000'); setFobUSD('21000'); setFreightUSD('2200');
    setInsurancePct('1'); setExchangeRate(String(FALLBACK_RATE)); setAgentFees('');
  };

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background print:bg-white" id="sa-duty-calculator">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        <div className="flex items-center gap-2 text-xs bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-800 dark:text-blue-300 rounded-xl px-4 py-2.5 mb-6 print:hidden">
          <Info className="h-3.5 w-3.5 flex-shrink-0" />
          <span><strong>Before you calculate:</strong> South Africa restricts used vehicle imports to protect local manufacturing — most buyers need an ITAC permit under a specific exemption category. Select your status below first.</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4 print:hidden">

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Status</label>
              <div className="grid grid-cols-2 gap-1.5">
                {(['new', 'used'] as Status[]).map((s) => (
                  <button key={s} onClick={() => setStatus(s)}
                    className={`py-2 rounded-lg text-xs font-bold border capitalize transition-all ${
                      status === s ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'
                    }`}>
                    {s === 'new' ? 'Brand New' : 'Used'}
                  </button>
                ))}
              </div>
            </div>

            {status === 'used' && (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">ITAC Exemption Category</label>
                <select value={usedCategory} onChange={(e) => setUsedCategory(e.target.value as UsedCategory)} className={iCls}>
                  {(Object.keys(USED_CATEGORY_LABEL) as UsedCategory[]).map((c) => (
                    <option key={c} value={c}>{USED_CATEGORY_LABEL[c]}</option>
                  ))}
                </select>
                {usedCategory !== 'none' && (
                  <p className="text-[11px] text-muted-foreground mt-1">ITAC permit still required even with a qualifying category — most carry a 2-year no-resale condition.</p>
                )}
              </div>
            )}

            {!permitBlocked && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Type</label>
                    <select value={vehicleType} onChange={(e) => setVehicleType(e.target.value as VehicleType)} className={iCls}>
                      <option value="passenger">Passenger</option>
                      <option value="commercial">Commercial / LDV</option>
                      <option value="motorcycle">Motorcycle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Origin / Trade Pref.</label>
                    <select value={origin} onChange={(e) => setOrigin(e.target.value as Origin)} className={iCls}>
                      {(Object.keys(ORIGIN_LABEL) as Origin[]).map((o) => (
                        <option key={o} value={o}>{ORIGIN_LABEL[o]} ({pct(ORIGIN_DUTY[o])})</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <button onClick={() => setUseDirectCustomsValue(false)}
                    className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${!useDirectCustomsValue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                    Estimate from CIF
                  </button>
                  <button onClick={() => setUseDirectCustomsValue(true)}
                    className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${useDirectCustomsValue ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground'}`}>
                    I know my customs value
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
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Exchange Rate (ZAR per USD)</label>
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
                  Advanced: Clearing agent fees
                </button>
                {showAdvanced && (
                  <div>
                    <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Clearing Agent / Port Fees (ZAR)</label>
                    <input type="number" value={agentFees} onChange={(e) => setAgentFees(e.target.value)} placeholder="e.g. 8500" className={iCls} />
                  </div>
                )}

                <div className="flex gap-2">
                  <button onClick={reset} className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border">
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                  <a href="https://www.itac.org.za" target="_blank" rel="noopener noreferrer nofollow"
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-500/20 ml-auto">
                    <ExternalLink className="h-3.5 w-3.5" /> ITAC Permits
                  </a>
                </div>
              </>
            )}
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-4">
            {permitBlocked ? (
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-2xl p-6 flex items-start gap-3">
                <XOctagon className="h-6 w-6 text-red-500 flex-shrink-0" />
                <div>
                  <p className="text-base font-black text-red-700 dark:text-red-300 mb-1">ITAC import permit required</p>
                  <p className="text-sm text-red-700/80 dark:text-red-300/80 leading-relaxed">
                    South Africa restricts used vehicle imports to protect local manufacturing. Without a qualifying category — returning resident, immigrant, inheritance, vintage/collector (≥40 years), racing car, or disability-adapted — a used vehicle import permit is very unlikely to be granted. Grey imports do circulate but are illegal for road use and registration, carrying real seizure and insurance risk. Select an exemption category above if one applies to you, or switch to &ldquo;Brand New&rdquo; to see standard duty costs.
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
                        {fmtZAR(result.grandTotal)}
                      </p>
                      <p className="text-xs text-muted-foreground">{fmtUSD(result.grandTotal / (parseFloat(exchangeRate) || FALLBACK_RATE))} equivalent</p>
                    </div>
                    <button onClick={() => window.print()} className="print:hidden flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg border border-border flex-shrink-0">
                      <Printer className="h-3.5 w-3.5" /> Save / Print
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Total Duties, Taxes &amp; Fees</p>
                      <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">{fmtZAR(result.totalTaxes)}</p>
                    </div>
                    <div className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[11px] text-muted-foreground">Effective Rate</p>
                      <p className="text-lg font-black text-orange-600 dark:text-orange-400">{result.effectivePct.toFixed(1)}%</p>
                    </div>
                  </div>

                  {result.savingsIfSADC > 1000 && (
                    <div className="flex items-start gap-2 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3 mb-4">
                      <TrendingDown className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-700 dark:text-emerald-300">
                        <strong>What-if — SADC origin:</strong> if this vehicle qualified as SADC-origin (0% duty, rules of origin apply), you&apos;d save roughly {fmtZAR(result.savingsIfSADC)}.
                      </p>
                    </div>
                  )}

                  <div className="h-56 mb-2">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={result.pieData} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={2}>
                          {result.pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <RTooltip formatter={(v: number) => fmtZAR(v)} />
                        <Legend wrapperStyle={{ fontSize: '11px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="space-y-1.5">
                    {result.lines.map((line, i) => (
                      <div key={i}
                        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-xs ${
                          line.highlight ? 'bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 font-bold' : 'bg-muted/30'
                        }`}>
                        <div>
                          <p className="font-semibold text-foreground">{line.label}</p>
                          <p className="text-muted-foreground text-[10px]">{line.formula}</p>
                        </div>
                        <p className="font-bold flex-shrink-0 text-foreground">{fmtZAR(line.amount)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-xl p-3">
                  <ShieldAlert className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                  <p>Estimate only. The ad valorem excise figure uses SARS&apos;s standard sliding-scale formula reconstructed from public Schedule 1 Part 2B guidance — confirm the exact figure with SARS&apos;s live calculator before relying on it. Vehicle must be right-hand drive and hold an NRCS Letter of Authority; a carbon emissions levy may also apply based on CO2 g/km and is not included here. Verify duty rate for your specific HS code and country of origin.</p>
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
