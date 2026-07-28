'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, MapPin, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { lookupPlateCode, decodePlateYear } from '@/lib/nigeria-plate-codes';

interface DecodedPlate {
  prefix: string;
  serial: string;
  yearLetter: string | null;
  year: number | null;
  lgaMatch: ReturnType<typeof lookupPlateCode>;
}

function parsePlate(raw: string): DecodedPlate | null {
  const cleaned = raw.replace(/[\s-]/g, '').toUpperCase();
  // Standard post-2011 format: 3 letters + 3 digits + 2 letters (e.g. APP153XY)
  const match = cleaned.match(/^([A-Z]{3})(\d{3})([A-Z]{2})$/);
  if (!match) return null;
  const [, prefix, serial, suffix] = match;
  const yearLetter = suffix[0];
  return {
    prefix,
    serial,
    yearLetter,
    year: decodePlateYear(yearLetter),
    lgaMatch: lookupPlateCode(prefix),
  };
}

export default function PlateNumberCheckerClient() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<DecodedPlate | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const handleCheck = () => {
    setTouched(true);
    const parsed = parsePlate(value);
    if (!parsed) {
      setError('Enter a plate in the standard format, e.g. APP153XY or APP-153-XY.');
      setResult(null);
      return;
    }
    setError(null);
    setResult(parsed);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
      <div className="bg-card border border-border rounded-2xl shadow-xl p-5 sm:p-6 max-w-2xl mx-auto">
        <label className="block text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">
          Enter Nigerian Plate Number
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => { setValue(e.target.value); setTouched(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            placeholder="e.g. APP-153-XY"
            maxLength={12}
            className="flex-1 h-12 px-4 text-sm font-mono tracking-wider uppercase border-2 border-muted-foreground rounded-xl bg-background text-foreground placeholder:text-muted-foreground/60 placeholder:font-sans placeholder:tracking-normal placeholder:normal-case focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
          <button
            onClick={handleCheck}
            className="flex items-center gap-2 px-5 rounded-xl text-sm font-bold transition-all flex-shrink-0 border-2 bg-blue-500 hover:bg-blue-400 text-white border-blue-500 shadow-lg shadow-blue-500/25"
          >
            <Search className="h-4 w-4" />
            Check
          </button>
        </div>

        {error && touched && (
          <p className="mt-3 text-sm text-red-600 dark:text-red-400 flex items-center gap-1.5">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            {error}
          </p>
        )}

        {result && (
          <div className="mt-5 space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
              <Calendar className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-foreground">
                  {result.year ? `Registered in ${result.year}` : 'Registration year could not be decoded'}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  4th character &ldquo;{result.yearLetter}&rdquo; decodes to model/registration year {result.year ?? '—'} (A=2011, sequential).
                </p>
              </div>
            </div>

            {result.lgaMatch ? (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    {result.lgaMatch.lga}, {result.lgaMatch.state}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Prefix &ldquo;{result.prefix}&rdquo; is registered to this Local Government Area.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    &ldquo;{result.prefix}&rdquo; isn&apos;t in our LGA database yet
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 mb-2">
                    This checker covers all 36 states plus the FCT, but this specific prefix isn&apos;t recognised — it may be an older pre-2011 format, a rare/reissued code, or a typo. Verify directly with FRSC below.
                  </p>
                </div>
              </div>
            )}

            <a
              href="https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-muted hover:bg-muted/70 border border-border transition-all"
            >
              <span className="text-sm font-semibold text-foreground">Verify live registration status with FRSC</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </a>
          </div>
        )}

        <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
          This tool decodes plate format and LGA of registration from public data — it does not show vehicle ownership, make/model, or live registration status. For that, use the official <Link href="https://nvis.frsc.gov.ng/VehicleManagement/VerifyPlateNo" target="_blank" rel="noopener noreferrer nofollow" className="underline underline-offset-2">FRSC verification portal</Link> above.
        </p>
      </div>
    </div>
  );
}
