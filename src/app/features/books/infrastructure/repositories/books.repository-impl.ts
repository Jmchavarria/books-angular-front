// infrastructure/repositories/books-http.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BooksRepository, CreateBookProps } from '../../domain/repositories/books.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookApiResponse, BookMapper } from '../mapper/book.mapper';
import { environment } from '../../../../../enviroments/enviroment';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { ApiPaginatedResponse, ApiSingleResponse } from '../../../../core/types/api-envelope';
import { FiltersDto } from '../../../../core/interfaces/filters.interface';

@Injectable()
export class BooksRepositoryImpl implements BooksRepository {
  constructor(private readonly http: HttpClient) {}

  create(input: CreateBookProps): Observable<Book> {
    return this.http.post<BookApiResponse>(`${environment.apiUrl}/books`, input).pipe(
      map((response) => {
        return BookMapper.toDomain(response);
      }),
    );
  }

  getAll(filters?: FiltersDto[]): Observable<PaginatedResponse<Book>> {
    const params = new URLSearchParams(filters?.map((f) => [f.name as string, f.value as string]));

    return this.http
      .get<
        ApiPaginatedResponse<BookApiResponse>
      >(`${environment.apiUrl}/books${filters ? `?${params}` : ''}`)
      .pipe(
        map((response) => {
          const { data, total, page, limit, message, success, totalPages } = response;

          return new PaginatedResponse(
            success,
            message,
            data.map((entity) => BookMapper.toDomain(entity)),
            total,
            page,
            limit,
            totalPages,
          );
        }),
      );
  }

  getById(id: number): Observable<Book> {
    return this.http
      .get<ApiSingleResponse<BookApiResponse>>(`${environment.apiUrl}/${id}`)
      .pipe(map((response) => BookMapper.toDomain(response.data)));
  }
}
