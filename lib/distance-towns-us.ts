/**
 * United States town dataset for the Distance Calculator tool
 * family. Top 62 US cities by population (NYC boroughs and other
 * same-metro neighbourhoods excluded as redundant), coordinates
 * from GeoNames. Note: geonamescache's highest-population 'Cleveland'
 * entry is actually Cleveland, TN - Cleveland, OH was added
 * separately with corrected coordinates.
 * See us-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const US_TOWNS: DistanceTown[] = [
  { name: "New York City", state: "New York", lat: 40.71427, lng: -74.00597, population: 8804190, isCapital: false },
  { name: "Los Angeles", state: "California", lat: 34.05223, lng: -118.24368, population: 3820914, isCapital: false },
  { name: "Chicago", state: "Illinois", lat: 41.85003, lng: -87.65005, population: 2664452, isCapital: false },
  { name: "Houston", state: "Texas", lat: 29.76328, lng: -95.36327, population: 2314157, isCapital: false },
  { name: "Phoenix", state: "Arizona", lat: 33.44838, lng: -112.07404, population: 1650070, isCapital: false },
  { name: "Philadelphia", state: "Pennsylvania", lat: 39.95238, lng: -75.16362, population: 1573916, isCapital: false },
  { name: "San Antonio", state: "Texas", lat: 29.42412, lng: -98.49363, population: 1526656, isCapital: false },
  { name: "San Diego", state: "California", lat: 32.71571, lng: -117.16472, population: 1404452, isCapital: false },
  { name: "Dallas", state: "Texas", lat: 32.78306, lng: -96.80667, population: 1326087, isCapital: false },
  { name: "Jacksonville", state: "Florida", lat: 30.33218, lng: -81.65565, population: 1009833, isCapital: false },
  { name: "Fort Worth", state: "Texas", lat: 32.72541, lng: -97.32085, population: 1008106, isCapital: false },
  { name: "San Jose", state: "California", lat: 37.33939, lng: -121.89496, population: 997368, isCapital: false },
  { name: "Austin", state: "Texas", lat: 30.26715, lng: -97.74306, population: 974447, isCapital: false },
  { name: "Columbus", state: "Ohio", lat: 39.96118, lng: -82.99879, population: 913175, isCapital: false },
  { name: "Charlotte", state: "North Carolina", lat: 35.22709, lng: -80.84313, population: 911311, isCapital: false },
  { name: "Indianapolis", state: "Indiana", lat: 39.76838, lng: -86.15804, population: 887642, isCapital: false },
  { name: "San Francisco", state: "California", lat: 37.77493, lng: -122.41942, population: 827526, isCapital: false },
  { name: "Seattle", state: "Washington", lat: 47.60621, lng: -122.33207, population: 780995, isCapital: false },
  { name: "Denver", state: "Colorado", lat: 39.73915, lng: -104.9847, population: 729019, isCapital: false },
  { name: "Washington", state: "District of Columbia", lat: 38.89511, lng: -77.03637, population: 689545, isCapital: false },
  { name: "Nashville", state: "Tennessee", lat: 36.16589, lng: -86.78444, population: 689447, isCapital: false },
  { name: "Oklahoma City", state: "Oklahoma", lat: 35.46756, lng: -97.51643, population: 681054, isCapital: false },
  { name: "El Paso", state: "Texas", lat: 31.75872, lng: -106.48693, population: 678815, isCapital: false },
  { name: "Boston", state: "Massachusetts", lat: 42.35843, lng: -71.05977, population: 653833, isCapital: false },
  { name: "Portland", state: "Oregon", lat: 45.52345, lng: -122.67621, population: 652503, isCapital: false },
  { name: "Detroit", state: "Michigan", lat: 42.33143, lng: -83.04575, population: 645705, isCapital: false },
  { name: "Las Vegas", state: "Nevada", lat: 36.17497, lng: -115.13722, population: 641903, isCapital: false },
  { name: "Memphis", state: "Tennessee", lat: 35.14953, lng: -90.04898, population: 633104, isCapital: false },
  { name: "Louisville", state: "Kentucky", lat: 38.25424, lng: -85.75941, population: 624444, isCapital: false },
  { name: "Baltimore", state: "Maryland", lat: 39.29038, lng: -76.61219, population: 585708, isCapital: false },
  { name: "Albuquerque", state: "New Mexico", lat: 35.08449, lng: -106.65114, population: 564559, isCapital: false },
  { name: "Milwaukee", state: "Wisconsin", lat: 43.0389, lng: -87.90647, population: 563531, isCapital: false },
  { name: "Tucson", state: "Arizona", lat: 32.22174, lng: -110.92648, population: 542629, isCapital: false },
  { name: "Fresno", state: "California", lat: 36.74773, lng: -119.77237, population: 542107, isCapital: false },
  { name: "Sacramento", state: "California", lat: 38.58157, lng: -121.4944, population: 524943, isCapital: false },
  { name: "Atlanta", state: "Georgia", lat: 33.749, lng: -84.38798, population: 510823, isCapital: false },
  { name: "Miami", state: "Florida", lat: 25.77427, lng: -80.19366, population: 487014, isCapital: false },
  { name: "Omaha", state: "Nebraska", lat: 41.25626, lng: -95.94043, population: 486051, isCapital: false },
  { name: "Raleigh", state: "North Carolina", lat: 35.7721, lng: -78.63861, population: 482295, isCapital: false },
  { name: "Kansas City", state: "Missouri", lat: 39.09973, lng: -94.57857, population: 475378, isCapital: false },
  { name: "Long Beach", state: "California", lat: 33.76696, lng: -118.18923, population: 474140, isCapital: false },
  { name: "Mesa", state: "Arizona", lat: 33.42227, lng: -111.82264, population: 471825, isCapital: false },
  { name: "Colorado Springs", state: "Colorado", lat: 38.83388, lng: -104.82136, population: 456568, isCapital: false },
  { name: "Virginia Beach", state: "Virginia", lat: 36.85293, lng: -75.97799, population: 454808, isCapital: false },
  { name: "Oakland", state: "California", lat: 37.80437, lng: -122.2708, population: 419267, isCapital: false },
  { name: "Tampa", state: "Florida", lat: 27.94752, lng: -82.45843, population: 414547, isCapital: false },
  { name: "Tulsa", state: "Oklahoma", lat: 36.15398, lng: -95.99277, population: 413066, isCapital: false },
  { name: "Minneapolis", state: "Minnesota", lat: 44.97997, lng: -93.26384, population: 410939, isCapital: false },
  { name: "Wichita", state: "Kansas", lat: 37.69224, lng: -97.33754, population: 396119, isCapital: false },
  { name: "Arlington", state: "Texas", lat: 32.73569, lng: -97.10807, population: 388125, isCapital: false },
  { name: "Bakersfield", state: "California", lat: 35.37329, lng: -119.01871, population: 373640, isCapital: false },
  { name: "Cleveland", state: "Ohio", lat: 41.4993, lng: -81.6944, population: 372624, isCapital: false },
  { name: "Cleveland", state: "Ohio", lat: 41.4995, lng: -81.69541, population: 365379, isCapital: false },
  { name: "New Orleans", state: "Louisiana", lat: 29.95465, lng: -90.07507, population: 362701, isCapital: false },
  { name: "Aurora", state: "Colorado", lat: 39.72943, lng: -104.83192, population: 359407, isCapital: false },
  { name: "Honolulu", state: "Hawaii", lat: 21.30694, lng: -157.85833, population: 350964, isCapital: false },
  { name: "Orlando", state: "Florida", lat: 28.53834, lng: -81.37924, population: 334854, isCapital: false },
  { name: "Cincinnati", state: "Ohio", lat: 39.12711, lng: -84.51439, population: 311097, isCapital: false },
  { name: "Pittsburgh", state: "Pennsylvania", lat: 40.44062, lng: -79.99589, population: 304391, isCapital: false },
  { name: "Anchorage", state: "Alaska", lat: 61.21806, lng: -149.90028, population: 289600, isCapital: false },
  { name: "St. Louis", state: "Missouri", lat: 38.62727, lng: -90.19789, population: 279695, isCapital: false },
  { name: "Salt Lake City", state: "Utah", lat: 40.76078, lng: -111.89105, population: 215548, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return US_TOWNS.find((t) => t.name === name);
}
