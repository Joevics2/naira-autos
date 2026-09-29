import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientTh from '@/components/VINCheckerClientTh';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี — ดูยี่ห้อ รุ่น ปีผลิตทันที | Naira Autos',
  description: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี ดูยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ และประเทศผู้ผลิตได้ทันที — ไม่ต้องสมัครสมาชิก เหมาะสำหรับตรวจสอบก่อนซื้อรถนำเข้า',
  keywords: ['ตรวจสอบเลขตัวถังฟรี', 'เช็ค vin ฟรี', 'ดูเลขตัวถังรถยังไง', 'ถอดรหัส vin ฟรี', 'เช็คเลขตัวถังรถนำเข้า', 'เลขตัวถังอยู่ตรงไหน', 'ตรวจสอบหมายเลข vin', 'ยืนยันเลขตัวถังรถ'],
  alternates: alternatesFor('/khrueang-mue/truat-sop-lek-tua-thang'),
  openGraph: {
    title: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี | Naira Autos',
    description: 'ดูยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ และแหล่งผลิตของรถคันไหนก็ได้ฟรีและทันทีจากเลขตัวถัง',
    url: 'https://www.naira.autos/khrueang-mue/truat-sop-lek-tua-thang',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/khrueang-mue/truat-sop-lek-tua-thang',
      name: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี — ดูยี่ห้อ รุ่น ปีผลิตทันที',
      description: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี — ยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ และประเทศผู้ผลิต',
      url: 'https://www.naira.autos/khrueang-mue/truat-sop-lek-tua-thang',
      inLanguage: 'th',
      dateModified: '2026-09-29',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'หน้าหลัก', item: 'https://www.naira.autos/na-lak' },
        { '@type': 'ListItem', position: 2, name: 'เครื่องมือ', item: 'https://www.naira.autos/khrueang-mue' },
        { '@type': 'ListItem', position: 3, name: 'ตรวจสอบเลขตัวถัง', item: 'https://www.naira.autos/khrueang-mue/truat-sop-lek-tua-thang' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'การตรวจสอบนี้ฟรีจริงหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ใช่ เป็นบริการฟรี 100% โดยใช้ API สาธารณะของ NHTSA ไม่ต้องมีบัญชีหรือสมัครสมาชิก ตรวจสอบได้ไม่จำกัดจำนวนครั้ง จากทุกประเทศ' } },
        { '@type': 'Question', name: 'เลขตัวถังรถใช้ทำอะไร?', acceptedAnswer: { '@type': 'Answer', text: 'เลขตัวถังใช้ยืนยันข้อมูลจำเพาะของรถ ตรวจสอบประวัติ ใช้ในการจดทะเบียน ทำประกัน และการแจ้งเตือนเรียกคืนรถ ในประเทศไทยจะปรากฏในเล่มทะเบียนและต้องใช้ทุกครั้งที่โอนกรรมสิทธิ์' } },
        { '@type': 'Question', name: 'ฉันสามารถดูข้อมูลจำเพาะจากเลขตัวถังได้ฟรีหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ได้ เครื่องมือถอดรหัสฟรีของเราให้ข้อมูลยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ ตัวถัง เกียร์ และแหล่งผลิต จากฐานข้อมูลผู้ผลิตของ NHTSA ฟรี สำหรับรถที่ผลิตแบบสเปกสหรัฐฯ แคนาดา หรือเม็กซิโก' } },
        { '@type': 'Question', name: 'ใช้ได้กับรถที่นำเข้าจากสหรัฐฯ มาไทยหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ได้ โดยเฉพาะรถที่ผลิตขึ้นสำหรับตลาดอเมริกาเหนือ — พบได้ทั่วไปในกลุ่มผู้ซื้อกระบะนำเข้าและรถอเมริกันคลาสสิก รถที่เป็นสเปกยุโรปเท่านั้นอาจไม่ปรากฏในฐานข้อมูลนี้' } },
        { '@type': 'Question', name: 'จะรู้ได้อย่างไรว่าเลขตัวถังเป็นของจริง?', acceptedAnswer: { '@type': 'Answer', text: 'เลขตัวถังที่ถูกต้องต้องมี 17 ตัวอักษรพอดี — ตัวอักษร (ยกเว้น I, O, Q) และตัวเลข ตำแหน่งที่ 9 เป็นตัวเลขตรวจสอบทางคณิตศาสตร์ ถ้าไม่ตรงกัน แสดงว่าตัวเลขถูกดัดแปลง เครื่องมือนี้ตรวจสอบสิ่งนี้ให้อัตโนมัติ' } },
        { '@type': 'Question', name: 'ถ้าค้นหาแล้วไม่มีผลลัพธ์จะเป็นเพราะอะไร?', acceptedAnswer: { '@type': 'Answer', text: 'มักหมายความว่ารถคันนั้นผลิตสำหรับตลาดยุโรป เอเชีย หรือภูมิภาคอื่นที่ไม่อยู่ในฐานข้อมูลของ NHTSA ถึงอย่างนั้น ปีรุ่นยังคงคำนวณได้จากตำแหน่งที่ 10 ของเลขตัวถัง ในกรณีนี้ควรติดต่อบริการถอดรหัส VIN อย่างเป็นทางการของผู้ผลิต' } },
        { '@type': 'Question', name: 'เลขเครื่องยนต์กับเลขตัวถังเป็นเลขเดียวกันหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ไม่ใช่ เลขเครื่องยนต์สลักอยู่บนเสื้อสูบและระบุเฉพาะเครื่องยนต์ตัวนั้น ส่วนเลขตัวถัง (VIN) ระบุตัวรถทั้งคัน เครื่องมือนี้ถอดรหัสเลขตัวถัง ไม่ใช่เลขเครื่องยนต์ซึ่งเป็นคนละส่วนกัน' } },
        { '@type': 'Question', name: 'เลขตัวถังมีผลต่อภาษีนำเข้าหรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'มีผลทางอ้อม หลายประเทศคำนวณภาษีนำเข้าจากอายุรถและความจุเครื่องยนต์ ซึ่งทั้งสองอย่างสามารถยืนยันได้จากเลขตัวถัง การถอดรหัสให้ถูกต้องก่อนคำนวณภาษีช่วยป้องกันการวางแผนผิดพลาดจากตัวเลขที่คลาดเคลื่อน' } },
        { '@type': 'Question', name: 'การตรวจสอบเลขตัวถังบอกประวัติอุบัติเหตุของรถได้หรือไม่?', acceptedAnswer: { '@type': 'Answer', text: 'ไม่ได้ การตรวจสอบฟรีนี้แสดงเฉพาะข้อมูลจำเพาะจากโรงงาน — ยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ และแหล่งผลิต หากต้องการประวัติอุบัติเหตุ เลขไมล์ หรือประวัติน้ำท่วม ต้องใช้รายงานแบบเสียเงินอย่าง Carfax หรือ AutoCheck' } },
        { '@type': 'Question', name: 'ตรวจสอบจากเลขตัวถังได้หรือไม่ว่ารถถูกขโมยมา?', acceptedAnswer: { '@type': 'Answer', text: 'เครื่องมือนี้ตรวจสอบให้ไม่ได้ การตรวจสอบรถที่ถูกขโมยเป็นหน้าที่ของตำรวจและบริษัทประกันภัย ในสหรัฐฯ มีบริการฟรีชื่อ VINCheck จาก NICB (National Insurance Crime Bureau) ซึ่งเป็นบริการคนละแบบกับเครื่องมือถอดรหัสข้อมูลจำเพาะนี้' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function TruatSopLekTuaThangPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/khrueang-mue" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="ย้อนกลับ">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/na-lak" className="hover:text-white/60 transition-colors">หน้าหลัก</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/khrueang-mue" className="hover:text-white/60 transition-colors">เครื่องมือ</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">ตรวจสอบเลขตัวถัง</span>
            </nav>
            <LanguagePills path="/khrueang-mue/truat-sop-lek-tua-thang" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">ฟรี 100%</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">ข้อมูลจาก NHTSA</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              ตรวจสอบเลขตัวถัง (VIN)<br /><span className="text-blue-400">ฟรีและได้ผลทันที</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">ดูข้อมูลรถจากเลขตัวถังภายในไม่กี่วินาที</p>
            <p className="text-white/75 text-sm leading-relaxed">กรอกเลขตัวถัง 17 หลักจากหน้าปัด ประตู หรือตัวถังรถ ดูยี่ห้อ รุ่น ปีที่ผลิต ข้อมูลเครื่องยนต์ และประเทศผู้ผลิตได้ฟรีโดยไม่ต้องสมัครสมาชิก เหมาะสำหรับตรวจสอบก่อนซื้อรถนำเข้ามาไทย</p>
          </div>
        </div>
      </div>

      <VINCheckerClientTh />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ตรวจสอบเลขตัวถังฟรีสำหรับรถมือสองทุกคัน</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">เครื่องมือถอดรหัสเลขตัวถังฟรีของเรา</strong> ใช้ฐานข้อมูลสาธารณะของสำนักงานความปลอดภัยการจราจรบนทางหลวงแห่งชาติสหรัฐฯ (NHTSA) การตรวจสอบฟรีนี้จะให้ข้อมูลยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ เกียร์ ประเภทตัวถัง และโรงงานที่ประกอบ — ทุกอย่างที่คุณต้องใช้เพื่อยืนยันว่ารถมือสองคันนั้นตรงกับที่ผู้ขายบอกจริงหรือไม่ ก่อนที่จะตัดสินใจซื้อ</p>
                  <p>ตลาดรถมือสองในปัจจุบันมีความเป็นสากลมากขึ้นเรื่อยๆ รถที่ผลิตสำหรับสหรัฐฯ แคนาดา หรือเม็กซิโก ถูกส่งออกและจดทะเบียนใหม่อยู่ตลอดเวลา — ไม่ว่าจะเป็นรถกระบะนำเข้ามาขายในประเทศไทย หรือรถอเมริกันคลาสสิกที่ขายในภูมิภาคนี้ เพราะเลขตัวถังถูกสลักไว้ตั้งแต่ในโรงงานและไม่มีวันเปลี่ยนแปลง การตรวจสอบฟรีจึงทำงานได้เหมือนกันไม่ว่ารถจะไปอยู่ที่ไหน ตราบใดที่รถคันนั้นผลิตขึ้นมาสำหรับตลาดอเมริกาเหนือแต่แรก</p>
                  <p>ประเด็นสำคัญคือ เลขตัวถังไม่ใช่ทะเบียนที่ออกโดยประเทศของคุณ แต่เป็นรหัสประจำตัวที่สลักไว้ตั้งแต่ขั้นตอนการผลิต ก่อนที่รถจะออกจากโรงงานเสียอีก แม้รถจะถูกส่งออก จดทะเบียนใหม่ เปลี่ยนป้ายทะเบียน หรือเปลี่ยนมือกี่ครั้งก็ตาม เลขนี้จะไม่เปลี่ยน ด้วยเหตุนี้ การตรวจสอบเลขตัวถังฟรีจึงสามารถติดตามรถข้ามพรมแดนได้ในแบบที่ป้ายทะเบียนทำไม่ได้</p>
                  <p>คนส่วนใหญ่มักตรวจสอบเลขตัวถังหลังจากต่อรองราคาเสร็จแล้ว แต่ที่ถูกต้องคือควรตรวจสอบก่อนไปดูรถ ก่อนวางเงินมัดจำใดๆ และอีกครั้งหลังรับรถ — เพื่อให้แน่ใจว่าไม่มีอะไรถูกเปลี่ยนระหว่างการส่งมอบ ไม่มีค่าใช้จ่ายและใช้เวลาไม่ถึงนาที</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ตรวจสอบเลขตัวถังสำหรับรถในประเทศไทย</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">ประเทศไทย</strong> — เลขตัวถังปรากฏอยู่ในเล่มทะเบียนรถ และเจ้าหน้าที่กรมการขนส่งทางบกจะตรวจสอบให้ตรงกับตัวรถจริงในทุกขั้นตอนการโอนหรือต่อทะเบียน รถกระบะและรถอเมริกันคลาสสิกที่นำเข้ามาจำนวนไม่น้อยผลิตขึ้นสำหรับตลาดอเมริกาเหนือโดยตรง ทำให้การตรวจสอบฟรีนี้ให้ผลลัพธ์ที่น่าเชื่อถือได้ก่อนที่จะไปถึงขั้นตอนทางกฎหมาย</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>กำลังจะซื้อรถนำเข้า? ทำสิ่งนี้ก่อน</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>การซื้อรถนำเข้ามีความเสี่ยงเพิ่มเติมที่การซื้อรถในประเทศไม่มี — เอกสาร ผู้ขาย และสภาพจริงของรถอาจมาจากประเทศที่คุณไม่เคยไป การตรวจสอบเลขตัวถังฟรีไม่ได้แทนที่การตรวจเช็คสภาพรถ แต่เป็นตัวกรองแรกที่ไม่มีต้นทุนก่อนตัดสินใจไปขั้นตอนต่อไป</p>
                  <p>ให้ถอดรหัสเลขตัวถังก่อน แล้วเทียบผลลัพธ์ — ปีที่ผลิต รุ่น เครื่องยนต์ อุปกรณ์ — กับสิ่งที่ผู้ขายระบุไว้อย่างละเอียด ความคลาดเคลื่อนแม้เพียงเล็กน้อย เช่น ข้อมูลเครื่องยนต์ผิด อาจเป็นสัญญาณแรกว่ารูปในประกาศกับเอกสารจริงไม่ใช่รถคันเดียวกัน จากนั้นตรวจสอบว่าเลขที่หน้าปัดตรงกับเลขที่สลักบนตัวถังและป้ายที่ประตูจริงหรือไม่ ความไม่ตรงกันระหว่างสามจุดนี้เป็นสัญญาณที่ชัดเจนที่สุดของเลขตัวถังที่ถูกดัดแปลง</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>เลขตัวถังกับ VIN คือสิ่งเดียวกันหรือไม่?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>ใช่ ทั้งสองคือรหัส 17 หลักเดียวกันทุกประการ <strong className="text-foreground">VIN</strong> (Vehicle Identification Number) เป็นคำสากล ส่วน <strong className="text-foreground">เลขตัวถัง</strong> หรือ <strong className="text-foreground">เลขไช่ซี</strong> เป็นคำที่ใช้กันทั่วไปในภาษาไทย สามหลักแรกระบุผู้ผลิตและประเทศที่ผลิต ส่วนหลักที่เก้าเป็นตัวเลขตรวจสอบที่คำนวณทางคณิตศาสตร์</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>วิธีอ่านเลขตัวถัง: แต่ละส่วนหมายถึงอะไร</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17 หลักไม่ได้สุ่มมาเฉยๆ หลักที่ 1-3 ระบุผู้ผลิตและประเทศที่ผลิต — เครื่องมือถอดรหัสใช้ส่วนนี้เพื่อรู้ว่ารถผลิตในสหรัฐฯ แคนาดา หรือเม็กซิโกหรือไม่ หลักที่ 4-8 ระบุตัวรถ ได้แก่ ประเภทตัวถัง เครื่องยนต์ และซีรีส์ หลักที่ 9 เป็นตัวเลขตรวจสอบที่คำนวณทางคณิตศาสตร์เพื่อตรวจจับเลขที่พิมพ์ผิดหรือถูกดัดแปลง หลักที่ 10 ระบุปีรุ่น และหลักที่ 12-17 คือหมายเลขการผลิตเฉพาะของรถคันนั้น</p>
                  <p>การรู้จักอ่านส่วนเหล่านี้ด้วยตัวเองมีประโยชน์ แม้จะมีเครื่องมือถอดรหัสอยู่แล้วก็ตาม เพราะช่วยให้คุณยืนยันผลลัพธ์ได้ภายในไม่กี่วินาที ถ้าหลักที่ 10 บ่งบอกว่าเป็นรุ่นปี 2015 แต่ผู้ขายบอกว่าเป็นรุ่นปี 2018 การถามตรงๆ ก็สมเหตุสมผล — นี่ไม่ใช่การกล่าวหา แต่เป็นการตรวจสอบที่ไม่มีต้นทุนและใช้เวลาสามสิบวินาที</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ใช้ได้กับทุกยี่ห้อ — Ford, Toyota, Honda, Chevrolet และอื่นๆ</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>นี่ไม่ใช่เครื่องมือเฉพาะยี่ห้อใดยี่ห้อหนึ่ง เพราะอ่านข้อมูลตรงจากฐานข้อมูลผู้ผลิตของ NHTSA เครื่องมือถอดรหัสตัวเดียวกันนี้ใช้ได้กับ Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai และยี่ห้ออื่นๆ ที่ขายในตลาดอเมริกาเหนือ เพียงวางเลข 17 หลัก — เครื่องมือจะจดจำรูปแบบของผู้ผลิตที่ถูกต้องโดยอัตโนมัติโดยไม่ต้องระบุยี่ห้อเอง</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ตรวจสอบเลขตัวถัง vs รายงานประวัติรถแบบเต็ม</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">การตรวจสอบเลขตัวถังฟรี</strong> จะบอกสภาพรถตอนออกจากโรงงาน — คือข้อมูลจำเพาะการผลิต ส่วนสิ่งที่เกิดขึ้นหลังจากนั้น เช่น ประวัติอุบัติเหตุ เลขไมล์ที่ถูกปรับเปลี่ยน หรือประวัติน้ำท่วม ต้องใช้<strong className="text-foreground">รายงานประวัติรถ</strong>แบบเสียเงินอย่าง Carfax หรือ AutoCheck สำหรับรถมือสองราคาสูง แนะนำให้ใช้ทั้งสองอย่างควบคู่กัน</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>ตรวจสอบเลขตัวถัง — คำถามที่พบบ่อย</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'การตรวจสอบนี้ฟรีจริงหรือไม่?', a: 'ใช่ เป็นบริการฟรี 100% โดยใช้ API สาธารณะของ NHTSA ไม่ต้องมีบัญชีหรือสมัครสมาชิก ตรวจสอบได้ไม่จำกัดจำนวนครั้ง จากทุกประเทศ' },
                { q: 'เลขตัวถังรถใช้ทำอะไร?', a: 'เลขตัวถังใช้ยืนยันข้อมูลจำเพาะของรถ ตรวจสอบประวัติ ใช้ในการจดทะเบียน ทำประกัน และการแจ้งเตือนเรียกคืนรถ ในประเทศไทยจะปรากฏในเล่มทะเบียนและต้องใช้ทุกครั้งที่โอนกรรมสิทธิ์' },
                { q: 'ฉันสามารถดูข้อมูลจำเพาะจากเลขตัวถังได้ฟรีหรือไม่?', a: 'ได้ เครื่องมือถอดรหัสฟรีของเราให้ข้อมูลยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ ตัวถัง เกียร์ และแหล่งผลิต จากฐานข้อมูลผู้ผลิตของ NHTSA ฟรี' },
                { q: 'ใช้ได้กับรถที่นำเข้าจากสหรัฐฯ มาไทยหรือไม่?', a: 'ได้ โดยเฉพาะรถที่ผลิตขึ้นสำหรับตลาดอเมริกาเหนือ — พบได้ทั่วไปในกลุ่มผู้ซื้อกระบะนำเข้าและรถอเมริกันคลาสสิก รถสเปกยุโรปเท่านั้นอาจไม่ปรากฏในฐานข้อมูลนี้' },
                { q: 'จะรู้ได้อย่างไรว่าเลขตัวถังเป็นของจริง?', a: 'เลขตัวถังที่ถูกต้องต้องมี 17 ตัวอักษรพอดี — ตัวอักษร (ยกเว้น I, O, Q) และตัวเลข หลักที่ 9 เป็นตัวเลขตรวจสอบทางคณิตศาสตร์ ถ้าไม่ตรงกัน แสดงว่าเลขถูกดัดแปลง เครื่องมือนี้ตรวจสอบให้อัตโนมัติ' },
                { q: 'ถ้าค้นหาแล้วไม่มีผลลัพธ์จะเป็นเพราะอะไร?', a: 'มักหมายความว่ารถผลิตสำหรับตลาดยุโรป เอเชีย หรือภูมิภาคอื่นที่ไม่อยู่ในฐานข้อมูลของ NHTSA ปีรุ่นยังคำนวณได้จากหลักที่ 10 ของเลขตัวถัง ควรติดต่อบริการถอดรหัส VIN ของผู้ผลิตในกรณีนี้' },
                { q: 'เลขเครื่องยนต์กับเลขตัวถังเป็นเลขเดียวกันหรือไม่?', a: 'ไม่ใช่ เลขเครื่องยนต์สลักบนเสื้อสูบและระบุเฉพาะเครื่องยนต์ตัวนั้น ส่วนเลขตัวถัง (VIN) ระบุตัวรถทั้งคัน เครื่องมือนี้ถอดรหัสเลขตัวถัง ไม่ใช่เลขเครื่องยนต์' },
                { q: 'เลขตัวถังมีผลต่อภาษีนำเข้าหรือไม่?', a: 'มีผลทางอ้อม หลายประเทศคำนวณภาษีนำเข้าจากอายุรถและความจุเครื่องยนต์ ซึ่งยืนยันได้จากเลขตัวถัง การถอดรหัสให้ถูกต้องก่อนคำนวณภาษีช่วยป้องกันการวางแผนผิดพลาด' },
                { q: 'การตรวจสอบเลขตัวถังบอกประวัติอุบัติเหตุของรถได้หรือไม่?', a: 'ไม่ได้ การตรวจสอบฟรีนี้แสดงเฉพาะข้อมูลจำเพาะจากโรงงาน หากต้องการประวัติอุบัติเหตุ เลขไมล์ หรือประวัติน้ำท่วม ต้องใช้รายงานแบบเสียเงินอย่าง Carfax หรือ AutoCheck' },
                { q: 'ตรวจสอบจากเลขตัวถังได้หรือไม่ว่ารถถูกขโมยมา?', a: 'เครื่องมือนี้ตรวจสอบให้ไม่ได้ การตรวจสอบรถที่ถูกขโมยเป็นหน้าที่ของตำรวจและบริษัทประกันภัย ในสหรัฐฯ มีบริการฟรีชื่อ VINCheck จาก NICB ซึ่งเป็นบริการคนละแบบกับเครื่องมือนี้' },
              ].map(({ q, a }) => (
                <details key={q} className="group bg-card border border-border rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3">
                    <span className="text-sm font-semibold text-foreground">{q}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-muted-foreground leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              เครื่องมือฟรีอื่นๆ
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/khrueang-mue/rot-khong-chan-rakha-thaorai" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">รถของฉันราคาเท่าไหร่?</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/strumenti/verifica-numero-di-telaio" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 hover:bg-sky-100 dark:hover:bg-sky-500/20 transition-all">
                <p className="text-sm font-bold text-sky-700 dark:text-sky-400">Verifica Telaio (Italiano)</p>
                <ChevronRight className="h-4 w-4 text-sky-500" />
              </Link>
              <Link href="/araclar/sasi-numarasi-sorgulama" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Şasi Numarası (Türkçe)</p>
                <ChevronRight className="h-4 w-4 text-amber-500" />
              </Link>
              <Link href="/tools/vin-checker-global" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">VIN Checker (English)</p>
                <ChevronRight className="h-4 w-4 text-blue-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
