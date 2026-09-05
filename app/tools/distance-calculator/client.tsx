'use client';

import { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  MapPin, ArrowRightLeft, Navigation, Fuel, Clock, Ruler,
  Shuffle, ExternalLink, ChevronRight, Search, X,
} from 'lucide-react';
import { NG_TOWNS, findTown, type DistanceTown } from '@/lib/distance-towns-ng';
import { NG_CAPITAL_DISTANCE_KM } from '@/lib/ng-distance-matrix';
import {
  computeDistance, estimateDriveTime, estimateFuelCost, formatHours, nearestTowns,
} from '@/lib/distance-engine';

const POPULAR_ROUTES: Array<{ from: string; to: string }> = [
  { from: 'Lagos', to: 'Abuja' },
  { from: 'Lagos', to: 'Port Harcourt' },
  { from: 'Abuja', to: 'Kano' },
  { from: 'Lagos', to: 'Ibadan' },
  { from: 'Enugu', to: 'Abuja' },
  { from: 'Benin City', to: 'Warri' },
  { from: 'Kano', to: 'Port Harcourt' },
  { from: 'Abuja', to: 'Maiduguri' },
];

const PUMP_PRICE_PRESETS = [800, 950, 1000, 1100, 1500];
const CONSUMPTION_PRESETS = [
  { label: 'Sedan', value: 7.5 },
  { label: 'SUV', value: 11 },
  { label: 'Bus/Van', value: 14 },
  { label: 'Truck', value: 20 },
];

function fmtNaira(n: number): string {
  return `₦${Math.round(n).toLocaleString()}`;
}

// ─── Searchable town picker ──────────────────────────────────────────────────

