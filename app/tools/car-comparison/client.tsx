'use client';

import { useState, useMemo } from 'react';
import { ChevronDown, ArrowLeftRight, CheckCircle2, XCircle, Minus } from 'lucide-react';
import { CARS, formatNaira, type CarData } from '../cars-data';

// ─── Types ────────────────────────────────────────────────────────────────────

type Winner = 'left' | 'right' | 'tie';

interface CompareRow {
  label: string;
  leftVal: string;
  rightVal: string;
  winner: Winner;
  note?: string;
}

// ─── Scoring helpers ──────────────────────────────────────────────────────────

const MAINT_ORDER = { Low: 4, Medium: 3, High: 2, 'Very High': 1 } as const;
const PARTS_ORDER = { Easy: 3, Moderate: 2, Hard: 1 } as const;

function winner(leftScore: number, rightScore: number): Winner {
  if (leftScore > rightScore) return 'left';
  if (rightScore > leftScore) return 'right';
  return 'tie';
}

function buildRows(a: CarData, b: CarData): CompareRow[] {
  return [
    {
      label: 'Price Range (Nigeria)',
      leftVal: `${formatNaira(a.priceRangeMin)} – ${formatNaira(a.priceRangeMax)}`,
      rightVal: `${formatNaira(b.priceRangeMin)} – ${formatNaira(b.priceRangeMax)}`,
      winner: winner(b.priceRangeMin, a.priceRangeMin), // lower price = better
      note: 'Nigerian used car market range. Actual price depends on year, condition, and location.',
    },
    {
      label: 'Body Type',
      leftVal: a.bodyType,
      rightVal: b.bodyType,
      winner: 'tie',
    },
    {
      label: 'Seats',
      leftVal: `${a.seats}`,
      rightVal: `${b.seats}`,
      winner: winner(a.seats, b.seats),
    },
    {
      label: 'Engine Size',
      leftVal: `${(a.engineCC / 1000).toFixed(1)}L`,
      rightVal: `${(b.engineCC / 1000).toFixed(1)}L`,
      winner: 'tie',
      note: 'Larger engine = more power but higher fuel cost and often higher maintenance.',
    },
    {
      label: 'Fuel Type',
      leftVal: a.fuelType,
      rightVal: b.fuelType,
      winner: 'tie',
    },
    {
      label: 'Transmission',
      leftVal: a.transmission,
      rightVal: b.transmission,
      winner: 'tie',
    },
    {
      label: 'Fuel Consumption',
      leftVal: `${a.fuelConsumption} L/100km`,
      rightVal: `${b.fuelConsumption} L/100km`,
      winner: winner(b.fuelConsumption, a.fuelConsumption), // lower = better
      note: 'Combined manufacturer figure. Real-world Nigerian driving adds ~20–30%.',
    },
    {
      label: 'Ground Clearance',
      leftVal: `${a.groundClearance}mm`,
      rightVal: `${b.groundClearance}mm`,
      winner: winner(a.groundClearance, b.groundClearance), // higher = better for Nigeria
      note: '180mm+ recommended for Nigerian roads. Below 150mm struggles on rough terrain.',
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
      winner: winner(MAINT_ORDER[a.maintenanceCost], MAINT_ORDER[b.maintenanceCost]),
      note: 'Annual Nigerian market cost of routine servicing (oil, filters, brake pads, plugs).',
    },
    {
      label: 'Spare Parts (Nigeria)',
      leftVal: a.spareParts,
      rightVal: b.spareParts,
      winner: winner(PARTS_ORDER[a.spareParts], PARTS_ORDER[b.spareParts]),
      note: 'How easy it is to find parts at Ladipo-type markets across Nigeria.',
    },
    {
      label: 'Known Issues',
      leftVal: a.commonIssues,
      rightVal: b.commonIssues,
      winner: 'tie',
    },
  ];
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function CarSelector({
  value,
  onChange,
  exclude,
  side,
}: {
  value: string;
  onChange: (id: string) => void;
  exclude: string;
  side: 'left' | 'right';
}) {
  const color = side === 'left' ? 'blue' : 'emerald';
  const filtered = CARS.filter((c) => c.id !== exclude);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-white/[0.04] border rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-white/90 focus:outline-none transition-all cursor-pointer
          ${side === 'left'
            ? 'border-blue-500/30 focus:border-blue-500/60 focus:bg-blue-500/5'
            : 'border-emerald-500/30 focus:border-emerald-500/60 focus:bg-emerald-500/5'
          }`}
      >
        <option value="" disabled className="bg-[#0D1117] text-white/40">
          Select a car...
        </option>
        {filtered.map((c) => (
          <option key={c.id} value={c.id} className="bg-[#0D1117] text-white/90">
            {c.brand} {c.model}
          </option>
        ))}
      </select>
      <ChevronDown
        className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none
          ${side === 'left' ? 'text-blue-400' : 'text-emerald-400'}`}
      />
    </div>
  );
}

function WinnerIcon({ w, side }: { w: Winner; side: 'left' | 'right' }) {
  if (w === 'tie') return <Minus className="h-3.5 w-3.5 text-white/20" />;
  if (w === side) return <CheckCircle2 className={`h-3.5 w-3.5 ${side === 'left' ? 'text-blue-400' : 'text-emerald-400'}`} />;
  return <XCircle className="h-3.5 w-3.5 text-white/15" />;
}

function MaintenanceBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Low: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    Medium: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    High: 'bg-orange-500/15 text-orange-400 border-orange-500/20',
    'Very High': 'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? 'bg-white/5 text-white/50 border-white/10'}`}>
      {val}
    </span>
  );
}

function PartsBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Easy: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    Moderate: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    Hard: 'bg-red-500/15 text-red-400 border-red-500/20',
  };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? 'bg-white/5 text-white/50 border-white/10'}`}>
      {val}
    </span>
  );
}

function CarCard({ car, side }: { car: CarData; side: 'left' | 'right' }) {
  const borderColor = side === 'left' ? 'border-blue-500/30' : 'border-emerald-500/30';
  const bgColor = side === 'left' ? 'bg-blue-500/5' : 'bg-emerald-500/5';

  return (
    <div className={`rounded-2xl border ${borderColor} ${bgColor} overflow-hidden`}>
      {car.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-white/5">
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
        <p className="text-xs text-white/40 font-semibold uppercase tracking-widest mb-0.5">{car.brand}</p>
        <p className="text-lg font-black text-white leading-tight" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
          {car.model}
        </p>
        <p className="text-xs text-white/40 mt-1">{car.bodyType} · {car.seats} seats · {car.fuelType}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CarComparisonClient() {
  const [leftId, setLeftId] = useState<string>('toyota-camry-02-06');
  const [rightId, setRightId] = useState<string>('honda-accord-03-07');

  const leftCar = useMemo(() => CARS.find((c) => c.id === leftId) ?? null, [leftId]);
  const rightCar = useMemo(() => CARS.find((c) => c.id === rightId) ?? null, [rightId]);

  const rows = useMemo(
    () => (leftCar && rightCar ? buildRows(leftCar, rightCar) : []),
    [leftCar, rightCar]
  );

  const leftWins = rows.filter((r) => r.winner === 'left').length;
  const rightWins = rows.filter((r) => r.winner === 'right').length;

  function swap() {
    setLeftId(rightId);
    setRightId(leftId);
  }

  return (
    <div className="space-y-6">

      {/* Selectors */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <CarSelector value={leftId} onChange={setLeftId} exclude={rightId} side="left" />
        <button
          onClick={swap}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white/40 hover:text-white/70 transition-all"
          aria-label="Swap cars"
          title="Swap"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>
        <CarSelector value={rightId} onChange={setRightId} exclude={leftId} side="right" />
      </div>

      {/* Car cards */}
      {leftCar && rightCar && (
        <>
          <div className="grid grid-cols-2 gap-3">
            <CarCard car={leftCar} side="left" />
            <CarCard car={rightCar} side="right" />
          </div>

          {/* Score bar */}
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
            <div className="text-center min-w-[3rem]">
              <p className="text-2xl font-black text-blue-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {leftWins}
              </p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest leading-tight">wins</p>
            </div>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${(leftWins / (leftWins + rightWins || 1)) * 100}%` }}
              />
            </div>
            <div className="text-center min-w-[3rem]">
              <p className="text-2xl font-black text-emerald-400" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {rightWins}
              </p>
              <p className="text-[10px] text-white/30 uppercase tracking-widest leading-tight">wins</p>
            </div>
          </div>

          {/* Comparison table */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <div className="divide-y divide-white/5">
              {rows.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1fr_auto_1fr] gap-2 items-start px-4 py-3 transition-colors
                    ${i % 2 === 0 ? 'bg-white/[0.015]' : 'bg-transparent'}`}
                >
                  {/* Left value */}
                  <div className="flex items-start gap-1.5">
                    <WinnerIcon w={row.winner} side="left" />
                    <div className="min-w-0">
                      {row.label === 'Maintenance Cost' ? (
                        <MaintenanceBadge val={row.leftVal} />
                      ) : row.label === 'Spare Parts (Nigeria)' ? (
                        <PartsBadge val={row.leftVal} />
                      ) : (
                        <p className={`text-sm leading-snug break-words ${row.winner === 'left' ? 'text-blue-300 font-semibold' : 'text-white/60'}`}>
                          {row.leftVal}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Centre label */}
                  <div className="text-center px-2 min-w-[7rem]">
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider leading-tight whitespace-normal text-center">
                      {row.label}
                    </p>
                  </div>

                  {/* Right value */}
                  <div className="flex items-start gap-1.5 justify-end">
                    <div className="min-w-0 text-right">
                      {row.label === 'Maintenance Cost' ? (
                        <MaintenanceBadge val={row.rightVal} />
                      ) : row.label === 'Spare Parts (Nigeria)' ? (
                        <PartsBadge val={row.rightVal} />
                      ) : (
                        <p className={`text-sm leading-snug break-words ${row.winner === 'right' ? 'text-emerald-300 font-semibold' : 'text-white/60'}`}>
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

          {/* Watch out boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { car: leftCar, side: 'left' as const },
              { car: rightCar, side: 'right' as const },
            ].map(({ car, side }) => (
              <div
                key={car.id}
                className={`rounded-xl border p-4 text-sm
                  ${side === 'left'
                    ? 'bg-blue-500/5 border-blue-500/20'
                    : 'bg-emerald-500/5 border-emerald-500/20'
                  }`}
              >
                <p className={`text-xs font-black uppercase tracking-widest mb-1.5 ${side === 'left' ? 'text-blue-400' : 'text-emerald-400'}`}>
                  ⚠ {car.brand} {car.model} — Watch Out
                </p>
                <p className="text-white/50 text-xs leading-relaxed">{car.watchOut}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}