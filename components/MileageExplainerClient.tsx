'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import {
  RefreshCw, Info, AlertTriangle, Globe2,
} from 'lucide-react';
import {
  haversineKm, kmToMiles, milesToKm, computeMileageResult,
} from '@/lib/mileage-engine';
import { citiesForCountry, availableCountries, type MileageCity } from '@/lib/mileage-cities';
import { flagEmoji } from '@/lib/country-meta';
import type { MileageBenchmark } from '@/lib/mileage-benchmarks';
import MileageShareCard, { hookLine, mainSentence, supportingSentence, type ShareCardData } from '@/components/MileageShareCard';

type Unit = 'km' | 'mi';

interface Props {
  /** null/undefined = global mode (no local benchmark, no vehicle-age flag) */
  countryName?: string;
  defaultUnit: Unit;
  cities: MileageCity[];
  defaultFromName: string;
  defaultToName: string;
  avgAnnualMileageKm?: number;
  avgAnnualMileageNote?: string;
  vehicleCheckHref?: string;
  /** When true, shows a country picker above From/To. Picking a country
   *  filters cities to that country and resets From/To to its top two
   *  cities; picking "All" reverts to the base `cities`/default props.
   *  Used by the global hub page — dedicated country pages leave this off. */
  enableCountrySelect?: boolean;
  /** Per-country benchmark lookup — only read while enableCountrySelect
   *  is on and a specific country is picked. */
  benchmarks?: Record<string, MileageBenchmark>;
  /** For a page already dedicated to one country (e.g. Nigeria), pass its
   *  code so the picker's default option reads as that country instead of
   *  a misleading "All/Mixed", and so that country isn't listed twice. */
  lockedCountryCode?: string;
}

function fmt(n: number, digits = 0) { return n.toLocaleString('en-US', { maximumFractionDigits: digits }); }
function unitLabel(u: Unit) { return u === 'km' ? 'km' : 'miles'; }

