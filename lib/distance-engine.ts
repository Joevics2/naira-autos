/**
 * Shared math for the Distance Calculator tool family. Deliberately has no
 * Nigeria-specific data in it — every country's page imports the same
 * functions and passes in its own town list + verified-distance matrix, so
 * this logic never has to be re-verified per country, only the data around
 * it (see lib/distance-towns-ng.ts + lib/ng-distance-matrix.ts for Nigeria).
 */

export const KM_PER_MILE = 1.609344;
export function kmToMiles(km: number): number { return km / KM_PER_MILE; }

/** Great-circle ("as the crow flies") distance between two coordinates, in km. */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Road-distance correction factor applied to a straight-line distance when
 * no verified route exists. Calibrated against Nigeria's verified 37x37
 * state-capital matrix (real road km ÷ haversine km across all 1,332 pairs):
 * the ratio holds fairly steady at 1.3–1.5 regardless of distance band, with
 * short hops (<50km) slightly lower since local roads are more direct.
 * Every result computed this way is always labelled "estimated," never
 * presented as verified — see DistanceResult.verified below.
 */
export function estimateRoadKm(haversine: number): number {
  if (haversine < 50) return haversine * 1.25;
  if (haversine < 150) return haversine * 1.38;
  if (haversine < 400) return haversine * 1.42;
  if (haversine < 800) return haversine * 1.45;
  return haversine * 1.35;
}

export interface DistanceResult {
  roadKm: number;
  straightLineKm: number;
  /** True only when both towns are in the country's verified matrix. */
  verified: boolean;
}

export function computeDistance(
  from: { name: string; lat: number; lng: number },
  to: { name: string; lat: number; lng: number },
  verifiedMatrix?: Record<string, Record<string, number>>,
): DistanceResult {
  const straightLineKm = haversineKm(from.lat, from.lng, to.lat, to.lng);
  const verifiedKm = verifiedMatrix?.[from.name]?.[to.name];
  if (typeof verifiedKm === 'number') {
    return { roadKm: verifiedKm, straightLineKm, verified: true };
  }
  return { roadKm: estimateRoadKm(straightLineKm), straightLineKm, verified: false };
}

/**
 * Average driving speed assumptions. "Ideal" is what a distance/time
 * calculator would show if a road matched its posted speed limit the whole
 * way. "Realistic" bakes in what your own research doc calls out — traffic,
 * checkpoints, and rough sections routinely double the ideal time on
 * Nigerian federal highways (e.g. Lagos–Abuja "should" take ~8hrs but
 * routinely takes 12–16+). Every UI showing drive time should show both,
 * never just the ideal figure alone.
 */
export const IDEAL_AVG_SPEED_KMH = 75;
export const REALISTIC_AVG_SPEED_KMH = 48;

export interface DriveTimeEstimate {
  idealHours: number;
  realisticHours: number;
}

export function estimateDriveTime(roadKm: number): DriveTimeEstimate {
  return {
    idealHours: roadKm / IDEAL_AVG_SPEED_KMH,
    realisticHours: roadKm / REALISTIC_AVG_SPEED_KMH,
  };
}

export function formatHours(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

export interface FuelCostEstimate {
  litres: number;
  cost: number;
}

/** litresPer100km: vehicle fuel consumption. pricePerLitre: current pump price. */
export function estimateFuelCost(roadKm: number, litresPer100km: number, pricePerLitre: number): FuelCostEstimate {
  const litres = (roadKm / 100) * litresPer100km;
  return { litres, cost: litres * pricePerLitre };
}

/** Nearest N towns to `origin` from `pool`, by road-distance estimate, for a
 *  "distances from here" table. Excludes the origin itself. */
export function nearestTowns<T extends { name: string; lat: number; lng: number }>(
  origin: T,
  pool: T[],
  n: number,
  verifiedMatrix?: Record<string, Record<string, number>>,
): Array<T & { distance: DistanceResult }> {
  return pool
    .filter((t) => t.name !== origin.name)
    .map((t) => ({ ...t, distance: computeDistance(origin, t, verifiedMatrix) }))
    .sort((a, b) => a.distance.roadKm - b.distance.roadKm)
    .slice(0, n);
}
