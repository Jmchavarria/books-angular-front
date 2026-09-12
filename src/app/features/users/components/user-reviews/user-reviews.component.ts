import { Component, input } from '@angular/core';
import { BookReview } from '../../../reviews/domain/entities/book-review.entity';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './user-reviews.component.html',
})
export class UserReviewsComponent {
  reviews = input<BookReview[]>([]);
}
