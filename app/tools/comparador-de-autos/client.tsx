'use client';

import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ArrowLeftRight, CheckCircle2, XCircle, Minus, Globe2, Zap } from 'lucide-react';
import { CARS, maintenanceScore, sparePartsScore, isAvailableInCountry, AFRICA_CODES, type CarData } from '../cars-data';
import { CAR_COUNTRIES, CAR_COUNTRIES_ES_PRIORITY, getCarCountry, localPriceRange, FX_SNAPSHOT_DATE, type CarCountry } from '@/lib/car-country-pricing';
import { CAR_TEXT_ES, esBodyType, esFuelType, esTransmission, esMaintenance, esSpareParts, formatCarPriceEs } from '@/lib/cars-data-es';

// ─── Tipos ────────────────────────────────────────────────────────────────────

type Winner = 'left' | 'right' | 'tie';

interface CompareRow {
  label: string;
  leftVal: string;
  rightVal: string;
  winner: Winner;
  note?: string;
}

function winner(leftScore: number, rightScore: number): Winner {
  if (leftScore > rightScore) return 'left';
  if (rightScore > leftScore) return 'right';
  return 'tie';
}

// Países de habla hispana primero, luego el resto de la lista de 50.
const COUNTRIES_ORDERED = [
  ...CAR_COUNTRIES_ES_PRIORITY.map((code) => CAR_COUNTRIES.find((c) => c.code === code)!),
  ...CAR_COUNTRIES.filter((c) => !CAR_COUNTRIES_ES_PRIORITY.includes(c.code)),
];

function buildRows(a: CarData, b: CarData, country: CarCountry): CompareRow[] {
  const priceA = localPriceRange(a.basePriceUSD, country);
  const priceB = localPriceRange(b.basePriceUSD, country);
  const aText = CAR_TEXT_ES[a.id];
  const bText = CAR_TEXT_ES[b.id];

  const rows: CompareRow[] = [
    {
      label: `Precio Est. (${country.name})`,
      leftVal: `${formatCarPriceEs(priceA.min, country)} – ${formatCarPriceEs(priceA.max, country)}`,
      rightVal: `${formatCarPriceEs(priceB.min, country)} – ${formatCarPriceEs(priceB.max, country)}`,
      winner: winner(priceB.min, priceA.min),
      note: `Aproximado — precio base en USD × el multiplicador típico de impuestos/aranceles de importación de ${country.name} × tipo de cambio (referencia FX del ${FX_SNAPSHOT_DATE}). El precio real depende de la versión, el año y el margen del concesionario local.`,
    },
    { label: 'Segmento', leftVal: aText?.segment ?? a.segment, rightVal: bText?.segment ?? b.segment, winner: 'tie' },
    { label: 'Carrocería', leftVal: esBodyType(a.bodyType), rightVal: esBodyType(b.bodyType), winner: 'tie' },
    { label: 'Asientos', leftVal: `${a.seats}`, rightVal: `${b.seats}`, winner: winner(a.seats, b.seats) },
    {
      label: 'Motor',
      leftVal: a.isElectric ? 'Motor Eléctrico' : `${(a.engineCC / 1000).toFixed(1)}L`,
      rightVal: b.isElectric ? 'Motor Eléctrico' : `${(b.engineCC / 1000).toFixed(1)}L`,
      winner: 'tie',
      note: 'Motores más grandes significan más potencia, pero normalmente mayor costo de combustible y mantenimiento.',
    },
    { label: 'Tipo de Combustible', leftVal: esFuelType(a.fuelType), rightVal: esFuelType(b.fuelType), winner: 'tie' },
    { label: 'Transmisión', leftVal: esTransmission(a.transmission), rightVal: esTransmission(b.transmission), winner: 'tie' },
    {
      label: 'Consumo de Combustible',
      leftVal: a.isElectric ? 'Eléctrico — sin costo de combustible' : `${a.fuelConsumption} L/100km`,
      rightVal: b.isElectric ? 'Eléctrico — sin costo de combustible' : `${b.fuelConsumption} L/100km`,
      winner: a.isElectric && b.isElectric ? 'tie' : a.isElectric ? 'left' : b.isElectric ? 'right' : winner(b.fuelConsumption, a.fuelConsumption),
      note: 'Cifra combinada del fabricante. El manejo real en ciudad suele sumar 15–30% más.',
    },
    {
      label: 'Altura al Piso',
      leftVal: `${a.groundClearance}mm`,
      rightVal: `${b.groundClearance}mm`,
      winner: winner(a.groundClearance, b.groundClearance),
      note: 'Se recomiendan 180mm o más para caminos irregulares o sin pavimentar. Menos de 150mm puede complicarse con topes y baches.',
    },
    ...(a.bootSpace > 0 || b.bootSpace > 0
      ? [{
          label: 'Espacio de Baúl',
          leftVal: a.bootSpace > 0 ? `${a.bootSpace}L` : 'Caja de pickup',
          rightVal: b.bootSpace > 0 ? `${b.bootSpace}L` : 'Caja de pickup',
          winner: winner(a.bootSpace, b.bootSpace) as Winner,
        }]
      : []),
    {
      label: 'Costo de Mantenimiento',
      leftVal: esMaintenance(a.maintenanceCost),
      rightVal: esMaintenance(b.maintenanceCost),
      winner: winner(maintenanceScore(a.maintenanceCost), maintenanceScore(b.maintenanceCost)),
      note: 'Costo relativo del mantenimiento de rutina (aceite, filtros, pastillas de freno, bujías) — el costo real en moneda local varía según el país.',
    },
    {
      label: 'Disponibilidad de Repuestos',
      leftVal: esSpareParts(a.spareParts),
      rightVal: esSpareParts(b.spareParts),
      winner: winner(sparePartsScore(a.spareParts), sparePartsScore(b.spareParts)),
      note: 'Qué tan fácil suele ser conseguir repuestos — Toyota y Honda lideran en la mayoría de los mercados; las marcas exóticas y de bajo volumen son Difícil casi en todas partes.',
    },
    { label: 'Problemas Conocidos', leftVal: aText?.commonIssues ?? a.commonIssues, rightVal: bText?.commonIssues ?? b.commonIssues, winner: 'tie' },
  ];

  return rows;
}

