/**
 * Verified road distances for Netherlands, in kilometres.
 * 4 pairs. Utrecht-Groningen (187km) is the official Rijkswaterstaat A28 motorway length. Amsterdam-Rotterdam, Amsterdam-Eindhoven, and Amsterdam-Utrecht are averaged from two independently-published driving-distance figures each, since the Netherlands' compact motorway network is described in named-road segments rather than clean point-to-point government figures.
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const NL_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Amsterdam": { "Rotterdam": 77, "Eindhoven": 123, "Utrecht": 50 },
  "Eindhoven": { "Amsterdam": 123 },
  "Groningen": { "Utrecht": 187 },
  "Rotterdam": { "Amsterdam": 77 },
  "Utrecht": { "Amsterdam": 50, "Groningen": 187 },
};
