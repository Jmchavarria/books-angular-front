import { Book } from '../../../books/domain/entities/book.entity';
import { IOrderItem } from '../interfaces/order-item.interface';

export class OrderItemDE {
  id: number;
  orderId: number;
  bookId: number;
  book: Book;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: IOrderItem) {
    Object.assign(this, attributes);
  }
}
