// app/tools/distance-calculator/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { RelatedTools } from '@/components/RelatedTools';
import { NG_TOWNS, findTown } from '@/lib/distance-towns-ng';
import { NG_CAPITAL_DISTANCE_KM } from '@/lib/ng-distance-matrix';

const lagos = findTown('Lagos')!;

export const metadata: Metadata = {
  title: 'Distance Calculator Nigeria 2026 — Road Distance Between Any Two Towns',
  description: 'Calculate road distance and drive time between 85 Nigerian towns and cities — Lagos, Abuja, Kano, Port Harcourt and more. Verified state-capital road distances, estimated drive time, and fuel cost.',
  alternates: { canonical: 'https://www.naira.autos/tools/distance-calculator' },
  openGraph: {
    title: 'Distance Calculator Nigeria 2026 | Naira Autos',
    description: 'Road distance and drive time between 85 Nigerian towns — verified state-capital distances plus fuel cost estimator.',
    url: 'https://www.naira.autos/tools/distance-calculator',
  },
  keywords: [
    'distance calculator nigeria', 'nigeria distance between cities', 'how far is lagos from abuja by road',
    'distance between kano and port harcourt nigeria', 'driving time lagos to ibadan',
    'road distance from enugu to abuja', 'distance chart nigerian state capitals',
    'nigeria road distance calculator', 'fuel cost lagos to kano', 'shortest route abuja to maiduguri',
    'kilometres between nigerian cities', 'nigeria state capitals distance matrix',
  ],
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/tools/distance-calculator',
      name: 'Distance Calculator Nigeria 2026 — Road Distance Between Any Two Towns',
      description: 'Calculate road distance and drive time between 85 Nigerian towns using a verified state-capital distance matrix, with a fuel cost estimator.',
      url: 'https://www.naira.autos/tools/distance-calculator',
      dateModified: '2026-09-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Evelyn John', jobTitle: 'Auto Sales Expert', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.naira.autos' },
          { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://www.naira.autos/tools' },
          { '@type': 'ListItem', position: 3, name: 'Distance Calculator', item: 'https://www.naira.autos/tools/distance-calculator-countries' },
          { '@type': 'ListItem', position: 4, name: 'Nigeria', item: 'https://www.naira.autos/tools/distance-calculator' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How far is Lagos from Abuja by road?',
          acceptedAnswer: { '@type': 'Answer', text: 'Lagos (Ikeja) to Abuja is approximately 761km by road via the UNDP-sourced state-capital distance reference. Actual driving time is commonly 12–16+ hours due to traffic, checkpoints, and rough sections around Lokoja/Okene — well beyond what the distance alone suggests.' },
        },
        {
          '@type': 'Question',
          name: 'Is there an official Nigerian government distance chart?',
          acceptedAnswer: { '@type': 'Answer', text: 'No single law or agency publishes an official inter-town road distance chart for Nigeria. The most widely cited reference set is the road distance matrix between the 37 state capitals sourced from UNDP Nigeria travel-allowance guidance, packaged in the open-source naijR R package. This tool uses that same matrix for state-capital-to-state-capital routes.' },
        },
        {
          '@type': 'Question',
          name: 'Why does this tool show two different distances?',
          acceptedAnswer: { '@type': 'Answer', text: 'Road distance is the actual driving distance along highways — always longer, and the more useful figure for planning. Straight-line ("as the crow flies") distance is the direct GPS distance between two points, typically 20–40% shorter than road distance. This tool shows both, since some routes such as insurance and logistics claims sometimes reference straight-line figures.' },
        },
        {
          '@type': 'Question',
          name: 'Why do some routes say "estimated" instead of "verified"?',
          acceptedAnswer: { '@type': 'Answer', text: 'Only routes between two state capitals have a verified figure, from the UNDP-sourced reference matrix covering all 37 state capitals. For any route involving a commercial town outside that list (e.g. Onitsha, Aba, Zaria, Warri), this tool estimates road distance from GPS coordinates using a road-distance correction factor calibrated against the verified matrix — clearly marked "estimated" rather than presented as exact.' },
        },
        {
          '@type': 'Question',
          name: 'Why does the actual driving time feel much longer than the calculator suggests?',
          acceptedAnswer: { '@type': 'Answer', text: 'Published distances are optimistic averages. In practice, Nigerian federal highways are often only partially dualised, with sections in poor condition, plus traffic, checkpoints, and occasional security or seasonal diversions. A trip that "should" take 7–8 hours can stretch to 12–16 hours or more. Always cross-check with a live navigation app for current conditions before a long trip.' },
        },
      ],
    },
  ],
};

