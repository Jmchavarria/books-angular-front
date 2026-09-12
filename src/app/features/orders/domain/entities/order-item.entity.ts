import { Book } from '../../../books/domain/entities/book.entity';

export class OrderItem {
  constructor(
    public readonly id: number,
    public readonly orderId: number,
    public readonly order: number,
    public readonly book: Book,
    public readonly quantity: number,
    public readonly priceAtPurchase: number,
    public readonly totalPrice: number,
    public readonly createdAt: number,
    public readonly updatedAt: number,
  ) {}
}
