-- ============================================================
-- Migration: Rebuild vehicle content tables
-- Drops vehicle_prices, rebuilds vehicle_parts, creates vehicle_problems
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. Drop old tables (backup first if you have real data)
-- CREATE TABLE vehicle_prices_backup AS SELECT * FROM vehicle_prices;
-- CREATE TABLE vehicle_parts_backup AS SELECT * FROM vehicle_parts;
DROP TABLE IF EXISTS vehicle_prices CASCADE;
DROP TABLE IF EXISTS vehicle_parts CASCADE;

-- 2. vehicle_parts (rebuilt, simpler schema)
CREATE TABLE vehicle_parts (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id      INTEGER REFERENCES vehicle_models(id) ON DELETE CASCADE,

  -- Identity (flat columns for easy querying without joins)
  brand_slug    TEXT NOT NULL,
  brand_name    TEXT NOT NULL,
  model_name    TEXT NOT NULL,
  vehicle_type  TEXT NOT NULL,
  year          INTEGER NOT NULL,           -- single year, not a range
  image_url     TEXT,                       -- optional vehicle image

  -- Content (blog-style prose)
  intro         TEXT,                       -- opening paragraph
  parts         JSONB DEFAULT '[]'::JSONB,  -- SparePart[]
  buying_guide  TEXT,                       -- prose: OEM vs aftermarket, where to buy, tips

  -- SEO
  slug          TEXT UNIQUE NOT NULL,       -- e.g. toyota-camry-2018-parts
  meta_title    TEXT,
  meta_description TEXT,
  faqs          JSONB DEFAULT '[]'::JSONB,

  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 3. vehicle_problems (new table)
CREATE TABLE vehicle_problems (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id      INTEGER REFERENCES vehicle_models(id) ON DELETE CASCADE,

  -- Identity
  brand_slug    TEXT NOT NULL,
  brand_name    TEXT NOT NULL,
  model_name    TEXT NOT NULL,
  vehicle_type  TEXT NOT NULL,
  year          INTEGER NOT NULL,
  image_url     TEXT,

  -- Content
  intro         TEXT,                        -- opening paragraph
  problems      JSONB DEFAULT '[]'::JSONB,   -- Problem[]
  owners_advice TEXT,                        -- closing prose: what to watch when buying

  -- SEO
  slug          TEXT UNIQUE NOT NULL,        -- e.g. toyota-camry-2018-problems
  meta_title    TEXT,
  meta_description TEXT,
  faqs          JSONB DEFAULT '[]'::JSONB,

  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for common query patterns
CREATE INDEX idx_vehicle_parts_brand     ON vehicle_parts(brand_slug);
CREATE INDEX idx_vehicle_parts_model_id  ON vehicle_parts(model_id);
CREATE INDEX idx_vehicle_parts_year      ON vehicle_parts(year);

CREATE INDEX idx_vehicle_problems_brand    ON vehicle_problems(brand_slug);
CREATE INDEX idx_vehicle_problems_model_id ON vehicle_problems(model_id);
CREATE INDEX idx_vehicle_problems_year     ON vehicle_problems(year);

-- 5. Compound index for the most common lookup pattern
-- (brand + model name + year → find the record for a specific year page)
CREATE INDEX idx_vehicle_parts_lookup
  ON vehicle_parts(brand_slug, model_name, year);

CREATE INDEX idx_vehicle_problems_lookup
  ON vehicle_problems(brand_slug, model_name, year);

-- 6. RLS (same pattern as other vehicle tables — public read, no public write)
ALTER TABLE vehicle_parts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicle_problems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read vehicle_parts"
  ON vehicle_parts FOR SELECT USING (true);

CREATE POLICY "Public can read vehicle_problems"
  ON vehicle_problems FOR SELECT USING (true);

-- ============================================================
-- JSONB schemas for reference when inserting data:
--
-- parts JSONB (SparePart[]):
-- [
--   {
--     "category": "Engine",
--     "part_name": "Air Filter",
--     "price_min": 3500,
--     "price_max": 8000,
--     "replacement_interval": "Every 15,000km",
--     "availability": "Excellent",
--     "oem_recommended": false,
--     "notes": "Toyota OEM available at authorised dealers"
--   }
-- ]
--
-- problems JSONB (Problem[]):
-- [
--   {
--     "title": "Engine Oil Consumption",
--     "description": "The 2AZ-FE engine in 2007-2011 models is known...",
--     "severity": "moderate",
--     "frequency": "common",
--     "repair_cost_min": 15000,
--     "repair_cost_max": 45000
--   }
-- ]
--
-- faqs JSONB (FAQ[]):
-- [
--   {
--     "question": "Where can I buy parts for the Toyota Camry in Lagos?",
--     "answer": "Ladipo Market in Mushin is the best source..."
--   }
-- ]
-- ============================================================
