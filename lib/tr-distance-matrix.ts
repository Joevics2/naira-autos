/**
 * Verified road distances for Turkey, in kilometres. Sourced
 * directly from KGM (Karayollari Genel Mudurlugu - the General
 * Directorate of Highways), which publishes an official 81x81
 * inter-provincial distance chart (dated 3 March 2026 as of this
 * writing), including a downloadable raw file. These 6 pairs are
 * its most-queried routes, cited directly by a secondary site that
 * pulls the full matrix programmatically from KGM's own data.
 *
 * Worth flagging: the official Istanbul-Izmir figure (566km) is
 * measured via the standard inland route KGM's chart uses, and is
 * noticeably longer than the ~478-480km commonly quoted by newer
 * sources for the Osmangazi Bridge (O-5 motorway) route opened in
 * 2016 - a genuine two-route difference, not an error, similar to
 * South Africa's Durban-Cape Town inland-vs-coastal split elsewhere
 * in this tool. The official figure is used here since it's the
 * government-verified one, with the discrepancy explained on the
 * page itself.
 *
 * Every other route falls back to the Haversine-based estimate in
 * distance-engine.ts, which is what every page should call rather
 * than reading this object directly.
 */

export const TR_CAPITAL_DISTANCE_KM: Record<string, Record<string, number>> = {
  "Ankara": { "\u0130stanbul": 453, "Antalya": 542 },
  "Antalya": { "\u0130stanbul": 715, "Ankara": 542, "\u0130zmir": 447 },
  "Trabzon": { "\u0130stanbul": 1057 },
  "\u0130stanbul": { "Ankara": 453, "\u0130zmir": 566, "Antalya": 715, "Trabzon": 1057 },
  "\u0130zmir": { "\u0130stanbul": 566, "Antalya": 447 },
};
