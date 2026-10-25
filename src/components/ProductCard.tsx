import React from 'react';
import { Product, CurrencyType } from '../types';
import { Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  currency: CurrencyType;
  currencyRate: number;
  currencySymbol: string;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isAdded?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currencyRate,
  currencySymbol,
  onAddToCart,
  onViewDetails,
  isAdded,
}) => {
  const convertedPrice = Math.round(product.price * currencyRate);
  const convertedOriginalPrice = product.originalPrice 
    ? Math.round(product.originalPrice * currencyRate) 
    : null;

  return (
    <div className="group bg-white rounded-xl border border-[#ebdccd] hover:border-[#b48454]/40 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">
      {/* Product Image (65-75% visual weight) */}
      <div 
        onClick={() => onViewDetails(product)}
        className="relative aspect-[4/3] bg-[#f5efe6] overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.nameAr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quiet top action overlay */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(product);
            }}
            className="p-2 bg-white/95 text-[#292524] rounded-lg shadow-sm hover:bg-white transition-colors"
            title="معاينة التفاصيل"
            aria-label="معاينة التفاصيل"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {product.originalPrice && (
          <div className="absolute bottom-3 right-3 bg-[#292524]/85 text-white text-[11px] font-medium px-2 py-0.5 rounded backdrop-blur-xs">
            خصم الحرفة
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Zero-pill metadata line */}
          <div className="flex items-center gap-1.5 text-xs text-[#b48454] font-medium mb-1.5">
            <span>{product.categoryNameAr}</span>
            <span aria-hidden="true" className="text-[#d6c7b2]">·</span>
            <span className="text-[#78716c]">{product.woodTypeAr.split('(')[0]}</span>
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="font-bold text-base text-[#292524] hover:text-[#b48454] transition-colors cursor-pointer mb-2 leading-snug"
          >
            {product.nameAr}
          </h3>

          <p className="text-xs text-[#78716c] line-clamp-2 leading-relaxed mb-4">
            {product.descriptionAr}
          </p>

          <div className="text-[11px] text-[#78716c] space-y-1 py-2 px-2.5 bg-[#faf8f5] rounded-md border border-[#f0e9df] mb-4">
            <div className="flex justify-between">
              <span>المقاس:</span>
              <span className="font-semibold text-[#292524]">{product.dimensionsAr}</span>
            </div>
            <div className="flex justify-between">
              <span>الحالة:</span>
              <span className="text-emerald-700 font-medium">متوفر وجاهز للشحن</span>
            </div>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-[#f0e9df] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold text-[#292524] font-mono tabular-nums">
                {convertedPrice}
              </span>
              <span className="text-xs text-[#57534e] font-semibold">{currencySymbol}</span>
            </div>
            {convertedOriginalPrice && (
              <span className="text-xs text-[#a8a29e] line-through font-mono tabular-nums">
                {convertedOriginalPrice} {currencySymbol}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onViewDetails(product)}
              className="px-2.5 py-1.5 text-xs text-[#57534e] hover:text-[#292524] hover:bg-[#f5efe6] border border-[#e8dfd5] rounded-lg transition-colors whitespace-nowrap"
            >
              التفاصيل
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1 shadow-xs whitespace-nowrap ${
                isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#292524] hover:bg-[#b48454] text-white'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>أُضيف</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>أضف للسلة</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
