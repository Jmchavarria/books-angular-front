import { Observable } from 'rxjs';
import { Book } from '../entities/book.entity';
import { Pagination } from '../../../../core/types/pagination';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { FiltersDto } from '../../../../core/interfaces/filters.interface';

export interface GetAllBooksProps extends Pagination {
  title?: string;
  isActive?: boolean;
  publishedYear?: number;
  search?: string;
}

export interface CreateBookProps {
  title: string;
  categoryId?: number;
  authorId: number;
  description?: string;
  pages: number;
  isActive?: boolean;
  publishedYear: number;
}

export abstract class BooksRepository {
  abstract getAll(filters?: FiltersDto[]): Observable<PaginatedResponse<Book[]>>;
  abstract getById(id: number): Observable<Book>;
  abstract create(input: CreateBookProps): Observable<Book>;
}
