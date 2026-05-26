import { Metadata } from 'next';
import { getTokunboCars } from '@/lib/listing-cache';
import ListingsGrid from '@/components/listinggrid/listinggrid';

const BASE_URL = 'https://naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Tokunbo Cars for Sale in Nigeria | Foreign Used Cars | Naira Autos';
  const description =
    'Find verified tokunbo (foreign used) cars for sale in Nigeria. Browse imported cars with video verification, photos, and detailed specs. Best prices on Toyota, Honda, Lexus, Mercedes and more. Buy with confidence.';
  const keywords =
    'tokunbo cars for sale, foreign used cars Nigeria, imported cars Nigeria, tokunbo car Lagos, buy tokunbo car Nigeria, foreign used Toyota, tokunbo Honda, tokunbo Lexus, tokunbo Mercedes, car Nigeria, used cars Nigeria';

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/tokunbo-cars`, siteName: 'Naira Autos' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/tokunbo-cars` },
    robots: { index: true, follow: true },
  };
}

export default async function TokunboCarsPage() {
  const { listings, total } = await getTokunboCars();

  return (
    <>
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-emerald-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Foreign Used
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Tokunbo Cars{' '}
              <span className="text-emerald-400">for Sale in Nigeria</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Browse {total}+ tokunbo (foreign used) cars listed across Nigeria. Imported from the
              USA, Canada, UK, Belgium, and Japan — these vehicles typically have lower mileage and
              better body condition than locally used alternatives. Find verified listings with
              photos, videos, and specs.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Tokunbo Listings', value: `${total}+` },
                { label: 'Import Sources', value: 'USA · UK · JPN' },
                { label: 'Video Verified', value: 'Many' },
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
                What is a Tokunbo Car?
              </h2>
              <p>
                "Tokunbo" is the Nigerian term for foreign-used (imported second-hand) vehicles.
                These cars are typically shipped from the United States, Canada, the United Kingdom,
                Belgium, or Japan. They usually have lower mileage than Nigerian-used equivalents
                and are popular for their better body condition and lower wear.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                How to Verify a Tokunbo Car
              </h2>
              <p>
                Request the car&apos;s customs duty clearance papers and bill of lading. Run a VIN
                check using our free VIN Decoder tool to see the vehicle&apos;s US or UK history —
                accidents, odometer readings, and title status. Always inspect in person and
                request a pre-delivery inspection before payment.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Calculate Your Import Duty
              </h2>
              <p>
                Before buying a tokunbo car still at the port, use our free Import Duty Calculator
                to estimate Nigerian Customs levy, CISS, ECOWAS levy, and port charges. Knowing
                the full landed cost helps you negotiate a fair price and avoid surprises at
                the port.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
