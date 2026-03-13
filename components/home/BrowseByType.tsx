'use client';

import Link from 'next/link';

const categories = [
  { name: 'Toyota', image: '/toyota.png', url: '/search?brand=Toyota' },
  { name: 'Honda', image: '/honda.png', url: '/search?brand=Honda' },
  { name: 'Lexus', image: '/lexus.png', url: '/search?brand=Lexus' },
  { name: 'Mercedes', image: '/mexedes.png', url: '/search?brand=Mercedes-Benz' },
  { name: 'Cars & SUVs', image: '/cars.png', url: '/search?type=suv' },
  { name: 'Trucks', image: '/trucks.png', url: '/search?type=truck' },
  { name: 'Buses', image: '/buses.png', url: '/search?type=bus' },
  { name: 'Vans', image: '/vans.png', url: '/search?type=van' },
  { name: 'Motorcycles', image: '/bikes.png', url: '/search?type=bike' },
];

export function BrowseByType() {
  return (
    <section className="py-10 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">Explore</p>
            <h2
              className="font-black uppercase text-foreground leading-none"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(26px, 3.5vw, 40px)' }}
            >
              Browse by Type & Brand
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.url} className="group">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-border bg-muted transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-[1.04] group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                {/* Always-on dark gradient so label is readable over any image in both modes */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <p className="absolute bottom-2 left-0 right-0 text-center text-[11px] md:text-xs font-bold text-white drop-shadow-sm px-1 leading-tight">
                  {category.name}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}