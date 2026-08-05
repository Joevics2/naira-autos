'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Search, AlertTriangle, CheckCircle2, AlertCircle,
  Car, Zap, Globe, Shield, RotateCcw, Copy, Check, ChevronRight
} from 'lucide-react';

interface DecodedVehicle {
  make: string; model: string; modelYear: string; trim: string;
  series: string; vehicleType: string; bodyClass: string;
  engineCylinders: string; engineDisplacementL: string; fuelTypePrimary: string;
  engineModel: string; engineHP: string; turbo: string;
  plantCountry: string; plantCity: string; manufacturer: string;
  abs: string; airBagLocFront: string; driveType: string;
  transmissionStyle: string; doors: string; seatBeltsAll: string;
  errorCode: string; errorText: string;
}

const FIELD_MAP: Record<string, keyof DecodedVehicle> = {
  'Make': 'make', 'Model': 'model', 'Model Year': 'modelYear',
  'Trim': 'trim', 'Series': 'series', 'Vehicle Type': 'vehicleType',
  'Body Class': 'bodyClass', 'Engine Number of Cylinders': 'engineCylinders',
  'Displacement (L)': 'engineDisplacementL', 'Fuel Type - Primary': 'fuelTypePrimary',
  'Engine Model': 'engineModel', 'Engine Brake (hp) From': 'engineHP', 'Turbo': 'turbo',
  'Plant Country': 'plantCountry', 'Plant City': 'plantCity', 'Manufacturer Name': 'manufacturer',
  'Anti-lock Braking System (ABS)': 'abs', 'Air Bag Loc Front': 'airBagLocFront',
  'Drive Type': 'driveType', 'Transmission Style': 'transmissionStyle',
  'Doors': 'doors', 'Seat Belts All': 'seatBeltsAll',
  'Error Code': 'errorCode', 'Error Text': 'errorText',
};

const YEAR_MAP: Record<string, string> = {
  'A':'2010','B':'2011','C':'2012','D':'2013','E':'2014','F':'2015',
  'G':'2016','H':'2017','J':'2018','K':'2019','L':'2020','M':'2021',
  'N':'2022','P':'2023','R':'2024','S':'2025','T':'2026',
  '1':'2001','2':'2002','3':'2003','4':'2004','5':'2005','6':'2006',
  '7':'2007','8':'2008','9':'2009',
};

const VIN_LOCATIONS = [
  { n: '1', spot: 'Placa del tablero', detail: 'A través del parabrisas, lado del conductor.' },
  { n: '2', spot: 'Marco de la puerta', detail: 'Dentro del marco de la puerta del conductor — debe coincidir con el tablero.' },
  { n: '3', spot: 'Chasis troquelado', detail: 'Troquelado en el chasis, bajo el cofre/capó.' },
  { n: '4', spot: 'Cajuela / bajo asiento', detail: 'Algunos modelos lo marcan bajo la alfombra de la cajuela o el asiento delantero.' },
];

