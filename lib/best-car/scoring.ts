// lib/best-car/scoring.ts
//
// Single source of truth for the "Best Car For…" ranking, shared by the
// interactive client AND the server-rendered SEO blocks. Previously this
// logic lived (duplicated) inside each language's client.tsx, and the static
// "Best cars by use case" lists on the pages were hand-typed, so they could
// drift away from what the tool actually ranks. Now the static lists are
// computed from the same function.

import {
  CARS,
  maintenanceScore,
  sparePartsScore,
  isAvailableInCountry,
  type CarData,
  type UseCaseTag,
} from '@/app/tools/cars-data';

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

/**
 * Score a car for a use case. Returns 0–100 (higher = better match).
 * Uses the car's base USD price so rankings are identical in every country —
 * only the displayed price changes with the selected country.
 *
 * Every component is normalised to 0–1 and the weights of each use case sum
 * to 100, so scores can no longer saturate at the 100 ceiling (previously
 * five cars tied at 100 for "fuel efficient", and EVs scored *below* a 6 L/100km
 * petrol car because they were given a fixed fuel value of 12.5).
 *
 * Changes vs. the original formula (documented so rankings can be audited):
 *  - fuel: EV = 1.0; otherwise linear from 14 L/100km (0) to 5 L/100km (1).
 *  - family / highway: cars with fewer than 4 seats are excluded (a 2-seat
 *    roadster was ranking #5 for highway).
 *  - family: adds an affordability term so a 3-row luxury SUV doesn't win by
 *    seat count alone.
 *  - executive: engine size was 40% of the score, which made a Mustang rank
 *    #2. It now weighs prestige (base price as a proxy for brand/cabin level)
 *    the most, with engine size and running-cost terms alongside it.
 */
export function scoreCarForUseCase(car: CarData, tag: UseCaseTag): number {
  if (!car.bestFor.includes(tag)) return 0;
  if ((tag === 'family' || tag === 'highway') && car.seats < 4) return 0;

  const maint = maintenanceScore(car.maintenanceCost) / 4;
  const parts = sparePartsScore(car.spareParts) / 3;
  const fuel = car.isElectric ? 1 : clamp01((14 - car.fuelConsumption) / 9);
  const ground = clamp01(car.groundClearance / 300);
  const cheap = clamp01(1 - car.basePriceUSD.min / 200_000);
  const prestige = clamp01(car.basePriceUSD.min / 100_000);
  const seats = car.seats / 9;
  const boot = clamp01(car.bootSpace / 800);

  let score = 0;
  switch (tag) {
    case 'family':
      score = seats * 25 + boot * 15 + maint * 20 + parts * 20 + cheap * 20;
      break;
    case 'commercial':
      score = maint * 35 + parts * 35 + fuel * 20 + (car.seats >= 5 ? 10 : 5);
      break;
    case 'highway':
      score = clamp01(car.engineCC / 3500) * 25 + fuel * 25 + maint * 20 + parts * 15 + prestige * 15;
      break;
    case 'budget':
      score = cheap * 40 + maint * 35 + parts * 25;
      break;
    case 'offroad':
      score = ground * 50 + maint * 25 + parts * 25;
      break;
    case 'executive':
      score = prestige * 35 + clamp01(car.engineCC / 4000) * 15 + maint * 25 + parts * 15 + seats * 10;
      break;
    case 'firstcar':
      score = maint * 40 + parts * 40 + cheap * 20;
      break;
    case 'fuelefficient':
      score = fuel * 60 + maint * 20 + parts * 20;
      break;
    default:
      score = maint * 34 + parts * 33 + fuel * 33;
  }
  return Math.round(Math.min(score, 100));
}

export interface ScoredCar {
  car: CarData;
  score: number;
}

/** Ranked list for a use case in a given country (already filtered for availability). */
export function rankCars(tag: UseCaseTag, countryCode: string, limit = 5): ScoredCar[] {
  return CARS.filter((car) => isAvailableInCountry(car, countryCode))
    .map((car) => ({ car, score: scoreCarForUseCase(car, tag) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
