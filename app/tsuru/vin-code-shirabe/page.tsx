import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientJa from '@/components/VINCheckerClientJa';

export const metadata: Metadata = {
  title: 'VINコード（車台番号）無料照会 — アメ車・輸入車の年式・仕様がわかる',
  description: 'VINコード（車台番号）を無料で照会。メーカー、モデル、年式、エンジン、生産国が即座にわかります。登録不要。アメ車・輸入車の購入前チェックに。',
  keywords: ['VINコード 無料 照会', '車台番号 調べ方', 'VIN デコード 無料', 'アメ車 VIN 照会', '車体番号 検索', 'VINコード 読み方', '輸入車 年式 調べる', 'VIN チェッカー 無料', 'シリアルナンバー 照会', 'アメリカ車 車台番号'],
  alternates: {
    canonical: 'https://www.naira.autos/tsuru/vin-code-shirabe',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      ja: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      it: 'https://www.naira.autos/strumenti/verifica-numero-di-telaio',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'VINコード（車台番号）無料照会 | Naira Autos',
    description: 'メーカー、モデル、年式、エンジン、生産国をVINコードから無料で即座に照会できます。',
    url: 'https://www.naira.autos/tsuru/vin-code-shirabe',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tsuru/vin-code-shirabe',
      name: 'VINコード（車台番号）無料照会 — アメ車・輸入車の年式・仕様がわかる',
      description: 'VINコード（車台番号）を無料で照会 — メーカー、モデル、年式、エンジン、生産国。',
      url: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      inLanguage: 'ja',
      dateModified: '2026-09-14',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://www.naira.autos/homu' },
        { '@type': 'ListItem', position: 2, name: 'ツール', item: 'https://www.naira.autos/tsuru' },
        { '@type': 'ListItem', position: 3, name: 'VINコード照会', item: 'https://www.naira.autos/tsuru/vin-code-shirabe' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: '車のVINコード（車台番号）とは何ですか？', acceptedAnswer: { '@type': 'Answer', text: 'VIN（Vehicle Identification Number）は、製造時に各車両へ割り当てられる17桁の固有コードです。生産国、メーカー、車種、エンジン、年式、組立工場、固有の製造番号が含まれています。国産車では「車台番号」、輸入車では一般に「VINコード」または「シリアルナンバー」と呼ばれますが、指しているものは同じです。' } },
        { '@type': 'Question', name: 'VINコードを無料で照会する方法は？', acceptedAnswer: { '@type': 'Answer', text: '上の欄に17桁のVINコードを入力し、「解析する」をクリックしてください。米国運輸省道路交通安全局（NHTSA）の公開データベースを使用し、メーカー、モデル、年式、エンジン仕様、トランスミッション、組立工場を無料・登録不要で表示します。' } },
        { '@type': 'Question', name: 'VINコードは車のどこに記載されていますか？', acceptedAnswer: { '@type': 'Answer', text: 'VINコードは3箇所に記載されています：フロントガラス越しに見える運転席側のダッシュボード、運転席ドアの枠内のステッカー、そしてエンジンルーム内のフレームへの刻印です。国産車として登録済みの場合は車検証の備考欄にも記載されています。3箇所すべての番号が完全に一致している必要があります。' } },
        { '@type': 'Question', name: 'VINコードと車台番号は同じものですか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、同じ17桁のコードを指します。VIN（Vehicle Identification Number）は国際的な呼称で、日本の車検証上では「車台番号」として記載されます。アメ車や欧州車を扱う業界では「VINコード」または「シリアルナンバー」という呼び方も一般的です。' } },
        { '@type': 'Question', name: 'このツールはアメ車や並行輸入車にも使えますか？', acceptedAnswer: { '@type': 'Answer', text: 'はい、これが最も多い利用ケースです。もともと米国・カナダ・メキシコ向けに生産された車両であれば正常に照会できます。これは並行輸入されるアメ車のマスタングやピックアップトラック、ジープなどの多くをカバーしています。一方、欧州や日本国内向けにのみ生産された車両はNHTSAデータベースに登録されていないことが多く、その場合は車検証や現車のプレートで確認する必要があります。' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'VINコード（車台番号）無料照会', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function VinCodeShirabePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/tsuru" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="戻る">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/homu" className="hover:text-white/60 transition-colors">ホーム</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tsuru" className="hover:text-white/60 transition-colors">ツール</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">VINコード照会</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">完全無料</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">NHTSAデータ</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              VINコード（車台番号）<br /><span className="text-blue-400">無料で即座に照会</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">VINコードから車の情報を数秒で確認できます。</p>
            <p className="text-white/75 text-sm leading-relaxed">ダッシュボードやドア、フレームに記載された17桁のVINコードを入力してください。メーカー、モデル、年式、エンジン仕様、生産国が無料・登録不要でわかります。アメ車や並行輸入車の購入前チェックに便利です。</p>
          </div>
        </div>
      </div>

      <VINCheckerClientJa />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>あらゆる中古車のVINコードを無料で照会</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>この<strong className="text-foreground">VINコード無料照会ツール</strong>は、米国運輸省道路交通安全局（NHTSA）の公開データベースを利用しています。<strong className="text-foreground">無料の照会</strong>で、メーカー、モデル、年式、エンジン仕様、トランスミッション、ボディタイプ、組立工場までわかります。購入前に、その中古車が本当に説明どおりの車かどうかを確認するために必要な情報がすべて揃います。</p>
                  <p>中古車市場はますます国際的になっています。米国・カナダ・メキシコ向けに生産された車両は、絶えず輸出され再登録されています — 並行輸入業者を通じて日本に入ってくるアメ車のマスタングやピックアップトラック、ジープのラングラーなどが典型例です。VINコードは工場出荷時に刻印され、その後変わることはないため、無料照会は車両がどの国に流れ着いても同じように機能します。もとの生産がアメリカ大陸向けであれば、どこの誰が所有していても照会できます。</p>
                  <p>ここが重要なポイントです。VINコードはあなたの国が発行するナンバープレートとは違います — 車両が工場を出るずっと前に、組立ラインで刻まれる「製造の身元証明」なのです。輸出されても、再登録されても、ナンバープレートが変わっても、何人所有者が変わっても、このコードは変わりません。だからこそ、無料のVINコード照会は、ナンバープレートでは絶対にできない方法で、国境を越えて車両を追跡できるのです。</p>
                  <p>多くの人は価格交渉が終わったあとでVINコードを照会しますが、本来は現車を見に行く前、頭金を払う前、そして納車後にも改めて — 引き渡し時に何かすり替えられていないかを確認するために照会すべきです。費用はかからず、1分もかかりません。</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>並行輸入のアメ車を買う前に、まずこれを</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>並行輸入車の購入には、国内車の購入にはないリスクが伴います。書類、販売業者、車両の実際の状態が、あなたが一度も訪れたことのない国から来ている可能性があるからです。VINコードの無料照会は実車の検査に代わるものではありませんが、費用をかけずに次のステップへ進む前の最初のフィルターとして、最も手軽で有効な手段です。</p>
                  <p>まずVINコードを照会し、その結果 — 年式、モデル、エンジン、グレード — を販売業者が説明した内容と正確に比較してください。ここでのわずかな食い違い、たとえばエンジンが違うといった小さなことでも、広告写真と実際の書類が同じ車のものではない最初のサインであることが多いです。そのあとで、ダッシュボードのVINコードがフレームの刻印やドアのステッカーと物理的に一致しているかを確認してください。この3箇所の間に食い違いがあれば、コードのすり替えが行われた最も明確なサインのひとつです。</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VINコード vs 車台番号 — 同じものですか？</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>はい、まったく同じ17桁のコードです。国産車を扱う際は「車台番号」（車検証にも記載される正式な日本語表記）、輸入車を扱う際は「VINコード」または「シリアルナンバー」と呼ばれることが多く、業界によって呼び方が変わるだけです。1桁目は生産国を示し、「1」「4」「5」はアメリカ、「2」はカナダ、「3」はメキシコ、「J」は日本を表します。</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VINコードの読み方：各桁が意味すること</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17桁はランダムではありません。1〜3桁目はメーカーと生産国を示します — これにより、車両が米国・カナダ・メキシコのどこで生産されたかがわかります。4〜8桁目は車種を表します：ボディタイプ、エンジン、シリーズです。9桁目は数学的に計算されたチェックデジットで、誤って書き写されたり改ざんされたりしたVINコードを検出するために使われます。10桁目は年式を示し、12〜17桁目が車両固有の製造番号を構成します。</p>
                  <p>照会ツールがあっても、自分でこれらの区分を読めることには意味があります。結果を数秒で裏付けできるからです。10桁目が2015年式を示しているのに、販売業者が2018年式として説明していた場合は、直接確認する価値があります — これは疑いをかけることではなく、費用も手間もかからない、30秒でできる確認作業です。</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>フォード、トヨタ、ホンダ、シボレーなど全メーカーに対応</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>これは1メーカー専用のツールではありません。NHTSAのメーカーデータベースを直接参照しているため、フォード、トヨタ、ホンダ、シボレー、GMC、日産、ジープ、ヒュンダイなど、北米市場で販売されるあらゆるメーカーに対応しています。17桁のコードを貼り付けるだけで、ツールが自動的に正しいメーカーの形式を識別します — メーカーを自分で指定する必要はありません。</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VINコード照会 vs 完全な車両履歴レポート</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">無料のVINコード照会</strong>でわかるのは、工場出荷時の車両の姿 — つまり製造仕様です。その後に何が起きたか — 事故歴、改ざんされた走行距離、全損・水没歴の有無 — を知るには、CarfaxやAutoCheckのような有料の<strong className="text-foreground">車両履歴レポート</strong>が必要です。高額な中古車の購入時には、この無料の仕様照会に加えて、有料の履歴レポートの取得を強くおすすめします。</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VINコード照会 — よくある質問</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'この照会は本当に無料ですか？', a: 'はい。NHTSAの公開APIを使用しており、完全無料です。アカウント登録もログインも不要です。何回でも、どの国からでも照会できます。' },
                { q: '車のVINコードは何に使いますか？', a: 'VINコードは特定の車両を識別し、仕様確認、履歴照会、登録、保険加入、リコール情報の確認などに使われます。輸入車の並行輸入手続きでは、車台番号（VINコード）の照合が必要になる場面が多くあります。' },
                { q: 'VINコードから仕様を無料で調べられますか？', a: 'はい。この無料ツールは、米国・カナダ・メキシコ仕様の車両について、NHTSAのメーカーデータベースからメーカー、モデル、年式、エンジン、ボディタイプ、トランスミッション、生産国を無料で表示します。' },
                { q: '並行輸入のアメ車にも使えますか？', a: 'はい、もともと北米市場向けに生産された車両であれば使用できます。マスタングやピックアップトラックなど並行輸入で人気の車種の多くをカバーしています。欧州専用仕様の車両は表示されない場合があります。' },
                { q: 'VINコードが本物かどうかはどう確認しますか？', a: '正しいVINコードは、ちょうど17桁 — アルファベット（A〜Z、I・O・Qを除く）と数字のみです。9桁目は数学的なチェックデジットで、一致しなければ改ざんの可能性があります。このツールは自動的にこれを検証します。' },
                { q: '照会しても結果が表示されない場合は？', a: '多くの場合、その車両は欧州やアジアなど他地域向けに生産されたもので、NHTSAデータベースに登録されていないことを意味します。それでも、VINコードの10桁目から年式は算出されます。その場合は、メーカー公式のVIN照会サービスをご利用ください。' },
                { q: 'エンジン番号とVINコードは同じものですか？', a: 'いいえ。エンジン番号はエンジンブロック自体に刻印され、そのエンジン固有のものです。一方、VINコード（車台番号）は車両全体を識別します。このツールはVINコードを解析するもので、別途刻印されるエンジン番号ではありません。' },
                { q: 'VINコードは輸入関税に影響しますか？', a: '間接的には影響します。多くの国では、車両の年式と排気量に基づいて輸入税を計算しており、これらはどちらもVINコードから確認できます。関税を計算する前に正しく照会しておくことで、誤った数字での見積もりを避けられます。' },
                { q: 'VINコード照会で事故歴はわかりますか？', a: 'いいえ。無料照会でわかるのは製造仕様 — メーカー、モデル、年式、エンジン、生産国のみです。事故歴や走行距離、全損歴を確認するには、CarfaxやAutoCheckのような有料の履歴レポートが必要です。' },
                { q: 'VINコードから盗難車かどうかわかりますか？', a: 'このツールではわかりません。盗難車の照会は警察や保険会社が扱う領域です。米国のNICB（保険犯罪対策局）が「VINCheck」という無料ツールを提供しており、これは仕様照会とは別の目的で作られたものです。' },
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
              その他の無料ツール
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/tsuru/ai-shindan" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">AIメカニック</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/tsuru/kuruma-satei" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">愛車の価値は？</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/werkzeuge/fahrgestellnummer-pruefen" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Fahrgestellnummer (Deutsch)</p>
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
