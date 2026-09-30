// lib/best-car/fr.ts — French strings for "Meilleure Voiture Pour…" (/outils/meilleure-voiture-pour-vous)
import type { BestCarStrings } from '@/lib/best-car/types';

export const fr: BestCarStrings = {
  lang: 'fr',
  locale: 'fr-FR',
  localeByCountry: { fr: 'fr-FR', ca: 'fr-CA', be: 'fr-BE', ch: 'fr-CH', ma: 'fr-MA', dz: 'fr-DZ' },
  dir: 'ltr',
  latin: true,
  symbolAfter: true,

  path: '/outils/meilleure-voiture-pour-vous',
  homePath: '/accueil',
  hubPath: '/outils',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/outils/combien-vaut-ma-voiture',

  defaultCountry: 'fr',
  priorityCountries: ['fr', 'ca', 'be', 'ch', 'ma', 'dz'],
  picksCountry: 'fr',

  nav: { home: 'Accueil', tools: 'Outils', current: 'Meilleure Voiture Pour Vous', back: 'Retour aux Outils', breadcrumb: 'Fil d’Ariane' },

  meta: {
    title: 'Meilleure Voiture Pour Vous 2026 — Recommandation par Usage, {countries} Pays',
    description:
      'Trouvez la meilleure voiture selon vos besoins, avec les prix dans votre devise dans {countries} pays. Choisissez votre usage — voiture familiale, usage professionnel, autoroute, petit budget, tout-terrain, direction, première voiture ou sobriété — et obtenez un top 5 classé parmi {globalCars} modèles, noté selon l’entretien, les pièces et la consommation.',
    keywords: [
      'meilleure voiture à acheter 2026', 'meilleure voiture familiale', 'meilleure voiture pour VTC', 'comparateur de voitures',
      'quelle voiture acheter', 'meilleur SUV 2026', 'voiture la moins chère à entretenir', 'meilleure première voiture',
      'meilleure voiture pour l’autoroute', 'voiture de direction', 'voiture économe en carburant', 'conseil achat voiture',
      'meilleure voiture petit budget', 'meilleur 4x4', 'quelle voiture choisir', 'voiture fiable',
      'meilleure voiture France', 'meilleure voiture Québec', 'meilleure voiture Belgique', 'meilleure voiture Suisse',
      'meilleure voiture Maroc', 'meilleure voiture Algérie', 'naira autos',
    ],
    ogTitle: 'Meilleure Voiture Pour Vous 2026 — Recommandation Auto | Naira Autos',
    ogDescription: 'Recommandation de voiture mondiale avec prix locaux dans {countries} pays. Choisissez votre usage et obtenez le top 5 classé par entretien, consommation et disponibilité des pièces.',
    ogLocale: 'fr_FR',
  },

  hero: {
    badge: 'Outil Gratuit',
    verified: 'Prix vérifiés',
    h1: 'Meilleure Voiture Pour Vous',
    intro:
      'Choisissez votre pays et votre usage, et obtenez des recommandations classées avec les prix dans votre devise dans {countries} pays — notées selon le coût d’entretien, la disponibilité des pièces, la consommation et la garde au sol. {globalCars} modèles couverts, de la Toyota Corolla à la Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Pays et Devise',
    popularCountries: 'Marchés principaux',
    otherCountries: 'Autres pays',
    africaNote: 'Inclut {usedCars} modèles d’occasion importés, propres à cette région, en plus des {globalCars} modèles mondiaux.',
    prompt: 'Pour quel usage cherchez-vous une voiture ?',
    rankedBy: 'Classé selon :',
    topRecs: 'Top {n} des recommandations — {country}',
    emptyState: 'Sélectionnez un usage ci-dessus pour voir les recommandations',
    match: 'Score',
    electric: 'Électrique',
    electricMotor: 'Moteur électrique',
    seatsFmt: '{n} places',
    bootFmt: 'coffre {n} L',
    consumptionUnit: 'L/100 km',
    showDetails: 'Voir les détails — défauts et points de vigilance',
    hideDetails: 'Masquer les détails',
    commonIssues: 'Problèmes fréquents :',
    estIn: 'est. en {country}',
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copié',
  },

  enums: {
    maintenance: { Low: 'Faible', Medium: 'Moyen', High: 'Élevé', 'Very High': 'Très élevé' },
    spareParts: { Easy: 'Faciles', Moderate: 'Moyennes', Hard: 'Difficiles' },
    bodyType: {
      Sedan: 'Berline', Convertible: 'Cabriolet', Coupe: 'Coupé', SUV: 'SUV', Pickup: 'Pick-up',
      Hatchback: 'Compacte', Wagon: 'Break', Minivan: 'Monospace', Bus: 'Minibus',
    },
    fuelType: { Petrol: 'Essence', Hybrid: 'Hybride', 'Petrol Hybrid': 'Essence hybride', Electric: 'Électrique', Diesel: 'Diesel' },
    transmission: {
      Automatic: 'Automatique', Manual: 'Manuelle', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Rapport unique', '8-speed DCT': 'DCT 8 rapports', '2-speed (rear)': '2 rapports (arrière)',
      'Single/2-speed': 'Rapport unique / 2 rapports', 'Single / dual-motor': 'Mono / bi-moteur',
      'Single-speed (simulated gears)': 'Rapport unique (rapports simulés)',
    },
  },

  useCases: {
    family:        { label: 'Voiture Familiale', icon: '👨‍👩‍👧‍👦', description: 'Espace, sécurité et fiabilité pour toute la famille', priorities: 'Places · Coffre · Fiabilité · Prix', pickTitle: 'Meilleure Voiture Familiale' },
    commercial:    { label: 'Usage Pro / VTC', icon: '🚖', description: 'Conçue pour un usage professionnel quotidien à fort kilométrage', priorities: 'Durabilité · Pièces peu chères · Consommation', pickTitle: 'Meilleure pour l’Usage Pro' },
    highway:       { label: 'Autoroute', icon: '🛣️', description: 'Confortable et stable sur les longs trajets', priorities: 'Consommation · Puissance · Fiabilité', pickTitle: 'Meilleure pour l’Autoroute' },
    budget:        { label: 'Petit Budget', icon: '💰', description: 'Le meilleur rapport qualité-prix quand le budget est serré', priorities: 'Prix d’achat bas · Entretien réduit', pickTitle: 'Meilleur Achat Petit Budget' },
    offroad:       { label: 'Tout-Terrain / Mauvaises Routes', icon: '🪨', description: 'Grande garde au sol pour terrains difficiles et routes dégradées', priorities: 'Garde au sol · Robustesse · Pièces', pickTitle: 'Meilleure Tout-Terrain' },
    executive:     { label: 'Direction / Affaires', icon: '💼', description: 'Présence, confort et image de marque pour les professionnels', priorities: 'Prestige · Moteur · Coûts d’usage', pickTitle: 'Meilleure Voiture de Direction' },
    firstcar:      { label: 'Première Voiture', icon: '🎓', description: 'Facile à conduire, tolérante et économique à entretenir', priorities: 'Entretien réduit · Pièces faciles · Fiabilité', pickTitle: 'Meilleure Première Voiture' },
    fuelefficient: { label: 'Sobriété / Énergie', icon: '⛽', description: 'Le coût d’usage au kilomètre le plus bas', priorities: 'Carburant ou énergie · Entretien · Pièces', pickTitle: 'La Plus Sobre' },
  },

  seo: {
    reviewedByLabel: 'Relu par :',
    reviewer: 'Équipe éditoriale Naira Autos',
    updatedLabel: 'Contenu mis à jour :',
    picksHeading: 'Meilleures Voitures par Usage — 2026',
    picksNote:
      'Ces listes sont générées avec le même barème que l’outil, pour un marché de référence. Le classement exact et les prix s’adaptent au pays choisi ci-dessus, et des modèles d’occasion importés s’ajoutent pour les pays africains.',
    faqHeading: 'Questions Fréquentes',
    moreToolsHeading: 'Plus d’outils gratuits',
    disclaimer:
      'Les prix sont des estimations pour {countries} marchés, pas des devis. Les notes d’entretien et de pièces sont des évaluations éditoriales et peuvent varier selon le marché. Inspectez toujours la voiture, vérifiez son historique et demandez un devis local avant d’acheter. Certains outils liés sont proposés en anglais.',
    sections: [
      {
        h2: 'Comment fonctionne ce comparateur de voitures',
        paragraphs: [
          'Meilleure Voiture Pour Vous classe {totalCars} véhicules selon l’usage réel que vous en ferez. Vous choisissez un pays et un usage — familial, professionnel ou VTC, autoroute, petit budget, tout-terrain, direction, première voiture ou sobriété — et l’outil note chaque modèle vendu ou couramment importé sur ce marché, puis affiche les cinq meilleurs. Chaque note va de 0 à 100 et ne combine que des critères mesurables : coût d’entretien, disponibilité des pièces, consommation de carburant ou d’énergie, garde au sol, nombre de places, volume de coffre, cylindrée et prix d’achat.',
          'Les pondérations changent selon l’usage. Pour un taxi ou une voiture de livraison, l’entretien et la disponibilité des pièces pèsent 70 % de la note. Pour un acheteur de tout-terrain, la garde au sol représente à elle seule la moitié. Pour une première voiture, la fiabilité et la facilité à trouver des pièces comptent bien plus que la puissance.',
          'Le classement est volontairement identique dans tous les pays. La note utilise le prix de base en dollars américains de chaque voiture ; passer de Paris à Montréal change donc le prix affiché, pas l’ordre de la liste. La recommandation porte ainsi sur la voiture elle-même, tandis que l’estimation sous chaque résultat s’adapte à votre devise et aux taxes et droits d’importation typiques de votre marché. L’outil couvre {countries} pays : {globalCars} modèles sont comparés partout et, sur les marchés africains, {usedCars} modèles d’occasion importés s’y ajoutent.',
        ],
      },
      {
        h2: 'Partez de votre usage quotidien, pas de la fiche technique',
        paragraphs: [
          'La meilleure voiture pour vous dépend moins des caractéristiques que de votre **usage quotidien réel**. Une voiture excellente sur le papier peut être un mauvais choix si le garagiste qui la connaît est loin, ou si sa garde au sol transforme votre trajet en parcours d’obstacles.',
          'Pour l’**usage professionnel et le VTC**, la fiabilité à fort kilométrage et le faible coût des pièces au kilomètre décident de tout. Les Toyota Corolla et Toyota Camry se retrouvent dans les flottes de taxis et de livraison de nombreux pays, car leurs moteurs sont simples, tolèrent un entretien parfois retardé et peuvent être réparés par presque n’importe quel mécanicien.',
          'Pour l’**usage de direction**, l’image de marque compte, mais elle ne doit pas primer sur les coûts d’usage. Une Mercedes-Benz Classe S est notée Très élevé en entretien : la suspension pneumatique et l’électronique complexe peuvent transformer une seule réparation en facture à quatre chiffres. Beaucoup de professionnels s’en sortent mieux avec une berline grand public bien entretenue qu’avec une voiture de luxe à fort kilométrage.',
          'Pour les **primo-accédants**, ce qui compte le plus est que les mécaniciens connaissent la voiture. Si ses pannes exigent un diagnostic spécialisé, chaque réparation dure plus longtemps et coûte plus cher. Les Toyota et Honda dotées de moteurs de moins de 2,5 litres disposent du plus vaste écosystème de pièces, de garages et de conseils en ligne, où que vous achetiez.',
          'Pour les **familles**, les places et le coffre comptent, mais aussi le prix d’un SUV à trois rangées dont vous n’avez peut-être pas besoin. C’est pourquoi la note familiale récompense aussi un prix d’achat plus bas : un crossover cinq places convient souvent à une famille de quatre aussi bien qu’un véhicule bien plus grand, pour une fraction du coût.',
          'Pour le **tout-terrain et les mauvaises routes**, regardez d’abord la garde au sol, puis la transmission. Environ 250 mm de garde au sol rendent les nids-de-poule, les rues inondées et les pistes non goudronnées supportables ; une berline à 140 mm peut convenir en ville si le conducteur est prudent, mais les ralentisseurs et les inondations deviennent un problème récurrent.',
        ],
      },
      {
        h2: 'Le coût total de possession pèse plus que le prix affiché',
        paragraphs: [
          'Une voiture moins chère n’est pas toujours le choix le plus économique. Sur cinq ans, le carburant, l’entretien, l’assurance, les pneus et les réparations peuvent égaler le prix d’achat, surtout là où les pièces importées arrivent lentement. Deux voitures au prix voisin peuvent différer de milliers d’euros en coût de possession simplement parce que l’une partage ses pièces avec des millions d’autres véhicules et que l’autre exige un composant vendu uniquement en concession.',
          'Utilisez les pastilles d’entretien et de pièces de chaque résultat comme raccourci vers ce coût caché, puis passez votre présélection dans le [calculateur de coût de carburant](/tools/fuel-cost-calculator-global) (en anglais) pour convertir la consommation en budget mensuel selon votre kilométrage. La valeur de revente compte aussi : sur de nombreux marchés, les modèles japonais et coréens grand public conservent mieux leur valeur que les marques de niche ou coûteuses à entretenir, ce qui réduit le coût réel de possession.',
        ],
      },
      {
        h2: 'Neuf, occasion importée et ce qui change selon le marché',
        paragraphs: [
          'La bonne réponse dépend de ce qui se vend réellement là où vous vivez. En France, en Belgique, en Suisse et au Québec, la plupart des acheteurs choisissent entre le neuf et l’occasion locale, et les {globalCars} modèles mondiaux couvrent bien ce besoin. En France, pensez aussi à vérifier la vignette Crit’Air et les restrictions de circulation dans votre agglomération, au contrôle technique exigé pour l’occasion, ainsi qu’aux malus et taxes liés au poids ou aux émissions selon les barèmes en vigueur. Au Québec, prévoyez les pneus d’hiver obligatoires en saison et un bon traitement antirouille.',
          'Au Maroc, en Algérie et dans une grande partie de l’Afrique, la situation est différente : une large part du parc est constituée d’occasions importées, souvent de dix à vingt ans, venues d’Europe, du Japon ou d’Amérique du Nord. Quand vous choisissez un pays africain, l’outil ajoute {usedCars} modèles plus anciens, avec des défauts typiques et des conseils d’inspection pour acheteurs d’occasion (les textes détaillés de ces modèles restent en anglais pour l’instant). Les marchés du Golfe combinent taxes faibles et carburant bon marché, ce qui change l’intérêt des gros SUV et des V6 par rapport aux marchés très taxés. C’est pourquoi le sélecteur de pays existe : la même voiture peut être un achat raisonnable sur un marché et un luxe coûteux sur un autre.',
        ],
      },
      {
        h2: 'Comment lire les notes d’entretien et de pièces détachées',
        paragraphs: [
          '**Coût d’entretien** indique la dépense courante typique pour garder un modèle en état de rouler, comparée aux autres : Faible, Moyen, Élevé ou Très élevé. **Disponibilité des pièces** indique la facilité à trouver des pièces de rechange : Faciles, Moyennes ou Difficiles. Ce sont des évaluations éditoriales fondées sur la réputation du modèle, les tarifs d’atelier habituels et les réseaux de pièces. Ce ne sont pas des devis de garage, et elles peuvent varier d’un marché à l’autre.',
          'Considérez Faible et Faciles comme un très bon signe. Traitez Élevé ou Difficiles comme une invitation à interroger des garagistes locaux avant de vous engager. Chaque résultat indique aussi les problèmes fréquents et un point de vigilance propre à ce modèle : lisez-les avant d’aller voir la voiture.',
        ],
      },
      {
        h2: 'Comment les prix par pays sont estimés — et leurs limites',
        paragraphs: [
          'Chaque voiture a un prix de base en dollars américains, un chiffre approximatif d’entrée de gamme 2025–2026. Pour afficher un prix local, l’outil multiplie cette base par un coefficient de marché propre à chaque pays — une estimation indicative des droits de douane, taxes spéciales, TVA et marge habituelle du concessionnaire — puis par un taux de change. Les taux de change et les règles fiscales évoluant, considérez le résultat comme un point de départ pour votre budget, pas comme un devis.',
          'Certains modèles ne sont tout simplement pas vendus neufs dans certains pays, et les finitions, les options et l’état d’une occasion peuvent éloigner le prix réel de ces estimations. Confirmez avec des annonces locales ou un concessionnaire avant de fixer votre budget définitif.',
        ],
      },
      {
        h2: 'De la présélection à la décision',
        paragraphs: [
          'Choisissez votre usage, ouvrez **Voir les détails** pour chacun des meilleurs résultats et notez les problèmes fréquents. Comparez vos deux favorites côte à côte avec le [comparateur de voitures](/tools/car-comparison) (en anglais). Avant de payer une occasion, vérifiez son historique avec le [décodeur VIN](/outils/decodeur-vin) et faites réaliser une inspection mécanique indépendante. Une fois la voiture achetée, l’outil [Combien vaut ma voiture](/outils/combien-vaut-ma-voiture) vous aide à suivre sa valeur. Le bouton **Copier le lien** permet de partager avec un proche ou un garagiste exactement le pays et l’usage que vous avez choisis.',
        ],
      },
    ],
    exampleTitle: 'Exemple : adapter la voiture à l’usage réel',
    exampleBody:
      'Scénario illustratif, pas une étude de cas client. Imaginez le gérant d’une petite entreprise de livraison dans une grande ville, attiré par un SUV sept places pour son volume de chargement. Dans le classement usage professionnel, pourtant, la Toyota Corolla et le Toyota RAV4 obtiennent de meilleures notes que des véhicules plus grands, car ses trajets réels sont courts, avec beaucoup d’arrêts et des charges modérées, où le coût des pièces au kilomètre et la consommation comptent plus que le volume de chargement. Les notes ne disent pas que le SUV est un mauvais véhicule ; elles disent qu’il correspond moins bien à cet usage. L’argent économisé à l’achat et en carburant peut rester dans l’entreprise comme fonds de roulement.',
  },

  related: { compare: 'Comparateur de voitures (EN)', fuel: 'Calculateur de carburant (EN)', valuation: 'Combien vaut ma voiture' },

  faqs: [
    { q: 'Cet outil affiche-t-il les vrais prix de mon pays ?', a: 'Il affiche une estimation, pas un devis en direct. Chaque voiture a un prix de base en dollars ; choisir votre pays applique le coefficient typique de droits et taxes de ce marché et un taux de change pour estimer le prix local. Confirmez avec un concessionnaire ou une annonce locale avant de budgéter précisément.' },
    { q: 'Comment les voitures sont-elles notées ?', a: 'Chaque voiture reçoit une note de 0 à 100 par usage, à partir de critères mesurables — coût d’entretien, disponibilité des pièces, consommation, garde au sol, places, coffre, cylindrée et prix d’achat — avec des pondérations différentes pour chaque usage. Le classement ne change pas selon le pays ; seul le prix affiché change.' },
    { q: 'Quelle est la meilleure voiture familiale à acheter ?', a: 'Dans notre classement, {picks:family} arrivent en tête pour l’usage familial, en équilibrant places, coffre, fiabilité et prix. Les grandes familles doivent vérifier le nombre de places dans les détails de chaque résultat.' },
    { q: 'Quelle est la meilleure voiture pour un usage professionnel ou VTC ?', a: 'Pour un usage professionnel à fort kilométrage, le trio de tête est {picks:commercial}. Elles combinent faible coût d’entretien, pièces faciles à trouver et consommation raisonnable, ce qui maintient un coût au kilomètre bas.' },
    { q: 'Quelle est la meilleure voiture pour les mauvaises routes ?', a: 'La garde au sol et la robustesse dominent ce classement. Le trio de tête actuel est {picks:offroad}. En usage purement urbain, une berline reste gérable avec de la prudence, mais inondations et ralentisseurs mettent à l’épreuve les voitures basses.' },
    { q: 'Quelle est la meilleure première voiture ?', a: 'Les meilleurs choix pour une première voiture sont {picks:firstcar} : entretien réduit, pièces faciles et mécaniciens qui les connaissent partout. Évitez les marques exotiques et ultra-luxe comme première voiture : les pièces coûtent cher et un spécialiste est nécessaire.' },
    { q: 'Quelles voitures sont les plus économes en carburant ou en énergie ?', a: 'Les hybrides et les électriques dominent : {picks:fuelefficient}. Une voiture électrique n’a de sens que si une recharge fiable existe là où vous vivez et roulez ; vérifiez la couverture de recharge avant de décider.' },
    { q: 'Pourquoi les pays africains affichent-ils des modèles d’occasion plus anciens ?', a: 'Dans de nombreux marchés africains, l’occasion importée est la principale façon d’acheter une voiture. Quand vous choisissez un pays africain, l’outil ajoute {usedCars} modèles plus anciens avec les défauts typiques et des conseils d’inspection, en plus des {globalCars} modèles mondiaux.' },
  ],

  schema: {
    appName: 'Meilleure Voiture Pour Vous — recommandation de voiture par usage',
    appDescription: 'Recommandation de voiture gratuite : choisissez un pays et un usage et obtenez un top 5 parmi {totalCars} voitures, avec des prix locaux estimés dans {countries} pays.',
    publisher: 'Naira Autos',
    author: 'Équipe éditoriale Naira Autos',
  },
};
