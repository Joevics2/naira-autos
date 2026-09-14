import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { ArabamNeKadarEderClient } from './client';

export const metadata: Metadata = {
  title: 'Arabam Ne Kadar Eder? Ücretsiz Yapay Zeka Değerlemesi | Naira Autos',
  description: 'Arabanızı yapay zeka ile ücretsiz değerlendirin, kendi para biriminizle. Bir fotoğraf yükleyin, anında fiyat alın — Türkiye ve daha fazlası.',
  keywords: 'arabam ne kadar eder, ücretsiz araba değerleme, ikinci el araba fiyatı, yapay zeka araba değerleme, araba değeri hesaplama',
  openGraph: {
    title: 'Arabam Ne Kadar Eder? Ücretsiz Yapay Zeka Değerlemesi',
    description: 'Arabanızı yapay zeka ile kendi para biriminizle değerlendirin. Bir fotoğraf yükleyin, anında bir tahmin alın — tamamen ücretsiz.',
    url: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
    siteName: 'Naira Autos',
    locale: 'tr',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      tr: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Arabam Ne Kadar Eder? Ücretsiz Yapay Zeka Değerlemesi',
  description: 'Ücretsiz yapay zeka araba değerleme aracı. Kendi para biriminizle anında tahmin, ülkenizin piyasasına göre kalibre edilmiş.',
  url: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
  inLanguage: 'tr',
  dateModified: '2026-09-10',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Yapay Zeka Araba Değerleme — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Arabanızın fotoğrafını yükleyin, yapay zeka ile kendi para biriminizde anında piyasa değeri tahmini alın.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.naira.autos/ana-sayfa' },
      { '@type': 'ListItem', position: 2, name: 'Araçlar', item: 'https://www.naira.autos/araclar' },
      { '@type': 'ListItem', position: 3, name: 'Arabam Ne Kadar Eder', item: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'İkinci el arabam ne kadar eder?', acceptedAnswer: { '@type': 'Answer', text: 'Bu; marka, model, yıl, donanım seviyesi, kilometre ve genel duruma, ayrıca ülkenizde benzer arabaların güncel satış fiyatlarına bağlıdır. Yukarıya bir fotoğraf yükleyip ülkenizi seçin — yapay zeka arabanızı tanır ve o piyasadaki gerçek ilanlara dayanarak kendi para biriminizle bir fiyat aralığı verir.' } },
      { '@type': 'Question', name: 'İkinci el bir arabanın değerlemesini hangi faktörler etkiler?', acceptedAnswer: { '@type': 'Answer', text: 'En önemli faktörler şunlardır: (1) Marka ve model — bazıları piyasaya göre değerini daha iyi korur. (2) Yıl, donanım seviyesi ve kilometre. (3) Kaporta ve boya durumu. (4) Mekanik durum ve bakım geçmişi. (5) Ruhsat ve tescil belgelerinin eksiksizliği. (6) Yerel arz ve talep — aynı araba ülkeye göre farklı değer taşıyabilir.' } },
      { '@type': 'Question', name: 'Ülkem değerlemeyi etkiler mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, oldukça fazla. İthalat vergileri, belirli markalara yönelik yerel talep, para biriminin gücü ve ikinci el piyasasının büyüklüğü, fiyatların ülkeler arasında büyük ölçüde değişmesine neden olur. Aracımız birçok ülkeyi kapsar ve size küresel bir ortalama yerine o piyasaya göre kalibre edilmiş, doğru yerel para biriminde bir tahmin verir.' } },
      { '@type': 'Question', name: 'Yapay zeka değerlemesi ne kadar doğru?', acceptedAnswer: { '@type': 'Answer', text: 'Aracımız, fotoğrafınızdan marka, model, yıl ve donanım seviyesini doğru şekilde belirlemek için bilgisayarlı görü kullanır, ardından bunu seçtiğiniz ülkedeki gerçek ilan verileriyle karşılaştırarak size tek bir sayı değil bir fiyat aralığı verir. Bunu pazarlık için güvenilir bir başlangıç noktası olarak düşünün, kesin bir fiyat değil — gerçek değer her zaman yüz yüze inceleme ve pazarlığa bağlıdır.' } },
      { '@type': 'Question', name: 'Bu değerleme aracı gerçekten ücretsiz mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet. Hiçbir ücret yok, hesap oluşturmaya gerek yok ve kullanım sınırı yok.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marka ve yeniden satış değeri', body: 'Yeniden satış gücü piyasaya göre değişir — Toyota ve Honda çoğu bölgede değerini iyi korurken, Alman lüks markaları bakım maliyetlerinin yüksek olduğu piyasalarda daha hızlı değer kaybeder. Yerel talep, marka adı kadar önemlidir.' },
  { icon: Shield, title: 'Kilometre ve bakım geçmişi', body: 'Düşük kilometre ve belgelenmiş bakım geçmişi, dünyanın her yerinde iyi bakılmış bir arabanın en güçlü iki göstergesidir. Düzenli bakım kaydı, bir yıl daha yeni bir modelden bile daha değerli olabilir.' },
  { icon: CheckCircle2, title: 'Belgeler ve mülkiyet', body: 'Eksiksiz ruhsat ve güncel tescil, her piyasada en iyi değeri elde etmek için pazarlık konusu değildir. Eksik belgeler veya ithalat sorunları fiyatı %15 ila %25 düşürebilir.' },
  { icon: AlertCircle, title: 'Genel durum', body: 'Çizik, pas veya solmuş boya olmayan temiz bir kaporta ve mekanik olarak sağlıklı bir motor, görünür kullanım izleri olan benzer bir arabaya kıyasla piyasa değerine sürekli olarak %10 ila %15 ekler.' },
];

