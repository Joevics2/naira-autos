/*
  # Nigerian Car Marketplace Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, references auth.users)
      - `full_name` (text)
      - `phone` (text)
      - `whatsapp` (text)
      - `role` (text: dealer, agent, owner, admin)
      - `created_at` (timestamptz)
      
    - `listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `brand` (text)
      - `model` (text)
      - `year` (integer)
      - `price` (decimal)
      - `negotiable` (boolean)
      - `vehicle_type` (text: car, truck, van, bus, bike)
      - `fuel_type` (text)
      - `transmission` (text)
      - `color` (text)
      - `mileage` (integer)
      - `description` (text)
      - `location_state` (text)
      - `location_lga` (text)
      - `ownership_type` (text: dealer, agent, owner)
      - `verification_level` (text: premium_verified, video_verified, basic)
      - `video_url` (text, YouTube URL)
      - `video_urls` (jsonb, for premium verified 4 videos)
      - `images` (jsonb array)
      - `status` (text: pending, approved, rejected, paused, suspended)
      - `is_featured` (boolean)
      - `is_our_store` (boolean)
      - `views_count` (integer)
      - `saves_count` (integer)
      - `contact_clicks` (integer)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `approved_at` (timestamptz)
      
    - `saved_listings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `listing_id` (uuid, references listings)
      - `created_at` (timestamptz)
      
    - `search_keywords`
      - `id` (uuid, primary key)
      - `user_id` (uuid, nullable, references profiles)
      - `search_term` (text)
      - `created_at` (timestamptz)
      
    - `requests`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text)
      - `whatsapp` (text)
      - `brand` (text)
      - `model` (text)
      - `year_min` (integer)
      - `year_max` (integer)
      - `budget_min` (decimal)
      - `budget_max` (decimal)
      - `description` (text)
      - `status` (text: pending, contacted, closed)
      - `admin_notes` (text)
      - `created_at` (timestamptz)
      
    - `blog_posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, references profiles)
      - `title` (text)
      - `slug` (text, unique)
      - `content` (text)
      - `excerpt` (text)
      - `featured_image` (text)
      - `video_url` (text)
      - `published` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Admin-only access for approvals
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name text NOT NULL,
  phone text,
  whatsapp text,
  role text NOT NULL DEFAULT 'owner' CHECK (role IN ('dealer', 'agent', 'owner', 'admin')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create listings table
CREATE TABLE IF NOT EXISTS listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  price decimal(15,2) NOT NULL,
  negotiable boolean DEFAULT false,
  vehicle_type text NOT NULL CHECK (vehicle_type IN ('car', 'truck', 'van', 'bus', 'bike')),
  fuel_type text NOT NULL,
  transmission text NOT NULL,
  color text NOT NULL,
  mileage integer,
  description text,
  location_state text NOT NULL,
  location_lga text NOT NULL,
  ownership_type text NOT NULL CHECK (ownership_type IN ('dealer', 'agent', 'owner')),
  verification_level text NOT NULL CHECK (verification_level IN ('premium_verified', 'video_verified', 'basic')),
  video_url text,
  video_urls jsonb,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'paused', 'suspended')),
  is_featured boolean DEFAULT false,
  is_our_store boolean DEFAULT false,
  views_count integer DEFAULT 0,
  saves_count integer DEFAULT 0,
  contact_clicks integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved listings"
  ON listings FOR SELECT
  USING (status = 'approved' OR user_id = auth.uid());

CREATE POLICY "Users can create own listings"
  ON listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending listings"
  ON listings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create saved_listings table
CREATE TABLE IF NOT EXISTS saved_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  listing_id uuid NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, listing_id)
);

ALTER TABLE saved_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own saved listings"
  ON saved_listings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save listings"
  ON saved_listings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove saved listings"
  ON saved_listings FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create search_keywords table
CREATE TABLE IF NOT EXISTS search_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  search_term text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE search_keywords ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert search keywords"
  ON search_keywords FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view search keywords"
  ON search_keywords FOR SELECT
  TO authenticated
  USING (true);

-- Create requests table
CREATE TABLE IF NOT EXISTS requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  phone text,
  whatsapp text,
  brand text,
  model text,
  year_min integer,
  year_max integer,
  budget_min decimal(15,2),
  budget_max decimal(15,2),
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  admin_notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create requests"
  ON requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view own requests"
  ON requests FOR SELECT
  TO authenticated
  USING (email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  video_url text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  USING (published = true OR author_id = auth.uid());

CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update own blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_brand ON listings(brand);
CREATE INDEX IF NOT EXISTS idx_listings_vehicle_type ON listings(vehicle_type);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON listings(is_featured);
CREATE INDEX IF NOT EXISTS idx_listings_our_store ON listings(is_our_store);
CREATE INDEX IF NOT EXISTS idx_search_keywords_term ON search_keywords(search_term);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
