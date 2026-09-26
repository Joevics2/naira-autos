import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Sparkles, CheckCircle2, AlertCircle, TrendingUp, Shield, ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react';
import { XeCuaToiDangGiaBaoNhieuClient } from './client';

export const metadata: Metadata = {
  title: 'Xe Của Tôi Đáng Giá Bao Nhiêu? Định Giá AI Miễn Phí | Naira Autos',
  description: 'Định giá xe của bạn miễn phí bằng AI, theo đúng loại tiền tệ của bạn. Tải lên một ảnh, nhận giá ngay lập tức — Việt Nam và nhiều quốc gia khác.',
  keywords: 'xe của tôi đáng giá bao nhiêu, định giá xe miễn phí, giá xe cũ, định giá xe bằng ai, tính giá trị xe',
  openGraph: {
    title: 'Xe Của Tôi Đáng Giá Bao Nhiêu? Định Giá AI Miễn Phí',
    description: 'Định giá xe của bạn bằng AI, theo đúng loại tiền tệ của bạn. Tải lên một ảnh, nhận ước tính ngay lập tức — hoàn toàn miễn phí.',
    url: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
    siteName: 'Naira Autos',
    locale: 'vi',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
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
      nl: 'https://www.naira.autos/gereedschappen/wat-is-mijn-auto-waard',
      'x-default': 'https://www.naira.autos/evaluate-used-car',
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Xe Của Tôi Đáng Giá Bao Nhiêu? Định Giá AI Miễn Phí',
  description: 'Công cụ định giá xe bằng AI miễn phí. Ước tính ngay theo loại tiền tệ của bạn, hiệu chỉnh theo thị trường quốc gia của bạn.',
  url: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
  inLanguage: 'vi',
  dateModified: '2026-09-20',
  mainEntity: {
    '@type': 'SoftwareApplication',
    name: 'Định Giá Xe Bằng AI — Naira Autos',
    applicationCategory: 'AutomotiveApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0' },
    description: 'Tải lên ảnh xe của bạn, nhận ước tính giá trị thị trường ngay lập tức bằng AI theo đúng loại tiền tệ của bạn.',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang Chủ', item: 'https://www.naira.autos/trang-chu' },
      { '@type': 'ListItem', position: 2, name: 'Công Cụ', item: 'https://www.naira.autos/cong-cu' },
      { '@type': 'ListItem', position: 3, name: 'Xe Của Tôi Đáng Giá Bao Nhiêu', item: 'https://www.naira.autos/cong-cu/xe-cua-toi-dang-gia-bao-nhieu' },
    ],
  },
  faqPage: {
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: 'Xe cũ của tôi đáng giá bao nhiêu?', acceptedAnswer: { '@type': 'Answer', text: 'Điều này phụ thuộc vào hãng, dòng xe, năm sản xuất, phiên bản, số km đã đi và tình trạng tổng thể, cũng như giá bán hiện tại của những xe tương tự tại quốc gia của bạn. Hãy tải lên một ảnh ở trên và chọn quốc gia của bạn — AI sẽ nhận diện xe của bạn và đưa ra khoảng giá theo đúng loại tiền tệ của bạn, dựa trên các tin đăng thực tế trên thị trường đó.' } },
      { '@type': 'Question', name: 'Những yếu tố nào ảnh hưởng đến việc định giá một chiếc xe cũ?', acceptedAnswer: { '@type': 'Answer', text: 'Các yếu tố quan trọng nhất là: (1) Hãng và dòng xe — một số xe giữ giá tốt hơn tùy thị trường. (2) Năm sản xuất, phiên bản và số km đã đi. (3) Tình trạng thân vỏ và sơn xe. (4) Tình trạng máy móc và lịch sử bảo dưỡng. (5) Giấy tờ xe và đăng ký đầy đủ. (6) Cung cầu tại địa phương — cùng một chiếc xe có thể có giá trị khác nhau tùy quốc gia.' } },
      { '@type': 'Question', name: 'Quốc gia của tôi có ảnh hưởng đến việc định giá không?', acceptedAnswer: { '@type': 'Answer', text: 'Có, ảnh hưởng khá nhiều. Thuế nhập khẩu, nhu cầu địa phương đối với một số hãng xe nhất định, sức mạnh của đồng tiền và quy mô thị trường xe cũ khiến giá cả chênh lệch đáng kể giữa các quốc gia. Công cụ của chúng tôi hỗ trợ nhiều quốc gia và đưa ra ước tính theo đúng loại tiền tệ địa phương, được hiệu chỉnh theo thị trường đó thay vì mức trung bình toàn cầu.' } },
      { '@type': 'Question', name: 'Định giá bằng AI có chính xác đến mức nào?', acceptedAnswer: { '@type': 'Answer', text: 'Công cụ của chúng tôi sử dụng công nghệ thị giác máy tính để xác định chính xác hãng, dòng xe, năm sản xuất và phiên bản từ ảnh của bạn, sau đó đối chiếu với dữ liệu tin đăng thực tế tại quốc gia bạn chọn để đưa ra một khoảng giá thay vì một con số duy nhất. Hãy xem đây là điểm khởi đầu đáng tin cậy để thương lượng, không phải mức giá chính xác tuyệt đối — giá trị thực tế luôn phụ thuộc vào việc kiểm tra trực tiếp và thương lượng.' } },
      { '@type': 'Question', name: 'Công cụ định giá này có thực sự miễn phí không?', acceptedAnswer: { '@type': 'Answer', text: 'Có. Không mất phí, không cần tạo tài khoản, không giới hạn số lần sử dụng.' } },
    ],
  },
};