const FAQ_ITEMS = [
  { q: 'İkinci el arabam ne kadar eder?', a: 'Marka, model, yıl, donanım seviyesi, kilometre ve duruma — ayrıca ülkenizde benzer arabaların güncel satış fiyatlarına bağlıdır. Yukarıya bir fotoğraf yükleyip ülkenizi seçerek kendi para biriminizle yapay zeka tahmini alın.' },
  { q: 'İkinci el bir arabanın değerlemesini hangi faktörler etkiler?', a: 'Marka ve model, yıl ve donanım seviyesi, kilometre, kaporta ve mekanik durum, ruhsat ve tescil belgelerinin eksiksizliği, ayrıca kendi piyasanızdaki yerel arz ve talep.' },
  { q: 'Ülkem değerlemeyi etkiler mi?', a: 'Evet — ithalat vergileri, belirli markalara yönelik yerel talep, para biriminin gücü ve piyasa büyüklüğü fiyatları ülkeler arasında değiştirir. Birçok ülkeyi kapsıyoruz ve size küresel bir ortalama yerine kendi yerel para biriminizde fiyat veriyoruz.' },
  { q: 'Satmadan önce arabama nasıl doğru fiyat biçerim?', a: 'Bir sayı elde etmek için ücretsiz yapay zeka değerleme aracımızı kullanın, ardından yerel olarak benzer arabaların aktif ilanlarını kontrol edin. Kabul edeceğiniz en düşük tutarın %5-10 üzerinde fiyatlandırmak genellikle pazarlık payı bırakır.' },
  { q: 'Yapay zeka değerlemesi ne kadar doğru?', a: 'Fotoğraftan arabanızı doğru şekilde belirlemek için bilgisayarlı görü kullanır, ardından seçtiğiniz ülkedeki gerçek ilan verileriyle karşılaştırır. Güvenilir bir başlangıç noktası olarak düşünün, kesin bir fiyat değil — gerçek değer inceleme ve pazarlığa bağlıdır.' },
  { q: 'Araba değerleme aracı ücretsiz mi?', a: 'Evet — ücret yok, hesap oluşturma yok, kullanım sınırı yok.' },
];

