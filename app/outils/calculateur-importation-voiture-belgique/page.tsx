import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import BelgiumImportCalculator from '@/components/BelgiumImportCalculator';
import { alternatesFor } from '@/lib/hreflang';

const PATH = "/outils/calculateur-importation-voiture-belgique";
const URL = 'https://www.naira.autos' + PATH;
const C = {
  "lang": "fr",
  "locale": "fr_BE",
  "ld": "fr-BE",
  "hubName": "Outils",
  "hubPath": "/outils",
  "homeName": "Accueil",
  "homePath": "/accueil",
  "path": "/outils/calculateur-importation-voiture-belgique",
  "jobTitle": "Fondateur",
  "title": "Importer une voiture en Belgique 2026 — Calculateur de droits, TVA et TMC",
  "desc": "Calculateur gratuit pour importer une voiture en Belgique : 10 % de droit de douane, 21 % de TVA, taxe de mise en circulation en Wallonie, à Bruxelles et en Flandre avec réduction selon l’âge, Japon et États-Unis à 0 %, voitures électriques chinoises. Tarifs 2026-2027.",
  "ogTitle": "Importer une voiture en Belgique : calculateur | Naira Autos",
  "ogDesc": "Calculez droit de douane, TVA et taxe de mise en circulation pour une voiture importée en Belgique.",
  "keywords": "importer une voiture en Belgique coût, calcul TMC 2026 véhicule importé, taxe de mise en circulation occasion, droit de douane voiture hors UE, TVA importation voiture 21 pour cent, importer voiture d’Allemagne TMC, importer voiture des États-Unis 2026, TMC wallonne formule 2025, BIV Flandre électrique 2026",
  "crumbBack": "Retour",
  "crumbNav": "Fil d’Ariane",
  "crumbLabel": "🇧🇪 Importer une voiture",
  "badge1": "100 % gratuit",
  "badge2": "Tarifs TMC 2026-2027",
  "badge3": "Vérifié : novembre 2026",
  "h1a": "Importer une voiture",
  "h1b": "en Belgique",
  "sub": "Combien coûte vraiment une voiture importée, TMC comprise ?",
  "lead": "Choisissez l’origine, votre région et les caractéristiques de la voiture pour obtenir le droit de douane, la TVA et la taxe de mise en circulation régionale avec réduction selon l’âge.",
  "warnStrong": "Simple estimation.",
  "warn": "La TMC est une taxe régionale avec trois formules différentes, indexées chaque 1er juillet. De nombreux sites affichent encore des règles dépassées. Vérifiez le montant auprès de l’administration fiscale de votre région avant d’acheter.",
  "introH": "Droits, TVA et TMC : comment se compose le prix",
  "intro": "Importer une voiture en Belgique ajoute trois couches de coûts. La première est douanière : aucun droit dans l’Union européenne et 10 % de la valeur en douane pour une voiture venue d’un pays tiers, sauf accord commercial avec preuve d’origine qui le ramène à zéro. La deuxième est la TVA de 21 %, calculée sur la valeur en douane plus le droit. La troisième est propre à la Belgique : la taxe de mise en circulation, appelée BIV en Flandre et TMC en Wallonie et à Bruxelles, payée une seule fois à l’immatriculation et calculée différemment dans chaque région. Pour une occasion, elle diminue avec l’âge, compté depuis la première immatriculation n’importe où dans le monde.",
  "cards": [
    [
      "Droit de douane (hors UE)",
      "10 %",
      "sur la valeur en douane",
      "orange"
    ],
    [
      "TVA à l’importation",
      "21 %",
      "valeur en douane + droit",
      "blue"
    ],
    [
      "Japon, Corée, États-Unis",
      "0 %",
      "droit, avec preuve d’origine",
      "sky"
    ],
    [
      "BIV Flandre 2026",
      "58–14 539 €",
      "CO2, carburant, âge",
      "amber"
    ]
  ],
  "changedH": "Ce qui a changé en 2025 et 2026",
  "changed": [
    [
      "Wallonie :",
      "depuis le 1er juillet 2025, la TMC se calcule avec une formule : montant de base selon la puissance × CO2 divisé par 136 × masse divisée par 1 838, entre 50 € et 9 000 €. L’écomalus a disparu."
    ],
    [
      "Flandre :",
      "l’exonération des voitures électriques est supprimée. Pour une immatriculation depuis le 1er janvier 2026, un forfait de 61,50 € remplace le zéro. Pour les autres voitures, la formule utilise le facteur 1,245 en 2026."
    ],
    [
      "Bruxelles :",
      "le barème selon les kW ou les chevaux fiscaux, dont le montant le plus élevé s’applique, est indexé chaque 1er juillet. Une voiture électrique paie le minimum de 78,88 €."
    ],
    [
      "États-Unis :",
      "depuis le 1er juillet 2026, le règlement (UE) 2026/1455 supprime les droits sur les produits industriels d’origine américaine. Pour une voiture, il faut prouver la fabrication aux États-Unis et le transport direct."
    ],
    [
      "Japon :",
      "la réduction progressive du droit sur les voitures japonaises s’achève le 1er février 2026, avec 0 % sur déclaration d’origine."
    ],
    [
      "Chine :",
      "les voitures électriques chinoises paient 10 % plus un droit compensateur : BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghai 7,8 %. Un premier engagement de prix a été accepté en février 2026 pour la Cupra Tavascan."
    ]
  ],
  "examples": [
    [
      "Exemple 1 : occasion des Émirats, immatriculée en Flandre",
      "Une voiture essence coûte 20 000 € avec 1 500 € de fret et d’assurance, donc la valeur en douane est de 21 500 €. Le droit de 10 % représente 2 150 €. La TVA de 21 % sur 23 650 € vaut 4 966,50 €. La voiture émet 118 g/km et a quatorze mois. La BIV flamande d’une voiture neuve est de 232,67 €, soit 209,40 € après 90 % de réduction d’âge. Le total est de 7 325,90 €, soit 34,1 % de la valeur en douane."
    ],
    [
      "Exemple 2 : voiture japonaise avec et sans preuve d’origine",
      "Une voiture de 15 000 € avec 1 200 € de fret a une valeur en douane de 16 200 €. Avec la déclaration d’origine, il n’y a pas de droit et la TVA vaut 3 402 €. Sans le document, le droit coûte 1 620 € et la TVA sur 17 820 € monte à 3 742,20 €. Le total est de 5 362,20 €, donc le papier manquant coûte 1 960,20 €."
    ],
    [
      "Exemple 3 : la même voiture dans trois régions",
      "Une voiture de trois ans et six mois venue d’un pays de l’UE, avec 118 g/km, 90 kW, 8 chevaux fiscaux et 1 838 kg. La Flandre demande 232,67 € pour une voiture neuve, soit 162,87 € après 70 %. Bruxelles demande 634,89 € pour la tranche de 86 à 100 kW, soit 444,42 € après 70 %. La Wallonie demande 515,20 € × 118/136 = 447,01 € pour une voiture neuve, et 312,91 € après 70 %. La région d’immatriculation double ou triple donc la taxe."
    ],
    [
      "Exemple 4 : SUV neuf acheté dans l’UE",
      "Un SUV neuf à 40 000 € avec 160 g/km, 110 kW et 12 chevaux fiscaux paie 21 % de TVA belge, soit 8 400 €. La BIV flamande est de 1 297,18 €. Bruxelles demande 1 112,01 €. La Wallonie demande 1 212,94 € pour une masse de 2 100 kg."
    ],
    [
      "Exemple 5 : électrique chinoise BYD",
      "Pour 30 000 € avec 1 500 € de fret, la valeur en douane est de 31 500 €. Le droit de 10 % vaut 3 150 € et le droit compensateur de 17 % vaut 5 355 €. La TVA de 21 % sur 40 005 € vaut 8 401,05 €. La taxe de mise en circulation est de 61,50 € en Flandre, 78,88 € à Bruxelles et 50 € en Wallonie. En Flandre, le total des taxes est de 16 967,55 €."
    ]
  ],
  "stepsH": "Pas à pas : importer une voiture en Belgique",
  "steps": [
    "Relevez la date de première immatriculation, les émissions de CO2, la puissance et la masse sur le certificat d’immatriculation étranger ou le certificat de conformité.",
    "Vérifiez le pays de fabrication et demandez la preuve d’origine si un accord ramène le droit à 0 %.",
    "Hors UE, faites la déclaration en douane et payez droit et TVA. Dans l’UE, payez la TVA seulement si la voiture est neuve.",
    "Faites passer le contrôle technique et demandez une réception européenne ou individuelle s’il n’y a pas de COC.",
    "Immatriculez la voiture auprès de la DIV et payez la TMC ou la BIV de votre région.",
    "Faites fabriquer les plaques et assurez la voiture avant de rouler."
  ],
  "mistakesH": "Erreurs fréquentes",
  "mistakes": [
    "Utiliser les anciennes règles wallonnes avec écomalus : depuis le 1er juillet 2025, une formule combine CO2, masse et puissance.",
    "Croire que la voiture électrique est encore exonérée en Flandre : c’est terminé pour les immatriculations de 2026.",
    "Oublier que la TVA se calcule aussi sur le droit de douane.",
    "Oublier la région : la même voiture coûte un tout autre montant à Bruxelles ou en Wallonie qu’en Flandre.",
    "Compter sur 0 % sans preuve d’origine ou sans transport direct depuis les États-Unis.",
    "Compter l’âge depuis la date d’achat au lieu de la date de première immatriculation."
  ],
  "notH": "Ce que le calculateur ne couvre pas",
  "notP": "Le calculateur ne couvre ni les véhicules de leasing, ni les utilitaires, ni les motos, ni les exonérations pour familles nombreuses ou personnes handicapées, ni le déménagement avec franchise. La composante air de la formule flamande est fixée par défaut à la valeur Euro 6 et peut être modifiée pour une autre norme Euro. La valeur pour le diesel est déduite des exemples chiffrés d’une source secondaire et n’est pas confirmée par l’administration fiscale flamande. Les chevaux fiscaux pour Bruxelles et la Wallonie sont à saisir vous-même. Les voitures électriques en Wallonie sont comptées au minimum de 50 €, car le coefficient par puissance n’est pas intégré. La taxe de circulation annuelle, l’assurance, les plaques et l’homologation ne sont pas comptées.",
  "faqH": "Questions fréquentes",
  "faq": [
    [
      "Quelles taxes paie-t-on en important une voiture en Belgique ?",
      "Pour une voiture venue de l’extérieur de l’UE, vous payez 10 % de droit de douane sur la valeur en douane (prix, fret et assurance jusqu’à la frontière de l’UE), puis 21 % de TVA sur cette valeur plus le droit. À l’immatriculation s’ajoute la taxe de mise en circulation régionale. Une voiture achetée dans un autre pays de l’UE ne paie pas de droit de douane."
    ],
    [
      "Combien coûte la BIV en Flandre en 2026 ?",
      "La BIV flamande suit la formule ((CO2 × 1,245) / 246)^6 × 4 500 plus une composante air, multipliée par une correction d’âge. Une voiture neuve Euro 6 à essence avec 118 g/km paie 232,67 €. La taxe est limitée à 58,16 € minimum et 14 539,31 € maximum, et baisse de 10 points par an jusqu’à 10 % après plus de neuf ans."
    ],
    [
      "Comment se calcule la TMC wallonne depuis 2025 ?",
      "Depuis le 1er juillet 2025, la TMC est le montant de base de la puissance, multiplié par CO2 divisé par 136 et par la masse divisée par 1 838, avec un coefficient de 0,8 pour un hybride. Le résultat se situe entre 50 € et 9 000 €. Le montant de base baisse avec l’âge de la voiture, de 100 % à 10 % après quatorze ans."
    ],
    [
      "Comment fonctionne la TMC à Bruxelles ?",
      "Bruxelles utilise un barème à sept tranches selon les kW ou les chevaux fiscaux, le montant le plus élevé s’appliquant. Les tranches vont de 78,88 € à 6 357,85 € pour une voiture neuve, et le barème est indexé chaque 1er juillet. Une occasion bénéficie de la même réduction d’âge qu’en Wallonie."
    ],
    [
      "Une voiture électrique paie-t-elle la taxe de mise en circulation ?",
      "Oui, dans les trois régions, mais très peu. La Flandre demande 61,50 € pour les immatriculations depuis 2026, après la suppression de l’exonération. Bruxelles demande le minimum de 78,88 € et la Wallonie au moins 50 €. Une électrique chinoise paie en plus 10 % de droit et un droit compensateur de 7,8 % à 35,3 %."
    ],
    [
      "Dois-je payer la TVA sur une voiture achetée dans un autre pays de l’UE ?",
      "Seulement si la voiture est neuve pour la TVA : au plus six mois ou au plus 6 000 kilomètres. Vous payez alors 21 % de TVA belge, même en tant que particulier. Une occasion qui dépasse les deux limites et dont la TVA a déjà été payée dans le pays d’achat n’est pas soumise à la TVA belge. La taxe de mise en circulation reste due dans tous les cas."
    ],
    [
      "Une voiture américaine ou japonaise paie-t-elle un droit de douane ?",
      "Pas toujours. Depuis le 1er juillet 2026, le règlement (UE) 2026/1455 supprime les droits sur les produits industriels d’origine américaine, ce qui permet 0 % pour une voiture construite aux États-Unis avec origine et transport direct prouvés. Les voitures japonaises sont à 0 % depuis le 1er février 2026. La Corée du Sud est à 0 % grâce à l’accord de libre-échange. Sans preuve, 10 % s’appliquent, et la TVA de 21 % est toujours due."
    ],
    [
      "Pourquoi les chiffres trouvés en ligne diffèrent-ils ?",
      "Beaucoup de sites affichent encore un plafond flamand de 13 250 €, l’ancien écomalus wallon ou l’exonération flamande des électriques. Les tarifs du 1er juillet 2026 au 30 juin 2027 sont : maximum de 14 539,31 € en Flandre, 9 000 € en Wallonie et 6 357,85 € à Bruxelles. Le calculateur utilise ces tarifs indexés."
    ]
  ],
  "sourcesPre": "Vérifié par",
  "sourcesName": "Joshua Victor",
  "sourcesPost": ", Fondateur. Sources : administration fiscale flamande (tarif BIV des voitures hors leasing et correction d’âge), SPW Finances (TMC wallonne depuis le 1er juillet 2025), Bruxelles Fiscalité (barème de la TMC), SPF Finances (TVA à l’importation), tarif douanier commun de l’UE (TARIC), règlement (UE) 2026/1455, règlement d’exécution (UE) 2024/2754, accord de partenariat UE-Japon et accord de commerce et de coopération UE-Royaume-Uni. Les barèmes indexés proviennent des tarifs publiés pour 2026-2027 ; la BIV flamande pour le diesel est déduite d’exemples chiffrés. Dernière vérification : novembre 2026.",
  "dateModified": "2026-11-18",
  "jsonName": "Importer une voiture en Belgique — calculateur de droits, TVA et TMC",
  "jsonDesc": "Calculateur gratuit des droits de douane, de la TVA et de la taxe de mise en circulation pour une voiture importée en Belgique.",
  "appName": "Calculateur d’importation de voiture en Belgique",
  "crumbTitle": "Importer une voiture en Belgique"
};

