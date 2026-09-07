import { Wrench } from 'lucide-react';

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
    href: '/tools/mecanicien-virtuel',
    icon: Wrench,
    label: 'Mécanicien Virtuel IA',
    description: 'Décrivez la panne ou téléchargez une photo ou un son, et obtenez un diagnostic instantané avec estimation du coût de réparation.',
    badge: 'Gratuit',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA et Outils Intelligents',
  },
];

export const CATEGORIES_FR = ['IA et Outils Intelligents', 'Finances', 'Coûts et Entretien', 'Vérification', 'Ressources'];
