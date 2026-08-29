// Curated routes for the Global Fuel Cost Calculator family. Distances
// are real road distances (typical highway route), not straight-line —
// a straight-line-plus-flat-percentage estimate was tested against known
// road distances and was off by 20–34% on mountainous or indirect routes
// (e.g. Bogotá–Medellín, Lagos–Abuja), so each route below is a verified
// road-distance figure instead, the same approach the original
// Nigeria-focused calculator uses.

export interface FuelRoute { label: string; km: number; }

export const GLOBAL_ROUTES: FuelRoute[] = [
  { label: 'Lagos → Abuja', km: 791 },
  { label: 'New York → Los Angeles', km: 4500 },
  { label: 'Los Angeles → San Francisco', km: 615 },
  { label: 'London → Manchester', km: 330 },
  { label: 'Toronto → Montreal', km: 540 },
  { label: 'Sydney → Melbourne', km: 880 },
  { label: 'Cape Town → Johannesburg', km: 1400 },
  { label: 'Mumbai → Delhi', km: 1400 },
  { label: 'Dubai → Abu Dhabi', km: 140 },
  { label: 'Mexico City → Guadalajara', km: 540 },
  { label: 'Madrid → Barcelona', km: 620 },
  { label: 'Buenos Aires → Córdoba', km: 700 },
  { label: 'Bogotá → Medellín', km: 415 },
  { label: 'Santiago → Valparaíso', km: 120 },
  { label: 'Custom distance', km: 0 },
];

/** Spanish-speaking-country routes, for the Spanish tool's default list. */
export const GLOBAL_ROUTES_ES: FuelRoute[] = [
  { label: 'Madrid → Barcelona', km: 620 },
  { label: 'Madrid → Valencia', km: 355 },
  { label: 'Madrid → Sevilla', km: 535 },
  { label: 'Ciudad de México → Guadalajara', km: 540 },
  { label: 'Ciudad de México → Monterrey', km: 930 },
  { label: 'Buenos Aires → Córdoba', km: 700 },
  { label: 'Buenos Aires → Rosario', km: 300 },
  { label: 'Buenos Aires → Mendoza', km: 1050 },
  { label: 'Bogotá → Medellín', km: 415 },
  { label: 'Bogotá → Cali', km: 460 },
  { label: 'Santiago → Valparaíso', km: 120 },
  { label: 'Santiago → Concepción', km: 500 },
  { label: 'Distancia personalizada', km: 0 },
];
