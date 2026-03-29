'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, Listing, Review } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  MapPin, Gauge, Fuel, Settings, Car, Play, Heart, Share2,
  AlertTriangle, Star, ShieldCheck, AlertCircle, CheckCircle2,
  XCircle, Calendar, Palette, Tag, Layers, Users, RefreshCw,
  FileText, X, MessageCircle, Mail, Facebook, Twitter,
} from 'lucide-react';

// ── Constants ─────────────────────────────────────────────────────────────────
const REASON_LABELS: Record<string, string> = {
  upgrading: 'Upgrading to a bigger vehicle',
  relocating: 'Relocating',
  need_cash: 'Need Cash',
  company_disposal: 'Company Disposal',
  other: 'Other',
};

const CONDITION_LABELS: Record<string, string> = {
  nigerian_used: 'Nigerian Used',
  foreign_used: 'Foreign Used',
  brand_new: 'Brand New',
};

const OWNERSHIP_LABELS: Record<string, string> = {
  owner: 'Owner',
  agent: 'Agent',
  dealer: 'Dealer',
};

const VERIFICATION_BADGE: Record<string, string> = {
  premium_verified: 'Premium Verified',
  video_verified: 'Video Verified',
  basic: 'Basic Listing',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const formatListingDate = (dateStr: string) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

const formatRelativeDate = (dateStr: string) => {
  if (!dateStr) return '';
  const diffDays = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const getYouTubeEmbedUrl = (url: string) => {
  const vid = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([^\/&?\n]*)/)?.[1];
  return vid ? `https://www.youtube.com/embed/${vid}` : null;
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  listing: Listing & { profiles?: any };
}

// ── Main Client Component ─────────────────────────────────────────────────────
export function ListingDetailClient({ listing }: Props) {
  const router = useRouter();
  const [similarListings, setSimilarListings] = useState<Listing[]>([]);
  const [sellerReviews, setSellerReviews] = useState<Review[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [submittingReport, setSubmittingReport] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const id = listing.id;

  const allMedia = [
    ...(listing.images || []),
    ...(listing.video_url ? ['video'] : []),
  ];

  useEffect(() => {
    incrementViewCount();
    loadSimilarListings(listing.brand, listing.model, listing.vehicle_type, id);
    if (listing.user_id) loadSellerReviews(listing.user_id);
    checkIfSavedLocal();
  }, [id]);

  useEffect(() => { checkIfSavedLocal(); }, [user]);

  const checkIfSavedLocal = () => {
    if (user) checkIfSaved();
    else {
      const saved = JSON.parse(localStorage.getItem('saved_listings') || '[]');
      setIsSaved(saved.includes(id));
    }
  };

  const loadSimilarListings = async (brand: string, model: string, vehicleType: string, currentId: string) => {
    const seen = new Set<string>();
    const result: Listing[] = [];
    const WANT = 3;
    const fetchTier = async (query: any) => {
      if (result.length >= WANT) return;
      const { data } = await query.limit(WANT * 2);
      for (const item of data || []) {
        if (result.length >= WANT) break;
        if (!seen.has(item.id)) { seen.add(item.id); result.push(item); }
      }
    };
    await fetchTier(supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').eq('brand', brand).eq('model', model).neq('id', currentId));
    await fetchTier(supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').eq('brand', brand).neq('model', model).neq('id', currentId));
    await fetchTier(supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').eq('vehicle_type', vehicleType).neq('brand', brand).neq('id', currentId));
    await fetchTier(supabase.from('listings').select('*, profiles(*)').eq('status', 'approved').neq('id', currentId).order('created_at', { ascending: false }));
    setSimilarListings(result);
  };

  const loadSellerReviews = async (sellerId: string) => {
    const { data } = await supabase.from('reviews').select('*, profiles!reviews_reviewer_id_fkey(*)')
      .eq('seller_id', sellerId).order('created_at', { ascending: false }).limit(3);
    if (data) setSellerReviews(data as Review[]);
  };

  const incrementViewCount = async () => {
    const { data: cur } = await supabase.from('listings').select('views_count').eq('id', id).maybeSingle();
    if (cur) await supabase.from('listings').update({ views_count: cur.views_count + 1 }).eq('id', id);
  };

  const checkIfSaved = async () => {
    if (!user) return;
    const { data } = await supabase.from('saved_listings').select('id').eq('user_id', user.id).eq('listing_id', id).maybeSingle();
    setIsSaved(!!data);
  };

  const toggleSave = async () => {
    if (!user) {
      const saved = JSON.parse(localStorage.getItem('saved_listings') || '[]');
      if (isSaved) {
        localStorage.setItem('saved_listings', JSON.stringify(saved.filter((s: string) => s !== id)));
        setIsSaved(false); toast({ title: 'Removed from saved' });
      } else {
        saved.push(id); localStorage.setItem('saved_listings', JSON.stringify(saved));
        setIsSaved(true); toast({ title: 'Saved successfully' });
      }
      return;
    }
    if (isSaved) {
      await supabase.from('saved_listings').delete().eq('user_id', user.id).eq('listing_id', id);
      if (listing) await supabase.from('listings').update({ saves_count: Math.max(0, (listing as any).saves_count - 1) }).eq('id', id);
      setIsSaved(false); toast({ title: 'Removed from saved' });
    } else {
      await supabase.from('saved_listings').insert({ user_id: user.id, listing_id: id });
      if (listing) await supabase.from('listings').update({ saves_count: (listing as any).saves_count + 1 }).eq('id', id);
      setIsSaved(true); toast({ title: 'Saved successfully' });
    }
  };

  const handleContactClick = async () => {
    await supabase.from('listings').update({ contact_clicks: (listing as any).contact_clicks + 1 }).eq('id', id);
  };

  const handleShare = () => setShowShareSheet(true);
  const shareToWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(`Check out this ${listing.year} ${listing.brand} ${listing.model} for ₦${listing.price.toLocaleString()} on Naira Autos: ${window.location.href}`)}`, '_blank');
  const shareToFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${listing.year} ${listing.brand} ${listing.model} for ₦${listing.price.toLocaleString()} on Naira Autos`)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  const shareToEmail = () => window.open(`mailto:?subject=${encodeURIComponent(`${listing.year} ${listing.brand} ${listing.model} — ₦${listing.price.toLocaleString()} on Naira Autos`)}&body=${encodeURIComponent(`Hi,\n\nFound this on Naira Autos:\n\n${listing.year} ${listing.brand} ${listing.model}\nPrice: ₦${listing.price.toLocaleString()}\n\n${window.location.href}`)}`, '_self');
  const copyLink = async () => { await navigator.clipboard.writeText(window.location.href); toast({ title: 'Link copied!' }); setShowShareSheet(false); };
  const handleCopyListingId = async () => { await navigator.clipboard.writeText(listing.id); toast({ title: 'Listing ID copied!' }); };

  const handleSubmitReport = async () => {
    if (!reportReason) { toast({ title: 'Please select a reason', variant: 'destructive' }); return; }
    setSubmittingReport(true);
    try {
      await supabase.from('reports').insert({ listing_id: listing?.id, user_id: user?.id ?? null, reason: reportReason, description: reportDescription, status: 'pending' });
      toast({ title: 'Report submitted!' }); setShowReportDialog(false); setReportReason(''); setReportDescription('');
    } catch { toast({ title: 'Failed to submit report', variant: 'destructive' }); }
    finally { setSubmittingReport(false); }
  };

  // ── Derived ────────────────────────────────────────────────────────────────
  const isVideoItem = (item: string) => item === 'video';
  const currentItem = allMedia[currentMediaIndex];
  const isCurrentVideo = isVideoItem(currentItem as string);
  const mainImage = listing.images?.[0] ?? 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800';
  const sellerId = listing.profiles?.id;
  const conditionLabel = listing.condition ? (CONDITION_LABELS[listing.condition] || listing.condition) : null;
  const ownershipLabel = listing.ownership_type ? (OWNERSHIP_LABELS[listing.ownership_type] || listing.ownership_type) : null;
  const location = [listing.city_area, listing.location_lga, listing.location_state].filter(Boolean).join(', ');

  type QuickTile = { icon: React.ReactNode; label: string };
  const quickBarTiles: QuickTile[] = [
    listing.condition    ? { icon: <Car className="h-5 w-5" />,      label: conditionLabel! }                          : null,
    listing.fuel_type    ? { icon: <Fuel className="h-5 w-5" />,     label: listing.fuel_type }                        : null,
    listing.transmission ? { icon: <Settings className="h-5 w-5" />, label: listing.transmission }                     : null,
    listing.mileage != null ? { icon: <Gauge className="h-5 w-5" />, label: `${listing.mileage.toLocaleString()} km` } : null,
  ].filter(Boolean) as QuickTile[];

  type DetailTile = { icon: React.ReactNode; label: string; value: string };
  const detailTiles: DetailTile[] = [
    listing.year             ? { icon: <Calendar className="h-4 w-4" />,  label: 'Year',             value: listing.year.toString() }  : null,
    listing.body_type        ? { icon: <Layers className="h-4 w-4" />,    label: 'Body Type',        value: listing.body_type }        : null,
    listing.trim             ? { icon: <Tag className="h-4 w-4" />,       label: 'Trim',             value: listing.trim }             : null,
    listing.color            ? { icon: <Palette className="h-4 w-4" />,   label: 'Colour',           value: listing.color }            : null,
    listing.ownership_type   ? { icon: <Users className="h-4 w-4" />,     label: 'Ownership',        value: ownershipLabel! }          : null,
    listing.accident_history ? { icon: <RefreshCw className="h-4 w-4" />, label: 'Accident History', value: listing.accident_history } : null,
    (listing.faq_documents_complete != null) ? {
      icon: <FileText className="h-4 w-4" />, label: 'Documents',
      value: listing.faq_documents_complete === 'yes' ? 'Complete ✓' : `Incomplete — ${listing.faq_missing_documents ?? 'see report'}`,
    } : null,
  ].filter(Boolean) as DetailTile[];

  type FaqRow = { key: string; label: string; status: string; positiveText: string; negativeText: string; positiveIsYes: boolean };
  const faqItems: FaqRow[] = [
    listing.faq_ac_working ? { key: 'ac', label: 'Is the Air Conditioning working?', status: listing.faq_ac_working, positiveText: 'Yes — AC is fully functional.', negativeText: `No — ${listing.faq_ac_issue ?? 'AC is not working.'}`, positiveIsYes: true } : null,
    listing.faq_engine_condition ? { key: 'engine', label: 'Is the engine in good condition?', status: listing.faq_engine_condition, positiveText: 'Yes — Engine is in excellent condition.', negativeText: `No — ${listing.faq_engine_issue ?? 'Engine has issues.'}`, positiveIsYes: true } : null,
    listing.faq_was_repainted ? { key: 'repainted', label: 'Has the vehicle been repainted?', status: listing.faq_was_repainted, positiveText: 'No — Original factory paint.', negativeText: 'Yes — The vehicle has been repainted.', positiveIsYes: false } : null,
    listing.faq_documents_complete ? { key: 'documents', label: 'Are all vehicle documents complete?', status: listing.faq_documents_complete, positiveText: 'Yes — All documents are complete and valid.', negativeText: `No — Missing: ${listing.faq_missing_documents ?? 'some documents'}`, positiveIsYes: true } : null,
    listing.faq_oil_consumption ? { key: 'oil', label: 'Does the vehicle consume oil between services?', status: listing.faq_oil_consumption, positiveText: 'No — Normal oil consumption.', negativeText: 'Yes — The vehicle consumes oil between services.', positiveIsYes: false } : null,
  ].filter(Boolean) as FaqRow[];
  const hasFaq = faqItems.length > 0 || !!listing.faq_other_issues;

  return (
    <div className="min-h-screen bg-white dark:bg-[#0F1419] text-gray-900 dark:text-[#E7E9EA]">

      {/* ── Breadcrumbs ── */}
      <div className="px-4 pt-3">
        <Breadcrumbs items={[
          { label: 'Search', href: '/search' },
          { label: listing.brand, href: `/search?brand=${encodeURIComponent(listing.brand)}` },
          { label: `${listing.year} ${listing.model}` },
        ]} />
      </div>

      {/* ── HEADER ── */}
      <div className="bg-[#1D3A2E] px-4 h-12 flex items-center justify-between sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => router.push('/search')} className="text-white text-xl flex-shrink-0">←</button>
          <div className="min-w-0">
            <p className="text-[11px] text-white/50 leading-none mb-0.5">Back to Search</p>
            <p className="text-sm text-white font-semibold truncate leading-none">{listing.brand} {listing.model} {listing.year}</p>
          </div>
        </div>
        <button onClick={handleShare} className="p-2 text-white hover:bg-white/10 rounded-full flex-shrink-0 transition-colors" aria-label="Share listing">
          <Share2 className="h-5 w-5" />
        </button>
      </div>

      {/* ── GALLERY ── */}
      <div className="relative bg-black">
        {isCurrentVideo ? (
          <div className="aspect-video w-full">
            {listing.video_url && (
              <iframe
                src={getYouTubeEmbedUrl(listing.video_url) ?? ''}
                className="w-full h-full"
                title={`${listing.year} ${listing.brand} ${listing.model} video walkthrough`}
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
          </div>
        ) : (
          <img
            src={currentItem as string || mainImage}
            alt={`${listing.year} ${listing.brand} ${listing.model} ${listing.color ?? ''} — photo ${currentMediaIndex + 1} — for sale in ${location}`}
            className="w-full h-72 object-cover"
            loading={currentMediaIndex === 0 ? 'eager' : 'lazy'}
          />
        )}
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          {listing.video_url && <span className="bg-yellow-500 text-black px-2.5 py-1 rounded-md text-xs font-bold">📹 Video</span>}
          {(listing as any).urgent_sale && <span className="bg-red-500 text-white px-2.5 py-1 rounded-md text-xs font-bold">🔥 Urgent</span>}
        </div>
        <div className="absolute bottom-4 left-4 bg-[#258055] text-white px-3 py-1.5 rounded-lg text-xs font-semibold">
          ✓ {VERIFICATION_BADGE[(listing as any).verification_level] ?? 'Verified'}
        </div>
        <div className="absolute top-4 right-4">
          <button
            onClick={toggleSave}
            aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
            className={`w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow transition-colors ${isSaved ? 'text-red-500' : 'text-gray-600'}`}
          >
            <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
        {allMedia.length > 1 && !isCurrentVideo && (
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs">
            {currentMediaIndex + 1} / {allMedia.length}
          </div>
        )}
      </div>

      {/* ── THUMBNAILS ── */}
      {allMedia.length > 1 && (
        <div className="flex gap-2 p-2.5 overflow-x-auto bg-gray-100 dark:bg-[#1A1F25] border-b border-gray-200 dark:border-[#2F3336]">
          {allMedia.map((media, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentMediaIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`flex-shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${
                idx === currentMediaIndex
                  ? 'border-[#258055] ring-2 ring-[#258055]/30 opacity-100'
                  : 'border-gray-300 dark:border-transparent opacity-60 hover:opacity-80'
              }`}
            >
              {isVideoItem(media)
                ? <div className="w-full h-full bg-black flex items-center justify-center"><Play className="h-5 w-5 text-white" /></div>
                : <img src={media as string} alt="" aria-hidden="true" className="w-full h-full object-cover" />}
            </button>
          ))}
        </div>
      )}

      {/* ── PAGE BODY ── */}
      <div className="px-4">

        {/* ── TITLE + LOCATION ── */}
        <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
          <h1 className="text-xl font-bold leading-tight text-gray-900 dark:text-[#E7E9EA]">
            {listing.brand} {listing.model} {listing.year}
          </h1>
          {(listing.location_state || listing.location_lga) && (
            <div className="flex items-center gap-1.5 mt-2">
              <MapPin className="h-4 w-4 text-[#258055] flex-shrink-0" />
              <span className="text-sm font-medium text-gray-700 dark:text-[#C9D1D9]">{location}</span>
            </div>
          )}
          <div className="flex gap-4 text-xs text-gray-500 dark:text-[#71767B] mt-2 flex-wrap">
            {(listing as any).views_count > 0 && <span>👁 {(listing as any).views_count} views</span>}
            {(listing as any).saves_count > 0 && <span>❤ {(listing as any).saves_count} saves</span>}
            {listing.created_at && <span>📅 Listed {formatListingDate(listing.created_at)}</span>}
          </div>
        </div>

        {/* ── PRICE ── */}
        <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl font-bold text-[#258055]">₦{listing.price.toLocaleString()}</span>
            {(listing as any).negotiable && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#258055]/10 text-[#258055] border border-[#258055]/30">
                Negotiable
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {listing.ownership_type ? (
              <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-[#C9D1D9] text-xs font-medium border border-gray-200 dark:border-transparent">
                {ownershipLabel}
              </span>
            ) : (listing as any).seller_type ? (
              <span className="px-2.5 py-1 rounded-full bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-[#C9D1D9] text-xs font-medium border border-gray-200 dark:border-transparent capitalize">
                {(listing as any).seller_type}
              </span>
            ) : null}
            {(listing as any).urgent_sale && (
              <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">🔥 Urgent Sale</span>
            )}
          </div>
        </div>

        {/* ── CONTACT (sticky) ── */}
        <div className="sticky top-12 bg-white dark:bg-[#0F1419] py-3 border-b border-gray-200 dark:border-[#2F3336] z-40 shadow-sm">
          <div className="grid grid-cols-2 gap-3">
            {listing.profiles?.whatsapp ? (
              <a href={`https://wa.me/${listing.profiles.whatsapp}?text=Hi, I'm interested in your ${listing.year} ${listing.brand} ${listing.model}`}
                target="_blank" rel="noopener noreferrer" onClick={handleContactClick}>
                <Button className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white" size="lg">📲 WhatsApp</Button>
              </a>
            ) : (
              <Button className="w-full bg-[#25D366] text-white" size="lg" disabled>📲 WhatsApp</Button>
            )}
            {listing.profiles?.phone ? (
              <a href={`tel:${listing.profiles.phone}`} onClick={handleContactClick}>
                <Button
                  className="w-full border-2 border-[#258055] text-[#258055] dark:text-[#34D399] hover:bg-[#258055] hover:text-white bg-transparent"
                  variant="outline" size="lg"
                >
                  📞 Call
                </Button>
              </a>
            ) : (
              <Button className="w-full border-2 border-[#258055] text-[#258055] bg-transparent" variant="outline" size="lg" disabled>📞 Call</Button>
            )}
          </div>
        </div>

        {/* ── QUICK HIGHLIGHT BAR ── */}
        {quickBarTiles.length > 0 && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${quickBarTiles.length}, minmax(0, 1fr))` }}>
              {quickBarTiles.map((tile, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-gray-100 dark:bg-[#16191D] rounded-xl border border-gray-200 dark:border-[#2F3336]">
                  <span className="text-[#258055]">{tile.icon}</span>
                  <span className="text-[10px] text-center font-semibold text-gray-700 dark:text-[#C9D1D9] leading-tight">{tile.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── VEHICLE DETAILS ── */}
        {detailTiles.length > 0 && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-[#E7E9EA]">Vehicle Details</h3>
            <div className="grid grid-cols-2 gap-3">
              {detailTiles.map((tile, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-[#16191D] rounded-xl border border-gray-200 dark:border-[#2F3336]">
                  <span className="text-[#258055] flex-shrink-0">{tile.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[10px] text-gray-500 dark:text-[#71767B] uppercase tracking-wide leading-none mb-0.5">{tile.label}</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA] truncate">{tile.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KEY FEATURES ── */}
        {listing.features && listing.features.length > 0 && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-[#E7E9EA]">Key Features</h3>
            <div className="flex flex-wrap gap-2">
              {listing.features.map((feature: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 dark:bg-[#16191D] text-gray-800 dark:text-[#E7E9EA] border border-gray-200 dark:border-[#2F3336]">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── DESCRIPTION ── */}
        {listing.description && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-[#E7E9EA]">Description</h3>
            <p className="text-sm text-gray-700 dark:text-[#C9D1D9] leading-relaxed whitespace-pre-line">{listing.description}</p>
          </div>
        )}

        {/* ── REASON FOR SELLING ── */}
        {(listing as any).reason_for_selling && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <div className="bg-blue-50 dark:bg-[#16191D] border border-blue-200 dark:border-[#2F3336] rounded-xl px-4 py-4">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-blue-500 dark:text-[#71767B] mb-1.5">Reason for Selling</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA]">
                {REASON_LABELS[(listing as any).reason_for_selling] ?? (listing as any).reason_for_selling.replace(/_/g, ' ')}
              </p>
            </div>
          </div>
        )}

        {/* ── CONDITION REPORT ── */}
        {hasFaq && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <h3 className="text-base font-bold mb-1 text-gray-900 dark:text-[#E7E9EA]">🔍 Condition Report</h3>
            <p className="text-xs text-gray-500 dark:text-[#71767B] mb-3">Seller-declared answers about this vehicle</p>
            <div className="bg-gray-100 dark:bg-[#16191D] rounded-xl overflow-hidden divide-y divide-gray-200 dark:divide-[#2F3336] border border-gray-200 dark:border-[#2F3336]">
              {faqItems.map((item) => {
                const isGood = item.positiveIsYes ? item.status === 'yes' : item.status === 'no';
                const isBad = item.positiveIsYes ? item.status === 'no' : item.status === 'yes';
                return (
                  <div key={item.key} className="flex items-start gap-3 px-4 py-3.5">
                    <span className={`mt-0.5 flex-shrink-0 ${isGood ? 'text-green-600' : isBad ? 'text-red-500' : 'text-gray-400'}`}>
                      {isGood ? <CheckCircle2 className="h-4 w-4" /> : isBad ? <XCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    </span>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-[#71767B]">{item.label}</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-[#E7E9EA] mt-0.5">
                        {isGood ? item.positiveText : item.negativeText}
                      </p>
                    </div>
                  </div>
                );
              })}
              {(listing as any).faq_other_issues && (
                <div className="flex items-start gap-3 px-4 py-3.5">
                  <span className="mt-0.5 flex-shrink-0 text-orange-500"><AlertCircle className="h-4 w-4" /></span>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-[#71767B]">Other known issues</p>
                    <p className="text-sm font-medium text-gray-900 dark:text-[#E7E9EA] mt-0.5">{(listing as any).faq_other_issues}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── SELLER INFORMATION ── */}
        {listing.profiles && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-[#E7E9EA]">Seller Information</h3>
            <div className="bg-gray-100 dark:bg-[#16191D] rounded-xl p-4 border border-gray-200 dark:border-[#2F3336]">
              <div className="flex gap-3 items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-[#258055] flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {listing.profiles.profile_photo
                    ? <img src={listing.profiles.profile_photo} alt={listing.profiles.full_name} className="w-full h-full object-cover" />
                    : <span className="text-white text-lg font-bold">{listing.profiles.full_name?.charAt(0) ?? 'S'}</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 dark:text-[#E7E9EA] flex items-center gap-1.5">
                    {listing.profiles.full_name ?? 'Unknown Seller'}
                    {(listing.profiles.dealer_verified || listing.profiles.id_verified) && <span className="text-[#258055] text-sm">✓</span>}
                  </p>
                  {listing.profiles.business_name && (
                    <p className="text-xs text-gray-600 dark:text-[#71767B] mt-0.5">{listing.profiles.business_name}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-[#71767B] capitalize mt-0.5">{ownershipLabel}</p>
                </div>
              </div>
              {sellerReviews.length > 0 && (() => {
                const avg = sellerReviews.reduce((s, r) => s + r.rating, 0) / sellerReviews.length;
                return (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(avg) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-[#E7E9EA]">{avg.toFixed(1)}</span>
                    <span className="text-xs text-gray-500 dark:text-[#71767B]">({sellerReviews.length} review{sellerReviews.length !== 1 ? 's' : ''})</span>
                  </div>
                );
              })()}
              {listing.profiles.created_at && (
                <p className="text-xs text-gray-500 dark:text-[#71767B] mb-3">
                  Member since {new Date(listing.profiles.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </p>
              )}
              {sellerId && (
                <Link href={`/seller/${sellerId}`}>
                  <button className="w-full py-2.5 rounded-lg border border-[#258055] text-[#258055] text-sm font-semibold hover:bg-[#258055]/10 transition-colors">
                    View Seller Profile →
                  </button>
                </Link>
              )}
            </div>
          </div>
        )}

        {/* ── SELLER REVIEWS ── */}
        {sellerReviews.length > 0 && (
          <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-[#E7E9EA]">Reviews</h3>
              {sellerId && <Link href={`/seller/${sellerId}#reviews`} className="text-sm text-[#258055] dark:text-[#1D9BF0]">View all</Link>}
            </div>
            <div className="space-y-3">
              {sellerReviews.slice(0, 2).map((review) => (
                <div key={review.id} className="p-3 bg-gray-100 dark:bg-[#16191D] rounded-xl border border-gray-200 dark:border-[#2F3336]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-[#258055] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{review.profiles?.full_name?.charAt(0) ?? 'R'}</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-900 dark:text-[#E7E9EA]">{review.profiles?.full_name ?? 'Reviewer'}</p>
                      <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} className={`h-3 w-3 ${s <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />)}</div>
                    </div>
                  </div>
                  {review.comment && <p className="text-sm text-gray-600 dark:text-[#71767B]">{review.comment}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SAFETY TIPS ── */}
        <div className="py-5 border-b border-gray-200 dark:border-[#2F3336]">
          <div className="bg-[#258055]/10 border border-[#258055]/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="h-5 w-5 text-[#258055]" />
              <h4 className="font-semibold text-sm text-gray-900 dark:text-[#E7E9EA]">Safety Tips</h4>
            </div>
            <ul className="space-y-2.5 text-sm text-gray-600 dark:text-[#71767B]">
              {['Meet seller in a public place','Inspect the car in daylight','Bring a mechanic if possible','Never pay before seeing the car','Request all vehicle documents','Verify ownership papers before payment'].map(tip => (
                <li key={tip} className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#258055] flex-shrink-0 mt-0.5" /> {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── META ── */}
        <div className="flex justify-between py-3 text-xs text-gray-400 dark:text-[#71767B]">
          <button onClick={handleCopyListingId} className="flex items-center gap-1 hover:text-[#258055] transition-colors">
            ID: {listing.id.slice(0, 8).toUpperCase()} <span className="opacity-60">(tap to copy)</span>
          </button>
          <span>Updated: {formatRelativeDate(listing.updated_at)}</span>
        </div>
        <div className="text-center pb-4">
          <button onClick={() => setShowReportDialog(true)} className="text-gray-400 dark:text-[#71767B] text-sm flex items-center gap-2 mx-auto hover:text-red-500 transition-colors">
            <AlertTriangle className="h-4 w-4" /> Report this listing
          </button>
        </div>

      </div>{/* end px-4 */}

      {/* ── SIMILAR LISTINGS ── */}
      {similarListings.length > 0 && (
        <div className="mt-4 pb-8 px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900 dark:text-[#E7E9EA]">Similar Cars You Might Like</h2>
            <Link href={`/search?vehicle_type=${encodeURIComponent((listing as any).vehicle_type)}`} className="text-xs text-[#258055] dark:text-[#1D9BF0]">See all</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {similarListings.map((car) => {
              const img = car.images?.[0] ?? 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=400';
              const listingSlug = `${car.year ?? 'unknown'}-${(car.brand ?? 'car').toLowerCase().replace(/\s+/g, '-')}-${(car.model ?? 'vehicle').toLowerCase().replace(/\s+/g, '-')}-${car.id}`;
              return (
                <Link key={car.id}
                  href={`/listing/${listingSlug}`}
                  className="flex-shrink-0 w-44 bg-white dark:bg-[#16191D] border border-gray-200 dark:border-[#2F3336] rounded-xl overflow-hidden hover:border-[#258055] hover:shadow-md transition-all">
                  <img
                    src={img}
                    alt={`${car.brand} ${car.model} ${car.year} for sale`}
                    className="w-full h-28 object-cover"
                    loading="lazy"
                  />
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-gray-900 dark:text-[#E7E9EA] truncate mb-0.5">{car.brand} {car.model} {car.year}</p>
                    <p className="text-sm font-extrabold text-[#258055]">₦{car.price.toLocaleString()}</p>
                    {(car.location_lga || car.location_state) && (
                      <p className="text-[10px] text-gray-500 dark:text-[#71767B] mt-1 truncate">
                        📍 {[car.location_lga, car.location_state].filter(Boolean).join(', ')}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* ── REPORT DIALOG ── */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Report Listing</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Reason</Label>
              <select value={reportReason} onChange={e => setReportReason(e.target.value)} className="w-full p-2 border border-gray-300 dark:border-[#2F3336] rounded-md bg-background mt-2 text-gray-900 dark:text-[#E7E9EA]">
                <option value="">Select a reason</option>
                <option value="scam">Scam or fraud</option>
                <option value="fake">Fake listing</option>
                <option value="inappropriate">Inappropriate content</option>
                <option value="sold">Already sold</option>
                <option value="wrong_info">Wrong information</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <Label>Additional Details (optional)</Label>
              <Textarea value={reportDescription} onChange={e => setReportDescription(e.target.value)} placeholder="Provide more details…" className="mt-2" />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowReportDialog(false)} className="flex-1">Cancel</Button>
              <Button onClick={handleSubmitReport} disabled={submittingReport} className="flex-1">
                {submittingReport ? 'Submitting…' : 'Submit Report'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── SHARE SHEET ── */}
      {showShareSheet && (
        <div className="fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowShareSheet(false)} />
          <div className="relative w-full bg-white dark:bg-[#16191D] rounded-t-2xl p-5 pb-10 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-base text-gray-900 dark:text-[#E7E9EA]">Share this listing</h3>
              <button onClick={() => setShowShareSheet(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4 mb-6">
              {[
                { label: 'WhatsApp', bg: 'bg-[#25D366]', fn: shareToWhatsApp, icon: <MessageCircle className="h-7 w-7 text-white" /> },
                { label: 'Facebook', bg: 'bg-[#1877F2]', fn: shareToFacebook, icon: <Facebook className="h-7 w-7 text-white" /> },
                { label: 'Twitter / X', bg: 'bg-black dark:bg-white', fn: shareToTwitter, icon: <Twitter className="h-7 w-7 text-white dark:text-black" /> },
                { label: 'Email', bg: 'bg-gray-400', fn: shareToEmail, icon: <Mail className="h-7 w-7 text-white" /> },
              ].map(({ label, bg, fn, icon }) => (
                <button key={label} onClick={() => { fn(); setShowShareSheet(false); }} className="flex flex-col items-center gap-2">
                  <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center shadow-md`}>{icon}</div>
                  <span className="text-[11px] text-gray-600 dark:text-[#71767B] font-medium">{label}</span>
                </button>
              ))}
            </div>
            <button onClick={copyLink} className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gray-100 dark:bg-[#0F1419] border border-gray-200 dark:border-[#2F3336] hover:bg-gray-200 dark:hover:bg-[#1A1F25] transition-colors">
              <span className="text-sm text-gray-600 dark:text-[#C9D1D9] truncate mr-3 flex-1 text-left">
                {typeof window !== 'undefined' ? window.location.href : ''}
              </span>
              <span className="text-sm font-semibold text-[#258055] flex-shrink-0">Copy link</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}