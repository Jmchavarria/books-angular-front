import { RoleTypeEnum } from '../../../../../core/enums/role.enum';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleTypeEnum;
  password: string;
}
