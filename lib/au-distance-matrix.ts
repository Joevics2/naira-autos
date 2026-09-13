/**
 * Verified road distances for Australia, in kilometres. No single
 * government body publishes a town-to-town matrix (highways are
 * state jurisdiction). These 5 pairs are cross-checked across
 * independent, detailed travel-planning sources that measure from
 * each city's CBD and quote both distance and drive time: Melbourne-
 * Sydney (1,045km), Sydney-Brisbane (~918km, averaged from two close
 * sources), Brisbane-Cairns (1,705km), Melbourne-Perth (3,306km,
 * cross-checked twice on the same source), and Sydney-Perth (~3,934km,
 * averaged from two sources agreeing within 2km of each other).
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const AU_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Brisbane": { "Sydney": 918, "Cairns": 1705 },
  "Cairns": { "Brisbane": 1705 },
  "Melbourne": { "Sydney": 1045, "Perth": 3306 },
  "Perth": { "Melbourne": 3306, "Sydney": 3934 },
  "Sydney": { "Melbourne": 1045, "Brisbane": 918, "Perth": 3934 },
};
