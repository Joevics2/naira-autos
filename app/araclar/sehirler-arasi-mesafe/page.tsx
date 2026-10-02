// app/araclar/sehirler-arasi-mesafe/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorTurkeyClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { TR_TOWNS, findTown } from '@/lib/distance-towns-tr';
import { TR_CAPITAL_DISTANCE_KM } from '@/lib/tr-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: 'Şehirler Arası Mesafe Hesaplama Türkiye 2026 — Karayolu Mesafesi',
  description: '35 Türkiye şehri arasındaki karayolu mesafesini ve sürüş süresini hesaplayın — İstanbul, Ankara, İzmir ve daha fazlası. KGM\'nin resmî mesafe cetvelinden doğrulanmış veriler, sürüş süresi ve yakıt maliyeti.',
  alternates: alternatesFor('/araclar/sehirler-arasi-mesafe'),
  openGraph: {
    title: 'Şehirler Arası Mesafe Hesaplama Türkiye 2026',
    description: '35 Türkiye şehri arasındaki karayolu mesafesi ve sürüş süresi, yakıt maliyeti hesaplayıcı ile.',
    url: 'https://www.naira.autos/araclar/sehirler-arasi-mesafe',
    locale: 'tr',
  },
  keywords: [
    'şehirler arası mesafe hesaplama', 'istanbul ankara arası kaç km', 'istanbul izmir arası kaç km',
    'karayolu mesafe hesaplama', 'yakıt maliyeti istanbul ankara', 'ankara antalya arası kaç km',
  ],
};

