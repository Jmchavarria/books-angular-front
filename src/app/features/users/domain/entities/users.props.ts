import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { IQueryParams } from '../../../../core/interfaces/query-params.interface';

export interface CreateUserProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: RoleTypeEnum;
  password: string;
}
export interface GetAllUsersProps {
  filter?: IQueryParams[];
}

export type UpdateUserProps = Partial<CreateUserProps> & { id: number };
