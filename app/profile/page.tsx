'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase, Listing } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AuthModal } from '@/components/auth/AuthModal';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User, FileText, MessageSquare, Plus, Star, Shield,
  Bell, Settings, Phone, MessageCircle, Mail, Edit, ChevronRight, Clock
} from 'lucide-react';

export default function ProfilePage() {
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const router = useRouter();

  const loadUserData = useCallback(async () => {
    if (!user) return;

    const [listingsRes, requestsRes, reviewsRes] = await Promise.all([
      supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false }),
      supabase
        .from('requests')
        .select('*')
        .eq('email', user.email)
        .order('created_at', { ascending: false }),
      supabase
        .from('reviews')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false })
    ]);

    if (listingsRes.data) {
      setListings(listingsRes.data as any);
    }

    if (requestsRes.data) {
      setRequests(requestsRes.data);
    }

    if (reviewsRes.data) {
      setReviews(reviewsRes.data);
      setReviewCount(reviewsRes.data.length);
      if (reviewsRes.data.length > 0) {
        const totalRating = reviewsRes.data.reduce((sum, r: any) => sum + r.rating, 0);
        setUserRating(totalRating / reviewsRes.data.length);
      }
    }

    setDataLoaded(true);
  }, [user]);

  useEffect(() => {
    if (user && !dataLoaded) {
      loadUserData();
    }
  }, [user, dataLoaded, loadUserData]);

  if (authLoading) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          defaultMode="signin"
        />
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-lg text-gray-600 mb-4">Please sign in to view your profile</p>
            <Button onClick={() => {
              localStorage.setItem('auth_return_url', '/profile');
              setShowAuthModal(true);
            }}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pendingListings = listings.filter(l => l.status === 'pending').length;
  const approvedListings = listings.filter(l => l.status === 'approved').length;

  const MenuItem = ({ href, icon: Icon, title, subtitle, badge, comingSoon }: any) => (
    <Link href={comingSoon ? '#' : href}>
      <button
        disabled={comingSoon}
        className={`w-full flex items-center justify-between p-4 bg-card border rounded-lg transition-all ${
          comingSoon
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:shadow-md hover:border-primary'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-3 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {badge > 0 && (
            <span className="bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
              {badge}
            </span>
          )}
          {!comingSoon && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </div>
      </button>
    </Link>
  );

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 mb-20">
      <Card className="mb-8 overflow-hidden">
        <div className="bg-primary p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold text-white mb-3">{profile?.full_name || user.email}</h2>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {profile?.phone_verified && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Phone Verified
                  </span>
                )}
                {profile?.id_verified && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    ID Verified
                  </span>
                )}
                {profile?.dealer_verified && (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    Dealer Verified
                  </span>
                )}
              </div>
              {profile?.business_name && (
                <p className="text-primary-foreground/80 mb-2">{profile.business_name}</p>
              )}
              <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Member since {profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'}</span>
                </div>
                {reviewCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{userRating.toFixed(1)} ({reviewCount} reviews)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/profile/edit')}
            className="mt-4 bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <CardContent className="p-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-primary/10 rounded-lg">
              <p className="text-2xl font-bold text-primary">{listings.length}</p>
              <p className="text-sm text-muted-foreground">Total Listings</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{approvedListings}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
            <div className="text-center p-4 bg-yellow-500/10 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{pendingListings}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-foreground px-2">Manage Your Account</h3>

        <MenuItem
          href="/profile/listings"
          icon={FileText}
          title="My Listings"
          subtitle="Manage, edit, or mark cars as sold"
          badge={listings.length}
        />

        <MenuItem
          href="/profile/requests"
          icon={MessageSquare}
          title="My Requests"
          subtitle="Vehicle requests you've made"
          badge={requests.length}
        />

        <MenuItem
          href="/profile/reviews"
          icon={Star}
          title="My Reviews"
          subtitle="Reviews from buyers"
          badge={reviewCount}
        />

        <MenuItem
          href="/add-listing"
          icon={Plus}
          title="Post a Car"
          subtitle="Create a new listing"
          badge={0}
        />

        <MenuItem
          href="/profile/featured"
          icon={Star}
          title="Promotions / Featured Listings"
          subtitle="Boost your listing visibility"
          badge={0}
          comingSoon={true}
        />

        <MenuItem
          href="/profile/verification"
          icon={Shield}
          title="Verification"
          subtitle="Get verified to increase buyer trust"
          badge={0}
        />

        <MenuItem
          href="/profile/notifications"
          icon={Bell}
          title="Notifications"
          subtitle="View your notifications"
          badge={0}
          comingSoon={true}
        />

        <MenuItem
          href="/profile/settings"
          icon={Settings}
          title="Settings"
          subtitle="Account preferences"
          badge={0}
        />

<div className="border-t border-border my-6"></div>

        <h3 className="text-lg font-semibold text-foreground px-2">Support</h3>

        <Card>
          <CardContent className="pt-6">
            <h4 className="font-semibold text-foreground mb-4">Contact Customer Care</h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/2349032047288"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg hover:bg-green-500/20 transition-colors"
              >
                <MessageCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp Support</p>
                  <p className="text-sm text-muted-foreground">Fastest response time</p>
                </div>
              </a>

              <a
                href="tel:09032047288"
                className="flex items-center gap-3 p-3 bg-primary/10 border border-primary/20 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">09032047288</p>
                </div>
              </a>

              <a
                href="mailto:help.nairaautos@gmail.com"
                className="flex items-center gap-3 p-3 bg-muted border border-border rounded-lg hover:bg-muted/80 transition-colors"
              >
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Email Support</p>
                  <p className="text-sm text-muted-foreground">help.nairaautos@gmail.com</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Button variant="destructive" onClick={signOut} className="w-full mt-6">
          Sign Out
        </Button>
      </div>
    </div>
  );
}
