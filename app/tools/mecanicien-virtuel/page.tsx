import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientFR from './client';

export const metadata: Metadata = {
  title: 'Mécanicien Virtuel IA — Diagnostic Auto Gratuit en Ligne | Naira Autos',
  description: 'Mécanicien virtuel gratuit alimenté par IA. Décrivez la panne de votre voiture, ou téléchargez une photo, un son du moteur ou une vidéo, et obtenez un diagnostic instantané avec estimation du coût de réparation. Sans inscription, pour la France et le Canada.',
  alternates: {
    canonical: 'https://www.naira.autos/tools/mecanicien-virtuel',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/tools/mecanico-virtual',
      'ar': 'https://www.naira.autos/tools/ai-mechanic-arabic',
      'fr': 'https://www.naira.autos/tools/mecanicien-virtuel',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — Mécanicien Virtuel Gratuit avec IA | Naira Autos',
    description: 'Diagnostic instantané de votre voiture en ligne, où que vous soyez. Téléchargez un son du moteur, une photo, ou décrivez la panne. Obtenez un niveau d\'urgence, les causes probables, des étapes à faire vous-même, et une estimation du coût de réparation. 100% gratuit, sans inscription.',
    url: 'https://www.naira.autos/tools/mecanicien-virtuel',
  },
  keywords: ['mécanicien virtuel', 'diagnostic auto en ligne', 'diagnostic voiture IA', 'panne voiture', 'mécanicien en ligne gratuit', 'coût de réparation voiture', 'diagnostic auto gratuit', 'mécanicien virtuel Canada', 'mécanicien virtuel Québec', 'mécanicien virtuel France'],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/mecanicien-virtuel',
      name: 'Mécanicien Virtuel IA — Diagnostic Auto Gratuit en Ligne',
      description: "Mécanicien virtuel gratuit alimenté par IA. Téléchargez un son du moteur, une photo, ou décrivez la panne. Obtenez un diagnostic instantané avec niveau d'urgence et estimation du coût de réparation.",
      url: 'https://www.naira.autos/tools/mecanicien-virtuel',
      inLanguage: 'fr',
      dateModified: '2026-09-06',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Outils', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Mécanicien IA', item: 'https://www.naira.autos/tools/mecanicien-virtuel' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: "Qu'est-ce que le mécanicien virtuel et comment ça marche ?",
          acceptedAnswer: { '@type': 'Answer', text: "Le mécanicien virtuel est un outil qui utilise l'intelligence artificielle pour diagnostiquer les pannes de votre voiture à distance. Vous décrivez le problème, téléchargez éventuellement une photo, un son du moteur ou une vidéo, et l'IA analyse le tout en le comparant à une immense base de pannes automobiles connues, pour vous donner un diagnostic avec un niveau d'urgence et une estimation du coût de réparation." },
        },
        {
          '@type': 'Question',
          name: 'Est-ce que ça fonctionne en France et au Canada ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui. L'outil fonctionne depuis n'importe quel pays francophone, et prend en compte les conditions de conduite propres à la France et au Canada — comme l'effet du sel de déneigement sur la corrosion des freins et de la carrosserie au Québec, ou les exigences du contrôle technique en France. L'estimation du coût est une référence internationale approximative en dollars, pas un prix local exact — les tarifs réels varient selon le pays." },
        },
        {
          '@type': 'Question',
          name: "L'IA peut-elle diagnostiquer ma voiture juste avec le son du moteur ?",
          acceptedAnswer: { '@type': 'Answer', text: "Oui. Enregistrez le bruit de cliquetis, de grincement ou de frottement — même 10 secondes suffisent avec votre téléphone. L'IA analyse le motif sonore et peut identifier s'il s'agit d'un problème de roulements, de plaquettes de frein, ou d'une autre panne précise." },
        },
        {
          '@type': 'Question',
          name: 'Ce service est-il gratuit ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui, entièrement gratuit — sans inscription, sans abonnement, sans aucun paiement. Ouvrez la page et commencez votre diagnostic immédiatement." },
        },
        {
          '@type': 'Question',
          name: "Le diagnostic de l'IA est-il toujours précis ?",
          acceptedAnswer: { '@type': 'Answer', text: "Non — pas toujours précis à 100 %. C'est un excellent point de départ basé sur la description, la photo, le son ou la vidéo que vous fournissez, mais il peut manquer des choses qui ne se détectent qu'avec une inspection physique sur pont élévateur avec un outil de diagnostic. Considérez-le comme un premier avis, pas une réponse définitive, et consultez toujours un professionnel qualifié en personne pour tout problème de freins, de direction ou de carburant." },
        },
        {
          '@type': 'Question',
          name: 'Fonctionne-t-il avec Toyota, Mercedes, BMW ou une autre marque ?',
          acceptedAnswer: { '@type': 'Answer', text: "Oui. Posez une question sur une panne Toyota, Mercedes, BMW, ou toute autre marque — l'IA couvre tous les grands constructeurs. L'estimation de coût reste une référence internationale approximative en dollars, pas un prix local." },
        },
        {
          '@type': 'Question',
          name: 'Mes conversations sont-elles enregistrées sur vos serveurs ?',
          acceptedAnswer: { '@type': 'Answer', text: "Non. L'historique complet de vos conversations est enregistré uniquement sur votre appareil, via le stockage local du navigateur. Nous ne conservons rien sur nos serveurs à part le message actif que vous envoyez pour le diagnostic. Vous pouvez supprimer votre historique à tout moment depuis le menu latéral." },
        },
        {
          '@type': 'Question',
          name: 'Dois-je créer un compte ou me connecter ?',
          acceptedAnswer: { '@type': 'Answer', text: "Non. Le mécanicien virtuel est entièrement gratuit et ne nécessite ni compte, ni connexion, ni aucune information personnelle. Les informations de votre véhicule sont enregistrées localement sur votre appareil, uniquement pour votre confort." },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Mécanicien Virtuel IA',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: "Mécanicien virtuel gratuit alimenté par IA. Décrivez la panne, téléchargez un son du moteur ou une photo, et obtenez un diagnostic instantané avec estimation du coût de réparation — adapté aussi aux conditions de conduite en France et au Canada.",
      url: 'https://www.naira.autos/tools/mecanicien-virtuel',
      inLanguage: 'fr',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
};

