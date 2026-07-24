import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ChevronRight } from 'lucide-react';
import { EvaluateCarClient } from './client';

export const metadata: Metadata = {
  title: 'Free AI Car Valuation Worldwide | How Much Is My Car Worth? | Naira Autos',
  description:
    'Get a free AI-powered used car valuation in your own currency. Upload a photo and get an instant price estimate calibrated to your country — covering 50+ markets across North America, Europe, Africa, the Middle East, Asia, and Latin America.',
  keywords: [
    'car valuation',
    'how much is my car worth',
    'used car valuation calculator',
    'car price estimate by country',
    'free car valuation',
    'AI car valuation',
    'car market value calculator',
    'sell my car price check',
    'used car price checker worldwide',
    'car worth calculator',
    'value my car',
    'resale value',
    'used car values',
  ].join(', '),
  openGraph: {
    title: 'Free AI Car Valuation — What Is Your Car Worth?',
    description:
      'AI-powered used car valuation in your own currency, covering 50+ countries. Upload a photo and get an instant estimate. 100% free.',
    url: 'https://naira.autos/evaluate-used-car',
    siteName: 'Naira Autos',
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: 'https://naira.autos/evaluate-used-car',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Free AI Car Valuation Worldwide',
  description:
    'Free AI-powered car valuation tool. Instant used-car price estimate in your own currency, calibrated to your country\'s market across 50+ supported countries.',
  url: 'https://naira.autos/evaluate-used-car',
  dateModified: '2026-07-24',
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
      'Upload a photo of your car and get an instant AI-powered market valuation, calibrated to your selected country\'s live market rates.',
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
        name: 'How much is my used car worth?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on make, model, year, trim, mileage, and condition, plus what similar cars are actually selling for in your country right now. Upload a photo above and select your country — our AI identifies your car and returns a price range in your local currency, cross-referenced against current listings in that market.',
        },
      },
      {
        '@type': 'Question',
        name: 'What factors affect used car valuation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The main factors are: (1) brand and model — some hold resale value far better than others depending on the market. (2) Year, trim, and mileage. (3) Body and paint condition. (4) Mechanical condition and service history. (5) Completeness of title, registration, and ownership documents. (6) Local supply and demand — the same car can be worth a different amount in different countries and cities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does my country affect the valuation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, significantly. Import duties, local demand for specific brands, currency strength, and the size of the used-car market all shift prices between countries. Our tool supports 50+ countries and returns an estimate in the correct local currency, tuned to that market rather than a single global average.',
        },
      },
      {
        '@type': 'Question',
        name: 'How accurate is an AI car valuation?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our tool uses Gemini Vision to identify the exact make, model, year, and trim from your photo, then cross-references real listing data for your selected country to produce a price range rather than a single number. Treat it as a well-informed starting point, not a contract price — final value always depends on an in-person inspection and negotiation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the car valuation tool really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. There is no charge, no account required, and no limit on how many times you can use it.',
        },
      },
    ],
  },
};

const VALUATION_FACTORS = [
  {
    icon: TrendingUp,
    title: 'Brand & Resale Value',
    body: 'Resale strength varies by market — Toyota and Honda hold value across most regions, while premium German brands depreciate faster in markets with high maintenance costs. Local demand matters as much as the badge.',
  },
  {
    icon: Shield,
    title: 'Mileage & History',
    body: 'Lower mileage and a documented service history are the two strongest signals of a well-kept car everywhere in the world. A clean history can be worth more than a slightly newer model year.',
  },
  {
    icon: CheckCircle2,
    title: 'Title & Documentation',
    body: 'A clean title, valid registration, and complete ownership paperwork are non-negotiable for maximum value in every market. Salvage titles, import complications, or missing paperwork typically cut achievable price by 15–25%.',
  },
  {
    icon: AlertCircle,
    title: 'Condition',
    body: 'A clean exterior with no dents, rust, or faded paint, paired with a mechanically sound engine, consistently adds 10–15% to market value versus a visibly worn equivalent.',
  },
];

