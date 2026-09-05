'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowLeftRight, CheckCircle2, XCircle, Minus, Globe2, Zap } from 'lucide-react';
import { CARS, maintenanceScore, sparePartsScore, isAvailableInCountry, AFRICA_CODES as AFRICA_ONLY_CODES, type CarData } from '../cars-data';
import { CAR_COUNTRIES, getCarCountry, localPriceRange, formatCarPrice, FX_SNAPSHOT_DATE, type CarCountry } from '@/lib/car-country-pricing';

// ─── Types ────────────────────────────────────────────────────────────────────

type Winner = 'left' | 'right' | 'tie';

interface CompareRow {
  label: string;
  leftVal: string;
  rightVal: string;
  winner: Winner;
  note?: string;
}

function winner(leftScore: number, rightScore: number): Winner {
  if (leftScore > rightScore) return 'left';
  if (rightScore > leftScore) return 'right';
  return 'tie';
}

function buildRows(a: CarData, b: CarData, country: CarCountry): CompareRow[] {
  const priceA = localPriceRange(a.basePriceUSD, country);
  const priceB = localPriceRange(b.basePriceUSD, country);

  const rows: CompareRow[] = [
    {
      label: `Est. Price (${country.name})`,
      leftVal: `${formatCarPrice(priceA.min, country)} – ${formatCarPrice(priceA.max, country)}`,
      rightVal: `${formatCarPrice(priceB.min, country)} – ${formatCarPrice(priceB.max, country)}`,
      winner: winner(priceB.min, priceA.min), // lower price = better
      note: `Approximate — base USD price × ${country.name}'s typical import duty/tax multiplier × exchange rate (FX snapshot ${FX_SNAPSHOT_DATE}). Actual price depends on trim, year, and local dealer margin.`,
    },
    { label: 'Segment', leftVal: a.segment, rightVal: b.segment, winner: 'tie' },
    { label: 'Body Type', leftVal: a.bodyType, rightVal: b.bodyType, winner: 'tie' },
    { label: 'Seats', leftVal: `${a.seats}`, rightVal: `${b.seats}`, winner: winner(a.seats, b.seats) },
    {
      label: 'Engine',
      leftVal: a.isElectric ? 'Electric Motor' : `${(a.engineCC / 1000).toFixed(1)}L`,
      rightVal: b.isElectric ? 'Electric Motor' : `${(b.engineCC / 1000).toFixed(1)}L`,
      winner: 'tie',
      note: 'Larger engines mean more power but usually higher fuel cost and maintenance.',
    },
    { label: 'Fuel Type', leftVal: a.fuelType, rightVal: b.fuelType, winner: 'tie' },
    { label: 'Transmission', leftVal: a.transmission, rightVal: b.transmission, winner: 'tie' },
    {
      label: 'Fuel Consumption',
      leftVal: a.isElectric ? 'Electric — no fuel cost' : `${a.fuelConsumption} L/100km`,
      rightVal: b.isElectric ? 'Electric — no fuel cost' : `${b.fuelConsumption} L/100km`,
      winner: a.isElectric && b.isElectric ? 'tie' : a.isElectric ? 'left' : b.isElectric ? 'right' : winner(b.fuelConsumption, a.fuelConsumption),
      note: 'Combined manufacturer figure. Real-world city driving typically adds 15–30%.',
    },
    {
      label: 'Ground Clearance',
      leftVal: `${a.groundClearance}mm`,
      rightVal: `${b.groundClearance}mm`,
      winner: winner(a.groundClearance, b.groundClearance),
      note: '180mm+ is recommended for rough or unpaved roads (including most Nigerian roads). Below 150mm can struggle on speed bumps and potholes.',
    },
    ...(a.bootSpace > 0 || b.bootSpace > 0
      ? [{
          label: 'Boot Space',
          leftVal: a.bootSpace > 0 ? `${a.bootSpace}L` : 'Pickup bed',
          rightVal: b.bootSpace > 0 ? `${b.bootSpace}L` : 'Pickup bed',
          winner: winner(a.bootSpace, b.bootSpace) as Winner,
        }]
      : []),
    {
      label: 'Maintenance Cost',
      leftVal: a.maintenanceCost,
      rightVal: b.maintenanceCost,
      winner: winner(maintenanceScore(a.maintenanceCost), maintenanceScore(b.maintenanceCost)),
      note: 'Relative cost of routine servicing (oil, filters, brake pads, plugs) — actual currency cost varies by country.',
    },
    {
      label: 'Spare Parts Availability',
      leftVal: a.spareParts,
      rightVal: b.spareParts,
      winner: winner(sparePartsScore(a.spareParts), sparePartsScore(b.spareParts)),
      note: `How easy parts typically are to find — Toyota/Honda lead in most markets including Nigeria's Ladipo-style auto parts hubs; exotic and low-volume brands are Hard almost everywhere.`,
    },
    { label: 'Known Issues', leftVal: a.commonIssues, rightVal: b.commonIssues, winner: 'tie' },
  ];

  return rows;
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function CountrySelector({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
        <Globe2 className="h-3 w-3" /> Country &amp; Currency
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
      >
        {CAR_COUNTRIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.flag} {c.name} — {c.currency}
          </option>
        ))}
      </select>
    </div>
  );
}

