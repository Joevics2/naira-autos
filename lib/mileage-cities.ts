import { countryName } from '@/lib/country-meta';

/**
 * City coordinates for the Mileage Explainer tool family. Hand-picked
 * (not auto-generated from a bulk geo dataset) so every entry is a city a
 * general audience would recognize. Ordered with each country's most
 * recognizable city first — that ordering is what the in-tool country
 * picker uses to set default From/To when someone selects a country.
 */

export interface MileageCity {
  name: string;
  countryCode: string;
  lat: number;
  lng: number;
  /** True only for the small curated set shown by default on the global
   *  hub page before anyone picks a specific country. */
  global?: boolean;
}

export const CITIES: MileageCity[] = [
  // Nigeria
  { name: 'Lagos', countryCode: 'ng', lat: 6.5244, lng: 3.3792, global: true },
  { name: 'Abuja', countryCode: 'ng', lat: 9.0765, lng: 7.3986, global: true },
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

  // Ghana
  { name: 'Accra', countryCode: 'gh', lat: 5.6037, lng: -0.1870, global: true },
  { name: 'Kumasi', countryCode: 'gh', lat: 6.6885, lng: -1.6244 },
  { name: 'Takoradi', countryCode: 'gh', lat: 4.8845, lng: -1.7554 },
  { name: 'Tamale', countryCode: 'gh', lat: 9.4008, lng: -0.8393 },
  { name: 'Cape Coast', countryCode: 'gh', lat: 5.1053, lng: -1.2466 },

  // Kenya
  { name: 'Nairobi', countryCode: 'ke', lat: -1.2921, lng: 36.8219, global: true },
  { name: 'Mombasa', countryCode: 'ke', lat: -4.0435, lng: 39.6682 },
  { name: 'Kisumu', countryCode: 'ke', lat: -0.0917, lng: 34.7680 },
  { name: 'Nakuru', countryCode: 'ke', lat: -0.3031, lng: 36.0800 },
  { name: 'Eldoret', countryCode: 'ke', lat: 0.5143, lng: 35.2698 },

  // South Africa
  { name: 'Cape Town', countryCode: 'za', lat: -33.9249, lng: 18.4241, global: true },
  { name: 'Johannesburg', countryCode: 'za', lat: -26.2041, lng: 28.0473, global: true },
  { name: 'Durban', countryCode: 'za', lat: -29.8587, lng: 31.0218 },
  { name: 'Pretoria', countryCode: 'za', lat: -25.7479, lng: 28.2293 },
  { name: 'Gqeberha', countryCode: 'za', lat: -33.9608, lng: 25.6022 },
  { name: 'Bloemfontein', countryCode: 'za', lat: -29.0852, lng: 26.1596 },

  // Uganda
  { name: 'Kampala', countryCode: 'ug', lat: 0.3476, lng: 32.5825 },
  { name: 'Entebbe', countryCode: 'ug', lat: 0.0512, lng: 32.4637 },
  { name: 'Gulu', countryCode: 'ug', lat: 2.7746, lng: 32.2990 },
  { name: 'Mbarara', countryCode: 'ug', lat: -0.6072, lng: 30.6545 },

  // Tanzania
  { name: 'Dar es Salaam', countryCode: 'tz', lat: -6.7924, lng: 39.2083 },
  { name: 'Dodoma', countryCode: 'tz', lat: -6.1630, lng: 35.7516 },
  { name: 'Mwanza', countryCode: 'tz', lat: -2.5164, lng: 32.9175 },
  { name: 'Arusha', countryCode: 'tz', lat: -3.3869, lng: 36.6830 },

  // Zambia
  { name: 'Lusaka', countryCode: 'zm', lat: -15.3875, lng: 28.3228 },
  { name: 'Ndola', countryCode: 'zm', lat: -12.9587, lng: 28.6366 },
  { name: 'Kitwe', countryCode: 'zm', lat: -12.8024, lng: 28.2132 },

  // Ethiopia
  { name: 'Addis Ababa', countryCode: 'et', lat: 9.0300, lng: 38.7400 },
  { name: 'Dire Dawa', countryCode: 'et', lat: 9.5931, lng: 41.8661 },

  // UAE
  { name: 'Dubai', countryCode: 'ae', lat: 25.2048, lng: 55.2708, global: true },
  { name: 'Abu Dhabi', countryCode: 'ae', lat: 24.4539, lng: 54.3773 },
  { name: 'Sharjah', countryCode: 'ae', lat: 25.3573, lng: 55.4033 },

  // Saudi Arabia
  { name: 'Riyadh', countryCode: 'sa', lat: 24.7136, lng: 46.6753, global: true },
  { name: 'Jeddah', countryCode: 'sa', lat: 21.4858, lng: 39.1925 },
  { name: 'Mecca', countryCode: 'sa', lat: 21.3891, lng: 39.8579 },
  { name: 'Dammam', countryCode: 'sa', lat: 26.4207, lng: 50.0888 },

  // India
  { name: 'Mumbai', countryCode: 'in', lat: 19.0760, lng: 72.8777, global: true },
  { name: 'Delhi', countryCode: 'in', lat: 28.7041, lng: 77.1025 },
  { name: 'Bangalore', countryCode: 'in', lat: 12.9716, lng: 77.5946 },
  { name: 'Chennai', countryCode: 'in', lat: 13.0827, lng: 80.2707 },
  { name: 'Kolkata', countryCode: 'in', lat: 22.5726, lng: 88.3639 },

  // Pakistan
  { name: 'Karachi', countryCode: 'pk', lat: 24.8607, lng: 67.0011, global: true },
  { name: 'Lahore', countryCode: 'pk', lat: 31.5497, lng: 74.3436 },
  { name: 'Islamabad', countryCode: 'pk', lat: 33.6844, lng: 73.0479 },

  // Bangladesh
  { name: 'Dhaka', countryCode: 'bd', lat: 23.8103, lng: 90.4125 },
  { name: 'Chittagong', countryCode: 'bd', lat: 22.3569, lng: 91.7832 },

  // Sri Lanka
  { name: 'Colombo', countryCode: 'lk', lat: 6.9271, lng: 79.8612 },
  { name: 'Kandy', countryCode: 'lk', lat: 7.2906, lng: 80.6337 },

  // Philippines
  { name: 'Manila', countryCode: 'ph', lat: 14.5995, lng: 120.9842, global: true },
  { name: 'Cebu City', countryCode: 'ph', lat: 10.3157, lng: 123.8854 },
  { name: 'Davao City', countryCode: 'ph', lat: 7.1907, lng: 125.4553 },

  // Indonesia
  { name: 'Jakarta', countryCode: 'id', lat: -6.2088, lng: 106.8456, global: true },
  { name: 'Surabaya', countryCode: 'id', lat: -7.2575, lng: 112.7521 },
  { name: 'Bandung', countryCode: 'id', lat: -6.9175, lng: 107.6191 },

  // Malaysia
  { name: 'Kuala Lumpur', countryCode: 'my', lat: 3.1390, lng: 101.6869 },
  { name: 'Johor Bahru', countryCode: 'my', lat: 1.4927, lng: 103.7414 },
  { name: 'Penang', countryCode: 'my', lat: 5.4141, lng: 100.3288 },

  // Vietnam
  { name: 'Ho Chi Minh City', countryCode: 'vn', lat: 10.8231, lng: 106.6297 },
  { name: 'Hanoi', countryCode: 'vn', lat: 21.0278, lng: 105.8342 },

  // United States
  { name: 'New York', countryCode: 'us', lat: 40.7128, lng: -74.0060, global: true },
  { name: 'Los Angeles', countryCode: 'us', lat: 34.0522, lng: -118.2437, global: true },
  { name: 'Chicago', countryCode: 'us', lat: 41.8781, lng: -87.6298 },
  { name: 'Miami', countryCode: 'us', lat: 25.7617, lng: -80.1918 },
  { name: 'Houston', countryCode: 'us', lat: 29.7604, lng: -95.3698 },
  { name: 'San Francisco', countryCode: 'us', lat: 37.7749, lng: -122.4194 },
  { name: 'Dallas', countryCode: 'us', lat: 32.7767, lng: -96.7970 },
  { name: 'Atlanta', countryCode: 'us', lat: 33.7490, lng: -84.3880 },

  // United Kingdom
  { name: 'London', countryCode: 'gb', lat: 51.5074, lng: -0.1278, global: true },
  { name: 'Manchester', countryCode: 'gb', lat: 53.4808, lng: -2.2426 },
  { name: 'Birmingham', countryCode: 'gb', lat: 52.4862, lng: -1.8904 },
  { name: 'Glasgow', countryCode: 'gb', lat: 55.8642, lng: -4.2518 },
  { name: 'Liverpool', countryCode: 'gb', lat: 53.4084, lng: -2.9916 },

  // Canada
  { name: 'Toronto', countryCode: 'ca', lat: 43.6532, lng: -79.3832, global: true },
  { name: 'Vancouver', countryCode: 'ca', lat: 49.2827, lng: -123.1207 },
  { name: 'Montreal', countryCode: 'ca', lat: 45.5017, lng: -73.5673 },
  { name: 'Calgary', countryCode: 'ca', lat: 51.0447, lng: -114.0719 },

  // Australia
  { name: 'Sydney', countryCode: 'au', lat: -33.8688, lng: 151.2093, global: true },
  { name: 'Melbourne', countryCode: 'au', lat: -37.8136, lng: 144.9631 },
  { name: 'Brisbane', countryCode: 'au', lat: -27.4698, lng: 153.0251 },
  { name: 'Perth', countryCode: 'au', lat: -31.9505, lng: 115.8605 },

  // New Zealand
  { name: 'Auckland', countryCode: 'nz', lat: -36.8485, lng: 174.7633, global: true },
  { name: 'Wellington', countryCode: 'nz', lat: -41.2865, lng: 174.7762 },
  { name: 'Christchurch', countryCode: 'nz', lat: -43.5321, lng: 172.6362 },

  // Ireland
  { name: 'Dublin', countryCode: 'ie', lat: 53.3498, lng: -6.2603 },
  { name: 'Cork', countryCode: 'ie', lat: 51.8985, lng: -8.4756 },

  // Germany
  { name: 'Berlin', countryCode: 'de', lat: 52.5200, lng: 13.4050, global: true },
  { name: 'Munich', countryCode: 'de', lat: 48.1351, lng: 11.5820 },
  { name: 'Hamburg', countryCode: 'de', lat: 53.5511, lng: 9.9937 },
  { name: 'Frankfurt', countryCode: 'de', lat: 50.1109, lng: 8.6821 },

  // France
  { name: 'Paris', countryCode: 'fr', lat: 48.8566, lng: 2.3522, global: true },
  { name: 'Marseille', countryCode: 'fr', lat: 43.2965, lng: 5.3698 },
  { name: 'Lyon', countryCode: 'fr', lat: 45.7640, lng: 4.8357 },

  // Brazil
  { name: 'São Paulo', countryCode: 'br', lat: -23.5505, lng: -46.6333, global: true },
  { name: 'Rio de Janeiro', countryCode: 'br', lat: -22.9068, lng: -43.1729 },
  { name: 'Brasília', countryCode: 'br', lat: -15.8267, lng: -47.9218 },

  // Mexico
  { name: 'Mexico City', countryCode: 'mx', lat: 19.4326, lng: -99.1332, global: true },
  { name: 'Guadalajara', countryCode: 'mx', lat: 20.6597, lng: -103.3496 },
  { name: 'Monterrey', countryCode: 'mx', lat: 25.6866, lng: -100.3161 },

  // Egypt
  { name: 'Cairo', countryCode: 'eg', lat: 30.0444, lng: 31.2357, global: true },
  { name: 'Alexandria', countryCode: 'eg', lat: 31.2001, lng: 29.9187 },
  { name: 'Giza', countryCode: 'eg', lat: 30.0131, lng: 31.2089 },

  // Jamaica
  { name: 'Kingston', countryCode: 'jm', lat: 17.9714, lng: -76.7936 },
  { name: 'Montego Bay', countryCode: 'jm', lat: 18.4762, lng: -77.8939 },

  // China
  { name: 'Beijing', countryCode: 'cn', lat: 39.9042, lng: 116.4074, global: true },
  { name: 'Shanghai', countryCode: 'cn', lat: 31.2304, lng: 121.4737 },
  { name: 'Guangzhou', countryCode: 'cn', lat: 23.1291, lng: 113.2644 },
  { name: 'Shenzhen', countryCode: 'cn', lat: 22.5431, lng: 114.0579 },
];

export function citiesForCountry(countryCode: string): MileageCity[] {
  return CITIES.filter((c) => c.countryCode === countryCode);
}

/** The curated international set for the global hub page's default
 *  (no-country-selected) view. */
export function globalLandmarkCities(): MileageCity[] {
  return CITIES.filter((c) => c.global);
}

export function findCity(name: string): MileageCity | undefined {
  return CITIES.find((c) => c.name === name);
}

/** Every country with at least one city in the dataset, in a stable
 *  order (Nigeria first, then alphabetical) — used to populate the
 *  in-tool country picker. */
export function availableCountries(): { code: string; name: string }[] {
  const codes = Array.from(new Set(CITIES.map((c) => c.countryCode)));
  const named = codes.map((code) => ({ code, name: countryName(code) }));
  return named.sort((a, b) => {
    if (a.code === 'ng') return -1;
    if (b.code === 'ng') return 1;
    return a.name.localeCompare(b.name);
  });
}
