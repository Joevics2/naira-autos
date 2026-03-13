import { supabase } from './supabase';

const SUPABASE_IMAGE_BUCKET = 'media';
const SUPABASE_VIDEO_BUCKET = 'listing-videos';

export async function uploadImageToSupabase(
  file: File,
  bucket: string = SUPABASE_IMAGE_BUCKET
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() || 'jpg';
    const fileName = `listings/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage.from(bucket).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'image/jpeg',
    });

    if (error) {
      console.error('Supabase image upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading image to Supabase:', error);
    return null;
  }
}

export async function uploadImagesToSupabase(files: File[]): Promise<string[]> {
  const results = await Promise.all(files.map((file) => uploadImageToSupabase(file)));
  return results.filter((url): url is string => url !== null);
}

export async function uploadVideoToSupabase(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() || 'mp4';
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    const { error } = await supabase.storage
      .from(SUPABASE_VIDEO_BUCKET)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'video/mp4',
      });

    if (error) {
      console.error('Supabase video upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage.from(SUPABASE_VIDEO_BUCKET).getPublicUrl(fileName);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading video to Supabase:', error);
    return null;
  }
}

export async function uploadVerificationDocToSupabase(
  file: File,
  userId: string,
  docType: 'id' | 'cac'
): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop() || 'pdf';
    const fileName = `verification/${userId}/${docType}-${Date.now()}.${fileExt}`;

    const { error } = await supabase.storage.from(SUPABASE_IMAGE_BUCKET).upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || 'application/pdf',
    });

    if (error) {
      console.error('Supabase upload error:', error);
      return null;
    }

    const { data: { publicUrl } } = supabase.storage.from(SUPABASE_IMAGE_BUCKET).getPublicUrl(fileName);
    return publicUrl;
  } catch (error) {
    console.error('Error uploading to Supabase:', error);
    return null;
  }
}

async function uploadSingleImageToR2(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'listings');

    const res = await fetch('/api/upload-r2', {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      console.warn('R2 upload failed, falling back to Supabase:', err?.error || res.statusText);
      return null;
    }

    const { url } = await res.json();
    return url as string;
  } catch (error) {
    console.warn('R2 upload error, falling back to Supabase:', error);
    return null;
  }
}

export async function uploadImagesToR2(files: File[]): Promise<string[]> {
  const results = await Promise.all(
    files.map(async (file) => {
      const r2Url = await uploadSingleImageToR2(file);
      if (r2Url) return r2Url;
      return uploadImageToSupabase(file);
    })
  );
  return results.filter((url): url is string => url !== null);
}

export async function uploadVideoToR2(file: File): Promise<string | null> {
  return uploadVideoToSupabase(file);
}

export async function uploadVerificationDocToR2(
  file: File,
  userId: string,
  docType: 'id' | 'cac'
): Promise<string | null> {
  return uploadVerificationDocToSupabase(file, userId, docType);
}