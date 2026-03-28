// lib/social-post.ts
// Utility functions for displaying and sharing social posts on the profile/listings page.

/**
 * Substitutes the LISTING_SLUG placeholder with the real listing slug.
 * Call this at display-time, not at save-time.
 *
 * Usage:
 *   const post = resolveSocialPost(listing.social_post, listing.slug)
 */
export function resolveSocialPost(
  rawPost: string | null | undefined,
  slug: string | null | undefined
): string | null {
  if (!rawPost) return null;
  if (!slug) return rawPost; // placeholder stays visible until slug is available
  return rawPost.replace(/LISTING_SLUG/g, slug);
}

/**
 * Triggers on-demand social post generation for an approved listing that has none.
 * Call this from the profile/my-listings page when the user clicks "Get Social Post"
 * on a listing that was approved without one.
 *
 * Usage:
 *   const post = await fetchOrGenerateSocialPost(listing.id, listing.slug)
 */
export async function fetchOrGenerateSocialPost(
  listingId: string,
  slug: string | null
): Promise<string | null> {
  try {
    const res = await fetch('/api/generate-social-post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: listingId }),
    });
    const json = await res.json();
    if (!res.ok || !json.social_post) return null;
    // The API already resolves the slug if it has it from the DB,
    // but we resolve again here in case the client has a fresher slug.
    return resolveSocialPost(json.social_post, slug);
  } catch {
    return null;
  }
}

/**
 * Opens a WhatsApp share sheet with the post text pre-filled.
 */
export function shareToWhatsApp(post: string): void {
  window.open(`https://wa.me/?text=${encodeURIComponent(post)}`, '_blank');
}

/**
 * Copies post text to clipboard. Returns true on success.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}


// ─── INTEGRATION GUIDE ────────────────────────────────────────────────────────
//
// 1. APPROVAL-TIME GENERATION (recommended: call from admin dashboard)
//    When you click "Approve" on a listing in your admin panel, fire:
//
//      await fetch('/api/generate-social-post', {
//        method: 'POST',
//        headers: { 'Content-Type': 'application/json' },
//        body: JSON.stringify({ listing_id: listing.id }),
//      })
//
//    This generates the post + saves it to listings.social_post automatically.
//    The user sees it next time they visit their profile.
//
// 2. PROFILE PAGE — showing the social post per listing
//    In your "My Listings" page, for each listing:
//
//      import { resolveSocialPost, fetchOrGenerateSocialPost } from '@/lib/social-post'
//
//      // At render time:
//      const displayPost = resolveSocialPost(listing.social_post, listing.slug)
//
//      // If listing is approved but no post yet, show a "Generate Post" button:
//      if (listing.status === 'active' && !listing.social_post) {
//        // show button → on click:
//        const post = await fetchOrGenerateSocialPost(listing.id, listing.slug)
//        // update local state with post
//      }
//
// 3. SUPABASE WEBHOOK (optional: fully automatic)
//    In Supabase Dashboard → Database → Webhooks, create a webhook:
//      Table: listings
//      Event: UPDATE
//      Condition: new.status = 'active' AND old.status != 'active' AND new.social_post IS NULL
//      URL: https://yourdomain.com/api/generate-social-post
//      Payload: { "listing_id": "{{record.id}}" }
//    This fires automatically whenever a listing is approved.
//
// 4. DATABASE REQUIREMENT
//    Make sure your listings table has a social_post column:
//      ALTER TABLE listings ADD COLUMN IF NOT EXISTS social_post TEXT;
//    The slug column is used to resolve the LISTING_SLUG placeholder.
//    If your slug is derived from the listing ID + brand/model, resolve it:
//      const slug = `${listing.year}-${listing.brand}-${listing.model}-${listing.id}`
//        .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')