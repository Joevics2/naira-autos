'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BadgeCheck, Phone, MessageCircle, Car, Shield } from 'lucide-react';
import type { Dealer } from './page';

function getInitials(dealer: Dealer): string {
  const name = dealer.business_name || dealer.full_name || '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const AVATAR_COLORS = [
  'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'bg-violet-500/20 text-violet-400 border-violet-500/30',
  'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'bg-rose-500/20 text-rose-400 border-rose-500/30',
];

function getAvatarColor(id: string): string {
  const sum = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

function DealerCard({ dealer }: { dealer: Dealer }) {
  const displayName = dealer.business_name || dealer.full_name || 'Unknown Dealer';
  const initials = getInitials(dealer);
  const avatarColor = getAvatarColor(dealer.id);
  const isVerified = dealer.dealer_verified || dealer.id_verified;
  const description = dealer.seller_description || dealer.bio;

  const waNumber = dealer.whatsapp?.replace(/\D/g, '').replace(/^0/, '234');
  const waLink = waNumber ? `https://wa.me/${waNumber}?text=Hi, I found your dealership on Naira Autos` : null;

  return (
    <div className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.07] hover:border-emerald-500/30 rounded-xl p-5 transition-all duration-200 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-14 h-14 rounded-lg border flex items-center justify-center font-bold text-lg font-[family-name:var(--font-barlow-condensed)] ${avatarColor}`}>
          {initials}
        </div>

        {/* Name + badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-white font-semibold text-sm truncate font-[family-name:var(--font-barlow-condensed)] uppercase tracking-wide">
              {displayName}
            </h2>
            {isVerified && (
              <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
                <BadgeCheck className="w-3 h-3" />
                {dealer.dealer_verified ? 'Dealer Verified' : 'ID Verified'}
              </span>
            )}
          </div>

          {/* Cars sold */}
          {dealer.cars_sold_count > 0 && (
            <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1">
              <Car className="w-3 h-3" />
              {dealer.cars_sold_count} car{dealer.cars_sold_count !== 1 ? 's' : ''} sold
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{description}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        <Link
          href={`/seller/${dealer.id}`}
          className="flex-1 text-center text-xs font-semibold text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors"
        >
          View Listings
        </Link>

        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg px-3 py-2 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        )}

        {dealer.phone && !waLink && (
          <a
            href={`tel:${dealer.phone}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-white/50 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            Call
          </a>
        )}
      </div>
    </div>
  );
}

export default function DealersClient({ dealers }: { dealers: Dealer[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'verified' | 'dealer_verified'>('all');

  const filtered = useMemo(() => {
    let list = dealers;

    if (filter === 'verified') {
      list = list.filter((d) => d.dealer_verified || d.id_verified);
    } else if (filter === 'dealer_verified') {
      list = list.filter((d) => d.dealer_verified);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.business_name?.toLowerCase().includes(q) ||
          d.full_name?.toLowerCase().includes(q) ||
          d.seller_description?.toLowerCase().includes(q) ||
          d.bio?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [dealers, query, filter]);

  const FILTER_OPTIONS: { label: string; value: typeof filter }[] = [
    { label: 'All Dealers', value: 'all' },
    { label: 'Verified', value: 'verified' },
    { label: 'Dealer Certified', value: 'dealer_verified' },
  ];

  return (
    <div className="bg-[#0a0f14] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search dealers by name or description..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 focus:outline-none rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 transition-colors"
            />
          </div>

          <div className="flex gap-2">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                  filter === opt.value
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/20 hover:text-white/70'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p className="text-white/30 text-xs mb-5">
          Showing {filtered.length} dealer{filtered.length !== 1 ? 's' : ''}
          {query && ` for "${query}"`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((dealer) => (
              <DealerCard key={dealer.id} dealer={dealer} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Shield className="w-10 h-10 text-white/10 mb-4" />
            <p className="text-white/30 text-sm">No dealers found</p>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="mt-3 text-emerald-500 text-xs hover:text-emerald-400 underline"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}