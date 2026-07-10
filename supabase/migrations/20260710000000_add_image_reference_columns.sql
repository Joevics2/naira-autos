-- Adds an image_reference column so every vehicle photo can carry proper
-- attribution — most existing images were sourced from Wikipedia and
-- require credit. New/individual images can have this updated to their
-- specific source page later; this backfill just sets a safe default so
-- nothing currently live is left without a source.
--
-- image_reference is a URL (rendered as a clickable "Image credit" link
-- directly under the vehicle image on each year-level page).

alter table vehicle_problems   add column if not exists image_reference text;
alter table vehicle_parts      add column if not exists image_reference text;
alter table vehicle_maintenance add column if not exists image_reference text;

-- Backfill: only rows that actually have an image get a reference, and only
-- where one isn't already set (safe to re-run).
update vehicle_problems
  set image_reference = 'https://www.wikipedia.org/'
  where image_url is not null and image_reference is null;

update vehicle_parts
  set image_reference = 'https://www.wikipedia.org/'
  where image_url is not null and image_reference is null;

update vehicle_maintenance
  set image_reference = 'https://www.wikipedia.org/'
  where image_url is not null and image_reference is null;
