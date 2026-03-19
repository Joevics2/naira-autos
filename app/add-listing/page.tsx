'use client';

import { useState, useEffect } from 'react';
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
import { Video, Image as ImageIcon, AlertCircle, Info, ChevronDown, ChevronUp, ChevronLeft, X, Plus, Play, Trash2, Send, Sparkles, Loader2, CheckCircle2, Camera } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';

// ─── Gemini AI Autofill ──────────────────────────────────────────────────────

const formatPriceWithCommasGlobal = (value: string): string => {
  const numericValue = value.replace(/[^0-9]/g, '');
  if (!numericValue) return '';
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

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

function AIAutofillPanel({ onParsed, defaultOpen = false }: { onParsed: (d: Record<string, any>) => void; defaultOpen?: boolean }) {
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
      const parsed = await parseWithGemini(text);
      if (parsed.price) parsed.price = formatPriceWithCommasGlobal(String(parsed.price));
      onParsed(parsed);
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
  'Lagos', 'Abuja FCT', 'Kano', 'Rivers', 'Oyo', 'Kaduna', 'Ogun', 'Edo', 'Delta', 'Anambra',
  'Imo', 'Katsina', 'Enugu', 'Bauchi', 'Plateau', 'Cross River', 'Akwa Ibom', 'Borno', 'Osun',
  'Ondo', 'Kwara', 'Benue', 'Abia', 'Sokoto', 'Nasarawa', 'Adamawa', 'Kebbi', 'Taraba',
  'Niger', 'Gombe', 'Jigawa', 'Yobe', 'Zamfara', 'Ekiti', 'Bayelsa', 'Ebonyi', 'Kogi'
];

const CITIES_BY_STATE: Record<string, string[]> = {
  'Lagos': ['Ikeja', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Ajah', 'Festac', 'Apapa', 'Oshodi', 'Isolo', 'Egbe', 'Badagry', 'Ikorodu', 'Epe', 'Sangotedo', 'Abraham Adesanya', 'Ogba', 'Ojuelegba', 'Mushin', 'Shomolu', 'Bariga', 'Iganmu', 'Orile', 'Amuwo-Odofin', 'Ojo', 'Badagry Expressway', 'Sango Ota', 'Idumota', 'CMS', 'Marina'],
  'Abuja FCT': ['Central Business District', 'Asokoro', 'Maitama', 'Wuse', 'Garki', 'Gwarinpa', 'Kubwa', 'Kuje', 'Jahi', 'Utako', 'Maitama Extension', 'Wuse 2', 'Gwagwalada', 'Bwari', 'Karshi', 'Karaye', 'Zuba', 'Airport Road', 'Lokogoma', 'Gwagwa'],
  'Rivers': ['Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Okrika', 'Omoku', 'Eneka', 'Rumuomasi', 'Rumuokoro', 'Borokiri', 'Aba Road', 'Trans Amadi', 'D-Line', 'Old GRA', 'New GRA', 'Eliozu', 'Woji', 'Oginigba'],
  'Oyo': ['Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki', 'Ibadan North', 'Ibadan South', 'Ibadan East', 'Ibadan West', 'Ring Road', 'Bodija', 'Agodi', 'Samonda', 'Challenge', 'Molete', 'Oke-Ado', 'Ologuneru', 'Egbeda', 'Akinyele', 'Orire', 'Ikenga'],
  'Kano': ['Kano Municipal', 'Fagge', 'Dala', 'Kano New Layout', 'Tarauni', 'Ungogo', 'Kumbotso', 'Gyadi-Gyadi', 'Sabon Gari', 'Zaria Road', 'Bompai', 'Kafin Madaki', 'Gwammaja', 'Dambazawa', 'Bakin Ruwa', 'Kantudu', 'Rano', 'Bichi', 'Wudil', 'Gaya'],
  'Kaduna': ['Kaduna North', 'Kaduna South', 'Tudun Wada', 'Makera', 'Barnawa', 'Sabon Tasha', 'Tudun Murtala', 'Rigasa', 'Kakuri', 'Narayi', 'Romna', 'Badiko', 'Mando', 'Kawo', 'U/Trust', 'Ungwan Rimi', 'Ungwan Sanusi', 'Sabon Gari', 'Rafindadi', 'Zaria Road'],
  'Ogun': ['Abeokuta', 'Sagamu', 'Ijebu-Ode', 'Ota', 'Iwoye', 'Ilorin', 'Badagry', 'Ewekoro', 'Abeiokuta', 'Ogun Waterside', 'Ikenne', 'Remo North', 'Remo South', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Eredo', 'Ijebu North', 'Imeko Afon', 'Ipokia'],
  'Edo': ['Benin City', 'Ekpoma', 'Auchi', 'Uromi', 'Esan South', 'Esan North', 'Ikpoba Okha', 'Oredo', 'Orhionmwon', 'Uhunmwonde', 'Egor', 'Uselu', 'Evbuotubu', 'Upper Session', 'New Benin', 'Ring Road', 'Sakponba', 'GRA', 'Igbinedion', 'Ewohimi', 'Irrua'],
  'Delta': ['Asaba', 'Warri', 'Sapele', 'Abraka', 'Effurun', 'Uvwie', 'Okpe', 'Udu', 'Oshimili North', 'Oshimili South', 'Ndokwa East', 'Ndokwa West', 'Ika South', 'Ika North', 'Ethiope East', 'Ethiope West', 'Ughelli South', 'Ughelli North', 'Burutu', 'Patani'],
  'Anambra': ['Awka', 'Onitsha', 'Nnewi', 'Awka South', 'Awka North', 'Njikoka', 'Idemili North', 'Idemili South', 'Oyi', 'Anaocha', 'Dunukofia', 'Ekwusigo', 'Ihiala', 'Nri', 'Aguata', 'Orumba North', 'Orumba South', 'Ifeanyi Ubaka', 'Igbo Ezinne', 'Obosi'],
  'Imo': ['Owerri', 'Orlu', 'Okigwe', 'Owerri North', 'Owerri South', 'Owerri West', 'Ngor Okpala', 'Obowo', 'Ehime Mbano', 'Isiala Mbano', 'Oru East', 'Oru West', 'Ohaji/Egbema', 'Ikeduru', 'Mbaitoli', 'Isu', 'Nwangele', 'Nkwere', 'Umune', 'Ihube'],
  'Enugu': ['Enugu South', 'Enugu North', 'Enugu East', 'Nsukka', 'Awgu', 'Udi', 'Oji River', 'Isi Uzo', 'Igbo Eze North', 'Igbo Eze South', 'Enugu East', 'Achara', 'GRA', 'New Haven', 'Independence Layout', 'Ogui', 'Abakpa', 'Emene', 'Mile 50', 'Thinkers Corner', 'Trans Ekulu'],
  'Kwara': ['Ilorin', 'Ilorin South', 'Ilorin North', 'Ilorin West', 'Offa', 'Oyun', 'Ifelodun', 'Isin', 'Ekiti', 'Oke Ero', 'Ijesha', 'Edu', 'Patigi', 'Baruten', 'Kaiama', 'Moro', 'Sanyi', ' Asa', 'Ilorin East', 'Janjan'],
  'Ondo': ['Akure', 'Ondo', 'Owo', 'Okitipua', 'Ikale', 'Idanre', 'Ifedore', 'Ilaje', 'Ese Odo', 'Irele', 'Odigbo', 'Ose', 'Aiyegbale', 'Ile Oluji', 'Iju', 'Iwaro Oka', 'Akoko North', 'Akoko South', 'Akoko East', 'Akoko West'],
  'Osun': ['Ile-Ife', 'Ilesa', 'Osogbo', 'Iwo', 'Ede', 'Ikirun', 'Ila', 'Ijebu-Jesa', 'Ipetu-Ile', 'Ijesa-Isu', 'Atakumosa East', 'Atakumosa West', 'Ife North', 'Ife South', 'Ejigbo', 'Ejiba', 'Oriade', 'Ife Central', 'Ile-Ife East', 'Ile-Ife West'],
  'Cross River': ['Calabar', 'Calabar South', 'Calabar Municipal', 'Odukpani', 'Akamkpa', 'Biase', 'Boki', 'Ikom', 'Yakkur', 'Ogoja', 'Obubura', 'Obudu', 'Bekwerra', 'Etung', 'Afi', 'Ugep', 'Ibibio', 'Yala', 'Anyam', 'Ekpo'],
  'Akwa Ibom': ['Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Ukanafun', 'Etinan', 'Ibeno', 'Itu', 'Uruan', 'Nsit Atai', 'Nsit Ibom', 'Nsit Uyo', 'Oruk Anam', 'Udung Uko', 'INyang', 'Qua Iboe', 'Eung', 'Abak', 'Eastern Obolo', 'Ikwerre'],
  'Katsina': ['Katsina', 'Daura', 'Funtua', 'Kankia', 'Malumfashi', 'Mani', 'Mashi', 'Musawa', 'Rimi', 'Bakori', 'Batagarawa', 'Batsari', 'Bindawa', 'Charanchi', 'Dan Musa', 'Dandume', 'Danja', 'Dutsi', 'Dutsin-Ma', 'Ingawa', 'Jibia', 'Kafur', 'Kaita', 'Kurfi', 'Kusada', 'Mai Adua', 'Matazu', 'Safana', 'Sandamu', 'Zango'],
  'Bauchi': ['Bauchi', 'Azare', 'Misau', 'Katagum', 'Alkaleri', 'Bogoro', 'Dass', 'Darazo', 'Ganjuwa', 'Gamawa', 'Giade', 'Kirfi', 'Ningi', 'Shira', 'Tafawa Balewa', 'Warji', 'Zaki', 'Wunti', 'Kansakali', 'Yelwa', 'Makama', 'Fadama', 'Gubi', 'Dambam'],
  'Plateau': ['Jos', 'Bukuru', 'Shendam', 'Pankshin', 'Mangu', 'Barkin Ladi', 'Bassa', 'Bokkos', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 'Langtang North', 'Langtang South', 'Mikang', 'Riyom', 'Wase', 'GRA Jos', 'Rayfield', 'Terminus', 'Rantya', 'Nassarawa Gwong', 'Kabong', 'Jenta', 'Farin Gada', 'Angwan Rogo', 'Dadin Kowa'],
  'Borno': ['Maiduguri', 'Biu', 'Bama', 'Dikwa', 'Gwoza', 'Konduga', 'Damboa', 'Chibok', 'Hawul', 'Kwaya Kusar', 'Askira/Uba', 'Kukawa', 'Monguno', 'Marte', 'Ngala', 'Gubio', 'Jere', 'Kaga', 'Magumeri', 'Mafa', 'Mobbar', 'Nganzai', 'Shani', 'GRA Maiduguri', 'Bulumkutu', 'Baga Road', 'Gamboru Road', 'Lamisula', 'Gwange'],
  'Benue': ['Makurdi', 'Otukpo', 'Gboko', 'Katsina-Ala', 'Vandeikya', 'Gwer East', 'Gwer West', 'Agatu', 'Apa', 'Buruku', 'Guma', 'Konshisha', 'Kwande', 'Logo', 'Obi', 'Ohimini', 'Oju', 'Okpokwu', 'Tarka', 'Ushongo', 'Zaki Biam', 'High Level Makurdi', 'Wadata', 'North Bank', 'Wurukum', 'GRA Makurdi'],
  'Abia': ['Umuahia', 'Aba', 'Ohafia', 'Bende', 'Isuikwuato', 'Umunneochi', 'Osisioma', 'Isiala Ngwa North', 'Isiala Ngwa South', 'Ugwunagbo', 'Obingwa', 'Ukwa East', 'Ukwa West', 'Arochukwu', 'Obioma Ngwa', 'Aba North', 'Aba South', 'Ariaria Market', 'Ngwa Road', 'Owerrinta', 'Ogbor Hill', 'Eziukwu', 'Ndiegoro', 'Ibeku', 'Ubakala', 'Olokoro'],
  'Sokoto': ['Sokoto', 'Wamako', 'Gada', 'Gudu', 'Gwadabawa', 'Illela', 'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wurno', 'Yabo', 'GRA Sokoto', 'Gawon Nama', 'Kofar Rini', 'Dange/Shuni', 'Bodinga', 'Goronyo'],
  'Nasarawa': ['Lafia', 'Keffi', 'Akwanga', 'Nasarawa', 'Nasarawa Eggon', 'Awe', 'Doma', 'Keana', 'Kokona', 'Obi', 'Toto', 'Wamba', 'GRA Lafia', 'Television Area Lafia', 'State Housing Lafia', 'Shabu', 'Mararaba Gurku', 'Mararaba', 'Uke', 'Gitata', 'Masaka', 'Panda'],
  'Adamawa': ['Yola', 'Jimeta', 'Mubi', 'Numan', 'Hong', 'Ganye', 'Michika', 'Madagali', 'Maiha', 'Fufore', 'Girei', 'Shelleng', 'Song', 'Gombi', 'Guyuk', 'Lamurde', 'Demsa', 'Mayo Belwa', 'Toungo', 'Jada', 'High Level Jimeta', 'New Housing Estate Yola', 'Karewa', 'Luggere', 'Bekaji'],
  'Kebbi': ['Birnin Kebbi', 'Argungu', 'Yelwa', 'Koko', 'Zuru', 'Aliero', 'Arewa Dandi', 'Augie', 'Bagudo', 'Bunza', 'Dandi', 'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'GRA Birnin Kebbi', 'Ambursa', 'Dakingari'],
  'Taraba': ['Jalingo', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Karim Lamido', 'Kurmi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing', 'GRA Jalingo', 'Barade', 'Yelwa Jalingo', 'Kona', 'Suntai', 'Mutum Biyu'],
  'Niger': ['Minna', 'Bida', 'Kontagora', 'Suleja', 'Lapai', 'Agaie', 'Agwara', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 'Munya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Tafa', 'Wushishi', 'GRA Minna', 'Tudun Wada Minna', 'Maitumbi', 'Kpakungu'],
  'Gombe': ['Gombe', 'Kaltungo', 'Billiri', 'Dukku', 'Funakaye', 'Kwami', 'Nafada', 'Shongom', 'Balanga', 'Akko', 'Yamaltu/Deba', 'GRA Gombe', 'Pantami', 'Jekadafari', 'Nasarawa Gombe', 'Bolari', 'Dawaki Gombe', 'Gabukka', 'Herwagana'],
  'Jigawa': ['Dutse', 'Hadejia', 'Gumel', 'Kazaure', 'Birnin Kudu', 'Ringim', 'Auyo', 'Babura', 'Biriniwa', 'Buji', 'Gagarawa', 'Garki', 'Guri', 'Gwiwa', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Kiyawa', 'Maigatari', 'Malam Madori', 'Miga', 'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi', 'Gwaram'],
  'Yobe': ['Damaturu', 'Nguru', 'Potiskum', 'Gashua', 'Bade', 'Bursari', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 'Karasuwa', 'Machina', 'Nangere', 'Tarmuwa', 'Yunusari', 'Yusufari', 'GRA Damaturu', 'Bular'],
  'Zamfara': ['Gusau', 'Talata Mafara', 'Kaura Namoda', 'Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum', 'Bungudu', 'Gummi', 'Maradun', 'Maru', 'Shinkafi', 'Tsafe', 'Zurmi', 'GRA Gusau', 'Tudun Wada Gusau', 'Kofar Fada', 'Kofar Guga', 'Sabon Gari Gusau'],
  'Ekiti': ['Ado Ekiti', 'Ikere', 'Ilawe', 'Ijero', 'Ikole', 'Omuo', 'Oye', 'Efon', 'Ido Osi', 'Irepodun/Ifelodun', 'Moba', 'Gbonyin', 'Ekiti East', 'Ekiti South West', 'Ekiti West', 'Emure', 'GRA Ado Ekiti', 'Basiri', 'Ajilosun', 'Adebayo', 'Fajuyi', 'Iyin Road', 'Iworoko', 'Igbara Odo', 'Ise', 'Aramoko', 'Ikogosi'],
  'Bayelsa': ['Yenagoa', 'Ogbia', 'Nembe', 'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Sagbama', 'Southern Ijaw', 'Opolo', 'Swali', 'Kpansia', 'Biogbolo', 'Amarata', 'Agudama', 'Tombia', 'Oxbow Lake', 'Azikoro', 'Etegwe', 'Okaka', 'Ekeki', 'Igbogene', 'Yenizue Gene', 'Elebele', 'Imiringi', 'Oloibiri'],
  'Ebonyi': ['Abakaliki', 'Afikpo', 'Onueke', 'Ezza North', 'Ezza South', 'Ikwo', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha', 'GRA Abakaliki', 'Waterworks Road', 'Presco', 'Kpirikpiri', 'Azuiyiokwu', 'Abaomege', 'Nkwagu', 'Echara', 'Iboko', 'Nkalagu', 'Afikpo North', 'Afikpo South', 'Ishielu'],
  'Kogi': ['Lokoja', 'Okene', 'Kabba', 'Idah', 'Anyigba', 'Ankpa', 'Ajaokuta', 'Bassa', 'Dekina', 'Ibaji', 'Igalamela/Odolu', 'Ijumu', 'Koton Karfe', 'Mopa Muro', 'Ofu', 'Ogori/Magongo', 'Okehi', 'Omala', 'Yagba East', 'Yagba West', 'GRA Lokoja', 'Felele Lokoja', 'Ganaja', 'Adankolo', 'Niger Bridge Area'],
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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [showImageValuation, setShowImageValuation] = useState(false);
  const [autofillTab, setAutofillTab] = useState<'image' | 'text'>('image');
  const [valuationPriceAdvisory, setValuationPriceAdvisory] = useState<{ low: number; high: number; brand: string; model: string } | null>(null);

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
      if (currentCount + files.length > 5) {
        toast({ title: 'Too Many Files', description: `You can upload up to ${5 - currentCount} more photos`, variant: 'destructive' });
        return;
      }
      setRequiredPhotos(prev => [...prev, ...files]);
    }
  };

  const handleAdditionalPhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const currentCount = additionalPhotos.length;
      if (currentCount + files.length > 3) {
        toast({ title: 'Too Many Files', description: `You can upload up to ${3 - currentCount} more photos`, variant: 'destructive' });
        return;
      }
      setAdditionalPhotos(prev => [...prev, ...files]);
    }
  };

  const removeRequiredPhoto = (index: number) => setRequiredPhotos(prev => prev.filter((_, i) => i !== index));
  const removeAdditionalPhoto = (index: number) => setAdditionalPhotos(prev => prev.filter((_, i) => i !== index));

  useEffect(() => {
    const fromValuation = searchParams.get('from') === 'valuation';
    if (fromValuation) {
      try {
        const stored = sessionStorage.getItem('valuation_prefill');
        if (stored) {
          const v = JSON.parse(stored);
          if (v.brand) setBrand(v.brand);
          if (v.model) setModel(v.model);
          if (v.year) setYear(v.year);
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

  /**
   * Checks all images for duplicates and screenshots BEFORE uploading to R2.
   * Returns { ok: false } if any image is rejected, with a user-facing message.
   * Returns { ok: true, hashes } on success so hashes can be saved with the listing.
   */
  const checkImagesForDuplicates = async (
    files: File[]
  ): Promise<{ ok: boolean; hashes?: Array<{ dhash: string; hash_prefix: string }> }> => {
    const hashes: Array<{ dhash: string; hash_prefix: string }> = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Checking image ${i + 1} of ${files.length}...`);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('/api/check-image', { method: 'POST', body: formData });
        const data = await res.json();

        if (!res.ok) {
          // 422 = screenshot or duplicate detected
          toast({
            title: data.screenshot ? 'Screenshot Detected' : 'Duplicate Image',
            description: data.reason || 'Please use original photos of your vehicle.',
            variant: 'destructive',
          });
          return { ok: false };
        }

        hashes.push({ dhash: data.dhash, hash_prefix: data.hash_prefix });
      } catch (err) {
        // Network error calling check-image — don't block the upload, just warn
        console.warn('check-image network error, skipping hash check:', err);
        hashes.push({ dhash: '', hash_prefix: '' });
      }
    }

    return { ok: true, hashes };
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
    if (!user) { triggerAuth(); return; }
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

      // ── Step 1: Hash-check all images BEFORE uploading anything to R2 ──
      const allPhotos = [...requiredPhotos, ...additionalPhotos];
      let imageHashes: Array<{ dhash: string; hash_prefix: string }> = [];

      if (allPhotos.length > 0) {
        const { ok, hashes } = await checkImagesForDuplicates(allPhotos);
        if (!ok) {
          // User already saw the toast — just stop here
          setLoading(false); setUploading(false); setUploadProgress('');
          return;
        }
        imageHashes = hashes || [];
      }

      // ── Step 2: Upload video ──────────────────────────────────────────────
      if (verificationType === 'video') {
        if (videoFile) {
          setUploadProgress('Uploading video...');
          uploadedVideoUrl = await uploadVideo(videoFile) || '';
          if (!uploadedVideoUrl) throw new Error('Failed to upload video');
        } else if (videoUrl.trim()) {
          uploadedVideoUrl = videoUrl.trim();
        }
      }

      // ── Step 3: Upload images to R2 ───────────────────────────────────────
      if (allPhotos.length > 0) {
        setUploadProgress(`Uploading images (0/${allPhotos.length})...`);
        uploadedImageUrls = await uploadImages(allPhotos);
      }

      setUploadProgress('Creating listing...');

      const listingData: any = {
        user_id: user.id,
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
      };

      if (verificationType === 'video' && uploadedVideoUrl) listingData.video_url = uploadedVideoUrl;
      listingData.images = uploadedImageUrls;

      console.log('[handleSubmit] Inserting listing with status:', listingData.status);

      await supabase.from('listings').delete().eq('user_id', user.id).eq('status', 'paused');
      const { data, error } = await supabase.from('listings').insert([listingData]).select().single();
      if (error) throw error;

      // ── Save image hashes (fire-and-forget, doesn't block the user) ───────
      if (data?.id && uploadedImageUrls.length > 0 && imageHashes.length > 0) {
        const hashRows = uploadedImageUrls.map((image_url, i) => ({
          listing_id: data.id,
          image_url,
          dhash: imageHashes[i]?.dhash || '',
          hash_prefix: imageHashes[i]?.hash_prefix || '',
        })).filter(r => r.dhash); // only save rows where we got a hash

        if (hashRows.length > 0) {
          supabase.from('listing_image_hashes').insert(hashRows).then(({ error: hashErr }) => {
            if (hashErr) console.warn('[handleSubmit] Hash save failed (non-critical):', hashErr.message);
          });
        }
      }

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

          {/* ── AI Autofill ── */}
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
                  onParsed={(data: Record<string, any>) => {
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
                  }}
                />
              )}
            </div>
          </div>

          {/* ── 1. Seller Type ── */}
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

          {/* ── 2. Location ── */}
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

          {/* ── 3. Vehicle Details ── */}
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

                {/* ── Accident History — now required ── */}
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

          {/* ── 4. Pricing ── */}
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
                    <p className="text-sm font-semibold text-orange-700 dark:text-orange-400">Urgent Sale</p>
                    <p className="text-xs text-orange-500/80">Attract more buyers</p>
                  </div>
                  <Switch checked={urgentSale} onCheckedChange={setUrgentSale} />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── 5. Media ── */}
          <SectionCard step={5} title="Media Upload" description="Listings with video get 5× more enquiries">
            <div className="space-y-4">
              {/* Toggle */}
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
                  {verificationType !== 'video' && <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">5×</span>}
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

              {verificationType === 'video' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-muted/30 p-4">
                    <p className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4 text-emerald-500" /> Video Recording Guide
                    </p>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-background rounded-xl border border-border p-3">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Before Recording</p>
                        <ul className="text-xs text-foreground space-y-1.5">
                          {['Open hood', 'Open driver side doors', 'Start engine'].map(s => (
                            <li key={s} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-background rounded-xl border border-border p-3">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wide mb-2">Recording Steps</p>
                        <ul className="text-xs text-foreground space-y-1.5">
                          {['Walk around exterior (20s)', 'Show interior (15s)', 'Show engine bay (10s)'].map((s, i) => (
                            <li key={s} className="flex items-start gap-2">
                              <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 mt-0.5">{i + 1}</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs"
                        onClick={() => {
                          navigator.mediaDevices?.getUserMedia({ video: true })
                            .then(stream => {
                              const mediaRecorder = new MediaRecorder(stream);
                              const chunks: Blob[] = [];
                              mediaRecorder.ondataavailable = e => chunks.push(e.data);
                              mediaRecorder.onstop = () => {
                                const blob = new Blob(chunks, { type: 'video/mp4' });
                                const file = new File([blob], 'recorded-video.mp4', { type: 'video/mp4' });
                                if (file.size > 500 * 1024 * 1024) { toast({ title: 'File Too Large', description: 'Video must be less than 500MB', variant: 'destructive' }); return; }
                                setVideoFile(file);
                                setVideoUrl('');
                                setVideoPreviewUrl(URL.createObjectURL(file));
                                stream.getTracks().forEach(t => t.stop());
                              };
                              mediaRecorder.start();
                              setTimeout(() => mediaRecorder.stop(), 60000);
                            })
                            .catch(() => toast({ title: 'Camera Error', description: 'Could not access camera. Use Upload Video instead.', variant: 'destructive' }));
                        }}>
                        Start Recording
                      </Button>
                      <Button type="button" size="sm" variant="outline" className="text-xs" onClick={() => { setVideoUrl(''); videoInputRef?.click(); }}>
                        Upload Video
                      </Button>
                    </div>
                  </div>

                  <Input ref={el => setVideoInputRef(el)} type="file" accept="video/*" className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        if (file.size > 500 * 1024 * 1024) { toast({ title: 'File Too Large', description: 'Video must be less than 500MB', variant: 'destructive' }); return; }
                        setVideoFile(file);
                        setVideoUrl('');
                        setVideoPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                  />

                  {/* Uploaded file preview */}
                  {videoFile && (
                    <div className="flex items-center gap-3 p-3 border border-emerald-200 dark:border-emerald-800 rounded-xl bg-emerald-50 dark:bg-emerald-950/20">
                      {videoPreviewUrl && <video src={videoPreviewUrl} className="w-20 h-14 object-cover rounded-lg border border-border flex-shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{videoFile.name}</p>
                        <p className="text-xs text-muted-foreground">{(videoFile.size / (1024 * 1024)).toFixed(1)} MB · Will upload to R2 on submit</p>
                      </div>
                      <button type="button" onClick={() => { setVideoFile(null); setVideoPreviewUrl(null); }} className="text-red-500 hover:text-red-600 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Divider */}
                  {!videoFile && (
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-border" />
                      <span className="text-xs text-muted-foreground font-medium">or paste a link</span>
                      <div className="flex-1 h-px bg-border" />
                    </div>
                  )}

                  {/* Video URL field */}
                  {!videoFile && (
                    <div>
                      <FieldLabel>YouTube / Google Drive / Video URL</FieldLabel>
                      <Input
                        type="url"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        placeholder="https://youtube.com/..."
                        className="text-sm"
                      />
                      {videoUrl.trim() && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> URL will be saved with your listing
                        </p>
                      )}
                      {/* YouTube thumbnail preview */}
                      {(() => {
                        const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                        if (!ytMatch) return null;
                        return (
                          <div className="mt-2 flex items-center gap-3 p-2 border border-border rounded-xl bg-muted/30">
                            <img
                              src={`https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`}
                              alt="YouTube thumbnail"
                              className="w-20 h-14 object-cover rounded-lg flex-shrink-0"
                            />
                            <div>
                              <p className="text-sm font-semibold text-foreground">YouTube video detected</p>
                              <p className="text-xs text-muted-foreground">Thumbnail loaded — no network call needed</p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Toggle between file and URL */}
                  {videoFile && (
                    <button
                      type="button"
                      onClick={() => { setVideoFile(null); setVideoPreviewUrl(null); }}
                      className="text-xs text-muted-foreground underline hover:text-foreground transition-colors"
                    >
                      Remove file and paste a URL instead
                    </button>
                  )}

                  <p className="text-xs text-muted-foreground">Upload: Max 50MB · MP4, MOV, AVI.</p>

                  {/* Preview photos */}
                  <div>
                    <FieldLabel>Preview Photos (3–5 photos)</FieldLabel>
                    <Input ref={el => setRequiredPhotosInputRef(el)} type="file" accept="image/*" multiple className="hidden" onChange={handleRequiredPhotosChange} />
                    <button type="button" onClick={() => requiredPhotosInputRef?.click()}
                      className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">
                      <Plus className="h-4 w-4" /> Add Photos <span className="text-muted-foreground font-normal">({requiredPhotos.length}/5)</span>
                    </button>
                    {requiredPhotos.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {requiredPhotos.map((file, idx) => (
                          <div key={idx} className="relative flex-shrink-0">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded-xl border border-border" />
                            <button type="button" onClick={() => removeRequiredPhoto(idx)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {verificationType === 'photos' && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-orange-200 dark:border-orange-500/30 bg-orange-50 dark:bg-orange-500/10 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-orange-800 dark:text-orange-300 mb-1">Listings with video receive 5× more buyer messages</p>
                        <p className="text-xs text-orange-700 dark:text-orange-400 mb-3">Video builds trust and increases your chances of selling faster</p>
                        <Button type="button" size="sm" onClick={() => setVerificationType('video')} className="bg-orange-500 hover:bg-orange-600 text-white text-xs">
                          Upgrade to Video
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <FieldLabel required>5 Required Photos</FieldLabel>
                    <p className="text-xs text-muted-foreground mb-2">Front · Side · Rear · Interior · Engine</p>
                    <Input ref={el => setRequiredPhotosInputRef(el)} type="file" accept="image/*" multiple required={verificationType === 'photos'} className="hidden" onChange={handleRequiredPhotosChange} />
                    <button type="button" onClick={() => requiredPhotosInputRef?.click()}
                      className="flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400 border border-dashed border-emerald-300 dark:border-emerald-700 rounded-xl px-4 py-2.5 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors">
                      <Plus className="h-4 w-4" /> Add Photos <span className="text-muted-foreground font-normal">({requiredPhotos.length}/5)</span>
                    </button>
                    {requiredPhotos.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {requiredPhotos.map((file, idx) => (
                          <div key={idx} className="relative flex-shrink-0">
                            <img src={URL.createObjectURL(file)} alt={`Preview ${idx + 1}`} className="w-20 h-20 object-cover rounded-xl border border-border" />
                            <button type="button" onClick={() => removeRequiredPhoto(idx)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <FieldLabel>Additional Photos (Optional)</FieldLabel>
                    <Input ref={el => setAdditionalPhotosInputRef(el)} type="file" accept="image/*" multiple className="hidden" onChange={handleAdditionalPhotosChange} />
                    <button type="button" onClick={() => additionalPhotosInputRef?.click()}
                      className="flex items-center gap-2 text-sm font-semibold text-muted-foreground border border-dashed border-border rounded-xl px-4 py-2.5 hover:bg-muted transition-colors">
                      <Plus className="h-4 w-4" /> Add More <span className="font-normal">({additionalPhotos.length}/3)</span>
                    </button>
                    {additionalPhotos.length > 0 && (
                      <div className="flex gap-2 mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {additionalPhotos.map((file, idx) => (
                          <div key={idx} className="relative flex-shrink-0">
                            <img src={URL.createObjectURL(file)} alt={`Additional ${idx + 1}`} className="w-20 h-20 object-cover rounded-xl border border-border" />
                            <button type="button" onClick={() => removeAdditionalPhoto(idx)} className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600">
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* ── 6. Features ── */}
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

          {/* ── 7. Condition FAQ ── */}
          <SectionCard step={7} title="Vehicle Condition" description="Be honest — buyers appreciate transparency">
            <div className="space-y-5">
              {[
                { label: 'Does the vehicle have AC and does it work?', value: acWorking, onChange: setAcWorking, showIssue: acWorking === 'no', issueValue: acIssue, onIssueChange: setAcIssue, issuePlaceholder: 'Describe the AC issue...' },
                { label: 'Is the engine in good condition?', value: engineCondition, onChange: setEngineCondition, showIssue: engineCondition === 'no', issueValue: engineIssue, onIssueChange: setEngineIssue, issuePlaceholder: 'Describe the engine issue...' },
                { label: 'Has the vehicle been repainted?', value: wasRepainted, onChange: setWasRepainted },
                { label: 'Are all vehicle documents complete?', value: documentsComplete, onChange: setDocumentsComplete, showIssue: documentsComplete === 'no', issueValue: missingDocs, onIssueChange: setMissingDocs, issuePlaceholder: 'List missing documents...' },
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

          {/* ── 8. Description ── */}
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

          {/* Upload progress */}
          {uploading && uploadProgress && (
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30">
              <Loader2 className="h-4 w-4 animate-spin text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{uploadProgress}</p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 pt-1">
            <Button type="button" variant="outline" size="lg" onClick={handleSaveDraft} disabled={loading} className="font-semibold">
              Save Draft
            </Button>
            <Button type="submit" size="lg" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold" disabled={loading || uploading}>
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