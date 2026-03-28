'use client';
// app/cars/[brand]/[model]/[year]/qa-client.tsx
// Client component — handles question submission, AI answer display, community replies

import { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Send, Loader2, CheckCircle2, User, Wrench } from 'lucide-react';
import type { CarQuestion } from '@/types/cars';

interface Props {
  yearGroupId: number;
  initialQuestions: CarQuestion[];
  carLabel: string;
}

export default function CarQAClient({ yearGroupId, initialQuestions, carLabel }: Props) {
  const [questions, setQuestions]     = useState<CarQuestion[]>(initialQuestions);
  const [expandedId, setExpandedId]   = useState<number | null>(null);
  const [newQuestion, setNewQuestion] = useState('');
  const [authorName, setAuthorName]   = useState('');
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);
  const [error, setError]             = useState('');

  const [answerText, setAnswerText]         = useState<Record<number, string>>({});
  const [answerName, setAnswerName]         = useState<Record<number, string>>({});
  const [answeringId, setAnsweringId]       = useState<number | null>(null);
  const [submittingAnswerId, setSubmittingAnswerId] = useState<number | null>(null);

  async function submitQuestion() {
    if (!newQuestion.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/cars/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          year_group_id: yearGroupId,
          question: newQuestion.trim(),
          author_name: authorName.trim() || 'Anonymous',
          car_label: carLabel,
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuestions(prev => [data.question, ...prev]);
      setNewQuestion('');
      setAuthorName('');
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setError('Could not submit your question. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  async function submitAnswer(questionId: number) {
    const text = answerText[questionId];
    if (!text?.trim()) return;
    setSubmittingAnswerId(questionId);
    try {
      const res = await fetch('/api/cars/answers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: questionId,
          answer: text.trim(),
          author_name: answerName[questionId]?.trim() || 'Anonymous',
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setQuestions(prev => prev.map(q =>
        q.id === questionId ? { ...q, answers: [...(q.answers || []), data.answer] } : q
      ));
      setAnswerText(prev => ({ ...prev, [questionId]: '' }));
      setAnswerName(prev => ({ ...prev, [questionId]: '' }));
      setAnsweringId(null);
    } catch {
      // non-critical
    } finally {
      setSubmittingAnswerId(null);
    }
  }

  function timeAgo(ts: string) {
    const d = Date.now() - new Date(ts).getTime();
    if (d < 3_600_000)    return `${Math.floor(d / 60_000)}m ago`;
    if (d < 86_400_000)   return `${Math.floor(d / 3_600_000)}h ago`;
    if (d < 2_592_000_000) return `${Math.floor(d / 86_400_000)}d ago`;
    return new Date(ts).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  return (
    <div className="space-y-5">

      {/* ── Ask box ── */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-4 w-4 text-emerald-500" />
          <span className="font-bold text-foreground text-sm">Ask a Question</span>
        </div>
        <div className="space-y-3">
          <textarea
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            placeholder={`E.g. "Is the ${carLabel} good on Nigerian roads?" or "What is the most common fault?"`}
            rows={3}
            className="w-full px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition-all resize-none leading-relaxed"
          />
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={authorName}
              onChange={e => setAuthorName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 h-10 px-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition-all"
            />
            <button
              onClick={submitQuestion}
              disabled={!newQuestion.trim() || submitting}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex-shrink-0 ${
                newQuestion.trim() && !submitting
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {submitting ? 'Asking...' : 'Ask'}
            </button>
          </div>
          {submitted && (
            <p className="flex items-center gap-2 text-emerald-500 text-sm">
              <CheckCircle2 className="h-4 w-4" /> Question submitted — AI is generating an answer...
            </p>
          )}
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>
      </div>

      {/* ── Questions list ── */}
      {questions.map(q => {
        const isExpanded  = expandedId === q.id;
        const answerCount = (q.answers?.length || 0) + (q.ai_answer ? 1 : 0);

        return (
          <div key={q.id} className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedId(isExpanded ? null : q.id)}
              className="w-full flex items-start justify-between gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="h-3.5 w-3.5 text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground leading-relaxed">{q.question}</p>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-xs text-muted-foreground">{q.author_name}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{timeAgo(q.created_at)}</span>
                    {answerCount > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs font-semibold text-emerald-500">{answerCount} answer{answerCount !== 1 ? 's' : ''}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {isExpanded
                ? <ChevronUp   className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
              }
            </button>

            {isExpanded && (
              <div className="border-t border-border px-5 pb-5 pt-4 space-y-4">

                {/* AI answer */}
                {q.ai_answer && (
                  <div className="bg-emerald-950/30 border border-emerald-800/40 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <Wrench className="h-3 w-3 text-emerald-400" />
                      </div>
                      <span className="text-xs font-bold text-emerald-400">AI Answer</span>
                      {q.ai_answered_at && (
                        <span className="text-xs text-muted-foreground ml-auto">{timeAgo(q.ai_answered_at)}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">{q.ai_answer}</p>
                  </div>
                )}

                {/* Community answers */}
                {q.answers?.map(a => (
                  <div key={a.id} className="flex gap-3">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      a.is_verified_mechanic
                        ? 'bg-amber-500/20 border border-amber-500/30'
                        : 'bg-muted/50 border border-border'
                    }`}>
                      {a.is_verified_mechanic
                        ? <Wrench className="h-3.5 w-3.5 text-amber-400" />
                        : <User   className="h-3.5 w-3.5 text-muted-foreground" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-semibold text-foreground">{a.author_name}</span>
                        {a.is_verified_mechanic && (
                          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                            Verified Mechanic
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground ml-auto">{timeAgo(a.created_at)}</span>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed">{a.answer}</p>
                    </div>
                  </div>
                ))}

                {/* Add answer */}
                {answeringId === q.id ? (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <textarea
                      value={answerText[q.id] || ''}
                      onChange={e => setAnswerText(prev => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Share what you know..."
                      rows={3}
                      className="w-full px-4 py-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition-all resize-none leading-relaxed"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={answerName[q.id] || ''}
                        onChange={e => setAnswerName(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Your name (optional)"
                        className="flex-1 h-9 px-3 text-sm border border-border rounded-xl bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500/60 transition-all"
                      />
                      <button
                        onClick={() => submitAnswer(q.id)}
                        disabled={!answerText[q.id]?.trim() || submittingAnswerId === q.id}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {submittingAnswerId === q.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
                        Post
                      </button>
                      <button
                        onClick={() => setAnsweringId(null)}
                        className="px-3 py-2 rounded-xl border border-border text-muted-foreground text-xs font-medium hover:bg-muted/50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAnsweringId(q.id)}
                    className="text-xs font-medium text-emerald-500 hover:text-emerald-400 transition-colors pt-2 border-t border-border w-full text-left"
                  >
                    + Add your answer
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {questions.length === 0 && (
        <p className="text-center py-8 text-muted-foreground text-sm">
          No questions yet. Be the first to ask about the {carLabel}.
        </p>
      )}
    </div>
  );
}