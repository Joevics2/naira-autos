import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  whatsapp: string | null;
  role: 'dealer' | 'agent' | 'owner' | 'admin';
  profile_photo: string | null;
  business_name: string | null;
  bio: string | null;
  phone_verified: boolean;
  id_verified: boolean;
  dealer_verified: boolean;
  id_document_url: string | null;
  cac_document_url: string | null;
  seller_description: string | null;
  cars_sold_count: number;
  is_admin: boolean;
  email_notifications: boolean;
  sms_notifications: boolean;
  marketing_notifications: boolean;
  show_views: boolean;
  created_at: string;
};

export type Listing = {
  id: string;
  user_id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  negotiable: boolean;
  vehicle_type: 'car' | 'truck' | 'van' | 'bus' | 'bike';
  fuel_type: string;
  transmission: string;
  color: string;
  mileage: number | null;
  description: string | null;
  location_state: string;
  location_lga: string;
  city_area: string | null;
  ownership_type: 'dealer' | 'agent' | 'owner';
  seller_type: 'owner' | 'agent' | 'dealer' | null;
  trim: string | null;
  condition: 'nigerian_used' | 'foreign_used' | 'brand_new' | null;
  body_type: 'suv' | 'sedan' | 'truck' | 'coupe' | 'wagon' | 'van' | 'convertible' | 'hatchback' | 'bus' | 'bike' | null;
  accident_history: 'never' | 'minor' | 'major' | null;
  urgent_sale: boolean;
  reason_for_selling: 'upgrading' | 'relocating' | 'need_cash' | 'company_disposal' | 'other' | null;
  features: string[];
  verification_level: 'premium_verified' | 'video_verified' | 'basic';
  video_url: string | null;
  video_urls: any;
  video_storage_url: string | null;
  images: string[];
  status: 'pending' | 'approved' | 'rejected' | 'paused' | 'suspended';
  is_featured: boolean;
  is_our_store: boolean;
  is_deal: boolean;
  views_count: number;
  saves_count: number;
  contact_clicks: number;
  created_at: string;
  updated_at: string;
  approved_at: string | null;
  profiles?: Profile;
  faq_ac_working?: string | null;
  faq_ac_issue?: string | null;
  faq_engine_condition?: string | null;
  faq_engine_issue?: string | null;
  faq_was_repainted?: string | null;
  faq_documents_complete?: string | null;
  faq_missing_documents?: string | null;
  faq_oil_consumption?: string | null;
  faq_other_issues?: string | null;
};

export type Request = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  state: string | null;
  vehicle_type: string | null;
  brand: string | null;
  model: string | null;
  year_from: number | null;
  year_to: number | null;
  budget_min: number | null;
  budget_max: number | null;
  description: string;
  status: 'pending' | 'approved' | 'paused' | 'contacted' | 'closed';
  admin_notes: string | null;
  created_at: string;
  additional_details?: string | null;
};

export type BlogPost = {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  video_url: string | null;
  published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};

export type Review = {
  id: string;
  seller_id: string;
  reviewer_id: string;
  listing_id: string | null;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  profiles?: Profile;
};
