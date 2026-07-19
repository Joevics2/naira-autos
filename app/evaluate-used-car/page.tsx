import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { EvaluateCarClient } from './client';

export const metadata: Metadata = {
  title: 'AI Car Valuation | Upload a Photo, Get Your Used Car\'s Worth | Naira Autos',
  description:
    'Get a free AI-powered valuation of your used car. Upload a photo and get an instant price estimate in your own currency — for Nigeria, US, UK, and more.',
  keywords: [
    'car valuation',
    'how much is my car worth',
    'used car valuation',
    'car price estimate',
    'free car valuation',
    'car market value',
    'tokunbo car price checker',
    'car valuation Nigeria',
  ].join(', '),
  openGraph: {
    title: 'AI Car Valuation — Upload a Photo, Get Your Car\'s Worth',
    description:
      'AI-powered market price estimate in your own currency. Upload a photo of your car and get an instant valuation. 100% free.',
    url: 'https://naira.autos/evaluate-used-car',
    siteName: 'Naira Autos',
    locale: 'en_NG',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/evaluate-used-car',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'AI Car Valuation (Upload a Photo)',
  description:
    'Free AI-powered car valuation tool. Instant price estimate in your own currency for used vehicles, including Tokunbo and Nigerian-used cars.',
  url: 'https://naira.autos/evaluate-used-car',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Naira Autos AI Car Valuation Tool',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
    },
    description:
      'Upload a photo of your car and get an instant AI-powered market valuation, calibrated to your selected country\'s market rates.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://naira.autos' },
      { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://naira.autos/tools' },
      { '@type': 'ListItem', position: 3, name: 'AI Car Valuation', item: 'https://naira.autos/evaluate-used-car' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much is my Tokunbo car worth in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Tokunbo (foreign-used) car prices in Nigeria depend on the make, model, year, trim level, and condition. A Tokunbo Toyota Camry 2016 in good condition typically sells for ₦8–₦12 million in Lagos, while a Tokunbo Honda Accord 2016 ranges from ₦7–₦10 million. Use our free AI valuation tool for a precise estimate based on your specific car.',
        },
      },
      {
        '@type': 'Question',
        name: 'What factors affect car valuation in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main factors are: (1) Brand and model — Toyota and Honda hold their value best in Nigeria. (2) Whether it is Tokunbo (foreign-used), Nigerian-used, or brand new. (3) Year of manufacture and trim level. (4) Body condition — dents, rust, or paint damage reduce value. (5) Engine and mechanical condition. (6) Completeness of vehicle documents (customs papers, proof of ownership). (7) Location — Lagos prices are typically 5–10% higher than Abuja or Port Harcourt.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a Tokunbo car worth more than a Nigerian-used car?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, generally. Tokunbo (foreign-used) cars command a 20–40% premium over equivalent Nigerian-used cars because they typically have lower mileage, less wear, better maintenance history, and no local accident history. However, a clean Nigerian-used "first body" car can sometimes fetch a comparable price if condition and documents are impeccable.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I know if I am selling my car at the right price in Nigeria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use our free car valuation tool — upload a photo and get an AI-powered estimate calibrated to current Nigerian market data. As a rule, price your car 5–10% above your minimum acceptable price to leave room for negotiation, which is standard in the Nigerian car market.',
        },
      },
    ],
  },
};

