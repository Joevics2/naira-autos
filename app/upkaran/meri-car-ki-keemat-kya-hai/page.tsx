import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { MeriCarKiKeematKyaHaiClient } from './client';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'मेरी कार की कीमत क्या है? मुफ़्त AI कार मूल्यांकन | Naira Autos',
  description: 'अपनी कार का मुफ़्त AI मूल्यांकन कराएं, अपनी मुद्रा में। एक फोटो अपलोड करें और सेकंडों में अनुमानित बाज़ार मूल्य पाएं।',
  keywords: 'मेरी कार की कीमत क्या है, मुफ़्त कार मूल्यांकन, पुरानी कार की कीमत, AI से कार की कीमत जानें, कार वैल्यूएशन',
  openGraph: {
    title: 'मेरी कार की कीमत क्या है? मुफ़्त AI कार मूल्यांकन',
    description: 'अपनी कार का AI मूल्यांकन कराएं, अपनी मुद्रा में। एक फोटो अपलोड करें, तुरंत कीमत का अनुमान पाएं — पूरी तरह मुफ़्त।',
    url: 'https://www.naira.autos/upkaran/meri-car-ki-keemat-kya-hai',
    siteName: 'Naira Autos',
    locale: 'hi_IN',
    type: 'website',
  },
  alternates: alternatesFor('/upkaran/meri-car-ki-keemat-kya-hai'),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'मेरी कार की कीमत क्या है? मुफ़्त AI कार मूल्यांकन',
  description: 'कार मूल्यांकन के लिए मुफ़्त AI टूल। अपनी मुद्रा में तुरंत अनुमान पाएं, अपने देश के बाज़ार के अनुसार।',
  url: 'https://www.naira.autos/upkaran/meri-car-ki-keemat-kya-hai',
  inLanguage: 'hi',
  dateModified: '2026-10-04',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'AI कार मूल्यांकन — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'अपनी कार की फोटो अपलोड करें और AI से तुरंत अपनी मुद्रा में बाज़ार मूल्य का अनुमान पाएं।',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'मुख्य पृष्ठ', item: 'https://www.naira.autos/mukhya-prishtha' },
      { '@type': 'ListItem', position: 2, name: 'उपकरण', item: 'https://www.naira.autos/upkaran' },
      { '@type': 'ListItem', position: 3, name: 'मेरी कार की कीमत क्या है', item: 'https://www.naira.autos/upkaran/meri-car-ki-keemat-kya-hai' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'मेरी पुरानी कार की कीमत क्या है?', acceptedAnswer: { '@type': 'Answer', text: 'यह ब्रांड, मॉडल, मॉडल वर्ष, वेरिएंट, माइलेज और कुल स्थिति के साथ-साथ आपके देश में समान कारों की मौजूदा बिक्री कीमतों पर निर्भर करता है। ऊपर फोटो अपलोड करें और अपना देश चुनें — AI आपकी कार को पहचानेगा और उस बाज़ार की वास्तविक लिस्टिंग के आधार पर आपकी मुद्रा में कीमत सीमा देगा।' } },
      { '@type': 'Question', name: 'पुरानी कार के मूल्यांकन को कौन से कारक प्रभावित करते हैं?', acceptedAnswer: { '@type': 'Answer', text: 'मुख्य कारक हैं: (1) ब्रांड और मॉडल — बाज़ार के अनुसार कुछ कारें अपना मूल्य बेहतर बनाए रखती हैं। (2) मॉडल वर्ष, वेरिएंट और माइलेज। (3) बॉडी और पेंट की स्थिति। (4) मैकेनिकल स्थिति और सर्विस इतिहास। (5) पूरे दस्तावेज़ और रजिस्ट्रेशन। (6) स्थानीय मांग और सप्लाई — एक ही कार अलग-अलग देशों में अलग कीमत पर बिक सकती है।' } },
      { '@type': 'Question', name: 'क्या मेरे देश का मूल्यांकन पर असर पड़ता है?', acceptedAnswer: { '@type': 'Answer', text: 'हां, बहुत ज़्यादा। आयात शुल्क, किसी खास ब्रांड की स्थानीय मांग, मुद्रा की ताकत और पुरानी कारों के बाज़ार का आकार देशों के बीच बड़ा कीमत अंतर पैदा करते हैं। हमारा टूल कई देशों को सपोर्ट करता है और उस बाज़ार के हिसाब से स्थानीय मुद्रा में अनुमान देता है, न कि एक सामान्य औसत।' } },
      { '@type': 'Question', name: 'AI मूल्यांकन कितना सटीक है?', acceptedAnswer: { '@type': 'Answer', text: 'हमारा टूल आपकी फोटो से ब्रांड, मॉडल, वर्ष और वेरिएंट की सटीक पहचान के लिए कंप्यूटर विज़न का उपयोग करता है, फिर आपके चुने हुए देश की वास्तविक लिस्टिंग डेटा से तुलना करके एक ही नंबर के बजाय एक कीमत सीमा देता है। इसे बातचीत के लिए एक भरोसेमंद शुरुआती बिंदु समझें, सटीक कीमत नहीं — वास्तविक मूल्य हमेशा व्यक्तिगत निरीक्षण और बातचीत पर निर्भर करता है।' } },
      { '@type': 'Question', name: 'क्या यह मूल्यांकन टूल पूरी तरह मुफ़्त है?', acceptedAnswer: { '@type': 'Answer', text: 'हां। कोई शुल्क नहीं, कोई अकाउंट बनाने की ज़रूरत नहीं, और टूल इस्तेमाल करने की कोई सीमा नहीं।' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'ब्रांड और पुनर्विक्रय मूल्य', body: 'पुनर्विक्रय मूल्य बाज़ार के हिसाब से अलग होता है — कई क्षेत्रों में टोयोटा और होंडा अपना मूल्य अच्छे से बनाए रखती हैं, जबकि जर्मन लग्ज़री ब्रांड उच्च रखरखाव लागत वाले बाज़ारों में तेज़ी से गिर सकते हैं। स्थानीय मांग उतनी ही अहम है जितना ब्रांड का नाम।' },
  { icon: Shield, title: 'माइलेज और सर्विस इतिहास', body: 'कम माइलेज और दर्ज सर्विस इतिहास दुनिया में कहीं भी अच्छी तरह से बनी रखी गई कार के दो सबसे भरोसेमंद संकेतक हैं। लगातार मेंटेनेंस के दस्तावेज़ एक साल छोटी कार से भी ज़्यादा मूल्यवान हो सकते हैं।' },
  { icon: CheckCircle2, title: 'दस्तावेज़ और स्वामित्व', body: 'किसी भी बाज़ार में सबसे अच्छी कीमत पाने के लिए पूरे और वैध दस्तावेज़ तथा अपडेटेड रजिस्ट्रेशन ज़रूरी हैं। अधूरे दस्तावेज़ या आयात संबंधी समस्याएं कीमत को 15% से 25% तक कम कर सकती हैं।' },
  { icon: AlertCircle, title: 'कुल स्थिति', body: 'साफ बॉडी जिस पर कोई खरोंच, जंग या फीका पेंट न हो, साथ ही मैकेनिकल रूप से अच्छी तरह चलने वाला इंजन, स्पष्ट इस्तेमाल के निशान वाली समान कार की तुलना में लगातार 10% से 15% ज़्यादा कीमत दिलाता है।' },
];

