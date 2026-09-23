'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NIGERIAN_STATES, getAreasForState } from '@/lib/nigeria-locations';

interface StateLgaSelectProps {
  state: string;
  lga: string;
  onStateChange: (state: string) => void;
  onLgaChange: (lga: string) => void;
  className?: string;
  triggerClassName?: string;
}

export function StateLgaSelect({ state, lga, onStateChange, onLgaChange, className, triggerClassName }: StateLgaSelectProps) {
  const areas = getAreasForState(state);

  return (
    <div className={className}>
      <Select
        value={state || undefined}
        onValueChange={(v) => {
          onStateChange(v);
          onLgaChange(''); // reset LGA when state changes — old selection may not exist in the new state
        }}
      >
        <SelectTrigger className={triggerClassName}><SelectValue placeholder="State" /></SelectTrigger>
        <SelectContent>
          {NIGERIAN_STATES.map((s) => (
            <SelectItem key={s} value={s}>{s}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={lga || undefined} onValueChange={onLgaChange} disabled={!state}>
        <SelectTrigger className={triggerClassName}><SelectValue placeholder={state ? 'LGA / Area' : 'Select state first'} /></SelectTrigger>
        <SelectContent>
          {areas.map((a) => (
            <SelectItem key={a} value={a}>{a}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
