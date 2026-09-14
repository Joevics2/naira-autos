import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientPt from '@/components/VINCheckerClientPt';

export const metadata: Metadata = {
  title: 'Consultar Chassi (VIN) Grátis — Decodificador de Chassi Online',
  description: 'Consulte o chassi (VIN) de qualquer carro gratuitamente. Veja marca, modelo, ano, motor e país de origem na hora — sem cadastro. Feito para o Brasil, funciona também em Portugal, Angola e Moçambique.',
  keywords: ['consultar chassi grátis', 'decodificador de chassi', 'consulta VIN', 'número do chassi carro', 'consultar VIN grátis', 'chassi carro importado', 'verificar chassi carro usado', 'decodificar chassi online', 'consulta chassi sem cadastro', 'chassi x renavam'],
  alternates: {
    canonical: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      ar: 'https://www.naira.autos/adawat/fahs-raqm-alhaykal',
      pt: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      de: 'https://www.naira.autos/werkzeuge/fahrgestellnummer-pruefen',
      ja: 'https://www.naira.autos/tsuru/vin-code-shirabe',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Consultar Chassi (VIN) Grátis | Naira Autos',
    description: 'Veja marca, modelo, ano, motor e origem de qualquer carro pelo número do chassi, grátis e na hora.',
    url: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      name: 'Consultar Chassi (VIN) Grátis — Decodificador de Chassi Online',
      description: 'Consulte o chassi (VIN) de qualquer carro gratuitamente — marca, modelo, ano, motor e país de origem.',
      url: 'https://www.naira.autos/ferramentas/decodificador-de-chassi',
      inLanguage: 'pt',
      dateModified: '2026-09-14',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://www.naira.autos/pagina-inicial' },
        { '@type': 'ListItem', position: 2, name: 'Ferramentas', item: 'https://www.naira.autos/ferramentas' },
        { '@type': 'ListItem', position: 3, name: 'Decodificador de Chassi', item: 'https://www.naira.autos/ferramentas/decodificador-de-chassi' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'O que é o chassi (VIN) de um carro?', acceptedAnswer: { '@type': 'Answer', text: 'O chassi, também chamado de VIN (Vehicle Identification Number), é um código único de 17 caracteres dado a cada veículo na fabricação. Ele traz o país de origem, o fabricante, o tipo de veículo, o motor, o ano do modelo, a fábrica de montagem e um número sequencial único. "Chassi" é o termo mais usado no Brasil; em Portugal usa-se também "chassis" ou "número de quadro".' } },
        { '@type': 'Question', name: 'Como faço para consultar o chassi grátis?', acceptedAnswer: { '@type': 'Answer', text: 'Digite o chassi de 17 caracteres acima e clique em "Decodificar". Nosso decodificador gratuito usa a base pública do NHTSA (órgão de segurança viária dos Estados Unidos) para mostrar marca, modelo, ano, motor, câmbio e fábrica de origem — sem cadastro, de qualquer país.' } },
        { '@type': 'Question', name: 'Onde fica o número do chassi no carro?', acceptedAnswer: { '@type': 'Answer', text: 'O chassi aparece em três lugares: no painel (visível pelo para-brisa do lado do motorista), numa etiqueta na moldura da porta do motorista, e gravado na estrutura do carro embaixo do capô. Os três números precisam bater exatamente.' } },
        { '@type': 'Question', name: 'Chassi e VIN são a mesma coisa?', acceptedAnswer: { '@type': 'Answer', text: 'Sim, é exatamente o mesmo código de 17 caracteres. "VIN" é o termo internacional (Vehicle Identification Number); "chassi" é como esse código é chamado no dia a dia no Brasil.' } },
        { '@type': 'Question', name: 'Chassi é a mesma coisa que RENAVAM?', acceptedAnswer: { '@type': 'Answer', text: 'Não. O RENAVAM é um número de controle administrativo criado pelo governo brasileiro (usado para multas e licenciamento), enquanto o chassi é a identidade física do veículo, gravada de fábrica em qualquer país e válida no mundo todo. O chassi nunca muda; o RENAVAM é específico do sistema brasileiro.' } },
        { '@type': 'Question', name: 'Essa ferramenta funciona para carros importados dos EUA para o Brasil?', acceptedAnswer: { '@type': 'Answer', text: 'Sim — esse é justamente o caso mais comum de uso. Carros fabricados originalmente para o mercado americano, canadense ou mexicano decodificam normalmente, o que cobre boa parte dos veículos batidos em leilão americano e trazidos ao Brasil. Carros fabricados no Brasil (chassi começando com 9B) ou fabricados só para a Europa geralmente não aparecem na base do NHTSA; nesses casos, a consulta pelo Detran ou pelo CRLV é o caminho.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Consultar Chassi (VIN) Grátis', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function DecodificadorDeChassiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/ferramentas" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Voltar">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/pagina-inicial" className="hover:text-white/60 transition-colors">Início</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/ferramentas" className="hover:text-white/60 transition-colors">Ferramentas</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Decodificador de Chassi</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Grátis</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Dados NHTSA</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Consultar Chassi (VIN)<br /><span className="text-blue-400">Grátis e na Hora</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Descubra os dados de qualquer carro pelo chassi, em segundos.</p>
            <p className="text-white/75 text-sm leading-relaxed">Digite o chassi de 17 caracteres do painel, da porta ou da estrutura do carro. Veja marca, modelo, ano, motor e país de origem — grátis, sem cadastro. Feito para quem está comprando um carro importado no Brasil, em Portugal, em Angola ou em Moçambique.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientPt />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consulta Gratuita de Chassi para Qualquer Carro Usado</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Nosso <strong className="text-foreground">decodificador de chassi grátis</strong> usa a base pública do NHTSA (órgão de segurança viária dos Estados Unidos). Uma <strong className="text-foreground">consulta de chassi gratuita</strong> te dá marca, modelo, ano, especificações do motor, tipo de câmbio, categoria de carroceria e fábrica de montagem — tudo o que você precisa para confirmar se o carro usado é mesmo o que dizem que é, antes de fechar negócio.</p>
                  <p>O mercado de usados está cada vez mais internacional. Carros fabricados para os Estados Unidos, Canadá ou México são exportados e reemplacados o tempo todo — seja como importação para o Brasil (via leilões como Copart e IAAI), como carro de coleção em Portugal, ou como picape e SUV que chegam a Angola e Moçambique. Como o chassi é gravado na fábrica e nunca muda, uma consulta gratuita funciona do mesmo jeito não importa em qual país o carro termine, desde que ele tenha sido fabricado originalmente para o mercado norte-americano.</p>
                  <p>Esse é o ponto principal: o chassi não é uma placa que seu país dá ao carro — é uma identidade de fabricação aplicada na linha de montagem, bem antes de o carro sair da fábrica. Ele não muda quando o veículo é exportado, reemplacado ou vendido várias vezes. Por isso uma consulta de chassi gratuita consegue acompanhar um carro através de fronteiras de um jeito que a placa nunca vai conseguir.</p>
                  <p>A maioria das pessoas só consulta o chassi depois de já ter negociado o preço — mas o certo é fazer isso antes mesmo de ir ver o carro, antes de dar qualquer sinal, e de novo depois da compra para confirmar que nada foi trocado na entrega. Não custa nada e leva menos de um minuto.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consulta de Chassi por País</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Brasil</strong> — o chassi (junto com o RENAVAM) é exigido em qualquer transferência de propriedade e é conferido pelo Detran na vistoria. Carros fabricados no Brasil costumam ter chassi começando com "9B" e não aparecem na base americana do NHTSA — mas uma parcela grande dos carros de leilão importados dos EUA (batidos, salvados ou de repasse) sim, e é justamente aí que essa consulta gratuita mais ajuda, antes mesmo de contratar um despachante.</p>
                  <p><strong className="text-foreground">Portugal</strong> — o registo de propriedade passa pelo IMT (Instituto da Mobilidade e dos Transportes), e o termo "chassis" é o mais comum no português europeu. Essa ferramenta é especialmente útil para carros importados dos Estados Unidos, um nicho comum entre colecionadores e importadores de picapes americanas.</p>
                  <p><strong className="text-foreground">Angola e Moçambique</strong> — boa parte dos carros usados importados nesses mercados vêm diretamente de leilões americanos ou de revendedores no Oriente Médio e na Europa. Como o mesmo chassi de 17 caracteres decodifica normalmente quando o carro é de origem americana, conferir o chassi antes de pagar um sinal ao vendedor ou ao despachante é um dos hábitos mais baratos e mais úteis que existem.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vai Comprar um Carro Importado? Faça Isso Primeiro</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Comprar um carro importado tem um risco a mais que a compra local não tem: a documentação, o vendedor e o estado real do carro podem ter vindo de um país que você nunca visitou. A consulta gratuita de chassi não substitui uma vistoria, mas é o primeiro filtro mais barato que existe, e não custa nada usar antes de avançar na negociação.</p>
                  <p>Comece decodificando o chassi e compare o resultado — ano, modelo, motor, versão — com exatamente o que o vendedor anunciou. Qualquer diferença aqui, mesmo pequena como um motor errado, costuma ser o primeiro sinal de que as fotos do anúncio e a documentação real não são do mesmo carro. Depois, confira fisicamente se o chassi do painel bate com o gravado na estrutura e com a etiqueta da porta; uma diferença entre esses três pontos é um dos sinais mais claros de placa ou chassi adulterado.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Chassi vs VIN vs RENAVAM — É Tudo a Mesma Coisa?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Chassi e VIN, sim — são exatamente o mesmo código de 17 caracteres, gravado de fábrica e reconhecido no mundo todo. <strong className="text-foreground">RENAVAM</strong> é diferente: é um número de controle criado pelo governo brasileiro só para uso administrativo (multas, licenciamento, IPVA), sem validade fora do Brasil e sem relação com a fabricação do carro. O chassi nunca muda; o RENAVAM pode até mudar em certas transferências.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Como Ler um Chassi: O Que Cada Parte Significa</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Os 17 caracteres não são aleatórios. As posições de 1 a 3 identificam o fabricante e o país de montagem — carros com chassi começando em "9B", por exemplo, foram montados no Brasil. As posições de 4 a 8 descrevem o veículo: carroceria, motor e versão. A posição 9 é um dígito verificador calculado matematicamente, usado para detectar um chassi digitado errado ou adulterado. A posição 10 define o ano do modelo, e as posições de 12 a 17 formam o número de produção único do veículo.</p>
                  <p>Saber ler essas partes sozinho continua sendo útil mesmo com um decodificador à mão, porque permite conferir o resultado em segundos. Se a posição 10 indicar um modelo 2015 e o vendedor tiver anunciado como 2018, vale a pena perguntar diretamente — não é acusação, é uma conferência que não custa nada e leva trinta segundos.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Funciona com Qualquer Marca — Ford, Toyota, Honda, Chevrolet e Mais</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Essa não é uma ferramenta de uma marca só. Como ela lê direto da base de dados das montadoras do NHTSA, o mesmo decodificador funciona para Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai e qualquer outra marca vendida no mercado norte-americano. Basta colar o código de 17 caracteres — a ferramenta identifica automaticamente o padrão certo do fabricante, sem você precisar informar a marca.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Consulta de Chassi vs Relatório Completo de Histórico</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Uma <strong className="text-foreground">consulta de chassi gratuita</strong> mostra como o carro era quando saiu da fábrica — as especificações de fabricação. Para saber o que aconteceu depois — batidas, quilometragem real, se já foi salvado ou dado como perda total — é preciso um <strong className="text-foreground">relatório de histórico</strong> pago, como Carfax ou AutoCheck. Para qualquer compra de carro usado de valor mais alto, um relatório pago é altamente recomendado além dessa consulta gratuita de especificações.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Decodificador de Chassi — Perguntas Frequentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Essa consulta de chassi é mesmo gratuita?', a: 'Sim. 100% grátis, usando a API pública do NHTSA. Não precisa de cadastro nem login. Você pode fazer quantas consultas quiser, de qualquer país.' },
                { q: 'Para que serve o número do chassi de um carro?', a: 'O chassi identifica um veículo específico para conferir especificações, consultar histórico, licenciar, fazer seguro e checar recalls. No Brasil, o chassi é exigido junto com o RENAVAM em qualquer transferência de propriedade.' },
                { q: 'Consigo ver as especificações pelo chassi de graça?', a: 'Sim. Nosso decodificador gratuito traz marca, modelo, ano, motor, tipo de carroceria, câmbio e origem direto da base de fabricantes do NHTSA, sem custo, para veículos com especificação americana, canadense ou mexicana.' },
                { q: 'Funciona para carros importados dos EUA para o Brasil?', a: 'Sim, para qualquer veículo fabricado originalmente para o mercado norte-americano — o caso mais comum entre importadores de leilão. Carros fabricados no Brasil (chassi começando em 9B) ou de especificação exclusivamente europeia podem não aparecer.' },
                { q: 'Como sei se um chassi é verdadeiro?', a: 'Um chassi válido tem exatamente 17 caracteres — letras (A-Z, sem I, O, Q) e números. A posição 9 é um dígito verificador matemático. Se ele não bater, o chassi foi adulterado. Essa ferramenta confere isso automaticamente.' },
                { q: 'E se a consulta não trouxer nenhum resultado?', a: 'Geralmente significa que o carro é de origem europeia, asiática, brasileira ou de especificação exclusiva de outro mercado — fora da base do NHTSA. Mesmo assim, decodificamos o ano do modelo pela posição 10 do chassi. Nesses casos, consulte o serviço oficial da montadora.' },
                { q: 'Número do motor é a mesma coisa que chassi?', a: 'Não. O número do motor é gravado no próprio bloco do motor e identifica só aquele motor, enquanto o chassi identifica o veículo inteiro. Essa ferramenta decodifica o chassi, não o número do motor separadamente.' },
                { q: 'O chassi influencia no valor do imposto de importação?', a: 'De forma indireta, sim. Muitos países calculam o imposto de importação com base na idade e na cilindrada do carro, duas informações confirmadas pelo chassi. Decodificar certo antes de calcular os impostos evita se planejar com números errados.' },
                { q: 'A consulta de chassi mostra se o carro já bateu?', a: 'Não. A consulta gratuita traz só as especificações de fabricação — marca, modelo, ano, motor e origem. Histórico de batida, quilometragem e situação de sinistro exigem um relatório pago, como Carfax ou AutoCheck.' },
                { q: 'Dá para saber se um carro é roubado pelo chassi?', a: 'Não por essa ferramenta. Consulta de veículo roubado é feita pelos órgãos de segurança e seguradoras — o NICB (órgão americano de combate a fraude de seguros) tem uma ferramenta gratuita chamada VINCheck para esse fim específico, diferente de um decodificador de especificações.' },
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
              Mais Ferramentas Grátis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/ferramentas/meu-mecanico-virtual" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mecânico Virtual com IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/ferramentas/quanto-vale-meu-carro" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Quanto Vale Meu Carro?</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/herramientas/decodificador-de-vin" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Decodificador de VIN (Español)</p>
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
