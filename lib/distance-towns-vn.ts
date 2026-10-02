/**
 * Vietnam town dataset for the Distance Calculator tool family.
 * 24 major cities. Coordinates are city-centre points; populations are
 * rounded approximations used only for ordering. The "state" field holds the broad region (Miền Bắc/Trung/Nam, Tây Nguyên) rather than provinces, because provincial boundaries were restructured recently. Populations are approximate and only used for ordering.
 * See vn-distance-matrix.ts: no route here is marked verified.
 */

export interface DistanceTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
  population: number;
  isCapital: boolean;
}

export const VN_TOWNS: DistanceTown[] = [
  { name: "Hà Nội", state: "Miền Bắc", lat: 21.0278, lng: 105.8342, population: 8053663, isCapital: true },
  { name: "TP. Hồ Chí Minh", state: "Miền Nam", lat: 10.8231, lng: 106.6297, population: 8993082, isCapital: false },
  { name: "Hải Phòng", state: "Miền Bắc", lat: 20.8449, lng: 106.6881, population: 2028514, isCapital: false },
  { name: "Đà Nẵng", state: "Miền Trung", lat: 16.0544, lng: 108.2022, population: 1134310, isCapital: false },
  { name: "Cần Thơ", state: "Miền Nam", lat: 10.0452, lng: 105.7469, population: 1235171, isCapital: false },
  { name: "Biên Hòa", state: "Miền Nam", lat: 10.9574, lng: 106.8426, population: 1055414, isCapital: false },
  { name: "Huế", state: "Miền Trung", lat: 16.4637, lng: 107.5909, population: 455000, isCapital: false },
  { name: "Nha Trang", state: "Miền Trung", lat: 12.2388, lng: 109.1967, population: 535000, isCapital: false },
  { name: "Vinh", state: "Miền Trung", lat: 18.6796, lng: 105.6813, population: 480000, isCapital: false },
  { name: "Buôn Ma Thuột", state: "Tây Nguyên", lat: 12.6667, lng: 108.05, population: 375000, isCapital: false },
  { name: "Đà Lạt", state: "Tây Nguyên", lat: 11.9404, lng: 108.4583, population: 258000, isCapital: false },
  { name: "Quy Nhơn", state: "Miền Trung", lat: 13.7765, lng: 109.2237, population: 311000, isCapital: false },
  { name: "Thanh Hóa", state: "Miền Bắc", lat: 19.8067, lng: 105.7852, population: 359000, isCapital: false },
  { name: "Hạ Long", state: "Miền Bắc", lat: 20.9599, lng: 107.0448, population: 300000, isCapital: false },
  { name: "Vũng Tàu", state: "Miền Nam", lat: 10.346, lng: 107.0843, population: 527000, isCapital: false },
  { name: "Thái Nguyên", state: "Miền Bắc", lat: 21.5928, lng: 105.8442, population: 360000, isCapital: false },
  { name: "Nam Định", state: "Miền Bắc", lat: 20.4388, lng: 106.1621, population: 360000, isCapital: false },
  { name: "Pleiku", state: "Tây Nguyên", lat: 13.9833, lng: 108.0, population: 230000, isCapital: false },
  { name: "Rạch Giá", state: "Miền Nam", lat: 10.0125, lng: 105.0808, population: 228000, isCapital: false },
  { name: "Cà Mau", state: "Miền Nam", lat: 9.1769, lng: 105.15, population: 226000, isCapital: false },
  { name: "Phan Thiết", state: "Miền Trung", lat: 10.9289, lng: 108.1021, population: 270000, isCapital: false },
  { name: "Mỹ Tho", state: "Miền Nam", lat: 10.36, lng: 106.36, population: 220000, isCapital: false },
  { name: "Lào Cai", state: "Miền Bắc", lat: 22.4856, lng: 103.9707, population: 130000, isCapital: false },
  { name: "Đồng Hới", state: "Miền Trung", lat: 17.4689, lng: 106.6223, population: 160000, isCapital: false },
];

export function findTown(name: string): DistanceTown | undefined {
  return VN_TOWNS.find((t) => t.name === name);
}
