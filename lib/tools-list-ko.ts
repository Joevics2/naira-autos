// Single source of truth for the Korean tools index (/dogu).
// Add an entry here ONLY when that tool's Korean page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolKo = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_KO: ToolKo[] = [];

export const CATEGORIES_KO = ['AI 및 스마트 도구', '금융', '비용 및 유지보수', '검증', '자료'];
