'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { AE_TOWNS } from '@/lib/distance-towns-ae';
import { AE_CAPITAL_DISTANCE_KM } from '@/lib/ae-distance-matrix';
import { AR_STRINGS } from '@/lib/distance-strings-ar';

const CONFIG: DistanceCalcConfig = {
  basePath: '/adawat/hasbat-al-masafa-alemarat',
  towns: AE_TOWNS,
  verifiedMatrix: AE_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Abu Dhabi', to: 'Dubai' },
    { from: 'Dubai', to: 'Sharjah' },
    { from: 'Dubai', to: 'Al Ain' },
    { from: 'Dubai', to: 'Ras Al Khaimah' },
    { from: 'Abu Dhabi', to: 'Al Ain' },
    { from: 'Dubai', to: 'Fujairah' },
    { from: 'Dubai', to: 'Hatta' },
    { from: 'Sharjah', to: 'Ras Al Khaimah' },
  ],
  defaultFrom: 'Abu Dhabi',
  defaultTo: 'Dubai',
  currencySymbol: 'د.إ',
  pumpPricePresets: [3.0, 3.25, 3.49, 3.75, 4.0],
  defaultPumpPrice: 3.49,
  strings: AR_STRINGS,
  dir: 'rtl',
  relatedTools: [
    { href: '/tools/distance-calculator-uae', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorUaeArabicClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
