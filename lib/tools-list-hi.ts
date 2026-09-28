import { Wrench } from 'lucide-react';

// Single source of truth for the Hindi tools index (/upkaran).
// Add an entry here ONLY when that tool's Hindi page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolHi = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_HI: ToolHi[] = [
  {
    href: '/upkaran/aabhasi-mekanik',
    icon: Wrench,
    label: 'AI मैकेनिक',
    description: 'खराबी बताएं, फोटो, आवाज़ या वीडियो अपलोड करें और कुछ ही सेकंड में निदान व मरम्मत लागत पाएं।',
    badge: 'मुफ़्त',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI और स्मार्ट टूल्स',
  },
];

export const CATEGORIES_HI = ['AI और स्मार्ट टूल्स', 'वित्त', 'लागत और रखरखाव', 'सत्यापन', 'संसाधन'];
