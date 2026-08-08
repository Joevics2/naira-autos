import Link from 'next/link';
import { TOOLS } from '@/lib/tools-list';
import {
  Wrench, Calculator, CarFront, GitCompare, Fuel, BookOpen,
  Ship, Shield, FileText, Map, ClipboardCheck, Search,
  Camera, Newspaper, ChevronRight, Zap, TrendingUp, ArrowUpRight,
  Clock, Tag, ChevronDown,
} from 'lucide-react';
import { HomeFreshness } from './HomeFreshness';

// ─── Tool definitions ──────────────────────────────────────────────────────

const FEATURED_TOOLS = [
  {
    href: '/evaluate-used-car',
    icon: Camera,
    label: 'AI Car Valuation',
    description: 'Upload a photo, get market value in seconds',
    badge: 'FREE',
    accent: 'orange',
  },
  {
    href: '/tools/ai-mechanic',
    icon: Wrench,
    label: 'AI Mechanic',
    description: 'Diagnose any symptom with local cost estimates',
    badge: 'FREE',
    accent: 'green',
  },
  {
    href: '/tools/import-duty-calculator',
    icon: Ship,
    label: 'Import Duty',
    description: 'Full landed cost for any imported vehicle',
    accent: 'blue',
  },
  {
    href: '/tools/best-car-for',
    icon: CarFront,
    label: 'Best Car For Me',
    description: 'Personalised picks by budget & use case',
    accent: 'purple',
  },
];

const CALC_TOOLS = [
  { href: '/tools/auto-loan-calculator',        icon: Calculator,     label: 'Auto Loan Calculator',    description: 'Monthly repayment planner' },
  { href: '/tools/fuel-cost-calculator',        icon: Fuel,           label: 'Fuel Cost Calculator',    description: 'Trip & monthly estimates' },
  { href: '/tools/insurance-calculator',        icon: Shield,         label: 'Insurance Estimator',     description: 'Coverage cost by car type' },
  { href: '/tools/registration-fee-calculator', icon: FileText,       label: 'Registration Fees',       description: 'State-by-state fee guide' },
  { href: '/tools/road-trip-calculator',        icon: Map,            label: 'Road Trip Planner',       description: 'Route cost & fuel planner' },
];

const RESEARCH_TOOLS = [
  { href: '/tools/car-comparison',              icon: GitCompare,     label: 'Compare Cars',            description: 'Side-by-side specs & costs' },
  { href: '/tools/vin-checker',                 icon: Search,         label: 'VIN Checker',             description: 'Full vehicle history report' },
  { href: '/tools/vehicle-papers-checklist',    icon: ClipboardCheck, label: 'Papers Checklist',        description: 'All docs before you buy' },
  { href: '/vehicles',                          icon: TrendingUp,     label: 'Market Prices',           description: 'Live prices by brand & model' },
  { href: '/tools/glossary',                    icon: BookOpen,       label: 'Car Glossary',            description: 'Tokunbo, Grade A & more' },
];

