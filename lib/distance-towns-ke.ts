/**
 * Kenya town dataset for the Distance Calculator tool family.
 * 'Capitals' here are Nairobi plus the seven former provincial
 * headquarters (Kenya replaced its 8 provinces with 47 counties in
 * 2010, but these historic hub towns remain the ones people search
 * for and drive between), plus major towns a general audience would
 * recognise. Coordinates and population sourced from GeoNames.
 * See ke-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const KE_TOWNS: DistanceTown[] = [
  { name: "Nairobi", state: "Nairobi County", lat: -1.28333, lng: 36.81667, population: 4397073, isCapital: true },
  { name: "Kakamega", state: "Western", lat: 0.28422, lng: 34.75229, population: 1867579, isCapital: true },
  { name: "Mombasa", state: "Coast", lat: -4.05466, lng: 39.66359, population: 1208333, isCapital: true },
  { name: "Nakuru", state: "Rift Valley", lat: -0.30719, lng: 36.07225, population: 570674, isCapital: true },
  { name: "Eldoret", state: "Rift Valley", lat: 0.52036, lng: 35.26993, population: 475716, isCapital: false },
  { name: "Kisumu", state: "Nyanza", lat: -0.10221, lng: 34.76171, population: 397957, isCapital: true },
  { name: "Thika", state: "Central", lat: -1.03326, lng: 37.06933, population: 251407, isCapital: false },
  { name: "Naivasha", state: "Rift Valley", lat: -0.71383, lng: 36.43261, population: 198444, isCapital: false },
  { name: "Garissa", state: "North Eastern", lat: -0.45275, lng: 39.64601, population: 163399, isCapital: true },
  { name: "Kitale", state: "Rift Valley", lat: 1.01572, lng: 35.00622, population: 162174, isCapital: false },
  { name: "Malindi", state: "Coast", lat: -3.21799, lng: 40.11692, population: 119859, isCapital: false },
  { name: "Mandera", state: "North Eastern", lat: 3.93726, lng: 41.85688, population: 114718, isCapital: false },
  { name: "Kisii", state: "Nyanza", lat: -0.68174, lng: 34.76666, population: 112417, isCapital: false },
  { name: "Wajir", state: "North Eastern", lat: 1.7471, lng: 40.05732, population: 90116, isCapital: false },
  { name: "Lodwar", state: "Rift Valley", lat: 3.11988, lng: 35.59642, population: 82970, isCapital: false },
  { name: "Meru", state: "Eastern", lat: 0.04626, lng: 37.65587, population: 80191, isCapital: false },
  { name: "Nyeri", state: "Central", lat: -0.42013, lng: 36.94759, population: 80081, isCapital: true },
  { name: "Isiolo", state: "Eastern", lat: 0.35462, lng: 37.58218, population: 78650, isCapital: false },
  { name: "Kilifi", state: "Coast", lat: -3.63045, lng: 39.84992, population: 74270, isCapital: false },
  { name: "Nanyuki", state: "Central", lat: 0.00624, lng: 37.07398, population: 72813, isCapital: false },
  { name: "Busia", state: "Western", lat: 0.46005, lng: 34.11169, population: 71886, isCapital: false },
  { name: "Migori", state: "Nyanza", lat: -1.06343, lng: 34.47313, population: 71668, isCapital: false },
  { name: "Bungoma", state: "Western", lat: 0.5635, lng: 34.56055, population: 68031, isCapital: false },
  { name: "Narok", state: "Rift Valley", lat: -1.08083, lng: 35.87111, population: 65430, isCapital: false },
  { name: "Embu", state: "Eastern", lat: -0.53987, lng: 37.45743, population: 64979, isCapital: true },
  { name: "Machakos", state: "Eastern", lat: -1.52233, lng: 37.26521, population: 63767, isCapital: false },
  { name: "Gilgil", state: "Rift Valley", lat: -0.50397, lng: 36.31845, population: 60711, isCapital: false },
  { name: "Kapenguria", state: "Rift Valley", lat: 1.23889, lng: 35.11194, population: 56000, isCapital: false },
  { name: "Kericho", state: "Rift Valley", lat: -0.36774, lng: 35.28314, population: 53804, isCapital: false },
  { name: "Voi", state: "Coast", lat: -3.39605, lng: 38.55609, population: 53353, isCapital: false },
  { name: "Molo", state: "Rift Valley", lat: -0.24849, lng: 35.73194, population: 48356, isCapital: false },
  { name: "Homa Bay", state: "Nyanza", lat: -0.52731, lng: 34.45714, population: 44949, isCapital: false },
  { name: "Iten", state: "Rift Valley", lat: 0.67028, lng: 35.50806, population: 42000, isCapital: false },
  { name: "Nyahururu", state: "Central", lat: 0.03813, lng: 36.36339, population: 37650, isCapital: false },
  { name: "Marsabit", state: "Eastern", lat: 2.33468, lng: 37.99086, population: 36289, isCapital: false },
  { name: "Maralal", state: "Rift Valley", lat: 1.09667, lng: 36.69806, population: 31350, isCapital: false },
  { name: "Kitui", state: "Eastern", lat: -1.36696, lng: 38.01055, population: 29062, isCapital: false },
  { name: "Lamu", state: "Coast", lat: -2.27169, lng: 40.90201, population: 25385, isCapital: false },
  { name: "Kabarnet", state: "Rift Valley", lat: 0.49194, lng: 35.74303, population: 24661, isCapital: false },
  { name: "Karatina", state: "Central", lat: -0.4841, lng: 37.12662, population: 23552, isCapital: false },
  { name: "Chuka", state: "Eastern", lat: -0.33316, lng: 37.64587, population: 22388, isCapital: false },
  { name: "Taveta", state: "Coast", lat: -3.39879, lng: 37.68336, population: 22018, isCapital: false },
  { name: "Malaba", state: "Western", lat: 0.63513, lng: 34.28165, population: 15581, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return KE_TOWNS.find((t) => t.name === name);
}
