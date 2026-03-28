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
    });

  } catch (error: any) {
    console.error('Approve listing error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to approve listing' },
      { status: 500 }
    );
  }
}