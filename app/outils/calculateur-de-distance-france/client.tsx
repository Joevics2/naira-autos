'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { FR_TOWNS } from '@/lib/distance-towns-fr';
import { FR_CAPITAL_DISTANCE_KM } from '@/lib/fr-distance-matrix';
import { FR_STRINGS } from '@/lib/distance-strings-fr';

const CONFIG: DistanceCalcConfig = {
  basePath: '/outils/calculateur-de-distance-france',
  towns: FR_TOWNS,
  verifiedMatrix: FR_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Paris', to: 'Lyon' },
    { from: 'Lyon', to: 'Marseille' },
    { from: 'Paris', to: 'Marseille' },
    { from: 'Bordeaux', to: 'Toulouse' },
    { from: 'Paris', to: 'Strasbourg' },
    { from: 'Paris', to: 'Bordeaux' },
    { from: 'Paris', to: 'Nice' },
    { from: 'Paris', to: 'Nantes' },
  ],
  defaultFrom: 'Paris',
  defaultTo: 'Lyon',
  currencySymbol: '€',
  pumpPricePresets: [1.55, 1.70, 1.85, 2.00, 2.15],
  defaultPumpPrice: 1.85,
  strings: FR_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-france', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorFranceFrenchClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
