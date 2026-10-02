'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { TH_TOWNS } from '@/lib/distance-towns-th';
import { TH_CAPITAL_DISTANCE_KM } from '@/lib/th-distance-matrix';
import { TH_STRINGS } from '@/lib/distance-strings-th';

const CONFIG: DistanceCalcConfig = {
  basePath: '/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang',
  towns: TH_TOWNS,
  verifiedMatrix: TH_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: "กรุงเทพฯ", to: "เชียงใหม่" },
    { from: "กรุงเทพฯ", to: "ภูเก็ต" },
    { from: "กรุงเทพฯ", to: "พัทยา" },
    { from: "กรุงเทพฯ", to: "นครราชสีมา" },
    { from: "กรุงเทพฯ", to: "หัวหิน" },
    { from: "เชียงใหม่", to: "เชียงราย" },
    { from: "กรุงเทพฯ", to: "ขอนแก่น" },
    { from: "กรุงเทพฯ", to: "สุราษฎร์ธานี" },
  ],
  defaultFrom: "กรุงเทพฯ",
  defaultTo: "เชียงใหม่",
  currencySymbol: "฿",
  pumpPricePresets: [30, 35, 38, 42, 46],
  defaultPumpPrice: 38,
  strings: TH_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorThailandClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
