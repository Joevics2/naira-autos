// app/api/cars/questions/route.ts
// App Router API route — submit question, Gemini answers async

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODELS, getGeminiKeys } from '@/lib/gemini-keys';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const { year_group_id, question, author_name, car_label } = await req.json();

  if (!year_group_id || !question?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data: saved, error } = await supabase
    .from('car_questions')
    .insert({ year_group_id, question: question.trim(), author_name: author_name?.trim() || 'Anonymous' })
    .select()
    .single();

  if (error || !saved) {
    return NextResponse.json({ error: 'Failed to save question' }, { status: 500 });
  }

  // Respond immediately — then generate AI answer in background
  const response = NextResponse.json({ question: { ...saved, answers: [] } });

  // waitUntil not available in all environments — use void async IIFE
  void (async () => {
    const prompt = `You are a Nigerian car expert. A user asked this question about the ${car_label}: "${question}"\n\nAnswer helpfully with Nigerian context (road conditions, Naira prices, local availability). Keep it to 3–5 sentences. No markdown.`;
    const apiKeys = getGeminiKeys();

    for (const modelName of GEMINI_MODELS) {
      for (const apiKey of apiKeys) {
        try {
          const genAI = new GoogleGenerativeAI(apiKey);
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(prompt);
          const aiAnswer = result.response.text().trim();
          await supabase
            .from('car_questions')
            .update({ ai_answer: aiAnswer, ai_answered_at: new Date().toISOString() })
            .eq('id', saved.id);
          return;
        } catch {
          // try next key/model — non-critical either way
        }
      }
    }
  })();

  return response;
}