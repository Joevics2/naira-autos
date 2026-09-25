import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientID from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Montir Virtual AI — Diagnosa Mobil Online Gratis | Naira Autos',
  description: 'Montir virtual gratis dengan kecerdasan buatan. Jelaskan kerusakan, unggah foto, suara, atau video masalahnya dan dapatkan diagnosis instan beserta perkiraan biaya perbaikan. Tanpa perlu mendaftar.',
  alternates: {
    canonical: 'https://www.naira.autos/alat/montir-virtual',
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
    title: 'Axion — Montir Virtual AI Gratis | Naira Autos',
    description: 'Diagnosa mobil online instan, di mana pun Anda berada. Unggah suara mesin, foto, atau jelaskan kerusakannya. Dapatkan tingkat urgensi, kemungkinan penyebab, langkah selanjutnya, dan biaya perbaikan. Gratis, tanpa pendaftaran.',
    url: 'https://www.naira.autos/alat/montir-virtual',
    locale: 'id',
    type: 'website',
  },
  keywords: ['montir virtual', 'montir online gratis', 'diagnosa mobil online', 'diagnosa mobil gratis', 'mobil saya kenapa', 'bengkel online', 'tanya montir online', 'hitung biaya perbaikan mobil', 'montir kecerdasan buatan', 'cek mobil online', 'diagnosa suara mesin', 'perkiraan biaya perbaikan mobil'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/alat/montir-virtual',
      name: 'Montir Virtual AI — Diagnosa Mobil Online Gratis',
      description: 'Montir virtual gratis dengan kecerdasan buatan. Unggah suara mesin, foto, atau jelaskan kerusakannya. Dapatkan diagnosis instan beserta tingkat urgensi dan biaya perbaikan.',
      url: 'https://www.naira.autos/alat/montir-virtual',
      inLanguage: 'id',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.naira.autos/beranda' },
          { '@type': 'ListItem', position: 2, name: 'Alat', item: 'https://www.naira.autos/alat' },
          { '@type': 'ListItem', position: 3, name: 'Montir AI', item: 'https://www.naira.autos/alat/montir-virtual' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Apa itu montir virtual dan bagaimana cara kerjanya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Montir virtual adalah alat yang menggunakan kecerdasan buatan untuk mendiagnosis kerusakan mobil Anda dari jarak jauh. Anda menjelaskan masalahnya, mengunggah foto, suara, atau video jika mau, dan AI menganalisis semuanya berdasarkan basis data pola kerusakan yang sangat besar untuk memberikan diagnosis lengkap dengan tingkat urgensi dan perkiraan biaya perbaikan.' },
        },
        {
          '@type': 'Question',
          name: 'Bisakah AI mendiagnosis mobil saya hanya dari suara mesin?',
          acceptedAnswer: { '@type': 'Answer', text: 'Bisa. Rekam suara ketukan, decitan, atau gesekan — rekaman 10 detik dengan ponsel pun sudah cukup. AI menganalisis pola suaranya untuk mengidentifikasi, misalnya, bantalan yang aus, kampas rem yang tipis, atau kerusakan spesifik lainnya.' },
        },
        {
          '@type': 'Question',
          name: 'Apakah ini gratis?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ya. Sepenuhnya gratis — tanpa pendaftaran, tanpa langganan, tanpa pembayaran. Buka halamannya dan langsung mulai mendiagnosis.' },
        },
        {
          '@type': 'Question',
          name: 'Apakah diagnosis AI selalu akurat?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tidak — tidak selalu 100% akurat. Ini adalah titik awal yang baik berdasarkan deskripsi, foto, suara, atau video yang Anda berikan, tetapi bisa saja melewatkan hal-hal yang hanya dapat ditemukan lewat pemeriksaan fisik dengan lift dan alat pemindai. Anggap ini sebagai opini awal, bukan jawaban final, dan selalu temui montir bersertifikat secara langsung untuk kerusakan rem, kemudi, atau bahan bakar, apa pun hasil diagnosisnya.' },
        },
        {
          '@type': 'Question',
          name: 'Apakah bisa untuk BMW, Mercedes, Toyota, atau merek lainnya?',
          acceptedAnswer: { '@type': 'Answer', text: 'Bisa. Tanyakan kerusakan BMW, Mercedes, Toyota, atau merek lainnya — AI mencakup semua produsen besar. Biaya perbaikan dikalibrasi berdasarkan pasar Nigeria; jika Anda di negara lain, gunakan sebagai referensi umum, bukan angka lokal yang pasti.' },
        },
        {
          '@type': 'Question',
          name: 'Apakah ini sama seperti bertanya di grup WhatsApp atau forum mobil?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ini lebih baik dalam banyak hal. Saat Anda bertanya di forum atau grup WhatsApp, Anda hanya mendapat opini satu orang berdasarkan deskripsi teks. Montir virtual kami menganalisis deskripsi Anda beserta foto, suara, atau video yang diunggah, membandingkannya dengan ribuan pola kerusakan yang diketahui, dan memberikan diagnosis yang diurutkan berdasarkan kemungkinan disertai tingkat kepercayaan.' },
        },
        {
          '@type': 'Question',
          name: 'Apakah riwayat percakapan saya disimpan di server Anda?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tidak. Seluruh riwayat hanya disimpan di perangkat Anda sendiri, menggunakan penyimpanan lokal browser. Kami tidak menyimpan apa pun di server kami selain pesan aktif yang Anda kirim untuk diagnosis. Anda dapat menghapus riwayat kapan saja dari menu samping.' },
        },
        {
          '@type': 'Question',
          name: 'Bisakah saya mendapatkan biaya perbaikan untuk merek mobil apa pun?',
          acceptedAnswer: { '@type': 'Answer', text: 'Bisa. Kami mencakup Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, dan merek besar lainnya, di mana pun Anda berkendara. Biaya yang diberikan adalah referensi internasional perkiraan.' },
        },
        {
          '@type': 'Question',
          name: 'Bagaimana jika saya butuh montir keliling atau bengkel terdekat?',
          acceptedAnswer: { '@type': 'Answer', text: 'Alat kami mendiagnosis masalahnya terlebih dahulu, sehingga Anda tahu persis apa yang harus diminta sebelum mulai mencari. Jika kerusakan memerlukan pemeriksaan fisik atau peralatan khusus, kami akan memberitahukannya dengan jelas.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Montir Virtual AI',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Montir virtual gratis dengan kecerdasan buatan. Jelaskan kerusakan, unggah suara mesin atau foto, dapatkan diagnosis instan beserta biaya perbaikan yang dikalibrasi untuk pasar Nigeria.',
      url: 'https://www.naira.autos/alat/montir-virtual',
      inLanguage: 'id',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageID() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientID />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Terakhir diperiksa: Agustus 2026</p>

          {/* Cakupan Lengkap */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Cakupan Lengkap</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Apa Saja yang Ditawarkan Montir Virtual Kami?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Baik Anda butuh perkiraan biaya perbaikan dengan cepat, ingin bertanya ke montir online sebelum ke bengkel, atau ingin menghitung berapa biaya memperbaiki mobil Anda — alat ini mencakup semuanya, gratis.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnosis Kerusakan Mesin', desc: 'Suara ketukan, mesin brebet, idle tidak stabil, overheat, lampu check engine — AI mengidentifikasi penyebab paling mungkin, diurutkan berdasarkan kemungkinan.' },
                { title: 'Analisis Suara dan Audio', desc: 'Unggah rekaman suara ketukan, decitan, atau gesekan. AI menganalisis pola suaranya untuk mengidentifikasi kerusakan.' },
                { title: 'Tingkat Urgensi Instan', desc: 'Setiap diagnosis disertai penilaian jelas dengan empat tingkat: Aman Dikendarai, Perlu Dipantau, Segera ke Montir, atau Berhenti Sekarang.' },
                { title: 'Perkiraan Biaya Perbaikan Online', desc: 'Biaya dikalibrasi berdasarkan pasar Nigeria sebagai referensi — biaya aktual suku cadang dan jasa berbeda-beda tergantung negara dan kota. Gunakan sebagai titik awal, lalu minta penawaran dari bengkel setempat.' },
                { title: 'Langkah yang Bisa Dilakukan Sendiri', desc: 'Jika kerusakannya adalah sesuatu yang bisa Anda periksa atau perbaiki sendiri, kami akan memberitahukan caranya secara tepat — sebelum Anda mengeluarkan uang untuk montir.' },
                { title: 'Percakapan Berkelanjutan', desc: 'Ajukan pertanyaan lanjutan dan dapatkan jawaban dengan konteks lengkap. Setiap sesi disimpan di perangkat Anda.' },
                { title: 'Dukungan Multi-Merek', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, dan merek serta pasar lainnya.' },
                { title: 'Diagnosis Lewat Foto dan Video', desc: 'Kirim foto lampu peringatan di dasbor, kebocoran cairan yang tidak biasa, atau kerusakan yang terlihat. Setiap media tambahan meningkatkan keyakinan diagnosis secara signifikan.' },
                { title: 'Identifikasi Suku Cadang', desc: 'Setiap diagnosis mencakup komponen spesifik yang paling mungkin terlibat, sehingga Anda tahu persis apa yang harus diminta di bengkel atau toko suku cadang mana pun.' },
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
                Apa itu montir virtual dengan kecerdasan buatan?
              </h2>
              <p className="mb-3">Sebuah <strong className="text-foreground">montir virtual</strong> persis seperti namanya: montir yang Anda ajak bicara lewat teks, foto, suara, atau video, alih-alih bertemu langsung. Anda menjelaskan apa yang terjadi pada mobil Anda — suara ketukan aneh saat starter dingin, lampu check engine yang tidak mau mati, rem yang terasa lembek — dan dalam hitungan detik Anda mendapat jawaban berdasarkan pengetahuan mendalam tentang kerusakan mobil nyata.</p>
              <p>Axion, <strong className="text-foreground">montir kecerdasan buatan</strong> kami, bekerja untuk semua merek dan di semua negara, tetapi punya keunggulan tambahan bagi yang berkendara di Nigeria: ia memahami bagaimana bahan bakar oplosan merusak injektor, bagaimana panas tropis mempercepat keausan seal karet, dan bagaimana jalan berlubang merusak suspensi lebih cepat dibanding di pasar lain.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cara mendapatkan diagnosis mobil dalam waktu kurang dari satu menit
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Jelaskan kerusakannya.</strong> Tuliskan apa yang terjadi — semakin detail semakin baik. Kapan mulai terjadi? Hanya terjadi saat dingin, saat akselerasi, atau saat setir dibelokkan?</p>
                <p><strong className="text-foreground">2. Unggah foto, rekaman suara, atau video (opsional, tapi sangat membantu).</strong> Rekaman suara mesin 10 detik seringkali lebih berguna daripada satu paragraf deskripsi.</p>
                <p><strong className="text-foreground">3. Dapatkan diagnosis Anda secara instan.</strong> Tingkat urgensi, kemungkinan penyebab diurutkan berdasarkan probabilitas, apa yang bisa Anda periksa sendiri, dan perkiraan biaya perbaikan.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Biaya perbaikan: hindari dikenakan tarif berlebihan
              </h2>
              <p className="mb-3">Salah satu cara paling umum Anda dikenai biaya berlebihan di bengkel adalah datang tanpa tahu berapa perbaikan seharusnya. Sebelum mengunjungi bengkel mana pun, gunakan perkiraan <strong className="text-foreground">biaya perbaikan</strong> kami untuk mengetahui harga yang wajar — suku cadang dan jasa dirinci dengan jelas.</p>
              <p>Perkiraan ini mempertimbangkan kendaraan spesifik Anda — merek, model, tahun — dan kerusakan yang paling mungkin berdasarkan deskripsi Anda. Ini bukan angka umum: Camry 2010 dengan jarak tempuh 180.000 km yang menunjukkan tekanan oli rendah mendapat perkiraan berbeda dari Camry 2020 dengan jarak tempuh 40.000 km dengan lampu yang sama, karena penyebab yang mungkin berbeda.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Bekerja untuk semua merek: Toyota, BMW, Mercedes, Honda, dan lainnya
              </h2>
              <p className="mb-3">Tidak masalah apa yang Anda kendarai. AI memiliki pola kerusakan spesifik untuk setiap produsen — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen, dan hampir semua merek lain yang beredar saat ini. Berikan merek, model, dan tahun sekali saja, dan diagnosis akan disesuaikan dengan apa yang diketahui tentang kerusakan pada kendaraan spesifik itu, pada jarak tempuh itu, alih-alih memberikan jawaban umum yang berlaku sama untuk semua mobil.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Mengapa diagnosis lewat suara mesin mengubah segalanya
              </h2>
              <p className="mb-3">Deskripsi bersifat subjektif — "suara aneh" berarti berbeda bagi setiap orang. Suara tidak begitu. Suara ketukan saat starter dingin terdengar berbeda dari decitan saat mengerem, yang lagi-lagi berbeda dari gesekan saat setir dibelokkan. Dengan mengunggah rekaman 10 detik, AI memberi Anda diagnosis yang jauh lebih akurat dibanding hanya dengan teks.</p>
              <p>Anda tidak perlu peralatan profesional. Mikrofon ponsel Anda sudah cukup — cukup dekatkan ke sumber suara saat mesin menyala, lalu unggah rekamannya.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Kendaraan yang Didukung</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Truk', 'Bus', 'Motor'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Fakta Penting</h3>
              <ul className="space-y-2.5">
                {[
                  '100% gratis — tanpa langganan',
                  'Tidak perlu akun atau pendaftaran',
                  'Bisa digunakan di ponsel dan komputer',
                  'Perkiraan biaya referensi internasional',
                  'Tersedia 24/7 — bahkan di hari Minggu',
                  'Riwayat percakapan disimpan secara lokal',
                  'Pertanyaan lanjutan tanpa batas',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Juga di Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Penilaian mobil gratis', href: '/evaluate-car' },
                  { label: 'Penganalisis Suara Mesin', href: '/tools/engine-sound-analyzer' },
                  { label: 'Kalkulator Bea Masuk', href: '/tools/import-duty-calculator' },
                  { label: 'Daftar Periksa Dokumen', href: '/tools/vehicle-papers-checklist' },
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

          {/* Kecerdasan Tambahan */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Kecerdasan Tambahan</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Juga Disesuaikan dengan Kondisi Jalan Lokal
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Diagnosis bekerja sama baiknya di mana pun Anda berkendara. Tapi sebagian besar alat montir virtual hanya dilatih dengan data dari bengkel-bengkel Barat — mereka tidak tahu bahwa bahan bakar oplosan di Nigeria menurunkan viskositas oli 40% lebih cepat dari yang diperkirakan pabrikan, atau bahwa jalanan Lagos bisa merusak sendi CV dalam 30.000 km yang seharusnya bertahan hingga 150.000 km.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion juga mengetahui hal ini. Tanyakan tentang suara ketukan Toyota Corolla Anda setelah mengisi bahan bakar, dan jika Anda berada di Nigeria, ia akan mempertimbangkan bahan bakar oplosan lebih dulu — karena secara statistik itulah penyebab paling mungkin di sana.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Bahan Bakar Oplosan', desc: 'Memahami bagaimana bahan bakar oplosan memengaruhi sensor ketukan, injektor, dan viskositas oli.' },
                  { title: 'Efek Panas Tropis', desc: 'Mempertimbangkan suhu lingkungan 35°C+ yang mempercepat keausan seal karet.' },
                  { title: 'Kerusakan Akibat Jalan Berlubang', desc: 'Mengenali pola kerusakan suspensi dan ban yang khas pada jalan rusak.' },
                  { title: 'Harga Suku Cadang Lokal', desc: 'Perkiraan biaya dihitung menggunakan data dari pasar suku cadang dan bengkel terdaftar.' },
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

          {/* Perbandingan */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Perbandingan</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Montir Virtual vs. Opsi Lainnya
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Fitur</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Montir AI</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Kunjungan ke Bengkel</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Grup/Forum Mobil</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Tersedia 24/7', 'Ya', 'Tidak', 'Kadang'],
                    ['Gratis', 'Ya', 'Tidak', 'Ya'],
                    ['Tidak perlu bepergian', 'Ya', 'Tidak', 'Ya'],
                    ['Perkiraan biaya', 'Ya', 'Bervariasi', 'Tidak'],
                    ['Analisis audio/video', 'Ya', 'Ya', 'Tidak'],
                    ['Respons instan', 'Ya', 'Tidak', 'Kadang'],
                    ['Kualitas konsisten', 'Ya', 'Bervariasi', 'Tidak'],
                    ['Menyimpan riwayat', 'Ya', 'Tidak', 'Tidak'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Pertanyaan yang Sering Diajukan</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Pertanyaan yang Sering Diajukan
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Apa itu montir virtual dan bagaimana cara kerjanya?', a: 'Ini adalah alat yang menggunakan kecerdasan buatan untuk mendiagnosis kerusakan mobil Anda dari jarak jauh. Anda menjelaskan masalahnya, mengunggah media opsional, dan AI membandingkan semuanya dengan basis data kerusakan yang sangat besar — dengan biaya yang dikalibrasi berdasarkan pasar Nigeria.' },
                { q: 'Apakah diagnosis AI selalu akurat?', a: 'Tidak — tidak selalu 100% akurat. Ini titik awal yang baik, tapi bisa melewatkan hal yang hanya terlihat lewat pemeriksaan fisik dengan lift dan alat pemindai. Anggap sebagai opini awal, dan selalu temui montir langsung untuk kerusakan rem, kemudi, atau bahan bakar.' },
                { q: 'Apakah bisa untuk BMW, Mercedes, Toyota, atau merek lainnya?', a: 'Bisa. Tanyakan merek apa pun — AI mencakup semua produsen besar. Biaya dikalibrasi berdasarkan pasar Nigeria; di negara lain, gunakan sebagai referensi umum.' },
                { q: 'Apakah ini sama seperti bertanya di grup WhatsApp?', a: 'Ini lebih baik dalam banyak hal. Di forum Anda hanya mendapat opini satu orang. Layanan kami menganalisis deskripsi Anda beserta foto, suara, atau video, membandingkannya dengan ribuan pola kerusakan, dan memberikan diagnosis terurut disertai tingkat kepercayaan.' },
                { q: 'Bisakah mendiagnosis mobil saya hanya dari suara mesin?', a: 'Bisa. Audio adalah salah satu input terkuat kami. Unggah rekaman suara ketukan, decitan, atau gesekan — 10 detik dengan ponsel pun cukup. AI menganalisis pola suaranya untuk mengidentifikasi kerusakan yang mungkin terjadi.' },
                { q: 'Apakah saya perlu membuat akun atau login?', a: 'Tidak. Montir AI sepenuhnya gratis dan tidak memerlukan akun, pendaftaran, atau informasi pribadi. Data kendaraan Anda disimpan secara lokal di perangkat Anda.' },
                { q: 'Apakah riwayat saya disimpan di server Anda?', a: 'Tidak. Seluruh riwayat hanya disimpan di perangkat Anda melalui penyimpanan lokal browser. Kami tidak menyimpan apa pun di server kami selain pesan yang sedang aktif.' },
                { q: 'Seberapa akurat perkiraan biaya perbaikannya?', a: 'Ini berdasarkan data pasar Nigeria — suku cadang dan jasa di bengkel-bengkel Lagos, Abuja, dan Port Harcourt, sebagai referensi. Kami memberikan kisaran (minimum hingga maksimum) agar Anda tahu apa yang wajar. Jika bengkel menawarkan harga jauh di atas maksimum kami, ada baiknya diselidiki lebih lanjut.' },
                { q: 'Bisakah saya mendapatkan biaya perbaikan untuk merek mobil apa pun?', a: 'Bisa. Kami mencakup Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, dan merek besar lainnya, di mana pun Anda berkendara. Biaya yang diberikan adalah referensi internasional perkiraan.' },
                { q: 'Bagaimana jika saya butuh montir keliling atau bengkel terdekat?', a: 'Alat kami mendiagnosis masalahnya terlebih dahulu, sehingga Anda tahu persis apa yang harus diminta sebelum mulai mencari. Jika kerusakan memerlukan pemeriksaan fisik atau peralatan khusus, kami akan memberitahukannya dengan jelas — dan menyarankan jenis montir atau bengkel apa yang harus dicari.' },
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
            Ditinjau oleh <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Montir Mobil. Logika diagnosis dan kisaran biaya perbaikan telah diverifikasi keakuratan teknisnya.
          </p>

          {/* CTA Akhir */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Siap? Diagnosis Mobil Anda Sekarang.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Gratis. Instan. Tanpa pendaftaran. Dapatkan diagnosis Anda sekarang juga.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Mulai Diagnosis Gratis
            </a>
          </section>

          {/* Alat Lainnya */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Alat Gratis Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Pemeriksa VIN',              color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Daftar Periksa Dokumen',     color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Kalkulator Bea Masuk',       color: 'emerald' },
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
