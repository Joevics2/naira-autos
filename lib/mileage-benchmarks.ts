/**
 * Per-country "typical annual mileage" benchmarks, used both by dedicated
 * country pages (e.g. /tools/mileage-explainer-nigeria) and by the global
 * tool's in-page country picker. Single source of truth — add a country
 * here once and both surfaces pick it up.
 */

export interface MileageBenchmark {
  avgAnnualMileageKm: number;
  note: string;
}

export const MILEAGE_BENCHMARKS: Record<string, MileageBenchmark> = {
  ng: {
    avgAnnualMileageKm: 18000,
    note: "Based on a typical range of 15,000–20,000 km/year cited by Nigerian car-tracking and marketplace data (Cartrack Nigeria, Carmudi Nigeria) — actual usage varies a lot by city and driving pattern.",
  },
};
