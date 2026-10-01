// lib/best-car/id.ts — Indonesian strings for "Mobil Terbaik Untukmu" (/alat/mobil-terbaik-untukmu)
import type { BestCarStrings } from '@/lib/best-car/types';

export const id: BestCarStrings = {
  lang: 'id',
  locale: 'id-ID',
  dir: 'ltr',
  latin: true,

  path: '/alat/mobil-terbaik-untukmu',
  homePath: '/beranda',
  hubPath: '/alat',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/alat/berapa-harga-mobil-saya',

  defaultCountry: 'id',
  priorityCountries: ['id', 'my', 'sg', 'au', 'ph', 'th', 'vn'],
  picksCountry: 'id',

  nav: { home: 'Beranda', tools: 'Alat', current: 'Mobil Terbaik Untukmu', back: 'Kembali ke Alat', breadcrumb: 'Jejak navigasi' },

  meta: {
    title: 'Mobil Terbaik Untukmu 2026 — Penasihat Mobil Sesuai Kebutuhan, {countries} Negara',
    description:
      'Temukan mobil terbaik untuk kebutuhanmu, dengan harga dalam mata uangmu sendiri di {countries} negara. Pilih kebutuhanmu — mobil keluarga, usaha, jalan tol, anggaran terbatas, jalan rusak, mobil eksekutif, mobil pertama atau irit BBM — dan dapatkan 5 teratas dari {globalCars} model, dinilai dari biaya perawatan, suku cadang, dan konsumsi BBM.',
    keywords: [
      'mobil terbaik 2026', 'mobil keluarga terbaik', 'mobil terbaik untuk usaha', 'rekomendasi mobil',
      'mobil apa yang harus dibeli', 'suv terbaik 2026', 'mobil perawatan murah', 'mobil pertama terbaik',
      'mobil terbaik untuk tol', 'mobil eksekutif terbaik', 'mobil paling irit bbm', 'mobil terbaik anggaran terbatas',
      'mobil terbaik untuk jalan rusak', 'mobil terbaik indonesia', 'mobil paling awet', 'tips membeli mobil', 'naira autos',
    ],
    ogTitle: 'Mobil Terbaik Untukmu 2026 — Penasihat Mobil | Naira Autos',
    ogDescription: 'Penasihat mobil global dengan harga lokal di {countries} negara. Pilih kebutuhanmu dan dapatkan 5 teratas berdasarkan biaya perawatan, konsumsi BBM, dan ketersediaan suku cadang.',
    ogLocale: 'id_ID',
  },

  hero: {
    badge: 'Alat Gratis',
    verified: 'Harga diperiksa',
    h1: 'Mobil Terbaik Untukmu',
    intro:
      'Pilih negara dan kebutuhanmu, lalu dapatkan rekomendasi mobil berurutan dengan harga perkiraan dalam mata uangmu di {countries} negara — dinilai dari biaya perawatan, ketersediaan suku cadang, konsumsi BBM, dan ground clearance. {globalCars} model, dari Toyota Corolla hingga Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Negara & Mata Uang',
    popularCountries: 'Pasar utama',
    otherCountries: 'Negara lainnya',
    africaNote: 'Termasuk {usedCars} model bekas impor yang khas di wilayah ini, selain {globalCars} model global.',
    prompt: 'Untuk apa kamu butuh mobil?',
    rankedBy: 'Diurutkan menurut:',
    topRecs: '{n} rekomendasi teratas — {country}',
    emptyState: 'Pilih kebutuhan di atas untuk melihat rekomendasi',
    match: 'Kecocokan',
    electric: 'Listrik',
    electricMotor: 'Motor listrik',
    seatsFmt: '{n} kursi',
    bootFmt: 'Bagasi {n} L',
    consumptionUnit: 'L/100 km',
    showDetails: 'Lihat detail — masalah umum & peringatan',
    hideDetails: 'Sembunyikan detail',
    commonIssues: 'Masalah umum:',
    estIn: 'perkiraan di {country}',
    copyLink: 'Salin tautan',
    linkCopied: 'Tautan disalin',
  },

  enums: {
    maintenance: { Low: 'Rendah', Medium: 'Sedang', High: 'Tinggi', 'Very High': 'Sangat tinggi' },
    spareParts: { Easy: 'Mudah', Moderate: 'Sedang', Hard: 'Sulit' },
    bodyType: {
      Sedan: 'Sedan', Convertible: 'Convertible', Coupe: 'Coupe', SUV: 'SUV', Pickup: 'Pikap',
      Hatchback: 'Hatchback', Wagon: 'Wagon', Minivan: 'MPV', Bus: 'Bus',
    },
    fuelType: { Petrol: 'Bensin', Hybrid: 'Hybrid', 'Petrol Hybrid': 'Hybrid bensin', Electric: 'Listrik', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Otomatis', Manual: 'Manual', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Satu kecepatan', '8-speed DCT': 'DCT 8 percepatan', '2-speed (rear)': '2 percepatan (belakang)',
      'Single/2-speed': 'Satu/2 percepatan', 'Single / dual-motor': 'Motor tunggal / ganda',
      'Single-speed (simulated gears)': 'Satu kecepatan (gigi simulasi)',
    },
  },

  useCases: {
    family:        { label: 'Mobil Keluarga', icon: '👨‍👩‍👧‍👦', description: 'Ruang, keselamatan, dan keandalan untuk seluruh keluarga', priorities: 'Kursi · Bagasi · Keandalan · Harga', pickTitle: 'Mobil Keluarga Terbaik' },
    commercial:    { label: 'Usaha / Taksi Online', icon: '🚖', description: 'Dibuat untuk pemakaian niaga harian dengan jarak tempuh tinggi', priorities: 'Awet · Suku cadang murah · Irit BBM', pickTitle: 'Terbaik untuk Usaha' },
    highway:       { label: 'Jalan Tol & Jarak Jauh', icon: '🛣️', description: 'Nyaman dan stabil untuk perjalanan jauh', priorities: 'Irit BBM · Tenaga mesin · Keandalan', pickTitle: 'Terbaik untuk Jalan Tol' },
    budget:        { label: 'Anggaran Terbatas', icon: '💰', description: 'Nilai terbaik saat dana terbatas', priorities: 'Harga beli rendah · Perawatan murah', pickTitle: 'Pembelian Hemat Terbaik' },
    offroad:       { label: 'Jalan Rusak / Medan Berat', icon: '🪨', description: 'Ground clearance tinggi untuk medan berat dan jalan rusak', priorities: 'Ground clearance · Awet · Suku cadang', pickTitle: 'Terbaik untuk Jalan Rusak' },
    executive:     { label: 'Eksekutif / Bisnis', icon: '💼', description: 'Kesan, kenyamanan, dan citra merek untuk profesional', priorities: 'Prestise · Mesin · Biaya operasional', pickTitle: 'Mobil Eksekutif Terbaik' },
    firstcar:      { label: 'Mobil Pertama', icon: '🎓', description: 'Mudah dikendarai, toleran terhadap kesalahan, dan murah dirawat', priorities: 'Perawatan murah · Suku cadang mudah · Keandalan', pickTitle: 'Mobil Pertama Terbaik' },
    fuelefficient: { label: 'Irit BBM / Energi', icon: '⛽', description: 'Biaya operasional per kilometer paling rendah', priorities: 'Konsumsi BBM atau energi · Perawatan · Suku cadang', pickTitle: 'Paling Irit' },
  },

  seo: {
    reviewedByLabel: 'Ditinjau oleh:',
    reviewer: 'Tim Redaksi Naira Autos',
    updatedLabel: 'Konten diperbarui:',
    picksHeading: 'Mobil Terbaik Menurut Kebutuhan — 2026',
    picksNote:
      'Daftar ini dibuat dengan penilaian yang sama seperti yang dipakai alat ini, untuk satu pasar acuan. Urutan dan harga yang tepat menyesuaikan negara yang kamu pilih di atas, dan model bekas impor ditambahkan untuk negara-negara Afrika.',
    faqHeading: 'Pertanyaan yang Sering Diajukan',
    moreToolsHeading: 'Alat gratis lainnya',
    disclaimer:
      'Harga merupakan perkiraan untuk {countries} pasar, bukan penawaran. Penilaian perawatan dan suku cadang adalah penilaian redaksi dan dapat berbeda antar pasar. Selalu periksa mobil secara langsung, cek riwayatnya, dan minta penawaran lokal sebelum membeli.',
    sections: [
      {
        h2: 'Cara kerja penasihat mobil ini',
        paragraphs: [
          '“Mobil Terbaik Untukmu” mengurutkan {totalCars} kendaraan berdasarkan cara kamu benar-benar memakai mobil. Kamu memilih negara dan kebutuhan — keluarga, usaha atau taksi online, jalan tol, anggaran terbatas, jalan rusak, eksekutif, mobil pertama atau irit BBM — lalu alat ini menilai setiap model yang dijual atau lazim diimpor di pasar itu dan menampilkan lima terbaik. Setiap skor berkisar 0 sampai 100 dan hanya menggabungkan faktor yang bisa diukur: biaya perawatan, ketersediaan suku cadang, konsumsi BBM atau energi, ground clearance, jumlah kursi, kapasitas bagasi, kapasitas mesin, dan harga beli.',
          'Bobotnya berubah sesuai kebutuhan. Untuk taksi atau mobil pengiriman, perawatan dan ketersediaan suku cadang menyumbang 70% skor. Bagi pencari mobil untuk jalan rusak, ground clearance saja memegang separuh skor. Untuk mobil pertama, keandalan dan suku cadang yang mudah didapat jauh lebih penting daripada tenaga.',
          'Urutannya sama di setiap negara, dan itu disengaja. Skor memakai harga dasar dolar AS setiap mobil, sehingga berpindah dari Jakarta ke Kuala Lumpur mengubah harga yang kamu lihat, bukan urutan daftarnya. Dengan begitu rekomendasi tetap soal mobilnya, sedangkan perkiraan di bawah tiap hasil menyesuaikan mata uangmu serta bea dan pajak yang lazim di pasarmu. Alat ini mencakup {countries} negara: {globalCars} model dibandingkan di mana saja, dan di pasar Afrika ditambah {usedCars} model bekas impor.',
        ],
      },
      {
        h2: 'Mulailah dari pemakaian harian, bukan lembar spesifikasi',
        paragraphs: [
          'Mobil terbaik untukmu lebih bergantung pada **pola pemakaian harianmu yang sebenarnya** daripada spesifikasi. Mobil yang tampak bagus di atas kertas bisa menjadi pilihan buruk jika bengkel yang mengenalnya jauh, atau jika ground clearance yang rendah mengubah rute harianmu menjadi lintasan rintangan.',
          'Untuk **pemakaian usaha dan taksi online**, keandalan pada jarak tempuh tinggi dan biaya suku cadang per kilometer yang rendah menentukan segalanya. Toyota Corolla dan Toyota Camry lazim terlihat di armada taksi dan pengiriman di banyak negara karena mesinnya sederhana, toleran terhadap servis yang terlewat, dan hampir semua mekanik bisa memperbaikinya.',
          'Untuk **pemakaian eksekutif**, citra merek memang penting, tetapi tidak boleh mengalahkan biaya operasional. Mercedes-Benz S-Class di sini diberi nilai perawatan “Sangat tinggi”: suspensi udara dan elektronik yang rumit bisa mengubah satu perbaikan menjadi tagihan empat digit. Banyak profesional lebih terlayani dengan sedan biasa yang terawat daripada mobil mewah berjarak tempuh tinggi dengan biaya perbaikan yang terus bertambah.',
          'Untuk **pembeli mobil pertama**, hal terpenting adalah mekanik mengenal mobilnya. Mobil yang kerusakannya butuh diagnosis khusus lebih lama dan lebih mahal diperbaiki. Model Toyota dan Honda dengan mesin di bawah 2,5 liter punya ekosistem suku cadang, bengkel, dan saran daring terbesar di mana pun kamu membeli.',
          'Untuk **keluarga**, kursi dan bagasi penting, tetapi juga harga SUV tiga baris yang mungkin tidak kamu perlukan. Karena itu skor keluarga juga menghargai harga beli yang lebih rendah: crossover lima kursi sering melayani keluarga beranggota empat sebaik kendaraan yang jauh lebih besar, dengan biaya yang jauh lebih kecil.',
          'Untuk **jalan rusak dan medan berat**, lihat ground clearance dulu, baru penggerak rodanya. Sekitar 250 mm membuat lubang, jalan banjir, dan jalan tanah masih bisa dilalui, sedangkan sedan 140 mm masih bisa dipakai di kota jika dikendarai hati-hati — tetapi polisi tidur dan banjir menjadi masalah berulang.',
        ],
      },
      {
        h2: 'Total biaya kepemilikan lebih penting daripada harga di label',
        paragraphs: [
          'Mobil yang lebih murah tidak selalu pilihan yang lebih hemat. Dalam lima tahun, BBM, servis, asuransi, ban, dan perbaikan bisa menyamai harga belinya, terutama di pasar yang suku cadang impornya lambat datang. Dua mobil berharga mirip bisa berbeda ribuan dolar dalam biaya kepemilikan hanya karena yang satu berbagi suku cadang dengan jutaan kendaraan lain sedangkan yang lain butuh komponen yang hanya ada di dealer.',
          'Gunakan label perawatan dan suku cadang pada setiap hasil sebagai jalan pintas untuk biaya tersembunyi itu, lalu bawa daftar pendekmu ke [Kalkulator Biaya BBM](/tools/fuel-cost-calculator-global) untuk mengubah angka konsumsi menjadi perkiraan bulanan sesuai jarak tempuhmu. Nilai jual kembali juga penting: di banyak pasar, model Jepang dan Korea yang populer lebih awet nilainya dibanding merek niche atau yang mahal dirawat, sehingga menurunkan biaya kepemilikan sebenarnya.',
        ],
      },
      {
        h2: 'Indonesia dan sekitarnya: apa yang berarti secara lokal',
        paragraphs: [
          'Di Indonesia, banyak hal lokal ikut menentukan biaya memiliki mobil: pajak kendaraan tahunan yang bergantung pada nilai dan jenis kendaraan, biaya STNK, serta pajak barang mewah untuk kendaraan tertentu. Di kota-kota besar seperti Jakarta, aturan ganjil-genap di jalur tertentu dan macet parah membuat mobil yang ringkas, mudah diparkir, dan irit di lalu lintas padat lebih praktis. Karena Indonesia beriklim tropis dengan hujan deras, banjir dan genangan di jalan sering terjadi, jadi ground clearance bukan sekadar urusan medan berat, tetapi juga urusan sehari-hari.',
          'Perhatikan juga jaringan bengkel dan suku cadang di kotamu. Merek Jepang umumnya punya jaringan terluas di Indonesia, sehingga suku cadang lebih mudah dan murah dibanding merek yang jaringannya terbatas. Alat ini membandingkan terutama model global, sehingga banyak model populer pasar Indonesia seperti MPV tujuh kursi lokal belum tercakup; anggap hasilnya sebagai perbandingan umum, dan cek model serta harga resmi di dealer.',
          'Di Malaysia dan Singapura, pajak kendaraan sangat memengaruhi harga: Malaysia memiliki bea dan cukai yang tinggi untuk mobil impor, sedangkan Singapura mewajibkan sertifikat hak kepemilikan kendaraan (COE) yang membuat harga mobil jauh lebih mahal dibanding negara lain. Di pasar Afrika, mobil bekas impor berusia sepuluh sampai dua puluh tahun lazim, sehingga alat ini menambahkan {usedCars} model lama dengan masalah khas dan tips pemeriksaan bagi pembeli mobil bekas. Karena itulah ada pemilih negara: mobil yang sama bisa menjadi pembelian masuk akal di satu pasar dan kemewahan mahal di pasar lain.',
        ],
      },
      {
        h2: 'Cara membaca penilaian perawatan dan suku cadang',
        paragraphs: [
          '**Biaya perawatan** menilai biaya rutin yang lazim untuk menjaga sebuah model tetap jalan dibanding model lain: Rendah, Sedang, Tinggi, atau Sangat tinggi. **Ketersediaan suku cadang** menilai seberapa mudah suku cadang pengganti ditemukan: Mudah, Sedang, atau Sulit. Keduanya penilaian redaksi berdasarkan reputasi model, harga servis yang lazim, dan jaringan suku cadang. Itu bukan penawaran dari bengkel mana pun dan dapat berbeda antar pasar.',
          'Anggap “Rendah” dan “Mudah” sebagai sinyal kuat. Anggap “Tinggi” atau “Sulit” sebagai tanda untuk bertanya kepada mekanik setempat sebelum memutuskan. Setiap hasil juga menampilkan masalah umum dan satu peringatan khusus model itu — bacalah sebelum kamu pergi melihat mobilnya.',
        ],
      },
      {
        h2: 'Bagaimana harga per negara diperkirakan — dan batasannya',
        paragraphs: [
          'Setiap mobil punya harga dasar dalam dolar AS, angka perkiraan untuk varian awal 2025–2026. Untuk menampilkan harga lokal, alat ini mengalikan harga dasar itu dengan pengali pasar khusus tiap negara — perkiraan arah dari bea masuk, cukai, PPN, dan margin dealer yang lazim — serta dengan kurs. Karena kurs dan aturan pajak berubah, anggap hasilnya titik awal anggaranmu, bukan penawaran.',
          'Sebagian model tidak dijual baru di negara tertentu, dan varian, opsi, serta kondisi mobil bekas bisa membuat harga sebenarnya jauh dari perkiraan ini. Konfirmasikan dengan iklan lokal atau dealer sebelum menetapkan anggaran akhir.',
        ],
      },
      {
        h2: 'Dari daftar pendek menjadi keputusan',
        paragraphs: [
          'Pilih kebutuhanmu, buka **Lihat detail** pada setiap hasil teratas, dan catat masalah umumnya. Bandingkan dua favoritmu berdampingan dengan [Perbandingan Mobil](/tools/car-comparison). Sebelum membayar mobil bekas, periksa riwayatnya dengan [pemeriksa VIN](/tools/vin-checker-global) dan minta pemeriksaan mekanis independen. Setelah mobil menjadi milikmu, [Berapa Harga Mobil Saya?](/alat/berapa-harga-mobil-saya) membantu memantau nilainya. Dengan **Salin tautan** kamu bisa membagikan negara dan kebutuhan pilihanmu kepada pasangan atau mekanik.',
        ],
      },
    ],
    exampleTitle: 'Contoh: mencocokkan mobil dengan pemakaian nyata',
    exampleBody:
      'Skenario ilustrasi, bukan studi kasus pelanggan. Bayangkan pemilik usaha kurir kecil di kota besar yang tertarik pada SUV tujuh kursi karena ruang kargonya. Namun pada peringkat penggunaan usaha, Toyota Corolla dan Toyota RAV4 mendapat skor lebih tinggi daripada kendaraan yang lebih besar, karena rute sebenarnya adalah perjalanan pendek yang sering berhenti dengan muatan sedang, di mana biaya suku cadang per kilometer dan konsumsi BBM lebih berarti daripada volume kargo semata. Skor tidak mengatakan SUV itu kendaraan buruk — hanya kurang cocok untuk pola pemakaian itu. Uang yang dihemat dari harga beli dan BBM bisa tetap menjadi modal kerja usahanya.',
  },

  related: { compare: 'Perbandingan Mobil', fuel: 'Kalkulator Biaya BBM', valuation: 'Berapa Harga Mobil Saya?' },

  faqs: [
    { q: 'Apakah alat ini menampilkan harga asli untuk negaraku?', a: 'Alat ini menampilkan perkiraan, bukan penawaran langsung. Setiap mobil punya harga dasar dalam dolar AS; memilih negara menerapkan pengali bea dan pajak yang lazim di pasar itu serta kurs untuk memperkirakan harga lokal. Konfirmasikan dengan dealer atau iklan lokal sebelum menyusun anggaran yang tepat.' },
    { q: 'Bagaimana mobil-mobil itu dinilai?', a: 'Setiap mobil mendapat skor 0 sampai 100 untuk tiap kebutuhan dari faktor yang bisa diukur — biaya perawatan, ketersediaan suku cadang, konsumsi BBM, ground clearance, kursi, bagasi, kapasitas mesin, dan harga beli — dengan bobot berbeda untuk setiap kebutuhan. Urutan tidak berubah menurut negara, hanya harga yang ditampilkan.' },
    { q: 'Apa mobil keluarga terbaik untuk dibeli?', a: 'Dalam peringkat kami, {picks:family} berada di puncak untuk pemakaian keluarga, menyeimbangkan kursi, bagasi, keandalan, dan harga. Keluarga besar sebaiknya memeriksa jumlah kursi pada detail setiap hasil.' },
    { q: 'Apa mobil terbaik untuk usaha atau taksi online?', a: 'Untuk pemakaian niaga dengan jarak tempuh tinggi, tiga teratas adalah {picks:commercial}. Ketiganya memadukan biaya perawatan rendah, suku cadang mudah, dan konsumsi BBM wajar, yang menjaga biaya per kilometer tetap rendah.' },
    { q: 'Apa mobil terbaik untuk jalan rusak atau tak beraspal?', a: 'Ground clearance dan keawetan memimpin peringkat ini. Tiga teratas saat ini adalah {picks:offroad}. Untuk pemakaian dalam kota saja, sedan masih bisa dengan berkendara hati-hati, tetapi banjir dan polisi tidur menguji mobil yang rendah.' },
    { q: 'Apa mobil pertama terbaik?', a: 'Pilihan terbaik untuk mobil pertama adalah {picks:firstcar}: perawatan murah, suku cadang mudah, dan mekanik yang mengenalnya di mana-mana. Hindari merek eksotis dan supermewah sebagai mobil pertama — suku cadangnya mahal dan butuh mekanik spesialis.' },
    { q: 'Mobil mana yang paling irit BBM atau energi?', a: 'Hybrid dan mobil listrik memimpin: {picks:fuelefficient}. Mobil listrik hanya masuk akal jika pengisian daya yang andal tersedia di tempat kamu tinggal dan berkendara, jadi periksa jangkauan pengisian sebelum memutuskan.' },
    { q: 'Mengapa negara-negara Afrika menampilkan model bekas yang lebih tua?', a: 'Di banyak pasar Afrika, mobil bekas impor adalah cara utama membeli mobil. Saat kamu memilih negara Afrika, alat ini menambahkan {usedCars} model lama dengan masalah khas mobil bekas dan tips pemeriksaan, selain {globalCars} model global.' },
  ],

  schema: {
    appName: 'Mobil Terbaik Untukmu — penasihat mobil sesuai kebutuhan',
    appDescription: 'Penasihat mobil gratis: pilih negara dan kebutuhan lalu dapatkan 5 teratas dari {totalCars} mobil, dengan perkiraan harga lokal di {countries} negara.',
    publisher: 'Naira Autos',
    author: 'Tim Redaksi Naira Autos',
  },
};
