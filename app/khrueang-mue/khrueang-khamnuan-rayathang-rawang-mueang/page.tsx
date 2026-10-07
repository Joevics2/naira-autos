// app/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang/page.tsx

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import DistanceCalculatorThailandClient from './client';
import DistanceTable from '@/components/distance-calculator/DistanceTable';
import { TH_TOWNS, findTown } from '@/lib/distance-towns-th';
import { TH_CAPITAL_DISTANCE_KM } from '@/lib/th-distance-matrix';
import { alternatesFor } from '@/lib/hreflang';

export const metadata: Metadata = {
  title: "เครื่องคำนวณระยะทางระหว่างเมือง ประเทศไทย 2026 — ระยะทางถนน",
  description: "คำนวณระยะทางถนนและเวลาขับรถระหว่าง 23 เมืองในประเทศไทย เช่น กรุงเทพฯ เชียงใหม่ ภูเก็ต และพัทยา พร้อมเครื่องคำนวณค่าน้ำมัน",
  alternates: alternatesFor('/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang'),
  openGraph: {
    title: "เครื่องคำนวณระยะทางระหว่างเมือง ประเทศไทย 2026",
    description: "ระยะทางถนนและเวลาขับรถระหว่าง 23 เมืองในประเทศไทย พร้อมเครื่องคำนวณค่าน้ำมัน",
    url: 'https://www.naira.autos/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang',
    siteName: 'Naira Autos',
    locale: 'th',
    type: 'website',
  },
  keywords: ["ระยะทางระหว่างเมือง", "กรุงเทพ เชียงใหม่ กี่กิโล", "กรุงเทพ ภูเก็ต กี่กิโล", "คำนวณระยะทาง", "ค่าน้ำมัน กรุงเทพ เชียงใหม่"],
};

const HUB_TOWN = findTown("กรุงเทพฯ")!;

const FAQ = [{"q": "เครื่องมือนี้ครอบคลุมเมืองไหนบ้าง?", "a": "ครอบคลุม 23 เมืองใหญ่ทั่วประเทศไทย รวมถึงกรุงเทพฯ เชียงใหม่ ภูเก็ต พัทยา หาดใหญ่ และเมืองหลักในภาคอีสาน"}, {"q": "เวลาขับรถที่แสดงรวมสภาพจราจรหรือไม่?", "a": "แสดงสองค่า คือเวลาในอุดมคติและเวลาที่น่าจะเป็นจริง โดยอิงความเร็วเฉลี่ย ไม่ใช่ข้อมูลจราจรสด ควรเปิดเส้นทางใน Google Maps เพื่อดูสภาพจราจรปัจจุบัน"}, {"q": "ตัวเลขในหน้านี้แม่นยำแค่ไหน?", "a": "เป็นค่าประมาณทั้งหมด ยังไม่ได้ยืนยันกับแหล่งข้อมูลทางการ จึงเหมาะสำหรับวางแผนคร่าว ๆ ส่วนเส้นทางที่จะขับจริงให้เช็กใน Google Maps อีกครั้ง"}, {"q": "คำนวณค่าน้ำมันได้ไหม?", "a": "ได้ เลือกประเภทรถและราคาน้ำมันต่อลิตร (บาท) ในเครื่องคำนวณด้านบน ระบบจะแปลงระยะทางเป็นจำนวนลิตรและค่าใช้จ่ายโดยประมาณ"}];
const METHOD: string[] = ["ตัวเลขในหน้านี้เป็นระยะทางประมาณการทั้งหมด คำนวณจากระยะเส้นตรงระหว่างพิกัดของแต่ละเมือง แล้วคูณด้วยตัวปรับความคดเคี้ยวของถนนซึ่งปรับเทียบกับข้อมูลถนนที่ตรวจสอบแล้วของประเทศไนจีเรีย เรายังไม่พบแหล่งข้อมูลที่ครอบคลุมทุกเส้นทางในประเทศไทยและยืนยันได้จากหลายแหล่งอิสระ จึงไม่ทำเครื่องหมายเส้นทางใดว่า \"ยืนยันแล้ว\" แทนที่จะอ้างความแม่นยำที่เราไม่มี", "ระยะทางจริงอาจต่างจากตัวเลขนี้ได้พอสมควรขึ้นอยู่กับเส้นทางที่เลือก (มอเตอร์เวย์ ทางหลวงสายหลัก หรือทางลัด) ก่อนออกเดินทางไกลควรเช็กเส้นทางใน Google Maps อีกครั้ง"];

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang',
      name: "เครื่องคำนวณระยะทางระหว่างเมือง ประเทศไทย 2026 — ระยะทางถนน",
      description: "ระยะทางถนนและเวลาขับรถระหว่าง 23 เมืองในประเทศไทย พร้อมเครื่องคำนวณค่าน้ำมัน",
      url: 'https://www.naira.autos/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang',
      dateModified: '2026-10-02',
      inLanguage: 'th',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: "เครื่องมือ", item: 'https://www.naira.autos/khrueang-mue' },
        { '@type': 'ListItem', position: 2, name: "ประเทศไทย", item: 'https://www.naira.autos/khrueang-mue/khrueang-khamnuan-rayathang-rawang-mueang' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
    {
      '@type': 'SoftwareApplication',
      name: "เครื่องคำนวณระยะทางระหว่างเมือง ประเทศไทย",
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      inLanguage: 'th',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
    },
  ],
};

export default function DistanceCalculatorThailandPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div lang="th" className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12 space-y-8">
          <div className="flex items-center gap-3">
            <Link prefetch={false}
              href="/khrueang-mue"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-amber-500/20 border border-white/15 hover:border-amber-500/40 text-white/60 hover:text-amber-400 transition-all"
              aria-label="ย้อนกลับ"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-white/30">
              <Link prefetch={false} href="/khrueang-mue" className="hover:text-white/60 transition-colors">{"เครื่องมือ"}</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/60">{"ประเทศไทย"}</span>
            </nav>
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 mb-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">{"ฟรี · 23 เมือง"}</span>
            </div>
            <span className="inline-block text-[11px] text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full mb-4 ml-2">{"ตรวจสอบล่าสุด: ตุลาคม 2026"}</span>
            <h1 className="text-4xl sm:text-5xl font-black uppercase text-white mb-3 leading-none" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"ระยะทางระหว่างเมือง"}
            </h1>
            <p className="text-base text-white/50 leading-relaxed max-w-xl">
              {"คำนวณระยะทางถนนและเวลาขับรถระหว่าง 23 เมืองในประเทศไทย ตั้งแต่กรุงเทพฯ เชียงใหม่ ไปจนถึงภูเก็ตและหาดใหญ่"}
            </p>
            <Link prefetch={false} href="/tools/distance-calculator-countries" className="inline-block mt-3 text-xs text-amber-400 hover:text-amber-300 underline underline-offset-2">
              English version →
            </Link>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10">
            <DistanceCalculatorThailandClient />
          </div>
        </div>
      </div>

      <div lang="th" className="bg-white">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <div>
            <h2 className="text-2xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"ตัวเลขเหล่านี้มาจากไหน"}
            </h2>
            <div className="text-sm text-gray-600 leading-relaxed max-w-3xl space-y-3">
              {METHOD.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"อะไรที่ทำให้การเดินทางบนถนนไทยใช้เวลานานขึ้น"}
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed max-w-3xl">
              {"เวลาขับรถจริงมักนานกว่าที่ระยะทางบอก ช่วงสงกรานต์และปีใหม่ ถนนสายหลักไปภาคเหนือและภาคอีสานจะติดหนักมาก มอเตอร์เวย์บางสายเก็บค่าผ่านทาง เช่น สายกรุงเทพฯ–พัทยา ซึ่งควรรวมเข้ากับค่าน้ำมันในงบเดินทาง ส่วนฤดูฝนอาจมีน้ำท่วมขังและถนนลื่นในหลายพื้นที่ ถือตัวเลขในหน้านี้เป็นฐานวางแผนและเช็กสภาพจราจรล่าสุดก่อนออกเดินทาง"}
            </p>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
            {"ตรวจสอบโดย "}<Link prefetch={false} href="/about" className="underline underline-offset-2 hover:text-gray-900">Evelyn John</Link>{" ผู้เชี่ยวชาญด้านการขายรถยนต์ ระยะทางทั้งหมดเป็นค่าประมาณจากสูตร Haversine"}
          </p>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-1" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"ระยะทางจากกรุงเทพฯ ไปยังทุกเมือง (ใกล้ไปไกล)"}
            </h2>
            <p className="text-sm text-gray-500 mb-4">{"อีก 22 เมืองในเครื่องมือนี้ เรียงจากใกล้ไปไกลจากกรุงเทพฯ"}</p>
            <DistanceTable hub={HUB_TOWN} towns={TH_TOWNS} verifiedMatrix={TH_CAPITAL_DISTANCE_KM} />
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-gray-900 mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              {"คำถามที่พบบ่อย — ระยะทางระหว่างเมืองในประเทศไทย"}
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {FAQ.map(({ q, a }) => (
                <details key={q} className="group bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between px-4 py-3 cursor-pointer list-none gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-semibold text-gray-900">{q}</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-4 pb-4"><p className="text-sm text-gray-600 leading-relaxed">{a}</p></div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
