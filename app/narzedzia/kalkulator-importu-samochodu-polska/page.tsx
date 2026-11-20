import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import KalkulatorImportuPolskaClient from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/narzedzia/kalkulator-importu-samochodu-polska';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'Import samochodu do Polski 2026 — kalkulator cła, akcyzy, VAT i PCC',
  description: 'Darmowy kalkulator importu samochodu do Polski: cło 10 %, akcyza 3,1 % lub 18,6 %, hybrydy 1,55 % i 9,3 %, VAT 23 %, PCC 2 %, USA i Japonia po 0 %, chińskie elektryki. Aktualne na listopad 2026.',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'Import samochodu do Polski: kalkulator | Naira Autos',
    description: 'Policz cło, akcyzę, VAT i PCC dla auta sprowadzonego do Polski.',
    url: URL, siteName: 'Naira Autos', locale: 'pl_PL', type: 'website',
  },
  keywords: [
    'ile kosztuje sprowadzenie auta do Polski', 'kalkulator akcyzy samochód 2026', 'akcyza 3,1 18,6 samochód',
    'akcyza hybryda 1,55 9,3', 'cło samochód spoza UE 10', 'sprowadzenie auta z USA 2026 cło 0',
    'PCC-3 auto z zagranicy 2 procent', 'akcyza 2000 cm3 granica', 'AKC-U termin 14 dni',
  ].join(', '),
};

