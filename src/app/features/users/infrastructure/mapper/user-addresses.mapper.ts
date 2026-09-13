import { UserAddresses } from '../../domain/entities/user-addresses.entity';

export interface UsersAddressesApiResponse {
  id: number;
  userId: number;
  alias: string;
  streetAddress: string;
  apartmentOrSuite: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserAddressesMapper {
  static toDomain(raw: UserAddresses): UserAddresses {
    return new UserAddresses(
      raw.id,
      raw.userId,
      raw.alias,
      raw.streetAddress,
      raw.apartmentOrSuite,
      raw.city,
      raw.state,
      raw.postalCode,
      raw.country,
      raw.isDefault,
      raw.createdAt,
      raw.updatedAt,
    );
  }
}
