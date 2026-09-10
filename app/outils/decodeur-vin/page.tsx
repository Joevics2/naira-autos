import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientFr from '@/components/VINCheckerClientFr';

export const metadata: Metadata = {
  title: 'Décodeur VIN Gratuit — Vérification VIN et Numéro de Châssis',
  description: "Décodeur VIN gratuit pour toute voiture. Vérifiez le VIN, NIV ou numéro de châssis — marque, modèle, année, moteur et pays d'origine. Idéal pour les voitures importées des États-Unis en France, Belgique, Suisse, au Québec et en Côte d'Ivoire.",
  keywords: ['décodeur vin gratuit', 'vérification vin', 'vérifier un numéro de vin', 'numéro de châssis voiture', "numéro d'identification du véhicule", 'niv voiture', 'décoder un vin gratuitement', 'historique véhicule par vin', 'vin decoder gratuit français', 'numéro de série voiture'],
  alternates: {
    canonical: 'https://www.naira.autos/outils/decodeur-vin',
    languages: {
      en: 'https://www.naira.autos/tools/vin-checker-global',
      es: 'https://www.naira.autos/herramientas/decodificador-de-vin',
      fr: 'https://www.naira.autos/outils/decodeur-vin',
      'x-default': 'https://www.naira.autos/tools/vin-checker-global',
    },
  },
  openGraph: {
    title: 'Décodeur VIN Gratuit | Naira Autos',
    description: 'Vérifiez gratuitement le VIN, NIV ou numéro de châssis de toute voiture — marque, modèle, année, moteur et origine, instantanément.',
    url: 'https://www.naira.autos/outils/decodeur-vin',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/outils/decodeur-vin',
      name: 'Décodeur VIN Gratuit — Vérification VIN et Numéro de Châssis',
      description: "Décodeur VIN gratuit pour toute voiture — marque, modèle, année, moteur et pays d'origine.",
      url: 'https://www.naira.autos/outils/decodeur-vin',
      inLanguage: 'fr',
      dateModified: '2026-09-10',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.naira.autos/accueil' },
        { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.naira.autos/outils' },
        { '@type': 'ListItem', position: 3, name: 'Décodeur VIN', item: 'https://www.naira.autos/outils/decodeur-vin' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: "Qu'est-ce que le VIN d'une voiture ?", acceptedAnswer: { '@type': 'Answer', text: "Le VIN (Vehicle Identification Number) est un code unique de 17 caractères attribué à chaque véhicule à sa fabrication. Il encode le pays d'origine, le constructeur, le type de véhicule, le moteur, l'année-modèle, l'usine d'assemblage et un numéro de série unique. Au Québec, on parle officiellement de NIV (numéro d'identification du véhicule) ; en France et en Belgique, on parle aussi de « numéro de châssis » ou « numéro de série »." } },
        { '@type': 'Question', name: 'Comment faire une vérification VIN gratuite ?', acceptedAnswer: { '@type': 'Answer', text: 'Saisissez le VIN à 17 caractères ci-dessus et cliquez sur « Décoder ». Notre décodeur gratuit utilise la base de données publique NHTSA (États-Unis) pour afficher la marque, le modèle, l\'année, les caractéristiques moteur, le type de transmission et l\'usine d\'origine — entièrement gratuit, sans inscription, depuis n\'importe quel pays.' } },
        { '@type': 'Question', name: 'Où se trouve le numéro VIN sur une voiture ?', acceptedAnswer: { '@type': 'Answer', text: 'Le VIN apparaît à trois endroits : la plaque du tableau de bord (visible à travers le pare-brise), l\'étiquette dans l\'encadrement de la portière conducteur, et gravé sur le châssis sous le capot. Les trois doivent correspondre exactement.' } },
        { '@type': 'Question', name: 'Le VIN et le NIV, est-ce la même chose ?', acceptedAnswer: { '@type': 'Answer', text: "Oui. VIN est le sigle anglais (Vehicle Identification Number) ; NIV en est l'équivalent français officiel au Québec (numéro d'identification du véhicule). C'est exactement le même code à 17 caractères." } },
        { '@type': 'Question', name: 'Ce décodeur fonctionne-t-il pour les voitures importées en France ou en Belgique ?', acceptedAnswer: { '@type': 'Answer', text: "Oui, à condition que le véhicule ait été fabriqué à l'origine pour le marché américain, canadien ou mexicain — ce qui est le cas de nombreuses importations depuis les États-Unis, notamment les pick-up et SUV. Les véhicules fabriqués exclusivement pour l'Europe n'apparaissent généralement pas dans la base NHTSA ; pour ceux-là, la vérification passe par le certificat d'immatriculation (carte grise) et le service Histovec en France." } },
        { '@type': 'Question', name: 'Et pour une voiture au Québec, en Suisse ou en Côte d\'Ivoire ?', acceptedAnswer: { '@type': 'Answer', text: "Au Québec, la quasi-totalité du parc automobile est d'origine nord-américaine et décode donc parfaitement. En Suisse, l'outil est surtout utile pour les véhicules importés des États-Unis. En Côte d'Ivoire et dans le reste de l'Afrique de l'Ouest, une grande partie des voitures d'occasion importées proviennent directement des États-Unis et du Canada, ce qui rend ce décodeur particulièrement pertinent avant un achat." } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Décodeur VIN Gratuit', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function DecodeurVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/outils" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Retour">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/accueil" className="hover:text-white/60 transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/outils" className="hover:text-white/60 transition-colors">Outils</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Décodeur VIN</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">100% Gratuit</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Données NHTSA</span>
              <Link href="/tools/vin-checker-global" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Décodeur VIN Gratuit<br /><span className="text-blue-400">et Numéro de Châssis</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Vérifiez le VIN ou NIV de toute voiture, en quelques secondes.</p>
            <p className="text-white/75 text-sm leading-relaxed">Saisissez le VIN à 17 caractères depuis le tableau de bord, la portière ou le châssis. Obtenez la marque, le modèle, l'année, les caractéristiques moteur et le pays d'origine — gratuitement, sans inscription. Idéal si vous achetez une voiture importée en France, en Belgique, en Suisse, au Québec ou en Côte d'Ivoire.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientFr />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vérification VIN Gratuite pour Toute Voiture d'Occasion</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Notre <strong className="text-foreground">décodeur VIN gratuit</strong> utilise la base de données publique du NHTSA (l'autorité américaine de la sécurité routière). Une <strong className="text-foreground">vérification VIN gratuite</strong> vous donne la marque, le modèle, l'année, les caractéristiques du moteur, le type de transmission, la catégorie de carrosserie et l'usine d'assemblage — tout ce qu'il faut pour confirmer ce qu'est réellement une voiture d'occasion avant de l'acheter.</p>
                  <p>Le marché de l'occasion est de plus en plus international. Des véhicules fabriqués pour les États-Unis, le Canada ou le Mexique sont exportés et réimmatriculés en permanence — que ce soit comme importations vers la France ou la Belgique, comme voitures de collection en Suisse, ou comme pick-up et SUV qui arrivent au Québec ou en Côte d'Ivoire. Comme le VIN est gravé en usine et ne change jamais, une simple vérification VIN gratuite fonctionne de la même façon quel que soit le pays où finit la voiture, tant qu'elle a été construite à l'origine pour le marché nord-américain.</p>
                  <p>C'est le point essentiel à comprendre : le VIN n'est pas une plaque d'immatriculation attribuée par votre pays — c'est une empreinte de fabrication appliquée sur la chaîne de montage, bien avant que la voiture ne quitte l'usine. Il ne change pas quand le véhicule est exporté, réimmatriculé, reprend de nouvelles plaques ou change plusieurs fois de propriétaire. C'est pourquoi une vérification VIN gratuite peut suivre une voiture à travers les frontières d'une façon qu'un numéro de plaque ne pourra jamais égaler.</p>
                  <p>La plupart des gens vérifient le VIN seulement après avoir négocié un prix — mais le bon réflexe est de le faire avant même d'aller voir la voiture, avant de verser un acompte, et à nouveau après l'achat pour confirmer que rien n'a été changé à la livraison. Ça ne coûte rien et ça prend moins d'une minute.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vérification VIN Selon Votre Pays</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">France</strong> — les véhicules immatriculés d'origine en France passent par le SIV (Système d'Immatriculation des Véhicules) et leur historique se consulte via Histovec, le service officiel du gouvernement. Ce décodeur est surtout utile pour les voitures importées des États-Unis ou du Canada — un cas fréquent chez les amateurs de pick-up américains et de voitures de collection. Le numéro figure à la case E de la carte grise ; comparez-le toujours avec celui gravé sur le châssis.</p>
                  <p><strong className="text-foreground">Belgique et Suisse</strong> — en Belgique, l'immatriculation passe par la DIV ; en Suisse, par le permis de circulation cantonal et l'OFROU au niveau fédéral. Comme en France, ce décodeur est surtout pertinent pour les véhicules d'importation nord-américaine, très présents sur le marché de l'occasion suisse et belge, notamment les SUV et pick-up.</p>
                  <p><strong className="text-foreground">Québec et Canada</strong> — la quasi-totalité du parc automobile québécois est d'origine nord-américaine, donc ce décodeur fonctionne pour la grande majorité des voitures. Le terme officiel utilisé par la SAAQ est <strong className="text-foreground">NIV</strong> (numéro d'identification du véhicule) — c'est l'une des recherches les plus fréquentes chez les acheteurs de voitures d'occasion ou de véhicules vendus aux enchères type Copart, et ce décodeur gratuit y répond directement, avant même de verser un acompte.</p>
                  <p><strong className="text-foreground">Côte d'Ivoire et Afrique de l'Ouest francophone</strong> — une grande partie des voitures d'occasion importées à Abidjan et dans la sous-région provient directement des États-Unis, souvent via des ventes aux enchères. Comme le même VIN à 17 chiffres décode normalement, vérifier le VIN avant de payer un acompte à un vendeur ou un transitaire est l'un des réflexes les plus rentables qui soient — ça ne coûte rien et ça évite bien des mauvaises surprises à l'arrivée du conteneur.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vous Achetez une Voiture Importée ? Faites Ceci d'Abord</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Acheter une voiture importée comporte un risque supplémentaire qu'un achat local n'a pas : les papiers, le vendeur et l'état réel du véhicule peuvent avoir une origine dans un pays que vous n'avez jamais visité. Une vérification gratuite du VIN ou du numéro de châssis ne remplace pas une inspection, mais c'est le premier filtre le moins cher qui existe, et il ne coûte rien à utiliser avant d'aller plus loin.</p>
                  <p>Commencez par décoder le VIN et comparez le résultat — année, modèle, moteur, finition — avec ce que le vendeur a annoncé exactement. Un écart ici, même minime comme un mauvais moteur, est souvent le premier signal que les photos de l'annonce et les papiers réels ne correspondent pas à la même voiture. Ensuite, vérifiez physiquement que le VIN du tableau de bord correspond à celui gravé sur le châssis et à celui de l'étiquette de la portière ; une incohérence entre ces trois emplacements est l'un des signes les plus clairs d'une plaque échangée.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>VIN vs NIV vs Numéro de Châssis — Est-ce la Même Chose ?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Oui, avec des nuances de vocabulaire régional. <strong className="text-foreground">VIN</strong> est le terme international (Vehicle Identification Number). <strong className="text-foreground">NIV</strong> (numéro d'identification du véhicule) est le terme officiel utilisé au Québec par la SAAQ pour exactement le même code. <strong className="text-foreground">Numéro de châssis</strong> et <strong className="text-foreground">numéro de série</strong> sont les termes les plus courants en France, en Belgique, en Suisse et en Afrique francophone. Tous désignent le même code à 17 caractères gravé en usine.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Comment Lire un VIN : Que Signifie Chaque Section</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Les 17 caractères ne sont pas aléatoires. Les positions 1 à 3 identifient le constructeur et le pays d'assemblage — c'est ainsi que le décodeur sait si une voiture a été fabriquée aux États-Unis, au Canada, au Mexique ou ailleurs. Les positions 4 à 8 décrivent le véhicule : carrosserie, moteur et série. La position 9 est un chiffre de contrôle mathématique utilisé pour détecter un VIN mal recopié ou falsifié. La position 10 encode l'année-modèle, et les positions 12 à 17 forment le numéro de production unique du véhicule.</p>
                  <p>Savoir lire ces sections soi-même reste utile même avec un décodeur sous la main, car cela permet de vérifier le résultat en quelques secondes. Si la position 10 indique un modèle 2015 alors que le vendeur l'a annoncé comme un 2018, ça vaut la peine de poser la question directement — ce n'est pas une accusation, c'est une vérification qui ne coûte rien et prend trente secondes.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Fonctionne pour Toutes les Marques — Ford, Toyota, Honda, Chevrolet et Plus</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Ce n'est pas un outil dédié à une seule marque. Comme il lit directement la base de données des constructeurs NHTSA, le même décodeur fonctionne pour Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai et toute autre marque vendue sur le marché nord-américain. Il suffit de coller le code à 17 caractères — le décodeur identifie automatiquement le bon schéma constructeur, sans que vous ayez à préciser la marque.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Vérification VIN vs Rapport d'Historique du Véhicule</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Une <strong className="text-foreground">vérification VIN gratuite</strong> indique ce qu'était la voiture à sa sortie d'usine : les caractéristiques de fabrication. Pour savoir ce qui s'est passé depuis — accidents, kilométrage réel, statut du titre (épave, inondation, reconstruit) — il faut un <strong className="text-foreground">rapport d'historique du véhicule</strong> payant, comme Carfax ou AutoCheck. Pour tout achat de voiture d'occasion représentant une somme importante, un rapport d'historique payant est vivement recommandé en complément de cette vérification gratuite des caractéristiques.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Décodeur VIN — Questions Fréquentes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Cette vérification VIN est-elle vraiment gratuite ?', a: "Oui. 100% gratuit, via l'API publique du NHTSA. Aucun compte ni connexion requis. Vous pouvez faire autant de vérifications que nécessaire, depuis n'importe quel pays." },
                { q: 'À quoi sert le numéro VIN d\'une voiture ?', a: "Le VIN identifie un véhicule précis pour vérifier ses caractéristiques, consulter son historique, l'immatriculer, l'assurer ou suivre les avis de rappel. Au Québec, le NIV est exigé pour toute démarche d'importation et de changement de propriétaire." },
                { q: 'Puis-je consulter les caractéristiques par VIN gratuitement ?', a: 'Oui. Notre décodeur gratuit renvoie la marque, le modèle, l\'année, le moteur, le type de carrosserie, la transmission et l\'origine depuis la base des constructeurs NHTSA, sans frais, pour les véhicules de spécification américaine, canadienne ou mexicaine.' },
                { q: 'Cela fonctionne-t-il pour les voitures importées en France ou en Belgique depuis les États-Unis ?', a: "Oui, pour tout véhicule fabriqué à l'origine pour le marché nord-américain — un cas fréquent chez les importateurs de pick-up et de voitures de collection. Les véhicules de spécification exclusivement européenne peuvent ne pas apparaître." },
                { q: 'Comment savoir si un VIN est valide ?', a: 'Un VIN valide contient exactement 17 caractères — des lettres (A-Z, sans I, O, Q) et des chiffres. La position 9 est un chiffre de contrôle mathématique. S\'il ne correspond pas, le VIN a été altéré. Cet outil le vérifie automatiquement.' },
                { q: 'Que faire si le décodeur ne renvoie aucun résultat ?', a: "Cela signifie généralement que le véhicule est d'origine européenne, asiatique ou de spécification exclusive à un autre marché — hors de la base NHTSA. L'année-modèle reste décodée à partir de la position 10 du VIN. Pour ces cas, contactez le service VIN officiel du constructeur." },
                { q: 'Le numéro de moteur est-il la même chose que le VIN ?', a: "Non. Le numéro de moteur est gravé sur le bloc-moteur lui-même et identifie ce moteur précis, tandis que le VIN/numéro de châssis identifie le véhicule dans son ensemble. Cet outil décode le VIN, pas le numéro de moteur séparément." },
                { q: "Le VIN a-t-il un impact sur le montant des droits de douane ?", a: "Indirectement, oui. De nombreux pays calculent les droits d'importation en fonction de l'âge et de la cylindrée du véhicule, deux informations confirmées par le VIN. Le décoder correctement avant de calculer vos droits évite de budgéter sur des chiffres erronés." },
                { q: 'Cette vérification VIN peut-elle me dire si la voiture a eu un accident ?', a: "Non. Le décodeur gratuit renvoie uniquement les caractéristiques de fabrication — marque, modèle, année, moteur et origine. L'historique des accidents, le kilométrage et le statut du titre nécessitent un rapport payant comme Carfax ou AutoCheck." },
                { q: 'Puis-je savoir si un VIN correspond à une voiture volée ?', a: "Pas avec cet outil. Une recherche de véhicule volé relève des forces de l'ordre et des assureurs — le NICB (National Insurance Crime Bureau) propose un outil gratuit VINCheck à cet effet précis, distinct d'un décodeur de caractéristiques." },
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
              Plus d'Outils Gratuits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/outils/mecanicien-virtuel" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mécanicien Virtuel IA</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/outils/combien-vaut-ma-voiture" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Combien Vaut Ma Voiture ?</p>
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
