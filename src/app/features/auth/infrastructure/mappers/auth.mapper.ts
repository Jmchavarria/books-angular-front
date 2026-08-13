// infrastructure/mappers/auth.mapper.ts
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { JwtPayload } from '../../domain/interfaces/jwt-auth.interface';

export interface LoginApiResponse {
  accessToken: string;
  refreshToken: string;
}

export class AuthMapper {
  static toDomain(response: LoginApiResponse): UserAuth {
    // Decodificamos el payload del accessToken que envió el backend
    const decoded = jwtDecode<JwtPayload>(response.accessToken);

    return {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
    };
  }
}
