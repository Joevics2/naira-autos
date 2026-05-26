'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ValuationFlow } from '@/components/valuation/ValuationFlow';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { uploadImagesToR2, uploadVideoToR2 } from '@/lib/r2';
import { Video, Image as ImageIcon, AlertCircle, Info, ChevronDown, ChevronUp, ChevronLeft, X, Plus, Play, Trash2, Send, Sparkles, Loader2, CheckCircle2, Camera, Move } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

// ─── Gemini AI Autofill ──────────────────────────────────────────────────────

const formatPriceWithCommasGlobal = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

async function parseWithGemini(text: string): Promise<{ data: Record<string, any>; social_post: string | null }> {
  console.log('[frontend] Calling ai-autofill API...');
  const res = await fetch('/api/ai-autofill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const json = await res.json();
  console.log('[frontend] API response:', JSON.stringify(json, null, 2).substring(0, 500));
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return { data: json.data, social_post: json.social_post || null };
}

function AIAutofillPanel({ onParsed, defaultOpen = false }: { onParsed: (d: Record<string, any>, socialPost: string | null) => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handle = async () => {
    if (!text.trim()) return;
    setLoading(true); setError(''); setDone(false);
    try {
      const { data: parsed, social_post } = await parseWithGemini(text);
      if (parsed.price) parsed.price = formatPriceWithCommasGlobal(String(parsed.price));
      onParsed(parsed, social_post);
      setDone(true);
      toast({ title: '✨ Form filled!', description: 'Review all fields before submitting.' });
      setTimeout(() => setOpen(false), 1000);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 dark:border-emerald-800 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-emerald-100/50 dark:hover:bg-emerald-900/20 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">AI Autofill</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400">Paste a description — AI fills the form instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {done && <CheckCircle2 className="h-4 w-4 text-green-600" />}
          {open ? <ChevronUp className="h-4 w-4 text-emerald-500" /> : <ChevronDown className="h-4 w-4 text-emerald-500" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. 2019 Toyota Camry, silver, Lagos Lekki, automatic, 62000km, ₦8.5M, Tokunbo, AC perfect, no accident, all documents complete..."
            rows={4}
            className="bg-white dark:bg-background border-emerald-200 dark:border-emerald-700 text-sm resize-none"
          />
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
          )}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={handle}
              disabled={loading || !text.trim()}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
            >
              {loading
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Parsing...</>
                : done
                ? <><CheckCircle2 className="h-3.5 w-3.5" />Done!</>
                : <><Sparkles className="h-3.5 w-3.5" />Fill Form</>}
            </Button>
            <p className="text-xs text-emerald-500">Review all fields after autofill</p>
          </div>
        </div>
      )}
    </div>
  );
}

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel', 'MG',
  'Chery', 'BYD', 'Haval', 'GAC', 'JAC', 'Innoson',
  'MAN', 'Scania', 'Hino', 'FUSO', 'Sinotruk', 'Shacman', 'Dongfeng', 'Foton',
  'Yutong', 'King Long', 'Higer', 'Ashok Leyland',
  'Yamaha', 'Bajaj', 'TVS', 'Haojue',
  'Other',
];

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'Abuja FCT'
];

