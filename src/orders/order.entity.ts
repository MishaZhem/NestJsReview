export type OrderStatus = 'new' | 'paid' | 'shipped' | 'cancelled';

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  id: number;
  userId: number;
  customerEmail: string;
  address: string;
  items: OrderItem[];
  total: number;
  promoCode?: string;
  status: OrderStatus;
  createdAt: Date;
}
