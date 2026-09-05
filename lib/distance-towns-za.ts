/**
 * South Africa town dataset for the Distance Calculator tool family.
 * All 9 provincial capitals plus Pretoria (the national executive
 * capital, distinct from Johannesburg despite sharing Gauteng), plus
 * major metros and towns a general audience would search for.
 * Coordinates and population sourced from the GeoNames database.
 * See za-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const ZA_TOWNS: DistanceTown[] = [
  { name: "Johannesburg", state: "Gauteng", lat: -26.20227, lng: 28.04363, population: 9418183, isCapital: true },
  { name: "Cape Town", state: "Western Cape", lat: -33.92584, lng: 18.42322, population: 4772846, isCapital: true },
  { name: "Durban", state: "KwaZulu-Natal", lat: -29.8579, lng: 31.0292, population: 3338026, isCapital: false },
  { name: "Pretoria", state: "Gauteng", lat: -25.74486, lng: 28.18783, population: 2112693, isCapital: true },
  { name: "Gqeberha", state: "Eastern Cape", lat: -33.96109, lng: 25.61494, population: 1050078, isCapital: false },
  { name: "Pietermaritzburg", state: "KwaZulu-Natal", lat: -29.61679, lng: 30.39278, population: 839327, isCapital: true },
  { name: "Bloemfontein", state: "Free State", lat: -29.12107, lng: 26.214, population: 556637, isCapital: true },
  { name: "East London", state: "Eastern Cape", lat: -33.01529, lng: 27.91162, population: 478676, isCapital: false },
  { name: "Welkom", state: "Free State", lat: -27.97742, lng: 26.73506, population: 431944, isCapital: false },
  { name: "Newcastle", state: "KwaZulu-Natal", lat: -27.75796, lng: 29.9318, population: 404838, isCapital: false },
  { name: "Rustenburg", state: "North West", lat: -25.66756, lng: 27.24208, population: 373695, isCapital: false },
  { name: "Polokwane", state: "Limpopo", lat: -23.90449, lng: 29.46885, population: 272461, isCapital: true },
  { name: "Richards Bay", state: "KwaZulu-Natal", lat: -28.78301, lng: 32.03768, population: 252968, isCapital: false },
  { name: "Paarl", state: "Western Cape", lat: -33.73378, lng: 18.97523, population: 236910, isCapital: false },
  { name: "Klerksdorp", state: "North West", lat: -26.85213, lng: 26.66672, population: 227039, isCapital: false },
  { name: "Somerset West", state: "Western Cape", lat: -34.08401, lng: 18.82113, population: 225289, isCapital: false },
  { name: "George", state: "Western Cape", lat: -33.963, lng: 22.46173, population: 188580, isCapital: false },
  { name: "Potchefstroom", state: "North West", lat: -26.71667, lng: 27.1, population: 178285, isCapital: false },
  { name: "Mthatha", state: "Eastern Cape", lat: -31.58893, lng: 28.78443, population: 164848, isCapital: false },
  { name: "Vryheid", state: "KwaZulu-Natal", lat: -27.76952, lng: 30.79165, population: 150012, isCapital: false },
  { name: "Ladysmith", state: "KwaZulu-Natal", lat: -28.55874, lng: 29.77896, population: 143446, isCapital: false },
  { name: "Kimberley", state: "Northern Cape", lat: -28.73226, lng: 24.76232, population: 142089, isCapital: true },
  { name: "Bhisho", state: "Eastern Cape", lat: -32.84721, lng: 27.44218, population: 137287, isCapital: true },
  { name: "Sasolburg", state: "Free State", lat: -26.81358, lng: 27.81695, population: 135828, isCapital: false },
  { name: "Worcester", state: "Western Cape", lat: -33.64651, lng: 19.44852, population: 127597, isCapital: false },
  { name: "Queenstown", state: "Eastern Cape", lat: -31.89756, lng: 26.87533, population: 118599, isCapital: false },
  { name: "Kroonstad", state: "Free State", lat: -27.65036, lng: 27.23488, population: 117152, isCapital: false },
  { name: "Mbombela", state: "Mpumalanga", lat: -25.47512, lng: 30.96935, population: 110159, isCapital: true },
  { name: "Phalaborwa", state: "Limpopo", lat: -23.94299, lng: 31.14107, population: 109468, isCapital: false },
  { name: "Thohoyandou", state: "Limpopo", lat: -22.94564, lng: 30.48497, population: 107144, isCapital: false },
  { name: "Standerton", state: "Mpumalanga", lat: -26.93366, lng: 29.24152, population: 101101, isCapital: false },
  { name: "Ermelo", state: "Mpumalanga", lat: -26.53333, lng: 29.98333, population: 100324, isCapital: false },
  { name: "Stellenbosch", state: "Western Cape", lat: -33.93462, lng: 18.86676, population: 96228, isCapital: false },
  { name: "Mossel Bay", state: "Western Cape", lat: -34.18307, lng: 22.14605, population: 78940, isCapital: false },
  { name: "Mahikeng", state: "North West", lat: -25.86522, lng: 25.64421, population: 77110, isCapital: true },
  { name: "Oudtshoorn", state: "Western Cape", lat: -33.60047, lng: 22.19955, population: 73694, isCapital: false },
  { name: "Upington", state: "Northern Cape", lat: -28.44776, lng: 21.25612, population: 71373, isCapital: false },
  { name: "Knysna", state: "Western Cape", lat: -34.03627, lng: 23.04713, population: 68659, isCapital: false },
  { name: "Kokstad", state: "KwaZulu-Natal", lat: -30.54723, lng: 29.42412, population: 61751, isCapital: false },
  { name: "Hermanus", state: "Western Cape", lat: -34.4187, lng: 19.23446, population: 56139, isCapital: false },
  { name: "Vryburg", state: "North West", lat: -26.95659, lng: 24.7284, population: 55879, isCapital: false },
  { name: "Musina", state: "Limpopo", lat: -22.34881, lng: 30.04074, population: 51132, isCapital: false },
  { name: "Beaufort West", state: "Western Cape", lat: -32.35671, lng: 22.58295, population: 44737, isCapital: false },
  { name: "Empangeni", state: "KwaZulu-Natal", lat: -28.76197, lng: 31.89329, population: 33075, isCapital: false },
  { name: "Middelburg", state: "Mpumalanga", lat: -31.49285, lng: 25.00633, population: 22380, isCapital: false },
  { name: "Tzaneen", state: "Limpopo", lat: -23.83322, lng: 30.16351, population: 17457, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return ZA_TOWNS.find((t) => t.name === name);
}
