import { Book } from '../../../books/domain/entities/book.entity';

export class OrderItem {
  constructor(
    public readonly id: number,
    public readonly bookId: number,
    public readonly userId: string,
    public readonly book: Book,
    public readonly quantity: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