const FAQ_ITEMS = [
  {
    q: 'How much is my used car worth?',
    a: 'It depends on make, model, year, trim, mileage, and condition — plus what similar cars are actually selling for in your country right now. Upload a photo above and select your country for an AI estimate in your local currency.',
  },
  {
    q: 'What factors affect used car valuation?',
    a: 'Brand and model, year and trim, mileage, body and mechanical condition, completeness of title/registration documents, and local supply and demand in your specific market.',
  },
  {
    q: 'Does my country affect the valuation?',
    a: 'Yes — import duties, local brand demand, currency strength, and market size all shift prices between countries. We support 50+ countries and price in your local currency rather than a single global average.',
  },
  {
    q: 'How do I price my car correctly before selling?',
    a: 'Use our free valuation tool for an AI-powered estimate, then check active local listings for comparable cars. Pricing 5–10% above your minimum acceptable price is standard practice in most markets, to leave room for negotiation.',
  },
  {
    q: 'How accurate is an AI car valuation?',
    a: 'It uses Gemini Vision to identify your exact car from the photo, then cross-references real listing data for your selected country. Treat it as a reliable starting point, not a contract price — final value depends on inspection and negotiation.',
  },
  {
    q: 'Is the car valuation tool free?',
    a: 'Yes — no charge, no account, and no limit on how many times you can use it.',
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
              <span>50+ countries · Every major currency</span>
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
              WHAT DETERMINES A USED CAR&apos;S PRICE?
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
              USED CAR VALUATION: THE COMPLETE GUIDE
            </h2>

            <p>
              Knowing your car&apos;s true market value is the single most important step before you list it for sale, trade it in, or negotiate a purchase — anywhere in the world. Price too high and your listing sits unsold. Price too low and you leave real money on the table. The challenge is that <strong className="text-foreground">"market value" is not one number</strong> — it shifts by country, by currency, by local demand for a specific brand, and by the individual car&apos;s history and condition.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Why the Same Car Is Worth Different Amounts in Different Countries</h3>
            <p>
              A five-year-old Toyota Corolla in good condition can be worth a very different amount in Germany, the UAE, Kenya, and Brazil — even before you convert currencies. Import duties and local taxes on used vehicles vary enormously between countries. Some markets have strong domestic demand for specific brands (Japanese brands in much of Africa and Southeast Asia, for example), which supports higher resale prices. Others have larger new-car markets that pull buyers away from used cars, softening resale values. This is why a single global price guide doesn&apos;t work — valuation has to be calibrated per country.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Mileage and Service History</h3>
            <p>
              Across virtually every market, mileage and documented service history are the two strongest predictors of a car&apos;s condition beyond what a photo can show. A lower-mileage car with full service records typically commands a meaningful premium over a higher-mileage equivalent of the same year, even if both look similar in photos. Missing or incomplete service history is one of the fastest ways to lose negotiating leverage as a seller.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Title, Registration, and Documentation</h3>
            <p>
              In every country we support, <strong className="text-foreground">clean, complete paperwork is non-negotiable for maximum value</strong>. Buyers reasonably discount cars with salvage titles, incomplete ownership chains, unpaid import duties, or missing registration, because the risk of complications during transfer is real regardless of jurisdiction. Resolving documentation issues before listing is almost always cheaper than the discount buyers will otherwise demand.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Condition and Presentation</h3>
            <p>
              A clean exterior with no dents, rust, or faded paint, combined with a mechanically sound engine and transmission, consistently adds to achievable price versus a visibly worn equivalent — this holds true whether the car is being sold in Lagos, London, or Los Angeles. Simple, low-cost fixes (a thorough clean, minor scratch touch-ups, fixing a dead headlight bulb) often pay for themselves several times over in the final sale price.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Currency and Market Timing</h3>
            <p>
              In countries that rely heavily on imported used vehicles, car prices are closely linked to exchange rate movements — a weaker local currency raises the landed cost of imports and pushes used-car prices up, while a stronger currency has the opposite effect. This means a valuation from a year or two ago can be a poor guide to current prices. Always check against current market data rather than outdated price guides or a friend&apos;s sale from last year.
            </p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">How This Tool Works</h3>
            <p>
              Upload a clear photo of your car and select your country. Our AI (Gemini Vision) identifies the make, model, year, and trim from the image, then cross-references current listing data for your selected market to produce a price range in your local currency — not just a single guess. The result includes the specific factors that influenced the estimate, so you can see why the number came out the way it did. It&apos;s designed as a fast, free starting point for negotiation, not a substitute for an in-person inspection.
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
