// app/api/admin-data/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// GET → Fetch all admin data
export async function GET() {
  try {
    // Note: this route used to also fetch the old `listings` and `requests`
    // tables for the pending-approval marketplace workflow. Those tables
    // were dropped in favor of `vehicle_listings` / `vehicle_requests`,
    // which the admin dashboard now reads via /api/vehicle-listings and
    // /api/vehicle-requests instead.
    const [usersRes] = await Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
    ]);

    return NextResponse.json({
      users: usersRes.data || [],
    });
  } catch (error: any) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}
