'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { supabase, Listing } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { uploadImagesToR2, uploadVideoToR2 } from '@/lib/r2';
import { AlertCircle, Video, Image as ImageIcon, Sparkles, ChevronDown, ChevronUp, Loader2, CheckCircle2 } from 'lucide-react';

const BRANDS = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'BMW', 'Lexus', 'Nissan', 'Ford', 'Hyundai',
  'Kia', 'Volkswagen', 'Audi', 'Land Rover', 'Mazda', 'Peugeot', 'Mitsubishi',
  'Chevrolet', 'Subaru', 'Isuzu', 'Jeep', 'Volvo', 'Infiniti', 'Acura', 'Porsche',
  'Range Rover', 'Jaguar', 'Suzuki', 'Fiat', 'Renault', 'Opel', 'MG',
  'Chery', 'BYD', 'Haval', 'GAC', 'JAC', 'Innoson',
  'MAN', 'Scania', 'Hino', 'FUSO', 'Sinotruk', 'Shacman', 'Dongfeng', 'Foton',
  'Yutong', 'King Long', 'Higer', 'Ashok Leyland',
  'Yamaha', 'Bajaj', 'TVS', 'Haojue', 'Other',
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

const FEATURES = [
  'Air Conditioning', 'Power Steering', 'Power Windows', 'Power Locks',
  'AM/FM Radio', 'CD Player', 'Bluetooth', 'USB / AUX',
  'Backup Camera', 'Parking Sensors', 'ABS', 'Airbags',
  'Alloy Wheels', 'Sunroof', 'Leather Seats', 'Heated Seats',
  'Navigation GPS', 'Cruise Control', 'Keyless Entry', 'Immobilizer'
];

const formatPriceWithCommas = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const parsePriceFromFormatted = (formattedValue: string): string => {
  return formattedValue.replace(/,/g, '');
};

// ─── Gemini AI Autofill ──────────────────────────────────────────────────────

async function parseWithGemini(text: string): Promise<Record<string, any>> {
  const res = await fetch('/api/ai-autofill', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || `Request failed (${res.status})`);
  return json.data;
}

