/**
 * Argentina town dataset for the Distance Calculator tool family
 * (Spanish-only, per the site's language-per-market convention).
 * All 23 provincial capitals plus Buenos Aires (Capital Federal)
 * and 2 further major cities (Rosario, Mar del Plata). Coordinates
 * from GeoNames, with two corrections: geonamescache's top-population
 * match for 'Rawson' and 'Santa Rosa' were different, smaller towns
 * of the same name (in San Juan and Jujuy respectively) rather than
 * Chubut's and La Pampa's provincial capitals - fixed manually.
 * See ar-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const AR_TOWNS: DistanceTown[] = [
  { name: "Buenos Aires", state: "Buenos Aires (Capital Federal)", lat: -34.61315, lng: -58.37723, population: 2891082, isCapital: true },
  { name: "C\u00f3rdoba", state: "C\u00f3rdoba", lat: -31.40648, lng: -64.18853, population: 2106734, isCapital: true },
  { name: "Rosario", state: "Santa Fe", lat: -32.94682, lng: -60.63932, population: 948312, isCapital: false },
  { name: "Mar del Plata", state: "Buenos Aires", lat: -38.00042, lng: -57.5562, population: 593337, isCapital: false },
  { name: "San Miguel de Tucum\u00e1n", state: "Tucum\u00e1n", lat: -26.81601, lng: -65.21051, population: 548866, isCapital: true },
  { name: "Salta", state: "Salta", lat: -24.80645, lng: -65.41999, population: 520683, isCapital: true },
  { name: "Santa Fe", state: "Santa Fe", lat: -31.64881, lng: -60.70868, population: 391164, isCapital: true },
  { name: "Corrientes", state: "Corrientes", lat: -27.46784, lng: -58.8344, population: 346334, isCapital: true },
  { name: "Posadas", state: "Misiones", lat: -27.39184, lng: -55.92379, population: 305874, isCapital: true },
  { name: "Resistencia", state: "Chaco", lat: -27.46363, lng: -58.98665, population: 290793, isCapital: true },
  { name: "San Salvador de Jujuy", state: "Jujuy", lat: -24.1928, lng: -65.29342, population: 257970, isCapital: true },
  { name: "Santiago del Estero", state: "Santiago del Estero", lat: -27.80047, lng: -64.26285, population: 252192, isCapital: true },
  { name: "Paran\u00e1", state: "Entre R\u00edos", lat: -31.73271, lng: -60.52897, population: 247139, isCapital: true },
  { name: "Neuqu\u00e9n", state: "Neuqu\u00e9n", lat: -38.95078, lng: -68.0592, population: 231198, isCapital: true },
  { name: "Formosa", state: "Formosa", lat: -26.18489, lng: -58.17313, population: 222226, isCapital: true },
  { name: "La Plata", state: "Buenos Aires", lat: -34.92126, lng: -57.95442, population: 195443, isCapital: true },
  { name: "La Rioja", state: "La Rioja", lat: -29.41328, lng: -66.85637, population: 178872, isCapital: true },
  { name: "San Luis", state: "San Luis", lat: -33.2914, lng: -66.32467, population: 169947, isCapital: true },
  { name: "Catamarca", state: "Catamarca", lat: -28.46957, lng: -65.78524, population: 159139, isCapital: true },
  { name: "Mendoza", state: "Mendoza", lat: -32.88946, lng: -68.84582, population: 114893, isCapital: true },
  { name: "San Juan", state: "San Juan", lat: -31.53726, lng: -68.52568, population: 109123, isCapital: true },
  { name: "Santa Rosa", state: "La Pampa", lat: -36.61617, lng: -64.28991, population: 102860, isCapital: true },
  { name: "R\u00edo Gallegos", state: "Santa Cruz", lat: -51.6253, lng: -69.25229, population: 95796, isCapital: true },
  { name: "Ushuaia", state: "Tierra del Fuego", lat: -54.81084, lng: -68.31591, population: 56825, isCapital: true },
  { name: "Viedma", state: "R\u00edo Negro", lat: -40.81519, lng: -63.0004, population: 48940, isCapital: true },
  { name: "Rawson", state: "Chubut", lat: -43.3002, lng: -65.1023, population: 34825, isCapital: true },
];

export function findTown(name: string): DistanceTown | undefined {
  return AR_TOWNS.find((t) => t.name === name);
}
