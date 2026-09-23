/**
 * Verified road distances for Japan, in kilometres. No single
 * government body publishes a city-to-city matrix, but Japan's
 * expressways are individually documented in exact detail on
 * Wikipedia/AARoads: the Tomei Expressway (Tokyo-Nagoya, official
 * length 346.8km) and the Meishin Expressway (Nagoya-Kobe, official
 * length 193.9km). Tokyo-Osaka (505km) is cross-checked across
 * three independent modern travel sources agreeing within 1.5% of
 * each other. Every other route falls back to the Haversine-based
 * estimate in distance-engine.ts, which is what every page should
 * call rather than reading this object directly.
 */

export const JP_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Kobe": { "Nagoya": 194 },
  "Nagoya": { "Tokyo": 347, "Kobe": 194 },
  "Osaka": { "Tokyo": 505 },
  "Tokyo": { "Nagoya": 347, "Osaka": 505 },
};
