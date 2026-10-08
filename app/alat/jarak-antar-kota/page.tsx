// app/alat/jarak-antar-kota/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorIndonesiaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { ID_TOWNS, findTown } from '@/lib/distance-towns-id';
import { ID_CAPITAL_DISTANCE_KM } from '@/lib/id-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Kalkulator Jarak Antar Kota Indonesia 2026 — Jarak Jalan Darat',
  description: 'Hitung jarak jalan darat dan waktu tempuh antara 28 kota di Indonesia — Jakarta, Bandung, Surabaya, Malang dan lainnya. Rute Jawa terverifikasi dari beberapa sumber, plus kalkulator biaya BBM.',
  alternates: alternatesFor('/alat/jarak-antar-kota'),
  openGraph: {
    title: 'Kalkulator Jarak Antar Kota Indonesia 2026',
    description: 'Jarak jalan darat dan waktu tempuh antara 28 kota di Indonesia, dengan kalkulator biaya BBM.',
    url: 'https://www.naira.autos/alat/jarak-antar-kota',
    siteName: 'Naira Autos',
    locale: 'id',
    type: 'website',
  },
  keywords: [
    'jarak antar kota', 'jarak jakarta bandung', 'jarak jakarta surabaya berapa km',
    'jarak surabaya malang', 'kalkulator jarak', 'biaya bensin jakarta bandung',
  ],
};

const jakarta = findTown('Jakarta')!;

const FAQ = [
  { q: 'Berapa jarak Jakarta ke Bandung?', a: 'Sekitar 150 km lewat Tol Jakarta-Cikampek dan Tol Cipularang. Beberapa sumber menyebut 140-166 km, tergantung titik awal dan akhir di dalam kota.' },
  { q: 'Berapa jarak Jakarta ke Surabaya?', a: 'Sekitar 782 km lewat Tol Trans Jawa dari pusat kota ke pusat kota. Angka 760 km yang sering dikutip adalah panjang ruas tol dari gerbang ke gerbang, jadi memang lebih pendek.' },
  { q: 'Berapa jarak Surabaya ke Malang?', a: 'Sekitar 97 km lewat jalan tol (Surabaya-Gempol, Gempol-Pandaan, dan Pandaan-Malang).' },
  { q: 'Kenapa rute antar pulau hanya perkiraan?', a: 'Indonesia adalah negara kepulauan, jadi tidak ada jalan darat yang menghubungkan, misalnya, Jakarta dan Makassar. Untuk pasangan kota seperti itu, angka yang ditampilkan hanya perkiraan berbasis garis lurus, bukan jarak jalan sebenarnya.' },
  { q: 'Bisakah saya menghitung biaya BBM?', a: 'Ya — pilih jenis kendaraan dan harga per liter (Rp) di kalkulator di atas; jarak langsung dikonversi menjadi perkiraan liter dan biaya.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/alat/jarak-antar-kota',
      name: 'Kalkulator Jarak Antar Kota Indonesia 2026 — Jarak Jalan Darat',
      description: 'Jarak jalan darat dan waktu tempuh antara 28 kota di Indonesia, dengan kalkulator biaya BBM.',
      url: 'https://www.naira.autos/alat/jarak-antar-kota',
      dateModified: '2026-10-02',
      inLanguage: 'id',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Alat', item: 'https://www.naira.autos/alat' },
        { '@type': 'ListItem', position: 2, name: 'Indonesia', item: 'https://www.naira.autos/alat/jarak-antar-kota' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Kalkulator Jarak Antar Kota Indonesia',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'id',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
    },
  ],
};

export default function DistanceCalculatorIndonesiaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="id" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link prefetch={false}
              href="/alat"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Kembali"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/alat" className="hover:text-white/60 transition-colors">Alat</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Indonesia</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Gratis · 28 Kota</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Terakhir dicek: Oktober 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Jarak Antar Kota
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Hitung jarak jalan darat dan waktu tempuh antara 28 kota di Indonesia — Jakarta, Bandung, Surabaya, Malang, dan kota besar lainnya.
            </p>
            <Link prefetch={false} href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorIndonesiaClient />
          </div>
        </div>
      </div>

      <div lang="id" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Dari Mana Angka-Angka Ini Berasal
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Berbeda dengan negara yang punya tabel jarak resmi untuk semua provinsi, kami tidak menemukan satu sumber resmi yang mencakup seluruh Indonesia. Jadi hanya tiga rute di Pulau Jawa yang kami tandai &ldquo;terverifikasi&rdquo;, masing-masing dicocokkan dengan minimal dua penerbit Indonesia yang independen: Jakarta-Bandung (sekitar 150&nbsp;km), Jakarta-Surabaya (sekitar 782&nbsp;km), dan Surabaya-Malang (sekitar 97&nbsp;km, panjang ruas tol menurut data BPJT).</p>
              <p>Satu perbedaan perlu dijelaskan: Jakarta-Surabaya sering ditulis 760&nbsp;km. Angka itu adalah panjang ruas Tol Trans Jawa dari gerbang ke gerbang, sedangkan 782&nbsp;km dihitung dari pusat kota ke pusat kota — keduanya benar, hanya titik ukurnya berbeda. Jakarta-Yogyakarta sengaja tidak kami tandai terverifikasi karena sumber yang ada berbeda (sekitar 550 sampai 575&nbsp;km) dan belum ada angka resmi yang menengahi.</p>
              <p>Semua rute lain menggunakan perkiraan berbasis rumus Haversine yang dikalibrasi dengan matriks jalan terverifikasi Nigeria. Karena Indonesia adalah negara kepulauan, untuk pasangan kota di pulau yang berbeda (misalnya Jakarta-Makassar) angka itu hanya perkiraan dari garis lurus — tidak ada jalan darat yang menghubungkannya, dan perjalanan nyata membutuhkan kapal atau pesawat.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Yang Sebenarnya Memakan Waktu di Jalan
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Jarak di peta jarang sama dengan waktu di jalan. Tol Jakarta-Cikampek terkenal padat, terutama saat akhir pekan, libur panjang, dan arus mudik Lebaran, sehingga Jakarta-Bandung yang idealnya sekitar dua jam bisa menjadi tiga jam atau lebih. Perjalanan jauh di Tol Trans Jawa juga berarti biaya tol yang cukup besar di luar BBM, jadi anggarkan keduanya. Di luar Jawa, kondisi jalan dan lalu lintas bisa sangat bervariasi, dan waktu tempuh di Sumatera atau Kalimantan sering lebih lama dari yang ditunjukkan jaraknya. Anggap angka di sini sebagai dasar perencanaan, dan cek kondisi lalu lintas terbaru sebelum berangkat.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Ditinjau oleh: <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Pakar Penjualan Otomotif. Rute terverifikasi dicocokkan dengan beberapa penerbit Indonesia; rute lain adalah perkiraan berbasis rumus Haversine.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Jarak dari Jakarta ke Setiap Kota (Dekat ke Jauh)
            </h2>
            <p className="text-sm text-gray-500 mb-4">27 kota lain di alat ini, diurutkan dari yang terdekat ke terjauh dari Jakarta. Kota di pulau lain hanya perkiraan garis lurus.</p>
            <DistanceTable hub={jakarta} towns={ID_TOWNS} verifiedMatrix={ID_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Pertanyaan Umum — Jarak Antar Kota Indonesia
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
