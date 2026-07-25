import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench, Calculator, CarFront, GitCompare, Fuel, BookOpen,
  Ship, Shield, FileText, Map, ClipboardCheck, Search, Camera, Newspaper, ArrowRight, Sparkles, Car, Truck, Bike, ScanLine, Droplets, Lightbulb, ArrowLeftRight, Percent, IdCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Automotive Tools | Naira Autos',
  description: 'Free automotive tools and guides — import duty calculator, AI mechanic, auto loan calculator, VIN checker, fuel cost estimator, and more.',
};

type Tool = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

const TOOLS: Tool[] = [
  // AI / Smart
  {
    href: '/evaluate-used-car',
    icon: Camera,
    label: 'AI Car Valuation (Photo)',
    description: 'Upload a photo and get an AI-powered estimate of your car\'s current market value in seconds.',
    badge: 'FREE',
    badgeColor: 'bg-amber-400/15 text-amber-400 border border-amber-400/30',
    category: 'AI & Smart',
  },
  {
    href: '/evaluate-car',
    icon: Percent,
    label: 'Car Valuation (Nigeria)',
    description: 'Upload a photo and get an AI-powered valuation calibrated to the Nigerian market — Tokunbo vs Nigerian-used pricing.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'AI & Smart',
  },
  {
    href: '/tools/ai-mechanic',
    icon: Wrench,
    label: 'AI Mechanic',
    description: 'Describe a symptom or upload a photo and get an instant diagnosis with local repair cost estimates.',
    badge: 'FREE',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI & Smart',
  },
  {
    href: '/tools/best-car-for',
    icon: CarFront,
    label: 'Best Car For Me',
    description: 'Tell us your budget, use case, and preferences — we\'ll recommend the best cars for you.',
    category: 'AI & Smart',
  },
  {
    href: '/tools/car-comparison',
    icon: GitCompare,
    label: 'Compare Cars',
    description: 'Side-by-side comparison of specs, fuel economy, price, and running costs.',
    category: 'AI & Smart',
  },
  {
    href: '/tools/document-generator',
    icon: FileText,
    label: 'Document Generator',
    description: 'Generate a bill of sale, loan agreement, or other vehicle document — legal requirements researched for your country.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'AI & Smart',
  },
  // Finance
  {
    href: '/tools/import-duty-calculator',
    icon: Ship,
    label: 'Import Duty Calculator',
    description: 'Calculate customs duty, clearing fees, and total landed cost for any imported vehicle.',
    category: 'Finance',
  },
  {
    href: '/tools/auto-loan-calculator',
    icon: Calculator,
    label: 'Auto Loan Calculator',
    description: 'Plan your car financing — monthly payments, total interest, and amortization schedule.',
    category: 'Finance',
  },
  {
    href: '/tools/insurance-calculator',
    icon: Shield,
    label: 'Insurance Calculator',
    description: 'Estimate your comprehensive or third-party car insurance premium.',
    category: 'Finance',
  },
  {
    href: '/tools/registration-fee-calculator',
    icon: FileText,
    label: 'Registration Fees',
    description: 'Calculate number plate, change of ownership, and FRSC registration costs by state.',
    category: 'Finance',
  },
  {
    href: '/tools/vehicle-license',
    icon: IdCard,
    label: 'Vehicle License Renewal',
    description: 'Requirements, step-by-step process, official portals, and costs for renewing your vehicle license — by country.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Finance',
  },
  // Running Costs
  {
    href: '/tools/fuel-cost-calculator',
    icon: Fuel,
    label: 'Fuel Cost Calculator',
    description: 'Estimate your weekly or monthly fuel bill based on your car and driving distance.',
    category: 'Running Costs',
  },
  {
    href: '/tools/road-trip-calculator',
    icon: Map,
    label: 'Road Trip Calculator',
    description: 'Plan any road trip — total fuel cost, stops, and estimated travel time.',
    category: 'Running Costs',
  },
  {
    href: '/tools/wiper-blade-size-finder',
    icon: Droplets,
    label: 'Wiper Blade Size Finder',
    description: 'Find the exact wiper blade sizes and connector type for your car by make, model, and year.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Running Costs',
  },
  {
    href: '/tools/headlight-bulb-finder',
    icon: Lightbulb,
    label: 'Headlight Bulb Type Finder',
    description: 'Find the exact low beam, high beam, and fog light bulb codes for your car by make, model, and year.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Running Costs',
  },
  {
    href: '/tools/fuel-economy-converter',
    icon: ArrowLeftRight,
    label: 'Fuel Economy Unit Converter',
    description: 'Convert fuel economy instantly between MPG (US), MPG (UK), L/100km, and km/L.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Running Costs',
  },
  {
    href: '/tools/rideshare-earnings-calculator',
    icon: Percent,
    label: 'Ride-Share Earnings Calculator',
    description: 'See your real Uber, Bolt, or Lyft net profit after commission, fuel, and maintenance — any currency.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Running Costs',
  },
  // Due Diligence
  {
    href: '/tools/vin-checker',
    icon: Search,
    label: 'VIN Checker',
    description: 'Verify a car\'s history, specs, and origin using its Vehicle Identification Number.',
    category: 'Due Diligence',
  },
  {
    href: '/tools/vin-checker-global',
    icon: Search,
    label: 'VIN Checker (Global)',
    description: 'Free VIN decoder for used car buyers anywhere in the world — US, UK, UAE, Gulf, and beyond.',
    category: 'Due Diligence',
  },
  {
    href: '/tools/chassis-number-check',
    icon: Search,
    label: 'Chassis Number Check',
    description: 'Free chassis number check and verification, worldwide — make, model, year, engine specs, and origin.',
    badge: 'NEW',
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: 'Due Diligence',
  },
  {
    href: '/tools/obd-codes',
    icon: ScanLine,
    label: 'OBD-II Code Lookup',
    description: 'What does your check engine light code mean? Causes, symptoms, and what to check first.',
    badge: 'FREE',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'Due Diligence',
  },
  {
    href: '/tools/vehicle-papers-checklist',
    icon: ClipboardCheck,
    label: 'Vehicle Papers Checklist',
    description: 'A complete checklist of all documents to verify before buying a used car.',
    category: 'Due Diligence',
  },
  // Resources
  {
    href: '/tools/glossary',
    icon: BookOpen,
    label: 'Car Market Glossary',
    description: 'Every term you need to know — Tokunbo, Grade A, duty paid, Ladipo pricing, and hundreds more.',
    category: 'Resources',
  },
  {
    href: '/blog',
    icon: Newspaper,
    label: 'Blog & Tips',
    description: 'In-depth guides on buying, selling, and maintaining cars.',
    category: 'Resources',
  },
  {
    href: '/vehicles',
    icon: Car,
    label: 'Vehicle Info',
    description: 'Browse by brand and model — common problems, spare parts, and maintenance schedules.',
    category: 'Resources',
  },
];

