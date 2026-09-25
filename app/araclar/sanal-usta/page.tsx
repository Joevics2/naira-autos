import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientTR from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Yapay Zeka ile Sanal Usta — Ücretsiz Online Araba Arıza Teşhisi | Naira Autos',
  description: 'Yapay zeka destekli ücretsiz sanal usta. Arızayı anlat, fotoğraf, ses veya video yükle, saniyeler içinde teşhis ve tamir maliyeti tahmini al. Kayıt gerekmez.',
  alternates: {
    canonical: 'https://www.naira.autos/araclar/sanal-usta',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'it': 'https://www.naira.autos/strumenti/meccanico-virtuale',
      'nl': 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      'tr': 'https://www.naira.autos/araclar/sanal-usta',
      'vi': 'https://www.naira.autos/cong-cu/tho-may-ao',
      'id': 'https://www.naira.autos/alat/montir-virtual',
      'th': 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Ücretsiz Yapay Zeka Sanal Usta | Naira Autos',
    description: 'Nerede olursan ol, saniyeler içinde online araba teşhisi. Motor sesi, fotoğraf yükle ya da arızayı anlat. Aciliyet seviyesi, olası nedenler, sonraki adımlar ve tamir maliyeti al. Ücretsiz, kayıt gerekmez.',
    url: 'https://www.naira.autos/araclar/sanal-usta',
    locale: 'tr',
    type: 'website',
  },
  keywords: ['sanal usta', 'ücretsiz online usta', 'online araba arıza teşhisi', 'ücretsiz araba teşhisi', 'arabamda ne sorun var', 'online oto tamirci', 'online ustaya sor', 'araba tamir maliyeti hesapla', 'yapay zeka ustası', 'arabamı online kontrol et', 'motor sesi teşhisi', 'araba tamir maliyeti tahmini'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/araclar/sanal-usta',
      name: 'Yapay Zeka ile Sanal Usta — Ücretsiz Online Araba Arıza Teşhisi',
      description: 'Yapay zeka destekli ücretsiz sanal usta. Motor sesi, fotoğraf yükle, ya da arızayı anlat. Saniyeler içinde aciliyet seviyesi ve tamir maliyeti ile teşhis al.',
      url: 'https://www.naira.autos/araclar/sanal-usta',
      inLanguage: 'tr',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://www.naira.autos/ana-sayfa' },
          { '@type': 'ListItem', position: 2, name: 'Araçlar', item: 'https://www.naira.autos/araclar' },
          { '@type': 'ListItem', position: 3, name: 'Yapay Zeka Ustası', item: 'https://www.naira.autos/araclar/sanal-usta' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Sanal usta nedir ve nasıl çalışır?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sanal usta, arabandaki arızaları uzaktan teşhis etmek için yapay zeka kullanan bir araçtır. Sorunu anlatırsın, istersen fotoğraf, ses veya video yüklersin, yapay zeka her şeyi devasa bir bilinen arıza kalıpları veritabanıyla karşılaştırarak sana aciliyet seviyesi ve tahmini tamir maliyeti içeren bir teşhis sunar.' },
        },
        {
          '@type': 'Question',
          name: 'Yapay zeka arabamı sadece motor sesinden teşhis edebilir mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Vuruntu, cızırtı ya da sürtünme sesini kaydet — telefonunla 10 saniye bile yeterli. Yapay zeka ses kalıbını analiz ederek örneğin aşınmış rulmanlar, yıpranmış fren balataları ya da başka bir spesifik arızayı belirleyebilir.' },
        },
        {
          '@type': 'Question',
          name: 'Ücretsiz mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Tamamen ücretsiz — kayıt yok, abonelik yok, ödeme yok. Sayfaya gir ve hemen teşhise başla.' },
        },
        {
          '@type': 'Question',
          name: 'Yapay zeka teşhisi her zaman doğru mu?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hayır — her zaman %100 doğru değil. Verdiğin açıklama, fotoğraf, ses ya da videoya dayalı iyi bir başlangıç noktasıdır, ama sadece köprü ve tarayıcıyla yapılan fiziksel muayenede görülebilecek şeyleri kaçırabilir. Bunu kesin cevap değil, ilk görüş olarak değerlendir ve fren, direksiyon ya da yakıt arızalarında teşhis ne derse desin her zaman yüz yüze yetkili bir ustaya görün.' },
        },
        {
          '@type': 'Question',
          name: 'BMW, Mercedes, Toyota ya da başka bir markayla çalışıyor mu?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. BMW, Mercedes, Toyota ya da başka bir markanın arızasını sor — yapay zeka tüm büyük üreticileri kapsıyor. Tamir maliyeti Nijerya piyasasına göre kalibre edilmiştir; başka bir ülkedeysen genel bir referans olarak kullan, kesin yerel rakam olarak değil.' },
        },
        {
          '@type': 'Question',
          name: 'Bu, bir WhatsApp grubunda ya da araba forumunda sormakla aynı şey mi?',
          acceptedAnswer: { '@type': 'Answer', text: 'Birçok açıdan daha iyi. Bir forumda ya da WhatsApp grubunda tek bir kişinin, metin açıklamana dayanan görüşünü alırsın. Sanal ustamız açıklamanı yüklediğin fotoğraf, ses ya da videoyla birlikte analiz eder, binlerce bilinen arıza kalıbıyla karşılaştırır ve olasılığa göre sıralanmış, güven düzeyi içeren bir teşhis sunar.' },
        },
        {
          '@type': 'Question',
          name: 'Konuşma geçmişim sunucularınızda saklanıyor mu?',
          acceptedAnswer: { '@type': 'Answer', text: 'Hayır. Tüm geçmiş sadece kendi cihazında, tarayıcının yerel depolamasını kullanarak saklanır. Teşhis için gönderdiğin aktif mesaj dışında sunucularımızda hiçbir şey tutmuyoruz. Geçmişini istediğin zaman yan menüden silebilirsin.' },
        },
        {
          '@type': 'Question',
          name: 'Her araba markası için tamir maliyeti alabilir miyim?',
          acceptedAnswer: { '@type': 'Answer', text: 'Evet. Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot ve nerede sürersen sür diğer tüm büyük markaları kapsıyoruz. Maliyetler yaklaşık bir uluslararası referanstır.' },
        },
        {
          '@type': 'Question',
          name: 'Yakınımda seyyar bir usta ya da tamirhane gerekirse ne yapmalıyım?',
          acceptedAnswer: { '@type': 'Answer', text: 'Aracımız önce sorunu teşhis eder, böylece aramaya başlamadan önce tam olarak ne istemen gerektiğini bilirsin. Arıza fiziksel muayene ya da özel ekipman gerektiriyorsa, bunu açıkça belirtiriz.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Yapay Zeka ile Sanal Usta',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Yapay zeka destekli ücretsiz sanal usta. Arızayı anlat, motor sesi ya da fotoğraf yükle, Nijerya piyasasına göre kalibre edilmiş tamir maliyetiyle saniyeler içinde teşhis al.',
      url: 'https://www.naira.autos/araclar/sanal-usta',
      inLanguage: 'tr',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageTR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientTR />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Son kontrol: Ağustos 2026</p>

          {/* Tam Kapsam */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Tam Kapsam</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Sanal Ustamız Neler Sunuyor?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              İster hızlı bir tamir maliyeti tahmini gerekiyor olsun, ister tamirhaneye gitmeden önce online bir ustaya sormak isteyin, ister arabanı tamir ettirmenin ne kadar tutacağını hesaplamak isteyin — bu araç hepsini ücretsiz karşılıyor.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Motor Arızası Teşhisi', desc: 'Vuruntu, ateşleme arızası, düzensiz rölanti, aşırı ısınma, motor arıza lambaları — yapay zeka olasılığa göre sıralanmış en muhtemel nedenleri belirler.' },
                { title: 'Ses ve Audio Analizi', desc: 'Vuruntu, cızırtı ya da sürtünme sesinin kaydını yükle. Yapay zeka arızayı belirlemek için ses kalıbını analiz eder.' },
                { title: 'Anında Aciliyet Seviyesi', desc: 'Her teşhis, dört net seviyeli bir karar içerir: Sürüş İçin Güvenli, Yakından İzle, Yakında Bir Ustaya Görün, ya da Şimdi Sürmeyi Bırak.' },
                { title: 'Online Tamir Maliyeti', desc: 'Maliyet, referans olarak Nijerya piyasasına göre kalibre edilmiştir — parça ve işçilik gerçek maliyeti ülkeye ve şehre göre değişir. Bunu başlangıç noktası olarak kullan, sonra yerel bir fiyat teklifi al.' },
                { title: 'Kendin Yapabileceğin Adımlar', desc: 'Arıza kendin kontrol edebileceğin ya da tamir edebileceğin bir şeyse, bir ustaya para harcamadan önce nasıl yapacağını tam olarak söyleriz.' },
                { title: 'Devam Eden Konuşma', desc: 'Takip soruları sor, tam bağlamla yanıt al. Her oturum cihazında saklanır.' },
                { title: 'Her Marka İçin Destek', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot ve her marka, her piyasa.' },
                { title: 'Fotoğraf ve Video ile Teşhis', desc: 'Gösterge panelindeki uyarı lambalarının, sıra dışı bir sıvı sızıntısının ya da görünür hasarın fotoğrafını gönder. Her ek medya, teşhisin güvenilirliğini önemli ölçüde artırır.' },
                { title: 'Parça Tanımlama', desc: 'Her teşhis, muhtemelen ilgili spesifik parçaları içerir, böylece herhangi bir tamirhane ya da yedek parça mağazasında tam olarak ne isteyeceğini bilirsin.' },
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
                Yapay zeka ile sanal usta nedir?
              </h2>
              <p className="mb-3">Bir <strong className="text-foreground">sanal usta</strong>, tam olarak kulağa geldiği gibidir: yüz yüze yerine metin, fotoğraf, ses ya da video ile konuştuğun bir ustadır. Arabana ne olduğunu anlatırsın — soğuk çalıştırmada duyulan o garip vuruntu, sönmeyen motor arıza lambası, yumuşak hissettiren frenler — ve saniyeler içinde gerçek araba arızalarına dair derin bilgiye dayanan bir yanıt alırsın.</p>
              <p>Yapay zeka ustamız Axion, her markayla ve her ülkede çalışır, ama Nijerya'da sürenler için ekstra bir avantajı vardır: bozuk yakıtın enjektörleri nasıl etkilediğini, tropik sıcaklığın lastik contaları nasıl daha hızlı aşındırdığını ve yoldaki çukurların süspansiyonu diğer piyasalara göre nasıl daha hızlı hasara uğrattığını anlar.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Bir dakikadan kısa sürede araba teşhisi nasıl alınır
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Arızayı anlat.</strong> Ne olduğunu yaz — ne kadar detaylı olursa o kadar iyi. Ne zaman başladı? Sadece soğukken mi, gaz verirken mi, direksiyon çevrilirken mi oluyor?</p>
                <p><strong className="text-foreground">2. Fotoğraf, ses ya da video yükle (opsiyonel, ama çok yardımcı olur).</strong> Motor sesinin 10 saniyelik bir kaydı, genellikle koca bir paragraf açıklamadan daha faydalıdır.</p>
                <p><strong className="text-foreground">3. Anında teşhisini al.</strong> Aciliyet seviyesi, olasılığa göre sıralanmış olası nedenler, kendin kontrol edebileceklerin ve bir tamir maliyeti tahmini.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Tamir maliyeti: fazla ödemeyi önle
              </h2>
              <p className="mb-3">Bir tamirhanede fazla ödemenin en yaygın yollarından biri, tamirin ne kadar tutması gerektiğini bilmeden gitmektir. Herhangi bir tamirhaneye gitmeden önce, adil bir fiyatın ne olduğunu bilmek için <strong className="text-foreground">tamir maliyeti</strong> tahminimizi kullan — parça ve işçilik açıkça ayrıştırılmış olarak.</p>
              <p>Tahmin, spesifik aracını — marka, model, yıl — ve açıklamana göre en muhtemel arızayı dikkate alır. Genel bir sayı değildir: düşük yağ basıncı gösteren 180.000 km'deki 2010 model bir Camry, aynı lambayı gösteren 40.000 km'deki 2020 model bir Camry'den farklı bir tahmin alır, çünkü muhtemel neden farklıdır.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Her markayla çalışır: Toyota, BMW, Mercedes, Honda ve daha fazlası
              </h2>
              <p className="mb-3">Ne sürdüğün önemli değil. Yapay zekanın her üretici için spesifik arıza kalıpları var — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen ve bugün yolda olan neredeyse her marka. Marka, model ve yılı bir kez ver, teşhis her arabaya eşit derecede uygulanabilecek genel bir yanıt yerine, o spesifik araçta, o kilometrede bilinen arızalara göre uyarlanır.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Motor sesiyle teşhis neden her şeyi değiştirir
              </h2>
              <p className="mb-3">Açıklamalar özneldir — "garip bir ses" herkes için farklı bir şey ifade eder. Ses öyle değildir. Soğuk çalıştırmada bir vuruntu sesi, fren yaparken bir cızırtıdan farklı gelir, o da direksiyon çevrilirken bir sürtünme sesinden farklı gelir. 10 saniyelik bir kayıt yükleyerek, yapay zeka sana sadece metinle mümkün olandan çok daha isabetli bir teşhis verir.</p>
              <p>Profesyonel ekipman kullanmana gerek yok. Telefonunun mikrofonu yeterli — motoru çalıştırırken sadece ses kaynağına yakın tut ve kaydı yükle.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Desteklenen Araçlar</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Kamyonlar', 'Otobüsler', 'Motosikletler'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Önemli Bilgiler</h3>
              <ul className="space-y-2.5">
                {[
                  '%100 ücretsiz — abonelik yok',
                  'Hesap ya da kayıt gerekmez',
                  'Mobil ve bilgisayarda çalışır',
                  'Uluslararası referans tamir maliyeti',
                  '7/24 kullanılabilir — pazar günleri dahil',
                  'Konuşma geçmişi yerel olarak saklanır',
                  'Sınırsız takip sorusu',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Naira Autos'ta Ayrıca</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Ücretsiz araba değerleme', href: '/evaluate-car' },
                  { label: 'Motor Sesi Analiz Aracı', href: '/tools/engine-sound-analyzer' },
                  { label: 'Gümrük Vergisi Hesaplayıcı', href: '/tools/import-duty-calculator' },
                  { label: 'Belge Kontrol Listesi', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* Ek Zeka */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Ek Zeka</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Yerel Yol Koşullarına Göre de Ayarlandı
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Nerede sürersen sür teşhis aynı şekilde çalışır. Ama çoğu sanal usta aracı sadece batılı tamirhane verileriyle eğitilmiştir — Nijerya'da bozuk yakıtın yağ viskozitesini üreticinin beklediğinden %40 daha hızlı düşürdüğünü ya da Lagos sokaklarının 150.000 km dayanması gereken bir homokinetik mafsalı 30.000 km'de yok edebildiğini bilmezler.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion bunu da biliyor. Toyota Corolla'nın yakıt aldıktan sonraki vuruntusunu sor, Nijerya'daysan önce bozuk yakıtı düşünür — çünkü orada istatistiksel olarak en muhtemel neden budur.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Yakıt Bozulması', desc: 'Bozuk yakıtın vuruntu sensörlerini, enjektörleri ve yağ viskozitesini nasıl etkilediğini anlar.' },
                  { title: 'Tropik Sıcaklık Etkileri', desc: 'Lastik contaların aşınmasını hızlandıran 35°C+ ortam sıcaklıklarını dikkate alır.' },
                  { title: 'Çukur Hasarı', desc: 'Bozuk yollara özgü süspansiyon ve lastik arıza kalıplarını tanır.' },
                  { title: 'Yerel Parça Fiyatları', desc: 'Maliyet tahminleri, parça piyasaları ve kayıtlı tamirhanelerden gelen verilerle hesaplanır.' },
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

          {/* Karşılaştırma */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Karşılaştırma</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Sanal Usta ve Diğer Seçenekler
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Özellik</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Yapay Zeka Ustası</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Tamirhane Ziyareti</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Grup/Forum</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['7/24 kullanılabilir', 'Evet', 'Hayır', 'Bazen'],
                    ['Ücretsiz', 'Evet', 'Hayır', 'Evet'],
                    ['Seyahat gerektirmez', 'Evet', 'Hayır', 'Evet'],
                    ['Maliyet tahmini', 'Evet', 'Değişken', 'Hayır'],
                    ['Ses/video analiz eder', 'Evet', 'Evet', 'Hayır'],
                    ['Anında yanıt', 'Evet', 'Hayır', 'Bazen'],
                    ['Tutarlı kalite', 'Evet', 'Değişken', 'Hayır'],
                    ['Geçmişi saklar', 'Evet', 'Hayır', 'Hayır'],
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

          {/* SSS */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Sıkça Sorulan Sorular</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Sıkça Sorulan Sorular
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Sanal usta nedir ve nasıl çalışır?', a: 'Arabandaki arızaları uzaktan teşhis etmek için yapay zeka kullanan bir araçtır. Sorunu anlatırsın, opsiyonel medya yüklersin, yapay zeka her şeyi Nijerya piyasasına göre kalibre edilmiş maliyetlerle devasa bir bilinen arıza veritabanıyla karşılaştırır.' },
                { q: 'Yapay zeka teşhisi her zaman doğru mu?', a: 'Hayır — her zaman %100 doğru değil. İyi bir başlangıç noktasıdır, ama sadece köprü ve tarayıcıyla yapılan fiziksel muayenede görülebilecek şeyleri kaçırabilir. İlk görüş olarak değerlendir, fren, direksiyon ya da yakıt arızalarında her zaman yüz yüze bir ustaya görün.' },
                { q: 'BMW, Mercedes, Toyota ya da başka bir markayla çalışıyor mu?', a: 'Evet. Herhangi bir markayı sor — yapay zeka tüm büyük üreticileri kapsıyor. Maliyet Nijerya piyasasına göre kalibre edilmiştir; başka ülkelerde genel bir referans olarak kullan.' },
                { q: 'Bu, bir WhatsApp grubunda sormakla aynı şey mi?', a: 'Birçok açıdan daha iyi. Bir forumda tek bir kişinin görüşünü alırsın. Hizmetimiz açıklamanı fotoğraf, ses ya da videoyla birlikte analiz eder, binlerce arıza kalıbıyla karşılaştırır ve güven düzeyi içeren sıralı bir teşhis sunar.' },
                { q: 'Arabamı sadece motor sesinden teşhis edebilir mi?', a: 'Evet. Ses en güçlü girdilerimizden biridir. Vuruntu, cızırtı ya da sürtünme sesinin kaydını yükle — telefonunla 10 saniye bile yeterli. Yapay zeka muhtemel arızayı belirlemek için ses kalıbını analiz eder.' },
                { q: 'Hesap oluşturmam ya da giriş yapmam gerekiyor mu?', a: 'Hayır. Yapay Zeka Ustası tamamen ücretsizdir ve hesap, kayıt ya da kişisel bilgi gerektirmez. Araç bilgilerin yerel olarak cihazında saklanır.' },
                { q: 'Geçmişim sunucularınızda saklanıyor mu?', a: 'Hayır. Tüm geçmiş sadece cihazında tarayıcının yerel depolaması aracılığıyla saklanır. Aktif mesaj dışında sunucularımızda hiçbir şey tutmuyoruz.' },
                { q: 'Tamir maliyeti tahmini ne kadar doğru?', a: 'Referans olarak Lagos, Abuja ve Port Harcourt\'taki tamirhanelerde parça ve işçilik dahil Nijerya piyasası verilerine dayanır. Ne kadarın makul olduğunu bilmen için bir aralık (minimum-maksimum) veririz. Bir tamirhane maksimumumuzun çok üzerinde bir fiyat teklif ederse, araştırmaya değer.' },
                { q: 'Her araba markası için tamir maliyeti alabilir miyim?', a: 'Evet. Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot ve nerede sürersen sür diğer tüm büyük markaları kapsıyoruz. Maliyetler yaklaşık bir uluslararası referanstır.' },
                { q: 'Yakınımda seyyar bir usta ya da tamirhane gerekirse ne yapmalıyım?', a: 'Aracımız önce sorunu teşhis eder, böylece aramaya başlamadan önce tam olarak ne istemen gerektiğini bilirsin. Arıza fiziksel muayene ya da özel ekipman gerektiriyorsa, bunu açıkça belirtiriz — ve hangi tür usta ya da tamirhane arayacağını söyleriz.' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link> tarafından incelendi, Oto Tamircisi. Teşhis mantığı ve tamir maliyeti aralıkları teknik doğruluk açısından kontrol edilmiştir.
          </p>

          {/* Son CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Hazır mısın? Arabanı Şimdi Teşhis Et.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Ücretsiz. Anında. Kayıt gerekmez. Teşhisini şimdi al.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Ücretsiz Teşhise Başla
            </a>
          </section>

          {/* Daha Fazla Araç */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Daha Fazla Ücretsiz Araç
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Şasi Numarası Sorgulama',  color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Belge Kontrol Listesi',     color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Gümrük Vergisi Hesaplayıcı',color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