function AIAutofillPanel({ onParsed }: { onParsed: (d: Record<string, any>) => void }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handle = async () => {
    if (!text.trim()) return;
    setLoading(true); setError(''); setDone(false);
    try {
      const parsed = await parseWithGemini(text);
      if (parsed.price) parsed.price = formatPriceWithCommas(String(parsed.price));
      onParsed(parsed);
      setDone(true);
      toast({ title: '✨ Form updated!', description: 'Review all fields before saving.' });
      setTimeout(() => setOpen(false), 1000);
    } catch (e: any) {
      setError(e.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-950/30 dark:to-indigo-950/30 dark:border-violet-800 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-violet-100/50 dark:hover:bg-violet-900/20 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-full bg-violet-600 text-white">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">AI Autofill</p>
            <p className="text-xs text-violet-600 dark:text-violet-400">Paste a description — AI fills the form instantly</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {done && <CheckCircle2 className="h-4 w-4 text-green-600" />}
          {open ? <ChevronUp className="h-4 w-4 text-violet-500" /> : <ChevronDown className="h-4 w-4 text-violet-500" />}
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-3">
          <Textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="e.g. 2019 Toyota Camry, silver, Lagos Lekki, automatic, 62000km, ₦8.5M, Tokunbo, AC perfect, no accident, all documents complete..."
            rows={4}
            className="bg-white dark:bg-background border-violet-200 dark:border-violet-700 text-sm resize-none"
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
              className="bg-violet-600 hover:bg-violet-700 text-white gap-2"
            >
              {loading
                ? <><Loader2 className="h-3.5 w-3.5 animate-spin" />Parsing...</>
                : done
                ? <><CheckCircle2 className="h-3.5 w-3.5" />Done!</>
                : <><Sparkles className="h-3.5 w-3.5" />Fill Form</>}
            </Button>
            <p className="text-xs text-violet-500">Review all fields after autofill</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function EditListingPage() {
  const { user, loading: authLoading, refreshSession } = useAuth();
  const router = useRouter();
  const params = useParams();
  const listingId = params.id as string;
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetchingListing, setFetchingListing] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

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
  const [existingVideoUrl, setExistingVideoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [additionalPhotos, setAdditionalPhotos] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [description, setDescription] = useState('');
  const [reasonForSelling, setReasonForSelling] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [currentStatus, setCurrentStatus] = useState<string>('pending');

  const [acWorking, setAcWorking] = useState<'yes' | 'no' | ''>('');
  const [acIssue, setAcIssue] = useState('');
  const [engineCondition, setEngineCondition] = useState<'yes' | 'no' | ''>('');
  const [engineIssue, setEngineIssue] = useState('');
  const [wasRepainted, setWasRepainted] = useState<'yes' | 'no' | ''>('');
  const [documentsComplete, setDocumentsComplete] = useState<'yes' | 'no' | ''>('');
  const [missingDocs, setMissingDocs] = useState('');
  const [oilConsumption, setOilConsumption] = useState<'yes' | 'no' | ''>('');
  const [otherIssues, setOtherIssues] = useState('');

  const availableCities = CITIES_BY_STATE[locationState] || [];
  const priceNum = parseFloat(parsePriceFromFormatted(price)) || 0;
  const videoRequired = priceNum > 3000000;

  const toggleFeature = (f: string) =>
    setFeatures(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);

  const applyParsed = (d: Record<string, any>) => {
    if (d.brand) setBrand(d.brand);
    if (d.model) setModel(d.model);
    if (d.year) setYear(String(d.year));
    if (d.trim) setTrim(d.trim);
    if (d.mileage) setMileage(String(d.mileage));
    if (d.transmission) setTransmission(d.transmission);
    if (d.fuelType) setFuelType(d.fuelType);
    if (d.condition) setCondition(d.condition);
    if (d.vehicleType) setVehicleType(d.vehicleType);
    if (d.bodyType) setBodyType(d.bodyType);
    if (d.color) setColor(d.color);
    if (d.accidentHistory) setAccidentHistory(d.accidentHistory);
    if (d.price) setPrice(d.price);
    if (d.negotiable !== undefined) setNegotiable(d.negotiable);
    if (d.urgentSale !== undefined) setUrgentSale(d.urgentSale);
    if (d.locationState) setLocationState(d.locationState);
    if (d.cityArea) setCityArea(d.cityArea);
    if (d.town) setTown(d.town);
    if (d.sellerType) setSellerType(d.sellerType);
    if (d.description) setDescription(d.description);
    if (d.reasonForSelling) setReasonForSelling(d.reasonForSelling);
    if (d.features?.length) setFeatures(d.features);
    if (d.acWorking) setAcWorking(d.acWorking);
    if (d.acIssue) setAcIssue(d.acIssue);
    if (d.engineCondition) setEngineCondition(d.engineCondition);
    if (d.engineIssue) setEngineIssue(d.engineIssue);
    if (d.wasRepainted) setWasRepainted(d.wasRepainted);
    if (d.documentsComplete) setDocumentsComplete(d.documentsComplete);
    if (d.missingDocs) setMissingDocs(d.missingDocs);
    if (d.oilConsumption) setOilConsumption(d.oilConsumption);
    if (d.otherIssues) setOtherIssues(d.otherIssues);
  };

  useEffect(() => {
    if (!authLoading && !user) { router.push('/'); return; }
    if (user) loadListing();
  }, [user, authLoading, listingId]);

  const loadListing = async () => {
    try {
      const { data, error } = await supabase
        .from('listings').select('*')
        .eq('id', listingId).eq('user_id', user?.id).maybeSingle();
      if (error) throw error;
      if (!data) {
        toast({ title: 'Error', description: 'Listing not found or no permission', variant: 'destructive' });
        router.push('/profile'); return;
      }
      const l = data as Listing;
      setSellerType((l.seller_type as any) || 'owner');
      setLocationState(l.location_state || '');
      setCityArea(l.location_lga || '');
      setTown(l.city_area || '');
      setBrand(l.brand || '');
      setModel(l.model || '');
      setYear(l.year?.toString() || '');
      setTrim(l.trim || '');
      setMileage(l.mileage?.toString() || '');
      setTransmission(l.transmission || '');
      setFuelType(l.fuel_type || '');
      setCondition(l.condition || '');
      setVehicleType(l.vehicle_type || 'car');
      setBodyType(l.body_type || '');
      setColor(l.color || '');
      setAccidentHistory(l.accident_history || '');
      setPrice(formatPriceWithCommas(l.price?.toString() || ''));
      setNegotiable(l.negotiable || false);
      setUrgentSale(l.urgent_sale || false);
      setVerificationType(l.video_url ? 'video' : 'photos');
      setExistingVideoUrl(l.video_url || '');
      setVideoUrl(l.video_url || '');
      setExistingImages(l.images || []);
      setDescription(l.description || '');
      setReasonForSelling(l.reason_for_selling || '');
      setFeatures(l.features || []);
      setCurrentStatus(l.status || 'pending');
      setAcWorking((l as any).faq_ac_working || '');
      setAcIssue((l as any).faq_ac_issue || '');
      setEngineCondition((l as any).faq_engine_condition || '');
      setEngineIssue((l as any).faq_engine_issue || '');
      setWasRepainted((l as any).faq_was_repainted || '');
      setDocumentsComplete((l as any).faq_documents_complete || '');
      setMissingDocs((l as any).faq_missing_documents || '');
      setOilConsumption((l as any).faq_oil_consumption || '');
      setOtherIssues((l as any).faq_other_issues || '');
    } catch (error: any) {
      console.error('Error loading listing:', error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setFetchingListing(false);
    }
  };

  const uploadVideo = async (file: File): Promise<string | null> => {
    try {
      const url = await uploadVideoToR2(file);
      if (!url) throw new Error('Failed to upload video. Check the "listing-videos" bucket RLS policy.');
      return url;
    } catch (error: any) {
      toast({
        title: 'Video Upload Failed',
        description: error.message?.includes('row-level security') ? 'Storage permission error. Please contact support.' : error.message,
        variant: 'destructive',
      });
      return null;
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    try { return await uploadImagesToR2(files); }
    catch (error: any) {
      toast({ title: 'Image Upload Failed', description: error.message, variant: 'destructive' });
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/'); return; }
    setLoading(true); setUploading(true);
    await refreshSession();
    try {
      const finalBrand = brand === 'Other' ? customBrand : brand;
      let uploadedVideoUrl = videoUrl;
      let uploadedImageUrls: string[] = existingImages.filter(img => !removedImages.includes(img));

      if (verificationType === 'video' && videoFile) {
        setUploadProgress('Uploading video...');
        uploadedVideoUrl = await uploadVideo(videoFile) || uploadedVideoUrl;
        if (!uploadedVideoUrl) throw new Error('Failed to upload video');
      }

      if (additionalPhotos.length > 0) {
        setUploadProgress('Uploading images...');
        const newUrls = await uploadImages(additionalPhotos);
        uploadedImageUrls = [...uploadedImageUrls, ...newUrls];
      }

      setUploadProgress('Updating listing...');

      const listingData: any = {
        title: `${finalBrand} ${model} ${year}`,
        brand: finalBrand, model,
        year: parseInt(year),
        price: parseFloat(parsePriceFromFormatted(price)),
        negotiable, urgent_sale: urgentSale,
        vehicle_type: vehicleType, fuel_type: fuelType, transmission, color,
        mileage: mileage ? parseInt(mileage) : null,
        description,
        location_state: locationState, location_lga: cityArea, city_area: town,
        seller_type: sellerType, ownership_type: sellerType,
        trim: trim || null, condition,
        body_type: bodyType || null,
        accident_history: accidentHistory || null,
        reason_for_selling: reasonForSelling, features,
        status: currentStatus,
        images: uploadedImageUrls,
        faq_ac_working: acWorking || null,
        faq_ac_issue: acWorking === 'no' ? acIssue : null,
        faq_engine_condition: engineCondition || null,
        faq_engine_issue: engineCondition === 'no' ? engineIssue : null,
        faq_was_repainted: wasRepainted || null,
        faq_documents_complete: documentsComplete || null,
        faq_missing_documents: documentsComplete === 'no' ? missingDocs : null,
        faq_oil_consumption: oilConsumption || null,
        faq_other_issues: otherIssues || null,
      };

      if (verificationType === 'video' && uploadedVideoUrl) {
        listingData.video_url = uploadedVideoUrl;
        listingData.verification_level = 'video_verified';
      } else {
        listingData.video_url = null;
        listingData.verification_level = 'basic';
      }

      const { error } = await supabase.from('listings').update(listingData).eq('id', listingId);
      if (error) throw error;
      toast({ title: 'Success!', description: 'Your listing has been updated' });
      router.push('/profile');
    } catch (error: any) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setLoading(false); setUploading(false); setUploadProgress('');
    }
  };

  const removeExistingImage = (img: string) => setRemovedImages(prev => [...prev, img]);
  const restoreImage = (img: string) => setRemovedImages(prev => prev.filter(i => i !== img));

  if (authLoading || fetchingListing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-96 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-20">
      <h1 className="text-3xl font-bold text-foreground mb-2">Edit Listing</h1>
      <p className="text-muted-foreground mb-8">Update your vehicle listing</p>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* AI Autofill */}
        <AIAutofillPanel onParsed={applyParsed} />

        {/* Seller Type — compact toggle */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Listing as:</span>
              <div className="flex rounded-lg border overflow-hidden w-full sm:w-auto">
                {(['owner', 'agent', 'dealer'] as const).map((type, i) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSellerType(type)}
                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium transition-colors ${
                      sellerType === type ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted text-foreground'
                    } ${i > 0 ? 'border-l' : ''}`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <span className="text-xs text-muted-foreground hidden sm:block">
                {sellerType === 'owner' ? 'You own this vehicle' : sellerType === 'agent' ? 'Selling on behalf of owner' : 'Selling as a car dealer'}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader><CardTitle>Location</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>State *</Label>
              <Select value={locationState} onValueChange={setLocationState} required>
                <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                <SelectContent>{NIGERIAN_STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {availableCities.length > 0 && (
              <div>
                <Label>City / Area *</Label>
                <Select value={cityArea} onValueChange={setCityArea} required>
                  <SelectTrigger><SelectValue placeholder="Select city/area" /></SelectTrigger>
                  <SelectContent>{availableCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            {!availableCities.length && locationState && (
              <div>
                <Label>City / Area *</Label>
                <Input value={cityArea} onChange={e => setCityArea(e.target.value)} required placeholder="Enter city or area" />
              </div>
            )}
            <div>
              <Label>Town / Neighborhood</Label>
              <Input value={town} onChange={e => setTown(e.target.value)} placeholder="e.g., Ikeja GRA, Wuse 2 (Optional)" />
            </div>
          </CardContent>
        </Card>

        {/* Vehicle Details */}
        <Card>
          <CardHeader><CardTitle>Vehicle Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Make / Brand *</Label>
                <Select value={brand} onValueChange={setBrand} required>
                  <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                  <SelectContent>{BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Vehicle Type *</Label>
                <Select value={vehicleType} onValueChange={setVehicleType} required>
                  <SelectTrigger><SelectValue placeholder="Select vehicle type" /></SelectTrigger>
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
                <Label>Enter Brand Name *</Label>
                <Input value={customBrand} onChange={e => setCustomBrand(e.target.value)} required placeholder="Enter vehicle brand" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Model *</Label>
                <Input value={model} onChange={e => setModel(e.target.value)} required placeholder="e.g., Camry, Accord" />
              </div>
              <div>
                <Label>Year *</Label>
                <Select value={year} onValueChange={setYear} required>
                  <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                  <SelectContent>{YEARS.map(y => <SelectItem key={y} value={y.toString()}>{y}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label>Trim (Optional)</Label>
                <Input value={trim} onChange={e => setTrim(e.target.value)} placeholder="e.g., LE, EX, Sport" />
              </div>
              <div>
                <Label>Mileage (km)</Label>
                <Input type="number" value={mileage} onChange={e => setMileage(e.target.value)} min="0" placeholder="e.g., 45000 (Optional)" />
                <p className="text-xs text-gray-500 mt-1">Current odometer reading</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Transmission *</Label>
                <Select value={transmission} onValueChange={setTransmission} required>
                  <SelectTrigger><SelectValue placeholder="Select transmission" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Automatic">Automatic</SelectItem>
                    <SelectItem value="Manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Fuel Type *</Label>
                <Select value={fuelType} onValueChange={setFuelType} required>
                  <SelectTrigger><SelectValue placeholder="Select fuel type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Petrol">Petrol</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                    <SelectItem value="Electric">Electric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Condition *</Label>
                <Select value={condition} onValueChange={setCondition} required>
                  <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nigerian_used">Nigerian Used</SelectItem>
                    <SelectItem value="foreign_used">Foreign Used (Tokunbo)</SelectItem>
                    <SelectItem value="brand_new">Brand New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Color *</Label>
                <Input value={color} onChange={e => setColor(e.target.value)} required placeholder="e.g., Black, White, Silver" />
              </div>
              {/* Accident History + Body Type on same row */}
              <div>
                <Label>Accident History</Label>
                <Select value={accidentHistory} onValueChange={setAccidentHistory}>
                  <SelectTrigger><SelectValue placeholder="Select accident history" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="minor">Minor</SelectItem>
                    <SelectItem value="major">Major</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Body Type</Label>
                <Select value={bodyType} onValueChange={setBodyType}>
                  <SelectTrigger><SelectValue placeholder="Select body type (Optional)" /></SelectTrigger>
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
          </CardContent>
        </Card>

        {/* Pricing */}
        <Card>
          <CardHeader><CardTitle>Pricing</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Price (₦) *</Label>
              <Input
                type="text" value={price}
                onChange={e => setPrice(formatPriceWithCommas(e.target.value))}
                required placeholder="e.g., 5,000,000"
              />
              {videoRequired && (
                <p className="text-sm text-orange-600 mt-2 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />Video upload is required for vehicles above ₦3M
                </p>
              )}
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div><Label>Negotiable</Label><p className="text-sm text-gray-500">Is the price negotiable?</p></div>
              <Switch checked={negotiable} onCheckedChange={setNegotiable} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg bg-orange-500/10 border-orange-500/20">
              <div><Label>Urgent Sale</Label><p className="text-sm text-muted-foreground">Mark this as urgent to attract more buyers</p></div>
              <Switch checked={urgentSale} onCheckedChange={setUrgentSale} />
            </div>
          </CardContent>
        </Card>

        {/* Media — compact toggle in header */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle>Media</CardTitle>
                {videoRequired && (
                  <p className="text-sm text-orange-600 mt-1 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />Video required for vehicles above ₦3M
                  </p>
                )}
              </div>
              <div className="flex rounded-lg border overflow-hidden">
                <button
                  type="button"
                  onClick={() => setVerificationType('video')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-r ${
                    verificationType === 'video' ? 'bg-primary text-primary-foreground' : 'bg-background hover:bg-muted text-foreground'
                  }`}
                >
                  <Video className="h-4 w-4" />
                  Video
                  {verificationType !== 'video' && (
                    <span className="text-xs text-green-600 bg-green-500/10 px-1.5 py-0.5 rounded">5×</span>
                  )}
                </button>
                <button
                  type="button"
                  disabled={videoRequired}
                  onClick={() => !videoRequired && setVerificationType('photos')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                    verificationType === 'photos' ? 'bg-primary text-primary-foreground'
                    : videoRequired ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                    : 'bg-background hover:bg-muted text-foreground'
                  }`}
                >
                  <ImageIcon className="h-4 w-4" />Photos only
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {existingImages.length > 0 && (
              <div>
                <Label>Current Images</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                  {existingImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border">
                      <img src={img} alt={`Image ${idx + 1}`} className="w-full h-full object-cover" />
                      {removedImages.includes(img) ? (
                        <button type="button" onClick={() => restoreImage(img)} className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-medium">
                          Tap to restore
                        </button>
                      ) : (
                        <button type="button" onClick={() => removeExistingImage(img)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {removedImages.length > 0 && (
                  <p className="text-sm text-red-500 mt-2">{removedImages.length} image(s) marked for removal</p>
                )}
              </div>
            )}
            <div>
              <Label>Add More Photos</Label>
              <Input
                type="file" accept="image/*" multiple
                onChange={e => { const files = Array.from(e.target.files || []); setAdditionalPhotos(prev => [...prev, ...files]); }}
                className="mt-2 cursor-pointer"
              />
              {additionalPhotos.length > 0 && (
                <p className="text-sm text-green-600 mt-1">{additionalPhotos.length} new photo(s) selected</p>
              )}
            </div>
            {existingVideoUrl && (
              <div>
                <Label>Current Video</Label>
                <div className="mt-2 p-4 border rounded-lg">
                  {existingVideoUrl.includes('youtu')
                    ? <p className="text-sm text-muted-foreground break-all">{existingVideoUrl}</p>
                    : <video src={existingVideoUrl} controls className="w-full max-h-48 rounded" />}
                  <button type="button" onClick={() => { setExistingVideoUrl(''); setVideoUrl(''); }} className="mt-2 text-sm text-red-500 hover:underline">
                    Remove Video
                  </button>
                </div>
              </div>
            )}
            {verificationType === 'video' && (
              <>
                <div>
                  <Label>{existingVideoUrl ? 'Replace Video' : 'Upload Video'}</Label>
                  <Input
                    type="file" accept="video/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 100 * 1024 * 1024) {
                          toast({ title: 'File Too Large', description: 'Video must be less than 100MB', variant: 'destructive' }); return;
                        }
                        setVideoFile(file);
                      }
                    }}
                    className="cursor-pointer"
                  />
                  {videoFile && <p className="text-sm text-green-600 mt-1">Selected: {videoFile.name} ({(videoFile.size / (1024 * 1024)).toFixed(2)} MB)</p>}
                </div>
                <div>
                  <Label>Or paste a YouTube / video URL</Label>
                  <Input
                    value={existingVideoUrl.includes('youtu') ? existingVideoUrl : videoUrl}
                    onChange={e => setVideoUrl(e.target.value)}
                    placeholder="https://youtu.be/..."
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader><CardTitle>Features</CardTitle></CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {FEATURES.map(feature => (
                <button
                  key={feature} type="button" onClick={() => toggleFeature(feature)}
                  className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
                    features.includes(feature) ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border hover:border-muted-foreground'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
            {features.length > 0 && <p className="text-sm text-muted-foreground mt-2">{features.length} feature(s) selected</p>}
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Vehicle Condition FAQ</CardTitle>
            <CardDescription>Answer these questions about your vehicle&apos;s condition (all optional)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label>Does the vehicle have AC and does it work?</Label>
              <RadioGroup value={acWorking} onValueChange={v => setAcWorking(v as 'yes' | 'no')}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="ac-yes" /><Label htmlFor="ac-yes" className="cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="ac-no" /><Label htmlFor="ac-no" className="cursor-pointer">No</Label></div>
                </div>
              </RadioGroup>
              {acWorking === 'no' && <Textarea value={acIssue} onChange={e => setAcIssue(e.target.value)} placeholder="Describe the AC issue..." rows={2} />}
            </div>
            <div className="space-y-3">
              <Label>Is the engine in good condition?</Label>
              <RadioGroup value={engineCondition} onValueChange={v => setEngineCondition(v as 'yes' | 'no')}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="engine-yes" /><Label htmlFor="engine-yes" className="cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="engine-no" /><Label htmlFor="engine-no" className="cursor-pointer">No</Label></div>
                </div>
              </RadioGroup>
              {engineCondition === 'no' && <Textarea value={engineIssue} onChange={e => setEngineIssue(e.target.value)} placeholder="Describe the engine issue..." rows={2} />}
            </div>
            <div className="space-y-3">
              <Label>Has the vehicle been repainted?</Label>
              <RadioGroup value={wasRepainted} onValueChange={v => setWasRepainted(v as 'yes' | 'no')}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="repainted-yes" /><Label htmlFor="repainted-yes" className="cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="repainted-no" /><Label htmlFor="repainted-no" className="cursor-pointer">No</Label></div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label>Are the vehicle documents complete?</Label>
              <RadioGroup value={documentsComplete} onValueChange={v => setDocumentsComplete(v as 'yes' | 'no')}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="docs-yes" /><Label htmlFor="docs-yes" className="cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="docs-no" /><Label htmlFor="docs-no" className="cursor-pointer">No</Label></div>
                </div>
              </RadioGroup>
              {documentsComplete === 'no' && <Textarea value={missingDocs} onChange={e => setMissingDocs(e.target.value)} placeholder="List missing documents..." rows={2} />}
            </div>
            <div className="space-y-3">
              <Label>Does the vehicle consume oil between services?</Label>
              <RadioGroup value={oilConsumption} onValueChange={v => setOilConsumption(v as 'yes' | 'no')}>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="oil-yes" /><Label htmlFor="oil-yes" className="cursor-pointer">Yes</Label></div>
                  <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="oil-no" /><Label htmlFor="oil-no" className="cursor-pointer">No</Label></div>
                </div>
              </RadioGroup>
            </div>
            <div className="space-y-3">
              <Label>Any other issues?</Label>
              <Textarea value={otherIssues} onChange={e => setOtherIssues(e.target.value)} placeholder="List any other issues (optional)..." rows={3} />
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardHeader><CardTitle>Description & Details</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Vehicle Description *</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} required rows={6} placeholder="Describe your vehicle in detail..." />
              <p className="text-xs text-gray-500 mt-2">💡 Mention: Engine condition, AC status, tire condition, available documents, and any faults</p>
            </div>
            <div>
              <Label>Reason for Selling *</Label>
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
          </CardContent>
        </Card>

        {uploading && uploadProgress && (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
                <p className="text-sm font-medium text-primary">{uploadProgress}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1">Cancel</Button>
          <Button type="submit" className="flex-1" size="lg" disabled={loading || uploading}>
            {loading ? (uploading ? uploadProgress : 'Saving...') : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}