'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileCheck2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface TemplateAvailableLinkEsProps {
  documentTypeSlug: string;
  country: string;
}

export default function TemplateAvailableLinkEs({ documentTypeSlug, country }: TemplateAvailableLinkEsProps) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (!documentTypeSlug || !country) { setAvailable(false); return; }

    (async () => {
      try {
        const { data } = await supabase
          .from('document_templates')
          .select('id')
          .eq('document_type', documentTypeSlug)
          .eq('country', country)
          .eq('status', 'published')
          .maybeSingle();
        if (!cancelled) setAvailable(!!data);
      } catch {
        if (!cancelled) setAvailable(false);
      }
    })();

    return () => { cancelled = true; };
  }, [documentTypeSlug, country]);

  if (!available) return null;

  return (
    <Link
      href={`/documents/${documentTypeSlug}/${country}`}
      className="flex items-center gap-2 bg-sky-500/10 border border-sky-500/30 text-sky-600 dark:text-sky-400 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-sky-500/15 transition-colors"
    >
      <FileCheck2 className="h-4 w-4 flex-shrink-0" />
      Ya existe una plantilla lista para este documento — evita la IA y llénala directamente →
    </Link>
  );
}
