import React from 'react';
import { MessageCircle, Code2, Database } from 'lucide-react';

interface FooterProps {
  onOpenSupabase: () => void;
  onOpenExport: () => void;
  onWhatsAppInquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenSupabase,
  onOpenExport,
  onWhatsAppInquiry,
}) => {
  return (
    <footer className="bg-[#1c1917] text-[#a8a29e] border-t border-[#292524] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-xl font-bold text-white tracking-tight">أَرْز للأخشاب</span>
            <p className="text-xs leading-relaxed text-[#78716c]">
              متجر مستقل للمنتجات الخشبية البسيطة والتحف اليدوية. صُنعت بدقة من أخشاب البلوط، الزان، والجوز الطبيعي.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-white text-sm mb-3">تشكيلاتنا</p>
            <p className="hover:text-white transition-colors cursor-pointer">براويز خشبية معلقة ومكتبية</p>
            <p className="hover:text-white transition-colors cursor-pointer">ساعات حائط صامتة مينيمال</p>
            <p className="hover:text-white transition-colors cursor-pointer">تحف وأنتيكات خشبية هندسية</p>
            <p className="hover:text-white transition-colors cursor-pointer">طرابيزات قهوة وجانبية صغيرة</p>
            <p className="hover:text-white transition-colors cursor-pointer">كراسي واستولات خشبية</p>
          </div>

          {/* Quick Technical tools */}
          <div className="space-y-2 text-xs">
            <p className="font-bold text-white text-sm mb-3">أدوات الربط والنشر</p>
            <button
              onClick={onOpenExport}
              className="text-right hover:text-[#b48454] transition-colors flex items-center gap-1.5"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>تصدير ملف index.html لـ GitHub Pages</span>
            </button>
            <button
              onClick={onOpenSupabase}
              className="text-right hover:text-[#b48454] transition-colors flex items-center gap-1.5 pt-1"
            >
              <Database className="w-3.5 h-3.5" />
              <span>تعديل الأسعار وربط Supabase</span>
            </button>
          </div>

          {/* Contact */}
          <div className="space-y-3 text-xs">
            <p className="font-bold text-white text-sm mb-3">التواصل والطلبات المخصصة</p>
            <p className="text-[#78716c]">
              هل تحتاج لمقاسات خاصة أو تصميم مخصص لبيتك أو مكتبك؟ تواصل معنا مباشرة:
            </p>
            <button
              onClick={onWhatsAppInquiry}
              className="px-4 py-2 bg-[#25D366] text-white font-bold rounded-lg hover:bg-[#20ba59] transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>محادثة واتساب مباشرة</span>
            </button>
          </div>
        </div>

        <div className="pt-8 border-t border-[#292524] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#78716c]">
          <p>© 2026 أَرْز للأخشاب اليدوية. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <span>صفحة مستقلة جاهزة لـ GitHub Pages</span>
            <span aria-hidden="true">·</span>
            <span>مدعومة بالربط المباشر مع Supabase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
