/**
 * Japan town dataset for the Distance Calculator tool family.
 * 43 major cities by population; Greater Tokyo's own wards
 * (Setagaya, Ota, Adachi, and similar) are deliberately excluded
 * as redundant with Tokyo itself. Coordinates from GeoNames, with
 * Nagasaki and Nara corrected/added manually - GeoNames' top-
 * population 'Nagasaki' match was a small Tokyo-area neighbourhood,
 * not the well-known city, and Nara wasn't in that dataset at all.
 * See jp-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const JP_TOWNS: DistanceTown[] = [
  { name: "Tokyo", state: "Japan", lat: 35.6895, lng: 139.69171, population: 9733276, isCapital: true },
  { name: "Yokohama", state: "Japan", lat: 35.43333, lng: 139.65, population: 3777491, isCapital: false },
  { name: "Osaka", state: "Japan", lat: 34.69379, lng: 135.50107, population: 2753862, isCapital: false },
  { name: "Nagoya", state: "Japan", lat: 35.18147, lng: 136.90641, population: 2332176, isCapital: false },
  { name: "Sapporo", state: "Japan", lat: 43.06667, lng: 141.35, population: 1973832, isCapital: false },
  { name: "Fukuoka", state: "Japan", lat: 33.6, lng: 130.41667, population: 1612392, isCapital: false },
  { name: "Kawasaki", state: "Japan", lat: 35.52056, lng: 139.71722, population: 1538262, isCapital: false },
  { name: "Kobe", state: "Japan", lat: 34.6913, lng: 135.183, population: 1525152, isCapital: false },
  { name: "Kyoto", state: "Japan", lat: 35.02107, lng: 135.75385, population: 1463723, isCapital: false },
  { name: "Saitama", state: "Japan", lat: 35.90807, lng: 139.65657, population: 1324854, isCapital: false },
  { name: "Hiroshima", state: "Japan", lat: 34.4, lng: 132.45, population: 1200754, isCapital: false },
  { name: "Sendai", state: "Japan", lat: 38.26667, lng: 140.86667, population: 1096704, isCapital: false },
  { name: "Chiba", state: "Japan", lat: 35.6, lng: 140.11667, population: 979768, isCapital: false },
  { name: "Kitakyushu", state: "Japan", lat: 33.85181, lng: 130.85034, population: 940978, isCapital: false },
  { name: "Niigata", state: "Japan", lat: 37.92259, lng: 139.04125, population: 797591, isCapital: false },
  { name: "Hamamatsu", state: "Japan", lat: 34.7, lng: 137.73333, population: 791707, isCapital: false },
  { name: "Kumamoto", state: "Japan", lat: 32.80589, lng: 130.69181, population: 738907, isCapital: false },
  { name: "Okayama", state: "Japan", lat: 34.65, lng: 133.93333, population: 724691, isCapital: false },
  { name: "Sagamihara", state: "Japan", lat: 35.56707, lng: 139.24167, population: 720780, isCapital: false },
  { name: "Shizuoka", state: "Japan", lat: 34.98333, lng: 138.38333, population: 693389, isCapital: false },
  { name: "Kagoshima", state: "Japan", lat: 31.56667, lng: 130.55, population: 595049, isCapital: false },
  { name: "Himeji", state: "Japan", lat: 34.81667, lng: 134.7, population: 530495, isCapital: false },
  { name: "Utsunomiya", state: "Japan", lat: 36.56667, lng: 139.88333, population: 518757, isCapital: false },
  { name: "Matsuyama", state: "Japan", lat: 33.83916, lng: 132.76574, population: 511192, isCapital: false },
  { name: "Kurashiki", state: "Japan", lat: 34.58333, lng: 133.76667, population: 483576, isCapital: false },
  { name: "\u014cita", state: "Japan", lat: 33.23333, lng: 131.6, population: 477715, isCapital: false },
  { name: "Fukuyama", state: "Japan", lat: 34.48333, lng: 133.36667, population: 468812, isCapital: false },
  { name: "Kanazawa", state: "Japan", lat: 36.6, lng: 136.61667, population: 466029, isCapital: false },
  { name: "Fujisawa", state: "Japan", lat: 35.34926, lng: 139.47666, population: 439728, isCapital: false },
  { name: "Toyota", state: "Japan", lat: 35.08333, lng: 137.15, population: 426162, isCapital: false },
  { name: "Shinagawa", state: "Japan", lat: 33.63627, lng: 133.00572, population: 422488, isCapital: false },
  { name: "Takamatsu", state: "Japan", lat: 34.33333, lng: 134.05, population: 418994, isCapital: false },
  { name: "Toyama", state: "Japan", lat: 36.7, lng: 137.21667, population: 415844, isCapital: false },
  { name: "Yokosuka", state: "Japan", lat: 35.28361, lng: 139.66722, population: 409478, isCapital: false },
  { name: "Hirakata", state: "Japan", lat: 34.81352, lng: 135.64914, population: 406331, isCapital: false },
  { name: "Gifu", state: "Japan", lat: 35.42291, lng: 136.76039, population: 402557, isCapital: false },
  { name: "Toyonaka", state: "Japan", lat: 34.78244, lng: 135.46932, population: 401558, isCapital: false },
  { name: "Miyazaki", state: "Japan", lat: 31.91667, lng: 131.41667, population: 401339, isCapital: false },
  { name: "Nagasaki", state: "Japan", lat: 32.7503, lng: 129.8779, population: 400691, isCapital: false },
  { name: "Suita", state: "Japan", lat: 34.76143, lng: 135.51567, population: 385567, isCapital: false },
  { name: "Okazaki", state: "Japan", lat: 34.95, lng: 137.16667, population: 384654, isCapital: false },
  { name: "Ichinomiya", state: "Japan", lat: 35.3, lng: 136.8, population: 380073, isCapital: false },
  { name: "Nara", state: "Japan", lat: 34.6851, lng: 135.8048, population: 354630, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return JP_TOWNS.find((t) => t.name === name);
}
