import { Injectable, inject } from '@angular/core';
import { BooksRepository } from '../../../domain/repositories/books.repository';
import { GetAllBooksDto } from './get-all-books.dto';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import { Book } from '../../../domain/entities/book.entity';

@Injectable({ providedIn: 'root' })
export class GetAllBooksUseCase {
  constructor(private readonly repository: BooksRepository) {}

  execute(filters: GetAllBooksDto): Observable<PaginatedResponse<Book[]>> {
    return this.repository.getAll(filters);
  }
}
