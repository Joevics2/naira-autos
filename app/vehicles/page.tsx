import type { Metadata } from 'next';
import Link from 'next/link';
import { Car, Truck, Bus, Bike } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Car Parts & Problems by Type | Naira Autos',
  description: 'Browse cars, vans, buses, trucks, and motorcycles by type. Get common problems, spare parts info, and ownership guides for every brand and model.',
};

const VEHICLE_TYPES = [
  { name: 'Cars', slug: 'cars', icon: Car, description: 'Sedans, SUVs, Coupes' },
  { name: 'Vans', slug: 'vans', icon: Truck, description: 'Mini buses, Cargo vans' },
  { name: 'Buses', slug: 'buses', icon: Bus, description: 'Coaster, Bus' },
  { name: 'Trucks', slug: 'trucks', icon: Truck, description: 'Pickup, Tipper, Trailer' },
  { name: 'Motorcycles', slug: 'motorcycles', icon: Bike, description: 'Bikes, Scooters' },
];

export default function CarPricesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span className="text-foreground font-medium">/</span>
          <span className="text-foreground font-medium">Vehicle Info</span>
        </nav>

        <h1
          className="font-black uppercase text-foreground mb-4 leading-none"
          style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(32px, 4vw, 56px)' }}
        >
          Parts, Problems <span className="text-emerald-500">&amp;</span> Maintenance
        </h1>
        <p className="text-muted-foreground text-sm mb-8 max-w-xl">
          Choose a vehicle type to browse by brand, get spare parts and maintenance info, and find common problems for your model.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {VEHICLE_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <Link
                key={type.slug}
                href={`/${type.slug}`}
                className="flex flex-col items-center justify-center p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
              >
                <Icon className="h-10 w-10 text-emerald-500 mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-foreground">{type.name}</span>
                <span className="text-xs text-muted-foreground mt-1">{type.description}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
