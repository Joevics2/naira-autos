// app/api/cars/answers/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { question_id, answer, author_name } = await req.json();

  if (!question_id || !answer?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: saved, error } = await supabase
    .from('car_answers')
    .insert({ question_id, answer: answer.trim(), author_name: author_name?.trim() || 'Anonymous' })
    .select()
    .single();

  if (error || !saved) {
    return NextResponse.json({ error: 'Failed to save answer' }, { status: 500 });
  }

  return NextResponse.json({ answer: saved });
}