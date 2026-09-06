import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { TaqyimSayaratiClient } from './client';

export const metadata: Metadata = {
  title: 'كم قيمة سيارتي؟ تقييم مجاني بالذكاء الاصطناعي | Naira Autos',
  description: 'تقييم سيارتك مجانًا بالذكاء الاصطناعي، بعملتك المحلية. ارفع صورة واحصل على سعر فوري — مصر، السعودية، الإمارات، العراق، المغرب وأكثر من 20 دولة عربية.',
  keywords: 'كم قيمة سيارتي, تقييم سيارة مجاني, سعر سيارتي المستعملة, تسعير السيارات بالذكاء الاصطناعي, تقييم سيارة اونلاين, احسب سعر سيارتي',
  openGraph: {
    title: 'كم قيمة سيارتي؟ تقييم مجاني بالذكاء الاصطناعي',
    description: 'تقييم سيارتك بالذكاء الاصطناعي بعملتك المحلية، في أكثر من 20 دولة عربية. ارفع صورة واحصل على تقدير فوري — مجانًا بالكامل.',
    url: 'https://www.naira.autos/kam-qeemat-sayarati',
    siteName: 'Naira Autos',
    locale: 'ar',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/kam-qeemat-sayarati',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'كم قيمة سيارتي؟ تقييم مجاني بالذكاء الاصطناعي',
  description: 'أداة مجانية لتقييم السيارات بالذكاء الاصطناعي. تقدير فوري بعملتك المحلية، مضبوط على سوق بلدك من بين أكثر من 20 دولة عربية.',
  url: 'https://www.naira.autos/kam-qeemat-sayarati',
  inLanguage: 'ar',
  dateModified: '2026-09-06',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'تقييم السيارات بالذكاء الاصطناعي — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'ارفع صورة سيارتك واحصل على تقييم فوري لسعرها في السوق، بالذكاء الاصطناعي وبعملة بلدك.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.naira.autos/home-arabic' },
      { '@type': 'ListItem', position: 2, name: 'الأدوات', item: 'https://www.naira.autos/adawat' },
      { '@type': 'ListItem', position: 3, name: 'تقييم السيارة بالذكاء الاصطناعي', item: 'https://www.naira.autos/kam-qeemat-sayarati' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'كم قيمة سيارتي المستعملة؟', acceptedAnswer: { '@type': 'Answer', text: 'يعتمد ذلك على الماركة والموديل والسنة والفئة والمسافة المقطوعة والحالة العامة، بالإضافة إلى أسعار بيع سيارات مشابهة في بلدك حاليًا. ارفع صورة أعلاه واختر بلدك — يحدد الذكاء الاصطناعي سيارتك ويعطيك نطاق سعر بعملتك المحلية، بمقارنة مع إعلانات فعلية في ذلك السوق.' } },
      { '@type': 'Question', name: 'ما العوامل التي تؤثر على تقييم السيارة المستعملة؟', acceptedAnswer: { '@type': 'Answer', text: 'أهم العوامل هي: (1) الماركة والموديل — بعضها يحافظ على قيمته أكثر حسب السوق. (2) سنة الصنع والفئة والمسافة المقطوعة. (3) حالة الهيكل والدهان. (4) الحالة الميكانيكية وسجل الصيانة. (5) اكتمال أوراق الملكية والتسجيل. (6) العرض والطلب المحلي — نفس السيارة قد تختلف قيمتها بين دولة وأخرى.' } },
      { '@type': 'Question', name: 'هل بلدي يؤثر على التقييم؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم، وبشكل كبير. رسوم الاستيراد، والطلب المحلي على ماركات معينة، وقوة العملة، وحجم سوق السيارات المستعملة، كلها تغيّر الأسعار بين الدول. أداتنا تغطي أكثر من 20 دولة عربية وتعطيك تقديرًا بالعملة المحلية الصحيحة، مضبوطًا على ذلك السوق وليس على متوسط عالمي.' } },
      { '@type': 'Question', name: 'ما مدى دقة التقييم بالذكاء الاصطناعي؟', acceptedAnswer: { '@type': 'Answer', text: 'تستخدم أداتنا الرؤية الحاسوبية لتحديد الماركة والموديل والسنة والفئة بدقة من صورتك، ثم تقارنها ببيانات إعلانات حقيقية في بلدك المختار لإعطائك نطاق سعر، وليس رقمًا واحدًا. اعتبره نقطة انطلاق موثوقة للتفاوض، وليس سعرًا نهائيًا — القيمة الفعلية تعتمد دائمًا على المعاينة الشخصية والتفاوض.' } },
      { '@type': 'Question', name: 'هل أداة التقييم هذه مجانية فعلاً؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم. بدون أي تكلفة، بدون حساب، وبدون حد لعدد مرات الاستخدام.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'الماركة وقيمة إعادة البيع', body: 'تختلف قوة إعادة البيع حسب السوق — تويوتا وهوندا تحافظان على قيمتهما في معظم المناطق، بينما الماركات الألمانية الفاخرة تفقد قيمتها بسرعة أكبر في الأسواق ذات تكاليف الصيانة المرتفعة. الطلب المحلي مهم بقدر أهمية الشعار.' },
  { icon: Shield, title: 'المسافة المقطوعة وسجل الصيانة', body: 'المسافة المنخفضة وسجل الصيانة الموثق هما أقوى مؤشرين على سيارة معتنى بها جيدًا في أي مكان بالعالم. سجل نظيف قد يساوي أكثر من موديل أحدث بسنة.' },
  { icon: CheckCircle2, title: 'الملكية والتوثيق', body: 'أوراق ملكية نظيفة وتسجيل ساري ووثائق كاملة أمور غير قابلة للتفاوض للحصول على أعلى قيمة في أي سوق. الأوراق الناقصة أو مشاكل الاستيراد قد تخفض السعر بنسبة 15 إلى 25 بالمئة.' },
  { icon: AlertCircle, title: 'الحالة العامة', body: 'هيكل نظيف بدون خدوش أو صدأ أو دهان متآكل، مع محرك سليم ميكانيكيًا، يضيف باستمرار 10 إلى 15 بالمئة إلى القيمة السوقية مقارنة بسيارة مماثلة تظهر عليها علامات تآكل واضحة.' },
];

const FAQ_ITEMS = [
  { q: 'كم قيمة سيارتي المستعملة؟', a: 'يعتمد ذلك على الماركة والموديل والسنة والفئة والمسافة المقطوعة والحالة — بالإضافة إلى أسعار بيع سيارات مشابهة في بلدك الآن. ارفع صورة أعلاه واختر بلدك للحصول على تقدير بالذكاء الاصطناعي بعملتك المحلية.' },
  { q: 'ما العوامل التي تؤثر على تقييم السيارة المستعملة؟', a: 'الماركة والموديل، سنة الصنع والفئة، المسافة المقطوعة، حالة الهيكل والميكانيك، اكتمال أوراق الملكية والتسجيل، والعرض والطلب المحلي في سوقك تحديدًا.' },
  { q: 'هل بلدي يؤثر على التقييم؟', a: 'نعم — رسوم الاستيراد، والطلب المحلي على الماركات، وقوة العملة، وحجم السوق، كلها تغيّر الأسعار بين الدول. نغطي أكثر من 20 دولة عربية ونعطيك السعر بعملتك المحلية، لا بمتوسط عالمي.' },
  { q: 'كيف أسعّر سيارتي بشكل صحيح قبل بيعها؟', a: 'استخدم أداتنا المجانية للتقييم بالذكاء الاصطناعي للحصول على تقدير، ثم راجع الإعلانات النشطة محليًا لسيارات مشابهة. التسعير أعلى بنسبة 5 إلى 10 بالمئة من أقل سعر تقبله عادة ما يترك مجالًا للتفاوض.' },
  { q: 'ما مدى دقة التقييم بالذكاء الاصطناعي؟', a: 'يستخدم رؤية حاسوبية لتحديد سيارتك بدقة من الصورة، ثم يقارنها ببيانات إعلانات حقيقية في بلدك المختار. اعتبره نقطة انطلاق موثوقة، وليس سعرًا نهائيًا — القيمة الفعلية تعتمد على المعاينة والتفاوض.' },
  { q: 'هل أداة تقييم السيارات مجانية؟', a: 'نعم — بدون تكلفة، بدون حساب، وبدون حد لعدد الاستخدامات.' },
];

export default function KamQeematSayaratiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div dir="rtl" lang="ar" className="min-h-screen bg-background">

        {/* ── الواجهة الداكنة ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                بالذكاء الاصطناعي · مجاني
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English ←
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              كم قيمة<br /><span className="text-amber-400">سيارتك؟</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              ارفع صورة — واحصل على تقييم سوقي فوري بعملتك المحلية، بالاعتماد على بيانات إعلانات حقيقية والذكاء الاصطناعي.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> تحليل بالصورة</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>مصر · السعودية · الإمارات · العراق · المغرب والمزيد</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">مجاني 100%</span>
            </div>
          </div>
        </div>

        {/* ── أداة التقييم ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <TaqyimSayaratiClient />
          </div>
        </div>

        {/* ── محتوى SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">فهم القيمة</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              ما الذي يحدد سعر السيارة المستعملة؟
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
              تقييم السيارات المستعملة: الدليل الشامل
            </h2>

            <p>معرفة القيمة السوقية الحقيقية لسيارتك هي أهم خطوة قبل عرضها للبيع أو تسليمها كجزء من صفقة أو التفاوض على شرائها — في أي مكان بالعالم. التسعير المرتفع جدًا يترك إعلانك بلا مشترين. التسعير المنخفض جدًا يترك مالًا حقيقيًا على الطاولة. التحدي هو أن <strong className="text-foreground">«القيمة السوقية» ليست رقمًا واحدًا</strong> — تختلف حسب الدولة والعملة والطلب المحلي على ماركة معينة، وحسب سجل السيارة وحالتها الخاصة.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">لماذا تختلف قيمة نفس السيارة من دولة لأخرى</h3>
            <p>سيارة تويوتا كورولا عمرها خمس سنوات وبحالة جيدة قد تساوي مبلغًا مختلفًا تمامًا في مصر والسعودية والإمارات والعراق — حتى قبل تحويل العملات. رسوم الاستيراد والضرائب المحلية على السيارات المستعملة تختلف بشكل كبير بين الدول. بعض الأسواق لديها طلب محلي قوي على ماركات معينة (الماركات اليابانية في معظم دول الخليج والشمال الأفريقي مثلاً)، ما يحافظ على أسعار إعادة بيع أعلى. أسواق أخرى لديها سوق سيارات جديدة أكبر يبعد المشترين عن المستعملة، ما يخفف من قيمة إعادة بيعها. لهذا فإن دليل أسعار عالمي واحد لا يصلح — التقييم يجب أن يُضبط حسب الدولة.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">المسافة المقطوعة وسجل الصيانة</h3>
            <p>في كل الأسواق تقريبًا، المسافة المقطوعة وسجل الصيانة الموثق هما أقوى مؤشرين على حالة السيارة، أكثر مما تُظهره الصورة. سيارة بمسافة أقل وسجل صيانة كامل تحصل عادة على علاوة سعرية معتبرة مقارنة بسيارة مماثلة من نفس السنة بمسافة أعلى، حتى لو بدتا متشابهتين في الصور. سجل الصيانة الناقص أو المفقود من أسرع الطرق لفقدان قوة التفاوض كبائع.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">الملكية والتسجيل والتوثيق</h3>
            <p>في كل دولة نغطيها، <strong className="text-foreground">أوراق نظيفة وكاملة أمر غير قابل للتفاوض للحصول على أعلى قيمة</strong>. المشترون، وبحق، يخصمون من قيمة السيارات ذات أوراق ملكية غير مكتملة، أو رسوم استيراد غير مسددة، أو تسجيل ناقص، لأن خطر التعقيدات أثناء نقل الملكية حقيقي في أي بلد. حل مشاكل التوثيق قبل نشر الإعلان يكلف غالبًا أقل بكثير من الخصم الذي سيطلبه المشترون بخلاف ذلك.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">الحالة العامة والعرض</h3>
            <p>هيكل نظيف بدون خدوش أو صدأ أو دهان متآكل، مع محرك وناقل حركة سليمين ميكانيكيًا، يضيف باستمرار إلى السعر مقارنة بسيارة مماثلة تظهر عليها علامات تآكل واضحة — سواء بيعت السيارة في القاهرة أو الرياض أو دبي. إصلاحات بسيطة ومنخفضة التكلفة (تنظيف شامل، إصلاح خدوش بسيطة، تغيير مصباح محترق) غالبًا ما تعوض تكلفتها عدة مرات في سعر البيع النهائي.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">العملة وتوقيت السوق</h3>
            <p>في الدول التي تعتمد بشكل كبير على السيارات المستعملة المستوردة، ترتبط أسعار السيارات ارتباطًا وثيقًا بحركة سعر الصرف — ضعف العملة المحلية يرفع تكلفة الاستيراد ويدفع أسعار المستعمل للأعلى، بينما العملة الأقوى لها الأثر المعاكس. هذا يعني أن تقييمًا من قبل عام أو عامين قد يكون دليلًا غير موثوق للأسعار الحالية. تحقق دائمًا من بيانات السوق الحالية بدلًا من الاعتماد على دليل أسعار قديم أو سعر بيع صاحب سابق.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">كيف تعمل هذه الأداة</h3>
            <p>ارفع صورة واضحة لسيارتك واختر بلدك. الذكاء الاصطناعي (Gemini Vision) يحدد الماركة والموديل والسنة والفئة من الصورة، ثم يقارنها ببيانات إعلانات حقيقية وحديثة في سوقك المختار لإعطائك نطاق سعر بعملتك المحلية — وليس تقديرًا واحدًا فقط. تتضمن النتيجة العوامل المحددة التي أثرت على التقدير، لتفهم سبب الوصول إلى ذلك الرقم. صُممت لتكون نقطة انطلاق سريعة ومجانية للتفاوض، وليست بديلًا عن المعاينة الشخصية.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">أسئلة شائعة</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              الأسئلة الأكثر شيوعًا
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group border border-border rounded-xl overflow-hidden bg-card">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="mr-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              المزيد من الأدوات المجانية
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tools/ai-mechanic-arabic" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">ميكانيكي افتراضي بالذكاء الاصطناعي</p>
                <ArrowRight className="h-4 w-4 text-emerald-500 rotate-180" />
              </Link>
              <Link href="/adawat" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">كل الأدوات</p>
                <ArrowRight className="h-4 w-4 text-blue-500 rotate-180" />
              </Link>
              <Link href="/home-arabic" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">الرئيسية بالعربية</p>
                <ArrowRight className="h-4 w-4 text-amber-500 rotate-180" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
