/**
 * Verified road distances for Kenya, in kilometres. Like Ghana and
 * South Africa, Kenya has no single published government matrix
 * covering all major towns. What it does have is KeNHA (Kenya National
 * Highways Authority), which maintains official lengths for the
 * numbered A-class trunk roads. Only 3 pairs currently have a route
 * that runs directly, end to end, along one officially-documented
 * highway: Nairobi-Mombasa (A109), Mombasa-Garissa (B8), and
 * Nairobi-Malaba (A104) — each independently cross-checked against
 * multiple sources. Deliberately excluded: several widely-published
 * 'distance' figures for routes like Nairobi-Nyeri and Eldoret-Nairobi
 * turned out to trace back to low-quality, inconsistent web content
 * rather than an official source, so those are left to the Haversine-
 * based estimate in distance-engine.ts instead of being presented with
 * false confidence. That estimate function is what every page should
 * call rather than reading this object directly.
 */

export const KE_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Garissa": { "Mombasa": 463 },
  "Malaba": { "Nairobi": 447 },
  "Mombasa": { "Nairobi": 482, "Garissa": 463 },
  "Nairobi": { "Mombasa": 482, "Malaba": 447 },
};
