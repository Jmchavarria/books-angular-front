import { RoleTypeEnum } from '../../../../core/enums/role.enum';

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleTypeEnum;
  password: string;
}
export interface GetAllUsersProps {
  name?: string;
  value?: unknown;
}

export type UpdateUserProps = Partial<CreateUserProps> & { id: number };
