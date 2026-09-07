// app/tools/distance-calculator-egypt-arabic/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorEgyptArabicClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { EG_TOWNS, findTown } from '@/lib/distance-towns-eg';
import { EG_CAPITAL_DISTANCE_KM } from '@/lib/eg-distance-matrix';

export const metadata: Metadata = {
  title: 'حاسبة المسافات مصر 2026 — المسافة بين المدن بالطريق',
  description: 'احسب مسافة الطريق ومدة القيادة بين 41 مدينة مصرية — القاهرة، الإسكندرية، الأقصر، أسوان والمزيد. مسافات موثّقة من الأمم المتحدة، مدة القيادة، وتكلفة الوقود.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-egypt-arabic',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-egypt' },
  },
  openGraph: {
    title: 'حاسبة المسافات مصر 2026',
    description: 'مسافة الطريق ومدة القيادة بين 41 مدينة مصرية، مع حاسبة تكلفة الوقود.',
    url: 'https://www.naira.autos/tools/distance-calculator-egypt-arabic',
    locale: 'ar',
  },
  keywords: [
    'حاسبة المسافات مصر', 'المسافة بين القاهرة والإسكندرية', 'المسافة بين القاهرة والأقصر',
    'المسافة بين القاهرة وأسوان', 'حاسبة مسافات الطرق المصرية', 'المسافة بين الأقصر وأسوان',
    'تكلفة الوقود من القاهرة إلى شرم الشيخ',
  ],
};

