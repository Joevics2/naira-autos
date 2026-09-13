// app/adawat/hasbat-al-masafa-alemarat/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorUaeArabicClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { AE_TOWNS, findTown } from '@/lib/distance-towns-ae';
import { AE_CAPITAL_DISTANCE_KM } from '@/lib/ae-distance-matrix';

export const metadata: Metadata = {
  title: 'حاسبة المسافات الإمارات 2026 — المسافة بين المدن بالطريق',
  description: 'احسب مسافة الطريق ومدة القيادة بين 14 مدينة إماراتية — دبي، أبوظبي، الشارقة، العين والمزيد. مسافات موثّقة، مدة القيادة، وتكلفة الوقود.',
  alternates: {
    canonical: 'https://www.naira.autos/adawat/hasbat-al-masafa-alemarat',
    languages: { en: 'https://www.naira.autos/tools/distance-calculator-uae' , 'x-default': 'https://www.naira.autos/tools/distance-calculator-uae' },
  },
  openGraph: {
    title: 'حاسبة المسافات الإمارات 2026',
    description: 'مسافة الطريق ومدة القيادة بين 14 مدينة إماراتية، مع حاسبة تكلفة الوقود.',
    url: 'https://www.naira.autos/adawat/hasbat-al-masafa-alemarat',
    locale: 'ar',
  },
  keywords: ['حاسبة المسافات الإمارات', 'المسافة بين أبوظبي ودبي', 'المسافة بين دبي والشارقة', 'المسافة بين دبي والعين'],
};

