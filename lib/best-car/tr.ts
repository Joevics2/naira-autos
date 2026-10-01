// lib/best-car/tr.ts — Turkish strings for "Size En İyi Araba" (/araclar/size-en-iyi-araba)
import type { BestCarStrings } from '@/lib/best-car/types';

export const tr: BestCarStrings = {
  lang: 'tr',
  locale: 'tr-TR',
  dir: 'ltr',
  latin: true,

  path: '/araclar/size-en-iyi-araba',
  homePath: '/ana-sayfa',
  hubPath: '/araclar',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/araclar/arabam-ne-kadar-eder',

  defaultCountry: 'tr',
  priorityCountries: ['tr', 'de', 'nl', 'be', 'fr', 'at', 'gb', 'us'],
  picksCountry: 'tr',

  nav: { home: 'Ana Sayfa', tools: 'Araçlar', current: 'Size En İyi Araba', back: 'Araçlara Dön', breadcrumb: 'Gezinti yolu' },

  meta: {
    title: 'Size En İyi Araba 2026 — Kullanıma Göre Araba Danışmanı, {countries} Ülke',
    description:
      'İhtiyacınıza en uygun arabayı bulun; {countries} ülkede kendi para biriminizle tahmini fiyatlar. Kullanımınızı seçin — aile arabası, ticari kullanım, otoyol, düşük bütçe, arazi, yönetici, ilk araba veya yakıt tasarrufu — ve {globalCars} model arasından bakım maliyeti, yedek parça ve yakıt tüketimine göre sıralanmış ilk 5’i görün.',
    keywords: [
      'en iyi araba 2026', 'en iyi aile arabası', 'ticari kullanım için en iyi araba', 'araba danışmanı',
      'hangi arabayı almalıyım', 'en iyi suv 2026', 'bakım masrafı düşük araba', 'ilk araba önerisi',
      'otoyol için en iyi araba', 'yönetici arabası', 'en az yakıt tüketen araba', 'araba tavsiyesi',
      'düşük bütçeli araba', 'en iyi arazi aracı', 'türkiye en iyi araba', 'en güvenilir araba',
      'araba alırken dikkat edilecekler', 'naira autos',
    ],
    ogTitle: 'Size En İyi Araba 2026 — Araba Danışmanı | Naira Autos',
    ogDescription: '{countries} ülkede yerel fiyatlarla küresel araba danışmanı. Kullanımınızı seçin; bakım maliyeti, yakıt tüketimi ve yedek parça bulunabilirliğine göre ilk 5’i görün.',
    ogLocale: 'tr_TR',
  },

  hero: {
    badge: 'Ücretsiz Araç',
    verified: 'Fiyatlar kontrol edildi',
    h1: 'Size En İyi Araba',
    intro:
      'Ülkenizi ve kullanımınızı seçin; {countries} ülkede kendi para biriminizle tahmini fiyatlar içeren sıralı araba önerileri alın — bakım maliyeti, yedek parça bulunabilirliği, yakıt tüketimi ve yerden yükseklik üzerinden puanlanır. Toyota Corolla’dan Bugatti Chiron’a {globalCars} model.',
  },

  ui: {
    countryLabel: 'Ülke ve Para Birimi',
    popularCountries: 'Ana pazarlar',
    otherCountries: 'Diğer tüm ülkeler',
    africaNote: 'Bu bölgeye özgü {usedCars} eski ithal ikinci el modeli, {globalCars} küresel modelin yanında içerir.',
    prompt: 'Arabayı ne için istiyorsunuz?',
    rankedBy: 'Sıralama ölçütü:',
    topRecs: 'İlk {n} öneri — {country}',
    emptyState: 'Önerileri görmek için yukarıdan bir kullanım seçin',
    match: 'Uyum',
    electric: 'Elektrikli',
    electricMotor: 'Elektrik motoru',
    seatsFmt: '{n} koltuk',
    bootFmt: '{n} L bagaj',
    consumptionUnit: 'L/100 km',
    showDetails: 'Ayrıntıları gör — sık arızalar ve uyarılar',
    hideDetails: 'Ayrıntıları gizle',
    commonIssues: 'Sık görülen sorunlar:',
    estIn: '{country} için tahmini',
    copyLink: 'Bağlantıyı kopyala',
    linkCopied: 'Bağlantı kopyalandı',
  },

  enums: {
    maintenance: { Low: 'Düşük', Medium: 'Orta', High: 'Yüksek', 'Very High': 'Çok yüksek' },
    spareParts: { Easy: 'Kolay', Moderate: 'Orta', Hard: 'Zor' },
    bodyType: {
      Sedan: 'Sedan', Convertible: 'Cabrio', Coupe: 'Coupe', SUV: 'SUV', Pickup: 'Pikap',
      Hatchback: 'Hatchback', Wagon: 'Station wagon', Minivan: 'Minivan', Bus: 'Otobüs',
    },
    fuelType: { Petrol: 'Benzin', Hybrid: 'Hibrit', 'Petrol Hybrid': 'Benzinli hibrit', Electric: 'Elektrik', Diesel: 'Dizel' },
    transmission: {
      Automatic: 'Otomatik', Manual: 'Manuel', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Tek vitesli', '8-speed DCT': '8 ileri DCT', '2-speed (rear)': '2 vitesli (arka)',
      'Single/2-speed': 'Tek/2 vitesli', 'Single / dual-motor': 'Tek / çift motor',
      'Single-speed (simulated gears)': 'Tek vitesli (simüle vitesler)',
    },
  },

  useCases: {
    family:        { label: 'Aile Arabası', icon: '👨‍👩‍👧‍👦', description: 'Tüm aile için alan, güvenlik ve güvenilirlik', priorities: 'Koltuk · Bagaj · Güvenilirlik · Fiyat', pickTitle: 'En İyi Aile Arabası' },
    commercial:    { label: 'Ticari / Taksi', icon: '🚖', description: 'Günlük yüksek kilometreli ticari kullanım için üretildi', priorities: 'Dayanıklılık · Ucuz parça · Yakıt tasarrufu', pickTitle: 'Ticari Kullanım İçin En İyi' },
    highway:       { label: 'Otoyol ve Uzun Yol', icon: '🛣️', description: 'Uzun yolculuklarda rahat ve stabil', priorities: 'Yakıt tüketimi · Motor gücü · Güvenilirlik', pickTitle: 'Otoyol İçin En İyi' },
    budget:        { label: 'Düşük Bütçe', icon: '💰', description: 'Para kısıtlıyken en iyi değer', priorities: 'Düşük alış fiyatı · Düşük bakım', pickTitle: 'En İyi Bütçe Alımı' },
    offroad:       { label: 'Arazi / Bozuk Yollar', icon: '🪨', description: 'Zor arazi ve bozuk yollar için yüksek yerden yükseklik', priorities: 'Yerden yükseklik · Dayanıklılık · Parça', pickTitle: 'Arazi İçin En İyi' },
    executive:     { label: 'Yönetici / İş', icon: '💼', description: 'Profesyoneller için prestij, konfor ve marka imajı', priorities: 'Prestij · Motor · İşletme maliyeti', pickTitle: 'En İyi Yönetici Arabası' },
    firstcar:      { label: 'İlk Araba', icon: '🎓', description: 'Kullanması kolay, hataları affeden ve bakımı ucuz', priorities: 'Düşük bakım · Kolay parça · Güvenilirlik', pickTitle: 'En İyi İlk Araba' },
    fuelefficient: { label: 'Yakıt / Enerji Tasarrufu', icon: '⛽', description: 'Kilometre başına en düşük işletme maliyeti', priorities: 'Yakıt veya enerji tüketimi · Bakım · Parça', pickTitle: 'En Tasarruflu' },
  },

  seo: {
    reviewedByLabel: 'İnceleyen:',
    reviewer: 'Naira Autos Editör Ekibi',
    updatedLabel: 'İçerik güncellemesi:',
    picksHeading: 'Kullanıma Göre En İyi Arabalar — 2026',
    picksNote:
      'Bu listeler, aracın kendisinin kullandığı puanlamayla, bir referans pazar için oluşturulur. Kesin sıralama ve fiyatlar yukarıda seçtiğiniz ülkeye göre değişir; Afrika ülkeleri için eski ithal ikinci el modeller eklenir.',
    faqHeading: 'Sıkça Sorulan Sorular',
    moreToolsHeading: 'Daha fazla ücretsiz araç',
    disclaimer:
      'Fiyatlar {countries} pazar için tahmindir, teklif değildir. Bakım ve yedek parça değerlendirmeleri editoryal görüşlerdir ve pazara göre değişebilir. Satın almadan önce aracı mutlaka kendiniz inceleyin, geçmişini kontrol edin ve yerel bir teklif alın.',
    sections: [
      {
        h2: 'Araba danışmanı nasıl çalışır',
        paragraphs: [
          '“Size En İyi Araba”, {totalCars} aracı gerçekte nasıl kullanacağınıza göre sıralar. Bir ülke ve bir kullanım seçersiniz — aile, ticari veya taksi, otoyol, düşük bütçe, arazi, yönetici, ilk araba ya da yakıt tasarrufu — araç o pazarda satılan veya sık ithal edilen her modeli puanlar ve en iyi beş modeli gösterir. Her puan 0 ile 100 arasındadır ve yalnızca ölçülebilir etkenleri birleştirir: bakım maliyeti, yedek parça bulunabilirliği, yakıt veya enerji tüketimi, yerden yükseklik, koltuk sayısı, bagaj hacmi, motor hacmi ve alış fiyatı.',
          'Ağırlıklar kullanıma göre değişir. Taksi veya dağıtım aracında bakım ve parça bulunabilirliği puanın %70’ini oluşturur. Arazi arayanlar için yalnızca yerden yükseklik puanın yarısıdır. İlk araba için güvenilirlik ve kolay bulunan parçalar, güçten çok daha önemlidir.',
          'Sıralama her ülkede bilerek aynıdır. Puan, her arabanın ABD doları cinsinden baz fiyatını kullanır; dolayısıyla İstanbul’dan Berlin’e geçmek gördüğünüz fiyatı değiştirir, listenin sırasını değil. Böylece öneri arabanın kendisiyle ilgili kalırken, her sonucun altındaki tahmin para biriminize ve pazarınızın tipik vergi ve harçlarına uyum sağlar. Araç {countries} ülkeyi kapsar: {globalCars} model her yerde karşılaştırılır, Afrika pazarlarında ise {usedCars} ithal ikinci el model eklenir.',
        ],
      },
      {
        h2: 'Teknik özellik sayfasından değil, günlük kullanımdan başlayın',
        paragraphs: [
          'Sizin için en iyi araba, teknik özelliklerden çok **gerçek günlük kullanım biçiminize** bağlıdır. Kâğıt üstünde mükemmel görünen bir araba, onu tanıyan en yakın usta uzaktaysa ya da düşük yerden yükseklik günlük yolunuzu engelli parkura çeviriyorsa kötü bir seçim olabilir.',
          '**Ticari kullanım ve taksi** için yüksek kilometrede güvenilirlik ve kilometre başına düşük parça maliyeti her şeyi belirler. Toyota Corolla ve Toyota Camry birçok ülkede taksi ve dağıtım filolarında sık görülür; çünkü motorları basittir, atlanan bir bakımı bağışlar ve hemen her usta onarabilir.',
          '**Yönetici kullanımında** marka imajı gerçekten önemlidir, ancak işletme maliyetlerinin önüne geçmemelidir. Mercedes-Benz S-Serisi burada bakım açısından “Çok yüksek” derecelendirilmiştir: havalı süspansiyon ve karmaşık elektronik, tek bir onarımı dört haneli bir faturaya dönüştürebilir. Birçok profesyonel için bakımlı, sıradan bir sedan; yüksek kilometreli ve onarım masrafı artan bir lüks arabadan daha iyi sonuç verir.',
          '**İlk araba alanlar** için en önemlisi ustanın modeli tanımasıdır. Arızaları uzman teşhis gerektiren bir araba, daha geç ve daha pahalıya onarılır. 2,5 litrenin altındaki motorlara sahip Toyota ve Honda modelleri, nerede alırsanız alın parça, tamirci ve çevrimiçi tavsiye açısından en geniş ekosisteme sahiptir.',
          '**Aileler** için koltuk ve bagaj önemlidir; ama belki ihtiyacınız olmayan üç sıralı bir SUV’nin fiyatı da öyle. Bu yüzden aile puanı düşük alış fiyatını da ödüllendirir: beş kişilik bir crossover, dört kişilik bir aileye genellikle çok daha büyük bir araç kadar iyi hizmet eder, maliyetin çok küçük bir kısmıyla.',
          '**Arazi ve bozuk yollar** için önce yerden yüksekliğe, sonra çekiş sistemine bakın. Yaklaşık 250 mm, çukurları, su basmış sokakları ve toprak yolları yönetilebilir kılar; 140 mm’lik bir sedan ise dikkatli sürüşle şehirde idare edebilir — ama kasisler ve su baskınları tekrarlayan bir sorun olur.',
        ],
      },
      {
        h2: 'Toplam sahip olma maliyeti etiket fiyatından daha önemlidir',
        paragraphs: [
          'Daha ucuz araba her zaman daha ekonomik seçim değildir. Beş yılda yakıt, bakım, sigorta, lastik ve onarım, alış fiyatına yaklaşabilir; özellikle ithal parçaların geç geldiği pazarlarda. Benzer fiyatlı iki araba, sırf biri milyonlarca başka araçla parça paylaşırken diğeri yalnızca yetkili servisten bulunan bir bileşene ihtiyaç duyduğu için, sahip olma maliyetinde binlerce dolar farklı olabilir.',
          'Her sonuçtaki bakım ve parça etiketlerini bu gizli maliyetin kısayolu olarak kullanın, ardından kısa listenizi [Yakıt Maliyeti Hesaplayıcı](/tools/fuel-cost-calculator-global) ile geçirip tüketim rakamlarını kendi kilometrenize göre aylık tahmine çevirin. İkinci el değeri de önemlidir: birçok pazarda yaygın Japon ve Kore modelleri, niş veya bakımı pahalı markalardan daha iyi değer korur; bu da sahip olmanın gerçek maliyetini düşürür.',
        ],
      },
      {
        h2: 'Türkiye ve çevresi: yerelde neler önemli',
        paragraphs: [
          'Türkiye’de araba seçimini en çok etkileyen etken vergilerdir. Özel tüketim vergisi (ÖTV), motor hacmi ve vergi matrahına göre kademeli uygulanır ve ithal ya da yüksek hacimli araçların fiyatını belirgin biçimde artırır. Ayrıca motorlu taşıtlar vergisi (MTV) her yıl ödenir, zorunlu trafik sigortası ve kasko ise yüksek masraf kalemleridir. Bu nedenle küçük hacimli, bakımı ucuz ve parçası kolay bulunan modeller Türkiye’de sık tercih edilir. Döviz kurundaki dalgalanmalar yeni araç fiyatlarını hızlı değiştirdiğinden, bu araçtaki tahmini fiyatlar yalnızca başlangıç noktası olarak görülmelidir.',
          'Yakıt fiyatlarının yüksek olduğu bir pazarda yakıt tüketimi, toplam maliyette büyük pay alır; bu yüzden hibrit modeller ve düşük tüketimli arabalar uzun vadede avantaj sağlar. Şehir içinde yoğun trafik ve dar sokaklar, kompakt boyutlu ve rahat park edilen araçları öne çıkarırken, kış aylarında ve dağlık bölgelerde çekiş ve yerden yükseklik daha önemli hale gelir. Bu araç ağırlıklı olarak küresel modelleri karşılaştırır; Türkiye’de yerel üretilen veya yaygın satılan birçok model henüz kapsama dahil değildir, bu nedenle sonuçları genel bir karşılaştırma olarak görün ve yetkili satıcıdan güncel fiyat alın.',
          'Almanya, Hollanda, Belgika ve Fransa gibi Türk nüfusunun yoğun olduğu ülkeler de ülke listesinin başındadır. Bu ülkelerde periyodik muayene, çevre bölgeleri ve yüksek işçilik ücretleri sahip olma maliyetini şekillendirir. Afrika pazarlarında ise on ila yirmi yaşındaki ithal ikinci el arabalar yaygındır; bu yüzden araç, ikinci el alıcılar için tipik sorunlar ve muayene ipuçları içeren {usedCars} eski model ekler. Ülke seçicisinin nedeni budur: aynı araba bir pazarda mantıklı bir alım, başka bir pazarda pahalı bir lüks olabilir.',
        ],
      },
      {
        h2: 'Bakım ve yedek parça değerlendirmeleri nasıl okunur',
        paragraphs: [
          '**Bakım maliyeti**, bir modeli yolda tutmanın diğerlerine göre olağan süregelen maliyetini derecelendirir: Düşük, Orta, Yüksek veya Çok yüksek. **Yedek parça bulunabilirliği**, yedek parçaların ne kadar kolay bulunduğunu derecelendirir: Kolay, Orta veya Zor. Her ikisi de modelin itibarına, tipik servis fiyatlarına ve parça ağlarına dayanan editoryal değerlendirmelerdir. Herhangi bir servisin teklifi değildir ve pazara göre farklılık gösterebilir.',
          '“Düşük” ve “Kolay”ı güçlü bir işaret sayın. “Yüksek” veya “Zor”u, karar vermeden önce yerel ustalara danışmanız gerektiğinin işareti olarak görün. Her sonuç ayrıca o modele özgü sık sorunları ve bir uyarıyı gösterir — arabayı görmeye gitmeden önce okuyun.',
        ],
      },
      {
        h2: 'Ülke fiyatları nasıl tahmin edilir — ve sınırları',
        paragraphs: [
          'Her arabanın ABD doları cinsinden bir baz fiyatı vardır; bu, 2025–2026 giriş donanımı için yaklaşık bir rakamdır. Yerel fiyatı göstermek için araç, bu baz fiyatı ülkeye özgü bir pazar çarpanıyla — gümrük vergisi, özel tüketim vergisi, KDV ve olağan bayi marjının yön gösterici bir tahmini — ve bir döviz kuruyla çarpar. Döviz kurları ve vergi kuralları değiştiği için sonucu bütçenizin başlangıç noktası sayın, teklif değil.',
          'Bazı modeller bazı ülkelerde sıfır satılmaz; donanım, opsiyonlar ve ikinci el aracın durumu gerçek fiyatı bu tahminlerden uzaklaştırabilir. Nihai bütçenizi belirlemeden önce yerel ilanlar veya bir bayi ile doğrulayın.',
        ],
      },
      {
        h2: 'Kısa listeden karara',
        paragraphs: [
          'Kullanımınızı seçin, ilk sonuçların her birinde **Ayrıntıları gör**’ü açın ve sık sorunları not edin. İki favorinizi [Araba Karşılaştırma](/tools/car-comparison) ile yan yana karşılaştırın. İkinci el bir araba için ödeme yapmadan önce geçmişini [VIN sorgulama](/araclar/sasi-numarasi-sorgulama) ile kontrol edin ve bağımsız bir mekanik muayene yaptırın. Arabaya sahip olduktan sonra [Arabam Ne Kadar Eder?](/araclar/arabam-ne-kadar-eder) değerini takip etmenize yardımcı olur. **Bağlantıyı kopyala** ile seçtiğiniz ülke ve kullanımı eşinizle veya ustanızla paylaşabilirsiniz.',
        ],
      },
    ],
    exampleTitle: 'Örnek: arabayı gerçek kullanıma uydurmak',
    exampleBody:
      'Açıklayıcı bir senaryodur, gerçek bir müşteri vakası değildir. Büyük bir şehirde küçük bir kurye işi işleten birinin, yük alanı yüzünden yedi kişilik bir SUV’ye ilgi duyduğunu düşünün. Oysa ticari sıralamada Toyota Corolla ve Toyota RAV4, daha büyük araçlardan yüksek puan alır; çünkü gerçek rotaları, kilometre başına parça maliyeti ve yakıt tüketiminin salt yük hacminden daha önemli olduğu, orta yüklü kısa dur-kalk yolculuklardır. Puanlar SUV’nin kötü bir araç olduğunu söylemez — o kullanım biçimine daha az uyduğunu söyler. Alış fiyatı ve yakıttan tasarruf edilen para, işte işletme sermayesi olarak kalabilir.',
  },

  related: { compare: 'Araba Karşılaştırma', fuel: 'Yakıt Maliyeti Hesaplayıcı', valuation: 'Arabam Ne Kadar Eder?' },

  faqs: [
    { q: 'Bu araç ülkem için gerçek fiyatları gösteriyor mu?', a: 'Tahmin gösterir, canlı teklif değil. Her arabanın ABD doları cinsinden bir baz fiyatı vardır; ülkenizi seçmek, o pazarın tipik vergi ve harç çarpanını ve bir döviz kurunu uygulayarak yerel fiyatı tahmin eder. Tam bütçe yapmadan önce bayi veya yerel ilanla doğrulayın.' },
    { q: 'Arabalar nasıl puanlanıyor?', a: 'Her araba, her kullanım için ölçülebilir etkenlerden 0–100 puan alır — bakım maliyeti, parça bulunabilirliği, yakıt tüketimi, yerden yükseklik, koltuk, bagaj, motor hacmi ve alış fiyatı — ve her kullanımın ağırlıkları farklıdır. Sıralama ülkeye göre değişmez, yalnızca gösterilen fiyat değişir.' },
    { q: 'Satın alınacak en iyi aile arabası hangisi?', a: 'Sıralamamızda {picks:family}, koltuk, bagaj, güvenilirlik ve fiyat dengesiyle aile kullanımında öndedir. Kalabalık aileler, her sonucun ayrıntılarında koltuk sayısına bakmalıdır.' },
    { q: 'Ticari veya taksi kullanımı için en iyi araba hangisi?', a: 'Yüksek kilometreli ticari kullanımda ilk üç {picks:commercial}. Düşük bakım maliyeti, kolay parça ve makul yakıt tüketimini birleştirirler; kilometre başına maliyeti düşük tutan da budur.' },
    { q: 'Bozuk veya asfaltsız yollar için en iyi araba hangisi?', a: 'Bu sıralamada yerden yükseklik ve dayanıklılık öndedir. Şu anki ilk üç {picks:offroad}. Yalnızca şehir içi için dikkatli sürüşle sedan idare eder, ancak su baskınları ve kasisler alçak arabaları zorlar.' },
    { q: 'En iyi ilk araba hangisi?', a: 'İlk araba için en iyi seçenekler {picks:firstcar}: düşük bakım, kolay parça ve her yerde onları tanıyan ustalar. Egzotik ve ultra lüks markalardan ilk araba olarak kaçının — parçaları pahalıdır ve uzman usta gerekir.' },
    { q: 'Hangi arabalar yakıt veya enerji açısından en verimli?', a: 'Hibritler ve elektrikli arabalar öndedir: {picks:fuelefficient}. Elektrikli araba, yaşadığınız ve sürdüğünüz yerde güvenilir şarj mümkünse mantıklıdır; karar vermeden önce şarj kapsama alanını kontrol edin.' },
    { q: 'Afrika ülkeleri neden daha eski ikinci el modelleri gösteriyor?', a: 'Birçok Afrika pazarında ithal ikinci el arabalar, araba almanın olağan yoludur. Bir Afrika ülkesi seçtiğinizde araç, {globalCars} küresel modelin yanına ikinci el tipik sorunları ve muayene ipuçlarıyla {usedCars} eski model ekler.' },
  ],

  schema: {
    appName: 'Size En İyi Araba — kullanıma göre araba danışmanı',
    appDescription: 'Ücretsiz araba danışmanı: ülke ve kullanım seçin, {totalCars} araba arasından ilk 5’i görün; {countries} ülkede tahmini yerel fiyatlarla.',
    publisher: 'Naira Autos',
    author: 'Naira Autos Editör Ekibi',
  },
};
