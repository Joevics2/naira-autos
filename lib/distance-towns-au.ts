/**
 * Australia town dataset for the Distance Calculator tool family.
 * All 8 state/territory capitals plus 19 further major regional
 * cities. Coordinates from GeoNames; Melbourne/Sydney/Brisbane's own
 * metro suburbs are deliberately excluded as redundant.
 * See au-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const AU_TOWNS: DistanceTown[] = [
  { name: "Sydney", state: "New South Wales", lat: -33.86785, lng: 151.20732, population: 5638830, isCapital: true },
  { name: "Melbourne", state: "Victoria", lat: -37.814, lng: 144.96332, population: 5435590, isCapital: true },
  { name: "Brisbane", state: "Queensland", lat: -27.46794, lng: 153.02809, population: 2780063, isCapital: true },
  { name: "Perth", state: "Western Australia", lat: -31.95224, lng: 115.8614, population: 2384371, isCapital: true },
  { name: "Adelaide", state: "South Australia", lat: -34.92866, lng: 138.59863, population: 1469163, isCapital: true },
  { name: "Gold Coast", state: "Queensland", lat: -28.00029, lng: 153.43088, population: 640778, isCapital: false },
  { name: "Newcastle", state: "New South Wales", lat: -32.92953, lng: 151.7801, population: 508437, isCapital: false },
  { name: "Sunshine Coast", state: "Queensland", lat: -26.65682, lng: 153.07955, population: 398840, isCapital: false },
  { name: "Canberra", state: "Australian Capital Territory (Federal Capital)", lat: -35.28346, lng: 149.12807, population: 367752, isCapital: true },
  { name: "Geelong", state: "Victoria", lat: -38.14711, lng: 144.36069, population: 282809, isCapital: false },
  { name: "Wollongong", state: "New South Wales", lat: -34.424, lng: 150.89345, population: 280153, isCapital: false },
  { name: "Hobart", state: "Tasmania", lat: -42.87936, lng: 147.32941, population: 254930, isCapital: true },
  { name: "Townsville", state: "Queensland", lat: -19.26639, lng: 146.80569, population: 201313, isCapital: false },
  { name: "Cairns", state: "Queensland", lat: -16.92366, lng: 145.76613, population: 153075, isCapital: false },
  { name: "Toowoomba", state: "Queensland", lat: -27.56056, lng: 151.95386, population: 142163, isCapital: false },
  { name: "Darwin", state: "Northern Territory", lat: -12.46113, lng: 130.84185, population: 139902, isCapital: true },
  { name: "Ballarat", state: "Victoria", lat: -37.56622, lng: 143.84957, population: 111973, isCapital: false },
  { name: "Mandurah", state: "Western Australia", lat: -32.5269, lng: 115.7217, population: 107643, isCapital: false },
  { name: "Bendigo", state: "Victoria", lat: -36.75818, lng: 144.28024, population: 103034, isCapital: false },
  { name: "Launceston", state: "Tasmania", lat: -41.43876, lng: 147.13467, population: 90953, isCapital: false },
  { name: "Mackay", state: "Queensland", lat: -21.15345, lng: 149.16554, population: 84333, isCapital: false },
  { name: "Rockhampton", state: "Queensland", lat: -23.38032, lng: 150.50595, population: 81021, isCapital: false },
  { name: "Coffs Harbour", state: "New South Wales", lat: -30.29626, lng: 153.11351, population: 78759, isCapital: false },
  { name: "Bunbury", state: "Western Australia", lat: -33.32711, lng: 115.64137, population: 76452, isCapital: false },
  { name: "Bundaberg", state: "Queensland", lat: -24.86621, lng: 152.3479, population: 73747, isCapital: false },
  { name: "Hervey Bay", state: "Queensland", lat: -25.28762, lng: 152.76936, population: 52230, isCapital: false },
  { name: "Port Macquarie", state: "New South Wales", lat: -31.43084, lng: 152.90894, population: 51965, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return AU_TOWNS.find((t) => t.name === name);
}
