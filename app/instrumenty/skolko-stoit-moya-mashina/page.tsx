import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { SkolkoStoitMoyaMashinaClient } from './client';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Сколько стоит моя машина? Бесплатная оценка AI | Naira Autos',
  description: 'Оцените свой автомобиль бесплатно с помощью AI в вашей валюте. Загрузите одно фото и получите рыночную стоимость за несколько секунд.',
  keywords: 'сколько стоит моя машина, бесплатная оценка автомобиля, цена автомобиля с пробегом, оценка авто с помощью AI, оценка стоимости машины',
  openGraph: {
    title: 'Сколько стоит моя машина? Бесплатная оценка AI',
    description: 'Оцените свой автомобиль с помощью AI в вашей валюте. Загрузите одно фото и сразу получите диапазон цены — полностью бесплатно.',
    url: 'https://www.naira.autos/instrumenty/skolko-stoit-moya-mashina',
    siteName: 'Naira Autos',
    locale: 'ru_RU',
    type: 'website',
  },
  alternates: alternatesFor('/instrumenty/skolko-stoit-moya-mashina'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Сколько стоит моя машина? Бесплатная оценка AI',
  description: 'Бесплатный инструмент оценки автомобиля с помощью AI. Получите мгновенную оценку в вашей валюте, адаптированную под рынок вашей страны.',
  url: 'https://www.naira.autos/instrumenty/skolko-stoit-moya-mashina',
  inLanguage: 'ru',
  dateModified: '2026-10-04',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Оценка автомобиля с помощью AI — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Загрузите фото своего автомобиля и мгновенно получите оценку рыночной стоимости в вашей валюте с помощью AI.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://www.naira.autos/glavnaya' },
      { '@type': 'ListItem', position: 2, name: 'Инструменты', item: 'https://www.naira.autos/instrumenty' },
      { '@type': 'ListItem', position: 3, name: 'Сколько стоит моя машина', item: 'https://www.naira.autos/instrumenty/skolko-stoit-moya-mashina' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Сколько стоит моя машина с пробегом?', acceptedAnswer: { '@type': 'Answer', text: 'Это зависит от марки, модели, года выпуска, комплектации, пробега и общего состояния, а также от текущих цен продажи похожих автомобилей в вашей стране. Загрузите фото выше и выберите свою страну — AI распознает ваш автомобиль и даст диапазон цены в вашей валюте на основе реальных данных объявлений с этого рынка.' } },
      { '@type': 'Question', name: 'Какие факторы влияют на оценку автомобиля с пробегом?', acceptedAnswer: { '@type': 'Answer', text: 'Основные факторы: (1) Марка и модель — некоторые автомобили лучше сохраняют стоимость в зависимости от рынка. (2) Год выпуска, комплектация и пробег. (3) Состояние кузова и покраски. (4) Техническое состояние и история обслуживания. (5) Полный комплект документов и регистрация. (6) Местный спрос и предложение — один и тот же автомобиль может продаваться по разной цене в разных странах.' } },
      { '@type': 'Question', name: 'Влияет ли моя страна на оценку автомобиля?', acceptedAnswer: { '@type': 'Answer', text: 'Да, значительно. Таможенные пошлины, местный спрос на определённые марки, курс валюты и размер рынка автомобилей с пробегом создают большие различия в ценах между странами. Наш инструмент поддерживает несколько стран и выдаёт оценку в местной валюте, адаптированную под конкретный рынок, а не глобальное усреднение.' } },
      { '@type': 'Question', name: 'Насколько точна оценка с помощью AI?', acceptedAnswer: { '@type': 'Answer', text: 'Наш инструмент использует технологию компьютерного зрения для точного распознавания марки, модели, года и комплектации по вашему фото, а затем сравнивает это с реальными данными объявлений в выбранной стране, чтобы дать диапазон цены, а не одно число. Считайте это надёжной отправной точкой для переговоров, а не точной ценой — реальная стоимость всегда зависит от личного осмотра и переговоров.' } },
      { '@type': 'Question', name: 'Этот инструмент оценки действительно бесплатный?', acceptedAnswer: { '@type': 'Answer', text: 'Да. Никакой оплаты, регистрация не требуется, и нет ограничений на количество использований.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Марка и сохранение стоимости', body: 'Сохранение остаточной стоимости отличается от рынка к рынку — Toyota и Honda часто хорошо держат цену во многих регионах, тогда как немецкие премиальные марки могут быстрее терять в цене на рынках с высокой стоимостью обслуживания. Местный спрос важен не меньше, чем сама марка.' },
  { icon: Shield, title: 'Пробег и история обслуживания', body: 'Низкий пробег и зафиксированная история обслуживания — два самых надёжных показателя хорошо ухоженного автомобиля в любой стране мира. Подтверждённая история техобслуживания может стоить дороже, чем автомобиль на год новее.' },
  { icon: CheckCircle2, title: 'Документы и право собственности', body: 'Полный и действующий комплект документов, а также актуальная регистрация необходимы для получения лучшей цены на любом рынке. Неполные документы или проблемы с таможней могут снизить цену на 15–25%.' },
  { icon: AlertCircle, title: 'Общее состояние', body: 'Чистый кузов без царапин, ржавчины или выгоревшей краски, а также исправно работающий двигатель стабильно приносят на 10–15% больше, чем аналогичный автомобиль с явными следами использования.' },
];

const FAQ_ITEMS = [
  { q: 'Сколько стоит моя машина с пробегом?', a: 'Зависит от марки, модели, года выпуска, комплектации, пробега и состояния, а также текущих цен продажи похожих автомобилей в вашей стране. Загрузите фото и выберите страну, чтобы получить оценку AI в вашей валюте.' },
  { q: 'Какие факторы влияют на оценку автомобиля с пробегом?', a: 'Марка и модель, год выпуска и комплектация, пробег, состояние кузова и двигателя, полный комплект документов, а также спрос и предложение на вашем рынке.' },
  { q: 'Влияет ли моя страна на оценку автомобиля?', a: 'Да — таможенные пошлины, местный спрос на определённые марки, курс валюты и размер рынка создают разницу в ценах между странами. Мы поддерживаем несколько стран и указываем цену в местной валюте.' },
  { q: 'Как определить правильную цену перед продажей?', a: 'Используйте наш бесплатный инструмент оценки AI, чтобы получить ориентировочное число, а затем посмотрите действующие объявления похожих автомобилей в вашем регионе. Цена на 5–10% выше минимально приемлемой суммы обычно оставляет пространство для переговоров.' },
  { q: 'Насколько точна оценка с помощью AI?', a: 'Использует компьютерное зрение для точного распознавания вашего автомобиля по фото, а затем сравнивает это с реальными данными объявлений в выбранной стране. Считайте это надёжной отправной точкой, а не точной ценой — реальная стоимость зависит от осмотра и переговоров.' },
  { q: 'Этот инструмент оценки автомобиля бесплатный?', a: 'Да — без оплаты, без регистрации, без ограничений на использование.' },
];

export default function SkolkoStoitMoyaMashinaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-left">
              <Link href="/instrumenty" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Назад">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Навигационная цепочка" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/glavnaya" className="hover:text-white/60 transition-colors">Главная</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/instrumenty" className="hover:text-white/60 transition-colors">Инструменты</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Сколько стоит моя машина</span>
              </nav>
              <LanguagePills path="/instrumenty/skolko-stoit-moya-mashina" className="ms-auto" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                С помощью AI · Бесплатно
              </span>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Сколько стоит<br /><span className="text-amber-400">ваш автомобиль?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Загрузите одно фото — получите мгновенную оценку рыночной стоимости в вашей валюте на основе реальных данных объявлений и AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Анализ по фото</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Россия и весь мир</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Бесплатно</span>
            </div>
          </div>
        </div>

        {/* ── Инструмент оценки ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <SkolkoStoitMoyaMashinaClient />
          </div>
        </div>

        {/* ── SEO-контент ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Понимание стоимости вашего автомобиля</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Что определяет цену автомобиля с пробегом?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUATION_FACTORS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            <h2 className="font-black uppercase text-foreground not-prose leading-none mb-4" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Оценка автомобиля: полное руководство
            </h2>

            <p>Знание реальной рыночной стоимости вашего автомобиля — самый важный шаг перед размещением объявления, обменом или переговорами о покупке, где бы вы ни находились. Слишком высокая цена приводит к тому, что объявление игнорируют и оно висит без продажи. Слишком низкая цена означает, что вы теряете реальные деньги. Проблема в том, что <strong className="text-foreground">&laquo;рыночная стоимость&raquo; — это не фиксированное число</strong> — она меняется в зависимости от страны, валюты, местного спроса на конкретную марку и уникальной истории и состояния каждого автомобиля.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Почему один и тот же автомобиль не стоит одинаково повсюду</h3>
            <p>Пятилетняя Toyota Corolla в хорошем состоянии может стоить весьма по-разному в разных странах ещё до пересчёта валюты. Таможенные пошлины и местные налоги на автомобили с пробегом сильно различаются от страны к стране. На некоторых рынках существует высокий местный спрос на определённые марки, что удерживает остаточную стоимость на высоком уровне. На других рынках более широкое предложение новых автомобилей снижает интерес покупателей к автомобилям с пробегом, что уменьшает остаточную стоимость. Поэтому единое глобальное ценовое руководство не работает — оценка должна быть адаптирована по странам.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Пробег и история обслуживания</h3>
            <p>Практически на любом рынке пробег и зафиксированная история обслуживания — гораздо более надёжные показатели состояния автомобиля, чем то, что может показать фото. Автомобиль с меньшим пробегом и полной документацией об обслуживании обычно имеет явное ценовое преимущество перед похожим автомобилем с большим пробегом, даже если на фото они выглядят одинаково. Отсутствующая или неполная история обслуживания — один из самых быстрых способов, которым продавец теряет позицию на переговорах.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Право собственности, регистрация и документы</h3>
            <p>В каждой стране, которую мы поддерживаем, <strong className="text-foreground">полный и действующий комплект документов необходим для получения наилучшей цены</strong>. Покупатели справедливо предлагают меньше за автомобили с неполными документами, неоплаченными таможенными пошлинами или неполной регистрацией, потому что риск проблем с передачей права собственности реален в любой стране. Решение вопросов с документами перед размещением объявления обычно обходится гораздо дешевле, чем скидка, которую иначе потребует покупатель.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Общее состояние и внешний вид</h3>
            <p>Чистый кузов без царапин, ржавчины или выгоревшей краски, а также исправно работающий двигатель и трансмиссия стабильно приносят более высокую цену, продаётся ли автомобиль в Москве, Санкт-Петербурге или где-либо ещё, по сравнению с похожим автомобилем с явными следами использования. Небольшой, недорогой ремонт — тщательная мойка, устранение мелких царапин, замена перегоревшей лампочки — часто возвращается в итоговой цене продажи в несколько раз больше своей стоимости.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Валюта и выбор момента для продажи</h3>
            <p>В странах, сильно зависящих от импортных автомобилей с пробегом, цена на автомобиль тесно связана с колебаниями валютного курса — более слабая национальная валюта повышает стоимость импорта и толкает цены на автомобили с пробегом вверх, в то время как более сильная валюта даёт обратный эффект. Это означает, что оценка, сделанная год или два назад, может быть уже не актуальна для сегодняшней цены. Всегда проверяйте самые свежие рыночные данные, а не полагайтесь на устаревшие ценовые справочники или сумму, которую заплатил предыдущий владелец.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Как работает этот инструмент</h3>
            <p>Загрузите чёткое фото своего автомобиля и выберите страну. AI (Gemini Vision) распознаёт марку, модель, год выпуска и комплектацию по фото, а затем сравнивает это с актуальными реальными данными объявлений на выбранном рынке, чтобы дать диапазон цены в вашей валюте, а не одно число. Результат включает конкретные факторы, влияющие на оценку, чтобы вы понимали, почему получилось именно такое число. Этот инструмент создан как быстрая, бесплатная отправная точка для переговоров, а не замена личного осмотра.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Распространённые ошибки, снижающие стоимость вашего автомобиля</h3>
            <p>Многие продавцы невольно вредят себе, сравнивая свою цену всего с одним-двумя старыми объявлениями, не глядя на текущую рыночную ситуацию. Другая распространённая ошибка — не упоминать историю обслуживания в объявлении: простая фраза &laquo;в хорошем состоянии&raquo; без доказательств вызывает у покупателей сомнения, и они предлагают меньшую цену. Размытые или плохо освещённые фото также затрудняют покупателям оценку реального состояния, из-за чего они начинают подозревать, что что-то скрывается. Цена, слишком близкая к минимальной оценке, также не оставляет места для переговоров, которые покупатели вполне разумно ожидают, что может осложнить продажу с самого начала.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Чек-лист перед продажей</h3>
            <p>После получения оценки, но перед размещением объявления, несколько простых шагов могут заметно повысить итоговую цену продажи. Во-первых, тщательно вымойте автомобиль снаружи и внутри — чистая машина сразу создаёт у покупателя впечатление хорошего ухода, и это отражается на фотографиях. Во-вторых, соберите все доступные квитанции об обслуживании и документы в одном месте: показав их покупателю без напоминания, вы укрепляете доверие и получаете более сильную позицию на переговорах. В-третьих, лучше устранить мелкие недостатки до размещения объявления — перегоревшую лампочку или небольшую царапину дешево починить, но если их оставить, покупатель может воспринять это как признак более серьёзных проблем и потребовать скидку, намного превышающую реальную стоимость ремонта. Наконец, фотографируйте автомобиль при ярком естественном освещении с нескольких ракурсов, включая спереди, сзади, с обеих сторон, салон и панель приборов. Эта небольшая подготовка занимает всего пару часов, но может существенно повлиять на итоговую цену продажи.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Часто задаваемые вопросы</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Самые популярные вопросы
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group border border-border rounded-xl overflow-hidden bg-card">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Другие бесплатные инструменты
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/instrumenty" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Все инструменты</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/glavnaya" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Главная на русском</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
