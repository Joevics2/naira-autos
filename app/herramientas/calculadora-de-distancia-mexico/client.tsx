'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { MX_TOWNS } from '@/lib/distance-towns-mx';
import { MX_CAPITAL_DISTANCE_KM } from '@/lib/mx-distance-matrix';
import { ES_STRINGS } from '@/lib/distance-strings-es';

const CONFIG: DistanceCalcConfig = {
  basePath: '/herramientas/calculadora-de-distancia-mexico',
  towns: MX_TOWNS,
  verifiedMatrix: MX_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: 'Mexico City', to: 'Guadalajara' },
    { from: 'Mexico City', to: 'Monterrey' },
    { from: 'Guadalajara', to: 'Monterrey' },
    { from: 'Mexico City', to: 'Puebla' },
    { from: 'Mexico City', to: 'Cancún' },
    { from: 'Mexico City', to: 'Tijuana' },
    { from: 'Mexico City', to: 'Veracruz' },
    { from: 'Mexico City', to: 'Acapulco' },
  ],
  defaultFrom: 'Mexico City',
  defaultTo: 'Guadalajara',
  currencySymbol: '$',
  pumpPricePresets: [20, 22, 24, 26, 28],
  defaultPumpPrice: 23.8,
  strings: ES_STRINGS,
  relatedTools: [
    { href: '/tools/fuel-cost-calculator-global', label: 'Calculadora de Costo de Combustible', highlight: true },
  ],
};

export default function DistanceCalculatorMexicoClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
