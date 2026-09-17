/**
 * Verified road distances for Mexico, in kilometres. No single
 * government body publishes a town-to-town matrix. These 3 pairs -
 * covering the country's central 'golden triangle' - are cross-
 * checked across multiple independent Spanish-language route-
 * planning sources that agree within a few percent of each other:
 * Mexico City-Guadalajara (~540km via the Autopista 15D), Mexico
 * City-Monterrey (~900km), and Guadalajara-Monterrey (~800km, via
 * Zacatecas). Every other route falls back to the Haversine-based
 * estimate in distance-engine.ts, which is what every page should
 * call rather than reading this object directly.
 */

export const MX_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Guadalajara": { "Mexico City": 540, "Monterrey": 800 },
  "Mexico City": { "Guadalajara": 540, "Monterrey": 900 },
  "Monterrey": { "Mexico City": 900, "Guadalajara": 800 },
};
