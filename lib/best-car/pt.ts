// lib/best-car/pt.ts — Portuguese (pt-BR primary, pt-PT secondary) for "Melhor Carro Para Você"
import type { BestCarStrings } from '@/lib/best-car/types';

export const pt: BestCarStrings = {
  lang: 'pt',
  locale: 'pt-BR',
  localeByCountry: { br: 'pt-BR', pt: 'pt-PT' },
  dir: 'ltr',
  latin: true,

  path: '/ferramentas/melhor-carro-para-voce',
  homePath: '/pagina-inicial',
  hubPath: '/ferramentas',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/ferramentas/quanto-vale-meu-carro',

  defaultCountry: 'br',
  priorityCountries: ['br', 'pt'],
  picksCountry: 'br',

  nav: { home: 'Início', tools: 'Ferramentas', current: 'Melhor Carro Para Você', back: 'Voltar às Ferramentas', breadcrumb: 'Navegação estrutural' },

  meta: {
    title: 'Melhor Carro Para Você 2026 — Recomendador por Tipo de Uso, {countries} Países',
    description:
      'Descubra o melhor carro para o seu uso, com preços na sua moeda em {countries} países. Escolha o uso — carro de família, trabalho e aplicativo, estrada, orçamento apertado, fora de estrada, executivo, primeiro carro ou economia — e receba um top 5 entre {globalCars} modelos, pontuados por manutenção, peças e consumo.',
    keywords: [
      'melhor carro para comprar 2026', 'melhor carro familiar', 'melhor carro para aplicativo', 'recomendador de carros',
      'qual carro comprar', 'melhor suv 2026', 'carro mais barato de manter', 'melhor primeiro carro',
      'melhor carro para estrada', 'melhor carro executivo', 'carro mais econômico', 'qual carro escolher',
      'melhor carro custo-benefício', 'melhor carro fora de estrada', 'melhor carro Brasil', 'melhor carro Portugal',
      'carro barato de manutenção', 'carro confiável', 'melhor carro para Uber', 'naira autos',
    ],
    ogTitle: 'Melhor Carro Para Você 2026 — Recomendador de Carros | Naira Autos',
    ogDescription: 'Recomendador de carros global com preços locais em {countries} países. Escolha o uso e receba o top 5 ordenado por manutenção, consumo e disponibilidade de peças.',
    ogLocale: 'pt_BR',
  },

  hero: {
    badge: 'Ferramenta Grátis',
    verified: 'Preços verificados',
    h1: 'Melhor Carro Para Você',
    intro:
      'Escolha seu país e o tipo de uso e receba recomendações ordenadas, com preços na sua moeda em {countries} países — pontuadas por custo de manutenção, disponibilidade de peças, consumo e altura livre do solo. {globalCars} modelos cobertos, do Toyota Corolla ao Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'País e Moeda',
    popularCountries: 'Principais mercados',
    otherCountries: 'Outros países',
    africaNote: 'Inclui {usedCars} modelos usados de importação, típicos desta região, além dos {globalCars} modelos globais.',
    prompt: 'Para que você precisa do carro?',
    rankedBy: 'Ordenado por:',
    topRecs: 'Top {n} recomendações — {country}',
    emptyState: 'Selecione um tipo de uso acima para ver as recomendações',
    match: 'Nota',
    electric: 'Elétrico',
    electricMotor: 'Motor elétrico',
    seatsFmt: '{n} lugares',
    bootFmt: 'porta-malas {n} L',
    consumptionUnit: 'L/100 km',
    showDetails: 'Ver detalhes — problemas e cuidados',
    hideDetails: 'Ocultar detalhes',
    commonIssues: 'Problemas comuns:',
    estIn: 'est. em {country}',
    copyLink: 'Copiar link',
    linkCopied: 'Link copiado',
  },

  enums: {
    maintenance: { Low: 'Baixo', Medium: 'Médio', High: 'Alto', 'Very High': 'Muito alto' },
    spareParts: { Easy: 'Fáceis', Moderate: 'Moderadas', Hard: 'Difíceis' },
    bodyType: {
      Sedan: 'Sedã', Convertible: 'Conversível', Coupe: 'Cupê', SUV: 'SUV', Pickup: 'Picape',
      Hatchback: 'Hatch', Wagon: 'Perua', Minivan: 'Minivan', Bus: 'Micro-ônibus',
    },
    fuelType: { Petrol: 'Gasolina', Hybrid: 'Híbrido', 'Petrol Hybrid': 'Gasolina híbrido', Electric: 'Elétrico', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Automático', Manual: 'Manual', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Marcha única', '8-speed DCT': 'DCT de 8 marchas', '2-speed (rear)': '2 marchas (traseira)',
      'Single/2-speed': 'Marcha única / 2 marchas', 'Single / dual-motor': 'Motor único / duplo',
      'Single-speed (simulated gears)': 'Marcha única (marchas simuladas)',
    },
  },

  useCases: {
    family:        { label: 'Carro de Família', icon: '👨‍👩‍👧‍👦', description: 'Espaço, segurança e confiabilidade para toda a família', priorities: 'Lugares · Porta-malas · Confiabilidade · Preço', pickTitle: 'Melhor Carro de Família' },
    commercial:    { label: 'Trabalho / Aplicativo', icon: '🚖', description: 'Feito para uso profissional diário com alta quilometragem', priorities: 'Durabilidade · Peças baratas · Consumo', pickTitle: 'Melhor para Trabalho' },
    highway:       { label: 'Estrada', icon: '🛣️', description: 'Confortável e estável em viagens longas', priorities: 'Consumo · Potência · Confiabilidade', pickTitle: 'Melhor para Estrada' },
    budget:        { label: 'Orçamento Apertado', icon: '💰', description: 'O melhor custo-benefício quando o dinheiro é curto', priorities: 'Preço baixo · Baixa manutenção', pickTitle: 'Melhor Compra Econômica' },
    offroad:       { label: 'Fora de Estrada / Estrada Ruim', icon: '🪨', description: 'Grande altura livre do solo para terreno difícil e estradas ruins', priorities: 'Altura do solo · Durabilidade · Peças', pickTitle: 'Melhor Fora de Estrada' },
    executive:     { label: 'Executivo / Negócios', icon: '💼', description: 'Presença, conforto e imagem de marca para profissionais', priorities: 'Prestígio · Motor · Custos de uso', pickTitle: 'Melhor Carro Executivo' },
    firstcar:      { label: 'Primeiro Carro', icon: '🎓', description: 'Fácil de dirigir, tolerante a erros e barato de manter', priorities: 'Baixa manutenção · Peças fáceis · Confiabilidade', pickTitle: 'Melhor Primeiro Carro' },
    fuelefficient: { label: 'Economia de Combustível', icon: '⛽', description: 'O menor custo de uso por quilômetro', priorities: 'Combustível ou energia · Manutenção · Peças', pickTitle: 'Mais Econômico' },
  },

  seo: {
    reviewedByLabel: 'Revisado por:',
    reviewer: 'Equipe editorial da Naira Autos',
    updatedLabel: 'Conteúdo atualizado:',
    picksHeading: 'Melhores Carros por Tipo de Uso — 2026',
    picksNote:
      'Estas listas são geradas com a mesma pontuação da ferramenta, para um mercado de referência. A ordem exata e os preços se ajustam ao país escolhido acima, e modelos usados de importação são acrescentados para países africanos.',
    faqHeading: 'Perguntas Frequentes',
    moreToolsHeading: 'Mais ferramentas gratuitas',
    disclaimer:
      'Os preços são estimativas para {countries} mercados, não orçamentos. As notas de manutenção e de peças são avaliações editoriais e podem variar conforme o mercado. Inspecione sempre o carro, confira o histórico e peça uma cotação local antes de comprar. Algumas ferramentas relacionadas estão em inglês.',
    sections: [
      {
        h2: 'Como funciona este recomendador de carros',
        paragraphs: [
          'O Melhor Carro Para Você ordena {totalCars} veículos de acordo com o uso real que você fará deles. Você escolhe um país e um tipo de uso — família, trabalho ou aplicativo, estrada, orçamento apertado, fora de estrada, executivo, primeiro carro ou economia — e a ferramenta pontua cada modelo vendido ou comumente importado naquele mercado e mostra os cinco melhores. Cada nota vai de 0 a 100 e combina apenas fatores mensuráveis: custo de manutenção, disponibilidade de peças, consumo de combustível ou energia, altura livre do solo, número de lugares, porta-malas, tamanho do motor e preço de compra.',
          'Os pesos mudam conforme o uso. Para um carro de táxi ou de entregas, manutenção e disponibilidade de peças respondem por 70% da nota. Para quem busca fora de estrada, só a altura livre do solo vale metade. Para um primeiro carro, confiabilidade e peças fáceis importam muito mais que potência.',
          'O ranking é o mesmo em todos os países, de propósito. A nota usa o preço-base de cada carro em dólares americanos; assim, trocar São Paulo por Lisboa muda o preço exibido, não a ordem da lista. A recomendação fica sobre o carro em si, enquanto a estimativa abaixo de cada resultado se adapta à sua moeda e aos impostos e taxas de importação típicos do seu mercado. A ferramenta cobre {countries} países: {globalCars} modelos são comparados em todos eles e, nos mercados africanos, {usedCars} modelos usados de importação são acrescentados.',
        ],
      },
      {
        h2: 'Comece pelo seu uso diário, não pela ficha técnica',
        paragraphs: [
          'O melhor carro para você depende menos das especificações e mais do seu **padrão real de uso diário**. Um carro excelente no papel pode ser má escolha se o mecânico que o conhece fica longe, ou se a altura livre do solo transforma o seu trajeto em uma corrida de obstáculos.',
          'Para **trabalho e aplicativo**, o que decide é a confiabilidade com alta quilometragem e o baixo custo de peças por quilômetro. Toyota Corolla e Toyota Camry são presença constante em frotas de táxi e de entregas em vários países, porque seus motores são simples, toleram uma revisão atrasada e quase qualquer mecânico consegue consertá-los.',
          'Para **uso executivo**, a imagem da marca é real, mas não deve se sobrepor aos custos de uso. Um Mercedes-Benz Classe S tem nota Muito alto de manutenção: suspensão a ar e eletrônica complexa podem transformar um único reparo numa conta de cinco dígitos em reais. Muitos profissionais se saem melhor com um sedã convencional bem cuidado do que com um carro de luxo de alta quilometragem.',
          'Para **quem compra o primeiro carro**, o mais importante é a familiaridade dos mecânicos. Se as falhas exigem diagnóstico especializado, cada reparo demora e custa mais. Toyota e Honda com motores abaixo de 2,5 litros têm o maior ecossistema de peças, oficinas e dicas online, onde quer que você compre.',
          'Para **famílias**, lugares e porta-malas importam, mas também o preço de um SUV de três fileiras que talvez você não precise. Por isso a nota de família também premia um preço de compra menor: um crossover de cinco lugares costuma atender uma família de quatro tão bem quanto um veículo bem maior, por uma fração do custo.',
          'Para **estrada ruim e fora de estrada**, olhe primeiro a altura livre do solo e depois a tração. Cerca de 250 mm de vão livre tornam buracos, ruas alagadas e estradas de terra administráveis; um sedã de 140 mm pode funcionar na cidade com motorista cuidadoso, mas lombadas e alagamentos viram problema recorrente.',
        ],
      },
      {
        h2: 'O custo total de propriedade pesa mais que o preço de tabela',
        paragraphs: [
          'Um carro mais barato nem sempre é a escolha mais econômica. Em cinco anos, combustível, revisões, seguro, pneus e reparos podem igualar o preço de compra, sobretudo onde peças importadas demoram a chegar. Dois carros com preços parecidos podem diferir em milhares de reais no custo de propriedade só porque um divide peças com milhões de outros veículos e o outro exige um componente exclusivo de concessionária.',
          'Use as etiquetas de manutenção e de peças de cada resultado como atalho para esse custo oculto e depois passe sua lista final pela [calculadora de custo de combustível](/tools/fuel-cost-calculator-global) (em inglês) para transformar o consumo em gasto mensal conforme a sua quilometragem. O valor de revenda também conta: em muitos mercados, modelos japoneses e coreanos populares mantêm melhor o valor que marcas de nicho ou caras de manter, o que reduz o custo real de tê-los.',
        ],
      },
      {
        h2: 'Zero, usado importado e o que muda em cada mercado',
        paragraphs: [
          'A resposta certa depende do que realmente é vendido onde você mora. No Brasil, o preço de referência do usado costuma ser conferido na Tabela FIPE, e o custo anual inclui IPVA, seguro e licenciamento; além disso, muitos carros daqui rodam com motor flex, e o etanol pode mudar bastante a conta do combustível. Em Portugal, pesam o ISV na compra, o IUC anual e a inspeção periódica. Importante: esta ferramenta compara {globalCars} modelos globais e não inclui todos os carros populares vendidos localmente em cada país, então use o resultado como referência de qualidade e custo, e não como lista completa do mercado.',
          'Em grande parte da África, uma fatia enorme dos carros em circulação é de usados importados, muitas vezes com dez a vinte anos, vindos da Europa, do Japão ou da América do Norte. Ao escolher um país africano, a ferramenta acrescenta {usedCars} modelos mais antigos, com problemas típicos e dicas de inspeção para quem compra usado (os textos detalhados desses modelos ainda estão em inglês). Mercados do Golfo combinam impostos baixos e combustível barato, o que muda o valor de SUVs grandes e motores V6 em comparação com mercados de impostos altos. É por isso que existe o seletor de país: o mesmo carro pode ser uma compra sensata em um mercado e um luxo caro em outro.',
        ],
      },
      {
        h2: 'Como ler as notas de manutenção e de peças',
        paragraphs: [
          '**Custo de manutenção** indica a despesa contínua típica para manter um modelo rodando em comparação com os demais: Baixo, Médio, Alto ou Muito alto. **Disponibilidade de peças** indica a facilidade de encontrar peças de reposição: Fáceis, Moderadas ou Difíceis. Ambas são avaliações editoriais baseadas na reputação do modelo, nos preços habituais de oficina e nas redes de peças. Não são orçamento de oficina nenhuma e podem variar entre mercados.',
          'Trate Baixo e Fáceis como um bom sinal. Encare Alto ou Difíceis como um aviso para consultar mecânicos locais antes de se comprometer. Cada resultado também traz problemas comuns e um cuidado específico daquele modelo: leia antes de ir ver o carro.',
        ],
      },
      {
        h2: 'Como os preços por país são estimados — e seus limites',
        paragraphs: [
          'Cada carro tem um preço-base em dólares, um valor aproximado de versão de entrada 2025–2026. Para mostrar um preço local, a ferramenta multiplica essa base por um multiplicador de mercado próprio de cada país — uma estimativa indicativa de imposto de importação, impostos especiais, tributos sobre venda e margem usual da concessionária — e por uma taxa de câmbio. Como câmbio e regras fiscais mudam, trate o resultado como ponto de partida para o orçamento, não como cotação.',
          'Alguns modelos simplesmente não são vendidos novos em certos países, e versões, opcionais e estado de um usado podem afastar o preço real dessas estimativas. Confirme em anúncios locais ou com uma concessionária antes de definir o orçamento final.',
        ],
      },
      {
        h2: 'Da lista curta à decisão',
        paragraphs: [
          'Escolha o tipo de uso, abra **Ver detalhes** em cada um dos melhores resultados e anote os problemas comuns. Compare seus dois favoritos lado a lado no [comparador de carros](/tools/car-comparison) (em inglês). Antes de pagar por qualquer usado, confira o histórico com o [decodificador de chassi](/ferramentas/decodificador-de-chassi) e faça uma vistoria mecânica independente. Depois de comprar, a ferramenta [Quanto vale meu carro](/ferramentas/quanto-vale-meu-carro) ajuda a acompanhar o valor dele. Com **Copiar link** você compartilha com seu cônjuge ou seu mecânico exatamente o país e o uso que escolheu.',
        ],
      },
    ],
    exampleTitle: 'Exemplo: ajustar o carro ao uso real',
    exampleBody:
      'Cenário ilustrativo, não um caso real de cliente. Imagine o dono de um pequeno negócio de entregas numa cidade grande que se sente atraído por um SUV de sete lugares pelo espaço de carga. No ranking de trabalho, porém, o Toyota Corolla e o Toyota RAV4 pontuam acima de veículos maiores, porque as rotas reais são trajetos curtos de para-e-anda com cargas moderadas, em que o custo de peças por quilômetro e o consumo pesam mais que o volume de carga. As notas não dizem que o SUV é um mau veículo; dizem que ele combina menos com esse padrão de uso. O dinheiro economizado na compra e no combustível pode ficar no negócio como capital de giro.',
  },

  related: { compare: 'Comparador de carros (EN)', fuel: 'Calculadora de combustível (EN)', valuation: 'Quanto vale meu carro' },

  faqs: [
    { q: 'Esta ferramenta mostra preços reais para o meu país?', a: 'Ela mostra uma estimativa, não uma cotação ao vivo. Cada carro tem um preço-base em dólares; ao escolher seu país, aplica-se o multiplicador típico de impostos e taxas daquele mercado e uma taxa de câmbio para estimar o preço local. Confirme com uma concessionária ou anúncio local antes de fazer o orçamento exato.' },
    { q: 'Como os carros são pontuados?', a: 'Cada carro recebe uma nota de 0 a 100 por tipo de uso, a partir de fatores mensuráveis — custo de manutenção, disponibilidade de peças, consumo, altura livre do solo, lugares, porta-malas, tamanho do motor e preço de compra — com pesos diferentes para cada uso. O ranking não muda por país; só muda o preço exibido.' },
    { q: 'Qual é o melhor carro de família para comprar?', a: 'No nosso ranking, {picks:family} ficam no topo para uso familiar, equilibrando lugares, porta-malas, confiabilidade e preço. Famílias grandes devem conferir o número de lugares nos detalhes de cada resultado.' },
    { q: 'Qual é o melhor carro para trabalho ou aplicativo?', a: 'Para uso profissional com alta quilometragem, os três primeiros são {picks:commercial}. Combinam baixo custo de manutenção, peças fáceis e consumo razoável, o que mantém o custo por quilômetro baixo.' },
    { q: 'Qual é o melhor carro para estradas ruins?', a: 'Altura livre do solo e durabilidade lideram este ranking. Os três primeiros hoje são {picks:offroad}. Para uso só urbano, um sedã é administrável com cuidado, mas alagamentos e lombadas testam os carros baixos.' },
    { q: 'Qual é o melhor primeiro carro?', a: 'As melhores opções de primeiro carro são {picks:firstcar}: baixa manutenção, peças fáceis e mecânicos que os conhecem em todo lugar. Evite marcas exóticas e de ultraluxo como primeiro carro: as peças são caras e é preciso um mecânico especializado.' },
    { q: 'Quais carros são os mais econômicos em combustível ou energia?', a: 'Lideram os híbridos e os elétricos: {picks:fuelefficient}. Um elétrico só faz sentido se houver recarga confiável onde você mora e dirige; confira a cobertura de recarga antes de decidir.' },
    { q: 'Por que os países africanos mostram modelos usados mais antigos?', a: 'Em muitos mercados africanos, o usado importado é a forma principal de comprar um carro. Ao escolher um país africano, a ferramenta acrescenta {usedCars} modelos mais antigos com problemas típicos e dicas de inspeção, além dos {globalCars} modelos globais.' },
  ],

  schema: {
    appName: 'Melhor Carro Para Você — recomendador de carros por tipo de uso',
    appDescription: 'Recomendador de carros gratuito: escolha um país e um tipo de uso e receba um top 5 entre {totalCars} carros, com preços locais estimados em {countries} países.',
    publisher: 'Naira Autos',
    author: 'Equipe editorial da Naira Autos',
  },
};
