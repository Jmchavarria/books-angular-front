import { Observable } from 'rxjs';
import { AuthRepository } from '../../domain/repositories/auth.repository';
import { UserAuth } from '../../domain/interfaces/user-auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UpdateUserAuthUseCase {
  constructor(private readonly repository: AuthRepository) {}

  execute(newUser: UserAuth): Observable<void> {
    return this.repository.updateUserAuth(newUser);
  }
}