const istanbul = findTown('İstanbul')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/araclar/sehirler-arasi-mesafe',
      name: 'Şehirler Arası Mesafe Hesaplama Türkiye 2026 — Karayolu Mesafesi',
      description: '35 Türkiye şehri arasındaki karayolu mesafesi ve sürüş süresi, yakıt maliyeti hesaplayıcı ile.',
      url: 'https://www.naira.autos/araclar/sehirler-arasi-mesafe',
      dateModified: '2026-09-18',
      inLanguage: 'tr',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Araçlar', item: 'https://www.naira.autos/araclar' },
        { '@type': 'ListItem', position: 2, name: 'Türkiye', item: 'https://www.naira.autos/araclar/sehirler-arasi-mesafe' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'İstanbul ile Ankara arası kaç km?', acceptedAnswer: { '@type': 'Answer', text: 'Karayolları Genel Müdürlüğü\'nün (KGM) resmî İller Arası Mesafe Cetveli\'ne göre 453 km.' } },
        { '@type': 'Question', name: 'Resmî bir mesafe cetveli var mı?', acceptedAnswer: { '@type': 'Answer', text: 'Evet — KGM, 81 ilin tamamını kapsayan resmî bir karayolu mesafe cetveli yayınlıyor ve bu sayfada en çok sorulan 6 güzergâh doğrudan bu kaynaktan alınmıştır.' } },
        { '@type': 'Question', name: 'İstanbul ile İzmir arası neden farklı kaynaklarda farklı çıkıyor?', acceptedAnswer: { '@type': 'Answer', text: 'KGM\'nin resmî cetveli 566 km gösteriyor (standart iç güzergâh), ancak Osmangazi Köprüsü\'nden (O-5 otoyolu, 2016\'da açıldı) geçen daha yeni güzergâh yaklaşık 478-480 km. Bu bir hata değil, gerçekten iki farklı güzergâh farkı.' } },
        { '@type': 'Question', name: 'Yakıt maliyetini hesaplayabilir miyim?', acceptedAnswer: { '@type': 'Answer', text: 'Evet — yukarıdaki hesap makinesinde araç tipini ve güncel litre fiyatını (TL) seçin; mesafeyi doğrudan tahmini litre ve maliyete çevirir.' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Şehirler Arası Mesafe Hesaplama Türkiye',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorTurkeyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="tr" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/araclar"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Geri"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/araclar" className="hover:text-white/60 transition-colors">Araçlar</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Türkiye</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Ücretsiz · 35 Şehir</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Son kontrol: Eylül 2026</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Şehirler Arası Mesafe
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              35 Türkiye şehri arasındaki karayolu mesafesini ve sürüş süresini hesaplayın — İstanbul, Ankara, İzmir ve önemli bölge merkezleri.
            </p>
            <Link href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorTurkeyClient />
          </div>
        </div>
      </div>

      <div lang="tr" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Bu Sayılar Nereden Geliyor
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Türkiye, bu araçta yer alan diğer birçok ülkeden farklı olarak gerçek bir avantaja sahip: Karayolları Genel Müdürlüğü (KGM), 81 ilin tamamını kapsayan resmî bir İller Arası Mesafe Cetveli yayınlıyor ve bu cetvel yeni yollar açıldıkça güncelleniyor (bu yazı itibarıyla en son 3 Mart 2026 tarihli). Bu araçtaki 6 doğrulanmış güzergâh — İstanbul-Ankara, İstanbul-İzmir, İstanbul-Antalya, Ankara-Antalya, İzmir-Antalya ve İstanbul-Trabzon — KGM&rsquo;nin resmî cetvelinden doğrudan alınmıştır.</p>
              <p>Açıkça belirtmekte fayda var: İstanbul-İzmir için resmî cetvel 566&nbsp;km gösteriyor, ancak 2016&rsquo;da açılan Osmangazi Köprüsü (O-5 otoyolu) üzerinden geçen daha yeni güzergâhı kullanan bazı kaynaklar yaklaşık 478-480&nbsp;km veriyor. Bu bir hata değil — gerçekten iki farklı güzergâh arasındaki fark, bu aracın başka bir yerinde ele alınan Güney Afrika&rsquo;nın Durban-Cape Town iç/kıyı güzergâh farkına benzer bir durum. Burada resmî, devlet tarafından doğrulanmış rakam kullanılıyor ve fark açıkça belirtiliyor. Bu araçtaki 35 şehir arasındaki diğer tüm güzergâhlar, Nijerya&rsquo;nın tam olarak doğrulanmış yol matrisine göre kalibre edilmiş Haversine formülüne dayalı GPS tahminini kullanıyor.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Türkiye Yollarında Gerçekte Neler Zaman Kaybettirir
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              Türkiye&rsquo;nin otoyol ağı genel olarak iyi durumda, ancak bazı faktörler mesafenin işaret ettiğinden daha uzun sürelere yol açabilir. Bayram tatilleri (Ramazan ve Kurban Bayramı) ile yaz aylarında, özellikle sahil bölgelerine giden güzergâhlarda ciddi trafik yoğunluğu yaşanır. Otoyol köprü ve tünel geçişleri (Osmangazi Köprüsü, Avrasya Tüneli gibi) HGS/OGS ile ücretlendirilir ve bu maliyetler yakıt masrafına ek olarak bütçeye eklenmelidir. Doğu Anadolu&rsquo;daki dağlık bölgelerde kış aylarında kar ve buzlanma nedeniyle yol kapanmaları ve hız sınırlamaları görülebilir. Herhangi bir hesaplama aracında olduğu gibi, buradaki rakamları bir planlama temeli olarak kabul edin ve uzun bir yolculuktan önce güncel trafik durumunu kontrol edin.
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            İnceleyen: <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Otomotiv Satış Uzmanı. Doğrulanmış güzergâhlar KGM&rsquo;nin resmî İller Arası Mesafe Cetveli&rsquo;nden alınmıştır. Diğer tüm güzergâhlar Haversine formülüne dayalı tahminlerdir.
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              İstanbul&rsquo;dan Her Şehre Mesafe (Yakından Uzağa)
            </h2>
            <p className="text-sm text-gray-500 mb-4">Bu araçtaki diğer 34 şehir, İstanbul&rsquo;a en yakından en uzağa sıralanmıştır.</p>
            <DistanceTable hub={istanbul} towns={TR_TOWNS} verifiedMatrix={TR_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Sık Sorulan Sorular — Şehirler Arası Mesafe Türkiye
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'İstanbul ile Ankara arası kaç km?', a: "KGM'nin resmî İller Arası Mesafe Cetveli'ne göre 453 km." },
                { q: 'Resmî bir mesafe cetveli var mı?', a: 'Evet — KGM 81 ilin tamamını kapsayan resmî bir cetvel yayınlıyor, bu sayfadaki 6 popüler güzergâh doğrudan bu kaynaktan.' },
                { q: 'İstanbul-İzmir neden farklı kaynaklarda farklı?', a: 'Resmî cetvel 566 km (standart iç güzergâh), ancak Osmangazi Köprüsü üzerinden yeni güzergâh yaklaşık 478-480 km - gerçek bir güzergâh farkı, hata değil.' },
                { q: 'İzmir ile Antalya arası kaç km?', a: "KGM'nin resmî cetveline göre 447 km." },
                { q: 'Yakıt maliyetini hesaplayabilir miyim?', a: 'Evet — araç tipini ve güncel litre fiyatını (TL) seçin; mesafeyi doğrudan tahmini litre ve maliyete çevirir.' },
              ].map(({ q, a }) => (
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
