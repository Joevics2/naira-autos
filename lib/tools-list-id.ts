// Single source of truth for the Indonesian tools index (/alat).
// Add an entry here ONLY when that tool's Indonesian page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolId = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_ID: ToolId[] = [];

export const CATEGORIES_ID = ['AI dan Alat Cerdas', 'Keuangan', 'Biaya dan Perawatan', 'Verifikasi', 'Sumber Daya'];
