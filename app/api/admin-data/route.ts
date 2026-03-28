// app/api/admin/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { uploadVideoToYouTube } from '@/lib/uploadToYouTube';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET → Fetch all admin data
export async function GET() {
  try {
    const [listingsRes, usersRes, requestsRes, settingsRes] = await Promise.all([
      supabase
        .from('listings')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
        .limit(200),

      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),

      supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),

      supabase
        .from('admin_settings')
        .select('strict_image_validation')
        .eq('id', 'global')
        .single(),
    ]);

    return NextResponse.json({
      listings: listingsRes.data || [],
      users: usersRes.data || [],
      requests: requestsRes.data || [],
      settings: settingsRes.data || { strict_image_validation: false },
    });
  } catch (error: any) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}

// POST → Approve listing + YouTube upload
export async function POST(request: NextRequest) {
  try {
    const { action, listingId } = await request.json();

    if (action === 'approve' && listingId) {
      // Fetch listing
      const { data: listing, error: fetchError } = await supabase
        .from('listings')
        .select('*, profiles(*)')
        .eq('id', listingId)
        .single();

      if (fetchError || !listing) {
        return NextResponse.json({ error: 'Listing not found' }, { status: 404 });
      }

      // Update status to approved
      const { error: updateError } = await supabase
        .from('listings')
        .update({
          status: 'approved',
          approved_at: new Date().toISOString(),
        })
        .eq('id', listingId);

      if (updateError) throw updateError;

      // YouTube Upload (non-blocking)
      let youtubeResult = null;
      if (listing.video_r2_key) {
        try {
          youtubeResult = await uploadVideoToYouTube({
            id: listing.id,
            video_r2_key: listing.video_r2_key,
            title: listing.title,
            year: listing.year,
            brand: listing.brand || listing.make,
            model: listing.model,
            price: listing.price,
            description: listing.description,
          });

          // Save YouTube info back to DB
          await supabase
            .from('listings')
            .update({
              youtube_url: youtubeResult.youtubeUrl,
              youtube_id: youtubeResult.videoId,
            })
            .eq('id', listingId);

        } catch (ytError: any) {
          console.error('YouTube upload failed (non-blocking):', ytError.message);
          // Listing is still approved even if YouTube fails
        }
      }

      return NextResponse.json({
        success: true,
        message: 'Listing approved successfully',
        youtubeUploaded: !!youtubeResult,
        youtubeUrl: youtubeResult?.youtubeUrl || null,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });

  } catch (error: any) {
    console.error('Admin API error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}