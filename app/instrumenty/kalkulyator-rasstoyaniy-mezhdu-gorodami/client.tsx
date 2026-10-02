'use client';

import DistanceCalculatorWidget, { type DistanceCalcConfig } from '@/components/distance-calculator/DistanceCalculatorWidget';
import { RU_TOWNS } from '@/lib/distance-towns-ru';
import { RU_CAPITAL_DISTANCE_KM } from '@/lib/ru-distance-matrix';
import { RU_STRINGS } from '@/lib/distance-strings-ru';

const CONFIG: DistanceCalcConfig = {
  basePath: '/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami',
  towns: RU_TOWNS,
  verifiedMatrix: RU_CAPITAL_DISTANCE_KM,
  popularRoutes: [
    { from: "Москва", to: "Санкт-Петербург" },
    { from: "Москва", to: "Казань" },
    { from: "Москва", to: "Нижний Новгород" },
    { from: "Москва", to: "Воронеж" },
    { from: "Москва", to: "Ростов-на-Дону" },
    { from: "Москва", to: "Краснодар" },
    { from: "Екатеринбург", to: "Челябинск" },
    { from: "Москва", to: "Ярославль" },
  ],
  defaultFrom: "Москва",
  defaultTo: "Санкт-Петербург",
  currencySymbol: "₽",
  pumpPricePresets: [50, 56, 62, 68, 75],
  defaultPumpPrice: 62,
  strings: RU_STRINGS,
  relatedTools: [
    { href: '/tools/distance-calculator-countries', label: 'English version', highlight: true },
  ],
};

export default function DistanceCalculatorRussiaClient() {
  return <DistanceCalculatorWidget config={CONFIG} />;
}
