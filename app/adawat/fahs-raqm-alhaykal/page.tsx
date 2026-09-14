import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import VINCheckerClientAr from '@/components/VINCheckerClientAr';

export const metadata: Metadata = {
  title: 'فحص رقم الهيكل (VIN) مجانًا — فك ترميز رقم الشاصي | Naira Autos',
  description: 'فحص مجاني لرقم الهيكل (VIN) أو رقم الشاصي لأي سيارة. اعرف الماركة والموديل وسنة الصنع ومواصفات المحرك ودولة المنشأ فورًا — مصر، السعودية، الإمارات، قطر، العراق والمزيد.',
  keywords: ['فحص رقم الهيكل مجانا', 'فحص VIN', 'رقم الشاصي', 'رقم الشاسيه', 'رقم تعريف المركبة', 'فك ترميز رقم الهيكل', 'الاستعلام عن سيارة برقم الشاسيه', 'فحص رقم هيكل السيارة الامارات', 'فحص رقم الشاصي السعودية', 'رقم هيكل السيارة مصر'],
  alternates: {
    canonical: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      ja: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'فحص رقم الهيكل (VIN) مجانًا | Naira Autos',
    description: 'اعرف الماركة والموديل وسنة الصنع ومواصفات المحرك ودولة المنشأ من رقم الهيكل أو الشاصي، مجانًا وفوريًا.',
    url: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      name: 'فحص رقم الهيكل (VIN) مجانًا — فك ترميز رقم الشاصي',
      description: 'فحص مجاني لرقم الهيكل (VIN) أو رقم الشاصي لأي سيارة — الماركة والموديل وسنة الصنع ومواصفات المحرك ودولة المنشأ.',
      url: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      inLanguage: 'ar',
      dateModified: '2026-09-10',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://www.naira.autos/home-arabic' },
          { '@type': 'ListItem', position: 2, name: 'الأدوات', item: 'https://www.naira.autos/adawat' },
          { '@type': 'ListItem', position: 3, name: 'فحص رقم الهيكل', item: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'ما هو رقم الهيكل (VIN) للسيارة؟', acceptedAnswer: { '@type': 'Answer', text: 'رقم الهيكل (VIN) كود فريد مكون من 17 حرفًا ورقمًا يُمنح لكل سيارة عند تصنيعها. يحمل معلومات عن دولة المنشأ والشركة المصنعة ونوع المركبة والمحرك وسنة الموديل ومصنع التجميع ورقمًا تسلسليًا فريدًا. في الإمارات يُعرف عادة برقم الهيكل، وفي مصر برقم الشاصي أو الشاسيه، وكلها تشير لنفس الرقم.' } },
        { '@type': 'Question', name: 'كيف أفحص رقم الهيكل مجانًا؟', acceptedAnswer: { '@type': 'Answer', text: 'أدخل رقم الهيكل المكون من 17 حرفًا أعلاه واضغط "فك الترميز". تستخدم أداتنا المجانية قاعدة بيانات NHTSA الأمريكية العامة لعرض الماركة والموديل وسنة الصنع ومواصفات المحرك ونوع الدفع ودولة المنشأ — مجانًا بالكامل وبدون تسجيل، من أي دولة.' } },
        { '@type': 'Question', name: 'أين يوجد رقم الهيكل في السيارة؟', acceptedAnswer: { '@type': 'Answer', text: 'يظهر رقم الهيكل في ثلاثة مواقع: لوحة التابلوه (تظهر من خلال الزجاج الأمامي)، ملصق داخل إطار باب السائق، ومحفور على هيكل السيارة أسفل غطاء المحرك. يجب أن تتطابق الأرقام الثلاثة تمامًا.' } },
        { '@type': 'Question', name: 'هل رقم الشاصي هو نفسه رقم الهيكل؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم، تمامًا. رقم الشاصي، رقم الشاسيه، ورقم الهيكل كلها مصطلحات مختلفة لنفس الرقم المكون من 17 حرفًا (VIN). الاختلاف في التسمية فقط بين الدول العربية — لا فرق في المعنى.' } },
        { '@type': 'Question', name: 'هل تعمل الأداة مع السيارات في مصر والسعودية والإمارات وقطر والعراق؟', acceptedAnswer: { '@type': 'Answer', text: 'نعم، بشرط أن تكون السيارة مصنّعة أصلًا للسوق الأمريكي أو الكندي أو المكسيكي — وهو حال جزء كبير من السيارات المستوردة والمستعملة في هذه الدول، خصوصًا السيارات الأمريكية الصنع كفورد وجيب وشيفروليه. السيارات المصممة حصريًا لمواصفات الخليج (GCC Spec) قد لا تظهر في قاعدة بيانات NHTSA؛ في هذه الحالة يمكن التحقق عبر بوابة مرور مصر، أو أداة SASO في السعودية، أو خدمات MOI وRTA في الإمارات.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'فحص رقم الهيكل (VIN) مجانًا', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VinCheckerArabicPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div dir="rtl" lang="ar" className="min-h-screen bg-background">

        <div className="relative bg-[#080C10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
            <div className="flex items-center gap-3 mb-8">
              <Link href="/adawat" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="رجوع">
                <ArrowRight className="h-4 w-4" />
              </Link>
              <nav aria-label="مسار التنقل" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/home-arabic" className="hover:text-white/60 transition-colors">الرئيسية</Link>
                <ChevronLeft className="h-3 w-3" />
                <Link href="/adawat" className="hover:text-white/60 transition-colors">الأدوات</Link>
                <ChevronLeft className="h-3 w-3" />
                <span className="text-white/50">فحص رقم الهيكل</span>
              </nav>
            </div>
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">مجاني 100%</span>
                <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">بيانات NHTSA</span>
                <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                  Read in English ←
                </Link>
              </div>
              <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
                فحص رقم الهيكل (VIN)<br /><span className="text-blue-400">مجانًا وفوريًا</span>
              </h1>
              <p className="text-white/80 text-lg font-semibold leading-snug mb-2">اعرف تفاصيل أي سيارة من رقم الهيكل أو الشاصي في ثوانٍ.</p>
              <p className="text-white/75 text-sm leading-relaxed">أدخل رقم الهيكل المكون من 17 حرفًا من التابلوه أو الباب أو الهيكل نفسه. احصل على الماركة والموديل وسنة الصنع ومواصفات المحرك ودولة المنشأ — مجانًا وبدون تسجيل. مفيد لسيارات مصر والسعودية والإمارات وقطر والعراق.</p>
            </div>
          </div>
        </div>

        <VINCheckerClientAr />

        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>فحص مجاني لرقم الهيكل لأي سيارة مستعملة</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>تستخدم أداتنا <strong className="text-foreground">لفحص رقم الهيكل مجانًا</strong> قاعدة بيانات NHTSA العامة (هيئة سلامة الطرق الأمريكية). يمنحك <strong className="text-foreground">الفحص المجاني</strong> الماركة والموديل وسنة الصنع ومواصفات المحرك ونوع الدفع وفئة الهيكل ومصنع التجميع — كل ما تحتاجه للتأكد من حقيقة السيارة المستعملة قبل شرائها.</p>
                    <p>سوق السيارات المستعملة أصبح عالميًا أكثر من أي وقت مضى. سيارات مصنّعة للسوق الأمريكي أو الكندي أو المكسيكي تُصدَّر وتُعاد تسجيلها باستمرار — سواء كسيارات مستوردة إلى مصر والسعودية، أو كسيارات دفع رباعي وبيك أب تصل إلى الإمارات وقطر والعراق عبر المزادات الأمريكية. بما أن رقم الهيكل يُحفر في المصنع ولا يتغير أبدًا، فإن فحصًا واحدًا مجانيًا يعمل بنفس الطريقة أيًا كانت الدولة التي تنتهي فيها السيارة، طالما صُنعت أصلًا للسوق الأمريكي الشمالي.</p>
                    <p>هذه هي النقطة الأهم: رقم الهيكل ليس رقم لوحة تمنحه حكومتك المحلية — إنه بصمة تصنيع تُطبع على خط الإنتاج، قبل أن تغادر السيارة المصنع بوقت طويل. لا يتغير عند التصدير أو إعادة التسجيل أو تركيب لوحات جديدة أو بيع السيارة عدة مرات. لهذا يمكن لفحص رقم الهيكل المجاني أن يتتبع السيارة عبر الحدود بطريقة لا يستطيعها رقم اللوحة أبدًا.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>فحص رقم الهيكل حسب الدولة</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p><strong className="text-foreground">مصر</strong> — تشترط بوابة مرور مصر مطابقة رقم الشاسيه (وكذلك رقم المحرك) مع البيانات المسجلة في رخصة السيارة قبل أي عملية بيع أو نقل ملكية. لأن جزءًا كبيرًا من السيارات المستوردة والموديلات الأمريكية في السوق المصري صُنعت أصلًا لأمريكا الشمالية، فإن هذا الفحص المجاني يعطي نتيجة دقيقة قبل الذهاب لمصلحة المرور أو دفع أي عربون.</p>
                    <p><strong className="text-foreground">السعودية</strong> — توفر الهيئة السعودية للمواصفات والمقاييس والجودة (SASO) خدمة استعلام رسمية عن حالة السيارة برقم الشاصي، خصوصًا للسيارات المستوردة. سيارات البيك أب والدفع الرباعي الأمريكية منتشرة جدًا في السوق السعودي، وهذا الفحص المجاني هو الخطوة الأولى الأرخص قبل أي فحص فني مدفوع.</p>
                    <p><strong className="text-foreground">الإمارات وقطر</strong> — يُستخدم مصطلح "رقم الهيكل" رسميًا في وثيقة تسجيل المركبة ("الملكية")، وتقدم وزارة الداخلية (MOI) وهيئة الطرق والمواصلات (RTA) خدمات فحص رسمية. سوق السيارات المستعملة في دبي وأبوظبي والدوحة يعتمد بشكل كبير على سيارات أمريكية مُعاد تصديرها، لذا يعمل هذا الفحص المجاني لجزء كبير من السوق قبل أي فحص شامل مدفوع.</p>
                    <p><strong className="text-foreground">العراق</strong> — غالبية السيارات المستعملة المستوردة تأتي عبر مزادات أمريكية أو من وكلاء إقليميين، وتصنيع الغالبية العظمى منها كان أصلًا للسوق الأمريكي الشمالي، ما يجعل فحص رقم الهيكل المجاني أداة موثوقة قبل الاتفاق مع أي بائع أو معرض سيارات.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>تشتري سيارة مستوردة؟ افعل هذا أولًا</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>شراء سيارة مستوردة يحمل خطرًا إضافيًا لا يوجد في الشراء المحلي: قد تكون الأوراق والبائع وحالة السيارة الحقيقية جاءت من دولة لم تزرها أبدًا. الفحص المجاني لرقم الهيكل أو الشاصي لا يغني عن الفحص الفني، لكنه أول فلتر مجاني ومنخفض التكلفة، ولا يكلفك شيئًا قبل التقدم خطوة أخرى.</p>
                    <p>ابدأ بفك ترميز رقم الهيكل وقارن النتيجة — سنة الصنع، الموديل، المحرك، الفئة — مع ما أعلنه البائع بالضبط. أي اختلاف هنا، حتى لو كان بسيطًا مثل خطأ في المحرك، غالبًا ما يكون أول إشارة إلى أن صور الإعلان والأوراق الفعلية ليست لنفس السيارة. بعد ذلك، تحقق فعليًا من تطابق رقم الهيكل في التابلوه مع المحفور على الهيكل وملصق الباب؛ أي اختلاف بين هذه المواقع الثلاثة من أوضح علامات تبديل اللوحة.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>رقم الهيكل vs رقم الشاصي vs رقم تعريف المركبة — هل هي نفس الشيء؟</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>نعم، مع اختلافات بسيطة في التسمية بين الدول العربية. <strong className="text-foreground">VIN</strong> هو المصطلح الدولي (Vehicle Identification Number). <strong className="text-foreground">رقم تعريف المركبة</strong> هو الترجمة الرسمية الكاملة. <strong className="text-foreground">رقم الهيكل</strong> هو المصطلح الأكثر شيوعًا في الإمارات وقطر والخليج عمومًا. <strong className="text-foreground">رقم الشاصي</strong> أو <strong className="text-foreground">الشاسيه</strong> هو المصطلح الأكثر استخدامًا في مصر. جميعها تشير إلى نفس الكود المكون من 17 حرفًا المحفور في المصنع.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>كيف تقرأ رقم الهيكل: ماذا يعني كل جزء</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>الأحرف الـ17 ليست عشوائية. المواقع من 1 إلى 3 تحدد الشركة المصنعة ودولة التجميع — بهذا تعرف الأداة إن كانت السيارة صُنعت في أمريكا أو كندا أو المكسيك أو مكان آخر. المواقع من 4 إلى 8 تصف السيارة: الهيكل، المحرك، الفئة. الموقع 9 هو رقم تحقق رياضي يُستخدم لاكتشاف أي رقم هيكل مكتوب خطأ أو تم التلاعب به. الموقع 10 يحدد سنة الموديل، والمواقع من 12 إلى 17 هي الرقم التسلسلي الفريد للسيارة.</p>
                    <p>معرفة قراءة هذه الأجزاء بنفسك مفيدة حتى مع وجود أداة فحص جاهزة، لأنها تتيح لك التحقق من النتيجة خلال ثوانٍ. إذا أظهر الموقع 10 أن السيارة موديل 2015 بينما أعلن البائع أنها 2018، يستحق الأمر أن تسأل مباشرة — هذا ليس اتهامًا، بل تحقق لا يكلف شيئًا ويستغرق ثلاثين ثانية.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>يعمل مع جميع الماركات — فورد، تويوتا، هوندا، شيفروليه والمزيد</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>هذه ليست أداة مخصصة لماركة واحدة. بما أنها تقرأ مباشرة من قاعدة بيانات الشركات المصنعة لدى NHTSA، فإن نفس الأداة تعمل مع فورد وتويوتا وهوندا وشيفروليه وجي إم سي ونيسان وجيب وهيونداي وأي ماركة أخرى تُباع في السوق الأمريكي الشمالي. فقط الصق الرقم المكون من 17 حرفًا — تتعرف الأداة تلقائيًا على مخطط الشركة المصنعة الصحيح دون الحاجة لتحديد الماركة بنفسك.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>فحص رقم الهيكل مقابل تقرير تاريخ السيارة الكامل</h2>
                  <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                    <p>يخبرك <strong className="text-foreground">الفحص المجاني لرقم الهيكل</strong> بما كانت عليه السيارة عند خروجها من المصنع — مواصفات التصنيع فقط. لمعرفة ما حدث لها منذ ذلك الحين — حوادث، عداد ممشى مُتلاعَب به، حالة السند (تلف كلي، غرق، إعادة بناء) — تحتاج إلى <strong className="text-foreground">تقرير تاريخ سيارة</strong> مدفوع مثل Carfax أو AutoCheck. لأي عملية شراء سيارة مستعملة ذات قيمة عالية، يُنصح بشدة بتقرير تاريخ مدفوع بالإضافة إلى هذا الفحص المجاني للمواصفات.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>فحص رقم الهيكل — الأسئلة الشائعة</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                {[
                  { q: 'هل هذا الفحص مجاني فعلًا؟', a: 'نعم. مجاني 100% باستخدام واجهة NHTSA العامة. لا يتطلب حسابًا ولا تسجيل دخول. يمكنك إجراء أي عدد من الفحوصات التي تحتاجها، من أي دولة.' },
                  { q: 'ما فائدة رقم الهيكل للسيارة؟', a: 'يحدد رقم الهيكل السيارة تحديدًا دقيقًا للتحقق من المواصفات، ومراجعة التاريخ، والتسجيل، والتأمين، وإشعارات الاستدعاء. في معظم الدول العربية يُطلب رقم الهيكل أو الشاصي لإتمام إجراءات النقل والتسجيل.' },
                  { q: 'هل يمكنني معرفة مواصفات السيارة من رقم الهيكل مجانًا؟', a: 'نعم. تعرض أداتنا المجانية الماركة والموديل وسنة الصنع والمحرك ونوع الهيكل ونوع الدفع والمنشأ من قاعدة بيانات NHTSA، بدون أي تكلفة، للسيارات ذات المواصفات الأمريكية أو الكندية أو المكسيكية.' },
                  { q: 'هل تعمل الأداة مع السيارات المستوردة إلى مصر أو السعودية أو الإمارات؟', a: 'نعم، لأي سيارة صُنعت أصلًا للسوق الأمريكي الشمالي — وهي حالة شائعة جدًا بين مستوردي البيك أب والدفع الرباعي. السيارات ذات مواصفات الخليج الحصرية (GCC Spec) أو الأوروبية قد لا تظهر في القاعدة.' },
                  { q: 'كيف أعرف إذا كان رقم الهيكل صحيحًا؟', a: 'رقم الهيكل الصحيح يتكون من 17 حرفًا بالضبط — حروف إنجليزية (A-Z بدون I وO وQ) وأرقام. الموقع 9 رقم تحقق رياضي. إذا لم يتطابق، فقد تم التلاعب بالرقم. تتحقق هذه الأداة من ذلك تلقائيًا.' },
                  { q: 'ماذا لو لم تظهر أي نتائج عند الفحص؟', a: 'غالبًا يعني ذلك أن السيارة أوروبية أو آسيوية المنشأ أو ذات مواصفات خاصة بسوق آخر — خارج قاعدة بيانات NHTSA. نقوم بفك سنة الموديل من الموقع 10 في رقم الهيكل رغم ذلك. في هذه الحالات، تواصل مع خدمة رقم الهيكل الرسمية للشركة المصنعة.' },
                  { q: 'هل رقم المحرك هو نفسه رقم الهيكل؟', a: 'لا. رقم المحرك محفور على كتلة المحرك نفسها ويحدد ذلك المحرك تحديدًا، بينما رقم الهيكل/الشاصي يحدد السيارة كاملة. هذه الأداة تفك رقم الهيكل فقط، وليس رقم المحرك المنفصل.' },
                  { q: 'هل يؤثر رقم الهيكل على رسوم الجمارك؟', a: 'بشكل غير مباشر، نعم. تحسب دول كثيرة رسوم الاستيراد بناءً على عمر السيارة وسعة المحرك، وكلاهما يؤكدهما رقم الهيكل. فك الترميز بدقة قبل حساب الرسوم يساعدك على تجنب التخطيط بأرقام خاطئة.' },
                  { q: 'هل يخبرني فحص رقم الهيكل إذا كانت السيارة تعرضت لحادث؟', a: 'لا. يعرض الفحص المجاني فقط مواصفات التصنيع — الماركة والموديل وسنة الصنع والمحرك والمنشأ. تاريخ الحوادث والعداد وحالة السند تحتاج تقريرًا مدفوعًا مثل Carfax أو AutoCheck.' },
                  { q: 'هل يمكنني معرفة إذا كانت السيارة مسروقة برقم الهيكل؟', a: 'ليس عبر هذه الأداة. البحث عن سيارة مسروقة هو استعلام تابع للجهات الأمنية وشركات التأمين — يوفر NICB (المكتب الوطني الأمريكي لمكافحة احتيال التأمين) أداة VINCheck مجانية لهذا الغرض تحديدًا، منفصلة عن أداة فك ترميز المواصفات.' },
                ].map(({ q, a }) => (
                  <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                      <span className="text-sm font-semibold text-foreground">{q}</span>
                      <ChevronLeft className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:-rotate-90 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                  </details>
                ))}
              </div>
            </div>

            <section>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                المزيد من الأدوات المجانية
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <Link href="/adawat/ai-mechanic-arabic" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">ميكانيكي افتراضي بالذكاء الاصطناعي</p>
                  <ChevronLeft className="h-4 w-4 text-emerald-500" />
                </Link>
                <Link href="/kam-qeemat-sayarati" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                  <p className="text-sm font-bold text-amber-700 dark:text-amber-400">كم قيمة سيارتي؟</p>
                  <ChevronLeft className="h-4 w-4 text-amber-500" />
                </Link>
                <Link href="/tools/distance-calculator-uae-arabic" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                  <p className="text-sm font-bold text-sky-700 dark:text-sky-400">حاسبة المسافات — الإمارات</p>
                  <ChevronLeft className="h-4 w-4 text-sky-500" />
                </Link>
                <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-400">VIN Checker (English)</p>
                  <ChevronLeft className="h-4 w-4 text-blue-500" />
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
}
