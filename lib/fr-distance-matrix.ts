/**
 * Verified road distances for France, in kilometres.
 * 4 pairs: Lyon-Marseille and Bordeaux-Toulouse are official Wikipedia autoroute (A7, A62) lengths; Paris-Lyon and Paris-Strasbourg are cross-checked across independent driving-distance sources (France has no single official government city-to-city matrix).
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const FR_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Bordeaux": { "Toulouse": 231 },
  "Lyon": { "Paris": 460, "Marseille": 306 },
  "Marseille": { "Lyon": 306 },
  "Paris": { "Lyon": 460, "Strasbourg": 487 },
  "Strasbourg": { "Paris": 487 },
  "Toulouse": { "Bordeaux": 231 },
};
