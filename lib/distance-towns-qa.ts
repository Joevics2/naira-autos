/**
 * Qatar town dataset for the Distance Calculator tool family. Qatar
 * is small enough (under 200km end to end) that a short, deliberately
 * modest list of 10 towns covers essentially everywhere people drive
 * between. Coordinates from GeoNames where available; Dukhan, Mesaieed,
 * Al Ruwais, and Al Shahaniya were sourced independently since they
 * weren't in that dataset. Used by both the English and Arabic pages.
 * See qa-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const QA_TOWNS: DistanceTown[] = [
  { name: "Doha", state: "Doha Municipality", lat: 25.28545, lng: 51.53096, population: 344939, isCapital: true },
  { name: "Al Rayyan", state: "Al Rayyan Municipality", lat: 25.29194, lng: 51.42444, population: 272465, isCapital: false },
  { name: "Lusail", state: "Doha Municipality", lat: 25.4175, lng: 51.5075, population: 198600, isCapital: false },
  { name: "Mesaieed", state: "Al Wakrah Municipality", lat: 24.9927, lng: 51.547, population: 35000, isCapital: false },
  { name: "Umm Salal", state: "Umm Salal Municipality", lat: 25.41524, lng: 51.40647, population: 29391, isCapital: false },
  { name: "Al Wakrah", state: "Al Wakrah Municipality", lat: 25.17151, lng: 51.60337, population: 26436, isCapital: false },
  { name: "Al Khor", state: "Al Khor Municipality", lat: 25.68389, lng: 51.50583, population: 18923, isCapital: false },
  { name: "Al Shahaniya", state: "Al Shahaniya Municipality", lat: 25.3667, lng: 51.2167, population: 15000, isCapital: false },
  { name: "Dukhan", state: "Al Shahaniya Municipality", lat: 25.4165, lng: 50.783, population: 7000, isCapital: false },
  { name: "Al Ruwais", state: "Al Shamal Municipality", lat: 26.1333, lng: 51.2167, population: 5000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return QA_TOWNS.find((t) => t.name === name);
}
