import { Wrench, Camera, ScanLine, Ruler } from 'lucide-react';

// Single source of truth for the French tools index (/outils).
// Add an entry here ONLY when that tool's French page is actually live —
// never list an untranslated tool, even as a "coming soon" placeholder
// (same rule as tools-list-es.ts and tools-list-ar.ts).

export type ToolFr = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_FR: ToolFr[] = [
  {
    href: '/outils/combien-vaut-ma-voiture',
    icon: Camera,
    label: 'Combien Vaut Ma Voiture ?',
    description: 'Téléchargez une photo et obtenez une estimation instantanée de sa valeur par IA, dans votre devise locale — France, Belgique, Suisse, Canada, Côte d\u2019Ivoire et plus.',
    badge: 'Gratuit',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA et Outils Intelligents',
  },
  {
    href: '/outils/mecanicien-virtuel',
    icon: Wrench,
    label: 'Mécanicien Virtuel IA',
    description: 'Décrivez la panne ou téléchargez une photo ou un son, et obtenez un diagnostic instantané avec estimation du coût de réparation.',
    badge: 'Gratuit',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA et Outils Intelligents',
  },
  {
    href: '/outils/decodeur-vin',
    icon: ScanLine,
    label: 'Décodeur VIN',
    description: "Vérifiez gratuitement le VIN, NIV ou numéro de châssis de toute voiture — marque, modèle, année, moteur et pays d'origine.",
    badge: 'Gratuit',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Vérification',
  },
  {
    href: '/outils/calculateur-de-distance-france',
    icon: Ruler,
    label: 'Calculateur de Distance — France',
    description: 'Calculez la distance routière et le temps de trajet entre 34 villes françaises, avec estimateur de coût de carburant.',
    badge: 'Nouveau',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Coûts et Entretien',
  },
];

export const CATEGORIES_FR = ['IA et Outils Intelligents', 'Finances', 'Coûts et Entretien', 'Vérification', 'Ressources'];
