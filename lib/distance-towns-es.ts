/**
 * Spain town dataset for the Distance Calculator tool family.
 * 40 major Spanish cities (Madrid and Barcelona's own metro-area suburbs and districts excluded as redundant).
 * Coordinates and population sourced from the GeoNames database.
 * See es-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const ES_TOWNS: DistanceTown[] = [
  { name: "Madrid", state: "Spain", lat: 40.4165, lng: -3.70256, population: 3255944, isCapital: true },
  { name: "Barcelona", state: "Spain", lat: 41.38879, lng: 2.15899, population: 1686208, isCapital: false },
  { name: "Valencia", state: "Spain", lat: 39.47391, lng: -0.37966, population: 824340, isCapital: false },
  { name: "Zaragoza", state: "Spain", lat: 41.65606, lng: -0.87734, population: 686986, isCapital: false },
  { name: "Seville", state: "Spain", lat: 37.38283, lng: -5.97317, population: 686741, isCapital: false },
  { name: "M\u00e1laga", state: "Spain", lat: 36.72016, lng: -4.42034, population: 592346, isCapital: false },
  { name: "Murcia", state: "Spain", lat: 37.98704, lng: -1.13004, population: 471982, isCapital: false },
  { name: "Palma", state: "Spain", lat: 39.56939, lng: 2.65024, population: 438234, isCapital: false },
  { name: "Las Palmas de Gran Canaria", state: "Spain", lat: 28.10178, lng: -15.41573, population: 383516, isCapital: false },
  { name: "Alicante", state: "Spain", lat: 38.34517, lng: -0.48149, population: 348901, isCapital: false },
  { name: "Bilbao", state: "Spain", lat: 43.26271, lng: -2.92528, population: 347342, isCapital: false },
  { name: "C\u00f3rdoba", state: "Spain", lat: 37.89155, lng: -4.77275, population: 325708, isCapital: false },
  { name: "Valladolid", state: "Spain", lat: 41.65541, lng: -4.72353, population: 300618, isCapital: false },
  { name: "Vigo", state: "Spain", lat: 42.23282, lng: -8.72264, population: 293642, isCapital: false },
  { name: "Gij\u00f3n", state: "Spain", lat: 43.53573, lng: -5.66152, population: 271780, isCapital: false },
  { name: "Vitoria-Gasteiz", state: "Spain", lat: 42.84998, lng: -2.67268, population: 257407, isCapital: false },
  { name: "A Coru\u00f1a", state: "Spain", lat: 43.37135, lng: -8.396, population: 250438, isCapital: false },
  { name: "Elche", state: "Spain", lat: 38.26218, lng: -0.70107, population: 234765, isCapital: false },
  { name: "Granada", state: "Spain", lat: 37.18817, lng: -3.60667, population: 233532, isCapital: false },
  { name: "Oviedo", state: "Spain", lat: 43.36029, lng: -5.84476, population: 220027, isCapital: false },
  { name: "Cartagena", state: "Spain", lat: 37.60197, lng: -0.98397, population: 213943, isCapital: false },
  { name: "Jerez de la Frontera", state: "Spain", lat: 36.68645, lng: -6.13606, population: 212879, isCapital: false },
  { name: "Santa Cruz de Tenerife", state: "Spain", lat: 28.46824, lng: -16.25462, population: 211359, isCapital: false },
  { name: "Pamplona", state: "Spain", lat: 42.81687, lng: -1.64323, population: 208243, isCapital: false },
  { name: "Almer\u00eda", state: "Spain", lat: 36.83814, lng: -2.45974, population: 196851, isCapital: false },
  { name: "San Sebasti\u00e1n", state: "Spain", lat: 43.31283, lng: -1.97499, population: 185357, isCapital: false },
  { name: "Burgos", state: "Spain", lat: 42.34106, lng: -3.70184, population: 176418, isCapital: false },
  { name: "Santander", state: "Spain", lat: 43.46589, lng: -3.80493, population: 173635, isCapital: false },
  { name: "Albacete", state: "Spain", lat: 38.99424, lng: -1.85643, population: 173050, isCapital: false },
  { name: "Alcorc\u00f3n", state: "Spain", lat: 40.34582, lng: -3.82487, population: 172384, isCapital: false },
  { name: "Castell\u00f3 de la Plana", state: "Spain", lat: 39.98567, lng: -0.04935, population: 171857, isCapital: false },
  { name: "Horta-Guinard\u00f3", state: "Spain", lat: 41.41849, lng: 2.1677, population: 168092, isCapital: false },
  { name: "Nou Barris", state: "Spain", lat: 41.44163, lng: 2.17727, population: 166310, isCapital: false },
  { name: "Hortaleza", state: "Spain", lat: 40.47444, lng: -3.6411, population: 161661, isCapital: false },
  { name: "San Blas-Canillejas", state: "Spain", lat: 40.43893, lng: -3.61537, population: 157367, isCapital: false },
  { name: "Marbella", state: "Spain", lat: 36.51543, lng: -4.88583, population: 156295, isCapital: false },
  { name: "Tetu\u00e1n de las Victorias", state: "Spain", lat: 40.45975, lng: -3.6975, population: 155000, isCapital: false },
  { name: "Logro\u00f1o", state: "Spain", lat: 42.46615, lng: -2.45115, population: 151164, isCapital: false },
  { name: "La Laguna", state: "Spain", lat: 28.4853, lng: -16.32014, population: 150661, isCapital: false },
  { name: "Badajoz", state: "Spain", lat: 38.87789, lng: -6.97061, population: 150530, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return ES_TOWNS.find((t) => t.name === name);
}
