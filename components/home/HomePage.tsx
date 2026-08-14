import Link from 'next/link';
import {
  Wrench, Calculator, Ship, Search, Camera, ChevronRight, ArrowUpRight,
  Clock, ChevronDown, Settings, AlertTriangle, PackageSearch, FileCheck2,
} from 'lucide-react';
import { HomeFreshness } from './HomeFreshness';

// ─── Vehicle guides — real, published brand/model/year content ─────────────
// Curated set covering all three guide types (maintenance, parts, problems)
// across well-known models. Pulled from the live database, not placeholders.

const VEHICLE_GUIDES = [
  { href: '/cars/toyota/corolla/2014-2019/maintenance', brand: 'Toyota', model: 'Corolla', years: '2014–2019', kind: 'Maintenance Schedule', icon: Settings },
  { href: '/cars/honda/civic/2001-2005/problems',       brand: 'Honda',  model: 'Civic',   years: '2001–2005', kind: 'Common Problems',     icon: AlertTriangle },
  { href: '/cars/toyota/rav4/2013-2018/parts',           brand: 'Toyota', model: 'RAV4',    years: '2013–2018', kind: 'Parts & Prices',       icon: PackageSearch },
  { href: '/cars/bmw/3/1999-2006/maintenance',           brand: 'BMW',    model: '3 Series',years: '1999–2006', kind: 'Maintenance Schedule', icon: Settings },
  { href: '/cars/nissan/altima/2002-2006/problems',      brand: 'Nissan', model: 'Altima',  years: '2002–2006', kind: 'Common Problems',     icon: AlertTriangle },
  { href: '/cars/volkswagen/golf/2004-2008/parts',       brand: 'Volkswagen', model: 'Golf',years: '2004–2008', kind: 'Parts & Prices',       icon: PackageSearch },
];

// ─── Document templates — real, published country-specific templates ───────

const DOCUMENT_GUIDES = [
  { href: '/documents/vehicle-bill-of-sale/ng',                 label: 'Vehicle Bill of Sale',        country: 'Nigeria',        flag: '🇳🇬' },
  { href: '/documents/vehicle-bill-of-sale/us',                 label: 'Vehicle Bill of Sale',        country: 'United States',  flag: '🇺🇸' },
  { href: '/documents/private-vehicle-sale-receipt-agreement/gb', label: 'Private Sale Agreement',    country: 'United Kingdom', flag: '🇬🇧' },
  { href: '/documents/as-is-vehicle-sale-agreement/ca',         label: 'As-Is Sale Agreement',         country: 'Canada',         flag: '🇨🇦' },
];

// ─── A handful of calculators — trimmed from the full set on /tools ────────

