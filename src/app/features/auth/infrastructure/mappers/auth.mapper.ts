// infrastructure/mappers/auth.mapper.ts
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { JwtPayload } from '../../domain/interfaces/jwt-auth.interface';

export interface AuthApiResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export class AuthMapper {
  static toDomain(response: AuthApiResponse): UserAuth {
    // Decodificamos el payload del accessToken que envió el backend
    const decoded = jwtDecode<JwtPayload>(response.data.accessToken);

    return {
      id: decoded.sub,
      email: decoded.email,
      fullName: decoded.fullName,
      role: decoded.role,
    };
  }
}
