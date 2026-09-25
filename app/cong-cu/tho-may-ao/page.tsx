import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, ChevronDown, CheckCircle2, Check } from 'lucide-react';
import AIMechanicClientVI from './client';

// ── Metadata ────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Thợ Máy Ảo AI — Chẩn Đoán Xe Hơi Online Miễn Phí | Naira Autos',
  description: 'Thợ máy ảo miễn phí với trí tuệ nhân tạo. Mô tả sự cố, tải lên ảnh, âm thanh hoặc video và nhận chẩn đoán ngay lập tức kèm chi phí sửa chữa. Không cần đăng ký.',
  alternates: {
    canonical: 'https://www.naira.autos/cong-cu/tho-may-ao',
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
    title: 'Axion — Thợ Máy Ảo AI Miễn Phí | Naira Autos',
    description: 'Chẩn đoán xe online ngay lập tức, ở bất cứ đâu. Tải lên âm thanh động cơ, ảnh, hoặc mô tả sự cố. Nhận mức độ khẩn cấp, nguyên nhân có thể, các bước tiếp theo và chi phí sửa chữa. Miễn phí, không cần đăng ký.',
    url: 'https://www.naira.autos/cong-cu/tho-may-ao',
    locale: 'vi',
    type: 'website',
  },
  keywords: ['thợ máy ảo', 'thợ sửa xe online miễn phí', 'chẩn đoán xe hơi online', 'chẩn đoán xe miễn phí', 'xe tôi bị sao vậy', 'gara online', 'hỏi thợ máy online', 'tính chi phí sửa xe', 'thợ máy trí tuệ nhân tạo', 'kiểm tra xe online', 'chẩn đoán qua âm thanh động cơ', 'ước tính chi phí sửa chữa xe'],
};

// ── Schema ────────────────────────────────────────────────────────

const SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.naira.autos/cong-cu/tho-may-ao',
      name: 'Thợ Máy Ảo AI — Chẩn Đoán Xe Hơi Online Miễn Phí',
      description: 'Thợ máy ảo miễn phí với trí tuệ nhân tạo. Tải lên âm thanh động cơ, ảnh, hoặc mô tả sự cố. Nhận chẩn đoán ngay lập tức kèm mức độ khẩn cấp và chi phí sửa chữa.',
      url: 'https://www.naira.autos/cong-cu/tho-may-ao',
      inLanguage: 'vi',
      dateModified: '2026-08-01',
      author: { '@type': 'Organization', name: 'Naira Autos', url: 'https://www.naira.autos' },
      reviewedBy: { '@type': 'Person', name: 'Emmanuel Erere', jobTitle: 'Auto Mechanic', url: 'https://www.naira.autos/about' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Trang Chủ', item: 'https://www.naira.autos/trang-chu' },
          { '@type': 'ListItem', position: 2, name: 'Công Cụ', item: 'https://www.naira.autos/cong-cu' },
          { '@type': 'ListItem', position: 3, name: 'Thợ Máy AI', item: 'https://www.naira.autos/cong-cu/tho-may-ao' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Thợ máy ảo là gì và hoạt động như thế nào?',
          acceptedAnswer: { '@type': 'Answer', text: 'Thợ máy ảo là một công cụ sử dụng trí tuệ nhân tạo để chẩn đoán sự cố xe của bạn từ xa. Bạn mô tả vấn đề, tải lên ảnh, âm thanh hoặc video nếu muốn, và AI sẽ phân tích tất cả dựa trên một cơ sở dữ liệu khổng lồ các mẫu hư hỏng đã biết để đưa ra chẩn đoán kèm mức độ khẩn cấp và chi phí sửa chữa ước tính.' },
        },
        {
          '@type': 'Question',
          name: 'AI có thể chẩn đoán xe của tôi chỉ dựa vào âm thanh động cơ không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Hãy ghi lại tiếng gõ, tiếng rít hoặc tiếng cọ xát — chỉ cần 10 giây ghi âm bằng điện thoại cũng đủ. AI sẽ phân tích mẫu âm thanh để xác định, ví dụ như vòng bi mòn, má phanh mòn, hoặc một sự cố cụ thể khác.' },
        },
        {
          '@type': 'Question',
          name: 'Có miễn phí không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Hoàn toàn miễn phí — không cần đăng ký, không cần thuê bao, không cần thanh toán. Vào trang và bắt đầu chẩn đoán ngay lập tức.' },
        },
        {
          '@type': 'Question',
          name: 'Chẩn đoán của AI có luôn chính xác không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Không — nó không chính xác 100% mọi lúc. Đây là một điểm khởi đầu tốt dựa trên mô tả, ảnh, âm thanh hoặc video bạn cung cấp, nhưng có thể bỏ sót những điều chỉ có thể phát hiện qua kiểm tra thực tế trên cầu nâng và máy quét. Hãy coi đây là ý kiến ban đầu, không phải câu trả lời cuối cùng, và luôn đến gặp thợ máy có chứng chỉ trực tiếp đối với sự cố phanh, lái hoặc nhiên liệu, bất kể chẩn đoán nói gì.' },
        },
        {
          '@type': 'Question',
          name: 'Có hoạt động với BMW, Mercedes, Toyota hay bất kỳ hãng nào khác không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Hỏi về sự cố của BMW, Mercedes, Toyota hoặc bất kỳ hãng nào khác — AI bao phủ tất cả các nhà sản xuất lớn. Chi phí sửa chữa được hiệu chỉnh theo thị trường Nigeria; nếu bạn ở nước khác, hãy dùng nó như một tham khảo chung, không phải con số chính xác tại địa phương.' },
        },
        {
          '@type': 'Question',
          name: 'Có giống như hỏi trong nhóm WhatsApp hay diễn đàn ô tô không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Nó tốt hơn ở nhiều mặt. Khi hỏi trên diễn đàn hay nhóm WhatsApp, bạn chỉ nhận được ý kiến của một người dựa trên mô tả văn bản. Thợ máy ảo của chúng tôi phân tích mô tả của bạn cùng với bất kỳ ảnh, âm thanh hoặc video nào bạn tải lên, so sánh với hàng nghìn mẫu hư hỏng đã biết, và trả về chẩn đoán được xếp hạng theo khả năng kèm mức độ tin cậy.' },
        },
        {
          '@type': 'Question',
          name: 'Lịch sử trò chuyện của tôi có được lưu trên máy chủ của các bạn không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Không. Toàn bộ lịch sử chỉ được lưu trên thiết bị của bạn, sử dụng bộ nhớ cục bộ của trình duyệt. Chúng tôi không lưu bất cứ gì trên máy chủ ngoài tin nhắn đang hoạt động mà bạn gửi để chẩn đoán. Bạn có thể xóa lịch sử bất cứ lúc nào từ menu bên.' },
        },
        {
          '@type': 'Question',
          name: 'Tôi có thể nhận chi phí sửa chữa cho bất kỳ hãng xe nào không?',
          acceptedAnswer: { '@type': 'Answer', text: 'Có. Chúng tôi hỗ trợ Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot và bất kỳ hãng lớn nào khác, dù bạn lái xe ở đâu. Chi phí là mức tham khảo quốc tế gần đúng.' },
        },
        {
          '@type': 'Question',
          name: 'Nếu tôi cần thợ máy lưu động hoặc gara gần đây thì sao?',
          acceptedAnswer: { '@type': 'Answer', text: 'Công cụ của chúng tôi chẩn đoán vấn đề trước, để bạn biết chính xác cần yêu cầu gì trước khi bắt đầu tìm kiếm. Nếu sự cố cần kiểm tra thực tế hoặc thiết bị chuyên dụng, chúng tôi sẽ nói rõ điều đó cho bạn.' },
        },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Axion — Thợ Máy Ảo AI',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description: 'Thợ máy ảo miễn phí với trí tuệ nhân tạo. Mô tả sự cố, tải lên âm thanh động cơ hoặc ảnh, nhận chẩn đoán ngay lập tức kèm chi phí sửa chữa hiệu chỉnh theo thị trường Nigeria.',
      url: 'https://www.naira.autos/cong-cu/tho-may-ao',
      inLanguage: 'vi',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'NGN' },
    },
  ],
};

