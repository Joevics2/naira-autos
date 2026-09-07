/**
 * Verified road distances for the UAE, in kilometres. The UAE's
 * official government portal (u.ae) names the country's major
 * highways (E11, E311, E611, E66, etc.) but doesn't publish a
 * town-to-town distance chart. These 3 pairs are real routing
 * distances cross-checked across independent car-rental and
 * relocation-guide sources rather than a single official matrix:
 * Abu Dhabi-Dubai (139km), Dubai-Al Ain (146km, corroborated by two
 * independent sources even though Wikipedia's E66 highway-segment
 * length alone is a shorter 127.7km - probably because the highway
 * measurement excludes urban approach roads), and the short, well-
 * known Dubai-Sharjah hop (28km). Every other route falls back to
 * the Haversine-based estimate in distance-engine.ts, which is what
 * every page should call rather than reading this object directly.
 */

export const AE_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Abu Dhabi": { "Dubai": 139 },
  "Al Ain": { "Dubai": 146 },
  "Dubai": { "Abu Dhabi": 139, "Al Ain": 146, "Sharjah": 28 },
  "Sharjah": { "Dubai": 28 },
};
