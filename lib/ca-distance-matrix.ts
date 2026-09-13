/**
 * Verified road distances for Canada, in kilometres. No single
 * federal body publishes a town-to-town matrix (highways are largely
 * provincial jurisdiction), but Ontario's Highway 401 - Canada's
 * busiest - has a well-documented official length covering Toronto
 * to Windsor directly (818km). Calgary-Edmonton (Highway 2, 254km)
 * and Quebec City-Montreal (Highway 20, 252km) are similarly direct
 * single-highway pairs. Toronto-Montreal (550km), Toronto-Vancouver
 * (4,439km), and Montreal-Calgary (3,739km) are cross-country figures
 * from a detailed Trans-Canada Highway travel-planning source. Every
 * other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const CA_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Calgary": { "Edmonton": 254, "Montreal": 3739 },
  "Edmonton": { "Calgary": 254 },
  "Montreal": { "Quebec City": 252, "Toronto": 550, "Calgary": 3739 },
  "Quebec City": { "Montreal": 252 },
  "Toronto": { "Windsor": 818, "Montreal": 550, "Vancouver": 4439 },
  "Vancouver": { "Toronto": 4439 },
  "Windsor": { "Toronto": 818 },
};
