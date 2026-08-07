import { Observable } from 'rxjs';
import { Book } from '../entities/book.entity';
import { Pagination } from '../../../../core/types/pagination';
import { PaginatedResponse } from '../../../../core/types/paginated-response';

export interface GetAllBooksProps extends Pagination {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}

export abstract class BooksRepository {
  abstract getAll(input: GetAllBooksProps): Observable<PaginatedResponse<Book[]>>;
  abstract getById(id: number): Observable<Book>;
}
