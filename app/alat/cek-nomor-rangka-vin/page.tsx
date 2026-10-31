import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientId from '@/components/VINCheckerClientId';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Cek Nomor Rangka (VIN) Gratis — Lihat Merek, Model, Tahun & Asal Mobil',
  description: 'Cek nomor rangka (VIN) mobil gratis. Lihat merek, model, tahun pembuatan, mesin, dan negara asal dalam hitungan detik — tanpa daftar. Cocok untuk mobil bekas impor dan mobil lelang Amerika.',
  keywords: ['cek nomor rangka gratis', 'cek vin mobil gratis', 'cara cek nomor rangka mobil', 'decode vin gratis', 'nomor rangka mobil impor', 'letak nomor rangka mobil', 'nomor rangka dan nomor mesin', 'cek nomor rangka mobil bekas', 'nomor rangka mobil lelang amerika', 'arti nomor rangka mobil'],
  alternates: alternatesFor('/alat/cek-nomor-rangka-vin'),
  openGraph: {
    title: 'Cek Nomor Rangka (VIN) Gratis | Naira Autos',
    description: 'Lihat merek, model, tahun, mesin, dan asal mobil dari nomor rangka — gratis dan instan.',
    url: 'https://www.naira.autos/alat/cek-nomor-rangka-vin',
    locale: 'id_ID',
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/alat/cek-nomor-rangka-vin',
      name: 'Cek Nomor Rangka (VIN) Gratis — Lihat Merek, Model, Tahun & Asal Mobil',
      description: 'Cek nomor rangka (VIN) mobil gratis — merek, model, tahun pembuatan, mesin, dan negara asal.',
      url: 'https://www.naira.autos/alat/cek-nomor-rangka-vin',
      inLanguage: 'id',
      dateModified: '2026-10-24',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://www.naira.autos/beranda' },
        { '@type': 'ListItem', position: 2, name: 'Alat', item: 'https://www.naira.autos/alat' },
        { '@type': 'ListItem', position: 3, name: 'Cek Nomor Rangka', item: 'https://www.naira.autos/alat/cek-nomor-rangka-vin' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Apa itu nomor rangka (VIN) mobil?', acceptedAnswer: { '@type': 'Answer', text: 'Nomor rangka, atau VIN (Vehicle Identification Number), adalah kode unik 17 karakter yang diberikan kepada setiap kendaraan saat diproduksi. Kode ini memuat negara asal, pabrikan, jenis kendaraan, mesin, tahun model, pabrik perakitan, dan nomor urut produksi. Di Indonesia, nomor rangka tercantum di STNK pada kolom "Nomor Rangka/NIK/VIN" dan juga di BPKB.' } },
        { '@type': 'Question', name: 'Bagaimana cara cek nomor rangka mobil secara gratis?', acceptedAnswer: { '@type': 'Answer', text: 'Masukkan 17 karakter nomor rangka pada kolom di atas lalu klik "Decode". Alat gratis kami memakai database publik NHTSA (otoritas keselamatan lalu lintas Amerika Serikat) untuk menampilkan merek, model, tahun, spesifikasi mesin, jenis transmisi, dan pabrik asal — gratis, tanpa daftar, dari negara mana pun.' } },
        { '@type': 'Question', name: 'Di mana letak nomor rangka pada mobil?', acceptedAnswer: { '@type': 'Answer', text: 'Nomor rangka ada di tiga tempat: dasbor (terlihat dari balik kaca depan di sisi pengemudi), stiker pada rangka pintu pengemudi, dan dipahat pada rangka di ruang mesin. Nomor ini juga tercantum di STNK dan BPKB. Ketiga lokasi fisik harus sama persis, dan harus cocok dengan dokumen.' } },
        { '@type': 'Question', name: 'Apakah nomor rangka sama dengan VIN?', acceptedAnswer: { '@type': 'Answer', text: 'Ya, keduanya kode 17 karakter yang sama. "VIN" adalah istilah internasional, sedangkan "nomor rangka" adalah sebutan sehari-hari di Indonesia. Mobil buatan lokal biasanya diawali huruf M, misalnya MHF, sesuai kode negara Indonesia.' } },
        { '@type': 'Question', name: 'Apakah alat ini bisa dipakai untuk mobil impor dari Amerika?', acceptedAnswer: { '@type': 'Answer', text: 'Bisa — inilah penggunaan yang paling umum. Mobil yang awalnya diproduksi untuk pasar Amerika Serikat, Kanada, atau Meksiko akan ter-decode normal, termasuk banyak pickup, SUV, dan mobil klasik Amerika yang masuk lewat lelang seperti Copart dan IAAI. Mobil buatan lokal (nomor rangka berawalan M) atau produksi khusus pasar Eropa dan Asia biasanya tidak ada di database NHTSA; untuk itu, rujukannya adalah STNK, BPKB, dan pengecekan di Samsat.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Cek Nomor Rangka (VIN) Gratis', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function CekNomorRangkaVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/alat" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Kembali">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/beranda" className="hover:text-white/60 transition-colors">Beranda</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/alat" className="hover:text-white/60 transition-colors">Alat</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Cek Nomor Rangka</span>
            </nav>
            <LanguagePills path="/alat/cek-nomor-rangka-vin" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Data NHTSA</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Cek Nomor Rangka (VIN)<br /><span className="text-blue-400">Gratis dan Instan</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Lihat data mobil dari nomor rangka dalam hitungan detik.</p>
            <p className="text-white/75 text-sm leading-relaxed">Masukkan 17 karakter nomor rangka dari dasbor, pintu, atau rangka mobil. Dapatkan merek, model, tahun, spesifikasi mesin, dan negara asal — gratis, tanpa daftar. Berguna saat membeli mobil bekas impor atau mobil lelang Amerika.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientId />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cek Nomor Rangka Gratis untuk Semua Mobil Bekas</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Alat cek nomor rangka gratis</strong> ini memakai database publik NHTSA, otoritas keselamatan lalu lintas Amerika Serikat. Sekali <strong className="text-foreground">cek nomor rangka</strong> memberi Anda merek, model, tahun, spesifikasi mesin, jenis transmisi, tipe bodi, dan pabrik perakitan — semua yang dibutuhkan untuk memastikan mobil bekas benar-benar seperti yang dijual, sebelum Anda membelinya.</p>
                  <p>Pasar mobil bekas makin mendunia. Mobil yang dibuat untuk pasar Amerika Serikat, Kanada, atau Meksiko terus diekspor dan didaftarkan ulang — misalnya pickup, SUV, dan mobil klasik Amerika yang masuk ke Indonesia lewat lelang seperti Copart dan IAAI. Karena nomor rangka dipahat di pabrik dan tidak pernah berubah, satu kali cek gratis bekerja sama saja ke mana pun mobil itu berakhir, selama aslinya dibuat untuk pasar Amerika Utara.</p>
                  <p>Inilah poin pentingnya: nomor rangka bukan pelat nomor yang diberikan negara Anda — ia adalah identitas pabrik yang ditanamkan di lini perakitan, jauh sebelum mobil keluar dari pabrik. Nomor itu tidak berubah saat mobil diekspor, dibalik nama, berganti pelat, atau berpindah tangan berkali-kali. Karena itu, cek nomor rangka bisa melacak sebuah mobil lintas negara dengan cara yang tidak mungkin dilakukan oleh nomor polisi.</p>
                  <p>Kebanyakan orang baru mengecek nomor rangka setelah harga disepakati — padahal yang benar adalah mengecek sebelum melihat mobilnya, sebelum membayar tanda jadi, dan sekali lagi setelah serah terima untuk memastikan tidak ada yang tertukar. Gratis, dan kurang dari satu menit.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cek Nomor Rangka Sebelum Beli Mobil Impor</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Membeli mobil impor membawa risiko tambahan yang tidak ada pada pembelian lokal: dokumen, penjual, dan kondisi asli mobil bisa berasal dari negara yang belum pernah Anda kunjungi. Cek nomor rangka gratis memang tidak menggantikan pemeriksaan fisik oleh montir, tetapi ia penyaring pertama yang paling murah — tanpa biaya sebelum Anda melangkah lebih jauh.</p>
                  <p>Mulailah dengan men-decode nomor rangka, lalu bandingkan hasilnya — tahun, model, mesin, varian — dengan persis apa yang dikatakan penjual. Selisih sekecil apa pun, misalnya mesinnya berbeda, sering kali menjadi tanda pertama bahwa foto iklan dan dokumen asli bukan berasal dari mobil yang sama. Setelah itu, cocokkan secara fisik nomor di dasbor dengan nomor yang dipahat di rangka dan stiker di pintu, lalu dengan STNK dan BPKB. Ketidakcocokan di antara titik-titik itu adalah salah satu tanda paling jelas dari nomor rangka yang dimanipulasi.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Nomor Rangka di Indonesia: STNK, BPKB, dan Samsat</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Di Indonesia, nomor rangka tercetak pada STNK di kolom "Nomor Rangka/NIK/VIN" dan pada halaman identitas kendaraan di BPKB, bersebelahan dengan nomor mesin. Dalam proses balik nama dan pengecekan fisik di Samsat, nomor pada kendaraan, STNK, dan BPKB harus identik. Mobil produksi lokal biasanya berawalan huruf M (misalnya MHF), sedangkan awalan lain menandakan produksi luar negeri — sehingga alat ini paling berguna untuk kendaraan yang awalnya dibuat untuk pasar Amerika Utara.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Nomor Rangka vs Nomor Mesin — Apa Bedanya?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Nomor rangka (VIN) dan nomor mesin adalah dua hal berbeda. <strong className="text-foreground">Nomor rangka</strong> mengidentifikasi seluruh kendaraan dan dipahat pada rangka, sedangkan <strong className="text-foreground">nomor mesin</strong> dipahat pada blok mesin dan hanya mengidentifikasi mesinnya. Jika mesin pernah diganti secara sah, nomor mesin bisa berbeda dari aslinya, tetapi nomor rangka tetap sama sepanjang usia mobil. Alat ini men-decode nomor rangka, bukan nomor mesin.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cara Membaca Nomor Rangka: Arti Setiap Bagian</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17 karakter itu tidak acak. Posisi 1–3 menunjukkan pabrikan dan negara perakitan — dari sinilah alat ini tahu apakah mobil dibuat di Amerika Serikat, Kanada, Meksiko, atau tempat lain. Posisi 4–8 menjelaskan kendaraannya: bodi, mesin, dan seri. Posisi 9 adalah digit cek yang dihitung secara matematis untuk mendeteksi nomor yang salah salin atau dipalsukan. Posisi 10 menyandikan tahun model, dan posisi 12–17 adalah nomor produksi unik kendaraan.</p>
                  <p>Bisa membaca bagian-bagian ini sendiri tetap berguna meski sudah ada alat decode, karena Anda bisa memverifikasi hasilnya dalam hitungan detik. Jika posisi 10 menunjukkan model 2015 padahal penjual menyebutnya 2018, tanyakan langsung — itu bukan tuduhan, hanya pengecekan gratis yang memakan waktu tiga puluh detik.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Untuk Semua Merek — Ford, Toyota, Honda, Chevrolet, dan Lainnya</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Ini bukan alat khusus satu merek. Karena membaca langsung dari database pabrikan NHTSA, satu alat yang sama bekerja untuk Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai, dan merek apa pun yang dijual di pasar Amerika Utara. Cukup tempel 17 karakternya — alat akan mengenali skema pabrikan yang tepat secara otomatis, tanpa perlu Anda menyebut mereknya.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cek Nomor Rangka vs Laporan Riwayat Kendaraan Lengkap</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Cek nomor rangka gratis</strong> menunjukkan kondisi mobil saat keluar pabrik — spesifikasi produksinya. Untuk mengetahui apa yang terjadi sejak saat itu — kecelakaan, odometer yang diputar mundur, status total loss atau terendam banjir — Anda memerlukan <strong className="text-foreground">laporan riwayat kendaraan</strong> berbayar seperti Carfax atau AutoCheck. Untuk pembelian mobil bekas bernilai besar, laporan berbayar sangat dianjurkan sebagai pelengkap cek spesifikasi gratis ini.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cek Nomor Rangka — Pertanyaan yang Sering Diajukan</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Apakah cek nomor rangka ini benar-benar gratis?', a: 'Ya. 100% gratis lewat API publik NHTSA. Tidak perlu akun atau login. Anda boleh mengecek sebanyak yang dibutuhkan, dari negara mana pun.' },
                { q: 'Untuk apa nomor rangka mobil digunakan?', a: 'Nomor rangka mengidentifikasi kendaraan secara unik untuk memeriksa spesifikasi, riwayat, pendaftaran, asuransi, dan pemberitahuan recall. Di Indonesia, nomor rangka wajib cocok dengan STNK dan BPKB saat balik nama dan cek fisik di Samsat.' },
                { q: 'Bisakah melihat spesifikasi mobil dari nomor rangka secara gratis?', a: 'Bisa. Alat gratis kami menampilkan merek, model, tahun, mesin, tipe bodi, transmisi, dan asal langsung dari database pabrikan NHTSA, tanpa biaya, untuk kendaraan berspesifikasi Amerika Serikat, Kanada, atau Meksiko.' },
                { q: 'Apakah bisa untuk mobil impor dari Amerika ke Indonesia?', a: 'Bisa, untuk kendaraan apa pun yang awalnya dibuat untuk pasar Amerika Utara — kasus yang umum di kalangan importir pickup, SUV, dan mobil klasik lewat lelang. Kendaraan berspesifikasi khusus Eropa mungkin tidak muncul.' },
                { q: 'Bagaimana tahu nomor rangka itu asli?', a: 'Nomor rangka yang valid terdiri dari tepat 17 karakter — huruf (A–Z, tanpa I, O, Q) dan angka. Posisi 9 adalah digit cek matematis. Jika tidak cocok, nomor telah dimanipulasi. Alat ini memeriksanya secara otomatis.' },
                { q: 'Bagaimana jika hasil cek tidak muncul?', a: 'Biasanya artinya mobil itu produksi Eropa, Asia, lokal, atau spesifikasi khusus pasar lain — di luar database NHTSA. Tahun model tetap dihitung dari posisi 10 nomor rangka. Dalam kasus ini, hubungi layanan VIN resmi pabrikan atau cek lewat Samsat.' },
                { q: 'Apakah nomor mesin sama dengan nomor rangka?', a: 'Tidak. Nomor mesin dipahat pada blok mesin dan hanya mengidentifikasi mesin itu, sedangkan nomor rangka mengidentifikasi seluruh kendaraan. Alat ini men-decode nomor rangka, bukan nomor mesin.' },
                { q: 'Apakah nomor rangka memengaruhi bea masuk?', a: 'Secara tidak langsung, ya. Banyak negara menghitung bea masuk berdasarkan usia dan kapasitas mesin, dua hal yang dikonfirmasi oleh nomor rangka. Men-decode dengan benar sebelum menghitung bea membantu Anda tidak merencanakan dengan angka yang keliru.' },
                { q: 'Apakah cek nomor rangka menunjukkan mobil pernah kecelakaan?', a: 'Tidak. Cek gratis hanya menampilkan spesifikasi produksi — merek, model, tahun, mesin, dan asal. Riwayat kecelakaan, odometer, dan status total loss memerlukan laporan berbayar seperti Carfax atau AutoCheck.' },
                { q: 'Bisakah mengetahui mobil curian lewat nomor rangka?', a: 'Tidak lewat alat ini. Pengecekan kendaraan curian adalah ranah kepolisian dan perusahaan asuransi — NICB (lembaga anti-penipuan asuransi Amerika Serikat) menyediakan alat gratis bernama VINCheck untuk keperluan itu, terpisah dari alat decode spesifikasi.' },
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
              Alat Gratis Lainnya
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/alat/montir-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Montir Virtual AI</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/alat/berapa-harga-mobil-saya" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Berapa Harga Mobil Saya?</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/alat/jarak-antar-kota" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Jarak Antar Kota</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
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
