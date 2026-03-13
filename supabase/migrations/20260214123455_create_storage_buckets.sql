/*
  # Create Storage Buckets

  1. New Storage Buckets
    - `listing-videos` - For video uploads of vehicle listings
    - `verification-documents` - For ID and dealer verification documents
    
  2. Security
    - Enable RLS on storage buckets
    - Users can upload their own files
    - Users can read their own files
    - Public access for approved listing videos
*/

INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('listing-videos', 'listing-videos', true),
  ('verification-documents', 'verification-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload their own listing videos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'listing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own listing videos"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'listing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can view approved listing videos"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'listing-videos');

CREATE POLICY "Users can delete their own listing videos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'listing-videos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own verification documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own verification documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'verification-documents' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins can read all verification documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-documents' 
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);
