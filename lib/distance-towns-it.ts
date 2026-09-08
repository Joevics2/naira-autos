/**
 * Italy town dataset for the Distance Calculator tool family.
 * 40 major Italian cities (Milan, Turin, and Rome's own districts excluded as redundant).
 * Coordinates and population sourced from the GeoNames database.
 * See it-distance-matrix.ts for sourcing on verified vs estimated routes.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const IT_TOWNS: DistanceTown[] = [
  { name: "Rome", state: "Italy", lat: 41.89193, lng: 12.51133, population: 2318895, isCapital: true },
  { name: "Milan", state: "Italy", lat: 45.46427, lng: 9.18951, population: 1371498, isCapital: false },
  { name: "Naples", state: "Italy", lat: 40.85216, lng: 14.26811, population: 909048, isCapital: false },
  { name: "Turin", state: "Italy", lat: 45.07049, lng: 7.68682, population: 847287, isCapital: false },
  { name: "Palermo", state: "Italy", lat: 38.1166, lng: 13.3636, population: 648260, isCapital: false },
  { name: "Genoa", state: "Italy", lat: 44.40478, lng: 8.94439, population: 580097, isCapital: false },
  { name: "Bologna", state: "Italy", lat: 44.49381, lng: 11.33875, population: 394843, isCapital: false },
  { name: "Florence", state: "Italy", lat: 43.77925, lng: 11.24626, population: 367150, isCapital: false },
  { name: "Bari", state: "Italy", lat: 41.12066, lng: 16.86982, population: 316491, isCapital: false },
  { name: "Catania", state: "Italy", lat: 37.49223, lng: 15.07041, population: 311584, isCapital: false },
  { name: "Verona", state: "Italy", lat: 45.43854, lng: 10.9938, population: 258031, isCapital: false },
  { name: "Messina", state: "Italy", lat: 38.19394, lng: 15.55256, population: 219948, isCapital: false },
  { name: "Trieste", state: "Italy", lat: 45.64953, lng: 13.77678, population: 204338, isCapital: false },
  { name: "Padua", state: "Italy", lat: 45.40797, lng: 11.88586, population: 203725, isCapital: false },
  { name: "Brescia", state: "Italy", lat: 45.53558, lng: 10.21472, population: 200423, isCapital: false },
  { name: "Taranto", state: "Italy", lat: 40.46438, lng: 17.24707, population: 198585, isCapital: false },
  { name: "Parma", state: "Italy", lat: 44.79935, lng: 10.32618, population: 198292, isCapital: false },
  { name: "Prato", state: "Italy", lat: 43.8805, lng: 11.09699, population: 195089, isCapital: false },
  { name: "Modena", state: "Italy", lat: 44.64783, lng: 10.92539, population: 184732, isCapital: false },
  { name: "Reggio Calabria", state: "Italy", lat: 38.11047, lng: 15.66129, population: 182455, isCapital: false },
  { name: "Reggio nell'Emilia", state: "Italy", lat: 44.69825, lng: 10.63125, population: 171944, isCapital: false },
  { name: "Livorno", state: "Italy", lat: 43.54427, lng: 10.32615, population: 157017, isCapital: false },
  { name: "Cagliari", state: "Italy", lat: 39.23054, lng: 9.11917, population: 149257, isCapital: false },
  { name: "Rimini", state: "Italy", lat: 44.05755, lng: 12.56528, population: 148688, isCapital: false },
  { name: "Foggia", state: "Italy", lat: 41.45845, lng: 15.55188, population: 137032, isCapital: false },
  { name: "Ferrara", state: "Italy", lat: 44.83804, lng: 11.62057, population: 132009, isCapital: false },
  { name: "Salerno", state: "Italy", lat: 40.67545, lng: 14.79328, population: 125797, isCapital: false },
  { name: "Monza", state: "Italy", lat: 45.58005, lng: 9.27246, population: 124398, isCapital: false },
  { name: "Siracusa", state: "Italy", lat: 37.07542, lng: 15.28664, population: 121605, isCapital: false },
  { name: "Bergamo", state: "Italy", lat: 45.69601, lng: 9.66721, population: 121200, isCapital: false },
  { name: "Trento", state: "Italy", lat: 46.06787, lng: 11.12108, population: 120709, isCapital: false },
  { name: "Perugia", state: "Italy", lat: 43.1122, lng: 12.38878, population: 120137, isCapital: false },
  { name: "Pescara", state: "Italy", lat: 42.4584, lng: 14.20283, population: 119554, isCapital: false },
  { name: "Forl\u00ec", state: "Italy", lat: 44.22177, lng: 12.04144, population: 116696, isCapital: false },
  { name: "Vicenza", state: "Italy", lat: 45.54672, lng: 11.5475, population: 111980, isCapital: false },
  { name: "Terni", state: "Italy", lat: 42.56335, lng: 12.64329, population: 111189, isCapital: false },
  { name: "Pisa", state: "Italy", lat: 43.70853, lng: 10.4036, population: 109960, isCapital: false },
  { name: "Bolzano", state: "Italy", lat: 46.49067, lng: 11.33982, population: 107436, isCapital: false },
  { name: "Circoiscrizione VI", state: "Italy", lat: 45.1022, lng: 7.70029, population: 107369, isCapital: false },
  { name: "Piacenza", state: "Italy", lat: 45.05242, lng: 9.69342, population: 103607, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return IT_TOWNS.find((t) => t.name === name);
}
