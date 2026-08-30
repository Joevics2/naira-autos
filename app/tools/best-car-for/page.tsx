import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import BestCarForClient from './client';

export const metadata: Metadata = {
  title: 'Best Car For... 2026 — Car Recommender by Use Case, 50 Countries',
  description: 'Find the best car for your needs, with pricing in your local currency across 50 countries. Select your use case — family car, commercial use, highway driving, budget buy, off-road, executive, or first car — and get ranked recommendations across 50 models, from the Toyota Corolla to the Bugatti Chiron, with maintenance cost and spare parts rating.',
  alternates: { canonical: 'https://www.naira.autos/tools/best-car-for' },
  openGraph: {
    title: 'Best Car For... 2026 — Car Recommender | Naira Autos',
    description: 'Global car recommender with local pricing for 50 countries. Pick your use case and get the top 5 cars ranked by price, maintenance cost, fuel economy, and spare parts availability.',
    url: 'https://www.naira.autos/tools/best-car-for',
  },
  keywords: [
    'best car to buy 2026','best family car','best car for commercial use','best car recommender',
    'what car should i buy','best suv 2026','cheapest car to maintain','best first car to buy',
    'best car for highway driving','best executive car','best fuel efficient car',
    'car recommendation','best budget car','best off road car','best car to buy nigeria 2025',
    'best family car nigeria','best car for lagos traffic','best tokunbo car nigeria',
    'best car for taxi nigeria','naira autos','best car for commercial use nigeria',
    'best car usa','best car uk','best car uae','best car india','best car south africa',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/best-car-for',
      name: 'Best Car For... 2026 — Car Recommender by Use Case, 50 Countries',
      description: 'Find the best car for your specific use case with local pricing across 50 countries. Ranked recommendations across family, commercial, highway, budget, off-road, executive, first car, and fuel efficiency categories from 50 models.',
      url: 'https://www.naira.autos/tools/best-car-for',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Best Car For...', item: 'https://www.naira.autos/tools/best-car-for' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does this tool show real prices for my country?',
          acceptedAnswer: { '@type': 'Answer', text: "It shows an estimate, not a live quote. Each of the 50 cars has a base USD price; selecting your country applies that country's typical import duty/tax multiplier and current exchange rate to estimate a local price. It's a solid starting point for comparison, but confirm with a local dealer or listing before budgeting exactly, since exchange rates move daily and taxes vary by trim." }
        },
        {
          '@type': 'Question',
          name: 'What is the best family car to buy?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Camry (hybrid) offers the best combination of space, reliability, and low maintenance cost for a family sedan. The Toyota RAV4 and Honda CR-V are the top family SUV choices — both seat 5, have strong ground clearance, and their parts networks are among the best-stocked anywhere, including Nigeria. For larger families, the Toyota Sienna hybrid minivan seats 8.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best car for commercial use?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Corolla is the most popular commercial-use car worldwide for good reason — it is extremely reliable at high mileage, has Low maintenance cost, and spare parts are available almost everywhere, including at any market in Nigeria. For higher-capacity commercial needs, the Toyota Land Cruiser and Ford F-150 are widely used workhorses.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best car for rough or unpaved roads?',
          acceptedAnswer: { '@type': 'Answer', text: 'Ground clearance and reliability are the two most critical factors. The Toyota Land Cruiser (225mm) and Jeep Wrangler (252mm) lead the rankings, followed by the Land Rover Range Rover (218mm) and Ford Bronco (216mm). For buyers who primarily drive in cities — including most of Lagos or Nairobi — a Toyota Camry or Corolla with careful driving is manageable, though speed bumps and flooding require attention.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best first car to buy?',
          acceptedAnswer: { '@type': 'Answer', text: "The Toyota Corolla and Honda Civic are the top recommendations for a first car — both have Low maintenance cost, Easy spare parts availability, simple mechanics any mechanic can service, and strong resale value. The Toyota GR86/Subaru BRZ and MINI Cooper are engaging first-car options for buyers who want a sportier feel, though both cost more to maintain. Avoid European luxury and exotic brands as a first car — parts are expensive and specialist mechanics are required." }
        },
        {
          '@type': 'Question',
          name: 'Which car is best for highway driving?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Camry and BMW 3 Series are top choices for stable, comfortable highway driving. Electric options like the Tesla Model 3 and Hyundai Ioniq 5 offer strong highway comfort and low running cost, provided charging infrastructure exists along your route. Key factors for highway driving are fuel or energy consumption, suspension comfort, and cabin refinement.' }
        },
      ],
    },
  ],
};

