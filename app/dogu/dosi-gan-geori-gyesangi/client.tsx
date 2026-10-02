'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { KR_TOWNS } from '@/lib/distance-towns-kr';
import { KR_CAPITAL_DISTANCE_KM } from '@/lib/kr-distance-matrix';
import { KR_STRINGS } from '@/lib/distance-strings-kr';

const CONFIG: DistanceCalcConfig = {
  basePath: '/dogu/dosi-gan-geori-gyesangi',
  towns: KR_TOWNS,
  verifiedMatrix: KR_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: "서울", to: "부산" },
    { from: "서울", to: "대전" },
    { from: "서울", to: "강릉" },
    { from: "서울", to: "광주" },
    { from: "서울", to: "대구" },
    { from: "부산", to: "대구" },
    { from: "서울", to: "전주" },
    { from: "부산", to: "울산" },
  ],
  defaultFrom: "서울",
  defaultTo: "부산",
  currencySymbol: "₩",
  pumpPricePresets: [1500, 1650, 1750, 1850, 2000],
  defaultPumpPrice: 1750,
  strings: KR_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorSouthKoreaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
