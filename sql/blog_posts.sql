-- Create Blog Posts Table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  video_url TEXT,
  published BOOLEAN DEFAULT false,
  category VARCHAR(100),
  read_time INTEGER,
  tags TEXT[],
  faqs JSONB,
  author_name VARCHAR(100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);

-- RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "Public can view published posts" ON blog_posts
  FOR SELECT
  USING (published = true);

-- Auth users can manage
CREATE POLICY "Auth users can manage posts" ON blog_posts
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Sample posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, category, read_time, author_name, published) VALUES
(
  'How to Inspect a Used Car Before Buying',
  'how-to-inspect-used-car',
  'Learn the essential tips for inspecting a used car before making your purchase decision.',
  '<h2>Introduction</h2><p>Buying a used car in Nigeria requires careful inspection. This guide will walk you through the essential checks.</p><h2>Exterior Inspection</h2><p>Start by checking the body for any signs of accidents or rust. Look at the paintwork under different lighting conditions.</p><h2>Engine Check</h2><p>The engine is the heart of the car. Check for unusual noises, smoke, or leaks.</p><h2>Documents</h2><p>Ensure all papers are in order: license, insurance, receipt of purchase.</p>',
  'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Buying Guide',
  8,
  'Vehgo Team',
  true
),
(
  'Top 10 Most Reliable Cars in Nigeria',
  'top-reliable-cars-nigeria',
  'Discover the most dependable vehicles that perform well on Nigerian roads.',
  '<h2>Introduction</h2><p>Nigerian roads present unique challenges. Here are the most reliable cars that handle our conditions well.</p>',
  'https://images.pexels.com/photos/3608612/pexels-photo-3608612.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Reviews',
  6,
  'Vehgo Team',
  true
),
(
  'Car Maintenance Tips for Nigerian Weather',
  'car-maintenance-nigeria',
  'Keep your vehicle running smoothly with these weather-specific maintenance tips.',
  '<h2>Introduction</h2><p>The Nigerian climate can be tough on vehicles. Here is how to maintain yours properly.</p>',
  'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800',
  'Maintenance',
  5,
  'Vehgo Team',
  true
);
