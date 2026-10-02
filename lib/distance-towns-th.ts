/**
 * Thailand town dataset for the Distance Calculator tool family.
 * 23 major cities. Coordinates are city-centre points; populations are
 * rounded approximations used only for ordering. Bangkok's neighbouring provinces (Nonthaburi, Samut Prakan) are excluded as redundant.
 * See th-distance-matrix.ts: no route here is marked verified.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const TH_TOWNS: DistanceTown[] = [
  { name: "กรุงเทพฯ", state: "กรุงเทพมหานคร", lat: 13.7563, lng: 100.5018, population: 5527994, isCapital: true },
  { name: "เชียงใหม่", state: "เชียงใหม่", lat: 18.7883, lng: 98.9853, population: 127000, isCapital: false },
  { name: "นครราชสีมา", state: "นครราชสีมา", lat: 14.9799, lng: 102.0978, population: 174000, isCapital: false },
  { name: "ขอนแก่น", state: "ขอนแก่น", lat: 16.4322, lng: 102.8236, population: 120000, isCapital: false },
  { name: "อุดรธานี", state: "อุดรธานี", lat: 17.4138, lng: 102.7872, population: 130000, isCapital: false },
  { name: "หาดใหญ่", state: "สงขลา", lat: 7.0086, lng: 100.4747, population: 159000, isCapital: false },
  { name: "พัทยา", state: "ชลบุรี", lat: 12.9236, lng: 100.8825, population: 120000, isCapital: false },
  { name: "ภูเก็ต", state: "ภูเก็ต", lat: 7.8804, lng: 98.3923, population: 80000, isCapital: false },
  { name: "สุราษฎร์ธานี", state: "สุราษฎร์ธานี", lat: 9.1382, lng: 99.3217, population: 130000, isCapital: false },
  { name: "นครศรีธรรมราช", state: "นครศรีธรรมราช", lat: 8.4304, lng: 99.9631, population: 106000, isCapital: false },
  { name: "เชียงราย", state: "เชียงราย", lat: 19.9105, lng: 99.8406, population: 70000, isCapital: false },
  { name: "พิษณุโลก", state: "พิษณุโลก", lat: 16.8211, lng: 100.2659, population: 80000, isCapital: false },
  { name: "นครสวรรค์", state: "นครสวรรค์", lat: 15.7047, lng: 100.1372, population: 90000, isCapital: false },
  { name: "อุบลราชธานี", state: "อุบลราชธานี", lat: 15.2448, lng: 104.8473, population: 80000, isCapital: false },
  { name: "ลำปาง", state: "ลำปาง", lat: 18.2888, lng: 99.4908, population: 56000, isCapital: false },
  { name: "พระนครศรีอยุธยา", state: "พระนครศรีอยุธยา", lat: 14.3532, lng: 100.5689, population: 52000, isCapital: false },
  { name: "ระยอง", state: "ระยอง", lat: 12.6814, lng: 101.2816, population: 62000, isCapital: false },
  { name: "ชลบุรี", state: "ชลบุรี", lat: 13.3611, lng: 100.9847, population: 60000, isCapital: false },
  { name: "หัวหิน", state: "ประจวบคีรีขันธ์", lat: 12.5684, lng: 99.9577, population: 84000, isCapital: false },
  { name: "กระบี่", state: "กระบี่", lat: 8.0863, lng: 98.9063, population: 35000, isCapital: false },
  { name: "ตรัง", state: "ตรัง", lat: 7.5563, lng: 99.6114, population: 55000, isCapital: false },
  { name: "สงขลา", state: "สงขลา", lat: 7.1897, lng: 100.5951, population: 70000, isCapital: false },
  { name: "นครปฐม", state: "นครปฐม", lat: 13.8199, lng: 100.0443, population: 120000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return TH_TOWNS.find((t) => t.name === name);
}
