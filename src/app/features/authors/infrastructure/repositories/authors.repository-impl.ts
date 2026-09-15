import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../domain/repositories/authors.repository';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { Author } from '../../domain/entities/author.entity';
import { AuhorsApiResponse, AuthorsMapper } from '../mappers/authors.mapper';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { environment } from '../../../../../enviroments/enviroment';
import { CreateAuthorProps } from '../../domain/entities/authors.props';

@Injectable({
  providedIn: 'root',
})
export class AuthorsRepositoryImpl implements AuthorsRepository {
  constructor(private readonly http: HttpClient) {}

  create(input: CreateAuthorProps): Observable<Author> {
    return this.http.post<AuhorsApiResponse>(`${environment.apiUrl}/authors`, input).pipe(
      map((response) => {
        return AuthorsMapper.toDomain(response);
      }),
    );
  }

  getAll(): Observable<PaginatedResult<Author>> {
    return this.http
      .get<ApiPaginatedResult<AuhorsApiResponse>>(`${environment.apiUrl}/authors`)
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
}
