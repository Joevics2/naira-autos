'use client';

import { useState, useMemo } from 'react';
import { ChevronRight, Info, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type CoverType = 'third_party' | 'third_party_fire_theft' | 'comprehensive';
type VehicleUse  = 'private' | 'commercial' | 'staff_bus' | 'tricycle' | 'motorcycle';

interface CoverOption {
  id: CoverType;
  label: string;
  tagline: string;
  coversOwn: boolean;
  coversFire: boolean;
  coversTheft: boolean;
  coversFlood: boolean;
}

const COVER_OPTIONS: CoverOption[] = [
  {
    id: 'third_party',
    label: 'Third Party Only',
    tagline: 'Legal minimum — covers damage you cause to others',
    coversOwn: false,
    coversFire: false,
    coversTheft: false,
    coversFlood: false,
  },
  {
    id: 'third_party_fire_theft',
    label: 'Third Party, Fire & Theft',
    tagline: 'Middle ground — adds fire and theft protection',
    coversOwn: false,
    coversFire: true,
    coversTheft: true,
    coversFlood: false,
  },
  {
    id: 'comprehensive',
    label: 'Comprehensive',
    tagline: 'Full protection — includes your own vehicle',
    coversOwn: true,
    coversFire: true,
    coversTheft: true,
    coversFlood: true,
  },
];

const VEHICLE_USES: { id: VehicleUse; label: string }[] = [
  { id: 'private',    label: 'Private Car' },
  { id: 'commercial', label: 'Commercial / Taxi' },
  { id: 'staff_bus',  label: 'Staff Bus' },
  { id: 'tricycle',   label: 'Tricycle (Keke)' },
  { id: 'motorcycle', label: 'Motorcycle (Okada)' },
];

// ─── Premium calculation ──────────────────────────────────────────────────────

interface PremiumResult {
  low: number;
  high: number;
  fixed: boolean; // true for third party (no range, just fixed)
  tppdLimit: number;
  breakdown: string[];
}

function calcPremium(
  coverType: CoverType,
  vehicleUse: VehicleUse,
  carValueNaira: number,
): PremiumResult {
  // Third party fixed rates by vehicle use
  if (coverType === 'third_party') {
    const rateMap: Record<VehicleUse, { premium: number; tppd: number }> = {
      private:    { premium: 15000,  tppd: 3_000_000 },
      commercial: { premium: 20000,  tppd: 3_000_000 },
      staff_bus:  { premium: 20000,  tppd: 3_000_000 },
      tricycle:   { premium: 5000,   tppd: 2_000_000 },
      motorcycle: { premium: 3000,   tppd: 1_000_000 },
    };
    const r = rateMap[vehicleUse];
    return {
      low: r.premium,
      high: r.premium,
      fixed: true,
      tppdLimit: r.tppd,
      breakdown: [
        `NAICOM-regulated fixed rate for ${vehicleUse === 'private' ? 'private vehicles' : vehicleUse}`,
        `Third party property damage (TPPD) limit: ₦${r.tppd.toLocaleString()}`,
        'Does NOT cover your own vehicle — only damage to others',
        'Rate effective January 1, 2023',
      ],
    };
  }

  // Third party fire & theft — typically 1.5–3% of vehicle value + TP base
  if (coverType === 'third_party_fire_theft') {
    const base = vehicleUse === 'private' ? 15000 : vehicleUse === 'motorcycle' ? 3000 : vehicleUse === 'tricycle' ? 5000 : 20000;
    const lowRate = 0.015;
    const highRate = 0.03;
    const tppd = vehicleUse === 'motorcycle' ? 1_000_000 : vehicleUse === 'tricycle' ? 2_000_000 : 3_000_000;
    const low = Math.max(base + carValueNaira * lowRate, base + 30000);
    const high = base + carValueNaira * highRate;
    return {
      low: Math.round(low),
      high: Math.round(high),
      fixed: false,
      tppdLimit: tppd,
      breakdown: [
        `Base TP rate + 1.5–3% of vehicle value (₦${carValueNaira.toLocaleString()})`,
        'Covers: fire damage and vehicle theft — NOT accident damage to your car',
        `TPPD limit: ₦${tppd.toLocaleString()}`,
        'Rate varies by insurer — get at least 2 quotes',
      ],
    };
  }

  // Comprehensive — NAICOM minimum 5%, market range 5–7%
  const lowRate = 0.05;
  const highRate = 0.07;
  const tppd = vehicleUse === 'motorcycle' ? 1_000_000 : vehicleUse === 'tricycle' ? 2_000_000 : 3_000_000;
  return {
    low: Math.round(carValueNaira * lowRate),
    high: Math.round(carValueNaira * highRate),
    fixed: false,
    tppdLimit: tppd,
    breakdown: [
      `5–7% of car value (₦${carValueNaira.toLocaleString()}) per NAICOM guidelines`,
      'Covers: accident damage, theft, fire, flood, vandalism',
      `TPPD limit: ₦${tppd.toLocaleString()}`,
      'Flood cover — verify it is included in your specific policy',
      'Towing typically covered up to ₦50,000–₦100,000',
    ],
  };
}

function formatNaira(n: number): string {
  if (n >= 1_000_000) return `₦${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `₦${(n / 1_000).toFixed(0)}k`;
  return `₦${n.toLocaleString()}`;
}

// ─── Coverage comparison table ────────────────────────────────────────────────

function CoverBadge({ yes }: { yes: boolean }) {
  return yes
    ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    : <XCircle className="h-4 w-4 text-gray-300" />;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function InsuranceQuoteClient() {
  const [coverType, setCoverType]       = useState<CoverType>('comprehensive');
  const [vehicleUse, setVehicleUse]     = useState<VehicleUse>('private');
  const [carValue, setCarValue]         = useState<string>('5000000');
  const [showCoverage, setShowCoverage] = useState(false);

  const carValueNum = useMemo(() => {
    const n = parseInt(carValue.replace(/,/g, ''), 10);
    return isNaN(n) || n < 100_000 ? 0 : n;
  }, [carValue]);

  const result = useMemo(() => {
    if (carValueNum === 0 && coverType !== 'third_party') return null;
    return calcPremium(coverType, vehicleUse, carValueNum || 5_000_000);
  }, [coverType, vehicleUse, carValueNum]);

  const needsValue = coverType !== 'third_party';

  return (
    <div className="space-y-5">

      {/* Step 1 — Cover type */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">1. Coverage Type</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {COVER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setCoverType(opt.id)}
              className={`flex flex-col items-start gap-1 rounded-xl border px-3 py-3 text-left transition-all
                ${coverType === opt.id
                  ? 'bg-violet-500/15 border-violet-500/40 text-white'
                  : 'bg-white/[0.03] border-white/8 text-white/50 hover:bg-white/[0.06] hover:border-white/15 hover:text-white/80'
                }`}
            >
              <span className="text-xs font-black leading-tight">{opt.label}</span>
              <span className="text-[10px] text-white/30 leading-tight">{opt.tagline}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Step 2 — Vehicle use */}
      <div>
        <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">2. Vehicle Type</p>
        <div className="flex flex-wrap gap-2">
          {VEHICLE_USES.map((v) => (
            <button
              key={v.id}
              onClick={() => setVehicleUse(v.id)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all
                ${vehicleUse === v.id
                  ? 'bg-violet-500/15 border-violet-500/40 text-violet-300'
                  : 'bg-white/[0.03] border-white/8 text-white/40 hover:border-white/20 hover:text-white/60'
                }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 3 — Car value (only for non-TP) */}
      {needsValue && (
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest font-bold mb-2">3. Car Value (Naira)</p>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-white/30 font-bold">₦</span>
            <input
              type="number"
              value={carValue}
              onChange={(e) => setCarValue(e.target.value)}
              placeholder="5000000"
              min="100000"
              step="100000"
              className="w-full bg-white/[0.04] border border-violet-500/25 focus:border-violet-500/50 rounded-xl px-4 py-3 pl-8 text-sm text-white/90 placeholder-white/20 focus:outline-none transition-all"
            />
          </div>
          <p className="text-[10px] text-white/25 mt-1">Current market value of your car. Use our AI Valuation tool if unsure.</p>
        </div>
      )}

      {/* Result */}
      {result && (carValueNum > 0 || !needsValue) && (
        <div className="rounded-2xl border border-violet-500/25 bg-violet-500/8 p-5 space-y-4">
          {/* Premium estimate */}
          <div>
            <p className="text-xs text-violet-300/60 uppercase tracking-widest font-bold mb-1">Estimated Annual Premium</p>
            {result.fixed ? (
              <p className="text-4xl font-black text-violet-200" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {formatNaira(result.low)}
                <span className="text-lg text-violet-300/50 font-normal ml-2">/ year (fixed)</span>
              </p>
            ) : (
              <p className="text-4xl font-black text-violet-200" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                {formatNaira(result.low)} — {formatNaira(result.high)}
                <span className="text-lg text-violet-300/50 font-normal ml-2">/ year</span>
              </p>
            )}
            <p className="text-xs text-violet-300/40 mt-1">
              {result.fixed
                ? 'NAICOM-regulated fixed rate — same across all licensed insurers'
                : 'Estimate based on NAICOM guidelines — final premium depends on insurer and car specifics'}
            </p>
          </div>

          {/* Monthly breakdown */}
          {!result.fixed && (
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white/5 rounded-xl px-3 py-2.5">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Monthly (low)</p>
                <p className="text-lg font-black text-white/80" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  {formatNaira(Math.round(result.low / 12))}
                </p>
              </div>
              <div className="bg-white/5 rounded-xl px-3 py-2.5">
                <p className="text-[10px] text-white/30 uppercase tracking-wider">Monthly (high)</p>
                <p className="text-lg font-black text-white/80" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  {formatNaira(Math.round(result.high / 12))}
                </p>
              </div>
            </div>
          )}

          {/* Breakdown points */}
          <div className="space-y-1.5">
            {result.breakdown.map((line) => (
              <div key={line} className="flex items-start gap-2 text-xs text-violet-200/50">
                <Info className="h-3 w-3 mt-0.5 flex-shrink-0 text-violet-400/40" />
                <span>{line}</span>
              </div>
            ))}
          </div>

          {/* Coverage toggle */}
          <div>
            <button
              onClick={() => setShowCoverage(!showCoverage)}
              className="text-xs text-violet-400/70 hover:text-violet-400 flex items-center gap-1 transition-colors"
            >
              <ChevronRight className={`h-3.5 w-3.5 transition-transform ${showCoverage ? 'rotate-90' : ''}`} />
              {showCoverage ? 'Hide' : 'Show'} coverage comparison
            </button>
            {showCoverage && (
              <div className="mt-3 rounded-xl border border-white/8 overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/8">
                      <th className="text-left px-3 py-2 text-white/40 font-bold">What&apos;s Covered</th>
                      <th className="text-center px-3 py-2 text-white/40 font-bold">TP Only</th>
                      <th className="text-center px-3 py-2 text-white/40 font-bold">TP Fire & Theft</th>
                      <th className="text-center px-3 py-2 text-white/40 font-bold">Comprehensive</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { label: 'Damage to others (TPPD)',          tp: true,  tpft: true,  comp: true  },
                      { label: 'Bodily injury to others',          tp: true,  tpft: true,  comp: true  },
                      { label: 'Your car — fire damage',           tp: false, tpft: true,  comp: true  },
                      { label: 'Your car — theft',                 tp: false, tpft: true,  comp: true  },
                      { label: 'Your car — accident damage',       tp: false, tpft: false, comp: true  },
                      { label: 'Your car — flood damage',          tp: false, tpft: false, comp: true  },
                      { label: 'Your car — vandalism',             tp: false, tpft: false, comp: true  },
                      { label: 'Towing & roadside assistance',     tp: false, tpft: false, comp: true  },
                      { label: 'Personal accident (driver)',       tp: false, tpft: false, comp: true  },
                    ].map(({ label, tp, tpft, comp }) => (
                      <tr key={label} className="bg-transparent hover:bg-white/[0.02]">
                        <td className="px-3 py-2 text-white/50">{label}</td>
                        <td className="px-3 py-2 text-center"><CoverBadge yes={tp} /></td>
                        <td className="px-3 py-2 text-center"><CoverBadge yes={tpft} /></td>
                        <td className="px-3 py-2 text-center"><CoverBadge yes={comp} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="pt-1">
            <p className="text-xs text-violet-300/40 mb-2">Get an exact quote from a NAICOM-licensed insurer:</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'Leadway', url: 'https://www.leadway.com/motor-insurance' },
                { name: 'AIICO',   url: 'https://www.aiicoplc.com/motor-insurance' },
                { name: 'AXA Mansard', url: 'https://www.axamansard.com/personal/motor' },
              ].map(({ name, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-lg bg-white/8 border border-white/10 hover:bg-white/15 text-white/60 hover:text-white transition-all"
                >
                  {name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty state for comprehensive with no value entered */}
      {needsValue && carValueNum === 0 && (
        <div className="flex flex-col items-center justify-center py-8 text-center bg-white/[0.02] border border-white/5 rounded-2xl">
          <p className="text-2xl mb-2">🛡️</p>
          <p className="text-sm text-white/30">Enter your car's value above to see your premium estimate</p>
        </div>
      )}
    </div>
  );
}