import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientJA from './client';

export const metadata: Metadata = {
  title: 'AIメカニック — 無料のAI故障診断 | Naira Autos',
  description: 'AIを使った無料の故障診断サービスです。車の症状を入力するか、写真・エンジン音・動画をアップロードすると、修理費用の見積もりを含む診断結果が即座に表示されます。登録不要です。',
  alternates: {
    canonical: 'https://www.naira.autos/tsuru/ai-shindan',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/ai-mechanic-arabic',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — 無料のAIメカニック診断 | Naira Autos',
    description: '車の症状を入力するだけで、その場でAI診断。緊急度、考えられる原因、自分でできる対処法、修理費用の見積もりがすぐにわかります。完全無料、登録不要。',
    url: 'https://www.naira.autos/tsuru/ai-shindan',
  },
  keywords: ['AI診断', '故障診断 無料', 'AIメカニック', '車 故障 症状', '修理費用 見積もり', 'オンライン 車 診断', '異音 診断'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tsuru/ai-shindan',
      name: 'AIメカニック — 無料のAI故障診断',
      description: 'AIを使った無料の故障診断サービス。写真、エンジン音、動画をアップロードするか、症状を説明すると、緊急度と修理費用の見積もりを含む診断結果がすぐに表示されます。',
      url: 'https://www.naira.autos/tsuru/ai-shindan',
      inLanguage: 'ja',
      dateModified: '2026-09-09',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.naira.autos/homu' },
          { '@type': 'ListItem', position: 2, name: 'ツール', item: 'https://www.naira.autos/tsuru' },
          { '@type': 'ListItem', position: 3, name: 'AIメカニック', item: 'https://www.naira.autos/tsuru/ai-shindan' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'AIメカニックとは何ですか？どのように使いますか？',
          acceptedAnswer: { '@type': 'Answer', text: 'AIメカニックは、人工知能を使って車の不具合を遠隔で診断するツールです。症状を説明し、必要に応じて写真、エンジン音、動画をアップロードすると、AIが数多くの既知の故障パターンと照らし合わせて分析し、緊急度と修理費用の見積もりを含む診断結果を返します。' },
        },
        {
          '@type': 'Question',
          name: '日本で使えますか？',
          acceptedAnswer: { '@type': 'Answer', text: 'はい。このツールはどの国からでも利用でき、日本語で自然な文章で回答します。修理費用の見積もりは米ドルによる国際的な目安であり、日本の正確な価格ではありません。実際の費用は地域や整備工場によって異なります。' },
        },
        {
          '@type': 'Question',
          name: 'エンジン音だけで故障を診断できますか？',
          acceptedAnswer: { '@type': 'Answer', text: 'はい。カタカタ音、キーキー音、擦れるような音などを録音してください。スマートフォンで10秒程度録音するだけでも十分役立ちます。AIが音のパターンを分析し、ベアリングの不具合なのか、ブレーキパッドの問題なのか、あるいは他の特定の故障なのかを判断します。' },
        },
        {
          '@type': 'Question',
          name: 'このサービスは無料ですか？',
          acceptedAnswer: { '@type': 'Answer', text: 'はい、完全に無料です。登録も、サブスクリプションも、支払いも一切必要ありません。ページを開いてすぐに診断を始められます。' },
        },
        {
          '@type': 'Question',
          name: 'AIの診断は常に正確ですか？',
          acceptedAnswer: { '@type': 'Answer', text: 'いいえ、必ずしも100%正確とは限りません。入力された説明・写真・音声・動画に基づいた優れた出発点にはなりますが、リフトに上げて診断機を使った実際の点検でしか分からないこともあります。最終的な答えではなく最初の見立てとして扱い、ブレーキ、ステアリング、燃料系統に関わる問題については必ず資格のある専門家に直接確認してください。' },
        },
        {
          '@type': 'Question',
          name: 'トヨタ、ホンダ、日産などの車種にも対応していますか？',
          acceptedAnswer: { '@type': 'Answer', text: 'はい。トヨタ、ホンダ、日産、マツダ、スバル、その他どのメーカーの故障についても質問できます。AIはすべての主要メーカーに対応しています。費用の見積もりは米ドルによる国際的な目安であり、日本国内の価格ではありません。' },
        },
        {
          '@type': 'Question',
          name: '会話の内容はサーバーに保存されますか？',
          acceptedAnswer: { '@type': 'Answer', text: 'いいえ。チャットの履歴はすべてお使いの端末のみに保存され、ブラウザのローカルストレージが使用されます。診断のために送信された現在のメッセージ以外、サーバー上には何も保存されません。履歴はいつでもサイドメニューから削除できます。' },
        },
        {
          '@type': 'Question',
          name: 'アカウント登録やログインは必要ですか？',
          acceptedAnswer: { '@type': 'Answer', text: 'いいえ。AIメカニックは完全無料で、アカウント登録もログインも個人情報の入力も不要です。車両情報はお使いの端末にのみ、利便性のために保存されます。' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — AIメカニック',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'AIを使った無料の故障診断サービス。症状を説明するか、エンジン音や写真をアップロードすると、修理費用の見積もりを含む診断結果が即座に表示されます。',
      url: 'https://www.naira.autos/tsuru/ai-shindan',
      inLanguage: 'ja',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPageJA() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientJA />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">最終更新：2026年9月</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">対応範囲</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              AIメカニックでできること
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              修理費用をすぐに知りたいときも、整備工場に行く前にオンラインで質問したいときも、このツールなら無料でまとめて対応できます。
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'エンジンの不具合診断', desc: 'カタカタ音、点火不良、アイドリング不安定、オーバーヒート、エンジン警告灯など、AIが可能性の高い原因を順に絞り込みます。' },
                { title: '音声分析', desc: 'カタカタ音、キーキー音、擦れる音などの録音をアップロードしてください。AIが音のパターンを分析し、故障箇所を特定します。' },
                { title: '緊急度の即時判定', desc: '診断結果には「運転しても安全」「注意深く様子を見る」「早めに修理工場へ」「今すぐ運転を中止」の4段階で明確な判断が含まれます。' },
                { title: '修理費用の見積もり', desc: '見積もりは米ドルによる国際的な目安です。実際の部品代・作業費は国や地域によって異なるため、あくまで出発点として、現地での見積もりを取ってください。' },
                { title: '自分でできる対処法', desc: '自分で確認・対処できる内容であれば、修理工場に依頼する前にその方法を具体的にお伝えします。' },
                { title: '継続した会話', desc: '追加の質問をすると、これまでの内容を踏まえた回答が得られます。各セッションはお使いの端末に保存されます。' },
                { title: '全メーカー対応', desc: 'トヨタ、ホンダ、レクサス、日産、マツダ、スバル、その他あらゆるメーカーに対応しています。' },
                { title: '写真・動画での診断', desc: 'ダッシュボードの警告灯、見慣れない液漏れ、目に見える損傷などの写真を送ってください。追加のメディアがあるほど診断の精度が上がります。' },
                { title: '必要な部品の特定', desc: '各診断には原因として考えられる具体的な部品も含まれるため、修理工場やパーツショップで何を伝えればよいかが明確になります。' },
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
                AIメカニックとは
              </h2>
              <p className="mb-3"><strong className="text-foreground">AIメカニック</strong>は、その名の通り、実際に工場へ足を運ぶ代わりに、テキスト・写真・音声・動画で「対話できる整備士」です。冷えている時の始動時に鳴る不思議な音、消えないエンジン警告灯、柔らかく感じるブレーキなど、車で起きていることを説明すると、実際の車の故障に関する深い知識に基づいた回答が数秒で返ってきます。</p>
              <p>Axionは<strong className="text-foreground">AIを使ったメカニック</strong>で、どのメーカーの車にも、どの国でも対応していますが、日本語話者に向けて自然な日本語で書かれています。英語からの直訳ではありません。</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                1分以内に車の診断結果を得る方法
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. 症状を説明してください。</strong> 何が起きているかを詳しく書くほど、診断の精度が上がります。いつから症状が出ていますか？冷えている時だけ、加速時だけ、ハンドルを切った時だけ発生しますか？</p>
                <p><strong className="text-foreground">2. 写真・音声・動画をアップロード（任意ですが非常に有効です）。</strong> エンジン音の10秒程度の録音は、長い文章での説明よりも役立つことが多いです。</p>
                <p><strong className="text-foreground">3. すぐに診断結果を確認できます。</strong> 緊急度、可能性の高い順に並んだ原因、自分で確認できる内容、修理費用の見積もりが表示されます。</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                修理費用の見積もり：整備工場で不当に高い金額を払わないために
              </h2>
              <p className="mb-3">整備工場で損をしてしまう最も多い原因の一つは、修理費用の相場を事前に知らないまま持ち込んでしまうことです。工場に行く前に<strong className="text-foreground">修理費用の見積もり</strong>機能を使い、部品代と作業費を含めた適正価格を確認してください。</p>
              <p>見積もりは、車のメーカー・車種・年式と、説明内容から推測される最も可能性の高い故障を踏まえて算出されます。一律の金額ではありません。走行距離18万kmのカローラ（2010年式）でオイル圧の低下が見られる場合と、走行距離4万kmのカローラ（2020年式）で同じ警告灯が点灯している場合とでは、原因の可能性が異なるため、見積もりも異なります。</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                トヨタ、ホンダ、日産など、どのメーカーにも対応
              </h2>
              <p className="mb-3">お乗りの車がどのメーカーでも問題ありません。AIはトヨタ、ホンダ、日産、マツダ、スバル、レクサス、三菱、そのほか現在道路を走っているほぼすべてのメーカーの故障パターンを把握しています。メーカー・車種・年式を一度入力すれば、その車、その走行距離で実際に起こりやすい故障に合わせて診断が調整されるため、どの車にも当てはまるような一般的な回答にはなりません。</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                エンジン音による診断がもたらす違い
              </h2>
              <p className="mb-3">経験豊富な整備士は、ボンネットを開ける前に音だけで故障の見当がつくことがよくあります。私たちのAIも同じことをします。カタカタ音、キーキー音、擦れる音などの録音をアップロードすると、システムがその音のパターンを何千もの既知の故障と比較して分析します。スマートフォンでの10秒程度の録音だけで、深刻な問題か、後回しにできる問題かを見分けられることが多くあります。</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                例：テキストのみと、テキスト＋音声の違い
              </h2>
              <p>ある方のホンダ・アコードが、冷えている時の始動時に軽いカタカタ音を立て始めました。テキストのみで説明した場合（「朝の始動時にカタカタ音がする」）、AIはオイル残量の低下、バルブリフターの音、あるいは緩んだヒートシールドなど、幅広い可能性を約60%の確信度で返しました。その後、スマートフォンで12秒間の音声を録音してアップロードしたところ、診断はより具体的になり、オイル交換の遅れによる油圧バルブリフターの音であることが85%以上の確信度で示され、具体的な費用の範囲と、オイル交換の予約までの間は短期間であれば運転を続けても安全であるという確認も得られました。</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">入力内容による診断精度の違い</h3>
              <div className="space-y-3">
                {[
                  { label: 'テキストのみ', pct: 60, color: 'bg-orange-500' },
                  { label: '＋写真を追加', pct: 75, color: 'bg-amber-500' },
                  { label: '＋音声を追加', pct: 85, color: 'bg-emerald-500' },
                  { label: '＋動画を追加', pct: 90, color: 'bg-emerald-600' },
                ].map(({ label, pct, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{label}</span>
                      <span className="font-bold text-foreground">~{pct}%</span>
                    </div>
                    <div className="h-1.5 bg-border rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${color}`} style={{ width: pct + '%' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">対応車種</h3>
              <div className="flex flex-wrap gap-1.5">
                {['トヨタ', 'ホンダ', 'レクサス', '日産', 'マツダ', 'スバル', '三菱', 'BMW', 'メルセデス', 'フォード', 'トラック', 'バス', 'バイク'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">主な特徴</h3>
              <ul className="space-y-2.5">
                {[
                  '完全無料 — サブスクリプションなし',
                  'アカウント登録不要',
                  'スマートフォン・PCで利用可能',
                  '国際的な目安としての費用見積もり',
                  '24時間365日利用可能',
                  'チャット履歴はローカルに保存',
                  '追加質問は無制限',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Naira Autosの他のツール</h3>
              <ul className="space-y-2">
                {[
                  { label: '無料の車両査定', href: '/evaluate-car' },
                  { label: 'エンジン音分析ツール', href: '/tools/engine-sound-analyzer' },
                  { label: '輸入関税計算ツール', href: '/tools/import-duty-calculator' },
                  { label: '車両書類チェックリスト', href: '/tools/vehicle-papers-checklist' },
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

          {/* Comparison */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">比較</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              AIメカニックと他の選択肢の比較
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">機能</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">AIメカニック</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">整備工場</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">掲示板・SNS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['24時間対応', 'はい', 'いいえ', '時々'],
                    ['無料', 'はい', 'いいえ', 'はい'],
                    ['移動不要', 'はい', 'いいえ', 'はい'],
                    ['費用の見積もり', 'はい', '場合による', 'いいえ'],
                    ['音声・動画分析', 'はい', 'はい', 'いいえ'],
                    ['即時回答', 'はい', 'いいえ', '時々'],
                    ['品質の安定性', 'はい', '場合による', 'いいえ'],
                    ['履歴の保存', 'はい', 'いいえ', 'いいえ'],
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

          {/* FAQ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">よくある質問</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              よくある質問
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'AIメカニックとは何ですか？どのように使いますか？', a: 'AIを使って車の不具合を遠隔で診断するツールです。症状を説明し、任意のメディアをアップロードすると、AIが数多くの既知の故障パターンと照らし合わせて分析し、国際的な目安としての費用見積もりを返します。' },
                { q: '日本で使えますか？', a: 'はい。自然な日本語で回答します。費用の見積もりは米ドルによる国際的な目安であり、日本国内の正確な価格ではありません。' },
                { q: 'AIの診断は常に正確ですか？', a: 'いいえ、必ずしも100%正確ではありません。良い出発点にはなりますが、リフトに上げた実際の点検でしか分からないこともあります。最初の見立てとして扱い、ブレーキ、ステアリング、燃料系統の問題は必ず専門家に直接確認してください。' },
                { q: 'トヨタ、ホンダ、日産などにも対応していますか？', a: 'はい。どのメーカーについても質問できます。AIはすべての主要メーカーに対応しています。費用の見積もりは米ドルによる国際的な目安です。' },
                { q: 'エンジン音だけで診断できますか？', a: 'はい。音は最も有効な入力の一つです。カタカタ音、キーキー音、擦れる音を10秒程度録音してアップロードするだけで十分です。AIが音のパターンを分析し、可能性の高い故障を判断します。' },
                { q: 'アカウント登録やログインは必要ですか？', a: 'いいえ。完全無料で、アカウント登録もログインも個人情報も不要です。車両情報はお使いの端末に保存されます。' },
                { q: '会話の内容はサーバーに保存されますか？', a: 'いいえ。履歴はすべてお使いの端末のブラウザストレージにのみ保存されます。サーバーには現在送信中のメッセージ以外、何も保存されません。' },
                { q: '修理費用の見積もりはどの程度正確ですか？', a: '国や地域による部品代・作業費の違いを踏まえた国際的な目安として使えます。最小〜最大の範囲を提示するので、妥当な金額の判断材料になります。整備工場からの見積もりが最大値を大きく上回る場合は、確認する価値があります。' },
                { q: 'どのメーカーの車でも費用の見積もりを取れますか？', a: 'はい。トヨタ、ホンダ、日産、マツダ、スバル、レクサス、BMW、メルセデスなど、主要メーカーに対応しています。見積もりは国際的な目安です。' },
                { q: '近くの整備士や修理工場が必要な場合はどうすればいいですか？', a: 'このツールはまず問題を診断し、何を伝えればよいかを明確にします。実際の点検や専用機器が必要な場合はその旨をはっきりお伝えし、どのタイプの整備士や工場を探すべきかも案内します。' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            監修：<Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>（自動車整備士）。診断ロジックと修理費用の範囲は技術的な正確性を確認済みです。
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              準備はできましたか？今すぐ診断を始めましょう。
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              無料・即時・登録不要。今すぐ診断結果を確認できます。
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              無料診断を始める
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              その他の無料ツール
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: '車体番号（VIN）チェッカー', color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: '車両書類チェックリスト',     color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: '輸入関税計算ツール',         color: 'emerald' },
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
