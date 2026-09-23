import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { BerapaHargaMobilSayaClient } from './client';

export const metadata: Metadata = {
  title: 'Berapa Harga Mobil Saya? Penilaian AI Gratis | Naira Autos',
  description: 'Nilai mobil Anda secara gratis dengan AI, dalam mata uang Anda sendiri. Unggah satu foto, dapatkan harga secara instan — Indonesia dan seluruh dunia.',
  keywords: 'berapa harga mobil saya, penilaian mobil gratis, harga mobil bekas, penilaian mobil dengan ai, hitung nilai mobil',
  openGraph: {
    title: 'Berapa Harga Mobil Saya? Penilaian AI Gratis',
    description: 'Nilai mobil Anda dengan AI, dalam mata uang Anda sendiri. Unggah satu foto, dapatkan perkiraan harga secara instan — sepenuhnya gratis.',
    url: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
    siteName: 'Naira Autos',
    locale: 'id_ID',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      tr: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
      it: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
      vi: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
      th: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
      id: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Berapa Harga Mobil Saya? Penilaian AI Gratis',
  description: 'Alat penilaian mobil dengan AI gratis. Dapatkan perkiraan instan dalam mata uang Anda, disesuaikan dengan pasar di negara Anda.',
  url: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
  inLanguage: 'id',
  dateModified: '2026-09-20',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Penilaian Mobil dengan AI — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Unggah foto mobil Anda, dapatkan perkiraan nilai pasar secara instan dengan AI dalam mata uang Anda sendiri.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.naira.autos/beranda' },
      { '@type': 'ListItem', position: 2, name: 'Alat', item: 'https://www.naira.autos/alat' },
      { '@type': 'ListItem', position: 3, name: 'Berapa Harga Mobil Saya', item: 'https://www.naira.autos/alat/berapa-harga-mobil-saya' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Berapa harga mobil bekas saya?', acceptedAnswer: { '@type': 'Answer', text: 'Ini tergantung pada merek, model, tahun, varian, jarak tempuh, dan kondisi keseluruhan, serta harga jual mobil serupa saat ini di negara Anda. Unggah foto di atas dan pilih negara Anda — AI akan mengidentifikasi mobil Anda dan memberikan kisaran harga dalam mata uang Anda, berdasarkan iklan nyata di pasar tersebut.' } },
      { '@type': 'Question', name: 'Faktor apa saja yang memengaruhi penilaian mobil bekas?', acceptedAnswer: { '@type': 'Answer', text: 'Faktor terpenting adalah: (1) Merek dan model — beberapa mobil mempertahankan nilai lebih baik tergantung pasar. (2) Tahun, varian, dan jarak tempuh. (3) Kondisi bodi dan cat. (4) Kondisi mesin dan riwayat perawatan. (5) Dokumen dan registrasi yang lengkap. (6) Penawaran dan permintaan lokal — mobil yang sama bisa memiliki nilai berbeda di setiap negara.' } },
      { '@type': 'Question', name: 'Apakah negara saya memengaruhi penilaian?', acceptedAnswer: { '@type': 'Answer', text: 'Ya, cukup signifikan. Bea masuk, permintaan lokal untuk merek tertentu, kekuatan mata uang, dan ukuran pasar mobil bekas membuat harga bervariasi cukup besar antar negara. Alat kami mendukung banyak negara dan memberikan perkiraan dalam mata uang lokal, disesuaikan dengan pasar tersebut, bukan rata-rata global.' } },
      { '@type': 'Question', name: 'Seberapa akurat penilaian dengan AI?', acceptedAnswer: { '@type': 'Answer', text: 'Alat kami menggunakan teknologi computer vision untuk mengidentifikasi merek, model, tahun, dan varian secara akurat dari foto Anda, lalu membandingkannya dengan data iklan nyata di negara yang Anda pilih untuk memberikan kisaran harga, bukan angka tunggal. Anggap ini sebagai titik awal yang andal untuk negosiasi, bukan harga pasti — nilai sebenarnya selalu bergantung pada pemeriksaan langsung dan negosiasi.' } },
      { '@type': 'Question', name: 'Apakah alat penilaian ini benar-benar gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Ya. Tidak ada biaya, tidak perlu membuat akun, dan tidak ada batasan jumlah penggunaan.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Merek dan Nilai Jual Kembali', body: 'Kemampuan mempertahankan nilai jual kembali bervariasi menurut pasar — Toyota dan Honda umumnya mempertahankan nilai dengan baik di banyak wilayah, sementara merek mewah asal Jerman bisa terdepresiasi lebih cepat di pasar dengan biaya perawatan tinggi. Permintaan lokal sama pentingnya dengan nama merek.' },
  { icon: Shield, title: 'Jarak Tempuh dan Riwayat Perawatan', body: 'Jarak tempuh rendah dan riwayat perawatan yang tercatat adalah dua indikator paling andal untuk mobil yang terawat baik, di mana pun di dunia. Catatan perawatan yang konsisten bisa lebih bernilai daripada mobil yang lebih baru satu tahun.' },
  { icon: CheckCircle2, title: 'Dokumen dan Kepemilikan', body: 'Dokumen yang lengkap, sah, dan registrasi yang diperbarui sangat penting untuk mendapatkan harga terbaik di pasar mana pun. Dokumen yang tidak lengkap atau masalah impor dapat menurunkan harga sebesar 15% hingga 25%.' },
  { icon: AlertCircle, title: 'Kondisi Keseluruhan', body: 'Bodi yang bersih, tanpa goresan, karat, atau cat pudar, serta mesin yang berfungsi baik secara mekanis, selalu menghasilkan harga 10% hingga 15% lebih tinggi dibandingkan mobil serupa dengan tanda pemakaian yang jelas.' },
];

const FAQ_ITEMS = [
  { q: 'Berapa harga mobil bekas saya?', a: 'Tergantung pada merek, model, tahun, varian, jarak tempuh, dan kondisi — serta harga jual mobil serupa saat ini di negara Anda. Unggah foto dan pilih negara Anda untuk mendapatkan perkiraan AI dalam mata uang Anda.' },
  { q: 'Faktor apa saja yang memengaruhi penilaian mobil bekas?', a: 'Merek dan model, tahun dan varian, jarak tempuh, kondisi bodi dan mesin, dokumen yang lengkap, serta penawaran dan permintaan di pasar Anda.' },
  { q: 'Apakah negara saya memengaruhi penilaian?', a: 'Ya — bea masuk, permintaan lokal untuk merek tertentu, kekuatan mata uang, dan ukuran pasar membuat harga bervariasi antar negara. Kami mendukung banyak negara dan memberikan harga dalam mata uang lokal Anda.' },
  { q: 'Bagaimana cara menetapkan harga mobil saya sebelum dijual?', a: 'Gunakan alat penilaian AI gratis kami untuk mendapatkan angka acuan, lalu periksa iklan aktif mobil serupa di area Anda. Menetapkan harga 5-10% di atas harga minimum yang Anda terima biasanya memberi ruang untuk negosiasi.' },
  { q: 'Seberapa akurat penilaian dengan AI?', a: 'Menggunakan teknologi computer vision untuk mengidentifikasi mobil Anda secara akurat dari foto, lalu membandingkannya dengan data iklan nyata di negara yang Anda pilih. Anggap ini sebagai titik awal yang andal, bukan harga pasti — nilai sebenarnya bergantung pada pemeriksaan dan negosiasi.' },
  { q: 'Apakah alat penilaian mobil ini gratis?', a: 'Ya — tidak ada biaya, tidak perlu membuat akun, tidak ada batasan penggunaan.' },
];

export default function BerapaHargaMobilSayaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/alat" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Kembali">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Navigasi breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/beranda" className="hover:text-white/60 transition-colors">Beranda</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/alat" className="hover:text-white/60 transition-colors">Alat</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Berapa Harga Mobil Saya</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Dengan AI · Gratis
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Mobil Anda<br /><span className="text-amber-400">Bernilai Berapa?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Unggah satu foto — dapatkan perkiraan nilai pasar secara instan dalam mata uang Anda, berdasarkan data iklan nyata dan AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Analisis dari foto</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Indonesia dan seluruh dunia</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Gratis</span>
            </div>
          </div>
        </div>

        {/* ── Alat penilaian ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <BerapaHargaMobilSayaClient />
          </div>
        </div>

        {/* ── Konten SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Memahami Nilai Mobil</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Apa yang Menentukan Harga Mobil Bekas?
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
              Panduan Lengkap: Penilaian Mobil Bekas
            </h2>

            <p>Mengetahui nilai pasar sebenarnya dari mobil Anda adalah langkah paling penting sebelum memasang iklan jual, tukar tambah, atau negosiasi pembelian mobil, di mana pun Anda berada di dunia. Menetapkan harga terlalu tinggi membuat iklan Anda tidak dilirik dan hanya menumpuk tanpa peminat. Menetapkan harga terlalu rendah berarti Anda kehilangan uang sungguhan begitu saja. Masalahnya, <strong className="text-foreground">&ldquo;nilai pasar&rdquo; bukanlah angka tetap</strong> — nilainya berubah tergantung negara, mata uang, permintaan lokal untuk merek tertentu, serta riwayat dan kondisi unik setiap mobil.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Mengapa Mobil yang Sama Bisa Bernilai Berbeda di Setiap Negara</h3>
            <p>Toyota Corolla berusia lima tahun dalam kondisi baik bisa memiliki nilai yang cukup berbeda antar negara, bahkan sebelum konversi mata uang. Bea masuk dan pajak lokal atas mobil bekas sangat bervariasi antar negara. Beberapa pasar memiliki permintaan lokal yang kuat untuk merek tertentu, sehingga mempertahankan nilai jual kembali yang tinggi. Di pasar lain, pasokan mobil baru yang lebih besar membuat pembeli kurang tertarik pada mobil bekas, sehingga menurunkan nilai jual kembali. Karena itu, satu panduan harga global tidak akan akurat — penilaian perlu disesuaikan per negara.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Jarak Tempuh dan Riwayat Perawatan</h3>
            <p>Di hampir semua pasar, jarak tempuh dan riwayat perawatan yang tercatat adalah indikator kondisi mobil yang jauh lebih andal daripada yang bisa ditunjukkan sebuah foto. Mobil dengan jarak tempuh lebih rendah dan catatan perawatan lengkap biasanya memiliki keunggulan harga yang jelas dibandingkan mobil sejenis dengan jarak tempuh lebih tinggi, meskipun terlihat serupa dalam foto. Riwayat perawatan yang hilang atau tidak lengkap adalah salah satu cara tercepat bagi penjual untuk kehilangan daya tawar.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kepemilikan, Registrasi, dan Dokumen</h3>
            <p>Di setiap negara yang kami layani, <strong className="text-foreground">dokumen yang lengkap dan sah sangat penting untuk mendapatkan nilai terbaik</strong>. Pembeli secara wajar akan menawar lebih rendah untuk mobil dengan dokumen tidak lengkap, bea masuk yang belum dibayar, atau registrasi yang belum tuntas, karena risiko masalah pengalihan kepemilikan adalah nyata di setiap negara. Menyelesaikan masalah dokumen sebelum memasang iklan biasanya jauh lebih murah daripada potongan harga yang akan diminta pembeli jika tidak.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kondisi Keseluruhan dan Presentasi</h3>
            <p>Bodi yang bersih, tanpa goresan, karat, atau cat pudar, dengan mesin dan transmisi yang berfungsi baik secara mekanis, selalu menghasilkan harga lebih tinggi secara konsisten, baik mobil dijual di Jakarta, Surabaya, atau di mana pun, dibandingkan mobil sejenis dengan tanda pemakaian yang jelas. Perbaikan kecil berbiaya rendah — pembersihan menyeluruh, penanganan goresan kecil, penggantian lampu yang mati — sering kali memberikan nilai tambah berkali-kali lipat dari biayanya saat dihitung dalam harga jual akhir.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Mata Uang dan Waktu Pasar</h3>
            <p>Di negara yang sangat bergantung pada impor mobil bekas, harga mobil terkait erat dengan pergerakan nilai tukar — mata uang lokal yang melemah meningkatkan biaya impor dan mendorong harga mobil bekas naik, sementara mata uang yang lebih kuat memiliki efek sebaliknya. Ini berarti penilaian dari satu atau dua tahun lalu mungkin tidak lagi menjadi acuan yang andal untuk harga saat ini. Selalu periksa data pasar terbaru, bukan mengandalkan panduan harga lama atau jumlah yang pernah dibayar pemilik sebelumnya.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Bagaimana Alat Ini Bekerja</h3>
            <p>Unggah foto mobil Anda yang jelas dan pilih negara Anda. AI (Gemini Vision) akan mengidentifikasi merek, model, tahun, dan varian dari foto tersebut, lalu membandingkannya dengan data iklan nyata terbaru di pasar yang Anda pilih untuk memberikan kisaran harga dalam mata uang Anda, bukan angka tunggal. Hasilnya mencakup faktor spesifik yang memengaruhi penilaian, sehingga Anda memahami alasan di balik angka tersebut. Alat ini dirancang sebagai titik awal yang cepat dan gratis untuk negosiasi, bukan pengganti pemeriksaan langsung.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kesalahan Umum yang Membuat Harga Mobil Terlalu Rendah</h3>
            <p>Banyak penjual secara tidak sadar merugikan diri sendiri dengan hanya membandingkan harga terhadap satu atau dua iklan lama tanpa memeriksa kondisi pasar terkini. Kesalahan umum lainnya adalah mengabaikan riwayat perawatan saat memasang iklan — sekadar menyebutkan &ldquo;terawat&rdquo; tanpa bukti membuat pembeli meragukannya dan cenderung menawar lebih rendah. Foto yang kurang jelas atau diambil dalam pencahayaan buruk juga membuat calon pembeli sulit menilai kondisi sebenarnya, sehingga mereka menganggap ada yang disembunyikan. Menetapkan harga terlalu dekat dengan estimasi minimum juga menghilangkan ruang negosiasi yang wajar diharapkan pembeli, sehingga transaksi bisa terasa kaku sejak awal.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Pertanyaan yang Sering Diajukan</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Pertanyaan Paling Umum
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
              Alat Gratis Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/alat" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Semua Alat</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/beranda" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Beranda Bahasa Indonesia</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
