// app/dogu/dosi-gan-geori-gyesangi/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorSouthKoreaClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { KR_TOWNS, findTown } from '@/lib/distance-towns-kr';
import { KR_CAPITAL_DISTANCE_KM } from '@/lib/kr-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: "도시 간 거리 계산기 대한민국 2026 — 도로 거리",
  description: "서울, 부산, 대구, 광주 등 대한민국 23개 도시 간 도로 거리와 운전 시간을 계산하세요. 연료비 계산기 포함.",
  alternates: alternatesFor('/dogu/dosi-gan-geori-gyesangi'),
  openGraph: {
    title: "도시 간 거리 계산기 대한민국 2026",
    description: "대한민국 23개 도시 간 도로 거리와 운전 시간, 연료비 계산기 포함.",
    url: 'https://www.naira.autos/dogu/dosi-gan-geori-gyesangi',
    siteName: 'Naira Autos',
    locale: 'ko',
    type: 'website',
  },
  keywords: ["도시 간 거리", "서울 부산 거리", "서울 강릉 거리", "도로 거리 계산", "서울 부산 연료비"],
};

const HUB_TOWN = findTown("서울")!;

const FAQ = [{"q": "이 도구는 어떤 도시를 다루나요?", "a": "서울, 부산, 인천, 대구, 대전, 광주, 울산 등 전국 23개 주요 도시를 다룹니다."}, {"q": "운전 시간에 교통 상황이 반영되나요?", "a": "평균 속도를 기준으로 이상적인 시간과 더 현실적인 시간을 함께 보여 주며, 실시간 교통 정보는 아닙니다. 현재 교통 상황은 Google 지도에서 경로를 열어 확인하세요."}, {"q": "이 페이지의 수치는 얼마나 정확한가요?", "a": "모두 추정치이며 공식 자료와 대조한 값은 아닙니다. 대략적인 계획용으로 쓰시고, 실제 경로는 지도 앱에서 다시 확인하세요."}, {"q": "연료비도 계산할 수 있나요?", "a": "네. 위 계산기에서 차량 종류와 리터당 유가(원)를 고르면 거리가 예상 연료량과 비용으로 바로 변환됩니다."}];
const METHOD: string[] = ["이 페이지의 모든 거리는 추정치입니다. 도시 좌표 사이의 직선거리에 나이지리아의 검증된 도로 데이터로 보정한 우회 계수를 곱해 계산했습니다. 한국 전체를 아우르면서 여러 독립 출처로 확인되는 자료를 찾지 못해 어떤 경로도 \"확인됨\"으로 표시하지 않았습니다. 갖고 있지 않은 정확도를 내세우지 않기 위해서입니다.", "제주는 섬이라 육로로 연결되지 않으므로, 제주와 다른 도시 사이의 수치는 직선거리 기반 참고값일 뿐이며 실제로는 배나 비행기를 이용해야 합니다. 그 밖의 경로도 고속도로·국도·우회로 중 무엇을 택하느냐에 따라 실제 거리가 달라질 수 있으니, 장거리 이동 전에는 지도 앱에서 경로를 확인하세요."];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/dogu/dosi-gan-geori-gyesangi',
      name: "도시 간 거리 계산기 대한민국 2026 — 도로 거리",
      description: "대한민국 23개 도시 간 도로 거리와 운전 시간, 연료비 계산기 포함.",
      url: 'https://www.naira.autos/dogu/dosi-gan-geori-gyesangi',
      dateModified: '2026-10-02',
      inLanguage: 'ko',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: "도구", item: 'https://www.naira.autos/dogu' },
        { '@type': 'ListItem', position: 2, name: "대한민국", item: 'https://www.naira.autos/dogu/dosi-gan-geori-gyesangi' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'SoftwareApplication',
      name: "도시 간 거리 계산기 대한민국",
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'ko',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'KRW' },
    },
  ],
};

export default function DistanceCalculatorSouthKoreaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="ko" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/dogu"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="뒤로"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/dogu" className="hover:text-white/60 transition-colors">{"도구"}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">{"대한민국"}</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{"무료 · 23개 도시"}</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">{"최종 확인: 2026년 10월"}</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"도시 간 거리"}
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              {"서울, 부산, 대구, 광주 등 대한민국 23개 도시 간 도로 거리와 운전 시간을 계산하세요."}
            </p>
            <Link href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorSouthKoreaClient />
          </div>
        </div>
      </div>

      <div lang="ko" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"이 수치는 어디서 나왔나요"}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              {METHOD.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"실제로 도로에서 시간이 더 걸리는 이유"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {"실제 운전 시간은 거리만으로 짐작하는 것보다 길어지는 경우가 많습니다. 설날과 추석 연휴에는 경부고속도로를 비롯한 주요 노선이 크게 막히고, 주말 오후 서울 진입 구간도 정체가 심합니다. 고속도로 통행료는 하이패스 등으로 별도 부과되므로 연료비와 함께 예산에 넣어 두세요. 겨울에는 강원도와 산간 지역에 눈과 빙판길이 생겨 속도를 줄여야 할 수 있습니다. 이 수치를 계획의 기준으로 삼고, 출발 전에 최신 교통 상황을 확인하세요."}
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            {"검토: "}<Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>{", 자동차 영업 전문가. 모든 거리는 Haversine 공식 기반 추정치입니다."}
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"서울에서 각 도시까지의 거리 (가까운 순)"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{"이 도구의 나머지 22개 도시를 서울에서 가까운 순으로 정렬했습니다."}</p>
            <DistanceTable hub={HUB_TOWN} towns={KR_TOWNS} verifiedMatrix={KR_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"자주 묻는 질문 — 대한민국 도시 간 거리"}
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
