import { Wrench, Gauge, ScanLine, Search, Camera, FileText, Cog } from 'lucide-react';

// Single source of truth for the Spanish tools index (/herramientas).
// Add an entry here ONLY when that tool's Spanish page is actually live —
// never list an untranslated tool, even as a "coming soon" placeholder
// (thin-content risk, same rule as the English tools list).

export type ToolEs = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_ES: ToolEs[] = [
  {
    href: '/tools/generador-de-documentos-ia',
    icon: FileText,
    label: 'Generador de Documentos con IA',
    description: 'Genera un contrato de compraventa u otro documento vehicular — con los requisitos legales de tu país investigados por IA.',
    badge: 'NUEVO',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'IA y Herramientas Inteligentes',
  },
  {
    href: '/cuanto-vale-mi-auto',
    icon: Camera,
    label: '¿Cuánto Vale Mi Auto?',
    description: 'Sube una foto y recibe una tasación de mercado instantánea con IA, en tu propia moneda — México, España, Argentina y más.',
    badge: 'GRATIS',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA y Herramientas Inteligentes',
  },
  {
    href: '/tools/mecanico-virtual',
    icon: Wrench,
    label: 'Mecánico Virtual con IA',
    description: 'Describe el problema o sube una foto y recibe un diagnóstico instantáneo con estimado de costo de reparación.',
    badge: 'GRATIS',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'IA y Herramientas Inteligentes',
  },
  {
    href: '/tools/calculadora-de-costo-de-combustible-global',
    icon: Gauge,
    label: 'Calculadora de Costo de Combustible',
    description: 'Calcula el gasto de gasolina o diésel de cualquier auto en tu propia moneda — España, México, Argentina, Colombia, Chile y otros 48 países más.',
    badge: 'NUEVO',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Costos y Mantenimiento',
  },
  {
    href: '/tools/calculadora-de-kilometraje',
    icon: Gauge,
    label: 'Calculadora de Kilometraje',
    description: 'Convierte cualquier lectura del odómetro en comparaciones reales — distancia entre ciudades, vueltas a la Tierra, y más.',
    badge: 'GRATIS',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Costos y Mantenimiento',
  },
  {
    href: '/tools/decodificador-de-vin',
    icon: ScanLine,
    label: 'Decodificador de VIN',
    description: 'Consulta gratis el VIN, NIV o número de chasis de cualquier auto — marca, modelo, año, motor y país de origen.',
    badge: 'GRATIS',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Debida Diligencia',
  },
  {
    href: '/tools/verificar-numero-de-chasis',
    icon: Search,
    label: 'Verificar Número de Chasis',
    description: 'Consulta gratis el número de chasis o bastidor de cualquier auto — marca, modelo, año, motor y origen al instante.',
    badge: 'GRATIS',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Debida Diligencia',
  },
  {
    href: '/tools/verificar-numero-de-motor',
    icon: Cog,
    label: 'Verificar Número de Motor',
    description: 'Analiza gratis el número o código de motor de cualquier vehículo — marca, cilindrada, configuración y aplicaciones comunes al instante.',
    badge: 'NUEVO',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Debida Diligencia',
  },
];

export const CATEGORIES_ES = ['IA y Herramientas Inteligentes', 'Finanzas', 'Costos y Mantenimiento', 'Debida Diligencia', 'Recursos'];