function TownSelect({
  label, value, onChange, exclude,
}: {
  label: string;
  value: string;
  onChange: (name: string) => void;
  exclude?: string;
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
    const pool = NG_TOWNS.filter((t) => t.name !== exclude);
    const list = q
      ? pool.filter((t) => t.name.toLowerCase().includes(q) || t.state.toLowerCase().includes(q))
      : pool;
    return [...list].sort((a, b) => b.population - a.population).slice(0, 40);
  }, [query, exclude]);

  return (
    <div ref={wrapRef} className="relative">
      <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-1.5">{label}</p>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-amber-500/40 text-left transition-all"
      >
        <span className="flex items-center gap-2 text-sm font-bold text-white truncate">
          <MapPin className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
          {value || 'Select a town'}
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
              placeholder="Search town or state..."
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
              <p className="px-3 py-4 text-xs text-white/30 text-center">No towns match &ldquo;{query}&rdquo;</p>
            )}
            {filtered.map((t) => (
              <button
                key={t.name}
                onClick={() => { onChange(t.name); setOpen(false); setQuery(''); }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2 text-left hover:bg-white/[0.06] transition-colors ${value === t.name ? 'bg-amber-500/10' : ''}`}
              >
                <span className="text-sm text-white/90">{t.name}</span>
                <span className="text-[10px] text-white/30">{t.state}{t.isCapital ? ' · Capital' : ''}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main tool ────────────────────────────────────────────────────────────────

function DistanceCalculatorInner() {
  const router = useRouter();
  const params = useSearchParams();

  const [from, setFrom] = useState<string>(() => params.get('from') || 'Lagos');
  const [to, setTo] = useState<string>(() => params.get('to') || 'Abuja');
  const [litresPer100km, setLitresPer100km] = useState(8.5);
  const [pumpPrice, setPumpPrice] = useState(1000);

  // Keep the URL shareable without spamming history entries.
  useEffect(() => {
    const qs = new URLSearchParams();
    qs.set('from', from);
    qs.set('to', to);
    router.replace(`/tools/distance-calculator?${qs.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  const fromTown = findTown(from);
  const toTown = findTown(to);

  const result = useMemo(() => {
    if (!fromTown || !toTown) return null;
    return computeDistance(fromTown, toTown, NG_CAPITAL_DISTANCE_KM);
  }, [fromTown, toTown]);

  const driveTime = result ? estimateDriveTime(result.roadKm) : null;
  const fuel = result ? estimateFuelCost(result.roadKm, litresPer100km, pumpPrice) : null;

  const nearest = useMemo(() => {
    if (!fromTown) return [];
    return nearestTowns(fromTown, NG_TOWNS, 10, NG_CAPITAL_DISTANCE_KM);
  }, [fromTown]);

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function randomTrip() {
    const pool = NG_TOWNS;
    const a = pool[Math.floor(Math.random() * pool.length)];
    let b = pool[Math.floor(Math.random() * pool.length)];
    while (b.name === a.name) b = pool[Math.floor(Math.random() * pool.length)];
    setFrom(a.name);
    setTo(b.name);
  }

  const mapsUrl = fromTown && toTown
    ? `https://www.google.com/maps/dir/?api=1&origin=${fromTown.lat},${fromTown.lng}&destination=${toTown.lat},${toTown.lng}&travelmode=driving`
    : undefined;

  return (
    <div className="space-y-5">
      {/* Popular routes */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">Popular Routes</p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_ROUTES.map((r) => (
            <button
              key={`${r.from}-${r.to}`}
              onClick={() => { setFrom(r.from); setTo(r.to); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                from === r.from && to === r.to
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-300'
                  : 'bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {r.from} → {r.to}
            </button>
          ))}
          <button
            onClick={randomTrip}
            className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full border border-white/8 bg-white/[0.03] text-white/40 hover:border-amber-500/30 hover:text-amber-300 transition-all"
          >
            <Shuffle className="h-3 w-3" /> Random
          </button>
        </div>
      </div>

      {/* From / To */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-2 items-end">
        <TownSelect label="From" value={from} onChange={setFrom} exclude={to} />
        <button
          onClick={swap}
          aria-label="Swap towns"
          className="flex items-center justify-center h-10 w-10 mx-auto sm:mx-0 rounded-full bg-white/[0.04] border border-white/10 hover:border-amber-500/40 hover:text-amber-400 text-white/50 transition-all"
        >
          <ArrowRightLeft className="h-4 w-4" />
        </button>
        <TownSelect label="To" value={to} onChange={setTo} exclude={from} />
      </div>

      {/* Results */}
      {result && driveTime && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Ruler className="h-3 w-3" /> Road Distance
            </p>
            <p className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {Math.round(result.roadKm)} km
            </p>
            <p className="text-[10px] mt-1 font-semibold" style={{ color: result.verified ? '#34d399' : '#fbbf24' }}>
              {result.verified ? '✓ Verified route' : '≈ Estimated'}
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Navigation className="h-3 w-3" /> Straight-Line
            </p>
            <p className="text-2xl font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {Math.round(result.straightLineKm)} km
            </p>
            <p className="text-[10px] text-white/30 mt-1">&ldquo;As the crow flies&rdquo;</p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Drive Time
            </p>
            <p className="text-lg font-black text-white leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {formatHours(driveTime.realisticHours)}
            </p>
            <p className="text-[10px] text-white/30 mt-1">Ideal: {formatHours(driveTime.idealHours)}</p>
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
          <span className="text-xs font-bold text-white/70">Open this route in Google Maps for live traffic</span>
          <ExternalLink className="h-3.5 w-3.5 text-amber-400" />
        </a>
      )}

      {/* Fuel cost estimator */}
      {fuel && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wide flex items-center gap-1.5">
            <Fuel className="h-3.5 w-3.5" /> Fuel Cost Estimator
          </p>
          <div className="flex flex-wrap gap-1.5">
            {CONSUMPTION_PRESETS.map((c) => (
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
              <label className="text-[10px] text-white/40 uppercase tracking-wide font-bold">Pump Price / Litre</label>
              <span className="text-sm font-black text-amber-400">{fmtNaira(pumpPrice)}</span>
            </div>
            <input
              type="range" min={500} max={2000} step={50} value={pumpPrice}
              onChange={(e) => setPumpPrice(Number(e.target.value))}
              className="w-full accent-amber-500 h-2 rounded-full mb-2"
            />
            <div className="flex gap-1.5">
              {PUMP_PRICE_PRESETS.map((p) => (
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
            <span className="text-xs text-white/40">{fuel.litres.toFixed(1)}L needed</span>
            <span className="text-xl font-black text-amber-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {fmtNaira(fuel.cost)}
            </span>
          </div>
        </div>
      )}

      {/* Nearest towns table */}
      {fromTown && nearest.length > 0 && (
        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
          <p className="text-xs font-bold text-white/40 uppercase tracking-wide mb-2.5">Nearest Towns to {fromTown.name}</p>
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

      <div className="grid grid-cols-2 gap-2">
        <Link href="/tools/road-trip-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-all">
          <p className="text-xs font-bold text-amber-300">Road trip calculator</p>
          <ChevronRight className="h-3.5 w-3.5 text-amber-400" />
        </Link>
        <Link href="/tools/fuel-cost-calculator" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all">
          <p className="text-xs font-bold text-white/70">Fuel cost calculator</p>
          <ChevronRight className="h-3.5 w-3.5 text-white/40" />
        </Link>
      </div>
    </div>
  );
}

export default function DistanceCalculatorClient() {
  return (
    <Suspense fallback={<div className="h-64 rounded-2xl bg-white/[0.03] border border-white/10 animate-pulse" />}>
      <DistanceCalculatorInner />
    </Suspense>
  );
}
