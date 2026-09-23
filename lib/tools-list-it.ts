import { Wrench, Camera, ScanLine } from 'lucide-react';

// Single source of truth for the Italian tools index (/strumenti).
// Add an entry here ONLY when that tool's Italian page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolIt = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_IT: ToolIt[] = [
  {
    href: '/strumenti/quanto-vale-la-mia-auto',
    icon: Camera,
    label: 'Quanto Vale la Mia Auto?',
    description: 'Carica una foto e ricevi subito una valutazione con IA nella tua valuta locale.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA e Strumenti Intelligenti',
  },
  {
    href: '/strumenti/meccanico-virtuale',
    icon: Wrench,
    label: 'Meccanico Virtuale IA',
    description: 'Descrivi il guasto o carica una foto o un audio, e ricevi una diagnosi istantanea con stima del costo di riparazione.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA e Strumenti Intelligenti',
  },
  {
    href: '/strumenti/verifica-numero-di-telaio',
    icon: ScanLine,
    label: 'Verifica Numero di Telaio (VIN)',
    description: 'Verifica gratis il numero di telaio (VIN) di qualsiasi auto — marca, modello, anno, motore e Paese di origine.',
    badge: 'Gratis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Verifica',
  },
];

export const CATEGORIES_IT = ['IA e Strumenti Intelligenti', 'Finanza', 'Costi e Manutenzione', 'Verifica', 'Risorse'];
