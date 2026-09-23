/**
 * Verified road distances for the Philippines, in kilometres.
 * Deliberately limited to same-island (Luzon) routes, since the
 * Philippines is an archipelago and 'road distance' between islands
 * isn't meaningful without a ferry/RORO crossing. Manila-Baguio
 * (246km) comes from a 2026 TRB-verified expressway-toll guide;
 * Manila-Legazpi (460km) is a cross-checked driving-distance figure.
 * Every other route - including every inter-island pair - falls
 * back to the Haversine-based estimate in distance-engine.ts, which
 * is what every page should call rather than reading this object
 * directly. For inter-island pairs that estimate is a straight-line-
 * derived approximation only, since no road actually connects them.
 */

export const PH_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Baguio": { "Manila": 246 },
  "Legazpi": { "Manila": 460 },
  "Manila": { "Baguio": 246, "Legazpi": 460 },
};
