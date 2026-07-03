-- Convert `year` from INTEGER to TEXT on vehicle_parts and vehicle_problems
-- so a single row/page can represent either one year ("2015") or a
-- generation range ("2004-2010"), since this is just article content and
-- doesn't need real start/end integer columns.
--
-- Existing integer values are preserved as their string form (e.g. 2015 -> '2015').
-- Run this once in the Supabase SQL editor.

ALTER TABLE vehicle_parts
  ALTER COLUMN year TYPE TEXT USING year::text;

ALTER TABLE vehicle_problems
  ALTER COLUMN year TYPE TEXT USING year::text;
