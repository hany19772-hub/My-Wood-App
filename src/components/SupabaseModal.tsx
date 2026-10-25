import React, { useState } from 'react';
import { Product, SupabaseConfig } from '../types';
import { X, Database, Check, AlertCircle, RefreshCw, Key, Link2, Copy, Save } from 'lucide-react';
import { fetchProductsFromSupabase, updateProductPriceInSupabase } from '../utils/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SupabaseConfig;
  onSaveConfig: (config: SupabaseConfig) => void;
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  products,
  onUpdateProducts,
}) => {
  const [url, setUrl] = useState(config.url || '');
  const [anonKey, setAnonKey] = useState(config.anonKey || '');
  const [tableName, setTableName] = useState(config.tableName || 'products');
  const [testing, setTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  // Local editable prices table
  const [editingPrices, setEditingPrices] = useState<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.id] = p.price;
    });
    return map;
  });
  const [savingPrices, setSavingPrices] = useState(false);
  const [savedPricesNotice, setSavedPricesNotice] = useState(false);

  if (!isOpen) return null;

  const handleTestAndSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      // Just save local preferences
      onSaveConfig({
        url: url.trim(),
        anonKey: anonKey.trim(),
        tableName: tableName.trim() || 'products',
        isConnected: false,
      });
      setStatusMessage({
        type: 'info',
        text: 'تم حفظ البيانات محلياً. يمكنك وضع الرابط والمفتاح عندما تقوم بإنشاء مشروع Supabase.',
      });
      return;
    }

    setTesting(true);
    setStatusMessage(null);

    const tempConfig: SupabaseConfig = {
      url: url.trim(),
      anonKey: anonKey.trim(),
      tableName: tableName.trim() || 'products',
      isConnected: false,
    };

    try {
      const fetched = await fetchProductsFromSupabase(tempConfig);
      tempConfig.isConnected = true;
      tempConfig.lastSynced = new Date().toLocaleTimeString('ar-EG');
      onSaveConfig(tempConfig);
      if (fetched.length > 0) {
        onUpdateProducts(fetched);
      }
      setStatusMessage({
        type: 'success',
        text: `تم الاتصال بنجاح بـ Supabase! تم جلب ${fetched.length} منتجات وتحديث الأسعار.`,
      });
    } catch (err: any) {
      tempConfig.isConnected = false;
      onSaveConfig(tempConfig);
      setStatusMessage({
        type: 'error',
        text: `تعذر الاتصال بـ Supabase: ${err.message || 'تأكد من صحة الرابط والمفتاح وسياسات RLS'}.`,
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSavePrices = async () => {
    setSavingPrices(true);
    const updated = products.map((p) => ({
      ...p,
      price: editingPrices[p.id] !== undefined ? editingPrices[p.id] : p.price,
    }));

    onUpdateProducts(updated);

    // If Supabase is connected, attempt to sync prices to remote
    if (config.isConnected && config.url && config.anonKey) {
      try {
        for (const p of updated) {
          await updateProductPriceInSupabase(config, p.id, p.price);
        }
      } catch (e) {
        console.warn('Could not sync all prices to remote supabase', e);
      }
    }

    setSavingPrices(false);
    setSavedPricesNotice(true);
    setTimeout(() => setSavedPricesNotice(false), 2500);
  };

  const sqlSchema = `-- كود إنشاء جدول المنتجات في Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name_ar TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  wood_type_ar TEXT,
  dimensions_ar TEXT,
  in_stock BOOLEAN DEFAULT true
);

-- السماح بالقراءة للجميع (Public Read)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read" ON public.products FOR SELECT USING (true);
CREATE POLICY "Allow anon update" ON public.products FOR UPDATE USING (true);`;

  const copySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div className="inline-block w-full max-w-3xl bg-white rounded-2xl text-right overflow-hidden shadow-2xl transform transition-all border border-[#ebdccd] my-8">
          {/* Header */}
          <div className="p-5 border-b border-[#f0e9df] flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-[#b48454]" />
              <h2 className="text-base font-bold text-[#292524]">
                ربط Supabase & إدارة الأسعار الحية
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
            {/* شرح الفكرة للعميل */}
            <div className="p-4 bg-[#faf8f5] rounded-xl border border-[#ebdccd] space-y-2">
              <p className="font-bold text-[#292524] text-sm">
                كيف يعمل ربط الأسعار مع سوبابيز (Supabase) وصفحة GitHub؟
              </p>
              <p className="leading-relaxed">
                عند نشر صفحة المتجر على GitHub Pages، تستطيع وضع رابط سوبابيز ومفتاح الـ Anon Key هنا أو في كود الصفحة. وبمجرد تغيير السعر في سوبابيز أو عبر هذا الجدول، سيتحدث السعر فوراً أمام كل زوار موقعك بدون الحاجة لإعادة رفع أي ملفات على GitHub!
              </p>
            </div>

            {/* إعدادات الاتصال بسوبابيز */}
            <form onSubmit={handleTestAndSave} className="space-y-4">
              <h3 className="font-bold text-sm text-[#292524] flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-[#b48454]" />
                <span>بيانات مشروع Supabase الخاص بك</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#292524] font-medium mb-1">
                    Project URL (رابط المشروع)
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://xyzabcdef.supabase.co"
                    className="w-full p-2.5 bg-white border border-[#d6c7b2] rounded-lg font-mono text-xs focus:ring-1 focus:ring-[#b48454] focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-[#292524] font-medium mb-1">
                    Anon Public Key (مفتاح الـ API العام)
                  </label>
                  <input
                    type="password"
                    value={anonKey}
                    onChange={(e) => setAnonKey(e.target.value)}
                    placeholder="eyJhbGciOiJIUzI1NiIsIn..."
                    className="w-full p-2.5 bg-white border border-[#d6c7b2] rounded-lg font-mono text-xs focus:ring-1 focus:ring-[#b48454] focus:outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    disabled={testing}
                    className="px-4 py-2 bg-[#292524] hover:bg-[#1c1917] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {testing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Database className="w-3.5 h-3.5 text-[#b48454]" />
                    )}
                    <span>{testing ? 'جارِ فحص الاتصال...' : 'حفظ واختبار الاتصال بسوبابيز'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={copySql}
                    className="px-3 py-2 border border-[#d6c7b2] hover:bg-[#f3ebe1] text-[#292524] rounded-lg transition-colors flex items-center gap-1"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? 'تم نسخ كود SQL' : 'نسخ كود جدول SQL'}</span>
                  </button>
                </div>

                {config.isConnected && (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    متصل بنجاح مع Supabase
                  </span>
                )}
              </div>

              {statusMessage && (
                <div
                  className={`p-3 rounded-lg border flex items-center gap-2 ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : statusMessage.type === 'error'
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}
            </form>

            {/* محرر الأسعار المباشر السريع */}
            <div className="pt-4 border-t border-[#f0e9df]">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-bold text-sm text-[#292524]">
                    محرر الأسعار السريع للمنتجات
                  </h3>
                  <p className="text-[11px] text-[#78716c]">
                    عدل أي سعر واضغط "تطبيق وحفظ الأسعار" لتحديث المتجر فوراً.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSavePrices}
                  disabled={savingPrices}
                  className="px-4 py-2 bg-[#b48454] hover:bg-[#986a3d] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{savingPrices ? 'جارِ الحفظ...' : 'تطبيق وحفظ الأسعار'}</span>
                </button>
              </div>

              {savedPricesNotice && (
                <div className="p-2 mb-3 bg-emerald-50 text-emerald-800 rounded border border-emerald-200 text-xs font-bold text-center">
                  تم حفظ وتحديث أسعار المنتجات في المتجر بنجاح!
                </div>
              )}

              <div className="max-h-60 overflow-y-auto border border-[#ebdccd] rounded-xl">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#faf8f5] text-[#292524] font-bold border-b border-[#ebdccd]">
                    <tr>
                      <th className="p-3">المنتج</th>
                      <th className="p-3">الفئة</th>
                      <th className="p-3">السعر الحالي (ج.م)</th>
                      <th className="p-3">تعديل السعر</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#f0e9df]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#faf8f5]/60">
                        <td className="p-3 font-medium text-[#292524]">{p.nameAr}</td>
                        <td className="p-3 text-[#78716c]">{p.categoryNameAr}</td>
                        <td className="p-3 font-mono font-bold text-[#292524] tabular-nums">{p.price} ج.م</td>
                        <td className="p-3">
                          <input
                            type="number"
                            min="10"
                            step="10"
                            value={editingPrices[p.id] ?? p.price}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setEditingPrices((prev) => ({ ...prev, [p.id]: val }));
                            }}
                            className="w-24 p-1.5 bg-white border border-[#d6c7b2] rounded font-mono font-bold text-xs focus:ring-1 focus:ring-[#b48454] focus:outline-none tabular-nums"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
