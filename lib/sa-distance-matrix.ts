/**
 * Verified road distances between major Saudi Arabian cities, in
 * kilometres. Sourced from Saudi Arabia's Ministry of Transport and
 * Logistic Services, via Saudipedia's list of the Kingdom's 8 major
 * named controlled-access highways and their official lengths -
 * covering the busiest corridors: Riyadh-Makkah (via Ta'if), Riyadh-
 * Dammam, Riyadh-Buraydah, the Hejaz cluster (Makkah-Madinah, Jeddah-
 * Madinah, Buraydah-Madinah), and the short Makkah-Jeddah and Makkah-
 * Ta'if hops. Every other route falls back to the Haversine-based
 * estimate in distance-engine.ts, which is what every page should
 * call rather than reading this object directly.
 */

export const SA_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Buraydah": { "Madinah": 448, "Riyadh": 317 },
  "Dammam": { "Riyadh": 383 },
  "Jeddah": { "Madinah": 410, "Makkah": 70 },
  "Madinah": { "Buraydah": 448, "Makkah": 421, "Jeddah": 410 },
  "Makkah": { "Riyadh": 820, "Madinah": 421, "Jeddah": 70, "Ta'if": 70 },
  "Riyadh": { "Makkah": 820, "Dammam": 383, "Buraydah": 317 },
  "Ta'if": { "Makkah": 70 },
};
