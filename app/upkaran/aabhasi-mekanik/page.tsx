import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientHI from './client';
import { alternatesFor } from '@/lib/hreflang';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'AI मैकेनिक — मुफ़्त ऑनलाइन कार निदान | Naira Autos',
  description: 'आर्टिफिशियल इंटेलिजेंस से चलने वाला मुफ़्त वर्चुअल मैकेनिक। खराबी बताएं, फोटो, आवाज़ या वीडियो अपलोड करें और तुरंत मरम्मत लागत के साथ निदान पाएं। साइन अप की ज़रूरत नहीं।',
  alternates: alternatesFor('/upkaran/aabhasi-mekanik'),
  openGraph: {
    title: 'Axion — मुफ़्त AI वर्चुअल मैकेनिक | Naira Autos',
    description: 'आप कहीं भी हों, तुरंत ऑनलाइन कार निदान पाएं। इंजन की आवाज़, फोटो अपलोड करें या खराबी बताएं। तत्कालता स्तर, संभावित कारण, अगले कदम और मरम्मत लागत पाएं। मुफ़्त, साइन अप की ज़रूरत नहीं।',
    url: 'https://www.naira.autos/upkaran/aabhasi-mekanik',
    locale: 'hi_IN',
    type: 'website',
  },
  keywords: ['वर्चुअल मैकेनिक', 'मुफ़्त ऑनलाइन मैकेनिक', 'ऑनलाइन कार निदान', 'मुफ़्त कार जांच', 'मेरी कार में क्या खराबी है', 'ऑनलाइन गैरेज', 'ऑनलाइन मैकेनिक से पूछें', 'कार मरम्मत लागत कैलकुलेटर', 'AI मैकेनिक', 'ऑनलाइन कार जांच', 'इंजन की आवाज़ से निदान', 'कार मरम्मत लागत अनुमान'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/upkaran/aabhasi-mekanik',
      name: 'AI मैकेनिक — मुफ़्त ऑनलाइन कार निदान',
      description: 'आर्टिफिशियल इंटेलिजेंस से चलने वाला मुफ़्त वर्चुअल मैकेनिक। इंजन की आवाज़, फोटो अपलोड करें, या खराबी बताएं। तत्कालता स्तर और मरम्मत लागत के साथ तुरंत निदान पाएं।',
      url: 'https://www.naira.autos/upkaran/aabhasi-mekanik',
      inLanguage: 'hi',
      dateModified: '2026-09-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'मुख्य पृष्ठ', item: 'https://www.naira.autos/mukhya-prishtha' },
          { '@type': 'ListItem', position: 2, name: 'उपकरण', item: 'https://www.naira.autos/upkaran' },
          { '@type': 'ListItem', position: 3, name: 'AI मैकेनिक', item: 'https://www.naira.autos/upkaran/aabhasi-mekanik' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'वर्चुअल मैकेनिक क्या है और यह कैसे काम करता है?',
          acceptedAnswer: { '@type': 'Answer', text: 'वर्चुअल मैकेनिक एक ऐसा टूल है जो आर्टिफिशियल इंटेलिजेंस का उपयोग करके आपकी कार की खराबी का दूर से निदान करता है। आप समस्या बताते हैं, चाहें तो फोटो, आवाज़ या वीडियो अपलोड करते हैं, और AI सब कुछ जाने-माने खराबी पैटर्न के विशाल डेटाबेस से मिलाकर तत्कालता स्तर और अनुमानित मरम्मत लागत के साथ निदान देता है।' },
        },
        {
          '@type': 'Question',
          name: 'क्या AI केवल इंजन की आवाज़ से मेरी कार का निदान कर सकता है?',
          acceptedAnswer: { '@type': 'Answer', text: 'हां। खटखट, चीं-चीं या घर्षण की आवाज़ रिकॉर्ड करें — आपके फोन से सिर्फ 10 सेकंड भी काफी है। AI आवाज़ के पैटर्न का विश्लेषण करके यह पहचान सकता है, जैसे कि घिसे हुए बेयरिंग, घिसे हुए ब्रेक पैड, या कोई अन्य विशिष्ट खराबी।' },
        },
        {
          '@type': 'Question',
          name: 'क्या यह मुफ़्त है?',
          acceptedAnswer: { '@type': 'Answer', text: 'हां। पूरी तरह मुफ़्त — कोई साइन अप नहीं, कोई सब्सक्रिप्शन नहीं, कोई भुगतान नहीं। पेज पर जाएं और तुरंत निदान शुरू करें।' },
        },
        {
          '@type': 'Question',
          name: 'क्या AI का निदान हमेशा सटीक होता है?',
          acceptedAnswer: { '@type': 'Answer', text: 'नहीं — यह हर बार 100% सही नहीं होता। यह आपके द्वारा दिए गए विवरण, फोटो, आवाज़ या वीडियो के आधार पर एक अच्छा शुरुआती बिंदु है, लेकिन यह उन चीज़ों को छोड़ सकता है जो केवल लिफ्ट और स्कैनर के साथ वास्तविक जांच से पता चल सकती हैं। इसे अंतिम जवाब नहीं बल्कि पहली राय समझें, और ब्रेक, स्टीयरिंग या ईंधन से जुड़ी खराबी के लिए हमेशा किसी योग्य मैकेनिक से व्यक्तिगत रूप से मिलें, चाहे निदान कुछ भी कहे।' },
        },
        {
          '@type': 'Question',
          name: 'क्या यह BMW, Mercedes, Toyota या किसी अन्य ब्रांड के साथ काम करता है?',
          acceptedAnswer: { '@type': 'Answer', text: 'हां। BMW, Mercedes, Toyota या किसी अन्य ब्रांड की खराबी के बारे में पूछें — AI सभी बड़े निर्माताओं को कवर करता है। मरम्मत लागत नाइजीरियाई बाज़ार के हिसाब से तय है; अगर आप किसी अन्य देश में हैं, तो इसे एक सामान्य संदर्भ के रूप में उपयोग करें, स्थानीय सटीक आंकड़े के रूप में नहीं।' },
        },
        {
          '@type': 'Question',
          name: 'क्या यह किसी व्हाट्सएप ग्रुप या कार फोरम में पूछने जैसा ही है?',
          acceptedAnswer: { '@type': 'Answer', text: 'यह कई मायनों में बेहतर है। किसी फोरम या व्हाट्सएप ग्रुप में, आपको टेक्स्ट विवरण के आधार पर सिर्फ एक व्यक्ति की राय मिलती है। हमारा वर्चुअल मैकेनिक आपके विवरण का विश्लेषण अपलोड किए गए फोटो, आवाज़ या वीडियो के साथ करता है, इसे हज़ारों ज्ञात खराबी पैटर्न से मिलाता है, और संभावना के अनुसार क्रमबद्ध निदान देता है जिसमें भरोसे का स्तर भी शामिल होता है।' },
        },
        {
          '@type': 'Question',
          name: 'क्या मेरी बातचीत का इतिहास आपके सर्वर पर सहेजा जाता है?',
          acceptedAnswer: { '@type': 'Answer', text: 'नहीं। पूरा इतिहास केवल आपके अपने डिवाइस पर सहेजा जाता है, ब्राउज़र के लोकल स्टोरेज का उपयोग करके। हम अपने सर्वर पर उस सक्रिय संदेश के अलावा कुछ भी नहीं रखते जो आप निदान के लिए भेजते हैं। आप कभी भी साइड मेनू से अपना इतिहास मिटा सकते हैं।' },
        },
        {
          '@type': 'Question',
          name: 'क्या मुझे किसी भी कार ब्रांड की मरम्मत लागत मिल सकती है?',
          acceptedAnswer: { '@type': 'Answer', text: 'हां। हम Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot और अन्य सभी बड़े ब्रांडों को कवर करते हैं, चाहे आप कहीं भी गाड़ी चलाते हों। लागत एक अनुमानित अंतरराष्ट्रीय संदर्भ है।' },
        },
        {
          '@type': 'Question',
          name: 'अगर मुझे पास में मोबाइल मैकेनिक या गैरेज की ज़रूरत हो तो क्या करूं?',
          acceptedAnswer: { '@type': 'Answer', text: 'हमारा टूल पहले समस्या का निदान करता है, ताकि खोज शुरू करने से पहले आपको पता हो कि बिल्कुल क्या मांगना है। अगर खराबी के लिए वास्तविक जांच या विशेष उपकरण की ज़रूरत है, तो हम आपको स्पष्ट रूप से बता देंगे।' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — AI वर्चुअल मैकेनिक',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'आर्टिफिशियल इंटेलिजेंस से चलने वाला मुफ़्त वर्चुअल मैकेनिक। खराबी बताएं, इंजन की आवाज़ या फोटो अपलोड करें, नाइजीरियाई बाज़ार के हिसाब से तय मरम्मत लागत के साथ तुरंत निदान पाएं।',
      url: 'https://www.naira.autos/upkaran/aabhasi-mekanik',
      inLanguage: 'hi',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageHI() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientHI />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">अंतिम जांच: सितंबर 2026</p>

          {/* पूर्ण कवरेज */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">पूर्ण कवरेज</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              हमारा वर्चुअल मैकेनिक क्या-क्या देता है?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              चाहे आपको तुरंत मरम्मत लागत का अनुमान चाहिए, गैरेज जाने से पहले ऑनलाइन मैकेनिक से पूछना चाहते हों, या अपनी कार की मरम्मत में कितना खर्च आएगा यह जानना चाहते हों — यह टूल सब कुछ मुफ़्त में करता है।
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'इंजन खराबी निदान', desc: 'खटखट की आवाज़, मिसफायर, अनियमित आइडलिंग, ओवरहीटिंग, चेक इंजन लाइट — AI संभावना के अनुसार क्रमबद्ध सबसे संभावित कारणों की पहचान करता है।' },
                { title: 'साउंड और ऑडियो विश्लेषण', desc: 'खटखट, चीं-चीं या घर्षण की आवाज़ की रिकॉर्डिंग अपलोड करें। AI खराबी की पहचान के लिए आवाज़ के पैटर्न का विश्लेषण करता है।' },
                { title: 'तुरंत तत्कालता स्तर', desc: 'हर निदान चार स्पष्ट स्तरों के साथ आता है: चलाना सुरक्षित, ध्यान से निगरानी करें, जल्द मैकेनिक को दिखाएं, या अभी गाड़ी रोकें।' },
                { title: 'ऑनलाइन मरम्मत लागत', desc: 'लागत नाइजीरियाई बाज़ार के हिसाब से एक संदर्भ के तौर पर तय की गई है — पुर्जों और मज़दूरी की असली लागत देश और शहर के हिसाब से अलग होती है। इसे शुरुआती बिंदु के रूप में उपयोग करें, फिर स्थानीय कोटेशन लें।' },
                { title: 'खुद करने योग्य कदम', desc: 'जब खराबी ऐसी हो जिसे आप खुद जांच या ठीक कर सकते हैं, तो हम मैकेनिक पर पैसे खर्च करने से पहले सटीक तरीका बताते हैं।' },
                { title: 'लगातार बातचीत', desc: 'अगले सवाल पूछें और पूरे संदर्भ के साथ जवाब पाएं। हर सत्र आपके डिवाइस पर सहेजा जाता है।' },
                { title: 'हर ब्रांड के लिए सहायता', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot और कोई भी अन्य ब्रांड या बाज़ार।' },
                { title: 'फोटो और वीडियो से निदान', desc: 'डैशबोर्ड की चेतावनी लाइट, असामान्य रिसाव, या दिखाई देने वाली क्षति की फोटो भेजें। हर अतिरिक्त मीडिया निदान की सटीकता को काफी बढ़ा देता है।' },
                { title: 'पुर्जों की पहचान', desc: 'हर निदान में वे विशिष्ट पुर्जे शामिल होते हैं जिनके शामिल होने की सबसे ज़्यादा संभावना है, ताकि आपको पता हो कि किसी भी गैरेज या पुर्जों की दुकान में क्या मांगना है।' },
              ].map(({ title, desc }) => (
                <div key={title} className="bg-card border border-border rounded-2xl p-5 hover:border-emerald-500/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 text-sm">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 max-w-screen-lg space-y-10 text-sm text-muted-foreground leading-relaxed">

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                आर्टिफिशियल इंटेलिजेंस वाला वर्चुअल मैकेनिक क्या है?
              </h2>
              <p className="mb-3">एक <strong className="text-foreground">वर्चुअल मैकेनिक</strong> बिल्कुल वैसा ही है जैसा नाम से लगता है: एक मैकेनिक जिससे आप व्यक्तिगत रूप से मिलने के बजाय टेक्स्ट, फोटो, आवाज़ या वीडियो के ज़रिए बात करते हैं। आप बताते हैं कि आपकी कार में क्या हो रहा है — ठंडी स्टार्ट पर वह अजीब खटखट की आवाज़, चेक इंजन लाइट जो बंद नहीं होती, ब्रेक जो ढीले महसूस होते हैं — और कुछ ही सेकंड में आपको असली कार खराबियों के गहरे ज्ञान पर आधारित जवाब मिलता है।</p>
              <p>Axion, हमारा <strong className="text-foreground">AI मैकेनिक</strong>, हर ब्रांड और हर देश के लिए काम करता है, लेकिन भारत में गाड़ी चलाने वालों के लिए इसके पास एक अतिरिक्त फायदा है: यह समझता है कि मिलावटी ईंधन इंजेक्टर को कैसे प्रभावित करता है, उष्णकटिबंधीय गर्मी रबर की सील को कैसे तेज़ी से घिसती है, और सड़क के गड्ढे सस्पेंशन को अन्य बाज़ारों की तुलना में कैसे जल्दी नुकसान पहुंचाते हैं।</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                एक मिनट से भी कम समय में कार का निदान कैसे पाएं
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. खराबी बताएं।</strong> जो हो रहा है उसे लिखें — जितना विस्तृत होगा उतना अच्छा। यह कब शुरू हुआ? क्या यह सिर्फ ठंडा होने पर, तेज़ी बढ़ाने पर, या स्टीयरिंग घुमाने पर होता है?</p>
                <p><strong className="text-foreground">2. फोटो, आवाज़ रिकॉर्डिंग या वीडियो अपलोड करें (वैकल्पिक, लेकिन बहुत मददगार)।</strong> इंजन की आवाज़ की 10 सेकंड की रिकॉर्डिंग अक्सर पूरे पैराग्राफ के विवरण से ज़्यादा उपयोगी होती है।</p>
                <p><strong className="text-foreground">3. तुरंत अपना निदान पाएं।</strong> तत्कालता स्तर, संभावना के अनुसार क्रमबद्ध संभावित कारण, आप खुद क्या जांच सकते हैं, और मरम्मत लागत का अनुमान।</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                मरम्मत लागत: ज़्यादा पैसे देने से बचें
              </h2>
              <p className="mb-3">गैरेज में ज़्यादा पैसे देने के सबसे आम तरीकों में से एक यह जानने के बिना जाना है कि मरम्मत में कितना खर्च आना चाहिए। किसी भी गैरेज में जाने से पहले, यह जानने के लिए हमारे <strong className="text-foreground">मरम्मत लागत</strong> अनुमान का उपयोग करें कि उचित कीमत क्या है — पुर्जे और मज़दूरी स्पष्ट रूप से अलग-अलग बताई गई।</p>
              <p>यह अनुमान आपके विशिष्ट वाहन — ब्रांड, मॉडल, वर्ष — और आपके विवरण के आधार पर सबसे संभावित खराबी को ध्यान में रखता है। यह कोई सामान्य आंकड़ा नहीं है: कम तेल दबाव दिखाने वाली 180,000 किमी चली 2010 मॉडल की Camry को उसी लाइट को दिखाने वाली 40,000 किमी चली 2020 मॉडल की Camry से अलग अनुमान मिलेगा, क्योंकि संभावित कारण अलग है।</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                हर ब्रांड के साथ काम करता है: Toyota, BMW, Mercedes, Honda और अन्य
              </h2>
              <p className="mb-3">आप जो भी गाड़ी चलाते हों, इससे कोई फर्क नहीं पड़ता। AI के पास हर निर्माता के लिए विशिष्ट खराबी पैटर्न हैं — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen और आज सड़क पर चल रहा लगभग हर दूसरा ब्रांड। ब्रांड, मॉडल और वर्ष एक बार बताएं, और निदान उस विशिष्ट वाहन, उस किलोमीटर पर ज्ञात खराबियों के अनुसार ढल जाता है, न कि हर कार पर समान रूप से लागू होने वाला सामान्य जवाब देता है।</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                इंजन की आवाज़ से निदान सब कुछ क्यों बदल देता है
              </h2>
              <p className="mb-3">विवरण व्यक्तिगत होते हैं — "एक अजीब आवाज़" हर व्यक्ति के लिए अलग मतलब रखती है। आवाज़ ऐसी नहीं होती। ठंडी स्टार्ट पर खटखट की आवाज़ ब्रेक लगाते समय चीं-चीं की आवाज़ से अलग सुनाई देती है, और वह स्टीयरिंग घुमाते समय घर्षण की आवाज़ से भी अलग है। 10 सेकंड की रिकॉर्डिंग अपलोड करके, AI आपको सिर्फ टेक्स्ट से संभव से कहीं ज़्यादा सटीक निदान देता है।</p>
              <p>आपको प्रोफेशनल उपकरण की ज़रूरत नहीं है। आपके फोन का माइक्रोफ़ोन काफी है — इंजन चालू रखते हुए इसे आवाज़ के स्रोत के पास रखें, और रिकॉर्डिंग अपलोड करें।</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">समर्थित वाहन</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'ट्रक', 'बस', 'मोटरसाइकिल'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">मुख्य तथ्य</h3>
              <ul className="space-y-2.5">
                {[
                  '100% मुफ़्त — कोई सब्सक्रिप्शन नहीं',
                  'खाते या पंजीकरण की ज़रूरत नहीं',
                  'मोबाइल और कंप्यूटर दोनों पर काम करता है',
                  'अंतरराष्ट्रीय संदर्भ मरम्मत लागत',
                  '24/7 उपलब्ध — रविवार को भी',
                  'बातचीत का इतिहास स्थानीय रूप से सहेजा जाता है',
                  'असीमित अगले सवाल',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Naira Autos पर और भी</h3>
              <ul className="space-y-2">
                {[
                  { label: 'मुफ़्त कार मूल्यांकन', href: '/evaluate-car' },
                  { label: 'इंजन साउंड एनालाइज़र', href: '/tools/engine-sound-analyzer' },
                  { label: 'आयात शुल्क कैलकुलेटर', href: '/tools/import-duty-calculator' },
                  { label: 'दस्तावेज़ चेकलिस्ट', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link prefetch={false} href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* अतिरिक्त बुद्धिमत्ता */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">अतिरिक्त बुद्धिमत्ता</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  स्थानीय सड़क परिस्थितियों के हिसाब से भी ढला हुआ
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  निदान आप कहीं भी गाड़ी चलाएं, समान रूप से काम करता है। लेकिन ज़्यादातर वर्चुअल मैकेनिक टूल केवल पश्चिमी गैरेज के डेटा पर प्रशिक्षित हैं — उन्हें यह नहीं पता कि नाइजीरिया में मिलावटी ईंधन तेल की चिपचिपाहट को निर्माता की अपेक्षा से 40% तेज़ी से कम करता है, या लागोस की सड़कें एक CV जॉइंट को 30,000 किमी में खराब कर सकती हैं जिसे 150,000 किमी तक चलना चाहिए था।
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion यह भी जानता है। ईंधन भरवाने के बाद अपनी Toyota Corolla की खटखट के बारे में पूछें, और अगर आप भारत में हैं, तो यह पहले मिलावटी ईंधन पर विचार करेगा — क्योंकि सांख्यिकीय रूप से वहां यही सबसे संभावित कारण है।
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'ईंधन मिलावट', desc: 'यह समझता है कि मिलावटी ईंधन नॉक सेंसर, इंजेक्टर और तेल की चिपचिपाहट को कैसे प्रभावित करता है।' },
                  { title: 'उष्णकटिबंधीय गर्मी का प्रभाव', desc: '35°C+ के परिवेश तापमान को ध्यान में रखता है जो रबर की सील के घिसाव को तेज़ करता है।' },
                  { title: 'गड्ढों से नुकसान', desc: 'खराब सड़कों के लिए विशिष्ट सस्पेंशन और टायर खराबी पैटर्न को पहचानता है।' },
                  { title: 'स्थानीय पुर्जों की कीमतें', desc: 'लागत अनुमान पुर्जों के बाज़ार और पंजीकृत गैरेज के डेटा का उपयोग करके निकाला जाता है।' },
                ].map(({ title, desc }) => (
                  <div key={title} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    </div>
                    <p className="text-xs font-bold text-white mb-1">{title}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* तुलना */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">तुलना</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              वर्चुअल मैकेनिक बनाम अन्य विकल्प
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">विशेषता</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">AI मैकेनिक</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">गैरेज विज़िट</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">ग्रुप/फोरम</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['24/7 उपलब्ध', 'हां', 'नहीं', 'कभी-कभी'],
                    ['मुफ़्त', 'हां', 'नहीं', 'हां'],
                    ['यात्रा की ज़रूरत नहीं', 'हां', 'नहीं', 'हां'],
                    ['लागत अनुमान', 'हां', 'अलग-अलग', 'नहीं'],
                    ['ऑडियो/वीडियो विश्लेषण', 'हां', 'हां', 'नहीं'],
                    ['तुरंत जवाब', 'हां', 'नहीं', 'कभी-कभी'],
                    ['सुसंगत गुणवत्ता', 'हां', 'अलग-अलग', 'नहीं'],
                    ['इतिहास सहेजता है', 'हां', 'नहीं', 'नहीं'],
                  ].map(([feat, ai, workshop, forum]) => (
                    <tr key={feat} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3 text-muted-foreground">{feat}</td>
                      <td className="px-4 py-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{ai}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{workshop}</td>
                      <td className="px-4 py-3 text-center text-muted-foreground">{forum}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* सामान्य प्रश्न */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">अक्सर पूछे जाने वाले सवाल</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              अक्सर पूछे जाने वाले सवाल
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'वर्चुअल मैकेनिक क्या है और यह कैसे काम करता है?', a: 'यह एक ऐसा टूल है जो आर्टिफिशियल इंटेलिजेंस का उपयोग करके आपकी कार की खराबी का दूर से निदान करता है। आप समस्या बताते हैं, वैकल्पिक मीडिया अपलोड करते हैं, और AI सब कुछ खराबियों के विशाल डेटाबेस से मिलाता है — जिसमें लागत नाइजीरियाई बाज़ार के हिसाब से तय होती है।' },
                { q: 'क्या AI का निदान हमेशा सटीक होता है?', a: 'नहीं — यह हर बार 100% सही नहीं होता। यह एक अच्छा शुरुआती बिंदु है, लेकिन यह उन चीज़ों को छोड़ सकता है जो केवल लिफ्ट और स्कैनर के साथ वास्तविक जांच से पता चलती हैं। इसे पहली राय समझें, और ब्रेक, स्टीयरिंग या ईंधन की खराबी के लिए हमेशा व्यक्तिगत रूप से मैकेनिक से मिलें।' },
                { q: 'क्या यह BMW, Mercedes, Toyota या किसी अन्य ब्रांड के साथ काम करता है?', a: 'हां। किसी भी ब्रांड के बारे में पूछें — AI सभी बड़े निर्माताओं को कवर करता है। लागत नाइजीरियाई बाज़ार के हिसाब से तय है; अन्य देशों में इसे सामान्य संदर्भ के रूप में उपयोग करें।' },
                { q: 'क्या यह व्हाट्सएप ग्रुप में पूछने जैसा ही है?', a: 'यह कई मायनों में बेहतर है। फोरम में आपको सिर्फ एक व्यक्ति की राय मिलती है। हमारी सेवा आपके विवरण का विश्लेषण फोटो, आवाज़ या वीडियो के साथ करती है, इसे हज़ारों खराबी पैटर्न से मिलाती है, और भरोसे के स्तर के साथ क्रमबद्ध निदान देती है।' },
                { q: 'क्या यह केवल इंजन की आवाज़ से मेरी कार का निदान कर सकता है?', a: 'हां। आवाज़ हमारे सबसे शक्तिशाली इनपुट में से एक है। खटखट, चीं-चीं या घर्षण की आवाज़ की रिकॉर्डिंग अपलोड करें — आपके फोन से सिर्फ 10 सेकंड भी काफी है। AI संभावित खराबी की पहचान के लिए आवाज़ के पैटर्न का विश्लेषण करता है।' },
                { q: 'क्या मुझे खाता बनाना या लॉगिन करना होगा?', a: 'नहीं। AI मैकेनिक पूरी तरह मुफ़्त है और इसके लिए किसी खाते, पंजीकरण, या व्यक्तिगत जानकारी की ज़रूरत नहीं है। आपके वाहन का डेटा आपके डिवाइस पर स्थानीय रूप से सहेजा जाता है।' },
                { q: 'क्या मेरा इतिहास आपके सर्वर पर सहेजा जाता है?', a: 'नहीं। पूरा इतिहास केवल आपके डिवाइस पर ब्राउज़र के लोकल स्टोरेज के ज़रिए सहेजा जाता है। हम अपने सर्वर पर सक्रिय संदेश के अलावा कुछ भी नहीं रखते।' },
                { q: 'मरम्मत लागत का अनुमान कितना सटीक है?', a: 'यह नाइजीरियाई बाज़ार के डेटा पर आधारित है — लागोस, अबूजा और पोर्ट हारकोर्ट के गैरेज में पुर्जे और मज़दूरी, एक संदर्भ के रूप में। हम एक सीमा (न्यूनतम से अधिकतम) देते हैं ताकि आपको पता हो कि क्या उचित है। अगर कोई गैरेज हमारे अधिकतम से काफी ज़्यादा कीमत बताए, तो इसकी जांच करना उचित है।' },
                { q: 'क्या मुझे किसी भी कार ब्रांड की मरम्मत लागत मिल सकती है?', a: 'हां। हम Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot और अन्य सभी बड़े ब्रांडों को कवर करते हैं, चाहे आप कहीं भी गाड़ी चलाते हों। लागत एक अनुमानित अंतरराष्ट्रीय संदर्भ है।' },
                { q: 'अगर मुझे पास में मोबाइल मैकेनिक या गैरेज की ज़रूरत हो तो क्या करूं?', a: 'हमारा टूल पहले समस्या का निदान करता है, ताकि खोज शुरू करने से पहले आपको पता हो कि बिल्कुल क्या मांगना है। अगर खराबी के लिए वास्तविक जांच या विशेष उपकरण की ज़रूरत है, तो हम आपको स्पष्ट रूप से बता देंगे — और किस तरह के मैकेनिक या गैरेज की तलाश करनी है।' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer list-none gap-3">
                    <span className="font-semibold text-foreground text-sm leading-relaxed">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          <p className="text-xs text-muted-foreground border-t border-border pt-4">
            समीक्षा: <Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, ऑटो मैकेनिक। निदान तर्क और मरम्मत लागत सीमा की तकनीकी सटीकता की जांच की गई है।
          </p>

          {/* अंतिम CTA */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              तैयार हैं? अभी अपनी कार का निदान करें।
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              मुफ़्त। तुरंत। साइन अप की ज़रूरत नहीं। अभी अपना निदान पाएं।
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              मुफ़्त निदान शुरू करें
            </a>
          </section>

          {/* और टूल्स */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              और मुफ़्त टूल्स
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'VIN जांच',                  color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'दस्तावेज़ चेकलिस्ट',        color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'आयात शुल्क कैलकुलेटर',      color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link prefetch={false}
                  key={href}
                  href={href}
                  className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-${color}-50 dark:bg-${color}-500/10 border border-${color}-200 dark:border-${color}-500/20 hover:bg-${color}-100 dark:hover:bg-${color}-500/20 transition-all`}
                >
                  <p className={`text-sm font-bold text-${color}-700 dark:text-${color}-400`}>{label}</p>
                  <ChevronRight className={`h-4 w-4 text-${color}-500`} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
