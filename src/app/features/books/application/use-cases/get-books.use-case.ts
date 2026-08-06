import { Injectable, inject } from '@angular/core';
import { BooksRepository, BooksFilters } from '../../domain/repositories/books.repository';

@Injectable({ providedIn: 'root' })
export class GetBooksUseCase {
  private repository = inject(BooksRepository);

  execute(filters: BooksFilters) {
    return this.repository.getAll(filters);
  }
}
