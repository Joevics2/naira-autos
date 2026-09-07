'use client';

/**
 * Country-agnostic Distance Calculator widget. Every country's client.tsx
 * (e.g. app/tools/distance-calculator/client.tsx for Nigeria) is a thin
 * wrapper that imports this and passes in that country's town list,
 * verified-distance pairs, popular routes, currency, and (for non-English
 * markets) a `strings` translation table and `dir: 'rtl'` — nothing about
 * distance/time/fuel logic or the underlying UI should ever need to change
 * per country or per language. Next.js only lets the root layout set the
 * document's `<html>` tag, so RTL is applied as a wrapping `dir` attribute
 * on this component's own root rather than a true document-level setting.
 */

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, ArrowRightLeft, Navigation, Fuel, Clock, Ruler,
  Shuffle, ExternalLink, ChevronRight, ChevronLeft, Search, X,
} from 'lucide-react';
import {
  computeDistance, estimateDriveTime, estimateFuelCost, formatHours, nearestTowns,
  type DistanceResult,
} from '@/lib/distance-engine';

export interface DistanceCalcTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export interface DistanceCalcStrings {
  from: string;
  to: string;
  popularRoutes: string;
  random: string;
  selectATown: string;
  searchPlaceholder: string;
  noTownsMatch: string; // gets the query interpolated: "No towns match "%s""
  capital: string; // suffix e.g. "· Capital"
  roadDistance: string;
  verifiedRoute: string;
  estimated: string;
  straightLine: string;
  asTheCrowFlies: string;
  driveTime: string;
  ideal: string;
  openInMaps: string;
  fuelCostEstimator: string;
  pumpPricePerLitre: string;
  litresNeeded: string; // gets the number interpolated: "%s L needed"
  nearestTownsTo: string; // gets the town name interpolated: "Nearest Towns to %s"
}

const EN_STRINGS: DistanceCalcStrings = {
  from: 'From',
  to: 'To',
  popularRoutes: 'Popular Routes',
  random: 'Random',
  selectATown: 'Select a town',
  searchPlaceholder: 'Search town or region...',
  noTownsMatch: 'No towns match "%s"',
  capital: 'Capital',
  roadDistance: 'Road Distance',
  verifiedRoute: 'Verified route',
  estimated: 'Estimated',
  straightLine: 'Straight-Line',
  asTheCrowFlies: '"As the crow flies"',
  driveTime: 'Drive Time',
  ideal: 'Ideal',
  openInMaps: 'Open this route in Google Maps for live traffic',
  fuelCostEstimator: 'Fuel Cost Estimator',
  pumpPricePerLitre: 'Pump Price / Litre',
  litresNeeded: '%s L needed',
  nearestTownsTo: 'Nearest Towns to %s',
};

function fill(template: string, value: string | number): string {
  return template.replace('%s', String(value));
}

export interface DistanceCalcConfig {
  basePath: string; // e.g. '/tools/distance-calculator' (Nigeria) or '.../-ghana'
  towns: DistanceCalcTown[];
  verifiedMatrix: Record<string, Record<string, number>>;
  popularRoutes: Array<{ from: string; to: string }>;
  defaultFrom: string;
  defaultTo: string;
  currencySymbol: string; // '₦', 'GH₵', 'ر.ق', etc.
  pumpPricePresets: number[];
  defaultPumpPrice: number;
  fuelConsumptionPresets?: Array<{ label: string; value: number }>;
  relatedTools?: Array<{ href: string; label: string; highlight?: boolean }>;
  /** Overrides for EN_STRINGS. Only the keys that differ need to be passed. */
  strings?: Partial<DistanceCalcStrings>;
  /** 'rtl' for Arabic and other right-to-left languages. Defaults to 'ltr'. */
  dir?: 'ltr' | 'rtl';
}

const DEFAULT_CONSUMPTION_PRESETS = [
  { label: 'Sedan', value: 7.5 },
  { label: 'SUV', value: 11 },
  { label: 'Bus/Van', value: 14 },
  { label: 'Truck', value: 20 },
];

function fmtMoney(n: number, symbol: string, dir: 'ltr' | 'rtl'): string {
  const num = Math.round(n).toLocaleString();
  return dir === 'rtl' ? `${num} ${symbol}` : `${symbol}${num}`;
}

