/**
 * Turkey town dataset for the Distance Calculator tool family.
 * 35 major cities/provinces by population; Istanbul, Ankara, and
 * Izmir's own districts (Kadikoy, Cankaya, Karsiyaka, and similar)
 * are deliberately excluded as redundant. Coordinates from GeoNames.
 * See tr-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const TR_TOWNS: DistanceTown[] = [
  { name: "\u0130stanbul", state: "Turkey", lat: 41.01384, lng: 28.94966, population: 15701602, isCapital: false },
  { name: "Ankara", state: "Ankara", lat: 39.91987, lng: 32.85427, population: 3517182, isCapital: true },
  { name: "Bursa", state: "Turkey", lat: 40.19559, lng: 29.06013, population: 3101833, isCapital: false },
  { name: "\u0130zmir", state: "Turkey", lat: 38.41273, lng: 27.13838, population: 2938292, isCapital: false },
  { name: "Gaziantep", state: "Turkey", lat: 37.05944, lng: 37.3825, population: 2222415, isCapital: false },
  { name: "Diyarbak\u0131r", state: "Turkey", lat: 37.91363, lng: 40.21721, population: 1833684, isCapital: false },
  { name: "Adana", state: "Turkey", lat: 36.98615, lng: 35.32531, population: 1816750, isCapital: false },
  { name: "Kayseri", state: "Turkey", lat: 38.73222, lng: 35.48528, population: 1452458, isCapital: false },
  { name: "Konya", state: "Turkey", lat: 37.87135, lng: 32.48464, population: 1433861, isCapital: false },
  { name: "Antalya", state: "Turkey", lat: 36.90812, lng: 30.69556, population: 1335002, isCapital: false },
  { name: "Eski\u015fehir", state: "Turkey", lat: 39.77667, lng: 30.52056, population: 921630, isCapital: false },
  { name: "Erzurum", state: "Turkey", lat: 39.90861, lng: 41.27694, population: 767848, isCapital: false },
  { name: "Malatya", state: "Turkey", lat: 38.35018, lng: 38.31667, population: 750491, isCapital: false },
  { name: "Mersin", state: "Turkey", lat: 36.81196, lng: 34.63886, population: 537842, isCapital: false },
  { name: "Van", state: "Turkey", lat: 38.49457, lng: 43.38323, population: 525016, isCapital: false },
  { name: "Batman", state: "Turkey", lat: 37.88738, lng: 41.13221, population: 452157, isCapital: false },
  { name: "\u015eanl\u0131urfa", state: "Turkey", lat: 37.16708, lng: 38.79392, population: 449549, isCapital: false },
  { name: "Elaz\u0131\u011f", state: "Turkey", lat: 38.67431, lng: 39.22321, population: 443363, isCapital: false },
  { name: "Antakya", state: "Turkey", lat: 36.20655, lng: 36.15722, population: 399045, isCapital: false },
  { name: "Samsun", state: "Turkey", lat: 41.27976, lng: 36.3361, population: 394050, isCapital: false },
  { name: "Kahramanmara\u015f", state: "Turkey", lat: 37.5847, lng: 36.92641, population: 384953, isCapital: false },
  { name: "U\u015fak", state: "Turkey", lat: 38.67351, lng: 29.4058, population: 369433, isCapital: false },
  { name: "Alanya", state: "Turkey", lat: 36.54375, lng: 31.99982, population: 364180, isCapital: false },
  { name: "Tarsus", state: "Turkey", lat: 36.91766, lng: 34.89277, population: 350732, isCapital: false },
  { name: "Aksaray", state: "Turkey", lat: 38.37255, lng: 34.02537, population: 327575, isCapital: false },
  { name: "Denizli", state: "Turkey", lat: 37.77417, lng: 29.0875, population: 313238, isCapital: false },
  { name: "Sivas", state: "Turkey", lat: 39.74833, lng: 37.01611, population: 264022, isCapital: false },
  { name: "Trabzon", state: "Turkey", lat: 41.005, lng: 39.72694, population: 244083, isCapital: false },
  { name: "Manisa", state: "Turkey", lat: 38.61202, lng: 27.42647, population: 243971, isCapital: false },
  { name: "Bal\u0131kesir", state: "Turkey", lat: 39.64917, lng: 27.88611, population: 238151, isCapital: false },
  { name: "Ordu", state: "Turkey", lat: 40.97782, lng: 37.89047, population: 229214, isCapital: false },
  { name: "K\u00fctahya", state: "Turkey", lat: 39.42417, lng: 29.98333, population: 185008, isCapital: false },
  { name: "Ayd\u0131n", state: "Turkey", lat: 37.84501, lng: 27.83963, population: 163022, isCapital: false },
  { name: "Tekirda\u011f", state: "Turkey", lat: 40.9781, lng: 27.51101, population: 122287, isCapital: false },
  { name: "Mu\u011fla", state: "Turkey", lat: 37.21807, lng: 28.3665, population: 92328, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return TR_TOWNS.find((t) => t.name === name);
}
