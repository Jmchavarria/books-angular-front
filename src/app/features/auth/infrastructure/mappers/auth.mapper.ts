// infrastructure/mappers/auth.mapper.ts
import { jwtDecode } from 'jwt-decode';
import { UserAuth } from '../../domain/interfaces/user-auth';

// Define la estructura de lo que guardaste dentro de tu JWT en el backend
interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  roles: string[];
}

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
      roles: decoded.roles,
    };
  }
}
