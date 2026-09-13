import { HttpClient } from '@angular/common/http';
import { UserAddressesRepository } from '../../domain/repositories/user-adresses.repository';
import { map, Observable } from 'rxjs';
import { UserAddresses } from '../../domain/entities/user-addresses.entity';
import {
  CreateUserAddressProps,
  UpdateUserAddressesProps,
} from '../../domain/entities/user-addresses.props';
import { environment } from '../../../../../enviroments/enviroment';
import { UserAddressesMapper, UsersAddressesApiResponse } from '../mapper/user-addresses.mapper';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAddressesRepositoryImpl implements UserAddressesRepository {
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
      .put<UsersAddressesApiResponse>(`${environment.apiUrl}/user-addresses/${input.id}`, body)
      .pipe(
        map((response) => {
          return UserAddressesMapper.toDomain(response);
        }),
      );
  }
}
