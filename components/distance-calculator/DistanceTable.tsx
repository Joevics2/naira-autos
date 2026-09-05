import { computeDistance } from '@/lib/distance-engine';

export interface DistanceTableTown {
  name: string;
  state: string;
  lat: number;
  lng: number;
}

/**
 * Renders a ranked table: distance from `hub` to every other town, closest
 * first. This is the literal "list out all the distances" component — pure
 * data, not counted in any page's prose word count.
 */
export default function DistanceTable({
  hub, towns, verifiedMatrix, currencyNote,
}: {
  hub: DistanceTableTown;
  towns: DistanceTableTown[];
  verifiedMatrix: Record<string, Record<string, number>>;
  currencyNote?: string;
}) {
  const rows = towns
    .filter((t) => t.name !== hub.name)
    .map((t) => ({ town: t, d: computeDistance(hub, t, verifiedMatrix) }))
    .sort((a, b) => a.d.roadKm - b.d.roadKm);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="text-left font-bold px-4 py-2.5 w-10">#</th>
            <th className="text-left font-bold px-4 py-2.5">Town</th>
            <th className="text-left font-bold px-4 py-2.5">Region/State</th>
            <th className="text-right font-bold px-4 py-2.5">Road km</th>
            <th className="text-right font-bold px-4 py-2.5 hidden sm:table-cell">Source</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((r, i) => (
            <tr key={r.town.name} className="hover:bg-gray-50">
              <td className="px-4 py-2 text-gray-400">{i + 1}</td>
              <td className="px-4 py-2 font-semibold text-gray-900">{r.town.name}</td>
              <td className="px-4 py-2 text-gray-500">{r.town.state}</td>
              <td className="px-4 py-2 text-right font-bold text-gray-900">{Math.round(r.d.roadKm).toLocaleString()} km</td>
              <td className="px-4 py-2 text-right hidden sm:table-cell">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.d.verified ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                  {r.d.verified ? 'Verified' : 'Estimated'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {currencyNote && <p className="text-[11px] text-gray-400 px-4 py-2 border-t border-gray-100">{currencyNote}</p>}
    </div>
  );
}
