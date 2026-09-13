import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { KurumaSateiClient } from './client';

export const metadata: Metadata = {
  title: '愛車の価値は？無料AI査定 | Naira Autos',
  description: 'AIで愛車を無料査定。自国通貨で今すぐ価格がわかります。写真をアップロードするだけで即座に査定額を確認できます。',
  keywords: '車 査定 無料, 中古車 査定, AI 車査定, 愛車 いくら, 車の価値 計算',
  openGraph: {
    title: '愛車の価値は？無料AI査定',
    description: 'AIで愛車を自国通貨で査定。写真をアップロードするだけで即座に査定額がわかります — 完全無料。',
    url: 'https://www.naira.autos/tsuru/kuruma-satei',
    siteName: 'Naira Autos',
    locale: 'ja',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/tsuru/kuruma-satei',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: '愛車の価値は？無料AI査定',
  description: '無料のAI車査定ツール。自国通貨で即座に査定額がわかり、あなたの国の市場に合わせて調整されています。',
  url: 'https://www.naira.autos/tsuru/kuruma-satei',
  inLanguage: 'ja',
  dateModified: '2026-09-10',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'AI車査定 — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: '車の写真をアップロードすると、AIが自国通貨で即座に市場価格を査定します。',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.naira.autos/homu' },
      { '@type': 'ListItem', position: 2, name: 'ツール', item: 'https://www.naira.autos/tsuru' },
      { '@type': 'ListItem', position: 3, name: '愛車の価値は', item: 'https://www.naira.autos/tsuru/kuruma-satei' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: '中古車の価値はどのように決まりますか？', acceptedAnswer: { '@type': 'Answer', text: 'メーカー、車種、年式、グレード、走行距離、状態、そしてあなたの国での同様の車の現在の販売価格によって決まります。上の写真をアップロードして国を選択すると、AIが車を特定し、その市場の実際の出品データに基づいて自国通貨での価格帯を提示します。' } },
      { '@type': 'Question', name: '中古車の査定に影響する要因は何ですか？', acceptedAnswer: { '@type': 'Answer', text: '主な要因は次のとおりです：(1) メーカーと車種 — 市場によっては価値を保ちやすいものがあります。(2) 年式、グレード、走行距離。(3) 車体と塗装の状態。(4) 機械的な状態と整備履歴。(5) 車検証や登録の完備状況。(6) 地域の需要と供給 — 同じ車でも国によって価値が異なります。' } },
      { '@type': 'Question', name: '国によって査定額は変わりますか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、大きく変わります。輸入関税、特定メーカーへの地域需要、通貨の強さ、中古車市場の規模など、すべてが国ごとの価格差を生みます。私たちのツールはあなたの国の市場に合わせて調整された、正しい自国通貨での査定額を提供します。' } },
      { '@type': 'Question', name: 'AI査定の精度はどのくらいですか？', acceptedAnswer: { '@type': 'Answer', text: '私たちのツールはコンピュータビジョンを使い、写真からメーカー・車種・年式・グレードを正確に特定し、選択した国の実際の出品データと比較して単一の数値ではなく価格帯を提示します。これは交渉の信頼できる出発点として活用してください。最終的な価格ではありません — 実際の価値は必ず対面での確認と交渉によって決まります。' } },
      { '@type': 'Question', name: 'この査定ツールは本当に無料ですか？', acceptedAnswer: { '@type': 'Answer', text: 'はい。費用は一切かかりません。アカウント登録も不要で、利用回数の制限もありません。' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'メーカーと再販価値', body: '再販時の強さは市場によって異なります。トヨタやホンダは多くの地域で価値を保ちやすい一方、ドイツの高級車は整備費用が高い市場ではより早く価値が下がる傾向があります。地域の需要はブランド名と同じくらい重要です。' },
  { icon: Shield, title: '走行距離と整備履歴', body: '走行距離が少なく、整備履歴が文書化されていることは、世界中どこでも大切に扱われた車である最も強い指標です。整備記録がきちんとしていれば、1年新しいモデルよりも価値が高い場合があります。' },
  { icon: CheckCircle2, title: '書類と所有権', body: '完備された車検証と登録は、どの市場でも最高の価値を得るために欠かせません。書類が不完全だったり輸入手続きに問題があると、価格が15〜25％下がることがあります。' },
  { icon: AlertCircle, title: '全体的な状態', body: '傷、錆、塗装の劣化がなく、機械的に健全なエンジンを持つきれいな車体は、目に見える使用感のある同様の車と比べて市場価値を常に10〜15％高めます。' },
];

