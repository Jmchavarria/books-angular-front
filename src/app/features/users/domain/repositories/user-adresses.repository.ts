import { Observable } from 'rxjs';
import { UserAddresses } from '../entities/user-addresses.entity';
import {
  CreateUserAddressProps,
  GetAllUserAddressesProps,
  UpdateUserAddressesProps,
} from '../entities/user-addresses.props';
import { PaginatedResult } from '../../../../core/types/paginated-response';

export abstract class UserAddressesRepository {
  abstract create(input: CreateUserAddressProps): Observable<UserAddresses>;
  abstract update(input: UpdateUserAddressesProps): Observable<UserAddresses>;
  abstract getAll(filters?: GetAllUserAddressesProps): Observable<PaginatedResult<UserAddresses>>;
}
