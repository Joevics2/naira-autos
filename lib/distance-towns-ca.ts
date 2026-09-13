/**
 * Canada town dataset for the Distance Calculator tool family.
 * All 13 provincial/territorial capitals (including Ottawa, the
 * federal capital) plus 22 further major cities. Coordinates from
 * GeoNames; Iqaluit's coordinates were sourced independently since
 * it isn't in that dataset. Toronto, Montreal, and Vancouver's own
 * satellite/commuter towns are deliberately excluded as redundant,
 * matching the pattern used for other large metros in this tool.
 * See ca-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const CA_TOWNS: DistanceTown[] = [
  { name: "Toronto", state: "Ontario", lat: 43.70643, lng: -79.39864, population: 2794356, isCapital: true },
  { name: "Montreal", state: "Quebec", lat: 45.50884, lng: -73.58781, population: 1762949, isCapital: false },
  { name: "Calgary", state: "Alberta", lat: 51.05011, lng: -114.08529, population: 1306784, isCapital: false },
  { name: "Ottawa", state: "Ontario (Federal Capital)", lat: 45.41117, lng: -75.69812, population: 1017449, isCapital: true },
  { name: "Edmonton", state: "Alberta", lat: 53.55014, lng: -113.46871, population: 1010899, isCapital: true },
  { name: "Winnipeg", state: "Manitoba", lat: 49.8844, lng: -97.14704, population: 749607, isCapital: true },
  { name: "Vancouver", state: "British Columbia", lat: 49.24966, lng: -123.11934, population: 662248, isCapital: false },
  { name: "Hamilton", state: "Ontario", lat: 43.25011, lng: -79.84963, population: 569353, isCapital: false },
  { name: "Quebec City", state: "Quebec", lat: 46.81228, lng: -71.21454, population: 531902, isCapital: true },
  { name: "Halifax", state: "Nova Scotia", lat: 44.64269, lng: -63.57688, population: 471559, isCapital: true },
  { name: "London", state: "Ontario", lat: 42.98339, lng: -81.23304, population: 422324, isCapital: false },
  { name: "Gatineau", state: "Quebec", lat: 45.47723, lng: -75.70164, population: 300045, isCapital: false },
  { name: "Victoria", state: "British Columbia", lat: 48.4359, lng: -123.35155, population: 289625, isCapital: true },
  { name: "Saskatoon", state: "Saskatchewan", lat: 52.13238, lng: -106.66892, population: 266141, isCapital: false },
  { name: "Kitchener", state: "Ontario", lat: 43.42537, lng: -80.5112, population: 256885, isCapital: false },
  { name: "Windsor", state: "Ontario", lat: 42.30008, lng: -83.01654, population: 229660, isCapital: false },
  { name: "Regina", state: "Saskatchewan", lat: 50.45008, lng: -104.6178, population: 226404, isCapital: true },
  { name: "Oshawa", state: "Ontario", lat: 43.90012, lng: -78.84957, population: 175383, isCapital: false },
  { name: "Greater Sudbury", state: "Ontario", lat: 46.49, lng: -80.99001, population: 166004, isCapital: false },
  { name: "Saguenay", state: "Quebec", lat: 48.41675, lng: -71.06573, population: 148886, isCapital: false },
  { name: "Barrie", state: "Ontario", lat: 44.40011, lng: -79.66634, population: 147829, isCapital: false },
  { name: "Kelowna", state: "British Columbia", lat: 49.88307, lng: -119.48568, population: 144576, isCapital: false },
  { name: "Trois-Rivi\u00e8res", state: "Quebec", lat: 46.34515, lng: -72.5477, population: 144472, isCapital: false },
  { name: "Guelph", state: "Ontario", lat: 43.54594, lng: -80.25599, population: 143740, isCapital: false },
  { name: "L\u00e9vis", state: "Quebec", lat: 46.80326, lng: -71.17793, population: 143414, isCapital: false },
  { name: "Abbotsford", state: "British Columbia", lat: 49.05798, lng: -122.25257, population: 141397, isCapital: false },
  { name: "St. Catharines", state: "Ontario", lat: 43.17126, lng: -79.24267, population: 136803, isCapital: false },
  { name: "Kingston", state: "Ontario", lat: 44.22976, lng: -76.48098, population: 132485, isCapital: false },
  { name: "Sherbrooke", state: "Quebec", lat: 45.40008, lng: -71.89908, population: 129447, isCapital: false },
  { name: "St. John's", state: "Newfoundland and Labrador", lat: 47.56494, lng: -52.70931, population: 110525, isCapital: true },
  { name: "Moncton", state: "New Brunswick", lat: 46.09454, lng: -64.7965, population: 86106, isCapital: false },
  { name: "Fredericton", state: "New Brunswick", lat: 45.94541, lng: -66.66558, population: 63116, isCapital: true },
  { name: "Charlottetown", state: "Prince Edward Island", lat: 46.23459, lng: -63.1256, population: 38809, isCapital: true },
  { name: "Whitehorse", state: "Yukon", lat: 60.71611, lng: -135.05375, population: 28201, isCapital: true },
  { name: "Yellowknife", state: "Northwest Territories", lat: 62.45411, lng: -114.37248, population: 20340, isCapital: true },
  { name: "Iqaluit", state: "Nunavut", lat: 63.7467, lng: -68.517, population: 7740, isCapital: true },
];

export function findTown(name: string): DistanceTown | undefined {
  return CA_TOWNS.find((t) => t.name === name);
}
