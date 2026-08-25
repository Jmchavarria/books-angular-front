import { RoleTypeEnum } from '../../../../../core/enums/role.enum';
import { UserStatusTypeEnum } from '../enums/users-status-type.enum';

export class User{
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public readonly isEmailVerified: boolean,
    public readonly phone: string,
    public readonly avatarUrl: string,
    public readonly role: RoleTypeEnum,
    public readonly status: UserStatusTypeEnum,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,

    // quedarian faltando los siguientes campos:

    // public readonly addresses: UserAddressOrmEntity[],
    // public readonly orders: OrderOrmEntity[],
    // public readonly cart?: CartOrmEntity,
    // public readonly reviews: BookReviewOrmEntity[],
  ) {}
}
