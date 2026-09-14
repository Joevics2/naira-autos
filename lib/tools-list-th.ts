// Single source of truth for the Thai tools index (/khrueang-mue).
// Add an entry here ONLY when that tool's Thai page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolTh = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_TH: ToolTh[] = [];

export const CATEGORIES_TH = ['AI และเครื่องมืออัจฉริยะ', 'การเงิน', 'ค่าใช้จ่ายและการบำรุงรักษา', 'การตรวจสอบ', 'แหล่งข้อมูล'];
