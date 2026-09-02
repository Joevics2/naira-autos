import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import CarComparisonClient from './client';

export const metadata: Metadata = {
  title: 'Car Comparison Tool Nigeria 2025 — Compare Specs, Price & Fuel Economy',
  description: 'Compare any two cars side by side in Nigeria. See price ranges, fuel consumption, maintenance cost, ground clearance, spare parts availability, and common issues. Toyota Camry vs Honda Accord and 28 more models.',
  alternates: { canonical: 'https://www.naira.autos/tools/car-comparison' },
  openGraph: {
    title: 'Car Comparison Tool Nigeria 2025 | Naira Autos',
    description: 'Side-by-side car comparison for the Nigerian market. Price range, fuel economy, maintenance cost, ground clearance, spare parts availability. 30 popular models including Camry, Accord, Corolla, Prado, Hilux.',
    url: 'https://www.naira.autos/tools/car-comparison',
  },
  keywords: [
    'car comparison nigeria','compare cars nigeria','toyota camry vs honda accord nigeria',
    'best car to buy nigeria 2025','camry vs accord','corolla vs civic nigeria',
    'prado vs highlander nigeria','which car is better nigeria','car specs nigeria',
    'fuel consumption cars nigeria','cheapest car to maintain nigeria',
    'toyota vs honda nigeria','suv comparison nigeria','car price comparison nigeria',
    'best family car nigeria','best suv nigeria 2025','ground clearance nigeria roads',
    'spare parts availability nigeria','car maintenance cost nigeria',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/car-comparison',
      name: 'Car Comparison Tool Nigeria 2025 — Compare Specs, Price & Fuel Economy',
      description: 'Side-by-side comparison of 30 popular cars in Nigeria. Price range, fuel consumption, maintenance cost, ground clearance, spare parts availability, and known issues.',
      url: 'https://www.naira.autos/tools/car-comparison',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',  item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Car Comparison Tool', item: 'https://www.naira.autos/tools/car-comparison' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which is better in Nigeria — Toyota Camry or Honda Accord?',
          acceptedAnswer: { '@type': 'Answer', text: 'Both are excellent choices in Nigeria, but they suit different buyers. The Toyota Camry (2002–2006) offers lower maintenance costs and marginally better spare parts availability, making it the more practical daily driver. The Honda Accord delivers a sportier driving feel and is often priced slightly lower at entry level. For first-time buyers, the Camry is generally recommended. For buyers who enjoy driving feel and can absorb slightly higher VTEC maintenance costs, the Accord is equally strong. Both have Easy spare parts availability in Nigeria.' }
        },
        {
          '@type': 'Question',
          name: 'What is the cheapest car to maintain in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'The Toyota Corolla (2003–2007) is widely regarded as the cheapest car to maintain in Nigeria. Its 1.8L engine has simple mechanics, spare parts are available at every Ladipo market, and mechanics across Nigeria are familiar with it. The Honda Civic and Toyota Yaris also have Low maintenance ratings. In general, Japanese cars with engines below 2.0L and high nationwide sales volumes have the cheapest maintenance costs due to part availability and mechanic familiarity.' }
        },
        {
          '@type': 'Question',
          name: 'Which car has the best ground clearance for Nigerian roads?',
          acceptedAnswer: { '@type': 'Answer', text: 'For Nigerian roads, a ground clearance of at least 180mm is recommended for comfort on rough roads, speed bumps, and occasional flooding. The Toyota Land Cruiser leads at 225mm, followed by the Toyota Hilux at 270mm (pickup). Among SUVs, the Toyota Prado (218mm), Toyota Highlander (188mm), and Honda Pilot (196mm) offer strong clearance. Sedans like the Toyota Camry (155mm) and Honda Civic (145mm) can struggle on severely potholed or unpaved roads.' }
        },
        {
          '@type': 'Question',
          name: 'What is the most fuel-efficient car in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Among popular cars in Nigeria, the Toyota Yaris (2012–2017) leads with approximately 7.5 L/100km combined. The Honda Fit/Jazz follows at 7.8 L/100km. For sedans, the Kia Cerato and Hyundai Elantra achieve around 8.8–9.2 L/100km. In contrast, large SUVs like the Toyota Land Cruiser consume 18.5 L/100km or more. For Lagos traffic specifically, real-world fuel consumption can be 20–40% higher than figures quoted, so budget accordingly.' }
        },
        {
          '@type': 'Question',
          name: 'Which cars have the best spare parts availability in Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Toyota and Honda models dominate spare parts availability in Nigeria. Toyota Camry, Corolla, RAV4, Hilux, Prado, and Land Cruiser all have Easy parts availability nationwide — even outside Lagos and Abuja. Honda Accord, Civic, and CR-V are similarly well-stocked. Korean brands (Hyundai, Kia) have Moderate availability — parts exist but may require a wait or sourcing from Lagos. European cars (Peugeot, Volkswagen, Mercedes-Benz, BMW) have Hard availability outside major cities and significantly higher parts costs.' }
        },
        {
          '@type': 'Question',
          name: 'Is Toyota or Honda better for Nigeria?',
          acceptedAnswer: { '@type': 'Answer', text: 'Both Toyota and Honda are excellent for Nigeria and dominate the used car market for good reason. Toyota has a slight edge in parts availability outside major cities and in resale value — a Toyota Camry or Corolla is easier to sell quickly. Honda vehicles often offer better driving dynamics and are priced competitively. For commercial or high-mileage use, Toyota is generally preferred. For personal daily driving in a major city where Honda mechanics are readily available, either brand is a sound choice.' }
        },
      ],
    },
  ],
};