function parseNHTSA(results: Record<string, string>): DecodedVehicle {
  const out: Partial<DecodedVehicle> = {};
  for (const [variable, value] of Object.entries(results)) {
    const key = FIELD_MAP[variable];
    if (key && value && value !== 'Not Applicable' && value !== '' && value !== '0') (out as any)[key] = value;
  }
  return out as DecodedVehicle;
}
function isValidVIN(v: string) { return /^[A-HJ-NPR-Z0-9]{17}$/i.test(v); }
function getOriginFlag(c: string) {
  const m: Record<string, string> = { 'united states':'🇺🇸','usa':'🇺🇸','canada':'🇨🇦','mexico':'🇲🇽','japan':'🇯🇵','germany':'🇩🇪','south korea':'🇰🇷','united kingdom':'🇬🇧','china':'🇨🇳','sweden':'🇸🇪' };
  return m[c?.toLowerCase()] ?? '🌍';
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-xs text-muted-foreground flex-shrink-0">{label}</span>
      <span className="text-xs font-semibold text-foreground text-right">{value}</span>
    </div>
  );
}
function SpecCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center gap-2 mb-2.5">{icon}<p className="text-xs font-bold text-foreground uppercase tracking-wide">{title}</p></div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}
function Badge({ color, children }: { color: 'emerald' | 'blue' | 'gray'; children: React.ReactNode }) {
  const cls = { emerald: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400', blue: 'bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400', gray: 'bg-muted border-border text-muted-foreground' }[color];
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{children}</span>;
}

export default function ChassisNumberCheckerClient() {
  const [vin, setVin] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DecodedVehicle | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [vinSource, setVinSource] = useState<'nhtsa' | 'fallback' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const decode = async () => {
    const cleaned = vin.trim().toUpperCase();
    if (!cleaned) { setError('Ingresa un número de chasis.'); return; }
    if (!isValidVIN(cleaned)) { setError('El número de chasis debe tener exactamente 17 caracteres — letras (sin I, O, Q) y números.'); return; }
    setLoading(true); setError(''); setResult(null); setVinSource(null);
    try {
      const data = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${cleaned}?format=json`).then(r => r.json());
      const raw: Record<string, string> = data.Results?.[0] ?? {};
      const decoded = parseNHTSA(raw);
      if (!(decoded.make || decoded.model || decoded.modelYear)) {
        setVinSource('fallback');
        setResult({ make:'',model:'',modelYear:YEAR_MAP[cleaned[9]]??'',trim:'',series:'',vehicleType:'',bodyClass:'',engineCylinders:'',engineDisplacementL:'',fuelTypePrimary:'',engineModel:'',engineHP:'',turbo:'',plantCountry:'',plantCity:'',manufacturer:'',abs:'',airBagLocFront:'',driveType:'',transmissionStyle:'',doors:'',seatBeltsAll:'',errorCode:raw['Error Code']??'',errorText:raw['Error Text']??'' });
      } else { setVinSource('nhtsa'); setResult(decoded); }
    } catch { setError('No se pudo conectar con la base de datos de chasis. Revisa tu conexión e intenta de nuevo.'); }
    finally { setLoading(false); }
  };

  const copyVin = async () => { await navigator.clipboard.writeText(vin.trim().toUpperCase()); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const reset = () => { setVin(''); setResult(null); setError(''); setVinSource(null); setTimeout(() => inputRef.current?.focus(), 50); };
  const vinDisplay = vin.trim().toUpperCase().padEnd(17, '_').slice(0, 17).split('');

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8">

        {/* VIN Input bar */}
        <div className="max-w-2xl mb-8">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <input ref={inputRef} type="text" value={vin}
                onChange={e => { setVin(e.target.value.toUpperCase().replace(/[^A-HJ-NPR-Z0-9]/gi,'').slice(0,17)); setError(''); setResult(null); }}
                onKeyDown={e => e.key === 'Enter' && decode()}
                placeholder="Ingresa el número de chasis (17 caracteres)"
                maxLength={17} spellCheck={false}
                className="w-full h-12 px-4 text-sm font-mono tracking-wider border-2 border-muted-foreground rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 placeholder:font-sans placeholder:tracking-normal focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              {vin && (
                <button onClick={copyVin} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                </button>
              )}
            </div>
            <button onClick={decode} disabled={loading || vin.length < 17}
              className={`flex items-center gap-2 px-5 rounded-xl text-sm font-bold transition-all flex-shrink-0 border-2 ${!loading && vin.length === 17 ? 'bg-blue-500 hover:bg-blue-400 text-white border-blue-500 shadow-lg shadow-blue-500/25' : 'bg-muted text-muted-foreground border-muted-foreground cursor-not-allowed'}`}>
              {loading ? <><div className="w-4 h-4 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />Decodificando...</> : <><Search className="h-4 w-4" />Decodificar</>}
            </button>
          </div>
          <div className="flex gap-0.5 mt-2">
            {vinDisplay.map((ch, i) => <div key={i} className={`flex-1 h-1 rounded-sm ${ch !== '_' ? 'bg-blue-500' : 'bg-border'}`} />)}
          </div>
          <div className="flex justify-between items-center mt-1">
            <span className="text-xs text-muted-foreground">{vin.length}/17 caracteres</span>
            {vin.length === 17 && <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">Listo para decodificar</span>}
          </div>
          {error && (
            <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
              <AlertCircle className="h-4 w-4 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}
        </div>

        {result ? (
          <div className="space-y-4 max-w-4xl">
            {/* Status */}
            {vinSource === 'fallback' ? (
              <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">Datos limitados — vehículo no estadounidense</p>
                  <p className="text-xs text-amber-700 dark:text-amber-300/70 mt-1">Este número de chasis está fuera de la base de datos NHTSA (origen europeo/asiático). Año de modelo decodificado directamente de su estructura{result.modelYear ? `: ${result.modelYear}` : ''}. Para especificaciones completas, contacta al fabricante.</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm text-emerald-700 dark:text-emerald-300">Número de chasis decodificado — vehículo norteamericano confirmado</p>
                <button onClick={reset} className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"><RotateCcw className="h-3 w-3" /> Nueva consulta</button>
              </div>
            )}

            {/* Vehicle hero */}
            {(result.make || result.model || result.modelYear) && (
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Car className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-black text-foreground" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                      {[result.modelYear, result.make, result.model].filter(Boolean).join(' ')}
                      {result.trim && <span className="text-muted-foreground ml-2 text-base font-semibold">{result.trim}</span>}
                    </h2>
                    {result.bodyClass && <p className="text-sm text-muted-foreground mt-0.5">{result.bodyClass}{result.series ? ` · ${result.series}` : ''}</p>}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {result.fuelTypePrimary && <Badge color="emerald">{result.fuelTypePrimary}</Badge>}
                      {result.vehicleType && <Badge color="blue">{result.vehicleType}</Badge>}
                      {result.driveType && <Badge color="gray">{result.driveType}</Badge>}
                      {result.plantCountry && <Badge color="gray">{getOriginFlag(result.plantCountry)} {result.plantCountry}</Badge>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Spec cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {(result.engineCylinders || result.engineDisplacementL || result.engineHP) && (
                <SpecCard icon={<Zap className="h-3.5 w-3.5 text-orange-500" />} title="Motor">
                  {result.engineCylinders && <Row label="Cilindros" value={result.engineCylinders} />}
                  {result.engineDisplacementL && <Row label="Cilindrada" value={result.engineDisplacementL + 'L'} />}
                  {result.engineHP && <Row label="HP" value={result.engineHP} />}
                </SpecCard>
              )}
              {(result.manufacturer || result.plantCountry) && (
                <SpecCard icon={<Globe className="h-3.5 w-3.5 text-blue-500" />} title="Origen">
                  {result.manufacturer && <Row label="Fabricante" value={result.manufacturer} />}
                  {result.plantCountry && <Row label="País" value={`${getOriginFlag(result.plantCountry)} ${result.plantCountry}`} />}
                  {result.plantCity && <Row label="Planta" value={result.plantCity} />}
                </SpecCard>
              )}
              {(result.modelYear || result.doors || result.transmissionStyle) && (
                <SpecCard icon={<Car className="h-3.5 w-3.5 text-emerald-500" />} title="Vehículo">
                  {result.modelYear && <Row label="Año" value={result.modelYear} />}
                  {result.doors && <Row label="Puertas" value={result.doors} />}
                  {result.transmissionStyle && <Row label="Transmisión" value={result.transmissionStyle} />}
                </SpecCard>
              )}
              {(result.abs || result.airBagLocFront) && (
                <SpecCard icon={<Shield className="h-3.5 w-3.5 text-emerald-500" />} title="Seguridad">
                  {result.abs && <Row label="ABS" value={result.abs} />}
                  {result.airBagLocFront && <Row label="Bolsas de aire" value={result.airBagLocFront} />}
                  {result.seatBeltsAll && <Row label="Cinturones" value={result.seatBeltsAll} />}
                </SpecCard>
              )}
            </div>

            {/* VIN verification warning */}
            <div className="rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/5 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">Verifica el número de chasis en todas las ubicaciones físicas</p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {VIN_LOCATIONS.map(({ n, spot, detail }) => (
                      <div key={n} className="flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-200/70">
                        <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-[9px]">{n}</span>
                        <div><strong className="text-amber-800 dark:text-amber-200/80">{spot}:</strong> {detail}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-2">
              <Link href="/tools/mecanico-virtual" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Diagnostica este auto</p>
                <ChevronRight className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-500" />
              </Link>
              <Link href="/tools/calculadora-de-kilometraje" className="flex items-center justify-between gap-2 px-3 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Revisar kilometraje</p>
                <ChevronRight className="h-3.5 w-3.5 text-blue-600 dark:text-blue-500" />
              </Link>
            </div>
          </div>
        ) : (
          /* Pre-search guide */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl">
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Dónde Encontrar el Número de Chasis</h3>
              <div className="space-y-2">
                {VIN_LOCATIONS.map(({ n, spot, detail }) => (
                  <div key={n} className="flex items-start gap-2.5 p-3 rounded-xl bg-card border border-border">
                    <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-black flex items-center justify-center flex-shrink-0">{n}</span>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{spot}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">Estructura del Número de Chasis</h3>
              <div className="space-y-2">
                {[
                  { pos: '1–3', name: 'WMI', desc: 'País y fabricante' },
                  { pos: '4–8', name: 'VDS', desc: 'Modelo, motor, carrocería' },
                  { pos: '9', name: 'Dígito verificador', desc: 'Valida el número de chasis completo' },
                  { pos: '10', name: 'Año de modelo', desc: 'K=2019 · L=2020 · N=2022' },
                  { pos: '11', name: 'Planta', desc: 'Código de la planta de ensamblaje' },
                  { pos: '12–17', name: 'Serie', desc: 'Número de producción único' },
                ].map(({ pos, name, desc }) => (
                  <div key={pos} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-card border border-border">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-1.5 py-0.5 rounded flex-shrink-0">{pos}</span>
                    <div>
                      <span className="text-xs font-semibold text-foreground">{name} </span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}