const FAQ = [
  { q: 'Jakie podatki płacę, sprowadzając auto do Polski?', a: 'Przy aucie spoza UE płacisz cło 10 % od wartości celnej (cena, fracht i ubezpieczenie do granicy UE), akcyzę oraz VAT 23 % od wartości celnej powiększonej o cło i akcyzę. Przy aucie z UE nie ma cła, a VAT płacisz tylko za nowy środek transportu. Akcyzę płacisz zawsze, przed pierwszą rejestracją w Polsce, a przy zakupie od osoby prywatnej dochodzi PCC 2 %.' },
  { q: 'Ile wynosi akcyza na samochód w 2026 roku?', a: 'Samochód osobowy z silnikiem do 2000 cm³ płaci 3,1 % podstawy opodatkowania, a powyżej 2000 cm³ 18,6 %. Hybryda bez ładowania z gniazdka (HEV) płaci 1,55 % do 2000 cm³ i 9,3 % od 2001 do 3500 cm³. Hybryda plug-in do 2000 cm³ jest zwolniona do końca 2029 roku, a powyżej 2000 do 3500 cm³ płaci 9,3 %. Auta elektryczne i wodorowe są zwolnione.' },
  { q: 'Dlaczego granica 2000 cm³ ma takie znaczenie?', a: 'Bo jest ścisła. Silnik o pojemności 2000 cm³ mieści się jeszcze w stawce 3,1 %, a 2001 cm³ przechodzi już do 18,6 %. Dla auta za 80 000 zł oznacza to akcyzę 2 480 zł zamiast 14 880 zł, czyli o 12 400 zł więcej. Sprawdź dokładną pojemność w dowodzie rejestracyjnym, pole P.1.' },
  { q: 'Od jakiej kwoty liczy się akcyzę?', a: 'Przy aucie z UE podstawą jest cena zakupu powiększona o koszty transportu, a urząd może zakwestionować cenę rażąco niską. Przy aucie spoza UE podstawą jest wartość celna powiększona o cło i koszty do pierwszego miejsca przeznaczenia w UE. Kalkulator stosuje te zasady, a koszty w UE możesz wpisać osobno.' },
  { q: 'Czy muszę płacić PCC przy zakupie auta za granicą?', a: 'Źródła się różnią. Poradniki i urzędy opisują PCC 2 % jako należny przy rejestracji w Polsce auta kupionego od osoby prywatnej, także z UE, a część serwisów twierdzi, że zakup za granicą jest z niego zwolniony. Nie płaci się go przy zakupie od firmy z fakturą VAT lub VAT-marżą. Kalkulator pozwala włączyć lub wyłączyć PCC, więc sprawdź to w swoim urzędzie skarbowym.' },
  { q: 'Kiedy płacę VAT przy aucie z innego kraju UE?', a: 'Tylko przy nowym środku transportu, czyli aucie do 6 miesięcy lub do 6 000 km. Wtedy płacisz w Polsce 23 % VAT, liczony także od akcyzy. Auto używane, które przekracza oba limity i zostało opodatkowane w kraju zakupu, nie podlega polskiemu VAT.' },
  { q: 'Czy auto z USA nadal płaci 10 % cła?', a: 'Nie zawsze. Od 1 lipca 2026 r. rozporządzenie (UE) 2026/1455 znosi cła na produkty przemysłowe pochodzące z USA, co daje 0 % dla auta wyprodukowanego w Stanach, o ile udokumentujesz pochodzenie i transport bezpośredni. Auto europejskie lub japońskie kupione w USA płaci 10 %. Akcyza i VAT obowiązują w każdym przypadku.' },
  { q: 'A auta z Japonii i Korei Południowej?', a: 'Auta japońskie mają 0 % cła od 1 lutego 2026 r., po ostatnim kroku redukcji w umowie o partnerstwie gospodarczym UE-Japonia, z deklaracją pochodzenia. Auta koreańskie mają 0 % dzięki umowie o wolnym handlu, również z dowodem pochodzenia. Bez dokumentu obowiązuje 10 %.' },
  { q: 'Jakie opłaty rejestracyjne dochodzą na końcu?', a: 'Źródła podają łącznie około 250 zł za tablice, dowód rejestracyjny, kartę pojazdu, nalepki i opłatę ewidencyjną, a część serwisów 160 zł lub wyższe stawki po podwyżkach z 2026 roku. Kalkulator zakłada 256 zł i pozwala to zmienić. Do tego dochodzą tłumaczenia, badanie techniczne i OC.' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'Import samochodu do Polski — kalkulator cła, akcyzy, VAT i PCC',
      description: 'Darmowy kalkulator cła, akcyzy, VAT i PCC dla samochodu sprowadzanego do Polski.',
      url: URL, inLanguage: 'pl-PL', dateModified: '2026-11-19',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Założyciel', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Narzędzia', item: 'https://www.naira.autos/narzedzia' },
          { '@type': 'ListItem', position: 2, name: 'Import samochodu do Polski', item: URL },
        ],
      },
    },
    { '@type': 'FAQPage', inLanguage: 'pl-PL', mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'SoftwareApplication', name: 'Kalkulator importu samochodu do Polski', inLanguage: 'pl-PL', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0', priceCurrency: 'PLN' } },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;
const h2 = 'text-xl font-black uppercase text-foreground mb-3';
const p = 'text-sm text-muted-foreground leading-relaxed';

export default function KalkulatorImportuSamochoduPolskaPage() {
  return (
    <div lang="pl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/narzedzia" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="Wróć">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Ścieżka nawigacji" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/narzedzia" className="hover:text-white/60 transition-colors">Narzędzia</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">🇵🇱 Import samochodu</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-emerald-500 px-3 py-1 rounded-full">100% za darmo</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Akcyza 2026</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Sprawdzono: listopad 2026</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Import samochodu<br /><span className="text-emerald-400">do Polski</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Ile naprawdę kosztuje sprowadzenie auta, z akcyzą i PCC?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              Wybierz pochodzenie, napęd i pojemność silnika, a zobaczysz cło, akcyzę, VAT, PCC i opłaty rejestracyjne.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">Tylko szacunek.</strong> Akcyza zależy od dokładnej pojemności i rodzaju napędu, a źródła różnią się co do PCC przy zakupie za granicą i kwoty opłat rejestracyjnych. Zweryfikuj wynik w urzędzie celno-skarbowym przed zakupem.
          </p>
        </div>
      </div>

      <KalkulatorImportuPolskaClient />

      <div className="bg-muted/30 border-t border-border">
        <div data-seo-content className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-2" style={heading}>Cło, akcyza, VAT i PCC: z czego składa się koszt</h2>
            <p className={`${p} mb-6 max-w-3xl`}>
              Sprowadzenie auta do Polski to kilka warstw kosztów, które zależą od kraju zakupu. Auta spoza Unii Europejskiej płacą cło 10 % od wartości celnej, chyba że umowa handlowa z dowodem pochodzenia sprowadza je do zera. Akcyza, czyli podatek charakterystyczny dla polskiego importu, zależy od pojemności silnika i rodzaju napędu: zwykle 3,1 % albo 18,6 %, mniej dla hybryd, a elektryki są zwolnione. VAT 23 % płacisz od auta spoza UE oraz od nowego środka transportu kupionego w UE. Przy zakupie od osoby prywatnej dochodzi jeszcze PCC 2 %. Na końcu są opłaty rejestracyjne. Kalkulator zlicza to w kolejności, w jakiej liczy je administracja.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Cło (spoza UE)', rate: '10 %', base: 'od wartości celnej', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/5', border: 'border-orange-200 dark:border-orange-500/20' },
                { label: 'Akcyza', rate: '3,1 % / 18,6 %', base: 'granica 2000 cm³', color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/5', border: 'border-amber-200 dark:border-amber-500/20' },
                { label: 'VAT', rate: '23 %', base: 'auta spoza UE i nowe z UE', color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/5', border: 'border-emerald-200 dark:border-emerald-500/20' },
                { label: 'PCC', rate: '2 %', base: 'zakup od osoby prywatnej', color: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/5', border: 'border-sky-200 dark:border-sky-500/20' },
              ].map(({ label, rate, base, color, bg, border }) => (
                <div key={label} className={`p-5 rounded-2xl ${bg} border ${border}`}>
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className={`text-3xl font-black ${color}`} style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Co się zmieniło w 2025 i 2026 roku</h2>
                <div className="space-y-3">
                  <p className={p}><strong className="text-foreground">Akcyza 2026:</strong> podstawowe stawki pozostają na poziomie 3,1 % i 18,6 %. Hybrydy bez ładowania z gniazdka płacą 1,55 % do 2000 cm³ i 9,3 % od 2001 do 3500 cm³. Interpretacja Ministerstwa Finansów z 26 lutego 2026 r. potwierdziła te stawki także dla miękkich hybryd MHEV.</p>
                  <p className={p}><strong className="text-foreground">Plug-in i elektryki:</strong> hybryda plug-in z silnikiem do 2000 cm³ jest zwolniona z akcyzy do 31 grudnia 2029 r., a auta elektryczne i wodorowe są zwolnione. Hybryda plug-in o pojemności od 2001 do 3500 cm³ płaci 9,3 %.</p>
                  <p className={p}><strong className="text-foreground">Stany Zjednoczone:</strong> od 1 lipca 2026 r. rozporządzenie (UE) 2026/1455 znosi cła na produkty przemysłowe pochodzące z USA. Dla auta trzeba udowodnić produkcję w USA i transport bezpośredni.</p>
                  <p className={p}><strong className="text-foreground">Japonia:</strong> stopniowa redukcja cła na japońskie auta kończy się 1 lutego 2026 r., z 0 % przy deklaracji pochodzenia.</p>
                  <p className={p}><strong className="text-foreground">Chiny:</strong> chińskie elektryki płacą 10 % plus cło wyrównawcze: BYD 17 %, Geely 18,8 %, SAIC 35,3 %, Tesla Szanghaj 7,8 %. W lutym 2026 r. przyjęto pierwsze zobowiązanie cenowe, dla Cupry Tavascan.</p>
                  <p className={p}><strong className="text-foreground">Wielka Brytania:</strong> auta brytyjskie wjeżdżają po 0 % z dowodem pochodzenia, a dla elektryków od 1 stycznia 2027 r. spodziewane są surowsze reguły pochodzenia.</p>
                </div>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 1: używane auto 2.0 z Niemiec od osoby prywatnej</h2>
                <p className={p}>Auto kosztuje 80 000 zł, ma silnik 1998 cm³ i jest starsze niż 6 miesięcy. Akcyza 3,1 % to 2 480 zł, PCC 2 % to 1 600 zł, a VAT wynosi 0 zł. Podatki razem to 4 080 zł, czyli 5,1 % ceny. Z opłatami rejestracyjnymi 256 zł całkowity koszt to 84 336 zł.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 2: cztery centymetry sześcienne różnicy</h2>
                <p className={p}>To samo auto z silnikiem 2001 cm³ zamiast 1998 cm³ płaci akcyzę 18,6 %, czyli 14 880 zł zamiast 2 480 zł. Podatki rosną do 16 480 zł, a różnica to 12 400 zł. Podobnie 2,5 diesla za 95 000 zł płaci 17 670 zł akcyzy i 1 900 zł PCC, razem 19 570 zł.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 3: SUV 2.0 z USA, z dowodem pochodzenia i bez</h2>
                <p className={p}>SUV za 100 000 zł z 5 000 zł frachtu ma wartość celną 105 000 zł. Z dowodem pochodzenia cło wynosi 0 zł, akcyza 3,1 % to 3 255 zł, a VAT 23 % od 108 255 zł to 24 898,65 zł, razem 28 153,65 zł. Bez dowodu cło 10 500 zł podnosi akcyzę do 3 580,50 zł i VAT do 27 388,51 zł, razem 41 469,01 zł. Brakujący dokument kosztuje 13 315,36 zł.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 4: hybryda 1.8 z Korei</h2>
                <p className={p}>Hybryda HEV za 90 000 zł z 4 500 zł frachtu i dowodem pochodzenia nie płaci cła. Akcyza 1,55 % od 94 500 zł to 1 464,75 zł, a VAT 23 % od 95 964,75 zł (cena, fracht i akcyza) to 22 071,89 zł. Podatki razem to 23 536,64 zł, czyli 26,2 % ceny.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 5: elektryczny BYD z Chin</h2>
                <p className={p}>Auto za 130 000 zł z 6 500 zł frachtu ma wartość celną 136 500 zł. Cło 10 % to 13 650 zł, a cło wyrównawcze 17 % to 23 205 zł. Akcyza wynosi 0 zł, a VAT 23 % od 173 355 zł to 39 871,65 zł. Podatki razem to 76 726,65 zł, czyli 59 % ceny.</p>
              </div>
              <div>
                <h2 className={h2} style={heading}>Przykład 6: hybryda plug-in 1.5 kontra 2.5</h2>
                <p className={p}>Używana hybryda plug-in za 120 000 zł od firmy z UE z silnikiem 1500 cm³ jest zwolniona z akcyzy i nie płaci VAT, więc podatki to 0 zł. Taka sama hybryda z silnikiem 2500 cm³ płaci akcyzę 9,3 %, czyli 11 160 zł.</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className={h2} style={heading}>Krok po kroku: jak sprowadzić auto do Polski</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>Sprawdź w dowodzie rejestracyjnym pojemność silnika (pole P.1) i rodzaj napędu, bo od nich zależy akcyza.</li>
                  <li>Spoza UE: ustal kraj produkcji i zdobądź dowód pochodzenia, jeśli umowa zeruje cło, a następnie przejdź odprawę celną.</li>
                  <li>Złóż deklarację akcyzową AKC-U i zapłać akcyzę, zazwyczaj w ciągu 14 dni od wprowadzenia auta do kraju.</li>
                  <li>Przy zakupie od osoby prywatnej złóż PCC-3 i zapłać 2 % w terminie wskazanym przez urząd.</li>
                  <li>Zrób badanie techniczne, wykup OC i przetłumacz dokumenty, jeśli nie mają ujednoliconych kodów.</li>
                  <li>Zarejestruj auto w wydziale komunikacji, zwykle w ciągu 30 dni, i odbierz tablice.</li>
                </ol>
              </div>
              <div>
                <h2 className={h2} style={heading}>Najczęstsze błędy</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>Liczenie akcyzy według mocy w kW zamiast pojemności silnika.</li>
                  <li>Przeoczenie granicy 2000 cm³, która zmienia stawkę z 3,1 % na 18,6 %.</li>
                  <li>Założenie, że hybryda zawsze płaci 1,55 %: powyżej 3500 cm³ płaci 18,6 %.</li>
                  <li>Liczenie VAT od ceny bez akcyzy przy aucie spoza UE.</li>
                  <li>Założenie zera cła bez dowodu pochodzenia lub bez udokumentowanego transportu z USA.</li>
                  <li>Pominięcie terminu AKC-U lub rejestracji, co grozi karami.</li>
                </ul>
              </div>
              <div>
                <h2 className={h2} style={heading}>Czego kalkulator nie obejmuje</h2>
                <p className={p}>Kalkulator nie obejmuje aut zabytkowych, mienia przesiedleńczego z ulgami, aut uszkodzonych wycenianych według zmniejszonej wartości, pojazdów ciężarowych, motocykli ani ulg dla osób z niepełnosprawnościami. Nie liczy ubezpieczenia OC, tłumaczeń przysięgłych, badania technicznego ani corocznych kosztów. Wynik opiera się na cenie z umowy, a urząd może ją zakwestionować, jeśli jest rażąco niska. Stawki opłat rejestracyjnych bywają aktualizowane, dlatego pole opłat możesz zmienić.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={heading}>Najczęstsze pytania</h2>
            <div className="space-y-3 max-w-3xl">
              {FAQ.map((f) => (
                <details key={f.q} className="group rounded-xl border border-border bg-card px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-foreground list-none">{f.q}</summary>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-2">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">
            Sprawdził <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, Założyciel. Źródła: ustawa o podatku akcyzowym (art. 105), ustawa o podatku od towarów i usług, ustawa o podatku od czynności cywilnoprawnych, Wspólna Taryfa Celna UE (TARIC), rozporządzenie (UE) 2026/1455, rozporządzenie wykonawcze (UE) 2024/2754, umowa o partnerstwie gospodarczym UE-Japonia, umowa o handlu i współpracy UE-Wielka Brytania oraz poradniki Krajowej Administracji Skarbowej i serwisów motoryzacyjnych używane tylko do potwierdzenia stawek. Ostatnia weryfikacja: listopad 2026.
          </p>
        </div>
      </div>
    </div>
  );
}
