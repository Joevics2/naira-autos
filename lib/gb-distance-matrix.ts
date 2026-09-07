/**
 * Verified road distances for the UK, in kilometres (converted from
 * miles). No UK government body (National Highways, Transport
 * Scotland, DfT) publishes a public town-to-town road distance
 * matrix, and searching surfaced real inconsistencies between
 * otherwise-reputable sources for several routes (one car-rental
 * site's London-Birmingham 'road distance via the M40' undershoots
 * every other citation for that route by roughly 20%, likely
 * conflating it with a straight-line figure) - that pair is
 * deliberately left out rather than guessing which source is right.
 * The 6 pairs below are ones where at least two independent
 * sources converge on the same named-motorway road distance:
 * London-Manchester (M6, 200mi), London-Edinburgh (400mi),
 * London-Bristol (120mi), London-Glasgow (415mi), Edinburgh-
 * Glasgow (M8, 50mi), and Edinburgh-Bristol (M6, 502km, a single
 * detailed car-rental-guide source). Every other route falls back
 * to the Haversine-based estimate in distance-engine.ts, which is
 * what every page should call rather than reading this object
 * directly.
 */

export const GB_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Bristol": { "London": 193, "Edinburgh": 502 },
  "Edinburgh": { "London": 644, "Glasgow": 80, "Bristol": 502 },
  "Glasgow": { "London": 668, "Edinburgh": 80 },
  "London": { "Manchester": 322, "Edinburgh": 644, "Bristol": 193, "Glasgow": 668 },
  "Manchester": { "London": 322 },
};
