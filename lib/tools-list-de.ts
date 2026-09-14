import { Wrench, Camera, Ruler, ScanLine } from 'lucide-react';

// Single source of truth for the German tools index (/werkzeuge).
// Add an entry here ONLY when that tool's German page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolDe = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_DE: ToolDe[] = [
  {
    href: '/werkzeuge/was-ist-mein-auto-wert',
    icon: Camera,
    label: 'Was ist mein Auto wert?',
    description: 'Laden Sie ein Foto hoch und erhalten Sie sofort eine KI-Bewertung in Ihrer lokalen Währung — Deutschland, Österreich und die Schweiz.',
    badge: 'Kostenlos',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'KI und intelligente Werkzeuge',
  },
  {
    href: '/werkzeuge/virtueller-mechaniker',
    icon: Wrench,
    label: 'Virtueller KI-Mechaniker',
    description: 'Beschreiben Sie das Problem oder laden Sie ein Foto oder einen Ton hoch, und erhalten Sie sofort eine Diagnose mit geschätzten Reparaturkosten.',
    badge: 'Kostenlos',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'KI und intelligente Werkzeuge',
  },
  {
    href: '/werkzeuge/entfernungsrechner-deutschland',
    icon: Ruler,
    label: 'Entfernungsrechner — Deutschland',
    description: 'Berechnen Sie die Straßenentfernung und Fahrzeit zwischen 40 deutschen Städten, mit Kraftstoffkosten-Rechner.',
    badge: 'Neu',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Kosten und Wartung',
  },
  {
    href: '/werkzeuge/fahrgestellnummer-pruefen',
    icon: ScanLine,
    label: 'Fahrgestellnummer prüfen',
    description: 'Fahrgestellnummer (VIN/FIN) kostenlos prüfen — Marke, Modell, Baujahr, Motor und Herstellungsland sofort.',
    badge: 'Kostenlos',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Überprüfung',
  },
];

export const CATEGORIES_DE = ['KI und intelligente Werkzeuge', 'Finanzen', 'Kosten und Wartung', 'Überprüfung', 'Ressourcen'];
