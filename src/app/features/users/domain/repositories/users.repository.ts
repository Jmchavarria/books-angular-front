import { Observable } from 'rxjs';
import { UserAuth } from '../../../auth/domain/interfaces/user-auth';
import { User } from '../entities/users.entity';
import { PaginatedResponse } from '../../../../core/types/paginated-response';
import { CreateUserProps, UpdateUserProps } from '../entities/users.props';

export abstract class UsersRepository {
  abstract currentUser(): Observable<UserAuth | null>;
  abstract getAll(): Observable<PaginatedResponse<User[]>>;
  abstract create(input: CreateUserProps): Observable<User>;
  abstract update(input: UpdateUserProps): Observable<User>;
}
