import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ChevronRight, ChevronDown } from 'lucide-react';
import VINCheckerClientVi from '@/components/VINCheckerClientVi';
import { alternatesFor } from '@/lib/hreflang';
import LanguagePills from '@/components/ui/LanguagePills';

export const metadata: Metadata = {
  title: 'Tra Cứu Số Khung (VIN) Miễn Phí — Xem Hãng, Đời Xe, Xuất Xứ Ngay',
  description: 'Tra cứu số khung (VIN) miễn phí cho bất kỳ xe nào. Xem hãng xe, dòng xe, năm sản xuất, động cơ và nước sản xuất ngay lập tức — không cần đăng ký. Dành cho xe nhập khẩu Mỹ.',
  keywords: ['tra cứu số khung miễn phí', 'tra số vin miễn phí', 'số khung xe là gì', 'giải mã số vin', 'tra cứu số khung xe nhập khẩu', 'số khung ở đâu', 'kiểm tra số vin xe', 'tra cứu số khung ô tô mỹ', 'số khung và số vin khác nhau không', 'tra cứu số khung xe đấu giá mỹ'],
  alternates: alternatesFor('/cong-cu/tra-cuu-so-khung-vin'),
  openGraph: {
    title: 'Tra Cứu Số Khung (VIN) Miễn Phí | Naira Autos',
    description: 'Xem hãng xe, dòng xe, năm sản xuất, động cơ và xuất xứ của bất kỳ xe nào từ số khung — miễn phí và tức thì.',
    url: 'https://www.naira.autos/cong-cu/tra-cuu-so-khung-vin',
    locale: 'vi_VN',
    type: 'website',
  },
};

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/cong-cu/tra-cuu-so-khung-vin',
      name: 'Tra Cứu Số Khung (VIN) Miễn Phí — Xem Hãng, Đời Xe, Xuất Xứ Ngay',
      description: 'Tra cứu số khung (VIN) miễn phí — hãng xe, dòng xe, năm sản xuất, động cơ và nước sản xuất.',
      url: 'https://www.naira.autos/cong-cu/tra-cuu-so-khung-vin',
      inLanguage: 'vi',
      dateModified: '2026-10-24',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Trang Chủ', item: 'https://www.naira.autos/trang-chu' },
        { '@type': 'ListItem', position: 2, name: 'Công Cụ', item: 'https://www.naira.autos/cong-cu' },
        { '@type': 'ListItem', position: 3, name: 'Tra Cứu Số Khung', item: 'https://www.naira.autos/cong-cu/tra-cuu-so-khung-vin' },
      ]},
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Số khung (VIN) của xe là gì?', acceptedAnswer: { '@type': 'Answer', text: 'Số khung, hay VIN (Vehicle Identification Number), là một mã duy nhất gồm 17 ký tự được gán cho mỗi xe khi sản xuất. Mã này chứa thông tin về nước sản xuất, hãng xe, loại xe, động cơ, năm sản xuất, nhà máy lắp ráp và một số sê-ri riêng biệt. Tại Việt Nam, số khung được ghi trên giấy đăng ký xe và thường gọi là "số khung" hoặc "số VIN".' } },
        { '@type': 'Question', name: 'Làm sao để tra cứu số khung miễn phí?', acceptedAnswer: { '@type': 'Answer', text: 'Nhập số khung 17 ký tự vào ô phía trên và nhấn "Giải Mã". Công cụ miễn phí của chúng tôi sử dụng cơ sở dữ liệu công khai của NHTSA (Cơ quan An toàn Giao thông Mỹ) để hiển thị hãng xe, dòng xe, năm sản xuất, thông số động cơ, loại hộp số và nhà máy sản xuất — hoàn toàn miễn phí, không cần đăng ký, từ bất kỳ quốc gia nào.' } },
        { '@type': 'Question', name: 'Số khung nằm ở đâu trên xe?', acceptedAnswer: { '@type': 'Answer', text: 'Số khung xuất hiện ở ba vị trí: trên bảng táp-lô (nhìn thấy qua kính chắn gió phía ghế lái), trên nhãn dán trong khung cửa ghế lái, và được dập trực tiếp trên khung xe trong khoang động cơ. Số khung cũng được ghi trên giấy đăng ký xe. Cả ba vị trí phải khớp chính xác với nhau.' } },
        { '@type': 'Question', name: 'Số khung và số VIN có khác nhau không?', acceptedAnswer: { '@type': 'Answer', text: 'Không, đây là cùng một mã 17 ký tự. VIN (Vehicle Identification Number) là thuật ngữ quốc tế, còn "số khung" là cách gọi phổ biến trong tiếng Việt. Xe sản xuất tại Việt Nam từ năm 2007 trở đi dùng số khung chuẩn VIN quốc tế, thường bắt đầu bằng RL đến RR.' } },
        { '@type': 'Question', name: 'Công cụ này có dùng được cho xe nhập khẩu từ Mỹ về Việt Nam không?', acceptedAnswer: { '@type': 'Answer', text: 'Có — đây chính là trường hợp sử dụng phổ biến nhất. Xe được sản xuất ban đầu cho thị trường Mỹ, Canada hoặc Mexico sẽ giải mã bình thường, bao gồm phần lớn xe bán tải và xe cổ điển Mỹ được nhập qua các sàn đấu giá như Copart, IAAI. Xe sản xuất trong nước (số khung bắt đầu bằng RL đến RR) hoặc xe nhập từ châu Âu, Nhật Bản, Hàn Quốc thường không có trong cơ sở dữ liệu NHTSA; trong trường hợp này, nên tra cứu qua website Cục Đăng Kiểm Việt Nam.' } },
      ],
    },
    { '@type': 'SoftwareApplication', name: 'Tra Cứu Số Khung (VIN) Miễn Phí', applicationCategory: 'UtilitiesApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '0' } },
  ],
};

export default function TraCuuSoKhungVinPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <div className="relative bg-[#080C10] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#080C10] via-[#080C10]/95 to-[#0D1117] pointer-events-none" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 pt-10 pb-12">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link href="/cong-cu" className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500/20 border border-white/15 hover:border-blue-500/40 text-white/60 hover:text-blue-400 transition-all" aria-label="Quay lại">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <nav className="flex items-center gap-1.5 text-xs text-white/30">
              <Link href="/trang-chu" className="hover:text-white/60 transition-colors">Trang Chủ</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/cong-cu" className="hover:text-white/60 transition-colors">Công Cụ</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white/50">Tra Cứu Số Khung</span>
            </nav>
            <LanguagePills path="/cong-cu/tra-cuu-so-khung-vin" className="ms-auto" />
          </div>
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-blue-500 px-3 py-1 rounded-full">Miễn Phí 100%</span>
              <span className="text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1 rounded-full">Dữ liệu NHTSA</span>
            </div>
            <h1 className="font-black uppercase text-white leading-none tracking-tight mb-3"
              style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif", fontSize: 'clamp(28px, 5vw, 56px)' }}>
              Tra Cứu Số Khung (VIN)<br /><span className="text-blue-400">Miễn Phí và Tức Thì</span>
            </h1>
            <p className="text-white/80 text-lg font-semibold leading-snug mb-2">Xem thông tin xe từ số khung chỉ trong vài giây.</p>
            <p className="text-white/75 text-sm leading-relaxed">Nhập số khung 17 ký tự từ táp-lô, cửa xe hoặc khung xe. Nhận hãng xe, dòng xe, năm sản xuất, thông số động cơ và nước sản xuất — miễn phí, không cần đăng ký. Hữu ích khi mua xe nhập khẩu Mỹ về Việt Nam.</p>
          </div>
        </div>
      </div>

      <VINCheckerClientVi />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Tra Cứu Số Khung Miễn Phí Cho Mọi Xe Cũ</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Công cụ tra cứu số khung miễn phí</strong> của chúng tôi sử dụng cơ sở dữ liệu công khai của NHTSA (Cơ quan An toàn Giao thông Mỹ). <strong className="text-foreground">Tra cứu miễn phí</strong> cho bạn biết hãng xe, dòng xe, năm sản xuất, thông số động cơ, loại hộp số, kiểu thân xe và nhà máy lắp ráp — mọi thứ cần thiết để xác nhận chiếc xe cũ thực sự là gì trước khi mua.</p>
                  <p>Thị trường xe cũ ngày càng mang tính quốc tế. Xe được sản xuất cho thị trường Mỹ, Canada hoặc Mexico liên tục được xuất khẩu và đăng ký lại — có thể là xe nhập về Việt Nam qua các sàn đấu giá như Copart, IAAI, đặc biệt phổ biến với dòng xe bán tải và xe cổ điển Mỹ. Vì số khung được dập tại nhà máy và không bao giờ thay đổi, một lần tra cứu miễn phí sẽ hoạt động như nhau dù xe đi đến quốc gia nào, miễn là xe được sản xuất ban đầu cho thị trường Bắc Mỹ.</p>
                  <p>Đây là điểm quan trọng cần hiểu: số khung không phải là biển số do nước bạn cấp — đó là dấu ấn sản xuất được gắn trên dây chuyền lắp ráp, từ rất lâu trước khi xe rời nhà máy. Nó không thay đổi khi xe được xuất khẩu, đăng ký lại, gắn biển số mới hay đổi chủ nhiều lần. Vì vậy, tra cứu số khung miễn phí có thể theo dõi một chiếc xe xuyên biên giới theo cách mà biển số không bao giờ làm được.</p>
                  <p>Hầu hết mọi người chỉ tra cứu số khung sau khi đã thương lượng xong giá — nhưng cách làm đúng là tra cứu trước khi đi xem xe, trước khi đặt cọc, và tra lại lần nữa sau khi mua để xác nhận không có gì bị đánh tráo lúc giao xe. Việc này hoàn toàn miễn phí và chỉ mất chưa đến một phút.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Mua Xe Nhập Khẩu? Hãy Làm Điều Này Trước Tiên</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Mua xe nhập khẩu có thêm rủi ro mà xe mua trong nước không có: giấy tờ, người bán và tình trạng thực tế của xe có thể đến từ một quốc gia bạn chưa từng đặt chân đến. Tra cứu số khung miễn phí không thay thế được việc kiểm tra thực tế, nhưng đây là bộ lọc đầu tiên rẻ nhất, không tốn chi phí trước khi tiến xa hơn.</p>
                  <p>Trước tiên, hãy giải mã số khung và so sánh kết quả — năm sản xuất, dòng xe, động cơ, phiên bản — với chính xác những gì người bán công bố. Bất kỳ sai lệch nào ở đây, dù nhỏ như động cơ không đúng, thường là dấu hiệu đầu tiên cho thấy ảnh trong tin đăng và giấy tờ thực tế không phải của cùng một xe. Sau đó, hãy đối chiếu thực tế xem số khung trên táp-lô có khớp với số dập trên khung xe và nhãn dán trên cửa hay không; sự khác biệt giữa ba vị trí này là một trong những dấu hiệu rõ ràng nhất của số khung bị làm giả.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Số Khung vs VIN — Có Giống Nhau Không?</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Có, đây là cùng một mã 17 ký tự. <strong className="text-foreground">VIN</strong> (Vehicle Identification Number) là thuật ngữ quốc tế; <strong className="text-foreground">số khung</strong> là cách gọi thông dụng trong tiếng Việt. Xe sản xuất trong nước từ năm 2007 trở đi áp dụng chuẩn số khung VIN quốc tế (thường bắt đầu bằng RL đến RR theo mã hãng xe Việt Nam); xe sản xuất trước đó có thể dùng hệ thống số khung riêng của từng hãng.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Cách Đọc Số Khung: Ý Nghĩa Từng Phần</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>17 ký tự không phải ngẫu nhiên. Vị trí 1-3 xác định hãng sản xuất và nước lắp ráp — nhờ đó công cụ biết được xe được sản xuất tại Mỹ, Canada, Mexico hay nơi khác. Vị trí 4-8 mô tả chiếc xe: thân xe, động cơ và dòng xe. Vị trí 9 là ký tự kiểm tra được tính toán theo công thức toán học, dùng để phát hiện số khung bị chép sai hoặc bị làm giả. Vị trí 10 mã hóa năm sản xuất, và vị trí 12-17 tạo thành số sản xuất duy nhất của xe.</p>
                  <p>Biết tự đọc các phần này vẫn hữu ích dù đã có công cụ tra cứu sẵn, vì nó giúp bạn kiểm tra lại kết quả trong vài giây. Nếu vị trí 10 cho thấy xe đời 2015 nhưng người bán giới thiệu là đời 2018, hỏi trực tiếp là điều đáng làm — đây không phải là buộc tội, mà là một bước kiểm tra miễn phí chỉ mất ba mươi giây.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Hoạt Động Với Mọi Hãng Xe — Ford, Toyota, Honda, Chevrolet Và Hơn Thế</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>Đây không phải công cụ dành riêng cho một hãng xe. Vì đọc trực tiếp từ cơ sở dữ liệu hãng xe của NHTSA, cùng một công cụ hoạt động với Ford, Toyota, Honda, Chevrolet, GMC, Nissan, Jeep, Hyundai và bất kỳ hãng nào khác được bán tại thị trường Bắc Mỹ. Chỉ cần dán mã 17 ký tự — công cụ sẽ tự động nhận diện đúng hệ thống mã hóa của hãng mà không cần bạn chỉ định hãng xe.</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Tra Cứu Số Khung vs Báo Cáo Lịch Sử Xe Đầy Đủ</h2>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p><strong className="text-foreground">Tra cứu số khung miễn phí</strong> cho bạn biết chiếc xe lúc xuất xưởng như thế nào — tức là thông số sản xuất. Để biết điều gì đã xảy ra từ đó đến nay — tai nạn, số công-tơ-mét bị tua lại, tình trạng xe hỏng toàn bộ hoặc ngập nước — bạn cần một <strong className="text-foreground">báo cáo lịch sử xe</strong> có phí như Carfax hoặc AutoCheck. Với bất kỳ giao dịch mua xe cũ giá trị cao nào, nên dùng thêm báo cáo lịch sử có phí bên cạnh lần tra cứu thông số miễn phí này.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>Tra Cứu Số Khung — Câu Hỏi Thường Gặp</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              {[
                { q: 'Tra cứu này có thực sự miễn phí không?', a: 'Có. Hoàn toàn miễn phí thông qua API công khai của NHTSA. Không cần tài khoản hay đăng nhập. Bạn có thể tra cứu bao nhiêu lần tùy ý, từ bất kỳ quốc gia nào.' },
                { q: 'Số khung của xe dùng để làm gì?', a: 'Số khung xác định duy nhất một chiếc xe để kiểm tra thông số, tra lịch sử, đăng ký, mua bảo hiểm và kiểm tra thông báo triệu hồi. Tại Việt Nam, số khung bắt buộc phải khớp trên giấy đăng ký xe khi làm thủ tục mua bán, sang tên.' },
                { q: 'Tôi có thể xem thông số kỹ thuật qua số khung miễn phí không?', a: 'Có. Công cụ miễn phí của chúng tôi hiển thị hãng xe, dòng xe, năm sản xuất, động cơ, kiểu thân xe, hộp số và xuất xứ trực tiếp từ cơ sở dữ liệu hãng xe của NHTSA, không mất phí, cho xe có thông số Mỹ, Canada hoặc Mexico.' },
                { q: 'Công cụ này có dùng được cho xe nhập từ Mỹ về Việt Nam không?', a: 'Có, với mọi xe được sản xuất ban đầu cho thị trường Bắc Mỹ — trường hợp phổ biến với người nhập xe bán tải và xe cổ điển qua đấu giá. Xe có thông số dành riêng cho châu Âu có thể không hiển thị.' },
                { q: 'Làm sao biết số khung có phải là thật không?', a: 'Số khung hợp lệ có đúng 17 ký tự — chữ cái (A-Z, trừ I, O, Q) và số. Vị trí 9 là ký tự kiểm tra tính theo công thức toán học. Nếu không khớp, số khung đã bị làm giả. Công cụ này tự động kiểm tra điều đó.' },
                { q: 'Nếu tra cứu không ra kết quả thì sao?', a: 'Thường có nghĩa là xe có xuất xứ châu Âu, châu Á hoặc thông số dành riêng cho thị trường khác — không có trong cơ sở dữ liệu NHTSA. Dù vậy, năm sản xuất vẫn được tính từ vị trí 10 của số khung. Trong trường hợp này, hãy liên hệ dịch vụ tra cứu VIN chính thức của hãng xe.' },
                { q: 'Số máy có giống số khung không?', a: 'Không. Số máy được dập trên khối động cơ và chỉ xác định riêng động cơ đó, trong khi số khung (VIN) xác định toàn bộ chiếc xe. Công cụ này giải mã số khung, không phải số máy riêng biệt.' },
                { q: 'Số khung có ảnh hưởng đến thuế nhập khẩu không?', a: 'Có ảnh hưởng gián tiếp. Nhiều quốc gia tính thuế nhập khẩu dựa trên tuổi xe và dung tích động cơ, cả hai đều được xác nhận qua số khung. Giải mã chính xác trước khi tính thuế giúp tránh lập kế hoạch với số liệu sai.' },
                { q: 'Tra cứu số khung có cho biết xe đã từng tai nạn không?', a: 'Không. Tra cứu miễn phí chỉ hiển thị thông số sản xuất — hãng xe, dòng xe, năm sản xuất, động cơ và xuất xứ. Lịch sử tai nạn, số công-tơ-mét và tình trạng hỏng toàn bộ cần báo cáo có phí như Carfax hoặc AutoCheck.' },
                { q: 'Tôi có thể biết xe có bị mất cắp qua số khung không?', a: 'Không thể qua công cụ này. Tra cứu xe bị mất cắp là việc của cơ quan công an và công ty bảo hiểm — NICB (Cục Chống Gian Lận Bảo Hiểm Mỹ) cung cấp công cụ miễn phí tên VINCheck riêng cho mục đích này, khác với công cụ giải mã thông số.' },
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
              Các Công Cụ Miễn Phí Khác
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <Link href="/cong-cu/tho-may-ao" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-all">
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Thợ Máy Ảo AI</p>
                <ChevronRight className="h-4 w-4 text-emerald-500" />
              </Link>
              <Link href="/cong-cu/xe-cua-toi-dang-gia-bao-nhieu" className="flex items-center justify-between gap-2 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/20 transition-all">
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">Xe Của Tôi Đáng Giá Bao Nhiêu?</p>
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
