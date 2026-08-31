import { HttpClient } from '@angular/common/http';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';
import { map, Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import { Categories } from '../../domain/entities/categories.entity';
import { environment } from '../../../../../../enviroments/enviroment';
import { CategoriesApiResponse, CategoriesMapper } from '../mappers/categories.mapper';
import { ApiPaginatedResponse, ApiSingleResponse } from '../../../../../core/types/api-envelope';
import { Injectable } from '@angular/core';
import { CreateCategoryProps, UpdateCategoryProps } from '../../domain/entities/categories.props';

@Injectable()
export class CategoriesRepositoryImpl implements CategoriesRepository {
  constructor(private readonly http: HttpClient) {}

  update(input: UpdateCategoryProps): Observable<Categories> {
    const { ...body } = input;
    return this.http
      .patch<CategoriesApiResponse>(`${environment.apiUrl}/categories/${input.id}`, body)
      .pipe(
        map((response) => {
          return CategoriesMapper.toDomain(response);
        }),
      );
  }

  create(input: CreateCategoryProps): Observable<Categories> {
    return this.http.post<CategoriesApiResponse>(`${environment.apiUrl}/categories`, input).pipe(
      map((response) => {
        return CategoriesMapper.toDomain(response);
      }),
    );
  }

  getAll(): Observable<PaginatedResponse<Categories[]>> {
    return this.http
      .get<ApiPaginatedResponse<CategoriesApiResponse>>(`${environment.apiUrl}/categories`)
      .pipe(
        map((response) => {
          const { data, limit, page, total, message, success } = response;

          return new PaginatedResponse(
            success,
            message,
            data.map(CategoriesMapper.toDomain),
            total,
            page,
            limit,
          );
        }),
      );
  }
}
