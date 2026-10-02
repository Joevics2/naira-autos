import { Wrench, Camera, ScanLine, Car, Ruler } from 'lucide-react';

// Single source of truth for the Thai tools index (/khrueang-mue).
// Add an entry here ONLY when that tool's Thai page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolTh = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_TH: ToolTh[] = [
  {
    href: '/khrueang-mue/mo-rot-ai',
    icon: Wrench,
    label: 'หมอรถ AI',
    description: 'อธิบายอาการเสีย อัปโหลดรูปภาพ เสียง หรือวิดีโอ แล้วรับผลวินิจฉัยพร้อมค่าซ่อมภายในไม่กี่วินาที',
    badge: 'ฟรี',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI และเครื่องมืออัจฉริยะ',
  },
  {
    href: '/khrueang-mue/rot-khong-chan-rakha-thaorai',
    icon: Camera,
    label: 'รถของฉันราคาเท่าไหร่?',
    description: 'อัปโหลดภาพเดียว ให้ AI ประเมินมูลค่าตลาดเป็นสกุลเงินของคุณภายในไม่กี่วินาที',
    badge: 'ฟรี',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI และเครื่องมืออัจฉริยะ',
  },
  {
    href: '/khrueang-mue/truat-sop-lek-tua-thang',
    icon: ScanLine,
    label: 'ตรวจสอบเลขตัวถัง (VIN)',
    description: 'ตรวจสอบเลขตัวถัง (VIN) ฟรี — ดูยี่ห้อ รุ่น ปีที่ผลิต เครื่องยนต์ และประเทศผู้ผลิตได้ทันที',
    badge: 'ฟรี',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'การตรวจสอบ',
  },
  {
    href: "/khrueang-mue/rot-thi-dithisut-samrap-khun",
    icon: Car,
    label: "รถที่ดีที่สุดสำหรับคุณ",
    description: "เลือกการใช้งาน เช่น ครอบครัว พาณิชย์ ทางด่วน งบจำกัด ทางลำบาก หรือผู้บริหาร แล้วรับคำแนะนำพร้อมราคาท้องถิ่นใน 55 ประเทศ",
    badge: "ใหม่",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "ค่าใช้จ่ายและการบำรุงรักษา",
  },
  {
    href: '/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang',
    icon: Ruler,
    label: "เครื่องคำนวณระยะทางระหว่างเมือง",
    description: "คำนวณระยะทางถนนและเวลาขับรถระหว่าง 23 เมืองในประเทศไทย พร้อมเครื่องคำนวณค่าน้ำมัน",
    badge: "ใหม่",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "ค่าใช้จ่ายและการบำรุงรักษา",
  },
];

export const CATEGORIES_TH = ['AI และเครื่องมืออัจฉริยะ', 'การเงิน', 'ค่าใช้จ่ายและการบำรุงรักษา', 'การตรวจสอบ', 'แหล่งข้อมูล'];