const CATEGORIES = ['AI & Smart', 'Finance', 'Running Costs', 'Due Diligence', 'Resources'];

const CATEGORY_COLORS: Record<string, string> = {
  'AI & Smart': 'text-emerald-600 dark:text-emerald-400',
  'Finance': 'text-sky-600 dark:text-sky-400',
  'Running Costs': 'text-yellow-600 dark:text-yellow-400',
  'Due Diligence': 'text-rose-600 dark:text-rose-400',
  'Resources': 'text-violet-600 dark:text-violet-400',
};

const CATEGORY_BORDER: Record<string, string> = {
  'AI & Smart': 'hover:border-emerald-500/40 hover:shadow-emerald-500/5',
  'Finance': 'hover:border-sky-500/40 hover:shadow-sky-500/5',
  'Running Costs': 'hover:border-yellow-500/40 hover:shadow-yellow-500/5',
  'Due Diligence': 'hover:border-rose-500/40 hover:shadow-rose-500/5',
  'Resources': 'hover:border-violet-500/40 hover:shadow-violet-500/5',
};

const ICON_BG: Record<string, string> = {
  'AI & Smart': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Finance': 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  'Running Costs': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400',
  'Due Diligence': 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'Resources': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <div className="bg-[#080C10] pt-16 pb-14 px-4">
        <div className="max-w-screen-xl mx-auto">
          <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
            <Sparkles className="h-3 w-3" />
            Free Tools
          </span>
          <h1
            className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5vw, 72px)' }}
          >
            AUTOMOTIVE<br />
            <span className="text-emerald-400">TOOLS HUB</span>
          </h1>
          <p className="text-white/50 text-base md:text-lg font-light max-w-lg leading-relaxed">
            Every tool you need to buy, sell, and own a car — all free, all in one place.
          </p>
        </div>
      </div>

      {/* ── Tool categories ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-12 space-y-14">
        {CATEGORIES.map((category) => {
          const categoryTools = TOOLS.filter(t => t.category === category);
          return (
            <div key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <h2
                  className={`font-black uppercase leading-none ${CATEGORY_COLORS[category]}`}
                  style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 2.5vw, 28px)' }}
                >
                  {category}
                </h2>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Tool cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {categoryTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className={`group flex items-start gap-4 p-5 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-200 ${CATEGORY_BORDER[tool.category]}`}
                    >
                      {/* Icon */}
                      <div className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center ${ICON_BG[tool.category]}`}>
                        <Icon className="h-5 w-5" />
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-bold text-sm text-foreground leading-tight">{tool.label}</p>
                          {tool.badge && (
                            <span className={`flex-shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-full tracking-wider ${tool.badgeColor}`}>
                              {tool.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{tool.description}</p>
                      </div>

                      {/* Arrow */}
                      <ArrowRight className="flex-shrink-0 h-4 w-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all mt-0.5" />
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