const cairo = findTown('Cairo')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-egypt-arabic',
      name: 'حاسبة المسافات مصر 2026 — المسافة بين المدن بالطريق',
      description: 'احسب مسافة الطريق ومدة القيادة بين 41 مدينة مصرية، مع حاسبة تكلفة الوقود.',
      url: 'https://www.naira.autos/tools/distance-calculator-egypt-arabic',
      dateModified: '2026-09-07',
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'كم المسافة بين القاهرة والإسكندرية؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 216 كم عبر الطريق الصحراوي، وهو رقم موثّق من مصفوفة المسافات المصرية الخاصة ببرنامج الأغذية العالمي التابع للأمم المتحدة — عادة رحلة من 2.5 إلى 3 ساعات.' } },
        { '@type': 'Question', name: 'هل يوجد جدول مسافات رسمي من الحكومة المصرية؟', acceptedAnswer: { '@type': 'Answer', text: 'وزارة النقل المصرية لا تنشر جدول مسافات عاماً بين المدن، لكن مجموعة اللوجستيات التابعة لبرنامج الأغذية العالمي للأمم المتحدة تنشر واحداً كجزء من ملفها اللوجستي الإنساني لمصر، وتستخدمه هذه الأداة مباشرة لـ13 مدينة رئيسية.' } },
        { '@type': 'Question', name: 'كم المسافة بين القاهرة والأقصر؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 708 كم، رقم موثّق من نفس مصفوفة الأمم المتحدة. معظم المسافرين يفضلون الطيران أو القطار الليلي بدلاً من القيادة التي تستغرق أكثر من 9 ساعات.' } },
        { '@type': 'Question', name: 'كم المسافة بين الأقصر وأسوان؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 229 كم، موثّقة — حوالي 3 ساعات، وهي أكثر رحلة طرق شائعة في صعيد مصر.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorEgyptArabicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div dir="rtl" lang="ar" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-bl from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="العودة"
            >
              <ArrowRight className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/home-arabic" className="hover:text-white/60 transition-colors">الرئيسية</Link>
              <span>/</span>
              <Link href="/adawat" className="hover:text-white/60 transition-colors">الأدوات</Link>
              <span>/</span>
              <span className="text-white/60">🇪🇬 مصر</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">أداة مجانية · 41 مدينة</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 me-2">آخر تحديث: سبتمبر 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              حاسبة المسافات
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              مسافة الطريق ومدة القيادة بين أي مدينتين من 41 مدينة مصرية — القاهرة، الإسكندرية، الأقصر، أسوان، مدن سيناء والبحر الأحمر، وعواصم المحافظات الرئيسية.
            </p>
            <Link href="/tools/distance-calculator-egypt" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorEgyptArabicClient />
          </div>
        </div>
      </div>

      <div dir="rtl" lang="ar" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">من أين تأتي هذه الأرقام</h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>مصر لديها أقوى مصدر بيانات موثّق من بين كل الدول المبنية في هذه الأداة حتى الآن. مجموعة اللوجستيات التابعة لبرنامج الأغذية العالمي للأمم المتحدة — الجهة الأممية المسؤولة عن تنسيق سلاسل الإمداد الإنسانية أثناء الأزمات — تنشر مصفوفة كاملة للمسافات ومدة السفر لمصر كجزء من ملفها اللوجستي القُطري، تستخدمها وكالات الإغاثة في تخطيط عمليات التوصيل عبر البلاد. تغطي هذه المصفوفة مباشرة 13 مدينة رئيسية: القاهرة، الإسكندرية، أسوان، الفيوم، المنيا، إدفو، الإسماعيلية، الأقصر، بورسعيد، شرم الشيخ، الغردقة، نويبع، ورفح، ما يعطي 78 مسافة موثّقة بين نقطتين — مجموعة أغنى بكثير مما كان يمكن لهذه الأداة تجميعه من استشهادات متفرقة بأطوال الطرق وحدها.</p>
              <p>تغطي هذه المسارات الـ78 الطرق التي يبحث عنها الناس فعلياً: القاهرة إلى الإسكندرية عبر الطريق الصحراوي (216 كم)، القاهرة نزولاً إلى الأقصر وأسوان عبر صعيد مصر (708 كم و926 كم)، والقاهرة خروجاً إلى سيناء والبحر الأحمر نحو شرم الشيخ والغردقة (503 كم و548 كم). كل واحد من هذه المسارات موسوم بـ<span className="font-semibold text-emerald-700">&laquo;مسار موثّق&raquo;</span> في الحاسبة والجدول أدناه.</p>
              <p>أما المدن الـ28 المتبقية في قائمة هذه الأداة البالغة 41 مدينة — عواصم محافظات دلتا النيل وصعيد مصر مثل المنصورة وطنطا وأسيوط وسوهاج، بالإضافة إلى عدد من مدن سيناء والبحر الأحمر الأخرى مثل دهب ومرسى علم والطور التي لا تغطيها مصفوفة الأمم المتحدة — فتعتمد على تقدير هذه الأداة المبني على الإحداثيات، باستخدام نفس معامل تصحيح المسافة المُعاير مقابل مصفوفة المسافات الموثّقة الكاملة لنيجيريا. تُوسم هذه المسارات بـ<span className="font-semibold text-amber-700">&laquo;تقديري&raquo;</span>، سواء لأن معايرة دولة أخرى لن تنتقل بشكل مثالي لشبكة طرق مصر، أو ببساطة لأنه معيار الوسم الصادق نفسه المُطبَّق في بقية هذه الأداة.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">ما الذي يبطئ رحلتك فعلياً على الطرق المصرية</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              الطرق الصحراوية المصرية التي تربط القاهرة بالإسكندرية والبحر الأحمر وسيناء معبّدة بشكل جيد وسريعة عموماً حسب معايير المنطقة، لكن هناك عوامل تضيف ساعات بانتظام إلى المسافة الخام. المسافات الصحراوية الطويلة — خصوصاً نحو الأقصر وأسوان والساحل الأحمر — لديها محطات خدمة محدودة وتغطية هاتفية ضعيفة في بعض الأماكن، لذا يحتاج التزود بالوقود والماء للتخطيط المسبق. نقاط التفتيش الأمنية شائعة على الطرق بين المدن، خصوصاً عند الاقتراب من القاهرة ومدن قناة السويس والمناطق السياحية في صعيد مصر وسيناء، وقد تضيف وقتاً معتبراً في الفترات المزدحمة. كثير من المسافرين لمسافات طويلة بين القاهرة والأقصر أو أسوان يتجنبون القيادة التي تستغرق أكثر من 9 ساعات لصالح قطار نوم ليلي أو رحلة طيران داخلية قصيرة. كما هو الحال مع أي حاسبة، اعتبر هذه الأرقام أساساً تخطيطياً وتحقق من حالة الطريق والأمن الحالية قبل أي رحلة طويلة، خصوصاً في شمال سيناء.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            راجعتها <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">إيفلين جون</Link>، خبيرة مبيعات السيارات. المسارات الموثّقة مصدرها مصفوفة المسافات المصرية الخاصة ببرنامج الأغذية العالمي التابع للأمم المتحدة. باقي المسارات تقديرية بناءً على الإحداثيات.
          </p>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">المسافة من القاهرة إلى كل مدينة، مرتّبة</h2>
            <p className="text-sm text-gray-500 mb-4">جميع المدن الـ40 الأخرى في هذه الأداة، من الأقرب إلى الأبعد عن القاهرة.</p>
            <DistanceTable hub={cairo} towns={EG_TOWNS} verifiedMatrix={EG_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">الأسئلة الشائعة — حاسبة المسافات مصر</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'كم المسافة بين القاهرة والإسكندرية؟', a: 'حوالي 216 كم عبر الطريق الصحراوي، رقم موثّق من مصفوفة الأمم المتحدة — عادة رحلة من 2.5 إلى 3 ساعات.' },
                { q: 'هل يوجد جدول مسافات رسمي من الحكومة المصرية؟', a: 'لا يوجد جدول عام من وزارة النقل، لكن مجموعة اللوجستيات التابعة للأمم المتحدة تنشر واحداً للتخطيط الإنساني، وتُستخدم هنا مباشرة لـ13 مدينة رئيسية (78 مساراً موثّقاً).' },
                { q: 'كم المسافة بين القاهرة والأقصر؟', a: 'حوالي 708 كم، موثّقة. معظم المسافرين يفضلون الطيران أو القطار الليلي بدلاً من القيادة التي تستغرق أكثر من 9 ساعات.' },
                { q: 'كم المسافة بين الأقصر وأسوان؟', a: 'حوالي 229 كم، موثّقة — حوالي 3 ساعات، وأكثر رحلة طرق شائعة في صعيد مصر، وغالباً ما تُمدَّد لتشمل إدفو وكوم أمبو.' },
                { q: 'لماذا بعض المسارات تقديرية؟', a: 'فقط المدن الـ13 في مصفوفة الأمم المتحدة لديها مسارات موثّقة. المسارات التي تمر بأي من المدن الـ28 الأخرى تقديرية بناءً على الإحداثيات.' },
                { q: 'هل يمكنني حساب تكلفة الوقود؟', a: 'نعم — اختر نوع المركبة وسعر الوقود الحالي (جنيه/لتر) أعلاه، وستحوّل مسافة الطريق مباشرة إلى لترات وتكلفة تقديرية.' },
              ].map(({ q, a }) => (
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
