'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { VN_TOWNS } from '@/lib/distance-towns-vn';
import { VN_CAPITAL_DISTANCE_KM } from '@/lib/vn-distance-matrix';
import { VN_STRINGS } from '@/lib/distance-strings-vn';

const CONFIG: DistanceCalcConfig = {
  basePath: '/cong-cu/khoang-cach-giua-cac-thanh-pho',
  towns: VN_TOWNS,
  verifiedMatrix: VN_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: "Hà Nội", to: "TP. Hồ Chí Minh" },
    { from: "Hà Nội", to: "Hải Phòng" },
    { from: "Hà Nội", to: "Đà Nẵng" },
    { from: "Đà Nẵng", to: "Huế" },
    { from: "TP. Hồ Chí Minh", to: "Vũng Tàu" },
    { from: "TP. Hồ Chí Minh", to: "Đà Lạt" },
    { from: "TP. Hồ Chí Minh", to: "Cần Thơ" },
    { from: "TP. Hồ Chí Minh", to: "Nha Trang" },
  ],
  defaultFrom: "Hà Nội",
  defaultTo: "TP. Hồ Chí Minh",
  currencySymbol: "₫",
  pumpPricePresets: [18000, 20000, 22000, 24000, 26000],
  defaultPumpPrice: 22000,
  strings: VN_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorVietnamClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
