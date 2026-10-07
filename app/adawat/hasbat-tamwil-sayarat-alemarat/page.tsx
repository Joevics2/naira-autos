import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronDown } from 'lucide-react';
import TamwilSayaratClient from './client';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'حاسبة تمويل السيارات في الإمارات 2026 — السعر الثابت والسعر الفعلي',
  description: 'حاسبة مجانية لتمويل السيارات في الإمارات: اكتشف السعر الفعلي الحقيقي خلف أي سعر ثابت معلن، وفق قواعد المصرف المركزي 2026 — دفعة أولى 20%، مدة حتى 60 شهرًا، ونسبة التزامات 50%.',
  alternates: alternatesFor('/adawat/hasbat-tamwil-sayarat-alemarat'),
  openGraph: {
    title: 'حاسبة تمويل السيارات في الإمارات 2026 | Naira Autos',
    description: 'حاسبة مجانية لتمويل السيارات في الإمارات — القسط الشهري، والسعر الفعلي الحقيقي خلف أي سعر ثابت معلن.',
    url: 'https://www.naira.autos/adawat/hasbat-tamwil-sayarat-alemarat',
    locale: 'ar',
  },
  keywords: [
    'تمويل السيارات الإمارات', 'حاسبة قرض السيارة', 'السعر الثابت والسعر الفعلي', 'تمويل سيارة دبي',
    'قرض سيارة بنك الإمارات دبي الوطني', 'الدفعة الأولى تمويل السيارة', 'المصرف المركزي تمويل السيارات',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/adawat/hasbat-tamwil-sayarat-alemarat',
      name: 'حاسبة تمويل السيارات في الإمارات 2026 — السعر الثابت والسعر الفعلي',
      description: 'حاسبة مجانية لتمويل السيارات في الإمارات مع السعر الفعلي الحقيقي خلف أي سعر ثابت، وفق قواعد المصرف المركزي 2026.',
      url: 'https://www.naira.autos/adawat/hasbat-tamwil-sayarat-alemarat',
      dateModified: '2026-09-29',
      inLanguage: 'ar',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'ما الفرق بين السعر الثابت والسعر الفعلي في تمويل السيارات؟', acceptedAnswer: { '@type': 'Answer', text: 'السعر الثابت يُحسب على كامل مبلغ القرض طوال المدة حتى بعد انخفاض الرصيد، بينما السعر الفعلي يُحسب فقط على الرصيد المتبقي فعليًا. سعر ثابت معلن 3% سنويًا يعادل تقريبًا سعرًا فعليًا بين 5.5% و6%.' } },
        { '@type': 'Question', name: 'ما الحد الأدنى للدفعة الأولى لتمويل سيارة في الإمارات؟', acceptedAnswer: { '@type': 'Answer', text: 'يفرض المصرف المركزي حدًا أدنى 20% من قيمة السيارة (أي تمويل لا يتجاوز 80% من القيمة)، سواء للمواطنين أو المقيمين، وإن كانت بعض البنوك تطلب نسبة أعلى حسب عمر السيارة أو الملف الائتماني.' } },
        { '@type': 'Question', name: 'ما الحد الأقصى لمدة تمويل السيارة في الإمارات؟', acceptedAnswer: { '@type': 'Answer', text: '60 شهرًا للسيارات الجديدة، وعادة 48 شهرًا للسيارات المستعملة، وفق قواعد المصرف المركزي.' } },
        { '@type': 'Question', name: 'كم تبلغ رسوم السداد المبكر لقرض السيارة؟', acceptedAnswer: { '@type': 'Answer', text: '1% من الرصيد المتبقي كحد أقصى، بحد أقصى مطلق قدره 10,000 درهم إماراتي، بصرف النظر عن حجم الرصيد المتبقي.' } },
        { '@type': 'Question', name: 'ما نسبة الالتزامات الشهرية المسموح بها لتمويل سيارة؟', acceptedAnswer: { '@type': 'Answer', text: 'يحدد المصرف المركزي سقفًا 50% من الدخل الشهري لإجمالي الالتزامات، بما في ذلك قسط هذه السيارة مع أي قروض أخرى قائمة.' } },
        { '@type': 'Question', name: 'ما الفرق بين التمويل التقليدي والتمويل الإسلامي للسيارات؟', acceptedAnswer: { '@type': 'Answer', text: 'التمويل التقليدي يفرض فائدة على المبلغ المقترض. التمويل الإسلامي، المتوفر من بنوك مثل بنك دبي الإسلامي ومصرف أبوظبي الإسلامي، يُبنى غالبًا على صيغة المرابحة: يشتري البنك السيارة ويبيعها للعميل بهامش ربح محدد مسبقًا يُسدَّد على أقساط.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'حاسبة تمويل السيارات — الإمارات', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function HasbatTamwilSayaratAlemaratPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div dir="rtl" lang="ar" className="min-h-screen bg-background">

        <div className="relative bg-[#080C10] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-bl from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Link prefetch={false} href="/adawat" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="رجوع">
                <ArrowRight className="h-4 w-4" />
              </Link>
              <nav aria-label="مسار التنقل" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link prefetch={false} href="/home-arabic" className="hover:text-white/60 transition-colors">الرئيسية</Link>
                <ChevronLeft className="h-3 w-3" />
                <Link prefetch={false} href="/adawat" className="hover:text-white/60 transition-colors">الأدوات</Link>
                <ChevronLeft className="h-3 w-3" />
                <span className="text-white/50">حاسبة تمويل السيارات</span>
              </nav>
            </div>
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">مجاني 100%</span>
                <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">قواعد المصرف المركزي 2026</span>
                <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">آخر تحديث: سبتمبر 2026</span>
              </div>
              <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
                style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
                حاسبة تمويل<br /><span className="text-emerald-400">السيارات — الإمارات</span>
              </h1>
              <p className="text-white/80 text-lg font-semibold leading-snug mb-2">اكتشف السعر الفعلي الحقيقي خلف أي سعر ثابت معلن.</p>
              <p className="text-white/75 text-sm leading-relaxed">أدخل السعر الثابت الذي يعلنه البنك، وستحسب لك الأداة السعر الفعلي المتناقص الحقيقي — القسط الشهري، وإجمالي التكلفة، مقارنة بقواعد المصرف المركزي.</p>
            </div>
          </div>
        </div>

        <TamwilSayaratClient />

        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-10">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>تمويل السيارات في الإمارات — لماذا &quot;السعر الثابت&quot; مضلل</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-sm text-muted-foreground leading-relaxed">
                <p>يُموَّل نحو 80% من مشتريات السيارات في الإمارات عبر قرض بنكي، والسبب الذي يجعل هذا السوق مختلفًا عن كثير من الأسواق الأخرى هو الطريقة التي تُعرض بها الفائدة: معظم البنوك الإماراتية تُعلن عن &quot;السعر الثابت&quot; (Flat Rate) وليس السعر الفعلي المتناقص (Reducing Rate)، وهذا فرق جوهري وليس مجرد مصطلح مختلف. السعر الثابت يُحسب على كامل مبلغ القرض طوال مدة السداد، حتى بعد أن ينخفض الرصيد المتبقي شهرًا بعد شهر، بينما السعر الفعلي يُحسب فقط على الرصيد المتبقي الفعلي في كل شهر.</p>
                <p>النتيجة: سعر ثابت معلن بنسبة 3% سنويًا يعادل تقريبًا سعرًا فعليًا يتراوح بين 5.5% و6% — ليس ضعف الرقم المعلن تمامًا، لكنه قريب جدًا منه. مصرف الإمارات المركزي يُلزم البنوك بموجب التعميم رقم 29/2011 بالإفصاح عن السعر الفعلي المكافئ جنبًا إلى جنب مع أي سعر ثابت يُعلن عنه، لكن كثيرًا من الإعلانات التسويقية لا تزال تُبرز السعر الثابت الأصغر رقميًا لأنه يبدو أكثر جاذبية.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>قواعد المصرف المركزي الملزمة</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">المصرف المركزي يضع أيضًا حدودًا صارمة وواضحة لا تخضع لتقدير البنك: الحد الأدنى للدفعة الأولى هو 20% من قيمة السيارة (أي أن التمويل لا يتجاوز 80% من القيمة)، والحد الأقصى لمدة التمويل هو 60 شهرًا، ونسبة الالتزامات الشهرية الإجمالية — تشمل قسط هذه السيارة مع أي قروض أخرى — يجب ألا تتجاوز 50% من الدخل الشهري. هذه ليست إرشادات عامة يمكن للبنك تجاوزها حسب تقديره، بل قواعد تنظيمية ملزمة لكل البنوك العاملة في الدولة، سواء للمواطنين أو المقيمين، وإن كانت بعض البنوك تطلب دفعة أولى أعلى (25% إلى 30%) للسيارات الأكبر سنًا أو حسب الملف الائتماني للعميل.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { label: '20%', desc: 'الحد الأدنى للدفعة الأولى (قاعدة إلزامية)', color: 'text-emerald-600 dark:text-emerald-400' },
                { label: '50%', desc: 'سقف نسبة الالتزامات الشهرية من الدخل', color: 'text-blue-600 dark:text-blue-400' },
                { label: '1% / 10,000', desc: 'سقف رسوم السداد المبكر (% / درهم)', color: 'text-amber-600 dark:text-amber-400' },
              ].map(({ label, desc, color }) => (
                <div key={label} className="p-5 rounded-2xl bg-card border border-border text-center">
                  <p className={`text-2xl font-black mb-2 ${color}`} style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>رسوم السداد المبكر محكومة بسقف واضح</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">رسوم السداد المبكر محكومة أيضًا بسقف واضح من المصرف المركزي: 1% من الرصيد المتبقي كحد أقصى، وبحد أقصى مطلق قدره 10,000 درهم إماراتي، بغض النظر عن حجم القرض المتبقي. هذا يعني أن تسديد قرض كبير مبكرًا لن يُكلفك أكثر من هذا السقف مهما كان الرصيد المتبقي ضخمًا — نقطة تفاوض مهمة يغفل عنها كثير من المقترضين عند التعاقد.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>السيارات المستعملة تخضع لشروط مختلفة</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">السيارات المستعملة تخضع لشروط مختلفة عن الجديدة في نقاط متعددة. المدة القصوى للتمويل تنخفض عادة إلى 48 شهرًا بدلاً من 60، وتضع البنوك سقفًا لعمر السيارة عند انتهاء القرض — غالبًا 10 إلى 11 سنة كحد أقصى — بمعنى أن سيارة عمرها 7 سنوات قد لا تحصل إلا على مدة تمويل قصيرة نسبيًا. السعر الثابت المعلن للسيارات المستعملة أعلى أيضًا من الجديدة عادة، ويتراوح بين 2.75% و5.5% سنويًا حسب البنك وما إذا كان راتب العميل محولًا إليه، إذ يمنح تحويل الراتب إلى البنك عادة سعرًا أفضل بمقدار 0.5% إلى 1% عن عدم التحويل.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>التمويل التقليدي مقابل التمويل الإسلامي</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">يتوفر إلى جانب التمويل التقليدي القائم على الفائدة تمويل إسلامي متوافق مع الشريعة من بنوك مثل بنك دبي الإسلامي ومصرف أبوظبي الإسلامي وبنك الشارقة الإسلامي، ويُبنى عادة على صيغة المرابحة: يشتري البنك السيارة ثم يبيعها للعميل بسعر متفق عليه يشمل هامش ربح محدد مسبقًا، يُسدَّد على أقساط شهرية ثابتة. من الناحية العملية، تتشابه الأقساط الشهرية بين الصيغتين بشكل كبير لنفس المبلغ والمدة، لكن الهيكل القانوني والشرعي يختلف جوهريًا.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>مثال: السعر الثابت مقابل السعر الفعلي</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">خالد راتبه الشهري 15,000 درهم ويريد شراء سيارة سعرها 100,000 درهم. بدفعة أولى 20% (20,000 درهم)، يصبح مبلغ التمويل 80,000 درهم. بسعر ثابت معلن 3% سنويًا على مدى 60 شهرًا، يصبح القسط الشهري نحو 1,533 درهمًا — أي ما يعادل سعرًا فعليًا حقيقيًا يقارب 5.6% سنويًا، وليس 3% كما يوحي الإعلان. هذا القسط يمثل نحو 10.2% من راتبه، بعيدًا جدًا عن سقف الـ50% الذي يفرضه المصرف المركزي، ما يمنحه هامشًا جيدًا لالتزامات أخرى دون تجاوز الحد التنظيمي.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>أين تحصل فعليًا على تمويل سيارة</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">يمكن الحصول على تمويل السيارات من عدد كبير من البنوك العاملة في الدولة، أبرزها بنك الإمارات دبي الوطني، وبنك أبوظبي التجاري، وبنك المشرق، وبنك رأس الخيمة الوطني (RAKBANK)، وبنك أبوظبي الأول، إضافة إلى البنوك الإسلامية المذكورة أعلاه. المقارنة بين أكثر من بنك واحد أمر ضروري هنا تحديدًا، لأن الفارق بين &quot;السعر الثابت&quot; المعلن لا يعكس بالضرورة الترتيب الحقيقي للتكلفة الفعلية بين البنوك — البنك الذي يبدو الأرخص ظاهريًا قد لا يكون كذلك فعليًا بمجرد تحويل الأرقام إلى سعرها الفعلي المتناقص.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>شروط الأهلية</h2>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">للتأهل لتمويل سيارة في الإمارات، تشترط معظم البنوك حدًا أدنى للراتب الشهري يتراوح بين 4,000 و7,000 درهم للموظفين، أو متوسط رصيد شهري لا يقل عن 25,000 درهم لأصحاب الأعمال الحرة، إلى جانب إقامة سارية وهوية إماراتية (Emirates ID) صالحة. العمر عند استحقاق آخر قسط عادة لا يتجاوز 65 عامًا، والحد الأدنى لسن المتقدم 21 عامًا. السيارة نفسها تبقى مرهونة باسم البنك حتى سداد آخر قسط، وهذا شرط قياسي في جميع عقود تمويل السيارات بالدولة بصرف النظر عن البنك المموّل.</p>
            </div>

            <div>
              <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>أسئلة شائعة</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {[
                  { q: 'ما الفرق بين السعر الثابت والسعر الفعلي؟', a: 'السعر الثابت يُحسب على كامل مبلغ القرض طوال المدة، بينما السعر الفعلي يُحسب فقط على الرصيد المتبقي. سعر ثابت 3% سنويًا يعادل تقريبًا سعرًا فعليًا بين 5.5% و6%.' },
                  { q: 'ما الحد الأدنى للدفعة الأولى؟', a: 'يفرض المصرف المركزي حدًا أدنى 20% من قيمة السيارة، سواء للمواطنين أو المقيمين.' },
                  { q: 'ما الحد الأقصى لمدة التمويل؟', a: '60 شهرًا للسيارات الجديدة، وعادة 48 شهرًا للمستعملة.' },
                  { q: 'كم رسوم السداد المبكر؟', a: '1% من الرصيد المتبقي كحد أقصى، بحد أقصى مطلق 10,000 درهم.' },
                  { q: 'ما سقف نسبة الالتزامات الشهرية؟', a: '50% من الدخل الشهري لإجمالي الالتزامات، يشمل قسط هذه السيارة مع أي قروض أخرى.' },
                  { q: 'ما الفرق بين التمويل التقليدي والإسلامي؟', a: 'التقليدي يفرض فائدة على المبلغ. الإسلامي (مثل بنك دبي الإسلامي) يُبنى غالبًا على المرابحة: يشتري البنك السيارة ويبيعها بهامش ربح محدد مسبقًا.' },
                ].map(({ q, a }) => (
                  <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                      <span className="text-sm font-semibold text-foreground">{q}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                  </details>
                ))}
              </div>
            </div>

            <p className="text-xs text-muted-foreground border-t border-border pt-4">
              راجعه <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Evelyn John</Link>، خبيرة مبيعات السيارات. تم التحقق من الأرقام والقواعد وفق تعميم المصرف المركزي الإماراتي رقم 29/2011 ومقارنات أسعار البنوك المنشورة لعام 2026.
            </p>

          </div>
        </div>
      </div>
    </>
  );
}
