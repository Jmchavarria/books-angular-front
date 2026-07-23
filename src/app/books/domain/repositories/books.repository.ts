import { Observable } from "rxjs";
import { Book } from "../entities/book.entity";

export interface BooksFilters {
  title?: string;
  categoryId?: number;
  page?: number;
  take?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

export abstract class BooksRepository {
  abstract getAll(filters: BooksFilters): Observable<PaginatedResult<Book>>;
  abstract getById(id: number): Observable<Book>;
}
