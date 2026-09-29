import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoriesRepository } from '../../domain/repositories/categories.repository';
import { filter, map, Observable } from 'rxjs';
import { Categories } from '../../domain/entities/categories.entity';
import { environment } from '../../../../../enviroments/enviroment';
import { CategoriesApiResponse, CategoriesMapper } from '../mappers/categories.mapper';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { Injectable } from '@angular/core';
import {
  CreateCategoryProps,
  GetAllCategoriesProps,
  UpdateCategoryProps,
} from '../../domain/entities/categories.props';
import { FiltersDto } from '../../../../core/interfaces/filters.interface';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

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

  getAll(filters?: GetAllCategoriesProps): Observable<PaginatedResult<Categories>> {
    let params = new HttpParams();

    if (filters?.filter) {
      filters.filter.map((element) => {
        params = params.set(element.name as string, element.value as string);
      });
    }

    return this.http
      .get<
        ApiPaginatedResult<CategoriesApiResponse>
      >(`${environment.apiUrl}/categories${filters ? `?${params}` : ''}`)
      .pipe(
        map((response) => ({
          data: (response.data ?? []).map((entity) => CategoriesMapper.toDomain(entity)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        })),
      );
  }
}
