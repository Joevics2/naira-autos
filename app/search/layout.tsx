import { Metadata } from 'next';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = searchParams;
  const brand = params.brand as string | undefined;
  const state = params.state as string | undefined;
  const type = params.type as string | undefined;
  const price = params.price as string | undefined;
  const q = params.q as string | undefined;

  let title = 'Search Used Cars in Nigeria | Naira Autos';
  let description = 'Browse thousands of verified cars for sale in Nigeria. Filter by brand, location, price, and vehicle type. Find the best deals on Toyota, Honda, Mercedes, BMW, and more.';
  let keywords = 'used cars Nigeria, buy cars Lagos, car dealers Nigeria, second hand cars, car marketplace Nigeria';

  const filters: string[] = [];

  if (brand) {
    filters.push(brand);
    keywords += `, ${brand} Nigeria, ${brand} cars for sale`;
  }
  if (state) {
    filters.push(state.replace('-', ' '));
    keywords += `, cars in ${state.replace('-', ' ')}`;
  }
  if (type) {
    filters.push(type);
    keywords += `, ${type}s for sale`;
  }
  if (price) {
    filters.push(price.replace('-', ' '));
  }
  if (q) {
    filters.push(q);
    keywords += `, ${q}`;
  }

  if (filters.length > 0) {
    title = `${filters.join(' ')} Cars for Sale in Nigeria | Naira Autos`;
    description = `Find ${filters.join(' ')} cars for sale in Nigeria. Browse verified listings with video tours. ${filters.join(', ')} at competitive prices.`;
  }

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    alternates: {
      canonical: 'https://nairaautos.com/search',
    },
  };
}

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}