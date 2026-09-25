import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientTH from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'หมอรถ AI ฟรี — วินิจฉัยปัญหารถยนต์ออนไลน์ | Naira Autos',
  description: 'หมอรถเสมือนจริงฟรีด้วยปัญญาประดิษฐ์ อธิบายอาการเสีย อัปโหลดรูปภาพ เสียง หรือวิดีโอของปัญหา แล้วรับผลวินิจฉัยทันทีพร้อมค่าซ่อมโดยประมาณ ไม่ต้องสมัครสมาชิก',
  alternates: {
    canonical: 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
    languages: {
      'en': 'https://www.naira.autos/tools/ai-mechanic',
      'es': 'https://www.naira.autos/herramientas/mecanico-virtual',
      'ar': 'https://www.naira.autos/adawat/mikaniki-iftiradi',
      'fr': 'https://www.naira.autos/outils/mecanicien-virtuel',
      'pt': 'https://www.naira.autos/ferramentas/meu-mecanico-virtual',
      'de': 'https://www.naira.autos/werkzeuge/virtueller-mechaniker',
      'ja': 'https://www.naira.autos/tsuru/ai-shindan',
      'it': 'https://www.naira.autos/strumenti/meccanico-virtuale',
      'nl': 'https://www.naira.autos/gereedschappen/virtuele-monteur',
      'tr': 'https://www.naira.autos/araclar/sanal-usta',
      'vi': 'https://www.naira.autos/cong-cu/tho-may-ao',
      'id': 'https://www.naira.autos/alat/montir-virtual',
      'th': 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      'x-default': 'https://www.naira.autos/tools/ai-mechanic',
    },
  },
  openGraph: {
    title: 'Axion — หมอรถ AI ฟรี | Naira Autos',
    description: 'วินิจฉัยปัญหารถยนต์ออนไลน์ทันที ไม่ว่าคุณจะอยู่ที่ไหน อัปโหลดเสียงเครื่องยนต์ รูปภาพ หรืออธิบายอาการเสีย รับระดับความเร่งด่วน สาเหตุที่เป็นไปได้ ขั้นตอนถัดไป และค่าซ่อม ฟรี ไม่ต้องสมัครสมาชิก',
    url: 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
    locale: 'th',
    type: 'website',
  },
  keywords: ['หมอรถ AI', 'ช่างซ่อมรถออนไลน์ฟรี', 'วินิจฉัยรถยนต์ออนไลน์', 'ตรวจอาการรถฟรี', 'รถของฉันเป็นอะไร', 'อู่ซ่อมรถออนไลน์', 'ถามช่างออนไลน์', 'คำนวณค่าซ่อมรถ', 'ช่างปัญญาประดิษฐ์', 'ตรวจรถออนไลน์', 'วินิจฉัยจากเสียงเครื่องยนต์', 'ประเมินค่าซ่อมรถยนต์'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      name: 'หมอรถ AI ฟรี — วินิจฉัยปัญหารถยนต์ออนไลน์',
      description: 'หมอรถเสมือนจริงฟรีด้วยปัญญาประดิษฐ์ อัปโหลดเสียงเครื่องยนต์ รูปภาพ หรืออธิบายอาการเสีย รับผลวินิจฉัยทันทีพร้อมระดับความเร่งด่วนและค่าซ่อม',
      url: 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      inLanguage: 'th',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'หน้าหลัก', item: 'https://www.naira.autos/na-lak' },
          { '@type': 'ListItem', position: 2, name: 'เครื่องมือ', item: 'https://www.naira.autos/khrueang-mue' },
          { '@type': 'ListItem', position: 3, name: 'หมอรถ AI', item: 'https://www.naira.autos/khrueang-mue/mo-rot-ai' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'หมอรถเสมือนจริงคืออะไร และทำงานอย่างไร?',
          acceptedAnswer: { '@type': 'Answer', text: 'หมอรถเสมือนจริงเป็นเครื่องมือที่ใช้ปัญญาประดิษฐ์วินิจฉัยปัญหารถของคุณจากระยะไกล คุณอธิบายปัญหา อัปโหลดรูปภาพ เสียง หรือวิดีโอถ้าต้องการ แล้ว AI จะวิเคราะห์ทั้งหมดเทียบกับฐานข้อมูลรูปแบบความเสียหายจำนวนมาก เพื่อให้ผลวินิจฉัยพร้อมระดับความเร่งด่วนและค่าซ่อมโดยประมาณ' },
        },
        {
          '@type': 'Question',
          name: 'AI วินิจฉัยรถของฉันจากเสียงเครื่องยนต์อย่างเดียวได้ไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ได้ ลองอัดเสียงเคาะ เสียงหวีด หรือเสียงเสียดสี — แค่ 10 วินาทีด้วยโทรศัพท์ก็เพียงพอ AI จะวิเคราะห์รูปแบบของเสียงเพื่อระบุ เช่น ลูกปืนสึก ผ้าเบรกสึก หรืออาการเสียเฉพาะอื่น ๆ' },
        },
        {
          '@type': 'Question',
          name: 'ฟรีไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ใช่ ฟรีทั้งหมด — ไม่ต้องสมัครสมาชิก ไม่ต้องจ่ายรายเดือน ไม่ต้องชำระเงิน เข้าหน้าเว็บแล้วเริ่มวินิจฉัยได้ทันที' },
        },
        {
          '@type': 'Question',
          name: 'ผลวินิจฉัยของ AI แม่นยำเสมอไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ไม่เสมอไป — ไม่ได้ถูกต้อง 100% ทุกครั้ง เป็นจุดเริ่มต้นที่ดีจากคำอธิบาย รูปภาพ เสียง หรือวิดีโอที่คุณให้มา แต่อาจพลาดบางอย่างที่ตรวจพบได้เฉพาะจากการตรวจสอบจริงด้วยลิฟต์ยกรถและเครื่องสแกน ควรมองว่าเป็นความเห็นเบื้องต้น ไม่ใช่คำตอบสุดท้าย และควรพบช่างที่มีใบรับรองด้วยตนเองเสมอสำหรับปัญหาเบรก พวงมาลัย หรือระบบเชื้อเพลิง ไม่ว่าผลวินิจฉัยจะบอกอย่างไร' },
        },
        {
          '@type': 'Question',
          name: 'ใช้ได้กับ BMW, Mercedes, Toyota หรือยี่ห้ออื่น ๆ ไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ได้ ถามเกี่ยวกับปัญหาของ BMW, Mercedes, Toyota หรือยี่ห้ออื่น ๆ — AI ครอบคลุมผู้ผลิตรายใหญ่ทั้งหมด ค่าซ่อมถูกปรับตามตลาดไนจีเรีย หากคุณอยู่ประเทศอื่น ให้ใช้เป็นข้อมูลอ้างอิงทั่วไป ไม่ใช่ตัวเลขที่แน่นอนในพื้นที่ของคุณ' },
        },
        {
          '@type': 'Question',
          name: 'เหมือนกับการถามในกลุ่มไลน์หรือฟอรัมรถยนต์ไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ดีกว่าในหลายด้าน เมื่อคุณถามในฟอรัมหรือกลุ่มแชท คุณจะได้ความเห็นจากคนเพียงคนเดียวจากคำอธิบายที่เป็นข้อความ หมอรถเสมือนของเราวิเคราะห์คำอธิบายของคุณร่วมกับรูปภาพ เสียง หรือวิดีโอที่อัปโหลด เทียบกับรูปแบบความเสียหายที่รู้จักหลายพันแบบ และให้ผลวินิจฉัยที่จัดอันดับตามความเป็นไปได้พร้อมระดับความมั่นใจ' },
        },
        {
          '@type': 'Question',
          name: 'ประวัติการสนทนาของฉันถูกเก็บไว้ในเซิร์ฟเวอร์ของคุณไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ไม่ ประวัติทั้งหมดถูกเก็บไว้ในอุปกรณ์ของคุณเองเท่านั้น โดยใช้ที่เก็บข้อมูลในเครื่องของเบราว์เซอร์ เราไม่เก็บสิ่งใดในเซิร์ฟเวอร์ของเรา นอกจากข้อความที่กำลังใช้งานซึ่งคุณส่งเพื่อวินิจฉัย คุณสามารถลบประวัติได้ตลอดเวลาจากเมนูด้านข้าง' },
        },
        {
          '@type': 'Question',
          name: 'สามารถขอค่าซ่อมสำหรับรถยี่ห้อไหนก็ได้ไหม?',
          acceptedAnswer: { '@type': 'Answer', text: 'ได้ เราครอบคลุม Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot และยี่ห้อใหญ่อื่น ๆ ไม่ว่าคุณจะขับที่ไหน ค่าซ่อมเป็นข้อมูลอ้างอิงระดับนานาชาติโดยประมาณ' },
        },
        {
          '@type': 'Question',
          name: 'ถ้าต้องการช่างเคลื่อนที่หรืออู่ใกล้บ้านล่ะ?',
          acceptedAnswer: { '@type': 'Answer', text: 'เครื่องมือของเราวินิจฉัยปัญหาก่อน เพื่อให้คุณรู้ว่าควรถามอะไรก่อนเริ่มค้นหา หากอาการเสียต้องตรวจสอบจริงหรือใช้อุปกรณ์เฉพาะ เราจะบอกคุณอย่างชัดเจน' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — หมอรถ AI',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'หมอรถเสมือนจริงฟรีด้วยปัญญาประดิษฐ์ อธิบายอาการเสีย อัปโหลดเสียงเครื่องยนต์หรือรูปภาพ รับผลวินิจฉัยทันทีพร้อมค่าซ่อมที่ปรับตามตลาดไนจีเรีย',
      url: 'https://www.naira.autos/khrueang-mue/mo-rot-ai',
      inLanguage: 'th',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageTH() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientTH />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">ตรวจสอบล่าสุด: สิงหาคม 2026</p>

          {/* ครอบคลุมทุกด้าน */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">ครอบคลุมทุกด้าน</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              หมอรถ AI ของเราให้อะไรบ้าง?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              ไม่ว่าคุณจะต้องการประเมินค่าซ่อมอย่างรวดเร็ว อยากถามช่างออนไลน์ก่อนไปอู่ หรืออยากคำนวณว่าการซ่อมรถของคุณจะเสียเงินเท่าไหร่ — เครื่องมือนี้ครอบคลุมทุกอย่าง ฟรี
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'วินิจฉัยปัญหาเครื่องยนต์', desc: 'เสียงเคาะ เครื่องสะดุด รอบเดินเบาไม่นิ่ง เครื่องร้อนจัด ไฟเช็คเครื่องยนต์ — AI ระบุสาเหตุที่เป็นไปได้มากที่สุด เรียงตามความน่าจะเป็น' },
                { title: 'วิเคราะห์เสียงและออดิโอ', desc: 'อัปโหลดเสียงเคาะ เสียงหวีด หรือเสียงเสียดสี AI จะวิเคราะห์รูปแบบเสียงเพื่อระบุอาการเสีย' },
                { title: 'ระดับความเร่งด่วนทันที', desc: 'ทุกผลวินิจฉัยมาพร้อมคำตัดสินที่ชัดเจน 4 ระดับ: ขับได้อย่างปลอดภัย, เฝ้าระวังอย่างใกล้ชิด, ควรพบช่างโดยเร็ว หรือหยุดขับทันที' },
                { title: 'ประเมินค่าซ่อมออนไลน์', desc: 'ค่าซ่อมถูกปรับตามตลาดไนจีเรียเป็นข้อมูลอ้างอิง — ค่าอะไหล่และค่าแรงจริงแตกต่างกันไปตามประเทศและเมือง ใช้เป็นจุดเริ่มต้นแล้วขอใบเสนอราคาจากอู่ในพื้นที่ของคุณ' },
                { title: 'ขั้นตอนที่ทำเองได้', desc: 'เมื่ออาการเสียเป็นสิ่งที่คุณสามารถตรวจสอบหรือซ่อมเองได้ เราจะบอกวิธีที่แน่นอน — ก่อนที่คุณจะเสียเงินให้ช่าง' },
                { title: 'สนทนาต่อเนื่อง', desc: 'ถามคำถามเพิ่มเติมและรับคำตอบพร้อมบริบทเต็มรูปแบบ ทุกเซสชันถูกบันทึกไว้ในอุปกรณ์ของคุณ' },
                { title: 'รองรับหลายยี่ห้อ', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot และยี่ห้อหรือตลาดอื่น ๆ' },
                { title: 'วินิจฉัยจากรูปภาพและวิดีโอ', desc: 'ส่งรูปไฟเตือนบนหน้าปัด ของเหลวรั่วผิดปกติ หรือความเสียหายที่มองเห็นได้ สื่อเพิ่มเติมแต่ละอย่างช่วยเพิ่มความมั่นใจในการวินิจฉัยอย่างมาก' },
                { title: 'ระบุชิ้นส่วนที่เกี่ยวข้อง', desc: 'ทุกผลวินิจฉัยรวมชิ้นส่วนเฉพาะที่น่าจะเกี่ยวข้องมากที่สุด เพื่อให้คุณรู้ว่าควรขออะไหล่อะไรที่อู่หรือร้านอะไหล่ใดก็ได้' },
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
                หมอรถเสมือนจริงด้วยปัญญาประดิษฐ์คืออะไร?
              </h2>
              <p className="mb-3"><strong className="text-foreground">หมอรถเสมือนจริง</strong> คือสิ่งที่ชื่อบอกไว้ตรงตัว: ช่างที่คุณคุยด้วยผ่านข้อความ รูปภาพ เสียง หรือวิดีโอ แทนที่จะเจอตัวจริง คุณอธิบายว่ารถของคุณเป็นอะไร — เสียงเคาะแปลก ๆ ตอนสตาร์ทเครื่องเย็น ไฟเช็คเครื่องยนต์ที่ไม่ยอมดับ เบรกที่รู้สึกนุ่มผิดปกติ — แล้วภายในไม่กี่วินาที คุณจะได้รับคำตอบจากความรู้เชิงลึกเกี่ยวกับอาการเสียของรถยนต์จริง ๆ</p>
              <p>Axion หมอรถ AI ของเรา ใช้งานได้กับทุกยี่ห้อและทุกประเทศ แต่มีข้อได้เปรียบพิเศษสำหรับผู้ที่ขับรถในไนจีเรีย: มันเข้าใจว่าน้ำมันปลอมส่งผลต่อหัวฉีดอย่างไร ความร้อนแบบเขตร้อนทำให้ยางซีลสึกเร็วขึ้นอย่างไร และหลุมบนถนนทำให้ช่วงล่างเสียหายเร็วกว่าตลาดอื่น ๆ อย่างไร</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                วิธีรับผลวินิจฉัยรถยนต์ภายในไม่ถึงหนึ่งนาที
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. อธิบายอาการเสีย</strong> เขียนสิ่งที่เกิดขึ้น — ยิ่งละเอียดยิ่งดี เริ่มเกิดขึ้นเมื่อไหร่? เกิดเฉพาะตอนเครื่องเย็น ตอนเร่งเครื่อง หรือตอนหมุนพวงมาลัย?</p>
                <p><strong className="text-foreground">2. อัปโหลดรูปภาพ เสียง หรือวิดีโอ (ไม่บังคับ แต่ช่วยได้มาก)</strong> เสียงเครื่องยนต์ที่อัดไว้ 10 วินาที มักมีประโยชน์มากกว่าคำอธิบายทั้งย่อหน้า</p>
                <p><strong className="text-foreground">3. รับผลวินิจฉัยทันที</strong> ระดับความเร่งด่วน สาเหตุที่เป็นไปได้เรียงตามความน่าจะเป็น สิ่งที่คุณตรวจสอบเองได้ และค่าซ่อมโดยประมาณ</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                ค่าซ่อม: ป้องกันการโดนคิดราคาเกินจริง
              </h2>
              <p className="mb-3">หนึ่งในวิธีที่พบบ่อยที่สุดที่คุณจะโดนคิดราคาเกินจริงที่อู่ คือการไปโดยไม่รู้ว่าค่าซ่อมควรจะเป็นเท่าไหร่ ก่อนไปอู่ไหนก็ตาม ใช้การประเมิน <strong className="text-foreground">ค่าซ่อม</strong> ของเราเพื่อรู้ว่าราคาที่เป็นธรรมคือเท่าไหร่ — แยกค่าอะไหล่และค่าแรงอย่างชัดเจน</p>
              <p>การประเมินคำนึงถึงรถของคุณโดยเฉพาะ — ยี่ห้อ รุ่น ปีที่ผลิต — และอาการเสียที่เป็นไปได้มากที่สุดตามคำอธิบายของคุณ ไม่ใช่ตัวเลขทั่วไป: Camry ปี 2010 ที่วิ่งมา 180,000 กม. ที่มีแรงดันน้ำมันเครื่องต่ำ จะได้รับการประเมินที่ต่างจาก Camry ปี 2020 ที่วิ่งมา 40,000 กม. ที่มีไฟเตือนเดียวกัน เพราะสาเหตุที่เป็นไปได้ต่างกัน</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                ใช้ได้กับทุกยี่ห้อ: Toyota, BMW, Mercedes, Honda และอื่น ๆ
              </h2>
              <p className="mb-3">ไม่ว่าคุณจะขับรถอะไร AI มีรูปแบบอาการเสียเฉพาะสำหรับผู้ผลิตแต่ละราย — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen และเกือบทุกยี่ห้อที่วิ่งอยู่บนถนนวันนี้ ให้ยี่ห้อ รุ่น และปีที่ผลิตเพียงครั้งเดียว แล้วผลวินิจฉัยจะปรับตามสิ่งที่รู้เกี่ยวกับอาการเสียของรถคันนั้นโดยเฉพาะ ที่เลขไมล์นั้นโดยเฉพาะ แทนที่จะให้คำตอบทั่วไปที่ใช้ได้กับรถทุกคันเหมือนกัน</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                ทำไมการวินิจฉัยจากเสียงเครื่องยนต์ถึงเปลี่ยนทุกอย่าง
              </h2>
              <p className="mb-3">คำอธิบายเป็นเรื่องส่วนตัว — "เสียงแปลก ๆ" หมายถึงสิ่งที่ต่างกันสำหรับแต่ละคน แต่เสียงไม่เป็นแบบนั้น เสียงเคาะตอนสตาร์ทเครื่องเย็นฟังดูต่างจากเสียงหวีดตอนเบรก ซึ่งก็ฟังดูต่างจากเสียงเสียดสีตอนหมุนพวงมาลัย การอัปโหลดเสียงที่อัดไว้ 10 วินาที ทำให้ AI ให้ผลวินิจฉัยที่แม่นยำกว่าการใช้ข้อความเพียงอย่างเดียวมาก</p>
              <p>คุณไม่จำเป็นต้องใช้อุปกรณ์มืออาชีพ ไมโครโฟนของโทรศัพท์ก็เพียงพอแล้ว — แค่ถือให้ใกล้แหล่งกำเนิดเสียงขณะเครื่องยนต์ทำงาน แล้วอัปโหลดไฟล์เสียงนั้น</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">รถที่รองรับ</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'รถบรรทุก', 'รถบัส', 'รถจักรยานยนต์'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">ข้อมูลสำคัญ</h3>
              <ul className="space-y-2.5">
                {[
                  'ฟรี 100% — ไม่ต้องสมัครสมาชิกรายเดือน',
                  'ไม่ต้องมีบัญชีหรือสมัครสมาชิก',
                  'ใช้ได้ทั้งมือถือและคอมพิวเตอร์',
                  'ค่าซ่อมอ้างอิงระดับนานาชาติ',
                  'พร้อมใช้งาน 24/7 — แม้แต่วันอาทิตย์',
                  'ประวัติการสนทนาบันทึกไว้ในเครื่อง',
                  'ถามคำถามเพิ่มเติมได้ไม่จำกัด',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">เครื่องมืออื่น ๆ ใน Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'ประเมินราคารถฟรี', href: '/evaluate-car' },
                  { label: 'เครื่องวิเคราะห์เสียงเครื่องยนต์', href: '/tools/engine-sound-analyzer' },
                  { label: 'คำนวณภาษีนำเข้า', href: '/tools/import-duty-calculator' },
                  { label: 'รายการตรวจสอบเอกสาร', href: '/tools/vehicle-papers-checklist' },
                ].map(({ label, href }) => (
                  <li key={href}>
                    <Link href={href} className="flex items-center justify-between text-xs text-muted-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors group">
                      <span>{label}</span>
                      <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </section>

          {/* ความฉลาดเพิ่มเติม */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">ความฉลาดเพิ่มเติม</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  ปรับให้เข้ากับสภาพถนนในพื้นที่ด้วย
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  ผลวินิจฉัยทำงานเหมือนกันไม่ว่าคุณจะขับที่ไหน แต่เครื่องมือหมอรถเสมือนส่วนใหญ่ถูกฝึกด้วยข้อมูลจากอู่ในโลกตะวันตกเท่านั้น — พวกมันไม่รู้ว่าน้ำมันปลอมในไนจีเรียทำให้ความหนืดของน้ำมันเครื่องลดลงเร็วกว่าที่ผู้ผลิตคาดไว้ถึง 40% หรือถนนในลากอสสามารถทำลายข้อต่อ CV ให้เสียภายใน 30,000 กม. ทั้งที่ควรใช้งานได้ถึง 150,000 กม.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion รู้เรื่องนี้ด้วย ถามเกี่ยวกับเสียงเคาะของ Toyota Corolla ของคุณหลังเติมน้ำมัน และถ้าคุณอยู่ในไนจีเรีย มันจะพิจารณาน้ำมันปลอมเป็นอันดับแรก — เพราะในทางสถิติแล้วนั่นคือสาเหตุที่เป็นไปได้มากที่สุดที่นั่น
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'น้ำมันปลอมปน', desc: 'เข้าใจว่าน้ำมันปลอมส่งผลต่อเซนเซอร์น็อก หัวฉีด และความหนืดของน้ำมันเครื่องอย่างไร' },
                  { title: 'ผลกระทบจากความร้อนเขตร้อน', desc: 'คำนึงถึงอุณหภูมิแวดล้อม 35°C ขึ้นไปที่เร่งการสึกหรอของยางซีล' },
                  { title: 'ความเสียหายจากหลุมบนถนน', desc: 'จดจำรูปแบบความเสียหายของช่วงล่างและยางที่พบเฉพาะบนถนนที่ขรุขระ' },
                  { title: 'ราคาอะไหล่ในพื้นที่', desc: 'การประเมินค่าใช้จ่ายคำนวณจากข้อมูลตลาดอะไหล่และอู่ที่จดทะเบียน' },
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

          {/* เปรียบเทียบ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">เปรียบเทียบ</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              หมอรถ AI เทียบกับตัวเลือกอื่น
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">คุณสมบัติ</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">หมอรถ AI</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">ไปอู่ซ่อมรถ</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">กลุ่ม/ฟอรัมรถยนต์</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['พร้อมใช้งาน 24/7', 'ใช่', 'ไม่', 'บางครั้ง'],
                    ['ฟรี', 'ใช่', 'ไม่', 'ใช่'],
                    ['ไม่ต้องเดินทาง', 'ใช่', 'ไม่', 'ใช่'],
                    ['ประเมินค่าใช้จ่าย', 'ใช่', 'ไม่แน่นอน', 'ไม่'],
                    ['วิเคราะห์เสียง/วิดีโอ', 'ใช่', 'ใช่', 'ไม่'],
                    ['ตอบกลับทันที', 'ใช่', 'ไม่', 'บางครั้ง'],
                    ['คุณภาพสม่ำเสมอ', 'ใช่', 'ไม่แน่นอน', 'ไม่'],
                    ['บันทึกประวัติ', 'ใช่', 'ไม่', 'ไม่'],
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

          {/* คำถามที่พบบ่อย */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">คำถามที่พบบ่อย</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              คำถามที่พบบ่อย
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'หมอรถเสมือนจริงคืออะไร และทำงานอย่างไร?', a: 'เป็นเครื่องมือที่ใช้ปัญญาประดิษฐ์วินิจฉัยปัญหารถของคุณจากระยะไกล คุณอธิบายปัญหา อัปโหลดสื่อเพิ่มเติมได้ถ้าต้องการ แล้ว AI จะเทียบทุกอย่างกับฐานข้อมูลอาการเสียจำนวนมาก — พร้อมค่าซ่อมที่ปรับตามตลาดไนจีเรีย' },
                { q: 'ผลวินิจฉัยของ AI แม่นยำเสมอไหม?', a: 'ไม่เสมอไป — ไม่ได้ถูกต้อง 100% ทุกครั้ง เป็นจุดเริ่มต้นที่ดี แต่อาจพลาดบางอย่างที่ตรวจพบได้เฉพาะจากการตรวจสอบจริงด้วยลิฟต์ยกรถและเครื่องสแกน ควรมองว่าเป็นความเห็นเบื้องต้น และควรพบช่างด้วยตนเองเสมอสำหรับปัญหาเบรก พวงมาลัย หรือระบบเชื้อเพลิง' },
                { q: 'ใช้ได้กับ BMW, Mercedes, Toyota หรือยี่ห้ออื่น ๆ ไหม?', a: 'ได้ ถามเกี่ยวกับยี่ห้อไหนก็ได้ — AI ครอบคลุมผู้ผลิตรายใหญ่ทั้งหมด ค่าซ่อมถูกปรับตามตลาดไนจีเรีย ในประเทศอื่นให้ใช้เป็นข้อมูลอ้างอิงทั่วไป' },
                { q: 'เหมือนกับการถามในกลุ่มไลน์ไหม?', a: 'ดีกว่าในหลายด้าน ในฟอรัมคุณจะได้ความเห็นจากคนเพียงคนเดียว บริการของเราวิเคราะห์คำอธิบายของคุณร่วมกับรูปภาพ เสียง หรือวิดีโอ เทียบกับรูปแบบอาการเสียหลายพันแบบ และให้ผลวินิจฉัยที่จัดอันดับพร้อมระดับความมั่นใจ' },
                { q: 'วินิจฉัยรถของฉันจากเสียงเครื่องยนต์อย่างเดียวได้ไหม?', a: 'ได้ เสียงเป็นหนึ่งในข้อมูลที่ทรงพลังที่สุดของเรา อัปโหลดเสียงเคาะ เสียงหวีด หรือเสียงเสียดสี — แค่ 10 วินาทีด้วยโทรศัพท์ก็เพียงพอ AI จะวิเคราะห์รูปแบบเสียงเพื่อระบุอาการเสียที่เป็นไปได้' },
                { q: 'ต้องสร้างบัญชีหรือเข้าสู่ระบบไหม?', a: 'ไม่ต้อง หมอรถ AI ฟรีทั้งหมดและไม่ต้องมีบัญชี สมัครสมาชิก หรือข้อมูลส่วนตัวใด ๆ ข้อมูลรถของคุณถูกบันทึกไว้ในเครื่องของคุณเอง' },
                { q: 'ประวัติของฉันถูกเก็บไว้ในเซิร์ฟเวอร์ของคุณไหม?', a: 'ไม่ ประวัติทั้งหมดถูกเก็บไว้ในอุปกรณ์ของคุณเท่านั้นผ่านที่เก็บข้อมูลในเครื่องของเบราว์เซอร์ เราไม่เก็บสิ่งใดในเซิร์ฟเวอร์ของเรานอกจากข้อความที่กำลังใช้งาน' },
                { q: 'การประเมินค่าซ่อมแม่นยำแค่ไหน?', a: 'อ้างอิงจากข้อมูลตลาดไนจีเรีย — ค่าอะไหล่และค่าแรงในอู่ที่ลากอส อาบูจา และพอร์ตฮาร์คอร์ต เราให้ช่วงราคา (ต่ำสุดถึงสูงสุด) เพื่อให้คุณรู้ว่าราคาใดสมเหตุสมผล หากอู่เสนอราคาสูงกว่าค่าสูงสุดของเรามาก ควรตรวจสอบเพิ่มเติม' },
                { q: 'สามารถขอค่าซ่อมสำหรับรถยี่ห้อไหนก็ได้ไหม?', a: 'ได้ เราครอบคลุม Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot และยี่ห้อใหญ่อื่น ๆ ไม่ว่าคุณจะขับที่ไหน ค่าซ่อมเป็นข้อมูลอ้างอิงระดับนานาชาติโดยประมาณ' },
                { q: 'ถ้าต้องการช่างเคลื่อนที่หรืออู่ใกล้บ้านล่ะ?', a: 'เครื่องมือของเราวินิจฉัยปัญหาก่อน เพื่อให้คุณรู้ว่าควรถามอะไรก่อนเริ่มค้นหา หากอาการเสียต้องตรวจสอบจริงหรือใช้อุปกรณ์เฉพาะ เราจะบอกคุณอย่างชัดเจน — และแนะนำว่าควรหาช่างหรืออู่ประเภทใด' },
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
            ตรวจสอบโดย <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link> ช่างซ่อมรถยนต์ ตรรกะการวินิจฉัยและช่วงค่าซ่อมได้รับการตรวจสอบความถูกต้องทางเทคนิคแล้ว
          </p>

          {/* คำกระตุ้นสุดท้าย */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              พร้อมหรือยัง? วินิจฉัยรถของคุณตอนนี้เลย
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              ฟรี รวดเร็ว ไม่ต้องสมัครสมาชิก รับผลวินิจฉัยของคุณได้เลยตอนนี้
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              เริ่มวินิจฉัยฟรี
            </a>
          </section>

          {/* เครื่องมืออื่น ๆ */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              เครื่องมือฟรีอื่น ๆ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'ตรวจสอบเลข VIN',            color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'รายการตรวจสอบเอกสาร',       color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'คำนวณภาษีนำเข้า',            color: 'emerald' },
              ].map(({ href, label, color }) => (
                <Link
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
