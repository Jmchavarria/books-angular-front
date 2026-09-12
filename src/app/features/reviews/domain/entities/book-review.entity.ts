import { Book } from '../../../books/domain/entities/book.entity';

export class BookReview {
  constructor(
    public readonly id: number,
    public readonly bookId: string,
    public readonly book: Book,
    public readonly userId: number,
    public readonly rating: number,
    public readonly title: string,
    public readonly comment: string,
    public readonly isApproved: boolean,
    public readonly isVerifiedPurchase: boolean,
    public readonly helpfulVotes: number,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
