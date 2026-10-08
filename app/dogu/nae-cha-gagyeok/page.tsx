import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { NaeChaGagyeokClient } from './client';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: '내 차 얼마예요? 무료 AI 차량 가격 평가 | Naira Autos',
  description: 'AI로 무료 차량 가격 평가를 받아보세요. 사진 한 장만 업로드하면 몇 초 안에 시장 가격을 확인할 수 있습니다.',
  keywords: '내 차 얼마예요, 무료 차량 가격 평가, 중고차 가격, AI 차량 시세, 차량 가치 평가',
  openGraph: {
    title: '내 차 얼마예요? 무료 AI 차량 가격 평가',
    description: 'AI로 차량 가격을 평가받으세요. 사진 한 장만 업로드하면 즉시 시세 범위를 확인할 수 있습니다 — 완전 무료.',
    url: 'https://www.naira.autos/dogu/nae-cha-gagyeok',
    siteName: 'Naira Autos',
    locale: 'ko_KR',
    type: 'website',
  },
  alternates: alternatesFor('/dogu/nae-cha-gagyeok'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '내 차 얼마예요? 무료 AI 차량 가격 평가',
  description: '무료 AI 차량 가격 평가 도구. 국가별 시장 상황에 맞춰 몇 초 안에 시세를 확인하세요.',
  url: 'https://www.naira.autos/dogu/nae-cha-gagyeok',
  inLanguage: 'ko',
  dateModified: '2026-10-04',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'AI 차량 가격 평가 — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: '차량 사진을 업로드하면 AI가 즉시 해당 국가 통화로 시장 가격을 추정해 드립니다.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.naira.autos/hom' },
      { '@type': 'ListItem', position: 2, name: '도구', item: 'https://www.naira.autos/dogu' },
      { '@type': 'ListItem', position: 3, name: '내 차 얼마예요', item: 'https://www.naira.autos/dogu/nae-cha-gagyeok' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '내 중고차는 얼마의 가치가 있나요?', acceptedAnswer: { '@type': 'Answer', text: '브랜드, 모델, 연식, 트림, 주행거리, 전반적인 상태 그리고 해당 국가에서 비슷한 차량의 현재 판매 가격에 따라 달라집니다. 위에서 사진을 업로드하고 국가를 선택하면 AI가 차량을 인식하고 해당 시장의 실제 매물 데이터를 기반으로 통화 단위에 맞는 가격 범위를 제공합니다.' } },
      { '@type': 'Question', name: '중고차 가격 평가에 영향을 주는 요소는 무엇인가요?', acceptedAnswer: { '@type': 'Answer', text: '주요 요소는 다음과 같습니다: (1) 브랜드와 모델 — 시장에 따라 일부 차량은 가치를 더 잘 유지합니다. (2) 연식, 트림, 주행거리. (3) 차체와 도장 상태. (4) 기계적 상태와 정비 기록. (5) 완전한 서류와 등록. (6) 지역 수요와 공급 — 같은 차량이라도 국가에 따라 다른 가격에 판매될 수 있습니다.' } },
      { '@type': 'Question', name: '제가 사는 국가가 가격 평가에 영향을 주나요?', acceptedAnswer: { '@type': 'Answer', text: '네, 상당히 영향을 줍니다. 수입 관세, 특정 브랜드에 대한 지역 수요, 통화 강세, 중고차 시장 규모는 국가 간 큰 가격 차이를 만듭니다. 저희 도구는 여러 국가를 지원하며, 글로벌 평균이 아닌 해당 시장에 맞춘 현지 통화로 추정 가격을 제공합니다.' } },
      { '@type': 'Question', name: 'AI 가격 평가는 얼마나 정확한가요?', acceptedAnswer: { '@type': 'Answer', text: '저희 도구는 컴퓨터 비전 기술을 사용해 사진에서 브랜드, 모델, 연식, 트림을 정확하게 인식한 다음, 선택한 국가의 실제 매물 데이터와 비교하여 단일 숫자가 아닌 가격 범위를 제공합니다. 이는 협상을 위한 신뢰할 수 있는 출발점으로 생각하시면 되며, 정확한 가격은 아닙니다 — 실제 가치는 항상 직접 점검과 협상에 따라 달라집니다.' } },
      { '@type': 'Question', name: '이 가격 평가 도구는 완전히 무료인가요?', acceptedAnswer: { '@type': 'Answer', text: '네. 비용이 전혀 들지 않으며, 계정이 필요 없고, 사용 횟수에 제한도 없습니다.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: '브랜드와 잔존 가치', body: '잔존 가치는 시장마다 다릅니다 — 토요타와 혼다는 많은 지역에서 가치를 잘 유지하는 편이지만, 독일 고급 브랜드는 유지비가 높은 시장에서 더 빠르게 가치가 떨어질 수 있습니다. 브랜드 이름만큼 지역 수요도 중요합니다.' },
  { icon: Shield, title: '주행거리와 정비 기록', body: '낮은 주행거리와 기록된 정비 이력은 세계 어디서든 잘 관리된 차량을 나타내는 가장 신뢰할 수 있는 두 가지 지표입니다. 꾸준한 정비 기록은 1년 더 최신 연식의 차량보다 더 가치 있을 수 있습니다.' },
  { icon: CheckCircle2, title: '서류와 소유권', body: '어느 시장에서든 최고의 가격을 받으려면 완전하고 유효한 서류와 최신 등록 정보가 필수입니다. 서류 미비나 수입 관련 문제는 가격을 15%에서 25%까지 낮출 수 있습니다.' },
  { icon: AlertCircle, title: '전반적인 상태', body: '긁힘, 녹, 변색된 도장이 없는 깨끗한 차체와 기계적으로 잘 작동하는 엔진은 사용 흔적이 뚜렷한 비슷한 차량보다 꾸준히 10%에서 15% 더 높은 가격을 받습니다.' },
];

const FAQ_ITEMS = [
  { q: '내 중고차는 얼마의 가치가 있나요?', a: '브랜드, 모델, 연식, 트림, 주행거리, 상태 그리고 해당 국가의 비슷한 차량의 현재 판매 가격에 따라 달라집니다. 사진을 업로드하고 국가를 선택하면 통화에 맞는 AI 평가를 받을 수 있습니다.' },
  { q: '중고차 가격 평가에 영향을 주는 요소는 무엇인가요?', a: '브랜드와 모델, 연식과 트림, 주행거리, 차체와 엔진 상태, 완전한 서류, 그리고 해당 시장의 수요와 공급입니다.' },
  { q: '제가 사는 국가가 가격 평가에 영향을 주나요?', a: '네 — 수입 관세, 특정 브랜드에 대한 지역 수요, 통화 강세, 시장 규모가 국가 간 가격 차이를 만듭니다. 저희는 여러 국가를 지원하며 현지 통화로 가격을 제공합니다.' },
  { q: '판매하기 전에 적절한 판매 가격을 정하는 방법은?', a: '무료 AI 가격 평가 도구로 기준 숫자를 확인한 다음, 지역 내 비슷한 차량의 현재 매물을 살펴보세요. 최소 수락 가능 금액보다 5~10% 높게 책정하면 보통 협상 여지가 생깁니다.' },
  { q: 'AI 가격 평가는 얼마나 정확한가요?', a: '컴퓨터 비전으로 사진에서 차량을 정확히 인식한 다음, 선택한 국가의 실제 매물 데이터와 비교합니다. 신뢰할 수 있는 출발점으로 생각하시면 되며, 정확한 가격은 아닙니다 — 실제 가치는 점검과 협상에 따라 달라집니다.' },
  { q: '이 차량 가격 평가 도구는 무료인가요?', a: '네 — 비용 없음, 계정 불필요, 사용 제한 없음.' },
];

export default function NaeChaGagyeokPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-left">
              <Link href="/dogu" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="뒤로 가기">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="이동 경로" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/hom" className="hover:text-white/60 transition-colors">홈</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/dogu" className="hover:text-white/60 transition-colors">도구</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">내 차 얼마예요</span>
              </nav>
              <LanguagePills path="/dogu/nae-cha-gagyeok" className="ms-auto" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                AI 기반 · 무료
              </span>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              내 차는 얼마의<br /><span className="text-amber-400">가치가 있을까?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              사진 한 장만 업로드하면 — 실제 매물 데이터와 AI를 기반으로 즉시 시장 가격을 확인할 수 있습니다.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> 사진 기반 분석</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>대한민국 및 전 세계</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% 무료</span>
            </div>
          </div>
        </div>

        {/* ── 가격 평가 도구 ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <NaeChaGagyeokClient />
          </div>
        </div>

        {/* ── SEO 콘텐츠 ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">내 차의 가치 이해하기</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              중고차 가격은 무엇으로 결정될까?
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
              차량 가격 평가: 전체 가이드
            </h2>

            <p>세계 어디서든, 매물을 올리거나 보상 판매를 하거나 구매 협상을 하기 전에 내 차의 실제 시장 가격을 아는 것이 가장 중요한 첫 단계입니다. 가격을 너무 높게 책정하면 매물이 외면당하고 팔리지 않은 채 남게 됩니다. 반대로 너무 낮게 책정하면 실질적인 손해를 보게 됩니다. 문제는 <strong className="text-foreground">&lsquo;시장 가격&rsquo;이 고정된 숫자가 아니라는 점</strong>입니다 — 국가, 통화, 특정 브랜드에 대한 지역 수요, 그리고 각 차량의 고유한 이력과 상태에 따라 달라집니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">같은 차가 어디서나 같은 가격이 아닌 이유</h3>
            <p>상태가 좋은 5년 된 토요타 코롤라도 환율 변환 전부터 국가마다 상당히 다른 가치를 가질 수 있습니다. 중고차에 대한 수입 관세와 지역 세금은 국가마다 크게 다릅니다. 일부 시장에서는 특정 브랜드에 대한 강한 지역 수요가 있어 잔존 가치가 높게 유지됩니다. 다른 시장에서는 신차 공급이 많아 구매자들이 중고차에 대한 관심이 낮아지면서 잔존 가치가 낮아집니다. 이 때문에 하나의 글로벌 가격 가이드는 통하지 않으며, 가격 평가는 국가별로 맞춤화되어야 합니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">주행거리와 정비 기록</h3>
            <p>거의 모든 시장에서 주행거리와 기록된 정비 이력은 사진으로 보이는 것보다 훨씬 신뢰할 수 있는 차량 상태 지표입니다. 주행거리가 적고 완전한 정비 기록이 있는 차량은 사진상으로는 동일하게 보여도, 주행거리가 더 많은 비슷한 차량보다 명확한 가격 우위를 갖는 경우가 많습니다. 정비 기록이 없거나 불완전한 것은 판매자가 협상력을 가장 빠르게 잃는 요인 중 하나입니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">소유권, 등록, 서류</h3>
            <p>저희가 지원하는 모든 국가에서 <strong className="text-foreground">완전하고 유효한 서류는 최고의 가격을 받기 위해 필수적</strong>입니다. 서류가 불완전하거나, 수입 관세가 미납되었거나, 등록이 불완전한 차량에 대해 구매자가 더 낮은 가격을 제시하는 것은 당연합니다. 어느 국가에서든 소유권 이전 문제가 발생할 위험이 실제로 존재하기 때문입니다. 매물을 올리기 전에 서류 문제를 해결하는 것이 구매자가 요구할 할인보다 보통 훨씬 저렴합니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">전반적인 상태와 외관</h3>
            <p>긁힘, 녹, 변색된 도장이 없는 깨끗한 차체와 기계적으로 잘 작동하는 엔진 및 변속기는 차량이 서울, 부산 또는 다른 어느 곳에서 판매되든, 사용 흔적이 뚜렷한 비슷한 차량보다 꾸준히 더 높은 가격을 받습니다. 세심한 세차, 작은 긁힘 수리, 고장 난 전구 교체와 같은 작고 저렴한 수리는 최종 판매 가격에서 그 비용의 몇 배를 돌려받는 경우가 많습니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">환율과 시장 타이밍</h3>
            <p>수입 중고차에 크게 의존하는 국가에서는 차량 가격이 환율 변동과 밀접하게 연결되어 있습니다 — 자국 통화가 약세를 보이면 수입 비용이 상승해 중고차 가격을 끌어올리고, 통화가 강세를 보이면 반대 효과가 나타납니다. 이는 1~2년 전의 가격 평가가 현재 가격에는 더 이상 신뢰할 수 없다는 것을 의미합니다. 오래된 가격 가이드나 이전 소유자가 지불한 금액에 의존하지 말고, 항상 가장 최신의 시장 데이터를 확인하세요.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">이 도구는 어떻게 작동하나요</h3>
            <p>차량의 선명한 사진을 업로드하고 국가를 선택하세요. AI(Gemini Vision)는 사진에서 브랜드, 모델, 연식, 트림을 인식한 다음, 선택한 시장의 최신 실제 매물 데이터와 비교하여 단일 숫자가 아닌 통화 단위의 가격 범위를 제공합니다. 결과에는 가격 평가에 영향을 준 구체적인 요소가 포함되어 있어, 왜 그 숫자가 나왔는지 이해할 수 있습니다. 이 도구는 협상을 위한 빠르고 무료인 출발점으로 설계되었으며, 직접 점검을 대체하지는 않습니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">차량 가치를 낮추는 흔한 실수</h3>
            <p>많은 판매자가 현재 시장 상황을 살펴보지 않고 단 한두 개의 오래된 매물과만 가격을 비교해 자신도 모르게 손해를 봅니다. 또 다른 흔한 실수는 매물에 정비 기록을 언급하지 않는 것입니다 — 증거 없이 단순히 &lsquo;잘 관리했다&rsquo;고만 적으면 구매자는 의심을 품고 더 낮은 가격을 제시하게 됩니다. 흐릿하거나 조명이 나쁜 사진도 구매자가 실제 상태를 판단하기 어렵게 만들어 무언가를 숨기고 있다고 의심하게 합니다. 최소 예상 가격에 너무 가깝게 가격을 책정하는 것도 구매자가 당연히 기대하는 협상의 여지를 남기지 않아, 거래 시작부터 어려움을 겪게 할 수 있습니다.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">판매 전 체크리스트</h3>
            <p>평가를 받은 후, 광고를 올리기 전에 몇 가지 간단한 단계를 거치면 최종 판매 가격을 크게 높일 수 있습니다. 먼저 세차와 실내 청소를 꼼꼼히 하세요 — 깨끗한 차는 구매자에게 관리가 잘 되었다는 인상을 즉시 전달하며, 이는 사진에서도 그대로 드러납니다. 둘째, 가능한 모든 정비 영수증과 서류를 한곳에 모아두세요. 구매자가 직접 요청하기 전에 먼저 보여주면 신뢰가 쌓이고 협상에서 유리한 위치에 서게 됩니다. 셋째, 작은 결함은 광고를 올리기 전에 해결하는 것이 좋습니다 — 깨진 전구나 가벼운 흠집처럼 저렴하게 고칠 수 있는 문제를 방치하면, 구매자는 이를 더 큰 문제의 신호로 받아들여 실제 수리비보다 훨씬 큰 금액을 깎으려 할 수 있습니다. 마지막으로, 사진은 밝은 자연광에서 차량 전체가 보이도록 앞, 뒤, 양옆, 실내, 계기판을 포함해 여러 각도로 촬영하세요. 이런 작은 준비 과정은 몇 시간밖에 걸리지 않지만, 최종 판매 가격에 상당한 차이를 만들어낼 수 있습니다. 또한 번호판, 등록증, 보험 서류, 자동차 검사 기록처럼 구매자가 자연스럽게 물어볼 수 있는 서류를 미리 준비해두면 거래가 훨씬 매끄럽게 진행되고, 막판에 서류 문제로 거래가 깨지는 상황을 막을 수 있습니다.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">자주 묻는 질문</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              가장 많이 묻는 질문
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
              다른 무료 도구
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/dogu" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">모든 도구</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/hom" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">한국어 홈</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
