import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BookReview } from '../../../../reviews/domain/entities/book-review.entity';
@Component({
  selector: 'app-user-reviews',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './user-reviews.component.html',
})
export class UserReviewsComponent {
  reviews = input<BookReview[]>([]);
}
