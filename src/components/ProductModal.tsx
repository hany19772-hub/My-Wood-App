import React, { useState } from 'react';
import { Product, CurrencyType } from '../types';
import { X, Check, ShoppingBag, MessageCircle, ShieldCheck, Truck, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  currencyRate: number;
  currencySymbol: string;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  currencyRate,
  currencySymbol,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const convertedPrice = Math.round(product.price * currencyRate);
  const convertedOriginalPrice = product.originalPrice 
    ? Math.round(product.originalPrice * currencyRate) 
    : null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleWhatsAppOrder = () => {
    const text = `مرحباً، أود الاستفسار وطلب منتج: "${product.nameAr}" (العدد: ${quantity}) بسعر: ${convertedPrice * quantity} ${currencySymbol}. برجاء تأكيد التوفر وموعد الشحن.`;
    const url = `https://wa.me/201000000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-0">
        <div className="inline-block w-full max-w-2xl bg-white rounded-2xl text-right overflow-hidden shadow-2xl transform transition-all border border-[#ebdccd] my-8">
          {/* Header */}
          <div className="p-5 border-b border-[#f0e9df] flex items-center justify-between">
            <div>
              <p className="text-xs text-[#b48454] font-semibold">{product.categoryNameAr}</p>
              <h2 className="text-lg sm:text-xl font-bold text-[#292524] mt-0.5">{product.nameAr}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="إغلاق النافذة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Media */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#f5efe6] border border-[#ebdccd]">
                <img
                  src={product.image}
                  alt={product.nameAr}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Specs & Information */}
              <div className="flex flex-col justify-between text-xs text-[#57534e]">
                <div>
                  <p className="text-sm leading-relaxed text-[#292524] mb-4">
                    {product.descriptionAr}
                  </p>

                  <div className="space-y-2 py-3 px-3.5 bg-[#faf8f5] rounded-xl border border-[#ebdccd] mb-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#78716c]">نوع الخشب:</span>
                      <span className="text-[#292524] font-bold">{product.woodTypeAr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#78716c]">المقاسات:</span>
                      <span className="text-[#292524] font-bold">{product.dimensionsAr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#78716c]">التشطيب:</span>
                      <span className="text-[#292524]">{product.finishAr}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-[#78716c]">مدة التجهيز:</span>
                      <span className="text-emerald-700 font-medium">{product.leadTimeAr}</span>
                    </div>
                  </div>
                </div>

                <div>
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-black text-[#292524] font-mono tabular-nums">
                      {convertedPrice}
                    </span>
                    <span className="text-sm font-bold text-[#57534e]">{currencySymbol}</span>
                    {convertedOriginalPrice && (
                      <span className="text-xs text-[#a8a29e] line-through font-mono tabular-nums">
                        {convertedOriginalPrice} {currencySymbol}
                      </span>
                    )}
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-[#292524]">الكمية المطلوبة:</span>
                    <div className="flex items-center border border-[#d6c7b2] rounded-lg overflow-hidden bg-white">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-2.5 py-1 text-sm font-bold text-[#57534e] hover:bg-[#f0e9df] transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-mono text-xs font-bold text-[#292524] tabular-nums">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-2.5 py-1 text-sm font-bold text-[#57534e] hover:bg-[#f0e9df] transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 pt-5 border-t border-[#f0e9df] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleAdd}
                className={`flex-1 w-full py-3 px-4 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs ${
                  justAdded 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-[#292524] hover:bg-[#1c1917] text-white'
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>تمت الإضافة للسلة بنجاح</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>إضافة إلى سلة الطلبات</span>
                  </>
                )}
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full sm:w-auto py-3 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>طلب مباشر عبر واتساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
