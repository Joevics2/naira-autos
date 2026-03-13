'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquarePlus, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function RequestsSection() {
  const [requestCount, setRequestCount] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkApprovedRequests();
  }, []);

  const checkApprovedRequests = async () => {
    const { count } = await supabase
      .from('requests')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved');
    setRequestCount(count || 0);
  };

  return (
    <section className="py-10 bg-muted">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-2xl overflow-hidden border border-border bg-background p-6 md:p-10">

          {/* Decorative glow — subtle in light mode, visible in dark */}
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="max-w-lg">
              <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">
                Can't find what you need?
              </p>
              <h2
                className="font-black uppercase text-foreground leading-tight mb-3"
                style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(24px, 3vw, 38px)' }}
              >
                Let Sellers Come to You
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Post a vehicle request and let verified sellers reach out with exactly what you're looking for.
                {requestCount !== null && requestCount > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium"> {requestCount} active requests</span>
                )} waiting for sellers right now.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <button
                onClick={() => router.push('/requests/create')}
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
              >
                <MessageSquarePlus className="h-4 w-4" />
                Post a Request
              </button>
              <button
                onClick={() => router.push('/requests')}
                className="inline-flex items-center justify-center gap-2 border border-border hover:border-emerald-500/50 bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm px-6 py-3 rounded-xl transition-all"
              >
                <Search className="h-4 w-4" />
                Browse Requests
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}