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

  // New 3 Categories
  { name: 'Tokunbo', image: '/tokunbo.png', url: '/search?condition=foreign_used' },
  { name: 'Nigerian Used', image: '/nigerian-used.png', url: '/search?condition=nigerian_used' },
  { name: 'Distress Sale', image: '/urgent-sale.png', url: '/search?urgent=1' },
];

export function BrowseByType() {
  return (
    <section className="py-10 bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">

        {/* Header with Browse All */}
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

          <Link 
            href="/search" 
            className="text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 text-xs font-semibold tracking-wide uppercase transition-colors flex items-center gap-1"
          >
            Browse all <span className="text-base leading-none">→</span>
          </Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {categories.map((category) => (
            <Link key={category.name} href={category.url} className="group">
              <div className="relative rounded-2xl overflow-hidden aspect-square border border-border bg-muted transition-all duration-300 group-hover:border-emerald-500/50 group-hover:scale-[1.04] group-hover:shadow-lg group-hover:shadow-emerald-500/10">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Bigger red text - no shadow */}
                <p className="absolute bottom-3 left-0 right-0 text-center text-xs md:text-sm font-bold text-red-500 px-1 leading-tight">
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