// app/tools/distance-calculator-saudi-arabia-arabic/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSaudiArabiaArClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { SA_TOWNS, findTown } from '@/lib/distance-towns-sa';
import { SA_CAPITAL_DISTANCE_KM } from '@/lib/sa-distance-matrix';

export const metadata: Metadata = {
  title: 'حاسبة المسافات السعودية 2026 — المسافة بين المدن بالطريق',
  description: 'احسب مسافة الطريق ومدة القيادة بين 35 مدينة سعودية — الرياض، جدة، مكة، المدينة، الدمام والمزيد. مسافات رسمية موثّقة، مدة القيادة، وتكلفة الوقود.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia-arabic',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia' },
  },
  openGraph: {
    title: 'حاسبة المسافات السعودية 2026',
    description: 'مسافة الطريق ومدة القيادة بين 35 مدينة سعودية، مع حاسبة تكلفة الوقود.',
    url: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia-arabic',
    locale: 'ar',
  },
  keywords: [
    'حاسبة المسافات السعودية', 'المسافة بين الرياض وجدة', 'المسافة بين مكة والمدينة',
    'المسافة بين الرياض والدمام', 'حاسبة مسافات الطرق السعودية', 'المسافة بين جدة والمدينة',
    'تكلفة الوقود من الرياض إلى جدة', 'المسافة بين مكة وجدة',
  ],
};

const riyadh = findTown('Riyadh')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator-saudi-arabia-arabic',
      name: 'حاسبة المسافات السعودية 2026 — المسافة بين المدن بالطريق',
      description: 'احسب مسافة الطريق ومدة القيادة بين 35 مدينة سعودية، مع حاسبة تكلفة الوقود.',
      url: 'https://www.naira.autos/tools/distance-calculator-saudi-arabia-arabic',
      dateModified: '2026-09-06',
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'كم المسافة بين الرياض وجدة؟', acceptedAnswer: { '@type': 'Answer', text: 'هذا المسار حالياً رقم تقديري معتمد على الإحداثيات وليس طولاً رسمياً لطريق واحد. أما الرياض إلى مكة (عبر الطائف) فهي مسافة موثّقة رسمياً بطول 820 كم.' } },
        { '@type': 'Question', name: 'كم المسافة بين مكة والمدينة؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 421 كم، وهو طول طريق رسمي من وزارة النقل والخدمات اللوجستية السعودية.' } },
        { '@type': 'Question', name: 'كم المسافة بين الرياض والدمام؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 383 كم، طول طريق رسمي، وعادة ما تستغرق الرحلة من 4 إلى 5 ساعات.' } },
        { '@type': 'Question', name: 'هل يوجد جدول مسافات رسمي من الحكومة السعودية؟', acceptedAnswer: { '@type': 'Answer', text: 'لا تنشر وزارة النقل جدول مسافات كاملاً بين كل المدن، لكنها توثّق أطوال 8 طرق رئيسية مسمّاة في المملكة، وهذه الأداة تستخدمها مباشرة لثمانية مسارات موثّقة.' } },
      ],
    },
  ],
};

