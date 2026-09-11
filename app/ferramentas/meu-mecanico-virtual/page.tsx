import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientPT from './client';

export const metadata: Metadata = {
  title: 'Meu Mecânico Virtual com IA — Diagnóstico de Carro Grátis | Naira Autos',
  description: 'Mecânico virtual grátis com inteligência artificial. Descreva o problema do seu carro, ou envie uma foto, som do motor ou vídeo, e receba um diagnóstico instantâneo com estimativa de custo do reparo. Sem cadastro, feito para o Brasil.',
  alternates: {
    canonical: 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Mecânico Virtual Grátis com IA | Naira Autos',
    description: 'Diagnóstico instantâneo do seu carro online, onde você estiver. Envie o som do motor, uma foto, ou descreva o problema. Receba o nível de urgência, causas prováveis, o que fazer você mesmo, e uma estimativa de custo do reparo. 100% grátis, sem cadastro.',
    url: 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
  },
  keywords: ['mecânico virtual', 'diagnóstico de carro online', 'diagnóstico automotivo IA', 'defeito no carro', 'mecânico online grátis', 'custo de reparo do carro', 'diagnóstico automotivo grátis', 'mecânico virtual Brasil'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      name: 'Meu Mecânico Virtual com IA — Diagnóstico de Carro Grátis',
      description: 'Mecânico virtual grátis com inteligência artificial. Envie o som do motor, uma foto, ou descreva o problema. Receba um diagnóstico instantâneo com nível de urgência e estimativa de custo do reparo.',
      url: 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      inLanguage: 'pt-BR',
      dateModified: '2026-09-07',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.naira.autos/pagina-inicial' },
          { '@type': 'ListItem', position: 2, name: 'Ferramentas', item: 'https://www.naira.autos/ferramentas' },
          { '@type': 'ListItem', position: 3, name: 'Mecânico IA', item: 'https://www.naira.autos/ferramentas/meu-mecanico-virtual' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'O que é o mecânico virtual e como funciona?',
          acceptedAnswer: { '@type': 'Answer', text: 'O mecânico virtual é uma ferramenta que usa inteligência artificial para diagnosticar problemas do seu carro à distância. Você descreve o problema, envia opcionalmente uma foto, som do motor ou vídeo, e a IA analisa tudo comparando com uma enorme base de defeitos automotivos conhecidos, para te dar um diagnóstico com nível de urgência e estimativa de custo de reparo.' },
        },
        {
          '@type': 'Question',
          name: 'A ferramenta funciona no Brasil?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sim. A ferramenta funciona de qualquer país de língua portuguesa, e usa português brasileiro real — não uma tradução literal ou português de Portugal. A estimativa de custo é uma referência internacional aproximada em dólares, não um preço local exato — os valores reais variam de acordo com a região e a oficina.' },
        },
        {
          '@type': 'Question',
          name: 'A IA consegue diagnosticar meu carro só pelo som do motor?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sim. Grave o barulho de batida, chiado ou atrito — até 10 segundos gravados pelo celular já ajudam bastante. A IA analisa o padrão sonoro e consegue identificar se o problema é nos rolamentos, nas pastilhas de freio, ou outro defeito específico.' },
        },
        {
          '@type': 'Question',
          name: 'Esse serviço é gratuito?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sim, totalmente grátis — sem cadastro, sem assinatura, sem nenhum pagamento. Abra a página e comece seu diagnóstico na hora.' },
        },
        {
          '@type': 'Question',
          name: 'O diagnóstico da IA é sempre preciso?',
          acceptedAnswer: { '@type': 'Answer', text: 'Não — nem sempre é 100% preciso. É um ótimo ponto de partida com base na descrição, foto, som ou vídeo que você enviar, mas pode passar despercebido algo que só uma inspeção física no elevador com scanner detectaria. Trate como uma primeira opinião, não uma resposta definitiva, e sempre confirme pessoalmente com um mecânico de confiança em problemas de freio, direção ou combustível.' },
        },
        {
          '@type': 'Question',
          name: 'Funciona com Toyota, Fiat, Volkswagen ou outra marca?',
          acceptedAnswer: { '@type': 'Answer', text: 'Sim. Pergunte sobre um defeito na Toyota, Fiat, Volkswagen, Chevrolet, ou qualquer outra marca — a IA cobre todos os grandes fabricantes vendidos no Brasil. A estimativa de custo continua sendo uma referência internacional aproximada em dólares, não um preço local.' },
        },
        {
          '@type': 'Question',
          name: 'Minhas conversas ficam salvas nos seus servidores?',
          acceptedAnswer: { '@type': 'Answer', text: 'Não. Todo o histórico da conversa fica salvo apenas no seu dispositivo, usando o armazenamento local do navegador. Não guardamos nada nos nossos servidores além da mensagem ativa que você envia para o diagnóstico. Você pode apagar seu histórico a qualquer momento pelo menu lateral.' },
        },
        {
          '@type': 'Question',
          name: 'Preciso criar uma conta ou fazer login?',
          acceptedAnswer: { '@type': 'Answer', text: 'Não. O mecânico virtual é totalmente grátis e não exige conta, login, nem nenhuma informação pessoal. Os dados do seu veículo ficam salvos localmente no seu dispositivo, só para sua conveniência.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Mecânico Virtual com IA',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Mecânico virtual grátis com inteligência artificial. Descreva o problema, envie o som do motor ou uma foto, e receba um diagnóstico instantâneo com estimativa de custo de reparo.',
      url: 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      inLanguage: 'pt-BR',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPagePT() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientPT />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Última atualização: setembro de 2026</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Cobertura completa</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              O que o mecânico virtual oferece?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Seja para uma estimativa rápida de custo de reparo, tirar uma dúvida com um mecânico online antes de ir à oficina, ou simplesmente saber quanto vai custar o conserto — essa ferramenta cobre tudo isso, de graça.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnóstico de problemas no motor', desc: 'Batidas, falhas de ignição, marcha lenta irregular, superaquecimento, luz de injeção acesa — a IA identifica as causas mais prováveis, ordenadas por probabilidade.' },
                { title: 'Análise de som', desc: 'Envie uma gravação do barulho de batida, chiado ou atrito. A IA analisa o padrão sonoro para identificar o defeito.' },
                { title: 'Nível de urgência instantâneo', desc: 'Todo diagnóstico inclui um veredito claro em quatro níveis: seguro para dirigir, fique de olho, procure um mecânico logo, ou pare de dirigir imediatamente.' },
                { title: 'Estimativa de custo do reparo', desc: 'A estimativa é uma referência internacional aproximada em dólares — o custo real de peças e mão de obra varia por região e oficina. Use como ponto de partida e depois peça um orçamento local.' },
                { title: 'O que você pode fazer sozinho', desc: 'Quando o defeito é algo que você pode verificar ou consertar sozinho, dizemos exatamente como — antes de pagar um mecânico.' },
                { title: 'Conversa com acompanhamento', desc: 'Faça perguntas de acompanhamento e receba respostas baseadas no contexto completo. Cada sessão fica salva no seu dispositivo.' },
                { title: 'Compatível com todas as marcas', desc: 'Toyota, Honda, Fiat, Volkswagen, Chevrolet, Hyundai, Ford, Renault, Jeep, e qualquer outra marca vendida no Brasil.' },
                { title: 'Diagnóstico por foto e vídeo', desc: 'Envie uma foto de uma luz acesa no painel, um vazamento estranho, ou um dano visível. Cada mídia extra melhora bastante a precisão do diagnóstico.' },
                { title: 'Identificação das peças necessárias', desc: 'Todo diagnóstico inclui as peças específicas mais prováveis de serem a causa, para você saber exatamente o que pedir em qualquer oficina ou loja de autopeças.' },
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
                O que é o mecânico virtual com IA?
              </h2>
              <p className="mb-3"><strong className="text-foreground">O mecânico virtual</strong> é exatamente o que o nome diz: um mecânico com quem você conversa por texto, foto, áudio ou vídeo em vez de ir pessoalmente até uma oficina. Você descreve o que está acontecendo com seu carro — aquele barulho estranho na partida a frio, a luz de injeção que não apaga, o freio que parece mole — e em segundos recebe uma resposta baseada em conhecimento profundo de defeitos automotivos reais.</p>
              <p>O Axion, <strong className="text-foreground">nosso mecânico com IA</strong>, funciona com qualquer marca e em qualquer país, mas foi feito escrevendo em português brasileiro de verdade — não uma tradução do inglês, e não português de Portugal.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Como conseguir um diagnóstico para o seu carro em menos de um minuto
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Descreva o problema.</strong> Escreva o que está acontecendo — quanto mais detalhes, melhor. Quando o problema começou? Acontece só a frio, na aceleração, ou ao virar o volante?</p>
                <p><strong className="text-foreground">2. Envie uma foto, áudio ou vídeo (opcional, mas ajuda muito).</strong> Uma gravação de dez segundos do barulho do motor costuma ser mais útil do que um parágrafo inteiro de descrição.</p>
                <p><strong className="text-foreground">3. Receba seu diagnóstico na hora.</strong> Nível de urgência, causas prováveis ordenadas por probabilidade, o que você pode verificar sozinho, e uma estimativa de custo do reparo.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Estimativa de custo do reparo: evite pagar mais caro na oficina
              </h2>
              <p className="mb-3">Uma das formas mais comuns de sair no prejuízo na oficina é ir sem saber de antemão quanto o reparo deveria custar. Antes de ir a uma oficina, use nossa <strong className="text-foreground">estimativa de custo do reparo</strong> para saber o que é um preço justo — peças e mão de obra, detalhadas claramente.</p>
              <p>A estimativa leva em conta o seu carro específico — marca, modelo e ano — e o defeito mais provável de acordo com sua descrição. Não é um número genérico: um Corolla 2010 com 180.000 km apresentando queda na pressão do óleo recebe uma estimativa diferente de um Corolla 2020 com 40.000 km com a mesma luz acesa, porque a causa provável é diferente.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Funciona com qualquer marca: Toyota, Fiat, Volkswagen, Chevrolet e mais
              </h2>
              <p className="mb-3">Não importa o que você dirige. A IA conhece os padrões de defeito específicos de cada fabricante — Toyota, Honda, Fiat, Volkswagen, Chevrolet, Hyundai, Ford, Renault, Jeep, e praticamente qualquer outra marca nas ruas hoje. Informe a marca, o modelo e o ano uma vez, e o diagnóstico se ajusta aos defeitos conhecidos daquele carro específico, naquela quilometragem, em vez de te dar uma resposta genérica que serviria para qualquer carro.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Por que o diagnóstico pelo som do motor muda tudo
              </h2>
              <p className="mb-3">Um mecânico experiente muitas vezes consegue identificar um defeito só pelo som, antes mesmo de abrir o capô. Nossa IA faz o mesmo: envie uma gravação do som — batida, chiado, atrito — e o sistema analisa o padrão sonoro comparando com milhares de defeitos conhecidos. Uma gravação de dez segundos pelo celular costuma ser suficiente para diferenciar um problema sério de algo que pode esperar.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Exemplo: só texto contra texto com áudio
              </h2>
              <p>O Honda Civic do Rafael começou a fazer uma batida leve na partida a frio. Ao descrever só por texto ("barulho de batida ao ligar de manhã"), a IA retornou uma lista ampla — nível de óleo baixo, barulho de tucho, ou proteção térmica solta — com cerca de 60% de confiança. Ele então gravou 12 segundos de áudio pelo celular e enviou. Com o áudio, o diagnóstico ficou mais preciso: barulho de tucho hidráulico por causa de troca de óleo atrasada, com mais de 85% de confiança, uma faixa de custo específica, e a confirmação de que era seguro continuar dirigindo por um curto período enquanto agendava a troca de óleo.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">Precisão do diagnóstico por tipo de entrada</h3>
              <div className="space-y-3">
                {[
                  { label: 'Só descrição em texto', pct: 60, color: 'bg-orange-500' },
                  { label: '+ Foto anexada', pct: 75, color: 'bg-amber-500' },
                  { label: '+ Gravação de áudio', pct: 85, color: 'bg-emerald-500' },
                  { label: '+ Vídeo', pct: 90, color: 'bg-emerald-600' },
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
              <h3 className="font-bold text-foreground text-sm mb-3">Veículos compatíveis</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Fiat', 'Volkswagen', 'Chevrolet', 'Hyundai', 'Ford', 'Renault', 'Jeep', 'Nissan', 'Peugeot', 'Caminhões', 'Ônibus', 'Motos'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Principais vantagens</h3>
              <ul className="space-y-2.5">
                {[
                  '100% grátis — sem assinatura',
                  'Não precisa de conta nem cadastro',
                  'Funciona no celular e no computador',
                  'Estimativa de custo de referência internacional',
                  'Disponível 24 horas, até no domingo',
                  'Histórico de conversa salvo localmente',
                  'Perguntas de acompanhamento ilimitadas',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Também na Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Avaliação grátis de carro', href: '/evaluate-car' },
                  { label: 'Analisador de som do motor', href: '/tools/engine-sound-analyzer' },
                  { label: 'Calculadora de imposto de importação', href: '/tools/import-duty-calculator' },
                  { label: 'Lista de documentos do veículo', href: '/tools/vehicle-papers-checklist' },
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Comparação</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mecânico virtual contra as outras opções
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Recurso</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Mecânico IA</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Ir à oficina</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Fórum/grupo de carros</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Disponível 24 horas', 'Sim', 'Não', 'Às vezes'],
                    ['Grátis', 'Sim', 'Não', 'Sim'],
                    ['Sem precisar sair de casa', 'Sim', 'Não', 'Sim'],
                    ['Estimativa de custo', 'Sim', 'Varia', 'Não'],
                    ['Análise de som e vídeo', 'Sim', 'Sim', 'Não'],
                    ['Resposta imediata', 'Sim', 'Não', 'Às vezes'],
                    ['Qualidade constante', 'Sim', 'Varia', 'Não'],
                    ['Histórico salvo', 'Sim', 'Não', 'Não'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Perguntas frequentes</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Perguntas frequentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'O que é o mecânico virtual e como funciona?', a: 'Uma ferramenta que usa IA para diagnosticar problemas do seu carro à distância. Você descreve o problema, envia mídias opcionais, e a IA analisa tudo comparando com uma enorme base de defeitos conhecidos — com estimativa de custo de referência internacional.' },
                { q: 'A ferramenta funciona no Brasil?', a: 'Sim. A ferramenta usa português brasileiro real, não uma tradução literal. A estimativa de custo continua sendo uma referência internacional aproximada, não um preço local exato.' },
                { q: 'O diagnóstico da IA é sempre preciso?', a: 'Não — nem sempre 100% preciso. Um bom ponto de partida, mas pode não captar algo que uma inspeção física no elevador detectaria. Trate como uma primeira opinião, e sempre confirme pessoalmente com um mecânico para freio, direção ou combustível.' },
                { q: 'Funciona com Toyota, Fiat, Volkswagen ou outra marca?', a: 'Sim. Pergunte sobre qualquer marca — a IA cobre todos os grandes fabricantes vendidos no Brasil. A estimativa de custo é uma referência internacional aproximada em dólares, não um preço local.' },
                { q: 'Consegue diagnosticar meu carro só pelo som do motor?', a: 'Sim. O som é uma das entradas mais poderosas. Envie uma gravação de batida, chiado ou atrito — até 10 segundos pelo celular. A IA analisa o padrão sonoro para identificar o defeito provável.' },
                { q: 'Preciso criar uma conta ou fazer login?', a: 'Não. O mecânico virtual é totalmente grátis e não exige conta, cadastro, nem informação pessoal. Os dados do seu veículo ficam salvos localmente no seu dispositivo.' },
                { q: 'Minhas conversas ficam salvas nos seus servidores?', a: 'Não. Todo o histórico fica salvo apenas no seu dispositivo pelo armazenamento local do navegador. Não guardamos nada nos nossos servidores além da mensagem ativa.' },
                { q: 'Qual a precisão da estimativa de custo do reparo?', a: 'Ela serve como referência internacional aproximada, considerando as diferenças de preço entre regiões para peças e mão de obra. Damos uma faixa (do mínimo ao máximo) para você saber o que é razoável. Se uma oficina cobrar bem acima do máximo, vale a pena questionar.' },
                { q: 'Posso ter uma estimativa de custo para qualquer marca de carro?', a: 'Sim. Cobrimos Toyota, Honda, Fiat, Volkswagen, Chevrolet, Hyundai, Ford, Renault, Jeep, e qualquer outra grande marca vendida no Brasil. As estimativas continuam sendo uma referência internacional aproximada.' },
                { q: 'O que fazer se eu precisar de um mecânico ou oficina perto de mim?', a: 'Nossa ferramenta diagnostica o problema primeiro, para você saber exatamente o que pedir antes de começar a procurar. Se o defeito exigir inspeção física ou equipamento especializado, deixamos isso claro — e explicamos que tipo de mecânico ou oficina procurar.' },
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
            Revisado por <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, mecânico automotivo. A lógica do diagnóstico e as faixas de custo de reparo foram verificadas quanto à precisão técnica.
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Pronto? Diagnostique seu carro agora.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Grátis. Instantâneo. Sem cadastro. Receba seu diagnóstico agora.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Começar meu diagnóstico grátis
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Outras ferramentas grátis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Verificador de chassi (VIN)',      color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Lista de documentos do veículo',   color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Calculadora de imposto de importação', color: 'emerald' },
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