const VALUATION_FACTORS = [
  { icon: TrendingUp, title: 'Hãng xe và giá trị bán lại', body: 'Khả năng giữ giá khi bán lại thay đổi theo thị trường — Toyota và Honda thường giữ giá tốt ở nhiều khu vực, trong khi các thương hiệu sang trọng của Đức có thể mất giá nhanh hơn tại những thị trường có chi phí bảo dưỡng cao. Nhu cầu địa phương quan trọng không kém tên thương hiệu.' },
  { icon: Shield, title: 'Số km đã đi và lịch sử bảo dưỡng', body: 'Số km thấp cùng lịch sử bảo dưỡng có ghi chép là hai chỉ số đáng tin cậy nhất cho một chiếc xe được chăm sóc tốt, ở bất cứ đâu trên thế giới. Hồ sơ bảo dưỡng đều đặn có thể còn giá trị hơn cả một chiếc xe đời mới hơn một năm.' },
  { icon: CheckCircle2, title: 'Giấy tờ và quyền sở hữu', body: 'Giấy tờ xe đầy đủ, hợp lệ và đăng ký cập nhật là điều không thể thiếu để đạt được giá tốt nhất ở mọi thị trường. Giấy tờ thiếu sót hoặc vấn đề nhập khẩu có thể làm giảm giá từ 15% đến 25%.' },
  { icon: AlertCircle, title: 'Tình trạng tổng thể', body: 'Một chiếc xe có thân vỏ sạch, không trầy xước, không gỉ sét hay bạc màu sơn, cùng động cơ vận hành tốt về mặt cơ khí, luôn có giá cao hơn từ 10% đến 15% so với một chiếc xe tương tự nhưng có dấu hiệu sử dụng rõ rệt.' },
];

const FAQ_ITEMS = [
  { q: 'Xe cũ của tôi đáng giá bao nhiêu?', a: 'Phụ thuộc vào hãng, dòng xe, năm sản xuất, phiên bản, số km đã đi và tình trạng — cũng như giá bán hiện tại của các xe tương tự tại quốc gia của bạn. Tải lên một ảnh và chọn quốc gia của bạn để nhận ước tính AI theo đúng loại tiền tệ của bạn.' },
  { q: 'Những yếu tố nào ảnh hưởng đến việc định giá một chiếc xe cũ?', a: 'Hãng và dòng xe, năm sản xuất và phiên bản, số km đã đi, tình trạng thân vỏ và máy móc, giấy tờ xe đầy đủ, cùng cung cầu tại thị trường của bạn.' },
  { q: 'Quốc gia của tôi có ảnh hưởng đến việc định giá không?', a: 'Có — thuế nhập khẩu, nhu cầu địa phương với một số hãng xe, sức mạnh đồng tiền và quy mô thị trường khiến giá cả khác nhau giữa các quốc gia. Chúng tôi hỗ trợ nhiều quốc gia và đưa ra giá theo đúng loại tiền tệ địa phương của bạn.' },
  { q: 'Làm sao để định giá đúng xe của tôi trước khi bán?', a: 'Sử dụng công cụ định giá AI miễn phí của chúng tôi để có một con số tham khảo, sau đó kiểm tra các tin đăng đang hoạt động của những xe tương tự tại địa phương. Đặt giá cao hơn 5-10% so với mức thấp nhất bạn có thể chấp nhận thường sẽ để lại khoảng trống để thương lượng.' },
  { q: 'Định giá bằng AI có chính xác đến mức nào?', a: 'Sử dụng công nghệ thị giác máy tính để xác định chính xác xe của bạn từ ảnh, sau đó đối chiếu với dữ liệu tin đăng thực tế tại quốc gia bạn chọn. Hãy xem đây là điểm khởi đầu đáng tin cậy, không phải mức giá chính xác tuyệt đối — giá trị thực tế phụ thuộc vào việc kiểm tra và thương lượng.' },
  { q: 'Công cụ định giá xe này có miễn phí không?', a: 'Có — không mất phí, không cần tạo tài khoản, không giới hạn sử dụng.' },
];