export default function AIMechanicPageFR() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientFR />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Dernière mise à jour : septembre 2026</p>

          {/* Coverage */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Couverture complète</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Que propose le mécanicien virtuel ?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Que vous cherchiez une estimation rapide de coût de réparation, que vous vouliez poser une question à un mécanicien en ligne avant d'aller au garage, ou que vous vouliez simplement savoir combien coûtera la réparation — cet outil couvre tout ça, gratuitement.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Diagnostic des pannes moteur', desc: "Cliquetis, ratés d'allumage, ralenti irrégulier, surchauffe, voyant moteur allumé — l'IA identifie les causes les plus probables, classées par probabilité." },
                { title: 'Analyse du son', desc: "Téléchargez un enregistrement du bruit de cliquetis, de grincement ou de frottement. L'IA analyse le motif sonore pour identifier la panne." },
                { title: "Niveau d'urgence instantané", desc: "Chaque diagnostic inclut un verdict clair en quatre niveaux : sûr de conduire, à surveiller de près, voir un mécanicien bientôt, ou arrêter de conduire immédiatement." },
                { title: 'Estimation du coût de réparation', desc: "L'estimation est une référence internationale approximative en dollars — le coût réel des pièces et de la main-d'œuvre varie selon le pays et la ville. Utilisez-la comme point de départ, puis demandez un devis local." },
                { title: 'Étapes à faire vous-même', desc: "Quand la panne est quelque chose que vous pouvez vérifier ou réparer vous-même, on vous dit exactement comment — avant de payer un mécanicien." },
                { title: 'Conversation de suivi', desc: 'Posez des questions de suivi et obtenez des réponses basées sur le contexte complet. Chaque session est enregistrée sur votre appareil.' },
                { title: 'Compatible avec toutes les marques', desc: 'Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Peugeot, et tout autre marché ou marque.' },
                { title: 'Diagnostic par photo et vidéo', desc: "Envoyez une photo d'un voyant allumé sur le tableau de bord, d'une fuite inhabituelle, ou de dommages visibles. Chaque média supplémentaire améliore nettement la précision du diagnostic." },
                { title: 'Identification des pièces nécessaires', desc: "Chaque diagnostic inclut les pièces précises les plus susceptibles d'être en cause, pour savoir exactement quoi demander à un garage ou un magasin de pièces." },
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
                Qu'est-ce que le mécanicien virtuel avec IA ?
              </h2>
              <p className="mb-3"><strong className="text-foreground">Le mécanicien virtuel</strong> est exactement ce que son nom indique : un mécanicien avec qui vous discutez par texte, photo, son ou vidéo au lieu de vous déplacer en personne. Vous décrivez ce qui se passe avec votre voiture — ce bruit étrange au démarrage à froid, ce voyant moteur qui ne s'éteint pas, ces freins qui semblent mous — et en quelques secondes, il vous répond en s'appuyant sur une connaissance approfondie des vraies pannes automobiles.</p>
              <p>Axion, <strong className="text-foreground">notre mécanicien avec IA</strong>, fonctionne avec toutes les marques et dans tous les pays, mais il est aussi conçu pour connaître les spécificités de la conduite en France et au Canada : comment le sel de déneigement accélère la corrosion des freins et de la carrosserie pendant l'hiver québécois, comment le froid extrême affecte la batterie et les moteurs diesel, et les exigences du contrôle technique en France.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Comment obtenir un diagnostic pour votre voiture en moins d'une minute
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Décrivez la panne.</strong> Écrivez ce qui se passe — plus il y a de détails, mieux c'est. Quand le problème a-t-il commencé ? Se produit-il seulement à froid, à l'accélération, ou en tournant le volant ?</p>
                <p><strong className="text-foreground">2. Téléchargez une photo, un son ou une vidéo (facultatif, mais ça aide beaucoup).</strong> Un enregistrement de dix secondes du bruit du moteur est souvent plus utile qu'un paragraphe entier de description.</p>
                <p><strong className="text-foreground">3. Obtenez votre diagnostic instantanément.</strong> Le niveau d'urgence, les causes probables classées par probabilité, ce que vous pouvez vérifier vous-même, et une estimation du coût de réparation.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Estimation du coût de réparation : évitez de vous faire arnaquer au garage
              </h2>
              <p className="mb-3">L'une des façons les plus courantes dont les clients se font arnaquer au garage, c'est d'y aller sans connaître à l'avance le coût attendu de la réparation. Avant de vous rendre dans un garage, utilisez notre <strong className="text-foreground">estimation du coût de réparation</strong> pour savoir ce qui est un prix juste — pièces et main-d'œuvre, clairement détaillées.</p>
              <p>L'estimation tient compte de votre voiture précise — marque, modèle et année — et de la panne la plus probable selon votre description. Ce n'est pas un chiffre générique : une Camry 2010 avec 180 000 km affichant une baisse de pression d'huile reçoit une estimation différente d'une Camry 2020 avec 40 000 km et le même voyant allumé, car la cause probable est différente.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Fonctionne avec toutes les marques : Toyota, BMW, Mercedes, Honda et plus
              </h2>
              <p className="mb-3">Peu importe ce que vous conduisez. L'IA connaît les schémas de pannes spécifiques à chaque constructeur — Toyota, Honda, BMW, Mercedes, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen, et pratiquement toutes les autres marques présentes sur les routes aujourd'hui. Indiquez la marque, le modèle et l'année une seule fois, et le diagnostic s'adapte aux pannes connues de cette voiture précise, à ce kilométrage, plutôt que de vous donner une réponse générique qui s'appliquerait à n'importe quelle voiture.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Pourquoi le diagnostic par son du moteur change tout
              </h2>
              <p className="mb-3">Un mécanicien expérimenté peut souvent identifier une panne rien qu'au son, avant même d'ouvrir le capot. Notre IA fait la même chose : téléchargez un enregistrement du son — cliquetis, grincement, frottement — et le système analyse le motif sonore par rapport à des milliers de pannes connues. Un enregistrement de dix secondes depuis votre téléphone suffit souvent à faire la différence entre un problème sérieux et quelque chose qui peut attendre.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Exemple : texte seul contre texte avec son
              </h2>
              <p>La Honda Accord de Marc a commencé à faire un léger cliquetis au démarrage à froid. En décrivant seulement par texte ("bruit de cliquetis en démarrant le matin"), l'IA a renvoyé une large liste — niveau d'huile bas, bruit de poussoirs de soupapes, ou bouclier thermique mal fixé — avec environ 60 % de confiance. Il a ensuite enregistré 12 secondes de son avec son téléphone et les a téléchargées. Avec le son, le diagnostic s'est précisé : bruit de poussoirs hydrauliques dû à une vidange en retard, avec plus de 85 % de confiance, une fourchette de coût précise, et la confirmation qu'il était sûr de continuer à conduire un court moment en attendant de prendre rendez-vous pour la vidange.</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-4">Précision du diagnostic selon le type d'entrée</h3>
              <div className="space-y-3">
                {[
                  { label: 'Description texte seule', pct: 60, color: 'bg-orange-500' },
                  { label: '+ Photo jointe', pct: 75, color: 'bg-amber-500' },
                  { label: '+ Enregistrement audio', pct: 85, color: 'bg-emerald-500' },
                  { label: '+ Vidéo', pct: 90, color: 'bg-emerald-600' },
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
              <h3 className="font-bold text-foreground text-sm mb-3">Véhicules pris en charge</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Camions', 'Bus', 'Motos'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Points clés</h3>
              <ul className="space-y-2.5">
                {[
                  '100 % gratuit — sans abonnement',
                  'Aucun compte ni inscription requis',
                  'Fonctionne sur mobile et ordinateur',
                  'Estimation de coût de référence internationale',
                  'Disponible 24h/24, même le dimanche',
                  "Historique de conversation enregistré localement",
                  'Questions de suivi illimitées',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Aussi sur Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Évaluation gratuite de voiture', href: '/evaluate-car' },
                  { label: 'Analyseur de son moteur', href: '/tools/engine-sound-analyzer' },
                  { label: "Calculateur de droits d'importation", href: '/tools/import-duty-calculator' },
                  { label: 'Liste de documents véhicule', href: '/tools/vehicle-papers-checklist' },
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

          {/* France & Quebec intelligence */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Intelligence supplémentaire</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Aussi conçu pour la conduite en France et au Canada
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Le diagnostic fonctionne aussi bien où que vous conduisiez. Mais la plupart des outils de mécanicien virtuel sont entraînés uniquement sur des données de garages nord-américains ou britanniques — ils ne savent pas que le sel de déneigement utilisé chaque hiver au Québec accélère considérablement la corrosion des lignes de frein et de la carrosserie, ou que le contrôle technique français impose des critères précis sur l'état des pneus et des plaquettes.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion connaît aussi ces spécificités. Demandez-lui à propos d'un bruit de cliquetis sur une Toyota Corolla après un plein, et si vous êtes en France ou au Canada, il prendra en compte la qualité du carburant, le froid, ou le sel comme causes probables en priorité — car ce sont statistiquement les plus fréquentes dans ces marchés.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Sel de déneigement (Québec)', desc: 'Prend en compte la corrosion accélérée des freins, des lignes de frein et de la carrosserie causée par le sel utilisé chaque hiver.' },
                  { title: 'Froid extrême', desc: "Prend en compte l'effet du froid intense sur la batterie, le démarrage à froid et les moteurs diesel en hiver québécois." },
                  { title: 'Contrôle technique (France)', desc: 'Prend en compte les critères du contrôle technique français sur les pneus, les plaquettes et les points de sécurité.' },
                  { title: 'Prix des pièces localement', desc: 'Les estimations sont calculées comme référence internationale, en tenant compte des écarts de prix entre marchés locaux.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Comparaison</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Mécanicien virtuel contre les autres options
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Fonctionnalité</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Mécanicien IA</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Visite au garage</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Forum/groupe auto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Disponible 24h/24', 'Oui', 'Non', 'Parfois'],
                    ['Gratuit', 'Oui', 'Non', 'Oui'],
                    ['Aucun déplacement', 'Oui', 'Non', 'Oui'],
                    ['Estimation de coût', 'Oui', 'Variable', 'Non'],
                    ['Analyse son et vidéo', 'Oui', 'Oui', 'Non'],
                    ['Réponse immédiate', 'Oui', 'Non', 'Parfois'],
                    ['Qualité constante', 'Oui', 'Variable', 'Non'],
                    ['Historique enregistré', 'Oui', 'Non', 'Non'],
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
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Questions fréquentes</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: "Qu'est-ce que le mécanicien virtuel et comment ça marche ?", a: "Un outil qui utilise l'IA pour diagnostiquer les pannes de votre voiture à distance. Vous décrivez le problème, téléchargez des médias facultatifs, et l'IA analyse le tout par rapport à une immense base de pannes connues — avec une estimation de coût de référence internationale." },
                { q: 'Est-ce que ça fonctionne en France et au Canada ?', a: "Oui. L'outil prend en compte les conditions de conduite en France et au Canada — sel de déneigement, froid extrême, contrôle technique français. L'estimation de coût reste une référence internationale approximative, pas un prix local exact." },
                { q: "Le diagnostic de l'IA est-il toujours précis ?", a: "Non — pas toujours précis à 100 %. Un bon point de départ, mais il peut manquer des choses qu'une inspection physique sur pont élévateur détecterait. Considérez-le comme un premier avis, et consultez toujours un mécanicien en personne pour les freins, la direction ou le carburant." },
                { q: 'Fonctionne-t-il avec Toyota, Mercedes, BMW ou une autre marque ?', a: "Oui. Posez une question sur n'importe quelle marque — l'IA couvre tous les grands constructeurs. L'estimation de coût est une référence internationale approximative en dollars, pas un prix local." },
                { q: "Peut-il diagnostiquer ma voiture juste avec le son du moteur ?", a: "Oui. Le son est l'une de nos entrées les plus puissantes. Téléchargez un enregistrement de cliquetis, de grincement ou de frottement — même 10 secondes depuis votre téléphone. L'IA analyse le motif sonore pour identifier la panne probable." },
                { q: 'Dois-je créer un compte ou me connecter ?', a: "Non. Le mécanicien virtuel est entièrement gratuit et ne nécessite ni compte, ni inscription, ni information personnelle. Les données de votre véhicule sont enregistrées localement sur votre appareil." },
                { q: 'Mes conversations sont-elles enregistrées sur vos serveurs ?', a: "Non. L'historique complet est enregistré uniquement sur votre appareil via le stockage local du navigateur. Nous ne conservons rien sur nos serveurs à part le message actif." },
                { q: 'Quelle est la précision de l\'estimation du coût de réparation ?', a: "Elle sert de référence internationale approximative, en tenant compte des écarts de prix entre pays pour les pièces et la main-d'œuvre. Nous donnons une fourchette (du minimum au maximum) pour savoir ce qui est raisonnable. Si un garage vous propose un prix bien au-dessus du maximum, ça vaut la peine de vérifier." },
                { q: "Puis-je obtenir une estimation de coût pour n'importe quelle marque de voiture ?", a: "Oui. Nous couvrons Toyota, Honda, Mercedes, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Peugeot, et toute autre grande marque, où que vous conduisiez. Les estimations restent une référence internationale approximative." },
                { q: "Que faire si j'ai besoin d'un mécanicien mobile ou d'un garage près de chez moi ?", a: "Notre outil diagnostique d'abord le problème pour que vous sachiez exactement quoi demander avant de commencer vos recherches. Si la panne nécessite une inspection physique ou un équipement spécialisé, nous vous le disons clairement — et précisons quel type de mécanicien ou de garage chercher." },
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
            Vérifié par <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, mécanicien automobile. La logique de diagnostic et les fourchettes de coût de réparation ont été vérifiées pour leur exactitude technique.
          </p>

          {/* Final CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Prêt ? Diagnostiquez votre voiture maintenant.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Gratuit. Instantané. Sans inscription. Obtenez votre diagnostic maintenant.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Commencer mon diagnostic gratuit
            </a>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Autres outils gratuits
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Vérificateur de VIN',            color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Liste de documents véhicule',    color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: "Calculateur de droits d'importation", color: 'emerald' },
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
