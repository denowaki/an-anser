export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  stock: number;
  imageUrl?: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Category {
  id?: string;
  name: string;
  description?: string;
}