export default function DistanceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      {/* ── DARK HERO ── */}
      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          {/* Breadcrumb + back */}
          <div className="flex items-center gap-3">
            <Link
              href="/tools/distance-calculator-countries"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="Back to Distance Calculator"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools" className="hover:text-white/60 transition-colors">Tools</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/tools/distance-calculator-countries" className="hover:text-white/60 transition-colors">Distance Calculator</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">🇳🇬 Nigeria</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Free Tool · 85 Towns</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">Last verified: September 2026</span>
            <h1
              className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}
            >
              Distance Calculator
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              Road distance and drive time between any two of 85 Nigerian towns — all 36 state capitals plus FCT, and major commercial centres like Onitsha, Aba, Zaria, and Warri.
            </p>
          </div>

          {/* Interactive tool */}
          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorClient />
          </div>
        </div>
      </div>

      {/* ── WHITE CONTENT ── */}
      <div className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Where These Numbers Come From
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>There is no single Nigerian law or government agency that publishes an official inter-town road distance chart. Distances used for travel claims, logistics, and trip planning are practical approximations — road infrastructure itself falls under the Federal Ministry of Works and the Federal Road Maintenance Agency (FERMA), but neither office maintains a published town-to-town mileage chart; distance figures are treated as operational data, not a legal instrument. The closest thing to an official reference predates both agencies&rsquo; current mandates: older National Bureau of Statistics and Federal Ministry of Transportation publications listing distances from each state capital to Abuja, compiled for internal planning rather than public use.</p>
              <p>The most widely cited reference is a road distance matrix between all 37 state capitals (36 states plus FCT), originating from UNDP Nigeria travel-allowance guidance and packaged in the open-source <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">naijR</code> R package. Every route between two state capitals in this tool uses that exact matrix — marked <span className="font-semibold text-emerald-700">✓ Verified route</span>.</p>
              <p>For routes involving a commercial hub outside the 37 capitals (Onitsha, Aba, Zaria, Warri, and 44 others), there is no equivalent official figure. This tool estimates road distance from GPS coordinates, corrected using a multiplier calibrated against the verified matrix itself — real road distance runs roughly 25–45% longer than straight-line distance depending on the route. These are marked <span className="font-semibold text-amber-700">≈ Estimated</span>, never presented as exact.</p>
              <p>The 85-town list itself was built deliberately, not just pulled from a population ranking. It starts with all 37 state capitals — the full set the verified matrix covers — then adds 48 further commercial and industrial centres that a general audience actually searches for: Onitsha and Nnewi in the South-East&rsquo;s commercial belt, Aba&rsquo;s manufacturing cluster, Zaria and Funtua in Kaduna&rsquo;s textile and grain corridor, Warri and Sapele in the Niger Delta&rsquo;s oil-service towns, and northern trading hubs like Hadejia, Gashua, and Kaura Namoda. Lagos itself is treated as a single hub rather than split between &ldquo;Lagos&rdquo; and &ldquo;Ikeja&rdquo; (the state capital used in the official matrix) — the two sit about 15km apart, which barely moves any country-scale distance figure, so the matrix&rsquo;s Ikeja row is reused directly under the Lagos name people actually type into a search bar.</p>
              <p>This kind of figure is used for more than idle curiosity. Transport unions and interstate fare associations informally peg fares to distance, so knowing the real road figure for a route helps a traveller sanity-check whether a quoted fare is fair. Haulage and logistics firms moving goods between Lagos&rsquo;s ports and inland markets in Kano, Kaduna, or Onitsha budget fuel and driver time off exactly this kind of number. Government and NGO field staff calculating per-diem or mileage claims often reference the same UNDP-style figures this tool pulls from directly. And for anyone simply planning a trip — say, a family drive from Enugu to Abuja for a wedding, or a supply run from Ibadan to Ilorin — a road-distance-plus-realistic-drive-time figure is far more useful than the shorter, misleading straight-line number a basic map search sometimes surfaces first.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              The Gap Between Reference Numbers and the Road
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              <p>Published road distances are optimistic averages. Lagos–Abuja is commonly quoted at ~760km but routinely takes 12–16+ hours — sometimes overnight — because of traffic, multiple checkpoints, and sections in poor condition, especially around Lokoja and Okene. Many federal highways remain only partially dualised or suffer severe potholes; a journey that &ldquo;should&rdquo; take 7–8 hours can stretch to 24–36 hours on deteriorated stretches. Security concerns, fuel queues, and seasonal flooding can inflate real travel time and cost far beyond any calculator&rsquo;s output.</p>
              <p>A handful of practical exceptions are worth knowing before a long trip. Some corridors in the North-East and parts of the North-West see periodic security restrictions that a distance figure alone won&rsquo;t warn you about. Seasonal flooding — particularly along the Niger and Benue river routes around Lokoja, and low-lying stretches near Yenagoa and Warri — can close or badly slow a route for weeks during the rainy season. A small number of connections between river towns still rely on ferry crossings rather than a continuous road, which this tool doesn&rsquo;t attempt to model separately. And for anyone using this for an official travel claim rather than personal trip planning, government and NGO staff typically still reference the underlying UNDP-style mileage rate directly rather than a road-trip app&rsquo;s figure, since that&rsquo;s the number their expense system is built around. Treat every figure here as a planning baseline, and cross-check with a live navigation app for current conditions before a long trip.</p>
            </div>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            Reviewed by <Link href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>, Auto Sales Expert. State-capital distances sourced from the UNDP-derived matrix in the open-source{' '}
            <a href="https://github.com/ropensci/naijR" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gray-900">naijR</a> package. All other routes are Haversine-based estimates — see FAQ below.
          </p>

          {/* Full ranked distance table from Lagos */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance From Lagos to Every Town, Ranked
            </h2>
            <p className="text-sm text-gray-500 mb-4">All 84 other towns in this tool, closest to farthest from Lagos.</p>
            <DistanceTable hub={lagos} towns={NG_TOWNS} verifiedMatrix={NG_CAPITAL_DISTANCE_KM} />
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Distance Calculator FAQ — Nigeria
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'How far is Lagos from Abuja by road?', a: 'Approximately 761km by the verified state-capital reference matrix. Actual drive time is commonly 12–16+ hours due to traffic, checkpoints, and rough sections around Lokoja/Okene.' },
                { q: 'Is there an official Nigerian government distance chart?', a: 'No single law or agency publishes one. The most cited reference is the UNDP-sourced 37-state-capital matrix packaged in the open-source naijR package, which this tool uses directly for capital-to-capital routes.' },
                { q: 'Why two distances — road and straight-line?', a: 'Road distance is the real driving distance and the useful figure for planning. Straight-line ("as the crow flies") is the direct GPS distance, typically 20–40% shorter — occasionally referenced for insurance or logistics purposes.' },
                { q: 'What does "estimated" mean on some routes?', a: 'Only capital-to-capital routes have a verified figure. Routes touching a commercial town outside the 37 capitals are estimated from GPS coordinates with a correction factor calibrated against the verified matrix — always labelled, never presented as exact.' },
                { q: 'Why does the real trip take longer than shown?', a: 'Published distances are optimistic averages. Traffic, checkpoints, partially dualised highways, and occasional diversions routinely double real travel time versus the "ideal" figure — always cross-check a live navigation app before a long trip.' },
                { q: 'Can I calculate fuel cost for my trip?', a: 'Yes — pick your vehicle type (or enter custom consumption) and current pump price in the calculator above; it converts the road distance directly into estimated litres and cost.' },
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
          <RelatedTools tool="distance-calculator" />

        </div>
      </div>
    </>
  );
}