export default function AIMechanicPageVI() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }} />

      <AIMechanicClientVI />

      <div className="bg-muted/30 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-16 space-y-14">

          <p className="text-xs text-muted-foreground">Cập nhật lần cuối: tháng 8 năm 2026</p>

          {/* Phạm vi đầy đủ */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Phạm Vi Đầy Đủ</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Thợ Máy Ảo Của Chúng Tôi Bao Gồm Những Gì?
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed max-w-2xl mb-10">
              Dù bạn cần một ước tính chi phí sửa chữa nhanh, muốn hỏi thợ máy online trước khi đến gara, hay muốn tính xem sửa xe của bạn sẽ tốn bao nhiêu — công cụ này đáp ứng tất cả, hoàn toàn miễn phí.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Chẩn Đoán Sự Cố Động Cơ', desc: 'Tiếng gõ, đánh lửa yếu, chạy không tải không đều, quá nhiệt, đèn check engine — AI xác định các nguyên nhân có khả năng cao nhất, xếp hạng theo mức độ khả năng.' },
                { title: 'Phân Tích Âm Thanh', desc: 'Tải lên bản ghi âm tiếng gõ, tiếng rít hoặc tiếng cọ xát. AI phân tích mẫu âm thanh để xác định sự cố.' },
                { title: 'Mức Độ Khẩn Cấp Ngay Lập Tức', desc: 'Mỗi chẩn đoán đi kèm một kết luận rõ ràng theo bốn mức: An Toàn Để Lái, Theo Dõi Sát, Sớm Gặp Thợ Máy, hoặc Ngừng Lái Ngay.' },
                { title: 'Báo Giá Sửa Chữa Online', desc: 'Chi phí được hiệu chỉnh theo thị trường Nigeria làm tham khảo — chi phí thực tế của phụ tùng và nhân công thay đổi theo từng quốc gia và thành phố. Dùng nó làm điểm khởi đầu rồi xin báo giá tại địa phương.' },
                { title: 'Các Bước Tự Làm', desc: 'Khi sự cố là thứ bạn có thể tự kiểm tra hoặc sửa, chúng tôi sẽ chỉ chính xác cách làm — trước khi bạn chi tiền cho thợ máy.' },
                { title: 'Trò Chuyện Liên Tục', desc: 'Đặt câu hỏi tiếp theo và nhận câu trả lời với đầy đủ ngữ cảnh. Mỗi phiên được lưu trên thiết bị của bạn.' },
                { title: 'Hỗ Trợ Đa Hãng Xe', desc: 'Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot, và bất kỳ hãng nào, thị trường nào khác.' },
                { title: 'Chẩn Đoán Qua Ảnh và Video', desc: 'Gửi ảnh đèn cảnh báo trên bảng đồng hồ, rò rỉ chất lỏng bất thường, hoặc hư hỏng có thể nhìn thấy. Mỗi phương tiện bổ sung làm tăng đáng kể độ tin cậy của chẩn đoán.' },
                { title: 'Xác Định Phụ Tùng', desc: 'Mỗi chẩn đoán bao gồm các linh kiện cụ thể có khả năng liên quan nhất, để bạn biết chính xác cần yêu cầu gì tại bất kỳ gara hay cửa hàng phụ tùng nào.' },
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
                Thợ máy ảo với trí tuệ nhân tạo là gì?
              </h2>
              <p className="mb-3">Một <strong className="text-foreground">thợ máy ảo</strong> đúng như tên gọi: một thợ máy mà bạn trò chuyện qua văn bản, ảnh, âm thanh hoặc video, thay vì gặp trực tiếp. Bạn mô tả điều gì đang xảy ra với xe của mình — tiếng gõ lạ khi khởi động nguội, đèn check engine không tắt, phanh cảm giác mềm — và trong vài giây bạn nhận được câu trả lời dựa trên kiến thức sâu rộng về các sự cố ô tô thực tế.</p>
              <p>Axion, <strong className="text-foreground">thợ máy trí tuệ nhân tạo</strong> của chúng tôi, hoạt động với mọi hãng xe và mọi quốc gia, nhưng có lợi thế đặc biệt cho những ai lái xe ở Nigeria: nó hiểu cách nhiên liệu pha tạp ảnh hưởng đến kim phun, cách nhiệt độ nhiệt đới làm mòn các gioăng cao su nhanh hơn, và cách ổ gà trên đường làm hỏng hệ thống treo nhanh hơn so với các thị trường khác.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Cách nhận chẩn đoán xe trong chưa đầy một phút
              </h2>
              <div className="space-y-3">
                <p><strong className="text-foreground">1. Mô tả sự cố.</strong> Viết ra những gì đang xảy ra — càng chi tiết càng tốt. Nó bắt đầu khi nào? Chỉ xảy ra khi lạnh, khi tăng tốc, hay khi đánh lái?</p>
                <p><strong className="text-foreground">2. Tải lên ảnh, âm thanh hoặc video (không bắt buộc, nhưng rất hữu ích).</strong> Một bản ghi âm 10 giây tiếng động cơ thường hữu ích hơn cả một đoạn mô tả dài.</p>
                <p><strong className="text-foreground">3. Nhận chẩn đoán ngay lập tức.</strong> Mức độ khẩn cấp, các nguyên nhân có thể xếp hạng theo khả năng, những gì bạn có thể tự kiểm tra, và ước tính chi phí sửa chữa.</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Chi phí sửa chữa: tránh bị tính giá quá cao
              </h2>
              <p className="mb-3">Một trong những cách phổ biến nhất khiến bạn bị tính giá quá cao tại gara là đến mà không biết chi phí sửa chữa nên là bao nhiêu. Trước khi đến bất kỳ gara nào, hãy dùng ước tính <strong className="text-foreground">chi phí sửa chữa</strong> của chúng tôi để biết mức giá hợp lý — phụ tùng và nhân công được phân tách rõ ràng.</p>
              <p>Ước tính này xem xét chiếc xe cụ thể của bạn — hãng, dòng, năm sản xuất — và sự cố có khả năng cao nhất dựa trên mô tả của bạn. Đây không phải là một con số chung chung: một chiếc Camry đời 2010 đã đi 180.000 km với áp suất dầu thấp sẽ nhận ước tính khác với một chiếc Camry đời 2020 với 40.000 km cùng đèn báo đó, vì nguyên nhân có khả năng khác nhau.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Hoạt động với mọi hãng xe: Toyota, BMW, Mercedes, Honda và hơn thế nữa
              </h2>
              <p className="mb-3">Không quan trọng bạn lái xe gì. AI có các mẫu sự cố cụ thể cho từng nhà sản xuất — Toyota, Honda, BMW, Mercedes-Benz, Hyundai, Kia, Nissan, Ford, Mitsubishi, Volkswagen và hầu như mọi hãng khác đang lưu hành hiện nay. Cung cấp hãng, dòng và năm sản xuất một lần, chẩn đoán sẽ điều chỉnh theo những gì đã biết về sự cố của chính chiếc xe đó, ở số km đó, thay vì đưa ra câu trả lời chung chung áp dụng cho mọi xe như nhau.</p>
            </div>

            <div>
              <h2 className="text-2xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                Vì sao chẩn đoán qua âm thanh động cơ thay đổi mọi thứ
              </h2>
              <p className="mb-3">Mô tả bằng lời mang tính chủ quan — "một tiếng lạ" có nghĩa khác nhau với mỗi người. Âm thanh thì không. Tiếng gõ khi khởi động nguội nghe khác với tiếng rít khi phanh, và nghe khác với tiếng cọ xát khi đánh lái. Bằng cách tải lên bản ghi âm 10 giây, AI cho bạn một chẩn đoán chính xác hơn nhiều so với chỉ dùng văn bản.</p>
              <p>Bạn không cần thiết bị chuyên nghiệp. Micro điện thoại là đủ — chỉ cần giữ gần nguồn phát âm thanh trong khi để động cơ chạy, rồi tải lên bản ghi.</p>
            </div>

          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Xe Được Hỗ Trợ</h3>
              <div className="flex flex-wrap gap-1.5">
                {['Toyota', 'Honda', 'Lexus', 'Mercedes', 'BMW', 'Kia', 'Hyundai', 'Innoson', 'Mitsubishi', 'Nissan', 'Ford', 'Peugeot', 'Xe tải', 'Xe buýt', 'Xe máy'].map(v => (
                  <span key={v} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">{v}</span>
                ))}
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400 text-sm mb-3">Thông Tin Chính</h3>
              <ul className="space-y-2.5">
                {[
                  'Miễn phí 100% — không cần thuê bao',
                  'Không cần tài khoản hay đăng ký',
                  'Hoạt động trên di động và máy tính',
                  'Chi phí tham khảo quốc tế',
                  'Sẵn sàng 24/7 — kể cả chủ nhật',
                  'Lịch sử trò chuyện được lưu cục bộ',
                  'Không giới hạn câu hỏi tiếp theo',
                ].map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-emerald-800 dark:text-emerald-300">
                    <Check className="h-3 w-3 flex-shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-bold text-foreground text-sm mb-3">Cũng Có Trên Naira Autos</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Định giá xe miễn phí', href: '/evaluate-car' },
                  { label: 'Công Cụ Phân Tích Âm Thanh Động Cơ', href: '/tools/engine-sound-analyzer' },
                  { label: 'Máy Tính Thuế Nhập Khẩu', href: '/tools/import-duty-calculator' },
                  { label: 'Danh Sách Giấy Tờ Xe', href: '/tools/vehicle-papers-checklist' },
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

          {/* Trí thông minh bổ sung */}
          <section className="bg-[#080C10] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-emerald-400 mb-3 block">Trí Thông Minh Bổ Sung</span>
                <h2 className="text-3xl font-black uppercase text-white mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
                  Cũng Được Tinh Chỉnh Theo Điều Kiện Đường Xá Địa Phương
                </h2>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Chẩn đoán hoạt động như nhau dù bạn lái xe ở đâu. Nhưng hầu hết các công cụ thợ máy ảo chỉ được huấn luyện bằng dữ liệu từ các gara phương Tây — chúng không biết rằng nhiên liệu pha tạp ở Nigeria làm giảm độ nhớt của dầu nhanh hơn 40% so với dự kiến của nhà sản xuất, hay đường phố Lagos có thể phá hỏng một khớp đồng tốc trong 30.000 km trong khi lẽ ra nó phải bền tới 150.000 km.
                </p>
                <p className="text-white/50 text-sm leading-relaxed">
                  Axion cũng biết điều này. Hỏi về tiếng gõ của chiếc Toyota Corolla của bạn sau khi đổ xăng, và nếu bạn ở Nigeria, nó sẽ xem xét nhiên liệu pha tạp trước tiên — vì đó thống kê là nguyên nhân có khả năng cao nhất ở đó.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title: 'Nhiên Liệu Pha Tạp', desc: 'Hiểu cách nhiên liệu pha tạp ảnh hưởng đến cảm biến kích nổ, kim phun và độ nhớt của dầu.' },
                  { title: 'Ảnh Hưởng Của Nhiệt Đới', desc: 'Xem xét nhiệt độ môi trường 35°C+ làm tăng tốc độ hao mòn của các gioăng cao su.' },
                  { title: 'Hư Hỏng Do Ổ Gà', desc: 'Nhận diện các mẫu sự cố hệ thống treo và lốp đặc trưng của đường xá xấu.' },
                  { title: 'Giá Phụ Tùng Địa Phương', desc: 'Ước tính chi phí được tính toán dựa trên dữ liệu từ chợ phụ tùng và các gara đã đăng ký.' },
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

          {/* So sánh */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">So Sánh</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-6" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Thợ Máy Ảo So Với Các Lựa Chọn Khác
            </h2>
            <div className="overflow-x-auto rounded-2xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3.5 font-semibold text-muted-foreground text-sm">Tính Năng</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400 text-sm">Thợ Máy AI</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Đến Gara</th>
                    <th className="text-center px-4 py-3.5 font-semibold text-muted-foreground text-sm">Nhóm/Diễn Đàn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['Sẵn sàng 24/7', 'Có', 'Không', 'Đôi khi'],
                    ['Miễn phí', 'Có', 'Không', 'Có'],
                    ['Không cần di chuyển', 'Có', 'Không', 'Có'],
                    ['Ước tính chi phí', 'Có', 'Thay đổi', 'Không'],
                    ['Phân tích âm thanh/video', 'Có', 'Có', 'Không'],
                    ['Phản hồi tức thì', 'Có', 'Không', 'Đôi khi'],
                    ['Chất lượng nhất quán', 'Có', 'Thay đổi', 'Không'],
                    ['Lưu lịch sử', 'Có', 'Không', 'Không'],
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

          {/* Câu hỏi thường gặp */}
          <section>
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-2 block">Câu Hỏi Thường Gặp</span>
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Câu Hỏi Thường Gặp
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {[
                { q: 'Thợ máy ảo là gì và hoạt động như thế nào?', a: 'Đây là công cụ sử dụng trí tuệ nhân tạo để chẩn đoán sự cố xe của bạn từ xa. Bạn mô tả vấn đề, tải lên phương tiện tùy chọn, và AI so sánh mọi thứ với một cơ sở dữ liệu khổng lồ các sự cố đã biết — với chi phí hiệu chỉnh theo thị trường Nigeria.' },
                { q: 'Chẩn đoán của AI có luôn chính xác không?', a: 'Không — nó không chính xác 100% mọi lúc. Đây là một điểm khởi đầu tốt, nhưng có thể bỏ sót những điều chỉ có thể phát hiện qua kiểm tra thực tế với cầu nâng và máy quét. Hãy coi đây là ý kiến ban đầu, và luôn đến gặp thợ máy trực tiếp đối với sự cố phanh, lái hoặc nhiên liệu.' },
                { q: 'Có hoạt động với BMW, Mercedes, Toyota hay bất kỳ hãng nào khác không?', a: 'Có. Hỏi về bất kỳ hãng nào — AI bao phủ tất cả các nhà sản xuất lớn. Chi phí được hiệu chỉnh theo thị trường Nigeria; ở các nước khác, hãy dùng nó như một tham khảo chung.' },
                { q: 'Có giống như hỏi trong nhóm WhatsApp không?', a: 'Nó tốt hơn ở nhiều mặt. Trong diễn đàn bạn chỉ nhận ý kiến của một người. Dịch vụ của chúng tôi phân tích mô tả của bạn cùng ảnh, âm thanh hoặc video, so sánh với hàng nghìn mẫu sự cố, và trả về chẩn đoán được xếp hạng kèm mức độ tin cậy.' },
                { q: 'Có thể chẩn đoán xe của tôi chỉ dựa vào âm thanh động cơ không?', a: 'Có. Âm thanh là một trong những dữ liệu đầu vào mạnh nhất của chúng tôi. Tải lên bản ghi tiếng gõ, tiếng rít hoặc tiếng cọ xát — chỉ cần 10 giây bằng điện thoại là đủ. AI phân tích mẫu âm thanh để xác định sự cố có khả năng xảy ra.' },
                { q: 'Tôi có cần tạo tài khoản hoặc đăng nhập không?', a: 'Không. Thợ Máy AI hoàn toàn miễn phí và không yêu cầu tài khoản, đăng ký, hay thông tin cá nhân. Dữ liệu xe của bạn được lưu cục bộ trên thiết bị.' },
                { q: 'Lịch sử của tôi có được lưu trên máy chủ của các bạn không?', a: 'Không. Toàn bộ lịch sử chỉ được lưu trên thiết bị của bạn qua bộ nhớ cục bộ của trình duyệt. Chúng tôi không lưu gì trên máy chủ ngoài tin nhắn đang hoạt động.' },
                { q: 'Ước tính chi phí sửa chữa chính xác đến mức nào?', a: 'Nó dựa trên dữ liệu thị trường Nigeria — phụ tùng và nhân công tại các gara ở Lagos, Abuja và Port Harcourt, làm tham khảo. Chúng tôi đưa ra một khoảng (tối thiểu đến tối đa) để bạn biết mức nào là hợp lý. Nếu một gara báo giá cao hơn nhiều so với mức tối đa của chúng tôi, điều đó đáng để tìm hiểu thêm.' },
                { q: 'Tôi có thể nhận chi phí sửa chữa cho bất kỳ hãng xe nào không?', a: 'Có. Chúng tôi hỗ trợ Toyota, Honda, Mercedes-Benz, Lexus, Kia, Hyundai, BMW, Mitsubishi, Nissan, Ford, Innoson, Peugeot và bất kỳ hãng lớn nào khác, dù bạn lái xe ở đâu. Chi phí là mức tham khảo quốc tế gần đúng.' },
                { q: 'Nếu tôi cần thợ máy lưu động hoặc gara gần đây thì sao?', a: 'Công cụ của chúng tôi chẩn đoán vấn đề trước, để bạn biết chính xác cần yêu cầu gì trước khi bắt đầu tìm kiếm. Nếu sự cố cần kiểm tra thực tế hoặc thiết bị chuyên dụng, chúng tôi sẽ nói rõ — và cho bạn biết nên tìm loại thợ máy hoặc gara nào.' },
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
            Được kiểm duyệt bởi <Link href="/about" className="underline underline-offset-2 hover:text-foreground">Emmanuel Erere</Link>, Thợ Máy Ô Tô. Logic chẩn đoán và khoảng chi phí sửa chữa đã được kiểm tra độ chính xác kỹ thuật.
          </p>

          {/* CTA cuối */}
          <section className="text-center py-8">
            <h2 className="text-3xl font-black uppercase text-foreground mb-3" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Sẵn Sàng Chưa? Chẩn Đoán Xe Của Bạn Ngay.
            </h2>
            <p className="text-muted-foreground text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Miễn phí. Tức thì. Không cần đăng ký. Nhận chẩn đoán ngay bây giờ.
            </p>
            <a href="#axion-chat"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all">
              Bắt Đầu Chẩn Đoán Miễn Phí
            </a>
          </section>

          {/* Công cụ khác */}
          <section>
            <h2 className="text-xl font-black uppercase text-foreground mb-4" style={{ fontFamily: "'Barlow Condensed', Impact, sans-serif" }}>
              Thêm Công Cụ Miễn Phí
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { href: '/tools/vin-checker',              label: 'Kiểm Tra Số VIN',           color: 'blue' },
                { href: '/tools/vehicle-papers-checklist', label: 'Danh Sách Giấy Tờ',         color: 'violet' },
                { href: '/tools/import-duty-calculator',   label: 'Tính Thuế Nhập Khẩu',       color: 'emerald' },
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
