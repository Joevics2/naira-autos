import Link from 'next/link';
import {
  Wrench, Calculator, CarFront, GitCompare, Fuel, BookOpen,
  Ship, Shield, FileText, Map, ClipboardCheck, Search,
  Camera, Newspaper, ChevronRight, Zap, TrendingUp,
} from 'lucide-react';

// ─── Tool definitions ────────────────────────────────────────────────────────

const FEATURED_TOOLS = [
  {
    href: '/evaluate-car',
    icon: Camera,
    label: 'Car Valuation',
    description: 'AI-powered market value in seconds',
    badge: 'FREE',
    badgeColor: 'bg-amber-400/20 text-amber-400',
    accent: 'emerald',
  },
  {
    href: '/tools/ai-mechanic',
    icon: Wrench,
    label: 'AI Mechanic',
    description: 'Diagnose any symptom with local cost estimates',
    badge: 'FREE',
    badgeColor: 'bg-emerald-500/20 text-emerald-400',
    accent: 'emerald',
  },
  {
    href: '/tools/import-duty-calculator',
    icon: Ship,
    label: 'Import Duty Calculator',
    description: 'Full landed cost for any imported vehicle',
    accent: 'sky',
  },
  {
    href: '/tools/best-car-for',
    icon: CarFront,
    label: 'Best Car For Me',
    description: 'Personalised recommendations by budget & use',
    accent: 'violet',
  },
];

const ALL_TOOLS = [
  { href: '/tools/auto-loan-calculator',        icon: Calculator,     label: 'Auto Loan Calculator' },
  { href: '/tools/car-comparison',              icon: GitCompare,     label: 'Compare Cars' },
  { href: '/tools/fuel-cost-calculator',        icon: Fuel,           label: 'Fuel Cost' },
  { href: '/tools/insurance-calculator',        icon: Shield,         label: 'Insurance' },
  { href: '/tools/registration-fee-calculator', icon: FileText,       label: 'Registration Fees' },
  { href: '/tools/road-trip-calculator',        icon: Map,            label: 'Road Trip' },
  { href: '/tools/vehicle-papers-checklist',    icon: ClipboardCheck, label: 'Papers Checklist' },
  { href: '/tools/vin-checker',                 icon: Search,         label: 'VIN Checker' },
];

const ACCENT_CLASSES: Record<string, { border: string; icon: string; glow: string }> = {
  emerald: {
    border: 'hover:border-emerald-500/50',
    icon: 'text-emerald-500',
    glow: 'group-hover:shadow-emerald-500/10',
  },
  sky: {
    border: 'hover:border-sky-500/50',
    icon: 'text-sky-500',
    glow: 'group-hover:shadow-sky-500/10',
  },
  violet: {
    border: 'hover:border-violet-500/50',
    icon: 'text-violet-500',
    glow: 'group-hover:shadow-violet-500/10',
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <main className="pb-24 bg-background">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-4 pt-10 pb-8 max-w-screen-xl mx-auto sm:px-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-4 w-4 text-emerald-500" />
          <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase">
            Nigeria's Car Intelligence Hub
          </span>
        </div>

        <h1
          className="font-black uppercase text-foreground leading-none mb-3"
          style={{
            fontFamily: "'Barlow Condensed', 'Impact', sans-serif",
            fontSize: 'clamp(32px, 7vw, 56px)',
          }}
        >
          Every tool you need<br />
          <span className="text-emerald-500">to own a car</span> in Nigeria
        </h1>

        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-6 leading-relaxed">
          Free calculators, AI diagnostics, duty costs, loan planners, and more —
          built for the Nigerian market.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            Browse all tools
            <ChevronRight className="h-4 w-4" />
          </Link>
          <Link
            href="/evaluate-car"
            className="inline-flex items-center gap-2 border border-border hover:border-emerald-500/50 text-foreground font-semibold text-sm px-5 py-2.5 rounded-full transition-colors"
          >
            <Camera className="h-4 w-4 text-emerald-500" />
            Value my car
          </Link>
        </div>
      </section>

      {/* ── Featured tools (2×2 cards) ────────────────────────────────────── */}
      <section className="px-4 pb-8 max-w-screen-xl mx-auto sm:px-6">
        <div className="flex items-end justify-between mb-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
            Most used
          </p>
          <Link
            href="/tools"
            className="text-xs font-semibold text-muted-foreground hover:text-emerald-500 transition-colors flex items-center gap-1"
          >
            All tools <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {FEATURED_TOOLS.map(({ href, icon: Icon, label, description, badge, badgeColor, accent }) => {
            const ac = ACCENT_CLASSES[accent] ?? ACCENT_CLASSES.emerald;
            return (
              <Link
                key={href}
                href={href}
                className={`group flex flex-col gap-3 p-4 rounded-2xl border border-border bg-card hover:shadow-lg ${ac.glow} ${ac.border} transition-all`}
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-xl bg-muted">
                    <Icon className={`h-5 w-5 ${ac.icon}`} />
                  </div>
                  {badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider ${badgeColor}`}>
                      {badge}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-tight">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── All other tools (pill row) ────────────────────────────────────── */}
      <section className="px-4 pb-8 max-w-screen-xl mx-auto sm:px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          More tools
        </p>
        <div className="flex flex-wrap gap-2">
          {ALL_TOOLS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all group"
            >
              <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-emerald-500 transition-colors flex-shrink-0" />
              <span className="text-sm font-semibold text-foreground whitespace-nowrap">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Resources strip (Prices · Glossary · Blog) ────────────────────── */}
      <section className="px-4 pb-8 max-w-screen-xl mx-auto sm:px-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
          Resources
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { href: '/vehicles',       icon: TrendingUp, label: 'Prices & Parts',  sub: 'Market prices by brand' },
            { href: '/tools/glossary', icon: BookOpen,   label: 'Glossary',        sub: 'Tokunbo, Grade A & more' },
            { href: '/blog',           icon: Newspaper,  label: 'Blog & Tips',     sub: 'Guides & advice' },
          ].map(({ href, icon: Icon, label, sub }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center text-center gap-2 p-3 rounded-2xl border border-border bg-card hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all"
            >
              <div className="p-2 rounded-xl bg-muted">
                <Icon className="h-4 w-4 text-emerald-500" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground leading-tight">{label}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

    </main>
  );
}