const abuDhabi = findTown('Abu Dhabi')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/adawat/hasbat-al-masafa-alemarat',
      name: 'حاسبة المسافات الإمارات 2026 — المسافة بين المدن بالطريق',
      description: 'احسب مسافة الطريق ومدة القيادة بين 14 مدينة إماراتية، مع حاسبة تكلفة الوقود.',
      url: 'https://www.naira.autos/adawat/hasbat-al-masafa-alemarat',
      dateModified: '2026-09-06',
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'كم المسافة بين أبوظبي ودبي؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 139 كم عبر شارع الشيخ زايد (E11)، وعادة ما تستغرق الرحلة ساعة ونصف.' } },
        { '@type': 'Question', name: 'كم المسافة بين دبي والشارقة؟', acceptedAnswer: { '@type': 'Answer', text: 'حوالي 28 كم فقط، من أقصر وأكثر طرق التنقل ازدحاماً بين الإمارات.' } },
        { '@type': 'Question', name: 'هل يوجد جدول مسافات رسمي من حكومة الإمارات؟', acceptedAnswer: { '@type': 'Answer', text: 'البوابة الرسمية u.ae تسمّي الطرق السريعة الرئيسية لكنها لا تنشر جدول مسافات بين المدن. المسارات الموثّقة في هذه الأداة مصدرها مصادر مستقلة متقاطعة بدلاً من ذلك.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.naira.autos/home-arabic' },
        { '@type': 'ListItem', position: 2, name: 'الأدوات', item: 'https://www.naira.autos/adawat' },
        { '@type': 'ListItem', position: 3, name: 'الإمارات', item: 'https://www.naira.autos/adawat/hasbat-al-masafa-alemarat' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'حاسبة المسافات الإمارات',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorUaeArabicPage() {
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
              <span className="text-white/60">🇦🇪 الإمارات</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">أداة مجانية · 14 مدينة</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 me-2">آخر تحديث: سبتمبر 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 leading-tight">
              حاسبة المسافات
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              مسافة الطريق ومدة القيادة بين أي مدينتين من 14 مدينة إماراتية — جميع عواصم الإمارات السبع بالإضافة إلى العين وخورفكان ومدن رئيسية أخرى.
            </p>
            <Link href="/tools/distance-calculator-uae" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorUaeArabicClient />
          </div>
        </div>
      </div>

      <div dir="rtl" lang="ar" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">من أين تأتي هذه الأرقام</h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>البوابة الرسمية لحكومة الإمارات (u.ae) تسمّي وتصف الطرق السريعة الرئيسية في البلاد — شارع الشيخ زايد (E11)، شارع الشيخ محمد بن زايد (E311)، شارع الإمارات (E611)، طريق دبي-العين (E66)، وغيرها — لكنها لا تنشر جدول مسافات بين المدن كما تفعل أدلة بدل السفر الحكومية في بعض الدول. لذا فإن المسارات الثلاثة الموثّقة في هذه الأداة مصدرها مصادر مستقلة متقاطعة بدلاً من ذلك: محتوى من شركات تأجير السيارات ومواقع الانتقال والسكن مثل هيرتز وبروبرتي فايندر، التي تنشر هذه الأرقام بانتظام لأغراض تخطيط الرحلات العملية.</p>
              <p>مسافة أبوظبي-دبي (139 كم) ودبي-العين (146 كم) كلاهما مصدرهما مصدران مستقلان على الأقل يتفقان على نفس الرقم. تستحق دبي-العين ملاحظة خاصة: مقالة ويكيبيديا عن طريق E66 نفسه تذكر طولاً أقصر 127.7 كم، لكن هذا على الأرجح يقيس فقط تقاطعات بداية ونهاية الطريق نفسه وليس مسافة القيادة الكاملة من وسط مدينة إلى وسط أخرى التي تذكرها أدلة السفر — نمط شائع عندما لا يبدأ طريق مسمّى وينتهي بالضبط في وسط كل مدينة. تستخدم هذه الأداة رقم المدينة إلى المدينة لأنه ما يحتاجه فعلياً مخطط الرحلات البرية. أما دبي-الشارقة (28 كم) فهي من أشهر المسارات القصيرة في البلاد ولم تحتج لتحقق كبير.</p>
              <p>كل مسار آخر في قائمة المدن الـ14 لهذه الأداة — التي تغطي عواصم الإمارات السبع (أبوظبي، دبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، أم القيوين) بالإضافة إلى العين وخورفكان وكلباء ودبا الفجيرة والرويس والذيد وحتا — يعتمد على التقدير المبني على الإحداثيات لهذه الأداة، باستخدام معامل التصحيح المُعاير مقابل مصفوفة المسافات الموثّقة الكاملة لنيجيريا.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-3">ما الذي يبطئ رحلتك فعلياً على طرق الإمارات</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              شبكة طرق الإمارات ممتازة بشكل عام — عريضة وواضحة العلامات وجيدة الصيانة. نقاط الازدحام الرئيسية هي ازدحام المدن أكثر منها جودة الطريق: شارع الشيخ زايد عبر وسط دبي ومداخل أبوظبي في ساعات الذروة الصباحية والمسائية قد تضيف وقتاً كبيراً لرحلة سريعة على الطريق السريع. تُراجع أسعار الوقود في الإمارات وتُعدَّل شهرياً من قبل لجنة أسعار الوقود بناءً على أسواق النفط العالمية، لذا يستحق سعر المحطة المستخدم في الحاسبة أعلاه التحقق مقابل السعر المعلن للشهر الحالي قبل التخطيط لرحلة طويلة. الطرق الجبلية نحو الفجيرة وخورفكان عبر حتا وجبال الحجر جميلة المنظر لكنها أبطأ مما توحي به المسافة وحدها، مع أجزاء متعرجة عبر الممرات الجبلية.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            راجعتها <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">إيفلين جون</Link>، خبيرة مبيعات السيارات. المسارات الموثّقة تم التحقق منها عبر مصادر مستقلة لتأجير السيارات والانتقال والسكن. باقي المسارات تقديرية بناءً على الإحداثيات.
          </p>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-1">المسافة من أبوظبي إلى كل مدينة، مرتّبة</h2>
            <p className="text-sm text-gray-500 mb-4">جميع المدن الـ13 الأخرى في هذه الأداة، من الأقرب إلى الأبعد عن أبوظبي.</p>
            <DistanceTable hub={abuDhabi} towns={AE_TOWNS} verifiedMatrix={AE_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black text-gray-900 mb-4">الأسئلة الشائعة — حاسبة المسافات الإمارات</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'كم المسافة بين أبوظبي ودبي؟', a: 'حوالي 139 كم عبر شارع الشيخ زايد (E11)، وعادة ساعة ونصف بالسيارة.' },
                { q: 'كم المسافة بين دبي والشارقة؟', a: 'حوالي 28 كم فقط، من أقصر وأكثر طرق التنقل ازدحاماً بين الإمارات.' },
                { q: 'كم المسافة بين دبي والعين؟', a: 'حوالي 146 كم عبر طريق E66، وعادة ساعة ونصف إلى ساعتين. طول الطريق الرسمي نفسه أقصر (127.7 كم)، ربما لأنه يقيس فقط تقاطعات الطريق.' },
                { q: 'هل يوجد جدول مسافات رسمي؟', a: 'لا. البوابة u.ae تسمّي الطرق الرئيسية لكنها لا تنشر جدول مسافات؛ المسارات الموثّقة هنا تم التحقق منها عبر مصادر مستقلة.' },
                { q: 'هل يمكنني حساب تكلفة الوقود؟', a: 'نعم — اختر نوع المركبة وسعر الوقود الحالي (درهم/لتر) أعلاه، وستحوّل مسافة الطريق مباشرة إلى لترات وتكلفة تقديرية.' },
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
