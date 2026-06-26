'use client';

import Link from 'next/link';

interface TermLink {
  term: string;
  slug: string;
}

function linkifyText(
  text: string,
  termLinks: TermLink[],
  currentSlug: string,
  alreadyLinked: Set<string>
): React.ReactNode[] {
  const sorted = termLinks
    .filter(t => t.slug !== currentSlug)
    .sort((a, b) => b.term.length - a.term.length);

  if (sorted.length === 0) return [text];

  const pattern = sorted
    .map(t => t.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    .join('|');
  const regex = new RegExp(`\\b(${pattern})\\b`, 'gi');

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const matched = match[0];
    const start = match.index;
    if (start > lastIndex) parts.push(text.slice(lastIndex, start));

    const entry = sorted.find(t => t.term.toLowerCase() === matched.toLowerCase());
    if (entry && !alreadyLinked.has(entry.slug)) {
      alreadyLinked.add(entry.slug);
      parts.push(
        <Link
          key={`${entry.slug}-${start}`}
          href={`/tools/glossary/${entry.slug}`}
          className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 decoration-emerald-500/40 hover:decoration-emerald-500 transition-colors"
        >
          {matched}
        </Link>
      );
    } else {
      parts.push(matched);
    }
    lastIndex = start + matched.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export function AutoLinkedProse({
  text,
  termLinks,
  currentSlug,
}: {
  text: string;
  termLinks: TermLink[];
  currentSlug: string;
}) {
  const alreadyLinked = new Set<string>();
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
          {linkifyText(p.trim(), termLinks, currentSlug, alreadyLinked)}
        </p>
      ))}
    </div>
  );
}

export function Prose({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean);
  return (
    <div className="space-y-4">
      {paragraphs.map((p, i) => (
        <p key={i} className="text-sm text-muted-foreground leading-relaxed">
          {p.trim()}
        </p>
      ))}
    </div>
  );
}
