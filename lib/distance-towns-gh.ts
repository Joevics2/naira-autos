/**
 * Ghana town dataset for the Distance Calculator tool family.
 * 16 regional capitals plus major commercial/historic towns a
 * general audience would search for. Coordinates and population
 * sourced from the GeoNames database (Sefwi Wiawso's coordinates
 * came from Ghana Highway Authority route documentation, since it
 * isn't in GeoNames). See gh-distance-pairs.ts for sourcing on
 * which routes have a verified road distance vs. an estimate.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const GH_TOWNS: DistanceTown[] = [
  { name: "Kumasi", state: "Ashanti", lat: 6.68848, lng: -1.62443, population: 2544530, isCapital: true },
  { name: "Accra", state: "Greater Accra", lat: 5.55602, lng: -0.1969, population: 1963264, isCapital: true },
  { name: "Tamale", state: "Northern", lat: 9.40079, lng: -0.8393, population: 464316, isCapital: true },
  { name: "Cape Coast", state: "Central", lat: 5.10535, lng: -1.2466, population: 212426, isCapital: true },
  { name: "Obuase", state: "Ashanti", lat: 6.20228, lng: -1.66796, population: 179604, isCapital: false },
  { name: "Koforidua", state: "Eastern", lat: 6.09408, lng: -0.25913, population: 151255, isCapital: true },
  { name: "Sekondi-Takoradi", state: "Western", lat: 4.92678, lng: -1.75773, population: 138872, isCapital: true },
  { name: "Ho", state: "Volta", lat: 6.60084, lng: 0.4713, population: 130701, isCapital: true },
  { name: "Sunyani", state: "Bono", lat: 7.33991, lng: -2.32676, population: 92825, isCapital: true },
  { name: "Hohoe", state: "Volta", lat: 7.15181, lng: 0.47362, population: 92076, isCapital: false },
  { name: "Jirapa", state: "Upper West", lat: 10.53689, lng: -2.70155, population: 91279, isCapital: false },
  { name: "Techiman", state: "Bono East", lat: 7.59054, lng: -1.93947, population: 84074, isCapital: true },
  { name: "Bolgatanga", state: "Upper East", lat: 10.78556, lng: -0.85139, population: 81958, isCapital: true },
  { name: "Wa", state: "Upper West", lat: 10.06069, lng: -2.50192, population: 78107, isCapital: true },
  { name: "Bawku", state: "Upper East", lat: 11.05926, lng: -0.24249, population: 76459, isCapital: false },
  { name: "Winneba", state: "Central", lat: 5.35113, lng: -0.62313, population: 71288, isCapital: false },
  { name: "Ejura", state: "Ashanti", lat: 7.38558, lng: -1.35617, population: 70807, isCapital: false },
  { name: "Berekum", state: "Bono", lat: 7.4534, lng: -2.58404, population: 70536, isCapital: false },
  { name: "Aflao", state: "Volta", lat: 6.11982, lng: 1.19012, population: 66546, isCapital: false },
  { name: "Yendi", state: "Northern", lat: 9.44272, lng: -0.00991, population: 64676, isCapital: false },
  { name: "Akim Oda", state: "Eastern", lat: 5.92665, lng: -0.98577, population: 60604, isCapital: false },
  { name: "Swedru", state: "Central", lat: 5.53711, lng: -0.69984, population: 54417, isCapital: false },
  { name: "Kintampo", state: "Bono East", lat: 8.05627, lng: -1.73058, population: 53711, isCapital: false },
  { name: "Mampong", state: "Ashanti", lat: 7.06273, lng: -1.4001, population: 51745, isCapital: false },
  { name: "Suhum", state: "Eastern", lat: 6.04089, lng: -0.45004, population: 50610, isCapital: false },
  { name: "Tarkwa", state: "Western", lat: 5.30383, lng: -1.98956, population: 49937, isCapital: false },
  { name: "Nsawam", state: "Eastern", lat: 5.80893, lng: -0.35026, population: 48885, isCapital: false },
  { name: "Nkawkaw", state: "Eastern", lat: 6.54584, lng: -0.76264, population: 47968, isCapital: false },
  { name: "Agogo", state: "Ashanti", lat: 6.80004, lng: -1.08193, population: 46089, isCapital: false },
  { name: "Asamankese", state: "Eastern", lat: 5.86006, lng: -0.6635, population: 46061, isCapital: false },
  { name: "Wankyi", state: "Bono", lat: 7.73855, lng: -2.1036, population: 45877, isCapital: false },
  { name: "Konongo", state: "Ashanti", lat: 6.61667, lng: -1.21667, population: 43585, isCapital: false },
  { name: "Dunkwa", state: "Central", lat: 5.95996, lng: -1.77792, population: 42737, isCapital: false },
  { name: "Mankesim", state: "Central", lat: 5.2717, lng: -1.0152, population: 41541, isCapital: false },
  { name: "Savelugu", state: "Northern", lat: 9.62376, lng: -0.82705, population: 40654, isCapital: false },
  { name: "Domaa-Ahenkro", state: "Bono", lat: 7.27386, lng: -2.87348, population: 37354, isCapital: false },
  { name: "Assin Foso", state: "Central", lat: 5.7, lng: -1.65, population: 37230, isCapital: false },
  { name: "Bibiani", state: "Western North", lat: 6.45196, lng: -2.31635, population: 36487, isCapital: false },
  { name: "Mim", state: "Ahafo", lat: 6.90412, lng: -2.56114, population: 36211, isCapital: false },
  { name: "Prestea", state: "Western", lat: 5.43385, lng: -2.14295, population: 35611, isCapital: false },
  { name: "Nkoranza", state: "Bono East", lat: 7.57127, lng: -1.7087, population: 35401, isCapital: false },
  { name: "Elmina", state: "Central", lat: 5.0847, lng: -1.35093, population: 34403, isCapital: false },
  { name: "Bimbila", state: "Northern", lat: 8.85488, lng: 0.05922, population: 34262, isCapital: false },
  { name: "Anloga", state: "Volta", lat: 5.79473, lng: 0.89728, population: 34050, isCapital: false },
  { name: "Akwatia", state: "Eastern", lat: 6.04024, lng: -0.80876, population: 33784, isCapital: false },
  { name: "Sefwi Wiawso", state: "Western North", lat: 6.2058, lng: -2.4894, population: 30000, isCapital: true },
  { name: "Salaga", state: "Savannah", lat: 8.55083, lng: -0.51875, population: 25472, isCapital: false },
  { name: "Navrongo", state: "Upper East", lat: 10.89469, lng: -1.09083, population: 25470, isCapital: false },
  { name: "Damongo", state: "Savannah", lat: 9.08296, lng: -1.81884, population: 23544, isCapital: true },
  { name: "Dambai", state: "Oti", lat: 8.06616, lng: 0.17947, population: 22445, isCapital: true },
  { name: "Goaso", state: "Ahafo", lat: 6.80355, lng: -2.5172, population: 21798, isCapital: true },
  { name: "Keta", state: "Volta", lat: 5.91793, lng: 0.98789, population: 18077, isCapital: false },
  { name: "Nalerigu", state: "North East", lat: 10.52726, lng: -0.36982, population: 17440, isCapital: true },
];

export function findTown(name: string): DistanceTown | undefined {
  return GH_TOWNS.find((t) => t.name === name);
}
