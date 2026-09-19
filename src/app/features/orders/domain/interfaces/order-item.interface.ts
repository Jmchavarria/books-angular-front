import { IBook } from '../../../books/domain/interfaces/book.interfaces';

export interface IOrderItem {
  id: number;
  orderId: number;
  bookId: number;
  book: IBook;
  quantity: number;
  priceAtPurchase: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
