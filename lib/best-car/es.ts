// lib/best-car/es.ts — Spanish strings for "Mejor Auto Para Ti" (/herramientas/mejor-auto-para-ti)
import type { BestCarStrings } from '@/lib/best-car/types';

export const es: BestCarStrings = {
  lang: 'es',
  locale: 'es-ES',
  localeByCountry: { es: 'es-ES', mx: 'es-MX', ar: 'es-AR', co: 'es-CO', cl: 'es-CL', pe: 'es-PE', us: 'es-US' },
  dir: 'ltr',
  latin: true,

  path: '/herramientas/mejor-auto-para-ti',
  homePath: '/inicio',
  hubPath: '/herramientas',
  aboutPath: '/about',
  comparePath: '/herramientas/comparador-de-autos',
  fuelPath: '/herramientas/calculadora-de-costo-de-combustible-global',
  valuationPath: '/cuanto-vale-mi-auto',

  defaultCountry: 'es',
  priorityCountries: ['es', 'mx', 'co', 'ar', 'cl', 'pe', 'us'],
  picksCountry: 'es',

  nav: { home: 'Inicio', tools: 'Herramientas', current: 'Mejor Auto Para Ti', back: 'Volver a Herramientas', breadcrumb: 'Ruta de navegación' },

  meta: {
    title: 'Mejor Auto Para Ti 2026 — Recomendador por Caso de Uso, {countries} Países',
    description:
      'Encuentra el mejor auto para tus necesidades, con precios en tu propia moneda en {countries} países. Elige tu caso de uso — auto familiar, uso comercial, carretera, presupuesto ajustado, todoterreno, ejecutivo, primer auto o eficiencia de combustible — y recibe un top 5 ordenado entre {globalCars} modelos, según costo de mantenimiento, repuestos y consumo.',
    keywords: [
      'mejor auto para comprar 2026', 'mejor auto familiar', 'mejor auto para uso comercial', 'recomendador de autos',
      'qué auto debería comprar', 'mejor suv 2026', 'auto más barato de mantener', 'mejor primer auto',
      'mejor auto para carretera', 'mejor auto ejecutivo', 'auto más eficiente en combustible', 'recomendación de auto',
      'mejor auto económico', 'mejor auto todoterreno', 'mejor coche para comprar 2026', 'mejor coche familiar',
      'mejor coche españa', 'mejor auto méxico', 'mejor auto argentina', 'mejor auto colombia', 'mejor auto chile',
      'mejor auto perú', 'qué auto comprar con poco presupuesto', 'naira autos',
    ],
    ogTitle: 'Mejor Auto Para Ti 2026 — Recomendador de Autos | Naira Autos',
    ogDescription: 'Recomendador de autos global con precios locales en {countries} países. Elige tu caso de uso y recibe el top 5 ordenado por mantenimiento, consumo y disponibilidad de repuestos.',
    ogLocale: 'es_ES',
  },

  hero: {
    badge: 'Herramienta Gratis',
    verified: 'Precios verificados',
    h1: 'Mejor Auto Para Ti',
    intro:
      'Elige tu país y tu caso de uso y recibe recomendaciones de autos ordenadas, con precios en tu propia moneda en {countries} países — puntuadas por costo de mantenimiento, disponibilidad de repuestos, consumo y altura al piso. {globalCars} modelos cubiertos, desde el Toyota Corolla hasta el Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'País y Moneda',
    popularCountries: 'Mercados principales',
    otherCountries: 'Otros países',
    africaNote: 'Incluye {usedCars} modelos de importación usados, específicos de esta región, además de los {globalCars} modelos globales.',
    prompt: '¿Para qué necesitas el auto?',
    rankedBy: 'Ordenado por:',
    topRecs: 'Top {n} recomendaciones — {country}',
    emptyState: 'Selecciona un caso de uso arriba para ver recomendaciones',
    match: 'Coincidencia',
    electric: 'Eléctrico',
    electricMotor: 'Motor eléctrico',
    seatsFmt: '{n} asientos',
    bootFmt: '{n} L de maletero',
    consumptionUnit: 'L/100km',
    showDetails: 'Ver detalles — problemas y precauciones',
    hideDetails: 'Ocultar detalles',
    commonIssues: 'Problemas comunes:',
    estIn: 'est. en {country}',
    copyLink: 'Copiar enlace',
    linkCopied: 'Enlace copiado',
  },

  enums: {
    maintenance: { Low: 'Baja', Medium: 'Media', High: 'Alta', 'Very High': 'Muy alta' },
    spareParts: { Easy: 'Fácil', Moderate: 'Moderada', Hard: 'Difícil' },
    bodyType: {
      Sedan: 'Sedán', Convertible: 'Descapotable', Coupe: 'Cupé', SUV: 'SUV', Pickup: 'Pickup',
      Hatchback: 'Hatchback', Wagon: 'Familiar (wagon)', Minivan: 'Minivan', Bus: 'Autobús',
    },
    fuelType: { Petrol: 'Gasolina', Hybrid: 'Híbrido', 'Petrol Hybrid': 'Gasolina híbrido', Electric: 'Eléctrico', Diesel: 'Diésel' },
    transmission: {
      Automatic: 'Automática', Manual: 'Manual', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Una velocidad', '8-speed DCT': 'DCT de 8 velocidades', '2-speed (rear)': '2 velocidades (trasero)',
      'Single/2-speed': 'Una/2 velocidades', 'Single / dual-motor': 'Motor único / doble motor',
      'Single-speed (simulated gears)': 'Una velocidad (marchas simuladas)',
    },
  },

  useCases: {
    family:        { label: 'Auto Familiar', icon: '👨‍👩‍👧‍👦', description: 'Espacio, seguridad y fiabilidad para toda la familia', priorities: 'Asientos · Maletero · Fiabilidad · Precio', pickTitle: 'Mejor Auto Familiar' },
    commercial:    { label: 'Uso Comercial / App', icon: '🚖', description: 'Pensado para uso comercial diario de alto kilometraje', priorities: 'Durabilidad · Repuestos baratos · Consumo', pickTitle: 'Mejor para Uso Comercial' },
    highway:       { label: 'Manejo en Carretera', icon: '🛣️', description: 'Cómodo y estable en viajes largos', priorities: 'Consumo · Potencia · Fiabilidad', pickTitle: 'Mejor para Carretera' },
    budget:        { label: 'Compra Económica', icon: '💰', description: 'La mejor relación precio-valor con presupuesto ajustado', priorities: 'Precio bajo · Bajo mantenimiento', pickTitle: 'Mejor Compra Económica' },
    offroad:       { label: 'Todoterreno / Caminos Malos', icon: '🪨', description: 'Alta altura al piso para terreno difícil y caminos en mal estado', priorities: 'Altura al piso · Durabilidad · Repuestos', pickTitle: 'Mejor Todoterreno' },
    executive:     { label: 'Ejecutivo / Negocios', icon: '💼', description: 'Presencia, comodidad e imagen de marca para profesionales', priorities: 'Prestigio · Motor · Costos de uso', pickTitle: 'Mejor Auto Ejecutivo' },
    firstcar:      { label: 'Primer Auto', icon: '🎓', description: 'Fácil de manejar, tolerante a errores y económico de mantener', priorities: 'Bajo mantenimiento · Repuestos fáciles · Fiabilidad', pickTitle: 'Mejor Primer Auto' },
    fuelefficient: { label: 'Eficiencia de Combustible', icon: '⛽', description: 'El menor costo de uso por kilómetro', priorities: 'Consumo o energía · Mantenimiento · Repuestos', pickTitle: 'Más Eficiente' },
  },

  seo: {
    reviewedByLabel: 'Revisado por:',
    reviewer: 'Equipo Editorial de Naira Autos',
    updatedLabel: 'Contenido actualizado:',
    picksHeading: 'Mejores Autos por Caso de Uso — 2026',
    picksNote:
      'Estas listas se generan con la misma puntuación que usa la herramienta, para un mercado de referencia. El orden exacto y los precios se ajustan al país que elijas arriba, y en países africanos se añaden modelos de importación usados.',
    faqHeading: 'Preguntas Frecuentes',
    moreToolsHeading: 'Más herramientas gratuitas',
    disclaimer:
      'Los precios son estimaciones para {countries} mercados, no cotizaciones. Las calificaciones de mantenimiento y repuestos son valoraciones editoriales y pueden variar según el mercado. Inspecciona siempre el auto, revisa su historial y pide una cotización local antes de comprar.',
    sections: [
      {
        h2: 'Cómo funciona este recomendador de autos',
        paragraphs: [
          'Mejor Auto Para Ti ordena {totalCars} vehículos según el uso real que le vas a dar. Eliges un país y un caso de uso — familiar, comercial o de aplicaciones, carretera, presupuesto ajustado, todoterreno, ejecutivo, primer auto o eficiencia de combustible — y la herramienta puntúa cada modelo que se vende o se importa con frecuencia en ese mercado y te muestra los cinco mejores. Cada puntuación va de 0 a 100 y combina solo factores medibles: costo de mantenimiento, disponibilidad de repuestos, consumo de combustible o energía, altura al piso, número de asientos, capacidad del maletero, tamaño del motor y precio de compra.',
          'Los pesos cambian según el caso de uso. Para un auto de trabajo, el mantenimiento y los repuestos suman el 70 % de la nota. Para quien busca un todoterreno, la altura al piso pesa por sí sola la mitad. Para un primer auto, la fiabilidad y los repuestos fáciles importan mucho más que la potencia.',
          'El ranking es el mismo en todos los países a propósito. La puntuación usa el precio base en dólares de cada auto, así que pasar de Madrid a Ciudad de México cambia el precio que ves, no el orden de la lista. Así la recomendación trata del auto en sí, mientras que la estimación bajo cada resultado se adapta a tu moneda y a los impuestos y aranceles típicos de tu mercado. La herramienta cubre {countries} países: {globalCars} modelos se comparan en todos, y en los mercados africanos se añaden {usedCars} modelos de importación usados.',
        ],
      },
      {
        h2: 'Empieza por tu uso diario, no por la ficha técnica',
        paragraphs: [
          'El mejor auto para ti depende menos de las especificaciones y más de tu **patrón de uso diario real**. Un auto excelente en papel puede ser mala elección si el mecánico que lo conoce está lejos, o si su altura al piso convierte tu trayecto diario en una carrera de obstáculos.',
          'Para **uso comercial y de aplicaciones**, lo decisivo es la fiabilidad con alto kilometraje y un bajo costo de repuestos por kilómetro. El Toyota Corolla y el Toyota Camry son habituales en flotas de taxis y reparto en muchos países porque sus motores son sencillos, toleran algún servicio omitido y casi cualquier mecánico puede repararlos.',
          'Para **uso ejecutivo**, la imagen de marca es real, pero no debería imponerse a los costos de uso. Un Mercedes-Benz Clase S tiene aquí una calificación de mantenimiento Muy alta: la suspensión neumática y la electrónica compleja pueden convertir una sola reparación en una factura de cuatro cifras. Muchos profesionales salen mejor con un sedán convencional bien cuidado que con un auto de lujo de alto kilometraje.',
          'Para **compradores primerizos**, lo más importante es que el mecánico conozca el auto. Si sus fallas requieren un diagnóstico especializado, cada reparación tarda más y cuesta más. Los Toyota y Honda con motores de menos de 2,5 litros tienen el mayor ecosistema de repuestos, talleres y consejos en línea, compres donde compres.',
          'Para **familias**, importan los asientos y el maletero, pero también el precio de una SUV de tres filas que quizá no necesites. Por eso la nota familiar premia también un precio de compra menor: una crossover de cinco plazas suele servir a una familia de cuatro tan bien como un vehículo mucho más grande, a una fracción del costo.',
          'Para **caminos malos y todoterreno**, mira primero la altura al piso y después la tracción. Unos 250 mm de altura hacen manejables los baches, las calles inundadas y los caminos de tierra; un sedán de 140 mm puede funcionar en ciudad si se conduce con cuidado, pero los topes y las inundaciones se vuelven un problema constante.',
        ],
      },
      {
        h2: 'El costo total de propiedad pesa más que el precio de etiqueta',
        paragraphs: [
          'Un auto más barato no siempre es la opción más económica. En cinco años, el combustible, los servicios, el seguro, los neumáticos y las reparaciones pueden igualar el precio de compra, sobre todo en mercados donde las piezas importadas tardan en llegar. Dos autos con precios parecidos pueden diferir en miles de dólares de costo de propiedad simplemente porque uno comparte piezas con millones de vehículos y el otro necesita un componente exclusivo de concesionario.',
          'Usa las etiquetas de mantenimiento y repuestos de cada resultado como atajo para ese costo oculto y luego pasa tu lista corta por la [Calculadora de Costo de Combustible](/herramientas/calculadora-de-costo-de-combustible-global) para convertir el consumo en un gasto mensual según tu kilometraje. El valor de reventa también cuenta: en muchos mercados, los modelos japoneses y coreanos convencionales tienden a conservar mejor su valor que las marcas de nicho o de mantenimiento costoso, lo que reduce el costo real de tenerlos.',
        ],
      },
      {
        h2: 'Autos nuevos, usados importados y qué cambia según el mercado',
        paragraphs: [
          'La respuesta correcta depende de lo que realmente se vende donde vives. En España y en buena parte de Europa, la mayoría compra entre autos nuevos y usados de mercado local, y los {globalCars} modelos globales lo cubren bien; allí conviene revisar además la etiqueta ambiental y las restricciones de circulación en tu ciudad. En México, Colombia, Perú, Chile o Argentina, los impuestos de importación, la oferta de versiones y la red de repuestos varían mucho de un país a otro, y un modelo muy común en uno puede ser raro o carísimo en otro.',
          'En muchos países africanos, una gran parte de los autos en circulación son usados importados de diez a veinte años. Al elegir uno de ellos, la herramienta añade {usedCars} modelos más antiguos con problemas típicos y consejos de inspección para compradores de usados. Los mercados del Golfo suelen combinar impuestos bajos con combustible barato, lo que cambia el valor de las SUV grandes y los motores V6 frente a mercados de impuestos altos como Singapur o el norte de Europa. Por eso existe el selector de país: el mismo auto puede ser una compra sensata en un mercado y un capricho caro en otro.',
        ],
      },
      {
        h2: 'Cómo leer las calificaciones de mantenimiento y repuestos',
        paragraphs: [
          '**Costo de mantenimiento** indica el gasto habitual de mantener un modelo en circulación frente a los demás: Baja, Media, Alta o Muy alta. **Disponibilidad de repuestos** indica lo fácil que es conseguir piezas: Fácil, Moderada o Difícil. Ambas son valoraciones editoriales basadas en la reputación del modelo, los precios de servicio habituales y las redes de repuestos. No son una cotización de ningún taller y pueden variar entre mercados.',
          'Considera Baja y Fácil como una buena señal. Trata Alta o Difícil como un aviso para preguntar a mecánicos locales antes de comprometerte. Cada resultado incluye además problemas comunes y una precaución específica de ese modelo: léelos antes de ir a ver el auto.',
        ],
      },
      {
        h2: 'Cómo se estiman los precios por país y cuáles son sus límites',
        paragraphs: [
          'Cada auto tiene un precio base en dólares, una cifra aproximada de versión de entrada 2025–2026. Para mostrar un precio local, la herramienta multiplica esa base por un multiplicador de mercado propio de cada país — una estimación orientativa de aranceles, impuestos especiales, IVA y margen habitual del concesionario — y por un tipo de cambio. Como los tipos de cambio y las normas fiscales cambian, considera el resultado un punto de partida para tu presupuesto, no una cotización.',
          'Algunos modelos sencillamente no se venden nuevos en ciertos países, y las versiones, los opcionales y el estado de un usado pueden alejar el precio real de estas estimaciones. Confirma con anuncios locales o con un concesionario antes de fijar tu presupuesto final.',
        ],
      },
      {
        h2: 'De la lista corta a la decisión',
        paragraphs: [
          'Elige tu caso de uso, abre **Ver detalles** en cada uno de los mejores resultados y anota los problemas comunes. Compara tus dos favoritos lado a lado con el [Comparador de Autos](/herramientas/comparador-de-autos). Antes de pagar por cualquier usado, revisa su historial con el [decodificador de VIN](/herramientas/decodificador-de-vin) y pide una inspección mecánica independiente. Cuando ya tengas el auto, [¿Cuánto vale mi auto?](/cuanto-vale-mi-auto) te ayuda a seguir su valor. Con **Copiar enlace** puedes compartir con tu pareja o tu mecánico exactamente el país y el caso de uso que elegiste.',
        ],
      },
    ],
    exampleTitle: 'Ejemplo: ajustar el auto al uso real',
    exampleBody:
      'Escenario ilustrativo, no un caso real de cliente. Imagina al dueño de un pequeño negocio de reparto en una gran ciudad que se siente atraído por una SUV de siete plazas por su espacio de carga. En el ranking comercial, sin embargo, el Toyota Corolla y el Toyota RAV4 puntúan por encima de vehículos más grandes, porque sus rutas reales son trayectos cortos con arranques y paradas y cargas moderadas, donde el costo de repuestos por kilómetro y el consumo pesan más que el volumen de carga. Las puntuaciones no dicen que la SUV sea un mal vehículo; dicen que encaja peor con ese patrón de uso. El dinero ahorrado en la compra y el combustible puede quedarse en el negocio como capital de trabajo.',
  },

  related: { compare: 'Comparador de Autos', fuel: 'Calculadora de Costo de Combustible', valuation: '¿Cuánto vale mi auto?' },

  faqs: [
    {
      q: '¿Esta herramienta muestra precios reales para mi país?',
      a: 'Muestra una estimación, no una cotización en vivo. Cada auto tiene un precio base en dólares; al elegir tu país se aplica el multiplicador típico de aranceles e impuestos de ese mercado y un tipo de cambio para estimar el precio local. Confirma con un concesionario o un anuncio local antes de presupuestar con exactitud.',
    },
    {
      q: '¿Cómo se puntúan los autos?',
      a: 'Cada auto recibe una nota de 0 a 100 por caso de uso a partir de factores medibles — costo de mantenimiento, disponibilidad de repuestos, consumo, altura al piso, asientos, maletero, tamaño del motor y precio de compra — con pesos distintos para cada caso. El ranking no cambia según el país; solo cambia el precio mostrado.',
    },
    {
      q: '¿Cuál es el mejor auto familiar para comprar?',
      a: 'En nuestro ranking, {picks:family} son los mejores para uso familiar, equilibrando asientos, maletero, fiabilidad y precio. Las familias numerosas deben revisar el número de asientos en los detalles de cada resultado.',
    },
    {
      q: '¿Cuál es el mejor auto para uso comercial o de aplicaciones?',
      a: 'Para uso comercial de alto kilometraje, los tres primeros son {picks:commercial}. Combinan bajo costo de mantenimiento, repuestos fáciles y un consumo razonable, que es lo que mantiene bajo el costo por kilómetro.',
    },
    {
      q: '¿Cuál es el mejor auto para caminos en mal estado?',
      a: 'La altura al piso y la durabilidad lideran este ranking. Los tres primeros ahora son {picks:offroad}. Para uso solo urbano, un sedán es manejable con cuidado, pero las inundaciones y los topes ponen a prueba a los autos bajos.',
    },
    {
      q: '¿Cuál es el mejor primer auto?',
      a: 'Las mejores opciones de primer auto son {picks:firstcar}: bajo mantenimiento, repuestos fáciles y mecánicos que los conocen en todas partes. Evita las marcas exóticas y de ultra lujo como primer auto: las piezas son caras y hace falta un mecánico especializado.',
    },
    {
      q: '¿Qué autos son más eficientes en combustible o energía?',
      a: 'Lideran los híbridos y los eléctricos: {picks:fuelefficient}. Un eléctrico solo tiene sentido si hay carga fiable donde vives y conduces, así que revisa la cobertura de carga antes de decidir.',
    },
    {
      q: '¿Por qué los países africanos muestran modelos usados más antiguos?',
      a: 'En muchos mercados africanos, los usados importados son la forma habitual de comprar un auto. Al elegir un país africano, la herramienta añade {usedCars} modelos antiguos con problemas típicos y consejos de inspección, junto a los {globalCars} modelos globales.',
    },
  ],

  schema: {
    appName: 'Mejor Auto Para Ti — recomendador de autos por caso de uso',
    appDescription: 'Recomendador de autos gratuito: elige un país y un caso de uso y recibe un top 5 entre {totalCars} autos, con precios locales estimados en {countries} países.',
    publisher: 'Naira Autos',
    author: 'Equipo Editorial de Naira Autos',
  },
};
