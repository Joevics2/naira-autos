// lib/cars-data-es.ts
//
// Spanish-language text overrides for the shared car dataset (cars-data.ts).
// The English file stays the single source of truth for every NUMBER
// (price, seats, engine size, ground clearance, etc.) and for scoring — only
// the prose fields (segment/commonIssues/watchOut) and closed-set labels
// (bodyType/fuelType/transmission/maintenanceCost/spareParts) get a Spanish
// rendering here, keyed by car id. This keeps one shared "infrastructure"
// (cars-data.ts + car-country-pricing.ts) instead of duplicating 80 cars'
// worth of specs into a second data file.
//
// Used by: app/herramientas/comparador-de-autos and app/herramientas/mejor-auto-para-ti.

import type { UseCaseTag } from '@/app/tools/cars-data';
import type { CarCountry } from '@/lib/car-country-pricing';

export interface CarTextEs {
  segment: string;
  commonIssues: string;
  watchOut: string;
}

export const CAR_TEXT_ES: Record<string, CarTextEs> = {
  // ── 50 modelos globales ──
  'toyota-corolla': { segment: 'Sedán Económico', commonIssues: 'Uno de los autos más confiables que existen; se han reportado tirones leves de la CVT en tráfico de arranque y frenado en algunas unidades.', watchOut: 'Las versiones base de gasolina rinden poco en pendientes pronunciadas — la versión híbrida vale la pena para la mayoría de los compradores.' },
  'honda-civic': { segment: 'Sedán Económico', commonIssues: 'Muy confiable; los modelos turbo han tenido quejas menores de dilución de aceite, en su mayoría resueltas con actualizaciones de software.', watchOut: 'Las versiones con transmisión manual son cada vez más raras — confirma disponibilidad en tu mercado antes de buscarla.' },
  'toyota-camry': { segment: 'Sedán Familiar', commonIssues: 'La batería híbrida tiene un historial de fiabilidad muy sólido a largo plazo; muy pocas quejas de la transmisión.', watchOut: 'Ahora se vende solo como híbrido en la mayoría de los mercados — si buscas específicamente un V6, verifica si la generación anterior aún se consigue usada.' },
  'mazda-mx5-miata': { segment: 'Roadster', commonIssues: 'Muy pocos problemas mecánicos; el desgaste de la capota de tela con los años es el principal costo de mantenimiento.', watchOut: 'Solo dos asientos y espacio de carga mínimo — un segundo auto para la mayoría de los dueños, no un vehículo diario único.' },
  'porsche-911': { segment: 'Cupé Deportivo', commonIssues: 'Excepcionalmente bien construido; el servicio con especialista es obligatorio y costoso fuera de las grandes ciudades.', watchOut: 'Las piezas y el servicio requieren un especialista Porsche estés donde estés — presupuesta esto antes que el auto mismo.' },
  'tesla-model-3': { segment: 'Sedán Eléctrico', commonIssues: 'Muy pocos problemas de tren motriz; se han reportado inconsistencias de ajuste de paneles y pintura en algunas unidades tempranas.', watchOut: 'La infraestructura de carga y el acceso a centros de servicio varían mucho según el país — verifica la cobertura de Supercharger y servicio en tu zona primero.' },
  'ford-mustang': { segment: 'Cupé Muscle', commonIssues: 'V8 mecánicamente simple; el eje trasero rígido en algunas versiones puede sentirse inestable en caminos irregulares.', watchOut: 'Los modelos V8 consumen mucho — considera el costo de combustible fuera de EE.UU., donde la gasolina suele ser más cara.' },
  'chevrolet-corvette-c8': { segment: 'Auto Deportivo', commonIssues: 'Tren motriz de motor central mecánicamente robusto; se han reportado fallos de software en el sistema de infoentretenimiento en los primeros años.', watchOut: 'La disponibilidad con volante a la derecha es limitada a pocos mercados — confirma que tu país reciba una versión oficial antes de ordenar.' },
  'jeep-wrangler': { segment: 'SUV Todoterreno', commonIssues: "Se ha reportado 'death wobble' (vibración de la suspensión delantera) en algunas unidades; por lo demás, durabilidad todoterreno legendaria.", watchOut: 'Manejo tipo camión en carretera y bajo rendimiento de combustible en ciudad — una concesión real si la mayor parte de tu manejo es en carretera.' },
  'toyota-rav4': { segment: 'SUV Compacta', commonIssues: 'Extremadamente confiable; el modelo híbrido tiene quejas mínimas incluso con alto kilometraje.', watchOut: 'Es tan popular que la demanda empuja los precios usados cerca de los de un auto nuevo en muchos mercados — compara varias publicaciones antes de decidir.' },
  'bmw-3series': { segment: 'Sedán Deportivo', commonIssues: 'Los motores B48 más nuevos son confiables; las unidades N20 más antiguas tuvieron problemas de cadena de tiempo y sistema de enfriamiento.', watchOut: 'Los costos de mantenimiento superan ampliamente a los sedanes japoneses convencionales — considera esto en el costo total de propiedad, no solo el precio de etiqueta.' },
  'mercedes-sclass': { segment: 'Sedán de Lujo Insignia', commonIssues: 'La suspensión neumática y la electrónica compleja son el principal riesgo de costo a largo plazo; por lo demás, excelentemente construido.', watchOut: 'La depreciación es pronunciada y las reparaciones son solo de especialista — mejor comprarlo nuevo o bajo garantía que como usado de alto kilometraje.' },
  'ford-f150': { segment: 'Pickup de Tamaño Completo', commonIssues: 'Los motores turbo EcoBoost necesitan cambios de aceite disciplinados; por lo demás, un caballo de batalla comprobado.', watchOut: 'Las pickups grandes estadounidenses son anchas y pesadas — el estacionamiento y las calles angostas pueden hacer el uso diario poco práctico en muchos países.' },
  'land-rover-range-rover': { segment: 'SUV de Lujo', commonIssues: 'La suspensión neumática y las fallas eléctricas son un riesgo conocido a largo plazo; capacidad todoterreno realmente excelente cuando todo funciona.', watchOut: 'Históricamente uno de los vehículos más caros de mantener — una garantía extendida es casi indispensable.' },
  'vw-golf-gti': { segment: 'Hot Hatch', commonIssues: 'Problemas en la unidad mecatrónica del DSG y el tensor de la cadena de distribución en generaciones anteriores; sigue siendo un referente del segmento.', watchOut: 'Las piezas y la mano de obra especializada de VW cuestan notablemente más que sus equivalentes japoneses fuera de Europa.' },
  'subaru-outback': { segment: 'Wagon de Aventura', commonIssues: 'Los problemas de junta de culata de los motores EJ más antiguos se resolvieron con los motores FB más nuevos; sólida reputación en todo tipo de clima.', watchOut: 'Las redes de concesionarios y repuestos Subaru son escasas fuera de sus mercados principales (EE.UU., Japón, Australia) — verifica el soporte local primero.' },
  'honda-crv': { segment: 'SUV Compacta', commonIssues: 'Muy pocos problemas mecánicos; las quejas tempranas de dilución de aceite en modelos turbo ya se resolvieron.', watchOut: 'Es popular y confiable, por lo que los valores usados se mantienen altos — negocia el precio, no solo las condiciones de financiamiento.' },
  'tesla-model-y': { segment: 'Crossover Eléctrico', commonIssues: 'Muy pocos problemas de tren motriz; se han reportado ruidos de suspensión en unidades de producción temprana.', watchOut: 'El valor de reventa ha sido más volátil que el de las marcas tradicionales debido a los frecuentes ajustes de precio de Tesla.' },
  'rivian-r1t': { segment: 'Pickup Eléctrica', commonIssues: 'Plataforma nueva con datos limitados a largo plazo; los primeros dueños reportan errores menores de software, en su mayoría corregidos.', watchOut: 'Los centros de servicio y la infraestructura de carga de esta marca existen en solo un puñado de países — verifica el soporte local primero.' },
  'hyundai-ioniq5': { segment: 'Crossover Eléctrico', commonIssues: 'Plataforma eléctrica muy confiable; se ha reportado descarga de la batería de 12V en algunas unidades tempranas dejadas sin uso por semanas.', watchOut: 'La carga ultrarrápida de 800V necesita un cargador compatible para lograr los tiempos anunciados — los cargadores más lentos funcionan pero tardan mucho más.' },
  'kia-ev9': { segment: 'SUV Eléctrica de 3 Filas', commonIssues: 'Modelo nuevo con datos limitados a largo plazo; comparte la confiable plataforma E-GMP con el Ioniq 5.', watchOut: 'Las SUV eléctricas de tres filas pierden autonomía significativa con todos los asientos ocupados y carga — revisa pruebas de autonomía real, no solo la ficha técnica.' },
  'porsche-taycan': { segment: 'Sedán Deportivo Eléctrico', commonIssues: 'Muy pocas fallas de tren motriz; se han reportado problemas de batería de 12V y software de infoentretenimiento en los primeros autos.', watchOut: 'La autonomía real queda por debajo de las cifras WLTP anunciadas más que en la mayoría de los eléctricos, especialmente en carretera — planifica tus paradas de carga en consecuencia.' },
  'ferrari-296gtb': { segment: 'Superdeportivo Híbrido', commonIssues: 'El sistema híbrido complejo requiere técnicos capacitados de fábrica; opciones de servicio independiente extremadamente limitadas en cualquier lugar.', watchOut: 'Solo los centros de servicio oficiales de Ferrari pueden mantener correctamente el sistema híbrido — los costos de servicio anual llegan a decenas de miles de dólares.' },
  'lamborghini-revuelto': { segment: 'Insignia Híbrida V12', commonIssues: 'Plataforma completamente nueva — prácticamente no existen datos independientes de fiabilidad a largo plazo todavía.', watchOut: 'Las listas de espera suelen ser de uno a dos años o más desde el pedido, con asignación controlada estrictamente por la fábrica en la mayoría de los mercados.' },
  'mclaren-artura': { segment: 'Superdeportivo Híbrido', commonIssues: 'Los autos de producción temprana tuvieron problemas eléctricos y de software reportados; McLaren ha lanzado varias actualizaciones.', watchOut: 'La red de concesionarios de McLaren es mucho más reducida que la de Ferrari o Lamborghini — confirma que exista un centro de servicio en tu país primero.' },
  'bugatti-chiron-tourbillon': { segment: 'Hiperauto', commonIssues: 'Vehículos prácticamente artesanales y hechos a mano — el mantenimiento es una relación gestionada por la fábrica, no un mercado de reparación independiente.', watchOut: 'La propiedad a este nivel incluye almacenamiento, transporte y arreglos de servicio dictados por la fábrica, mucho más allá de una compra de auto normal.' },
  'rolls-royce-phantom': { segment: 'Sedán Ultra Lujo', commonIssues: 'Excepcionalmente bien construido; la carrocería y electrónica a medida significan que solo técnicos capacitados por Rolls-Royce deberían darle servicio.', watchOut: 'Casi cada unidad está configurada a medida — el valor de reventa depende en gran parte de las opciones elegidas al momento de ordenarlo.' },
  'bentley-continental-gt': { segment: 'Gran Turismo de Lujo', commonIssues: 'La suspensión neumática y la electrónica compleja son el principal gasto a largo plazo; mecánicamente muy bien construido.', watchOut: 'Los especialistas independientes en Bentley son escasos fuera de las grandes ciudades — considera el servicio exclusivo de concesionario en tus costos.' },
  'aston-martin-db12': { segment: 'Gran Turismo', commonIssues: 'Históricamente la electrónica e infoentretenimiento de Aston quedaban atrás de la competencia; las generaciones recientes han mejorado significativamente.', watchOut: 'Las curvas de depreciación y el costo de piezas son pronunciados — este es un auto para comprar por la experiencia, no como inversión.' },
  'audi-e-tron-gt': { segment: 'Sedán Deportivo Eléctrico', commonIssues: 'Comparte plataforma y perfil de fiabilidad con el Porsche Taycan; muy pocas fallas de tren motriz reportadas.', watchOut: 'Los neumáticos de alto rendimiento para eléctricos se desgastan rápido y son costosos de reemplazar — considera esto en tus costos de uso.' },
  'bmw-ix': { segment: 'SUV de Lujo Eléctrica', commonIssues: 'Tren motriz confiable; algunos dueños reportan fallas de software de infoentretenimiento que BMW ha corregido mediante actualizaciones.', watchOut: 'Diseño polarizante con una parrilla frontal grande — vale la pena verlo en persona antes de decidir, las opiniones varían mucho.' },
  'mercedes-g-class': { segment: 'Todoterreno de Lujo', commonIssues: 'Diseño de chasis de escalera extremadamente durable; los costos de uso y piezas son firmemente de nivel de lujo.', watchOut: 'Su forma cuadrada implica que el rendimiento de combustible real y el ruido de viento son peores de lo que el precio podría sugerir.' },
  'toyota-land-cruiser': { segment: 'SUV Todoterreno', commonIssues: 'Fiabilidad legendaria; prácticamente sin quejas importantes incluso con muy alto kilometraje.', watchOut: 'La alta demanda mantiene los valores de reventa inusualmente altos — espera pagar casi lo mismo que uno nuevo por un usado poco rodado en la mayoría de los mercados.' },
  'ford-bronco': { segment: 'SUV Todoterreno', commonIssues: 'Las primeras unidades tuvieron filtraciones reportadas en el techo duro y problemas de conectividad, en su mayoría resueltos con actualizaciones y retiros.', watchOut: 'Las puertas y el techo removibles son realmente divertidos pero suman ruido de viento y crujidos con el tiempo sin mantenimiento cuidadoso.' },
  'chevrolet-silverado': { segment: 'Pickup de Tamaño Completo', commonIssues: 'Tren motriz V8 muy probado; se han reportado fallas eléctricas de infoentretenimiento en algunos años modelo.', watchOut: 'Las pickups de tamaño completo son poco prácticas o directamente no disponibles nuevas en muchos países — verifica las normas de importación local primero.' },
  'ram-1500': { segment: 'Pickup de Tamaño Completo', commonIssues: 'La opción de suspensión neumática añade complejidad a largo plazo; por lo demás, una pickup cómoda y bien valorada.', watchOut: 'Conocida por tener una de las conducciones más suaves de su clase, a costa de una capacidad todoterreno algo menos robusta que la competencia.' },
  'honda-odyssey': { segment: 'Minivan', commonIssues: 'La transmisión automática de 10 velocidades temprana tuvo quejas de calidad de cambios relacionadas con software; muy pocos problemas mecánicos desde entonces.', watchOut: 'Las minivans son un segmento en reducción fuera de Norteamérica — el soporte de reventa y piezas es más fuerte en EE.UU.' },
  'toyota-sienna': { segment: 'Minivan Híbrida', commonIssues: 'Solo híbrida desde su generación actual; extremadamente confiable con pocos problemas reportados.', watchOut: 'Las versiones AWD usan un motor eléctrico trasero en lugar de un eje mecánico — revisa reseñas de manejo invernal si eso te importa.' },
  'mazda-cx5': { segment: 'SUV Compacta', commonIssues: 'Muy pocas quejas; un interior de sensación premium para su precio con un excelente historial de fiabilidad.', watchOut: 'Las versiones turbo requieren gasolina premium para alcanzar su potencia nominal — considera esto en tus costos de uso.' },
  'subaru-wrx': { segment: 'Sedán Deportivo', commonIssues: 'El motor turbo necesita cambios de aceite disciplinados; por lo demás, una plataforma de rendimiento durable para todo clima.', watchOut: 'Los costos de seguro para sedanes deportivos turbo con AWD son altos para conductores jóvenes en muchos mercados.' },
  'nissan-z': { segment: 'Cupé Deportivo', commonIssues: 'El motor biturbo VR30, compartido con Infiniti, es generalmente confiable pero aún construyendo un historial a largo plazo.', watchOut: 'Un modelo de volumen relativamente bajo en la mayoría de los mercados — la disponibilidad de piezas y el valor de reventa varían mucho según el país.' },
  'toyota-gr86-subaru-brz': { segment: 'Cupé Deportivo', commonIssues: 'El motor bóxer atmosférico es simple y confiable; sin problemas importantes de fiabilidad reportados.', watchOut: 'Tracción trasera con potencia moderada, fácil de manejar rápido pero requiere verdadera atención en mojado.' },
  'hyundai-ioniq5-n': { segment: 'Eléctrico de Alto Rendimiento', commonIssues: 'Modelo muy nuevo construido sobre la confiable plataforma E-GMP; el uso en pista acelera significativamente el desgaste de neumáticos y frenos.', watchOut: 'La conducción agresiva agota la batería mucho más rápido que el Ioniq 5 estándar — la autonomía en manejo deportivo es notablemente menor en la práctica.' },
  'volvo-xc90': { segment: 'SUV de Lujo de 3 Filas', commonIssues: 'El motor turbo de cuatro cilindros es la única opción — refinado, aunque algunos compradores esperan más cilindros a este precio.', watchOut: 'Las versiones híbridas enchufables necesitan carga regular para alcanzar la eficiencia anunciada — usado solo como auto de gasolina, el rendimiento es discreto.' },
  'lexus-rx': { segment: 'Crossover de Lujo', commonIssues: 'Una de las SUV de lujo más confiables del mercado; muy pocos problemas reportados incluso con alto kilometraje.', watchOut: 'Se conduce más como un crucero cómodo que como una SUV deportiva — pruébala contra la competencia si la dinámica de manejo te importa.' },
  'genesis-g90': { segment: 'Sedán de Lujo Insignia', commonIssues: 'Muy bien construido con sólidos datos de fiabilidad de su matriz Hyundai; la principal limitante es el reconocimiento de marca, no lo mecánico.', watchOut: 'El valor de reventa es una verdadera incógnita en mercados donde la marca Genesis es nueva — espera una depreciación más pronunciada que sus rivales de lujo establecidos.' },
  'polestar-4': { segment: 'Crossover Eléctrico de Alto Rendimiento', commonIssues: 'Modelo nuevo con datos limitados a largo plazo; comparte componentes con modelos del grupo Volvo/Geely.', watchOut: 'Sin ventana trasera en algunas versiones — depende totalmente de un espejo retrovisor con cámara, a lo que no todos se adaptan fácilmente.' },
  'lucid-air': { segment: 'Sedán Eléctrico de Lujo', commonIssues: 'Excelente eficiencia y autonomía; al ser una marca de bajo volumen, aún no existen muchos patrones de fiabilidad a largo plazo.', watchOut: 'Los centros de servicio existen en solo un pequeño número de países — confirma que el soporte local sea realista antes de comprar.' },
  'cadillac-escalade': { segment: 'SUV de Lujo de Tamaño Completo', commonIssues: 'La suspensión neumática y la gran pantalla OLED curva son los principales riesgos de costo a largo plazo; el tren motriz en sí es hardware probado de GM.', watchOut: 'Su tamaño la hace realmente difícil de estacionar y maniobrar fuera de Norteamérica — mide tu garaje y calles primero.' },
  'mini-cooper': { segment: 'Hatchback Premium', commonIssues: 'Motores turbo ágiles; han aparecido problemas de cadena de distribución y sistema de enfriamiento en ejemplares de mayor kilometraje.', watchOut: 'Encantador de manejar, pero los costos de uso (piezas, seguro) son notablemente más altos que los de hatchbacks convencionales como el Corolla o el Civic.' },

  // ── 30 modelos de importación usada, solo África ──
  'toyota-camry-02-06': { segment: 'Sedán de Importación Usado', commonIssues: 'Tirones de la transmisión con alto kilometraje, desgaste del compresor de aire acondicionado.', watchOut: 'Las unidades de alto kilometraje suelen tener cajas automáticas desgastadas — pruébalo a velocidad antes de comprar.' },
  'toyota-camry-07-11': { segment: 'Sedán de Importación Usado', commonIssues: 'Consumo de aceite en el motor 2.5L, agrietamiento del tablero por el calor.', watchOut: 'Revisa si hay fugas de aceite en la tapa de válvulas — común en unidades 2.5L de alto kilometraje.' },
  'honda-accord-03-07': { segment: 'Sedán de Importación Usado', commonIssues: 'Falla del solenoide VTEC, fugas en la cremallera de dirección asistida.', watchOut: 'Presupuesta el reemplazo del solenoide VTEC si el motor duda alrededor de 3.500rpm.' },
  'honda-accord-08-12': { segment: 'Sedán de Importación Usado', commonIssues: 'Falla del evaporador de aire acondicionado en climas cálidos, vibración de la transmisión en el 2.4L.', watchOut: 'El reemplazo del evaporador de A/C es un costo real — revisa el rendimiento del enfriamiento antes de comprar.' },
  'toyota-corolla-03-07': { segment: 'Sedán de Importación Usado', commonIssues: 'Mínimos — uno de los usados de importación más confiables del mercado.', watchOut: 'Casi nada falla — solo revisa el historial de choques con una prueba de imán en la carrocería.' },
  'honda-civic-06-11': { segment: 'Sedán de Importación Usado', commonIssues: 'El compresor de A/C es un punto de falla común; los bujes de la suspensión trasera se desgastan rápido en caminos irregulares.', watchOut: 'Baja altura al piso (145mm) — evítalo si manejas seguido en caminos sin pavimentar.' },
  'hyundai-elantra-11-16': { segment: 'Sedán de Importación Usado', commonIssues: 'Problema de consumo de aceite del motor Theta II en algunas unidades, fallas de infoentretenimiento.', watchOut: 'Revisa el consumo de aceite — algunas unidades 1.8L queman 1L cada 3.000km. Haz una revisión de aceite antes de comprar.' },
  'hyundai-sonata-11-14': { segment: 'Sedán de Importación Usado', commonIssues: 'Riesgo de falla de cojinetes del motor Theta II, estiramiento de la cadena de tiempo con alto kilometraje.', watchOut: 'Historial de retiro del motor Theta II — verifica que el retiro se haya completado antes de comprar.' },
  'kia-cerato-10-13': { segment: 'Sedán de Importación Usado', commonIssues: 'Problemas del sensor de golpeteo, los soportes de la suspensión delantera se desgastan rápido en caminos irregulares.', watchOut: 'Las piezas son menos comunes que las de Toyota/Honda — confirma disponibilidad en tu ciudad antes de comprar.' },
  'peugeot-406-02-04': { segment: 'Sedán de Importación Usado', commonIssues: 'Los brazos de suspensión se desgastan rápido, fallas de la unidad BSI, fallas eléctricas costosas.', watchOut: 'Los problemas eléctricos son comunes y costosos. Evítalo si necesitas un auto diario confiable.' },
  'peugeot-508-14-16': { segment: 'Sedán de Importación Usado', commonIssues: 'Fallas de turbo, electrónica compleja, piezas costosas solo de concesionario.', watchOut: 'Las piezas son difíciles de conseguir fuera de las grandes ciudades. Presupuesta un fondo de contingencia para reparaciones eléctricas.' },
  'toyota-rav4-06-12': { segment: 'SUV de Importación Usada', commonIssues: 'Óxido en el condensador de A/C, ruido del diferencial delantero en versiones AWD.', watchOut: 'Revisa el portallantas de repuesto en la puerta trasera — la corrosión de la bisagra es común en unidades antiguas.' },
  'honda-crv-07-11': { segment: 'SUV de Importación Usada', commonIssues: 'Dilución de aceite con combustible en unidades tempranas, ruido del cojinete del diferencial trasero.', watchOut: 'Problema conocido de dilución de aceite en CR-V 2007–2009 — revisa si el aceite se ve lechoso en la varilla.' },
  'toyota-highlander-08-13': { segment: 'SUV de Importación Usada', commonIssues: 'Alto consumo de combustible del V6, falla del actuador de mezcla de aire del A/C.', watchOut: 'Presupuesta realistamente el combustible si lo usas a diario — el V6 consume mucho en tráfico.' },
  'toyota-prado-03-09': { segment: 'SUV de Importación Usada', commonIssues: 'Muy confiable — los brazos de suspensión se desgastan con alto kilometraje, el consumo de combustible es alto.', watchOut: 'El costo de combustible es importante — presupuesta realistamente para un V6 4.0L si manejas largas distancias.' },
  'toyota-landcruiser-05-10': { segment: 'SUV de Importación Usada', commonIssues: 'Extremadamente confiable — el consumo de combustible es el principal costo continuo.', watchOut: 'El costo de combustible puede ser importante para uso intenso. Confirma tu presupuesto de combustible antes de comprar.' },
  'honda-pilot-09-15': { segment: 'SUV de Importación Usada', commonIssues: 'Problemas del diferencial trasero VTM-4, la tercera fila de asientos es difícil de acceder.', watchOut: 'Los cambios de fluido VTM-4 suelen omitirse — pide el historial de servicio específicamente para esto.' },
  'kia-sorento-11-15': { segment: 'SUV de Importación Usada', commonIssues: 'Riesgo del motor Theta II en versiones GDI, obstrucción del drenaje del techo corredizo causa filtraciones.', watchOut: 'El motor GDI Theta II tiene un riesgo de falla conocido — verifica el historial de retiros antes de comprar.' },
  'hyundai-santafe-07-12': { segment: 'SUV de Importación Usada', commonIssues: 'Fallas del sensor de posición del cigüeñal, corrosión del subchasis delantero en unidades antiguas.', watchOut: 'Menos común que las SUV de Toyota/Honda — confirma que haya mecánicos familiarizados en tu zona.' },
  'ford-escape-08-12': { segment: 'SUV de Importación Usada', commonIssues: 'Fugas de refrigerante, falla del cuerpo de aceleración; las piezas Ford son escasas en este mercado.', watchOut: 'Las piezas de repuesto Ford son difíciles de conseguir fuera de las grandes ciudades. Alto riesgo de avería si no hay piezas disponibles.' },
  'toyota-sienna-04-10': { segment: 'Minivan de Importación Usada', commonIssues: 'Falla del motor de la puerta corrediza, corrosión del riel de la puerta eléctrica.', watchOut: 'Las puertas corredizas eléctricas fallan con frecuencia — presupuesta el reemplazo si ambas lo necesitan.' },
  'honda-odyssey-05-10': { segment: 'Minivan de Importación Usada', commonIssues: 'Falla de la transmisión en unidades tempranas, fallas eléctricas de la puerta corrediza.', watchOut: 'El Odyssey 2005–2007 tuvo problemas de transmisión automática — prioriza 2008 en adelante si es posible.' },
  'toyota-hilux-05-15': { segment: 'Pickup de Importación Usada', commonIssues: 'Prácticamente indestructible — crujidos de las ballestas con muy alto kilometraje.', watchOut: 'El referente de resistencia vial en esta clase. La principal preocupación es comprar una unidad reparada por choque.' },
  'toyota-hiace-05-15': { segment: 'Autobús de Importación Usado', commonIssues: 'Desgaste de la caja de dirección con alto kilometraje, reemplazo frecuente del cojinete de rueda delantero bajo carga pesada.', watchOut: 'Revisa cuidadosamente el chasis en busca de óxido — particularmente bajo los puntos de carga delantero y trasero.' },
  'toyota-yaris-12-17': { segment: 'Hatchback de Importación Usado', commonIssues: 'Muy confiable — problemas menores de la CVT en versiones automáticas con muy alto kilometraje.', watchOut: 'Baja altura al piso (130mm) — no apto para caminos irregulares o zonas propensas a inundaciones.' },
  'honda-fit-09-13': { segment: 'Hatchback de Importación Usado', commonIssues: 'Transmisión CVT sensible a los cambios de fluido, óxido en el condensador de A/C.', watchOut: 'El fluido de la CVT necesita cambiarse cada 40.000km — omitir el servicio causa fallas prematuras.' },
  'volkswagen-golf-05-09': { segment: 'Hatchback de Importación Usado', commonIssues: 'Problemas de cadena de distribución en motores FSI, fallas eléctricas costosas solo de concesionario.', watchOut: 'Las piezas y mecánicos calificados de VW son escasos fuera de las grandes ciudades. Presupuesta reparaciones costosas.' },
  'nissan-sentra-13-17': { segment: 'Sedán de Importación Usado', commonIssues: 'Falla de la transmisión CVT con alto kilometraje si se omite el servicio.', watchOut: 'La CVT de Nissan es sensible — exige el historial de servicio que muestre los cambios de fluido de la CVT.' },
  'mercedes-eclass-06-09': { segment: 'Sedán de Lujo de Importación Usado', commonIssues: 'Falla de la suspensión Airmatic, fallas del sistema de frenos SBC, electrónica costosa.', watchOut: 'La falla de la suspensión Airmatic es casi segura con alto kilometraje y costosa de reparar. Revísala cuidadosamente antes de comprar.' },
  'bmw-3series-05-10': { segment: 'Sedán de Lujo de Importación Usado', commonIssues: 'Falla del VANOS, fugas del sistema de refrigeración, reparaciones costosas de la transmisión SMG/DCT.', watchOut: 'El costo de propiedad es alto — las piezas son costosas y requieren un mecánico especializado en BMW. El mantenimiento suele costar 2–3 veces más que sus equivalentes japoneses.' },
};

