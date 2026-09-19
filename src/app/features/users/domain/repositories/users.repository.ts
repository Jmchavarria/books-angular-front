import { Observable } from 'rxjs';
import { UserAuth } from '../../../auth/domain/interfaces/user-auth';
import { User } from '../entities/users.entity';
import { CreateUserProps, GetAllUsersProps, UpdateUserProps } from '../entities/users.props';
import { PaginatedResult } from '../../../../core/types/paginated-response';

export abstract class UsersRepository {
  abstract currentUser(): Observable<UserAuth | null>;
  abstract getAll(filters?: GetAllUsersProps): Observable<PaginatedResult<User>>;
  abstract create(input: CreateUserProps): Observable<User>;
  abstract update(input: UpdateUserProps): Observable<User>;
}