function TownSelect({
  label, value, onChange, exclude, towns, s,
}: {
  label: string;
  value: string;
  onChange: (name: string) => void;
  exclude?: string;
  towns: DistanceCalcTown[];
  s: DistanceCalcStrings;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const pool = towns.filter((t) => t.name !== exclude);
    const list = q
      ? pool.filter((t) => t.name.toLowerCase().includes(q) || t.state.toLowerCase().includes(q))
      : pool;
    return [...list].sort((a, b) => b.population - a.population).slice(0, 40);
  }, [query, exclude, towns]);

  return (
    <div ref={wrapRef} className="relative">
      <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1.5">{label}</p>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 text-left transition-all"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white truncate">
          <MapPin className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
          {value || s.selectATown}
        </span>
        <Search className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
      </button>

      {open && (
        <div className="absolute z-30 mt-1.5 w-full rounded-xl border border-white/15 bg-[#0D1117] shadow-2xl overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10">
            <Search className="h-3.5 w-3.5 text-white/30" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={s.searchPlaceholder}
              className="w-full bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search">
                <X className="h-3.5 w-3.5 text-white/30 hover:text-white/60" />
              </button>
            )}
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="px-3 py-4 text-xs text-white/30 text-center">{fill(s.noTownsMatch, query)}</p>
            )}
            {filtered.map((t) => (
              <button
                key={t.name}
                onClick={() => { onChange(t.name); setOpen(false); setQuery(''); }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-white/[0.06] transition-colors ${value === t.name ? 'bg-amber-500/10' : ''}`}
              >
                <span className="text-sm text-white/90">{t.name}</span>
                <span className="text-[10px] text-white/30">{t.state}{t.isCapital ? ` · ${s.capital}` : ''}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function DistanceCalculatorInner({ config }: { config: DistanceCalcConfig }) {
  const {
    basePath, towns, verifiedMatrix, popularRoutes, defaultFrom, defaultTo,
    currencySymbol, pumpPricePresets, defaultPumpPrice, relatedTools,
  } = config;
  const dir = config.dir ?? 'ltr';
  const s: DistanceCalcStrings = { ...EN_STRINGS, ...config.strings };
  const RouteArrow = dir === 'rtl' ? ChevronLeft : ChevronRight;
  const consumptionPresets = config.fuelConsumptionPresets ?? DEFAULT_CONSUMPTION_PRESETS;

  const router = useRouter();
  const params = useSearchParams();

  const [from, setFrom] = useState<string>(() => params.get('from') || defaultFrom);
  const [to, setTo] = useState<string>(() => params.get('to') || defaultTo);
  const [litresPer100km, setLitresPer100km] = useState(consumptionPresets[0].value);
  const [pumpPrice, setPumpPrice] = useState(defaultPumpPrice);

  useEffect(() => {
    const qs = new URLSearchParams();
    qs.set('from', from);
    qs.set('to', to);
    router.replace(`${basePath}?${qs.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  const findTown = (name: string) => towns.find((t) => t.name === name);
  const fromTown = findTown(from);
  const toTown = findTown(to);

  const result: DistanceResult | null = useMemo(() => {
    if (!fromTown || !toTown) return null;
    return computeDistance(fromTown, toTown, verifiedMatrix);
  }, [fromTown, toTown, verifiedMatrix]);

  const driveTime = result ? estimateDriveTime(result.roadKm) : null;
  const fuel = result ? estimateFuelCost(result.roadKm, litresPer100km, pumpPrice) : null;

  const nearest = useMemo(() => {
    if (!fromTown) return [];
    return nearestTowns(fromTown, towns, 10, verifiedMatrix);
  }, [fromTown, towns, verifiedMatrix]);

  function swap() { setFrom(to); setTo(from); }

  function randomTrip() {
    const a = towns[Math.floor(Math.random() * towns.length)];
    let b = towns[Math.floor(Math.random() * towns.length)];
    while (b.name === a.name) b = towns[Math.floor(Math.random() * towns.length)];
    setFrom(a.name);
    setTo(b.name);
  }

  const mapsUrl = fromTown && toTown
    ? `https://www.google.com/maps/dir/?api=1&origin=${fromTown.lat},${fromTown.lng}&destination=${toTown.lat},${toTown.lng}&travelmode=driving`
    : undefined;

  return (
    <div dir={dir} className="space-y-5">
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">{s.popularRoutes}</p>
        <div className="flex flex-wrap gap-2">
          {popularRoutes.map((r) => (
            <button
              key={`${r.from}-${r.to}`}
              onClick={() => { setFrom(r.from); setTo(r.to); }}
              className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                from === r.from && to === r.to
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {r.from} <RouteArrow className="h-3 w-3" /> {r.to}
            </button>
          ))}
          <button
            onClick={randomTrip}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] text-white/40 hover:border-amber-500/30 hover:text-amber-300 transition-all"
          >
            <Shuffle className="h-3 w-3" /> {s.random}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
        <TownSelect label={s.from} value={from} onChange={setFrom} exclude={to} towns={towns} s={s} />
        <button
          onClick={swap}
          aria-label="Swap towns"
          className="flex items-center justify-center h-10 w-10 mx-auto sm:mx-0 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-500/40 hover:text-amber-400 text-white/50 transition-all"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <TownSelect label={s.to} value={to} onChange={setTo} exclude={from} towns={towns} s={s} />
      </div>

      {result && driveTime && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Ruler className="h-3 w-3" /> {s.roadDistance}
            </p>
            <p className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {Math.round(result.roadKm)} km
            </p>
            <p className="text-[10px] mt-1 font-semibold" style={{ color: result.verified ? '#34d399' : '#fbbf24' }}>
              {result.verified ? `✓ ${s.verifiedRoute}` : `≈ ${s.estimated}`}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Navigation className="h-3 w-3" /> {s.straightLine}
            </p>
            <p className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {Math.round(result.straightLineKm)} km
            </p>
            <p className="text-[10px] text-white/30 mt-1">{s.asTheCrowFlies}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> {s.driveTime}
            </p>
            <p className="text-lg font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {formatHours(driveTime.realisticHours)}
            </p>
            <p className="text-[10px] text-white/30 mt-1">{s.ideal}: {formatHours(driveTime.idealHours)}</p>
          </div>
        </div>
      )}

      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 transition-all"
        >
          <span className="text-xs font-bold text-white/70">{s.openInMaps}</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
        </a>
      )}

      {fuel && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wide flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" /> {s.fuelCostEstimator}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {consumptionPresets.map((c) => (
              <button
                key={c.label}
                onClick={() => setLitresPer100km(c.value)}
                className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-all ${
                  litresPer100km === c.value
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/40'
                }`}
              >
                {c.label} ({c.value}L/100km)
              </button>
            ))}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[10px] text-white/40 uppercase tracking-wide font-bold">{s.pumpPricePerLitre}</label>
              <span className="text-sm font-black text-amber-400">{fmtMoney(pumpPrice, currencySymbol, dir)}</span>
            </div>
            <input
              type="range" min={pumpPricePresets[0]} max={pumpPricePresets[pumpPricePresets.length - 1]} step={1} value={pumpPrice}
              onChange={(e) => setPumpPrice(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 rounded-full mb-2"
            />
            <div className="flex gap-1.5">
              {pumpPricePresets.map((p) => (
                <button
                  key={p}
                  onClick={() => setPumpPrice(p)}
                  className={`text-xs py-1 rounded-lg border transition-all font-medium flex-1 ${
                    pumpPrice === p ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white/[0.03] border-white/10 text-white/40 hover:border-amber-500/40'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-white/40">{fill(s.litresNeeded, fuel.litres.toFixed(1))}</span>
            <span className="text-xl font-black text-amber-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {fmtMoney(fuel.cost, currencySymbol, dir)}
            </span>
          </div>
        </div>
      )}

      {fromTown && nearest.length > 0 && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wide mb-2.5">{fill(s.nearestTownsTo, fromTown.name)}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
            {nearest.map((t) => (
              <button
                key={t.name}
                onClick={() => setTo(t.name)}
                className="flex items-center justify-between gap-2 py-1 text-left hover:text-amber-300 transition-colors group"
              >
                <span className="text-xs text-white/70 group-hover:text-amber-300 truncate">{t.name}</span>
                <span className="text-xs font-bold text-white/40 flex-shrink-0">
                  {Math.round(t.distance.roadKm)} km {t.distance.verified ? '' : '≈'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {relatedTools.map((rt) => (
            <Link
              key={rt.href}
              href={rt.href}
              className={`flex items-center justify-between gap-2 px-3 py-3 rounded-xl border transition-all ${
                rt.highlight
                  ? 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20'
                  : 'bg-white/[0.04] border-white/10 hover:border-white/20'
              }`}
            >
              <p className={`text-xs font-bold ${rt.highlight ? 'text-amber-300' : 'text-white/70'}`}>{rt.label}</p>
              <ChevronRight className={`h-3.5 w-3.5 ${rt.highlight ? 'text-amber-400' : 'text-white/40'} ${dir === 'rtl' ? 'rotate-180' : ''}`} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DistanceCalculatorWidget({ config }: { config: DistanceCalcConfig }) {
  return (
    <Suspense fallback={<div className="h-64 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />}>
      <DistanceCalculatorInner config={config} />
    </Suspense>
  );
}
