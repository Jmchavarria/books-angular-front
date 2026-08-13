import { HttpClient } from '@angular/common/http';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../enviroments/enviroment';
import { AuthMapper, LoginApiResponse } from '../mappers/auth.mapper';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../domain/interfaces/jwt-auth.interface';
import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
  ) {}

  private userAuth$ = new BehaviorSubject<UserAuth | null>(null);

  updateUserAuth(newUser: UserAuth): Observable<void> {
    this.userAuth$.next(newUser);

    return of(void 0);
  }

  getUserAuth(): Observable<UserAuth | null> {
    return this.userAuth$.asObservable();
  }

  login(email: string, password: string): Observable<UserAuth> {
    return this.http
      .post<LoginApiResponse>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(
        map((response) => {
          // 1. Guardar tokens en el almacenamiento local
          localStorage.setItem('access_token', response.accessToken);
          localStorage.setItem('refresh_token', response.refreshToken);

          const decoded = jwtDecode<JwtPayload>(response.accessToken);

          if (decoded.role === RoleTypeEnum.admin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/']);
          }

          this.updateUserAuth({
            email: decoded.email,
            id: decoded.sub,
            name: decoded.name,
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
