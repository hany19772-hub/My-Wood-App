import React, { useState } from 'react';
import { CartItem, CurrencyType } from '../types';
import { X, Trash2, MessageCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currencyRate: number;
  currencySymbol: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currencyRate,
  currencySymbol,
}) => {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => {
    return sum + (item.product.price * currencyRate * item.quantity);
  }, 0);

  const roundedTotal = Math.round(totalAmount);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    let text = `مرحباً أَرْز للأخشاب، أود تأكيد طلب المنتجات التالية:\n\n`;
    items.forEach((item, idx) => {
      const itemSub = Math.round(item.product.price * currencyRate * item.quantity);
      text += `${idx + 1}. ${item.product.nameAr} (${item.product.woodTypeAr.split('(')[0]})\n   الكمية: ${item.quantity} × ${Math.round(item.product.price * currencyRate)} = ${itemSub} ${currencySymbol}\n`;
    });

    text += `\nالإجمالي التقريبي: ${roundedTotal} ${currencySymbol}\n`;

    if (customerName) text += `الاسم: ${customerName}\n`;
    if (customerPhone) text += `رقم الهاتف: ${customerPhone}\n`;
    if (customerAddress) text += `عنوان التوصيل: ${customerAddress}\n`;

    text += `\nبرجاء تأكيد استلام الطلب وتحديد موعد التسليم. شكراً لكم!`;

    const url = `https://wa.me/201000000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleConfirmDirectOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert('برجاء استكمال الاسم ورقم الهاتف والعنوان لتأكيد الطلب');
      return;
    }
    setOrderConfirmed(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-r border-[#ebdccd]">
          {/* Header */}
          <div className="p-5 border-b border-[#f0e9df] flex items-center justify-between bg-[#faf8f5]">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#292524]">سلة المشتريات</h2>
              <span className="text-xs text-[#78716c]">({items.length} منتجات)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {orderConfirmed ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#292524]">تم تسجيل طلبك بنجاح!</h3>
                <p className="text-xs text-[#57534e] leading-relaxed max-w-xs mx-auto">
                  شكراً لاختيارك أَرْز للأخشاب اليدوية. سنتواصل معك هاتفياً على الرقم <span className="font-bold text-[#292524]">{customerPhone}</span> لتأكيد الشحن خلال ساعات العمل.
                </p>
                <div className="p-3 bg-[#faf8f5] rounded-lg border border-[#ebdccd] text-xs text-[#292524] text-right space-y-1">
                  <p><b>العميل:</b> {customerName}</p>
                  <p><b>العنوان:</b> {customerAddress}</p>
                  <p><b>إجمالي الطلب:</b> {roundedTotal} {currencySymbol}</p>
                </div>
                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-2.5 bg-[#25D366] text-white text-xs font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>متابعة الطلب عبر واتساب</span>
                  </button>
                  <button
                    onClick={() => {
                      onClearCart();
                      setOrderConfirmed(false);
                      setShowOrderForm(false);
                      onClose();
                    }}
                    className="w-full py-2 border border-[#d6c7b2] text-xs text-[#292524] rounded-lg"
                  >
                    إنهاء وإغلاق
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-3 text-[#78716c]">
                <p className="text-sm font-semibold">سلة الطلبات فارغة حالياً</p>
                <p className="text-xs max-w-xs mx-auto">
                  تصفح مجموعتنا من البراويز وساعات الحائط والتحف والطرابيزات واضغط "أضف للسلة".
                </p>
              </div>
            ) : showOrderForm ? (
              <form onSubmit={handleConfirmDirectOrder} className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="text-xs text-[#b48454] font-medium flex items-center gap-1 hover:underline mb-2"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                  <span>العودة لمراجعة السلة</span>
                </button>

                <h3 className="font-bold text-sm text-[#292524]">بيانات التوصيل والتأكيد</h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#57534e] mb-1 font-medium">الاسم بالكامل *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="مثال: أحمد محمود"
                      className="w-full p-2.5 bg-white border border-[#d6c7b2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b48454]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#57534e] mb-1 font-medium">رقم الهاتف أو الواتساب *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="01012345678"
                      className="w-full p-2.5 bg-white border border-[#d6c7b2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b48454]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#57534e] mb-1 font-medium">العنوان بالتفصيل (المحافظة، المدينة، الشارع) *</label>
                    <textarea
                      required
                      rows={2}
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="مثال: القاهرة، المعادي، شارع 9..."
                      className="w-full p-2.5 bg-white border border-[#d6c7b2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b48454]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f0e9df]">
                  <div className="flex justify-between text-xs font-bold text-[#292524] mb-3">
                    <span>المبلغ المستحق عند الاستلام:</span>
                    <span className="text-[#b48454] font-mono tabular-nums">{roundedTotal} {currencySymbol}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#292524] hover:bg-[#1c1917] text-white text-xs font-bold rounded-lg transition-colors"
                  >
                    تأكيد حجز الطلب فوراً (الدفع عند الاستلام)
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const itemPrice = Math.round(item.product.price * currencyRate);
                  return (
                    <div 
                      key={item.product.id} 
                      className="flex gap-3 py-3 border-b border-[#f0e9df] items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.nameAr}
                        className="w-16 h-16 rounded-lg object-cover bg-stone-100 shrink-0 border border-[#ebdccd]"
                      />

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-[#292524] truncate">
                          {item.product.nameAr}
                        </h4>
                        <p className="text-[11px] text-[#78716c] truncate">
                          {item.product.woodTypeAr.split('(')[0]}
                        </p>
                        <p className="text-xs font-bold text-[#b48454] font-mono tabular-nums mt-0.5">
                          {itemPrice} {currencySymbol}
                        </p>

                        <div className="flex items-center gap-2 mt-1.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-[#f0e9df] hover:bg-[#e2d5c3] text-[#292524] text-xs font-bold flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold text-[#292524] tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-[#f0e9df] hover:bg-[#e2d5c3] text-[#292524] text-xs font-bold flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 transition-colors"
                        title="حذف المنتج"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer & Actions */}
          {!orderConfirmed && items.length > 0 && !showOrderForm && (
            <div className="p-5 border-t border-[#f0e9df] bg-[#faf8f5] space-y-3">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold text-[#292524]">الإجمالي المقدر:</span>
                <span className="text-xl font-black text-[#292524] font-mono tabular-nums">
                  {roundedTotal} <span className="text-xs font-medium text-[#78716c]">{currencySymbol}</span>
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-1">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>طلب فوري ومباشر عبر واتساب</span>
                </button>

                <button
                  onClick={() => setShowOrderForm(true)}
                  className="w-full py-2.5 bg-[#292524] hover:bg-[#1c1917] text-white text-xs font-bold rounded-lg transition-colors"
                >
                  إدخال بيانات التوصيل والدفع عند الاستلام
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#78716c] pt-1">
                <span>تغليف آمن ضد الكسر</span>
                <button
                  onClick={onClearCart}
                  className="text-stone-400 hover:text-stone-700 underline"
                >
                  تفريغ السلة
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
