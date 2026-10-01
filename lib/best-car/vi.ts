// lib/best-car/vi.ts — Vietnamese strings for "Xe Tốt Nhất Cho Bạn" (/cong-cu/xe-tot-nhat-cho-ban)
import type { BestCarStrings } from '@/lib/best-car/types';

export const vi: BestCarStrings = {
  lang: 'vi',
  locale: 'vi-VN',
  dir: 'ltr',
  latin: true,
  symbolAfter: true,

  path: '/cong-cu/xe-tot-nhat-cho-ban',
  homePath: '/trang-chu',
  hubPath: '/cong-cu',
  aboutPath: '/about',
  comparePath: '/tools/car-comparison',
  fuelPath: '/tools/fuel-cost-calculator-global',
  valuationPath: '/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',

  defaultCountry: 'vn',
  priorityCountries: ['vn', 'us', 'au', 'ca', 'gb', 'de', 'fr', 'jp', 'kr'],
  picksCountry: 'vn',

  nav: { home: 'Trang chủ', tools: 'Công cụ', current: 'Xe Tốt Nhất Cho Bạn', back: 'Quay lại Công cụ', breadcrumb: 'Đường dẫn' },

  meta: {
    title: 'Xe Tốt Nhất Cho Bạn 2026 — Tư Vấn Chọn Xe Theo Nhu Cầu, {countries} Quốc Gia',
    description:
      'Tìm chiếc xe tốt nhất cho nhu cầu của bạn, với giá ước tính theo tiền tệ của bạn tại {countries} quốc gia. Chọn nhu cầu — xe gia đình, kinh doanh, đường cao tốc, ngân sách thấp, đường xấu, xe doanh nhân, xe đầu tiên hoặc tiết kiệm nhiên liệu — và nhận top 5 trong {globalCars} mẫu xe, chấm điểm theo chi phí bảo dưỡng, phụ tùng và mức tiêu hao nhiên liệu.',
    keywords: [
      'xe tốt nhất 2026', 'xe gia đình tốt nhất', 'xe kinh doanh tốt nhất', 'tư vấn mua xe',
      'nên mua xe nào', 'suv tốt nhất 2026', 'xe ít tốn tiền bảo dưỡng', 'xe đầu tiên nên mua',
      'xe đi đường cao tốc', 'xe doanh nhân', 'xe tiết kiệm xăng', 'chọn xe theo nhu cầu',
      'xe giá rẻ tốt nhất', 'xe đi đường xấu', 'xe tốt nhất việt nam', 'xe bền nhất', 'naira autos',
    ],
    ogTitle: 'Xe Tốt Nhất Cho Bạn 2026 — Tư Vấn Chọn Xe | Naira Autos',
    ogDescription: 'Công cụ tư vấn chọn xe toàn cầu với giá địa phương tại {countries} quốc gia. Chọn nhu cầu và nhận top 5 theo chi phí bảo dưỡng, mức tiêu hao nhiên liệu và phụ tùng sẵn có.',
    ogLocale: 'vi_VN',
  },

  hero: {
    badge: 'Công Cụ Miễn Phí',
    verified: 'Giá đã kiểm tra',
    h1: 'Xe Tốt Nhất Cho Bạn',
    intro:
      'Chọn quốc gia và nhu cầu để nhận gợi ý xe được xếp hạng, kèm giá ước tính theo tiền tệ của bạn tại {countries} quốc gia — chấm điểm theo chi phí bảo dưỡng, độ sẵn có của phụ tùng, mức tiêu hao nhiên liệu và khoảng sáng gầm. {globalCars} mẫu xe, từ Toyota Corolla đến Bugatti Chiron.',
  },

  ui: {
    countryLabel: 'Quốc gia và Tiền tệ',
    popularCountries: 'Thị trường chính',
    otherCountries: 'Các quốc gia khác',
    africaNote: 'Bao gồm {usedCars} mẫu xe cũ nhập khẩu đặc trưng cho khu vực này, cùng với {globalCars} mẫu xe toàn cầu.',
    prompt: 'Bạn cần xe để làm gì?',
    rankedBy: 'Xếp hạng theo:',
    topRecs: 'Top {n} gợi ý — {country}',
    emptyState: 'Chọn một nhu cầu ở trên để xem gợi ý',
    match: 'Độ phù hợp',
    electric: 'Điện',
    electricMotor: 'Động cơ điện',
    seatsFmt: '{n} chỗ',
    bootFmt: 'Cốp {n}L',
    consumptionUnit: 'L/100km',
    showDetails: 'Xem chi tiết — lỗi thường gặp và lưu ý',
    hideDetails: 'Ẩn chi tiết',
    commonIssues: 'Lỗi thường gặp:',
    estIn: 'ước tính tại {country}',
    copyLink: 'Sao chép liên kết',
    linkCopied: 'Đã sao chép',
  },

  enums: {
    maintenance: { Low: 'Thấp', Medium: 'Trung bình', High: 'Cao', 'Very High': 'Rất cao' },
    spareParts: { Easy: 'Dễ kiếm', Moderate: 'Trung bình', Hard: 'Khó kiếm' },
    bodyType: {
      Sedan: 'Sedan', Convertible: 'Mui trần', Coupe: 'Coupe', SUV: 'SUV', Pickup: 'Bán tải',
      Hatchback: 'Hatchback', Wagon: 'Wagon', Minivan: 'MPV', Bus: 'Xe buýt',
    },
    fuelType: { Petrol: 'Xăng', Hybrid: 'Hybrid', 'Petrol Hybrid': 'Xăng hybrid', Electric: 'Điện', Diesel: 'Dầu diesel' },
    transmission: {
      Automatic: 'Tự động', Manual: 'Số sàn', CVT: 'CVT', eCVT: 'eCVT', DCT: 'DCT', PDK: 'PDK', DSG: 'DSG',
      'Single-speed': 'Một cấp số', '8-speed DCT': 'DCT 8 cấp', '2-speed (rear)': '2 cấp (sau)',
      'Single/2-speed': 'Một/2 cấp số', 'Single / dual-motor': 'Một / hai mô-tơ',
      'Single-speed (simulated gears)': 'Một cấp số (số giả lập)',
    },
  },

  useCases: {
    family:        { label: 'Xe Gia Đình', icon: '👨‍👩‍👧‍👦', description: 'Không gian, an toàn và độ tin cậy cho cả gia đình', priorities: 'Số chỗ · Cốp xe · Độ tin cậy · Giá', pickTitle: 'Xe Gia Đình Tốt Nhất' },
    commercial:    { label: 'Kinh Doanh / Taxi công nghệ', icon: '🚖', description: 'Dành cho khai thác thương mại hằng ngày, chạy nhiều', priorities: 'Độ bền · Phụ tùng rẻ · Tiết kiệm nhiên liệu', pickTitle: 'Tốt Nhất Để Kinh Doanh' },
    highway:       { label: 'Cao Tốc và Đường Dài', icon: '🛣️', description: 'Thoải mái và ổn định trên hành trình dài', priorities: 'Tiêu hao nhiên liệu · Công suất · Độ tin cậy', pickTitle: 'Tốt Nhất Cho Cao Tốc' },
    budget:        { label: 'Ngân Sách Thấp', icon: '💰', description: 'Giá trị tốt nhất khi ngân sách eo hẹp', priorities: 'Giá mua thấp · Bảo dưỡng rẻ', pickTitle: 'Lựa Chọn Tiết Kiệm Nhất' },
    offroad:       { label: 'Đường Xấu / Địa Hình', icon: '🪨', description: 'Gầm cao cho địa hình khó và đường xấu', priorities: 'Khoảng sáng gầm · Độ bền · Phụ tùng', pickTitle: 'Tốt Nhất Cho Đường Xấu' },
    executive:     { label: 'Doanh Nhân', icon: '💼', description: 'Phong thái, tiện nghi và hình ảnh thương hiệu cho người đi làm', priorities: 'Đẳng cấp · Động cơ · Chi phí vận hành', pickTitle: 'Xe Doanh Nhân Tốt Nhất' },
    firstcar:      { label: 'Xe Đầu Tiên', icon: '🎓', description: 'Dễ lái, dễ tính với lỗi của người mới và bảo dưỡng rẻ', priorities: 'Bảo dưỡng thấp · Phụ tùng dễ kiếm · Độ tin cậy', pickTitle: 'Xe Đầu Tiên Tốt Nhất' },
    fuelefficient: { label: 'Tiết Kiệm Nhiên Liệu / Điện', icon: '⛽', description: 'Chi phí vận hành trên mỗi km thấp nhất', priorities: 'Mức tiêu hao nhiên liệu hoặc điện · Bảo dưỡng · Phụ tùng', pickTitle: 'Tiết Kiệm Nhất' },
  },

  seo: {
    reviewedByLabel: 'Biên tập:',
    reviewer: 'Đội ngũ biên tập Naira Autos',
    updatedLabel: 'Cập nhật nội dung:',
    picksHeading: 'Xe Tốt Nhất Theo Nhu Cầu — 2026',
    picksNote:
      'Các danh sách này được tạo bằng cùng cách chấm điểm mà công cụ sử dụng, cho một thị trường tham chiếu. Thứ hạng chính xác và giá sẽ thay đổi theo quốc gia bạn chọn ở trên, và các mẫu xe cũ nhập khẩu được thêm vào cho các nước châu Phi.',
    faqHeading: 'Câu Hỏi Thường Gặp',
    moreToolsHeading: 'Thêm công cụ miễn phí',
    disclaimer:
      'Giá là ước tính cho {countries} thị trường, không phải báo giá. Đánh giá bảo dưỡng và phụ tùng là nhận định của ban biên tập và có thể khác nhau giữa các thị trường. Luôn kiểm tra xe trực tiếp, xem lịch sử xe và xin báo giá tại địa phương trước khi mua.',
    sections: [
      {
        h2: 'Công cụ tư vấn chọn xe hoạt động như thế nào',
        paragraphs: [
          '“Xe Tốt Nhất Cho Bạn” xếp hạng {totalCars} chiếc xe theo cách bạn thực sự sẽ dùng xe. Bạn chọn quốc gia và nhu cầu — gia đình, kinh doanh hoặc taxi công nghệ, cao tốc, ngân sách thấp, đường xấu, doanh nhân, xe đầu tiên hoặc tiết kiệm nhiên liệu — và công cụ chấm điểm mọi mẫu xe được bán hoặc thường được nhập khẩu tại thị trường đó, rồi hiển thị năm xe tốt nhất. Mỗi điểm số từ 0 đến 100 và chỉ kết hợp các yếu tố đo lường được: chi phí bảo dưỡng, độ sẵn có của phụ tùng, mức tiêu hao nhiên liệu hoặc điện, khoảng sáng gầm, số chỗ ngồi, dung tích cốp, dung tích động cơ và giá mua.',
          'Trọng số thay đổi theo nhu cầu. Với xe taxi hoặc xe giao hàng, bảo dưỡng và độ sẵn có của phụ tùng chiếm 70% điểm. Với người cần xe đi đường xấu, riêng khoảng sáng gầm đã chiếm một nửa. Với xe đầu tiên, độ tin cậy và phụ tùng dễ kiếm quan trọng hơn nhiều so với sức mạnh.',
          'Thứ hạng giống nhau ở mọi quốc gia, và điều này là có chủ ý. Điểm số dùng giá cơ sở bằng đô la Mỹ của mỗi xe, nên chuyển từ Hà Nội sang Bangkok chỉ thay đổi giá bạn thấy, không đổi thứ tự danh sách. Nhờ vậy gợi ý luôn nói về chính chiếc xe, còn ước tính bên dưới mỗi kết quả điều chỉnh theo tiền tệ và các loại thuế, phí thường gặp ở thị trường của bạn. Công cụ bao phủ {countries} quốc gia: {globalCars} mẫu xe được so sánh ở mọi nơi, và ở các thị trường châu Phi có thêm {usedCars} mẫu xe cũ nhập khẩu.',
        ],
      },
      {
        h2: 'Bắt đầu từ nhu cầu hằng ngày, không phải bảng thông số',
        paragraphs: [
          'Chiếc xe tốt nhất cho bạn phụ thuộc vào **cách bạn dùng xe thực tế mỗi ngày** nhiều hơn là thông số. Một chiếc xe tuyệt vời trên giấy có thể là lựa chọn tồi nếu thợ biết xe ở quá xa, hoặc nếu gầm thấp biến quãng đường đi làm hằng ngày thành đường đua vượt chướng ngại.',
          'Với **xe kinh doanh và taxi công nghệ**, độ tin cậy khi chạy nhiều và chi phí phụ tùng trên mỗi km thấp quyết định tất cả. Toyota Corolla và Toyota Camry là hình ảnh quen thuộc trong đội xe taxi và giao hàng ở nhiều nước vì động cơ đơn giản, chịu được việc bỏ lỡ một lần bảo dưỡng và gần như thợ nào cũng sửa được.',
          'Với **xe doanh nhân**, hình ảnh thương hiệu có giá trị thật, nhưng không nên lấn át chi phí vận hành. Mercedes-Benz S-Class ở đây được xếp mức bảo dưỡng “Rất cao”: hệ thống treo khí nén và điện tử phức tạp có thể biến một lần sửa chữa thành hóa đơn hàng trăm triệu đồng. Nhiều người đi làm sẽ hợp với một chiếc sedan bình dân được chăm tốt hơn là xe sang chạy nhiều với chi phí sửa chữa tăng dần.',
          'Với **người mua xe đầu tiên**, điều quan trọng nhất là thợ quen với dòng xe đó. Chiếc xe có lỗi cần chẩn đoán chuyên sâu sẽ sửa lâu hơn và tốn kém hơn. Các mẫu Toyota và Honda động cơ dưới 2,5 lít có hệ sinh thái phụ tùng, gara và lời khuyên trên mạng lớn nhất, dù bạn mua ở đâu.',
          'Với **gia đình**, số chỗ và cốp xe rất quan trọng, nhưng giá của một chiếc SUV ba hàng ghế mà có thể bạn không cần cũng vậy. Vì thế điểm xe gia đình cũng thưởng cho giá mua thấp hơn: một chiếc crossover năm chỗ thường phục vụ gia đình bốn người tốt như một chiếc xe lớn hơn nhiều, với chi phí chỉ bằng một phần nhỏ.',
          'Với **đường xấu và địa hình**, hãy xem khoảng sáng gầm trước, rồi mới đến hệ dẫn động. Khoảng 250 mm giúp vượt ổ gà, đường ngập và đường đất; còn sedan gầm 140 mm vẫn có thể chạy trong phố nếu lái cẩn thận — nhưng gờ giảm tốc và ngập nước sẽ là vấn đề lặp đi lặp lại.',
        ],
      },
      {
        h2: 'Tổng chi phí sở hữu quan trọng hơn giá niêm yết',
        paragraphs: [
          'Xe rẻ hơn chưa chắc là lựa chọn tiết kiệm hơn. Trong năm năm, nhiên liệu, bảo dưỡng, bảo hiểm, lốp và sửa chữa có thể ngang bằng giá mua, đặc biệt ở các thị trường mà phụ tùng nhập khẩu về chậm. Hai chiếc xe giá tương tự có thể chênh nhau hàng nghìn đô la về chi phí sở hữu chỉ vì một chiếc dùng chung phụ tùng với hàng triệu xe khác còn chiếc kia cần một bộ phận chỉ hãng mới có.',
          'Hãy dùng nhãn bảo dưỡng và phụ tùng ở mỗi kết quả như đường tắt để ước lượng chi phí ẩn này, rồi đưa danh sách rút gọn qua [Máy tính chi phí nhiên liệu](/tools/fuel-cost-calculator-global) để đổi số liệu tiêu hao thành chi phí hằng tháng theo quãng đường của bạn. Giá trị bán lại cũng quan trọng: ở nhiều thị trường, các mẫu xe Nhật và Hàn phổ biến giữ giá tốt hơn các hãng ngách hay hãng bảo dưỡng đắt đỏ, giúp giảm chi phí sở hữu thực tế.',
        ],
      },
      {
        h2: 'Việt Nam và khu vực: điều gì quan trọng ở địa phương',
        paragraphs: [
          'Ở Việt Nam, chi phí mua xe chịu ảnh hưởng lớn bởi thuế và phí: thuế nhập khẩu, thuế tiêu thụ đặc biệt tính theo dung tích động cơ, thuế giá trị gia tăng và lệ phí trước bạ khi đăng ký, cộng thêm phí đường bộ và đăng kiểm định kỳ. Vì vậy cùng một mẫu xe có thể đắt hơn nhiều so với ở nước có thuế thấp, và xe dung tích nhỏ thường được ưa chuộng. Giá ước tính trong công cụ chỉ là điểm xuất phát, hãy xác nhận với đại lý về giá lăn bánh thực tế.',
          'Đô thị Việt Nam đông xe máy, đường hẹp và chỗ đỗ hạn chế, nên xe nhỏ gọn, dễ xoay trở và tiết kiệm trong giao thông ùn tắc rất thực tế. Mùa mưa ngập ở nhiều thành phố khiến khoảng sáng gầm không chỉ dành cho người đi địa hình mà là nhu cầu hằng ngày. Nếu thường đi tỉnh hoặc vùng núi, hệ thống treo bền, gầm cao và phụ tùng dễ kiếm sẽ đáng giá hơn nhiều so với công suất lớn.',
          'Công cụ này chủ yếu so sánh các mẫu xe toàn cầu, nên nhiều dòng xe phổ biến và xe sản xuất trong nước chưa có trong danh sách; hãy xem kết quả như một so sánh chung và kiểm tra giá, phiên bản chính thức tại đại lý. Với kiều bào, các nước như Mỹ, Úc, Canada, Anh, Đức, Pháp, Nhật và Hàn được xếp đầu danh sách. Vùng Vịnh có thuế thấp và nhiên liệu rẻ nên giá trị của SUV lớn và động cơ V6 khác với các thị trường thuế cao. Ở các thị trường châu Phi, xe cũ nhập khẩu từ mười đến hai mươi năm tuổi rất phổ biến, nên công cụ thêm {usedCars} mẫu xe cũ cùng lỗi thường gặp và mẹo kiểm tra cho người mua xe cũ. Đó là lý do có bộ chọn quốc gia: cùng một chiếc xe có thể là món hời ở thị trường này nhưng là sự xa xỉ đắt đỏ ở thị trường khác.',
        ],
      },
      {
        h2: 'Cách đọc đánh giá bảo dưỡng và phụ tùng',
        paragraphs: [
          '**Chi phí bảo dưỡng** đánh giá chi phí duy trì thông thường để giữ một mẫu xe lăn bánh so với các xe khác: Thấp, Trung bình, Cao hoặc Rất cao. **Độ sẵn có của phụ tùng** đánh giá mức dễ dàng tìm được phụ tùng thay thế: Dễ kiếm, Trung bình hoặc Khó kiếm. Cả hai đều là đánh giá của ban biên tập dựa trên danh tiếng của mẫu xe, giá dịch vụ thông thường và mạng lưới phụ tùng. Đó không phải báo giá của bất kỳ gara nào và có thể khác nhau giữa các thị trường.',
          'Hãy xem “Thấp” và “Dễ kiếm” là tín hiệu tốt. Hãy xem “Cao” hoặc “Khó kiếm” là lời nhắc nên hỏi thợ địa phương trước khi quyết định. Mỗi kết quả cũng nêu lỗi thường gặp và một lưu ý riêng cho mẫu xe đó — hãy đọc trước khi đi xem xe.',
        ],
      },
      {
        h2: 'Giá theo quốc gia được ước tính thế nào — và giới hạn',
        paragraphs: [
          'Mỗi xe có một giá cơ sở bằng đô la Mỹ, là con số xấp xỉ cho phiên bản tiêu chuẩn 2025–2026. Để hiển thị giá địa phương, công cụ nhân giá cơ sở này với hệ số thị trường riêng của từng quốc gia — ước tính mang tính định hướng về thuế nhập khẩu, thuế tiêu thụ đặc biệt, VAT và biên lợi nhuận đại lý thông thường — và với tỷ giá. Vì tỷ giá và quy định thuế thay đổi, hãy xem kết quả là điểm khởi đầu cho ngân sách, không phải báo giá.',
          'Một số mẫu xe không được bán mới ở một số nước, và phiên bản, tùy chọn cùng tình trạng xe cũ có thể khiến giá thực tế lệch xa các ước tính này. Hãy xác nhận với tin đăng địa phương hoặc đại lý trước khi chốt ngân sách cuối cùng.',
        ],
      },
      {
        h2: 'Từ danh sách rút gọn đến quyết định',
        paragraphs: [
          'Chọn nhu cầu của bạn, mở **Xem chi tiết** ở từng kết quả hàng đầu và ghi lại các lỗi thường gặp. So sánh hai lựa chọn yêu thích cạnh nhau bằng [Công cụ so sánh xe](/tools/car-comparison). Trước khi trả tiền cho bất kỳ xe cũ nào, hãy kiểm tra lịch sử bằng [công cụ tra cứu VIN](/tools/vin-checker-global) và nhờ kiểm tra kỹ thuật độc lập. Khi đã sở hữu xe, [Xe của tôi đáng giá bao nhiêu?](/cong-cu/xe-cua-toi-dang-gia-bao-nhieu) giúp bạn theo dõi giá trị xe. Bạn cũng có thể dùng **Sao chép liên kết** để chia sẻ quốc gia và nhu cầu đã chọn với người thân hoặc thợ.',
        ],
      },
    ],
    exampleTitle: 'Ví dụ: chọn xe khớp với cách dùng thực tế',
    exampleBody:
      'Đây là kịch bản minh họa, không phải ca khách hàng thật. Hãy tưởng tượng chủ một cơ sở giao hàng nhỏ ở thành phố lớn bị thu hút bởi chiếc SUV bảy chỗ nhờ khoang chở hàng rộng. Nhưng trong bảng xếp hạng kinh doanh, Toyota Corolla và Toyota RAV4 lại có điểm cao hơn các xe lớn, vì tuyến đường thực tế của anh là những chặng ngắn dừng đi liên tục với tải trọng vừa phải, nơi chi phí phụ tùng trên mỗi km và mức tiêu hao nhiên liệu quan trọng hơn dung tích chở hàng thuần túy. Điểm số không nói rằng chiếc SUV là xe tồi — chỉ là nó ít phù hợp với kiểu sử dụng đó. Số tiền tiết kiệm được ở giá mua và nhiên liệu có thể giữ lại làm vốn lưu động cho công việc kinh doanh.',
  },

  related: { compare: 'Công cụ so sánh xe', fuel: 'Máy tính chi phí nhiên liệu', valuation: 'Xe của tôi đáng giá bao nhiêu?' },

  faqs: [
    { q: 'Công cụ này có hiển thị giá thật cho nước tôi không?', a: 'Công cụ hiển thị giá ước tính, không phải báo giá trực tiếp. Mỗi xe có giá cơ sở bằng đô la Mỹ; khi chọn quốc gia, hệ số thuế và phí thường gặp của thị trường đó cùng tỷ giá được áp dụng để ước tính giá địa phương. Hãy xác nhận với đại lý hoặc tin đăng địa phương trước khi lập ngân sách chính xác.' },
    { q: 'Các xe được chấm điểm như thế nào?', a: 'Mỗi xe nhận điểm từ 0 đến 100 cho từng nhu cầu dựa trên các yếu tố đo lường được — chi phí bảo dưỡng, độ sẵn có của phụ tùng, tiêu hao nhiên liệu, khoảng sáng gầm, số chỗ, cốp xe, dung tích động cơ và giá mua — với trọng số khác nhau cho từng nhu cầu. Thứ hạng không đổi theo quốc gia, chỉ giá hiển thị thay đổi.' },
    { q: 'Xe gia đình tốt nhất nên mua là gì?', a: 'Trong bảng xếp hạng của chúng tôi, {picks:family} dẫn đầu cho nhu cầu gia đình, cân bằng giữa số chỗ, cốp xe, độ tin cậy và giá. Gia đình đông người nên kiểm tra số chỗ trong phần chi tiết của mỗi kết quả.' },
    { q: 'Xe tốt nhất để kinh doanh hoặc chạy taxi công nghệ là gì?', a: 'Với khai thác thương mại chạy nhiều, ba xe hàng đầu là {picks:commercial}. Chúng kết hợp chi phí bảo dưỡng thấp, phụ tùng dễ kiếm và mức tiêu hao hợp lý, giữ chi phí trên mỗi km ở mức thấp.' },
    { q: 'Xe tốt nhất cho đường xấu hoặc chưa trải nhựa là gì?', a: 'Khoảng sáng gầm và độ bền dẫn đầu bảng này. Ba xe hàng đầu hiện tại là {picks:offroad}. Chỉ đi trong phố thì sedan vẫn dùng được nếu lái cẩn thận, nhưng ngập nước và gờ giảm tốc sẽ thử thách các xe gầm thấp.' },
    { q: 'Xe đầu tiên tốt nhất là gì?', a: 'Các lựa chọn hàng đầu cho xe đầu tiên là {picks:firstcar}: bảo dưỡng thấp, phụ tùng dễ kiếm và thợ nào cũng quen. Tránh các hãng siêu sang và xe độc lạ làm xe đầu tiên — phụ tùng đắt và cần thợ chuyên biệt.' },
    { q: 'Những xe nào tiết kiệm nhiên liệu hoặc điện nhất?', a: 'Xe hybrid và xe điện dẫn đầu: {picks:fuelefficient}. Xe điện chỉ hợp lý nếu có thể sạc đáng tin cậy nơi bạn sống và lái, nên hãy kiểm tra mạng lưới trạm sạc trước khi quyết định.' },
    { q: 'Vì sao các nước châu Phi hiển thị mẫu xe cũ đời cũ hơn?', a: 'Ở nhiều thị trường châu Phi, xe cũ nhập khẩu là cách mua xe phổ biến. Khi bạn chọn một nước châu Phi, công cụ thêm {usedCars} mẫu xe cũ với lỗi thường gặp và mẹo kiểm tra cho người mua xe cũ, cùng với {globalCars} mẫu xe toàn cầu.' },
  ],

  schema: {
    appName: 'Xe Tốt Nhất Cho Bạn — công cụ tư vấn chọn xe theo nhu cầu',
    appDescription: 'Công cụ tư vấn chọn xe miễn phí: chọn quốc gia và nhu cầu để nhận top 5 trong {totalCars} xe, kèm giá địa phương ước tính tại {countries} quốc gia.',
    publisher: 'Naira Autos',
    author: 'Đội ngũ biên tập Naira Autos',
  },
};
