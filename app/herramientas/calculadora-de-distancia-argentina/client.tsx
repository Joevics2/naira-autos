'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { AR_TOWNS } from '@/lib/distance-towns-ar';
import { AR_CAPITAL_DISTANCE_KM } from '@/lib/ar-distance-matrix';
import { ES_STRINGS } from '@/lib/distance-strings-es';

const CONFIG: DistanceCalcConfig = {
  basePath: '/herramientas/calculadora-de-distancia-argentina',
  towns: AR_TOWNS,
  verifiedMatrix: AR_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Buenos Aires', to: 'Córdoba' },
    { from: 'Buenos Aires', to: 'Mendoza' },
    { from: 'Córdoba', to: 'Mendoza' },
    { from: 'Buenos Aires', to: 'Rosario' },
    { from: 'Córdoba', to: 'Salta' },
    { from: 'Buenos Aires', to: 'Mar del Plata' },
    { from: 'Córdoba', to: 'Santa Fe' },
    { from: 'Buenos Aires', to: 'Ushuaia' },
  ],
  defaultFrom: 'Buenos Aires',
  defaultTo: 'Córdoba',
  currencySymbol: '$',
  pumpPricePresets: [1800, 1950, 2100, 2250, 2400],
  defaultPumpPrice: 2100,
  strings: ES_STRINGS,
  relatedTools: [
    { href: '/tools/fuel-cost-calculator-global', label: 'Calculadora de Costo de Combustible', highlight: true },
  ],
};

export default function DistanceCalculatorArgentinaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
