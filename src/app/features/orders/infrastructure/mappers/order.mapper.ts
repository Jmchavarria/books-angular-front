import { BookApiResponse } from '../../../books/infrastructure/mapper/book.mapper';
import { UsersApiResponse } from '../../../users/infrastructure/mapper/user.mapper';
import { OrderDE } from '../../domain/entities/orders.entity';
import { OrderStatusTypeEnum } from '../../domain/enums/order-status-type.enum';

export interface OrderItemApiResponse {
  id: number;
  orderId: number;
  bookId: number;
  book: BookApiResponse;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderApiResponse {
  id: number;
  orderNumber: string;
  userId: number;
  user: UsersApiResponse;
  status: OrderStatusTypeEnum;
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  shippingAddressSnapshot: any;
  trackingNumber?: string;
  shippingCarrier?: string;
  createdAt?: Date;
  updatedAt?: Date;
  items?: OrderItemApiResponse[];
}

import { OrderItemMapper } from './order-item.mapper';

export class OrderMapper {
  static toDomain(raw: OrderApiResponse): OrderDE {
    return new OrderDE({
      id: raw.id,
      orderNumber: raw.orderNumber,
      userId: raw.userId,
      user: raw.user,
      status: raw.status,
      subtotal: Number(raw.subtotal),
      shippingCost: Number(raw.shippingCost),
      taxAmount: Number(raw.taxAmount),
      discountAmount: Number(raw.discountAmount),
      totalAmount: Number(raw.totalAmount),
      shippingAddressSnapshot: raw.shippingAddressSnapshot,
      trackingNumber: raw.trackingNumber,
      shippingCarrier: raw.shippingCarrier,
      createdAt: raw.createdAt
        ? raw.createdAt instanceof Date
          ? raw.createdAt
          : new Date(raw.createdAt)
        : new Date(),
      updatedAt: raw.updatedAt
        ? raw.updatedAt instanceof Date
          ? raw.updatedAt
          : new Date(raw.updatedAt)
        : new Date(),
      items: Array.isArray(raw.items)
        ? raw.items.map((item) => OrderItemMapper.toDomain(item))
        : [],
    });
  }
}
