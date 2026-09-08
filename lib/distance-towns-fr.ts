/**
 * France town dataset for the Distance Calculator tool family.
 * 34 major French cities (Paris arrondissements, and Paris/Lyon suburb towns like Marne-la-Vallee and Villeurbanne, excluded as redundant with their parent cities).
 * Coordinates and population sourced from the GeoNames database.
 * See fr-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const FR_TOWNS: DistanceTown[] = [
  { name: "Paris", state: "France", lat: 48.85341, lng: 2.3488, population: 2138551, isCapital: true },
  { name: "Marseille", state: "France", lat: 43.29695, lng: 5.38107, population: 877215, isCapital: false },
  { name: "Lyon", state: "France", lat: 45.74906, lng: 4.84789, population: 520774, isCapital: false },
  { name: "Toulouse", state: "France", lat: 43.60426, lng: 1.44367, population: 511684, isCapital: false },
  { name: "Nice", state: "France", lat: 43.70313, lng: 7.26608, population: 342669, isCapital: false },
  { name: "Nantes", state: "France", lat: 47.21725, lng: -1.55336, population: 325070, isCapital: false },
  { name: "Strasbourg", state: "France", lat: 48.58392, lng: 7.74553, population: 274845, isCapital: false },
  { name: "Bordeaux", state: "France", lat: 44.84124, lng: -0.58046, population: 265328, isCapital: false },
  { name: "Montpellier", state: "France", lat: 43.61093, lng: 3.87635, population: 248252, isCapital: false },
  { name: "Lille", state: "France", lat: 50.63391, lng: 3.05512, population: 238695, isCapital: false },
  { name: "Rennes", state: "France", lat: 48.11109, lng: -1.67431, population: 227830, isCapital: false },
  { name: "Reims", state: "France", lat: 49.26526, lng: 4.02853, population: 196565, isCapital: false },
  { name: "Le Havre", state: "France", lat: 49.49346, lng: 0.10785, population: 185972, isCapital: false },
  { name: "Saint-\u00c9tienne", state: "France", lat: 45.43389, lng: 4.39, population: 176280, isCapital: false },
  { name: "Toulon", state: "France", lat: 43.12442, lng: 5.92836, population: 168701, isCapital: false },
  { name: "Angers", state: "France", lat: 47.47156, lng: -0.55202, population: 168279, isCapital: false },
  { name: "Dijon", state: "France", lat: 47.31344, lng: 5.01391, population: 159941, isCapital: false },
  { name: "Grenoble", state: "France", lat: 45.17869, lng: 5.71479, population: 158552, isCapital: false },
  { name: "N\u00eemes", state: "France", lat: 43.83665, lng: 4.35788, population: 148236, isCapital: false },
  { name: "Clermont-Ferrand", state: "France", lat: 45.77969, lng: 3.08682, population: 147865, isCapital: false },
  { name: "Aix-en-Provence", state: "France", lat: 43.5283, lng: 5.44973, population: 146821, isCapital: false },
  { name: "Brest", state: "France", lat: 48.39029, lng: -4.48628, population: 144899, isCapital: false },
  { name: "Le Mans", state: "France", lat: 48.0021, lng: 0.20251, population: 144515, isCapital: false },
  { name: "Amiens", state: "France", lat: 49.9, lng: 2.3, population: 143086, isCapital: false },
  { name: "Tours", state: "France", lat: 47.39484, lng: 0.70398, population: 141621, isCapital: false },
  { name: "Limoges", state: "France", lat: 45.83362, lng: 1.24759, population: 141176, isCapital: false },
  { name: "Besan\u00e7on", state: "France", lat: 47.24878, lng: 6.01815, population: 128426, isCapital: false },
  { name: "Metz", state: "France", lat: 49.11911, lng: 6.17269, population: 123914, isCapital: false },
  { name: "Orl\u00e9ans", state: "France", lat: 47.90248, lng: 1.90407, population: 116344, isCapital: false },
  { name: "Rouen", state: "France", lat: 49.44313, lng: 1.09932, population: 116331, isCapital: false },
  { name: "Mulhouse", state: "France", lat: 47.75205, lng: 7.32866, population: 111430, isCapital: false },
  { name: "Perpignan", state: "France", lat: 42.69764, lng: 2.89541, population: 110706, isCapital: false },
  { name: "Caen", state: "France", lat: 49.18585, lng: -0.35912, population: 110624, isCapital: false },
  { name: "Nancy", state: "France", lat: 48.68439, lng: 6.18496, population: 105058, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return FR_TOWNS.find((t) => t.name === name);
}
