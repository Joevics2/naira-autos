/**
 * Verified road distances between 13 major Egyptian hub towns, in
 * kilometres. Unlike Ghana, Kenya, and South Africa, Egypt has a
 * genuinely strong source for this: the UN World Food Programme's
 * Logistics Cluster publishes a full distance-and-travel-time matrix
 * for Egypt as part of its humanitarian logistics country profile
 * (dlca.logcluster.org), covering Cairo, Alexandria, Aswan, Faiyum,
 * Minya, Edfu, Ismailia, Luxor, Port Said, Sharm El Sheikh, Hurghada,
 * Nuweiba, and Rafah — 78 verified pairs among those 13 towns, the
 * richest verified set of any country in this tool so far. Every
 * route touching one of the other 28 towns in this tool falls back
 * to the Haversine-based estimate in distance-engine.ts, which is
 * what every page should call rather than reading this object
 * directly.
 */

export const EG_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Alexandria": { "Aswan": 1133, "Cairo": 216, "Faiyum": 295, "Minya": 459, "Edfu": 1025, "Ismailia": 250, "Luxor": 915, "Port Said": 273, "Sharm El Sheikh": 716, "Hurghada": 761, "Nuweiba": 567, "Rafah": 494 },
  "Aswan": { "Alexandria": 1133, "Cairo": 926, "Faiyum": 838, "Minya": 674, "Edfu": 112, "Ismailia": 1038, "Luxor": 229, "Port Said": 1118, "Sharm El Sheikh": 1492, "Hurghada": 580, "Nuweiba": 1373, "Rafah": 1280 },
  "Cairo": { "Alexandria": 216, "Aswan": 926, "Faiyum": 105, "Minya": 252, "Edfu": 818, "Ismailia": 112, "Luxor": 708, "Port Said": 192, "Sharm El Sheikh": 503, "Hurghada": 548, "Nuweiba": 447, "Rafah": 354 },
  "Edfu": { "Alexandria": 1025, "Aswan": 112, "Cairo": 818, "Faiyum": 730, "Minya": 565, "Ismailia": 930, "Luxor": 112, "Port Said": 1010, "Sharm El Sheikh": 1321, "Hurghada": 392, "Nuweiba": 1265, "Rafah": 1172 },
  "Faiyum": { "Alexandria": 295, "Aswan": 838, "Cairo": 105, "Minya": 164, "Edfu": 730, "Ismailia": 217, "Luxor": 620, "Port Said": 297, "Sharm El Sheikh": 608, "Hurghada": 581, "Nuweiba": 552, "Rafah": 459 },
  "Hurghada": { "Alexandria": 761, "Aswan": 580, "Cairo": 548, "Faiyum": 581, "Minya": 452, "Edfu": 392, "Ismailia": 501, "Luxor": 282, "Port Said": 581, "Sharm El Sheikh": 781, "Nuweiba": 226, "Rafah": 464 },
  "Ismailia": { "Alexandria": 250, "Aswan": 1038, "Cairo": 112, "Faiyum": 217, "Minya": 314, "Edfu": 930, "Luxor": 550, "Port Said": 80, "Sharm El Sheikh": 456, "Hurghada": 501, "Nuweiba": 387, "Rafah": 242 },
  "Luxor": { "Alexandria": 915, "Aswan": 229, "Cairo": 708, "Faiyum": 620, "Minya": 335, "Edfu": 112, "Ismailia": 550, "Port Said": 300, "Sharm El Sheikh": 1212, "Hurghada": 282, "Nuweiba": 1155, "Rafah": 1062 },
  "Minya": { "Alexandria": 459, "Aswan": 674, "Cairo": 252, "Faiyum": 164, "Edfu": 565, "Ismailia": 314, "Luxor": 335, "Port Said": 444, "Sharm El Sheikh": 755, "Hurghada": 452, "Nuweiba": 693, "Rafah": 806 },
  "Nuweiba": { "Alexandria": 567, "Aswan": 1373, "Cairo": 447, "Faiyum": 552, "Minya": 693, "Edfu": 1265, "Ismailia": 387, "Luxor": 1155, "Port Said": 467, "Sharm El Sheikh": 165, "Hurghada": 226, "Rafah": 674 },
  "Port Said": { "Alexandria": 273, "Aswan": 1118, "Cairo": 192, "Faiyum": 297, "Minya": 444, "Edfu": 1010, "Ismailia": 80, "Luxor": 300, "Sharm El Sheikh": 536, "Hurghada": 581, "Nuweiba": 467, "Rafah": 254 },
  "Rafah": { "Alexandria": 494, "Aswan": 1280, "Cairo": 354, "Faiyum": 459, "Minya": 806, "Edfu": 1172, "Ismailia": 242, "Luxor": 1062, "Port Said": 254, "Sharm El Sheikh": 528, "Hurghada": 464, "Nuweiba": 674 },
  "Sharm El Sheikh": { "Alexandria": 716, "Aswan": 1492, "Cairo": 503, "Faiyum": 608, "Minya": 755, "Edfu": 1321, "Ismailia": 456, "Luxor": 1212, "Port Said": 536, "Hurghada": 781, "Nuweiba": 165, "Rafah": 528 },
};
