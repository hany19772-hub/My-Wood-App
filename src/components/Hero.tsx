import React from 'react';
import { ArrowDown, CheckCircle2, MessageCircle } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onWhatsAppInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onWhatsAppInquiry }) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 lg:pt-16 lg:pb-24 border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* نص الهيرو والتعريف */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#b48454] mb-4">
              <span>أخشاب طبيعية صلبة 100%</span>
              <span aria-hidden="true">·</span>
              <span>شغل يدوي مصري فاخر</span>
              <span aria-hidden="true">·</span>
              <span>بدون وسيط</span>
            </div>

            <h1 
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#292524] leading-[1.25] tracking-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              تحف ومنتجات خشبية بسيطة تمنح بيتك أصالة وهدوء الطبيعة
            </h1>

            <p className="text-base sm:text-lg text-[#57534e] leading-relaxed mb-8 max-w-2xl">
              نصمم ونصنع قطعاً خشبية معمرة تخدمك لسنوات: براويز صور أنيقة، ساعات حائط مينيمال صامتة، أنتيكات ومجسمات مكتبية، طرابيزات قهوة جانبية، وكراسي واستولات خشبية صغيرة مصنوعة من خشب البلوط والزان والجوز.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-[#292524] hover:bg-[#1c1917] text-white font-medium text-sm rounded-lg transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>تصفح المنتجات والأسعار</span>
                <ArrowDown className="w-4 h-4 text-[#b48454]" />
              </button>

              <button
                onClick={onWhatsAppInquiry}
                className="px-5 py-3.5 border border-[#d6c7b2] hover:bg-[#f3ebe1] text-[#292524] font-medium text-sm rounded-lg transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>طلب واستفسار عبر واتساب</span>
              </button>
            </div>

            {/* المزايا السريعة */}
            <div className="mt-10 pt-8 border-t border-[#f0e9df] grid grid-cols-3 gap-4 text-xs text-[#57534e]">
              <div>
                <p className="font-bold text-[#292524] text-sm mb-1">أخشاب مصمتة</p>
                <p className="text-[#78716c]">بدون MDF أو خامات صناعية رديئة</p>
              </div>
              <div>
                <p className="font-bold text-[#292524] text-sm mb-1">تشطيب صحي</p>
                <p className="text-[#78716c]">شمع العسل وزيوت بذر الكتان النقية</p>
              </div>
              <div>
                <p className="font-bold text-[#292524] text-sm mb-1">توصيل سريع</p>
                <p className="text-[#78716c]">تغليف آمن حتى باب المنزل</p>
              </div>
            </div>
          </div>

          {/* الصورة البارزة للهيرو */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#e8dfd5] shadow-lg bg-[#f0e9df] aspect-[4/3]">
              <img
                src="/src/assets/images/wood_clock_minimalist_1792953005054.jpg"
                alt="ساعة حائط خشبية مينيمال مصنوعة يدوياً"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md p-3.5 rounded-xl border border-white/60 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-[#b48454] font-bold">القطعة الأكثر طلباً هذا الأسبوع</p>
                  <p className="text-xs font-bold text-[#292524]">ساعة حائط دائرية من الجوز الصلب</p>
                </div>
                <span className="text-sm font-bold text-[#292524] font-mono tabular-nums">680 ج.م</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
