import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import BestCarForClient from './client';

export const metadata: Metadata = {
  title: 'Best Car For... Nigeria 2025 — Car Recommender by Use Case',
  description: 'Find the best car for your needs in Nigeria. Select your use case — family car, commercial taxi, highway driving, budget buy, off-road, executive, or first car — and get ranked recommendations with Nigerian market prices, maintenance cost, and spare parts rating.',
  alternates: { canonical: 'https://www.naira.autos/tools/best-car-for' },
  openGraph: {
    title: 'Best Car For... Nigeria 2025 — Car Recommender | Naira Autos',
    description: 'Car recommender for the Nigerian market. Pick your use case and get the top 5 cars ranked by price, maintenance cost, fuel economy, and spare parts availability.',
    url: 'https://www.naira.autos/tools/best-car-for',
  },
  keywords: [
    'best car to buy nigeria 2025','best family car nigeria','best car for commercial use nigeria',
    'best car for lagos traffic','best suv nigeria','cheapest car to maintain nigeria',
    'best first car to buy nigeria','best car for highway nigeria','best tokunbo car nigeria',
    'best car for business nigeria','best fuel efficient car nigeria',
    'what car should i buy nigeria','car recommendation nigeria','toyota or honda nigeria',
    'best budget car nigeria','best off road car nigeria','best car under 5 million nigeria',
    'car recommender nigeria','naira autos','best car for taxi nigeria',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/best-car-for',
      name: 'Best Car For... Nigeria 2025 — Car Recommender by Use Case',
      description: 'Find the best car for your specific use case in Nigeria. Ranked recommendations across family, commercial, highway, budget, off-road, executive, first car, and fuel efficiency categories.',
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
          name: 'What is the best family car to buy in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'The best family cars in Nigeria are the Toyota Camry, Toyota Highlander, and Honda Accord. The Camry offers the best combination of space, reliability, and low maintenance cost for a family sedan. The Highlander is the top family SUV choice — it seats 7, has strong ground clearance for Nigerian roads, and Toyota spare parts are available nationwide. For larger families, the Toyota Sienna minivan seats 8 and has Easy spare parts availability.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best car for commercial use or taxi in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Corolla (2003–2007) is the most popular commercial taxi car in Nigeria for good reason — it is extremely reliable at high mileage, has Low maintenance cost, and spare parts are available at any market in Nigeria. For airport transfers and executive hire, the Toyota Camry is preferred. For inter-city transport, the Toyota Hiace bus is the dominant choice. The Toyota Hilux is widely used for commercial purposes requiring a pickup bed.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best car for Nigerian roads?',
          acceptedAnswer: { '@type': 'Answer', text: 'For Nigerian roads, ground clearance and reliability are the two most critical factors. The Toyota Hilux (270mm ground clearance) is the top-rated vehicle for rough Nigerian roads. Among SUVs, the Toyota Land Cruiser (225mm), Toyota Prado (218mm), and Honda Pilot (196mm) are well-suited. For buyers who primarily drive in cities, a Toyota Camry or Corolla with regular road use is manageable, though speed bumps and flooding require careful driving.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best first car to buy in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: "The best first cars in Nigeria are the Toyota Corolla (2003–2007), Honda Civic (2006–2011), and Toyota Yaris (2012–2017). All three have Low maintenance cost, Easy or Moderate spare parts availability, simple mechanics that any mechanic can service, and good resale value. The Corolla is the most recommended overall. Avoid European cars (BMW, Mercedes, Peugeot) as a first car — parts are expensive, mechanics specialised, and repair costs can quickly exceed the car's value." }
        },
        {
          '@type': 'Question',
          name: 'Which car is best for highway driving in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'For highway driving in Nigeria, the Toyota Camry (2007–2011) and Honda Accord (2008–2012) are top choices — both are stable at speed, comfortable over long distances, and have good fuel range. Among SUVs, the Toyota Prado and Highlander offer highway comfort with added ground clearance for when road conditions deteriorate. Key factors for highway driving are: fuel consumption (lower is better for long trips), suspension comfort, and AC effectiveness.' }
        },
        {
          '@type': 'Question',
          name: 'What is the best budget car to buy in Nigeria under ₦5 million?',
          acceptedAnswer: { '@type': 'Answer', text: 'Under ₦5 million, the best options in Nigeria are the Toyota Corolla (2003–2007) at ₦2.8M–₦4.8M, Honda Civic (2006–2011) at ₦2.5M–₦5M, and Hyundai Elantra (2011–2016) at ₦3M–₦5M. The Corolla is the top recommendation — its reliability, cheap parts, and high resale value make it the best value-for-money car in the Nigerian market. Avoid Peugeot and Ford in this price range — maintenance costs will quickly exceed savings on purchase price.' }
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
              Select your use case and get ranked car recommendations for the Nigerian market — scored by maintenance cost, spare parts availability, fuel economy, and ground clearance.
            </p>
          </div>

          {/* Interactive client component */}
          <BestCarForClient />
        </div>
      </div>

      {/* ── WHITE CONTENT SECTIONS ── */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* SEO Guide — Use Case Advice */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Choosing the Right Car for Your Needs in Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  The best car for you in Nigeria depends less on specifications and more on your <strong className="text-gray-900">actual daily use pattern</strong>. A car that excels on paper can be a poor choice if the nearest mechanic familiar with it is two states away, or if its ground clearance makes your daily commute a daily obstacle course.
                </p>
                <p>
                  For <strong className="text-gray-900">commercial or taxi use</strong>, the overriding factors are reliability at high mileage and low parts cost per kilometre. The Toyota Corolla and Toyota Camry dominate Nigerian commercial fleets for this reason — both have simple, over-engineered engines that last 400,000km+ with basic maintenance. Fuel economy matters less than parts cost at high mileage: a car that consumes 1L/100km more but has ₦20,000 cheaper brake pads is better for commercial use.
                </p>
                <p>
                  For <strong className="text-gray-900">family use</strong>, seating and boot space matter, but so does the total cost of ownership. A Toyota Highlander may cost twice as much to buy as a Toyota Camry, but the difference in fuel cost alone on a family's monthly driving can make the Camry the better financial decision. Factor in insurance, which scales with car value, and the real cost gap between a ₦10M SUV and a ₦6M sedan becomes significant.
                </p>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  For <strong className="text-gray-900">executive use</strong>, the brand perception consideration is real but should not override financial realities. A Mercedes-Benz E-Class carries a Very High maintenance rating in Nigeria — a single Airmatic suspension failure costs ₦400,000–₦800,000. The Toyota Camry 2007–2011 or Honda Accord 2008–2012 offer executive presence at a fraction of the maintenance cost. Many Nigerian professionals choose to drive a clean, well-kept Camry rather than a high-mileage European executive car with mounting repair bills.
                </p>
                <p>
                  For <strong className="text-gray-900">first-time buyers</strong>, the single most important factor is mechanic familiarity. Buying a car whose faults require specialised diagnosis means every repair takes longer and costs more. Stick to Toyota and Honda models with engines below 2.5L for your first car — the ecosystem of parts, mechanics, and online advice is the largest, and you will make mistakes in early ownership that cost far less on these cars than on anything European.
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
              Best Cars by Use Case — Nigeria 2025
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: '👨‍👩‍👧‍👦', title: 'Best Family Car',          picks: ['Toyota Camry', 'Toyota Highlander', 'Honda Accord', 'Toyota Sienna'] },
                { icon: '🚖', title: 'Best Commercial / Taxi',  picks: ['Toyota Corolla', 'Toyota Camry', 'Toyota Hiace', 'Toyota Hilux'] },
                { icon: '🛣️',  title: 'Best for Highway',        picks: ['Toyota Camry 07–11', 'Honda Accord 08–12', 'Toyota Prado', 'Toyota Highlander'] },
                { icon: '💰', title: 'Best Budget Buy',          picks: ['Toyota Corolla', 'Honda Civic', 'Kia Cerato', 'Hyundai Elantra'] },
                { icon: '🪨', title: 'Best Off-Road / Bad Roads',picks: ['Toyota Hilux', 'Toyota Land Cruiser', 'Toyota Prado', 'Honda Pilot'] },
                { icon: '💼', title: 'Best Executive Car',       picks: ['Toyota Camry 07–11', 'Honda Accord 08–12', 'Toyota Prado', 'Mercedes E-Class*'] },
                { icon: '🎓', title: 'Best First Car',           picks: ['Toyota Corolla', 'Honda Civic', 'Toyota Yaris', 'Honda Fit'] },
                { icon: '⛽', title: 'Most Fuel Efficient',      picks: ['Toyota Yaris', 'Honda Fit/Jazz', 'Kia Cerato', 'Hyundai Elantra'] },
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
            <p className="text-xs text-gray-400 mt-3">* Mercedes E-Class recommended only for buyers with a dedicated maintenance budget. See comparison tool for full cost breakdown.</p>
          </div>

          {/* FAQ */}
          <div>
            <h2
              className="text-xl font-black uppercase text-gray-900 mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Best Car FAQ — Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                {
                  q: 'What is the best family car to buy in Nigeria?',
                  a: 'The Toyota Camry is the best family sedan — space, reliability, and low maintenance cost. For 7 seats and SUV ground clearance, the Toyota Highlander is the top family choice. For larger families, the Toyota Sienna (8 seats) with Easy parts availability is hard to beat.',
                },
                {
                  q: 'What is the best car for commercial use or taxi in Nigeria?',
                  a: 'The Toyota Corolla (2003–2007) — extremely reliable at high mileage, Low maintenance cost, parts available everywhere. For inter-city transport, the Toyota Hiace bus. For executive hire, the Toyota Camry. For pickups, the Toyota Hilux.',
                },
                {
                  q: 'What is the best car for Nigerian roads?',
                  a: 'The Toyota Hilux leads at 270mm ground clearance. Among SUVs: Toyota Land Cruiser (225mm), Prado (218mm), Pilot (196mm), Highlander (188mm). For city use only, a Toyota Camry or Corolla is manageable with careful driving.',
                },
                {
                  q: 'What is the best first car to buy in Nigeria?',
                  a: 'Toyota Corolla (2003–2007) is the top recommendation. Also strong: Honda Civic (2006–2011) and Toyota Yaris (2012–2017). All have Low maintenance, Easy/Moderate parts, and mechanics available everywhere. Avoid European cars as a first car.',
                },
                {
                  q: 'Which car is best for highway driving in Nigeria?',
                  a: 'Toyota Camry (2007–2011) and Honda Accord (2008–2012) for sedans. Toyota Prado and Highlander for SUVs with added ground clearance for when road conditions deteriorate outside cities.',
                },
                {
                  q: 'What is the best budget car to buy in Nigeria under ₦5 million?',
                  a: 'Toyota Corolla (₦2.8M–₦4.8M) is the top pick. Also consider Honda Civic (₦2.5M–₦5M) and Hyundai Elantra (₦3M–₦5M). Avoid Peugeot and Ford in this range — high maintenance costs will quickly erode the purchase price savings.',
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