export default function ArabamNeKadarEderPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Koyu Hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/araclar" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Geri">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Gezinme yolu" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/ana-sayfa" className="hover:text-white/60 transition-colors">Ana Sayfa</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/araclar" className="hover:text-white/60 transition-colors">Araçlar</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Arabam Ne Kadar Eder</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Yapay Zeka ile · Ücretsiz
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Arabanız<br /><span className="text-amber-400">ne kadar eder?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Bir fotoğraf yükleyin — gerçek ilan verilerine ve yapay zekaya dayalı olarak kendi para biriminizle anında bir piyasa değerlemesi alın.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Fotoğraf analizi</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Türkiye ve dünyanın dört bir yanı</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">%100 Ücretsiz</span>
            </div>
          </div>
        </div>

        {/* ── Değerleme Aracı ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <ArabamNeKadarEderClient />
          </div>
        </div>

        {/* ── SEO İçeriği ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Değeri anlamak</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              İkinci el bir arabanın fiyatını ne belirler?
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
              İkinci el araba değerlemesi: eksiksiz rehber
            </h2>

            <p>Arabanızın gerçek piyasa değerini bilmek, dünyanın her yerinde satışa çıkarmadan, takasa vermeden veya bir satın alma pazarlığı yapmadan önce atılacak en önemli adımdır. Fiyatı çok yüksek belirlemek ilanınızın satılmadan kalmasına neden olur. Çok düşük belirlemek ise gerçek parayı masada bırakmak demektir. Buradaki zorluk, <strong className="text-foreground">&ldquo;piyasa değeri&rdquo;nin tek bir sayı olmamasıdır</strong> — ülkeye, para birimine, belirli bir markaya yönelik yerel talebe ve her arabanın kendi geçmişine ve durumuna göre değişir.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Aynı araba neden ülkeden ülkeye aynı değeri taşımaz</h3>
            <p>Beş yaşında, iyi durumda bir Toyota Corolla, döviz çevrimi yapılmadan önce bile ülkeye göre oldukça farklı bir tutara sahip olabilir. İthalat vergileri ve ikinci el arabalara uygulanan yerel vergiler ülkeden ülkeye büyük farklılık gösterir. Bazı piyasalarda belirli markalara yönelik güçlü bir yerel talep vardır, bu da yeniden satış fiyatlarını yüksek tutar. Diğer piyasalarda daha büyük bir sıfır km araba piyasası, alıcıları ikinci elden uzaklaştırır ve bu da yeniden satış değerini düşürür. Bu yüzden tek, küresel bir fiyat rehberi işe yaramaz — değerleme ülkeye göre kalibre edilmelidir.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kilometre ve bakım geçmişi</h3>
            <p>Neredeyse her piyasada, kilometre ve belgelenmiş bakım geçmişi, bir fotoğrafın gösteremeyeceği kadar arabanın durumunun güvenilir göstergeleridir. Daha düşük kilometreli ve eksiksiz bakım kayıtlı bir araba, aynı yıl model ve daha yüksek kilometreli benzer bir arabaya kıyasla, fotoğrafta benzer görünseler bile genellikle belirgin bir fiyat avantajı elde eder. Eksik veya kayıp bir bakım geçmişi, satıcı olarak pazarlık gücünü kaybetmenin en hızlı yollarından biridir.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Mülkiyet, tescil ve belgeler</h3>
            <p>Kapsadığımız her ülkede, <strong className="text-foreground">eksiksiz ve temiz belgeler en iyi değeri elde etmek için pazarlık konusu değildir</strong>. Alıcılar, haklı olarak, eksik belgeleri, ödenmemiş ithalat vergileri veya eksik tescili olan arabaların değerinden düşerler, çünkü mülkiyet devri sırasında yaşanabilecek sorunların riski her ülkede gerçektir. İlan vermeden önce belge sorunlarını çözmek, genellikle alıcıların aksi takdirde talep edeceği indirimden çok daha ucuza gelir.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Genel durum ve sunum</h3>
            <p>Çizik, pas veya solmuş boya olmayan temiz bir kaporta, mekanik olarak sağlıklı bir motor ve şanzımanla birlikte, araba İstanbul’da, Berlin’de veya başka bir yerde satılsa da, görünür kullanım izleri olan benzer bir arabaya kıyasla fiyatı sürekli olarak yükseltir. Basit ve düşük maliyetli onarımlar (kapsamlı bir temizlik, küçük çiziklerin giderilmesi, yanmış bir ampulün değiştirilmesi) genellikle nihai satış fiyatında kendini kat kat öder.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Para birimi ve piyasa zamanlaması</h3>
            <p>İthal ikinci el arabalara büyük ölçüde bağımlı olan ülkelerde, araba fiyatları döviz kuru hareketleriyle yakından bağlantılıdır — zayıf bir yerel para birimi ithalat maliyetini artırır ve ikinci el fiyatlarını yukarı çeker, daha güçlü bir para birimi ise tersi bir etki yaratır. Bu, bir veya iki yıl önceki bir değerlemenin güncel fiyatlar için güvenilir bir rehber olmayabileceği anlamına gelir. Eski bir fiyat rehberine veya önceki bir sahibinin ödediği tutara güvenmek yerine her zaman güncel piyasa verilerini kontrol edin.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Bu araç nasıl çalışır</h3>
            <p>Arabanızın net bir fotoğrafını yükleyin ve ülkenizi seçin. Yapay zeka (Gemini Vision) fotoğraftan marka, model, yıl ve donanım seviyesini belirler, ardından bunu seçilen piyasadaki gerçek, güncel ilan verileriyle karşılaştırarak size tek bir tahmin yerine kendi para biriminizle bir fiyat aralığı verir. Sonuç, o rakama neden ulaşıldığını anlamanız için değerlemeyi etkileyen belirli faktörleri içerir. Yüz yüze bir incelemenin yerini tutmak için değil, pazarlık için hızlı ve ücretsiz bir başlangıç noktası olması için tasarlanmıştır.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Sıkça sorulan sorular</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              En sık sorulan sorular
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
              Diğer ücretsiz araçlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/araclar" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Tüm araçlar</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/ana-sayfa" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Türkçe Ana Sayfa</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
