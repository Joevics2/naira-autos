import { Calculator } from 'lucide-react';

// Jedno źródło prawdy dla polskiego indeksu narzędzi (/narzedzia).
// Dodawaj wpis TYLKO wtedy, gdy polska strona narzędzia jest już opublikowana
// — nigdy nie wymieniaj nieprzetłumaczonego narzędzia (ta sama zasada co w innych językach).

export type ToolPl = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_PL: ToolPl[] = [
  {
    href: '/narzedzia/kalkulator-importu-samochodu-polska',
    icon: Calculator,
    label: 'Import Samochodu do Polski',
    description: 'Policz cło, akcyzę 3,1 % lub 18,6 %, VAT i PCC dla auta sprowadzonego do Polski. USA i Japonia po 0 %, hybrydy i elektryki.',
    badge: 'Nowe',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Finanse',
  },
];

export const CATEGORIES_PL = ['Finanse'];
