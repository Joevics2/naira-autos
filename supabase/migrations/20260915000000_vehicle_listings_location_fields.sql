-- Add state / LGA / town fields to vehicle_listings, matching the
-- existing state -> LGA pattern used elsewhere on the site (see
-- lib/nigeria-locations.ts). Already applied directly to production.

ALTER TABLE vehicle_listings
  ADD COLUMN IF NOT EXISTS state text,
  ADD COLUMN IF NOT EXISTS lga text,
  ADD COLUMN IF NOT EXISTS town text;

CREATE INDEX IF NOT EXISTS vehicle_listings_state_idx ON vehicle_listings (state);
