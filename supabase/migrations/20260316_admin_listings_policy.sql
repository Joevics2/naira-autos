-- Add admin policy to view all listings
CREATE POLICY "Admins can view all listings"
  ON listings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
