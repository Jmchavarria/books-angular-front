import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../enviroments/enviroment';
import { Injectable } from '@angular/core';
import { OrdersRepository } from '../../domain/repositories/orders.repository';
import { OrderDE } from '../../domain/entities/orders.entity';
import {
  CreateOrderProps,
  GetAllOrdersProps,
  UpdateOrderProps,
} from '../../domain/entities/orders.props';
import { OrderApiResponse, OrderMapper } from '../mappers/order.mapper';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { ApiResponse } from '../../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class OrdersRepositoryImpl implements OrdersRepository {
  constructor(private readonly http: HttpClient) {}

  create(input: CreateOrderProps): Observable<OrderDE> {
    return this.http.post<OrderApiResponse>(`${environment.apiUrl}/orders`, input).pipe(
      map((response) => {
        return OrderMapper.toDomain(response);
      }),
    );
  }

  getAll(filters?: GetAllOrdersProps): Observable<PaginatedResult<OrderDE>> {
    let params = new HttpParams();

    if (filters?.filter) {
      filters.filter.map((element) => {
        params = params.set(element.name as string, element.value as string);
      });
    }
    return this.http
      .get<ApiPaginatedResult<OrderApiResponse>>(`${environment.apiUrl}/orders`, { params })
      .pipe(
        map((response) => ({
          data: (response.data ?? []).map((entity) => OrderMapper.toDomain(entity)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        })),
      );
  }

  update(input: UpdateOrderProps): Observable<OrderDE> {
    const { ...body } = input;

    return this.http
      .patch<ApiResponse<OrderApiResponse>>(`${environment.apiUrl}/users/${input.id}`, body)
      .pipe(
        map((response) => {
          console.log(response);
          return OrderMapper.toDomain(response.data);
        }),
      );
  }
}
