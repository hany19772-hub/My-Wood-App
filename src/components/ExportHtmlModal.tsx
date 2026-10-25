import React, { useState } from 'react';
import { Product, SupabaseConfig } from '../types';
import { X, Download, Copy, Check, Code2, Globe, Github } from 'lucide-react';
import { generateStandaloneHtml } from '../utils/generateHtml';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  supabaseConfig: SupabaseConfig;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  onClose,
  products,
  supabaseConfig,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateStandaloneHtml(
    products, 
    supabaseConfig.url, 
    supabaseConfig.anonKey
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div className="inline-block w-full max-w-4xl bg-white rounded-2xl text-right overflow-hidden shadow-2xl transform transition-all border border-[#ebdccd] my-8">
          {/* Header */}
          <div className="p-5 border-b border-[#f0e9df] flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#b48454]" />
              <h2 className="text-base font-bold text-[#292524]">
                تصدير ملف index.html بالكامل لـ GitHub Pages
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-6 text-xs text-[#57534e]">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#faf8f5] rounded-xl border border-[#ebdccd]">
              <div>
                <h3 className="font-bold text-sm text-[#292524] mb-1">
                  صفحة HTML5 واحدة ومستقلة 100% جاهزة للرفع
                </h3>
                <p className="text-[11px] text-[#78716c]">
                  تحتوي على جميع المنتجات، الأسعار، السلة، الواتساب، والربط مع Supabase في ملف واحد بدون أي تثبيت أو سيرفر.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="px-4 py-2.5 bg-[#292524] hover:bg-[#1c1917] text-white font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                >
                  <Download className="w-4 h-4 text-[#b48454]" />
                  <span>تحميل ملف index.html</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="px-4 py-2.5 border border-[#d6c7b2] hover:bg-white text-[#292524] font-bold rounded-lg transition-colors flex items-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم نسخ الكود!' : 'نسخ كود HTML بالكامل'}</span>
                </button>
              </div>
            </div>

            {/* خطوات النشر السريعة على GitHub Pages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#ebdccd] rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                  <Github className="w-4 h-4 text-[#b48454]" />
                  <span>1. إنشاء المستودع (Repo)</span>
                </div>
                <p className="text-[#78716c] leading-relaxed">
                  ادخل على حسابك في GitHub، اضغط <b>New Repository</b> وسمه مثلاً <code className="bg-[#f0e9df] px-1 rounded">wood-store</code> واجعله <b>Public</b>.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#ebdccd] rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                  <Download className="w-4 h-4 text-[#b48454]" />
                  <span>2. رفع ملف index.html</span>
                </div>
                <p className="text-[#78716c] leading-relaxed">
                  حمل الملف بالزر أعلاه أو انسخه، ثم في المستودع اضغط <b>Add file</b> ➔ <b>Upload files</b> وارفع <code className="bg-[#f0e9df] px-1 rounded">index.html</code> واضغط Commit.
                </p>
              </div>

              <div className="p-4 bg-white border border-[#ebdccd] rounded-xl space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[#292524]">
                  <Globe className="w-4 h-4 text-[#b48454]" />
                  <span>3. تفعيل GitHub Pages</span>
                </div>
                <p className="text-[#78716c] leading-relaxed">
                  اذهب إلى <b>Settings</b> ➔ <b>Pages</b>، وفي قسم <b>Branch</b> اختر <code className="bg-[#f0e9df] px-1 rounded">main</code> واضغط Save. سيظهر لك رابط موقعك فوراً!
                </p>
              </div>
            </div>

            {/* معاينة الكود */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-[#292524]">معاينة كود الصفحة (index.html):</span>
                <span className="font-mono text-[10px] text-[#78716c]">HTML5 · Tailwind CDN · Vanilla JS</span>
              </div>
              <div className="relative">
                <pre 
                  dir="ltr"
                  className="w-full max-h-72 overflow-y-auto p-4 bg-[#1c1917] text-[#d6c7b2] rounded-xl font-mono text-[11px] leading-relaxed selection:bg-[#b48454] selection:text-white text-left"
                >
                  <code>{htmlContent.slice(0, 1500)}...

{`<!-- باقي كود الصفحة الكامل يشمل جميع المنتجات والسكربتات (${htmlContent.length} حرف) -->`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
