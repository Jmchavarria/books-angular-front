import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../domain/repositories/auth.repository';
import { map, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroments/enviroment';
import { AuthMapper, LoginApiResponse } from './mappers/auth.mapper';
import { UserAuth } from '../domain/interfaces/user-auth';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<UserAuth> {
    return this.http
      .post<LoginApiResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // 1. Guardar tokens en el almacenamiento local
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);

          // 2. Mapear la respuesta al modelo de dominio usando el Mapper
          return AuthMapper.toDomain(response);
        }),
      );
  }

  verifyGoogleToken(token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/verify-token-google`, { token });
  }
}
