import { Observable } from 'rxjs';
import { UserAuth } from '../interfaces/user-auth';

export abstract class AuthRepository {
  abstract verifyGoogleToken(token: string): Observable<any>;
  abstract login(email: string, password: string): Observable<UserAuth>;
  abstract getUserAuth(): Observable<UserAuth | null>;
  abstract updateUserAuth(newUser: UserAuth): Observable<void>;
}
