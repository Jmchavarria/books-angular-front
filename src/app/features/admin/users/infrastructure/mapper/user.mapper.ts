import { RoleTypeEnum } from '../../../../../core/enums/role.enum';
import { Book } from '../../../../books/domain/entities/book.entity';
import { User } from '../../domain/entities/users.entity';
import { UserStatusTypeEnum } from '../../domain/enums/users-status-type.enum';

export interface UsersApiResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarUrl: string;
  isEmailVerified: boolean;
  role: RoleTypeEnum;
  status: UserStatusTypeEnum;
  createdAt: Date;
  updatedAt: Date;
}

export class UsersMapper {
  static toDomain(raw: UsersApiResponse): User {
    return new User(
      raw.id,
      raw.firstName,
      raw.lastName,
      raw.email,
      raw.isEmailVerified,
      raw.phone,
      raw.avatarUrl,
      raw.role,
      raw.status,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
