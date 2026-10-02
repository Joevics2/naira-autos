/**
 * Indonesia town dataset for the Distance Calculator tool family.
 * 28 major cities by population (2020 census, BPS, rounded). Jakarta's
 * satellite cities (Bekasi, Depok, Tangerang, Tangerang Selatan) are
 * deliberately excluded as redundant with Jakarta itself, same approach
 * as Tokyo's wards in the Japan dataset. Coordinates are city-centre
 * points. Indonesia is an archipelago: see id-distance-matrix.ts for how
 * inter-island pairs are treated.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const ID_TOWNS: DistanceTown[] = [
  { name: "Jakarta", state: "DKI Jakarta", lat: -6.2088, lng: 106.8456, population: 10562088, isCapital: true },
  { name: "Surabaya", state: "Jawa Timur", lat: -7.2575, lng: 112.7521, population: 2874314, isCapital: false },
  { name: "Bandung", state: "Jawa Barat", lat: -6.9175, lng: 107.6191, population: 2444160, isCapital: false },
  { name: "Medan", state: "Sumatera Utara", lat: 3.5952, lng: 98.6722, population: 2435252, isCapital: false },
  { name: "Palembang", state: "Sumatera Selatan", lat: -2.9761, lng: 104.7754, population: 1668848, isCapital: false },
  { name: "Semarang", state: "Jawa Tengah", lat: -6.9667, lng: 110.4167, population: 1653524, isCapital: false },
  { name: "Makassar", state: "Sulawesi Selatan", lat: -5.1477, lng: 119.4327, population: 1423877, isCapital: false },
  { name: "Batam", state: "Kepulauan Riau", lat: 1.0456, lng: 104.0305, population: 1196396, isCapital: false },
  { name: "Bandar Lampung", state: "Lampung", lat: -5.3971, lng: 105.2668, population: 1166066, isCapital: false },
  { name: "Bogor", state: "Jawa Barat", lat: -6.595, lng: 106.8166, population: 1043070, isCapital: false },
  { name: "Pekanbaru", state: "Riau", lat: 0.5071, lng: 101.4478, population: 983356, isCapital: false },
  { name: "Padang", state: "Sumatera Barat", lat: -0.9471, lng: 100.4172, population: 909040, isCapital: false },
  { name: "Malang", state: "Jawa Timur", lat: -7.9666, lng: 112.6326, population: 843810, isCapital: false },
  { name: "Samarinda", state: "Kalimantan Timur", lat: -0.5022, lng: 117.1536, population: 827994, isCapital: false },
  { name: "Denpasar", state: "Bali", lat: -8.6705, lng: 115.2126, population: 725314, isCapital: false },
  { name: "Balikpapan", state: "Kalimantan Timur", lat: -1.2379, lng: 116.8529, population: 688318, isCapital: false },
  { name: "Banjarmasin", state: "Kalimantan Selatan", lat: -3.3186, lng: 114.5944, population: 657663, isCapital: false },
  { name: "Pontianak", state: "Kalimantan Barat", lat: -0.0263, lng: 109.3425, population: 658685, isCapital: false },
  { name: "Serang", state: "Banten", lat: -6.1201, lng: 106.1503, population: 692101, isCapital: false },
  { name: "Surakarta", state: "Jawa Tengah", lat: -7.5666, lng: 110.8283, population: 522364, isCapital: false },
  { name: "Manado", state: "Sulawesi Utara", lat: 1.4748, lng: 124.8421, population: 451916, isCapital: false },
  { name: "Mataram", state: "Nusa Tenggara Barat", lat: -8.5833, lng: 116.1167, population: 441064, isCapital: false },
  { name: "Kupang", state: "Nusa Tenggara Timur", lat: -10.1772, lng: 123.607, population: 442758, isCapital: false },
  { name: "Jayapura", state: "Papua", lat: -2.5337, lng: 140.7181, population: 398478, isCapital: false },
  { name: "Yogyakarta", state: "DI Yogyakarta", lat: -7.7956, lng: 110.3695, population: 373589, isCapital: false },
  { name: "Cirebon", state: "Jawa Barat", lat: -6.732, lng: 108.5523, population: 333303, isCapital: false },
  { name: "Jambi", state: "Jambi", lat: -1.6101, lng: 103.6131, population: 606200, isCapital: false },
  { name: "Banda Aceh", state: "Aceh", lat: 5.5483, lng: 95.3238, population: 252899, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return ID_TOWNS.find((t) => t.name === name);
}