export default function CarComparisonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── DARK HERO ── breadcrumb + title + tool */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          {/* Breadcrumb + back */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all"
              aria-label="Back to Tools"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">Car Comparison</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Free Tool</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: August 2026</span>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Car Comparison Tool
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Pick any two cars and compare them side by side — Nigerian market price range, fuel economy, maintenance cost, ground clearance, spare parts availability, and known issues. 30 popular models covered.
            </p>
          </div>

          {/* Interactive client component */}
          <CarComparisonClient />
        </div>
      </div>

      {/* ── WHITE CONTENT SECTIONS ── */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          {/* SEO Guide — Buying Decision */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              How to Compare Cars for the Nigerian Market
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  Comparing cars for the Nigerian market is different from using a global spec sheet. Three factors matter far more here than anywhere else: <strong className="text-gray-900">spare parts availability</strong>, <strong className="text-gray-900">mechanic familiarity</strong>, and <strong className="text-gray-900">ground clearance</strong>. A car with impressive specifications on paper can become a liability if its parts require a two-week order from Lagos or if no mechanic within 100km knows how to service it.
                </p>
                <p>
                  Spare parts for Toyota and Honda models are stocked at virtually every Ladipo Market-style auto parts hub across Nigeria. This means competitive prices, same-day availability, and mechanics who have serviced hundreds of the same model. Korean brands (Hyundai, Kia) have improved significantly but parts are still Moderate in most states outside Lagos. European brands — Volkswagen, Peugeot, Mercedes-Benz, BMW — carry a Hard rating in most of Nigeria, meaning repairs take longer and cost significantly more than equivalent Japanese cars.
                </p>
                <p>
                  <strong className="text-gray-900">Ground clearance</strong> is critical on Nigerian roads. Speed bumps vary wildly in height, many roads have deep potholes, and flooding is a seasonal reality in many cities. For urban driving in Lagos or Port Harcourt, a sedan with 145–155mm clearance is manageable with careful driving. For anyone regularly using federal highways, state roads, or driving in cities with infrastructure challenges, 180mm or above is strongly recommended.
                </p>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-900">Fuel consumption figures</strong> shown in this tool are manufacturer combined-cycle figures. Real-world Nigerian consumption is typically 15–30% higher due to Lagos traffic, air conditioning running continuously, and road surfaces that cause more acceleration/braking cycles. A car rated at 10 L/100km should be budgeted at 12–13 L/100km for realistic cost planning. Use our{' '}
                  <Link href="/tools/fuel-cost-calculator" className="text-blue-600 hover:underline">Fuel Cost Calculator</Link>{' '}
                  to convert these figures into a monthly naira cost for your specific commute.
                </p>
                <p>
                  <strong className="text-gray-900">Maintenance cost ratings</strong> (Low / Medium / High / Very High) in this tool represent the annual Nigerian market cost of routine servicing: engine oil and filter changes, brake pads, air filter, spark plugs, and minor wear items. They do not include major repairs or accident damage. A Low-rated car (e.g. Toyota Corolla) might cost ₦80,000–₦150,000 per year in routine maintenance. A Very High-rated car (e.g. Mercedes-Benz E-Class) can easily exceed ₦600,000 per year even without major faults.
                </p>
                <p>
                  For a complete 5-year ownership cost view combining fuel, maintenance, insurance, and depreciation, see our{' '}
                  <Link href="/tools/best-car-for" className="text-blue-600 hover:underline">Best Car For... Recommender</Link>{' '}
                  which ranks cars specifically by use case and total cost of ownership for Nigeria.
                </p>
              </div>
            </div>
          </div>

          {/* SEO Guide — Popular Comparisons */}
          <div>
            <h2
              className="text-2xl font-black uppercase text-gray-900 mb-5"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Popular Car Comparisons in Nigeria
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  pair: 'Toyota Camry vs Honda Accord',
                  body: "Nigeria's most debated comparison. The Camry wins on resale value and mechanic availability outside Lagos. The Accord wins on driving feel and entry-level price. Both have Easy spare parts availability — the choice ultimately comes down to personal preference and budget.",
                },
                {
                  pair: 'Toyota Corolla vs Honda Civic',
                  body: 'The budget daily driver showdown. The Corolla is slightly more reliable at high mileage, cheaper to maintain, and retains value better. The Civic offers a more engaging drive but has slightly lower ground clearance. Both are excellent first cars.',
                },
                {
                  pair: 'Toyota Prado vs Toyota Highlander',
                  body: 'Both are family SUVs with strong Nigerian road credentials. The Prado has superior ground clearance (218mm vs 188mm) and better off-road ability. The Highlander offers more interior space and 7 seats at a lower entry price. For city family use, both work well.',
                },
                {
                  pair: 'Toyota RAV4 vs Honda CR-V',
                  body: "Compact SUV comparison. The RAV4 has a slight edge in ground clearance and Toyota parts network. The CR-V offers more boot space. The 2007–2009 CR-V had a known oil dilution issue — check service records. Both are solid choices for Nigeria's roads.",
                },
                {
                  pair: 'Toyota Sienna vs Honda Odyssey',
                  body: 'The family minivan comparison. The Sienna is the more reliable choice — the Odyssey had transmission issues on 2005–2007 units. Both suffer from power sliding door failures over time. If buying either, budget for door motor repairs at some point.',
                },
                {
                  pair: 'Mercedes E-Class vs BMW 3 Series',
                  body: 'Luxury car comparison where maintenance cost is the defining factor. Both carry Very High maintenance ratings in Nigeria and Hard spare parts availability. The E-Class Airmatic suspension failure is a near-certain cost at high mileage. Both require a specialist mechanic and significant ownership budget.',
                },
              ].map(({ pair, body }) => (
                <div key={pair} className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{pair}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Example: Letting Total Cost Decide</h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">Ifeoma was torn between a Toyota Camry and a BMW 3 Series at similar asking prices. On paper the BMW looked like the better car — newer features, more power. Comparing both here, the maintenance rating gap was the deciding factor: Low for the Camry versus Very High for the 3 Series, plus Hard spare parts availability outside Lagos for the BMW. Over a realistic 3-year ownership period, the routine maintenance difference alone was projected to exceed ₦1.2 million — before accounting for any major repair. She bought the Camry and used the savings toward a better trim level instead.</p>
          </div>

          {/* FAQ */}
          <div>
            <h2
              className="text-xl font-black uppercase text-gray-900 mb-4"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Car Comparison FAQ — Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                {
                  q: 'Which is better in Nigeria — Toyota Camry or Honda Accord?',
                  a: "Both are excellent choices. The Toyota Camry offers slightly lower maintenance costs and better parts availability outside major cities, making it the more practical daily driver. The Honda Accord delivers a sportier feel and is often priced lower at entry level. For first-time buyers, the Camry is generally recommended. Both have Easy spare parts availability.",
                },
                {
                  q: 'What is the cheapest car to maintain in Nigeria?',
                  a: 'The Toyota Corolla (2003–2007) is widely regarded as the cheapest car to maintain in Nigeria. Its 1.8L engine has simple mechanics, parts are available everywhere, and mechanics across Nigeria know it well. The Honda Civic and Toyota Yaris are close runners-up.',
                },
                {
                  q: 'Which car has the best ground clearance for Nigerian roads?',
                  a: 'For Nigerian roads, aim for 180mm+ minimum. The Toyota Hilux leads all cars at 270mm. Among SUVs, the Prado (218mm), Land Cruiser (225mm), and Highlander (188mm) offer strong clearance. Most sedans sit at 130–155mm and can struggle on severely potholed roads.',
                },
                {
                  q: 'What is the most fuel-efficient car in Nigeria?',
                  a: 'The Toyota Yaris leads at 7.5 L/100km, followed by the Honda Fit at 7.8 L/100km. For sedans, the Kia Cerato and Hyundai Elantra achieve 8.8–9.2 L/100km. Note that real-world Lagos traffic can add 20–30% to these figures.',
                },
                {
                  q: 'Which cars have the best spare parts availability in Nigeria?',
                  a: 'Toyota and Honda dominate parts availability. Camry, Corolla, RAV4, Hilux, Prado, Accord, and Civic all have Easy availability nationwide. Korean brands (Hyundai, Kia) are Moderate. European brands (Peugeot, VW, Mercedes, BMW) are Hard outside Lagos and Abuja.',
                },
                {
                  q: 'Is Toyota or Honda better for Nigeria?',
                  a: "Both are excellent. Toyota has a slight edge in parts availability outside major cities and in resale value. Honda vehicles often offer better driving dynamics. For commercial or high-mileage use, Toyota is generally preferred. For personal daily driving in a major city, either brand is a sound choice.",
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

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Joshua Victor</Link>, Founder. Comparison ratings checked against real dealer and workshop experience.
          </p>

          {/* Related tools */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { href: '/tools/best-car-for',         label: 'Best Car For... Recommender', color: 'emerald' },
              { href: '/tools/fuel-cost-calculator', label: 'Fuel Cost Calculator',        color: 'amber' },
              { href: '/evaluate-car',               label: 'AI Car Valuation',            color: 'violet' },
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