// ── Diccionarios de campos de valor cerrado (se combinan por " / ") ──

const BODY_TYPE_ES: Record<string, string> = {
  Sedan: 'Sedán', Convertible: 'Convertible', Coupe: 'Cupé', SUV: 'SUV',
  Pickup: 'Pickup', Hatchback: 'Hatchback', Wagon: 'Familiar (Wagon)',
  Minivan: 'Minivan', Bus: 'Autobús',
};

const FUEL_TYPE_ES: Record<string, string> = {
  Petrol: 'Gasolina', Hybrid: 'Híbrido', Electric: 'Eléctrico', Diesel: 'Diésel',
};

const TRANSMISSION_ES: Record<string, string> = {
  Automatic: 'Automática', Manual: 'Manual', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT',
  'Single-speed': 'Velocidad única', 'PDK': 'PDK', 'DSG': 'DSG',
  '8-speed DCT': 'DCT de 8 velocidades', '2-speed (rear)': '2 velocidades (trasero)',
  'Single/2-speed': 'Velocidad única/2 velocidades', 'Single / dual-motor': 'Motor único / doble motor',
  'Single-speed (simulated gears)': 'Velocidad única (marchas simuladas)',
};

const MAINTENANCE_ES: Record<string, string> = { Low: 'Baja', Medium: 'Media', High: 'Alta', 'Very High': 'Muy Alta' };
const SPARE_PARTS_ES: Record<string, string> = { Easy: 'Fácil', Moderate: 'Moderada', Hard: 'Difícil' };

