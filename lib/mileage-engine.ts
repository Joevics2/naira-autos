/**
 * Shared math for the Mileage Explainer tool family. This file has no
 * country-specific data in it on purpose — every country page and the
 * global hub page import the same functions, so the underlying math never
 * has to be re-verified per country, only the local content around it.
 */

export const EARTH_CIRCUMFERENCE_KM = 40075;
export const MOON_DISTANCE_KM = 384400; // average Earth–Moon distance
export const KM_PER_MILE = 1.609344;

/** Great-circle ("as the crow flies") distance between two coordinates, in km.
 *  This is NOT driving-route distance — real road distance is typically
 *  10–25% longer. Every page using this must disclose that. */
export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius, km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function kmToMiles(km: number): number { return km / KM_PER_MILE; }
export function milesToKm(mi: number): number { return mi * KM_PER_MILE; }

export interface MileageResult {
  mileageKm: number;
  distanceKm: number;
  oneWayTrips: number;
  roundTrips: number;
  earthLaps: number;
  moonTrips: number;
  drivingHours: number;
  drivingDays: number;
  yearsAtAverage: number;
}

/** Assumed average combined city/highway driving speed, km/h — used only
 *  for the "hours behind the wheel" framing, not for any legal/financial figure. */
const ASSUMED_AVG_SPEED_KMH = 55;

export function computeMileageResult(mileageKm: number, distanceKm: number, avgAnnualMileageKm: number): MileageResult {
  const oneWayTrips = distanceKm > 0 ? mileageKm / distanceKm : 0;
  return {
    mileageKm,
    distanceKm,
    oneWayTrips,
    roundTrips: oneWayTrips / 2,
    earthLaps: mileageKm / EARTH_CIRCUMFERENCE_KM,
    moonTrips: mileageKm / MOON_DISTANCE_KM,
    drivingHours: mileageKm / ASSUMED_AVG_SPEED_KMH,
    drivingDays: mileageKm / ASSUMED_AVG_SPEED_KMH / 24,
    yearsAtAverage: avgAnnualMileageKm > 0 ? mileageKm / avgAnnualMileageKm : 0,
  };
}
