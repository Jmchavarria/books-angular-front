import { HttpClient, HttpParams } from '@angular/common/http';
import { UserAddressesRepository } from '../../domain/repositories/user-adresses.repository';
import { filter, map, Observable } from 'rxjs';
import { UserAddresses } from '../../domain/entities/user-addresses.entity';
import {
  CreateUserAddressProps,
  GetAllUserAddressesProps,
  UpdateUserAddressesProps,
} from '../../domain/entities/user-addresses.props';
import { environment } from '../../../../../enviroments/enviroment';
import { UserAddressesMapper, UsersAddressesApiResponse } from '../mapper/user-addresses.mapper';
import { Injectable, signal } from '@angular/core';
import { ApiResponse } from '../../../../core/interfaces/api-response.interface';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { PaginatedResult } from '../../../../core/types/paginated-response';

@Injectable({
  providedIn: 'root',
})
export class UserAddressesRepositoryImpl implements UserAddressesRepository {
  private cache = signal<PaginatedResult<UserAddresses> | null>(null);

  constructor(private readonly http: HttpClient) {}

  create(input: CreateUserAddressProps): Observable<UserAddresses> {
    return this.http
      .post<UsersAddressesApiResponse>(` ${environment.apiUrl}/user-addresses`, input)
      .pipe(
        map((response) => {
          return UserAddressesMapper.toDomain(response);
        }),
      );
  }

  update(input: UpdateUserAddressesProps): Observable<UserAddresses> {
    const { ...body } = input;
    return this.http
      .put<
        ApiResponse<UsersAddressesApiResponse>
      >(`${environment.apiUrl}/user-addresses/${input.id}`, body)
      .pipe(
        map((response) => {
          return UserAddressesMapper.toDomain(response.data);
        }),
      );
  }

  getAll(filters?: GetAllUserAddressesProps): Observable<PaginatedResult<UserAddresses>> {
    let params = new HttpParams();

    if (filters?.filter) {
      filters.filter.map((element) => {
        params = params.set(element.name as string, element.value as string);
      });
    }

    if (filters?.userId !== undefined && filters?.userId !== null) {
      params = params.set('userId', filters.userId.toString());
    }
    return this.http
      .get<
        ApiPaginatedResult<UsersAddressesApiResponse>
      >(`${environment.apiUrl}/user-addresses/`, { params })
      .pipe(
        map((response) => ({
          data: (response.data ?? []).map((entity) => UserAddressesMapper.toDomain(entity)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        })),
      );
  }
}
