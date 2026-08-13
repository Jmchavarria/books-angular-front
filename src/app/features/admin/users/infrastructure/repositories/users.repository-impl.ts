import { BehaviorSubject, Observable } from 'rxjs';
import { UserAuth } from '../../../../auth/domain/interfaces/user-auth';
import { UsersRepository } from '../../domain/repositories/users.repository';

export class UsersRepositoryImpl implements UsersRepository {
  private userAuth$ = new BehaviorSubject<UserAuth | null>(null);
  currentUser(): Observable<UserAuth | null> {
    return this.userAuth$.asObservable();
  }
}