export default function MileageExplainerClient({
  countryName, defaultUnit, cities, defaultFromName, defaultToName,
  avgAnnualMileageKm, avgAnnualMileageNote, vehicleCheckHref,
  enableCountrySelect, benchmarks, lockedCountryCode,
}: Props) {
  const [unit, setUnit] = useState<Unit>(defaultUnit);
  const [mileageInput, setMileageInput] = useState('100000');
  const [fromCity, setFromCity] = useState(defaultFromName);
  const [toCity, setToCity] = useState(defaultToName);
  const [vehicleAge, setVehicleAge] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  const allCountries = useMemo(() => (enableCountrySelect ? availableCountries() : []), [enableCountrySelect]);
  // Exclude the locked country from the pick-a-different-country list —
  // it's already covered by the default option, no need to list it twice.
  const countries = useMemo(
    () => (lockedCountryCode ? allCountries.filter((c) => c.code !== lockedCountryCode) : allCountries),
    [allCountries, lockedCountryCode]
  );
  const baseOptionLabel = lockedCountryCode
    ? `${flagEmoji(lockedCountryCode)} ${countryName ?? allCountries.find((c) => c.code === lockedCountryCode)?.name ?? 'Default'} (default)`
    : '🌍 All / Mixed';

  const effectiveCities = useMemo(() => {
    if (enableCountrySelect && selectedCountry !== 'all') return citiesForCountry(selectedCountry);
    return cities;
  }, [enableCountrySelect, selectedCountry, cities]);

  // When the country picker changes, jump From/To to that country's top
  // two cities (e.g. Nigeria → Lagos/Abuja) instead of leaving stale
  // selections from a different country in place.
  useEffect(() => {
    if (!enableCountrySelect) return;
    if (selectedCountry === 'all') {
      setFromCity(defaultFromName);
      setToCity(defaultToName);
    } else {
      const list = citiesForCountry(selectedCountry);
      if (list[0]) setFromCity(list[0].name);
      if (list[1]) setToCity(list[1].name);
    }
    // defaultFromName/defaultToName are stable per-page constants, not
    // reactive state — only selectedCountry should retrigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry, enableCountrySelect]);

  const effectiveAvgAnnualMileageKm = enableCountrySelect && selectedCountry !== 'all'
    ? benchmarks?.[selectedCountry]?.avgAnnualMileageKm
    : avgAnnualMileageKm;
  const effectiveAvgAnnualMileageNote = enableCountrySelect && selectedCountry !== 'all'
    ? benchmarks?.[selectedCountry]?.note
    : avgAnnualMileageNote;
  const effectiveCountryName = enableCountrySelect && selectedCountry !== 'all'
    ? countries.find((c) => c.code === selectedCountry)?.name
    : countryName;

  const from = effectiveCities.find((c) => c.name === fromCity) ?? effectiveCities[0];
  const to = effectiveCities.find((c) => c.name === toCity) ?? effectiveCities[1] ?? effectiveCities[0];

  const swapCities = useCallback(() => { setFromCity(to.name); setToCity(from.name); }, [from, to]);

  const result = useMemo(() => {
    const mileage = parseFloat(mileageInput) || 0;
    if (mileage <= 0 || !from || !to) return null;
    const mileageKm = unit === 'km' ? mileage : milesToKm(mileage);
    const distanceKm = haversineKm(from.lat, from.lng, to.lat, to.lng);
    const avgKm = effectiveAvgAnnualMileageKm ?? 0;
    const r = computeMileageResult(mileageKm, distanceKm, avgKm);

    let flag: 'low' | 'high' | null = null;
    const age = parseFloat(vehicleAge);
    if (avgKm > 0 && age > 0) {
      const expected = avgKm * age;
      const ratio = mileageKm / expected;
      if (ratio < 0.5) flag = 'low';
      else if (ratio > 2) flag = 'high';
    }

    return { ...r, distanceUnit: unit === 'km' ? distanceKm : kmToMiles(distanceKm), flag };
  }, [mileageInput, unit, from, to, effectiveAvgAnnualMileageKm, vehicleAge]);

  const shareCardData: ShareCardData | null = useMemo(() => {
    if (!result || !from || !to) return null;
    return {
      mileage: parseFloat(mileageInput) || 0,
      unit,
      fromCity: from.name,
      toCity: to.name,
      fromCountryCode: from.countryCode,
      toCountryCode: to.countryCode,
      roundTrips: result.roundTrips,
      earthLaps: result.earthLaps,
      moonTrips: result.moonTrips,
      drivingDays: result.drivingDays,
    };
  }, [result, from, to, mileageInput, unit]);

  const hook = shareCardData ? hookLine(shareCardData) : '';
  const mainLine = shareCardData ? mainSentence(shareCardData) : '';
  const supportLine = shareCardData ? supportingSentence(shareCardData) : '';

  const iCls = 'w-full h-11 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 transition-all';

  return (
    <div className="bg-background" id="mileage-explainer">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Inputs ── */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Odometer Reading</label>
              <div className="flex gap-2">
                <input type="number" value={mileageInput} onChange={(e) => setMileageInput(e.target.value)} className={iCls} />
                <div className="flex flex-shrink-0 rounded-xl border border-border overflow-hidden">
                  {(['km', 'mi'] as Unit[]).map((u) => (
                    <button key={u} onClick={() => setUnit(u)}
                      className={`px-3.5 h-11 text-xs font-bold uppercase transition-all ${unit === u ? 'bg-emerald-500 text-white' : 'bg-card text-muted-foreground hover:text-foreground'}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {enableCountrySelect && (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">
                  <Globe2 className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                  Country
                </label>
                <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className={iCls}>
                  <option value="all">{baseOptionLabel}</option>
                  {countries.map((c) => (
                    <option key={c.code} value={c.code}>{flagEmoji(c.code)} {c.name}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-end">
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">From</label>
                <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} className={iCls}>
                  {effectiveCities.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <button onClick={swapCities} aria-label="Swap cities"
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-card hover:border-emerald-500/50 text-muted-foreground hover:text-foreground transition-all">
                <RefreshCw className="h-4 w-4" />
              </button>
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">To</label>
                <select value={toCity} onChange={(e) => setToCity(e.target.value)} className={iCls}>
                  {effectiveCities.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            {effectiveAvgAnnualMileageKm ? (
              <div>
                <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5">Vehicle Age (optional)</label>
                <input type="number" value={vehicleAge} onChange={(e) => setVehicleAge(e.target.value)} placeholder="e.g. 5 (years)" className={iCls} />
                <p className="text-[11px] text-muted-foreground mt-1">Add this to check if the mileage looks typical for the car&apos;s age.</p>
              </div>
            ) : null}

            <div className="flex items-start gap-2 text-[11px] text-muted-foreground bg-muted/20 rounded-xl p-3">
              <Info className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
              <p>Distances are straight-line (&ldquo;as the crow flies&rdquo;), not driving-route distance — real road distance is typically 10–25% longer. This tool is for scale and intuition, not a route planner.</p>
            </div>
          </div>

          {/* ── Results ── */}
          <div className="lg:col-span-3 space-y-4">
            {result && from && to ? (
              <>
                <div className="bg-card border border-border rounded-2xl p-6">
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide mb-3">Result</p>
                  <p className="text-lg font-black text-foreground mb-2">{hook}</p>
                  <p className="text-xl sm:text-2xl font-bold text-foreground leading-snug mb-2">
                    {mainLine}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{supportLine}</p>

                  <p className="text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
                    In numbers: {fmt(result.oneWayTrips, 1)} one-way trips ({fmt(result.distanceUnit)} {unitLabel(unit)} each way, straight-line) · {fmt(result.earthLaps, 1)} Earth laps · {fmt(result.moonTrips, 2)} Moon trips · {effectiveAvgAnnualMileageKm ? `${fmt(result.yearsAtAverage, 1)} years at typical local use` : `${fmt(result.drivingHours)} hours behind the wheel`}.
                  </p>

                  {result.flag && (
                    <div className={`flex items-start gap-2 rounded-xl p-3 mb-4 border ${
                      result.flag === 'low' ? 'bg-red-50 dark:bg-red-500/10 border-red-200 dark:border-red-500/20' : 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20'
                    }`}>
                      <AlertTriangle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${result.flag === 'low' ? 'text-red-500' : 'text-amber-500'}`} />
                      <p className={`text-xs ${result.flag === 'low' ? 'text-red-700 dark:text-red-300' : 'text-amber-700 dark:text-amber-300'}`}>
                        {result.flag === 'low'
                          ? <>This is well below the typical mileage for a car this age in {effectiveCountryName ?? 'this market'}. Unusually low mileage can be genuine (highway-driven, garage-kept) — but it&apos;s also a common odometer-rollback pattern, so it&apos;s worth verifying.</>
                          : <>This is well above the typical mileage for a car this age in {effectiveCountryName ?? 'this market'} — not necessarily a problem, but worth factoring into wear-and-tear expectations and price negotiation.</>}
                        {vehicleCheckHref && <> <a href={vehicleCheckHref} className="underline font-semibold">Check the VIN history →</a></>}
                      </p>
                    </div>
                  )}

                  {effectiveAvgAnnualMileageNote && (
                    <p className="text-[11px] text-muted-foreground">{effectiveAvgAnnualMileageNote}</p>
                  )}
                </div>

                <MileageShareCard data={shareCardData} />
              </>
            ) : (
              <div className="bg-card border border-border rounded-2xl p-8 text-center text-sm text-muted-foreground">
                Enter an odometer reading to see what it actually means.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