const CITIES_BY_STATE: Record<string, string[]> = {
  'Abia': [
    'Aba North', 'Aba South', 'Umuahia', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa',
    'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West',
    'Umu Nneochi', 'Ariaria Market', 'Ogbor Hill', 'Abia State University Area'
  ],
  'Adamawa': [
    'Yola North', 'Yola South', 'Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi', 'Guyuk',
    'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika', 'Mubi North',
    'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'Jimeta', 'High Level Jimeta'
  ],
  'Akwa Ibom': [
    'Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Abak', 'Eastern Obolo', 'Esit-Eket', 'Essien Udim',
    'Etim-Ekpo', 'Etinan', 'Ibeno', 'Ibesikpo Asutan', 'Ibiono Ibom', 'Ika', 'Ikono',
    'Ikot Abasi', 'Ini', 'Itu', 'Mbo', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium',
    'Obot Akara', 'Okobo', 'Onna', 'Oruk Anam', 'Udung Uko', 'Ukanafun', 'Uquo-Ibeno',
    'Uruan', 'Urue-Offong/Oruko'
  ],
  'Anambra': [
    'Awka', 'Onitsha', 'Nnewi', 'Idemili North', 'Idemili South', 'Aguata', 'Anaocha',
    'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Ihiala', 'Njikoka', 'Ogbaru', 'Orumba North',
    'Orumba South', 'Oyi', 'Awka South', 'Awka North', 'Obosi'
  ],
  'Bauchi': [
    'Bauchi', 'Alkaleri', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa',
    'Giade', 'Itas/Gadau', 'Jama\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira',
    'Toro', 'Warji', 'Zaki', 'Azare'
  ],
  'Bayelsa': [
    'Yenagoa', 'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama',
    'Southern Ijaw', 'Opolo', 'Swali', 'Kpansia', 'Biogbolo', 'Amarata', 'Agudama'
  ],
  'Benue': [
    'Makurdi', 'Gboko', 'Katsina-Ala', 'Otukpo', 'Ado', 'Agatu', 'Apa', 'Buruku', 'Guma',
    'Gwer East', 'Gwer West', 'Konshisha', 'Kwande', 'Logo', 'Obi', 'Ogbadibo', 'Ohimini',
    'Oju', 'Okpokwu', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya', 'High Level Makurdi', 'Wurukum'
  ],
  'Borno': [
    'Maiduguri', 'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa',
    'Dikwa', 'Gubio', 'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge',
    'Konduga', 'Kukawa', 'Kwaya Kusar', 'Mafa', 'Magumeri', 'Marte', 'Mobbar', 'Monguno'
  ],
  'Cross River': [
    'Calabar', 'Calabar South', 'Calabar Municipal', 'Ikom', 'Ogoja', 'Abi', 'Akamkpa',
    'Akpabuyo', 'Bakassi', 'Bekwara', 'Biase', 'Boki', 'Etung', 'Obanliku', 'Obubra',
    'Obudu', 'Odukpani', 'Yakuur', 'Yala'
  ],
  'Delta': [
    'Asaba', 'Warri', 'Sapele', 'Ughelli', 'Uvwie', 'Effurun', 'Aniocha North', 'Aniocha South',
    'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 'Ika North East', 'Ika South',
    'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 'Okpe', 'Oshimili North',
    'Oshimili South', 'Patani', 'Udu', 'Ukwuani'
  ],
  'Ebonyi': [
    'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South',
    'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha', 'GRA Abakaliki'
  ],
  'Edo': [
    'Benin City', 'Egor', 'Ekpoma', 'Ikpoba-Okha', 'Oredo', 'Akoko-Edo', 'Auchi',
    'Esan Central', 'Esan North East', 'Esan South East', 'Esan West', 'Etsako Central',
    'Etsako East', 'Etsako West', 'Igueben', 'Orhionmwon', 'Ovia North East', 'Ovia South West',
    'Owan East', 'Owan West', 'Uhunmwonde', 'Uselu', 'GRA Benin'
  ],
  'Ekiti': [
    'Ado Ekiti', 'Ikere', 'Ikole', 'Ilawe', 'Ijero', 'Ido-Osi', 'Irepodun/Ifelodun',
    'Ise/Orun', 'Moba', 'Omuo', 'Oye', 'Efon', 'Emure', 'Gbonyin', 'Ekiti East',
    'Ekiti South West', 'Ekiti West', 'GRA Ado Ekiti'
  ],
  'Enugu': [
    'Enugu North', 'Enugu South', 'Enugu East', 'Nsukka', 'Udi', 'Awgu', 'Aninri',
    'Ezeagu', 'Igbo-Eze North', 'Igbo-Eze South', 'Igbo-Etiti', 'Isi-Uzo', 'Nkanu East',
    'Nkanu West', 'Oji-River', 'Udenu', 'Uzo-Uwani', 'GRA Enugu', 'New Haven', 'Independence Layout'
  ],
  'Gombe': [
    'Gombe', 'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Kaltungo', 'Kwami',
    'Nafada', 'Shomgom', 'Yamaltu/Deba', 'Pantami', 'GRA Gombe'
  ],
  'Imo': [
    'Owerri', 'Orlu', 'Okigwe', 'Ikeduru', 'Mbaitoli', 'Aboh-Mbaise', 'Ahiazu-Mbaise',
    'Ehime-Mbano', 'Ezinihitte Mbaise', 'Ideato North', 'Ideato South', 'Ihitte/Uboma',
    'Isiala Mbano', 'Isu', 'Ngor-Okpala', 'Njaba', 'Nkwerre', 'Nwangele', 'Obowo',
    'Oguta', 'Ohaji/Egbema', 'Onuimo', 'Orsu', 'Oru East', 'Oru West'
  ],
  'Jigawa': [
    'Dutse', 'Gumel', 'Hadejia', 'Kazaure', 'Ringim', 'Auyo', 'Babura', 'Biriniwa',
    'Buji', 'Gagarawa', 'Garki', 'Guri', 'Gwaram', 'Gwiwa', 'Jahun', 'Kafin Hausa',
    'Kaugama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Roni', 'Sule-Tankarkar',
    'Taura', 'Yankwashi'
  ],
  'Kaduna': [
    'Kaduna North', 'Kaduna South', 'Chikun', 'Igabi', 'Zaria', 'Birnin-Gwari', 'Giwa',
    'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau',
    'Kudan', 'Lere', 'Makarfi', 'Sanga', 'Soba', 'Zango-Kataf', 'Rigasa', 'Barnawa'
  ],
  'Kano': [
    'Kano Municipal', 'Fagge', 'Dala', 'Tarauni', 'Ungogo', 'Kumbotso', 'Gwale', 'Nasarawa',
    'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dambatta', 'Dawakin Kudu',
    'Dawakin Tofa', 'Doguwa', 'Gabasawa', 'Garko', 'Garum Mallam', 'Gaya', 'Gezawa',
    'Gwarzo', 'Karaye', 'Kibiya', 'Kiru', 'Kunchi', 'Kura', 'Madobi', 'Makoda', 'Minjibir',
    'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 'Sumaila', 'Takai', 'Tofa', 'Tsanyawa',
    'Tudun Wada', 'Warawa', 'Wudil'
  ],
  'Katsina': [
    'Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Danja', 'Dutsin-Ma', 'Kankia', 'Kankara',
    'Bakori', 'Batagarawa', 'Batsari', 'Bindawa', 'Charanchi', 'Dan Musa', 'Dandume',
    'Dutsi', 'Faskari', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kurfi', 'Kusada', 'Mai\'adua',
    'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 'Sandamu', 'Zango'
  ],
  'Kebbi': [
    'Birnin Kebbi', 'Argungu', 'Zuru', 'Jega', 'Aleiro', 'Arewa-Dandi', 'Augie', 'Bagudo',
    'Bunza', 'Dandi', 'Fakai', 'Gwandu', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski',
    'Sakaba', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri'
  ],
  'Kogi': [
    'Lokoja', 'Okene', 'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah',
    'Igalamela-Odolu', 'Ijumu', 'Kabba/Bunu', 'Koton Karfe', 'Mopa-Muro', 'Ofu',
    'Ogori/Magongo', 'Okehi', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
  ],
  'Kwara': [
    'Ilorin East', 'Ilorin South', 'Ilorin West', 'Asa', 'Baruten', 'Edu', 'Ekiti-Kwara',
    'Ifelodun-Kwara', 'Irepodun-Kwara', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke-Ero',
    'Oyun', 'Pategi'
  ],
  'Lagos': [
    'Ikeja', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Ajah', 'Festac',
    'Apapa', 'Oshodi', 'Isolo', 'Badagry', 'Ikorodu', 'Epe', 'Gbagada', 'Magodo',
    'Maryland', 'Ogba', 'Ojodu', 'Ojota', 'Mushin', 'Shomolu', 'Bariga', 'Kosofe',
    'Alimosho', 'Agege', 'Ifako-Ijaiye', 'Ojo', 'Amuwo-Odofin', 'Egbe/Idimu', 'Ikotun/Igando',
    'Abule Egba', 'Ipaja', 'Ilupeju', 'Ogudu', 'Orile', 'Lagos Island', 'Eko Atlantic',
    'Tarkwa Bay Island', 'Ilashe'
  ],
  'Nasarawa': [
    'Lafia', 'Keffi', 'Akwanga', 'Karu', 'Nasarawa', 'Nasarawa-Eggon', 'Awe', 'Doma',
    'Keana', 'Kokona', 'Obi', 'Toto', 'Wamba', 'Mararaba', 'Masaka', 'GRA Lafia'
  ],
  'Niger': [
    'Minna', 'Bida', 'Suleja', 'Kontagora', 'Lapai', 'Agaie', 'Agwara', 'Borgu', 'Bosso',
    'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Lavun', 'Magama', 'Mariga',
    'Mashegu', 'Mokwa', 'Muya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Tafa', 'Wushishi'
  ],
  'Ogun': [
    'Abeokuta South', 'Abeokuta North', 'Ado-Odo/Ota', 'Ijebu Ode', 'Sagamu', 'Obafemi-Owode',
    'Ewekoro', 'Ifo', 'Ikenne', 'Ilaro', 'Imeko Afon', 'Ipokia', 'Odeda', 'Odogbolu',
    'Ogun Waterside', 'Remo North', 'Pakuro', 'Ijebu North', 'Ijebu East'
  ],
  'Ondo': [
    'Akure', 'Ondo', 'Owo', 'Okitipupa', 'Ikare Akoko', 'Idanre', 'Ifedore', 'Ilaje',
    'Ile-Oluji-Okeigbo', 'Irele', 'Odigbo', 'Ose', 'Ese-Odo', 'Akungba', 'Isua', 'Okeigbo'
  ],
  'Osun': [
    'Osogbo', 'Ile-Ife', 'Ilesa', 'Ede', 'Iwo', 'Ikirun', 'Ila', 'Ejigbo', 'Ijebu-Jesa',
    'Aiyedade', 'Aiyedire', 'Atakumosa East', 'Atakumosa West', 'Boripe', 'Egbedore',
    'Ifelodun-Osun', 'Irepodun-Osun', 'Irewole', 'Isokan', 'Obokun', 'Ola-Oluwa',
    'Oriade', 'Orolu', 'Olorunda'
  ],
  'Oyo': [
    'Ibadan North', 'Ibadan South East', 'Ibadan South West', 'Ibadan North East',
    'Ibadan North West', 'Akinyele', 'Egbeda', 'Ido', 'Oluyole', 'Lagelu', 'Ona-Ara',
    'Afijio', 'Atiba', 'Atisbo', 'Eruwa', 'Iseyin', 'Saki East', 'Saki West', 'Ogbomosho North',
    'Ogbomosho South', 'Ogo Oluwa', 'Olorunsogo', 'Ori Ire', 'Oyo East', 'Oyo West'
  ],
  'Plateau': [
    'Jos North', 'Jos South', 'Jos East', 'Barkin Ladi', 'Bassa', 'Bokkos', 'Kanam',
    'Kanke', 'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Quaan Pan',
    'Riyom', 'Shendam', 'Wase', 'Bukuru', 'Rayfield', 'GRA Jos'
  ],
  'Rivers': [
    'Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Ikwerre', 'Okrika', 'Ogu/Bolo',
    'Emohua', 'Etche', 'Gokana', 'Khana', 'Tai', 'Asari-Toru', 'Akuku Toru', 'Degema',
    'Bonny', 'Andoni', 'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Ogba/Egbema/Ndoni'
  ],
  'Sokoto': [
    'Sokoto North', 'Sokoto South', 'Illela', 'Wamako', 'Binji', 'Bodinga', 'Dange-Shuni',
    'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni',
    'Shagari', 'Silame', 'Tambuwal', 'Tangaza', 'Tureta', 'Wurno', 'Yabo'
  ],
  'Taraba': [
    'Jalingo', 'Wukari', 'Takum', 'Ardo-Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol',
    'Ibi', 'Karim-Lamido', 'Kurmi', 'Lau', 'Sardauna', 'Ussa', 'Yorro', 'Zing'
  ],
  'Yobe': [
    'Damaturu', 'Potiskum', 'Nguru', 'Bade', 'Bursari', 'Fika', 'Fune', 'Geidam', 'Gujba',
    'Gulani', 'Jakusko', 'Karasuwa', 'Machina', 'Nangere', 'Tarmua', 'Yunusari', 'Yusufari'
  ],
  'Zamfara': [
    'Gusau', 'Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum', 'Bungudu', 'Gummi',
    'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi'
  ],
  'Abuja FCT': [
    'Central Business District', 'Asokoro', 'Maitama', 'Wuse', 'Wuse 2', 'Garki',
    'Gwarinpa', 'Kubwa', 'Utako', 'Jabi', 'Jahi', 'Lokogoma', 'Kuje', 'Gwagwalada',
    'Bwari', 'Karshi', 'Karaye', 'Zuba', 'Airport Road', 'Nyanya', 'Mararaba', 'Masaka',
    'Lugbe', 'Mabushi', 'Katampe', 'Gudu', 'Guzape', 'Dutse-Alhaji', 'Karu', 'Kwali',
    'Abaji', 'Apo District'
  ]
};

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 1989 }, (_, i) => CURRENT_YEAR - i);

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function SectionCard({ step, title, description, children }: {
  step: number; title: string; description?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-muted/40">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex-shrink-0">
          {step}
        </span>
        <div>
          <p className="font-semibold text-foreground text-sm leading-tight">{title}</p>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="px-5 py-5">{children}</div>
    </div>
  );
}

