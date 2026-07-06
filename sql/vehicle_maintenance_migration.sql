-- ============================================================
-- Migration: vehicle_maintenance table
-- Third content type alongside vehicle_parts and vehicle_problems.
-- Deliberately NO price fields — manufacturer service intervals
-- (km/months) barely vary by country, so this stays fully global
-- with zero currency/localization work, same philosophy as the
-- OBD-II code lookup. Pricing for the parts a maintenance item
-- needs already lives on the Parts page.
--
-- Plan: only write this for newer cars (incl. Chinese brands —
-- BYD, GWM/Haval, Chery, JAC, etc.) where owners actually search
-- for factory-recommended schedules. Every year/model can have
-- any combination of parts/problems/maintenance — none of the
-- three are required for the others to exist.
-- Run in Supabase SQL Editor.
-- ============================================================

CREATE TABLE IF NOT EXISTS vehicle_maintenance (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model_id      INTEGER REFERENCES vehicle_models(id) ON DELETE CASCADE,

  -- Identity (flat columns, same pattern as vehicle_parts/vehicle_problems)
  brand_slug    TEXT NOT NULL,
  brand_name    TEXT NOT NULL,
  model_name    TEXT NOT NULL,
  vehicle_type  TEXT NOT NULL,
  year          TEXT NOT NULL,              -- e.g. "2023" or "2022-2024" (same as parts/problems)
  image_url     TEXT,

  -- Content (blog-style prose)
  intro         TEXT,                       -- opening paragraph
  schedule      JSONB DEFAULT '[]'::JSONB,   -- MaintenanceItem[] — see shape below
  tips          TEXT,                       -- closing prose: general upkeep advice for this model

  -- SEO
  slug          TEXT UNIQUE NOT NULL,        -- e.g. toyota-camry-2023-maintenance
  meta_title    TEXT,
  meta_description TEXT,
  faqs          JSONB DEFAULT '[]'::JSONB,

  is_published  BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes — same pattern as vehicle_parts/vehicle_problems
CREATE INDEX IF NOT EXISTS idx_vehicle_maintenance_brand ON vehicle_maintenance(brand_slug);
CREATE INDEX IF NOT EXISTS idx_vehicle_maintenance_year  ON vehicle_maintenance(year);

-- Composite index for the exact lookup the [year]/maintenance page uses
CREATE INDEX IF NOT EXISTS idx_vehicle_maintenance_lookup
  ON vehicle_maintenance(brand_slug, model_name, year);

-- Keep updated_at fresh on edit
CREATE OR REPLACE FUNCTION set_vehicle_maintenance_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_vehicle_maintenance_updated_at ON vehicle_maintenance;
CREATE TRIGGER trg_vehicle_maintenance_updated_at
  BEFORE UPDATE ON vehicle_maintenance
  FOR EACH ROW
  EXECUTE FUNCTION set_vehicle_maintenance_updated_at();

-- RLS — same pattern as vehicle_parts/vehicle_problems: public read, no public write
ALTER TABLE vehicle_maintenance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read vehicle_maintenance"
  ON vehicle_maintenance FOR SELECT USING (true);

-- ============================================================
-- JSONB schema for reference when inserting data:
--
-- schedule JSONB (MaintenanceItem[]):
-- [
--   {
--     "category": "Fluids",                  -- Fluids | Filters | Brakes | Engine | Belts & Hoses | Tires | Electrical
--     "service_name": "Engine Oil & Filter",
--     "interval_km": 10000,
--     "interval_months": 12,
--     "severe_service_interval_km": 5000,     -- optional, shorter interval under towing/dusty/stop-start use
--     "description": "Why this matters / what happens if skipped",
--     "is_critical": false                    -- true for safety- or engine-damage-critical items
--   }
-- ]
--
-- faqs JSONB (FAQ[]):
-- [ { "question": "...", "answer": "..." } ]
-- ============================================================
