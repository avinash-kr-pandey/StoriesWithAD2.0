// types/index.ts
export interface Review {
  name: string;
  comment: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface ShippingInfo {
  delivery: string;
  returnPolicy: string;
  securePayment: boolean;
}

// Base Product Interface (matches your actual data structure)
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestSeller: boolean;
  description: string;
  features: string[];
  dimensions: string;
  material: string;
  warranty: string;
  inStock: boolean;
  stockQuantity: number;
  color?: string[];
  brand?: string;
  shippingInfo?: ShippingInfo;
  reviewsList?: Review[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  orderDate: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}
