import React from 'react';
import { Hammer, Trees, Sparkles, HeartHandshake } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 bg-white border-t border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-semibold text-[#b48454] mb-2">ورشة أَرْز للأخشاب</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292524] mb-4">
            لماذا نختار الأخشاب الصلبة الطبيعية؟
          </h2>
          <p className="text-sm text-[#57534e] leading-relaxed">
            بدأت ورشتنا بشغف الحفاظ على فن النجارة التقليدي المعشق. كل قطعة تخرج من بين أيدينا ليست مجرد منتج، بل قطعة أثاث وديكور حية تتنفس وتزداد جمالاً مع مرور الزمن.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#f0e9df] text-center md:text-right">
            <div className="w-10 h-10 rounded-lg bg-[#f0e9df] text-[#b48454] flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Trees className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#292524] mb-2">أخشاب مستدامة ومعمرة</h3>
            <p className="text-xs text-[#78716c] leading-relaxed">
              ننتقي ألواح البلوط والزان والجوز المجففة هندسياً لمقاومة التقوس والتمدد مع تغير الفصول.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#f0e9df] text-center md:text-right">
            <div className="w-10 h-10 rounded-lg bg-[#f0e9df] text-[#b48454] flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Hammer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#292524] mb-2">تعشيق بدون مسامير ظاهرة</h3>
            <p className="text-xs text-[#78716c] leading-relaxed">
              نعتمد تقنيات التعشيق اليابانية والإسكندنافية (النقر واللسان) لضمان ثبات القطع لعقود.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#f0e9df] text-center md:text-right">
            <div className="w-10 h-10 rounded-lg bg-[#f0e9df] text-[#b48454] flex items-center justify-center mb-4 mx-auto md:mx-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#292524] mb-2">حماية شمعية آمنة</h3>
            <p className="text-xs text-[#78716c] leading-relaxed">
              طلاء يدوي بمزيج شمع العسل العضوي وزيوت بذر الكتان الخالية من الروائح والكيماويات الضارة.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#faf8f5] border border-[#f0e9df] text-center md:text-right">
            <div className="w-10 h-10 rounded-lg bg-[#f0e9df] text-[#b48454] flex items-center justify-center mb-4 mx-auto md:mx-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-sm text-[#292524] mb-2">شحن وتغليف مضمون</h3>
            <p className="text-xs text-[#78716c] leading-relaxed">
              تغليف ممتص للصدمات وكرتون مقوى يضمن وصول البراويز والساعات والتحف سليمة 100%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
