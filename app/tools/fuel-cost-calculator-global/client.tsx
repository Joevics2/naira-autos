'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Fuel, RotateCcw, ChevronRight, Zap, Globe2 } from 'lucide-react';
import { FUEL_DATA } from '@/lib/fuel-data';
import { FUEL_CURRENCIES, PUMP_PRICE_CONFIG, type FuelCurrencyCode } from '@/lib/fuel-currencies';
import { GLOBAL_ROUTES } from '@/lib/fuel-routes';

function fmt(n: number, symbol: string) { return symbol + Math.round(n).toLocaleString('en-US'); }

export default function GlobalFuelCostClient() {
  const [currency, setCurrency] = useState<FuelCurrencyCode>('USD');
  const symbol = FUEL_CURRENCIES.find(c => c.code === currency)?.symbol ?? '$';
  const [selectedBrand, setSelectedBrand] = useState('Toyota');
  const [selectedModel, setSelectedModel] = useState('Camry 2.5 (2012–2017)');
  const [selectedRoute, setSelectedRoute] = useState('New York → Los Angeles');
  const [customDistance, setCustomDistance] = useState('');
  const [driveMode, setDriveMode] = useState<'city' | 'highway' | 'mixed'>('mixed');
  const [pumpPrice, setPumpPrice] = useState(1.3);
  const priceConfig = PUMP_PRICE_CONFIG[currency];

  useEffect(() => {
    setPumpPrice(PUMP_PRICE_CONFIG[currency].default);
  }, [currency]);

  useEffect(() => {
    const models = Object.keys(FUEL_DATA[selectedBrand] || {});
    if (models.length > 0 && !FUEL_DATA[selectedBrand]?.[selectedModel]) setSelectedModel(models[0]);
  }, [selectedBrand]);

  const brands = Object.keys(FUEL_DATA).sort();
  const models = Object.keys(FUEL_DATA[selectedBrand] || {});
  const carData = FUEL_DATA[selectedBrand]?.[selectedModel];
  const isEV = carData?.city === 0 && carData?.hwy === 0;

  const routeKm = GLOBAL_ROUTES.find(r => r.label === selectedRoute)?.km ?? 0;
  const distance = selectedRoute === 'Custom distance' ? parseFloat(customDistance) || 0 : routeKm;

  const calc = useMemo(() => {
    if (!carData || isEV || !distance || !pumpPrice) return null;
    const rate = driveMode === 'city' ? carData.city : driveMode === 'highway' ? carData.hwy : (carData.city + carData.hwy) / 2;
    const litres = (rate / 100) * distance;
    const cost = litres * pumpPrice;
    return { litres, cost, rate, cityL: carData.city, hwyL: carData.hwy, tank: carData.tank };
  }, [carData, isEV, distance, pumpPrice, driveMode]);

  const reset = () => { setSelectedBrand('Toyota'); setSelectedModel('Camry 2.5 (2012–2017)'); setSelectedRoute('New York → Los Angeles'); setCustomDistance(''); setDriveMode('mixed'); setPumpPrice(priceConfig.default); };
  const selectCls = 'w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer';

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Currency */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <Globe2 className="h-3 w-3" /> Currency &amp; Country
              </label>
              <select value={currency} onChange={e => setCurrency(e.target.value as FuelCurrencyCode)} className={selectCls}>
                {FUEL_CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.symbol} {c.code} — {c.label}</option>
                ))}
              </select>
            </div>

            {/* Brand + Model */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Brand</label>
                <select value={selectedBrand} onChange={e => setSelectedBrand(e.target.value)} className={selectCls}>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Model &amp; Year</label>
                <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)} className={selectCls}>
                  {models.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                {carData && !isEV && (
                  <p className="text-xs text-muted-foreground mt-1">City: <strong className="text-foreground">{carData.city}</strong> · Hwy: <strong className="text-foreground">{carData.hwy}</strong> L/100km</p>
                )}
              </div>
            </div>

            {/* Drive mode */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Driving Condition</label>
              <div className="grid grid-cols-3 gap-1.5">
                {([
                  { key: 'city', label: '🏙 City', sub: 'Stop-start' },
                  { key: 'mixed', label: '⚡ Mixed', sub: 'Default' },
                  { key: 'highway', label: '🛣 Highway', sub: 'Open road' },
                ] as const).map(({ key, label, sub }) => (
                  <button key={key} onClick={() => setDriveMode(key)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${driveMode === key ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    <div>{label}</div>
                    <div className="font-normal opacity-70 text-[10px]">{sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Route + Custom */}
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Route</label>
              <select value={selectedRoute} onChange={e => setSelectedRoute(e.target.value)} className={`${selectCls} mb-2`}>
                {GLOBAL_ROUTES.map(r => (
                  <option key={r.label} value={r.label}>{r.label}{r.km > 0 ? ` — ${r.km.toLocaleString()}km` : ''}</option>
                ))}
              </select>
              {selectedRoute === 'Custom distance' && (
                <div className="relative">
                  <input type="number" value={customDistance} onChange={e => setCustomDistance(e.target.value)} placeholder="Enter distance in km"
                    className="w-full h-11 pl-4 pr-10 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-emerald-500 transition-all" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">km</span>
                </div>
              )}
            </div>

            {/* Pump price slider */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Pump Price / Litre</label>
                <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{symbol}{pumpPrice.toLocaleString()}</span>
              </div>
              <input type="range" min={priceConfig.min} max={priceConfig.max} step={priceConfig.step} value={pumpPrice} onChange={e => setPumpPrice(Number(e.target.value))} className="w-full accent-emerald-500 h-2 rounded-full mb-2" />
              <div className="flex gap-1.5 flex-wrap">
                {priceConfig.presets.map(p => (
                  <button key={p} onClick={() => setPumpPrice(p)}
                    className={`text-xs py-1 rounded-lg border transition-all font-medium flex-1 ${pumpPrice === p ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-card border-border text-muted-foreground hover:border-emerald-500/50'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={reset} className="flex items-center justify-center gap-2 w-full h-10 rounded-xl text-xs font-medium border border-border text-muted-foreground hover:text-foreground transition-all">
              <RotateCcw className="h-3.5 w-3.5" /> Reset
            </button>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-3">
            {isEV ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-3">
                  <Zap className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-sm font-bold text-foreground mb-1">Electric Vehicle</p>
                <p className="text-xs text-muted-foreground">No fuel cost to calculate for this model.</p>
              </div>
            ) : !calc ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                  <Fuel className="h-6 w-6 text-emerald-500/50" />
                </div>
                <p className="text-xs text-muted-foreground">Select a car and route — results update live.</p>
              </div>
            ) : (
              <>
                {/* Hero */}
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
                  <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide mb-1">
                    Fuel Cost — {selectedRoute !== 'Custom distance' ? selectedRoute : `${distance}km`}
                  </p>
                  <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 leading-none"
                    style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                    {fmt(calc.cost, symbol)}
                  </p>
                  <p className="text-xs text-emerald-700/60 dark:text-emerald-400/60 mt-1.5">
                    {calc.litres.toFixed(1)}L × {symbol}{pumpPrice.toLocaleString()}/L · {driveMode === 'city' ? 'City' : driveMode === 'highway' ? 'Highway' : 'Mixed'} · {calc.rate.toFixed(1)}L/100km
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Litres</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{calc.litres.toFixed(1)}L</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Per km</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{symbol}{(calc.cost / distance).toFixed(2)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-card border border-border text-center">
                    <p className="text-xs text-muted-foreground mb-1">Tank fill</p>
                    <p className="text-xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {calc.tank > 0 ? `${Math.ceil(calc.litres / calc.tank)}x` : '—'}
                    </p>
                  </div>
                </div>

                {/* Tank bar */}
                {calc.tank > 0 && (
                  <div className="rounded-xl border border-border bg-card p-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>Tank usage</span>
                      <span>{((calc.litres / calc.tank) * 100).toFixed(0)}% of {calc.tank}L</span>
                    </div>
                    <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${calc.litres / calc.tank > 0.9 ? 'bg-red-500' : calc.litres / calc.tank > 0.6 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                        style={{ width: `${Math.min((calc.litres / calc.tank) * 100, 100)}%` }} />
                    </div>
                    {calc.litres > calc.tank && (
                      <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">Needs {Math.ceil(calc.litres / calc.tank)} fill-ups for this route</p>
                    )}
                  </div>
                )}

                {/* City vs Highway comparison */}
                <div className="rounded-xl border border-border bg-card p-3">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2.5">City vs Highway</p>
                  <div className="space-y-2">
                    {[
                      { label: '🏙 City', rate: calc.cityL },
                      { label: '⚡ Mixed', rate: (calc.cityL + calc.hwyL) / 2 },
                      { label: '🛣 Highway', rate: calc.hwyL },
                    ].map(({ label, rate }) => {
                      const cost = (rate / 100) * distance * pumpPrice;
                      return (
                        <div key={label} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-foreground font-medium w-20">{label}</span>
                            <span className="text-xs text-muted-foreground">{rate.toFixed(1)}L/100km</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold text-foreground">{fmt(cost, symbol)}</span>
                            <span className="text-xs text-muted-foreground ml-2">{((rate / 100) * distance).toFixed(1)}L</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CTAs */}
                <div className="grid grid-cols-2 gap-2">
                  <Link href="/tools/fuel-cost-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Nigeria-specific version</p>
                    <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
                  </Link>
                  <Link href="/tools/best-car-for" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Find a fuel-efficient car</p>
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
