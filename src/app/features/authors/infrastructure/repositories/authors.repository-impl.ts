import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthorsRepository } from '../../domain/repositories/authors.repository';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { Author } from '../../domain/entities/author.entity';
import { AuhorsApiResponse, AuthorsMapper } from '../mappers/authors.mapper';
import { ApiPaginatedResponse } from '../../../../core/types/api-envelope';
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

  getAll(): Observable<PaginatedResponse<Author[]>> {
    return this.http
      .get<ApiPaginatedResponse<AuhorsApiResponse>>(`${environment.apiUrl}/authors`)
      .pipe(
        map((response) => {
          const { data, limit, page, total, message, success } = response;

          return new PaginatedResponse(
            success,
            message,
            data.map((entity) => AuthorsMapper.toDomain(entity)),
            total,
            page,
            limit,
          );
        }),
      );
  }
}
