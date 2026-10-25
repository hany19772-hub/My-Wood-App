import { Product, SupabaseConfig } from '../types';

const STORAGE_KEY = 'arz_supabase_config';
const PRODUCTS_CACHE_KEY = 'arz_products_cache';

export const getStoredSupabaseConfig = (): SupabaseConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading Supabase config from localStorage', e);
  }
  return {
    url: '',
    anonKey: '',
    tableName: 'products',
    isConnected: false,
  };
};

export const saveSupabaseConfig = (config: SupabaseConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving Supabase config', e);
  }
};

export const getStoredProducts = (): Product[] | null => {
  try {
    const raw = localStorage.getItem(PRODUCTS_CACHE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading products from cache', e);
  }
  return null;
};

export const saveStoredProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(products));
  } catch (e) {
    console.error('Error caching products', e);
  }
};

/**
 * Fetch products from Supabase REST API directly without heavy dependencies
 */
export const fetchProductsFromSupabase = async (config: SupabaseConfig): Promise<Product[]> => {
  if (!config.url || !config.anonKey) {
    throw new Error('بيانات الاتصال بـ Supabase غير مكتملة');
  }

  const cleanUrl = config.url.replace(/\/$/, '');
  const tableName = config.tableName || 'products';

  const response = await fetch(`${cleanUrl}/rest/v1/${tableName}?select=*`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`خطأ في جلب البيانات من سوبابيز (${response.status}): ${errText}`);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('الاستجابة المستلمة من سوبابيز ليست مصفوفة منتجات صالحة');
  }

  // Map incoming database columns to our Product interface
  const mappedProducts: Product[] = data.map((item: any) => ({
    id: String(item.id || item.product_id || Math.random().toString()),
    nameAr: item.name_ar || item.nameAr || item.name || 'منتج خشبي',
    nameEn: item.name_en || item.nameEn || '',
    category: item.category || 'frames',
    categoryNameAr: item.category_name_ar || item.categoryNameAr || 'منتجات خشبية',
    price: Number(item.price || 0),
    originalPrice: item.original_price ? Number(item.original_price) : undefined,
    image: item.image || item.image_url || '/src/assets/images/wood_frame_minimalist_1792953004164.jpg',
    woodTypeAr: item.wood_type_ar || item.woodTypeAr || 'خشب طبيعي فاخر',
    dimensionsAr: item.dimensions_ar || item.dimensionsAr || 'مقاسات قياسية',
    descriptionAr: item.description_ar || item.descriptionAr || '',
    inStock: item.in_stock ?? true,
    leadTimeAr: item.lead_time_ar || item.leadTimeAr || 'جاهز للشحن',
    finishAr: item.finish_ar || item.finishAr || 'زيت طبيعي',
    rating: Number(item.rating || 5.0),
    reviewsCount: Number(item.reviews_count || 10),
    isFeatured: Boolean(item.is_featured),
  }));

  return mappedProducts;
};

/**
 * Update a product's price in Supabase
 */
export const updateProductPriceInSupabase = async (
  config: SupabaseConfig,
  productId: string,
  newPrice: number
): Promise<boolean> => {
  if (!config.url || !config.anonKey) {
    return false;
  }

  const cleanUrl = config.url.replace(/\/$/, '');
  const tableName = config.tableName || 'products';

  const response = await fetch(`${cleanUrl}/rest/v1/${tableName}?id=eq.${productId}`, {
    method: 'PATCH',
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ price: newPrice }),
  });

  return response.ok;
};
