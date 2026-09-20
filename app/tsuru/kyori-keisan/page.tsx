// app/tsuru/kyori-keisan/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorJapanClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { JP_TOWNS, findTown } from '@/lib/distance-towns-jp';
import { JP_CAPITAL_DISTANCE_KM } from '@/lib/jp-distance-matrix';

export const metadata: Metadata = {
  title: '距離計算機 日本 2026 — 都市間の道路距離を計算',
  description: '東京、大阪、名古屋など日本の43都市間の道路距離と運転時間を計算。確認済みの高速道路距離、運転時間、燃料費を表示します。',
  alternates: {
    canonical: 'https://www.naira.autos/tsuru/kyori-keisan',
    languages: {
      en: 'https://www.naira.autos/tools/distance-calculator-countries',
      'x-default': 'https://www.naira.autos/tools/distance-calculator-countries',
    },
  },
  openGraph: {
    title: '距離計算機 日本 2026',
    description: '日本の43都市間の道路距離と運転時間、燃料費計算機付き。',
    url: 'https://www.naira.autos/tsuru/kyori-keisan',
    locale: 'ja',
  },
  keywords: ['距離計算機 日本', '東京 大阪 距離', '東京 名古屋 距離', '道路距離計算', '燃料費 東京 大阪'],
};

const tokyo = findTown('Tokyo')!;

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tsuru/kyori-keisan',
      name: '距離計算機 日本 2026 — 都市間の道路距離を計算',
      description: '日本の43都市間の道路距離と運転時間を計算、燃料費計算機付き。',
      url: 'https://www.naira.autos/tsuru/kyori-keisan',
      dateModified: '2026-09-14',
      inLanguage: 'ja',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '東京から大阪までの距離は？', acceptedAnswer: { '@type': 'Answer', text: '約505kmで、互いに1.5%以内で一致する3つの独立した情報源から確認されています。通常、渋滞状況により6.5時間以上かかります。' } },
        { '@type': 'Question', name: '日本政府が発表している公式の距離表はありますか？', acceptedAnswer: { '@type': 'Answer', text: '都市間の完全な距離表を発表している単一の政府機関はありませんが、東名高速道路（東京-名古屋間、公式全長346.8km）や名神高速道路（名古屋-神戸間、公式全長193.9km）など、個々の高速道路は詳細に文書化されています。' } },
        { '@type': 'Question', name: '東京から名古屋までの距離は？', acceptedAnswer: { '@type': 'Answer', text: '東名高速道路の公式全長で約347kmです。' } },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: '距離計算機 日本',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0' },
    },
  ],
};

export default function DistanceCalculatorJapanPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="ja" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link
              href="/tsuru"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="戻る"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/tsuru" className="hover:text-white/60 transition-colors">ツール</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇯🇵 日本</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">無料ツール · 43都市</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">最終確認: 2026年9月</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              距離計算機
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              東京、大阪、名古屋など日本の43都市間の道路距離と運転時間を計算します。
            </p>
            <Link href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorJapanClient />
          </div>
        </div>
      </div>

      <div lang="ja" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              この数値の出典について
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>日本には都市間の道路距離を網羅した政府発表の一覧表はありませんが、個々の高速道路については驚くほど詳細に文書化されています。東名高速道路（東京インターチェンジから小牧インターチェンジまで）は公式全長346.8kmで、東京と名古屋を直接結んでいます。名神高速道路（名古屋から神戸まで）は公式全長193.9kmです。このツールではこれら2つの公式な数値をそのまま使用しています。</p>
              <p>東京-大阪間（約505km）は単一の高速道路区間として測定できないため、互いに1.5%以内で一致する3つの独立した現代の旅行情報源から算出しました。このツールが対象とする43都市間の他のすべてのルートは、ナイジェリアの完全に確認済みの道路マトリックスに基づいて較正されたヘイバーサイン公式によるGPS推定値を使用しています。東京の各区（世田谷区、大田区、足立区など）は東京都市圏の一部として重複を避けるため意図的に除外されています。</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              日本の道路で実際に時間がかかる要因
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              日本の高速道路は有料区間が多く、東京から名古屋までの東名高速道路の通行料金だけでも数千円かかることがあります。お盆やゴールデンウィーク、年末年始などの連休には主要路線で深刻な渋滞が発生し、通常の2倍以上の時間がかかることも珍しくありません。冬季は日本海側や山岳地帯で積雪による通行止めや速度規制が発生することがあります。都市部の高速道路（首都高速、阪神高速など）は各都市中心部で慢性的に混雑しています。どのような計算ツールを使う場合でも、ここに示す数値は計画の目安として捉え、長距離移動の前には最新の交通状況を確認してください。
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            レビュー: <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>（自動車販売エキスパート）。確認済みルートは東名高速道路・名神高速道路の公式全長データと、独立した情報源で照合した数値に基づいています。それ以外のルートはヘイバーサイン公式による推定値です。
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              東京から各都市までの距離（近い順）
            </h2>
            <p className="text-sm text-gray-500 mb-4">このツールに登録されている他の42都市を、東京から近い順に表示しています。</p>
            <DistanceTable hub={tokyo} towns={JP_TOWNS} verifiedMatrix={JP_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              よくある質問 — 距離計算機 日本
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: '東京から大阪までの距離は？', a: '約505kmで、互いに1.5%以内で一致する3つの独立した情報源から確認されています。' },
                { q: '公式の距離表はありますか？', a: '都市間の完全な一覧表はありませんが、東名高速道路や名神高速道路など個々の高速道路は詳細に文書化されており、それを直接利用しています。' },
                { q: '東京から名古屋までの距離は？', a: '東名高速道路の公式全長で約347kmです。' },
                { q: '名古屋から神戸までの距離は？', a: '名神高速道路の公式全長で約194kmです。' },
                { q: '燃料費は計算できますか？', a: 'はい — 上部で車種と現在のリッター単価を選択すると、距離から必要な燃料量と費用を自動計算します。' },
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
