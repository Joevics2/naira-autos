'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { DE_TOWNS } from '@/lib/distance-towns-de';
import { DE_CAPITAL_DISTANCE_KM } from '@/lib/de-distance-matrix';
import { DE_STRINGS } from '@/lib/distance-strings-de';

const CONFIG: DistanceCalcConfig = {
  basePath: '/entfernungsrechner-deutschland',
  towns: DE_TOWNS,
  verifiedMatrix: DE_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Berlin', to: 'Munich' },
    { from: 'Hamburg', to: 'Frankfurt' },
    { from: 'Berlin', to: 'Cologne' },
    { from: 'Munich', to: 'Hamburg' },
    { from: 'Frankfurt', to: 'Dresden' },
    { from: 'Munich', to: 'Cologne' },
    { from: 'Berlin', to: 'Hamburg' },
    { from: 'Munich', to: 'Stuttgart' },
  ],
  defaultFrom: 'Berlin',
  defaultTo: 'Munich',
  currencySymbol: '€',
  pumpPricePresets: [1.60, 1.75, 1.90, 2.05, 2.20],
  defaultPumpPrice: 1.90,
  strings: DE_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-germany', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorGermanyGermanClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
