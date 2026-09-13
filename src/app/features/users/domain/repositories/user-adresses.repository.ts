import { Observable } from 'rxjs';
import { UserAddresses } from '../entities/user-addresses.entity';
import { CreateUserAddressProps, UpdateUserAddressesProps } from '../entities/user-addresses.props';

export abstract class UserAddressesRepository {
  abstract create(input: CreateUserAddressProps): Observable<UserAddresses>;
  abstract update(input: UpdateUserAddressesProps): Observable<UserAddresses>;
}
