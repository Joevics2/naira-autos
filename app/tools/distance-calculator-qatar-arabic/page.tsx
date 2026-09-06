// app/tools/distance-calculator-qatar-arabic/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorQatarArabicClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { QA_TOWNS, findTown } from '@/lib/distance-towns-qa';
import { QA_CAPITAL_DISTANCE_KM } from '@/lib/qa-distance-matrix';

export const metadata: Metadata = {
  title: 'حاسبة المسافات قطر 2026 — المسافة بين المدن بالطريق',
  description: 'احسب مسافة الطريق ومدة القيادة بين 10 مدن قطرية — الدوحة، الخور، الوكرة، الرويس والمزيد. مسافات موثّقة، مدة القيادة، وتكلفة الوقود.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-qatar-arabic',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-qatar' },
  },
  openGraph: {
    title: 'حاسبة المسافات قطر 2026',
    description: 'مسافة الطريق ومدة القيادة بين 10 مدن قطرية، مع حاسبة تكلفة الوقود.',
    url: 'https://www.naira.autos/tools/distance-calculator-qatar-arabic',
    locale: 'ar',
  },
  keywords: ['حاسبة المسافات قطر', 'المسافة بين الدوحة والخور', 'المسافة بين الدوحة والوكرة', 'حاسبة مسافات الطرق القطرية'],
};

