import { Metadata } from 'next';
import { getNigerianUsedCars } from '@/lib/listing-cache';
import ListingsGrid from '@/components/listinggrid/listinggrid';

const BASE_URL = 'https://naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Nigerian Used Cars for Sale in Nigeria | Fairly Used Cars | Naira Autos';
  const description =
    'Browse Nigerian used (fairly used) cars for sale. Find locally used vehicles with verifiable history. Browse Toyota, Honda, Mercedes, BMW and more. Verified sellers across Lagos, Abuja, Port Harcourt.';
  const keywords =
    'Nigerian used cars, fairly used cars Nigeria, local used cars, buy Nigerian car, used car Lagos, fairly used Toyota Nigeria, second hand cars Nigeria, car for sale Nigeria';

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/nigerian-used-cars`, siteName: 'Naira Autos' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/nigerian-used-cars` },
    robots: { index: true, follow: true },
  };
}

export default async function NigerianUsedCarsPage() {
  const { listings, total } = await getNigerianUsedCars();

  return (
    <>
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-emerald-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Nigerian Used
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Nigerian Used Cars{' '}
              <span className="text-emerald-400">for Sale</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Browse {total}+ fairly used Nigerian cars with verifiable ownership history. These
              are locally driven vehicles — you can inspect them in person, check their service
              records, and confirm registration history before buying.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Listings', value: `${total}+` },
                { label: 'Locally Driven', value: '100%' },
                { label: 'Verifiable Docs', value: 'Always' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-emerald-400 font-[family-name:var(--font-barlow-condensed)]">{s.value}</p>
                  <p className="text-muted-foreground dark:text-white/40 text-xs uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ListingsGrid listings={listings} total={total} />

      <section className="bg-[#080C10] dark:bg-[#080C10] bg-muted border-t border-border dark:border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-sm text-muted-foreground dark:text-white/50 leading-relaxed">
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Nigerian Used vs Tokunbo — Which is Better?
              </h2>
              <p>
                Nigerian used cars (also called "Naija used" or "fairly used") have a known local
                history and no import customs complications. Tokunbo cars come with lower mileage
                but may have hidden history from abroad. For buyers on a budget who want
                traceability, Nigerian used is often the better choice.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Documents to Request
              </h2>
              <p>
                Always ask for the vehicle&apos;s Certificate of Ownership (C of O), current
                registration papers, roadworthiness certificate, and insurance. For high-value
                purchases, a VIN check and pre-purchase inspection from a certified mechanic is
                strongly recommended before any payment is made.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Selling a Nigerian Used Car?
              </h2>
              <p>
                List your fairly used car on Naira Autos in minutes. Upload photos, add a video
                walk-around to earn a Video Verified badge, and get an instant AI valuation to
                price it right. Reach buyers across Lagos, Abuja, Port Harcourt and nationwide —
                all for free.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
