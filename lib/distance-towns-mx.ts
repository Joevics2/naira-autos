/**
 * Mexico town dataset for the Distance Calculator tool family (Spanish-
 * only, per the site's language-per-market convention). 29 major
 * cities by population; Mexico City's own boroughs (Iztapalapa,
 * Ecatepec, Coyoacan, and similar) and Guadalajara/Monterrey's own
 * metro-area municipalities are deliberately excluded as redundant.
 * Coordinates from GeoNames.
 * See mx-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const MX_TOWNS: DistanceTown[] = [
  { name: "Mexico City", state: "Ciudad de M\u00e9xico (Capital)", lat: 19.42847, lng: -99.12766, population: 12294193, isCapital: true },
  { name: "Tijuana", state: "Baja California", lat: 32.5027, lng: -117.00371, population: 1922523, isCapital: false },
  { name: "Santiago de Quer\u00e9taro", state: "Quer\u00e9taro", lat: 20.58806, lng: -100.38806, population: 1594212, isCapital: false },
  { name: "Le\u00f3n", state: "Guanajuato", lat: 21.12183, lng: -101.68253, population: 1579803, isCapital: false },
  { name: "Ciudad Ju\u00e1rez", state: "Chihuahua", lat: 31.72024, lng: -106.46084, population: 1512450, isCapital: false },
  { name: "Guadalajara", state: "Jalisco", lat: 20.67738, lng: -103.34749, population: 1385629, isCapital: false },
  { name: "M\u00e9rida", state: "Yucat\u00e1n", lat: 20.967, lng: -89.62318, population: 1201000, isCapital: false },
  { name: "Monterrey", state: "Nuevo Le\u00f3n", lat: 25.68435, lng: -100.31721, population: 1135512, isCapital: false },
  { name: "Mexicali", state: "Baja California", lat: 32.62781, lng: -115.45446, population: 1032686, isCapital: false },
  { name: "Chihuahua", state: "Chihuahua", lat: 28.63528, lng: -106.08889, population: 925762, isCapital: false },
  { name: "Canc\u00fan", state: "Quintana Roo", lat: 21.17429, lng: -86.84656, population: 888797, isCapital: false },
  { name: "Hermosillo", state: "Sonora", lat: 29.08874, lng: -110.96677, population: 812229, isCapital: false },
  { name: "Culiac\u00e1n", state: "Sinaloa", lat: 24.80209, lng: -107.39421, population: 808416, isCapital: false },
  { name: "Morelia", state: "Michoac\u00e1n", lat: 19.70078, lng: -101.18443, population: 743275, isCapital: false },
  { name: "Torre\u00f3n", state: "Coahuila", lat: 25.54389, lng: -103.41898, population: 735340, isCapital: false },
  { name: "San Luis Potos\u00ed", state: "San Luis Potos\u00ed", lat: 22.15234, lng: -100.97135, population: 722772, isCapital: false },
  { name: "Aguascalientes", state: "Aguascalientes", lat: 21.88262, lng: -102.2843, population: 722250, isCapital: false },
  { name: "Saltillo", state: "Coahuila", lat: 25.42595, lng: -100.97963, population: 709671, isCapital: false },
  { name: "Acapulco", state: "Guerrero", lat: 16.84942, lng: -99.90891, population: 658609, isCapital: false },
  { name: "Tuxtla Guti\u00e9rrez", state: "Chiapas", lat: 16.75357, lng: -93.11578, population: 604147, isCapital: false },
  { name: "Reynosa", state: "Tamaulipas", lat: 26.08005, lng: -98.28456, population: 589466, isCapital: false },
  { name: "Durango", state: "Durango", lat: 24.02032, lng: -104.65756, population: 518709, isCapital: false },
  { name: "Matamoros", state: "Tamaulipas", lat: 25.87972, lng: -97.50417, population: 510739, isCapital: false },
  { name: "Toluca", state: "Estado de M\u00e9xico", lat: 19.28786, lng: -99.65324, population: 489333, isCapital: false },
  { name: "Ensenada", state: "Baja California", lat: 31.87149, lng: -116.60071, population: 443807, isCapital: false },
  { name: "Veracruz", state: "Veracruz", lat: 19.18095, lng: -96.1429, population: 428323, isCapital: false },
  { name: "Xalapa", state: "Veracruz", lat: 19.53124, lng: -96.91589, population: 424755, isCapital: false },
  { name: "Nuevo Laredo", state: "Tamaulipas", lat: 27.47629, lng: -99.51639, population: 416055, isCapital: false },
  { name: "Puebla", state: "Puebla", lat: 32.56645, lng: -115.35387, population: 15168, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return MX_TOWNS.find((t) => t.name === name);
}