// ─── Subcomponentes ───────────────────────────────────────────────────────────

function CountrySelector({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  return (
    <div>
      <label className="block text-xs font-bold text-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
        <Globe2 className="h-3 w-3" /> País y Moneda
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 text-sm border border-border rounded-xl bg-background text-foreground focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer"
      >
        {COUNTRIES_ORDERED.map((c) => (
          <option key={c.code} value={c.code}>{c.flag} {c.name} — {c.currency}</option>
        ))}
      </select>
    </div>
  );
}

function CarSelector({
  value, onChange, exclude, side, cars,
}: {
  value: string; onChange: (id: string) => void; exclude: string; side: 'left' | 'right'; cars: CarData[];
}) {
  const filtered = cars.filter((c) => c.id !== exclude);

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-background border rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-foreground focus:outline-none transition-all cursor-pointer
          ${side === 'left'
            ? 'border-blue-500/40 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20'
            : 'border-emerald-500/40 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20'
          }`}
      >
        <option value="" disabled>Selecciona un auto...</option>
        {filtered.map((c) => (
          <option key={c.id} value={c.id}>{c.brand} {c.model}</option>
        ))}
      </select>
      <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none ${side === 'left' ? 'text-blue-500' : 'text-emerald-500'}`} />
    </div>
  );
}

function WinnerIcon({ w, side }: { w: Winner; side: 'left' | 'right' }) {
  if (w === 'tie') return <Minus className="h-3.5 w-3.5 text-muted-foreground/30" />;
  if (w === side) return <CheckCircle2 className={`h-3.5 w-3.5 ${side === 'left' ? 'text-blue-500' : 'text-emerald-500'}`} />;
  return <XCircle className="h-3.5 w-3.5 text-muted-foreground/20" />;
}

function MaintenanceBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Baja: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Media: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    Alta: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/25',
    'Muy Alta': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function PartsBadge({ val }: { val: string }) {
  const map: Record<string, string> = {
    Fácil: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25',
    Moderada: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25',
    Difícil: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/25',
  };
  return <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${map[val] ?? ''}`}>{val}</span>;
}

function CarCard({ car, side, country }: { car: CarData; side: 'left' | 'right'; country: CarCountry }) {
  const border = side === 'left' ? 'border-blue-500/30' : 'border-emerald-500/30';
  const bg = side === 'left' ? 'bg-blue-500/5' : 'bg-emerald-500/5';
  const price = localPriceRange(car.basePriceUSD, country);
  const text = CAR_TEXT_ES[car.id];

  return (
    <div className={`rounded-2xl border ${border} ${bg} overflow-hidden`}>
      {car.imageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={car.imageUrl}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).parentElement!.style.display = 'none'; }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex items-center gap-1.5 mb-0.5">
          <p className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">{car.brand}</p>
          {car.isElectric && <Zap className="h-3 w-3 text-blue-500" />}
        </div>
        <p className="text-lg font-black text-foreground leading-tight" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
          {car.model}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{esBodyType(car.bodyType)} · {car.seats} asientos · {text?.segment ?? car.segment}</p>
        <p className="text-sm font-bold text-foreground mt-2">
          {formatCarPriceEs(price.min, country)} – {formatCarPriceEs(price.max, country)}
        </p>
      </div>
    </div>
  );
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function ComparadorDeAutosClient() {
  const [countryCode, setCountryCode] = useState('es');
  const [leftId, setLeftId] = useState<string>('toyota-camry');
  const [rightId, setRightId] = useState<string>('honda-crv');

  const country = useMemo(() => getCarCountry(countryCode), [countryCode]);
  const availableCars = useMemo(() => CARS.filter((c) => isAvailableInCountry(c, countryCode)), [countryCode]);

  useEffect(() => {
    const ids = availableCars.map((c) => c.id);
    if (!ids.includes(leftId)) setLeftId(ids[0] ?? '');
    if (!ids.includes(rightId)) setRightId(ids.find((id) => id !== leftId) ?? ids[1] ?? '');
  }, [availableCars]); // eslint-disable-line react-hooks/exhaustive-deps

  const leftCar = useMemo(() => availableCars.find((c) => c.id === leftId) ?? null, [availableCars, leftId]);
  const rightCar = useMemo(() => availableCars.find((c) => c.id === rightId) ?? null, [availableCars, rightId]);

  const rows = useMemo(
    () => (leftCar && rightCar ? buildRows(leftCar, rightCar, country) : []),
    [leftCar, rightCar, country]
  );

  const leftWins = rows.filter((r) => r.winner === 'left').length;
  const rightWins = rows.filter((r) => r.winner === 'right').length;

  function swap() {
    setLeftId(rightId);
    setRightId(leftId);
  }

  return (
    <div className="bg-background border-t border-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Selector de país */}
        <div className="max-w-sm">
          <CountrySelector value={countryCode} onChange={setCountryCode} />
          {AFRICA_CODES.includes(countryCode) && (
            <p className="text-[11px] text-muted-foreground mt-1.5">
              Incluye modelos de importación usados específicos de esta región, además de los 50 modelos globales.
            </p>
          )}
        </div>

        {/* Selectores de auto */}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <CarSelector value={leftId} onChange={setLeftId} exclude={rightId} side="left" cars={availableCars} />
          <button
            onClick={swap}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-card border border-border hover:border-foreground/30 text-muted-foreground hover:text-foreground transition-all"
            aria-label="Intercambiar autos"
            title="Intercambiar"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <CarSelector value={rightId} onChange={setRightId} exclude={leftId} side="right" cars={availableCars} />
        </div>

        {leftCar && rightCar && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <CarCard car={leftCar} side="left" country={country} />
              <CarCard car={rightCar} side="right" country={country} />
            </div>

            <div className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3">
              <div className="text-center min-w-[3rem]">
                <p className="text-2xl font-black text-blue-500" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{leftWins}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">gana</p>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(leftWins / (leftWins + rightWins || 1)) * 100}%` }}
                />
              </div>
              <div className="text-center min-w-[3rem]">
                <p className="text-2xl font-black text-emerald-500" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>{rightWins}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest leading-tight">gana</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border overflow-hidden">
              <div className="divide-y divide-border">
                {rows.map((row, i) => (
                  <div key={row.label} className={`grid grid-cols-[1fr_auto_1fr] gap-2 items-start px-4 py-3 transition-colors ${i % 2 === 0 ? 'bg-card/50' : 'bg-transparent'}`}>
                    <div className="flex items-start gap-1.5">
                      <WinnerIcon w={row.winner} side="left" />
                      <div className="min-w-0">
                        {row.label === 'Costo de Mantenimiento' ? (
                          <MaintenanceBadge val={row.leftVal} />
                        ) : row.label === 'Disponibilidad de Repuestos' ? (
                          <PartsBadge val={row.leftVal} />
                        ) : (
                          <p className={`text-sm leading-snug break-words ${row.winner === 'left' ? 'text-blue-600 dark:text-blue-400 font-semibold' : 'text-muted-foreground'}`}>
                            {row.leftVal}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-center px-2 min-w-[7rem]">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-tight whitespace-normal text-center">
                        {row.label}
                      </p>
                    </div>

                    <div className="flex items-start gap-1.5 justify-end">
                      <div className="min-w-0 text-right">
                        {row.label === 'Costo de Mantenimiento' ? (
                          <MaintenanceBadge val={row.rightVal} />
                        ) : row.label === 'Disponibilidad de Repuestos' ? (
                          <PartsBadge val={row.rightVal} />
                        ) : (
                          <p className={`text-sm leading-snug break-words ${row.winner === 'right' ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-muted-foreground'}`}>
                            {row.rightVal}
                          </p>
                        )}
                      </div>
                      <WinnerIcon w={row.winner} side="right" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              {rows.filter((r) => r.note).map((r) => (
                <p key={r.label} className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-semibold text-foreground">{r.label}:</span> {r.note}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[{ car: leftCar, side: 'left' as const }, { car: rightCar, side: 'right' as const }].map(({ car, side }) => (
                <div key={car.id} className={`rounded-xl border p-4 text-sm ${side === 'left' ? 'bg-blue-500/5 border-blue-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                  <p className={`text-xs font-black uppercase tracking-widest mb-1.5 ${side === 'left' ? 'text-blue-600 dark:text-blue-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                    ⚠ {car.brand} {car.model} — Ten Cuidado
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">{CAR_TEXT_ES[car.id]?.watchOut ?? car.watchOut}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
