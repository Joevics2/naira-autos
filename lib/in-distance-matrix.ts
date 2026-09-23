/**
 * Verified road distances for India, in kilometres. Sourced from
 * the National Highways Authority of India's (NHAI) Golden
 * Quadrilateral - the four official highway segments connecting
 * Delhi, Mumbai, Chennai, and Kolkata (NH-16, NH-19/44, NH-48),
 * completed in 2001 and still the country's primary highway
 * backbone. A fifth pair, Bengaluru-Chennai, uses the newer NHAI
 * Bengaluru-Chennai Expressway's official length. Every other
 * route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const IN_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Bengaluru": { "Chennai": 258 },
  "Chennai": { "Kolkata": 1684, "Mumbai": 1290, "Bengaluru": 258 },
  "Delhi": { "Kolkata": 1453, "Mumbai": 1419 },
  "Kolkata": { "Chennai": 1684, "Delhi": 1453 },
  "Mumbai": { "Delhi": 1419, "Chennai": 1290 },
};
