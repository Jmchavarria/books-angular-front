import { RoleTypeEnum } from '../../../../core/enums/role.enum';

// Define la estructura de lo que guardaste dentro de tu JWT en el backend
export interface JwtPayload {
  sub: string;
  email: string;
  name: string;
  role: RoleTypeEnum;
}
