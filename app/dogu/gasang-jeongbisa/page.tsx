import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientKO from './client';
import { alternatesFor } from '@/lib/hreflang';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'AI 정비사 — 무료 온라인 자동차 진단 | Naira Autos',
  description: '인공지능 기반 무료 가상 정비사. 고장 증상을 설명하고 사진, 소리, 영상을 업로드하면 즉시 진단과 수리 비용을 받을 수 있습니다. 가입이 필요 없습니다.',
  alternates: alternatesFor('/dogu/gasang-jeongbisa'),
  openGraph: {
    title: 'Axion — 무료 AI 가상 정비사 | Naira Autos',
    description: '어디에 있든 즉시 온라인 자동차 진단을 받아보세요. 엔진 소리, 사진을 업로드하거나 고장 증상을 설명하세요. 긴급도, 가능한 원인, 다음 단계, 수리 비용을 확인하세요. 무료, 가입 불필요.',
    url: 'https://www.naira.autos/dogu/gasang-jeongbisa',
    locale: 'ko_KR',
    type: 'website',
  },
  keywords: ['가상 정비사', '무료 온라인 정비사', '온라인 자동차 진단', '무료 자동차 진단', '내 차 왜 이래', '온라인 정비소', '온라인으로 정비사에게 묻기', '자동차 수리 비용 계산', 'AI 정비사', '온라인 자동차 점검', '엔진 소리 진단', '자동차 수리 비용 견적'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/dogu/gasang-jeongbisa',
      name: 'AI 정비사 — 무료 온라인 자동차 진단',
      description: '인공지능 기반 무료 가상 정비사. 엔진 소리, 사진을 업로드하거나 고장 증상을 설명하세요. 긴급도와 수리 비용을 포함한 즉시 진단을 받아보세요.',
      url: 'https://www.naira.autos/dogu/gasang-jeongbisa',
      inLanguage: 'ko',
      dateModified: '2026-09-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: 'https://www.naira.autos/hom' },
          { '@type': 'ListItem', position: 2, name: '도구', item: 'https://www.naira.autos/dogu' },
          { '@type': 'ListItem', position: 3, name: 'AI 정비사', item: 'https://www.naira.autos/dogu/gasang-jeongbisa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '가상 정비사란 무엇이고 어떻게 작동하나요?',
          acceptedAnswer: { '@type': 'Answer', text: '가상 정비사는 인공지능을 이용해 원격으로 자동차 고장을 진단하는 도구입니다. 문제를 설명하고 원한다면 사진, 소리, 영상을 업로드하면, AI가 방대한 알려진 고장 패턴 데이터베이스와 대조하여 긴급도와 예상 수리 비용이 포함된 진단을 제공합니다.' },
        },
        {
          '@type': 'Question',
          name: 'AI가 엔진 소리만으로 제 차를 진단할 수 있나요?',
          acceptedAnswer: { '@type': 'Answer', text: '네. 딸깍거리는 소리, 끽끽거리는 소리, 마찰음을 녹음하세요 — 스마트폰으로 10초만 녹음해도 충분합니다. AI가 소리 패턴을 분석해서 예를 들어 베어링 마모, 브레이크 패드 마모, 또는 다른 특정 고장을 식별할 수 있습니다.' },
        },
        {
          '@type': 'Question',
          name: '무료인가요?',
          acceptedAnswer: { '@type': 'Answer', text: '네. 완전 무료입니다 — 가입도, 구독도, 결제도 필요 없습니다. 페이지에 접속해서 바로 진단을 시작하세요.' },
        },
        {
          '@type': 'Question',
          name: 'AI 진단이 항상 정확한가요?',
          acceptedAnswer: { '@type': 'Answer', text: '아니요 — 항상 100% 정확하지는 않습니다. 당신이 제공한 설명, 사진, 소리, 영상을 바탕으로 한 좋은 출발점이지만, 리프트와 스캐너를 이용한 실제 점검에서만 발견할 수 있는 것들을 놓칠 수도 있습니다. 최종 답이 아니라 초기 소견으로 여기시고, 진단 결과와 관계없이 브레이크, 조향, 연료 계통 고장에는 항상 직접 자격을 갖춘 정비사를 찾아가세요.' },
        },
        {
          '@type': 'Question',
          name: 'BMW, 벤츠, 도요타 등 다른 브랜드에도 사용할 수 있나요?',
          acceptedAnswer: { '@type': 'Answer', text: '네. BMW, 벤츠, 도요타 또는 다른 어떤 브랜드의 고장이든 물어보세요 — AI는 모든 주요 제조사를 다룹니다. 수리 비용은 나이지리아 시장을 기준으로 산정되었으니, 다른 국가에 계시다면 정확한 현지 금액이 아닌 일반적인 참고 자료로 활용하세요.' },
        },
        {
          '@type': 'Question',
          name: '카톡방이나 자동차 커뮤니티에 묻는 것과 같은가요?',
          acceptedAnswer: { '@type': 'Answer', text: '여러 면에서 더 낫습니다. 커뮤니티나 채팅방에서는 텍스트 설명만 보고 한 사람의 의견을 얻는 것에 그칩니다. 저희 가상 정비사는 당신의 설명을 업로드한 사진, 소리, 영상과 함께 분석하고, 수천 개의 알려진 고장 패턴과 비교하여 확률 순으로 정렬된 진단과 신뢰도를 제공합니다.' },
        },
        {
          '@type': 'Question',
          name: '제 대화 기록이 서버에 저장되나요?',
          acceptedAnswer: { '@type': 'Answer', text: '아니요. 전체 기록은 브라우저의 로컬 저장소를 이용해 당신의 기기에만 저장됩니다. 저희는 진단을 위해 보낸 활성 메시지 외에는 서버에 아무것도 저장하지 않습니다. 언제든지 사이드 메뉴에서 기록을 삭제할 수 있습니다.' },
        },
        {
          '@type': 'Question',
          name: '어떤 자동차 브랜드든 수리 비용을 받을 수 있나요?',
          acceptedAnswer: { '@type': 'Answer', text: '네. 도요타, 혼다, 벤츠, 렉서스, 기아, 현대, BMW, 미쓰비시, 닛산, 포드, Innoson, 푸조 등 어디서 운전하시든 모든 주요 브랜드를 다룹니다. 비용은 대략적인 국제 참고 자료입니다.' },
        },
        {
          '@type': 'Question',
          name: '근처 출장 정비사나 정비소가 필요하다면 어떻게 하나요?',
          acceptedAnswer: { '@type': 'Answer', text: '저희 도구는 먼저 문제를 진단해서, 검색을 시작하기 전에 정확히 무엇을 요청해야 할지 알려드립니다. 고장이 실제 점검이나 특수 장비를 필요로 한다면, 명확하게 알려드립니다.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — AI 가상 정비사',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: '인공지능 기반 무료 가상 정비사. 고장 증상을 설명하고 엔진 소리나 사진을 업로드하면, 나이지리아 시장 기준으로 산정된 수리 비용과 함께 즉시 진단을 받을 수 있습니다.',
      url: 'https://www.naira.autos/dogu/gasang-jeongbisa',
      inLanguage: 'ko',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageKO() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientKO />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">최종 확인: 2026년 9월</p>

          {/* 전체 기능 */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">전체 기능</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              가상 정비사가 제공하는 기능
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              빠른 수리 비용 견적이 필요하든, 정비소에 가기 전에 온라인으로 정비사에게 물어보고 싶든, 자동차 수리에 얼마나 들지 계산하고 싶든 — 이 도구가 모두 무료로 해결해 드립니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: '엔진 고장 진단', desc: '노킹 소리, 실화, 불안정한 공회전, 과열, 엔진 점검 표시등 — AI가 확률 순으로 정렬된 가장 가능성 높은 원인을 식별합니다.' },
                { title: '소리 및 오디오 분석', desc: '딸깍거리는 소리, 끽끽거리는 소리, 마찰음의 녹음을 업로드하세요. AI가 소리 패턴을 분석해 고장을 식별합니다.' },
                { title: '즉시 긴급도 확인', desc: '모든 진단에는 4단계로 명확한 판정이 제공됩니다: 운전해도 안전함, 주의 깊게 지켜보기, 빨리 정비사 방문, 지금 즉시 운행 중단.' },
                { title: '온라인 수리 비용 견적', desc: '비용은 참고용으로 나이지리아 시장 기준으로 산정되었습니다 — 실제 부품 및 공임 비용은 국가와 도시마다 다릅니다. 이를 출발점으로 삼고 현지에서 견적을 받으세요.' },
                { title: '직접 해결 가능한 단계', desc: '고장이 직접 점검하거나 고칠 수 있는 것이라면, 정비사에게 돈을 쓰기 전에 정확한 방법을 알려드립니다.' },
                { title: '지속적인 대화', desc: '추가 질문을 하고 전체 맥락을 바탕으로 답변을 받으세요. 모든 세션은 사용자의 기기에 저장됩니다.' },
                { title: '모든 브랜드 지원', desc: '도요타, 혼다, 벤츠, 렉서스, 기아, 현대, BMW, 미쓰비시, 닛산, 포드, Innoson, 푸조 및 그 외 모든 브랜드와 시장.' },
                { title: '사진 및 영상으로 진단', desc: '계기판 경고등, 이상한 누유, 또는 눈에 보이는 손상의 사진을 보내세요. 미디어를 추가할 때마다 진단의 신뢰도가 크게 높아집니다.' },
                { title: '부품 식별', desc: '모든 진단에는 관련 가능성이 가장 높은 특정 부품이 포함되어 있어, 어느 정비소나 부품 매장에서든 정확히 무엇을 요청해야 하는지 알 수 있습니다.' },
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
                인공지능 가상 정비사란 무엇인가요?
              </h2>
              <p className="mb-3"><strong className="text-foreground">가상 정비사</strong>는 말 그대로입니다: 직접 만나는 대신 텍스트, 사진, 소리, 영상으로 대화하는 정비사입니다. 냉간 시동 시 나는 이상한 소리, 꺼지지 않는 엔진 점검 표시등, 물렁하게 느껴지는 브레이크 등 자동차에 무슨 일이 일어나고 있는지 설명하면, 몇 초 안에 실제 자동차 고장에 대한 깊은 지식을 바탕으로 한 답변을 받을 수 있습니다.</p>
              <p>저희 AI 정비사인 Axion은 모든 브랜드와 모든 국가에서 작동하지만, 나이지리아에서 운전하는 분들을 위한 추가 장점이 있습니다: 가짜 연료가 인젝터에 어떤 영향을 미치는지, 열대 지역의 더위가 고무 씰을 얼마나 빨리 마모시키는지, 도로의 움푹 파인 곳이 다른 시장보다 서스펜션을 얼마나 빨리 손상시키는지 이해합니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                1분도 안 되어 자동차 진단을 받는 방법
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. 고장 증상을 설명하세요.</strong> 무슨 일이 일어나고 있는지 적으세요 — 자세할수록 좋습니다. 언제 시작됐나요? 차가 차가울 때만, 가속할 때만, 핸들을 돌릴 때만 발생하나요?</p>
                <p><strong className="text-foreground">2. 사진, 녹음, 영상을 업로드하세요 (선택 사항이지만 매우 유용합니다).</strong> 엔진 소리의 10초 녹음이 종종 긴 문단의 설명보다 더 유용합니다.</p>
                <p><strong className="text-foreground">3. 즉시 진단을 받으세요.</strong> 긴급도, 확률 순으로 정렬된 가능한 원인, 직접 점검할 수 있는 것, 예상 수리 비용까지.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                수리 비용: 바가지 쓰지 않는 법
              </h2>
              <p className="mb-3">정비소에서 바가지를 쓰는 가장 흔한 방법 중 하나는 수리 비용이 얼마여야 하는지 모른 채 방문하는 것입니다. 정비소를 방문하기 전에, 저희의 <strong className="text-foreground">수리 비용</strong> 견적을 이용해 적정 가격이 얼마인지 확인하세요 — 부품과 공임이 명확히 구분되어 있습니다.</p>
              <p>이 견적은 브랜드, 모델, 연식 등 당신의 특정 차량과, 설명을 바탕으로 한 가장 가능성 높은 고장을 고려합니다. 이는 일반적인 숫자가 아닙니다: 오일 압력이 낮은 18만 km 주행한 2010년식 캠리는 같은 표시등이 켜진 4만 km 주행한 2020년식 캠리와 다른 견적을 받게 됩니다. 가능성 높은 원인이 다르기 때문입니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                모든 브랜드에서 작동: 도요타, BMW, 벤츠, 혼다 등
              </h2>
              <p className="mb-3">어떤 차를 몰든 상관없습니다. AI는 도요타, 혼다, BMW, 벤츠, 현대, 기아, 닛산, 포드, 미쓰비시, 폭스바겐 등 오늘날 도로를 달리는 거의 모든 브랜드에 대해 특정 고장 패턴을 가지고 있습니다. 브랜드, 모델, 연식을 한 번만 알려주면, 진단은 모든 차에 똑같이 적용되는 일반적인 답변 대신 그 특정 차량의 그 주행거리에서 알려진 고장에 맞춰 조정됩니다.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                엔진 소리로 진단하는 것이 모든 것을 바꾸는 이유
              </h2>
              <p className="mb-3">설명은 주관적입니다 — "이상한 소리"는 사람마다 다른 것을 의미합니다. 소리는 그렇지 않습니다. 냉간 시동 시 나는 노킹 소리는 브레이크를 밟을 때 나는 끽끽거리는 소리와 다르게 들리고, 이는 또 핸들을 돌릴 때 나는 마찰음과도 다릅니다. 10초 녹음을 업로드하면, AI는 텍스트만으로 가능한 것보다 훨씬 더 정확한 진단을 제공합니다.</p>
              <p>전문 장비가 필요 없습니다. 스마트폰 마이크로 충분합니다 — 엔진을 켠 상태에서 소리의 원천 가까이에 대고 녹음한 다음 업로드하세요.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">지원 차량</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', '트럭', '버스', '오토바이'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">핵심 정보</h3>
              <ul className="space-y-2.5">
                {[
                  '100% 무료 — 구독 없음',
                  '계정이나 가입 불필요',
                  '모바일과 컴퓨터 모두 지원',
                  '국제 참고 수리 비용',
                  '24시간 연중무휴 이용 가능 — 일요일도 포함',
                  '대화 기록은 로컬에 저장',
                  '추가 질문 무제한',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Naira Autos의 다른 도구</h3>
              <ul className="space-y-2">
                {[
                  { label: '무료 자동차 가치 평가', href: '/evaluate-car' },
                  { label: '엔진 소리 분석기', href: '/tools/engine-sound-analyzer' },
                  { label: '수입 관세 계산기', href: '/tools/import-duty-calculator' },
                  { label: '서류 체크리스트', href: '/tools/vehicle-papers-checklist' },
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

          {/* 추가 지능 */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">추가 지능</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  현지 도로 상황에도 맞춰 조정됨
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  진단은 어디서 운전하든 동일하게 작동합니다. 하지만 대부분의 가상 정비사 도구는 서구 정비소 데이터로만 학습되어 있습니다 — 나이지리아의 가짜 연료가 제조사가 예상한 것보다 40% 더 빠르게 오일 점도를 떨어뜨리거나, 라고스의 도로가 15만 km는 버텨야 할 등속 조인트를 3만 km 만에 망가뜨릴 수 있다는 사실을 모릅니다.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion은 이것도 알고 있습니다. 주유 후 도요타 코롤라의 노킹 소리에 대해 물으면, 나이지리아에 계시다면 가짜 연료를 먼저 고려합니다 — 통계적으로 그곳에서 가장 가능성 높은 원인이기 때문입니다.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: '연료 불순물', desc: '가짜 연료가 노크 센서, 인젝터, 오일 점도에 어떻게 영향을 미치는지 이해합니다.' },
                  { title: '열대 기후의 영향', desc: '고무 씰의 마모를 가속화하는 섭씨 35도 이상의 주변 온도를 고려합니다.' },
                  { title: '노면 손상', desc: '나쁜 도로 특유의 서스펜션 및 타이어 고장 패턴을 인식합니다.' },
                  { title: '현지 부품 가격', desc: '비용 견적은 부품 시장과 등록된 정비소의 데이터를 이용해 계산됩니다.' },
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

          {/* 비교 */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">비교</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              가상 정비사 vs. 다른 선택지
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">기능</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">AI 정비사</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">정비소 방문</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">커뮤니티/포럼</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['24시간 이용 가능', '예', '아니오', '가끔'],
                    ['무료', '예', '아니오', '예'],
                    ['이동 불필요', '예', '아니오', '예'],
                    ['비용 견적', '예', '다양함', '아니오'],
                    ['오디오/영상 분석', '예', '예', '아니오'],
                    ['즉시 응답', '예', '아니오', '가끔'],
                    ['일관된 품질', '예', '다양함', '아니오'],
                    ['기록 저장', '예', '아니오', '아니오'],
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

          {/* 자주 묻는 질문 */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">자주 묻는 질문</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              자주 묻는 질문
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '가상 정비사란 무엇이고 어떻게 작동하나요?', a: '인공지능을 이용해 원격으로 자동차 고장을 진단하는 도구입니다. 문제를 설명하고 선택적으로 미디어를 업로드하면, AI가 나이지리아 시장 기준으로 산정된 비용과 함께 방대한 고장 데이터베이스와 대조합니다.' },
                { q: 'AI 진단이 항상 정확한가요?', a: '아니요 — 항상 100% 정확하지는 않습니다. 좋은 출발점이지만, 리프트와 스캐너를 이용한 실제 점검에서만 발견할 수 있는 것들을 놓칠 수 있습니다. 초기 소견으로 여기시고, 브레이크, 조향, 연료 고장에는 항상 직접 정비사를 찾아가세요.' },
                { q: 'BMW, 벤츠, 도요타 등 다른 브랜드에도 사용할 수 있나요?', a: '네. 어떤 브랜드든 물어보세요 — AI는 모든 주요 제조사를 다룹니다. 비용은 나이지리아 시장 기준이며, 다른 국가에서는 일반적인 참고 자료로 활용하세요.' },
                { q: '카톡방에 묻는 것과 같은가요?', a: '여러 면에서 더 낫습니다. 커뮤니티에서는 한 사람의 의견만 얻습니다. 저희 서비스는 설명을 사진, 소리, 영상과 함께 분석하고, 수천 개의 고장 패턴과 비교하여 신뢰도가 표시된 정렬된 진단을 제공합니다.' },
                { q: '엔진 소리만으로 제 차를 진단할 수 있나요?', a: '네. 소리는 가장 강력한 입력 중 하나입니다. 딸깍거리는 소리, 끽끽거리는 소리, 마찰음의 녹음을 업로드하세요 — 스마트폰으로 10초만 녹음해도 충분합니다. AI가 소리 패턴을 분석해 가능성 높은 고장을 식별합니다.' },
                { q: '계정을 만들거나 로그인해야 하나요?', a: '아니요. AI 정비사는 완전 무료이며 계정, 가입, 개인 정보가 필요 없습니다. 차량 데이터는 사용자의 기기에 로컬로 저장됩니다.' },
                { q: '제 기록이 서버에 저장되나요?', a: '아니요. 전체 기록은 브라우저의 로컬 저장소를 통해 사용자의 기기에만 저장됩니다. 저희는 활성 메시지 외에는 서버에 아무것도 저장하지 않습니다.' },
                { q: '수리 비용 견적은 얼마나 정확한가요?', a: '이는 나이지리아 시장 데이터를 기반으로 합니다 — 라고스, 아부자, 포트하커트의 정비소에서의 부품 및 공임을 참고 자료로 사용합니다. 무엇이 합리적인지 알 수 있도록 범위(최소~최대)를 제공합니다. 정비소가 저희 최대치보다 훨씬 높은 가격을 부른다면, 조사해 볼 가치가 있습니다.' },
                { q: '어떤 자동차 브랜드든 수리 비용을 받을 수 있나요?', a: '네. 도요타, 혼다, 벤츠, 렉서스, 기아, 현대, BMW, 미쓰비시, 닛산, 포드, Innoson, 푸조 등 어디서 운전하시든 모든 주요 브랜드를 다룹니다. 비용은 대략적인 국제 참고 자료입니다.' },
                { q: '근처 출장 정비사나 정비소가 필요하다면 어떻게 하나요?', a: '저희 도구는 먼저 문제를 진단해서, 검색을 시작하기 전에 정확히 무엇을 요청해야 할지 알려드립니다. 고장이 실제 점검이나 특수 장비를 필요로 한다면, 명확하게 알려드리고 어떤 종류의 정비사나 정비소를 찾아야 하는지도 안내해 드립니다.' },
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
            검토: <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, 자동차 정비사. 진단 로직과 수리 비용 범위의 기술적 정확성을 확인했습니다.
          </p>

          {/* 마지막 CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              준비되셨나요? 지금 바로 차량을 진단하세요.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              무료. 즉시. 가입 불필요. 지금 바로 진단받으세요.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              무료 진단 시작하기
            </a>
          </section>

          {/* 다른 도구 */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              다른 무료 도구
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/dogu/chadaebeonho-johoe',        label: 'VIN 조회',                  color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: '서류 체크리스트',           color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: '수입 관세 계산기',          color: 'emerald' },
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
