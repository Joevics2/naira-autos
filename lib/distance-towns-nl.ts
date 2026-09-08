/**
 * Netherlands town dataset for the Distance Calculator tool family.
 * 32 major Dutch cities (Amsterdam's own districts and suburbs excluded as redundant).
 * Coordinates and population sourced from the GeoNames database.
 * See nl-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const NL_TOWNS: DistanceTown[] = [
  { name: "Rotterdam", state: "Netherlands", lat: 51.9225, lng: 4.47917, population: 868135, isCapital: false },
  { name: "Amsterdam", state: "Netherlands", lat: 52.37403, lng: 4.88969, population: 741636, isCapital: true },
  { name: "The Hague", state: "Netherlands", lat: 52.07667, lng: 4.29861, population: 474292, isCapital: false },
  { name: "Utrecht", state: "Netherlands", lat: 52.09083, lng: 5.12222, population: 376435, isCapital: false },
  { name: "Groningen", state: "Netherlands", lat: 53.21917, lng: 6.56667, population: 244807, isCapital: false },
  { name: "Eindhoven", state: "Netherlands", lat: 51.44083, lng: 5.47778, population: 235691, isCapital: false },
  { name: "Tilburg", state: "Netherlands", lat: 51.55551, lng: 5.0913, population: 221947, isCapital: false },
  { name: "Breda", state: "Netherlands", lat: 51.58656, lng: 4.77596, population: 184126, isCapital: false },
  { name: "Nijmegen", state: "Netherlands", lat: 51.8425, lng: 5.85278, population: 177359, isCapital: false },
  { name: "Almere", state: "Netherlands", lat: 52.37025, lng: 5.21413, population: 176432, isCapital: false },
  { name: "Haarlem", state: "Netherlands", lat: 52.38084, lng: 4.63683, population: 162543, isCapital: false },
  { name: "Arnhem", state: "Netherlands", lat: 51.98, lng: 5.91111, population: 162424, isCapital: false },
  { name: "'s-Hertogenbosch", state: "Netherlands", lat: 51.69917, lng: 5.30417, population: 160783, isCapital: false },
  { name: "Enschede", state: "Netherlands", lat: 52.21833, lng: 6.89583, population: 153655, isCapital: false },
  { name: "Zaanstad", state: "Netherlands", lat: 52.45313, lng: 4.81356, population: 140085, isCapital: false },
  { name: "Amersfoort", state: "Netherlands", lat: 52.155, lng: 5.3875, population: 139914, isCapital: false },
  { name: "Apeldoorn", state: "Netherlands", lat: 52.21, lng: 5.96944, population: 136670, isCapital: false },
  { name: "Hoofddorp", state: "Netherlands", lat: 52.3025, lng: 4.68889, population: 132734, isCapital: false },
  { name: "Zwolle", state: "Netherlands", lat: 52.5125, lng: 6.09444, population: 129840, isCapital: false },
  { name: "Leeuwarden", state: "Netherlands", lat: 53.20271, lng: 5.80973, population: 124481, isCapital: false },
  { name: "Maastricht", state: "Netherlands", lat: 50.84833, lng: 5.68889, population: 122378, isCapital: false },
  { name: "Leiden", state: "Netherlands", lat: 52.15833, lng: 4.49306, population: 119713, isCapital: false },
  { name: "Dordrecht", state: "Netherlands", lat: 51.81, lng: 4.67361, population: 119260, isCapital: false },
  { name: "Zoetermeer", state: "Netherlands", lat: 52.0575, lng: 4.49306, population: 115845, isCapital: false },
  { name: "Venlo", state: "Netherlands", lat: 51.37, lng: 6.16806, population: 101988, isCapital: false },
  { name: "Deventer", state: "Netherlands", lat: 52.255, lng: 6.16389, population: 97331, isCapital: false },
  { name: "Delft", state: "Netherlands", lat: 52.00667, lng: 4.35556, population: 95060, isCapital: false },
  { name: "Alkmaar", state: "Netherlands", lat: 52.63167, lng: 4.74861, population: 94853, isCapital: false },
  { name: "Heerlen", state: "Netherlands", lat: 50.88365, lng: 5.98154, population: 93084, isCapital: false },
  { name: "Hilversum", state: "Netherlands", lat: 52.22333, lng: 5.17639, population: 83640, isCapital: false },
  { name: "Hengelo", state: "Netherlands", lat: 52.26583, lng: 6.79306, population: 82311, isCapital: false },
  { name: "Purmerend", state: "Netherlands", lat: 52.505, lng: 4.95972, population: 80117, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return NL_TOWNS.find((t) => t.name === name);
}