const doha = findTown('Doha')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-qatar-arabic',
      name: 'حاسبة المسافات قطر 2026 — المسافة بين المدن بالطريق',
      description: 'احسب مسافة الطريق ومدة القيادة بين 10 مدن قطرية، مع حاسبة تكلفة الوقود.',
      url: 'https://www.naira.autos/tools/distance-calculator-qatar-arabic',
      dateModified: '2026-09-06',
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'كم المسافة بين الدوحة والخور؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 33 كم عبر طريق الخور الساحلي، وهو مشروع طريق رسمي من أشغال (الهيئة العامة للأشغال العامة في قطر) — حوالي 20 دقيقة بالسيارة.' } },
        { '@type': 'Question', name: 'هل يوجد جدول مسافات رسمي من الحكومة القطرية؟', acceptedAnswer: { '@type': 'Answer', text: 'لا يوجد جدول عام بين كل المدن، لكن أشغال توثّق أطوال مشاريع الطرق الكبرى مثل طريق الخور الساحلي، وتُستخدم هنا مباشرة.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorQatarArabicPage() {
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
              <span className="text-white/60">🇶🇦 قطر</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">أداة مجانية · 10 مدن</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 me-2">آخر تحديث: سبتمبر 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              حاسبة المسافات
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              مسافة الطريق ومدة القيادة بين أي مدينتين من 10 مدن قطرية — الدوحة، الخور، الوكرة، الرويس والمزيد.
            </p>
            <Link href="/tools/distance-calculator-qatar" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorQatarArabicClient />
          </div>
        </div>
      </div>

      <div dir="rtl" lang="ar" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">من أين تأتي هذه الأرقام</h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>لا تنشر قطر جدول مسافات عاماً بين المدن، لكن أشغال — الهيئة العامة للأشغال العامة المسؤولة عن طرق البلاد — توثّق أطوال مشاريع الطرق الكبرى عند الإعلان عنها. أوضح مثال: عند افتتاح أشغال للممر الرئيسي لطريق الخور الساحلي عام 2019، قبل عام من الموعد المقرر، وثّقت الطريق بطول 33 كم من البداية للنهاية، يربط الدوحة بالخور خلال حوالي 20 دقيقة. تستخدم هذه الأداة هذا الرقم مباشرة كأول مسار موثّق. أما الرقم الموثّق الثاني، الدوحة إلى الرويس بحوالي 127 كم، فمصدره وصف من ويكيبيديا لموقع الرويس بالنسبة للعاصمة.</p>
              <p>هذا يعطي مسارين موثّقين فقط — أقل مجموعة موثّقة لأي دولة في هذه الأداة حتى الآن — لكن صغر مساحة قطر يجعل ذلك أقل أهمية بكثير مما لو كانت دولة أكبر. تمتد البلاد بأكملها لأقل من 200 كم من طرف لآخر، وشبكة طرقها مدمجة ومعظمها طرق سريعة متعددة المسارات وسلسة الحركة (طريق المجد، طريق جي رينغ، طريق سلوى، وطرق سريعة أخرى بنتها أشغال). في هذا النطاق، يميل التقدير المبني على الإحداثيات الذي تعتمد عليه هذه الأداة لبقية المسارات إلى الاقتراب كثيراً من مسافة القيادة الفعلية.</p>
              <p>تغطي قائمة المدن العشر الدوحة والمدن التي يقصدها الناس فعلياً منها: الريان ولوسيل في المنطقة الحضرية المباشرة، الوكرة ومسيعيد جنوباً (مدينتان صناعيتان وميناءيتان رئيسيتان)، الخور والرويس شمالاً، والدخان والشحانية باتجاه الساحل الغربي لمنشآت النفط والغاز. نظراً لصغر مساحة قطر، تغطي هذه القائمة المختصرة عملياً كل رحلة مهمة بين المدن في البلاد.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">ما الذي يبطئ رحلتك فعلياً على الطرق القطرية</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              شبكة الطرق القطرية حديثة وسلسة الحركة بشكل عام، وقد شهدت توسعاً كبيراً قبل كأس العالم 2022. نقاط الازدحام الرئيسية حضرية أكثر منها بين المدن: ازدحام الدوحة نفسها، خصوصاً حول طريقي إف رينغ وإي رينغ وشارع الكورنيش في ساعات الذروة، قد يضيف وقتاً حقيقياً لرحلة قصيرة المسافة المفتوحة. أعمال الإنشاء المستمرة على أجزاء من الطرق السريعة الجديدة قد تفرض أحياناً حدود سرعة مؤقتة وإغلاق مسارات. خارج الدوحة، الطرق إلى الخور والوكرة والمدن الصناعية الغربية سريعة وجيدة الصيانة بشكل عام. كما هو الحال مع أي حاسبة، اعتبر هذه الأرقام أساساً تخطيطياً وتحقق من حالة المرور الحالية قبل التنقل.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            راجعتها <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">إيفلين جون</Link>، خبيرة مبيعات السيارات. المسارات الموثّقة مصدرها توثيق أشغال الرسمي لطريق الخور الساحلي، ورقم من ويكيبيديا لموقع الرويس. باقي المسارات تقديرية بناءً على الإحداثيات.
          </p>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">المسافة من الدوحة إلى كل مدينة، مرتّبة</h2>
            <p className="text-sm text-gray-500 mb-4">جميع المدن التسع الأخرى في هذه الأداة، من الأقرب إلى الأبعد عن الدوحة.</p>
            <DistanceTable hub={doha} towns={QA_TOWNS} verifiedMatrix={QA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">الأسئلة الشائعة — حاسبة المسافات قطر</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'كم المسافة بين الدوحة والخور؟', a: 'حوالي 33 كم عبر طريق الخور الساحلي، مشروع طريق رسمي من أشغال — حوالي 20 دقيقة بالسيارة.' },
                { q: 'هل يوجد جدول مسافات رسمي؟', a: 'لا يوجد جدول عام، لكن أشغال توثّق أطوال مشاريع الطرق عند بنائها، ويُستخدم ذلك هنا مباشرة للدوحة-الخور.' },
                { q: 'لماذا عدد المدن قليل في قطر؟', a: 'تمتد قطر لأقل من 200 كم من طرف لآخر، لذا فإن 10 مدن تغطي عملياً كل رحلة مهمة بين المدن.' },
                { q: 'هل يمكنني حساب تكلفة الوقود؟', a: 'نعم — اختر نوع المركبة وسعر الوقود الحالي (ريال قطري/لتر) أعلاه، وستحوّل مسافة الطريق مباشرة إلى لترات وتكلفة تقديرية.' },
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
