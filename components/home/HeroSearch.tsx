'use client';

import { useState, useRef } from 'react';
import { Search, Camera, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { ValuationInline } from '@/components/valuation/ValuationFlow';

const POPULAR_BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel', 'MG',
  'Chery', 'BYD', 'Haval', 'GAC', 'JAC', 'Innoson',
  'MAN', 'Scania', 'Hino', 'FUSO', 'Sinotruk', 'Shacman', 'Dongfeng', 'Foton',
  'Yutong', 'King Long', 'Higer', 'Ashok Leyland',
  'Yamaha', 'Bajaj', 'TVS', 'Haojue',
  'Other',
];

const VEHICLE_TYPES = ['SUV', 'Saloon', 'Truck', 'Bus', 'Van', 'Wagon', 'Coupe', 'Convertible'];

export function HeroSearch() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [selectedBrand, setSelectedBrand] = useState(searchParams.get('brand') || '');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showValuation, setShowValuation] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const valuationRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.length > 1) {
      const searchLower = value.toLowerCase();
      const brandMatches = POPULAR_BRANDS.filter(b => b.toLowerCase().includes(searchLower));
      const typeMatches = VEHICLE_TYPES.filter(t => t.toLowerCase().includes(searchLower));
      setSuggestions([...brandMatches, ...typeMatches].slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const performSearch = async () => {
    if (searchTerm.trim()) {
      await supabase.from('search_keywords').insert({ user_id: user?.id || null, search_term: searchTerm.trim() });
    }
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (selectedBrand) params.set('brand', selectedBrand);
    router.push(`/search?${params.toString()}`);
  };

  const handleSearch = () => performSearch();
  const handleSuggestionClick = (suggestion: string) => { setSearchTerm(suggestion); setShowSuggestions(false); performSearch(); };
  const handleBrandSelect = (brand: string) => { setSelectedBrand(brand); performSearch(); };

  return (
    <>
      {/* ── Hero — intentionally always dark; video background requires it ── */}
      <div className="relative h-[100svh] max-h-[700px] min-h-[560px] overflow-hidden bg-[#080C10]">

        <div className="absolute inset-0 md:left-[38%]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover">
            <source src="/home-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#080C10] via-[#080C10]/75 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080C10] to-transparent" />
        </div>

        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-emerald-500/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 h-full max-w-screen-xl mx-auto px-4 sm:px-6 flex flex-col justify-start pt-[12vh] md:pt-[7vh] gap-5">

          <span className="inline-flex items-center gap-1.5 w-fit bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
            <Sparkles className="h-3 w-3" />
            Video-Verified Listings
          </span>

          <h1
            className="font-black uppercase leading-[0.9] tracking-tight text-white"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(36px, 5.5vw, 76px)' }}
          >
            FIND YOUR NEXT CAR.<br />
            <span className="text-emerald-400">ZERO GUESSWORK.</span>
          </h1>

          <p className="text-white/50 text-base md:text-lg font-light max-w-sm leading-relaxed">
            Every listing backed by video proof. Browse, compare, and buy with full confidence.
          </p>

          <div className="w-full max-w-[480px]">
            <div className="flex bg-white/[0.05] border border-white/[0.08] rounded-xl p-1">
              <button
                onClick={() => setActiveTab('buy')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === 'buy' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                Buy a Car
              </button>
              <button
                onClick={() => setActiveTab('sell')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold tracking-wide transition-all ${activeTab === 'sell' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
              >
                Sell a Car
              </button>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-md border border-white/[0.08] border-t-0 rounded-b-xl p-3 space-y-2.5">
              {activeTab === 'buy' ? (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25 h-4 w-4 pointer-events-none" />
                    <Input
                      placeholder="Search by brand, model, or type..."
                      value={searchTerm}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                      className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/25 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-500/50 transition-all min-w-0"
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-xl mt-1.5 overflow-hidden shadow-2xl z-10">
                        {suggestions.map((s, i) => (
                          <button key={i} onClick={() => handleSuggestionClick(s)} className="w-full text-left px-4 py-2.5 hover:bg-emerald-500/10 text-foreground text-sm transition-colors">
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 min-w-0">
                    <Select value={selectedBrand} onValueChange={handleBrandSelect}>
                      <SelectTrigger className="h-11 bg-white/5 border-white/10 text-white/50 focus:border-emerald-500/50 min-w-0">
                        <SelectValue placeholder="Select Brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {POPULAR_BRANDS.map(b => (
                          <SelectItem key={b} value={b}><span className="truncate block max-w-[200px]">{b}</span></SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button onClick={handleSearch} className="h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20 transition-all">
                      Search
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-2.5">
                  <Button onClick={() => router.push('/add-listing')} className="w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white font-bold tracking-wide shadow-lg shadow-emerald-500/20">
                    + Create Listing
                  </Button>
                  <Button onClick={() => router.push('/sell-for-me')} variant="outline" className="w-full h-11 font-bold border-emerald-500/35 bg-emerald-500/8 text-white hover:bg-emerald-500/15 hover:border-emerald-500/60 tracking-wide">
                    Sell for Me
                  </Button>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => { setShowValuation(v => !v); setTimeout(() => valuationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); }}
            className="inline-flex items-center gap-2 w-fit bg-amber-400 hover:bg-amber-300 text-gray-900 text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-amber-400/25 hover:shadow-amber-400/40 transition-all"
          >
            <Camera className="h-4 w-4" />
            {showValuation ? 'Hide Valuation' : 'Evaluate My Car — Free'}
          </button>
        </div>
      </div>

      {/* ── Valuation panel — theme-aware ── */}
      {showValuation && (
        <div ref={valuationRef} className="bg-background border-b border-border">
          <div className="max-w-2xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-emerald-500" />
                <p className="text-sm font-semibold text-foreground">Instant Car Valuation — Naira Autos</p>
              </div>
              <button onClick={() => setShowValuation(false)} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                ✕ Close
              </button>
            </div>
            <ValuationInline onClose={() => setShowValuation(false)} />
          </div>
        </div>
      )}
    </>
  );
}