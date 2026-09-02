import { BehaviorSubject, map, Observable } from 'rxjs';
import { UserAuth } from '../../../auth/domain/interfaces/user-auth';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { User } from '../../domain/entities/users.entity';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../enviroments/enviroment';
import { UsersApiResponse, UsersMapper } from '../mapper/user.mapper';
import { ApiPaginatedResponse } from '../../../../core/types/api-envelope';
import { Injectable } from '@angular/core';
import { CreateUserProps, UpdateUserProps } from '../../domain/entities/users.props';

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

    return this.http.patch<UsersApiResponse>(`${environment.apiUrl}/users/${input.id}`, body).pipe(
      map((response) => {
        return UsersMapper.toDomain(response);
      }),
    );
  }

  getAll(): Observable<PaginatedResponse<User[]>> {
    return this.http
      .get<ApiPaginatedResponse<UsersApiResponse>>(`${environment.apiUrl}/users`)
      .pipe(
        map((response) => {
          console.log(response);
          const { data, limit, page, total, message, success } = response;

          console.log(data);
          return new PaginatedResponse(
            success,
            message,
            data.map((entity) => UsersMapper.toDomain(entity)),
            total,
            page,
            limit,
          );
        }),
      );
  }
}
