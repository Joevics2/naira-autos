// Single source of truth for the Vietnamese tools index (/cong-cu).
// Add an entry here ONLY when that tool's Vietnamese page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolVi = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_VI: ToolVi[] = [];

export const CATEGORIES_VI = ['AI và Công Cụ Thông Minh', 'Tài Chính', 'Chi Phí và Bảo Dưỡng', 'Xác Minh', 'Tài Nguyên'];
