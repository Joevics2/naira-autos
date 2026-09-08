/**
 * Germany town dataset for the Distance Calculator tool family.
 * 40 major German cities by population (Hamburg's own boroughs excluded as redundant). City names use common English exonyms (Cologne, not Köln; Frankfurt, not Frankfurt am Main).
 * Coordinates and population sourced from the GeoNames database.
 * See de-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const DE_TOWNS: DistanceTown[] = [
  { name: "Berlin", state: "Germany", lat: 52.52437, lng: 13.41053, population: 3426354, isCapital: true },
  { name: "Hamburg", state: "Germany", lat: 53.55073, lng: 9.99302, population: 1973896, isCapital: false },
  { name: "Munich", state: "Germany", lat: 48.13743, lng: 11.57549, population: 1505005, isCapital: false },
  { name: "Cologne", state: "Germany", lat: 50.93333, lng: 6.95, population: 1024621, isCapital: false },
  { name: "Frankfurt", state: "Germany", lat: 50.11552, lng: 8.68417, population: 650000, isCapital: false },
  { name: "D\u00fcsseldorf", state: "Germany", lat: 51.22319, lng: 6.77927, population: 618685, isCapital: false },
  { name: "Stuttgart", state: "Germany", lat: 48.78232, lng: 9.17702, population: 612663, isCapital: false },
  { name: "Essen", state: "Germany", lat: 51.45657, lng: 7.01228, population: 593085, isCapital: false },
  { name: "Dortmund", state: "Germany", lat: 51.51494, lng: 7.466, population: 588462, isCapital: false },
  { name: "Dresden", state: "Germany", lat: 51.05089, lng: 13.73832, population: 564904, isCapital: false },
  { name: "Bremen", state: "Germany", lat: 53.07582, lng: 8.80717, population: 546501, isCapital: false },
  { name: "Nuremberg", state: "Germany", lat: 49.45421, lng: 11.07752, population: 515543, isCapital: false },
  { name: "Hanover", state: "Germany", lat: 52.37052, lng: 9.73322, population: 515140, isCapital: false },
  { name: "Leipzig", state: "Germany", lat: 51.33962, lng: 12.37129, population: 504971, isCapital: false },
  { name: "Duisburg", state: "Germany", lat: 51.43247, lng: 6.76516, population: 504358, isCapital: false },
  { name: "Bochum", state: "Germany", lat: 51.48165, lng: 7.21648, population: 385729, isCapital: false },
  { name: "Wuppertal", state: "Germany", lat: 51.25627, lng: 7.14816, population: 360797, isCapital: false },
  { name: "Bielefeld", state: "Germany", lat: 52.03333, lng: 8.53333, population: 331906, isCapital: false },
  { name: "Bonn", state: "Germany", lat: 50.73438, lng: 7.09549, population: 330579, isCapital: false },
  { name: "M\u00fcnster", state: "Germany", lat: 51.96236, lng: 7.62571, population: 308258, isCapital: false },
  { name: "Mannheim", state: "Germany", lat: 49.4891, lng: 8.46694, population: 307960, isCapital: false },
  { name: "Augsburg", state: "Germany", lat: 48.37154, lng: 10.89851, population: 301105, isCapital: false },
  { name: "Wiesbaden", state: "Germany", lat: 50.08601, lng: 8.24435, population: 288850, isCapital: false },
  { name: "Karlsruhe", state: "Germany", lat: 49.00937, lng: 8.40444, population: 283799, isCapital: false },
  { name: "Gelsenkirchen", state: "Germany", lat: 51.50508, lng: 7.09654, population: 270028, isCapital: false },
  { name: "Aachen", state: "Germany", lat: 50.77664, lng: 6.08342, population: 265208, isCapital: false },
  { name: "M\u00f6nchengladbach", state: "Germany", lat: 51.18539, lng: 6.44172, population: 261742, isCapital: false },
  { name: "Kiel", state: "Germany", lat: 54.32133, lng: 10.13489, population: 252668, isCapital: false },
  { name: "Chemnitz", state: "Germany", lat: 50.8357, lng: 12.92922, population: 247220, isCapital: false },
  { name: "Braunschweig", state: "Germany", lat: 52.26594, lng: 10.52673, population: 244715, isCapital: false },
  { name: "Magdeburg", state: "Germany", lat: 52.13129, lng: 11.63189, population: 244329, isCapital: false },
  { name: "Krefeld", state: "Germany", lat: 51.33645, lng: 6.55381, population: 237984, isCapital: false },
  { name: "Halle (Saale)", state: "Germany", lat: 51.48158, lng: 11.97947, population: 237865, isCapital: false },
  { name: "Freiburg", state: "Germany", lat: 47.9959, lng: 7.85222, population: 237460, isCapital: false },
  { name: "Mainz", state: "Germany", lat: 49.98185, lng: 8.28008, population: 222889, isCapital: false },
  { name: "Oberhausen", state: "Germany", lat: 51.47805, lng: 6.8625, population: 219176, isCapital: false },
  { name: "Erfurt", state: "Germany", lat: 50.97734, lng: 11.03536, population: 218793, isCapital: false },
  { name: "L\u00fcbeck", state: "Germany", lat: 53.86893, lng: 10.68729, population: 212207, isCapital: false },
  { name: "Hagen", state: "Germany", lat: 51.36081, lng: 7.47168, population: 198972, isCapital: false },
  { name: "Rostock", state: "Germany", lat: 54.0887, lng: 12.14049, population: 198293, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return DE_TOWNS.find((t) => t.name === name);
}
