/**
 * Philippines town dataset for the Distance Calculator tool family.
 * Manila plus 29 further major cities across Luzon, Visayas, and
 * Mindanao. Coordinates from GeoNames; Naga City and Legazpi (Bicol)
 * were sourced independently since geonamescache's 'Naga' entry is a
 * different town in Cebu province, and Legazpi wasn't in that dataset
 * at all. Metro Manila's many separate LGUs (Quezon City aside,
 * Caloocan, Taguig, Pasig, Makati, and similar) are consolidated into
 * a single Manila entry, the same call made for other mega-metros in
 * this tool.
 *
 * IMPORTANT: the Philippines is an archipelago. Road distance between
 * cities on different islands (e.g. Manila to Cebu or Davao) isn't
 * meaningful without a ferry/RORO crossing this tool doesn't model -
 * see distance-calculator-philippines/page.tsx for how that's
 * explained on the page itself.
 * See ph-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const PH_TOWNS: DistanceTown[] = [
  { name: "Quezon City", state: "Metro Manila", lat: 14.6488, lng: 121.0509, population: 3084270, isCapital: false },
  { name: "Davao", state: "Davao del Sur", lat: 7.07306, lng: 125.61278, population: 1848947, isCapital: false },
  { name: "Manila", state: "Metro Manila (National Capital)", lat: 14.6042, lng: 120.9822, population: 1600000, isCapital: true },
  { name: "Zamboanga", state: "Zamboanga del Sur", lat: 6.91028, lng: 122.07389, population: 1018849, isCapital: false },
  { name: "Cebu City", state: "Cebu", lat: 10.31672, lng: 123.89071, population: 965332, isCapital: false },
  { name: "Cagayan de Oro", state: "Misamis Oriental", lat: 8.48222, lng: 124.64722, population: 741617, isCapital: false },
  { name: "General Santos", state: "South Cotabato", lat: 6.11278, lng: 125.17167, population: 722059, isCapital: false },
  { name: "Angeles City", state: "Pampanga", lat: 15.15, lng: 120.58333, population: 483452, isCapital: false },
  { name: "Iloilo", state: "Iloilo", lat: 10.69694, lng: 122.56444, population: 473728, isCapital: false },
  { name: "Bacolod City", state: "Negros Occidental", lat: 10.66667, lng: 122.95, population: 454898, isCapital: false },
  { name: "Tarlac City", state: "Tarlac", lat: 15.48017, lng: 120.59794, population: 401892, isCapital: false },
  { name: "Cabanatuan City", state: "Nueva Ecija", lat: 15.48586, lng: 120.96648, population: 343672, isCapital: false },
  { name: "Iligan", state: "Lanao del Norte", lat: 8.2289, lng: 124.24344, population: 342618, isCapital: false },
  { name: "Butuan", state: "Agusan del Norte", lat: 8.94917, lng: 125.54361, population: 309709, isCapital: false },
  { name: "Baguio", state: "Benguet", lat: 16.41639, lng: 120.59306, population: 272714, isCapital: false },
  { name: "Malolos", state: "Bulacan", lat: 14.8443, lng: 120.81039, population: 269809, isCapital: false },
  { name: "Marawi City", state: "Lanao del Sur", lat: 8.0034, lng: 124.28395, population: 259993, isCapital: false },
  { name: "Tacloban", state: "Leyte", lat: 11.24333, lng: 125.00472, population: 259353, isCapital: false },
  { name: "Ormoc", state: "Leyte", lat: 11.00639, lng: 124.6075, population: 238545, isCapital: false },
  { name: "Batangas", state: "Batangas", lat: 13.7567, lng: 121.0584, population: 237370, isCapital: false },
  { name: "Lucena", state: "Quezon", lat: 13.93139, lng: 121.61722, population: 228758, isCapital: false },
  { name: "Puerto Princesa", state: "Palawan", lat: 9.73917, lng: 118.73528, population: 222673, isCapital: false },
  { name: "Olongapo", state: "Zambales", lat: 14.82917, lng: 120.28278, population: 221178, isCapital: false },
  { name: "Legazpi", state: "Albay", lat: 13.1391, lng: 123.7438, population: 209533, isCapital: false },
  { name: "Naga City", state: "Camarines Sur", lat: 13.6218, lng: 123.1948, population: 209170, isCapital: false },
  { name: "Koronadal", state: "South Cotabato", lat: 6.50306, lng: 124.84694, population: 201844, isCapital: false },
  { name: "Dagupan", state: "Pangasinan", lat: 16.04313, lng: 120.33325, population: 171271, isCapital: false },
  { name: "Dumaguete", state: "Negros Oriental", lat: 9.30646, lng: 123.30769, population: 113541, isCapital: false },
  { name: "Laoag", state: "Ilocos Norte", lat: 18.1978, lng: 120.5957, population: 112117, isCapital: false },
  { name: "San Fernando", state: "Pampanga", lat: 10.1624, lng: 123.7076, population: 23706, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return PH_TOWNS.find((t) => t.name === name);
}
