import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { RotKhongChanRakhaThaoraiClient } from './client';

export const metadata: Metadata = {
  title: 'รถของฉันราคาเท่าไหร่? ประเมินราคาด้วย AI ฟรี | Naira Autos',
  description: 'ประเมินราคารถของคุณฟรีด้วย AI เป็นสกุลเงินของคุณเอง อัปโหลดภาพเดียว รับราคาทันที — ประเทศไทยและทั่วโลก',
  keywords: 'รถของฉันราคาเท่าไหร่, ประเมินราคารถฟรี, ราคารถมือสอง, ประเมินราคารถด้วย ai, คำนวณมูลค่ารถ',
  openGraph: {
    title: 'รถของฉันราคาเท่าไหร่? ประเมินราคาด้วย AI ฟรี',
    description: 'ประเมินราคารถของคุณด้วย AI เป็นสกุลเงินของคุณเอง อัปโหลดภาพเดียว รับราคาประมาณการทันที — ฟรีทั้งหมด',
    url: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
    siteName: 'Naira Autos',
    locale: 'th_TH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
    languages: {
      en: 'https://www.naira.autos/evaluate-used-car',
      es: 'https://www.naira.autos/cuanto-vale-mi-auto',
      ar: 'https://www.naira.autos/kam-qeemat-sayarati',
      fr: 'https://www.naira.autos/outils/combien-vaut-ma-voiture',
      pt: 'https://www.naira.autos/ferramentas/quanto-vale-meu-carro',
      de: 'https://www.naira.autos/werkzeuge/was-ist-mein-auto-wert',
      ja: 'https://www.naira.autos/tsuru/kuruma-satei',
      tr: 'https://www.naira.autos/araclar/arabam-ne-kadar-eder',
      it: 'https://www.naira.autos/strumenti/quanto-vale-la-mia-auto',
      vi: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
      th: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
      id: 'https://www.naira.autos/alat/berapa-harga-mobil-saya',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'รถของฉันราคาเท่าไหร่? ประเมินราคาด้วย AI ฟรี',
  description: 'เครื่องมือประเมินราคารถด้วย AI ฟรี ให้ราคาประมาณการทันทีเป็นสกุลเงินของคุณ ปรับตามตลาดในประเทศของคุณ',
  url: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai',
  inLanguage: 'th',
  dateModified: '2026-09-20',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'ประเมินราคารถด้วย AI — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'อัปโหลดภาพรถของคุณ รับราคาประมาณการตลาดทันทีด้วย AI เป็นสกุลเงินของคุณเอง',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'หน้าหลัก', item: 'https://www.naira.autos/na-lak' },
      { '@type': 'ListItem', position: 2, name: 'เครื่องมือ', item: 'https://www.naira.autos/khrueang-mue' },
      { '@type': 'ListItem', position: 3, name: 'รถของฉันราคาเท่าไหร่', item: 'https://www.naira.autos/khrueang-mue/rot-khong-chan-rakha-thaorai' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'รถมือสองของฉันราคาเท่าไหร่?', acceptedAnswer: { '@type': 'Answer', text: 'ขึ้นอยู่กับยี่ห้อ รุ่น ปีที่ผลิต รุ่นย่อย ระยะทางที่ใช้งาน และสภาพโดยรวม รวมถึงราคาขายปัจจุบันของรถรุ่นใกล้เคียงในประเทศของคุณ อัปโหลดภาพด้านบนและเลือกประเทศของคุณ — AI จะระบุรถของคุณและให้ช่วงราคาเป็นสกุลเงินของคุณ โดยอ้างอิงจากประกาศขายจริงในตลาดนั้น' } },
      { '@type': 'Question', name: 'ปัจจัยใดบ้างที่มีผลต่อการประเมินราคารถมือสอง?', acceptedAnswer: { '@type': 'Answer', text: 'ปัจจัยสำคัญที่สุดคือ (1) ยี่ห้อและรุ่น — บางรุ่นรักษามูลค่าได้ดีกว่าขึ้นอยู่กับตลาด (2) ปีที่ผลิต รุ่นย่อย และระยะทางที่ใช้งาน (3) สภาพตัวถังและสีรถ (4) สภาพเครื่องยนต์และประวัติการบำรุงรักษา (5) เอกสารและการจดทะเบียนที่ครบถ้วน (6) อุปสงค์และอุปทานในท้องถิ่น — รถคันเดียวกันอาจมีมูลค่าต่างกันในแต่ละประเทศ' } },
      { '@type': 'Question', name: 'ประเทศของฉันมีผลต่อการประเมินราคาหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ใช่ มีผลค่อนข้างมาก ภาษีนำเข้า ความต้องการในท้องถิ่นสำหรับบางยี่ห้อ ความแข็งแกร่งของสกุลเงิน และขนาดของตลาดรถมือสอง ล้วนทำให้ราคาแตกต่างกันอย่างมากในแต่ละประเทศ เครื่องมือของเรารองรับหลายประเทศและให้ราคาประมาณการเป็นสกุลเงินท้องถิ่นที่ปรับตามตลาดนั้น ๆ แทนที่จะเป็นค่าเฉลี่ยทั่วโลก' } },
      { '@type': 'Question', name: 'การประเมินราคาด้วย AI แม่นยำแค่ไหน?', acceptedAnswer: { '@type': 'Answer', text: 'เครื่องมือของเราใช้เทคโนโลยีคอมพิวเตอร์วิทัศน์เพื่อระบุยี่ห้อ รุ่น ปีที่ผลิต และรุ่นย่อยจากภาพของคุณอย่างแม่นยำ จากนั้นนำไปเทียบกับข้อมูลประกาศขายจริงในประเทศที่คุณเลือก เพื่อให้ช่วงราคาแทนที่จะเป็นตัวเลขเดียว ควรมองว่านี่เป็นจุดเริ่มต้นที่น่าเชื่อถือสำหรับการต่อรอง ไม่ใช่ราคาที่แน่นอน — มูลค่าที่แท้จริงขึ้นอยู่กับการตรวจสอบและการต่อรองจริง' } },
      { '@type': 'Question', name: 'เครื่องมือประเมินราคานี้ฟรีจริงหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ใช่ ไม่มีค่าใช้จ่าย ไม่ต้องสร้างบัญชี และไม่มีการจำกัดจำนวนครั้งในการใช้งาน' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'ยี่ห้อและมูลค่าขายต่อ', body: 'ความสามารถในการรักษามูลค่าขายต่อแตกต่างกันไปตามตลาด — Toyota และ Honda มักรักษามูลค่าได้ดีในหลายภูมิภาค ในขณะที่รถหรูสัญชาติเยอรมันอาจเสื่อมราคาเร็วกว่าในตลาดที่มีค่าบำรุงรักษาสูง ความต้องการในท้องถิ่นสำคัญไม่แพ้ชื่อยี่ห้อ' },
  { icon: Shield, title: 'ระยะทางที่ใช้งานและประวัติการบำรุงรักษา', body: 'ระยะทางที่ใช้งานต่ำและประวัติการบำรุงรักษาที่มีบันทึกชัดเจน เป็นตัวชี้วัดที่น่าเชื่อถือที่สุดสองอย่างของรถที่ได้รับการดูแลอย่างดี ไม่ว่าจะอยู่ที่ใดในโลก บันทึกการบำรุงรักษาอย่างสม่ำเสมออาจมีค่ามากกว่ารถรุ่นที่ใหม่กว่าหนึ่งปีด้วยซ้ำ' },
  { icon: CheckCircle2, title: 'เอกสารและความเป็นเจ้าของ', body: 'เอกสารที่ครบถ้วนและการจดทะเบียนที่เป็นปัจจุบันเป็นสิ่งจำเป็นเพื่อให้ได้ราคาที่ดีที่สุดในทุกตลาด เอกสารที่ไม่ครบถ้วนหรือปัญหาด้านการนำเข้าอาจทำให้ราคาลดลงถึง 15% ถึง 25%' },
  { icon: AlertCircle, title: 'สภาพโดยรวม', body: 'ตัวถังที่สะอาด ไม่มีรอยขีดข่วน สนิม หรือสีซีด พร้อมเครื่องยนต์ที่ทำงานได้ดีทางกลไก มักทำให้ราคาสูงขึ้น 10% ถึง 15% เมื่อเทียบกับรถรุ่นเดียวกันที่มีร่องรอยการใช้งานชัดเจน' },
];

const FAQ_ITEMS = [
  { q: 'รถมือสองของฉันราคาเท่าไหร่?', a: 'ขึ้นอยู่กับยี่ห้อ รุ่น ปีที่ผลิต รุ่นย่อย ระยะทางที่ใช้งาน และสภาพ รวมถึงราคาขายปัจจุบันของรถรุ่นใกล้เคียงในประเทศของคุณ อัปโหลดภาพและเลือกประเทศเพื่อรับราคาประมาณการจาก AI เป็นสกุลเงินของคุณ' },
  { q: 'ปัจจัยใดบ้างที่มีผลต่อการประเมินราคารถมือสอง?', a: 'ยี่ห้อและรุ่น ปีที่ผลิตและรุ่นย่อย ระยะทางที่ใช้งาน สภาพตัวถังและเครื่องยนต์ เอกสารที่ครบถ้วน และอุปสงค์อุปทานในตลาดของคุณ' },
  { q: 'ประเทศของฉันมีผลต่อการประเมินราคาหรือไม่?', a: 'ใช่ — ภาษีนำเข้า ความต้องการในท้องถิ่นสำหรับบางยี่ห้อ ความแข็งแกร่งของสกุลเงิน และขนาดตลาด ทำให้ราคาแตกต่างกันในแต่ละประเทศ เรารองรับหลายประเทศและให้ราคาเป็นสกุลเงินท้องถิ่นของคุณ' },
  { q: 'ฉันควรตั้งราคารถอย่างไรก่อนขาย?', a: 'ใช้เครื่องมือประเมินราคาด้วย AI ฟรีของเราเพื่อได้ตัวเลขอ้างอิง จากนั้นตรวจสอบประกาศขายที่ยังเปิดอยู่ของรถรุ่นใกล้เคียงในพื้นที่ของคุณ การตั้งราคาสูงกว่าราคาต่ำสุดที่คุณรับได้ประมาณ 5-10% มักเปิดช่องให้ต่อรองได้' },
  { q: 'การประเมินราคาด้วย AI แม่นยำแค่ไหน?', a: 'ใช้เทคโนโลยีคอมพิวเตอร์วิทัศน์เพื่อระบุรถของคุณจากภาพอย่างแม่นยำ จากนั้นเทียบกับข้อมูลประกาศขายจริงในประเทศที่คุณเลือก ควรมองว่าเป็นจุดเริ่มต้นที่น่าเชื่อถือ ไม่ใช่ราคาที่แน่นอน — มูลค่าจริงขึ้นอยู่กับการตรวจสอบและการต่อรอง' },
  { q: 'เครื่องมือประเมินราคารถนี้ฟรีหรือไม่?', a: 'ใช่ — ไม่มีค่าใช้จ่าย ไม่ต้องสร้างบัญชี ไม่จำกัดการใช้งาน' },
];

export default function RotKhongChanRakhaThaoraiPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/khrueang-mue" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="ย้อนกลับ">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="เส้นทางนำทาง" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/na-lak" className="hover:text-white/60 transition-colors">หน้าหลัก</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/khrueang-mue" className="hover:text-white/60 transition-colors">เครื่องมือ</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">รถของฉันราคาเท่าไหร่</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                ด้วย AI · ฟรี
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              รถของคุณ<br /><span className="text-amber-400">ราคาเท่าไหร่?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              อัปโหลดภาพหนึ่งภาพ — รับการประเมินราคาตลาดทันทีเป็นสกุลเงินของคุณ อ้างอิงจากข้อมูลประกาศขายจริงและ AI
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> วิเคราะห์จากภาพ</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>ประเทศไทยและทั่วโลก</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">ฟรี 100%</span>
            </div>
          </div>
        </div>

        {/* ── เครื่องมือประเมินราคา ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <RotKhongChanRakhaThaoraiClient />
          </div>
        </div>

        {/* ── เนื้อหา SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">ทำความเข้าใจเรื่องมูลค่ารถ</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              อะไรเป็นตัวกำหนดราคารถมือสอง?
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
              คู่มือฉบับสมบูรณ์: การประเมินราคารถมือสอง
            </h2>

            <p>การรู้มูลค่าตลาดที่แท้จริงของรถคุณเป็นขั้นตอนที่สำคัญที่สุดก่อนที่จะประกาศขาย แลกเปลี่ยน หรือต่อรองซื้อรถ ไม่ว่าคุณจะอยู่ที่ใดในโลก การตั้งราคาสูงเกินไปทำให้ประกาศของคุณไม่มีคนสนใจและค้างอยู่นาน ส่วนการตั้งราคาต่ำเกินไปหมายถึงการเสียเงินจริงไปโดยเปล่าประโยชน์ ปัญหาคือ <strong className="text-foreground">&ldquo;มูลค่าตลาด&rdquo; ไม่ใช่ตัวเลขคงที่ตัวเดียว</strong> — มันเปลี่ยนแปลงไปตามประเทศ สกุลเงิน ความต้องการในท้องถิ่นสำหรับยี่ห้อใดยี่ห้อหนึ่ง และประวัติรวมถึงสภาพเฉพาะของรถแต่ละคัน</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">ทำไมรถคันเดียวกันจึงมีมูลค่าไม่เท่ากันในแต่ละประเทศ</h3>
            <p>รถ Toyota Corolla อายุห้าปีในสภาพดี อาจมีมูลค่าแตกต่างกันมากในแต่ละประเทศ แม้ก่อนที่จะแปลงสกุลเงิน ภาษีนำเข้าและภาษีท้องถิ่นที่เก็บจากรถมือสองแตกต่างกันอย่างมากในแต่ละประเทศ บางตลาดมีความต้องการในท้องถิ่นที่แข็งแกร่งสำหรับบางยี่ห้อ ทำให้ราคาขายต่อสูง ในขณะที่บางตลาดมีตลาดรถใหม่ที่ใหญ่กว่า ทำให้ผู้ซื้อสนใจรถมือสองน้อยลง ซึ่งลดมูลค่าขายต่อลงไปอีก ด้วยเหตุนี้ คู่มือราคาแบบเดียวทั่วโลกจึงใช้ไม่ได้ผล — การประเมินราคาจำเป็นต้องปรับตามแต่ละประเทศเสมอ</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">ระยะทางที่ใช้งานและประวัติการบำรุงรักษา</h3>
            <p>ในเกือบทุกตลาด ระยะทางที่ใช้งานและประวัติการบำรุงรักษาที่มีบันทึกเป็นตัวชี้วัดสภาพรถที่น่าเชื่อถือกว่าสิ่งที่ภาพถ่ายจะบอกได้มาก รถที่มีระยะทางต่ำกว่าและมีบันทึกการบำรุงรักษาครบถ้วน มักได้เปรียบด้านราคาอย่างชัดเจนเมื่อเทียบกับรถรุ่นเดียวกันที่มีระยะทางสูงกว่า แม้จะดูคล้ายกันในภาพถ่ายก็ตาม การขาดหรือสูญหายของประวัติการบำรุงรักษาเป็นหนึ่งในวิธีที่เร็วที่สุดที่ผู้ขายจะเสียอำนาจต่อรองไป</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">ความเป็นเจ้าของ การจดทะเบียน และเอกสาร</h3>
            <p>ในทุกประเทศที่เรารองรับ <strong className="text-foreground">เอกสารที่ครบถ้วนและถูกต้องเป็นสิ่งจำเป็นเพื่อให้ได้มูลค่าที่ดีที่สุด</strong> ผู้ซื้อมักต่อรองราคาลงอย่างสมเหตุสมผลสำหรับรถที่มีเอกสารไม่ครบ ภาษีนำเข้าที่ยังไม่ได้ชำระ หรือการจดทะเบียนที่ไม่สมบูรณ์ เนื่องจากความเสี่ยงของปัญหาการโอนกรรมสิทธิ์เป็นเรื่องจริงในทุกประเทศ การแก้ไขปัญหาด้านเอกสารก่อนประกาศขายมักมีค่าใช้จ่ายถูกกว่าส่วนลดที่ผู้ซื้อจะเรียกร้องมากหากไม่ทำเช่นนั้น</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">สภาพโดยรวมและการนำเสนอ</h3>
            <p>ตัวถังที่สะอาด ไม่มีรอยขีดข่วน สนิม หรือสีซีด พร้อมเครื่องยนต์และเกียร์ที่ทำงานได้ดีทางกลไก มักทำให้ราคาสูงขึ้นอย่างสม่ำเสมอ ไม่ว่ารถจะขายที่กรุงเทพฯ เชียงใหม่ หรือที่ใดก็ตาม เมื่อเทียบกับรถรุ่นเดียวกันที่มีร่องรอยการใช้งานชัดเจน การซ่อมแซมเล็กน้อยที่มีต้นทุนต่ำ เช่น การทำความสะอาดอย่างละเอียด การจัดการรอยขีดข่วนเล็ก ๆ หรือการเปลี่ยนหลอดไฟที่ขาด มักคุ้มค่ากว่าต้นทุนหลายเท่าเมื่อคิดรวมในราคาขายสุดท้าย</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">สกุลเงินและจังหวะเวลาของตลาด</h3>
            <p>ในประเทศที่พึ่งพารถมือสองนำเข้าเป็นหลัก ราคารถมีความเชื่อมโยงอย่างใกล้ชิดกับความเคลื่อนไหวของอัตราแลกเปลี่ยน — สกุลเงินท้องถิ่นที่อ่อนค่าลงทำให้ต้นทุนการนำเข้าสูงขึ้นและดันราคารถมือสองให้สูงขึ้น ในขณะที่สกุลเงินที่แข็งค่ากว่าจะมีผลตรงกันข้าม ซึ่งหมายความว่าการประเมินราคาจากหนึ่งหรือสองปีก่อนอาจไม่ใช่แนวทางที่น่าเชื่อถือสำหรับราคาปัจจุบันอีกต่อไป ควรตรวจสอบข้อมูลตลาดล่าสุดเสมอ แทนที่จะอ้างอิงคู่มือราคาเก่าหรือจำนวนเงินที่เจ้าของคนก่อนเคยจ่ายไป</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">เครื่องมือนี้ทำงานอย่างไร</h3>
            <p>อัปโหลดภาพรถของคุณที่คมชัดและเลือกประเทศของคุณ AI (Gemini Vision) จะระบุยี่ห้อ รุ่น ปีที่ผลิต และรุ่นย่อยจากภาพ จากนั้นนำไปเทียบกับข้อมูลประกาศขายจริงล่าสุดในตลาดที่คุณเลือก เพื่อให้ช่วงราคาเป็นสกุลเงินของคุณ แทนที่จะเป็นตัวเลขเดียว ผลลัพธ์จะรวมปัจจัยเฉพาะที่มีผลต่อการประเมินราคา เพื่อให้คุณเข้าใจว่าทำไมจึงได้ตัวเลขนั้น เครื่องมือนี้ออกแบบมาเพื่อเป็นจุดเริ่มต้นที่รวดเร็วและฟรีสำหรับการต่อรอง ไม่ใช่สิ่งทดแทนการตรวจสอบรถด้วยตนเอง</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">คำถามที่พบบ่อย</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              คำถามที่พบบ่อยที่สุด
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
              เครื่องมือฟรีอื่น ๆ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/khrueang-mue" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">เครื่องมือทั้งหมด</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/na-lak" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">หน้าหลักภาษาไทย</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
