import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, AlertTriangle } from 'lucide-react';
import ImportDutyIndiaClientHI from './client';
import { alternatesFor } from '@/lib/hreflang';

const PATH = '/upkaran/car-aayat-shulk-calculator-bharat';
const URL = 'https://www.naira.autos' + PATH;

export const metadata: Metadata = {
  title: 'भारत कार आयात शुल्क कैलकुलेटर 2026 — BCD, AIDC और IGST | Naira Autos',
  description: 'भारत में कार आयात का शुल्क मुफ़्त में निकालें। बजट 2025 और GST 2.0 के बाद नई और पुरानी कारों पर BCD, AIDC और IGST का पूरा ब्योरा, UK CETA कोटा और पुरानी कार के 3 साल के नियम के साथ। अक्टूबर 2026 तक अपडेटेड।',
  alternates: alternatesFor(PATH),
  openGraph: {
    title: 'भारत कार आयात शुल्क कैलकुलेटर | Naira Autos',
    description: 'भारत में कार आयात की BCD, AIDC, IGST और कुल लैंडेड लागत का अनुमान लगाएं — नई CBU या पुरानी।',
    url: URL, siteName: 'Naira Autos', locale: 'hi_IN', type: 'website',
  },
  keywords: [
    'भारत कार आयात शुल्क कैलकुलेटर', 'विदेश से कार मंगाने पर कितना टैक्स', 'इम्पोर्टेड कार पर कस्टम ड्यूटी',
    'BCD AIDC IGST कार', 'पुरानी कार आयात शुल्क भारत', 'ट्रांसफर ऑफ रेजिडेंस कार आयात', 'UK कार कोटा CETA',
  ],
};

