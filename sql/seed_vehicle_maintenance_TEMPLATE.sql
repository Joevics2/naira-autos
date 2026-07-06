-- TEMPLATE — not verified real data. Copy this row, fill in real
-- intervals sourced from the manufacturer's official maintenance
-- schedule / owner's manual for the exact model+market, then run.
--
-- Maintenance intervals genuinely do vary by market even for the same
-- model (e.g. oil-change intervals commonly differ between US/EU/
-- other regions depending on the oil spec approved for that market),
-- so don't reuse one model's numbers across different markets without
-- checking the manual for that market.
--
-- Suggested sourcing per model: the manufacturer's official maintenance
-- schedule page (most brands publish these), or the owner's manual PDF.

INSERT INTO vehicle_maintenance (
  model_id,
  brand_slug, brand_name, model_name, vehicle_type, year, image_url,
  intro, schedule, tips,
  slug, meta_title, meta_description, faqs,
  is_published
) VALUES (
  (SELECT id FROM vehicle_models WHERE slug = 'REPLACE_MODEL_SLUG' AND brand_slug = 'REPLACE_BRAND_SLUG' LIMIT 1),

  'REPLACE_BRAND_SLUG', 'REPLACE_BRAND_NAME', 'REPLACE_MODEL_SLUG', 'car', '2024',
  NULL,

  'Opening paragraph — what this schedule covers and why staying on top of it matters for this model.',

  '[
    {
      "category": "Fluids",
      "service_name": "Engine Oil & Filter",
      "interval_km": 10000,
      "interval_months": 12,
      "severe_service_interval_km": 5000,
      "description": "Verify against the owner manual — synthetic oil intervals vary by market and oil spec.",
      "is_critical": false
    },
    {
      "category": "Filters",
      "service_name": "Cabin Air Filter",
      "interval_km": 15000,
      "interval_months": 12,
      "description": "Replace sooner in dusty conditions.",
      "is_critical": false
    },
    {
      "category": "Brakes",
      "service_name": "Brake Fluid",
      "interval_km": 40000,
      "interval_months": 24,
      "description": "Brake fluid absorbs moisture over time, which lowers its boiling point.",
      "is_critical": true
    }
  ]'::jsonb,

  'Closing prose — general upkeep advice specific to this model (common wear points, what owners should watch for).',

  'REPLACE_BRAND_SLUG-REPLACE_MODEL_SLUG-2024-maintenance',
  NULL, NULL,
  '[]'::jsonb,

  true
)
ON CONFLICT (slug) DO NOTHING;
