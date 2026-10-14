import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import CalculateurImportationFranceClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/outils/calculateur-importation-voiture-france';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Calculateur d’importation de voiture en France 2026 — Douane, TVA, malus et carte grise',
  description: 'Calculateur gratuit pour importer une voiture en France : droit de douane de 10 %, TVA de 20 %, malus CO2 et malus masse 2026 avec décote d’ancienneté, carte grise, Japon et États-Unis à 0 %, voitures électriques chinoises. Mise à jour octobre 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Calculateur d’importation de voiture en France | Naira Autos',
    description: 'Calculez droit de douane, TVA, malus écologique et carte grise pour une voiture importée en France.',
    url: URL, siteName: 'Naira Autos', locale: 'fr_FR', type: 'website',
  },
  keywords: [
    'importer une voiture en France coût', 'calcul malus véhicule importé 2026', 'droit de douane voiture hors UE 10 %',
    'TVA importation voiture 20 %', 'décote malus occasion importée', 'importer voiture des États-Unis en France 2026',
    'importer voiture du Japon droit de douane 0', 'voiture de collection importation TVA 5,5', 'carte grise véhicule importé prix',
  ].join(', '),
};

const FAQ = [
  { q: 'Quels droits et taxes paie-t-on pour importer une voiture en France ?', a: 'Pour une voiture achetée hors de l’Union européenne, le droit de douane est de 10 % de la valeur en douane (prix, fret et assurance jusqu’à la frontière de l’UE), puis la TVA de 20 % s’applique sur la valeur en douane augmentée du droit. À cela s’ajoutent, à l’immatriculation, le malus CO2 et le malus masse s’ils sont dus, la taxe régionale de la carte grise et 13,76 € de frais fixes. Une voiture achetée dans l’UE ne supporte aucun droit de douane.' },
  { q: 'Le malus d’une occasion importée baisse-t-il de 10 % par an ?', a: 'Non, c’est une règle ancienne. Depuis le 1er mars 2025, la décote suit un barème par tranches de mois fixé par la loi : 3 % pour un véhicule de 1 à 3 mois, 12 % à un an, 38 % entre 49 et 60 mois, 64 % entre 109 et 120 mois et 100 % à partir de 181 mois. Le calculateur applique ce barème officiel du site service-public.gouv.fr. Beaucoup de guides en ligne citent encore l’ancienne règle.' },
  { q: 'Le plafond du malus est-il de 70 000 euros ou de 80 000 euros ?', a: 'Pour une voiture immatriculée pour la première fois en 2026, le plafond cumulé du malus CO2 et du malus masse est de 80 000 euros, atteint à 192 g/km de CO2. Le plafond de 70 000 euros concernait les immatriculations de mars à décembre 2025. Pour une occasion importée, c’est le barème de l’année de première immatriculation à l’étranger qui s’applique, avec son propre plafond, avant la décote.' },
  { q: 'Une voiture américaine paie-t-elle encore 10 % de droit de douane ?', a: 'Plus nécessairement. Depuis le 1er juillet 2026, le règlement (UE) 2026/1455 supprime les droits sur les produits industriels d’origine américaine, ce qui permet un taux de 0 % pour une voiture fabriquée aux États-Unis, à condition de prouver l’origine et le transport direct. Une voiture européenne achetée aux États-Unis garde le droit normal de 10 %. La TVA de 20 % reste due dans tous les cas.' },
  { q: 'Et pour une voiture japonaise ou coréenne ?', a: 'Les voitures japonaises bénéficient de 0 % depuis le 1er février 2026, fin de la réduction progressive prévue par l’accord de partenariat UE-Japon, avec une déclaration d’origine. Les voitures coréennes sont à 0 % grâce à l’accord de libre-échange, également avec preuve d’origine. Sans document valable, le droit de 10 % s’applique.' },
  { q: 'Dois-je payer la TVA française sur une voiture achetée dans un autre pays de l’UE ?', a: 'Seulement si le véhicule est neuf au sens fiscal : moins de 6 mois d’âge ou moins de 6 000 kilomètres. La TVA de 20 % se règle alors en France, même pour un particulier. Une occasion plus ancienne et plus kilométrée, dont la taxe a déjà été payée dans le pays du vendeur, n’est pas soumise à la TVA française. Le malus reste dû dans les deux cas.' },
  { q: 'Quel est le régime des voitures de collection ?', a: 'Un véhicule de plus de 30 ans, en état d’origine et reconnu comme objet de collection, est exonéré de droit de douane et bénéficie d’une TVA réduite de 5,5 % à l’importation. La douane apprécie le classement au cas par cas. Comme sa première immatriculation date d’avant 2015, il ne paie ni malus CO2 ni malus masse.' },
  { q: 'Les voitures électriques paient-elles le malus ?', a: 'Un véhicule exclusivement électrique est exonéré du malus CO2 et du malus masse. La taxe régionale de la carte grise dépend de la région : beaucoup exonèrent les électriques, certaines non. Un véhicule électrique chinois paie en revanche, à l’entrée dans l’UE, le droit de 10 % plus un droit compensateur de 7,8 % à 35,3 % selon le constructeur, sauf engagement de prix accepté.' },
  { q: 'Quelle valeur la douane retient-elle ?', a: 'La valeur en douane est le prix réellement payé augmenté du transport et de l’assurance jusqu’à la frontière de l’UE. Si le prix paraît anormalement bas, la douane peut le remplacer par une valeur de référence. Gardez la facture, le paiement et le contrat d’achat.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Calculateur d’importation de voiture en France — douane, TVA, malus et carte grise',
      description: 'Calculateur gratuit des droits, de la TVA, du malus écologique et de la carte grise pour une voiture importée en France.',
      url: URL, inLanguage: 'fr-FR', dateModified: '2026-10-14',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Fondateur', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.naira.autos/accueil' },
          { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.naira.autos/outils' },
          { '@type': 'ListItem', position: 3, name: 'Calculateur d’importation de voiture en France', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'fr-FR', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Calculateur d’importation de voiture en France', inLanguage: 'fr-FR', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function CalculateurImportationVoitureFrancePage() {
  return (
    <div lang="fr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/outils" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Retour">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Fil d’Ariane" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/accueil" className="hover:text-white/60 transition-colors">Accueil</Link>
              <ChevronRight className="h-3 w-3" />
              <Link prefetch={false} href="/outils" className="hover:text-white/60 transition-colors">Outils</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇫🇷 Calculateur d’importation</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100 % gratuit</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Malus 2026 et décote officielle</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Vérifié : octobre 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Importer une voiture<br /><span className="text-emerald-400">en France</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Combien coûte vraiment l’importation d’une voiture, malus compris ?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Choisissez l’origine, la date de première immatriculation et les caractéristiques du véhicule, et obtenez le droit de douane, la TVA, le malus CO2 et masse avec sa décote, puis la carte grise.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Simple estimation.</strong> Les barèmes changent chaque 1er janvier et de nombreux guides en ligne sont dépassés. Le tarif du cheval fiscal est fixé par chaque région : saisissez celui de votre département. Confirmez le total sur le simulateur officiel de service-public.gouv.fr avant tout achat.
          </p>
        </div>
      </div>

      <CalculateurImportationFranceClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Droits, TVA, malus : comment se compose le coût d’une voiture importée</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Importer une voiture en France ajoute trois couches de coûts. La première est douanière : aucun droit dans l’Union européenne, 10 % de la valeur en douane pour un véhicule venu d’un pays tiers, sauf accord commercial avec preuve d’origine. La deuxième est la TVA de 20 %, calculée sur la valeur en douane plus le droit. La troisième est propre à la France : à la première immatriculation, le malus CO2 et le malus masse frappent les voitures les plus émettrices ou les plus lourdes, puis la carte grise ajoute une taxe régionale et 13,76 € de frais fixes. Le calculateur additionne ces éléments dans l’ordre où l’administration les applique.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Droit de douane (hors UE)', rate: '10 %', base: 'sur la valeur en douane', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'TVA à l’importation', rate: '20 %', base: 'valeur en douane + droit', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'Japon, Corée, États-Unis', rate: '0 %', base: 'droit, avec preuve d’origine', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
                { label: 'Malus CO2 2026', rate: 'dès 108 g', base: 'jusqu’à 80 000 €', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
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
                <h2 className={h2} style={heading}>Ce qui a changé en 2025 et 2026</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Malus 2026 :</strong> le seuil du malus CO2 est passé à 108 g/km (113 g/km en 2025), le plafond cumulé atteint 80 000 € et le malus masse démarre à 1 500 kg au lieu de 1 600 kg. Les voitures 100 % électriques restent exonérées des deux taxes.</p>
                  <p className={p}><strong className="text-foreground">Décote des occasions importées :</strong> depuis le 1er mars 2025, la réduction ne suit plus 10 % par an. Elle suit un barème par tranches de mois, de 3 % à 100 %. Une voiture immatriculée pour la première fois à l’étranger avant le 1er janvier 2015 ne paie aucun malus.</p>
                  <p className={p}><strong className="text-foreground">États-Unis :</strong> depuis le 1er juillet 2026, le règlement (UE) 2026/1455 supprime les droits sur les produits industriels d’origine américaine. Pour une voiture, il faut prouver la fabrication aux États-Unis et le transport direct.</p>
                  <p className={p}><strong className="text-foreground">Japon :</strong> la réduction progressive du droit sur les voitures japonaises s’achève le 1er février 2026, avec 0 % sur déclaration d’origine.</p>
                  <p className={p}><strong className="text-foreground">Chine :</strong> les voitures électriques chinoises paient 10 % plus un droit compensateur : BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Shanghai 7,8 %. Un premier engagement de prix a été accepté en février 2026 pour la Cupra Tavascan.</p>
                  <p className={p}><strong className="text-foreground">Royaume-Uni :</strong> les voitures britanniques sont à 0 % avec preuve d’origine. Pour les électriques, des règles d’origine plus strictes sont prévues à partir du 1er janvier 2027.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemple 1 : voiture venue des Émirats, sans accord</h2>
                <p className={p}>Une voiture coûte 20 000 €, avec 1 500 € de fret et d’assurance. La valeur en douane est de 21 500 €. Le droit de 10 % représente 2 150 €. La TVA de 20 % porte sur 23 650 € et vaut 4 730 €. Droits et TVA totalisent 6 880 €, soit 32 % de la valeur en douane, avant malus et carte grise.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemple 2 : voiture japonaise avec et sans preuve d’origine</h2>
                <p className={p}>Une voiture de 15 000 € avec 1 200 € de fret a une valeur en douane de 16 200 €. Avec la déclaration d’origine, le droit est nul et la TVA vaut 3 240 €. Sans le document, le droit de 10 % coûte 1 620 € et la TVA, calculée sur 17 820 €, monte à 3 564 €. Le seul papier manquant coûte donc 1 944 €.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemple 3 : occasion européenne et décote du malus</h2>
                <p className={p}>Une voiture achetée 18 000 € en Allemagne, immatriculée en août 2022 et émettant 140 g/km (WLTP), est importée en octobre 2026. Le barème 2022 donne un malus de 310 €. Avec 50 mois d’ancienneté, la décote est de 38 % : le malus est de 192,20 €. Il n’y a ni droit ni TVA française puisque la voiture n’est pas neuve.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemple 4 : SUV neuf acheté dans l’UE</h2>
                <p className={p}>Un SUV neuf à 40 000 € émet 160 g/km et pèse 1 850 kg. Le malus CO2 2026 est de 8 770 €. Le malus masse vaut 200 kg à 10 €, 100 kg à 15 € et 51 kg à 20 €, soit 4 520 €. Le malus total est de 13 290 €, et la TVA française de 20 % s’ajoute avec 8 000 €.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Exemple 5 : électrique chinoise de marque BYD</h2>
                <p className={p}>Pour 30 000 € et 1 500 € de fret, la valeur en douane est de 31 500 €. Le droit de 10 % vaut 3 150 € et le droit compensateur de 17 %, 5 355 €. La TVA de 20 % porte sur 40 005 € et vaut 8 001 €. Les trois ensemble font 16 506 €, soit environ 52 % de la valeur en douane. Le malus est nul.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Malus : le barème de l’année de première immatriculation</h2>
                <div className="space-y-3">
                  <p className={p}>Pour une occasion importée, on prend le barème de l’année où le véhicule a été immatriculé pour la première fois à l’étranger, puis on applique la décote. Un véhicule avec réception européenne se taxe selon ses émissions WLTP (case V.7), tandis qu’un véhicule sans réception, par exemple américain ou japonais, se taxe selon sa puissance fiscale. Le malus masse se calcule par tranches de kilos sur la masse en ordre de marche (case G), avec un abattement pour les hybrides. Pour les voitures immatriculées entre 2015 et 2020, saisissez vous-même le malus théorique : ces barèmes anciens ne sont pas intégrés.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Étape par étape : importer une voiture en France</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Relever la date de première immatriculation, les émissions de CO2, la masse et la puissance fiscale sur le certificat d’immatriculation ou le certificat de conformité (COC).</li>
                  <li>Vérifier le pays de fabrication et demander la preuve d’origine si un accord réduit le droit à 0 %.</li>
                  <li>Hors UE, déclarer le véhicule en douane et payer le droit et la TVA. Dans l’UE, obtenir le quitus fiscal ou régler la TVA si le véhicule est neuf.</li>
                  <li>Faire effectuer un contrôle technique français si le véhicule a plus de 4 ans. Sans réception européenne, demander une réception à titre isolé à la DREAL.</li>
                  <li>Déposer la demande de certificat d’immatriculation sur le site de l’ANTS, où le malus et la taxe régionale se règlent en ligne.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Erreurs fréquentes</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Appliquer l’ancienne décote de 10 % par an au lieu du barème par tranches de mois.</li>
                  <li>Croire que le malus se base sur l’année d’achat. C’est l’année de première immatriculation, en France ou à l’étranger.</li>
                  <li>Oublier que la TVA se calcule aussi sur le droit de douane.</li>
                  <li>Compter sur le taux de 0 % sans preuve d’origine ou sans transport direct depuis les États-Unis.</li>
                  <li>Acheter une voiture sans réception européenne sans budgéter la réception à titre isolé et les modifications.</li>
                  <li>Négliger le tarif régional du cheval fiscal, qui varie fortement d’une région à l’autre.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Ce que le calculateur ne couvre pas</h2>
                <p className={p}>Le calculateur ignore les exonérations pour carte mobilité inclusion, les réductions pour familles nombreuses, la réduction pour véhicules de 8 places détenus par une société, l’abattement du superéthanol E85, les motos, les utilitaires et la taxe annuelle sur les véhicules d’entreprise. Il ne chiffre pas non plus l’assurance, les plaques, le prestataire d’immatriculation, le transitaire ni l’éventuelle vignette Crit’Air. Les barèmes de malus de 2027 ne sont pas connus avant le vote de la loi de finances : revérifiez-les pour toute immatriculation après le 1er janvier 2027.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Questions fréquentes</h2>
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
            Vérifié par <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Fondateur. Sources : service-public.gouv.fr (fiches F35947 et F35950 sur le malus CO2 et le malus masse), Code des impositions sur les biens et services (articles L421-58 et suivants), tarif douanier de l’Union européenne (TARIC), règlement (UE) 2026/1455, règlement d’exécution (UE) 2024/2754, accord de partenariat UE-Japon, accord de commerce et de coopération UE-Royaume-Uni, question écrite de l’Assemblée nationale sur les véhicules de collection. Mise à jour : octobre 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
