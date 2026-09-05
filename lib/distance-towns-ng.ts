/**
 * Nigeria town dataset for the Distance Calculator tool family.
 * 37 state capitals (all 36 states + FCT) plus the major commercial
 * centres a general audience would actually search for (Onitsha, Aba,
 * Zaria, Warri, etc). Coordinates and population sourced from the
 * GeoNames database. State capitals carry `isCapital: true` — that's
 * also what determines whether a pair has a verified road-distance entry
 * in ng-distance-matrix.ts (see that file for sourcing).
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const NG_TOWNS: DistanceTown[] = [
  { name: "Lagos", state: "Lagos", lat: 6.45407, lng: 3.39467, population: 15388000, isCapital: true },
  { name: "Kano", state: "Kano", lat: 12.00012, lng: 8.51672, population: 4910000, isCapital: true },
  { name: "Ibadan", state: "Oyo", lat: 7.37756, lng: 3.90591, population: 3649000, isCapital: true },
  { name: "Abuja", state: "FCT", lat: 9.05785, lng: 7.49508, population: 2690000, isCapital: true },
  { name: "Port Harcourt", state: "Rivers", lat: 4.77742, lng: 7.0134, population: 2120000, isCapital: true },
  { name: "Kaduna", state: "Kaduna", lat: 10.52641, lng: 7.43879, population: 1850000, isCapital: true },
  { name: "Benin City", state: "Edo", lat: 6.33815, lng: 5.62575, population: 1782000, isCapital: true },
  { name: "Onitsha", state: "Anambra", lat: 6.14978, lng: 6.78569, population: 1553000, isCapital: false },
  { name: "Aba", state: "Abia", lat: 5.10658, lng: 7.36667, population: 1160000, isCapital: false },
  { name: "Maiduguri", state: "Borno", lat: 11.84692, lng: 13.15712, population: 1110000, isCapital: true },
  { name: "Ilorin", state: "Kwara", lat: 8.49664, lng: 4.54214, population: 1080000, isCapital: true },
  { name: "Jos", state: "Plateau", lat: 9.92849, lng: 8.89212, population: 1040000, isCapital: true },
  { name: "Sokoto", state: "Sokoto", lat: 13.06269, lng: 5.24322, population: 1040000, isCapital: true },
  { name: "Zaria", state: "Kaduna", lat: 11.11128, lng: 7.7227, population: 980000, isCapital: false },
  { name: "Enugu", state: "Enugu", lat: 6.44132, lng: 7.49883, population: 950000, isCapital: true },
  { name: "Warri", state: "Delta", lat: 5.51737, lng: 5.75006, population: 910000, isCapital: false },
  { name: "Oyo", state: "Oyo", lat: 7.85367, lng: 3.93235, population: 736072, isCapital: false },
  { name: "Abeokuta", state: "Ogun", lat: 7.15571, lng: 3.34509, population: 735000, isCapital: true },
  { name: "Akure", state: "Ondo", lat: 7.25256, lng: 5.19312, population: 730000, isCapital: true },
  { name: "Bauchi", state: "Bauchi", lat: 10.31032, lng: 9.84388, population: 693700, isCapital: true },
  { name: "Katsina", state: "Katsina", lat: 12.99082, lng: 7.60177, population: 670000, isCapital: true },
  { name: "Osogbo", state: "Osun", lat: 7.77104, lng: 4.55698, population: 645000, isCapital: true },
  { name: "Gombe", state: "Gombe", lat: 10.28969, lng: 11.16729, population: 560000, isCapital: true },
  { name: "Ile-Ife", state: "Osun", lat: 7.4824, lng: 4.56032, population: 560000, isCapital: false },
  { name: "Owerri", state: "Imo", lat: 5.48363, lng: 7.03325, population: 545000, isCapital: true },
  { name: "Calabar", state: "Cross River", lat: 4.95893, lng: 8.32695, population: 540000, isCapital: true },
  { name: "Okene", state: "Kogi", lat: 7.55122, lng: 6.23589, population: 479178, isCapital: false },
  { name: "Ikare", state: "Ondo", lat: 7.52591, lng: 5.75342, population: 465000, isCapital: false },
  { name: "Yola", state: "Adamawa", lat: 9.20839, lng: 12.48146, population: 460000, isCapital: true },
  { name: "Uyo", state: "Akwa Ibom", lat: 5.05127, lng: 7.9335, population: 436606, isCapital: true },
  { name: "Ado Ekiti", state: "Ekiti", lat: 7.62329, lng: 5.22087, population: 435000, isCapital: true },
  { name: "Ogbomoso", state: "Oyo", lat: 8.13373, lng: 4.24014, population: 433030, isCapital: false },
  { name: "Minna", state: "Niger", lat: 9.61524, lng: 6.54776, population: 425000, isCapital: true },
  { name: "Bida", state: "Niger", lat: 9.08044, lng: 6.0099, population: 400000, isCapital: false },
  { name: "Makurdi", state: "Benue", lat: 7.73375, lng: 8.52139, population: 390000, isCapital: true },
  { name: "Ondo", state: "Ondo", lat: 7.09316, lng: 4.83528, population: 375000, isCapital: false },
  { name: "Umuahia", state: "Abia", lat: 5.52491, lng: 7.49461, population: 370000, isCapital: true },
  { name: "Iseyin", state: "Oyo", lat: 7.97022, lng: 3.59626, population: 365300, isCapital: false },
  { name: "Yenagoa", state: "Bayelsa", lat: 4.92675, lng: 6.26764, population: 365000, isCapital: true },
  { name: "Gboko", state: "Benue", lat: 7.32275, lng: 9.00108, population: 365000, isCapital: false },
  { name: "Ijebu Ode", state: "Ogun", lat: 6.81944, lng: 3.91731, population: 360000, isCapital: false },
  { name: "Ilesa", state: "Osun", lat: 7.62789, lng: 4.74161, population: 325000, isCapital: false },
  { name: "Sapele", state: "Delta", lat: 5.89405, lng: 5.67666, population: 305000, isCapital: false },
  { name: "Owo", state: "Ondo", lat: 7.1962, lng: 5.58681, population: 276574, isCapital: false },
  { name: "Ikot Ekpene", state: "Akwa Ibom", lat: 5.18194, lng: 7.71481, population: 254806, isCapital: false },
  { name: "Ota", state: "Ogun", lat: 6.68867, lng: 3.23202, population: 251546, isCapital: false },
  { name: "Iwo", state: "Osun", lat: 7.63527, lng: 4.18156, population: 250443, isCapital: false },
  { name: "Gusau", state: "Zamfara", lat: 12.17024, lng: 6.66412, population: 226857, isCapital: true },
  { name: "Mubi", state: "Adamawa", lat: 10.26858, lng: 13.26701, population: 225705, isCapital: false },
  { name: "Shagamu", state: "Ogun", lat: 6.8485, lng: 3.64633, population: 214558, isCapital: false },
  { name: "Nnewi", state: "Anambra", lat: 6.01962, lng: 6.91729, population: 193987, isCapital: false },
  { name: "Saki", state: "Oyo", lat: 8.66762, lng: 3.39393, population: 178677, isCapital: false },
  { name: "Awka", state: "Anambra", lat: 6.21269, lng: 7.07199, population: 167738, isCapital: true },
  { name: "Suleja", state: "Niger", lat: 9.18059, lng: 7.17939, population: 162135, isCapital: false },
  { name: "Ede", state: "Osun", lat: 7.73635, lng: 4.43536, population: 159866, isCapital: false },
  { name: "Funtua", state: "Katsina", lat: 11.52351, lng: 7.31174, population: 136811, isCapital: false },
  { name: "Buguma", state: "Rivers", lat: 4.73614, lng: 6.86236, population: 135404, isCapital: false },
  { name: "Abakaliki", state: "Ebonyi", lat: 6.32485, lng: 8.11368, population: 134102, isCapital: true },
  { name: "Okrika", state: "Rivers", lat: 4.74215, lng: 7.08368, population: 133271, isCapital: false },
  { name: "Lafia", state: "Nasarawa", lat: 8.4939, lng: 8.51532, population: 127236, isCapital: true },
  { name: "Gashua", state: "Yobe", lat: 12.87398, lng: 11.04057, population: 125817, isCapital: false },
  { name: "Bama", state: "Borno", lat: 11.52134, lng: 13.68952, population: 118121, isCapital: false },
  { name: "Jalingo", state: "Taraba", lat: 8.89367, lng: 11.3596, population: 117757, isCapital: true },
  { name: "Okigwe", state: "Imo", lat: 5.82917, lng: 7.35056, population: 115499, isCapital: false },
  { name: "Offa", state: "Kwara", lat: 8.14911, lng: 4.72074, population: 113830, isCapital: false },
  { name: "Nsukka", state: "Enugu", lat: 6.85783, lng: 7.39577, population: 111017, isCapital: false },
  { name: "Nguru", state: "Yobe", lat: 12.87695, lng: 10.45536, population: 111014, isCapital: false },
  { name: "Hadejia", state: "Jigawa", lat: 12.45347, lng: 10.04115, population: 110753, isCapital: false },
  { name: "Ijebu-Igbo", state: "Ogun", lat: 6.97198, lng: 3.99938, population: 109261, isCapital: false },
  { name: "Uromi", state: "Edo", lat: 6.7, lng: 6.33333, population: 108608, isCapital: false },
  { name: "Birnin Kebbi", state: "Kebbi", lat: 12.45389, lng: 4.1975, population: 108164, isCapital: true },
  { name: "Azare", state: "Bauchi", lat: 11.67478, lng: 10.19069, population: 105687, isCapital: false },
  { name: "Lafiagi", state: "Kwara", lat: 8.85299, lng: 5.41641, population: 102779, isCapital: false },
  { name: "Kontagora", state: "Niger", lat: 10.40319, lng: 5.4708, population: 98754, isCapital: false },
  { name: "Biu", state: "Borno", lat: 10.61285, lng: 12.19458, population: 95005, isCapital: false },
  { name: "Wukari", state: "Taraba", lat: 7.87139, lng: 9.77786, population: 92933, isCapital: false },
  { name: "Potiskum", state: "Yobe", lat: 11.71391, lng: 11.08108, population: 86002, isCapital: false },
  { name: "Epe", state: "Lagos", lat: 6.58412, lng: 3.98336, population: 84711, isCapital: false },
  { name: "Asaba", state: "Delta", lat: 6.19824, lng: 6.73187, population: 73374, isCapital: true },
  { name: "Kaura Namoda", state: "Zamfara", lat: 12.59371, lng: 6.58648, population: 69725, isCapital: false },
  { name: "Lokoja", state: "Kogi", lat: 7.79688, lng: 6.74048, population: 60579, isCapital: true },
  { name: "Damaturu", state: "Yobe", lat: 11.74697, lng: 11.96083, population: 46000, isCapital: true },
  { name: "Argungu", state: "Kebbi", lat: 12.74482, lng: 4.52514, population: 45584, isCapital: false },
  { name: "Badagry", state: "Lagos", lat: 6.41502, lng: 2.88132, population: 26383, isCapital: false },
  { name: "Dutse", state: "Jigawa", lat: 11.75618, lng: 9.33896, population: 17129, isCapital: true },
];

export function findTown(name: string): DistanceTown | undefined {
  return NG_TOWNS.find((t) => t.name === name);
}

/** Towns sorted by population — used to seed the default picker list. */
export function topTowns(n: number): DistanceTown[] {
  return [...NG_TOWNS].sort((a, b) => b.population - a.population).slice(0, n);
}
