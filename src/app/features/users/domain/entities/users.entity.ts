import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { Order } from '../../../orders/domain/entities/orders.entity';
import { BookReview } from '../../../reviews/domain/entities/book-review.entity';
import { UserStatusTypeEnum } from '../enums/users-status-type.enum';
import { UserAddresses } from './user-addresses.entity';

export class User {
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
    public readonly addresses: UserAddresses[],
    public readonly orders: Order[],
    public readonly cart: Cart,
    public readonly reviews: BookReview[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,

    // quedarian faltando los siguientes campos:

    // public readonly addresses: UserAddressOrmEntity[],
    // public readonly orders: OrderOrmEntity[],
    // public readonly cart?: CartOrmEntity,
  ) {}
}