export default function XeCuaToiDangGiaBaoNhieuPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-background">

        {/* ── Dark hero ── */}
        <div className="bg-[#080C10] pt-16 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center gap-3 mb-6 text-left">
              <Link href="/cong-cu" className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 hover:bg-amber-400/20 border border-white/15 hover:border-amber-400/40 text-white/60 hover:text-amber-400 transition-all flex-shrink-0" aria-label="Quay lại">
                <ArrowLeft className="h-3.5 w-3.5" />
              </Link>
              <nav aria-label="Đường dẫn điều hướng" className="flex items-center gap-1.5 text-xs text-white/30">
                <Link href="/trang-chu" className="hover:text-white/60 transition-colors">Trang Chủ</Link>
                <ChevronRight className="h-3 w-3" />
                <Link href="/cong-cu" className="hover:text-white/60 transition-colors">Công Cụ</Link>
                <ChevronRight className="h-3 w-3" />
                <span className="text-white/50">Xe Của Tôi Đáng Giá Bao Nhiêu</span>
              </nav>
            </div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/25 text-amber-400 text-[11px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" />
                Bằng AI · Miễn Phí
              </span>
              <Link href="/evaluate-used-car" className="text-[11px] text-white/40 hover:text-white/70 underline underline-offset-2 transition-colors">
                Read in English →
              </Link>
            </div>
            <h1 className="font-black uppercase text-white leading-[0.9] tracking-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(32px, 5vw, 64px)' }}>
              Xe của bạn<br /><span className="text-amber-400">đáng giá bao nhiêu?</span>
            </h1>
            <p className="text-white/50 text-base md:text-lg font-light max-w-md mx-auto leading-relaxed">
              Tải lên một ảnh — nhận ngay ước tính giá trị thị trường theo đúng loại tiền tệ của bạn, dựa trên dữ liệu tin đăng thực tế và AI.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-white/30 text-xs font-medium">
              <span className="flex items-center gap-1.5"><Camera className="h-3.5 w-3.5 text-amber-400" /> Phân tích ảnh</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span>Việt Nam và khắp thế giới</span>
              <span className="w-px h-3 bg-white/20 hidden sm:block" />
              <span className="text-amber-400 font-semibold">100% Miễn Phí</span>
            </div>
          </div>
        </div>

        {/* ── Công cụ định giá ── */}
        <div className="max-w-2xl mx-auto px-4 py-10">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <XeCuaToiDangGiaBaoNhieuClient />
          </div>
        </div>

        {/* ── Nội dung SEO ── */}
        <div className="max-w-screen-lg mx-auto px-4 sm:px-6 pb-16 space-y-14">

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Hiểu về giá trị xe</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Điều gì quyết định giá một chiếc xe cũ?
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
              Định giá xe cũ: hướng dẫn đầy đủ
            </h2>

            <p>Biết được giá trị thị trường thực sự của xe là bước quan trọng nhất trước khi rao bán, đổi xe hoặc thương lượng mua xe, ở bất cứ đâu trên thế giới. Định giá quá cao khiến tin đăng của bạn nằm im không ai mua. Định giá quá thấp nghĩa là bạn để tiền thật ở lại trên bàn. Vấn đề là <strong className="text-foreground">&ldquo;giá trị thị trường&rdquo; không phải là một con số cố định</strong> — nó thay đổi theo quốc gia, loại tiền tệ, nhu cầu địa phương với từng hãng xe cụ thể, và lịch sử cũng như tình trạng riêng của mỗi chiếc xe.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Vì sao cùng một chiếc xe không có cùng giá trị ở mọi quốc gia</h3>
            <p>Một chiếc Toyota Corolla năm năm tuổi, tình trạng tốt, có thể có giá trị khá khác nhau tùy quốc gia, ngay cả trước khi quy đổi tiền tệ. Thuế nhập khẩu và các loại thuế địa phương áp lên xe cũ khác nhau rất nhiều giữa các nước. Một số thị trường có nhu cầu địa phương mạnh với một số hãng xe nhất định, giữ giá bán lại ở mức cao. Ở những thị trường khác, nguồn cung xe mới dồi dào hơn khiến người mua ít quan tâm đến xe cũ hơn, làm giảm giá trị bán lại. Vì vậy, một bảng giá tham khảo toàn cầu duy nhất sẽ không chính xác — việc định giá cần được hiệu chỉnh theo từng quốc gia.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Số km đã đi và lịch sử bảo dưỡng</h3>
            <p>Ở hầu hết mọi thị trường, số km đã đi và lịch sử bảo dưỡng có ghi chép là những chỉ số đáng tin cậy về tình trạng xe hơn nhiều so với những gì một bức ảnh có thể thể hiện. Một chiếc xe có số km thấp hơn và hồ sơ bảo dưỡng đầy đủ thường có lợi thế về giá rõ rệt so với một chiếc xe cùng đời nhưng đã đi nhiều km hơn, ngay cả khi chúng trông giống nhau trong ảnh. Thiếu hoặc mất lịch sử bảo dưỡng là một trong những cách nhanh nhất khiến người bán mất lợi thế thương lượng.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Quyền sở hữu, đăng ký và giấy tờ</h3>
            <p>Ở mọi quốc gia mà chúng tôi hỗ trợ, <strong className="text-foreground">giấy tờ đầy đủ và hợp lệ là điều không thể thiếu để đạt được giá tốt nhất</strong>. Người mua, một cách hợp lý, sẽ trừ giá đối với những xe thiếu giấy tờ, chưa nộp thuế nhập khẩu hoặc đăng ký chưa hoàn tất, vì rủi ro gặp vấn đề khi sang tên là có thật ở mọi quốc gia. Giải quyết các vấn đề giấy tờ trước khi đăng bán thường rẻ hơn nhiều so với mức giảm giá mà người mua sẽ yêu cầu nếu không.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Tình trạng tổng thể và cách trình bày xe</h3>
            <p>Một thân vỏ sạch, không trầy xước, không gỉ sét hay bạc màu sơn, cùng động cơ và hộp số vận hành tốt về mặt cơ khí, luôn giúp tăng giá bán, dù xe được bán ở Hà Nội, TP.HCM hay bất cứ nơi nào khác, so với một chiếc xe tương tự nhưng có dấu hiệu sử dụng rõ rệt. Những sửa chữa đơn giản, chi phí thấp — vệ sinh kỹ lưỡng, xử lý các vết trầy nhỏ, thay một bóng đèn bị cháy — thường mang lại lợi ích gấp nhiều lần so với chi phí bỏ ra khi tính vào giá bán cuối cùng.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Tiền tệ và thời điểm thị trường</h3>
            <p>Ở những quốc gia phụ thuộc nhiều vào xe cũ nhập khẩu, giá xe gắn liền chặt chẽ với biến động tỷ giá — đồng nội tệ yếu đi làm tăng chi phí nhập khẩu và đẩy giá xe cũ lên, trong khi đồng tiền mạnh hơn có tác động ngược lại. Điều này có nghĩa là một mức định giá từ một hoặc hai năm trước có thể không còn là căn cứ đáng tin cậy cho giá hiện tại. Luôn kiểm tra dữ liệu thị trường mới nhất thay vì dựa vào bảng giá cũ hoặc số tiền mà chủ xe trước đã trả.</p>

            <h3 className="text-foreground font-bold text-base mt-6 mb-2">Công cụ này hoạt động như thế nào</h3>
            <p>Tải lên một ảnh rõ nét của xe và chọn quốc gia của bạn. AI (Gemini Vision) sẽ xác định hãng, dòng xe, năm sản xuất và phiên bản từ ảnh, sau đó đối chiếu với dữ liệu tin đăng thực tế, mới nhất tại thị trường bạn chọn để đưa ra một khoảng giá theo đúng loại tiền tệ của bạn, thay vì một con số duy nhất. Kết quả bao gồm các yếu tố cụ thể ảnh hưởng đến việc định giá, giúp bạn hiểu vì sao con số đó được đưa ra. Công cụ này được thiết kế như một điểm khởi đầu nhanh chóng, miễn phí để thương lượng, không thay thế cho việc kiểm tra trực tiếp.</p>
          </section>

          <section>
            <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-widest uppercase mb-2">Câu hỏi thường gặp</p>
            <h2 className="font-black uppercase text-foreground leading-none mb-6" style={{ fontFamily: "'Barlow Condensed', 'Impact', sans-serif", fontSize: 'clamp(22px, 3vw, 34px)' }}>
              Những câu hỏi phổ biến nhất
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
              Các công cụ miễn phí khác
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/cong-cu" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/20 transition-all">
                <p className="text-sm font-bold text-blue-700 dark:text-blue-400">Tất cả công cụ</p>
                <ArrowRight className="h-4 w-4 text-blue-500" />
              </Link>
              <Link href="/trang-chu" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Trang Chủ Tiếng Việt</p>
                <ArrowRight className="h-4 w-4 text-amber-500" />
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
