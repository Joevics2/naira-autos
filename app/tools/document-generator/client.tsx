'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import {
  FileText, Loader2, ChevronRight, Home, Sparkles, Download,
  FileDown, RotateCcw, AlertTriangle, CheckCircle2, Wand2,
} from 'lucide-react';
import { DOCUMENT_TYPES, DOCUMENT_COUNTRIES, HIGH_RISK_DOCUMENT_TYPES } from '@/lib/document-types';

interface LegalRequirements {
  summary: string;
  requiredFields: string[];
  mandatoryClauses: string[];
  disclosures: string[];
  formattingNotes: string;
  notarizationRequired: boolean;
  witnessRequired: boolean;
  governingLawNote: string;
}

interface GeneratedDocument {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
  signatures: { role: string }[];
}

type Step = 'select' | 'researching' | 'details' | 'generating' | 'preview';

const STORAGE_KEY = 'naira-autos-doc-generator-draft';

const STANDARD_DISCLAIMER =
  'This document was generated for informational purposes only and does not constitute legal advice. Naira Autos is not a law firm. For high-value or high-risk agreements, have this document reviewed by a licensed attorney in your jurisdiction before signing.';

export default function DocumentGeneratorClient() {
  const [step, setStep] = useState<Step>('select');
  const [documentTypeSlug, setDocumentTypeSlug] = useState('');
  const [country, setCountry] = useState('');
  const [legalRequirements, setLegalRequirements] = useState<LegalRequirements | null>(null);
  const [userDetails, setUserDetails] = useState('');
  const [usePlaceholders, setUsePlaceholders] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<'pdf' | 'docx' | null>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const docType = DOCUMENT_TYPES.find(d => d.slug === documentTypeSlug);
  const docCountry = DOCUMENT_COUNTRIES.find(c => c.code === country);

  // ── Restore last draft on load ──────────────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw);
      if (draft.generatedDocument) {
        setDocumentTypeSlug(draft.documentTypeSlug || '');
        setCountry(draft.country || '');
        setLegalRequirements(draft.legalRequirements || null);
        setGeneratedDocument(draft.generatedDocument);
        setIsHighRisk(!!draft.isHighRisk);
        setStep('preview');
      }
    } catch {
      // ignore corrupt drafts
    }
  }, []);

  // ── Persist draft (client-side only — never sent to the server) ─────
  useEffect(() => {
    if (step !== 'preview' || !generatedDocument) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        documentTypeSlug, country, legalRequirements, generatedDocument, isHighRisk,
      }));
    } catch {
      // storage full or unavailable — fine, editing still works in-session
    }
  }, [step, generatedDocument, documentTypeSlug, country, legalRequirements, isHighRisk]);

  const handleResearch = useCallback(async () => {
    if (!documentTypeSlug || !country) return;
    setError(null);
    setStep('researching');
    try {
      const res = await fetch('/api/documents/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentTypeSlug, country }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Research failed.');
      setLegalRequirements(data.legalRequirements);
      setStep('details');
    } catch (err: any) {
      setError(err.message || 'Something went wrong researching this document. Please try again.');
      setStep('select');
    }
  }, [documentTypeSlug, country]);

  const handleGenerate = useCallback(async () => {
    if (!legalRequirements) return;
    if (!usePlaceholders && !userDetails.trim()) {
      setError('Please add the details to use, or tap "Use placeholder details".');
      return;
    }
    setError(null);
    setStep('generating');
    try {
      const res = await fetch('/api/documents/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentTypeSlug, country, legalRequirements,
          userDetails: usePlaceholders ? undefined : userDetails,
          usePlaceholders,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed.');
      setGeneratedDocument(data.document);
      setIsHighRisk(!!data.isHighRisk);
      setStep('preview');
    } catch (err: any) {
      setError(err.message || 'Something went wrong writing this document. Please try again.');
      setStep('details');
    }
  }, [legalRequirements, userDetails, usePlaceholders, documentTypeSlug, country]);

  const handleReset = () => {
    setStep('select');
    setDocumentTypeSlug('');
    setCountry('');
    setLegalRequirements(null);
    setUserDetails('');
    setUsePlaceholders(false);
    setGeneratedDocument(null);
    setIsHighRisk(false);
    setError(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  // ── Editable field sync ──────────────────────────────────────────────
  const updateTitle = (value: string) => setGeneratedDocument(d => d ? { ...d, title: value } : d);
  const updateIntro = (value: string) => setGeneratedDocument(d => d ? { ...d, intro: value } : d);
  const updateSectionHeading = (i: number, value: string) =>
    setGeneratedDocument(d => {
      if (!d) return d;
      const sections = [...d.sections];
      sections[i] = { ...sections[i], heading: value };
      return { ...d, sections };
    });
  const updateSectionBody = (i: number, value: string) =>
    setGeneratedDocument(d => {
      if (!d) return d;
      const sections = [...d.sections];
      sections[i] = { ...sections[i], body: value };
      return { ...d, sections };
    });

  // ── Downloads ─────────────────────────────────────────────────────────
  const downloadPdf = () => {
    setDownloading('pdf');
    // Print CSS (below) hides everything except #doc-print-area.
    setTimeout(() => {
      window.print();
      setDownloading(null);
    }, 50);
  };

  const downloadDocx = async () => {
    if (!generatedDocument) return;
    setDownloading('docx');
    try {
      const {
        Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle,
      } = await import('docx');

      const children: any[] = [
        new Paragraph({
          text: generatedDocument.title,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 300 },
        }),
      ];

      if (generatedDocument.intro) {
        children.push(new Paragraph({ text: generatedDocument.intro, spacing: { after: 300 } }));
      }

      for (const section of generatedDocument.sections) {
        children.push(new Paragraph({
          text: section.heading,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 300, after: 150 },
        }));
        for (const para of section.body.split(/\n\n+/)) {
          if (para.trim()) {
            children.push(new Paragraph({ text: para.trim(), spacing: { after: 150 } }));
          }
        }
      }

      children.push(new Paragraph({
        text: 'SIGNATURES',
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 400, after: 300 },
      }));

      for (const sig of generatedDocument.signatures) {
        children.push(
          new Paragraph({
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999' } },
            spacing: { before: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: `${sig.role} — Signature`, size: 18, color: '666666' })],
            spacing: { after: 300 },
          }),
          new Paragraph({ text: `${sig.role} — Printed Name: ________________________   Date: ______________`, spacing: { after: 300 } }),
        );
      }

      children.push(new Paragraph({
        children: [new TextRun({ text: STANDARD_DISCLAIMER, italics: true, size: 16, color: '888888' })],
        spacing: { before: 500 },
      }));

      const doc = new Document({ sections: [{ children }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(docType?.label || 'document').replace(/\s+/g, '-').toLowerCase()}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      setError('Could not build the Word file. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print styles — only #doc-print-area is visible when printing */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #doc-print-area, #doc-print-area * { visibility: visible; }
          #doc-print-area { position: absolute; left: 0; top: 0; width: 100%; margin: 0; box-shadow: none; }
          @page { size: A4; margin: 18mm; }
        }
      `}</style>

      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Document Generator</span>
        </nav>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">AI-Powered · Free</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">AI Vehicle Document Generator</h1>
          <p className="text-muted-foreground leading-relaxed">
            Pick a document and a country. We research the real legal requirements for that jurisdiction, then draft a complete, formatted document you can edit and download.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm">
            <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ── Step: select ─────────────────────────────────────────── */}
        {step === 'select' && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Document type</label>
              <select
                value={documentTypeSlug}
                onChange={e => setDocumentTypeSlug(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground"
              >
                <option value="">Select a document…</option>
                {DOCUMENT_TYPES.map(d => (
                  <option key={d.slug} value={d.slug}>{d.label}</option>
                ))}
              </select>
              {docType && <p className="text-xs text-muted-foreground mt-1.5">{docType.description}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Country</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground"
              >
                <option value="">Select a country…</option>
                {DOCUMENT_COUNTRIES.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleResearch}
              disabled={!documentTypeSlug || !country}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors"
            >
              <Wand2 className="h-4 w-4" />
              Start
            </button>
          </div>
        )}

        {/* ── Step: researching ────────────────────────────────────── */}
        {step === 'researching' && (
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center gap-3">
            <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
            <p className="text-foreground font-medium">Researching legal requirements…</p>
            <p className="text-sm text-muted-foreground">
              Checking what {docCountry?.name} requires for a {docType?.label.toLowerCase()}.
            </p>
          </div>
        )}

        {/* ── Step: details ────────────────────────────────────────── */}
        {step === 'details' && legalRequirements && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{legalRequirements.summary}</p>
            </div>

            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                To generate your {docType?.label} for {docCountry?.name}, I'll need:
              </p>
              <ul className="space-y-1">
                {legalRequirements.requiredFields.map((f, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-1.5">
                    <span className="text-emerald-500 mt-0.5">•</span>{f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-medium text-foreground">Your details</label>
                <button
                  type="button"
                  onClick={() => { setUsePlaceholders(true); setUserDetails(''); }}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    usePlaceholders
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-dashed border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  Use placeholder details
                </button>
              </div>
              <textarea
                value={usePlaceholders ? '' : userDetails}
                onChange={e => { setUserDetails(e.target.value); if (usePlaceholders) setUsePlaceholders(false); }}
                disabled={usePlaceholders}
                placeholder={usePlaceholders
                  ? 'Placeholder names and sample details will be used instead — you can fill them in after downloading.'
                  : 'Type everything you have — names, vehicle details, price, dates, etc. One message is enough.'}
                rows={6}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground disabled:opacity-60 disabled:cursor-not-allowed resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('select')}
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleGenerate}
                disabled={!usePlaceholders && !userDetails.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generate Document
              </button>
            </div>
          </div>
        )}

        {/* ── Step: generating ─────────────────────────────────────── */}
        {step === 'generating' && (
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center gap-3">
            <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
            <p className="text-foreground font-medium">Writing your document…</p>
            <p className="text-sm text-muted-foreground">Drafting a complete, formatted {docType?.label.toLowerCase()}.</p>
          </div>
        )}

        {/* ── Step: preview ────────────────────────────────────────── */}
        {step === 'preview' && generatedDocument && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 no-print">
              <button
                onClick={downloadPdf}
                disabled={!!downloading}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
              >
                {downloading === 'pdf' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                Download PDF
              </button>
              <button
                onClick={downloadDocx}
                disabled={!!downloading}
                className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
              >
                {downloading === 'docx' ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
                Download Word
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-medium px-4 py-2.5 transition-colors ml-auto"
              >
                <RotateCcw className="h-4 w-4" />
                Start Over
              </button>
            </div>

            <p className="text-xs text-muted-foreground no-print">
              Click any text in the document below to edit it before downloading.
            </p>

            {isHighRisk && (
              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-lg px-4 py-3 text-sm no-print">
                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>This document type carries meaningful legal and financial risk (e.g. repossession or consumer-protection terms). Have it reviewed by a local attorney before you sign or rely on it.</span>
              </div>
            )}

            {/* A4 document preview / editor — always rendered as white paper regardless of site theme */}
            <div
              id="doc-print-area"
              ref={printAreaRef}
              className="bg-white text-black mx-auto max-w-[210mm] shadow-lg rounded-sm p-[15mm] sm:p-[20mm]"
            >
              <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={e => updateTitle(e.currentTarget.textContent || '')}
                className="text-xl sm:text-2xl font-bold text-center mb-6 outline-none focus:ring-1 focus:ring-emerald-400 rounded px-1"
              >
                {generatedDocument.title}
              </h2>

              {generatedDocument.intro && (
                <p
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => updateIntro(e.currentTarget.textContent || '')}
                  className="text-sm leading-relaxed mb-6 outline-none focus:ring-1 focus:ring-emerald-400 rounded px-1"
                >
                  {generatedDocument.intro}
                </p>
              )}

              {generatedDocument.sections.map((section, i) => (
                <div key={i} className="mb-5">
                  <h3
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateSectionHeading(i, e.currentTarget.textContent || '')}
                    className="text-sm font-bold mb-1.5 outline-none focus:ring-1 focus:ring-emerald-400 rounded px-1"
                  >
                    {section.heading}
                  </h3>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    onBlur={e => updateSectionBody(i, e.currentTarget.innerText || '')}
                    className="text-sm leading-relaxed whitespace-pre-wrap outline-none focus:ring-1 focus:ring-emerald-400 rounded px-1"
                  >
                    {section.body}
                  </div>
                </div>
              ))}

              <div className="mt-10 pt-6 border-t border-gray-300">
                <p className="text-sm font-bold mb-6">SIGNATURES</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {generatedDocument.signatures.map((sig, i) => (
                    <div key={i}>
                      <div className="border-b border-gray-400 h-10" />
                      <p className="text-xs text-gray-600 mt-1">{sig.role} — Signature</p>
                      <p className="text-xs mt-3">Printed Name: ________________________</p>
                      <p className="text-xs mt-2">Date: ______________</p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-[10px] text-gray-500 italic leading-relaxed mt-10 pt-4 border-t border-gray-200">
                {STANDARD_DISCLAIMER}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
