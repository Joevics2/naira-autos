import { Mic, Camera, Wrench, Car, Ruler } from 'lucide-react';

// Single source of truth for the Vietnamese tools index (/cong-cu).
// Add an entry here ONLY when that tool's Vietnamese page is actually
// live — never list an untranslated tool (same rule as the other
// language tool lists).

export type ToolVi = {
  href: string;
  icon: React.ElementType;
  label: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  category: string;
};

export const TOOLS_VI: ToolVi[] = [
  {
    href: '/cong-cu/phan-tich-tieng-dong-co',
    icon: Mic,
    label: 'Phân Tích Tiếng Động Cơ',
    description: 'Ghi âm hoặc tải lên tiếng động cơ xe và nhận ngay chẩn đoán AI về nguyên nhân có thể.',
    badge: 'Miễn Phí',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI và Công Cụ Thông Minh',
  },
  {
    href: '/cong-cu/tho-may-ao',
    icon: Wrench,
    label: 'Thợ Máy Ảo AI',
    description: 'Mô tả sự cố, tải ảnh, âm thanh hoặc video, nhận chẩn đoán và chi phí sửa chữa trong vài giây.',
    badge: 'Miễn Phí',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI và Công Cụ Thông Minh',
  },
  {
    href: '/cong-cu/xe-cua-toi-dang-gia-bao-nhieu',
    icon: Camera,
    label: 'Xe Của Tôi Đáng Giá Bao Nhiêu?',
    description: 'Tải lên một ảnh, AI sẽ tính giá trị thị trường theo đúng loại tiền tệ của bạn chỉ trong vài giây.',
    badge: 'Miễn Phí',
    badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    category: 'AI và Công Cụ Thông Minh',
  },
  {
    href: "/cong-cu/xe-tot-nhat-cho-ban",
    icon: Car,
    label: "Xe Tốt Nhất Cho Bạn",
    description: "Chọn nhu cầu — gia đình, kinh doanh, cao tốc, ngân sách thấp, đường xấu hoặc doanh nhân — và nhận gợi ý kèm giá địa phương tại 55 quốc gia.",
    badge: "Mới",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "Chi Phí và Bảo Dưỡng",
  },
  {
    href: '/cong-cu/khoang-cach-giua-cac-thanh-pho',
    icon: Ruler,
    label: "Tính Khoảng Cách Giữa Các Thành Phố",
    description: "Tính khoảng cách đường bộ và thời gian lái xe giữa 24 thành phố ở Việt Nam, kèm công cụ tính chi phí xăng.",
    badge: "Mới",
    badgeColor: 'bg-sky-500/15 text-sky-500 border border-sky-500/30',
    category: "Chi Phí và Bảo Dưỡng",
  },
];

export const CATEGORIES_VI = ['AI và Công Cụ Thông Minh', 'Tài Chính', 'Chi Phí và Bảo Dưỡng', 'Xác Minh', 'Tài Nguyên'];
