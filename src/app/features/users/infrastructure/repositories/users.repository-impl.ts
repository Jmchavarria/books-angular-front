import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserAuth } from '../../../auth/domain/interfaces/user-auth';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';
import { PaginatedResult } from '../../../../core/types/paginated-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../enviroments/enviroment';
import { UsersApiResponse, UsersMapper } from '../mapper/user.mapper';
import { ApiPaginatedResult } from '../../../../core/types/api-envelope';
import { Injectable } from '@angular/core';
import {
  CreateUserProps,
  GetAllUsersProps,
  UpdateUserProps,
} from '../../domain/entities/users.props';
import { ApiResponse } from '../../../../core/interfaces/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private readonly http: HttpClient) {}

  private userAuth$ = new BehaviorSubject<UserAuth | null>(null);
  currentUser(): Observable<UserAuth | null> {
    return this.userAuth$.asObservable();
  }

  create(input: CreateUserProps): Observable<User> {
    return this.http.post<UsersApiResponse>(`${environment.apiUrl}/users`, input).pipe(
      map((response) => {
        return UsersMapper.toDomain(response);
      }),
    );
  }

  update(input: UpdateUserProps): Observable<User> {
    const { ...body } = input;

    return this.http
      .patch<ApiResponse<UsersApiResponse>>(`${environment.apiUrl}/users/${input.id}`, body)
      .pipe(
        map((response) => {
          console.log(response);
          return UsersMapper.toDomain(response.data);
        }),
      );
  }

  getAll(filters?: GetAllUsersProps): Observable<PaginatedResult<User>> {
    let params = new HttpParams();

    if (filters?.filter) {
      filters.filter.map((element) => {
        params = params.set(element.name as string, element.value as string);
      });
    }
    return this.http
      .get<ApiPaginatedResult<UsersApiResponse>>(`${environment.apiUrl}/users`, { params })
      .pipe(
        map((response) => ({
          data: (response.data ?? []).map((entity) => UsersMapper.toDomain(entity)),
          total: response.total,
          page: response.page,
          limit: response.limit,
          totalPages: response.totalPages,
        })),
      );
  }
}