function FieldLabel({ htmlFor, required, children }: { htmlFor?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function YesNoToggle({ value, onChange }: { value: string; onChange: (v: 'yes' | 'no') => void }) {
  return (
    <div className="flex gap-2 mt-1.5">
      {(['yes', 'no'] as const).map(opt => (
        <button
          key={opt}
          type="button"
          onClick={() => onChange(opt)}
          className={`flex-1 py-2 rounded-xl border text-sm font-semibold transition-all ${
            value === opt
              ? opt === 'yes'
                ? 'bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-500/20'
                : 'bg-red-500 border-red-500 text-white shadow-sm shadow-red-500/20'
              : 'bg-background border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground'
          }`}
        >
          {opt === 'yes' ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  );
}

export default function AddListingPage() {
  const { user, loading: authLoading, refreshSession } = useAuth();
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showImageValuation, setShowImageValuation] = useState(false);
  const [autofillTab, setAutofillTab] = useState<'image' | 'text'>('image');
  const [valuationPriceAdvisory, setValuationPriceAdvisory] = useState<{ low: number; high: number; brand: string; model: string } | null>(null);
  const [socialPost, setSocialPost] = useState<string | null>(null);

  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [sellerType, setSellerType] = useState<'owner' | 'agent' | 'dealer'>('owner');
  const [locationState, setLocationState] = useState('');
  const [cityArea, setCityArea] = useState('');
  const [town, setTown] = useState('');

  const [brand, setBrand] = useState('');
  const [customBrand, setCustomBrand] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [trim, setTrim] = useState('');
  const [mileage, setMileage] = useState('');

  const [transmission, setTransmission] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [condition, setCondition] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [bodyType, setBodyType] = useState('');
  const [color, setColor] = useState('');
  const [accidentHistory, setAccidentHistory] = useState('');

  const [price, setPrice] = useState('');
  const [negotiable, setNegotiable] = useState(false);
  const [urgentSale, setUrgentSale] = useState(false);

  const [verificationType, setVerificationType] = useState<'video' | 'photos'>('video');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [videoInputRef, setVideoInputRef] = useState<HTMLInputElement | null>(null);
  const [requiredPhotosInputRef, setRequiredPhotosInputRef] = useState<HTMLInputElement | null>(null);
  const [additionalPhotosInputRef, setAdditionalPhotosInputRef] = useState<HTMLInputElement | null>(null);

  const [requiredPhotos, setRequiredPhotos] = useState<File[]>([]);
  const [additionalPhotos, setAdditionalPhotos] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [description, setDescription] = useState('');
  const [reasonForSelling, setReasonForSelling] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [features, setFeatures] = useState<string[]>([]);

  const [acWorking, setAcWorking] = useState<'yes' | 'no' | ''>('');
  const [acIssue, setAcIssue] = useState('');
  const [engineCondition, setEngineCondition] = useState<'yes' | 'no' | ''>('');
  const [engineIssue, setEngineIssue] = useState('');
  const [wasRepainted, setWasRepainted] = useState<'yes' | 'no' | ''>('');
  const [documentsComplete, setDocumentsComplete] = useState<'yes' | 'no' | ''>('');
  const [missingDocs, setMissingDocs] = useState('');
  const [oilConsumption, setOilConsumption] = useState<'yes' | 'no' | ''>('');
  const [otherIssues, setOtherIssues] = useState('');

  const FEATURES = [
    'Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks',
    'AM/FM Radio', 'CD Player', 'Bluetooth', 'USB / AUX',
    'Backup Camera', 'Parking Sensors', 'ABS', 'Airbags',
    'Alloy Wheels', 'Sunroof', 'Leather Seats', 'Heated Seats',
    'Navigation GPS', 'Cruise Control', 'Keyless Entry', 'Immobilizer'
  ];

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const availableCities = CITIES_BY_STATE[locationState] || [];
  const priceNum = parseFloat(price.replace(/,/g, '')) || 0;
  const videoRequired = priceNum > 3000000;

  const formatPriceWithCommas = (value: string): string => {
    const numericValue = value.replace(/[^0-9]/g, '');
    if (!numericValue) return '';
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parsePriceFromFormatted = (formattedValue: string): string => {
    return formattedValue.replace(/,/g, '');
  };

  const handleRequiredPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentCount = requiredPhotos.length;
      if (currentCount + files.length > 8) {
        toast({ title: 'Too Many Files', description: `Maximum 8 photos allowed`, variant: 'destructive' });
        return;
      }
      setRequiredPhotos(prev => [...prev, ...files]);
    }
  };

  const handleAdditionalPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentCount = additionalPhotos.length;
      if (currentCount + files.length > 4) {
        toast({ title: 'Too Many Files', description: `Maximum 4 additional photos allowed`, variant: 'destructive' });
        return;
      }
      setAdditionalPhotos(prev => [...prev, ...files]);
    }
  };

  const removeRequiredPhoto = (index: number) => setRequiredPhotos(prev => prev.filter((_, i) => i !== index));
  const removeAdditionalPhoto = (index: number) => setAdditionalPhotos(prev => prev.filter((_, i) => i !== index));

  const movePhoto = (fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return;
    const newPhotos = [...requiredPhotos];
    const [movedItem] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedItem);
    setRequiredPhotos(newPhotos);
  };

  const isValidVideoUrl = (url: string): boolean => {
    if (!url.trim()) return true;
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/i;
    const driveRegex = /^(https?:\/\/)?(www\.)?drive\.google\.com/i;
    const directVideoRegex = /\.(mp4|mov|avi|webm|wmv)$/i;
    return youtubeRegex.test(url) || driveRegex.test(url) || directVideoRegex.test(url);
  };

  // Tiny addition: Check if all required fields are filled
  const isFormValid = () => {
    if (!brand && !customBrand) return false;
    if (!model) return false;
    if (!year) return false;
    if (!condition) return false;
    if (!transmission) return false;
    if (!fuelType) return false;
    if (!price) return false;
    if (!locationState) return false;
    if (!cityArea) return false;
    if (!accidentHistory) return false;
    if (!reasonForSelling) return false;
    if (!acWorking) return false;
    if (!engineCondition) return false;
    if (!wasRepainted) return false;
    if (!documentsComplete) return false;
    if (!oilConsumption) return false;
    if (!confirmed) return false;

    if (verificationType === 'video' && !videoFile && !videoUrl.trim()) return false;
    if (verificationType === 'photos' && requiredPhotos.length < 5) return false;

    return true;
  };

  // Tiny addition: Scroll to first missing field when submit is clicked with errors
  const scrollToFirstMissingField = () => {
    const fields = [
      { cond: !brand && !customBrand, id: 'brand' },
      { cond: !model, id: 'model' },
      { cond: !year, id: 'year' },
      { cond: !condition, id: 'condition' },
      { cond: !transmission, id: 'transmission' },
      { cond: !fuelType, id: 'fuelType' },
      { cond: !price, id: 'price' },
      { cond: !locationState, id: 'locationState' },
      { cond: !cityArea, id: 'cityArea' },
      { cond: !accidentHistory, id: 'accidentHistory' },
      { cond: !reasonForSelling, id: 'reasonForSelling' },
      { cond: !acWorking, id: 'acWorking' },
      { cond: !engineCondition, id: 'engineCondition' },
      { cond: !wasRepainted, id: 'wasRepainted' },
      { cond: !documentsComplete, id: 'documentsComplete' },
      { cond: !oilConsumption, id: 'oilConsumption' },
      { cond: !confirmed, id: 'confirm' },
    ];

    for (const field of fields) {
      if (field.cond) {
        const el = document.getElementById(field.id) || document.querySelector(`[name="${field.id}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (el as HTMLElement).focus();
          return;
        }
      }
    }
  };

  useEffect(() => {
    const fromValuation = searchParams.get('from') === 'valuation';
    if (fromValuation) {
      try {
        const stored = sessionStorage.getItem('valuation_prefill');
        if (stored) {
          const v = JSON.parse(stored);
          if (v.brand) setBrand(v.brand);
          if (v.model) setModel(v.model);
          if (v.year) setYear(String(v.year));
          if (v.bodyType) setBodyType(v.bodyType);
          if (v.vehicleType) setVehicleType(v.vehicleType);
          if (v.condition) setCondition(v.condition);
          if (v.color) setColor(v.color);
          if (v.fuelType) setFuelType(v.fuelType);
          if (v.transmission) setTransmission(v.transmission);
          if (v.location) setLocationState(v.location);
          if (v.priceRangeLow && v.priceRangeHigh) {
            setValuationPriceAdvisory({ low: v.priceRangeLow, high: v.priceRangeHigh, brand: v.brand || '', model: v.model || '' });
          }
          sessionStorage.removeItem('valuation_prefill');
          toast({ title: '✨ Car details pre-filled!', description: 'Review the fields below. Price is left for you to set.' });
        }
      } catch (e) { console.error('Valuation prefill error', e); }
      return;
    }

    const draftData = localStorage.getItem('add_listing_draft');
    const savedFormData = localStorage.getItem('add_listing_form_data');
    const source = draftData || savedFormData;

    if (source) {
      try {
        const parsed = JSON.parse(source);
        if (parsed.brand) setBrand(parsed.brand);
        if (parsed.customBrand) setCustomBrand(parsed.customBrand);
        if (parsed.model) setModel(parsed.model);
        if (parsed.year) setYear(parsed.year);
        if (parsed.trim) setTrim(parsed.trim);
        if (parsed.mileage) setMileage(parsed.mileage);
        if (parsed.transmission) setTransmission(parsed.transmission);
        if (parsed.fuelType) setFuelType(parsed.fuelType);
        if (parsed.condition) setCondition(parsed.condition);
        if (parsed.vehicleType) setVehicleType(parsed.vehicleType);
        if (parsed.bodyType) setBodyType(parsed.bodyType);
        if (parsed.color) setColor(parsed.color);
        if (parsed.accidentHistory) setAccidentHistory(parsed.accidentHistory);
        if (parsed.price) setPrice(parsed.price);
        if (parsed.negotiable !== undefined) setNegotiable(parsed.negotiable);
        if (parsed.urgentSale !== undefined) setUrgentSale(parsed.urgentSale);
        if (parsed.locationState) setLocationState(parsed.locationState);
        if (parsed.cityArea) setCityArea(parsed.cityArea);
        if (parsed.town) setTown(parsed.town);
        if (parsed.sellerType) setSellerType(parsed.sellerType);
        if (parsed.description) setDescription(parsed.description);
        if (parsed.reasonForSelling) setReasonForSelling(parsed.reasonForSelling);
        if (parsed.features) setFeatures(parsed.features);
        if (parsed.acWorking) setAcWorking(parsed.acWorking);
        if (parsed.acIssue) setAcIssue(parsed.acIssue);
        if (parsed.engineCondition) setEngineCondition(parsed.engineCondition);
        if (parsed.engineIssue) setEngineIssue(parsed.engineIssue);
        if (parsed.wasRepainted) setWasRepainted(parsed.wasRepainted);
        if (parsed.documentsComplete) setDocumentsComplete(parsed.documentsComplete);
        if (parsed.missingDocs) setMissingDocs(parsed.missingDocs);
        if (parsed.oilConsumption) setOilConsumption(parsed.oilConsumption);
        if (parsed.otherIssues) setOtherIssues(parsed.otherIssues);
        if (parsed.videoUrl) setVideoUrl(parsed.videoUrl);
        if (parsed.verificationType) setVerificationType(parsed.verificationType);
        if (parsed.imageUrls?.length) setImageUrls(parsed.imageUrls);
        if (draftData) {
          toast({ title: 'Draft Restored', description: `Draft from ${new Date(parsed.savedAt).toLocaleDateString()} has been loaded.` });
        }
      } catch (e) { console.error('Error loading cached form data:', e); }
    }
  }, []);

  useEffect(() => {
    const formData = {
      brand, customBrand, model, year, trim, mileage, transmission, fuelType, condition,
      vehicleType, bodyType, color, accidentHistory, price, negotiable, urgentSale, locationState: locationState,
      cityArea, town, sellerType, description, reasonForSelling, features,
      acWorking, acIssue, engineCondition, engineIssue, wasRepainted, documentsComplete,
      missingDocs, oilConsumption, otherIssues
    };
    localStorage.setItem('add_listing_form_data', JSON.stringify(formData));
  }, [brand, customBrand, model, year, trim, mileage, transmission, fuelType, condition,
      vehicleType, bodyType, color, accidentHistory, price, negotiable, urgentSale, locationState,
      cityArea, town, sellerType, description, reasonForSelling, features,
      acWorking, acIssue, engineCondition, engineIssue, wasRepainted, documentsComplete,
      missingDocs, oilConsumption, otherIssues]);

  const uploadVideo = async (file: File): Promise<string | null> => {
    try {
      const url = await uploadVideoToR2(file, (pct) => {
        setUploadProgress(`Uploading video... ${pct}%`);
      });
      if (!url) throw new Error('Failed to upload video to R2.');
      return url;
    } catch (error: any) {
      console.error('Error uploading video:', error);
      toast({
        title: 'Video Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try {
      return await uploadImagesToR2(files);
    } catch (error: any) {
      console.error('Error uploading images:', error);
      toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
      return [];
    }
  };

  const triggerAuth = () => {
    localStorage.setItem('auth_return_url', '/add-listing');
    setShowAuthModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!isFormValid()) {
      toast({ title: 'Missing Information', description: 'Please fill all required fields.', variant: 'destructive' });
      scrollToFirstMissingField();
      return;
    }

    const currentUser = userRef.current;
    if (!currentUser) { triggerAuth(); return; }
    if (!confirmed) {
      toast({ title: 'Confirmation Required', description: 'Please confirm that the vehicle details are accurate', variant: 'destructive' });
      return;
    }
    if (videoRequired && verificationType === 'photos') {
      toast({ title: 'Video Required', description: 'Vehicles above ₦3M must include a video', variant: 'destructive' });
      return;
    }
    if (verificationType === 'video' && !videoFile && !videoUrl.trim()) {
      toast({ title: 'Video Required', description: 'Please upload a video or paste a YouTube/video link', variant: 'destructive' });
      return;
    }
    if (verificationType === 'photos' && requiredPhotos.length < 5) {
      toast({ title: 'Photos Required', description: 'Please upload all 5 required photos', variant: 'destructive' });
      return;
    }
    if (videoUrl.trim() && !isValidVideoUrl(videoUrl.trim())) {
      toast({ title: 'Invalid Video URL', description: 'Only YouTube, Google Drive, or direct video links are allowed', variant: 'destructive' });
      return;
    }

    setLoading(true); setUploading(true);
    const sessionRefreshed = await refreshSession();
    if (!sessionRefreshed) {
      toast({ title: 'Session Expired', description: 'Please sign in again', variant: 'destructive' });
      setLoading(false); setUploading(false); setShowAuthModal(true);
      return;
    }

    try {
      const finalBrand = brand === 'Other' ? customBrand : brand;
      let uploadedVideoUrl = '';
      let uploadedImageUrls: string[] = [];

      if (verificationType === 'video') {
        if (videoFile) {
          setUploadProgress('Uploading video...');
          uploadedVideoUrl = await uploadVideo(videoFile) || '';
          if (!uploadedVideoUrl) throw new Error('Failed to upload video');
        } else if (videoUrl.trim()) {
          uploadedVideoUrl = videoUrl.trim();
        }
      }

      const allPhotos = [...requiredPhotos, ...additionalPhotos];
      if (allPhotos.length > 0) {
        setUploadProgress(`Uploading images (0/${allPhotos.length})...`);
        uploadedImageUrls = await uploadImages(allPhotos);
      }

      setUploadProgress('Creating listing...');

      const listingData: any = {
        user_id: currentUser.id,
        title: `${finalBrand} ${model} ${year}`,
        brand: finalBrand, model, year: parseInt(year),
        price: parseFloat(parsePriceFromFormatted(price)),
        negotiable, urgent_sale: urgentSale,
        vehicle_type: vehicleType, fuel_type: fuelType, transmission, color,
        mileage: mileage ? parseInt(mileage) : null,
        description, location_state: locationState, location_lga: cityArea, city_area: town,
        seller_type: sellerType, ownership_type: sellerType,
        trim: trim || null, condition, body_type: bodyType, accident_history: accidentHistory,
        reason_for_selling: reasonForSelling, features,
        verification_level: verificationType === 'video' ? 'video_verified' : 'basic',
        status: 'pending', is_deal: false, is_our_store: false, is_featured: false,
        faq_ac_working: acWorking || null,
        faq_ac_issue: acWorking === 'no' ? acIssue : null,
        faq_engine_condition: engineCondition || null,
        faq_engine_issue: engineCondition === 'no' ? engineIssue : null,
        faq_was_repainted: wasRepainted || null,
        faq_documents_complete: documentsComplete || null,
        faq_missing_documents: documentsComplete === 'no' ? missingDocs : null,
        faq_oil_consumption: oilConsumption || null,
        faq_other_issues: otherIssues || null,
        social_post: socialPost || null,
      };

      if (verificationType === 'video' && uploadedVideoUrl) listingData.video_url = uploadedVideoUrl;
      listingData.images = uploadedImageUrls;

      await supabase.from('listings').delete().eq('user_id', currentUser.id).eq('status', 'paused');
      const { data, error } = await supabase.from('listings').insert([listingData]).select().single();
      if (error) throw error;

      localStorage.removeItem('add_listing_form_data');
      localStorage.removeItem('add_listing_draft');
      toast({ title: 'Success!', description: 'Your listing has been submitted for approval' });
      router.push('/profile');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false); setUploading(false); setUploadProgress('');
    }
  };

  const clearForm = () => {
    setBrand(''); setCustomBrand(''); setModel(''); setYear(''); setTrim(''); setMileage('');
    setTransmission(''); setFuelType(''); setCondition(''); setVehicleType('car'); setBodyType('');
    setColor(''); setAccidentHistory(''); setPrice(''); setNegotiable(false); setUrgentSale(false);
    setLocationState(''); setCityArea(''); setTown(''); setSellerType('owner');
    setDescription(''); setReasonForSelling(''); setFeatures([]);
    setAcWorking(''); setAcIssue(''); setEngineCondition(''); setEngineIssue('');
    setWasRepainted(''); setDocumentsComplete(''); setMissingDocs(''); setOilConsumption(''); setOtherIssues('');
    setVideoFile(null); setVideoUrl(''); setRequiredPhotos([]); setAdditionalPhotos([]); setImageUrls([]);
    setValuationPriceAdvisory(null);
    setSocialPost(null);
    setSubmitAttempted(false);
    localStorage.removeItem('add_listing_form_data');
    localStorage.removeItem('add_listing_draft');
    toast({ title: 'Form cleared', description: 'All fields have been reset.' });
  };

  const handleSaveDraft = async () => {
    setLoading(true); setUploading(true);
    try {
      const finalBrand = brand === 'Other' ? customBrand : brand;
      let savedVideoUrl = videoUrl.trim();
      let savedImageUrls: string[] = [];

      if (verificationType === 'video' && videoFile) {
        setUploadProgress('Uploading video for draft...');
        savedVideoUrl = await uploadVideo(videoFile) || savedVideoUrl;
      }

      const allPhotos = [...requiredPhotos, ...additionalPhotos];
      if (allPhotos.length > 0) {
        setUploadProgress('Uploading images for draft...');
        savedImageUrls = await uploadImages(allPhotos);
      }

      const draft = {
        savedAt: new Date().toISOString(),
        brand: finalBrand, customBrand, model, year, trim, mileage, transmission, fuelType, condition,
        vehicleType, bodyType, color, accidentHistory, price, negotiable, urgentSale,
        locationState, cityArea, town, sellerType, description, reasonForSelling, features,
        verificationType, videoUrl: savedVideoUrl, imageUrls: savedImageUrls,
        acWorking, acIssue, engineCondition, engineIssue, wasRepainted, documentsComplete,
        missingDocs, oilConsumption, otherIssues,
      };

      localStorage.setItem('add_listing_draft', JSON.stringify(draft));
      localStorage.removeItem('add_listing_form_data');
      toast({ title: 'Draft Saved!', description: 'Your draft has been saved locally. It will be here when you return.' });
    } catch (error: any) {
      toast({ title: 'Error saving draft', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false); setUploading(false); setUploadProgress('');
    }
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-4">
        <div className="h-8 bg-muted rounded-xl w-1/3 animate-pulse" />
        <div className="h-96 bg-muted rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <AuthModal isOpen={!user && showAuthModal} onClose={() => setShowAuthModal(false)} defaultMode="signup" />

      <div className="max-w-4xl mx-auto px-4 py-6 mb-24">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </button>
          <Button
            variant="outline"
            onClick={() => router.push('/sell-for-me')}
            className="bg-amber-400 hover:bg-amber-300 text-gray-900 border-amber-400 hover:border-amber-300 text-sm font-bold"
          >
            <Send className="h-3.5 w-3.5 mr-1.5" />
            Sell for Me
          </Button>
        </div>

        {/* Page heading */}
        <div className="mb-6">
          <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-1">New Listing</p>
          <h1
            className="font-black uppercase text-foreground leading-none"
            style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)' }}
          >
            List Your Vehicle
          </h1>
          <p className="text-muted-foreground text-sm mt-1">Fill in the details to create your listing</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* AI Autofill */}
          <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 dark:border-emerald-800 overflow-hidden">
            <div className="flex border-b border-emerald-100 dark:border-emerald-800">
              <button type="button" onClick={() => setAutofillTab('image')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${autofillTab === 'image' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-100/50 dark:text-emerald-300'}`}>
                <Camera className="h-3.5 w-3.5" /> Image Autofill
              </button>
              <button type="button" onClick={() => setAutofillTab('text')}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm font-semibold transition-colors ${autofillTab === 'text' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-100/50 dark:text-emerald-300'}`}>
                <Sparkles className="h-3.5 w-3.5" /> Text Autofill
              </button>
            </div>
            <div className="p-3">
              {autofillTab === 'image' ? (
                <ValuationFlow
                  mode="add-listing"
                  onPrefill={(v) => {
                    if (v.brand) setBrand(v.brand);
                    if (v.model) setModel(v.model);
                    if (v.yearMid) setYear(String(v.yearMid)); else if (v.year) setYear(String(v.year));
                    if (v.trim) setTrim(v.trim);
                    if (v.bodyType) setBodyType(v.bodyType);
                    if (v.vehicleType) setVehicleType(v.vehicleType);
                    if (v.estimatedCarType) setCondition(v.estimatedCarType);
                    if (v.color) setColor(v.color);
                    if (v.fuelType) setFuelType(v.fuelType);
                    if (v.transmission) setTransmission(v.transmission);
                    if (v.location) setLocationState(v.location);
                    if (v.description) setDescription(v.description);
                    if (v.features?.length) setFeatures(v.features);
                    if (v.reasonForSelling) setReasonForSelling(v.reasonForSelling);
                    if (v.mileage) setMileage(String(v.mileage));
                    if (v.priceRangeLow && v.priceRangeHigh) {
                      setValuationPriceAdvisory({ low: v.priceRangeLow, high: v.priceRangeHigh, brand: v.brand || '', model: v.model || '' });
                    }
                    toast({ title: '✨ Form pre-filled!', description: 'Review all fields. Set your own price below.' });
                  }}
                />
              ) : (
                <AIAutofillPanel
                  defaultOpen={true}
                  onParsed={(data: Record<string, any>, socialPostText: string | null) => {
                    if (data.brand) setBrand(data.brand);
                    if (data.model) setModel(data.model);
                    if (data.year) setYear(String(data.year));
                    if (data.trim) setTrim(data.trim);
                    if (data.mileage) setMileage(String(data.mileage));
                    if (data.transmission) setTransmission(data.transmission);
                    if (data.fuelType) setFuelType(data.fuelType);
                    if (data.condition) setCondition(data.condition);
                    if (data.vehicleType) setVehicleType(data.vehicleType);
                    if (data.bodyType) setBodyType(data.bodyType);
                    if (data.color) setColor(data.color);
                    if (data.accidentHistory) setAccidentHistory(data.accidentHistory);
                    if (data.price) setPrice(data.price);
                    if (data.negotiable !== undefined) setNegotiable(data.negotiable);
                    if (data.urgentSale !== undefined) setUrgentSale(data.urgentSale);
                    if (data.locationState) setLocationState(data.locationState);
                    if (data.cityArea) setCityArea(data.cityArea);
                    if (data.town) setTown(data.town);
                    if (data.sellerType) setSellerType(data.sellerType);
                    if (data.description) setDescription(data.description);
                    if (data.reasonForSelling) setReasonForSelling(data.reasonForSelling);
                    if (data.features?.length) setFeatures(data.features);
                    if (data.acWorking) setAcWorking(data.acWorking);
                    if (data.acIssue) setAcIssue(data.acIssue);
                    if (data.engineCondition) setEngineCondition(data.engineCondition);
                    if (data.engineIssue) setEngineIssue(data.engineIssue);
                    if (data.wasRepainted) setWasRepainted(data.wasRepainted);
                    if (data.documentsComplete) setDocumentsComplete(data.documentsComplete);
                    if (data.missingDocs) setMissingDocs(data.missingDocs);
                    if (data.oilConsumption) setOilConsumption(data.oilConsumption);
                    if (data.otherIssues) setOtherIssues(data.otherIssues);
                    if (socialPostText) setSocialPost(socialPostText);
                  }}
                />
              )}
            </div>
          </div>

          {/* 1. Seller Type */}
          <SectionCard step={1} title="You are listing as">
            <div className="flex rounded-xl border border-border overflow-hidden">
              {(['owner', 'agent', 'dealer'] as const).map((type, i) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSellerType(type)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-colors capitalize ${
                    sellerType === type
                      ? 'bg-emerald-500 text-white'
                      : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                  } ${i > 0 ? 'border-l border-border' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {sellerType === 'owner' ? 'You own this vehicle' : sellerType === 'agent' ? 'Selling on behalf of owner' : 'Selling as a car dealer'}
            </p>
          </SectionCard>

          {/* 2. Location */}
          <SectionCard step={2} title="Location">
            <div className="space-y-4">
              <div>
                <FieldLabel required>State</FieldLabel>
                <Select value={locationState} onValueChange={setLocationState} required>
                  <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>{NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {availableCities.length > 0 ? (
                <div>
                  <FieldLabel required>City / Area</FieldLabel>
                  <Select value={cityArea} onValueChange={setCityArea} required>
                    <SelectTrigger><SelectValue placeholder="Select city/area" /></SelectTrigger>
                    <SelectContent>{availableCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              ) : locationState ? (
                <div>
                  <FieldLabel required>City / Area</FieldLabel>
                  <Input value={cityArea} onChange={e => setCityArea(e.target.value)} required placeholder="Enter city or area" />
                </div>
              ) : null}
              <div>
                <FieldLabel>Town / Neighborhood</FieldLabel>
                <Input value={town} onChange={e => setTown(e.target.value)} placeholder="e.g. Ikeja GRA, Wuse 2 (Optional)" />
              </div>
            </div>
          </SectionCard>

          {/* 3. Vehicle Details */}
          <SectionCard step={3} title="Vehicle Details">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel required>Make / Brand</FieldLabel>
                  <Select value={brand} onValueChange={setBrand} required>
                    <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                    <SelectContent>{BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Vehicle Type</FieldLabel>
                  <Select value={vehicleType} onValueChange={setVehicleType} required>
                    <SelectTrigger><SelectValue placeholder="Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car">Car</SelectItem>
                      <SelectItem value="truck">Truck</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="bus">Bus</SelectItem>
                      <SelectItem value="bike">Motorcycle / Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {brand === 'Other' && (
                <div>
                  <FieldLabel required>Enter Brand Name</FieldLabel>
                  <Input value={customBrand} onChange={e => setCustomBrand(e.target.value)} required placeholder="Enter vehicle brand" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel required>Model</FieldLabel>
                  <Input value={model} onChange={e => setModel(e.target.value)} required placeholder="e.g. Camry, Accord" />
                </div>
                <div>
                  <FieldLabel required>Year</FieldLabel>
                  <Select value={year} onValueChange={setYear} required>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel>Trim</FieldLabel>
                  <Input value={trim} onChange={e => setTrim(e.target.value)} placeholder="e.g. LE, EX, Sport" />
                </div>
                <div>
                  <FieldLabel>Mileage (km)</FieldLabel>
                  <Input type="number" value={mileage} onChange={e => setMileage(e.target.value)} min="0" placeholder="e.g. 45000" />
                  <p className="text-xs text-muted-foreground mt-1">Current odometer reading</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <FieldLabel required>Transmission</FieldLabel>
                  <Select value={transmission} onValueChange={setTransmission} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Fuel Type</FieldLabel>
                  <Select value={fuelType} onValueChange={setFuelType} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Petrol">Petrol</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="Electric">Electric</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Condition</FieldLabel>
                  <Select value={condition} onValueChange={setCondition} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nigerian_used">Nigerian Used</SelectItem>
                      <SelectItem value="foreign_used">Foreign Used (Tokunbo)</SelectItem>
                      <SelectItem value="brand_new">Brand New</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <FieldLabel required>Color</FieldLabel>
                  <Input value={color} onChange={e => setColor(e.target.value)} required placeholder="e.g. Black, Silver" />
                </div>

                <div>
                  <FieldLabel required>Accident History</FieldLabel>
                  <Select value={accidentHistory} onValueChange={setAccidentHistory} required>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Never</SelectItem>
                      <SelectItem value="minor">Minor</SelectItem>
                      <SelectItem value="major">Major</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <FieldLabel>Body Type</FieldLabel>
                  <Select value={bodyType} onValueChange={setBodyType}>
                    <SelectTrigger><SelectValue placeholder="Optional" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedan">Sedan</SelectItem>
                      <SelectItem value="suv">SUV</SelectItem>
                      <SelectItem value="hatchback">Hatchback</SelectItem>
                      <SelectItem value="coupe">Coupe</SelectItem>
                      <SelectItem value="convertible">Convertible</SelectItem>
                      <SelectItem value="wagon">Wagon / Estate</SelectItem>
                      <SelectItem value="truck">Truck / Pickup</SelectItem>
                      <SelectItem value="van">Van</SelectItem>
                      <SelectItem value="bus">Bus / Minibus</SelectItem>
                      <SelectItem value="bike">Motorcycle / Bike</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 4. Pricing */}
          <SectionCard step={4} title="Pricing">
            <div className="space-y-3">
              <div>
                <FieldLabel required>Price (₦)</FieldLabel>
                <Input
                  type="text"
                  value={price}
                  onChange={e => setPrice(formatPriceWithCommas(e.target.value))}
                  required
                  placeholder="e.g. 5,000,000"
                />
                {videoRequired && (
                  <p className="text-sm text-orange-500 mt-2 flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Video upload is required for vehicles above ₦3M
                  </p>
                )}
                {valuationPriceAdvisory && (
                  <div className="mt-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-2.5 flex items-start gap-2">
                    <span className="text-emerald-600 text-sm mt-0.5">💡</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Price Advisory</p>
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
                        Similar <strong>{valuationPriceAdvisory.brand} {valuationPriceAdvisory.model}</strong> listings typically sell for{' '}
                        <strong>₦{valuationPriceAdvisory.low.toLocaleString('en-NG')} – ₦{valuationPriceAdvisory.high.toLocaleString('en-NG')}</strong>. Set your own price above.
                      </p>
                    </div>
                    <button type="button" onClick={() => setValuationPriceAdvisory(null)} className="text-emerald-400 hover:text-emerald-600 text-base leading-none flex-shrink-0">×</button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center justify-between p-3.5 border border-border rounded-xl bg-muted/30">
                  <div>
                    <p className="text-sm font-semibold text-foreground">Negotiable</p>
                    <p className="text-xs text-muted-foreground">Price is flexible</p>
                  </div>
                  <Switch checked={negotiable} onCheckedChange={setNegotiable} />
                </div>
                <div className="flex items-center justify-between p-3.5 border border-orange-200 dark:border-orange-500/30 rounded-xl bg-orange-50 dark:bg-orange-500/10">
                  <div>
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Distress Sale</p>
                    <p className="text-xs text-orange-500/80">Attract more buyers</p>
                  </div>
                  <Switch checked={urgentSale} onCheckedChange={setUrgentSale} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* 5. Media Upload - Fixed Layout */}
          <SectionCard step={5} title="Media Upload" description="Listings with video get 5× more enquiries">
            <div className="space-y-8">

              {/* Verification Type Toggle */}
              <div className="flex rounded-xl border border-border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setVerificationType('video')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors border-r border-border ${
                    verificationType === 'video' ? 'bg-emerald-500 text-white' : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Video className="h-4 w-4" /> Video
                  {verificationType === 'video' && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">Recommended</span>}
                </button>
                <button
                  type="button"
                  disabled={videoRequired}
                  onClick={() => !videoRequired && setVerificationType('photos')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${
                    verificationType === 'photos' ? 'bg-emerald-500 text-white'
                    : videoRequired ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-40'
                    : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <ImageIcon className="h-4 w-4" /> Photos only
                </button>
              </div>

              {videoRequired && (
                <p className="text-xs text-orange-500 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" /> Video required for vehicles above ₦3M
                </p>
              )}

              {/* Video Section */}
              {verificationType === 'video' && (
                <div className="space-y-5">
                  <Label className="text-base font-semibold">Upload Vehicle Video</Label>

                  {/* Video Recording Guide - BEFORE upload */}
                  <div className="bg-background rounded-2xl border border-border p-5">
                    <p className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                      <Info className="h-4 w-4 text-emerald-500" /> Video Recording Guide
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-3">BEFORE RECORDING</p>
                        <ul className="text-sm space-y-2.5">
                          {['Open hood', 'Open driver side doors', 'Start engine'].map((s, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-3">RECORDING STEPS</p>
                        <div className="space-y-3">
                          {[
                            { num: 1, text: 'Walk around exterior (20s)' },
                            { num: 2, text: 'Show interior (15s)' },
                            { num: 3, text: 'Show engine bay (10s)' }
                          ].map((step) => (
                            <div key={step.num} className="flex items-start gap-3">
                              <div className="bg-emerald-600 text-white text-xs font-bold w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                                {step.num}
                              </div>
                              <span className="text-sm">{step.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video Upload Area */}
                  <div className="flex items-start gap-4">
                    <div 
                      onClick={() => videoInputRef?.click()}
                      className="w-28 h-28 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors flex-shrink-0"
                    >
                      <Video className="h-8 w-8 text-emerald-500 mb-1" />
                      <span className="text-xs text-center text-muted-foreground">Add Video</span>
                    </div>

                    <Input 
                      ref={el => setVideoInputRef(el)} 
                      type="file" 
                      accept="video/*" 
                      className="hidden" 
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          if (file.size > 500 * 1024 * 1024) {
                            toast({ title: 'File Too Large', description: 'Video must be less than 500MB', variant: 'destructive' });
                            return;
                          }
                          setVideoFile(file);
                          setVideoUrl('');
                          setVideoPreviewUrl(URL.createObjectURL(file));
                        }
                      }} 
                    />

                    {videoFile && videoPreviewUrl && (
                      <div className="flex-1 p-4 border border-emerald-200 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center gap-4">
                        <video src={videoPreviewUrl} controls className="w-24 h-16 object-cover rounded-xl" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">{videoFile.name}</p>
                          <p className="text-xs text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => { setVideoFile(null); setVideoPreviewUrl(null); }} 
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label>Or paste video link (YouTube, Google Drive, Direct)</Label>
                    <Input
                      type="url"
                      value={videoUrl}
                      onChange={e => setVideoUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="mt-1.5"
                    />
                    {videoUrl.trim() && !isValidVideoUrl(videoUrl.trim()) && (
                      <p className="text-xs text-red-500 mt-1">Only YouTube, Google Drive or direct video links allowed</p>
                    )}
                  </div>
                </div>
              )}

              {/* Photos Section */}
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  {verificationType === 'photos' ? 'Add at least 5 photos *' : 'Vehicle Photos'}
                </Label>

                <div className="flex items-start gap-4 flex-wrap">
                  <div 
                    onClick={() => requiredPhotosInputRef?.click()}
                    className="w-28 h-28 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-colors flex-shrink-0"
                  >
                    <Plus className="h-8 w-8 text-emerald-500 mb-1" />
                    <span className="text-xs text-center text-muted-foreground">Add photos</span>
                  </div>

                  <Input 
                    ref={el => setRequiredPhotosInputRef(el)} 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    className="hidden" 
                    onChange={handleRequiredPhotosChange} 
                  />

                  {requiredPhotos.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                      {requiredPhotos.map((file, index) => (
                        <div 
                          key={index}
                          draggable
                          onDragStart={(e) => e.dataTransfer.setData("text/plain", index.toString())}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
                            movePhoto(fromIndex, index);
                          }}
                          className="relative group w-28 h-28 rounded-xl overflow-hidden border border-border bg-muted cursor-move"
                        >
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Photo ${index + 1}`} 
                            className="w-full h-full object-cover" 
                          />
                          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                            {index + 1}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeRequiredPhoto(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>

                          <div className="absolute bottom-2 right-2 bg-black/70 text-white p-1 rounded-full cursor-move">
                            <Move className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  First picture is the title picture. Drag to reorder.<br />
                  Supported image formats: JPG, PNG, HEIC, and WEBP<br />
                  Pictures may not exceed 5MB
                </p>
              </div>

              {/* Additional Photos */}
              <div>
                <Label>Additional Photos (Optional)</Label>
                <Input ref={el => setAdditionalPhotosInputRef(el)} type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalPhotosChange} />
                <button type="button" onClick={() => additionalPhotosInputRef?.click()}
                  className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border border-dashed border-border rounded-xl px-4 py-2.5 hover:bg-muted transition-colors mt-2">
                  <Plus className="h-4 w-4" /> Add More <span className="font-normal">({additionalPhotos.length}/4)</span>
                </button>
                {additionalPhotos.length > 0 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                    {additionalPhotos.map((file, idx) => (
                      <div key={idx} className="relative flex-shrink-0 w-20 h-20">
                        <img src={URL.createObjectURL(file)} alt={`Additional ${idx + 1}`} className="w-full h-full object-cover rounded-xl border border-border" />
                        <button type="button" onClick={() => removeAdditionalPhoto(idx)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </SectionCard>

          {/* 6. Features */}
          <SectionCard step={6} title="Features">
            <div className="flex flex-wrap gap-2">
              {FEATURES.map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all ${
                    features.includes(feature)
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'bg-background border-border text-muted-foreground hover:border-emerald-500/50 hover:text-foreground'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
            {features.length > 0 && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-3">
                {features.length} feature{features.length !== 1 ? 's' : ''} selected
              </p>
            )}
          </SectionCard>

          {/* 7. Condition FAQ */}
          <SectionCard step={7} title="Vehicle Condition" description="Be honest — buyers appreciate transparency">
            <div className="space-y-5">
              {[
                { label: 'Does the vehicle have AC and does it work?', value: acWorking, onChange: setAcWorking, showIssue: acWorking === 'no', issueValue: acIssue, onIssueChange: setAcIssue, issuePlaceholder: 'Describe the AC issue...' },
                { label: 'Is the engine in good condition?', value: engineCondition, onChange: setEngineCondition, showIssue: engineCondition === 'no', issueValue: engineIssue, onIssueChange: setEngineIssue, issuePlaceholder: 'Describe the engine issue...' },
                { label: 'Has the vehicle been repainted?', value: wasRepainted, onChange: setWasRepainted },
                { label: 'Is the Vehicle registered and are the documents complete?', value: documentsComplete, onChange: setDocumentsComplete, showIssue: documentsComplete === 'no', issueValue: missingDocs, onIssueChange: setMissingDocs, issuePlaceholder: 'List missing documents...' },
                { label: 'Does the vehicle consume oil between services?', value: oilConsumption, onChange: setOilConsumption },
              ].map(({ label, value, onChange, showIssue, issueValue, onIssueChange, issuePlaceholder }) => (
                <div key={label} className="pb-5 border-b border-border last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-foreground">
                    {label} <span className="text-red-500">*</span>
                  </p>
                  <YesNoToggle value={value} onChange={onChange as (v: 'yes' | 'no') => void} />
                  {showIssue && onIssueChange && (
                    <Textarea value={issueValue} onChange={e => onIssueChange(e.target.value)} placeholder={issuePlaceholder} rows={2} className="text-sm mt-3" />
                  )}
                </div>
              ))}

              <div>
                <FieldLabel>Any other issues?</FieldLabel>
                <Textarea value={otherIssues} onChange={e => setOtherIssues(e.target.value)} placeholder="List any other issues (optional)..." rows={3} className="text-sm" />
              </div>
            </div>
          </SectionCard>

          {/* 8. Description & Details */}
          <SectionCard step={8} title="Description & Details">
            <div className="space-y-4">
              <div>
                <FieldLabel>Vehicle Description</FieldLabel>
                <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={6} placeholder="Describe your vehicle in detail..." className="text-sm" />
                <p className="text-xs text-muted-foreground mt-1.5">
                  💡 Mention engine condition, AC status, tire condition, available documents, and any faults
                </p>
              </div>
              <div>
                <FieldLabel required>Reason for Selling</FieldLabel>
                <Select value={reasonForSelling} onValueChange={setReasonForSelling} required>
                  <SelectTrigger><SelectValue placeholder="Select reason" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upgrading">Upgrading</SelectItem>
                    <SelectItem value="relocating">Relocating</SelectItem>
                    <SelectItem value="need_cash">Need Cash</SelectItem>
                    <SelectItem value="company_disposal">Company Disposal</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-start gap-3 p-4 border border-border rounded-xl bg-muted/30">
                <Checkbox id="confirm" checked={confirmed} onCheckedChange={c => setConfirmed(c as boolean)} required className="mt-0.5" />
                <label htmlFor="confirm" className="text-sm text-foreground cursor-pointer leading-relaxed">
                  I confirm this vehicle is available and all details provided are accurate
                </label>
              </div>
            </div>
          </SectionCard>

          {/* Validation summary */}
          {submitAttempted && (() => {
            const missing: string[] = [];
            if (!brand && !customBrand) missing.push('Make / Brand');
            if (!model) missing.push('Model');
            if (!year) missing.push('Year');
            if (!condition) missing.push('Condition');
            if (!transmission) missing.push('Transmission');
            if (!fuelType) missing.push('Fuel Type');
            if (!price) missing.push('Price');
            if (!locationState) missing.push('State');
            if (!cityArea) missing.push('City / Area');
            if (!accidentHistory) missing.push('Accident History');
            if (!reasonForSelling) missing.push('Reason for Selling');
            if (!acWorking) missing.push('AC status (Condition FAQ)');
            if (!engineCondition) missing.push('Engine condition (Condition FAQ)');
            if (!wasRepainted) missing.push('Repainted status (Condition FAQ)');
            if (!documentsComplete) missing.push('Documents status (Condition FAQ)');
            if (!oilConsumption) missing.push('Oil consumption (Condition FAQ)');
            if (!confirmed) missing.push('Accuracy confirmation checkbox');
            if (missing.length === 0) return null;
            return (
              <div className="rounded-2xl border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">
                    {missing.length} required field{missing.length !== 1 ? 's' : ''} still need attention
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {missing.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700 font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}

          {uploading && uploadProgress && (
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{uploadProgress}</p>
            </div>
          )}

          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" size="lg" onClick={handleSaveDraft} disabled={loading} className="font-semibold">
              Save Draft
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold disabled:bg-gray-400 disabled:cursor-not-allowed" 
              disabled={loading || uploading || !isFormValid()}
            >
              {loading ? (uploading ? uploadProgress : 'Submitting...') : 'Submit Listing for Approval'}
            </Button>
          </div>
          <div className="flex justify-center">
            <button type="button" onClick={clearForm} className="text-xs text-muted-foreground hover:text-red-500 underline transition-colors">
              Clear all fields
            </button>
          </div>

        </form>
      </div>
    </>
  );
}