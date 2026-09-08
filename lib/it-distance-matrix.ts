/**
 * Verified road distances for Italy, in kilometres.
 * 4 pairs, all anchored on Milan: Milan-Naples (757km, averaged from two independent sources both citing the official A1 Autostrada del Sole) plus Milan-Turin, Milan-Bologna, and Milan-Genoa from a single detailed source each. Rome-Milan was deliberately left unverified after finding the same source (Auto Europe) cite two contradictory figures - 476km on one page, 571km on another - for what should be the same route.
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const IT_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Bologna": { "Milan": 219 },
  "Genoa": { "Milan": 145 },
  "Milan": { "Naples": 757, "Turin": 141, "Bologna": 219, "Genoa": 145 },
  "Naples": { "Milan": 757 },
  "Turin": { "Milan": 141 },
};
