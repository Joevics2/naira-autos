import { Wrench, Car, Ruler } from 'lucide-react';

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
  {
    href: "/dogu/naege-gajang-joeun-cha",
    icon: Car,
    label: "나에게 가장 좋은 차",
    description: "용도(가족용, 영업용, 고속도로, 저예산, 험로, 비즈니스)를 선택하면 55개국의 현지 가격과 함께 추천을 보여 줍니다.",
    badge: "신규",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "비용 및 유지보수",
  },
  {
    href: '/dogu/dosi-gan-geori-gyesangi',
    icon: Ruler,
    label: "도시 간 거리 계산기",
    description: "대한민국 23개 도시 간 도로 거리와 운전 시간을 계산하세요. 연료비 계산기 포함.",
    badge: "신규",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "비용 및 유지보수",
  },
];

export const CATEGORIES_KO = ['AI 및 스마트 도구', '금융', '비용 및 유지보수', '검증', '자료'];
