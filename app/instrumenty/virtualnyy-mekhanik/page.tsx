import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientRU from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'ИИ-механик — бесплатная онлайн-диагностика автомобиля | Naira Autos',
  description: 'Бесплатный виртуальный механик на основе искусственного интеллекта. Опишите неисправность, загрузите фото, звук или видео и мгновенно получите диагноз со стоимостью ремонта. Регистрация не требуется.',
  alternates: {
    canonical: 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'it': 'https://www.naira.autos/strumenti/meccanico-virtuale',
      'nl': 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      'tr': 'https://www.naira.autos/araclar/sanal-usta',
      'vi': 'https://www.naira.autos/cong-cu/tho-may-ao',
      'id': 'https://www.naira.autos/alat/montir-virtual',
      'th': 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      'hi': 'https://www.naira.autos/upkaran/aabhasi-mekanik',
      'ko': 'https://www.naira.autos/dogu/gasang-jeongbisa',
      'ru': 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — бесплатный ИИ виртуальный механик | Naira Autos',
    description: 'Мгновенная онлайн-диагностика автомобиля, где бы вы ни находились. Загрузите звук двигателя, фото или опишите неисправность. Получите уровень срочности, вероятные причины, дальнейшие шаги и стоимость ремонта. Бесплатно, регистрация не нужна.',
    url: 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
    locale: 'ru_RU',
    type: 'website',
  },
  keywords: ['виртуальный механик', 'бесплатный онлайн механик', 'онлайн диагностика автомобиля', 'бесплатная диагностика машины', 'что случилось с моей машиной', 'онлайн автосервис', 'спросить механика онлайн', 'рассчитать стоимость ремонта авто', 'ИИ механик', 'проверить машину онлайн', 'диагностика по звуку двигателя', 'оценка стоимости ремонта автомобиля'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
      name: 'ИИ-механик — бесплатная онлайн-диагностика автомобиля',
      description: 'Бесплатный виртуальный механик на основе искусственного интеллекта. Загрузите звук двигателя, фото или опишите неисправность. Получите мгновенный диагноз с уровнем срочности и стоимостью ремонта.',
      url: 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
      inLanguage: 'ru',
      dateModified: '2026-09-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://www.naira.autos/glavnaya' },
          { '@type': 'ListItem', position: 2, name: 'Инструменты', item: 'https://www.naira.autos/instrumenty' },
          { '@type': 'ListItem', position: 3, name: 'ИИ-механик', item: 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Что такое виртуальный механик и как он работает?',
          acceptedAnswer: { '@type': 'Answer', text: 'Виртуальный механик — это инструмент, который использует искусственный интеллект для удалённой диагностики неисправностей вашего автомобиля. Вы описываете проблему, при желании загружаете фото, звук или видео, а ИИ анализирует всё это на основе огромной базы данных известных неисправностей, чтобы дать диагноз с уровнем срочности и примерной стоимостью ремонта.' },
        },
        {
          '@type': 'Question',
          name: 'Может ли ИИ диагностировать мою машину только по звуку двигателя?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да. Запишите стук, писк или скрежет — достаточно даже 10 секунд записи на телефон. ИИ анализирует звуковой паттерн, чтобы определить, например, износ подшипников, изношенные тормозные колодки или другую конкретную неисправность.' },
        },
        {
          '@type': 'Question',
          name: 'Это бесплатно?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да. Полностью бесплатно — без регистрации, без подписки, без оплаты. Зайдите на страницу и сразу начните диагностику.' },
        },
        {
          '@type': 'Question',
          name: 'Всегда ли диагноз ИИ точен?',
          acceptedAnswer: { '@type': 'Answer', text: 'Нет — он не всегда точен на 100%. Это хорошая отправная точка на основе предоставленного вами описания, фото, звука или видео, но он может упустить то, что можно обнаружить только при физическом осмотре на подъёмнике со сканером. Считайте это первым мнением, а не окончательным ответом, и всегда лично обращайтесь к квалифицированному механику при неисправностях тормозов, рулевого управления или топливной системы, что бы ни говорил диагноз.' },
        },
        {
          '@type': 'Question',
          name: 'Работает ли это с BMW, Mercedes, Toyota или другими марками?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да. Спрашивайте о неисправности BMW, Mercedes, Toyota или любой другой марки — ИИ охватывает всех крупных производителей. Стоимость ремонта откалибрована по нигерийскому рынку; если вы находитесь в другой стране, используйте её как общий ориентир, а не точную местную цифру.' },
        },
        {
          '@type': 'Question',
          name: 'Это то же самое, что спросить в группе в мессенджере или на автофоруме?',
          acceptedAnswer: { '@type': 'Answer', text: 'Это лучше во многих отношениях. На форуме или в чате вы получаете мнение только одного человека на основе текстового описания. Наш виртуальный механик анализирует ваше описание вместе с загруженными фото, звуком или видео, сравнивает его с тысячами известных паттернов неисправностей и выдаёт диагноз, отсортированный по вероятности, с указанием уровня уверенности.' },
        },
        {
          '@type': 'Question',
          name: 'Сохраняется ли история моих разговоров на ваших серверах?',
          acceptedAnswer: { '@type': 'Answer', text: 'Нет. Вся история хранится только на вашем устройстве, с использованием локального хранилища браузера. Мы не храним на наших серверах ничего, кроме активного сообщения, которое вы отправляете для диагностики. Вы можете удалить историю в любое время через боковое меню.' },
        },
        {
          '@type': 'Question',
          name: 'Могу ли я получить стоимость ремонта для любой марки автомобиля?',
          acceptedAnswer: { '@type': 'Answer', text: 'Да. Мы охватываем Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot и любые другие крупные марки, где бы вы ни ездили. Стоимость является примерным международным ориентиром.' },
        },
        {
          '@type': 'Question',
          name: 'Что делать, если мне нужен выездной механик или автосервис поблизости?',
          acceptedAnswer: { '@type': 'Answer', text: 'Наш инструмент сначала диагностирует проблему, чтобы вы точно знали, что спрашивать, прежде чем начать поиск. Если неисправность требует физического осмотра или специального оборудования, мы чётко об этом сообщим.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — ИИ виртуальный механик',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Бесплатный виртуальный механик на основе искусственного интеллекта. Опишите неисправность, загрузите звук двигателя или фото и мгновенно получите диагноз со стоимостью ремонта, откалиброванной по нигерийскому рынку.',
      url: 'https://www.naira.autos/instrumenty/virtualnyy-mekhanik',
      inLanguage: 'ru',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageRU() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientRU />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Последняя проверка: сентябрь 2026</p>

          {/* Полное покрытие */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Полное покрытие</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Что предлагает наш виртуальный механик?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Нужна ли вам быстрая оценка стоимости ремонта, хотите ли вы спросить механика онлайн перед визитом в автосервис, или хотите рассчитать, во сколько обойдётся ремонт вашей машины — этот инструмент решает всё это бесплатно.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Диагностика неисправностей двигателя', desc: 'Стук, пропуски зажигания, нестабильные обороты холостого хода, перегрев, лампа check engine — ИИ определяет наиболее вероятные причины, отсортированные по вероятности.' },
                { title: 'Анализ звука и аудио', desc: 'Загрузите запись стука, писка или скрежета. ИИ анализирует звуковой паттерн, чтобы определить неисправность.' },
                { title: 'Мгновенный уровень срочности', desc: 'Каждый диагноз сопровождается чётким вердиктом по четырём уровням: можно ехать безопасно, внимательно следить, скоро к механику, или остановите машину сейчас.' },
                { title: 'Оценка стоимости ремонта онлайн', desc: 'Стоимость откалибрована по нигерийскому рынку в качестве ориентира — реальная стоимость запчастей и работы отличается в зависимости от страны и города. Используйте это как отправную точку, а затем получите местную смету.' },
                { title: 'Шаги, которые можно выполнить самому', desc: 'Если неисправность можно проверить или устранить самостоятельно, мы точно расскажем как — прежде чем вы потратите деньги на механика.' },
                { title: 'Продолжающийся разговор', desc: 'Задавайте уточняющие вопросы и получайте ответы с полным контекстом. Каждая сессия сохраняется на вашем устройстве.' },
                { title: 'Поддержка всех марок', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot и любые другие марки и рынки.' },
                { title: 'Диагностика по фото и видео', desc: 'Отправьте фото сигнальных ламп на приборной панели, необычной утечки жидкости или видимого повреждения. Каждый дополнительный медиафайл значительно повышает точность диагноза.' },
                { title: 'Определение деталей', desc: 'Каждый диагноз включает конкретные детали, которые, скорее всего, задействованы, чтобы вы точно знали, что спрашивать в любом автосервисе или магазине запчастей.' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Что такое виртуальный механик с искусственным интеллектом?
              </h2>
              <p className="mb-3"><strong className="text-foreground">Виртуальный механик</strong> — это именно то, что следует из названия: механик, с которым вы общаетесь текстом, фото, звуком или видео, а не лично. Вы описываете, что происходит с вашей машиной — тот странный стук при холодном запуске, лампа check engine, которая не гаснет, тормоза, которые кажутся мягкими — и через несколько секунд получаете ответ, основанный на глубоких знаниях о реальных автомобильных неисправностях.</p>
              <p>Axion, наш <strong className="text-foreground">ИИ-механик</strong>, работает со всеми марками и во всех странах, но имеет дополнительное преимущество для тех, кто ездит в Нигерии: он понимает, как поддельное топливо влияет на форсунки, как тропическая жара быстрее изнашивает резиновые уплотнения и как выбоины на дорогах повреждают подвеску быстрее, чем на других рынках.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Как получить диагностику автомобиля менее чем за минуту
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Опишите неисправность.</strong> Напишите, что происходит — чем подробнее, тем лучше. Когда это началось? Происходит только при холодном двигателе, при ускорении, при повороте руля?</p>
                <p><strong className="text-foreground">2. Загрузите фото, аудиозапись или видео (необязательно, но очень полезно).</strong> 10-секундная запись звука двигателя часто полезнее, чем целый абзац описания.</p>
                <p><strong className="text-foreground">3. Получите диагноз мгновенно.</strong> Уровень срочности, вероятные причины, отсортированные по вероятности, что можно проверить самостоятельно, и оценку стоимости ремонта.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Стоимость ремонта: избегайте переплаты
              </h2>
              <p className="mb-3">Один из самых распространённых способов переплатить в автосервисе — прийти туда, не зная, сколько должен стоить ремонт. Перед посещением любого автосервиса используйте нашу оценку <strong className="text-foreground">стоимости ремонта</strong>, чтобы узнать справедливую цену — с чётким разделением стоимости запчастей и работы.</p>
              <p>Оценка учитывает ваш конкретный автомобиль — марку, модель, год — и наиболее вероятную неисправность на основе вашего описания. Это не общая цифра: Camry 2010 года с пробегом 180 000 км с низким давлением масла получит другую оценку, чем Camry 2020 года с пробегом 40 000 км с той же лампой, потому что вероятная причина отличается.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Работает со всеми марками: Toyota, BMW, Mercedes, Honda и другими
              </h2>
              <p className="mb-3">Неважно, на чём вы ездите. У ИИ есть конкретные паттерны неисправностей для каждого производителя — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen и почти любой другой марки, которая сегодня на дорогах. Укажите марку, модель и год один раз, и диагноз будет адаптирован к известным неисправностям именно этого автомобиля с этим пробегом, а не даст общий ответ, одинаково применимый к любой машине.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Почему диагностика по звуку двигателя меняет всё
              </h2>
              <p className="mb-3">Описания субъективны — «странный звук» означает разное для каждого человека. Звук — нет. Стук при холодном запуске звучит иначе, чем писк при торможении, а тот, в свою очередь, звучит иначе, чем скрежет при повороте руля. Загрузив 10-секундную запись, вы получите от ИИ гораздо более точный диагноз, чем возможно с помощью одного лишь текста.</p>
              <p>Вам не нужно профессиональное оборудование. Микрофона вашего телефона достаточно — просто держите его ближе к источнику звука, пока двигатель работает, и загрузите запись.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Поддерживаемые автомобили</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Грузовики', 'Автобусы', 'Мотоциклы'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Ключевые факты</h3>
              <ul className="space-y-2.5">
                {[
                  '100% бесплатно — без подписки',
                  'Не нужен аккаунт или регистрация',
                  'Работает на мобильных и компьютерах',
                  'Международный ориентир стоимости ремонта',
                  'Доступно 24/7 — даже по воскресеньям',
                  'История разговоров хранится локально',
                  'Неограниченное количество уточняющих вопросов',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Также на Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Бесплатная оценка автомобиля', href: '/evaluate-car' },
                  { label: 'Анализатор звука двигателя', href: '/tools/engine-sound-analyzer' },
                  { label: 'Калькулятор импортной пошлины', href: '/tools/import-duty-calculator' },
                  { label: 'Чек-лист документов', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* Дополнительный интеллект */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Дополнительный интеллект</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Также адаптирован к местным дорожным условиям
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Диагностика работает одинаково, где бы вы ни ездили. Но большинство инструментов виртуального механика обучены только на данных из западных автосервисов — они не знают, что поддельное топливо в Нигерии снижает вязкость масла на 40% быстрее, чем ожидает производитель, или что улицы Лагоса могут разрушить шарнир равных угловых скоростей за 30 000 км, хотя он должен служить до 150 000 км.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion знает и об этом. Спросите о стуке в вашей Toyota Corolla после заправки, и если вы в Нигерии, он сначала рассмотрит поддельное топливо — потому что статистически это наиболее вероятная причина там.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Некачественное топливо', desc: 'Понимает, как поддельное топливо влияет на датчики детонации, форсунки и вязкость масла.' },
                  { title: 'Влияние тропической жары', desc: 'Учитывает температуру окружающей среды от 35°C и выше, которая ускоряет износ резиновых уплотнений.' },
                  { title: 'Повреждения от выбоин', desc: 'Распознаёт паттерны неисправностей подвески и шин, характерные для плохих дорог.' },
                  { title: 'Местные цены на запчасти', desc: 'Оценка стоимости рассчитывается на основе данных с рынков запчастей и зарегистрированных автосервисов.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Сравнение */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Сравнение</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Виртуальный механик и другие варианты
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Характеристика</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">ИИ-механик</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Визит в автосервис</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Группа/Форум</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Доступно 24/7', 'Да', 'Нет', 'Иногда'],
                    ['Бесплатно', 'Да', 'Нет', 'Да'],
                    ['Не требует поездки', 'Да', 'Нет', 'Да'],
                    ['Оценка стоимости', 'Да', 'По-разному', 'Нет'],
                    ['Анализ аудио/видео', 'Да', 'Да', 'Нет'],
                    ['Мгновенный ответ', 'Да', 'Нет', 'Иногда'],
                    ['Стабильное качество', 'Да', 'По-разному', 'Нет'],
                    ['Сохраняет историю', 'Да', 'Нет', 'Нет'],
                  ].map(([feat, ai, workshop, forum]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-4 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{ai}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{workshop}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{forum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Частые вопросы */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Часто задаваемые вопросы</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Часто задаваемые вопросы
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Что такое виртуальный механик и как он работает?', a: 'Это инструмент, который использует искусственный интеллект для удалённой диагностики неисправностей вашего автомобиля. Вы описываете проблему, при желании загружаете медиафайлы, а ИИ сравнивает всё с огромной базой данных неисправностей — со стоимостью, откалиброванной по нигерийскому рынку.' },
                { q: 'Всегда ли диагноз ИИ точен?', a: 'Нет — он не всегда точен на 100%. Это хорошая отправная точка, но он может упустить то, что можно обнаружить только при физическом осмотре на подъёмнике со сканером. Считайте это первым мнением и всегда лично обращайтесь к механику при неисправностях тормозов, рулевого управления или топливной системы.' },
                { q: 'Работает ли это с BMW, Mercedes, Toyota или другими марками?', a: 'Да. Спрашивайте о любой марке — ИИ охватывает всех крупных производителей. Стоимость откалибрована по нигерийскому рынку; в других странах используйте её как общий ориентир.' },
                { q: 'Это то же самое, что спросить в группе в мессенджере?', a: 'Это лучше во многих отношениях. На форуме вы получаете мнение только одного человека. Наш сервис анализирует ваше описание вместе с фото, звуком или видео, сравнивает его с тысячами паттернов неисправностей и выдаёт отсортированный диагноз с уровнем уверенности.' },
                { q: 'Может ли он диагностировать мою машину только по звуку двигателя?', a: 'Да. Звук — один из наших самых мощных источников данных. Загрузите запись стука, писка или скрежета — достаточно даже 10 секунд записи на телефон. ИИ анализирует звуковой паттерн, чтобы определить вероятную неисправность.' },
                { q: 'Нужно ли создавать аккаунт или входить в систему?', a: 'Нет. ИИ-механик полностью бесплатен и не требует аккаунта, регистрации или личной информации. Данные вашего автомобиля сохраняются локально на вашем устройстве.' },
                { q: 'Сохраняется ли моя история на ваших серверах?', a: 'Нет. Вся история хранится только на вашем устройстве через локальное хранилище браузера. Мы не храним на наших серверах ничего, кроме активного сообщения.' },
                { q: 'Насколько точна оценка стоимости ремонта?', a: 'Она основана на данных нигерийского рынка — стоимости запчастей и работы в автосервисах Лагоса, Абуджи и Порт-Харкорта, в качестве ориентира. Мы даём диапазон (от минимума до максимума), чтобы вы знали, что разумно. Если автосервис предлагает цену намного выше нашего максимума, стоит это проверить.' },
                { q: 'Могу ли я получить стоимость ремонта для любой марки автомобиля?', a: 'Да. Мы охватываем Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot и любые другие крупные марки, где бы вы ни ездили. Стоимость является примерным международным ориентиром.' },
                { q: 'Что делать, если мне нужен выездной механик или автосервис поблизости?', a: 'Наш инструмент сначала диагностирует проблему, чтобы вы точно знали, что спрашивать, прежде чем начать поиск. Если неисправность требует физического осмотра или специального оборудования, мы чётко об этом сообщим — и подскажем, какого механика или автосервис искать.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            Проверено: <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, автомеханик. Логика диагностики и диапазоны стоимости ремонта проверены на техническую точность.
          </p>

          {/* Финальный призыв к действию */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Готовы? Продиагностируйте свой автомобиль сейчас.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Бесплатно. Мгновенно. Без регистрации. Получите диагноз прямо сейчас.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Начать бесплатную диагностику
            </a>
          </section>

          {/* Другие инструменты */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Другие бесплатные инструменты
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Проверка VIN',                color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Чек-лист документов',         color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Калькулятор импортной пошлины', color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
