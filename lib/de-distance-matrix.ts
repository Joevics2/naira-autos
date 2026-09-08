/**
 * Verified road distances for Germany, in kilometres.
 * 6 pairs cross-checked from a detailed 2026 driving guide (Berlin-Munich via A9, Hamburg-Frankfurt via A7/A5, Berlin-Cologne via A2, Munich-Hamburg, Frankfurt-Dresden via A4) plus Munich-Cologne from an independent car-rental source.
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const DE_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Berlin": { "Munich": 585, "Cologne": 570 },
  "Cologne": { "Berlin": 570, "Munich": 455 },
  "Dresden": { "Frankfurt": 430 },
  "Frankfurt": { "Hamburg": 490, "Dresden": 430 },
  "Hamburg": { "Frankfurt": 490, "Munich": 780 },
  "Munich": { "Berlin": 585, "Hamburg": 780, "Cologne": 455 },
};
