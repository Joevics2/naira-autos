-- Add features column to listings table
ALTER TABLE listings ADD COLUMN IF NOT EXISTS features jsonb DEFAULT '[]'::jsonb;

-- Create index for features (for querying)
CREATE INDEX IF NOT EXISTS idx_listings_features ON listings USING GIN (features);