export const metadata: Metadata = {
  title: C.title,
  description: C.desc,
  alternates: alternatesFor(PATH),
  openGraph: { title: C.ogTitle, description: C.ogDesc, url: URL, siteName: 'Naira Autos', locale: C.locale, type: 'website' },
  keywords: C.keywords,
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL, name: C.jsonName, description: C.jsonDesc, url: URL, inLanguage: C.ld, dateModified: C.dateModified,
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: C.jobTitle, url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: C.homeName, item: 'https://www.naira.autos' + C.homePath },
          { '@type': 'ListItem', position: 2, name: C.hubName, item: 'https://www.naira.autos' + C.hubPath },
          { '@type': 'ListItem', position: 3, name: C.crumbTitle, item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: C.ld, mainEntity: C.faq.map((f) => ({ '@type': 'Question', name: f[0], acceptedAnswer: { '@type': 'Answer', text: f[1] } })) },
    { '@type': 'SoftwareApplication', name: C.appName, inLanguage: C.ld, applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';
const COLORS: Record<string, { color: string; bg: string; border: string }> = {
  orange: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
  blue: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/5', border: 'border-blue-200 dark:border-blue-500/20' },
  sky: { color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
  amber: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
};

export default function Page() {
  return (
    <div lang={C.lang}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href={C.hubPath} className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label={C.crumbBack}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label={C.crumbNav} className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href={C.homePath} className="hover:text-white/60 transition-colors">{C.homeName}</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href={C.hubPath} className="hover:text-white/60 transition-colors">{C.hubName}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">{C.crumbLabel}</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">{C.badge1}</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{C.badge2}</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">{C.badge3}</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              {C.h1a}<br /><span className="text-blue-400">{C.h1b}</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">{C.sub}</p>
            <p className="text-white/75 text-sm leading-relaxed">{C.lead}</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed"><strong className="text-amber-900 dark:text-amber-300">{C.warnStrong}</strong> {C.warn}</p>
        </div>
      </div>

      <BelgiumImportCalculator lang={C.lang as 'nl' | 'fr'} />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>{C.introH}</h2>
            <p className={`${p} mb-6 max-w-3xl`}>{C.intro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {C.cards.map(([label, rate, base, tone]) => (
                <div key={label} className={`p-5 rounded-2xl ${COLORS[tone].bg} border ${COLORS[tone].border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${COLORS[tone].color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>{C.changedH}</h2>
                <div className="space-y-3">
                  {C.changed.map(([k, v]) => <p key={k} className={p}><strong className="text-foreground">{k}</strong> {v}</p>)}
                </div>
              </div>
              {C.examples.map(([k, v]) => (
                <div key={k}>
                  <h2 className={h2} style={heading}>{k}</h2>
                  <p className={p}>{v}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>{C.stepsH}</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  {C.steps.map((s) => <li key={s}>{s}</li>)}
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>{C.mistakesH}</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  {C.mistakes.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>{C.notH}</h2>
                <p className={p}>{C.notP}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>{C.faqH}</h2>
            <div className="space-y-3 max-w-3xl">
              {C.faq.map((f) => (
                <details key={f[0]} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f[0]}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f[1]}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            {C.sourcesPre} <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">{C.sourcesName}</Link>{C.sourcesPost}
          </p>
        </div>
      </div>
    </div>
  );
}
