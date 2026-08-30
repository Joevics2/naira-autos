'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, AlertTriangle, Fuel, Wrench, Package, ArrowUpDown, Globe2, Zap } from 'lucide-react';
import {
  CARS,
  USE_CASE_META,
  maintenanceScore,
  sparePartsScore,
  type CarData,
  type UseCaseTag,
} from '../cars-data';
import { CAR_COUNTRIES, getCarCountry, localPriceRange, formatCarPrice, type CarCountry } from '@/lib/car-country-pricing';

// ─── Scoring ──────────────────────────────────────────────────────────────────

/**
 * Score a car for a given use case.
 * Returns 0–100. Higher = better match.
 * Scoring uses the car's base USD price so rankings stay consistent regardless
 * of which country is selected for display — only the displayed price changes.
 */
function scoreCarForUseCase(car: CarData, tag: UseCaseTag): number {
  if (!car.bestFor.includes(tag)) return 0;

  const maint  = maintenanceScore(car.maintenanceCost);   // 1–4
  const parts  = sparePartsScore(car.spareParts);          // 1–3
  const fuel   = car.isElectric ? 12.5 : Math.max(0, 20 - car.fuelConsumption); // lower consumption = higher score
  const ground = Math.min(car.groundClearance / 300, 1);  // normalised 0–1
  const price  = Math.max(0, 1 - car.basePriceUSD.min / 200_000); // lower min price = slightly better raw

  let score = 0;

  switch (tag) {
    case 'family':
      score = (car.seats / 9) * 30 + (Math.min(car.bootSpace, 800) / 800) * 20 + (maint / 4) * 25 + (parts / 3) * 25;
      break;
    case 'commercial':
      score = (maint / 4) * 35 + (parts / 3) * 35 + (fuel / 12.5) * 20 + (car.seats >= 5 ? 10 : 5);
      break;
    case 'highway':
      score = (Math.min(car.engineCC, 3500) / 3500) * 30 + (fuel / 12.5) * 25 + (maint / 4) * 25 + (parts / 3) * 20;
      break;
    case 'budget':
      score = price * 40 + (maint / 4) * 35 + (parts / 3) * 25;
      break;
    case 'offroad':
      score = ground * 50 + (maint / 4) * 25 + (parts / 3) * 25;
      break;
    case 'executive':
      score = (Math.min(car.engineCC, 4000) / 4000) * 40 + (maint / 4) * 30 + (parts / 3) * 20 + (car.seats / 9) * 10;
      break;
    case 'firstcar':
      score = (maint / 4) * 40 + (parts / 3) * 40 + price * 20;
      break;
    case 'fuelefficient':
      score = (fuel / 12.5) * 60 + (maint / 4) * 20 + (parts / 3) * 20;
      break;
    default:
      score = (maint / 4) * 34 + (parts / 3) * 33 + (fuel / 12.5) * 33;
  }

  return Math.round(Math.min(score, 100));
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

const USE_CASE_TAGS = Object.keys(USE_CASE_META) as UseCaseTag[];

function CountrySelector({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  return (
    <div className="max-w-sm">
      <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
        <Globe2 className="h-3 w-3" /> Country &amp; Currency
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all cursor-pointer"
      >
        {CAR_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>{c.flag} {c.name} — {c.currency}</option>
        ))}
      </select>
    </div>
  );
}

function MaintenanceBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    High: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25',
    'Very High': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function PartsBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Moderate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    Hard: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function ScoreBar({ score, rank }: { score: number; rank: number }) {
  const colors = ['bg-yellow-400', 'bg-muted-foreground/40', 'bg-amber-700/70'];
  const color = colors[rank] ?? 'bg-emerald-500/50';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-[10px] text-muted-foreground w-6 text-right">{score}</span>
    </div>
  );
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 0) return <span className="text-sm">🥇</span>;
  if (rank === 1) return <span className="text-sm">🥈</span>;
  if (rank === 2) return <span className="text-sm">🥉</span>;
  return <span className="text-xs text-muted-foreground font-bold">#{rank + 1}</span>;
}

