import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../domain/repositories/authors.repository';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { Author } from '../../domain/entities/author.entity';
import { AuthorsApiResponse, AuthorsMapper } from '../mappers/authors.mapper';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { environment } from '../../../../../enviroments/enviroment';
import {
  CreateAuthorProps,
  GetAllAuthorsProps,
  UpdateAuthorsProps,
} from '../../domain/entities/authors.props';

@Injectable({
  providedIn: 'root',
})
export class AuthorsRepositoryImpl implements AuthorsRepository {
  constructor(private readonly http: HttpClient) {}

  create(input: CreateAuthorProps): Observable<Author> {
    return this.http.post<AuthorsApiResponse>(`${environment.apiUrl}/authors`, input).pipe(
      map((response) => {
        return AuthorsMapper.toDomain(response);
      }),
    );
  }

  getAll(filters?: GetAllAuthorsProps): Observable<PaginatedResult<Author>> {
    let params = new HttpParams();

    if (filters?.filter) {
      filters.filter.map((element) => {
        params = params.set(element.name as string, element.value as string);
      });
    }
    return this.http
      .get<
        ApiPaginatedResult<AuthorsApiResponse>
      >(`${environment.apiUrl}/authors${filters ? `?${params}` : ''}`)
      .pipe(
        map((response) => ({
          data: (response.data ?? []).map((entity) => AuthorsMapper.toDomain(entity)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        })),
      );
  }

  update(input: UpdateAuthorsProps): Observable<Author> {
    const { ...body } = input;
    return this.http.put<AuthorsApiResponse>(`${environment.apiUrl}/authors/${input.id}`, {
      body,
    });
  }
}
