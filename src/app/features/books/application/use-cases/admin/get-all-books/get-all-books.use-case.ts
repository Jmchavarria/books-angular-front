import { Injectable } from '@angular/core';
import { BooksRepository } from '../../../../domain/repositories/books.repository';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../../core/types/paginated-response';
import { Book } from '../../../../domain/entities/book.entity';
import { GetAllBooksDto } from './get-all-books.dto';

@Injectable({
  providedIn: 'root',
})
export class GetAllBooksUseCase {
  constructor(private readonly repository: BooksRepository) {}

  execute(input: GetAllBooksDto): Observable<PaginatedResponse<Book[]>> {
    return this.repository.getAll(input);
  }
}
