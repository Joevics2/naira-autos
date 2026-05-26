import { Metadata } from 'next';
import { getCheapCars } from '@/lib/listing-cache';
import ListingsGrid from '@/components/listinggrid/listinggrid';

const BASE_URL = 'https://naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Cheap Cars for Sale Under ₦5M in Nigeria | Affordable Cars | Naira Autos';
  const description =
    'Find cheap cars for sale under ₦5 million in Nigeria. Budget-friendly options including tokunbo, Nigerian used, and project cars. Great deals on reliable vehicles. Browse affordable cars in Lagos, Abuja and across Nigeria.';
  const keywords =
    'cheap cars for sale, cars under 5 million naira, affordable cars Nigeria, budget cars Lagos, cheap tokunbo cars, cheap used cars Nigeria, low price cars, car under ₦5M Nigeria';

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/cheap-cars`, siteName: 'Naira Autos' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/cheap-cars` },
    robots: { index: true, follow: true },
  };
}

export default async function CheapCarsPage() {
  const { listings, total } = await getCheapCars();

  return (
    <>
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-emerald-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Budget Cars
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Cheap Cars Under{' '}
              <span className="text-emerald-400">₦5 Million</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Browse {total}+ affordable cars for sale in Nigeria priced under ₦5 million. From
              reliable Nigerian-used daily drivers to tokunbo imports, find the best budget cars
              in Lagos, Abuja, Port Harcourt and across the country.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Under ₦5M', value: `${total}+` },
                { label: 'Nigerian Used', value: 'incl.' },
                { label: 'Tokunbo', value: 'incl.' },
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
                Best Cheap Cars in Nigeria
              </h2>
              <p>
                Popular affordable cars in Nigeria include the Toyota Camry (2000–2006), Honda
                Accord (2000–2005), Nissan Sentra, Toyota Corolla, and Hyundai Elantra — all
                commonly available under ₦5 million with good spare parts availability and low
                maintenance costs.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                What to Check Before Buying a Cheap Car
              </h2>
              <p>
                For budget cars, always inspect the engine condition, chassis for rust or
                accident damage, transmission smoothness, and AC functionality. Request a pre-purchase
                inspection from a trusted mechanic before paying. Ask for customs papers on tokunbo
                imports and proof of ownership documents.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Selling a Car Under ₦5M?
              </h2>
              <p>
                List your affordable car on Naira Autos for free and reach thousands of serious
                buyers daily. Add a video walk-around to get a Video Verified badge and sell faster.
                Our AI valuation tool helps you set the right price so your listing doesn&apos;t
                sit too long.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