const FAQ = [
  { q: 'भारत में 2026 में कार पर आयात शुल्क कितना है?', a: 'US$40,000 CIF से ऊपर की, या 3,000 cc पेट्रोल / 2,500 cc डीज़ल से बड़े इंजन वाली नई कार पर 70% BCD और 40% AIDC लगता है, यानी निर्धारणीय मूल्य का लगभग 110%, IGST से पहले। बड़ी कार पर IGST 40% है, जो मूल्य और इन शुल्कों के जोड़ पर लगता है। बड़ी SUV पर कुल बोझ आमतौर पर निर्धारणीय मूल्य के लगभग 190% के आसपास बैठता है।' },
  { q: 'बजट 2025 में आयातित कारों के लिए क्या बदला?', a: '2 फरवरी 2025 से शीर्ष श्रेणी पर BCD 125% (या 100%) से घटाकर 70% किया गया, 10% सोशल वेलफेयर सरचार्ज से छूट दी गई और 40% कृषि अवसंरचना एवं विकास उपकर (AIDC) जोड़ा गया। नई लग्ज़री कारों पर BCD घटा, लेकिन प्रभावी सीमा शुल्क लगभग 110% ही रहा। सेकंड-हैंड कारें 70% BCD और 67.5% AIDC पर आ गईं, यानी लगभग 137.5%।' },
  { q: 'GST 2.0 के बाद आयातित कार पर कौन सा GST लगता है?', a: '22 सितंबर 2025 से कारों पर GST मुआवज़ा उपकर नहीं है। 1,200 cc तक की पेट्रोल या पेट्रोल-हाइब्रिड और 1,500 cc तक की डीज़ल कार, जिसकी लंबाई 4 मीटर से कम हो, पर IGST 18% है; बड़ी कारों और SUV पर 40%; और इलेक्ट्रिक वाहनों पर 5%। IGST निर्धारणीय मूल्य के साथ BCD और AIDC जोड़कर लगता है। कई पुराने ब्लॉग अब भी 28% और उपकर बताते हैं, जो पुराना है।' },
  { q: 'क्या मैं भारत में पुरानी कार आयात कर सकता हूँ?', a: 'पुरानी कारों पर सख्त पाबंदियाँ हैं। वे आमतौर पर निर्माण की तारीख से 3 साल से ज़्यादा पुरानी नहीं होनी चाहिए, राइट-हैंड ड्राइव और किलोमीटर वाले स्पीडोमीटर के साथ हों, और भारतीय मोटर वाहन नियमों का पालन करें। स्थायी रूप से लौटने वाले व्यक्ति (ट्रांसफर ऑफ रेजिडेंस) विशेष शर्तों पर एक कार ला सकते हैं, जिनमें 2 साल तक बिक्री पर रोक शामिल है, पर पूरा सीमा शुल्क फिर भी लगता है। भेजने से पहले DGFT की मौजूदा नीति देखें।' },
  { q: 'क्या ब्रिटेन में बनी कारों पर शुल्क कम है?', a: 'भारत–ब्रिटेन CETA 15 जुलाई 2026 से लागू है। UK मूल की कारों को रियायती शुल्क केवल वार्षिक टैरिफ-रेट कोटा के भीतर मिलता है, जिसके लिए DGFT से आवेदन करना होता है। पहले साल 3,000 cc से बड़ी पेट्रोल और 2,500 cc से बड़ी डीज़ल कारों पर कोटा के भीतर शुल्क लगभग 110% से घटकर 30% होता है, और समय के साथ 10% की ओर जाता है। कोटा से ऊपर के आयात पर सामान्य दर लगती है। सितंबर 2026 के पहले आवंटन में केवल 642 कारें मंज़ूर हुईं।' },
  { q: 'भारत–EU व्यापार समझौते का क्या?', a: 'जनवरी 2026 में घोषित समझौते के तहत लगभग €15,000 से ऊपर की EU-निर्मित कारों पर शुरू में शुल्क लगभग 40% होगा और वार्षिक कोटा के तहत 10% की ओर घटेगा। यह कैलकुलेटर इसे मॉडल नहीं करता, क्योंकि इसके लागू होने की पुष्टि नहीं हुई है।' },
  { q: 'क्या 1% लैंडिंग चार्ज अब भी जुड़ता है?', a: 'कई सीमा शुल्क आकलनों में CIF में अब भी 1% लैंडिंग चार्ज जोड़ा जाता है, लेकिन स्रोत इस पर एकमत नहीं हैं कि यह सभी आयात पर लागू है या नहीं। कैलकुलेटर में एक टॉगल है, ताकि आपका कस्टम ब्रोकर मना करे तो आप इसे बंद कर सकें।' },
];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage', '@id': URL,
      name: 'भारत कार आयात शुल्क कैलकुलेटर — BCD, AIDC और IGST',
      description: 'भारत में नई और पुरानी कारों के आयात पर BCD, AIDC और IGST निकालने वाला मुफ़्त कैलकुलेटर।',
      url: URL, inLanguage: 'hi', dateModified: '2026-10-03',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Joshua Victor', jobTitle: 'Founder', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'होम', item: 'https://www.naira.autos/hom' },
          { '@type': 'ListItem', position: 2, name: 'उपकरण', item: 'https://www.naira.autos/upkaran' },
          { '@type': 'ListItem', position: 3, name: 'भारत कार आयात शुल्क कैलकुलेटर', item: URL },
        ],
      },
    },
    {
      '@type': 'FAQPage', inLanguage: 'hi',
      mainEntity: FAQ.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'SoftwareApplication', name: 'भारत कार आयात शुल्क कैलकुलेटर', inLanguage: 'hi',
      applicationCategory: 'FinanceApplication', operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    },
  ],
};

const heading = { fontFamily: "'Barlow Condensed', Impact, sans-serif" } as const;

