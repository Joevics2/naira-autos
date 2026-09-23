import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientTr from '@/components/VINCheckerClientTr';

export const metadata: Metadata = {
  title: 'Şasi Numarası (VIN) Ücretsiz Sorgulama — Marka, Model, Yıl Öğren',
  description: 'Şasi numarasını (VIN) ücretsiz sorgulayın. Marka, model, üretim yılı, motor ve üretici ülke anında görüntülenir — üyelik gerektirmez. İthal araç alımı öncesi kontrol için.',
  keywords: ['şasi numarası ücretsiz sorgulama', 'vin sorgulama ücretsiz', 'şase numarası nasıl öğrenilir', 'vin kod çözücü ücretsiz', 'ithal araç şasi sorgulama', 'şasi numarası nerede', 'vin numarası kontrol', 'araç şasi numarası doğrulama', 'amerikan araç şasi sorgulama', 'vin şase aynı mı'],
  alternates: {
    canonical: 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      ja: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      it: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
      tr: 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Şasi Numarası (VIN) Ücretsiz Sorgulama | Naira Autos',
    description: 'Herhangi bir aracın marka, model, üretim yılı, motor ve menşe bilgisini şasi numarasından ücretsiz ve anında öğrenin.',
    url: 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama',
      name: 'Şasi Numarası (VIN) Ücretsiz Sorgulama — Marka, Model, Yıl Öğren',
      description: 'Şasi numarasını (VIN) ücretsiz sorgulayın — marka, model, üretim yılı, motor ve üretici ülke.',
      url: 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama',
      inLanguage: 'tr',
      dateModified: '2026-09-23',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.naira.autos/ana-sayfa' },
        { '@type': 'ListItem', position: 2, name: 'Araçlar', item: 'https://www.naira.autos/araclar' },
        { '@type': 'ListItem', position: 3, name: 'Şasi Numarası Sorgulama', item: 'https://www.naira.autos/araclar/sasi-numarasi-sorgulama' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Aracın şasi numarası (VIN) nedir?', acceptedAnswer: { '@type': 'Answer', text: 'Şasi numarası, uluslararası adıyla VIN (Vehicle Identification Number), her aracın üretim sırasında aldığı benzersiz 17 karakterlik bir koddur. Üretici ülke, marka, araç tipi, motor, model yılı, montaj fabrikası ve benzersiz bir seri numarası içerir. Türkiye\'de ruhsatta ve genellikle motor bölmesinde veya ön camın sol alt köşesinde yer alır.' } },
        { '@type': 'Question', name: 'Şasi numarasını ücretsiz nasıl sorgularım?', acceptedAnswer: { '@type': 'Answer', text: 'Yukarıdaki alana 17 haneli şasi numarasını girin ve "Çözümle" butonuna tıklayın. Ücretsiz çözümleyicimiz, ABD Ulusal Karayolu Trafik Güvenliği İdaresi\'nin (NHTSA) herkese açık veri tabanını kullanarak marka, model, üretim yılı, motor özellikleri, vites tipi ve üretim fabrikasını gösterir — tamamen ücretsiz, üyelik gerektirmeden, herhangi bir ülkeden.' } },
        { '@type': 'Question', name: 'Şasi numarası araçta nerede bulunur?', acceptedAnswer: { '@type': 'Answer', text: 'Şasi numarası üç noktada bulunur: ön camdan görülebilen sürücü tarafındaki gösterge paneli, sürücü kapısının çerçevesindeki etiket ve motor bölmesinde şasiye kazınmış hâli. Ayrıca ruhsatta da belirtilir. Bu üç nokta birbiriyle tam olarak eşleşmelidir.' } },
        { '@type': 'Question', name: 'VIN ile şasi numarası aynı şey mi?', acceptedAnswer: { '@type': 'Answer', text: 'Evet, tamamen aynı 17 haneli koddur. VIN (Vehicle Identification Number) uluslararası terim, "şasi numarası" veya "şase numarası" ise Türkçedeki günlük kullanım şeklidir. İkisi de aynı, üretimde araca işlenen kimlik kodunu ifade eder.' } },
        { '@type': 'Question', name: 'Bu araç ABD\'den ithal edilen araçlar için de çalışır mı?', acceptedAnswer: { '@type': 'Answer', text: 'Evet — en yaygın kullanım senaryosu tam olarak budur. ABD, Kanada veya Meksika pazarı için üretilmiş araçlar sorunsuz şekilde çözümlenir; bu da Türkiye\'ye ve Kuzey Kıbrıs\'a ithal edilen birçok pikap ve klasik Amerikan otomobilini kapsar. Yalnızca Avrupa pazarı için üretilmiş araçlar genellikle NHTSA veri tabanında yer almaz; bu durumda ruhsat üzerindeki bilgiler ve TÜVTÜRK kayıtları başvurulacak kaynaktır.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Şasi Numarası (VIN) Ücretsiz Sorgulama', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function SasiNumarasiSorgulamaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/araclar" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Geri">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/ana-sayfa" className="hover:text-white/60 transition-colors">Ana Sayfa</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/araclar" className="hover:text-white/60 transition-colors">Araçlar</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Şasi Numarası Sorgulama</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">%100 Ücretsiz</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NHTSA Verisi</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Şasi Numarası (VIN)<br /><span className="text-blue-400">Ücretsiz ve Anında Sorgula</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Şasi numarasından araç bilgilerini saniyeler içinde öğrenin.</p>
            <p className="text-white/75 text-sm leading-relaxed">Gösterge paneli, kapı veya şasi üzerindeki 17 haneli şasi numarasını girin. Marka, model, üretim yılı, motor özellikleri ve üretici ülke bilgisini ücretsiz ve üyelik gerektirmeden görün. Türkiye'ye veya Kuzey Kıbrıs'a ithal edilen bir araç alırken kontrol için idealdir.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientTr />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Her İkinci El Araç İçin Ücretsiz Şasi Numarası Sorgulama</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Ücretsiz şasi numarası çözümleyicimiz</strong>, ABD Ulusal Karayolu Trafik Güvenliği İdaresi'nin (NHTSA) herkese açık veri tabanını kullanır. <strong className="text-foreground">Ücretsiz sorgulama</strong> size marka, model, üretim yılı, motor özellikleri, vites tipi, kasa tipi ve montaj fabrikasını verir — ikinci el bir aracın gerçekten anlatıldığı araç olup olmadığını satın almadan önce doğrulamak için gereken her şey.</p>
                  <p>İkinci el araç piyasası giderek daha uluslararası bir hâl alıyor. ABD, Kanada veya Meksika için üretilen araçlar sürekli ihraç ediliyor ve yeniden tescil ediliyor — Türkiye'ye ithal edilen bir pikap ya da Kuzey Kıbrıs'ta satılan bir klasik Amerikan otomobili buna örnek. Şasi numarası fabrikada kazındığı ve hiçbir zaman değişmediği için, ücretsiz bir sorgulama aracın nereye gittiğinden bağımsız olarak aynı şekilde çalışır — tek şart, aracın aslen Kuzey Amerika pazarı için üretilmiş olmasıdır.</p>
                  <p>Buradaki temel nokta şu: şasi numarası, ülkenizin verdiği bir plaka değildir — aracın fabrikadan çıkmasından çok önce, üretim hattında işlenen bir üretim kimliğidir. Araç ihraç edilse, yeniden tescil edilse, yeni plaka alsa veya birkaç kez el değiştirse bile bu numara değişmez. Bu yüzden ücretsiz bir şasi numarası sorgulaması, bir plakanın asla yapamayacağı şekilde, aracı sınırlar ötesinde takip edebilir.</p>
                  <p>Çoğu kişi şasi numarasını fiyat pazarlığı bittikten sonra sorgular — ama doğrusu, aracı görmeye gitmeden önce, herhangi bir kapora vermeden önce ve teslimden sonra bir kez daha — teslimat sırasında hiçbir şeyin değiştirilmediğinden emin olmak için — sorgulamaktır. Hiçbir maliyeti yoktur ve bir dakikadan az sürer.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Türkiye ve Kuzey Kıbrıs'ta Şasi Numarası Kontrolü</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Türkiye</strong> — şasi numarası ruhsatta yer alır ve TÜVTÜRK muayenesinde araç üzerindeki numarayla karşılaştırılır. ABD'den ithal edilen araçların — özellikle pikap ve klasik Amerikan otomobillerinin — önemli bir kısmı aslen Kuzey Amerika için üretildiğinden, bu ücretsiz sorgulama noter işlemlerine gitmeden önce güvenilir sonuçlar verir.</p>
                  <p><strong className="text-foreground">Kuzey Kıbrıs (KKTC)</strong> — araç parkı büyük ölçüde ithal araçlara dayanır ve ABD kökenli araçlar burada da yaygındır. Gümrük işlemleri ve tescil öncesinde şasi numarasını ücretsiz olarak doğrulamak, ilerleyen aşamalarda karşılaşılabilecek belge veya eşleşme sorunlarını önceden fark etmenin en ucuz yoludur.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>İthal Bir Araç mı Alıyorsunuz? Önce Bunu Yapın</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>İthal bir araç satın almak, yerel bir alımda olmayan ek bir risk taşır: belgeler, satıcı ve aracın gerçek durumu hiç gitmediğiniz bir ülkeden gelmiş olabilir. Ücretsiz şasi numarası sorgulaması bir ekspertiz yerine geçmez, ancak devam etmeden önce hiçbir maliyeti olmayan en ucuz ilk filtredir.</p>
                  <p>Önce şasi numarasını çözümleyin ve sonucu — üretim yılı, model, motor, donanım — satıcının belirttikleriyle tam olarak karşılaştırın. Burada ortaya çıkan en küçük bir fark bile, örneğin yanlış bir motor bilgisi, ilandaki fotoğraflarla gerçek belgelerin aynı araca ait olmadığının ilk işareti olabilir. Ardından, gösterge panelindeki numaranın şasiye kazınmış olanla ve kapı etiketiyle fiziksel olarak eşleştiğini kontrol edin; bu üç nokta arasındaki bir tutarsızlık, değiştirilmiş bir şasi numarasının en net işaretlerinden biridir.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Şasi Numarası mı VIN mi — Aynı Şey mi?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Evet, ikisi de tamamen aynı 17 haneli koddur. <strong className="text-foreground">VIN</strong> (Vehicle Identification Number) uluslararası terimdir; <strong className="text-foreground">şasi numarası</strong> veya <strong className="text-foreground">şase numarası</strong> ise Türkçede günlük kullanımda tercih edilen ifadelerdir. İlk üç hane üretici ve üretim ülkesini, dokuzuncu hane ise matematiksel olarak hesaplanan bir kontrol hanesini gösterir.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Şasi Numarası Nasıl Okunur: Her Bölüm Ne Anlama Gelir</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17 hane rastgele değildir. 1-3. haneler üreticiyi ve üretim ülkesini belirler — çözümleyici bu sayede bir aracın ABD, Kanada veya Meksika'da üretilip üretilmediğini anlar. 4-8. haneler aracı tanımlar: kasa tipi, motor ve seri. 9. hane, yanlış yazılmış veya değiştirilmiş bir şasi numarasını tespit etmek için matematiksel olarak hesaplanan bir kontrol hanesidir. 10. hane model yılını kodlar, 12-17. haneler ise aracın benzersiz üretim numarasını oluşturur.</p>
                  <p>Bu bölümleri kendiniz okuyabilmek, elinizde hazır bir çözümleyici olsa bile faydalıdır, çünkü sonucu saniyeler içinde doğrulamanızı sağlar. 10. hane 2015 model gösteriyorsa ancak satıcı aracı 2018 model olarak sunmuşsa, doğrudan sormak mantıklıdır — bu bir suçlama değil, hiçbir maliyeti olmayan ve otuz saniye süren bir doğrulamadır.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Tüm Markalar İçin Çalışır — Ford, Toyota, Honda, Chevrolet ve Daha Fazlası</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Bu, tek bir markaya özel bir araç değildir. NHTSA'nın üretici veri tabanından doğrudan okuduğu için aynı çözümleyici; Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai ve Kuzey Amerika pazarında satılan diğer tüm markalar için çalışır. 17 haneli kodu yapıştırmanız yeterli — çözümleyici, markayı belirtmenize gerek kalmadan doğru üretici şemasını otomatik olarak tanır.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Şasi Numarası Sorgulama vs Tam Araç Geçmişi Raporu</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Ücretsiz şasi numarası sorgulaması</strong> size aracın fabrikadan çıktığı hâlini — yani üretim özelliklerini — gösterir. Bundan sonra ne olduğunu — kaza geçmişi, değiştirilmiş kilometre, pert veya sel kaydı — öğrenmek için Carfax veya AutoCheck gibi ücretli bir <strong className="text-foreground">araç geçmişi raporu</strong> gerekir. Değeri yüksek bir ikinci el araç alımında, bu ücretsiz teknik özellik sorgulamasına ek olarak ücretli bir geçmiş raporu kesinlikle tavsiye edilir.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Şasi Numarası Sorgulama — Sık Sorulan Sorular</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Bu sorgulama gerçekten ücretsiz mi?', a: 'Evet. NHTSA\'nın herkese açık API\'sini kullanan %100 ücretsiz bir hizmettir. Hesap veya üyelik gerektirmez. İstediğiniz kadar sorgulama yapabilirsiniz, herhangi bir ülkeden.' },
                { q: 'Aracın şasi numarası ne işe yarar?', a: 'Şasi numarası, belirli bir aracı teknik özelliklerini doğrulamak, geçmişini sorgulamak, tescil işlemleri, sigorta ve geri çağırma bildirimleri için tanımlar. Türkiye\'de ruhsatta yer alır ve her devir işleminde gereklidir.' },
                { q: 'Şasi numarasından teknik özellikleri ücretsiz öğrenebilir miyim?', a: 'Evet. Ücretsiz çözümleyicimiz; ABD, Kanada veya Meksika özelliklerine sahip araçlar için marka, model, üretim yılı, motor, kasa tipi, vites ve menşe bilgisini NHTSA üretici veri tabanından ücretsiz olarak sunar.' },
                { q: 'Türkiye\'ye ithal edilen ABD araçları için çalışır mı?', a: 'Evet, aslen Kuzey Amerika pazarı için üretilmiş herhangi bir araç için — ithal pikap ve klasik otomobil alıcıları arasında yaygın bir durum. Yalnızca Avrupa özelliklerine sahip araçlar görünmeyebilir.' },
                { q: 'Bir şasi numarasının gerçek olup olmadığını nasıl anlarım?', a: 'Geçerli bir şasi numarası tam olarak 17 karakterden oluşur — harfler (A-Z, I, O, Q hariç) ve rakamlar. 9. hane matematiksel bir kontrol hanesidir. Eşleşmiyorsa, numara değiştirilmiş demektir. Bu araç bunu otomatik olarak doğrular.' },
                { q: 'Sorgulama hiçbir sonuç vermezse ne olur?', a: 'Bu genellikle aracın Avrupa, Asya veya başka bir pazara özel üretildiği ve NHTSA veri tabanında yer almadığı anlamına gelir. Yine de model yılı, şasi numarasının 10. hanesinden hesaplanır. Bu durumlarda üreticinin resmi VIN sorgulama hizmetine başvurun.' },
                { q: 'Motor numarası ile şasi numarası aynı şey mi?', a: 'Hayır. Motor numarası motor bloğunun üzerine kazınır ve yalnızca o motoru tanımlar; şasi numarası ise aracın tamamını tanımlar. Bu araç şasi numarasını çözümler, ayrı olan motor numarasını değil.' },
                { q: 'Şasi numarası gümrük vergisini etkiler mi?', a: 'Dolaylı olarak evet. Birçok ülke ithalat vergisini aracın yaşı ve motor hacmine göre hesaplar; her ikisi de şasi numarasından doğrulanır. Vergiyi hesaplamadan önce doğru çözümleme yapmak, yanlış rakamlarla plan yapmayı önler.' },
                { q: 'Şasi numarası sorgulaması aracın kaza geçmişini gösterir mi?', a: 'Hayır. Ücretsiz sorgulama yalnızca üretim özelliklerini gösterir — marka, model, üretim yılı, motor ve menşe. Kaza geçmişi, kilometre bilgisi ve pert kaydı için Carfax veya AutoCheck gibi ücretli bir rapor gerekir.' },
                { q: 'Şasi numarasından bir aracın çalıntı olup olmadığını öğrenebilir miyim?', a: 'Bu araçla hayır. Çalıntı araç sorgusu emniyet birimleri ve sigorta şirketlerinin işidir — ABD\'deki NICB (Sigorta Suçları Bürosu) bu amaçla VINCheck adında ücretsiz bir araç sunar; bu, teknik özellik çözümleyicisinden farklı bir hizmettir.' },
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

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Diğer Ücretsiz Araçlar
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/araclar/arabam-ne-kadar-eder" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Arabam Ne Kadar Eder?</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/strumenti/verifica-numero-di-telaio" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Verifica Telaio (Italiano)</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
              <Link href="/werkzeuge/fahrgestellnummer-pruefen" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Fahrgestellnummer (Deutsch)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">VIN Checker (English)</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
