// infrastructure/repositories/books-http.repository.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  BooksRepository,
  BooksFilters,
  PaginatedResult,
} from '../../domain/repositories/books.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookApiResponse, BookMapper } from '../mapper/book.mapper';

interface ApiEnvelope {
  success: boolean;
  message: string;
  data: {
    data: BookApiResponse[];
    total: number;
    page: number;
    limit: number;
  };
}

@Injectable()
export class BooksHttpRepository implements BooksRepository {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/books';

  getAll(filters: BooksFilters): Observable<PaginatedResult<Book>> {
    let params = new HttpParams();
    if (filters.title) params = params.set('title', filters.title);
    if (filters.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters.page) params = params.set('pageQuery', filters.page);
    if (filters.take) params = params.set('takeQuery', filters.take);

    return this.http.get<ApiEnvelope>(this.baseUrl, { params }).pipe(
      map((response) => {
        const { data, total, page, limit } = response.data;

        return {
          data: data.map(BookMapper.toDomain),
          total,
          page,
          totalPages: Math.ceil(total / limit),
        };
      }),
    );
  }

  getById(id: number): Observable<Book> {
    return this.http
      .get<{ success: boolean; message: string; data: BookApiResponse }>(`${this.baseUrl}/${id}`)
      .pipe(map((response) => BookMapper.toDomain(response.data)));
  }
}
