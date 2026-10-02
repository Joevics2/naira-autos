/**
 * Verified road distances for Indonesia, in kilometres.
 *
 * Deliberately limited to Java routes, since Indonesia is an
 * archipelago and "road distance" between islands isn't meaningful
 * without a ferry crossing (same approach as the Philippines).
 * Each pair below was cross-checked against at least two independent
 * Indonesian publishers:
 *   - Jakarta-Bandung 150km: Auto2000, Moladin, Daihatsu (all ~150km
 *     via Tol Jakarta-Cikampek + Cipularang). Other sources quote
 *     140-166km depending on the start/end point inside each city.
 *   - Jakarta-Surabaya 782km: Auto2000 and OLX via Tol Trans Jawa. The
 *     toll-section length quoted by Jasa Marga/BPJT is ~760km, but that
 *     is gate-to-gate on the toll road, not city-centre to city-centre,
 *     which is why it is lower. Explained on the page itself.
 *   - Surabaya-Malang 97km: toll length 97.09km (BPJT section data,
 *     reported by Auto2000 and Moladin: Surabaya-Gempol 37km +
 *     Gempol-Pandaan 13.61km + Pandaan-Malang 38.48km).
 * Jakarta-Yogyakarta was left OUT: ANTARA (Google Maps) gives ~575km
 * and CNBC Indonesia ~550km, with no resolving authoritative figure.
 *
 * Every other route - including every inter-island pair - falls back
 * to the Haversine-based estimate in distance-engine.ts, which is what
 * every page should call rather than reading this object directly. For
 * inter-island pairs that is a straight-line-derived approximation
 * only, since no road connects them.
 */

export const ID_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Jakarta": { "Bandung": 150, "Surabaya": 782 },
  "Bandung": { "Jakarta": 150 },
  "Surabaya": { "Jakarta": 782, "Malang": 97 },
  "Malang": { "Surabaya": 97 },
};
