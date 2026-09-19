import { BookApiResponse } from '../../../books/infrastructure/mapper/book.mapper';
import { OrderItemDE } from '../../domain/entities/order-item.entity';

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

export class OrderItemMapper {
  static toDomain(raw: OrderItemApiResponse): OrderItemDE {
    return new OrderItemDE({
      id: raw.id,
      book: raw.book,
      bookId: raw.bookId,
      orderId: raw.orderId,
      quantity: raw.quantity,
      priceAtPurchase: raw.priceAtPurchase,
      totalPrice: raw.totalPrice,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
