'use client';

import Link from 'next/link';
import {
  Wrench, Calculator, CarFront, GitCompare, Fuel, BookOpen,
  Ship, Shield, FileText, Map, ClipboardCheck, Search,
  Camera, Newspaper, LayoutGrid,
} from 'lucide-react';

const TOOLS = [
  { href: '/evaluate-car',                      icon: Camera,         label: 'Car Valuation',        badge: 'FREE', badgeColor: 'bg-amber-400/20 text-amber-400' },
  { href: '/tools/ai-mechanic',                 icon: Wrench,         label: 'AI Mechanic',           badge: 'FREE', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
  { href: '/tools/import-duty-calculator',      icon: Ship,           label: 'Import Duty Calculator' },
  { href: '/tools/auto-loan-calculator',        icon: Calculator,     label: 'Auto Loan Calculator' },
  { href: '/tools/best-car-for',                icon: CarFront,       label: 'Best Car For Me' },
  { href: '/tools/car-comparison',              icon: GitCompare,     label: 'Compare Cars' },
  { href: '/tools/fuel-cost-calculator',        icon: Fuel,           label: 'Fuel Cost Calculator' },
  { href: '/tools/insurance-calculator',        icon: Shield,         label: 'Insurance Calculator' },
  { href: '/tools/registration-fee-calculator', icon: FileText,       label: 'Registration Fees' },
  { href: '/tools/road-trip-calculator',        icon: Map,            label: 'Road Trip Calculator' },
  { href: '/tools/vehicle-papers-checklist',    icon: ClipboardCheck, label: 'Papers Checklist' },
  { href: '/tools/vin-checker',                 icon: Search,         label: 'VIN Checker' },
  { href: '/tools/glossary',                    icon: BookOpen,       label: 'Car Glossary' },
  { href: '/blog',                              icon: Newspaper,      label: 'Blog & Tips' },
];

export function ToolsSection() {
  return (
    <section id="tools-section" className="py-10 bg-background scroll-mt-16">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">
              Free Tools
            </p>
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              TOOLS & RESOURCES
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold tracking-wide uppercase transition-colors"
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            View all
          </Link>
        </div>

        {/* Pill buttons — wrapping flex row */}
        <div className="flex flex-wrap gap-2.5">
          {TOOLS.map(({ href, icon: Icon, label, badge, badgeColor }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-card hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:shadow-sm transition-all group"
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{label}</span>
              {badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}