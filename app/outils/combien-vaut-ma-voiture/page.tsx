import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { CombienVautMaVoitureClient } from './client';

export const metadata: Metadata = {
  title: 'Combien Vaut Ma Voiture ? Estimation Gratuite par IA | Naira Autos',
  description: 'Estimez la valeur de votre voiture gratuitement grâce à l\u2019IA, dans votre devise locale. Téléchargez une photo et obtenez un prix instantané — France, Belgique, Suisse, Canada, Côte d\u2019Ivoire, Sénégal et plus.',
  keywords: 'combien vaut ma voiture, estimation voiture gratuite, prix voiture occasion, estimation voiture IA, evaluer sa voiture en ligne, calculer prix de ma voiture',
  openGraph: {
    title: 'Combien Vaut Ma Voiture ? Estimation Gratuite par IA',
    description: 'Estimez la valeur de votre voiture par IA, dans votre devise locale, dans de nombreux pays francophones. Téléchargez une photo et obtenez une estimation instantanée — entièrement gratuit.',
    url: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
    siteName: 'Naira Autos',
    locale: 'fr',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
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
  name: 'Combien Vaut Ma Voiture ? Estimation Gratuite par IA',
  description: 'Outil gratuit d\u2019estimation de voiture par IA. Estimation instantanée dans votre devise locale, calibrée sur le marché de votre pays.',
  url: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
  inLanguage: 'fr',
  dateModified: '2026-09-08',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Estimation de Voiture par IA — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Téléchargez une photo de votre voiture et obtenez une estimation instantanée de son prix sur le marché, par IA et dans votre devise.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.naira.autos/accueil' },
      { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.naira.autos/outils' },
      { '@type': 'ListItem', position: 3, name: 'Combien Vaut Ma Voiture', item: 'https://www.naira.autos/outils/combien-vaut-ma-voiture' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Combien vaut ma voiture d\u2019occasion ?', acceptedAnswer: { '@type': 'Answer', text: 'Cela dépend de la marque, du modèle, de l\u2019année, de la finition, du kilométrage et de l\u2019état général, ainsi que des prix de vente actuels de voitures similaires dans votre pays. Téléchargez une photo ci-dessus et choisissez votre pays — l\u2019IA identifie votre voiture et vous donne une fourchette de prix dans votre devise locale, basée sur de véritables annonces de ce marché.' } },
      { '@type': 'Question', name: 'Quels facteurs influencent l\u2019estimation d\u2019une voiture d\u2019occasion ?', acceptedAnswer: { '@type': 'Answer', text: 'Les principaux facteurs sont : (1) la marque et le modèle — certains gardent mieux leur valeur selon le marché. (2) L\u2019année, la finition et le kilométrage. (3) L\u2019état de la carrosserie et de la peinture. (4) L\u2019état mécanique et l\u2019historique d\u2019entretien. (5) La complétude des papiers et de l\u2019immatriculation. (6) L\u2019offre et la demande locales — la même voiture peut valoir différemment selon le pays.' } },
      { '@type': 'Question', name: 'Mon pays influence-t-il l\u2019estimation ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui, énormément. Les droits d\u2019importation, la demande locale pour certaines marques, la force de la devise, et la taille du marché de l\u2019occasion, font tous varier les prix d\u2019un pays à l\u2019autre. Notre outil couvre de nombreux pays francophones et vous donne une estimation dans la bonne devise locale, calibrée sur ce marché et non sur une moyenne mondiale.' } },
      { '@type': 'Question', name: 'Quelle est la précision de l\u2019estimation par IA ?', acceptedAnswer: { '@type': 'Answer', text: 'Notre outil utilise la vision par ordinateur pour identifier précisément la marque, le modèle, l\u2019année et la finition à partir de votre photo, puis les compare à de véritables données d\u2019annonces dans le pays choisi pour vous donner une fourchette de prix, pas un chiffre unique. Considérez-le comme un point de départ fiable pour négocier, pas un prix final — la valeur réelle dépend toujours d\u2019une inspection en personne et de la négociation.' } },
      { '@type': 'Question', name: 'Cet outil d\u2019estimation est-il vraiment gratuit ?', acceptedAnswer: { '@type': 'Answer', text: 'Oui. Sans aucun coût, sans compte, et sans limite d\u2019utilisation.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Marque et valeur de revente', body: 'La force de revente varie selon le marché — Toyota et Honda gardent bien leur valeur dans la plupart des régions, tandis que les marques allemandes de luxe se déprécient plus vite dans les marchés où l\u2019entretien coûte cher. La demande locale compte autant que le badge.' },
  { icon: Shield, title: 'Kilométrage et historique d\u2019entretien', body: 'Un faible kilométrage et un historique d\u2019entretien documenté sont les deux indicateurs les plus fiables d\u2019une voiture bien entretenue, partout dans le monde. Un historique propre peut valoir plus qu\u2019un modèle plus récent d\u2019un an.' },
  { icon: CheckCircle2, title: 'Propriété et documentation', body: 'Une carte grise propre, une immatriculation à jour et des papiers complets sont non négociables pour obtenir la meilleure valeur, quel que soit le marché. Des papiers incomplets ou des problèmes d\u2019importation peuvent faire baisser le prix de 15 à 25 %.' },
  { icon: AlertCircle, title: 'État général', body: 'Une carrosserie propre sans rayures, rouille ni peinture usée, avec un moteur mécaniquement sain, ajoute constamment 10 à 15 % à la valeur marchande par rapport à une voiture comparable montrant des signes d\u2019usure visibles.' },
];

const FAQ_ITEMS = [
  { q: 'Combien vaut ma voiture d\u2019occasion ?', a: 'Cela dépend de la marque, du modèle, de l\u2019année, de la finition, du kilométrage et de l\u2019état — ainsi que des prix de vente actuels de voitures similaires dans votre pays. Téléchargez une photo ci-dessus et choisissez votre pays pour obtenir une estimation par IA dans votre devise locale.' },
  { q: 'Quels facteurs influencent l\u2019estimation d\u2019une voiture d\u2019occasion ?', a: 'La marque et le modèle, l\u2019année et la finition, le kilométrage, l\u2019état de la carrosserie et de la mécanique, la complétude des papiers et de l\u2019immatriculation, ainsi que l\u2019offre et la demande locales sur votre marché précis.' },
  { q: 'Mon pays influence-t-il l\u2019estimation ?', a: 'Oui — les droits d\u2019importation, la demande locale pour certaines marques, la force de la devise et la taille du marché font tous varier les prix d\u2019un pays à l\u2019autre. Nous couvrons de nombreux pays francophones et vous donnons le prix dans votre devise locale, pas une moyenne mondiale.' },
  { q: 'Comment bien fixer le prix de ma voiture avant de la vendre ?', a: 'Utilisez notre outil gratuit d\u2019estimation par IA pour obtenir un chiffre, puis consultez les annonces actives localement pour des voitures similaires. Fixer un prix 5 à 10 % au-dessus du minimum que vous accepteriez laisse généralement une marge de négociation.' },
  { q: 'Quelle est la précision de l\u2019estimation par IA ?', a: 'Elle utilise la vision par ordinateur pour identifier précisément votre voiture à partir de la photo, puis la compare à de véritables données d\u2019annonces dans le pays choisi. Considérez-la comme un point de départ fiable, pas un prix final — la valeur réelle dépend de l\u2019inspection et de la négociation.' },
  { q: 'L\u2019outil d\u2019estimation de voiture est-il gratuit ?', a: 'Oui — sans coût, sans compte, et sans limite d\u2019utilisation.' },
];

export default function CombienVautMaVoiturePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Hero sombre ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/outils" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Retour">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Fil d'Ariane" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/accueil" className="hover:text-white/60 transition-colors">Accueil</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/outils" className="hover:text-white/60 transition-colors">Outils</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Combien Vaut Ma Voiture</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Par IA · Gratuit
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Combien vaut<br /><span className="text-amber-400">votre voiture ?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Téléchargez une photo — obtenez une estimation instantanée dans votre devise locale, basée sur de véritables données d’annonces et l’IA.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Analyse par photo</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>France · Belgique · Suisse · Canada · Côte d’Ivoire et plus</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Gratuit</span>
            </div>
          </div>
        </div>

        {/* ── Outil d'estimation ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <CombienVautMaVoitureClient />
          </div>
        </div>

        {/* ── Contenu SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Comprendre la valeur</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Qu’est-ce qui détermine le prix d’une voiture d’occasion ?
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
              Estimation de voitures d’occasion : le guide complet
            </h2>

            <p>Connaître la véritable valeur marchande de votre voiture est l’étape la plus importante avant de la mettre en vente, de la reprendre dans un échange, ou de négocier son achat — où que ce soit dans le monde. Un prix trop élevé laisse votre annonce sans acheteur. Un prix trop bas laisse de l’argent réel sur la table. Le défi est que <strong className="text-foreground">« la valeur marchande » n’est pas un chiffre unique</strong> — elle varie selon le pays, la devise, la demande locale pour une marque donnée, et l’historique et l’état propres à chaque voiture.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Pourquoi la même voiture ne vaut pas le même prix d’un pays à l’autre</h3>
            <p>Une Toyota Corolla de cinq ans en bon état peut valoir un montant très différent en France, en Belgique, en Suisse ou en Côte d’Ivoire — même avant conversion de devise. Les droits d’importation et les taxes locales sur les voitures d’occasion varient beaucoup d’un pays à l’autre. Certains marchés ont une forte demande locale pour certaines marques (les marques japonaises dans une grande partie de l’Afrique francophone, par exemple), ce qui maintient des prix de revente plus élevés. D’autres marchés ont un marché du neuf plus important qui détourne les acheteurs de l’occasion, ce qui réduit sa valeur de revente. C’est pourquoi un guide de prix unique et mondial ne fonctionne pas — l’estimation doit être calibrée par pays.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Kilométrage et historique d’entretien</h3>
            <p>Sur presque tous les marchés, le kilométrage et un historique d’entretien documenté sont des indicateurs plus fiables de l’état d’une voiture que ce qu’une photo peut montrer. Une voiture avec un kilométrage plus faible et un carnet d’entretien complet obtient généralement une prime de prix notable par rapport à une voiture comparable de la même année avec un kilométrage plus élevé, même si elles se ressemblent en photo. Un historique d’entretien incomplet ou manquant est l’un des moyens les plus rapides de perdre son pouvoir de négociation en tant que vendeur.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Propriété, immatriculation et documentation</h3>
            <p>Dans chaque pays que nous couvrons, <strong className="text-foreground">des papiers propres et complets sont non négociables pour obtenir la meilleure valeur</strong>. Les acheteurs, à juste titre, déduisent de la valeur des voitures dont les papiers sont incomplets, les droits d’importation impayés, ou l’immatriculation incomplète, car le risque de complications lors du transfert de propriété est réel dans n’importe quel pays. Régler les problèmes de documentation avant de publier une annonce coûte généralement bien moins cher que la décote que les acheteurs exigeront sinon.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">État général et présentation</h3>
            <p>Une carrosserie propre sans rayures, rouille ni peinture usée, avec un moteur et une transmission mécaniquement sains, ajoute constamment au prix par rapport à une voiture comparable montrant des signes d’usure visibles — que la voiture soit vendue à Paris, Bruxelles ou Abidjan. Des réparations simples et peu coûteuses (nettoyage complet, réparation de petites rayures, remplacement d’une ampoule grillée) se rentabilisent souvent plusieurs fois dans le prix de vente final.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Devise et timing du marché</h3>
            <p>Dans les pays fortement dépendants des voitures d’occasion importées, les prix des voitures sont étroitement liés aux mouvements du taux de change — une devise locale faible augmente le coût d’importation et fait monter les prix de l’occasion, tandis qu’une devise plus forte a l’effet inverse. Cela signifie qu’une estimation d’il y a un an ou deux peut ne plus être un guide fiable des prix actuels. Vérifiez toujours les données de marché actuelles plutôt que de vous fier à un ancien guide de prix ou au prix payé par un propriétaire précédent.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Comment fonctionne cet outil</h3>
            <p>Téléchargez une photo nette de votre voiture et choisissez votre pays. L’IA (Gemini Vision) identifie la marque, le modèle, l’année et la finition à partir de la photo, puis les compare à de véritables données d’annonces récentes dans le marché choisi pour vous donner une fourchette de prix dans votre devise locale — pas une simple estimation unique. Le résultat inclut les facteurs spécifiques qui ont influencé l’estimation, pour que vous compreniez pourquoi ce chiffre a été retenu. Conçu comme un point de départ rapide et gratuit pour négocier, pas comme un substitut à une inspection en personne.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Questions fréquentes</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Questions les plus fréquentes
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
              Plus d’outils gratuits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/outils/mecanicien-virtuel" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Mécanicien Virtuel IA</p>
                <ArrowRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/outils" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Tous les outils</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/accueil" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Accueil en Français</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
