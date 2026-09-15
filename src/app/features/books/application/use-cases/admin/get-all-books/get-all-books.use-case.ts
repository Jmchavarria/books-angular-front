import { Injectable } from '@angular/core';
import { BooksRepository } from '../../../../domain/repositories/books.repository';
import { filter, Observable } from 'rxjs';
import { PaginatedResult } from '../../../../../../core/types/paginated-response';
import { Book } from '../../../../domain/entities/book.entity';
import { GetAllBooksDto } from './get-all-books.dto';
import { FiltersDto } from '../../../../../../core/interfaces/filters.interface';

@Injectable({
  providedIn: 'root',
})
export class GetAllBooksUseCase {
  constructor(private readonly repository: BooksRepository) {}

  execute(filters?: FiltersDto[]): Observable<PaginatedResult<Book>> {
    return this.repository.getAll(filters);
  }
}
