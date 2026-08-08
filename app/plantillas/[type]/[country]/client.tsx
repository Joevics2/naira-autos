'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, Home, FileCheck2, Wand2, History } from 'lucide-react';
import { DocumentTemplateRow, fillTemplate } from '@/lib/document-templates-data';
import { DocumentTypeDef, DocumentCountryDef, HIGH_RISK_DOCUMENT_TYPES } from '@/lib/document-types';
import { GeneratedDocument } from '@/lib/document-format';
import { saveToHistory } from '@/lib/document-history';
import DocumentEditorEs from '@/components/documents/DocumentEditorEs';

const SHORT_DISCLAIMER =
  'Solo informativo, no es asesoría legal. Haz que un abogado con licencia revise los acuerdos de alto valor o alto riesgo.';

interface TemplateDocumentClientEsProps {
  template: DocumentTemplateRow;
  docType: DocumentTypeDef;
  docCountry: DocumentCountryDef;
}

export default function TemplateDocumentClientEs({ template, docType, docCountry }: TemplateDocumentClientEsProps) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [usePlaceholders, setUsePlaceholders] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState<GeneratedDocument | null>(null);

  const isHighRisk = HIGH_RISK_DOCUMENT_TYPES.has(docType.slug);

  const handleFieldChange = (id: string, value: string) => {
    setValues(v => ({ ...v, [id]: value }));
    if (usePlaceholders) setUsePlaceholders(false);
  };

  const missingRequired = !usePlaceholders && template.fields.some(f => f.required && !values[f.id]?.trim());

  const handleFill = () => {
    const filled = fillTemplate(template, values, template.fields, usePlaceholders);
    const doc: GeneratedDocument = {
      title: filled.title,
      intro: filled.intro,
      sections: filled.sections,
      signatures: template.signatures,
    };
    setGeneratedDocument(doc);
    saveToHistory({
      source: 'template',
      documentTypeSlug: docType.slug,
      documentTypeLabel: docType.label,
      countryCode: docCountry.code,
      countryLabel: docCountry.name,
      isHighRisk,
      document: doc,
    });
  };

  const handleReset = () => {
    setGeneratedDocument(null);
    setValues({});
    setUsePlaceholders(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-screen-md mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between gap-3 no-print flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <Link href="/plantillas" className="flex items-center justify-center w-8 h-8 rounded-full bg-muted hover:bg-sky-500/10 border border-border hover:border-sky-500/40 text-muted-foreground hover:text-sky-600 dark:hover:text-sky-400 transition-all flex-shrink-0" aria-label="Atrás">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="hover:text-foreground flex items-center gap-1"><Home className="h-3.5 w-3.5" />Inicio</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/plantillas" className="hover:text-foreground">Plantillas</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{docType.label} — {docCountry.name}</span>
            </nav>
          </div>
          <Link
            href="/plantillas/mis-documentos"
            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 border border-emerald-600 text-white text-xs font-semibold rounded-lg px-3 py-1.5 transition-colors flex-shrink-0"
          >
            <History className="h-3.5 w-3.5" />
            Mis Documentos
          </Link>
        </div>

        {!generatedDocument && (
          <>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <FileCheck2 className="h-4 w-4 text-sky-500" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">Plantilla Gratis · Sin Registro</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Plantilla de {docType.label} — {docCountry.flag} {docCountry.name}
              </h1>
            </div>

            {template.legal_note && (
              <div className="bg-sky-500/10 border border-sky-500/30 text-sky-700 dark:text-sky-400 rounded-lg px-4 py-3 text-sm">
                {template.legal_note}
              </div>
            )}

            <p className="text-xs text-muted-foreground/80">{SHORT_DISCLAIMER}</p>

            {/* Formulario para llenar */}
            <div className="bg-card border border-border rounded-xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-foreground">Llena tus datos</h2>
                <button
                  type="button"
                  onClick={() => { setUsePlaceholders(true); setValues({}); }}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-colors ${
                    usePlaceholders
                      ? 'bg-sky-600 border-sky-600 text-white'
                      : 'border-dashed border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground'
                  }`}
                >
                  Usar datos de ejemplo
                </button>
              </div>

              {usePlaceholders ? (
                <p className="text-sm text-muted-foreground bg-background border border-border rounded-lg px-3 py-2.5">
                  Se usarán campos de ejemplo como [NOMBRE COMPLETO DEL VENDEDOR] — llénalos después de descargar.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {template.fields.map(field => (
                    <div key={field.id} className={field.type === 'textarea' ? 'sm:col-span-2' : ''}>
                      <label className="text-xs font-medium text-muted-foreground mb-1 block">
                        {field.label}{field.required && <span className="text-red-500 ml-0.5">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          value={values[field.id] || ''}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground resize-none"
                        />
                      ) : (
                        <input
                          type={field.type === 'date' ? 'date' : field.type === 'number' ? 'number' : 'text'}
                          value={values[field.id] || ''}
                          onChange={e => handleFieldChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleFill}
                disabled={missingRequired}
                className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-3 transition-colors"
              >
                <Wand2 className="h-4 w-4" />
                Llenar Documento
              </button>
            </div>

            {/* Contenido SEO — debajo del formulario */}
            {template.seo_intro && (
              <div className="prose-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
                <p>{template.seo_intro}</p>
              </div>
            )}
          </>
        )}

        {generatedDocument && (
          <DocumentEditorEs
            document={generatedDocument}
            onChange={setGeneratedDocument}
            isHighRisk={isHighRisk}
            fileNamePrefix={docType.label}
            onReset={handleReset}
            resetLabel="Editar Datos de Nuevo"
          />
        )}
      </div>
    </div>
  );
}
