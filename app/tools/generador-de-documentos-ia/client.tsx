'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Loader2, ChevronRight, Home, Sparkles, CheckCircle2, FileCheck2, History, RotateCcw,
} from 'lucide-react';
import {
  DOCUMENT_TYPES, DOCUMENT_COUNTRIES, DOCUMENT_TYPES_SORTED, DOCUMENT_TYPES_POPULAR_COUNT,
  DOCUMENT_COUNTRIES_SORTED, DOCUMENT_COUNTRIES_POPULAR_COUNT,
} from '@/lib/document-types';
import { GeneratedDocument, sanitizeDocument } from '@/lib/document-format';
import { saveToHistory } from '@/lib/document-history';
import DocumentEditorEs from '@/components/documents/DocumentEditorEs';
import TemplateAvailableLinkEs from '@/components/documents/TemplateAvailableLinkEs';

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

type Step = 'select' | 'researching' | 'details' | 'generating' | 'preview';

const SHORT_DISCLAIMER =
  'Solo informativo, no es asesoría legal. Haz que un abogado con licencia revise los acuerdos de alto valor o alto riesgo.';

export default function GeneradorDeDocumentosClienteEs() {
  const [step, setStep] = useState<Step>('select');
  const [documentTypeSlug, setDocumentTypeSlug] = useState('');
  const [country, setCountry] = useState('');
  const [legalRequirements, setLegalRequirements] = useState<LegalRequirements | null>(null);
  const [userDetails, setUserDetails] = useState('');
  const [usePlaceholders, setUsePlaceholders] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);
  const [isHighRisk, setIsHighRisk] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const docType = DOCUMENT_TYPES.find(d => d.slug === documentTypeSlug);
  const docCountry = DOCUMENT_COUNTRIES.find(c => c.code === country);

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
      if (!res.ok) throw new Error(data.error || 'La investigación falló.');
      setLegalRequirements(data.legalRequirements);
      setStep('details');
    } catch (err: any) {
      setError(err.message || 'Algo salió mal investigando este documento. Intenta de nuevo.');
      setStep('select');
    }
  }, [documentTypeSlug, country]);

  const handleGenerate = useCallback(async () => {
    if (!legalRequirements) return;
    if (!usePlaceholders && !userDetails.trim()) {
      setError('Agrega los datos a usar, o toca "Usar datos de ejemplo".');
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
      if (!res.ok) throw new Error(data.error || 'La generación falló.');
      const sanitized = sanitizeDocument(data.document);
      setGeneratedDocument(sanitized);
      setIsHighRisk(!!data.isHighRisk);
      setStep('preview');
      if (docType && docCountry) {
        saveToHistory({
          source: 'ai',
          documentTypeSlug,
          documentTypeLabel: docType.label,
          countryCode: country,
          countryLabel: docCountry.name,
          isHighRisk: !!data.isHighRisk,
          document: sanitized,
        });
      }
    } catch (err: any) {
      setError(err.message || 'Algo salió mal redactando este documento. Intenta de nuevo.');
      setStep('details');
    }
  }, [legalRequirements, userDetails, usePlaceholders, documentTypeSlug, country, docType, docCountry]);

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
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 no-print">
          <Link href="/herramientas" className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-emerald-500/10 border border-border hover:border-emerald-500/40 text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-all flex-shrink-0" aria-label="Atrás">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/herramientas" className="hover:text-foreground">Herramientas</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-foreground font-medium">Generador de Documentos</span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Con IA · Gratis</span>
            <Link href="/tools/document-generator" className="text-[11px] text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors ml-1">
              Read in English →
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Generador de Documentos con IA</h1>
          <p className="text-muted-foreground leading-relaxed">
            Elige un documento y un país. Investigamos los requisitos legales reales de esa jurisdicción y redactamos un documento completo y con formato que puedes editar y descargar.
          </p>
          <p className="text-xs text-muted-foreground/80 mt-2 no-print">{SHORT_DISCLAIMER}</p>
          <Link
            href="/plantillas"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline mt-3 no-print"
          >
            <FileCheck2 className="h-3.5 w-3.5" />
            ¿Prefieres una plantilla fija? Explora las plantillas gratis →
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 rounded-lg px-4 py-3 text-sm no-print">
            {error}
          </div>
        )}

        <div className="flex justify-end">
          <Link
            href="/plantillas/mis-documentos"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-600 text-white text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors no-print"
          >
            <History className="h-3.5 w-3.5" />
            Mis Documentos
          </Link>
        </div>

        {/* ── Paso: seleccionar ────────────────────────────────────────── */}
        {step === 'select' && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4 mt-2">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Tipo de documento</label>
              <select
                value={documentTypeSlug}
                onChange={e => setDocumentTypeSlug(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground"
              >
                <option value="">Selecciona un documento…</option>
                {DOCUMENT_TYPES_SORTED.slice(0, DOCUMENT_TYPES_POPULAR_COUNT).map(d => (
                  <option key={d.slug} value={d.slug}>{d.label}</option>
                ))}
                <option disabled>──────────</option>
                {DOCUMENT_TYPES_SORTED.slice(DOCUMENT_TYPES_POPULAR_COUNT).map(d => (
                  <option key={d.slug} value={d.slug}>{d.label}</option>
                ))}
              </select>
              {docType && <p className="text-xs text-muted-foreground mt-1.5">{docType.description}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">País</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground"
              >
                <option value="">Selecciona un país…</option>
                {DOCUMENT_COUNTRIES_SORTED.slice(0, DOCUMENT_COUNTRIES_POPULAR_COUNT).map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
                <option disabled>──────────</option>
                {DOCUMENT_COUNTRIES_SORTED.slice(DOCUMENT_COUNTRIES_POPULAR_COUNT).map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            {documentTypeSlug && country && (
              <TemplateAvailableLinkEs documentTypeSlug={documentTypeSlug} country={country} />
            )}

            <button
              onClick={handleResearch}
              disabled={!documentTypeSlug || !country}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Empezar
            </button>
          </div>
        )}

        {/* ── Paso: investigando ───────────────────────────────────────── */}
        {step === 'researching' && (
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center gap-3">
            <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
            <p className="text-foreground font-medium">Investigando requisitos legales…</p>
            <p className="text-sm text-muted-foreground">Verificando qué requiere {docCountry?.name} para {docType?.label.toLowerCase()}.</p>
          </div>
        )}

        {/* ── Paso: detalles ───────────────────────────────────────────── */}
        {step === 'details' && legalRequirements && (
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{legalRequirements.summary}</p>
            </div>

            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-sm font-medium text-foreground mb-2">
                Para generar tu {docType?.label} para {docCountry?.name}, necesitaré:
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
                <label className="text-sm font-medium text-foreground">Tus datos</label>
                <button
                  type="button"
                  onClick={() => { setUsePlaceholders(true); setUserDetails(''); }}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    usePlaceholders
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-dashed border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  Usar datos de ejemplo
                </button>
              </div>
              <textarea
                value={usePlaceholders ? '' : userDetails}
                onChange={e => { setUserDetails(e.target.value); if (usePlaceholders) setUsePlaceholders(false); }}
                disabled={usePlaceholders}
                placeholder={usePlaceholders
                  ? 'Se usarán nombres y datos de ejemplo — puedes llenarlos después de descargar.'
                  : 'Escribe todo lo que tengas — nombres, datos del vehículo, precio, fechas, etc. Un solo mensaje es suficiente.'}
                rows={6}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm text-foreground disabled:opacity-60 disabled:cursor-not-allowed resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep('select')}
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Atrás
              </button>
              <button
                onClick={handleGenerate}
                disabled={!usePlaceholders && !userDetails.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors"
              >
                <Sparkles className="h-4 w-4" />
                Generar Documento
              </button>
            </div>
          </div>
        )}

        {/* ── Paso: generando ──────────────────────────────────────────── */}
        {step === 'generating' && (
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center gap-3">
            <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
            <p className="text-foreground font-medium">Redactando tu documento…</p>
            <p className="text-sm text-muted-foreground">Elaborando {docType?.label.toLowerCase()} completo y con formato.</p>
          </div>
        )}

        {/* ── Paso: vista previa ───────────────────────────────────────── */}
        {step === 'preview' && generatedDocument && (
          <>
            <DocumentEditorEs
              document={generatedDocument}
              onChange={setGeneratedDocument}
              isHighRisk={isHighRisk}
              fileNamePrefix={docType?.label || 'document'}
            />
            <button
              onClick={handleReset}
              className="no-print flex items-center gap-2 border-2 border-border hover:border-foreground/40 text-foreground text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              Empezar de Nuevo
            </button>
          </>
        )}
      </div>
    </div>
  );
}
