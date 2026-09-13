-- Vehicle Listings v2
--
-- Replaces the old public-marketplace schema (listings / requests, plus
-- anything that hung off them) with a small admin-only model for the new
-- single-page /vehicle-listings feature. This is NOT the same table as the
-- old `listings` table — no old rows are migrated, no old code is reused.
--
-- Old tables being retired: `listings`, `requests`.
-- CASCADE will also drop anything that referenced them (confirmed:
-- `reviews` has a FK to `listings`). If you still need historical data from
-- those tables, export it before running this migration.

-- ---------------------------------------------------------------------
-- 1. Drop the old marketplace tables
-- ---------------------------------------------------------------------
DROP TABLE IF EXISTS listings CASCADE;
DROP TABLE IF EXISTS requests CASCADE;

-- ---------------------------------------------------------------------
-- 2. vehicle_listings — admin-curated cars shown on /vehicle-listings
-- ---------------------------------------------------------------------
CREATE TABLE vehicle_listings (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  title         text NOT NULL,
  brand         text NOT NULL,
  model         text NOT NULL,
  year          int  NOT NULL,

  price         numeric NOT NULL,
  currency      text NOT NULL DEFAULT 'NGN',

  condition     text CHECK (condition IN ('foreign_used', 'nigerian_used', 'brand_new')),
  transmission  text,
  fuel_type     text,
  body_type     text,
  color         text,
  mileage       int,

  location      text,
  description   text,
  features      text[] NOT NULL DEFAULT '{}',
  images        text[] NOT NULL DEFAULT '{}',
  video_url     text,

  whatsapp      text,

  status        text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'sold', 'draft')),
  is_featured   boolean NOT NULL DEFAULT false,
  views         int NOT NULL DEFAULT 0,

  created_by    uuid REFERENCES profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX vehicle_listings_status_idx   ON vehicle_listings (status);
CREATE INDEX vehicle_listings_price_idx    ON vehicle_listings (price);
CREATE INDEX vehicle_listings_brand_idx    ON vehicle_listings (brand);
CREATE INDEX vehicle_listings_condition_idx ON vehicle_listings (condition);
CREATE INDEX vehicle_listings_created_idx  ON vehicle_listings (created_at DESC);

ALTER TABLE vehicle_listings ENABLE ROW LEVEL SECURITY;

-- Public can only ever see active listings. All writes go through the
-- service-role API route (app/api/vehicle-listings), which bypasses RLS,
-- so there are deliberately no insert/update/delete policies here.
CREATE POLICY "Public can view active vehicle listings"
  ON vehicle_listings FOR SELECT
  TO anon, authenticated
  USING (status = 'active');

CREATE POLICY "Admins can view all vehicle listings"
  ON vehicle_listings FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------
-- 3. vehicle_requests — "Request a Car" submissions (buyer side)
-- ---------------------------------------------------------------------
CREATE TABLE vehicle_requests (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  name        text NOT NULL,
  whatsapp    text NOT NULL,
  email       text,

  brand       text,
  model       text,
  budget_min  numeric,
  budget_max  numeric,
  notes       text,

  status      text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'fulfilled', 'closed')),
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX vehicle_requests_status_idx ON vehicle_requests (status);
CREATE INDEX vehicle_requests_created_idx ON vehicle_requests (created_at DESC);

ALTER TABLE vehicle_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a request. Only admins can read/update the inbox.
-- (Public inserts happen through the API route with the anon key, so this
-- policy is what actually authorizes the write.)
CREATE POLICY "Anyone can submit a vehicle request"
  ON vehicle_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admins can view vehicle requests"
  ON vehicle_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update vehicle requests"
  ON vehicle_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