function CarSelector({
  value,
  onChange,
  exclude,
  side,
  cars,
}: {
  value: string;
  onChange: (id: string) => void;
  exclude: string;
  side: 'left' | 'right';
  cars: CarData[];
}) {
  const filtered = cars.filter((c) => c.id !== exclude);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-background border rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none transition-all cursor-pointer
          ${side === 'left'
            ? 'border-blue-500/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20'
            : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
          }`}
      >
        <option value="" disabled>Select a car...</option>
        {filtered.map((c) => (
          <option key={c.id} value={c.id}>{c.brand} {c.model}</option>
        ))}
      </select>
      <ChevronDown
        className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none
          ${side === 'left' ? 'text-blue-500' : 'text-emerald-500'}`}
      />
    </div>
  );
}

function WinnerIcon({ w, side }: { w: Winner; side: 'left' | 'right' }) {
  if (w === 'tie') return <Minus className="h-3.5 w-3.5 text-muted-foreground/30" />;
  if (w === side) return <CheckCircle2 className={`h-3.5 w-3.5 ${side === 'left' ? 'text-blue-500' : 'text-emerald-500'}`} />;
  return <XCircle className="h-3.5 w-3.5 text-muted-foreground/20" />;
}

function MaintenanceBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    High: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25',
    'Very High': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function PartsBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Easy: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Moderate: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    Hard: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function CarCard({ car, side, country }: { car: CarData; side: 'left' | 'right'; country: CarCountry }) {
  const border = side === 'left' ? 'border-blue-500/30' : 'border-emerald-500/30';
  const bg = side === 'left' ? 'bg-blue-500/5' : 'bg-emerald-500/5';
  const price = localPriceRange(car.basePriceUSD, country);

  return (
    <div className={`rounded-2xl border ${border} ${bg} overflow-hidden`}>
      {car.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">{car.brand}</p>
          {car.isElectric && <Zap className="h-3 w-3 text-blue-500" />}
        </div>
        <p className="text-lg font-black text-foreground leading-tight" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
          {car.model}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{car.bodyType} · {car.seats} seats · {car.segment}</p>
        <p className="text-sm font-bold text-foreground mt-2">
          {formatCarPrice(price.min, country)} – {formatCarPrice(price.max, country)}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CarComparisonClient() {
  const [countryCode, setCountryCode] = useState('ng');
  const [leftId, setLeftId] = useState<string>('toyota-camry');
  const [rightId, setRightId] = useState<string>('honda-crv');

  const country = useMemo(() => getCarCountry(countryCode), [countryCode]);
  const availableCars = useMemo(() => CARS.filter((c) => isAvailableInCountry(c, countryCode)), [countryCode]);

  // If switching country hides the currently selected car (e.g. an
  // Africa-only used import while a non-African country is now selected),
  // fall back to the first two available cars so the tool never shows a
  // car that isn't valid for the selected market.
  useEffect(() => {
    const ids = availableCars.map((c) => c.id);
    if (!ids.includes(leftId)) setLeftId(ids[0] ?? '');
    if (!ids.includes(rightId)) setRightId(ids.find((id) => id !== leftId) ?? ids[1] ?? '');
  }, [availableCars]); // eslint-disable-line react-hooks/exhaustive-deps

  const leftCar = useMemo(() => availableCars.find((c) => c.id === leftId) ?? null, [availableCars, leftId]);
  const rightCar = useMemo(() => availableCars.find((c) => c.id === rightId) ?? null, [availableCars, rightId]);

  const rows = useMemo(
    () => (leftCar && rightCar ? buildRows(leftCar, rightCar, country) : []),
    [leftCar, rightCar, country]
  );

  const leftWins = rows.filter((r) => r.winner === 'left').length;
  const rightWins = rows.filter((r) => r.winner === 'right').length;

  function swap() {
    setLeftId(rightId);
    setRightId(leftId);
  }

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Country selector */}
        <div className="max-w-sm">
          <CountrySelector value={countryCode} onChange={setCountryCode} />
          {AFRICA_ONLY_CODES.includes(countryCode) && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Includes older, secondhand import-market models specific to this region, alongside the 50 global models.
            </p>
          )}
        </div>

        {/* Car selectors */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <CarSelector value={leftId} onChange={setLeftId} exclude={rightId} side="left" cars={availableCars} />
          <button
            onClick={swap}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Swap cars"
            title="Swap"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <CarSelector value={rightId} onChange={setRightId} exclude={leftId} side="right" cars={availableCars} />
        </div>

        {/* Car cards */}
        {leftCar && rightCar && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <CarCard car={leftCar} side="left" country={country} />
              <CarCard car={rightCar} side="right" country={country} />
            </div>

            {/* Score bar */}
            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
              <div className="text-center min-w-[3rem]">
                <p className="text-2xl font-black text-blue-500" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{leftWins}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">wins</p>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(leftWins / (leftWins + rightWins || 1)) * 100}%` }}
                />
              </div>
              <div className="text-center min-w-[3rem]">
                <p className="text-2xl font-black text-emerald-500" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rightWins}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">wins</p>
              </div>
            </div>

            {/* Comparison table */}
            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="divide-y divide-border">
                {rows.map((row, i) => (
                  <div
                    key={row.label}
                    className={`grid grid-cols-[1fr_auto_1fr] gap-2 items-start px-4 py-3 transition-colors ${i % 2 === 0 ? 'bg-card/50' : 'bg-transparent'}`}
                  >
                    <div className="flex items-start gap-1.5">
                      <WinnerIcon w={row.winner} side="left" />
                      <div className="min-w-0">
                        {row.label === 'Maintenance Cost' ? (
                          <MaintenanceBadge val={row.leftVal} />
                        ) : row.label === 'Spare Parts Availability' ? (
                          <PartsBadge val={row.leftVal} />
                        ) : (
                          <p className={`text-sm leading-snug break-words ${row.winner === 'left' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-muted-foreground'}`}>
                            {row.leftVal}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-center px-2 min-w-[7rem]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-tight whitespace-normal text-center">
                        {row.label}
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5 justify-end">
                      <div className="min-w-0 text-right">
                        {row.label === 'Maintenance Cost' ? (
                          <MaintenanceBadge val={row.rightVal} />
                        ) : row.label === 'Spare Parts Availability' ? (
                          <PartsBadge val={row.rightVal} />
                        ) : (
                          <p className={`text-sm leading-snug break-words ${row.winner === 'right' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                            {row.rightVal}
                          </p>
                        )}
                      </div>
                      <WinnerIcon w={row.winner} side="right" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-1.5">
              {rows.filter((r) => r.note).map((r) => (
                <p key={r.label} className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">{r.label}:</span> {r.note}
                </p>
              ))}
            </div>

            {/* Watch out boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[{ car: leftCar, side: 'left' as const }, { car: rightCar, side: 'right' as const }].map(({ car, side }) => (
                <div
                  key={car.id}
                  className={`rounded-xl border p-4 text-sm ${side === 'left' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}
                >
                  <p className={`text-xs font-black uppercase tracking-widest mb-1.5 ${side === 'left' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    ⚠ {car.brand} {car.model} — Watch Out
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{car.watchOut}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
