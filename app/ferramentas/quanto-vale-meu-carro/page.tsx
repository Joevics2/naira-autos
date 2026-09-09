import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { QuantoValeMeuCarroClient } from './client';

export const metadata: Metadata = {
  title: 'Quanto Vale Meu Carro? Avaliação Grátis com IA | Naira Autos',
  description: 'Avalie seu carro gratuitamente com IA, na sua moeda local. Envie uma foto e receba um preço instantâneo — Brasil, Portugal, Angola, Moçambique e mais.',
  keywords: 'quanto vale meu carro, avaliação de carro grátis, preço de carro usado, avaliação de carro com IA, avaliar meu carro online, calcular preço do meu carro',
  openGraph: {
    title: 'Quanto Vale Meu Carro? Avaliação Grátis com IA',
    description: 'Avalie seu carro com IA, na sua moeda local, em vários países de língua portuguesa. Envie uma foto e receba uma avaliação instantânea — totalmente grátis.',
    url: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
    siteName: 'Naira Autos',
    locale: 'pt',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Quanto Vale Meu Carro? Avaliação Grátis com IA',
  description: 'Ferramenta gratuita de avaliação de carros com IA. Estimativa instantânea na sua moeda local, calibrada para o mercado do seu país.',
  url: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
  inLanguage: 'pt',
  dateModified: '2026-09-09',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Avaliação de Carro com IA — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Envie uma foto do seu carro e receba uma avaliação instantânea do preço de mercado, com IA e na sua moeda.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.naira.autos/pagina-inicial' },
      { '@type': 'ListItem', position: 2, name: 'Ferramentas', item: 'https://www.naira.autos/ferramentas' },
      { '@type': 'ListItem', position: 3, name: 'Quanto Vale Meu Carro', item: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Quanto vale meu carro usado?', acceptedAnswer: { '@type': 'Answer', text: 'Depende da marca, modelo, ano, versão, quilometragem e estado geral, além dos preços atuais de venda de carros semelhantes no seu país. Envie uma foto acima e escolha seu país — a IA identifica seu carro e te dá uma faixa de preço na sua moeda local, com base em anúncios reais desse mercado.' } },
        { '@type': 'Question', name: 'Quais fatores influenciam a avaliação de um carro usado?', acceptedAnswer: { '@type': 'Answer', text: 'Os principais fatores são: (1) marca e modelo — alguns mantêm o valor melhor dependendo do mercado. (2) Ano, versão e quilometragem. (3) Estado da lataria e da pintura. (4) Estado mecânico e histórico de manutenção. (5) Documentação e licenciamento em dia. (6) Oferta e demanda local — o mesmo carro pode valer diferente dependendo do país.' } },
      { '@type': 'Question', name: 'O meu país influencia a avaliação?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, muito. Impostos de importação, demanda local por certas marcas, força da moeda e o tamanho do mercado de usados fazem os preços variarem bastante entre países. Nossa ferramenta cobre vários países de língua portuguesa e te dá uma estimativa na moeda local correta, calibrada para aquele mercado, não numa média global.' } },
      { '@type': 'Question', name: 'Quão precisa é a avaliação com IA?', acceptedAnswer: { '@type': 'Answer', text: 'Nossa ferramenta usa visão computacional para identificar com precisão a marca, modelo, ano e versão a partir da sua foto, e depois compara com dados reais de anúncios no país escolhido para te dar uma faixa de preço, não um número único. Trate como um ponto de partida confiável para negociar, não um preço final — o valor real sempre depende de uma inspeção pessoal e negociação.' } },
      { '@type': 'Question', name: 'Essa ferramenta de avaliação é realmente grátis?', acceptedAnswer: { '@type': 'Answer', text: 'Sim. Sem nenhum custo, sem cadastro, e sem limite de uso.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marca e valor de revenda', body: 'A força de revenda varia por mercado — Toyota e Honda mantêm bem o valor na maioria das regiões, enquanto marcas alemãs de luxo desvalorizam mais rápido em mercados onde a manutenção é cara. A demanda local importa tanto quanto a marca.' },
  { icon: Shield, title: 'Quilometragem e histórico de manutenção', body: 'Baixa quilometragem e um histórico de manutenção documentado são os dois indicadores mais fortes de um carro bem cuidado, em qualquer lugar do mundo. Um histórico limpo pode valer mais do que um modelo um ano mais novo.' },
  { icon: CheckCircle2, title: 'Documentação e propriedade', body: 'Documentação limpa e completa, com licenciamento em dia, é inegociável para conseguir o melhor valor em qualquer mercado. Papelada incompleta ou problemas de importação podem derrubar o preço em 15 a 25%.' },
  { icon: AlertCircle, title: 'Estado geral', body: 'Lataria limpa, sem riscos, ferrugem ou pintura desgastada, com motor mecanicamente saudável, adiciona consistentemente de 10 a 15% ao valor de mercado em comparação com um carro semelhante com sinais visíveis de desgaste.' },
];

const FAQ_ITEMS = [
  { q: 'Quanto vale meu carro usado?', a: 'Depende da marca, modelo, ano, versão, quilometragem e estado — além dos preços atuais de venda de carros semelhantes no seu país. Envie uma foto acima e escolha seu país para uma avaliação com IA na sua moeda local.' },
  { q: 'Quais fatores influenciam a avaliação de um carro usado?', a: 'Marca e modelo, ano e versão, quilometragem, estado da lataria e da mecânica, documentação e licenciamento em dia, além da oferta e demanda local no seu mercado específico.' },
  { q: 'O meu país influencia a avaliação?', a: 'Sim — impostos de importação, demanda local por certas marcas, força da moeda e tamanho do mercado fazem os preços variarem entre países. Cobrimos vários países de língua portuguesa e te damos o preço na sua moeda local, não uma média global.' },
  { q: 'Como precifico meu carro corretamente antes de vender?', a: 'Use nossa ferramenta gratuita de avaliação com IA para ter um número, depois confira anúncios ativos localmente de carros semelhantes. Precificar 5 a 10% acima do mínimo que você aceitaria costuma deixar espaço para negociação.' },
  { q: 'Quão precisa é a avaliação com IA?', a: 'Ela usa visão computacional para identificar seu carro com precisão a partir da foto, depois compara com dados reais de anúncios no país escolhido. Trate como um ponto de partida confiável, não um preço final — o valor real depende de inspeção e negociação.' },
  { q: 'A ferramenta de avaliação de carros é grátis?', a: 'Sim — sem custo, sem cadastro, e sem limite de uso.' },
];

export default function QuantoValeMeuCarroPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Hero escuro ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/ferramentas" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Voltar">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Trilha de navegação" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/pagina-inicial" className="hover:text-white/60 transition-colors">Início</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/ferramentas" className="hover:text-white/60 transition-colors">Ferramentas</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Quanto Vale Meu Carro</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Com IA · Grátis
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Quanto vale<br /><span className="text-amber-400">seu carro?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Envie uma foto — receba uma avaliação de mercado instantânea na sua moeda local, com base em dados reais de anúncios e IA.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Análise por foto</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Brasil · Portugal · Angola · Moçambique e mais</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Grátis</span>
            </div>
          </div>
        </div>

        {/* ── Ferramenta de avaliação ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <QuantoValeMeuCarroClient />
          </div>
        </div>

        {/* ── Conteúdo SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Entendendo o valor</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              O que determina o preço de um carro usado?
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
              Avaliação de carros usados: o guia completo
            </h2>

            <p>Saber o valor de mercado real do seu carro é o passo mais importante antes de anunciá-lo para venda, dar de entrada em outro, ou negociar uma compra — em qualquer lugar do mundo. Precificar alto demais deixa seu anúncio parado. Precificar baixo demais deixa dinheiro real na mesa. O desafio é que <strong className="text-foreground">o &ldquo;valor de mercado&rdquo; não é um número único</strong> — ele muda por país, por moeda, pela demanda local por uma marca específica, e pelo histórico e estado individual de cada carro.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Por que o mesmo carro não vale o mesmo em países diferentes</h3>
            <p>Um Toyota Corolla de cinco anos em bom estado pode valer um valor bem diferente no Brasil, em Portugal ou em Angola — mesmo antes da conversão de moeda. Impostos de importação e taxas locais sobre carros usados variam muito entre países. Alguns mercados têm forte demanda local por certas marcas (marcas japonesas em boa parte da África lusófona, por exemplo), o que mantém os preços de revenda mais altos. Outros mercados têm um mercado de carros novos maior, que afasta compradores dos usados, reduzindo seu valor de revenda. Por isso um guia de preços único e global não funciona — a avaliação precisa ser calibrada por país.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Quilometragem e histórico de manutenção</h3>
            <p>Em quase todos os mercados, a quilometragem e um histórico de manutenção documentado são indicadores mais confiáveis do estado de um carro do que qualquer foto pode mostrar. Um carro com quilometragem menor e um histórico de manutenção completo geralmente recebe um valor extra considerável em relação a um carro parecido do mesmo ano com quilometragem maior, mesmo que pareçam iguais na foto. Um histórico de manutenção incompleto ou ausente é uma das formas mais rápidas de perder poder de negociação como vendedor.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Documentação, licenciamento e propriedade</h3>
            <p>Em todos os países que cobrimos, <strong className="text-foreground">documentação limpa e completa é inegociável para conseguir o melhor valor</strong>. Compradores, com razão, descontam do valor de carros com documentação incompleta, impostos de importação pendentes, ou licenciamento atrasado, porque o risco de complicações na transferência de propriedade é real em qualquer país. Resolver problemas de documentação antes de anunciar geralmente custa muito menos do que o desconto que os compradores vão exigir de outra forma.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Estado geral e apresentação</h3>
            <p>Lataria limpa, sem riscos, ferrugem ou pintura desgastada, com motor e câmbio mecanicamente saudáveis, adiciona consistentemente ao preço em comparação com um carro parecido com sinais visíveis de desgaste — seja o carro vendido em São Paulo, Lisboa ou Luanda. Reparos simples e baratos (uma boa limpeza, consertar riscos pequenos, trocar uma lâmpada queimada) geralmente se pagam várias vezes no preço final de venda.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Moeda e o momento do mercado</h3>
            <p>Em países muito dependentes de carros usados importados, os preços dos carros estão fortemente ligados às variações da taxa de câmbio — uma moeda local fraca aumenta o custo de importação e empurra os preços dos usados para cima, enquanto uma moeda mais forte tem o efeito contrário. Isso significa que uma avaliação de um ou dois anos atrás pode não ser um guia confiável para os preços atuais. Sempre confira dados de mercado atuais em vez de confiar num guia de preços antigo ou no valor pago por um dono anterior.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Como essa ferramenta funciona</h3>
            <p>Envie uma foto nítida do seu carro e escolha seu país. A IA (Gemini Vision) identifica a marca, modelo, ano e versão a partir da foto, depois compara com dados reais de anúncios recentes no mercado escolhido para te dar uma faixa de preço na sua moeda local — não apenas uma estimativa única. O resultado inclui os fatores específicos que influenciaram a avaliação, para você entender por que chegou naquele número. Feita para ser um ponto de partida rápido e gratuito para negociar, não um substituto para uma inspeção pessoal.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Perguntas frequentes</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Perguntas mais frequentes
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
              Mais ferramentas grátis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/ferramentas/meu-mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecânico Virtual com IA</p>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/ferramentas" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Todas as ferramentas</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/pagina-inicial" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Início em Português</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
