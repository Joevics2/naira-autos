import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import CalculadoraImportacaoBrasilClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/ferramentas/calculadora-importacao-carros-brasil';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Calculadora de importação de carros para o Brasil 2026 — II, IPI, PIS/COFINS e ICMS',
  description: 'Calculadora gratuita para importar um carro novo para o Brasil: Imposto de Importação de 35 %, IPI, PIS e COFINS-Importação, ICMS “por dentro” e AFRMM, com elétricos e híbridos a 35 % desde julho de 2026. Resultado em reais e dólares.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Calculadora de importação de carros para o Brasil | Naira Autos',
    description: 'Calcule II, IPI, PIS, COFINS e ICMS de um carro importado para o Brasil.',
    url: URL, siteName: 'Naira Autos', locale: 'pt_BR', type: 'website',
  },
  keywords: [
    'importar carro para o Brasil custo 2026', 'imposto de importação carro 35 por cento', 'ICMS por dentro importação veículo',
    'IPI carro importado alíquota', 'PIS COFINS importação carro 2,1 9,65', 'imposto carro elétrico importado julho 2026',
    'importar carro usado proibido Brasil', 'importar carro antigo 30 anos', 'AFRMM frete marítimo 25 por cento',
  ].join(', '),
};

const FAQ = [
  { q: 'Quais impostos incidem na importação de um carro para o Brasil?', a: 'Cinco tributos em cascata sobre o valor aduaneiro CIF. O Imposto de Importação é de 35 % para carros de passeio. O IPI incide sobre o CIF mais o II. O PIS-Importação e a COFINS-Importação incidem sobre o CIF, com alíquotas gerais de 2,1 % e 9,65 %. O ICMS é estadual e calculado por dentro, sobre uma base que já contém o próprio imposto. Se o frete for marítimo, soma-se o AFRMM de 25 % do frete.' },
  { q: 'O que significa calcular o ICMS “por dentro”?', a: 'Significa que o valor do ICMS entra na própria base de cálculo. A base é a soma de CIF, II, IPI, PIS, COFINS e AFRMM dividida por um menos a alíquota do estado. Com 18 %, o ICMS equivale a 21,95 % sobre o valor antes do imposto. Calcular 18 % direto sobre esse valor subestima o imposto em cerca de 3,95 pontos percentuais.' },
  { q: 'O imposto de importação de carros elétricos subiu para 35 %?', a: 'Sim. O cronograma de recomposição começou em janeiro de 2024, com 10 % para elétricos, passou por 18 % em julho de 2024 e 25 % em julho de 2025, e chegou a 35 % em 1º de julho de 2026 para elétricos e híbridos importados prontos. Os híbridos plug-in e comuns seguiram escadas intermediárias de 12 a 30 %. Um título de reportagem fala em 2027, mas o texto e as demais fontes datam o teto de julho de 2026.' },
  { q: 'Posso importar um carro usado para o Brasil?', a: 'Em regra, não. A importação de veículos usados é proibida, com exceções para carros de coleção com mais de 30 anos, veículos de competição e alguns casos especiais. Há um projeto de lei em discussão no Congresso que trataria de usados, e a Receita Federal produziu uma nota técnica em março de 2026 sobre o impacto, mas ele não é lei. Esta calculadora cobre apenas carros novos.' },
  { q: 'Qual é a alíquota de IPI de um carro importado?', a: 'Depende do NCM, da cilindrada e do combustível na TIPI. Duas fontes confirmam 7 % para motor 1.0 e 25 % para gasolina acima de 2.0, e outros guias dão faixas de 7 % a 25 %. Como a faixa intermediária não foi confirmada, a calculadora traz o IPI como campo editável, com atalhos de 7 %, 13 % e 25 %. Confirme o valor exato do seu modelo antes de comprar.' },
  { q: 'Quais são as alíquotas de PIS e COFINS na importação?', a: 'As alíquotas gerais da Lei 10.865 são de 2,1 % para o PIS-Importação e de 9,65 % para a COFINS-Importação, aplicadas sobre o valor aduaneiro, sem incluir ICMS ou as próprias contribuições, conforme decisão do STF. A mesma lei traz um parágrafo específico para máquinas e veículos da posição 87.03, e as alíquotas de 2,62 % e 12,57 % aparecem em parágrafos próprios, mas não consegui confirmar qual se aplica ao seu caso. Por isso os dois campos são editáveis.' },
  { q: 'O que muda com a reforma tributária?', a: 'A reforma prevê substituir PIS, COFINS, IPI, ICMS e ISS por CBS, IBS e um Imposto Seletivo. Em 2026 há apenas uma alíquota de teste de 1 %, compensada com PIS e COFINS, e o IPI será reduzido a zero, com exceções como a Zona Franca de Manaus. Para o carro que você importa hoje, a cascata de II, IPI, PIS, COFINS e ICMS descrita aqui continua valendo.' },
  { q: 'O que a calculadora não inclui?', a: 'Não inclui a taxa de uso do Siscomex, os honorários do despachante, a armazenagem e o desembaraço no porto, a homologação, o emplacamento, o IPVA e o seguro. Some esses custos no campo de outras despesas em reais.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Calculadora de importação de carros para o Brasil — II, IPI, PIS/COFINS e ICMS',
      description: 'Calculadora gratuita de II, IPI, PIS, COFINS, ICMS e AFRMM para um carro novo importado para o Brasil.',
      url: URL, inLanguage: 'pt-BR', dateModified: '2026-11-19',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fundador', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.naira.autos/pagina-inicial' },
          { '@type': 'ListItem', position: 2, name: 'Ferramentas', item: 'https://www.naira.autos/ferramentas' },
          { '@type': 'ListItem', position: 3, name: 'Calculadora de importação de carros para o Brasil', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'pt-BR', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculadora de importação de carros para o Brasil', inLanguage: 'pt-BR', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalculadoraImportacaoCarrosBrasilPage() {
  return (
    <div lang="pt-BR">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/ferramentas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Voltar">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/pagina-inicial" className="hover:text-white/60 transition-colors">Início</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/ferramentas" className="hover:text-white/60 transition-colors">Ferramentas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇧🇷 Calculadora de importação</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % grátis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">ICMS “por dentro”</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Verificado: novembro de 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Importar um carro<br /><span className="text-emerald-400">para o Brasil</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Quanto os impostos em cascata somam no preço de um carro importado?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Informe o preço FOB e o frete e veja o Imposto de Importação, o IPI, o PIS, a COFINS, o AFRMM e o ICMS por dentro, em reais e dólares.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Apenas uma estimativa.</strong> O IPI e o ICMS dependem do modelo e do estado, e as alíquotas de PIS e COFINS dos veículos têm leituras diferentes. Todos esses campos são editáveis. Confirme o cálculo com um despachante aduaneiro antes de comprar.
          </p>
        </div>
      </div>

      <CalculadoraImportacaoBrasilClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>II, IPI, PIS, COFINS e ICMS: como o preço se forma</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importar um carro para o Brasil empilha cinco tributos, e cada um muda a base do seguinte. O Imposto de Importação incide sobre o valor aduaneiro CIF, que soma o preço FOB, o frete e o seguro. O IPI incide sobre o CIF mais o II. O PIS-Importação e a COFINS-Importação incidem apenas sobre o CIF. Por fim, o ICMS estadual é calculado por dentro: sua base reúne tudo o que veio antes e o próprio imposto, o que eleva o peso efetivo da alíquota. Se o frete for marítimo, ainda entra o AFRMM de 25 % do frete. Nos exemplos abaixo, o carro importado chega a custar entre quase o dobro e pouco mais de duas vezes o seu valor aduaneiro.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Imposto de Importação', rate: '35 %', base: 'sobre o CIF; elétricos desde jul/2026', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'IPI', rate: '7–25 %', base: 'sobre CIF + II, conforme a TIPI', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'PIS + COFINS', rate: '11,75 %', base: 'sobre o CIF (2,1 % + 9,65 %)', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'ICMS por dentro', rate: '17–20 %', base: 'do estado, base com o próprio ICMS', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>O que mudou em 2025 e 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Elétricos e híbridos a 35 %:</strong> o cronograma de recomposição do Imposto de Importação terminou em 1º de julho de 2026. Os elétricos foram de 10 % em janeiro de 2024 para 18 % em julho de 2024, 25 % em julho de 2025 e 35 % agora. Os híbridos plug-in pararam em 28 % e os híbridos comuns em 30 % em 2025 e também chegam a 35 %.</p>
                  <p className={p}><strong className="text-foreground">Fim das cotas:</strong> as cotas de importação com alíquota reduzida acabaram em julho de 2026, e todo carro importado pronto passa a pagar a alíquota plena. Veículos fabricados no Brasil, como alguns modelos montados em Camaçari e São José dos Pinhais, escapam do imposto.</p>
                  <p className={p}><strong className="text-foreground">PIS e COFINS:</strong> a Lei Complementar 224 de 2025 mexeu em benefícios fiscais da importação em 2026, mas as alíquotas gerais de 2,1 % e 9,65 % continuam sendo a referência da maioria dos guias.</p>
                  <p className={p}><strong className="text-foreground">Reforma tributária:</strong> 2026 é o ano de teste da CBS e do IBS, com uma alíquota combinada de 1 % compensada com PIS e COFINS. A substituição real dos tributos começa depois.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemplo 1: hatch 1.0 com IPI de 7 %</h2>
                <p className={p}>Um carro de US$ 12.000 FOB com US$ 1.200 de frete e seguro, a R$ 5,50 por dólar, tem CIF de R$ 72.600. O II de 35 % é R$ 25.410. O IPI de 7 % sobre R$ 98.010 é R$ 6.860,70. O PIS é R$ 1.524,60 e a COFINS R$ 7.005,90. O AFRMM de 25 % do frete de R$ 6.600 é R$ 1.650. A base do ICMS é R$ 115.051,20 dividida por 0,82, ou R$ 140.306,34, e o ICMS de 18 % é R$ 25.255,14. Os tributos somam R$ 67.706,34, ou 93,3 % do CIF, e o custo total é R$ 140.306,34.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemplo 2: sedã a gasolina acima de 2.0 com IPI de 25 %</h2>
                <p className={p}>Com US$ 40.000 FOB e US$ 2.500 de frete e seguro, o CIF é R$ 233.750. O II é R$ 81.812,50 e o IPI de 25 % sobre R$ 315.562,50 é R$ 78.890,63. PIS e COFINS somam R$ 27.465,63, o AFRMM R$ 3.437,50 e o ICMS de 18 % R$ 93.370,88. Os tributos chegam a R$ 284.977,13, 121,9 % do CIF. O carro custa R$ 518.727,13 no porto.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemplo 3: o ICMS do estado faz diferença</h2>
                <p className={p}>Para o mesmo hatch do primeiro exemplo, um ICMS de 17 % leva os tributos a R$ 66.015,90, e um ICMS de 20 % a R$ 71.214,00. São R$ 5.198,10 de diferença apenas pelo estado de destino, por isso o campo da alíquota é editável.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemplo 4: elétrico antes e depois de julho de 2026</h2>
                <p className={p}>Para um elétrico de US$ 36.000 (CIF de R$ 198.000) e, só para isolar o efeito do II, IPI zerado, o II de 25 % é R$ 49.500 e o de 35 % é R$ 69.300. Com PIS, COFINS e ICMS de 18 % por dentro, os tributos passam de R$ 132.201,22 para R$ 156.347,56, uma alta de R$ 24.146,34. O IPI real do seu modelo deve ser confirmado.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemplo 5: por que “por dentro” pesa mais</h2>
                <p className={p}>No hatch do primeiro exemplo, o valor antes do ICMS é R$ 115.051,20. Calcular 18 % direto daria R$ 20.709,22, mas o ICMS por dentro é R$ 25.255,14, ou 21,95 % do valor antes do imposto. A diferença de R$ 4.545,92 explica por que a conta feita de cabeça costuma ficar abaixo da realidade.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Passo a passo: importar um carro para o Brasil</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Confirme que o carro é novo e que o modelo tem ou pode obter homologação no Brasil.</li>
                  <li>Descubra o NCM, a cilindrada e o combustível para saber o IPI na TIPI e o II aplicável.</li>
                  <li>Contrate um despachante aduaneiro e registre a declaração de importação no Siscomex.</li>
                  <li>Pague II, IPI, PIS, COFINS, AFRMM e o ICMS do estado de destino.</li>
                  <li>Faça o desembaraço no porto e a nacionalização do veículo.</li>
                  <li>Emplaque no Detran e contrate o seguro.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Erros comuns</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Calcular o ICMS “por fora”, aplicando a alíquota direto sobre o valor sem o próprio imposto.</li>
                  <li>Aplicar o IPI só sobre o CIF e esquecer que a base inclui o II.</li>
                  <li>Usar a alíquota antiga de 25 % do elétrico, quando desde julho de 2026 são 35 %.</li>
                  <li>Tentar importar um carro usado sem uma das exceções legais.</li>
                  <li>Esquecer o AFRMM de 25 % do frete marítimo.</li>
                  <li>Deixar fora despachante, armazenagem, homologação e emplacamento do orçamento.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>O que a calculadora não cobre</h2>
                <p className={p}>A calculadora não cobre carros usados, carros de coleção com mais de 30 anos, veículos para pessoas com deficiência, importações de Zona Franca, regimes especiais, acordos do Mercosul e do México com cotas, motos nem utilitários. Também não inclui a taxa do Siscomex, a armazenagem, a homologação, o IPVA e o seguro. O IPI, o PIS, a COFINS e o ICMS são campos editáveis porque as fontes divergem ou dependem do modelo e do estado.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Perguntas frequentes</h2>
            <div className="space-y-3 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Revisado por <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fundador. Fontes: Lei 10.865/2004 (PIS e COFINS-Importação), Lei 10.893/2004 (AFRMM), Tarifa Externa Comum do Mercosul, TIPI, Lei Complementar 214/2025 e 224/2025, nota técnica Cetad/Coest nº 042/2026 da Receita Federal, e reportagens e guias de importadores usados apenas para confirmar cronogramas e exemplos. Última verificação: novembro de 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
