// app/api/admin/approve-listing/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { uploadVideoToYouTube } from '@/lib/uploadToYouTube';

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { listingId } = await request.json();

    if (!listingId) {
      return NextResponse.json({ error: 'listingId is required' }, { status: 400 });
    }

    const { data: listing, error: fetchError } = await supabase
      .from('listings')
      .select('*, profiles(*)')
      .eq('id', listingId)
      .single();

    if (fetchError || !listing) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
    }

    const { error: updateError } = await supabase
      .from('listings')
      .update({ status: 'approved', approved_at: new Date().toISOString() })
      .eq('id', listingId);

    if (updateError) throw updateError;

    // Generate social post if not exists
    let socialPostGenerated = null;
    console.log(`[approve] Checking social_post - current value: "${listing.social_post}"`);
    if (!listing.social_post) {
      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace('/supabase', '')}/api/generate-social-post`;
        console.log(`[approve] Calling social post API: ${apiUrl}`);
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ listing_id: listingId }),
        });
        console.log(`[approve] Social post API response status: ${res.status}`);
        if (res.ok) {
          const postData = await res.json();
          console.log(`[approve] Social post API response:`, postData);
          if (postData.social_post) {
            socialPostGenerated = postData.social_post;
          }
        } else {
          console.error(`[approve] Social post API failed: ${res.status}`);
        }
      } catch (socialError: any) {
        console.error('[approve] Social post generation failed:', socialError.message);
      }
    } else {
      console.log(`[approve] Social post already exists, skipping generation`);
    }

    const videoSource =
      listing.video_url ||
      listing.video_storage_url ||
      (Array.isArray(listing.video_urls) && listing.video_urls.length > 0
        ? listing.video_urls[0]
        : null);

    console.log(`[approve] videoSource: ${videoSource}`);

    let youtubeResult = null;

    if (videoSource) {
      try {
        youtubeResult = await uploadVideoToYouTube({
          id: listing.id,
          video_storage_url: videoSource,
          title: listing.title,
          year: listing.year,
          brand: listing.brand || listing.make,
          model: listing.model,
          price: listing.price,
          description: listing.description,
        });

        if (youtubeResult) {
          // Replace Supabase URL with YouTube URL in video_url (plain text)
          await supabase
            .from('listings')
            .update({ video_url: youtubeResult.youtubeUrl })
            .eq('id', listingId);

          console.log(`[approve] video_url updated to: ${youtubeResult.youtubeUrl}`);
        }
      } catch (ytError: any) {
        console.error('[approve] YouTube upload failed (non-blocking):', ytError.message);
      }
    } else {
      console.log(`[approve] no video on listing ${listingId}, skipping`);
    }

    return NextResponse.json({
      success: true,
      message: 'Listing approved successfully',
      youtubeUploaded: !!youtubeResult,
      youtubeUrl: youtubeResult?.youtubeUrl || null,
      socialPostGenerated: !!socialPostGenerated,
    });

  } catch (error: any) {
    console.error('Approve listing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to approve listing' },
      { status: 500 }
    );
  }
}