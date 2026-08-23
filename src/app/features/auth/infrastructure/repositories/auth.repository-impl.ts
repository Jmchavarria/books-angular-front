import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Injectable, Signal, signal } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { AuthMapper, AuthApiResponse } from '../mappers/auth.mapper';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../domain/interfaces/jwt-auth.interface';
import { Router } from '@angular/router';
import { RegisterDto } from '../../application/register/register.dto';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  _currentUser = signal<UserAuth | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  // en el logout se debe hacer un set _currentUser = null

  private decodedJWT<T>(data: string): T {
    return jwtDecode<T>(data);
  }

  login(email: string, password: string): Observable<UserAuth> {
    return this.http
      .post<AuthApiResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // 1. Guardar tokens en el almacenamiento local
          localStorage.setItem('access_token', response.data.accessToken);
          localStorage.setItem('refresh_token', response.data.refreshToken);

          const decoded = this.decodedJWT<JwtPayload>(response.data.accessToken);

          this._currentUser.set({
            email: decoded.email,
            fullName: decoded.fullName,
            id: decoded.sub,
            role: decoded.role,
          });
          return AuthMapper.toDomain(response);
        }),
      );
  }

  register(input: RegisterDto): Observable<UserAuth> {
    return this.http.post<AuthApiResponse>(`${environment.apiUrl}/auth/register`, input).pipe(
      map((response) => {
        const decoded = this.decodedJWT<JwtPayload>(response.data.accessToken);

        this._currentUser.set({
          email: decoded.email,
          fullName: decoded.fullName,
          id: decoded.sub,
          role: decoded.role,
        });

        return AuthMapper.toDomain(response);
      }),
    );
  }

  verifyGoogleToken(token: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/auth/verify-token-google`, { token });
  }
}
