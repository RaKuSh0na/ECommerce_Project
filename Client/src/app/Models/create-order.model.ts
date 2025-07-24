import { OrderItem } from "./order-itme.model";

export interface CreateOrder {
  orderItems: OrderItem[]; // List of items in the order
  shippingAddress: string;
  city: string;
  zipCode: string;
  // paymentMethod is NOT included here as it's fixed to "CashOnDelivery" on backend
}