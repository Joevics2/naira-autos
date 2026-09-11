'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { EG_TOWNS } from '@/lib/distance-towns-eg';
import { EG_CAPITAL_DISTANCE_KM } from '@/lib/eg-distance-matrix';
import { AR_STRINGS } from '@/lib/distance-strings-ar';

const CONFIG: DistanceCalcConfig = {
  basePath: '/adawat/hasbat-al-masafa-masr',
  towns: EG_TOWNS,
  verifiedMatrix: EG_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Cairo', to: 'Alexandria' },
    { from: 'Cairo', to: 'Luxor' },
    { from: 'Cairo', to: 'Aswan' },
    { from: 'Cairo', to: 'Hurghada' },
    { from: 'Cairo', to: 'Sharm El Sheikh' },
    { from: 'Luxor', to: 'Aswan' },
    { from: 'Cairo', to: 'Port Said' },
    { from: 'Hurghada', to: 'Luxor' },
  ],
  defaultFrom: 'Cairo',
  defaultTo: 'Alexandria',
  currencySymbol: 'ج.م',
  pumpPricePresets: [15, 18, 21, 24, 27],
  defaultPumpPrice: 21,
  strings: AR_STRINGS,
  dir: 'rtl',
  relatedTools: [
    { href: '/tools/distance-calculator-egypt', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorEgyptArabicClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
