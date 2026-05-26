'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  List, MapPin, Car, Calendar, Wallet, Phone, MessageCircle,
  User, ChevronRight, Clock, Tag, Sparkles
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Request {
  id: string;
  full_name: string;
  phone: string;
  whatsapp: number | null;
  email: string;
  state: string;
  vehicle_type: string;
  brand: string;
  model: string;
  year_from: number | null;
  year_to: number | null;
  budget_min: number | null;
  budget_max: number | null;
  additional_details: string;
  created_at: string;
  status: string;
}

function formatBudget(val: number | null) {
  if (!val) return null;
  if (val >= 1_000_000) return `₦${(val / 1_000_000).toFixed(1)}M`;
  if (val >= 1_000) return `₦${(val / 1_000).toFixed(0)}K`;
  return `₦${val.toLocaleString()}`;
}

function RequestCard({ request, onClick }: { request: Request; onClick: () => void }) {
  const hasBudget = request.budget_min || request.budget_max;
  const hasYear = request.year_from || request.year_to;
  const vehicleName = [request.brand, request.model].filter(Boolean).join(' ') || 'Any Vehicle';

  return (
    <button
      onClick={onClick}
      className="w-full text-left group bg-card border border-border rounded-2xl overflow-hidden hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-500/60 via-emerald-400/30 to-transparent" />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3
              className="font-black uppercase text-foreground leading-tight mb-1.5 truncate"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(18px, 2.5vw, 22px)' }}
            >
              {vehicleName}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <User className="h-3 w-3 shrink-0" />
              <span className="truncate font-medium">{request.full_name}</span>
              <span className="text-border mx-1">·</span>
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">{request.state || 'Any state'}</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground bg-muted px-2 py-1 rounded-full">
              <Clock className="h-2.5 w-2.5" />
              {formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}
            </span>
            <Badge className="text-[10px] font-bold uppercase tracking-wide bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 px-2">
              {request.vehicle_type || 'Vehicle'}
            </Badge>
          </div>
        </div>

        {/* Spec chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hasYear && (
            <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground rounded-full px-3 py-1 border border-border">
              <Calendar className="h-3 w-3" />
              {request.year_from || '?'} – {request.year_to || 'Now'}
            </span>
          )}
          {hasBudget && (
            <span className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-3 py-1 font-semibold border border-emerald-500/20">
              <Wallet className="h-3 w-3" />
              {formatBudget(request.budget_min)} – {formatBudget(request.budget_max) || 'Open'}
            </span>
          )}
          {request.whatsapp && (
            <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-600 dark:text-green-400 rounded-full px-3 py-1 font-semibold border border-green-500/20">
              <MessageCircle className="h-3 w-3" />
              WhatsApp
            </span>
          )}
        </div>

        {/* Description */}
        {request.additional_details && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 leading-relaxed">
            {request.additional_details}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            {request.phone && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Phone className="h-3 w-3" />
                Phone
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:gap-2 transition-all uppercase tracking-wide">
            Contact buyer <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function ViewRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Request | null>(null);

  useEffect(() => { loadRequests(); }, []);

  const loadRequests = async () => {
    const { data } = await supabase
      .from('requests')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setRequests(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 pb-24 md:pb-8">

      {/* Page header */}
      <div className="mb-8">
        <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2 flex items-center gap-1.5">
          <Sparkles className="h-3 w-3" /> Live Requests
        </p>
        <h1
          className="font-black uppercase text-foreground leading-none mb-2"
          style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Buyer Requests
        </h1>
        <p className="text-muted-foreground text-sm">
          {loading
            ? 'Loading requests...'
            : `${requests.length} active request${requests.length !== 1 ? 's' : ''} — have a match? Contact the buyer directly.`}
        </p>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-muted rounded-2xl h-44 animate-pulse border border-border" />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && requests.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-border rounded-2xl bg-muted">
          <div className="p-4 bg-background rounded-full mb-4 border border-border">
            <List className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="font-bold text-foreground mb-1">No active requests</h3>
          <p className="text-sm text-muted-foreground">Check back later for new buyer requests</p>
        </div>
      )}

      {/* Request list */}
      {!loading && requests.length > 0 && (
        <div className="space-y-3">
          {requests.map(request => (
            <RequestCard key={request.id} request={request} onClick={() => setSelected(request)} />
          ))}
        </div>
      )}

      {/* Detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-md rounded-2xl p-0 overflow-hidden border border-border bg-card">
          {selected && (
            <>
              {/* Modal header */}
              <div className="bg-muted border-b border-border px-6 pt-6 pb-4">
                <div className="h-1 w-16 bg-gradient-to-r from-emerald-500 to-emerald-400/30 rounded-full mb-4" />
                <DialogHeader>
                  <DialogTitle
                    className="font-black uppercase text-foreground leading-tight"
                    style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(20px, 3vw, 26px)' }}
                  >
                    {[selected.brand, selected.model].filter(Boolean).join(' ') || 'Any Vehicle'}
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-0 text-xs font-bold uppercase tracking-wide">
                    <Car className="h-3 w-3 mr-1" />
                    {selected.vehicle_type || 'Vehicle'}
                  </Badge>
                  <Badge className="bg-emerald-500 text-white border-0 text-xs font-bold">
                    Active
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDistanceToNow(new Date(selected.created_at), { addSuffix: true })}
                  </span>
                </div>
              </div>

              <div className="px-6 py-5 space-y-5">

                {/* Specs grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-muted border border-border rounded-xl p-3">
                    <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wide font-semibold">
                      <MapPin className="h-3 w-3" /> Location
                    </p>
                    <p className="text-sm font-bold text-foreground">{selected.state || 'Any state'}</p>
                  </div>
                  <div className="bg-muted border border-border rounded-xl p-3">
                    <p className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1 uppercase tracking-wide font-semibold">
                      <Calendar className="h-3 w-3" /> Year Range
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {selected.year_from || '?'} – {selected.year_to || 'Now'}
                    </p>
                  </div>
                  {(selected.budget_min || selected.budget_max) && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 col-span-2">
                      <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1 uppercase tracking-wide font-semibold">
                        <Wallet className="h-3 w-3" /> Budget Range
                      </p>
                      <p className="text-base font-black text-emerald-700 dark:text-emerald-300">
                        {formatBudget(selected.budget_min) || '₦0'} – {formatBudget(selected.budget_max) || 'Open budget'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Additional details */}
                {selected.additional_details && (
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2 flex items-center gap-1">
                      <Tag className="h-3 w-3" /> Additional Details
                    </p>
                    <p className="text-sm text-foreground leading-relaxed bg-muted border border-border rounded-xl p-3">
                      {selected.additional_details}
                    </p>
                  </div>
                )}

                {/* Contact */}
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1">
                    <User className="h-3 w-3" /> Contact Buyer
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground mb-3">
                      <div className="w-7 h-7 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                      </div>
                      <span className="font-semibold">{selected.full_name}</span>
                    </div>

                    {selected.whatsapp && (
                      <a
                        href={`https://wa.me/${selected.whatsapp}?text=Hi%20${encodeURIComponent(selected.full_name)}%2C%20I%20have%20a%20${encodeURIComponent([selected.brand, selected.model].filter(Boolean).join(' ') || 'vehicle')}%20that%20matches%20your%20request.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between gap-2 bg-green-500 hover:bg-green-600 text-white rounded-xl px-4 py-3 transition-all hover:scale-[1.01] shadow-lg shadow-green-500/20"
                      >
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm font-bold">Message on WhatsApp</span>
                        </div>
                        <span className="text-xs opacity-70 font-mono">{selected.whatsapp}</span>
                      </a>
                    )}

                    {selected.phone && (
                      <a
                        href={`tel:${selected.phone}`}
                        className="flex items-center justify-between gap-2 bg-muted hover:bg-muted/80 border border-border hover:border-emerald-500/40 text-foreground rounded-xl px-4 py-3 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-bold">Call Buyer</span>
                        </div>
                        <span className="text-xs text-muted-foreground font-mono">{selected.phone}</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}