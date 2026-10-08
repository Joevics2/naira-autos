// app/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorRussiaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RU_TOWNS, findTown } from '@/lib/distance-towns-ru';
import { RU_CAPITAL_DISTANCE_KM } from '@/lib/ru-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: "Калькулятор расстояний между городами России 2026 — расстояние по дорогам",
  description: "Рассчитайте расстояние по дорогам и время в пути между 32 городами России — Москва, Санкт-Петербург, Казань, Екатеринбург и другие. С калькулятором расхода топлива.",
  alternates: alternatesFor('/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami'),
  openGraph: {
    title: "Калькулятор расстояний между городами России 2026",
    description: "Расстояние по дорогам и время в пути между 32 городами России, с калькулятором расхода топлива.",
    url: 'https://www.naira.autos/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami',
    siteName: 'Naira Autos',
    locale: 'ru',
    type: 'website',
  },
  keywords: ["расстояние между городами", "расстояние москва санкт-петербург", "расстояние москва казань", "калькулятор расстояний", "расход топлива москва санкт-петербург"],
};

const HUB_TOWN = findTown("Москва")!;

const FAQ = [{"q": "Какие города есть в калькуляторе?", "a": "В калькулятор входят 32 крупных городов России, включая Москву, Санкт-Петербург, Казань, Екатеринбург, Новосибирск, Краснодар и Владивосток."}, {"q": "Учитывает ли время в пути пробки?", "a": "Калькулятор показывает два значения: идеальное и более реалистичное время, исходя из средней скорости. Это не данные о пробках в реальном времени — текущую обстановку смотрите, открыв маршрут в Google Картах."}, {"q": "Насколько точны цифры на странице?", "a": "Все цифры — оценка, они не сверялись с официальными источниками, поэтому подходят для предварительного планирования. Реальный маршрут проверьте в навигаторе."}, {"q": "Можно ли рассчитать расход топлива?", "a": "Да — выберите тип автомобиля и цену за литр (₽) в калькуляторе выше, и расстояние превратится в расход топлива и стоимость."}];
const METHOD: string[] = ["Все расстояния на этой странице — оценочные. Мы считаем их по прямой между координатами городов и умножаем на коэффициент извилистости дорог, откалиброванный по проверенной дорожной матрице Нигерии. Источника, который покрывал бы все маршруты по России и подтверждался бы несколькими независимыми данными, мы не нашли, поэтому ни один маршрут не помечен как «проверенный» — мы не хотим заявлять точность, которой у нас нет.", "Для очень длинных маршрутов, например в Сибири и на Дальнем Востоке, погрешность может быть заметной. У Калининграда нет прямой дороги из остальной России (путь проходит через другие страны или по морю), поэтому для него показана лишь оценка по прямой. Перед дальней поездкой проверьте маршрут в навигаторе."];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami',
      name: "Калькулятор расстояний между городами России 2026 — расстояние по дорогам",
      description: "Расстояние по дорогам и время в пути между 32 городами России, с калькулятором расхода топлива.",
      url: 'https://www.naira.autos/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami',
      dateModified: '2026-10-02',
      inLanguage: 'ru',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: "Инструменты", item: 'https://www.naira.autos/instrumenty' },
        { '@type': 'ListItem', position: 2, name: "Россия", item: 'https://www.naira.autos/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'SoftwareApplication',
      name: "Калькулятор расстояний между городами России",
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'ru',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'RUB' },
    },
  ],
};

export default function DistanceCalculatorRussiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="ru" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link prefetch={false}
              href="/instrumenty"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Назад"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/instrumenty" className="hover:text-white/60 transition-colors">{"Инструменты"}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">{"Россия"}</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{"Бесплатно · 32 городов"}</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">{"Проверено: октябрь 2026"}</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Расстояние между городами"}
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              {"Рассчитайте расстояние по дорогам и время в пути между крупнейшими городами России — от Москвы и Санкт-Петербурга до Новосибирска и Владивостока."}
            </p>
            <Link prefetch={false} href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorRussiaClient />
          </div>
        </div>
      </div>

      <div lang="ru" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Откуда берутся эти цифры"}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              {METHOD.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Что на самом деле отнимает время в дороге"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {"Реальное время в пути часто больше, чем подсказывает расстояние. Зимой на трассах возможны снег, гололёд и ограничения скорости, а в весеннюю распутицу состояние дорог ухудшается. На платных участках, например на трассе М-11 «Нева» между Москвой и Санкт-Петербургом, нужно закладывать плату за проезд помимо топлива. В Сибири и на Дальнем Востоке заправки могут встречаться редко, поэтому планируйте остановки заранее. Считайте эти цифры основой для планирования и проверяйте актуальную дорожную обстановку перед выездом."}
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            {"Проверено: "}<Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>{", эксперт по продаже автомобилей. Все расстояния — оценка по формуле гаверсинусов."}
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Расстояние от Москвы до каждого города (от ближних к дальним)"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{"Остальные 31 городов инструмента, от ближайшего к самому дальнему от Москвы."}</p>
            <DistanceTable hub={HUB_TOWN} towns={RU_TOWNS} verifiedMatrix={RU_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Частые вопросы — расстояния между городами России"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
