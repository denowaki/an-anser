export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

export interface PaymentMethod {
  type: 'card' | 'cash' | 'bank_transfer' | 'digital_wallet';
  details?: Record<string, unknown>;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderInput {
  userId: string;
  items: Omit<OrderItem, 'name' | 'price'>[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
}

export interface UpdateOrderInput {
  status?: OrderStatus;
  shippingAddress?: Partial<ShippingAddress>;
  paymentMethod?: Partial<PaymentMethod>;
}
