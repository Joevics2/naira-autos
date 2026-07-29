/**
 * Curated city coordinates for the Mileage Explainer tool family.
 * Hand-picked (not auto-generated from a bulk geo dataset) so every entry
 * is a city a general audience would actually recognize — this is a
 * "does the comparison land" tool, not a full gazetteer. Add more cities
 * here as new country pages ship; the list is shared across all of them.
 */

export interface MileageCity {
  name: string;
  countryCode: string;
  lat: number;
  lng: number;
}

export const CITIES: MileageCity[] = [
  // Nigeria
  { name: 'Lagos', countryCode: 'ng', lat: 6.5244, lng: 3.3792 },
  { name: 'Abuja', countryCode: 'ng', lat: 9.0765, lng: 7.3986 },
  { name: 'Kano', countryCode: 'ng', lat: 12.0022, lng: 8.5920 },
  { name: 'Ibadan', countryCode: 'ng', lat: 7.3775, lng: 3.9470 },
  { name: 'Port Harcourt', countryCode: 'ng', lat: 4.8156, lng: 7.0498 },
  { name: 'Benin City', countryCode: 'ng', lat: 6.3350, lng: 5.6037 },
  { name: 'Kaduna', countryCode: 'ng', lat: 10.5222, lng: 7.4383 },
  { name: 'Enugu', countryCode: 'ng', lat: 6.4413, lng: 7.4989 },
  { name: 'Warri', countryCode: 'ng', lat: 5.5160, lng: 5.7500 },
  { name: 'Calabar', countryCode: 'ng', lat: 4.9757, lng: 8.3417 },
  { name: 'Jos', countryCode: 'ng', lat: 9.8965, lng: 8.8583 },
  { name: 'Owerri', countryCode: 'ng', lat: 5.4836, lng: 7.0333 },
  { name: 'Abeokuta', countryCode: 'ng', lat: 7.1475, lng: 3.3619 },
  { name: 'Ilorin', countryCode: 'ng', lat: 8.4966, lng: 4.5426 },
  { name: 'Maiduguri', countryCode: 'ng', lat: 11.8333, lng: 13.1500 },
  { name: 'Uyo', countryCode: 'ng', lat: 5.0377, lng: 7.9128 },
  { name: 'Onitsha', countryCode: 'ng', lat: 6.1667, lng: 6.7833 },
  { name: 'Sokoto', countryCode: 'ng', lat: 13.0059, lng: 5.2476 },

  // Global landmark cities — used for the universal/global-page comparisons
  { name: 'New York', countryCode: 'us', lat: 40.7128, lng: -74.0060 },
  { name: 'Los Angeles', countryCode: 'us', lat: 34.0522, lng: -118.2437 },
  { name: 'Chicago', countryCode: 'us', lat: 41.8781, lng: -87.6298 },
  { name: 'Miami', countryCode: 'us', lat: 25.7617, lng: -80.1918 },
  { name: 'London', countryCode: 'gb', lat: 51.5074, lng: -0.1278 },
  { name: 'Paris', countryCode: 'fr', lat: 48.8566, lng: 2.3522 },
  { name: 'Dubai', countryCode: 'ae', lat: 25.2048, lng: 55.2708 },
  { name: 'Tokyo', countryCode: 'jp', lat: 35.6762, lng: 139.6503 },
  { name: 'Cape Town', countryCode: 'za', lat: -33.9249, lng: 18.4241 },
  { name: 'Johannesburg', countryCode: 'za', lat: -26.2041, lng: 28.0473 },
  { name: 'Nairobi', countryCode: 'ke', lat: -1.2921, lng: 36.8219 },
  { name: 'Accra', countryCode: 'gh', lat: 5.6037, lng: -0.1870 },
  { name: 'Mumbai', countryCode: 'in', lat: 19.0760, lng: 72.8777 },
  { name: 'Sydney', countryCode: 'au', lat: -33.8688, lng: 151.2093 },
  { name: 'Toronto', countryCode: 'ca', lat: 43.6532, lng: -79.3832 },
  { name: 'Cairo', countryCode: 'eg', lat: 30.0444, lng: 31.2357 },
];

export function citiesForCountry(countryCode: string): MileageCity[] {
  return CITIES.filter((c) => c.countryCode === countryCode);
}

export function findCity(name: string): MileageCity | undefined {
  return CITIES.find((c) => c.name === name);
}
