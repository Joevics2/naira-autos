'use client';

import { useState, useRef, useMemo } from 'react';
import {
  Search, RotateCcw, Wrench, Gauge, Car, Info, HelpCircle, Zap,
} from 'lucide-react';
import { matchEngineCode, EngineMatch, EngineMatchConfidence } from '@/lib/vehicle/engineNumberMatcher';

const EXAMPLES = ['2JZ-GTE', 'K20A', 'B58', 'RB26DETT', 'EJ257'];

function ConfidenceBadge({ confidence }: { confidence: EngineMatchConfidence }) {
  const map: Record<EngineMatchConfidence, { label: string; cls: string }> = {
    high: { label: 'Confianza Alta', cls: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400' },
    medium: { label: 'Confianza Media', cls: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-400' },
    low: { label: 'Confianza Baja', cls: 'bg-orange-50 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20 text-orange-700 dark:text-orange-400' },
    none: { label: 'Sin Coincidencia', cls: 'bg-muted border-border text-muted-foreground' },
  };
  const { label, cls } = map[confidence];
  return <span className={`text-sm px-3 py-1.5 rounded-full border-2 font-bold ${cls}`}>{label}</span>;
}

function MatchCard({ match, rank }: { match: EngineMatch; rank: number }) {
  return (
    <div className={`rounded-2xl border-2 bg-card p-5 sm:p-7 ${rank === 0 ? 'border-sky-500/50 ring-2 ring-sky-500/20 shadow-lg shadow-sky-500/5' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-3 mb-5 flex-wrap">
        <div className="inline-flex items-center gap-2.5 pl-3.5 pr-4 py-2.5 rounded-xl bg-sky-500/10 border-2 border-sky-500/30">
          <Car className="h-6 w-6 text-sky-600 dark:text-sky-400 flex-shrink-0" />
          <span className="text-xl sm:text-2xl font-black uppercase tracking-wide text-sky-700 dark:text-sky-400 leading-none">{match.brand}</span>
          {match.family && (
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wide text-sky-600/80 dark:text-sky-400/70 border-l-2 border-sky-500/30 pl-2.5 ml-0.5 leading-none">{match.family}</span>
          )}
        </div>
        {rank === 0 && (
          <span className="flex items-center gap-1 flex-shrink-0 text-xs font-bold tracking-widest uppercase bg-sky-500 text-white px-3 py-1.5 rounded-full">
            <Zap className="h-3.5 w-3.5" /> Mejor Coincidencia
          </span>
        )}
      </div>

      <p className="text-3xl sm:text-4xl font-black text-foreground font-mono tracking-tight mb-5 break-all">{match.code}</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
          <Gauge className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">Cilindrada</p>
            <p className="text-base sm:text-lg font-black text-foreground">{match.displacement}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-muted/50 rounded-xl px-4 py-3">
          <Wrench className="h-6 w-6 text-muted-foreground flex-shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-bold">Configuración</p>
            <p className="text-base sm:text-lg font-black text-foreground">{match.config}</p>
          </div>
        </div>
      </div>

      {match.powerRange && (
        <p className="text-sm text-muted-foreground mb-3"><span className="font-bold text-foreground">Potencia:</span> {match.powerRange}</p>
      )}
      {match.notes && (
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{match.notes}</p>
      )}

      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Aplicaciones Comunes</p>
        <div className="flex flex-wrap gap-2">
          {match.applications.map((app) => (
            <span key={app} className="text-sm px-3 py-1.5 rounded-lg bg-muted text-foreground font-semibold">{app}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function VerificarNumeroDeMotorClient() {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { matches, confidence } = useMemo(() => matchEngineCode(submitted), [submitted]);

  const analyze = () => {
    const cleaned = input.trim();
    if (!cleaned) return;
    setSubmitted(cleaned);
  };

  const reset = () => {
    setInput('');
    setSubmitted('');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const hasSearched = submitted.length > 0;

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* Input bar */}
        <div className="max-w-2xl mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && analyze()}
                placeholder="ej. 2JZ-GTE, K20A1234567, B58B30A0E123456"
                spellCheck={false}
                className="w-full h-12 px-4 text-sm font-mono tracking-wide border-2 border-muted-foreground rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 placeholder:font-sans focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all"
              />
            </div>
            <button
              onClick={analyze}
              disabled={!input.trim()}
              className={`flex items-center gap-2 px-5 rounded-xl text-sm font-bold transition-all flex-shrink-0 border-2 ${input.trim() ? 'bg-sky-500 hover:bg-sky-400 text-white border-sky-500 shadow-lg shadow-sky-500/25' : 'bg-muted text-muted-foreground border-muted-foreground cursor-not-allowed'}`}
            >
              <Search className="h-4 w-4" />Analizar
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="text-xs text-muted-foreground">Prueba:</span>
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => { setInput(ex); setSubmitted(ex); }}
                className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted hover:bg-sky-500/10 hover:text-sky-600 dark:hover:text-sky-400 text-muted-foreground transition-colors"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {hasSearched && (
          <div className="space-y-5 max-w-3xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <ConfidenceBadge confidence={confidence} />
              <span className="text-sm text-muted-foreground">para &ldquo;<span className="font-mono font-semibold text-foreground">{submitted}</span>&rdquo;</span>
              <button onClick={reset} className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <RotateCcw className="h-3 w-3" /> Nueva búsqueda
              </button>
            </div>

            {matches.length > 0 ? (
              <>
                <div className="space-y-4">
                  {matches.map((m, i) => (
                    <MatchCard key={`${m.code}-${i}`} match={m} rank={i} />
                  ))}
                </div>

                <div className="flex items-start gap-2.5 p-4 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20">
                  <Info className="h-4 w-4 text-sky-600 dark:text-sky-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-sky-800 dark:text-sky-300 leading-relaxed">
                    Esto es solo una <strong>coincidencia de código de familia</strong>. El número de serie grabado después del código de familia es único para ese motor específico y ninguna herramienta pública puede decodificarlo. Confirma siempre con el fabricante o con los documentos oficiales de registro de tu vehículo antes de comprar, importar o pedir piezas.
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-foreground">Ningún código de familia conocido coincide con &ldquo;{submitted}&rdquo;</p>
                    <p className="text-xs text-muted-foreground mt-1">Esta base de datos cubre actualmente las familias de motores más comunes y populares. Todavía no incluye cada código de cada fabricante.</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-bold text-foreground uppercase tracking-wide mb-2">Cómo suelen estar estructurados los números de motor</p>
                  <ul className="space-y-1.5 text-xs text-muted-foreground leading-relaxed list-disc list-inside">
                    <li>El <strong className="text-foreground">código de familia</strong> va primero — una combinación corta de letras y números como 2JZ, K20 o B58 que identifica el diseño del motor.</li>
                    <li>Le sigue un <strong className="text-foreground">número de serie único</strong>, que identifica a ese motor específico — esta parte nunca se puede decodificar públicamente.</li>
                    <li>Intenta ingresar solo la primera parte del grabado (las letras y los primeros dígitos) en lugar de la cadena completa.</li>
                    <li>Verifica que estás leyendo el <strong className="text-foreground">número de motor</strong>, no el chasis/VIN — están grabados en lugares distintos y significan cosas distintas.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="max-w-2xl rounded-2xl border border-dashed border-border bg-muted/30 p-6 flex items-start gap-3">
            <Car className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Ingresa un número de motor o código de motor arriba — funciona tanto el grabado completo como solo el código de familia (ej. <span className="font-mono text-foreground">2JZ-GTE</span>). Esta herramienta compara contra códigos de familia conocidos y muestra marca, cilindrada, configuración y aplicaciones comunes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
