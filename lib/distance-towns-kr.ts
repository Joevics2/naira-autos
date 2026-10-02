/**
 * South Korea town dataset for the Distance Calculator tool family.
 * 23 major cities. Coordinates are city-centre points; populations are
 * rounded approximations used only for ordering. Seoul's satellite cities (Seongnam, Goyang, Yongin and similar) are excluded as redundant. Jeju is an island with no road link to the mainland; pairs involving it are straight-line-derived estimates only.
 * See kr-distance-matrix.ts: no route here is marked verified.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const KR_TOWNS: DistanceTown[] = [
  { name: "서울", state: "서울특별시", lat: 37.5665, lng: 126.978, population: 9386034, isCapital: true },
  { name: "부산", state: "부산광역시", lat: 35.1796, lng: 129.0756, population: 3293000, isCapital: false },
  { name: "인천", state: "인천광역시", lat: 37.4563, lng: 126.7052, population: 3000000, isCapital: false },
  { name: "대구", state: "대구광역시", lat: 35.8714, lng: 128.6014, population: 2370000, isCapital: false },
  { name: "대전", state: "대전광역시", lat: 36.3504, lng: 127.3845, population: 1440000, isCapital: false },
  { name: "광주", state: "광주광역시", lat: 35.1595, lng: 126.8526, population: 1420000, isCapital: false },
  { name: "수원", state: "경기도", lat: 37.2636, lng: 127.0286, population: 1200000, isCapital: false },
  { name: "울산", state: "울산광역시", lat: 35.5384, lng: 129.3114, population: 1100000, isCapital: false },
  { name: "창원", state: "경상남도", lat: 35.2279, lng: 128.6811, population: 1000000, isCapital: false },
  { name: "청주", state: "충청북도", lat: 36.6424, lng: 127.489, population: 850000, isCapital: false },
  { name: "전주", state: "전북특별자치도", lat: 35.8242, lng: 127.148, population: 650000, isCapital: false },
  { name: "천안", state: "충청남도", lat: 36.8151, lng: 127.1139, population: 650000, isCapital: false },
  { name: "포항", state: "경상북도", lat: 36.019, lng: 129.3435, population: 500000, isCapital: false },
  { name: "제주", state: "제주특별자치도", lat: 33.4996, lng: 126.5312, population: 490000, isCapital: false },
  { name: "강릉", state: "강원특별자치도", lat: 37.7519, lng: 128.8761, population: 210000, isCapital: false },
  { name: "춘천", state: "강원특별자치도", lat: 37.8813, lng: 127.7298, population: 280000, isCapital: false },
  { name: "여수", state: "전라남도", lat: 34.7604, lng: 127.6622, population: 280000, isCapital: false },
  { name: "목포", state: "전라남도", lat: 34.8118, lng: 126.3922, population: 215000, isCapital: false },
  { name: "안동", state: "경상북도", lat: 36.5684, lng: 128.7294, population: 160000, isCapital: false },
  { name: "원주", state: "강원특별자치도", lat: 37.3422, lng: 127.9202, population: 360000, isCapital: false },
  { name: "김해", state: "경상남도", lat: 35.2285, lng: 128.8894, population: 540000, isCapital: false },
  { name: "순천", state: "전라남도", lat: 34.9506, lng: 127.4875, population: 280000, isCapital: false },
  { name: "경주", state: "경상북도", lat: 35.8562, lng: 129.2247, population: 250000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return KR_TOWNS.find((t) => t.name === name);
}
