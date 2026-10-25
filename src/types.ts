export interface Product {
  id: string;
  nameAr: string;
  nameEn: string;
  category: 'frames' | 'clocks' | 'antiques' | 'tables' | 'chairs';
  categoryNameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  woodTypeAr: string;
  dimensionsAr: string;
  descriptionAr: string;
  inStock: boolean;
  leadTimeAr: string;
  finishAr: string;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
  tableName: string;
  isConnected: boolean;
  lastSynced?: string;
}

export type CurrencyType = 'EGP' | 'USD' | 'SAR';
