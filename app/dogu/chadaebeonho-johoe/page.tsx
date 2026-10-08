import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientKo from '@/components/VINCheckerClientKo';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: '차대번호(VIN) 무료 조회 — 제조사, 모델, 연식 즉시 확인',
  description: '차대번호(VIN)를 무료로 조회하세요. 제조사, 모델, 연식, 엔진, 생산 국가를 즉시 확인할 수 있습니다 — 가입 불필요. 수입차 구매 전 확인용으로 적합합니다.',
  keywords: ['차대번호 무료 조회', 'vin 조회 무료', '차대번호 확인 방법', 'vin 디코더 무료', '수입차 차대번호 조회', '차대번호 위치', 'vin 번호 확인', '차량 식별번호 조회', '미국 중고차 차대번호', 'vin 차대번호 차이'],
  alternates: alternatesFor('/dogu/chadaebeonho-johoe'),
  openGraph: {
    title: '차대번호(VIN) 무료 조회 | Naira Autos',
    description: '어떤 차량이든 차대번호로 제조사, 모델, 연식, 엔진, 원산지 정보를 무료로 즉시 확인하세요.',
    url: 'https://www.naira.autos/dogu/chadaebeonho-johoe',
    locale: 'ko_KR',
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/dogu/chadaebeonho-johoe',
      name: '차대번호(VIN) 무료 조회 — 제조사, 모델, 연식 즉시 확인',
      description: '차대번호(VIN)를 무료로 조회 — 제조사, 모델, 연식, 엔진, 생산 국가.',
      url: 'https://www.naira.autos/dogu/chadaebeonho-johoe',
      inLanguage: 'ko',
      dateModified: '2026-10-06',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.naira.autos/hom' },
        { '@type': 'ListItem', position: 2, name: '도구', item: 'https://www.naira.autos/dogu' },
        { '@type': 'ListItem', position: 3, name: '차대번호 조회', item: 'https://www.naira.autos/dogu/chadaebeonho-johoe' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '자동차의 차대번호(VIN)란 무엇인가요?', acceptedAnswer: { '@type': 'Answer', text: '차대번호, 즉 VIN(Vehicle Identification Number)은 모든 차량이 생산될 때 부여받는 고유한 17자리 코드입니다. 생산 국가, 제조사, 차종, 엔진, 연식, 조립 공장, 그리고 고유한 일련번호가 담겨 있습니다. 한국에서는 자동차등록증에 기재되어 있으며, 엔진룸이나 운전석 문틀 안쪽에서도 확인할 수 있습니다.' } },
        { '@type': 'Question', name: '차대번호를 무료로 조회하는 방법은?', acceptedAnswer: { '@type': 'Answer', text: '위 입력란에 17자리 차대번호를 입력하고 "조회하기"를 클릭하세요. 저희 무료 조회 도구는 미국 도로교통안전국(NHTSA)의 공개 데이터베이스를 이용해 제조사, 모델, 연식, 엔진 사양, 변속기 종류, 생산 공장을 보여줍니다 — 완전 무료이며 가입이나 로그인 없이 어느 나라에서든 이용할 수 있습니다.' } },
        { '@type': 'Question', name: '차대번호는 차량 어디에서 확인할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '차대번호는 세 곳에서 확인할 수 있습니다: 운전석 쪽 앞유리 너머로 보이는 계기판, 운전석 문틀 안쪽의 스티커, 그리고 엔진룸 안 차체에 직접 각인된 번호입니다. 자동차등록증에도 기재되어 있습니다. 이 세 곳의 번호가 모두 정확히 일치해야 합니다.' } },
        { '@type': 'Question', name: 'VIN과 차대번호는 같은 건가요?', acceptedAnswer: { '@type': 'Answer', text: '네, 완전히 동일한 17자리 코드입니다. VIN(Vehicle Identification Number)은 국제적으로 쓰이는 용어이고, "차대번호"는 한국어에서 일상적으로 쓰이는 표현입니다. 수입차를 다룰 때는 "VIN 코드"라는 표현도 자주 사용됩니다.' } },
        { '@type': 'Question', name: '미국에서 수입된 차량에도 이 도구를 사용할 수 있나요?', acceptedAnswer: { '@type': 'Answer', text: '네 — 바로 이 경우가 가장 흔한 사용 사례입니다. 원래 미국, 캐나다, 멕시코 시장용으로 생산된 차량은 정상적으로 조회되며, 이는 구매대행이나 해외 경매를 통해 들여오는 픽업트럭과 클래식카의 상당수를 포함합니다. 유럽이나 다른 지역 전용으로 생산된 차량은 대개 NHTSA 데이터베이스에 없는데, 이 경우 자동차365나 카히스토리 같은 국내 조회 서비스를 참고하시면 됩니다.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: '차대번호(VIN) 무료 조회', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function ChadaebeonhoJohoePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/dogu" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="뒤로가기">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/hom" className="hover:text-white/60 transition-colors">홈</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/dogu" className="hover:text-white/60 transition-colors">도구</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">차대번호 조회</span>
            </nav>
            <LanguagePills path="/dogu/chadaebeonho-johoe" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% 무료</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NHTSA 데이터 기반</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              차대번호(VIN)<br /><span className="text-blue-400">무료로 즉시 조회</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">차대번호만으로 차량 정보를 몇 초 만에 확인하세요.</p>
            <p className="text-white/75 text-sm leading-relaxed">계기판, 문틀, 차체에 적힌 17자리 차대번호를 입력하세요. 제조사, 모델, 연식, 엔진 사양, 생산 국가를 무료로, 가입 없이 확인할 수 있습니다. 수입차나 구매대행 차량을 살 때 확인용으로 유용합니다.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientKo />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>모든 중고차를 위한 무료 차대번호 조회</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>저희 <strong className="text-foreground">무료 차대번호 조회 도구</strong>는 미국 도로교통안전국(NHTSA)의 공개 데이터베이스를 이용합니다. <strong className="text-foreground">무료 조회</strong>를 통해 제조사, 모델, 연식, 엔진 사양, 변속기 종류, 차체 유형, 조립 공장까지 확인할 수 있습니다. 구매 전, 그 중고차가 정말 설명대로의 차량인지 확인하는 데 필요한 모든 정보입니다.</p>
                  <p>중고차 시장은 점점 더 국제화되고 있습니다. 미국, 캐나다, 멕시코용으로 생산된 차량은 끊임없이 수출되고 재등록됩니다 — 구매대행을 통해 들여오는 픽업트럭이나 경매로 낙찰받은 클래식카가 대표적입니다. 차대번호는 공장에서 각인되어 절대 바뀌지 않기 때문에, 원래 북미 시장용으로 생산된 차량이라면 어느 나라로 가든 무료 조회는 동일하게 작동합니다.</p>
                  <p>여기서 핵심은 이것입니다. 차대번호는 여러분의 나라가 부여하는 번호판이 아닙니다 — 차량이 공장을 떠나기 훨씬 전, 생산 라인에서 새겨지는 제조상의 신분증입니다. 차량이 수출되거나, 재등록되거나, 새 번호판을 달거나, 여러 번 소유주가 바뀌어도 이 번호는 변하지 않습니다. 그래서 무료 차대번호 조회는 번호판으로는 절대 할 수 없는 방식으로 국경을 넘어 차량을 추적할 수 있습니다.</p>
                  <p>대부분의 사람은 가격 협상이 끝난 뒤에야 차대번호를 조회합니다 — 하지만 올바른 순서는 차를 직접 보러 가기 전, 계약금을 내기 전에 조회하고, 인도 후에도 다시 한번 확인해 인수 과정에서 아무것도 바뀌지 않았는지 확인하는 것입니다. 비용은 전혀 들지 않고 1분도 걸리지 않습니다.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>수입차를 사신다면, 먼저 이것부터 하세요</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>수입차 구매는 국내차 구매에는 없는 추가 위험을 안고 있습니다. 서류, 판매자, 차량의 실제 상태가 한 번도 가본 적 없는 나라에서 온 것일 수 있기 때문입니다. 무료 차대번호 조회가 실물 점검을 대신하지는 못하지만, 다음 단계로 넘어가기 전 비용 없이 걸러낼 수 있는 가장 저렴한 1차 필터입니다.</p>
                  <p>먼저 차대번호를 조회하고, 그 결과 — 연식, 모델, 엔진, 트림 — 를 판매자가 설명한 내용과 정확히 비교해 보세요. 여기서 발견되는 작은 차이, 예를 들어 엔진이 다르다는 사실조차도 광고 사진과 실제 서류가 같은 차량의 것이 아니라는 첫 번째 신호인 경우가 많습니다. 그 다음에는 계기판의 번호가 차체에 각인된 번호, 그리고 문틀 스티커의 번호와 실물로 일치하는지 확인하세요. 이 세 곳이 서로 다르다면 차대번호가 조작되었다는 가장 명확한 신호 중 하나입니다.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>차대번호 vs VIN — 같은 건가요?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>네, 완전히 동일한 17자리 코드입니다. <strong className="text-foreground">VIN</strong>(Vehicle Identification Number)은 국제적으로 쓰이는 용어이고, <strong className="text-foreground">차대번호</strong>는 한국에서 일상적으로, 그리고 자동차등록증에서 공식적으로 쓰이는 표현입니다. 수입차 업계에서는 "VIN 코드"라는 표현도 널리 쓰입니다.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>차대번호 읽는 법: 각 자리가 의미하는 것</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17자리는 무작위가 아닙니다. 1~3번째 자리는 제조사와 생산 국가를 나타냅니다 — 이를 통해 조회 도구는 해당 차량이 미국, 캐나다, 멕시코 중 어디서 생산됐는지 알 수 있습니다. 4~8번째 자리는 차종을 설명합니다: 차체, 엔진, 시리즈입니다. 9번째 자리는 수학적으로 계산된 체크 디지트로, 잘못 옮겨 적었거나 조작된 차대번호를 찾아내는 데 쓰입니다. 10번째 자리는 연식을 나타내며, 12~17번째 자리는 차량 고유의 생산 일련번호를 구성합니다.</p>
                  <p>조회 도구가 있어도 이 구조를 직접 읽을 줄 아는 것은 여전히 유용합니다. 결과를 몇 초 만에 다시 확인할 수 있기 때문입니다. 10번째 자리가 2015년식을 가리키는데 판매자가 2018년식이라고 설명했다면, 직접 물어보는 것이 좋습니다 — 이는 의심이 아니라 비용 없이 30초면 끝나는 확인일 뿐입니다.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>포드, 토요타, 혼다, 쉐보레 등 모든 브랜드에 적용</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>이 도구는 특정 브랜드 전용이 아닙니다. NHTSA의 제조사 데이터베이스에서 직접 정보를 가져오기 때문에, 포드, 토요타, 혼다, 쉐보레, GMC, 닛산, 지프, 현대 등 북미 시장에서 판매되는 모든 브랜드에 동일하게 작동합니다. 17자리 코드를 붙여넣기만 하면 — 브랜드를 따로 지정할 필요 없이 — 도구가 자동으로 올바른 제조사 체계를 인식합니다.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>차대번호 조회 vs 전체 이력 조회</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">무료 차대번호 조회</strong>는 그 차량이 공장에서 출고될 당시의 모습 — 즉 생산 제원을 보여줍니다. 그 이후 무슨 일이 있었는지 — 사고 이력, 조작된 주행거리, 전손이나 침수 이력 — 을 알려면 Carfax나 카히스토리 같은 유료 <strong className="text-foreground">이력 조회</strong>가 필요합니다. 금액이 큰 중고차를 구매할 때는 이 무료 제원 조회에 더해 유료 이력 조회를 함께 받아보시길 강력히 권장합니다.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>차대번호 조회 — 자주 묻는 질문</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: '이 조회는 정말 무료인가요?', a: '네. NHTSA의 공개 API를 이용한 100% 무료 서비스입니다. 계정이나 로그인이 필요 없으며, 어느 나라에서든 원하는 만큼 조회할 수 있습니다.' },
                { q: '차량의 차대번호는 어디에 쓰이나요?', a: '차대번호는 특정 차량을 식별해 제원을 확인하고, 이력을 조회하고, 등록하고, 보험에 가입하고, 리콜 여부를 확인하는 데 쓰입니다. 한국에서는 자동차등록증에 기재되며 소유권 이전 시에도 필요합니다.' },
                { q: '차대번호로 제원을 무료로 확인할 수 있나요?', a: '네. 저희 무료 도구는 미국, 캐나다, 멕시코 사양 차량에 대해 NHTSA 제조사 데이터베이스에서 제조사, 모델, 연식, 엔진, 차체 유형, 변속기, 원산지 정보를 비용 없이 보여줍니다.' },
                { q: '미국에서 수입된 차량에도 사용할 수 있나요?', a: '네, 원래 북미 시장용으로 생산된 차량이라면 모두 가능합니다 — 구매대행을 이용하는 픽업트럭이나 클래식카 수입자들 사이에서 흔한 경우입니다. 유럽 전용 사양 차량은 조회되지 않을 수 있습니다.' },
                { q: '차대번호가 진짜인지 어떻게 확인하나요?', a: '유효한 차대번호는 정확히 17자로, 알파벳(A-Z, I·O·Q 제외)과 숫자로만 구성됩니다. 9번째 자리는 수학적으로 계산되는 체크 디지트입니다. 이 값이 맞지 않으면 번호가 조작된 것입니다. 이 도구는 이를 자동으로 검증합니다.' },
                { q: '조회해도 결과가 나오지 않으면 어떻게 하나요?', a: '대개는 그 차량이 유럽, 아시아 또는 다른 지역 전용 사양으로 생산되어 NHTSA 데이터베이스에 없다는 뜻입니다. 그래도 연식은 차대번호 10번째 자리에서 계산됩니다. 이런 경우 제조사의 공식 VIN 조회 서비스를 이용해 보세요.' },
                { q: '엔진 번호와 차대번호는 같은 건가요?', a: '아닙니다. 엔진 번호는 엔진 블록 자체에 각인되어 그 엔진만을 식별하지만, 차대번호(VIN)는 차량 전체를 식별합니다. 이 도구는 차대번호를 조회하는 것이며, 별도로 각인되는 엔진 번호는 다루지 않습니다.' },
                { q: '차대번호가 수입 관세에 영향을 주나요?', a: '간접적으로는 그렇습니다. 많은 나라가 차량의 연식과 배기량을 기준으로 수입 관세를 계산하는데, 이 두 정보 모두 차대번호에서 확인됩니다. 관세를 계산하기 전에 정확히 조회해 두면 잘못된 수치로 예산을 잡는 일을 피할 수 있습니다.' },
                { q: '차대번호 조회로 사고 이력을 알 수 있나요?', a: '아니요. 무료 조회는 제조사, 모델, 연식, 엔진, 원산지 등 생산 제원만 보여줍니다. 사고 이력, 주행거리, 전손 여부를 확인하려면 Carfax나 카히스토리 같은 유료 이력 조회가 필요합니다.' },
                { q: '차대번호로 도난 차량인지 알 수 있나요?', a: '이 도구로는 알 수 없습니다. 도난 차량 조회는 경찰과 보험사의 영역입니다 — 미국의 NICB(보험범죄국)는 이를 위해 VINCheck라는 무료 도구를 별도로 제공하며, 이는 제원 조회 도구와는 다른 서비스입니다.' },
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
              다른 무료 도구
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/dogu/gasang-jeongbisa" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">AI 정비사</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/dogu/naege-gajang-joeun-cha" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">나에게 가장 좋은 차</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/dogu/dosi-gan-geori-gyesangi" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">도시 간 거리 계산기</p>
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
