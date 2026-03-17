import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const [listingsRes, usersRes, requestsRes, settingsRes] = await Promise.all([
      supabase
        .from('listings')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(200),
      supabase
        .from('admin_settings')
        .select('strict_image_validation')
        .eq('id', 'global')
        .single(),
    ]);

    return NextResponse.json({
      listings: listingsRes.data || [],
      users: usersRes.data || [],
      requests: requestsRes.data || [],
      settings: settingsRes.data || { strict_image_validation: false },
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}
