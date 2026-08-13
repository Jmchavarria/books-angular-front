import { Observable } from 'rxjs';
import { UserAuth } from '../../../../auth/domain/interfaces/user-auth';

export abstract class UsersRepository {
  abstract currentUser(): Observable<UserAuth | null>;
}
