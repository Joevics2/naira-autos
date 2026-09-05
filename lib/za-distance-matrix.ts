/**
 * Verified road distances between major South African cities, in
 * kilometres. South Africa has no single official government matrix
 * equivalent to Nigeria's UNDP-sourced chart, and third-party route
 * calculators disagree meaningfully on several long routes (e.g. the
 * commonly-cited driving distance between Durban and Cape Town varies
 * from roughly 1,250km to 1,800km across different sites, depending on
 * whether the N2 coastal route or the N1/N9 inland route is assumed).
 * Rather than picking one of those conflicting figures, this file only
 * includes pairs with a single credible source and no contradicting
 * figure found elsewhere: the SANRAL-maintained N3 highway's official
 * length (Johannesburg-Durban), well-established short hops (Johannesburg-
 * Pretoria), and a handful of others cross-checked against real
 * road-routing data. Every other route — including Durban-Cape Town —
 * falls back to the Haversine-based estimate in distance-engine.ts,
 * which is what every page should call rather than reading this object
 * directly.
 */

export const ZA_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Bloemfontein": { "Mahikeng": 435, "Mbombela": 754, "Polokwane": 727, "Gqeberha": 676 },
  "Cape Town": { "Johannesburg": 1405 },
  "Durban": { "Johannesburg": 578 },
  "Gqeberha": { "Bloemfontein": 676 },
  "Johannesburg": { "Durban": 578, "Pretoria": 58, "Cape Town": 1405 },
  "Mahikeng": { "Bloemfontein": 435 },
  "Mbombela": { "Bloemfontein": 754 },
  "Polokwane": { "Bloemfontein": 727 },
  "Pretoria": { "Johannesburg": 58 },
};
