'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { IT_TOWNS } from '@/lib/distance-towns-it';
import { IT_CAPITAL_DISTANCE_KM } from '@/lib/it-distance-matrix';
import { IT_STRINGS } from '@/lib/distance-strings-it';

const CONFIG: DistanceCalcConfig = {
  basePath: '/calcolatore-di-distanza-italia',
  towns: IT_TOWNS,
  verifiedMatrix: IT_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Milan', to: 'Naples' },
    { from: 'Milan', to: 'Turin' },
    { from: 'Milan', to: 'Bologna' },
    { from: 'Milan', to: 'Genoa' },
    { from: 'Rome', to: 'Milan' },
    { from: 'Rome', to: 'Naples' },
    { from: 'Rome', to: 'Florence' },
    { from: 'Milan', to: 'Venice' },
  ],
  defaultFrom: 'Milan',
  defaultTo: 'Naples',
  currencySymbol: '€',
  pumpPricePresets: [1.60, 1.75, 1.90, 2.05, 2.20],
  defaultPumpPrice: 1.90,
  strings: IT_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-italy', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorItalyItalianClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
