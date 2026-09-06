/**
 * Egypt town dataset for the Distance Calculator tool family.
 * 11 major hub towns/cities plus 30 further governorate capitals
 * and regional centres a general audience would search for.
 * Coordinates and population sourced from the GeoNames database,
 * except Sharm El Sheikh, Nuweiba, Dahab, Marsa Alam, and El Tor
 * (Sinai/Red Sea resort towns not in that dataset), whose
 * coordinates were sourced independently.
 * See eg-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const EG_TOWNS: DistanceTown[] = [
  { name: "Cairo", state: "Governorate", lat: 30.06263, lng: 31.24967, population: 9606916, isCapital: true },
  { name: "Alexandria", state: "Governorate", lat: 31.20176, lng: 29.91582, population: 5263542, isCapital: true },
  { name: "Port Said", state: "Governorate", lat: 31.26531, lng: 32.3019, population: 780515, isCapital: true },
  { name: "Suez", state: "Governorate", lat: 29.97371, lng: 32.52627, population: 699541, isCapital: false },
  { name: "Mansoura", state: "Governorate", lat: 31.03637, lng: 31.38069, population: 621953, isCapital: false },
  { name: "Mahalla el-Kubra", state: "Governorate", lat: 30.97063, lng: 31.1669, population: 592573, isCapital: false },
  { name: "Tanta", state: "Governorate", lat: 30.78847, lng: 31.00192, population: 576648, isCapital: false },
  { name: "Asyut", state: "Governorate", lat: 27.18096, lng: 31.18368, population: 528669, isCapital: false },
  { name: "Faiyum", state: "Governorate", lat: 29.30995, lng: 30.8418, population: 519047, isCapital: true },
  { name: "Esna", state: "Governorate", lat: 25.29336, lng: 32.55402, population: 462787, isCapital: false },
  { name: "Zagazig", state: "Governorate", lat: 30.58768, lng: 31.502, population: 430445, isCapital: false },
  { name: "Ismailia", state: "Governorate", lat: 30.60427, lng: 32.27225, population: 429465, isCapital: true },
  { name: "Luxor", state: "Governorate", lat: 25.69893, lng: 32.6421, population: 422407, isCapital: true },
  { name: "Kom Ombo", state: "Governorate", lat: 24.47669, lng: 32.94626, population: 409311, isCapital: false },
  { name: "Aswan", state: "Governorate", lat: 24.09082, lng: 32.89942, population: 379774, isCapital: true },
  { name: "Damanhur", state: "Governorate", lat: 31.03408, lng: 30.46823, population: 318207, isCapital: false },
  { name: "Damietta", state: "Governorate", lat: 31.41648, lng: 31.81332, population: 305920, isCapital: false },
  { name: "Rosetta", state: "Governorate", lat: 31.39951, lng: 30.41718, population: 301795, isCapital: false },
  { name: "Minya", state: "Governorate", lat: 28.09193, lng: 30.75813, population: 283605, isCapital: true },
  { name: "Beni Suef", state: "Governorate", lat: 29.07441, lng: 31.09785, population: 273151, isCapital: false },
  { name: "Shibin el-Kom", state: "Governorate", lat: 30.55258, lng: 31.00904, population: 267945, isCapital: false },
  { name: "Sohag", state: "Governorate", lat: 26.55695, lng: 31.69478, population: 266944, isCapital: false },
  { name: "Qena", state: "Governorate", lat: 26.16418, lng: 32.72671, population: 252883, isCapital: false },
  { name: "Mallawi", state: "Governorate", lat: 27.73264, lng: 30.84129, population: 212628, isCapital: false },
  { name: "Hurghada", state: "Governorate", lat: 27.25738, lng: 33.81291, population: 207132, isCapital: true },
  { name: "Arish", state: "Governorate", lat: 31.13159, lng: 33.79844, population: 199243, isCapital: false },
  { name: "Kafr ash Shaykh", state: "Governorate", lat: 31.11174, lng: 30.93991, population: 194569, isCapital: false },
  { name: "Bilbeis", state: "Governorate", lat: 30.42039, lng: 31.56223, population: 185237, isCapital: false },
  { name: "Banha", state: "Governorate", lat: 30.45977, lng: 31.1842, population: 182254, isCapital: false },
  { name: "Marsa Matruh", state: "Governorate", lat: 31.3529, lng: 27.23725, population: 176498, isCapital: false },
  { name: "Akhmim", state: "Governorate", lat: 26.5622, lng: 31.74566, population: 151430, isCapital: false },
  { name: "Girga", state: "Governorate", lat: 26.33721, lng: 31.89295, population: 151256, isCapital: false },
  { name: "Disuq", state: "Governorate", lat: 31.13259, lng: 30.64784, population: 149291, isCapital: false },
  { name: "Edfu", state: "Governorate", lat: 24.97916, lng: 32.87722, population: 79510, isCapital: true },
  { name: "Sharm El Sheikh", state: "Governorate", lat: 27.9158, lng: 34.3299, population: 73000, isCapital: true },
  { name: "Safaga", state: "Governorate", lat: 26.74906, lng: 33.93891, population: 53639, isCapital: false },
  { name: "Rafah", state: "Governorate", lat: 31.28204, lng: 34.23869, population: 44215, isCapital: true },
  { name: "El Tor", state: "Governorate", lat: 28.24, lng: 33.6142, population: 22000, isCapital: false },
  { name: "Nuweiba", state: "Governorate", lat: 29.0333, lng: 34.6667, population: 15000, isCapital: false },
  { name: "Dahab", state: "Governorate", lat: 28.5091, lng: 34.5136, population: 15000, isCapital: false },
  { name: "Marsa Alam", state: "Governorate", lat: 25.0687, lng: 34.8927, population: 12000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return EG_TOWNS.find((t) => t.name === name);
}
