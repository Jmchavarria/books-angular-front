// infrastructure/repositories/books-http.repository.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BooksRepository, GetAllBooksProps } from '../../domain/repositories/books.repository';
import { Book } from '../../domain/entities/book.entity';
import { BookApiResponse, BookMapper } from '../mapper/book.mapper';
import { environment } from '../../../../../enviroments/enviroment';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { ApiPaginatedResponse, ApiSingleResponse } from '../../../../core/types/api-envelope';

@Injectable()
export class BooksRepositoryImpl implements BooksRepository {
  constructor(private readonly http: HttpClient) {}

  // Usamos PaginatedResponse<Book[]>
  getAll(input: GetAllBooksProps): Observable<PaginatedResponse<Book[]>> {
    let params = new HttpParams();
    if (input.title) params = params.set('title', input.title);

    return this.http
      .get<ApiPaginatedResponse<BookApiResponse>>(environment.apiUrl, { params })
      .pipe(
        map((response) => {
          const { data, total, page, limit } = response.data;

          return new PaginatedResponse(data.map(BookMapper.toDomain), total, page, limit);
        }),
      );
  }

  getById(id: number): Observable<Book> {
    return this.http
      .get<ApiSingleResponse<BookApiResponse>>(`${environment.apiUrl}/${id}`)
      .pipe(map((response) => BookMapper.toDomain(response.data)));
  }
}