const BLOG_POSTS = [
  {
    href: 'https://www.naira.autos/blog/best-cars-for-uber-drivers-in-nigeria',
    title: 'Best Cars for Uber Drivers',
    excerpt: 'Fuel-smart, reliable picks for ride-hailing — with real-world costs and comfort ratings.',
    tag: 'Ride-hailing',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    href: 'https://www.naira.autos/blog/best-cars-under-5m-in-nigeria',
    title: 'Best Budget Cars Worth Buying',
    excerpt: 'Our top picks for reliable, value-for-money cars you can buy today.',
    tag: 'Budget Buying',
    readTime: '7 min',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    href: 'https://www.naira.autos/blog/transfer-car-ownership-in-nigeria',
    title: 'How to Transfer Car Ownership',
    excerpt: 'A step-by-step guide to changing a vehicle\'s registered owner with the licensing authority.',
    tag: 'Ownership',
    readTime: '5 min',
    image: 'https://images.pexels.com/photos/7534561/pexels-photo-7534561.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    href: 'https://www.naira.autos/blog/documents-to-buy-used-car-nigeria',
    title: 'Documents You Need to Buy a Used Car',
    excerpt: 'Never get scammed. Here are the exact documents to verify before handing over any money.',
    tag: 'Buying Guide',
    readTime: '5 min',
    image: 'https://images.pexels.com/photos/5816299/pexels-photo-5816299.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    href: 'https://www.naira.autos/blog/understanding-vin-number-guide',
    title: 'Understanding Your VIN Number',
    excerpt: 'Decode every character in your Vehicle Identification Number and what it reveals about your car.',
    tag: 'Car Knowledge',
    readTime: '4 min',
    image: 'https://images.pexels.com/photos/1386649/pexels-photo-1386649.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    href: 'https://www.naira.autos/blog/toyota-vs-honda-fuel-consumption',
    title: 'Toyota vs Honda: Fuel Consumption',
    excerpt: 'We compare real-world fuel economy across popular models in everyday driving conditions.',
    tag: 'Comparison',
    readTime: '6 min',
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const TAG_COLORS: Record<string, string> = {
  'Ride-hailing': 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  'Budget Buying': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Ownership':    'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  'Buying Guide': 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  'Car Knowledge':'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'Comparison':   'bg-orange-500/10 text-orange-600 dark:text-orange-400',
};

// ─── Accent config ─────────────────────────────────────────────────────────

const ACCENT: Record<string, { card: string; icon: string; badge: string }> = {
  orange: {
    card:  'hover:border-orange-400/40 hover:bg-orange-500/[0.03]',
    icon:  'text-orange-500',
    badge: 'bg-orange-500/10 text-orange-500',
  },
  green: {
    card:  'hover:border-emerald-400/40 hover:bg-emerald-500/[0.03]',
    icon:  'text-emerald-500',
    badge: 'bg-emerald-500/10 text-emerald-500',
  },
  blue: {
    card:  'hover:border-sky-400/40 hover:bg-sky-500/[0.03]',
    icon:  'text-sky-500',
    badge: 'bg-sky-500/10 text-sky-500',
  },
  purple: {
    card:  'hover:border-violet-400/40 hover:bg-violet-500/[0.03]',
    icon:  'text-violet-500',
    badge: 'bg-violet-500/10 text-violet-500',
  },
};

// ─── Sub-components ────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-muted-foreground mb-5">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-border/60 my-10" />;
}

// ─── Main Component ────────────────────────────────────────────────────────

export function HomePage() {
  return (
    <main className="bg-background pb-28">
      <HomeFreshness />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/60">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        {/* Orange glow blob */}
        <div
          className="absolute -top-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.12] dark:opacity-[0.08] pointer-events-none"
          style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 70%)' }}
        />

        <div className="relative max-w-screen-xl mx-auto px-5 sm:px-8 pt-14 pb-16 sm:pt-20 sm:pb-24">

          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-6">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-orange-600 dark:text-orange-400">
                Your Car Intelligence Hub
              </span>
            </div>
            <Link href="/inicio" className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">
              Leer en Español →
            </Link>
          </div>

          {/* Headline */}
          <h1
            className="text-foreground leading-[0.95] mb-5 font-black uppercase"
            style={{
              fontFamily: "'Barlow Condensed', 'Oswald', 'Impact', sans-serif",
              fontSize: 'clamp(38px, 8vw, 72px)',
              letterSpacing: '-0.01em',
            }}
          >
            Every tool you need<br />
            <span
              className="relative inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f97316, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              to own a car
            </span>
          </h1>

          <p className="text-muted-foreground max-w-lg mb-8 leading-relaxed" style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}>
            Free calculators, AI diagnostics, duty costs, loan planners &amp; more —
            all built for car buyers and owners everywhere.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shadow-lg shadow-orange-500/20"
            >
              Browse all tools
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/evaluate-used-car"
              className="inline-flex items-center gap-2 border border-border hover:border-orange-400/60 bg-card hover:bg-orange-500/5 text-foreground font-semibold text-sm px-6 py-3 rounded-full transition-all"
            >
              <Camera className="h-4 w-4 text-orange-500" />
              Value my car free
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-border/60">
            {[
              { value: `${TOOLS.length}+`, label: 'Free tools' },
              { value: 'AI', label: 'Powered diagnostics' },
              { value: '₦0', label: 'Always free' },
            ].map(({ value, label }) => (
              <div key={label} className="flex items-baseline gap-2">
                <span className="text-xl font-black text-orange-500" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {value}
                </span>
                <span className="text-xs text-muted-foreground font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI-Powered Spotlights ──────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8 pt-12">
        <SectionLabel>AI-Powered Tools</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURED_TOOLS.map(({ href, icon: Icon, label, description, badge, accent }) => {
            const ac = ACCENT[accent] ?? ACCENT.orange;
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex items-start gap-4 p-5 rounded-2xl border border-border bg-card ${ac.card} transition-all duration-200`}
              >
                <div className="shrink-0 w-11 h-11 rounded-xl bg-muted flex items-center justify-center">
                  <Icon className={`h-5 w-5 ${ac.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="font-bold text-foreground text-sm">{label}</p>
                    {badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider ${ac.badge}`}>
                        {badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-orange-500 shrink-0 mt-0.5 transition-colors" />
              </Link>
            );
          })}
        </div>
      </section>

      <Divider />

      {/* ── Calculators ───────────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <SectionLabel>Calculators</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {CALC_TOOLS.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-orange-400/40 hover:bg-orange-500/[0.03] transition-all duration-200"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{description}</p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-orange-500 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Research & Lookup ─────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <SectionLabel>Research &amp; Lookup</SectionLabel>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {RESEARCH_TOOLS.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-sky-400/40 hover:bg-sky-500/[0.03] transition-all duration-200"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="h-4 w-4 text-sky-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5 truncate">{description}</p>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-sky-500 shrink-0 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Blog ──────────────────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-5">
          <SectionLabel>Latest from the blog</SectionLabel>
          <Link
            href="/blog"
            className="text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 -mt-5"
          >
            All articles <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        {/* First post — large feature card */}
        <Link
          href={BLOG_POSTS[0].href}
          target="_blank"
          rel="noopener noreferrer"
          className="group block mb-4 rounded-2xl border border-border bg-card overflow-hidden hover:border-orange-400/40 transition-all duration-200"
        >
          <div className="sm:flex">
            <div className="sm:w-64 lg:w-80 shrink-0 h-44 sm:h-auto overflow-hidden bg-muted">
              <img
                src={BLOG_POSTS[0].image}
                alt={BLOG_POSTS[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-5 sm:p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${TAG_COLORS[BLOG_POSTS[0].tag]}`}>
                  {BLOG_POSTS[0].tag}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Clock className="h-3 w-3" /> {BLOG_POSTS[0].readTime} read
                </span>
              </div>
              <h3 className="font-bold text-foreground text-base sm:text-lg leading-tight mb-2 group-hover:text-orange-500 transition-colors">
                {BLOG_POSTS[0].title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                {BLOG_POSTS[0].excerpt}
              </p>
            </div>
          </div>
        </Link>

        {/* Remaining posts — 2-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOG_POSTS.slice(1).map((post) => (
            <Link
              key={post.href}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-orange-400/40 transition-all duration-200"
            >
              <div className="h-36 overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${TAG_COLORS[post.tag]}`}>
                    {post.tag}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="font-bold text-foreground text-sm leading-snug mb-1.5 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── About / SEO content ──────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <SectionLabel>About Naira Autos</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground leading-tight mb-5" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
            Free Tools to Buy, Own, and Maintain a Car
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Naira Autos is a growing library of free, no-signup tools and calculators built around the specific questions car owners actually search for — what wiper blades fit my car, how much will import duty cost, what does this OBD-II code mean, is this VIN legitimate. Those questions look the same whether you&apos;re asking from Lagos, London, or Los Angeles, so most of what we build is designed to work the same way regardless of where you&apos;re driving, with guides that explain the &quot;why&quot; behind each number rather than just handing one back.
            </p>
            <p>
              Broadly, the tools cluster into a few groups. <strong className="text-foreground">AI-powered tools</strong> like the AI Mechanic and AI Document Generator interpret symptoms and answer open-ended questions a fixed calculator can&apos;t. <strong className="text-foreground">Calculators</strong> handle arithmetic that&apos;s easy to get wrong by hand — fuel cost and economy, loan repayments, import duty, registration fees — turning assumptions into a number you can budget against. <strong className="text-foreground">Research &amp; lookup tools</strong> — VIN checkers, the OBD-II code database, wiper blade and headlight bulb finders — exist for the moment you already have a car in front of you and need a fast, specific answer. This isn&apos;t a fixed list; we&apos;re adding new tools to the site regularly, and where a tool depends on rules or pricing specific to one country, we say so clearly rather than let you assume it applies everywhere.
            </p>
            <p>
              That last point matters because the site is built to keep expanding rather than sit still. New tools go up most months, and the direction we&apos;re building in is global by default — a converter, a lookup, or a calculator gets built to work the same way no matter which country you&apos;re driving in unless the underlying rule genuinely is country-specific, like a customs duty rate or a registration fee schedule. So if a particular question you have isn&apos;t covered yet, it&apos;s worth checking back — the library you see today is a snapshot, not the finished product.
            </p>
            <p>
              Everything here is free to use, with no account, paywall, or email capture required to get an answer. We keep the lights on through ads and our car marketplace, not by charging for tools — if you find one useful, the best way to support it is to come back and use another one, or to point someone else at it who&apos;s asking the same question you were.
            </p>
            <p>
              We&apos;re also upfront about where the data behind each tool comes from and its limits. Reference figures like wiper blade lengths, headlight bulb codes, and OBD-II fault descriptions are drawn from widely documented manufacturer and industry standards for the common trim of each generation — genuinely useful as a starting point, but not a substitute for reading the code printed on your own bulb or measuring your own blade before you order a replacement, since higher trims and regional variants sometimes differ. Where a figure depends on something that changes often, like fuel prices or duty rates, we try to note that clearly in the tool itself rather than let a stale number sit unlabeled on the page.
            </p>
          </div>
        </div>

        {/* Which tool should you use */}
        <div className="max-w-3xl mt-10">
          <h3 className="text-lg font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
            Not Sure Where to Start?
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              A few starting points from the current lineup — new additions get their own spot here over time. If you&apos;re trying to work out what a car will actually cost to bring in and register, start with the <Link href="/tools/import-duty-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">import duty calculator</Link> and <Link href="/tools/registration-fee-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">registration fee calculator</Link>. If you&apos;re trying to figure out monthly running costs before you commit to a purchase, the <Link href="/tools/fuel-cost-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">fuel cost calculator</Link>, <Link href="/tools/fuel-economy-converter" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">fuel economy converter</Link>, and <Link href="/tools/auto-loan-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">auto loan calculator</Link> cover fuel and financing. If you already own the car and something&apos;s wrong with it, the <Link href="/tools/ai-mechanic" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">AI Mechanic</Link> and <Link href="/tools/obd-codes" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">OBD-II code lookup</Link> are the fastest way to a diagnosis, and the <Link href="/tools/wiper-blade-size-finder" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">wiper blade</Link> and <Link href="/tools/headlight-bulb-finder" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">headlight bulb</Link> finders get you the exact part number before you head to the counter. And if you&apos;re not sure a listing or a used car is what it claims to be, the <Link href="/tools/vin-checker" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">VIN checker</Link> and <Link href="/tools/vehicle-papers-checklist" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">vehicle papers checklist</Link> are built for exactly that kind of due diligence. The full, current set is always on the <Link href="/tools" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">tools page</Link>.
            </p>
          </div>
        </div>

        {/* Mini FAQ */}
        <div className="max-w-3xl mt-10">
          <h3 className="text-lg font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
            Common Questions
          </h3>
          <div className="space-y-2">
            {[
              { q: 'Is Naira Autos free to use?', a: 'Yes — every tool, calculator, and guide on the site is free with no signup or paywall. We support the site through ads and our car marketplace, not by charging for tools.' },
              { q: 'Is Naira Autos only useful if I\'m in Nigeria?', a: 'No. Most tools — fuel economy conversion, wiper blade and headlight bulb lookups, OBD-II codes, the auto glossary, and more — are built to work the same way anywhere in the world. A smaller set are tied to Nigerian duty rates, registration fees, or currency, and those are labeled clearly so you\'re never guessing whether a number applies to your market.' },
              { q: 'How accurate are the calculators and lookup tools?', a: 'We aim for accuracy based on publicly documented standards and manufacturer reference data, but vehicle specs vary by trim and region, so we always recommend double-checking anything safety-related (like bulb type or brake specs) against your owner\'s manual or the part you\'re replacing.' },
              { q: 'Do I need to create an account to use a tool?', a: 'No account is required for any tool on the site. A few features tied to the marketplace side, like listing a car for sale, do require sign-in.' },
              { q: 'Are you adding more tools?', a: 'Yes — new tools go up regularly, and most new additions are built to work globally first rather than for one market. The current full list always lives on the tools page.' },
              { q: 'How often is the data on each tool updated?', a: 'Reference data like bulb and wiper sizes changes rarely, so we revisit it periodically as new models launch. Figures tied to prices, rates, or regulations are reviewed more frequently since those change on their own schedule, not ours.' },
            ].map(({ q, a }) => (
              <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                  <span className="text-sm font-semibold text-foreground">{q}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}