import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientAR from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'ميكانيكي افتراضي بالذكاء الاصطناعي — تشخيص أعطال السيارة مجانًا | Naira Autos',
  description: 'ميكانيكي افتراضي مجاني بالذكاء الاصطناعي. صف عطل سيارتك، أو ارفع صورة أو صوت المحرك أو فيديو، واحصل على تشخيص فوري مع تقدير تكلفة الإصلاح. بدون تسجيل، ويعمل في مصر والسعودية والإمارات وقطر وأي مكان آخر.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/ai-mechanic-arabic',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/tools/mecanico-virtual',
      'ar': 'https://www.naira.autos/tools/ai-mechanic-arabic',
      'fr': 'https://www.naira.autos/tools/mecanicien-virtuel',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — ميكانيكي افتراضي مجاني بالذكاء الاصطناعي | Naira Autos',
    description: 'تشخيص فوري لسيارتك أونلاين، أينما كنت. ارفع صوت المحرك أو صورة أو صف العطل. احصل على درجة الخطورة، الأسباب المحتملة، خطوات يمكنك تنفيذها بنفسك، وتقدير تكلفة الإصلاح. مجاني تمامًا، بدون تسجيل.',
    url: 'https://www.naira.autos/tools/ai-mechanic-arabic',
  },
  keywords: ['ميكانيكي اونلاين','ميكانيكي افتراضي','تشخيص أعطال السيارة','تشخيص السيارة بالذكاء الاصطناعي','اسأل ميكانيكي اونلاين','عطل السيارة','تكلفة إصلاح السيارة','ميكانيكي سيارات مجاني','ميكانيكي اونلاين مصر','ميكانيكي اونلاين السعودية','ميكانيكي اونلاين الإمارات','ميكانيكي اونلاين قطر','تشخيص عطل السيارة بالصوت','فحص السيارة اونلاين'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/ai-mechanic-arabic',
      name: 'ميكانيكي افتراضي بالذكاء الاصطناعي — تشخيص أعطال السيارة مجانًا',
      description: 'ميكانيكي افتراضي مجاني بالذكاء الاصطناعي. ارفع صوت المحرك، صورة، أو صف العطل. احصل على تشخيص فوري مع درجة خطورة وتقدير تكلفة الإصلاح.',
      url: 'https://www.naira.autos/tools/ai-mechanic-arabic',
      inLanguage: 'ar',
      dateModified: '2026-09-06',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'الأدوات', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'ميكانيكي الذكاء الاصطناعي', item: 'https://www.naira.autos/tools/ai-mechanic-arabic' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'ما هو الميكانيكي الافتراضي وكيف يعمل؟',
          acceptedAnswer: { '@type': 'Answer', text: 'الميكانيكي الافتراضي أداة تستخدم الذكاء الاصطناعي لتشخيص أعطال سيارتك عن بُعد. تصف المشكلة، وترفع صورة أو صوت المحرك أو فيديو إن أردت، ويحلل الذكاء الاصطناعي كل ذلك مقارنة بقاعدة بيانات ضخمة من أعطال السيارات المعروفة، ليعطيك تشخيصًا مع درجة خطورة وتقدير تكلفة إصلاح.' },
        },
        {
          '@type': 'Question',
          name: 'هل يعمل هذا في مصر والسعودية والإمارات وقطر؟',
          acceptedAnswer: { '@type': 'Answer', text: 'نعم. الأداة تعمل من أي دولة عربية، وتأخذ في الاعتبار ظروف القيادة في مصر ودول الخليج تحديدًا — مثل تأثير الحرارة الشديدة والغبار على فلاتر الهواء وأنظمة التكييف، والرطوبة الساحلية في الإمارات وقطر على التوصيلات الكهربائية. تقدير تكلفة الإصلاح مرجع دولي تقريبي بالدولار الأمريكي، وليس سعرًا محليًا دقيقًا — الأسعار الفعلية تختلف من دولة لأخرى.' },
        },
        {
          '@type': 'Question',
          name: 'هل يمكن للذكاء الاصطناعي تشخيص سيارتي من صوت المحرك فقط؟',
          acceptedAnswer: { '@type': 'Answer', text: 'نعم. سجّل صوت الطرق أو الصرير أو الاحتكاك — حتى 10 ثوانٍ مسجلة بالهاتف كافية. يحلل الذكاء الاصطناعي النمط الصوتي ويمكنه تحديد ما إذا كانت المشكلة في المحامل، أو دواسات الفرامل، أو عطل آخر محدد.' },
        },
        {
          '@type': 'Question',
          name: 'هل هذه الخدمة مجانية؟',
          acceptedAnswer: { '@type': 'Answer', text: 'نعم، مجانية بالكامل — بدون تسجيل، بدون اشتراك، وبدون أي دفع. افتح الصفحة وابدأ التشخيص فورًا.' },
        },
        {
          '@type': 'Question',
          name: 'هل تشخيص الذكاء الاصطناعي دقيق دائمًا؟',
          acceptedAnswer: { '@type': 'Answer', text: 'لا — ليس دقيقًا بنسبة 100% دائمًا. إنه نقطة انطلاق ممتازة بناءً على الوصف أو الصورة أو الصوت أو الفيديو الذي تقدمه، لكنه قد يفوّت أمورًا لا تُكتشف إلا بفحص فعلي على رافعة وجهاز تشخيص. تعامل معه كرأي أولي وليس إجابة نهائية، وراجع دائمًا فنيًا مؤهلًا شخصيًا لأي عطل في الفرامل أو التوجيه أو نظام الوقود، بغض النظر عمّا يقوله التشخيص.' },
        },
        {
          '@type': 'Question',
          name: 'هل يعمل مع تويوتا ومرسيدس وبي إم دبليو أو أي ماركة أخرى؟',
          acceptedAnswer: { '@type': 'Answer', text: 'نعم. اسأل عن عطل في تويوتا، أو مرسيدس، أو بي إم دبليو، أو أي ماركة أخرى — الذكاء الاصطناعي يغطي جميع الشركات المصنعة الكبرى. تقدير التكلفة مرجع دولي تقريبي بالدولار، وليس سعرًا محليًا.' },
        },
        {
          '@type': 'Question',
          name: 'هل يُحفظ سجل محادثتي على خوادمكم؟',
          acceptedAnswer: { '@type': 'Answer', text: 'لا. يُحفظ سجل المحادثة بالكامل على جهازك فقط، باستخدام التخزين المحلي للمتصفح. لا نحتفظ بأي شيء على خوادمنا سوى الرسالة النشطة التي ترسلها للتشخيص. يمكنك حذف سجلك في أي وقت من القائمة الجانبية.' },
        },
        {
          '@type': 'Question',
          name: 'هل أحتاج إلى إنشاء حساب أو تسجيل الدخول؟',
          acceptedAnswer: { '@type': 'Answer', text: 'لا. الميكانيكي الافتراضي مجاني بالكامل ولا يتطلب حسابًا، ولا تسجيل دخول، ولا أي معلومات شخصية. تُحفظ بيانات سيارتك محليًا على جهازك للتسهيل عليك فقط.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — ميكانيكي افتراضي بالذكاء الاصطناعي',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'ميكانيكي افتراضي مجاني بالذكاء الاصطناعي. صف العطل، ارفع صوت المحرك أو صورة، واحصل على تشخيص فوري مع تقدير تكلفة إصلاح — يأخذ في الاعتبار ظروف القيادة في مصر ودول الخليج.',
      url: 'https://www.naira.autos/tools/ai-mechanic-arabic',
      inLanguage: 'ar',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPageAR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientAR />

      <div dir="rtl" lang="ar" className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">آخر تحديث: سبتمبر 2026</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">تغطية شاملة</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              ماذا يقدّم الميكانيكي الافتراضي؟
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              سواء أردت تقدير تكلفة إصلاح سريع، أو تسأل ميكانيكيًا أونلاين قبل زيارة الورشة، أو تريد معرفة تكلفة إصلاح سيارتك — هذه الأداة تغطي كل ذلك، مجانًا.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'تشخيص أعطال المحرك', desc: 'صوت طرق، تعثر في الإشعال، خمول غير منتظم، ارتفاع حرارة، إضاءة لمبة فحص المحرك — يحدد الذكاء الاصطناعي الأسباب الأكثر احتمالًا مرتبة حسب النسبة.' },
                { title: 'تحليل الصوت', desc: 'ارفع تسجيلًا لصوت الطرق أو الصرير أو الاحتكاك. يحلل الذكاء الاصطناعي النمط الصوتي لتحديد العطل.' },
                { title: 'درجة خطورة فورية', desc: 'كل تشخيص يتضمن حكمًا واضحًا من أربع درجات: آمن للقيادة، راقب عن كثب، راجع ميكانيكيًا قريبًا، أو توقف عن القيادة فورًا.' },
                { title: 'تقدير تكلفة الإصلاح', desc: 'التقدير مرجع دولي تقريبي بالدولار — التكلفة الفعلية لقطع الغيار والعمالة تختلف حسب الدولة والمدينة. استخدمه كنقطة انطلاق ثم اطلب عرض سعر محلي.' },
                { title: 'خطوات يمكنك تنفيذها بنفسك', desc: 'عندما يكون العطل شيئًا يمكنك فحصه أو إصلاحه بنفسك، نخبرك بالضبط كيف — قبل أن تدفع لميكانيكي.' },
                { title: 'محادثة بمتابعة', desc: 'اطرح أسئلة متابعة واحصل على إجابات مبنية على السياق الكامل. تُحفظ كل جلسة على جهازك.' },
                { title: 'دعم لكل الماركات', desc: 'تويوتا، هوندا، مرسيدس، لكزس، كيا، هيونداي، بي إم دبليو، ميتسوبيشي، نيسان، فورد، بيجو، وأي ماركة وسوق آخر.' },
                { title: 'تشخيص بالصورة والفيديو', desc: 'أرسل صورة لإضاءة تحذير على لوحة القيادة، أو تسرب سائل غير معتاد، أو ضرر ظاهر. كل وسيط إضافي يرفع دقة التشخيص بشكل كبير.' },
                { title: 'تحديد القطع المطلوبة', desc: 'كل تشخيص يتضمن القطع المحددة الأكثر احتمالًا لتكون السبب، لتعرف بالضبط ماذا تطلب من أي ورشة أو محل قطع غيار.' },
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
                ما هو الميكانيكي الافتراضي بالذكاء الاصطناعي؟
              </h2>
              <p className="mb-3"><strong className="text-foreground">الميكانيكي الافتراضي</strong> هو تمامًا كما يبدو من اسمه: ميكانيكي تتحدث معه بالنص أو الصورة أو الصوت أو الفيديو بدلًا من الحضور شخصيًا. تصف له ما يحدث في سيارتك — ذلك الصوت الغريب عند التشغيل البارد، لمبة فحص المحرك التي لا تنطفئ، الفرامل التي تشعر بأنها طرية — وخلال ثوانٍ يرد عليك بناءً على معرفة عميقة بأعطال السيارات الحقيقية.</p>
              <p>Axion، <strong className="text-foreground">ميكانيكينا بالذكاء الاصطناعي</strong>، يعمل مع أي ماركة وفي أي دولة، لكنه مصمم خصيصًا ليعرف تفاصيل القيادة في مصر ودول الخليج: كيف تؤثر درجات الحرارة المرتفعة صيفًا على أختام المطاط والبطارية، كيف يتسبب الغبار والرمال في انسداد فلاتر الهواء وإرهاق أنظمة التكييف بشكل أسرع، وكيف تؤثر الرطوبة الساحلية في الإمارات وقطر على التوصيلات الكهربائية.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                كيف تحصل على تشخيص لسيارتك في أقل من دقيقة
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">١. صف العطل.</strong> اكتب ما يحدث — كلما زادت التفاصيل، كان أفضل. متى بدأت المشكلة؟ هل تحدث فقط عند البرودة، أو عند التسارع، أو عند لف المقود؟</p>
                <p><strong className="text-foreground">٢. ارفع صورة أو صوتًا أو فيديو (اختياري، لكنه يساعد كثيرًا).</strong> تسجيل صوتي لعشر ثوانٍ لصوت المحرك غالبًا أكثر فائدة من فقرة كاملة من الوصف.</p>
                <p><strong className="text-foreground">٣. احصل على تشخيصك فورًا.</strong> درجة الخطورة، الأسباب المحتملة مرتبة حسب النسبة، ما يمكنك فحصه بنفسك، وتقدير تكلفة الإصلاح.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                تقدير تكلفة الإصلاح: تجنّب أن تُستغل في الورشة
              </h2>
              <p className="mb-3">من أكثر الطرق شيوعًا التي يُستغل بها العملاء في الورش هي الذهاب دون معرفة التكلفة المتوقعة للإصلاح مسبقًا. قبل زيارة أي ورشة، استخدم تقدير <strong className="text-foreground">تكلفة الإصلاح</strong> لدينا لتعرف ما هو السعر العادل — قطع الغيار والعمالة، موضّحة بشكل واضح.</p>
              <p>يأخذ التقدير في الاعتبار سيارتك تحديدًا — الماركة والموديل وسنة الصنع — والعطل الأكثر احتمالًا بناءً على وصفك. ليس رقمًا عامًا: سيارة كامري موديل 2010 بعداد 180,000 كم تظهر انخفاضًا في ضغط الزيت تحصل على تقدير مختلف عن كامري 2020 بعداد 40,000 كم بنفس اللمبة المضيئة، لأن السبب المحتمل مختلف.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                يعمل مع أي ماركة: تويوتا، بي إم دبليو، مرسيدس، هوندا وغيرها
              </h2>
              <p className="mb-3">لا يهم ما تقوده. لدى الذكاء الاصطناعي أنماط أعطال محددة لكل شركة مصنّعة — تويوتا، هوندا، بي إم دبليو، مرسيدس، هيونداي، كيا، نيسان، فورد، ميتسوبيشي، فولكس فاجن، وتقريبًا أي ماركة أخرى تسير على الطرق اليوم. أعطِه الماركة والموديل وسنة الصنع مرة واحدة، ويتكيف التشخيص مع الأعطال المعروفة لتلك السيارة تحديدًا، عند ذلك العداد، بدلًا من إعطائك إجابة عامة تنطبق على أي سيارة بالتساوي.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                لماذا يغيّر التشخيص بصوت المحرك كل شيء
              </h2>
              <p className="mb-3">الميكانيكي ذو الخبرة غالبًا ما يستطيع معرفة عطل السيارة من الصوت فقط، قبل فتح غطاء المحرك. الذكاء الاصطناعي لدينا يفعل الشيء نفسه: ارفع تسجيلًا للصوت — طرق، صرير، احتكاك — ويحلل النظام النمط الصوتي مقارنة بآلاف الأعطال المعروفة. تسجيل صوتي لعشر ثوانٍ من الهاتف غالبًا كافٍ للتمييز بين مشكلة خطيرة وأخرى يمكن تأجيلها.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                مثال: نص فقط مقابل نص مع صوت
              </h2>
              <p>بدأت سيارة أحمد هوندا أكورد تصدر صوت طرق خفيف عند التشغيل البارد. عند وصفها بالنص فقط ("صوت طرق عند تشغيل السيارة صباحًا")، أعاد الذكاء الاصطناعي قائمة واسعة — انخفاض مستوى الزيت، صوت رافعات الصمامات، أو درع حراري غير مثبت جيدًا — بثقة حوالي 60%. ثم سجّل 12 ثانية من الصوت بهاتفه ورفعها. مع الصوت، تحدد التشخيص بدقة إلى صوت رافعات الصمامات الهيدروليكية بسبب تأخر تغيير الزيت، بثقة تجاوزت 85%، مع نطاق تكلفة محدد، وتأكيد أنه آمن الاستمرار بالقيادة لفترة قصيرة أثناء حجز موعد تغيير الزيت.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">دقة التشخيص حسب نوع المدخلات</h3>
              <div className="space-y-3">
                {[
                  { label: 'وصف نصي فقط', pct: 60, color: 'bg-orange-500' },
                  { label: '+ صورة مرفقة', pct: 75, color: 'bg-amber-500' },
                  { label: '+ تسجيل صوتي', pct: 85, color: 'bg-emerald-500' },
                  { label: '+ فيديو', pct: 90, color: 'bg-emerald-600' },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{label}</span>
                      <span className="font-bold text-foreground">~{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: pct + '%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">المركبات المدعومة</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'شاحنات', 'حافلات', 'دراجات نارية'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">أبرز المميزات</h3>
              <ul className="space-y-2.5">
                {[
                  'مجاني 100% — بدون اشتراك',
                  'لا يتطلب حسابًا ولا تسجيلًا',
                  'يعمل على الجوال والكمبيوتر',
                  'تقدير تكلفة مرجعي دولي',
                  'متاح على مدار الساعة — حتى أيام الجمعة',
                  'سجل المحادثة محفوظ محليًا',
                  'أسئلة متابعة بلا حدود',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">أيضًا على Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'تقييم مجاني للسيارة', href: '/evaluate-car' },
                  { label: 'محلل صوت المحرك', href: '/tools/engine-sound-analyzer' },
                  { label: 'حاسبة رسوم الاستيراد', href: '/tools/import-duty-calculator' },
                  { label: 'قائمة أوراق المركبة', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronLeft className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* Gulf & Egypt intelligence */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">ذكاء إضافي</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  مصمم أيضًا لظروف القيادة في مصر والخليج
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  التشخيص يعمل بنفس الجودة أينما كنت تقود. لكن معظم أدوات الميكانيكي الافتراضي مدرّبة فقط على بيانات ورش غربية — لا تعرف أن الحرارة الصيفية في السعودية أو قطر التي قد تتجاوز 45 درجة مئوية تُسرّع تلف أختام المطاط والبطارية، أو أن العواصف الرملية في الخليج ومصر يمكن أن تسدّ فلتر الهواء في نصف المدة المتوقعة من الشركة المصنّعة.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion يعرف هذا أيضًا. اسأله عن صوت طرق في تويوتا كورولا بعد التزود بالوقود، وإذا كنت في مصر أو السعودية أو الإمارات أو قطر، يأخذ في الاعتبار جودة الوقود والغبار والحرارة كأسباب محتملة أولى — لأنها إحصائيًا الأكثر شيوعًا في تلك الأسواق.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'الحرارة الشديدة', desc: 'يأخذ في الاعتبار درجات حرارة قد تتجاوز 45°م في الخليج التي تسرّع تلف أختام المطاط والبطارية ونظام التبريد.' },
                  { title: 'الغبار والرمال', desc: 'يتعرف على أنماط انسداد فلاتر الهواء وإرهاق ضاغط المكيف الشائعة في مصر ودول الخليج.' },
                  { title: 'الرطوبة الساحلية', desc: 'في الإمارات وقطر، يأخذ في الاعتبار تأثير الرطوبة العالية على التوصيلات الكهربائية والصدأ.' },
                  { title: 'أسعار قطع الغيار محليًا', desc: 'التقديرات محسوبة كمرجع دولي، مع الأخذ في الاعتبار اختلاف أسعار الأسواق المحلية.' },
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

          {/* Comparison */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">مقارنة</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              الميكانيكي الافتراضي مقابل الخيارات الأخرى
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-right px-5 py-3.5 font-semibold text-muted-foreground text-sm">الميزة</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">ميكانيكي الذكاء الاصطناعي</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">زيارة الورشة</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">مجموعة/منتدى سيارات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['متاح على مدار الساعة', 'نعم', 'لا', 'أحيانًا'],
                    ['مجاني', 'نعم', 'لا', 'نعم'],
                    ['لا يتطلب تنقلًا', 'نعم', 'لا', 'نعم'],
                    ['تقدير التكلفة', 'نعم', 'يختلف', 'لا'],
                    ['تحليل الصوت والفيديو', 'نعم', 'نعم', 'لا'],
                    ['استجابة فورية', 'نعم', 'لا', 'أحيانًا'],
                    ['جودة ثابتة', 'نعم', 'يختلف', 'لا'],
                    ['حفظ سجل المحادثة', 'نعم', 'لا', 'لا'],
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

          {/* FAQ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">الأسئلة الشائعة</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              الأسئلة الشائعة
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'ما هو الميكانيكي الافتراضي وكيف يعمل؟', a: 'أداة تستخدم الذكاء الاصطناعي لتشخيص أعطال سيارتك عن بُعد. تصف المشكلة، ترفع وسائط اختيارية، ويحلل الذكاء الاصطناعي كل ذلك مقارنة بقاعدة بيانات ضخمة من الأعطال المعروفة — مع تقدير تكلفة مرجعي دولي.' },
                { q: 'هل يعمل هذا في مصر والسعودية والإمارات وقطر؟', a: 'نعم. يأخذ في الاعتبار ظروف القيادة في مصر ودول الخليج — الحرارة الشديدة، الغبار والرمال، والرطوبة الساحلية. تقدير التكلفة مرجع دولي تقريبي وليس سعرًا محليًا دقيقًا.' },
                { q: 'هل تشخيص الذكاء الاصطناعي دقيق دائمًا؟', a: 'لا — ليس دقيقًا 100% دائمًا. نقطة انطلاق جيدة، لكنه قد يفوّت أمورًا لا يكتشفها إلا فحص فعلي على رافعة وجهاز تشخيص. تعامل معه كرأي أولي، وراجع دائمًا ميكانيكيًا شخصيًا لأعطال الفرامل أو التوجيه أو الوقود.' },
                { q: 'هل يعمل مع تويوتا ومرسيدس وبي إم دبليو أو أي ماركة أخرى؟', a: 'نعم. اسأل عن أي ماركة — الذكاء الاصطناعي يغطي جميع الشركات المصنّعة الكبرى. تقدير التكلفة مرجع دولي تقريبي بالدولار، وليس سعرًا محليًا.' },
                { q: 'هل يمكنه تشخيص سيارتي من صوت المحرك فقط؟', a: 'نعم. الصوت من أقوى المدخلات لدينا. ارفع تسجيلًا للطرق أو الصرير أو الاحتكاك — حتى 10 ثوانٍ من الهاتف. يحلل الذكاء الاصطناعي النمط الصوتي لتحديد العطل المحتمل.' },
                { q: 'هل أحتاج إلى إنشاء حساب أو تسجيل الدخول؟', a: 'لا. الميكانيكي الافتراضي مجاني بالكامل ولا يتطلب حسابًا ولا تسجيلًا ولا أي معلومات شخصية. تُحفظ بيانات سيارتك محليًا على جهازك.' },
                { q: 'هل يُحفظ سجل محادثتي على خوادمكم؟', a: 'لا. يُحفظ السجل بالكامل على جهازك فقط عبر التخزين المحلي للمتصفح. لا نحتفظ بشيء على خوادمنا سوى الرسالة النشطة.' },
                { q: 'ما مدى دقة تقدير تكلفة الإصلاح؟', a: 'يُستخدم كمرجع دولي تقريبي، مع مراعاة اختلاف أسعار قطع الغيار والعمالة بين الدول. نعطيك نطاقًا (من الحد الأدنى إلى الأقصى) لتعرف ما هو معقول. إذا عرضت عليك ورشة سعرًا أعلى بكثير من الحد الأقصى، فهذا يستحق التحقق منه.' },
                { q: 'هل يمكنني الحصول على تقدير تكلفة لأي ماركة سيارة؟', a: 'نعم. نغطي تويوتا، هوندا، مرسيدس، لكزس، كيا، هيونداي، بي إم دبليو، ميتسوبيشي، نيسان، فورد، بيجو، وأي ماركة رئيسية أخرى، أينما كنت تقود. التقديرات مرجع دولي تقريبي.' },
                { q: 'ماذا أفعل إذا احتجت ميكانيكيًا متنقلًا أو ورشة قريبة مني؟', a: 'أداتنا تشخّص المشكلة أولًا لتعرف بالضبط ماذا تطلب قبل أن تبدأ البحث. إذا تطلب العطل فحصًا فعليًا أو معدات متخصصة، نخبرك بذلك بوضوح — ونوضح نوع الميكانيكي أو الورشة التي يجب البحث عنها.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronLeft className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:-rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            راجعه <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>، ميكانيكي سيارات. تم التحقق من منطق التشخيص ونطاقات تكلفة الإصلاح لضمان دقتها الفنية.
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              جاهز؟ شخّص سيارتك الآن.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              مجاني. فوري. بدون تسجيل. احصل على تشخيصك الآن.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              ابدأ تشخيصك المجاني
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              أدوات مجانية أخرى
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'فحص رقم الهيكل (VIN)',    color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'قائمة أوراق المركبة',      color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'حاسبة رسوم الاستيراد',     color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronLeft className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
