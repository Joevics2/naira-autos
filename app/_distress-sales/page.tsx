import { Metadata } from 'next';
import { getDistressSales } from '@/lib/listing-cache';
import ListingsGrid from '@/components/listinggrid/listinggrid';

const BASE_URL = 'https://www.naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Distress Car Sales in Nigeria | Urgent Car Sales | Naira Autos';
  const description =
    'Find urgent distress car sales in Nigeria. Quick deals on cars that need to be sold immediately. Great prices on Toyota, Honda, Mercedes, BMW and more. Contact sellers directly.';
  const keywords =
    'distress car sales Nigeria, urgent car sale Lagos, quick car sale Nigeria, distress sale cars, cheap urgent car sale, fast car sale Nigeria, emergency car sale';

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/distress-sales`, siteName: 'Naira Autos' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/distress-sales` },
    robots: { index: true, follow: true },
  };
}

export default async function DistressSalesPage() {
  const { listings, total } = await getDistressSales();

  return (
    <>
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-rose-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Urgent Sales
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Distress Car Sales{' '}
              <span className="text-rose-400">in Nigeria</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              {total}+ cars listed for urgent sale across Nigeria. Sellers are motivated — many
              are relocating, need cash fast, or disposing company vehicles. These deals move
              quickly, so contact sellers early.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Urgent Listings', value: `${total}+` },
                { label: 'Below Market', value: 'Many' },
                { label: 'Contact Direct', value: 'Always' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-rose-400 font-[family-name:var(--font-barlow-condensed)]">{s.value}</p>
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
                What is a Distress Car Sale?
              </h2>
              <p>
                A distress car sale is when a seller needs to sell their vehicle urgently —
                usually due to relocation, financial need, or company fleet disposal. Because
                speed matters more than price, these cars are often listed significantly below
                market value, making them excellent buying opportunities.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                How to Buy an Urgent Sale Car Safely
              </h2>
              <p>
                Even for urgent sales, always verify the vehicle&apos;s documents — proof of
                ownership, customs duty papers for tokunbo cars, and a valid inspection report.
                Use our AI Mechanic tool to check common faults before you meet the seller. Never
                pay without seeing the car in person.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Need to Sell Your Car Fast?
              </h2>
              <p>
                Mark your listing as urgent on Naira Autos and it will appear on this page
                instantly. For the fastest sale, add a video walk-around, set a competitive price
                using our AI valuation tool, and enable WhatsApp enquiries. Or use our Sell For Me
                service — we handle everything.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