const FAQ_ITEMS = [
  { q: '中古車の価値はどのように決まりますか？', a: 'メーカー、車種、年式、グレード、走行距離、状態、そしてあなたの国での同様の車の現在の販売価格によって決まります。上の写真をアップロードして国を選択すると、自国通貨でのAI査定が受けられます。' },
  { q: '中古車の査定に影響する要因は何ですか？', a: 'メーカーと車種、年式とグレード、走行距離、車体と機械の状態、車検証や登録の完備状況、そしてあなたの市場での地域の需要と供給です。' },
  { q: '国によって査定額は変わりますか？', a: 'はい — 輸入関税、特定メーカーへの地域需要、通貨の強さ、市場規模によって国ごとに価格が変わります。私たちは世界の主要市場をカバーし、世界平均ではなく自国通貨での価格を提供します。' },
  { q: '売却前に車の価格を正しく設定するには？', a: '無料のAI査定ツールで数値を把握し、その後、地域の同様の車の出品を確認してください。受け入れられる最低額より5〜10％高く設定すると、交渉の余地が生まれます。' },
  { q: 'AI査定の精度はどのくらいですか？', a: 'コンピュータビジョンで写真から車を正確に特定し、選択した国の実際の出品データと比較します。信頼できる出発点として活用してください。最終価格ではありません — 実際の価値は確認と交渉によって決まります。' },
  { q: '車査定ツールは無料ですか？', a: 'はい — 費用も、アカウント登録も、利用回数の制限もありません。' },
];

export default function KurumaSateiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── ダークヒーロー ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/tsuru" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="戻る">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="パンくずリスト" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/homu" className="hover:text-white/60 transition-colors">ホーム</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/tsuru" className="hover:text-white/60 transition-colors">ツール</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">愛車の価値は</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                AI搭載 · 無料
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              愛車の<br /><span className="text-amber-400">価値は？</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              写真をアップロードするだけで、実際の出品データとAIに基づいた自国通貨での市場査定額を即座に確認できます。
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> 写真分析</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>世界の主要市場に対応</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100%無料</span>
            </div>
          </div>
        </div>

        {/* ── 査定ツール ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <KurumaSateiClient />
          </div>
        </div>

        {/* ── SEOコンテンツ ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">価値を理解する</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              中古車の価格は何で決まるのか
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
              中古車査定の完全ガイド
            </h2>

            <p>愛車の本当の市場価値を知ることは、売却、下取り、あるいは購入交渉を行う前に世界中どこでも最も重要なステップです。価格を高く設定しすぎると売れ残り、低く設定しすぎると実際に得られるはずのお金を逃してしまいます。難しいのは、<strong className="text-foreground">「市場価値」は単一の数値ではない</strong>ということです — 国、通貨、特定メーカーへの地域需要、そして車ごとの個別の履歴や状態によって変わります。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">同じ車でも国によって価値が異なる理由</h3>
            <p>5年落ちの状態の良いトヨタ・カローラでも、国によってまったく異なる金額になることがあります — 通貨換算をする前の段階でもです。輸入関税や中古車への現地課税は国によって大きく異なります。特定メーカーへの強い地域需要がある市場もあり、その場合は再販価格が高く保たれます。一方、新車市場が大きく中古車から買い手を遠ざける市場もあり、その場合は再販価値が下がります。だからこそ、世界共通の単一の価格ガイドは機能しません — 査定は国ごとに調整する必要があります。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">走行距離と整備履歴</h3>
            <p>ほぼすべての市場において、走行距離と文書化された整備履歴は、写真だけではわからない車の状態を示す最も信頼できる指標です。走行距離が少なく整備記録が完備している車は、同じ年式で走行距離の多い同様の車と比べて、写真では似て見えても、通常かなりの価格上乗せを得られます。整備履歴が不完全または欠落していることは、売り手として交渉力を失う最も早い方法の一つです。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">所有権、登録、書類</h3>
            <p>私たちがカバーするすべての国において、<strong className="text-foreground">完備されたきれいな書類は最高の価値を得るために交渉の余地がありません</strong>。買い手は当然のことながら、書類が不完全だったり、輸入関税が未払いだったり、登録が不完全な車の価値を割り引きます。なぜなら、所有権移転時のトラブルのリスクはどの国でも現実的だからです。出品前に書類の問題を解決しておく方が、そうしなければ買い手が要求するであろう値引きよりも通常はるかに安く済みます。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">全体的な状態と見た目</h3>
            <p>傷、錆、塗装の劣化がなく、機械的に健全なエンジンとトランスミッションを持つきれいな車体は、東京で売ろうがベルリンで売ろうが、目に見える使用感のある同様の車と比べて常に価格を押し上げます。簡単で低コストな修理（徹底的な清掃、小さな傷の補修、切れた電球の交換）は、最終的な販売価格で何倍にもなって返ってくることがよくあります。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">通貨と市場のタイミング</h3>
            <p>輸入中古車への依存度が高い国では、車の価格は為替レートの変動と密接に連動しています — 現地通貨が弱くなると輸入コストが上がり中古車価格が押し上げられ、通貨が強くなると逆の効果が生まれます。つまり、1〜2年前の査定は現在の価格の信頼できる指標ではない可能性があります。古い価格ガイドや前の所有者が支払った金額に頼るのではなく、常に現在の市場データを確認してください。</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">このツールの仕組み</h3>
            <p>車の鮮明な写真をアップロードし、国を選択してください。AI（Gemini Vision）が写真からメーカー、車種、年式、グレードを特定し、選択した市場の実際の最新の出品データと比較して、単一の推定値ではなく自国通貨での価格帯を提示します。結果には査定に影響した具体的な要因が含まれており、なぜその数値になったのかを理解できます。交渉のための迅速で無料な出発点として設計されており、対面での確認に代わるものではありません。</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">よくある質問</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              よくある質問
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
              その他の無料ツール
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/tsuru/ai-shindan" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">AIメカニック</p>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tsuru" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">すべてのツール</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/homu" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">日本語ホーム</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