const FAQ_ITEMS = [
  { q: 'मेरी पुरानी कार की कीमत क्या है?', a: 'यह ब्रांड, मॉडल, मॉडल वर्ष, वेरिएंट, माइलेज और स्थिति के साथ-साथ आपके देश में समान कारों की मौजूदा बिक्री कीमतों पर निर्भर करता है। एक फोटो अपलोड करें और अपना देश चुनें, आपको अपनी मुद्रा में AI अनुमान मिलेगा।' },
  { q: 'पुरानी कार के मूल्यांकन को कौन से कारक प्रभावित करते हैं?', a: 'ब्रांड और मॉडल, मॉडल वर्ष और वेरिएंट, माइलेज, बॉडी व इंजन की स्थिति, पूरे दस्तावेज़, और आपके बाज़ार में मांग व सप्लाई।' },
  { q: 'क्या मेरे देश का मूल्यांकन पर असर पड़ता है?', a: 'हां — आयात शुल्क, किसी खास ब्रांड की स्थानीय मांग, मुद्रा की ताकत और बाज़ार का आकार देशों के बीच कीमत अंतर पैदा करते हैं। हम कई देशों को सपोर्ट करते हैं और आपकी स्थानीय मुद्रा में कीमत देते हैं।' },
  { q: 'बेचने से पहले सही कीमत कैसे तय करूं?', a: 'एक संदर्भ नंबर के लिए हमारे मुफ़्त AI मूल्यांकन टूल का इस्तेमाल करें, फिर अपने क्षेत्र में समान कारों की मौजूदा लिस्टिंग देखें। न्यूनतम स्वीकार्य राशि से 5-10% ज़्यादा कीमत रखने से बातचीत के लिए जगह बनी रहती है।' },
  { q: 'AI मूल्यांकन कितना सटीक है?', a: 'फोटो से आपकी कार की सटीक पहचान के लिए कंप्यूटर विज़न का इस्तेमाल करता है, फिर आपके चुने हुए देश की वास्तविक लिस्टिंग डेटा से तुलना करता है। इसे एक भरोसेमंद शुरुआती बिंदु समझें, सटीक कीमत नहीं — वास्तविक मूल्य निरीक्षण और बातचीत पर निर्भर करता है।' },
  { q: 'क्या यह कार मूल्यांकन टूल मुफ़्त है?', a: 'हां — कोई शुल्क नहीं, कोई अकाउंट नहीं, इस्तेमाल की कोई सीमा नहीं।' },
];

export default function MeriCarKiKeematKyaHaiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex flex-wrap items-center gap-3 mb-6 text-left">
              <Link href="/upkaran" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="वापस जाएं">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="ब्रेडक्रंब" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/mukhya-prishtha" className="hover:text-white/60 transition-colors">मुख्य पृष्ठ</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/upkaran" className="hover:text-white/60 transition-colors">उपकरण</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">मेरी कार की कीमत क्या है</span>
              </nav>
              <LanguagePills path="/upkaran/meri-car-ki-keemat-kya-hai" className="ms-auto" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                AI से · मुफ़्त
              </span>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              आपकी कार की<br /><span className="text-amber-400">असली कीमत क्या है?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              एक फोटो अपलोड करें — वास्तविक लिस्टिंग डेटा और AI के आधार पर अपनी मुद्रा में तुरंत बाज़ार मूल्य का अनुमान पाएं।
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> फोटो आधारित विश्लेषण</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>भारत और दुनिया भर में</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% मुफ़्त</span>
            </div>
          </div>
        </div>

        {/* ── मूल्यांकन टूल ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <MeriCarKiKeematKyaHaiClient />
          </div>
        </div>

        {/* ── SEO कंटेंट ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">अपनी कार की कीमत समझें</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              पुरानी कार की कीमत किस पर निर्भर करती है?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUATION_FACTORS.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-5">
            <h2 className="font-black uppercase text-foreground not-prose leading-none mb-4" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              कार मूल्यांकन: पूरी गाइड
            </h2>

            <p>दुनिया में कहीं भी, लिस्टिंग डालने, एक्सचेंज करने या खरीदते समय बातचीत करने से पहले अपनी कार की वास्तविक बाज़ार कीमत जानना सबसे ज़रूरी कदम है। बहुत ज़्यादा कीमत मांगने पर आपकी लिस्टिंग को अनदेखा कर दिया जाता है और वह बिना बिके पड़ी रहती है। बहुत कम कीमत मांगने का मतलब है कि आप असली पैसे गंवा रहे हैं। समस्या यह है कि <strong className="text-foreground">&ldquo;बाज़ार कीमत&rdquo; कोई तय आंकड़ा नहीं है</strong> — यह देश, मुद्रा, किसी खास ब्रांड की स्थानीय मांग, और हर कार के अपने इतिहास व स्थिति के हिसाब से बदलती रहती है।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">एक ही कार हर जगह एक जैसी कीमत पर क्यों नहीं बिकती</h3>
            <p>अच्छी स्थिति में पांच साल पुरानी टोयोटा कोरोला मुद्रा रूपांतरण से पहले भी अलग-अलग देशों में काफ़ी अलग कीमत पर बिक सकती है। पुरानी कारों पर आयात शुल्क और स्थानीय टैक्स देश-दर-देश काफ़ी अलग होते हैं। कुछ बाज़ारों में किसी खास ब्रांड की मज़बूत स्थानीय मांग होती है, जिससे पुनर्विक्रय मूल्य ऊंचा रहता है। दूसरे बाज़ारों में नई कारों की ज़्यादा सप्लाई होने से खरीदारों की पुरानी कारों में दिलचस्पी कम हो जाती है, जिससे पुनर्विक्रय मूल्य घटता है। इसलिए एक ही दुनियाभर की प्राइस गाइड काम नहीं करती — मूल्यांकन को हर देश के हिसाब से तय करना ज़रूरी है।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">माइलेज और सर्विस इतिहास</h3>
            <p>लगभग हर बाज़ार में, माइलेज और दर्ज सर्विस इतिहास किसी फोटो से दिखाई देने वाली जानकारी से कहीं ज़्यादा भरोसेमंद संकेतक हैं कि कार की हालत कैसी है। कम माइलेज और पूरे मेंटेनेंस दस्तावेज़ों वाली कार को आम तौर पर समान लेकिन ज़्यादा माइलेज वाली कार की तुलना में साफ़ कीमत का फ़ायदा मिलता है, भले ही फोटो में वे एक जैसी दिखें। गुम या अधूरा सर्विस इतिहास उन सबसे तेज़ तरीकों में से एक है जिससे विक्रेता बातचीत की ताकत खो देता है।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">स्वामित्व, रजिस्ट्रेशन और दस्तावेज़</h3>
            <p>हम जिन भी देशों को सपोर्ट करते हैं, वहां <strong className="text-foreground">पूरे और वैध दस्तावेज़ सबसे अच्छी कीमत पाने के लिए ज़रूरी हैं</strong>। खरीदार अधूरे दस्तावेज़, बिना चुकाए आयात शुल्क, या अधूरे रजिस्ट्रेशन वाली कारों के लिए सही तरीके से कम कीमत देते हैं, क्योंकि हर देश में स्वामित्व ट्रांसफर में समस्या आने का जोखिम असली होता है। लिस्टिंग डालने से पहले दस्तावेज़ की समस्याएं सुलझाना, खरीदार द्वारा मांगी जाने वाली छूट से कहीं सस्ता पड़ता है।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">कुल स्थिति और प्रस्तुति</h3>
            <p>साफ बॉडी जिसमें खरोंच, जंग या फीका पेंट न हो, साथ ही मैकेनिकल रूप से अच्छी तरह चलने वाला इंजन और ट्रांसमिशन, चाहे कार दिल्ली, मुंबई या किसी और शहर में बिक रही हो, स्पष्ट इस्तेमाल के निशान वाली समान कार की तुलना में लगातार ज़्यादा कीमत दिलाता है। छोटी और सस्ती मरम्मतें — गहरी सफाई, छोटे खरोंच ठीक करना, टूटी हुई लाइट बदलना — अक्सर आखिरी बिक्री कीमत में अपनी लागत से कई गुना ज़्यादा वापस दिलाती हैं।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">मुद्रा और बाज़ार का समय</h3>
            <p>आयातित पुरानी कारों पर ज़्यादा निर्भर देशों में, कार की कीमत मुद्रा विनिमय दरों में उतार-चढ़ाव से गहराई से जुड़ी होती है — कमज़ोर स्थानीय मुद्रा आयात लागत बढ़ाती है और पुरानी कारों की कीमतों को ऊपर धकेलती है, जबकि मज़बूत मुद्रा का असर इसके उल्टा होता है। इसका मतलब है कि एक-दो साल पहले का मूल्यांकन आज की कीमत के लिए भरोसेमंद नहीं हो सकता। पुराने प्राइस गाइड या पिछले मालिक द्वारा दी गई कीमत पर भरोसा करने के बजाय हमेशा सबसे ताज़ा बाज़ार डेटा देखें।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">यह टूल कैसे काम करता है</h3>
            <p>अपनी कार की साफ़ फोटो अपलोड करें और अपना देश चुनें। AI (Gemini Vision) फोटो से ब्रांड, मॉडल, मॉडल वर्ष और वेरिएंट की पहचान करता है, फिर आपके चुने हुए बाज़ार की ताज़ा, वास्तविक लिस्टिंग डेटा से तुलना करके एक नंबर के बजाय आपकी मुद्रा में कीमत सीमा देता है। परिणाम में मूल्यांकन को प्रभावित करने वाले खास कारक शामिल होते हैं, ताकि आप समझ सकें कि वह नंबर क्यों दिया गया है। यह टूल बातचीत के लिए एक तेज़, मुफ़्त शुरुआती बिंदु है, व्यक्तिगत निरीक्षण का विकल्प नहीं।</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">आम गलतियां जो आपकी कार की कीमत घटा देती हैं</h3>
            <p>कई विक्रेता अनजाने में अपनी कीमत को सिर्फ़ एक या दो पुरानी लिस्टिंग से मिलाकर खुद को नुकसान पहुंचाते हैं, बिना मौजूदा बाज़ार हालात देखे। एक और आम गलती है लिस्टिंग में सर्विस इतिहास न बताना — बिना सबूत के सिर्फ़ &ldquo;अच्छी तरह से बनी रखी गई&rdquo; लिखने से खरीदारों के मन में शक पैदा होता है, जो फिर कम बोली लगाते हैं। धुंधली या खराब रोशनी वाली फोटो भी खरीदारों के लिए असली हालत समझना मुश्किल बना देती है, जिससे उन्हें लगता है कि कुछ छिपाया जा रहा है। न्यूनतम अनुमान के बहुत करीब कीमत मांगने से बातचीत के लिए भी जगह नहीं बचती, जो शुरुआत से ही बिक्री को मुश्किल बना सकता है।</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">अक्सर पूछे जाने वाले सवाल</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              सबसे ज़्यादा पूछे गए सवाल
            </h2>
            <div className="space-y-3">
              {FAQ_ITEMS.map(({ q, a }) => (
                <details key={q} className="group border border-border rounded-xl overflow-hidden bg-card">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-foreground text-sm select-none list-none">
                    {q}
                    <span className="ml-4 flex-shrink-0 text-muted-foreground text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                  </summary>
                  <p className="px-5 pb-4 pt-1 text-sm text-muted-foreground leading-relaxed border-t border-border">{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              अन्य मुफ़्त टूल्स
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/upkaran" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">सभी टूल्स</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/mukhya-prishtha" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">हिन्दी मुख्य पृष्ठ</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