export default function DistanceCalculatorSaudiArabiaArPage() {
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
              <span className="text-white/60">🇸🇦 السعودية</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">أداة مجانية · 35 مدينة</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 me-2">آخر تحديث: سبتمبر 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              حاسبة المسافات
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              مسافة الطريق ومدة القيادة بين أي مدينتين من 35 مدينة سعودية — الرياض، جدة، مكة، المدينة، الدمام، والمراكز الإقليمية الرئيسية.
            </p>
            <Link href="/tools/distance-calculator-saudi-arabia" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSaudiArabiaArClient />
          </div>
        </div>
      </div>

      <div dir="rtl" lang="ar" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">من أين تأتي هذه الأرقام</h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>لا تنشر وزارة النقل والخدمات اللوجستية السعودية جدول مسافات عاماً بين المدن، لكنها توثّق أطوال 8 طرق سريعة رئيسية مسمّاة في المملكة — وهي حقيقة موثّقة في موسوعة &laquo;سعوديبيديا&raquo; بالإشارة المباشرة إلى الوزارة. تعتمد هذه الأداة على هذه الأطوال الثمانية الرسمية كأساس موثّق: طريق الرياض-الطائف-مكة (820 كم)، طريق القصيم-المدينة (448 كم، عبر بريدة)، طريق مكة-المدينة (421 كم)، طريق جدة-المدينة (410 كم)، طريق الرياض-الدمام (383 كم)، طريق الرياض-القصيم (317 كم)، وطريقا مكة-جدة ومكة-الطائف القصيران (70 كم لكل منهما).</p>
              <p>تغطي هذه الطرق مجتمعة أهم ممرين في المملكة: تجمّع الحجاز حول مكة والمدينة وجدة والطائف — الذي يشهد حركة ضخمة من الحجاج والمعتمرين كل عام — والممر الأوسط-الشرقي الذي يربط الرياض بالقصيم ثم بالدمام على ساحل الخليج. كل مسار بين مدينتين من هذه المدن التسع يسير على أحد الطرق الثمانية المسمّاة يُعتبر <span className="font-semibold text-emerald-700">&laquo;مساراً موثّقاً&raquo;</span>، سواء في الحاسبة أعلاه أو الجدول أدناه.</p>
              <p>أما المسارات التي لا تسير على طريق واحد مسمّى من البداية للنهاية — بما في ذلك الرياض-جدة نفسها، إذ لا يوجد طريق رسمي واحد يربط بينهما مباشرة — فتعتمد على التقدير المبني على الإحداثيات الجغرافية لهذه الأداة، باستخدام نفس معامل التصحيح المُعاير مقابل مصفوفة المسافات الموثّقة الكاملة لنيجيريا. أما المدن الـ26 المتبقية في قائمة هذه الأداة البالغة 35 مدينة — مراكز إقليمية مثل أبها وتبوك وحائل ونجران والأحساء (الهفوف)، إضافة إلى مدن المنطقة الشرقية مثل الخبر والظهران والجبيل — فتُقدَّر بنفس الطريقة لأي مسار يمر بها.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">ما الذي يبطئ رحلتك فعلياً على الطرق السعودية</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              طرق المملكة الرئيسية عريضة وجيدة الصيانة بشكل عام، لكن هناك عوامل تزيد وقت الرحلة عن المسافة المحسوبة. خلال موسمي الحج والعمرة، تشهد الطرق المحيطة بمكة والمدينة — خصوصاً طريقي مكة-جدة ومكة-المدينة — ازدحاماً شديداً قد يطيل الرحلة عدة أضعاف. المسافات الصحراوية الطويلة على طرق مثل الرياض-الدمام والرياض-بريدة قد تشهد عواصف رملية تقلل الرؤية، وأحياناً عبور الإبل ليلاً. محطات الراحة والوقود متوفرة عادة على الطرق الرئيسية المسمّاة، لكنها أقل على الطرق الفرعية إلى المدن الصغيرة. كما هو الحال مع أي حاسبة، اعتبر هذه الأرقام أساساً تخطيطياً، وتحقق من حالة الطريق والطقس قبل أي رحلة طويلة.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            راجعتها <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">إيفلين جون</Link>، خبيرة مبيعات السيارات. المسارات الموثّقة مصدرها وزارة النقل والخدمات اللوجستية السعودية، عبر سعوديبيديا. باقي المسارات تقديرية بناءً على الإحداثيات — انظر الأسئلة الشائعة أدناه.
          </p>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">المسافة من الرياض إلى كل مدينة، مرتّبة</h2>
            <p className="text-sm text-gray-500 mb-4">جميع المدن الـ34 الأخرى في هذه الأداة، من الأقرب إلى الأبعد عن الرياض.</p>
            <DistanceTable hub={riyadh} towns={SA_TOWNS} verifiedMatrix={SA_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">الأسئلة الشائعة — حاسبة المسافات السعودية</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'كم المسافة بين الرياض وجدة؟', a: 'هذا المسار رقم تقديري وليس طول طريق رسمي واحد. أما الرياض-مكة (عبر الطائف) فهي 820 كم موثّقة رسمياً.' },
                { q: 'كم المسافة بين مكة والمدينة؟', a: 'حوالي 421 كم، طول طريق رسمي من وزارة النقل.' },
                { q: 'كم المسافة بين الرياض والدمام؟', a: 'حوالي 383 كم، طول طريق رسمي، وعادة رحلة من 4 إلى 5 ساعات.' },
                { q: 'هل يوجد جدول مسافات رسمي؟', a: 'لا يوجد جدول شامل بين كل المدن، لكن الوزارة توثّق أطوال 8 طرق رئيسية مسمّاة، وتُستخدم هنا مباشرة.' },
                { q: 'كم المسافة بين مكة وجدة؟', a: 'حوالي 70 كم، من أقصر الطرق الرسمية وأكثرها ازدحاماً، خصوصاً في موسمي الحج والعمرة.' },
                { q: 'هل يمكنني حساب تكلفة الوقود لرحلتي؟', a: 'نعم — اختر نوع المركبة وسعر الوقود الحالي (ريال/لتر) في الحاسبة أعلاه، وستحوّل مسافة الطريق مباشرة إلى لترات وتكلفة تقديرية.' },
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
