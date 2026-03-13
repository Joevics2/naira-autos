-- Add FAQ and vehicle condition columns to listings table
-- Run this migration to add new fields for the vehicle condition FAQ section

ALTER TABLE listings 
ADD COLUMN IF NOT EXISTS faq_ac_working text CHECK (faq_ac_working IN ('yes', 'no')),
ADD COLUMN IF NOT EXISTS faq_ac_issue text,
ADD COLUMN IF NOT EXISTS faq_engine_condition text CHECK (faq_engine_condition IN ('yes', 'no')),
ADD COLUMN IF NOT EXISTS faq_engine_issue text,
ADD COLUMN IF NOT EXISTS faq_was_repainted text CHECK (faq_was_repainted IN ('yes', 'no')),
ADD COLUMN IF NOT EXISTS faq_documents_complete text CHECK (faq_documents_complete IN ('yes', 'no')),
ADD COLUMN IF NOT EXISTS faq_missing_documents text,
ADD COLUMN IF NOT EXISTS faq_oil_consumption text CHECK (faq_oil_consumption IN ('yes', 'no')),
ADD COLUMN IF NOT EXISTS faq_other_issues text;

-- Create indexes for the new FAQ columns for better query performance
CREATE INDEX IF NOT EXISTS idx_listings_faq_ac_working ON listings(faq_ac_working);
CREATE INDEX IF NOT EXISTS idx_listings_faq_engine_condition ON listings(faq_engine_condition);
CREATE INDEX IF NOT EXISTS idx_listings_faq_was_repainted ON listings(faq_was_repainted);
CREATE INDEX IF NOT EXISTS idx_listings_faq_documents_complete ON listings(faq_documents_complete);
CREATE INDEX IF NOT EXISTS idx_listings_faq_oil_consumption ON listings(faq_oil_consumption);
