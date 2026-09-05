/**
 * Verified road distances between Ghana's regional capitals, in
 * kilometres. Unlike Nigeria — which has one official UNDP-sourced
 * 37x37 matrix — Ghana has no single published government matrix,
 * so these pairs are individually sourced from real road-routing
 * data (rome2rio driving-route distances) and, for Accra-Sekondi/
 * Takoradi, the official Accra-Takoradi Road Dualisation Project
 * length (185km). Only 15 pairs are verified this way; every other
 * route falls back to the Haversine-based estimate in
 * distance-engine.ts — see getDistance() there, which is what
 * every page should call rather than reading this object directly.
 */

export const GH_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Accra": { "Kumasi": 248, "Cape Coast": 144, "Koforidua": 85, "Ho": 162, "Sunyani": 372, "Techiman": 361, "Goaso": 373, "Damongo": 550, "Wa": 682, "Tamale": 566, "Sekondi-Takoradi": 185 },
  "Bolgatanga": { "Kumasi": 578 },
  "Cape Coast": { "Accra": 144 },
  "Damongo": { "Accra": 550 },
  "Goaso": { "Accra": 373 },
  "Ho": { "Accra": 162, "Sunyani": 441 },
  "Koforidua": { "Accra": 85 },
  "Kumasi": { "Accra": 248, "Tamale": 378, "Sekondi-Takoradi": 291, "Bolgatanga": 578 },
  "Sekondi-Takoradi": { "Accra": 185, "Kumasi": 291 },
  "Sunyani": { "Accra": 372, "Ho": 441 },
  "Tamale": { "Accra": 566, "Kumasi": 378 },
  "Techiman": { "Accra": 361 },
  "Wa": { "Accra": 682 },
};
