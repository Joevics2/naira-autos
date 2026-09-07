/**
 * Verified road distances for Qatar, in kilometres. Doha-Al Khor
 * (33km) comes from Ashghal's (Qatar's Public Works Authority) own
 * announcement of the Al Khor Coastal Road's official length.
 * Doha-Al Ruwais (127km) is a Wikipedia-sourced figure. Because
 * Qatar is small (under 200km end to end), even the Haversine-based
 * estimate in distance-engine.ts for unverified routes tends to be
 * fairly close to the real road distance here - unlike in a large
 * country, a short, thin verified list matters less. Every page
 * should call getDistance()/computeDistance() from distance-engine.ts
 * rather than reading this object directly.
 */

export const QA_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Al Khor": { "Doha": 33 },
  "Al Ruwais": { "Doha": 127 },
  "Doha": { "Al Khor": 33, "Al Ruwais": 127 },
};
