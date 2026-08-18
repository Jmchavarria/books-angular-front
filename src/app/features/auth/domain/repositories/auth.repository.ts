import { Observable } from 'rxjs';
import { UserAuth } from '../interfaces/user-auth';
import { RegisterDto } from '../../application/register/register.dto';

export abstract class AuthRepository {
  abstract verifyGoogleToken(token: string): Observable<any>;
  abstract login(email: string, password: string): Observable<UserAuth>;
  abstract getUserAuth(): Observable<UserAuth | null>;
  abstract updateUserAuth(newUser: UserAuth): Observable<void>;
  abstract register(input: RegisterDto): Observable<UserAuth>;
}
