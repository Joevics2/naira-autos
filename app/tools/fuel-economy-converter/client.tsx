'use client';

import { useState, useMemo } from 'react';
import { Fuel, RotateCcw, ArrowRightLeft } from 'lucide-react';

// ── Conversion constants ─────────────────────────────────────────
// 1 US gallon = 3.785411784 L, 1 UK (imperial) gallon = 4.54609 L, 1 mile = 1.609344 km
const L100KM_PER_MPG_US = 235.214583;   // L/100km = 235.214583 / mpg(US)
const L100KM_PER_MPG_UK = 282.480936;   // L/100km = 282.480936 / mpg(UK)

type Unit = 'mpg_us' | 'mpg_uk' | 'l100km' | 'kml';

const UNIT_LABELS: Record<Unit, string> = {
  mpg_us: 'MPG (US)',
  mpg_uk: 'MPG (UK / Imperial)',
  l100km: 'L/100km',
  kml: 'km/L',
};

const UNIT_SHORT: Record<Unit, string> = {
  mpg_us: 'mpg (US)',
  mpg_uk: 'mpg (UK)',
  l100km: 'L/100km',
  kml: 'km/L',
};

// Convert any input unit + value to a canonical L/100km figure
function toL100km(value: number, unit: Unit): number {
  if (value <= 0) return 0;
  switch (unit) {
    case 'mpg_us': return L100KM_PER_MPG_US / value;
    case 'mpg_uk': return L100KM_PER_MPG_UK / value;
    case 'l100km': return value;
    case 'kml': return 100 / value;
  }
}

function fromL100km(l100km: number, unit: Unit): number {
  if (l100km <= 0) return 0;
  switch (unit) {
    case 'mpg_us': return L100KM_PER_MPG_US / l100km;
    case 'mpg_uk': return L100KM_PER_MPG_UK / l100km;
    case 'l100km': return l100km;
    case 'kml': return 100 / l100km;
  }
}

const QUICK_PRESETS: { label: string; value: number; unit: Unit }[] = [
  { label: 'Efficient sedan', value: 6.5, unit: 'l100km' },
  { label: 'Average SUV', value: 9.5, unit: 'l100km' },
  { label: '30 mpg (US)', value: 30, unit: 'mpg_us' },
  { label: 'Hybrid', value: 20, unit: 'kml' },
];

export default function FuelEconomyClient() {
  const [inputValue, setInputValue] = useState('7.5');
  const [inputUnit, setInputUnit] = useState<Unit>('l100km');

  const numericValue = parseFloat(inputValue);
  const isValid = !isNaN(numericValue) && numericValue > 0;
  const l100km = useMemo(() => (isValid ? toL100km(numericValue, inputUnit) : 0), [numericValue, inputUnit, isValid]);

  const results: { unit: Unit; value: number }[] = (['mpg_us', 'mpg_uk', 'l100km', 'kml'] as Unit[])
    .filter(u => u !== inputUnit)
    .map(u => ({ unit: u, value: fromL100km(l100km, u) }));

  const reset = () => { setInputValue('7.5'); setInputUnit('l100km'); };
  const selectCls = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all cursor-pointer';

  const fmt = (n: number) => n >= 100 ? n.toFixed(0) : n >= 10 ? n.toFixed(1) : n.toFixed(2);

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Input ── */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Fuel economy value</label>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="w-full h-12 px-3 text-lg font-bold border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20 transition-all"
                placeholder="e.g. 7.5"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Unit</label>
              <select value={inputUnit} onChange={e => setInputUnit(e.target.value as Unit)} className={selectCls}>
                {(Object.keys(UNIT_LABELS) as Unit[]).map(u => <option key={u} value={u}>{UNIT_LABELS[u]}</option>)}
              </select>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>

            <div>
              <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Quick presets</p>
              <div className="grid grid-cols-2 gap-2">
                {QUICK_PRESETS.map(p => (
                  <button
                    key={p.label}
                    onClick={() => { setInputValue(String(p.value)); setInputUnit(p.unit); }}
                    className="text-left px-3 py-2 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-orange-500/40 transition-all"
                  >
                    {p.label}
                    <span className="block text-[11px] text-muted-foreground/70">{p.value} {UNIT_SHORT[p.unit]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {!isValid ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3">
                  <Fuel className="h-6 w-6 text-orange-500/50" />
                </div>
                <p className="text-xs text-muted-foreground">Enter a value above — conversions update live.</p>
              </div>
            ) : (
              <>
                <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/25">
                  <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
                    <ArrowRightLeft className="h-3.5 w-3.5" /> Converted from {numericValue} {UNIT_SHORT[inputUnit]}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-3">
                    {results.map(({ unit, value }) => (
                      <div key={unit}>
                        <p className="text-xs text-orange-700/70 dark:text-orange-400/60 mb-0.5">{UNIT_LABELS[unit]}</p>
                        <p className="text-3xl font-black text-orange-600 dark:text-orange-400 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                          {fmt(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">How to read this</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Remember: MPG and km/L are &quot;the bigger the better&quot; — more distance per unit of fuel. L/100km works the opposite way — &quot;the smaller the better&quot; — since it measures fuel consumed over a fixed distance. A car that&apos;s efficient will show a <strong className="text-foreground">high</strong> MPG or km/L figure but a <strong className="text-foreground">low</strong> L/100km figure.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
