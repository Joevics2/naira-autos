/*
  # Add New Listing Fields and Verification System

  1. Updates to listings table
    - Add `seller_type` (owner, agent, dealer)
    - Add `city_area` for better location
    - Add `trim` (optional trim level)
    - Add `condition` (nigerian_used, foreign_used, brand_new)
    - Add `body_type` (suv, sedan, truck, coupe, wagon, van, convertible, hatchback)
    - Add `accident_history` (never, minor, major)
    - Add `urgent_sale` (boolean)
    - Add `reason_for_selling` (upgrading, relocating, need_cash, company_disposal, other)
    - Add `is_deal` (boolean for admin-selected deals)
    - Add `video_storage_url` for Supabase bucket storage
    
  2. Updates to profiles table
    - Add `profile_photo` URL
    - Add `business_name` (for dealers)
    - Add `phone_verified` (boolean)
    - Add `id_verified` (boolean)
    - Add `dealer_verified` (boolean)
    - Add `id_document_url` (for ID verification)
    - Add `cac_document_url` (for dealer verification)
    - Add `seller_description` (text)
    - Add `cars_sold_count` (integer)
    
  3. New table: verification_requests
    - Track verification submissions
    
  4. Security
    - Add RLS policies for new tables
*/

-- Add new columns to listings table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'seller_type'
  ) THEN
    ALTER TABLE listings ADD COLUMN seller_type text CHECK (seller_type IN ('owner', 'agent', 'dealer'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'city_area'
  ) THEN
    ALTER TABLE listings ADD COLUMN city_area text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'trim'
  ) THEN
    ALTER TABLE listings ADD COLUMN trim text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'condition'
  ) THEN
    ALTER TABLE listings ADD COLUMN condition text CHECK (condition IN ('nigerian_used', 'foreign_used', 'brand_new'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'body_type'
  ) THEN
    ALTER TABLE listings ADD COLUMN body_type text CHECK (body_type IN ('suv', 'sedan', 'truck', 'coupe', 'wagon', 'van', 'convertible', 'hatchback', 'bus', 'bike'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'accident_history'
  ) THEN
    ALTER TABLE listings ADD COLUMN accident_history text CHECK (accident_history IN ('never', 'minor', 'major'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'urgent_sale'
  ) THEN
    ALTER TABLE listings ADD COLUMN urgent_sale boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'reason_for_selling'
  ) THEN
    ALTER TABLE listings ADD COLUMN reason_for_selling text CHECK (reason_for_selling IN ('upgrading', 'relocating', 'need_cash', 'company_disposal', 'other'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'is_deal'
  ) THEN
    ALTER TABLE listings ADD COLUMN is_deal boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'listings' AND column_name = 'video_storage_url'
  ) THEN
    ALTER TABLE listings ADD COLUMN video_storage_url text;
  END IF;
END $$;

-- Add new columns to profiles table
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'profile_photo'
  ) THEN
    ALTER TABLE profiles ADD COLUMN profile_photo text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'business_name'
  ) THEN
    ALTER TABLE profiles ADD COLUMN business_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'phone_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN phone_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'id_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN id_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'dealer_verified'
  ) THEN
    ALTER TABLE profiles ADD COLUMN dealer_verified boolean DEFAULT false;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'id_document_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN id_document_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'cac_document_url'
  ) THEN
    ALTER TABLE profiles ADD COLUMN cac_document_url text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'seller_description'
  ) THEN
    ALTER TABLE profiles ADD COLUMN seller_description text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'cars_sold_count'
  ) THEN
    ALTER TABLE profiles ADD COLUMN cars_sold_count integer DEFAULT 0;
  END IF;
END $$;

-- Create verification_requests table
CREATE TABLE IF NOT EXISTS verification_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  verification_type text NOT NULL CHECK (verification_type IN ('phone', 'id', 'dealer')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  document_url text,
  phone_code text,
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own verification requests"
  ON verification_requests FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create verification requests"
  ON verification_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_listings_is_deal ON listings(is_deal);
CREATE INDEX IF NOT EXISTS idx_listings_urgent_sale ON listings(urgent_sale);
CREATE INDEX IF NOT EXISTS idx_listings_condition ON listings(condition);
CREATE INDEX IF NOT EXISTS idx_listings_body_type ON listings(body_type);
CREATE INDEX IF NOT EXISTS idx_profiles_phone_verified ON profiles(phone_verified);
CREATE INDEX IF NOT EXISTS idx_profiles_id_verified ON profiles(id_verified);
CREATE INDEX IF NOT EXISTS idx_profiles_dealer_verified ON profiles(dealer_verified);
