import { RoleTypeEnum } from '../../../../core/enums/role.enum';
import { Cart } from '../../../cart/domain/entities/cart.entity';
import { OrderDE } from '../../../orders/domain/entities/orders.entity';
import { BookReview } from '../../../reviews/domain/entities/book-review.entity';
import { UserAddresses } from '../../domain/entities/user-addresses.entity';
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
  addresses: UserAddresses[];
  orders: OrderDE[];
  cart: Cart;
  reviews: BookReview[];
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
      raw.addresses,
      raw.orders,
      raw.cart,
      raw.reviews,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
