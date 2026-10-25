import React from 'react';
import { ShoppingBag, Database, Code2, Sparkles } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSupabase: () => void;
  onOpenExport: () => void;
  supabaseConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSupabase,
  onOpenExport,
  supabaseConnected,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#ebdccd]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single text element) */}
        <a 
          href="#" 
          className="text-2xl font-extrabold tracking-tight text-[#292524] hover:text-[#b48454] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
        >
          <span className="w-3 h-3 bg-[#b48454] rounded-sm"></span>
          <span>أَرْز للأخشاب</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534e]">
          <a 
            href="#products" 
            className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0"
          >
            المعروضات الخشبية
          </a>
          <a 
            href="#story" 
            className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0"
          >
            عن الورشة والحرفة
          </a>
          <button 
            onClick={onOpenSupabase}
            className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Database className="w-4 h-4 text-[#b48454]" />
            <span>ربط وتحديث الأسعار (Supabase)</span>
            {supabaseConnected && (
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">متصل</span>
            )}
          </button>
          <button 
            onClick={onOpenExport}
            className="hover:text-[#292524] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Code2 className="w-4 h-4 text-[#b48454]" />
            <span>تصدير HTML لـ GitHub</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            className="px-4 py-2.5 text-xs font-semibold text-white bg-[#292524] hover:bg-[#b48454] rounded-lg transition-colors flex items-center gap-2 shadow-sm whitespace-nowrap shrink-0"
            aria-label="عرض سلة التسوق"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>سلة الطلبات</span>
            <span className="bg-[#b48454] text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
