/**
 * Verified road distances for Vietnam, in kilometres.
 *
 * Intentionally empty. Authoritative or two-source-confirmed road
 * distances for Vietnam could not be obtained to the standard
 * used elsewhere in this tool family (at least two independent sources
 * per route), and available web sources were mostly travel blogs or
 * low-quality content. Rather than mark unverified numbers as verified,
 * every route falls back to the Haversine-based estimate in
 * distance-engine.ts and is labelled "estimated" by the widget. Add
 * pairs here only once each has been cross-checked against two
 * independent sources.
 */

export const VN_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {};