const VALUATION_FACTORS = [
  {
    icon: TrendingUp,
    title: 'Brand & Resale Value',
    body: 'Toyota and Honda consistently command the highest resale values in Nigeria due to part availability and proven reliability. Lexus, Mercedes-Benz, and BMW retain value well at the top end.',
  },
  {
    icon: Shield,
    title: 'Tokunbo vs. Nigerian Used',
    body: 'Foreign-used (Tokunbo) cars fetch 20–40% more than equivalent Nigerian-used cars. "First body" status — meaning one careful Nigerian owner — can partially close that gap.',
  },
  {
    icon: CheckCircle2,
    title: 'Documents & Papers',
    body: 'Complete paperwork (customs duty receipt, proof of ownership, valid registration) is non-negotiable. Missing or questionable documents can reduce your car\'s value by 15–25%.',
  },
  {
    icon: AlertCircle,
    title: 'Body Condition',
    body: 'A very clean exterior with no dents, rust, or faded paint can add 10–15% to market value. Visible body damage is the fastest way to lose Naira on your sale.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How much is my Tokunbo car worth in Nigeria?',
    a: 'It depends on the make, model, year, trim, and condition. A Tokunbo Toyota Camry 2016 in clean condition typically sells for ₦8–₦12 million in Lagos. A Tokunbo Honda Accord 2016 ranges ₦7–₦10 million. Upload your car photo above for a precise estimate.',
  },
  {
    q: 'What factors affect car valuation in Nigeria?',
    a: 'The main factors are: brand (Toyota and Honda hold value best), Tokunbo vs. Nigerian-used status, year and trim, body condition, engine health, completeness of documents, and location. Lagos prices are typically 5–10% higher than Abuja or Port Harcourt.',
  },
  {
    q: 'Is a Tokunbo car worth more than a Nigerian-used car?',
    a: 'Yes, typically 20–40% more — because Tokunbo cars tend to have lower mileage, better maintenance history, and no local accident history. A clean Nigerian-used "first body" car can sometimes command a comparable price if condition and documents are excellent.',
  },
  {
    q: 'How do I price my car correctly before selling in Nigeria?',
    a: 'Use our free valuation tool above to get an AI-powered market estimate. Price 5–10% above your minimum to allow room for negotiation — standard practice in the Nigerian market.',
  },
  {
    q: 'Do car prices differ between Lagos, Abuja, and Port Harcourt?',
    a: 'Yes. Lagos typically sees the highest prices due to market volume and faster buyer demand. Abuja is close behind. Port Harcourt and other cities tend to be 5–10% lower for most models.',
  },
  {
    q: 'How accurate is an AI car valuation in Nigeria?',
    a: 'Our AI valuation uses Gemini Vision to identify your exact car from the photo, then cross-references real Nigerian market data to produce a Naira price range. It\'s a reliable starting point — treat it as a benchmark, not a contract price, since final value depends on negotiation and buyer inspection.',
  },
];

