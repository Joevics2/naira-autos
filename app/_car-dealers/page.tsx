import { Metadata } from 'next';
import { supabase } from '@/lib/supabase';
import DealersClient from './DealersClient';

const BASE_URL = 'https://www.naira.autos';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Car Dealers in Nigeria | Verified Car Dealers | Naira Autos';
  const description =
    'Browse verified car dealers across Nigeria. Find licensed car dealers in Lagos, Abuja, Port Harcourt and other cities. Buy from trusted dealers with verified inventory. Toyota, Honda, Mercedes, BMW dealers and more.';
  const keywords =
    'car dealers Nigeria, car dealers Lagos, verified car dealers Nigeria, best car dealers Abuja, car dealership Nigeria, car shop Lagos, buy from dealer Nigeria, car dealer port harcourt';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${BASE_URL}/car-dealers`,
      siteName: 'Naira Autos',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: `${BASE_URL}/car-dealers`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export type Dealer = {
  id: string;
  business_name: string | null;
  full_name: string | null;
  phone: string | null;
  whatsapp: string | null;
  id_verified: boolean;
  dealer_verified: boolean;
  seller_description: string | null;
  bio: string | null;
  cars_sold_count: number;
  created_at: string;
};

async function getDealers(): Promise<Dealer[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select(
      'id, business_name, full_name, phone, whatsapp, id_verified, dealer_verified, seller_description, bio, cars_sold_count, created_at'
    )
    .eq('role', 'dealer')
    .order('dealer_verified', { ascending: false })
    .order('cars_sold_count', { ascending: false });

  if (error) {
    console.error('Error fetching dealers:', error);
    return [];
  }

  return (data as Dealer[]) ?? [];
}

export default async function CarDealersPage() {
  const dealers = await getDealers();
  const verifiedCount = dealers.filter((d) => d.dealer_verified || d.id_verified).length;

  return (
    <>
      {/* ── SEO-rich server-rendered content ── */}
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-background border-b border-border dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <p className="text-emerald-500 text-sm font-semibold tracking-widest uppercase mb-3 font-[family-name:var(--font-barlow-condensed)]">
              Dealer Directory
            </p>
            <h1 className="font-[family-name:var(--font-barlow-condensed)] text-4xl md:text-5xl lg:text-6xl font-bold text-foreground dark:text-white uppercase leading-tight tracking-tight mb-4">
              Verified Car Dealers <br className="hidden md:block" />
              <span className="text-emerald-400">in Nigeria</span>
            </h1>
            <p className="text-muted-foreground dark:text-white/60 text-base md:text-lg leading-relaxed mb-6">
              Browse {dealers.length}+ professional car dealers on Naira Autos —{' '}
              {verifiedCount} verified. Find trusted dealerships in Lagos, Abuja, Port Harcourt, and
              across Nigeria with live inventory, direct WhatsApp contact, and transparent pricing.
            </p>

            {/* Trust stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { label: 'Listed Dealers', value: `${dealers.length}+` },
                { label: 'Verified', value: `${verifiedCount}` },
                { label: 'Cities Covered', value: '20+' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-emerald-400 font-[family-name:var(--font-barlow-condensed)]">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground dark:text-white/40 text-xs uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive client section ── */}
      <DealersClient dealers={dealers} />

      {/* ── Bottom SEO content block ── */}
      <section className="bg-[#080C10] dark:bg-[#080C10] bg-muted border-t border-border dark:border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 text-sm text-muted-foreground dark:text-white/50 leading-relaxed">
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Buy from a Verified Dealer
              </h2>
              <p>
                Naira Autos verifies dealers by confirming their CAC registration, identity
                documents, and business address. Buying from a verified dealer means you get a
                legitimate bill of sale, accurate vehicle history, and a point of contact if issues
                arise after purchase.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Car Dealers Across Nigeria
              </h2>
              <p>
                Our directory covers dealerships in Lagos (Lekki, Ikeja, Victoria Island), Abuja
                (Wuse, Gwarinpa, Garki), Port Harcourt, Enugu, Kano, and more. Whether you&apos;re
                looking for Tokunbo imports, brand-new cars, or fairly-used local vehicles, find a
                dealer near you.
              </p>
            </div>
            <div>
              <h2 className="text-foreground dark:text-white font-semibold text-base mb-3 font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
                Are You a Car Dealer?
              </h2>
              <p>
                List your dealership on Naira Autos for free. Reach thousands of buyers searching
                for cars daily. Get a verified badge, showcase your full inventory with video
                listings, and receive direct enquiries via WhatsApp and phone — all in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
