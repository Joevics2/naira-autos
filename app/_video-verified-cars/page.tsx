import { Metadata } from 'next';
import { getVideoVerifiedCars } from '@/lib/listing-cache';
import ListingsGrid from '@/components/listinggrid/listinggrid';

const BASE_URL = 'https://naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Video Verified Cars for Sale in Nigeria | Cars with Video Tours | Naira Autos';
  const description =
    'Browse video verified cars for sale in Nigeria. Every listing includes video tour of the vehicle. Buy with confidence knowing exactly what you are getting. Verified Toyota, Honda, Mercedes, BMW and more.';
  const keywords =
    'video verified cars Nigeria, cars with video tour, video car listing Nigeria, verified car sale, car video inspection, buy car with video, video tour cars Lagos';

  return {
    title,
    description,
    keywords,
    openGraph: { title, description, type: 'website', url: `${BASE_URL}/video-verified-cars`, siteName: 'Naira Autos' },
    twitter: { card: 'summary', title, description },
    alternates: { canonical: `${BASE_URL}/video-verified-cars` },
    robots: { index: true, follow: true },
  };
}

export default async function VideoVerifiedCarsPage() {
  const { listings, total } = await getVideoVerifiedCars();

  return (
    <>
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-sky-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Video Verified
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Cars with{' '}
              <span className="text-sky-400">Video Tours</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Every listing here includes a real video walk-around of the vehicle. See the
              exterior, interior, engine bay, and hear the car start — before you leave your
              house. {total}+ video-verified cars available across Nigeria right now.
            </p>
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Video Listings', value: `${total}+` },
                { label: 'See Before You Go', value: '✓' },
                { label: 'Fewer Surprises', value: 'Always' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-sky-400 font-[family-name:var(--font-barlow-condensed)]">{s.value}</p>
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
                Why Video Verified Matters
              </h2>
              <p>
                Car scams and misleading photo listings are a real problem in Nigeria. Video
                verification means you see the actual vehicle in motion — not staged photos. Watch
                the engine start, see the dashboard, hear for unusual sounds, and check the body
                condition before making any trip or payment.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                What a Good Video Should Show
              </h2>
              <p>
                A thorough car listing video should cover: engine cold start, all four sides of
                the exterior, interior and dashboard, boot space, under the bonnet, and any visible
                damage or repairs. Use our AI Mechanic (Axion) to analyse video footage and flag
                potential issues before you travel to inspect.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Get Your Listing Video Verified
              </h2>
              <p>
                Sellers with video-verified listings sell up to 3× faster on Naira Autos. Upload a
                short walk-around video when creating your listing and earn the Video Verified badge
                automatically. Your listing will be featured on this page and ranked higher in
                search results.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