const QUICK_CALCULATORS = [
  { href: '/tools/ai-mechanic',                 icon: Wrench,     label: 'AI Mechanic',           description: 'Diagnose a symptom with cost estimates' },
  { href: '/tools/import-duty-calculator',      icon: Ship,       label: 'Import Duty Calculator', description: 'Full landed cost for an imported car' },
  { href: '/tools/auto-loan-calculator',        icon: Calculator, label: 'Auto Loan Calculator',   description: 'Monthly repayment planner' },
  { href: '/tools/vin-checker',                 icon: Search,     label: 'VIN Checker',            description: 'Decode any vehicle identification number' },
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

const GUIDE_KIND_COLOR: Record<string, string> = {
  'Maintenance Schedule': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  'Common Problems':      'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  'Parts & Prices':       'bg-sky-500/10 text-sky-600 dark:text-sky-400',
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
                Your Car Ownership Guide
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
            Everything about<br />
            <span
              className="relative inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #f97316, #fb923c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              owning a car
            </span>
          </h1>

          <p className="text-muted-foreground max-w-lg mb-8 leading-relaxed" style={{ fontSize: 'clamp(14px, 2vw, 17px)' }}>
            Maintenance schedules, common problems, and parts guides by make and model,
            ready-to-use document templates, and expert buying advice — for car owners everywhere.
          </p>

          {/* CTA row */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cars"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 active:bg-orange-600 text-white font-bold text-sm px-6 py-3 rounded-full transition-colors shadow-lg shadow-orange-500/20"
            >
              Explore vehicle guides
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
              { value: '1,000+', label: 'Vehicle guides' },
              { value: '160', label: 'Countries covered' },
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

      {/* ── Vehicle Guides ───────────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8 pt-12">
        <div className="flex items-end justify-between mb-5">
          <SectionLabel>Maintenance, Parts &amp; Common Problems</SectionLabel>
          <Link
            href="/cars"
            className="text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 -mt-5"
          >
            All vehicle guides <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {VEHICLE_GUIDES.map(({ href, brand, model, years, kind, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-start gap-3.5 p-4 rounded-xl border border-border bg-card hover:border-orange-400/40 hover:bg-orange-500/[0.03] transition-all duration-200"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center mt-0.5">
                <Icon className="h-4 w-4 text-orange-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight">{brand} {model}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{years}</p>
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-1.5 ${GUIDE_KIND_COLOR[kind]}`}>
                  {kind}
                </span>
              </div>
              <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-orange-500 shrink-0 mt-1 transition-colors" />
            </Link>
          ))}
        </div>
      </section>

      <Divider />

      {/* ── Document Templates ───────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-5">
          <SectionLabel>Document Templates</SectionLabel>
          <Link
            href="/documents"
            className="text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 -mt-5"
          >
            All templates <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DOCUMENT_GUIDES.map(({ href, label, country, flag }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:border-sky-400/40 hover:bg-sky-500/[0.03] transition-all duration-200"
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-base">
                {flag}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm leading-tight">{label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{country}</p>
              </div>
              <FileCheck2 className="h-3.5 w-3.5 text-muted-foreground/30 group-hover:text-sky-500 shrink-0 transition-colors" />
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

        {/* Remaining posts — grid */}
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

      {/* ── A few quick calculators ──────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="flex items-end justify-between mb-5">
          <SectionLabel>A Few Handy Calculators</SectionLabel>
          <Link
            href="/tools"
            className="text-xs font-semibold text-muted-foreground hover:text-orange-500 transition-colors flex items-center gap-1 -mt-5"
          >
            See all <ChevronRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {QUICK_CALCULATORS.map(({ href, icon: Icon, label, description }) => (
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

      {/* ── About / SEO content ──────────────────────────────────────────── */}
      <section className="max-w-screen-xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl">
          <SectionLabel>About Naira Autos</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-black uppercase text-foreground leading-tight mb-5" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
            A Guide for Buying, Owning, and Maintaining a Car
          </h2>
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
            <p>
              Naira Autos is a growing library of vehicle guides built around the specific questions car owners actually search for — what does this maintenance schedule look like, why does my car make this noise, what parts fit my specific model year, what documents do I need to sell a car legally where I live. We organise that by make, model, and year, so a guide is specific to your actual car rather than generic advice that might not apply to your trim or region.
            </p>
            <p>
              The core of the site is <strong className="text-foreground">vehicle guides</strong> — maintenance schedules, common problems, and parts references organised by brand and model, so you can look up exactly what your specific car needs rather than sifting through advice written for a different generation or market. Alongside that is a growing set of <strong className="text-foreground">document templates</strong> covering vehicle sales, transfers, and other paperwork across 160 countries, each researched for the legal requirements of that specific jurisdiction rather than a single generic template. We also publish <strong className="text-foreground">buying guides and comparisons</strong> on the blog, and keep a small set of <strong className="text-foreground">calculators</strong> on hand for the arithmetic that's easy to get wrong by hand — import duty, loan repayments, fuel costs — for when a number matters more than an explanation.
            </p>
            <p>
              This isn't a fixed library — new vehicle guides and document templates go up regularly, and where a guide depends on rules or pricing specific to one country, we say so clearly rather than let you assume it applies everywhere. The direction we're building in is global by default: a guide gets written to work for its specific make, model, and market, with country-specific detail called out explicitly rather than assumed.
            </p>
            <p>
              Everything here is free to use, with no account, paywall, or email capture required to read a guide or fill in a document. We keep the lights on through advertising and our car marketplace, not by charging for content — if you find a guide useful, the best way to support it is to come back when you need the next one, or point someone else at it who's asking the same question you were.
            </p>
            <p>
              We're upfront about where the information behind each guide comes from and its limits. Reference figures like maintenance intervals, part numbers, and common-fault patterns are drawn from widely documented manufacturer and industry data for the common trim of each generation — genuinely useful as a starting point, but not a substitute for checking your own owner's manual or the part on your own car, since higher trims and regional variants sometimes differ. Where a figure depends on something that changes often, like fuel prices or duty rates, we try to note that clearly rather than let a stale number sit unlabeled on the page.
            </p>
          </div>
        </div>

        {/* Where to start */}
        <div className="max-w-3xl mt-10">
          <h3 className="text-lg font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
            Not Sure Where to Start?
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              A few starting points from the current library — new additions get their own spot here over time. If you already own the car and want to know what it needs, search your make and model under <Link href="/cars" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">vehicle guides</Link> for its maintenance schedule, common problems, and parts reference. If you're buying or selling and need paperwork, browse <Link href="/documents" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">document templates</Link> for your country, or use the <Link href="/tools/document-generator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">AI document generator</Link> for something more specific. If you're trying to work out what a car will actually cost to bring in and register, start with the <Link href="/tools/import-duty-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">import duty calculator</Link> and <Link href="/tools/registration-fee-calculator" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">registration fee calculator</Link>. And if something's actively wrong with the car in front of you, the <Link href="/tools/ai-mechanic" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">AI Mechanic</Link> and <Link href="/tools/obd-codes" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">OBD-II code lookup</Link> are the fastest way to a diagnosis. The full current set of calculators is on the <Link href="/tools" className="text-orange-600 dark:text-orange-400 font-semibold hover:underline">calculators page</Link>.
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
              { q: 'Is Naira Autos free to use?', a: 'Yes — every guide, document template, and calculator on the site is free with no signup or paywall. We support the site through advertising and our car marketplace, not by charging for content.' },
              { q: 'Is Naira Autos only useful if I\'m in Nigeria?', a: 'No. Vehicle guides cover models sold worldwide, document templates cover 160 countries, and reference tools like the auto glossary and OBD-II code lookup work the same way anywhere. A smaller set of calculators are tied to Nigerian duty rates, registration fees, or currency, and those are labeled clearly so you\'re never guessing whether a number applies to your market.' },
              { q: 'How accurate are the vehicle guides and calculators?', a: 'We aim for accuracy based on publicly documented standards and manufacturer reference data, but vehicle specs vary by trim and region, so we always recommend double-checking anything safety-related against your owner\'s manual or the part you\'re replacing.' },
              { q: 'Do I need to create an account to use the site?', a: 'No account is required to read a guide, fill in a document, or use a calculator. A few features tied to the marketplace side, like listing a car for sale, do require sign-in.' },
              { q: 'Are you adding more guides and templates?', a: 'Yes — new vehicle guides and document templates go up regularly, and most new additions are built to work globally first rather than for one market.' },
              { q: 'How often is the data on each guide updated?', a: 'Reference data like maintenance intervals and part numbers changes rarely, so we revisit it periodically as new models launch. Figures tied to prices, rates, or regulations are reviewed more frequently since those change on their own schedule, not ours.' },
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