export default function BestCarForPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── DARK HERO ── breadcrumb + title + tool */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          {/* Breadcrumb + back */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all"
              aria-label="Back to Tools"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Best Car For...</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Tool</span>
            </div>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Best Car For...
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Select your use case and pick your country, and get ranked car recommendations with pricing in your local currency across 50 countries — scored by maintenance cost, spare parts availability, fuel economy, and ground clearance. 50 models covered, from the Toyota Corolla to the Bugatti Chiron.
            </p>
          </div>
        </div>
      </div>

      {/* ── INTERACTIVE TOOL ── light, theme-aware widget */}
      <BestCarForClient />

      {/* ── WHITE CONTENT SECTIONS ── */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* SEO Guide — Use Case Advice */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Choosing the Right Car for Your Needs
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  This tool now covers 50 popular cars — from everyday economy sedans to electric crossovers to seven-figure hypercars — with pricing that adjusts to your country's currency and typical import duty/tax level across 50 countries. Pick your country in the selector above before choosing a use case, so the prices you see reflect your market rather than a raw dollar conversion.
                </p>
                <p>
                  The best car for you depends less on specifications and more on your <strong className="text-gray-900">actual daily use pattern</strong>. A car that excels on paper can be a poor choice if the nearest mechanic familiar with it is far away, or if its ground clearance makes your daily commute a daily obstacle course — this is especially true in markets like Nigeria, where road conditions and parts availability vary widely by region.
                </p>
                <p>
                  For <strong className="text-gray-900">commercial use</strong>, the overriding factors are reliability at high mileage and low parts cost per kilometre. The Toyota Corolla and Toyota Camry dominate commercial fleets worldwide, including Nigeria's, for this reason — both have simple, over-engineered engines that last well past 400,000km with basic maintenance.
                </p>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  For <strong className="text-gray-900">executive use</strong>, brand perception is real but shouldn't override financial realities. A Mercedes-Benz S-Class carries a Very High maintenance rating — air suspension and electronics repairs run into the thousands. The Toyota Camry or BMW 3 Series offer strong executive presence at a fraction of the maintenance cost, which is why many professionals choose a well-kept mainstream sedan over a high-mileage luxury car with mounting repair bills.
                </p>
                <p>
                  For <strong className="text-gray-900">first-time buyers</strong>, the single most important factor is mechanic familiarity. Buying a car whose faults require specialised diagnosis means every repair takes longer and costs more. Stick to Toyota and Honda models with engines below 2.5L for your first car — the ecosystem of parts, mechanics, and online advice is the largest, wherever you're buying.
                </p>
                <p>
                  Use our{' '}
                  <Link href="/tools/car-comparison" className="text-emerald-600 hover:underline">Car Comparison Tool</Link>{' '}
                  to compare any two recommendations side by side in detail, and our{' '}
                  <Link href="/tools/fuel-cost-estimator" className="text-emerald-600 hover:underline">Fuel Cost Calculator</Link>{' '}
                  to estimate monthly running costs for any car on your shortlist.
                </p>
              </div>
            </div>
          </div>

          {/* Use case grid — static SEO content */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Best Cars by Use Case — 2026
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '👨‍👩‍👧‍👦', title: 'Best Family Car',          picks: ['Toyota Camry', 'Toyota RAV4', 'Honda CR-V', 'Toyota Sienna'] },
                { icon: '🚖', title: 'Best Commercial Use',    picks: ['Toyota Corolla', 'Toyota RAV4', 'Toyota Land Cruiser', 'Ford F-150'] },
                { icon: '🛣️',  title: 'Best for Highway',        picks: ['Toyota Camry', 'BMW 3 Series', 'Tesla Model 3', 'Hyundai Ioniq 5'] },
                { icon: '💰', title: 'Best Budget Buy',          picks: ['Toyota Corolla', 'Honda Civic'] },
                { icon: '🪨', title: 'Best Off-Road / Bad Roads',picks: ['Toyota Land Cruiser', 'Jeep Wrangler', 'Range Rover', 'Ford Bronco'] },
                { icon: '💼', title: 'Best Executive Car',       picks: ['Mercedes-Benz S-Class', 'BMW 3 Series', 'Genesis G90', 'Range Rover'] },
                { icon: '🎓', title: 'Best First Car',           picks: ['Toyota Corolla', 'Honda Civic', 'Toyota GR86 / Subaru BRZ', 'MINI Cooper'] },
                { icon: '⛽', title: 'Most Fuel Efficient',      picks: ['Toyota Camry (Hybrid)', 'Tesla Model 3', 'Toyota Corolla', 'Hyundai Ioniq 5'] },
              ].map(({ icon, title, picks }) => (
                <div key={title} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-lg mb-1">{icon}</p>
                  <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-2">{title}</h3>
                  <ol className="space-y-1">
                    {picks.map((p, i) => (
                      <li key={p} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="text-gray-400 font-bold w-3">{i + 1}.</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">Prices and exact rankings adjust to your selected country in the tool above. Exotic and luxury picks (Ferrari, Lamborghini, Rolls-Royce) show up under Executive for buyers at that budget level — see the comparison tool for a full cost breakdown.</p>
          </div>

          {/* FAQ */}
          <div>
            <h2
              className="text-xl font-black uppercase text-gray-900 mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Best Car FAQ
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                {
                  q: 'Does this tool show real prices for my country?',
                  a: "It's an estimate, not a live quote — each car has a base USD price, adjusted by your selected country's typical import duty/tax level and current exchange rate. Confirm with a local dealer or listing before budgeting exactly.",
                },
                {
                  q: 'What is the best family car to buy?',
                  a: 'The Toyota Camry is the best family sedan — space, reliability, and low maintenance cost. The Toyota RAV4 and Honda CR-V are the top family SUV picks. For larger families, the Toyota Sienna (8 seats, hybrid) is hard to beat.',
                },
                {
                  q: 'What is the best car for commercial use?',
                  a: 'The Toyota Corolla — extremely reliable at high mileage, Low maintenance cost, parts available almost everywhere including Nigeria. For heavier commercial use, the Toyota Land Cruiser and Ford F-150 are proven workhorses.',
                },
                {
                  q: 'What is the best car for rough or unpaved roads?',
                  a: 'The Jeep Wrangler (252mm) and Toyota Land Cruiser (225mm) lead on ground clearance. The Land Rover Range Rover and Ford Bronco also perform well. For city use only, a Toyota Camry or Corolla is manageable with careful driving.',
                },
                {
                  q: 'What is the best first car to buy?',
                  a: 'Toyota Corolla and Honda Civic are the top recommendations — Low maintenance, Easy parts, mechanics available everywhere. The Toyota GR86/Subaru BRZ and MINI Cooper suit buyers who want more driving engagement. Avoid exotic and ultra-luxury brands as a first car.',
                },
                {
                  q: 'Which car is best for highway driving?',
                  a: 'Toyota Camry and BMW 3 Series for comfortable, stable highway driving. Tesla Model 3 and Hyundai Ioniq 5 are strong electric options where charging infrastructure supports your route.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/tools/car-comparison',      label: 'Car Comparison Tool',    color: 'blue' },
              { href: '/tools/fuel-cost-estimator', label: 'Fuel Cost Calculator',   color: 'amber' },
              { href: '/tools/ai-car-valuation',    label: 'AI Car Valuation',       color: 'violet' },
            ].map(({ href, label, color }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 border border-${color}-200 hover:bg-${color}-100 transition-all`}
              >
                <p className={`text-sm font-bold text-${color}-700`}>{label}</p>
                <ChevronRight className={`h-4 w-4 text-${color}-500`} />
              </Link>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}