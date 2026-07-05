-- OBD-II / Engine Diagnostic Code Lookup
-- Purely diagnostic content — no repair-cost or pricing fields on purpose,
-- so this tool needs zero currency/country logic and works identically
-- everywhere in the world. Run this in the Supabase SQL editor once.

CREATE TABLE IF NOT EXISTS obd_codes (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  code              text NOT NULL UNIQUE,        -- e.g. 'P0420'
  slug              text NOT NULL UNIQUE,         -- e.g. 'p0420' (lowercase, used in URL)
  title             text NOT NULL,                -- e.g. 'Catalyst System Efficiency Below Threshold (Bank 1)'

  system            text NOT NULL,                -- 'Powertrain' | 'Body' | 'Chassis' | 'Network'
  category          text NOT NULL,                -- e.g. 'Emissions', 'Misfire', 'Fuel & Air Metering'
  is_generic        boolean NOT NULL DEFAULT true, -- true = SAE J2012 generic, false = manufacturer-specific

  severity          text NOT NULL,                -- 'Low' | 'Medium' | 'High' | 'Critical'
  diy_difficulty    text NOT NULL,                -- 'Easy' | 'Moderate' | 'Hard' | 'Professional Only'

  description       text NOT NULL,                -- plain-English explanation of what triggers this code
  common_causes     jsonb NOT NULL DEFAULT '[]',   -- array of strings
  symptoms          jsonb NOT NULL DEFAULT '[]',   -- array of strings
  diagnostic_steps  jsonb NOT NULL DEFAULT '[]',   -- array of strings, ordered
  related_codes     jsonb NOT NULL DEFAULT '[]',   -- array of code strings, e.g. ["P0430", "P0300"]
  faqs              jsonb NOT NULL DEFAULT '[]',   -- array of {question, answer}

  meta_title        text,
  meta_description  text,

  is_published      boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_obd_codes_system   ON obd_codes(system);
CREATE INDEX IF NOT EXISTS idx_obd_codes_category ON obd_codes(category);
CREATE INDEX IF NOT EXISTS idx_obd_codes_slug     ON obd_codes(slug);

-- Keep updated_at fresh on edit
CREATE OR REPLACE FUNCTION set_obd_codes_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_obd_codes_updated_at ON obd_codes;
CREATE TRIGGER trg_obd_codes_updated_at
  BEFORE UPDATE ON obd_codes
  FOR EACH ROW
  EXECUTE FUNCTION set_obd_codes_updated_at();

-- RLS (same pattern as vehicle_parts/vehicle_problems — public read, no public write)
ALTER TABLE obd_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read obd_codes"
  ON obd_codes FOR SELECT USING (true);