function CarResultCard({ car, score, rank, country }: { car: CarData; score: number; rank: number; country: CarCountry }) {
  const [open, setOpen] = useState(false);
  const price = localPriceRange(car.basePriceUSD, country);

  return (
    <div className={`rounded-2xl border overflow-hidden transition-all ${rank === 0 ? 'border-yellow-500/40 bg-yellow-500/5' : 'border-border bg-card'}`}>
      {/* Card header */}
      <div className="flex gap-0 sm:gap-3">
        {/* Car image */}
        <div className="w-28 sm:w-36 flex-shrink-0 overflow-hidden bg-muted">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='100' viewBox='0 0 140 100'%3E%3Crect width='140' height='100' fill='%23e5e7eb'/%3E%3C/svg%3E";
            }}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <RankBadge rank={rank} />
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{car.brand}</p>
                {car.isElectric && <Zap className="h-3 w-3 text-blue-500" />}
              </div>
              <p className="text-base sm:text-lg font-black text-foreground leading-tight" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {car.model}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-muted-foreground">Match</p>
              <p className={`text-xl font-black leading-none ${rank === 0 ? 'text-yellow-500' : 'text-muted-foreground'}`}
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {score}
              </p>
            </div>
          </div>

          <ScoreBar score={score} rank={rank} />

          {/* Key stats row */}
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Fuel className="h-3 w-3 text-muted-foreground/50" />
              <span>{car.isElectric ? 'Electric' : `${car.fuelConsumption} L/100km`}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpDown className="h-3 w-3 text-muted-foreground/50" />
              <span>{car.groundClearance}mm</span>
            </div>
            <div className="flex items-center gap-1">
              <Wrench className="h-3 w-3 text-muted-foreground/50" />
              <MaintenanceBadge val={car.maintenanceCost} />
            </div>
            <div className="flex items-center gap-1">
              <Package className="h-3 w-3 text-muted-foreground/50" />
              <PartsBadge val={car.spareParts} />
            </div>
          </div>

          {/* Price */}
          <p className="text-xs text-muted-foreground mt-2">
            <span className="text-foreground font-semibold">
              {formatCarPrice(price.min, country)} – {formatCarPrice(price.max, country)}
            </span>
            {' '}<span className="text-muted-foreground/70">est. in {country.name}</span>
          </p>
        </div>
      </div>

      {/* Expandable detail */}
      <div className="border-t border-border">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
        >
          <span>{open ? 'Hide details' : 'View details — issues & watch out'}</span>
          <ChevronRight className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-90' : ''}`} />
        </button>
        {open && (
          <div className="px-4 pb-4 space-y-2">
            <div className="text-xs text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">Common issues: </span>
              {car.commonIssues}
            </div>
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5 text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
              <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-amber-500" />
              <span>{car.watchOut}</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {car.seats} seats · {car.bodyType} · {car.isElectric ? 'Electric Motor' : `${(car.engineCC / 1000).toFixed(1)}L ${car.fuelType}`} · {car.transmission}
              {car.bootSpace > 0 ? ` · ${car.bootSpace}L boot` : ''}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function BestCarForClient() {
  const [countryCode, setCountryCode] = useState('ng');
  const [selected, setSelected] = useState<UseCaseTag | null>(null);

  const country = useMemo(() => getCarCountry(countryCode), [countryCode]);

  const results = useMemo(() => {
    if (!selected) return [];
    return CARS
      .map((car) => ({ car, score: scoreCarForUseCase(car, selected) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  }, [selected]);

  const meta = selected ? USE_CASE_META[selected] : null;

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Country selector */}
        <CountrySelector value={countryCode} onChange={setCountryCode} />

        {/* Use case selector */}
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-3">What do you need the car for?</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {USE_CASE_TAGS.map((tag) => {
              const m = USE_CASE_META[tag];
              const isActive = selected === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelected(isActive ? null : tag)}
                  className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-3 text-left transition-all
                    ${isActive
                      ? 'bg-emerald-500/10 border-emerald-500/40 text-foreground'
                      : 'bg-card border-border text-muted-foreground hover:border-emerald-500/30 hover:text-foreground'
                    }`}
                >
                  <span className="text-lg leading-none">{m.icon}</span>
                  <span className="text-xs font-bold leading-tight">{m.label}</span>
                  <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">{m.priorities}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scoring info for selected use case */}
        {meta && (
          <div className="flex items-start gap-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl px-4 py-3">
            <span className="text-xl leading-none mt-0.5">{meta.icon}</span>
            <div>
              <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">{meta.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{meta.description}</p>
              <p className="text-[10px] text-muted-foreground/70 mt-1">Ranked by: {meta.priorities}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
              Top {results.length} Recommendations — {country.name}
            </p>
            {results.map(({ car, score }, i) => (
              <CarResultCard key={car.id} car={car} score={score} rank={i} country={country} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!selected && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-3xl mb-3">🚗</p>
            <p className="text-sm text-muted-foreground">Select a use case above to see recommendations</p>
          </div>
        )}
      </div>
    </div>
  );
}
