import { Wrench, Camera } from 'lucide-react';

// Single source of truth for the Portuguese tools index (/ferramentas).
// Add an entry here ONLY when that tool's Portuguese page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolPt = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_PT: ToolPt[] = [
  {
    href: '/ferramentas/quanto-vale-meu-carro',
    icon: Camera,
    label: 'Quanto Vale Meu Carro?',
    description: 'Envie uma foto e receba uma avaliação instantânea com IA, na sua moeda local — Brasil, Portugal, Angola, Moçambique e mais.',
    badge: 'Grátis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA e Ferramentas Inteligentes',
  },
  {
    href: '/ferramentas/meu-mecanico-virtual',
    icon: Wrench,
    label: 'Meu Mecânico Virtual com IA',
    description: 'Descreva o problema ou envie uma foto ou som, e receba um diagnóstico instantâneo com estimativa de custo do reparo.',
    badge: 'Grátis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA e Ferramentas Inteligentes',
  },
];

export const CATEGORIES_PT = ['IA e Ferramentas Inteligentes', 'Financeiro', 'Custos e Manutenção', 'Verificação', 'Recursos'];
