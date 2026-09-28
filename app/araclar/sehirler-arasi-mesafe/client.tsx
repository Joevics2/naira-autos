'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { TR_TOWNS } from '@/lib/distance-towns-tr';
import { TR_CAPITAL_DISTANCE_KM } from '@/lib/tr-distance-matrix';
import { TR_STRINGS } from '@/lib/distance-strings-tr';

const CONFIG: DistanceCalcConfig = {
  basePath: '/araclar/sehirler-arasi-mesafe',
  towns: TR_TOWNS,
  verifiedMatrix: TR_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'İstanbul', to: 'Ankara' },
    { from: 'İstanbul', to: 'İzmir' },
    { from: 'İstanbul', to: 'Antalya' },
    { from: 'Ankara', to: 'Antalya' },
    { from: 'İzmir', to: 'Antalya' },
    { from: 'İstanbul', to: 'Trabzon' },
    { from: 'Ankara', to: 'Konya' },
    { from: 'İstanbul', to: 'Bursa' },
  ],
  defaultFrom: 'İstanbul',
  defaultTo: 'Ankara',
  currencySymbol: '₺',
  pumpPricePresets: [65, 73, 81, 89, 97],
  defaultPumpPrice: 81,
  strings: TR_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorTurkeyClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