export default function EvaluateUsedCarPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-5">
              <Sparkles className="h-3 w-3" />
              AI-Powered · Free
            </span>
            <h1
              className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}
            >
              WHAT IS YOUR<br />
              <span className="text-amber-400">CAR WORTH?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Upload a photo — get an instant market valuation in your own currency, powered by real listing data and AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-amber-400" /> Photo analysis
              </span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Nigeria · US · UK · and more</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Free</span>
            </div>
          </div>
        </div>

        {/* ── Valuation widget ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <EvaluateCarClient />
          </div>
        </div>

        {/* ── SEO content ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          {/* What affects valuation */}
          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">
              Understanding Value
            </p>
            <h2
              className="font-black uppercase text-foreground leading-none mb-6"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}
            >
              WHAT DETERMINES YOUR CAR&apos;S PRICE IN NIGERIA?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUATION_FACTORS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Long-form editorial content */}
          <section className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            <h2
              className="font-black uppercase text-foreground not-prose leading-none mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}
            >
              CAR VALUATION IN NIGERIA: THE COMPLETE GUIDE
            </h2>

            <p>
              Nigeria&apos;s used car market is one of the largest in sub-Saharan Africa — <strong className="text-foreground">over a million vehicles change hands every year</strong>, with the market valued at approximately $1.18 billion USD in 2025 and growing. Yet despite this scale, accurate pricing remains a challenge. There is no single, universally accepted valuation standard, and the gap between what sellers expect and what buyers are willing to pay is often wide.
            </p>

            <p>
              Whether you&apos;re selling a 2016 Toyota Camry in Lagos or a 2014 Honda Accord in Abuja, knowing your car&apos;s true market value is the most important step before you list it. Price too high and your listing collects dust. Price too low and you leave hundreds of thousands of Naira on the table.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Tokunbo vs. Nigerian Used: The Price Gap</h3>
            <p>
              The most significant pricing divide in the Nigerian car market is between <strong className="text-foreground">Tokunbo (foreign-used)</strong> and <strong className="text-foreground">Nigerian-used</strong> vehicles. Tokunbo cars — typically imported from the United States, Canada, or Japan — command a 20–40% premium over locally used equivalents of the same make, model, and year. The reason is straightforward: Tokunbo cars tend to have lower mileage, more consistent maintenance histories, and fewer signs of Nigeria&apos;s tough road conditions.
            </p>
            <p>
              However, a clean Nigerian-used car with &quot;first body&quot; status — meaning one careful owner, no accidents, and full documentation — can sometimes achieve prices approaching the Tokunbo equivalent. The key is honesty about condition and completeness of paperwork.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">How Naira Exchange Rate Affects Car Prices</h3>
            <p>
              Nigeria imports the vast majority of its used vehicles, which means car prices are directly linked to the Naira/USD exchange rate. When the Naira weakens — as it did significantly in 2023 and 2024 — the landed cost of Tokunbo cars rises sharply, pushing market prices up. With the Naira stabilising near ₦1,436/$ in early 2026, prices have begun to moderate slightly, but remain historically elevated compared to pre-2023 levels.
            </p>
            <p>
              This means valuations from 2022 or earlier are unreliable guides to current market prices. Always use current market data — like our AI valuation tool, which is calibrated to your selected country&apos;s live market conditions.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">How Location Affects Car Value</h3>
            <p>
              Car prices in Nigeria are not uniform across the country. Lagos, as the commercial capital and largest port city, typically sees the highest prices due to greater buyer density and faster transaction velocity. Abuja prices are close behind, driven by high-income government workers and corporate buyers. Port Harcourt, Kano, and other cities generally run 5–10% below Lagos pricing for equivalent vehicles.
            </p>
            <p>
              Import and logistics costs also vary. Cars cleared through Apapa or Tin Can Island ports in Lagos carry different clearing fees than those brought in via Cotonou. Our valuation tool lets you specify your city so the estimate reflects your actual market.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">The Role of Documentation in Car Value</h3>
            <p>
              In the Nigerian market, <strong className="text-foreground">complete and genuine vehicle documents are non-negotiable for maximum value</strong>. Buyers — rightly — discount cars with incomplete paperwork because the risk of legal complications in ownership transfer is real. For Tokunbo cars, the original customs duty receipt and clearing documents are essential. For Nigerian-used cars, a clean chain of ownership and valid FRSC registration significantly reduce buyer hesitation.
            </p>
            <p>
              Missing documents can reduce your car&apos;s achievable price by 15–25%, sometimes more. If your papers are incomplete, resolve that before listing — the cost of documentation is usually far less than the discount buyers will demand.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Most Valuable Car Brands in Nigeria</h3>
            <p>
              Toyota consistently dominates the Nigerian market in both volume and resale value, led by the Camry, Corolla, Hilux, Land Cruiser, and Prado. Honda Accord and Civic are close behind. Lexus (particularly the RX, ES, and GX) holds its value well at the premium end. Mercedes-Benz E-Class and C-Class remain popular but depreciate faster than Japanese brands due to higher maintenance costs.
            </p>
            <p>
              Chinese brands — Haval, Chery, BYD, and GAC — are growing rapidly in market share but currently experience faster depreciation as the resale market for these vehicles is still maturing. If resale value matters to you, Japanese brands remain the safest bet.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">
              Common Questions
            </p>
            <h2
              className="font-black uppercase text-foreground leading-none mb-6"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}
            >
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details
                  key={q}
                  className="group border border-border rounded-xl overflow-hidden bg-card"
                >
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Related tools */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              More Free Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/auto-loan-calculator', label: 'Auto Loan Calculator',     color: 'emerald' },
                { href: '/tools/import-duty-calculator', label: 'Import Duty Calculator', color: 'blue' },
                { href: '/tools/vin-checker',            label: 'VIN Checker',            color: 'violet' },
              ].map(({ href, label, color }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}