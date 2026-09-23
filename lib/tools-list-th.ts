import { Camera } from 'lucide-react';

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

export const TOOLS_TH: ToolTh[] = [
  {
    href: '/khrueang-mue/rot-khong-chan-rakha-thaorai',
    icon: Camera,
    label: 'รถของฉันราคาเท่าไหร่?',
    description: 'อัปโหลดภาพเดียว ให้ AI ประเมินมูลค่าตลาดเป็นสกุลเงินของคุณภายในไม่กี่วินาที',
    badge: 'ฟรี',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI และเครื่องมืออัจฉริยะ',
  },
];

export const CATEGORIES_TH = ['AI และเครื่องมืออัจฉริยะ', 'การเงิน', 'ค่าใช้จ่ายและการบำรุงรักษา', 'การตรวจสอบ', 'แหล่งข้อมูล'];
