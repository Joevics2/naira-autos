import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// POST → public "Request a Car" submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, whatsapp, email, brand, model, budget_min, budget_max, notes } = body;

    if (!name || !whatsapp) {
      return NextResponse.json({ error: 'Name and WhatsApp number are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('vehicle_requests')
      .insert({
        name,
        whatsapp,
        email: email || null,
        brand: brand || null,
        model: model || null,
        budget_min: budget_min ?? null,
        budget_max: budget_max ?? null,
        notes: notes || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ request: data });
  } catch (error: any) {
    console.error('Error creating vehicle request:', error);
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 });
  }
}

// GET → admin inbox (auth check happens in requireAdmin helper shared with
// the listings route — see app/api/vehicle-listings/route.ts for the pattern)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '');
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !userData?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', userData.user.id)
      .single();

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { data, error } = await supabaseAdmin
      .from('vehicle_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;

    return NextResponse.json({ requests: data || [] });
  } catch (error: any) {
    console.error('Error fetching vehicle requests:', error);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}
