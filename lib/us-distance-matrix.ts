/**
 * Verified road distances for the US, in kilometres (converted from
 * miles). No single US federal agency publishes a public town-to-town
 * road distance chart (FHWA data covers urbanized-area road mileage,
 * not intercity distances). The industry-standard non-government
 * reference has historically been the Rand McNally Motor Carriers'
 * Road Atlas mileage chart used by the trucking industry, but its
 * exact figures aren't freely published online to cite directly.
 * The 7 pairs below are widely-repeated, well-established driving
 * distances for major interstate routes, each independently quoted
 * by multiple road-trip and logistics sources: New York City-Los
 * Angeles (I-80/I-70, 2790mi), Chicago-Houston (1090mi), Chicago-
 * Miami (1380mi), Dallas-Houston (240mi), Los Angeles-San Francisco
 * (380mi), Seattle-Portland (I-5, 175mi), and New York City-
 * Philadelphia (I-95, 95mi). Every other route falls back to the
 * Haversine-based estimate in distance-engine.ts, which is what
 * every page should call rather than reading this object directly.
 */

export const US_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Chicago": { "Houston": 1754, "Miami": 2221 },
  "Dallas": { "Houston": 386 },
  "Houston": { "Chicago": 1754, "Dallas": 386 },
  "Los Angeles": { "New York City": 4491, "San Francisco": 612 },
  "Miami": { "Chicago": 2221 },
  "New York City": { "Los Angeles": 4491, "Philadelphia": 153 },
  "Philadelphia": { "New York City": 153 },
  "Portland": { "Seattle": 282 },
  "San Francisco": { "Los Angeles": 612 },
  "Seattle": { "Portland": 282 },
};
