/**
 * UAE town dataset for the Distance Calculator tool family. The 7
 * emirate capitals plus 7 further towns a general audience would
 * search for. Coordinates from GeoNames. Used by both the English
 * and Arabic pages. See ae-distance-matrix.ts for sourcing on
 * verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const AE_TOWNS: DistanceTown[] = [
  { name: "Dubai", state: "Dubai", lat: 25.07725, lng: 55.30927, population: 3790000, isCapital: true },
  { name: "Abu Dhabi", state: "Abu Dhabi", lat: 24.45118, lng: 54.39696, population: 1807000, isCapital: true },
  { name: "Sharjah", state: "Sharjah", lat: 25.3342, lng: 55.41221, population: 1800000, isCapital: true },
  { name: "Al Ain", state: "Abu Dhabi", lat: 24.19167, lng: 55.76056, population: 846747, isCapital: false },
  { name: "Ajman", state: "Ajman", lat: 25.40177, lng: 55.47878, population: 490035, isCapital: true },
  { name: "Ras Al Khaimah", state: "Ras Al Khaimah", lat: 25.78953, lng: 55.9432, population: 351943, isCapital: true },
  { name: "Fujairah", state: "Fujairah", lat: 25.11641, lng: 56.34141, population: 118933, isCapital: true },
  { name: "Umm Al Quwain", state: "Umm Al Quwain", lat: 25.56473, lng: 55.55517, population: 59098, isCapital: true },
  { name: "Khor Fakkan", state: "Sharjah", lat: 25.33132, lng: 56.34199, population: 40677, isCapital: false },
  { name: "Kalba", state: "Sharjah", lat: 25.0513, lng: 56.35422, population: 37545, isCapital: false },
  { name: "Dibba Al-Fujairah", state: "Fujairah", lat: 25.59246, lng: 56.26176, population: 30000, isCapital: false },
  { name: "Ar Ruways", state: "Abu Dhabi", lat: 24.11028, lng: 52.73056, population: 25000, isCapital: false },
  { name: "Adh Dhayd", state: "Sharjah", lat: 25.28812, lng: 55.88157, population: 20165, isCapital: false },
  { name: "Hatta", state: "Dubai", lat: 24.80073, lng: 56.12726, population: 15324, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return AE_TOWNS.find((t) => t.name === name);
}
