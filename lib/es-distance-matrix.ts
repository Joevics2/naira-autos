/**
 * Verified road distances for Spain, in kilometres.
 * 4 pairs, all official Spanish autovia lengths from Wikipedia (Ministry of Public Works and Transport data): Madrid-Barcelona (A-2, 504km, also matching an independent Auto Europe citation exactly), Madrid-Valencia (A-3, 355km), Madrid-A Coruna (A-6, 590km), and Valencia-Seville (541km, single detailed source).
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const ES_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "A Coru\u00f1a": { "Madrid": 590 },
  "Barcelona": { "Madrid": 504 },
  "Madrid": { "Barcelona": 504, "Valencia": 355, "A Coru\u00f1a": 590 },
  "Seville": { "Valencia": 541 },
  "Valencia": { "Madrid": 355, "Seville": 541 },
};
