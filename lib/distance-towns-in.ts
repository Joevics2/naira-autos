/**
 * India town dataset for the Distance Calculator tool family.
 * 12 major state-capital hubs plus 30 further major cities by
 * population. Coordinates from GeoNames; Mumbai/Delhi/Pune's own
 * metro-area satellite towns (Navi Mumbai, Thane, Ghaziabad, and
 * similar) are deliberately excluded as redundant, matching the
 * pattern used for other large metros in this tool.
 * See in-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const IN_TOWNS: DistanceTown[] = [
  { name: "Mumbai", state: "Maharashtra", lat: 19.07283, lng: 72.88261, population: 12691836, isCapital: false },
  { name: "Delhi", state: "Delhi (National Capital)", lat: 28.65195, lng: 77.23149, population: 11034555, isCapital: true },
  { name: "Bengaluru", state: "Karnataka", lat: 12.97194, lng: 77.59369, population: 8495492, isCapital: true },
  { name: "Hyderabad", state: "Telangana", lat: 17.38405, lng: 78.45636, population: 6993262, isCapital: true },
  { name: "Ahmedabad", state: "Gujarat", lat: 23.02579, lng: 72.58727, population: 6357693, isCapital: false },
  { name: "Chennai", state: "Tamil Nadu", lat: 13.08784, lng: 80.27847, population: 4681087, isCapital: true },
  { name: "Kolkata", state: "West Bengal", lat: 22.56263, lng: 88.36304, population: 4631392, isCapital: true },
  { name: "Surat", state: "Gujarat", lat: 21.19594, lng: 72.83023, population: 4591246, isCapital: false },
  { name: "Pune", state: "Maharashtra", lat: 18.51957, lng: 73.85535, population: 3124458, isCapital: false },
  { name: "Jaipur", state: "Rajasthan", lat: 26.91962, lng: 75.78781, population: 3046163, isCapital: true },
  { name: "Kanpur", state: "Uttar Pradesh", lat: 26.46523, lng: 80.34975, population: 2823249, isCapital: false },
  { name: "Lucknow", state: "Uttar Pradesh", lat: 26.83928, lng: 80.92313, population: 2472011, isCapital: true },
  { name: "Nagpur", state: "Maharashtra", lat: 21.14631, lng: 79.08491, population: 2405665, isCapital: false },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.00555, lng: 76.96612, population: 2136916, isCapital: false },
  { name: "Indore", state: "Madhya Pradesh", lat: 22.71792, lng: 75.8333, population: 1994397, isCapital: false },
  { name: "Vadodara", state: "Gujarat", lat: 22.29941, lng: 73.20812, population: 1822221, isCapital: false },
  { name: "Bhopal", state: "Madhya Pradesh", lat: 23.25469, lng: 77.40289, population: 1798218, isCapital: true },
  { name: "Patna", state: "Bihar", lat: 25.59408, lng: 85.13563, population: 1684297, isCapital: true },
  { name: "Ludhiana", state: "Punjab", lat: 30.91204, lng: 75.85379, population: 1618879, isCapital: false },
  { name: "Nashik", state: "Maharashtra", lat: 19.99727, lng: 73.79096, population: 1486053, isCapital: false },
  { name: "Madurai", state: "Tamil Nadu", lat: 9.919, lng: 78.11953, population: 1465625, isCapital: false },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.72742, lng: 77.6838, population: 1435844, isCapital: false },
  { name: "Agra", state: "Uttar Pradesh", lat: 27.18333, lng: 78.01667, population: 1430055, isCapital: false },
  { name: "Rajkot", state: "Gujarat", lat: 22.29161, lng: 70.79322, population: 1390640, isCapital: false },
  { name: "Jamshedpur", state: "Jharkhand", lat: 22.80278, lng: 86.18545, population: 1339438, isCapital: false },
  { name: "Meerut", state: "Uttar Pradesh", lat: 28.98002, lng: 77.70636, population: 1223184, isCapital: false },
  { name: "Srinagar", state: "Jammu & Kashmir", lat: 34.08565, lng: 74.80555, population: 1206419, isCapital: false },
  { name: "Dhanbad", state: "Jharkhand", lat: 23.79759, lng: 86.42992, population: 1196214, isCapital: false },
  { name: "Aurangabad", state: "Maharashtra", lat: 19.87757, lng: 75.34226, population: 1175116, isCapital: false },
  { name: "Varanasi", state: "Uttar Pradesh", lat: 25.31668, lng: 83.01041, population: 1164404, isCapital: false },
  { name: "Amritsar", state: "Punjab", lat: 31.62234, lng: 74.87534, population: 1159227, isCapital: false },
  { name: "Vijayawada", state: "Andhra Pradesh", lat: 16.50745, lng: 80.6466, population: 1143232, isCapital: false },
  { name: "Ranchi", state: "Jharkhand", lat: 23.34316, lng: 85.3094, population: 1120374, isCapital: true },
  { name: "Jabalpur", state: "Madhya Pradesh", lat: 23.16697, lng: 79.95006, population: 1081677, isCapital: false },
  { name: "Prayagraj", state: "Uttar Pradesh", lat: 25.44478, lng: 81.84322, population: 1073438, isCapital: false },
  { name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.68009, lng: 83.20161, population: 1063178, isCapital: false },
  { name: "Gwalior", state: "Madhya Pradesh", lat: 26.22983, lng: 78.17337, population: 1054420, isCapital: false },
  { name: "Tiruchirappalli", state: "Tamil Nadu", lat: 10.8155, lng: 78.69651, population: 1022518, isCapital: false },
  { name: "Kota", state: "Rajasthan", lat: 25.18254, lng: 75.83907, population: 1001694, isCapital: false },
  { name: "Solapur", state: "Maharashtra", lat: 17.67152, lng: 75.91044, population: 997281, isCapital: false },
  { name: "Chandigarh", state: "Punjab & Haryana", lat: 30.73629, lng: 76.7884, population: 970602, isCapital: true },
  { name: "Gorakhpur", state: "Uttar Pradesh", lat: 26.76628, lng: 83.36889, population: 674246, isCapital: false },
  { name: "Jodhpur", state: "Rajasthan", lat: 21.90174, lng: 70.0327, population: 47329, isCapital: false },
  { name: "Raipur", state: "Chhattisgarh", lat: 26.04259, lng: 74.02373, population: 17537, isCapital: true },
];

export function findTown(name: string): DistanceTown | undefined {
  return IN_TOWNS.find((t) => t.name === name);
}
