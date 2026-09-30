import { Mic, Wrench, Camera, ScanLine, Car } from 'lucide-react';

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
    href: '/ferramentas/analisador-de-barulho-do-motor',
    icon: Mic,
    label: 'Analisador de Barulho do Motor',
    description: 'Grave ou envie o barulho do motor do seu carro e receba na hora um diagnóstico com IA da causa provável.',
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
  {
    href: '/ferramentas/decodificador-de-chassi',
    icon: ScanLine,
    label: 'Decodificador de Chassi',
    description: 'Consulte grátis o chassi (VIN) de qualquer carro — marca, modelo, ano, motor e país de origem na hora.',
    badge: 'Grátis',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Verificação',
  },
  {
    href: '/ferramentas/melhor-carro-para-voce',
    icon: Car,
    label: "Melhor Carro Para Você",
    description: "Escolha o tipo de uso — família, trabalho, estrada, orçamento apertado, fora de estrada ou executivo — e receba recomendações com preços locais em 55 países.",
    badge: "Novo",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "Custos e Manutenção",
  },
];

export const CATEGORIES_PT = ['IA e Ferramentas Inteligentes', 'Financeiro', 'Custos e Manutenção', 'Verificação', 'Recursos'];
