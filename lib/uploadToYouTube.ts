// lib/uploadToYouTube.ts
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

let oauth2Client: OAuth2Client | null = null;

function getOAuth2Client(): OAuth2Client {
  if (!oauth2Client) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error('Missing Google OAuth env variables');
    }

    oauth2Client = new OAuth2Client(clientId, clientSecret);

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    console.log('✅ YouTube OAuth loaded from ENV');
  }
  return oauth2Client;
}

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars');
  }

  return createClient(supabaseUrl, supabaseServiceKey);
}

export async function uploadVideoToYouTube(listing: {
  id: string;
  video_urls?: string[] | null;
  video_r2_key?: string | null;
  video_storage_url?: string | null;
  title?: string;
  year?: number | string;
  brand?: string;
  make?: string;
  model?: string;
  price?: number;
  description?: string;
}): Promise<{ videoId: string; youtubeUrl: string } | null> {

  const videoSource =
    (Array.isArray(listing.video_urls) && listing.video_urls.length > 0
      ? listing.video_urls[0]
      : null) ||
    listing.video_r2_key ||
    listing.video_storage_url;

  if (!videoSource) {
    console.log('⚠️ No video source on listing. Skipping YouTube upload.');
    return null;
  }

  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

  const tempFilePath = path.join(tmpDir, `video-${listing.id}.mp4`);

  try {
    let storagePath: string;

    if (videoSource.startsWith('http://') || videoSource.startsWith('https://')) {
      const match = videoSource.match(/\/listing-videos\/(.+)/);
      if (!match) {
        throw new Error(`Could not extract storage path from URL: ${videoSource}`);
      }
      storagePath = decodeURIComponent(match[1]);
    } else {
      storagePath = videoSource;
    }

    console.log(`📥 Downloading from Supabase: listing-videos/${storagePath}`);

    const supabase = getSupabaseClient();

    const { data, error } = await supabase.storage
      .from('listing-videos')
      .download(storagePath);

    if (error) {
      throw new Error(`Supabase download failed for "${storagePath}": ${error.message}`);
    }

    const buffer = Buffer.from(await data.arrayBuffer());
    fs.writeFileSync(tempFilePath, buffer);
    console.log(`✅ Downloaded (${(buffer.length / 1024 / 1024).toFixed(1)} MB)`);

    const brandOrMake = listing.brand || listing.make || '';
    const displayTitle = [
      listing.year,
      brandOrMake,
      listing.model,
      listing.price ? `- ₦${Number(listing.price).toLocaleString()}` : '',
      '| naira.autos',
    ]
      .filter(Boolean)
      .join(' ')
      .trim()
      .slice(0, 100);

    const youtube = google.youtube({ version: 'v3', auth: getOAuth2Client() });

    console.log(`🚀 Uploading to YouTube: "${displayTitle}"`);

    const response = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title: displayTitle,
          description: [
            listing.description || '',
            '',
            '✅ Verified listing on naira.autos',
            `🔗 https://www.naira.autos/listing/${listing.id}`,
          ].join('\n'),
          tags: [
            'naira.autos',
            'used cars Nigeria',
            'buy car Nigeria',
            brandOrMake,
            listing.model || '',
          ].filter(Boolean),
          categoryId: '2',
        },
        status: {
          privacyStatus: 'public',
        },
      },
      media: {
        body: fs.createReadStream(tempFilePath),
        mimeType: 'video/mp4',
      },
    });

    const videoId = response.data.id!;
    const youtubeUrl = `https://youtu.be/${videoId}`;

    console.log(`✅ Uploaded! Video ID: ${videoId}`);
    console.log(`🔗 ${youtubeUrl}`);

    const { error: deleteError } = await supabase.storage
      .from('listing-videos')
      .remove([storagePath]);

    if (deleteError) {
      console.warn(`⚠️ Could not delete from Supabase: ${deleteError.message}`);
    } else {
      console.log('🗑️ Video deleted from Supabase Storage');
    }

    return { videoId, youtubeUrl };

  } catch (error: any) {
    console.error('❌ YouTube upload failed:', error.message);
    if (error.response?.data) {
      console.error('Google API error details:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  } finally {
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
      console.log('🗑️ Temp file cleaned up');
    }
  }
}