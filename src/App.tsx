import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, SupabaseConfig, CurrencyType } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { getStoredSupabaseConfig, saveSupabaseConfig, getStoredProducts, saveStoredProducts, fetchProductsFromSupabase } from './utils/supabase';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SupabaseModal } from './components/SupabaseModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { Search, SlidersHorizontal, Check, RefreshCw } from 'lucide-react';

const CURRENCY_RATES: Record<CurrencyType, { rate: number; symbol: string }> = {
  EGP: { rate: 1, symbol: 'ج.م' },
  USD: { rate: 0.02, symbol: '$' },
  SAR: { rate: 0.076, symbol: 'ر.س' },
};

const CATEGORIES = [
  { id: 'all', label: 'الكل (جميع المعروضات)' },
  { id: 'frames', label: 'براويز خشبية' },
  { id: 'clocks', label: 'ساعات حائط' },
  { id: 'antiques', label: 'تحف وأنتيكات' },
  { id: 'tables', label: 'طرابيزات جانبية' },
  { id: 'chairs', label: 'كراسي واستولات' },
];

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const cached = getStoredProducts();
    return cached && cached.length > 0 ? cached : INITIAL_PRODUCTS;
  });

  const [supabaseConfig, setSupabaseConfig] = useState<SupabaseConfig>(getStoredSupabaseConfig);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<'default' | 'price-asc' | 'price-desc' | 'popular'>('default');
  const [currency, setCurrency] = useState<CurrencyType>('EGP');

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('arz_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSupabaseOpen, setIsSupabaseOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // Save cart changes
  useEffect(() => {
    try {
      localStorage.setItem('arz_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Attempt automatic Supabase sync on mount if connected
  useEffect(() => {
    if (supabaseConfig.isConnected && supabaseConfig.url && supabaseConfig.anonKey) {
      setIsSyncing(true);
      fetchProductsFromSupabase(supabaseConfig)
        .then((fetched) => {
          if (fetched && fetched.length > 0) {
            setProducts(fetched);
            saveStoredProducts(fetched);
          }
        })
        .catch((e) => {
          console.log('Background Supabase sync skipped:', e.message);
        })
        .finally(() => {
          setIsSyncing(false);
        });
    }
  }, []);

  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const handleSaveSupabaseConfig = (newConfig: SupabaseConfig) => {
    setSupabaseConfig(newConfig);
    saveSupabaseConfig(newConfig);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.nameAr.toLowerCase().includes(q) ||
        p.descriptionAr.toLowerCase().includes(q) ||
        p.woodTypeAr.toLowerCase().includes(q) ||
        p.categoryNameAr.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    if (sortOption === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'popular') {
      result = [...result].sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortOption]);

  const handleWhatsAppInquiry = (customText?: string) => {
    const text = customText || 'السلام عليكم، أود الاستفسار عن تفاصيل وأسعار المنتجات الخشبية المصنوعة يدوياً لديكم في المتجر.';
    const url = `https://wa.me/201000000000?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const activeRate = CURRENCY_RATES[currency].rate;
  const activeSymbol = CURRENCY_RATES[currency].symbol;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-[#292524] selection:bg-[#c49769] selection:text-white">
      {/* Top Banner */}
      <div className="bg-[#292524] text-[#e7e5e4] text-xs py-2 px-4 text-center border-b border-[#3e3835]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:block text-[11px] text-[#a8a29e]">
            تصنيع يدوي بأعلى معايير الجودة والاستدامة
          </div>
          <div className="mx-auto sm:mx-0 font-medium">
            <span>شحن آمن وضمان كامل ضد عيوب الصناعة</span>
            <span aria-hidden="true" className="mx-2 text-[#78716c]">·</span>
            <span>الدفع عند الاستلام متاح</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            {/* Currency selector */}
            <span className="text-[11px] text-[#a8a29e]">العملة:</span>
            <div className="flex items-center gap-1 font-mono text-[11px]">
              {(['EGP', 'USD', 'SAR'] as CurrencyType[]).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    currency === c ? 'bg-[#b48454] text-white font-bold' : 'text-[#a8a29e] hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Header following Top Bar Contract */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSupabase={() => setIsSupabaseOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        supabaseConnected={supabaseConfig.isConnected}
      />

      {/* Hero Section */}
      <Hero
        onExploreClick={() => {
          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
        }}
        onWhatsAppInquiry={() => handleWhatsAppInquiry()}
      />

      {/* Main Catalog Section */}
      <main id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Section Heading & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#b48454] font-semibold mb-1">
              <span>كتالوج الحرفة</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#78716c] tabular-nums">{filteredProducts.length} منتجات معروضة</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#292524] tracking-tight">
              المعروضات الخشبية والأسعار
            </h2>
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث عن برواز، ساعة، طرابيزة..."
                className="w-full pl-8 pr-9 py-2 text-xs bg-white border border-[#d6c7b2] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#b48454] text-[#292524] placeholder:text-[#a8a29e]"
              />
              <Search className="w-4 h-4 text-[#78716c] absolute right-2.5 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute left-2.5 top-2.5 text-xs text-stone-400 hover:text-stone-700 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-white border border-[#d6c7b2] rounded-lg px-2.5 py-1.5 text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#78716c]" />
              <select
                value={sortOption}
                onChange={(e: any) => setSortOption(e.target.value)}
                className="bg-transparent text-[#292524] font-medium focus:outline-none cursor-pointer"
              >
                <option value="default">الترتيب الافتراضي</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="popular">الأكثر تقييماً وطلباً</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interactive Filter Controls (Category Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs ${
                selectedCategory === cat.id
                  ? 'bg-[#292524] text-white font-bold'
                  : 'bg-white text-[#57534e] hover:bg-[#f3ebe1] border border-[#e8dfd5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-2xl border border-[#ebdccd] p-8 max-w-lg mx-auto">
            <p className="text-base font-bold text-[#292524] mb-2">لا توجد منتجات تطابق بحثك حالياً</p>
            <p className="text-xs text-[#78716c] mb-4">
              جرب تغيير كلمة البحث أو اختيار فئة أخرى من القائمة أعلاه.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-[#292524] text-white text-xs font-bold rounded-lg hover:bg-[#b48454] transition-colors"
            >
              عرض كافة المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                currencyRate={activeRate}
                currencySymbol={activeSymbol}
                onAddToCart={(p) => handleAddToCart(p, 1)}
                onViewDetails={(p) => setSelectedProduct(p)}
                isAdded={justAddedId === product.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Story & Craftsmanship Section */}
      <StorySection />

      {/* Footer */}
      <Footer
        onOpenSupabase={() => setIsSupabaseOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onWhatsAppInquiry={() => handleWhatsAppInquiry()}
      />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        currencyRate={activeRate}
        currencySymbol={activeSymbol}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        currencyRate={activeRate}
        currencySymbol={activeSymbol}
      />

      <SupabaseModal
        isOpen={isSupabaseOpen}
        onClose={() => setIsSupabaseOpen(false)}
        config={supabaseConfig}
        onSaveConfig={handleSaveSupabaseConfig}
        products={products}
        onUpdateProducts={handleUpdateProducts}
      />

      <ExportHtmlModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        products={products}
        supabaseConfig={supabaseConfig}
      />
    </div>
  );
}