export default function ImportDutyCalculatorIndiaHIPage() {
  return (
    <div lang="hi">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <Link prefetch={false} href="/upkaran" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-emerald-500/20 border border-white/15 hover:border-emerald-500/40 text-white/60 hover:text-emerald-400 transition-all" aria-label="वापस">
              <ArrowRight className="h-4 w-4" />
            </Link>
            <nav aria-label="ब्रेडक्रम्ब" className="flex items-center gap-1.5 text-xs text-white/30 flex-wrap">
              <Link prefetch={false} href="/hom" className="hover:text-white/60 transition-colors">होम</Link>
              <ChevronLeft className="h-3 w-3" />
              <Link prefetch={false} href="/upkaran" className="hover:text-white/60 transition-colors">उपकरण</Link>
              <ChevronLeft className="h-3 w-3" />
              <span className="text-white/50">🇮🇳 भारत कार आयात शुल्क कैलकुलेटर</span>
            </nav>
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-xs font-bold text-white bg-emerald-500 px-3 py-1 rounded-full">100% मुफ़्त</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">दरें: बजट 2025 + GST 2.0</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">अंतिम जाँच: अक्टूबर 2026</span>
            </div>
            <h1 className="font-black text-white leading-tight tracking-tight mb-3" style={{ ...heading, fontSize: 'clamp(30px, 5vw, 54px)' }}>
              भारत कार आयात <span className="text-emerald-400">शुल्क कैलकुलेटर</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">भारत में कार मंगाने की असली लागत क्या होगी?</p>
            <p className="text-white/75 text-sm leading-relaxed">
              कार की कीमत, इंजन और आकार डालें और BCD, AIDC, IGST व शुल्क सहित लैंडेड लागत पाएं — नई या पुरानी कार के लिए, UK CETA कोटा के साथ।
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-500/10 border-b border-amber-200 dark:border-amber-500/20">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 dark:text-amber-200/80 leading-relaxed">
            <strong className="text-amber-900 dark:text-amber-300">केवल अनुमान।</strong> भारतीय सीमा शुल्क बिल ऑफ एंट्री पर CBIC की विनिमय दर से आकलन करता है। यहाँ की कुछ दरों (US$40,000 तक की 60% श्रेणी, EV श्रेणियाँ और 1% लैंडिंग चार्ज) की पुष्टि कस्टम ब्रोकर से ज़रूर कर लें।
          </p>
        </div>
      </div>

      <ImportDutyIndiaClientHI />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div>
            <h2 className="text-2xl font-black text-foreground mb-2" style={heading}>भारत में कार आयात शुल्क की दरें (2026)</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              शुल्क एक तय क्रम में जुड़ते हैं: BCD और AIDC निर्धारणीय मूल्य पर लगते हैं, फिर IGST मूल्य और इन शुल्कों के जोड़ पर। हेडिंग 8703 की यात्री कारों पर अब सोशल वेलफेयर सरचार्ज नहीं लगता।
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'BCD', rate: '60–70%', base: 'श्रेणी के अनुसार, निर्धारणीय मूल्य पर' },
                { label: 'AIDC', rate: '40–67.5%', base: 'शीर्ष श्रेणी की नई और पुरानी कारें' },
                { label: 'IGST', rate: '5 / 18 / 40%', base: 'मूल्य + BCD + AIDC पर' },
                { label: 'उपकर', rate: 'शून्य', base: 'मुआवज़ा उपकर 22 सितंबर 2025 से खत्म' },
              ].map(({ label, rate, base }) => (
                <div key={label} className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 border border-emerald-200 dark:border-emerald-500/20">
                  <p className="text-xs text-muted-foreground mb-1">{label}</p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400" style={heading}>{rate}</p>
                  <p className="text-xs text-muted-foreground mt-1">{base}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>उदाहरण: बड़ी पेट्रोल SUV</h2>
                <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                  <p>मान लें एक नई 2.0-लीटर पेट्रोल SUV है, US$40,000 से ऊपर, जिसका निर्धारणीय मूल्य ₹50,00,000 है (सरलता के लिए लैंडिंग चार्ज बंद)।</p>
                  <p>70% BCD ₹35,00,000 और 40% AIDC ₹20,00,000 बनता है। 40% IGST ₹1,05,00,000 (मूल्य + BCD + AIDC) पर लगता है, यानी ₹42,00,000। कुल शुल्क व कर ₹97,00,000 हुआ, इसलिए शुल्क सहित लैंडेड लागत ₹1,47,00,000 है — निर्धारणीय मूल्य पर प्रभावी दर 194%।</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>नई बनाम पुरानी कार</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">नई:</strong> भारत के बाहर बनी, अपंजीकृत और निर्माता देश से आयातित होनी चाहिए। शीर्ष श्रेणी में 70% BCD और 40% AIDC है; US$40,000 तक की छोटे इंजन वाली कारें निचली श्रेणी में आती हैं।</p>
                  <p><strong className="text-foreground">पुरानी:</strong> 70% BCD और 67.5% AIDC (लगभग 137.5%), 3 साल से ज़्यादा पुरानी नहीं, राइट-हैंड ड्राइव। ट्रांसफर ऑफ रेजिडेंस के लिए 2 साल विदेश में रहना, आगमन के 6 महीने के भीतर आयात और 2 साल तक बिक्री पर रोक ज़रूरी है।</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>चरण-दर-चरण: भारत में कार आयात</h2>
                <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>पात्रता जाँचें: राइट-हैंड ड्राइव, पुरानी कार की आयु सीमा, और भारतीय मोटर वाहन नियमों के तहत होमोलोगेशन।</li>
                  <li>आयात-निर्यात कोड (IEC) लें और UK मूल की कारों के लिए CETA के तहत DGFT से कोटा आवंटन लें।</li>
                  <li>अधिकृत बंदरगाह पर भेजें और कस्टम ब्रोकर के ज़रिए बिल ऑफ एंट्री दाखिल करें।</li>
                  <li>सीमा शुल्क CIF मूल्य आँकता है, BCD, AIDC और IGST लगाता है, और रिलीज़ से पहले भुगतान करना होता है।</li>
                  <li>कार को स्थानीय RTO में पंजीकृत करें और राज्य का रोड टैक्स चुकाएं।</li>
                </ol>
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>कैलकुलेटर में क्या शामिल नहीं है</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">राज्य का रोड टैक्स बहुत अलग-अलग होता है, इसलिए वह वैकल्पिक मैन्युअल इनपुट है। एंटी-डंपिंग या अन्य विशेष शुल्क, भारत–EU समझौता और UK के पहले साल के बाद की कोटा दरें मॉडल नहीं की गई हैं। मूल्य-निर्धारण विवाद में आकलित मूल्य बिल से ऊपर जा सकता है।</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>भारतीय सीमा शुल्क कार पर शुल्क कैसे निकालता है</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>सीमा शुल्क सबसे पहले निर्धारणीय मूल्य निकालता है, यानी CIF मूल्य: कार की कीमत के साथ भारतीय बंदरगाह तक का माल भाड़ा और बीमा। अगर आपके पास सिर्फ़ FOB कीमत है तो सीमा शुल्क भाड़ा और बीमा खुद जोड़ता है, और असली आंकड़े न होने पर अनुमानित शुल्क लगाता है। कई आकलनों में 1% लैंडिंग चार्ज भी जुड़ता है, हालांकि स्रोत इस पर एकमत नहीं हैं कि यह हर मामले में लगता है या नहीं, इसलिए कैलकुलेटर में इसे बंद करने का विकल्प है।</p>
                  <p>मूल सीमा शुल्क (BCD) निर्धारणीय मूल्य पर लगता है। 2025 के बजट में शीर्ष श्रेणी की कारों के लिए लाया गया कृषि अवसंरचना एवं विकास उपकर (AIDC) उसी आधार पर लगता है। उसके बाद ही IGST निकलता है, निर्धारणीय मूल्य, BCD और AIDC के जोड़ पर। चूँकि कर पर भी कर लगता है, इसलिए एक बड़ी SUV पर कुल शुल्क उसके निर्धारणीय मूल्य के लगभग दोगुने तक पहुँच सकता है।</p>
                  <p>सोशल वेलफेयर सरचार्ज पहले शुल्क का 10% जोड़ता था, पर हेडिंग 8703 की यात्री कारों पर अब उसे छूट है, और GST मुआवज़ा उपकर 22 सितंबर 2025 को खत्म हो गया। इसीलिए इस कैलकुलेटर में सिर्फ़ तीन पंक्तियाँ हैं: BCD, AIDC और IGST।</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>GST 2.0: आपकी कार किस IGST स्लैब में आती है?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>22 सितंबर 2025 से भारत ने पुराने 28% और उपकर की जगह सरल स्लैब लागू किए। 1,200 cc तक की पेट्रोल या पेट्रोल-हाइब्रिड कारों और 1,500 cc तक की डीज़ल कारों पर, जिनकी लंबाई 4 मीटर से कम हो, 18% लगता है। बड़ी कारों और SUV पर 40% लगता है। इलेक्ट्रिक वाहनों पर 5% है।</p>
                  <p>18% स्लैब के लिए इंजन और लंबाई, दोनों शर्तें पूरी होनी चाहिए, इसलिए 4 मीटर से लंबी 1,000 cc की कार पर भी 40% लगेगा। 28% और 22% तक उपकर बताने वाले पुराने लेखों से सावधान रहें; वे सुधार से पहले की व्यवस्था बताते हैं।</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>ब्रिटेन या EU से कार मंगाना</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>भारत–ब्रिटेन व्यापक आर्थिक एवं व्यापार समझौता (CETA) 15 जुलाई 2026 से लागू है। UK मूल की कारों के लिए यह टैरिफ-रेट कोटा बनाता है: कोटा के भीतर 3,000 cc से बड़ी पेट्रोल या 2,500 cc से बड़ी डीज़ल कार पर पहले साल लगभग 110% की जगह करीब 30% सीमा शुल्क लगता है, जो समय के साथ 10% की ओर जाता है। कोटा से ऊपर के आयात पर सामान्य दर लगती है, और कोटा के लिए DGFT से आवेदन करना पड़ता है।</p>
                  <p>सितंबर 2026 में घोषित पहले आवंटन में बहुत कम कारें मंज़ूर हुईं, इसलिए रियायती दर को दुर्लभ मानें। जनवरी 2026 में घोषित यूरोपीय संघ के समझौते में भी ऐसा ही कोटा ढांचा दिखता है, पर उसके लागू होने की पुष्टि नहीं हुई, इसलिए उसे यहाँ मॉडल नहीं किया गया।</p>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-foreground mb-3" style={heading}>इन आम गलतियों से बचें</h2>
                <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc list-inside">
                  <li>28% GST और उपकर दिखाने वाले ब्लॉग पर भरोसा करना। सुधार ने हर कार के मुख्य आंकड़े बदल दिए।</li>
                  <li>US$40,000 की सीमा को नज़रअंदाज़ करना। उसे पार करने पर नई कार 70% BCD और 40% AIDC की श्रेणी में चली जाती है।</li>
                  <li>यह मान लेना कि कोई भी पुरानी कार आयात हो सकती है। पुरानी कारों पर उम्र और राइट-हैंड ड्राइव जैसी कड़ी शर्तें हैं।</li>
                  <li>भूल जाना कि IGST शुल्क पर भी लगता है, केवल कार की कीमत पर नहीं।</li>
                  <li>बंदरगाह शुल्क, क्लीयरिंग एजेंट फीस, होमोलोगेशन और राज्य के रोड टैक्स को बजट से बाहर रखना।</li>
                  <li>DGFT आवंटन के बिना कोटा दर की उम्मीद करना।</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-black text-foreground mb-4" style={heading}>अक्सर पूछे जाने वाले प्रश्न</h2>
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
            समीक्षक: <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Joshua Victor</Link>, संस्थापक। स्रोत: केंद्रीय बजट 2025 की सीमा शुल्क अधिसूचनाएँ, CBIC की GST 2.0 अधिसूचनाएँ, भारत–UK CETA पर DGFT की सूचनाएँ। अंतिम जाँच: अक्टूबर 2026।
          </p>
        </div>
      </div>
    </div>
  );
}
