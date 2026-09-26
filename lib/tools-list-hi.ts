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

export const TOOLS_HI: ToolHi[] = [];

export const CATEGORIES_HI = ['AI और स्मार्ट टूल्स', 'वित्त', 'लागत और रखरखाव', 'सत्यापन', 'संसाधन'];
