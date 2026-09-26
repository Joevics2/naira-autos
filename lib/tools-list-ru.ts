// Single source of truth for the Russian tools index (/instrumenty).
// Add an entry here ONLY when that tool's Russian page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolRu = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_RU: ToolRu[] = [];

export const CATEGORIES_RU = ['ИИ и умные инструменты', 'Финансы', 'Расходы и обслуживание', 'Проверка', 'Ресурсы'];
