import { Route } from 'lucide-react';

// Single source of truth for the Dutch tools index (/gereedschappen).
// Add an entry here ONLY when that tool's Dutch page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolNl = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_NL: ToolNl[] = [
  {
    href: '/gereedschappen/afstandscalculator-nederland',
    icon: Route,
    label: 'Afstandscalculator Nederland',
    description: 'Bereken de reisafstand en rijtijd tussen 32 Nederlandse steden, met brandstofkosten-calculator.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Kosten en Onderhoud',
  },
];

export const CATEGORIES_NL = ['AI en Slimme Tools', 'Financiën', 'Kosten en Onderhoud', 'Verificatie', 'Bronnen'];
