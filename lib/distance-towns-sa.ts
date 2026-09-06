/**
 * Saudi Arabia town dataset for the Distance Calculator tool family.
 * 9 major hub cities (matching the official highway network) plus
 * 26 further provincial and regional centres. Coordinates and
 * population sourced from the GeoNames database.
 * Used by both the English and Arabic pages for this country -
 * town names here are in English/transliterated form; the Arabic
 * page renders them as-is (city names are commonly written in Latin
 * script even in Arabic-language Gulf road content) alongside
 * Arabic UI chrome from lib/distance-strings-ar.ts.
 * See sa-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const SA_TOWNS: DistanceTown[] = [
  { name: "Jeddah", state: "Makkah Province", lat: 21.49012, lng: 39.18624, population: 4697000, isCapital: true },
  { name: "Riyadh", state: "Riyadh Province", lat: 24.68773, lng: 46.72185, population: 4205961, isCapital: true },
  { name: "Makkah", state: "Makkah Province", lat: 21.42664, lng: 39.82563, population: 1578722, isCapital: true },
  { name: "Madinah", state: "Madinah Province", lat: 24.46861, lng: 39.61417, population: 1300000, isCapital: true },
  { name: "Dammam", state: "Eastern Province", lat: 26.43442, lng: 50.10326, population: 1252523, isCapital: true },
  { name: "Buraydah", state: "Qassim Province", lat: 26.32599, lng: 43.97497, population: 745353, isCapital: true },
  { name: "Ta'if", state: "Makkah Province", lat: 21.27028, lng: 40.41583, population: 688693, isCapital: true },
  { name: "Tabuk", state: "Tabuk Province", lat: 28.3998, lng: 36.57151, population: 667000, isCapital: true },
  { name: "Ha'il", state: "Ha'il Province", lat: 27.52188, lng: 41.69073, population: 605930, isCapital: true },
  { name: "Najran", state: "Najran Province", lat: 17.49326, lng: 44.12766, population: 505652, isCapital: false },
  { name: "Al Kharj", state: "Riyadh Province", lat: 24.15541, lng: 47.33457, population: 425300, isCapital: false },
  { name: "Khamis Mushait", state: "Asir Province", lat: 18.3, lng: 42.73333, population: 387553, isCapital: false },
  { name: "Al Hufuf", state: "Eastern Province", lat: 25.36467, lng: 49.58764, population: 293179, isCapital: false },
  { name: "Hafar Al-Batin", state: "Eastern Province", lat: 28.43279, lng: 45.97077, population: 271642, isCapital: false },
  { name: "Al Jubayl", state: "Eastern Province", lat: 27.0174, lng: 49.62251, population: 237274, isCapital: false },
  { name: "Abha", state: "Asir Province", lat: 18.21639, lng: 42.50528, population: 210886, isCapital: false },
  { name: "Yanbu", state: "Madinah Province", lat: 24.08954, lng: 38.0618, population: 200161, isCapital: false },
  { name: "Unaizah", state: "Qassim Province", lat: 26.1, lng: 44.0, population: 183319, isCapital: false },
  { name: "Khobar", state: "Eastern Province", lat: 26.27944, lng: 50.20833, population: 165799, isCapital: false },
  { name: "Arar", state: "Northern Borders Province", lat: 30.97531, lng: 41.03808, population: 148540, isCapital: false },
  { name: "Sakakah", state: "Al Jawf Province", lat: 29.96974, lng: 40.20641, population: 128332, isCapital: false },
  { name: "Az Zulfi", state: "Riyadh Province", lat: 26.29945, lng: 44.81542, population: 125000, isCapital: false },
  { name: "Jizan", state: "Jizan Province", lat: 16.88917, lng: 42.55111, population: 105198, isCapital: false },
  { name: "Qurayyat", state: "Al Jawf Province", lat: 31.33176, lng: 37.34282, population: 102903, isCapital: false },
  { name: "Dhahran", state: "Eastern Province", lat: 26.28864, lng: 50.11396, population: 99540, isCapital: false },
  { name: "Al Qatif", state: "Eastern Province", lat: 26.56542, lng: 50.0089, population: 98259, isCapital: false },
  { name: "Al Bahah", state: "Al Bahah Province", lat: 20.01288, lng: 41.46767, population: 88419, isCapital: false },
  { name: "Ad Dawadimi", state: "Riyadh Province", lat: 24.50772, lng: 44.39237, population: 86861, isCapital: false },
  { name: "Ar Rass", state: "Qassim Province", lat: 25.86944, lng: 43.4973, population: 81728, isCapital: false },
  { name: "Rabigh", state: "Makkah Province", lat: 22.79856, lng: 39.03493, population: 72928, isCapital: false },
  { name: "Al Lith", state: "Makkah Province", lat: 20.14804, lng: 40.27224, population: 72000, isCapital: false },
  { name: "Turayf", state: "Northern Borders Province", lat: 31.672, lng: 38.663, population: 66014, isCapital: false },
  { name: "Ras Tanura", state: "Eastern Province", lat: 26.70742, lng: 50.06735, population: 62314, isCapital: false },
  { name: "Al Khafji", state: "Eastern Province", lat: 28.43905, lng: 48.49132, population: 54857, isCapital: false },
  { name: "Baljurashi", state: "Al Bahah Province", lat: 19.85944, lng: 41.55722, population: 51787, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return SA_TOWNS.find((t) => t.name === name);
}
