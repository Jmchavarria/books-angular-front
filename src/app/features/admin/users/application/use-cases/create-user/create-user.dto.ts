import { RoleTypeEnum } from '../../../../../../core/enums/role.enum';
import { UserStatusTypeEnum } from '../../../domain/enums/users-status-type.enum';

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleTypeEnum;
  password: string;
}
