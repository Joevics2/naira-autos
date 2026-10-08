import { Wrench, Ruler, Camera } from 'lucide-react';

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

export const TOOLS_RU: ToolRu[] = [
  {
    href: '/instrumenty/skolko-stoit-moya-mashina',
    icon: Camera,
    label: 'Сколько стоит моя машина?',
    description: 'Загрузите одно фото, и AI за несколько секунд оценит рыночную стоимость вашего автомобиля.',
    badge: 'Бесплатно',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'ИИ и умные инструменты',
  },
  {
    href: '/instrumenty/virtualnyy-mekhanik',
    icon: Wrench,
    label: 'ИИ-механик',
    description: 'Опишите неисправность, загрузите фото, звук или видео и получите диагноз и стоимость ремонта за секунды.',
    badge: 'Бесплатно',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'ИИ и умные инструменты',
  },
  {
    href: '/instrumenty/kalkulyator-rasstoyaniy-mezhdu-gorodami',
    icon: Ruler,
    label: "Калькулятор расстояний между городами",
    description: "Расстояние по дорогам и время в пути между 32 городами России, с калькулятором расхода топлива.",
    badge: "Новое",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "Расходы и обслуживание",
  },
];

export const CATEGORIES_RU = ['ИИ и умные инструменты', 'Финансы', 'Расходы и обслуживание', 'Проверка', 'Ресурсы'];
