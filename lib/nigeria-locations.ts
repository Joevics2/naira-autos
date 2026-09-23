// lib/nigeria-locations.ts
// Shared Nigerian state -> city/area list. Previously duplicated inline across
// _search, _listing/edit, and _add-listing — consolidated here for reuse.

export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
  'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
  'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe',
  'Zamfara', 'FCT'
];

export const CITIES_BY_STATE: Record<string, string[]> = {
  'Abia': [
    'Aba North', 'Aba South', 'Umuahia', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa',
    'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma Ngwa', 'Ugwunagbo', 'Ukwa East', 'Ukwa West',
    'Umu Nneochi', 'Ariaria Market', 'Ogbor Hill'
  ],

  'Adamawa': [
    'Yola North', 'Yola South', 'Jimeta', 'Demsa', 'Fufore', 'Ganye', 'Girei', 'Gombi',
    'Guyuk', 'Hong', 'Jada', 'Lamurde', 'Madagali', 'Maiha', 'Mayo-Belwa', 'Michika',
    'Mubi North', 'Mubi South', 'Numan', 'Shelleng', 'Song', 'Toungo', 'High Level Jimeta'
  ],

  'Akwa Ibom': [
    'Uyo', 'Ikot Ekpene', 'Eket', 'Oron', 'Abak', 'Etinan', 'Itu', 'Ibeno', 'Ibesikpo Asutan',
    'Ibiono Ibom', 'Ikono', 'Ikot Abasi', 'Mkpat Enin', 'Nsit Atai', 'Nsit Ibom', 'Nsit Ubium',
    'Oruk Anam', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Eastern Obolo'
  ],

  'Anambra': [
    'Awka', 'Onitsha', 'Nnewi', 'Ekwulobia', 'Idemili North', 'Idemili South', 'Aguata',
    'Anaocha', 'Dunukofia', 'Ekwusigo', 'Ihiala', 'Njikoka', 'Oyi', 'Obosi'
  ],

  'Bauchi': [
    'Bauchi', 'Azare', 'Alkaleri', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa',
    'Ganjuwa', 'Giade', 'Itas/Gadau', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 'Toro', 'Warji'
  ],

  'Bayelsa': [
    'Yenagoa', 'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama',
    'Southern Ijaw', 'Opolo', 'Swali', 'Kpansia', 'Biogbolo', 'Amarata', 'Agudama'
  ],

  'Benue': [
    'Makurdi', 'Gboko', 'Katsina-Ala', 'Otukpo', 'Agatu', 'Apa', 'Buruku', 'Guma',
    'Gwer East', 'Gwer West', 'Konshisha', 'Kwande', 'Logo', 'Obi', 'Oju', 'Okpokwu',
    'Tarka', 'Ushongo', 'Vandeikya', 'High Level Makurdi', 'Wurukum'
  ],

  'Borno': [
    'Maiduguri', 'Biu', 'Bama', 'Dikwa', 'Gwoza', 'Konduga', 'Damboa', 'Chibok',
    'Hawul', 'Kukawa', 'Monguno', 'Marte', 'Askira/Uba', 'Gubio', 'Jere', 'Kaga',
    'Gamboru Road', 'Bulumkutu'
  ],

  'Cross River': [
    'Calabar', 'Calabar South', 'Calabar Municipal', 'Ikom', 'Ogoja', 'Akamkpa',
    'Biase', 'Boki', 'Obubra', 'Obudu', 'Odukpani', 'Yakuur', 'Yala'
  ],

  'Delta': [
    'Asaba', 'Warri', 'Sapele', 'Ughelli', 'Effurun', 'Uvwie', 'Agbor', 'Okpe',
    'Oshimili North', 'Oshimili South', 'Ethiope East', 'Ethiope West', 'Ndokwa East',
    'Ndokwa West', 'Ika South', 'Udu', 'Patani'
  ],

  'Ebonyi': [
    'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South',
    'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha', 'GRA Abakaliki'
  ],

  'Edo': [
    'Benin City', 'Auchi', 'Ekpoma', 'Uromi', 'Egor', 'Ikpoba-Okha', 'Oredo',
    'Orhionmwon', 'Uhunmwonde', 'Esan Central', 'Irrua', 'Uselu', 'GRA Benin City'
  ],

  'Ekiti': [
    'Ado Ekiti', 'Ikere', 'Ikole', 'Ilawe', 'Ijero', 'Ido-Osi', 'Irepodun/Ifelodun',
    'Ise/Orun', 'Moba', 'Omuo', 'Oye', 'Efon', 'Emure', 'GRA Ado Ekiti', 'Aramoko'
  ],

  'Enugu': [
    'Enugu', 'Nsukka', 'Agbani', 'Oji River', 'Udi', 'Awgu', 'Enugu North', 'Enugu South',
    'Enugu East', 'GRA Enugu', 'New Haven', 'Independence Layout', 'Abakpa', 'Emene'
  ],

  'Gombe': [
    'Gombe', 'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Kaltungo', 'Kwami',
    'Nafada', 'Shomgom', 'Yamaltu/Deba', 'Pantami', 'GRA Gombe'
  ],

  'Imo': [
    'Owerri', 'Orlu', 'Okigwe', 'Oguta', 'Ikeduru', 'Mbaitoli', 'Aboh-Mbaise',
    'Ehime-Mbano', 'Isu', 'Ngor-Okpala', 'Njaba', 'Nkwerre', 'Obowo', 'Ohaji/Egbema',
    'Isiala Mbano'
  ],

  'Jigawa': [
    'Dutse', 'Gumel', 'Hadejia', 'Kazaure', 'Ringim', 'Auyo', 'Babura', 'Gwaram',
    'Gwiwa', 'Jahun', 'Kafin Hausa', 'Kaugama', 'Maigatari', 'Malam Madori', 'Biriniwa'
  ],

  'Kaduna': [
    'Kaduna North', 'Kaduna South', 'Chikun', 'Igabi', 'Zaria', 'Tudun Wada', 'Makera',
    'Barnawa', 'Rigasa', 'Kakuri', 'Sabon Tasha', 'Kawo', 'Birnin-Gwari'
  ],

  'Kano': [
    'Kano Municipal', 'Fagge', 'Dala', 'Tarauni', 'Ungogo', 'Gwale', 'Nassarawa',
    'Kumbotso', 'Gwarzo', 'Bichi', 'Wudil', 'Rano', 'Gaya', 'Dawakin Kudu', 'Kura',
    'Kano New Layout'
  ],

  'Katsina': [
    'Katsina', 'Daura', 'Funtua', 'Malumfashi', 'Danja', 'Dutsin-Ma', 'Kankia',
    'Kankara', 'Bakori', 'Batagarawa', 'Batsari', 'Charanchi', 'Dandume', 'Jibia',
    'Kafur', 'Kusada', 'Mani', 'Mashi', 'Musawa'
  ],

  'Kebbi': [
    'Birnin Kebbi', 'Argungu', 'Zuru', 'Jega', 'Aleiro', 'Augie', 'Bagudo', 'Bunza',
    'Dandi', 'Gwandu', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Yauri'
  ],

  'Kogi': [
    'Lokoja', 'Okene', 'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Idah',
    'Igalamela-Odolu', 'Ijumu', 'Kabba/Bunu', 'Koton Karfe', 'Ofu', 'Okehi',
    'Omala', 'Yagba East', 'Yagba West', 'Ganaja'
  ],

  'Kwara': [
    'Ilorin East', 'Ilorin South', 'Ilorin West', 'Asa', 'Baruten', 'Edu', 'Ifelodun-Kwara',
    'Irepodun-Kwara', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke-Ero', 'Oyun', 'Pategi'
  ],

  'Lagos': [
    'Ikeja', 'Victoria Island', 'Lekki', 'Ikoyi', 'Surulere', 'Yaba', 'Ajah', 'Festac',
    'Apapa', 'Oshodi', 'Ikorodu', 'Mushin', 'Gbagada', 'Magodo', 'Maryland', 'Ogba',
    'Ojodu', 'Ojota', 'Shomolu', 'Bariga', 'Kosofe', 'Alimosho', 'Agege', 'Ifako-Ijaiye',
    'Ojo', 'Amuwo-Odofin', 'Egbe/Idimu', 'Ikotun/Igando', 'Abule Egba', 'Ipaja',
    'Ilupeju', 'Ogudu', 'Orile', 'Lagos Island', 'Epe', 'Badagry', 'Eko Atlantic'
  ],

  'Nasarawa': [
    'Lafia', 'Keffi', 'Akwanga', 'Karu', 'Nasarawa', 'Nasarawa-Eggon', 'Awe', 'Doma',
    'Keana', 'Kokona', 'Obi', 'Toto', 'Wamba', 'Mararaba', 'Masaka', 'GRA Lafia'
  ],

  'Niger': [
    'Minna', 'Bida', 'Suleja', 'Kontagora', 'Lapai', 'Agaie', 'Agwara', 'Borgu',
    'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 'Katcha', 'Lavun', 'Magama',
    'Mariga', 'Mashegu', 'Mokwa', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Tafa'
  ],

  'Ogun': [
    'Abeokuta', 'Sagamu', 'Ijebu-Ode', 'Ota', 'Ilaro', 'Abeokuta South', 'Abeokuta North',
    'Ado-Odo/Ota', 'Obafemi-Owode', 'Ifo', 'Ikenne', 'Odeda', 'Odogbolu', 'Remo North',
    'Ipokia', 'Ewekoro'
  ],

  'Ondo': [
    'Akure', 'Ondo', 'Owo', 'Okitipupa', 'Ikare Akoko', 'Idanre', 'Ifedore', 'Ilaje',
    'Ile-Oluji-Okeigbo', 'Irele', 'Odigbo', 'Ose', 'Ese-Odo'
  ],

  'Osun': [
    'Osogbo', 'Ile-Ife', 'Ilesa', 'Ede', 'Iwo', 'Ikirun', 'Ila', 'Ejigbo', 'Ijebu-Jesa',
    'Atakumosa East', 'Atakumosa West', 'Boripe', 'Ifelodun-Osun', 'Irepodun-Osun',
    'Irewole', 'Isokan', 'Obokun', 'Oriade'
  ],

  'Oyo': [
    'Ibadan', 'Ogbomoso', 'Oyo', 'Iseyin', 'Saki', 'Eruwa', 'Egbeda', 'Akinyele',
    'Oluyole', 'Lagelu', 'Ona-Ara', 'Afijio', 'Atiba', 'Ogbomosho North', 'Ogbomosho South'
  ],

  'Plateau': [
    'Jos', 'Jos North', 'Jos South', 'Barkin Ladi', 'Bokkos', 'Kanam', 'Kanke',
    'Langtang North', 'Langtang South', 'Mangu', 'Pankshin', 'Riyom', 'Shendam',
    'Bukuru', 'Rayfield', 'GRA Jos'
  ],

  'Rivers': [
    'Port Harcourt', 'Obio-Akpor', 'Eleme', 'Oyigbo', 'Okrika', 'Bonny', 'Ikwerre',
    'Emohua', 'Etche', 'Gokana', 'Khana', 'Tai', 'Asari-Toru', 'Degema', 'Ogu/Bolo'
  ],

  'Sokoto': [
    'Sokoto North', 'Sokoto South', 'Illela', 'Wamako', 'Binji', 'Bodinga', 'Dange-Shuni',
    'Gada', 'Goronyo', 'Gwadabawa', 'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni',
    'Tambuwal', 'Wurno'
  ],

  'Taraba': [
    'Jalingo', 'Wukari', 'Takum', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi',
    'Karim-Lamido', 'Kurmi', 'Lau', 'Sardauna', 'Ussa', 'Yorro', 'Zing'
  ],

  'Yobe': [
    'Damaturu', 'Potiskum', 'Nguru', 'Bade', 'Fika', 'Fune', 'Geidam', 'Gujba',
    'Gulani', 'Jakusko', 'Machina', 'Nangere', 'Yunusari'
  ],

  'Zamfara': [
    'Gusau', 'Anka', 'Bakura', 'Birnin Magaji', 'Bukkuyum', 'Bungudu', 'Gummi',
    'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Tsafe', 'Zurmi'
  ],

  'Abuja FCT': [
    'Central Business District', 'Maitama', 'Wuse', 'Wuse 2', 'Garki', 'Gwarinpa',
    'Kubwa', 'Lugbe', 'Asokoro', 'Utako', 'Jabi', 'Jahi', 'Lokogoma', 'Kuje',
    'Gwagwalada', 'Bwari', 'Karshi', 'Nyanya', 'Mararaba', 'Airport Road', 'Mabushi',
    'Katampe', 'Gudu', 'Guzape', 'Dutse-Alhaji', 'Karu'
  ]
};

export function getAreasForState(state?: string | null): string[] {
  if (!state) return [];
  return CITIES_BY_STATE[state] || [];
}