/** Translate a "/"-joined compound value (e.g. "Petrol / Hybrid") piece by piece. */
function translateCompound(value: string, dict: Record<string, string>): string {
  return value.split(' / ').map((part) => dict[part.trim()] ?? part.trim()).join(' / ');
}

export const esBodyType = (v: string) => translateCompound(v, BODY_TYPE_ES);
export const esFuelType = (v: string) => translateCompound(v, FUEL_TYPE_ES);
export const esTransmission = (v: string) => TRANSMISSION_ES[v] ?? translateCompound(v, TRANSMISSION_ES);
export const esMaintenance = (v: string) => MAINTENANCE_ES[v] ?? v;
export const esSpareParts = (v: string) => SPARE_PARTS_ES[v] ?? v;

// ── Metadatos de casos de uso para "Mejor Auto Para Ti" ──

export const USE_CASE_META_ES: Record<UseCaseTag, { label: string; icon: string; description: string; priorities: string }> = {
  family:        { label: 'Auto Familiar',          icon: '👨‍👩‍👧‍👦', description: 'Espacio, seguridad y fiabilidad para toda la familia', priorities: 'Asientos · Espacio de baúl · Fiabilidad' },
  commercial:    { label: 'Uso Comercial / App',    icon: '🚖', description: 'Pensado para uso comercial diario de alto kilometraje',     priorities: 'Durabilidad · Consumo · Piezas económicas' },
  highway:       { label: 'Manejo en Carretera',    icon: '🛣️',  description: 'Cómodo y estable para viajes largos',                     priorities: 'Comodidad · Autonomía · Estabilidad' },
  budget:        { label: 'Compra Económica',       icon: '💰', description: 'La mejor relación precio-valor con presupuesto ajustado', priorities: 'Precio bajo · Bajo mantenimiento' },
  offroad:       { label: 'Todoterreno / Caminos Malos', icon: '🪨', description: 'Alta altura al piso para terreno difícil y caminos en mal estado', priorities: 'Altura al piso · Durabilidad · 4x4' },
  executive:     { label: 'Ejecutivo / Negocios',   icon: '💼', description: 'Presencia, comodidad e imagen de marca para profesionales', priorities: 'Calidad interior · Marca · Comodidad' },
  firstcar:      { label: 'Primer Auto',            icon: '🎓', description: 'Fácil de manejar, tolerante a errores y económico de mantener', priorities: 'Bajo mantenimiento · Piezas fáciles · Fiabilidad' },
  fuelefficient: { label: 'Eficiencia de Combustible', icon: '⛽', description: 'El menor costo de uso por kilómetro',                    priorities: 'Consumo · Tamaño de motor · Manejo en ciudad' },
};

// ── Formato de precio con estilo numérico en español (punto de millar, es-ES) ──

export function formatCarPriceEs(amount: number, country: CarCountry): string {
  const { symbol } = country;
  if (amount >= 1_000_000_000) return `${symbol}${(amount / 1_000_000_000).toLocaleString('es-ES', { maximumFractionDigits: 2 })}mil M`;
  if (amount >= 1_000_000) return `${symbol}${(amount / 1_000_000).toLocaleString('es-ES', { maximumFractionDigits: amount >= 10_000_000 ? 1 : 2 })}M`;
  if (amount >= 1_000) return `${symbol}${(amount / 1_000).toLocaleString('es-ES', { maximumFractionDigits: 0 })}mil`;
  return `${symbol}${Math.round(amount).toLocaleString('es-ES')}`;
}
