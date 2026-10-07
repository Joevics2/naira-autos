// app/cong-cu/khoang-cach-giua-cac-thanh-pho/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorVietnamClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { VN_TOWNS, findTown } from '@/lib/distance-towns-vn';
import { VN_CAPITAL_DISTANCE_KM } from '@/lib/vn-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: "Tính Khoảng Cách Giữa Các Thành Phố Việt Nam 2026 — Khoảng Cách Đường Bộ",
  description: "Tính khoảng cách đường bộ và thời gian lái xe giữa 24 thành phố ở Việt Nam — Hà Nội, TP. Hồ Chí Minh, Đà Nẵng và nhiều nơi khác, kèm công cụ tính chi phí xăng.",
  alternates: alternatesFor('/cong-cu/khoang-cach-giua-cac-thanh-pho'),
  openGraph: {
    title: "Tính Khoảng Cách Giữa Các Thành Phố Việt Nam 2026",
    description: "Khoảng cách đường bộ và thời gian lái xe giữa 24 thành phố ở Việt Nam, kèm công cụ tính chi phí xăng.",
    url: 'https://www.naira.autos/cong-cu/khoang-cach-giua-cac-thanh-pho',
    siteName: 'Naira Autos',
    locale: 'vi',
    type: 'website',
  },
  keywords: ["khoảng cách giữa các thành phố", "hà nội sài gòn bao nhiêu km", "hà nội đà nẵng bao nhiêu km", "tính khoảng cách đường bộ", "chi phí xăng hà nội sài gòn"],
};

const HUB_TOWN = findTown("Hà Nội")!;

const FAQ = [{"q": "Công cụ này bao gồm những thành phố nào?", "a": "Công cụ bao gồm 24 thành phố lớn trên cả nước, trong đó có Hà Nội, TP. Hồ Chí Minh, Đà Nẵng, Cần Thơ, Huế, Nha Trang và Đà Lạt."}, {"q": "Thời gian lái xe có tính đến tắc đường không?", "a": "Công cụ hiển thị hai mức: thời gian lý tưởng và thời gian thực tế hơn, dựa trên tốc độ trung bình, nhưng không phải dữ liệu giao thông trực tiếp. Hãy mở tuyến trong Google Maps để xem tình hình giao thông hiện tại."}, {"q": "Số liệu trên trang này chính xác đến đâu?", "a": "Tất cả đều là số ước tính, chưa được đối chiếu với nguồn chính thức, phù hợp để lập kế hoạch sơ bộ. Hãy kiểm tra lộ trình thực tế trên Google Maps trước khi đi."}, {"q": "Tôi có thể tính chi phí xăng không?", "a": "Có — chọn loại xe và giá xăng mỗi lít (₫) trong công cụ ở trên, khoảng cách sẽ được đổi thành số lít và chi phí ước tính."}];
const METHOD: string[] = ["Toàn bộ khoảng cách trên trang này là số ước tính. Chúng tôi tính từ khoảng cách đường thẳng giữa tọa độ các thành phố, rồi nhân với hệ số đường quanh co được hiệu chỉnh từ ma trận đường bộ đã xác minh của Nigeria. Chúng tôi chưa tìm được nguồn bao phủ mọi tuyến ở Việt Nam và được xác nhận bởi nhiều nguồn độc lập, nên không đánh dấu tuyến nào là \"đã xác minh\" thay vì tuyên bố độ chính xác mà mình không có.", "Khoảng cách thực tế có thể lệch đáng kể tùy tuyến bạn chọn (cao tốc, quốc lộ 1 hay đường tắt). Hãy kiểm tra lộ trình trên Google Maps trước các chuyến đi dài."];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/cong-cu/khoang-cach-giua-cac-thanh-pho',
      name: "Tính Khoảng Cách Giữa Các Thành Phố Việt Nam 2026 — Khoảng Cách Đường Bộ",
      description: "Khoảng cách đường bộ và thời gian lái xe giữa 24 thành phố ở Việt Nam, kèm công cụ tính chi phí xăng.",
      url: 'https://www.naira.autos/cong-cu/khoang-cach-giua-cac-thanh-pho',
      dateModified: '2026-10-02',
      inLanguage: 'vi',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: "Công cụ", item: 'https://www.naira.autos/cong-cu' },
        { '@type': 'ListItem', position: 2, name: "Việt Nam", item: 'https://www.naira.autos/cong-cu/khoang-cach-giua-cac-thanh-pho' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'SoftwareApplication',
      name: "Tính Khoảng Cách Giữa Các Thành Phố Việt Nam",
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'vi',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'VND' },
    },
  ],
};

export default function DistanceCalculatorVietnamPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="vi" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link prefetch={false}
              href="/cong-cu"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Quay lại"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/cong-cu" className="hover:text-white/60 transition-colors">{"Công cụ"}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">{"Việt Nam"}</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{"Miễn phí · 24 thành phố"}</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">{"Kiểm tra lần cuối: Tháng 10/2026"}</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Khoảng Cách Giữa Các Thành Phố"}
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              {"Tính khoảng cách đường bộ và thời gian lái xe giữa 24 thành phố ở Việt Nam, từ Hà Nội, Đà Nẵng đến TP. Hồ Chí Minh và Cần Thơ."}
            </p>
            <Link prefetch={false} href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorVietnamClient />
          </div>
        </div>
      </div>

      <div lang="vi" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Số liệu này đến từ đâu"}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              {METHOD.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Điều thực sự làm chậm chuyến đi trên đường Việt Nam"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {"Thời gian lái xe thực tế thường dài hơn con số khoảng cách gợi ý. Dịp Tết Nguyên đán và các kỳ nghỉ lễ, các tuyến Bắc–Nam kẹt xe rất nặng. Nhiều đoạn cao tốc và quốc lộ có trạm thu phí, nên hãy tính phí này cùng chi phí xăng. Ở miền Trung, mùa mưa bão có thể gây ngập và sạt lở, còn các đèo dốc như đèo Hải Vân buộc xe phải đi chậm. Hãy xem các con số ở đây như cơ sở để lập kế hoạch và kiểm tra tình hình giao thông mới nhất trước khi đi."}
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            {"Đánh giá bởi "}<Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>{", chuyên gia bán xe ô tô. Mọi khoảng cách đều là ước tính theo công thức Haversine."}
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Khoảng cách từ Hà Nội đến từng thành phố (gần đến xa)"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{"23 thành phố còn lại trong công cụ, sắp xếp từ gần đến xa so với Hà Nội."}</p>
            <DistanceTable hub={HUB_TOWN} towns={VN_TOWNS} verifiedMatrix={VN_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"Câu hỏi thường gặp — Khoảng cách giữa các thành phố Việt Nam"}
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
