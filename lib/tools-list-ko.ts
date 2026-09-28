import { Wrench } from 'lucide-react';

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

export const TOOLS_KO: ToolKo[] = [
  {
    href: '/dogu/gasang-jeongbisa',
    icon: Wrench,
    label: 'AI 정비사',
    description: '고장 증상을 설명하고 사진, 소리, 영상을 업로드하면 몇 초 안에 진단과 수리 비용을 받아보세요.',
    badge: '무료',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI 및 스마트 도구',
  },
];

export const CATEGORIES_KO = ['AI 및 스마트 도구', '금융', '비용 및 유지보수', '검증', '자료'];
