'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { JP_TOWNS } from '@/lib/distance-towns-jp';
import { JP_CAPITAL_DISTANCE_KM } from '@/lib/jp-distance-matrix';
import { JA_STRINGS } from '@/lib/distance-strings-ja';

const CONFIG: DistanceCalcConfig = {
  basePath: '/tsuru/kyori-keisan',
  towns: JP_TOWNS,
  verifiedMatrix: JP_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Tokyo', to: 'Osaka' },
    { from: 'Tokyo', to: 'Nagoya' },
    { from: 'Nagoya', to: 'Kobe' },
    { from: 'Tokyo', to: 'Kyoto' },
    { from: 'Osaka', to: 'Fukuoka' },
    { from: 'Tokyo', to: 'Sapporo' },
    { from: 'Tokyo', to: 'Sendai' },
    { from: 'Tokyo', to: 'Hiroshima' },
  ],
  defaultFrom: 'Tokyo',
  defaultTo: 'Osaka',
  currencySymbol: '¥',
  pumpPricePresets: [140, 150, 165, 180, 195],
  defaultPumpPrice: 165,
  strings: JA_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorJapanClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
