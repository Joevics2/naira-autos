// Czysty silnik obliczeń dla kalkulatora importu samochodu do Polski.
// Spoza UE: cło 10 % od wartości celnej (cena + fracht + ubezpieczenie do granicy UE); akcyza od wartości celnej
// powiększonej o cło i koszty do pierwszego miejsca przeznaczenia; VAT 23 % od wartości celnej + cło + akcyza.
// Z UE: brak cła; VAT 23 % tylko dla nowego środka transportu (do 6 miesięcy LUB do 6 000 km).
// Akcyza (art. 105 ustawy o podatku akcyzowym): 3,1 %, 18,6 %, 1,55 %, 9,3 % albo zwolnienie. PCC 2 % przy zakupie od osoby prywatnej.

export type PlRoute = 'poza-ue' | 'ue';
export type PlOrigin = 'us' | 'jp' | 'kr' | 'uk' | 'cn_ice' | 'cn_bev' | 'other';
export type PlDrive = 'spalinowy' | 'hev' | 'phev' | 'bev';

export const CLO_PCT = 10;
export const VAT_PCT = 23;
export const PCC_PCT = 2;
export const OPLATY_REJESTRACJA_DOMYSLNE = 256;

export function akcyzaPct(drive: PlDrive, cc: number): number {
  if (drive === 'bev') return 0;
  if (drive === 'phev') {
    if (cc <= 2000) return 0; // zwolnienie do 31 grudnia 2029
    return cc <= 3500 ? 9.3 : 18.6;
  }
  if (drive === 'hev') {
    if (cc <= 2000) return 1.55;
    return cc <= 3500 ? 9.3 : 18.6;
  }
  return cc > 2000 ? 18.6 : 3.1;
}

export interface PlInput {
  route: PlRoute;
  origin: PlOrigin;
  hasOriginProof: boolean;
  cvdPct: number;
  cenaPLN: number;
  transportPLN: number;       // fracht + ubezpieczenie do granicy UE (poza UE) lub transport (UE)
  kosztyDoCelu: number;       // koszty do pierwszego miejsca przeznaczenia w UE (poza UE)
  nowyUE: boolean;            // zakup z UE: do 6 miesięcy LUB do 6 000 km
  drive: PlDrive;
  cc: number;
  sprzedawcaPrywatny: boolean; // PCC 2 % od ceny
  oplatyRejestracjaPLN: number;
  inneKosztyPLN: number;
}

export interface PlLine { key: string; label: string; pct?: number; amount: number }
export interface PlResult {
  wartoscCelna: number; clo: number; cloPct: number; cvd: number; akcyzaBase: number; akcyzaPct: number; akcyza: number;
  vatBase: number; vat: number; vatPct: number; pcc: number; podatki: number; podatkiPctCeny: number; razem: number; lines: PlLine[]; notatki: string[];
}

export function cloRate(i: Pick<PlInput, 'route' | 'origin' | 'hasOriginProof'>): number {
  if (i.route !== 'poza-ue') return 0;
  if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && i.hasOriginProof) return 0;
  return CLO_PCT;
}

export function calcPl(i: PlInput): PlResult {
  const notatki: string[] = [];
  const cena = Math.max(0, i.cenaPLN);
  const transport = Math.max(0, i.transportPLN);
  const dest = Math.max(0, i.kosztyDoCelu);
  const poza = i.route === 'poza-ue';
  const wartoscCelna = poza ? cena + transport : cena;
  const cloPct = cloRate(i);
  const cvdPct = poza && i.origin === 'cn_bev' ? Math.max(0, i.cvdPct) : 0;
  const clo = (wartoscCelna * cloPct) / 100;
  const cvd = (wartoscCelna * cvdPct) / 100;
  if (poza) {
    if (i.origin === 'cn_bev') notatki.push('Chińskie auta elektryczne: 10 % cła plus cło wyrównawcze zależne od producenta.');
    if (['us', 'jp', 'kr', 'uk'].includes(i.origin) && !i.hasOriginProof) notatki.push('Bez ważnego dowodu pochodzenia obowiązuje zwykłe cło 10 %.');
    if (i.origin === 'us' && i.hasOriginProof) notatki.push('USA: 0 % od 1 lipca 2026 r. (rozporządzenie (UE) 2026/1455), tylko dla aut wyprodukowanych w USA, z udokumentowanym bezpośrednim transportem.');
    if (i.origin === 'jp' && i.hasOriginProof) notatki.push('Japonia: 0 % od 1 lutego 2026 r. (umowa o partnerstwie gospodarczym UE-Japonia), z dowodem pochodzenia.');
  }

  const stawka = akcyzaPct(i.drive, i.cc);
  const akcyzaBase = poza ? wartoscCelna + clo + cvd + dest : cena + transport;
  const akcyza = (akcyzaBase * stawka) / 100;
  if (i.drive === 'bev') notatki.push('Auta elektryczne i wodorowe są zwolnione z akcyzy.');
  else if (i.drive === 'phev' && i.cc <= 2000) notatki.push('Hybryda plug-in do 2000 cm³: zwolnienie z akcyzy do 31 grudnia 2029 r. (pod warunkiem spełnienia wymogów z ustawy).');
  else if (stawka === 18.6) notatki.push('Stawka 18,6 % obowiązuje powyżej 2000 cm³ (hybrydy: powyżej 3500 cm³). Granica jest ścisła: 2000 cm³ płaci 3,1 %, 2001 cm³ już 18,6 %.');

  const vatPotrzebny = poza || i.nowyUE;
  const vatBase = poza ? wartoscCelna + clo + cvd + akcyza + dest : cena + transport + akcyza;
  const vat = vatPotrzebny ? (vatBase * VAT_PCT) / 100 : 0;
  if (!poza) notatki.push(i.nowyUE
    ? 'Nowy środek transportu (do 6 miesięcy LUB do 6 000 km): VAT 23 % w Polsce, także przy zakupie od osoby prywatnej.'
    : 'Auto używane z UE (ponad 6 miesięcy i ponad 6 000 km): bez polskiego VAT, jeśli podatek zapłacono w kraju zakupu.');

  const pcc = i.sprzedawcaPrywatny ? (cena * PCC_PCT) / 100 : 0;
  if (i.sprzedawcaPrywatny) notatki.push('PCC 2 % płaci kupujący od osoby prywatnej. Źródła różnią się co do zakupu za granicą, więc możesz wyłączyć tę opcję, jeśli Twój urząd skarbowy jej nie wymaga.');

  const podatki = clo + cvd + akcyza + vat + pcc;
  const razem = cena + transport + (poza ? dest : 0) + podatki + Math.max(0, i.oplatyRejestracjaPLN) + Math.max(0, i.inneKosztyPLN);
  const lines: PlLine[] = [];
  if (poza) lines.push({ key: 'clo', label: 'Cło', pct: cloPct, amount: clo });
  if (cvdPct > 0) lines.push({ key: 'cvd', label: 'Cło wyrównawcze (Chiny, EV)', pct: cvdPct, amount: cvd });
  lines.push({ key: 'akcyza', label: 'Akcyza', pct: stawka, amount: akcyza });
  lines.push({ key: 'vat', label: poza ? 'VAT przy imporcie' : 'VAT', pct: vatPotrzebny ? VAT_PCT : 0, amount: vat });
  if (i.sprzedawcaPrywatny) lines.push({ key: 'pcc', label: 'PCC od zakupu', pct: PCC_PCT, amount: pcc });
  return { wartoscCelna, clo, cloPct, cvd, akcyzaBase, akcyzaPct: stawka, akcyza, vatBase, vat, vatPct: vatPotrzebny ? VAT_PCT : 0, pcc, podatki, podatkiPctCeny: cena > 0 ? (podatki / cena) * 100 : 0, razem, lines, notatki };
}
